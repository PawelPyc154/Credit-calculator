/**
 * Diagnostyczny skrypt wypisujący dostępne wymiary i metryki GA4.
 *
 * Uruchom: npx tsx scripts/list-ga-metadata.ts
 */

import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { BetaAnalyticsDataClient } from '@google-analytics/data'
import { config } from 'dotenv'

const envLocalPath = resolve(process.cwd(), '.env.local')
const envPath = resolve(process.cwd(), '.env')

if (existsSync(envLocalPath)) {
  config({ path: envLocalPath })
  console.log('📁 Ładowanie zmiennych z .env.local\n')
} else if (existsSync(envPath)) {
  config({ path: envPath })
  console.log('📁 Ładowanie zmiennych z .env\n')
} else {
  console.warn('⚠️  Nie znaleziono pliku .env.local ani .env – używam zmiennych środowiskowych.\n')
}

const rawPropertyId = process.env.GA4_PROPERTY_ID
const rawCredentials = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON

if (!rawPropertyId || !rawCredentials) {
  console.error(
    '❌ Brakuje wymaganych zmiennych środowiskowych (GA4_PROPERTY_ID / GOOGLE_APPLICATION_CREDENTIALS_JSON)',
  )
  process.exit(1)
}

const propertyId = rawPropertyId as string
const credentialsJson = rawCredentials as string

function parseCredentials(json: string) {
  return JSON.parse(json.trim())
}

async function listMetadata() {
  console.log('🔍 Pobieram metadane GA4...\n')

  try {
    const credentials = parseCredentials(credentialsJson)
    const client = new BetaAnalyticsDataClient({ credentials })
    const metadataName = `properties/${propertyId}/metadata`

    const [metadata] = await client.getMetadata({ name: metadataName })

    const dimensions = metadata.dimensions ?? []
    const metrics = metadata.metrics ?? []

    console.log(`📊 Dostępne wymiary: ${dimensions.length}`)
    console.log(`📐 Dostępne metryki: ${metrics.length}\n`)

    const requiredDimensions = [
      'eventName',
      'eventParameter:purpose',
      'eventParameter:interest_rate_type',
      'eventParameter:bank_name',
      'eventParameter:position',
    ]

    const requiredMetrics = ['eventCount', 'eventValue']

    const dimensionSet = new Set(dimensions.map((d) => d.apiName))
    const metricSet = new Set(metrics.map((m) => m.apiName))

    console.log('✅ Dostępne wymagane wymiary:')
    requiredDimensions
      .filter((dim) => dimensionSet.has(dim))
      .forEach((dim) => console.log(`  • ${dim}`))

    const missingDimensions = requiredDimensions.filter((dim) => !dimensionSet.has(dim))
    if (missingDimensions.length > 0) {
      console.log('\n❌ Brakujące wymagane wymiary:')
      missingDimensions.forEach((dim) => console.log(`  • ${dim}`))
    } else {
      console.log('\n🎉 Wszystkie wymagane wymiary są dostępne!')
    }

    console.log('\n✅ Dostępne wymagane metryki:')
    requiredMetrics
      .filter((metric) => metricSet.has(metric))
      .forEach((metric) => console.log(`  • ${metric}`))

    const missingMetrics = requiredMetrics.filter((metric) => !metricSet.has(metric))
    if (missingMetrics.length > 0) {
      console.log('\n❌ Brakujące wymagane metryki:')
      missingMetrics.forEach((metric) => console.log(`  • ${metric}`))
    } else {
      console.log('\n🎉 Wszystkie wymagane metryki są dostępne!')
    }

    console.log('\nℹ️  Pierwsze 20 wymiarów:')
    dimensions
      .slice(0, 20)
      .forEach((d) => console.log(`  • ${d.apiName} (${d.category ?? 'brak kategorii'})`))

    console.log('\nℹ️  Pierwsze 20 metryk:')
    metrics
      .slice(0, 20)
      .forEach((m) => console.log(`  • ${m.apiName} (${m.category ?? 'brak kategorii'})`))
  } catch (error) {
    console.error('\n❌ Błąd podczas pobierania metadanych GA4')
    if (error instanceof Error) {
      console.error(`   ${error.message}`)
    } else {
      console.error(`   ${String(error)}`)
    }
    process.exit(1)
  }
}

listMetadata().catch((error) => {
  console.error('❌ Nieoczekiwany błąd:', error)
  process.exit(1)
})
