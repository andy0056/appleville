export type TimelineItem = {
  item: string;
  days: string;
  note?: string;
};

export type PlaybookTown = {
  slug: string;
  name: string;
  settleSpeed: "fastest" | "fast" | "moderate" | "slow" | "slowest";
  overview: string;
  rentalTip: string;
  rentalChannels: string[];
  utilityNotes: string;
  ispTip: string;
  transportTip: string;
  timeline: TimelineItem[];
  localContacts: string[];
};

export type ChecklistPhase = {
  label: string;
  days: string;
  objective: string;
  items: string[];
};

export type PortalLink = {
  label: string;
  url: string;
  description: string;
};

export const settleSpeedRanking = [
  "Solan",
  "Dharamshala",
  "Palampur",
  "Shimla",
  "McLeodganj",
  "Bir",
  "Naggar",
  "Manali",
];

export const frictionPoints = [
  {
    icon: "🪪",
    title: "Proof of address",
    detail:
      "SIM KYC, LPG connection, and broadband all need local address proof. Carry a rent agreement, landlord letter, or utility bill.",
  },
  {
    icon: "🚿",
    title: "Water onboarding",
    detail:
      "Jal Shakti handles most towns, but Shimla uses SJPNL separately. Shimla faces summer supply stress during tourist influx.",
  },
  {
    icon: "🏔",
    title: "Tourist-linked volatility",
    detail:
      "Manali, McLeodganj, and Naggar see seasonal crowding that increases short-term rents, reduces negotiation leverage, and slows errands.",
  },
  {
    icon: "📡",
    title: "Last-mile variability",
    detail:
      "Even where ISPs promise '24-hour install', actual fibre lead time depends on local feasibility, permissions, and technician availability.",
  },
];

export const portals: PortalLink[] = [
  {
    label: "HPSEBL Consumer Portal",
    url: "https://cportal.hpseb.in/",
    description: "Electricity connections, name change, complaints",
  },
  {
    label: "Jal Shakti Citizen Services",
    url: "https://iph.hp.nic.in/Citizen/",
    description: "Water connections for all towns except Shimla",
  },
  {
    label: "SJPNL (Shimla Water)",
    url: "https://sjpnl.com/",
    description: "Shimla water & sewerage — separate from Jal Shakti",
  },
  {
    label: "Airtel Broadband",
    url: "https://www.airtel.in/broadband",
    description: "Feasibility check and installation booking",
  },
  {
    label: "JioFiber",
    url: "https://www.jio.com/fiber",
    description: "Feasibility check and installation booking",
  },
  {
    label: "Parivahan (RTO)",
    url: "https://parivahan.gov.in/",
    description: "Vehicle registration and driving licence services",
  },
];

export const goBackChecklist: string[] = [
  "Printed + PDF copies of ID, passport photos, and a one-page 'tenant profile' (job, income, references)",
  "A lightweight network test kit: phone hotspot, speed-test app, and a power bank",
  "A short list of non-negotiables (quiet hours, power backup, pet policy, cooking rules, guests policy)",
];

export const checklistPhases: ChecklistPhase[] = [
  {
    label: "Stability & proofs",
    days: "1–7",
    objective: "Get a roof, a ride, and a network connection.",
    items: [
      "Pick a base stay (3–7 nights) with a consistent postal address you can cite",
      "Do 6–10 property viewings — test mobile signal, water schedule, and power backup at each",
      "Book broadband feasibility check with your preferred ISP (keep a backup operator ready)",
      "Rent a scooter same-day if you'll ride — helmet enforcement is strict in Kangra ('no helmet, no fuel')",
      "Set up mobile hotspot as interim work connectivity",
      "Test UPI and ATM availability in your target area",
    ],
  },
  {
    label: "Formal onboarding",
    days: "8–15",
    objective: "Lock the rental, transfer utilities, port your SIM.",
    items: [
      "Finalise rental agreement — sign and document property condition (photos + meter readings)",
      "Electricity: decide name change vs. landlord meter reimbursement — HPSEBL supports online changes",
      "Water: if needed, use Jal Shakti citizen portal (or SJPNL for Shimla)",
      "SIM porting: SMS PORT to 1900, allow 3–5 working days — avoid mid-workweek timing",
      "Start ISP installation process if feasibility confirmed",
      "Register for LPG transfer/new connection using MyLPG/PMUY forms",
    ],
  },
  {
    label: "Optimisation",
    days: "16–30",
    objective: "Settle your workspace, backup systems, and daily rhythm.",
    items: [
      "Add furniture basics: desk, chair, mattress — local shops or second-hand (inspect in person)",
      "Complete LPG connection — use government forms to avoid unofficial charges",
      "Build data redundancy: second SIM or neighbour backup Wi-Fi arrangement",
      "Confirm grocery delivery coverage (BigBasket, Zepto, or local options — test your pin code)",
      "Tune workspace: lighting, ergonomic setup, UPS/inverter if power cuts are frequent",
      "Map your regular errand routes: mandi days, pharmacy, ATM, transport connections",
    ],
  },
];

export const playbookTowns: PlaybookTown[] = [
  {
    slug: "bir",
    name: "Bir",
    settleSpeed: "moderate",
    overview:
      "Easy to start living in (compact, walkable, scooter-friendly) but slower to formalise. Best rentals found via local networks, not portals.",
    rentalTip:
      "Prioritise local brokers, café noticeboards, and word-of-mouth. Use OLX/99acres mainly to benchmark pricing. Keep your tenant profile pack ready — landlords ask about WFH routines and guest policy.",
    rentalChannels: ["Local brokers", "Café noticeboards", "Word-of-mouth", "OLX/99acres (price benchmarking)"],
    utilityNotes:
      "Most tenants stay on the owner's meter and reimburse. HPSEBL supports online name change if needed. Water via Jal Shakti citizen portal.",
    ispTip:
      "Start with operator feasibility checks and book the first install slot available. Keep a second operator as fallback. If fibre doesn't exist at your lane, ask about local cable-based providers.",
    transportTip:
      "Scooter rentals available locally (~₹600–800/day). Helmet enforcement is strict in Kangra — 'no helmet, no fuel' at petrol pumps.",
    timeline: [
      { item: "Rental secured", days: "10–21" },
      { item: "Electricity transfer", days: "15–30", note: "Area category dependent" },
      { item: "Water connection", days: "Up to 30", note: "PSG framework" },
      { item: "ISP install", days: "1–7", note: "If fibre exists at your lane" },
      { item: "LPG connection", days: "7–15" },
      { item: "SIM (new/porting)", days: "0–1 new / 3–5 days porting" },
      { item: "Scooter rental", days: "Same day" },
    ],
    localContacts: [
      "HPSEBL consumer portal — applications, name change, complaints",
      "Jal Shakti citizen services — water connection applications",
      "Local scooter/bike rental providers — benchmark ₹600–800/day",
      "TRAI MNP helpline — porting process queries",
    ],
  },
  {
    slug: "dharamshala",
    name: "Dharamshala",
    settleSpeed: "fast",
    overview:
      "One of the quickest to settle into — civic contacts are clearly published, online municipal interfaces exist, and the market supports both long-term rentals and interim stays.",
    rentalTip:
      "Mixed channels work best: portals + brokers + community groups. Take a 7-day base stay near the market/government-office belt for back-to-back viewings. Facebook groups like 'Rent recycle Dharamsala' and 'Dharamsala sharing community' can accelerate leads.",
    rentalChannels: ["Facebook groups", "Local brokers", "MagicBricks/99acres", "Community boards"],
    utilityNotes:
      "HPSEBL online portal for electricity. Dharamshala is within Jal Shakti/ULB ecosystem — municipal site provides official contact points.",
    ispTip:
      "Use feasibility checkers and book an install. Airtel claims 'up to 24 hours' — build a 3–7 day buffer. For BSNL, use official 'book my fibre' flows and avoid advance-payment scams.",
    transportTip:
      "Scooter rentals widely available. Rental aggregators list typical daily rates. Strict helmet enforcement in Kangra district.",
    timeline: [
      { item: "Rental secured", days: "7–14 (off-peak), 10–21 (peak)" },
      { item: "Electricity transfer", days: "15–20" },
      { item: "Water connection", days: "Up to 30" },
      { item: "ISP install", days: "1–7" },
      { item: "LPG connection", days: "7–15" },
      { item: "SIM (new/porting)", days: "0–1 new / 3–5 days porting" },
      { item: "Scooter rental", days: "Same day" },
    ],
    localContacts: [
      "Municipal Corporation Dharamshala — civic services and contacts",
      "HPSEBL consumer portal",
      "Swiggy Dharamshala — confirms food delivery presence",
      "Facebook: 'Rent recycle Dharamsala' group",
    ],
  },
  {
    slug: "mcleodganj",
    name: "McLeodganj",
    settleSpeed: "moderate",
    overview:
      "Fast to start (lots of short-stay inventory) but slower to lock in a stable lease — many properties operate on tourism-style rules with seasonal pricing and strict guest policies.",
    rentalTip:
      "Optimise for micro-areas with stable water/power, walkable groceries, and road access without steep daily climbs. Negotiate 'off-season rent' if arriving before a busy period.",
    rentalChannels: ["Local agents", "Dharamshala Facebook groups", "Café networks", "Walking and asking"],
    utilityNotes:
      "Same electricity/water structures as Dharamshala (HPSEBL + Jal Shakti/ULB).",
    ispTip:
      "Prioritise fibre feasibility at the specific lane — 'available in the town' is insufficient. Verify the exact address. Treat published install times as best-case.",
    transportTip:
      "Bike rental guides emphasise carrying RC/insurance/PUC documents from the rental provider — important in tourist enforcement zones.",
    timeline: [
      { item: "Rental secured", days: "10–21" },
      { item: "Electricity transfer", days: "15–20" },
      { item: "Water connection", days: "Up to 30" },
      { item: "ISP install", days: "2–10", note: "Lane dependent" },
      { item: "LPG connection", days: "7–15" },
      { item: "SIM (new/porting)", days: "0–1 new / 3–5 days porting" },
      { item: "Scooter rental", days: "Same day" },
    ],
    localContacts: [
      "Dharamshala municipal portal (McLeodganj listed as suburb zone)",
      "McLeodganj bike rental — pricing and document checklist",
      "HPSEBL consumer portal",
      "Jal Shakti citizen portal",
    ],
  },
  {
    slug: "palampur",
    name: "Palampur",
    settleSpeed: "fast",
    overview:
      "Easier for calm, routine living — less tourist churn than Manali/McLeodganj. Better value and fewer landlord restrictions than heavier tourist towns.",
    rentalTip:
      "You'll often get better value here. Use portals for discovery but validate by visiting. Consider a slightly longer lock-in (6–11 months) if the landlord prefers stability.",
    rentalChannels: ["Local brokers", "99acres/MagicBricks", "Word-of-mouth", "Local newspaper ads"],
    utilityNotes:
      "HPSEBL for electricity. Water via Jal Shakti/ULB — standard water-connection forms available online.",
    ispTip:
      "Good fibre coverage in town. Start with feasibility check and book the first slot. AirJaldi wireless is a strong backup option.",
    transportTip:
      "Rental aggregators list scooter/bike rentals at typical day-rates. Useful even if you plan to book locally.",
    timeline: [
      { item: "Rental secured", days: "7–14" },
      { item: "Electricity transfer", days: "15–20" },
      { item: "Water connection", days: "Up to 30" },
      { item: "ISP install", days: "1–10" },
      { item: "LPG connection", days: "7–15" },
      { item: "SIM (new/porting)", days: "0–1 new / 3–5 days porting" },
      { item: "Scooter rental", days: "Same day" },
    ],
    localContacts: [
      "Municipal Corporation Palampur — official site and contacts",
      "Kangra district public utilities listing",
      "Jal Shakti citizen portal",
      "HPSEBL consumer portal",
    ],
  },
  {
    slug: "shimla",
    name: "Shimla",
    settleSpeed: "moderate",
    overview:
      "High administrative convenience (state capital) but friction-heavy due to traffic, limited parking, and water-supply stress periods.",
    rentalTip:
      "'Good flats' turn over fast. Prioritise orientation and insulation for winter comfort. Water reliability is a key screening question — Shimla has documented crisis periods during summer and tourist influx.",
    rentalChannels: ["MagicBricks/99acres", "Local brokers", "Newspaper classifieds", "Society contacts"],
    utilityNotes:
      "HPSEBL for electricity (tariff schedule published). Water/Sewerage via SJPNL (separate from Jal Shakti) with dedicated toll-free helpline 14420.",
    ispTip:
      "Feasibility varies sharply by neighbourhood and building wiring. In older buildings you may need society permission for drilling/cabling.",
    transportTip:
      "Scooter/bike rentals exist with published daily rates. Foreign nationals need a valid IDP for legal driving (foreign licence alone insufficient).",
    timeline: [
      { item: "Rental secured", days: "10–21" },
      { item: "Electricity transfer", days: "15", note: "Urban standard" },
      { item: "Water onboarding (SJPNL)", days: "7–21" },
      { item: "ISP install", days: "1–10" },
      { item: "LPG connection", days: "7–15" },
      { item: "SIM (new/porting)", days: "0–1 new / 3–5 days porting" },
      { item: "Scooter rental", days: "Same day" },
    ],
    localContacts: [
      "SJPNL portal — bill payment, grievance registration, helpline 14420",
      "HPSEBL consumer portal and tariffs",
      "Shimla bike/scooty rental providers",
    ],
  },
  {
    slug: "solan",
    name: "Solan",
    settleSpeed: "fastest",
    overview:
      "Usually the fastest settle — less seasonal than tourist towns, clear municipal touchpoints, and downloadable water connection forms on the municipal site.",
    rentalTip:
      "You can often close quickly if you're flexible on furnishing. Treat Solan as a 'commuter-friendly base' with easier access to supplies and services.",
    rentalChannels: ["Local brokers", "99acres", "Word-of-mouth", "Municipal noticeboard"],
    utilityNotes:
      "HPSEBL for electricity. Solan municipal site provides a downloadable 'New Water Connection Form' — unusually useful for first-week clarity.",
    ispTip:
      "Good highway-corridor fibre coverage. Multiple ISPs available in developed areas. Faster install times than hill towns.",
    transportTip:
      "Bike rental marketplaces list Solan inventories with low starting day-rates. Closest town to Chandigarh for supplies.",
    timeline: [
      { item: "Rental secured", days: "7–14" },
      { item: "Electricity transfer", days: "15", note: "Urban standard" },
      { item: "Water connection", days: "Up to 30", note: "Faster via ULB process" },
      { item: "ISP install", days: "1–7" },
      { item: "LPG connection", days: "7–15" },
      { item: "SIM (new/porting)", days: "0–1 new / 3–5 days porting" },
      { item: "Scooter rental", days: "Same day" },
    ],
    localContacts: [
      "Municipal Corporation Solan — downloadable water connection form",
      "HPSEBL consumer portal",
      "Jal Shakti citizen portal (if under JSV billing)",
    ],
  },
  {
    slug: "manali",
    name: "Manali",
    settleSpeed: "slowest",
    overview:
      "The most friction-heavy town for newcomers — seasonality, crowds, and premium on short-stay inventory. Municipal council notes the town's large floating population during tourist season.",
    rentalTip:
      "Expect 'hotel-style' landlord expectations: advance rent, strict guest rules, higher deposit asks, and winter closure clauses. If staying through tourist season, lock a lease early and negotiate a written 'rate stability' clause.",
    rentalChannels: ["Local agents", "Property managers", "OLX/MagicBricks", "Long-term stay groups"],
    utilityNotes:
      "HPSEBL standard for electricity. Civic contact through district directory and municipal council site.",
    ispTip:
      "Install times often stretch longer than lowland towns — technician scheduling and last-mile fibre differ by lane. Plan a dual-SIM data strategy from day one.",
    transportTip:
      "Abundant bike rental providers with published daily rates. Seasonality explicitly affects pricing — expect higher rates Apr–Jun and Dec–Jan.",
    timeline: [
      { item: "Rental secured", days: "14–30", note: "Peak can be longer" },
      { item: "Electricity transfer", days: "20–30", note: "Rural/remote buffer" },
      { item: "Water connection", days: "Up to 30" },
      { item: "ISP install", days: "3–14" },
      { item: "LPG connection", days: "7–15" },
      { item: "SIM (new/porting)", days: "0–1 new / 3–5 days porting" },
      { item: "Scooter rental", days: "Same day" },
    ],
    localContacts: [
      "Municipal Council Manali — district directory contact",
      "Manali municipal council site — local governance info",
      "Manali bike rental — seasonal pricing info",
      "HPSEBL consumer portal",
    ],
  },
  {
    slug: "naggar",
    name: "Naggar",
    settleSpeed: "slow",
    overview:
      "Quieter and more stable than Manali but slower for installations. Not a municipal council — expect panchayat-style routing for some local issues plus Jal Shakti for water.",
    rentalTip:
      "Inventory is smaller — you'll settle faster if you accept 'semi-furnished + add desk' and lock a longer tenure. Fewer landlord restrictions than Manali.",
    rentalChannels: ["Word-of-mouth", "Local contacts", "Coliving spaces (GoStops)", "Walking and asking"],
    utilityNotes:
      "HPSEBL standard for electricity. Jal Shakti citizen services for water — online application with time-limit framework.",
    ispTip:
      "Local bike rental providers publish scooter day-rates (~₹700/day). AirJaldi wireless is the most reliable option. Coliving spaces often provide their own connectivity.",
    transportTip:
      "Scooter rental same-day (~₹700/day for scooty, higher for bikes). If commuting to Manali, plan for traffic during tourist weeks.",
    timeline: [
      { item: "Rental secured", days: "14–30" },
      { item: "Electricity transfer", days: "20–30" },
      { item: "Water connection", days: "Up to 30" },
      { item: "ISP install", days: "3–14" },
      { item: "LPG connection", days: "7–15" },
      { item: "SIM (new/porting)", days: "0–1 new / 3–5 days porting" },
      { item: "Scooter rental", days: "Same day" },
    ],
    localContacts: [
      "Kullu district municipalities listing — context on civic structure",
      "Local Naggar bike rental providers",
      "Jal Shakti citizen portal — water applications",
      "HPSEBL consumer portal",
    ],
  },
];
