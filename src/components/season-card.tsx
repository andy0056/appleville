import type { Town } from "@/lib/towns";

const panels: { key: keyof Town["seasonality"]; label: string; icon: string; accent: string }[] = [
  { key: "monsoonRisk", label: "Monsoon (Jul–Sep)", icon: "🌧", accent: "text-blue-700" },
  { key: "winterReality", label: "Winter (Dec–Feb)", icon: "❄️", accent: "text-sky-700" },
  { key: "peakTouristMonths", label: "Peak tourism", icon: "🚗", accent: "text-amber-700" },
];

export function SeasonCard({ town }: { town: Town }) {
  const { seasonality } = town;

  return (
    <div className="card p-5 md:p-6">
      <p className="eyebrow">What changes by season</p>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-xs font-medium text-[var(--forest)]">Best months:</span>
        <span className="rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.5)] px-3 py-0.5 text-xs font-semibold text-[var(--foreground)]">
          {seasonality.bestMonths}
        </span>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {panels.map((panel) => (
          <div
            key={panel.key}
            className="rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.4)] p-4"
          >
            <p className="text-sm font-semibold text-[var(--foreground)]">
              {panel.icon} {panel.label}
            </p>
            <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
              {seasonality[panel.key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
