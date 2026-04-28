"use client";

import { memo, useEffect, useRef, useState } from "react";
import { ASSESSMENTS, type Assessment } from "@/data/assessments";

const DIFFICULTY_STYLE: Record<Assessment["difficulty"], { bg: string; fg: string }> = {
  Beginner: { bg: "#DBEAFE", fg: "#1D6EF5" },
  Intermediate: { bg: "#FEF3C7", fg: "#D97706" },
  Advanced: { bg: "#FEE2E2", fg: "#DC2626" },
};

function IconForAssessment({ name }: { name: string }) {
  // Choose an inline SVG glyph based on assessment name keyword
  const n = name.toLowerCase();
  let path = (
    <path d="M4 7l8-4 8 4M4 7v10l8 4 8-4V7M4 7l8 4 8-4M12 11v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  );
  if (n.includes("javascript") || n.includes("react") || n.includes("ui")) {
    path = <path d="M4 6l8-3 8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" />;
  } else if (n.includes("system") || n.includes("devops") || n.includes("cloud")) {
    path = <><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>;
  } else if (n.includes("python") || n.includes("data")) {
    path = <><path d="M4 18V6a2 2 0 012-2h8l6 6v8a2 2 0 01-2 2H6a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" /><path d="M14 4v6h6" stroke="currentColor" strokeWidth="2" fill="none" /></>;
  } else if (n.includes("node") || n.includes("backend")) {
    path = <><rect x="3" y="4" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="2" fill="none" /><rect x="3" y="14" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="2" fill="none" /><circle cx="7" cy="7" r="1" fill="currentColor" /><circle cx="7" cy="17" r="1" fill="currentColor" /></>;
  }
  return (
    <svg width="26" height="26" viewBox="0 0 24 24">
      {path}
    </svg>
  );
}

function FlipCard({
  assessment,
  isCenter,
  offset,
}: {
  assessment: Assessment;
  isCenter: boolean;
  offset: number;
}) {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => {
    setFlipped(false);
  }, [assessment.name]);

  const diff = DIFFICULTY_STYLE[assessment.difficulty];

  return (
    <div
      style={{
        perspective: 1200,
        transition: "transform 350ms cubic-bezier(0.4,0,0.2,1), opacity 350ms",
        transform: `translateX(${offset * 290}px) scale(${isCenter ? 1.06 : 0.94})`,
        opacity: isCenter ? 1 : 0.75,
        zIndex: isCenter ? 5 : 1,
      }}
      className="absolute left-1/2 top-0 -translate-x-1/2"
    >
      <div
        onClick={() => setFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        aria-label={`${assessment.name} card. Click to flip.`}
        className="cursor-pointer"
        style={{
          width: 268,
          height: 348,
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 600ms cubic-bezier(0.4,0,0.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 flex flex-col"
          style={{
            background: "var(--color-white)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-card)",
            padding: "28px 24px",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            overflow: "hidden",
          }}
        >
          <div
            className="absolute inset-x-0 top-0 h-1"
            style={{ background: "linear-gradient(90deg, var(--color-accent), #60A5FA)" }}
          />
          <div
            className="flex h-[52px] w-[52px] items-center justify-center rounded-full"
            style={{ background: "var(--color-accent-light)", color: "var(--color-accent)" }}
          >
            <IconForAssessment name={assessment.name} />
          </div>
          <div className="mt-4 flex items-center justify-between gap-2">
            <h3
              style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 18, color: "var(--color-navy)", lineHeight: 1.25 }}
            >
              {assessment.name}
            </h3>
          </div>
          <span
            className="mt-2 inline-flex w-fit"
            style={{
              background: diff.bg,
              color: diff.fg,
              fontFamily: "DM Sans, sans-serif",
              fontSize: 11,
              fontWeight: 600,
              padding: "4px 10px",
              borderRadius: "var(--radius-full)",
            }}
          >
            {assessment.difficulty}
          </span>
          <p
            className="mt-2.5 line-clamp-2"
            style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "var(--color-gray-text)", lineHeight: 1.5 }}
          >
            {assessment.tagline}
          </p>
          <div className="mt-auto flex items-end justify-between">
            <div
              style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 26, color: "var(--color-accent)" }}
            >
              {assessment.price}
            </div>
            <span
              style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, fontStyle: "italic", color: "var(--color-gray-light)" }}
            >
              Tap to see details
            </span>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 flex flex-col"
          style={{
            background: "var(--color-navy)",
            color: "#fff",
            borderRadius: "var(--radius-lg)",
            padding: "28px 24px",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex items-start justify-between">
            <div
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: 11,
                color: "rgba(255,255,255,0.6)",
                textTransform: "uppercase",
                letterSpacing: 1.5,
              }}
            >
              What you'll prove
            </div>
            <svg width="36" height="40" viewBox="0 0 36 40" style={{ filter: "drop-shadow(0 4px 10px rgba(29,110,245,0.6))" }}>
              <polygon
                points="18,2 34,11 34,29 18,38 2,29 2,11"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="2"
              />
              <path d="M13 20l4 4 8-9" stroke="var(--color-accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <ul className="mt-3 space-y-2">
            {assessment.proves.map((p) => (
              <li
                key={p}
                className="flex items-start gap-2"
                style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13.5, color: "rgba(255,255,255,0.92)" }}
              >
                <span style={{ color: "var(--color-accent)" }}>✓</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>

          <span
            className="mt-3 inline-flex w-fit items-center gap-1.5"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "var(--radius-full)",
              padding: "4px 12px",
              fontFamily: "DM Sans, sans-serif",
              fontSize: 11.5,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            ⏱ {assessment.duration}
          </span>

          <button
            className="mt-auto w-full transition-all duration-[250ms]"
            style={{
              background: "var(--color-accent)",
              color: "#fff",
              borderRadius: "var(--radius-md)",
              padding: "11px 16px",
              fontFamily: "Sora, sans-serif",
              fontWeight: 600,
              fontSize: 14,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-accent-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-accent)")}
          >
            Buy Assessment
          </button>
        </div>
      </div>
    </div>
  );
}

export const AssessmentFlipCarousel = memo(function AssessmentFlipCarousel() {
  const [center, setCenter] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = ASSESSMENTS.length;
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = window.setInterval(() => {
      setCenter((c) => (c + 1) % total);
    }, 3500);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [paused, total]);

  const prev = () => setCenter((c) => (c - 1 + total) % total);
  const next = () => setCenter((c) => (c + 1) % total);

  return (
    <section className="px-6" style={{ padding: "100px max(5vw, 24px)" }}>
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center">
          <div
            style={{
              fontFamily: "DM Sans, sans-serif",
              color: "var(--color-accent)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Assessments
          </div>
          <h2
            className="mt-3"
            style={{
              fontFamily: "Sora, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px, 4.5vw, 48px)",
              color: "var(--color-navy)",
              lineHeight: 1.1,
            }}
          >
            Choose Your Proving Ground
          </h2>
          <p
            className="mx-auto mt-4 max-w-[560px]"
            style={{ fontFamily: "DM Sans, sans-serif", fontSize: 17, color: "var(--color-gray-text)" }}
          >
            Each assessment is a real challenge. Earn a verified badge when you pass.
          </p>
        </div>

        <div
          className="relative mx-auto mt-14"
          style={{ maxWidth: 980, height: 380 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* arrows */}
          <button
            aria-label="Previous"
            onClick={prev}
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 transition-colors"
            style={{
              width: 44, height: 44, borderRadius: 999,
              background: "var(--color-white)",
              border: "1px solid var(--color-border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(10,22,40,0.06)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-accent-light)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-white)")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 6l-6 6 6 6" stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            aria-label="Next"
            onClick={next}
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 transition-colors"
            style={{
              width: 44, height: 44, borderRadius: 999,
              background: "var(--color-white)",
              border: "1px solid var(--color-border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(10,22,40,0.06)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-accent-light)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-white)")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="relative h-full w-full">
            {ASSESSMENTS.map((a, i) => {
              // compute shortest signed offset
              let offset = i - center;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;
              if (Math.abs(offset) > 1) return null;
              return (
                <FlipCard
                  key={a.name}
                  assessment={a}
                  isCenter={offset === 0}
                  offset={offset}
                />
              );
            })}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {ASSESSMENTS.map((_, i) => {
            const active = i === center;
            return (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setCenter(i)}
                className="transition-all duration-[250ms]"
                style={{
                  width: active ? 28 : 8,
                  height: 8,
                  borderRadius: 999,
                  background: active ? "var(--color-accent)" : "var(--color-border)",
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
});
