import { methodSections, type MethodSection } from "../../how-it-works.ts";
import type { AssistantIntent } from "../types.ts";
import {
  buildCitation,
  buildResourceLink,
  dedupeNextLinks,
  ensureKeyPoints,
  summarizeText,
  type AssistantResponderResult,
} from "./shared.ts";

function findMethodSection(intent: AssistantIntent): MethodSection {
  if (intent.normalizedQuery.includes("quiz")) {
    const match = methodSections.find((section) => section.id === "quiz");
    if (match) return match;
  }
  if (
    intent.normalizedQuery.includes("score") ||
    intent.normalizedQuery.includes("label") ||
    intent.normalizedQuery.includes("match")
  ) {
    const match = methodSections.find((section) => section.id === "results");
    if (match) return match;
  }
  if (intent.normalizedQuery.includes("compare")) {
    const match = methodSections.find((section) => section.id === "compare");
    if (match) return match;
  }
  if (
    intent.normalizedQuery.includes("limit") ||
    intent.normalizedQuery.includes("certainty") ||
    intent.normalizedQuery.includes("guarantee")
  ) {
    const match = methodSections.find((section) => section.id === "limits");
    if (match) return match;
  }

  return (
    methodSections.find((section) => section.id === "overview") ??
    methodSections[0] ?? {
      id: "overview",
      title: "How Appleville works",
      paragraphs: [
        "Appleville is a directional decision tool, not a certainty engine or a substitute for a trial stay.",
      ],
    }
  );
}

export function buildMethodResponse(intent: AssistantIntent): AssistantResponderResult {
  const section = findMethodSection(intent);

  return {
    answer:
      section.paragraphs[0] ??
      "Appleville is a directional decision tool, not a certainty engine or a substitute for a trial stay.",
    keyPoints: ensureKeyPoints([
      section.paragraphs[1] ?? "",
      ...(section.bullets ?? []).slice(0, 2),
    ]),
    caution:
      section.id === "limits"
        ? "Use Appleville to narrow the shortlist and sharpen the questions, not to skip on-the-ground verification."
        : "Appleville is built to separate tradeoffs clearly, not to make certainty-heavy promises.",
    citations: [
      buildCitation(
        "How Appleville works",
        `/how-it-works#${section.id}`,
        section.title,
        summarizeText(section.paragraphs[0] ?? "", 1, 120),
      ),
    ],
    nextLinks: dedupeNextLinks([
      buildResourceLink(
        "Open How Appleville works",
        "/how-it-works",
        "Read the full method and limits page.",
      ),
      buildResourceLink(
        "Take the quiz",
        "/quiz",
        "Use the quiz if you want a sharper shortlist from your own priorities.",
      ),
      buildResourceLink(
        "Browse towns",
        "/towns",
        "Use town pages if you want the tradeoffs in full instead of a quick answer.",
      ),
    ]),
    confidence: "high",
    resolvedPageTypes: ["method"],
  };
}
