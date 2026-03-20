import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { TownCard } from "@/components/town-card";
import { buildPageMetadata } from "@/lib/metadata";
import { towns } from "@/lib/towns";

const featuredSlugs = ["dharamshala", "palampur", "bir", "solan"];
const featured = featuredSlugs
  .map((slug) => towns.find((town) => town.slug === slug))
  .filter((town): town is (typeof towns)[number] => Boolean(town));

const startHere = [
  {
    title: "Take the quiz",
    body: "Best when you want a shortlist fast and you want pace, access, work fit, and long-stay tradeoffs weighed together.",
    href: "/quiz",
  },
  {
    title: "Browse towns",
    body: "Best when you already know some town names and want clearer distinctions before the shortlist hardens.",
    href: "/towns",
  },
  {
    title: "Read guides",
    body: "Best when the real question is about tradeoffs, family fit, remote work, or how to test a move properly.",
    href: "/guides",
  },
];

const helpPoints = [
  "Match by lifestyle fit",
  "Browse towns by strength",
  "Compare tradeoffs before scouting",
];

const fitProfiles = [
  "Remote workers choosing a steadier base",
  "Families weighing pace, access, and everyday practicality",
  "People planning a one-to-six month stay before committing longer",
  "Returnees and long-stay renters comparing familiar towns with fresher eyes",
];

const lessUsefulFor = [
  "Picking a quick weekend itinerary",
  "Finding the cheapest possible stay without caring much about fit",
  "Assuming one town will work the same way for every season and every household",
];

export const metadata = buildPageMetadata({
  title: "Choose a Himachal base for work, family, and everyday life",
  description:
    "Use Appleville to match, compare, and reality-check Himachal towns for remote work, longer stays, and practical moves.",
  pathname: "/",
  image: "/images/towns/palampur.jpg",
});

export default function Home() {
  return (
    <main>
      <section id="overview" className="container-app scroll-mt-28 py-8 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-4 md:space-y-7">
            <div
              className="motion-enter-fade inline-flex rounded-full border border-[var(--line)] bg-[rgba(255,250,242,0.7)] px-4 py-2 text-xs font-medium text-[var(--foreground)] shadow-sm md:text-sm"
              style={{ animationDuration: "200ms" }}
            >
              Build Your Life in Himachal
            </div>
            <div className="space-y-4 md:space-y-5">
              <h1
                className="motion-enter-up max-w-4xl text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-6xl"
                style={{ animationDelay: "60ms", animationDuration: "320ms" }}
              >
                Choose a Himachal base for work, family, and everyday life.
              </h1>
              <p
                className="motion-enter-up max-w-2xl text-base leading-7 text-[var(--muted)] md:text-xl md:leading-8"
                style={{ animationDelay: "120ms", animationDuration: "280ms" }}
              >
                Appleville helps you match, compare, and reality-check Himachal
                towns before the shortlist turns into a vague travel fantasy.
              </p>
            </div>
            <div
              className="motion-enter-up grid gap-3 sm:flex sm:flex-wrap sm:gap-4"
              style={{ animationDelay: "240ms", animationDuration: "240ms" }}
            >
              <Link
                href="/quiz"
                className="rounded-full bg-[var(--accent)] px-6 py-3 text-center text-sm font-semibold text-white shadow-sm"
              >
                Take the quiz
              </Link>
              <Link
                href="/towns"
                className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-center text-sm font-semibold"
              >
                Browse towns
              </Link>
            </div>
            <div
              className="motion-enter-up rounded-[24px] border border-[var(--line)] bg-[rgba(255,255,255,0.38)] p-4 md:p-5"
              style={{ animationDelay: "180ms", animationDuration: "260ms" }}
            >
              <p className="eyebrow">How Appleville helps</p>
              <div className="mt-3 grid gap-2 md:grid-cols-3 md:gap-3">
                {helpPoints.map((item) => (
                  <div
                    key={item}
                    className="rounded-[18px] border border-[var(--line)] bg-[rgba(255,250,242,0.6)] px-3 py-3 text-sm leading-6 text-[var(--muted)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <Link
              href="/how-it-works"
              className="motion-enter-up secondary-link text-sm font-semibold"
              style={{ animationDelay: "260ms", animationDuration: "220ms" }}
            >
              See how Appleville works
            </Link>
          </div>

          <div
            className="motion-enter-fade space-y-3 md:card md:relative md:overflow-hidden md:p-8"
            style={{ animationDelay: "300ms", animationDuration: "180ms" }}
          >
            <div className="hidden md:absolute md:inset-x-0 md:top-0 md:block md:h-1 md:bg-gradient-to-r md:from-[var(--accent)] md:to-[var(--forest)]" />
            <p className="eyebrow">Start here</p>
            <div className="mt-3 grid gap-3 md:mt-5 md:gap-4">
              {startHere.map((item) => (
                <div
                  key={item.title}
                  className="hover-lift-soft rounded-[22px] border border-[var(--line)] bg-[rgba(255,255,255,0.4)] p-3 md:p-5"
                >
                  <p className="text-lg font-semibold text-[var(--foreground)]">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)] md:mt-3 md:text-base">
                    {item.body}
                  </p>
                  <Link
                    href={item.href}
                    className="mt-2 inline-flex text-sm font-semibold text-[var(--accent)] md:mt-4"
                  >
                    Open {item.title.toLowerCase()}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-app pt-4 pb-8 md:py-20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <SectionHeading
            eyebrow="Featured towns"
            title="Start with four different fit profiles"
            body="These are good entry points when you want four clearly different answers to work, pace, access, and long-stay shape."
          />
          <Link href="/towns" className="text-sm font-medium text-[var(--accent)]">
            View all towns
          </Link>
        </div>

        <div className="mt-5 grid gap-4 md:mt-8 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((town, index) => (
            <TownCard key={town.slug} town={town} priority={index < 2} />
          ))}
        </div>
      </section>

      <section className="container-app pb-8">
        <div className="card p-5 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="eyebrow">Who this is for</p>
              <h2 className="mt-3 text-xl font-semibold tracking-tight md:text-3xl">
                Useful when the decision is about everyday life, not just scenery.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)] md:mt-4 md:text-base md:leading-8">
                If you are balancing work setup, family needs, access, quiet, or
                a longer stay, this is built for that kind of choice. It is less
                about finding a perfect town and more about finding the tradeoff
                you can actually live with.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              <div className="rounded-[22px] border border-[var(--line)] bg-[rgba(255,255,255,0.35)] p-5">
                <p className="text-sm font-semibold text-[var(--forest)]">Useful if you are</p>
                <div className="mt-3 grid gap-2 text-sm leading-6 text-[var(--muted)]">
                  {fitProfiles.map((item) => (
                    <p key={item}>• {item}</p>
                  ))}
                </div>
              </div>
              <div className="rounded-[22px] border border-[var(--line)] bg-[rgba(255,255,255,0.35)] p-5">
                <p className="text-sm font-semibold text-[var(--forest)]">Less useful if you are</p>
                <div className="mt-3 grid gap-2 text-sm leading-6 text-[var(--muted)]">
                  {lessUsefulFor.map((item) => (
                    <p key={item}>• {item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-4 rounded-[22px] border border-[var(--line)] bg-[rgba(255,255,255,0.35)] p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-6 text-[var(--muted)] md:leading-7">
              Take the quiz if you want a faster shortlist. Browse towns or read
              guides first if you are still working out what kind of tradeoff
              matters most.
            </p>
            <div className="grid gap-3 sm:flex sm:flex-wrap">
              <Link
                href="/quiz"
                className="rounded-full bg-[var(--accent)] px-5 py-3 text-center text-sm font-semibold text-white shadow-sm"
              >
                Start with the quiz
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
      </section>

      <section className="container-app pb-12 md:pb-16">
        <div className="rounded-[28px] border border-[var(--line)] bg-[rgba(255,250,242,0.7)] px-5 py-5 text-sm leading-6 text-[var(--muted)] md:px-8 md:py-7 md:text-base md:leading-7">
          Town advice here is meant as directional guidance, not certainty. Roads,
          seasons, housing quality, and neighborhood feel can shift the experience
          a lot inside the same town.
        </div>
      </section>
    </main>
  );
}
