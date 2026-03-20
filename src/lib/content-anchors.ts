export function slugifySectionId(input: string) {
  return input
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const townSectionAnchors = {
  overview: "overview",
  quickRead: "quick-read",
  snapshot: "snapshot",
  compareNext: "compare-next",
  bestFor: "best-for",
  notIdealFor: "not-ideal-for",
  remoteWorkReality: "remote-work-reality",
  localFeel: "local-feel",
  practicalReality: "practical-reality",
  stayNotes: "stay-notes",
  tradeoff: "the-tradeoff",
  relatedGuides: "related-guides",
  method: "how-appleville-reads-this-town",
  operationalDetail: "operational-detail",
} as const;

export const guideSectionAnchors = {
  intro: "intro",
  takeaways: "quick-takeaways",
  toolLinks: "use-with-appleville",
  relatedTowns: "related-towns",
} as const;

export const resourceSectionAnchors = {
  food: {
    quickRealityCheck: "quick-reality-check",
    vegetableMarkets: "vegetable-markets",
    seasonalSwings: "seasonal-swings",
    drinkingWater: "drinking-water",
    animalProtein: "animal-protein",
    dairy: "dairy-ecosystem",
    organic: "farm-to-table-organic",
    bakeries: "bakery-renaissance",
    specialtyGroceries: "specialty-groceries",
    delivery: "delivery-reality",
  },
  banking: {
    snapshot: "financial-snapshot",
    banksByTown: "banks-by-town",
    paymentMethods: "payment-methods",
    cashRule: "cash-rule",
    nonResident: "non-resident-banking",
    forex: "forex-and-remittances",
    network: "network-for-payments",
  },
  community: {
    helplines: "support-lines",
    newcomer: "newcomer-playbook",
    townProfiles: "community-by-town",
    sources: "community-sources",
  },
  propertyRules: {
    section118: "section-118",
    buyerTypes: "buyer-types",
    purchaseRoutes: "purchase-routes",
    scamRisks: "scam-risks",
    dueDiligence: "due-diligence",
    leaseClauses: "lease-clauses",
    faq: "property-faq",
  },
  powerBackup: {
    reliability: "reliability-ranking",
    essentialsLoad: "essentials-load",
    backupTiers: "backup-tiers",
    outageProfiles: "outage-profiles",
    heating: "heating-options",
    insulation: "insulation-tips",
    checklist: "property-checklist",
  },
  womensSafety: {
    policy: "she-travel-policy",
    crimeData: "crime-data",
    townProfiles: "town-safety-profiles",
    safeSpaces: "safe-spaces",
    healthcare: "healthcare-access",
    practicalTips: "practical-tips",
  },
  first30Days: {
    settleRanking: "settle-ranking",
    frictionPoints: "friction-points",
    goBag: "move-in-go-bag",
    checklist: "settling-checklist",
    portals: "key-portals",
    townPlaybooks: "town-playbooks",
  },
} as const;
