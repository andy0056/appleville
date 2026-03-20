import { AssistantNextLinks } from "@/components/assistant-next-links";
import { AssistantSources } from "@/components/assistant-sources";
import type { AssistantResponse } from "@/lib/assistant/types";

type AssistantMessageProps =
  | {
      role: "user";
      content: string;
    }
  | {
      role: "assistant";
      response: AssistantResponse;
    };

export function AssistantMessage(props: AssistantMessageProps) {
  if (props.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-[22px] bg-[var(--accent)] px-4 py-3 text-sm leading-6 text-white shadow-sm">
          {props.content}
        </div>
      </div>
    );
  }

  const { response } = props;

  return (
    <div className="flex justify-start">
      <div className="max-w-[92%] rounded-[24px] border border-[var(--line)] bg-[rgba(255,250,242,0.94)] px-4 py-4 text-[var(--foreground)] shadow-[0_10px_26px_rgba(44,34,27,0.06)] md:px-5">
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[rgba(255,255,255,0.6)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--forest)]">
                {response.didFallback ? "Grounded fallback" : "Straight answer"}
              </span>
              <span className="rounded-full border border-[var(--line)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                {response.confidence} confidence
              </span>
            </div>
            <p className="text-sm leading-7 text-[var(--foreground)]">{response.answer}</p>
          </div>

          {response.keyPoints.length ? (
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--forest)]">
                What matters
              </p>
              <div className="grid gap-2">
                {response.keyPoints.map((bullet) => (
                  <p
                    key={bullet}
                    className="rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.38)] px-3 py-3 text-xs leading-6 text-[var(--muted)]"
                  >
                    {bullet}
                  </p>
                ))}
              </div>
            </div>
          ) : null}

          {response.caution ? (
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--forest)]">
                Use caution
              </p>
              <p className="rounded-[18px] border border-[var(--line)] bg-[rgba(234,215,191,0.18)] px-3 py-3 text-xs leading-6 text-[var(--muted)]">
                {response.caution}
              </p>
            </div>
          ) : null}

          <AssistantSources citations={response.citations} />
          <AssistantNextLinks links={response.nextLinks} />
        </div>
      </div>
    </div>
  );
}
