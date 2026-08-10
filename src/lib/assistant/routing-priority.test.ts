import assert from "node:assert/strict";
import test from "node:test";

import { generateAssistantResponse } from "./respond.ts";

async function citedPaths(query: string) {
  return (await generateAssistantResponse(query)).citations.map((c) => c.href.split("#")[0]);
}

test("personal safety outranks an incidental property word", async () => {
  // "rent" used to score property at 82 while "woman" scored safety at 74, so
  // this returned Section 118 at high confidence. The two domains fail
  // asymmetrically and safety has to win when both fire.
  const paths = await citedPaths("Is it okay for a single woman to rent alone there?");
  assert.ok(paths.includes("/womens-safety"), `expected /womens-safety, got ${paths.join(", ")}`);
  assert.ok(!paths.includes("/property-rules"), "property rules should not answer a safety question");
});

test("safety questions asked without the word 'safety' still route to safety", async () => {
  for (const query of [
    "Can I walk back after dark?",
    "My daughter wants to move there by herself, should I worry?",
  ]) {
    const paths = await citedPaths(query);
    assert.ok(paths.includes("/womens-safety"), `"${query}" cited ${paths.join(", ") || "nothing"}`);
  }
});

test("property questions still route to property", async () => {
  // The safety priority bump must not swing the other way.
  for (const query of ["Can an NRI buy property in Himachal?", "Section 118"]) {
    const paths = await citedPaths(query);
    assert.ok(paths.includes("/property-rules"), `"${query}" cited ${paths.join(", ") || "nothing"}`);
  }
});

test("a ranking question cites the guide that answers it, not only towns", async () => {
  const paths = await citedPaths("best Himachal towns for remote workers");
  assert.equal(
    paths[0],
    "/guides/best-himachal-towns-for-remote-workers",
    `expected the guide to lead, got ${paths.join(", ")}`,
  );
  // Towns remain as the supporting specifics.
  assert.ok(paths.some((p) => p.startsWith("/towns/")), "town pages should still be cited");
});

test("a trial-move question cites the trial-move guide", async () => {
  // Previously answered with two citations to /first-30-days, which covers the
  // month after you commit — the opposite of testing before you commit.
  const paths = await citedPaths("how to test a move before committing");
  assert.ok(
    paths.includes("/guides/how-to-test-a-move-before-committing"),
    `expected the trial-move guide, got ${paths.join(", ")}`,
  );
});
