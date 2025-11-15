#!/usr/bin/env tsx
/**
 * Skrypt do przeglądu treści wszystkich artykułów blogowych
 * Identyfikuje potencjalne problemy z jakością treści
 */

import { readFileSync } from 'fs'
import { join } from 'path'
import { glob } from 'glob'

interface ContentIssue {
  type: 'warning' | 'error' | 'info'
  message: string
  line?: number
}

async function reviewArticle(slug: string): Promise<ContentIssue[]> {
  const filePath = join(process.cwd(), `src/app/blog/${slug}/page.tsx`)
  const issues: ContentIssue[] = []

  try {
    const content = readFileSync(filePath, 'utf-8')
    const lines = content.split('\n')

    // 1. Sprawdź czy są zbyt krótkie sekcje ArticleText (mniej niż 100 znaków)
    const articleTextMatches = content.matchAll(/<ArticleText>([\s\S]*?)<\/ArticleText>/g)
    for (const match of articleTextMatches) {
      if (!match[1]) continue
      const text = match[1].replace(/<[^>]+>/g, '').trim()
      if (text.length < 100 && text.length > 0) {
        const lineNum = content.substring(0, match.index).split('\n').length
        issues.push({
          type: 'warning',
          message: `Krótka sekcja ArticleText (${text.length} znaków) - rozważ dodanie więcej szczegółów`,
          line: lineNum,
        })
      }
    }

    // 2. Sprawdź czy są powtarzające się frazy w CTA
    const ctaTexts: string[] = []
    const ctaMatches = content.matchAll(/<CtaButton[^>]*>([\s\S]*?)<\/CtaButton>/g)
    for (const match of ctaMatches) {
      if (!match[1]) continue
      const text = match[1].replace(/<[^>]+>/g, '').trim()
      if (text) ctaTexts.push(text)
    }

    const ctaCounts: Record<string, number> = {}
    ctaTexts.forEach((text) => {
      ctaCounts[text] = (ctaCounts[text] || 0) + 1
    })

    Object.entries(ctaCounts).forEach(([text, count]) => {
      if (count > 1) {
        issues.push({
          type: 'info',
          message: `Powtarzający się tekst CTA: "${text}" (${count}x) - rozważ urozmaicenie`,
        })
      }
    })

    // 3. Sprawdź czy są zbyt ogólne opisy w SectionSubtitle
    const genericPhrases = [
      /Oto główne/,
      /Oto najważniejsze/,
      /Oto jak/,
      /Poznaj wszystkie/,
      /Dowiedz się/,
    ]

    const subtitleMatches = content.matchAll(/<SectionSubtitle>([\s\S]*?)<\/SectionSubtitle>/g)
    for (const match of subtitleMatches) {
      if (!match[1]) continue
      const text = match[1].trim()
      if (genericPhrases.some((phrase) => phrase.test(text)) && text.length < 80) {
        const lineNum = content.substring(0, match.index).split('\n').length
        issues.push({
          type: 'info',
          message: `Ogólny SectionSubtitle - rozważ bardziej konkretny opis`,
          line: lineNum,
        })
      }
    }

    // 4. Sprawdź czy są problemy z formatowaniem
    if (content.includes('</Section>\n\n        </Section>')) {
      issues.push({
        type: 'error',
        message: 'Podwójny tag </Section> - błąd formatowania',
      })
    }

    // 5. Sprawdź czy są puste sekcje
    if (content.includes('<Section>\n        </Section>')) {
      issues.push({
        type: 'error',
        message: 'Pusta sekcja Section',
      })
    }

    // 6. Sprawdź czy SummaryText nie jest zbyt krótki
    const summaryMatches = content.matchAll(/<SummaryText>([\s\S]*?)<\/SummaryText>/g)
    for (const match of summaryMatches) {
      if (!match[1]) continue
      const text = match[1].replace(/<[^>]+>/g, '').trim()
      if (text.length < 150) {
        const lineNum = content.substring(0, match.index).split('\n').length
        issues.push({
          type: 'warning',
          message: `Krótki SummaryText (${text.length} znaków) - rozważ dodanie więcej szczegółów`,
          line: lineNum,
        })
      }
    }

    // 7. Sprawdź czy nie ma zbyt wielu powtórzeń słów kluczowych
    const keywordDensity: Record<string, number> = {}
    const words = content.toLowerCase().match(/\b\w{4,}\b/g) || []
    words.forEach((word) => {
      if (word.length > 4) {
        keywordDensity[word] = (keywordDensity[word] || 0) + 1
      }
    })

    const highFrequencyWords = Object.entries(keywordDensity)
      .filter(([_, count]) => count > 50)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)

    if (highFrequencyWords.length > 0) {
      issues.push({
        type: 'info',
        message: `Wysoka częstotliwość słów: ${highFrequencyWords.map(([word]) => word).join(', ')} - sprawdź czy nie ma zbyt wielu powtórzeń`,
      })
    }

    return issues
  } catch (error) {
    return [
      {
        type: 'error',
        message: `Błąd przy przeglądzie: ${error}`,
      },
    ]
  }
}

async function main() {
  const blogFiles = await glob('src/app/blog/*/page.tsx')
  const slugs = blogFiles
    .map((file) => file.match(/blog\/([^/]+)\/page\.tsx/)?.[1])
    .filter(Boolean)
    .filter((slug) => slug !== 'zagrozenia-kredytowe' && slug !== 'page') as string[]

  console.log(`Przeglądanie treści ${slugs.length} artykułów...\n`)

  let totalIssues = 0
  let articlesWithIssues = 0

  for (const slug of slugs) {
    const issues = await reviewArticle(slug)
    if (issues.length > 0) {
      articlesWithIssues++
      totalIssues += issues.length

      const errors = issues.filter((i) => i.type === 'error')
      const warnings = issues.filter((i) => i.type === 'warning')
      const infos = issues.filter((i) => i.type === 'info')

      if (errors.length > 0 || warnings.length > 0 || infos.length > 0) {
        console.log(`\n📄 ${slug}:`)
        if (errors.length > 0) {
          console.log(`  ❌ Błędy (${errors.length}):`)
          errors.forEach((issue) => {
            console.log(`     - ${issue.message}${issue.line ? ` (linia ${issue.line})` : ''}`)
          })
        }
        if (warnings.length > 0) {
          console.log(`  ⚠️  Ostrzeżenia (${warnings.length}):`)
          warnings.forEach((issue) => {
            console.log(`     - ${issue.message}${issue.line ? ` (linia ${issue.line})` : ''}`)
          })
        }
        if (infos.length > 0) {
          console.log(`  ℹ️  Informacje (${infos.length}):`)
          infos.slice(0, 3).forEach((issue) => {
            // Ogranicz do 3 pierwszych, żeby nie zaśmiecać outputu
            console.log(`     - ${issue.message}${issue.line ? ` (linia ${issue.line})` : ''}`)
          })
          if (infos.length > 3) {
            console.log(`     ... i ${infos.length - 3} więcej`)
          }
        }
      }
    }
  }

  console.log(`\n📊 Podsumowanie przeglądu:`)
  console.log(`📝 Artykuły z problemami: ${articlesWithIssues}/${slugs.length}`)
  console.log(`🔍 Znalezionych problemów: ${totalIssues}`)
  console.log(`✅ Artykuły bez problemów: ${slugs.length - articlesWithIssues}`)
}

main().catch(console.error)

