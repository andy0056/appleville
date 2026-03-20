import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { resourceSectionAnchors } from "@/lib/content-anchors";
import { buildPageMetadata } from "@/lib/metadata";
import {
  keyStats,
  bankingTowns,
  merchantTiers,
  cashStillNeeded,
  domesticNonResidentDocs,
  nriAccountTypes,
  forexTowns,
  digitalRemittance,
  networkProviders,
  hybridRule,
  bankingSources,
} from "@/lib/banking";

export const metadata: Metadata = buildPageMetadata({
  title: "Banking & money in Himachal Pradesh — UPI, banks, forex, and non-resident accounts",
  description:
    "Town-by-town banking infrastructure, UPI merchant acceptance, forex agents, non-resident account opening, and the hybrid cash rule for remote workers in HP.",
  pathname: "/banking",
  type: "article",
});

const levelColors: Record<string, string> = {
  full: "bg-emerald-100 text-emerald-800",
  good: "bg-green-100 text-green-800",
  limited: "bg-amber-100 text-amber-800",
  minimal: "bg-red-100 text-red-800",
};

const levelLabels: Record<string, string> = {
  full: "Full coverage",
  good: "Good coverage",
  limited: "Limited",
  minimal: "Minimal",
};

export default function BankingPage() {
  return (
    <main className="container-app py-8 md:py-16">
      <div className="mx-auto max-w-5xl space-y-8 md:space-y-14">
        {/* Hero */}
        <div className="space-y-4">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Banking & money" },
            ]}
          />
          <p className="eyebrow">Financial guide</p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Banking &amp; money in Himachal
          </h1>
          <p className="max-w-3xl text-base leading-7 text-[var(--muted)] md:text-lg md:leading-8">
            Where to find banks, how payments actually work, opening accounts as a non-resident,
            and why you still need cash in your pocket.
          </p>
        </div>

        {/* Key stats */}
        <section
          id={resourceSectionAnchors.banking.snapshot}
          className="card scroll-mt-28 border-[rgba(143,93,59,0.2)] bg-[rgba(234,215,191,0.28)] p-5 md:p-6"
        >
          <p className="eyebrow">HP financial snapshot (2025)</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {keyStats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.5)] p-3 text-center">
                <p className="text-2xl font-bold text-[var(--forest)]">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold">{stat.label}</p>
                <p className="mt-0.5 text-[10px] text-[var(--muted)]">{stat.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Town banking profiles */}
        <section id={resourceSectionAnchors.banking.banksByTown} className="scroll-mt-28">
          <p className="eyebrow">Banks by town</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Where to find the Big Five
          </h2>
          <p className="mt-2 text-xs text-[var(--muted)]">
            SBI, HDFC, ICICI, Axis, PNB — mapped across all eight towns.
          </p>
          <div className="mt-5 space-y-3">
            {bankingTowns.map((town) => (
              <details
                key={town.slug}
                id={`${town.slug}-banking`}
                className="card group scroll-mt-28 overflow-hidden open:ring-1 open:ring-[var(--accent)]/20"
              >
                <summary className="flex cursor-pointer items-center gap-3 p-4 md:p-5 [&::-webkit-details-marker]:hidden">
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${levelColors[town.bankingLevel]}`}>
                    {levelLabels[town.bankingLevel]}
                  </span>
                  <span className="text-lg font-semibold">{town.name}</span>
                  <svg className="ml-auto h-4 w-4 shrink-0 text-[var(--muted)] transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="space-y-4 border-t border-[var(--line)] p-4 md:p-5">
                  <p className="text-sm font-semibold text-[var(--foreground)]">{town.headline}</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--forest)]">
                          <th className="py-2 pr-4">Bank</th>
                          <th className="py-2 pr-4">Locations</th>
                          <th className="py-2">Specialty</th>
                        </tr>
                      </thead>
                      <tbody>
                        {town.banks.map((b) => (
                          <tr key={b.bank} className="border-t border-[var(--line)]/40 text-[var(--muted)]">
                            <td className="py-2 pr-4 font-semibold text-[var(--foreground)]">{b.bank}</td>
                            <td className="py-2 pr-4">{b.locations}</td>
                            <td className="py-2">{b.specialty}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.4)] p-3">
                    <p className="text-xs leading-5 text-[var(--muted)]">📍 {town.note}</p>
                  </div>
                  <Link href={`/towns/${town.slug}`} className="inline-flex text-sm font-semibold text-[var(--accent)]">
                    View full {town.name} profile →
                  </Link>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Merchant acceptance */}
        <section id={resourceSectionAnchors.banking.paymentMethods} className="scroll-mt-28">
          <p className="eyebrow">Payment methods</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            How payments actually work
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {merchantTiers.map((tier) => (
              <div key={tier.tier} className="card p-5">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">
                    {tier.tier}
                  </span>
                  <h3 className="text-sm font-semibold">{tier.label}</h3>
                </div>
                <p className="mt-3 text-xs font-semibold text-[var(--forest)]">{tier.methods}</p>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{tier.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hybrid rule + cash needed */}
        <section
          id={resourceSectionAnchors.banking.cashRule}
          className="card scroll-mt-28 border-amber-200/60 bg-amber-50/30 p-5 md:p-8"
        >
          <p className="eyebrow text-amber-800">{hybridRule.headline}</p>
          <p className="mt-2 text-sm leading-7 text-amber-700">{hybridRule.detail}</p>
          <h3 className="mt-5 text-sm font-bold text-amber-800">Where you still need cash:</h3>
          <div className="mt-3 space-y-2">
            {cashStillNeeded.map((item) => (
              <div key={item} className="flex items-start gap-2 text-xs leading-5 text-amber-700">
                <span className="mt-0.5 shrink-0">💵</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Non-resident banking */}
        <section id={resourceSectionAnchors.banking.nonResident} className="scroll-mt-28">
          <p className="eyebrow">Opening accounts</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Non-resident banking in HP
          </h2>

          {/* Domestic */}
          <div className="mt-5 card p-5 md:p-6">
            <p className="text-sm font-semibold text-[var(--forest)]">🇮🇳 Domestic non-residents</p>
            <p className="mt-2 text-sm font-semibold">{domesticNonResidentDocs.headline}</p>
            <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{domesticNonResidentDocs.detail}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {domesticNonResidentDocs.docs.map((doc) => (
                <div key={doc.label} className="rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.5)] p-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--forest)]">{doc.label}</p>
                  <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{doc.items}</p>
                </div>
              ))}
            </div>
          </div>

          {/* NRI / Foreign */}
          <div className="mt-4 card p-5 md:p-6">
            <p className="text-sm font-semibold text-[var(--forest)]">🌏 NRI &amp; foreign national accounts</p>
            <div className="mt-4 space-y-3">
              {nriAccountTypes.map((acc) => (
                <div key={acc.type} className="rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.5)] p-4">
                  <p className="text-sm font-semibold">{acc.type}</p>
                  <div className="mt-2 flex flex-col gap-1 text-xs text-[var(--muted)] sm:flex-row sm:gap-6">
                    <span><strong>Eligibility:</strong> {acc.eligibility}</span>
                    <span><strong>Docs:</strong> {acc.docs}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-[var(--muted)]">
              NRI desks at SBI, HDFC, and ICICI in Shimla and Dharamshala handle these efficiently.
            </p>
          </div>
        </section>

        {/* Forex */}
        <section id={resourceSectionAnchors.banking.forex} className="scroll-mt-28">
          <p className="eyebrow">Foreign exchange</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Forex agents &amp; digital remittances
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {forexTowns.map((fx) => (
              <div key={fx.town} className="card p-4">
                <p className="text-sm font-semibold">{fx.town}</p>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]"><strong>Agents:</strong> {fx.agents}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--muted)]"><strong>Services:</strong> {fx.services}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 card p-5 md:p-6">
            <p className="text-sm font-semibold text-[var(--forest)]">💸 {digitalRemittance.headline}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {digitalRemittance.platforms.map((p) => (
                <span key={p} className="rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.5)] px-3 py-1 text-xs font-medium">
                  {p}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs leading-5 text-[var(--muted)]">{digitalRemittance.note}</p>
          </div>
        </section>

        {/* Network performance */}
        <section
          id={resourceSectionAnchors.banking.network}
          className="card scroll-mt-28 p-5 md:p-6"
        >
          <p className="eyebrow">Network for payments</p>
          <h2 className="mt-2 text-lg font-semibold">Which SIM for reliable UPI?</h2>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Dual-SIM recommended: Airtel for speed, Jio for coverage.
          </p>
          <div className="mt-4 space-y-3">
            {networkProviders.map((net) => (
              <div key={net.name} className="flex items-start gap-4 rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.5)] p-4">
                <span className="text-sm font-bold text-[var(--foreground)]">{net.name}</span>
                <div className="flex-1 text-xs leading-5 text-[var(--muted)]">
                  <p>{net.strength}</p>
                  <p className="mt-1 font-semibold text-[var(--forest)]">{net.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sources */}
        <section className="card p-5 md:p-6">
          <p className="eyebrow">Key sources</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {bankingSources.map((source) => (
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

        {/* Bottom CTA */}
        <section className="card p-6 md:p-8">
          <p className="eyebrow">Plan your move</p>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            Banking sorted? Check property rules, power reliability, and settling logistics next.
          </p>
          <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
            <Link href="/first-30-days" className="rounded-full bg-[var(--accent)] px-6 py-3 text-center text-sm font-semibold text-white">
              First 30 days playbook
            </Link>
            <Link href="/property-rules" className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-center text-sm font-semibold">
              Property rules
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
