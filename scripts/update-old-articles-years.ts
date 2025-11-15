#!/usr/bin/env tsx
/**
 * Skrypt do automatycznej aktualizacji roku w starych artykułach
 * Uruchamiaj na początku każdego roku, aby zaktualizować rok w tytułach
 * 
 * Użycie: yarn tsx scripts/update-old-articles-years.ts
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { glob } from 'glob'
import { blogPostDates } from '../src/utils/blog-posts'

// Ustaw aktualny rok
const CURRENT_YEAR = new Date().getFullYear()
const PREVIOUS_YEAR = CURRENT_YEAR - 1

// Artykuły, które NIE powinny mieć roku (evergreen content)
const EVERGREEN_ARTICLES = [
  'jak-obliczyc-zdolnosc-kredytowa',
  'rrso-kredyt-hipoteczny',
  'oprocentowanie-kredytu-hipotecznego-stale-czy-zmienne',
  'ukryte-koszty-kredytu-hipotecznego',
  'ubezpieczenie-kredytu-hipotecznego',
  'jak-zlozyc-wniosek-o-kredyt-hipoteczny',
  'prowizja-kredyt-hipoteczny',
  'jak-dlugo-trwa-proces-kredytowy',
  'refinansowanie-kredytu-hipotecznego',
  'wczesniejsza-splata-kredytu-hipotecznego',
  'jak-wybrac-najlepszy-kredyt-hipoteczny',
  'jak-negocjowac-warunki-kredytu-hipotecznego',
  'pulapki-kredytu-hipotecznego',
  'co-zrobic-gdy-nie-mozesz-splacac-kredytu',
  'kredyt-hipoteczny-na-budowe-domu',
  'kredyt-hipoteczny-a-rozwod',
  'kredyt-hipoteczny-a-smierc-kredytobiorcy',
]

// Artykuły, które POWINNY mieć rok (czasowe treści)
const TEMPORAL_ARTICLES = [
  'ranking-bankow-kredytow-hipotecznych-2025',
  'stopy-procentowe-kredyt-hipoteczny-2025',
  'kredyt-hipoteczny-2025-zmiany-przepisy',
  'kredyt-hipoteczny-dla-mlodych-programy-wsparcia',
  'dokumenty-do-kredytu-hipotecznego',
  'kredyt-hipoteczny-dla-singla',
  'kredyt-hipoteczny-dla-przedsiebiorcy',
  'wklad-wlasny-kredyt-hipoteczny',
]

async function updateArticle(slug: string, shouldHaveYear: boolean) {
  const filePath = join(process.cwd(), `src/app/blog/${slug}/page.tsx`)

  try {
    let content = readFileSync(filePath, 'utf-8')
    let changes: string[] = []

    // Jeśli artykuł nie powinien mieć roku, usuń go
    if (!shouldHaveYear) {
      const yearPattern = new RegExp(`\\b${PREVIOUS_YEAR}\\b`, 'g')
      if (yearPattern.test(content)) {
        // Usuń rok z tytułów, ale zachowaj w treści jeśli jest kontekstowy
        content = content.replace(
          new RegExp(`(title|headline|HeroTitle)[^'"]*\\b${PREVIOUS_YEAR}\\b`, 'g'),
          (match) => match.replace(new RegExp(`\\b${PREVIOUS_YEAR}\\b`), '').replace(/\s+/g, ' ').trim(),
        )
        changes.push(`Usunięto rok ${PREVIOUS_YEAR} z tytułów (artykuł evergreen)`)
      }
    } else {
      // Jeśli artykuł powinien mieć rok, zaktualizuj go
      const yearPattern = new RegExp(`\\b${PREVIOUS_YEAR}\\b`, 'g')
      if (yearPattern.test(content)) {
        content = content.replace(yearPattern, String(CURRENT_YEAR))
        changes.push(`Zaktualizowano rok z ${PREVIOUS_YEAR} na ${CURRENT_YEAR}`)
      }
    }

    if (changes.length > 0) {
      writeFileSync(filePath, content, 'utf-8')
      console.log(`✅ ${slug}: ${changes.join(', ')}`)
      return true
    }

    return false
  } catch (error) {
    console.error(`❌ Błąd przy aktualizacji ${slug}:`, error)
    return false
  }
}

async function main() {
  console.log(`🔄 Aktualizacja roku w artykułach blogowych`)
  console.log(`   Aktualny rok: ${CURRENT_YEAR}`)
  console.log(`   Poprzedni rok: ${PREVIOUS_YEAR}\n`)

  const blogFiles = await glob('src/app/blog/*/page.tsx')
  const slugs = blogFiles
    .map((file) => file.match(/blog\/([^/]+)\/page\.tsx/)?.[1])
    .filter(Boolean)
    .filter((slug) => slug !== 'zagrozenia-kredytowe' && slug !== 'page') as string[]

  let updated = 0
  let skipped = 0

  for (const slug of slugs) {
    const shouldHaveYear = TEMPORAL_ARTICLES.includes(slug)
    const wasUpdated = await updateArticle(slug, shouldHaveYear)
    if (wasUpdated) {
      updated++
    } else {
      skipped++
    }
  }

  console.log(`\n📊 Podsumowanie:`)
  console.log(`✅ Zaktualizowano: ${updated}`)
  console.log(`⏭️  Pominięto (brak zmian): ${skipped}`)
  console.log(`📝 Łącznie: ${slugs.length}`)
  console.log(`\n💡 Uwaga: Sprawdź ręcznie artykuły czasowe (rankingi, przepisy) - mogą wymagać aktualizacji treści!`)
}

main().catch(console.error)

