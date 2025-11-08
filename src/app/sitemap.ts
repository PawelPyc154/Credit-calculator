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

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl()

  // Lista wszystkich stron w aplikacji
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/polityka-prywatnosci`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/regulamin`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ]

  return routes
}
