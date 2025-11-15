/**
 * Utility functions for blog posts
 */

// Mapowanie slug -> data publikacji (z structured data w każdym artykule)
export const blogPostDates: Record<string, string> = {
  'jak-obliczyc-zdolnosc-kredytowa': '2025-11-05',
  'wklad-wlasny-kredyt-hipoteczny': '2025-11-12',
  'ranking-bankow-kredytow-hipotecznych-2025': '2025-11-19',
  'rrso-kredyt-hipoteczny': '2025-11-26',
  'oprocentowanie-kredytu-hipotecznego-stale-czy-zmienne': '2025-12-03',
  'kredyt-hipoteczny-bez-wkladu-wlasnego': '2025-12-10',
  'ukryte-koszty-kredytu-hipotecznego': '2025-12-17',
  'kredyt-hipoteczny-dla-mlodych-programy-wsparcia': '2026-01-07',
  'ubezpieczenie-kredytu-hipotecznego': '2026-01-14',
  'jak-zlozyc-wniosek-o-kredyt-hipoteczny': '2026-01-21',
  'prowizja-kredyt-hipoteczny': '2026-01-28',
  'dokumenty-do-kredytu-hipotecznego': '2026-02-04',
  'jak-dlugo-trwa-proces-kredytowy': '2026-02-11',
  'refinansowanie-kredytu-hipotecznego': '2026-02-18',
  'wczesniejsza-splata-kredytu-hipotecznego': '2026-02-25',
  'jak-wybrac-najlepszy-kredyt-hipoteczny': '2026-03-03',
  'jak-negocjowac-warunki-kredytu-hipotecznego': '2026-03-10',
  'kredyt-hipoteczny-dla-singla': '2026-03-17',
  'kredyt-hipoteczny-dla-przedsiebiorcy': '2026-03-24',
  'jak-korzystac-z-kalkulatora-kredytu-hipotecznego': '2026-03-31',
  'stopy-procentowe-kredyt-hipoteczny-2025': '2026-04-07',
  'pulapki-kredytu-hipotecznego': '2026-04-14',
  'co-zrobic-gdy-nie-mozesz-splacac-kredytu': '2026-04-21',
  'kredyt-hipoteczny-na-budowe-domu': '2026-04-28',
  'kredyt-hipoteczny-a-rozwod': '2026-05-05',
  'kredyt-hipoteczny-a-smierc-kredytobiorcy': '2026-05-12',
  'kredyt-hipoteczny-2025-zmiany-przepisy': '2026-05-19',
}

/**
 * Sprawdza, czy artykuł powinien być opublikowany (data publikacji <= dzisiaj)
 */
export function isPostPublished(slug: string): boolean {
  const publishDate = blogPostDates[slug]
  if (!publishDate) {
    // Jeśli nie ma daty, domyślnie publikuj (dla kompatybilności wstecznej)
    return true
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0) // Resetuj czas do północy

  const publish = new Date(publishDate)
  publish.setHours(0, 0, 0, 0)

  return publish <= today
}

/**
 * Filtruje listę artykułów, zwracając tylko opublikowane
 */
export function filterPublishedPosts<T extends { slug: string }>(posts: T[]): T[] {
  return posts.filter((post) => isPostPublished(post.slug))
}

/**
 * Sortuje artykuły według daty publikacji (najnowsze pierwsze)
 */
export function sortPostsByDate<T extends { slug: string }>(posts: T[]): T[] {
  return [...posts].sort((a, b) => {
    const dateA = blogPostDates[a.slug] || '9999-12-31'
    const dateB = blogPostDates[b.slug] || '9999-12-31'
    return dateB.localeCompare(dateA) // Od najnowszych do najstarszych
  })
}

/**
 * Zwraca metadata robots dla artykułu - blokuje indeksację jeśli nie jest jeszcze opublikowany
 * Format zgodny z Next.js Metadata robots
 */
export function getPostRobotsMetadata(slug: string): { index: boolean; follow: boolean } | string {
  const isPublished = isPostPublished(slug)
  if (!isPublished) {
    // Jeśli nie opublikowany, zwróć string 'noindex, nofollow'
    return 'noindex, nofollow'
  }
  // Jeśli opublikowany, zwróć obiekt z index i follow
  return {
    index: true,
    follow: true,
  }
}
