import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { buildPageMetadata } from "@/lib/metadata";
import {
  reliabilityRanking,
  essentialsLoad,
  backupTiers,
  powerTowns,
  heatingOptions,
  propertyChecklist,
  insulationTips,
  powerSources,
} from "@/lib/power-infra";

export const metadata: Metadata = buildPageMetadata({
  title: "Power backup & heating strategy for remote workers in Himachal Pradesh",
  description:
    "Electricity reliability, outage frequency by town and season, UPS vs inverter vs solar backup tiers with costs, heating options, and a property testing checklist.",
  pathname: "/power-backup",
  type: "article",
});

const rankColors: Record<number, string> = {
  1: "bg-emerald-100 text-emerald-800",
  2: "bg-emerald-100 text-emerald-800",
  3: "bg-green-100 text-green-800",
  4: "bg-green-100 text-green-800",
  5: "bg-amber-100 text-amber-800",
  6: "bg-amber-100 text-amber-800",
  7: "bg-orange-100 text-orange-800",
  8: "bg-red-100 text-red-800",
};

export default function PowerBackupPage() {
  return (
    <main className="container-app py-8 md:py-16">
      <div className="mx-auto max-w-5xl space-y-8 md:space-y-14">
        {/* Hero */}
        <div className="space-y-4">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Power backup" },
            ]}
          />
          <p className="eyebrow">Infrastructure guide</p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Power backup &amp; heating strategy
          </h1>
          <p className="max-w-3xl text-base leading-7 text-[var(--muted)] md:text-lg md:leading-8">
            How often you&rsquo;ll face outages, what backup keeps your calls alive,
            and how to stay warm without blowing your budget — town by town.
          </p>
        </div>

        {/* Reliability ranking */}
        <section className="card p-5 md:p-6">
          <p className="eyebrow">Power reliability ranking</p>
          <p className="mt-2 text-xs text-[var(--muted)]">
            Best → riskiest for remote work, assuming town-core / all-weather road rental.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {reliabilityRanking.map((name, i) => (
              <div
                key={name}
                className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.5)] px-3 py-1.5"
              >
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${rankColors[i + 1]}`}>
                  {i + 1}
                </span>
                <span className="text-sm font-medium">{name}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] leading-5 text-[var(--muted)]">
            Based on HPSEBL circle-level SAIDI/SAIFI indices, monsoon/winter disruption reporting, and known infrastructure projects.
          </p>
        </section>

        {/* Your essentials load */}
        <section className="card border-[rgba(143,93,59,0.2)] bg-[rgba(234,215,191,0.28)] p-5 md:p-6">
          <p className="eyebrow">Your essentials load</p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            What you actually need to keep alive during an outage.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {essentialsLoad.items.map((item) => (
              <div key={item.device} className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.5)] px-4 py-3">
                <span className="text-sm font-medium">{item.device}</span>
                <span className="ml-auto text-sm font-semibold text-[var(--forest)]">{item.watts}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="font-semibold">Total:</span>
            <span className="rounded-full bg-[var(--accent-soft)] px-3 py-0.5 text-sm font-bold text-[var(--forest)]">
              {essentialsLoad.total}
            </span>
          </div>
          <p className="mt-3 text-xs leading-5 text-[var(--muted)]">{essentialsLoad.note}</p>
        </section>

        {/* Backup tiers */}
        <section>
          <p className="eyebrow">Backup system tiers</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Choose your resilience level
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {backupTiers.map((tier) => (
              <div key={tier.tier} className="card flex flex-col p-5 md:p-6">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">
                    {tier.tier}
                  </span>
                  <h3 className="text-base font-semibold">{tier.label}</h3>
                </div>
                <p className="mt-3 text-xs leading-5 text-[var(--muted)]">{tier.description}</p>
                <div className="mt-4 space-y-2 text-xs leading-5">
                  <div><span className="font-semibold text-[var(--foreground)]">Specs:</span> <span className="text-[var(--muted)]">{tier.specs}</span></div>
                  <div><span className="font-semibold text-[var(--foreground)]">Runtime:</span> <span className="text-[var(--muted)]">{tier.runtime}</span></div>
                </div>
                <div className="mt-auto pt-4">
                  <div className="rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.5)] p-3 text-center">
                    <p className="text-lg font-bold text-[var(--forest)]">{tier.costInr}</p>
                    <p className="text-[11px] text-[var(--muted)]">{tier.costGbp}</p>
                  </div>
                  <p className="mt-2 text-[11px] leading-4 text-[var(--muted)]">{tier.bestFor}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Town-by-town outage profiles */}
        <section>
          <div className="space-y-2">
            <p className="eyebrow">Outage profiles by town</p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              What to expect, season by season
            </h2>
          </div>
          <div className="mt-6 space-y-3">
            {powerTowns.map((pt) => (
              <details
                key={pt.slug}
                className="card group overflow-hidden open:ring-1 open:ring-[var(--accent)]/20"
              >
                <summary className="flex cursor-pointer items-center gap-3 p-4 md:p-5 [&::-webkit-details-marker]:hidden">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${rankColors[pt.reliabilityRank]}`}>
                    {pt.reliabilityRank}
                  </span>
                  <span className="text-lg font-semibold md:text-xl">{pt.name}</span>
                  <span className="hidden text-xs text-[var(--muted)] sm:block">{pt.circle} circle</span>
                  <svg
                    className="ml-auto h-4 w-4 shrink-0 text-[var(--muted)] transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>

                <div className="space-y-4 border-t border-[var(--line)] p-4 md:p-5">
                  {/* Outage grid */}
                  <div className="grid gap-2 sm:grid-cols-3">
                    <div className="rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.5)] p-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--forest)]">Normal months</p>
                      <p className="mt-1 text-sm text-[var(--muted)]">{pt.outages.normal}</p>
                    </div>
                    <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-amber-800">Monsoon (Jul–Sep)</p>
                      <p className="mt-1 text-sm text-amber-700/80">{pt.outages.monsoon}</p>
                    </div>
                    <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-blue-800">Winter (Dec–Feb)</p>
                      <p className="mt-1 text-sm text-blue-700/80">{pt.outages.winter}</p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <p className="text-xs font-semibold text-[var(--foreground)]">🔋 Recommended backup</p>
                      <p className="text-xs leading-5 text-[var(--muted)]">{pt.recommendedBackup}</p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-xs font-semibold text-[var(--foreground)]">🔥 Heating approach</p>
                      <p className="text-xs leading-5 text-[var(--muted)]">{pt.heatingApproach}</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.4)] p-3">
                    <p className="text-xs font-semibold text-[var(--forest)]">📍 Local notes</p>
                    <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{pt.notes}</p>
                  </div>

                  <Link
                    href={`/towns/${pt.slug}`}
                    className="inline-flex text-sm font-semibold text-[var(--accent)]"
                  >
                    View full {pt.name} profile →
                  </Link>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Heating options */}
        <section>
          <p className="eyebrow">Heating &amp; water heating</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Staying warm without breaking the budget
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {heatingOptions.map((opt) => (
              <div key={opt.label} className="card p-5">
                <p className="text-sm font-semibold">
                  {opt.icon} {opt.label}
                </p>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{opt.detail}</p>
                <div className="mt-3 rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.5)] px-3 py-2">
                  <p className="text-xs font-medium text-[var(--forest)]">{opt.cost}</p>
                </div>
                {opt.caution && (
                  <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50/50 px-3 py-2">
                    <p className="text-[11px] leading-4 text-amber-700">⚠️ {opt.caution}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Insulation tips */}
        <section className="card p-5 md:p-6">
          <p className="eyebrow">Low-cost insulation wins</p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Most Himachal rentals aren&rsquo;t built to European winter expectations. These cheap fixes help.
          </p>
          <div className="mt-4 space-y-2.5">
            {insulationTips.map((tip) => (
              <div key={tip} className="flex items-start gap-2 text-sm leading-6 text-[var(--muted)]">
                <span className="mt-0.5 shrink-0 text-[var(--accent)]">→</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Property testing checklist */}
        <section className="card border-[rgba(143,93,59,0.2)] bg-[rgba(234,215,191,0.28)] p-5 md:p-8">
          <p className="eyebrow">Before signing a lease</p>
          <h2 className="mt-2 text-xl font-semibold md:text-2xl">
            Power &amp; heating property checklist
          </h2>
          <div className="mt-5 space-y-3">
            {propertyChecklist.map((item, i) => (
              <div key={item} className="flex items-start gap-3 text-sm leading-6 text-[var(--muted)]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[var(--line)] bg-white text-[10px] font-bold text-[var(--forest)]">
                  {i + 1}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Key sources */}
        <section className="card p-5 md:p-6">
          <p className="eyebrow">Key sources</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {powerSources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.4)] p-4 transition-colors hover:border-[var(--accent)]/40"
              >
                <p className="text-sm font-semibold text-[var(--accent)]">
                  {source.label} ↗
                </p>
                <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                  {source.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="rounded-2xl border border-amber-300/40 bg-amber-50/50 p-5 md:p-6">
          <p className="text-xs font-semibold text-amber-800">⚡ Data note</p>
          <p className="mt-2 text-xs leading-5 text-amber-700">
            Outage frequencies are estimated ranges based on HPSEBL circle-level reliability indices and seasonal disruption reporting.
            HPSEBL does not publish town-level monthly outage data publicly. Your actual experience will depend on your
            specific feeder, building wiring, and seasonal severity. Always test before committing.
          </p>
        </section>

        {/* Bottom CTA */}
        <section className="card p-6 md:p-8">
          <p className="eyebrow">Plan your move</p>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            Power reliability is one piece of the puzzle. Check settling logistics
            and property rules before committing.
          </p>
          <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
            <Link
              href="/first-30-days"
              className="rounded-full bg-[var(--accent)] px-6 py-3 text-center text-sm font-semibold text-white"
            >
              First 30 days playbook
            </Link>
            <Link
              href="/property-rules"
              className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-center text-sm font-semibold"
            >
              Property rules
            </Link>
            <Link
              href="/compare"
              className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-center text-sm font-semibold"
            >
              Compare towns
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
