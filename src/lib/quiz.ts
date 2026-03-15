import { towns } from "@/lib/towns";

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

export function scoreTowns(answers: QuizAnswers) {
  return towns
    .map((town) => {
      let score = 0;

      if (answers.stayLength === "short") score += town.socialEnergy + town.aesthetics - town.longStayFit * 0.4;
      if (answers.stayLength === "medium") score += town.remoteWork + town.aesthetics;
      if (answers.stayLength === "extended") score += town.longStayFit + town.quiet + town.familyFit * 0.4;
      if (answers.stayLength === "long") score += town.longStayFit * 1.5 + town.familyFit + town.accessibility * 0.5;

      if (answers.persona === "solo-remote") score += town.remoteWork + town.aesthetics * 0.5;
      if (answers.persona === "creator") score += town.aesthetics + town.socialEnergy + town.remoteWork * 0.5;
      if (answers.persona === "couple") score += town.longStayFit + town.quiet * 0.5 + town.aesthetics * 0.5;
      if (answers.persona === "family") score += town.familyFit * 1.5 + town.accessibility + town.longStayFit * 0.5;
      if (answers.persona === "returning") score += town.longStayFit + town.accessibility + town.affordability;

      if (answers.budget === "tight") score += town.affordability * 1.5;
      if (answers.budget === "moderate") score += town.affordability;
      if (answers.budget === "comfortable") score += town.aesthetics * 0.5 + town.remoteWork * 0.5;
      if (answers.budget === "flexible") score += town.aesthetics + town.socialEnergy * 0.5;

      if (answers.internet === "non-negotiable") score += town.remoteWork * 1.5 + town.accessibility * 0.5;
      if (answers.internet === "important") score += town.remoteWork;
      if (answers.internet === "nice") score += town.longStayFit * 0.5;
      if (answers.internet === "low") score += town.quiet * 0.5 + town.aesthetics * 0.5;

      if (answers.pace === "quiet") score += town.quiet * 1.5 - town.socialEnergy * 0.4;
      if (answers.pace === "balanced") score += town.longStayFit + town.accessibility * 0.5;
      if (answers.pace === "some-buzz") score += town.socialEnergy + town.longStayFit * 0.5;
      if (answers.pace === "energy") score += town.socialEnergy * 1.5;

      if (answers.tourismTolerance === "low") score += (6 - town.tourismIntensity) * 1.5;
      if (answers.tourismTolerance === "some") score += 3;
      if (answers.tourismTolerance === "fine") score += town.tourismIntensity * 0.5;
      if (answers.tourismTolerance === "love-it") score += town.tourismIntensity * 1.5;

      if (answers.priority === "beauty") score += town.aesthetics * 1.5;
      if (answers.priority === "practical") score += town.accessibility + town.affordability + town.longStayFit * 0.5;
      if (answers.priority === "remote") score += town.remoteWork * 1.5;
      if (answers.priority === "family") score += town.familyFit * 1.5 + town.accessibility;

      if (answers.access === "very") score += town.accessibility * 1.5;
      if (answers.access === "important") score += town.accessibility;
      if (answers.access === "somewhat") score += town.accessibility * 0.5;
      if (answers.access === "low") score += town.quiet * 0.5 + town.aesthetics * 0.5;

      if (answers.climate === "cold") score += town.weatherCold * 1.5;
      if (answers.climate === "moderate") score += (6 - town.weatherCold) * 1.2;
      if (answers.climate === "flexible") score += 1;

      if (answers.optimizeFor === "deep-work") score += town.quiet * 1.5 + town.longStayFit;
      if (answers.optimizeFor === "inspiration") score += town.aesthetics * 1.5 + town.socialEnergy * 0.5;
      if (answers.optimizeFor === "convenience") score += town.accessibility * 1.5 + town.familyFit * 0.5;
      if (answers.optimizeFor === "home-base") score += town.longStayFit * 1.5 + town.familyFit * 0.5;

      return {
        ...town,
        score: Number(score.toFixed(2)),
      };
    })
    .sort((a, b) => b.score - a.score);
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

export function buildReason(townName: string, answers?: QuizAnswers) {
  const fitSignals: string[] = [];
  const cautionSignals: string[] = [];

  if (answers?.pace === "quiet") {
    fitSignals.push("you leaned toward a quieter day-to-day rhythm");
  } else if (answers?.pace === "energy") {
    fitSignals.push("you seem comfortable with more movement and social energy");
  } else if (answers?.pace === "balanced") {
    fitSignals.push("you appear to want balance rather than extremes");
  }

  if (answers?.priority === "remote") {
    fitSignals.push("remote-work practicality matters a lot to you");
  } else if (answers?.priority === "practical") {
    fitSignals.push("you’re optimizing for real-life usability over fantasy");
  } else if (answers?.priority === "beauty") {
    fitSignals.push("beauty and atmosphere are clearly important in your decision");
  } else if (answers?.priority === "family") {
    fitSignals.push("family comfort and access are central to your choice");
  }

  if (answers?.optimizeFor === "home-base") {
    fitSignals.push("you’re looking for somewhere that can function as a real base, not just a nice phase");
  } else if (answers?.optimizeFor === "deep-work") {
    fitSignals.push("you’re trying to protect peace and focus");
  } else if (answers?.optimizeFor === "inspiration") {
    fitSignals.push("inspiration and emotional pull matter in the choice");
  }

  if (answers?.tourismTolerance === "low") {
    cautionSignals.push("you may have a lower tolerance for heavy tourist energy");
  }
  if (answers?.access === "very") {
    cautionSignals.push("easy access and logistics seem important to you");
  }
  if (answers?.budget === "tight") {
    cautionSignals.push("budget discipline is probably part of the decision");
  }

  const prefix = fitSignals.length
    ? `This fit looks strong because ${fitSignals.slice(0, 2).join(" and ")}.`
    : "This fit looks strong based on the preferences you selected.";

  const townSpecific: Record<string, string> = {
    Palampur:
      "Palampur tends to work when someone wants steadiness, lower noise, and a town that feels livable beyond the first impression.",
    Dharamshala:
      "Dharamshala usually suits people looking for a more balanced mix of access, movement, and longer-stay practicality.",
    Solan:
      "Solan often rises when practicality, access, and lower-friction living matter more than postcard drama.",
    Bir: "Bir usually works best for people who want inspiration, people around them, and a more energetic remote-work rhythm.",
    Shimla:
      "Shimla tends to fit users who need stronger infrastructure, connectivity, and everyday practicality.",
    Naggar:
      "Naggar makes sense when someone values beauty, quiet, and slowness enough to tolerate less convenience.",
    Manali:
      "Manali usually fits users who are more open to intensity, strong scenery, and seasonal energy.",
    McLeodganj:
      "McLeodganj works better for people who enjoy visible social/cultural energy and can tolerate tourist activity.",
  };

  const caution = cautionSignals.length
    ? `One thing to keep in mind: ${cautionSignals[0]}.`
    : "";

  return `${prefix} ${townSpecific[townName] ?? "This town aligns well with the priorities you selected in the quiz."} ${caution}`.trim();
}
