import type { Metadata } from "next";
import { Auth } from "@/views/Auth";

export const metadata: Metadata = {
  title: "Sign In or Sign Up — OnSKILL",
  description:
    "Sign in or create your OnSKILL account to start certifying and proving your skills.",
  openGraph: {
    title: "Sign In or Sign Up — OnSKILL",
    description:
      "Join 10,000+ professionals building verified skill profiles on OnSKILL.",
  },
};

export default function AuthPage() {
  return <Auth />;
}
