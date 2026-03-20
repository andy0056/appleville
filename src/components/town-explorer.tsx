"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { FilterSheet } from "@/components/filter-sheet";
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
  const [filtersOpen, setFiltersOpen] = useState(false);
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

  const activeChips = [
    ...filters.strengths.map((value) => {
      const option = discoveryStrengthOptions.find((item) => item.value === value);
      return {
        key: value,
        label: option?.label ?? value,
        onRemove: () => toggleStrength(value),
      };
    }),
    ...(filters.budget !== "all"
      ? [
          {
            key: filters.budget,
            label:
              filters.budget === "moderate-or-easier"
                ? "Moderate or easier"
                : "Comfortable+",
            onRemove: () =>
              setFilters((current) => ({
                ...current,
                budget: "all",
              })),
          },
        ]
      : []),
  ];
  const activeFilterCount = activeChips.length;

  return (
    <div className="space-y-5 md:space-y-8">
      <div className="card p-4 md:p-6">
        <div className="space-y-4 md:hidden">
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

          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3">
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.52)] px-4 py-3 text-sm font-semibold"
            >
              Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}
            </button>

            <label className="grid">
              <span className="sr-only">Sort by</span>
              <select
                value={filters.sort}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    sort: event.target.value as TownFilterState["sort"],
                  }))
                }
                className="min-h-11 rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.72)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
              >
                {townSortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {activeChips.length ? (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {activeChips.map((chip) => (
                  <button
                    key={chip.key}
                    type="button"
                    onClick={chip.onRemove}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-[var(--line)] bg-[rgba(234,215,191,0.3)] px-3 py-2 text-xs font-medium text-[var(--muted)]"
                  >
                    {chip.label}
                    <span aria-hidden="true">×</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="secondary-link text-sm font-semibold"
              >
                Reset filters
              </button>
            </div>
          ) : null}

          <p className="text-sm leading-7 text-[var(--muted)]">
            {filteredTowns.length} town{filteredTowns.length === 1 ? "" : "s"} match
            your current filters.
          </p>
        </div>

        <div className="hidden gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
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

        <div className="mt-5 hidden flex-wrap items-center justify-between gap-3 lg:flex">
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

      <FilterSheet
        title="Town filters"
        description="Narrow the current town set by Appleville's fit tags and budget."
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        footer={
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.4)] px-4 py-3">
            <p className="text-sm leading-6 text-[var(--muted)]">
              {filteredTowns.length} town{filteredTowns.length === 1 ? "" : "s"} match
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="secondary-link text-sm font-semibold"
            >
              Reset
            </button>
          </div>
        }
      >
        <div className="space-y-2">
          <p className="text-sm font-semibold text-[var(--foreground)]">Filter by fit</p>
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

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[var(--foreground)]">Budget</span>
          <select
            value={filters.budget}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                budget: event.target.value as TownFilterState["budget"],
              }))
            }
            className="min-h-11 rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.72)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
          >
            <option value="all">Any budget</option>
            <option value="moderate-or-easier">Moderate or easier</option>
            <option value="comfortable-plus">Comfortable+</option>
          </select>
        </label>
      </FilterSheet>

      {filteredTowns.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredTowns.map((town) => (
            <TownCard
              key={town.slug}
              town={town}
              variant="compact"
              maxHighlights={2}
              maxMetrics={2}
            />
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
