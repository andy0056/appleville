import Link from "next/link";
import type { AssistantNextLink } from "@/lib/assistant/types";

export function AssistantNextLinks({ links }: { links: AssistantNextLink[] }) {
  if (!links.length) return null;

  return (
    <div className="space-y-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--forest)]">
        Open next
      </p>
      <div className="grid gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-[18px] border border-[var(--line)] bg-[rgba(234,215,191,0.22)] px-3 py-3 transition hover:border-[var(--accent)]/35"
          >
            <p className="text-sm font-semibold text-[var(--foreground)]">{link.label}</p>
            <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{link.reason}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
