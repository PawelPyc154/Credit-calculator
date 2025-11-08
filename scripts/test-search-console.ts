/**
 * Skrypt testowy do sprawdzenia dostępu do danych Search Console przez Analytics API
 *
 * Uruchom: npx tsx scripts/test-search-console.ts
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

async function testSearchConsole() {
  console.log('🔍 Testowanie dostępu do danych Search Console...\n')

  try {
    // Dynamiczny import aby uniknąć problemów z Next.js
    const { analyzeOrganicTraffic, analyzeTrafficSources, analyzeSearchQueries, fullSEOAnalysis } =
      await import('../src/utils/search-console-analyzer')

    console.log('📊 Test 1: Analiza ruchu organicznego...\n')
    console.log('─'.repeat(80))
    const organic = await analyzeOrganicTraffic(30)

    if (organic.error) {
      console.log('❌ Błąd:', organic.error)
      if (typeof organic.summary === 'string') {
        console.log('   Summary:', organic.summary)
      }
    } else if (
      organic.summary &&
      typeof organic.summary === 'object' &&
      'period' in organic.summary
    ) {
      console.log('✅ Dane organiczne pobrane pomyślnie!')
      console.log(`   Okres: ${organic.summary.period}`)
      console.log(`   Sesje: ${organic.summary.sessions}`)
      console.log(`   Użytkownicy: ${organic.summary.users}`)
      console.log(`   Page Views: ${organic.summary.pageViews}`)
      console.log(`   Top strony: ${organic.summary.topPagesCount}`)
      console.log(`   Top zapytania: ${organic.summary.topQueriesCount}`)
      console.log(
        `   Search Console połączone: ${organic.summary.searchConsoleConnected ? '✅ TAK' : '❌ NIE'}`,
      )

      if (organic.insights && organic.insights.length > 0) {
        console.log('\n💡 Insights:')
        organic.insights.forEach((insight: string) => console.log(`   ${insight}`))
      }
    }

    console.log(`\n${'─'.repeat(80)}`)
    console.log('📊 Test 2: Analiza źródeł ruchu...\n')
    const sources = await analyzeTrafficSources(30)

    if (sources.error) {
      console.log('❌ Błąd:', sources.error)
    } else if (
      sources.summary &&
      typeof sources.summary === 'object' &&
      'period' in sources.summary
    ) {
      console.log('✅ Źródła ruchu pobrane pomyślnie!')
      console.log(`   Okres: ${sources.summary.period}`)
      console.log(`   Łączna liczba źródeł: ${sources.summary.totalSources}`)
      console.log(
        `   Ruch organiczny: ${sources.summary.organicSessions} sesji (${sources.summary.organicPercentage})`,
      )
      console.log(`   Ruch direct: ${sources.summary.directSessions} sesji`)
      if (sources.summary.topSource) {
        console.log(
          `   Top źródło: ${sources.summary.topSource.source}/${sources.summary.topSource.medium} (${sources.summary.topSource.sessions} sesji)`,
        )
      }

      if (sources.insights && sources.insights.length > 0) {
        console.log('\n💡 Insights:')
        sources.insights.forEach((insight: string) => console.log(`   ${insight}`))
      }
    }

    console.log(`\n${'─'.repeat(80)}`)
    console.log('📊 Test 3: Analiza zapytań wyszukiwania...\n')
    const queries = await analyzeSearchQueries(30)

    if (queries.error) {
      console.log('❌ Błąd:', queries.error)
      if (typeof queries.summary === 'string') {
        console.log('   Summary:', queries.summary)
      }
      if ('recommendation' in queries && queries.recommendation) {
        console.log('   Rekomendacja:', queries.recommendation)
      }
    } else if (
      queries.summary &&
      typeof queries.summary === 'object' &&
      'period' in queries.summary
    ) {
      console.log('✅ Zapytania wyszukiwania pobrane pomyślnie!')
      console.log(`   Okres: ${queries.summary.period}`)
      console.log(`   Łączna liczba zapytań: ${queries.summary.totalQueries}`)
      console.log(`   Łączne sesje: ${queries.summary.totalSessions}`)
      console.log(`   Średnia sesji na zapytanie: ${queries.summary.avgSessionsPerQuery}`)

      if (queries.summary.topQuery) {
        console.log(`\n   Top zapytanie: "${queries.summary.topQuery.query}"`)
        console.log(`   - Sesje: ${queries.summary.topQuery.sessions}`)
        console.log(`   - Page Views: ${queries.summary.topQuery.pageViews}`)
      }

      if (queries.insights && queries.insights.length > 0) {
        console.log('\n💡 Insights:')
        queries.insights.forEach((insight: string) => console.log(`   ${insight}`))
      }

      // Pokaż top 5 zapytań
      if (queries.data?.queries && queries.data.queries.length > 0) {
        console.log('\n📋 Top 5 zapytań:')
        queries.data.queries.slice(0, 5).forEach((q, i) => {
          console.log(`   ${i + 1}. "${q.query}" - ${q.sessions} sesji, ${q.pageViews} page views`)
        })
      }
    }

    console.log(`\n${'═'.repeat(80)}`)
    console.log('📊 Test 4: Kompleksowa analiza SEO...\n')
    const fullAnalysis = await fullSEOAnalysis(30)

    console.log('✅ Kompleksowa analiza zakończona!\n')

    if (fullAnalysis.overallRecommendations && fullAnalysis.overallRecommendations.length > 0) {
      console.log('🎯 Ogólne rekomendacje:')
      fullAnalysis.overallRecommendations.forEach((rec) => console.log(`   ${rec}`))
    }

    console.log(`\n${'═'.repeat(80)}`)
    console.log('✅ Wszystkie testy zakończone!')
    console.log('\n💡 Teraz możesz poprosić AI o analizę SEO w Cursor -')
    console.log('   AI automatycznie użyje tych funkcji do analizy!')
  } catch (error) {
    if (error instanceof Error) {
      console.error('\n❌ Błąd podczas testowania:')
      console.error(error.message)

      if (error.message.includes('credentials')) {
        console.error('\n💡 Sprawdź czy:')
        console.error('   1. GOOGLE_APPLICATION_CREDENTIALS_JSON jest poprawnie ustawione')
        console.error('   2. Service Account ma dostęp do Google Analytics')
        console.error('   3. GA4_PROPERTY_ID jest poprawne')
      }

      if (error.message.includes('searchQuery')) {
        console.error('\n💡 Uwaga:')
        console.error(
          '   Dimension searchQuery może nie być dostępny jeśli Search Console nie jest połączone z Analytics',
        )
        console.error(
          '   Połącz Search Console: Administracja → Połączenia usług → Połączenia z Search Console',
        )
      }
    } else {
      console.error('\n❌ Nieznany błąd:', error)
    }
    process.exit(1)
  }
}

testSearchConsole().catch(console.error)
