import { assistantAnticipationPromptBank } from "./assistant/anticipation.generated.ts";

export const assistantSingleTownPromptCases = assistantAnticipationPromptBank.singleTown;
export const assistantSingleTownPromptBankStrings = assistantSingleTownPromptCases.map(
  (entry) => entry.prompt,
);
