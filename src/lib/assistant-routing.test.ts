import test from "node:test";
import assert from "node:assert/strict";
import { generateAssistantResponse } from "./assistant/respond.ts";
import { parseAssistantIntent } from "./assistant/router.ts";
import { assistantComparisonPromptCases } from "./assistant-comparison-bank.ts";
import { assistantDomainPromptCases } from "./assistant-domain-bank.ts";
import { assistantFollowUpPromptCases } from "./assistant-followup-bank.ts";
import { assistantSingleTownPromptCases } from "./assistant-single-town-bank.ts";

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

test("comparison prompt bank stays in comparison and preserves expected focus", () => {
  for (const promptCase of assistantComparisonPromptCases) {
    const intent = parseAssistantIntent(promptCase.prompt);

    assert.equal(intent.primaryIntentKind, promptCase.expectedPrimaryIntentKind, promptCase.prompt);
    assert.equal(intent.focusDomainKind, promptCase.expectedFocusDomainKind, promptCase.prompt);
    if (promptCase.expectedSubIntent) {
      assert.equal(intent.subIntent, promptCase.expectedSubIntent, promptCase.prompt);
    }
  }
});

test("single-town anticipation bank avoids generic fallback", () => {
  for (const promptCase of assistantSingleTownPromptCases) {
    const intent = parseAssistantIntent(promptCase.prompt);

    assert.equal(intent.primaryIntentKind, promptCase.expectedPrimaryIntentKind, promptCase.prompt);
    assert.equal(intent.focusDomainKind, promptCase.expectedFocusDomainKind, promptCase.prompt);
    assert.notEqual(intent.intentKind, "generic", promptCase.prompt);
    assert.ok(intent.townSlugs.length >= 1, promptCase.prompt);
  }
});

test("domain anticipation bank routes practical single-town prompts into their canonical domains", () => {
  for (const promptCase of assistantDomainPromptCases) {
    const intent = parseAssistantIntent(promptCase.prompt);

    assert.equal(intent.primaryIntentKind, promptCase.expectedPrimaryIntentKind, promptCase.prompt);
    assert.equal(intent.focusDomainKind, promptCase.expectedFocusDomainKind, promptCase.prompt);
    if (promptCase.expectedSubIntent) {
      assert.equal(intent.subIntent, promptCase.expectedSubIntent, promptCase.prompt);
    }
  }
});

test("domain anticipation bank answers from canonical live pages instead of town-fit", () => {
  for (const promptCase of assistantDomainPromptCases) {
    if (!promptCase.answerSourcePathname) continue;

    const response = generateAssistantResponse(promptCase.prompt);

    assert.equal(response.didFallback, false, promptCase.prompt);
    assert.equal(response.responderKind, promptCase.expectedPrimaryIntentKind, promptCase.prompt);
    assert.ok(
      response.citations.some((citation) => citation.href.startsWith(`${promptCase.answerSourcePathname}#`)),
      promptCase.prompt,
    );
  }
});

test("follow-up anticipation bank keeps the active domain frame", () => {
  for (const promptCase of assistantFollowUpPromptCases) {
    const first = generateAssistantResponse(promptCase.seedPrompt);
    const second = generateAssistantResponse(promptCase.prompt, first.conversationContext);

    assert.equal(second.didFallback, false, `${promptCase.seedPrompt} -> ${promptCase.prompt}`);
    assert.equal(
      second.conversationContext.activePrimaryIntentKind,
      promptCase.expectedPrimaryIntentKind,
      promptCase.prompt,
    );
    assert.equal(
      second.conversationContext.activeFocusDomainKind,
      promptCase.expectedFocusDomainKind,
      promptCase.prompt,
    );
  }
});

test("practical resource prompts no longer fall back into town-fit just because a town name is present", () => {
  const cases = [
    ["does swiggy delivers in shimla?", "food_water", "/food#"],
    ["tell me about water situation in naggar", "food_water", "/food#"],
    ["tell me about banking in bir", "banking", "/banking#"],
    ["safety in naggar", "women_safety", "/womens-safety#"],
    ["property in palampur", "property", "/property-rules#"],
    ["first month in dharamshala", "moving", "/first-30-days#"],
  ] as const;

  for (const [prompt, responderKind, citationPrefix] of cases) {
    const response = generateAssistantResponse(prompt);

    assert.equal(response.didFallback, false, prompt);
    assert.equal(response.responderKind, responderKind, prompt);
    assert.ok(response.citations.some((citation) => citation.href.startsWith(citationPrefix)), prompt);
  }
});
