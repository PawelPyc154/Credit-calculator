import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowLongRight,
  HiOutlineCalculator,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineSparkles,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'
import { getPostRobotsMetadata } from 'utils/blog-posts'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {  robots: getPostRobotsMetadata('jak-dlugo-trwa-proces-kredytowy'),

  title: 'Jak długo trwa proces kredytowy? Terminy 2025',
  description:
    'Dowiedz się, ile trwa proces kredytowy: od złożenia wniosku do podpisania umowy. Sprawdź terminy i etapy procesu kredytowego w 2025.',
  alternates: {
    canonical: `${siteUrl}/blog/jak-dlugo-trwa-proces-kredytowy`,
  },
  keywords: [
    'jak długo trwa proces kredytowy',
    'ile trwa proces kredytowy',
    'terminy kredyt hipoteczny',
    'jak długo czeka się na decyzję kredytową',
    'proces kredytowy czas',
    'etapy procesu kredytowego',
    'ile czasu trwa kredyt hipoteczny',
  ],
  openGraph: {
    title: 'Jak długo trwa proces kredytowy? Terminy 2025',
    description:
      'Kompletny przewodnik po czasie trwania procesu kredytowego: etapy, terminy i czynniki wpływające na czas.',
    url: `${siteUrl}/blog/jak-dlugo-trwa-proces-kredytowy`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Jak długo trwa proces kredytowy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jak długo trwa proces kredytowy?',
    description: 'Dowiedz się, ile trwa proces kredytowy od wniosku do podpisania umowy.',
    images: [`${siteUrl}/og-image.jpg`],
  },
}

const stages = [
  {
    stage: 1,
    name: 'Złożenie wniosku',
    duration: '1-2 dni',
    description:
      'Złożenie wniosku kredytowego wraz z wymaganymi dokumentami. Można to zrobić online, telefonicznie lub osobiście w oddziale banku.',
    factors: [
      'Kompletność dokumentów',
      'Sposób złożenia wniosku (online vs. osobiście)',
      'Dostępność banku',
    ],
    icon: HiOutlineDocumentText,
  },
  {
    stage: 2,
    name: 'Weryfikacja dokumentów',
    duration: '3-7 dni',
    description:
      'Bank weryfikuje złożone dokumenty, sprawdza ich kompletność i poprawność. Jeśli brakuje dokumentów, bank poprosi o uzupełnienie.',
    factors: [
      'Kompletność dokumentów',
      'Poprawność dokumentów',
      'Czas odpowiedzi kredytobiorcy',
    ],
    icon: HiOutlineCheckCircle,
  },
  {
    stage: 3,
    name: 'Ocena zdolności kredytowej',
    duration: '5-10 dni',
    description:
      'Bank ocenia zdolność kredytową kredytobiorcy, sprawdza historię kredytową w BIK i analizuje sytuację finansową.',
    factors: [
      'Złożoność sytuacji finansowej',
      'Historia kredytowa',
      'Wielkość kredytu',
    ],
    icon: HiOutlineCalculator,
  },
  {
    stage: 4,
    name: 'Wycena nieruchomości',
    duration: '7-14 dni',
    description:
      'Bank zleca wycenę nieruchomości przez rzeczoznawcę. Wycena jest potrzebna do określenia wartości zabezpieczenia kredytu.',
    factors: [
      'Dostępność rzeczoznawcy',
      'Lokalizacja nieruchomości',
      'Złożoność nieruchomości',
    ],
    icon: HiOutlineCheckCircle,
  },
  {
    stage: 5,
    name: 'Decyzja kredytowa',
    duration: '2-5 dni',
    description:
      'Bank podejmuje decyzję o przyznaniu lub odmowie kredytu. Pozytywna decyzja zawiera warunki kredytu do akceptacji.',
    factors: [
      'Wynik oceny zdolności kredytowej',
      'Wartość wyceny nieruchomości',
      'Polityka banku',
    ],
    icon: HiOutlineCheckCircle,
  },
  {
    stage: 6,
    name: 'Podpisanie umowy',
    duration: '3-7 dni',
    description:
      'Po akceptacji warunków kredytobiorca podpisuje umowę kredytową. Umowa może być podpisana w oddziale banku lub u notariusza.',
    factors: [
      'Dostępność notariusza',
      'Termin wizyty w banku',
      'Przygotowanie dokumentów',
    ],
    icon: HiOutlineDocumentText,
  },
]

const factors = [
  {
    title: 'Kompletność dokumentów',
    description:
      'Niekompletne dokumenty mogą znacznie wydłużyć proces. Przygotuj wszystkie wymagane dokumenty przed złożeniem wniosku.',
    impact: 'wysoki',
  },
  {
    title: 'Sytuacja finansowa',
    description:
      'Złożona sytuacja finansowa (np. nieregularne dochody, wiele źródeł dochodu) może wymagać dodatkowej weryfikacji.',
    impact: 'średni',
  },
  {
    title: 'Wielkość kredytu',
    description:
      'Większe kredyty mogą wymagać dłuższej weryfikacji i dodatkowych zabezpieczeń, co wydłuża proces.',
    impact: 'średni',
  },
  {
    title: 'Dostępność rzeczoznawcy',
    description:
      'Czas wyceny nieruchomości zależy od dostępności rzeczoznawcy i lokalizacji nieruchomości.',
    impact: 'średni',
  },
  {
    title: 'Sezonowość',
    description:
      'Okresy wzmożonego zainteresowania kredytami (np. wiosna, lato) mogą wydłużyć czas oczekiwania na decyzję.',
    impact: 'niski',
  },
]

const faqData = [
  {
    question: 'Ile trwa proces kredytowy?',
    answer:
      'Proces kredytowy trwa zazwyczaj od 2 do 6 tygodni, w zależności od banku i złożoności sprawy. Proces obejmuje: złożenie wniosku (1-2 dni), weryfikację dokumentów (3-7 dni), ocenę zdolności kredytowej (5-10 dni), wycenę nieruchomości (7-14 dni), decyzję kredytową (2-5 dni) i podpisanie umowy (3-7 dni).',
  },
  {
    question: 'Jak długo czeka się na decyzję kredytową?',
    answer:
      'Decyzja kredytowa jest zazwyczaj podejmowana w ciągu 2-5 dni po zakończeniu weryfikacji dokumentów i oceny zdolności kredytowej. Cały proces od złożenia wniosku do decyzji może trwać 2-4 tygodnie, w zależności od banku i złożoności sprawy.',
  },
  {
    question: 'Co może wydłużyć proces kredytowy?',
    answer:
      'Proces kredytowy może być wydłużony przez: niekompletne dokumenty, złożoną sytuację finansową, dużą kwotę kredytu, długi czas wyceny nieruchomości, okres wzmożonego zainteresowania kredytami lub dodatkowe wymagania banku. Warto przygotować wszystkie dokumenty z wyprzedzeniem i być gotowym na dodatkowe pytania.',
  },
  {
    question: 'Czy można przyspieszyć proces kredytowy?',
    answer:
      'Tak, można przyspieszyć proces poprzez: przygotowanie wszystkich dokumentów przed złożeniem wniosku, szybkie odpowiadanie na pytania banku, wybór banku z krótszymi terminami, złożenie wniosku online i unikanie okresów wzmożonego zainteresowania kredytami. Niektóre banki oferują ekspresowe procesy dla prostych spraw.',
  },
  {
    question: 'Ile trwa wycena nieruchomości?',
    answer:
      'Wycena nieruchomości trwa zazwyczaj 7-14 dni, w zależności od dostępności rzeczoznawcy, lokalizacji nieruchomości i złożoności nieruchomości. Niektóre banki mogą zlecić wycenę szybciej, inne mogą potrzebować więcej czasu. Koszt wyceny jest zwykle ponoszony przez kredytobiorcę.',
  },
  {
    question: 'Czy proces kredytowy może trwać dłużej niż 6 tygodni?',
    answer:
      'Tak, proces kredytowy może trwać dłużej niż 6 tygodni w przypadku: złożonej sytuacji finansowej, dużych kwot kredytu, problemów z dokumentami, długiego czasu wyceny nieruchomości lub dodatkowych wymagań banku. Warto być cierpliwym i współpracować z bankiem.',
  },
  {
    question: 'Jak sprawdzić status wniosku?',
    answer:
      'Status wniosku można sprawdzić: przez stronę internetową banku, aplikację mobilną, telefonicznie lub osobiście w oddziale banku. Niektóre banki wysyłają powiadomienia o zmianach statusu wniosku. Warto regularnie sprawdzać status i być w kontakcie z bankiem.',
  },
  {
    question: 'Czy można złożyć wniosek w kilku bankach jednocześnie?',
    answer:
      'Tak, można złożyć wniosek w kilku bankach jednocześnie, aby porównać oferty i wybrać najlepszą. Pamiętaj jednak, że każde złożenie wniosku jest odnotowywane w BIK i może wpłynąć na historię kredytową. Warto najpierw porównać oferty w kalkulatorze, a następnie złożyć wniosek w wybranym banku.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Jak długo trwa proces kredytowy? Terminy 2025',
  description:
    'Kompletny przewodnik po czasie trwania procesu kredytowego: etapy, terminy i czynniki wpływające na czas.',
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
  datePublished: '2026-02-11',
  dateModified: '2026-02-11',
  mainEntityOfPage: `${siteUrl}/blog/jak-dlugo-trwa-proces-kredytowy`,
  articleSection: ['Proces kredytowy', 'Kredyt hipoteczny', 'Terminy'],
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
      name: 'Jak długo trwa proces kredytowy?',
      item: `${siteUrl}/blog/jak-dlugo-trwa-proces-kredytowy`,
    },
  ],
}

const relatedArticles = [
  {
    slug: 'jak-zlozyc-wniosek-o-kredyt-hipoteczny',
    title: 'Jak złożyć wniosek o kredyt hipoteczny?',
    description: 'Krok po kroku przewodnik po składaniu wniosku.',
  },
  {
    slug: 'dokumenty-do-kredytu-hipotecznego',
    title: 'Dokumenty do kredytu hipotecznego',
    description: 'Kompletna lista dokumentów potrzebnych do kredytu.',
  },
  {
    slug: 'jak-obliczyc-zdolnosc-kredytowa',
    title: 'Jak obliczyć zdolność kredytową?',
    description: 'Dowiedz się, jak banki obliczają zdolność kredytową i jak samodzielnie oszacować swoją zdolność.',
  },
  {
    slug: 'refinansowanie-kredytu-hipotecznego',
    title: 'Refinansowanie kredytu hipotecznego',
    description: 'Dowiedz się, czy refinansowanie się opłaca.',
  }
]

export default function ProcessDurationPage() {
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
              <BreadcrumbCurrent>Jak długo trwa proces kredytowy?</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>

        <HeroSection>
          <HeroEyebrow>Proces kredytowy</HeroEyebrow>
          <HeroTitle>Jak długo trwa proces kredytowy? Terminy 2025</HeroTitle>
          <HeroLead>
            Proces kredytowy może wydawać się długi i skomplikowany, ale odpowiednie przygotowanie może go
            znacznie przyspieszyć. W tym przewodniku dowiesz się, ile trwa proces kredytowy, jakie są jego
            etapy i co może wpłynąć na czas trwania. Przed złożeniem wniosku sprawdź swoją zdolność kredytową
            w naszym kalkulatorze, aby przygotować się do procesu.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź zdolność kredytową przed wnioskiem
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
                <strong>Proces trwa zazwyczaj 2-6 tygodni</strong> - od złożenia wniosku do podpisania umowy.
              </li>
              <li>
                <strong>Najdłuższy etap to wycena nieruchomości</strong> - może trwać 7-14 dni.
              </li>
              <li>
                <strong>Kompletne dokumenty przyspieszają proces</strong> - przygotuj wszystkie dokumenty przed
                wnioskiem.
              </li>
              <li>
                <strong>Niektóre banki oferują ekspresowe procesy</strong> - sprawdź oferty banków.
              </li>
            </IntroList>
          </IntroContent>
        </IntroCard>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineClock size={18} />
              Etapy procesu
            </SectionBadge>
            <SectionTitle>Etapy procesu kredytowego i ich czas trwania</SectionTitle>
            <SectionSubtitle>
              Oto szczegółowy przegląd etapów procesu kredytowego i czasu trwania każdego etapu.
            </SectionSubtitle>
          </SectionHeader>
          <StagesList role="list">
            {stages.map((stage) => {
              const IconComponent = stage.icon
              return (
                <StageCard key={stage.stage} role="listitem">
                  <StageHeader>
                    <StageNumber>{stage.stage}</StageNumber>
                    <StageIcon aria-hidden="true">
                      <IconComponent size={24} />
                    </StageIcon>
                    <StageInfo>
                      <StageName>{stage.name}</StageName>
                      <StageDuration>{stage.duration}</StageDuration>
                    </StageInfo>
                  </StageHeader>
                  <StageDescription>{stage.description}</StageDescription>
                  <StageFactors>
                    <StageFactorsTitle>Czynniki wpływające na czas:</StageFactorsTitle>
                    <StageFactorsList>
                      {stage.factors.map((factor) => (
                        <li key={factor}>{factor}</li>
                      ))}
                    </StageFactorsList>
                  </StageFactors>
                </StageCard>
              )
            })}
          </StagesList>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineCheckCircle size={18} />
              Czynniki
            </SectionBadge>
            <SectionTitle>Co wpływa na czas trwania procesu?</SectionTitle>
            <SectionSubtitle>
              Oto główne czynniki, które mogą wpłynąć na czas trwania procesu kredytowego.
            </SectionSubtitle>
          </SectionHeader>
          <FactorsGrid role="list">
            {factors.map((factor) => (
              <FactorCard key={factor.title} role="listitem">
                <FactorHeader>
                  <FactorTitle>{factor.title}</FactorTitle>
                  <FactorBadge impact={factor.impact}>
                    {factor.impact === 'wysoki' ? 'Wysoki wpływ' : factor.impact === 'średni' ? 'Średni wpływ' : 'Niski wpływ'}
                  </FactorBadge>
                </FactorHeader>
                <FactorDescription>{factor.description}</FactorDescription>
              </FactorCard>
            ))}
          </FactorsGrid>
          <CtaBox>
            <CtaTitle>Przygotuj się do procesu kredytowego</CtaTitle>
            <CtaText>
              Przed złożeniem wniosku sprawdź swoją zdolność kredytową w naszym kalkulatorze. To pomoże Ci
              przygotować się do procesu i ocenić, na jaką kwotę możesz liczyć.
            </CtaText>
            <CtaButton href="/kalkulator/kredyt-hipoteczny">
              Sprawdź zdolność w kalkulatorze
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
            <SectionTitle>Najczęściej zadawane pytania o czas trwania procesu</SectionTitle>
            <SectionSubtitle>
              Odpowiedzi na najpopularniejsze pytania dotyczące czasu trwania procesu kredytowego.
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
              Proces kredytowy trwa zazwyczaj od 2 do 6 tygodni, w zależności od banku i złożoności sprawy.
              Proces obejmuje kilka etapów: złożenie wniosku, weryfikację dokumentów, ocenę zdolności
              kredytowej, wycenę nieruchomości, decyzję kredytową i podpisanie umowy. Najdłuższym etapem jest
              zazwyczaj wycena nieruchomości, która może trwać 7-14 dni.
            </SummaryText>
            <SummaryText>
              Aby przyspieszyć proces, warto: przygotować wszystkie dokumenty przed złożeniem wniosku, szybko
              odpowiadać na pytania banku, wybrać bank z krótszymi terminami i unikać okresów wzmożonego
              zainteresowania kredytami. Przed złożeniem wniosku sprawdź swoją zdolność kredytową w naszym
              kalkulatorze kredytu hipotecznego. Przeczytaj też nasze przewodniki o{' '}
              <Link href="/blog/jak-zlozyc-wniosek-o-kredyt-hipoteczny" className="text-white underline hover:text-emerald-50">
                jak złożyć wniosek o kredyt hipoteczny
              </Link>
              ,{' '}
              <Link href="/blog/dokumenty-do-kredytu-hipotecznego" className="text-white underline hover:text-emerald-50">
                dokumentach do kredytu hipotecznego
              </Link>
              {' '}i{' '}
              <Link href="/blog/jak-obliczyc-zdolnosc-kredytowa" className="text-white underline hover:text-emerald-50">
                jak obliczyć zdolność kredytową
              </Link>
              .
            </SummaryText>
            <SummaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź zdolność kredytową przed wnioskiem
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

const StagesList = tw.ul`mx-auto max-w-4xl space-y-6`
const StageCard = tw.li`rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm`
const StageHeader = tw.div`mb-4 flex items-center gap-4`
const StageNumber = tw.span`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white`
const StageIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const StageInfo = tw.div`flex-1`
const StageName = tw.h3`text-xl font-semibold text-gray-900`
const StageDuration = tw.p`text-sm font-semibold text-emerald-600`
const StageDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const StageFactors = tw.div`rounded-lg bg-gray-50 p-4`
const StageFactorsTitle = tw.h4`mb-2 text-sm font-semibold text-gray-900`
const StageFactorsList = tw.ul`grid gap-2 text-sm text-gray-600 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`

const FactorsGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const FactorCard = tw.li`rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm`
const FactorHeader = tw.div`mb-3 flex items-start justify-between gap-4`
const FactorTitle = tw.h3`flex-1 text-xl font-semibold text-gray-900`
const FactorBadge = tw.span<{ impact: string }>`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
  ({ impact }) =>
    impact === 'wysoki'
      ? 'bg-red-100 text-red-700'
      : impact === 'średni'
        ? 'bg-amber-100 text-amber-700'
        : 'bg-gray-100 text-gray-700'
}`
const FactorDescription = tw.p`text-sm leading-relaxed text-gray-600`

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

