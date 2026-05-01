"use client";

import { Badge } from "@/components/ui/badge";
import type { TechStackNode as ITechStackNode } from "@/types/roadmap";
import { cn } from "@/lib/utils";
import { Code2, Terminal, Zap, Star, Database, Globe, ArrowRight, Medal } from "lucide-react";

interface TechStackNodeProps {
  node: ITechStackNode;
  position: { x: number; y: number };
  isSelected: boolean;
  isVisible: boolean;
  animationDelay: number;
  labelPosition: "above" | "below";
  onClick: () => void;
  index: number;
}

export function TechStackNode({
  node,
  position,
  isSelected,
  isVisible,
  animationDelay,
  labelPosition,
  onClick,
  index = 0,
}: TechStackNodeProps) {
  // Select an icon deterministically based on index
  const icons = [Star, Terminal, Database, Code2, Globe, Medal, Zap, ArrowRight];
  const Icon = icons[index % icons.length];

  return (
    <div
      onClick={onClick}
      className={cn(
        "absolute cursor-pointer transition-all duration-500 ease-out z-10",
        isSelected ? "scale-110 z-20" : "hover:scale-105",
        isVisible ? "opacity-100" : "opacity-0 translate-y-8"
      )}
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) ${isSelected ? 'scale(1.15)' : ''}`,
        transitionDelay: `${animationDelay}ms`,
      }}
    >
      <div className="relative flex flex-col items-center">
        {/* Label Above */}
        {labelPosition === "above" && (
          <div className="absolute bottom-full mb-4 flex flex-col items-center min-w-max pointer-events-none transition-all duration-300">
            {!node.isUserRequested && (
              <Badge variant="outline" style={{ background: "var(--color-warning)", color: "var(--color-navy)", borderColor: "var(--color-warning)", opacity: 0.9, marginBottom: 6, fontSize: 10 }}>
                📌 Resume Detected
              </Badge>
            )}
            <span style={{ fontFamily: "Sora, sans-serif", fontSize: 15, fontWeight: 700, color: "var(--color-navy)" }}>{node.name}</span>
            <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "var(--color-gray-text)", marginTop: 2 }}>{node.level}</span>
          </div>
        )}

        {/* The Circle */}
        <div
          className={cn(
            "flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300",
            isSelected ? "animate-node-selected" : ""
          )}
          style={{
            backgroundColor: node.color || "var(--color-accent)",
            boxShadow: `0 8px 24px ${node.color}66`,
            border: isSelected ? "3px solid #fff" : "3px solid transparent",
          }}
        >
          <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
        </div>

        {/* Label Below */}
        {labelPosition === "below" && (
          <div className="absolute top-full mt-4 flex flex-col items-center min-w-max pointer-events-none transition-all duration-300">
            <span style={{ fontFamily: "Sora, sans-serif", fontSize: 15, fontWeight: 700, color: "var(--color-navy)" }}>{node.name}</span>
            <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "var(--color-gray-text)", marginTop: 2 }}>{node.level}</span>
            {!node.isUserRequested && (
              <Badge variant="outline" style={{ background: "var(--color-warning)", color: "var(--color-navy)", borderColor: "var(--color-warning)", opacity: 0.9, marginTop: 6, fontSize: 10 }}>
                📌 Resume Detected
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
