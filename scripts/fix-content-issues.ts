#!/usr/bin/env tsx
/**
 * Skrypt do naprawy problemów z treścią artykułów blogowych
 */

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { glob } from 'glob'

async function fixContentIssues(slug: string) {
  const filePath = join(process.cwd(), `src/app/blog/${slug}/page.tsx`)

  try {
    let content = readFileSync(filePath, 'utf-8')
    let changes: string[] = []

    // 1. Napraw podwójny tag </Section>
    if (content.includes('</Section>\n\n        </Section>')) {
      content = content.replace('</Section>\n\n        </Section>', '</Section>')
      changes.push('Naprawiono podwójny tag </Section>')
    }

    // 2. Urozmaicaj powtarzające się CTA
    const ctaReplacements: Array<{ pattern: RegExp; replacement: string; description: string }> = [
      {
        pattern: /Porównaj RRSO w kalkulatorze/g,
        replacement: 'Sprawdź RRSO różnych ofert',
        description: 'Urozmaicono CTA dla RRSO',
      },
      {
        pattern: /Oblicz pełny koszt w kalkulatorze/g,
        replacement: 'Zobacz pełny koszt kredytu',
        description: 'Urozmaicono CTA dla kosztów',
      },
    ]

    for (const replacement of ctaReplacements) {
      if (replacement.pattern.test(content)) {
        // Zastąp tylko drugie i kolejne wystąpienia
        const matches = Array.from(content.matchAll(replacement.pattern))
        if (matches.length > 1) {
          // Zastąp wszystkie oprócz pierwszego
          let replaced = false
          for (let i = 1; i < matches.length; i++) {
            const match = matches[i]
            const before = content.substring(0, match.index!)
            const after = content.substring(match.index! + match[0].length)
            content = before + replacement.replacement + after
            replaced = true
          }
          if (replaced) {
            changes.push(replacement.description)
          }
        }
      }
    }

    // 3. Popraw ogólne SectionSubtitle - dodaj bardziej konkretne opisy
    const subtitleImprovements: Array<{ pattern: RegExp; replacement: string; description: string }> = [
      {
        pattern: /<SectionSubtitle>\s*Oto jak bank wypłaca środki zgodnie z etapami budowy domu\.\s*<\/SectionSubtitle>/,
        replacement: '<SectionSubtitle>Bank wypłaca środki etapowo: po przygotowaniu działki, stanie surowym, wykończeniu i zakończeniu budowy. Każdy etap wymaga weryfikacji przez rzeczoznawcę.</SectionSubtitle>',
        description: 'Ulepszono SectionSubtitle dla harmonogramu budowy',
      },
      {
        pattern: /<SectionSubtitle>\s*Oto główne wymagania, które musisz spełnić, aby wziąć kredyt hipoteczny na budowę domu\.\s*<\/SectionSubtitle>/,
        replacement: '<SectionSubtitle>Do kredytu na budowę potrzebujesz: działki z pozwoleniem, projektu budowlanego, wkładu własnego minimum 20% i zdolności kredytowej. Bank weryfikuje każdy etap budowy.</SectionSubtitle>',
        description: 'Ulepszono SectionSubtitle dla wymagań budowy',
      },
      {
        pattern: /<SectionSubtitle>\s*Oto główne wymagania, które muszą spełnić przedsiębiorcy, aby wziąć kredyt hipoteczny\.\s*<\/SectionSubtitle>/,
        replacement: '<SectionSubtitle>Przedsiębiorcy muszą udokumentować stabilną działalność (12-24 miesiące), przedstawić szczegółową dokumentację finansową i wykazać zdolność kredytową na podstawie dochodów z działalności.</SectionSubtitle>',
        description: 'Ulepszono SectionSubtitle dla wymagań przedsiębiorców',
      },
      {
        pattern: /<SectionSubtitle>\s*Oto jak długo trwa każdy etap procesu kredytowego\.\s*<\/SectionSubtitle>/,
        replacement: '<SectionSubtitle>Proces kredytowy składa się z kilku etapów: weryfikacja dokumentów (3-5 dni), ocena zdolności (2-3 dni), wycena nieruchomości (7-14 dni), decyzja kredytowa (2-3 dni) i podpisanie umowy (1-2 dni).</SectionSubtitle>',
        description: 'Ulepszono SectionSubtitle dla etapów procesu',
      },
    ]

    for (const improvement of subtitleImprovements) {
      if (improvement.pattern.test(content)) {
        content = content.replace(improvement.pattern, improvement.replacement)
        changes.push(improvement.description)
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

  console.log(`Naprawianie problemów w ${slugs.length} artykułach\n`)

  let updated = 0

  for (const slug of slugs) {
    const wasUpdated = await fixContentIssues(slug)
    if (wasUpdated) {
      updated++
    }
  }

  console.log(`\n✅ Naprawiono problemy w ${updated} artykułach`)
}

main().catch(console.error)

