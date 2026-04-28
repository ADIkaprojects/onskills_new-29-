"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface FAQItem {
  id: string | number;
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  badge?: string;
  title: string;
  subtitle?: string;
  items: FAQItem[];
  className?: string;
}

export const FAQSection = ({
  badge,
  title,
  subtitle,
  items,
  className,
}: FAQSectionProps) => {
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-row",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn("relative w-full overflow-hidden", className)}
      style={{
        background: "transparent",
        padding: "72px max(5vw, 24px) 56px",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          width: 720,
          height: 320,
          top: -80,
          left: "50%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse, rgba(37,99,235,0.13) 0%, transparent 68%)",
          filter: "blur(72px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[720px]">
        {badge && (
          <div className="mb-7 flex justify-center">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(37,99,235,0.15)",
                border: "1px solid rgba(96,165,250,0.25)",
                borderRadius: 999,
                padding: "6px 16px",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: "#60A5FA",
                  boxShadow: "0 0 8px rgba(96,165,250,0.8)",
                  display: "block",
                }}
              />
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#93C5FD",
                }}
              >
                {badge}
              </span>
            </div>
          </div>
        )}

        <div className="mb-10 text-center">
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(24px, 3.6vw, 40px)",
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className="mx-auto mt-3 max-w-[480px]"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 15,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.6,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div className="space-y-3">
          {items.map((item, idx) => {
            const isActive = activeId === item.id;

            return (
              <div
                key={item.id}
                className="faq-row relative group"
                onMouseEnter={() => {
                  if (!isTouch) setActiveId(item.id);
                }}
                onMouseLeave={() => {
                  if (!isTouch) setActiveId(null);
                }}
                onClick={() => {
                  if (!isTouch) return;
                  setActiveId((prev) => (prev === item.id ? null : item.id));
                }}
              >
                <div
                  className="relative cursor-default overflow-hidden transition-all duration-500 ease-out"
                  style={{
                    borderRadius: 12,
                    border: isActive
                      ? "1px solid rgba(37,99,235,0.55)"
                      : "1px solid rgba(96,165,250,0.12)",
                    background: isActive
                      ? "linear-gradient(135deg, rgba(37,99,235,0.10) 0%, rgba(15,23,42,0.85) 100%)"
                      : "rgba(9,28,78,0.35)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow: isActive
                      ? "0 0 0 1px rgba(37,99,235,0.18), 0 16px 48px rgba(7,19,56,0.55), inset 0 1px 0 rgba(96,165,250,0.10)"
                      : "none",
                    maxHeight: isActive ? 360 : 64,
                    transition:
                      "max-height 500ms cubic-bezier(0.4,0,0.2,1), border 350ms ease, background 350ms ease, box-shadow 350ms ease",
                  }}
                >
                  <div
                    className="absolute bottom-0 left-0 top-0 w-[3px] transition-all duration-500"
                    style={{
                      borderRadius: "12px 0 0 12px",
                      background: isActive
                        ? "linear-gradient(to bottom, #2563EB, #60A5FA)"
                        : "rgba(96,165,250,0.0)",
                      boxShadow: isActive
                        ? "0 0 12px rgba(37,99,235,0.6)"
                        : "none",
                    }}
                  />

                  {isActive && (
                    <>
                      <div className="pointer-events-none absolute left-4 top-3 h-5 w-5">
                        <div className="absolute left-0 top-0 h-[1.5px] w-3.5 rounded-full bg-[#60A5FA]" />
                        <div className="absolute left-0 top-0 h-3.5 w-[1.5px] rounded-full bg-[#60A5FA]" />
                      </div>
                      <div className="pointer-events-none absolute bottom-3 right-4 h-5 w-5">
                        <div className="absolute bottom-0 right-0 h-[1.5px] w-3.5 rounded-full bg-[#60A5FA]" />
                        <div className="absolute bottom-0 right-0 h-3.5 w-[1.5px] rounded-full bg-[#60A5FA]" />
                      </div>
                    </>
                  )}

                  <div className="px-6 py-4 pl-7">
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className="flex-shrink-0 transition-colors duration-300"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "2px",
                          color: isActive
                            ? "rgba(96,165,250,0.9)"
                            : "rgba(96,165,250,0.30)",
                        }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      <h3
                        className="flex-1 transition-colors duration-300"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 14,
                          fontWeight: 600,
                          color: isActive ? "#fff" : "rgba(255,255,255,0.78)",
                          lineHeight: 1.35,
                        }}
                      >
                        {item.question}
                      </h3>

                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="flex-shrink-0 transition-all duration-500"
                        style={{
                          transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                          color: isActive ? "#60A5FA" : "rgba(96,165,250,0.35)",
                        }}
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div
                      className="overflow-hidden transition-all duration-500 ease-out"
                      style={{
                        maxHeight: isActive ? 300 : 0,
                        opacity: isActive ? 1 : 0,
                        marginTop: isActive ? 12 : 0,
                        paddingLeft: 24,
                        transition:
                          "max-height 500ms cubic-bezier(0.4,0,0.2,1), opacity 400ms ease, margin-top 400ms ease",
                      }}
                    >
                      <div
                        className="mb-3"
                        style={{
                          height: 1,
                          background:
                            "linear-gradient(to right, rgba(37,99,235,0.35), rgba(96,165,250,0.15), transparent)",
                          borderRadius: 1,
                        }}
                      />
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 13,
                          color: "rgba(255,255,255,0.58)",
                          lineHeight: 1.7,
                        }}
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>

                  {isActive && (
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to right, transparent 0%, rgba(96,165,250,0.04) 50%, transparent 100%)",
                        transform: "skewX(-12deg)",
                        animation: "shimmer-sweep 1.4s ease forwards",
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer-sweep {
          from { transform: translateX(-120%) skewX(-12deg); }
          to   { transform: translateX(220%) skewX(-12deg); }
        }
      `}</style>
    </section>
  );
};

export default FAQSection;
