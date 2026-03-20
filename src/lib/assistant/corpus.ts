import { guides } from "../guides.ts";
import { methodSections } from "../how-it-works.ts";
import {
  foodFacts,
  marketNodes,
  seasonalImpact,
  waterVerdict,
  waterZones,
  proteinRealities,
  dairyCategories,
  organicSpots,
  bakeryHighlights,
  importedGroceryStores,
  deliveryReality,
  groceryDelivery,
} from "../food.ts";
import {
  keyStats,
  bankingTowns,
  merchantTiers,
  cashStillNeeded,
  domesticNonResidentDocs,
  nriAccountTypes,
  forexTowns,
  digitalRemittance,
  networkProviders,
  hybridRule,
} from "../banking.ts";
import {
  helplines,
  connectionSteps,
  communityTowns,
} from "../community.ts";
import {
  section118Summary,
  purchaseRoutes,
  buyerTypes,
  scamRisks,
  dueDiligenceChecklist,
  leaseClauseList,
  faqItems,
} from "../property-rules.ts";
import {
  reliabilityRanking,
  essentialsLoad,
  backupTiers,
  powerTowns,
  heatingOptions,
  propertyChecklist,
  insulationTips,
} from "../power-infra.ts";
import {
  sheTravelPolicy,
  crimeDataNote,
  crimeData,
  townSafetyProfiles,
  safeSpaces,
  healthcareAccess,
  practicalTips,
} from "../womens-safety.ts";
import {
  settleSpeedRanking,
  frictionPoints,
  portals,
  goBackChecklist,
  checklistPhases,
  playbookTowns,
} from "../playbook.ts";
import { towns } from "../towns.ts";
import {
  guideSectionAnchors,
  resourceSectionAnchors,
  slugifySectionId,
  townSectionAnchors,
} from "../content-anchors.ts";
import type { AssistantChunk } from "./types.ts";

function unique(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)));
}

function createChunk(chunk: AssistantChunk): AssistantChunk {
  return {
    ...chunk,
    text: chunk.text.replace(/\s+/g, " ").trim(),
    keywords: unique(chunk.keywords.map((keyword) => keyword.toLowerCase())),
  };
}

function joinParts(parts: string[]) {
  return parts.filter(Boolean).join(" ");
}

function createTownChunks() {
  return towns.flatMap((town) => {
    const commonKeywords = [
      town.name,
      town.slug,
      town.district,
      town.archetype,
      ...town.vibe,
      ...town.discoveryStrengths,
      town.budget,
      "town",
    ];

    const costSummary = `Cost of living sits around ₹${town.costOfLiving.rent1bhkRange[0].toLocaleString("en-IN")}–₹${town.costOfLiving.rent1bhkRange[1].toLocaleString("en-IN")} for a 1BHK, with groceries for a couple at roughly ₹${town.costOfLiving.groceriesCouple[0].toLocaleString("en-IN")}–₹${town.costOfLiving.groceriesCouple[1].toLocaleString("en-IN")} per month.`;
    const transportSummary = `${town.transport.nearestAirport} is about ${town.transport.airportDistanceKm} km away, and the Delhi drive usually lands around ${town.transport.delhiDriveHours[0]}–${town.transport.delhiDriveHours[1]} hours.`;
    const seasonSummary = `Best months are ${town.seasonality.bestMonths}. ${town.seasonality.monsoonRisk} ${town.seasonality.winterReality}`;

    return [
      createChunk({
        id: `${town.slug}-overview`,
        pathname: `/towns/${town.slug}`,
        anchor: townSectionAnchors.overview,
        pageTitle: `${town.name}, Himachal`,
        sectionTitle: "Overview",
        pageType: "town",
        entitySlugs: [town.slug],
        keywords: [...commonKeywords, "overview", "summary", "fit"],
        text: `${town.name} is a ${town.archetype.toLowerCase()}. ${town.summary}`,
        priority: 5,
      }),
      createChunk({
        id: `${town.slug}-best-for`,
        pathname: `/towns/${town.slug}`,
        anchor: townSectionAnchors.bestFor,
        pageTitle: `${town.name}, Himachal`,
        sectionTitle: "Best for",
        pageType: "town",
        entitySlugs: [town.slug],
        keywords: [...commonKeywords, "best for", "fit", "who it fits"],
        text: `${town.name} is strongest for ${town.goodFor.join("; ")}.`,
        priority: 5,
      }),
      createChunk({
        id: `${town.slug}-not-ideal-for`,
        pathname: `/towns/${town.slug}`,
        anchor: townSectionAnchors.notIdealFor,
        pageTitle: `${town.name}, Himachal`,
        sectionTitle: "Not ideal for",
        pageType: "town",
        entitySlugs: [town.slug],
        keywords: [...commonKeywords, "not ideal", "caution", "watch out"],
        text: `${town.name} is less convincing for ${town.notIdealFor.join("; ")}.`,
        priority: 4,
      }),
      createChunk({
        id: `${town.slug}-remote-work`,
        pathname: `/towns/${town.slug}`,
        anchor: townSectionAnchors.remoteWorkReality,
        pageTitle: `${town.name}, Himachal`,
        sectionTitle: "Remote-work reality",
        pageType: "town",
        entitySlugs: [town.slug],
        keywords: [...commonKeywords, "remote work", "internet", "wifi", "coworking"],
        text: town.remoteWorkReality,
        priority: 5,
      }),
      createChunk({
        id: `${town.slug}-local-feel`,
        pathname: `/towns/${town.slug}`,
        anchor: townSectionAnchors.localFeel,
        pageTitle: `${town.name}, Himachal`,
        sectionTitle: "Local feel",
        pageType: "town",
        entitySlugs: [town.slug],
        keywords: [...commonKeywords, "local feel", "atmosphere", "vibe", "beauty"],
        text: town.localFeel,
        priority: 4,
      }),
      createChunk({
        id: `${town.slug}-practical-reality`,
        pathname: `/towns/${town.slug}`,
        anchor: townSectionAnchors.practicalReality,
        pageTitle: `${town.name}, Himachal`,
        sectionTitle: "Practical reality",
        pageType: "town",
        entitySlugs: [town.slug],
        keywords: [...commonKeywords, "practical", "routine", "daily life", "access"],
        text: town.practicalReality,
        priority: 5,
      }),
      createChunk({
        id: `${town.slug}-stay-notes`,
        pathname: `/towns/${town.slug}`,
        anchor: townSectionAnchors.stayNotes,
        pageTitle: `${town.name}, Himachal`,
        sectionTitle: "Stay notes",
        pageType: "town",
        entitySlugs: [town.slug],
        keywords: [...commonKeywords, "stay", "long stay", "long-term", "trial move"],
        text: town.stayNotes,
        priority: 4,
      }),
      createChunk({
        id: `${town.slug}-tradeoff`,
        pathname: `/towns/${town.slug}`,
        anchor: townSectionAnchors.tradeoff,
        pageTitle: `${town.name}, Himachal`,
        sectionTitle: "Tradeoff",
        pageType: "town",
        entitySlugs: [town.slug],
        keywords: [...commonKeywords, "tradeoff", "downside", "caution"],
        text: town.tradeoff,
        priority: 5,
      }),
      createChunk({
        id: `${town.slug}-cost`,
        pathname: `/towns/${town.slug}`,
        anchor: townSectionAnchors.operationalDetail,
        pageTitle: `${town.name}, Himachal`,
        sectionTitle: "Cost snapshot",
        pageType: "town",
        entitySlugs: [town.slug],
        keywords: [...commonKeywords, "cost", "rent", "budget", "groceries"],
        text: costSummary,
        priority: 3,
      }),
      createChunk({
        id: `${town.slug}-transport`,
        pathname: `/towns/${town.slug}`,
        anchor: townSectionAnchors.operationalDetail,
        pageTitle: `${town.name}, Himachal`,
        sectionTitle: "Transport snapshot",
        pageType: "town",
        entitySlugs: [town.slug],
        keywords: [...commonKeywords, "transport", "airport", "road access", "delhi"],
        text: transportSummary,
        priority: 3,
      }),
      createChunk({
        id: `${town.slug}-seasonality`,
        pathname: `/towns/${town.slug}`,
        anchor: townSectionAnchors.operationalDetail,
        pageTitle: `${town.name}, Himachal`,
        sectionTitle: "Seasonality",
        pageType: "town",
        entitySlugs: [town.slug],
        keywords: [...commonKeywords, "season", "winter", "monsoon", "best months"],
        text: seasonSummary,
        priority: 3,
      }),
    ];
  });
}

function createGuideChunks() {
  return guides.flatMap((guide) => {
    const commonKeywords = [
      guide.title,
      guide.summary,
      guide.category,
      guide.useCase,
      guide.bestWhen,
      ...(guide.relatedTownSlugs ?? []),
    ];

    const chunks: AssistantChunk[] = [
      createChunk({
        id: `${guide.slug}-intro`,
        pathname: `/guides/${guide.slug}`,
        anchor: guideSectionAnchors.intro,
        pageTitle: guide.title,
        sectionTitle: "Intro",
        pageType: "guide",
        entitySlugs: guide.relatedTownSlugs ?? [],
        keywords: [...commonKeywords, "guide", "intro", "summary"],
        text: `${guide.summary} ${guide.intro}`,
        priority: 5,
      }),
    ];

    if (guide.takeaways?.length) {
      chunks.push(
        createChunk({
          id: `${guide.slug}-takeaways`,
          pathname: `/guides/${guide.slug}`,
          anchor: guideSectionAnchors.takeaways,
          pageTitle: guide.title,
          sectionTitle: "Quick takeaways",
          pageType: "guide",
          entitySlugs: guide.relatedTownSlugs ?? [],
          keywords: [...commonKeywords, "takeaways", "quick read", "best when"],
          text: `${guide.bestWhen} ${guide.takeaways.join(" ")}`,
          priority: 5,
        }),
      );
    }

    guide.sections.forEach((section) => {
      chunks.push(
        createChunk({
          id: `${guide.slug}-${slugifySectionId(section.title)}`,
          pathname: `/guides/${guide.slug}`,
          anchor: slugifySectionId(section.title),
          pageTitle: guide.title,
          sectionTitle: section.title,
          pageType: "guide",
          entitySlugs: guide.relatedTownSlugs ?? [],
          keywords: [...commonKeywords, section.title],
          text: joinParts([
            ...section.paragraphs,
            ...(section.bullets ?? []),
          ]),
          priority: 4,
        }),
      );
    });

    return chunks;
  });
}

function createMethodChunks() {
  return methodSections.map((section) =>
    createChunk({
      id: `method-${section.id}`,
      pathname: "/how-it-works",
      anchor: section.id,
      pageTitle: "How Appleville works",
      sectionTitle: section.title,
      pageType: "method",
      entitySlugs: [],
      keywords: ["how it works", "method", section.title, section.id],
      text: joinParts([...section.paragraphs, ...(section.bullets ?? [])]),
      priority: 5,
    }),
  );
}

function createFoodChunks() {
  return [
    createChunk({
      id: "food-quick-reality-check",
      pathname: "/food",
      anchor: resourceSectionAnchors.food.quickRealityCheck,
      pageTitle: "Food reality in Himachal",
      sectionTitle: "Quick reality check",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["food", "delivery", "water", "groceries", "markets", "seasonal costs"],
      text: joinParts(foodFacts.map((fact) => `${fact.label}: ${fact.detail}.`)),
      priority: 4,
    }),
    createChunk({
      id: "food-vegetable-markets",
      pathname: "/food",
      anchor: resourceSectionAnchors.food.vegetableMarkets,
      pageTitle: "Food reality in Himachal",
      sectionTitle: "Vegetable markets",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["food", "markets", "groceries", "produce", "mandi"],
      text: joinParts(
        marketNodes.map(
          (node) =>
            `${node.town}: ${node.influence}. Pricing signal: ${node.pricing}.`,
        ),
      ),
      priority: 4,
    }),
    createChunk({
      id: "food-seasonal-swings",
      pathname: "/food",
      anchor: resourceSectionAnchors.food.seasonalSwings,
      pageTitle: "Food reality in Himachal",
      sectionTitle: "Seasonal swings",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["food", "cost", "season", "winter", "monsoon", "prices"],
      text: joinParts(
        seasonalImpact.map(
          (season) =>
            `${season.season} (${season.months}): ${season.detail} Quality trend: ${season.qualityVector}.`,
        ),
      ),
      priority: 4,
    }),
    createChunk({
      id: "food-drinking-water",
      pathname: "/food",
      anchor: resourceSectionAnchors.food.drinkingWater,
      pageTitle: "Food reality in Himachal",
      sectionTitle: "Drinking water",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["water", "tap water", "food", "safe water", "drinking water"],
      text: `Tap water is not a safe default for migrants or longer-stay newcomers in Himachal. ${waterVerdict} ${joinParts(
        waterZones.map((zone) => `${zone.town}: ${zone.detail}`),
      )}`,
      priority: 5,
    }),
    createChunk({
      id: "food-animal-protein",
      pathname: "/food",
      anchor: resourceSectionAnchors.food.animalProtein,
      pageTitle: "Food reality in Himachal",
      sectionTitle: "Animal protein supply chain",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["food", "protein", "meat", "fish", "chicken", "trout"],
      text: joinParts(
        proteinRealities.map(
          (protein) => `${protein.type}: ${protein.detail} ${protein.towns}.`,
        ),
      ),
      priority: 3,
    }),
    createChunk({
      id: "food-dairy",
      pathname: "/food",
      anchor: resourceSectionAnchors.food.dairy,
      pageTitle: "Food reality in Himachal",
      sectionTitle: "Dairy ecosystem",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["food", "dairy", "milk", "cheese"],
      text: joinParts(
        dairyCategories.map(
          (category) =>
            `${category.category}: ${category.providers}. ${category.detail} Towns: ${category.towns}.`,
        ),
      ),
      priority: 3,
    }),
    createChunk({
      id: "food-organic",
      pathname: "/food",
      anchor: resourceSectionAnchors.food.organic,
      pageTitle: "Food reality in Himachal",
      sectionTitle: "Farm-to-table and organic spots",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["food", "organic", "farm to table", "artisanal"],
      text: joinParts(
        organicSpots.map((spot) => `${spot.name} in ${spot.town}: ${spot.detail}.`),
      ),
      priority: 2,
    }),
    createChunk({
      id: "food-bakeries",
      pathname: "/food",
      anchor: resourceSectionAnchors.food.bakeries,
      pageTitle: "Food reality in Himachal",
      sectionTitle: "Bakery renaissance",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["food", "bakery", "bread", "sourdough"],
      text: joinParts(
        bakeryHighlights.map((bakery) => `${bakery.name} in ${bakery.town}: ${bakery.detail}.`),
      ),
      priority: 2,
    }),
    createChunk({
      id: "food-specialty-groceries",
      pathname: "/food",
      anchor: resourceSectionAnchors.food.specialtyGroceries,
      pageTitle: "Food reality in Himachal",
      sectionTitle: "Imported and specialty groceries",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["food", "groceries", "imported", "international ingredients"],
      text: joinParts(
        importedGroceryStores.map(
          (store) => `${store.name} in ${store.town}: ${store.detail}.`,
        ),
      ),
      priority: 2,
    }),
    createChunk({
      id: "food-delivery",
      pathname: "/food",
      anchor: resourceSectionAnchors.food.delivery,
      pageTitle: "Food reality in Himachal",
      sectionTitle: "Delivery reality",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["food", "delivery", "swiggy", "zomato", "quick commerce"],
      text: `${groceryDelivery.headline} ${groceryDelivery.detail} ${joinParts(
        deliveryReality.map(
          (town) =>
            `${town.town}: ${town.detail}${town.caveat ? ` ${town.caveat}.` : "."}`,
        ),
      )}`,
      priority: 4,
    }),
  ];
}

function createBankingChunks() {
  return [
    createChunk({
      id: "banking-snapshot",
      pathname: "/banking",
      anchor: resourceSectionAnchors.banking.snapshot,
      pageTitle: "Banking and money in Himachal",
      sectionTitle: "Financial snapshot",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["banking", "money", "upi", "financial inclusion", "cash"],
      text: joinParts(keyStats.map((stat) => `${stat.label}: ${stat.value}. ${stat.detail}.`)),
      priority: 4,
    }),
    ...bankingTowns.map((town) =>
      createChunk({
        id: `${town.slug}-banking`,
        pathname: "/banking",
        anchor: `${town.slug}-banking`,
        pageTitle: "Banking and money in Himachal",
        sectionTitle: `${town.name} banking profile`,
        pageType: "resource",
        entitySlugs: [town.slug],
        keywords: ["banking", "money", town.name, town.slug, town.bankingLevel],
        text: `${town.name}: ${town.headline} ${town.note} ${joinParts(
          town.banks.map(
            (bank) => `${bank.bank} at ${bank.locations}. ${bank.specialty}.`,
          ),
        )}`,
        priority: 4,
      }),
    ),
    createChunk({
      id: "banking-payment-methods",
      pathname: "/banking",
      anchor: resourceSectionAnchors.banking.paymentMethods,
      pageTitle: "Banking and money in Himachal",
      sectionTitle: "Payment methods",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["banking", "upi", "cards", "cash", "payment"],
      text: joinParts(
        merchantTiers.map(
          (tier) => `${tier.label}: ${tier.methods}. ${tier.detail}.`,
        ),
      ),
      priority: 4,
    }),
    createChunk({
      id: "banking-cash-rule",
      pathname: "/banking",
      anchor: resourceSectionAnchors.banking.cashRule,
      pageTitle: "Banking and money in Himachal",
      sectionTitle: "Cash rule",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["banking", "cash", "upi", "payments", "resilience"],
      text: `${hybridRule.headline}. ${hybridRule.detail} ${joinParts(
        cashStillNeeded.map((item) => `${item}.`),
      )}`,
      priority: 5,
    }),
    createChunk({
      id: "banking-non-resident",
      pathname: "/banking",
      anchor: resourceSectionAnchors.banking.nonResident,
      pageTitle: "Banking and money in Himachal",
      sectionTitle: "Non-resident banking",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["banking", "nri", "foreign national", "account", "documents"],
      text: `${domesticNonResidentDocs.headline} ${domesticNonResidentDocs.detail} ${joinParts(
        domesticNonResidentDocs.docs.map(
          (doc) => `${doc.label}: ${doc.items}.`,
        ),
      )} ${joinParts(
        nriAccountTypes.map(
          (account) =>
            `${account.type}: ${account.eligibility}. Documents: ${account.docs}.`,
        ),
      )}`,
      priority: 5,
    }),
    createChunk({
      id: "banking-forex",
      pathname: "/banking",
      anchor: resourceSectionAnchors.banking.forex,
      pageTitle: "Banking and money in Himachal",
      sectionTitle: "Forex and remittances",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["banking", "forex", "remittance", "currency exchange"],
      text: `${digitalRemittance.headline} ${digitalRemittance.note} ${joinParts(
        forexTowns.map(
          (town) => `${town.town}: ${town.agents}. ${town.services}.`,
        ),
      )}`,
      priority: 4,
    }),
    createChunk({
      id: "banking-network",
      pathname: "/banking",
      anchor: resourceSectionAnchors.banking.network,
      pageTitle: "Banking and money in Himachal",
      sectionTitle: "Network for payments",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["banking", "network", "upi", "airtel", "jio", "bsnl"],
      text: joinParts(
        networkProviders.map(
          (provider) => `${provider.name}: ${provider.strength}. ${provider.impact}.`,
        ),
      ),
      priority: 3,
    }),
  ];
}

function createCommunityChunks() {
  return [
    createChunk({
      id: "community-support-lines",
      pathname: "/community",
      anchor: resourceSectionAnchors.community.helplines,
      pageTitle: "Community and mental health in Himachal",
      sectionTitle: "Support lines",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["community", "mental health", "helplines", "support"],
      text: joinParts(
        helplines.map(
          (helpline) =>
            `${helpline.name} (${helpline.number}): ${helpline.detail} Hours: ${helpline.hours}.`,
        ),
      ),
      priority: 5,
    }),
    createChunk({
      id: "community-newcomer-playbook",
      pathname: "/community",
      anchor: resourceSectionAnchors.community.newcomer,
      pageTitle: "Community and mental health in Himachal",
      sectionTitle: "Newcomer playbook",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["community", "making friends", "newcomer", "integration"],
      text: joinParts(
        connectionSteps.map((step) => `${step.label}: ${step.detail}.`),
      ),
      priority: 4,
    }),
    ...communityTowns.map((town) =>
      createChunk({
        id: `${town.slug}-community`,
        pathname: "/community",
        anchor: `${town.slug}-community`,
        pageTitle: "Community and mental health in Himachal",
        sectionTitle: `${town.name} community profile`,
        pageType: "resource",
        entitySlugs: [town.slug],
        keywords: [
          "community",
          "mental health",
          town.name,
          town.slug,
          town.coworkingLevel,
          town.isolationRisk,
        ],
        text: `${town.name}: community signals ${town.communitySignals}, mental health access ${town.mentalHealthAccess}, AA/NA ${town.aaNa}, family-friendliness ${town.familyFriendliness}. ${joinParts(
          town.integrationTips.map((tip) => `${tip}.`),
        )}`,
        priority: 4,
      }),
    ),
  ];
}

function createPropertyChunks() {
  return [
    createChunk({
      id: "property-section-118",
      pathname: "/property-rules",
      anchor: resourceSectionAnchors.propertyRules.section118,
      pageTitle: "Property rules in Himachal",
      sectionTitle: "Section 118",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["property", "section 118", "buy land", "legal", "lease"],
      text: `${section118Summary.headline}. ${section118Summary.core} ${section118Summary.definitionOfAgriculturist} ${section118Summary.municipalExclusion} ${section118Summary.antiAvoidance} ${section118Summary.enforcement} ${section118Summary.recentMovement}`,
      priority: 5,
    }),
    ...buyerTypes.map((buyer) =>
      createChunk({
        id: `property-${slugifySectionId(buyer.label)}`,
        pathname: "/property-rules",
        anchor: resourceSectionAnchors.propertyRules.buyerTypes,
        pageTitle: "Property rules in Himachal",
        sectionTitle: buyer.label,
        pageType: "resource",
        entitySlugs: [],
        keywords: ["property", buyer.label, "buy", "lease", "legal"],
        text: `${buyer.label}: ${buyer.headline} ${buyer.detail} ${joinParts(
          buyer.tips.map((tip) => `${tip}.`),
        )}`,
        priority: 4,
      }),
    ),
    createChunk({
      id: "property-purchase-routes",
      pathname: "/property-rules",
      anchor: resourceSectionAnchors.propertyRules.purchaseRoutes,
      pageTitle: "Property rules in Himachal",
      sectionTitle: "Purchase routes",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["property", "buy", "lease", "purchase routes"],
      text: joinParts(
        purchaseRoutes.map(
          (route) =>
            `${route.route}. Legal safety: ${route.legalSafety}. Speed: ${route.speed}. Risk: ${route.risk}. Best for: ${route.bestFor}.`,
        ),
      ),
      priority: 4,
    }),
    createChunk({
      id: "property-scam-risks",
      pathname: "/property-rules",
      anchor: resourceSectionAnchors.propertyRules.scamRisks,
      pageTitle: "Property rules in Himachal",
      sectionTitle: "Scam risks",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["property", "scam", "fraud", "gpa sale", "poa"],
      text: joinParts(
        scamRisks.map((risk) => `${risk.title}: ${risk.detail}`),
      ),
      priority: 4,
    }),
    createChunk({
      id: "property-due-diligence",
      pathname: "/property-rules",
      anchor: resourceSectionAnchors.propertyRules.dueDiligence,
      pageTitle: "Property rules in Himachal",
      sectionTitle: "Due diligence",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["property", "due diligence", "checklist", "buy"],
      text: joinParts(dueDiligenceChecklist.map((item) => `${item}.`)),
      priority: 4,
    }),
    createChunk({
      id: "property-lease-clauses",
      pathname: "/property-rules",
      anchor: resourceSectionAnchors.propertyRules.leaseClauses,
      pageTitle: "Property rules in Himachal",
      sectionTitle: "Lease clauses",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["property", "lease", "agreement", "registration"],
      text: joinParts(
        leaseClauseList.map(
          (group) => `${group.category}: ${group.items.join("; ")}.`,
        ),
      ),
      priority: 3,
    }),
    ...faqItems.map((item) =>
      createChunk({
        id: `property-faq-${slugifySectionId(item.question)}`,
        pathname: "/property-rules",
        anchor: slugifySectionId(item.question),
        pageTitle: "Property rules in Himachal",
        sectionTitle: item.question,
        pageType: "resource",
        entitySlugs: [],
        keywords: ["property", "faq", item.question],
        text: item.answer,
        priority: 4,
      }),
    ),
  ];
}

function createPowerChunks() {
  return [
    createChunk({
      id: "power-reliability-ranking",
      pathname: "/power-backup",
      anchor: resourceSectionAnchors.powerBackup.reliability,
      pageTitle: "Power backup and heating in Himachal",
      sectionTitle: "Reliability ranking",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["power", "backup", "reliability", "outages"],
      text: `Power reliability ranking from best to riskiest for remote work: ${reliabilityRanking.join(
        ", ",
      )}.`,
      priority: 4,
    }),
    createChunk({
      id: "power-essentials-load",
      pathname: "/power-backup",
      anchor: resourceSectionAnchors.powerBackup.essentialsLoad,
      pageTitle: "Power backup and heating in Himachal",
      sectionTitle: "Essentials load",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["power", "backup", "load", "laptop", "router"],
      text: `${essentialsLoad.note} ${joinParts(
        essentialsLoad.items.map((item) => `${item.device}: ${item.watts}.`),
      )} Total load: ${essentialsLoad.total}.`,
      priority: 3,
    }),
    createChunk({
      id: "power-backup-tiers",
      pathname: "/power-backup",
      anchor: resourceSectionAnchors.powerBackup.backupTiers,
      pageTitle: "Power backup and heating in Himachal",
      sectionTitle: "Backup tiers",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["power", "backup", "ups", "inverter", "solar"],
      text: joinParts(
        backupTiers.map(
          (tier) =>
            `${tier.label}: ${tier.description} Specs: ${tier.specs}. Runtime: ${tier.runtime}. Cost: ${tier.costInr}. Best for: ${tier.bestFor}.`,
        ),
      ),
      priority: 5,
    }),
    ...powerTowns.map((town) =>
      createChunk({
        id: `${town.slug}-power`,
        pathname: "/power-backup",
        anchor: `${town.slug}-power`,
        pageTitle: "Power backup and heating in Himachal",
        sectionTitle: `${town.name} outage profile`,
        pageType: "resource",
        entitySlugs: [town.slug],
        keywords: ["power", "backup", town.name, town.slug, "outage", "heating"],
        text: `${town.name}: normal months ${town.outages.normal}. Monsoon ${town.outages.monsoon}. Winter ${town.outages.winter}. Recommended backup: ${town.recommendedBackup}. Heating approach: ${town.heatingApproach}. ${town.notes}`,
        priority: 4,
      }),
    ),
    createChunk({
      id: "power-heating-options",
      pathname: "/power-backup",
      anchor: resourceSectionAnchors.powerBackup.heating,
      pageTitle: "Power backup and heating in Himachal",
      sectionTitle: "Heating options",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["power", "heating", "warmth", "winter"],
      text: joinParts(
        heatingOptions.map(
          (option) =>
            `${option.label}: ${option.detail} Cost: ${option.cost}.${option.caution ? ` Caution: ${option.caution}.` : ""}`,
        ),
      ),
      priority: 3,
    }),
    createChunk({
      id: "power-insulation-tips",
      pathname: "/power-backup",
      anchor: resourceSectionAnchors.powerBackup.insulation,
      pageTitle: "Power backup and heating in Himachal",
      sectionTitle: "Insulation tips",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["power", "heating", "insulation", "winter"],
      text: joinParts(insulationTips.map((tip) => `${tip}.`)),
      priority: 3,
    }),
    createChunk({
      id: "power-property-checklist",
      pathname: "/power-backup",
      anchor: resourceSectionAnchors.powerBackup.checklist,
      pageTitle: "Power backup and heating in Himachal",
      sectionTitle: "Property checklist",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["power", "property", "checklist", "backup", "heating"],
      text: joinParts(propertyChecklist.map((item) => `${item}.`)),
      priority: 4,
    }),
  ];
}

function createWomensSafetyChunks() {
  return [
    createChunk({
      id: "womens-safety-policy",
      pathname: "/womens-safety",
      anchor: resourceSectionAnchors.womensSafety.policy,
      pageTitle: "Women's safety in Himachal",
      sectionTitle: "SheTravel policy",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["women", "safety", "government", "shetravel"],
      text: `${sheTravelPolicy.headline}. ${sheTravelPolicy.stat} ${joinParts(
        sheTravelPolicy.highlights.map(
          (highlight) => `${highlight.label}: ${highlight.detail}.`,
        ),
      )}`,
      priority: 4,
    }),
    createChunk({
      id: "womens-safety-crime-data",
      pathname: "/womens-safety",
      anchor: resourceSectionAnchors.womensSafety.crimeData,
      pageTitle: "Women's safety in Himachal",
      sectionTitle: "Crime data",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["women", "safety", "crime", "district data"],
      text: `${crimeDataNote} ${joinParts(
        crimeData.map(
          (row) =>
            `${row.district} ${row.year}: rape ${row.rape}, kidnapping ${row.kidnapping}, cruelty ${row.cruelty}, molestation ${row.molestation}.`,
        ),
      )}`,
      priority: 4,
    }),
    ...townSafetyProfiles.map((town) =>
      createChunk({
        id: `${town.slug}-safety`,
        pathname: "/womens-safety",
        anchor: `${town.slug}-safety`,
        pageTitle: "Women's safety in Himachal",
        sectionTitle: `${town.name} safety profile`,
        pageType: "resource",
        entitySlugs: [town.slug],
        keywords: ["women", "safety", town.name, town.slug, town.safetyLevel],
        text: `${town.name}: ${town.headline} ${town.detail} ${joinParts(
          town.tips.map((tip) => `${tip}.`),
        )}`,
        priority: 4,
      }),
    ),
    createChunk({
      id: "womens-safety-safe-spaces",
      pathname: "/womens-safety",
      anchor: resourceSectionAnchors.womensSafety.safeSpaces,
      pageTitle: "Women's safety in Himachal",
      sectionTitle: "Safe spaces",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["women", "safety", "cafes", "hostels", "co-living"],
      text: joinParts(
        safeSpaces.map(
          (space) =>
            `${space.name} in ${space.town}: ${space.description}${space.highlight ? ` ${space.highlight}.` : "."}`,
        ),
      ),
      priority: 3,
    }),
    createChunk({
      id: "womens-safety-healthcare",
      pathname: "/womens-safety",
      anchor: resourceSectionAnchors.womensSafety.healthcare,
      pageTitle: "Women's safety in Himachal",
      sectionTitle: "Healthcare access",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["women", "safety", "healthcare", "gynecology", "maternity"],
      text: joinParts(
        healthcareAccess.map(
          (town) => `${town.town}: ${town.facilities} ${town.note}.`,
        ),
      ),
      priority: 4,
    }),
    createChunk({
      id: "womens-safety-practical-tips",
      pathname: "/womens-safety",
      anchor: resourceSectionAnchors.womensSafety.practicalTips,
      pageTitle: "Women's safety in Himachal",
      sectionTitle: "Practical tips",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["women", "safety", "tips", "practical"],
      text: joinParts(practicalTips.map((tip) => `${tip}.`)),
      priority: 4,
    }),
  ];
}

function createPlaybookChunks() {
  return [
    createChunk({
      id: "playbook-settle-ranking",
      pathname: "/first-30-days",
      anchor: resourceSectionAnchors.first30Days.settleRanking,
      pageTitle: "First 30 days in Himachal",
      sectionTitle: "Settle ranking",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["moving", "settling", "first 30 days", "ranking"],
      text: `Fastest to slowest towns to settle into: ${settleSpeedRanking.join(", ")}.`,
      priority: 4,
    }),
    createChunk({
      id: "playbook-friction-points",
      pathname: "/first-30-days",
      anchor: resourceSectionAnchors.first30Days.frictionPoints,
      pageTitle: "First 30 days in Himachal",
      sectionTitle: "Friction points",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["moving", "settling", "friction", "utilities", "isp"],
      text: joinParts(
        frictionPoints.map((point) => `${point.title}: ${point.detail}.`),
      ),
      priority: 4,
    }),
    createChunk({
      id: "playbook-go-bag",
      pathname: "/first-30-days",
      anchor: resourceSectionAnchors.first30Days.goBag,
      pageTitle: "First 30 days in Himachal",
      sectionTitle: "Move-in go-bag",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["moving", "settling", "go bag", "documents"],
      text: joinParts(goBackChecklist.map((item) => `${item}.`)),
      priority: 3,
    }),
    createChunk({
      id: "playbook-checklist",
      pathname: "/first-30-days",
      anchor: resourceSectionAnchors.first30Days.checklist,
      pageTitle: "First 30 days in Himachal",
      sectionTitle: "Settling checklist",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["moving", "settling", "checklist", "first month"],
      text: joinParts(
        checklistPhases.map(
          (phase) =>
            `${phase.label} (${phase.days}): ${phase.objective} ${phase.items.join("; ")}.`,
        ),
      ),
      priority: 4,
    }),
    createChunk({
      id: "playbook-key-portals",
      pathname: "/first-30-days",
      anchor: resourceSectionAnchors.first30Days.portals,
      pageTitle: "First 30 days in Himachal",
      sectionTitle: "Key portals",
      pageType: "resource",
      entitySlugs: [],
      keywords: ["moving", "settling", "portals", "utilities"],
      text: joinParts(
        portals.map((portal) => `${portal.label}: ${portal.description}.`),
      ),
      priority: 3,
    }),
    ...playbookTowns.map((town) =>
      createChunk({
        id: `${town.slug}-settling`,
        pathname: "/first-30-days",
        anchor: `${town.slug}-settling`,
        pageTitle: "First 30 days in Himachal",
        sectionTitle: `${town.name} playbook`,
        pageType: "resource",
        entitySlugs: [town.slug],
        keywords: ["moving", "settling", town.name, town.slug, "playbook"],
        text: `${town.name}: ${town.overview} Rental search: ${town.rentalTip} Utilities: ${town.utilityNotes} ISP: ${town.ispTip} Transport: ${town.transportTip} ${joinParts(
          town.timeline.map(
            (item) => `${item.item}: ${item.days}${item.note ? ` (${item.note})` : ""}.`,
          ),
        )}`,
        priority: 4,
      }),
    ),
  ];
}

function createMetaChunks() {
  return [
    createChunk({
      id: "meta-home-overview",
      pathname: "/",
      anchor: "overview",
      pageTitle: "Appleville home",
      sectionTitle: "What Appleville is for",
      pageType: "meta",
      entitySlugs: [],
      keywords: ["appleville", "what is appleville", "home", "town matching"],
      text: "Appleville helps people match, compare, and reality-check Himachal towns before the shortlist turns into a vague travel fantasy. It is built for work, family, longer stays, and everyday livability rather than travel-only inspiration.",
      priority: 3,
    }),
    createChunk({
      id: "meta-about-overview",
      pathname: "/about",
      anchor: "overview",
      pageTitle: "About Appleville",
      sectionTitle: "Why this exists",
      pageType: "meta",
      entitySlugs: [],
      keywords: ["about", "appleville", "why this exists", "editorial stance"],
      text: "Appleville exists to help people decide where life might actually work in Himachal. The editorial stance is grounded and directional rather than certainty-heavy.",
      priority: 3,
    }),
    createChunk({
      id: "meta-quiz-overview",
      pathname: "/quiz",
      anchor: "overview",
      pageTitle: "Appleville quiz",
      sectionTitle: "Quiz",
      pageType: "meta",
      entitySlugs: [],
      keywords: ["quiz", "appleville quiz", "shortlist"],
      text: "The quiz is the fastest way to get a shortlist based on pace, access, budget, remote-work fit, and longer-stay priorities.",
      priority: 2,
    }),
    createChunk({
      id: "meta-compare-overview",
      pathname: "/compare",
      anchor: "overview",
      pageTitle: "Appleville compare",
      sectionTitle: "Compare",
      pageType: "meta",
      entitySlugs: [],
      keywords: ["compare", "town comparison", "side by side"],
      text: "Compare is for separating two to four towns that already feel plausible. It shows which town is strongest inside your chosen set on each dimension.",
      priority: 2,
    }),
    createChunk({
      id: "meta-towns-overview",
      pathname: "/towns",
      anchor: "overview",
      pageTitle: "Browse towns",
      sectionTitle: "Towns",
      pageType: "meta",
      entitySlugs: [],
      keywords: ["towns", "browse towns", "filters", "discovery"],
      text: "Browse towns when you already know some names and want clearer distinctions before the shortlist gets noisy.",
      priority: 2,
    }),
  ];
}

export function buildAssistantCorpus() {
  return [
    ...createTownChunks(),
    ...createGuideChunks(),
    ...createMethodChunks(),
    ...createFoodChunks(),
    ...createBankingChunks(),
    ...createCommunityChunks(),
    ...createPropertyChunks(),
    ...createPowerChunks(),
    ...createWomensSafetyChunks(),
    ...createPlaybookChunks(),
    ...createMetaChunks(),
  ];
}

export const assistantCorpus = buildAssistantCorpus();
