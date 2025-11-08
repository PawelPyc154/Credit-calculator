/**
 * Skrypt pomocniczy do przygotowania JSON credentials do .env
 *
 * Uruchom: npx tsx scripts/prepare-json-env.ts <ścieżka-do-pliku-json>
 *
 * Przykład:
 * npx tsx scripts/prepare-json-env.ts ~/Downloads/project-123456.json
 */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const jsonFilePath = process.argv[2]

if (!jsonFilePath) {
  console.log('❌ Brak ścieżki do pliku JSON')
  console.log('\nUżycie:')
  console.log('  npx tsx scripts/prepare-json-env.ts <ścieżka-do-pliku-json>')
  console.log('\nPrzykład:')
  console.log('  npx tsx scripts/prepare-json-env.ts ~/Downloads/project-123456.json')
  process.exit(1)
}

try {
  const fullPath = resolve(jsonFilePath)
  console.log(`📁 Czytanie pliku: ${fullPath}\n`)

  const jsonContent = readFileSync(fullPath, 'utf-8')

  // Sprawdź czy to poprawny JSON
  const parsed = JSON.parse(jsonContent)
  console.log('✅ JSON jest poprawny!')
  console.log(`   Project ID: ${parsed.project_id || 'brak'}`)
  console.log(`   Client Email: ${parsed.client_email || 'brak'}`)

  // Minifikuj JSON (usuń przełamy linii i niepotrzebne spacje)
  const minified = JSON.stringify(parsed)

  console.log('\n📋 Gotowy format do .env:\n')
  console.log('─'.repeat(80))
  console.log(`GOOGLE_APPLICATION_CREDENTIALS_JSON='${minified}'`)
  console.log('─'.repeat(80))

  console.log('\n💡 Instrukcja:')
  console.log('   1. Skopiuj linię powyżej')
  console.log('   2. Otwórz plik .env')
  console.log('   3. Znajdź linię z GOOGLE_APPLICATION_CREDENTIALS_JSON')
  console.log('   4. Zastąp całą linię skopiowaną wartością')
  console.log('   5. Zapisz plik')
  console.log('   6. Uruchom ponownie: npx tsx scripts/test-analytics.ts')
} catch (error) {
  if (error instanceof Error) {
    if (error.message.includes('ENOENT')) {
      console.log(`❌ Plik nie istnieje: ${jsonFilePath}`)
    } else if (error.message.includes('JSON')) {
      console.log(`❌ Błąd parsowania JSON: ${error.message}`)
      console.log('   Sprawdź czy plik jest poprawnym plikiem JSON')
    } else {
      console.log(`❌ Błąd: ${error.message}`)
    }
  }
  process.exit(1)
}
