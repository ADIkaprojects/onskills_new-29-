"use client";

import { type FC, type ReactNode, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/* ─── Difficulty tokens (light theme) ─────────────────────── */
const DIFF_STYLE: Record<
  "Beginner" | "Intermediate" | "Advanced",
  { dot: string; label: string; bg: string }
> = {
  Beginner:     { dot: "#10B981", label: "#065F46", bg: "rgba(16,185,129,0.09)" },
  Intermediate: { dot: "#F59E0B", label: "#92400E", bg: "rgba(245,158,11,0.09)" },
  Advanced:     { dot: "#EF4444", label: "#991B1B", bg: "rgba(239,68,68,0.09)" },
};

interface AssessmentCardProps {
  title: string;
  techIcon: ReactNode;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  shortDescription: string;
  fullDescription: string;
  price: string;
}

const AssessmentCard: FC<AssessmentCardProps> = ({
  title,
  techIcon,
  difficulty,
  shortDescription,
  fullDescription,
  price,
}) => {
  const router = useRouter();
  const diff = DIFF_STYLE[difficulty];
  const difficultyText =
    difficulty === "Beginner" ? "#BFFFE5" : difficulty === "Intermediate" ? "#FDE68A" : "#FECACA";
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
  };
  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="group relative w-full max-w-[540px] cursor-pointer"
      style={{ transition: "transform 300ms cubic-bezier(0.4,0,0.2,1)" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Outer glow ring on hover ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-[1px] rounded-[22px] opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{
          background: "linear-gradient(135deg, #38BDF8 0%, #818CF8 50%, #38BDF8 100%)",
          zIndex: 0,
        }}
      />

      {/* ── Card surface ── */}
      <div
        className="relative flex min-h-[230px] w-full flex-col overflow-hidden rounded-[20px]"
        style={{
          background: "#214F7C",
          border: "1px solid rgba(147,197,253,0.34)",
          boxShadow: hovered
            ? "0 34px 70px rgba(15,23,42,0.20), 0 16px 36px rgba(37,99,235,0.13), 0 2px 0 rgba(255,255,255,0.9) inset"
            : "0 24px 52px rgba(15,23,42,0.16), 0 10px 24px rgba(37,99,235,0.10), 0 1px 0 rgba(255,255,255,0.9) inset",
          padding: "20px 22px",
          transition: "box-shadow 300ms cubic-bezier(0.4,0,0.2,1)",
          zIndex: 1,
        }}
      >

        {/* ── Effect 1: Diagonal stripes ── */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 rounded-[20px]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.045) 2px, rgba(255,255,255,0.045) 4px)",
            opacity: hovered ? 0.72 : 0.5,
            transition: "opacity 400ms ease",
          }}
        />

        {/* ── Effect 2: Indigo corner glow — both top corners ── */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 rounded-[20px]"
          style={{
            backgroundImage: `
              radial-gradient(circle 320px at 0% -30px, rgba(56,189,248,0.30), transparent),
              radial-gradient(circle 320px at 100% -30px, rgba(129,140,248,0.24), transparent)
            `,
            opacity: hovered ? 0.9 : 0.62,
            transition: "opacity 400ms ease",
          }}
        />

        {/* ── All content above bg layers ── */}
        <div className="relative z-10 flex flex-col" style={{ minHeight: "inherit" }}>

          {/* Top colour bar */}
          <div
            className="absolute inset-x-0 -top-5 h-[3px] rounded-t-[20px]"
            style={{ background: "linear-gradient(90deg, #38BDF8 0%, #818CF8 100%)" }}
          />

          {/* Icon + title + difficulty */}
          <div className="flex items-center gap-3">
            <div
              className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110"
              style={{
                background:
                  "linear-gradient(135deg, rgba(56,189,248,0.12) 0%, rgba(129,140,248,0.12) 100%)",
                border: "1.5px solid rgba(56,189,248,0.25)",
                color: "#0EA5E9",
              }}
            >
              {techIcon}
            </div>

            <div>
              <h4
                className="text-base font-semibold leading-snug"
                style={{ fontFamily: "Sora, sans-serif", color: "#F8FAFC" }}
              >
                {title}
              </h4>

              <span
                className="mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5"
                style={{
                  background: diff.bg,
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: difficultyText,
                  letterSpacing: "0.04em",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <span
                  className="inline-block h-[7px] w-[7px] rounded-full"
                  style={{ background: diff.dot }}
                />
                {difficulty}
              </span>
            </div>
          </div>

          {/* Short description */}
          <p
            className="mt-2.5 line-clamp-2 overflow-hidden text-[13px] leading-relaxed transition-all duration-[380ms] ease-out group-hover:max-h-0 group-hover:mt-0 group-hover:opacity-0"
            style={{
              fontFamily: "DM Sans, sans-serif",
              color: "rgba(248,250,252,0.78)",
              maxHeight: 48,
            }}
          >
            {shortDescription}
          </p>

          {/* Expanded content on hover */}
          <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-[420ms] ease-out group-hover:mt-2.5 group-hover:max-h-[200px] group-hover:opacity-100">
            <p
              className="text-[13px] leading-relaxed"
              style={{ fontFamily: "DM Sans, sans-serif", color: "rgba(248,250,252,0.82)" }}
            >
              {fullDescription}
            </p>

            <button
              className="mt-4 w-full rounded-xl py-2.5 text-sm font-semibold tracking-wide text-white transition-all duration-250 hover:brightness-110 active:scale-[0.98]"
              style={{
                fontFamily: "Sora, sans-serif",
                background: "linear-gradient(135deg, #38BDF8 0%, #818CF8 100%)",
                boxShadow: "0 4px 18px rgba(56,189,248,0.40)",
                border: "none",
              }}
              onClick={(e) => {
                e.stopPropagation();
                router.push("/auth");
              }}
            >
              Start Assessment →
            </button>
          </div>

          {/* Price + hint row */}
          <div className="mt-auto flex items-end justify-between transition-all duration-[380ms] ease-out group-hover:pointer-events-none group-hover:opacity-0">
            <div>
              <div
                className="text-[26px] font-bold"
                style={{
                  fontFamily: "Sora, sans-serif",
                  background: "linear-gradient(135deg, #0EA5E9, #6366F1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {price}
              </div>
              <div
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 10.5,
                  color: "rgba(226,232,240,0.66)",
                  marginTop: 1,
                }}
              >
                one-time
              </div>
            </div>

            <span
              className="flex items-center gap-1 rounded-xl px-2.5 py-1.5"
              style={{
                background: "rgba(56,189,248,0.07)",
                border: "1px solid rgba(191,219,254,0.34)",
                fontFamily: "DM Sans, sans-serif",
                fontSize: 11,
                color: "#E0F2FE",
                fontWeight: 600,
              }}
            >
              Details
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="#E0F2FE"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

        </div>

        {/* Shimmer sweep */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -skew-x-12 translate-x-full bg-gradient-to-r from-transparent via-sky-100/40 to-transparent transition-transform duration-[900ms] ease-in-out group-hover:translate-x-[-200%]"
          style={{ zIndex: 10 }}
        />
      </div>
    </div>
  );
};

export default AssessmentCard;
