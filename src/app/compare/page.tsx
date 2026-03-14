import Link from "next/link";
import { CompareGrid } from "@/components/compare-grid";

const fallbackSlugs = ["palampur", "dharamshala", "solan"];

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const rawCompare = resolvedSearchParams.towns;
  const selectedSlugs = Array.isArray(rawCompare)
    ? rawCompare
    : typeof rawCompare === "string"
      ? rawCompare.split(",").filter(Boolean)
      : fallbackSlugs;

  return (
    <main className="container-app py-14 md:py-20">
      <div className="space-y-8">
        <div className="space-y-3">
          <p className="eyebrow">Compare</p>
          <h1 className="text-4xl font-semibold">Compare likely base options side by side</h1>
          <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">
            This page now supports comparing selected towns through the URL. If
            no towns are provided, it falls back to a sensible starter set.
          </p>
        </div>

        <CompareGrid slugs={selectedSlugs.slice(0, 4)} />

        <div className="flex flex-wrap gap-4">
          <Link href="/results" className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white">
            See your results
          </Link>
          <Link href="/towns" className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-sm font-semibold">
            Browse all towns
          </Link>
        </div>
      </div>
    </main>
  );
}
