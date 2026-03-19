/* ------------------------------------------------------------------ */
/*  Women's safety, healthcare & autonomy data for eight HP towns      */
/* ------------------------------------------------------------------ */

export type CrimeRow = {
  district: string;
  year: number;
  rape: number;
  kidnapping: number;
  dowryDeath: number;
  cruelty: number;
  molestation: number;
};

export type TownSafety = {
  slug: string;
  name: string;
  cluster: string;
  safetyLevel: "high" | "moderate-high" | "moderate" | "caution";
  headline: string;
  detail: string;
  tips: string[];
};

export type SafeSpace = {
  name: string;
  town: string;
  type: "café" | "co-living" | "hostel-chain" | "pg";
  description: string;
  highlight?: string;
};

export type HealthcareTown = {
  town: string;
  level: "tertiary" | "secondary" | "primary-only";
  facilities: string;
  note: string;
};

export type PolicyHighlight = {
  icon: string;
  label: string;
  detail: string;
};

/* ---------- SheTravel Policy 2026 ---------- */

export const sheTravelPolicy = {
  headline: "SheTravel Policy 2026",
  stat: "Solo women travelers currently make up ~18% of HP's tourist influx — target is 35% by 2028.",
  highlights: [
    {
      icon: "📱",
      label: "SheShield app",
      detail: "Dedicated SOS and real-time emergency response for women navigating remote terrain.",
    },
    {
      icon: "🏠",
      label: "SheStays certification",
      detail: "Hotels and homestays must guarantee background-checked staff, secure premises, and women-friendly facilities.",
    },
    {
      icon: "🚕",
      label: "GPS-enabled verified taxis",
      detail: "Fleet of verified cabs with GPS tracking, plus women-driven cab services for late-night/remote transit.",
    },
    {
      icon: "👮",
      label: "Women's tourist assistance desks",
      detail: "Proposed by Dharamshala Hotel Association — dedicated desks at key locations with CCTV along major routes.",
    },
    {
      icon: "🎓",
      label: "Gender-sensitization training",
      detail: "Mandatory for hotel staff and taxi operators. Registered guides through government tourism centers only.",
    },
  ] as PolicyHighlight[],
};

/* ---------- Crime statistics ---------- */

export const crimeData: CrimeRow[] = [
  { district: "Kangra", year: 2022, rape: 53, kidnapping: 63, dowryDeath: 1, cruelty: 38, molestation: 106 },
  { district: "Kangra", year: 2023, rape: 39, kidnapping: 49, dowryDeath: 0, cruelty: 28, molestation: 81 },
  { district: "Kangra", year: 2024, rape: 41, kidnapping: 46, dowryDeath: 0, cruelty: 23, molestation: 57 },
  { district: "Shimla", year: 2022, rape: 38, kidnapping: 54, dowryDeath: 0, cruelty: 14, molestation: 46 },
  { district: "Shimla", year: 2023, rape: 36, kidnapping: 65, dowryDeath: 0, cruelty: 17, molestation: 57 },
  { district: "Shimla", year: 2024, rape: 46, kidnapping: 46, dowryDeath: 0, cruelty: 16, molestation: 56 },
  { district: "Solan", year: 2022, rape: 17, kidnapping: 46, dowryDeath: 0, cruelty: 4, molestation: 19 },
  { district: "Solan", year: 2023, rape: 21, kidnapping: 30, dowryDeath: 0, cruelty: 14, molestation: 30 },
  { district: "Solan", year: 2024, rape: 24, kidnapping: 44, dowryDeath: 0, cruelty: 10, molestation: 44 },
  { district: "Kullu", year: 2022, rape: 29, kidnapping: 45, dowryDeath: 0, cruelty: 5, molestation: 33 },
  { district: "Kullu", year: 2023, rape: 25, kidnapping: 36, dowryDeath: 0, cruelty: 8, molestation: 30 },
  { district: "Kullu", year: 2024, rape: 16, kidnapping: 36, dowryDeath: 0, cruelty: 7, molestation: 32 },
];

export const crimeDataNote =
  "HP crime rate against women: 42 per 100,000 women (2022) vs national average 66.2 (2023). 'Kidnapping' figures often include consensual elopement reported by conservative families. Source: NCRB & HP Police district data 2022–2024.";

/* ---------- Town-level safety profiles ---------- */

export const townSafetyProfiles: TownSafety[] = [
  {
    slug: "solan",
    name: "Solan",
    cluster: "Urban centers",
    safetyLevel: "high",
    headline: "Frequently cited by residents as exceptionally safe for women.",
    detail:
      "High density of educational institutions fosters social accountability. Residents report feeling safe enough to leave doors unlocked historically. Tight-knit community trust pervades residential sectors.",
    tips: [
      "Commercial areas close by 8–9 PM — streets empty quickly after that",
      "Standard advice: avoid walking alone after dark (lack of passive surveillance, not violent crime)",
      "Lower cold exposure than high hills — easier daily logistics",
    ],
  },
  {
    slug: "shimla",
    name: "Shimla",
    cluster: "Urban centers",
    safetyLevel: "moderate-high",
    headline: "Mall Road & Ridge safe during day. Harassment mainly from plains tourists, not locals.",
    detail:
      "Primary commercial areas (Mall Road, The Ridge, Lakkar Bazaar) are heavily patrolled by tourist police. The primary source of perceived threat is from domestic tourists (Delhi, UP, Punjab, Haryana), not local Himachali population. Harassment manifests as staring, non-consensual photography, and verbal eve-teasing.",
    tips: [
      "Avoid walking alone at night — streets empty after 9 PM",
      "Night risk includes aggressive macaque monkeys on quiet streets",
      "Nightlife is practically non-existent — restaurants close by 8–9 PM",
    ],
  },
  {
    slug: "dharamshala",
    name: "Dharamshala",
    cluster: "Kangra Valley",
    safetyLevel: "moderate-high",
    headline: "Tibetan influence + backpacker community normalizes solo female mobility.",
    detail:
      "The Tibetan government-in-exile, international backpacker community, and spiritual centers create a cosmopolitan environment where solo women are a ubiquitous, expected sight. Sheer visibility lowers gendered scrutiny significantly.",
    tips: [
      "Stick to 'practical safety' — don't rely passively on the bohemian reputation",
      "Trails to Upper Dharamkot / Bhagsu Waterfall are unlit — avoid after dark",
      "Wildlife: Himalayan black bears and leopards confirmed after 6 PM in forested areas",
      "Carry a strong flashlight; use verified auto-rickshaws for evening transit",
    ],
  },
  {
    slug: "mcleodganj",
    name: "McLeodganj",
    cluster: "Kangra Valley",
    safetyLevel: "moderate-high",
    headline: "Women sitting alone in cafés, on trails, at retreats — entirely normalized.",
    detail:
      "Higher-altitude Dharamkot and Bhagsu see solo women reading, meditating, and walking trails daily. This visibility is the strongest safety signal. Main risks are geographic (unlit trails, wildlife) rather than interpersonal.",
    tips: [
      "Same trail/wildlife cautions as Dharamshala — unlit paths after dark are the primary risk",
      "Foreign women occasionally report stalking or selfie-hounding from transient domestic tourists",
      "Boundary-setting is essential — even in perceived havens",
    ],
  },
  {
    slug: "bir",
    name: "Bir",
    cluster: "Kangra Valley",
    safetyLevel: "moderate-high",
    headline: "Premier destination for female digital nomads. Café culture + monastery calm.",
    detail:
      "Evolved rapidly into a hub for solo women drawn by its café culture, serene monasteries, and paragliding community. Properties like Flashpackers Bir explicitly promote a 'sisterhood' vibe for solo women.",
    tips: [
      "Standard precautions apply despite the relaxed culture",
      "Pharmacy purchases (contraceptives) may attract staring in this smaller community — e-pharmacies available",
      "No major hospital — travel to Palampur or Baijnath for gynecological consultations",
    ],
  },
  {
    slug: "palampur",
    name: "Palampur",
    cluster: "Kangra Valley",
    safetyLevel: "moderate-high",
    headline: "Tranquil, slow-living reputation. Emerging as a minor medical hub for women's health.",
    detail:
      "Shares the Kangra Valley's progressive atmosphere. Has aggressively emerged as a medical hub with specialized fertility clinics and women's health facilities.",
    tips: [
      "Janam Fertility Centre (Matour) available for advanced reproductive health",
      "Matr Prem Clinic noted for empathetic women's health consultations",
      "Budget-friendly PG options with quiet study/remote-work environments",
    ],
  },
  {
    slug: "naggar",
    name: "Naggar",
    cluster: "Kullu Valley",
    safetyLevel: "moderate",
    headline: "Universally celebrated for peaceful village atmosphere. Highly recommended for long-term women's residencies.",
    detail:
      "Ancient temples, Roerich Art Gallery, cheap safe homestays, and deep local hospitality. Digital nomad networks highlight it as excellent for women seeking quiet, long-term stays.",
    tips: [
      "No specialized healthcare — must travel to Kullu (~20 km) or Manali for gynecological care",
      "Winter road freezes and monsoon landslides can cut off transit entirely",
      "Pharmacy access more limited — stock up or use e-pharmacy delivery",
    ],
  },
  {
    slug: "manali",
    name: "Manali",
    cluster: "Kullu Valley",
    safetyLevel: "caution",
    headline: "Harassment more pronounced than other HP towns due to hyper-commercialization.",
    detail:
      "High volume of transient, short-term tourism creates anonymity that emboldens perpetrators. Women report groping, catcalling, and feeling unsafe on popular hiking trails in town. Markedly more aggressive harassment patterns than the Kangra Valley.",
    tips: [
      "Walking alone at night strongly advised against — especially Old Manali alleys, Vashisht path, Beas River paths",
      "Use anti-theft backpacks and keep emergency numbers on speed dial",
      "Trust your intuition to leave uncomfortable situations immediately",
      "Old Manali riverside cafés still offer relaxed, women-friendly daytime environments",
    ],
  },
];

/* ---------- Safe spaces: co-living, cafés, hostels ---------- */

export const safeSpaces: SafeSpace[] = [
  // Co-living
  { name: "AltSpace", town: "Dharamshala (Khaniyara)", type: "co-living", description: "Private rooms, ergonomic desks, fast internet, power backup, 3 meals/day. Built-in community of tech workers, writers, and creatives.", highlight: "Instant social integration — safety in numbers for excursions" },
  { name: "The VOID", town: "Bhagsu", type: "co-living", description: "Single-bill model covering rent, utilities, workspace, daily events. Filters community for safe, vetted co-residents.", highlight: "Management handles all logistics — focus on career + exploration" },
  { name: "NomadGao", town: "Dharamkot", type: "co-living", description: "Mountain views + coworking. Reviewers highlight extreme safety, cleanliness, helpful staff.", highlight: "Note: monsoon dampness in rooms is a trade-off" },
  // Cafés
  { name: "Avva's Cafe", town: "Bir", type: "café", description: "South Indian food by a Telangana family. Kitchen led by 'Avva' (mother). Japanese-inspired space.", highlight: "Universally recommended safe & homely environment" },
  { name: "Silver Lining Cafe", town: "Bir", type: "café", description: "Mud-constructed bakery by Apurva Bisht. Garden ambiance, fairy lights, fresh bakes." },
  { name: "Her Cafe", town: "Bir (Gunehr)", type: "café", description: "Run entirely by local women. Authentic Himachali food. Direct employment for village women." },
  { name: "Woeser Bakery", town: "McLeodganj", type: "café", description: "Tibetan mother-daughter duo. Vegan desserts, carrot cake, world-class cappuccino.", highlight: "Safe haven where solo women return daily" },
  { name: "Bhoomi Cafe", town: "McLeodganj", type: "café", description: "All-women enterprise. Fresh local produce and wholesome fruit smoothies." },
  { name: "Cliffy's Cafe", town: "Palampur", type: "café", description: "Female-owned, jungle-themed setting. Named after owner's daughter. Croissants + South Indian." },
  // Hostel chains
  { name: "The Hosteller / Zostel / goSTOPS", town: "Multiple towns", type: "hostel-chain", description: "National chains with female-only dorms, secure lockers, en-suite bathrooms, key-card access.", highlight: "Present in McLeodganj, Dharamkot, Bir, Old Manali" },
  { name: "Flashpackers Bir", town: "Bir", type: "hostel-chain", description: "Explicitly promotes 'sisterhood' vibe. Insulated community for solo women to network.", highlight: "Empowering community for female digital nomads" },
];

/* ---------- Healthcare access ---------- */

export const healthcareAccess: HealthcareTown[] = [
  { town: "Shimla", level: "tertiary", facilities: "Kamla Nehru State Hospital for Mother & Child, DDU Zonal Hospital (LaQshya initiative), Tenzin Hospital, Sanjeevani Hospital", note: "Most advanced tertiary care in the state. Full OB-GYN, laparoscopic, personalized maternity." },
  { town: "Solan", level: "tertiary", facilities: "Government Regional Hospital, Nimbus Hospital, Chakravarty Nursing Home (Baddi), Paras Hospital", note: "Comprehensive gynaecological services. IVF centers available. Govt hospital can be overcrowded." },
  { town: "Dharamshala", level: "secondary", facilities: "Sukhmani Hospital, Sai Mahima Shukla Hospital, Fortis Hospital", note: "Good private infrastructure. McLeodganj residents must descend to lower Dharamshala for comprehensive care." },
  { town: "Palampur", level: "secondary", facilities: "Janam Fertility Centre (Matour), Matr Prem Clinic, Dr. Neena Pahwa's Laparoscopic Centre", note: "Emerged as a minor medical hub. Advanced reproductive health and minimally invasive surgery." },
  { town: "Manali", level: "secondary", facilities: "Lady Willingdon Hospital (Dr. Vijaya Bharathi)", note: "Primary trusted outpost for obstetric care in upper Kullu Valley." },
  { town: "McLeodganj", level: "primary-only", facilities: "None — relies on lower Dharamshala (steep, winding roads)", note: "Pregnant women must factor transit time into residential planning." },
  { town: "Bir", level: "primary-only", facilities: "None — travel to Palampur or Baijnath required", note: "No major hospital. Plan for ~30 min transit for any gynecological consultation." },
  { town: "Naggar", level: "primary-only", facilities: "Basic PHC only — relies on Kullu (~20 km) or Manali", note: "Critical barrier during winter road freezes or monsoon landslides." },
];

/* ---------- Practical tips ---------- */

export const practicalTips: string[] = [
  "Contraceptives (OCPs, i-Pill, condoms) are available OTC at pharmacies in all major towns without prescription",
  "In smaller towns (Bir, Naggar), use e-pharmacies like 1mg for discreet delivery to avoid local social friction",
  "Co-living spaces (AltSpace, The VOID, NomadGao) eliminate the vulnerability of renting an isolated village apartment",
  "Female-only dorms at Zostel/Hosteller/goSTOPS offer secure lockers, en-suite bathrooms, and key-card access",
  "Plan residential location around healthcare tier — pregnant women should prioritize Shimla/Solan/Dharamshala/Palampur",
  "After-dark risk is geographic (unlit trails, wildlife), not predominantly interpersonal — always carry a flashlight",
  "Use verified auto-rickshaws rather than walking isolated paths in the evening",
  "Stock menstrual products before arrival — reusable pads help avoid the mountainous waste disposal crisis",
];

/* ---------- Sources ---------- */

export const safetySourceLinks = [
  { label: "HP Police Crime Data 2022–24", url: "https://citizenportal.hppolice.gov.in/citizen/downloadPropertyFile.htm?id=181&stov=STCA-388E-GT4O-ESVP-AT6V-SV2C-YBB1-2PD2", description: "District-wise crime against women statistics" },
  { label: "SheTravel Policy (TOI)", url: "https://timesofindia.indiatimes.com/city/chandigarh/himachal-pradesh-tourism-dept-aims-to-boost-solo-women-travel-from-18-to-35-by-2028/articleshow/128825449.cms", description: "Solo women travel target: 18% → 35% by 2028" },
  { label: "Dharamshala Safety Blueprint (HT)", url: "https://www.hindustantimes.com/cities/chandigarh-news/dharamshala-hoteliers-propose-safety-blueprint-for-hp-s-solo-women-travellers-initiative-101772215719801.html", description: "SheStays certification & verified taxi proposals" },
  { label: "AltSpace Co-living", url: "https://www.altspaced.com/coliving", description: "Dharamshala co-living with meals & community" },
  { label: "The VOID Life", url: "https://thevoidlife.com/", description: "Bhagsu co-living and coworking" },
  { label: "Menstrual Waste Crisis (Mongabay)", url: "https://india.mongabay.com/2025/08/the-hidden-menstrual-waste-crisis-in-the-hills/", description: "Ecological impact of sanitary waste in HP" },
];
