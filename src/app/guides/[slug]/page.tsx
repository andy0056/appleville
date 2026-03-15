import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuideBySlug, guides } from "@/lib/guides";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) notFound();

  return (
    <main className="container-app py-14 md:py-20">
      <article className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-4">
          <p className="eyebrow">{guide.category}</p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{guide.title}</h1>
          <p className="text-lg leading-8 text-[var(--muted)]">{guide.summary}</p>
        </div>

        <div className="card p-6 md:p-8">
          <div className="space-y-5 text-base leading-8 text-[var(--muted)]">
            {guide.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/guides" className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-sm font-semibold">
            Back to guides
          </Link>
          <Link href="/quiz" className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white">
            Take the quiz
          </Link>
        </div>
      </article>
    </main>
  );
}
