import type { Town } from "@/lib/towns";

function formatRange(range: [number, number]): string {
  return `₹${range[0].toLocaleString("en-IN")}–${range[1].toLocaleString("en-IN")}`;
}

export function CostSnapshot({ town }: { town: Town }) {
  const { costOfLiving, utilities } = town;

  const rows = [
    { label: "Rent (furnished 1BHK)", value: formatRange(costOfLiving.rent1bhkRange) },
    { label: "Rent (furnished 2BHK)", value: formatRange(costOfLiving.rent2bhkRange) },
    { label: "Groceries (couple)", value: formatRange(costOfLiving.groceriesCouple) },
    { label: "Mid-range meal for two", value: `₹${costOfLiving.mealForTwo.toLocaleString("en-IN")}` },
    ...(costOfLiving.coworkingDesk
      ? [{ label: "Coworking desk", value: formatRange(costOfLiving.coworkingDesk) }]
      : []),
    ...(costOfLiving.colivingPackage
      ? [{ label: "Coliving package", value: formatRange(costOfLiving.colivingPackage) }]
      : []),
    { label: "LPG cylinder (14.2 kg)", value: `₹${utilities.lpgCylinder}` },
  ];

  const monthlyLow =
    costOfLiving.rent1bhkRange[0] + costOfLiving.groceriesCouple[0] + 2000;
  const monthlyHigh =
    costOfLiving.rent1bhkRange[1] + costOfLiving.groceriesCouple[1] + 5000;

  return (
    <div className="card p-5 md:p-6">
      <p className="eyebrow">Monthly cost snapshot</p>
      <p className="mt-2 text-xs text-[var(--muted)]">
        Indicative ranges — your actual costs depend on neighbourhood, season, and lifestyle.
      </p>
      <div className="mt-4 divide-y divide-[var(--line)]">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between py-2.5 text-sm"
          >
            <span className="text-[var(--muted)]">{row.label}</span>
            <span className="font-medium text-[var(--foreground)]">{row.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--forest)]">
          Rough monthly total (solo, 1BHK)
        </p>
        <p className="mt-1 text-lg font-semibold text-[var(--foreground)]">
          {formatRange([monthlyLow, monthlyHigh])}/mo
        </p>
      </div>
    </div>
  );
}
