import type { Metadata } from "next";
import { WalkWays } from "@/views/WalkWays";

export const metadata: Metadata = {
  title: "WalkWays — Your Path to Becoming a Professional Developer | OnSKILL",
  description:
    "Structured. Guided. Proven. Follow OnSKILL WalkWays from beginner to certified professional across Frontend, Backend, DevOps, and UI/UX tracks.",
  openGraph: {
    title: "WalkWays — Structured progression to Professional | OnSKILL",
    description:
      "Visual roadmaps from Base Ground to Proving Ground to Xone — earn the Professional Track Certificate.",
  },
};

export default function WalkWaysPage() {
  return <WalkWays />;
}
