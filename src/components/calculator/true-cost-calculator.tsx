"use client";

import { useState } from "react";
import { mappedCalculatorData, globalModifiers } from "@/lib/calculator-data";

export function TrueCostCalculator() {
  const [townSlug, setTownSlug] = useState(mappedCalculatorData[0].slug);
  const [householdSize, setHouseholdSize] = useState<"solo" | "couple">("solo");
  
  // Housing
  const [housing, setHousing] = useState<"1bhk" | "2bhk" | "coliving">("1bhk");
  
  // Food & Lifestyle Options
  const [hasCook, setHasCook] = useState(false);
  const [eatOutFreq, setEatOutFreq] = useState<"rare" | "weekly" | "often">("rare");
  const [isImportedDiet, setIsImportedDiet] = useState(false);
  
  // Transport & Utilities
  const [transport, setTransport] = useState<"walk" | "scooty" | "taxi">("walk");
  const [isWinter, setIsWinter] = useState(false);
  const [needsCoworking, setNeedsCoworking] = useState(false);

  const tData = mappedCalculatorData.find((t) => t.slug === townSlug) || mappedCalculatorData[0];

  // Force valid selection if town doesn't have coliving
  const hasColiving = tData.rent.coliving !== null;

  // Logic multi-pliers
  const houseMultiplier = householdSize === "solo" ? 0.6 : 1.0;

  // 1. Rent
  const rawRent = tData.rent[housing as "1bhk"|"2bhk"] || tData.rent.coliving || tData.rent["1bhk"]; // fallback
  const rentCost = housing === "coliving" && householdSize === "couple" ? rawRent * 1.8 : rawRent;

  // 2. Food / Groceries
  const baseGroceries = tData.groceries * houseMultiplier;
  const importedPremium = isImportedDiet ? globalModifiers.importedDietPremium * houseMultiplier : 0;
  
  let mealsOutCount = 0;
  if (eatOutFreq === "weekly") mealsOutCount = 4;
  if (eatOutFreq === "often") mealsOutCount = 12;
  const mealsOutCost = mealsOutCount * tData.mealOut * (householdSize === "solo" ? 0.6 : 1.0);

  const maidCost = hasCook ? tData.maid : 0;
  const foodTotal = baseGroceries + importedPremium + mealsOutCost + maidCost;

  // 3. Utilities & Housing
  const utilCost = globalModifiers.baseUtilities + tData.utilitiesLPG + (isWinter ? globalModifiers.winterHeatingPremium : 0);

  // 4. Lifestyle & Transport
  const transportCost = globalModifiers.transport[transport] * (householdSize === "couple" && transport !== "scooty" ? 1.5 : 1.0);
  const coworkingCost = (needsCoworking && tData.coworking) ? (tData.coworking * (householdSize === "couple" ? 2 : 1)) : 0;
  const lifestyleTotal = transportCost + coworkingCost;

  const totalCost = rentCost + foodTotal + utilCost + lifestyleTotal;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
      <div className="space-y-6">
        <div className="card space-y-8 p-6 md:p-8">
          
          {/* Town & People */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <label className="eyebrow block">Where to?</label>
              <select
                title="Select Town"
                value={townSlug}
                onChange={(e) => {
                  setTownSlug(e.target.value);
                  const newTown = mappedCalculatorData.find(t => t.slug === e.target.value);
                  if (housing === "coliving" && newTown?.rent.coliving === null) setHousing("1bhk");
                }}
                className="w-full rounded-[16px] border border-[var(--line)] bg-[rgba(255,255,255,0.5)] p-4 focus:border-[var(--accent)] focus:outline-none"
              >
                {mappedCalculatorData.map((t) => (
                  <option key={t.slug} value={t.slug}>{t.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-3">
              <label className="eyebrow block">Household Size</label>
              <div className="flex rounded-[16px] border border-[var(--line)] bg-[rgba(255,255,255,0.5)] p-1">
                {(["solo", "couple"] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setHouseholdSize(opt)}
                    className={`flex-1 rounded-[12px] py-3 text-sm font-medium capitalize transition-colors ${householdSize === opt ? "bg-[var(--accent)] text-white shadow" : "hover:bg-[rgba(0,0,0,0.02)]"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <hr className="border-[var(--line)]" />

          {/* Housing */}
          <div className="space-y-4">
            <label className="eyebrow block">Housing Setup</label>
            <div className="grid grid-cols-3 gap-3">
              {(["1bhk", "2bhk"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setHousing(opt)}
                  className={`rounded-[16px] border px-4 py-3 text-sm font-medium uppercase transition-colors ${housing === opt ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-[var(--line)] hover:border-[var(--forest)]"}`}
                >
                  {opt}
                  <div className={`mt-1 text-xs font-normal opacity-70`}>
                    ₹{tData.rent[opt].toLocaleString("en-IN")}
                  </div>
                </button>
              ))}
              <button
                disabled={!hasColiving}
                onClick={() => setHousing("coliving")}
                className={`rounded-[16px] border px-4 py-3 text-sm font-medium uppercase transition-colors ${!hasColiving ? "cursor-not-allowed bg-[var(--line)] opacity-40 text-[var(--muted)]" : housing === "coliving" ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-[var(--line)] hover:border-[var(--forest)]"}`}
              >
                Coliving
                {hasColiving && (
                  <div className={`mt-1 text-xs font-normal opacity-70`}>
                    ₹{tData.rent.coliving?.toLocaleString("en-IN")}
                  </div>
                )}
              </button>
            </div>
          </div>

          <hr className="border-[var(--line)]" />

          {/* Food Options */}
          <div className="space-y-4">
            <label className="eyebrow block">Dining & Groceries</label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex cursor-pointer items-center justify-between rounded-[16px] border border-[var(--line)] p-4 transition-colors hover:border-[var(--forest)]">
                <span className="text-sm font-medium">Add Part-Time Cook</span>
                <input
                  type="checkbox"
                  checked={hasCook}
                  onChange={(e) => setHasCook(e.target.checked)}
                  className="h-5 w-5 rounded accent-[var(--accent)]"
                />
              </label>
              <label className="flex cursor-pointer items-center justify-between rounded-[16px] border border-[var(--line)] p-4 transition-colors hover:border-[var(--forest)]">
                <span className="text-sm font-medium">Imported Ingredients</span>
                <input
                  type="checkbox"
                  checked={isImportedDiet}
                  onChange={(e) => setIsImportedDiet(e.target.checked)}
                  className="h-5 w-5 rounded accent-[var(--accent)]"
                />
              </label>
            </div>
            
            <div className="space-y-3">
              <p className="text-xs font-medium text-[var(--muted)]">Eating Out Frequency</p>
              <div className="flex rounded-[16px] border border-[var(--line)] bg-[rgba(255,255,255,0.5)] p-1">
                {[
                  { id: "rare", label: "Rarely" },
                  { id: "weekly", label: "1x a Week" },
                  { id: "often", label: "3x a Week" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setEatOutFreq(opt.id as any)}
                    className={`flex-1 rounded-[12px] py-2 text-sm font-medium transition-colors ${eatOutFreq === opt.id ? "bg-[var(--accent)] text-[var(--background)] shadow" : "hover:bg-[rgba(0,0,0,0.02)]"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <hr className="border-[var(--line)]" />

          {/* Utilities & Transport */}
          <div className="space-y-4">
            <label className="eyebrow block">Logistics & Utilities</label>
            
            <div className="space-y-3">
              <p className="text-xs font-medium text-[var(--muted)]">Primary Transport</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "walk", label: "Walk / Bus" },
                  { id: "scooty", label: "Rent Scooty" },
                  { id: "taxi", label: "Frequent Taxis" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setTransport(opt.id as any)}
                    className={`rounded-[12px] border py-2 text-xs font-medium transition-colors ${transport === opt.id ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-[var(--line)] hover:border-[var(--forest)]"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              <label className="flex cursor-pointer items-center justify-between rounded-[16px] border border-[var(--line)] p-4 transition-colors hover:border-[var(--forest)]">
                <span className="text-sm font-medium">Winter Heating</span>
                <input
                  type="checkbox"
                  checked={isWinter}
                  onChange={(e) => setIsWinter(e.target.checked)}
                  className="h-5 w-5 rounded accent-[var(--accent)]"
                />
              </label>
              <label className={`flex cursor-pointer items-center justify-between rounded-[16px] border border-[var(--line)] p-4 transition-colors ${!tData.coworking ? "opacity-50" : "hover:border-[var(--forest)]"}`}>
                <span className="text-sm font-medium">Cowork {tData.coworking ? "" : "(N/A)"}</span>
                <input
                  type="checkbox"
                  disabled={!tData.coworking}
                  checked={needsCoworking && !!tData.coworking}
                  onChange={(e) => setNeedsCoworking(e.target.checked)}
                  className="h-5 w-5 rounded accent-[var(--accent)]"
                />
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
        <p className="mt-2 text-center text-sm text-[var(--muted)]">per month for {householdSize}</p>

        <div className="mt-8 space-y-4">
          <div className="flex justify-between border-b border-[var(--line)] pb-3 text-sm">
            <span className="text-[var(--muted)]">Rent ({housing.toUpperCase()})</span>
            <span className="font-medium text-[var(--foreground)]">₹{rentCost.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between border-b border-[var(--line)] pb-3 text-sm">
            <span className="text-[var(--muted)]">
              Food & Groceries {hasCook && <span className="text-xs text-[var(--forest)]">+ Maid</span>}
            </span>
            <span className="font-medium text-[var(--foreground)]">₹{Math.round(foodTotal).toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between border-b border-[var(--line)] pb-3 text-sm">
            <span className="text-[var(--muted)]">Utilities & Heating</span>
            <span className="font-medium text-[var(--foreground)]">₹{utilCost.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between border-[var(--line)] pb-1 text-sm">
            <span className="text-[var(--muted)]">Transport & Lifestyle</span>
            <span className="font-medium text-[var(--foreground)]">₹{Math.round(lifestyleTotal).toLocaleString("en-IN")}</span>
          </div>
        </div>
        <p className="mt-6 rounded-[12px] bg-[rgba(255,250,242,0.94)] p-4 text-xs leading-6 text-[var(--muted)]">
          Powered directly by Appleville's 2026 ground research in {tData.name}. 
          {hasCook && tData.maid > 0 && ` Modeler applied exact local maid wages (₹${tData.maid.toLocaleString("en-IN")}/mo).`}
        </p>
      </div>
    </div>
  );
}
