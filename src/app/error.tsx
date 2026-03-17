"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="container-app py-20 md:py-28">
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Unexpected error
        </h1>
        <p className="text-base leading-8 text-[var(--muted)]">
          Something broke while loading this page. You can try again or navigate
          somewhere else.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-sm font-semibold"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
