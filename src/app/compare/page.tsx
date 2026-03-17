import Link from "next/link";
import { CompareGrid } from "@/components/compare-grid";
import { CompareSelector } from "@/components/compare-selector";
import { ShareActions } from "@/components/share-actions";
import { buildPageMetadata } from "@/lib/metadata";
import { towns } from "@/lib/towns";

const fallbackSlugs = ["palampur", "dharamshala", "solan"];

export const metadata = buildPageMetadata({
  title: "Compare Himachal towns side by side",
  description:
    "Compare likely Himachal base options across quiet, access, family fit, remote-work ease, and long-stay practicality.",
  pathname: "/compare",
  image: "/images/towns/dharamshala.jpg",
  noIndex: true,
});

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const rawCompare = resolvedSearchParams.towns;
  const hasUrlSelection = Array.isArray(rawCompare)
    ? rawCompare.length > 0
    : typeof rawCompare === "string"
      ? rawCompare.length > 0
      : false;
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
            Compare towns from your result shortlist or build your own side-by-side view.
            Look for where each place is strongest, and where the tradeoff starts to show.
          </p>
        </div>

        <ShareActions
          title="Compare Himachal towns side by side"
          text="Reopen this Appleville comparison with the same town set."
          hint="Copy or share this URL to reopen the same comparison state."
        />

        <CompareSelector
          towns={towns}
          initialSelected={selectedSlugs.slice(0, 4)}
          hasUrlSelection={hasUrlSelection}
        />

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
