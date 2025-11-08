import { BetaAnalyticsDataClient } from '@google-analytics/data'
import { createTRPCRouter, publicProcedure } from 'server/api/trpc'
import { env } from 'utils/env'
import { z } from 'zod'

/**
 * Router do pobierania danych SEO z Google Analytics
 *
 * UWAGA: Te endpointy są dostępne tylko wewnętrznie (dla AI/Cursor).
 * Nie są eksponowane publicznie - używaj helper functions z search-console-analyzer.ts
 *
 * WYMAGANIE: Musisz najpierw połączyć Google Search Console z Google Analytics 4!
 *
 * Jak połączyć:
 * 1. W Google Analytics 4: Administracja → Połączenia usług → Połączenia z Search Console
 * 2. Wybierz właściwość Search Console i strumień danych GA4
 * 3. Po połączeniu dane Search Console będą dostępne przez Analytics Data API
 *
 * Dostępne dane po połączeniu:
 * - Zapytania wyszukiwania (searchQuery dimension)
 * - Strony docelowe z wyników wyszukiwania
 * - CTR, pozycje (jeśli dostępne jako dimensions)
 */

// Helper do tworzenia klienta Google Analytics (używamy tego samego co dla analytics)
function getAnalyticsClient() {
  if (!env.GA4_PROPERTY_ID || !env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
    return null
  }

  try {
    const credentials = JSON.parse(env.GOOGLE_APPLICATION_CREDENTIALS_JSON)
    return new BetaAnalyticsDataClient({
      credentials,
    })
  } catch (error) {
    console.error('Błąd podczas parsowania credentials Google Analytics:', error)
    return null
  }
}

function isConfigured() {
  return !!env.GA4_PROPERTY_ID && !!env.GOOGLE_APPLICATION_CREDENTIALS_JSON
}

export const searchConsoleRouter = createTRPCRouter({
  /**
   * Pobiera dane organiczne z Google (source = google/organic)
   * To są dane z wyszukiwarki Google dostępne przez Analytics API
   */
  getOrganicTraffic: publicProcedure
    .input(
      z
        .object({
          days: z.number().min(1).max(365).default(30),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const days = input?.days ?? 30

      if (!isConfigured()) {
        return {
          period: `${days} dni`,
          sessions: 0,
          users: 0,
          pageViews: 0,
          topPages: [],
          topQueries: [],
          error: 'Google Analytics nie jest skonfigurowane',
          note: 'Skonfiguruj Google Analytics API aby zobaczyć dane SEO',
        }
      }

      const client = getAnalyticsClient()
      if (!client) {
        return {
          period: `${days} dni`,
          sessions: 0,
          users: 0,
          pageViews: 0,
          topPages: [],
          topQueries: [],
          error: 'Błąd podczas inicjalizacji klienta',
          note: 'Sprawdź konfigurację credentials',
        }
      }

      try {
        const propertyId = env.GA4_PROPERTY_ID!
        const property = `properties/${propertyId}`

        // Pobierz dane organiczne z Google
        const [organicResponse] = await client.runReport({
          property,
          dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
          dimensions: [{ name: 'sessionSource' }, { name: 'sessionMedium' }],
          metrics: [{ name: 'sessions' }, { name: 'activeUsers' }, { name: 'screenPageViews' }],
          dimensionFilter: {
            andGroup: {
              expressions: [
                {
                  filter: {
                    fieldName: 'sessionSource',
                    stringFilter: { matchType: 'EXACT', value: 'google' },
                  },
                },
                {
                  filter: {
                    fieldName: 'sessionMedium',
                    stringFilter: { matchType: 'EXACT', value: 'organic' },
                  },
                },
              ],
            },
          },
        })

        // Pobierz top strony z organicznego ruchu
        const [pagesResponse] = await client.runReport({
          property,
          dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
          dimensions: [{ name: 'pagePath' }, { name: 'sessionSource' }, { name: 'sessionMedium' }],
          metrics: [{ name: 'sessions' }, { name: 'screenPageViews' }],
          dimensionFilter: {
            andGroup: {
              expressions: [
                {
                  filter: {
                    fieldName: 'sessionSource',
                    stringFilter: { matchType: 'EXACT', value: 'google' },
                  },
                },
                {
                  filter: {
                    fieldName: 'sessionMedium',
                    stringFilter: { matchType: 'EXACT', value: 'organic' },
                  },
                },
              ],
            },
          },
          orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
          limit: 20,
        })

        // Parsuj dane
        let totalSessions = 0
        let totalUsers = 0
        let totalPageViews = 0

        organicResponse.rows?.forEach((row) => {
          totalSessions += parseInt(row.metricValues?.[0]?.value || '0', 10)
          totalUsers += parseInt(row.metricValues?.[1]?.value || '0', 10)
          totalPageViews += parseInt(row.metricValues?.[2]?.value || '0', 10)
        })

        const topPages =
          pagesResponse.rows?.map((row) => ({
            path: row.dimensionValues?.[0]?.value || '',
            sessions: parseInt(row.metricValues?.[0]?.value || '0', 10),
            pageViews: parseInt(row.metricValues?.[1]?.value || '0', 10),
          })) || []

        // Próbuj pobrać zapytania wyszukiwania (jeśli Search Console jest połączone)
        let topQueries: Array<{ query: string; sessions: number; pageViews: number }> = []
        try {
          const [queriesResponse] = await client.runReport({
            property,
            dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
            dimensions: [
              { name: 'searchQuery' }, // Dimension dostępny po połączeniu GSC z GA4
              { name: 'sessionSource' },
            ],
            metrics: [{ name: 'sessions' }, { name: 'screenPageViews' }],
            dimensionFilter: {
              filter: {
                fieldName: 'sessionSource',
                stringFilter: { matchType: 'EXACT', value: 'google' },
              },
            },
            orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
            limit: 20,
          })

          topQueries =
            queriesResponse.rows?.map((row) => ({
              query: row.dimensionValues?.[0]?.value || '',
              sessions: parseInt(row.metricValues?.[0]?.value || '0', 10),
              pageViews: parseInt(row.metricValues?.[1]?.value || '0', 10),
            })) || []
        } catch (error) {
          // Dimension searchQuery może nie być dostępny jeśli GSC nie jest połączone
          console.log(
            'Uwaga: searchQuery dimension nie jest dostępny. Połącz Search Console z Analytics.',
          )
        }

        return {
          period: `${days} dni`,
          sessions: totalSessions,
          users: totalUsers,
          pageViews: totalPageViews,
          topPages,
          topQueries,
          note:
            topQueries.length > 0
              ? 'Dane z Google Search Console (połączone z Analytics)'
              : 'Dane organiczne z Google Analytics. Aby zobaczyć zapytania, połącz Search Console z Analytics.',
        }
      } catch (error) {
        console.error('Błąd podczas pobierania danych organicznych:', error)
        return {
          period: `${days} dni`,
          sessions: 0,
          users: 0,
          pageViews: 0,
          topPages: [],
          topQueries: [],
          error: error instanceof Error ? error.message : 'Nieznany błąd',
          note: 'Sprawdź czy Search Console jest połączone z Analytics',
        }
      }
    }),

  /**
   * Pobiera dane o źródłach ruchu (wszystkie źródła)
   */
  getTrafficSources: publicProcedure
    .input(
      z
        .object({
          days: z.number().min(1).max(365).default(30),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const days = input?.days ?? 30

      if (!isConfigured()) {
        return {
          period: `${days} dni`,
          sources: [],
          error: 'Google Analytics nie jest skonfigurowane',
        }
      }

      const client = getAnalyticsClient()
      if (!client) {
        return {
          period: `${days} dni`,
          sources: [],
          error: 'Błąd podczas inicjalizacji klienta',
        }
      }

      try {
        const propertyId = env.GA4_PROPERTY_ID!
        const property = `properties/${propertyId}`

        const [response] = await client.runReport({
          property,
          dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
          dimensions: [{ name: 'sessionSource' }, { name: 'sessionMedium' }],
          metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
          orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
          limit: 20,
        })

        const sources =
          response.rows?.map((row) => ({
            source: row.dimensionValues?.[0]?.value || '',
            medium: row.dimensionValues?.[1]?.value || '',
            sessions: parseInt(row.metricValues?.[0]?.value || '0', 10),
            users: parseInt(row.metricValues?.[1]?.value || '0', 10),
          })) || []

        return {
          period: `${days} dni`,
          sources,
        }
      } catch (error) {
        console.error('Błąd podczas pobierania źródeł ruchu:', error)
        return {
          period: `${days} dni`,
          sources: [],
          error: error instanceof Error ? error.message : 'Nieznany błąd',
        }
      }
    }),
})
