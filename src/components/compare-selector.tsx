"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Town } from "@/lib/towns";

type CompareSelectorProps = {
  towns: Town[];
  initialSelected: string[];
};

export function CompareSelector({ towns, initialSelected }: CompareSelectorProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>(initialSelected);

  const selectedCount = selected.length;
  const canCompare = selectedCount >= 2;

  const sortedTowns = useMemo(() => towns.slice().sort((a, b) => a.name.localeCompare(b.name)), [towns]);

  function toggleTown(slug: string) {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((item) => item !== slug);
      if (prev.length >= 4) return prev;
      return [...prev, slug];
    });
  }

  function submitCompare() {
    if (!canCompare) return;
    router.push(`/compare?towns=${selected.join(",")}`);
  }

  return (
    <div className="card p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Choose towns</p>
          <h2 className="mt-2 text-2xl font-semibold">Build your own comparison</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--muted)]">
            Pick 2 to 4 towns and compare them side by side. This is useful if
            you already have a shortlist in mind.
          </p>
        </div>
        <button
          type="button"
          onClick={submitCompare}
          disabled={!canCompare}
          className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Compare {selectedCount > 0 ? `(${selectedCount})` : ""}
        </button>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {sortedTowns.map((town) => {
          const active = selected.includes(town.slug);
          const locked = !active && selected.length >= 4;

          return (
            <button
              key={town.slug}
              type="button"
              onClick={() => toggleTown(town.slug)}
              disabled={locked}
              className={`rounded-2xl border p-4 text-left transition ${
                active
                  ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                  : "border-[var(--line)] bg-[var(--card)] hover:border-[var(--accent)]/50"
              } ${locked ? "cursor-not-allowed opacity-50" : ""}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{town.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--forest)]">
                    {town.district}
                  </p>
                </div>
                <span className="text-xs text-[var(--muted)]">{active ? "Selected" : "Pick"}</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{town.archetype}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
