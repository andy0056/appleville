import { resourceSectionAnchors } from "../../content-anchors.ts";
import {
  bankingTowns,
  cashStillNeeded,
  digitalRemittance,
  domesticNonResidentDocs,
  hybridRule,
  networkProviders,
} from "../../banking.ts";
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

function getBankingTown(slug: string) {
  return bankingTowns.find((entry) => entry.slug === slug);
}

const bankingRank = {
  full: 4,
  good: 3,
  limited: 2,
  minimal: 1,
} as const;

export function buildBankingResponse(intent: AssistantIntent): AssistantResponderResult {
  const town = intent.townSlugs[0] ? getTownBySlug(intent.townSlugs[0]) : null;
  const bankingTown = town ? getBankingTown(town.slug) : null;
  const relatedGuideSlug = town ? getPrimaryRelatedGuideSlug([town.slug]) : null;
  const comparedTowns = intent.queryFrame.comparisonTownSlugs
    .map((slug) => getTownBySlug(slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  if (intent.queryFrame.primaryIntentKind === "comparison" && comparedTowns.length >= 2) {
    const comparedBanking = comparedTowns
      .map((entry) => ({ town: entry, banking: getBankingTown(entry.slug) }))
      .filter((entry): entry is { town: NonNullable<typeof entry.town>; banking: NonNullable<typeof entry.banking> } => Boolean(entry.banking));

    if (comparedBanking.length >= 2) {
      const sorted = comparedBanking
        .slice()
        .sort(
          (left, right) =>
            bankingRank[right.banking.bankingLevel] - bankingRank[left.banking.bankingLevel],
        );
      const stronger = sorted[0];
      const thinner = sorted[sorted.length - 1];

      return {
        answer: `${stronger.town.name} is the easier banking base in this comparison. ${thinner.town.name} is still workable, but it asks for more planning around branch depth, cash handling, or backup routines.`,
        keyPoints: ensureKeyPoints([
          `${stronger.town.name}: ${stronger.banking.headline}`,
          `${thinner.town.name}: ${thinner.banking.headline}`,
          hybridRule.detail,
        ]),
        caution: "Even the stronger town is still a hill-town banking setup, so keep cash backup and do not rely on one branch or one payment rail.",
        citations: [
          buildCitation(
            "Banking and money in Himachal",
            `/banking#${resourceSectionAnchors.banking.banksByTown}`,
            "Banks by town",
            summarizeText(`${stronger.town.name}: ${stronger.banking.headline}`, 1, 120),
          ),
          buildCitation(
            "Banking and money in Himachal",
            `/banking#${resourceSectionAnchors.banking.cashRule}`,
            "Cash rule",
            summarizeText(hybridRule.detail, 1, 120),
          ),
        ],
        nextLinks: dedupeNextLinks(
          [
            buildResourceLink(
              "Open banking guide",
              "/banking",
              "Read the full banking, cash, and payment-access guide.",
            ),
            buildTownProfileLink(stronger.town.slug),
            buildTownProfileLink(thinner.town.slug, `Read the grounded town page for ${thinner.town.name}.`),
          ].filter((item): item is NonNullable<typeof item> => Boolean(item)),
        ),
        confidence: "high",
        resolvedTownSlugs: comparedTowns.map((entry) => entry.slug),
        resolvedPageTypes: ["resource"],
      };
    }
  }

  if (intent.subIntent === "account_opening") {
    const townLine = bankingTown
      ? `${bankingTown.name} has a ${bankingTown.bankingLevel} banking setup by hill-town standards.`
      : "You do not need a permanent Himachal address before this becomes workable.";

    return {
      answer: `Yes, opening a bank account in Himachal is usually workable even without a permanent local address. Appleville's banking guide treats the main hurdle as documentation discipline, not state residency.`,
      keyPoints: ensureKeyPoints([
        domesticNonResidentDocs.headline,
        domesticNonResidentDocs.detail,
        townLine,
      ]),
      caution:
        "A rent agreement or stronger local proof still makes the process easier, especially outside the biggest branch networks.",
      citations: [
        buildCitation(
          "Banking and money in Himachal",
          `/banking#${resourceSectionAnchors.banking.nonResident}`,
          "Non-resident banking",
          summarizeText(domesticNonResidentDocs.detail, 1, 120),
        ),
        buildCitation(
          "Banking and money in Himachal",
          `/banking#${resourceSectionAnchors.banking.banksByTown}`,
          "Banks by town",
          summarizeText(bankingTown?.headline ?? "", 1, 120),
        ),
      ],
      nextLinks: dedupeNextLinks(
        [
          buildResourceLink(
            "Open banking guide",
            "/banking",
            "Read the full account, UPI, cash, and forex guide.",
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

  if (intent.subIntent === "forex") {
    return {
      answer: "Forex and remittance are workable in Himachal, but the stronger setup lives in Dharamshala, McLeodganj, Shimla, and tourist-heavy nodes rather than the quieter villages.",
      keyPoints: ensureKeyPoints([
        digitalRemittance.headline,
        digitalRemittance.note,
        bankingTown ? bankingTown.note : "",
      ]),
      caution: "If you depend on remittance timing, do not assume every town has the same in-person forex depth or network stability.",
      citations: [
        buildCitation(
          "Banking and money in Himachal",
          `/banking#${resourceSectionAnchors.banking.forex}`,
          "Forex and remittances",
          summarizeText(digitalRemittance.note, 1, 120),
        ),
      ],
      nextLinks: dedupeNextLinks([
        buildResourceLink(
          "Open banking guide",
          "/banking",
          "Read the full forex and banking-access guide.",
        ),
        town ? buildTownProfileLink(town.slug) : null,
      ].filter((item): item is NonNullable<typeof item> => Boolean(item))),
      confidence: "medium",
      resolvedTownSlugs: town ? [town.slug] : [],
      resolvedPageTypes: ["resource"],
    };
  }

  if (intent.subIntent === "network") {
    return {
      answer: "Digital payments work well in most of the current Appleville towns, but you should still plan for occasional network or peak-season failure rather than treating UPI as perfectly frictionless.",
      keyPoints: ensureKeyPoints([
        networkProviders[0].impact,
        networkProviders[1].impact,
        hybridRule.detail,
      ]),
      caution: "If your day depends on payments landing cleanly, keep some physical cash and do not rely on one operator or one app.",
      citations: [
        buildCitation(
          "Banking and money in Himachal",
          `/banking#${resourceSectionAnchors.banking.network}`,
          "Network for payments",
          summarizeText(networkProviders[0].impact, 1, 120),
        ),
        buildCitation(
          "Banking and money in Himachal",
          `/banking#${resourceSectionAnchors.banking.cashRule}`,
          "Cash rule",
          summarizeText(hybridRule.detail, 1, 120),
        ),
      ],
      nextLinks: dedupeNextLinks([
        buildResourceLink(
          "Open banking guide",
          "/banking",
          "Read the full UPI, cash, and network guide.",
        ),
        town ? buildTownProfileLink(town.slug) : null,
      ].filter((item): item is NonNullable<typeof item> => Boolean(item))),
      confidence: "high",
      resolvedTownSlugs: town ? [town.slug] : [],
      resolvedPageTypes: ["resource"],
    };
  }

  const townAnswer = bankingTown
    ? `${bankingTown.name} is workable for everyday banking, but the experience depends on whether you need a real branch, just ATMs, or a cash-and-UPI routine.`
    : "Banking is broadly workable in Himachal, but village life still expects a hybrid setup rather than pure app confidence.";

  return {
    answer: townAnswer,
    keyPoints: ensureKeyPoints([
      bankingTown?.headline ?? hybridRule.headline,
      bankingTown?.note ?? hybridRule.detail,
      cashStillNeeded[0],
    ]),
    caution: "Even where banking coverage is decent, cash still matters for transport, smaller vendors, and bad-weather disruption.",
    citations: [
      buildCitation(
        "Banking and money in Himachal",
        `/banking#${resourceSectionAnchors.banking.banksByTown}`,
        "Banks by town",
        summarizeText(bankingTown?.headline ?? "", 1, 120),
      ),
      buildCitation(
        "Banking and money in Himachal",
        `/banking#${resourceSectionAnchors.banking.cashRule}`,
        "Cash rule",
        summarizeText(hybridRule.detail, 1, 120),
      ),
    ],
    nextLinks: dedupeNextLinks(
      [
        buildResourceLink(
          "Open banking guide",
          "/banking",
          "Read the full banking, cash, and payment-access guide.",
        ),
        town ? buildTownProfileLink(town.slug) : null,
        relatedGuideSlug ? buildGuideLink(relatedGuideSlug) : null,
      ].filter((item): item is NonNullable<typeof item> => Boolean(item)),
    ),
    confidence: bankingTown ? "high" : "medium",
    resolvedTownSlugs: town ? [town.slug] : [],
    resolvedPageTypes: ["resource"],
  };
}
