import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-[var(--muted)]">
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
