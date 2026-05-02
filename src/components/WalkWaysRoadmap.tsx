"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ROADMAP_NODES, ROADMAP_PATH } from "@/data/roadmap";

function NodeIcon({ id }: { id: number }) {
  const props = { stroke: "#fff", strokeWidth: 2, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (id) {
    case 1: return (<svg width="22" height="22" viewBox="0 0 24 24"><path d="M12 2l2.4 6.6L21 10l-5 4.6L17.5 22 12 18.6 6.5 22 8 14.6 3 10l6.6-1.4L12 2z" {...props} /></svg>);
    case 2: return (<svg width="22" height="22" viewBox="0 0 24 24"><path d="M3 21l4-9 5 4 4-7 5 12" {...props} /></svg>);
    case 3: return (<svg width="22" height="22" viewBox="0 0 24 24"><path d="M3 12h12M11 6l6 6-6 6" {...props} /></svg>);
    case 4: return (<svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="9" r="6" {...props} /><path d="M9 14l-2 7 5-3 5 3-2-7" {...props} /></svg>);
    case 5: return (<svg width="22" height="22" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1018 0 9 9 0 00-18 0zM3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" {...props} /></svg>);
    case 6: return (<svg width="22" height="22" viewBox="0 0 24 24"><path d="M5 21l3-7-5-4h6l3-7 3 7h6l-5 4 3 7-7-5-7 5z" {...props} /></svg>);
    default: return null;
  }
}

export function WalkWaysRoadmap() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [length, setLength] = useState(0);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (pathRef.current) setLength(pathRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "40px max(5vw, 24px) 32px",
        background: "transparent",
      }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center">
          <span
            className="inline-block"
            style={{
              background: "#0A0F1F",
              color: "#FFFFFF",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "var(--radius-full)",
              padding: "8px 24px",
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: 3.5,
              textTransform: "uppercase",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            WALKWAYS
          </span>
          <h2
            className="mt-4"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px, 4.5vw, 48px)",
              color: "var(--color-navy)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Stop Figuring It Out Alone.<br />Your AI Career Guide Is Here.
          </h2>
        </div>

        <div
          className="relative mt-8 overflow-x-auto no-scrollbar"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="relative" style={{ width: 1200, height: 440, margin: "0 auto" }}>
            <svg width="1200" height="440" viewBox="0 0 1200 440" style={{ display: "block" }}>
              {/* Ghost track */}
              <path
                d={ROADMAP_PATH}
                stroke="rgba(29,110,245,0.12)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />
              {/* Animated fill */}
              <path
                ref={pathRef}
                d={ROADMAP_PATH}
                stroke="var(--color-accent)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                style={{
                  strokeDasharray: length || 1,
                  strokeDashoffset: drawn ? 0 : length || 1,
                  transition: "stroke-dashoffset 2200ms cubic-bezier(0.4,0,0.2,1)",
                }}
              />
            </svg>

            {ROADMAP_NODES.map((node, i) => {
              const showAbove = node.position === "above";
              return (
                <div
                  key={node.id}
                  className="absolute"
                  style={{
                    left: node.x,
                    top: node.y,
                    transform: "translate(-50%, -50%)",
                    opacity: drawn ? 1 : 0,
                    transitionProperty: "opacity, transform",
                    transitionDuration: "400ms",
                    transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
                    transitionDelay: `${150 + i * 340}ms`,
                  }}
                >
                  <div
                    style={{
                      width: 56, height: 56, borderRadius: 999,
                      background: node.color,
                      boxShadow: `0 4px 20px ${node.color}59`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff",
                      transition: "transform 250ms cubic-bezier(0.4,0,0.2,1)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <NodeIcon id={node.id} />
                  </div>
                  <div
                    className="absolute left-1/2 -translate-x-1/2 text-center"
                    style={{
                      [showAbove ? "bottom" : "top"]: "calc(100% + 14px)" as never,
                      width: 140,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontWeight: 600,
                        fontSize: 14,
                        color: "var(--color-navy)",
                      }}
                    >
                      {node.label}
                    </div>
                  </div>
                  {node.id === 6 && (
                    <div className="absolute top-1/2 -translate-y-1/2 ml-[30px]" style={{ left: "100%" }}>
                      <Link href="/walkways" className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-white border border-[var(--color-border)] shadow-sm transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-[0_4px_16px_rgba(0,80,230,0.15)] hover:-translate-y-0.5">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                        <div className="absolute top-[125%] opacity-0 transition-opacity duration-200 group-hover:opacity-100 whitespace-nowrap bg-[#0A0F1F] text-white text-[11px] font-bold tracking-wide py-1.5 px-3 rounded shadow-lg pointer-events-none z-10">
                          Try for free
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0A0F1F] rotate-45"></div>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
