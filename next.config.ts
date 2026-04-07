import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90]
  },
  turbopack: {
    root: process.cwd(),
  },
  typescript: {
    // Ignorer les erreurs TypeScript durant le build de production
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: '/blogs/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@swc/core-linux-x64-gnu',
      'node_modules/@swc/core-linux-x64-musl',
      'node_modules/@esbuild/linux-x64',
      './public/blogs/**',
      'public/blogs/**',
      './public/gallery/**',
      'public/gallery/**',
    ],
  },
};

export default withNextIntl(nextConfig);
