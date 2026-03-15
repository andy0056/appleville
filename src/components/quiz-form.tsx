"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { QuizAnswerKey, QuizAnswers, quizQuestions } from "@/lib/quiz";

const totalQuestions = quizQuestions.length;

export function QuizForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const question = quizQuestions[step];
  const selected = answers[question.key];
  const progress = Math.round(((step + 1) / totalQuestions) * 100);

  const canContinue = Boolean(selected);
  const isLast = step === totalQuestions - 1;

  const summary = useMemo(() => {
    return quizQuestions
      .map((q) => {
        const value = answers[q.key];
        const option = q.options.find((item) => item.value === value);
        return option ? { label: q.label, value: option.label } : null;
      })
      .filter(Boolean) as { label: string; value: string }[];
  }, [answers]);

  function handleSelect(key: QuizAnswerKey, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function handleNext() {
    if (!canContinue) return;
    if (isLast) {
      const params = new URLSearchParams();
      Object.entries(answers).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });
      router.push(`/results?${params.toString()}`);
      return;
    }
    setStep((prev) => prev + 1);
  }

  function handleBack() {
    setStep((prev) => Math.max(prev - 1, 0));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <aside className="order-2 card p-5 lg:order-2 md:p-8">
        <p className="eyebrow">Your answers so far</p>
        {summary.length === 0 ? (
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            Start answering and your decision profile will build here.
          </p>
        ) : (
          <div className="mt-4 space-y-4">
            {summary.map((item) => (
              <div key={item.label} className="border-b border-[var(--line)] pb-4 last:border-b-0 last:pb-0">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--forest)]">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.value}</p>
              </div>
            ))}
          </div>
        )}
      </aside>

      <section className="order-1 card p-5 md:p-8 lg:order-1">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-[var(--muted)] md:text-sm">
              <span>
                Question {step + 1} of {totalQuestions}
              </span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-[var(--accent-soft)]">
              <div
                className="h-2 rounded-full bg-[var(--accent)] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="eyebrow">Current question</p>
            <h2 className="text-xl font-semibold leading-tight md:text-3xl">{question.label}</h2>
          </div>

          <div className="grid gap-3">
            {question.options.map((option) => {
              const isActive = selected === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(question.key, option.value)}
                  className={`rounded-2xl border px-4 py-4 text-left text-sm leading-6 transition md:px-5 md:py-5 md:text-base ${
                    isActive
                      ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--foreground)]"
                      : "border-[var(--line)] bg-[var(--card)] text-[var(--muted)] hover:border-[var(--accent)]/50"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <div className="grid gap-3 pt-2 sm:flex sm:flex-wrap">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 0}
              className="rounded-full border border-[var(--line)] bg-[var(--card)] px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!canContinue}
              className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLast ? "See my results" : "Continue"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
