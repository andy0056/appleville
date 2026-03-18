import Link from "next/link";
import { getTownBySlug, Town } from "@/lib/towns";

const rows = [
  {
    key: "remoteWork",
    label: "Remote work",
    description: "How workable steady online work is likely to feel.",
    strengthText: "stronger for steady remote routine",
    preferLower: false,
  },
  {
    key: "accessibility",
    label: "Accessibility",
    description: "How easy road links, errands, and connections are likely to feel.",
    strengthText: "easier for access and day-to-day logistics",
    preferLower: false,
  },
  {
    key: "quiet",
    label: "Quiet",
    description: "How much calmer and slower the day-to-day rhythm is likely to be.",
    strengthText: "quieter and slower",
    preferLower: false,
  },
  {
    key: "familyFit",
    label: "Family fit",
    description: "How safely it reads for family routines and practical comfort.",
    strengthText: "safer for family-shape living",
    preferLower: false,
  },
  {
    key: "tourismIntensity",
    label: "Tourist pressure",
    description: "Higher means more visitor churn and visible tourist energy.",
    strengthText: "lighter on tourist pressure",
    preferLower: true,
  },
  {
    key: "longStayFit",
    label: "Long-stay fit",
    description: "How durable it feels as a medium or longer-term base.",
    strengthText: "stronger as a longer-stay base",
    preferLower: false,
  },
] as const;

type CompareRow = (typeof rows)[number];

function getWinningValue(row: CompareRow, towns: Town[]) {
  const values = towns.map((town) => town[row.key]);
  return row.preferLower ? Math.min(...values) : Math.max(...values);
}

function getRowWinners(row: CompareRow, towns: Town[]) {
  const winningValue = getWinningValue(row, towns);
  return towns.filter((town) => town[row.key] === winningValue);
}

function getTownStrengthsInSet(town: Town, towns: Town[]) {
  return rows
    .filter((row) => getRowWinners(row, towns).some((winner) => winner.slug === town.slug))
    .slice(0, 3);
}

function buildSeparationSummary(towns: Town[]) {
  const summaries = rows
    .map((row) => {
      const values = towns.map((town) => town[row.key]);
      const spread = Math.max(...values) - Math.min(...values);
      const winners = getRowWinners(row, towns);

      return {
        row,
        spread,
        winners,
      };
    })
    .filter((item) => item.spread >= 1)
    .sort((a, b) => b.spread - a.spread)
    .slice(0, 3);

  return summaries.map(({ row, winners }) => {
    const names = winners.map((winner) => winner.name).join(" and ");
    return `${names} ${winners.length > 1 ? "are" : "is"} ${row.strengthText} in this set.`;
  });
}

export function CompareGrid({ slugs }: { slugs: string[] }) {
  const selected: Town[] = slugs
    .map((slug) => getTownBySlug(slug))
    .filter((town): town is Town => Boolean(town));

  const separationSummary = buildSeparationSummary(selected);

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
    <div className="grid gap-5">
      <div
        className="motion-enter-fade card p-5 md:p-6"
        style={{ animationDuration: "200ms" }}
      >
        <p className="eyebrow">How these towns separate</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {separationSummary.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.4)] p-4 text-sm leading-7 text-[var(--muted)]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div
        className="motion-enter-fade hidden overflow-hidden rounded-[24px] border border-[var(--line)] bg-[var(--card)] md:block"
        style={{ animationDelay: "80ms", animationDuration: "220ms" }}
      >
        <div className="border-b border-[var(--line)] bg-[rgba(255,255,255,0.38)] px-5 py-4 text-sm leading-7 text-[var(--muted)]">
          Several towns can be strongest in the same dimension. That means a tie
          within this selected set, not an overall winner.
        </div>
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
            {rows.map((row) => {
              const winningValue = getWinningValue(row, selected);

              return (
                <tr key={row.key} className="border-t border-[var(--line)] align-top">
                  <td className="px-5 py-4">
                    <p className="font-medium">{row.label}</p>
                    <p className="mt-1 max-w-[18rem] text-xs leading-6 text-[var(--muted)]">
                      {row.description}
                    </p>
                  </td>
                  {selected.map((town) => {
                    const isWinner = town[row.key] === winningValue;

                    return (
                      <td key={town.slug} className="px-5 py-4 text-[var(--muted)]">
                        <div
                          className={`rounded-2xl border px-3 py-3 ${
                            isWinner
                              ? "border-[rgba(143,93,59,0.22)] bg-[rgba(234,215,191,0.28)]"
                              : "border-transparent bg-transparent"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-medium text-[var(--foreground)]">{town[row.key]}/5</span>
                            {isWinner ? (
                              <span className="rounded-full bg-[rgba(255,255,255,0.55)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--forest)]">
                                Strongest here
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            <tr className="border-t border-[var(--line)] align-top">
              <td className="px-5 py-4">
                <p className="font-medium">Tradeoff</p>
                <p className="mt-1 max-w-[18rem] text-xs leading-6 text-[var(--muted)]">
                  What each town gives you, and what it asks in return.
                </p>
              </td>
              {selected.map((town) => (
                <td key={town.slug} className="px-5 py-4 text-[var(--muted)]">
                  {town.tradeoff}
                </td>
              ))}
            </tr>
            <tr className="border-t border-[var(--line)] bg-[var(--accent-soft)]/30 align-top">
              <td className="px-5 py-3" colSpan={selected.length + 1}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--forest)]">Practical data</p>
              </td>
            </tr>
            <tr className="border-t border-[var(--line)] align-top">
              <td className="px-5 py-4">
                <p className="font-medium">Monthly estimate</p>
                <p className="mt-1 max-w-[18rem] text-xs leading-6 text-[var(--muted)]">
                  Rough total for solo (1BHK + groceries + utilities).
                </p>
              </td>
              {selected.map((town) => {
                const low = town.costOfLiving.rent1bhkRange[0] + town.costOfLiving.groceriesCouple[0] + 2000;
                const high = town.costOfLiving.rent1bhkRange[1] + town.costOfLiving.groceriesCouple[1] + 5000;
                return (
                  <td key={town.slug} className="px-5 py-4 font-medium text-[var(--foreground)]">
                    ₹{low.toLocaleString("en-IN")}–{high.toLocaleString("en-IN")}/mo
                  </td>
                );
              })}
            </tr>
            <tr className="border-t border-[var(--line)] align-top">
              <td className="px-5 py-4">
                <p className="font-medium">ICU access</p>
                <p className="mt-1 max-w-[18rem] text-xs leading-6 text-[var(--muted)]">
                  Nearest facility with ICU and approximate drive time.
                </p>
              </td>
              {selected.map((town) => (
                <td key={town.slug} className="px-5 py-4 text-[var(--muted)]">
                  <p className="font-medium text-[var(--foreground)]">{town.healthcare.driveTimeMinutes[0]}–{town.healthcare.driveTimeMinutes[1]} min</p>
                  <p className="mt-1 text-xs">{town.healthcare.icuLocation}</p>
                </td>
              ))}
            </tr>
            <tr className="border-t border-[var(--line)] align-top">
              <td className="px-5 py-4">
                <p className="font-medium">Nearest airport</p>
              </td>
              {selected.map((town) => (
                <td key={town.slug} className="px-5 py-4 text-[var(--muted)]">
                  <p className="font-medium text-[var(--foreground)]">{town.transport.airportDistanceKm} km</p>
                  <p className="mt-1 text-xs">{town.transport.nearestAirport}</p>
                </td>
              ))}
            </tr>
            <tr className="border-t border-[var(--line)] align-top">
              <td className="px-5 py-4">
                <p className="font-medium">Best months</p>
              </td>
              {selected.map((town) => (
                <td key={town.slug} className="px-5 py-4 font-medium text-[var(--foreground)]">
                  {town.seasonality.bestMonths}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div
        className="motion-enter-fade grid gap-4 md:hidden"
        style={{ animationDelay: "80ms", animationDuration: "220ms" }}
      >
        {selected.map((town) => (
          <div key={town.slug} className="hover-lift-soft card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold">{town.name}</h3>
                <p className="mt-1 text-sm text-[var(--forest)]">{town.archetype}</p>
              </div>
              <span className="rounded-full bg-[rgba(255,255,255,0.55)] px-3 py-1 text-xs font-semibold text-[var(--foreground)]">
                {town.budget}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {getTownStrengthsInSet(town, selected).map((row) => (
                <span
                  key={`${town.slug}-${row.key}`}
                  className="rounded-full border border-[var(--line)] bg-[rgba(234,215,191,0.28)] px-3 py-1 text-xs text-[var(--muted)]"
                >
                  {row.label}
                </span>
              ))}
            </div>

            <div className="mt-5 space-y-3">
              {rows.map((row) => {
                const winningValue = getWinningValue(row, selected);
                const isWinner = town[row.key] === winningValue;

                return (
                  <div key={`${town.slug}-${row.key}`} className="rounded-2xl border border-[var(--line)] px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium">{row.label}</p>
                        <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{row.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-[var(--foreground)]">{town[row.key]}/5</p>
                        {isWinner ? (
                          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--forest)]">
                            Strongest here
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--muted)]">
              <div>
                <p className="font-semibold text-[var(--foreground)]">Practical read</p>
                <p className="mt-1">{town.practicalReality}</p>
              </div>
              <div>
                <p className="font-semibold text-[var(--foreground)]">Tradeoff</p>
                <p className="mt-1">{town.tradeoff}</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.4)] px-3 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--forest)]">Monthly est.</p>
                <p className="mt-1 text-sm font-semibold">₹{(town.costOfLiving.rent1bhkRange[0] + town.costOfLiving.groceriesCouple[0] + 2000).toLocaleString("en-IN")}–{(town.costOfLiving.rent1bhkRange[1] + town.costOfLiving.groceriesCouple[1] + 5000).toLocaleString("en-IN")}</p>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.4)] px-3 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--forest)]">ICU access</p>
                <p className="mt-1 text-sm font-semibold">{town.healthcare.driveTimeMinutes[0]}–{town.healthcare.driveTimeMinutes[1]} min</p>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.4)] px-3 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--forest)]">Airport</p>
                <p className="mt-1 text-sm font-semibold">{town.transport.airportDistanceKm} km</p>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.4)] px-3 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--forest)]">Best months</p>
                <p className="mt-1 text-xs font-semibold">{town.seasonality.bestMonths}</p>
              </div>
            </div>

            <Link href={`/towns/${town.slug}`} className="mt-5 inline-block text-sm font-semibold text-[var(--accent)]">
              View full town profile
            </Link>
          </div>
        ))}
      </div>

      <div
        className="motion-enter-fade hidden grid-cols-2 gap-4 md:grid xl:grid-cols-3"
        style={{ animationDelay: "140ms", animationDuration: "220ms" }}
      >
        {selected.map((town) => (
          <div key={town.slug} className="card p-5">
            <h3 className="text-xl font-semibold">{town.name}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {getTownStrengthsInSet(town, selected).map((row) => (
                <span
                  key={`${town.slug}-desktop-${row.key}`}
                  className="rounded-full border border-[var(--line)] bg-[rgba(234,215,191,0.22)] px-3 py-1 text-xs text-[var(--muted)]"
                >
                  {row.label}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{town.practicalReality}</p>
            <Link href={`/towns/${town.slug}`} className="mt-4 inline-block text-sm font-semibold text-[var(--accent)]">
              View full town profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
