import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { TownCard } from "@/components/town-card";
import { towns } from "@/lib/towns";

const featured = towns.slice(0, 6);

export default function Home() {
  return (
    <main>
      <section className="container-app py-12 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-6 md:space-y-7">
            <div className="inline-flex rounded-full border border-[var(--line)] bg-[rgba(255,250,242,0.7)] px-4 py-2 text-xs font-medium text-[var(--forest)] shadow-sm md:text-sm">
              Build Your Life in Himachal
            </div>
            <div className="space-y-4 md:space-y-5">
              <h1 className="max-w-4xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-6xl">
                Find the right place in Himachal to live and work.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-[var(--muted)] md:text-xl md:leading-8">
                A practical, calmer guide for choosing the Himachal town that fits
                your lifestyle, budget, and remote-work needs.
              </p>
            </div>
            <div className="grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
              <Link
                href="/quiz"
                className="rounded-full bg-[var(--accent)] px-6 py-3 text-center text-sm font-semibold text-white shadow-sm"
              >
                Find your Himachal match
              </Link>
              <Link
                href="/towns"
                className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-center text-sm font-semibold"
              >
                Explore towns
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-[var(--muted)] sm:text-sm">
              <span className="rounded-full bg-[rgba(255,255,255,0.45)] px-3 py-1">Mobile-friendly quiz</span>
              <span className="rounded-full bg-[rgba(255,255,255,0.45)] px-3 py-1">Town comparisons</span>
              <span className="rounded-full bg-[rgba(255,255,255,0.45)] px-3 py-1">Practical guidance</span>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
              Not a travel blog. Not random reels. A more grounded way to decide
              where life in Himachal might actually work for you.
            </p>
          </div>

          <div className="card relative overflow-hidden p-6 md:p-8">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--forest)]" />
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
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              step: "Step 1",
              title: "Take the town match quiz",
              body: "Tell us what matters to you: budget, weather, internet, access, pace of life, family needs, and work style.",
            },
            {
              step: "Step 2",
              title: "Get your best-fit towns",
              body: "See the places that match you best, along with the tradeoffs and why they surfaced.",
            },
            {
              step: "Step 3",
              title: "Compare before you commit",
              body: "Explore practical town profiles and make a more grounded decision about the next chapter.",
            },
          ].map((item) => (
            <div key={item.step} className="card p-6 md:p-7">
              <p className="eyebrow">{item.step}</p>
              <h2 className="mt-3 text-xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-app py-14 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Featured towns"
            title="Start with the places most people compare first"
            body="Different rhythms, different tradeoffs, different versions of mountain life."
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
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="eyebrow">Built for people who want more than a vacation</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Choose your Himachal base with more clarity.</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--muted)]">
                Take the quiz, compare towns, and get a more realistic picture of
                where life in Himachal might suit you best.
              </p>
            </div>
            <div className="grid gap-3 text-sm leading-7 text-[var(--muted)]">
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
