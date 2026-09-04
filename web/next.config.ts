import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This app lives in web/ inside a repo that still carries a legacy root
  // lockfile; pin the tracing root so Next stops inferring the parent dir.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
