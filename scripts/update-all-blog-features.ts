#!/usr/bin/env tsx
/**
 * Skrypt do masowej aktualizacji wszystkich artykułów:
 * - Dodanie breadcrumbs schema
 * - Dodanie sekcji "Powiązane artykuły"
 * - Weryfikacja dat publikacji
 */

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { glob } from 'glob'

const siteUrl = 'https://www.kredytanaliza.pl'

// Mapowanie slug -> data publikacji z harmonogramu
const publicationDates: Record<string, string> = {
  'jak-obliczyc-zdolnosc-kredytowa': '2025-11-05',
  'wklad-wlasny-kredyt-hipoteczny': '2025-11-12',
  'ranking-bankow-kredytow-hipotecznych-2025': '2025-11-19',
  'rrso-kredyt-hipoteczny': '2025-11-26',
  'oprocentowanie-kredytu-hipotecznego-stale-czy-zmienne': '2025-12-03',
  'kredyt-hipoteczny-bez-wkladu-wlasnego': '2025-12-10',
  'ukryte-koszty-kredytu-hipotecznego': '2025-12-17',
  'kredyt-hipoteczny-dla-mlodych-programy-wsparcia': '2026-01-07',
  'ubezpieczenie-kredytu-hipotecznego': '2026-01-14',
  'jak-zlozyc-wniosek-o-kredyt-hipoteczny': '2026-01-21',
  'prowizja-kredyt-hipoteczny': '2026-01-28',
  'dokumenty-do-kredytu-hipotecznego': '2026-02-04',
  'jak-dlugo-trwa-proces-kredytowy': '2026-02-11',
  'refinansowanie-kredytu-hipotecznego': '2026-02-18',
  'wczesniejsza-splata-kredytu-hipotecznego': '2026-02-25',
  'jak-wybrac-najlepszy-kredyt-hipoteczny': '2026-03-03',
  'jak-negocjowac-warunki-kredytu-hipotecznego': '2026-03-10',
  'kredyt-hipoteczny-dla-singla': '2026-03-17',
  'kredyt-hipoteczny-dla-przedsiebiorcy': '2026-03-24',
  'jak-korzystac-z-kalkulatora-kredytu-hipotecznego': '2026-03-31',
  'stopy-procentowe-kredyt-hipoteczny-2025': '2026-04-07',
  'pulapki-kredytu-hipotecznego': '2026-04-14',
  'co-zrobic-gdy-nie-mozesz-splacac-kredytu': '2026-04-21',
  'kredyt-hipoteczny-na-budowe-domu': '2026-04-28',
  'kredyt-hipoteczny-a-rozwod': '2026-05-05',
  'kredyt-hipoteczny-a-smierc-kredytobiorcy': '2026-05-12',
  'kredyt-hipoteczny-2025-zmiany-przepisy': '2026-05-19',
}

// Mapowanie powiązanych artykułów
const relatedArticlesMap: Record<string, Array<{ slug: string; title: string; description: string }>> = {
  'jak-obliczyc-zdolnosc-kredytowa': [
    { slug: 'wklad-wlasny-kredyt-hipoteczny', title: 'Wkład własny na kredyt hipoteczny 2025', description: 'Dowiedz się, ile wynosi minimalny wkład własny i jak go obliczyć.' },
    { slug: 'ranking-bankow-kredytow-hipotecznych-2025', title: 'Ranking banków kredytów hipotecznych 2025', description: 'Porównaj oferty banków i znajdź najlepszy kredyt dla siebie.' },
    { slug: 'rrso-kredyt-hipoteczny', title: 'RRSO kredytu hipotecznego - co to jest?', description: 'Poznaj RRSO i dowiedz się, jak porównać pełne koszty kredytu.' },
    { slug: 'jak-wybrac-najlepszy-kredyt-hipoteczny', title: 'Jak wybrać najlepszy kredyt hipoteczny?', description: 'Kompleksowy przewodnik po wyborze najlepszego kredytu hipotecznego.' },
  ],
  'wklad-wlasny-kredyt-hipoteczny': [
    { slug: 'jak-obliczyc-zdolnosc-kredytowa', title: 'Jak obliczyć zdolność kredytową?', description: 'Dowiedz się, jak banki obliczają zdolność kredytową i jak samodzielnie oszacować swoją zdolność.' },
    { slug: 'kredyt-hipoteczny-bez-wkladu-wlasnego', title: 'Kredyt hipoteczny bez wkładu własnego', description: 'Dowiedz się, czy można wziąć kredyt bez wkładu własnego.' },
    { slug: 'kredyt-hipoteczny-dla-mlodych-programy-wsparcia', title: 'Kredyt hipoteczny dla młodych - programy wsparcia', description: 'Poznaj programy wsparcia dla młodych kredytobiorców.' },
    { slug: 'ranking-bankow-kredytow-hipotecznych-2025', title: 'Ranking banków kredytów hipotecznych 2025', description: 'Porównaj oferty banków i znajdź najlepszy kredyt dla siebie.' },
  ],
  // ... (dodam więcej mapowań)
}

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

async function updateArticle(slug: string) {
  const filePath = join(process.cwd(), `src/app/blog/${slug}/page.tsx`)
  
  if (!readFileSync(filePath, 'utf-8')) {
    console.log(`⏭️  Pomijam ${slug} - plik nie istnieje`)
    return
  }

  let content = readFileSync(filePath, 'utf-8')
  const title = articleTitles[slug] || slug
  const expectedDate = publicationDates[slug]
  const relatedArticles = relatedArticlesMap[slug] || []

  // 1. Sprawdź i popraw datę publikacji
  if (expectedDate) {
    const datePattern = /datePublished:\s*'([^']+)'/
    const match = content.match(datePattern)
    if (match && match[1] !== expectedDate) {
      content = content.replace(datePattern, `datePublished: '${expectedDate}'`)
      content = content.replace(/dateModified:\s*'[^']+'/, `dateModified: '${expectedDate}'`)
      console.log(`✅ Zaktualizowano datę publikacji dla ${slug}: ${match[1]} → ${expectedDate}`)
    }
  }

  // 2. Sprawdź czy breadcrumbs już istnieją
  if (content.includes('breadcrumbStructuredData')) {
    console.log(`⏭️  ${slug} - breadcrumbs już istnieją`)
  } else {
    // Dodaj breadcrumbs schema
    const breadcrumbSchema = `const breadcrumbStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Strona główna',
      item: siteUrl,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: \`\${siteUrl}/blog\`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: '${title}',
      item: \`\${siteUrl}/blog/${slug}\`,
    },
  ],
}
`

    const faqPattern = /(const faqStructuredData = \{[\s\S]*?\})\s*\n\s*export default/
    if (faqPattern.test(content)) {
      content = content.replace(faqPattern, `$1\n\n${breadcrumbSchema}\n\nexport default`)
      console.log(`✅ Dodano breadcrumbs schema dla ${slug}`)
    }
  }

  // 3. Sprawdź czy relatedArticles już istnieją
  if (content.includes('const relatedArticles =')) {
    console.log(`⏭️  ${slug} - relatedArticles już istnieją`)
  } else if (relatedArticles.length > 0) {
    // Dodaj relatedArticles array
    const relatedArticlesArray = `const relatedArticles = [\n${relatedArticles
      .map((art) => `  {
    slug: '${art.slug}',
    title: '${art.title}',
    description: '${art.description}',
  }`)
      .join(',\n')}\n]`

    const breadcrumbPattern = /(const breadcrumbStructuredData = \{[\s\S]*?\})\s*\n\s*export default/
    if (breadcrumbPattern.test(content)) {
      content = content.replace(breadcrumbPattern, `$1\n\n${relatedArticlesArray}\n\nexport default`)
      console.log(`✅ Dodano relatedArticles dla ${slug}`)
    } else {
      // Jeśli nie ma breadcrumbs, dodaj po faqStructuredData
      const faqPattern2 = /(const faqStructuredData = \{[\s\S]*?\})\s*\n\s*export default/
      if (faqPattern2.test(content)) {
        content = content.replace(faqPattern2, `$1\n\n${relatedArticlesArray}\n\nexport default`)
        console.log(`✅ Dodano relatedArticles dla ${slug} (bez breadcrumbs)`)
      }
    }
  }

  // 4. Dodaj breadcrumbJsonLd do funkcji
  if (!content.includes('breadcrumbJsonLd')) {
    const functionPattern = /(const articleJsonLd = toJsonLd\(articleStructuredData\)\s*const faqJsonLd = toJsonLd\(faqStructuredData\))/s
    if (functionPattern.test(content) && content.includes('breadcrumbStructuredData')) {
      content = content.replace(functionPattern, `$1\n  const breadcrumbJsonLd = toJsonLd(breadcrumbStructuredData)`)
      console.log(`✅ Dodano breadcrumbJsonLd dla ${slug}`)
    }
  }

  // 5. Dodaj script tag dla breadcrumbs
  if (!content.includes('{breadcrumbJsonLd}')) {
    const scriptPattern = /(<script type="application\/ld\+json" suppressHydrationWarning>\s*\{faqJsonLd\}\s*<\/script>)/
    if (scriptPattern.test(content) && content.includes('breadcrumbJsonLd')) {
      content = content.replace(
        scriptPattern,
        `$1\n        <script type="application/ld+json" suppressHydrationWarning>\n          {breadcrumbJsonLd}\n        </script>`,
      )
      console.log(`✅ Dodano script tag dla breadcrumbs dla ${slug}`)
    }
  }

  // 6. Dodaj sekcję "Powiązane artykuły" przed SummarySection
  if (!content.includes('Powiązane artykuły')) {
    const relatedSection = `
        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineDocumentText size={18} />
              Powiązane artykuły
            </SectionBadge>
            <SectionTitle>Powiązane artykuły</SectionTitle>
            <SectionSubtitle>
              Przeczytaj więcej artykułów, które pomogą Ci w procesie kredytowym.
            </SectionSubtitle>
          </SectionHeader>
          <RelatedGrid role="list">
            {relatedArticles.map((article) => (
              <RelatedCard key={article.slug} href={\`/blog/\${article.slug}\`} role="listitem">
                <RelatedTitle>{article.title}</RelatedTitle>
                <RelatedDescription>{article.description}</RelatedDescription>
                <RelatedLink>
                  Czytaj więcej
                  <HiOutlineArrowLongRight size={16} />
                </RelatedLink>
              </RelatedCard>
            ))}
          </RelatedGrid>
        </Section>
`

    const summaryPattern = /(\s+<\/Section>\s+<SummarySection>)/s
    if (summaryPattern.test(content)) {
      content = content.replace(summaryPattern, `${relatedSection}$1`)
      console.log(`✅ Dodano sekcję "Powiązane artykuły" dla ${slug}`)
    } else {
      // Spróbuj znaleźć SummarySection bezpośrednio po </Section>
      const summaryPattern2 = /(\s+<\/Section>\s+<SummarySection>)/m
      if (summaryPattern2.test(content)) {
        content = content.replace(summaryPattern2, `${relatedSection}$1`)
        console.log(`✅ Dodano sekcję "Powiązane artykuły" dla ${slug}`)
      }
    }
  }

  // 7. Dodaj styled components dla RelatedGrid, RelatedCard, etc.
  if (!content.includes('const RelatedGrid')) {
    const styledComponents = `
const RelatedGrid = tw.ul\`mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4\`
const RelatedCard = tw(
  Link,
)\`group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg\`
const RelatedTitle = tw.h3\`mb-2 text-lg font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors\`
const RelatedDescription = tw.p\`mb-4 flex-1 text-sm leading-relaxed text-gray-600\`
const RelatedLink = tw.span\`inline-flex items-center gap-1 text-sm font-medium text-emerald-700 group-hover:text-emerald-800 transition-colors\`
`

    const summarySectionPattern = /(const SummarySection = tw\.section)/s
    if (summarySectionPattern.test(content)) {
      content = content.replace(summarySectionPattern, `${styledComponents}\n\n$1`)
      console.log(`✅ Dodano styled components dla ${slug}`)
    }
  }

  writeFileSync(filePath, content, 'utf-8')
}

async function main() {
  const blogFiles = await glob('src/app/blog/*/page.tsx')
  const slugs = blogFiles.map((file) => file.match(/blog\/([^/]+)\/page\.tsx/)?.[1]).filter(Boolean) as string[]

  console.log(`Znaleziono ${slugs.length} artykułów do aktualizacji\n`)

  for (const slug of slugs) {
    if (slug === 'zagrozenia-kredytowe') {
      console.log(`⏭️  Pomijam ${slug} - istniejący artykuł`)
      continue
    }
    try {
      await updateArticle(slug)
    } catch (error) {
      console.error(`❌ Błąd przy aktualizacji ${slug}:`, error)
    }
  }

  console.log('\n✅ Zakończono aktualizację artykułów')
}

main().catch(console.error)

