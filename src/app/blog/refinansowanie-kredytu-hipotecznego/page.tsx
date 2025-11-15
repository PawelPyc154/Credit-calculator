import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowLongRight,
  HiOutlineArrowPath,
  HiOutlineCalculator,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlineSparkles,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'
import { getPostRobotsMetadata } from 'utils/blog-posts'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {  robots: getPostRobotsMetadata('refinansowanie-kredytu-hipotecznego'),

  title: 'Refinansowanie kredytu hipotecznego - czy warto?',
  description:
    'Dowiedz się, czy warto refinansować kredyt hipoteczny, jakie są korzyści i koszty refinansowania. Porównaj oferty refinansowania w kalkulatorze.',
  alternates: {
    canonical: `${siteUrl}/blog/refinansowanie-kredytu-hipotecznego`,
  },
  keywords: [
    'refinansowanie kredytu hipotecznego',
    'czy warto refinansować kredyt',
    'refinansowanie kredytu hipotecznego 2025',
    'przeniesienie kredytu do innego banku',
    'refinansowanie kredytu koszty',
    'jak refinansować kredyt hipoteczny',
    'refinansowanie kredytu korzyści',
  ],
  openGraph: {
    title: 'Refinansowanie kredytu hipotecznego - czy warto?',
    description:
      'Kompletny przewodnik po refinansowaniu kredytu hipotecznego: korzyści, koszty i kiedy warto refinansować.',
    url: `${siteUrl}/blog/refinansowanie-kredytu-hipotecznego`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/images/blog/refinansowanie-kredytu-hipotecznego-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Refinansowanie kredytu hipotecznego',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Refinansowanie kredytu hipotecznego - czy warto?',
    description: 'Dowiedz się, czy warto refinansować kredyt hipoteczny i jakie są korzyści.',
    images: [`${siteUrl}/images/blog/refinansowanie-kredytu-hipotecznego-og.jpg`],
  },
}

const benefits = [
  {
    title: 'Niższe oprocentowanie',
    description:
      'Refinansowanie pozwala na uzyskanie niższego oprocentowania, co może znacząco zmniejszyć ratę i całkowity koszt kredytu.',
    savings: 'Możliwe oszczędności: 100-500 zł miesięcznie',
    icon: HiOutlineCurrencyDollar,
  },
  {
    title: 'Niższa rata',
    description:
      'Niższe oprocentowanie lub wydłużenie okresu kredytowania może zmniejszyć miesięczną ratę, poprawiając płynność finansową.',
    savings: 'Możliwe zmniejszenie raty: 10-30%',
    icon: HiOutlineCheckCircle,
  },
  {
    title: 'Lepsze warunki',
    description:
      'Refinansowanie może pozwolić na uzyskanie lepszych warunków: niższe prowizje, brak dodatkowych opłat, lepsze ubezpieczenia.',
    savings: 'Lepsze warunki finansowe',
    icon: HiOutlineCheckCircle,
  },
  {
    title: 'Konsolidacja zobowiązań',
    description:
      'Refinansowanie może pozwolić na konsolidację kilku zobowiązań w jedno, ułatwiając zarządzanie finansami.',
    savings: 'Uproszczenie zarządzania finansami',
    icon: HiOutlineArrowPath,
  },
]

const costs = [
  {
    title: 'Opłata za wcześniejszą spłatę',
    description:
      'Obecny bank może pobrać opłatę za wcześniejszą spłatę kredytu, która może wynosić nawet kilka procent pozostałej kwoty.',
    cost: '0-3% pozostałej kwoty kredytu',
    impact: 'wysoki',
  },
  {
    title: 'Prowizja za nowy kredyt',
    description:
      'Nowy bank może pobrać prowizję za udzielenie kredytu, która może wynosić 0-2% kwoty kredytu.',
    cost: '0-2% kwoty kredytu',
    impact: 'wysoki',
  },
  {
    title: 'Koszty wyceny nieruchomości',
    description:
      'Nowy bank wymaga wyceny nieruchomości, która może kosztować 300-1000 zł.',
    cost: '300-1000 zł',
    impact: 'średni',
  },
  {
    title: 'Koszty notarialne',
    description:
      'Refinansowanie może wymagać zmian w umowie notarialnej, co wiąże się z dodatkowymi kosztami.',
    cost: '500-2000 zł',
    impact: 'średni',
  },
  {
    title: 'Koszty ubezpieczeń',
    description:
      'Nowy bank może wymagać nowych ubezpieczeń lub zmiany istniejących, co może wiązać się z dodatkowymi kosztami.',
    cost: 'Zależne od banku',
    impact: 'niski',
  },
]

const whenToRefinance = [
  {
    situation: 'Spadek stóp procentowych',
    description:
      'Jeśli stopy procentowe znacząco spadły od momentu zaciągnięcia kredytu, refinansowanie może przynieść znaczne oszczędności.',
    icon: HiOutlineCheckCircle,
  },
  {
    situation: 'Lepsza oferta na rynku',
    description:
      'Jeśli na rynku pojawiły się lepsze oferty z niższym oprocentowaniem lub lepszymi warunkami, warto rozważyć refinansowanie.',
    icon: HiOutlineCheckCircle,
  },
  {
    situation: 'Poprawa zdolności kredytowej',
    description:
      'Jeśli Twoja zdolność kredytowa poprawiła się, możesz uzyskać lepsze warunki kredytu poprzez refinansowanie.',
    icon: HiOutlineCheckCircle,
  },
  {
    situation: 'Potrzeba konsolidacji',
    description:
      'Jeśli masz kilka zobowiązań finansowych, refinansowanie może pozwolić na ich konsolidację w jedno.',
    icon: HiOutlineArrowPath,
  },
]

const faqData = [
  {
    question: 'Czy warto refinansować kredyt hipoteczny?',
    answer:
      'Refinansowanie kredytu hipotecznego może być opłacalne, jeśli: stopy procentowe spadły, pojawiły się lepsze oferty na rynku, poprawiła się Twoja zdolność kredytowa lub chcesz skonsolidować zobowiązania. Warto jednak uwzględnić wszystkie koszty refinansowania i porównać je z potencjalnymi oszczędnościami. Użyj kalkulatora kredytu hipotecznego, aby sprawdzić, czy refinansowanie się opłaca.',
  },
  {
    question: 'Ile kosztuje refinansowanie kredytu?',
    answer:
      'Koszty refinansowania mogą obejmować: opłatę za wcześniejszą spłatę (0-3% pozostałej kwoty), prowizję za nowy kredyt (0-2% kwoty kredytu), wycenę nieruchomości (300-1000 zł), koszty notarialne (500-2000 zł) i koszty ubezpieczeń. Łączne koszty mogą wynieść nawet kilka tysięcy złotych, więc warto dokładnie przeanalizować opłacalność.',
  },
  {
    question: 'Kiedy warto refinansować kredyt?',
    answer:
      'Warto rozważyć refinansowanie, gdy: stopy procentowe znacząco spadły, pojawiły się lepsze oferty na rynku, poprawiła się Twoja zdolność kredytowa, chcesz skonsolidować zobowiązania lub potrzebujesz lepszych warunków kredytu. Warto jednak uwzględnić wszystkie koszty i porównać je z potencjalnymi oszczędnościami.',
  },
  {
    question: 'Czy mogę refinansować kredyt w tym samym banku?',
    answer:
      'Tak, możesz refinansować kredyt w tym samym banku, ale zazwyczaj lepsze warunki oferują inne banki. Warto porównać oferty różnych banków i negocjować warunki z obecnym bankiem przed podjęciem decyzji o refinansowaniu.',
  },
  {
    question: 'Jak długo trwa proces refinansowania?',
    answer:
      'Proces refinansowania trwa zazwyczaj 2-6 tygodni, podobnie jak proces składania nowego wniosku kredytowego. Proces obejmuje: złożenie wniosku, weryfikację dokumentów, ocenę zdolności kredytowej, wycenę nieruchomości, decyzję kredytową i podpisanie umowy.',
  },
  {
    question: 'Czy refinansowanie wpływa na historię kredytową?',
    answer:
      'Refinansowanie jest odnotowywane w BIK i może wpłynąć na historię kredytową. Jeśli refinansowanie przebiega sprawnie i spłacasz kredyt regularnie, może to pozytywnie wpłynąć na historię kredytową. Jeśli jednak masz problemy ze spłatą, może to negatywnie wpłynąć na historię.',
  },
  {
    question: 'Czy mogę refinansować kredyt przed końcem okresu kredytowania?',
    answer:
      'Tak, możesz refinansować kredyt w dowolnym momencie, ale warto sprawdzić warunki umowy dotyczące opłat za wcześniejszą spłatę. Niektóre banki pobierają opłaty za wcześniejszą spłatę tylko w określonym okresie (np. pierwsze 3-5 lat), inne przez cały okres kredytowania.',
  },
  {
    question: 'Jak obliczyć opłacalność refinansowania?',
    answer:
      'Aby obliczyć opłacalność refinansowania, porównaj: całkowite koszty refinansowania (opłaty, prowizje, wycena), potencjalne oszczędności (niższe oprocentowanie, niższa rata) i czas zwrotu kosztów. Użyj kalkulatora kredytu hipotecznego, aby porównać obecny kredyt z nową ofertą i zobaczyć, czy refinansowanie się opłaca.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Refinansowanie kredytu hipotecznego - czy warto?',
  description:
    'Kompletny przewodnik po refinansowaniu kredytu hipotecznego: korzyści, koszty i kiedy warto refinansować.',
  author: {
    '@type': 'Organization',
    name: 'Kalkulator Kredytowy',
    url: siteUrl,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Kalkulator Kredytowy',
    url: siteUrl,
  },
  datePublished: '2026-02-18',
  dateModified: '2026-02-18',
  mainEntityOfPage: `${siteUrl}/blog/refinansowanie-kredytu-hipotecznego`,
  articleSection: ['Refinansowanie', 'Kredyt hipoteczny', 'Poradniki finansowe'],
  keywords: metadata.keywords,
}

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

const breadcrumbStructuredData = {
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
      item: `${siteUrl}/blog`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Refinansowanie kredytu hipotecznego',
      item: `${siteUrl}/blog/refinansowanie-kredytu-hipotecznego`,
    },
  ],
}

const relatedArticles = [
  {
    slug: 'wczesniejsza-splata-kredytu-hipotecznego',
    title: 'Wcześniejsza spłata kredytu hipotecznego',
    description: 'Poznaj korzyści i koszty wcześniejszej spłaty.',
  },
  {
    slug: 'jak-wybrac-najlepszy-kredyt-hipoteczny',
    title: 'Jak wybrać najlepszy kredyt hipoteczny?',
    description: 'Kompleksowy przewodnik po wyborze najlepszego kredytu.',
  },
  {
    slug: 'rrso-kredyt-hipoteczny',
    title: 'RRSO kredytu hipotecznego - co to jest?',
    description: 'Poznaj RRSO i dowiedz się, jak porównać pełne koszty kredytu.',
  },
  {
    slug: 'ranking-bankow-kredytow-hipotecznych-2025',
    title: 'Ranking banków kredytów hipotecznych 2025',
    description: 'Porównaj oferty banków i znajdź najlepszy kredyt dla siebie.',
  }
]

export default function RefinancingPage() {
  const articleJsonLd = toJsonLd(articleStructuredData)
  const faqJsonLd = toJsonLd(faqStructuredData)
  const breadcrumbJsonLd = toJsonLd(breadcrumbStructuredData)

  return (
    <PageWrapper>
      <ContentContainer>
        <script type="application/ld+json" suppressHydrationWarning>
          {articleJsonLd}
        </script>
        <script type="application/ld+json" suppressHydrationWarning>
          {faqJsonLd}
        </script>
        <script type="application/ld+json" suppressHydrationWarning>
          {breadcrumbJsonLd}
        </script>


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
              <BreadcrumbCurrent>Refinansowanie kredytu hipotecznego</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>

        <HeroSection>
          <HeroEyebrow>Zarządzanie kredytem</HeroEyebrow>
          <HeroTitle>Refinansowanie kredytu hipotecznego - czy warto?</HeroTitle>
          <HeroLead>
            Refinansowanie kredytu hipotecznego to przeniesienie kredytu do innego banku lub zmiana warunków
            w obecnym banku. Może przynieść znaczne oszczędności, ale wiąże się również z kosztami. W tym
            przewodniku dowiesz się, czy warto refinansować kredyt, jakie są korzyści i koszty oraz kiedy
            refinansowanie się opłaca. Porównaj obecny kredyt z nowymi ofertami w naszym kalkulatorze.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Porównaj oferty refinansowania w kalkulatorze
              <HiOutlineArrowLongRight size={18} />
            </PrimaryCta>
          </HeroActions>
        </HeroSection>

        <IntroCard>
          <IntroIcon aria-hidden="true">
            <HiOutlineSparkles size={28} />
          </IntroIcon>
          <IntroContent>
            <IntroTitle>Najważniejsze informacje</IntroTitle>
            <IntroList>
              <li>
                <strong>Refinansowanie może przynieść oszczędności</strong> - niższe oprocentowanie może
                zmniejszyć ratę o 100-500 zł miesięcznie.
              </li>
              <li>
                <strong>Warto uwzględnić wszystkie koszty</strong> - opłaty za wcześniejszą spłatę, prowizje i
                inne koszty mogą wynieść kilka tysięcy złotych.
              </li>
              <li>
                <strong>Najlepszy moment to spadek stóp</strong> - gdy stopy procentowe spadły, refinansowanie
                może być bardzo opłacalne.
              </li>
              <li>
                <strong>Porównaj oferty przed decyzją</strong> - użyj kalkulatora, aby sprawdzić opłacalność
                refinansowania.
              </li>
            </IntroList>
          </IntroContent>
        </IntroCard>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineCheckCircle size={18} />
              Korzyści
            </SectionBadge>
            <SectionTitle>Jakie są korzyści refinansowania?</SectionTitle>
            <SectionSubtitle>
              Refinansowanie kredytu hipotecznego może przynieść wiele korzyści. Oto najważniejsze z nich.
            </SectionSubtitle>
          </SectionHeader>
          <BenefitsGrid role="list">
            {benefits.map((benefit) => {
              const IconComponent = benefit.icon
              return (
                <BenefitCard key={benefit.title} role="listitem">
                  <BenefitHeader>
                    <BenefitIcon aria-hidden="true">
                      <IconComponent size={24} />
                    </BenefitIcon>
                    <BenefitTitle>{benefit.title}</BenefitTitle>
                  </BenefitHeader>
                  <BenefitDescription>{benefit.description}</BenefitDescription>
                  <BenefitSavings>{benefit.savings}</BenefitSavings>
                </BenefitCard>
              )
            })}
          </BenefitsGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineExclamationTriangle size={18} />
              Koszty
            </SectionBadge>
            <SectionTitle>Jakie są koszty refinansowania?</SectionTitle>
            <SectionSubtitle>
              Refinansowanie wiąże się z kosztami, które warto uwzględnić przed podjęciem decyzji.
            </SectionSubtitle>
          </SectionHeader>
          <CostsGrid role="list">
            {costs.map((cost) => (
              <CostCard key={cost.title} role="listitem">
                <CostHeader>
                  <CostTitle>{cost.title}</CostTitle>
                  <CostBadge impact={cost.impact}>
                    {cost.impact === 'wysoki' ? 'Wysoki wpływ' : cost.impact === 'średni' ? 'Średni wpływ' : 'Niski wpływ'}
                  </CostBadge>
                </CostHeader>
                <CostDescription>{cost.description}</CostDescription>
                <CostAmount>
                  <strong>Szacowany koszt:</strong> {cost.cost}
                </CostAmount>
              </CostCard>
            ))}
          </CostsGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineArrowPath size={18} />
              Kiedy refinansować
            </SectionBadge>
            <SectionTitle>Kiedy warto refinansować kredyt?</SectionTitle>
            <SectionSubtitle>
              Oto sytuacje, w których refinansowanie kredytu hipotecznego może być opłacalne.
            </SectionSubtitle>
          </SectionHeader>
          <WhenGrid role="list">
            {whenToRefinance.map((situation) => {
              const IconComponent = situation.icon
              return (
                <WhenCard key={situation.situation} role="listitem">
                  <WhenIcon aria-hidden="true">
                    <IconComponent size={24} />
                  </WhenIcon>
                  <WhenTitle>{situation.situation}</WhenTitle>
                  <WhenDescription>{situation.description}</WhenDescription>
                </WhenCard>
              )
            })}
          </WhenGrid>
          <CtaBox>
            <CtaTitle>Porównaj oferty refinansowania w kalkulatorze</CtaTitle>
            <CtaText>
              Nasz kalkulator kredytu hipotecznego pozwala porównać obecny kredyt z nowymi ofertami i
              sprawdzić, czy refinansowanie się opłaca. Zobacz, ile możesz zaoszczędzić i jakie są koszty
              refinansowania.
            </CtaText>
            <CtaButton href="/kalkulator/kredyt-hipoteczny">
              Porównaj oferty w kalkulatorze
              <HiOutlineArrowLongRight size={18} />
            </CtaButton>
          </CtaBox>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineDocumentText size={18} />
              FAQ
            </SectionBadge>
            <SectionTitle>Najczęściej zadawane pytania o refinansowanie</SectionTitle>
            <SectionSubtitle>
              Odpowiedzi na najpopularniejsze pytania dotyczące refinansowania kredytu hipotecznego.
            </SectionSubtitle>
          </SectionHeader>
          <FaqList role="list">
            {faqData.map((item) => (
              <FaqItem key={item.question}>
                <FaqQuestion>{item.question}</FaqQuestion>
                <FaqAnswer>{item.answer}</FaqAnswer>
              </FaqItem>
            ))}
          </FaqList>
        </Section>
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
              <RelatedCard key={article.slug} href={`/blog/${article.slug}`} role="listitem">
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

        <SummarySection>
          <SummaryContent>
            <SummaryTitle>Podsumowanie</SummaryTitle>
            <SummaryText>
              Refinansowanie kredytu hipotecznego może przynieść znaczne oszczędności, szczególnie gdy stopy
              procentowe spadły lub pojawiły się lepsze oferty na rynku. Korzyści obejmują: niższe
              oprocentowanie, niższą ratę, lepsze warunki i możliwość konsolidacji zobowiązań. Warto jednak
              uwzględnić wszystkie koszty refinansowania: opłaty za wcześniejszą spłatę, prowizje, wycenę
              nieruchomości i koszty notarialne.
            </SummaryText>
            <SummaryText>
              Aby sprawdzić, czy refinansowanie się opłaca, warto: porównać obecny kredyt z nowymi ofertami,
              uwzględnić wszystkie koszty refinansowania, obliczyć czas zwrotu kosztów i sprawdzić warunki
              umowy dotyczące opłat za wcześniejszą spłatę. Sprawdź w naszym kalkulatorze kredytu hipotecznego, aby
              porównać oferty i sprawdzić opłacalność refinansowania. Przeczytaj też nasze przewodniki o{' '}
              <Link href="/blog/wczesniejsza-splata-kredytu-hipotecznego" className="text-white underline hover:text-emerald-50">
                wcześniejszej spłacie kredytu hipotecznego
              </Link>
              ,{' '}
              <Link href="/blog/rrso-kredyt-hipoteczny" className="text-white underline hover:text-emerald-50">
                RRSO kredytu hipotecznego
              </Link>
              {' '}i{' '}
              <Link href="/blog/ranking-bankow-kredytow-hipotecznych-2025" className="text-white underline hover:text-emerald-50">
                rankingu banków kredytów hipotecznych
              </Link>
              .
            </SummaryText>
            <SummaryCta href="/kalkulator/kredyt-hipoteczny">
              Porównaj oferty refinansowania w kalkulatorze
              <HiOutlineArrowLongRight size={18} />
            </SummaryCta>
          </SummaryContent>
        </SummarySection>
      </ContentContainer>
      <FooterMain />
    </PageWrapper>
  )
}


const BreadcrumbNav = tw.nav`mb-8`
const BreadcrumbList = tw.ol`flex items-center gap-2 text-sm text-gray-600`
const BreadcrumbItem = tw.li`flex items-center`
const BreadcrumbLink = tw(Link)`text-emerald-700 hover:text-emerald-800 hover:underline transition-colors`
const BreadcrumbSeparator = tw.span`text-gray-400 mx-1`
const BreadcrumbCurrent = tw.span`text-gray-900 font-medium`


const PageWrapper = tw.main`min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-100`
const ContentContainer = tw.div`mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20`

const HeroSection = tw.section`mx-auto max-w-3xl text-center`
const HeroEyebrow = tw.span`mb-4 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700`
const HeroTitle = tw.h1`mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl`
const HeroLead = tw.p`mx-auto mb-8 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg`
const HeroActions = tw.div`flex flex-col items-center justify-center gap-3 sm:flex-row`

const PrimaryCta = tw(Link)`inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500`

const IntroCard = tw.section`mt-12 flex flex-col gap-4 rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:flex-row sm:items-center sm:gap-6 sm:p-8`
const IntroIcon = tw.span`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white`
const IntroContent = tw.div`flex-1`
const IntroTitle = tw.h2`mb-3 text-xl font-bold text-gray-900`
const IntroList = tw.ul`grid gap-2 text-sm text-gray-600 sm:text-base [&_strong]:text-gray-900 [&_strong]:font-semibold`

const Section = tw.section`mt-16`
const SectionHeader = tw.div`mx-auto mb-10 max-w-3xl text-center`
const SectionBadge = tw.span`mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700`
const SectionTitle = tw.h2`text-3xl font-bold text-gray-900 sm:text-4xl`
const SectionSubtitle = tw.p`mt-3 text-sm leading-relaxed text-gray-600 sm:text-base`

const CtaBox = tw.div`mx-auto mt-8 max-w-3xl rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-sm`
const CtaTitle = tw.h3`mb-2 text-xl font-semibold text-gray-900`
const CtaText = tw.p`mb-4 text-sm leading-relaxed text-gray-600 sm:text-base`
const CtaButton = tw(Link)`inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500`

const BenefitsGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const BenefitCard = tw.li`flex h-full flex-col rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1 hover:shadow-lg`
const BenefitHeader = tw.div`mb-4 flex items-center gap-4`
const BenefitIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const BenefitTitle = tw.h3`flex-1 text-xl font-semibold text-gray-900`
const BenefitDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const BenefitSavings = tw.p`mt-auto rounded-lg bg-emerald-50 p-3 text-sm font-semibold text-emerald-800`

const CostsGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const CostCard = tw.li`flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm`
const CostHeader = tw.div`mb-3 flex items-start justify-between gap-4`
const CostTitle = tw.h3`flex-1 text-xl font-semibold text-gray-900`
const CostBadge = tw.span<{ impact: string }>`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
  ({ impact }) =>
    impact === 'wysoki'
      ? 'bg-red-100 text-red-700'
      : impact === 'średni'
        ? 'bg-amber-100 text-amber-700'
        : 'bg-gray-100 text-gray-700'
}`
const CostDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const CostAmount = tw.p`mt-auto rounded-lg bg-gray-50 p-3 text-sm font-semibold text-gray-800`

const WhenGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const WhenCard = tw.li`flex h-full flex-col rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1 hover:shadow-lg`
const WhenIcon = tw.span`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const WhenTitle = tw.h3`mb-2 text-xl font-semibold text-gray-900`
const WhenDescription = tw.p`text-sm leading-relaxed text-gray-600`

const FaqList = tw.ul`mx-auto max-w-3xl divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-200 bg-white/80 shadow-sm`
const FaqItem = tw.li`px-5 py-6`
const FaqQuestion = tw.h3`mb-2 text-lg font-semibold text-gray-900`
const FaqAnswer = tw.p`text-sm leading-relaxed text-gray-600 sm:text-base`


const RelatedGrid = tw.ul`mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4`
const RelatedCard = tw(
  Link,
)`group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg`
const RelatedTitle = tw.h3`mb-2 text-lg font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors`
const RelatedDescription = tw.p`mb-4 flex-1 text-sm leading-relaxed text-gray-600`
const RelatedLink = tw.span`inline-flex items-center gap-1 text-sm font-medium text-emerald-700 group-hover:text-emerald-800 transition-colors`


const SummarySection = tw.section`mt-20 rounded-3xl border border-emerald-200 bg-linear-to-r from-emerald-600 to-teal-600 p-8 shadow-xl sm:p-10`
const SummaryContent = tw.div`mx-auto flex max-w-3xl flex-col text-white`
const SummaryTitle = tw.h2`mb-4 text-2xl font-bold sm:text-3xl`
const SummaryText = tw.p`mb-4 text-base leading-relaxed text-emerald-50 [&+&]:mt-2`
const SummaryCta = tw(Link)`mt-6 inline-flex items-center gap-2 self-center rounded-full bg-white px-6 py-3 font-semibold text-emerald-600 transition-colors hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`

