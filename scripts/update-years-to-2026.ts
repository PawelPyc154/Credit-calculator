#!/usr/bin/env tsx
/**
 * Skrypt do aktualizacji roku z 2025 na 2026 w artykułach publikowanych w 2026
 */

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { glob } from 'glob'
import { blogPostDates } from '../src/utils/blog-posts'

// Artykuły publikowane w 2026, które mają rok 2025 w tytule/treści
const articlesToUpdate = [
  'dokumenty-do-kredytu-hipotecznego',
  'jak-dlugo-trwa-proces-kredytowy',
  'kredyt-hipoteczny-dla-mlodych-programy-wsparcia',
  'kredyt-hipoteczny-dla-singla',
  'kredyt-hipoteczny-dla-przedsiebiorcy',
  'jak-wybrac-najlepszy-kredyt-hipoteczny',
  'kredyt-hipoteczny-na-budowe-domu',
  'stopy-procentowe-kredyt-hipoteczny-2025',
  'kredyt-hipoteczny-2025-zmiany-przepisy',
]

async function updateArticle(slug: string) {
  const filePath = join(process.cwd(), `src/app/blog/${slug}/page.tsx`)

  try {
    let content = readFileSync(filePath, 'utf-8')
    let changes: string[] = []

    // 1. Aktualizuj rok w tytule metadata (tylko jeśli jest 2025)
    if (content.includes('2025') && blogPostDates[slug]?.startsWith('2026')) {
      // Aktualizuj w title
      content = content.replace(/title:\s*['"]([^'"]*)\b2025\b([^'"]*)['"]/g, (match, before, after) => {
        return `title: '${before}2026${after}'`
      })
      
      // Aktualizuj w description
      content = content.replace(/description:\s*['"]([^'"]*)\b2025\b([^'"]*)['"]/g, (match, before, after) => {
        return `description: '${before}2026${after}'`
      })
      
      // Aktualizuj w keywords
      content = content.replace(/\b2025\b/g, '2026')
      
      // Aktualizuj w openGraph
      content = content.replace(/openGraph:\s*\{[\s\S]*?title:\s*['"]([^'"]*)\b2025\b([^'"]*)['"]/g, (match, before, after) => {
        return match.replace(/\b2025\b/g, '2026')
      })
      
      // Aktualizuj w twitter
      content = content.replace(/twitter:\s*\{[\s\S]*?title:\s*['"]([^'"]*)\b2025\b([^'"]*)['"]/g, (match, before, after) => {
        return match.replace(/\b2025\b/g, '2026')
      })
      
      // Aktualizuj w structured data headline
      content = content.replace(/headline:\s*['"]([^'"]*)\b2025\b([^'"]*)['"]/g, (match, before, after) => {
        return `headline: '${before}2026${after}'`
      })
      
      // Aktualizuj w HeroTitle (JSX)
      content = content.replace(/<HeroTitle>([^<]*)\b2025\b([^<]*)<\/HeroTitle>/g, (match, before, after) => {
        return `<HeroTitle>${before}2026${after}</HeroTitle>`
      })
      
      // Aktualizuj w breadcrumbs
      content = content.replace(/name:\s*['"]([^'"]*)\b2025\b([^'"]*)['"]/g, (match, before, after) => {
        return `name: '${before}2026${after}'`
      })
      
      // Aktualizuj w BreadcrumbCurrent
      content = content.replace(/<BreadcrumbCurrent>([^<]*)\b2025\b([^<]*)<\/BreadcrumbCurrent>/g, (match, before, after) => {
        return `<BreadcrumbCurrent>${before}2026${after}</BreadcrumbCurrent>`
      })
      
      changes.push('Zaktualizowano rok z 2025 na 2026')
    }

    // 2. Specjalne przypadki dla konkretnych artykułów
    if (slug === 'stopy-procentowe-kredyt-hipoteczny-2025') {
      // Ten artykuł ma 2025 w slug, więc nie zmieniamy slug, ale aktualizujemy treść
      // Slug pozostaje bez zmian (zmiana slug wymagałaby przekierowania)
    }
    
    if (slug === 'kredyt-hipoteczny-2025-zmiany-przepisy') {
      // Ten artykuł ma 2025 w slug, więc nie zmieniamy slug
      // Ale aktualizujemy treść - zmiany w przepisach z 2025 są nadal aktualne w 2026
      // Możemy zmienić tytuł na "Kredyt hipoteczny 2025-2026 - zmiany w przepisach"
      content = content.replace(/Kredyt hipoteczny 2025 - zmiany w przepisach/g, 'Kredyt hipoteczny 2025-2026 - zmiany w przepisach')
      content = content.replace(/kredyt hipoteczny 2025 zmiany/g, 'kredyt hipoteczny 2025-2026 zmiany')
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
  console.log(`Aktualizowanie roku z 2025 na 2026 w ${articlesToUpdate.length} artykułach...\n`)

  let updated = 0

  for (const slug of articlesToUpdate) {
    const wasUpdated = await updateArticle(slug)
    if (wasUpdated) {
      updated++
    }
  }

  console.log(`\n✅ Zaktualizowano ${updated} artykułów`)
  console.log(`\n⚠️  Uwaga: Artykuły z "2025" w slug pozostają bez zmian slug (wymagałoby przekierowań)`)
  console.log(`   - stopy-procentowe-kredyt-hipoteczny-2025`)
  console.log(`   - kredyt-hipoteczny-2025-zmiany-przepisy`)
}

main().catch(console.error)

