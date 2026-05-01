"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ResumeUploadForm } from "@/components/walkways/ResumeUploadForm";
import { RoadmapWorkspace } from "@/components/walkways/RoadmapWorkspace";
import type { GeneratedRoadmap } from "@/types/roadmap";

export function WalkWays() {
  const [roadmap, setRoadmap] = useState<GeneratedRoadmap | null>(null);

  return (
    <>
      <Navbar />
      {roadmap === null ? (
        <ResumeUploadForm onRoadmapGenerated={setRoadmap} />
      ) : (
        <RoadmapWorkspace roadmap={roadmap} onReset={() => setRoadmap(null)} />
      )}
    </>
  );
}

export default WalkWays;
