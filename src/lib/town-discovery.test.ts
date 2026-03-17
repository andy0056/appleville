import test from "node:test";
import assert from "node:assert/strict";
import { filterAndSortTowns, getTownCardHighlights, getTownMetricRow } from "./town-discovery.ts";
import { towns } from "./towns.ts";

test("filterAndSortTowns applies AND strength filters", () => {
  const filtered = filterAndSortTowns(towns, {
    query: "",
    strengths: ["quiet", "longStayFit"],
    budget: "all",
    sort: "editorial",
  });

  assert.ok(filtered.length > 0);
  assert.ok(filtered.every((town) => town.quiet >= 4 && town.longStayFit >= 4));
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
  assert.ok(getTownCardHighlights(palampur).includes("Quiet living"));
});
