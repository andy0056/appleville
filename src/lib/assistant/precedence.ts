import { isComparableIntentKind, isProtectedIntentKind } from "./domain-precedence.ts";
import type {
  AssistantConversationContext,
  AssistantIntentCandidate,
  AssistantIntentKind,
  AssistantMention,
  AssistantQueryClause,
  AssistantQueryFrame,
  AssistantTopic,
} from "./types.ts";

type ResolveAssistantQueryFrameOptions = {
  normalizedQuery: string;
  clauses: AssistantQueryClause[];
  mentions: AssistantMention[];
  candidates: AssistantIntentCandidate[];
  explicitTopics: AssistantTopic[];
  followUp: boolean;
  context: AssistantConversationContext;
};

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

const townFitTopics = new Set<AssistantTopic>([
  "town-fit",
  "remote-work",
  "family",
  "quiet",
  "access",
  "long-stay",
  "social",
  "beauty",
  "tourism",
  "cost",
]);

const defaultTopicsByIntent: Record<AssistantIntentKind, AssistantTopic[]> = {
  town_fit: ["town-fit"],
  comparison: ["town-fit"],
  property: ["property"],
  women_safety: ["safety"],
  food_water: ["food", "water"],
  banking: ["banking"],
  power: ["power"],
  community: ["community"],
  moving: ["moving"],
  method: ["method"],
  generic: [],
};

function getCandidateScore(
  candidates: AssistantIntentCandidate[],
  intentKind: AssistantIntentKind,
) {
  return candidates
    .filter((candidate) => candidate.kind === intentKind)
    .sort((left, right) => right.score - left.score)[0]?.score ?? 0;
}

function getTopDomainCandidate(candidates: AssistantIntentCandidate[]) {
  return candidates
    .filter((candidate) => candidate.kind !== "comparison" && candidate.kind !== "generic")
    .sort((left, right) => right.score - left.score)[0] ?? null;
}

function getMentionedTownSlugs(mentions: AssistantMention[]) {
  return unique(
    mentions
      .filter((mention) => mention.kind === "town")
      .sort((left, right) => left.clauseIndex - right.clauseIndex)
      .map((mention) => mention.value),
  ).slice(0, 4);
}

function getClauseTownSlugs(
  mentions: AssistantMention[],
  clauses: AssistantQueryClause[],
) {
  return clauses.map((clause) => ({
    clause,
    townSlugs: unique(
      mentions
        .filter((mention) => mention.kind === "town" && mention.clauseIndex === clause.index)
        .map((mention) => mention.value),
    ),
  }));
}

function queryLooksLikeTownOverview(normalizedQuery: string) {
  return (
    normalizedQuery.startsWith("tell me about ") ||
    normalizedQuery.startsWith("about ") ||
    normalizedQuery.startsWith("what about ") ||
    normalizedQuery.startsWith("how about ") ||
    normalizedQuery.startsWith("what is ") ||
    normalizedQuery.startsWith("what s ") ||
    normalizedQuery.startsWith("how is ") ||
    normalizedQuery.endsWith(" like") ||
    normalizedQuery.includes(" what is it like") ||
    normalizedQuery.includes(" how is it")
  );
}

function resolveComparisonTownSlugs(
  normalizedQuery: string,
  clauses: AssistantQueryClause[],
  mentions: AssistantMention[],
  followUp: boolean,
  context: AssistantConversationContext,
) {
  const mentionedTownSlugs = getMentionedTownSlugs(mentions);
  const hasComparisonCue = mentions.some((mention) => mention.kind === "comparison_cue");

  if (mentionedTownSlugs.length >= 2) {
    return mentionedTownSlugs;
  }

  const clauseTownSlugs = getClauseTownSlugs(mentions, clauses);
  const comparisonClause = clauses.find((clause) =>
    mentions.some(
      (mention) => mention.kind === "comparison_cue" && mention.clauseIndex === clause.index,
    ),
  );

  if (comparisonClause) {
    const currentTownSlugs =
      clauseTownSlugs.find((entry) => entry.clause.index === comparisonClause.index)?.townSlugs ?? [];
    const earlierTownSlugs = clauseTownSlugs
      .filter((entry) => entry.clause.index < comparisonClause.index)
      .flatMap((entry) => entry.townSlugs);
    const subjectTownSlug = earlierTownSlugs[earlierTownSlugs.length - 1];

    if (subjectTownSlug && currentTownSlugs.length === 1 && subjectTownSlug !== currentTownSlugs[0]) {
      return [subjectTownSlug, currentTownSlugs[0]];
    }
  }

  if (followUp && context.activePrimaryIntentKind === "comparison") {
    if (
      mentionedTownSlugs.length === 1 &&
      normalizedQuery.includes("instead") &&
      context.activeComparisonTownSlugs.length >= 2
    ) {
      const baselineTown =
        context.activeComparisonTownSlugs.find((slug) => slug !== mentionedTownSlugs[0]) ??
        context.activeComparisonTownSlugs[0];
      return unique([baselineTown, mentionedTownSlugs[0]]).slice(0, 4);
    }

    if (
      context.activeComparisonTownSlugs.length >= 2 &&
      (hasComparisonCue || mentionedTownSlugs.length === 0)
    ) {
      return context.activeComparisonTownSlugs;
    }
  }

  if (
    followUp &&
    mentionedTownSlugs.length === 1 &&
    context.activeComparisonTownSlugs.length >= 2 &&
    normalizedQuery.startsWith("what about")
  ) {
    const retainedTown =
      context.activeComparisonTownSlugs.find((slug) => slug !== mentionedTownSlugs[0]) ??
      context.activeComparisonTownSlugs[0];
    return unique([retainedTown, mentionedTownSlugs[0]]).slice(0, 4);
  }

  return [];
}

function resolveSubjectTownSlugs(
  clauses: AssistantQueryClause[],
  mentions: AssistantMention[],
  followUp: boolean,
  context: AssistantConversationContext,
) {
  const clauseTownSlugs = getClauseTownSlugs(mentions, clauses);
  const firstTownClause = clauseTownSlugs.find((entry) => entry.townSlugs.length === 1);

  if (firstTownClause) {
    return firstTownClause.townSlugs;
  }

  const mentionedTownSlugs = getMentionedTownSlugs(mentions);
  if (mentionedTownSlugs.length === 1) {
    return mentionedTownSlugs;
  }

  if (
    followUp &&
    context.activePrimaryIntentKind !== "comparison" &&
    context.activeTownSlugs.length
  ) {
    return context.activeTownSlugs.slice(0, 1);
  }

  return [];
}

function resolveFocusDomainKind(
  candidates: AssistantIntentCandidate[],
  explicitTopics: AssistantTopic[],
  followUp: boolean,
  context: AssistantConversationContext,
  comparisonTownSlugs: string[],
  mentionedTownSlugs: string[],
) {
  const topDomainCandidate = getTopDomainCandidate(candidates);
  if (topDomainCandidate?.kind && topDomainCandidate.kind !== "town_fit") {
    return topDomainCandidate.kind;
  }

  if (explicitTopics.some((topic) => townFitTopics.has(topic))) {
    return "town_fit";
  }

  if (comparisonTownSlugs.length >= 2 || mentionedTownSlugs.length >= 1) {
    return "town_fit";
  }

  if (followUp && context.activeFocusDomainKind) {
    return context.activeFocusDomainKind;
  }

  return topDomainCandidate?.kind ?? null;
}

function resolvePrimaryIntentKind(
  focusDomainKind: AssistantIntentKind | null,
  comparisonTownSlugs: string[],
  candidates: AssistantIntentCandidate[],
  followUp: boolean,
  context: AssistantConversationContext,
  subjectTownSlugs: string[],
) {
  if (focusDomainKind && isProtectedIntentKind(focusDomainKind)) {
    return focusDomainKind;
  }

  const comparisonScore = getCandidateScore(candidates, "comparison");

  if (
    comparisonTownSlugs.length >= 2 &&
    (comparisonScore > 0 ||
      (followUp && context.activePrimaryIntentKind === "comparison") ||
      subjectTownSlugs.length >= 1)
  ) {
    if (!focusDomainKind || focusDomainKind === "town_fit" || isComparableIntentKind(focusDomainKind)) {
      return "comparison";
    }
  }

  if (focusDomainKind) {
    return focusDomainKind;
  }

  if (subjectTownSlugs.length === 1) {
    return "town_fit";
  }

  return "generic";
}

function resolveFocusTopics(
  primaryIntentKind: AssistantIntentKind,
  focusDomainKind: AssistantIntentKind | null,
  explicitTopics: AssistantTopic[],
  candidates: AssistantIntentCandidate[],
  followUp: boolean,
  context: AssistantConversationContext,
) {
  if (explicitTopics.length) return explicitTopics;

  const candidateTopics = unique(
    candidates.flatMap((candidate) => candidate.focusTopics ?? []),
  );
  if (candidateTopics.length) return candidateTopics;

  if (followUp && context.activeTopics.length) {
    return context.activeTopics;
  }

  return defaultTopicsByIntent[focusDomainKind ?? primaryIntentKind] ?? [];
}

export function resolveAssistantQueryFrame({
  normalizedQuery,
  clauses,
  mentions,
  candidates,
  explicitTopics,
  followUp,
  context,
}: ResolveAssistantQueryFrameOptions): AssistantQueryFrame {
  const mentionedTownSlugs = getMentionedTownSlugs(mentions);
  const comparisonTownSlugs = resolveComparisonTownSlugs(
    normalizedQuery,
    clauses,
    mentions,
    followUp,
    context,
  );
  const subjectTownSlugs = resolveSubjectTownSlugs(clauses, mentions, followUp, context);
  const focusDomainKind = resolveFocusDomainKind(
    candidates,
    explicitTopics,
    followUp,
    context,
    comparisonTownSlugs,
    mentionedTownSlugs,
  );
  const primaryIntentKind = resolvePrimaryIntentKind(
    focusDomainKind,
    comparisonTownSlugs,
    candidates,
    followUp,
    context,
    subjectTownSlugs,
  );
  const focusTopics = resolveFocusTopics(
    primaryIntentKind,
    focusDomainKind,
    explicitTopics,
    candidates,
    followUp,
    context,
  );

  const hasRankingCue = mentions.some((mention) => mention.kind === "ranking_cue");
  const comparisonMode =
    primaryIntentKind === "comparison"
      ? hasRankingCue ||
          normalizedQuery.includes("rank") ||
          normalizedQuery.includes("better") ||
          normalizedQuery.includes("best")
        ? "ranking"
        : normalizedQuery.includes("against") ||
            normalizedQuery.includes("compared") ||
            normalizedQuery.includes("stack up")
          ? "contrast"
          : "direct"
      : "none";

  const answerShape =
    primaryIntentKind === "comparison"
      ? subjectTownSlugs.length >= 1 && comparisonTownSlugs.length >= 2
        ? "overview_plus_comparison"
        : "comparison"
      : primaryIntentKind === "town_fit" &&
          subjectTownSlugs.length === 1 &&
          queryLooksLikeTownOverview(normalizedQuery) &&
          !explicitTopics.length
        ? "single_town_overview"
        : "single_domain";

  return {
    primaryIntentKind,
    focusDomainKind,
    focusTopics,
    mentionedTownSlugs,
    subjectTownSlugs,
    comparisonTownSlugs,
    comparisonMode,
    answerShape,
  };
}
