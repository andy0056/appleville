import test from "node:test";
import assert from "node:assert/strict";
import { buildAssistantAnticipationArtifact } from "./assistant/anticipation-build.ts";
import {
  assistantAnticipationEntries,
  assistantAnticipationPromptBank,
  assistantAnticipationSourceDigest,
} from "./assistant/anticipation.generated.ts";
import { matchAssistantAnticipationEntries } from "./assistant/anticipation.ts";
import { sanitizeConversationContext } from "./assistant/context.ts";

test("generated anticipation artifact stays in sync with the current docs and live source map", async () => {
  const artifact = await buildAssistantAnticipationArtifact(process.cwd());

  assert.deepEqual(artifact.sourceDigest, assistantAnticipationSourceDigest);
  assert.deepEqual(artifact.entries, assistantAnticipationEntries);
  assert.deepEqual(artifact.promptBank, assistantAnticipationPromptBank);
});

test("anticipation entries only point to live public page families", () => {
  const allowedPathnames = new Set([
    null,
    "/food",
    "/banking",
    "/womens-safety",
    "/community",
    "/property-rules",
    "/power-backup",
    "/first-30-days",
    "/how-it-works",
  ]);

  for (const entry of assistantAnticipationEntries) {
    assert.ok(allowedPathnames.has(entry.livePathname), entry.id);
    assert.ok(!entry.sourceLabel.toLowerCase().includes("name ideas"), entry.id);
  }
});

test("anticipation matcher upgrades lazy practical prompts before routing", () => {
  const matches = matchAssistantAnticipationEntries({
    normalizedQuery: "does swiggy deliver in shimla",
    townSlugs: ["shimla"],
    comparisonDetected: false,
    followUp: false,
    context: sanitizeConversationContext(null),
  });

  assert.ok(matches.length > 0);
  assert.equal(matches[0]?.entry.domainKind, "food_water");
  assert.equal(matches[0]?.entry.subIntent, "delivery");
});

test("generated prompt banks are materially broader than the old hand-written set", () => {
  assert.ok(assistantAnticipationPromptBank.comparison.length >= 20);
  assert.ok(assistantAnticipationPromptBank.domain.length >= 20);
  assert.ok(assistantAnticipationPromptBank.singleTown.length >= 10);
  assert.ok(assistantAnticipationPromptBank.followUp.length >= 4);
});
