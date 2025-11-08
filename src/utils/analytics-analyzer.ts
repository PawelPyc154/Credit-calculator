/**
 * Helper functions do analizy danych z Google Analytics
 * 
 * Te funkcje mogą być wywoływane przez AI (Cursor) do automatycznej analizy danych.
 * Użyj endpointów tRPC: api.analytics.*
 */

import type { AppRouter } from 'server/api/root'
import { createCaller } from 'server/api/root'
import { createTRPCContext } from 'server/api/trpc'

/**
 * Tworzy caller tRPC do użycia w analizie
 */
export async function getAnalyticsCaller() {
  const context = await createTRPCContext({ headers: new Headers() })
  return createCaller(context)
}

/**
 * Analizuje podstawowe metryki i zwraca podsumowanie
 */
export async function analyzeOverview(days = 30) {
  const caller = await getAnalyticsCaller()
  const data = await caller.analytics.getOverview({ days })

  if (data.error) {
    return {
      error: data.error,
      summary: 'Nie można pobrać danych - sprawdź konfigurację Google Analytics API',
    }
  }

  const summary = {
    period: data.period,
    users: {
      total: data.users.total,
      new: data.users.new,
      returning: data.users.returning,
      newUserRate: data.users.total > 0 
        ? ((data.users.new / data.users.total) * 100).toFixed(1) + '%'
        : '0%',
    },
    engagement: {
      sessions: data.sessions,
      pageViews: data.pageViews,
      pagesPerSession: data.sessions > 0 
        ? (data.pageViews / data.sessions).toFixed(2)
        : '0',
    },
    events: {
      calculations: data.events.calculate_loan,
      affiliateClicks: data.events.affiliate_click,
      bankDetailsViews: data.events.view_bank_details,
    },
    conversions: {
      total: data.conversions.total,
      rate: data.conversions.rate.toFixed(2) + '%',
    },
    topPages: data.topPages.slice(0, 5),
  }

  return {
    data,
    summary,
    insights: generateInsights(summary),
  }
}

/**
 * Analizuje konwersje i zwraca rekomendacje
 */
export async function analyzeConversions(days = 30) {
  const caller = await getAnalyticsCaller()
  const data = await caller.analytics.getConversions({ days })

  if (data.error) {
    return {
      error: data.error,
      summary: 'Nie można pobrać danych konwersji',
    }
  }

  const topBank = data.byBank[0]
  const positionDistribution = {
    first: data.byPosition.first,
    second: data.byPosition.second,
    third: data.byPosition.third,
    other: data.byPosition.other,
  }

  const firstPositionRate = data.total > 0
    ? ((data.byPosition.first / data.total) * 100).toFixed(1) + '%'
    : '0%'

  return {
    data,
    summary: {
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
      positionDistribution,
      firstPositionRate,
    },
    recommendations: generateConversionRecommendations(data),
  }
}

/**
 * Analizuje eventy kalkulatora
 */
export async function analyzeCalculatorEvents(days = 30) {
  const caller = await getAnalyticsCaller()
  const data = await caller.analytics.getCalculatorEvents({ days })

  if (data.error) {
    return {
      error: data.error,
      summary: 'Nie można pobrać danych eventów',
    }
  }

  const calculationRate = data.calculations > 0 && data.affiliateClicks > 0
    ? ((data.affiliateClicks / data.calculations) * 100).toFixed(2) + '%'
    : '0%'

  return {
    data,
    summary: {
      period: data.period,
      calculations: data.calculations,
      parameterChanges: data.parameterChanges,
      affiliateClicks: data.affiliateClicks,
      bankDetailsViews: data.bankDetailsViews,
      calculationToConversionRate: calculationRate,
      mostCommonPurpose: data.mostCommonPurpose || 'brak danych',
      mostCommonInterestType: data.mostCommonInterestType || 'brak danych',
    },
    insights: generateCalculatorInsights(data),
  }
}

/**
 * Analizuje engagement
 */
export async function analyzeEngagement(days = 30) {
  const caller = await getAnalyticsCaller()
  const data = await caller.analytics.getEngagement({ days })

  if (data.error) {
    return {
      error: data.error,
      summary: 'Nie można pobrać danych engagement',
    }
  }

  return {
    data,
    summary: {
      period: data.period,
      averageTimeOnPage: `${Math.round(data.averageTimeOnPage / 60)} min ${data.averageTimeOnPage % 60} sek`,
      averageSessionDuration: `${Math.round(data.averageSessionDuration / 60)} min ${Math.round(data.averageSessionDuration % 60)} sek`,
      bounceRate: data.bounceRate.toFixed(1) + '%',
      pagesPerSession: data.pagesPerSession.toFixed(2),
    },
    recommendations: generateEngagementRecommendations(data),
  }
}

/**
 * Kompleksowa analiza wszystkich danych
 */
export async function fullAnalysis(caller: Awaited<ReturnType<typeof getAnalyticsCaller>>, options: { days?: number } = {}) {
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

// Helper functions do generowania insights

function generateInsights(summary: ReturnType<typeof analyzeOverview>['summary']) {
  const insights: string[] = []

  if (summary.users.newUserRate && parseFloat(summary.users.newUserRate) > 70) {
    insights.push('⚠️ Wysoki odsetek nowych użytkowników - rozważ strategię retencji')
  }

  if (summary.conversions.rate && parseFloat(summary.conversions.rate) < 2) {
    insights.push('⚠️ Niska konwersja - sprawdź UX formularza i ranking banków')
  }

  if (summary.events.calculations > 0 && summary.events.affiliateClicks === 0) {
    insights.push('⚠️ Użytkownicy obliczają, ale nie klikają - sprawdź widoczność linków')
  }

  if (summary.engagement.pagesPerSession && parseFloat(summary.engagement.pagesPerSession) < 2) {
    insights.push('⚠️ Niski engagement - użytkownicy szybko opuszczają stronę')
  }

  return insights
}

function generateConversionRecommendations(data: Awaited<ReturnType<typeof analyzeConversions>>['data']) {
  const recommendations: string[] = []

  if (data.byPosition.first > data.byPosition.second * 3) {
    recommendations.push('✅ Pozycja 1 dominuje - rozważ wyróżnienie top 3 ofert')
  }

  if (data.byBank.length > 0) {
    const topBank = data.byBank[0]
    if (topBank.clicks > data.total * 0.5) {
      recommendations.push(`✅ ${topBank.bankName} ma ${((topBank.clicks / data.total) * 100).toFixed(0)}% kliknięć - rozważ negocjacje lepszych warunków`)
    }
  }

  if (data.byPosition.other > data.byPosition.first) {
    recommendations.push('⚠️ Wiele kliknięć poza top 3 - rozważ poprawę widoczności najlepszych ofert')
  }

  return recommendations
}

function generateCalculatorInsights(data: Awaited<ReturnType<typeof analyzeCalculatorEvents>>['data']) {
  const insights: string[] = []

  if (data.calculations > 0) {
    const conversionRate = (data.affiliateClicks / data.calculations) * 100
    if (conversionRate < 5) {
      insights.push('⚠️ Niska konwersja z obliczeń na kliknięcia - sprawdź ranking i widoczność linków')
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

function generateEngagementRecommendations(data: Awaited<ReturnType<typeof analyzeEngagement>>['data']) {
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
  overview: Awaited<ReturnType<typeof analyzeOverview>>
  conversions: Awaited<ReturnType<typeof analyzeConversions>>
  events: Awaited<ReturnType<typeof analyzeCalculatorEvents>>
  engagement: Awaited<ReturnType<typeof analyzeEngagement>>
}) {
  const recommendations: string[] = []

  // Priorytetowe rekomendacje na podstawie wszystkich danych
  if (analysis.overview.summary && !analysis.overview.error) {
    const convRate = parseFloat(analysis.overview.summary.conversions.rate)
    if (convRate < 2) {
      recommendations.push('🔴 PRIORYTET: Niska konwersja - optymalizuj ranking i UX formularza')
    }
  }

  if (analysis.engagement.summary && !analysis.engagement.error) {
    const bounceRate = parseFloat(analysis.engagement.summary.bounceRate)
    if (bounceRate > 60) {
      recommendations.push('🟡 PRIORYTET: Wysoki bounce rate - sprawdź szybkość i pierwsze wrażenie')
    }
  }

  if (analysis.conversions.summary && !analysis.conversions.error) {
    if (analysis.conversions.summary.topBank) {
      recommendations.push(`💡 Oportunność: ${analysis.conversions.summary.topBank.name} generuje najwięcej kliknięć - rozważ partnerstwo`)
    }
  }

  return recommendations
}

/**
 * Formatuje wyniki analizy jako czytelny raport tekstowy
 */
function formatAnalysisReport(analysis: {
  overview: Awaited<ReturnType<typeof analyzeOverview>>
  conversions: Awaited<ReturnType<typeof analyzeConversions>>
  events: Awaited<ReturnType<typeof analyzeCalculatorEvents>>
  engagement: Awaited<ReturnType<typeof analyzeEngagement>>
  overallRecommendations: string[]
}) {
  const lines: string[] = []
  
  // Overview
  if (analysis.overview.error) {
    lines.push('❌ Błąd pobierania danych overview')
  } else if (analysis.overview.summary) {
    lines.push('📊 PODSUMOWANIE')
    lines.push('─'.repeat(60))
    lines.push(`Okres: ${analysis.overview.summary.period}`)
    lines.push(`Użytkownicy: ${analysis.overview.summary.users.total} (nowi: ${analysis.overview.summary.users.new}, ${analysis.overview.summary.users.newUserRate} nowych)`)
    lines.push(`Sesje: ${analysis.overview.summary.engagement.sessions}`)
    lines.push(`Page Views: ${analysis.overview.summary.engagement.pageViews} (${analysis.overview.summary.engagement.pagesPerSession} na sesję)`)
    lines.push(`Obliczenia: ${analysis.overview.summary.events.calculations}`)
    lines.push(`Kliknięcia affiliate: ${analysis.overview.summary.events.affiliateClicks}`)
    lines.push(`Konwersje: ${analysis.overview.summary.conversions.total} (${analysis.overview.summary.conversions.rate})`)
    if (analysis.overview.insights && analysis.overview.insights.length > 0) {
      lines.push('\n💡 Insights:')
      analysis.overview.insights.forEach(insight => lines.push(`   ${insight}`))
    }
    lines.push('')
  }
  
  // Conversions
  if (analysis.conversions.error) {
    lines.push('❌ Błąd pobierania danych konwersji')
  } else if (analysis.conversions.summary) {
    lines.push('💰 KONWERSJE')
    lines.push('─'.repeat(60))
    lines.push(`Okres: ${analysis.conversions.summary.period}`)
    lines.push(`Łączne konwersje: ${analysis.conversions.summary.totalConversions}`)
    if (analysis.conversions.summary.topBank) {
      lines.push(`Top bank: ${analysis.conversions.summary.topBank.name} (${analysis.conversions.summary.topBank.clicks} kliknięć, pozycja ${analysis.conversions.summary.topBank.position})`)
    }
    lines.push(`Rozkład pozycji: 1. ${analysis.conversions.summary.positionDistribution.first}, 2. ${analysis.conversions.summary.positionDistribution.second}, 3. ${analysis.conversions.summary.positionDistribution.third}, inne: ${analysis.conversions.summary.positionDistribution.other}`)
    lines.push(`Pozycja 1: ${analysis.conversions.summary.firstPositionRate} wszystkich kliknięć`)
    if (analysis.conversions.recommendations && analysis.conversions.recommendations.length > 0) {
      lines.push('\n💡 Rekomendacje:')
      analysis.conversions.recommendations.forEach(rec => lines.push(`   ${rec}`))
    }
    lines.push('')
  }
  
  // Events
  if (analysis.events.error) {
    lines.push('❌ Błąd pobierania danych eventów')
  } else if (analysis.events.summary) {
    lines.push('🎯 EVENTY KALKULATORA')
    lines.push('─'.repeat(60))
    lines.push(`Okres: ${analysis.events.summary.period}`)
    lines.push(`Obliczenia: ${analysis.events.summary.calculations}`)
    lines.push(`Zmiany parametrów: ${analysis.events.summary.parameterChanges}`)
    lines.push(`Kliknięcia affiliate: ${analysis.events.summary.affiliateClicks}`)
    lines.push(`Szczegóły banków: ${analysis.events.summary.bankDetailsViews}`)
    lines.push(`Konwersja obliczeń→kliknięć: ${analysis.events.summary.calculationToConversionRate}`)
    lines.push(`Najczęstszy cel: ${analysis.events.summary.mostCommonPurpose}`)
    lines.push(`Najczęstszy typ oprocentowania: ${analysis.events.summary.mostCommonInterestType}`)
    if (analysis.events.insights && analysis.events.insights.length > 0) {
      lines.push('\n💡 Insights:')
      analysis.events.insights.forEach(insight => lines.push(`   ${insight}`))
    }
    lines.push('')
  }
  
  // Engagement
  if (analysis.engagement.error) {
    lines.push('❌ Błąd pobierania danych engagement')
  } else if (analysis.engagement.summary) {
    lines.push('⏱️  ENGAGEMENT')
    lines.push('─'.repeat(60))
    lines.push(`Okres: ${analysis.engagement.summary.period}`)
    lines.push(`Średni czas na stronie: ${analysis.engagement.summary.averageTimeOnPage}`)
    lines.push(`Średni czas sesji: ${analysis.engagement.summary.averageSessionDuration}`)
    lines.push(`Bounce rate: ${analysis.engagement.summary.bounceRate}`)
    lines.push(`Strony na sesję: ${analysis.engagement.summary.pagesPerSession}`)
    if (analysis.engagement.recommendations && analysis.engagement.recommendations.length > 0) {
      lines.push('\n💡 Rekomendacje:')
      analysis.engagement.recommendations.forEach(rec => lines.push(`   ${rec}`))
    }
    lines.push('')
  }
  
  // Overall Recommendations
  if (analysis.overallRecommendations.length > 0) {
    lines.push('🎯 OGÓLNE REKOMENDACJE')
    lines.push('─'.repeat(60))
    analysis.overallRecommendations.forEach(rec => lines.push(`   ${rec}`))
    lines.push('')
  }
  
  return lines.join('\n')
}

