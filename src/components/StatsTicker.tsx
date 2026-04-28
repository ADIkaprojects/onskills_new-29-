"use client";

import { memo } from "react";
import { STATS_DATA } from "@/data/stats";

function StatPill({ text }: { text: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 whitespace-nowrap"
      style={{
        padding: "7px 22px",
        margin: "0 6px",
        background: "var(--color-white)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-full)",
        fontFamily: "DM Sans, sans-serif",
        fontSize: 13.5,
        color: "var(--color-navy)",
        boxShadow: "0 2px 8px rgba(10,22,40,0.05)",
      }}
    >
      <span
        style={{ width: 6, height: 6, borderRadius: 999, background: "var(--color-accent)" }}
      />
      {text}
    </span>
  );
}

export const StatsTicker = memo(function StatsTicker() {
  const items = [...STATS_DATA, ...STATS_DATA];
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        background: "var(--color-white)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        padding: "14px 0",
      }}
      onMouseEnter={(e) => {
        const inner = e.currentTarget.querySelector<HTMLDivElement>(".ticker-inner");
        if (inner) inner.style.animationPlayState = "paused";
      }}
      onMouseLeave={(e) => {
        const inner = e.currentTarget.querySelector<HTMLDivElement>(".ticker-inner");
        if (inner) inner.style.animationPlayState = "running";
      }}
    >
      <div
        className="ticker-inner flex w-max"
        style={{ animation: "ticker 45s linear infinite" }}
      >
        {items.map((s, i) => (
          <StatPill key={i} text={s.text} />
        ))}
      </div>
    </div>
  );
});
