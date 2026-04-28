import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/pages/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OnSKILL — Certify, Prove, and Grow Verifiable Skills" },
      { name: "description", content: "Earn verified skill badges through structured learning and real-world challenges. WalkWays, Xone, Base Ground, and Proving Ground in one platform." },
      { property: "og:title", content: "OnSKILL — Skills that speak. Challenges that prove." },
      { property: "og:description", content: "The only platform where skills are earned through structured learning and proven through real-world challenges." },
    ],
  }),
  component: Landing,
});
