// ─── Input ──────────────────────────────────────────────────────────────────

export interface RoadmapInput {
  resumeText: string;
  userGaps: string;          // What the user says they lack
}

// ─── Assessment Reference ───────────────────────────────────────────────────

export interface AssessmentRef {
  name: string;              // Matches Assessment.name from assessments.ts
  reason: string;            // Why this assessment is needed at this phase
}

// ─── Todo Item ──────────────────────────────────────────────────────────────

export interface TodoItem {
  task: string;              // Short task title
  description: string;       // Detailed what-to-do description
  deadline: string;          // e.g. "End of Week 1"
  resourceHint: string;      // e.g. "Official docs / freeCodeCamp / YouTube"
}

// ─── Phase ──────────────────────────────────────────────────────────────────

export interface RoadmapPhase {
  phaseNumber: number;
  title: string;             // e.g. "Foundation"
  weekRange: string;         // e.g. "Week 1–2"
  objective: string;         // One-sentence goal for this phase
  todos: TodoItem[];
  assessments: AssessmentRef[];
  completionCriteria: string; // What "done" looks like for this phase
}

// ─── Tech Stack Node ────────────────────────────────────────────────────────

export interface TechStackNode {
  id: string;                // slug e.g. "react", "typescript"
  name: string;              // Display name e.g. "React"
  level: "Beginner" | "Intermediate" | "Advanced";
  isUserRequested: boolean;  // true = user mentioned it in gaps; false = from resume
  aceMessage?: string;       // Only present if isUserRequested = false
                             // e.g. "You didn't ask for this, but since React
                             //       is in your resume, here's how to ace it too."
  color: string;             // "#2563EB" for user-requested, "#F59E0B" for resume-detected
  phases: RoadmapPhase[];
  detailedPath: string[];    // Ordered list of mastery milestones
  totalDuration: string;     // e.g. "6 weeks"
}

// ─── Full Roadmap Response ──────────────────────────────────────────────────

export interface GeneratedRoadmap {
  summary: string;           // 2-3 sentence AI-generated overview
  totalDuration: string;     // e.g. "10 weeks"
  techNodes: TechStackNode[];
}
