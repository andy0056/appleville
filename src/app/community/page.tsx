import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { buildPageMetadata } from "@/lib/metadata";
import {
  helplines,
  connectionSteps,
  communityTowns,
  communitySources,
} from "@/lib/community";

export const metadata: Metadata = buildPageMetadata({
  title: "Community & mental health support in Himachal Pradesh for remote workers",
  description:
    "Coworking spaces, peer-support meetings (AA/NA), mental health helplines, and social integration tips — town by town for digital nomads and relocating families.",
  pathname: "/community",
  type: "article",
});

const riskColors: Record<string, string> = {
  low: "bg-emerald-100 text-emerald-800",
  "low-medium": "bg-green-100 text-green-800",
  medium: "bg-amber-100 text-amber-800",
  "medium-high": "bg-red-100 text-red-800",
};

const riskLabels: Record<string, string> = {
  low: "Low isolation risk",
  "low-medium": "Low–medium",
  medium: "Medium risk",
  "medium-high": "Higher risk",
};

const coworkColors: Record<string, string> = {
  high: "bg-emerald-100 text-emerald-800",
  medium: "bg-amber-100 text-amber-800",
  "low-medium": "bg-orange-100 text-orange-800",
  low: "bg-red-100 text-red-800",
};

export default function CommunityPage() {
  return (
    <main className="container-app py-8 md:py-16">
      <div className="mx-auto max-w-5xl space-y-8 md:space-y-14">
        {/* Hero */}
        <div className="space-y-4">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Community & mental health" },
            ]}
          />
          <p className="eyebrow">Support &amp; community guide</p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Community &amp; mental health
          </h1>
          <p className="max-w-3xl text-base leading-7 text-[var(--muted)] md:text-lg md:leading-8">
            Coworking hubs, peer-support meetings, mental health helplines,
            and how to actually make friends when you move to the hills.
          </p>
        </div>

        {/* Helplines card */}
        <section className="card border-[rgba(143,93,59,0.2)] bg-[rgba(234,215,191,0.28)] p-5 md:p-8">
          <p className="eyebrow">Crisis &amp; support lines</p>
          <h2 className="mt-2 text-xl font-semibold md:text-2xl">
            Call now — free, 24/7
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {helplines.map((h) => (
              <div key={h.number} className="rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.5)] p-4">
                <p className="text-2xl font-bold text-[var(--forest)]">{h.number}</p>
                <p className="mt-1 text-sm font-semibold">{h.name}</p>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{h.detail}</p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--accent)]">{h.hours}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Connection funnel */}
        <section>
          <p className="eyebrow">Newcomer playbook</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            How to actually make friends
          </h2>
          <p className="mt-2 text-xs text-[var(--muted)]">
            A &ldquo;connection funnel&rdquo; that works across all eight towns — create redundancy so social churn doesn&rsquo;t leave you isolated.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {connectionSteps.map((step, i) => (
              <div key={step.label} className="card p-5">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-lg">{step.icon}</span>
                </div>
                <h3 className="mt-3 text-sm font-semibold">{step.label}</h3>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{step.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Town profiles */}
        <section>
          <p className="eyebrow">Town-by-town profiles</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Community, coworking &amp; support by town
          </h2>
          <div className="mt-5 space-y-3">
            {communityTowns.map((town) => (
              <details key={town.slug} className="card group overflow-hidden open:ring-1 open:ring-[var(--accent)]/20">
                <summary className="flex cursor-pointer flex-wrap items-center gap-2 p-4 md:gap-3 md:p-5 [&::-webkit-details-marker]:hidden">
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${riskColors[town.isolationRisk]}`}>
                    {riskLabels[town.isolationRisk]}
                  </span>
                  <span className="text-lg font-semibold md:text-xl">{town.name}</span>
                  <span className={`hidden shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] sm:block ${coworkColors[town.coworkingLevel]}`}>
                    Coworking: {town.coworkingLevel}
                  </span>
                  <svg className="ml-auto h-4 w-4 shrink-0 text-[var(--muted)] transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>

                <div className="space-y-5 border-t border-[var(--line)] p-4 md:p-5">
                  {/* Quick stats */}
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.5)] p-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--forest)]">Community signals</p>
                      <p className="mt-1 text-sm font-semibold">{town.communitySignals}</p>
                    </div>
                    <div className="rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.5)] p-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--forest)]">Mental health</p>
                      <p className="mt-1 text-sm font-semibold">{town.mentalHealthAccess}</p>
                    </div>
                    <div className="rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.5)] p-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--forest)]">AA/NA</p>
                      <p className="mt-1 text-sm font-semibold">{town.aaNa}</p>
                    </div>
                    <div className="rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.5)] p-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--forest)]">Family-friendly</p>
                      <p className="mt-1 text-sm font-semibold">{town.familyFriendliness}</p>
                    </div>
                  </div>

                  {/* Coworking spaces */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--forest)]">🏠 Coworking spaces</p>
                    <div className="mt-2 space-y-2">
                      {town.coworkingSpaces.map((space) => (
                        <div key={space.name} className="flex flex-col gap-1 rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.4)] p-3 sm:flex-row sm:items-center sm:gap-4">
                          <span className="text-sm font-semibold">{space.name}</span>
                          <span className="flex-1 text-xs text-[var(--muted)]">{space.detail}</span>
                          {space.pricing && (
                            <span className="shrink-0 text-xs font-semibold text-[var(--accent)]">{space.pricing}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mental health */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--forest)]">🧠 Mental health resources</p>
                    <div className="mt-2 space-y-1.5">
                      {town.mentalHealthResources.map((r) => (
                        <div key={r} className="flex items-start gap-2 text-xs leading-5 text-[var(--muted)]">
                          <span className="mt-0.5 shrink-0 text-[var(--accent)]">→</span>
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Peer support */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--forest)]">🤝 Peer support (AA/NA)</p>
                    <div className="mt-2 space-y-1.5">
                      {town.peerSupport.map((p) => (
                        <div key={p} className="flex items-start gap-2 text-xs leading-5 text-[var(--muted)]">
                          <span className="mt-0.5 shrink-0 text-[var(--accent)]">→</span>
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Integration tips */}
                  <div className="rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.4)] p-3">
                    <p className="text-xs font-bold text-[var(--forest)]">💡 Integration tips</p>
                    <div className="mt-2 space-y-1.5">
                      {town.integrationTips.map((tip) => (
                        <div key={tip} className="flex items-start gap-2 text-xs leading-5 text-[var(--muted)]">
                          <span className="mt-0.5 shrink-0">•</span>
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link href={`/towns/${town.slug}`} className="inline-flex text-sm font-semibold text-[var(--accent)]">
                    View full {town.name} profile →
                  </Link>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Sources */}
        <section className="card p-5 md:p-6">
          <p className="eyebrow">Key sources</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {communitySources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.4)] p-4 transition-colors hover:border-[var(--accent)]/40"
              >
                <p className="text-sm font-semibold text-[var(--accent)]">{source.label} ↗</p>
                <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{source.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="rounded-2xl border border-amber-300/40 bg-amber-50/50 p-5 md:p-6">
          <p className="text-xs font-semibold text-amber-800">📋 Note on data</p>
          <p className="mt-2 text-xs leading-5 text-amber-700">
            Coworking details, hours, and pricing are &ldquo;as-published&rdquo; and change seasonally — verify before committing.
            Many community WhatsApp groups are semi-private (invite after in-person visit or referral).
            AA/NA schedules are from the most recent directory listings — confirm locally as meetings shift.
            Mental health resources listed are publicly documented; ask clinicians directly about fees, languages, and telehealth options.
          </p>
        </section>

        {/* Bottom CTA */}
        <section className="card p-6 md:p-8">
          <p className="eyebrow">Plan your move</p>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            Community is one piece. Check power reliability, banking, and property rules before committing to a town.
          </p>
          <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
            <Link href="/first-30-days" className="rounded-full bg-[var(--accent)] px-6 py-3 text-center text-sm font-semibold text-white">
              First 30 days playbook
            </Link>
            <Link href="/womens-safety" className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-center text-sm font-semibold">
              Women&rsquo;s safety
            </Link>
            <Link href="/compare" className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-center text-sm font-semibold">
              Compare towns
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
