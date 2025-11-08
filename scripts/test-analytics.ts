/**
 * Skrypt testowy do sprawdzenia konfiguracji Google Analytics API
 *
 * Uruchom: npx tsx scripts/test-analytics.ts
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
  console.log('⚠️  Nie znaleziono pliku .env.local ani .env')
  console.log('   Sprawdzam zmienne środowiskowe systemowe...\n')
}

import { createCaller } from '../src/server/api/root'
import { createTRPCContext } from '../src/server/api/trpc'

async function testAnalytics() {
  console.log('🔍 Testowanie konfiguracji Google Analytics API...\n')

  // Sprawdź zmienne środowiskowe
  const hasPropertyId = !!process.env.GA4_PROPERTY_ID
  const hasCredentials = !!process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON

  console.log('📋 Sprawdzanie zmiennych środowiskowych:')
  console.log(`  GA4_PROPERTY_ID: ${hasPropertyId ? '✅ Ustawione' : '❌ Brak'}`)
  console.log(
    `  GOOGLE_APPLICATION_CREDENTIALS_JSON: ${hasCredentials ? '✅ Ustawione' : '❌ Brak'}`,
  )

  if (!hasPropertyId || !hasCredentials) {
    console.log('\n❌ Brakuje zmiennych środowiskowych!')
    console.log('   Sprawdź czy dodałeś je do .env.local lub Vercel')
    process.exit(1)
  }

  // Sprawdź parsowanie credentials
  try {
    const credentialsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON!

    // Usuń ewentualne przełamy linii i spacje
    const cleanedJson = credentialsJson.replace(/\n/g, '').replace(/\s+/g, ' ').trim()

    const credentials = JSON.parse(cleanedJson)
    console.log(`\n📝 Credentials JSON: ✅ Poprawnie sparsowane`)
    console.log(`   Project ID: ${credentials.project_id || 'brak'}`)
    console.log(`   Client Email: ${credentials.client_email || 'brak'}`)

    if (!credentials.private_key || !credentials.client_email) {
      console.log('\n⚠️  Ostrzeżenie: Brakuje kluczowych pól w credentials!')
      console.log('   Sprawdź czy JSON zawiera: private_key, client_email')
    }
  } catch (error) {
    console.log('\n❌ Błąd podczas parsowania JSON credentials!')
    if (error instanceof Error) {
      console.log(`   Błąd: ${error.message}`)
    }
    console.log('\n💡 Wskazówki:')
    console.log('   1. Sprawdź czy JSON jest w jednej linii (bez przełamań)')
    console.log('   2. Sprawdź czy wszystkie cudzysłowy są poprawnie zamknięte')
    console.log('   3. Spróbuj skopiować JSON ponownie z pliku')
    console.log('\n   Przykład poprawnego formatu:')
    console.log('   GOOGLE_APPLICATION_CREDENTIALS_JSON={"type":"service_account",...}')
    process.exit(1)
  }

  // Test endpointu
  console.log('\n🧪 Testowanie endpointu analytics.getOverview...')
  try {
    const context = await createTRPCContext({ headers: new Headers() })
    const caller = createCaller(context)

    const result = await caller.analytics.getOverview({ days: 7 })

    if (result.error) {
      console.log(`\n⚠️  Endpoint zwrócił błąd:`)
      console.log(`   ${result.error}`)
      console.log('\n💡 Możliwe przyczyny:')
      console.log('   - Service Account nie ma dostępu do Google Analytics')
      console.log('   - Property ID jest nieprawidłowy')
      console.log('   - Google Analytics Data API nie jest włączone')
    } else {
      console.log('\n✅ Endpoint działa poprawnie!')
      console.log(`\n📊 Przykładowe dane:`)
      console.log(`   Okres: ${result.period}`)
      console.log(`   Użytkownicy: ${result.users.total}`)
      console.log(`   Sesje: ${result.sessions}`)
      console.log(`   Page Views: ${result.pageViews}`)
      console.log(`   Konwersje: ${result.conversions.total}`)
      console.log(`\n🎉 Wszystko działa! Możesz teraz używać endpointów analytics.`)
    }
  } catch (error) {
    console.log('\n❌ Błąd podczas wywołania endpointu:')
    if (error instanceof Error) {
      console.log(`   ${error.message}`)
      console.log('\n💡 Możliwe przyczyny:')
      console.log('   - Błąd połączenia z Google Analytics API')
      console.log('   - Nieprawidłowe credentials')
      console.log('   - Brak uprawnień Service Account')
    } else {
      console.log(`   ${String(error)}`)
    }
    process.exit(1)
  }
}

testAnalytics().catch(console.error)
