export interface RoadmapNode {
  id: number;
  x: number;
  y: number;
  label: string;
  desc: string;
  color: string;
  position: "above" | "below";
  isPulse?: boolean;
}

export const ROADMAP_NODES: RoadmapNode[] = [
  { id: 1, x: 80, y: 240, label: "The Spark", desc: "Complete profile & choose your WalkWay track", color: "#1D6EF5", position: "below" },
  { id: 2, x: 280, y: 100, label: "Base Camp", desc: "Begin structured learning in Base Ground (Modules 1–4)", color: "#60A5FA", position: "above" },
  { id: 3, x: 480, y: 260, label: "First Proof", desc: "Attempt your first Proving Ground assessment", color: "#F59E0B", position: "below" },
  { id: 4, x: 680, y: 100, label: "Skill Certified", desc: "Earn your first verified badge (e.g. JavaScript L2)", color: "#F59E0B", position: "above" },
  { id: 5, x: 880, y: 260, label: "Xone Unlocked", desc: "Your profile goes live on Xone for hiring partners", color: "#1D6EF5", position: "below" },
  { id: 6, x: 1080, y: 100, label: "Professional", desc: "Receive your Professional Track Certificate", color: "#0A1628", position: "above", isPulse: true },
];

export const ROADMAP_PATH = "M 80 240 C 150 240, 210 100, 280 100 C 350 100, 410 260, 480 260 C 550 260, 610 100, 680 100 C 750 100, 810 260, 880 260 C 950 260, 1010 100, 1080 100";
