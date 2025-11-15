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
  
  // Optymalizacja kompilacji JavaScript - nie dodawaj polyfilli dla nowoczesnych funkcji
  compiler: {
    // SWC nie będzie transpilował nowoczesnych funkcji JavaScript dla nowoczesnych przeglądarek
    // To zmniejszy rozmiar bundle'a o ~14 KiB (polyfille nie będą potrzebne)
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'], // Zachowaj console.error i console.warn
    } : false,
  },
  
  // Optymalizacja eksperymentalna - modern JavaScript bez transpilacji dla nowoczesnych przeglądarek
  experimental: {
    // Użyj nowoczesnych funkcji JavaScript bez transpilacji
    // To zmniejszy rozmiar bundle'a o ~14 KiB (polyfille nie będą potrzebne)
    optimizePackageImports: ['react-icons', '@tanstack/react-query', 'framer-motion'],
  },
  
  // Optymalizacja obrazów
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Kompresja
  compress: true,
  
  // Optymalizacja produkcji
  swcMinify: true,
  
  // Headers dla cache i security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
