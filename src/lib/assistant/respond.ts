import { buildConversationContextPatch, sanitizeConversationContext } from "./context.ts";
import { parseAssistantIntent } from "./router.ts";
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

function resolveResponder(intent: AssistantIntent): AssistantResponderResult | null {
  switch (intent.intentKind) {
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

export function generateAssistantResponse(
  message: string,
  conversationContext?: AssistantConversationContext | null,
): AssistantResponse {
  const cleanContext = sanitizeConversationContext(conversationContext);
  const intent = parseAssistantIntent(message, cleanContext);

  if (!message.trim()) {
    return buildFallbackResponse(cleanContext, "no_match", intent.intentKind);
  }

  if (!intent.hasKnownDomainSignal) {
    return buildFallbackResponse(cleanContext, "out_of_scope", intent.intentKind);
  }

  const result = resolveResponder(intent);

  if (!result) {
    const nextContext = buildConversationContextPatch(intent, cleanContext);
    return buildFallbackResponse(nextContext, "low_confidence", intent.intentKind);
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
  };
}
