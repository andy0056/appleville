/**
 * Pluggable embedding provider.
 *
 * The interface exists so this repo can be cloned and run without an OpenAI
 * account — swap in a local model, Cohere, Voyage, whatever — and so the
 * assistant degrades to lexical retrieval rather than breaking when no key is
 * configured. Retrieval quality drops; nothing errors.
 */

export interface EmbeddingProvider {
  /** Stable id recorded in the vectors file, so stale vectors are detectable. */
  readonly id: string;
  readonly dimensions: number;
  embed(texts: string[]): Promise<number[][]>;
}

const OPENAI_MODEL = "text-embedding-3-small";

/**
 * 512 rather than the native 1536. text-embedding-3-small is Matryoshka-trained,
 * so a truncated vector stays meaningful, and this keeps the committed corpus
 * file near a megabyte instead of three for a barely measurable quality loss.
 */
const OPENAI_DIMENSIONS = 512;

/** OpenAI caps a single embeddings request; batch well under it. */
const BATCH_SIZE = 96;

export function createOpenAIProvider(apiKey: string): EmbeddingProvider {
  return {
    id: `openai:${OPENAI_MODEL}:${OPENAI_DIMENSIONS}`,
    dimensions: OPENAI_DIMENSIONS,

    async embed(texts: string[]): Promise<number[][]> {
      const out: number[][] = [];

      for (let i = 0; i < texts.length; i += BATCH_SIZE) {
        const batch = texts.slice(i, i + BATCH_SIZE);

        const res = await fetch("https://api.openai.com/v1/embeddings", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: OPENAI_MODEL,
            input: batch,
            dimensions: OPENAI_DIMENSIONS,
          }),
          signal: AbortSignal.timeout(30_000),
        });

        if (!res.ok) {
          const detail = await res.text().catch(() => "");
          throw new Error(`Embeddings request failed: ${res.status} ${res.statusText} ${detail.slice(0, 200)}`);
        }

        const json = (await res.json()) as { data: { index: number; embedding: number[] }[] };
        // The API does not guarantee response order matches input order.
        const ordered = [...json.data].sort((a, b) => a.index - b.index);
        out.push(...ordered.map((d) => d.embedding));
      }

      return out;
    },
  };
}

/** Returns null when no key is configured — callers fall back to lexical retrieval. */
export function getEmbeddingProvider(): EmbeddingProvider | null {
  const key = process.env.OPENAI_API_KEY;
  return key ? createOpenAIProvider(key) : null;
}

/** Vectors from the same provider are unit-length, so a dot product is the cosine. */
export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i += 1) {
    dot += a[i]! * b[i]!;
    normA += a[i]! * a[i]!;
    normB += b[i]! * b[i]!;
  }

  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

/**
 * What actually gets embedded for a chunk.
 *
 * Titles and keywords are prepended to the body because a section's heading
 * often carries the topic more clearly than its prose — "Section 118" appears
 * in the heading, while the paragraph beneath it just says "the Act".
 */
export function buildEmbeddingText(chunk: {
  pageTitle: string;
  sectionTitle: string;
  keywords: string[];
  text: string;
}): string {
  return [
    chunk.pageTitle,
    chunk.sectionTitle,
    chunk.keywords.join(", "),
    chunk.text,
  ]
    .filter(Boolean)
    .join("\n");
}
