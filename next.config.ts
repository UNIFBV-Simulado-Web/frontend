import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ images: {
    remotePatterns: [{ hostname: "enem.dev" }],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
