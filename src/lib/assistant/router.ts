import { sanitizeConversationContext, isFollowUpQuery } from "./context.ts";
import { resolveAssistantQueryFrame } from "./precedence.ts";
import {
  findTopics,
  findTownSlugs,
  hasComparisonCue,
  hasKnownDomainSignal,
  includesAny,
  inferUserProfile,
  parseAssistantQuery,
} from "./query-parser.ts";
import { topicToPageTypes } from "./aliases.ts";
import type {
  AssistantConversationContext,
  AssistantIntent,
  AssistantIntentCandidate,
  AssistantIntentKind,
  AssistantPageType,
  AssistantSubIntent,
  AssistantTopic,
} from "./types.ts";

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

const intentPhraseMap: Record<
  Exclude<AssistantIntentKind, "comparison" | "generic" | "town_fit">,
  string[]
> = {
  method: [
    "how appleville works",
    "how this works",
    "what do you consider",
    "how do you decide",
    "how do you score",
    "how are matches produced",
    "citation",
    "citations",
  ],
  property: [
    "property",
    "buy land",
    "buy property",
    "purchase property",
    "buy a flat",
    "buy a house",
    "section 118",
    "gpa",
    "poa",
    "ownership",
    "owner",
    "lease",
    "registered lease",
    "can i buy",
    "can outsiders buy",
  ],
  women_safety: [
    "women safety",
    "women s safety",
    "safe for women",
    "solo woman",
    "solo women",
    "for women",
    "female traveler",
    "harassment",
    "eve teasing",
    "stalking",
    "woman",
    "women",
    "safety",
  ],
  food_water: [
    "tap water",
    "drinking water",
    "water safe",
    "groceries",
    "grocery",
    "food",
    "delivery",
    "protein",
    "dairy",
    "cheese",
    "milk",
    "bakery",
    "sourdough",
  ],
  banking: [
    "bank account",
    "open account",
    "atm",
    "upi",
    "cash",
    "forex",
    "remittance",
    "banking",
    "bank",
    "payment",
    "payments",
    "money",
  ],
  power: [
    "power cut",
    "power cuts",
    "power",
    "electricity",
    "outage",
    "outages",
    "inverter",
    "ups",
    "backup",
    "heating",
    "heater",
  ],
  community: [
    "coworking",
    "community",
    "lonely",
    "loneliness",
    "mental health",
    "therapy",
    "therapist",
    "aa",
    "na",
    "social life",
    "friends",
    "isolation",
  ],
  moving: [
    "trial move",
    "first 30 days",
    "first month",
    "settle",
    "moving",
    "move",
    "sim",
    "utilities",
    "utility",
    "proof of address",
    "rental setup",
    "onboarding",
    "broadband",
  ],
};

const townFitSignals = [
  "best town",
  "best towns",
  "which town",
  "which towns",
  "remote work",
  "family",
  "quiet",
  "quieter",
  "access",
  "long stay",
  "longer stay",
  "long term",
  "social",
  "fit",
  "better town",
  "rank",
] as const;

const townOverviewPhrases = [
  "tell me about",
  "about",
  "what is",
  "what s",
  "what about",
  "how is",
  "like",
] as const;

function mapTopicsToPageTypes(topics: AssistantTopic[]) {
  return unique(topics.flatMap((topic) => topicToPageTypes[topic] ?? []));
}

function buildClauseCandidates(
  normalizedText: string,
  clauseIndex: number,
  clauseTownSlugs: string[],
  explicitTopics: AssistantTopic[],
): AssistantIntentCandidate[] {
  const candidates: AssistantIntentCandidate[] = [];

  for (const [kind, phrases] of Object.entries(intentPhraseMap) as [
    Exclude<AssistantIntentKind, "comparison" | "generic" | "town_fit">,
    string[],
  ][]) {
    if (includesAny(normalizedText, phrases)) {
      candidates.push({
        kind,
        score: kind === "property" || kind === "method" ? 90 : 74,
        clauseIndex,
        evidence: phrases.filter((phrase) => normalizedText.includes(phrase)).slice(0, 3),
        focusTopics: explicitTopics,
      });
    }
  }

  const clauseHasComparisonCue = hasComparisonCue(` ${normalizedText} `);
  if (
    clauseTownSlugs.length >= 2 ||
    clauseHasComparisonCue ||
    (clauseTownSlugs.length >= 1 && normalizedText.includes(" or "))
  ) {
    candidates.push({
      kind: "comparison",
      score: clauseTownSlugs.length >= 2 ? 84 : 72,
      clauseIndex,
      evidence: ["comparison"],
      focusTopics: explicitTopics,
    });
  }

  const looksLikeTownOverview =
    clauseTownSlugs.length === 1 && includesAny(normalizedText, townOverviewPhrases);

  if (includesAny(normalizedText, townFitSignals) || clauseTownSlugs.length === 1) {
    candidates.push({
      kind: "town_fit",
      score: looksLikeTownOverview ? 64 : clauseTownSlugs.length === 1 ? 58 : 52,
      clauseIndex,
      evidence: clauseTownSlugs.length === 1 ? ["single-town"] : ["town-fit"],
      focusTopics: explicitTopics.filter((topic) =>
        [
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
        ].includes(topic),
      ),
    });
  }

  return candidates;
}

function inferSubIntent(
  intentKind: AssistantIntentKind,
  normalizedQuery: string,
  townSlugs: string[],
): AssistantSubIntent {
  switch (intentKind) {
    case "comparison":
      return "ranking";
    case "property":
      if (includesAny(normalizedQuery, ["lease", "rent agreement", "registered lease"])) {
        return "lease";
      }
      if (includesAny(normalizedQuery, ["gpa", "poa", "scam", "risk", "workaround", "benami"])) {
        return "risk";
      }
      if (
        includesAny(normalizedQuery, [
          "can i buy",
          "can outsiders buy",
          "can an oci buy",
          "can a foreigner buy",
          "eligible",
          "eligibility",
        ])
      ) {
        return "eligibility";
      }
      return "purchase_route";
    case "women_safety":
      if (
        includesAny(normalizedQuery, [
          "healthcare",
          "clinic",
          "hospital",
          "gynecological",
          "pregnant",
        ])
      ) {
        return "healthcare";
      }
      return townSlugs.length ? "town_safety" : "statewide_safety";
    case "food_water":
      if (includesAny(normalizedQuery, ["tap water", "drinking water", "water safe", "water"])) {
        return "water";
      }
      if (includesAny(normalizedQuery, ["delivery", "swiggy", "zomato"])) {
        return "delivery";
      }
      return "groceries";
    case "banking":
      if (includesAny(normalizedQuery, ["forex", "remittance", "wire transfer", "money2india"])) {
        return "forex";
      }
      if (
        includesAny(normalizedQuery, [
          "open account",
          "bank account",
          "documents",
          "docs",
          "nri account",
        ])
      ) {
        return "account_opening";
      }
      if (includesAny(normalizedQuery, ["network", "signal", "otp", "payment failure"])) {
        return "network";
      }
      return "cash_upi";
    case "power":
      if (includesAny(normalizedQuery, ["inverter", "ups", "backup", "battery", "solar"])) {
        return "backup";
      }
      if (includesAny(normalizedQuery, ["heating", "heater", "warm", "winter heating"])) {
        return "heating";
      }
      return "outages";
    case "community":
      if (includesAny(normalizedQuery, ["mental health", "therapy", "therapist", "counselling"])) {
        return "mental_health";
      }
      if (includesAny(normalizedQuery, ["coworking", "coliving"])) {
        return "coworking";
      }
      return "social";
    case "moving":
      if (includesAny(normalizedQuery, ["trial move", "test a move", "scouting trip"])) {
        return "trial_move";
      }
      if (includesAny(normalizedQuery, ["utility", "utilities", "sim", "broadband", "lpg"])) {
        return "utilities";
      }
      return "settling";
    case "method":
      return "how_it_works";
    case "town_fit":
      return townSlugs.length === 1 ? "single_town" : "ranking";
    default:
      return "fallback";
  }
}

function getTopicsForIntent(
  primaryIntentKind: AssistantIntentKind,
  focusDomainKind: AssistantIntentKind | null,
  explicitTopics: AssistantTopic[],
  followUp: boolean,
  context: AssistantConversationContext,
  frameTopics: AssistantTopic[],
) {
  const domainTopics: Record<AssistantIntentKind, AssistantTopic[]> = {
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

  if (explicitTopics.length) return explicitTopics;
  if (frameTopics.length) return frameTopics;
  if (followUp && context.activeTopics.length) return context.activeTopics;

  return domainTopics[focusDomainKind ?? primaryIntentKind] ?? [];
}

function getPageTypesForIntent(
  primaryIntentKind: AssistantIntentKind,
  focusDomainKind: AssistantIntentKind | null,
  topics: AssistantTopic[],
  followUp: boolean,
  context: AssistantConversationContext,
): AssistantPageType[] {
  const effectiveIntentKind = focusDomainKind ?? primaryIntentKind;

  switch (effectiveIntentKind) {
    case "property":
    case "women_safety":
    case "food_water":
    case "banking":
    case "power":
    case "community":
    case "moving":
      return ["resource"];
    case "method":
      return ["method", "meta"];
    case "town_fit":
    case "comparison":
      return ["town", "guide", "meta"];
    case "generic":
    default: {
      const fromTopics = mapTopicsToPageTypes(topics);
      if (fromTopics.length) return fromTopics;
      return followUp ? context.activePageTypes : [];
    }
  }
}

export function parseAssistantIntent(
  message: string,
  context?: AssistantConversationContext | null,
): AssistantIntent {
  const cleanContext = sanitizeConversationContext(context);
  const { normalizedQuery, clauses, mentions } = parseAssistantQuery(message);
  const followUp = isFollowUpQuery(normalizedQuery);
  const explicitTownSlugs = findTownSlugs(normalizedQuery);
  const explicitTopics = findTopics(normalizedQuery);

  const candidates = clauses.flatMap((clause) =>
    buildClauseCandidates(
      clause.normalizedText,
      clause.index,
      unique(
        mentions
          .filter((mention) => mention.kind === "town" && mention.clauseIndex === clause.index)
          .map((mention) => mention.value),
      ),
      findTopics(clause.normalizedText),
    ),
  );

  const queryFrame = resolveAssistantQueryFrame({
    normalizedQuery,
    clauses,
    mentions,
    candidates,
    explicitTopics,
    followUp,
    context: cleanContext,
  });

  const primaryIntentKind = queryFrame.primaryIntentKind;
  const focusDomainKind = queryFrame.focusDomainKind;
  const townSlugs = queryFrame.comparisonTownSlugs.length
    ? queryFrame.comparisonTownSlugs
    : queryFrame.subjectTownSlugs.length
      ? queryFrame.subjectTownSlugs
      : queryFrame.mentionedTownSlugs.length
        ? queryFrame.mentionedTownSlugs
        : followUp
          ? cleanContext.activeTownSlugs
          : [];
  const topics = getTopicsForIntent(
    primaryIntentKind,
    focusDomainKind,
    explicitTopics,
    followUp,
    cleanContext,
    queryFrame.focusTopics,
  );
  const pageTypes = getPageTypesForIntent(
    primaryIntentKind,
    focusDomainKind,
    topics,
    followUp,
    cleanContext,
  );
  const userProfile = inferUserProfile(normalizedQuery) ?? (followUp ? cleanContext.activeUserProfile : null);
  const wantsComparison = primaryIntentKind === "comparison";
  const wantsTownRanking =
    (primaryIntentKind === "comparison" && focusDomainKind === "town_fit") ||
    (primaryIntentKind === "town_fit" &&
      queryFrame.answerShape !== "single_town_overview" &&
      (normalizedQuery.includes("best") ||
        normalizedQuery.includes("which towns") ||
        normalizedQuery.includes("which town") ||
        normalizedQuery.includes("top") ||
        townSlugs.length === 0));
  const wantsMethod = primaryIntentKind === "method" || focusDomainKind === "method";

  return {
    rawQuery: message,
    normalizedQuery,
    intentKind: primaryIntentKind,
    primaryIntentKind,
    focusDomainKind,
    subIntent: inferSubIntent(focusDomainKind ?? primaryIntentKind, normalizedQuery, townSlugs),
    explicitTownSlugs,
    mentionedTownSlugs: queryFrame.mentionedTownSlugs,
    townSlugs,
    topics,
    pageTypes,
    userProfile,
    wantsComparison,
    wantsTownRanking,
    wantsMethod,
    isFollowUp: followUp,
    hasKnownDomainSignal:
      hasKnownDomainSignal(normalizedQuery) ||
      explicitTownSlugs.length > 0 ||
      topics.length > 0 ||
      primaryIntentKind !== "generic" ||
      (followUp && cleanContext.activeIntentKind !== null),
    queryFrame,
  };
}

export { normalizeText } from "./query-parser.ts";
