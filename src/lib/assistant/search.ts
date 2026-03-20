import { getTownBySlug } from "../towns.ts";
import type {
  AssistantChunk,
  AssistantIntent,
  AssistantResponse,
  AssistantSearchOptions,
  AssistantSearchResult,
} from "./types.ts";
import { normalizeText, tokenize } from "./router.ts";

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

function getExpandedTokens(intent: AssistantIntent) {
  const baseTokens = tokenize(intent.normalizedQuery);
  const topicTokens = intent.topics.flatMap((topic) => topic.split("-"));
  const townTokens = intent.townSlugs.flatMap((slug) => {
    const town = getTownBySlug(slug);
    return town ? tokenize(`${town.name} ${town.district}`) : [slug];
  });

  return unique([...baseTokens, ...topicTokens, ...townTokens]);
}

function chunkMatchesRequiredKeywords(chunk: AssistantChunk, requiredKeywords: string[]) {
  if (!requiredKeywords.length) return true;

  const haystacks = [
    normalizeText(chunk.pageTitle),
    normalizeText(chunk.sectionTitle),
    normalizeText(chunk.text),
    ...chunk.keywords.map((keyword) => normalizeText(keyword)),
  ];

  return requiredKeywords.some((keyword) => {
    const normalizedKeyword = normalizeText(keyword);
    return haystacks.some((haystack) => haystack.includes(normalizedKeyword));
  });
}

function scoreChunk(chunk: AssistantChunk, intent: AssistantIntent) {
  const normalizedText = normalizeText(chunk.text);
  const normalizedTitle = normalizeText(chunk.pageTitle);
  const normalizedSectionTitle = normalizeText(chunk.sectionTitle);
  const normalizedKeywords = chunk.keywords.map((keyword) => normalizeText(keyword));
  const queryTokens = getExpandedTokens(intent);
  const matchReasons: string[] = [];
  let score = chunk.priority * 2;

  if (intent.intentKind === "method" && chunk.pageType === "method") {
    score += 14;
    matchReasons.push("method");
  }

  const explicitEntityMatches = chunk.entitySlugs.filter((slug) =>
    intent.explicitTownSlugs.includes(slug),
  );
  if (explicitEntityMatches.length) {
    score += explicitEntityMatches.length * 18;
    matchReasons.push("explicit-town");
  } else {
    const contextualTownMatches = chunk.entitySlugs.filter((slug) =>
      intent.townSlugs.includes(slug),
    );
    if (contextualTownMatches.length) {
      score += contextualTownMatches.length * 10;
      matchReasons.push("context-town");
    }
  }

  if (intent.pageTypes.includes(chunk.pageType)) {
    score += 6;
    matchReasons.push("page-type");
  }

  if (intent.normalizedQuery.length > 4 && normalizedSectionTitle.includes(intent.normalizedQuery)) {
    score += 16;
    matchReasons.push("exact-section");
  } else if (
    intent.normalizedQuery.length > 4 &&
    normalizedTitle.includes(intent.normalizedQuery)
  ) {
    score += 12;
    matchReasons.push("exact-title");
  }

  const topicMatches = intent.topics.filter((topic) =>
    normalizedKeywords.includes(topic) ||
    normalizedTitle.includes(topic.replace(/-/g, " ")) ||
    normalizedSectionTitle.includes(topic.replace(/-/g, " ")) ||
    normalizedText.includes(topic.replace(/-/g, " ")),
  );
  if (topicMatches.length) {
    score += topicMatches.length * 7;
    matchReasons.push("topic");
  }

  queryTokens.forEach((token) => {
    if (normalizedKeywords.some((keyword) => keyword.includes(token))) {
      score += 5;
      return;
    }
    if (normalizedSectionTitle.includes(token)) {
      score += 4;
      return;
    }
    if (normalizedTitle.includes(token)) {
      score += 3;
      return;
    }
    if (normalizedText.includes(token)) {
      score += 1;
    }
  });

  return { score, matchReasons: unique(matchReasons) };
}

function getConfidence(
  selected: AssistantSearchResult[],
  options: AssistantSearchOptions,
): AssistantResponse["confidence"] {
  const topScore = selected[0]?.score ?? 0;
  const includesCanonical =
    !options.mustIncludePathname ||
    selected.some((result) => result.chunk.pathname === options.mustIncludePathname);

  if (!includesCanonical) return "low";
  if (topScore >= 40) return "high";
  if (topScore >= 24) return "medium";
  return "low";
}

export function searchAssistantCorpus(
  chunks: AssistantChunk[],
  intent: AssistantIntent,
  options: AssistantSearchOptions = {},
) {
  const allowedPathnames = options.allowedPathnames
    ? new Set(options.allowedPathnames)
    : null;
  const excludedPathnames = options.excludedPathnames
    ? new Set(options.excludedPathnames)
    : null;
  const allowedPageTypes = options.allowedPageTypes
    ? new Set(options.allowedPageTypes)
    : null;
  const requiredKeywords = options.requiredKeywords ?? [];

  const results = chunks
    .filter((chunk) => {
      if (allowedPathnames && !allowedPathnames.has(chunk.pathname)) return false;
      if (excludedPathnames && excludedPathnames.has(chunk.pathname)) return false;
      if (allowedPageTypes && !allowedPageTypes.has(chunk.pageType)) return false;
      if (!chunkMatchesRequiredKeywords(chunk, requiredKeywords)) return false;
      return true;
    })
    .map((chunk) => {
      const { score, matchReasons } = scoreChunk(chunk, intent);
      return { chunk, score, matchReasons };
    })
    .filter((result) => result.score > 0)
    .sort((left, right) => right.score - left.score);

  const perPathCounts = new Map<string, number>();
  const selected: AssistantSearchResult[] = [];

  for (const result of results) {
    const count = perPathCounts.get(result.chunk.pathname) ?? 0;
    if (count >= 2) continue;
    selected.push(result);
    perPathCounts.set(result.chunk.pathname, count + 1);
    if (selected.length >= 6) break;
  }

  return {
    results: selected,
    confidence: getConfidence(selected, options),
  };
}
