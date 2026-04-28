"use client";

import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { WalkWaysRoadmap } from "@/components/WalkWaysRoadmap";

interface Track {
  name: string;
  duration: string;
  techs: string[];
  iconPath: React.ReactNode;
}

const TRACKS: Track[] = [
  {
    name: "Frontend Development",
    duration: "12–16 weeks",
    techs: ["React", "Vue", "CSS", "JavaScript", "TypeScript"],
    iconPath: <path d="M3 4h18v12H3zM2 20h20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />,
  },
  {
    name: "Backend Engineering",
    duration: "12–16 weeks",
    techs: ["Node.js", "Python", "SQL", "APIs", "Auth"],
    iconPath: <><rect x="3" y="4" width="18" height="6" rx="1" stroke="currentColor" strokeWidth="2" fill="none" /><rect x="3" y="14" width="18" height="6" rx="1" stroke="currentColor" strokeWidth="2" fill="none" /><circle cx="7" cy="7" r="1" fill="currentColor" /><circle cx="7" cy="17" r="1" fill="currentColor" /></>,
  },
  {
    name: "DevOps & Cloud",
    duration: "14–18 weeks",
    techs: ["AWS", "Docker", "K8s", "CI/CD", "Terraform"],
    iconPath: <path d="M7 18a4 4 0 010-8 6 6 0 0111.4 1A4 4 0 0117 18H7z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" />,
  },
  {
    name: "UI/UX Design",
    duration: "10–14 weeks",
    techs: ["Figma", "Design Systems", "Research", "Prototyping"],
    iconPath: <><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" /><path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
  },
];

export function WalkWays() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <main className="pt-[140px]">
        <header className="mx-auto max-w-[900px] px-6 text-center">
          <div
            style={{
              fontFamily: "DM Sans, sans-serif",
              color: "var(--color-accent)",
              fontSize: 12, fontWeight: 600,
              letterSpacing: 3, textTransform: "uppercase",
            }}
          >
            WalkWays
          </div>
          <h1
            className="mt-3"
            style={{
              fontFamily: "Sora, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(52px, 8vw, 88px)",
              color: "var(--color-navy)",
              lineHeight: 1.0,
            }}
          >
            Your WalkWay
          </h1>
          <div
            className="mt-3"
            style={{
              fontFamily: "Sora, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(20px, 3vw, 28px)",
              color: "var(--color-accent)",
            }}
          >
            Structured. Guided. Proven.
          </div>
          <p
            className="mx-auto mt-5 max-w-[560px]"
            style={{ fontFamily: "DM Sans, sans-serif", fontSize: 17, color: "var(--color-gray-text)" }}
          >
            A guided progression from beginner to verified professional. Move from
            Base Ground to Proving Ground to Xone — exactly in sequence.
          </p>
          <button
            onClick={() => {
              const el = document.getElementById("tracks");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-8 transition-all duration-[250ms]"
            style={{
              border: "2px solid var(--color-accent)",
              color: "var(--color-accent)",
              borderRadius: "var(--radius-md)",
              padding: "14px 36px",
              fontFamily: "Sora, sans-serif",
              fontWeight: 600,
              fontSize: 15,
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-accent)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--color-accent)";
            }}
          >
            Choose Your WalkWay ↓
          </button>
        </header>

        <WalkWaysRoadmap />

        <div className="flex justify-center" style={{ marginTop: -24, marginBottom: 80 }}>
          <button
            onClick={() => router.push("/auth")}
            className="transition-all duration-[250ms]"
            style={{
              background: "var(--color-accent)",
              color: "#fff",
              borderRadius: "var(--radius-md)",
              padding: "16px 40px",
              fontFamily: "Sora, sans-serif",
              fontWeight: 600,
              fontSize: 16,
              boxShadow: "0 8px 32px rgba(29,110,245,0.30)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-accent-hover)";
              e.currentTarget.style.transform = "scale(1.03) translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-accent)";
              e.currentTarget.style.transform = "scale(1) translateY(0)";
            }}
          >
            Start This WalkWay
          </button>
        </div>

        <section id="tracks" style={{ padding: "60px max(5vw, 24px) 120px" }}>
          <div className="mx-auto max-w-[1200px]">
            <div className="text-center">
              <div
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  color: "var(--color-accent)",
                  fontSize: 12, fontWeight: 600,
                  letterSpacing: 3, textTransform: "uppercase",
                }}
              >
                Career Tracks
              </div>
              <h2
                className="mt-3"
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(28px, 4vw, 40px)",
                  color: "var(--color-navy)",
                }}
              >
                Pick the WalkWay that fits your career.
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TRACKS.map((t) => (
                <div
                  key={t.name}
                  className="group flex flex-col transition-all duration-[300ms]"
                  style={{
                    background: "var(--color-white)",
                    border: "1.5px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                    padding: 32,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-accent)";
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-card-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ background: "var(--color-accent-light)", color: "var(--color-accent)" }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24">{t.iconPath}</svg>
                  </div>
                  <h3
                    className="mt-5"
                    style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 18, color: "var(--color-navy)" }}
                  >
                    {t.name}
                  </h3>
                  <div
                    className="mt-1"
                    style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "var(--color-gray-text)" }}
                  >
                    {t.duration}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {t.techs.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          background: "var(--color-accent-light)",
                          color: "var(--color-accent)",
                          borderRadius: 999,
                          padding: "3px 10px",
                          fontFamily: "DM Sans, sans-serif",
                          fontSize: 11,
                          fontWeight: 500,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div
                    className="mt-5"
                    style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, fontWeight: 500, color: "var(--color-success)" }}
                  >
                    🏅 Professional Track Certificate
                  </div>

                  <button
                    onClick={() => router.push("/auth")}
                    className="mt-6 w-full transition-all duration-[250ms]"
                    style={{
                      border: "1.5px solid var(--color-accent)",
                      color: "var(--color-accent)",
                      borderRadius: "var(--radius-md)",
                      padding: "12px",
                      fontFamily: "Sora, sans-serif",
                      fontWeight: 600,
                      fontSize: 14,
                      background: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--color-accent)";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--color-accent)";
                    }}
                  >
                    Start This Track
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default WalkWays;
