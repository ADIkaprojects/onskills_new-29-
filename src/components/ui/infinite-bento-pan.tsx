"use client";

import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

/* ─── Constants ──────────────────────────────────────────────────────────── */
const SUPER_W = 1280;
const SUPER_H = 720;

/* ─── Types ───────────────────────────────────────────────────────────────── */
type CardKind =
  | "cert"
  | "assessment"
  | "question"
  | "score"
  | "counter"
  | "chart"
  | "bars"
  | "streak"
  | "badge";

interface CardDef {
  x: number;
  y: number;
  w: number;
  h: number;
  kind: CardKind;
  accent: string;
  label?: string;
  meta?: string;
  price?: string;
}

/* ─── Noise helper ────────────────────────────────────────────────────────── */
function noise(seed: number, t: number): number {
  const s = Math.sin(seed * 127.1 + t * 0.04) * 43758.5453;
  return s - Math.floor(s);
}

/* ─── Accent palette ─────────────────────────────────────────────────────── */
const ACCENTS = [
  "#1D6EF5", "#10B981", "#F59E0B", "#8B5CF6",
  "#EF4444", "#06B6D4", "#EC4899", "#14B8A6",
];
const acc = (i: number) => ACCENTS[i % ACCENTS.length];

/* ─── 48-card CARDS array ─────────────────────────────────────────────────── */
const CARDS: CardDef[] = [
  // cert (8)
  { x: 0,    y: 0,   w: 300, h: 160, kind: "cert",       accent: acc(0), label: "JavaScript Pro" },
  { x: 320,  y: 0,   w: 260, h: 160, kind: "cert",       accent: acc(1), label: "React Engineer" },
  { x: 600,  y: 0,   w: 260, h: 160, kind: "cert",       accent: acc(2), label: "System Design" },
  { x: 880,  y: 0,   w: 260, h: 160, kind: "cert",       accent: acc(3), label: "Node.js Backend" },
  { x: 0,    y: 540, w: 300, h: 160, kind: "cert",       accent: acc(4), label: "Python Core" },
  { x: 320,  y: 540, w: 260, h: 160, kind: "cert",       accent: acc(5), label: "DevOps CI/CD" },
  { x: 600,  y: 540, w: 260, h: 160, kind: "cert",       accent: acc(6), label: "TypeScript Expert" },
  { x: 880,  y: 540, w: 260, h: 160, kind: "cert",       accent: acc(7), label: "Frontend L3" },

  // assessment (8)
  { x: 0,    y: 180, w: 300, h: 180, kind: "assessment", accent: acc(1), label: "JavaScript Core",  meta: "Intermediate", price: "$12" },
  { x: 320,  y: 180, w: 260, h: 180, kind: "assessment", accent: acc(2), label: "React Hooks",      meta: "Advanced",     price: "$18" },
  { x: 600,  y: 180, w: 260, h: 180, kind: "assessment", accent: acc(3), label: "Async Patterns",   meta: "Intermediate", price: "$12" },
  { x: 880,  y: 180, w: 260, h: 180, kind: "assessment", accent: acc(4), label: "REST API Design",  meta: "Beginner",     price: "$8"  },
  { x: 0,    y: 380, w: 300, h: 140, kind: "assessment", accent: acc(5), label: "SQL Fundamentals", meta: "Beginner",     price: "$8"  },
  { x: 320,  y: 380, w: 260, h: 140, kind: "assessment", accent: acc(6), label: "CSS Layouts",      meta: "Intermediate", price: "$12" },
  { x: 600,  y: 380, w: 260, h: 140, kind: "assessment", accent: acc(7), label: "Git Workflows",    meta: "Beginner",     price: "$8"  },
  { x: 880,  y: 380, w: 260, h: 140, kind: "assessment", accent: acc(0), label: "Browser APIs",     meta: "Advanced",     price: "$18" },

  // question (8)
  { x: 1160, y: 0,   w: 280, h: 180, kind: "question",   accent: acc(2), label: "debounce.ts" },
  { x: 1460, y: 0,   w: 280, h: 180, kind: "question",   accent: acc(3), label: "flatten.ts" },
  { x: 1160, y: 200, w: 280, h: 180, kind: "question",   accent: acc(4), label: "memoize.ts" },
  { x: 1460, y: 200, w: 280, h: 180, kind: "question",   accent: acc(5), label: "compose.ts" },
  { x: 1160, y: 400, w: 280, h: 160, kind: "question",   accent: acc(6), label: "promise.ts" },
  { x: 1460, y: 400, w: 280, h: 160, kind: "question",   accent: acc(7), label: "retry.ts" },
  { x: 1160, y: 580, w: 280, h: 130, kind: "question",   accent: acc(0), label: "deepEqual.ts" },
  { x: 1460, y: 580, w: 280, h: 130, kind: "question",   accent: acc(1), label: "throttle.ts" },

  // score (6)
  { x: 1760, y: 0,   w: 200, h: 200, kind: "score",   accent: acc(0), label: "Score" },
  { x: 1980, y: 0,   w: 200, h: 200, kind: "score",   accent: acc(1), label: "Accuracy" },
  { x: 1760, y: 220, w: 200, h: 160, kind: "score",   accent: acc(2), label: "Rank %ile" },
  { x: 1980, y: 220, w: 200, h: 160, kind: "score",   accent: acc(3), label: "Pass Rate" },
  { x: 1760, y: 400, w: 200, h: 160, kind: "score",   accent: acc(4), label: "Code Quality" },
  { x: 1980, y: 400, w: 200, h: 160, kind: "score",   accent: acc(5), label: "Efficiency" },

  // counter (6)
  { x: 2200, y: 0,   w: 260, h: 180, kind: "counter", accent: acc(3), label: "Submissions" },
  { x: 2480, y: 0,   w: 260, h: 180, kind: "counter", accent: acc(4), label: "Certifications" },
  { x: 2200, y: 200, w: 260, h: 160, kind: "counter", accent: acc(5), label: "Active Users" },
  { x: 2480, y: 200, w: 260, h: 160, kind: "counter", accent: acc(6), label: "Problems Solved" },
  { x: 2200, y: 380, w: 260, h: 160, kind: "counter", accent: acc(7), label: "Badges Earned" },
  { x: 2480, y: 380, w: 260, h: 160, kind: "counter", accent: acc(0), label: "Streak Days" },

  // chart (6)
  { x: 2760, y: 0,   w: 300, h: 180, kind: "chart", accent: acc(1), label: "Submissions" },
  { x: 3080, y: 0,   w: 300, h: 180, kind: "chart", accent: acc(2), label: "Pass Rate" },
  { x: 2760, y: 200, w: 300, h: 160, kind: "chart", accent: acc(3), label: "Avg Score" },
  { x: 3080, y: 200, w: 300, h: 160, kind: "chart", accent: acc(4), label: "Daily Active" },
  { x: 2760, y: 380, w: 300, h: 160, kind: "chart", accent: acc(5), label: "Completion" },
  { x: 3080, y: 380, w: 300, h: 160, kind: "chart", accent: acc(6), label: "Revenue" },

  // bars (4)
  { x: 3400, y: 0,   w: 300, h: 260, kind: "bars", accent: acc(7), label: "Track Progress" },
  { x: 3720, y: 0,   w: 300, h: 260, kind: "bars", accent: acc(0), label: "Difficulty Split" },
  { x: 3400, y: 280, w: 300, h: 220, kind: "bars", accent: acc(1), label: "Lang Usage" },
  { x: 3720, y: 280, w: 300, h: 220, kind: "bars", accent: acc(2), label: "Time Spent" },

  // streak (1)
  { x: 4040, y: 0,   w: 340, h: 260, kind: "streak", accent: acc(3), label: "Activity" },

  // badge (1)
  { x: 4040, y: 280, w: 340, h: 220, kind: "badge",  accent: acc(4), label: "Top 5%" },
];

const TOTAL_W = 4400;

/* ─── Sub-card renderers ─────────────────────────────────────────────────── */

function CertCard({ accent, label }: { accent: string; label?: string; t: number; index: number; frame: number }): JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 8 }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: `${accent}22`, border: `1.5px solid ${accent}66`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: `0 0 18px ${accent}44`,
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" fill={accent} />
        </svg>
      </div>
      <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 13, color: "#fff", textAlign: "center" }}>{label}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
          <path d="M20 6L9 17l-5-5" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 600, color: "#10B981" }}>Verified</span>
      </div>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: "rgba(255,255,255,0.35)" }}>Proving Ground · 2025</div>
    </div>
  );
}

function AssessmentCard({ accent, label, meta, price }: { accent: string; label?: string; meta?: string; price?: string; t: number; index: number; frame: number }): JSX.Element {
  const diffColor = meta === "Advanced" ? "#EF4444" : meta === "Intermediate" ? "#F59E0B" : "#10B981";
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", padding: "4px 0" }}>
      <div>
        <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 12, color: "#fff", marginBottom: 6 }}>{label}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
          <div style={{ display: "flex", gap: 2 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 3, height: 6 + i * 3, borderRadius: 2, background: i <= (meta === "Advanced" ? 2 : meta === "Intermediate" ? 1 : 0) ? diffColor : "rgba(255,255,255,0.15)" }} />
            ))}
          </div>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: diffColor, fontWeight: 600 }}>{meta}</span>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 800, color: accent }}>{price}</span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.06)", borderRadius: 6, padding: "2px 6px" }}>45 min</span>
      </div>
    </div>
  );
}

function QuestionCard({ accent, label }: { accent: string; label?: string; t: number; index: number; frame: number }): JSX.Element {
  const lines = [
    { w: "70%", color: "#ff7b72" },
    { w: "90%", color: "#d2a8ff" },
    { w: "55%", color: "#79c0ff" },
    { w: "80%", color: "#c9d1d9" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{label}</span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 8, fontWeight: 700, color: accent, background: `${accent}22`, border: `1px solid ${accent}44`, borderRadius: 4, padding: "1px 5px" }}>AI Task</span>
      </div>
      {lines.map((l, i) => (
        <div key={i} style={{ height: 8, borderRadius: 4, background: `${l.color}33`, width: l.w }} />
      ))}
      <div style={{ marginTop: 6, fontFamily: "Inter, sans-serif", fontSize: 9, color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>
        Implement a function that…
      </div>
    </div>
  );
}

function ScoreCard({ accent, label, index, frame }: { accent: string; label?: string; t: number; index: number; frame: number }): JSX.Element {
  const raw = noise(index * 7, frame);
  const value = (78 + raw * 21).toFixed(1);
  const sparkPts = Array.from({ length: 8 }, (_, i) => noise(index + i * 3, frame + i * 4));
  const pts = sparkPts.map((v, i) => `${i * 20},${20 - v * 14}`).join(" ");
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", gap: 6 }}>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.45)" }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 28, color: "#fff" }}>{value}</span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>%</span>
      </div>
      <svg width="140" height="24" viewBox="0 0 140 24" fill="none">
        <polyline points={pts} stroke={accent} strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
}

function CounterCard({ accent, label, index, frame }: { accent: string; label?: string; t: number; index: number; frame: number }): JSX.Element {
  const bases: Record<string, number> = {
    "Submissions": 12847, "Certifications": 3241, "Active Users": 8923,
    "Problems Solved": 47182, "Badges Earned": 15634, "Streak Days": 42
  };
  const base = bases[label ?? ""] ?? 10000;
  const delta = Math.floor(noise(index * 13, frame) * 20);
  const value = (base + delta).toLocaleString();
  const growth = (noise(index * 5, frame) * 3 + 0.5).toFixed(1);
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", gap: 4 }}>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{label}</div>
      <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 22, color: "#fff" }}>{value}</div>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: accent, fontWeight: 600 }}>+{growth}% this week</div>
    </div>
  );
}

function ChartCard({ accent, label, index, frame }: { accent: string; label?: string; t: number; index: number; frame: number }): JSX.Element {
  const pts = Array.from({ length: 10 }, (_, i) => noise(index * 3 + i, frame + i * 5));
  const svgPts = pts.map((v, i) => `${i * 22},${40 - v * 32}`).join(" ");
  const fillPts = `${svgPts} ${(pts.length - 1) * 22},44 0,44`;
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 6 }}>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>{label}</div>
      <svg width="100%" height="52" viewBox="0 0 198 52" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id={`cg${index}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={fillPts} fill={`url(#cg${index})`} />
        <polyline points={svgPts} stroke={accent} strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function BarsCard({ accent, label, index, frame }: { accent: string; label?: string; t: number; index: number; frame: number }): JSX.Element {
  const bars = Array.from({ length: 6 }, (_, i) => noise(index * 4 + i, frame + i * 6));
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 8 }}>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 60 }}>
        {bars.map((v, i) => (
          <div key={i} style={{ flex: 1, height: `${20 + v * 80}%`, borderRadius: "3px 3px 0 0", background: `${accent}${i === bars.indexOf(Math.max(...bars)) ? "ff" : "66"}` }} />
        ))}
      </div>
    </div>
  );
}

function StreakCard({ accent, index, frame }: { accent: string; label?: string; t: number; index: number; frame: number }): JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 8 }}>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>Activity</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3 }}>
        {Array.from({ length: 35 }, (_, k) => {
          const v = noise(index + k, frame + k * 2);
          return (
            <div key={k} style={{
              aspectRatio: "1/1", borderRadius: 3,
              background: v > 0.5 ? accent : "rgba(255,255,255,0.06)",
              opacity: v > 0.5 ? 0.5 + v * 0.5 : 1,
            }} />
          );
        })}
      </div>
    </div>
  );
}

function BadgeCard({ accent }: { accent: string; label?: string; t: number; index: number; frame: number }): JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 8 }}>
      <div style={{ boxShadow: `0 0 32px ${accent}66` }}>
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" fill={accent} />
        </svg>
      </div>
      <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 18, color: "#fff" }}>Top 5%</div>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.35)" }}>Leaderboard Rank</div>
    </div>
  );
}

/* ─── Card dispatcher ────────────────────────────────────────────────────── */
function Card({ card, t, frame }: { card: CardDef; t: number; frame: number }): JSX.Element {
  const props = { accent: card.accent, label: card.label, meta: card.meta, price: card.price, t, index: CARDS.indexOf(card), frame };
  let inner: JSX.Element;
  switch (card.kind) {
    case "cert":       inner = <CertCard {...props} />; break;
    case "assessment": inner = <AssessmentCard {...props} />; break;
    case "question":   inner = <QuestionCard {...props} />; break;
    case "score":      inner = <ScoreCard {...props} />; break;
    case "counter":    inner = <CounterCard {...props} />; break;
    case "chart":      inner = <ChartCard {...props} />; break;
    case "bars":       inner = <BarsCard {...props} />; break;
    case "streak":     inner = <StreakCard {...props} />; break;
    case "badge":      inner = <BadgeCard {...props} />; break;
    default:           inner = <div />;
  }
  return (
    <div
      style={{
        position: "absolute",
        left: card.x, top: card.y,
        width: card.w, height: card.h,
        background: "rgba(13,19,32,0.82)",
        border: `1px solid ${card.accent}28`,
        borderRadius: 14,
        padding: 14,
        backdropFilter: "blur(12px)",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute", inset: 0, borderRadius: 14,
          background: `radial-gradient(circle at 80% 20%, ${card.accent}14 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, height: "100%" }}>{inner}</div>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────────────────────── */
export function InfiniteBentoPan({
  accentColor: _accentColor = "#1D6EF5",
  panSpeed = 0.6,
  speed = 0.8,
}: {
  accentColor?: string;
  panSpeed?: number;
  speed?: number;
}): JSX.Element {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const effectiveFrame = frame * speed;
  const maxOffset = TOTAL_W - SUPER_W;
  const rawPan = interpolate(effectiveFrame, [0, 600 * speed], [0, maxOffset * panSpeed], { extrapolateRight: "wrap" });
  const panX = ((rawPan % maxOffset) + maxOffset) % maxOffset;

  const t = effectiveFrame * 0.016;

  const scaleX = width / SUPER_W;
  const scaleY = height / SUPER_H;

  return (
    <div style={{ width, height, background: "#050a12", overflow: "hidden", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: TOTAL_W,
          height: SUPER_H,
          transform: `translateX(${-panX}px) scale(${scaleX}, ${scaleY})`,
          transformOrigin: "top left",
        }}
      >
        {CARDS.map((card, i) => (
          <Card key={i} card={card} t={t} frame={effectiveFrame} />
        ))}
      </div>
    </div>
  );
}
