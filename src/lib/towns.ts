export type Town = {
  slug: string;
  name: string;
  district: string;
  archetype: string;
  summary: string;
  vibe: string[];
  goodFor: string[];
  notIdealFor: string[];
  remoteWorkReality: string;
  practicalReality: string;
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
  pros: string[];
  cons: string[];
  tradeoff: string;
};

export const towns: Town[] = [
  {
    slug: "bir",
    name: "Bir",
    district: "Kangra",
    archetype: "Creative / remote / airy",
    summary:
      "A high-energy mountain base with a creative crowd, plenty of movement, and a strong pull for short-to-medium term remote living.",
    vibe: ["creative", "airy", "youthful", "active"],
    goodFor: ["freelancers", "creators", "short stays", "social remote workers"],
    notIdealFor: ["families needing stability", "people wanting deep quiet", "very access-sensitive users"],
    remoteWorkReality: "Bir works best when you want a lively remote-work rhythm, casual social overlap, and don’t mind some transience around you.",
    practicalReality: "It feels inspiring fast, but that same energy can make it less grounded for people trying to settle into a stable long routine.",
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
    pros: ["Strong remote-work energy", "Easy to meet people", "Beautiful setting"],
    cons: ["Can feel transient", "Not the quietest option", "Tourism energy is real"],
    tradeoff: "Great for inspiration and movement, weaker for grounded long-term quiet living.",
  },
  {
    slug: "dharamshala",
    name: "Dharamshala",
    district: "Kangra",
    archetype: "Balanced / visible / layered",
    summary:
      "A well-known mountain town that balances everyday practicality with culture, movement, and long-stay possibility.",
    vibe: ["balanced", "layered", "visible", "practical"],
    goodFor: ["remote workers", "couples", "returning Himachalis", "longer stays"],
    notIdealFor: ["people needing total quiet", "users chasing very low costs", "those wanting a tiny-town feel"],
    remoteWorkReality: "Dharamshala is one of the more balanced bets if you need reasonable access, enough movement, and a place that can support actual work rhythm.",
    practicalReality: "It offers more real-life balance than the dreamier towns, but that also means living with more movement and unevenness.",
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
    pros: ["Good balance of life and access", "Reasonably workable for remote life", "Layered town character"],
    cons: ["Can still feel busy", "Not the cheapest option", "Some unevenness across neighborhoods"],
    tradeoff: "One of the most balanced choices, but not as quiet as calmer alternatives.",
  },
  {
    slug: "mcleodganj",
    name: "McLeodganj",
    district: "Kangra",
    archetype: "Social / spiritual / tourist-heavy",
    summary:
      "Lively, visible, and culturally distinctive — compelling for energy and community, less ideal for people wanting stillness.",
    vibe: ["social", "spiritual", "touristy", "distinctive"],
    goodFor: ["short stays", "social people", "spiritually curious users"],
    notIdealFor: ["quiet-focused users", "long-term family settling", "people sensitive to tourism"],
    remoteWorkReality: "You can work from here, but the environment pulls more toward stimulation and movement than deep consistency.",
    practicalReality: "What makes McLeodganj interesting also makes it noisy, visible, and less stable as a low-friction base.",
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
    pros: ["Strong social/cultural energy", "Recognizable identity", "Easy to feel immersed quickly"],
    cons: ["Heavy tourist feel", "Can get noisy", "Less grounded for long-term calm"],
    tradeoff: "Magnetic for energy and atmosphere, weaker for a stable long-term base.",
  },
  {
    slug: "palampur",
    name: "Palampur",
    district: "Kangra",
    archetype: "Grounded / green / long-stay friendly",
    summary:
      "Greener, calmer, and often more practical for people who want peace, routine, and a steadier mountain life.",
    vibe: ["green", "grounded", "slow", "steady"],
    goodFor: ["families", "deep work", "long stays", "returning Himachalis"],
    notIdealFor: ["people wanting buzz", "fast social churn", "high-energy short stays"],
    remoteWorkReality: "Palampur suits people who want work to sit inside a steadier life, not inside a constantly stimulating scene.",
    practicalReality: "It feels more like somewhere you could build a routine than somewhere you’re constantly performing mountain life.",
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
    pros: ["Quiet and grounded", "Long-term friendly", "Lower tourist pressure"],
    cons: ["Less social buzz", "Can feel too slow for some", "Not the most aspirational brand town"],
    tradeoff: "Excellent for steadiness and peace, not ideal if you want scene and momentum.",
  },
  {
    slug: "shimla",
    name: "Shimla",
    district: "Shimla",
    archetype: "Urban-hill / practical / connected",
    summary:
      "A hill city rather than a dreamy hideaway — useful for people who need stronger access, infrastructure, and everyday practicality.",
    vibe: ["urban-hill", "connected", "practical", "structured"],
    goodFor: ["families", "professionals", "long stays", "practical users"],
    notIdealFor: ["people chasing stillness", "very budget-sensitive users", "tiny-town romantics"],
    remoteWorkReality: "Shimla is one of the safer choices when you care about infrastructure, consistency, and being able to handle everyday life without too much friction.",
    practicalReality: "It gives you more city-like utility inside the hills, which is useful — but it also means more crowd, cost, and structure.",
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
    pros: ["Best infrastructure mix in this set", "Strong access", "Good family practicality"],
    cons: ["Less serene", "Can feel crowded", "Costs can climb quickly"],
    tradeoff: "Better for real-life logistics than romantic mountain fantasy.",
  },
  {
    slug: "solan",
    name: "Solan",
    district: "Solan",
    archetype: "Accessible / pragmatic / understated",
    summary:
      "A less romanticized but often highly practical option for people optimizing for access, livability, and a more grounded base.",
    vibe: ["pragmatic", "understated", "accessible", "grounded"],
    goodFor: ["families", "practical movers", "long stays", "returning professionals"],
    notIdealFor: ["people seeking strong mountain romance", "social-scene seekers", "short-stay dreamers"],
    remoteWorkReality: "Solan is attractive when reliability and reach matter more than an aestheticized mountain identity.",
    practicalReality: "It may not trigger fantasy, but it often makes more sense once you start thinking about daily life instead of visuals.",
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
    pros: ["Highly practical", "Strong access", "More livable than glamorous"],
    cons: ["Less magic on first impression", "Less creative/social energy", "Can feel too functional"],
    tradeoff: "A smart base for practicality, not for people chasing pure mountain romance.",
  },
  {
    slug: "manali",
    name: "Manali",
    district: "Kullu",
    archetype: "Iconic / crowded / seasonal intensity",
    summary:
      "Beautiful and iconic, but often heavier on tourism, seasonal swings, and chaos than people first imagine.",
    vibe: ["iconic", "intense", "beautiful", "touristy"],
    goodFor: ["short stays", "people who enjoy movement", "visual inspiration"],
    notIdealFor: ["people wanting calm", "budget-sensitive movers", "low-friction long stays"],
    remoteWorkReality: "Manali can work if you accept the chaos as part of the deal, but it’s rarely the most grounded answer for steady deep work.",
    practicalReality: "It is often better as an exciting chapter than as the simplest long-term base.",
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
    pros: ["High visual appeal", "Lots of energy", "Strong name recognition"],
    cons: ["Crowded", "Seasonally intense", "Can be impractical for steady long stays"],
    tradeoff: "Powerful as a dream location, weaker as a low-friction daily base.",
  },
  {
    slug: "naggar",
    name: "Naggar",
    district: "Kullu",
    archetype: "Scenic / quieter / slower",
    summary:
      "A quieter and more poetic alternative in the Kullu valley for people who care more about atmosphere and calm than convenience.",
    vibe: ["poetic", "slow", "quiet", "scenic"],
    goodFor: ["deep work", "slow stays", "artists", "quiet seekers"],
    notIdealFor: ["people needing easy access", "family practicality", "strong convenience seekers"],
    remoteWorkReality: "Naggar fits people who can trade some convenience for atmosphere, calm, and a more contemplative environment.",
    practicalReality: "It rewards people who genuinely want slower living; it frustrates people who secretly want easy logistics.",
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
    pros: ["Beautiful and calm", "Lower chaos than Manali", "Strong atmosphere"],
    cons: ["Weaker convenience", "Remote-work practicality may vary", "Not ideal for access-heavy needs"],
    tradeoff: "Excellent for calm and beauty, but convenience takes a hit.",
  },
];

export function getTownBySlug(slug: string) {
  return towns.find((town) => town.slug === slug);
}
