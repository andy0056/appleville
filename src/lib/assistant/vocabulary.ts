/**
 * Scope vocabulary, derived from the corpus rather than hand-maintained.
 *
 * `knownDomainTerms` in aliases.ts is a curated list of ~143 phrases. It gates
 * every query: miss it and the assistant answers "out of scope" without ever
 * running retrieval. The problem is that the list has to be kept in sync with
 * the content by hand, and it drifted — "vegetable markets" and "SheTravel
 * policy" are literal section titles in the corpus that the gate rejected.
 *
 * The corpus already knows what we can talk about. Section titles, page titles
 * and keywords are the honest definition of in-scope: if there is content, the
 * question is answerable. This derives the vocabulary from those, so it can
 * never fall behind the content again.
 *
 * Widening a scope gate risks the opposite failure — answering things we
 * shouldn't — so terms are filtered to distinctive ones and the out-of-scope
 * cases in the eval set exist to keep that honest.
 */

import { assistantCorpus } from "./corpus.ts";
import { indianLocationAliases } from "./aliases.ts";

/**
 * Words that carry no topic signal. Without this, "how" or "what" would appear
 * in some section title and wave every query through.
 */
const STOPWORDS = new Set([
  "the", "and", "for", "with", "what", "when", "where", "which", "who", "how",
  "why", "your", "you", "this", "that", "these", "those", "from", "into", "about",
  "after", "before", "than", "then", "there", "here", "have", "has", "had",
  "does", "did", "not", "but", "are", "was", "were", "been", "being", "its",
  "it's", "can", "will", "would", "should", "could", "may", "might", "must",
  "one", "two", "get", "got", "make", "made", "take", "want", "need", "like",
  "good", "best", "better", "more", "most", "less", "very", "much", "many",
  "some", "any", "all", "own", "out", "off", "over", "under", "read", "note",
  "notes", "quick", "profile", "profiles", "overview", "section", "page",
  "guide", "guides", "look", "know", "think", "feel", "keep", "still", "just",
  "also", "even", "each", "both", "other", "same", "next", "first", "last",
]);

const MIN_TERM_LENGTH = 4;

/**
 * A term appearing across most of the corpus is not a topic signal — "himachal"
 * is in nearly every chunk and tells us nothing about what was asked. Terms
 * above this share of chunks are dropped from the distinctive set.
 */
const MAX_DOCUMENT_FREQUENCY = 0.4;

/**
 * Crude suffix stripper — enough to connect "paragliders" to "paragliding" and
 * "markets" to "market". Not a real stemmer, and deliberately so: a full one
 * would be another dependency for a gate that only needs to be roughly right.
 */
export function stemToken(token: string): string {
  let s = token;
  if (s.length > 5 && s.endsWith("ing")) s = s.slice(0, -3);
  else if (s.length > 5 && s.endsWith("ers")) s = s.slice(0, -3);
  else if (s.length > 4 && s.endsWith("er")) s = s.slice(0, -2);
  else if (s.length > 4 && s.endsWith("es")) s = s.slice(0, -2);
  else if (s.length > 3 && s.endsWith("s")) s = s.slice(0, -1);
  if (s.length > 4 && s.endsWith("e")) s = s.slice(0, -1);
  return s;
}

function toTokens(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .filter(Boolean);
}

function buildVocabulary() {
  const documentFrequency = new Map<string, number>();

  for (const chunk of assistantCorpus) {
    // Titles and keywords only — not body text. Body text would pull in every
    // incidental word and make the gate meaningless.
    const surface = [chunk.pageTitle, chunk.sectionTitle, ...chunk.keywords].join(" ");
    const seen = new Set(
      toTokens(surface)
        .filter((t) => t.length >= MIN_TERM_LENGTH && !STOPWORDS.has(t))
        .map(stemToken)
        .filter((t) => t.length >= MIN_TERM_LENGTH),
    );

    for (const term of seen) {
      documentFrequency.set(term, (documentFrequency.get(term) ?? 0) + 1);
    }
  }

  const total = assistantCorpus.length || 1;
  const distinctive = new Set<string>();

  for (const [term, count] of documentFrequency) {
    if (count / total <= MAX_DOCUMENT_FREQUENCY) distinctive.add(term);
  }

  return { distinctive, documentFrequency };
}

const { distinctive, documentFrequency } = buildVocabulary();

/** Every distinctive stem the corpus can actually speak to. */
export const corpusVocabulary: ReadonlySet<string> = distinctive;

/** Exposed for the eval and for debugging why a query was let in or refused. */
export function matchedCorpusTerms(normalizedQuery: string): string[] {
  const stems = toTokens(normalizedQuery)
    .filter((t) => t.length >= MIN_TERM_LENGTH && !STOPWORDS.has(t))
    .map(stemToken);

  return Array.from(new Set(stems.filter((s) => distinctive.has(s))));
}

/**
 * Cities outside Himachal appear all over the corpus as origins — "people
 * moving from Delhi", "a weekend from Chandigarh" — never as places we cover.
 * A query whose only corpus signal is one of those names is asking about
 * somewhere we do not write about, so it stays out of scope. Without this,
 * "what is the weather in Delhi tomorrow" matches on `delhi` alone and gets
 * "not enough material" instead of the honest "I only cover Himachal".
 */
const originOnlyTerms = new Set(
  Array.from(indianLocationAliases).flatMap((name) =>
    toTokens(name).map(stemToken),
  ),
);

/**
 * True when the query names something the corpus has a section or keyword for.
 * Intentionally a lower bar than "we can answer it well" — retrieval and the
 * confidence score decide that. This only decides whether we bother looking.
 */
export function hasCorpusSignal(normalizedQuery: string): boolean {
  return matchedCorpusTerms(normalizedQuery).some(
    (term) => !originOnlyTerms.has(term),
  );
}

export const vocabularyStats = {
  chunks: assistantCorpus.length,
  distinctTerms: documentFrequency.size,
  distinctiveTerms: distinctive.size,
};
