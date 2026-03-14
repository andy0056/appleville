import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Build Your Life in Himachal",
  description: "Find the Himachal town that fits your lifestyle, budget, and work needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="page-shell">
          <header className="border-b border-[var(--line)]/80 bg-[rgba(247,242,232,0.85)] backdrop-blur-sm">
            <div className="container-app flex items-center justify-between py-4">
              <Link href="/" className="flex flex-col">
                <span className="text-sm font-semibold tracking-[0.18em] text-[var(--forest)] uppercase">
                  Appleville
                </span>
                <span className="text-sm text-[var(--muted)]">Build Your Life in Himachal</span>
              </Link>

              <nav className="hidden gap-6 text-sm text-[var(--muted)] md:flex">
                <Link href="/quiz">Quiz</Link>
                <Link href="/towns">Towns</Link>
                <Link href="/compare">Compare</Link>
                <Link href="/guides">Guides</Link>
                <Link href="/about">About</Link>
              </nav>

              <Link
                href="/quiz"
                className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                Find your match
              </Link>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
