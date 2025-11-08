/**
 * Skrypt testowy do sprawdzenia pełnej analizy danych z Google Analytics
 *
 * Uruchom: npx tsx scripts/test-full-analysis.ts
 */

import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { config } from 'dotenv'

// Załaduj zmienne środowiskowe
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

async function testFullAnalysis() {
  console.log('🔍 Testowanie pełnej analizy danych z Google Analytics...\n')

  try {
    // Dynamiczny import aby uniknąć problemów z Next.js
    const { fullAnalysis } = await import('../src/utils/analytics-analyzer')

    console.log('📊 Uruchamianie pełnej analizy...\n')

    const analysis = await fullAnalysis({ days: 30 })

    console.log(`\n${'═'.repeat(80)}`)
    console.log('📈 WYNIKI ANALIZY')
    console.log('═'.repeat(80))
    console.log(analysis)
    console.log('═'.repeat(80))

    console.log('\n✅ Analiza zakończona pomyślnie!')
    console.log('\n💡 Teraz możesz poprosić AI o analizę danych w Cursor -')
    console.log('   AI automatycznie użyje tych funkcji do analizy!')
  } catch (error) {
    if (error instanceof Error) {
      console.error('\n❌ Błąd podczas analizy:')
      console.error(error.message)

      if (error.message.includes('credentials')) {
        console.error('\n💡 Sprawdź czy:')
        console.error('   1. GOOGLE_APPLICATION_CREDENTIALS_JSON jest poprawnie ustawione')
        console.error('   2. Service Account ma dostęp do Google Analytics')
        console.error('   3. GA4_PROPERTY_ID jest poprawne')
      }
    } else {
      console.error('\n❌ Nieznany błąd:', error)
    }
    process.exit(1)
  }
}

testFullAnalysis().catch(console.error)
