export type OutageProfile = {
  normal: string;
  monsoon: string;
  winter: string;
};

export type PowerTown = {
  slug: string;
  name: string;
  circle: string;
  reliabilityRank: number;
  outages: OutageProfile;
  recommendedBackup: string;
  heatingApproach: string;
  notes: string;
};

export type BackupTier = {
  tier: number;
  label: string;
  description: string;
  specs: string;
  runtime: string;
  costInr: string;
  costGbp: string;
  bestFor: string;
};

export type HeatingOption = {
  icon: string;
  label: string;
  detail: string;
  cost: string;
  caution?: string;
};

export type SourceLink = {
  label: string;
  url: string;
  description: string;
};

export const reliabilityRanking = [
  "Shimla (core)",
  "Solan (town belt)",
  "Dharamshala (core)",
  "Palampur (core)",
  "McLeodganj",
  "Bir",
  "Naggar",
  "Manali",
];

export const essentialsLoad = {
  items: [
    { device: "Wi-Fi router", watts: "10–15W" },
    { device: "Laptop (working)", watts: "50–90W" },
    { device: "1–2 LED lights", watts: "10–20W" },
  ],
  total: "~80–130W",
  note: "Running a room heater on batteries is uneconomic unless you build a large solar-hybrid system. Heating strategy is separate from backup strategy.",
};

export const backupTiers: BackupTier[] = [
  {
    tier: 1,
    label: "Basic UPS",
    description: "Router + laptop protection for short cuts and call protection",
    specs: "Line-interactive UPS, ~1100VA / ~660W, built-in batteries",
    runtime: "~30–90 minutes depending on load",
    costInr: "₹6,800–₹8,000",
    costGbp: "~£55–£65",
    bestFor: "Shimla/Solan cores, or anyone mostly riding out short trips",
  },
  {
    tier: 2,
    label: "Home inverter + battery",
    description: "Hours of runtime for multi-hour outages",
    specs: "Pure sine wave inverter 900–1100VA + 150Ah 12V tall tubular battery",
    runtime: "~7.2h at 200W, ~4.8h at 300W (150Ah × 12V = 1.8kWh, 80% usable)",
    costInr: "₹18,500–₹21,500 (combo)",
    costGbp: "~£150–£175",
    bestFor: "McLeodganj, Bir, Palampur, Manali, Naggar — where outages run hours",
  },
  {
    tier: 3,
    label: "Hybrid solar + inverter + battery",
    description: "4–6+ hours even in extended cuts, with solar recharge",
    specs: "3kVA hybrid/MPPT inverter + solar panels + batteries",
    runtime: "4–6+ hours essentials (not heaters)",
    costInr: "₹2.0–₹2.2 lakh (system), inverter alone ₹18k–₹42k",
    costGbp: "~£1,620–£1,785 (full system)",
    bestFor: "Long stays (6–12 months) in Manali/Naggar with roof access",
  },
];

export const powerTowns: PowerTown[] = [
  {
    slug: "bir",
    name: "Bir",
    circle: "Kangra",
    reliabilityRank: 6,
    outages: {
      normal: "~1–3/month, 0.5–3h typical",
      monsoon: "~3–8/month, 2–10h (landslide risk)",
      winter: "~2–6/month, 1–8h (load/tripping)",
    },
    recommendedBackup: "1100VA UPS or 900–1100VA sine inverter + 150Ah battery",
    heatingApproach: "Electric blanket + short electric heating bursts; avoid relying solely on electric heater during cuts",
    notes: "Semi-rural reliability. During heavy rains, Kangra sees blocked roads and transformer damage. Prefer rentals on main Bir–Billing approach roads for faster restoration.",
  },
  {
    slug: "dharamshala",
    name: "Dharamshala",
    circle: "Kangra",
    reliabilityRank: 3,
    outages: {
      normal: "~1–3/month, 0.5–3h",
      monsoon: "~3–8/month, 2–10h",
      winter: "~2–6/month, 1–8h",
    },
    recommendedBackup: "Same as Bir; town core tends to restore faster",
    heatingApproach: "Electric heater viable but budget for backup + warm bedding",
    notes: "Dharamshala subdivision is heavily affected in rain events. Pick core + stable road access rather than steep lanes.",
  },
  {
    slug: "mcleodganj",
    name: "McLeodganj",
    circle: "Kangra",
    reliabilityRank: 5,
    outages: {
      normal: "~1–4/month, 1–4h",
      monsoon: "~4–10/month, 3–15h (road blocks)",
      winter: "~2–7/month, 2–10h",
    },
    recommendedBackup: "Prefer inverter + battery (longer runtime than UPS)",
    heatingApproach: "Electric blanket + layered insulation; LPG/wood only if safely vented",
    notes: "Dharamshala–McLeodganj road has been blocked by landslides. 'Close to main road' matters when technicians need to reach your area.",
  },
  {
    slug: "palampur",
    name: "Palampur",
    circle: "Kangra",
    reliabilityRank: 4,
    outages: {
      normal: "~2–6/month, 1–6h (network constraints)",
      monsoon: "~4–10/month, 3–15h",
      winter: "~4–12/month, 3–20h (winter demand)",
    },
    recommendedBackup: "Inverter + battery is strongly recommended",
    heatingApproach: "Mix: electric blanket + limited room heating; consider solar water heating if landlord allows",
    notes: "Documented structural constraints: dependency on an older substation, overload, staff shortage. Ask the landlord which feeder/area and whether building has inverter.",
  },
  {
    slug: "shimla",
    name: "Shimla",
    circle: "Shimla",
    reliabilityRank: 1,
    outages: {
      normal: "~0–2/month, often short in core",
      monsoon: "~1–4/month, 1–6h",
      winter: "~2–8/month, 2–20h (snow years spike)",
    },
    recommendedBackup: "UPS in core; inverter + battery outside core",
    heatingApproach: "Oil-filled radiator + electric blanket; plan for snow-day contingencies",
    notes: "City-core generally sees fewer/shorter disruptions. State has announced ₹65 crore ducting/undergrounding project in Kasumpti area for 'uninterrupted power supply'.",
  },
  {
    slug: "solan",
    name: "Solan",
    circle: "Solan",
    reliabilityRank: 2,
    outages: {
      normal: "~1–4/month, 1–8h",
      monsoon: "~2–6/month, 3–15h",
      winter: "~2–6/month, 3–20h (rare major events)",
    },
    recommendedBackup: "UPS for short cuts; inverter + battery if WFH critical",
    heatingApproach: "Electric heating usually easiest; lower cold exposure than higher hills",
    notes: "Lower altitude than high hills, but severe statewide snowfall events still show transformer disruptions in Solan district. Plan for rare 'black swan' events.",
  },
  {
    slug: "manali",
    name: "Manali",
    circle: "Kullu",
    reliabilityRank: 8,
    outages: {
      normal: "~2–6/month, 2–12h",
      monsoon: "~6–15/month, 10–30h",
      winter: "~8–20/month, 15–60h (snow disruption)",
    },
    recommendedBackup: "Inverter + battery minimum; consider hybrid solar for long stay",
    heatingApproach: "Avoid depending on electric heater alone; prioritise property heating + insulation + safe alternative heating",
    notes: "Manali businesses themselves argue winter snow routinely damages supply lines and push for underground cabling — strong signal that overhead distribution is a regular pain point.",
  },
  {
    slug: "naggar",
    name: "Naggar",
    circle: "Kullu",
    reliabilityRank: 7,
    outages: {
      normal: "~2–7/month, 2–12h",
      monsoon: "~6–15/month, 10–30h",
      winter: "~8–20/month, 15–60h",
    },
    recommendedBackup: "Inverter + battery; hybrid solar if rooftop feasible",
    heatingApproach: "Similar to Manali; choose sunnier, less exposed rental + backup",
    notes: "Shares Kullu circle constraints with Manali. In severe episodes, widespread transformer failures affect the district.",
  },
];

export const heatingOptions: HeatingOption[] = [
  {
    icon: "⚡",
    label: "Electric room heater",
    detail: "Fast, simple. 1.5kW heater × 6h/day ≈ 270kWh/month.",
    cost: "~₹1,470–₹1,590/month at HP domestic tariff (₹5.45–₹5.90/unit)",
    caution: "Fragile during outages in Manali/Naggar. Use electric blanket + short bursts instead of continuous heating.",
  },
  {
    icon: "🔥",
    label: "LPG / gas heater",
    detail: "Works when power fails. ~46 MJ/kg (~12.78 kWh/kg) calorific value.",
    cost: "14.2kg cylinder: Shimla ₹958.50, Solan ₹941.50, Kullu ₹941.50 (Mar 2026)",
    caution: "Must be ventilated. Never sleep with unvented gas heater on — carbon monoxide risk.",
  },
  {
    icon: "🪵",
    label: "Wood/coal bukhari",
    detail: "Present in some rentals. Lower energy per kg than LPG.",
    cost: "Varies by local firewood availability",
    caution: "High smoke/CO/fire risk. Only use if you understand ventilation and chimney condition.",
  },
  {
    icon: "☀️",
    label: "Solar water heater",
    detail: "Helpful for cold towns if landlord allows installation. 100 LPD systems common.",
    cost: "~₹22,000–₹32,500 for a 100 LPD system",
  },
];

export const propertyChecklist: string[] = [
  "Ask landlord: inverter present? What battery Ah? What is backed up (lights only vs sockets)?",
  "Observe: do lights flicker / is voltage unstable during evenings (load signal)?",
  "Check HPSEBL scheduled shutdown listings for your area's daytime maintenance windows",
  "Inspect: proper MCB/RCCB, safe wiring, no makeshift 'spider web' extensions near heaters",
  "If planning solar: verify roof access, shading, snow load, and owner permission",
  "Test mobile signal strength at different times — your hotspot is your last-resort backup",
  "Ask about water heating: geyser wattage (typically ~2000W) affects your overall load budget",
];

export const insulationTips: string[] = [
  "Draught sealing: door sweeps, window sealing tapes, thick curtains",
  "Reduce heated volume: heat the bedroom/workroom only; use rugs on bare floors",
  "Sleep warmth beats room warmth: blanket layering is resilient to outages",
  "Check window glazing: single-pane windows lose heat fast — consider temporary insulation film",
  "Position desk away from exterior walls and windows to reduce cold drafts during work hours",
];

export const powerSources: SourceLink[] = [
  {
    label: "HPSEBL Reliability Indices",
    url: "https://webdocuploader.hpseb.in/uploader/download2.php?link=%2Fportal%2Feodb%2FSAIDI+SAIFI++2019-2020+%28Q1%29.pdf",
    description: "SAIDI/SAIFI/CAIDI/CAIFI by circle, FY 2019–20 Q1",
  },
  {
    label: "HPSEBL Scheduled Shutdowns",
    url: "https://webdocuploader.hpseb.in/uploader/shutdown",
    description: "Check your area's planned maintenance windows",
  },
  {
    label: "HPSEBL Tariff Rates",
    url: "https://www.hpseb.in/irj/go/km/docs/internet/New_Website/Pages/tariff2.html",
    description: "Domestic tariff slabs w.e.f. 01-Apr-2025",
  },
  {
    label: "Shimla Underground Ducting Project",
    url: "https://timesofindia.indiatimes.com/city/shimla/rs-65-crore-project-to-move-overhead-network-of-electricity-and-wires-underground/articleshow/105947978.cms",
    description: "₹65 crore project for uninterrupted power supply",
  },
  {
    label: "Manali Winter Supply Concerns",
    url: "https://www.tribuneindia.com/news/himachal/hoteliers-want-uninterrupted-power-supply-during-winter-598738/",
    description: "Local reporting on overhead distribution issues",
  },
  {
    label: "Palampur Frequent Cuts",
    url: "https://www.tribuneindia.com/news/himachal/palampur-nearby-areas-face-frequent-power-cuts-472926/",
    description: "Documented structural constraints and outages",
  },
];
