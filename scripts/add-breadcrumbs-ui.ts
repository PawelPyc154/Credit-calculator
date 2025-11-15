#!/usr/bin/env tsx
/**
 * Skrypt do dodawania widocznych breadcrumbs UI do wszystkich artykułów blogowych
 */

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { glob } from 'glob'

// Mapowanie slug -> tytuł artykułu
const articleTitles: Record<string, string> = {
  'jak-obliczyc-zdolnosc-kredytowa': 'Jak obliczyć zdolność kredytową?',
  'wklad-wlasny-kredyt-hipoteczny': 'Wkład własny na kredyt hipoteczny 2025',
  'ranking-bankow-kredytow-hipotecznych-2025': 'Ranking banków kredytów hipotecznych 2025',
  'rrso-kredyt-hipoteczny': 'RRSO kredytu hipotecznego - co to jest?',
  'oprocentowanie-kredytu-hipotecznego-stale-czy-zmienne': 'Oprocentowanie kredytu - stałe czy zmienne?',
  'kredyt-hipoteczny-bez-wkladu-wlasnego': 'Kredyt hipoteczny bez wkładu własnego',
  'kredyt-hipoteczny-dla-mlodych-programy-wsparcia': 'Kredyt hipoteczny dla młodych - programy wsparcia',
  'ukryte-koszty-kredytu-hipotecznego': 'Ukryte koszty kredytu hipotecznego',
  'ubezpieczenie-kredytu-hipotecznego': 'Ubezpieczenie kredytu hipotecznego',
  'jak-zlozyc-wniosek-o-kredyt-hipoteczny': 'Jak złożyć wniosek o kredyt hipoteczny?',
  'prowizja-kredyt-hipoteczny': 'Prowizja za udzielenie kredytu hipotecznego',
  'dokumenty-do-kredytu-hipotecznego': 'Dokumenty do kredytu hipotecznego',
  'jak-dlugo-trwa-proces-kredytowy': 'Jak długo trwa proces kredytowy?',
  'refinansowanie-kredytu-hipotecznego': 'Refinansowanie kredytu hipotecznego',
  'wczesniejsza-splata-kredytu-hipotecznego': 'Wcześniejsza spłata kredytu hipotecznego',
  'jak-wybrac-najlepszy-kredyt-hipoteczny': 'Jak wybrać najlepszy kredyt hipoteczny?',
  'jak-negocjowac-warunki-kredytu-hipotecznego': 'Jak negocjować warunki kredytu hipotecznego?',
  'kredyt-hipoteczny-dla-singla': 'Kredyt hipoteczny dla singla',
  'kredyt-hipoteczny-dla-przedsiebiorcy': 'Kredyt hipoteczny dla przedsiębiorcy',
  'jak-korzystac-z-kalkulatora-kredytu-hipotecznego': 'Kalkulator kredytu hipotecznego - jak z niego korzystać?',
  'stopy-procentowe-kredyt-hipoteczny-2025': 'Stopy procentowe a kredyt hipoteczny 2025',
  'pulapki-kredytu-hipotecznego': 'Pułapki kredytu hipotecznego',
  'co-zrobic-gdy-nie-mozesz-splacac-kredytu': 'Co zrobić, gdy nie możesz spłacać kredytu?',
  'kredyt-hipoteczny-na-budowe-domu': 'Kredyt hipoteczny na budowę domu',
  'kredyt-hipoteczny-a-rozwod': 'Kredyt hipoteczny a rozwód',
  'kredyt-hipoteczny-a-smierc-kredytobiorcy': 'Kredyt hipoteczny a śmierć kredytobiorcy',
  'kredyt-hipoteczny-2025-zmiany-przepisy': 'Kredyt hipoteczny 2025 - zmiany w przepisach',
}

async function addBreadcrumbsUI(slug: string) {
  const filePath = join(process.cwd(), `src/app/blog/${slug}/page.tsx`)

  try {
    let content = readFileSync(filePath, 'utf-8')
    const title = articleTitles[slug] || slug

    // Sprawdź czy breadcrumbs UI już istnieją
    if (content.includes('<BreadcrumbNav')) {
      console.log(`⏭️  ${slug}: Breadcrumbs UI już istnieją`)
      return false
    }

    let changes: string[] = []

    // 1. Dodaj breadcrumbs UI przed BackLink lub po script tags
    const breadcrumbsUI = `
        <BreadcrumbNav aria-label="Breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Strona główna</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbCurrent>${title}</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>
`

    // Znajdź miejsce po script tags dla breadcrumbs
    const scriptPattern = /(<script type="application\/ld\+json" suppressHydrationWarning>\s*\{breadcrumbJsonLd\}\s*<\/script>\s*\n)/
    if (scriptPattern.test(content)) {
      content = content.replace(scriptPattern, `$1${breadcrumbsUI}\n`)
      changes.push('Dodano breadcrumbs UI')
    } else {
      // Jeśli nie ma breadcrumbJsonLd, dodaj po faqJsonLd
      const faqScriptPattern = /(<script type="application\/ld\+json" suppressHydrationWarning>\s*\{faqJsonLd\}\s*<\/script>\s*\n)/
      if (faqScriptPattern.test(content)) {
        content = content.replace(faqScriptPattern, `$1${breadcrumbsUI}\n`)
        changes.push('Dodano breadcrumbs UI')
      }
    }

    // 2. Dodaj styled components dla breadcrumbs (jeśli nie istnieją)
    if (!content.includes('const BreadcrumbNav')) {
      const breadcrumbStyles = `
const BreadcrumbNav = tw.nav\`mb-8\`
const BreadcrumbList = tw.ol\`flex items-center gap-2 text-sm text-gray-600\`
const BreadcrumbItem = tw.li\`flex items-center\`
const BreadcrumbLink = tw(Link)\`text-emerald-700 hover:text-emerald-800 hover:underline transition-colors\`
const BreadcrumbSeparator = tw.span\`text-gray-400 mx-1\`
const BreadcrumbCurrent = tw.span\`text-gray-900 font-medium\`
`

      // Dodaj przed PageWrapper lub ContentContainer
      const pageWrapperPattern = /(const PageWrapper = tw\.main)/
      if (pageWrapperPattern.test(content)) {
        content = content.replace(pageWrapperPattern, `${breadcrumbStyles}\n\n$1`)
        changes.push('Dodano styled components dla breadcrumbs')
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
    .filter((slug) => slug !== 'zagrozenia-kredytowe') as string[]

  console.log(`Znaleziono ${slugs.length} artykułów do aktualizacji\n`)

  let updated = 0
  let skipped = 0

  for (const slug of slugs) {
    const wasUpdated = await addBreadcrumbsUI(slug)
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

