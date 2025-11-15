#!/usr/bin/env tsx
/**
 * Skrypt do dodawania breadcrumbs schema i sekcji "Powiązane artykuły" do artykułów
 *
 * Użycie:
 *   tsx scripts/add-breadcrumbs-related.ts <slug> <title>
 *
 * Przykład:
 *   tsx scripts/add-breadcrumbs-related.ts "wklad-wlasny-kredyt-hipoteczny" "Wkład własny na kredyt hipoteczny 2025"
 */

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const args = process.argv.slice(2)

if (args.length < 2) {
  console.error('Błąd: Za mało argumentów')
  console.log('Użycie: tsx scripts/add-breadcrumbs-related.ts <slug> <title>')
  console.log('Przykład: tsx scripts/add-breadcrumbs-related.ts "wklad-wlasny-kredyt-hipoteczny" "Wkład własny"')
  process.exit(1)
}

const [slug, title] = args

if (!slug || !title) {
  console.error('Błąd: Wszystkie argumenty są wymagane')
  process.exit(1)
}

// Mapowanie powiązanych artykułów (slug -> [slugs powiązanych])
const relatedArticlesMap: Record<string, string[]> = {
  'jak-obliczyc-zdolnosc-kredytowa': [
    'wklad-wlasny-kredyt-hipoteczny',
    'ranking-bankow-kredytow-hipotecznych-2025',
    'rrso-kredyt-hipoteczny',
    'jak-wybrac-najlepszy-kredyt-hipoteczny',
  ],
  'wklad-wlasny-kredyt-hipoteczny': [
    'jak-obliczyc-zdolnosc-kredytowa',
    'kredyt-hipoteczny-bez-wkladu-wlasnego',
    'kredyt-hipoteczny-dla-mlodych-programy-wsparcia',
    'ranking-bankow-kredytow-hipotecznych-2025',
  ],
  'ranking-bankow-kredytow-hipotecznych-2025': [
    'rrso-kredyt-hipoteczny',
    'jak-wybrac-najlepszy-kredyt-hipoteczny',
    'jak-obliczyc-zdolnosc-kredytowa',
    'oprocentowanie-kredytu-hipotecznego-stale-czy-zmienne',
  ],
  'rrso-kredyt-hipoteczny': [
    'oprocentowanie-kredytu-hipotecznego-stale-czy-zmienne',
    'ukryte-koszty-kredytu-hipotecznego',
    'ranking-bankow-kredytow-hipotecznych-2025',
    'jak-wybrac-najlepszy-kredyt-hipoteczny',
  ],
  'oprocentowanie-kredytu-hipotecznego-stale-czy-zmienne': [
    'rrso-kredyt-hipoteczny',
    'stopy-procentowe-kredyt-hipoteczny-2025',
    'jak-wybrac-najlepszy-kredyt-hipoteczny',
    'pulapki-kredytu-hipotecznego',
  ],
  'kredyt-hipoteczny-bez-wkladu-wlasnego': [
    'wklad-wlasny-kredyt-hipoteczny',
    'kredyt-hipoteczny-dla-mlodych-programy-wsparcia',
    'jak-obliczyc-zdolnosc-kredytowa',
    'jak-wybrac-najlepszy-kredyt-hipoteczny',
  ],
  'kredyt-hipoteczny-dla-mlodych-programy-wsparcia': [
    'wklad-wlasny-kredyt-hipoteczny',
    'kredyt-hipoteczny-bez-wkladu-wlasnego',
    'jak-obliczyc-zdolnosc-kredytowa',
    'jak-zlozyc-wniosek-o-kredyt-hipoteczny',
  ],
  'ukryte-koszty-kredytu-hipotecznego': [
    'rrso-kredyt-hipoteczny',
    'prowizja-kredyt-hipoteczny',
    'ubezpieczenie-kredytu-hipotecznego',
    'jak-wybrac-najlepszy-kredyt-hipoteczny',
  ],
  'ubezpieczenie-kredytu-hipotecznego': [
    'ukryte-koszty-kredytu-hipotecznego',
    'prowizja-kredyt-hipoteczny',
    'rrso-kredyt-hipoteczny',
    'wklad-wlasny-kredyt-hipoteczny',
  ],
  'jak-zlozyc-wniosek-o-kredyt-hipoteczny': [
    'dokumenty-do-kredytu-hipotecznego',
    'jak-dlugo-trwa-proces-kredytowy',
    'jak-obliczyc-zdolnosc-kredytowa',
    'jak-wybrac-najlepszy-kredyt-hipoteczny',
  ],
  'prowizja-kredyt-hipoteczny': [
    'rrso-kredyt-hipoteczny',
    'ukryte-koszty-kredytu-hipotecznego',
    'jak-negocjowac-warunki-kredytu-hipotecznego',
    'jak-wybrac-najlepszy-kredyt-hipoteczny',
  ],
  'dokumenty-do-kredytu-hipotecznego': [
    'jak-zlozyc-wniosek-o-kredyt-hipoteczny',
    'jak-dlugo-trwa-proces-kredytowy',
    'jak-obliczyc-zdolnosc-kredytowa',
    'kredyt-hipoteczny-dla-przedsiebiorcy',
  ],
  'jak-dlugo-trwa-proces-kredytowy': [
    'jak-zlozyc-wniosek-o-kredyt-hipoteczny',
    'dokumenty-do-kredytu-hipotecznego',
    'jak-obliczyc-zdolnosc-kredytowa',
    'refinansowanie-kredytu-hipotecznego',
  ],
  'refinansowanie-kredytu-hipotecznego': [
    'wczesniejsza-splata-kredytu-hipotecznego',
    'jak-wybrac-najlepszy-kredyt-hipoteczny',
    'rrso-kredyt-hipoteczny',
    'ranking-bankow-kredytow-hipotecznych-2025',
  ],
  'wczesniejsza-splata-kredytu-hipotecznego': [
    'refinansowanie-kredytu-hipotecznego',
    'ukryte-koszty-kredytu-hipotecznego',
    'rrso-kredyt-hipoteczny',
    'jak-wybrac-najlepszy-kredyt-hipoteczny',
  ],
  'jak-wybrac-najlepszy-kredyt-hipoteczny': [
    'jak-obliczyc-zdolnosc-kredytowa',
    'rrso-kredyt-hipoteczny',
    'ranking-bankow-kredytow-hipotecznych-2025',
    'jak-negocjowac-warunki-kredytu-hipotecznego',
  ],
  'jak-negocjowac-warunki-kredytu-hipotecznego': [
    'prowizja-kredyt-hipoteczny',
    'ubezpieczenie-kredytu-hipotecznego',
    'jak-wybrac-najlepszy-kredyt-hipoteczny',
    'ranking-bankow-kredytow-hipotecznych-2025',
  ],
  'kredyt-hipoteczny-dla-singla': [
    'jak-obliczyc-zdolnosc-kredytowa',
    'wklad-wlasny-kredyt-hipoteczny',
    'kredyt-hipoteczny-dla-mlodych-programy-wsparcia',
    'kredyt-hipoteczny-dla-przedsiebiorcy',
  ],
  'kredyt-hipoteczny-dla-przedsiebiorcy': [
    'jak-obliczyc-zdolnosc-kredytowa',
    'dokumenty-do-kredytu-hipotecznego',
    'jak-wybrac-najlepszy-kredyt-hipoteczny',
    'kredyt-hipoteczny-dla-singla',
  ],
  'jak-korzystac-z-kalkulatora-kredytu-hipotecznego': [
    'jak-obliczyc-zdolnosc-kredytowa',
    'rrso-kredyt-hipoteczny',
    'ranking-bankow-kredytow-hipotecznych-2025',
    'jak-wybrac-najlepszy-kredyt-hipoteczny',
  ],
  'stopy-procentowe-kredyt-hipoteczny-2025': [
    'oprocentowanie-kredytu-hipotecznego-stale-czy-zmienne',
    'rrso-kredyt-hipoteczny',
    'pulapki-kredytu-hipotecznego',
    'kredyt-hipoteczny-2025-zmiany-przepisy',
  ],
  'pulapki-kredytu-hipotecznego': [
    'ukryte-koszty-kredytu-hipotecznego',
    'oprocentowanie-kredytu-hipotecznego-stale-czy-zmienne',
    'jak-wybrac-najlepszy-kredyt-hipoteczny',
    'co-zrobic-gdy-nie-mozesz-splacac-kredytu',
  ],
  'co-zrobic-gdy-nie-mozesz-splacac-kredytu': [
    'pulapki-kredytu-hipotecznego',
    'refinansowanie-kredytu-hipotecznego',
    'wczesniejsza-splata-kredytu-hipotecznego',
    'jak-negocjowac-warunki-kredytu-hipotecznego',
  ],
  'kredyt-hipoteczny-na-budowe-domu': [
    'wklad-wlasny-kredyt-hipoteczny',
    'dokumenty-do-kredytu-hipotecznego',
    'jak-dlugo-trwa-proces-kredytowy',
    'jak-obliczyc-zdolnosc-kredytowa',
  ],
  'kredyt-hipoteczny-a-rozwod': [
    'kredyt-hipoteczny-a-smierc-kredytobiorcy',
    'co-zrobic-gdy-nie-mozesz-splacac-kredytu',
    'jak-negocjowac-warunki-kredytu-hipotecznego',
    'refinansowanie-kredytu-hipotecznego',
  ],
  'kredyt-hipoteczny-a-smierc-kredytobiorcy': [
    'ubezpieczenie-kredytu-hipotecznego',
    'kredyt-hipoteczny-a-rozwod',
    'co-zrobic-gdy-nie-mozesz-splacac-kredytu',
    'jak-obliczyc-zdolnosc-kredytowa',
  ],
  'kredyt-hipoteczny-2025-zmiany-przepisy': [
    'stopy-procentowe-kredyt-hipoteczny-2025',
    'jak-wybrac-najlepszy-kredyt-hipoteczny',
    'pulapki-kredytu-hipotecznego',
    'rrso-kredyt-hipoteczny',
  ],
}

// Mapowanie slug -> tytuł dla powiązanych artykułów
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

// Mapowanie slug -> krótki opis dla powiązanych artykułów
const articleDescriptions: Record<string, string> = {
  'jak-obliczyc-zdolnosc-kredytowa': 'Dowiedz się, jak banki obliczają zdolność kredytową i jak samodzielnie oszacować swoją zdolność.',
  'wklad-wlasny-kredyt-hipoteczny': 'Dowiedz się, ile wynosi minimalny wkład własny i jak go obliczyć.',
  'ranking-bankow-kredytow-hipotecznych-2025': 'Porównaj oferty banków i znajdź najlepszy kredyt dla siebie.',
  'rrso-kredyt-hipoteczny': 'Poznaj RRSO i dowiedz się, jak porównać pełne koszty kredytu.',
  'oprocentowanie-kredytu-hipotecznego-stale-czy-zmienne': 'Poznaj różnice między oprocentowaniem stałym a zmiennym.',
  'kredyt-hipoteczny-bez-wkladu-wlasnego': 'Dowiedz się, czy można wziąć kredyt bez wkładu własnego.',
  'kredyt-hipoteczny-dla-mlodych-programy-wsparcia': 'Poznaj programy wsparcia dla młodych kredytobiorców.',
  'ukryte-koszty-kredytu-hipotecznego': 'Dowiedz się, jakie koszty mogą Cię zaskoczyć przy kredycie.',
  'ubezpieczenie-kredytu-hipotecznego': 'Poznaj rodzaje ubezpieczeń i ich wpływ na koszt kredytu.',
  'jak-zlozyc-wniosek-o-kredyt-hipoteczny': 'Krok po kroku przewodnik po składaniu wniosku.',
  'prowizja-kredyt-hipoteczny': 'Dowiedz się, ile wynosi prowizja i jak ją zmniejszyć.',
  'dokumenty-do-kredytu-hipotecznego': 'Kompletna lista dokumentów potrzebnych do kredytu.',
  'jak-dlugo-trwa-proces-kredytowy': 'Poznaj terminy i etapy procesu kredytowego.',
  'refinansowanie-kredytu-hipotecznego': 'Dowiedz się, czy refinansowanie się opłaca.',
  'wczesniejsza-splata-kredytu-hipotecznego': 'Poznaj korzyści i koszty wcześniejszej spłaty.',
  'jak-wybrac-najlepszy-kredyt-hipoteczny': 'Kompleksowy przewodnik po wyborze najlepszego kredytu.',
  'jak-negocjowac-warunki-kredytu-hipotecznego': 'Dowiedz się, jak negocjować warunki kredytu.',
  'kredyt-hipoteczny-dla-singla': 'Poznaj specyfikę kredytu hipotecznego dla singli.',
  'kredyt-hipoteczny-dla-przedsiebiorcy': 'Wymagania i warunki kredytu dla przedsiębiorców.',
  'jak-korzystac-z-kalkulatora-kredytu-hipotecznego': 'Dowiedz się, jak korzystać z kalkulatora kredytu.',
  'stopy-procentowe-kredyt-hipoteczny-2025': 'Poznaj wpływ stóp procentowych na kredyt.',
  'pulapki-kredytu-hipotecznego': 'Na co uważać przy kredycie hipotecznym.',
  'co-zrobic-gdy-nie-mozesz-splacac-kredytu': 'Rozwiązania problemów ze spłatą kredytu.',
  'kredyt-hipoteczny-na-budowe-domu': 'Specyfika kredytu na budowę domu.',
  'kredyt-hipoteczny-a-rozwod': 'Co się dzieje z kredytem przy rozwodzie.',
  'kredyt-hipoteczny-a-smierc-kredytobiorcy': 'Rozwiązanie kredytu po śmierci kredytobiorcy.',
  'kredyt-hipoteczny-2025-zmiany-przepisy': 'Najnowsze zmiany w przepisach dotyczących kredytów.',
}

const siteUrl = 'https://www.kredytanaliza.pl'
const relatedSlugs = relatedArticlesMap[slug] || []
const relatedArticles = relatedSlugs.map((relatedSlug) => ({
  slug: relatedSlug,
  title: articleTitles[relatedSlug] || relatedSlug,
  description: articleDescriptions[relatedSlug] || 'Przeczytaj więcej o kredytach hipotecznych.',
}))

const filePath = join(process.cwd(), `src/app/blog/${slug}/page.tsx`)
let content = readFileSync(filePath, 'utf-8')

// 1. Dodaj breadcrumbs schema
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

// Dodaj breadcrumbs schema po faqStructuredData
const faqPattern = /(const faqStructuredData = \{[\s\S]*?\})\s*\n\s*export default/
if (faqPattern.test(content)) {
  content = content.replace(faqPattern, `$1\n\n${breadcrumbSchema}\n\nexport default`)
} else {
  console.error('❌ Nie znaleziono faqStructuredData')
  process.exit(1)
}

// 2. Dodaj relatedArticles array
const relatedArticlesArray = `const relatedArticles = [\n${relatedArticles
  .map(
    (art) => `  {
    slug: '${art.slug}',
    title: '${art.title}',
    description: '${art.description}',
  }`,
  )
  .join(',\n')}\n]`

// Dodaj relatedArticles po breadcrumbStructuredData
const breadcrumbPattern = /(const breadcrumbStructuredData = \{[\s\S]*?\})\s*\n\s*export default/
if (breadcrumbPattern.test(content)) {
  content = content.replace(breadcrumbPattern, `$1\n\n${relatedArticlesArray}\n\nexport default`)
} else {
  console.error('❌ Nie znaleziono breadcrumbStructuredData')
  process.exit(1)
}

// 3. Dodaj breadcrumbJsonLd do funkcji
const functionPattern = /(export default function \w+\(\) \{[^}]*const articleJsonLd = toJsonLd\(articleStructuredData\)\s*const faqJsonLd = toJsonLd\(faqStructuredData\))/s
if (functionPattern.test(content)) {
  content = content.replace(functionPattern, `$1\n  const breadcrumbJsonLd = toJsonLd(breadcrumbStructuredData)`)
} else {
  console.error('❌ Nie znaleziono funkcji z articleJsonLd i faqJsonLd')
  process.exit(1)
}

// 4. Dodaj script tag dla breadcrumbs
const scriptPattern = /(<script type="application\/ld\+json" suppressHydrationWarning>\s*\{faqJsonLd\}\s*<\/script>)/
if (scriptPattern.test(content)) {
  content = content.replace(
    scriptPattern,
    `$1\n        <script type="application/ld+json" suppressHydrationWarning>\n          {breadcrumbJsonLd}\n        </script>`,
  )
} else {
  console.error('❌ Nie znaleziono script tag dla faqJsonLd')
  process.exit(1)
}

// 5. Dodaj sekcję "Powiązane artykuły" przed SummarySection
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
} else {
  // Spróbuj znaleźć SummarySection bezpośrednio po </Section>
  const summaryPattern2 = /(\s+<\/Section>\s+<SummarySection>)/m
  if (summaryPattern2.test(content)) {
    content = content.replace(summaryPattern2, `${relatedSection}$1`)
  } else {
    console.error('❌ Nie znaleziono SummarySection')
    process.exit(1)
  }
}

// 6. Dodaj styled components dla RelatedGrid, RelatedCard, etc.
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
} else {
  console.error('❌ Nie znaleziono SummarySection styled component')
  process.exit(1)
}

writeFileSync(filePath, content, 'utf-8')
console.log(`✅ Dodano breadcrumbs i sekcję "Powiązane artykuły" do ${slug}`)

