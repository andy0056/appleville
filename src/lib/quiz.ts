import { towns } from "./towns.ts";
import type { Town } from "./towns.ts";

export type QuizAnswerKey =
  | "stayLength"
  | "persona"
  | "budget"
  | "internet"
  | "pace"
  | "tourismTolerance"
  | "priority"
  | "access"
  | "climate"
  | "optimizeFor";

export type QuizAnswers = Partial<Record<QuizAnswerKey, string>>;

export type QuizQuestion = {
  key: QuizAnswerKey;
  label: string;
  options: { value: string; label: string }[];
};

export type MatchLabel = "Best fit" | "Safer fit" | "Aspirational fit" | "Alternative fit";

export type MatchProfile = {
  label: MatchLabel;
  fitSummary: string;
  bestIf: string[];
  watchOutFor: string[];
  whyItRanksHere: string;
  strengthChips: string[];
};

export type ScoredTown = Town & {
  score: number;
  matchProfile: MatchProfile;
};

type TownComparisonDimension =
  | "accessibility"
  | "quiet"
  | "socialEnergy"
  | "aesthetics"
  | "tourismIntensity"
  | "familyFit"
  | "longStayFit";

type ScoreSignal = {
  key: QuizAnswerKey;
  score: number;
  fitText: string;
  chip: string;
};

type CautionSignal = {
  severity: number;
  text: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    key: "stayLength",
    label: "What kind of stay are you considering?",
    options: [
      { value: "short", label: "A short 1–4 week test" },
      { value: "medium", label: "1–3 months" },
      { value: "extended", label: "3–12 months" },
      { value: "long", label: "Long-term / maybe permanent" },
    ],
  },
  {
    key: "persona",
    label: "What best describes you right now?",
    options: [
      { value: "solo-remote", label: "Solo remote worker" },
      { value: "creator", label: "Freelancer / creator" },
      { value: "couple", label: "Couple" },
      { value: "family", label: "Family with children" },
      { value: "returning", label: "Returning Himachali" },
    ],
  },
  {
    key: "budget",
    label: "What monthly budget feels comfortable?",
    options: [
      { value: "tight", label: "Tight" },
      { value: "moderate", label: "Moderate" },
      { value: "comfortable", label: "Comfortable" },
      { value: "flexible", label: "Flexible" },
    ],
  },
  {
    key: "internet",
    label: "How important is reliable internet for your life/work?",
    options: [
      { value: "non-negotiable", label: "Non-negotiable" },
      { value: "important", label: "Important" },
      { value: "nice", label: "Nice to have" },
      { value: "low", label: "Not a major factor" },
    ],
  },
  {
    key: "pace",
    label: "What pace of life do you want?",
    options: [
      { value: "quiet", label: "Quiet and slow" },
      { value: "balanced", label: "Balanced" },
      { value: "some-buzz", label: "Some buzz, but not chaos" },
      { value: "energy", label: "I want energy and people around me" },
    ],
  },
  {
    key: "tourismTolerance",
    label: "How much tourist energy can you tolerate?",
    options: [
      { value: "low", label: "Very little" },
      { value: "some", label: "Some is okay" },
      { value: "fine", label: "I don’t mind" },
      { value: "love-it", label: "I actually like lively places" },
    ],
  },
  {
    key: "priority",
    label: "What matters more to you right now?",
    options: [
      { value: "beauty", label: "Beauty and atmosphere" },
      { value: "practical", label: "Practical day-to-day living" },
      { value: "remote", label: "A strong remote-work lifestyle" },
      { value: "family", label: "Family comfort and access" },
    ],
  },
  {
    key: "access",
    label: "How important is easy access to roads and nearby city connections?",
    options: [
      { value: "very", label: "Very important" },
      { value: "important", label: "Important" },
      { value: "somewhat", label: "Somewhat important" },
      { value: "low", label: "Not very important" },
    ],
  },
  {
    key: "climate",
    label: "What climate do you prefer?",
    options: [
      { value: "cold", label: "Colder mountain feel" },
      { value: "moderate", label: "Moderate weather" },
      { value: "flexible", label: "I’m flexible" },
    ],
  },
  {
    key: "optimizeFor",
    label: "What are you optimizing for most?",
    options: [
      { value: "deep-work", label: "Deep work and peace" },
      { value: "inspiration", label: "Lifestyle and inspiration" },
      { value: "convenience", label: "Convenience and practicality" },
      { value: "home-base", label: "Building a longer-term home base" },
    ],
  },
];

function createSignal(key: QuizAnswerKey, score: number, fitText: string, chip: string): ScoreSignal {
  return { key, score, fitText, chip };
}

function getScoreSignals(town: Town, answers: QuizAnswers) {
  const signals: ScoreSignal[] = [];

  if (answers.stayLength === "short") {
    signals.push(
      createSignal(
        "stayLength",
        town.socialEnergy + town.aesthetics - town.longStayFit * 0.4,
        "it makes more sense as a lively shorter chapter than a deeply rooted move",
        "short-stay energy"
      )
    );
  }
  if (answers.stayLength === "medium") {
    signals.push(
      createSignal(
        "stayLength",
        town.remoteWork + town.aesthetics,
        "it can carry a 1-3 month stay without losing either workability or pull",
        "medium-stay fit"
      )
    );
  }
  if (answers.stayLength === "extended") {
    signals.push(
      createSignal(
        "stayLength",
        town.longStayFit + town.quiet + town.familyFit * 0.4,
        "it holds up better once routine and longer-stay durability start to matter",
        "extended-stay fit"
      )
    );
  }
  if (answers.stayLength === "long") {
    signals.push(
      createSignal(
        "stayLength",
        town.longStayFit * 1.5 + town.familyFit + town.accessibility * 0.5,
        "it reads more like a workable base than a temporary phase",
        "home-base fit"
      )
    );
  }

  if (answers.persona === "solo-remote") {
    signals.push(
      createSignal(
        "persona",
        town.remoteWork + town.aesthetics * 0.5,
        "it suits solo remote life without leaning too heavily on family infrastructure",
        "solo remote fit"
      )
    );
  }
  if (answers.persona === "creator") {
    signals.push(
      createSignal(
        "persona",
        town.aesthetics + town.socialEnergy + town.remoteWork * 0.5,
        "it offers more creative pull and visible human energy than quieter alternatives",
        "creative energy"
      )
    );
  }
  if (answers.persona === "couple") {
    signals.push(
      createSignal(
        "persona",
        town.longStayFit + town.quiet * 0.5 + town.aesthetics * 0.5,
        "it fits a calmer two-person rhythm better than the more scene-driven towns",
        "couple rhythm"
      )
    );
  }
  if (answers.persona === "family") {
    signals.push(
      createSignal(
        "persona",
        town.familyFit * 1.5 + town.accessibility + town.longStayFit * 0.5,
        "it has a steadier family shape than the noisier or more temporary-feeling options",
        "family-ready"
      )
    );
  }
  if (answers.persona === "returning") {
    signals.push(
      createSignal(
        "persona",
        town.longStayFit + town.accessibility + town.affordability,
        "it makes more sense when you want something usable rather than performative",
        "return-fit"
      )
    );
  }

  if (answers.budget === "tight") {
    signals.push(
      createSignal(
        "budget",
        town.affordability * 1.5,
        "it is easier to justify on a tighter budget than the costlier headline towns",
        "easier budget fit"
      )
    );
  }
  if (answers.budget === "moderate") {
    signals.push(
      createSignal(
        "budget",
        town.affordability,
        "it is manageable without requiring a highly flexible budget",
        "moderate budget fit"
      )
    );
  }
  if (answers.budget === "comfortable") {
    signals.push(
      createSignal(
        "budget",
        town.aesthetics * 0.5 + town.remoteWork * 0.5,
        "it makes decent use of a comfortable budget through either atmosphere or workability",
        "comfortable budget"
      )
    );
  }
  if (answers.budget === "flexible") {
    signals.push(
      createSignal(
        "budget",
        town.aesthetics + town.socialEnergy * 0.5,
        "it rewards a more flexible budget with extra atmosphere or energy",
        "aspirational upside"
      )
    );
  }

  if (answers.internet === "non-negotiable") {
    signals.push(
      createSignal(
        "internet",
        town.remoteWork * 1.5 + town.accessibility * 0.5,
        "it lands on the safer side for work continuity and everyday remote routine",
        "safer remote work"
      )
    );
  }
  if (answers.internet === "important") {
    signals.push(
      createSignal(
        "internet",
        town.remoteWork,
        "it is workable enough for regular remote use",
        "remote-work workable"
      )
    );
  }
  if (answers.internet === "nice") {
    signals.push(
      createSignal(
        "internet",
        town.longStayFit * 0.5,
        "it benefits when connectivity is not carrying the entire decision",
        "lifestyle-first fit"
      )
    );
  }
  if (answers.internet === "low") {
    signals.push(
      createSignal(
        "internet",
        town.quiet * 0.5 + town.aesthetics * 0.5,
        "it opens up more easily when work infrastructure is not the main filter",
        "low-internet dependency"
      )
    );
  }

  if (answers.pace === "quiet") {
    signals.push(
      createSignal(
        "pace",
        town.quiet * 1.5 - town.socialEnergy * 0.4,
        "it better matches a quieter day-to-day rhythm",
        "quieter rhythm"
      )
    );
  }
  if (answers.pace === "balanced") {
    signals.push(
      createSignal(
        "pace",
        town.longStayFit + town.accessibility * 0.5,
        "it avoids the extremes of total stillness and constant scene energy",
        "balanced pace"
      )
    );
  }
  if (answers.pace === "some-buzz") {
    signals.push(
      createSignal(
        "pace",
        town.socialEnergy + town.longStayFit * 0.5,
        "it gives you some movement without reading like full chaos",
        "some buzz"
      )
    );
  }
  if (answers.pace === "energy") {
    signals.push(
      createSignal(
        "pace",
        town.socialEnergy * 1.5,
        "it gives you more visible movement and people around you",
        "higher energy"
      )
    );
  }

  if (answers.tourismTolerance === "low") {
    signals.push(
      createSignal(
        "tourismTolerance",
        (6 - town.tourismIntensity) * 1.5,
        "it keeps tourist pressure lower than the obvious headline towns",
        "lower tourist pressure"
      )
    );
  }
  if (answers.tourismTolerance === "some") {
    signals.push(
      createSignal(
        "tourismTolerance",
        3,
        "its level of visitor activity is unlikely to overwhelm you",
        "manageable tourism"
      )
    );
  }
  if (answers.tourismTolerance === "fine") {
    signals.push(
      createSignal(
        "tourismTolerance",
        town.tourismIntensity * 0.5,
        "its tourist energy is probably acceptable for what you want",
        "tourism acceptable"
      )
    );
  }
  if (answers.tourismTolerance === "love-it") {
    signals.push(
      createSignal(
        "tourismTolerance",
        town.tourismIntensity * 1.5,
        "its visitor energy can be part of the appeal rather than the problem",
        "lively atmosphere"
      )
    );
  }

  if (answers.priority === "beauty") {
    signals.push(
      createSignal(
        "priority",
        town.aesthetics * 1.5,
        "it has real visual and atmospheric pull rather than just usability",
        "visual pull"
      )
    );
  }
  if (answers.priority === "practical") {
    signals.push(
      createSignal(
        "priority",
        town.accessibility + town.affordability + town.longStayFit * 0.5,
        "it is stronger on day-to-day usability than pure fantasy",
        "practical edge"
      )
    );
  }
  if (answers.priority === "remote") {
    signals.push(
      createSignal(
        "priority",
        town.remoteWork * 1.5,
        "workability is one of the clearer reasons it rises for you",
        "workability"
      )
    );
  }
  if (answers.priority === "family") {
    signals.push(
      createSignal(
        "priority",
        town.familyFit * 1.5 + town.accessibility,
        "family comfort and access align better here than in the more experimental towns",
        "family comfort"
      )
    );
  }

  if (answers.access === "very") {
    signals.push(
      createSignal(
        "access",
        town.accessibility * 1.5,
        "it handles access and connections better than the slower alternatives",
        "better access"
      )
    );
  }
  if (answers.access === "important") {
    signals.push(
      createSignal(
        "access",
        town.accessibility,
        "it keeps logistics more manageable than the tucked-away options",
        "connection-friendly"
      )
    );
  }
  if (answers.access === "somewhat") {
    signals.push(
      createSignal(
        "access",
        town.accessibility * 0.5,
        "it clears a reasonable access bar without making logistics the whole identity",
        "workable access"
      )
    );
  }
  if (answers.access === "low") {
    signals.push(
      createSignal(
        "access",
        town.quiet * 0.5 + town.aesthetics * 0.5,
        "it benefits when you are comfortable trading convenience for pace or atmosphere",
        "okay with slower access"
      )
    );
  }

  if (answers.climate === "cold") {
    signals.push(
      createSignal(
        "climate",
        town.weatherCold * 1.5,
        "it leans more into the colder mountain feel you asked for",
        "colder climate"
      )
    );
  }
  if (answers.climate === "moderate") {
    signals.push(
      createSignal(
        "climate",
        (6 - town.weatherCold) * 1.2,
        "it stays closer to the more moderate side of the Himachal range",
        "moderate climate"
      )
    );
  }

  if (answers.optimizeFor === "deep-work") {
    signals.push(
      createSignal(
        "optimizeFor",
        town.quiet * 1.5 + town.longStayFit,
        "it is better aligned with focus, repeatable routine, and lower background noise",
        "deep-work fit"
      )
    );
  }
  if (answers.optimizeFor === "inspiration") {
    signals.push(
      createSignal(
        "optimizeFor",
        town.aesthetics * 1.5 + town.socialEnergy * 0.5,
        "it offers more emotional pull, atmosphere, or visible life",
        "inspirational pull"
      )
    );
  }
  if (answers.optimizeFor === "convenience") {
    signals.push(
      createSignal(
        "optimizeFor",
        town.accessibility * 1.5 + town.familyFit * 0.5,
        "it favors easier logistics over mountain mystique",
        "low-friction living"
      )
    );
  }
  if (answers.optimizeFor === "home-base") {
    signals.push(
      createSignal(
        "optimizeFor",
        town.longStayFit * 1.5 + town.familyFit * 0.5,
        "it feels more inhabitable than temporary",
        "home-base fit"
      )
    );
  }

  return signals;
}

function getCautionSignals(town: Town, answers: QuizAnswers) {
  const cautions: CautionSignal[] = [];

  if (answers.stayLength === "long") {
    const severity = Math.max(0, 4 - town.longStayFit);
    if (severity > 0) {
      cautions.push({
        severity,
        text: "for a longer move, this may feel less durable than the safer long-stay towns",
      });
    }
  }

  if (answers.persona === "family") {
    const severity = Math.max(0, 4 - town.familyFit) + Math.max(0, 4 - town.accessibility) * 0.5;
    if (severity > 0) {
      cautions.push({
        severity,
        text: "if family comfort is central, safer options exist in this set",
      });
    }
  }

  if (answers.budget === "tight") {
    const severity = Math.max(0, 3.5 - town.affordability);
    if (severity > 0) {
      cautions.push({
        severity,
        text: "if budget discipline is central, this town may start feeling less forgiving than you want",
      });
    }
  }

  if (answers.internet === "non-negotiable") {
    const severity = Math.max(0, 4 - town.remoteWork) + Math.max(0, 4 - town.accessibility) * 0.5;
    if (severity > 0) {
      cautions.push({
        severity,
        text: "if work reliability is non-negotiable, this is not the safest option in the set",
      });
    }
  }

  if (answers.pace === "quiet") {
    const severity = Math.max(0, town.socialEnergy - town.quiet + 1);
    if (severity > 0) {
      cautions.push({
        severity,
        text: "if you want quiet, this town may feel more outward-facing than you want",
      });
    }
  }

  if (answers.tourismTolerance === "low") {
    const severity = Math.max(0, town.tourismIntensity - 2);
    if (severity > 0) {
      cautions.push({
        severity,
        text: "if you dislike tourist pressure, this town may feel too exposed or busy",
      });
    }
  }

  if (answers.priority === "practical") {
    const severity = Math.max(0, 4 - town.accessibility) + Math.max(0, 3 - town.affordability) * 0.5;
    if (severity > 0) {
      cautions.push({
        severity,
        text: "if everyday usability matters most, this option may feel more atmospheric than practical",
      });
    }
  }

  if (answers.priority === "family") {
    const severity = Math.max(0, 4 - town.familyFit) + Math.max(0, 4 - town.accessibility) * 0.5;
    if (severity > 0) {
      cautions.push({
        severity,
        text: "if family comfort and access are central, this one carries more compromise",
      });
    }
  }

  if (answers.access === "very") {
    const severity = Math.max(0, 4.5 - town.accessibility);
    if (severity > 0) {
      cautions.push({
        severity,
        text: "if easy road access matters, this town may ask for more tolerance than you want",
      });
    }
  }

  if (answers.optimizeFor === "deep-work") {
    const severity = Math.max(0, 4 - town.quiet) + Math.max(0, town.socialEnergy - 3) * 0.5;
    if (severity > 0) {
      cautions.push({
        severity,
        text: "if you are protecting focus, this place may carry more stimulation than ideal",
      });
    }
  }

  if (answers.optimizeFor === "convenience") {
    const severity = Math.max(0, 4.5 - town.accessibility);
    if (severity > 0) {
      cautions.push({
        severity,
        text: "if convenience is the point, this option may feel thinner on logistics",
      });
    }
  }

  if (answers.optimizeFor === "home-base") {
    const severity = Math.max(0, 4 - town.longStayFit);
    if (severity > 0) {
      cautions.push({
        severity,
        text: "if you want a durable home base, this may read more like a phase than a settled answer",
      });
    }
  }

  return cautions;
}

function buildFitSummary(signals: ScoreSignal[]) {
  const topSignals = signals
    .filter((signal) => signal.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  if (topSignals.length === 0) {
    return "It aligns with several parts of your quiz, even if the fit is more balanced than dramatic.";
  }

  if (topSignals.length === 1) {
    return `This rose because ${topSignals[0].fitText}.`;
  }

  return `This rose because ${topSignals[0].fitText}, and ${topSignals[1].fitText}.`;
}

function getTownStrengthChips(town: Town) {
  const chips: string[] = [];

  if (town.accessibility >= 5) chips.push("stronger access");
  if (town.quiet >= 5) chips.push("quieter base");
  if (town.remoteWork >= 4) chips.push("workable remote routine");
  if (town.familyFit >= 5) chips.push("family-ready");
  if (town.longStayFit >= 5) chips.push("long-stay fit");
  if (town.aesthetics >= 5) chips.push("visual pull");
  if (town.tourismIntensity <= 2) chips.push("lower tourist pressure");

  return chips;
}

function buildStrengthChips(town: Town, signals: ScoreSignal[]) {
  const chips = signals
    .filter((signal) => signal.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((signal) => signal.chip);

  return Array.from(new Set([...getTownStrengthChips(town), ...chips])).slice(0, 3);
}

function ensureSentence(text: string) {
  const normalized = text.length > 0 ? `${text[0].toUpperCase()}${text.slice(1)}` : text;
  return /[.!?]$/.test(normalized) ? normalized : `${normalized}.`;
}

function buildBestIf(town: Town, answers: QuizAnswers) {
  const items: string[] = [];

  if (answers.persona === "family" && town.familyFit >= 4) {
    items.push("family routine matters more than scene");
  }
  if (answers.pace === "quiet" && town.quiet >= 4) {
    items.push("you want a quieter daily rhythm");
  }
  if ((answers.priority === "remote" || answers.internet === "non-negotiable") && town.remoteWork >= 4) {
    items.push("work continuity matters more than novelty");
  }
  if ((answers.access === "very" || answers.access === "important") && town.accessibility >= 4) {
    items.push("easy access reduces more stress than atmosphere adds");
  }
  if ((answers.stayLength === "extended" || answers.stayLength === "long" || answers.optimizeFor === "home-base") && town.longStayFit >= 4) {
    items.push("you want a town that can hold up after the first month");
  }
  if (answers.optimizeFor === "inspiration" && town.aesthetics >= 4) {
    items.push("atmosphere still matters to the decision");
  }
  if (answers.tourismTolerance === "low" && town.tourismIntensity <= 2) {
    items.push("lower tourist pressure helps you settle faster");
  }

  const fallback = town.goodFor.map((item) => item.replace(/^people /, "").replace(/^users /, ""));

  return Array.from(new Set([...items, ...fallback])).slice(0, 3);
}

function buildWatchOutFor(town: Town, answers: QuizAnswers) {
  const items = getCautionSignals(town, answers)
    .sort((a, b) => b.severity - a.severity)
    .map((item) => ensureSentence(item.text))
    .slice(0, 2);

  if (items.length >= 2) {
    return items;
  }

  const fallbacks = town.notIdealFor
    .slice(0, 2)
    .map((item) => ensureSentence(`This gets harder if you are ${item}`));

  return Array.from(new Set([...items, ...fallbacks])).slice(0, 2);
}

function buildDifferenceNote(
  town: Town,
  topTowns: Town[]
) {
  const dimensions: TownComparisonDimension[] = [
    "accessibility",
    "quiet",
    "socialEnergy",
    "aesthetics",
    "tourismIntensity",
    "familyFit",
    "longStayFit",
  ];

  const peers = topTowns.filter((item) => item.slug !== town.slug);
  if (peers.length === 0) {
    return "This is the clearest overall fit in the current result set.";
  }

  const deltas = dimensions.map((dimension) => ({
    dimension,
    delta:
      town[dimension] - peers.reduce((sum, peer) => sum + peer[dimension], 0) / peers.length,
  }));

  const strongestPositive = deltas.reduce((best, current) =>
    current.delta > best.delta ? current : best
  );
  const strongestNegative = deltas.reduce((best, current) =>
    current.delta < best.delta ? current : best
  );

  const positiveNotes: Record<TownComparisonDimension, string> = {
    accessibility: "it is the easiest of the top options for access and day-to-day logistics",
    quiet: "it is the quieter, slower option among the top matches",
    socialEnergy: "it carries more movement and visible life than the other top matches",
    aesthetics: "it brings more atmosphere and visual pull than the other top matches",
    tourismIntensity: "it carries more visitor energy and momentum than the other top matches",
    familyFit: "it is the safer family-shape option within the top results",
    longStayFit: "it feels more like a durable base than the other top options",
  };

  const negativeNotes: Record<TownComparisonDimension, string> = {
    accessibility: "it asks for more tolerance around access and errands",
    quiet: "it is less quiet than the calmer alternatives here",
    socialEnergy: "it is not the social-energy pick in this shortlist",
    aesthetics: "it is less about atmosphere and more about function",
    tourismIntensity: "it carries less visitor energy than the more visible options",
    familyFit: "it is less family-shaped than the safer practical picks",
    longStayFit: "it reads more like a phase than the most durable bases here",
  };

  if (strongestPositive.delta >= 0.75 && strongestNegative.delta <= -0.75) {
    return `Compared with the other top matches, ${positiveNotes[strongestPositive.dimension]}, but ${negativeNotes[strongestNegative.dimension]}.`;
  }

  if (strongestPositive.delta >= 0.75) {
    return `Compared with the other top matches, ${positiveNotes[strongestPositive.dimension]}.`;
  }

  if (strongestNegative.delta <= -0.75) {
    return `Compared with the other top matches, ${negativeNotes[strongestNegative.dimension]}.`;
  }

  return "Compared with the other top matches, it lands more as a balanced variation than an extreme.";
}

function getLabelForTopThree(topThree: Town[]) {
  const labelMap = new Map<string, MatchLabel>();

  if (topThree.length === 0) return labelMap;

  labelMap.set(topThree[0].slug, "Best fit");

  const remaining = topThree.slice(1);
  if (remaining.length === 0) return labelMap;

  const lowFrictionScore = (town: Town) =>
    town.accessibility + town.longStayFit + town.familyFit + town.remoteWork + town.affordability;

  const aspirationScore = (town: Town) =>
    town.aesthetics + town.socialEnergy + town.tourismIntensity * 0.5;

  const safer = remaining.reduce((best, current) =>
    lowFrictionScore(current) > lowFrictionScore(best) ? current : best
  );

  labelMap.set(safer.slug, "Safer fit");

  remaining
    .filter((town) => town.slug !== safer.slug)
    .forEach((town) => {
      const isAspirational =
        aspirationScore(town) > lowFrictionScore(town) || town.socialEnergy >= 4 || town.aesthetics >= 5;

      labelMap.set(town.slug, isAspirational ? "Aspirational fit" : "Alternative fit");
    });

  return labelMap;
}

export function scoreTowns(answers: QuizAnswers): ScoredTown[] {
  const rankedWithSignals = towns
    .map((town) => {
      const signals = getScoreSignals(town, answers);
      const score = Number(signals.reduce((sum, signal) => sum + signal.score, 0).toFixed(2));

      return {
        ...town,
        score,
        _signals: signals,
      };
    })
    .sort((a, b) => b.score - a.score);

  const topThree = rankedWithSignals.slice(0, 3);
  const labels = getLabelForTopThree(topThree);

  return rankedWithSignals.map(({ _signals, ...town }, index) => ({
    ...town,
    matchProfile: {
      label: labels.get(town.slug) ?? (index === 0 ? "Best fit" : "Alternative fit"),
      fitSummary: buildFitSummary(_signals),
      bestIf: buildBestIf(town, answers),
      watchOutFor: buildWatchOutFor(town, answers),
      whyItRanksHere:
        index < 3 ? buildDifferenceNote(town, topThree) : "This is a reasonable backup if the top three feel too strong in one direction.",
      strengthChips: buildStrengthChips(town, _signals),
    },
  }));
}

export function getValidAnswersFromSearchParams(
  searchParams: Record<string, string | string[] | undefined>
): QuizAnswers {
  const validKeys = new Set(quizQuestions.map((question) => question.key));
  const answers: QuizAnswers = {};

  for (const [key, rawValue] of Object.entries(searchParams)) {
    if (!validKeys.has(key as QuizAnswerKey)) continue;
    const value = Array.isArray(rawValue) ? rawValue[0] : rawValue;
    if (!value) continue;

    const question = quizQuestions.find((item) => item.key === key);
    const isValidOption = question?.options.some((option) => option.value === value);
    if (isValidOption) {
      answers[key as QuizAnswerKey] = value;
    }
  }

  return answers;
}

export function hasCompleteQuizAnswers(answers: QuizAnswers) {
  return quizQuestions.every((question) => Boolean(answers[question.key]));
}
