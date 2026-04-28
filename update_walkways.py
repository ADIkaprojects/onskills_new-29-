import re

with open('src/views/Landing.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

start_idx = content.find('function WalkWaysMiniMockup() {')
end_idx = content.find('/* ---------------- WHY STATS ---------------- */', start_idx)

if start_idx == -1 or end_idx == -1:
    print(f"Could not find the bounds! start: {start_idx}, end: {end_idx}")
else:
    new_mockup = """function WalkWaysMiniMockup() {
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
\n"""
    new_content = content[:start_idx] + new_mockup + content[end_idx:]
    with open('src/views/Landing.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Replaced successfully")
