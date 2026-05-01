"use client";

import { useState } from "react";
import { PhasePanel } from "./PhasePanel";
import { RoadmapCanvas } from "./RoadmapCanvas";
import { DetailPanel } from "./DetailPanel";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { GeneratedRoadmap, TechStackNode } from "@/types/roadmap";

interface RoadmapWorkspaceProps {
  roadmap: GeneratedRoadmap;
  onReset: () => void;
}

export function RoadmapWorkspace({ roadmap, onReset }: RoadmapWorkspaceProps) {
  const [selectedNode, setSelectedNode] = useState<TechStackNode | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<number>(1);
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden pt-[68px] bg-slate-50 text-slate-900 font-sans">
      
      {/* LEFT PANEL */}
      <aside 
        className="w-full md:w-[380px] flex-shrink-0 border-r border-slate-200 z-20 md:block hidden bg-white shadow-[1px_0_10px_rgba(0,0,0,0.02)] relative"
      >
        <PhasePanel 
          roadmap={roadmap} 
          selectedPhase={selectedPhase} 
          onPhaseSelect={setSelectedPhase} 
        />
      </aside>

      {/* CENTER PANEL */}
      <main className="flex-1 relative flex flex-col overflow-hidden bg-[#F8FAFC]">
        {/* Top Summary Bar */}
        <div className="px-6 py-4 border-b border-slate-200 bg-white/80 backdrop-blur-md flex justify-between items-center z-10 shadow-sm">
          <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, color: "#475569", fontWeight: 500 }}>
            {roadmap.summary}
          </p>
          <button 
            onClick={onReset}
            className="text-sm font-semibold hover:bg-blue-50 transition-colors ml-4 flex-shrink-0 text-blue-600 bg-white px-4 py-2 rounded-full border border-blue-200 shadow-sm"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            ↩ Start Over
          </button>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 relative overflow-hidden flex items-center justify-center">
          {/* Subtle grid background for the canvas */}
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2563EB 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          
          <RoadmapCanvas 
            nodes={roadmap.techNodes}
            selectedNodeId={selectedNode?.id ?? null}
            onNodeClick={setSelectedNode}
          />
        </div>
      </main>

      {/* RIGHT PANEL - Desktop */}
      {!isMobile && selectedNode && (
        <aside 
          className="w-[420px] flex-shrink-0 border-l border-slate-200 bg-white z-20 shadow-[-4px_0_24px_rgba(0,0,0,0.03)]"
        >
          <DetailPanel 
            node={selectedNode} 
            onClose={() => setSelectedNode(null)} 
          />
        </aside>
      )}

      {/* RIGHT PANEL - Mobile Modal Fallback */}
      {isMobile && selectedNode && (
        <Dialog open={!!selectedNode} onOpenChange={(open) => !open && setSelectedNode(null)}>
          <DialogContent className="p-0 max-w-md w-[95vw] h-[85vh] sm:rounded-2xl overflow-hidden bg-white border-slate-200 text-slate-900 shadow-2xl">
            <DetailPanel 
              node={selectedNode} 
              onClose={() => setSelectedNode(null)} 
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
