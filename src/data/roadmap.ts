export interface RoadmapNode {
  id: number;
  x: number;
  y: number;
  label: string;
  color: string;
  position: "above" | "below";
  isPulse?: boolean;
}

export const ROADMAP_NODES: RoadmapNode[] = [
  { id: 1, x: 80, y: 300, label: "AI Fundamentals", color: "#1D6EF5", position: "below" },
  { id: 2, x: 280, y: 160, label: "Machine Learning Core", color: "#60A5FA", position: "above" },
  { id: 3, x: 480, y: 320, label: "Deep Learning Base", color: "#F59E0B", position: "below" },
  { id: 4, x: 680, y: 160, label: "Advanced LLMs & RAG", color: "#F59E0B", position: "above" },
  { id: 5, x: 880, y: 320, label: "AI Production", color: "#1D6EF5", position: "below" },
  { id: 6, x: 1080, y: 160, label: "Professional", color: "#0A1628", position: "above" },
];

export const ROADMAP_PATH = "M 80 300 C 150 300, 210 160, 280 160 C 350 160, 410 320, 480 320 C 550 320, 610 160, 680 160 C 750 160, 810 320, 880 320 C 950 320, 1010 160, 1080 160";
