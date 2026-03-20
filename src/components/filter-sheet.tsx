"use client";

import { useEffect } from "react";

type FilterSheetProps = {
  title: string;
  description?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function FilterSheet({
  title,
  description,
  open,
  onOpenChange,
  children,
  footer,
}: FilterSheetProps) {
  useEffect(() => {
    if (!open) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onOpenChange, open]);

  if (!open) return null;

  return (
    <div className="md:hidden">
      <div
        className="fixed inset-0 z-40 bg-[rgba(44,34,27,0.22)]"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div
        className="fixed inset-x-0 bottom-0 z-50"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="mx-auto w-full max-w-[720px] rounded-t-[30px] border border-[var(--line)] bg-[var(--card)] px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-4 shadow-[0_-18px_50px_rgba(44,34,27,0.14)]">
          <div className="mx-auto h-1.5 w-12 rounded-full bg-[var(--line)]" />
          <div className="mt-4 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="eyebrow">{title}</p>
              {description ? (
                <p className="text-sm leading-6 text-[var(--muted)]">{description}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex min-h-11 items-center rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.55)] px-4 py-2 text-sm font-semibold"
            >
              Done
            </button>
          </div>
          <div className="mt-5 space-y-5">{children}</div>
          {footer ? <div className="mt-5">{footer}</div> : null}
        </div>
      </div>
    </div>
  );
}
