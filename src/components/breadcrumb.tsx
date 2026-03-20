import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  compactMobile?: boolean;
  mobileBackHref?: string;
  mobileBackLabel?: string;
};

export function Breadcrumb({
  items,
  compactMobile = false,
  mobileBackHref,
  mobileBackLabel,
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      {compactMobile && mobileBackHref && mobileBackLabel ? (
        <Link
          href={mobileBackHref}
          className="secondary-link inline-flex items-center gap-2 text-sm font-semibold md:hidden"
        >
          <span aria-hidden="true">←</span>
          {mobileBackLabel}
        </Link>
      ) : null}
      <ol
        className={`flex flex-wrap items-center gap-1 text-sm text-[var(--muted)] ${
          compactMobile ? "hidden md:flex" : ""
        }`}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1">
              {index > 0 ? (
                <span className="text-[var(--line)]" aria-hidden="true">/</span>
              ) : null}
              {item.href && !isLast ? (
                <Link href={item.href} className="secondary-link">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "font-medium text-[var(--foreground)]" : ""}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
