export type TownImageAttribution = {
  author: string;
  href: string;
  license: string;
};

export type TownImage = {
  src: string;
  alt: string;
  attribution: TownImageAttribution;
};

export type CostOfLiving = {
  rent1bhkRange: [number, number];
  rent2bhkRange: [number, number];
  groceriesCouple: [number, number];
  mealForTwo: number;
  coworkingDesk: [number, number] | null;
  colivingPackage: [number, number] | null;
};

export type Utilities = {
  electricityRate: string;
  waterRate: string;
  lpgCylinder: number;
};

export type Healthcare = {
  nearestICU: string;
  icuLocation: string;
  driveTimeMinutes: [number, number];
  notes: string;
};

export type SchoolInfo = {
  notable: string[];
  boards: string[];
  format: string;
};

export type Transport = {
  nearestAirport: string;
  airportDistanceKm: number;
  nearestRailway: string;
  delhiDriveKm: number;
  delhiDriveHours: [number, number];
  volvoFare: [number, number] | null;
};

export type Seasonality = {
  bestMonths: string;
  monsoonRisk: string;
  winterReality: string;
  peakTouristMonths: string;
};

export type Connectivity = {
  isps: string[];
  typicalSpeeds: string;
  reliabilityNote: string;
};

export type DomesticHelp = {
  partTime: [number, number];
  fullDay: [number, number];
};

export type Town = {
  slug: string;
  name: string;
  district: string;
  archetype: string;
  summary: string;
  image: TownImage;
  vibe: string[];
  goodFor: string[];
  notIdealFor: string[];
  remoteWorkReality: string;
  practicalReality: string;
  stayNotes: string;
  localFeel: string;
  discoveryStrengths: (
    | "remoteWork"
    | "familyFit"
    | "quiet"
    | "accessibility"
    | "longStayFit"
    | "socialEnergy"
  )[];
  relatedTownSlugs: string[];
  relatedGuideSlugs: string[];
  budget: "tight" | "moderate" | "comfortable" | "premium";
  affordability: number;
  remoteWork: number;
  accessibility: number;
  socialEnergy: number;
  quiet: number;
  familyFit: number;
  tourismIntensity: number;
  weatherCold: number;
  longStayFit: number;
  aesthetics: number;
  tradeoff: string;
  costOfLiving: CostOfLiving;
  utilities: Utilities;
  healthcare: Healthcare;
  schools: SchoolInfo | null;
  transport: Transport;
  seasonality: Seasonality;
  connectivity: Connectivity;
  domesticHelp: DomesticHelp | null;
};

const commonsFile = (fileName: string) =>
  `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(fileName)}`;

export const towns: Town[] = [
  {
    slug: "bir",
    name: "Bir",
    district: "Kangra",
    archetype: "Digital nomad hub / paragliding gateway / creative energy",
    summary:
      "Bir suits people who want a lighter, more social mountain chapter: plenty of visual pull, a steady trickle of visitors, and an easier on-ramp to remote life than quieter towns nearby.",
    image: {
      src: "/images/towns/bir.jpg",
      alt: "Paraglider above the Bir Billing landing area with low hills in late light",
      attribution: {
        author: "Nitinnn",
        href: commonsFile("Bir-Billing.jpg"),
        license: "CC BY-SA 4.0",
      },
    },
    vibe: ["creative", "airy", "youthful", "active"],
    goodFor: ["freelancers billing US/EU clients who want overlap-hour flexibility", "creators testing 1–3 month mountain chapters", "remote workers who like café and coworking energy (₹3K–6K/mo desks at Altspace)", "people comfortable with seasonal buzz and paragliding crowds"],
    notIdealFor: ["families with school-age children — nearest CBSE/ICSE schools are 15–30 km away in Baijnath and Nurpur", "anyone needing fast ICU access — 45–60 min drive to nearest facility", "people who want a fully rooted, year-round local feel"],
    remoteWorkReality: "JioFiber and Airtel available in main Chaugan area (50–300 Mbps). AirJaldi wireless covers upper hills. Dual-ISP setup strongly recommended for monsoon reliability. Altspace offers coworking desks at ₹3K–6K/mo; coliving packages bundle rent + workspace + meals for ₹20K–30K/mo.",
    practicalReality: "This is easier than a tucked-away village, but it still feels like a scene town rather than a full-service base. The appeal is real, but so is the slightly temporary rhythm.",
    stayNotes: "Usually strongest as a shorter experiment or medium stay. Some people do settle in longer, but the town makes more sense when you are comfortable with movement around you.",
    localFeel: "Tea-garden edges, landing-site energy, monasteries, and a casual international crowd give Bir a breezy, semi-nomadic feel.",
    discoveryStrengths: ["socialEnergy", "remoteWork"],
    relatedTownSlugs: ["dharamshala", "palampur", "mcleodganj"],
    relatedGuideSlugs: ["bir-vs-dharamshala-vs-palampur", "best-himachal-towns-for-remote-workers", "quiet-vs-social-towns-in-himachal"],
    budget: "moderate",
    affordability: 3,
    remoteWork: 4,
    accessibility: 3,
    socialEnergy: 4,
    quiet: 2,
    familyFit: 2,
    tourismIntensity: 4,
    weatherCold: 3,
    longStayFit: 3,
    aesthetics: 5,
    tradeoff: "You get openness, beauty, and easy social overlap, but less rooted calm than Palampur, Solan, or Naggar.",
    costOfLiving: {
      rent1bhkRange: [8000, 15000],
      rent2bhkRange: [10000, 30000],
      groceriesCouple: [8000, 13000],
      mealForTwo: 1000,
      coworkingDesk: [3000, 6000],
      colivingPackage: [20000, 30000],
    },
    utilities: {
      electricityRate: "₹5.45/unit (0–125 units), ₹5.90/unit (126+ units)",
      waterRate: "₹100/month flat (rural connection)",
      lpgCylinder: 965,
    },
    healthcare: {
      nearestICU: "Bhardwaj Multispeciality / Vivekanand Medical Institute",
      icuLocation: "Arla / Palampur",
      driveTimeMinutes: [45, 60],
      notes: "No local ICU — nearest competent facilities are 21–30 km away. Primary Health Centre and Tibetan clinic available for first aid.",
    },
    schools: {
      notable: ["Sacred Soul Cambridge (Nurpur)", "Parmarth International (Baijnath)", "Mount Carmel (Baijnath)"],
      boards: ["CBSE", "ICSE"],
      format: "Day School",
    },
    transport: {
      nearestAirport: "Gaggal Airport (Kangra)",
      airportDistanceKm: 67,
      nearestRailway: "Ahju (narrow gauge, ~3 km)",
      delhiDriveKm: 490,
      delhiDriveHours: [10, 12.5],
      volvoFare: [1200, 1800],
    },
    seasonality: {
      bestMonths: "Mar–May, late Sep–Nov",
      monsoonRisk: "Heavy Dhauladhar monsoon (Jul–Sep). Landslide exposure on access roads. Power and internet outages common.",
      winterReality: "Sub-zero cold periods Dec–Feb. Electric heaters push electricity bills into higher HPSEB slabs.",
      peakTouristMonths: "Oct–Nov (paragliding season), Apr–Jun",
    },
    connectivity: {
      isps: ["JioFiber", "Airtel", "AirJaldi"],
      typicalSpeeds: "50–300 Mbps (fiber in main Chaugan area)",
      reliabilityNote: "AirJaldi wireless covers upper hills. Dual-ISP setup strongly recommended for monsoon reliability.",
    },
    domesticHelp: {
      partTime: [6000, 8000],
      fullDay: [15000, 17000],
    },
  },
  {
    slug: "dharamshala",
    name: "Dharamshala",
    district: "Kangra",
    archetype: "All-rounder / strongest infrastructure in Kangra",
    summary:
      "Dharamshala is one of the easier all-rounders in this set: more services and institutions than quieter towns, but still enough mountain atmosphere to feel like a real change of pace.",
    image: {
      src: "/images/towns/dharamshala.jpg",
      alt: "View over Dharamshala rooftops with the Dhauladhar range behind",
      attribution: {
        author: "Gerd Eichmann",
        href: commonsFile("BirG001-Dharamsala.jpg"),
        license: "CC BY-SA 4.0",
      },
    },
    vibe: ["balanced", "layered", "visible", "practical"],
    goodFor: ["couples and families who need Apex Hospital ICU within 10–20 min", "remote workers wanting NomadGao/The Void coworking (₹4K–7K/mo)", "people who want Gaggal Airport only 15 km away", "longer stays with practical priorities"],
    notIdealFor: ["ultra-tight budgets — 1BHK rents start at ₹10K, furnished 2BHK ₹25K+", "deep-quiet seekers — McLeodganj traffic bleeds into upper Dharamshala", "people wanting one compact village feel"],
    remoteWorkReality: "JioFiber, Airtel Xstream, and AirJaldi all available. Good fiber coverage in lower Dharamshala (50–300 Mbps). NomadGao Vila Nova and The Void offer coworking from ₹4K–7K/mo. Coliving packages from ₹25K/mo include workspace and meals.",
    practicalReality: "This is one of the safer bets when schools, healthcare, errands, and road access matter. It is useful precisely because it feels layered rather than perfectly polished.",
    stayNotes: "Best for medium to long stays when you want a usable base first and postcard mood second.",
    localFeel: "Dharamshala feels split-level and mixed: administrative in parts, spiritual and international in others, with more daily movement than smaller towns.",
    discoveryStrengths: ["accessibility", "remoteWork", "familyFit", "longStayFit", "socialEnergy"],
    relatedTownSlugs: ["palampur", "bir", "shimla"],
    relatedGuideSlugs: ["bir-vs-dharamshala-vs-palampur", "best-himachal-towns-for-remote-workers", "best-himachal-towns-for-families"],
    budget: "moderate",
    affordability: 3,
    remoteWork: 4,
    accessibility: 4,
    socialEnergy: 4,
    quiet: 3,
    familyFit: 4,
    tourismIntensity: 3,
    weatherCold: 3,
    longStayFit: 4,
    aesthetics: 4,
    tradeoff: "You get range and real-life usability, but less stillness and simplicity than Palampur or Naggar.",
    costOfLiving: {
      rent1bhkRange: [10000, 25000],
      rent2bhkRange: [18000, 35000],
      groceriesCouple: [9000, 14000],
      mealForTwo: 1000,
      coworkingDesk: [4000, 7000],
      colivingPackage: [25000, 35000],
    },
    utilities: {
      electricityRate: "₹5.45/unit (0–125 units), ₹5.90/unit (126+ units)",
      waterRate: "Urban volumetric: ₹19.30/KL (0–20 KL)",
      lpgCylinder: 965,
    },
    healthcare: {
      nearestICU: "Apex Multi Speciality Hospital",
      icuLocation: "Dharamshala",
      driveTimeMinutes: [10, 20],
      notes: "Apex offers ICU, CCU, NICU, cardiology, and reconstructive surgery. Dr. RPGMC Tanda (~30 km, ~51 min) provides tertiary government care with 12 ICCU beds.",
    },
    schools: {
      notable: ["International Sahaja Public School"],
      boards: ["ICSE"],
      format: "Coed Day/Boarding",
    },
    transport: {
      nearestAirport: "Gaggal Airport (Kangra)",
      airportDistanceKm: 15,
      nearestRailway: "Pathankot (broad gauge, ~85 km)",
      delhiDriveKm: 480,
      delhiDriveHours: [10, 12.5],
      volvoFare: [639, 1558],
    },
    seasonality: {
      bestMonths: "Mar–May, Sep–Nov",
      monsoonRisk: "Extreme Dhauladhar monsoon: 3,000+ mm rainfall Jul–Sep. ~22 rainy days/month. Road washouts and power cuts.",
      winterReality: "Mild for Himachal: Jan avg high ~14.5°C, low ~5.9°C. Lower town comfortable; upper areas colder.",
      peakTouristMonths: "Apr–Jun, Oct–Nov",
    },
    connectivity: {
      isps: ["JioFiber", "Airtel Xstream", "BSNL", "AirJaldi"],
      typicalSpeeds: "50–300 Mbps (fiber available in main town)",
      reliabilityNote: "Good fiber coverage in lower Dharamshala. Monsoon can disrupt overhead cables — backup connection recommended.",
    },
    domesticHelp: {
      partTime: [6000, 8100],
      fullDay: [15000, 17000],
    },
  },
  {
    slug: "mcleodganj",
    name: "McLeodganj",
    district: "Kangra",
    archetype: "Cultural hotspot / Tibetan institutions / visitor-heavy",
    summary:
      "McLeodganj is the most visibly cultural and visitor-heavy option here: Tibetan institutions, cafés, classes, trekkers, and constant turnover in a compact hill setting.",
    image: {
      src: "/images/towns/mcleodganj.jpg",
      alt: "White stupa and Tibetan prayer flags in McLeodganj",
      attribution: {
        author: "Artemas Liu",
        href: commonsFile("Mcleodganj, Dharmsala (42286147660).jpg"),
        license: "CC BY-SA 2.0",
      },
    },
    vibe: ["social", "spiritual", "touristy", "distinctive"],
    goodFor: ["short cultural stays and spiritual immersion", "socially curious remote workers comfortable with 30–100 Mbps speeds", "people drawn to Tibetan diaspora and monastery life", "users okay with ₹12K–30K/mo rent for the atmosphere"],
    notIdealFor: ["families — ICU is 30–45 min downhill in Dharamshala, nearest school also in Dharamshala", "light sleepers — steep lanes amplify noise from trekking and tourist traffic", "budget-sensitive long stays — highest rents in the Kangra valley"],
    remoteWorkReality: "Fiber availability patchy in upper McLeodganj lanes — many rely on wireless broadband (JioFiber, Airtel, AirJaldi). 30–100 Mbps typical. Tourist-season congestion can degrade speeds. Same NomadGao/Void coworking as Dharamshala accessible for ₹4K–7K/mo.",
    practicalReality: "The same visibility that makes it compelling also makes it busier, denser, and less friction-free for ordinary living.",
    stayNotes: "Usually stronger as a phase than as a long-term answer. Many people enjoy starting here, then shifting somewhere calmer nearby.",
    localFeel: "Steep lanes, monasteries, cafés, trekking traffic, and visiting students make McLeodganj feel vivid and rarely off-stage.",
    discoveryStrengths: ["socialEnergy"],
    relatedTownSlugs: ["dharamshala", "bir", "manali"],
    relatedGuideSlugs: ["quiet-vs-social-towns-in-himachal", "what-people-underestimate-about-moving-to-himachal", "vacation-town-vs-real-life-base"],
    budget: "comfortable",
    affordability: 2,
    remoteWork: 3,
    accessibility: 3,
    socialEnergy: 5,
    quiet: 1,
    familyFit: 2,
    tourismIntensity: 5,
    weatherCold: 4,
    longStayFit: 2,
    aesthetics: 4,
    tradeoff: "You get character and cultural energy fast, but you pay for it in noise, crowding, and long-term calm.",
    costOfLiving: {
      rent1bhkRange: [12000, 30000],
      rent2bhkRange: [20000, 40000],
      groceriesCouple: [10000, 15000],
      mealForTwo: 1200,
      coworkingDesk: [4000, 7000],
      colivingPackage: [25000, 35000],
    },
    utilities: {
      electricityRate: "₹5.45/unit (0–125 units), ₹5.90/unit (126+ units)",
      waterRate: "Urban volumetric: ₹19.30/KL (0–20 KL)",
      lpgCylinder: 965,
    },
    healthcare: {
      nearestICU: "Apex Multi Speciality Hospital",
      icuLocation: "Dharamshala (downhill)",
      driveTimeMinutes: [30, 45],
      notes: "Must descend to Dharamshala for ICU-level care. Peak-season traffic from McLeodganj can extend drive times significantly.",
    },
    schools: {
      notable: ["International Sahaja Public School (Dharamshala)"],
      boards: ["ICSE"],
      format: "Coed Day/Boarding",
    },
    transport: {
      nearestAirport: "Gaggal Airport (Kangra)",
      airportDistanceKm: 20,
      nearestRailway: "Pathankot (broad gauge, ~90 km)",
      delhiDriveKm: 485,
      delhiDriveHours: [10, 13],
      volvoFare: [639, 1558],
    },
    seasonality: {
      bestMonths: "Mar–May, Sep–Nov",
      monsoonRisk: "Same extreme monsoon as Dharamshala. Steep terrain amplifies landslide risk. McLeodganj roads particularly vulnerable.",
      winterReality: "Colder than lower Dharamshala due to higher elevation. Occasional snowfall Dec–Feb.",
      peakTouristMonths: "Apr–Jun, Oct–Nov, late Dec",
    },
    connectivity: {
      isps: ["JioFiber", "Airtel", "AirJaldi"],
      typicalSpeeds: "30–100 Mbps",
      reliabilityNote: "Fiber availability patchy in upper McLeodganj lanes. Many rely on wireless broadband. Tourist-season congestion can degrade speeds.",
    },
    domesticHelp: {
      partTime: [6000, 8100],
      fullDay: [15000, 17000],
    },
  },
  {
    slug: "palampur",
    name: "Palampur",
    district: "Kangra",
    archetype: "Most affordable / tea-garden calm / family-friendly",
    summary:
      "Palampur is one of the clearest long-stay towns in this set: greener, quieter, and more everyday than the places people usually romanticize first.",
    image: {
      src: "/images/towns/palampur.jpg",
      alt: "Snowy Dhauladhar peaks seen from Palampur",
      attribution: {
        author: "Gillimg",
        href: commonsFile("PalampurView1.jpg"),
        license: "CC BY-SA 4.0",
      },
    },
    vibe: ["green", "grounded", "slow", "steady"],
    goodFor: ["families with school-age children — Crescent Public School (CBSE) and DAV within town", "deep-work routines with stable fiber (JioFiber, Airtel, AirJaldi — 50–300 Mbps)", "budget-conscious movers — cheapest rents in the set (₹4K–7K unfurnished 1BHK)", "people wanting Vivekanand Medical Institute ICU within 10–20 min drive"],
    notIdealFor: ["people wanting instant social life — minimal coworking scene, no coliving", "short stays built around buzz — Palampur rewards slower rhythms", "users who need a big scene or international crowd"],
    remoteWorkReality: "One of the better-connected towns. JioFiber, Airtel Xstream, AirJaldi, and BSNL all available (50–300 Mbps). Flat terrain helps cable stability. AirJaldi has strong local presence. Some Altspace coworking options in the wider Kangra area (₹4K–6K/mo).",
    practicalReality: "Palampur feels lived-in. That means less fantasy on day one, but often more stability by month two.",
    stayNotes: "Strong for medium and long stays, especially if you are choosing peace, habit, and lower tourist pressure over novelty.",
    localFeel: "Tea gardens, wider roads, local neighborhoods, and a softer pace make Palampur feel grounded rather than performative.",
    discoveryStrengths: ["quiet", "longStayFit", "familyFit", "remoteWork"],
    relatedTownSlugs: ["dharamshala", "solan", "bir"],
    relatedGuideSlugs: ["bir-vs-dharamshala-vs-palampur", "best-himachal-towns-for-families", "quiet-vs-social-towns-in-himachal"],
    budget: "moderate",
    affordability: 4,
    remoteWork: 3,
    accessibility: 3,
    socialEnergy: 2,
    quiet: 5,
    familyFit: 4,
    tourismIntensity: 1,
    weatherCold: 2,
    longStayFit: 5,
    aesthetics: 4,
    tradeoff: "You gain steadiness and lower noise, but you give up the instant energy that pulls people to Bir or Manali.",
    costOfLiving: {
      rent1bhkRange: [4000, 12000],
      rent2bhkRange: [7000, 15000],
      groceriesCouple: [8000, 12000],
      mealForTwo: 800,
      coworkingDesk: [4000, 6000],
      colivingPackage: null,
    },
    utilities: {
      electricityRate: "₹5.45/unit (0–125 units), ₹5.90/unit (126+ units)",
      waterRate: "₹100/month flat (rural) or ₹19.30/KL (urban)",
      lpgCylinder: 965,
    },
    healthcare: {
      nearestICU: "Vivekanand Medical Institute / Karan Hospital",
      icuLocation: "Palampur",
      driveTimeMinutes: [10, 20],
      notes: "Strong local healthcare with 24-hour Vivekanand Medical Institute. Dr. RPGMC Tanda accessible (~40 km) for tertiary care. Gaggal airport nearby for medical evacuation.",
    },
    schools: {
      notable: ["Crescent Public School", "DAV Public School"],
      boards: ["CBSE"],
      format: "Day School",
    },
    transport: {
      nearestAirport: "Gaggal Airport (Kangra)",
      airportDistanceKm: 40,
      nearestRailway: "Maranda (narrow gauge, ~2 km)",
      delhiDriveKm: 490,
      delhiDriveHours: [10, 12.5],
      volvoFare: [639, 1558],
    },
    seasonality: {
      bestMonths: "Mar–May, Sep–Nov",
      monsoonRisk: "Moderate monsoon Jul–Sep with south-west rains. Less extreme than Dharamshala but roads to Tanda can be affected.",
      winterReality: "Moderate, milder than higher-altitude towns. Temperature range 1°C–15°C. Tea gardens remain green.",
      peakTouristMonths: "Apr–Jun (minimal tourist pressure compared to other towns)",
    },
    connectivity: {
      isps: ["JioFiber", "Airtel Xstream", "AirJaldi", "BSNL"],
      typicalSpeeds: "50–300 Mbps (fiber well-established in town)",
      reliabilityNote: "One of the better-connected towns. AirJaldi has strong presence. Flat terrain helps cable stability.",
    },
    domesticHelp: {
      partTime: [5000, 7000],
      fullDay: [12000, 15000],
    },
  },
  {
    slug: "shimla",
    name: "Shimla",
    district: "Shimla",
    archetype: "Hill city / best institutions / state capital infrastructure",
    summary:
      "Shimla works more like a hill city than a retreat town: stronger institutions, more services, more traffic, and a fuller sense of everyday infrastructure.",
    image: {
      src: "/images/towns/shimla.jpg",
      alt: "View of Shimla hillside buildings and Christ Church under a blue sky",
      attribution: {
        author: "Biswarup Ganguly",
        href: commonsFile("View of Shimla.jpg"),
        license: "CC BY-SA 3.0",
      },
    },
    vibe: ["urban-hill", "connected", "practical", "structured"],
    goodFor: ["families needing Bishop Cotton / Auckland House / DAV schools (ICSE, IGCSE, CBSE)", "anyone who needs IGMC Level 1 trauma ICU within 15–40 min", "professionals wanting best fiber coverage (100–1000 Mbps, multiple ISPs)", "people comfortable with ₹8K–18K 1BHK rents for urban hill life"],
    notIdealFor: ["calm mountain seekers — chronic traffic, parking capacity of just 2.5K–5K vehicles vs lakhs of tourist entries", "tight budgets — Shimla MC water has 30% sewerage surcharge, winter electricity bills spike", "anyone wanting village-scale simplicity"],
    remoteWorkReality: "Best connectivity in the set: JioFiber, Airtel Xstream, BSNL, Netplus all available (100–1000 Mbps). Most reliable infrastructure in Himachal. Spacejam coworking from ₹3K–10K/mo. Urban redundancy means fewer monsoon outages.",
    practicalReality: "If you need schools, hospitals, government services, and transport links, Shimla earns its place quickly. If you want simplicity, it can feel crowded and effortful.",
    stayNotes: "Usually better for longer, practical stays than for dreamy trial runs.",
    localFeel: "Colonial core, dense neighborhoods, civic life, and steady traffic make Shimla feel functional first and scenic second.",
    discoveryStrengths: ["accessibility", "familyFit", "longStayFit", "remoteWork"],
    relatedTownSlugs: ["solan", "dharamshala", "palampur"],
    relatedGuideSlugs: ["best-himachal-towns-for-families", "what-people-underestimate-about-moving-to-himachal", "vacation-town-vs-real-life-base"],
    budget: "comfortable",
    affordability: 2,
    remoteWork: 4,
    accessibility: 5,
    socialEnergy: 3,
    quiet: 2,
    familyFit: 5,
    tourismIntensity: 3,
    weatherCold: 4,
    longStayFit: 4,
    aesthetics: 4,
    tradeoff: "You get the strongest logistics in the set, but much less softness than Palampur, Naggar, or Dharamshala.",
    costOfLiving: {
      rent1bhkRange: [8000, 18000],
      rent2bhkRange: [12000, 30000],
      groceriesCouple: [10000, 15000],
      mealForTwo: 500,
      coworkingDesk: [3000, 10000],
      colivingPackage: null,
    },
    utilities: {
      electricityRate: "₹5.45/unit (0–125 units), ₹5.90/unit (126+ units)",
      waterRate: "Shimla MC: ₹22.93/KL (0–20 KL) + 30% sewerage surcharge",
      lpgCylinder: 958,
    },
    healthcare: {
      nearestICU: "Indira Gandhi Medical College (IGMC)",
      icuLocation: "Shimla City",
      driveTimeMinutes: [15, 40],
      notes: "Most robust medical infrastructure in Himachal. Level 1 trauma capability. Multiple private hospitals. Drive times vary due to chronic traffic congestion.",
    },
    schools: {
      notable: ["Bishop Cotton School", "Auckland House School", "Shimla Public School", "DAV Senior Secondary (New Shimla)"],
      boards: ["ICSE", "IGCSE", "CBSE"],
      format: "Boarding / Day",
    },
    transport: {
      nearestAirport: "Jubbarhatti Airport",
      airportDistanceKm: 23,
      nearestRailway: "Shimla (narrow gauge) / Kalka (broad gauge, ~96 km)",
      delhiDriveKm: 340,
      delhiDriveHours: [7, 9],
      volvoFare: [800, 1200],
    },
    seasonality: {
      bestMonths: "Mar–Jun, Sep–Nov",
      monsoonRisk: "Moderate–heavy monsoon Jul–Sep. Urban drainage issues. Occasional landslides on approach roads.",
      winterReality: "Snowfall Jan–Mar and Dec. Temperatures can drop below 0°C. High electricity bills from heater usage.",
      peakTouristMonths: "Apr–Jun (summer escape), late Dec–Jan (snow rush)",
    },
    connectivity: {
      isps: ["JioFiber", "Airtel Xstream", "BSNL", "Netplus"],
      typicalSpeeds: "100–1000 Mbps (best fiber coverage in the set)",
      reliabilityNote: "Most reliable connectivity in Himachal. Urban infrastructure supports multiple ISPs with good redundancy.",
    },
    domesticHelp: {
      partTime: [6000, 8100],
      fullDay: [15000, 17000],
    },
  },
  {
    slug: "solan",
    name: "Solan",
    district: "Solan",
    archetype: "Closest to Chandigarh / gateway hub / pragmatic base",
    summary:
      "Solan is the least romanticized option here, and that is exactly why it suits some people: easier access, fewer illusions, and a more straightforward daily-life base.",
    image: {
      src: "/images/towns/solan.jpg",
      alt: "Layered hills outside Solan at sunset",
      attribution: {
        author: "Mayankgupta954",
        href: commonsFile("The Lovely Solan Hills.jpg"),
        license: "CC BY-SA 4.0",
      },
    },
    vibe: ["pragmatic", "understated", "accessible", "grounded"],
    goodFor: ["families splitting time with Chandigarh — only 66 km to international airport", "anyone wanting PGIMER Chandigarh (world-class tertiary care) within 1.5–2 hrs", "parents — Dagshai Public School (ICSE) and Chinmaya Vidyalaya (CBSE) within 15 km", "professionals wanting Delhi in 4.5–6 hrs (shortest drive in the set)"],
    notIdealFor: ["people chasing dramatic mountain scenery — Solan is functional, not cinematic", "creative-scene seekers — no coliving or nomad community", "short stays built around escape or atmosphere"],
    remoteWorkReality: "Good fiber coverage along the highway corridor (JioFiber, Airtel, BSNL, Netplus — 50–300 Mbps). Multiple ISP options in developed areas. Kapacity Coworking and Starthub Nation offer desks from ₹5K–8K/mo. Highway proximity makes infrastructure more stable.",
    practicalReality: "Solan starts making more sense once errands, travel time, and long-term livability matter more than image.",
    stayNotes: "Best for medium or long stays where usefulness is part of the goal, not a compromise you resent.",
    localFeel: "Compact, connected, and understated, Solan feels inhabited and serviceable rather than cinematic.",
    discoveryStrengths: ["accessibility", "longStayFit", "familyFit", "remoteWork"],
    relatedTownSlugs: ["shimla", "palampur", "dharamshala"],
    relatedGuideSlugs: ["best-himachal-towns-for-remote-workers", "best-himachal-towns-for-families", "what-people-underestimate-about-moving-to-himachal"],
    budget: "moderate",
    affordability: 4,
    remoteWork: 4,
    accessibility: 5,
    socialEnergy: 2,
    quiet: 3,
    familyFit: 4,
    tourismIntensity: 1,
    weatherCold: 2,
    longStayFit: 4,
    aesthetics: 3,
    tradeoff: "You get a highly usable base, but not the emotional pull people usually mean when they say they want mountain life.",
    costOfLiving: {
      rent1bhkRange: [7000, 16000],
      rent2bhkRange: [15000, 30000],
      groceriesCouple: [8000, 13000],
      mealForTwo: 800,
      coworkingDesk: [5000, 8000],
      colivingPackage: null,
    },
    utilities: {
      electricityRate: "₹5.45/unit (0–125 units), ₹5.90/unit (126+ units)",
      waterRate: "Urban volumetric: ₹19.30/KL (0–20 KL)",
      lpgCylinder: 941,
    },
    healthcare: {
      nearestICU: "M.M. Medical College & Hospital / M Kare Hospital",
      icuLocation: "Solan City",
      driveTimeMinutes: [10, 20],
      notes: "24-hour ICU with medical/surgical/respiratory/burn/paediatric/neonatal units. PGIMER Chandigarh accessible in 1.5–2 hours for elite tertiary care.",
    },
    schools: {
      notable: ["Dagshai Public School", "Chinmaya Vidyalaya (Nauni)"],
      boards: ["ICSE", "CBSE"],
      format: "Boarding / Day",
    },
    transport: {
      nearestAirport: "Chandigarh International Airport",
      airportDistanceKm: 66,
      nearestRailway: "Solan (narrow gauge) / Kalka (broad gauge, ~50 km)",
      delhiDriveKm: 310,
      delhiDriveHours: [4.5, 6],
      volvoFare: [800, 1200],
    },
    seasonality: {
      bestMonths: "Mar–Jun, Sep–Nov",
      monsoonRisk: "Moderate monsoon Jul–Sep. Better-maintained highway infrastructure reduces disruption.",
      winterReality: "Cool, milder than Shimla. Temperature range 1°C–15°C. Lower altitude means less snow and heating costs.",
      peakTouristMonths: "Apr–Jun (minimal tourist pressure)",
    },
    connectivity: {
      isps: ["JioFiber", "Airtel Xstream", "BSNL", "Netplus"],
      typicalSpeeds: "50–300 Mbps (good fiber coverage along highway corridor)",
      reliabilityNote: "Strong connectivity due to highway proximity. Multiple ISP options in developed areas.",
    },
    domesticHelp: {
      partTime: [6000, 8000],
      fullDay: [14000, 17000],
    },
  },
  {
    slug: "manali",
    name: "Manali",
    district: "Kullu",
    archetype: "Iconic scenery / highest rents / extreme seasonal swings",
    summary:
      "Manali is visually powerful and easy to imagine yourself in, but it is also one of the most tourism-shaped towns in this set.",
    image: {
      src: "/images/towns/manali.jpg",
      alt: "Cedar forest and mountain slopes above Manali",
      attribution: {
        author: "Yuvaraj Gurjar",
        href: commonsFile("Manali Himachal Pradesh.jpg"),
        license: "CC BY-SA 4.0",
      },
    },
    vibe: ["iconic", "intense", "beautiful", "touristy"],
    goodFor: ["short high-energy stays and outdoor mountain access", "remote workers who accept 30–100 Mbps speeds and winter disruptions", "people who want Alt Life coworking (₹4K–8K/mo) in Old Manali", "users prioritizing Kullu valley scenery over cost (₹12K–25K 1BHK)"],
    notIdealFor: ["calm routines — 15 km exit jams (10+ hrs in peak winter) are documented reality", "budget-sensitive long stays — highest furnished 2BHK rents (₹25K–40K) in the set", "families — schools are in Kullu town (daily valley commute), ICU also in Kullu (~1 hr)"],
    remoteWorkReality: "Fiber availability uneven across Old Manali vs New Manali (JioFiber, Airtel, BSNL — 30–100 Mbps). Winter storms disrupt service regularly. Dual-ISP essential. Alt Life in Old Manali offers dedicated desks from ₹4K–8K/mo. Coliving packages ₹25K–45K/mo.",
    practicalReality: "It gives you restaurants, visibility, and activity, but that same tourism machine can make ordinary life feel expensive, inconsistent, and crowded.",
    stayNotes: "Best approached as a shorter chapter unless you already know the valley well and can choose your setup carefully.",
    localFeel: "Busy roads, adventure traffic, cafés, and strong scenery make Manali feel cinematic, social, and often overstimulated.",
    discoveryStrengths: ["socialEnergy"],
    relatedTownSlugs: ["naggar", "mcleodganj", "bir"],
    relatedGuideSlugs: ["quiet-vs-social-towns-in-himachal", "vacation-town-vs-real-life-base", "how-to-test-a-move-before-committing"],
    budget: "comfortable",
    affordability: 2,
    remoteWork: 3,
    accessibility: 3,
    socialEnergy: 5,
    quiet: 2,
    familyFit: 2,
    tourismIntensity: 5,
    weatherCold: 5,
    longStayFit: 2,
    aesthetics: 5,
    tradeoff: "You get drama and movement, but much less day-to-day ease than quieter Kullu valley alternatives.",
    costOfLiving: {
      rent1bhkRange: [12000, 25000],
      rent2bhkRange: [18000, 40000],
      groceriesCouple: [10000, 15000],
      mealForTwo: 600,
      coworkingDesk: [4000, 8000],
      colivingPackage: [25000, 45000],
    },
    utilities: {
      electricityRate: "₹5.45/unit (0–125 units), ₹5.90/unit (126+ units)",
      waterRate: "Urban: ₹19.30/KL (0–20 KL)",
      lpgCylinder: 941,
    },
    healthcare: {
      nearestICU: "Civil Hospital Manali / Kullu Valley Hospital",
      icuLocation: "Manali / Kullu",
      driveTimeMinutes: [10, 45],
      notes: "Civil Hospital in Manali for stabilization. Kullu Valley Hospital (~50 km, ~1 hr) has ICU. Complex cases referred to Mandi, Chandigarh, or Shimla.",
    },
    schools: {
      notable: ["Kullu Valley SSS", "Day Star School", "Trinity School", "Our Lady Of The Snows"],
      boards: ["ICSE"],
      format: "Day School",
    },
    transport: {
      nearestAirport: "Kullu-Manali Airport (Bhuntar)",
      airportDistanceKm: 50,
      nearestRailway: "Chandigarh / Pathankot (require long onward drives)",
      delhiDriveKm: 550,
      delhiDriveHours: [12.5, 14],
      volvoFare: [1150, 1200],
    },
    seasonality: {
      bestMonths: "Mar–Jun, Sep–Oct",
      monsoonRisk: "High vulnerability: Chandigarh–Manali highway frequently blocked by floods and landslides Jul–Sep.",
      winterReality: "Severe: −7°C to 15°C. Heavy snowfall Dec–Mar. Manali–Leh highway closed late Nov to late May. Frozen pipes common in uninsulated homes.",
      peakTouristMonths: "Apr–Jun (summer escape), late Dec–Jan (snow rush — causes 10+ hr traffic jams)",
    },
    connectivity: {
      isps: ["JioFiber", "Airtel", "BSNL"],
      typicalSpeeds: "30–100 Mbps",
      reliabilityNote: "Fiber availability uneven across Old Manali vs New Manali. Winter storms can disrupt service. Dual-ISP essential.",
    },
    domesticHelp: {
      partTime: [7000, 9000],
      fullDay: [15000, 18000],
    },
  },
  {
    slug: "naggar",
    name: "Naggar",
    district: "Kullu",
    archetype: "Kullu valley quiet / half-price Manali / rustic atmosphere",
    summary:
      "Naggar is a slower, more atmospheric alternative in the Kullu valley, better for people who want beauty and quiet than convenience or social density.",
    image: {
      src: "/images/towns/naggar.jpg",
      alt: "Valley view and river bend near Naggar under cloud and light",
      attribution: {
        author: "Captain Skywalker",
        href: commonsFile("View naggar.jpg"),
        license: "CC BY-SA 4.0",
      },
    },
    vibe: ["poetic", "slow", "quiet", "scenic"],
    goodFor: ["quiet remote workers wanting Kullu valley at half Manali’s rent (₹6K–15K 1BHK)", "artists and reflective stays in traditional Kath-Kuni architecture", "people wanting coliving (GoStops, Pahadi Robinhood — ₹15K–30K/mo)", "Bhuntar Airport only 30 km away"],
    notIdealFor: ["families — no local ICU (30–45 min to Manali/Kullu), schools in Kullu town", "people needing fast errands and reliable transport", "users who need strong social overlap or big coworking community"],
    remoteWorkReality: "AirJaldi wireless is the primary reliable option (30–100 Mbps). JioFiber and BSNL also available but fiber patchy. Progressive coliving spaces like GoStops and The North often provide their own connectivity. Daily workspace rates ₹500–800.",
    practicalReality: "This is the kind of place that rewards intentional slow living. If you keep needing easy transport, variety, and quick fixes, it may wear you down.",
    stayNotes: "Usually best for slower stays or reset periods rather than highly practical relocations.",
    localFeel: "Heritage buildings, orchards, valley views, and a quieter pace make Naggar feel inward and scenic rather than outward-facing.",
    discoveryStrengths: ["quiet", "remoteWork"],
    relatedTownSlugs: ["manali", "palampur", "bir"],
    relatedGuideSlugs: ["quiet-vs-social-towns-in-himachal", "best-himachal-towns-for-remote-workers", "vacation-town-vs-real-life-base"],
    budget: "moderate",
    affordability: 3,
    remoteWork: 2,
    accessibility: 2,
    socialEnergy: 2,
    quiet: 5,
    familyFit: 2,
    tourismIntensity: 2,
    weatherCold: 4,
    longStayFit: 3,
    aesthetics: 5,
    tradeoff: "You get calm and atmosphere that Manali often cannot give, but you pay with convenience and day-to-day flexibility.",
    costOfLiving: {
      rent1bhkRange: [6000, 15000],
      rent2bhkRange: [10000, 18000],
      groceriesCouple: [8000, 13000],
      mealForTwo: 800,
      coworkingDesk: [4000, 8000],
      colivingPackage: [15000, 30000],
    },
    utilities: {
      electricityRate: "₹5.45/unit (0–125 units), ₹5.90/unit (126+ units)",
      waterRate: "₹100/month flat (rural connection)",
      lpgCylinder: 941,
    },
    healthcare: {
      nearestICU: "Civil Hospital Manali / Kullu Valley Hospital",
      icuLocation: "Manali / Kullu",
      driveTimeMinutes: [30, 45],
      notes: "No local multi-specialty ICU. Must reach Manali (~22 km) or Kullu for critical care. Significant geographic delay for emergencies.",
    },
    schools: {
      notable: ["Kullu Valley SSS (Kullu)", "Day Star School (Kullu)"],
      boards: ["ICSE"],
      format: "Day School",
    },
    transport: {
      nearestAirport: "Kullu-Manali Airport (Bhuntar)",
      airportDistanceKm: 30,
      nearestRailway: "Joginder Nagar (narrow gauge)",
      delhiDriveKm: 589,
      delhiDriveHours: [13, 15],
      volvoFare: [1150, 1200],
    },
    seasonality: {
      bestMonths: "Mar–Jun, Sep–Oct",
      monsoonRisk: "Same Kullu corridor vulnerability as Manali. Access road from highway can be cut by landslides.",
      winterReality: "Severe winter with heavy snowfall Dec–Mar. Temperature similar to Manali. Traditional Kath-Kuni homes offer better insulation.",
      peakTouristMonths: "Apr–Jun, Oct (less intense than Manali)",
    },
    connectivity: {
      isps: ["JioFiber", "AirJaldi", "BSNL"],
      typicalSpeeds: "30–100 Mbps",
      reliabilityNote: "AirJaldi wireless is the primary reliable option. Fiber patchy. Progressive coliving spaces often provide their own connectivity.",
    },
    domesticHelp: {
      partTime: [5000, 7000],
      fullDay: [12000, 15000],
    },
  },
];

export function getTownBySlug(slug: string) {
  return towns.find((town) => town.slug === slug);
}
