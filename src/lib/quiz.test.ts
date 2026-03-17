import test from "node:test";
import assert from "node:assert/strict";
import { scoreTowns } from "./quiz.ts";

test("scoreTowns returns differentiated top results with launch match fields", () => {
  const ranked = scoreTowns({
    stayLength: "long",
    persona: "family",
    budget: "moderate",
    internet: "non-negotiable",
    pace: "quiet",
    tourismTolerance: "low",
    priority: "family",
    access: "very",
    climate: "moderate",
    optimizeFor: "home-base",
  });

  const topThree = ranked.slice(0, 3);
  const labels = topThree.map((town) => town.matchProfile.label);

  assert.equal(topThree.length, 3);
  assert.equal(labels[0], "Best fit");
  assert.equal(new Set(labels).size, 3);
  assert.ok(topThree[0].score >= topThree[1].score);
  assert.ok(topThree[1].score >= topThree[2].score);

  topThree.forEach((town) => {
    assert.ok(town.matchProfile.fitSummary.length > 0);
    assert.ok(town.matchProfile.bestIf.length > 0);
    assert.ok(town.matchProfile.watchOutFor.length > 0);
    assert.ok(town.matchProfile.whyItRanksHere.length > 0);
    assert.ok(town.matchProfile.strengthChips.length > 0);
  });
});
