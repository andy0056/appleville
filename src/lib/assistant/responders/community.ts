import { resourceSectionAnchors } from "../../content-anchors.ts";
import {
  communityTowns,
  connectionSteps,
  helplines,
} from "../../community.ts";
import { getTownBySlug } from "../../towns.ts";
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

function getCommunityTown(slug: string) {
  return communityTowns.find((entry) => entry.slug === slug);
}

export function buildCommunityResponse(intent: AssistantIntent): AssistantResponderResult {
  const town = intent.townSlugs[0] ? getTownBySlug(intent.townSlugs[0]) : null;
  const communityTown = town ? getCommunityTown(town.slug) : null;
  const relatedGuideSlug = town ? getPrimaryRelatedGuideSlug([town.slug]) : null;

  if (intent.subIntent === "mental_health") {
    return {
      answer: "Mental-health support in Himachal is real, but you should not assume every smaller town gives you the same in-person depth. The safer model is a local routine plus a known escalation path.",
      keyPoints: ensureKeyPoints([
        helplines[0].detail,
        communityTown?.mentalHealthResources[0] ?? "",
        connectionSteps[3].detail,
      ]),
      caution: "If clinical support matters to you, do not choose a town only on vibe. Check the care tier and travel burden before you commit.",
      citations: [
        buildCitation(
          "Community and wellbeing in Himachal",
          `/community#${resourceSectionAnchors.community.helplines}`,
          "Support lines",
          summarizeText(helplines[0].detail, 1, 120),
        ),
        buildCitation(
          "Community and wellbeing in Himachal",
          `/community#${resourceSectionAnchors.community.townProfiles}`,
          "Community by town",
          summarizeText(communityTown?.mentalHealthAccess ?? "", 1, 120),
        ),
      ],
      nextLinks: dedupeNextLinks(
        [
          buildResourceLink(
            "Open community guide",
            "/community",
            "Read the full community, coworking, and wellbeing guide.",
          ),
          town ? buildTownProfileLink(town.slug) : null,
          relatedGuideSlug ? buildGuideLink(relatedGuideSlug) : null,
        ].filter((item): item is NonNullable<typeof item> => Boolean(item)),
      ),
      confidence: "high",
      resolvedTownSlugs: town ? [town.slug] : [],
      resolvedPageTypes: ["resource"],
    };
  }

  if (intent.subIntent === "coworking" && communityTown) {
    return {
      answer: `${communityTown.name} can work socially if you plug into the right coworking or coliving room early. The town itself is not always enough; the venue choice often is the real difference-maker.`,
      keyPoints: ensureKeyPoints([
        communityTown.communitySignals,
        communityTown.coworkingSpaces[0]?.detail ?? "",
        communityTown.integrationTips[0] ?? "",
      ]),
      caution: "Do not confuse a few visible venues with a deep, stable community layer across the whole town.",
      citations: [
        buildCitation(
          "Community and wellbeing in Himachal",
          `/community#${resourceSectionAnchors.community.townProfiles}`,
          "Community by town",
          summarizeText(communityTown.integrationTips[0] ?? communityTown.communitySignals, 1, 120),
        ),
      ],
      nextLinks: dedupeNextLinks(
        [
          buildTownProfileLink(communityTown.slug),
          buildResourceLink(
            "Open community guide",
            "/community",
            "Read the full community and coworking guide.",
          ),
          relatedGuideSlug ? buildGuideLink(relatedGuideSlug) : null,
        ].filter((item): item is NonNullable<typeof item> => Boolean(item)),
      ),
      confidence: "high",
      resolvedTownSlugs: [communityTown.slug],
      resolvedPageTypes: ["resource"],
    };
  }

  if (communityTown) {
    return {
      answer: `${communityTown.name} is usable for community and everyday support, but the real question is whether you need visible social overlap or just enough structure to avoid feeling cut off.`,
      keyPoints: ensureKeyPoints([
        `Isolation risk: ${communityTown.isolationRisk}`,
        communityTown.integrationTips[0] ?? "",
        communityTown.mentalHealthResources[0] ?? "",
      ]),
      caution: "In the quieter towns, isolation risk usually comes from weak routines and thin social scaffolding, not from a total lack of people.",
      citations: [
        buildCitation(
          "Community and wellbeing in Himachal",
          `/community#${resourceSectionAnchors.community.townProfiles}`,
          "Community by town",
          summarizeText(communityTown.integrationTips[0] ?? "", 1, 120),
        ),
      ],
      nextLinks: dedupeNextLinks(
        [
          buildTownProfileLink(communityTown.slug),
          buildResourceLink(
            "Open community guide",
            "/community",
            "Read the full community and support guide.",
          ),
          relatedGuideSlug ? buildGuideLink(relatedGuideSlug) : null,
        ].filter((item): item is NonNullable<typeof item> => Boolean(item)),
      ),
      confidence: "high",
      resolvedTownSlugs: [communityTown.slug],
      resolvedPageTypes: ["resource"],
    };
  }

  return {
    answer: "Community in Himachal depends less on town size than on whether you can anchor yourself quickly in one recurring room, one activity, and one support fallback.",
    keyPoints: ensureKeyPoints([
      connectionSteps[0].detail,
      connectionSteps[1].detail,
      helplines[0].detail,
    ]),
    caution: "If you are moving alone, do not leave community to chance. Quiet towns especially need a deliberate social and wellbeing setup.",
    citations: [
      buildCitation(
        "Community and wellbeing in Himachal",
        `/community#${resourceSectionAnchors.community.newcomer}`,
        "Newcomer playbook",
        summarizeText(connectionSteps[0].detail, 1, 120),
      ),
      buildCitation(
        "Community and wellbeing in Himachal",
        `/community#${resourceSectionAnchors.community.helplines}`,
        "Support lines",
        summarizeText(helplines[0].detail, 1, 120),
      ),
    ],
    nextLinks: dedupeNextLinks([
      buildResourceLink(
        "Open community guide",
        "/community",
        "Read the full community and wellbeing guide.",
      ),
      buildGuideLink(
        "quiet-vs-social-towns-in-himachal",
        "Read the quiet-versus-social guide if pace and stimulation are the deeper question.",
      )!,
    ]),
    confidence: "medium",
    resolvedPageTypes: ["resource"],
  };
}
