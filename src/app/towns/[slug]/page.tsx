import Link from "next/link";
import { notFound } from "next/navigation";
import { getTownBySlug, towns } from "@/lib/towns";

export function generateStaticParams() {
  return towns.map((town) => ({ slug: town.slug }));
}

export default async function TownDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const town = getTownBySlug(slug);

  if (!town) notFound();

  const metrics = [
    ["Remote work", town.remoteWork],
    ["Accessibility", town.accessibility],
    ["Quiet", town.quiet],
    ["Family fit", town.familyFit],
    ["Tourism", town.tourismIntensity],
    ["Long-stay fit", town.longStayFit],
  ];

  return (
    <main className="container-app py-14 md:py-20">
      <div className="max-w-5xl space-y-8">
        <div className="space-y-4">
          <p className="eyebrow">{town.district}</p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{town.name}</h1>
          <p className="text-lg text-[var(--forest)]">{town.archetype}</p>
          <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">{town.summary}</p>
          <div className="flex flex-wrap gap-2">
            {town.vibe.map((tag) => (
              <span key={tag} className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="card p-6">
            <p className="eyebrow">Snapshot</p>
            <div className="mt-5 space-y-4">
              {metrics.map(([label, value]) => (
                <div key={label as string}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span>{label}</span>
                    <span className="text-[var(--muted)]">{value}/5</span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--accent-soft)]">
                    <div
                      className="h-2 rounded-full bg-[var(--accent)]"
                      style={{ width: `${(Number(value) / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <section className="space-y-5">
            <div className="card p-6">
              <p className="eyebrow">Who it suits</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {town.goodFor.map((item) => (
                  <span key={item} className="rounded-full border border-[var(--line)] px-3 py-1 text-sm text-[var(--muted)]">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="card p-6">
                <p className="eyebrow">Pros</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
                  {town.pros.map((pro) => (
                    <li key={pro}>• {pro}</li>
                  ))}
                </ul>
              </div>
              <div className="card p-6">
                <p className="eyebrow">Cons</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
                  {town.cons.map((con) => (
                    <li key={con}>• {con}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="card p-6">
                <p className="eyebrow">Best for</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
                  {town.goodFor.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="card p-6">
                <p className="eyebrow">Not ideal for</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
                  {town.notIdealFor.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="card p-6">
                <p className="eyebrow">Remote-work reality</p>
                <p className="mt-4 text-base leading-8 text-[var(--muted)]">{town.remoteWorkReality}</p>
              </div>
              <div className="card p-6">
                <p className="eyebrow">Practical reality</p>
                <p className="mt-4 text-base leading-8 text-[var(--muted)]">{town.practicalReality}</p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="card p-6">
                <p className="eyebrow">Stay notes</p>
                <p className="mt-4 text-base leading-8 text-[var(--muted)]">{town.stayNotes}</p>
              </div>
              <div className="card p-6">
                <p className="eyebrow">Local feel</p>
                <p className="mt-4 text-base leading-8 text-[var(--muted)]">{town.localFeel}</p>
              </div>
            </div>

            <div className="card p-6">
              <p className="eyebrow">The tradeoff</p>
              <p className="mt-4 text-base leading-8 text-[var(--muted)]">{town.tradeoff}</p>
            </div>
          </section>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/compare" className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white">
            Compare towns
          </Link>
          <Link href="/towns" className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-sm font-semibold">
            Back to towns
          </Link>
        </div>
      </div>
    </main>
  );
}
