import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { resourceSectionAnchors } from "@/lib/content-anchors";
import { buildPageMetadata } from "@/lib/metadata";
import {
  settleSpeedRanking,
  frictionPoints,
  portals,
  goBackChecklist,
  checklistPhases,
  playbookTowns,
} from "@/lib/playbook";
import { getTownBySlug } from "@/lib/towns";

export const metadata: Metadata = buildPageMetadata({
  title: "Your first 30 days in Himachal — town-by-town settling playbook",
  description:
    "A practical, town-by-town guide to settling into Himachal Pradesh: rental search, utilities, ISP, LPG, SIM, transport, and a phased 30-day checklist.",
  pathname: "/first-30-days",
  type: "article",
});

const speedColors: Record<string, string> = {
  fastest: "bg-emerald-100 text-emerald-800",
  fast: "bg-green-100 text-green-800",
  moderate: "bg-amber-100 text-amber-800",
  slow: "bg-orange-100 text-orange-800",
  slowest: "bg-red-100 text-red-800",
};

export default function First30DaysPage() {
  return (
    <main className="container-app py-8 md:py-16">
      <div className="mx-auto max-w-5xl space-y-8 md:space-y-14">
        <div className="space-y-4">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "First 30 days" },
            ]}
          />
          <p className="eyebrow">Settling playbook</p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Your first 30 days in Himachal
          </h1>
          <p className="max-w-3xl text-base leading-7 text-[var(--muted)] md:text-lg md:leading-8">
            A practical, town-by-town guide to going from &ldquo;landed with luggage
            and a laptop&rdquo; to &ldquo;stable base, working internet,
            functioning kitchen.&rdquo;
          </p>
        </div>

        {/* Settle speed ranking */}
        <section
          id={resourceSectionAnchors.first30Days.settleRanking}
          className="card scroll-mt-28 p-5 md:p-6"
        >
          <p className="eyebrow">Fastest-to-slowest settle ranking</p>
          <p className="mt-2 text-xs text-[var(--muted)]">
            Assuming arrival in a normal week, not a festival or peak rush.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {settleSpeedRanking.map((name, i) => (
              <div
                key={name}
                className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.5)] px-3 py-1.5"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[10px] font-bold text-[var(--forest)]">
                  {i + 1}
                </span>
                <span className="text-sm font-medium">{name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Friction points */}
        <section id={resourceSectionAnchors.first30Days.frictionPoints} className="scroll-mt-28">
          <p className="eyebrow">Recurring friction points to plan around</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {frictionPoints.map((fp) => (
              <div
                key={fp.title}
                className="card p-4 md:p-5"
              >
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  {fp.icon} {fp.title}
                </p>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
                  {fp.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Your go-bag */}
        <section
          id={resourceSectionAnchors.first30Days.goBag}
          className="card scroll-mt-28 border-[rgba(143,93,59,0.2)] bg-[rgba(234,215,191,0.28)] p-5 md:p-6"
        >
          <p className="eyebrow">Your move-in go-bag</p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Have these ready before you board the bus.
          </p>
          <div className="mt-4 space-y-3">
            {goBackChecklist.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm leading-6 text-[var(--muted)]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[var(--line)] bg-white text-[10px]">
                  ✓
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 30-day checklist */}
        <section id={resourceSectionAnchors.first30Days.checklist} className="scroll-mt-28">
          <p className="eyebrow">Universal 30-day checklist</p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            In tourist towns (McLeodganj, Manali, Naggar), shift everything 3–5 days earlier.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {checklistPhases.map((phase) => (
              <div key={phase.label} className="card p-5">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-bold text-[var(--forest)]">
                    Days {phase.days}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-semibold">{phase.label}</h3>
                <p className="mt-1 text-xs text-[var(--muted)]">{phase.objective}</p>
                <div className="mt-4 space-y-2.5">
                  {phase.items.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-xs leading-5 text-[var(--muted)]">
                      <span className="mt-0.5 h-3 w-3 shrink-0 rounded-sm border border-[var(--line)]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key portals */}
        <section
          id={resourceSectionAnchors.first30Days.portals}
          className="card scroll-mt-28 p-5 md:p-6"
        >
          <p className="eyebrow">Key portals you will reuse in every town</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {portals.map((portal) => (
              <a
                key={portal.url}
                href={portal.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.4)] p-4 transition-colors hover:border-[var(--accent)]/40"
              >
                <p className="text-sm font-semibold text-[var(--accent)]">
                  {portal.label} ↗
                </p>
                <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                  {portal.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Town-by-town guides */}
        <section id={resourceSectionAnchors.first30Days.townPlaybooks} className="scroll-mt-28">
          <div className="space-y-2">
            <p className="eyebrow">Town-by-town first 30 days</p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Pick your town
            </h2>
          </div>
          <div className="mt-6 space-y-5">
            {playbookTowns.map((pt) => {
              const town = getTownBySlug(pt.slug);
              return (
                <details
                  key={pt.slug}
                  id={`${pt.slug}-settling`}
                  className="card group scroll-mt-28 overflow-hidden open:ring-1 open:ring-[var(--accent)]/20"
                >
                  <summary className="flex cursor-pointer items-center gap-3 p-5 md:p-6 [&::-webkit-details-marker]:hidden">
                    <span className="text-xl font-semibold md:text-2xl">{pt.name}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${speedColors[pt.settleSpeed]}`}>
                      {pt.settleSpeed}
                    </span>
                    {town && (
                      <span className="ml-auto hidden text-xs text-[var(--muted)] md:block">
                        {town.district} district
                      </span>
                    )}
                    <svg
                      className="ml-auto h-4 w-4 shrink-0 text-[var(--muted)] transition-transform group-open:rotate-180 md:ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>

                  <div className="space-y-5 border-t border-[var(--line)] p-5 md:p-6">
                    <p className="text-sm leading-7 text-[var(--muted)]">{pt.overview}</p>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-[var(--foreground)]">🏠 Rental search</p>
                        <p className="text-xs leading-5 text-[var(--muted)]">{pt.rentalTip}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {pt.rentalChannels.map((ch) => (
                            <span key={ch} className="rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.5)] px-2.5 py-0.5 text-[10px] text-[var(--muted)]">
                              {ch}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-[var(--foreground)]">⚡ Utilities</p>
                        <p className="text-xs leading-5 text-[var(--muted)]">{pt.utilityNotes}</p>
                      </div>
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-[var(--foreground)]">📶 ISP</p>
                        <p className="text-xs leading-5 text-[var(--muted)]">{pt.ispTip}</p>
                      </div>
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-[var(--foreground)]">🛵 Transport</p>
                        <p className="text-xs leading-5 text-[var(--muted)]">{pt.transportTip}</p>
                      </div>
                    </div>

                    {/* Timeline table */}
                    <div className="overflow-hidden rounded-2xl border border-[var(--line)]">
                      <table className="min-w-full text-left text-sm">
                        <thead className="bg-[var(--accent-soft)]/60">
                          <tr>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em]">Item</th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em]">Timeline</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pt.timeline.map((row) => (
                            <tr key={row.item} className="border-t border-[var(--line)]">
                              <td className="px-4 py-2.5 text-sm">{row.item}</td>
                              <td className="px-4 py-2.5 text-sm font-medium text-[var(--foreground)]">
                                {row.days}
                                {row.note && (
                                  <span className="ml-2 text-xs font-normal text-[var(--muted)]">
                                    ({row.note})
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Local contacts */}
                    <div className="rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.4)] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--forest)]">
                        Local contacts to verify
                      </p>
                      <div className="mt-3 space-y-2">
                        {pt.localContacts.map((contact) => (
                          <p key={contact} className="text-xs leading-5 text-[var(--muted)]">• {contact}</p>
                        ))}
                      </div>
                    </div>

                    {town && (
                      <Link
                        href={`/towns/${town.slug}`}
                        className="inline-flex text-sm font-semibold text-[var(--accent)]"
                      >
                        View full {town.name} profile →
                      </Link>
                    )}
                  </div>
                </details>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="card p-6 md:p-8">
          <p className="eyebrow">Ready to start shortlisting?</p>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            The playbook works best once you know which town fits your priorities.
            Take the quiz or compare towns side-by-side first.
          </p>
          <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
            <Link
              href="/quiz"
              className="rounded-full bg-[var(--accent)] px-6 py-3 text-center text-sm font-semibold text-white"
            >
              Take the quiz
            </Link>
            <Link
              href="/compare"
              className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-center text-sm font-semibold"
            >
              Compare towns
            </Link>
            <Link
              href="/towns"
              className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-center text-sm font-semibold"
            >
              Browse all towns
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
