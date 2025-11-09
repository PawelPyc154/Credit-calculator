/**
 * Helper functions do analizy danych z Google Analytics
 *
 * Te funkcje mogą być wywoływane przez AI (Cursor) do automatycznej analizy danych.
 * Użyj endpointów tRPC: api.analytics.*
 */

import { createCaller } from 'server/api/root'
import { createTRPCContext } from 'server/api/trpc'

type AnalysisSuccess<TData, TSummary, TExtras extends Record<string, unknown> = {}> = {
  status: 'success'
  data: TData
  summary: TSummary
} & TExtras

type AnalysisError = {
  status: 'error'
  error: string
  summary: string
}

const DEFAULT_MESSAGES = {
  overview: 'Nie można pobrać danych - sprawdź konfigurację Google Analytics API',
  conversions: 'Nie można pobrać danych konwersji',
  events: 'Nie można pobrać danych eventów',
  engagement: 'Nie można pobrać danych engagement',
}

const numberOrZero = (value: unknown): number => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

const percentageString = (value: number, fractionDigits = 1) => {
  const safeValue = Number.isFinite(value) ? value : 0
  return `${safeValue.toFixed(fractionDigits)}%`
}

const ratioToPercentage = (value: number, total: number, fractionDigits = 1) => {
  if (!total) return '0%'
  return percentageString((value / total) * 100, fractionDigits)
}

const secondsToReadable = (valueInSeconds: number) => {
  const safeSeconds = Math.max(0, Math.round(numberOrZero(valueInSeconds)))
  const minutes = Math.floor(safeSeconds / 60)
  const seconds = safeSeconds % 60
  return `${minutes} min ${seconds} sek`
}

const createErrorResult = (error: string, summary: string): AnalysisError => ({
  status: 'error',
  error,
  summary,
})

const extractErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message) {
    return error.message
  }
  if (typeof error === 'string' && error.trim().length > 0) {
    return error
  }
  return fallback
}

/**
 * Tworzy caller tRPC do użycia w analizie
 */
export async function getAnalyticsCaller() {
  const context = await createTRPCContext({ headers: new Headers() })
  return createCaller(context)
}

type OverviewData = {
  period: string
  users: { total: number; new: number; returning: number }
  sessions: number
  pageViews: number
  events: Record<string, number>
  conversions: { total: number; rate: number }
  topBanks: unknown[]
  topPages: Array<{ path: string; views: number }>
  error?: string
}

type OverviewSummary = {
  period: string
  users: {
    total: number
    new: number
    returning: number
    newUserRate: string
  }
  engagement: {
    sessions: number
    pageViews: number
    pagesPerSession: string
  }
  events: {
    calculations: number
    affiliateClicks: number
    bankDetailsViews: number
  }
  conversions: {
    total: number
    rate: string
  }
  topPages: Array<{ path: string; views: number }>
}

type OverviewResult = AnalysisSuccess<OverviewData, OverviewSummary, { insights: string[] }> | AnalysisError

/**
 * Analizuje podstawowe metryki i zwraca podsumowanie
 */
export async function analyzeOverview(days = 30): Promise<OverviewResult> {
  try {
    const caller = await getAnalyticsCaller()
    const rawData = await caller.analytics.getOverview({ days })

    if (!rawData || rawData.error) {
      return createErrorResult(rawData?.error ?? DEFAULT_MESSAGES.overview, DEFAULT_MESSAGES.overview)
    }

    const data = normalizeOverviewData(rawData)
    const summary = buildOverviewSummary(data)

    return {
      status: 'success',
      data,
      summary,
      insights: generateOverviewInsights(summary),
    }
  } catch (error) {
    const message = extractErrorMessage(error, DEFAULT_MESSAGES.overview)
    return createErrorResult(message, DEFAULT_MESSAGES.overview)
  }
}

type ConversionsData = {
  period: string
  total: number
  byBank: Array<{ bankName: string; clicks: number; position: number; conversionValue: number }>
  byPosition: { first: number; second: number; third: number; other: number }
  error?: string
}

type ConversionsSummary = {
  period: string
  totalConversions: number
  topBank: {
    name: string
    clicks: number
    position: number
    value: number
  } | null
  positionDistribution: { first: number; second: number; third: number; other: number }
  firstPositionRate: string
}

type ConversionsResult = AnalysisSuccess<ConversionsData, ConversionsSummary, { recommendations: string[] }> | AnalysisError

/**
 * Analizuje konwersje i zwraca rekomendacje
 */
export async function analyzeConversions(days = 30): Promise<ConversionsResult> {
  try {
    const caller = await getAnalyticsCaller()
    const rawData = await caller.analytics.getConversions({ days })

    if (!rawData || rawData.error) {
      return createErrorResult(rawData?.error ?? DEFAULT_MESSAGES.conversions, DEFAULT_MESSAGES.conversions)
    }

    const data = normalizeConversionsData(rawData)
    const summary = buildConversionsSummary(data)

    return {
      status: 'success',
      data,
      summary,
      recommendations: generateConversionRecommendations(data),
    }
  } catch (error) {
    const message = extractErrorMessage(error, DEFAULT_MESSAGES.conversions)
    return createErrorResult(message, DEFAULT_MESSAGES.conversions)
  }
}

type CalculatorEventsData = {
  period: string
  calculations: number
  parameterChanges: number
  affiliateClicks: number
  bankDetailsViews: number
  averageLoanAmount: number
  averageLoanPeriod: number
  mostCommonPurpose: string
  mostCommonInterestType: string
  error?: string
}

type CalculatorEventsSummary = {
  period: string
  calculations: number
  parameterChanges: number
  affiliateClicks: number
  bankDetailsViews: number
  calculationToConversionRate: string
  mostCommonPurpose: string
  mostCommonInterestType: string
}

type CalculatorEventsResult = AnalysisSuccess<CalculatorEventsData, CalculatorEventsSummary, { insights: string[] }> | AnalysisError

/**
 * Analizuje eventy kalkulatora
 */
export async function analyzeCalculatorEvents(days = 30): Promise<CalculatorEventsResult> {
  try {
    const caller = await getAnalyticsCaller()
    const rawData = await caller.analytics.getCalculatorEvents({ days })

    if (!rawData || rawData.error) {
      return createErrorResult(rawData?.error ?? DEFAULT_MESSAGES.events, DEFAULT_MESSAGES.events)
    }

    const data = normalizeCalculatorEventsData(rawData)
    const summary = buildCalculatorEventsSummary(data)

    return {
      status: 'success',
      data,
      summary,
      insights: generateCalculatorInsights(data),
    }
  } catch (error) {
    const message = extractErrorMessage(error, DEFAULT_MESSAGES.events)
    return createErrorResult(message, DEFAULT_MESSAGES.events)
  }
}

type EngagementData = {
  period: string
  averageTimeOnPage: number
  averageSessionDuration: number
  bounceRate: number
  pagesPerSession: number
  error?: string
}

type EngagementSummary = {
  period: string
  averageTimeOnPage: string
  averageSessionDuration: string
  bounceRate: string
  pagesPerSession: string
}

type EngagementResult = AnalysisSuccess<EngagementData, EngagementSummary, { recommendations: string[] }> | AnalysisError

/**
 * Analizuje engagement
 */
export async function analyzeEngagement(days = 30): Promise<EngagementResult> {
  try {
    const caller = await getAnalyticsCaller()
    const rawData = await caller.analytics.getEngagement({ days })

    if (!rawData || rawData.error) {
      return createErrorResult(rawData?.error ?? DEFAULT_MESSAGES.engagement, DEFAULT_MESSAGES.engagement)
    }

    const data = normalizeEngagementData(rawData)
    const summary = buildEngagementSummary(data)

    return {
      status: 'success',
      data,
      summary,
      recommendations: generateEngagementRecommendations(data),
    }
  } catch (error) {
    const message = extractErrorMessage(error, DEFAULT_MESSAGES.engagement)
    return createErrorResult(message, DEFAULT_MESSAGES.engagement)
  }
}

/**
 * Kompleksowa analiza wszystkich danych
 */
export async function fullAnalysis(options: { days?: number } = {}): Promise<string> {
  const days = options.days ?? 30

  const [overview, conversions, events, engagement] = await Promise.all([
    analyzeOverview(days),
    analyzeConversions(days),
    analyzeCalculatorEvents(days),
    analyzeEngagement(days),
  ])

  const analysis = {
    overview,
    conversions,
    events,
    engagement,
    overallRecommendations: generateOverallRecommendations({
      overview,
      conversions,
      events,
      engagement,
    }),
  }

  // Formatuj wynik jako czytelny tekst
  return formatAnalysisReport(analysis)
}

// Helper functions do analizy i generowania insightów

const normalizeOverviewData = (raw: OverviewData): OverviewData => {
  const normalizedTopPages = Array.isArray(raw.topPages)
    ? raw.topPages
        .filter((item): item is { path: string; views: number } => typeof item?.path === 'string')
        .map((item) => ({
          path: item.path,
          views: numberOrZero(item.views),
        }))
    : []

  return {
    ...raw,
    users: {
      total: numberOrZero(raw.users?.total),
      new: numberOrZero(raw.users?.new),
      returning: numberOrZero(raw.users?.returning),
    },
    sessions: numberOrZero(raw.sessions),
    pageViews: numberOrZero(raw.pageViews),
    events: {
      ...raw.events,
      calculate_loan: numberOrZero(raw.events?.calculate_loan),
      affiliate_click: numberOrZero(raw.events?.affiliate_click),
      view_bank_details: numberOrZero(raw.events?.view_bank_details),
    },
    conversions: {
      total: numberOrZero(raw.conversions?.total),
      rate: numberOrZero(raw.conversions?.rate),
    },
    topBanks: Array.isArray(raw.topBanks) ? raw.topBanks : [],
    topPages: normalizedTopPages,
  }
}

const buildOverviewSummary = (data: OverviewData): OverviewSummary => {
  const pagesPerSession =
    data.sessions > 0 ? (data.pageViews / data.sessions).toFixed(2) : '0.00'

  return {
    period: data.period,
    users: {
      total: data.users.total,
      new: data.users.new,
      returning: data.users.returning,
      newUserRate: ratioToPercentage(data.users.new, data.users.total),
    },
    engagement: {
      sessions: data.sessions,
      pageViews: data.pageViews,
      pagesPerSession,
    },
    events: {
      calculations: data.events.calculate_loan ?? 0,
      affiliateClicks: data.events.affiliate_click ?? 0,
      bankDetailsViews: data.events.view_bank_details ?? 0,
    },
    conversions: {
      total: data.conversions.total,
      rate: percentageString(data.conversions.rate, 2),
    },
    topPages: data.topPages.slice(0, 5),
  }
}

const generateOverviewInsights = (summary: OverviewSummary) => {
  const insights: string[] = []

  const newUserShare = parseFloat(summary.users.newUserRate)
  if (Number.isFinite(newUserShare) && newUserShare > 70) {
    insights.push('⚠️ Wysoki odsetek nowych użytkowników - rozważ strategię retencji')
  }

  const conversionRate = parseFloat(summary.conversions.rate)
  if (Number.isFinite(conversionRate) && conversionRate < 2) {
    insights.push('⚠️ Niska konwersja - sprawdź UX formularza i ranking banków')
  }

  if (summary.events.calculations > 0 && summary.events.affiliateClicks === 0) {
    insights.push('⚠️ Użytkownicy obliczają, ale nie klikają - sprawdź widoczność linków')
  }

  const pagesPerSession = parseFloat(summary.engagement.pagesPerSession)
  if (Number.isFinite(pagesPerSession) && pagesPerSession < 2) {
    insights.push('⚠️ Niski engagement - użytkownicy szybko opuszczają stronę')
  }

  return insights
}

const normalizeConversionsData = (raw: ConversionsData): ConversionsData => ({
  ...raw,
  total: numberOrZero(raw.total),
  byBank: Array.isArray(raw.byBank)
    ? raw.byBank.map((item) => ({
        bankName: String(item.bankName ?? 'Nieznany bank'),
        clicks: numberOrZero(item.clicks),
        position: numberOrZero(item.position),
        conversionValue: numberOrZero(item.conversionValue),
      }))
    : [],
  byPosition: {
    first: numberOrZero(raw.byPosition?.first),
    second: numberOrZero(raw.byPosition?.second),
    third: numberOrZero(raw.byPosition?.third),
    other: numberOrZero(raw.byPosition?.other),
  },
})

const buildConversionsSummary = (data: ConversionsData): ConversionsSummary => {
  const [topBank] = data.byBank
  return {
    period: data.period,
    totalConversions: data.total,
    topBank: topBank
      ? {
          name: topBank.bankName,
          clicks: topBank.clicks,
          position: topBank.position,
          value: topBank.conversionValue,
        }
      : null,
    positionDistribution: data.byPosition,
    firstPositionRate: ratioToPercentage(data.byPosition.first, data.total),
  }
}

const generateConversionRecommendations = (data: ConversionsData) => {
  const recommendations: string[] = []

  if (data.byPosition.first > data.byPosition.second * 3) {
    recommendations.push('✅ Pozycja 1 dominuje - rozważ wyróżnienie top 3 ofert')
  }

  if (data.byBank.length > 0) {
    const [topBank] = data.byBank
    if (topBank && data.total > 0 && topBank.clicks > data.total * 0.5) {
      recommendations.push(
        `✅ ${topBank.bankName} ma ${ratioToPercentage(topBank.clicks, data.total)} kliknięć - rozważ negocjacje lepszych warunków`,
      )
    }
  }

  if (data.byPosition.other > data.byPosition.first) {
    recommendations.push(
      '⚠️ Wiele kliknięć poza top 3 - rozważ poprawę widoczności najlepszych ofert',
    )
  }

  return recommendations
}

const normalizeCalculatorEventsData = (
  raw: CalculatorEventsData,
): CalculatorEventsData => ({
  ...raw,
  calculations: numberOrZero(raw.calculations),
  parameterChanges: numberOrZero(raw.parameterChanges),
  affiliateClicks: numberOrZero(raw.affiliateClicks),
  bankDetailsViews: numberOrZero(raw.bankDetailsViews),
  averageLoanAmount: numberOrZero(raw.averageLoanAmount),
  averageLoanPeriod: numberOrZero(raw.averageLoanPeriod),
  mostCommonPurpose: raw.mostCommonPurpose || 'brak danych',
  mostCommonInterestType: raw.mostCommonInterestType || 'brak danych',
})

const buildCalculatorEventsSummary = (
  data: CalculatorEventsData,
): CalculatorEventsSummary => ({
  period: data.period,
  calculations: data.calculations,
  parameterChanges: data.parameterChanges,
  affiliateClicks: data.affiliateClicks,
  bankDetailsViews: data.bankDetailsViews,
  calculationToConversionRate: ratioToPercentage(data.affiliateClicks, data.calculations, 2),
  mostCommonPurpose: data.mostCommonPurpose || 'brak danych',
  mostCommonInterestType: data.mostCommonInterestType || 'brak danych',
})

const generateCalculatorInsights = (data: CalculatorEventsData) => {
  const insights: string[] = []

  if (data.calculations > 0) {
    const conversionRate = (data.affiliateClicks / data.calculations) * 100
    if (conversionRate < 5) {
      insights.push(
        '⚠️ Niska konwersja z obliczeń na kliknięcia - sprawdź ranking i widoczność linków',
      )
    } else if (conversionRate > 20) {
      insights.push('✅ Wysoka konwersja - ranking działa dobrze!')
    }
  }

  if (data.parameterChanges > data.calculations * 2) {
    insights.push('ℹ️ Użytkownicy często zmieniają parametry - rozważ lepsze domyślne wartości')
  }

  if (data.mostCommonPurpose) {
    insights.push(`ℹ️ Najczęstszy cel: ${data.mostCommonPurpose}`)
  }

  return insights
}

const normalizeEngagementData = (raw: EngagementData): EngagementData => ({
  ...raw,
  averageTimeOnPage: numberOrZero(raw.averageTimeOnPage),
  averageSessionDuration: numberOrZero(raw.averageSessionDuration),
  bounceRate: numberOrZero(raw.bounceRate),
  pagesPerSession: Number.isFinite(raw.pagesPerSession)
    ? raw.pagesPerSession
    : numberOrZero(raw.pagesPerSession),
})

const buildEngagementSummary = (data: EngagementData): EngagementSummary => ({
  period: data.period,
  averageTimeOnPage: secondsToReadable(data.averageTimeOnPage),
  averageSessionDuration: secondsToReadable(data.averageSessionDuration),
  bounceRate: percentageString(data.bounceRate, 1),
  pagesPerSession: data.pagesPerSession.toFixed(2),
})

const generateEngagementRecommendations = (data: EngagementData) => {
  const recommendations: string[] = []

  if (data.bounceRate > 60) {
    recommendations.push('⚠️ Wysoki bounce rate - sprawdź szybkość ładowania i UX')
  }

  if (data.averageTimeOnPage < 30) {
    recommendations.push('⚠️ Krótki czas na stronie - rozważ bardziej angażującą treść')
  }

  if (data.pagesPerSession < 1.5) {
    recommendations.push('⚠️ Użytkownicy oglądają mało stron - rozważ wewnętrzne linkowanie')
  }

  return recommendations
}

function generateOverallRecommendations(analysis: {
  overview: OverviewResult
  conversions: ConversionsResult
  events: CalculatorEventsResult
  engagement: EngagementResult
}) {
  const recommendations: string[] = []

  // Priorytetowe rekomendacje na podstawie wszystkich danych
  if (analysis.overview.status === 'success') {
    const convRate = parseFloat(analysis.overview.summary.conversions.rate)
    if (convRate < 2) {
      recommendations.push('🔴 PRIORYTET: Niska konwersja - optymalizuj ranking i UX formularza')
    }
  }

  if (analysis.engagement.status === 'success') {
    const bounceRate = parseFloat(analysis.engagement.summary.bounceRate)
    if (bounceRate > 60) {
      recommendations.push(
        '🟡 PRIORYTET: Wysoki bounce rate - sprawdź szybkość i pierwsze wrażenie',
      )
    }
  }

  if (analysis.conversions.status === 'success') {
    if (analysis.conversions.summary.topBank) {
      recommendations.push(
        `💡 Oportunność: ${analysis.conversions.summary.topBank.name} generuje najwięcej kliknięć - rozważ partnerstwo`,
      )
    }
  }

  return recommendations
}

/**
 * Formatuje wyniki analizy jako czytelny raport tekstowy
 */
function formatAnalysisReport(analysis: {
  overview: OverviewResult
  conversions: ConversionsResult
  events: CalculatorEventsResult
  engagement: EngagementResult
  overallRecommendations: string[]
}) {
  const lines: string[] = []

  // Overview
  if (analysis.overview.status === 'error') {
    lines.push('❌ Błąd pobierania danych overview')
  } else {
    lines.push('📊 PODSUMOWANIE')
    lines.push('─'.repeat(60))
    lines.push(`Okres: ${analysis.overview.summary.period}`)
    lines.push(
      `Użytkownicy: ${analysis.overview.summary.users.total} (nowi: ${analysis.overview.summary.users.new}, ${analysis.overview.summary.users.newUserRate} nowych)`,
    )
    lines.push(`Sesje: ${analysis.overview.summary.engagement.sessions}`)
    lines.push(
      `Page Views: ${analysis.overview.summary.engagement.pageViews} (${analysis.overview.summary.engagement.pagesPerSession} na sesję)`,
    )
    lines.push(`Obliczenia: ${analysis.overview.summary.events.calculations}`)
    lines.push(`Kliknięcia affiliate: ${analysis.overview.summary.events.affiliateClicks}`)
    lines.push(
      `Konwersje: ${analysis.overview.summary.conversions.total} (${analysis.overview.summary.conversions.rate})`,
    )
    if (analysis.overview.insights.length > 0) {
      lines.push('\n💡 Insights:')
      analysis.overview.insights.forEach((insight: string) => lines.push(`   ${insight}`))
    }
    lines.push('')
  }

  // Conversions
  if (analysis.conversions.status === 'error') {
    lines.push('❌ Błąd pobierania danych konwersji')
  } else {
    lines.push('💰 KONWERSJE')
    lines.push('─'.repeat(60))
    lines.push(`Okres: ${analysis.conversions.summary.period}`)
    lines.push(`Łączne konwersje: ${analysis.conversions.summary.totalConversions}`)
    if (analysis.conversions.summary.topBank) {
      lines.push(
        `Top bank: ${analysis.conversions.summary.topBank.name} (${analysis.conversions.summary.topBank.clicks} kliknięć, pozycja ${analysis.conversions.summary.topBank.position})`,
      )
    }
    lines.push(
      `Rozkład pozycji: 1. ${analysis.conversions.summary.positionDistribution.first}, 2. ${analysis.conversions.summary.positionDistribution.second}, 3. ${analysis.conversions.summary.positionDistribution.third}, inne: ${analysis.conversions.summary.positionDistribution.other}`,
    )
    lines.push(`Pozycja 1: ${analysis.conversions.summary.firstPositionRate} wszystkich kliknięć`)
    if (analysis.conversions.recommendations.length > 0) {
      lines.push('\n💡 Rekomendacje:')
      analysis.conversions.recommendations.forEach((rec: string) => lines.push(`   ${rec}`))
    }
    lines.push('')
  }

  // Events
  if (analysis.events.status === 'error') {
    lines.push('❌ Błąd pobierania danych eventów')
  } else {
    lines.push('🎯 EVENTY KALKULATORA')
    lines.push('─'.repeat(60))
    lines.push(`Okres: ${analysis.events.summary.period}`)
    lines.push(`Obliczenia: ${analysis.events.summary.calculations}`)
    lines.push(`Zmiany parametrów: ${analysis.events.summary.parameterChanges}`)
    lines.push(`Kliknięcia affiliate: ${analysis.events.summary.affiliateClicks}`)
    lines.push(`Szczegóły banków: ${analysis.events.summary.bankDetailsViews}`)
    lines.push(
      `Konwersja obliczeń→kliknięć: ${analysis.events.summary.calculationToConversionRate}`,
    )
    lines.push(`Najczęstszy cel: ${analysis.events.summary.mostCommonPurpose}`)
    lines.push(`Najczęstszy typ oprocentowania: ${analysis.events.summary.mostCommonInterestType}`)
    if (analysis.events.insights.length > 0) {
      lines.push('\n💡 Insights:')
      analysis.events.insights.forEach((insight: string) => lines.push(`   ${insight}`))
    }
    lines.push('')
  }

  // Engagement
  if (analysis.engagement.status === 'error') {
    lines.push('❌ Błąd pobierania danych engagement')
  } else {
    lines.push('⏱️  ENGAGEMENT')
    lines.push('─'.repeat(60))
    lines.push(`Okres: ${analysis.engagement.summary.period}`)
    lines.push(`Średni czas na stronie: ${analysis.engagement.summary.averageTimeOnPage}`)
    lines.push(`Średni czas sesji: ${analysis.engagement.summary.averageSessionDuration}`)
    lines.push(`Bounce rate: ${analysis.engagement.summary.bounceRate}`)
    lines.push(`Strony na sesję: ${analysis.engagement.summary.pagesPerSession}`)
    if (analysis.engagement.recommendations.length > 0) {
      lines.push('\n💡 Rekomendacje:')
      analysis.engagement.recommendations.forEach((rec: string) => lines.push(`   ${rec}`))
    }
    lines.push('')
  }

  // Overall Recommendations
  if (analysis.overallRecommendations.length > 0) {
    lines.push('🎯 OGÓLNE REKOMENDACJE')
    lines.push('─'.repeat(60))
    analysis.overallRecommendations.forEach((rec) => lines.push(`   ${rec}`))
    lines.push('')
  }

  return lines.join('\n')
}
