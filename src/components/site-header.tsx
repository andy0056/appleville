"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/quiz", label: "Quiz" },
  { href: "/towns", label: "Towns" },
  { href: "/compare", label: "Compare" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
];

const resourceLinks = [
  { href: "/guides", label: "Guides", sub: "Editorial deep dives on town fit" },
  { href: "/first-30-days", label: "First 30 days", sub: "Settling playbook — town by town" },
  { href: "/property-rules", label: "Property rules", sub: "Section 118, leases & legal routes" },
  { href: "/power-backup", label: "Power backup", sub: "Outages, UPS tiers & heating strategy" },
  { href: "/womens-safety", label: "Women's safety", sub: "Town profiles, safe spaces & healthcare" },
  { href: "/banking", label: "Banking & money", sub: "Banks, UPI, forex & non-resident accounts" },
  { href: "/community", label: "Community & wellbeing", sub: "Coworking, mental health & peer support" },
];

const allLinks = [...navLinks, ...resourceLinks];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const showQuizButton = pathname !== "/";
  const dropdownRef = useRef<HTMLDivElement>(null);

  function isActiveLink(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const isResourceActive = resourceLinks.some((l) => isActiveLink(l.href));

  useEffect(() => {
    function handleScroll() {
      const next = window.scrollY > 12;
      setIsScrolled((current) => (current === next ? current : next));
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close dropdown on outside click */
  useEffect(() => {
    if (!resourcesOpen) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [resourcesOpen]);


  useEffect(() => {
    if (!menuOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color] duration-[180ms] ease-out ${
        isScrolled
          ? "border-[rgba(220,207,191,0.92)] bg-[rgba(247,242,232,0.97)]"
          : "border-[var(--line)]/80 bg-[rgba(247,242,232,0.92)]"
      }`}
    >
      <div className="container-app py-3 md:py-4">
        <div
          className={`flex items-center justify-between gap-3 rounded-[28px] border px-4 py-3 shadow-[0_12px_34px_rgba(44,34,27,0.06)] transition-[background-color,border-color,box-shadow] duration-[180ms] ease-out md:px-5 md:py-3.5 lg:px-6 ${
            isScrolled
              ? "border-[rgba(220,207,191,0.95)] bg-[rgba(255,250,242,0.96)] shadow-[0_18px_42px_rgba(44,34,27,0.09)]"
              : "border-[var(--line)] bg-[rgba(255,250,242,0.88)]"
          }`}
        >
          <Link href="/" className="flex flex-col pr-2" onClick={() => setMenuOpen(false)}>
            <span className="text-[0.98rem] font-semibold tracking-[0.22em] text-[var(--forest)] uppercase">
              Appleville
            </span>
            <span className="text-[0.92rem] leading-6 text-[var(--muted)]">
              Build Your Life in Himachal
            </span>
          </Link>

          {/* Desktop nav */}
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

            {/* Resources dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setResourcesOpen((p) => !p)}
                className={`inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 py-2 text-[15px] font-medium transition ${
                  isResourceActive
                    ? "bg-[var(--accent-soft)] text-[var(--foreground)] shadow-[inset_0_0_0_1px_rgba(143,93,59,0.14)]"
                    : "text-[var(--muted)] hover:bg-[rgba(255,255,255,0.58)] hover:text-[var(--foreground)]"
                }`}
                aria-expanded={resourcesOpen}
              >
                Resources
                <svg
                  className={`h-3.5 w-3.5 transition-transform ${resourcesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {resourcesOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-2 shadow-[0_20px_50px_rgba(44,34,27,0.12)]">
                  {resourceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setResourcesOpen(false)}
                      className={`block rounded-xl px-4 py-3 transition ${
                        isActiveLink(link.href)
                          ? "bg-[var(--accent-soft)]"
                          : "hover:bg-[rgba(255,255,255,0.6)]"
                      }`}
                    >
                      <span className="text-sm font-semibold text-[var(--foreground)]">
                        {link.label}
                      </span>
                      <span className="mt-0.5 block text-xs leading-5 text-[var(--muted)]">
                        {link.sub}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
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

      {/* Mobile menu */}
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
                {allLinks.map((link) => (
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
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
