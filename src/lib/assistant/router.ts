import {
  assistantStopwords,
  buyerProfileAliases,
  indianLocationAliases,
  knownDomainTerms,
  topicAliases,
  topicToPageTypes,
  townAliases,
} from "./aliases.ts";
import { isFollowUpQuery, sanitizeConversationContext } from "./context.ts";
import type {
  AssistantConversationContext,
  AssistantIntent,
  AssistantIntentKind,
  AssistantPageType,
  AssistantSubIntent,
  AssistantTopic,
  AssistantUserProfile,
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

function includesAny(normalizedQuery: string, phrases: string[]) {
  return phrases.some((phrase) => normalizedQuery.includes(phrase));
}

function inferUserProfile(normalizedQuery: string): AssistantUserProfile {
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

function inferIntentKind(
  normalizedQuery: string,
  explicitTownSlugs: string[],
  followUp: boolean,
  context: AssistantConversationContext,
): AssistantIntentKind {
  const wantsComparison =
    explicitTownSlugs.length >= 2 ||
    normalizedQuery.includes(" vs ") ||
    normalizedQuery.includes(" versus ") ||
    normalizedQuery.includes("compare ");

  let intentKind: AssistantIntentKind = "generic";

  if (
    includesAny(normalizedQuery, [
      "how appleville works",
      "how this works",
      "what do you consider",
      "how do you decide",
      "how do you score",
      "how are matches produced",
      "citation",
      "citations",
    ])
  ) {
    intentKind = "method";
  } else if (
    includesAny(normalizedQuery, [
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
    ])
  ) {
    intentKind = "property";
  } else if (
    includesAny(normalizedQuery, [
      "women safety",
      "safe for women",
      "solo woman",
      "solo women",
      "for women",
      "female traveler",
      "harassment",
      "eve teasing",
      "stalking",
      "women",
      "woman",
      "safety",
    ])
  ) {
    intentKind = "women_safety";
  } else if (
    includesAny(normalizedQuery, [
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
    ])
  ) {
    intentKind = "food_water";
  } else if (
    includesAny(normalizedQuery, [
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
    ])
  ) {
    intentKind = "banking";
  } else if (
    includesAny(normalizedQuery, [
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
    ])
  ) {
    intentKind = "power";
  } else if (
    includesAny(normalizedQuery, [
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
    ])
  ) {
    intentKind = "community";
  } else if (
    includesAny(normalizedQuery, [
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
    ])
  ) {
    intentKind = "moving";
  } else if (wantsComparison) {
    intentKind = "comparison";
  } else if (
    includesAny(normalizedQuery, [
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
    ])
  ) {
    intentKind = "town_fit";
  }

  if (!followUp) return intentKind;

  if (context.activeIntentKind === "comparison" && explicitTownSlugs.length >= 2) {
    return "comparison";
  }

  if (
    context.activeIntentKind === "comparison" &&
    context.activeTownSlugs.length >= 2 &&
    (intentKind === "generic" || intentKind === "town_fit")
  ) {
    return "comparison";
  }

  if (intentKind === "generic" && context.activeIntentKind) {
    return context.activeIntentKind;
  }

  if (
    context.activeIntentKind &&
    ["property", "women_safety", "food_water", "banking", "power", "community", "moving"].includes(
      context.activeIntentKind,
    ) &&
    (intentKind === "generic" || intentKind === context.activeIntentKind)
  ) {
    return context.activeIntentKind;
  }

  return intentKind;
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
      if (includesAny(normalizedQuery, ["protein", "meat", "trout", "mutton", "chicken"])) {
        return "groceries";
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
  intentKind: AssistantIntentKind,
  explicitTopics: AssistantTopic[],
  followUp: boolean,
  context: AssistantConversationContext,
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
  if (followUp && context.activeTopics.length) {
    return unique([...context.activeTopics, ...(domainTopics[intentKind] ?? [])]);
  }
  return domainTopics[intentKind] ?? [];
}

function getPageTypesForIntent(
  intentKind: AssistantIntentKind,
  topics: AssistantTopic[],
  followUp: boolean,
  context: AssistantConversationContext,
): AssistantPageType[] {
  switch (intentKind) {
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
  const normalizedQuery = normalizeText(message);
  const cleanContext = sanitizeConversationContext(context);
  const explicitTownSlugs = findTownSlugs(normalizedQuery);
  const followUp = isFollowUpQuery(normalizedQuery);
  const townSlugs = explicitTownSlugs.length
    ? explicitTownSlugs
    : followUp
      ? cleanContext.activeTownSlugs
      : [];
  const intentKind = inferIntentKind(
    normalizedQuery,
    explicitTownSlugs,
    followUp,
    cleanContext,
  );
  const explicitTopics = findTopics(normalizedQuery);
  const topics = getTopicsForIntent(intentKind, explicitTopics, followUp, cleanContext);
  const pageTypes = getPageTypesForIntent(intentKind, topics, followUp, cleanContext);
  const userProfile = inferUserProfile(normalizedQuery) ?? (followUp ? cleanContext.activeUserProfile : null);
  const wantsComparison = intentKind === "comparison";
  const wantsTownRanking =
    intentKind === "town_fit" &&
    townSlugs.length <= 1 &&
    (normalizedQuery.includes("best") ||
      normalizedQuery.includes("which towns") ||
      normalizedQuery.includes("which town") ||
      normalizedQuery.includes("top") ||
      townSlugs.length === 0);
  const wantsMethod = intentKind === "method";

  return {
    rawQuery: message,
    normalizedQuery,
    intentKind,
    subIntent: inferSubIntent(intentKind, normalizedQuery, townSlugs),
    explicitTownSlugs,
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
      intentKind !== "generic" ||
      (followUp && cleanContext.activeIntentKind !== null),
  };
}
