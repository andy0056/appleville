"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FilterSheet } from "@/components/filter-sheet";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { Town } from "@/lib/towns";

type CompareSelectorProps = {
  towns: Town[];
  initialSelected: string[];
  hasUrlSelection: boolean;
  collapsedByDefault?: boolean;
  mobileMode?: "inline" | "sheet";
};

const compareStorageKey = "appleville:compare:towns";

export function CompareSelector({
  towns,
  initialSelected,
  hasUrlSelection,
  collapsedByDefault = false,
  mobileMode = "inline",
}: CompareSelectorProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>(initialSelected);
  const [open, setOpen] = useState(!collapsedByDefault);
  const [shareLabel, setShareLabel] = useState("Share");
  const allowPersistenceRef = useRef(hasUrlSelection);
  const shareResetRef = useRef<number | undefined>(undefined);

  const selectedCount = selected.length;
  const canCompare = selectedCount >= 2;
  const isSheetMode = mobileMode === "sheet";

  const sortedTowns = useMemo(() => towns.slice().sort((a, b) => a.name.localeCompare(b.name)), [towns]);

  useEffect(() => {
    setSelected(initialSelected);
  }, [initialSelected]);

  useEffect(() => {
    if (hasUrlSelection) {
      allowPersistenceRef.current = true;
      return;
    }

    try {
      const saved = window.localStorage.getItem(compareStorageKey);
      if (!saved) {
        allowPersistenceRef.current = true;
        return;
      }

      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) {
        allowPersistenceRef.current = true;
        return;
      }

      const valid = parsed
        .filter((value): value is string => typeof value === "string")
        .filter((slug) => towns.some((town) => town.slug === slug))
        .slice(0, 4);

      if (valid.length < 2) {
        allowPersistenceRef.current = true;
        return;
      }
      if (valid.join(",") === initialSelected.join(",")) {
        allowPersistenceRef.current = true;
        return;
      }

      allowPersistenceRef.current = true;
      router.replace(`/compare?towns=${valid.join(",")}`);
    } catch {
      try {
        window.localStorage.removeItem(compareStorageKey);
      } catch {
        // private browsing
      }
      allowPersistenceRef.current = true;
    }
  }, [hasUrlSelection, initialSelected, router, towns]);

  useEffect(() => {
    if (!allowPersistenceRef.current || selected.length < 2) return;

    try {
      window.localStorage.setItem(compareStorageKey, JSON.stringify(selected));
    } catch {
      // private browsing
    }
  }, [selected]);

  useEffect(() => {
    return () => {
      if (shareResetRef.current !== undefined) {
        window.clearTimeout(shareResetRef.current);
      }
    };
  }, []);

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
    setOpen(false);
  }

  async function handleShare() {
    const url = typeof window === "undefined" ? "" : window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Compare Himachal towns side by side",
          text: "Reopen this Appleville comparison with the same town set.",
          url,
        });
        return;
      }

      await navigator.clipboard.writeText(url);
      setShareLabel("Copied");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      setShareLabel("Share failed");
    }

    if (shareResetRef.current !== undefined) {
      window.clearTimeout(shareResetRef.current);
    }

    shareResetRef.current = window.setTimeout(() => {
      setShareLabel("Share");
      shareResetRef.current = undefined;
    }, 2200);
  }

  const selectedTownTokens = (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-[var(--foreground)]">Selected:</span>
      {selectedCount === 0 ? (
        <span className="text-sm text-[var(--muted)]">Choose at least two towns.</span>
      ) : (
        selected.map((slug) => {
          const town = towns.find((item) => item.slug === slug);
          if (!town) return null;

          return (
            <button
              key={slug}
              type="button"
              onClick={() => toggleTown(slug)}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[rgba(234,215,191,0.28)] px-3 py-1 text-xs text-[var(--muted)] transition hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
            >
              {town.name}
              <span className="text-[var(--muted)]" aria-hidden="true">
                ×
              </span>
            </button>
          );
        })
      )}
    </div>
  );

  const selectorGrid = (
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
            className={`press-scale rounded-2xl border p-4 text-left ${
              active
                ? "border-[var(--accent)] bg-[var(--accent-soft)] shadow-[0_10px_30px_rgba(143,93,59,0.08)]"
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
              <span
                className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${
                  active
                    ? "bg-[rgba(255,255,255,0.6)] text-[var(--foreground)]"
                    : "bg-[rgba(255,255,255,0.35)] text-[var(--muted)]"
                }`}
              >
                {active ? "Selected" : "Pick"}
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{town.archetype}</p>
          </button>
        );
      })}
    </div>
  );

  if (isSheetMode) {
    return (
      <div className="space-y-4">
        <div className="hidden card p-6 md:block md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Edit towns</p>
              <h2 className="mt-2 text-2xl font-semibold">Adjust this comparison set</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--muted)]">
                Swap towns in or out without losing the current comparison logic.
              </p>
            </div>
            <button
              type="button"
              onClick={submitCompare}
              disabled={!canCompare}
              className="w-full rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
            >
              Update comparison {selectedCount > 0 ? `(${selectedCount} selected)` : ""}
            </button>
          </div>

          <div className="mt-5 rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.38)] p-4">
            {selectedTownTokens}
            <p className="mt-3 text-xs leading-6 text-[var(--muted)]">
              You can compare up to four towns at once.
            </p>
          </div>

          {selectorGrid}
        </div>

        <div className="card p-5 md:hidden">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="eyebrow">Edit towns</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Adjust the town set without pushing the selector ahead of the comparison.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2 text-sm font-semibold"
            >
              Edit
            </button>
          </div>
          <div className="mt-4 rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.38)] p-4">
            {selectedTownTokens}
            <p className="mt-3 text-xs leading-6 text-[var(--muted)]">
              You can compare up to four towns at once.
            </p>
          </div>
        </div>

        <FilterSheet
          title="Edit towns"
          description="Pick 2 to 4 towns, then update the current comparison."
          open={open}
          onOpenChange={setOpen}
          footer={
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.4)] px-4 py-3">
              <p className="text-sm leading-6 text-[var(--muted)]">
                {selectedCount} town{selectedCount === 1 ? "" : "s"} selected
              </p>
              <button
                type="button"
                onClick={submitCompare}
                disabled={!canCompare}
                className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Update
              </button>
            </div>
          }
        >
          <div className="rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.38)] p-4">
            {selectedTownTokens}
            <p className="mt-3 text-xs leading-6 text-[var(--muted)]">
              You can compare up to four towns at once.
            </p>
          </div>
          <div className="grid gap-3">{selectorGrid}</div>
        </FilterSheet>

        <MobileActionBar
          primaryLabel="Edit towns"
          primaryOnClick={() => setOpen(true)}
          secondaryLabel={shareLabel}
          secondaryOnClick={handleShare}
          visible={canCompare}
        />
      </div>
    );
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
        <div className="flex flex-col gap-3 md:items-end">
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="rounded-full border border-[var(--line)] bg-[var(--card)] px-5 py-3 text-sm font-semibold md:hidden"
          >
            {open ? "Hide editor" : "Edit towns"}
          </button>
          <button
            type="button"
            onClick={submitCompare}
            disabled={!canCompare}
            className="w-full rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
          >
            Compare {selectedCount > 0 ? `(${selectedCount} selected)` : ""}
          </button>
        </div>
      </div>

      <div className={`${open ? "block" : "hidden"} mt-5 md:block`}>
        <div className="rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.38)] p-4">
          {selectedTownTokens}
          <p className="mt-3 text-xs leading-6 text-[var(--muted)]">
            You can compare up to four towns at once.
          </p>
        </div>

        {selectorGrid}
      </div>
    </div>
  );
}
