"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { buildDecisionProfile, questionHelperText } from "@/lib/decision-profile";
import { QuizAnswerKey, QuizAnswers, quizQuestions } from "@/lib/quiz";

const totalQuestions = quizQuestions.length;

export function QuizForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const question = quizQuestions[step];
  const selected = answers[question.key];
  const progress = Math.round(((step + 1) / totalQuestions) * 100);
  const decisionProfile = buildDecisionProfile(answers);

  const canContinue = Boolean(selected);
  const isLast = step === totalQuestions - 1;

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

  function jumpToQuestion(index: number) {
    setStep(index);
  }

  const helperText = questionHelperText[question.key];

  const summaryBlock = (
    <div className="space-y-5">
      <div className="compact-callout">
        <p className="eyebrow">Decision profile</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {decisionProfile.map((item) => (
            <div
              key={item.id}
              className="rounded-[20px] border border-[var(--line)] bg-[rgba(255,255,255,0.45)] px-4 py-3"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--forest)]">
                {item.label}
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                {item.value ?? "Still being shaped"}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-5 md:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="eyebrow">Your answers so far</p>
          <Link href="/how-it-works#quiz" className="secondary-link text-sm font-semibold">
            What this quiz considers
          </Link>
        </div>
        <div className="mt-4 space-y-3">
          {quizQuestions.map((quizQuestion, index) => {
            const value = answers[quizQuestion.key];
            const option = quizQuestion.options.find((item) => item.value === value);
            return (
              <button
                key={quizQuestion.key}
                type="button"
                onClick={() => jumpToQuestion(index)}
                className={`w-full rounded-[20px] border px-4 py-3 text-left transition ${
                  index === step
                    ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                    : "border-[var(--line)] bg-[rgba(255,255,255,0.35)]"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--forest)]">
                  {quizQuestion.label}
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  {option?.label ?? "Not answered yet"}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <aside className="order-2 hidden lg:block">
        {summaryBlock}
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
            {helperText ? (
              <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
                {helperText}
              </p>
            ) : null}
          </div>

          <div className="lg:hidden">{summaryBlock}</div>

          <div className="grid gap-3">
            {question.options.map((option) => {
              const isActive = selected === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(question.key, option.value)}
                  className={`press-scale rounded-2xl border px-4 py-4 text-left text-sm leading-6 md:px-5 md:py-5 md:text-base ${
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

          <div className="grid gap-3 pt-2">
            <button
              type="button"
              onClick={handleNext}
              disabled={!canContinue}
              className="w-full rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLast ? "See my results" : "Continue"}
            </button>
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 0}
              className="rounded-full border border-[var(--line)] bg-[var(--card)] px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50 sm:w-fit"
            >
              Back
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
