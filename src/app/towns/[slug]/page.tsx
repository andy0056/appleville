import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/metadata";
import { getTownBySlug, towns } from "@/lib/towns";

export function generateStaticParams() {
  return towns.map((town) => ({ slug: town.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const town = getTownBySlug(slug);

  if (!town) {
    return buildPageMetadata({
      title: "Town profile not found",
      description: "The requested Himachal town profile could not be found.",
      pathname: `/towns/${slug}`,
    });
  }

  return buildPageMetadata({
    title: `${town.name}, Himachal: who it fits and what to expect`,
    description: `${town.summary} Read a grounded profile covering fit, remote-work reality, practical reality, and the main tradeoff.`,
    pathname: `/towns/${town.slug}`,
    image: town.image.src,
  });
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
    <main className="container-app py-12 md:py-16">
      <div className="max-w-6xl space-y-8 md:space-y-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:items-start">
          <div className="space-y-4 md:space-y-5">
            <p className="eyebrow">{town.district}</p>
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{town.name}</h1>
              <p className="text-base text-[var(--forest)] md:text-lg">{town.archetype}</p>
            </div>
            <p className="max-w-3xl text-base leading-7 text-[var(--muted)] md:text-lg md:leading-8">
              {town.summary}
            </p>
            <div className="flex flex-wrap gap-2">
              {town.vibe.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.45)] px-3 py-1 text-xs text-[var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <figure className="space-y-3">
            <div className="card overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src={town.image.src}
                  alt={town.image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <figcaption className="px-1 text-xs leading-6 text-[var(--muted)]">
              Photo by{" "}
              <a
                href={town.image.attribution.href}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--accent)] underline-offset-4 hover:underline"
              >
                {town.image.attribution.author} / Wikimedia Commons
              </a>{" "}
              ({town.image.attribution.license})
            </figcaption>
          </figure>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] lg:items-start">
          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="card bg-[rgba(255,250,242,0.94)] p-5 md:p-6">
              <p className="eyebrow">Quick read</p>
              <div className="mt-4 space-y-4 text-sm leading-6 text-[var(--muted)]">
                <div>
                  <p className="font-semibold text-[var(--foreground)]">Best for</p>
                  <p className="mt-1">{town.goodFor.slice(0, 3).join(", ")}</p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--foreground)]">Use caution if</p>
                  <p className="mt-1">{town.notIdealFor.slice(0, 2).join(", ")}</p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--foreground)]">Overall feel</p>
                  <p className="mt-1">{town.localFeel}</p>
                </div>
              </div>
            </div>

            <div className="card p-5 md:p-6">
              <p className="eyebrow">Snapshot</p>
              <div className="mt-5 space-y-4">
                {metrics.map(([label, value]) => (
                  <div key={label as string}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span>{label}</span>
                      <span className="text-[var(--muted)]">{value}/5</span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--accent-soft)]/85">
                      <div
                        className="h-2 rounded-full bg-[var(--accent)]"
                        style={{ width: `${(Number(value) / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <section className="space-y-4 md:space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="card p-5 md:p-6">
                <p className="eyebrow">Best for</p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
                  {town.goodFor.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="card p-5 md:p-6">
                <p className="eyebrow">Not ideal for</p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
                  {town.notIdealFor.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="card p-5 md:p-6">
                <p className="eyebrow">Remote-work reality</p>
                <p className="mt-4 text-base leading-7 text-[var(--muted)] md:leading-8">{town.remoteWorkReality}</p>
              </div>
              <div className="card p-5 md:p-6">
                <p className="eyebrow">Practical reality</p>
                <p className="mt-4 text-base leading-7 text-[var(--muted)] md:leading-8">{town.practicalReality}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="card p-5 md:p-6">
                <p className="eyebrow">Stay notes</p>
                <p className="mt-4 text-base leading-7 text-[var(--muted)] md:leading-8">{town.stayNotes}</p>
              </div>
              <div className="card p-5 md:p-6">
                <p className="eyebrow">Local feel</p>
                <p className="mt-4 text-base leading-7 text-[var(--muted)] md:leading-8">{town.localFeel}</p>
              </div>
            </div>

            <div className="card border-[rgba(143,93,59,0.2)] bg-[rgba(234,215,191,0.28)] p-5 md:p-6">
              <p className="eyebrow">The tradeoff</p>
              <p className="mt-4 text-base leading-7 text-[var(--muted)] md:leading-8">{town.tradeoff}</p>
            </div>
          </section>
        </div>

        <div className="grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
          <Link
            href="/compare"
            className="rounded-full bg-[var(--accent)] px-6 py-3 text-center text-sm font-semibold text-white"
          >
            Compare towns
          </Link>
          <Link
            href="/towns"
            className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-center text-sm font-semibold"
          >
            Back to towns
          </Link>
        </div>
      </div>
    </main>
  );
}
