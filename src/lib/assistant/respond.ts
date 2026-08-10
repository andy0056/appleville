import { buildConversationContextPatch, sanitizeConversationContext } from "./context.ts";
import { retrieveSemantic } from "./embeddings/semantic.ts";
import { parseAssistantIntent } from "./router.ts";
import { applySemanticRouting } from "./semantic-routing.ts";
import type {
  AssistantConversationContext,
  AssistantIntent,
  AssistantResponse,
} from "./types.ts";
import { buildBankingResponse } from "./responders/banking.ts";
import { buildCommunityResponse } from "./responders/community.ts";
import { buildFoodWaterResponse } from "./responders/food-water.ts";
import { buildGenericResponse } from "./responders/generic.ts";
import { buildMethodResponse } from "./responders/method.ts";
import { buildMovingResponse } from "./responders/moving.ts";
import { buildPowerResponse } from "./responders/power.ts";
import { buildPropertyResponse } from "./responders/property.ts";
import {
  buildResourceLink,
  dedupeNextLinks,
  ensureKeyPoints,
  type AssistantResponderResult,
} from "./responders/shared.ts";
import { buildTownFitResponse } from "./responders/town-fit.ts";
import { buildTownOverviewResponse } from "./responders/town-overview.ts";
import { buildWomenSafetyResponse } from "./responders/women-safety.ts";

function buildFallbackResponse(
  context: AssistantConversationContext,
  fallbackReason: "no_match" | "low_confidence" | "out_of_scope",
  responderKind: AssistantIntent["intentKind"] = "generic",
): AssistantResponse {
  return {
    answer:
      fallbackReason === "out_of_scope"
        ? "I can only answer from Appleville's current published Himachal pages, so I can't answer that cleanly."
        : "I don't have enough grounded Appleville material to answer that cleanly yet.",
    keyPoints: ensureKeyPoints([
      "Try asking about a town, a move-planning question, or one of the practical resource topics on the site.",
      "Good prompts include remote work, family fit, property rules, tap water, women's safety, banking, or power backup.",
    ]),
    citations: [],
    nextLinks: dedupeNextLinks([
      buildResourceLink(
        "Browse towns",
        "/towns",
        "Start with the current town set if you want fit and tradeoff guidance.",
      ),
      buildResourceLink(
        "Read guides",
        "/guides",
        "Use guides when the real question is about a move or tradeoff profile.",
      ),
      buildResourceLink(
        "Take the quiz",
        "/quiz",
        "Get a shortlist first if you want the fastest next step.",
      ),
    ]),
    confidence: "low",
    conversationContext: context,
    didFallback: true,
    fallbackReason,
    responderKind,
  };
}

function buildAnticipationFallbackResponse(
  intent: AssistantIntent,
  context: AssistantConversationContext,
): AssistantResponse {
  const livePathname = intent.anticipationMatch?.entry.livePathname;
  const label = intent.anticipationMatch?.entry.sourceLabel ?? "the strongest page";

  return {
    answer: livePathname
      ? `Appleville covers this topic, but I can't give a short grounded answer from the current public material without overreaching. The safest next step is the canonical page.`
      : "I can see the question family, but I still don't have enough grounded Appleville material to answer it cleanly in chat.",
    keyPoints: ensureKeyPoints([
      livePathname
        ? `This query maps to ${label}, and I would rather point you there than improvise.`
        : "The topic is recognized, but the current public material is still too thin for a short answer.",
      "This fallback is deliberate: Appleville prefers a precise redirect over a confident guess.",
    ]),
    citations: [],
    nextLinks: dedupeNextLinks(
      [
        livePathname
          ? buildResourceLink(
              `Open ${label}`,
              livePathname,
              "Go to the canonical Appleville page for the grounded version.",
            )
          : null,
        buildResourceLink(
          "Browse towns",
          "/towns",
          "Use town pages if the real question is about fit, tradeoffs, or everyday base quality.",
        ),
      ].filter((item): item is NonNullable<typeof item> => Boolean(item)),
    ),
    confidence: "low",
    conversationContext: context,
    didFallback: true,
    fallbackReason: "low_confidence",
    responderKind: intent.intentKind,
    answerShape: intent.queryFrame.answerShape,
  };
}

function resolveResponder(intent: AssistantIntent): AssistantResponderResult | null {
  if (intent.queryFrame.answerShape === "single_town_overview") {
    return buildTownOverviewResponse(intent);
  }

  const effectiveKind = intent.focusDomainKind ?? intent.intentKind;

  switch (effectiveKind) {
    case "property":
      return buildPropertyResponse(intent);
    case "women_safety":
      return buildWomenSafetyResponse(intent);
    case "food_water":
      return buildFoodWaterResponse(intent);
    case "banking":
      return buildBankingResponse(intent);
    case "power":
      return buildPowerResponse(intent);
    case "community":
      return buildCommunityResponse(intent);
    case "moving":
      return buildMovingResponse(intent);
    case "method":
      return buildMethodResponse(intent);
    case "comparison":
    case "town_fit":
      return buildTownFitResponse(intent);
    case "generic":
    default:
      return buildGenericResponse(intent);
  }
}

const CONFIDENCE_RANK: Record<AssistantResponse["confidence"], number> = {
  low: 0,
  medium: 1,
  high: 2,
};

export async function generateAssistantResponse(
  message: string,
  conversationContext?: AssistantConversationContext | null,
): Promise<AssistantResponse> {
  const cleanContext = sanitizeConversationContext(conversationContext);
  let intent = parseAssistantIntent(message, cleanContext);

  if (!message.trim()) {
    return buildFallbackResponse(cleanContext, "no_match", intent.intentKind);
  }

  // Lexical first. It costs nothing, adds no latency, and already cites
  // correctly for the overwhelming majority of questions asked in the site's
  // own vocabulary.
  let result = intent.hasKnownDomainSignal ? resolveResponder(intent) : null;

  // Only when keywords have given up — which measured out to be almost exactly
  // the paraphrased questions they cannot reach — spend a round trip on
  // embeddings. If the key is missing or the call fails, retrieveSemantic
  // returns nothing and the lexical outcome stands.
  if (!result || result.confidence === "low") {
    // Corroboration has to mean lexical named a concrete domain, not merely
    // that some token matched. "Recommend a good laptop under 50000" sets
    // hasKnownDomainSignal because of the number, but resolves to `generic` —
    // treating that as agreement handed it the permissive floor and let a
    // 0.334 brush against a town page answer it. A generic intent is not
    // evidence, so similarity has to stand on its own.
    const hits = await retrieveSemantic(message, {
      hasLexicalSignal: intent.hasKnownDomainSignal && intent.intentKind !== "generic",
    });
    const semanticIntent = applySemanticRouting(intent, hits);
    const semanticResult = semanticIntent ? resolveResponder(semanticIntent) : null;

    if (
      semanticIntent &&
      semanticResult &&
      (!result ||
        CONFIDENCE_RANK[semanticResult.confidence] > CONFIDENCE_RANK[result.confidence])
    ) {
      intent = semanticIntent;
      result = semanticResult;
    }
  }

  if (!intent.hasKnownDomainSignal && !result) {
    return buildFallbackResponse(cleanContext, "out_of_scope", intent.intentKind);
  }

  if (!result) {
    const nextContext = buildConversationContextPatch(intent, cleanContext);
    if (intent.anticipationMatch?.entry.strictFallback) {
      return buildAnticipationFallbackResponse(intent, nextContext);
    }
    return buildFallbackResponse(nextContext, "low_confidence", intent.intentKind);
  }

  if (intent.anticipationMatch?.entry.strictFallback && result.confidence === "low") {
    const nextContext = buildConversationContextPatch(intent, cleanContext, {
      resolvedTownSlugs: result.resolvedTownSlugs,
      resolvedPageTypes: result.resolvedPageTypes,
    });
    return buildAnticipationFallbackResponse(intent, nextContext);
  }

  const nextContext = buildConversationContextPatch(intent, cleanContext, {
    resolvedTownSlugs: result.resolvedTownSlugs,
    resolvedPageTypes: result.resolvedPageTypes,
  });

  return {
    answer: result.answer,
    keyPoints: ensureKeyPoints(result.keyPoints),
    caution: result.caution,
    citations: result.citations.slice(0, 3),
    nextLinks: result.nextLinks.slice(0, 3),
    confidence: result.confidence,
    conversationContext: nextContext,
    didFallback: false,
    responderKind: intent.intentKind,
    answerShape: intent.queryFrame.answerShape,
  };
}
