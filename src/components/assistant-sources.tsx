import Link from "next/link";
import type { AssistantCitation } from "@/lib/assistant/types";

export function AssistantSources({ citations }: { citations: AssistantCitation[] }) {
  if (!citations.length) return null;

  return (
    <div className="space-y-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--forest)]">
        Sources
      </p>
      <div className="grid gap-2">
        {citations.map((citation) => (
          <Link
            key={citation.href}
            href={citation.href}
            className="rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.4)] px-3 py-3 transition hover:border-[var(--accent)]/35"
          >
            <p className="text-sm font-semibold text-[var(--foreground)]">{citation.title}</p>
            <p className="mt-1 text-xs font-medium text-[var(--forest)]">{citation.sectionLabel}</p>
            {citation.excerpt ? (
              <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{citation.excerpt}</p>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
