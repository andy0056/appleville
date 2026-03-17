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

  function isActiveLink(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)]/80 bg-[rgba(247,242,232,0.92)] backdrop-blur-xl">
      <div className="container-app py-3 md:py-4">
        <div className="flex items-center justify-between gap-3 rounded-[28px] border border-[var(--line)] bg-[rgba(255,250,242,0.88)] px-4 py-3 shadow-[0_12px_34px_rgba(44,34,27,0.06)] md:px-5 md:py-3.5 lg:px-6">
        <Link href="/" className="flex flex-col pr-2" onClick={() => setMenuOpen(false)}>
          <span className="text-[0.98rem] font-semibold tracking-[0.22em] text-[var(--forest)] uppercase">
            Appleville
          </span>
          <span className="text-[0.92rem] leading-6 text-[var(--muted)]">
            Build Your Life in Himachal
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActiveLink(link.href) ? "page" : undefined}
              className={`inline-flex min-h-11 items-center rounded-full px-4 py-2 text-[15px] font-medium transition ${
                isActiveLink(link.href)
                  ? "bg-[var(--accent-soft)] text-[var(--foreground)] shadow-[inset_0_0_0_1px_rgba(143,93,59,0.14)]"
                  : "text-[var(--muted)] hover:bg-[rgba(255,255,255,0.58)] hover:text-[var(--foreground)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {showQuizButton ? (
            <Link
              href="/quiz"
              className="hidden min-h-11 items-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-[15px] font-semibold text-white transition hover:opacity-90 lg:inline-flex"
            >
              Take the quiz
            </Link>
          ) : null}

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="inline-flex min-h-11 items-center rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2.5 text-[15px] font-semibold text-[var(--foreground)] shadow-[0_8px_20px_rgba(44,34,27,0.05)] lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-site-menu"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
        </div>
      </div>

      {menuOpen ? (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 z-40 bg-[rgba(44,34,27,0.18)]"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-site-menu"
            className="absolute inset-x-0 top-full z-50 px-4 pb-4"
          >
            <div className="mx-auto w-full max-w-[1120px] rounded-[28px] border border-[var(--line)] bg-[var(--card)] p-4 shadow-[0_24px_60px_rgba(44,34,27,0.12)]">
              <div className="grid gap-3 text-base">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActiveLink(link.href) ? "page" : undefined}
                    className={`rounded-2xl border px-4 py-3.5 text-[15px] font-medium transition ${
                      isActiveLink(link.href)
                        ? "border-[rgba(143,93,59,0.2)] bg-[var(--accent-soft)] text-[var(--foreground)]"
                        : "border-[var(--line)] bg-[rgba(255,255,255,0.45)] text-[var(--foreground)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-5 grid gap-3">
                {showQuizButton ? (
                  <Link
                    href="/quiz"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-full bg-[var(--accent)] px-5 py-3.5 text-center text-[15px] font-semibold text-white"
                  >
                    Take the quiz
                  </Link>
                ) : null}

                {extraLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="secondary-link px-1 text-sm font-medium"
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
