/* ------------------------------------------------------------------ */
/*  Community, mental health & social support data for eight HP towns  */
/* ------------------------------------------------------------------ */

export type IsolationRisk = "low" | "low-medium" | "medium" | "medium-high";

export type TownCommunity = {
  slug: string;
  name: string;
  coworkingLevel: "high" | "medium" | "low-medium" | "low";
  communitySignals: string;
  mentalHealthAccess: string;
  aaNa: string;
  familyFriendliness: string;
  isolationRisk: IsolationRisk;
  coworkingSpaces: { name: string; detail: string; pricing?: string }[];
  mentalHealthResources: string[];
  peerSupport: string[];
  integrationTips: string[];
};

export type Helpline = {
  name: string;
  number: string;
  detail: string;
  hours: string;
};

export type ConnectionStep = {
  icon: string;
  label: string;
  detail: string;
};

/* ---------- Key helplines ---------- */

export const helplines: Helpline[] = [
  {
    name: "Tele-MANAS",
    number: "14416",
    detail: "Government of India initiative — free 24/7 tele-counselling. Connected to district mental health programmes for escalation.",
    hours: "24/7, 365 days",
  },
  {
    name: "Tele-MANAS (toll-free)",
    number: "1-800-891-4416",
    detail: "Same service, toll-free number for landlines and non-VoIP calls.",
    hours: "24/7, 365 days",
  },
  {
    name: "HP Health Helpline",
    number: "104",
    detail: "Himachal Pradesh state health helpline. Mental health referrals alongside general health guidance.",
    hours: "24/7",
  },
];

/* ---------- Connection funnel ---------- */

export const connectionSteps: ConnectionStep[] = [
  { icon: "🏠", label: "Pick your anchor", detail: "Choose a coworking/coliving space that runs shared meals and weekly events — this is your 'cold start' solution." },
  { icon: "🤝", label: "Add a recurring activity", detail: "Join one interest-based group: hike club, yoga class, meditation course, chess club, or volunteering programme within your first week." },
  { icon: "📱", label: "Get on the WhatsApp group", detail: "Ask your coworking host for internal community WhatsApp. Most social circuits are venue-led, not publicly posted." },
  { icon: "🗓️", label: "Schedule wellbeing check-ins", detail: "Use Tele-MANAS early if struggling — it's free, 24/7, and connects to professional escalation. Don't wait until distress is acute." },
  { icon: "🔄", label: "Build three circles", detail: "Work community + interest group + wellbeing anchor (clinical/peer support). Redundancy protects against social churn." },
];

/* ---------- Town profiles ---------- */

export const communityTowns: TownCommunity[] = [
  {
    slug: "bir",
    name: "Bir",
    coworkingLevel: "high",
    communitySignals: "Medium",
    mentalHealthAccess: "Medium (via Palampur corridor)",
    aaNa: "NA meetings in town",
    familyFriendliness: "Medium",
    isolationRisk: "medium",
    coworkingSpaces: [
      { name: "Karyashaala by E Living Project", detail: "Bir Colony — 24h access coworking", pricing: "From ₹299/day" },
      { name: "Bir Nest Hostel", detail: "Village Chougan — coworking + hostel combo", pricing: "From ₹100/day" },
      { name: "The Founders Tribe", detail: "Workation homestay with coworking café, ~1 km from Bir market", pricing: "Budget-friendly long stays" },
      { name: "The Hood Bir Billing", detail: "Village Stain — coworking + stay", pricing: "Verify directly" },
      { name: "Barefoot Bir", detail: "Coliving, coworking, café — Om Shanti Guest House, Bir Road", pricing: "Verify directly" },
    ],
    mentalHealthResources: [
      "Tele-MANAS (14416) — free 24/7 counselling",
      "In-person: Vivekananda Medical Institute, Palampur (psychiatry dept)",
      "Private practitioners in wider Kangra region",
    ],
    peerSupport: [
      "NA: 'Awakening Group' at Deer Park, Bir — Friday 4:00 PM (Contact: Samir K, +91 70185 25723)",
      "AA: Nearest verified in McLeodganj (Thursday & Wednesday)",
    ],
    integrationTips: [
      "Highly social inside coworking/hostel circuits but quiet outside them — especially off-season",
      "Flashpackers Bir runs creative volunteering as a 'social onboarding' programme",
      "Choose a venue with shared meals and weekly events to break the cold-start problem",
    ],
  },
  {
    slug: "dharamshala",
    name: "Dharamshala",
    coworkingLevel: "high",
    communitySignals: "High",
    mentalHealthAccess: "High (district hospital + medical college)",
    aaNa: "Nearby (McLeodganj AA)",
    familyFriendliness: "Medium–High",
    isolationRisk: "low-medium",
    coworkingSpaces: [
      { name: "AltSpace", detail: "Coliving + coworking campus in Khaniyara Valley. Private rooms, fast WiFi, power backup, 3 meals/day.", pricing: "See altspaced.com/pricing" },
      { name: "Dharamshala.co", detail: "Dedicated coworking space. Floater & private cabin plans.", pricing: "₹5,000/mo (floater), ₹15–18k/mo (cabin)" },
    ],
    mentalHealthResources: [
      "Tele-MANAS (14416) — free 24/7",
      "Dr. Rajendra Prasad Govt Medical College, Tanda — psychiatry department",
      "Ojas Neuropsychiatry Centre — Kangra/Dharamshala region",
    ],
    peerSupport: [
      "AA: Nearest verified in McLeodganj (Back To Basics Group & Mclordgang Group)",
    ],
    integrationTips: [
      "Easiest town for quick integration — coworking ecosystem + public Meetup group ('Living in Dharamshala')",
      "Join Meetup for hikes, walks, info exchange with other residents",
      "Anchor yourself in one 'recurring room': pick one coworking venue with events",
    ],
  },
  {
    slug: "mcleodganj",
    name: "McLeodganj",
    coworkingLevel: "high",
    communitySignals: "Medium–High",
    mentalHealthAccess: "High (shared catchment with Dharamshala)",
    aaNa: "AA in town (2 groups)",
    familyFriendliness: "Medium",
    isolationRisk: "low-medium",
    coworkingSpaces: [
      { name: "The Other Space (Illiterati)", detail: "Jogibara area — cowork adjacent to famous Illiterati café. 9 AM–9 PM.", pricing: "~₹300/day incl. WiFi + beverage" },
      { name: "The VOID Life", detail: "Bhagsu/Dharamkot — coliving + coworking. All-inclusive monthly packages.", pricing: "From ₹36k/mo (28 nights + coworking + events)" },
    ],
    mentalHealthResources: [
      "Tele-MANAS (14416) — free 24/7",
      "Same catchment as Dharamshala — RPGMC Tanda, Ojas Neuropsychiatry",
    ],
    peerSupport: [
      "AA: 'Back To Basics Group' — Yong Ling School, Sagibera Road — Thu 5:00 PM & 12:00 noon (Contact: Todd M., 018922 20789)",
      "AA: 'The Mclordgang Group' — Loling School — Wed 5:00 PM",
    ],
    integrationTips: [
      "Easy to meet people via 'third place' strategy: coworking café by day, one recurring activity by evening",
      "Dhamma Sikhara (Vipassana centre) near Dharamkot offers high-structure, high-community meditation courses",
      "Main challenge: tourist-season crowding and maintaining stable routines when neighbours rotate weekly",
      "Recurring anchors (AA, meditation courses, a weekly cowork session) reduce churn-driven isolation",
    ],
  },
  {
    slug: "palampur",
    name: "Palampur",
    coworkingLevel: "low",
    communitySignals: "Low",
    mentalHealthAccess: "High (hospital + medical reach)",
    aaNa: "Nearest: Bir NA, McLeodganj AA",
    familyFriendliness: "Medium–High",
    isolationRisk: "medium",
    coworkingSpaces: [
      { name: "None verified", detail: "Workation-friendly homestays exist but no dedicated coworking operator with memberships was identified", pricing: "N/A" },
    ],
    mentalHealthResources: [
      "Tele-MANAS (14416) — free 24/7",
      "Vivekananda Medical Institute — psychiatry services (key anchor for Palampur corridor)",
      "HP Health Helpline (104)",
    ],
    peerSupport: [
      "No Palampur-specific AA/NA meetings found",
      "Nearest: Bir NA (Friday 4 PM), McLeodganj AA (Thu/Wed)",
    ],
    integrationTips: [
      "Newcomer networks route through schools, neighbourhood associations, and hobby groups rather than nomad meetups",
      "For remote workers: no dedicated coworking scene — higher dependence on self-constructed routines",
      "Consider travel to Bir/Dharamshala hubs for community events",
    ],
  },
  {
    slug: "shimla",
    name: "Shimla",
    coworkingLevel: "medium",
    communitySignals: "Low–Medium",
    mentalHealthAccess: "High (medical college — IGMC)",
    aaNa: "NA nearby (Kufri)",
    familyFriendliness: "High",
    isolationRisk: "low-medium",
    coworkingSpaces: [
      { name: "MyBranch Shimla", detail: "4th Floor, SDA Complex, Kasumpti. National chain.", pricing: "Verify at mybranch.in" },
      { name: "Shimla Coworking", detail: "Khalini — serviced office listing. Verify operator directly.", pricing: "Directory rates available" },
    ],
    mentalHealthResources: [
      "Tele-MANAS (14416) — free 24/7",
      "IGMC Shimla — Department of Psychiatry (tertiary level)",
      "HP Health Helpline (104)",
    ],
    peerSupport: [
      "NA: 'Recovery Foundation Group' — Ashray Cottage, Kufri — Tue & Fri 6:30 PM (Helpline: +91 86270 99111)",
      "AA in Shimla proper not found — nearest verified: McLeodganj",
    ],
    integrationTips: [
      "Isolation risk driven by neighbourhood fragmentation (housing far from peers) rather than lack of people",
      "Build three circles: school/child activities + hobby community + work-network anchor",
      "Capital-city effect: most family-services-dense town in the set",
    ],
  },
  {
    slug: "solan",
    name: "Solan",
    coworkingLevel: "medium",
    communitySignals: "Low",
    mentalHealthAccess: "Medium (regional hospital + nearby medical college)",
    aaNa: "Nearest: Kufri NA, McLeodganj AA",
    familyFriendliness: "Medium–High",
    isolationRisk: "medium",
    coworkingSpaces: [
      { name: "Kapacity Coworking", detail: "Kapoor Complex, The Mall, Solan. Mon–Fri 9:30–19:00, Sat 9:00–19:30.", pricing: "Verify directly" },
    ],
    mentalHealthResources: [
      "Tele-MANAS (14416) — free 24/7",
      "Regional Hospital Solan (MS: 01792-223638)",
      "MM Medical College & Hospital, Kumarhatti — psychiatry dept",
      "Shoolini University — 24/7 counselling helpline (student service)",
    ],
    peerSupport: [
      "No Solan-specific AA/NA meetings found",
      "Nearest: Kufri NA, McLeodganj AA",
    ],
    integrationTips: [
      "Social networking tends to be institution-driven (universities, hospitals, Mall Road businesses)",
      "Challenge is finding the 'right circle' — work peers vs local families vs students",
      "Use a coworking venue + a recurring hobby class for practical integration",
    ],
  },
  {
    slug: "manali",
    name: "Manali",
    coworkingLevel: "medium",
    communitySignals: "Low–Medium",
    mentalHealthAccess: "Medium–Low (often via Kullu)",
    aaNa: "Unspecified locally",
    familyFriendliness: "Medium",
    isolationRisk: "medium",
    coworkingSpaces: [
      { name: "Seekers CoWork and Stay", detail: "24/7 coworking, 300 Mbps+ internet, power backup", pricing: "Verify via Coworker listing" },
      { name: "Alt Life Manali", detail: "Clubhouse Road — cowork + stay", pricing: "From ₹300/day" },
    ],
    mentalHealthResources: [
      "Tele-MANAS (14416) — free 24/7",
      "Regional Hospital Kullu — Drug De-addiction Services + general psychiatry",
    ],
    peerSupport: [
      "No Manali-specific AA/NA meetings found",
      "Online/tele AA/NA pathways available",
    ],
    integrationTips: [
      "'Easy mode' in peak season, 'quiet mode' off-season — plan for both",
      "Social life heavily depends on venue programming — choose a base with events",
      "Schedule recurring activity blocks to stabilise your network",
    ],
  },
  {
    slug: "naggar",
    name: "Naggar",
    coworkingLevel: "low-medium",
    communitySignals: "Low",
    mentalHealthAccess: "Low–Medium (via Kullu)",
    aaNa: "Nearest: Kufri NA, Bir NA, McLeodganj AA",
    familyFriendliness: "Low–Medium",
    isolationRisk: "medium-high",
    coworkingSpaces: [
      { name: "NomadGao / Plum Paradise", detail: "Coliving + coworking near Naggar. Workshops and events.", pricing: "From ₹750/day, ₹12,999/week" },
    ],
    mentalHealthResources: [
      "Tele-MANAS (14416) — free 24/7",
      "Routes to Regional Hospital Kullu for in-person care",
    ],
    peerSupport: [
      "No Naggar-specific AA/NA meetings found",
      "Nearest verified: Kufri NA, Bir NA, McLeodganj AA",
    ],
    integrationTips: [
      "Highest isolation risk in this set if you don't enter via a community-led venue",
      "Treat coliving as 'community infrastructure' not just accommodation",
      "Commit to daily shared meals/events for first two weeks, then layer one outward-facing activity",
    ],
  },
];

/* ---------- Sources ---------- */

export const communitySources = [
  { label: "Tele-MANAS Official", url: "https://telemanas.mohfw.gov.in/", description: "Government of India 24/7 tele-mental-health helpline" },
  { label: "AltSpace Dharamshala", url: "https://www.altspaced.com/coliving", description: "Coliving + coworking campus details" },
  { label: "Dharamshala.co", url: "https://dharamshala.co/coworking", description: "Coworking plans and pricing" },
  { label: "NA Meeting List (India)", url: "https://naindia.org/meeting-directory/", description: "Society of Indian Region NA meetings" },
  { label: "AA Meeting List (India)", url: "https://www.aawmig.org/", description: "All-India AA meeting directory" },
  { label: "Living in Dharamshala (Meetup)", url: "https://www.meetup.com/", description: "Public newcomer meetup group for hikes and walks" },
];
