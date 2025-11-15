#!/usr/bin/env tsx
/**
 * Skrypt do sprawdzania spójności dat w artykułach
 * Sprawdza czy artykuły z rokiem 2025 w tytule nie są publikowane w 2026
 */

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { glob } from 'glob'
import { blogPostDates } from '../src/utils/blog-posts'

interface ArticleIssue {
  slug: string
  publishYear: string
  titleYear: string | null
  issue: string
}

async function checkArticle(slug: string): Promise<ArticleIssue | null> {
  const filePath = join(process.cwd(), `src/app/blog/${slug}/page.tsx`)

  try {
    const content = readFileSync(filePath, 'utf-8')
    const publishDate = blogPostDates[slug]

    if (!publishDate) return null

    const publishYear = publishDate.substring(0, 4)

    // Znajdź rok w tytule
    const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/)
    const title = titleMatch ? titleMatch[1] : ''

    // Znajdź rok w tytule (2025, 2026, itp.)
    const yearMatch = title ? title.match(/\b(20\d{2})\b/) : null
    const titleYear = yearMatch ? yearMatch[1] : null

    // Sprawdź czy jest problem
    if (titleYear && parseInt(publishYear) > parseInt(titleYear)) {
      return {
        slug,
        publishYear,
        titleYear,
        issue: `Artykuł z rokiem ${titleYear} w tytule jest publikowany w ${publishYear} - może być przestarzały`,
      }
    }

    // Sprawdź czy w treści są odniesienia do konkretnego roku
    const yearInContent = content.match(/\b(2025|2026)\b/g)
    if (yearInContent && parseInt(publishYear) > 2025) {
      const uniqueYears = [...new Set(yearInContent)]
      const has2025 = uniqueYears.includes('2025')
      if (has2025 && parseInt(publishYear) >= 2026) {
        return {
          slug,
          publishYear,
          titleYear: uniqueYears.join(', '),
          issue: `Artykuł publikowany w ${publishYear} zawiera odniesienia do 2025 - może być przestarzały`,
        }
      }
    }

    return null
  } catch (error) {
    console.error(`❌ Błąd przy sprawdzaniu ${slug}:`, error)
    return null
  }
}

async function main() {
  const blogFiles = await glob('src/app/blog/*/page.tsx')
  const slugs = blogFiles
    .map((file) => file.match(/blog\/([^/]+)\/page\.tsx/)?.[1])
    .filter(Boolean)
    .filter((slug) => slug !== 'zagrozenia-kredytowe' && slug !== 'page') as string[]

  console.log(`Sprawdzanie spójności dat w ${slugs.length} artykułach...\n`)

  const issues: ArticleIssue[] = []

  for (const slug of slugs) {
    const issue = await checkArticle(slug)
    if (issue) {
      issues.push(issue)
    }
  }

  if (issues.length > 0) {
    console.log(`⚠️  Znaleziono ${issues.length} potencjalnych problemów:\n`)
    issues.forEach((issue) => {
      console.log(`📄 ${issue.slug}:`)
      console.log(`   Data publikacji: ${issue.publishYear}`)
      console.log(`   Rok w tytule/treści: ${issue.titleYear}`)
      console.log(`   Problem: ${issue.issue}\n`)
    })

    console.log(`\n💡 Rekomendacje:`)
    console.log(`1. Zaktualizuj rok w tytule dla artykułów publikowanych w 2026`)
    console.log(`2. Zmień odniesienia do "2025" na "2026" w treści artykułów publikowanych w 2026`)
    console.log(
      `3. Rozważ użycie bardziej ogólnych sformułowań (np. "aktualne" zamiast konkretnego roku)`,
    )
  } else {
    console.log(`✅ Wszystkie artykuły mają spójne daty!`)
  }
}

main().catch(console.error)
