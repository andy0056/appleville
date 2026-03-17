import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { Guide, guides } from "@/lib/guides";
import { buildPageMetadata } from "@/lib/metadata";

const overviewBlocks = [
  {
    title: "Compare towns",
    body: "Use guides to separate places that sound similar but solve different daily-life problems.",
  },
  {
    title: "Reality-check a shortlist",
    body: "Read the tradeoffs before a place becomes a fantasy version of itself in your head.",
  },
  {
    title: "Test a move",
    body: "Work out what to inspect in person before you spend too much time or money committing.",
  },
];

const categories = [...new Set(guides.map((guide) => guide.category))];
const useCaseOrder = [
  "fit-basics",
  "shortlist",
  "remote-work",
  "family",
  "trial-move",
] as const;

const useCaseLabels: Record<(typeof useCaseOrder)[number], string> = {
  "fit-basics": "Get the basics right",
  shortlist: "Separate a shortlist",
  "remote-work": "Choose for remote work",
  family: "Choose for family fit",
  "trial-move": "Test a move properly",
};

const startHereGuides = useCaseOrder
  .map((useCase) => guides.find((guide) => guide.useCase === useCase))
  .filter((guide): guide is Guide => Boolean(guide));

export const metadata = buildPageMetadata({
  title: "Himachal guides for choosing a base",
  description:
    "Read decision-support guides on remote work, family fit, trial stays, and tradeoffs across Himachal towns.",
  pathname: "/guides",
  image: "/images/towns/palampur.jpg",
});

export default function GuidesPage() {
  return (
    <main className="container-app py-14 md:py-20">
      <div className="space-y-10">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <SectionHeading
            eyebrow="Guides"
            title="Decision support for choosing a Himachal base"
            body="These guides are built to help with fit, tradeoffs, and move planning, not just inspiration. Use them when you need the shortlist to get clearer."
          />

          <div className="card p-6 md:p-8">
            <p className="eyebrow">What these guides do</p>
            <div className="mt-5 grid gap-4">
              {overviewBlocks.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[22px] border border-[var(--line)] bg-[rgba(255,255,255,0.35)] p-4"
                >
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.35)] px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-[var(--forest)]"
            >
              {category}
            </span>
          ))}
          <Link href="/how-it-works#use-it-well" className="secondary-link px-1 text-xs font-semibold uppercase tracking-[0.14em]">
            How to use guides with the tool
          </Link>
        </div>

        <section className="space-y-4">
          <div className="space-y-2">
            <p className="eyebrow">Start here</p>
            <h2 className="text-3xl font-semibold tracking-tight">
              Pick the guide that matches your actual decision
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {startHereGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="card p-6 transition hover:-translate-y-1"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--forest)]">
                  {useCaseLabels[guide.useCase]}
                </p>
                <h3 className="mt-3 text-2xl font-semibold">{guide.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {guide.bestWhen}
                </p>
                <span className="mt-5 inline-block text-sm font-semibold text-[var(--accent)]">
                  Read guide →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="space-y-2">
            <p className="eyebrow">All guides</p>
            <h2 className="text-3xl font-semibold tracking-tight">
              Browse the full decision-support set
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="card p-6 transition hover:-translate-y-1"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--forest)]">
                  {guide.category}
                </p>
                <h2 className="mt-3 text-2xl font-semibold">{guide.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {guide.summary}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  <span className="font-semibold text-[var(--foreground)]">Best when:</span>{" "}
                  {guide.bestWhen}
                </p>
                {guide.takeaways?.[0] ? (
                  <div className="mt-5 rounded-[20px] border border-[var(--line)] bg-[rgba(255,255,255,0.35)] p-4 text-sm leading-7 text-[var(--muted)]">
                    {guide.takeaways[0]}
                  </div>
                ) : null}
                <span className="mt-5 inline-block text-sm font-semibold text-[var(--accent)]">
                  Read guide →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
