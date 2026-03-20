import { guides } from "../guides.ts";
import { getTownBySlug } from "../towns.ts";
import { assistantCorpus } from "./corpus.ts";
import { buildConversationContextPatch, sanitizeConversationContext } from "./context.ts";
import { parseAssistantIntent, searchAssistantCorpus } from "./search.ts";
import type {
  AssistantChunk,
  AssistantCitation,
  AssistantConversationContext,
  AssistantNextLink,
  AssistantResponse,
  AssistantSearchResult,
  AssistantTopic,
} from "./types.ts";

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

function trimText(input: string, maxLength: number) {
  if (input.length <= maxLength) return input;
  return `${input.slice(0, maxLength - 1).trimEnd()}…`;
}

function toSentences(input: string) {
  return input
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function summarizeChunk(chunk: AssistantChunk, maxSentences = 2) {
  return trimText(toSentences(chunk.text).slice(0, maxSentences).join(" "), 220);
}

function buildCitation(result: AssistantSearchResult): AssistantCitation {
  return {
    title: result.chunk.pageTitle,
    href: `${result.chunk.pathname}#${result.chunk.anchor}`,
    sectionLabel: result.chunk.sectionTitle,
    excerpt: trimText(summarizeChunk(result.chunk, 1), 130),
  };
}

function buildSupportBullets(results: AssistantSearchResult[]) {
  return results.slice(0, 3).map((result) => {
    const summary = trimText(summarizeChunk(result.chunk, 1), 120);
    if (result.chunk.sectionTitle === "Overview" || result.chunk.sectionTitle === "Intro") {
      return summary;
    }
    return `${result.chunk.sectionTitle}: ${summary}`;
  });
}

function buildFallbackResponse(
  context: AssistantConversationContext,
  fallbackReason: "no_match" | "low_confidence" | "out_of_scope",
): AssistantResponse {
  return {
    answer:
      fallbackReason === "out_of_scope"
        ? "I can only answer from Appleville’s current published Himachal pages, so I can’t reliably answer that."
        : "I don’t have enough grounded Appleville material to answer that cleanly yet.",
    supportBullets: [
      "Try asking about a town, a move-planning question, or one of the practical resource topics on the site.",
      "Good prompts include remote work, family fit, property rules, tap water, safety, banking, or power backup.",
    ],
    citations: [],
    nextLinks: [
      {
        label: "Browse towns",
        href: "/towns",
        reason: "Start with the current town set if you want fit and tradeoff guidance.",
      },
      {
        label: "Read guides",
        href: "/guides",
        reason: "Use guides when the real question is about a move or a tradeoff profile.",
      },
      {
        label: "Take the quiz",
        href: "/quiz",
        reason: "Get a shortlist first if you want the fastest next step.",
      },
    ],
    confidence: "low",
    conversationContext: context,
    didFallback: true,
    fallbackReason,
  };
}

function buildComparisonResponse(
  townSlugs: string[],
  results: AssistantSearchResult[],
  context: AssistantConversationContext,
): AssistantResponse | null {
  const selectedTowns = townSlugs
    .map((slug) => getTownBySlug(slug))
    .filter((town): town is NonNullable<typeof town> => Boolean(town))
    .slice(0, 3);

  if (selectedTowns.length < 2) return null;

  const steadierTown = selectedTowns
    .slice()
    .sort(
      (left, right) =>
        right.longStayFit +
        right.quiet +
        right.familyFit +
        right.accessibility -
        (left.longStayFit + left.quiet + left.familyFit + left.accessibility),
    )[0];
  const livelierTown = selectedTowns
    .slice()
    .sort(
      (left, right) =>
        right.socialEnergy +
        right.aesthetics +
        right.tourismIntensity -
        (left.socialEnergy + left.aesthetics + left.tourismIntensity),
    )[0];

  const answer =
    steadierTown.slug === livelierTown.slug
      ? `These towns solve slightly different versions of the same problem. ${steadierTown.name} reads as the most balanced option in the current Appleville set, while the others pull harder toward narrower tradeoffs.`
      : `For a steadier longer-stay base, ${steadierTown.name} reads safer. ${livelierTown.name} is the more social or atmospheric option, which can be attractive if energy matters more than routine calm.`;

  const supportBullets = [
    `${steadierTown.name} scores better for long-stay fit, quiet, and everyday practicality inside this comparison.`,
    `${livelierTown.name} scores higher for social energy, aesthetics, or visible town buzz.`,
    "The tradeoff is less about which place is objectively better and more about which kind of friction you can actually live with.",
  ];

  const citations = results.slice(0, 3).map(buildCitation);
  const compareHref = `/compare?towns=${selectedTowns.map((town) => town.slug).join(",")}`;
  const relatedGuideSlugs = unique(
    selectedTowns.flatMap((town) => town.relatedGuideSlugs),
  ).slice(0, 1);
  const relatedGuide = relatedGuideSlugs
    .map((slug) => guides.find((guide) => guide.slug === slug))
    .find(Boolean);

  const nextLinks: AssistantNextLink[] = [
    {
      label: "Open this comparison",
      href: compareHref,
      reason: "See the shortlist side by side across quiet, access, family fit, and long-stay shape.",
    },
    ...selectedTowns.slice(0, 2).map((town) => ({
      label: `${town.name} profile`,
      href: `/towns/${town.slug}`,
      reason: `Read the grounded town page for ${town.name}.`,
    })),
  ];

  if (relatedGuide) {
    nextLinks.splice(1, 0, {
      label: relatedGuide.title,
      href: `/guides/${relatedGuide.slug}`,
      reason: "Use the editorial guide if you want a more explicit tradeoff read.",
    });
  }

  return {
    answer,
    supportBullets,
    citations,
    nextLinks: nextLinks.slice(0, 3),
    confidence: "high",
    conversationContext: context,
    didFallback: false,
  };
}

function buildNextLinks(
  results: AssistantSearchResult[],
  topics: AssistantTopic[],
): AssistantNextLink[] {
  const resultTownSlugs = unique(results.flatMap((result) => result.chunk.entitySlugs));
  const resultPaths = unique(results.map((result) => result.chunk.pathname));
  const nextLinks: AssistantNextLink[] = [];

  if (resultTownSlugs.length >= 2) {
    nextLinks.push({
      label: "Compare these towns",
      href: `/compare?towns=${resultTownSlugs.slice(0, 3).join(",")}`,
      reason: "See the shortlist side by side instead of reading each town separately.",
    });
  }

  if (resultTownSlugs.length === 1) {
    const town = getTownBySlug(resultTownSlugs[0]);
    if (town) {
      nextLinks.push({
        label: `${town.name} town profile`,
        href: `/towns/${town.slug}`,
        reason: "Read the full grounded profile for this town.",
      });

      const relatedGuide = town.relatedGuideSlugs
        .map((slug) => guides.find((guide) => guide.slug === slug))
        .find(Boolean);
      if (relatedGuide) {
        nextLinks.push({
          label: relatedGuide.title,
          href: `/guides/${relatedGuide.slug}`,
          reason: "Open the closest editorial guide for a wider decision frame.",
        });
      }
    }
  }

  if (
    topics.some((topic) =>
      ["moving", "property", "power", "safety", "community", "banking", "food", "water"].includes(
        topic,
      ),
    )
  ) {
    const strongestPath =
      resultPaths.find((pathname) =>
        ["/first-30-days", "/property-rules", "/power-backup", "/womens-safety", "/community", "/banking", "/food"].includes(
          pathname,
        ),
      ) ?? resultPaths[0];

    if (strongestPath) {
      nextLinks.push({
        label: "Open the full guide",
        href: strongestPath,
        reason: "Read the complete practical page instead of a short extracted answer.",
      });
    }
  }

  if (topics.includes("method")) {
    nextLinks.push({
      label: "How Appleville works",
      href: "/how-it-works",
      reason: "See what the quiz, town scores, and compare view actually consider.",
    });
  }

  if (!nextLinks.length) {
    nextLinks.push(
      {
        label: "Take the quiz",
        href: "/quiz",
        reason: "Use the quiz if you want a fast shortlist instead of browsing answer by answer.",
      },
      {
        label: "Browse towns",
        href: "/towns",
        reason: "Browse the full town set when you want to read the tradeoffs yourself.",
      },
    );
  }

  return unique(nextLinks.map((item) => JSON.stringify(item)))
    .map((item) => JSON.parse(item) as AssistantNextLink)
    .slice(0, 3);
}

function buildAnswer(results: AssistantSearchResult[]) {
  const [primary, secondary] = results;
  if (!primary) return "";

  const primarySummary = summarizeChunk(primary.chunk, 2);
  if (!secondary) return primarySummary;

  const secondarySummary = summarizeChunk(secondary.chunk, 1);
  if (primarySummary.length + secondarySummary.length > 170) {
    return primarySummary;
  }

  if (secondary.chunk.pathname === primary.chunk.pathname) {
    return primarySummary;
  }

  return `${primarySummary} ${secondarySummary}`;
}

export function generateAssistantResponse(
  message: string,
  conversationContext?: AssistantConversationContext | null,
): AssistantResponse {
  const cleanContext = sanitizeConversationContext(conversationContext);
  const intent = parseAssistantIntent(message, cleanContext);

  if (!message.trim()) {
    return buildFallbackResponse(cleanContext, "no_match");
  }

  if (!intent.hasKnownDomainSignal) {
    return buildFallbackResponse(cleanContext, "out_of_scope");
  }

  const { results, confidence } = searchAssistantCorpus(assistantCorpus, intent);
  const nextContext = buildConversationContextPatch(intent, results, cleanContext);

  if (!results.length) {
    return buildFallbackResponse(nextContext, "no_match");
  }

  if (intent.wantsComparison) {
    const comparison = buildComparisonResponse(intent.townSlugs, results, nextContext);
    if (comparison) return comparison;
  }

  if (confidence === "low") {
    return buildFallbackResponse(nextContext, "low_confidence");
  }

  return {
    answer: buildAnswer(results),
    supportBullets: buildSupportBullets(results),
    citations: results.slice(0, 3).map(buildCitation),
    nextLinks: buildNextLinks(results, intent.topics),
    confidence,
    conversationContext: nextContext,
    didFallback: false,
  };
}
