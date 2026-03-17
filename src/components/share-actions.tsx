"use client";

import { useEffect, useRef, useState } from "react";
import { siteMetadata } from "@/lib/metadata";

type ShareActionsProps = {
  title: string;
  text: string;
  hint: string;
};

export function ShareActions({ title, text, hint }: ShareActionsProps) {
  const [status, setStatus] = useState<string | null>(null);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== undefined) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function getUrl() {
    if (typeof window !== "undefined") {
      return window.location.href;
    }

    return siteMetadata.url;
  }

  function setTemporaryStatus(message: string) {
    setStatus(message);

    if (timeoutRef.current !== undefined) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setStatus(null);
      timeoutRef.current = undefined;
    }, 2400);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(getUrl());
      setTemporaryStatus("Link copied.");
    } catch {
      setTemporaryStatus("Copy failed.");
    }
  }

  async function handleShare() {
    if (!navigator.share) {
      setTemporaryStatus("Share is not available here.");
      return;
    }

    try {
      await navigator.share({
        title,
        text,
        url: getUrl(),
      });
      setTemporaryStatus("Share sheet opened.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      setTemporaryStatus("Share failed.");
    }
  }

  return (
    <div className="card p-5 md:p-6">
      <p className="eyebrow">Share</p>
      <div className="mt-4 grid gap-3 sm:flex sm:flex-wrap">
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white"
        >
          Copy link
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="rounded-full border border-[var(--line)] bg-[var(--card)] px-5 py-3 text-sm font-semibold"
        >
          Share
        </button>
      </div>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
        {status ?? hint}
      </p>
    </div>
  );
}
