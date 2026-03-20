import test from "node:test";
import assert from "node:assert/strict";
import { assistantCorpus } from "./assistant/corpus.ts";
import { generateAssistantResponse } from "./assistant/respond.ts";
import { parseAssistantIntent } from "./assistant/router.ts";
import { searchAssistantCorpus } from "./assistant/search.ts";
import { getAssistantSearchOptions } from "./assistant/whitelist.ts";

test("assistant corpus includes citation-ready chunks for towns, guides, and resources", () => {
  assert.ok(
    assistantCorpus.some(
      (chunk) =>
        chunk.pathname === "/food" &&
        chunk.anchor === "drinking-water" &&
        chunk.pageType === "resource",
    ),
  );
  assert.ok(
    assistantCorpus.some(
      (chunk) =>
        chunk.pathname === "/guides/best-himachal-towns-for-remote-workers" &&
        chunk.pageType === "guide",
    ),
  );
  assert.ok(
    assistantCorpus.some(
      (chunk) =>
        chunk.pathname === "/towns/palampur" &&
        chunk.anchor === "practical-reality" &&
        chunk.pageType === "town",
    ),
  );
});

test("router sends women-safety town questions into the women safety domain", () => {
  const intent = parseAssistantIntent("How safe is Naggar for women?");

  assert.equal(intent.intentKind, "women_safety");
  assert.equal(intent.subIntent, "town_safety");
  assert.deepEqual(intent.townSlugs, ["naggar"]);
});

test("router classifies outsider property queries correctly", () => {
  const intent = parseAssistantIntent("How can I buy property in Manali? I am from Mumbai");

  assert.equal(intent.intentKind, "property");
  assert.equal(intent.userProfile, "out_of_state_indian");
  assert.deepEqual(intent.townSlugs, ["manali"]);
});

test("property whitelist excludes unrelated resource pages", () => {
  const intent = parseAssistantIntent("How can I buy property in Manali? I am from Mumbai");
  const { results } = searchAssistantCorpus(
    assistantCorpus,
    intent,
    getAssistantSearchOptions(intent),
  );

  assert.ok(results.length > 0);
  assert.ok(results.every((result) => result.chunk.pathname === "/property-rules"));
});

test("assistant cites the water section for tap-water questions", () => {
  const response = generateAssistantResponse("Is tap water safe in Himachal?");

  assert.equal(response.didFallback, false);
  assert.equal(response.responderKind, "food_water");
  assert.ok(response.citations.some((citation) => citation.href === "/food#drinking-water"));
  assert.ok(response.answer.toLowerCase().includes("tap-water") || response.answer.toLowerCase().includes("purification") || response.answer.toLowerCase().includes("boiling"));
});

test("assistant gives a straight women-safety answer for Naggar", () => {
  const response = generateAssistantResponse("How safe is Naggar for women?");

  assert.equal(response.didFallback, false);
  assert.equal(response.responderKind, "women_safety");
  assert.ok(response.answer.toLowerCase().includes("naggar"));
  assert.ok(response.keyPoints.length > 0);
  assert.ok(response.citations.some((citation) => citation.href.startsWith("/womens-safety#")));
  assert.ok(
    response.keyPoints.every(
      (point) =>
        !point.toLowerCase().startsWith("naggar safety profile:") &&
        !point.toLowerCase().startsWith("practical reality:"),
    ),
  );
});

test("assistant answers outsider property queries from property rules instead of unrelated town chunks", () => {
  const response = generateAssistantResponse(
    "How can I buy property in Manali? I am from Mumbai",
  );

  assert.equal(response.didFallback, false);
  assert.equal(response.responderKind, "property");
  assert.ok(response.answer.toLowerCase().includes("out-of-state indian"));
  assert.ok(response.answer.toLowerCase().includes("lease") || response.answer.toLowerCase().includes("buy"));
  assert.ok(
    response.citations.every((citation) => citation.href.startsWith("/property-rules#")),
  );
  assert.ok(
    response.keyPoints.every(
      (point) =>
        !point.toLowerCase().includes("outage") &&
        !point.toLowerCase().includes("power"),
    ),
  );
});

test("assistant keeps property context for follow-up lease questions", () => {
  const first = generateAssistantResponse("Can outsiders buy property in Himachal?");
  const second = generateAssistantResponse("What about lease instead?", first.conversationContext);

  assert.equal(first.didFallback, false);
  assert.equal(second.didFallback, false);
  assert.equal(second.responderKind, "property");
  assert.equal(second.conversationContext.activeIntentKind, "property");
});

test("assistant keeps town comparison context for follow-up family questions", () => {
  const first = generateAssistantResponse("Bir or Dharamshala for a longer stay?");
  const second = generateAssistantResponse("What about for families?", first.conversationContext);

  assert.equal(first.didFallback, false);
  assert.equal(second.didFallback, false);
  assert.equal(second.responderKind, "comparison");
  assert.deepEqual(
    second.conversationContext.activeTownSlugs.slice().sort(),
    ["bir", "dharamshala"],
  );
});

test("assistant comparison answers include a compare next-link", () => {
  const response = generateAssistantResponse("Bir vs Palampur for a longer stay");

  assert.equal(response.didFallback, false);
  assert.ok(response.nextLinks.some((link) => link.href === "/compare?towns=palampur,bir" || link.href === "/compare?towns=bir,palampur"));
});

test("assistant falls back for out-of-scope questions", () => {
  const response = generateAssistantResponse("What is the weather in Delhi tomorrow?");

  assert.equal(response.didFallback, true);
  assert.equal(response.fallbackReason, "out_of_scope");
});

test("generic assistant search keeps source diversity instead of returning one page only", () => {
  const intent = parseAssistantIntent("Which towns are best for remote work?");
  const { results } = searchAssistantCorpus(
    assistantCorpus,
    intent,
    getAssistantSearchOptions(intent),
  );
  const uniquePaths = new Set(results.map((result) => result.chunk.pathname));

  assert.ok(results.length > 1);
  assert.ok(uniquePaths.size > 1);
});
