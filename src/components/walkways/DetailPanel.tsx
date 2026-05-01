"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ASSESSMENTS } from "@/data/assessments";
import type { TechStackNode } from "@/types/roadmap";
import { cn } from "@/lib/utils";

interface DetailPanelProps {
  node: TechStackNode;
  onClose: () => void;
}

export function DetailPanel({ node, onClose }: DetailPanelProps) {
  const router = useRouter();

  const handleStartAssessment = () => {
    router.push('/auth');
  };

  const getAssessmentDetails = (name: string) => {
    return ASSESSMENTS.find(a => a.name === name) ?? null;
  };

  const dotColors = ["#3B82F6", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

  return (
    <div className="flex flex-col h-full bg-white text-slate-900 overflow-y-auto no-scrollbar relative border-l border-slate-200">
      {/* Header */}
      <div className="p-8 pb-6 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-md z-20 shadow-sm">
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-blue-600 transition-colors mb-4 flex items-center gap-1 text-sm font-semibold"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          ← Close
        </button>
        <div className="flex justify-between items-start">
          <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: 28, fontWeight: 700, color: "#0F172A" }}>
            {node.name} Roadmap
          </h2>
        </div>
        <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, color: "#64748B", marginTop: 8 }}>
          Level: <span className="font-semibold text-slate-900">{node.level}</span> • Total Duration: <span className="font-semibold text-slate-900">{node.totalDuration}</span>
        </p>
      </div>

      <div className="p-8 space-y-10 pb-24">
        {!node.isUserRequested && node.aceMessage && (
          <div className="p-5 rounded-xl bg-amber-50 border border-amber-200 shadow-sm">
            <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, color: "#B45309", lineHeight: 1.5, fontWeight: 500 }}>
              📌 {node.aceMessage}
            </p>
          </div>
        )}

        {/* Walkroad Style Tree (Vertical Timeline) */}
        <div className="relative pl-3 mt-4">
          {/* Main vertical line */}
          <div className="absolute left-[15px] top-2 bottom-4 w-[2px] bg-slate-100" />

          {node.phases.map((phase, idx) => {
            const dotColor = dotColors[idx % dotColors.length];
            return (
              <div key={idx} className="relative pl-10 pb-12 last:pb-0 group">
                {/* Colored Dot */}
                <div 
                  className="absolute left-[9px] top-[6px] w-[14px] h-[14px] rounded-full z-10 transition-transform duration-300 group-hover:scale-125 border-4 border-white" 
                  style={{ backgroundColor: dotColor, boxShadow: `0 0 0 1px ${dotColor}40, 0 4px 10px ${dotColor}60` }}
                />

                {/* Phase Title */}
                <div className="mb-6">
                  <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: 18, fontWeight: 700, color: "#1E293B" }}>
                    {idx + 1}. {phase.title} <span className="text-slate-400 font-medium text-sm ml-2">({phase.weekRange})</span>
                  </h3>
                  <p className="mt-2 text-slate-500 text-sm leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    {phase.objective}
                  </p>
                </div>

                {/* Todos & Assignments List */}
                <div className="space-y-4 mt-6">
                  {phase.todos.map((todo, tIdx) => (
                    <div key={tIdx} className="flex gap-4 items-start p-5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-300 hover:shadow-sm transition-all">
                      <div className="mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: dotColor }} />
                      <div className="min-w-0 flex-1">
                        <div className="break-words" style={{ fontFamily: "DM Sans, sans-serif", fontSize: 15, fontWeight: 600, color: "#334155" }}>
                          {todo.task}
                        </div>
                        <div className="break-words" style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, color: "#64748B", marginTop: 6, lineHeight: 1.6 }}>
                          {todo.description}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          <Badge variant="outline" className="border-slate-200 text-slate-500 bg-white text-[11px] font-medium px-2.5 py-0.5">⏳ {todo.deadline}</Badge>
                          <Badge variant="outline" className="border-slate-200 text-slate-500 bg-white text-[11px] font-medium px-2.5 py-0.5">📚 {todo.resourceHint}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Assessments for this Phase */}
                  {phase.assessments.map((ass, aIdx) => {
                    const details = getAssessmentDetails(ass.name);
                    if (!details) return null;
                    return (
                      <div 
                        key={aIdx} 
                        onClick={handleStartAssessment}
                        className="flex gap-4 items-start p-5 rounded-xl border cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md bg-white border-blue-200"
                      >
                        <div className="mt-0.5 text-2xl flex-shrink-0">
                          🏆
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <span style={{ fontFamily: "Sora, sans-serif", fontSize: 15, fontWeight: 700, color: "#1E3A8A" }}>
                              {details.name} Assessment
                            </span>
                            <Badge className="bg-blue-600 hover:bg-blue-700 text-white border-none text-[10px] px-2 py-0.5 shadow-sm">Required</Badge>
                          </div>
                          <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#3B82F6", lineHeight: 1.6 }}>
                            {ass.reason}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
