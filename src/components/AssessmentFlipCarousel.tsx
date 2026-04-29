"use client";

import { memo, useEffect, useRef, useState } from "react";
import { ASSESSMENTS, type Assessment } from "@/data/assessments";

/* ── Difficulty color tokens (light theme) ─────────────────── */
const DIFF: Record<Assessment["difficulty"], { pill: string; dot: string; label: string }> = {
  Beginner:     { pill: "rgba(16,185,129,0.10)",  dot: "#10B981", label: "#065F46" },
  Intermediate: { pill: "rgba(245,158,11,0.10)",  dot: "#F59E0B", label: "#92400E" },
  Advanced:     { pill: "rgba(239,68,68,0.10)",   dot: "#EF4444", label: "#991B1B" },
};

/* ── Tiny SVG icons keyed by subject ──────────────────────── */
function AssessmentIcon({ name, accent }: { name: string; accent: string }) {
  const n = name.toLowerCase();
  let icon = (
    <path d="M12 3L22 8 12 13 2 8zM2 13l10 5 10-5M2 17l10 5 10-5"
      stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  );
  if (n.includes("javascript") || n.includes("react") || n.includes("ui")) {
    icon = <path d="M4 6l8-3 8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"
      stroke={accent} strokeWidth="1.8" fill="none" strokeLinejoin="round" />;
  } else if (n.includes("system") || n.includes("devops") || n.includes("cloud")) {
    icon = <><circle cx="12" cy="12" r="3" stroke={accent} strokeWidth="1.8" fill="none" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke={accent} strokeWidth="1.8" strokeLinecap="round" /></>;
  } else if (n.includes("python") || n.includes("data")) {
    icon = <><path d="M4 18V6a2 2 0 012-2h8l6 6v8a2 2 0 01-2 2H6a2 2 0 01-2-2z"
      stroke={accent} strokeWidth="1.8" fill="none" strokeLinejoin="round" />
      <path d="M14 4v6h6" stroke={accent} strokeWidth="1.8" fill="none" /></>;
  } else if (n.includes("node") || n.includes("backend")) {
    icon = <><rect x="3" y="4" width="18" height="6" rx="1.5" stroke={accent} strokeWidth="1.8" fill="none" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" stroke={accent} strokeWidth="1.8" fill="none" />
      <circle cx="7" cy="7" r="1" fill={accent} /><circle cx="7" cy="17" r="1" fill={accent} /></>;
  }
  return <svg width="22" height="22" viewBox="0 0 24 24">{icon}</svg>;
}

/* ── Single card ──────────────────────────────────────────── */
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
  useEffect(() => { setFlipped(false); }, [assessment.name]);

  const diff = DIFF[assessment.difficulty];

  // accent colour — sky-blue for most, a touch warmer for advanced
  const accent = assessment.difficulty === "Advanced" ? "#2563EB" : "#38BDF8";
  const accentBg = assessment.difficulty === "Advanced"
    ? "rgba(37,99,235,0.08)"
    : "rgba(56,189,248,0.08)";

  return (
    <div
      style={{
        perspective: 1200,
        transition: "transform 380ms cubic-bezier(0.4,0,0.2,1), opacity 380ms",
        transform: `translateX(${offset * 296}px) scale(${isCenter ? 1.04 : 0.93})`,
        opacity: isCenter ? 1 : 0.68,
        zIndex: isCenter ? 5 : 1,
      }}
      className="absolute left-1/2 top-0 -translate-x-1/2"
    >
      <div
        onClick={() => setFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        aria-label={`${assessment.name}. Click to flip.`}
        onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
        className="cursor-pointer"
        style={{
          width: 272,
          height: 340,
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 620ms cubic-bezier(0.4,0,0.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT ─────────────────────────────────── */}
        <div
          className="absolute inset-0 flex flex-col overflow-hidden"
          style={{
            background: "#fff",
            border: "1px solid rgba(148,163,184,0.25)",
            borderRadius: 20,
            boxShadow: isCenter
              ? "0 8px 40px rgba(56,189,248,0.18), 0 2px 8px rgba(15,23,42,0.06)"
              : "0 4px 20px rgba(15,23,42,0.06)",
            padding: "26px 22px 22px",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* Top colour bar */}
          <div
            className="absolute inset-x-0 top-0 h-[3px]"
            style={{
              background: `linear-gradient(90deg, ${accent}, #818CF8)`,
              borderRadius: "20px 20px 0 0",
            }}
          />

          {/* Icon + difficulty row */}
          <div className="flex items-center justify-between">
            <div
              className="flex h-[46px] w-[46px] items-center justify-center rounded-2xl"
              style={{ background: accentBg, border: `1.5px solid ${accent}22` }}
            >
              <AssessmentIcon name={assessment.name} accent={accent} />
            </div>

            {/* Difficulty pill */}
            <span
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
              style={{
                background: diff.pill,
                fontFamily: "DM Sans, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                color: diff.label,
                letterSpacing: "0.04em",
              }}
            >
              <span
                className="inline-block h-[7px] w-[7px] rounded-full"
                style={{ background: diff.dot }}
              />
              {assessment.difficulty}
            </span>
          </div>

          {/* Name */}
          <h3
            className="mt-4 leading-snug"
            style={{
              fontFamily: "Sora, sans-serif",
              fontWeight: 700,
              fontSize: 17,
              color: "#0F172A",
              letterSpacing: "-0.02em",
            }}
          >
            {assessment.name}
          </h3>

          {/* Tagline */}
          <p
            className="mt-1.5 line-clamp-2"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: 13,
              color: "#64748B",
              lineHeight: 1.55,
            }}
          >
            {assessment.tagline}
          </p>

          {/* Divider */}
          <div
            className="my-4"
            style={{ height: 1, background: "rgba(148,163,184,0.18)" }}
          />

          {/* Duration row */}
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#94A3B8" strokeWidth="1.8" />
              <path d="M12 7v5l3.5 2" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#94A3B8" }}>
              {assessment.duration}
            </span>
          </div>

          {/* Price + hint */}
          <div className="mt-auto flex items-end justify-between pt-4">
            <div>
              <div
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontWeight: 800,
                  fontSize: 26,
                  color: "#0F172A",
                  letterSpacing: "-0.03em",
                }}
              >
                {assessment.price}
              </div>
              <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 10.5, color: "#CBD5E1", marginTop: 1 }}>
                one-time
              </div>
            </div>
            <span
              className="flex items-center gap-1 rounded-xl px-2.5 py-1.5"
              style={{
                background: "rgba(56,189,248,0.07)",
                border: "1px solid rgba(56,189,248,0.2)",
                fontFamily: "DM Sans, sans-serif",
                fontSize: 11,
                color: "#38BDF8",
                fontWeight: 600,
              }}
            >
              Details
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>

        {/* ── BACK ──────────────────────────────────── */}
        <div
          className="absolute inset-0 flex flex-col overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #F0F9FF 0%, #E0F2FE 55%, #EEF2FF 100%)",
            border: "1px solid rgba(56,189,248,0.28)",
            borderRadius: 20,
            padding: "26px 22px 22px",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow: "0 8px 40px rgba(56,189,248,0.18), 0 2px 8px rgba(15,23,42,0.06)",
          }}
        >
          {/* Top colour bar */}
          <div
            className="absolute inset-x-0 top-0 h-[3px]"
            style={{
              background: `linear-gradient(90deg, ${accent}, #818CF8)`,
              borderRadius: "20px 20px 0 0",
            }}
          />

          {/* Label */}
          <div className="flex items-center justify-between">
            <span
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#94A3B8",
              }}
            >
              What you'll prove
            </span>
            <svg width="32" height="32" viewBox="0 0 36 40" style={{ filter: "drop-shadow(0 2px 6px rgba(56,189,248,0.5))" }}>
              <polygon points="18,2 34,11 34,29 18,38 2,29 2,11" fill="none" stroke={accent} strokeWidth="1.8" />
              <path d="M13 20l4 4 8-9" stroke={accent} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Proves list */}
          <ul className="mt-3 space-y-2">
            {assessment.proves.map((p) => (
              <li
                key={p}
                className="flex items-start gap-2"
                style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12.5, color: "#1E293B", lineHeight: 1.45 }}
              >
                <span
                  className="mt-[3px] flex h-[14px] w-[14px] flex-shrink-0 items-center justify-center rounded-full"
                  style={{ background: `${accent}1A`, border: `1px solid ${accent}44` }}
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4l2 2 3-3" stroke={accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {p}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            className="mt-auto w-full rounded-xl py-2.5 text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
            style={{
              fontFamily: "Sora, sans-serif",
              background: `linear-gradient(135deg, ${accent}, #818CF8)`,
              boxShadow: `0 4px 18px ${accent}44`,
              border: "none",
              marginTop: 16,
            }}
          >
            Start Assessment →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Carousel wrapper + dual-layer background ─────────────── */
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
    return () => { if (intervalRef.current) window.clearInterval(intervalRef.current); };
  }, [paused, total]);

  const prev = () => setCenter((c) => (c - 1 + total) % total);
  const next = () => setCenter((c) => (c + 1) % total);

  return (
    <section
      className="relative overflow-hidden"
      style={{ padding: "100px max(5vw, 24px) 120px" }}
    >
      {/* ── Layer 1: Radial gradient from bottom (white → slate) ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 90%, #fff 40%, #475569 100%)",
        }}
      />

      {/* ── Layer 2: Bottom-fade dot grid ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: "20px 30px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-[1200px]">

        {/* Header */}
        <div className="text-center">
          <div
            style={{
              display: "inline-block",
              background: "rgba(56,189,248,0.10)",
              border: "1px solid rgba(56,189,248,0.30)",
              borderRadius: 999,
              padding: "5px 18px",
              fontFamily: "DM Sans, sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "3px",
              textTransform: "uppercase" as const,
              color: "#0EA5E9",
              marginBottom: 20,
            }}
          >
            Assessments
          </div>
          <h2
            style={{
              fontFamily: "Sora, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(30px, 4.5vw, 48px)",
              color: "#0F172A",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Choose Your Proving Ground
          </h2>
          <p
            className="mx-auto mt-4 max-w-[520px]"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: 16,
              color: "#64748B",
              lineHeight: 1.7,
            }}
          >
            Each assessment is a real challenge. Earn a verified badge when you pass.
          </p>
        </div>

        {/* Cards stage */}
        <div
          className="relative mx-auto mt-14"
          style={{ maxWidth: 980, height: 368 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Prev arrow */}
          <button
            aria-label="Previous assessment"
            onClick={prev}
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 transition-all duration-200 hover:scale-110"
            style={{
              width: 40, height: 40, borderRadius: 999,
              background: "#fff",
              border: "1px solid rgba(148,163,184,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 12px rgba(15,23,42,0.08)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 6l-6 6 6 6" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            aria-label="Next assessment"
            onClick={next}
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 transition-all duration-200 hover:scale-110"
            style={{
              width: 40, height: 40, borderRadius: 999,
              background: "#fff",
              border: "1px solid rgba(148,163,184,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 12px rgba(15,23,42,0.08)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Cards */}
          <div className="relative h-full w-full">
            {ASSESSMENTS.map((a, i) => {
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

        {/* Pagination dots */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {ASSESSMENTS.map((_, i) => {
            const active = i === center;
            return (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setCenter(i)}
                className="transition-all duration-250"
                style={{
                  width: active ? 26 : 7,
                  height: 7,
                  borderRadius: 999,
                  background: active
                    ? "linear-gradient(90deg, #38BDF8, #818CF8)"
                    : "rgba(148,163,184,0.35)",
                  border: "none",
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
});
