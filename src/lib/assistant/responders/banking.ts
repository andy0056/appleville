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

export function buildBankingResponse(intent: AssistantIntent): AssistantResponderResult {
  const town = intent.townSlugs[0] ? getTownBySlug(intent.townSlugs[0]) : null;
  const bankingTown = town ? getBankingTown(town.slug) : null;
  const relatedGuideSlug = town ? getPrimaryRelatedGuideSlug([town.slug]) : null;

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
