import Image from "next/image";
import Link from "next/link";
import { getTownCardHighlights, getTownMetricRow } from "@/lib/town-discovery";
import { Town } from "@/lib/towns";

type TownCardProps = {
  town: Town;
  priority?: boolean;
  variant?: "default" | "compact";
  maxHighlights?: number;
  maxMetrics?: number;
};

export function TownCard({
  town,
  priority = false,
  variant = "default",
  maxHighlights,
  maxMetrics,
}: TownCardProps) {
  const highlights = getTownCardHighlights(town);
  const metrics = getTownMetricRow(town);
  const compact = variant === "compact";
  const visibleHighlights = highlights.slice(0, maxHighlights ?? (compact ? 2 : highlights.length));
  const visibleMetrics = metrics.slice(0, maxMetrics ?? (compact ? 2 : metrics.length));

  return (
    <Link
      href={`/towns/${town.slug}`}
      className={`group hover-lift-soft card relative overflow-hidden ${
        compact ? "p-4 md:p-5" : "p-4 md:p-6"
      }`}
    >
      <div
        className={`mb-4 overflow-hidden border-b border-[var(--line)] bg-[rgba(234,215,191,0.25)] ${
          compact ? "-mx-4 -mt-4 md:-mx-5 md:-mt-5" : "-mx-4 -mt-4 md:-mx-6 md:-mt-6"
        }`}
      >
        <div className={`relative ${compact ? "aspect-[16/10]" : "aspect-[16/10] md:aspect-[4/3]"}`}>
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
          <h3 className={`${compact ? "text-xl" : "text-2xl"} font-semibold tracking-tight`}>
            {town.name}
          </h3>
          <p className="mt-1 text-sm text-[var(--forest)]">{town.archetype}</p>
        </div>
        <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium capitalize text-[var(--foreground)]">
          {town.budget}
        </span>
      </div>

      <p className={`mt-4 text-sm text-[var(--muted)] ${compact ? "leading-6" : "leading-7"}`}>
        {town.summary}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {visibleHighlights.map((tag) => (
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
          {visibleMetrics.map((item) => (
            <span key={item.label}>
              {item.label} {item.value}/5
            </span>
          ))}
        </div>
        <span className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.46)] px-4 py-2 text-sm font-semibold text-[var(--accent)] transition group-hover:border-[var(--accent)]/30 group-hover:bg-[rgba(255,255,255,0.7)]">
          View town profile →
        </span>
      </div>
    </Link>
  );
}
