import type { AssistantIntent, AssistantSearchOptions } from "./types.ts";

export function getAssistantSearchOptions(intent: AssistantIntent): AssistantSearchOptions {
  const effectiveKind = intent.focusDomainKind ?? intent.intentKind;
  const anticipationKeywords = intent.anticipationMatch?.entry.preferredKeywords.slice(0, 4);

  switch (effectiveKind) {
    case "property":
      return {
        allowedPathnames: ["/property-rules"],
        allowedPageTypes: ["resource"],
        requiredKeywords: anticipationKeywords,
        mustIncludePathname: "/property-rules",
      };
    case "women_safety":
      return {
        allowedPathnames: ["/womens-safety"],
        allowedPageTypes: ["resource"],
        requiredKeywords: anticipationKeywords,
        mustIncludePathname: "/womens-safety",
      };
    case "food_water":
      return {
        allowedPathnames: ["/food"],
        allowedPageTypes: ["resource"],
        requiredKeywords: anticipationKeywords,
        mustIncludePathname: "/food",
      };
    case "banking":
      return {
        allowedPathnames: ["/banking"],
        allowedPageTypes: ["resource"],
        requiredKeywords: anticipationKeywords,
        mustIncludePathname: "/banking",
      };
    case "power":
      return {
        allowedPathnames: ["/power-backup"],
        allowedPageTypes: ["resource"],
        requiredKeywords: anticipationKeywords,
        mustIncludePathname: "/power-backup",
      };
    case "community":
      return {
        allowedPathnames: ["/community"],
        allowedPageTypes: ["resource"],
        requiredKeywords: anticipationKeywords,
        mustIncludePathname: "/community",
      };
    case "moving":
      return {
        allowedPathnames: ["/first-30-days"],
        allowedPageTypes: ["resource"],
        requiredKeywords: anticipationKeywords,
        mustIncludePathname: "/first-30-days",
      };
    case "method":
      return {
        allowedPathnames: ["/how-it-works"],
        allowedPageTypes: ["method", "meta"],
        requiredKeywords: anticipationKeywords,
        mustIncludePathname: "/how-it-works",
      };
    case "town_fit":
      return {
        allowedPageTypes: ["town", "guide", "meta"],
      };
    case "comparison":
      return {
        allowedPageTypes: ["town", "guide"],
      };
    case "generic":
    default:
      return {};
  }
}
