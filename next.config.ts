/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/utils/env'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  // Konfiguracja dla Turbopack - wyklucz problematyczne moduły z parsowania
  experimental: {
    turbo: {
      resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
    },
  },
  // Transpile zod dla lepszej kompatybilności
  transpilePackages: ['zod'],
}

export default nextConfig
