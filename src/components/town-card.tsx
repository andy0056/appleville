import Link from "next/link";
import { Town } from "@/lib/towns";

export function TownCard({ town }: { town: Town }) {
  return (
    <Link
      href={`/towns/${town.slug}`}
      className="group card relative overflow-hidden p-6 transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(82,98,77,0.08)]"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--accent)] via-[var(--forest)] to-[var(--accent-soft)] opacity-80" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight">{town.name}</h3>
          <p className="mt-1 text-sm text-[var(--forest)]">{town.archetype}</p>
        </div>
        <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium capitalize text-[var(--foreground)]">
          {town.budget}
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{town.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {town.vibe.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.35)] px-3 py-1 text-xs text-[var(--muted)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="text-[var(--muted)]">Remote work {town.remoteWork}/5</span>
        <span className="font-semibold text-[var(--accent)] transition group-hover:translate-x-0.5">
          Explore →
        </span>
      </div>
    </Link>
  );
}
