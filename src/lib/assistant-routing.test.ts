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

test("router keeps single-town water questions in the food-water domain", () => {
  const intent = parseAssistantIntent("tell me about water situation in Naggar");

  assert.equal(intent.primaryIntentKind, "food_water");
  assert.equal(intent.focusDomainKind, "food_water");
  assert.deepEqual(intent.townSlugs, ["naggar"]);
});

test("router keeps practical single-town prompts in their resource domains", () => {
  const cases = [
    ["tell me about banking in Bir", "banking"],
    ["tell me about power cuts in Manali", "power"],
    ["tell me about safety in Naggar", "women_safety"],
    ["tell me about property in Palampur", "property"],
    ["tell me about first month in Dharamshala", "moving"],
  ] as const;

  for (const [prompt, expectedIntentKind] of cases) {
    const intent = parseAssistantIntent(prompt);

    assert.equal(intent.primaryIntentKind, expectedIntentKind, prompt);
    assert.equal(intent.focusDomainKind, expectedIntentKind, prompt);
  }
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

test("single-town water prompts cite the food guide instead of falling back to town fit", () => {
  const response = generateAssistantResponse("tell me about water situation in Naggar");

  assert.equal(response.didFallback, false);
  assert.equal(response.responderKind, "food_water");
  assert.ok(response.citations.some((citation) => citation.href.startsWith("/food#")));
  assert.ok(response.answer.toLowerCase().includes("tap-water") || response.answer.toLowerCase().includes("water"));
});

test("practical single-town prompts answer from their canonical resource pages", () => {
  const cases = [
    ["tell me about banking in Bir", "/banking#", "banking"],
    ["tell me about power cuts in Manali", "/power-backup#", "power"],
    ["tell me about safety in Naggar", "/womens-safety#", "women_safety"],
    ["tell me about property in Palampur", "/property-rules#", "property"],
    ["tell me about first month in Dharamshala", "/first-30-days#", "moving"],
  ] as const;

  for (const [prompt, citationPrefix, responderKind] of cases) {
    const response = generateAssistantResponse(prompt);

    assert.equal(response.didFallback, false, prompt);
    assert.equal(response.responderKind, responderKind, prompt);
    assert.ok(
      response.citations.some((citation) => citation.href.startsWith(citationPrefix)),
      prompt,
    );
  }
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
