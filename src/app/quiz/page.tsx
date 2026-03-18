import Link from "next/link";
import { QuizForm } from "@/components/quiz-form";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Take the Himachal town match quiz",
  description:
    "Answer a few practical questions about pace, access, budget, and work style to get a sharper Himachal shortlist.",
  pathname: "/quiz",
  image: "/images/towns/dharamshala.jpg",
});

export default function QuizPage() {
  return (
    <main className="container-app py-8 md:py-20">
      <div className="space-y-5 md:space-y-8">
        <div className="max-w-3xl space-y-3">
          <p className="eyebrow">Quiz</p>
          <h1 className="text-2xl font-semibold md:text-4xl">Find your Himachal match</h1>
          <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">
            Answer a few practical questions and we’ll suggest the Himachal towns
            that seem most aligned with how you want to live and work.
          </p>
          <Link href="/how-it-works#quiz" className="secondary-link inline-flex text-sm font-semibold">
            What this quiz considers
          </Link>
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
