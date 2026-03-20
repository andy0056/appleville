import { assistantCorpus } from "../corpus.ts";
import { searchAssistantCorpus } from "../search.ts";
import { getAssistantSearchOptions } from "../whitelist.ts";
import type { AssistantIntent } from "../types.ts";
import {
  buildChunkCitation,
  buildCompareLink,
  buildGuideLink,
  buildTownProfileLink,
  dedupeNextLinks,
  ensureKeyPoints,
  summarizeText,
  type AssistantResponderResult,
} from "./shared.ts";

export function buildGenericResponse(intent: AssistantIntent): AssistantResponderResult | null {
  const { results, confidence } = searchAssistantCorpus(
    assistantCorpus,
    intent,
    getAssistantSearchOptions(intent),
  );

  if (!results.length || confidence === "low") return null;

  const [primary, secondary] = results;
  const townSlugs = Array.from(new Set(results.flatMap((result) => result.chunk.entitySlugs)));

  const answer =
    confidence === "high"
      ? summarizeText(primary.chunk.text, 2, 180)
      : "The site has some relevant material here, but the cleanest answer is still to open the strongest page directly.";

  return {
    answer,
    keyPoints: ensureKeyPoints(
      results.slice(0, 3).map((result) => summarizeText(result.chunk.text, 1, 140)),
    ),
    caution:
      confidence === "medium"
        ? "This answer is based on the closest grounded Appleville pages, not a dedicated domain responder."
        : undefined,
    citations: results.slice(0, 3).map((result) => buildChunkCitation(result)),
    nextLinks: dedupeNextLinks(
      [
        townSlugs.length >= 2 ? buildCompareLink(townSlugs) : null,
        townSlugs.length === 1 ? buildTownProfileLink(townSlugs[0]) : null,
        secondary?.chunk.pageType === "guide"
          ? buildGuideLink(
              secondary.chunk.pathname.replace("/guides/", ""),
              "Open the full guide instead of relying on a short extracted answer.",
              secondary.chunk.pageTitle,
            )
          : null,
      ].filter((item): item is NonNullable<typeof item> => Boolean(item)),
    ),
    confidence,
    resolvedTownSlugs: townSlugs,
    resolvedPageTypes: results.map((result) => result.chunk.pageType),
  };
}
