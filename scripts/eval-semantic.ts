/**
 * Measures dense retrieval on its own, before any of it is wired into the app.
 *
 * Deliberately not a hybrid, and deliberately not routed through the
 * responders. The question this answers is narrow: on the same labelled set,
 * does embedding similarity find the right page for the paraphrased questions
 * that lexical retrieval cannot reach? If it does not, there is nothing to
 * integrate and the async refactor is not worth doing.
 *
 * It also reports the similarity separation between in-scope and out-of-scope
 * questions. Dense retrieval always returns a nearest neighbour, so without a
 * threshold it would answer "what is the capital of France" with a town page
 * and destroy the 75% refusal rate the lexical gate currently gets for free.
 *
 *   npm run eval:semantic
 */

import { assistantCorpus } from "../src/lib/assistant/corpus.ts";
import {
  cosineSimilarity,
  getEmbeddingProvider,
} from "../src/lib/assistant/embeddings/provider.ts";
import { evalQueries, type EvalStyle } from "../src/lib/assistant/eval/queries.ts";
import vectorFile from "../src/lib/assistant/embeddings/corpus-vectors.json" with { type: "json" };

const provider = getEmbeddingProvider();
if (!provider) {
  console.error("No OPENAI_API_KEY. Copy .env.example to .env.local and set it.");
  process.exit(1);
}

const vectors = vectorFile.vectors as Record<string, number[]>;

if (vectorFile.provider !== provider.id) {
  console.error(
    `Vectors were built with ${vectorFile.provider} but the configured provider is ${provider.id}. Re-run npm run embed:corpus.`,
  );
  process.exit(1);
}

const toPathname = (p: string) => {
  const trimmed = (p.split("#")[0] ?? p).replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
};

console.log(`Embedding ${evalQueries.length} queries...`);
const queryVectors = await provider.embed(evalQueries.map((q) => q.query));

type Row = {
  style: EvalStyle;
  domain: string;
  query: string;
  expected: string[];
  ranked: { pathname: string; score: number }[];
  topScore: number;
};

const rows: Row[] = evalQueries.map((query, i) => {
  const qv = queryVectors[i]!;

  const scored = assistantCorpus
    .map((chunk) => ({
      pathname: toPathname(chunk.pathname),
      score: vectors[chunk.id] ? cosineSimilarity(qv, vectors[chunk.id]!) : -1,
    }))
    .sort((a, b) => b.score - a.score);

  // Collapse to first occurrence of each pathname — several chunks share a page.
  const seen = new Set<string>();
  const ranked = scored.filter((s) => {
    if (seen.has(s.pathname)) return false;
    seen.add(s.pathname);
    return true;
  });

  return {
    style: query.style,
    domain: query.domain,
    query: query.query,
    expected: query.expected.map(toPathname),
    ranked,
    topScore: ranked[0]?.score ?? 0,
  };
});

function hitAt(row: Row, k: number): boolean {
  return row.ranked.slice(0, k).some((r) => row.expected.includes(r.pathname));
}

function pct(n: number, d: number) {
  return d === 0 ? "  n/a" : `${((n / d) * 100).toFixed(1).padStart(5)}%`;
}

function summarise(label: string, rs: Row[]) {
  const n = rs.length;
  return [
    label.padEnd(14),
    String(n).padStart(3),
    pct(rs.filter((r) => hitAt(r, 1)).length, n),
    pct(rs.filter((r) => hitAt(r, 3)).length, n),
    pct(rs.filter((r) => hitAt(r, 6)).length, n),
  ].join("  ");
}

const scored = rows.filter((r) => r.style !== "out_of_scope");
const oos = rows.filter((r) => r.style === "out_of_scope");

console.log("\nDense retrieval, no lexical signal, no responders");
console.log("=".repeat(50));
console.log("                 n     @1     @3     @6");
console.log("-".repeat(50));
console.log(summarise("ALL", scored));
console.log(summarise("direct", scored.filter((r) => r.style === "direct")));
console.log(summarise("paraphrase", scored.filter((r) => r.style === "paraphrase")));

console.log("\nBy domain");
console.log("-".repeat(50));
for (const d of [...new Set(scored.map((r) => r.domain))].sort()) {
  console.log(summarise(d, scored.filter((r) => r.domain === d)));
}

// Threshold analysis: can a similarity cutoff separate real questions from
// off-topic ones, or does dense retrieval confidently match everything?
const inScores = scored.map((r) => r.topScore).sort((a, b) => a - b);
const oosScores = oos.map((r) => r.topScore).sort((a, b) => a - b);
const median = (xs: number[]) => (xs.length ? xs[Math.floor(xs.length / 2)]! : 0);

console.log("\nTop-1 similarity — in-scope vs out-of-scope");
console.log("-".repeat(50));
console.log(`  in-scope     min ${inScores[0]?.toFixed(3)}  median ${median(inScores).toFixed(3)}  max ${inScores.at(-1)?.toFixed(3)}`);
console.log(`  out-of-scope min ${oosScores[0]?.toFixed(3)}  median ${median(oosScores).toFixed(3)}  max ${oosScores.at(-1)?.toFixed(3)}`);
console.log(`  overlap: ${oosScores.at(-1)! >= inScores[0]! ? "YES — a flat cutoff will misclassify" : "no — a clean cutoff exists"}`);

// If a cutoff is the scope gate, what does each choice actually cost?
console.log("\nCutoff sweep — what a similarity-only scope gate costs");
console.log("-".repeat(50));
console.log("  cutoff   in-scope kept   out-of-scope refused");
for (const t of [0.2, 0.25, 0.3, 0.35, 0.4, 0.45]) {
  const kept = scored.filter((r) => r.topScore >= t).length;
  const refused = oos.filter((r) => r.topScore < t).length;
  console.log(
    `   ${t.toFixed(2)}    ${pct(kept, scored.length)}          ${pct(refused, oos.length)}`,
  );
}

if (process.argv.includes("--failures")) {
  console.log("\nStill missed at @3");
  console.log("-".repeat(50));
  for (const r of scored.filter((x) => !hitAt(x, 3))) {
    console.log(`\n  [${r.style}] "${r.query}"`);
    console.log(`    wanted: ${r.expected.join(" | ")}`);
    console.log(`    got   : ${r.ranked.slice(0, 3).map((x) => `${x.pathname} (${x.score.toFixed(2)})`).join(", ")}`);
  }
}

console.log("");
