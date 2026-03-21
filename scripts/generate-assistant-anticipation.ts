import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildAssistantAnticipationArtifact } from "../src/lib/assistant/anticipation-build.ts";

function serialize(value: unknown) {
  return JSON.stringify(value, null, 2);
}

async function main() {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const projectRoot = path.resolve(scriptDir, "..");
  const artifact = await buildAssistantAnticipationArtifact(projectRoot);
  const targetDir = path.join(projectRoot, "src/lib/assistant");
  const targetFile = path.join(targetDir, "anticipation.generated.ts");

  await mkdir(targetDir, { recursive: true });

  const fileContents = `import type {
  AssistantAnticipationEntry,
  AssistantAnticipationFollowUpCase,
  AssistantAnticipationPromptCase,
} from "./types.ts";

export const assistantAnticipationEntries = ${serialize(artifact.entries)} satisfies AssistantAnticipationEntry[];

export const assistantAnticipationPromptBank = ${serialize(artifact.promptBank)} satisfies {
  comparison: AssistantAnticipationPromptCase[];
  domain: AssistantAnticipationPromptCase[];
  singleTown: AssistantAnticipationPromptCase[];
  followUp: AssistantAnticipationFollowUpCase[];
};

export const assistantAnticipationSourceDigest = ${serialize(artifact.sourceDigest)} as const;
`;

  await writeFile(targetFile, fileContents);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
