import test from "node:test";
import assert from "node:assert/strict";
import { buildDecisionProfile } from "./decision-profile.ts";

test("buildDecisionProfile returns stable plain-language traits", () => {
  const profile = buildDecisionProfile({
    stayLength: "long",
    persona: "family",
    pace: "quiet",
    access: "very",
    tourismTolerance: "low",
    optimizeFor: "home-base",
  });

  assert.deepEqual(profile, [
    { id: "stay", label: "Stay shape", value: "Longer-stay focus" },
    { id: "life", label: "Life setup", value: "Family-oriented" },
    { id: "pace", label: "Pace", value: "Quiet preferred" },
    { id: "access", label: "Access", value: "Access matters a lot" },
    { id: "pressure", label: "Tourist pressure", value: "Lower tourist pressure" },
    { id: "priority", label: "Primary aim", value: "Home-base oriented" },
  ]);
});

test("buildDecisionProfile keeps empty answers visibly incomplete", () => {
  const profile = buildDecisionProfile({});

  assert.equal(profile.length, 6);
  assert.ok(profile.every((item) => item.value === null));
});
