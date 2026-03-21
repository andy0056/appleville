import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { towns } from "../towns.ts";
import {
  assistantAnticipationFollowUpTemplates,
  assistantAnticipationSourceMap,
} from "./anticipation-source-map.ts";
import type {
  AssistantAnticipationEntry,
  AssistantAnticipationFollowUpCase,
  AssistantAnticipationPromptCase,
  AssistantIntentKind,
} from "./types.ts";

export type AssistantAnticipationArtifact = {
  entries: AssistantAnticipationEntry[];
  promptBank: {
    comparison: AssistantAnticipationPromptCase[];
    domain: AssistantAnticipationPromptCase[];
    singleTown: AssistantAnticipationPromptCase[];
    followUp: AssistantAnticipationFollowUpCase[];
  };
  sourceDigest: {
    combined: string;
    sources: Record<string, string>;
  };
};

const representativeTownSlugs = [
  "shimla",
  "naggar",
  "bir",
  "palampur",
  "manali",
  "dharamshala",
] as const;

const representativeTownPairs = [
  ["bir", "dharamshala"],
  ["palampur", "manali"],
  ["naggar", "palampur"],
  ["shimla", "solan"],
] as const;

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

function normalizeText(input: string) {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleCaseTown(slug: string) {
  return towns.find((town) => town.slug === slug)?.name ?? slug;
}

function replaceTownPlaceholders(template: string, townSlug: string) {
  return template.replaceAll("{town}", titleCaseTown(townSlug));
}

function replaceTownPairPlaceholders(template: string, townSlugA: string, townSlugB: string) {
  return template
    .replaceAll("{townA}", titleCaseTown(townSlugA))
    .replaceAll("{townB}", titleCaseTown(townSlugB));
}

function extractMarkdownHeadings(input: string) {
  return input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^#{1,6}\s+/.test(line))
    .map((line) =>
      line
        .replace(/^#{1,6}\s+/, "")
        .replace(/\*\*/g, "")
        .replace(/\\\./g, ".")
        .trim(),
    );
}

function selectEvidenceHeadings(headings: string[], hintKeywords: string[]) {
  const normalizedHints = hintKeywords.map((keyword) => normalizeText(keyword));
  const matching = headings.filter((heading) => {
    const normalizedHeading = normalizeText(heading);
    return normalizedHints.some((keyword) => normalizedHeading.includes(keyword));
  });

  return unique((matching.length ? matching : headings).slice(0, 6));
}

function selectPromptExamples(templates: string[], mode: "singleTown" | "comparison") {
  const relevantTemplates =
    mode === "singleTown"
      ? templates.filter(
          (template) =>
            template.includes("{town}") &&
            !template.includes("{townA}") &&
            !template.includes("{townB}"),
        )
      : templates.filter(
          (template) => template.includes("{townA}") || template.includes("{townB}"),
        );

  if (mode === "singleTown") {
    return relevantTemplates.flatMap((template) =>
      representativeTownSlugs.slice(0, 3).map((townSlug) => replaceTownPlaceholders(template, townSlug)),
    );
  }

  return relevantTemplates.flatMap((template) =>
    representativeTownPairs.slice(0, 3).map(([townSlugA, townSlugB]) =>
      replaceTownPairPlaceholders(template, townSlugA, townSlugB),
    ),
  );
}

function buildPromptCase(
  prompt: string,
  expectedPrimaryIntentKind: AssistantIntentKind,
  expectedFocusDomainKind: AssistantIntentKind | null,
  answerSourcePathname?: string | null,
  expectedSubIntent?: AssistantAnticipationPromptCase["expectedSubIntent"],
): AssistantAnticipationPromptCase {
  return {
    prompt,
    expectedPrimaryIntentKind,
    expectedFocusDomainKind,
    answerSourcePathname,
    ...(expectedSubIntent ? { expectedSubIntent } : {}),
  };
}

async function readSourceFile(projectRoot: string, relativePath: string) {
  return readFile(path.join(projectRoot, relativePath), "utf8");
}

async function buildSourceDigest(projectRoot: string) {
  const sources = unique(
    assistantAnticipationSourceMap.flatMap((source) => [...source.docs, ...source.modules]),
  ).sort();
  const sourceHashes: Record<string, string> = {};

  for (const relativePath of sources) {
    const contents = await readSourceFile(projectRoot, relativePath);
    sourceHashes[relativePath] = createHash("sha256").update(contents).digest("hex");
  }

  const combined = createHash("sha256")
    .update(
      sources
        .map((relativePath) => `${relativePath}:${sourceHashes[relativePath]}`)
        .join("|"),
    )
    .digest("hex");

  return {
    combined,
    sources: sourceHashes,
  };
}

export async function buildAssistantAnticipationArtifact(projectRoot: string) {
  const docContents = new Map<string, string>();

  for (const source of assistantAnticipationSourceMap) {
    for (const relativePath of source.docs) {
      if (!docContents.has(relativePath)) {
        docContents.set(relativePath, await readSourceFile(projectRoot, relativePath));
      }
    }
  }

  const entries: AssistantAnticipationEntry[] = [];
  const comparisonCases: AssistantAnticipationPromptCase[] = [];
  const domainCases: AssistantAnticipationPromptCase[] = [];
  const singleTownCases: AssistantAnticipationPromptCase[] = [];

  for (const source of assistantAnticipationSourceMap) {
    const headings = source.docs.flatMap((relativePath) =>
      extractMarkdownHeadings(docContents.get(relativePath) ?? ""),
    );

    for (const seed of source.seeds) {
      const evidenceHeadings = selectEvidenceHeadings(headings, seed.hintKeywords);
      const preferredKeywords = unique(seed.preferredKeywords.map((keyword) => normalizeText(keyword))).slice(0, 12);

      const singleTownPrompts = seed.singleTownCapable
        ? selectPromptExamples(seed.sampleTemplates, "singleTown")
        : [];
      const comparisonPrompts = seed.comparisonCapable
        ? selectPromptExamples(seed.sampleTemplates, "comparison")
        : [];
      const samplePrompts = unique([...singleTownPrompts, ...comparisonPrompts]).slice(0, 9);

      entries.push({
        id: seed.id,
        domainKind: seed.domainKind,
        subIntent: seed.subIntent,
        focusTopics: seed.focusTopics,
        sourceKind: seed.sourceKind,
        sourceLabel: seed.sourceLabel,
        livePathname: seed.livePathname,
        comparisonCapable: seed.comparisonCapable,
        singleTownCapable: seed.singleTownCapable,
        followUpCapable: seed.followUpCapable,
        requiredKeywords: unique(seed.requiredKeywords.map((keyword) => normalizeText(keyword))),
        preferredKeywords,
        questionPatterns: unique(seed.questionPatterns.map((pattern) => normalizeText(pattern))),
        samplePrompts,
        strictFallback: seed.strictFallback,
        evidenceHeadings,
      });

      if (seed.singleTownCapable) {
        const expectedPrimaryIntentKind =
          seed.domainKind === "comparison" ? "town_fit" : seed.domainKind;
        const expectedFocusDomainKind =
          seed.domainKind === "comparison" ? "town_fit" : seed.domainKind;

        for (const prompt of singleTownPrompts.slice(0, 3)) {
          const promptCase = buildPromptCase(
            prompt,
            expectedPrimaryIntentKind,
            expectedFocusDomainKind,
            seed.livePathname,
            seed.subIntent,
          );

          if (seed.domainKind === "town_fit" || seed.domainKind === "comparison") {
            singleTownCases.push(promptCase);
          } else {
            domainCases.push(promptCase);
          }
        }
      }

      if (seed.comparisonCapable) {
        const expectedFocusDomainKind =
          seed.domainKind === "comparison" ? "town_fit" : seed.domainKind;

        for (const prompt of comparisonPrompts.slice(0, 3)) {
          comparisonCases.push(
            buildPromptCase(
              prompt,
              "comparison",
              expectedFocusDomainKind,
              seed.livePathname,
            ),
          );
        }
      }
    }
  }

  const followUpCases: AssistantAnticipationFollowUpCase[] = assistantAnticipationFollowUpTemplates.map(
    (entry) => ({
      seedPrompt: entry.seedPrompt,
      prompt: entry.prompt,
      expectedPrimaryIntentKind: entry.expectedPrimaryIntentKind,
      expectedFocusDomainKind: entry.expectedFocusDomainKind,
    }),
  );

  return {
    entries: entries.sort((left, right) => left.id.localeCompare(right.id)),
    promptBank: {
      comparison: comparisonCases,
      domain: domainCases,
      singleTown: singleTownCases,
      followUp: followUpCases,
    },
    sourceDigest: await buildSourceDigest(projectRoot),
  } satisfies AssistantAnticipationArtifact;
}
