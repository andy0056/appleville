import { resourceSectionAnchors } from "../../content-anchors.ts";
import {
  checklistPhases,
  frictionPoints,
  goBackChecklist,
  playbookTowns,
} from "../../playbook.ts";
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

function getPlaybookTown(slug: string) {
  return playbookTowns.find((entry) => entry.slug === slug);
}

const settleSpeedRank = {
  fastest: 5,
  fast: 4,
  moderate: 3,
  slow: 2,
  slowest: 1,
} as const;

export function buildMovingResponse(intent: AssistantIntent): AssistantResponderResult {
  const town = intent.townSlugs[0] ? getTownBySlug(intent.townSlugs[0]) : null;
  const playbookTown = town ? getPlaybookTown(town.slug) : null;
  const relatedGuideSlug = town ? getPrimaryRelatedGuideSlug([town.slug]) : null;
  const comparedTowns = intent.queryFrame.comparisonTownSlugs
    .map((slug) => getTownBySlug(slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  if (intent.queryFrame.primaryIntentKind === "comparison" && comparedTowns.length >= 2) {
    const comparedPlaybooks = comparedTowns
      .map((entry) => ({ town: entry, playbook: getPlaybookTown(entry.slug) }))
      .filter((entry): entry is { town: NonNullable<typeof entry.town>; playbook: NonNullable<typeof entry.playbook> } => Boolean(entry.playbook));

    if (comparedPlaybooks.length >= 2) {
      const sorted = comparedPlaybooks
        .slice()
        .sort(
          (left, right) =>
            settleSpeedRank[right.playbook.settleSpeed] - settleSpeedRank[left.playbook.settleSpeed],
        );
      const easier = sorted[0];
      const slower = sorted[sorted.length - 1];

      return {
        answer: `${easier.town.name} is the easier settling answer in this comparison. ${slower.town.name} is still liveable, but it asks for more patience around rental stability, utilities, or setup friction in the first two weeks.`,
        keyPoints: ensureKeyPoints([
          `${easier.town.name}: ${easier.playbook.overview}`,
          `${slower.town.name}: ${slower.playbook.overview}`,
          frictionPoints[0].detail,
        ]),
        caution: "Do not treat a scenic first impression as proof that setup friction will stay low once proof, connectivity, and errands enter the picture.",
        citations: [
          buildCitation(
            "First 30 days in Himachal",
            `/first-30-days#${resourceSectionAnchors.first30Days.townPlaybooks}`,
            "Town playbooks",
            summarizeText(easier.playbook.overview, 1, 120),
          ),
          buildCitation(
            "First 30 days in Himachal",
            `/first-30-days#${resourceSectionAnchors.first30Days.frictionPoints}`,
            "Friction points",
            summarizeText(frictionPoints[0].detail, 1, 120),
          ),
        ],
        nextLinks: dedupeNextLinks(
          [
            buildResourceLink(
              "Open first 30 days guide",
              "/first-30-days",
              "Read the full settling and logistics guide.",
            ),
            buildTownProfileLink(easier.town.slug),
            buildTownProfileLink(slower.town.slug, `Read the grounded town page for ${slower.town.name}.`),
          ].filter((item): item is NonNullable<typeof item> => Boolean(item)),
        ),
        confidence: "high",
        resolvedTownSlugs: comparedTowns.map((entry) => entry.slug),
        resolvedPageTypes: ["resource"],
      };
    }
  }

  if (intent.subIntent === "trial_move") {
    return {
      answer: "Treat a Himachal trial move as a working test, not a romantic preview. The goal is to learn whether weekday life holds up once errands, internet, transport, and sleep all enter the picture.",
      keyPoints: ensureKeyPoints([
        goBackChecklist[0],
        checklistPhases[0].objective,
        playbookTown?.overview ?? frictionPoints[0].detail,
      ]),
      caution: "A trial stay that only samples cafes and views will hide the exact friction that matters once you actually move.",
      citations: [
        buildCitation(
          "First 30 days in Himachal",
          `/first-30-days#${resourceSectionAnchors.first30Days.goBag}`,
          "Move-in go bag",
          summarizeText(goBackChecklist[0], 1, 120),
        ),
        buildCitation(
          "First 30 days in Himachal",
          `/first-30-days#${resourceSectionAnchors.first30Days.checklist}`,
          "Settling checklist",
          summarizeText(checklistPhases[0].objective, 1, 120),
        ),
      ],
      nextLinks: dedupeNextLinks(
        [
          buildGuideLink(
            "how-to-test-a-move-before-committing",
            "Read the full trial-move guide instead of relying on a short answer.",
          ),
          buildResourceLink(
            "Open first 30 days guide",
            "/first-30-days",
            "Read the full settling and logistics guide.",
          ),
          town ? buildTownProfileLink(town.slug) : null,
        ].filter((item): item is NonNullable<typeof item> => Boolean(item)),
      ),
      confidence: "high",
      resolvedTownSlugs: town ? [town.slug] : [],
      resolvedPageTypes: ["resource"],
    };
  }

  if (intent.subIntent === "utilities") {
    return {
      answer: "Utilities and setup are workable in Himachal, but they move best when you arrive with proof, backup options, and a landlord conversation already lined up.",
      keyPoints: ensureKeyPoints([
        frictionPoints[0].detail,
        frictionPoints[3].detail,
        playbookTown?.utilityNotes ?? checklistPhases[1].objective,
      ]),
      caution: "Do not assume published install timelines are your real timeline, especially for broadband and anything address-sensitive.",
      citations: [
        buildCitation(
          "First 30 days in Himachal",
          `/first-30-days#${resourceSectionAnchors.first30Days.frictionPoints}`,
          "Friction points",
          summarizeText(frictionPoints[0].detail, 1, 120),
        ),
        buildCitation(
          "First 30 days in Himachal",
          `/first-30-days#${resourceSectionAnchors.first30Days.checklist}`,
          "Settling checklist",
          summarizeText(checklistPhases[1].objective, 1, 120),
        ),
      ],
      nextLinks: dedupeNextLinks(
        [
          buildResourceLink(
            "Open first 30 days guide",
            "/first-30-days",
            "Read the full utilities, SIM, and onboarding guide.",
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

  if (playbookTown) {
    return {
      answer: `${playbookTown.name} is settleable, but the experience depends on how well you plan the first two weeks rather than how nice the town felt on day one.`,
      keyPoints: ensureKeyPoints([
        playbookTown.overview,
        playbookTown.rentalTip,
        playbookTown.ispTip,
      ]),
      caution: "If you need a reliable work setup fast, plan a backup operator and a flexible base stay instead of assuming the first rental solves everything.",
      citations: [
        buildCitation(
          "First 30 days in Himachal",
          `/first-30-days#${resourceSectionAnchors.first30Days.townPlaybooks}`,
          "Town playbooks",
          summarizeText(playbookTown.overview, 1, 120),
        ),
      ],
      nextLinks: dedupeNextLinks(
        [
          buildTownProfileLink(playbookTown.slug),
          buildResourceLink(
            "Open first 30 days guide",
            "/first-30-days",
            "Read the full settling and logistics guide.",
          ),
          buildGuideLink(
            "how-to-test-a-move-before-committing",
            "Use the structured trial-move guide before committing longer.",
          ),
        ].filter((item): item is NonNullable<typeof item> => Boolean(item)),
      ),
      confidence: "high",
      resolvedTownSlugs: [playbookTown.slug],
      resolvedPageTypes: ["resource"],
    };
  }

  return {
    answer: "The first month in Himachal usually goes well when you treat it like a setup project instead of assuming the town will automatically carry you.",
    keyPoints: ensureKeyPoints([
      checklistPhases[0].objective,
      checklistPhases[1].objective,
      checklistPhases[2].objective,
    ]),
    caution: "The costliest mistakes usually come from weak proofs, weak network backup, or committing too hard before your weekday rhythm is tested.",
    citations: [
      buildCitation(
        "First 30 days in Himachal",
        `/first-30-days#${resourceSectionAnchors.first30Days.checklist}`,
        "Settling checklist",
        summarizeText(checklistPhases[0].objective, 1, 120),
      ),
      buildCitation(
        "First 30 days in Himachal",
        `/first-30-days#${resourceSectionAnchors.first30Days.frictionPoints}`,
        "Friction points",
        summarizeText(frictionPoints[0].detail, 1, 120),
      ),
    ],
    nextLinks: dedupeNextLinks([
      buildResourceLink(
        "Open first 30 days guide",
        "/first-30-days",
        "Read the full settling and logistics guide.",
      ),
      buildGuideLink(
        "how-to-test-a-move-before-committing",
        "Read the trial-move guide for a lower-risk way to test the shortlist.",
      )!,
    ]),
    confidence: "medium",
    resolvedPageTypes: ["resource"],
  };
}
