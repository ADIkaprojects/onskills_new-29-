"use client";

import { useEffect, useRef, useState } from "react";
import { TechStackNode } from "./TechStackNode";
import type { TechStackNode as ITechStackNode } from "@/types/roadmap";

interface RoadmapCanvasProps {
  nodes: ITechStackNode[];
  selectedNodeId: string | null;
  onNodeClick: (node: ITechStackNode) => void;
}

export function RoadmapCanvas({ nodes, selectedNodeId, onNodeClick }: RoadmapCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [layout, setLayout] = useState<{ nodes: { x: number; y: number }[]; path: string } | null>(null);

  useEffect(() => {
    // Generate sinusoidal layout
    const count = nodes.length;
    if (count === 0) return;

    // Minimum width so nodes aren't too squished
    const minWidthPerNode = 200;
    const canvasWidth = Math.max(800, count * minWidthPerNode);
    const canvasHeight = 420;

    const midY = canvasHeight / 2;
    const amplitude = canvasHeight * 0.28;
    const startX = 80;
    const endX = canvasWidth - 80;
    const step = count > 1 ? (endX - startX) / (count - 1) : 0;

    const layoutNodes = Array.from({ length: count }, (_, i) => {
      const x = startX + i * step;
      const y = i % 2 === 0 ? midY + amplitude : midY - amplitude;
      return { x, y };
    });

    let path = `M ${layoutNodes[0].x} ${layoutNodes[0].y}`;
    for (let i = 0; i < layoutNodes.length - 1; i++) {
      const curr = layoutNodes[i];
      const next = layoutNodes[i + 1];
      const cpX = (curr.x + next.x) / 2;
      path += ` C ${cpX} ${curr.y}, ${cpX} ${next.y}, ${next.x} ${next.y}`;
    }

    setLayout({ nodes: layoutNodes, path });
  }, [nodes.length]);

  useEffect(() => {
    // Small delay to trigger the draw animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!layout) return null;

  const canvasWidth = Math.max(800, nodes.length * 200);

  return (
    <div
      ref={canvasRef}
      className="relative w-full overflow-x-auto overflow-y-hidden no-scrollbar"
      style={{ height: 420 }}
    >
      <div className="relative h-full" style={{ width: canvasWidth, minWidth: "100%" }}>
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ width: canvasWidth }}
        >
          {/* Base path (faint) */}
          <path
            d={layout.path}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="4"
            strokeDasharray="8 8"
          />
          {/* Animated path */}
          <path
            d={layout.path}
            fill="none"
            stroke="#2563EB"
            strokeWidth="6"
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              strokeDasharray: "2000",
              strokeDashoffset: isVisible ? "0" : "2000",
            }}
          />
        </svg>

        {nodes.map((node, i) => (
          <TechStackNode
            key={node.id}
            node={node}
            position={layout.nodes[i]}
            isSelected={selectedNodeId === node.id}
            isVisible={isVisible}
            animationDelay={i * 200}
            labelPosition={i % 2 === 0 ? "below" : "above"}
            onClick={() => onNodeClick(node)}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
