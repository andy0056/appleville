"use client";

type AssistantPromptChipsProps = {
  prompts: string[];
  onSelect: (prompt: string) => void;
};

export function AssistantPromptChips({
  prompts,
  onSelect,
}: AssistantPromptChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => onSelect(prompt)}
          className="rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.55)] px-3 py-2 text-left text-xs leading-5 text-[var(--muted)] transition hover:border-[var(--accent)]/45 hover:text-[var(--foreground)]"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
