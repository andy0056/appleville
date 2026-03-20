import { getTownBySlug } from "../towns.ts";
import { assistantStopwords, knownDomainTerms, topicAliases, topicToPageTypes, townAliases } from "./aliases.ts";
import { isFollowUpQuery, sanitizeConversationContext } from "./context.ts";
import type {
  AssistantChunk,
  AssistantConversationContext,
  AssistantIntent,
  AssistantSearchResult,
  AssistantResponse,
  AssistantTopic,
} from "./types.ts";

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

export function normalizeText(input: string) {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(input: string) {
  return normalizeText(input)
    .split(" ")
    .filter((token) => token && !assistantStopwords.has(token));
}

function findTownSlugs(normalizedQuery: string) {
  return unique(
    Object.entries(townAliases)
      .filter(([alias]) => normalizedQuery.includes(alias))
      .map(([, slug]) => slug),
  );
}

function findTopics(normalizedQuery: string) {
  return unique(
    Object.entries(topicAliases)
      .filter(([alias]) => normalizedQuery.includes(alias))
      .flatMap(([, topics]) => topics),
  );
}

function hasKnownDomainSignal(normalizedQuery: string) {
  if (!normalizedQuery) return false;
  return Array.from(knownDomainTerms).some((term) => normalizedQuery.includes(term));
}

function mapTopicsToPageTypes(topics: AssistantTopic[]) {
  return unique(topics.flatMap((topic) => topicToPageTypes[topic] ?? []));
}

export function parseAssistantIntent(
  message: string,
  context?: AssistantConversationContext | null,
): AssistantIntent {
  const normalizedQuery = normalizeText(message);
  const cleanContext = sanitizeConversationContext(context);
  const explicitTownSlugs = findTownSlugs(normalizedQuery);
  const explicitTopics = findTopics(normalizedQuery);
  const followUp = isFollowUpQuery(normalizedQuery);

  const townSlugs = explicitTownSlugs.length
    ? explicitTownSlugs
    : followUp
      ? cleanContext.activeTownSlugs
      : [];
  const topics = unique(
    explicitTopics.length ? explicitTopics : followUp ? cleanContext.activeTopics : [],
  );
  const pageTypes = mapTopicsToPageTypes(topics);
  const wantsComparison =
    explicitTownSlugs.length >= 2 ||
    normalizedQuery.includes(" vs ") ||
    normalizedQuery.includes(" versus ") ||
    normalizedQuery.includes("compare ") ||
    (normalizedQuery.includes(" or ") && explicitTownSlugs.length >= 2);
  const wantsTownRanking =
    explicitTownSlugs.length <= 1 &&
    (normalizedQuery.includes("best") ||
      normalizedQuery.includes("which towns") ||
      normalizedQuery.includes("which town") ||
      normalizedQuery.includes("top"));
  const wantsMethod =
    topics.includes("method") ||
    normalizedQuery.includes("how appleville works") ||
    normalizedQuery.includes("how this works") ||
    normalizedQuery.includes("what do you consider");

  return {
    rawQuery: message,
    normalizedQuery,
    explicitTownSlugs,
    townSlugs,
    topics,
    pageTypes,
    wantsComparison,
    wantsTownRanking,
    wantsMethod,
    isFollowUp: followUp,
    hasKnownDomainSignal:
      hasKnownDomainSignal(normalizedQuery) ||
      explicitTownSlugs.length > 0 ||
      explicitTopics.length > 0,
  };
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

function scoreChunk(chunk: AssistantChunk, intent: AssistantIntent) {
  const normalizedText = normalizeText(chunk.text);
  const normalizedTitle = normalizeText(chunk.pageTitle);
  const normalizedSectionTitle = normalizeText(chunk.sectionTitle);
  const normalizedKeywords = chunk.keywords.map((keyword) => normalizeText(keyword));
  const queryTokens = getExpandedTokens(intent);
  const matchReasons: string[] = [];
  let score = chunk.priority * 2;

  if (intent.wantsMethod && chunk.pageType === "method") {
    score += 14;
    matchReasons.push("method");
  }

  const explicitEntityMatches = chunk.entitySlugs.filter((slug) =>
    intent.explicitTownSlugs.includes(slug),
  );
  if (explicitEntityMatches.length) {
    score += explicitEntityMatches.length * 24;
    matchReasons.push("explicit-town");
  } else {
    const contextualTownMatches = chunk.entitySlugs.filter((slug) =>
      intent.townSlugs.includes(slug),
    );
    if (contextualTownMatches.length) {
      score += contextualTownMatches.length * 12;
      matchReasons.push("context-town");
    }
  }

  if (intent.wantsComparison && chunk.entitySlugs.length >= 2) {
    score += 14;
    matchReasons.push("comparison");
  }

  if (intent.pageTypes.includes(chunk.pageType)) {
    score += 6;
    matchReasons.push("page-type");
  }

  if (
    intent.normalizedQuery.length > 4 &&
    (normalizedTitle.includes(intent.normalizedQuery) ||
      normalizedSectionTitle.includes(intent.normalizedQuery))
  ) {
    score += 18;
    matchReasons.push("exact-title");
  }

  const topicMatches = intent.topics.filter((topic) =>
    normalizedKeywords.includes(topic) ||
    normalizedTitle.includes(topic.replace(/-/g, " ")) ||
    normalizedSectionTitle.includes(topic.replace(/-/g, " ")) ||
    normalizedText.includes(topic.replace(/-/g, " ")),
  );
  if (topicMatches.length) {
    score += topicMatches.length * 8;
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

export function searchAssistantCorpus(
  chunks: AssistantChunk[],
  intent: AssistantIntent,
) {
  const results = chunks
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

  const topScore = selected[0]?.score ?? 0;
  const confidence: AssistantResponse["confidence"] =
    topScore >= 44
      ? "high"
      : topScore >= 26
        ? "medium"
        : "low";

  return {
    results: selected,
    confidence,
  };
}
