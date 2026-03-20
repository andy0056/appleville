import {
  assistantStopwords,
  buyerProfileAliases,
  indianLocationAliases,
  knownDomainTerms,
  topicAliases,
  townAliases,
} from "./aliases.ts";
import type {
  AssistantMention,
  AssistantQueryClause,
  AssistantUserProfile,
} from "./types.ts";

const comparisonCuePatterns = [
  " vs ",
  " versus ",
  " compare ",
  " compared to ",
  " compare it with ",
  " compare with ",
  " against ",
  " rank against ",
  " stack up against ",
  " better than ",
  " which is better ",
  " which one is better ",
  " what about ",
  " how about ",
  " instead",
] as const;

const rankingCuePatterns = [
  " rank ",
  " ranked ",
  " ranking ",
  " better ",
  " best ",
  " stronger ",
  " quieter ",
  " calmer ",
  " safer ",
  " easier ",
] as const;

const followUpPrefixes = [
  "and ",
  "what about",
  "how about",
  "what if",
  "what about for",
  "what about lease",
  "and for",
  "and what",
  "and which",
] as const;

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

function containsNormalizedPhrase(normalizedText: string, phrase: string) {
  const normalizedPhrase = normalizeText(phrase);
  if (!normalizedPhrase) return false;
  return ` ${normalizedText} `.includes(` ${normalizedPhrase} `);
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

export function includesAny(normalizedQuery: string, phrases: readonly string[]) {
  return phrases.some((phrase) => containsNormalizedPhrase(normalizedQuery, phrase));
}

export function findTownSlugs(normalizedQuery: string) {
  return unique(
    Object.entries(townAliases)
      .filter(([alias]) => containsNormalizedPhrase(normalizedQuery, alias))
      .map(([, slug]) => slug),
  );
}

export function findTopics(normalizedQuery: string) {
  return unique(
    Object.entries(topicAliases)
      .filter(([alias]) => containsNormalizedPhrase(normalizedQuery, alias))
      .flatMap(([, topics]) => topics),
  );
}

export function inferUserProfile(normalizedQuery: string): AssistantUserProfile {
  for (const [phrase, profile] of Object.entries(buyerProfileAliases)) {
    if (normalizedQuery.includes(phrase)) {
      return profile;
    }
  }

  const fromMatch = normalizedQuery.match(/\bfrom ([a-z ]+)\b/);
  if (fromMatch) {
    const location = fromMatch[1].trim();
    if (indianLocationAliases.has(location)) {
      return "out_of_state_indian";
    }
  }

  return null;
}

export function hasKnownDomainSignal(normalizedQuery: string) {
  if (!normalizedQuery) return false;
  return Array.from(knownDomainTerms).some((term) =>
    containsNormalizedPhrase(normalizedQuery, term),
  );
}

export function hasComparisonCue(normalizedQuery: string) {
  if (includesAny(normalizedQuery, comparisonCuePatterns)) return true;

  const townSlugs = findTownSlugs(normalizedQuery);
  if (townSlugs.length >= 2 && normalizedQuery.includes(" or ")) return true;

  return false;
}

export function hasRankingCue(normalizedQuery: string) {
  return includesAny(normalizedQuery, rankingCuePatterns);
}

function getClauseRole(rawText: string, normalizedText: string): AssistantQueryClause["clauseRole"] {
  if (
    rawText.includes("?") ||
    followUpPrefixes.some((prefix) => normalizedText.startsWith(prefix)) ||
    normalizedText.split(" ").length <= 8
  ) {
    return followUpPrefixes.some((prefix) => normalizedText.startsWith(prefix))
      ? "follow_up"
      : "question";
  }

  return "statement";
}

function splitIntoClauseTexts(message: string) {
  return message
    .split(/(?<=[.!?])\s+/)
    .flatMap((segment) => segment.split(/\bbut\b/gi))
    .map((segment) => segment.trim())
    .filter(Boolean);
}

function extractClauseMentions(
  clause: AssistantQueryClause,
  normalizedQuery: string,
): AssistantMention[] {
  const mentions: AssistantMention[] = [];

  for (const [alias, slug] of Object.entries(townAliases)) {
    if (containsNormalizedPhrase(clause.normalizedText, alias)) {
      mentions.push({
        kind: "town",
        value: slug,
        clauseIndex: clause.index,
      });
    }
  }

  for (const alias of Object.keys(topicAliases)) {
    if (containsNormalizedPhrase(clause.normalizedText, alias)) {
      mentions.push({
        kind: "domain",
        value: alias,
        clauseIndex: clause.index,
      });
    }
  }

  if (hasComparisonCue(` ${clause.normalizedText} `)) {
    mentions.push({
      kind: "comparison_cue",
      value: "comparison",
      clauseIndex: clause.index,
    });
  }

  if (hasRankingCue(` ${clause.normalizedText} `)) {
    mentions.push({
      kind: "ranking_cue",
      value: "ranking",
      clauseIndex: clause.index,
    });
  }

  const profile = inferUserProfile(clause.normalizedText);
  if (profile) {
    mentions.push({
      kind: "persona",
      value: profile,
      clauseIndex: clause.index,
    });
  } else if (
    normalizedQuery === clause.normalizedText &&
    normalizedQuery.includes(" from ")
  ) {
    const profileFromWholeQuery = inferUserProfile(normalizedQuery);
    if (profileFromWholeQuery) {
      mentions.push({
        kind: "persona",
        value: profileFromWholeQuery,
        clauseIndex: clause.index,
      });
    }
  }

  return mentions;
}

export function parseAssistantQuery(message: string) {
  const normalizedQuery = normalizeText(message);
  const clauses = splitIntoClauseTexts(message).map((rawText, index) => {
    const normalizedText = normalizeText(rawText);
    return {
      rawText,
      normalizedText,
      index,
      clauseRole: getClauseRole(rawText, normalizedText),
    } satisfies AssistantQueryClause;
  });

  const mentions = clauses.flatMap((clause) => extractClauseMentions(clause, normalizedQuery));

  return {
    normalizedQuery,
    clauses,
    mentions,
  };
}
