/**
 * Helper functions do analizy danych z Google Search Console (przez Analytics API)
 *
 * Te funkcje mogą być wywoływane przez AI (Cursor) do automatycznej analizy danych SEO.
 * Dane są pobierane przez Google Analytics Data API (po połączeniu Search Console z Analytics).
 *
 * Użycie przez AI:
 * - AI może wywołać te funkcje bezpośrednio w Cursorze
 * - Nie wymaga publicznych endpointów tRPC
 * - Dane są dostępne tylko dla AI, nie dla frontendu
 */

import { createCaller } from 'server/api/root'
import { createTRPCContext } from 'server/api/trpc'

/**
 * Tworzy caller tRPC do użycia w analizie (tylko dla AI)
 */
async function getSearchConsoleCaller() {
  const context = await createTRPCContext({ headers: new Headers() })
  return createCaller(context)
}

type OrganicTrafficData = {
  period: string
  sessions: number
  users: number
  pageViews: number
  topPages: Array<{ path: string; sessions: number; pageViews: number }>
  topQueries: Array<{ query: string; sessions: number; pageViews: number }>
  error?: string
  note?: string
}

type OrganicTrafficResult = {
  data?: OrganicTrafficData
  summary?:
    | {
        period: string
        sessions: number
        users: number
        pageViews: number
        topPagesCount: number
        topQueriesCount: number
        searchConsoleConnected: boolean
      }
    | string
  insights?: string[]
  error?: string
}

/**
 * Analizuje ruch organiczny z Google
 */
export async function analyzeOrganicTraffic(days = 30): Promise<OrganicTrafficResult> {
  const caller = await getSearchConsoleCaller()
  const data = await caller.searchConsole.getOrganicTraffic({ days })

  if (data.error) {
    return {
      error: data.error,
      summary: 'Nie można pobrać danych - sprawdź konfigurację Google Analytics API',
    }
  }

  const hasQueries = data.topQueries && data.topQueries.length > 0
  const searchConsoleConnected = hasQueries

  return {
    data,
    summary: {
      period: data.period,
      sessions: data.sessions,
      users: data.users,
      pageViews: data.pageViews,
      topPagesCount: data.topPages.length,
      topQueriesCount: data.topQueries.length,
      searchConsoleConnected,
    },
    insights: generateOrganicInsights(data),
  }
}

type TrafficSourcesData = {
  period: string
  sources: Array<{ source: string; medium: string; sessions: number; users: number }>
  error?: string
}

type TrafficSourcesResult = {
  data?: TrafficSourcesData
  summary?:
    | {
        period: string
        totalSources: number
        organicSessions: number
        organicPercentage: string
        directSessions: number
        topSource: { source: string; medium: string; sessions: number; users: number } | null
      }
    | string
  insights?: string[]
  error?: string
}

/**
 * Analizuje źródła ruchu
 */
export async function analyzeTrafficSources(days = 30): Promise<TrafficSourcesResult> {
  const caller = await getSearchConsoleCaller()
  const data = await caller.searchConsole.getTrafficSources({ days })

  if (data.error) {
    return {
      error: data.error,
      summary: 'Nie można pobrać danych źródeł ruchu',
    }
  }

  const organic = data.sources.find(
    (s: { source: string; medium: string; sessions: number }) =>
      s.source === 'google' && s.medium === 'organic',
  )
  const direct = data.sources.find(
    (s: { source: string; medium: string; sessions: number }) =>
      s.medium === '(none)' || s.medium === 'direct',
  )
  const totalSessions = data.sources.reduce(
    (sum: number, s: { sessions: number }) => sum + s.sessions,
    0,
  )
  const organicPercentage =
    totalSessions > 0 && organic
      ? ((organic.sessions / totalSessions) * 100).toFixed(1) + '%'
      : '0%'

  return {
    data,
    summary: {
      period: data.period,
      totalSources: data.sources.length,
      organicSessions: organic?.sessions || 0,
      organicPercentage,
      directSessions: direct?.sessions || 0,
      topSource: data.sources[0] || null,
    },
    insights: generateTrafficSourceInsights(data),
  }
}

/**
 * Analizuje zapytania wyszukiwania (jeśli Search Console jest połączone)
 */
export async function analyzeSearchQueries(days = 30): Promise<SearchQueriesResult> {
  const caller = await getSearchConsoleCaller()
  const data = await caller.searchConsole.getOrganicTraffic({ days })

  if (data.error) {
    return {
      error: data.error,
      summary: 'Nie można pobrać danych zapytań',
    }
  }

  if (!data.topQueries || data.topQueries.length === 0) {
    return {
      error: 'Search Console nie jest połączone z Analytics',
      summary: 'Połącz Search Console z Google Analytics aby zobaczyć zapytania',
      recommendation:
        'W Google Analytics: Administracja → Połączenia usług → Połączenia z Search Console',
    }
  }

  const totalSessions = data.topQueries.reduce((sum, q) => sum + q.sessions, 0)
  const topQuery = data.topQueries[0]
  const avgSessionsPerQuery = (totalSessions / data.topQueries.length).toFixed(1)

  return {
    data: {
      queries: data.topQueries,
      totalQueries: data.topQueries.length,
      totalSessions,
    },
    summary: {
      period: data.period,
      totalQueries: data.topQueries.length,
      totalSessions,
      topQuery: topQuery
        ? {
            query: topQuery.query,
            sessions: topQuery.sessions,
            pageViews: topQuery.pageViews,
          }
        : null,
      avgSessionsPerQuery,
    },
    insights: generateSearchQueryInsights(data.topQueries),
  }
}

/**
 * Kompleksowa analiza SEO
 */
export async function fullSEOAnalysis(days = 30) {
  const [organic, sources, queries] = await Promise.all([
    analyzeOrganicTraffic(days),
    analyzeTrafficSources(days),
    analyzeSearchQueries(days),
  ])

  return {
    organic,
    sources,
    queries,
    overallRecommendations: generateOverallSEORecommendations({
      organic,
      sources,
      queries,
    }),
  }
}

// Helper functions do generowania insights

function generateOrganicInsights(data: OrganicTrafficData) {
  const insights: string[] = []

  if (data.sessions === 0) {
    insights.push('⚠️ Brak ruchu organicznego - sprawdź SEO i indeksowanie')
  } else if (data.sessions < 10) {
    insights.push('⚠️ Bardzo niski ruch organiczny - rozważ optymalizację SEO')
  } else if (data.sessions > 100) {
    insights.push('✅ Dobry ruch organiczny - kontynuuj optymalizację')
  }

  if (data.topPages.length === 0) {
    insights.push('⚠️ Brak danych o stronach - sprawdź konfigurację')
  } else if (data.topPages.length < 5) {
    insights.push('ℹ️ Niewiele stron generuje ruch organiczny - rozważ więcej treści')
  }

  if (!data.topQueries || data.topQueries.length === 0) {
    insights.push('💡 Połącz Search Console z Analytics aby zobaczyć zapytania wyszukiwania')
  }

  return insights
}

function generateTrafficSourceInsights(data: TrafficSourcesData) {
  const insights: string[] = []

  const organic = data.sources.find(
    (s: { source: string; medium: string; sessions: number }) =>
      s.source === 'google' && s.medium === 'organic',
  )
  const totalSessions = data.sources.reduce(
    (sum: number, s: { sessions: number }) => sum + s.sessions,
    0,
  )

  if (organic && totalSessions > 0) {
    const organicPercentage = (organic.sessions / totalSessions) * 100
    if (organicPercentage < 20) {
      insights.push('⚠️ Niski udział ruchu organicznego - rozważ strategię SEO')
    } else if (organicPercentage > 50) {
      insights.push('✅ Wysoki udział ruchu organicznego - SEO działa dobrze!')
    }
  }

  const paid = data.sources.find(
    (s: { source: string; medium: string; sessions: number }) =>
      s.medium === 'cpc' || s.medium === 'paid',
  )
  if (paid && organic) {
    if (paid.sessions > organic.sessions * 2) {
      insights.push('💡 Więcej ruchu z płatnych reklam niż organicznego - rozważ optymalizację SEO')
    }
  }

  return insights
}

function generateSearchQueryInsights(
  queries: Array<{ query: string; sessions: number; pageViews: number }>,
) {
  const insights: string[] = []

  if (queries.length === 0) return insights

  const totalSessions = queries.reduce(
    (sum: number, q: { sessions: number }) => sum + q.sessions,
    0,
  )
  const topQuery = queries[0]

  if (topQuery && topQuery.sessions > totalSessions * 0.3) {
    insights.push(
      `💡 "${topQuery.query}" generuje ${((topQuery.sessions / totalSessions) * 100).toFixed(0)}% ruchu - rozważ optymalizację pod tę frazę`,
    )
  }

  if (queries.length < 10) {
    insights.push('ℹ️ Niewiele unikalnych zapytań - rozważ więcej treści i optymalizację SEO')
  }

  const longTailQueries = queries.filter((q) => q.query.split(' ').length > 3)
  if (longTailQueries.length > queries.length * 0.5) {
    insights.push('✅ Wiele zapytań long-tail - dobra strategia SEO')
  }

  return insights
}

type SearchQueriesResult = {
  data?: {
    queries: Array<{ query: string; sessions: number; pageViews: number }>
    totalQueries: number
    totalSessions: number
  }
  summary?:
    | {
        period: string
        totalQueries: number
        totalSessions: number
        topQuery: { query: string; sessions: number; pageViews: number } | null
        avgSessionsPerQuery: string
      }
    | string
  insights?: string[]
  error?: string
  recommendation?: string
}

function generateOverallSEORecommendations(analysis: {
  organic: OrganicTrafficResult
  sources: TrafficSourcesResult
  queries: SearchQueriesResult
}) {
  const recommendations: string[] = []

  // Priorytetowe rekomendacje
  if (
    analysis.organic.summary &&
    typeof analysis.organic.summary === 'object' &&
    'sessions' in analysis.organic.summary &&
    !analysis.organic.error
  ) {
    if (analysis.organic.summary.sessions < 10) {
      recommendations.push('🔴 PRIORYTET: Niski ruch organiczny - optymalizuj SEO i treść')
    }
  }

  if (analysis.queries.error?.includes('nie jest połączone')) {
    recommendations.push('🟡 PRIORYTET: Połącz Search Console z Analytics aby zobaczyć zapytania')
  }

  if (
    analysis.sources.summary &&
    typeof analysis.sources.summary === 'object' &&
    'organicPercentage' in analysis.sources.summary &&
    !analysis.sources.error
  ) {
    const organicPct = parseFloat(analysis.sources.summary.organicPercentage)
    if (organicPct < 20) {
      recommendations.push('🟡 PRIORYTET: Niski udział ruchu organicznego - rozważ strategię SEO')
    }
  }

  if (
    analysis.queries.summary &&
    typeof analysis.queries.summary === 'object' &&
    'topQuery' in analysis.queries.summary &&
    !analysis.queries.error
  ) {
    if (analysis.queries.summary.topQuery) {
      recommendations.push(
        `💡 Oportunność: "${analysis.queries.summary.topQuery.query}" to top zapytanie - optymalizuj pod tę frazę`,
      )
    }
  }

  return recommendations
}
