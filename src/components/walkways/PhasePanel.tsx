"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ASSESSMENTS } from "@/data/assessments";
import type { GeneratedRoadmap } from "@/types/roadmap";
import { cn } from "@/lib/utils";

interface PhasePanelProps {
  roadmap: GeneratedRoadmap;
  selectedPhase: number;
  onPhaseSelect: (phaseNumber: number) => void;
}

export function PhasePanel({ roadmap, selectedPhase, onPhaseSelect }: PhasePanelProps) {
  const router = useRouter();

  const aggregatedPhases = useMemo(() => {
    const phasesMap = new Map<number, any>();

    roadmap.techNodes.forEach((node) => {
      node.phases.forEach((phase) => {
        if (!phasesMap.has(phase.phaseNumber)) {
          phasesMap.set(phase.phaseNumber, {
            phaseNumber: phase.phaseNumber,
            weekRange: phase.weekRange,
            title: phase.title,
            objectives: [],
            todos: [],
            assessments: [],
          });
        }
        const aggregated = phasesMap.get(phase.phaseNumber);
        aggregated.objectives.push({ tech: node.name, text: phase.objective });
        
        phase.todos.forEach(todo => {
          aggregated.todos.push({ tech: node.name, ...todo });
        });
        
        phase.assessments.forEach(ass => {
          if (!aggregated.assessments.find((a: any) => a.name === ass.name)) {
            aggregated.assessments.push({ tech: node.name, ...ass });
          }
        });
      });
    });

    return Array.from(phasesMap.values()).sort((a, b) => a.phaseNumber - b.phaseNumber);
  }, [roadmap]);

  const handleStartAssessment = () => {
    router.push('/auth');
  };

  const getAssessmentDetails = (name: string) => {
    return ASSESSMENTS.find(a => a.name === name) ?? null;
  };

  return (
    <div className="flex flex-col h-full bg-white text-slate-900 overflow-y-auto no-scrollbar border-r border-slate-200">
      <div className="p-8 pb-6 sticky top-0 bg-white/95 backdrop-blur-md z-10 border-b border-slate-100">
        <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: 28, fontWeight: 700, color: "#0F172A" }}>
          Roadmap
        </h2>
        <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, color: "#64748B", marginTop: 8 }}>
          {roadmap.totalDuration} to Mastery
        </p>
      </div>

      <div className="flex-1 p-6 space-y-6">
        {aggregatedPhases.map((phase, idx) => {
          const isActive = phase.phaseNumber === selectedPhase;
          const isCompleted = phase.phaseNumber < selectedPhase;

          return (
            <div
              key={phase.phaseNumber}
              className={cn(
                "rounded-xl transition-all duration-300 overflow-hidden border",
                isActive 
                  ? "bg-blue-50/40 border-blue-200 shadow-sm" 
                  : "bg-white border-slate-200 hover:border-blue-100 hover:shadow-sm"
              )}
            >
              <button
                className="w-full text-left p-6 flex justify-between items-center group"
                onClick={() => onPhaseSelect(phase.phaseNumber)}
              >
                <div className="flex gap-6 items-center">
                  <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: isActive ? "#2563EB" : "#64748B", fontWeight: isActive ? 600 : 500, minWidth: 60 }}>
                    Phase {phase.phaseNumber}
                  </div>
                  <div>
                    <div style={{ fontFamily: "Sora, sans-serif", fontSize: 18, fontWeight: 600, color: isActive ? "#1E293B" : "#475569", transition: "color 0.2s" }}>
                      {phase.title}
                    </div>
                  </div>
                </div>
                <div className={cn(
                  "transition-colors duration-200",
                  isActive ? "text-blue-600" : "text-slate-400 group-hover:text-blue-500"
                )}>
                  {isActive ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>

              <div 
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="p-6 pt-0 space-y-8">
                    
                    {/* Objectives */}
                    <div>
                      <h4 style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
                        Objectives ({phase.weekRange})
                      </h4>
                      <ul className="space-y-3">
                        {phase.objectives.map((obj: any, i: number) => (
                          <li key={i} className="flex gap-3 text-slate-700" style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14 }}>
                            <span className="text-blue-600 font-semibold">{obj.tech}</span>
                            <span>{obj.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Todos */}
                    {phase.todos.length > 0 && (
                      <div>
                        <h4 style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
                          Tasks
                        </h4>
                        <div className="space-y-4">
                          {phase.todos.map((todo: any, i: number) => (
                            <div key={i} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                              <div className="break-words" style={{ fontFamily: "Sora, sans-serif", fontSize: 14, fontWeight: 600, color: "#1E293B" }}>
                                {todo.task}
                              </div>
                              <div className="break-words" style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#64748B", marginTop: 6, lineHeight: 1.5 }}>
                                {todo.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Assessments */}
                    {phase.assessments.length > 0 && (
                      <div>
                        <h4 style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
                          Assessments
                        </h4>
                        <div className="space-y-3">
                          {phase.assessments.map((ass: any, i: number) => {
                            const details = getAssessmentDetails(ass.name);
                            if (!details) return null;
                            return (
                              <div key={i} className="p-4 rounded-xl border border-blue-100 bg-blue-50/80 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:bg-blue-100/50 transition-colors">
                                <div>
                                  <div style={{ fontFamily: "Sora, sans-serif", fontSize: 14, fontWeight: 600, color: "#1E3A8A" }}>
                                    {details.name}
                                  </div>
                                  <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#3B82F6", marginTop: 4 }}>
                                    {ass.reason}
                                  </div>
                                </div>
                                <Button 
                                  onClick={handleStartAssessment}
                                  className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-sm"
                                  size="sm"
                                >
                                  Start
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
