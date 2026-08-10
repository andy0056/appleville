import assert from "node:assert/strict";
import test from "node:test";

import { hasCorpusSignal, matchedCorpusTerms, stemToken } from "./vocabulary.ts";
import { hasKnownDomainSignal } from "./query-parser.ts";
import { generateAssistantResponse } from "./respond.ts";

test("stemToken connects the word forms people actually type", async () => {
  assert.equal(stemToken("paragliders"), stemToken("paragliding"));
  assert.equal(stemToken("markets"), stemToken("market"));
});

test("corpus vocabulary covers section titles the curated list missed", async () => {
  // Both are literal section titles in the corpus. Before the vocabulary was
  // derived from the corpus, both were rejected as out of scope.
  for (const query of ["vegetable markets", "shetravel policy", "crime data"]) {
    assert.ok(hasCorpusSignal(query), `expected corpus signal for "${query}"`);
    assert.ok(hasKnownDomainSignal(query), `expected domain signal for "${query}"`);
  }
});

test("questions answerable from the corpus are no longer refused outright", async () => {
  for (const query of ["vegetable markets", "SheTravel policy"]) {
    const response = await generateAssistantResponse(query);
    assert.notEqual(
      response.fallbackReason,
      "out_of_scope",
      `"${query}" should not be treated as out of scope`,
    );
  }
});

test("a non-Himachal place name alone is not a corpus signal", async () => {
  // These cities appear in the corpus only as origins people move from, so a
  // query matching nothing else is out of scope even though the name matches.
  assert.deepEqual(matchedCorpusTerms("weather in delhi tomorrow"), ["delhi"]);
  assert.equal(hasCorpusSignal("weather in delhi tomorrow"), false);
  assert.equal(hasCorpusSignal("how far is gurgaon"), false);
});

test("an origin city alongside a real topic still counts as in scope", async () => {
  // The filter drops origin-only matches, not any query that mentions a city.
  // "property prices in mumbai" is about property, which the corpus covers —
  // whether the answer is useful is retrieval's problem, not the gate's.
  // Distinguishing "property in Mumbai" from "property near the Chandigarh
  // border" needs semantics this term gate does not have, and is left to
  // retrieval rather than guessed at here.
  assert.ok(hasCorpusSignal("property prices in mumbai"));
});

test("out-of-scope questions still get the scope refusal, not a weaker one", async () => {
  const response = await generateAssistantResponse("What is the weather in Delhi tomorrow?");
  assert.equal(response.didFallback, true);
  assert.equal(response.fallbackReason, "out_of_scope");
});
