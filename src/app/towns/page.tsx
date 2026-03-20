import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { buildPageMetadata } from "@/lib/metadata";
import { TownExplorer } from "@/components/town-explorer";
import { towns } from "@/lib/towns";

export const metadata = buildPageMetadata({
  title: "Browse Himachal town profiles",
  description:
    "Explore grounded profiles for Bir, Dharamshala, McLeodganj, Palampur, Shimla, Solan, Manali, and Naggar.",
  pathname: "/towns",
  image: "/images/towns/bir.jpg",
});

export default function TownsPage() {
  return (
    <main className="container-app py-8 md:py-16">
      <div className="space-y-6 md:space-y-12">
        <section
          id="overview"
          className="grid scroll-mt-28 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,300px)] lg:items-end lg:gap-8"
        >
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Towns"
              title="Browse towns by fit, not just by name"
              body="Search, filter, and sort the current town set by quiet, access, remote-work fit, family shape, and long-stay strength."
            />

            <p className="max-w-3xl text-sm leading-7 text-pretty text-[var(--muted)] md:text-base">
              Use this when you already know some town names, or when you want
              to narrow by decision filters before the shortlist gets noisy.
            </p>
            <Link
              href="/how-it-works#town-pages"
              className="secondary-link inline-flex text-sm font-semibold md:hidden"
            >
              How Appleville reads towns
            </Link>
          </div>

          <div className="compact-callout hidden md:block">
            <p className="eyebrow">Reading lens</p>
            <p className="mt-3 text-sm leading-7 text-pretty text-[var(--muted)]">
              These town pages are meant to help with fit, tradeoffs, and
              everyday shape, not predict your exact neighborhood experience.
            </p>
            <Link
              href="/how-it-works#town-pages"
              className="secondary-link mt-4 inline-flex text-sm font-semibold"
            >
              How Appleville reads towns
            </Link>
          </div>
        </section>

        <TownExplorer towns={towns} />
      </div>
    </main>
  );
}
