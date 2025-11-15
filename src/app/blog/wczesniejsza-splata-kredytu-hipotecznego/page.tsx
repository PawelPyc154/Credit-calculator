import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowLongRight,
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

export const metadata: Metadata = {  robots: getPostRobotsMetadata('wczesniejsza-splata-kredytu-hipotecznego'),

  title: 'Wcześniejsza spłata kredytu hipotecznego - opłaty i korzyści',
  description:
    'Dowiedz się, czy warto spłacić kredyt hipoteczny wcześniej, jakie są opłaty za wcześniejszą spłatę i jakie korzyści. Oblicz oszczędności w kalkulatorze.',
  alternates: {
    canonical: `${siteUrl}/blog/wczesniejsza-splata-kredytu-hipotecznego`,
  },
  keywords: [
    'wcześniejsza spłata kredytu hipotecznego',
    'opłata za wcześniejszą spłatę kredytu',
    'czy warto spłacić kredyt wcześniej',
    'nadpłata kredytu hipotecznego',
    'opłaty za wcześniejszą spłatę',
    'jak spłacić kredyt wcześniej',
    'korzyści wcześniejszej spłaty',
  ],
  openGraph: {
    title: 'Wcześniejsza spłata kredytu hipotecznego - opłaty i korzyści',
    description:
      'Kompletny przewodnik po wcześniejszej spłacie kredytu hipotecznego: opłaty, korzyści i kiedy warto spłacić wcześniej.',
    url: `${siteUrl}/blog/wczesniejsza-splata-kredytu-hipotecznego`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Wcześniejsza spłata kredytu hipotecznego',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wcześniejsza spłata kredytu hipotecznego',
    description: 'Dowiedz się, czy warto spłacić kredyt hipoteczny wcześniej i jakie są opłaty.',
    images: [`${siteUrl}/og-image.jpg`],
  },
}

const benefits = [
  {
    title: 'Oszczędność odsetek',
    description:
      'Wcześniejsza spłata pozwala zaoszczędzić na odsetkach, które nie będą naliczane na spłaconą kwotę. To może przynieść znaczne oszczędności w długim okresie.',
    savings: 'Możliwe oszczędności: dziesiątki tysięcy złotych',
    icon: HiOutlineCurrencyDollar,
  },
  {
    title: 'Szybsze uwolnienie się od długu',
    description:
      'Wcześniejsza spłata pozwala szybciej uwolnić się od długu i poprawić sytuację finansową. To daje większą swobodę finansową.',
    savings: 'Szybsze osiągnięcie wolności finansowej',
    icon: HiOutlineCheckCircle,
  },
  {
    title: 'Niższa rata',
    description:
      'Nadpłata może zmniejszyć miesięczną ratę lub skrócić okres kredytowania, poprawiając płynność finansową.',
    savings: 'Możliwe zmniejszenie raty lub skrócenie okresu',
    icon: HiOutlineCheckCircle,
  },
  {
    title: 'Mniejsze ryzyko',
    description:
      'Wcześniejsza spłata zmniejsza ryzyko związane z kredytem, szczególnie w przypadku zmiennego oprocentowania.',
    savings: 'Zmniejszenie ryzyka finansowego',
    icon: HiOutlineCheckCircle,
  },
]

const fees = [
  {
    title: 'Opłata za wcześniejszą spłatę',
    description:
      'Niektóre banki pobierają opłatę za wcześniejszą spłatę, która może wynosić 0-3% spłacanej kwoty. Opłata może być pobierana tylko w określonym okresie (np. pierwsze 3-5 lat) lub przez cały okres kredytowania.',
    cost: '0-3% spłacanej kwoty',
    impact: 'wysoki',
  },
  {
    title: 'Opłata za nadpłatę',
    description:
      'Niektóre banki pobierają opłatę za nadpłatę przekraczającą określony limit (np. 20% rocznej raty). Opłata może wynosić kilkaset złotych.',
    cost: 'Zależne od banku',
    impact: 'średni',
  },
  {
    title: 'Koszty aneksu',
    description:
      'Wcześniejsza spłata może wymagać aneksu do umowy kredytowej, co wiąże się z dodatkowymi kosztami (200-1000 zł).',
    cost: '200-1000 zł',
    impact: 'niski',
  },
]

const whenToPayEarly = [
  {
    situation: 'Masz nadwyżkę finansową',
    description:
      'Jeśli masz nadwyżkę finansową, którą nie musisz przeznaczać na inne cele, wcześniejsza spłata może być dobrym rozwiązaniem.',
    icon: HiOutlineCheckCircle,
  },
  {
    situation: 'Wysokie oprocentowanie',
    description:
      'Jeśli kredyt ma wysokie oprocentowanie, wcześniejsza spłata może przynieść znaczne oszczędności na odsetkach.',
    icon: HiOutlineCurrencyDollar,
  },
  {
    situation: 'Brak lepszych inwestycji',
    description:
      'Jeśli nie masz lepszych możliwości inwestycyjnych, wcześniejsza spłata kredytu może być lepszym rozwiązaniem niż trzymanie środków na koncie.',
    icon: HiOutlineCheckCircle,
  },
  {
    situation: 'Chcesz zmniejszyć ryzyko',
    description:
      'Jeśli chcesz zmniejszyć ryzyko finansowe i szybciej uwolnić się od długu, wcześniejsza spłata może być dobrym rozwiązaniem.',
    icon: HiOutlineCheckCircle,
  },
]

const faqData = [
  {
    question: 'Czy warto spłacić kredyt hipoteczny wcześniej?',
    answer:
      'Wcześniejsza spłata kredytu hipotecznego może być opłacalna, jeśli: masz nadwyżkę finansową, kredyt ma wysokie oprocentowanie, nie masz lepszych możliwości inwestycyjnych lub chcesz zmniejszyć ryzyko finansowe. Warto jednak uwzględnić opłaty za wcześniejszą spłatę i porównać oszczędności z kosztami. Użyj kalkulatora kredytu hipotecznego, aby sprawdzić, ile możesz zaoszczędzić.',
  },
  {
    question: 'Ile wynosi opłata za wcześniejszą spłatę kredytu?',
    answer:
      'Opłata za wcześniejszą spłatę kredytu może wynosić 0-3% spłacanej kwoty, w zależności od banku i warunków umowy. Niektóre banki pobierają opłatę tylko w określonym okresie (np. pierwsze 3-5 lat), inne przez cały okres kredytowania. Warto sprawdzić warunki w umowie kredytowej przed podjęciem decyzji o wcześniejszej spłacie.',
  },
  {
    question: 'Czy mogę spłacić kredyt wcześniej bez opłat?',
    answer:
      'To zależy od warunków umowy kredytowej. Niektóre banki nie pobierają opłat za wcześniejszą spłatę, inne pobierają opłaty tylko w określonym okresie (np. pierwsze 3-5 lat), a jeszcze inne przez cały okres kredytowania. Warto sprawdzić warunki w umowie i negocjować brak opłat przed podpisaniem umowy.',
  },
  {
    question: 'Jak obliczyć oszczędności z wcześniejszej spłaty?',
    answer:
      'Aby obliczyć oszczędności z wcześniejszej spłaty, porównaj: odsetki, które nie będą naliczane na spłaconą kwotę, opłaty za wcześniejszą spłatę i koszty alternatywne (np. utracone zyski z inwestycji). Użyj kalkulatora kredytu hipotecznego, aby zobaczyć, ile możesz zaoszczędzić przy różnych scenariuszach wcześniejszej spłaty.',
  },
  {
    question: 'Czy nadpłata zmniejsza ratę?',
    answer:
      'Nadpłata może zmniejszyć miesięczną ratę lub skrócić okres kredytowania, w zależności od warunków umowy i preferencji kredytobiorcy. Niektóre banki automatycznie zmniejszają ratę, inne skracają okres kredytowania. Warto sprawdzić warunki w umowie i wybrać opcję, która najlepiej odpowiada Twoim potrzebom.',
  },
  {
    question: 'Czy mogę spłacić część kredytu wcześniej?',
    answer:
      'Tak, możesz spłacić część kredytu wcześniej poprzez nadpłatę. Niektóre banki pozwalają na nadpłatę bez dodatkowych opłat, inne pobierają opłaty za nadpłatę przekraczającą określony limit. Warto sprawdzić warunki w umowie i możliwości nadpłaty w banku.',
  },
  {
    question: 'Kiedy najlepiej spłacić kredyt wcześniej?',
    answer:
      'Najlepiej spłacić kredyt wcześniej, gdy: masz nadwyżkę finansową, kredyt ma wysokie oprocentowanie, nie masz lepszych możliwości inwestycyjnych lub chcesz zmniejszyć ryzyko finansowe. Warto jednak uwzględnić opłaty za wcześniejszą spłatę i porównać oszczędności z kosztami. Najlepiej spłacić kredyt po okresie, w którym bank pobiera opłaty za wcześniejszą spłatę.',
  },
  {
    question: 'Jak spłacić kredyt wcześniej?',
    answer:
      'Aby spłacić kredyt wcześniej, skontaktuj się z bankiem i poinformuj o zamiarze wcześniejszej spłaty. Bank poinformuje Cię o procedurze, opłatach i wymaganych dokumentach. Możesz spłacić cały kredyt lub jego część poprzez nadpłatę. Warto sprawdzić warunki w umowie i możliwości wcześniejszej spłaty w banku.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Wcześniejsza spłata kredytu hipotecznego - opłaty i korzyści',
  description:
    'Kompletny przewodnik po wcześniejszej spłacie kredytu hipotecznego: opłaty, korzyści i kiedy warto spłacić wcześniej.',
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
  datePublished: '2026-02-25',
  dateModified: '2026-02-25',
  mainEntityOfPage: `${siteUrl}/blog/wczesniejsza-splata-kredytu-hipotecznego`,
  articleSection: ['Wcześniejsza spłata', 'Kredyt hipoteczny', 'Zarządzanie kredytem'],
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
      name: 'Wcześniejsza spłata kredytu hipotecznego',
      item: `${siteUrl}/blog/wczesniejsza-splata-kredytu-hipotecznego`,
    },
  ],
}

const relatedArticles = [
  {
    slug: 'refinansowanie-kredytu-hipotecznego',
    title: 'Refinansowanie kredytu hipotecznego',
    description: 'Dowiedz się, czy refinansowanie się opłaca.',
  },
  {
    slug: 'ukryte-koszty-kredytu-hipotecznego',
    title: 'Ukryte koszty kredytu hipotecznego',
    description: 'Dowiedz się, jakie koszty mogą Cię zaskoczyć przy kredycie.',
  },
  {
    slug: 'rrso-kredyt-hipoteczny',
    title: 'RRSO kredytu hipotecznego - co to jest?',
    description: 'Poznaj RRSO i dowiedz się, jak porównać pełne koszty kredytu.',
  },
  {
    slug: 'jak-wybrac-najlepszy-kredyt-hipoteczny',
    title: 'Jak wybrać najlepszy kredyt hipoteczny?',
    description: 'Kompleksowy przewodnik po wyborze najlepszego kredytu.',
  }
]

export default function EarlyRepaymentPage() {
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
              <BreadcrumbCurrent>Wcześniejsza spłata kredytu hipotecznego</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>

        <HeroSection>
          <HeroEyebrow>Zarządzanie kredytem</HeroEyebrow>
          <HeroTitle>Wcześniejsza spłata kredytu hipotecznego - opłaty i korzyści</HeroTitle>
          <HeroLead>
            Wcześniejsza spłata kredytu hipotecznego może przynieść znaczne oszczędności na odsetkach, ale
            wiąże się również z opłatami. W tym przewodniku dowiesz się, czy warto spłacić kredyt wcześniej,
            jakie są opłaty za wcześniejszą spłatę i jakie korzyści możesz uzyskać. Oblicz oszczędności z
            wcześniejszej spłaty w naszym kalkulatorze kredytu hipotecznego.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Oblicz oszczędności z wcześniejszej spłaty
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
                <strong>Wcześniejsza spłata może zaoszczędzić dziesiątki tysięcy złotych</strong> - na
                odsetkach, które nie będą naliczane.
              </li>
              <li>
                <strong>Opłaty mogą wynieść 0-3% spłacanej kwoty</strong> - sprawdź warunki w umowie przed
                spłatą.
              </li>
              <li>
                <strong>Najlepiej spłacić po okresie opłat</strong> - gdy bank nie pobiera opłat za
                wcześniejszą spłatę.
              </li>
              <li>
                <strong>Porównaj oszczędności z kosztami</strong> - użyj kalkulatora, aby sprawdzić
                opłacalność.
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
            <SectionTitle>Jakie są korzyści wcześniejszej spłaty?</SectionTitle>
            <SectionSubtitle>
              Wcześniejsza spłata kredytu hipotecznego może przynieść wiele korzyści. Oto najważniejsze z
              nich.
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
              Opłaty
            </SectionBadge>
            <SectionTitle>Jakie są opłaty za wcześniejszą spłatę?</SectionTitle>
            <SectionSubtitle>
              Wcześniejsza spłata kredytu hipotecznego wiąże się z opłatami, które warto uwzględnić przed
              podjęciem decyzji.
            </SectionSubtitle>
          </SectionHeader>
          <FeesGrid role="list">
            {fees.map((fee) => (
              <FeeCard key={fee.title} role="listitem">
                <FeeHeader>
                  <FeeTitle>{fee.title}</FeeTitle>
                  <FeeBadge impact={fee.impact}>
                    {fee.impact === 'wysoki' ? 'Wysoki wpływ' : fee.impact === 'średni' ? 'Średni wpływ' : 'Niski wpływ'}
                  </FeeBadge>
                </FeeHeader>
                <FeeDescription>{fee.description}</FeeDescription>
                <FeeAmount>
                  <strong>Szacowany koszt:</strong> {fee.cost}
                </FeeAmount>
              </FeeCard>
            ))}
          </FeesGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineCheckCircle size={18} />
              Kiedy spłacić
            </SectionBadge>
            <SectionTitle>Kiedy warto spłacić kredyt wcześniej?</SectionTitle>
            <SectionSubtitle>
              Oto sytuacje, w których wcześniejsza spłata kredytu hipotecznego może być opłacalna.
            </SectionSubtitle>
          </SectionHeader>
          <WhenGrid role="list">
            {whenToPayEarly.map((situation) => {
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
            <CtaTitle>Oblicz oszczędności z wcześniejszej spłaty</CtaTitle>
            <CtaText>
              Nasz kalkulator kredytu hipotecznego pozwala obliczyć oszczędności z wcześniejszej spłaty.
              Zobacz, ile możesz zaoszczędzić na odsetkach i jakie są koszty wcześniejszej spłaty.
            </CtaText>
            <CtaButton href="/kalkulator/kredyt-hipoteczny">
              Oblicz oszczędności w kalkulatorze
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
            <SectionTitle>Najczęściej zadawane pytania o wcześniejszą spłatę</SectionTitle>
            <SectionSubtitle>
              Odpowiedzi na najpopularniejsze pytania dotyczące wcześniejszej spłaty kredytu hipotecznego.
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
              Wcześniejsza spłata kredytu hipotecznego może przynieść znaczne oszczędności na odsetkach,
              szczególnie gdy kredyt ma wysokie oprocentowanie. Korzyści obejmują: oszczędność odsetek,
              szybsze uwolnienie się od długu, niższą ratę i mniejsze ryzyko finansowe. Warto jednak
              uwzględnić opłaty za wcześniejszą spłatę, które mogą wynieść 0-3% spłacanej kwoty.
            </SummaryText>
            <SummaryText>
              Aby sprawdzić, czy wcześniejsza spłata się opłaca, warto: obliczyć oszczędności na odsetkach,
              uwzględnić opłaty za wcześniejszą spłatę, porównać oszczędności z kosztami i sprawdzić warunki
              w umowie. Najlepiej spłacić kredyt po okresie, w którym bank pobiera opłaty za wcześniejszą
              spłatę. Sprawdź w naszym kalkulatorze kredytu hipotecznego, aby obliczyć oszczędności z wcześniejszej
              spłaty. Przeczytaj też nasze przewodniki o{' '}
              <Link href="/blog/refinansowanie-kredytu-hipotecznego" className="text-white underline hover:text-emerald-50">
                refinansowaniu kredytu hipotecznego
              </Link>
              ,{' '}
              <Link href="/blog/ukryte-koszty-kredytu-hipotecznego" className="text-white underline hover:text-emerald-50">
                ukrytych kosztach kredytu
              </Link>
              {' '}i{' '}
              <Link href="/blog/rrso-kredyt-hipoteczny" className="text-white underline hover:text-emerald-50">
                RRSO kredytu hipotecznego
              </Link>
              .
            </SummaryText>
            <SummaryCta href="/kalkulator/kredyt-hipoteczny">
              Oblicz oszczędności z wcześniejszej spłaty
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

const FeesGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-3`
const FeeCard = tw.li`flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm`
const FeeHeader = tw.div`mb-3 flex items-start justify-between gap-4`
const FeeTitle = tw.h3`flex-1 text-xl font-semibold text-gray-900`
const FeeBadge = tw.span<{ impact: string }>`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
  ({ impact }) =>
    impact === 'wysoki'
      ? 'bg-red-100 text-red-700'
      : impact === 'średni'
        ? 'bg-amber-100 text-amber-700'
        : 'bg-gray-100 text-gray-700'
}`
const FeeDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const FeeAmount = tw.p`mt-auto rounded-lg bg-gray-50 p-3 text-sm font-semibold text-gray-800`

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

