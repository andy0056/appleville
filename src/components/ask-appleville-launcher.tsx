"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AskApplevillePanel } from "@/components/ask-appleville-panel";

function getLauncherBottomOffset(pathname: string) {
  if (pathname.startsWith("/quiz") || pathname.startsWith("/results") || pathname.startsWith("/compare")) {
    return "7.5rem";
  }

  return "1rem";
}

export function AskApplevilleLauncher() {
  const pathname = usePathname();
  return <AskApplevilleLauncherInner key={pathname} pathname={pathname} />;
}

function AskApplevilleLauncherInner({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const bottomOffset = getLauncherBottomOffset(pathname);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="press-scale fixed right-4 z-[65] inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--line)] bg-[rgba(255,250,242,0.95)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] shadow-[0_16px_40px_rgba(44,34,27,0.14)] backdrop-blur-xl"
        style={{
          bottom: `max(${bottomOffset}, env(safe-area-inset-bottom))`,
        }}
        aria-expanded={open}
        aria-controls="ask-appleville-panel"
      >
        <span className="rounded-full bg-[var(--accent-soft)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--forest)]">
          Ask
        </span>
        Appleville
      </button>

      <AskApplevillePanel
        open={open}
        onClose={() => setOpen(false)}
        launcherBottomOffset={bottomOffset}
      />
    </>
  );
}
