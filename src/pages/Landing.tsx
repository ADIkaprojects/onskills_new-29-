import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { StatsTicker } from "@/components/StatsTicker";
import { AssessmentFlipCarousel } from "@/components/AssessmentFlipCarousel";
import { WalkWaysRoadmap } from "@/components/WalkWaysRoadmap";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ---------------- HERO ---------------- */
function Hero() {
  const navigate = useNavigate();
  const { word, visible } = useTypewriter(["Certify", "Secure", "Upgrade", "Train"], 2200);

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: "100dvh",
        padding: "120px 24px 60px",
        background:
          "var(--color-bg) radial-gradient(ellipse 80% 60% at 50% 40%, #E8F0FE 0%, transparent 70%)",
      }}
    >
      {/* Blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          width: 400, height: 400, top: -80, left: -80,
          background: "var(--color-accent)", filter: "blur(80px)", opacity: 0.18,
          borderRadius: 999, animation: "blob-drift 18s ease-in-out infinite", zIndex: 0,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          width: 300, height: 300, top: -40, right: -60,
          background: "#60A5FA", filter: "blur(80px)", opacity: 0.18,
          borderRadius: 999, animation: "blob-drift 24s ease-in-out infinite reverse", animationDelay: "-6s", zIndex: 0,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          width: 500, height: 200, bottom: -60, left: "50%", transform: "translateX(-50%)",
          background: "var(--color-accent-light)", filter: "blur(80px)", opacity: 0.5,
          borderRadius: 999, animation: "blob-drift 20s ease-in-out infinite", animationDelay: "-3s", zIndex: 0,
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
            boxShadow: "0 2px 8px rgba(10,22,40,0.04)",
            fontFamily: "DM Sans, sans-serif",
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
            fontFamily: "Sora, sans-serif",
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
          <div
            className="mt-4"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(16px, 2.2vw, 22px)",
              color: "var(--color-gray-text)",
              lineHeight: 1.4,
            }}
          >
            Skills that speak. Challenges that prove.
          </div>
        </h1>

        <p
          className="mx-auto mt-6 max-w-[560px]"
          style={{
            fontFamily: "DM Sans, sans-serif",
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
          onClick={() => navigate({ to: "/auth" })}
          className="mt-10 transition-all duration-[250ms]"
          style={{
            background: "var(--color-accent)",
            color: "#fff",
            border: "none",
            borderRadius: "var(--radius-md)",
            padding: "16px 40px",
            fontFamily: "Sora, sans-serif",
            fontWeight: 600,
            fontSize: 16,
            boxShadow: "0 4px 20px rgba(29,110,245,0.30)",
            opacity: 0,
            animation: "fadeUp 0.6s cubic-bezier(0.4,0,0.2,1) 0.55s forwards",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--color-accent-hover)";
            e.currentTarget.style.transform = "scale(1.03) translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 12px 32px rgba(29,110,245,0.40)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--color-accent)";
            e.currentTarget.style.transform = "scale(1) translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(29,110,245,0.30)";
          }}
        >
          Let's Explore →
        </button>
      </div>
    </section>
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
        fontFamily: "Sora, sans-serif",
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
              fontFamily: "Sora, sans-serif",
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
            style={{ fontFamily: "DM Sans, sans-serif", fontSize: 16, color: "var(--color-gray-text)", lineHeight: 1.65 }}
          >
            {body}
          </p>
          <ul className="mt-6 space-y-2.5">
            {features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2.5"
                style={{ fontFamily: "DM Sans, sans-serif", fontSize: 15, color: "var(--color-navy)" }}
              >
                <span style={{ color: "var(--color-accent)", fontWeight: 700 }}>✓</span>
                {f}
              </li>
            ))}
          </ul>
          <button
            onClick={onCta}
            className="story-link mt-8 inline-block"
            style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 15, color: "var(--color-accent)" }}
          >
            {cta}
          </button>
        </div>
        <div style={{ gridArea: "mock" }}>
          <div
            className="transition-transform duration-[350ms]"
            style={{
              background: "var(--color-navy)",
              borderRadius: "var(--radius-xl)",
              padding: 28,
              boxShadow: "0 32px 80px rgba(10,22,40,0.20)",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#fff",
            }}
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
          <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 16 }}>My Learning Path</div>
          <span
            className="mt-1 inline-block"
            style={{
              background: "rgba(29,110,245,0.18)", color: "#9ECBFF",
              borderRadius: 999, padding: "3px 10px",
              fontFamily: "DM Sans, sans-serif", fontSize: 11, fontWeight: 500,
            }}
          >
            Frontend Engineering · Track L3
          </span>
        </div>
        <div
          style={{
            width: 36, height: 36, borderRadius: 999, background: "var(--color-accent)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 13, color: "#fff",
          }}
        >
          AM
        </div>
      </div>

      <div className="mt-5 space-y-3.5">
        {modules.map((m) => (
          <div key={m.name}>
            <div className="flex items-center justify-between">
              <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.85)" }}>
                {m.name}
              </span>
              <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, fontWeight: 600, color: m.color }}>
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
        <div className="flex justify-between" style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12 }}>
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

function ProvingGroundMockup() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            style={{
              width: 8, height: 8, borderRadius: 999, background: "var(--color-accent)",
              boxShadow: "0 0 8px var(--color-accent)",
            }}
          />
          <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 13 }}>AI Assessment</span>
          <select
            disabled
            className="pg-select ml-3"
            aria-label="Assessment language"
            title="Assessment language"
          >
            <option>JavaScript</option>
          </select>
        </div>
        <span
          className="animate-pulse-ring"
          style={{
            background: "rgba(239,68,68,0.15)",
            color: "#FCA5A5",
            borderRadius: 999,
            padding: "4px 10px",
            fontFamily: "Sora, sans-serif",
            fontWeight: 600,
            fontSize: 12,
          }}
        >
          ⏱ 43:22
        </span>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-3">
        <div
          className="col-span-2 rounded-[10px] p-3"
          style={{ background: "rgba(255,255,255,0.05)", minHeight: 200 }}
        >
          <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>AI</div>
          <div className="mt-1.5" style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>
            Implement <code style={{ color: "var(--color-accent)" }}>debounce(fn, ms)</code>. It should delay
            invocation until <code style={{ color: "var(--color-accent)" }}>ms</code> has elapsed since the last call.
          </div>
          <div
            className="mt-3 rounded-md p-2"
            style={{ background: "rgba(29,110,245,0.12)", color: "#BFD7FF", fontFamily: "DM Sans, sans-serif", fontSize: 11.5 }}
          >
            ⚡ Hint available
          </div>
        </div>

        <div
          className="col-span-3 overflow-hidden rounded-[10px]"
          style={{ background: "#0B1220", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11.5, lineHeight: 1.7 }}>
            <div className="px-2 py-2 text-right" style={{ color: "rgba(255,255,255,0.3)", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <div key={n}>{n}</div>)}
            </div>
            <div className="flex-1 px-3 py-2" style={{ color: "rgba(255,255,255,0.85)" }}>
              <div><span style={{ color: "#F59E0B" }}>function</span> <span style={{ color: "#60A5FA" }}>debounce</span>(fn, ms) {"{"}</div>
              <div>  <span style={{ color: "#F59E0B" }}>let</span> t;</div>
              <div>  <span style={{ color: "#F59E0B" }}>return</span> (...args) =&gt; {"{"}</div>
              <div>    <span style={{ color: "#F59E0B" }}>clearTimeout</span>(t);</div>
              <div>    t = <span style={{ color: "#F59E0B" }}>setTimeout</span>(() =&gt; fn(...args), ms);</div>
              <div>  {"}"};</div>
              <div>{"}"}</div>
              <div><span style={{ color: "var(--color-success)" }}>{`// passes 4 / 5 tests`}</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          style={{
            background: "var(--color-accent)", color: "#fff",
            borderRadius: 8, padding: "7px 16px",
            fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 12,
          }}
        >
          Run Code
        </button>
        <button
          style={{
            background: "var(--color-success)", color: "#fff",
            borderRadius: 8, padding: "7px 16px",
            fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 12,
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

function XoneMockup() {
  const skills = [
    { name: "React", verified: true },
    { name: "TypeScript", verified: true },
    { name: "System Design", verified: true },
    { name: "Node.js", verified: false },
    { name: "AWS", verified: true },
    { name: "GraphQL", verified: false },
  ];
  const matches = [
    { co: "Stripe", role: "Frontend Engineer", pct: 97, color: "var(--color-success)" },
    { co: "Figma", role: "Senior React Dev", pct: 84, color: "var(--color-warning)" },
    { co: "Vercel", role: "DevX Engineer", pct: 91, color: "var(--color-success)" },
  ];
  return (
    <div>
      <div className="flex items-center gap-3">
        <div
          style={{
            width: 44, height: 44, borderRadius: 999, background: "var(--color-accent)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 15, color: "#fff",
          }}
        >
          AM
        </div>
        <div>
          <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 14 }}>Alex Morgan</div>
          <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
            🔗 Profile Score: 94/100
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {skills.map((s) => (
          <div
            key={s.name}
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5"
            style={{
              background: s.verified ? "rgba(29,110,245,0.16)" : "rgba(255,255,255,0.06)",
              color: s.verified ? "#BFD7FF" : "rgba(255,255,255,0.5)",
              fontFamily: "DM Sans, sans-serif",
              fontSize: 11.5,
              fontWeight: 500,
            }}
          >
            {s.verified && <span style={{ color: "var(--color-accent)" }}>✓</span>}
            {s.name}
          </div>
        ))}
      </div>

      <div className="mt-5">
        <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1.5 }}>
          Matched Opportunities
        </div>
        <div className="mt-2 space-y-2">
          {matches.map((m) => (
            <div
              key={m.co}
              className="flex items-center justify-between rounded-md p-2.5"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div>
                <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 13 }}>{m.co}</div>
                <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.55)" }}>
                  {m.role}
                </div>
              </div>
              <span
                style={{
                  background: `${m.color}26`, color: m.color,
                  borderRadius: 999, padding: "3px 10px",
                  fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 11,
                }}
              >
                {m.pct}% match
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        className="mt-4 w-full"
        style={{
          background: "var(--color-accent)", color: "#fff",
          borderRadius: 10, padding: "10px",
          fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 13,
        }}
      >
        View Full Profile
      </button>
    </div>
  );
}

function WalkWaysMiniMockup() {
  const nodes = [
    { color: "var(--color-accent)", label: "The Spark", state: "✓" },
    { color: "var(--color-accent)", label: "Base Camp", state: "✓" },
    { color: "var(--color-warning)", label: "First Proof", state: "•" },
    { color: "rgba(255,255,255,0.3)", label: "Skill Certified", state: "🔒" },
    { color: "rgba(255,255,255,0.3)", label: "Professional", state: "🔒" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between">
        <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 13 }}>Your WalkWay</span>
        <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.55)" }}>5 stages</span>
      </div>
      <div className="relative mt-6 flex items-center justify-between">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2" style={{ background: "rgba(255,255,255,0.1)" }} />
        <div className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2" style={{ background: "var(--color-accent)", width: "42%" }} />
        {nodes.map((n) => (
          <div key={n.label} className="relative z-10 flex flex-col items-center" style={{ width: 64 }}>
            <div
              style={{
                width: 32, height: 32, borderRadius: 999, background: n.color,
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700,
              }}
            >
              {n.state}
            </div>
            <span
              className="mt-2 text-center"
              style={{ fontFamily: "DM Sans, sans-serif", fontSize: 10.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.2 }}
            >
              {n.label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <div className="flex justify-between" style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11.5 }}>
          <span style={{ color: "rgba(255,255,255,0.65)" }}>Current Progress</span>
          <span style={{ color: "var(--color-accent)", fontWeight: 600 }}>42%</span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div className="h-full" style={{ background: "var(--color-accent)", width: "42%" }} />
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

function WhyStats() {
  const navigate = useNavigate();
  const stats = [
    { num: 10, suffix: "K+", label: "Active Learners" },
    { num: 97, suffix: "%", label: "Assessment Pass Rate" },
    { num: 3, suffix: "X", label: "Career Growth Reported" },
    { num: 500, suffix: "+", label: "Skill Tracks Available" },
  ];
  return (
    <section style={{ padding: "100px max(5vw, 24px)" }}>
      <div
        className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-2"
        style={{
          background: "var(--color-accent-light)",
          borderRadius: "var(--radius-xl)",
          padding: "80px max(5vw, 60px)",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "DM Sans, sans-serif",
              color: "var(--color-accent)",
              fontSize: 12, fontWeight: 600,
              letterSpacing: 3, textTransform: "uppercase",
            }}
          >
            Built for the Future
          </div>
          <h2
            className="mt-3"
            style={{
              fontFamily: "Sora, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(24px, 3.5vw, 38px)",
              color: "var(--color-navy)",
              lineHeight: 1.2,
              maxWidth: 420,
            }}
          >
            Skills Are the New Currency. OnSKILL Makes Them Verifiable.
          </h2>
          <p
            className="mt-4 max-w-[480px]"
            style={{ fontFamily: "DM Sans, sans-serif", fontSize: 16, color: "var(--color-gray-text)", lineHeight: 1.7 }}
          >
            Every badge you earn is verified, every challenge you pass is real, and every certificate
            you receive is recognized by hiring partners across the world.
          </p>
          <button
            onClick={() => navigate({ to: "/auth" })}
            className="mt-7 transition-all"
            style={{
              background: "var(--color-accent)",
              color: "#fff",
              borderRadius: "var(--radius-md)",
              padding: "14px 32px",
              fontFamily: "Sora, sans-serif",
              fontWeight: 600,
              fontSize: 15,
              boxShadow: "0 8px 24px rgba(29,110,245,0.30)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-accent-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-accent)")}
          >
            Start Your Journey →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="text-center"
              style={{
                background: "var(--color-white)",
                borderRadius: "var(--radius-md)",
                padding: "28px 24px",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(36px, 5vw, 52px)",
                  color: "var(--color-navy)",
                  lineHeight: 1,
                }}
              >
                <CountUp to={s.num} suffix={s.suffix} />
              </div>
              <div
                className="mt-2"
                style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, color: "var(--color-gray-text)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCTA() {
  const navigate = useNavigate();
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--color-navy)", padding: "100px max(5vw, 24px)" }}
    >
      <div
        className="pointer-events-none absolute"
        style={{ width: 400, height: 400, top: -100, left: -80, background: "var(--color-accent)", opacity: 0.06, filter: "blur(100px)", borderRadius: 999 }}
      />
      <div
        className="pointer-events-none absolute"
        style={{ width: 500, height: 500, bottom: -120, right: -100, background: "var(--color-accent)", opacity: 0.06, filter: "blur(100px)", borderRadius: 999 }}
      />
      <div className="relative z-10 mx-auto max-w-[760px] text-center">
        <h2
          style={{
            fontFamily: "Sora, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 56px)",
            color: "#fff",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}
        >
          It's time to prove what you know.
        </h2>
        <p
          className="mx-auto mt-5 max-w-[520px]"
          style={{ fontFamily: "DM Sans, sans-serif", fontSize: 17, color: "rgba(255,255,255,0.65)" }}
        >
          Join thousands of professionals building verified skill profiles on OnSKILL.
        </p>
        <button
          onClick={() => navigate({ to: "/auth" })}
          className="mt-8 transition-all duration-[250ms]"
          style={{
            background: "var(--color-accent)",
            color: "#fff",
            borderRadius: "var(--radius-md)",
            padding: "18px 48px",
            fontFamily: "Sora, sans-serif",
            fontWeight: 600,
            fontSize: 16,
            boxShadow: "0 8px 40px rgba(29,110,245,0.40)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--color-accent-hover)";
            e.currentTarget.style.transform = "scale(1.03)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--color-accent)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Get Started Free →
        </button>
        <div
          className="mt-6"
          style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)" }}
        >
          ✦ No credit card required · ✦ Free tier available · ✦ Cancel anytime
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
        e.currentTarget.style.background = "rgba(29,110,245,0.3)";
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
    <footer style={{ background: "var(--color-navy)", padding: "64px max(5vw, 24px) 0" }}>
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <img src="/onskill-logo.png" alt="OnSKILL" width={32} height={32} className="h-8 w-8" />
              <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, color: "#fff", fontSize: 18 }}>
                ON<span style={{ color: "var(--color-accent)" }}>SKILL</span>
              </span>
            </div>
            <div
              className="mt-3"
              style={{ fontFamily: "DM Sans, sans-serif", fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,0.55)" }}
            >
              Certify. Prove. Grow.
            </div>
            <p
              className="mt-3 max-w-[220px]"
              style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}
            >
              Where verified skills meet real opportunities.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <div
                style={{
                  fontFamily: "Sora, sans-serif",
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
                      style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, color: "rgba(255,255,255,0.65)" }}
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
                fontFamily: "Sora, sans-serif",
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
          <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
            © 2025 OnSKILL · All rights reserved.
          </span>
          <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
            Privacy Policy · Terms of Service
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- LANDING ROOT ---------------- */
export function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsTicker />
        <AssessmentFlipCarousel />

        <section id="products" style={{ padding: "60px max(5vw, 24px) 40px" }}>
          <div className="mx-auto max-w-[1200px] text-center">
            <div
              style={{
                fontFamily: "DM Sans, sans-serif",
                color: "var(--color-accent)",
                fontSize: 12, fontWeight: 600,
                letterSpacing: 3, textTransform: "uppercase",
              }}
            >
              Our Platform
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
              Everything You Need. One Ecosystem.
            </h2>
            <p
              className="mx-auto mt-4 max-w-[600px]"
              style={{ fontFamily: "DM Sans, sans-serif", fontSize: 17, color: "var(--color-gray-text)" }}
            >
              Four powerful modules. One mission: Make you undeniably skilled.
            </p>
          </div>
        </section>

        <ProductSection
          id="base-ground"
          tag="Base Ground"
          heading="Build Your Foundation Before You Compete."
          body="Self-paced. Milestone-driven. Role-specific learning paths curated by experts who've been where you want to go."
          features={[
            "Expert-curated curriculum",
            "Self-paced with milestone gates",
            "Role-specific tracks",
            "Built-in concept validators",
          ]}
          cta="Explore Base Ground →"
          onCta={() => navigate({ to: "/auth" })}
          mockup={<BaseGroundMockup />}
        />
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
          onCta={() => navigate({ to: "/auth" })}
          mockup={<ProvingGroundMockup />}
          reverse
        />
        <div className="mx-auto h-px max-w-[1200px]" style={{ background: "var(--color-border)" }} />

        <ProductSection
          id="xone"
          tag="Xone"
          heading="Your Certified Skills. Connected to Opportunity."
          body="Smart skill-to-opportunity matching, an employer-facing dashboard, and a shareable verified profile."
          features={[
            "Smart skill matching",
            "Employer dashboard",
            "Collaborative challenges",
            "Shareable profile link",
          ]}
          cta="Discover Xone →"
          onCta={() => navigate({ to: "/auth" })}
          mockup={<XoneMockup />}
        />
        <div className="mx-auto h-px max-w-[1200px]" style={{ background: "var(--color-border)" }} />

        <ProductSection
          id="walkways-section"
          tag="WalkWays"
          heading="The Road from Beginner to Professional. Mapped."
          body="Guided progression: Base Ground → Proving Ground → Xone, in the exact sequence that builds real expertise."
          features={[
            "Visual milestone roadmaps",
            "Adaptive path suggestions",
            "Community checkpoints",
            "Professional Track Certificate",
          ]}
          cta="Start Your WalkWay →"
          onCta={() => navigate({ to: "/walkways" })}
          mockup={<WalkWaysMiniMockup />}
          reverse
        />

        <WalkWaysRoadmap />
        <WhyStats />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}
