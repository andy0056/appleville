import test from "node:test";
import assert from "node:assert/strict";
import { filterAndSortTowns, getTownCardHighlights, getTownMetricRow } from "./town-discovery.ts";
import { towns } from "./towns.ts";

test("filterAndSortTowns applies AND discovery-fit filters", () => {
  const filtered = filterAndSortTowns(towns, {
    query: "",
    strengths: ["quiet", "longStayFit"],
    budget: "all",
    sort: "editorial",
  });

  assert.deepEqual(
    filtered.map((town) => town.slug),
    ["palampur"],
  );
});

test("filterAndSortTowns uses editorial remote-work tags instead of a raw >=4 cutoff", () => {
  const filtered = filterAndSortTowns(towns, {
    query: "",
    strengths: ["remoteWork"],
    budget: "all",
    sort: "editorial",
  });

  assert.ok(filtered.some((town) => town.slug === "palampur"));
  assert.ok(filtered.some((town) => town.slug === "naggar"));
});

test("filterAndSortTowns sorts by accessibility descending", () => {
  const sorted = filterAndSortTowns(towns, {
    query: "",
    strengths: [],
    budget: "all",
    sort: "accessibility",
  });

  assert.ok(sorted.length > 1);
  assert.ok(sorted[0].accessibility >= sorted[1].accessibility);
  assert.equal(sorted[0].slug, "shimla");
});

test("town card helpers produce concise discovery signals", () => {
  const palampur = towns.find((town) => town.slug === "palampur");
  assert.ok(palampur);

  assert.deepEqual(getTownMetricRow(palampur), [
    { label: "Remote work", value: 3 },
    { label: "Quiet", value: 5 },
    { label: "Access", value: 3 },
  ]);
  assert.deepEqual(getTownCardHighlights(palampur), ["Quiet living", "Long stays"]);
});
