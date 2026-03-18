import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { buildPageMetadata } from "@/lib/metadata";
import {
  section118Summary,
  purchaseRoutes,
  buyerTypes,
  scamRisks,
  dueDiligenceChecklist,
  leaseClauseList,
  faqItems,
  legalSources,
} from "@/lib/property-rules";

export const metadata: Metadata = buildPageMetadata({
  title: "Property rules in Himachal Pradesh — what non-Himachalis can and cannot buy",
  description:
    "Section 118 explained for Indian citizens, NRIs, OCIs, and foreign nationals. Purchase routes, scam warnings, lease frameworks, and a due diligence checklist.",
  pathname: "/property-rules",
  type: "article",
});

const safetyColors: Record<string, string> = {
  high: "bg-emerald-100 text-emerald-800",
  "medium-high": "bg-green-100 text-green-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-red-100 text-red-800",
};

const buyColors: Record<string, string> = {
  "yes-conditional": "border-amber-300 bg-amber-50 text-amber-800",
  restricted: "border-orange-300 bg-orange-50 text-orange-800",
  no: "border-red-300 bg-red-50 text-red-800",
};

const buyLabels: Record<string, string> = {
  "yes-conditional": "Conditional",
  restricted: "Restricted",
  no: "Cannot buy",
};

export default function PropertyRulesPage() {
  return (
    <main className="container-app py-8 md:py-16">
      <div className="mx-auto max-w-5xl space-y-8 md:space-y-14">
        {/* Hero */}
        <div className="space-y-4">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Property rules" },
            ]}
          />
          <p className="eyebrow">Legal guide</p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Property rules in Himachal Pradesh
          </h1>
          <p className="max-w-3xl text-base leading-7 text-[var(--muted)] md:text-lg md:leading-8">
            What non-Himachalis can and cannot buy, how Section 118 really works,
            and the safest routes to secure long-term occupation.
          </p>
        </div>

        {/* Section 118 summary */}
        <section className="card border-[rgba(143,93,59,0.2)] bg-[rgba(234,215,191,0.28)] p-5 md:p-8">
          <p className="eyebrow">The core restriction</p>
          <h2 className="mt-2 text-xl font-semibold md:text-2xl">
            {section118Summary.headline}
          </h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-[var(--foreground)]">
            {section118Summary.core}
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--forest)]">
                Who qualifies as &ldquo;agriculturist&rdquo;
              </p>
              <p className="text-xs leading-5 text-[var(--muted)]">
                {section118Summary.definitionOfAgriculturist}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--forest)]">
                Municipal area exception
              </p>
              <p className="text-xs leading-5 text-[var(--muted)]">
                {section118Summary.municipalExclusion}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--forest)]">
                Anti-avoidance
              </p>
              <p className="text-xs leading-5 text-[var(--muted)]">
                {section118Summary.antiAvoidance}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--forest)]">
                Enforcement
              </p>
              <p className="text-xs leading-5 text-[var(--muted)]">
                {section118Summary.enforcement}
              </p>
            </div>
          </div>
          <div className="mt-5 rounded-xl border border-amber-300/40 bg-amber-50/60 p-4">
            <p className="text-xs font-semibold text-amber-800">⚡ 2025 Amendment Bill</p>
            <p className="mt-1 text-xs leading-5 text-amber-700">
              {section118Summary.recentMovement}
            </p>
          </div>
        </section>

        {/* Buyer types */}
        <section>
          <p className="eyebrow">Rules by buyer type</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            What applies to you
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {buyerTypes.map((bt) => (
              <div key={bt.label} className="card p-5 md:p-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{bt.icon}</span>
                  <div>
                    <h3 className="text-base font-semibold">{bt.label}</h3>
                    <span
                      className={`mt-1 inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${buyColors[bt.canBuy]}`}
                    >
                      {buyLabels[bt.canBuy]}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-sm font-semibold leading-6 text-[var(--foreground)]">
                  {bt.headline}
                </p>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
                  {bt.detail}
                </p>
                <div className="mt-4 space-y-2">
                  {bt.tips.map((tip) => (
                    <div key={tip} className="flex items-start gap-2 text-xs leading-5 text-[var(--muted)]">
                      <span className="mt-0.5 shrink-0 text-[var(--accent)]">→</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Purchase routes */}
        <section>
          <p className="eyebrow">Practical options, ranked</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Routes to property in Himachal
          </h2>
          <div className="mt-5 space-y-3">
            {purchaseRoutes.map((pr) => (
              <div key={pr.route} className="card p-4 md:p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${safetyColors[pr.legalSafety]}`}
                  >
                    {pr.legalSafety.replace("-", " ")} safety
                  </span>
                  <span className="text-xs text-[var(--muted)]">•</span>
                  <span className="text-xs text-[var(--muted)]">{pr.speed}</span>
                </div>
                <p className="mt-2 text-sm font-semibold">{pr.route}</p>
                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-xs text-[var(--muted)]">
                  <span><strong>Risk:</strong> {pr.risk}</span>
                  <span><strong>Best for:</strong> {pr.bestFor}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Scam risks */}
        <section className="card border-red-200/60 bg-red-50/30 p-5 md:p-8">
          <p className="eyebrow text-red-700">Common scams & enforcement risks</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {scamRisks.map((risk) => (
              <div key={risk.title} className="space-y-2">
                <p className="text-sm font-semibold text-red-800">
                  {risk.icon} {risk.title}
                </p>
                <p className="text-xs leading-5 text-red-700/80">
                  {risk.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Due diligence checklist */}
        <section className="card p-5 md:p-8">
          <p className="eyebrow">Before paying money</p>
          <h2 className="mt-2 text-xl font-semibold md:text-2xl">
            Due diligence checklist
          </h2>
          <p className="mt-2 text-xs text-[var(--muted)]">
            For non-Himachali buyers seeking secure long-term occupation.
          </p>
          <div className="mt-5 space-y-3">
            {dueDiligenceChecklist.map((item, i) => (
              <div key={item} className="flex items-start gap-3 text-sm leading-6 text-[var(--muted)]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[var(--line)] bg-white text-[10px] font-bold text-[var(--forest)]">
                  {i + 1}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Lease clause templates */}
        <section>
          <p className="eyebrow">If you choose to lease</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            What your lease agreement should cover
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            For leases exceeding one year, registration under the Transfer of Property Act (s.107) and Registration Act (s.17) is required.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {leaseClauseList.map((group) => (
              <div key={group.category} className="card p-5">
                <h3 className="text-sm font-semibold">{group.category}</h3>
                <div className="mt-3 space-y-2">
                  {group.items.map((item) => (
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

        {/* FAQ */}
        <section>
          <p className="eyebrow">Quick answers</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Frequently asked questions
          </h2>
          <div className="mt-5 space-y-3">
            {faqItems.map((item) => (
              <details key={item.question} className="card group overflow-hidden">
                <summary className="flex cursor-pointer items-center gap-3 p-4 md:p-5 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                  <span className="flex-1">{item.question}</span>
                  <svg
                    className="h-4 w-4 shrink-0 text-[var(--muted)] transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="border-t border-[var(--line)] px-4 pb-4 pt-3 md:px-5 md:pb-5">
                  <p className="text-sm leading-7 text-[var(--muted)]">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Primary legal sources */}
        <section className="card p-5 md:p-6">
          <p className="eyebrow">Primary sources</p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Always verify against the latest position before committing funds.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {legalSources.map((source) => (
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
          <p className="text-xs font-semibold text-amber-800">⚖️ Legal disclaimer</p>
          <p className="mt-2 text-xs leading-5 text-amber-700">
            This page summarises publicly available legal provisions, case law, and regulatory guidance for educational purposes.
            It is <strong>not legal advice</strong>. Rules change — a 2025 Amendment Bill is under Committee review.
            Always consult a qualified property lawyer in Himachal Pradesh before committing funds.
          </p>
        </section>

        {/* Bottom CTA */}
        <section className="card p-6 md:p-8">
          <p className="eyebrow">Plan your move</p>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            Once you understand the property landscape, the next step is finding the right town
            and understanding the cost of settling in.
          </p>
          <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
            <Link
              href="/first-30-days"
              className="rounded-full bg-[var(--accent)] px-6 py-3 text-center text-sm font-semibold text-white"
            >
              First 30 days playbook
            </Link>
            <Link
              href="/compare"
              className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-center text-sm font-semibold"
            >
              Compare towns
            </Link>
            <Link
              href="/quiz"
              className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-center text-sm font-semibold"
            >
              Take the quiz
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
