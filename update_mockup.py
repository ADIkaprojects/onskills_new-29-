import re

with open('src/views/Landing.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

start_idx = content.find('function ProvingGroundMockup() {')
end_idx = content.find('/**\n * XoneVideoMockup', start_idx)

if start_idx == -1 or end_idx == -1:
    print(f"Could not find the bounds! start: {start_idx}, end: {end_idx}")
else:
    new_mockup = """function ProvingGroundMockup() {
  return (
    <div
      className="relative w-full overflow-hidden transition-all duration-500 hover:shadow-2xl"
      style={{
        background: "rgba(11, 18, 32, 0.7)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        borderRadius: "var(--radius-xl)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 32px 80px -16px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
    >
      {/* Top Header - IDE style */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
        }}
      >
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-1.5 opacity-80 transition-opacity hover:opacity-100 sm:flex">
            <div className="h-3 w-3 rounded-full bg-[#FF5F56] shadow-[0_0_8px_rgba(255,95,86,0.5)]" />
            <div className="h-3 w-3 rounded-full bg-[#FFBD2E] shadow-[0_0_8px_rgba(255,189,46,0.5)]" />
            <div className="h-3 w-3 rounded-full bg-[#27C93F] shadow-[0_0_8px_rgba(39,201,63,0.5)]" />
          </div>
          <div className="hidden h-5 w-px bg-white/10 sm:block" />
          <div className="flex items-center gap-2">
            <div className="relative flex h-6 w-6 items-center justify-center rounded-[6px] border border-blue-500/30 bg-blue-500/20 text-blue-400">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <span className="text-[13px] font-medium tracking-wide text-white/90" style={{ fontFamily: "Inter, sans-serif" }}>Proving Ground</span>
            <div className="ml-2 flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-0.5">
              <span className="font-mono text-[11px] tracking-wider text-white/60">JS</span>
            </div>
          </div>
        </div>
        <div 
          className="flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 shadow-[0_0_12px_rgba(239,68,68,0.15)]"
        >
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
          <span className="font-mono text-xs font-semibold tracking-wider text-red-300">43:22</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 md:flex-row">
        {/* Left Panel: AI Prompt */}
        <div className="flex w-full flex-col gap-3 md:w-2/5">
          <div 
            className="group relative flex-1 overflow-hidden rounded-[12px] p-5"
            style={{ 
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              boxShadow: "inset 0 0 20px rgba(0,0,0,0.2)"
            }}
          >
            {/* Ambient glow that moves on hover */}
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/10 blur-[32px] transition-all duration-700 group-hover:scale-110 group-hover:bg-blue-500/20" />
            
            <div className="relative z-10 mb-4 flex items-center justify-between">
              <span className="flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-indigo-300">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                AI Task
              </span>
            </div>
            <p className="relative z-10 text-[13px] font-medium leading-relaxed text-white/70" style={{ fontFamily: "Inter, sans-serif" }}>
              Implement <code className="rounded border border-white/5 bg-black/40 px-1.5 py-0.5 font-mono text-[12px] text-blue-300">debounce(fn, ms)</code>. 
              It should delay invocation until <code className="rounded border border-white/5 bg-black/40 px-1.5 py-0.5 font-mono text-[12px] text-blue-300">ms</code> has elapsed since the last call.
            </p>
            
            <div className="group/hint relative z-10 mt-6 flex cursor-pointer items-start gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 transition-all duration-300 hover:border-amber-500/30 hover:bg-amber-500/10">
              <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 group-hover/hint:shadow-[0_0_12px_rgba(245,158,11,0.4)]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M11 2v4h2V2h-2zm3.32 3.18L12.9 6.6l1.42 1.41 1.41-1.42-1.41-1.41zM2 11h4v2H2v-2zm18 0h4v2h-4v-2zM5.4 6.6l-1.42-1.42-1.41 1.42 1.42 1.41 1.41-1.41zM12 8c-2.2 0-4 1.8-4 4 0 1.5.8 2.8 2 3.5V18c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-2.5c1.2-.7 2-2 2-3.5 0-2.2-1.8-4-4-4zM10 20h4v2h-4v-2z"/></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-semibold tracking-wide text-amber-200/90">Hint Available</span>
                <span className="mt-0.5 font-medium text-[11px] text-amber-200/50 transition-colors group-hover/hint:text-amber-200/70">Click to reveal approach</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Code Editor */}
        <div className="group flex w-full flex-col md:w-3/5">
          <div 
            className="flex-1 overflow-hidden rounded-[12px]"
            style={{ 
              background: "#0d1117", 
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3)"
            }}
          >
            <div className="flex h-full font-mono text-[13px] leading-[1.65]">
              {/* Line Numbers */}
              <div className="select-none border-r border-white/5 bg-[#090d13] px-3 py-4 text-right font-medium text-white/20">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <div key={n} className="opacity-50">{n}</div>)}
              </div>
              {/* Code */}
              <div className="relative flex-1 overflow-x-auto p-4 text-[#c9d1d9]">
                <div className="flex flex-col whitespace-pre">
                  <div><span className="text-[#ff7b72]">function</span> <span className="text-[#d2a8ff]">debounce</span><span className="text-[#c9d1d9]">(fn, ms)</span> <span className="text-[#c9d1d9]">{"{"}</span></div>
                  <div>  <span className="text-[#ff7b72]">let</span> <span className="text-[#c9d1d9]">t;</span></div>
                  <div>  <span className="text-[#ff7b72]">return</span> <span className="text-[#c9d1d9]">(</span><span className="text-[#ff7b72]">...</span><span className="text-[#c9d1d9]">args)</span> <span className="text-[#ff7b72]">=&gt;</span> <span className="text-[#c9d1d9]">{"{"}</span></div>
                  <div>    <span className="text-[#79c0ff]">clearTimeout</span><span className="text-[#c9d1d9]">(t);</span></div>
                  <div>    <span className="text-[#c9d1d9]">t = </span><span className="text-[#79c0ff]">setTimeout</span><span className="text-[#c9d1d9]">(()</span> <span className="text-[#ff7b72]">=&gt;</span> <span className="text-[#d2a8ff]">fn</span><span className="text-[#c9d1d9]">(</span><span className="text-[#ff7b72]">...</span><span className="text-[#c9d1d9]">args), ms);</span></div>
                  <div>  <span className="text-[#c9d1d9]">{"}"};</span></div>
                  <div><span className="text-[#c9d1d9]">{"}"}</span></div>
                  
                  {/* Floating Success Notification */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-[6px] border border-[#2ea043]/30 bg-[#238636]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#3fb950] shadow-[0_4px_12px_rgba(0,0,0,0.2)] backdrop-blur-md">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    <span>Passes 4/5 Tests</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div 
        className="flex items-center justify-between px-5 py-4"
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.04)",
          background: "linear-gradient(0deg, rgba(0,0,0,0.2) 0%, transparent 100%)"
        }}
      >
        <div className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-wide text-white/30">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
          </span>
          Connected to VM
        </div>
        <div className="flex items-center gap-3">
          <button
            className="group relative overflow-hidden rounded-[8px] transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "8px 20px",
            }}
          >
            <span className="relative z-10 text-[13px] font-medium text-white/80" style={{ fontFamily: "Inter, sans-serif" }}>Run Code</span>
            <div className="absolute inset-0 bg-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
          
          <button
            className="group relative overflow-hidden rounded-[8px] transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "var(--color-accent)",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "8px 24px",
              boxShadow: "0 4px 14px 0 rgba(37,99,235,0.39)",
            }}
          >
            <span className="relative z-10 text-[13px] font-semibold tracking-wide text-white" style={{ fontFamily: "Inter, sans-serif" }}>Submit Solution</span>
            <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-20 blur-lg transition-opacity group-hover:opacity-40" />
          </button>
        </div>
      </div>
    </div>
  );
}
"""
    new_content = content[:start_idx] + new_mockup + "\n" + content[end_idx:]
    with open('src/views/Landing.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Replaced successfully")
