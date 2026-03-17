import type { Town } from "./towns.ts";

export type TownStrengthFilter =
  | "remoteWork"
  | "familyFit"
  | "quiet"
  | "accessibility"
  | "longStayFit"
  | "socialEnergy";

export type TownSortKey =
  | "editorial"
  | "accessibility"
  | "quiet"
  | "remoteWork"
  | "familyFit"
  | "longStayFit";

type NumericTownMetric = "accessibility" | "quiet" | "remoteWork" | "familyFit" | "longStayFit";

export type TownFilterState = {
  query: string;
  strengths: TownStrengthFilter[];
  budget: "all" | "moderate-or-easier" | "comfortable-plus";
  sort: TownSortKey;
};

const strengthMeta: Record<
  TownStrengthFilter,
  { label: string; cardLabel: string }
> = {
  remoteWork: { label: "Remote work", cardLabel: "Remote work" },
  familyFit: { label: "Family fit", cardLabel: "Families" },
  quiet: { label: "Quiet", cardLabel: "Quiet living" },
  accessibility: { label: "Accessibility", cardLabel: "Easy access" },
  longStayFit: { label: "Long-stay", cardLabel: "Long stays" },
  socialEnergy: { label: "Social energy", cardLabel: "Social rhythm" },
};

const metricRows = [
  { key: "remoteWork", label: "Remote work" },
  { key: "quiet", label: "Quiet" },
  { key: "accessibility", label: "Access" },
] as const;

export const discoveryStrengthOptions = (
  Object.entries(strengthMeta) as [TownStrengthFilter, { label: string; cardLabel: string }][]
).map(([value, meta]) => ({ value, label: meta.label }));

export const townSortOptions: { value: TownSortKey; label: string }[] = [
  { value: "editorial", label: "Editorial order" },
  { value: "accessibility", label: "Most accessible" },
  { value: "quiet", label: "Quietest" },
  { value: "remoteWork", label: "Best for remote work" },
  { value: "familyFit", label: "Best for families" },
  { value: "longStayFit", label: "Best for long stays" },
];

const sortMetricKey: Record<Exclude<TownSortKey, "editorial">, NumericTownMetric> = {
  accessibility: "accessibility",
  quiet: "quiet",
  remoteWork: "remoteWork",
  familyFit: "familyFit",
  longStayFit: "longStayFit",
};

export function filterAndSortTowns(towns: Town[], state: TownFilterState) {
  const query = state.query.trim().toLowerCase();

  const filtered = towns.filter((town) => {
    if (query && !town.name.toLowerCase().includes(query)) {
      return false;
    }

    if (state.budget === "moderate-or-easier" && town.budget !== "tight" && town.budget !== "moderate") {
      return false;
    }

    if (state.budget === "comfortable-plus" && town.budget !== "comfortable" && town.budget !== "premium") {
      return false;
    }

    return state.strengths.every((key) => town.discoveryStrengths.includes(key));
  });

  if (state.sort === "editorial") {
    return filtered;
  }

  const metricKey = sortMetricKey[state.sort];

  return filtered.slice().sort((a, b) => {
    const difference = b[metricKey] - a[metricKey];
    if (difference !== 0) return difference;
    return a.name.localeCompare(b.name);
  });
}

export function getTownCardHighlights(town: Town) {
  return town.discoveryStrengths
    .map((key) => strengthMeta[key].cardLabel)
    .slice(0, 2);
}

export function getTownMetricRow(town: Town) {
  return metricRows.map((item) => ({
    label: item.label,
    value: town[item.key],
  }));
}
