import { resourceSectionAnchors } from "../../content-anchors.ts";
import {
  backupTiers,
  heatingOptions,
  powerTowns,
} from "../../power-infra.ts";
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

function getPowerTown(slug: string) {
  return powerTowns.find((entry) => entry.slug === slug);
}

export function buildPowerResponse(intent: AssistantIntent): AssistantResponderResult {
  const town = intent.townSlugs[0] ? getTownBySlug(intent.townSlugs[0]) : null;
  const powerTown = town ? getPowerTown(town.slug) : null;
  const relatedGuideSlug = town ? getPrimaryRelatedGuideSlug([town.slug]) : null;
  const comparedTowns = intent.queryFrame.comparisonTownSlugs
    .map((slug) => getTownBySlug(slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  if (intent.queryFrame.primaryIntentKind === "comparison" && comparedTowns.length >= 2) {
    const comparedPower = comparedTowns
      .map((entry) => ({ town: entry, power: getPowerTown(entry.slug) }))
      .filter((entry): entry is { town: NonNullable<typeof entry.town>; power: NonNullable<typeof entry.power> } => Boolean(entry.power));

    if (comparedPower.length >= 2) {
      const sorted = comparedPower
        .slice()
        .sort((left, right) => left.power.reliabilityRank - right.power.reliabilityRank);
      const steadier = sorted[0];
      const riskier = sorted[sorted.length - 1];

      return {
        answer: `${steadier.town.name} is the steadier power answer in this comparison. ${riskier.town.name} asks for more deliberate backup planning and more tolerance for longer outages or seasonal disruption.`,
        keyPoints: ensureKeyPoints([
          `${steadier.town.name}: normal ${steadier.power.outages.normal}; monsoon ${steadier.power.outages.monsoon}`,
          `${riskier.town.name}: normal ${riskier.power.outages.normal}; monsoon ${riskier.power.outages.monsoon}`,
          riskier.power.recommendedBackup,
        ]),
        caution: "A better town-level reliability read does not remove the need to check the exact feeder, lane, and rental backup before you commit.",
        citations: [
          buildCitation(
            "Power backup and heating in Himachal",
            `/power-backup#${resourceSectionAnchors.powerBackup.outageProfiles}`,
            "Outage profiles",
            summarizeText(`${steadier.town.name}: ${steadier.power.notes}`, 1, 120),
          ),
          buildCitation(
            "Power backup and heating in Himachal",
            `/power-backup#${resourceSectionAnchors.powerBackup.backupTiers}`,
            "Backup tiers",
            summarizeText(riskier.power.recommendedBackup, 1, 120),
          ),
        ],
        nextLinks: dedupeNextLinks(
          [
            buildResourceLink(
              "Open power guide",
              "/power-backup",
              "Read the full outage, backup, and heating guide.",
            ),
            buildTownProfileLink(steadier.town.slug),
            buildTownProfileLink(riskier.town.slug, `Read the grounded town page for ${riskier.town.name}.`),
          ].filter((item): item is NonNullable<typeof item> => Boolean(item)),
        ),
        confidence: "high",
        resolvedTownSlugs: comparedTowns.map((entry) => entry.slug),
        resolvedPageTypes: ["resource"],
      };
    }
  }

  if (intent.subIntent === "heating") {
    const answerTown = powerTown
      ? `${powerTown.name} is not the kind of place where you should rely on electric heating alone if outages matter to you.`
      : "In Himachal, heating strategy and backup strategy are not the same problem, especially in the colder or less reliable towns.";

    return {
      answer: answerTown,
      keyPoints: ensureKeyPoints([
        powerTown?.heatingApproach ?? heatingOptions[0].detail,
        heatingOptions[0].caution ?? "",
        heatingOptions[1].caution ?? "",
      ]),
      caution: "If winter comfort matters, choose the property and insulation strategy first, then treat electric heating as only one layer.",
      citations: [
        buildCitation(
          "Power backup and heating in Himachal",
          `/power-backup#${resourceSectionAnchors.powerBackup.heating}`,
          "Heating options",
          summarizeText(heatingOptions[0].detail, 1, 120),
        ),
      ],
      nextLinks: dedupeNextLinks(
        [
          buildResourceLink(
            "Open power guide",
            "/power-backup",
            "Read the full outage, backup, and heating guide.",
          ),
          town ? buildTownProfileLink(town.slug) : null,
          relatedGuideSlug ? buildGuideLink(relatedGuideSlug) : null,
        ].filter((item): item is NonNullable<typeof item> => Boolean(item)),
      ),
      confidence: powerTown ? "high" : "medium",
      resolvedTownSlugs: town ? [town.slug] : [],
      resolvedPageTypes: ["resource"],
    };
  }

  if (intent.subIntent === "backup") {
    const answerTown = powerTown
      ? `For ${powerTown.name}, Appleville reads a basic UPS as too thin if your work or comfort really depends on continuity.`
      : "In Himachal, the right backup depends less on gadget preference and more on how long your town tends to go dark.";

    return {
      answer: answerTown,
      keyPoints: ensureKeyPoints([
        powerTown?.recommendedBackup ?? backupTiers[1].description,
        backupTiers[1].description,
        backupTiers[1].runtime,
      ]),
      caution: "Do not size a backup system around a room heater. Backup planning is usually about essentials, not full electrical comfort.",
      citations: [
        buildCitation(
          "Power backup and heating in Himachal",
          `/power-backup#${resourceSectionAnchors.powerBackup.backupTiers}`,
          "Backup tiers",
          summarizeText(backupTiers[1].description, 1, 120),
        ),
        buildCitation(
          "Power backup and heating in Himachal",
          `/power-backup#${resourceSectionAnchors.powerBackup.outageProfiles}`,
          "Outage profiles",
          summarizeText(powerTown?.notes ?? "", 1, 120),
        ),
      ],
      nextLinks: dedupeNextLinks(
        [
          buildResourceLink(
            "Open power guide",
            "/power-backup",
            "Read the full outage and backup guide.",
          ),
          town ? buildTownProfileLink(town.slug) : null,
        ].filter((item): item is NonNullable<typeof item> => Boolean(item)),
      ),
      confidence: powerTown ? "high" : "medium",
      resolvedTownSlugs: town ? [town.slug] : [],
      resolvedPageTypes: ["resource"],
    };
  }

  if (powerTown) {
    return {
      answer: `${powerTown.name} is workable only if you plan around its outage profile instead of assuming hill-town power will behave like a metro utility.`,
      keyPoints: ensureKeyPoints([
        `Normal months: ${powerTown.outages.normal}`,
        `Monsoon: ${powerTown.outages.monsoon}`,
        powerTown.notes,
      ]),
      caution: summarizeText(
        `${powerTown.recommendedBackup}. ${powerTown.heatingApproach}`,
        2,
        180,
      ),
      citations: [
        buildCitation(
          "Power backup and heating in Himachal",
          `/power-backup#${resourceSectionAnchors.powerBackup.outageProfiles}`,
          "Outage profiles",
          summarizeText(
            `${powerTown.name}: normal ${powerTown.outages.normal}. ${powerTown.notes}`,
            2,
            120,
          ),
        ),
        buildCitation(
          "Power backup and heating in Himachal",
          `/power-backup#${resourceSectionAnchors.powerBackup.backupTiers}`,
          "Backup tiers",
          summarizeText(powerTown.recommendedBackup, 1, 120),
        ),
      ],
      nextLinks: dedupeNextLinks(
        [
          buildResourceLink(
            "Open power guide",
            "/power-backup",
            "Read the full outage, heating, and property-checklist guide.",
          ),
          buildTownProfileLink(powerTown.slug),
          relatedGuideSlug ? buildGuideLink(relatedGuideSlug) : null,
        ].filter((item): item is NonNullable<typeof item> => Boolean(item)),
      ),
      confidence: "high",
      resolvedTownSlugs: [powerTown.slug],
      resolvedPageTypes: ["resource"],
    };
  }

  return {
    answer: "Power in Himachal is not one statewide experience. The practical question is how often your town goes dark, how long the cuts run, and whether you planned a backup around essentials instead of hope.",
    keyPoints: ensureKeyPoints([
      backupTiers[0].description,
      backupTiers[1].description,
      heatingOptions[0].caution ?? "",
    ]),
    caution: "If your work is time-sensitive, choose the town and rental with backup already in mind rather than treating power planning as a later fix.",
    citations: [
      buildCitation(
        "Power backup and heating in Himachal",
        `/power-backup#${resourceSectionAnchors.powerBackup.outageProfiles}`,
        "Outage profiles",
        summarizeText(powerTowns[0].notes, 1, 120),
      ),
      buildCitation(
        "Power backup and heating in Himachal",
        `/power-backup#${resourceSectionAnchors.powerBackup.backupTiers}`,
        "Backup tiers",
        summarizeText(backupTiers[1].description, 1, 120),
      ),
    ],
    nextLinks: dedupeNextLinks([
      buildResourceLink(
        "Open power guide",
        "/power-backup",
        "Read the full outage, backup, and heating guide.",
      ),
      buildGuideLink(
        "what-people-underestimate-about-moving-to-himachal",
        "Read the broader move-friction guide if reliability matters to your shortlist.",
      )!,
    ]),
    confidence: "medium",
    resolvedPageTypes: ["resource"],
  };
}
