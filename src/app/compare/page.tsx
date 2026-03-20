import Link from "next/link";
import { CompareGrid } from "@/components/compare-grid";
import { CompareSelector } from "@/components/compare-selector";
import { ShareActions } from "@/components/share-actions";
import { buildPageMetadata } from "@/lib/metadata";
import { towns } from "@/lib/towns";

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
  const requestedSlugs = Array.isArray(rawCompare)
    ? rawCompare
    : typeof rawCompare === "string"
      ? rawCompare.split(",").filter(Boolean)
      : [];
  const selectedSlugs = requestedSlugs.filter((slug, index) =>
    requestedSlugs.indexOf(slug) === index && towns.some((town) => town.slug === slug),
  );
  const hasSelectedComparison = selectedSlugs.length >= 2;

  return (
    <main className="container-app py-8 pb-28 md:py-16 md:pb-16">
      <div className="space-y-6 md:space-y-8">
        <div id="overview" className="space-y-3 scroll-mt-28">
          <p className="eyebrow">Compare</p>
          <h1 className="text-3xl font-semibold md:text-4xl">Compare likely base options side by side</h1>
          <p className="max-w-2xl text-base leading-7 text-[var(--muted)] md:leading-8">
            Compare towns from your result shortlist or build your own side-by-side view.
            Look for where each place is strongest, and where the tradeoff starts to show.
          </p>
          <Link href="/how-it-works#compare" className="secondary-link inline-flex text-sm font-semibold">
            How to read this comparison
          </Link>
        </div>

        {hasSelectedComparison ? (
          <>
            <CompareGrid slugs={selectedSlugs.slice(0, 4)} />

            <div className="grid gap-3 sm:flex sm:flex-wrap">
              <Link href="/quiz" className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white">
                Take the quiz
              </Link>
              <Link href="/towns" className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-sm font-semibold">
                Browse all towns
              </Link>
            </div>

            <CompareSelector
              towns={towns}
              initialSelected={selectedSlugs.slice(0, 4)}
              hasUrlSelection={hasUrlSelection}
              collapsedByDefault
              mobileMode="sheet"
            />

            <ShareActions
              title="Compare Himachal towns side by side"
              text="Reopen this Appleville comparison with the same town set."
              hint="Copy or share this URL to reopen the same comparison state."
            />
          </>
        ) : (
          <>
            <CompareSelector
              towns={towns}
              initialSelected={selectedSlugs.slice(0, 4)}
              hasUrlSelection={hasUrlSelection}
            />

            <div className="compact-callout">
              <p className="text-base font-semibold text-[var(--foreground)]">
                Compare works best once two to four towns already feel live.
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                Use it when the shortlist is real and the decision now depends on
                access, quiet, family fit, tourist pressure, and long-stay shape.
              </p>
              <div className="mt-4 grid gap-3 sm:flex sm:flex-wrap">
                <Link href="/quiz" className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white">
                  Take the quiz first
                </Link>
                <Link href="/towns" className="rounded-full border border-[var(--line)] bg-[var(--card)] px-5 py-3 text-sm font-semibold">
                  Browse towns
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
