import { assistantAnticipationPromptBank } from "./assistant/anticipation.generated.ts";

export const assistantFollowUpPromptCases = assistantAnticipationPromptBank.followUp;
export const assistantFollowUpPromptBankStrings = assistantFollowUpPromptCases.map(
  (entry) => entry.prompt,
);
