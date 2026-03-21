import type {
  AssistantAnticipationEntry,
  AssistantAnticipationFollowUpCase,
  AssistantAnticipationPromptCase,
} from "./types.ts";

export const assistantAnticipationEntries = [
  {
    "id": "banking-account",
    "domainKind": "banking",
    "subIntent": "account_opening",
    "focusTopics": [
      "banking"
    ],
    "sourceKind": "mixed",
    "sourceLabel": "Banking and money in Himachal",
    "livePathname": "/banking",
    "comparisonCapable": true,
    "singleTownCapable": true,
    "followUpCapable": true,
    "requiredKeywords": [
      "bank account",
      "open account",
      "account"
    ],
    "preferredKeywords": [
      "documents",
      "nri account",
      "proof of address",
      "banking"
    ],
    "questionPatterns": [
      "bank account",
      "open account",
      "proof of address",
      "nri account",
      "banking in"
    ],
    "samplePrompts": [
      "can i open a bank account in Shimla",
      "can i open a bank account in Naggar",
      "can i open a bank account in Bir",
      "bank account in Shimla",
      "bank account in Naggar",
      "bank account in Bir",
      "tell me about banking in Shimla",
      "tell me about banking in Naggar",
      "tell me about banking in Bir"
    ],
    "strictFallback": true,
    "evidenceHeadings": [
      "Institutional Banking Presence: Town-by-Town Evaluation",
      "Solan: Industrial and Educational Banking",
      "Non-Resident Banking: Regulatory and Procedural Analysis",
      "Documentation for Domestic Non-Residents",
      "Non-Resident Indian (NRI) and Foreign National Accounts"
    ]
  },
  {
    "id": "banking-cash-upi",
    "domainKind": "banking",
    "subIntent": "cash_upi",
    "focusTopics": [
      "banking"
    ],
    "sourceKind": "mixed",
    "sourceLabel": "Banking and money in Himachal",
    "livePathname": "/banking",
    "comparisonCapable": true,
    "singleTownCapable": true,
    "followUpCapable": true,
    "requiredKeywords": [
      "upi",
      "cash",
      "atm",
      "payment",
      "payments"
    ],
    "preferredKeywords": [
      "merchant",
      "digital payment",
      "card",
      "money"
    ],
    "questionPatterns": [
      "upi",
      "cash",
      "atm",
      "payment failure",
      "digital payment"
    ],
    "samplePrompts": [
      "upi in Shimla",
      "upi in Naggar",
      "upi in Bir",
      "do i still need cash in Shimla",
      "do i still need cash in Naggar",
      "do i still need cash in Bir",
      "Bir vs Dharamshala for bank access",
      "Palampur vs Manali for bank access",
      "Naggar vs Palampur for bank access"
    ],
    "strictFallback": true,
    "evidenceHeadings": [
      "Digital Payments: UPI and Merchant Acceptance",
      "Merchant Dynamics",
      "ATM Infrastructure and Cash Dependency",
      "International Payments and Foreign Exchange"
    ]
  },
  {
    "id": "banking-forex",
    "domainKind": "banking",
    "subIntent": "forex",
    "focusTopics": [
      "banking"
    ],
    "sourceKind": "mixed",
    "sourceLabel": "Banking and money in Himachal",
    "livePathname": "/banking",
    "comparisonCapable": false,
    "singleTownCapable": true,
    "followUpCapable": true,
    "requiredKeywords": [
      "forex",
      "remittance",
      "western union"
    ],
    "preferredKeywords": [
      "exchange",
      "moneygram",
      "wire transfer"
    ],
    "questionPatterns": [
      "forex",
      "western union",
      "moneygram",
      "wire transfer"
    ],
    "samplePrompts": [
      "forex in Shimla",
      "forex in Naggar",
      "forex in Bir",
      "western union in Shimla",
      "western union in Naggar",
      "western union in Bir",
      "how easy is remittance in Shimla",
      "how easy is remittance in Naggar",
      "how easy is remittance in Bir"
    ],
    "strictFallback": true,
    "evidenceHeadings": [
      "Dharamshala and McLeodganj: The International Corridors",
      "International Payments and Foreign Exchange",
      "Foreign Exchange (Forex) Agents",
      "Digital Remittances"
    ]
  },
  {
    "id": "community-coworking",
    "domainKind": "community",
    "subIntent": "coworking",
    "focusTopics": [
      "community",
      "remote-work"
    ],
    "sourceKind": "mixed",
    "sourceLabel": "Community and wellbeing in Himachal",
    "livePathname": "/community",
    "comparisonCapable": true,
    "singleTownCapable": true,
    "followUpCapable": true,
    "requiredKeywords": [
      "coworking",
      "coliving"
    ],
    "preferredKeywords": [
      "network",
      "nomad",
      "meet people"
    ],
    "questionPatterns": [
      "coworking",
      "coliving",
      "meet people through coworking"
    ],
    "samplePrompts": [
      "coworking in Shimla",
      "coworking in Naggar",
      "coworking in Bir",
      "can i meet people through coworking in Shimla",
      "can i meet people through coworking in Naggar",
      "can i meet people through coworking in Bir",
      "Bir vs Dharamshala for coworking community",
      "Palampur vs Manali for coworking community",
      "Naggar vs Palampur for coworking community"
    ],
    "strictFallback": true,
    "evidenceHeadings": [
      "Newcomer connection pathways and integration recommendations"
    ]
  },
  {
    "id": "community-mental-health",
    "domainKind": "community",
    "subIntent": "mental_health",
    "focusTopics": [
      "community"
    ],
    "sourceKind": "mixed",
    "sourceLabel": "Community and wellbeing in Himachal",
    "livePathname": "/community",
    "comparisonCapable": false,
    "singleTownCapable": true,
    "followUpCapable": true,
    "requiredKeywords": [
      "mental health",
      "therapy",
      "therapist",
      "counselling"
    ],
    "preferredKeywords": [
      "tele manas",
      "aa",
      "na",
      "support group"
    ],
    "questionPatterns": [
      "mental health",
      "therapy",
      "therapist",
      "tele manas"
    ],
    "samplePrompts": [
      "mental health support in Shimla",
      "mental health support in Naggar",
      "mental health support in Bir",
      "therapy in Shimla",
      "therapy in Naggar",
      "therapy in Bir",
      "is there counselling support in Shimla",
      "is there counselling support in Naggar",
      "is there counselling support in Bir"
    ],
    "strictFallback": true,
    "evidenceHeadings": [
      "Community structures and mental-health and social-support resources for remote workers and relocating families in Bir, Dharamshala, McLeodganj, Palampur, Shimla, Solan, Manali and Naggar"
    ]
  },
  {
    "id": "community-social",
    "domainKind": "community",
    "subIntent": "social",
    "focusTopics": [
      "community"
    ],
    "sourceKind": "mixed",
    "sourceLabel": "Community and wellbeing in Himachal",
    "livePathname": "/community",
    "comparisonCapable": true,
    "singleTownCapable": true,
    "followUpCapable": true,
    "requiredKeywords": [
      "community",
      "social",
      "friends",
      "lonely",
      "loneliness",
      "isolation"
    ],
    "preferredKeywords": [
      "meet people",
      "social life",
      "support"
    ],
    "questionPatterns": [
      "social life",
      "lonely",
      "isolation",
      "community"
    ],
    "samplePrompts": [
      "community in Shimla",
      "community in Naggar",
      "community in Bir",
      "will i feel lonely in Shimla",
      "will i feel lonely in Naggar",
      "will i feel lonely in Bir",
      "Bir vs Dharamshala for community",
      "Palampur vs Manali for community",
      "Naggar vs Palampur for community"
    ],
    "strictFallback": true,
    "evidenceHeadings": [
      "Community structures and mental-health and social-support resources for remote workers and relocating families in Bir, Dharamshala, McLeodganj, Palampur, Shimla, Solan, Manali and Naggar"
    ]
  },
  {
    "id": "food-water-delivery",
    "domainKind": "food_water",
    "subIntent": "delivery",
    "focusTopics": [
      "food"
    ],
    "sourceKind": "mixed",
    "sourceLabel": "Food reality in Himachal",
    "livePathname": "/food",
    "comparisonCapable": true,
    "singleTownCapable": true,
    "followUpCapable": true,
    "requiredKeywords": [
      "delivery",
      "swiggy",
      "zomato",
      "deliver",
      "delivers"
    ],
    "preferredKeywords": [
      "food delivery",
      "home delivery",
      "app delivery"
    ],
    "questionPatterns": [
      "swiggy",
      "zomato",
      "food delivery",
      "deliver in",
      "delivers in"
    ],
    "samplePrompts": [
      "does swiggy deliver in Shimla",
      "does swiggy deliver in Naggar",
      "does swiggy deliver in Bir",
      "zomato in Shimla",
      "zomato in Naggar",
      "zomato in Bir",
      "Bir vs Dharamshala for delivery",
      "Palampur vs Manali for delivery",
      "Naggar vs Palampur for delivery"
    ],
    "strictFallback": true,
    "evidenceHeadings": [
      "Dairy Logistics: Milk Delivery Networks and the Artisanal Cheese Ecosystem",
      "The Dynamics of Milk Delivery",
      "Algorithmic Dining: The Penetration of Food Delivery Networks"
    ]
  },
  {
    "id": "food-water-groceries",
    "domainKind": "food_water",
    "subIntent": "groceries",
    "focusTopics": [
      "food"
    ],
    "sourceKind": "mixed",
    "sourceLabel": "Food reality in Himachal",
    "livePathname": "/food",
    "comparisonCapable": true,
    "singleTownCapable": true,
    "followUpCapable": true,
    "requiredKeywords": [
      "groceries",
      "grocery",
      "protein",
      "dairy",
      "bakery"
    ],
    "preferredKeywords": [
      "market",
      "mandi",
      "milk",
      "cheese",
      "sourdough"
    ],
    "questionPatterns": [
      "groceries",
      "market",
      "protein",
      "dairy",
      "bakery"
    ],
    "samplePrompts": [
      "tell me about groceries in Shimla",
      "tell me about groceries in Naggar",
      "tell me about groceries in Bir",
      "protein in Shimla",
      "protein in Naggar",
      "protein in Bir",
      "Bir vs Dharamshala for groceries",
      "Palampur vs Manali for groceries",
      "Naggar vs Palampur for groceries"
    ],
    "strictFallback": true,
    "evidenceHeadings": [
      "The Animal Protein Supply Chain: Sourcing Realities and Quality Constraints",
      "Dairy Logistics: Milk Delivery Networks and the Artisanal Cheese Ecosystem",
      "The Sourdough and Bakery Renaissance",
      "The Distribution of Imported Groceries and Supermarkets"
    ]
  },
  {
    "id": "food-water-water",
    "domainKind": "food_water",
    "subIntent": "water",
    "focusTopics": [
      "food",
      "water"
    ],
    "sourceKind": "mixed",
    "sourceLabel": "Food reality in Himachal",
    "livePathname": "/food",
    "comparisonCapable": true,
    "singleTownCapable": true,
    "followUpCapable": true,
    "requiredKeywords": [
      "water",
      "tap water",
      "drinking water"
    ],
    "preferredKeywords": [
      "safe",
      "safe water",
      "water situation",
      "ro",
      "boil",
      "purify"
    ],
    "questionPatterns": [
      "water situation",
      "tap water",
      "drinking water",
      "water safe"
    ],
    "samplePrompts": [
      "tell me about water situation in Shimla",
      "tell me about water situation in Naggar",
      "tell me about water situation in Bir",
      "is tap water safe in Shimla",
      "is tap water safe in Naggar",
      "is tap water safe in Bir",
      "Bir vs Dharamshala for water",
      "Palampur vs Manali for water",
      "Naggar vs Palampur for water"
    ],
    "strictFallback": true,
    "evidenceHeadings": [
      "Introduction to the Himalayan Culinary Topography",
      "The Agrarian Pulse: Local Vegetable Mandis and Produce Economics",
      "The Animal Protein Supply Chain: Sourcing Realities and Quality Constraints",
      "The Aquaculture Phenomenon: Trout Cultivation",
      "Poultry Logistics and Quality Control Vulnerabilities",
      "Hydrological Realities: Drinking Water Quality and Purification Needs"
    ]
  },
  {
    "id": "method-how-it-works",
    "domainKind": "method",
    "subIntent": "how_it_works",
    "focusTopics": [
      "method"
    ],
    "sourceKind": "mixed",
    "sourceLabel": "How Appleville works",
    "livePathname": "/how-it-works",
    "comparisonCapable": false,
    "singleTownCapable": false,
    "followUpCapable": true,
    "requiredKeywords": [
      "how this works",
      "how appleville works",
      "how do you decide"
    ],
    "preferredKeywords": [
      "score",
      "scoring",
      "citation",
      "citations",
      "trust"
    ],
    "questionPatterns": [
      "how this works",
      "how do you decide",
      "how do you score",
      "citation logic"
    ],
    "samplePrompts": [],
    "strictFallback": true,
    "evidenceHeadings": [
      "PRD — Build Your Life in Himachal (V1)",
      "1. Summary",
      "2. Problem",
      "3. Target user",
      "Primary user",
      "Early users"
    ]
  },
  {
    "id": "moving-settling",
    "domainKind": "moving",
    "subIntent": "settling",
    "focusTopics": [
      "moving"
    ],
    "sourceKind": "mixed",
    "sourceLabel": "First 30 days in Himachal",
    "livePathname": "/first-30-days",
    "comparisonCapable": true,
    "singleTownCapable": true,
    "followUpCapable": true,
    "requiredKeywords": [
      "first month",
      "first 30 days",
      "move",
      "moving",
      "settle"
    ],
    "preferredKeywords": [
      "trial move",
      "rental setup",
      "onboarding"
    ],
    "questionPatterns": [
      "first month",
      "first 30 days",
      "trial move",
      "rental setup"
    ],
    "samplePrompts": [
      "first month in Shimla",
      "first month in Naggar",
      "first month in Bir",
      "tell me about moving to Shimla",
      "tell me about moving to Naggar",
      "tell me about moving to Bir",
      "Bir vs Dharamshala for settling in",
      "Palampur vs Manali for settling in",
      "Naggar vs Palampur for settling in"
    ],
    "strictFallback": true,
    "evidenceHeadings": [
      "PRD — Build Your Life in Himachal (V1)",
      "1. Summary",
      "2. Problem",
      "3. Target user",
      "Primary user",
      "Early users"
    ]
  },
  {
    "id": "moving-utilities",
    "domainKind": "moving",
    "subIntent": "utilities",
    "focusTopics": [
      "moving",
      "power"
    ],
    "sourceKind": "mixed",
    "sourceLabel": "First 30 days in Himachal",
    "livePathname": "/first-30-days",
    "comparisonCapable": true,
    "singleTownCapable": true,
    "followUpCapable": true,
    "requiredKeywords": [
      "sim",
      "utilities",
      "broadband",
      "proof of address"
    ],
    "preferredKeywords": [
      "lpg",
      "water connection",
      "electricity transfer"
    ],
    "questionPatterns": [
      "sim",
      "utilities",
      "proof of address",
      "broadband"
    ],
    "samplePrompts": [
      "utilities in Shimla",
      "utilities in Naggar",
      "utilities in Bir",
      "how hard is sim setup in Shimla",
      "how hard is sim setup in Naggar",
      "how hard is sim setup in Bir",
      "Bir vs Dharamshala for settling logistics",
      "Palampur vs Manali for settling logistics",
      "Naggar vs Palampur for settling logistics"
    ],
    "strictFallback": true,
    "evidenceHeadings": [
      "7. The Micro-Economics of Daily Living: Utilities, Groceries, and Domestic Labor"
    ]
  },
  {
    "id": "power-backup",
    "domainKind": "power",
    "subIntent": "backup",
    "focusTopics": [
      "power"
    ],
    "sourceKind": "mixed",
    "sourceLabel": "Power backup and heating in Himachal",
    "livePathname": "/power-backup",
    "comparisonCapable": true,
    "singleTownCapable": true,
    "followUpCapable": true,
    "requiredKeywords": [
      "inverter",
      "ups",
      "backup",
      "battery"
    ],
    "preferredKeywords": [
      "do i need inverter",
      "solar"
    ],
    "questionPatterns": [
      "do i need inverter",
      "backup",
      "ups",
      "battery"
    ],
    "samplePrompts": [
      "do i need inverter in Shimla",
      "do i need inverter in Naggar",
      "do i need inverter in Bir",
      "backup in Shimla",
      "backup in Naggar",
      "backup in Bir",
      "Bir vs Dharamshala for backup needs",
      "Palampur vs Manali for backup needs",
      "Naggar vs Palampur for backup needs"
    ],
    "strictFallback": true,
    "evidenceHeadings": [
      "Demographic, Infrastructure, and Socio-Economic Assessment of Himachal Pradesh Hubs: A Comparative Analysis for Relocation and Remote Work",
      "1. Macro-Economic Context and the Urban-Rural Continuum",
      "2. Residential Real Estate and the Leasing Ecosystem",
      "3. Co-Working Infrastructure and the Digital Nomad Economy",
      "4. Digital Infrastructure and Telecommunications Reliability",
      "5. Healthcare Infrastructure, Trauma Readiness, and Geographic Isolation"
    ]
  },
  {
    "id": "power-heating",
    "domainKind": "power",
    "subIntent": "heating",
    "focusTopics": [
      "power"
    ],
    "sourceKind": "mixed",
    "sourceLabel": "Power backup and heating in Himachal",
    "livePathname": "/power-backup",
    "comparisonCapable": true,
    "singleTownCapable": true,
    "followUpCapable": true,
    "requiredKeywords": [
      "heating",
      "heater",
      "warm",
      "winter heating"
    ],
    "preferredKeywords": [
      "electric blanket",
      "bukhari",
      "radiator"
    ],
    "questionPatterns": [
      "heating",
      "heater",
      "winter heating",
      "how to stay warm"
    ],
    "samplePrompts": [
      "heating in Shimla",
      "heating in Naggar",
      "heating in Bir",
      "how should i handle heating in Shimla",
      "how should i handle heating in Naggar",
      "how should i handle heating in Bir",
      "Bir vs Dharamshala for winter heating",
      "Palampur vs Manali for winter heating",
      "Naggar vs Palampur for winter heating"
    ],
    "strictFallback": true,
    "evidenceHeadings": [
      "9.2 The Winter Freeze and High-Altitude Isolation (December to February)"
    ]
  },
  {
    "id": "power-outages",
    "domainKind": "power",
    "subIntent": "outages",
    "focusTopics": [
      "power"
    ],
    "sourceKind": "mixed",
    "sourceLabel": "Power backup and heating in Himachal",
    "livePathname": "/power-backup",
    "comparisonCapable": true,
    "singleTownCapable": true,
    "followUpCapable": true,
    "requiredKeywords": [
      "power",
      "power cut",
      "power cuts",
      "outage",
      "outages",
      "electricity"
    ],
    "preferredKeywords": [
      "blackout",
      "load shedding"
    ],
    "questionPatterns": [
      "power cuts",
      "outages",
      "electricity",
      "power situation"
    ],
    "samplePrompts": [
      "power cuts in Shimla",
      "power cuts in Naggar",
      "power cuts in Bir",
      "how bad are outages in Shimla",
      "how bad are outages in Naggar",
      "how bad are outages in Bir",
      "Bir vs Dharamshala for power cuts",
      "Palampur vs Manali for power cuts",
      "Naggar vs Palampur for power cuts"
    ],
    "strictFallback": true,
    "evidenceHeadings": [
      "Demographic, Infrastructure, and Socio-Economic Assessment of Himachal Pradesh Hubs: A Comparative Analysis for Relocation and Remote Work",
      "1. Macro-Economic Context and the Urban-Rural Continuum",
      "2. Residential Real Estate and the Leasing Ecosystem",
      "3. Co-Working Infrastructure and the Digital Nomad Economy",
      "4. Digital Infrastructure and Telecommunications Reliability",
      "5. Healthcare Infrastructure, Trauma Readiness, and Geographic Isolation"
    ]
  },
  {
    "id": "property-eligibility",
    "domainKind": "property",
    "subIntent": "eligibility",
    "focusTopics": [
      "property"
    ],
    "sourceKind": "module",
    "sourceLabel": "Property rules in Himachal",
    "livePathname": "/property-rules",
    "comparisonCapable": false,
    "singleTownCapable": true,
    "followUpCapable": true,
    "requiredKeywords": [
      "property",
      "buy",
      "section 118",
      "outsider"
    ],
    "preferredKeywords": [
      "can i buy",
      "can outsiders buy",
      "eligibility",
      "from mumbai"
    ],
    "questionPatterns": [
      "can i buy",
      "can outsiders buy",
      "section 118",
      "from mumbai"
    ],
    "samplePrompts": [
      "can i buy in Shimla if i am from mumbai",
      "can i buy in Naggar if i am from mumbai",
      "can i buy in Bir if i am from mumbai",
      "property in Shimla",
      "property in Naggar",
      "property in Bir"
    ],
    "strictFallback": true,
    "evidenceHeadings": [
      "PRD — Build Your Life in Himachal (V1)",
      "1. Summary",
      "2. Problem",
      "3. Target user",
      "Primary user",
      "Early users"
    ]
  },
  {
    "id": "property-lease",
    "domainKind": "property",
    "subIntent": "lease",
    "focusTopics": [
      "property"
    ],
    "sourceKind": "module",
    "sourceLabel": "Property rules in Himachal",
    "livePathname": "/property-rules",
    "comparisonCapable": false,
    "singleTownCapable": true,
    "followUpCapable": true,
    "requiredKeywords": [
      "lease",
      "rent agreement",
      "registered lease"
    ],
    "preferredKeywords": [
      "long lease",
      "lease instead",
      "safe route"
    ],
    "questionPatterns": [
      "lease instead",
      "registered lease",
      "long lease"
    ],
    "samplePrompts": [
      "is a registered lease safer in Shimla",
      "is a registered lease safer in Naggar",
      "is a registered lease safer in Bir"
    ],
    "strictFallback": true,
    "evidenceHeadings": [
      "PRD — Build Your Life in Himachal (V1)",
      "1. Summary",
      "2. Problem",
      "3. Target user",
      "Primary user",
      "Early users"
    ]
  },
  {
    "id": "property-risk",
    "domainKind": "property",
    "subIntent": "risk",
    "focusTopics": [
      "property"
    ],
    "sourceKind": "module",
    "sourceLabel": "Property rules in Himachal",
    "livePathname": "/property-rules",
    "comparisonCapable": false,
    "singleTownCapable": false,
    "followUpCapable": true,
    "requiredKeywords": [
      "gpa",
      "poa",
      "scam",
      "risk"
    ],
    "preferredKeywords": [
      "workaround",
      "benami",
      "buy now permission later"
    ],
    "questionPatterns": [
      "gpa sale",
      "poa",
      "buy now permission later",
      "property scam"
    ],
    "samplePrompts": [],
    "strictFallback": true,
    "evidenceHeadings": [
      "13. Risks"
    ]
  },
  {
    "id": "town-family-fit",
    "domainKind": "comparison",
    "subIntent": "ranking",
    "focusTopics": [
      "town-fit",
      "family"
    ],
    "sourceKind": "mixed",
    "sourceLabel": "Family-fit town guidance",
    "livePathname": null,
    "comparisonCapable": true,
    "singleTownCapable": true,
    "followUpCapable": true,
    "requiredKeywords": [
      "family",
      "families",
      "kids"
    ],
    "preferredKeywords": [
      "schools",
      "family life",
      "children"
    ],
    "questionPatterns": [
      "for families",
      "family",
      "kids",
      "schools"
    ],
    "samplePrompts": [
      "is Shimla good for families",
      "is Naggar good for families",
      "is Bir good for families",
      "Bir vs Dharamshala for families",
      "Palampur vs Manali for families",
      "Naggar vs Palampur for families",
      "which town is better for family life, Bir or Dharamshala",
      "which town is better for family life, Palampur or Manali",
      "which town is better for family life, Naggar or Palampur"
    ],
    "strictFallback": false,
    "evidenceHeadings": [
      "PRD — Build Your Life in Himachal (V1)",
      "1. Summary",
      "2. Problem",
      "3. Target user",
      "Primary user",
      "Early users"
    ]
  },
  {
    "id": "town-long-stay",
    "domainKind": "comparison",
    "subIntent": "ranking",
    "focusTopics": [
      "town-fit",
      "long-stay"
    ],
    "sourceKind": "mixed",
    "sourceLabel": "Long-stay fit guidance",
    "livePathname": null,
    "comparisonCapable": true,
    "singleTownCapable": true,
    "followUpCapable": true,
    "requiredKeywords": [
      "long stay",
      "longer stay",
      "long term"
    ],
    "preferredKeywords": [
      "home base",
      "base",
      "settle"
    ],
    "questionPatterns": [
      "long stay",
      "longer stay",
      "long term",
      "home base"
    ],
    "samplePrompts": [
      "is Shimla good for a long stay",
      "is Naggar good for a long stay",
      "is Bir good for a long stay",
      "Bir or Dharamshala for a longer stay",
      "Palampur or Manali for a longer stay",
      "Naggar or Palampur for a longer stay",
      "which town is better as a home base, Bir or Dharamshala",
      "which town is better as a home base, Palampur or Manali",
      "which town is better as a home base, Naggar or Palampur"
    ],
    "strictFallback": false,
    "evidenceHeadings": [
      "PRD — Build Your Life in Himachal (V1)",
      "1. Summary",
      "2. Problem",
      "3. Target user",
      "Primary user",
      "Early users"
    ]
  },
  {
    "id": "town-overview",
    "domainKind": "town_fit",
    "subIntent": "single_town",
    "focusTopics": [
      "town-fit"
    ],
    "sourceKind": "mixed",
    "sourceLabel": "Town profiles and editorial guides",
    "livePathname": null,
    "comparisonCapable": false,
    "singleTownCapable": true,
    "followUpCapable": true,
    "requiredKeywords": [
      "about",
      "like"
    ],
    "preferredKeywords": [
      "town",
      "tell me about",
      "what is",
      "how is"
    ],
    "questionPatterns": [
      "tell me about",
      "what is it like",
      "what is",
      "how is",
      "what about"
    ],
    "samplePrompts": [
      "tell me about Shimla",
      "tell me about Naggar",
      "tell me about Bir",
      "what is Shimla like",
      "what is Naggar like",
      "what is Bir like",
      "how is Shimla as a base",
      "how is Naggar as a base",
      "how is Bir as a base"
    ],
    "strictFallback": false,
    "evidenceHeadings": [
      "1. Summary",
      "6.1 Town profiles",
      "6.3 Compare towns",
      "4. Town directory",
      "5. Town detail page",
      "6. Compare towns"
    ]
  },
  {
    "id": "town-quiet-fit",
    "domainKind": "comparison",
    "subIntent": "ranking",
    "focusTopics": [
      "town-fit",
      "quiet"
    ],
    "sourceKind": "mixed",
    "sourceLabel": "Quiet vs social town guidance",
    "livePathname": null,
    "comparisonCapable": true,
    "singleTownCapable": true,
    "followUpCapable": true,
    "requiredKeywords": [
      "quiet",
      "quieter",
      "calm"
    ],
    "preferredKeywords": [
      "social",
      "noise",
      "crowds"
    ],
    "questionPatterns": [
      "quiet",
      "quieter",
      "calm",
      "social"
    ],
    "samplePrompts": [
      "is Shimla quiet enough for a longer stay",
      "is Naggar quiet enough for a longer stay",
      "is Bir quiet enough for a longer stay",
      "Bir or Dharamshala if i want quiet",
      "Palampur or Manali if i want quiet",
      "Naggar or Palampur if i want quiet",
      "which town is quieter, Bir or Dharamshala",
      "which town is quieter, Palampur or Manali",
      "which town is quieter, Naggar or Palampur"
    ],
    "strictFallback": false,
    "evidenceHeadings": [
      "PRD — Build Your Life in Himachal (V1)",
      "1. Summary",
      "2. Problem",
      "3. Target user",
      "Primary user",
      "Early users"
    ]
  },
  {
    "id": "town-ranking",
    "domainKind": "comparison",
    "subIntent": "ranking",
    "focusTopics": [
      "town-fit"
    ],
    "sourceKind": "mixed",
    "sourceLabel": "Town comparisons and shortlist guides",
    "livePathname": null,
    "comparisonCapable": true,
    "singleTownCapable": false,
    "followUpCapable": true,
    "requiredKeywords": [
      "vs",
      "or",
      "against",
      "compare"
    ],
    "preferredKeywords": [
      "better",
      "rank",
      "stack up",
      "which town"
    ],
    "questionPatterns": [
      "vs",
      "or",
      "against",
      "compare",
      "better than",
      "rank it against",
      "stack up against"
    ],
    "samplePrompts": [
      "Bir vs Dharamshala",
      "Palampur vs Manali",
      "Naggar vs Palampur",
      "Bir or Dharamshala",
      "Palampur or Manali",
      "Naggar or Palampur",
      "tell me about Bir. how would you rank it against Dharamshala?",
      "tell me about Palampur. how would you rank it against Manali?",
      "tell me about Naggar. how would you rank it against Palampur?"
    ],
    "strictFallback": false,
    "evidenceHeadings": [
      "6.3 Compare towns",
      "6. Compare towns",
      "Flow A: direct fit-finding",
      "Compare page"
    ]
  },
  {
    "id": "town-remote-work",
    "domainKind": "comparison",
    "subIntent": "ranking",
    "focusTopics": [
      "town-fit",
      "remote-work"
    ],
    "sourceKind": "mixed",
    "sourceLabel": "Remote-work town guidance",
    "livePathname": null,
    "comparisonCapable": true,
    "singleTownCapable": true,
    "followUpCapable": true,
    "requiredKeywords": [
      "remote work",
      "work remotely",
      "internet"
    ],
    "preferredKeywords": [
      "wifi",
      "coworking",
      "workday"
    ],
    "questionPatterns": [
      "remote work",
      "work remotely",
      "coworking",
      "internet"
    ],
    "samplePrompts": [
      "is Shimla good for remote work",
      "is Naggar good for remote work",
      "is Bir good for remote work",
      "Bir or Dharamshala for remote work",
      "Palampur or Manali for remote work",
      "Naggar or Palampur for remote work",
      "which is better for remote work, Bir or Dharamshala",
      "which is better for remote work, Palampur or Manali",
      "which is better for remote work, Naggar or Palampur"
    ],
    "strictFallback": false,
    "evidenceHeadings": [
      "Demographic, Infrastructure, and Socio-Economic Assessment of Himachal Pradesh Hubs: A Comparative Analysis for Relocation and Remote Work",
      "3. Co-Working Infrastructure and the Digital Nomad Economy",
      "4. Digital Infrastructure and Telecommunications Reliability"
    ]
  },
  {
    "id": "women-safety-healthcare",
    "domainKind": "women_safety",
    "subIntent": "healthcare",
    "focusTopics": [
      "safety"
    ],
    "sourceKind": "mixed",
    "sourceLabel": "Women's safety in Himachal",
    "livePathname": "/womens-safety",
    "comparisonCapable": true,
    "singleTownCapable": true,
    "followUpCapable": true,
    "requiredKeywords": [
      "healthcare",
      "hospital",
      "clinic",
      "gynec",
      "pregnant"
    ],
    "preferredKeywords": [
      "maternity",
      "gynae",
      "obgyn"
    ],
    "questionPatterns": [
      "healthcare for women",
      "gynec",
      "maternity",
      "hospital"
    ],
    "samplePrompts": [
      "women's healthcare in Shimla",
      "women's healthcare in Naggar",
      "women's healthcare in Bir",
      "is Shimla okay for women's healthcare access",
      "is Naggar okay for women's healthcare access",
      "is Bir okay for women's healthcare access",
      "Bir vs Dharamshala for women's healthcare",
      "Palampur vs Manali for women's healthcare",
      "Naggar vs Palampur for women's healthcare"
    ],
    "strictFallback": true,
    "evidenceHeadings": [
      "Gender, Space, and Autonomy: A Comprehensive Analysis of Women's Safety, Healthcare, and Livelihoods in Himachal Pradesh Towns",
      "Healthcare Infrastructure: Gynecological and Maternity Access"
    ]
  },
  {
    "id": "women-safety-town",
    "domainKind": "women_safety",
    "subIntent": "town_safety",
    "focusTopics": [
      "safety"
    ],
    "sourceKind": "mixed",
    "sourceLabel": "Women's safety in Himachal",
    "livePathname": "/womens-safety",
    "comparisonCapable": true,
    "singleTownCapable": true,
    "followUpCapable": true,
    "requiredKeywords": [
      "safe for women",
      "women",
      "woman",
      "female",
      "safety"
    ],
    "preferredKeywords": [
      "solo woman",
      "harassment",
      "staring",
      "unsafe"
    ],
    "questionPatterns": [
      "safe for women",
      "safety in",
      "women in",
      "solo woman"
    ],
    "samplePrompts": [
      "is Shimla safe for women",
      "is Naggar safe for women",
      "is Bir safe for women",
      "tell me about safety in Shimla",
      "tell me about safety in Naggar",
      "tell me about safety in Bir",
      "Bir vs Dharamshala for women",
      "Palampur vs Manali for women",
      "Naggar vs Palampur for women"
    ],
    "strictFallback": true,
    "evidenceHeadings": [
      "Gender, Space, and Autonomy: A Comprehensive Analysis of Women's Safety, Healthcare, and Livelihoods in Himachal Pradesh Towns",
      "District-Wise Crime Against Women (2022–2024)",
      "Navigating the Terrain: Perception of Safety and Harassment Patterns",
      "Residential Autonomy: Women's Hostels, PGs, and Co-living Infrastructure",
      "Women's Hostels and Student PGs",
      "Women-Led Ecosystems: Enterprises, Cafés, and Communities"
    ]
  }
] satisfies AssistantAnticipationEntry[];

export const assistantAnticipationPromptBank = {
  "comparison": [
    {
      "prompt": "Bir vs Dharamshala",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null
    },
    {
      "prompt": "Palampur vs Manali",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null
    },
    {
      "prompt": "Naggar vs Palampur",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null
    },
    {
      "prompt": "Bir or Dharamshala for remote work",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null
    },
    {
      "prompt": "Palampur or Manali for remote work",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null
    },
    {
      "prompt": "Naggar or Palampur for remote work",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null
    },
    {
      "prompt": "Bir vs Dharamshala for families",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null
    },
    {
      "prompt": "Palampur vs Manali for families",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null
    },
    {
      "prompt": "Naggar vs Palampur for families",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null
    },
    {
      "prompt": "Bir or Dharamshala if i want quiet",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null
    },
    {
      "prompt": "Palampur or Manali if i want quiet",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null
    },
    {
      "prompt": "Naggar or Palampur if i want quiet",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null
    },
    {
      "prompt": "Bir or Dharamshala for a longer stay",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null
    },
    {
      "prompt": "Palampur or Manali for a longer stay",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null
    },
    {
      "prompt": "Naggar or Palampur for a longer stay",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null
    },
    {
      "prompt": "Bir vs Dharamshala for water",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "food_water",
      "answerSourcePathname": "/food"
    },
    {
      "prompt": "Palampur vs Manali for water",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "food_water",
      "answerSourcePathname": "/food"
    },
    {
      "prompt": "Naggar vs Palampur for water",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "food_water",
      "answerSourcePathname": "/food"
    },
    {
      "prompt": "Bir vs Dharamshala for delivery",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "food_water",
      "answerSourcePathname": "/food"
    },
    {
      "prompt": "Palampur vs Manali for delivery",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "food_water",
      "answerSourcePathname": "/food"
    },
    {
      "prompt": "Naggar vs Palampur for delivery",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "food_water",
      "answerSourcePathname": "/food"
    },
    {
      "prompt": "Bir vs Dharamshala for groceries",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "food_water",
      "answerSourcePathname": "/food"
    },
    {
      "prompt": "Palampur vs Manali for groceries",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "food_water",
      "answerSourcePathname": "/food"
    },
    {
      "prompt": "Naggar vs Palampur for groceries",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "food_water",
      "answerSourcePathname": "/food"
    },
    {
      "prompt": "Bir vs Dharamshala for banking setup",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "banking",
      "answerSourcePathname": "/banking"
    },
    {
      "prompt": "Palampur vs Manali for banking setup",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "banking",
      "answerSourcePathname": "/banking"
    },
    {
      "prompt": "Naggar vs Palampur for banking setup",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "banking",
      "answerSourcePathname": "/banking"
    },
    {
      "prompt": "Bir vs Dharamshala for bank access",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "banking",
      "answerSourcePathname": "/banking"
    },
    {
      "prompt": "Palampur vs Manali for bank access",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "banking",
      "answerSourcePathname": "/banking"
    },
    {
      "prompt": "Naggar vs Palampur for bank access",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "banking",
      "answerSourcePathname": "/banking"
    },
    {
      "prompt": "Bir vs Dharamshala for women",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "women_safety",
      "answerSourcePathname": "/womens-safety"
    },
    {
      "prompt": "Palampur vs Manali for women",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "women_safety",
      "answerSourcePathname": "/womens-safety"
    },
    {
      "prompt": "Naggar vs Palampur for women",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "women_safety",
      "answerSourcePathname": "/womens-safety"
    },
    {
      "prompt": "Bir vs Dharamshala for women's healthcare",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "women_safety",
      "answerSourcePathname": "/womens-safety"
    },
    {
      "prompt": "Palampur vs Manali for women's healthcare",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "women_safety",
      "answerSourcePathname": "/womens-safety"
    },
    {
      "prompt": "Naggar vs Palampur for women's healthcare",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "women_safety",
      "answerSourcePathname": "/womens-safety"
    },
    {
      "prompt": "Bir vs Dharamshala for community",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "community",
      "answerSourcePathname": "/community"
    },
    {
      "prompt": "Palampur vs Manali for community",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "community",
      "answerSourcePathname": "/community"
    },
    {
      "prompt": "Naggar vs Palampur for community",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "community",
      "answerSourcePathname": "/community"
    },
    {
      "prompt": "Bir vs Dharamshala for coworking community",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "community",
      "answerSourcePathname": "/community"
    },
    {
      "prompt": "Palampur vs Manali for coworking community",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "community",
      "answerSourcePathname": "/community"
    },
    {
      "prompt": "Naggar vs Palampur for coworking community",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "community",
      "answerSourcePathname": "/community"
    },
    {
      "prompt": "Bir vs Dharamshala for power cuts",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "power",
      "answerSourcePathname": "/power-backup"
    },
    {
      "prompt": "Palampur vs Manali for power cuts",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "power",
      "answerSourcePathname": "/power-backup"
    },
    {
      "prompt": "Naggar vs Palampur for power cuts",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "power",
      "answerSourcePathname": "/power-backup"
    },
    {
      "prompt": "Bir vs Dharamshala for backup needs",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "power",
      "answerSourcePathname": "/power-backup"
    },
    {
      "prompt": "Palampur vs Manali for backup needs",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "power",
      "answerSourcePathname": "/power-backup"
    },
    {
      "prompt": "Naggar vs Palampur for backup needs",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "power",
      "answerSourcePathname": "/power-backup"
    },
    {
      "prompt": "Bir vs Dharamshala for winter heating",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "power",
      "answerSourcePathname": "/power-backup"
    },
    {
      "prompt": "Palampur vs Manali for winter heating",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "power",
      "answerSourcePathname": "/power-backup"
    },
    {
      "prompt": "Naggar vs Palampur for winter heating",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "power",
      "answerSourcePathname": "/power-backup"
    },
    {
      "prompt": "Bir vs Dharamshala for settling in",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "moving",
      "answerSourcePathname": "/first-30-days"
    },
    {
      "prompt": "Palampur vs Manali for settling in",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "moving",
      "answerSourcePathname": "/first-30-days"
    },
    {
      "prompt": "Naggar vs Palampur for settling in",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "moving",
      "answerSourcePathname": "/first-30-days"
    },
    {
      "prompt": "Bir vs Dharamshala for settling logistics",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "moving",
      "answerSourcePathname": "/first-30-days"
    },
    {
      "prompt": "Palampur vs Manali for settling logistics",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "moving",
      "answerSourcePathname": "/first-30-days"
    },
    {
      "prompt": "Naggar vs Palampur for settling logistics",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "moving",
      "answerSourcePathname": "/first-30-days"
    }
  ],
  "domain": [
    {
      "prompt": "tell me about water situation in Shimla",
      "expectedPrimaryIntentKind": "food_water",
      "expectedFocusDomainKind": "food_water",
      "answerSourcePathname": "/food",
      "expectedSubIntent": "water"
    },
    {
      "prompt": "tell me about water situation in Naggar",
      "expectedPrimaryIntentKind": "food_water",
      "expectedFocusDomainKind": "food_water",
      "answerSourcePathname": "/food",
      "expectedSubIntent": "water"
    },
    {
      "prompt": "tell me about water situation in Bir",
      "expectedPrimaryIntentKind": "food_water",
      "expectedFocusDomainKind": "food_water",
      "answerSourcePathname": "/food",
      "expectedSubIntent": "water"
    },
    {
      "prompt": "does swiggy deliver in Shimla",
      "expectedPrimaryIntentKind": "food_water",
      "expectedFocusDomainKind": "food_water",
      "answerSourcePathname": "/food",
      "expectedSubIntent": "delivery"
    },
    {
      "prompt": "does swiggy deliver in Naggar",
      "expectedPrimaryIntentKind": "food_water",
      "expectedFocusDomainKind": "food_water",
      "answerSourcePathname": "/food",
      "expectedSubIntent": "delivery"
    },
    {
      "prompt": "does swiggy deliver in Bir",
      "expectedPrimaryIntentKind": "food_water",
      "expectedFocusDomainKind": "food_water",
      "answerSourcePathname": "/food",
      "expectedSubIntent": "delivery"
    },
    {
      "prompt": "tell me about groceries in Shimla",
      "expectedPrimaryIntentKind": "food_water",
      "expectedFocusDomainKind": "food_water",
      "answerSourcePathname": "/food",
      "expectedSubIntent": "groceries"
    },
    {
      "prompt": "tell me about groceries in Naggar",
      "expectedPrimaryIntentKind": "food_water",
      "expectedFocusDomainKind": "food_water",
      "answerSourcePathname": "/food",
      "expectedSubIntent": "groceries"
    },
    {
      "prompt": "tell me about groceries in Bir",
      "expectedPrimaryIntentKind": "food_water",
      "expectedFocusDomainKind": "food_water",
      "answerSourcePathname": "/food",
      "expectedSubIntent": "groceries"
    },
    {
      "prompt": "can i open a bank account in Shimla",
      "expectedPrimaryIntentKind": "banking",
      "expectedFocusDomainKind": "banking",
      "answerSourcePathname": "/banking",
      "expectedSubIntent": "account_opening"
    },
    {
      "prompt": "can i open a bank account in Naggar",
      "expectedPrimaryIntentKind": "banking",
      "expectedFocusDomainKind": "banking",
      "answerSourcePathname": "/banking",
      "expectedSubIntent": "account_opening"
    },
    {
      "prompt": "can i open a bank account in Bir",
      "expectedPrimaryIntentKind": "banking",
      "expectedFocusDomainKind": "banking",
      "answerSourcePathname": "/banking",
      "expectedSubIntent": "account_opening"
    },
    {
      "prompt": "upi in Shimla",
      "expectedPrimaryIntentKind": "banking",
      "expectedFocusDomainKind": "banking",
      "answerSourcePathname": "/banking",
      "expectedSubIntent": "cash_upi"
    },
    {
      "prompt": "upi in Naggar",
      "expectedPrimaryIntentKind": "banking",
      "expectedFocusDomainKind": "banking",
      "answerSourcePathname": "/banking",
      "expectedSubIntent": "cash_upi"
    },
    {
      "prompt": "upi in Bir",
      "expectedPrimaryIntentKind": "banking",
      "expectedFocusDomainKind": "banking",
      "answerSourcePathname": "/banking",
      "expectedSubIntent": "cash_upi"
    },
    {
      "prompt": "forex in Shimla",
      "expectedPrimaryIntentKind": "banking",
      "expectedFocusDomainKind": "banking",
      "answerSourcePathname": "/banking",
      "expectedSubIntent": "forex"
    },
    {
      "prompt": "forex in Naggar",
      "expectedPrimaryIntentKind": "banking",
      "expectedFocusDomainKind": "banking",
      "answerSourcePathname": "/banking",
      "expectedSubIntent": "forex"
    },
    {
      "prompt": "forex in Bir",
      "expectedPrimaryIntentKind": "banking",
      "expectedFocusDomainKind": "banking",
      "answerSourcePathname": "/banking",
      "expectedSubIntent": "forex"
    },
    {
      "prompt": "is Shimla safe for women",
      "expectedPrimaryIntentKind": "women_safety",
      "expectedFocusDomainKind": "women_safety",
      "answerSourcePathname": "/womens-safety",
      "expectedSubIntent": "town_safety"
    },
    {
      "prompt": "is Naggar safe for women",
      "expectedPrimaryIntentKind": "women_safety",
      "expectedFocusDomainKind": "women_safety",
      "answerSourcePathname": "/womens-safety",
      "expectedSubIntent": "town_safety"
    },
    {
      "prompt": "is Bir safe for women",
      "expectedPrimaryIntentKind": "women_safety",
      "expectedFocusDomainKind": "women_safety",
      "answerSourcePathname": "/womens-safety",
      "expectedSubIntent": "town_safety"
    },
    {
      "prompt": "women's healthcare in Shimla",
      "expectedPrimaryIntentKind": "women_safety",
      "expectedFocusDomainKind": "women_safety",
      "answerSourcePathname": "/womens-safety",
      "expectedSubIntent": "healthcare"
    },
    {
      "prompt": "women's healthcare in Naggar",
      "expectedPrimaryIntentKind": "women_safety",
      "expectedFocusDomainKind": "women_safety",
      "answerSourcePathname": "/womens-safety",
      "expectedSubIntent": "healthcare"
    },
    {
      "prompt": "women's healthcare in Bir",
      "expectedPrimaryIntentKind": "women_safety",
      "expectedFocusDomainKind": "women_safety",
      "answerSourcePathname": "/womens-safety",
      "expectedSubIntent": "healthcare"
    },
    {
      "prompt": "community in Shimla",
      "expectedPrimaryIntentKind": "community",
      "expectedFocusDomainKind": "community",
      "answerSourcePathname": "/community",
      "expectedSubIntent": "social"
    },
    {
      "prompt": "community in Naggar",
      "expectedPrimaryIntentKind": "community",
      "expectedFocusDomainKind": "community",
      "answerSourcePathname": "/community",
      "expectedSubIntent": "social"
    },
    {
      "prompt": "community in Bir",
      "expectedPrimaryIntentKind": "community",
      "expectedFocusDomainKind": "community",
      "answerSourcePathname": "/community",
      "expectedSubIntent": "social"
    },
    {
      "prompt": "coworking in Shimla",
      "expectedPrimaryIntentKind": "community",
      "expectedFocusDomainKind": "community",
      "answerSourcePathname": "/community",
      "expectedSubIntent": "coworking"
    },
    {
      "prompt": "coworking in Naggar",
      "expectedPrimaryIntentKind": "community",
      "expectedFocusDomainKind": "community",
      "answerSourcePathname": "/community",
      "expectedSubIntent": "coworking"
    },
    {
      "prompt": "coworking in Bir",
      "expectedPrimaryIntentKind": "community",
      "expectedFocusDomainKind": "community",
      "answerSourcePathname": "/community",
      "expectedSubIntent": "coworking"
    },
    {
      "prompt": "mental health support in Shimla",
      "expectedPrimaryIntentKind": "community",
      "expectedFocusDomainKind": "community",
      "answerSourcePathname": "/community",
      "expectedSubIntent": "mental_health"
    },
    {
      "prompt": "mental health support in Naggar",
      "expectedPrimaryIntentKind": "community",
      "expectedFocusDomainKind": "community",
      "answerSourcePathname": "/community",
      "expectedSubIntent": "mental_health"
    },
    {
      "prompt": "mental health support in Bir",
      "expectedPrimaryIntentKind": "community",
      "expectedFocusDomainKind": "community",
      "answerSourcePathname": "/community",
      "expectedSubIntent": "mental_health"
    },
    {
      "prompt": "can i buy in Shimla if i am from mumbai",
      "expectedPrimaryIntentKind": "property",
      "expectedFocusDomainKind": "property",
      "answerSourcePathname": "/property-rules",
      "expectedSubIntent": "eligibility"
    },
    {
      "prompt": "can i buy in Naggar if i am from mumbai",
      "expectedPrimaryIntentKind": "property",
      "expectedFocusDomainKind": "property",
      "answerSourcePathname": "/property-rules",
      "expectedSubIntent": "eligibility"
    },
    {
      "prompt": "can i buy in Bir if i am from mumbai",
      "expectedPrimaryIntentKind": "property",
      "expectedFocusDomainKind": "property",
      "answerSourcePathname": "/property-rules",
      "expectedSubIntent": "eligibility"
    },
    {
      "prompt": "is a registered lease safer in Shimla",
      "expectedPrimaryIntentKind": "property",
      "expectedFocusDomainKind": "property",
      "answerSourcePathname": "/property-rules",
      "expectedSubIntent": "lease"
    },
    {
      "prompt": "is a registered lease safer in Naggar",
      "expectedPrimaryIntentKind": "property",
      "expectedFocusDomainKind": "property",
      "answerSourcePathname": "/property-rules",
      "expectedSubIntent": "lease"
    },
    {
      "prompt": "is a registered lease safer in Bir",
      "expectedPrimaryIntentKind": "property",
      "expectedFocusDomainKind": "property",
      "answerSourcePathname": "/property-rules",
      "expectedSubIntent": "lease"
    },
    {
      "prompt": "power cuts in Shimla",
      "expectedPrimaryIntentKind": "power",
      "expectedFocusDomainKind": "power",
      "answerSourcePathname": "/power-backup",
      "expectedSubIntent": "outages"
    },
    {
      "prompt": "power cuts in Naggar",
      "expectedPrimaryIntentKind": "power",
      "expectedFocusDomainKind": "power",
      "answerSourcePathname": "/power-backup",
      "expectedSubIntent": "outages"
    },
    {
      "prompt": "power cuts in Bir",
      "expectedPrimaryIntentKind": "power",
      "expectedFocusDomainKind": "power",
      "answerSourcePathname": "/power-backup",
      "expectedSubIntent": "outages"
    },
    {
      "prompt": "do i need inverter in Shimla",
      "expectedPrimaryIntentKind": "power",
      "expectedFocusDomainKind": "power",
      "answerSourcePathname": "/power-backup",
      "expectedSubIntent": "backup"
    },
    {
      "prompt": "do i need inverter in Naggar",
      "expectedPrimaryIntentKind": "power",
      "expectedFocusDomainKind": "power",
      "answerSourcePathname": "/power-backup",
      "expectedSubIntent": "backup"
    },
    {
      "prompt": "do i need inverter in Bir",
      "expectedPrimaryIntentKind": "power",
      "expectedFocusDomainKind": "power",
      "answerSourcePathname": "/power-backup",
      "expectedSubIntent": "backup"
    },
    {
      "prompt": "heating in Shimla",
      "expectedPrimaryIntentKind": "power",
      "expectedFocusDomainKind": "power",
      "answerSourcePathname": "/power-backup",
      "expectedSubIntent": "heating"
    },
    {
      "prompt": "heating in Naggar",
      "expectedPrimaryIntentKind": "power",
      "expectedFocusDomainKind": "power",
      "answerSourcePathname": "/power-backup",
      "expectedSubIntent": "heating"
    },
    {
      "prompt": "heating in Bir",
      "expectedPrimaryIntentKind": "power",
      "expectedFocusDomainKind": "power",
      "answerSourcePathname": "/power-backup",
      "expectedSubIntent": "heating"
    },
    {
      "prompt": "first month in Shimla",
      "expectedPrimaryIntentKind": "moving",
      "expectedFocusDomainKind": "moving",
      "answerSourcePathname": "/first-30-days",
      "expectedSubIntent": "settling"
    },
    {
      "prompt": "first month in Naggar",
      "expectedPrimaryIntentKind": "moving",
      "expectedFocusDomainKind": "moving",
      "answerSourcePathname": "/first-30-days",
      "expectedSubIntent": "settling"
    },
    {
      "prompt": "first month in Bir",
      "expectedPrimaryIntentKind": "moving",
      "expectedFocusDomainKind": "moving",
      "answerSourcePathname": "/first-30-days",
      "expectedSubIntent": "settling"
    },
    {
      "prompt": "utilities in Shimla",
      "expectedPrimaryIntentKind": "moving",
      "expectedFocusDomainKind": "moving",
      "answerSourcePathname": "/first-30-days",
      "expectedSubIntent": "utilities"
    },
    {
      "prompt": "utilities in Naggar",
      "expectedPrimaryIntentKind": "moving",
      "expectedFocusDomainKind": "moving",
      "answerSourcePathname": "/first-30-days",
      "expectedSubIntent": "utilities"
    },
    {
      "prompt": "utilities in Bir",
      "expectedPrimaryIntentKind": "moving",
      "expectedFocusDomainKind": "moving",
      "answerSourcePathname": "/first-30-days",
      "expectedSubIntent": "utilities"
    }
  ],
  "singleTown": [
    {
      "prompt": "tell me about Shimla",
      "expectedPrimaryIntentKind": "town_fit",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null,
      "expectedSubIntent": "single_town"
    },
    {
      "prompt": "tell me about Naggar",
      "expectedPrimaryIntentKind": "town_fit",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null,
      "expectedSubIntent": "single_town"
    },
    {
      "prompt": "tell me about Bir",
      "expectedPrimaryIntentKind": "town_fit",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null,
      "expectedSubIntent": "single_town"
    },
    {
      "prompt": "is Shimla good for remote work",
      "expectedPrimaryIntentKind": "town_fit",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null,
      "expectedSubIntent": "ranking"
    },
    {
      "prompt": "is Naggar good for remote work",
      "expectedPrimaryIntentKind": "town_fit",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null,
      "expectedSubIntent": "ranking"
    },
    {
      "prompt": "is Bir good for remote work",
      "expectedPrimaryIntentKind": "town_fit",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null,
      "expectedSubIntent": "ranking"
    },
    {
      "prompt": "is Shimla good for families",
      "expectedPrimaryIntentKind": "town_fit",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null,
      "expectedSubIntent": "ranking"
    },
    {
      "prompt": "is Naggar good for families",
      "expectedPrimaryIntentKind": "town_fit",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null,
      "expectedSubIntent": "ranking"
    },
    {
      "prompt": "is Bir good for families",
      "expectedPrimaryIntentKind": "town_fit",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null,
      "expectedSubIntent": "ranking"
    },
    {
      "prompt": "is Shimla quiet enough for a longer stay",
      "expectedPrimaryIntentKind": "town_fit",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null,
      "expectedSubIntent": "ranking"
    },
    {
      "prompt": "is Naggar quiet enough for a longer stay",
      "expectedPrimaryIntentKind": "town_fit",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null,
      "expectedSubIntent": "ranking"
    },
    {
      "prompt": "is Bir quiet enough for a longer stay",
      "expectedPrimaryIntentKind": "town_fit",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null,
      "expectedSubIntent": "ranking"
    },
    {
      "prompt": "is Shimla good for a long stay",
      "expectedPrimaryIntentKind": "town_fit",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null,
      "expectedSubIntent": "ranking"
    },
    {
      "prompt": "is Naggar good for a long stay",
      "expectedPrimaryIntentKind": "town_fit",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null,
      "expectedSubIntent": "ranking"
    },
    {
      "prompt": "is Bir good for a long stay",
      "expectedPrimaryIntentKind": "town_fit",
      "expectedFocusDomainKind": "town_fit",
      "answerSourcePathname": null,
      "expectedSubIntent": "ranking"
    }
  ],
  "followUp": [
    {
      "seedPrompt": "Bir or Dharamshala for a longer stay?",
      "prompt": "and for families?",
      "expectedPrimaryIntentKind": "comparison",
      "expectedFocusDomainKind": "town_fit"
    },
    {
      "seedPrompt": "tell me about naggar",
      "prompt": "what about palampur instead?",
      "expectedPrimaryIntentKind": "town_fit",
      "expectedFocusDomainKind": "town_fit"
    },
    {
      "seedPrompt": "Can outsiders buy property in Himachal?",
      "prompt": "what about lease instead?",
      "expectedPrimaryIntentKind": "property",
      "expectedFocusDomainKind": "property"
    },
    {
      "seedPrompt": "tell me about water situation in Naggar",
      "prompt": "what about delivery?",
      "expectedPrimaryIntentKind": "food_water",
      "expectedFocusDomainKind": "food_water"
    }
  ]
} satisfies {
  comparison: AssistantAnticipationPromptCase[];
  domain: AssistantAnticipationPromptCase[];
  singleTown: AssistantAnticipationPromptCase[];
  followUp: AssistantAnticipationFollowUpCase[];
};

export const assistantAnticipationSourceDigest = {
  "combined": "34a23d3a2f6ad8c05a6e18cc7cd0243fb0ff93925bb16539c6baea77f4f77231",
  "sources": {
    "docs/product/Himachal Pradesh Financial Accessibility Guide.md": "d88f56858d9dad6c4169760b6a7ce7290ad55f56b695575e00ecf0372ae82172",
    "docs/product/Himachal Pradesh Food Scene Research.md": "12fec692a4c9c1718b86bbcb989aa57cd1963c9b19e7cb45a7bdd1ebed1bedcb",
    "docs/product/Himachal Pradesh Town Information Compilation.md": "af7b5001487ac2a60e13137c0e54f485967d9198502e8a7ebb4ec0ecb3b5ac5f",
    "docs/product/Himachal Women's Safety and Autonomy.md": "8bebb9233bf99520f7267b5c9ba4db00b465d4eb96974b5536a622ff6759af80",
    "docs/product/PRD.md": "626198e2d6ab1a9f805af4801d40384826243fdfe95181a25f8119440a53a584",
    "docs/product/deep-research-report (4).md": "a9296a412be1fd1b30166074cb0ec0da12509d60802fb5ac61eb3433b5f55f5c",
    "docs/product/sitemap.md": "2630f2b62138a4f7a164a1d0bdd1afe6c2a8e3f57913c191360baa164529faa4",
    "src/lib/banking.ts": "d1bf773fa7ffbeb139b4b73b9bf65aa86088588c9b44179cf354d23bada5647e",
    "src/lib/community.ts": "f226572ade13f57c1449443fbaa9c72cd6f48cbcba94108d48f26b4f109ed290",
    "src/lib/food.ts": "8026c384ed2a627dfcfdd0aa13be981a36448449012737d825620f40ecd81b0d",
    "src/lib/guides.ts": "3a04faa57025481b954d256a603ea25abbb6845745adb117a0e6e50da43eea0a",
    "src/lib/how-it-works.ts": "2302e99174d4340a7db202c92a1be0fdfc1beaf5890b21f789d7aee5f95f53ea",
    "src/lib/playbook.ts": "a84d1343e686f73c22e90a26fa6812219993a92ccaef7b9713b89396d9064c34",
    "src/lib/power-infra.ts": "71f90f7cd4f7343860e35b226540683f7d62ef410ffd15477d1ce5e1142b4442",
    "src/lib/property-rules.ts": "edeef472c2e0c5448effce1867c451a7de6dd772a7e99efb09554e2a609e5796",
    "src/lib/towns.ts": "149c5b6c08885b86592de6b8910d2f82f76d7bbb97bd3195561aff3f348fe28b",
    "src/lib/womens-safety.ts": "514005e97361bfabfa564a70a8f6d9f0203f0606d88f0b93d3b8250db5b38759"
  }
} as const;
