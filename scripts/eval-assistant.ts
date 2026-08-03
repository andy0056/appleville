/**
 * Retrieval evaluation for the Ask Appleville assistant.
 *
 * Runs the labelled set in src/lib/assistant/eval/queries.ts through the real
 * entry point — generateAssistantResponse — rather than probing the search
 * function directly. The user-visible failure is the assistant declining to
 * answer, and that decision is made by the router and the responders, not by
 * the scorer alone.
 *
 * Reported per style, never as a single average: direct queries use the
 * corpus's own words, paraphrases do not, and a change that only helps the
 * former is not an improvement worth shipping.
 *
 *   npm run eval:assistant
 *   npm run eval:assistant -- --failures    # also print every miss
 */

import { generateAssistantResponse } from "../src/lib/assistant/respond.ts";
import { evalQueries, type EvalQuery, type EvalStyle } from "../src/lib/assistant/eval/queries.ts";

type Outcome = {
  query: EvalQuery;
  answered: boolean;
  hit: boolean;
  hitAtOne: boolean;
  confidence: string;
  fallbackReason?: string;
  citedPaths: string[];
};

/** Citations carry full hrefs; compare on pathname only, ignoring anchors and trailing slashes. */
function toPathname(href: string): string {
  const withoutHash = href.split("#")[0] ?? href;
  const trimmed = withoutHash.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

function run(query: EvalQuery): Outcome {
  const response = generateAssistantResponse(query.query);
  const citedPaths = response.citations.map((c) => toPathname(c.href));
  const expected = new Set(query.expected.map(toPathname));
  const answered = !response.didFallback;

  // Out-of-scope queries invert the scoring: success is refusing them. Anything
  // that widens the scope gate has to pay for itself here.
  const hit =
    query.style === "out_of_scope"
      ? !answered
      : citedPaths.some((p) => expected.has(p));

  return {
    query,
    answered,
    hit,
    hitAtOne:
      query.style === "out_of_scope"
        ? hit
        : citedPaths.length > 0 && expected.has(citedPaths[0]!),
    confidence: response.confidence,
    fallbackReason: response.fallbackReason,
    citedPaths,
  };
}

function pct(n: number, d: number): string {
  return d === 0 ? "  n/a" : `${((n / d) * 100).toFixed(1).padStart(5)}%`;
}

function summarise(label: string, rows: Outcome[]): string {
  const n = rows.length;
  const answered = rows.filter((r) => r.answered).length;
  const hit = rows.filter((r) => r.hit).length;
  const hitAtOne = rows.filter((r) => r.hitAtOne).length;
  return [
    label.padEnd(14),
    String(n).padStart(3),
    pct(answered, n),
    pct(hit, n),
    pct(hitAtOne, n),
  ].join("  ");
}

const showFailures = process.argv.includes("--failures");
const outcomes = evalQueries.map(run);

const byStyle = (s: EvalStyle) => outcomes.filter((o) => o.query.style === s);
const domains = [...new Set(evalQueries.map((q) => q.domain))].sort();

console.log("\nAsk Appleville — retrieval baseline");
console.log("=".repeat(52));
console.log(["                 n", "answered", " cited", " @1"].join("  "));
console.log("-".repeat(52));
console.log(summarise("ALL", outcomes));
console.log(summarise("direct", byStyle("direct")));
console.log(summarise("paraphrase", byStyle("paraphrase")));
console.log(summarise("out-of-scope", byStyle("out_of_scope")), " (cited = correctly refused)");

console.log("\nBy domain");
console.log("-".repeat(52));
for (const d of domains) {
  console.log(summarise(d, outcomes.filter((o) => o.query.domain === d)));
}

const confidences = outcomes.reduce<Record<string, number>>((acc, o) => {
  acc[o.confidence] = (acc[o.confidence] ?? 0) + 1;
  return acc;
}, {});
console.log("\nConfidence:", JSON.stringify(confidences));

const fallbacks = outcomes.filter((o) => !o.answered);
if (fallbacks.length) {
  const reasons = fallbacks.reduce<Record<string, number>>((acc, o) => {
    const r = o.fallbackReason ?? "unknown";
    acc[r] = (acc[r] ?? 0) + 1;
    return acc;
  }, {});
  console.log("Fallbacks: ", JSON.stringify(reasons));
}

const misses = outcomes.filter((o) => !o.hit);
console.log(`\n${misses.length}/${outcomes.length} queries cited nothing expected.`);

if (showFailures && misses.length) {
  console.log("\nMisses");
  console.log("-".repeat(52));
  for (const m of misses) {
    console.log(`\n  [${m.query.style}] ${m.query.id}  "${m.query.query}"`);
    console.log(`    wanted : ${m.query.expected.join(" | ")}`);
    console.log(`    cited  : ${m.citedPaths.join(" | ") || "(nothing)"}`);
    console.log(`    status : ${m.answered ? m.confidence : `fallback:${m.fallbackReason}`}`);
  }
}

console.log("");
