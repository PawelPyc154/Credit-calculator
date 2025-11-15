import type { MetadataRoute } from 'next'

function getBaseUrl() {
  // W przeglądarce użyj aktualnego origin
  if (typeof window !== 'undefined') return window.location.origin

  // Na Vercel użyj VERCEL_URL (automatycznie dostarczane przez Vercel)
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`

  // Dla produkcji z własną domeną (opcjonalnie)
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL

  // Fallback dla developmentu
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/trpc/'],
      },
      // Optymalizacja dla AI crawlers - pozwól im indeksować całą stronę
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/trpc/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/api/', '/_next/', '/trpc/'],
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/trpc/'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: ['/api/', '/_next/', '/trpc/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: ['/api/', '/_next/', '/trpc/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/api/', '/_next/', '/trpc/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/trpc/'],
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: ['/api/', '/_next/', '/trpc/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
