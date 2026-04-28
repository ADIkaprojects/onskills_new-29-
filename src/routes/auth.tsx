import { createFileRoute } from "@tanstack/react-router";
import { Auth } from "@/pages/Auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign In or Sign Up — OnSKILL" },
      { name: "description", content: "Sign in or create your OnSKILL account to start certifying and proving your skills." },
      { property: "og:title", content: "Sign In or Sign Up — OnSKILL" },
      { property: "og:description", content: "Join 10,000+ professionals building verified skill profiles on OnSKILL." },
    ],
  }),
  component: Auth,
});
