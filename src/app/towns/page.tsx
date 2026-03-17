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
    <main className="container-app py-14 md:py-20">
      <div className="space-y-8">
        <SectionHeading
          eyebrow="Towns"
          title="Browse towns by fit, not just by name"
          body="Search, filter, and sort the current town set by quiet, access, remote-work fit, family shape, and long-stay strength."
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
            Use this when you already know some town names, or when you want to
            narrow by decision filters before the shortlist gets noisy.
          </p>
          <Link href="/how-it-works#town-pages" className="secondary-link text-sm font-semibold">
            How Appleville reads towns
          </Link>
        </div>

        <TownExplorer towns={towns} />
      </div>
    </main>
  );
}
