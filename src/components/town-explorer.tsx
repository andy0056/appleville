"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { TownCard } from "@/components/town-card";
import {
  discoveryStrengthOptions,
  filterAndSortTowns,
  townSortOptions,
  type TownFilterState,
} from "@/lib/town-discovery";
import type { Town } from "@/lib/towns";

const defaultFilters: TownFilterState = {
  query: "",
  strengths: [],
  budget: "all",
  sort: "editorial",
};

export function TownExplorer({ towns }: { towns: Town[] }) {
  const [filters, setFilters] = useState<TownFilterState>(defaultFilters);
  const deferredQuery = useDeferredValue(filters.query);

  const filteredTowns = useMemo(
    () =>
      filterAndSortTowns(towns, {
        ...filters,
        query: deferredQuery,
      }),
    [deferredQuery, filters, towns],
  );

  function toggleStrength(value: TownFilterState["strengths"][number]) {
    setFilters((current) => ({
      ...current,
      strengths: current.strengths.includes(value)
        ? current.strengths.filter((item) => item !== value)
        : [...current.strengths, value],
    }));
  }

  function resetFilters() {
    setFilters(defaultFilters);
  }

  return (
    <div className="space-y-8">
      <div className="card p-5 md:p-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="space-y-4">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[var(--foreground)]">
                Search towns
              </span>
              <input
                type="search"
                value={filters.query}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    query: event.target.value,
                  }))
                }
                placeholder="Search by town name"
                className="rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.72)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
              />
            </label>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-[var(--foreground)]">
                Filter by fit
              </p>
              <p className="text-sm leading-7 text-[var(--muted)]">
                These tags follow Appleville&apos;s editorial reading of each town,
                not just one raw score.
              </p>
              <div className="flex flex-wrap gap-2">
                {discoveryStrengthOptions.map((option) => {
                  const active = filters.strengths.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => toggleStrength(option.value)}
                      className={`press-scale rounded-full border px-3 py-2 text-sm ${
                        active
                          ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--foreground)]"
                          : "border-[var(--line)] bg-[rgba(255,255,255,0.4)] text-[var(--muted)]"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:min-w-[18rem]">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[var(--foreground)]">
                Budget
              </span>
              <select
                value={filters.budget}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    budget: event.target.value as TownFilterState["budget"],
                  }))
                }
                className="rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.72)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
              >
                <option value="all">Any budget</option>
                <option value="moderate-or-easier">Moderate or easier</option>
                <option value="comfortable-plus">Comfortable+</option>
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[var(--foreground)]">
                Sort by
              </span>
              <select
                value={filters.sort}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    sort: event.target.value as TownFilterState["sort"],
                  }))
                }
                className="rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.72)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
              >
                {townSortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm leading-7 text-[var(--muted)]">
            {filteredTowns.length} town{filteredTowns.length === 1 ? "" : "s"} match
            your current filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="secondary-link text-sm font-semibold"
          >
            Reset filters
          </button>
        </div>
      </div>

      {filteredTowns.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredTowns.map((town) => (
            <TownCard key={town.slug} town={town} />
          ))}
        </div>
      ) : (
        <div className="compact-callout">
          <p className="text-base font-semibold text-[var(--foreground)]">
            No towns match that combination yet.
          </p>
          <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
            Try removing one strength filter or resetting the budget filter to
            widen the shortlist.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
