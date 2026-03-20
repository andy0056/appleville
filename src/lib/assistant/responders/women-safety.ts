import { resourceSectionAnchors } from "../../content-anchors.ts";
import {
  crimeDataNote,
  healthcareAccess,
  practicalTips,
  townSafetyProfiles,
} from "../../womens-safety.ts";
import type { AssistantIntent } from "../types.ts";
import {
  buildCitation,
  buildGuideLink,
  buildResourceLink,
  buildTownProfileLink,
  dedupeNextLinks,
  ensureKeyPoints,
  getPrimaryRelatedGuideSlug,
  summarizeText,
  type AssistantResponderResult,
} from "./shared.ts";

const safetyRank = {
  high: 4,
  "moderate-high": 3,
  moderate: 2,
  caution: 1,
} as const;

function getHealthcareForTown(townName: string) {
  return healthcareAccess.find(
    (entry) => entry.town.toLowerCase() === townName.toLowerCase(),
  );
}

export function buildWomenSafetyResponse(intent: AssistantIntent): AssistantResponderResult {
  const matchedProfiles = intent.townSlugs
    .map((slug) => townSafetyProfiles.find((profile) => profile.slug === slug))
    .filter((profile): profile is NonNullable<typeof profile> => Boolean(profile));

  if (matchedProfiles.length >= 2) {
    const sorted = matchedProfiles
      .slice()
      .sort((left, right) => safetyRank[right.safetyLevel] - safetyRank[left.safetyLevel]);
    const [saferTown, tighterTown] = [sorted[0], sorted[sorted.length - 1]];
    const saferHealthcare = getHealthcareForTown(saferTown.name);
    const tighterHealthcare = getHealthcareForTown(tighterTown.name);

    return {
      answer: `${saferTown.name} reads safer for women in Appleville's current material, while ${tighterTown.name} asks for more caution around daily logistics, after-dark movement, or healthcare depth.`,
      keyPoints: ensureKeyPoints([
        `${saferTown.name}: ${saferTown.headline}`,
        `${tighterTown.name}: ${tighterTown.headline}`,
        tighterHealthcare?.note ?? saferHealthcare?.note ?? "",
      ]),
      caution: "Treat this as directional town guidance, not a guarantee about every street, landlord, or season.",
      citations: [
        buildCitation(
          "Women's safety in Himachal",
          `/womens-safety#${resourceSectionAnchors.womensSafety.townProfiles}`,
          "Town safety profiles",
          summarizeText(`${saferTown.name}: ${saferTown.detail}`, 1, 120),
        ),
        buildCitation(
          "Women's safety in Himachal",
          `/womens-safety#${resourceSectionAnchors.womensSafety.healthcare}`,
          "Healthcare access",
          summarizeText(
            tighterHealthcare?.note ?? saferHealthcare?.note ?? "",
            1,
            120,
          ),
        ),
      ],
      nextLinks: dedupeNextLinks(
        [
          buildResourceLink(
            "Open women's safety guide",
            "/womens-safety",
            "Read the full town-by-town safety and healthcare context.",
          ),
          buildTownProfileLink(saferTown.slug),
          buildTownProfileLink(tighterTown.slug, `Read the grounded town page for ${tighterTown.name}.`),
        ].filter((item): item is NonNullable<typeof item> => Boolean(item)),
      ),
      confidence: "high",
      resolvedTownSlugs: sorted.map((profile) => profile.slug),
      resolvedPageTypes: ["resource"],
    };
  }

  if (matchedProfiles.length === 1) {
    const profile = matchedProfiles[0];
    const healthcare = getHealthcareForTown(profile.name);
    const relatedGuideSlug = getPrimaryRelatedGuideSlug([profile.slug]);

    return {
      answer: `${profile.name} reads relatively calm for women who want a quieter base, but it is not the strongest fit if late-night mobility, fast healthcare access, or all-season convenience matter a lot.`,
      keyPoints: ensureKeyPoints([
        profile.headline,
        profile.detail,
        healthcare
          ? `${profile.name} healthcare access: ${healthcare.note}`
          : profile.tips[0] ?? "",
      ]),
      caution: summarizeText(
        `${profile.tips[0] ?? ""} ${profile.tips[1] ?? ""} This is a town-read, not a guarantee of personal safety.`,
        2,
        180,
      ),
      citations: [
        buildCitation(
          "Women's safety in Himachal",
          `/womens-safety#${resourceSectionAnchors.womensSafety.townProfiles}`,
          "Town safety profiles",
          summarizeText(`${profile.name}: ${profile.detail}`, 1, 120),
        ),
        buildCitation(
          "Women's safety in Himachal",
          `/womens-safety#${resourceSectionAnchors.womensSafety.healthcare}`,
          "Healthcare access",
          summarizeText(healthcare?.note ?? "", 1, 120),
        ),
      ],
      nextLinks: dedupeNextLinks(
        [
          buildTownProfileLink(profile.slug),
          buildResourceLink(
            "Open women's safety guide",
            "/womens-safety",
            "Read the full safety, healthcare, and practical tips page.",
          ),
          relatedGuideSlug ? buildGuideLink(relatedGuideSlug) : null,
        ].filter((item): item is NonNullable<typeof item> => Boolean(item)),
      ),
      confidence: "high",
      resolvedTownSlugs: [profile.slug],
      resolvedPageTypes: ["resource"],
    };
  }

  return {
    answer: "Himachal reads safer than many people assume, but the useful differences are town type, after-dark geography, and how much healthcare access you need close by.",
    keyPoints: ensureKeyPoints([
      crimeDataNote,
      practicalTips[5],
      practicalTips[6],
    ]),
    caution: "Lower statewide crime context does not remove the need for practical precautions, verified transport, and judgment about isolated terrain after dark.",
    citations: [
      buildCitation(
        "Women's safety in Himachal",
        `/womens-safety#${resourceSectionAnchors.womensSafety.crimeData}`,
        "Crime data",
        summarizeText(crimeDataNote, 1, 120),
      ),
      buildCitation(
        "Women's safety in Himachal",
        `/womens-safety#${resourceSectionAnchors.womensSafety.practicalTips}`,
        "Practical tips",
        summarizeText(practicalTips[5], 1, 120),
      ),
    ],
    nextLinks: dedupeNextLinks([
      buildResourceLink(
        "Open women's safety guide",
        "/womens-safety",
        "Read the full town-by-town practical guide.",
      ),
      buildGuideLink(
        "how-to-test-a-move-before-committing",
        "Use a trial stay to test routes, housing, and after-dark comfort before committing.",
      )!,
    ]),
    confidence: "medium",
    resolvedPageTypes: ["resource"],
  };
}
