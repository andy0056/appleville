import type {
  AssistantConversationContext,
  AssistantIntent,
  AssistantIntentKind,
  AssistantPageType,
  AssistantTopic,
  AssistantUserProfile,
} from "./types.ts";

const emptyContext: AssistantConversationContext = {
  activeIntentKind: null,
  activePrimaryIntentKind: null,
  activeFocusDomainKind: null,
  activeTownSlugs: [],
  activeMentionedTownSlugs: [],
  activeComparisonTownSlugs: [],
  activeTopics: [],
  activePageTypes: [],
  activeUserProfile: null,
};

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

function sanitizeIntentKind(value: unknown): AssistantIntentKind | null {
  if (typeof value !== "string") return null;

  return (
    [
      "town_fit",
      "comparison",
      "property",
      "women_safety",
      "food_water",
      "banking",
      "power",
      "community",
      "moving",
      "method",
      "generic",
    ] as const
  ).includes(value as AssistantIntentKind)
    ? (value as AssistantIntentKind)
    : null;
}

function sanitizeUserProfile(value: unknown): AssistantUserProfile {
  if (typeof value !== "string") return null;

  return (
    [
      "out_of_state_indian",
      "nri_oci",
      "foreign_national",
      "company",
    ] as const
  ).includes(value as Exclude<AssistantUserProfile, null>)
    ? (value as AssistantUserProfile)
    : null;
}

export function sanitizeConversationContext(
  value: AssistantConversationContext | null | undefined,
): AssistantConversationContext {
  if (!value) return emptyContext;

  const primaryIntentKind = sanitizeIntentKind(
    value.activePrimaryIntentKind ?? value.activeIntentKind,
  );

  return {
    activeIntentKind: primaryIntentKind,
    activePrimaryIntentKind: primaryIntentKind,
    activeFocusDomainKind: sanitizeIntentKind(value.activeFocusDomainKind),
    activeTownSlugs: unique((value.activeTownSlugs ?? []).filter(Boolean)).slice(0, 4),
    activeMentionedTownSlugs: unique(
      (value.activeMentionedTownSlugs ?? value.activeTownSlugs ?? []).filter(Boolean),
    ).slice(0, 4),
    activeComparisonTownSlugs: unique(
      (value.activeComparisonTownSlugs ?? []).filter(Boolean),
    ).slice(0, 4),
    activeTopics: unique((value.activeTopics ?? []).filter(Boolean) as AssistantTopic[]).slice(
      0,
      6,
    ),
    activePageTypes: unique(
      (value.activePageTypes ?? []).filter(Boolean) as AssistantPageType[],
    ).slice(0, 4),
    activeUserProfile: sanitizeUserProfile(value.activeUserProfile),
  };
}

export function isFollowUpQuery(normalizedQuery: string) {
  if (!normalizedQuery) return false;

  return (
    normalizedQuery.split(" ").length <= 8 ||
    normalizedQuery.startsWith("and ") ||
    normalizedQuery.startsWith("what about") ||
    normalizedQuery.startsWith("how about") ||
    normalizedQuery.startsWith("what if") ||
    normalizedQuery.startsWith("which one") ||
    normalizedQuery.startsWith("for families") ||
    normalizedQuery.startsWith("for longer stays") ||
    normalizedQuery.startsWith("what about for") ||
    normalizedQuery.startsWith("what about lease") ||
    normalizedQuery.startsWith("and which") ||
    normalizedQuery.startsWith("and what")
  );
}

export function buildConversationContextPatch(
  intent: AssistantIntent,
  previousContext?: AssistantConversationContext | null,
  options?: {
    resolvedTownSlugs?: string[];
    resolvedPageTypes?: AssistantPageType[];
  },
): AssistantConversationContext {
  const cleanPreviousContext = sanitizeConversationContext(previousContext);

  return {
    activeIntentKind: intent.primaryIntentKind,
    activePrimaryIntentKind: intent.primaryIntentKind,
    activeFocusDomainKind: intent.focusDomainKind,
    activeTownSlugs: unique(
      intent.explicitTownSlugs.length
        ? intent.explicitTownSlugs
        : options?.resolvedTownSlugs?.length
          ? options.resolvedTownSlugs
          : intent.townSlugs.length
            ? intent.townSlugs
            : cleanPreviousContext.activeTownSlugs,
    ).slice(0, 4),
    activeMentionedTownSlugs: unique(
      intent.queryFrame.mentionedTownSlugs.length
        ? intent.queryFrame.mentionedTownSlugs
        : intent.explicitTownSlugs.length
          ? intent.explicitTownSlugs
          : cleanPreviousContext.activeMentionedTownSlugs,
    ).slice(0, 4),
    activeComparisonTownSlugs: unique(
      intent.queryFrame.comparisonTownSlugs.length
        ? intent.queryFrame.comparisonTownSlugs
        : intent.primaryIntentKind === "comparison"
          ? cleanPreviousContext.activeComparisonTownSlugs
          : [],
    ).slice(0, 4),
    activeTopics: unique(
      intent.topics.length ? intent.topics : cleanPreviousContext.activeTopics,
    ).slice(0, 6),
    activePageTypes: unique(
      options?.resolvedPageTypes?.length
        ? options.resolvedPageTypes
        : intent.pageTypes.length
          ? intent.pageTypes
          : cleanPreviousContext.activePageTypes,
    ).slice(0, 4),
    activeUserProfile: intent.userProfile ?? cleanPreviousContext.activeUserProfile,
  };
}
