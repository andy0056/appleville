import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";
import { methodSections } from "@/lib/how-it-works";

export const metadata = buildPageMetadata({
  title: "How Appleville works",
  description:
    "Understand what the quiz considers, how town trait scores are used, and where Appleville helps versus where it cannot know enough.",
  pathname: "/how-it-works",
  image: "/images/towns/dharamshala.jpg",
});

export default function HowItWorksPage() {
  return (
    <main className="container-app py-8 md:py-20">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-4">
            <p className="eyebrow">How it works</p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              How Appleville is meant to be used
            </h1>
            <p className="text-base leading-8 text-[var(--muted)]">
              This page explains what the tool considers, what the results mean,
              and where the product is useful versus where a scouting visit or
              trial stay still matters.
            </p>
          </div>

          <div className="card p-6 md:p-8">
            <p className="eyebrow">Start here</p>
            <div className="mt-4 grid gap-3 text-sm leading-7 text-[var(--muted)]">
              {methodSections.map((section) => (
                <Link key={section.id} href={`#${section.id}`} className="secondary-link">
                  {section.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {methodSections.map((section) => (
            <section key={section.id} id={section.id} className="card scroll-mt-28 p-6 md:p-8">
              <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-[var(--muted)]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets?.length ? (
                <div className="mt-5 grid gap-3 rounded-[22px] border border-[var(--line)] bg-[rgba(255,255,255,0.35)] p-5 text-sm leading-7 text-[var(--muted)]">
                  {section.bullets.map((bullet) => (
                    <p key={bullet}>• {bullet}</p>
                  ))}
                </div>
              ) : null}
            </section>
          ))}
        </div>

        <div className="card p-6 md:p-8">
          <p className="eyebrow">Use the product well</p>
          <div className="mt-4 grid gap-3 sm:flex sm:flex-wrap">
            <Link
              href="/quiz"
              className="rounded-full bg-[var(--accent)] px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Take the quiz
            </Link>
            <Link
              href="/towns"
              className="rounded-full border border-[var(--line)] bg-[var(--card)] px-5 py-3 text-center text-sm font-semibold"
            >
              Browse towns
            </Link>
            <Link
              href="/guides"
              className="rounded-full border border-[var(--line)] bg-[var(--card)] px-5 py-3 text-center text-sm font-semibold"
            >
              Read guides
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
