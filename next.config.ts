import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  typescript: {
    // Ignorer les erreurs TypeScript durant le build de production
    ignoreBuildErrors: true,
  },
};

export default withNextIntl(nextConfig);
