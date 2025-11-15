import type { MetadataRoute } from 'next'
import { blogPostDates, isPostPublished } from 'utils/blog-posts'

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

  // Lista wszystkich artykułów blogowych (tylko opublikowane)
  const blogSlugs = Object.keys(blogPostDates).filter((slug) => isPostPublished(slug))
  const blogRoutes = blogSlugs
    .map((slug) => {
      const publishDate = blogPostDates[slug]
      if (!publishDate) return null
      return {
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(publishDate),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }
    })
    .filter((route): route is NonNullable<typeof route> => route !== null)

  // Lista wszystkich stron w aplikacji
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/kalkulator/kredyt-hipoteczny`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
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
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    // Dodaj wszystkie opublikowane artykuły blogowe
    ...blogRoutes,
    // Stary artykuł (bez daty publikacji) - zostawiamy dla kompatybilności
    {
      url: `${baseUrl}/blog/zagrozenia-kredytowe`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  return routes
}
