import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Ignorer les erreurs TypeScript durant le build de production
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
