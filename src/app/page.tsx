import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { TownCard } from "@/components/town-card";
import { towns } from "@/lib/towns";

const featured = towns.slice(0, 6);

const valueBlocks = [
  {
    title: "Match",
    body: "Start with a shortlist shaped by budget, pace, access, tourist pressure, and how you want daily life to feel.",
  },
  {
    title: "Compare",
    body: "See where similar towns separate on quiet, family fit, remote-work ease, and long-stay practicality.",
  },
  {
    title: "Reality-check",
    body: "Read the likely friction early, before you spend time or money on the wrong scouting trip or stay.",
  },
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

export default function Home() {
  return (
    <main>
      <section className="container-app py-12 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-6 md:space-y-7">
            <div className="inline-flex rounded-full border border-[var(--line)] bg-[rgba(255,250,242,0.7)] px-4 py-2 text-xs font-medium text-[var(--forest)] shadow-sm md:text-sm">
              Build Your Life in Himachal
            </div>
            <div className="space-y-4 md:space-y-5">
              <h1 className="max-w-4xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-6xl">
                Choose a Himachal base for work, family, and everyday life.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-[var(--muted)] md:text-xl md:leading-8">
                Appleville is a practical decision tool for people comparing towns
                for remote work, a longer stay, or a gradual move. It helps you
                narrow by pace, budget, access, and long-stay fit before the
                shortlist gets fuzzy.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-[var(--muted)] sm:text-sm">
              <span className="rounded-full bg-[rgba(255,255,255,0.45)] px-3 py-1">Remote-work fit</span>
              <span className="rounded-full bg-[rgba(255,255,255,0.45)] px-3 py-1">Long-stay tradeoffs</span>
              <span className="rounded-full bg-[rgba(255,255,255,0.45)] px-3 py-1">Town-by-town comparison</span>
            </div>
            <div className="card p-5 md:p-6">
              <p className="eyebrow">Why take the quiz first</p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)] md:text-base">
                Most Himachal towns sound appealing on their own. The quiz filters
                by the things that start to matter once you plan to stay: work
                setup, road access, tourist pressure, budget comfort, family fit,
                and how quiet or social you want day-to-day life to feel.
              </p>
            </div>
            <div className="grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
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
            <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
              Built for choosing a base, not chasing a perfect-sounding travel list.
            </p>
          </div>

          <div className="card relative overflow-hidden p-6 md:p-8">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--forest)]" />
            <p className="eyebrow">What this helps with</p>
            <div className="mt-5 grid gap-4">
              {valueBlocks.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[22px] border border-[var(--line)] bg-[rgba(255,255,255,0.4)] p-4 md:p-5"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--forest)]">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)] md:text-base">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-app py-14 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Featured towns"
            title="Start with the towns people usually shortlist first"
            body="Each profile covers pace, work reality, stay notes, and where the tradeoff tends to show up."
          />
          <Link href="/towns" className="text-sm font-medium text-[var(--accent)]">
            View all towns
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((town) => (
            <TownCard key={town.slug} town={town} />
          ))}
        </div>
      </section>

      <section className="container-app pb-8">
        <div className="card p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="eyebrow">Who this is for</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Useful when the decision is about everyday life, not just scenery.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--muted)]">
                If you are balancing work setup, family needs, access, quiet, or
                a longer stay, this is built for that kind of choice. It is less
                about finding a perfect town and more about finding the tradeoff
                you can actually live with.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-[22px] border border-[var(--line)] bg-[rgba(255,255,255,0.35)] p-5">
                <p className="text-sm font-semibold text-[var(--forest)]">Useful if you are</p>
                <div className="mt-4 grid gap-3 text-sm leading-7 text-[var(--muted)]">
                  {fitProfiles.map((item) => (
                    <p key={item}>• {item}</p>
                  ))}
                </div>
              </div>
              <div className="rounded-[22px] border border-[var(--line)] bg-[rgba(255,255,255,0.35)] p-5">
                <p className="text-sm font-semibold text-[var(--forest)]">Less useful if you are</p>
                <div className="mt-4 grid gap-3 text-sm leading-7 text-[var(--muted)]">
                  {lessUsefulFor.map((item) => (
                    <p key={item}>• {item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4 rounded-[22px] border border-[var(--line)] bg-[rgba(255,255,255,0.35)] p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
              Take the quiz if you want a faster shortlist. Browse towns first if
              you already know the names you are deciding between.
            </p>
            <Link
              href="/quiz"
              className="rounded-full bg-[var(--accent)] px-5 py-3 text-center text-sm font-semibold text-white shadow-sm"
            >
              Start with the quiz
            </Link>
          </div>
        </div>
      </section>

      <section className="container-app pb-12 md:pb-16">
        <div className="rounded-[28px] border border-[var(--line)] bg-[rgba(255,250,242,0.7)] px-6 py-6 text-sm leading-7 text-[var(--muted)] md:px-8 md:py-7 md:text-base">
          Town advice here is meant as directional guidance, not certainty. Roads,
          seasons, housing quality, and neighborhood feel can shift the experience
          a lot inside the same town.
        </div>
      </section>
    </main>
  );
}
