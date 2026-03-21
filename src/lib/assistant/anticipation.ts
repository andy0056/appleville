import { assistantAnticipationEntries } from "./anticipation.generated.ts";
import type {
  AssistantAnticipationEntry,
  AssistantAnticipationMatch,
  AssistantConversationContext,
} from "./types.ts";

function containsNormalizedPhrase(normalizedText: string, phrase: string) {
  const normalizedPhrase = phrase.trim().toLowerCase();
  if (!normalizedPhrase) return false;
  return ` ${normalizedText} `.includes(` ${normalizedPhrase} `);
}

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

type MatchAssistantAnticipationOptions = {
  normalizedQuery: string;
  townSlugs: string[];
  comparisonDetected: boolean;
  followUp: boolean;
  context: AssistantConversationContext;
};

function scoreEntry(
  entry: AssistantAnticipationEntry,
  options: MatchAssistantAnticipationOptions,
): AssistantAnticipationMatch | null {
  if (entry.domainKind === "town_fit" && options.townSlugs.length === 0) {
    return null;
  }

  if (
    entry.domainKind === "comparison" &&
    !options.comparisonDetected &&
    options.townSlugs.length < 2
  ) {
    return null;
  }

  const matchedPatterns = entry.questionPatterns.filter((pattern) =>
    containsNormalizedPhrase(options.normalizedQuery, pattern),
  );
  const matchedRequiredKeywords = entry.requiredKeywords.filter((keyword) =>
    containsNormalizedPhrase(options.normalizedQuery, keyword),
  );
  const matchedPreferredKeywords = entry.preferredKeywords.filter((keyword) =>
    containsNormalizedPhrase(options.normalizedQuery, keyword),
  );

  let score = 0;

  if (matchedPatterns.length) score += matchedPatterns.length * 18;
  if (matchedRequiredKeywords.length) score += matchedRequiredKeywords.length * 14;
  if (matchedPreferredKeywords.length) score += matchedPreferredKeywords.length * 5;

  if (!score) {
    if (
      options.followUp &&
      entry.followUpCapable &&
      options.context.activeFocusDomainKind === entry.domainKind
    ) {
      score += 14;
    } else {
      return null;
    }
  }

  if (options.townSlugs.length === 1 && entry.singleTownCapable) {
    score += 8;
  }

  if (options.comparisonDetected && entry.comparisonCapable) {
    score += 14;
  }

  if (
    options.followUp &&
    entry.followUpCapable &&
    options.context.activeFocusDomainKind === entry.domainKind
  ) {
    score += 10;
  }

  if (entry.domainKind === "comparison" && options.townSlugs.length >= 2) {
    score += 12;
  }

  if (
    entry.domainKind !== "comparison" &&
    !entry.comparisonCapable &&
    options.comparisonDetected &&
    options.townSlugs.length >= 2
  ) {
    score -= 8;
  }

  if (score < 20) return null;

  return {
    entry,
    score,
    matchedKeywords: unique([...matchedRequiredKeywords, ...matchedPreferredKeywords]).slice(0, 6),
    matchedPatterns: matchedPatterns.slice(0, 4),
  };
}

export function matchAssistantAnticipationEntries(
  options: MatchAssistantAnticipationOptions,
) {
  return assistantAnticipationEntries
    .map((entry) => scoreEntry(entry, options))
    .filter((entry): entry is AssistantAnticipationMatch => Boolean(entry))
    .sort((left, right) => right.score - left.score)
    .slice(0, 5);
}

export function getTopAssistantAnticipationMatch(
  options: MatchAssistantAnticipationOptions,
) {
  return matchAssistantAnticipationEntries(options)[0] ?? null;
}
