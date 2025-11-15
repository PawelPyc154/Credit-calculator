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

export const metadata: Metadata = {  robots: getPostRobotsMetadata('prowizja-kredyt-hipoteczny'),

  title: 'Prowizja za udzielenie kredytu hipotecznego - ile wynosi?',
  description:
    'Dowiedz się, ile wynosi prowizja za udzielenie kredytu hipotecznego, czy jest obowiązkowa i jak ją uniknąć. Porównaj prowizje różnych banków w kalkulatorze.',
  alternates: {
    canonical: `${siteUrl}/blog/prowizja-kredyt-hipoteczny`,
  },
  keywords: [
    'prowizja kredyt hipoteczny',
    'prowizja za udzielenie kredytu',
    'ile wynosi prowizja kredytu hipotecznego',
    'prowizja bankowa kredyt hipoteczny',
    'czy prowizja kredytu jest obowiązkowa',
    'prowizja kredytu hipotecznego 2025',
    'jak uniknąć prowizji kredytu',
  ],
  openGraph: {
    title: 'Prowizja za udzielenie kredytu hipotecznego - ile wynosi?',
    description:
      'Kompletny przewodnik po prowizji za udzielenie kredytu hipotecznego: wysokość, obowiązkowość i sposoby uniknięcia.',
    url: `${siteUrl}/blog/prowizja-kredyt-hipoteczny`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Prowizja za udzielenie kredytu hipotecznego',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prowizja za udzielenie kredytu hipotecznego',
    description: 'Dowiedz się, ile wynosi prowizja za udzielenie kredytu hipotecznego i jak ją uniknąć.',
    images: [`${siteUrl}/og-image.jpg`],
  },
}

const commissionInfo = [
  {
    title: 'Wysokość prowizji',
    description:
      'Prowizja za udzielenie kredytu hipotecznego wynosi zazwyczaj 0-2% kwoty kredytu. Przy kredycie 500 000 zł prowizja może wynieść od 0 do 10 000 zł. Niektóre banki oferują promocje z zerową prowizją.',
    details: [
      'Standardowa prowizja: 0-2% kwoty kredytu',
      'Przy kredycie 500 000 zł: 0-10 000 zł',
      'Niektóre banki oferują promocje z zerową prowizją',
      'Prowizja jest jednorazową opłatą',
    ],
    icon: HiOutlineCurrencyDollar,
  },
  {
    title: 'Czy prowizja jest obowiązkowa?',
    description:
      'Prowizja nie zawsze jest obowiązkowa. Niektóre banki oferują promocje z zerową prowizją, szczególnie dla wartościowych klientów lub w okresach promocyjnych. Prowizja jest również często negocjowalna.',
    details: [
      'Nie zawsze jest obowiązkowa',
      'Można negocjować wysokość prowizji',
      'Promocje z zerową prowizją',
      'Zależy od banku i oferty',
    ],
    icon: HiOutlineCheckCircle,
  },
  {
    title: 'Jak uniknąć prowizji?',
    description:
      'Możesz uniknąć prowizji poprzez: korzystanie z promocji bankowych, negocjowanie z bankiem, bycie wartościowym klientem lub wybór banku, który oferuje zerową prowizję. Warto porównać oferty różnych banków.',
    details: [
      'Korzystaj z promocji bankowych',
      'Negocjuj z bankiem',
      'Bądź wartościowym klientem',
      'Porównaj oferty banków',
    ],
    icon: HiOutlineExclamationTriangle,
  },
]

const howToNegotiate = [
  {
    title: 'Porównaj oferty banków',
    description:
      'Porównaj oferty różnych banków w kalkulatorze kredytu hipotecznego. Znajdź banki z najniższą lub zerową prowizją i użyj tego jako argumentu w negocjacjach.',
    icon: HiOutlineCalculator,
  },
  {
    title: 'Negocjuj przed podpisaniem umowy',
    description:
      'Negocjuj wysokość prowizji przed podpisaniem umowy kredytowej. Banki często są skłonne do obniżenia prowizji, aby zdobyć klienta, szczególnie jeśli masz dobrą zdolność kredytową.',
    icon: HiOutlineCheckCircle,
  },
  {
    title: 'Korzystaj z promocji',
    description:
      'Szukaj promocji bankowych z obniżoną lub zerową prowizją. Wiele banków oferuje takie promocje w okresach promocyjnych lub dla nowych klientów.',
    icon: HiOutlineDocumentText,
  },
  {
    title: 'Bądź wartościowym klientem',
    description:
      'Jeśli jesteś wartościowym klientem (np. masz wysoką zdolność kredytową, otwierasz konto w banku), możesz negocjować lepsze warunki, w tym obniżenie lub zniesienie prowizji.',
    icon: HiOutlineCheckCircle,
  },
]

const faqData = [
  {
    question: 'Ile wynosi prowizja za udzielenie kredytu hipotecznego?',
    answer:
      'Prowizja za udzielenie kredytu hipotecznego wynosi zazwyczaj 0-2% kwoty kredytu. Przy kredycie 500 000 zł prowizja może wynieść od 0 do 10 000 zł. Niektóre banki oferują promocje z zerową prowizją. Warto porównać oferty różnych banków w kalkulatorze kredytu hipotecznego.',
  },
  {
    question: 'Czy prowizja jest obowiązkowa?',
    answer:
      'Prowizja nie zawsze jest obowiązkowa. Niektóre banki oferują promocje z zerową prowizją, szczególnie dla wartościowych klientów lub w okresach promocyjnych. Prowizja jest również często negocjowalna. Warto sprawdzić oferty różnych banków i negocjować warunki przed podpisaniem umowy.',
  },
  {
    question: 'Jak uniknąć prowizji?',
    answer:
      'Możesz uniknąć prowizji poprzez: korzystanie z promocji bankowych z zerową prowizją, negocjowanie z bankiem, bycie wartościowym klientem lub wybór banku, który oferuje zerową prowizję. Warto porównać oferty różnych banków w kalkulatorze i negocjować warunki przed podpisaniem umowy.',
  },
  {
    question: 'Czy mogę negocjować prowizję?',
    answer:
      'Tak, prowizja jest często negocjowalna. Banki często są skłonne do obniżenia prowizji, aby zdobyć klienta, szczególnie jeśli masz dobrą zdolność kredytową lub jesteś wartościowym klientem. Warto negocjować przed podpisaniem umowy i użyć ofert innych banków jako argumentu.',
  },
  {
    question: 'Kiedy jest pobierana prowizja?',
    answer:
      'Prowizja jest zazwyczaj pobierana jednorazowo przy udzieleniu kredytu, czyli przy podpisaniu umowy kredytowej lub wypłacie środków. Prowizja może być doliczona do kwoty kredytu lub pobrana osobno. Warto sprawdzić warunki w ofercie banku.',
  },
  {
    question: 'Czy prowizja jest wliczona w RRSO?',
    answer:
      'Tak, prowizja jest wliczona w RRSO (Rzeczywistą Roczna Stopę Oprocentowania), która pokazuje rzeczywisty koszt kredytu w skali roku, uwzględniając wszystkie opłaty, w tym prowizję. Warto porównać RRSO różnych banków, aby zobaczyć pełny koszt kredytu.',
  },
  {
    question: 'Czy wszystkie banki pobierają prowizję?',
    answer:
      'Nie, nie wszystkie banki pobierają prowizję. Niektóre banki oferują promocje z zerową prowizją, szczególnie dla wartościowych klientów lub w okresach promocyjnych. Warto porównać oferty różnych banków w kalkulatorze kredytu hipotecznego i wybrać bank z najniższą lub zerową prowizją.',
  },
  {
    question: 'Jak prowizja wpływa na całkowity koszt kredytu?',
    answer:
      'Prowizja znacząco wpływa na całkowity koszt kredytu. Przy kredycie 500 000 zł prowizja 2% to 10 000 zł dodatkowego kosztu. Prowizja jest wliczona w RRSO, więc warto porównać pełne koszty kredytu (RRSO) różnych banków, a nie tylko oprocentowanie. Użyj kalkulatora kredytu hipotecznego, aby zobaczyć pełny koszt.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Prowizja za udzielenie kredytu hipotecznego - ile wynosi?',
  description:
    'Kompletny przewodnik po prowizji za udzielenie kredytu hipotecznego: wysokość, obowiązkowość i sposoby uniknięcia.',
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
  datePublished: '2026-01-28',
  dateModified: '2026-01-28',
  mainEntityOfPage: `${siteUrl}/blog/prowizja-kredyt-hipoteczny`,
  articleSection: ['Prowizja', 'Kredyt hipoteczny', 'Koszty'],
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
      name: 'Prowizja za udzielenie kredytu hipotecznego',
      item: `${siteUrl}/blog/prowizja-kredyt-hipoteczny`,
    },
  ],
}

const relatedArticles = [
  {
    slug: 'rrso-kredyt-hipoteczny',
    title: 'RRSO kredytu hipotecznego - co to jest?',
    description: 'Poznaj RRSO i dowiedz się, jak porównać pełne koszty kredytu.',
  },
  {
    slug: 'ukryte-koszty-kredytu-hipotecznego',
    title: 'Ukryte koszty kredytu hipotecznego',
    description: 'Dowiedz się, jakie koszty mogą Cię zaskoczyć przy kredycie.',
  },
  {
    slug: 'jak-negocjowac-warunki-kredytu-hipotecznego',
    title: 'Jak negocjować warunki kredytu hipotecznego?',
    description: 'Dowiedz się, jak negocjować warunki kredytu.',
  },
  {
    slug: 'jak-wybrac-najlepszy-kredyt-hipoteczny',
    title: 'Jak wybrać najlepszy kredyt hipoteczny?',
    description: 'Kompleksowy przewodnik po wyborze najlepszego kredytu.',
  }
]

export default function CommissionPage() {
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
              <BreadcrumbCurrent>Prowizja za udzielenie kredytu hipotecznego</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>

        <HeroSection>
          <HeroEyebrow>Koszty i opłaty</HeroEyebrow>
          <HeroTitle>Prowizja za udzielenie kredytu hipotecznego - ile wynosi?</HeroTitle>
          <HeroLead>
            Prowizja za udzielenie kredytu hipotecznego to jednorazowa opłata, która może wynieść nawet 2%
            kwoty kredytu. Przy kredycie 500 000 zł to 10 000 zł dodatkowego kosztu. W tym przewodniku
            dowiesz się, ile wynosi prowizja, czy jest obowiązkowa i jak ją uniknąć. Porównaj prowizje
            różnych banków w naszym kalkulatorze kredytu hipotecznego.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Porównaj prowizje banków w kalkulatorze
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
                <strong>Prowizja wynosi zazwyczaj 0-2% kwoty kredytu</strong> - przy kredycie 500 000 zł to
                0-10 000 zł.
              </li>
              <li>
                <strong>Nie zawsze jest obowiązkowa</strong> - niektóre banki oferują promocje z zerową
                prowizją.
              </li>
              <li>
                <strong>Można negocjować</strong> - banki często są skłonne do obniżenia prowizji, aby
                zdobyć klienta.
              </li>
              <li>
                <strong>Jest wliczona w RRSO</strong> - porównuj pełne koszty kredytu (RRSO), a nie tylko
                oprocentowanie.
              </li>
            </IntroList>
          </IntroContent>
        </IntroCard>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineCurrencyDollar size={18} />
              Prowizja
            </SectionBadge>
            <SectionTitle>Co to jest prowizja i ile wynosi?</SectionTitle>
            <SectionSubtitle>
              Poznaj szczegóły dotyczące prowizji za udzielenie kredytu hipotecznego: wysokość,
              obowiązkowość i sposoby uniknięcia.
            </SectionSubtitle>
          </SectionHeader>
          <InfoGrid role="list">
            {commissionInfo.map((info) => {
              const IconComponent = info.icon
              return (
                <InfoCard key={info.title} role="listitem">
                  <InfoHeader>
                    <InfoIcon aria-hidden="true">
                      <IconComponent size={24} />
                    </InfoIcon>
                    <InfoTitle>{info.title}</InfoTitle>
                  </InfoHeader>
                  <InfoDescription>{info.description}</InfoDescription>
                  <InfoDetails>
                    {info.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </InfoDetails>
                </InfoCard>
              )
            })}
          </InfoGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineCheckCircle size={18} />
              Negocjacje
            </SectionBadge>
            <SectionTitle>Jak negocjować prowizję?</SectionTitle>
            <SectionSubtitle>
              Oto praktyczne wskazówki, które pomogą Ci znegocjować niższą lub zerową prowizję.
            </SectionSubtitle>
          </SectionHeader>
          <NegotiateGrid role="list">
            {howToNegotiate.map((tip) => {
              const IconComponent = tip.icon
              return (
                <NegotiateCard key={tip.title} role="listitem">
                  <NegotiateIcon aria-hidden="true">
                    <IconComponent size={24} />
                  </NegotiateIcon>
                  <NegotiateTitle>{tip.title}</NegotiateTitle>
                  <NegotiateDescription>{tip.description}</NegotiateDescription>
                </NegotiateCard>
              )
            })}
          </NegotiateGrid>
          <CtaBox>
            <CtaTitle>Porównaj prowizje banków w kalkulatorze</CtaTitle>
            <CtaText>
              Nasz kalkulator kredytu hipotecznego pozwala porównać prowizje różnych banków i zobaczyć pełny
              koszt kredytu (RRSO), który uwzględnia prowizję. Znajdź bank z najniższą prowizją i użyj tego
              jako argumentu w negocjacjach.
            </CtaText>
            <CtaButton href="/kalkulator/kredyt-hipoteczny">
              Porównaj prowizje w kalkulatorze
              <HiOutlineArrowLongRight size={18} />
            </CtaButton>
          </CtaBox>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineCalculator size={18} />
              Wpływ na koszt
            </SectionBadge>
            <SectionTitle>Jak prowizja wpływa na całkowity koszt kredytu?</SectionTitle>
            <SectionSubtitle>
              Prowizja znacząco wpływa na całkowity koszt kredytu. Oto jak to działa.
            </SectionSubtitle>
          </SectionHeader>
          <ArticleText>
            Prowizja znacząco wpływa na całkowity koszt kredytu. Przy kredycie 500 000 zł prowizja 2% to 10
            000 zł dodatkowego kosztu. Prowizja jest wliczona w RRSO (Rzeczywistą Roczna Stopę
            Oprocentowania), która pokazuje rzeczywisty koszt kredytu w skali roku, uwzględniając wszystkie
            opłaty.
          </ArticleText>
          <ArticleText>
            Warto porównać pełne koszty kredytu (RRSO) różnych banków, a nie tylko oprocentowanie. Bank z
            niższym oprocentowaniem, ale wyższą prowizją może być droższy niż bank z wyższym oprocentowaniem
            i zerową prowizją. Użyj kalkulatora kredytu hipotecznego, aby zobaczyć pełny koszt kredytu z
            prowizją wliczoną.
          </ArticleText>
          <CtaBox>
            <CtaTitle>Zobacz pełny koszt kredytu z prowizją</CtaTitle>
            <CtaText>
              Nasz kalkulator kredytu hipotecznego automatycznie uwzględnia prowizję w całkowitym koszcie
              kredytu (RRSO). Zobacz, jak prowizja wpływa na pełny koszt i porównaj oferty banków.
            </CtaText>
            <CtaButton href="/kalkulator/kredyt-hipoteczny">
              Zobacz pełny koszt w kalkulatorze
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
            <SectionTitle>Najczęściej zadawane pytania o prowizję</SectionTitle>
            <SectionSubtitle>
              Odpowiedzi na najpopularniejsze pytania dotyczące prowizji za udzielenie kredytu hipotecznego.
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
              Prowizja za udzielenie kredytu hipotecznego wynosi zazwyczaj 0-2% kwoty kredytu. Przy kredycie
              500 000 zł prowizja może wynieść od 0 do 10 000 zł. Prowizja nie zawsze jest obowiązkowa -
              niektóre banki oferują promocje z zerową prowizją, szczególnie dla wartościowych klientów lub
              w okresach promocyjnych.
            </SummaryText>
            <SummaryText>
              Aby uniknąć lub zmniejszyć prowizję, warto: porównać oferty różnych banków w kalkulatorze,
              negocjować z bankiem przed podpisaniem umowy, korzystać z promocji bankowych i być wartościowym
              klientem. Prowizja jest wliczona w RRSO, więc warto porównać pełne koszty kredytu (RRSO)
              różnych banków. Porównaj prowizje banków w naszym kalkulatorze kredytu hipotecznego. Przeczytaj
              też nasze przewodniki o{' '}
              <Link href="/blog/rrso-kredyt-hipoteczny" className="text-white underline hover:text-emerald-50">
                RRSO kredytu hipotecznego
              </Link>
              ,{' '}
              <Link
                href="/blog/ukryte-koszty-kredytu-hipotecznego"
                className="text-white underline hover:text-emerald-50"
              >
                ukrytych kosztach kredytu
              </Link>
              {' '}i{' '}
              <Link
                href="/blog/jak-negocjowac-warunki-kredytu-hipotecznego"
                className="text-white underline hover:text-emerald-50"
              >
                jak negocjować warunki kredytu
              </Link>
              .
            </SummaryText>
            <SummaryCta href="/kalkulator/kredyt-hipoteczny">
              Porównaj prowizje banków w kalkulatorze
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

const ArticleText = tw.p`mx-auto max-w-3xl text-base leading-relaxed text-gray-700 sm:text-lg [&+&]:mt-4`

const CtaBox = tw.div`mx-auto mt-8 max-w-3xl rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-sm`
const CtaTitle = tw.h3`mb-2 text-xl font-semibold text-gray-900`
const CtaText = tw.p`mb-4 text-sm leading-relaxed text-gray-600 sm:text-base`
const CtaButton = tw(Link)`inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500`

const InfoGrid = tw.ul`grid grid-cols-1 gap-6 lg:grid-cols-3`
const InfoCard = tw.li`flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1 hover:shadow-lg`
const InfoHeader = tw.div`mb-4 flex items-start gap-4`
const InfoIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const InfoTitle = tw.h3`flex-1 text-xl font-semibold text-gray-900`
const InfoDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const InfoDetails = tw.ul`mt-auto grid gap-2 text-sm text-gray-600 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`

const NegotiateGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const NegotiateCard = tw.li`flex h-full flex-col rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1 hover:shadow-lg`
const NegotiateIcon = tw.span`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const NegotiateTitle = tw.h3`mb-2 text-xl font-semibold text-gray-900`
const NegotiateDescription = tw.p`text-sm leading-relaxed text-gray-600`

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

