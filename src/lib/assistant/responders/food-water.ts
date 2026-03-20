import { resourceSectionAnchors } from "../../content-anchors.ts";
import {
  deliveryReality,
  groceryDelivery,
  marketNodes,
  proteinRealities,
  waterVerdict,
  waterZones,
} from "../../food.ts";
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

function getWaterZoneForTown(slug: string) {
  if (slug === "dharamshala" || slug === "mcleodganj") {
    return waterZones.find((zone) => zone.town.includes("Dharamshala / McLeodganj"));
  }
  if (slug === "bir" || slug === "naggar") {
    return waterZones.find((zone) => zone.town.includes("Bir / Naggar"));
  }
  if (slug === "solan") {
    return waterZones.find((zone) => zone.town.includes("Solan"));
  }
  return waterZones.find((zone) => zone.town.toLowerCase().includes(slug));
}

function getDeliveryForTown(slug: string) {
  if (slug === "dharamshala" || slug === "mcleodganj") {
    return deliveryReality.find((entry) => entry.town.includes("Dharamshala / McLeodganj"));
  }
  return deliveryReality.find((entry) => entry.town.toLowerCase().includes(slug));
}

export function buildFoodWaterResponse(intent: AssistantIntent): AssistantResponderResult {
  const town = intent.townSlugs[0] ? getTownBySlug(intent.townSlugs[0]) : null;
  const waterZone = town ? getWaterZoneForTown(town.slug) : null;
  const deliveryTown = town ? getDeliveryForTown(town.slug) : null;
  const relatedGuideSlug = town ? getPrimaryRelatedGuideSlug([town.slug]) : null;

  if (intent.subIntent === "water") {
    if (town && waterZone) {
      return {
        answer: `${town.name} does not read like a straight tap-water town for newcomers. Even where source water is better, Appleville's food guide still treats RO, UV, or boiling as the safer default while you settle in.`,
        keyPoints: ensureKeyPoints([
          waterZone.detail,
          waterVerdict,
          town.healthcare.notes,
        ]),
        caution: "Do not read a better source-water town as a reason to skip purification in your first weeks.",
        citations: [
          buildCitation(
            "Food reality in Himachal",
            `/food#${resourceSectionAnchors.food.drinkingWater}`,
            "Drinking water",
            summarizeText(waterZone.detail, 1, 120),
          ),
          buildCitation(
            "Food reality in Himachal",
            `/food#${resourceSectionAnchors.food.quickRealityCheck}`,
            "Quick reality check",
            summarizeText(waterVerdict, 1, 120),
          ),
        ],
        nextLinks: dedupeNextLinks(
          [
            buildResourceLink(
              "Open food and water guide",
              "/food",
              "Read the full food, water, and delivery reality page.",
            ),
            buildTownProfileLink(town.slug),
            relatedGuideSlug ? buildGuideLink(relatedGuideSlug) : null,
          ].filter((item): item is NonNullable<typeof item> => Boolean(item)),
        ),
        confidence: "high",
        resolvedTownSlugs: [town.slug],
        resolvedPageTypes: ["resource"],
      };
    }

    return {
      answer: "No, Appleville does not treat Himachal as a straight tap-water destination for newcomers. The safe default is purification or boiling even in towns with better source-water conditions.",
      keyPoints: ensureKeyPoints([
        waterVerdict,
        "Source water and distribution quality are not the same thing.",
        "Monsoon and aging pipes make the risk less predictable than a short visit suggests.",
      ]),
      caution: "A town with better source water can still be a poor bet for direct tap-water use once distribution and seasonal shifts enter the picture.",
      citations: [
        buildCitation(
          "Food reality in Himachal",
          `/food#${resourceSectionAnchors.food.drinkingWater}`,
          "Drinking water",
          summarizeText(waterVerdict, 1, 120),
        ),
      ],
      nextLinks: dedupeNextLinks([
        buildResourceLink(
          "Open food and water guide",
          "/food",
          "Read the full water, groceries, and delivery page.",
        ),
        buildGuideLink(
          "how-to-test-a-move-before-committing",
          "Use a trial stay to test the real setup before assuming daily systems will work for you.",
        )!,
      ]),
      confidence: "high",
      resolvedPageTypes: ["resource"],
    };
  }

  if (intent.subIntent === "delivery") {
    if (town && deliveryTown) {
      const availability = deliveryTown.available
        ? `${town.name} does have app-based delivery, but it is not fast-city reliable.`
        : `${town.name} is not an app-delivery town in the usual sense.`;

      return {
        answer: availability,
        keyPoints: ensureKeyPoints([
          deliveryTown.detail,
          deliveryTown.caveat ?? "",
          groceryDelivery.detail,
        ]),
        caution: deliveryTown.available
          ? "Delivery coverage does not remove the need to plan for terrain, delay, and seasonal disruption."
          : "Treat food delivery as occasional help, not daily infrastructure.",
        citations: [
          buildCitation(
            "Food reality in Himachal",
            `/food#${resourceSectionAnchors.food.delivery}`,
            "Delivery reality",
            summarizeText(deliveryTown.detail, 1, 120),
          ),
        ],
        nextLinks: dedupeNextLinks(
          [
            buildResourceLink(
              "Open food and water guide",
              "/food",
              "Read the full food delivery and groceries page.",
            ),
            buildTownProfileLink(town.slug),
            relatedGuideSlug ? buildGuideLink(relatedGuideSlug) : null,
          ].filter((item): item is NonNullable<typeof item> => Boolean(item)),
        ),
        confidence: "high",
        resolvedTownSlugs: [town.slug],
        resolvedPageTypes: ["resource"],
      };
    }

    return {
      answer: "Delivery works best in the larger Himachal towns. Once you get into places like Bir or Naggar, you should assume phone-ordering, walking, or self-managed grocery routines instead of a dependable app stack.",
      keyPoints: ensureKeyPoints([
        groceryDelivery.headline,
        groceryDelivery.detail,
        "Delivery quality usually tracks town size, road access, and tourism volume rather than app presence alone.",
      ]),
      citations: [
        buildCitation(
          "Food reality in Himachal",
          `/food#${resourceSectionAnchors.food.delivery}`,
          "Delivery reality",
          summarizeText(groceryDelivery.detail, 1, 120),
        ),
      ],
      nextLinks: dedupeNextLinks([
        buildResourceLink(
          "Open food and water guide",
          "/food",
          "Read the full food delivery and grocery reality page.",
        ),
        buildResourceLink(
          "Browse towns",
          "/towns",
          "Check town pages if daily practicality is part of the shortlist.",
        ),
      ]),
      confidence: "medium",
      resolvedPageTypes: ["resource"],
    };
  }

  const firstMarket = marketNodes[0];
  const firstProtein = proteinRealities[0];

  return {
    answer: "Food reality in Himachal is workable, but it is not friction-free. Groceries, protein, delivery, and seasonal swings depend heavily on town size, transport links, and whether you are okay managing more yourself.",
    keyPoints: ensureKeyPoints([
      firstMarket.influence,
      firstProtein.detail,
      groceryDelivery.detail,
    ]),
    caution: "Do not assume hill-town cafe density means the same thing as reliable groceries, delivery, or seasonal consistency at home.",
    citations: [
      buildCitation(
        "Food reality in Himachal",
        `/food#${resourceSectionAnchors.food.vegetableMarkets}`,
        "Vegetable markets",
        summarizeText(firstMarket.influence, 1, 120),
      ),
      buildCitation(
        "Food reality in Himachal",
        `/food#${resourceSectionAnchors.food.delivery}`,
        "Delivery reality",
        summarizeText(groceryDelivery.detail, 1, 120),
      ),
    ],
    nextLinks: dedupeNextLinks([
      buildResourceLink(
        "Open food and water guide",
        "/food",
        "Read the full food, grocery, and water guide.",
      ),
      buildGuideLink(
        "how-to-test-a-move-before-committing",
        "Use a trial stay to test the real food and delivery setup before committing.",
      )!,
    ]),
    confidence: "medium",
    resolvedTownSlugs: town ? [town.slug] : [],
    resolvedPageTypes: ["resource"],
  };
}
