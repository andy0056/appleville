import test from "node:test";
import assert from "node:assert/strict";
import { getRelatedGuideSlugsForResultSet } from "./result-guidance.ts";

test("getRelatedGuideSlugsForResultSet prioritizes family and long-stay guidance", () => {
  const guideSlugs = getRelatedGuideSlugsForResultSet(
    {
      persona: "family",
      priority: "family",
      stayLength: "long",
      optimizeFor: "home-base",
    },
    [{ slug: "palampur" }, { slug: "dharamshala" }, { slug: "solan" }],
  );

  assert.deepEqual(guideSlugs, [
    "best-himachal-towns-for-families",
    "vacation-town-vs-real-life-base",
  ]);
});

test("getRelatedGuideSlugsForResultSet suggests comparison guides when the shortlist is known", () => {
  const guideSlugs = getRelatedGuideSlugsForResultSet(
    {
      pace: "quiet",
      tourismTolerance: "low",
    },
    [{ slug: "bir" }, { slug: "dharamshala" }, { slug: "palampur" }],
  );

  assert.deepEqual(guideSlugs, [
    "bir-vs-dharamshala-vs-palampur",
    "quiet-vs-social-towns-in-himachal",
  ]);
});
