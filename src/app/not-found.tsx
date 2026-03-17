import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-app py-20 md:py-28">
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        <p className="eyebrow">Page not found</p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          This page doesn&apos;t exist
        </h1>
        <p className="text-base leading-8 text-[var(--muted)]">
          The page you are looking for may have been moved, renamed, or might
          never have existed. Try starting from one of the links below.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white"
          >
            Go home
          </Link>
          <Link
            href="/towns"
            className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-sm font-semibold"
          >
            Browse towns
          </Link>
          <Link
            href="/quiz"
            className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-sm font-semibold"
          >
            Take the quiz
          </Link>
        </div>
      </div>
    </main>
  );
}
