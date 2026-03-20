import type { AssistantIntentKind } from "./types.ts";

export const comparableIntentKinds = new Set<AssistantIntentKind>([
  "town_fit",
  "women_safety",
  "food_water",
  "banking",
  "power",
  "community",
  "moving",
]);

export const protectedIntentKinds = new Set<AssistantIntentKind>(["property", "method"]);

export function isComparableIntentKind(value: AssistantIntentKind | null | undefined) {
  return Boolean(value && comparableIntentKinds.has(value));
}

export function isProtectedIntentKind(value: AssistantIntentKind | null | undefined) {
  return Boolean(value && protectedIntentKinds.has(value));
}
