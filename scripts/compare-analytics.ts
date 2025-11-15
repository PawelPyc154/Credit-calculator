/**
 * Skrypt do porównania danych z Google Analytics z różnych okresów
 * Aby zobaczyć poprawę w czasie
 *
 * Uruchom: npx tsx scripts/compare-analytics.ts
 */

import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { config } from 'dotenv'

// Załaduj zmienne środowiskowe z .env.local lub .env
const envLocalPath = resolve(process.cwd(), '.env.local')
const envPath = resolve(process.cwd(), '.env')

if (existsSync(envLocalPath)) {
  config({ path: envLocalPath })
  console.log('📁 Ładowanie zmiennych z .env.local\n')
} else if (existsSync(envPath)) {
  config({ path: envPath })
  console.log('📁 Ładowanie zmiennych z .env\n')
} else {
  console.log('⚠️  Brak pliku .env.local lub .env\n')
}

async function compareAnalytics() {
  console.log('📊 Porównanie danych z Google Analytics\n')
  console.log('═'.repeat(80))

  try {
    const { createCaller } = await import('../src/server/api/root')
    const { createTRPCContext } = await import('../src/server/api/trpc')
    const { analyzeOrganicTraffic, analyzeTrafficSources } = await import(
      '../src/utils/search-console-analyzer'
    )

    const context = await createTRPCContext({ headers: new Headers() })
    const caller = createCaller(context)

    // Porównaj dane z ostatnich 7, 14, 30 i 60 dni
    const periods = [
      { days: 7, label: 'Ostatnie 7 dni' },
      { days: 14, label: 'Ostatnie 14 dni' },
      { days: 30, label: 'Ostatnie 30 dni' },
      { days: 60, label: 'Ostatnie 60 dni' },
    ]

    console.log('\n📈 PODSTAWOWE METRYKI\n')
    console.log('─'.repeat(80))

    const overviewData: Array<{
      period: string
      days: number
      users: number
      sessions: number
      pageViews: number
      conversions: number
    }> = []

    for (const { days, label } of periods) {
      const data = await caller.analytics.getOverview({ days })

      if (data.error) {
        console.log(`\n❌ ${label}: ${data.error}`)
        continue
      }

      overviewData.push({
        period: label,
        days,
        users: data.users.total,
        sessions: data.sessions,
        pageViews: data.pageViews,
        conversions: data.conversions.total,
      })

      console.log(`\n${label}:`)
      console.log(`  👥 Użytkownicy: ${data.users.total} (nowi: ${data.users.new}, powracający: ${data.users.returning})`)
      console.log(`  📊 Sesje: ${data.sessions}`)
      console.log(`  📄 Page Views: ${data.pageViews}`)
      console.log(`  🎯 Konwersje: ${data.conversions.total} (${data.conversions.rate.toFixed(2)}%)`)
      console.log(`  🔢 Obliczenia: ${data.events.calculate_loan}`)
      console.log(`  🔗 Kliknięcia affiliate: ${data.events.affiliate_click}`)
    }

    // Oblicz trendy
    if (overviewData.length >= 2) {
      console.log(`\n${'═'.repeat(80)}`)
      console.log('\n📈 TRENDY (porównanie z poprzednim okresem)\n')
      console.log('─'.repeat(80))

      for (let i = 1; i < overviewData.length; i++) {
        const current = overviewData[i]!
        const previous = overviewData[i - 1]!

        // Oblicz średnie dzienne dla porównania
        const currentDailyUsers = current.users / current.days
        const previousDailyUsers = previous.users / previous.days
        const currentDailySessions = current.sessions / current.days
        const previousDailySessions = previous.sessions / previous.days
        const currentDailyPageViews = current.pageViews / current.days
        const previousDailyPageViews = previous.pageViews / previous.days
        const currentDailyConversions = current.conversions / current.days
        const previousDailyConversions = previous.conversions / previous.days

        const usersChange = ((currentDailyUsers - previousDailyUsers) / previousDailyUsers) * 100
        const sessionsChange =
          ((currentDailySessions - previousDailySessions) / previousDailySessions) * 100
        const pageViewsChange =
          ((currentDailyPageViews - previousDailyPageViews) / previousDailyPageViews) * 100
        const conversionsChange =
          ((currentDailyConversions - previousDailyConversions) / previousDailyConversions) * 100

        console.log(`\n${current.period} vs ${previous.period} (średnia dzienna):`)
        console.log(
          `  👥 Użytkownicy: ${currentDailyUsers.toFixed(1)}/dzień ${usersChange >= 0 ? '📈' : '📉'} ${Math.abs(usersChange).toFixed(1)}%`,
        )
        console.log(
          `  📊 Sesje: ${currentDailySessions.toFixed(1)}/dzień ${sessionsChange >= 0 ? '📈' : '📉'} ${Math.abs(sessionsChange).toFixed(1)}%`,
        )
        console.log(
          `  📄 Page Views: ${currentDailyPageViews.toFixed(1)}/dzień ${pageViewsChange >= 0 ? '📈' : '📉'} ${Math.abs(pageViewsChange).toFixed(1)}%`,
        )
        console.log(
          `  🎯 Konwersje: ${currentDailyConversions.toFixed(2)}/dzień ${conversionsChange >= 0 ? '📈' : '📉'} ${Math.abs(conversionsChange).toFixed(1)}%`,
        )
      }
    }

    // Analiza SEO
    console.log(`\n${'═'.repeat(80)}`)
    console.log('\n🔍 ANALIZA SEO (ostatnie 30 dni)\n')
    console.log('─'.repeat(80))

    const organic = await analyzeOrganicTraffic(30)
    const sources = await analyzeTrafficSources(30)

    if (organic.summary && typeof organic.summary === 'object' && 'sessions' in organic.summary) {
      console.log('\n📊 Ruch organiczny:')
      console.log(`  Sesje: ${organic.summary.sessions}`)
      console.log(`  Użytkownicy: ${organic.summary.users}`)
      console.log(`  Page Views: ${organic.summary.pageViews}`)
      console.log(
        `  Search Console połączone: ${organic.summary.searchConsoleConnected ? '✅ TAK' : '❌ NIE'}`,
      )

      if (organic.insights && organic.insights.length > 0) {
        console.log('\n💡 Insights:')
        organic.insights.forEach((insight) => console.log(`  ${insight}`))
      }
    }

    if (
      sources.summary &&
      typeof sources.summary === 'object' &&
      'organicPercentage' in sources.summary
    ) {
      console.log('\n📊 Źródła ruchu:')
      console.log(`  Ruch organiczny: ${sources.summary.organicSessions} sesji (${sources.summary.organicPercentage})`)
      console.log(`  Ruch direct: ${sources.summary.directSessions} sesji`)
      if (sources.summary.topSource) {
        console.log(
          `  Top źródło: ${sources.summary.topSource.source}/${sources.summary.topSource.medium} (${sources.summary.topSource.sessions} sesji)`,
        )
      }

      if (sources.insights && sources.insights.length > 0) {
        console.log('\n💡 Insights:')
        sources.insights.forEach((insight) => console.log(`  ${insight}`))
      }
    }

    // Podsumowanie
    console.log(`\n${'═'.repeat(80)}`)
    console.log('\n📋 PODSUMOWANIE\n')
    console.log('─'.repeat(80))

    const latest = overviewData[0]
    if (latest) {
      console.log(`\n✅ Ostatnie 7 dni:`)
      console.log(`  - ${latest.users} użytkowników`)
      console.log(`  - ${latest.sessions} sesji`)
      console.log(`  - ${latest.pageViews} page views`)
      console.log(`  - ${latest.conversions} konwersji`)

      const avgDailyUsers = latest.users / latest.days
      const avgDailySessions = latest.sessions / latest.days
      const avgDailyPageViews = latest.pageViews / latest.days

      console.log(`\n📊 Średnia dzienna (ostatnie 7 dni):`)
      console.log(`  - ${avgDailyUsers.toFixed(1)} użytkowników/dzień`)
      console.log(`  - ${avgDailySessions.toFixed(1)} sesji/dzień`)
      console.log(`  - ${avgDailyPageViews.toFixed(1)} page views/dzień`)
    }

    if (overviewData.length >= 2) {
      const week1 = overviewData[0]!
      const week2 = overviewData[1]!

      const week1Daily = {
        users: week1.users / week1.days,
        sessions: week1.sessions / week1.days,
        pageViews: week1.pageViews / week1.days,
      }

      const week2Daily = {
        users: week2.users / week2.days,
        sessions: week2.sessions / week2.days,
        pageViews: week2.pageViews / week2.days,
      }

      const usersTrend = ((week1Daily.users - week2Daily.users) / week2Daily.users) * 100
      const sessionsTrend =
        ((week1Daily.sessions - week2Daily.sessions) / week2Daily.sessions) * 100
      const pageViewsTrend =
        ((week1Daily.pageViews - week2Daily.pageViews) / week2Daily.pageViews) * 100

      console.log(`\n📈 Trend (ostatnie 7 dni vs poprzednie 7 dni):`)
      console.log(
        `  Użytkownicy: ${usersTrend >= 0 ? '📈 +' : '📉 '}${Math.abs(usersTrend).toFixed(1)}%`,
      )
      console.log(
        `  Sesje: ${sessionsTrend >= 0 ? '📈 +' : '📉 '}${Math.abs(sessionsTrend).toFixed(1)}%`,
      )
      console.log(
        `  Page Views: ${pageViewsTrend >= 0 ? '📈 +' : '📉 '}${Math.abs(pageViewsTrend).toFixed(1)}%`,
      )
    }

    console.log(`\n${'═'.repeat(80)}`)
    console.log('\n✅ Analiza zakończona!\n')
  } catch (error) {
    console.error('\n❌ Błąd podczas analizy:')
    if (error instanceof Error) {
      console.error(error.message)
      console.error(error.stack)
    } else {
      console.error(String(error))
    }
    process.exit(1)
  }
}

compareAnalytics().catch(console.error)

