import type { Metadata } from "next";
import { Landing } from "@/views/Landing";

export const metadata: Metadata = {
  title: "OnSKILL — Certify, Prove, and Grow Verifiable Skills",
  description:
    "Earn verified skill badges through structured learning and real-world challenges. WalkWays, Xone, Base Ground, and Proving Ground in one platform.",
  openGraph: {
    title: "OnSKILL — Skills that speak. Challenges that prove.",
    description:
      "The only platform where skills are earned through structured learning and proven through real-world challenges.",
  },
};

export default function HomePage() {
  return <Landing />;
}
