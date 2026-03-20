import type { AssistantIntent, AssistantSearchOptions } from "./types.ts";

export function getAssistantSearchOptions(intent: AssistantIntent): AssistantSearchOptions {
  switch (intent.intentKind) {
    case "property":
      return {
        allowedPathnames: ["/property-rules"],
        allowedPageTypes: ["resource"],
        mustIncludePathname: "/property-rules",
      };
    case "women_safety":
      return {
        allowedPathnames: ["/womens-safety"],
        allowedPageTypes: ["resource"],
        mustIncludePathname: "/womens-safety",
      };
    case "food_water":
      return {
        allowedPathnames: ["/food"],
        allowedPageTypes: ["resource"],
        mustIncludePathname: "/food",
      };
    case "banking":
      return {
        allowedPathnames: ["/banking"],
        allowedPageTypes: ["resource"],
        mustIncludePathname: "/banking",
      };
    case "power":
      return {
        allowedPathnames: ["/power-backup"],
        allowedPageTypes: ["resource"],
        mustIncludePathname: "/power-backup",
      };
    case "community":
      return {
        allowedPathnames: ["/community"],
        allowedPageTypes: ["resource"],
        mustIncludePathname: "/community",
      };
    case "moving":
      return {
        allowedPathnames: ["/first-30-days"],
        allowedPageTypes: ["resource"],
        mustIncludePathname: "/first-30-days",
      };
    case "method":
      return {
        allowedPathnames: ["/how-it-works"],
        allowedPageTypes: ["method", "meta"],
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
