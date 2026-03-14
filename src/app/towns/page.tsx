import Link from "next/link";
import { towns } from "@/lib/towns";

export default function TownsPage() {
  return (
    <main className="container-app py-14 md:py-20">
      <div className="space-y-8">
        <div className="space-y-3">
          <p className="eyebrow">Towns</p>
          <h1 className="text-4xl font-semibold">Explore the first Himachal town set</h1>
          <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">
            These are the first towns in the recommendation engine — chosen to
            represent different rhythms, tradeoffs, and styles of mountain life.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {towns.map((town) => (
            <Link key={town.slug} href={`/towns/${town.slug}`} className="card p-6 transition hover:-translate-y-0.5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">{town.name}</h2>
                  <p className="mt-1 text-sm text-[var(--forest)]">{town.archetype}</p>
                </div>
                <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium capitalize">
                  {town.budget}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{town.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {town.goodFor.slice(0, 3).map((item) => (
                  <span key={item} className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]">
                    {item}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
