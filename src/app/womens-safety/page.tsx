import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { resourceSectionAnchors } from "@/lib/content-anchors";
import { buildPageMetadata } from "@/lib/metadata";
import {
  sheTravelPolicy,
  crimeData,
  crimeDataNote,
  townSafetyProfiles,
  safeSpaces,
  healthcareAccess,
  practicalTips,
  safetySourceLinks,
} from "@/lib/womens-safety";

export const metadata: Metadata = buildPageMetadata({
  title: "Women's safety, healthcare & autonomy in Himachal Pradesh",
  description:
    "Town-by-town safety profiles, crime data, co-living & safe café spaces, gynecological healthcare access, and practical tips for women living or traveling solo in HP.",
  pathname: "/womens-safety",
  type: "article",
});

const safetyColors: Record<string, string> = {
  high: "bg-emerald-100 text-emerald-800 border-emerald-200",
  "moderate-high": "bg-green-100 text-green-800 border-green-200",
  moderate: "bg-amber-100 text-amber-800 border-amber-200",
  caution: "bg-red-100 text-red-800 border-red-200",
};

const safetyLabels: Record<string, string> = {
  high: "High safety",
  "moderate-high": "Moderate–high",
  moderate: "Moderate",
  caution: "Exercise caution",
};

const healthColors: Record<string, string> = {
  tertiary: "bg-emerald-100 text-emerald-800",
  secondary: "bg-amber-100 text-amber-800",
  "primary-only": "bg-red-100 text-red-800",
};

const healthLabels: Record<string, string> = {
  tertiary: "Tertiary care",
  secondary: "Secondary care",
  "primary-only": "Primary only",
};


const districts = ["Kangra", "Shimla", "Solan", "Kullu"];

export default function WomensSafetyPage() {
  return (
    <main className="container-app py-8 md:py-16">
      <div className="mx-auto max-w-5xl space-y-8 md:space-y-14">
        {/* Hero */}
        <div className="space-y-4">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Women\u2019s safety" },
            ]}
          />
          <p className="eyebrow">Safety &amp; autonomy guide</p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Women&rsquo;s safety in Himachal Pradesh
          </h1>
          <p className="max-w-3xl text-base leading-7 text-[var(--muted)] md:text-lg md:leading-8">
            Town-by-town safety profiles, safe spaces, healthcare access,
            and practical tips for women living, working, or traveling solo in the hills.
          </p>
        </div>

        {/* SheTravel Policy card */}
        <section
          id={resourceSectionAnchors.womensSafety.policy}
          className="card scroll-mt-28 border-[rgba(143,93,59,0.2)] bg-[rgba(234,215,191,0.28)] p-5 md:p-8"
        >
          <p className="eyebrow">Government initiative</p>
          <h2 className="mt-2 text-xl font-semibold md:text-2xl">
            {sheTravelPolicy.headline}
          </h2>
          <p className="mt-3 text-sm font-semibold leading-7 text-[var(--foreground)]">
            {sheTravelPolicy.stat}
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sheTravelPolicy.highlights.map((h) => (
              <div key={h.label} className="rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.5)] p-4">
                <p className="text-sm font-semibold">{h.icon} {h.label}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{h.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Crime statistics */}
        <section id={resourceSectionAnchors.womensSafety.crimeData} className="scroll-mt-28">
          <p className="eyebrow">Crime data (2022–2024)</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            What the numbers actually say
          </h2>
          <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{crimeDataNote}</p>

          <div className="mt-5 space-y-4">
            {districts.map((district) => {
              const rows = crimeData.filter((r) => r.district === district);
              return (
                <details key={district} className="card group overflow-hidden">
                  <summary className="flex cursor-pointer items-center gap-3 p-4 md:p-5 text-base font-semibold [&::-webkit-details-marker]:hidden">
                    <span className="flex-1">{district} district</span>
                    <span className="text-xs text-[var(--muted)]">
                      {district === "Kangra" ? "Dharamshala, McLeodganj, Bir, Palampur" : district === "Kullu" ? "Manali, Naggar" : `${district} town`}
                    </span>
                    <svg className="h-4 w-4 shrink-0 text-[var(--muted)] transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="border-t border-[var(--line)] p-4 md:p-5 overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--forest)]">
                          <th className="py-2 pr-4">Year</th>
                          <th className="py-2 pr-4">Rape</th>
                          <th className="py-2 pr-4">Kidnapping</th>
                          <th className="py-2 pr-4">Cruelty</th>
                          <th className="py-2">Molestation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((r) => (
                          <tr key={r.year} className="border-t border-[var(--line)]/40 text-[var(--muted)]">
                            <td className="py-2 pr-4 font-semibold text-[var(--foreground)]">{r.year}</td>
                            <td className="py-2 pr-4">{r.rape}</td>
                            <td className="py-2 pr-4">{r.kidnapping}</td>
                            <td className="py-2 pr-4">{r.cruelty}</td>
                            <td className="py-2">{r.molestation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </details>
              );
            })}
          </div>
        </section>

        {/* Town safety profiles */}
        <section id={resourceSectionAnchors.womensSafety.townProfiles} className="scroll-mt-28">
          <p className="eyebrow">Town-by-town assessment</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Safety profile for each town
          </h2>
          <div className="mt-5 space-y-3">
            {townSafetyProfiles.map((town) => (
              <details
                key={town.slug}
                id={`${town.slug}-safety`}
                className="card group scroll-mt-28 overflow-hidden open:ring-1 open:ring-[var(--accent)]/20"
              >
                <summary className="flex cursor-pointer items-center gap-3 p-4 md:p-5 [&::-webkit-details-marker]:hidden">
                  <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${safetyColors[town.safetyLevel]}`}>
                    {safetyLabels[town.safetyLevel]}
                  </span>
                  <span className="text-lg font-semibold md:text-xl">{town.name}</span>
                  <span className="hidden text-xs text-[var(--muted)] sm:block">{town.cluster}</span>
                  <svg className="ml-auto h-4 w-4 shrink-0 text-[var(--muted)] transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="space-y-4 border-t border-[var(--line)] p-4 md:p-5">
                  <p className="text-sm font-semibold leading-6 text-[var(--foreground)]">{town.headline}</p>
                  <p className="text-xs leading-5 text-[var(--muted)]">{town.detail}</p>
                  <div className="space-y-2">
                    {town.tips.map((tip) => (
                      <div key={tip} className="flex items-start gap-2 text-xs leading-5 text-[var(--muted)]">
                        <span className="mt-0.5 shrink-0 text-[var(--accent)]">→</span>
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                  <Link href={`/towns/${town.slug}`} className="inline-flex text-sm font-semibold text-[var(--accent)]">
                    View full {town.name} profile →
                  </Link>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Safe spaces */}
        <section id={resourceSectionAnchors.womensSafety.safeSpaces} className="scroll-mt-28">
          <p className="eyebrow">Vetted safe spaces</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Co-living, cafés &amp; hostels for women
          </h2>

          {/* Co-living */}
          <h3 className="mt-6 text-sm font-bold uppercase tracking-[0.1em] text-[var(--forest)]">🏠 Co-living spaces</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {safeSpaces.filter((s) => s.type === "co-living").map((space) => (
              <div key={space.name} className="card p-5">
                <p className="text-sm font-semibold">{space.name}</p>
                <p className="mt-0.5 text-[11px] text-[var(--muted)]">{space.town}</p>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{space.description}</p>
                {space.highlight && (
                  <p className="mt-2 rounded-lg bg-[var(--accent-soft)] px-3 py-1.5 text-[11px] font-semibold text-[var(--forest)]">
                    ✦ {space.highlight}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Cafés */}
          <h3 className="mt-6 text-sm font-bold uppercase tracking-[0.1em] text-[var(--forest)]">☕ Women-led &amp; women-friendly cafés</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {safeSpaces.filter((s) => s.type === "café").map((space) => (
              <div key={space.name} className="card p-4">
                <p className="text-sm font-semibold">{space.name}</p>
                <p className="mt-0.5 text-[11px] text-[var(--muted)]">{space.town}</p>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{space.description}</p>
                {space.highlight && (
                  <p className="mt-2 text-[11px] font-semibold text-[var(--accent)]">✦ {space.highlight}</p>
                )}
              </div>
            ))}
          </div>

          {/* Hostels */}
          <h3 className="mt-6 text-sm font-bold uppercase tracking-[0.1em] text-[var(--forest)]">🏨 Hostel chains with female-only dorms</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {safeSpaces.filter((s) => s.type === "hostel-chain").map((space) => (
              <div key={space.name} className="card p-4">
                <p className="text-sm font-semibold">{space.name}</p>
                <p className="mt-0.5 text-[11px] text-[var(--muted)]">{space.town}</p>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{space.description}</p>
                {space.highlight && (
                  <p className="mt-2 text-[11px] font-semibold text-[var(--accent)]">✦ {space.highlight}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Healthcare access */}
        <section id={resourceSectionAnchors.womensSafety.healthcare} className="scroll-mt-28">
          <p className="eyebrow">Women&rsquo;s healthcare</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Gynecological &amp; maternity access by town
          </h2>
          <p className="mt-2 text-xs text-[var(--muted)]">
            Facilities are stratified: district HQs offer comprehensive care, while peripheral hubs require transit for specialist consultations.
          </p>
          <div className="mt-5 space-y-3">
            {healthcareAccess.map((h) => (
              <div key={h.town} className="card p-4 md:p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${healthColors[h.level]}`}>
                    {healthLabels[h.level]}
                  </span>
                  <h3 className="text-base font-semibold">{h.town}</h3>
                </div>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{h.facilities}</p>
                <p className="mt-2 text-xs leading-5 text-[var(--foreground)]">{h.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Practical tips */}
        <section
          id={resourceSectionAnchors.womensSafety.practicalTips}
          className="card scroll-mt-28 border-[rgba(143,93,59,0.2)] bg-[rgba(234,215,191,0.28)] p-5 md:p-8"
        >
          <p className="eyebrow">Practical tips</p>
          <h2 className="mt-2 text-xl font-semibold md:text-2xl">
            What to know before you go
          </h2>
          <div className="mt-5 space-y-3">
            {practicalTips.map((tip, i) => (
              <div key={tip} className="flex items-start gap-3 text-sm leading-6 text-[var(--muted)]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[var(--line)] bg-white text-[10px] font-bold text-[var(--forest)]">
                  {i + 1}
                </span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Sources */}
        <section className="card p-5 md:p-6">
          <p className="eyebrow">Key sources</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {safetySourceLinks.map((source) => (
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
          <p className="text-xs font-semibold text-amber-800">📋 Note on data</p>
          <p className="mt-2 text-xs leading-5 text-amber-700">
            Crime statistics are from HP Police district-level data (2022–2024) and NCRB reports.
            &ldquo;Kidnapping&rdquo; figures often include consensual elopement cases. Safety assessments
            combine quantitative data with qualitative reporting from residents, travelers, and journalists.
            Individual experience may vary significantly by micro-location and time of day.
          </p>
        </section>

        {/* Bottom CTA */}
        <section className="card p-6 md:p-8">
          <p className="eyebrow">Plan your move</p>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            Safety is one dimension. Explore power reliability, property rules, and settling logistics
            before committing to a town.
          </p>
          <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
            <Link
              href="/first-30-days"
              className="rounded-full bg-[var(--accent)] px-6 py-3 text-center text-sm font-semibold text-white"
            >
              First 30 days playbook
            </Link>
            <Link
              href="/power-backup"
              className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-center text-sm font-semibold"
            >
              Power backup
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
