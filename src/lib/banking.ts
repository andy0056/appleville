/* ------------------------------------------------------------------ */
/*  Banking & financial infrastructure data for eight HP towns         */
/* ------------------------------------------------------------------ */

export type BankPresence = {
  bank: string;
  locations: string;
  specialty: string;
};

export type BankingTown = {
  slug: string;
  name: string;
  bankingLevel: "full" | "good" | "limited" | "minimal";
  headline: string;
  banks: BankPresence[];
  note: string;
};

export type MerchantTier = {
  tier: string;
  label: string;
  methods: string;
  detail: string;
};

export type NriAccountType = {
  type: string;
  eligibility: string;
  docs: string;
};

export type ForexTown = {
  town: string;
  agents: string;
  services: string;
};

export type NetworkProvider = {
  name: string;
  strength: string;
  impact: string;
};

/* ---------- Key stats ---------- */

export const keyStats = [
  { label: "UPI adoption", value: "92.8%", detail: "Up from 12.8% pre-2019" },
  { label: "Cash-only behavior", value: "12.2%", detail: "Down from 92.8%" },
  { label: "Hybrid users", value: "54.5%", detail: "Use both cash + digital" },
  { label: "ATM/debit usage", value: "93.3%", detail: "As of 2025" },
  { label: "Insurance coverage", value: "85.6%", detail: "Up from 7.8%" },
];

/* ---------- Town banking profiles ---------- */

export const bankingTowns: BankingTown[] = [
  {
    slug: "shimla",
    name: "Shimla",
    bankingLevel: "full",
    headline: "Highest concentration of financial institutions in the state.",
    banks: [
      { bank: "SBI", locations: "Mall Road, SDA Complex (Kasumpti), New Shimla, Bharari", specialty: "Government transactions, lead bank, extensive ATM network" },
      { bank: "PNB", locations: "Lower Bazar, The Mall, Nigam Vihar, Sanjauli", specialty: "Local trading community, strong small business ties" },
      { bank: "HDFC", locations: "Scandal Point, Chotta Shimla, New Shimla Sector-2", specialty: "HNI services, digital-first retail banking" },
      { bank: "ICICI", locations: "Mall Road (Near Lift), Kasumpti, Rohru", specialty: "Tourist-oriented, cardless cash withdrawal ATMs" },
      { bank: "Axis", locations: "Kasumpti (Durga Cottage Complex)", specialty: "Corporate and institutional banking" },
    ],
    note: "Also has Yes Bank, IndusInd Bank, HP State Co-Op Bank. Even during peak seasons, financial liquidity is maintained.",
  },
  {
    slug: "solan",
    name: "Solan",
    bankingLevel: "full",
    headline: "Industrial + educational hub — handles both commercial and high-volume student transactions.",
    banks: [
      { bank: "SBI", locations: "The Mall, Solan 173212", specialty: "Public sector anchor" },
      { bank: "PNB", locations: "The Mall Road, Solan", specialty: "Public sector; strong local presence" },
      { bank: "HDFC", locations: "The Mall Road, Solan", specialty: "Private; digital banking" },
      { bank: "ICICI", locations: "Kapoor Complex, The Mall", specialty: "Private; customer services" },
      { bank: "Axis", locations: "Time & Tune, The Mall", specialty: "Private; institutional banking" },
    ],
    note: "Also has UCO Bank, Union Bank, Bhagat Urban Co-Op Bank. Wider bank variety than most counterparts due to industrial nature.",
  },
  {
    slug: "dharamshala",
    name: "Dharamshala",
    bankingLevel: "good",
    headline: "Banking bifurcated: administrative zone (lower) and tourist zone (upper McLeodganj).",
    banks: [
      { bank: "SBI", locations: "Civil Station, Main Market", specialty: "High-density ATMs in Bhagsu Nag and McLeodganj" },
      { bank: "PNB", locations: "Kotwali Bazaar", specialty: "ATMs in Naddi and Bhagsu areas" },
      { bank: "HDFC", locations: "Kangra Dharamshala Road", specialty: "Kareri Lodge Complex (Temple Road, McLeodganj)" },
      { bank: "ICICI", locations: "Near Municipality Office, Sudher", specialty: "Mona Plaza, Tipa Road (McLeodganj) — critical tourist node" },
      { bank: "Axis", locations: "Civil Station", specialty: "ATMs near Main Bus Stand" },
    ],
    note: "ICICI McLeodganj branch: specific hours favoring morning transactions. McLeodganj is more about ATMs and forex than branch visits.",
  },
  {
    slug: "mcleodganj",
    name: "McLeodganj",
    bankingLevel: "good",
    headline: "High ATM density and forex focus. Relies on Dharamshala branches for full services.",
    banks: [
      { bank: "ICICI", locations: "Mona Plaza, Tipa Road", specialty: "Tourist-oriented" },
      { bank: "HDFC", locations: "Kareri Lodge Complex, Temple Road", specialty: "Retail banking" },
      { bank: "SBI", locations: "ATMs in Bhagsu Nag and main market", specialty: "Government banking" },
    ],
    note: "Highest density of forex agents in HP: Paul Merchants, Thomas Cook, Global Money Exchangers, Sai Krishna Tours.",
  },
  {
    slug: "palampur",
    name: "Palampur",
    bankingLevel: "good",
    headline: "Stable, mature banking. Regional hubs in Rajpur / Main Bazaar.",
    banks: [
      { bank: "SBI", locations: "Palampur Main, Paprola (Kranti Chowk)", specialty: "ADB Palampur (Dist Kangra)" },
      { bank: "PNB", locations: "Nagrota Bagwan, Rajpur, Old Bus Stand", specialty: "Multiple rural outposts" },
      { bank: "HDFC", locations: "Rajpur (Kangra Dharamshala Road)", specialty: "Near Govt Polytechnic" },
      { bank: "ICICI", locations: "Sudesh Niley (NH-22, Rajpur)", specialty: "Residential wealth management" },
      { bank: "Axis", locations: "Baiznath Road (Rajpur)", specialty: "Serves Palampur-Baijnath corridor" },
    ],
    note: "Tea gardens and upscale residential properties drive a stable banking environment.",
  },
  {
    slug: "manali",
    name: "Manali",
    bankingLevel: "good",
    headline: "Most stressed banking infra in HP due to extreme seasonal variation. Mall Road is the axis.",
    banks: [
      { bank: "SBI", locations: "Mall Road, Clubhouse Road", specialty: "Primary government banking" },
      { bank: "PNB", locations: "Siyal (Below Sawan Residency), Aleo", specialty: "Patlikuhl outpost for Naggar corridor" },
      { bank: "HDFC", locations: "Mall Road (Himalayan Shopping Arcade)", specialty: "Private; Prini near Naggar panchayat" },
      { bank: "ICICI", locations: "Dhalpur (Kullu) is closest major node", specialty: "ATM support on Mall Road" },
      { bank: "Axis", locations: "Dhalpur (Gandhi Nagar, Kullu)", specialty: "District-wide HQ; ATMs in Manali" },
    ],
    note: "Peak tourist evenings can cause UPI failures due to network congestion. Carry cash backup.",
  },
  {
    slug: "naggar",
    name: "Naggar",
    bankingLevel: "minimal",
    headline: "No Big Five branches within village limits. Depends on Patlikuhl (~5 km).",
    banks: [
      { bank: "SBI", locations: "Patlikuhl (Near Gamon Bridge)", specialty: "Closest SBI to Naggar" },
      { bank: "PNB", locations: "Patlikuhl (Fojjal via Dobhi)", specialty: "Closest PNB" },
      { bank: "HP Gramin Bank", locations: "Patlikuhl", specialty: "Local cooperative banking" },
    ],
    note: "ATMs are the primary access point. Plan cash withdrawals around Patlikuhl trips.",
  },
  {
    slug: "bir",
    name: "Bir",
    bankingLevel: "limited",
    headline: "Village economy transitioning to adventure tourism hub. ATMs only — no Big Five branches.",
    banks: [
      { bank: "SBI", locations: "ATMs only in Bir Colony", specialty: "Closest branch: Chobin Chowk, Baijnath (11 km)" },
      { bank: "PNB", locations: "ATMs and small outpost in Mandher", specialty: "Baijnath Main Bazaar is nearest full branch" },
      { bank: "Kangra Co-Op", locations: "Bir and Deol", specialty: "Most visible physical institution for local services" },
    ],
    note: "Paragliding pilots accept UPI, but POS machines often missing at landing sites due to poor cellular connectivity.",
  },
];

/* ---------- UPI & Merchant acceptance ---------- */

export const merchantTiers: MerchantTier[] = [
  {
    tier: "1",
    label: "Hotels & high-end retail",
    methods: "All methods: UPI, Visa, Mastercard, Amex, international cards",
    detail: "Full POS infrastructure. No payment issues.",
  },
  {
    tier: "2",
    label: "Restaurants & general retail",
    methods: "UPI preferred (0% MDR), POS machines for debit cards",
    detail: "Strongly prefer UPI to avoid processing fees. Credit cards accepted at mid-to-high tier.",
  },
  {
    tier: "3",
    label: "Local markets & vendors",
    methods: "UPI or cash only",
    detail: "No POS machines. Credit cards not accepted. Family micro-businesses stick to UPI/cash.",
  },
];

export const cashStillNeeded = [
  "HRTC state bus transport often requires exact change or physical cash",
  "Entry fees for heritage sites and remote trekking checkpoints",
  "Emergency reserves during winter snowfalls (power outages disrupt internet payments)",
  "Small village shops, local taxis, and street food in peripheral areas",
];

/* ---------- Non-resident banking ---------- */

export const domesticNonResidentDocs = {
  headline: "You don't need a permanent HP address to open an account.",
  detail: "Under RBI's Officially Valid Document (OVD) relaxation, an Aadhaar from another state is sufficient. A rent agreement strengthens the application.",
  docs: [
    { label: "Proof of Identity", items: "Aadhaar, PAN card, or Passport" },
    { label: "Proof of Address", items: "Aadhaar (any state) + self-declaration of local HP address" },
    { label: "Strengthening docs", items: "Registered rent agreement, utility bills" },
  ],
};

export const nriAccountTypes: NriAccountType[] = [
  {
    type: "NRE (Non-Resident External)",
    eligibility: "Foreign earnings remittance",
    docs: "Indian Passport, Visa/Work Permit, Overseas Address Proof",
  },
  {
    type: "NRO (Non-Resident Ordinary)",
    eligibility: "Managing local Indian income",
    docs: "Passport, Indian Visa (Student/Business/Tourist), PAN card",
  },
  {
    type: "Foreign National account",
    eligibility: "Non-Indian origin residents",
    docs: "Student Visa holders need NRO account for FRRO financial sustenance proof",
  },
];

/* ---------- Forex ---------- */

export const forexTowns: ForexTown[] = [
  { town: "McLeodganj", agents: "Paul Merchants, Thomas Cook, Global Money, Sai Krishna Tours", services: "Currency exchange, Western Union, MoneyGram" },
  { town: "Dharamshala", agents: "ICICI forex desk, Pratharyan Money Exchanger", services: "Authorized dealer, RTGS transfers" },
  { town: "Manali", agents: "Himalayan Trails, Ravi Tour, Paul Merchants", services: "High-volume tourist currency exchange" },
  { town: "Bir / Baijnath", agents: "Paul Merchants (Mandher)", services: "Limited; primarily Western Union payouts" },
];

export const digitalRemittance = {
  headline: "Digital platforms now beat physical forex offices on rates.",
  platforms: ["Wise", "Remitly", "HDFC RemitNow", "ICICI Money2India"],
  note: "Banks in HP are increasingly SWIFT-enabled for direct wire transfers into NRE/NRO accounts. NRI desks at SBI, HDFC, and ICICI in Shimla and Dharamshala.",
};

/* ---------- Network performance ---------- */

export const networkProviders: NetworkProvider[] = [
  { name: "Airtel", strength: "5G speed leader — avg 572 Mbps in hotspots, 90% population coverage", impact: "Best for low-latency UPI authentication and real-time confirmations." },
  { name: "Jio", strength: "Availability leader — 95% India coverage, standalone 5G", impact: "Widest reach in rural valleys (Naggar, upper Bir). Can congest during peak hours." },
  { name: "BSNL", strength: "Growing 4G/5G expansion, high FTTH reliability", impact: "Essential backup in remote areas where private signals are terrain-blocked." },
];

export const hybridRule = {
  headline: "The '10–15% cash' rule",
  detail: "Given occasional UPI failures during peak tourist evenings (network congestion, server issues), carrying 10–15% of liquid assets in physical cash is essential for resilience. 54.5% of HP residents maintain this hybrid behavior.",
};

/* ---------- Sources ---------- */

export const bankingSources = [
  { label: "HP Economic Survey 2024–25", url: "https://himachalservices.nic.in/economics/pdf/en-economic_survey_2024-25.pdf", description: "GSDP growth, financial inclusion trends" },
  { label: "HP Digital Literacy Report", url: "https://www.colgateinvestors.co.in/pdf/iar-cfdlp-report-2024-25.pdf", description: "UPI adoption, cash behavior, insurance coverage" },
  { label: "Airtel 5G in HP (TRAI)", url: "https://www.voicendata.com/5g/airtel-emerges-as-5g-speed-leader-in-himachal-pradesh-trai-idt-results-may-2025-9454217", description: "Network performance data for payments" },
  { label: "TRAI Drive Test — Baddi", url: "https://telecomlead.com/telecom-services/trai-drive-test-in-baddi-reveals-5g-and-4g-network-performance-gaps-across-airtel-bsnl-jio-and-vodafone-idea-123966", description: "5G/4G performance gaps by provider" },
  { label: "RBI KYC Documents Guide", url: "https://hyperverge.co/blog/documents-required-to-open-bank-account/", description: "OVD relaxation for non-resident account opening" },
  { label: "Forex in Dharamshala (Wise)", url: "https://wise.com/gb/currency-exchange/dharamshala", description: "Exchange options and digital alternatives" },
];
