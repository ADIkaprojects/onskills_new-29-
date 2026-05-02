"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Target,
  ClipboardList,
  Clock3,
  BarChart3,
  Menu,
  Gauge,
  Trophy,
  FileCheck2,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Info,
  Lightbulb,
  Calendar,
  ArrowRight,
  Zap,
  Activity,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

function ProvingGroundOverview() {
  const active = {
    id: "overview",
    label: "Base Ground",
    title: "Performance Trend",
    subtitle: "Your last five full-length exam attempts",
    score: "82%",
    scoreLabel: "Readiness Score",
    delta: "+6%",
    accuracy: "76%",
    rank: "#12",
    rankLabel: "Top 15%",
    speed: "1.2m",
    speedLabel: "Avg Time/Q",
    speedDelta: "-0.3m",
    values: [50, 55, 64, 72, 81],
    average: [34, 38, 47, 54, 62],
  };

  // Calculate SVG path points
  const pointsList = active.values.map((val, idx) => `${62 + idx * 65},${216 - val * 1.65}`);
  const chartPoints = pointsList.join(" ");
  const fillPath = `M62,216 L${chartPoints} L${62 + (active.values.length - 1) * 65},216 Z`;

  const averagePoints = active.average
    .map((value, index) => `${62 + index * 65},${216 - value * 1.65}`)
    .join(" ");

  return (
    <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: "24px", height: "100%" }}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "-0.01em", margin: 0, color: "var(--color-navy)" }}>
            {active.label}
          </h3>
          <p style={{ color: "var(--color-gray-text)", fontFamily: "Inter, sans-serif", fontSize: 12, marginTop: 4 }}>
            Track your performance and improve with every test.
          </p>
        </div>
        <span
          style={{
            alignItems: "center",
            background: "#FFF1F2",
            borderRadius: 999,
            color: "#B91C1C",
            display: "inline-flex",
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            fontWeight: 700,
            gap: 8,
            padding: "6px 12px",
            whiteSpace: "nowrap",
            boxShadow: "inset 0 -1px 0 rgba(185,28,28,0.04)",
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#DC2626", boxShadow: "0 0 6px rgba(220,38,38,0.14)", animation: "blink 1.5s infinite" }} />
          Live
          <small style={{ marginLeft: 6, fontSize: 11, color: "#6B7280", fontWeight: 500 }}>• updated moments ago</small>
        </span>
      </div>

      {/* Main Stats Grid */}
      <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
        <section
          style={{
            border: "1px solid rgba(226,232,240,0.8)",
            borderRadius: 16,
            background: "var(--color-bg)",
            boxShadow: "0 8px 20px rgba(15,23,42,0.02)",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="flex flex-wrap items-start justify-between gap-2 mb-6">
            <div>
              <h4 style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 800, margin: 0, color: "var(--color-navy)" }}>
                {active.title}
              </h4>
              <p style={{ color: "#64748B", fontSize: 11, marginTop: 4 }}>{active.subtitle}</p>
            </div>
            <div className="flex items-center gap-4" style={{ color: "#475569", fontSize: 10, fontWeight: 600 }}>
              <span className="flex items-center gap-1.5">
                <span style={{ width: 12, height: 3, borderRadius: 999, background: "var(--color-accent)" }} />
                Your Score
              </span>
              <span className="flex items-center gap-1.5">
                <span style={{ width: 12, height: 3, borderRadius: 999, borderTop: "2px dashed #94A3B8" }} />
                Average
              </span>
            </div>
          </div>

          <svg viewBox="0 0 380 220" width="100%" height="auto" style={{ marginTop: "auto", overflow: "visible" }}>
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.15" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((tick) => (
              <g key={tick}>
                <line x1="54" x2="350" y1={216 - tick * 1.65} y2={216 - tick * 1.65} stroke="#F1F5F9" strokeWidth="1.5" />
                <text x="10" y={220 - tick * 1.65} fill="#94A3B8" fontSize="10" fontWeight="600">{tick}%</text>
              </g>
            ))}

            {/* Area Fill */}
            <path d={fillPath} fill="url(#trendGradient)" />

            {/* Lines */}
            <polyline points={averagePoints} fill="none" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="6 6" />
            <polyline points={chartPoints} fill="none" stroke="var(--color-accent)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Points */}
            {active.values.map((value, index) => (
              <circle key={value + index} cx={62 + index * 65} cy={216 - value * 1.65} r="5.5" fill="#ffffff" stroke="var(--color-accent)" strokeWidth="3" />
            ))}

            {/* Labels */}
            {["Test 1", "Test 2", "Test 3", "Test 4", "Test 5"].map((label, index) => (
              <text key={label} x={50 + index * 65} y="230.6" fill="#64748B" fontSize="10" fontWeight="600">{label}</text>
            ))}
          </svg>
        </section>

        {/* Use flex-col to naturally stack without stretching height */}
        <div className="flex flex-col gap-4">
          {[
            { icon: Trophy, label: active.scoreLabel, value: active.score, note: active.delta, tint: "#ECFDF5", color: "#10B981" },
            { icon: Target, label: "Accuracy", value: active.accuracy, note: "+4%", tint: "#EFF6FF", color: "var(--color-accent)" },
            { icon: FileCheck2, label: "Your Rank", value: active.rank, note: active.rankLabel, tint: "#F8FAFC", color: "#475569" },
            { icon: Zap, label: active.speedLabel, value: active.speed, note: active.speedDelta, tint: "#FEF2F2", color: "#EF4444" },
          ].map((metric) => {
            const Icon = metric.icon;
            return (
              <article
                key={metric.label}
                className="flex items-center gap-4"
                style={{
                  border: "1px solid rgba(226,232,240,0.6)",
                  borderRadius: 14,
                  background: "var(--color-bg)",
                  boxShadow: "0 3px 10px rgba(15,23,42,0.02)",
                  padding: "12px 14px",
                }}
              >
                <div style={{ width: 42, height: 42, borderRadius: 12, background: metric.tint, color: metric.color, display: "grid", placeItems: "center", flexShrink: 0 }}>
                  <Icon size={20} strokeWidth={2} />
                </div>
                <div>
                  <p style={{ color: "#64748B", fontSize: 11, margin: 0, fontWeight: 500 }}>{metric.label}</p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 2 }}>
                    <strong style={{ fontFamily: "Inter, sans-serif", fontSize: 18, lineHeight: 1, color: "var(--color-navy)", fontWeight: 800 }}>{metric.value}</strong>
                    <span style={{ color: metric.color, fontSize: 11, fontWeight: 700 }}>{metric.note}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Replaced Full Mock Test section with Insights / Weaknesses summary to prevent generic AI look */}
      <div className="grid grid-cols-2 gap-5 mt-2">
        <div style={{ padding: "16px 20px", background: "#F8FAFC", borderRadius: 14, border: "1px solid #E2E8F0" }}>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 size={16} color="#10B981" />
            <h4 style={{ fontSize: 12, fontWeight: 700, color: "var(--color-navy)", margin: 0 }}>Current Strengths</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            <span style={{ padding: "4px 10px", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 6, fontSize: 11, fontWeight: 600, color: "#475569" }}>Data Structures (92%)</span>
            <span style={{ padding: "4px 10px", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 6, fontSize: 11, fontWeight: 600, color: "#475569" }}>System Design (88%)</span>
            <span style={{ padding: "4px 10px", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 6, fontSize: 11, fontWeight: 600, color: "#475569" }}>Frontend Architecture (85%)</span>
          </div>
        </div>

        <div style={{ padding: "16px 20px", background: "#FFFBEB", borderRadius: 14, border: "1px solid #FEF3C7" }}>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle size={16} color="#D97706" />
            <h4 style={{ fontSize: 12, fontWeight: 700, color: "#92400E", margin: 0 }}>Priority Focus Areas</h4>
          </div>
          <p style={{ margin: 0, fontSize: 11, color: "#92400E", lineHeight: 1.5, fontWeight: 500 }}>
            Your accuracy in <strong style={{ fontWeight: 700 }}>Operating Systems</strong> is currently at 38%. We recommend reviewing concurrency and memory management before attempting another full mock test.
          </p>
        </div>
      </div>
    </div>
  );
}

function MockTestsView() {
  const tests = [
    { bg: "#FEF3C7", color: "#D97706", tag: "JS", name: "JavaScript Full Mock Test", meta: "90 mins • 100 Qs" },
    { bg: "#EDE9FE", color: "#7C3AED", tag: "DSA", name: "DSA Full Mock Test", meta: "90 mins • 100 Qs" },
    { bg: "#D1FAE5", color: "#059669", tag: "Apt", name: "Aptitude Full Mock Test", meta: "60 mins • 60 Qs" },
    { bg: "#DBEAFE", color: "#2563EB", tag: "CS", name: "Computer Science Mock Test", meta: "90 mins • 100 Qs" },
    { bg: "#FCE7F3", color: "#DB2777", tag: "Sys", name: "System Design Mock Test", meta: "120 mins • 4 Qs" },
    { bg: "#E0E7FF", color: "#4F46E5", tag: "FE", name: "Frontend Architecture Mock Test", meta: "90 mins • 60 Qs" },
  ];

  return (
    <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: "20px", height: "100%" }}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: 22, fontWeight: 800, margin: 0, color: "var(--color-navy)", letterSpacing: "-0.01em" }}>Proving Ground</h3>
          <p style={{ color: "#64748B", fontSize: 12, marginTop: 4 }}>Take full-length tests and track your real exam readiness.</p>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#FFF1F2", color: "#B91C1C", padding: "6px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#DC2626", animation: "blink 1.5s infinite" }} /> Live
        </span>
      </div>

      {/* Top Cards: using grid to match exact width, using specific heights so they don't stretch vertically out of bounds */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
        {[
          { label: "Attempted", val: "12", sub: "This Month", icon: ClipboardList, bg: "#EFF6FF", col: "#2563EB" },
          { label: "Avg Score", val: "72%", sub: "This Month", icon: TrendingUp, bg: "#ECFDF5", col: "#10B981" },
          { label: "Best Score", val: "88%", sub: "JS Mock Test", icon: Trophy, bg: "#F3E8FF", col: "#9333EA" },
          { label: "Avg Time", val: "78 m", sub: "Per Test", icon: Clock3, bg: "#FFFBEB", col: "#F59E0B" },
        ].map((s, i) => (
          <div key={i} style={{ border: "1px solid #E2E8F0", borderRadius: 14, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10, background: "#fff", boxShadow: "0 2px 8px rgba(15,23,42,0.02)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: s.bg, color: s.col, display: "grid", placeItems: "center", flexShrink: 0 }}>
                <s.icon size={18} strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontSize: 20, fontWeight: 800, color: "var(--color-navy)" }}>{s.val}</span>
              </div>
              <div style={{ fontSize: 10, color: "#64748B", fontWeight: 600, marginTop: 2 }}>{s.label}</div>
              <div style={{ fontSize: 9, color: "#94A3B8", marginTop: 2 }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col flex-1" style={{ border: "1px solid #E2E8F0", borderRadius: 14, overflow: "hidden", background: "#fff", boxShadow: "0 4px 12px rgba(15,23,42,0.02)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: "1px solid #E2E8F0", background: "#F8FAFC" }}>
          <h4 style={{ fontWeight: 700, fontSize: 13, color: "var(--color-navy)", margin: 0 }}>Available Mock Tests</h4>
          <button style={{ fontSize: 10, color: "#475569", display: "flex", alignItems: "center", gap: 4, background: "#fff", border: "1px solid #E2E8F0", padding: "4px 8px", borderRadius: 6, fontWeight: 600 }}>All <ChevronDown size={12} /></button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {tests.map((t, i) => (
            <div key={i} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", padding: "10px 18px", gap: "12px", borderBottom: i < tests.length - 1 ? "1px solid #F1F5F9" : "none" }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: t.bg, color: t.color, fontWeight: 800, fontSize: 11, display: "grid", placeItems: "center", flexShrink: 0 }}>{t.tag}</div>
              <div style={{ flex: "1 1 100px" }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: "var(--color-navy)" }}>{t.name}</div>
                <div style={{ fontSize: 11, color: "#64748B", marginTop: 2, fontWeight: 500 }}>{t.meta}</div>
              </div>
              <button style={{ padding: "6px 14px", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 11, fontWeight: 700, color: "#2563EB", display: "flex", alignItems: "center", gap: 6, background: "#fff", cursor: "pointer", boxShadow: "0 2px 4px rgba(37,99,235,0.05)" }}>
                Start <ArrowRight size={14} strokeWidth={2.5} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="shrink-0" style={{ padding: "12px 16px", background: "#F8FAFC", borderRadius: 10, fontSize: 11, color: "#475569", display: "flex", gap: 10, alignItems: "center", border: "1px solid #E2E8F0", fontWeight: 500 }}>
        <Info size={16} color="#3B82F6" strokeWidth={2.5} style={{ flexShrink: 0 }} />
        This simulates the real exam environment — review your performance after each mock test to plan focused practice.
      </div>
    </div>
  );
}

function PreviousTestsView() {
  const tests = [
    { tag: "JS", name: "JavaScript Mock Test", score: "88%", scoreCol: "#10B981", acc: "80%", time: "82 mins", date: "18 May" },
    { tag: "</>", name: "DSA Mock Test", score: "74%", scoreCol: "#2563EB", acc: "72%", time: "91 mins", date: "16 May" },
    { tag: "@", name: "Aptitude Mock Test", score: "60%", scoreCol: "#F59E0B", acc: "68%", time: "65 mins", date: "14 May" },
    { tag: "CS", name: "CS Mock Test", score: "81%", scoreCol: "#10B981", acc: "78%", time: "85 mins", date: "12 May" },
    { tag: "⚛", name: "React Architecture Test", score: "92%", scoreCol: "#10B981", acc: "88%", time: "70 mins", date: "10 May" },
    { tag: "☁️", name: "AWS Cloud Mock Test", score: "65%", scoreCol: "#F59E0B", acc: "60%", time: "110 mins", date: "05 May" },
  ];

  return (
    <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: "20px", height: "100%" }}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: 22, fontWeight: 800, margin: 0, color: "var(--color-navy)", letterSpacing: "-0.01em" }}>Previous Tests</h3>
          <p style={{ color: "#64748B", fontSize: 12, marginTop: 4 }}>Review your past performance and track your improvement.</p>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#FFF1F2", color: "#B91C1C", padding: "6px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#DC2626", animation: "blink 1.5s infinite" }} /> Live
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.8fr_2fr] shrink-0" style={{ background: "#ffffff", borderRadius: 16, padding: "18px 24px", border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(15,23,42,0.03)" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRight: "1px solid #F1F5F9", paddingRight: "16px" }}>
          <div style={{ width: 68, height: 68, borderRadius: "50%", background: "conic-gradient(#2563EB 72%, #E2E8F0 0)", display: "grid", placeItems: "center", position: "relative" }}>
            <div style={{ width: 54, height: 54, borderRadius: "50%", background: "#ffffff", display: "grid", placeItems: "center", fontSize: 16, fontWeight: 800, color: "var(--color-navy)" }}>
              72%
            </div>
          </div>
          <div style={{ fontSize: 11, color: "#475569", fontWeight: 600, marginTop: 8 }}>Average Score</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-center pl-2">
          {[
            { icon: ClipboardList, val: "12", label: "Attempted", bg: "#EFF6FF", col: "#2563EB" },
            { icon: TrendingUp, val: "5", label: "Improved", bg: "#ECFDF5", col: "#10B981" },
            { icon: TrendingDown, val: "2", label: "Declined", bg: "#FEF2F2", col: "#EF4444" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: s.bg, color: s.col, display: "grid", placeItems: "center", flexShrink: 0 }}>
                <s.icon size={20} strokeWidth={2.5} />
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "var(--color-navy)", lineHeight: 1.1 }}>{s.val}</div>
                <div style={{ fontSize: 10, color: "#64748B", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col flex-1" style={{ border: "1px solid #E2E8F0", borderRadius: 14, overflow: "hidden", background: "#fff", boxShadow: "0 4px 12px rgba(15,23,42,0.02)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: "1px solid #E2E8F0", background: "#f8fafc" }}>
          <h4 style={{ fontWeight: 700, fontSize: 13, color: "var(--color-navy)", margin: 0 }}>Test History</h4>
          <button style={{ fontSize: 11, color: "#475569", display: "flex", alignItems: "center", gap: 4, background: "#fff", border: "1px solid #E2E8F0", padding: "4px 10px", borderRadius: 6, fontWeight: 600 }}>All <ChevronDown size={14} /></button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {tests.map((t, i) => (
            <div key={i} className="flex flex-wrap items-center gap-4" style={{ padding: "12px 18px", borderBottom: i < tests.length - 1 ? "1px solid #F1F5F9" : "none", fontSize: 11 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flex: "1 1 120px" }}>
                <div style={{ width: 26, height: 26, borderRadius: 8, fontWeight: 800, fontSize: 10, display: "grid", placeItems: "center", flexShrink: 0, ...(t.tag === 'JS' ? { background: '#FEF3C7', color: '#D97706' } : t.tag === '</>' ? { background: '#EDE9FE', color: '#7C3AED' } : t.tag === '@' ? { background: '#D1FAE5', color: '#059669' } : t.tag === '⚛' ? { background: '#CCFBF1', color: '#0F766E' } : t.tag === '☁️' ? { background: '#FFEDD5', color: '#C2410C' } : { background: '#DBEAFE', color: '#2563EB' }) }}>{t.tag}</div>
                <span style={{ fontWeight: 600, color: "#334155", fontSize: 12 }}>{t.name}</span>
              </div>
              <div style={{ fontWeight: 800, color: t.scoreCol, width: 40, fontSize: 12 }}>{t.score}</div>
              <div style={{ color: "#64748B", fontWeight: 500, width: 40, fontSize: 11 }}>{t.acc}</div>
              <div style={{ color: "#64748B", display: "flex", alignItems: "center", gap: 4, width: 64, fontSize: 11, fontWeight: 500 }}><Clock3 size={12} /> {t.time}</div>
            </div>
          ))}
          <div style={{ padding: "10px", display: "flex", justifyContent: "center", borderTop: "1px solid #E2E8F0", background: "#F8FAFC", marginTop: "auto" }}>
            <button style={{ color: "#2563EB", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 4, background: "transparent", border: "none", cursor: "pointer" }}>
              Load More <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeakAreasView() {
  const topics = [
    { name: "JavaScript", val: 85, col: "#10B981" },
    { name: "Data Structures", val: 72, col: "#2563EB" },
    { name: "System Design", val: 64, col: "#06B6D4" },
    { name: "Algorithms", val: 58, col: "#F59E0B" },
    { name: "React.js", val: 50, col: "#8B5CF6" },
    { name: "DBMS", val: 45, col: "#EF4444" },
    { name: "Operating Systems", val: 38, col: "#D946EF" },
  ];

  return (
    <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: "20px", height: "100%" }}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: 22, fontWeight: 800, margin: 0, color: "var(--color-navy)", letterSpacing: "-0.01em" }}>Xone</h3>
          <p style={{ color: "#64748B", fontSize: 12, marginTop: 4 }}>Focus on your weak topics and improve your performance.</p>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#FFF1F2", color: "#B91C1C", padding: "6px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#DC2626", animation: "blink 1.5s infinite" }} /> Live
        </span>
      </div>

      {/* Performance by Topic Bar Chart */}
      <div style={{ border: "1px solid #E2E8F0", borderRadius: 14, padding: "18px 20px", display: "flex", flexDirection: "column", minHeight: 240, background: "#ffffff", boxShadow: "0 4px 12px rgba(15,23,42,0.02)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h4 style={{ fontWeight: 700, fontSize: 13, color: "var(--color-navy)", margin: 0 }}>Performance by Topic</h4>
          <button style={{ fontSize: 11, color: "#475569", display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid #E2E8F0", padding: "6px 10px", borderRadius: 8, fontWeight: 600 }}><Calendar size={14} /> Month <ChevronDown size={14} /></button>
        </div>
        <div style={{ flex: 1, position: "relative", minHeight: 180, padding: "10px 2% 20px" }}>
          {/* Grid lines */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 20, display: "flex", flexDirection: "column", justifyContent: "space-between", zIndex: 0 }}>
            {[100, 75, 50, 25, 0].map(val => (
              <div key={val} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 24, fontSize: 10, color: "#94A3B8", textAlign: "right", fontWeight: 600 }}>{val}%</div>
                <div style={{ flex: 1, height: 1, background: val === 50 ? "#E2E8F0" : "#F1F5F9", borderTop: val === 50 ? "1px dashed #CBD5E1" : "none" }}></div>
              </div>
            ))}
          </div>
          {/* Avg line */}
          <div style={{ position: "absolute", top: "48%", left: 34, right: 0, borderTop: "1.5px dashed #94A3B8", zIndex: 1 }}></div>
          <div style={{ position: "absolute", top: "43%", right: 0, fontSize: 10, color: "#475569", fontWeight: 700 }}>Avg 60%</div>

          {/* Bars */}
          <div style={{ position: "absolute", left: 34, right: 10, bottom: 20, top: 10, zIndex: 2, display: "grid", gridTemplateColumns: `repeat(${topics.length}, minmax(0, 1fr))`, gap: 10, alignItems: "end" }}>
            {topics.map((t, i) => {
              const chartHeight = 130;
              const barHeight = Math.max(20, (t.val / 100) * chartHeight);
              return (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "end", gap: 8, height: "100%" }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "var(--color-navy)", lineHeight: 1 }}>{t.val}%</div>
                  <div style={{ width: 28, height: barHeight, borderRadius: 6, background: `linear-gradient(180deg, ${t.col} 0%, ${t.col}CC 100%)`, boxShadow: `0 8px 18px ${t.col}22` }} />
                  <div style={{ fontSize: 9, color: "#64748B", textAlign: "center", lineHeight: 1.2, minHeight: 24, fontWeight: 500 }}>
                    {t.name.split(" ").map((w) => <div key={`${t.name}-${w}`}>{w}</div>)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lower section */}
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-5 flex-1">
        <div style={{ border: "1px solid #E2E8F0", borderRadius: 14, padding: "18px 20px", background: "#ffffff", boxShadow: "0 4px 12px rgba(15,23,42,0.02)" }}>
          <h4 style={{ fontWeight: 700, fontSize: 13, color: "var(--color-navy)", marginBottom: 16, marginTop: 0 }}>Accuracy Coverage</h4>
          <div style={{ width: "100%", height: 160, position: "relative", display: "grid", placeItems: "center" }}>
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", overflow: "visible", maxWidth: 160 }}>
              {/* Radar chart polygons */}
              <polygon points="50,10 88,38 75,82 25,82 12,38" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              <polygon points="50,26 73,43 65,70 35,70 27,43" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              <polygon points="50,42 61,50 56,62 44,62 39,50" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              <line x1="50" y1="50" x2="50" y2="10" stroke="#E2E8F0" strokeWidth="1" />
              <line x1="50" y1="50" x2="88" y2="38" stroke="#E2E8F0" strokeWidth="1" />
              <line x1="50" y1="50" x2="75" y2="82" stroke="#E2E8F0" strokeWidth="1" />
              <line x1="50" y1="50" x2="25" y2="82" stroke="#E2E8F0" strokeWidth="1" />
              <line x1="50" y1="50" x2="12" y2="38" stroke="#E2E8F0" strokeWidth="1" />
              <polygon points="50,16 80,45 68,75 32,70 20,40" fill="rgba(37,99,235,0.15)" stroke="#3B82F6" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="50" cy="16" r="2.5" fill="#3B82F6" />
              <circle cx="80" cy="45" r="2.5" fill="#3B82F6" />
              <circle cx="68" cy="75" r="2.5" fill="#3B82F6" />
              <circle cx="32" cy="70" r="2.5" fill="#3B82F6" />
              <circle cx="20" cy="40" r="2.5" fill="#3B82F6" />
              <text x="50" y="4" fontSize="6" fill="#475569" fontWeight="600" textAnchor="middle">JS</text>
              <text x="94" y="38" fontSize="6" fill="#475569" fontWeight="600" textAnchor="start">DSA</text>
              <text x="80" y="90" fontSize="6" fill="#475569" fontWeight="600" textAnchor="start">Sys Design</text>
              <text x="20" y="90" fontSize="6" fill="#475569" fontWeight="600" textAnchor="end">DBMS</text>
              <text x="6" y="38" fontSize="6" fill="#475569" fontWeight="600" textAnchor="end">OS</text>
            </svg>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", background: "#ffffff", borderRadius: 14, border: "1px solid #E2E8F0", padding: "18px 20px", boxShadow: "0 4px 12px rgba(15,23,42,0.02)" }}>
          <h4 style={{ fontWeight: 700, fontSize: 13, color: "var(--color-navy)", marginBottom: 14, marginTop: 0 }}>Areas to Improve</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[...topics].reverse().map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: t.col, flexShrink: 0 }} />
                <div style={{ width: 85, color: "#475569", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.name}</div>
                <div style={{ flex: 1, height: 5, background: "#F1F5F9", borderRadius: 99 }}>
                  <div style={{ height: "100%", width: `${t.val}%`, background: t.col, borderRadius: 99 }} />
                </div>
                <div style={{ fontWeight: 800, color: t.col, width: 24, textAlign: "right" }}>{t.val}%</div>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-4">
            <div style={{ padding: "10px 14px", background: "#EFF6FF", borderRadius: 10, fontSize: 11, color: "#1E3A8A", display: "flex", gap: 8, alignItems: "flex-start", border: "1px solid #DBEAFE", fontWeight: 500 }}>
              <Lightbulb size={16} color="#3B82F6" style={{ flexShrink: 0, marginTop: 1 }} />
              Focus more on Operating Systems and DBMS to raise overall mock test performance.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function UserDashboardSection() {
  const tabs = [
    { id: "overview", label: "Base Ground", icon: Target },
    { id: "mock-tests", label: "Proving Ground", icon: ClipboardList },
    { id: "previous", label: "Previous Tests", icon: Clock3 },
    { id: "weak-areas", label: "Xone", icon: BarChart3 },
  ] as const;

  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("overview");

  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: "22px max(4vw, 18px) 16px",
        background: "linear-gradient(to bottom, #FFFFFF, #F0F6FF)",
        marginBottom: "-2px",
      }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center">
          <h2
            className="mt-4"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 5vw, 34px)",
              color: "var(--color-navy)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Your certification prep, all in one screen.
          </h2>
          <p
            style={{
              margin: "10px auto 0",
              maxWidth: 820,
              color: "#64748B",
              fontSize: 20,
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            One dashboard to track your assessments, mock tests, AI interview practice and your personalised roadmap
          </p>
        </div>

        <div className="relative mt-8 flex justify-center">
          <div
            className="w-full rounded-2xl flex flex-col"
            style={{
              maxWidth: "min(1120px, 96vw)",
              height: "min(720px, 78vh)",
              minHeight: "min(720px, 78vh)",
              background: "#ffffff",
              boxShadow: "0 16px 34px rgba(30,64,175,0.08), 0 0 0 1px rgba(148,163,184,0.15) inset",
              clipPath: "inset(-60px -60px 0px -60px)",
              overflow: "hidden" // Ensure no scrolling leaks out
            }}
          >
            {/* ── Browser chrome ── */}
            <div
              style={{
                background: "#ffffff",
                borderBottom: "1px solid rgba(148,163,184,0.2)",
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexShrink: 0
              }}
            >
              {/* Traffic lights */}
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                ))}
              </div>
              {/* URL bar */}
              <div
                style={{
                  flex: 1,
                  background: "#f1f5f9",
                  borderRadius: 6,
                  padding: "6px 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>
                  onskill.rabbitt.com/userDashboard
                </span>
              </div>
            </div>

            {/* ── Dashboard UI ── */}
            <div className="flex flex-col lg:flex-row flex-1 bg-white min-h-0 overflow-hidden">
              {/* Left sidebar */}
              <aside
                className="w-full lg:w-[150px] shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200 p-4 lg:p-5 flex flex-col"
                style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)", overflow: "hidden" }}
              >
                <div className="hidden lg:flex items-center gap-2 mb-6 ml-1 mt-1 text-slate-500 font-bold text-xs uppercase tracking-wider">
                  <Menu size={16} strokeWidth={2.5} /> Menu
                </div>
                <div className="flex flex-wrap lg:flex-col gap-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const selected = tab.id === activeTab;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className="flex items-center gap-3 text-left transition-all duration-200 shrink-0"
                        style={{
                          border: 0,
                          borderRadius: 8,
                          background: selected ? "#EFF6FF" : "transparent",
                          color: selected ? "var(--color-accent)" : "#475569",
                          cursor: "pointer",
                          fontFamily: "Inter, sans-serif",
                          fontSize: 12,
                          fontWeight: selected ? 700 : 600,
                          padding: "10px 12px",
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
                        <Icon size={18} strokeWidth={selected ? 2.5 : 2} />
                        <span className="lg:inline">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </aside>

              {/* Main content - completely hiding overflow to fulfill user request "no scrolling in any of it" */}
              <div className="flex-1 bg-white overflow-hidden relative">
                {activeTab === "overview" && <ProvingGroundOverview />}
                {activeTab === "mock-tests" && <MockTestsView />}
                {activeTab === "previous" && <PreviousTestsView />}
                {activeTab === "weak-areas" && <WeakAreasView />}
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[120px]"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #F0F6FF 100%)",
          }}
        />
      </div>
    </section>
  );
}
