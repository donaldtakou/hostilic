import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  typescript: {
    // Ignorer les erreurs TypeScript durant le build de production
    ignoreBuildErrors: true,
  },
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@swc/core-linux-x64-gnu',
      'node_modules/@swc/core-linux-x64-musl',
      'node_modules/@esbuild/linux-x64',
      './public/blogs/**',
      'public/blogs/**',
    ],
  },
  // Ne pas inclure le dossier blogs dans le output
  experimental: {
    outputFileTracingRoot: undefined,
  },
};

export default withNextIntl(nextConfig);
