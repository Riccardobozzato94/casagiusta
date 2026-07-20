import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@casagiusta/shared", "@casagiusta/ai"],
  images: {
    domains: ["supabase.co"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
