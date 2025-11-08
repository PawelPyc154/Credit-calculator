import { BetaAnalyticsDataClient } from '@google-analytics/data'
import { createTRPCRouter, publicProcedure } from 'server/api/trpc'
import { z } from 'zod'
import { env } from 'utils/env'

/**
 * Router do pobierania danych z Google Analytics
 * 
 * Wymaga konfiguracji:
 * 1. Service Account w Google Cloud Console
 * 2. GA4 Property ID
 * 3. Credentials JSON w zmiennych środowiskowych
 */

// Helper do tworzenia klienta Google Analytics
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

// Helper do sprawdzania czy API jest skonfigurowane
function isAnalyticsConfigured() {
  return !!env.GA4_PROPERTY_ID && !!env.GOOGLE_APPLICATION_CREDENTIALS_JSON
}

export const analyticsRouter = createTRPCRouter({
  /**
   * Pobiera podstawowe metryki z ostatnich N dni
   */
  getOverview: publicProcedure
    .input(
      z.object({
        days: z.number().min(1).max(365).default(30),
      }).optional(),
    )
    .query(async ({ input }) => {
      const days = input?.days ?? 30

      if (!isAnalyticsConfigured()) {
        return {
          period: `${days} dni`,
          users: { total: 0, new: 0, returning: 0 },
          sessions: 0,
          pageViews: 0,
          events: { calculate_loan: 0, affiliate_click: 0, view_bank_details: 0 },
          conversions: { total: 0, rate: 0 },
          topBanks: [],
          topPages: [],
          error: 'Google Analytics nie jest skonfigurowane',
        }
      }

      const client = getAnalyticsClient()
      if (!client) {
        return {
          period: `${days} dni`,
          users: { total: 0, new: 0, returning: 0 },
          sessions: 0,
          pageViews: 0,
          events: { calculate_loan: 0, affiliate_click: 0, view_bank_details: 0 },
          conversions: { total: 0, rate: 0 },
          topBanks: [],
          topPages: [],
          error: 'Błąd podczas inicjalizacji klienta Google Analytics',
        }
      }

      try {
        const propertyId = env.GA4_PROPERTY_ID!
        const property = `properties/${propertyId}`

        // Pobierz podstawowe metryki
        const [overviewResponse] = await client.runReport({
          property,
          dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
          metrics: [
            { name: 'activeUsers' },
            { name: 'newUsers' },
            { name: 'sessions' },
            { name: 'screenPageViews' },
          ],
        })

        // Pobierz eventy
        const [eventsResponse] = await client.runReport({
          property,
          dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
          dimensions: [{ name: 'eventName' }],
          metrics: [{ name: 'eventCount' }],
          dimensionFilter: {
            filter: {
              fieldName: 'eventName',
              inListFilter: {
                values: ['calculate_loan', 'affiliate_click', 'view_bank_details'],
              },
            },
          },
        })

        // Pobierz top strony
        const [pagesResponse] = await client.runReport({
          property,
          dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
          dimensions: [{ name: 'pagePath' }],
          metrics: [{ name: 'screenPageViews' }],
          orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
          limit: 10,
        })

        // Pobierz konwersje (affiliate clicks)
        const [conversionsResponse] = await client.runReport({
          property,
          dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
          dimensions: [{ name: 'eventName' }],
          metrics: [{ name: 'eventCount' }],
          dimensionFilter: {
            filter: {
              fieldName: 'eventName',
              stringFilter: { matchType: 'EXACT', value: 'affiliate_click' },
            },
          },
        })

        // Parsuj dane
        const overviewRow = overviewResponse.rows?.[0]
        const totalUsers = parseInt(overviewRow?.metricValues?.[0]?.value || '0', 10)
        const newUsers = parseInt(overviewRow?.metricValues?.[1]?.value || '0', 10)
        const sessions = parseInt(overviewRow?.metricValues?.[2]?.value || '0', 10)
        const pageViews = parseInt(overviewRow?.metricValues?.[3]?.value || '0', 10)

        const events: Record<string, number> = {
          calculate_loan: 0,
          affiliate_click: 0,
          view_bank_details: 0,
        }

        eventsResponse.rows?.forEach((row) => {
          const eventName = row.dimensionValues?.[0]?.value || ''
          const count = parseInt(row.metricValues?.[0]?.value || '0', 10)
          if (eventName in events) {
            events[eventName] = count
          }
        })

        const conversions = parseInt(
          conversionsResponse.rows?.[0]?.metricValues?.[0]?.value || '0',
          10,
        )

        const topPages =
          pagesResponse.rows?.map((row) => ({
            path: row.dimensionValues?.[0]?.value || '',
            views: parseInt(row.metricValues?.[0]?.value || '0', 10),
          })) || []

        return {
          period: `${days} dni`,
          users: {
            total: totalUsers,
            new: newUsers,
            returning: totalUsers - newUsers,
          },
          sessions,
          pageViews,
          events,
          conversions: {
            total: conversions,
            rate: sessions > 0 ? (conversions / sessions) * 100 : 0,
          },
          topBanks: [], // Będzie w osobnej funkcji
          topPages,
        }
      } catch (error) {
        console.error('Błąd podczas pobierania danych z Google Analytics:', error)
        return {
          period: `${days} dni`,
          users: { total: 0, new: 0, returning: 0 },
          sessions: 0,
          pageViews: 0,
          events: { calculate_loan: 0, affiliate_click: 0, view_bank_details: 0 },
          conversions: { total: 0, rate: 0 },
          topBanks: [],
          topPages: [],
          error: error instanceof Error ? error.message : 'Nieznany błąd',
        }
      }
    }),

  /**
   * Pobiera statystyki eventów z kalkulatora
   */
  getCalculatorEvents: publicProcedure
    .input(
      z.object({
        days: z.number().min(1).max(365).default(30),
      }).optional(),
    )
    .query(async ({ input }) => {
      const days = input?.days ?? 30

      if (!isAnalyticsConfigured()) {
        return {
          period: `${days} dni`,
          calculations: 0,
          parameterChanges: 0,
          affiliateClicks: 0,
          bankDetailsViews: 0,
          averageLoanAmount: 0,
          averageLoanPeriod: 0,
          mostCommonPurpose: '',
          mostCommonInterestType: '',
          error: 'Google Analytics nie jest skonfigurowane',
        }
      }

      const client = getAnalyticsClient()
      if (!client) {
        return {
          period: `${days} dni`,
          calculations: 0,
          parameterChanges: 0,
          affiliateClicks: 0,
          bankDetailsViews: 0,
          averageLoanAmount: 0,
          averageLoanPeriod: 0,
          mostCommonPurpose: '',
          mostCommonInterestType: '',
          error: 'Błąd podczas inicjalizacji klienta',
        }
      }

      try {
        const propertyId = env.GA4_PROPERTY_ID!
        const property = `properties/${propertyId}`

        // Pobierz eventy kalkulatora
        const [eventsResponse] = await client.runReport({
          property,
          dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
          dimensions: [{ name: 'eventName' }],
          metrics: [{ name: 'eventCount' }],
          dimensionFilter: {
            filter: {
              fieldName: 'eventName',
              inListFilter: {
                values: [
                  'calculate_loan',
                  'parameter_change',
                  'affiliate_click',
                  'view_bank_details',
                ],
              },
            },
          },
        })

        // Pobierz parametry z eventów (jeśli są dostępne jako custom dimensions)
        const [purposeResponse] = await client.runReport({
          property,
          dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
          dimensions: [{ name: 'customEvent:purpose' }],
          metrics: [{ name: 'eventCount' }],
          dimensionFilter: {
            filter: {
              fieldName: 'eventName',
              stringFilter: { matchType: 'EXACT', value: 'calculate_loan' },
            },
          },
          orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
          limit: 1,
        })

        const [interestTypeResponse] = await client.runReport({
          property,
          dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
          dimensions: [{ name: 'customEvent:interest_rate_type' }],
          metrics: [{ name: 'eventCount' }],
          dimensionFilter: {
            filter: {
              fieldName: 'eventName',
              stringFilter: { matchType: 'EXACT', value: 'calculate_loan' },
            },
          },
          orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
          limit: 1,
        })

        // Parsuj eventy
        let calculations = 0
        let parameterChanges = 0
        let affiliateClicks = 0
        let bankDetailsViews = 0

        eventsResponse.rows?.forEach((row) => {
          const eventName = row.dimensionValues?.[0]?.value || ''
          const count = parseInt(row.metricValues?.[0]?.value || '0', 10)

          switch (eventName) {
            case 'calculate_loan':
              calculations = count
              break
            case 'parameter_change':
              parameterChanges = count
              break
            case 'affiliate_click':
              affiliateClicks = count
              break
            case 'view_bank_details':
              bankDetailsViews = count
              break
          }
        })

        const mostCommonPurpose =
          purposeResponse.rows?.[0]?.dimensionValues?.[0]?.value || ''
        const mostCommonInterestType =
          interestTypeResponse.rows?.[0]?.dimensionValues?.[0]?.value || ''

        return {
          period: `${days} dni`,
          calculations,
          parameterChanges,
          affiliateClicks,
          bankDetailsViews,
          averageLoanAmount: 0, // Wymaga custom dimension
          averageLoanPeriod: 0, // Wymaga custom dimension
          mostCommonPurpose,
          mostCommonInterestType,
        }
      } catch (error) {
        console.error('Błąd podczas pobierania eventów kalkulatora:', error)
        return {
          period: `${days} dni`,
          calculations: 0,
          parameterChanges: 0,
          affiliateClicks: 0,
          bankDetailsViews: 0,
          averageLoanAmount: 0,
          averageLoanPeriod: 0,
          mostCommonPurpose: '',
          mostCommonInterestType: '',
          error: error instanceof Error ? error.message : 'Nieznany błąd',
        }
      }
    }),

  /**
   * Pobiera statystyki konwersji (kliknięcia w linki partnerskie)
   */
  getConversions: publicProcedure
    .input(
      z.object({
        days: z.number().min(1).max(365).default(30),
      }).optional(),
    )
    .query(async ({ input }) => {
      const days = input?.days ?? 30

      if (!isAnalyticsConfigured()) {
        return {
          period: `${days} dni`,
          total: 0,
          byBank: [],
          byPosition: { first: 0, second: 0, third: 0, other: 0 },
          error: 'Google Analytics nie jest skonfigurowane',
        }
      }

      const client = getAnalyticsClient()
      if (!client) {
        return {
          period: `${days} dni`,
          total: 0,
          byBank: [],
          byPosition: { first: 0, second: 0, third: 0, other: 0 },
          error: 'Błąd podczas inicjalizacji klienta',
        }
      }

      try {
        const propertyId = env.GA4_PROPERTY_ID!
        const property = `properties/${propertyId}`

        // Pobierz affiliate clicks z parametrami banku
        const [conversionsResponse] = await client.runReport({
          property,
          dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
          dimensions: [
            { name: 'customEvent:bank_name' },
            { name: 'customEvent:position' },
          ],
          metrics: [{ name: 'eventCount' }, { name: 'eventValue' }],
          dimensionFilter: {
            filter: {
              fieldName: 'eventName',
              stringFilter: { matchType: 'EXACT', value: 'affiliate_click' },
            },
          },
        })

        // Pobierz total conversions
        const [totalResponse] = await client.runReport({
          property,
          dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
          metrics: [{ name: 'eventCount' }],
          dimensionFilter: {
            filter: {
              fieldName: 'eventName',
              stringFilter: { matchType: 'EXACT', value: 'affiliate_click' },
            },
          },
        })

        const total = parseInt(
          totalResponse.rows?.[0]?.metricValues?.[0]?.value || '0',
          10,
        )

        // Grupuj po bankach
        const bankMap = new Map<
          string,
          { clicks: number; position: number; conversionValue: number }
        >()

        const byPosition = { first: 0, second: 0, third: 0, other: 0 }

        conversionsResponse.rows?.forEach((row) => {
          const bankName = row.dimensionValues?.[0]?.value || 'Unknown'
          const position = parseInt(row.dimensionValues?.[1]?.value || '0', 10)
          const clicks = parseInt(row.metricValues?.[0]?.value || '0', 10)
          const value = parseFloat(row.metricValues?.[1]?.value || '0')

          if (!bankMap.has(bankName)) {
            bankMap.set(bankName, { clicks: 0, position, conversionValue: 0 })
          }

          const bank = bankMap.get(bankName)!
          bank.clicks += clicks
          bank.conversionValue += value

          // Zlicz po pozycji
          if (position === 1) byPosition.first += clicks
          else if (position === 2) byPosition.second += clicks
          else if (position === 3) byPosition.third += clicks
          else byPosition.other += clicks
        })

        const byBank = Array.from(bankMap.entries())
          .map(([bankName, data]) => ({
            bankName,
            ...data,
          }))
          .sort((a, b) => b.clicks - a.clicks)

        return {
          period: `${days} dni`,
          total,
          byBank,
          byPosition,
        }
      } catch (error) {
        console.error('Błąd podczas pobierania konwersji:', error)
        return {
          period: `${days} dni`,
          total: 0,
          byBank: [],
          byPosition: { first: 0, second: 0, third: 0, other: 0 },
          error: error instanceof Error ? error.message : 'Nieznany błąd',
        }
      }
    }),

  /**
   * Pobiera dane o czasie spędzonym na stronie i engagement
   */
  getEngagement: publicProcedure
    .input(
      z.object({
        days: z.number().min(1).max(365).default(30),
      }).optional(),
    )
    .query(async ({ input }) => {
      const days = input?.days ?? 30

      if (!isAnalyticsConfigured()) {
        return {
          period: `${days} dni`,
          averageTimeOnPage: 0,
          averageSessionDuration: 0,
          bounceRate: 0,
          pagesPerSession: 0,
          error: 'Google Analytics nie jest skonfigurowane',
        }
      }

      const client = getAnalyticsClient()
      if (!client) {
        return {
          period: `${days} dni`,
          averageTimeOnPage: 0,
          averageSessionDuration: 0,
          bounceRate: 0,
          pagesPerSession: 0,
          error: 'Błąd podczas inicjalizacji klienta',
        }
      }

      try {
        const propertyId = env.GA4_PROPERTY_ID!
        const property = `properties/${propertyId}`

        // Pobierz metryki engagement
        const [engagementResponse] = await client.runReport({
          property,
          dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
          metrics: [
            { name: 'averageSessionDuration' },
            { name: 'bounceRate' },
            { name: 'screenPageViewsPerSession' },
            { name: 'sessions' },
          ],
        })

        const row = engagementResponse.rows?.[0]
        const averageSessionDuration = parseFloat(
          row?.metricValues?.[0]?.value || '0',
        )
        const bounceRate = parseFloat(row?.metricValues?.[1]?.value || '0')
        const pagesPerSession = parseFloat(row?.metricValues?.[2]?.value || '0')

        // Pobierz średni czas na stronie (wymaga osobnego zapytania)
        const [timeOnPageResponse] = await client.runReport({
          property,
          dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
          metrics: [{ name: 'averageTimeOnPage' }],
        })

        const averageTimeOnPage = parseFloat(
          timeOnPageResponse.rows?.[0]?.metricValues?.[0]?.value || '0',
        )

        return {
          period: `${days} dni`,
          averageTimeOnPage: Math.round(averageTimeOnPage),
          averageSessionDuration: Math.round(averageSessionDuration),
          bounceRate: Math.round(bounceRate * 100) / 100,
          pagesPerSession: Math.round(pagesPerSession * 100) / 100,
        }
      } catch (error) {
        console.error('Błąd podczas pobierania engagement:', error)
        return {
          period: `${days} dni`,
          averageTimeOnPage: 0,
          averageSessionDuration: 0,
          bounceRate: 0,
          pagesPerSession: 0,
          error: error instanceof Error ? error.message : 'Nieznany błąd',
        }
      }
    }),
})

