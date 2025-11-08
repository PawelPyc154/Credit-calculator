/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/utils/env'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  // Transpile zod dla lepszej kompatybilności
  transpilePackages: ['zod'],
}

export default nextConfig
