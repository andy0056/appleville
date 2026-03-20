import test from "node:test";
import assert from "node:assert/strict";
import { assistantCorpus } from "./assistant/corpus.ts";
import { generateAssistantResponse } from "./assistant/respond.ts";
import { parseAssistantIntent, searchAssistantCorpus } from "./assistant/search.ts";

test("assistant corpus includes citation-ready chunks for towns, guides, and resources", () => {
  assert.ok(
    assistantCorpus.some(
      (chunk) =>
        chunk.pathname === "/food" && chunk.anchor === "drinking-water" && chunk.pageType === "resource",
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

test("assistant cites the water section for tap-water questions", () => {
  const response = generateAssistantResponse("Is tap water safe in Himachal?");

  assert.equal(response.didFallback, false);
  assert.ok(response.citations.some((citation) => citation.href === "/food#drinking-water"));
  assert.ok(response.answer.toLowerCase().includes("water"));
});

test("assistant cites property rules for outsider buying questions", () => {
  const response = generateAssistantResponse(
    "Can outsiders buy property in Himachal Pradesh?",
  );

  assert.equal(response.didFallback, false);
  assert.ok(
    response.citations.some((citation) => citation.href.startsWith("/property-rules#")),
  );
});

test("assistant keeps town context for follow-up questions", () => {
  const first = generateAssistantResponse("Bir or Dharamshala for a longer stay?");
  const second = generateAssistantResponse("What about for families?", first.conversationContext);

  assert.equal(first.didFallback, false);
  assert.equal(second.didFallback, false);
  assert.deepEqual(second.conversationContext.activeTownSlugs, ["bir", "dharamshala"]);
});

test("assistant comparison answers include a compare next-link", () => {
  const response = generateAssistantResponse("Bir vs Palampur for a longer stay");

  assert.equal(response.didFallback, false);
  assert.ok(response.nextLinks.some((link) => link.href === "/compare?towns=bir,palampur"));
});

test("assistant falls back for out-of-scope questions", () => {
  const response = generateAssistantResponse("What is the weather in Delhi tomorrow?");

  assert.equal(response.didFallback, true);
  assert.equal(response.fallbackReason, "out_of_scope");
});

test("assistant search keeps source diversity instead of returning one page only", () => {
  const intent = parseAssistantIntent("Which towns are best for remote work?");
  const { results } = searchAssistantCorpus(assistantCorpus, intent);
  const uniquePaths = new Set(results.map((result) => result.chunk.pathname));

  assert.ok(results.length > 1);
  assert.ok(uniquePaths.size > 1);
});
