"use client";

import { ReactNode, useState } from "react";

type ExpandableBlockProps = {
  title?: string;
  collapsedHeight?: number;
  defaultExpanded?: boolean;
  expandLabel?: string;
  collapseLabel?: string;
  children: ReactNode;
  className?: string;
};

export function ExpandableBlock({
  title,
  collapsedHeight = 0,
  defaultExpanded = false,
  expandLabel = "Show more",
  collapseLabel = "Show less",
  children,
  className = "",
}: ExpandableBlockProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const useMeasuredHeight = collapsedHeight > 0;

  return (
    <div className={className}>
      {title ? (
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-[var(--foreground)]">{title}</p>
          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            className="secondary-link text-sm font-semibold"
          >
            {expanded ? collapseLabel : expandLabel}
          </button>
        </div>
      ) : null}

      <div
        className={`relative overflow-hidden ${title ? "mt-3" : ""}`}
        style={
          expanded || !useMeasuredHeight ? undefined : { maxHeight: `${collapsedHeight}px` }
        }
      >
        {expanded || useMeasuredHeight ? children : null}
        {!expanded && useMeasuredHeight ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[var(--card)] to-transparent" />
        ) : null}
      </div>

      {!title ? (
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="secondary-link mt-3 text-sm font-semibold"
        >
          {expanded ? collapseLabel : expandLabel}
        </button>
      ) : null}
    </div>
  );
}
