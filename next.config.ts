import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ignorer les erreurs ESLint durant le build de production
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignorer les erreurs TypeScript durant le build de production
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
