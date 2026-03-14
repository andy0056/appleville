import Link from "next/link";
import {
  buildReason,
  getValidAnswersFromSearchParams,
  hasCompleteQuizAnswers,
  quizQuestions,
  scoreTowns,
} from "@/lib/quiz";

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
      <div className="max-w-5xl space-y-8">
        <div className="space-y-3">
          <p className="eyebrow">Results</p>
          <h1 className="text-4xl font-semibold">Your best-fit Himachal towns</h1>
          <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">
            These matches are based on your priorities around pace, access,
            remote-work fit, budget, and long-stay practicality.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {top.map((town, index) => (
            <article key={town.slug} className="card p-6">
              <p className="text-sm font-semibold text-[var(--forest)]">Top match #{index + 1}</p>
              <h2 className="mt-2 text-2xl font-semibold">{town.name}</h2>
              <p className="mt-1 text-sm text-[var(--forest)]">{town.archetype}</p>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{buildReason(town.name, answers)}</p>
              <div className="mt-5 space-y-2 text-sm text-[var(--muted)]">
                <p>
                  <span className="font-semibold text-[var(--foreground)]">Why it fits:</span> {town.summary}
                </p>
                <p>
                  <span className="font-semibold text-[var(--foreground)]">Tradeoff:</span> {town.tradeoff}
                </p>
                <p>
                  <span className="font-semibold text-[var(--foreground)]">Score:</span> {town.score}
                </p>
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
              <Link key={town.slug} href={`/towns/${town.slug}`} className="rounded-2xl border border-[var(--line)] p-5">
                <h3 className="text-xl font-semibold">{town.name}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{town.tradeoff}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
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
