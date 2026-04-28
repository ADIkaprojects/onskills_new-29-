import { createFileRoute } from "@tanstack/react-router";
import { WalkWays } from "@/pages/WalkWays";

export const Route = createFileRoute("/walkways")({
  head: () => ({
    meta: [
      { title: "WalkWays — Your Path to Becoming a Professional Developer | OnSKILL" },
      { name: "description", content: "Structured. Guided. Proven. Follow OnSKILL WalkWays from beginner to certified professional across Frontend, Backend, DevOps, and UI/UX tracks." },
      { property: "og:title", content: "WalkWays — Structured progression to Professional | OnSKILL" },
      { property: "og:description", content: "Visual roadmaps from Base Ground to Proving Ground to Xone — earn the Professional Track Certificate." },
    ],
  }),
  component: WalkWays,
});
