import Link from "next/link";
import { getTownBySlug, Town } from "@/lib/towns";

const rows = [
  { key: "remoteWork", label: "Remote work" },
  { key: "accessibility", label: "Accessibility" },
  { key: "quiet", label: "Quiet" },
  { key: "familyFit", label: "Family fit" },
  { key: "tourismIntensity", label: "Tourism" },
  { key: "longStayFit", label: "Long-stay fit" },
] as const;

export function CompareGrid({ slugs }: { slugs: string[] }) {
  const selected: Town[] = slugs
    .map((slug) => getTownBySlug(slug))
    .filter((town): town is Town => Boolean(town));

  if (selected.length < 2) {
    return (
      <div className="card p-6 md:p-8">
        <p className="text-base leading-8 text-[var(--muted)]">
          Pick at least two towns to make the comparison useful.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-[24px] border border-[var(--line)] bg-[var(--card)]">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-[var(--accent-soft)]/60">
            <tr>
              <th className="px-5 py-4 font-semibold">Dimension</th>
              {selected.map((town) => (
                <th key={town.slug} className="px-5 py-4 font-semibold">
                  {town.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-t border-[var(--line)]">
                <td className="px-5 py-4 font-medium">{row.label}</td>
                {selected.map((town) => (
                  <td key={town.slug} className="px-5 py-4 text-[var(--muted)]">
                    {town[row.key]}/5
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t border-[var(--line)] align-top">
              <td className="px-5 py-4 font-medium">Tradeoff</td>
              {selected.map((town) => (
                <td key={town.slug} className="px-5 py-4 text-[var(--muted)]">
                  {town.tradeoff}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {selected.map((town) => (
          <div key={town.slug} className="card p-5">
            <h3 className="text-xl font-semibold">{town.name}</h3>
            <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{town.practicalReality}</p>
            <Link href={`/towns/${town.slug}`} className="mt-4 inline-block text-sm font-semibold text-[var(--accent)]">
              View full town profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
