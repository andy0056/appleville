import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Why Appleville exists",
  description:
    "Read why Appleville focuses on fit, tradeoffs, and everyday life in Himachal instead of travel fantasy.",
  pathname: "/about",
  image: "/images/towns/naggar.jpg",
});

export default function AboutPage() {
  return (
    <main className="container-app py-8 md:py-20">
      <div id="overview" className="max-w-3xl scroll-mt-28 space-y-6">
        <p className="eyebrow">About</p>
        <h1 className="text-4xl font-semibold">Why this exists</h1>
        <p className="text-base leading-8 text-[var(--muted)]">
          Most Himachal content helps people dream, browse, or visit. Very little
          helps them decide where life might actually work.
        </p>
        <p className="text-base leading-8 text-[var(--muted)]">
          Appleville is designed as a calmer, more useful, and more practical tool
          for people choosing a base in the state. The focus is fit, tradeoffs,
          and everyday livability rather than fantasy-first travel advice.
        </p>
        <p className="text-base leading-8 text-[var(--muted)]">
          The editorial stance is intentionally grounded. Towns are described as
          directional guidance, not certainty, because neighborhood feel,
          housing quality, seasonality, and routine friction can change the
          experience a lot inside the same place.
        </p>

        <h2 className="text-2xl font-semibold mt-10">Who runs Appleville?</h2>
        <p className="text-base leading-8 text-[var(--muted)]">
          Appleville is built and maintained by Anirudh Thakur and a small research team of locals and frequent visitors. Instead of scraping generic travel data, we visit the towns, check infrastructure reliability, and vet every guide to ensure it reflects on-the-ground realities—not just the scenic weekend versions. This hands-on approach ensures our advice remains practical and trustworthy for remote workers, families, and long-term movers.
        </p>
        <div className="compact-callout">
          <p className="text-sm font-semibold text-[var(--foreground)]">
            Want the method, not just the mission?
          </p>
          <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
            Read how the quiz, town traits, results, compare flow, and guides are
            meant to be used.
          </p>
          <Link
            href="/how-it-works"
            className="mt-4 inline-flex rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white"
          >
            Read how Appleville works
          </Link>
        </div>
      </div>
    </main>
  );
}
