#!/usr/bin/env tsx
/**
 * Skrypt do dodawania robots metadata do wszystkich artykułów blogowych
 * Blokuje indeksację nieopublikowanych artykułów
 */

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { glob } from 'glob'
import { blogPostDates } from '../src/utils/blog-posts'

async function addRobotsMetadata(slug: string) {
  const filePath = join(process.cwd(), `src/app/blog/${slug}/page.tsx`)

  try {
    let content = readFileSync(filePath, 'utf-8')
    let changes: string[] = []

    // Sprawdź czy już ma robots metadata
    if (content.includes('robots:') && content.includes('getPostRobotsMetadata')) {
      console.log(`⏭️  ${slug}: Robots metadata już istnieje`)
      return false
    }

    // 1. Dodaj import getPostRobotsMetadata
    if (!content.includes('getPostRobotsMetadata')) {
      const importPattern = /(import tw from ['"]tw-tailwind['"])/
      if (importPattern.test(content)) {
        content = content.replace(
          importPattern,
          `$1\nimport { getPostRobotsMetadata } from 'utils/blog-posts'`,
        )
        changes.push('Dodano import getPostRobotsMetadata')
      }
    }

    // 2. Dodaj robots metadata do export const metadata
    const metadataPattern = /(export const metadata: Metadata = \{[\s\S]*?)(\s+title:)/m
    if (metadataPattern.test(content) && !content.includes('robots:')) {
      content = content.replace(
        metadataPattern,
        `$1  robots: getPostRobotsMetadata('${slug}'),\n$2`,
      )
      changes.push('Dodano robots metadata')
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

  console.log(`Dodawanie robots metadata do ${slugs.length} artykułów\n`)

  let updated = 0
  let skipped = 0

  for (const slug of slugs) {
    const wasUpdated = await addRobotsMetadata(slug)
    if (wasUpdated) {
      updated++
    } else {
      skipped++
    }
  }

  console.log(`\n📊 Podsumowanie:`)
  console.log(`✅ Zaktualizowano: ${updated}`)
  console.log(`⏭️  Pominięto (już gotowe): ${skipped}`)
  console.log(`📝 Łącznie: ${slugs.length}`)
}

main().catch(console.error)

