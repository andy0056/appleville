import { assistantAnticipationPromptBank } from "./assistant/anticipation.generated.ts";

export const assistantComparisonPromptCases = assistantAnticipationPromptBank.comparison;
export const assistantComparisonPromptBankStrings = assistantComparisonPromptCases.map(
  (entry) => entry.prompt,
);
