"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "WalkWays", to: "/walkways" as const, hash: undefined },
  { label: "Xone", to: "/" as const, hash: "xone" },
  { label: "Base Ground", to: "/" as const, hash: "base-ground" },
  { label: "Proving Ground", to: "/" as const, hash: "proving-ground" },
];

export function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const goToSection = (id: string) => {
    setOpen(false);
    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header
        style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--color-border)",
          boxShadow: scrolled ? "0 4px 24px rgba(10,22,40,0.06)" : "none",
          transition: "box-shadow 250ms cubic-bezier(0.4,0,0.2,1)",
        }}
        className="fixed inset-x-0 top-0 z-[100] h-[68px]"
      >
        <div
          className="mx-auto flex h-full items-center gap-10"
          style={{ padding: "0 max(5vw, 24px)" }}
        >
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/onskill-logo.png" alt="OnSKILL" width={32} height={32} className="h-8 w-8" />
            <span
              style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, color: "var(--color-navy)", letterSpacing: "-0.02em" }}
              className="text-[18px] leading-none"
            >
              ON<span style={{ color: "var(--color-accent)" }}>SKILL</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((l) =>
              l.hash ? (
                <button
                  key={l.label}
                  onClick={() => goToSection(l.hash!)}
                  className="story-link"
                  style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 500, fontSize: 15, color: "var(--color-navy)" }}
                >
                  {l.label}
                </button>
              ) : (
                <Link
                  key={l.label}
                  href={l.to}
                  className="story-link"
                  style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 500, fontSize: 15, color: "var(--color-navy)" }}
                >
                  {l.label}
                </Link>
              ),
            )}
          </nav>

          <div className="ml-auto hidden items-center gap-3 md:flex">
            <button
              onClick={() => router.push("/auth")}
              className="rounded-[10px] px-4 py-2 transition-all duration-[250ms]"
              style={{
                border: "1px solid var(--color-border)",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 500,
                fontSize: 14,
                color: "var(--color-navy)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent)";
                e.currentTarget.style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.color = "var(--color-navy)";
              }}
            >
              Login
            </button>
            <button
              onClick={() => router.push("/auth")}
              className="rounded-[10px] px-5 py-2.5 transition-all duration-[250ms]"
              style={{
                background: "var(--color-accent)",
                color: "#fff",
                fontFamily: "Sora, sans-serif",
                fontWeight: 600,
                fontSize: 14,
                boxShadow: "0 4px 16px rgba(29,110,245,0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-accent-hover)";
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(29,110,245,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--color-accent)";
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(29,110,245,0.25)";
              }}
            >
              Sign Up
            </button>
          </div>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="md:hidden ml-auto flex h-10 w-10 items-center justify-center rounded-md"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <line
                x1="3" y1="6" x2="19" y2="6"
                stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round"
                style={{
                  transformOrigin: "center",
                  transition: "transform 300ms cubic-bezier(0.4,0,0.2,1)",
                  transform: open ? "translateY(5px) rotate(45deg)" : "none",
                }}
              />
              <line x1="3" y1="11" x2="19" y2="11" stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round" style={{ opacity: open ? 0 : 1, transition: "opacity 200ms" }} />
              <line
                x1="3" y1="16" x2="19" y2="16"
                stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round"
                style={{
                  transformOrigin: "center",
                  transition: "transform 300ms cubic-bezier(0.4,0,0.2,1)",
                  transform: open ? "translateY(-5px) rotate(-45deg)" : "none",
                }}
              />
            </svg>
          </button>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-[99] md:hidden"
          style={{ background: "rgba(0,0,0,0.3)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute inset-x-0 top-[68px] bg-white"
            style={{ animation: "fadeUp 0.3s cubic-bezier(0.4,0,0.2,1)", boxShadow: "0 12px 32px rgba(10,22,40,0.08)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col">
              {NAV_LINKS.map((l) =>
                l.hash ? (
                  <button
                    key={l.label}
                    onClick={() => goToSection(l.hash!)}
                    className="h-12 px-6 text-left"
                    style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 500, fontSize: 15, color: "var(--color-navy)", borderBottom: "1px solid var(--color-border)" }}
                  >
                    {l.label}
                  </button>
                ) : (
                  <Link
                    key={l.label}
                    href={l.to}
                    className="h-12 px-6 flex items-center"
                    style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 500, fontSize: 15, color: "var(--color-navy)", borderBottom: "1px solid var(--color-border)" }}
                  >
                    {l.label}
                  </Link>
                ),
              )}
              <div className="flex gap-3 p-4">
                <button
                  onClick={() => router.push("/auth")}
                  className="flex-1 rounded-[10px] py-3"
                  style={{ border: "1px solid var(--color-border)", fontFamily: "DM Sans, sans-serif", fontWeight: 500, fontSize: 14 }}
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/auth")}
                  className="flex-1 rounded-[10px] py-3"
                  style={{ background: "var(--color-accent)", color: "#fff", fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 14 }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
