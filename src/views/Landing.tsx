"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { StatsTicker } from "@/components/StatsTicker";
import { ASSESSMENTS, type Assessment } from "@/data/assessments";
import { WalkWaysRoadmap } from "@/components/WalkWaysRoadmap";
import AssessmentCard from "@/components/ui/assessment-card";
import { FAQSection } from "@/components/ui/faq-section";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  Clock3,
  FileCheck2,
  Gauge,
  Menu,
  Target,
  Trophy,
} from "lucide-react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Observer, useGSAP);
}

/* ---------------- HERO ---------------- */
function Hero() {
  const router = useRouter();
  const { word, visible } = useTypewriter(["Certify", "Shape", "Define", "Upgrade"], 2200);

  return (
    <section
      className="relative flex justify-center overflow-hidden"
      style={{
        minHeight: "calc(100dvh - 68px)",
        alignItems: "flex-start",
        padding: "clamp(84px, 10vw, 112px) 24px clamp(28px, 5vw, 44px)",
        background:
          "linear-gradient(180deg, #f7fbff 0%, #f3f8ff 46%, #f8faff 100%)",
      }}
    >
      {/* ── Keyframes for orb animations ── */}
      <style>{`
        @keyframes orb-drift-a {
          0%   { transform: translate(0px,   0px)   scale(1.00); }
          20%  { transform: translate(38px, -44px)  scale(1.06); }
          45%  { transform: translate(18px,  28px)  scale(0.96); }
          70%  { transform: translate(-32px, 14px)  scale(1.04); }
          100% { transform: translate(0px,   0px)   scale(1.00); }
        }
        @keyframes orb-drift-b {
          0%   { transform: translate(0px,   0px)  scale(1.00); }
          25%  { transform: translate(-48px, 36px) scale(1.08); }
          55%  { transform: translate(28px, -22px) scale(0.93); }
          80%  { transform: translate(12px,  40px) scale(1.05); }
          100% { transform: translate(0px,   0px)  scale(1.00); }
        }
        @keyframes orb-drift-c {
          0%   { transform: translate(0px,  0px)   scale(1.00); opacity: 0.32; }
          30%  { transform: translate(24px, -18px) scale(1.10); opacity: 0.44; }
          60%  { transform: translate(-16px, 26px) scale(0.94); opacity: 0.28; }
          100% { transform: translate(0px,  0px)   scale(1.00); opacity: 0.32; }
        }
        @keyframes orb-drift-d {
          0%   { transform: translate(0px,   0px)   scale(1.00); }
          35%  { transform: translate(-20px, -30px) scale(1.12); }
          65%  { transform: translate(34px,  18px)  scale(0.90); }
          100% { transform: translate(0px,   0px)   scale(1.00); }
        }
        @keyframes orb-shimmer {
          0%,100% { opacity: 0.10; transform: scale(1.00); }
          50%      { opacity: 0.20; transform: scale(1.08); }
        }
        @keyframes hiring-marquee {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>

      {/* ── Diagonal-fade grid — radiates from top-right corner ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #c7d2e8 1px, transparent 1px),
            linear-gradient(to bottom, #c7d2e8 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 40%, transparent 88%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 40%, transparent 88%)",
          zIndex: 0,
        }}
      />

      {/* ── Static diagonal line texture (lighter than animated paths) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(24deg, rgba(59,130,246,0.20) 0px, rgba(59,130,246,0.20) 2px, rgba(59,130,246,0) 2px, rgba(59,130,246,0) 14px)",
          backgroundPosition: "center -40px",
          filter: "blur(0.6px)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.85) 36%, rgba(0,0,0,0.35) 72%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.85) 36%, rgba(0,0,0,0.35) 72%, rgba(0,0,0,0) 100%)",
          opacity: 0.55,
          zIndex: 0,
        }}
      />

      {/* ── Orb system — 5 layered, smooth, mix-blended ── */}

      {/* Orb A: large primary blue — top-left anchor */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          width: 560, height: 560,
          top: -140, left: -120,
          background: "radial-gradient(circle at 40% 40%, #3b82f6 0%, #2563eb 35%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.13,
          borderRadius: "50%",
          animation: "orb-drift-a 22s cubic-bezier(0.45,0,0.55,1) infinite",
          mixBlendMode: "multiply",
          zIndex: 1,
        }}
      />

      {/* Orb B: cool sky-blue — top-right, mirrors orb A */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          width: 420, height: 420,
          top: -80, right: -80,
          background: "radial-gradient(circle at 60% 35%, #93c5fd 0%, #60a5fa 40%, transparent 72%)",
          filter: "blur(72px)",
          opacity: 0.18,
          borderRadius: "50%",
          animation: "orb-drift-b 28s cubic-bezier(0.45,0,0.55,1) infinite",
          animationDelay: "-8s",
          mixBlendMode: "multiply",
          zIndex: 1,
        }}
      />

      {/* Orb C: wide diffuse indigo wash — bottom center, horizon glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          width: 680, height: 260,
          bottom: -80, left: "calc(50% - 340px)",
          background: "radial-gradient(ellipse at 50% 80%, #bfdbfe 0%, #93c5fd 30%, transparent 70%)",
          filter: "blur(96px)",
          opacity: 0.32,
          borderRadius: "50%",
          animation: "orb-drift-c 26s cubic-bezier(0.45,0,0.55,1) infinite",
          animationDelay: "-4s",
          mixBlendMode: "multiply",
          zIndex: 1,
        }}
      />

      {/* Orb D: tight accent punch — center-right, adds depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          width: 280, height: 280,
          top: "30%", right: "12%",
          background: "radial-gradient(circle at 50% 50%, #2563eb 0%, #1d4ed8 50%, transparent 75%)",
          filter: "blur(64px)",
          opacity: 0.09,
          borderRadius: "50%",
          animation: "orb-drift-d 19s cubic-bezier(0.45,0,0.55,1) infinite",
          animationDelay: "-11s",
          mixBlendMode: "multiply",
          zIndex: 1,
        }}
      />

      {/* Orb E: subtle shimmer — center, ties everything together */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          width: 500, height: 300,
          top: "20%", left: "calc(50% - 250px)",
          background: "radial-gradient(ellipse at 50% 50%, #dbeafe 0%, transparent 65%)",
          filter: "blur(110px)",
          opacity: 0.15,
          borderRadius: "50%",
          animation: "orb-shimmer 14s ease-in-out infinite",
          animationDelay: "-5s",
          mixBlendMode: "multiply",
          zIndex: 1,
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-[960px] flex-col items-center text-center">
        <div
          className="inline-flex items-center gap-2"
          style={{
            background: "var(--color-white)",
            border: "1px solid var(--color-border)",
            borderRadius: 999,
            padding: "7px 16px",
            boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            color: "var(--color-navy)",
            opacity: 0,
            animation: "fadeUp 0.6s cubic-bezier(0.4,0,0.2,1) 0.1s forwards",
          }}
        >
          Certification Prep done Right
        </div>

        <h1
          className="mt-7"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(34px, 7.5vw, 96px)",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            color: "var(--color-navy)",
            opacity: 0,
            animation: "fadeUp 0.6s cubic-bezier(0.4,0,0.2,1) 0.2s forwards",
          }}
        >
          <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            <span style={{ color: "var(--color-accent)" }}>
              <span
                style={{
                  display: "inline-block",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(8px)",
                  transition: "opacity 250ms cubic-bezier(0.4,0,0.2,1), transform 250ms cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                {word}
              </span>
              <span
                aria-hidden
                style={{
                  display: "inline-block",
                  width: 3,
                  height: "0.85em",
                  marginLeft: 6,
                  background: "var(--color-accent)",
                  verticalAlign: "middle",
                  animation: "blink 0.85s step-end infinite",
                }}
              />
            </span>
            {" "}
            Your Future.
          </span>{" "}
        </h1>

        <p
          className="mx-auto mt-6 max-w-[560px]"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 17,
            color: "var(--color-gray-text)",
            lineHeight: 1.55,
            opacity: 0,
            animation: "fadeUp 0.6s cubic-bezier(0.4,0,0.2,1) 0.4s forwards",
          }}
        >
          Real exam-pattern mock tests and assessments built for every stage whether you're just starting out 
or pushing for your next big credential. Practice like it's real, perform when it counts.
        </p>

        <button
          onClick={() => router.push("/auth")}
          className="mt-10 transition-all duration-[250ms]"
          style={{
            background: "var(--color-accent)",
            color: "#fff",
            border: "none",
            borderRadius: "var(--radius-md)",
            padding: "16px 40px",
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: 16,
            boxShadow: "0 4px 20px rgba(37,99,235,0.30)",
            opacity: 0,
            animation: "fadeUp 0.6s cubic-bezier(0.4,0,0.2,1) 0.55s forwards",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--color-accent-hover)";
            e.currentTarget.style.transform = "scale(1.03) translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 12px 32px rgba(37,99,235,0.40)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--color-accent)";
            e.currentTarget.style.transform = "scale(1) translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,99,235,0.30)";
          }}
        >
          Let's Explore →
        </button>

        {/* Trusted By Logos — FIXED */}
        <div
          className="mt-10 flex w-full flex-col items-center gap-5"
          style={{
            opacity: 0,
            animation: "fadeUp 0.6s cubic-bezier(0.4,0,0.2,1) 0.7s forwards",
          }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12.5px",
              color: "var(--color-gray-text)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              opacity: 0.78,
            }}
          >
            Our hiring partners
          </p>
          <div
            className="relative w-full max-w-[900px] overflow-hidden"
            style={{
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 13%, #000 87%, transparent 100%)",
              maskImage: "linear-gradient(to right, transparent 0%, #000 13%, #000 87%, transparent 100%)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20"
              style={{
                background: "linear-gradient(to right, rgba(247,251,255,0.98), rgba(247,251,255,0))",
                backdropFilter: "blur(2px)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20"
              style={{
                background: "linear-gradient(to left, rgba(247,251,255,0.98), rgba(247,251,255,0))",
                backdropFilter: "blur(2px)",
              }}
            />
            <div className="flex w-max items-center gap-14 py-2" style={{ animation: "hiring-marquee 22s linear infinite" }}>
              {[0, 1].flatMap((loop) =>
                [
                  { name: "blinkit", kind: "blinkit" },
                  { name: "zepto", kind: "zepto" },
                  { name: "Fractal", kind: "fractal" },
                  { name: "boAt", kind: "boat" },
                  { name: "Deloitte", kind: "deloitte" },
                  { name: "dentsu", kind: "dentsu" },
                ].map((company) => (
                  <div
                    key={`${company.name}-${loop}`}
                    className="flex h-16 min-w-[124px] shrink-0 items-center justify-center"
                    title={company.name}
                    style={{ opacity: 0.9, filter: "saturate(0.98)" }}
                  >
                    {company.kind === "blinkit" && (
                      <span style={{ display: "inline-grid", placeItems: "center", width: 62, height: 38, borderRadius: 12, background: "#F8D84A", color: "#111827", fontSize: 15, fontWeight: 900, letterSpacing: -0.5 }}>
                        blinkit
                      </span>
                    )}
                    {company.kind === "zepto" && (
                      <span style={{ color: "#F2385A", fontSize: 42, fontWeight: 900, letterSpacing: -1.5 }}>
                        zepto
                      </span>
                    )}
                    {company.kind === "fractal" && (
                      <span className="flex items-center gap-2" style={{ color: "#244D2E", fontSize: 23, fontWeight: 800 }}>
                        <span style={{ width: 28, height: 34, borderRadius: 6, background: "linear-gradient(135deg, #D9822B, #5DAA47)", transform: "skew(-12deg)" }} />
                        Fractal
                      </span>
                    )}
                    {company.kind === "boat" && (
                      <span style={{ color: "#111827", fontSize: 44, fontWeight: 400, letterSpacing: -2 }}>
                        bo<span style={{ color: "#E11D2E", fontWeight: 900 }}>A</span>t
                      </span>
                    )}
                    {company.kind === "deloitte" && (
                      <span style={{ color: "#050505", fontSize: 40, fontWeight: 900, letterSpacing: -1.5 }}>
                        Deloitte<span style={{ color: "#86BC25" }}>.</span>
                      </span>
                    )}
                    {company.kind === "dentsu" && (
                      <span style={{ color: "#8C8F96", fontSize: 44, fontWeight: 900, letterSpacing: -1.2 }}>
                        dentsu
                      </span>
                    )}
                  </div>
                )),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Assessment stack helpers ──────────────────────────────────────────── */

const CARD_HEIGHT = 460; // px — height of each stacking card

const FAQS = [
  {
    id: 1,
    question: "What exactly is OnSKILL and who is it for?",
    answer:
      "OnSKILL is a skill-verification platform for tech professionals. Whether you are a self-taught developer, a bootcamp graduate, or a seasoned engineer, OnSKILL gives you timed assessments, verified badges, and a ranked profile that employers can trust - no resume embellishment required.",
  },
  {
    id: 2,
    question: "How are assessments different from regular online quizzes?",
    answer:
      "Assessments on OnSKILL are timed, proctored, and scored by a combination of AI evaluation and peer review. Each result maps to a percentile ranking and issues a cryptographically signed badge - not just a certificate image anyone can fake.",
  },
  {
    id: 3,
    question: "What tracks and technologies are currently available?",
    answer:
      "We currently offer six tracks: Frontend, Backend, System Design, DevOps, Data & Algorithms, and AI & ML. Each track contains multiple assessments from beginner to advanced, with new modules added every sprint.",
  },
  {
    id: 4,
    question: "Is the free tier actually useful, or just a teaser?",
    answer:
      "The free tier gives you full access to beginner-level assessments in every track, your public skill profile, one verified badge, and the global leaderboard. Paid plans unlock advanced assessments, mock interviews via Xone, and priority badge processing.",
  },
  {
    id: 5,
    question: "How does the global ranking work?",
    answer:
      "Your rank is calculated from a weighted skill score across all completed assessments - time taken, accuracy, and difficulty all factor in. Rankings update in real time after every submission, so improving your score immediately moves you up the leaderboard.",
  },
  {
    id: 6,
    question: "Can I use my OnSKILL badges on LinkedIn or my resume?",
    answer:
      "Yes. Every badge comes with a shareable URL, an Open Badges 2.0 compliant JSON file, and a LinkedIn 'Add to Profile' direct link. Recruiters can click through to verify authenticity on our public badge registry at any time.",
  },
];

/* Tech-specific icons — each is a compact, recognisable representation of
   the technology, not a generic glyph. Rendered at 22×22 inside a 44px pill. */
function AssessmentIcon({ name }: { name: string }) {
  const n = name.toLowerCase();

  /* JavaScript — classic yellow "JS" square badge */
  if (n.includes("javascript")) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#F7DF1E"/>
        <text x="5" y="17" fontFamily="monospace" fontSize="9" fontWeight="800" fill="#222">JS</text>
      </svg>
    );
  }

  /* React — electron orbit rings around a nucleus */
  if (n.includes("react")) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none"
          transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none"
          transform="rotate(120 12 12)"/>
      </svg>
    );
  }

  /* System Design — stacked layers (architecture) */
  if (n.includes("system")) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L22 8 12 13 2 8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
        <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M2 16l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      </svg>
    );
  }

  /* Python — two interlinked snake-body hexagons (Python logo spirit) */
  if (n.includes("python")) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C8 2 7 4 7 6v2h5v1H6C4 9 2 10 2 13s2 4 4 4h2v-2.5C8 13 9 12 12 12h4c2 0 3-1 3-3V6c0-2-1-4-4-4h-3z"
          fill="currentColor" opacity="0.8"/>
        <circle cx="9.5" cy="5.5" r="1" fill="#fff"/>
        <path d="M12 22c4 0 5-2 5-4v-2h-5v-1h6c2 0 4-1 4-4s-2-4-4-4h-2v2.5C16 11 15 12 12 12H8c-2 0-3 1-3 3v3c0 2 1 4 4 4h3z"
          fill="currentColor" opacity="0.55"/>
        <circle cx="14.5" cy="18.5" r="1" fill="#fff"/>
      </svg>
    );
  }

  /* DevOps — infinity loop (CI/CD symbol) */
  if (n.includes("devops")) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 12c-2-2.5-4-4-6-4a4 4 0 000 8c2 0 4-1.5 6-4z"
          stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M12 12c2 2.5 4 4 6 4a4 4 0 000-8c-2 0-4 1.5-6 4z"
          stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Arrow heads */}
        <path d="M7 5.5l1.5 2.5-2.5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M17 18.5l-1.5-2.5 2.5-.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    );
  }

  /* UI/UX — pen nib (Figma/design tool spirit) */
  if (n.includes("ui") || n.includes("ux")) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 19l-7-7 3-3 4 4 7-9 3 2z"
          stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
        <circle cx="12" cy="19" r="1.5" fill="currentColor"/>
        <path d="M5 12V5h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      </svg>
    );
  }

  /* Node.js — hexagon (Node's logo is a hexagon) with a small dot inside */
  if (n.includes("node") || n.includes("backend")) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l9 5v10l-9 5-9-5V7z"
          stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
        <path d="M12 7v5l4 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      </svg>
    );
  }

  /* Cloud / AWS — cloud outline with lightning bolt */
  if (n.includes("cloud") || n.includes("aws")) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M18 10a6 6 0 00-11.5-2A4 4 0 105 16h13a4 4 0 000-8v2z"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M13 12l-2 3h3l-2 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    );
  }

  /* Fallback — stacked blocks (generic "skill") */
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
    </svg>
  );
}

function AssessmentStackCard({ assessment }: { assessment: Assessment }) {
  const proves = assessment.proves.slice(0, 4).join(", ");
  const fullDescription = `Complete a ${assessment.duration.toLowerCase()} challenge covering ${proves}.`;

  return (
    <div style={{ width: "100%", height: CARD_HEIGHT }}>
      <AssessmentCard
        title={assessment.name}
        techIcon={<AssessmentIcon name={assessment.name} />}
        difficulty={assessment.difficulty}
        shortDescription={assessment.tagline}
        fullDescription={fullDescription}
        price={assessment.price}
      />
    </div>
  );
}

/* ---------------- PRODUCT SECTION ---------------- */

function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block"
      style={{
        background: "var(--color-navy)",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 2.5,
        textTransform: "uppercase",
        borderRadius: 999,
        padding: "7px 18px",
      }}
    >
      {children}
    </span>
  );
}

function ProductSection({
  id,
  tag,
  heading,
  body,
  features,
  cta,
  onCta,
  mockup,
  reverse,
  hideMockupOnMobile,
  rawMockup,
  showMockupOnMobile,
  showMockupFromMd,
  shiftMockupLeft,
}: {
  id: string;
  tag: string;
  heading: React.ReactNode;
  body: string;
  features: string[];
  cta: string;
  onCta: () => void;
  mockup?: React.ReactNode;
  reverse?: boolean;
  hideMockupOnMobile?: boolean;
  /** Strip the navy card shell — lets the mockup own its own visual (e.g. video) */
  rawMockup?: boolean;
  /** Show the mockup on mobile screens too (below the text) */
  showMockupOnMobile?: boolean;
  /** Show selected product mockups from tablet/desktop widths while keeping phones text-only. */
  showMockupFromMd?: boolean;
  /** Nudge the mockup left without changing its size. */
  shiftMockupLeft?: boolean;
}) {
  const ref = useScrollReveal();
  const hasMockup = mockup != null;
  const layoutClass = hasMockup
    ? showMockupFromMd
      ? reverse
        ? "md:[grid-template-areas:'mock_text'] md:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]"
        : "md:[grid-template-areas:'text_mock'] md:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]"
      : reverse
        ? "lg:[grid-template-areas:'mock_text'] lg:grid-cols-2"
        : "lg:[grid-template-areas:'text_mock'] lg:grid-cols-2"
    : "lg:grid-cols-1";
  const mockupVisibilityClass = showMockupOnMobile ? "block" : showMockupFromMd ? "hidden md:block" : "hidden lg:block";

  return (
    <section id={id} ref={ref} className="py-12">
      <div
        className={`mx-auto grid ${showMockupFromMd ? "max-w-[1180px] gap-10" : "max-w-[1200px] gap-12"} grid-cols-1 items-center ${layoutClass}`}
        style={{ minHeight: 480 }}
      >
        <div className={reverse ? "lg:[grid-area:text]" : "lg:[grid-area:text]"} style={{ gridArea: "text" }}>
          <TagPill>{tag}</TagPill>
          <h2
            className="mt-4"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(24px, 3.2vw, 34px)",
              color: "var(--color-navy)",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}
          >
            {heading}
          </h2>
          <p
            className="mt-4 max-w-[480px]"
            style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: "var(--color-gray-text)", lineHeight: 1.65 }}
          >
            {body}
          </p>
          <ul className="mt-6 space-y-2.5">
            {features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2.5"
                style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: "var(--color-navy)" }}
              >
                <span style={{ color: "var(--color-accent)", fontWeight: 700 }}>✓</span>
                {f}
              </li>
            ))}
          </ul>
          <button
            onClick={onCta}
            className="story-link mt-8 inline-block"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15, color: "var(--color-accent)" }}
          >
            {cta}
          </button>
        </div>
        {hasMockup && (
          <div
            className={mockupVisibilityClass}
            style={{
              gridArea: "mock",
              transform: shiftMockupLeft ? "translateX(clamp(-64px, -4vw, -30px))" : undefined,
            }}
          >
            <div
              className="transition-transform duration-[350ms]"
              style={
                rawMockup
                  ? {
                      borderRadius: "var(--radius-xl)",
                      overflow: "hidden",
                      boxShadow: "0 32px 80px rgba(15,23,42,0.20)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      /* Subtle lift on hover — identical feel to the card */
                      willChange: "transform",
                    }
                  : {
                      background: "var(--color-navy)",
                      borderRadius: "var(--radius-xl)",
                      padding: 28,
                      boxShadow: "0 32px 80px rgba(15,23,42,0.20)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: "#fff",
                    }
              }
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              {mockup}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* Mockups */
function BaseGroundMockup() {
  const modules = [
    { name: "Module 1: Web Foundations", pct: 100, status: "Completed", color: "var(--color-success)" },
    { name: "Module 2: JavaScript Core", pct: 100, status: "Completed", color: "var(--color-success)" },
    { name: "Module 3: React Essentials", pct: 62, status: "In Progress", color: "var(--color-warning)" },
    { name: "Module 4: State & Hooks", pct: 0, status: "Locked", color: "rgba(255,255,255,0.4)" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 16 }}>My Learning Path</div>
          <span
            className="mt-1 inline-block"
            style={{
              background: "rgba(37,99,235,0.18)", color: "#9ECBFF",
              borderRadius: 999, padding: "3px 10px",
              fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 500,
            }}
          >
            Frontend Engineering · Track L3
          </span>
        </div>
        <div
          style={{
            width: 36, height: 36, borderRadius: 999, background: "var(--color-accent)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 13, color: "#fff",
          }}
        >
          AM
        </div>
      </div>

      <div className="mt-5 space-y-3.5">
        {modules.map((m) => (
          <div key={m.name}>
            <div className="flex items-center justify-between">
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.85)" }}>
                {m.name}
              </span>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: m.color }}>
                {m.status}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
              <div className="h-full" style={{ background: m.color, width: `${m.pct}%`, borderRadius: 999 }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[12px] p-3" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div className="flex justify-between" style={{ fontFamily: "Inter, sans-serif", fontSize: 12 }}>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Track Milestone</span>
          <span style={{ color: "var(--color-accent)", fontWeight: 600 }}>54%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div className="h-full" style={{ background: "linear-gradient(90deg, var(--color-accent), #60A5FA)", width: "54%" }} />
        </div>
      </div>
    </div>
  );
}

/* ── Base Ground + Assessment stack combined section ─────────────────── */
function BaseGroundWithAssessments({ onExplore }: { onExplore: () => void }) {
  const textRef = useScrollReveal<HTMLDivElement>();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const numCards = ASSESSMENTS.length;
  
  useGSAP(() => {
    let allowScroll = true;
    const scrollTimeout = gsap.delayedCall(1, () => { allowScroll = true; }).pause();
    const time = 0.5;
    let animating = false;

    // Set initial layout without scaling, using z for depth sorting
    gsap.set(".assessment-card-gsap", {
      y: (index) => 20 * index,
      z: (index) => -1 * index, // Stack them slightly backwards natively
      transformOrigin: "center top",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
    });

    const tl = gsap.timeline({ paused: true });

    for (let i = 0; i < numCards - 1; i++) {
      tl.add(`card${i + 2}`);
      tl.to(`.assessment-card-gsap:nth-child(${i + 1})`, {
        filter: "brightness(0.6)",
        duration: time,
      });
      tl.fromTo(
        `.assessment-card-gsap:nth-child(${i + 2})`,
        { 
          y: () => window.innerHeight,
          z: i + 1, // Pop it in front immediately
        },
        {
          y: 20 * (i + 1),
          z: i + 1, // Keep it in front
          duration: time,
          ease: "power2.inOut"
        },
        "<"
      );
    }

    function tweenToLabel(direction: string | undefined, isScrollingDown: boolean) {
      if (
        (!tl.nextLabel() && isScrollingDown) ||
        (!tl.previousLabel() && !isScrollingDown)
      ) {
        cardsObserver.disable();
        return;
      }
      if (!animating && direction) {
        animating = true;
        tl.tweenTo(direction, { onComplete: () => { animating = false; } });
      }
    }

    const cardsObserver = Observer.create({
      target: cardsContainerRef.current, // Target ONLY the right side
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      preventDefault: true,
      onDown: () => tweenToLabel(tl.previousLabel(), false),
      onUp: () => tweenToLabel(tl.nextLabel(), true),
      tolerance: 10,
    });

    cardsObserver.disable();

    // Use ScrollTrigger just to re-enable the observer when scrolling back into the section
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        if (!cardsObserver.isEnabled) cardsObserver.enable();
      },
      onEnterBack: () => {
        if (!cardsObserver.isEnabled) cardsObserver.enable();
      },
    });

  }, { scope: containerRef });

  return (
    <section
      id="base-ground"
      ref={containerRef}
      style={{
        padding: "52px max(5vw, 24px) 8px",
        overflow: "hidden",
      }}
    >
      <div
        ref={textRef}
        className="mx-auto grid max-w-[1300px] grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-10"
        style={{ alignItems: "start" }}
      >
        <div className="lg:self-start">
          <TagPill>BASE GROUND</TagPill>
          <h2
            className="mt-4"
            style={{
              fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 42px)",
              color: "var(--color-navy)", lineHeight: 1.15, letterSpacing: "-0.01em",
            }}
          >
            Get the Basics Right. Everything Else Follows.
          </h2>
          <p
            className="mt-4"
            style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: "var(--color-gray-text)", lineHeight: 1.65, maxWidth: 480 }}
          >
            Start with the basics that matter. Base Ground covers core concepts step by step, so you build clarity before moving forward.
          </p>
          <ul className="mt-6 space-y-2.5">
            {[
              "Beginner-friendly tests with clear explanations",
              "Topic-wise coverage for complete understanding",
              "Flexible pace, learn without pressure",
              "Clear performance insights before you move ahead",
            ].map((f) => (
              <li
                key={f}
                className="flex items-start gap-2.5"
                style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: "var(--color-navy)" }}
              >
                <span style={{ color: "var(--color-accent)", fontWeight: 700 }}>✓</span>
                {f}
              </li>
            ))}
          </ul>

          <button
            onClick={onExplore}
            className="story-link mt-8 inline-block"
            style={{
              fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15,
              color: "var(--color-accent)", background: "none", border: "none", cursor: "pointer",
            }}
          >
            Explore Base Ground →
          </button>
        </div>

        <div>
          <div style={{ padding: "2px 0 12px" }}>
            <div style={{ fontFamily: "Inter, sans-serif", color: "var(--color-accent)", fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>
              ASSESSMENTS
            </div>
            <h3 className="mt-2" style={{ fontFamily: "Inter, sans-serif", fontWeight: 550, fontSize: "clamp(18px, 2.4vw, 22px)", color: "var(--color-navy)", lineHeight: 1.15 }}>
              Pick Your Test. Prove You're Ready.
            </h3>
            <p className="mt-2" style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: "var(--color-gray-text)" }}>
              Every assessment here mirrors the real exam, same pressure, <br/> same format, same kind of questions.
            </p>
          </div>

          <div
            ref={cardsContainerRef}
            style={{ position: "relative", height: 600, width: "100%", marginTop: 14, transformStyle: "preserve-3d" }}
          >
            {ASSESSMENTS.map((assessment, i) => (
              <div
                key={assessment.name}
                className="assessment-card-gsap"
              >
                <AssessmentStackCard assessment={assessment} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProvingGroundDashboard() {
  const tabs = [
    {
      id: "overview",
      label: "Proving Ground",
      icon: Target,
      title: "Performance Trend",
      subtitle: "Your last five full-length exam attempts",
      score: "82%",
      scoreLabel: "Readiness Score",
      delta: "+6%",
      accuracy: "76%",
      rank: "#12",
      rankLabel: "Top 15%",
      action: "Start Test",
      practice: "Full Mock Test",
      meta: ["90 mins", "High Difficulty"],
      values: [50, 55, 64, 72, 81],
      average: [34, 38, 47, 54, 62],
      insight: "You are exam-ready for timing. Push weak-topic accuracy above 80% before the next attempt.",
    },
    {
      id: "mock-tests",
      label: "Mock Tests",
      icon: ClipboardList,
      title: "Mock Test Queue",
      subtitle: "Exam-pattern tests matched to your current level",
      score: "4",
      scoreLabel: "Available Tests",
      delta: "2 new",
      accuracy: "88%",
      rank: "L4",
      rankLabel: "Target level",
      action: "Open Tests",
      practice: "Cloud Architect Mock",
      meta: ["65 questions", "Sectional scoring"],
      values: [42, 48, 57, 68, 74],
      average: [36, 41, 46, 53, 59],
      insight: "Next recommended mock test focuses on scenario decisions, service tradeoffs, and time control.",
    },
    {
      id: "previous",
      label: "Previous Tests",
      icon: Clock3,
      title: "Previous Test History",
      subtitle: "Review score movement and retake signals",
      score: "5",
      scoreLabel: "Completed",
      delta: "+11 pts",
      accuracy: "18m",
      rank: "Best",
      rankLabel: "Time saved",
      action: "Review Tests",
      practice: "Retake Missed Sections",
      meta: ["32 mistakes", "Marked for review"],
      values: [44, 52, 49, 67, 78],
      average: [39, 43, 47, 51, 56],
      insight: "Your strongest jump came after reviewing missed security and networking questions.",
    },
    {
      id: "weak-areas",
      label: "Weak Areas",
      icon: BarChart3,
      title: "Weak Area Recovery",
      subtitle: "Topics that need focused correction before exam day",
      score: "3",
      scoreLabel: "Priority Areas",
      delta: "Fix first",
      accuracy: "61%",
      rank: "Risk",
      rankLabel: "Networking",
      action: "Practice Areas",
      practice: "Targeted Drill Set",
      meta: ["25 questions", "Adaptive review"],
      values: [38, 41, 46, 58, 66],
      average: [35, 39, 43, 49, 55],
      insight: "Networking, identity, and cost-optimization questions are holding back the final score.",
    },
  ] as const;

  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("overview");
  const active = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];
  const chartPoints = active.values
    .map((value, index) => `${62 + index * 65},${216 - value * 1.65}`)
    .join(" ");
  const averagePoints = active.average
    .map((value, index) => `${62 + index * 65},${216 - value * 1.65}`)
    .join(" ");

  return (
    <div
      className="w-full"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(226,232,240,0.95)",
        borderRadius: 24,
        color: "var(--color-navy)",
        minHeight: 360,
        overflow: "hidden",
      }}
    >
      <div className="grid" style={{ gridTemplateColumns: "132px 1fr" }}>
        <aside
          style={{
            borderRight: "1px solid var(--color-border)",
            padding: "18px 12px",
            background: "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
          }}
        >
          <Menu size={17} color="#64748B" strokeWidth={2.2} style={{ margin: "0 0 16px 8px" }} />
          <div className="flex flex-col gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const selected = tab.id === active.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-3 text-left transition-all duration-200"
                  style={{
                    border: 0,
                    borderRadius: 8,
                    background: selected ? "#EFF6FF" : "transparent",
                    color: selected ? "var(--color-accent)" : "#334155",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 11,
                    fontWeight: selected ? 700 : 600,
                    padding: "8px 9px",
                    boxShadow: selected ? "inset 3px 0 0 var(--color-accent)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!selected) e.currentTarget.style.background = "#F8FAFC";
                  }}
                  onMouseLeave={(e) => {
                    if (!selected) e.currentTarget.style.background = "transparent";
                  }}
                  aria-pressed={selected}
                >
                  <Icon size={16} strokeWidth={2.1} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <div style={{ padding: "18px 22px 14px" }}>
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: 21, fontWeight: 800, letterSpacing: 0, margin: 0 }}>
                {active.label}
              </h3>
              <p style={{ color: "var(--color-gray-text)", fontFamily: "Inter, sans-serif", fontSize: 11, marginTop: 5 }}>
                Track your performance and improve with every test.
              </p>
            </div>
            <span
              style={{
                alignItems: "center",
                background: "#EFF6FF",
                borderRadius: 999,
                color: "var(--color-accent)",
                display: "inline-flex",
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                gap: 6,
                padding: "6px 9px",
                whiteSpace: "nowrap",
              }}
            >
              <Gauge size={14} />
              Live
            </span>
          </div>

          <div className="grid gap-3" style={{ gridTemplateColumns: "1.15fr 0.85fr" }}>
            <section
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                boxShadow: "0 14px 34px rgba(15,23,42,0.07)",
                minHeight: 166,
                padding: 14,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 800, margin: 0 }}>
                    {active.title}
                  </h4>
                  <p style={{ color: "var(--color-gray-text)", fontSize: 11, marginTop: 4 }}>{active.subtitle}</p>
                </div>
                <div className="flex items-center gap-4" style={{ color: "#64748B", fontSize: 10 }}>
                  <span className="flex items-center gap-1.5">
                    <span style={{ width: 16, height: 3, borderRadius: 999, background: "var(--color-accent)" }} />
                    Your Score
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span style={{ width: 16, height: 2, borderRadius: 999, borderTop: "2px dashed #94A3B8" }} />
                    Average
                  </span>
                </div>
              </div>
              <svg viewBox="0 0 380 220" width="100%" height="108" role="img" aria-label={`${active.label} trend chart`}>
                {[0, 25, 50, 75, 100].map((tick) => (
                  <g key={tick}>
                    <line x1="54" x2="350" y1={216 - tick * 1.65} y2={216 - tick * 1.65} stroke="#EEF2F7" />
                    <text x="10" y={220 - tick * 1.65} fill="#64748B" fontSize="11">{tick}%</text>
                  </g>
                ))}
                <polyline points={averagePoints} fill="none" stroke="#A8B3C5" strokeWidth="2.5" strokeDasharray="7 7" />
                <polyline points={chartPoints} fill="none" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                {active.values.map((value, index) => (
                  <circle key={value + index} cx={62 + index * 65} cy={216 - value * 1.65} r="5" fill="var(--color-accent)" stroke="#fff" strokeWidth="2" />
                ))}
                {["T1", "T2", "T3", "T4", "T5"].map((label, index) => (
                  <text key={label} x={53 + index * 65} y="216" fill="#64748B" fontSize="11">{label}</text>
                ))}
              </svg>
            </section>

            <div className="grid gap-3">
              {[
                { icon: Trophy, label: active.scoreLabel, value: active.score, note: active.delta, tint: "#ECFDF5", color: "#10B981" },
                { icon: Target, label: "Accuracy", value: active.accuracy, note: "+4%", tint: "#EFF6FF", color: "var(--color-accent)" },
                { icon: FileCheck2, label: "Your Rank", value: active.rank, note: active.rankLabel, tint: "#F0F7FF", color: "#1D4ED8" },
              ].map((metric) => {
                const Icon = metric.icon;
                return (
                  <article
                    key={metric.label}
                    className="flex items-center gap-3"
                    style={{
                      border: "1px solid var(--color-border)",
                      borderRadius: 12,
                      boxShadow: "0 10px 24px rgba(15,23,42,0.06)",
                      padding: "10px 12px",
                    }}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: 999, background: metric.tint, color: metric.color, display: "grid", placeItems: "center" }}>
                      <Icon size={18} strokeWidth={2.1} />
                    </div>
                    <div>
                      <p style={{ color: "#64748B", fontSize: 11, margin: 0 }}>{metric.label}</p>
                      <strong style={{ display: "block", fontFamily: "Inter, sans-serif", fontSize: 19, lineHeight: 1.1 }}>{metric.value}</strong>
                      <span style={{ color: metric.color, fontSize: 12, fontWeight: 700 }}>{metric.note}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <section
            className="mt-3 flex items-center justify-between gap-4"
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: 12,
              boxShadow: "0 14px 34px rgba(15,23,42,0.07)",
              padding: "10px 13px",
            }}
          >
            <div className="flex items-center gap-3">
              <div style={{ width: 38, height: 38, borderRadius: 9, background: "#EFF6FF", color: "var(--color-accent)", display: "grid", placeItems: "center" }}>
                <ClipboardList size={19} />
              </div>
              <div>
                <h4 style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 800, margin: 0 }}>{active.practice}</h4>
                <div className="mt-1.5 flex flex-wrap gap-3" style={{ color: "#64748B", fontSize: 10 }}>
                  {active.meta.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
            <button
              type="button"
              style={{
                alignItems: "center",
                background: "var(--color-accent)",
                border: 0,
                borderRadius: 8,
                boxShadow: "0 12px 28px rgba(37,99,235,0.25)",
                color: "#fff",
                cursor: "pointer",
                display: "inline-flex",
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                fontWeight: 800,
                gap: 9,
                padding: "9px 15px",
                whiteSpace: "nowrap",
              }}
            >
              {active.action}
              <ArrowRight size={16} />
            </button>
          </section>

          <p style={{ color: "#475569", fontSize: 11, lineHeight: 1.4, margin: "8px 2px 0" }}>
            {active.insight}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * XoneVideoMockup
 * ─────────────────────────────────────────────────────────────────────────
 * Replaces the static UI card with an autoplaying, looping product video.
 * Maintains identical sizing/positioning to the old XoneMockup card.
 *
 * • autoPlay + muted is required by every browser for inline autoplay.
 * • playsInline prevents iOS Safari from hijacking the video to fullscreen.
 * • The useEffect() play() call is a belt-and-suspenders for strict-mode
 *   React and any browser that skips the autoplay attribute on first render.
 * • objectFit: "cover" mirrors the card's full-width fill behaviour.
 * • A translucent gradient overlay at the bottom adds depth and avoids the
 *   raw video edge feeling disconnected from the surrounding page chrome.
 */
function XoneVideoMockup() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Belt-and-suspenders: try to play programmatically in case the browser
    // deferred the `autoplay` attribute (e.g. low-power mode on iOS/Android).
    video.play().catch(() => {
      // Silently swallow the DOMException — the video will play on first user
      // interaction with the page (browser autoplay policy).
    });
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        /* 16 : 9 aspect ratio — works on every screen size without fixed heights */
        aspectRatio: "16 / 9",
        background: "var(--color-navy)",      /* fallback while video buffers   */
        overflow: "hidden",                   /* keep children inside the radius */
        boxShadow:
          "0 38px 76px rgba(15,23,42,0.20), 0 16px 36px rgba(37,99,235,0.11)",
      }}
    >
      <video
        ref={videoRef}
        src="/AI interview.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-label="Xone AI mock-interview demo"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* Subtle bottom-fade gradient — softens the video cut-off and echoes
          the page's card-shadow aesthetic without hiding content */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(15,23,42,0.22) 0%, transparent 40%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

function WalkWaysMiniMockup() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [triggered, setTriggered] = useState(false);
  const [progress, setProgress] = useState(0);

  const TARGET = 42;

  const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
  );

  const CurrentIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5.5" /></svg>
  );

  const LockIcon = () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2" ry="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
  );

  const nodes = [
    { label: "Start", icon: <CheckIcon />, status: "complete" },
    { label: "Basics", icon: <CheckIcon />, status: "complete" },
    { label: "Practice", icon: <CurrentIcon />, status: "current" },
    { label: "Mock", icon: <LockIcon />, status: "locked" },
    { label: "Interview", icon: <LockIcon />, status: "locked" },
  ];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setTriggered(true);
        const start = performance.now();
        const dur = 1500;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          setProgress(Math.round(TARGET * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="walkway-path-card relative w-full overflow-hidden rounded-[28px] border border-sky-300/[0.20]"
      style={{
        background:
          "linear-gradient(145deg, #0D4D86 0%, #073F72 42%, #062F58 100%)",
        boxShadow:
          "0 30px 80px rgba(15, 23, 42, 0.24), 0 0 0 1px rgba(255,255,255,0.08) inset, 0 1px 0 rgba(255,255,255,0.16) inset",
        color: "#fff",
        padding: "clamp(18px, 2.6vw, 28px)",
      }}
    >
      <style>{`
        .walkway-path-card {
          transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms ease, border-color 420ms ease;
          will-change: transform;
        }
        .walkway-path-card:hover {
          transform: translateY(-8px) scale(1.012);
          border-color: rgba(125, 211, 252, 0.38) !important;
          box-shadow: 0 36px 86px rgba(14, 116, 144, 0.22), 0 24px 58px rgba(15, 23, 42, 0.26), 0 0 34px rgba(59, 130, 246, 0.18), 0 0 0 1px rgba(255,255,255,0.12) inset, 0 1px 0 rgba(255,255,255,0.18) inset !important;
        }
      `}</style>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(58deg, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px, transparent 1px, transparent 5px)",
          opacity: 0.42,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 48% 26%, rgba(96,165,250,0.28), transparent 34%), radial-gradient(circle at 90% 12%, rgba(125,211,252,0.12), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.07), transparent 48%)",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-4">
          <div
            className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[16px] border border-white/[0.12] bg-white/[0.08] text-sky-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:h-[60px] sm:w-[60px]"
            style={{ backdropFilter: "blur(12px)" }}
          >
            <svg width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7h9a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h12" />
              <path d="M18 5a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" />
              <path d="M2 19a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" />
              <path d="M15 5h3" />
              <path d="M6 19h3" />
            </svg>
          </div>
          <h3
            className="text-[22px] font-extrabold tracking-[-0.02em] text-white sm:text-[28px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Your Path
          </h3>
        </div>

        <div className="relative mt-7 overflow-x-auto pb-1 sm:mt-8 sm:overflow-visible">
          <div className="relative min-w-[560px] sm:min-w-0">
            <div className="absolute left-[8%] right-[8%] top-[26px] h-[4px] rounded-full bg-slate-950/24" />
            <div
              className="absolute left-[8%] top-[26px] h-[4px] rounded-full"
              style={{
                width: triggered ? "42%" : "0%",
                background: "linear-gradient(90deg, #69B8FF 0%, #318BFF 100%)",
                boxShadow: "0 0 18px rgba(80, 170, 255, 0.62)",
                transition: "width 1300ms cubic-bezier(0.4,0,0.2,1) 160ms",
              }}
            />

            <div className="grid grid-cols-5 items-start">
              {nodes.map((n, i) => {
                const delay = 240 + i * 130;
                const isComplete = n.status === "complete";
                const isCurrent = n.status === "current";
                const isLocked = n.status === "locked";

                return (
                  <div key={n.label} className="relative z-10 flex flex-col items-center">
                    <div
                      className="relative flex items-center justify-center rounded-full"
                      style={{
                        width: isCurrent ? 58 : 52,
                        height: isCurrent ? 58 : 52,
                        color: "#fff",
                        background: isLocked
                          ? "rgba(7, 38, 70, 0.78)"
                          : "linear-gradient(145deg, #60B7FF 0%, #2563EB 100%)",
                        border: isLocked
                          ? "2px solid rgba(255,255,255,0.14)"
                          : "1px solid rgba(255,255,255,0.18)",
                        boxShadow: isCurrent
                          ? "0 0 0 7px rgba(96,165,250,0.16), 0 0 0 12px rgba(96,165,250,0.09), 0 12px 24px rgba(37,99,235,0.34), inset 0 2px 0 rgba(255,255,255,0.35)"
                          : isComplete
                            ? "0 8px 15px rgba(37,99,235,0.28), inset 0 1px 0 rgba(255,255,255,0.24)"
                            : "inset 0 1px 0 rgba(255,255,255,0.1)",
                        opacity: triggered ? 1 : 0,
                        transform: triggered ? "scale(1)" : "scale(0.78)",
                        transition: `opacity 350ms ease ${delay}ms, transform 560ms cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
                      }}
                    >
                      {isCurrent && (
                        <div className="absolute inset-2 animate-pulse rounded-full bg-white/10" />
                      )}
                      <div
                        className="relative z-10"
                        style={{ color: isLocked ? "rgba(255,255,255,0.86)" : "#fff" }}
                      >
                        {n.icon}
                      </div>
                    </div>
                    <span
                      className="mt-3 text-center text-[13px] font-bold tracking-[-0.02em] sm:text-[15px]"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        color: isCurrent
                          ? "#45A3FF"
                          : isLocked
                            ? "rgba(255,255,255,0.66)"
                            : "#F8FAFC",
                        opacity: triggered ? 1 : 0,
                        transform: triggered ? "translateY(0)" : "translateY(8px)",
                        transition: `opacity 360ms ease ${delay + 150}ms, transform 360ms ease ${delay + 150}ms`,
                      }}
                    >
                      {n.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className="mt-6 rounded-[18px] border border-sky-200/[0.14] bg-white/[0.045] p-4 sm:mt-7 sm:p-5"
          style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.08) inset" }}
        >
          <div className="mb-4 flex items-center justify-between gap-5">
            <h4
              className="text-[16px] font-extrabold tracking-[-0.02em] text-white sm:text-[18px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Overall Progress
            </h4>
            <span
              className="text-[24px] font-extrabold tracking-[-0.04em] text-blue-400 sm:text-[30px]"
              style={{
                fontFamily: "Inter, sans-serif",
                opacity: triggered ? 1 : 0,
                transform: triggered ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 400ms ease 760ms, transform 400ms ease 760ms",
              }}
            >
              {progress}%
            </span>
          </div>
          <div className="relative h-[10px] overflow-hidden rounded-full bg-sky-100/[0.13]">
            <div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{
                width: triggered ? `${TARGET}%` : "0%",
                background: "linear-gradient(90deg, #3BA6FF 0%, #247CFF 100%)",
                boxShadow: "0 0 20px rgba(59,166,255,0.58)",
                transition: "width 1500ms cubic-bezier(0.2,0.8,0.2,1) 480ms",
              }}
            />
            <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
          </div>
        </div>

        <div
          className="mt-4 grid gap-3.5 rounded-[18px] border border-sky-200/[0.14] bg-white/[0.04] p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-5"
          style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.08) inset" }}
        >
          <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[13px] bg-sky-300/10 text-sky-100">
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="5" width="16" height="16" rx="3" />
              <path d="M8 3v4M16 3v4M4 10h16" />
              <path d="m9 15 2 2 4-4" />
            </svg>
          </div>
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-blue-400">
              Next Step
            </div>
            <div
              className="mt-1 text-[16px] font-extrabold tracking-[-0.02em] text-white sm:text-[19px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Complete DSA Basics
            </div>
          </div>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-[13px] border border-sky-100/[0.14] px-4 text-[13px] font-extrabold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.08]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Continue
            <ArrowRight size={16} strokeWidth={2.6} />
          </button>
        </div>
      </div>
    </div>
  );
}
/* ---------------- WHY STATS ---------------- */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const start = performance.now();
      const dur = 1500;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        setVal(Math.round(to * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.disconnect();
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

function FirstMockTestCTA() {
  return (
    <section
      className="relative overflow-visible"
      style={{
        background: `
          linear-gradient(
            to bottom,
            #0A0F1F 0%,
            #07112C 48%,
            #0F172A 100%
          )
        `,
        marginTop: -1,
        minHeight: "112vh",
        padding: "clamp(64px, 9vh, 92px) max(5vw, 24px) 14vh",
        zIndex: 1,
      }}
    >
      <style>{`
        @keyframes mock-card-breathe {
          0%, 100% { box-shadow: 0 30px 74px rgba(2,6,23,0.32), 0 0 0 1px rgba(255,255,255,0.10) inset; }
          50% { box-shadow: 0 36px 84px rgba(2,6,23,0.38), 0 0 0 1px rgba(255,255,255,0.16) inset; }
        }
        @keyframes mock-card-sheen {
          0% { transform: translateX(-130%) rotate(12deg); opacity: 0; }
          18% { opacity: 0.46; }
          45% { opacity: 0.16; }
          100% { transform: translateX(130%) rotate(12deg); opacity: 0; }
        }
        @keyframes mock-border-orbit {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes mock-mesh-drift {
          0% { transform: translate3d(-2%, -2%, 0) scale(1); background-position: 12% 18%, 84% 10%, 18% 88%, 90% 76%; }
          50% { transform: translate3d(2%, 1%, 0) scale(1.04); background-position: 30% 8%, 72% 28%, 8% 72%, 82% 90%; }
          100% { transform: translate3d(1%, -1%, 0) scale(1.02); background-position: 18% 24%, 92% 16%, 26% 78%, 76% 72%; }
        }
        @keyframes mock-wire-drift {
          0% { transform: translateX(-3%) skewX(-6deg); opacity: 0.52; }
          50% { transform: translateX(3%) skewX(-6deg); opacity: 0.72; }
          100% { transform: translateX(-1%) skewX(-6deg); opacity: 0.58; }
        }
      `}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(96,165,250,0.18), transparent 38%), radial-gradient(circle at 12% 62%, rgba(255,255,255,0.08), transparent 30%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{
          height: 170,
          background:
            "linear-gradient(to bottom, #0A0F1F 0%, rgba(10,15,31,0.72) 42%, rgba(10,15,31,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          height: 240,
          background:
            "linear-gradient(to bottom, rgba(15,23,42,0) 0%, rgba(15,23,42,0.72) 58%, #0F172A 100%)",
        }}
      />

      <div
        className="relative mx-auto max-w-[940px]"
        style={{
          position: "sticky",
          top: "clamp(106px, 16vh, 132px)",
          zIndex: 1,
        }}
      >
        <div
          className="relative overflow-hidden text-center"
          style={{
            borderRadius: 34,
            background: "#f5f5f5",
            minHeight: 288,
            padding: "clamp(38px, 5.4vw, 62px) clamp(24px, 5vw, 58px)",
            animation: "mock-card-breathe 7s ease-in-out infinite",
          }}
        >
          <div
            aria-hidden
            className="absolute -inset-[12%]"
            style={{
              backgroundImage: `
                radial-gradient(circle at 18% 18%, #fdfdfd 0%, rgba(253,253,253,0) 30%),
                radial-gradient(circle at 82% 14%, #f4ede5 0%, rgba(244,237,229,0) 34%),
                radial-gradient(circle at 20% 84%, #e9f2f5 0%, rgba(233,242,245,0) 36%),
                radial-gradient(circle at 88% 76%, #e7efe8 0%, rgba(231,239,232,0) 34%)
              `,
              backgroundColor: "#f5f5f5",
              backgroundSize: "120% 120%",
              filter: "blur(16px)",
              animation: "mock-mesh-drift 12s ease-in-out infinite alternate",
            }}
          />
          <div
            aria-hidden
            className="absolute -inset-[10%]"
            style={{
              backgroundImage: `
                radial-gradient(ellipse at 38% 18%, rgba(255,255,255,0.95), rgba(255,255,255,0) 38%),
                linear-gradient(118deg, rgba(240,244,248,0.78), rgba(254,246,235,0.58), rgba(230,237,242,0.7))
              `,
              opacity: 0.7,
              filter: "blur(10px)",
              animation: "mock-wire-drift 10s ease-in-out infinite alternate",
            }}
          />
          <div
            aria-hidden
            className="absolute -inset-[18%]"
            style={{
              background:
                "linear-gradient(132deg, rgba(255,255,255,0.52) 0%, rgba(226,241,255,0.62) 42%, rgba(247,251,255,0.12) 70%)",
              opacity: 0.45,
              filter: "blur(18px)",
              transform: "rotate(-8deg)",
              animation: "mock-card-sheen 9s ease-in-out infinite",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(120deg, rgba(255,255,255,0.72), rgba(255,255,255,0) 32%, rgba(226,232,240,0.52) 64%, rgba(255,255,255,0.68))",
              opacity: 0.62,
            }}
          />
          <div
            aria-hidden
            className="absolute -inset-[2px]"
            style={{
              borderRadius: 36,
              background:
                "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.9), rgba(226,232,240,0.9), rgba(255,255,255,0))",
              backgroundSize: "200% 100%",
              animation: "mock-border-orbit 8s linear infinite",
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: 1,
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden
            className="absolute top-0 h-full w-[44%]"
            style={{
              left: "10%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.86), transparent)",
              filter: "blur(4px)",
              animation: "mock-card-sheen 6.5s ease-in-out infinite",
            }}
          />

          <div className="relative z-10 mx-auto max-w-[760px]">
            <div
              className="mx-auto mb-6 inline-flex items-center gap-2"
              style={{
                border: "1px solid rgba(37,99,235,0.14)",
                borderRadius: 999,
                background: "rgba(255,255,255,0.76)",
                boxShadow: "0 10px 28px rgba(15,23,42,0.08)",
                color: "var(--color-accent)",
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 3,
                padding: "9px 16px",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 999,
                  background: "var(--color-accent)",
                  boxShadow: "0 0 16px rgba(37,99,235,0.72)",
                }}
              />
              Ready to prove it?
            </div>

            <h2
              style={{
                color: "var(--color-navy)",
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(34px, 5.8vw, 64px)",
                fontWeight: 900,
                letterSpacing: 0,
                lineHeight: 0.98,
                margin: 0,
              }}
            >
              First Mock Test.
              <br />
              First Reality Check.
            </h2>

            <p
              className="mx-auto mt-5"
              style={{
                color: "#64748B",
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(15px, 1.75vw, 19px)",
                fontWeight: 500,
                lineHeight: 1.55,
                maxWidth: 720,
              }}
            >
              No guessing, no overthinking. Just sit the test, see your score, and know exactly what to work on next.
            </p>

            <button
              type="button"
              className="mt-8 transition-all duration-300"
              style={{
                background: "var(--color-accent)",
                border: "1px solid rgba(37,99,235,0.18)",
                borderRadius: 14,
                boxShadow: "0 18px 44px rgba(37,99,235,0.25)",
                color: "#fff",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: 15,
                fontWeight: 800,
                padding: "15px 28px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-accent-hover)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 24px 56px rgba(37,99,235,0.34)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--color-accent)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 18px 44px rgba(37,99,235,0.25)";
              }}
            >
              Start a free trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  const cols = [
    {
      title: "Platform",
      links: ["WalkWays", "Xone", "Base Ground", "Proving Ground", "Assessments"],
    },
    {
      title: "Company",
      links: ["About", "Pricing", "Contact", "Learning Resources", "Blog", "Careers"],
    },
  ];

  const SocialIcon = ({ children }: { children: React.ReactNode }) => (
    <button
      className="flex h-10 w-10 items-center justify-center rounded-full transition-all"
      style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(37,99,235,0.3)";
        e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {children}
    </button>
  );

  return (
    <footer
      style={{
        background: "var(--color-navy)",
        padding: "clamp(76px, 14vh, 122px) max(5vw, 24px) 0",
        marginTop: "-40vh",
        position: "relative",
        zIndex: 5,
      }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <img src="/onskill-logo.png" alt="OnSKILL" width={32} height={32} className="h-8 w-8" />
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, color: "#fff", fontSize: 18 }}>
                ON<span style={{ color: "var(--color-accent)" }}>SKILL</span>
              </span>
            </div>
            <div
              className="mt-3"
              style={{ fontFamily: "Inter, sans-serif", fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,0.55)" }}
            >
              Certify. Prove. Grow.
            </div>
            <p
              className="mt-3 max-w-[220px]"
              style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}
            >
              Where verified skills meet real opportunities.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#fff",
                  textTransform: "uppercase",
                  letterSpacing: 2,
                }}
              >
                {c.title}
              </div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <button
                      className="transition-all duration-[200ms]"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "rgba(255,255,255,0.65)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#fff";
                        e.currentTarget.style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700, fontSize: 13, color: "#fff",
                textTransform: "uppercase", letterSpacing: 2,
              }}
            >
              Connect
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <SocialIcon>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM8 17H5v-7h3v7zM6.5 9a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM18 17h-3v-3.5c0-1-.5-1.5-1.3-1.5s-1.7.6-1.7 1.5V17h-3v-7h3v1c.5-.7 1.5-1.2 2.7-1.2 2 0 3.3 1.3 3.3 3.5V17z" /></svg>
              </SocialIcon>
              <SocialIcon>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1" /></svg>
              </SocialIcon>
              <SocialIcon>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16 4 12 4 12 4s-4 0-6.8.3c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 8.8 2 10.4v1.2c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.3.9 1.6.2 6.7.3 6.7.3s4 0 6.8-.3c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.2c0-1.6-.2-3.2-.2-3.2zM10 14.4V8.6L15 11.5l-5 2.9z" /></svg>
              </SocialIcon>
              <SocialIcon>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.8c-.7.3-1.5.5-2.4.6.9-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1-1.5-1.6-4.1-1.7-5.7-.1-1 1-1.5 2.5-1.2 3.9-3.3-.2-6.3-1.7-8.4-4.3C2 7 2.4 8.8 3.7 9.8c-.6 0-1.2-.2-1.8-.5 0 1.8 1.3 3.4 3 3.7-.5.2-1.1.2-1.7.1.5 1.5 1.9 2.6 3.5 2.6-1.5 1.2-3.4 1.8-5.3 1.5C3.1 18.5 5.2 19 7 19c8.4 0 13-7 13-13v-.6c.9-.6 1.7-1.4 2-2.6z" /></svg>
              </SocialIcon>
            </div>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
            © 2025 OnSKILL · All rights reserved.
          </span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
            Privacy Policy · Terms of Service
          </span>
        </div>
      </div>
    </footer>
  );
}




/* ── Floating assessment ambient elements ── */
const FloatingAssessmentElements = () => (
  <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 2 }}>
    {/* Badge — top-right corner */}
    <div style={{
      position: "absolute", top: "14%", right: "6%",
      background: "rgba(37,99,235,0.24)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(37,99,235,0.45)",
      borderRadius: 14, padding: "10px 16px",
      display: "flex", alignItems: "center", gap: 9,
      boxShadow: "0 8px 32px rgba(37,99,235,0.15)",
      animation: "float 9s ease-in-out infinite",
      animationDelay: "0s",
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: "#2563EB", flexShrink: 0 }}>
        <circle cx="12" cy="8" r="6" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M9.5 8l2 2 3-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, color: "#2563EB", whiteSpace: "nowrap" }}>
        Badge Earned
      </span>
    </div>

    {/* Timer — left side */}
    <div style={{
      position: "absolute", top: "38%", left: "3%",
      background: "rgba(15,23,42,0.6)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      border: "1px solid rgba(37,99,235,0.4)",
      borderRadius: 12, padding: "12px 18px",
      display: "flex", flexDirection: "column", gap: 4,
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      animation: "float 12s ease-in-out infinite",
      animationDelay: "-4s",
    }}>
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>Assessment</span>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ color: "#60A5FA" }}>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: "0.04em" }}>88:42</span>
      </div>
    </div>

    {/* Score — bottom-right */}
    <div style={{
      position: "absolute", bottom: "48%", right: "3%",
      background: "rgba(15,23,42,0.6)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      border: "1px solid rgba(245,158,11,0.45)",
      borderRadius: 12, padding: "12px 18px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      animation: "float 11s ease-in-out infinite",
      animationDelay: "-7s",
    }}>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 5 }}>Skill Score</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 22, fontWeight: 800, color: "#F59E0B" }}>94</span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>/100</span>
      </div>
      {/* Mini bar */}
      <div style={{ marginTop: 6, height: 3, borderRadius: 99, background: "rgba(245,158,11,0.20)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: "94%", borderRadius: 99, background: "linear-gradient(90deg, #F59E0B, #FCD34D)" }} />
      </div>
    </div>

    {/* Rank — bottom-left */}
    <div style={{
      position: "absolute", bottom: "15%", left: "4%",
      background: "rgba(15,23,42,0.6)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      border: "1px solid rgba(96,165,250,0.4)",
      borderRadius: 12, padding: "10px 18px",
      display: "flex", alignItems: "center", gap: 8,
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      animation: "float 14s ease-in-out infinite",
      animationDelay: "-2s",
    }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ color: "#60A5FA" }}>
        <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
      <div>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5, textTransform: "uppercase" }}>Global Rank</div>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700, color: "#60A5FA" }}>#1,247</div>
      </div>
    </div>

    {/* Live indicator — top-left */}
    <div style={{
      position: "absolute", top: "20%", left: "7%",
      background: "rgba(239,68,68,0.22)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(239,68,68,0.45)",
      borderRadius: 99, padding: "8px 16px",
      display: "flex", alignItems: "center", gap: 7,
      boxShadow: "0 4px 20px rgba(239,68,68,0.15)",
      animation: "float 10s ease-in-out infinite",
      animationDelay: "-6s",
    }}>
      <div style={{ width: 7, height: 7, borderRadius: 99, background: "#EF4444", animation: "blink 1.2s step-end infinite" }} />
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.65)" }}>243 live now</span>
    </div>
  </div>
);

/* ── Canvas particle network — educational knowledge-graph feel ── */
function useNetworkCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0, height = 0;
    const resize = () => {
      width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.offsetHeight * window.devicePixelRatio;
      canvas.width = width;
      canvas.height = height;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    interface Nd { x: number; y: number; vx: number; vy: number; r: number; ph: number; spd: number; }
    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;
    const N: Nd[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * W(), y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.6 + 0.6,
      ph: Math.random() * Math.PI * 2,
      spd: 0.012 + Math.random() * 0.014,
    }));

    let id: number;
    const draw = () => {
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);

      // Subtle dot grid
      ctx.fillStyle = "rgba(37,99,235,0.07)";
      const gs = 72;
      for (let gx = gs / 2; gx < w; gx += gs)
        for (let gy = gs / 2; gy < h; gy += gs) {
          ctx.beginPath();
          ctx.arc(gx, gy, 0.9, 0, Math.PI * 2);
          ctx.fill();
        }

      // Connections
      for (let i = 0; i < N.length; i++) {
        for (let j = i + 1; j < N.length; j++) {
          const dx = N[i].x - N[j].x, dy = N[i].y - N[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 170) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(37,99,235,${((1 - d / 170) * 0.20).toFixed(3)})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(N[i].x, N[i].y);
            ctx.lineTo(N[j].x, N[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes with pulsing glow
      N.forEach((n) => {
        n.ph += n.spd;
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        const glow = (Math.sin(n.ph) * 0.5 + 0.5);
        const gr = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
        gr.addColorStop(0, `rgba(96,165,250,${(0.25 * glow).toFixed(3)})`);
        gr.addColorStop(1, "rgba(96,165,250,0)");
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = gr; ctx.fill();

        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147,191,255,${(0.45 + glow * 0.45).toFixed(3)})`;
        ctx.fill();
      });

      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); ro.disconnect(); };
  }, []);
}

function ExploreSection() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useNetworkCanvas(canvasRef);

  const products = [
    {
      id: "base-ground",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      name: "Base Ground",
      tagline: "Structured Learning",
      description: "Build expertise through curated modules, interactive lessons, and skill tracks crafted for real-world mastery.",
      accent: "#60A5FA",
      tag: "Learn",
    },
    {
      id: "proving-ground",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="6" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M9.5 8l2 2 3-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 13.9L7 23l5-2.5 5 2.5-1-9.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      name: "Proving Ground",
      tagline: "Verified Certifications",
      description: "Timed assessments, AI scoring, and verified badges that signal your competence to the employers who matter.",
      accent: "#60A5FA",
      tag: "Certify",
    },
    {
      id: "xone",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="3" width="20" height="13" rx="2" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M7 8h4M7 11h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="17" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 21h8M12 16v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
      name: "Xone",
      tagline: "AI Mock Interviews",
      description: "Simulate real technical rounds at top-tier companies with instant AI feedback on code quality and approach.",
      accent: "#2563EB",
      tag: "Interview",
    },
    {
      id: "walkways",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="5" cy="5" r="2" stroke="currentColor" strokeWidth="1.8"/>
          <circle cx="19" cy="5" r="2" stroke="currentColor" strokeWidth="1.8"/>
          <circle cx="5" cy="19" r="2" stroke="currentColor" strokeWidth="1.8"/>
          <circle cx="19" cy="19" r="2" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M7 5h10M5 7v10M19 7v10M7 19h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
        </svg>
      ),
      name: "WalkWays",
      tagline: "Learning Roadmaps",
      description: "Follow guided paths from beginner to certified professional with visual milestones and adaptive progression.",
      accent: "#F59E0B",
      tag: "Grow",
    },
  ] as const;

  const tracks = [
    {
      name: "Frontend",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <polyline points="16 18 22 12 16 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="8 6 2 12 8 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      name: "Backend",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="3" width="20" height="4.5" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
          <rect x="2" y="9.75" width="20" height="4.5" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
          <rect x="2" y="16.5" width="20" height="4.5" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
          <circle cx="6" cy="5.25" r="1" fill="currentColor"/>
          <circle cx="6" cy="12" r="1" fill="currentColor"/>
          <circle cx="6" cy="18.75" r="1" fill="currentColor"/>
        </svg>
      ),
    },
    {
      name: "System Design",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 3L22 8 12 13 2 8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
          <path d="M2 13l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      name: "DevOps",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 12c-2-2.5-4-4-6-4a4 4 0 000 8c2 0 4-1.5 6-4z" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          <path d="M12 12c2 2.5 4 4 6 4a4 4 0 000-8c-2 0-4 1.5-6 4z" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          <path d="M7.5 5.5l1.5 2-2 .5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.5 18.5l-1.5-2 2-.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      name: "Data & Algo",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      name: "AI & ML",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M5.636 5.636l1.768 1.768M16.596 16.596l1.768 1.768M16.596 7.404l1.768-1.768M5.636 18.364l1.768-1.768" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
  ] as const;

  return (
    <section
      aria-label="Explore the platform"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(155deg, #070d1a 0%, #0a1628 45%, #0c1d36 100%)",
        padding: "100px max(5vw, 40px) 160px",
      }}
    >
      {/* ── Canvas: particle knowledge-graph network ── */}
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          pointerEvents: "none", zIndex: 1,
        }}
      />

      {/* ── TOP bulrush transition: white → electric-blue → navy ── */}
      <div
        aria-hidden
        style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: 0,
          background: "linear-gradient(to bottom, #ffffff 0%, rgba(219,234,254,0.98) 12%, rgba(147,197,253,0.70) 28%, rgba(59,130,246,0.40) 50%, rgba(37,99,235,0.10) 72%, transparent 100%)",
          pointerEvents: "none", zIndex: 4,
        }}
      />

      {/* ── BOTTOM bulrush transition: navy → electric-blue → white ── */}
      <div
        aria-hidden
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 100,
          background: "linear-gradient(to top, #ffffff 0%, rgba(219,234,254,0.95) 18%, rgba(147,197,253,0.65) 40%, rgba(59,130,246,0.15) 70%, transparent 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, black 50%, transparent 100%)",
          maskImage: "linear-gradient(to top, black 0%, black 50%, transparent 100%)",
          pointerEvents: "none", zIndex: 4,
        }}
      />

      {/* ── Floating assessment ambient micro-cards ── */}
      <FloatingAssessmentElements />

      {/* ── Animated ambient orbs — blur + drift create the glass backdrop ── */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 1,
      }}>
        {/* Primary blue — top-left */}
        <div style={{
          position: "absolute", width: 700, height: 700, top: -180, left: -200,
          background: "radial-gradient(circle at 40% 40%, rgba(37,99,235,0.32) 0%, transparent 65%)",
          borderRadius: "50%", filter: "blur(48px)",
          animation: "blob-drift 22s ease-in-out infinite",
        }} />
        {/* Sky-blue — bottom-right */}
        <div style={{
          position: "absolute", width: 580, height: 580, bottom: -120, right: -140,
          background: "radial-gradient(circle at 60% 60%, rgba(96,165,250,0.26) 0%, transparent 65%)",
          borderRadius: "50%", filter: "blur(56px)",
          animation: "blob-drift 28s ease-in-out infinite reverse",
          animationDelay: "-10s",
        }} />
        {/* Blue accent — mid-right */}
        <div style={{
          position: "absolute", width: 420, height: 420, top: "38%", right: "10%",
          background: "radial-gradient(circle at 50% 50%, rgba(37,99,235,0.20) 0%, transparent 65%)",
          borderRadius: "50%", filter: "blur(60px)",
          animation: "blob-drift 19s ease-in-out infinite",
          animationDelay: "-5s",
        }} />
        {/* Amber — center-left (subtle) */}
        <div style={{
          position: "absolute", width: 320, height: 320, top: "55%", left: "22%",
          background: "radial-gradient(circle at 50% 50%, rgba(245,158,11,0.15) 0%, transparent 65%)",
          borderRadius: "50%", filter: "blur(50px)",
          animation: "float 10s ease-in-out infinite",
          animationDelay: "-3s",
        }} />
        {/* Indigo pulse — center */}
        <div style={{
          position: "absolute", width: 500, height: 500, top: "30%", left: "40%", transform: "translateX(-50%)",
          background: "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.10) 0%, transparent 65%)",
          borderRadius: "50%", filter: "blur(70px)",
          animation: "blob-drift 32s ease-in-out infinite",
          animationDelay: "-14s",
        }} />
      </div>

      {/* ── Content ── */}
      <div className="relative mx-auto" style={{ maxWidth: 1200, zIndex: 5 }}>

        {/* Header */}
        <section id="products" style={{ marginBottom: 48, opacity: 0, animation: "fadeUp 0.65s cubic-bezier(0.4,0,0.2,1) 0.1s forwards" }}>
          <div className="text-center">
            <div style={{
              display: "inline-block",
              background: "rgba(37,99,235,0.16)",
              border: "1px solid rgba(37,99,235,0.32)",
              borderRadius: 999,
              padding: "6px 20px",
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "3px",
              textTransform: "uppercase" as const,
              color: "#93BFFF",
              marginBottom: 22,
            }}>
              Our Platform
            </div>
            <h2 style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(36px, 5vw, 56px)",
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}>
              Everything You Need. One Ecosystem.
            </h2>
            <p style={{
              marginTop: 16,
              fontFamily: '"Inter", sans-serif',
              fontSize: 18,
              color: "rgba(255,255,255,0.45)",
              maxWidth: 640,
              margin: "20px auto 0",
              lineHeight: 1.8,
            }}>
              A comprehensive platform designed to build, verify, and accelerate your tech career.
            </p>
          </div>
        </section>



        {/* ── Section label: Explore by Track ── */}
        <div style={{
          display: "flex", alignItems: "center", gap: 14, marginBottom: 24,
        }}>
          <span style={{
            fontFamily: "Inter, sans-serif", fontSize: 10.5, fontWeight: 700,
            letterSpacing: "3.5px", textTransform: "uppercase" as const,
            color: "rgba(255,255,255,0.30)",
          }}>
            Explore by Track
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
        </div>

        {/* ── Tech track cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {tracks.map((t, i) => (
            <button
              key={t.name}
              onClick={() => router.push("/auth")}
              style={{
                background: "rgba(255,255,255,0.045)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "var(--radius-lg)",
                padding: "34px 16px",
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: 16,
                cursor: "pointer",
                transition: "transform 260ms cubic-bezier(0.4,0,0.2,1), background 260ms ease, border-color 260ms ease, box-shadow 260ms ease",
                willChange: "transform",
                opacity: 0,
                animation: `fadeUp 0.55s cubic-bezier(0.4,0,0.2,1) ${0.35 + i * 0.07}s forwards`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(37,99,235,0.14)";
                el.style.borderColor = "rgba(37,99,235,0.38)";
                el.style.transform = "translateY(-5px)";
                el.style.boxShadow = "0 18px 48px rgba(0,0,0,0.38), 0 0 0 1px rgba(37,99,235,0.22)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(255,255,255,0.045)";
                el.style.borderColor = "rgba(255,255,255,0.09)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              <div style={{ color: "rgba(255,255,255,0.72)" }}>{t.icon}</div>
              <span style={{
                fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13,
                color: "rgba(255,255,255,0.78)", textAlign: "center", lineHeight: 1.3,
              }}>
                {t.name}
              </span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ---------------- LANDING ROOT ---------------- */
export function Landing() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* Sticky ticker — scrolls naturally, locks just below the 68px navbar */}
        <div style={{ position: "sticky", top: 68, zIndex: 30 }}>
          <StatsTicker />
        </div>

        <ExploreSection />

        <BaseGroundWithAssessments onExplore={() => router.push("/auth")} />
        <div className="mx-auto h-px max-w-[1200px]" style={{ background: "var(--color-border)" }} />

        <ProductSection
          id="proving-ground"
          tag="PROVING GROUND"
          heading="Practice a Full Exam in 90 Minutes, Not Weeks of Guessing."
          body="At this stage, you're not just studying, you're testing yourself seriously. You'll face the same format, timing, and pressure you'll see in the actual exam."
          features={[
            "Mock tests based on real exam patterns",
            "Full-length tests with clear result breakdown",
            "See where you lost marks and what to fix",
            "Retake tests until you feel fully prepared",
          ]}
          cta="Enter Proving Ground →"
          onCta={() => router.push("/auth")}
          mockup={<ProvingGroundDashboard />}
          reverse
          rawMockup
          showMockupFromMd
          shiftMockupLeft
        />
        <div className="mx-auto h-px max-w-[1200px]" style={{ background: "var(--color-border)" }} />

        <ProductSection
          id="xone"
          tag="XONE"
          heading="Interview Practice That Feels Real."
          body="Xone simulates real interview conditions with relevant questions and clear feedback. Practice, refine your responses, and build confidence before it matters."
          features={[
            "Real interview questions, not theory",
            "Clear, actionable feedback on your responses",
            "Practice without limits, improve with each attempt",
            "Builds confidence through repeated, realistic practice",
          ]}
          cta="Start Mock Interview →"
          onCta={() => router.push("/auth")}
          mockup={<XoneVideoMockup />}
          rawMockup
          showMockupOnMobile
        />
        <div className="mx-auto h-px max-w-[1200px]" style={{ background: "var(--color-border)" }} />

        <ProductSection
          id="walkways-section"
          tag="WALKWAYS"
          heading={<>Stop Figuring It Out Alone.<br />Your AI Career Guide Is Here.</>}
          body="Most people waste months going in circles... watching videos, reading blogs, still not sure what to do next. WalkWays cuts through all of that. Tell it where you want to go, and it maps out exactly how to get there, certification by certification, step by step."
          features={[
            "Clear guidance based on how you actually perform",
            "Roadmaps built around your goals",
            "Adjusts to your pace as you improve",
            "Takes you from basics to being fully exam-ready",
          ]}
          cta="Start Your WalkWay, Take Your Demo →"
          onCta={() => router.push("/walkways")}
          mockup={<WalkWaysMiniMockup />}
          rawMockup
          reverse
        />

        <WalkWaysRoadmap />
        
        {/* Smooth Gradient Transition: Light Blue → Dark Blue */}
        {/* FAQ Section with Deep Dark Background */}
        <section
          className="relative overflow-hidden"
          style={{
            background: `
              linear-gradient(
                to bottom,
                #F0F6FF 0%,
                #FFFFFF 4%,
                #F0F6FF 8%,
                #D8EBFF 12%,
                #143C78 18%,
                #0F172A 27%,
                #091438 42%,
                #070D22 66%,
                #050820 84%,
                #0A0F1F 100%
              )
            `,
            marginTop: 0,
          }}
        >
          <div aria-hidden className="pointer-events-none absolute" style={{
            width: 600, height: 600, top: -160, left: -120,
            background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)",
            filter: "blur(80px)", borderRadius: 999,
          }} />
          <div aria-hidden className="pointer-events-none absolute" style={{
            width: 700, height: 700, bottom: -200, right: -150,
            background: "radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 70%)",
            filter: "blur(100px)", borderRadius: 999,
          }} />
          <div aria-hidden className="pointer-events-none absolute" style={{
            width: 800, height: 400,
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(ellipse, rgba(96,165,250,0.10) 0%, transparent 65%)",
            filter: "blur(60px)",
          }} />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0"
            style={{
              height: 220,
              background:
                "linear-gradient(to bottom, rgba(10,15,31,0), rgba(10,15,31,0.7) 48%, #0A0F1F 100%)",
            }}
          />
          <FAQSection
            title="Everything you need to know."
            items={FAQS}
          />
        </section>
        <FirstMockTestCTA />
        <Footer />
      </main>
    </>
  );
}

export default Landing;
