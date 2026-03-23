"use client";

import { useState } from "react";
import { calculatorData, modifiers } from "@/lib/calculator-data";

export function TrueCostCalculator() {
  const [town, setTown] = useState(calculatorData[0].slug);
  const [housing, setHousing] = useState<"1bhk" | "2bhk" | "3bhk" | "coliving">("1bhk");
  const [food, setFood] = useState<"local" | "mixed" | "imported">("mixed");
  const [isWinter, setIsWinter] = useState(false);
  const [needsCoworking, setNeedsCoworking] = useState(false);

  const selectedTown = calculatorData.find((t) => t.slug === town) || calculatorData[0];

  const rentCost = selectedTown.rent[housing];
  const foodCost = modifiers.food[food];
  const utilityCost = modifiers.utilities.base + (isWinter ? modifiers.utilities.winterHeating : 0);
  const lifestyleCost = modifiers.lifestyle.internet + modifiers.lifestyle.transport + (needsCoworking ? modifiers.lifestyle.coworking : 0);

  const totalCost = rentCost + foodCost + utilityCost + lifestyleCost;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
      <div className="space-y-6">
        <div className="card space-y-6 p-6 md:p-8">
          <div className="space-y-3">
            <label className="eyebrow block">Where are you looking?</label>
            <select
              title="Town Selection"
              value={town}
              onChange={(e) => setTown(e.target.value)}
              className="w-full rounded-[16px] border border-[var(--line)] bg-[rgba(255,255,255,0.5)] p-4 text-base focus:border-[var(--accent)] focus:outline-none"
            >
              {calculatorData.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label className="eyebrow block">Housing Setup</label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["1bhk", "2bhk", "3bhk", "coliving"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setHousing(opt as any)}
                  className={`rounded-[16px] border px-4 py-3 text-sm font-medium transition-colors ${
                    housing === opt
                      ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                      : "border-[var(--line)] bg-[rgba(255,255,255,0.5)] hover:border-[var(--forest)]"
                  }`}
                >
                  {opt.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="eyebrow block">Food & Dining</label>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { id: "local", label: "Local & Home Meals" },
                { id: "mixed", label: "Mixed (Cafes + Cook)" },
                { id: "imported", label: "Imported / Fine Dining" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setFood(opt.id as any)}
                  className={`rounded-[16px] border px-4 py-3 text-sm font-medium transition-colors ${
                    food === opt.id
                      ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                      : "border-[var(--line)] bg-[rgba(255,255,255,0.5)] hover:border-[var(--forest)]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="eyebrow block">Add-ons</label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex cursor-pointer items-center gap-3 rounded-[16px] border border-[var(--line)] bg-[rgba(255,255,255,0.5)] p-4 hover:border-[var(--forest)]">
                <input
                  type="checkbox"
                  checked={isWinter}
                  onChange={(e) => setIsWinter(e.target.checked)}
                  className="h-5 w-5 rounded accent-[var(--accent)]"
                />
                <span className="text-sm font-medium">
                  Winter Heating (+₹{modifiers.utilities.winterHeating.toLocaleString("en-IN")})
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-[16px] border border-[var(--line)] bg-[rgba(255,255,255,0.5)] p-4 hover:border-[var(--forest)]">
                <input
                  type="checkbox"
                  checked={needsCoworking}
                  onChange={(e) => setNeedsCoworking(e.target.checked)}
                  className="h-5 w-5 rounded accent-[var(--accent)]"
                />
                <span className="text-sm font-medium">
                  Coworking Space (+₹{modifiers.lifestyle.coworking.toLocaleString("en-IN")})
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="card sticky top-24 h-fit bg-[var(--card)] p-6 md:p-8">
        <p className="eyebrow text-center">Estimated Monthly Cost</p>
        <p className="mt-4 text-center text-4xl font-semibold tracking-tight text-[var(--accent)] md:text-5xl">
          ₹{totalCost.toLocaleString("en-IN")}
        </p>
        <p className="mt-2 text-center text-sm text-[var(--muted)]">per month for 1 person</p>

        <div className="mt-8 space-y-4">
          <div className="flex justify-between border-b border-[var(--line)] pb-3 text-sm">
            <span className="text-[var(--muted)]">Rent ({housing.toUpperCase()})</span>
            <span className="font-medium text-[var(--foreground)]">
              ₹{rentCost.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex justify-between border-b border-[var(--line)] pb-3 text-sm">
            <span className="text-[var(--muted)]">Food & Groceries</span>
            <span className="font-medium text-[var(--foreground)]">
              ₹{foodCost.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex justify-between border-b border-[var(--line)] pb-3 text-sm">
            <span className="text-[var(--muted)]">Utilities & Heating</span>
            <span className="font-medium text-[var(--foreground)]">
              ₹{utilityCost.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex justify-between border-b border-[var(--line)] pb-3 text-sm">
            <span className="text-[var(--muted)]">Internet, Transport & Coworking</span>
            <span className="font-medium text-[var(--foreground)]">
              ₹{lifestyleCost.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
        <p className="mt-6 rounded-[12px] bg-[rgba(255,250,242,0.94)] p-4 text-xs leading-6 text-[var(--muted)]">
          Estimates are based on 2026 ground research. Real costs vary heavily by neighborhood
          and actual consumption. Calculations exclude one-time agent fees (usually equal to 1 month rent).
        </p>
      </div>
    </div>
  );
}
