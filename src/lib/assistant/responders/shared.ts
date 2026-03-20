import { getGuideBySlug, guides } from "../../guides.ts";
import { getTownBySlug } from "../../towns.ts";
import type {
  AssistantCitation,
  AssistantNextLink,
  AssistantPageType,
  AssistantResponse,
  AssistantSearchResult,
} from "../types.ts";

export type AssistantResponderResult = {
  answer: string;
  keyPoints: string[];
  caution?: string;
  citations: AssistantCitation[];
  nextLinks: AssistantNextLink[];
  confidence: AssistantResponse["confidence"];
  resolvedTownSlugs?: string[];
  resolvedPageTypes?: AssistantPageType[];
};

export function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

export function trimText(input: string, maxLength: number) {
  if (input.length <= maxLength) return input;
  return `${input.slice(0, maxLength - 1).trimEnd()}…`;
}

export function toSentences(input: string) {
  return input
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

export function summarizeText(input: string, maxSentences = 1, maxLength = 140) {
  return trimText(toSentences(input).slice(0, maxSentences).join(" "), maxLength);
}

export function buildCitation(
  title: string,
  href: string,
  sectionLabel: string,
  excerpt?: string,
): AssistantCitation {
  return {
    title,
    href,
    sectionLabel,
    excerpt,
  };
}

export function buildChunkCitation(
  result: AssistantSearchResult,
  maxSentences = 1,
): AssistantCitation {
  return buildCitation(
    result.chunk.pageTitle,
    `${result.chunk.pathname}#${result.chunk.anchor}`,
    result.chunk.sectionTitle,
    summarizeText(result.chunk.text, maxSentences, 130),
  );
}

export function dedupeNextLinks(links: AssistantNextLink[]) {
  return unique(links.map((item) => JSON.stringify(item)))
    .map((item) => JSON.parse(item) as AssistantNextLink)
    .slice(0, 3);
}

export function buildTownProfileLink(slug: string, reason?: string): AssistantNextLink | null {
  const town = getTownBySlug(slug);
  if (!town) return null;

  return {
    label: `${town.name} town profile`,
    href: `/towns/${town.slug}`,
    reason: reason ?? `Read the grounded town page for ${town.name}.`,
  };
}

export function buildGuideLink(
  slug: string,
  reason?: string,
  label?: string,
): AssistantNextLink | null {
  const guide = getGuideBySlug(slug);
  if (!guide) return null;

  return {
    label: label ?? guide.title,
    href: `/guides/${guide.slug}`,
    reason: reason ?? "Use the editorial guide for a wider decision frame.",
  };
}

export function buildCompareLink(slugs: string[], reason?: string): AssistantNextLink | null {
  if (slugs.length < 2) return null;

  return {
    label: "Compare these towns",
    href: `/compare?towns=${slugs.slice(0, 3).join(",")}`,
    reason:
      reason ??
      "See the shortlist side by side instead of reading each town separately.",
  };
}

export function buildMethodLink(
  anchor = "limits",
  reason = "See how Appleville reads and limits this answer.",
): AssistantNextLink {
  return {
    label: "How Appleville works",
    href: `/how-it-works#${anchor}`,
    reason,
  };
}

export function buildResourceLink(
  label: string,
  href: string,
  reason: string,
): AssistantNextLink {
  return { label, href, reason };
}

export function getPrimaryRelatedGuideSlug(townSlugs: string[]) {
  for (const slug of townSlugs) {
    const town = getTownBySlug(slug);
    const guideSlug = town?.relatedGuideSlugs[0];
    if (guideSlug) return guideSlug;
  }

  const firstGuide = guides[0];
  return firstGuide?.slug ?? null;
}

export function ensureKeyPoints(points: string[]) {
  return unique(points.map((point) => point.trim()).filter(Boolean)).slice(0, 3);
}
