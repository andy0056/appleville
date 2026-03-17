export type DecisionProfileItem = {
  id: string;
  label: string;
  value: string | null;
};

type QuizAnswersLike = Partial<Record<string, string>>;

export function buildDecisionProfile(answers: QuizAnswersLike): DecisionProfileItem[] {
  return [
    {
      id: "stay",
      label: "Stay shape",
      value: getStayShape(answers.stayLength),
    },
    {
      id: "life",
      label: "Life setup",
      value: getLifeSetup(answers.persona),
    },
    {
      id: "pace",
      label: "Pace",
      value: getPacePreference(answers.pace),
    },
    {
      id: "access",
      label: "Access",
      value: getAccessNeed(answers.access),
    },
    {
      id: "pressure",
      label: "Tourist pressure",
      value: getTourismPreference(answers.tourismTolerance),
    },
    {
      id: "priority",
      label: "Primary aim",
      value: getPrimaryAim(answers.optimizeFor, answers.priority),
    },
  ];
}

export const questionHelperText: Partial<Record<string, string>> = {
  stayLength: "Answer for the phase you are realistically planning, not the most romantic version of it.",
  tourismTolerance: "Think about weekday mood, noise, and visitor churn, not just a lively long weekend.",
  optimizeFor: "This helps separate the town you enjoy visiting from the town that supports the next chapter well.",
};

function getStayShape(value?: string) {
  switch (value) {
    case "short":
      return "Short test stay";
    case "medium":
      return "1-3 month trial";
    case "extended":
      return "Medium-term base";
    case "long":
      return "Longer-stay focus";
    default:
      return null;
  }
}

function getLifeSetup(value?: string) {
  switch (value) {
    case "solo-remote":
      return "Solo remote";
    case "creator":
      return "Creator-led";
    case "couple":
      return "Couple rhythm";
    case "family":
      return "Family-oriented";
    case "returning":
      return "Return-move lens";
    default:
      return null;
  }
}

function getPacePreference(value?: string) {
  switch (value) {
    case "quiet":
      return "Quiet preferred";
    case "balanced":
      return "Balanced pace";
    case "some-buzz":
      return "Some social buzz";
    case "energy":
      return "Visible energy";
    default:
      return null;
  }
}

function getAccessNeed(value?: string) {
  switch (value) {
    case "very":
      return "Access matters a lot";
    case "important":
      return "Access matters";
    case "somewhat":
      return "Moderate access need";
    case "low":
      return "Can trade access for fit";
    default:
      return null;
  }
}

function getTourismPreference(value?: string) {
  switch (value) {
    case "low":
      return "Lower tourist pressure";
    case "some":
      return "Manageable visitor energy";
    case "fine":
      return "Tourism is acceptable";
    case "love-it":
      return "Open to lively places";
    default:
      return null;
  }
}

function getPrimaryAim(optimizeFor?: string, priority?: string) {
  switch (optimizeFor) {
    case "deep-work":
      return "Deep-work leaning";
    case "inspiration":
      return "Atmosphere-led";
    case "convenience":
      return "Low-friction living";
    case "home-base":
      return "Home-base oriented";
    default:
      break;
  }

  switch (priority) {
    case "beauty":
      return "Beauty and atmosphere";
    case "practical":
      return "Practical day-to-day fit";
    case "remote":
      return "Remote-work reliability";
    case "family":
      return "Family comfort";
    default:
      return null;
  }
}
