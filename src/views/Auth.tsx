"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Tab = "login" | "signup";

function getStrength(p: string) {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}

function FloatingInput({
  label,
  type = "text",
  value,
  onChange,
  required,
  rightSlot,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  rightSlot?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  const float = focused || value.length > 0;
  return (
    <label className="relative block">
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label={label}
        className="w-full transition-all"
        style={{
          padding: "16px 20px",
          paddingRight: rightSlot ? 48 : 20,
          border: `1.5px solid ${focused ? "var(--color-accent)" : "var(--color-border)"}`,
          borderRadius: "var(--radius-sm)",
          fontFamily: "DM Sans, sans-serif",
          fontSize: 15,
          background: "var(--color-white)",
          color: "var(--color-navy)",
          outline: "none",
          boxShadow: focused ? "0 0 0 3px var(--color-accent-glow)" : "none",
        }}
      />
      <span
        className="pointer-events-none absolute"
        style={{
          left: float ? 14 : 18,
          top: float ? -8 : "50%",
          transform: float ? "none" : "translateY(-50%)",
          fontFamily: "DM Sans, sans-serif",
          fontSize: float ? 11 : 14,
          fontWeight: float ? 600 : 400,
          color: float ? "var(--color-accent)" : "var(--color-gray-light)",
          background: "var(--color-white)",
          padding: float ? "0 4px" : 0,
          transition: "all 200ms cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {label}
        {required && float && " *"}
      </span>
      {rightSlot && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</div>}
    </label>
  );
}

function FloatingSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const [focused, setFocused] = useState(false);
  const float = focused || value.length > 0;
  return (
    <label className="relative block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label={label}
        className="w-full appearance-none transition-all"
        style={{
          padding: "16px 20px",
          border: `1.5px solid ${focused ? "var(--color-accent)" : "var(--color-border)"}`,
          borderRadius: "var(--radius-sm)",
          fontFamily: "DM Sans, sans-serif",
          fontSize: 15,
          background: "var(--color-white)",
          color: value ? "var(--color-navy)" : "var(--color-gray-light)",
          outline: "none",
          boxShadow: focused ? "0 0 0 3px var(--color-accent-glow)" : "none",
        }}
      >
        <option value="" />
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span
        className="pointer-events-none absolute"
        style={{
          left: float ? 14 : 18,
          top: float ? -8 : "50%",
          transform: float ? "none" : "translateY(-50%)",
          fontFamily: "DM Sans, sans-serif",
          fontSize: float ? 11 : 14,
          fontWeight: float ? 600 : 400,
          color: float ? "var(--color-accent)" : "var(--color-gray-light)",
          background: "var(--color-white)",
          padding: float ? "0 4px" : 0,
          transition: "all 200ms cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {label}
      </span>
      <svg
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
        width="14" height="14" viewBox="0 0 24 24"
      >
        <path d="M6 9l6 6 6-6" stroke="var(--color-gray-light)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </label>
  );
}

function Toast({ show, onDone }: { show: boolean; onDone: () => void }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [show, onDone]);
  return (
    <div
      style={{
        position: "fixed",
        top: 24,
        right: 24,
        background: "var(--color-white)",
        borderLeft: "4px solid var(--color-success)",
        boxShadow: "0 12px 40px rgba(10,22,40,0.14)",
        borderRadius: "var(--radius-md)",
        padding: "14px 22px",
        fontFamily: "DM Sans, sans-serif",
        fontSize: 14,
        color: "var(--color-navy)",
        zIndex: 1000,
        transform: show ? "translateX(0)" : "translateX(120%)",
        opacity: show ? 1 : 0,
        transition: "all 400ms cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      Welcome to OnSKILL! 🎉 Your journey begins now.
    </div>
  );
}

function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const [user, setUser] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);

  return (
    <form
      className="flex flex-col gap-4"
      style={{ animation: "fadeUp 0.3s cubic-bezier(0.4,0,0.2,1)" }}
      onSubmit={(e) => e.preventDefault()}
    >
      <h1 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 34, color: "var(--color-navy)", lineHeight: 1.1 }}>
        Welcome Back.
      </h1>
      <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 15, color: "var(--color-gray-text)", marginTop: -8, marginBottom: 12 }}>
        Sign in to continue your skill journey.
      </p>

      <FloatingInput label="Username or Email" value={user} onChange={setUser} required />
      <FloatingInput
        label="Password"
        type={showPw ? "text" : "password"}
        value={pw}
        onChange={setPw}
        required
        rightSlot={
          <button type="button" aria-label="Toggle password" onClick={() => setShowPw((v) => !v)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              {showPw ? (
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zm10 3a3 3 0 100-6 3 3 0 000 6z" stroke="var(--color-gray-light)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M3 3l18 18M10.6 6.1A10.5 10.5 0 0112 6c6.5 0 10 7 10 7a13.6 13.6 0 01-3.4 4M6.5 6.5C3.5 8.5 2 12 2 12s3.5 7 10 7c1.6 0 3-.3 4.3-.8M9.9 9.9a3 3 0 004.2 4.2" stroke="var(--color-gray-light)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        }
      />

      <button
        type="button"
        className="self-end"
        style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "var(--color-accent)", marginTop: -6 }}
      >
        Forgot Password?
      </button>

      <button
        type="submit"
        className="w-full transition-all"
        style={{
          background: "var(--color-accent)",
          color: "#fff",
          borderRadius: "var(--radius-md)",
          padding: "15px",
          fontFamily: "Sora, sans-serif",
          fontWeight: 600,
          fontSize: 15,
          marginTop: 12,
          boxShadow: "0 8px 24px rgba(29,110,245,0.25)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--color-accent-hover)";
          e.currentTarget.style.transform = "scale(1.01)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "var(--color-accent)";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Sign In →
      </button>

      <div className="my-2 flex items-center gap-3">
        <div className="h-px flex-1" style={{ background: "var(--color-border)" }} />
        <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "var(--color-gray-light)" }}>
          or continue with
        </span>
        <div className="h-px flex-1" style={{ background: "var(--color-border)" }} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Google", icon: "G" },
          { label: "LinkedIn", icon: "in" },
        ].map((s) => (
          <button
            key={s.label}
            type="button"
            className="flex items-center justify-center gap-2 transition-all"
            style={{
              border: "1.5px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              padding: "12px",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 500,
              fontSize: 14,
              color: "var(--color-navy)",
              background: "var(--color-white)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-accent)";
              e.currentTarget.style.background = "var(--color-accent-light)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)";
              e.currentTarget.style.background = "var(--color-white)";
            }}
          >
            <span
              style={{
                width: 22, height: 22, borderRadius: 999,
                background: "var(--color-accent-light)",
                color: "var(--color-accent)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 12,
              }}
            >
              {s.icon}
            </span>
            {s.label}
          </button>
        ))}
      </div>

      <p
        className="mt-4 text-center"
        style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, color: "var(--color-gray-text)" }}
      >
        Don't have an account?{" "}
        <button type="button" onClick={onSwitch} style={{ color: "var(--color-accent)", fontWeight: 600 }}>
          Sign Up
        </button>
      </p>
    </form>
  );
}

function SignupForm({ onSwitch, onSuccess }: { onSwitch: () => void; onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [org, setOrg] = useState("");
  const [role, setRole] = useState("");
  const [track, setTrack] = useState("");
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [terms, setTerms] = useState(false);

  const strength = getStrength(pw);
  const strengthColors = ["#EF4444", "#EF4444", "#F59E0B", "#10B981", "#059669"];
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const match = confirm.length > 0 && confirm === pw;
  const mismatch = confirm.length > 0 && confirm !== pw;

  return (
    <form
      className="flex flex-col gap-4"
      style={{ animation: "fadeUp 0.3s cubic-bezier(0.4,0,0.2,1)" }}
      onSubmit={(e) => {
        e.preventDefault();
        if (!terms || !match) return;
        onSuccess();
      }}
    >
      <h1 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 34, color: "var(--color-navy)", lineHeight: 1.1 }}>
        Create Account.
      </h1>
      <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 15, color: "var(--color-gray-text)", marginTop: -8, marginBottom: 8 }}>
        Join 10,000+ learners building verified skills.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FloatingInput label="Full Name" value={name} onChange={setName} required />
        <FloatingInput label="Username" value={username} onChange={setUsername} required />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FloatingInput label="Email Address" type="email" value={email} onChange={setEmail} required />
        <div className="flex items-stretch">
          <div
            className="flex items-center px-3"
            style={{
              border: "1.5px solid var(--color-border)",
              borderRight: "none",
              borderTopLeftRadius: "var(--radius-sm)",
              borderBottomLeftRadius: "var(--radius-sm)",
              fontFamily: "DM Sans, sans-serif",
              fontSize: 14,
              color: "var(--color-navy)",
              background: "var(--color-bg)",
            }}
          >
            +91 ▼
          </div>
          <div className="flex-1">
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile Number"
              aria-label="Mobile Number"
              className="w-full"
              style={{
                padding: "16px 18px",
                border: "1.5px solid var(--color-border)",
                borderTopRightRadius: "var(--radius-sm)",
                borderBottomRightRadius: "var(--radius-sm)",
                fontFamily: "DM Sans, sans-serif",
                fontSize: 15,
                outline: "none",
              }}
            />
          </div>
        </div>
      </div>

      <FloatingInput label="Organization / College Name" value={org} onChange={setOrg} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FloatingSelect
          label="Your Role"
          value={role}
          onChange={setRole}
          options={["Student", "Working Professional", "Hiring Partner", "Educator", "Freelancer"]}
        />
        <FloatingSelect
          label="Track Interest"
          value={track}
          onChange={setTrack}
          options={["Frontend", "Backend", "DevOps", "UI/UX", "Data & AI", "Mobile"]}
        />
      </div>

      <div>
        <FloatingInput label="Password" type="password" value={pw} onChange={setPw} required />
        {pw.length > 0 && (
          <div className="mt-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-1 flex-1 rounded-full transition-colors"
                  style={{ background: i <= strength ? strengthColors[strength] : "var(--color-border)" }}
                />
              ))}
            </div>
            <div className="mt-1 flex justify-between">
              <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "var(--color-gray-light)" }}>
                Use 8+ chars, A–Z, 0–9, symbol
              </span>
              <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, fontWeight: 600, color: strengthColors[strength] }}>
                {strengthLabel} {strength === 4 ? "✓" : ""}
              </span>
            </div>
          </div>
        )}
      </div>

      <div>
        <FloatingInput
          label="Confirm Password"
          type="password"
          value={confirm}
          onChange={setConfirm}
          required
          rightSlot={match ? <span style={{ color: "var(--color-success)" }}>✓</span> : undefined}
        />
        {mismatch && (
          <div
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: 12,
              color: "var(--color-danger)",
              marginTop: 6,
              animation: "fadeIn 200ms cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            Passwords do not match
          </div>
        )}
      </div>

      <label className="flex items-start gap-2.5 cursor-pointer" style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "var(--color-gray-text)" }}>
        <span
          className="mt-0.5 inline-flex shrink-0 items-center justify-center transition-all"
          style={{
            width: 18, height: 18, borderRadius: 5,
            border: `1.5px solid ${terms ? "var(--color-accent)" : "var(--color-border)"}`,
            background: terms ? "var(--color-accent)" : "transparent",
          }}
        >
          {terms && (
            <svg width="11" height="11" viewBox="0 0 24 24">
              <path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="sr-only" />
        <span>
          I agree to the{" "}
          <a href="#" style={{ color: "var(--color-accent)" }}>Terms of Service</a> and{" "}
          <a href="#" style={{ color: "var(--color-accent)" }}>Privacy Policy</a>.
        </span>
      </label>

      <button
        type="submit"
        disabled={!terms || !match}
        className="w-full transition-all"
        style={{
          background: !terms || !match ? "var(--color-gray-light)" : "var(--color-accent)",
          color: "#fff",
          borderRadius: "var(--radius-md)",
          padding: "15px",
          fontFamily: "Sora, sans-serif",
          fontWeight: 600,
          fontSize: 15,
          marginTop: 6,
          boxShadow: !terms || !match ? "none" : "0 8px 24px rgba(29,110,245,0.25)",
          cursor: !terms || !match ? "not-allowed" : "pointer",
        }}
      >
        Create My Account →
      </button>

      <p
        className="mt-2 text-center"
        style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, color: "var(--color-gray-text)" }}
      >
        Already have an account?{" "}
        <button type="button" onClick={onSwitch} style={{ color: "var(--color-accent)", fontWeight: 600 }}>
          Login
        </button>
      </p>
    </form>
  );
}

export function Auth() {
  const [tab, setTab] = useState<Tab>("login");
  const [toast, setToast] = useState(false);
  const router = useRouter();

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* LEFT */}
      <div
        className="overflow-y-auto"
        style={{ background: "var(--color-white)", padding: "60px clamp(32px,6vw,80px)" }}
      >
        <button
          onClick={() => router.push("/")}
          className="transition-colors"
          style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "var(--color-gray-text)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-gray-text)")}
        >
          ← Back to OnSKILL
        </button>

        <div className="mt-10 flex justify-center">
          <div
            className="inline-flex p-1"
            style={{ background: "var(--color-accent-light)", borderRadius: 999 }}
          >
            {(["login", "signup"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="transition-all"
                style={{
                  borderRadius: 999,
                  padding: "10px 28px",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  background: tab === t ? "var(--color-accent)" : "transparent",
                  color: tab === t ? "#fff" : "var(--color-gray-text)",
                  boxShadow: tab === t ? "0 4px 12px rgba(29,110,245,0.25)" : "none",
                }}
              >
                {t === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 w-full max-w-[460px]">
          {tab === "login" ? (
            <LoginForm onSwitch={() => setTab("signup")} />
          ) : (
            <SignupForm onSwitch={() => setTab("login")} onSuccess={() => setToast(true)} />
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div
        className="relative hidden overflow-hidden lg:block"
        style={{ background: "linear-gradient(140deg, var(--color-accent) 0%, #1345C0 100%)" }}
      >
        <div
          className="absolute"
          style={{ width: 300, height: 300, borderRadius: 999, background: "rgba(255,255,255,0.06)", top: -80, right: -80 }}
        />
        <div
          className="absolute"
          style={{ width: 400, height: 400, borderRadius: 999, background: "rgba(255,255,255,0.04)", bottom: -120, left: -120 }}
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-center p-[60px_48px] text-center text-white">
          <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 38, lineHeight: 1.15 }}>
            Practice Today.
            <br />
             Certify Tomorrow.
          </h2>
          <p
            className="mx-auto mt-4 max-w-[360px]"
            style={{ fontFamily: "DM Sans, sans-serif", fontSize: 16, color: "rgba(255,255,255,0.80)" }}
          >
            Thousands of learners and professionals are already preparing on OnSkill. Your exam 
prep, your mock tests, your certification journey it all lives herex
          </p>

          {/* FLOATING SKILL CARD */}
          <div
            className="animate-float"
            style={{
              background: "var(--color-white)",
              borderRadius: "var(--radius-lg)",
              padding: 24,
              boxShadow: "0 24px 64px rgba(10,22,40,0.20)",
              width: 340,
              margin: "36px auto 0",
              color: "var(--color-navy)",
              textAlign: "left",
              position: "relative",
            }}
          >
            <span
              className="absolute"
              style={{
                top: 14, right: 14,
                background: "var(--color-accent-light)",
                color: "var(--color-accent)",
                borderRadius: 999,
                padding: "4px 10px",
                fontFamily: "DM Sans, sans-serif", fontSize: 11, fontWeight: 600,
              }}
            >
              ✦ +120 XP today
            </span>

            <div className="flex items-center gap-3">
              <svg width="52" height="52" viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="22" stroke="rgba(29,110,245,0.12)" strokeWidth="5" fill="none" />
                <circle
                  cx="26" cy="26" r="22"
                  stroke="var(--color-accent)" strokeWidth="5" fill="none"
                  strokeDasharray={2 * Math.PI * 22}
                  strokeDashoffset={2 * Math.PI * 22 * (1 - 0.78)}
                  strokeLinecap="round"
                  transform="rotate(-90 26 26)"
                />
                <text x="26" y="30" textAnchor="middle" style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 13, fill: "var(--color-navy)" }}>
                  78%
                </text>
              </svg>
              <div className="flex-1">
                <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 15 }}>Alex Morgan</div>
                <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "var(--color-gray-text)" }}>
                  Frontend Engineer · Track L4
                </div>
              </div>
            </div>
            <div className="mt-2.5 flex items-center gap-1.5" style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "var(--color-success)" }}>
              <span style={{ width: 8, height: 8, background: "var(--color-success)", borderRadius: 999, display: "inline-block" }} />
              Skill Verified
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2.5" style={{ background: "var(--color-accent-light)", borderRadius: 8, padding: "10px 12px" }}>
                <span
                  style={{
                    width: 30, height: 30, borderRadius: 6,
                    background: "var(--color-accent)", color: "#fff",
                    display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14,
                  }}
                >
                  ⭐
                </span>
                <div className="min-w-0">
                  <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 12.5 }}>React Pro</div>
                  <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 10.5, color: "var(--color-gray-text)" }}>Earned · Mar 2025</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5" style={{ background: "var(--color-accent-light)", borderRadius: 8, padding: "10px 12px" }}>
                <span
                  style={{
                    width: 30, height: 30, borderRadius: 6,
                    background: "var(--color-navy)", color: "#fff",
                    display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14,
                  }}
                >
                  ✓
                </span>
                <div className="min-w-0">
                  <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 12.5 }}>System Design</div>
                  <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 10.5, color: "var(--color-gray-text)" }}>Verified · L3</div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, fontWeight: 500, color: "var(--color-navy)" }}>
                  Next milestone
                </span>
                <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, fontWeight: 500, color: "var(--color-accent)" }}>
                  Module 6 of 8
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full" style={{ background: "var(--color-accent-light)" }}>
                <div
                  className="h-full"
                  style={{
                    background: "var(--color-accent)",
                    borderRadius: 999,
                    width: "75%",
                    animation: "fadeIn 800ms cubic-bezier(0.4,0,0.2,1)",
                  }}
                />
              </div>
            </div>
          </div>

          <div
            className="mt-6 flex flex-wrap items-center justify-center gap-4"
            style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.70)" }}
          >
            <span>✦ ISO Certified</span>
            <span>✦ Blockchain Verified</span>
            <span>✦ Employer Trusted</span>
          </div>
        </div>
      </div>

      <Toast show={toast} onDone={() => setToast(false)} />
    </div>
  );
}

export default Auth;
