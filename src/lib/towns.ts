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
};

const commonsFile = (fileName: string) =>
  `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(fileName)}`;

export const towns: Town[] = [
  {
    slug: "bir",
    name: "Bir",
    district: "Kangra",
    archetype: "Creative / remote / airy",
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
    goodFor: ["solo remote workers", "creators who like social overlap", "1-3 month tests", "people okay with seasonal buzz"],
    notIdealFor: ["families wanting steadier infrastructure", "people seeking deep quiet", "users who want a fully rooted local feel"],
    remoteWorkReality: "Bir can work well for remote routines if you like cafés, casual coworking energy, and people around you. It is less convincing if your ideal workday depends on privacy, silence, and a fully settled schedule.",
    practicalReality: "This is easier than a tucked-away village, but it still feels like a scene town rather than a full-service base. The appeal is real, but so is the slightly temporary rhythm.",
    stayNotes: "Usually strongest as a shorter experiment or medium stay. Some people do settle in longer, but the town makes more sense when you are comfortable with movement around you.",
    localFeel: "Tea-garden edges, landing-site energy, monasteries, and a casual international crowd give Bir a breezy, semi-nomadic feel.",
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
  },
  {
    slug: "dharamshala",
    name: "Dharamshala",
    district: "Kangra",
    archetype: "Balanced / visible / layered",
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
    goodFor: ["people who want balance", "couples and small families", "remote workers who need access", "longer stays without big-city density"],
    notIdealFor: ["people chasing silence", "ultra-tight budgets", "users who want one compact village feel"],
    remoteWorkReality: "Dharamshala tends to work for remote life because you can build a routine across lower town and upper areas, with enough movement to avoid feeling cut off. The experience still varies a lot by neighborhood.",
    practicalReality: "This is one of the safer bets when schools, healthcare, errands, and road access matter. It is useful precisely because it feels layered rather than perfectly polished.",
    stayNotes: "Best for medium to long stays when you want a usable base first and postcard mood second.",
    localFeel: "Dharamshala feels split-level and mixed: administrative in parts, spiritual and international in others, with more daily movement than smaller towns.",
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
  },
  {
    slug: "mcleodganj",
    name: "McLeodganj",
    district: "Kangra",
    archetype: "Social / spiritual / tourist-heavy",
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
    goodFor: ["short cultural stays", "people who like visible community", "socially curious remote workers", "users drawn to Tibetan and spiritual life"],
    notIdealFor: ["light-sleepers", "families seeking steadiness", "people sensitive to crowding"],
    remoteWorkReality: "You can work from McLeodganj if you are flexible and do not need a low-stimulation environment. As a daily base, it often pulls attention away from deep routine.",
    practicalReality: "The same visibility that makes it compelling also makes it busier, denser, and less friction-free for ordinary living.",
    stayNotes: "Usually stronger as a phase than as a long-term answer. Many people enjoy starting here, then shifting somewhere calmer nearby.",
    localFeel: "Steep lanes, monasteries, cafés, trekking traffic, and visiting students make McLeodganj feel vivid and rarely off-stage.",
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
  },
  {
    slug: "palampur",
    name: "Palampur",
    district: "Kangra",
    archetype: "Grounded / green / long-stay friendly",
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
    goodFor: ["families", "deep-work routines", "returning Himachalis", "people testing slower long stays"],
    notIdealFor: ["people wanting instant social life", "short stays built around buzz", "users who need a big scene around them"],
    remoteWorkReality: "Remote work fits best when you want your day inside a quieter home rhythm rather than around cafés or a social scene.",
    practicalReality: "Palampur feels lived-in. That means less fantasy on day one, but often more stability by month two.",
    stayNotes: "Strong for medium and long stays, especially if you are choosing peace, habit, and lower tourist pressure over novelty.",
    localFeel: "Tea gardens, wider roads, local neighborhoods, and a softer pace make Palampur feel grounded rather than performative.",
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
  },
  {
    slug: "shimla",
    name: "Shimla",
    district: "Shimla",
    archetype: "Urban-hill / practical / connected",
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
    goodFor: ["families with access needs", "professionals who want predictability", "long stays with practical priorities", "people comfortable with urban hill life"],
    notIdealFor: ["people seeking calm mountain space", "tight-budget movers", "users who want a village-scale feel"],
    remoteWorkReality: "Shimla is one of the safer places for remote workers who care more about reliability than mood, though the environment is not especially quiet or spacious.",
    practicalReality: "If you need schools, hospitals, government services, and transport links, Shimla earns its place quickly. If you want simplicity, it can feel crowded and effortful.",
    stayNotes: "Usually better for longer, practical stays than for dreamy trial runs.",
    localFeel: "Colonial core, dense neighborhoods, civic life, and steady traffic make Shimla feel functional first and scenic second.",
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
  },
  {
    slug: "solan",
    name: "Solan",
    district: "Solan",
    archetype: "Accessible / pragmatic / understated",
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
    goodFor: ["families who value connectivity", "returning professionals", "people splitting time with Chandigarh", "practical long-stay movers"],
    notIdealFor: ["people chasing strong mountain atmosphere", "users who want a creative scene", "short stays built around escape"],
    remoteWorkReality: "Remote work is relatively low-friction here if you want stable routines and quick access more than a scenic identity.",
    practicalReality: "Solan starts making more sense once errands, travel time, and long-term livability matter more than image.",
    stayNotes: "Best for medium or long stays where usefulness is part of the goal, not a compromise you resent.",
    localFeel: "Compact, connected, and understated, Solan feels inhabited and serviceable rather than cinematic.",
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
  },
  {
    slug: "manali",
    name: "Manali",
    district: "Kullu",
    archetype: "Iconic / crowded / seasonal intensity",
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
    goodFor: ["short high-energy stays", "people open to constant movement", "outdoor lovers who accept crowding", "users optimizing for scenery over routine"],
    notIdealFor: ["people seeking calm routines", "budget-sensitive long stays", "families wanting low-friction daily life"],
    remoteWorkReality: "You can work from Manali, but steady focus depends a lot on season, which pocket you choose, and your tolerance for constant visitor churn.",
    practicalReality: "It gives you restaurants, visibility, and activity, but that same tourism machine can make ordinary life feel expensive, inconsistent, and crowded.",
    stayNotes: "Best approached as a shorter chapter unless you already know the valley well and can choose your setup carefully.",
    localFeel: "Busy roads, adventure traffic, cafés, and strong scenery make Manali feel cinematic, social, and often overstimulated.",
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
  },
  {
    slug: "naggar",
    name: "Naggar",
    district: "Kullu",
    archetype: "Scenic / quieter / slower",
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
    goodFor: ["quiet remote workers", "artists and reflective stays", "people choosing atmosphere over access", "slower medium-length stays"],
    notIdealFor: ["people needing fast errands and transport", "families wanting practical systems", "users who need strong social overlap"],
    remoteWorkReality: "Naggar can suit focused work if your setup is stable, but it asks you to be comfortable with a thinner support layer than larger towns.",
    practicalReality: "This is the kind of place that rewards intentional slow living. If you keep needing easy transport, variety, and quick fixes, it may wear you down.",
    stayNotes: "Usually best for slower stays or reset periods rather than highly practical relocations.",
    localFeel: "Heritage buildings, orchards, valley views, and a quieter pace make Naggar feel inward and scenic rather than outward-facing.",
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
  },
];

export function getTownBySlug(slug: string) {
  return towns.find((town) => town.slug === slug);
}
