import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ images: {
    remotePatterns: [{ hostname: "enem.dev" }],
  },
};

export default nextConfig;
