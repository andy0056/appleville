import Image from "next/image";
import Link from "next/link";
import { getTownCardHighlights, getTownMetricRow } from "@/lib/town-discovery";
import { Town } from "@/lib/towns";

export function TownCard({ town, priority = false }: { town: Town; priority?: boolean }) {
  const highlights = getTownCardHighlights(town);
  const metrics = getTownMetricRow(town);

  return (
    <Link
      href={`/towns/${town.slug}`}
      className="group hover-lift-soft card relative overflow-hidden p-6"
    >
      <div className="-mx-6 -mt-6 mb-4 overflow-hidden border-b border-[var(--line)] bg-[rgba(234,215,191,0.25)]">
        <div className="relative aspect-[4/3]">
          <Image
            src={town.image.src}
            alt={town.image.alt}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        </div>
      </div>
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
        {highlights.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.35)] px-3 py-1 text-xs text-[var(--muted)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 grid gap-3 text-sm text-[var(--muted)]">
        <div className="flex flex-wrap gap-3">
          {metrics.map((item) => (
            <span key={item.label}>
              {item.label} {item.value}/5
            </span>
          ))}
        </div>
        <span className="font-semibold text-[var(--accent)] transition group-hover:translate-x-0.5">
          Explore →
        </span>
      </div>
    </Link>
  );
}
