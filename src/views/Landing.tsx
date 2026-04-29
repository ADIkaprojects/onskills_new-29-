"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { StatsTicker } from "@/components/StatsTicker";
import { ASSESSMENTS, type Assessment } from "@/data/assessments";
import { WalkWaysRoadmap } from "@/components/WalkWaysRoadmap";
import AssessmentCard from "@/components/ui/assessment-card";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { FAQSection } from "@/components/ui/faq-section";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import { FloatingPaths } from "@/components/ui/background-paths";

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
  const { word, visible } = useTypewriter(["Certify", "Secure", "Upgrade", "Train"], 2200);

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

      {/* ── Animated blue path lines ── */}
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />

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
          Skill Certification Reimagined
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
          The only platform where skills are earned through structured learning and proven through
          real-world challenges.
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
          className="mt-10 flex flex-col items-center gap-5"
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
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            Trusted by teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              { name: "Airbnb", slug: "airbnb" },
              { name: "Stripe", slug: "stripe" },
              { name: "GitHub", slug: "github" },
              { name: "Atlassian", slug: "atlassian" },
              { name: "Google", slug: "google" },
              { name: "Figma", slug: "figma" },
              { name: "PayPal", slug: "paypal" },
              { name: "Notion", slug: "notion" },
              { name: "Spotify", slug: "spotify" },
            ].map((company) => (
              <img
                key={company.slug}
                src={`https://cdn.simpleicons.org/${company.slug}`}
                alt={company.name}
                title={company.name}
                style={{
                  height: "36px",
                  width: "auto",
                  opacity: 0.4,
                  filter: "brightness(0)",
                  transition: "opacity 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.75";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.4";
                }}
              />
            ))}
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
}: {
  id: string;
  tag: string;
  heading: string;
  body: string;
  features: string[];
  cta: string;
  onCta: () => void;
  mockup: React.ReactNode;
  reverse?: boolean;
  hideMockupOnMobile?: boolean;
  /** Strip the navy card shell — lets the mockup own its own visual (e.g. video) */
  rawMockup?: boolean;
  /** Show the mockup on mobile screens too (below the text) */
  showMockupOnMobile?: boolean;
}) {
  const ref = useScrollReveal();
  return (
    <section id={id} ref={ref} className="py-12">
      <div
        className={`mx-auto grid max-w-[1200px] items-center gap-12 ${reverse ? "lg:[grid-template-areas:'mock_text']" : "lg:[grid-template-areas:'text_mock']"} grid-cols-1 lg:grid-cols-2`}
        style={{ minHeight: 480 }}
      >
        <div className={reverse ? "lg:[grid-area:text]" : "lg:[grid-area:text]"} style={{ gridArea: "text" }}>
          <TagPill>{tag}</TagPill>
          <h2
            className="mt-4"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 42px)",
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
        <div
          className={showMockupOnMobile ? "block" : "hidden lg:block"}
          style={{ gridArea: "mock" }}
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
    let scrollTimeout = gsap.delayedCall(1, () => { allowScroll = true; }).pause();
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
          <TagPill>Base Ground</TagPill>
          <h2
            className="mt-4"
            style={{
              fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 42px)",
              color: "var(--color-navy)", lineHeight: 1.15, letterSpacing: "-0.01em",
            }}
          >
            Build Your Foundation<br />Before You Compete.
          </h2>
          <p
            className="mt-4"
            style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: "var(--color-gray-text)", lineHeight: 1.65, maxWidth: 480 }}
          >
            Self-paced. Milestone-driven. Role-specific learning paths curated by experts who&apos;ve been where you want to go.
          </p>
          <ul className="mt-6 space-y-2.5">
            {[
              "Expert-curated curriculum",
              "Self-paced with milestone gates",
              "Role-specific tracks",
              "Built-in concept validators",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2.5" style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: "var(--color-navy)" }}>
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
              Assessments
            </div>
            <h3 className="mt-2" style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(22px, 3vw, 32px)", color: "var(--color-navy)", lineHeight: 1.15 }}>
              Choose Your Proving Ground
            </h3>
            <p className="mt-2" style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: "var(--color-gray-text)" }}>
              Each assessment is a real challenge. Earn a verified badge when you pass.
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

function ProvingGroundMockup() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        background: "#050a12",
        boxShadow: "0 32px 80px -16px rgba(0, 0, 0, 0.5)",
      }}
    >
      <style>{`
        @keyframes provingGlow {
          0% { opacity: 0.35; transform: translate3d(0,0,0) scale(1); }
          50% { opacity: 0.6; transform: translate3d(18px,-8px,0) scale(1.04); }
          100% { opacity: 0.35; transform: translate3d(0,0,0) scale(1); }
        }
      `}</style>

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: -120,
          background:
            "radial-gradient(circle at 25% 20%, rgba(29,110,245,0.25), transparent 55%), radial-gradient(circle at 80% 10%, rgba(16,185,129,0.22), transparent 50%), radial-gradient(circle at 70% 80%, rgba(236,72,153,0.18), transparent 55%)",
          filter: "blur(24px)",
          animation: "provingGlow 16s ease-in-out infinite",
        }}
      />

      <div
        style={{
          position: "relative",
          height: 500,
          padding: "26px 24px 22px",
          display: "grid",
          gridTemplateRows: "auto 1fr",
          gap: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{
              fontFamily: "IBM Plex Sans, sans-serif",
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(203,213,225,0.54)",
            }}>
              Proving Ground
            </div>
            <div style={{
              fontFamily: "Fraunces, serif",
              fontSize: 34,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.01em",
              color: "#e2e8f0",
              marginTop: 10,
            }}>
              Live Assessments
            </div>
          </div>
        </div>

        <AnimatedTabs defaultTab="aws" className="max-w-none" />
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

  // New SVG icons
  const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
  );
  
  const CurrentIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6" /></svg>
  );

  const LockIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
  );

  const nodes = [
    { label: "The Spark",      icon: <CheckIcon />,    color: "var(--color-accent)",       ring: "0 0 0 4px rgba(37,99,235,0.25)", bg: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", textColor: "rgba(255,255,255,0.9)" },
    { label: "Base Camp",      icon: <CheckIcon />,    color: "var(--color-accent)",       ring: "0 0 0 4px rgba(37,99,235,0.25)", bg: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", textColor: "rgba(255,255,255,0.9)" },
    { label: "First Proof",    icon: <CurrentIcon />,  color: "var(--color-warning)",      ring: "0 0 0 4px rgba(245,158,11,0.25)", bg: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", textColor: "var(--color-warning)", isCurrent: true },
    { label: "Certified",      icon: <LockIcon />,     color: "rgba(255,255,255,0.3)",  ring: "none", bg: "rgba(255,255,255,0.05)", textColor: "rgba(255,255,255,0.3)" },
    { label: "Professional",   icon: <LockIcon />,     color: "rgba(255,255,255,0.3)",  ring: "none", bg: "rgba(255,255,255,0.05)", textColor: "rgba(255,255,255,0.3)" },
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
    <div ref={containerRef} className="flex w-full flex-col p-2">
      {/* Header row */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-blue-500/20 bg-blue-500/10 text-blue-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <span className="text-[15px] font-semibold tracking-wide text-white/90" style={{ fontFamily: "Inter, sans-serif" }}>
            Your WalkWay
          </span>
          {/* "Live" pulse dot */}
          <div className="ml-1 relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" style={{ animation: triggered ? "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite" : "none" }}></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
          </div>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-white/50">
          5 Stages
        </span>
      </div>

      {/* Stage track — DESKTOP */}
      <div className="relative mb-8 mt-12 hidden items-start justify-between sm:flex">
        {/* Ghost track */}
        <div className="absolute left-[10%] right-[10%] top-5 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-white/5" />
        
        {/* Animated fill line */}
        <div
          className="absolute left-[10%] top-5 h-[2px] -translate-y-1/2 rounded-full"
          style={{
            background: "linear-gradient(90deg, #3b82f6, #60A5FA)",
            width: triggered ? "42%" : "0%",
            transition: "width 1300ms cubic-bezier(0.4,0,0.2,1)",
            transitionDelay: "150ms",
            boxShadow: "0 0 12px rgba(59,130,246,0.8)",
          }}
        />
        
        {nodes.map((n, i) => {
          const delay = 280 + i * 140;
          return (
            <div key={n.label} className="group relative z-10 flex cursor-default flex-col items-center" style={{ flex: 1 }}>
              <div 
                className="relative flex items-center justify-center transition-all"
                style={{
                  width: 40, height: 40, borderRadius: "12px",
                  background: triggered ? n.bg : "rgba(255,255,255,0.03)",
                  color: triggered ? (n.isCurrent ? "#fff" : n.color) : "rgba(255,255,255,0.1)",
                  boxShadow: triggered ? (n.isCurrent ? "0 0 0 1px rgba(245,158,11,0.5), 0 0 20px rgba(245,158,11,0.3)" : "0 0 0 1px rgba(255,255,255,0.1)") : "0 0 0 1px rgba(255,255,255,0.05)",
                  transform: triggered ? (n.isCurrent ? "scale(1.1)" : "scale(1)") : "scale(0.8)",
                  opacity: triggered ? 1 : 0,
                  transition: `transform 500ms cubic-bezier(0.34,1.56,0.64,1) ${delay}ms, opacity 350ms ease ${delay}ms, background 400ms ease ${delay}ms`,
                }}
              >
                {/* Glow behind current */}
                {n.isCurrent && triggered && (
                  <div className="absolute inset-0 animate-pulse rounded-[12px] bg-amber-500/20 blur-md" />
                )}
                <div className="relative z-10 text-white drop-shadow-md">
                  {n.icon}
                </div>
              </div>
              
              <span 
                className="mt-4 text-center font-medium tracking-wide" 
                style={{
                  fontFamily: "Inter, sans-serif", fontSize: 12,
                  color: triggered ? n.textColor : "rgba(255,255,255,0)",
                  opacity: triggered ? 1 : 0,
                  transform: triggered ? "translateY(0)" : "translateY(10px)",
                  transition: `opacity 380ms ease ${delay + 160}ms, transform 380ms ease ${delay + 160}ms, color 380ms ease ${delay + 160}ms`,
                }}
              >
                {n.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* MOBILE: compact list */}
      <div className="mt-6 flex flex-col gap-3 sm:hidden">
        {nodes.map((n, i) => {
          const delay = 200 + i * 100;
          const isActive = i < 2;
          const isCurrent = i === 2;
          
          return (
            <div
              key={n.label}
              className="flex items-center gap-4 rounded-xl px-4 py-3"
              style={{
                background: isActive ? "linear-gradient(90deg, rgba(37,99,235,0.1), rgba(37,99,235,0.02))" : isCurrent ? "linear-gradient(90deg, rgba(245,158,11,0.15), rgba(245,158,11,0.02))" : "rgba(255,255,255,0.02)",
                border: `1px solid ${isActive ? "rgba(37,99,235,0.2)" : isCurrent ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.05)"}`,
                opacity: triggered ? 1 : 0,
                transform: triggered ? "translateX(0)" : "translateX(-10px)",
                transition: `opacity 350ms ease ${delay}ms, transform 350ms ease ${delay}ms`,
              }}
            >
              <div 
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] shadow-sm"
                style={{
                  background: n.bg,
                  color: "#fff",
                  boxShadow: isCurrent ? "0 0 12px rgba(245,158,11,0.3)" : "none",
                }}
              >
                {n.icon}
              </div>
              <span 
                className="font-medium tracking-wide"
                style={{
                  fontFamily: "Inter, sans-serif", fontSize: 13,
                  color: isActive || isCurrent ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
                }}
              >
                {n.label}
              </span>
              {isCurrent && (
                <span className="ml-auto text-[10px] font-bold uppercase tracking-widest text-amber-500">In Progress</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Dashboard Section */}
      <div className="mt-8 rounded-xl border border-white/5 bg-[#0B1220]/50 p-5 backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Overall Progress</span>
            <span className="text-[13px] font-semibold text-white/80" style={{ fontFamily: "Inter, sans-serif" }}>Track Milestone</span>
          </div>
          <span
            className="text-2xl font-bold tracking-tight"
            style={{
              fontFamily: "Inter, sans-serif",
              background: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              opacity: triggered ? 1 : 0,
              transform: triggered ? "translateY(0)" : "translateY(5px)",
              transition: "opacity 400ms ease 800ms, transform 400ms ease 800ms",
            }}
          >
            {progress}%
          </span>
        </div>

        {/* Bar track */}
        <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/5 shadow-inner">
          <div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #2563EB, #60A5FA, #93C5FD)",
              width: triggered ? `${TARGET}%` : "0%",
              transition: "width 1500ms cubic-bezier(0.2, 0.8, 0.2, 1)",
              transitionDelay: "500ms",
              boxShadow: "0 0 12px rgba(96,165,250,0.6)",
            }}
          />
          {/* Subtle light reflection on the bar */}
          <div className="absolute left-0 top-0 h-[1px] w-full bg-white/30" />
        </div>

        {/* Sub-labels */}
        <div className="mt-4 flex justify-between px-1">
          {["Learning", "Practicing", "Certified", "Hired"].map((lbl, i) => (
            <div key={lbl} className="flex flex-col items-center gap-1.5">
              <div 
                className="h-1.5 w-1.5 rounded-full" 
                style={{
                  background: i < 2 ? "#60A5FA" : "rgba(255,255,255,0.1)",
                  boxShadow: i < 2 ? "0 0 6px rgba(96,165,250,0.6)" : "none",
                  opacity: triggered ? 1 : 0,
                  transition: `opacity 350ms ease ${700 + i * 80}ms`,
                }}
              />
              <span
                className="font-medium tracking-wide"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10,
                  color: i < 2 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)",
                  opacity: triggered ? 1 : 0,
                  transition: `opacity 350ms ease ${750 + i * 80}ms`,
                }}
              >
                {lbl}
              </span>
            </div>
          ))}
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
    <footer style={{ background: "var(--color-navy)", padding: "64px max(5vw, 24px) 0", marginTop: -1 }}>
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
      background: "rgba(37,99,235,0.10)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid rgba(37,99,235,0.22)",
      borderRadius: 14, padding: "10px 16px",
      display: "flex", alignItems: "center", gap: 9,
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
      background: "rgba(37,99,235,0.10)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid rgba(37,99,235,0.20)",
      borderRadius: 12, padding: "9px 15px",
      display: "flex", flexDirection: "column", gap: 4,
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
      position: "absolute", bottom: "32%", right: "5%",
      background: "rgba(245,158,11,0.09)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid rgba(245,158,11,0.20)",
      borderRadius: 12, padding: "10px 15px",
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
      background: "rgba(96,165,250,0.09)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid rgba(96,165,250,0.18)",
      borderRadius: 12, padding: "8px 14px",
      display: "flex", alignItems: "center", gap: 8,
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
      background: "rgba(239,68,68,0.09)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid rgba(239,68,68,0.18)",
      borderRadius: 99, padding: "7px 14px",
      display: "flex", alignItems: "center", gap: 7,
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
        padding: "200px max(5vw, 40px) 200px",
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
          height: 380,
          background: "linear-gradient(to bottom, #ffffff 0%, rgba(219,234,254,0.98) 12%, rgba(147,197,253,0.70) 28%, rgba(59,130,246,0.40) 50%, rgba(37,99,235,0.10) 72%, transparent 100%)",
          pointerEvents: "none", zIndex: 4,
        }}
      />

      {/* ── BOTTOM bulrush transition: navy → electric-blue → white ── */}
      <div
        aria-hidden
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 380,
          background: "linear-gradient(to top, #ffffff 0%, rgba(219,234,254,0.98) 12%, rgba(147,197,253,0.70) 28%, rgba(59,130,246,0.40) 50%, rgba(37,99,235,0.10) 72%, transparent 100%)",
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
        <section id="products" style={{ marginBottom: 96, opacity: 0, animation: "fadeUp 0.65s cubic-bezier(0.4,0,0.2,1) 0.1s forwards" }}>
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
          display: "flex", alignItems: "center", gap: 14, marginBottom: 40,
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
          tag="Proving Ground"
          heading="Where Skills Stop Being Theory."
          body="Real-world challenges, AI scoring, and verified skill scores employers actually trust."
          features={[
            "Timed assessments",
            "AI-assisted + peer evaluation",
            "Live leaderboard",
            "Instant verified badge",
          ]}
          cta="Enter Proving Ground →"
          onCta={() => router.push("/auth")}
          mockup={<ProvingGroundMockup />}
          rawMockup
          reverse
        />
        <div className="mx-auto h-px max-w-[1200px]" style={{ background: "var(--color-border)" }} />

        <ProductSection
          id="xone"
          tag="Xone"
          heading="Ace Your Next Technical Interview. With AI."
          body="AI-powered mock interviews that simulate real technical rounds at top companies. Get instant feedback on your code, problem-solving approach, and communication — then chat with your AI interviewer to go deeper."
          features={[
            "Timed coding, system design & behavioral rounds",
            "AI feedback on code quality & approach",
            "Questions modeled on Google, Meta, Stripe & more",
            "Chat with your AI interviewer post-round",
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
          tag="WalkWays"
          heading="The Road from Beginner to Professional. Mapped."
          body="Guided progression: Base Ground → Proving Ground → Xone, in the exact sequence that takes you from learning to certified to interview-ready."
          features={[
            "Visual milestone roadmaps",
            "Adaptive path suggestions",
            "Community checkpoints",
            "Professional Track Certificate",
          ]}
          cta="Start Your WalkWay →"
          onCta={() => router.push("/walkways")}
          mockup={<WalkWaysMiniMockup />}
          reverse
        />

        <WalkWaysRoadmap />
        
        {/* Smooth Gradient Transition: Light Blue → Dark Blue */}
        <section
          className="relative overflow-hidden"
          style={{
            background: `
              linear-gradient(
                180deg,
                #F0F6FF     0%,
                #E8F0FE     8%,
                #D4E5FB     16%,
                #B5D4F5     28%,
                #8DBDE5     42%,
                #5A9BD8     56%,
                #3680C9     66%,
                #1F5BA3     76%,
                #0F3D7A     84%,
                #091C4E     92%,
                #0F172A    100%
              )
            `,
            padding: "80px max(5vw, 24px)",
            marginTop: -2,
            position: "relative",
          }}
        >
          {/* Subtle animated gradient overlay for depth */}
          <div 
            aria-hidden 
            className="pointer-events-none absolute inset-0" 
            style={{
              background: `
                linear-gradient(
                  135deg,
                  rgba(255,255,255,0.08) 0%,
                  rgba(255,255,255,0.02) 50%,
                  rgba(37,99,235,0.04) 100%
                )
              `,
              mixBlendMode: "overlay",
            }}
          />
        </section>

        {/* FAQ Section with Deep Dark Background */}
        <section
          className="relative overflow-hidden"
          style={{
            background: `
              linear-gradient(
                to bottom,
                #0F172A    0%,
                #091438   20%,
                #070D22   50%,
                #050820   72%,
                #0A0F1F  100%
              )
            `,
            marginTop: -1,
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
          <FAQSection
            title="Everything you need to know."
            items={FAQS}
          />
        </section>
        <Footer />
      </main>
    </>
  );
}

export default Landing;