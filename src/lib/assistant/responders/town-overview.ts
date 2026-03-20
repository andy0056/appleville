import { townSectionAnchors } from "../../content-anchors.ts";
import { getTownBySlug } from "../../towns.ts";
import type { AssistantIntent } from "../types.ts";
import {
  buildCitation,
  buildCompareLink,
  buildGuideLink,
  buildTownProfileLink,
  dedupeNextLinks,
  ensureKeyPoints,
  summarizeText,
  type AssistantResponderResult,
} from "./shared.ts";

export function buildTownOverviewResponse(intent: AssistantIntent): AssistantResponderResult | null {
  const subjectSlug =
    intent.queryFrame.subjectTownSlugs[0] ??
    intent.queryFrame.mentionedTownSlugs[0] ??
    intent.townSlugs[0];
  const town = subjectSlug ? getTownBySlug(subjectSlug) : null;

  if (!town) return null;

  const comparisonSlugs = [town.slug, ...town.relatedTownSlugs.slice(0, 2)];
  const guideSlug = town.relatedGuideSlugs[0];

  return {
    answer: `${town.name} is strongest as ${town.archetype.toLowerCase()}. It fits best when you want ${summarizeText(
      town.summary,
      1,
      110,
    ).toLowerCase()}`,
    keyPoints: ensureKeyPoints([
      summarizeText(town.goodFor.join(". "), 1, 140),
      summarizeText(town.practicalReality, 1, 140),
      summarizeText(town.tradeoff, 1, 140),
    ]),
    caution: summarizeText(town.notIdealFor.join(". "), 1, 180),
    citations: [
      buildCitation(
        `${town.name}, Himachal`,
        `/towns/${town.slug}#${townSectionAnchors.overview}`,
        "Overview",
        summarizeText(town.summary, 1, 120),
      ),
      buildCitation(
        `${town.name}, Himachal`,
        `/towns/${town.slug}#${townSectionAnchors.bestFor}`,
        "Best for",
        summarizeText(town.goodFor.join(". "), 1, 120),
      ),
      buildCitation(
        `${town.name}, Himachal`,
        `/towns/${town.slug}#${townSectionAnchors.tradeoff}`,
        "The tradeoff",
        summarizeText(town.tradeoff, 1, 120),
      ),
    ],
    nextLinks: dedupeNextLinks(
      [
        buildTownProfileLink(town.slug, `Open the full grounded page for ${town.name}.`),
        buildCompareLink(comparisonSlugs, `Compare ${town.name} with the closest alternatives instead of reading in isolation.`),
        guideSlug ? buildGuideLink(guideSlug) : null,
      ].filter((item): item is NonNullable<typeof item> => Boolean(item)),
    ),
    confidence: "high",
    resolvedTownSlugs: [town.slug],
    resolvedPageTypes: ["town", "guide"],
  };
}
