import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["remotion", "@remotion/player"],
  experimental: {
    cssChunking: "strict",
  },
};

export default nextConfig;
