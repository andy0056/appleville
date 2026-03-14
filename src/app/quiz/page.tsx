import Link from "next/link";
import { QuizForm } from "@/components/quiz-form";

export default function QuizPage() {
  return (
    <main className="container-app py-14 md:py-20">
      <div className="space-y-8">
        <div className="max-w-3xl space-y-3">
          <p className="eyebrow">Quiz</p>
          <h1 className="text-4xl font-semibold">Find your Himachal match</h1>
          <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">
            Answer a few practical questions and we’ll suggest the Himachal towns
            that seem most aligned with how you want to live and work.
          </p>
        </div>

        <QuizForm />

        <div className="flex flex-wrap gap-4">
          <Link
            href="/towns"
            className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-sm font-semibold"
          >
            Explore towns first
          </Link>
        </div>
      </div>
    </main>
  );
}
