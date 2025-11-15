#!/usr/bin/env tsx
/**
 * Skrypt do usuwania nieużywanych importów z artykułów blogowych
 */

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { glob } from 'glob'

async function removeUnusedImports(slug: string) {
  const filePath = join(process.cwd(), `src/app/blog/${slug}/page.tsx`)

  try {
    let content = readFileSync(filePath, 'utf-8')
    let changes: string[] = []

    // Usuń HiOutlineArrowLeft jeśli nie jest używany
    if (content.includes('HiOutlineArrowLeft') && !content.includes('<BackLink') && !content.includes('<BackIcon')) {
      // Znajdź import i usuń HiOutlineArrowLeft
      const importPattern = /(import \{[^}]*?)HiOutlineArrowLeft,\s*([^}]*\})/s
      if (importPattern.test(content)) {
        content = content.replace(importPattern, '$1$2')
        changes.push('Usunięto nieużywany import HiOutlineArrowLeft')
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
  const blogFiles = await glob('src/app/blog/*/page.tsx')
  const slugs = blogFiles
    .map((file) => file.match(/blog\/([^/]+)\/page\.tsx/)?.[1])
    .filter(Boolean)
    .filter((slug) => slug !== 'zagrozenia-kredytowe' && slug !== 'page') as string[]

  console.log(`Usuwanie nieużywanych importów z ${slugs.length} artykułów\n`)

  let updated = 0

  for (const slug of slugs) {
    const wasUpdated = await removeUnusedImports(slug)
    if (wasUpdated) {
      updated++
    }
  }

  console.log(`\n✅ Usunięto nieużywane importy z ${updated} artykułów`)
}

main().catch(console.error)

