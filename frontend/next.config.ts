import type { NextConfig } from "next";

const BODY_LIMIT_MD = 6

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: `${BODY_LIMIT_MD}mb`,
    },
  },
};

export default nextConfig;
