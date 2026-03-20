import { getGuideBySlug } from "../../guides.ts";
import { townSectionAnchors } from "../../content-anchors.ts";
import { getTownBySlug, towns, type Town } from "../../towns.ts";
import type { AssistantIntent, AssistantTopic } from "../types.ts";
import {
  buildCitation,
  buildCompareLink,
  buildGuideLink,
  buildTownProfileLink,
  dedupeNextLinks,
  ensureKeyPoints,
  summarizeText,
  type AssistantResponderResult,
} from "./shared.ts";

type TownScoreDimension =
  | "remoteWork"
  | "accessibility"
  | "socialEnergy"
  | "quiet"
  | "familyFit"
  | "tourismIntensity"
  | "longStayFit"
  | "aesthetics";

type TownWeights = Partial<Record<TownScoreDimension, number>>;

function addWeights(base: TownWeights, weights: TownWeights) {
  const next = { ...base };
  for (const [key, value] of Object.entries(weights)) {
    next[key as TownScoreDimension] = (next[key as TownScoreDimension] ?? 0) + (value ?? 0);
  }
  return next;
}

function getDominantTopic(topics: AssistantTopic[]) {
  return (
    topics.find((topic) =>
      ["remote-work", "family", "quiet", "access", "long-stay", "social"].includes(topic),
    ) ?? "town-fit"
  );
}

function getWeightsForTopics(topics: AssistantTopic[]): TownWeights {
  let weights: TownWeights = {
    longStayFit: 2,
    accessibility: 2,
    quiet: 1,
    remoteWork: 1,
  };

  topics.forEach((topic) => {
    switch (topic) {
      case "remote-work":
        weights = addWeights(weights, {
          remoteWork: 4,
          accessibility: 2,
          longStayFit: 2,
          quiet: 1,
        });
        break;
      case "family":
        weights = addWeights(weights, {
          familyFit: 4,
          quiet: 2,
          accessibility: 2,
          longStayFit: 2,
        });
        break;
      case "quiet":
        weights = addWeights(weights, {
          quiet: 4,
          longStayFit: 2,
          socialEnergy: -1,
          tourismIntensity: -2,
        });
        break;
      case "access":
        weights = addWeights(weights, {
          accessibility: 4,
          longStayFit: 1,
          remoteWork: 1,
        });
        break;
      case "long-stay":
        weights = addWeights(weights, {
          longStayFit: 4,
          quiet: 1,
          accessibility: 1,
          familyFit: 1,
        });
        break;
      case "social":
        weights = addWeights(weights, {
          socialEnergy: 4,
          aesthetics: 1,
          tourismIntensity: 1,
        });
        break;
      default:
        break;
    }
  });

  return weights;
}

function scoreTown(town: Town, weights: TownWeights) {
  return Object.entries(weights).reduce((total, [dimension, weight]) => {
    return total + town[dimension as TownScoreDimension] * (weight ?? 0);
  }, 0);
}

function getTopicLabel(topic: AssistantTopic) {
  switch (topic) {
    case "remote-work":
      return "remote work";
    case "family":
      return "family life";
    case "quiet":
      return "quiet living";
    case "access":
      return "easy access";
    case "long-stay":
      return "a longer stay";
    case "social":
      return "social energy";
    default:
      return "fit";
  }
}

function getRelevantAnchor(topic: AssistantTopic) {
  switch (topic) {
    case "remote-work":
      return townSectionAnchors.remoteWorkReality;
    case "family":
    case "quiet":
    case "access":
    case "long-stay":
      return townSectionAnchors.bestFor;
    default:
      return townSectionAnchors.overview;
  }
}

function buildTownFitLine(town: Town, topic: AssistantTopic) {
  switch (topic) {
    case "remote-work":
      return `${town.name}: ${summarizeText(town.remoteWorkReality, 1, 130)}`;
    case "family":
      return `${town.name}: ${summarizeText(town.goodFor.join(". "), 1, 130)}`;
    case "quiet":
      return `${town.name}: quiet ${town.quiet}/5, with ${summarizeText(town.tradeoff, 1, 100).toLowerCase()}`;
    case "access":
      return `${town.name}: access ${town.accessibility}/5, with ${summarizeText(town.practicalReality, 1, 110).toLowerCase()}`;
    case "long-stay":
      return `${town.name}: long-stay ${town.longStayFit}/5, with ${summarizeText(town.stayNotes, 1, 120).toLowerCase()}`;
    case "social":
      return `${town.name}: social energy ${town.socialEnergy}/5, with ${summarizeText(town.localFeel, 1, 110).toLowerCase()}`;
    default:
      return `${town.name}: ${summarizeText(town.summary, 1, 130)}`;
  }
}

function getGuideForTopic(topic: AssistantTopic) {
  switch (topic) {
    case "remote-work":
      return "best-himachal-towns-for-remote-workers";
    case "family":
      return "best-himachal-towns-for-families";
    case "quiet":
    case "social":
      return "quiet-vs-social-towns-in-himachal";
    case "long-stay":
      return "vacation-town-vs-real-life-base";
    default:
      return "what-people-underestimate-about-moving-to-himachal";
  }
}

function getComparisonFocusLabel(topic: AssistantTopic) {
  switch (topic) {
    case "remote-work":
      return "for remote work";
    case "family":
      return "for family routine";
    case "quiet":
      return "as a calmer everyday base";
    case "access":
      return "for easier access and errands";
    case "long-stay":
      return "as a steadier everyday base";
    case "social":
      return "if you want more visible social energy";
    default:
      return "as a steadier everyday base";
  }
}

function getOrderedComparisonTowns(intent: AssistantIntent) {
  const slugs = intent.queryFrame.comparisonTownSlugs.length
    ? intent.queryFrame.comparisonTownSlugs
    : intent.townSlugs;

  return slugs
    .map((slug) => getTownBySlug(slug))
    .filter((town): town is NonNullable<typeof town> => Boolean(town));
}

function buildRankingResponse(intent: AssistantIntent): AssistantResponderResult {
  const dominantTopic = getDominantTopic(intent.topics);
  const weights = getWeightsForTopics(intent.topics);
  const ranked = towns
    .map((town) => ({ town, score: scoreTown(town, weights) }))
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
    .map((entry) => entry.town);

  const [topTown, secondTown, thirdTown] = ranked;
  const answer =
    dominantTopic === "remote-work"
      ? `${topTown.name} is the clearest remote-work answer in the current set, with ${secondTown.name} and ${thirdTown.name} making sense if you want either quieter routine or lower-friction access.`
      : dominantTopic === "family"
        ? `${topTown.name} looks strongest for family life in the current set, with ${secondTown.name} and ${thirdTown.name} as the steadier alternatives depending on how much quiet or access you need.`
        : dominantTopic === "quiet"
          ? `${topTown.name} protects quiet best in the current set, while ${secondTown.name} and ${thirdTown.name} give you calmer living with a bit more support or usability.`
          : dominantTopic === "access"
            ? `${topTown.name} is the strongest access-first option in the current set, with ${secondTown.name} and ${thirdTown.name} as the next practical answers.`
            : dominantTopic === "long-stay"
              ? `${topTown.name} reads as the steadiest longer-stay answer in the current set, with ${secondTown.name} and ${thirdTown.name} depending on whether you want more support or more atmosphere.`
              : `${topTown.name} is the clearest fit in the current set for this question, with ${secondTown.name} and ${thirdTown.name} as the next live options.`;

  const guideSlug = getGuideForTopic(dominantTopic);
  const guide = getGuideBySlug(guideSlug);

  return {
    answer,
    keyPoints: ensureKeyPoints(
      ranked.map((town) => buildTownFitLine(town, dominantTopic)),
    ),
    caution: summarizeText(
      `${topTown.tradeoff} ${secondTown.tradeoff}`,
      2,
      180,
    ),
    citations: ranked.slice(0, 3).map((town) =>
      buildCitation(
        `${town.name}, Himachal`,
        `/towns/${town.slug}#${getRelevantAnchor(dominantTopic)}`,
        dominantTopic === "remote-work" ? "Remote-work reality" : "Best for",
        summarizeText(
          dominantTopic === "remote-work" ? town.remoteWorkReality : town.goodFor.join(". "),
          1,
          120,
        ),
      ),
    ),
    nextLinks: dedupeNextLinks(
      [
        buildCompareLink(
          ranked.map((town) => town.slug),
          "Compare the shortlist side by side across fit dimensions.",
        ),
        buildTownProfileLink(topTown.slug),
        guide ? buildGuideLink(guide.slug) : null,
      ].filter((item): item is NonNullable<typeof item> => Boolean(item)),
    ),
    confidence: "high",
    resolvedTownSlugs: ranked.map((town) => town.slug),
    resolvedPageTypes: ["town", "guide"],
  };
}

function buildSingleTownResponse(intent: AssistantIntent, town: Town): AssistantResponderResult {
  const dominantTopic = getDominantTopic(intent.topics);
  const topicLabel = getTopicLabel(dominantTopic);
  const guideSlug = town.relatedGuideSlugs[0] ?? getGuideForTopic(dominantTopic);

  const answer =
    dominantTopic === "long-stay"
      ? `Yes, ${town.name} is a credible longer-stay option if you want ${town.quiet >= 4 ? "more calm than scene" : "a more usable base than a short scenic burst"}, but the tradeoff is ${summarizeText(town.tradeoff, 1, 90).toLowerCase()}`
      : dominantTopic === "remote-work"
        ? `${town.name} can work for remote life if its style matches you. The question is whether you want its exact balance of workability, access, and atmosphere rather than a generic "good for everyone" remote-work town.`
        : `${town.name} is a real option for ${topicLabel}, but it only works if you can live with its specific tradeoff profile rather than just its first impression.`;

  return {
    answer,
    keyPoints: ensureKeyPoints([
      buildTownFitLine(town, dominantTopic),
      summarizeText(town.practicalReality, 1, 130),
      summarizeText(town.stayNotes, 1, 130),
    ]),
    caution: summarizeText(town.tradeoff, 1, 180),
    citations: [
      buildCitation(
        `${town.name}, Himachal`,
        `/towns/${town.slug}#${getRelevantAnchor(dominantTopic)}`,
        dominantTopic === "remote-work" ? "Remote-work reality" : "Best for",
        summarizeText(
          dominantTopic === "remote-work" ? town.remoteWorkReality : town.goodFor.join(". "),
          1,
          120,
        ),
      ),
      buildCitation(
        `${town.name}, Himachal`,
        `/towns/${town.slug}#${townSectionAnchors.tradeoff}`,
        "The tradeoff",
        summarizeText(town.tradeoff, 1, 120),
      ),
    ],
    nextLinks: dedupeNextLinks([
      buildTownProfileLink(town.slug)!,
      buildGuideLink(guideSlug)!,
      buildCompareLink([town.slug, ...town.relatedTownSlugs.slice(0, 2)])!,
    ]),
    confidence: "high",
    resolvedTownSlugs: [town.slug],
    resolvedPageTypes: ["town", "guide"],
  };
}

function buildComparisonResponse(intent: AssistantIntent, selectedTowns: Town[]): AssistantResponderResult {
  const dominantTopic = getDominantTopic(intent.topics);
  const weights = getWeightsForTopics(intent.topics);
  const comparisonFocusLabel = getComparisonFocusLabel(dominantTopic);
  const ranked = selectedTowns
    .map((town) => ({ town, score: scoreTown(town, weights) }))
    .sort((left, right) => right.score - left.score)
    .map((entry) => entry.town);
  const [leader, runnerUp] = ranked;
  const orderedComparisonTowns = getOrderedComparisonTowns(intent);
  const subjectTown = intent.queryFrame.subjectTownSlugs[0]
    ? getTownBySlug(intent.queryFrame.subjectTownSlugs[0])
    : orderedComparisonTowns[0] ?? null;
  const contrastedTown =
    orderedComparisonTowns.find((town) => town.slug !== subjectTown?.slug) ?? runnerUp;
  const guideSlug =
    leader.relatedGuideSlugs.find((slug) => runnerUp.relatedGuideSlugs.includes(slug)) ??
    getGuideForTopic(dominantTopic);

  const answer =
    intent.queryFrame.answerShape === "overview_plus_comparison" && subjectTown && contrastedTown
      ? leader.slug === subjectTown.slug
        ? `Against ${contrastedTown.name}, ${subjectTown.name} ranks better ${comparisonFocusLabel} because it holds up more cleanly once routine, tradeoffs, and everyday usability enter the picture.`
        : `Against ${contrastedTown.name}, ${subjectTown.name} ranks lower ${comparisonFocusLabel} unless you specifically want its atmosphere, movement, or visual energy more than a steadier daily base.`
      : dominantTopic === "quiet"
        ? `${leader.name} reads calmer in this comparison, while ${runnerUp.name} keeps more movement or convenience in the mix.`
        : dominantTopic === "family"
          ? `${leader.name} reads safer for family routine in this comparison, while ${runnerUp.name} is still viable if its atmosphere or location matters more to you.`
          : dominantTopic === "remote-work"
            ? `${leader.name} reads stronger for remote work in this comparison, while ${runnerUp.name} makes more sense if you are optimizing for a different kind of workday energy.`
            : `${leader.name} reads stronger ${comparisonFocusLabel}, while ${runnerUp.name} is the more conditional alternative in the current comparison.`;

  return {
    answer,
    keyPoints: ensureKeyPoints(
      intent.queryFrame.answerShape === "overview_plus_comparison" && subjectTown && contrastedTown
        ? [
            `${subjectTown.name}: ${summarizeText(subjectTown.summary, 1, 120)}`,
            `${leader.name}: ${buildTownFitLine(leader, dominantTopic).replace(`${leader.name}: `, "")}`,
            `${contrastedTown.name}: ${summarizeText(contrastedTown.tradeoff, 1, 120)}`,
          ]
        : ranked.slice(0, 3).map((town) => buildTownFitLine(town, dominantTopic)),
    ),
    caution: summarizeText(
      `${leader.tradeoff} ${runnerUp.tradeoff}`,
      2,
      180,
    ),
    citations: ranked.slice(0, 2).map((town) =>
      buildCitation(
        `${town.name}, Himachal`,
        `/towns/${town.slug}#${getRelevantAnchor(dominantTopic)}`,
        dominantTopic === "remote-work" ? "Remote-work reality" : "Best for",
        summarizeText(
          dominantTopic === "remote-work" ? town.remoteWorkReality : town.goodFor.join(". "),
          1,
          120,
        ),
      ),
    ),
    nextLinks: dedupeNextLinks([
      buildCompareLink(
        orderedComparisonTowns.length >= 2
          ? orderedComparisonTowns.map((town) => town.slug)
          : ranked.map((town) => town.slug),
        "Open the side-by-side comparison instead of relying on a short answer.",
      )!,
      buildTownProfileLink(leader.slug)!,
      buildGuideLink(guideSlug)!,
    ]),
    confidence: "high",
    resolvedTownSlugs: ranked.map((town) => town.slug),
    resolvedPageTypes: ["town", "guide"],
  };
}

export function buildTownFitResponse(intent: AssistantIntent): AssistantResponderResult {
  if (intent.intentKind === "comparison") {
    const selectedTowns = getOrderedComparisonTowns(intent);

    if (selectedTowns.length >= 2) {
      return buildComparisonResponse(intent, selectedTowns);
    }
  }

  if (intent.subIntent === "single_town" && intent.townSlugs[0]) {
    const town = getTownBySlug(intent.townSlugs[0]);
    if (town) return buildSingleTownResponse(intent, town);
  }

  return buildRankingResponse(intent);
}
