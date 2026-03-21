import { assistantAnticipationPromptBank } from "./assistant/anticipation.generated.ts";

export const assistantDomainPromptCases = assistantAnticipationPromptBank.domain;
export const assistantDomainPromptBankStrings = assistantDomainPromptCases.map(
  (entry) => entry.prompt,
);
