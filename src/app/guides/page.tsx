import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { guides } from "@/lib/guides";

export default function GuidesPage() {
  return (
    <main className="container-app py-14 md:py-20">
      <div className="space-y-8">
        <SectionHeading
          eyebrow="Guides"
          title="Practical guidance, not mountain fantasy"
          body="A small editorial layer to help people make more grounded decisions about life in Himachal."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {guides.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`} className="card p-6 transition hover:-translate-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--forest)]">
                {guide.category}
              </p>
              <h2 className="mt-3 text-2xl font-semibold">{guide.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{guide.summary}</p>
              <span className="mt-5 inline-block text-sm font-semibold text-[var(--accent)]">Read guide →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
