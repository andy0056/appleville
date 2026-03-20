"use client";

import Link from "next/link";

type ActionProps = {
  label: string;
  href?: string;
  onClick?: () => void;
  tone: "primary" | "secondary";
  disabled?: boolean;
};

type MobileActionBarProps = {
  primaryLabel: string;
  primaryHref?: string;
  primaryOnClick?: () => void;
  primaryDisabled?: boolean;
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryOnClick?: () => void;
  secondaryDisabled?: boolean;
  showOnMobileOnly?: boolean;
  visible?: boolean;
};

function ActionButton({ label, href, onClick, tone, disabled = false }: ActionProps) {
  const className =
    tone === "primary"
      ? "inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
      : "inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--card)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-50";

  if (href && !disabled) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className} disabled={disabled}>
      {label}
    </button>
  );
}

export function MobileActionBar({
  primaryLabel,
  primaryHref,
  primaryOnClick,
  primaryDisabled = false,
  secondaryLabel,
  secondaryHref,
  secondaryOnClick,
  secondaryDisabled = false,
  showOnMobileOnly = true,
  visible = true,
}: MobileActionBarProps) {
  if (!visible) return null;

  return (
    <div className={showOnMobileOnly ? "md:hidden" : ""}>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-4">
        <div
          className="container-app pointer-events-auto rounded-[24px] border border-[var(--line)] bg-[rgba(255,250,242,0.96)] p-3 shadow-[0_-10px_30px_rgba(44,34,27,0.08)] backdrop-blur-xl"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <div
            className={`grid gap-3 ${secondaryLabel ? "grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]" : ""}`}
          >
            <ActionButton
              label={primaryLabel}
              href={primaryHref}
              onClick={primaryOnClick}
              tone="primary"
              disabled={primaryDisabled}
            />
            {secondaryLabel ? (
              <ActionButton
                label={secondaryLabel}
                href={secondaryHref}
                onClick={secondaryOnClick}
                tone="secondary"
                disabled={secondaryDisabled}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
