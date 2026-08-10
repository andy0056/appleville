/**
 * Embeds the assistant corpus once, offline, and commits the result.
 *
 * Runtime only ever embeds the user's query — one short API call — so the
 * assistant has no per-request dependency on the corpus being re-encoded, and
 * the vectors are reviewable in git like any other artefact.
 *
 *   npm run embed:corpus
 *
 * Re-run whenever corpus content changes. The provider id is recorded in the
 * output so a model or dimension change is detectable rather than silently
 * mixing incompatible vectors.
 */

import { writeFileSync } from "node:fs";
import { assistantCorpus } from "../src/lib/assistant/corpus.ts";
import {
  buildEmbeddingText,
  getEmbeddingProvider,
} from "../src/lib/assistant/embeddings/provider.ts";

const OUTPUT = "src/lib/assistant/embeddings/corpus-vectors.json";

/** Six decimals is well past what cosine ranking can distinguish, and halves the file. */
const PRECISION = 6;

const provider = getEmbeddingProvider();

if (!provider) {
  console.error("No OPENAI_API_KEY. Copy .env.example to .env.local and set it.");
  process.exit(1);
}

const chunks = assistantCorpus;
console.log(`Embedding ${chunks.length} chunks with ${provider.id}...`);

const texts = chunks.map((chunk) => buildEmbeddingText(chunk));
const vectors = await provider.embed(texts);

if (vectors.length !== chunks.length) {
  console.error(`Expected ${chunks.length} vectors, got ${vectors.length}`);
  process.exit(1);
}

const byId: Record<string, number[]> = {};
chunks.forEach((chunk, i) => {
  byId[chunk.id] = vectors[i]!.map((v) => Number(v.toFixed(PRECISION)));
});

const payload = {
  provider: provider.id,
  dimensions: provider.dimensions,
  chunkCount: chunks.length,
  vectors: byId,
};

writeFileSync(OUTPUT, `${JSON.stringify(payload)}\n`);

const bytes = Buffer.byteLength(JSON.stringify(payload));
console.log(`Wrote ${OUTPUT} — ${chunks.length} vectors, ${(bytes / 1_048_576).toFixed(2)} MB`);
