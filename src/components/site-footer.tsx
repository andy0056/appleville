import Link from "next/link";

const productLinks = [
  { href: "/quiz", label: "Quiz" },
  { href: "/towns", label: "Towns" },
  { href: "/compare", label: "Compare" },
  { href: "/guides", label: "Guides" },
  { href: "/first-30-days", label: "First 30 days" },
  { href: "/property-rules", label: "Property rules" },
  { href: "/power-backup", label: "Power backup" },
  { href: "/womens-safety", label: "Women's safety" },
  { href: "/banking", label: "Banking & money" },
  { href: "/community", label: "Community & wellbeing" },
];

const trustLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)]/80 bg-[rgba(255,250,242,0.75)]">
      <div className="container-app py-10 md:py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-16">
          <div className="max-w-[36rem] space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--forest)]">
              Appleville
            </p>
            <p className="text-[15px] leading-8 text-pretty text-[var(--muted)]">
              A practical tool for matching, comparing, and reality-checking
              Himachal towns for longer stays, remote work, and everyday life.
            </p>
            <p className="text-sm leading-7 text-[var(--muted)]">
              Directional guidance, not certainty.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:justify-self-end">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-[var(--foreground)]">Product</p>
              <div className="grid gap-3 text-sm text-[var(--muted)]">
                {productLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="secondary-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold text-[var(--foreground)]">Trust</p>
              <div className="grid gap-3 text-sm text-[var(--muted)]">
                {trustLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="secondary-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
