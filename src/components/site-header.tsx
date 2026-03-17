"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/quiz", label: "Quiz" },
  { href: "/towns", label: "Towns" },
  { href: "/compare", label: "Compare" },
  { href: "/guides", label: "Guides" },
  { href: "/how-it-works", label: "How it works" },
];

const extraLinks = [
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const showQuizButton = pathname !== "/";

  return (
    <header className="relative border-b border-[var(--line)]/80 bg-[rgba(247,242,232,0.85)] backdrop-blur-sm">
      <div className="container-app flex items-center justify-between py-4">
        <Link href="/" className="flex flex-col" onClick={() => setMenuOpen(false)}>
          <span className="text-sm font-semibold tracking-[0.18em] text-[var(--forest)] uppercase">
            Appleville
          </span>
          <span className="text-sm text-[var(--muted)]">Build Your Life in Himachal</span>
        </Link>

        <nav className="hidden gap-6 text-sm text-[var(--muted)] md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "text-[var(--foreground)]" : "secondary-link"}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {showQuizButton ? (
            <Link
              href="/quiz"
              className="hidden rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 md:inline-flex"
            >
              Take the quiz
            </Link>
          ) : null}

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="inline-flex rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--foreground)] md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-site-menu"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="md:hidden">
          <div
            className="fixed inset-0 z-40 bg-[rgba(44,34,27,0.18)]"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-site-menu"
            className="absolute inset-x-0 top-full z-50 border-t border-[var(--line)] bg-[var(--card)] shadow-[0_24px_60px_rgba(44,34,27,0.12)]"
          >
            <div className="container-app space-y-6 py-6">
              <div className="grid gap-3 text-base">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.45)] px-4 py-3"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="grid gap-3">
                {showQuizButton ? (
                  <Link
                    href="/quiz"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-full bg-[var(--accent)] px-5 py-3 text-center text-sm font-semibold text-white"
                  >
                    Take the quiz
                  </Link>
                ) : null}

                {extraLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="secondary-link text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
