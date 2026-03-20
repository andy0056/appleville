import test from "node:test";
import assert from "node:assert/strict";
import { generateAssistantResponse } from "./assistant/respond.ts";
import { parseAssistantIntent } from "./assistant/router.ts";
import {
  assistantComparisonPromptBank,
  assistantFollowUpPromptBank,
} from "./assistant-prompt-bank.ts";

test("router treats natural about-plus-against phrasing as overview-plus-comparison", () => {
  const intent = parseAssistantIntent(
    "tell me about manali. how would you rank it against palampur?",
  );

  assert.equal(intent.primaryIntentKind, "comparison");
  assert.equal(intent.focusDomainKind, "town_fit");
  assert.equal(intent.queryFrame.answerShape, "overview_plus_comparison");
  assert.deepEqual(intent.queryFrame.subjectTownSlugs, ["manali"]);
  assert.deepEqual(intent.queryFrame.comparisonTownSlugs, ["manali", "palampur"]);
});

test("router keeps property as the primary intent even when multiple towns are mentioned", () => {
  const intent = parseAssistantIntent(
    "can i buy property in manali or palampur if i am from mumbai",
  );

  assert.equal(intent.primaryIntentKind, "property");
  assert.equal(intent.focusDomainKind, "property");
  assert.equal(intent.userProfile, "out_of_state_indian");
});

test("router combines comparison with a women-safety focus", () => {
  const intent = parseAssistantIntent("naggar vs palampur for women");

  assert.equal(intent.primaryIntentKind, "comparison");
  assert.equal(intent.focusDomainKind, "women_safety");
  assert.deepEqual(intent.queryFrame.comparisonTownSlugs, ["naggar", "palampur"]);
});

test("router treats single-town overview prompts as town overview instead of generic fallback", () => {
  const intent = parseAssistantIntent("tell me about bir");

  assert.equal(intent.primaryIntentKind, "town_fit");
  assert.equal(intent.queryFrame.answerShape, "single_town_overview");
  assert.deepEqual(intent.townSlugs, ["bir"]);
});

test("comparison follow-ups keep the active comparison frame", () => {
  const first = generateAssistantResponse("Bir or Dharamshala for a longer stay?");
  const second = generateAssistantResponse("and for families?", first.conversationContext);

  assert.equal(second.didFallback, false);
  assert.equal(second.responderKind, "comparison");
  assert.equal(second.conversationContext.activePrimaryIntentKind, "comparison");
  assert.deepEqual(second.conversationContext.activeComparisonTownSlugs, ["bir", "dharamshala"]);
});

test("town overview follow-ups can switch subject cleanly", () => {
  const first = generateAssistantResponse("tell me about naggar");
  const second = generateAssistantResponse("what about palampur instead?", first.conversationContext);

  assert.equal(first.didFallback, false);
  assert.equal(second.didFallback, false);
  assert.equal(second.answerShape, "single_town_overview");
  assert.ok(second.answer.toLowerCase().includes("palampur"));
});

test("power comparisons stay in the power domain and cite the power guide", () => {
  const response = generateAssistantResponse("manali vs palampur for power cuts");

  assert.equal(response.didFallback, false);
  assert.equal(response.responderKind, "comparison");
  assert.ok(response.citations.some((citation) => citation.href.startsWith("/power-backup#")));
});

test("comparison prompt bank routes to a live non-generic intent", () => {
  for (const prompt of assistantComparisonPromptBank) {
    const intent = parseAssistantIntent(prompt);

    assert.notEqual(intent.primaryIntentKind, "generic", prompt);
    assert.ok(
      intent.queryFrame.answerShape === "comparison" ||
        intent.queryFrame.answerShape === "overview_plus_comparison" ||
        intent.queryFrame.answerShape === "single_town_overview",
      prompt,
    );
  }
});

test("follow-up prompt bank stays compatible with stored comparison and overview state", () => {
  assert.ok(assistantFollowUpPromptBank.includes("what about palampur instead?"));
  assert.ok(assistantFollowUpPromptBank.includes("and for families?"));
});
