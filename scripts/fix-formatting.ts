#!/usr/bin/env tsx
/**
 * Skrypt do naprawy formatowania w artykułach blogowych
 */

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { glob } from 'glob'

async function fixFormatting(slug: string) {
  const filePath = join(process.cwd(), `src/app/blog/${slug}/page.tsx`)

  try {
    let content = readFileSync(filePath, 'utf-8')
    let changes: string[] = []

    // Napraw brakującą nową linię po </BreadcrumbNav>
    if (content.includes('</BreadcrumbNav>        <HeroSection>')) {
      content = content.replace('</BreadcrumbNav>        <HeroSection>', '</BreadcrumbNav>\n\n        <HeroSection>')
      changes.push('Naprawiono formatowanie po breadcrumbs')
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
  const blogFiles = await glob('src/app/blog/*/page.tsx')
  const slugs = blogFiles
    .map((file) => file.match(/blog\/([^/]+)\/page\.tsx/)?.[1])
    .filter(Boolean)
    .filter((slug) => slug !== 'zagrozenia-kredytowe' && slug !== 'page') as string[]

  console.log(`Naprawianie formatowania w ${slugs.length} artykułach\n`)

  let updated = 0

  for (const slug of slugs) {
    const wasUpdated = await fixFormatting(slug)
    if (wasUpdated) {
      updated++
    }
  }

  console.log(`\n✅ Naprawiono formatowanie w ${updated} artykułach`)
}

main().catch(console.error)

