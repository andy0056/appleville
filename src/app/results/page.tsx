import Link from "next/link";
import { ShareActions } from "@/components/share-actions";
import {
  getValidAnswersFromSearchParams,
  hasCompleteQuizAnswers,
  quizQuestions,
  scoreTowns,
} from "@/lib/quiz";
import { buildPageMetadata } from "@/lib/metadata";

const matchLabelStyles = {
  "Best fit": "bg-[var(--accent)] text-white",
  "Safer fit": "bg-[var(--forest)] text-white",
  "Aspirational fit": "bg-[var(--accent-soft)] text-[var(--foreground)]",
  "Alternative fit": "bg-[rgba(255,255,255,0.55)] text-[var(--foreground)]",
} as const;

export const metadata = buildPageMetadata({
  title: "Your Himachal town matches",
  description:
    "See your best-fit Himachal towns with tradeoffs, match notes, and links to grounded town profiles.",
  pathname: "/results",
  image: "/images/towns/dharamshala.jpg",
  noIndex: true,
});

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const answers = getValidAnswersFromSearchParams(resolvedSearchParams);
  const hasCompleteAnswers = hasCompleteQuizAnswers(answers);
  const ranked = scoreTowns(answers);
  const top = ranked.slice(0, 3);
  const backups = ranked.slice(3, 5);

  if (!hasCompleteAnswers) {
    return (
      <main className="container-app py-14 md:py-20">
        <div className="max-w-3xl space-y-6">
          <div className="space-y-3">
            <p className="eyebrow">Results</p>
            <h1 className="text-4xl font-semibold">Your quiz isn’t complete yet</h1>
            <p className="text-base leading-8 text-[var(--muted)]">
              Finish the full quiz so the recommendations reflect your actual
              preferences rather than guesswork.
            </p>
          </div>

          <div className="card p-6 md:p-8">
            <p className="eyebrow">Still needed</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
              {quizQuestions
                .filter((question) => !answers[question.key])
                .map((question) => (
                  <li key={question.key}>• {question.label}</li>
                ))}
            </ul>
          </div>

          <Link
            href="/quiz"
            className="inline-flex rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white"
          >
            Go back to the quiz
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container-app py-14 md:py-20">
      <div className="max-w-5xl space-y-6 md:space-y-8">
        <div className="space-y-3">
          <p className="eyebrow">Results</p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Your best-fit Himachal towns</h1>
          <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">
            These matches are based on your priorities around pace, access,
            remote-work fit, budget, and long-stay practicality.
          </p>
        </div>

        <div className="card p-5 md:p-6">
          <p className="text-sm leading-7 text-[var(--muted)]">
            Read these as best-fit directions, not guarantees. The useful part is
            how each town fits differently and what each one asks from you in return.
          </p>
        </div>

        <ShareActions
          title="Your Himachal town matches"
          text="Reopen this Appleville result set with the same answers."
          hint="Copy or share this URL to revisit the same quiz results."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {top.map((town) => (
            <article key={town.slug} className="card relative overflow-hidden p-5 md:p-6">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--forest)]" />
              <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${matchLabelStyles[town.matchProfile.label]}`}
                >
                  {town.matchProfile.label}
                </span>
                <span className="shrink-0 rounded-full bg-[rgba(255,255,255,0.55)] px-3 py-1 text-xs font-semibold text-[var(--foreground)]">
                  Score {town.score}
                </span>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">{town.name}</h2>
                  <p className="mt-1 text-sm text-[var(--forest)]">{town.archetype}</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{town.summary}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {town.matchProfile.strengthChips.map((item) => (
                  <span key={item} className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--muted)]">
                <div>
                  <p className="font-semibold text-[var(--foreground)]">Why this matched</p>
                  <p className="mt-1">{town.matchProfile.whyMatched}</p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--foreground)]">How it differs</p>
                  <p className="mt-1">{town.matchProfile.differenceNote}</p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--foreground)]">Main caution</p>
                  <p className="mt-1">{town.matchProfile.cautionNote}</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-[rgba(143,93,59,0.16)] bg-[rgba(234,215,191,0.24)] p-4 text-sm leading-7 text-[var(--muted)]">
                <span className="font-semibold text-[var(--foreground)]">Tradeoff:</span> {town.tradeoff}
              </div>

              <Link href={`/towns/${town.slug}`} className="mt-6 inline-block text-sm font-semibold text-[var(--accent)]">
                View town profile
              </Link>
            </article>
          ))}
        </div>

        <div className="card p-6 md:p-8">
          <p className="eyebrow">Backup options</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {backups.map((town) => (
              <Link key={town.slug} href={`/towns/${town.slug}`} className="rounded-2xl border border-[var(--line)] p-5 transition hover:bg-[rgba(255,255,255,0.35)]">
                <h3 className="text-xl font-semibold">{town.name}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{town.tradeoff}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
          <Link
            href={`/compare?towns=${top.map((town) => town.slug).join(",")}`}
            className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white"
          >
            Compare these towns
          </Link>
          <Link href="/quiz" className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-sm font-semibold">
            Retake quiz
          </Link>
        </div>
      </div>
    </main>
  );
}
