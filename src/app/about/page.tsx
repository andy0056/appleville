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
    <main className="container-app py-14 md:py-20">
      <div className="max-w-3xl space-y-6">
        <p className="eyebrow">About</p>
        <h1 className="text-4xl font-semibold">Why this exists</h1>
        <p className="text-base leading-8 text-[var(--muted)]">
          Most Himachal content helps people dream, browse, or visit. Very little
          helps them decide where life might actually work.
        </p>
        <p className="text-base leading-8 text-[var(--muted)]">
          Build Your Life in Himachal is being designed as a calmer, more useful,
          and more practical tool for people choosing a base in the state.
        </p>
        <p className="text-base leading-8 text-[var(--muted)]">
          The first version focuses on matching users to towns based on how they
          want to live and work — not just where they want to holiday.
        </p>
      </div>
    </main>
  );
}
