"use client";

import React, { useState } from "react";
import SkillAssessmentMockup from "./SkillAssessmentMockup";
import { TechFloatingCards } from "../TechFloatingCards";

export default function ProvingGroundInteractiveMockup() {
  const [hoveredTech, setHoveredTech] = useState<"aws" | "azure" | "k8s" | null>(null);

  return (
    <div
      className="relative flex w-full flex-row items-start"
      style={{
        width: "100%",
        minHeight: 420,
      }}
    >
      <div
        className="relative shrink-0"
        style={{
          flex: "0 0 auto",
          width: 680,
          marginLeft: 0,
        }}
      >
        <div
          style={{
            width: 720,
            transform: "scale(0.82)",
            transformOrigin: "top left",
            marginRight: "-129.6px",
          }}
        >
          <SkillAssessmentMockup tech={hoveredTech} />
        </div>
        <TechFloatingCards 
          className="absolute right-[-65px] top-[20px]" 
          onHover={setHoveredTech}
          onLeave={() => setHoveredTech(null)}
        />
      </div>
    </div>
  );
}
