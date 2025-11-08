/**
 * Skrypt do przygotowania wartości dla Vercel Environment Variables
 * 
 * Uruchom: npx tsx scripts/prepare-vercel-env.ts <ścieżka-do-pliku-json> <property-id>
 * 
 * Przykład:
 * npx tsx scripts/prepare-vercel-env.ts ~/Downloads/credit-calculator-477611-c5d52c4f7442.json 123456789
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'

const jsonFilePath = process.argv[2]
const propertyId = process.argv[3]

if (!jsonFilePath) {
  console.log('❌ Brak ścieżki do pliku JSON')
  console.log('\nUżycie:')
  console.log('  npx tsx scripts/prepare-vercel-env.ts <ścieżka-do-pliku-json> <property-id>')
  console.log('\nPrzykład:')
  console.log('  npx tsx scripts/prepare-vercel-env.ts ~/Downloads/credit-calculator-477611-c5d52c4f7442.json 123456789')
  process.exit(1)
}

if (!propertyId) {
  console.log('⚠️  Brak Property ID - użyję wartości z pliku JSON')
  console.log('   Jeśli masz Property ID z Google Analytics, dodaj go jako drugi argument\n')
}

try {
  const fullPath = resolve(jsonFilePath)
  console.log(`📁 Czytanie pliku: ${fullPath}\n`)
  
  const jsonContent = readFileSync(fullPath, 'utf-8')
  const parsed = JSON.parse(jsonContent)
  
  // Minifikuj JSON (usuń przełamy linii)
  const minified = JSON.stringify(parsed)
  
  console.log('═'.repeat(80))
  console.log('📋 WARTOŚCI DO SKOPIOWANIA DO VERCEL')
  console.log('═'.repeat(80))
  
  console.log('\n🔹 ZMIENNA 1: GA4_PROPERTY_ID')
  console.log('─'.repeat(80))
  console.log('Name: GA4_PROPERTY_ID')
  console.log(`Value: ${propertyId || 'WPISZ_TUTAJ_PROPERTY_ID_Z_GOOGLE_ANALYTICS'}`)
  console.log('─'.repeat(80))
  
  console.log('\n🔹 ZMIENNA 2: GOOGLE_APPLICATION_CREDENTIALS_JSON')
  console.log('─'.repeat(80))
  console.log('Name: GOOGLE_APPLICATION_CREDENTIALS_JSON')
  console.log('Value: (skopiuj JSON poniżej)')
  console.log('─'.repeat(80))
  console.log(minified)
  console.log('─'.repeat(80))
  
  console.log('\n📝 INSTRUKCJA:')
  console.log('   1. W Vercel przejdź do: Settings → Environment Variables')
  console.log('   2. Kliknij "Add New"')
  console.log('   3. Dla pierwszej zmiennej:')
  console.log('      - Name: GA4_PROPERTY_ID')
  console.log(`      - Value: ${propertyId || 'WPISZ_PROPERTY_ID'}`)
  console.log('   4. Kliknij "Save"')
  console.log('   5. Kliknij "Add New" ponownie')
  console.log('   6. Dla drugiej zmiennej:')
  console.log('      - Name: GOOGLE_APPLICATION_CREDENTIALS_JSON')
  console.log('      - Value: (wklej JSON z powyżej - całą linię)')
  console.log('   7. Kliknij "Save"')
  console.log('   8. Redeploy projektu w Vercel')
  
  console.log('\n✅ Gotowe!')
  
} catch (error) {
  if (error instanceof Error) {
    if (error.message.includes('ENOENT')) {
      console.log(`❌ Plik nie istnieje: ${jsonFilePath}`)
    } else if (error.message.includes('JSON')) {
      console.log(`❌ Błąd parsowania JSON: ${error.message}`)
    } else {
      console.log(`❌ Błąd: ${error.message}`)
    }
  }
  process.exit(1)
}

