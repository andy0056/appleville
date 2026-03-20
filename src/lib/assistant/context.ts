import type {
  AssistantConversationContext,
  AssistantIntent,
  AssistantPageType,
  AssistantSearchResult,
  AssistantTopic,
} from "./types.ts";

const emptyContext: AssistantConversationContext = {
  activeTownSlugs: [],
  activeTopics: [],
  activePageTypes: [],
};

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

export function sanitizeConversationContext(
  value: AssistantConversationContext | null | undefined,
): AssistantConversationContext {
  if (!value) return emptyContext;

  return {
    activeTownSlugs: unique((value.activeTownSlugs ?? []).filter(Boolean)).slice(0, 4),
    activeTopics: unique((value.activeTopics ?? []).filter(Boolean) as AssistantTopic[]).slice(
      0,
      6,
    ),
    activePageTypes: unique(
      (value.activePageTypes ?? []).filter(Boolean) as AssistantPageType[],
    ).slice(0, 4),
  };
}

export function isFollowUpQuery(normalizedQuery: string) {
  if (!normalizedQuery) return false;

  return (
    normalizedQuery.split(" ").length <= 7 ||
    normalizedQuery.startsWith("and ") ||
    normalizedQuery.startsWith("what about") ||
    normalizedQuery.startsWith("how about") ||
    normalizedQuery.startsWith("what if") ||
    normalizedQuery.startsWith("which one") ||
    normalizedQuery.startsWith("for families") ||
    normalizedQuery.startsWith("for longer stays")
  );
}

export function buildConversationContextPatch(
  intent: AssistantIntent,
  results: AssistantSearchResult[],
  previousContext?: AssistantConversationContext | null,
): AssistantConversationContext {
  const cleanPreviousContext = sanitizeConversationContext(previousContext);
  const resultTownSlugs = results.flatMap((result) => result.chunk.entitySlugs).slice(0, 4);
  const resultPageTypes = results.map((result) => result.chunk.pageType).slice(0, 4);

  return {
    activeTownSlugs: unique(
      intent.explicitTownSlugs.length
        ? intent.explicitTownSlugs
        : cleanPreviousContext.activeTownSlugs.length
          ? cleanPreviousContext.activeTownSlugs
          : resultTownSlugs,
    ).slice(0, 4),
    activeTopics: unique(intent.topics).slice(0, 6),
    activePageTypes: unique(
      intent.pageTypes.length ? intent.pageTypes : resultPageTypes,
    ).slice(0, 4),
  };
}
