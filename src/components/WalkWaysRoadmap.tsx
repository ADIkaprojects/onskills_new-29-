"use client";

import { useEffect, useRef, useState } from "react";
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
  const [hoverId, setHoverId] = useState<number | null>(null);

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
        padding: "100px max(5vw, 24px)",
        background: "linear-gradient(135deg, #F0F6FF 0%, var(--color-white) 60%, #F0F6FF 100%)",
      }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center">
          <span
            className="inline-block"
            style={{
              background: "var(--color-accent-light)",
              color: "var(--color-accent)",
              border: "1px solid rgba(29,110,245,0.2)",
              borderRadius: "var(--radius-full)",
              padding: "6px 14px",
              fontFamily: "DM Sans, sans-serif",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 2.5,
              textTransform: "uppercase",
            }}
          >
            The Journey
          </span>
          <h2
            className="mt-4"
            style={{
              fontFamily: "Sora, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 44px)",
              color: "var(--color-navy)",
              lineHeight: 1.15,
            }}
          >
            Your WalkWay to Becoming a Professional Developer
          </h2>
          <p
            className="mx-auto mt-4 max-w-[640px]"
            style={{ fontFamily: "DM Sans, sans-serif", fontSize: 17, color: "var(--color-gray-text)" }}
          >
            A structured progression system: master the fundamentals, prove your skills,
            and unlock real opportunities — every step verified.
          </p>
        </div>

        <div
          className="relative mt-16 overflow-x-auto no-scrollbar"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="relative" style={{ width: 1200, height: 380, margin: "0 auto" }}>
            <svg width="1200" height="380" viewBox="0 0 1200 380" style={{ display: "block" }}>
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
                    transitionDelay: `${800 + i * 250}ms`,
                  }}
                  onMouseEnter={() => setHoverId(node.id)}
                  onMouseLeave={() => setHoverId(null)}
                >
                  <div
                    className={node.isPulse ? "animate-pulse-ring" : ""}
                    style={{
                      width: 56, height: 56, borderRadius: 999,
                      background: node.color,
                      boxShadow: `0 4px 20px ${node.color}59`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transform: hoverId === node.id ? "scale(1.18)" : "scale(1)",
                      transition: "transform 250ms cubic-bezier(0.4,0,0.2,1)",
                      color: "#fff",
                    }}
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
                        color: hoverId === node.id ? "var(--color-accent)" : "var(--color-navy)",
                        transition: "color 250ms",
                      }}
                    >
                      {node.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: 12,
                        color: "var(--color-gray-text)",
                        marginTop: 4,
                        opacity: hoverId === node.id ? 1 : 0,
                        transition: "opacity 250ms cubic-bezier(0.4,0,0.2,1)",
                        lineHeight: 1.4,
                      }}
                    >
                      {node.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
