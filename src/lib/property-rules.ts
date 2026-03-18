export type BuyerType = {
  label: string;
  icon: string;
  canBuy: "yes-conditional" | "restricted" | "no";
  headline: string;
  detail: string;
  tips: string[];
};

export type PurchaseRoute = {
  route: string;
  legalSafety: "high" | "medium-high" | "medium" | "low";
  speed: string;
  risk: string;
  bestFor: string;
};

export type ScamRisk = {
  icon: string;
  title: string;
  detail: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type LeaseClause = {
  category: string;
  items: string[];
};

export type LegalSource = {
  label: string;
  url: string;
  description: string;
};

export const section118Summary = {
  headline: "Section 118 of the HP Tenancy and Land Reforms Act, 1972",
  core: "Transfers of \"land\" to a non-agriculturist are barred unless an exception applies or State permission is granted.",
  definitionOfAgriculturist:
    "A person who cultivates land personally in an estate situated in Himachal Pradesh, through own/family labour or supervision.",
  antiAvoidance:
    "Section 118 explicitly treats benami arrangements, POA structures, and agreements intended to give a non-agriculturist owner-like control as \"transfers\" — closing the most common workaround.",
  enforcement:
    "Transfers that contravene Section 118 can be declared void ab initio. The land (with structures and attachments) vests in the State, free of encumbrances. Downstream interests (including lenders) can be exposed.",
  municipalExclusion:
    "Leases of land or buildings in a municipal area are excluded from \"transfer\" — which is why leasing is the standard lawful route for outsiders.",
  recentMovement:
    "A 2025 Amendment Bill was introduced and referred to a Select Committee. Proposed changes may cover apartments by private developers and short-term leasing relaxations — but none are settled law yet.",
};

export const purchaseRoutes: PurchaseRoute[] = [
  {
    route: "Buy a built-up unit in a municipal area (flat/house) where Section 118 is exempt",
    legalSafety: "high",
    speed: "Medium",
    risk: "Medium if land is misclassified",
    bestFor: "Personal residence in town",
  },
  {
    route: "Buy land after obtaining Section 118(2)(h) permission (Rule 38A)",
    legalSafety: "high",
    speed: "Slow (months)",
    risk: "Medium–high if conditions breached",
    bestFor: "Hotels, industry, and projects",
  },
  {
    route: "Long-term registered lease (especially in municipal areas)",
    legalSafety: "high",
    speed: "Fast–medium",
    risk: "Low–medium",
    bestFor: "Secure occupation without ownership anxiety",
  },
  {
    route: "Purchase via POA / 'GPA sale' / side agreements",
    legalSafety: "low",
    speed: "\"Fast\"",
    risk: "Very high — void/vesting + litigation",
    bestFor: "Avoid entirely",
  },
  {
    route: "Use an Indian company/LLP as buyer",
    legalSafety: "medium-high",
    speed: "Slow",
    risk: "Medium (compliance-heavy)",
    bestFor: "Project or business acquisitions",
  },
];

export const buyerTypes: BuyerType[] = [
  {
    label: "Out-of-state Indian citizen",
    icon: "🇮🇳",
    canBuy: "yes-conditional",
    headline: "Can buy some property — but not \"land\" without permission.",
    detail:
      "You cannot validly buy \"land\" unless you are an agriculturist under the Act, the asset fits a statutory exception, or you secure State permission under Section 118(2)(h).",
    tips: [
      "Verify how the parcel is recorded in revenue records (gair-mumkin categories, built-up municipal area)",
      "If considering purchase, identify the exact clause you rely on — exemption vs. 118(2)(h) permission",
      "A registered lease is usually lower risk than creative ownership workarounds",
      "Planning permissions and subdivision compliance affect registrability and utility connections",
    ],
  },
  {
    label: "NRI / OCI",
    icon: "🌏",
    canBuy: "yes-conditional",
    headline: "FEMA allows residential/commercial — but Section 118 still applies to \"land\".",
    detail:
      "Under FEMA rules, NRIs/OCIs can generally buy residential/commercial property in India without RBI approval (not agricultural/farmhouse/plantation). But in Himachal, Section 118 can still block \"land\" acquisition. You end up in the same decision tree: buy something outside \"land\" or apply for 118 permission.",
    tips: [
      "FEMA clearance is only the central layer — state land-reform rules still apply",
      "Focus on built-up municipal units where Section 118 is less likely to bite",
      "If the target is \"land\", you need Section 118 permission regardless of FEMA status",
    ],
  },
  {
    label: "Foreign national (non-Indian origin)",
    icon: "🌐",
    canBuy: "no",
    headline: "Cannot purchase. May lease up to 5 years without RBI permission.",
    detail:
      "Foreign nationals of non-Indian origin resident outside India are not permitted to purchase immovable property in India (inheritance is a narrow exception). Even if resident in India under FEMA concepts, Section 118 adds another layer. Ownership is effectively unavailable.",
    tips: [
      "Leases up to 5 years do not require RBI permission — this is the standard path",
      "Register long leases (over 1 year) to ensure enforceability",
      "A valid International Driving Permit is required for driving (foreign licence alone is insufficient)",
    ],
  },
  {
    label: "Company / LLP",
    icon: "🏢",
    canBuy: "yes-conditional",
    headline: "Possible via purpose-linked Section 118 permission + planning compliance.",
    detail:
      "Companies can acquire land for industrial/tourism/project purposes via the 118 permission route. \"Essentiality\" and purpose-fit are core criteria. After purchase, the \"put to use\" condition applies — vesting disputes often turn on whether progress steps were cogent vs. cosmetic.",
    tips: [
      "Rule 38A: apply to the District Collector with prescribed documents",
      "Build a compliance programme: timeline, evidence of progress, all approvals",
      "Courts evaluate \"meaningful steps\" — not just project completion",
      "Recent cases (2023–2026) show courts applying pragmatic, evidence-based tests",
    ],
  },
];

export const scamRisks: ScamRisk[] = [
  {
    icon: "⚠️",
    title: "\"GPA sale\" / POA transfer marketed as ownership",
    detail:
      "POA does not convey title (Supreme Court: Suraj Lamp, 2011). Section 118 can treat such schemes as prohibited transfers depending on intention/possession. High risk of vesting.",
  },
  {
    icon: "🏷️",
    title: "Misclassification gambit",
    detail:
      "Portraying \"land\" as \"built-up\" or \"municipal\" when revenue/planning records say otherwise. Risk of later Section 118 proceedings and vesting — even after you've built on it.",
  },
  {
    icon: "📝",
    title: "\"Buy now, permission later\" promises",
    detail:
      "Rule 38A is a permission-before-transfer regime. If permission is refused or conditions breached, downstream consequences can be severe — including land vesting in the State.",
  },
];

export const dueDiligenceChecklist: string[] = [
  "Confirm how the parcel is recorded in revenue records (gair-mumkin categories, built-up municipal area status)",
  "Verify Section 118 applicability — including POA-type structures that count as \"transfer\"",
  "Identify your eligibility path: statutory exemption vs. 118(2)(h) permission",
  "If using the permission route: follow Rule 38A procedure (Collector application, verified documents, State decision)",
  "Check planning and subdivision compliance — affects registrability and utility connections",
  "Build a \"put to use\" compliance plan if permission is granted (timeline, evidence, approvals)",
  "Bankability check: lenders are exposed if the underlying transfer is void under Section 118",
];

export const leaseClauseList: LeaseClause[] = [
  {
    category: "Core terms",
    items: [
      "Property description and current status/usage",
      "Term, renewal options, and rent escalation formula",
      "Security deposit amount and return conditions",
      "Lock-in period and notice period for termination",
    ],
  },
  {
    category: "Operational",
    items: [
      "Utilities and property taxes — who pays what",
      "Repairs, structural safety, and hillside/water seepage responsibility",
      "Subletting and assignment rights (or restrictions)",
      "Compliance with local planning rules and society/house rules",
    ],
  },
  {
    category: "Protection",
    items: [
      "Inspection rights and quiet enjoyment guarantee",
      "Move-in/handover condition schedule with photos",
      "Registration and stamp duty allocation",
      "Dispute resolution clause and jurisdiction",
      "Force majeure: landslides, road closures, natural disasters",
    ],
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Can an out-of-state Indian buy land in Himachal Pradesh?",
    answer:
      "Only if they are an \"agriculturist\" under the Act, the transaction fits a statutory exception, or they secure State permission under Section 118(2)(h). Otherwise, transfers of \"land\" are barred and can be declared void.",
  },
  {
    question: "Can an OCI buy property in Himachal Pradesh?",
    answer:
      "Under FEMA rules, OCIs can buy residential/commercial property in India (not agricultural/farmhouse/plantation) without RBI approval. But Section 118 can still block \"land\" acquisition — so the practical answer depends on whether the target is outside \"land\" or you obtain 118 permission.",
  },
  {
    question: "Can a foreigner buy?",
    answer:
      "A foreign national of non-Indian origin resident outside India cannot purchase immovable property in India (inheritance is a narrow exception). Leases up to 5 years are the available path without RBI permission.",
  },
  {
    question: "Can a company buy?",
    answer:
      "Yes in concept, but usually via purpose-linked pathways and Section 118 permission, plus planning compliance and \"put to use\" evidence. Recent litigation shows how courts evaluate project progress.",
  },
  {
    question: "Is a POA enforceable as ownership?",
    answer:
      "No. POA is not a conveyance (Supreme Court: Suraj Lamp, 2011), and Section 118 treats POA-based \"owner-like control\" as part of the prohibited transfer universe.",
  },
  {
    question: "Is a long-term lease \"safe\" for long occupation?",
    answer:
      "Usually safer than ownership workarounds. Long leases should be registered if they exceed one year. Section 118's municipal-area lease exclusion makes leasing the standard lawful option for non-agriculturists.",
  },
];

export const legalSources: LegalSource[] = [
  {
    label: "Section 118 — full text",
    url: "https://indiankanoon.org/doc/25505898/",
    description: "Consolidated view of Section 118 on IndianKanoon",
  },
  {
    label: "HP Tenancy & Land Reforms Act, 1972",
    url: "https://emerginghimachal.hp.gov.in/themes/backend/uploads/landreformAct1972.pdf",
    description: "Full Act PDF on HP government domain",
  },
  {
    label: "HP Town & Country Planning FAQ",
    url: "https://tcp.hp.gov.in/content/faq",
    description: "Planning permissions and Section 118 interaction",
  },
  {
    label: "FEMA Non-debt Instruments Rules, 2019",
    url: "https://incometaxindia.gov.in/Documents/Provisions%20for%20NR/FEM-Non-debt-Instruments-Rules-2019.htm",
    description: "Chapter IX — immovable property rules for NRIs/foreigners",
  },
  {
    label: "RBI Guidance — Property by Foreign Nationals",
    url: "https://www.rbi.org.in/commonman/Upload/English/Notification/PDFs/15MCT010710_F.pdf",
    description: "Includes the ≤5 year lease rule",
  },
  {
    label: "HP Urban Rent Control Act",
    url: "https://ud.hp.gov.in/act-and-rules/acts",
    description: "Current rent control statute listing",
  },
];
