import { DecisionProfileItem } from "@/lib/decision-profile";

export function ResultRecapChips({ items }: { items: DecisionProfileItem[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item.id}
          className="rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.45)] px-3 py-2 text-sm text-[var(--muted)]"
        >
          <span className="font-semibold text-[var(--foreground)]">{item.label}:</span>{" "}
          {item.value}
        </span>
      ))}
    </div>
  );
}
