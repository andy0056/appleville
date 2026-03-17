import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/metadata";
import { getTownBySlug, type Town } from "@/lib/towns";
import { getGuideBySlug, guides } from "@/lib/guides";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return buildPageMetadata({
      title: "Guide not found",
      description: "The requested Himachal guide could not be found.",
      pathname: `/guides/${slug}`,
      type: "article",
    });
  }

  const guideImage =
    guide.relatedTownSlugs
      ?.map((townSlug) => getTownBySlug(townSlug))
      .find((town): town is Town => Boolean(town))
      ?.image.src ?? "/images/towns/palampur.jpg";

  return buildPageMetadata({
    title: guide.title,
    description: `${guide.summary} Read practical takeaways, structured sections, and related towns.`,
    pathname: `/guides/${guide.slug}`,
    image: guideImage,
    type: "article",
  });
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) notFound();

  const relatedTowns = (guide.relatedTownSlugs ?? [])
    .map((townSlug) => getTownBySlug(townSlug))
    .filter((town): town is Town => Boolean(town));

  return (
    <main className="container-app py-14 md:py-20">
      <article className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <Link href="/guides" className="text-sm font-medium text-[var(--accent)]">
            ← Back to guides
          </Link>
          <p className="eyebrow">{guide.category}</p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {guide.title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-[var(--muted)]">
            {guide.summary}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="card p-6 md:p-8">
            <p className="eyebrow">Intro</p>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">
              {guide.intro}
            </p>
          </div>

          <aside className="space-y-5">
            <div className="compact-callout">
              <p className="eyebrow">Use this guide when</p>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                {guide.bestWhen}
              </p>
            </div>

            {guide.takeaways?.length ? (
              <div className="card p-6 md:p-8">
              <p className="eyebrow">Quick takeaways</p>
              <div className="mt-4 grid gap-3 text-sm leading-7 text-[var(--muted)]">
                {guide.takeaways.map((item) => (
                  <p key={item}>• {item}</p>
                ))}
              </div>
              </div>
            ) : null}
          </aside>
        </div>

        <div className="space-y-5">
          {guide.sections.map((section) => (
            <section key={section.title} className="card p-6 md:p-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {section.title}
                </h2>
                <div className="space-y-4 text-base leading-8 text-[var(--muted)]">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.title}-${index}`}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets?.length ? (
                  <div className="grid gap-3 rounded-[22px] border border-[var(--line)] bg-[rgba(255,255,255,0.35)] p-5 text-sm leading-7 text-[var(--muted)]">
                    {section.bullets.map((bullet) => (
                      <p key={bullet}>• {bullet}</p>
                    ))}
                  </div>
                ) : null}
              </div>
            </section>
          ))}
        </div>

        <section className="card p-6 md:p-8">
          <p className="eyebrow">How to use this with Appleville</p>
          <div className="mt-4 grid gap-3 sm:flex sm:flex-wrap">
            <Link
              href="/quiz"
              className="rounded-full bg-[var(--accent)] px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Take the quiz
            </Link>
            <Link
              href="/compare"
              className="rounded-full border border-[var(--line)] bg-[var(--card)] px-5 py-3 text-center text-sm font-semibold"
            >
              Compare towns
            </Link>
            <Link
              href="/how-it-works#town-pages"
              className="rounded-full border border-[var(--line)] bg-[var(--card)] px-5 py-3 text-center text-sm font-semibold"
            >
              How town pages are read
            </Link>
            <Link
              href="/how-it-works#use-it-well"
              className="secondary-link self-center text-sm font-semibold"
            >
              How to use guides with the tool
            </Link>
          </div>
        </section>

        {relatedTowns.length ? (
          <section className="space-y-4">
            <div className="space-y-2">
              <p className="eyebrow">Related towns</p>
              <h2 className="text-3xl font-semibold tracking-tight">
                Places worth reading next
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedTowns.map((town) => (
                <Link
                  key={town.slug}
                  href={`/towns/${town.slug}`}
                  className="card p-5 transition hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">{town.name}</h3>
                      <p className="mt-1 text-sm text-[var(--forest)]">
                        {town.archetype}
                      </p>
                    </div>
                    <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium capitalize">
                      {town.budget}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                    {town.summary}
                  </p>
                  <span className="mt-4 inline-block text-sm font-semibold text-[var(--accent)]">
                    Explore town →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <div className="flex flex-wrap gap-4">
          <Link
            href="/guides"
            className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-sm font-semibold"
          >
            Back to guides
          </Link>
          <Link
            href="/quiz"
            className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white"
          >
            Take the quiz
          </Link>
        </div>
      </article>
    </main>
  );
}
