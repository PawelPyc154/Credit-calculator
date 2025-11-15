#!/usr/bin/env tsx
/**
 * Skrypt do poprawy treści wszystkich artykułów blogowych:
 * - Usunięcie duplikującego się BackLink (mamy breadcrumbs)
 * - Poprawa powtarzających się CTA
 * - Weryfikacja spójności treści
 */

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { glob } from 'glob'

async function improveArticle(slug: string) {
  const filePath = join(process.cwd(), `src/app/blog/${slug}/page.tsx`)

  try {
    let content = readFileSync(filePath, 'utf-8')
    let changes: string[] = []

    // 1. Usuń BackLink jeśli istnieją breadcrumbs
    if (content.includes('<BreadcrumbNav') && content.includes('<BackLink')) {
      // Usuń BackLink i BackIcon
      const backLinkPattern = /(\s*)<BackLink href="\/blog">\s*<BackIcon[^>]*>[\s\S]*?<\/BackIcon>\s*Wróć do bloga\s*<\/BackLink>\s*\n/
      if (backLinkPattern.test(content)) {
        content = content.replace(backLinkPattern, '')
        changes.push('Usunięto duplikujący się BackLink (mamy breadcrumbs)')
      }
    }

    // 2. Popraw powtarzające się CTA - urozmaicaj teksty
    const ctaImprovements: Array<{ pattern: RegExp; replacement: string; description: string }> = [
      {
        pattern: /Przejdź do kalkulatora/g,
        replacement: 'Sprawdź w kalkulatorze',
        description: 'Urozmaicono tekst CTA',
      },
      {
        pattern: /Użyj naszego kalkulatora/g,
        replacement: 'Sprawdź w naszym kalkulatorze',
        description: 'Urozmaicono tekst CTA',
      },
    ]

    for (const improvement of ctaImprovements) {
      if (improvement.pattern.test(content)) {
        content = content.replace(improvement.pattern, improvement.replacement)
        if (!changes.includes(improvement.description)) {
          changes.push(improvement.description)
        }
      }
    }

    // 3. Sprawdź czy są zbyt krótkie sekcje lub brakujące szczegóły
    // (to wymaga ręcznej weryfikacji, ale możemy dodać podstawowe sprawdzenia)

    // 4. Usuń nieużywane styled components BackLink i BackIcon jeśli nie są używane
    if (!content.includes('<BackLink') && content.includes('const BackLink')) {
      const backLinkStylesPattern = /const BackLink = tw\([\s\S]*?\)`[^`]*`\s*const BackIcon = tw\.span`[^`]*`\s*\n/
      if (backLinkStylesPattern.test(content)) {
        content = content.replace(backLinkStylesPattern, '')
        changes.push('Usunięto nieużywane styled components BackLink i BackIcon')
      } else {
        // Spróbuj osobno
        const backLinkPattern = /const BackLink = tw\([\s\S]*?\)`[^`]*`\s*\n/
        const backIconPattern = /const BackIcon = tw\.span`[^`]*`\s*\n/
        if (backLinkPattern.test(content) && !content.includes('<BackLink')) {
          content = content.replace(backLinkPattern, '')
          changes.push('Usunięto nieużywany styled component BackLink')
        }
        if (backIconPattern.test(content) && !content.includes('<BackIcon')) {
          content = content.replace(backIconPattern, '')
          changes.push('Usunięto nieużywany styled component BackIcon')
        }
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

  console.log(`Znaleziono ${slugs.length} artykułów do poprawy\n`)

  let updated = 0
  let skipped = 0

  for (const slug of slugs) {
    const wasUpdated = await improveArticle(slug)
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
}

main().catch(console.error)

