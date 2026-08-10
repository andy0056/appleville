/**
 * Dense retrieval, used as a fallback after lexical routing finds nothing.
 *
 * Not the primary path on purpose. Lexical retrieval already cites correctly
 * for 96.8% of direct questions at zero latency and zero cost, so paying an
 * API round trip for those would be waste. This runs only when the keyword
 * gate has given up — which, measured, is almost exactly the set of
 * paraphrased questions it cannot reach.
 */

import { assistantCorpus } from "../corpus.ts";
import type { AssistantChunk } from "../types.ts";
import { cosineSimilarity, getEmbeddingProvider } from "./provider.ts";
import vectorFile from "./corpus-vectors.json" with { type: "json" };

/**
 * Two floors, because how much a similarity score is worth depends on what
 * else already agrees with it.
 *
 * When lexical routing has already established the question is about Himachal
 * and only its confidence is weak, a modest 0.25 is enough — scope is settled
 * and embeddings are just picking the better page.
 *
 * When lexical found no domain signal at all, similarity is the *only*
 * evidence, so it has to carry more weight. "What is the weather in Delhi
 * tomorrow?" scores 0.372 against town pages — it genuinely is near them,
 * since towns discuss seasons and Delhi is a place — but Appleville does not
 * do forecasts. A single floor calibrated on a handful of out-of-scope
 * examples let that through; requiring more when nothing else corroborates
 * does not.
 */
const FLOOR_WITH_LEXICAL_SIGNAL = 0.25;

/**
 * Swept against the labelled set. 0.36 scored best on the eval alone —
 * paraphrase recall 68.8% with out-of-scope refusal held at its 75% baseline —
 * but "what is the weather in Delhi tomorrow" sits at 0.372 and the eval's
 * out-of-scope sample did not contain it. 0.39 is the honest number: it clears
 * that case, keeps refusal at baseline, and still recovers most of the recall.
 *
 *   floor   paraphrase cited   out-of-scope refused
 *   0.33         71.9%                62.5%
 *   0.36         68.8%                75.0%
 *   0.39         65.6%                75.0%
 *   0.42         56.3%                75.0%
 *
 * Overridable so the sweep is reproducible: ASSISTANT_SEMANTIC_FLOOR=0.33 npm run eval:assistant
 */
const FLOOR_WITHOUT_LEXICAL_SIGNAL = Number(
  process.env.ASSISTANT_SEMANTIC_FLOOR ?? 0.39,
);

const MAX_HITS = 6;

/** Queries repeat across a session; embedding them twice is pure waste. */
const queryCache = new Map<string, number[] | null>();
const CACHE_LIMIT = 500;

const vectors = vectorFile.vectors as Record<string, number[]>;

export type SemanticHit = {
  chunk: AssistantChunk;
  score: number;
};

let warnedAboutStaleVectors = false;

async function embedQuery(query: string): Promise<number[] | null> {
  const key = query.trim().toLowerCase();
  if (queryCache.has(key)) return queryCache.get(key) ?? null;

  const provider = getEmbeddingProvider();
  if (!provider) return null;

  if (vectorFile.provider !== provider.id && !warnedAboutStaleVectors) {
    warnedAboutStaleVectors = true;
    console.warn(
      `[assistant] corpus vectors were built with ${vectorFile.provider} but the provider is ${provider.id}. Run npm run embed:corpus.`,
    );
    return null;
  }

  try {
    const [vector] = await provider.embed([query]);

    if (queryCache.size >= CACHE_LIMIT) queryCache.clear();
    queryCache.set(key, vector ?? null);

    return vector ?? null;
  } catch (error) {
    // A dead key or a rate limit must not take the assistant down — the
    // caller falls back to whatever lexical retrieval produced.
    console.warn("[assistant] query embedding failed, using lexical only:", error);
    return null;
  }
}

/**
 * Returns the closest chunks above the applicable floor, or an empty array
 * when embeddings are unavailable or nothing clears it.
 *
 * `hasLexicalSignal` says whether keyword routing already recognised the
 * question as in-scope, which decides how much similarity has to prove.
 */
export async function retrieveSemantic(
  query: string,
  { hasLexicalSignal }: { hasLexicalSignal: boolean },
): Promise<SemanticHit[]> {
  if (!query.trim()) return [];

  const queryVector = await embedQuery(query);
  if (!queryVector) return [];

  const floor = hasLexicalSignal ? FLOOR_WITH_LEXICAL_SIGNAL : FLOOR_WITHOUT_LEXICAL_SIGNAL;

  return assistantCorpus
    .map((chunk) => {
      const vector = vectors[chunk.id];
      return vector ? { chunk, score: cosineSimilarity(queryVector, vector) } : null;
    })
    .filter((hit): hit is SemanticHit => hit !== null && hit.score >= floor)
    .sort((left, right) => right.score - left.score)
    .slice(0, MAX_HITS);
}

export { FLOOR_WITH_LEXICAL_SIGNAL, FLOOR_WITHOUT_LEXICAL_SIGNAL };
