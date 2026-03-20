"use client";

import { type CSSProperties, FormEvent, useEffect, useRef, useState } from "react";
import { AssistantMessage } from "@/components/assistant-message";
import { AssistantPromptChips } from "@/components/assistant-prompt-chips";
import type {
  AssistantConversationContext,
  AssistantMessage as AssistantHistoryMessage,
  AssistantResponse,
} from "@/lib/assistant/types";

type ClientMessage =
  | { id: string; role: "user"; content: string }
  | { id: string; role: "assistant"; response: AssistantResponse };

type AskApplevillePanelProps = {
  open: boolean;
  onClose: () => void;
  launcherBottomOffset: string;
};

const storageKey = "appleville:assistant";
const starterPrompts = [
  "Which towns are best for remote work?",
  "Bir vs Palampur for a longer stay",
  "What should I know before a trial move?",
  "Is tap water safe in Himachal?",
];

function buildHistory(messages: ClientMessage[]): AssistantHistoryMessage[] {
  return messages.map((message) =>
    message.role === "user"
      ? { role: "user", content: message.content }
      : { role: "assistant", content: message.response.answer },
  );
}

function loadSavedConversation() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      messages?: ClientMessage[];
      context?: AssistantConversationContext;
    };
    return {
      messages: Array.isArray(parsed.messages) ? parsed.messages : [],
      context: parsed.context ?? null,
    };
  } catch {
    return null;
  }
}

export function AskApplevillePanel({
  open,
  onClose,
  launcherBottomOffset,
}: AskApplevillePanelProps) {
  const [messages, setMessages] = useState<ClientMessage[]>([]);
  const [conversationContext, setConversationContext] =
    useState<AssistantConversationContext | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const panelStyle = {
    "--assistant-desktop-bottom": launcherBottomOffset,
  } as CSSProperties;

  useEffect(() => {
    const saved = loadSavedConversation();
    if (!saved) return;

    setMessages(saved.messages);
    setConversationContext(saved.context);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.sessionStorage.setItem(
        storageKey,
        JSON.stringify({
          messages,
          context: conversationContext,
        }),
      );
    } catch {
      // ignore storage failures
    }
  }, [conversationContext, messages]);

  useEffect(() => {
    setError(null);
    if (!open) return;

    const frame = window.requestAnimationFrame(() => {
      scrollerRef.current?.scrollTo({
        top: scrollerRef.current.scrollHeight,
        behavior: "smooth",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose, open]);

  async function submitMessage(message: string) {
    const trimmed = message.trim();
    if (!trimmed || loading) return;

    const nextUserMessage: ClientMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      content: trimmed,
    };

    const nextMessages = [...messages, nextUserMessage].slice(-10);
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          conversationContext,
          history: buildHistory(nextMessages).slice(-10),
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "Unable to reach the assistant right now.");
      }

      const payload = (await response.json()) as AssistantResponse & { historyLength?: number };
      const assistantMessage: ClientMessage = {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        response: payload,
      };

      setMessages((current) => [...current, assistantMessage].slice(-10));
      setConversationContext(payload.conversationContext);
    } catch (caughtError) {
      setMessages((current) => current.slice(0, -1));
      setInput(trimmed);
      setError(caughtError instanceof Error ? caughtError.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submitMessage(input);
  }

  function clearChat() {
    setMessages([]);
    setConversationContext(null);
    setInput("");
    setError(null);

    if (typeof window === "undefined") return;
    try {
      window.sessionStorage.removeItem(storageKey);
    } catch {
      // ignore storage failures
    }
  }

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[70] bg-[rgba(44,34,27,0.24)] md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      <section
        id="ask-appleville-panel"
        aria-label="Ask Appleville"
        className="fixed inset-x-0 bottom-0 z-[80] md:inset-auto md:right-4 md:bottom-[var(--assistant-desktop-bottom)] md:w-[400px]"
        style={panelStyle}
      >
        <div className="mx-auto flex h-[90vh] max-h-[90vh] w-full max-w-[720px] flex-col rounded-t-[30px] border border-[var(--line)] bg-[rgba(255,250,242,0.98)] shadow-[0_-18px_52px_rgba(44,34,27,0.16)] backdrop-blur-xl md:h-[min(78vh,760px)] md:max-h-[min(78vh,760px)] md:rounded-[30px] md:shadow-[0_28px_80px_rgba(44,34,27,0.18)]">
          <div className="px-4 pt-4 md:hidden">
            <div className="mx-auto h-1.5 w-12 rounded-full bg-[var(--line)]" />
          </div>

          <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] px-5 py-4">
            <div className="space-y-1">
              <p className="eyebrow">Ask Appleville</p>
              <p className="text-sm leading-6 text-[var(--muted)]">
                Grounded in published Appleville pages. If the site doesn’t have it,
                I’ll say so.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {messages.length ? (
                <button
                  type="button"
                  onClick={clearChat}
                  className="secondary-link text-sm font-semibold"
                >
                  Clear
                </button>
              ) : null}
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-11 items-center rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.45)] px-4 py-2 text-sm font-semibold"
              >
                Close
              </button>
            </div>
          </div>

          <div
            ref={scrollerRef}
            className="flex-1 space-y-4 overflow-y-auto px-5 py-5"
          >
            {!messages.length ? (
              <div className="space-y-5">
                <div className="rounded-[24px] border border-[var(--line)] bg-[rgba(255,255,255,0.45)] p-5">
                  <p className="text-sm leading-7 text-[var(--muted)]">
                    Use this when you want the short answer first, with citations back
                    into the actual site.
                  </p>
                </div>
                <AssistantPromptChips
                  prompts={starterPrompts}
                  onSelect={(prompt) => void submitMessage(prompt)}
                />
              </div>
            ) : (
              messages.map((message) =>
                message.role === "user" ? (
                  <AssistantMessage
                    key={message.id}
                    role="user"
                    content={message.content}
                  />
                ) : (
                  <AssistantMessage
                    key={message.id}
                    role="assistant"
                    response={message.response}
                  />
                ),
              )
            )}

            {loading ? (
              <div className="flex justify-start">
                <div className="rounded-[22px] border border-[var(--line)] bg-[rgba(255,255,255,0.45)] px-4 py-3 text-sm leading-6 text-[var(--muted)]">
                  Searching Appleville…
                </div>
              </div>
            ) : null}
          </div>

          <div className="border-t border-[var(--line)] px-5 py-4">
            {error ? (
              <p className="mb-3 text-sm leading-6 text-[var(--accent)]">{error}</p>
            ) : null}
            <form onSubmit={handleSubmit} className="space-y-3">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                rows={2}
                maxLength={320}
                placeholder="Ask about towns, tradeoffs, logistics, safety, property, water, or moving."
                className="min-h-[88px] w-full resize-none rounded-[22px] border border-[var(--line)] bg-[rgba(255,255,255,0.5)] px-4 py-3 text-sm leading-6 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none"
              />
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs leading-5 text-[var(--muted)]">
                  Keep prompts short. Answers stay grounded in live Appleville pages.
                </p>
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="inline-flex min-h-11 items-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Ask
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
