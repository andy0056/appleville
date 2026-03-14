import Link from "next/link";
import { towns } from "@/lib/towns";

const featured = towns.slice(0, 6);

export default function Home() {
  return (
    <main>
      <section className="container-app py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <p className="eyebrow">Build Your Life in Himachal</p>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
                Find the right place in Himachal to live and work.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl">
                A practical guide for choosing the Himachal town that fits your
                lifestyle, budget, and remote-work needs.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/quiz"
                className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white"
              >
                Find your Himachal match
              </Link>
              <Link
                href="/towns"
                className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-sm font-semibold"
              >
                Explore towns
              </Link>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
              Not a travel blog. Not random reels. A calmer way to decide where
              life in Himachal might actually work for you.
            </p>
          </div>

          <div className="card p-6 md:p-8">
            <p className="eyebrow">What this helps with</p>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-[var(--muted)] md:text-base">
              <li>Which Himachal town fits my budget?</li>
              <li>Where can I work remotely without constant friction?</li>
              <li>Do I want quiet, social energy, or family practicality?</li>
              <li>Which places feel too touristy, too isolated, or just right?</li>
              <li>What tradeoffs come with Bir, Dharamshala, Palampur, Shimla, or Manali?</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container-app pb-8">
        <div className="card p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="eyebrow">Step 1</p>
              <h2 className="mt-3 text-xl font-semibold">Take the town match quiz</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                Tell us what matters to you: budget, weather, internet,
                access, pace of life, family needs, and work style.
              </p>
            </div>
            <div>
              <p className="eyebrow">Step 2</p>
              <h2 className="mt-3 text-xl font-semibold">Get your best-fit towns</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                See the places that match you best, along with the tradeoffs.
              </p>
            </div>
            <div>
              <p className="eyebrow">Step 3</p>
              <h2 className="mt-3 text-xl font-semibold">Compare before you commit</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                Explore practical town profiles and make a more grounded decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-app py-14 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Featured towns</p>
            <h2 className="mt-3 text-3xl font-semibold">Start with the places most people compare first</h2>
          </div>
          <Link href="/towns" className="text-sm font-medium text-[var(--accent)]">
            View all towns
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((town) => (
            <Link key={town.slug} href={`/towns/${town.slug}`} className="card p-6 transition hover:-translate-y-0.5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold">{town.name}</h3>
                  <p className="mt-1 text-sm text-[var(--forest)]">{town.archetype}</p>
                </div>
                <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium text-[var(--foreground)] capitalize">
                  {town.budget}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{town.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {town.vibe.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-app pb-20">
        <div className="card p-8 md:p-10">
          <p className="eyebrow">Built for people who want more than a vacation</p>
          <div className="mt-4 grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-3xl font-semibold">Choose your Himachal base with more clarity.</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--muted)]">
                Take the quiz, compare towns, and get a more realistic picture of
                where life in Himachal might suit you best.
              </p>
            </div>
            <div className="space-y-3 text-sm leading-7 text-[var(--muted)]">
              <p>• Remote workers looking for a reliable base</p>
              <p>• Freelancers and creators testing mountain life</p>
              <p>• People planning a slower 1–6 month stay</p>
              <p>• Himachalis thinking about returning home</p>
              <p>• Families exploring a practical long-term move</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
