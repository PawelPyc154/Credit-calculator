import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowLongRight,
  HiOutlineCalculator,
  HiOutlineCheckCircle,
  HiOutlineDocumentText,
  HiOutlineHome,
  HiOutlineSparkles,
  HiOutlineTrophy,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'
import { getPostRobotsMetadata } from 'utils/blog-posts'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {  robots: getPostRobotsMetadata('jak-korzystac-z-kalkulatora-kredytu-hipotecznego'),

  title: 'Kalkulator kredytu hipotecznego - jak z niego korzystać? Poradnik',
  description:
    'Dowiedz się, jak korzystać z kalkulatora kredytu hipotecznego: wprowadzanie danych, interpretacja wyników i porównywanie ofert banków. Kompletny przewodnik.',
  alternates: {
    canonical: `${siteUrl}/blog/jak-korzystac-z-kalkulatora-kredytu-hipotecznego`,
  },
  keywords: [
    'kalkulator kredytu hipotecznego',
    'jak korzystać z kalkulatora kredytu',
    'kalkulator kredytowy',
    'obliczanie raty kredytu',
    'zdolność kredytowa kalkulator',
    'porównanie ofert kredytowych',
    'kalkulator RRSO',
  ],
  openGraph: {
    title: 'Kalkulator kredytu hipotecznego - jak z niego korzystać? Poradnik',
    description:
      'Kompletny przewodnik po korzystaniu z kalkulatora kredytu hipotecznego: wprowadzanie danych, interpretacja wyników i porównywanie ofert.',
    url: `${siteUrl}/blog/jak-korzystac-z-kalkulatora-kredytu-hipotecznego`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/images/blog/jak-korzystac-z-kalkulatora-kredytu-hipotecznego-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Kalkulator kredytu hipotecznego',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kalkulator kredytu hipotecznego - jak korzystać?',
    description: 'Dowiedz się, jak korzystać z kalkulatora kredytu hipotecznego.',
    images: [`${siteUrl}/images/blog/jak-korzystac-z-kalkulatora-kredytu-hipotecznego-og.jpg`],
  },
}

const steps = [
  {
    step: 1,
    title: 'Wprowadź podstawowe parametry',
    description:
      'Zacznij od wprowadzenia podstawowych parametrów: kwota kredytu, okres kredytowania, wkład własny i cel kredytu. Te parametry są podstawą do obliczenia raty i zdolności kredytowej.',
    details: [
      'Kwota kredytu - ile chcesz pożyczyć',
      'Okres kredytowania - na ile lat',
      'Wkład własny - ile masz własnych środków',
      'Cel kredytu - zakup, refinansowanie, budowa',
    ],
    icon: HiOutlineCalculator,
  },
  {
    step: 2,
    title: 'Podaj informacje o dochodzie',
    description:
      'Wprowadź informacje o swoim dochodzie: miesięczny dochód, źródło dochodu i inne dochody. To pozwoli kalkulatorowi obliczyć Twoją zdolność kredytową.',
    details: [
      'Miesięczny dochód netto',
      'Źródło dochodu (umowa o pracę, działalność)',
      'Dodatkowe dochody (jeśli masz)',
      'Liczba osób w gospodarstwie',
    ],
    icon: HiOutlineHome,
  },
  {
    step: 3,
    title: 'Sprawdź zobowiązania',
    description:
      'Wprowadź informacje o swoich zobowiązaniach finansowych: kredyty, pożyczki, limity kredytowe i inne zobowiązania. To wpływa na zdolność kredytową.',
    details: [
      'Miesięczne raty kredytów',
      'Pożyczki i limity',
      'Inne zobowiązania finansowe',
      'Alimenty (jeśli płacisz)',
    ],
    icon: HiOutlineDocumentText,
  },
  {
    step: 4,
    title: 'Porównaj oferty banków',
    description:
      'Kalkulator automatycznie porówna oferty różnych banków i pokaże najlepsze opcje. Możesz zobaczyć RRSO, oprocentowanie, prowizje i całkowity koszt kredytu.',
    details: [
      'RRSO - rzeczywisty koszt kredytu',
      'Oprocentowanie - stałe lub zmienne',
      'Prowizje i opłaty',
      'Całkowity koszt kredytu',
    ],
    icon: HiOutlineTrophy,
  },
  {
    step: 5,
    title: 'Przeanalizuj wyniki',
    description:
      'Przeanalizuj wyniki kalkulatora: wysokość raty, zdolność kredytową, całkowity koszt kredytu i najlepsze oferty. Użyj tych informacji do podjęcia decyzji.',
    details: [
      'Wysokość raty miesięcznej',
      'Zdolność kredytowa',
      'Całkowity koszt kredytu',
      'Najlepsze oferty banków',
    ],
    icon: HiOutlineCheckCircle,
  },
]

const tips = [
  {
    title: 'Używaj realistycznych danych',
    description:
      'Wprowadzaj realistyczne dane do kalkulatora, aby uzyskać dokładne wyniki. Nie zawyżaj dochodu ani nie zaniżaj zobowiązań.',
    icon: HiOutlineCheckCircle,
  },
  {
    title: 'Sprawdzaj różne scenariusze',
    description:
      'Sprawdzaj różne scenariusze: różne kwoty kredytu, okresy kredytowania i wkłady własne. To pomoże Ci znaleźć najlepsze rozwiązanie.',
    icon: HiOutlineCalculator,
  },
  {
    title: 'Porównuj oferty banków',
    description:
      'Używaj kalkulatora do porównywania ofert różnych banków. Zwróć uwagę na RRSO, a nie tylko oprocentowanie.',
    icon: HiOutlineTrophy,
  },
  {
    title: 'Sprawdzaj zdolność kredytową',
    description:
      'Regularnie sprawdzaj swoją zdolność kredytową w kalkulatorze, szczególnie przed złożeniem wniosku o kredyt.',
    icon: HiOutlineHome,
  },
]

const faqData = [
  {
    question: 'Jak korzystać z kalkulatora kredytu hipotecznego?',
    answer:
      'Aby korzystać z kalkulatora kredytu hipotecznego, wprowadź podstawowe parametry (kwota kredytu, okres kredytowania, wkład własny), informacje o dochodzie, zobowiązania finansowe i porównaj oferty banków. Kalkulator automatycznie obliczy ratę, zdolność kredytową i pokaże najlepsze oferty.',
  },
  {
    question: 'Jakie dane są potrzebne do kalkulatora?',
    answer:
      'Do kalkulatora potrzebne są: kwota kredytu, okres kredytowania, wkład własny, cel kredytu, miesięczny dochód netto, źródło dochodu, zobowiązania finansowe (kredyty, pożyczki) i liczba osób w gospodarstwie. Wprowadź realistyczne dane, aby uzyskać dokładne wyniki.',
  },
  {
    question: 'Czy wyniki kalkulatora są dokładne?',
    answer:
      'Wyniki kalkulatora są szacunkowe i mogą różnić się od rzeczywistych warunków oferowanych przez banki. Kalkulator pomaga oszacować zdolność kredytową i porównać oferty, ale ostateczne warunki ustala bank po weryfikacji dokumentów.',
  },
  {
    question: 'Jak obliczyć zdolność kredytową w kalkulatorze?',
    answer:
      'Kalkulator automatycznie oblicza zdolność kredytową na podstawie wprowadzonych danych: dochodu, zobowiązań finansowych, okresu kredytowania i innych czynników. Wprowadź dokładne dane, aby uzyskać realistyczny wynik.',
  },
  {
    question: 'Jak porównać oferty banków w kalkulatorze?',
    answer:
      'Kalkulator automatycznie porównuje oferty różnych banków i pokazuje najlepsze opcje. Możesz zobaczyć RRSO, oprocentowanie, prowizje i całkowity koszt kredytu. Zwróć uwagę na RRSO, które pokazuje pełny koszt kredytu.',
  },
  {
    question: 'Czy mogę sprawdzić różne scenariusze w kalkulatorze?',
    answer:
      'Tak, możesz sprawdzić różne scenariusze w kalkulatorze: różne kwoty kredytu, okresy kredytowania, wkłady własne i inne parametry. To pomoże Ci znaleźć najlepsze rozwiązanie dla swojej sytuacji.',
  },
  {
    question: 'Jak często powinienem używać kalkulatora?',
    answer:
      'Warto używać kalkulatora regularnie, szczególnie przed złożeniem wniosku o kredyt, gdy zmienia się sytuacja finansowa lub gdy chcesz sprawdzić możliwości refinansowania. Kalkulator pomaga śledzić zdolność kredytową i porównywać oferty.',
  },
  {
    question: 'Czy kalkulator jest darmowy?',
    answer:
      'Tak, nasz kalkulator kredytu hipotecznego jest całkowicie darmowy i dostępny online. Możesz z niego korzystać bez ograniczeń, aby obliczyć zdolność kredytową i porównać oferty banków.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Kalkulator kredytu hipotecznego - jak z niego korzystać? Poradnik',
  description:
    'Kompletny przewodnik po korzystaniu z kalkulatora kredytu hipotecznego: wprowadzanie danych, interpretacja wyników i porównywanie ofert.',
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
  datePublished: '2026-03-31',
  dateModified: '2026-03-31',
  mainEntityOfPage: `${siteUrl}/blog/jak-korzystac-z-kalkulatora-kredytu-hipotecznego`,
  articleSection: ['Kalkulator', 'Kredyt hipoteczny', 'Poradniki'],
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
      name: 'Kalkulator kredytu hipotecznego - jak z niego korzystać?',
      item: `${siteUrl}/blog/jak-korzystac-z-kalkulatora-kredytu-hipotecznego`,
    },
  ],
}

const relatedArticles = [
  {
    slug: 'jak-obliczyc-zdolnosc-kredytowa',
    title: 'Jak obliczyć zdolność kredytową?',
    description: 'Dowiedz się, jak banki obliczają zdolność kredytową i jak samodzielnie oszacować swoją zdolność.',
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
  },
  {
    slug: 'jak-wybrac-najlepszy-kredyt-hipoteczny',
    title: 'Jak wybrać najlepszy kredyt hipoteczny?',
    description: 'Kompleksowy przewodnik po wyborze najlepszego kredytu.',
  }
]

export default function CalculatorGuidePage() {
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
              <BreadcrumbCurrent>Kalkulator kredytu hipotecznego - jak z niego korzystać?</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>

        <HeroSection>
          <HeroEyebrow>Kalkulator</HeroEyebrow>
          <HeroTitle>Kalkulator kredytu hipotecznego - jak z niego korzystać? Poradnik</HeroTitle>
          <HeroLead>
            Kalkulator kredytu hipotecznego to narzędzie, które pomaga obliczyć zdolność kredytową, wysokość
            raty i porównać oferty różnych banków. W tym przewodniku dowiesz się, jak korzystać z kalkulatora
            kredytu hipotecznego krok po kroku, jakie dane wprowadzić i jak interpretować wyniki. Zacznij od
            sprawdzenia swojej zdolności kredytowej w naszym kalkulatorze.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Użyj kalkulatora kredytu hipotecznego
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
                <strong>Kalkulator jest darmowy</strong> - możesz z niego korzystać bez ograniczeń, aby
                obliczyć zdolność kredytową i porównać oferty.
              </li>
              <li>
                <strong>Wprowadzaj realistyczne dane</strong> - dokładne dane zapewniają dokładne wyniki.
              </li>
              <li>
                <strong>Sprawdzaj różne scenariusze</strong> - testuj różne kwoty, okresy i wkłady własne.
              </li>
              <li>
                <strong>Porównuj oferty banków</strong> - kalkulator automatycznie porównuje oferty i pokazuje
                najlepsze opcje.
              </li>
            </IntroList>
          </IntroContent>
        </IntroCard>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineCalculator size={18} />
              Krok po kroku
            </SectionBadge>
            <SectionTitle>Jak korzystać z kalkulatora - krok po kroku</SectionTitle>
            <SectionSubtitle>
              Oto szczegółowy przewodnik po korzystaniu z kalkulatora kredytu hipotecznego, od wprowadzenia
              danych do analizy wyników.
            </SectionSubtitle>
          </SectionHeader>
          <StepsList role="list">
            {steps.map((step) => {
              const IconComponent = step.icon
              return (
                <StepCard key={step.step} role="listitem">
                  <StepHeader>
                    <StepNumber>{step.step}</StepNumber>
                    <StepIcon aria-hidden="true">
                      <IconComponent size={24} />
                    </StepIcon>
                  </StepHeader>
                  <StepContent>
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                    <StepDetails>
                      <StepDetailsTitle>Szczegóły:</StepDetailsTitle>
                      <StepDetailsList>
                        {step.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </StepDetailsList>
                    </StepDetails>
                  </StepContent>
                </StepCard>
              )
            })}
          </StepsList>
          <CtaBox>
            <CtaTitle>Wypróbuj kalkulator kredytu hipotecznego</CtaTitle>
            <CtaText>
              Nasz kalkulator kredytu hipotecznego pozwala obliczyć zdolność kredytową, wysokość raty i
              porównać oferty różnych banków. Wprowadź swoje dane i zobacz, na jaką kwotę możesz liczyć.
            </CtaText>
            <CtaButton href="/kalkulator/kredyt-hipoteczny">
              Użyj kalkulatora teraz
              <HiOutlineArrowLongRight size={18} />
            </CtaButton>
          </CtaBox>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineCheckCircle size={18} />
              Wskazówki
            </SectionBadge>
            <SectionTitle>Praktyczne wskazówki</SectionTitle>
            <SectionSubtitle>
              Oto praktyczne wskazówki, które pomogą Ci efektywnie korzystać z kalkulatora kredytu hipotecznego.
            </SectionSubtitle>
          </SectionHeader>
          <TipsGrid role="list">
            {tips.map((tip) => {
              const IconComponent = tip.icon
              return (
                <TipCard key={tip.title} role="listitem">
                  <TipIcon aria-hidden="true">
                    <IconComponent size={24} />
                  </TipIcon>
                  <TipTitle>{tip.title}</TipTitle>
                  <TipDescription>{tip.description}</TipDescription>
                </TipCard>
              )
            })}
          </TipsGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineDocumentText size={18} />
              FAQ
            </SectionBadge>
            <SectionTitle>Najczęściej zadawane pytania o kalkulator</SectionTitle>
            <SectionSubtitle>
              Odpowiedzi na najpopularniejsze pytania dotyczące korzystania z kalkulatora kredytu hipotecznego.
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
              Kalkulator kredytu hipotecznego to narzędzie, które pomaga obliczyć zdolność kredytową, wysokość
              raty i porównać oferty różnych banków. Aby korzystać z kalkulatora, wprowadź podstawowe
              parametry (kwota kredytu, okres kredytowania, wkład własny), informacje o dochodzie,
              zobowiązania finansowe i porównaj oferty banków. Kalkulator automatycznie obliczy ratę, zdolność
              kredytową i pokaże najlepsze oferty.
            </SummaryText>
            <SummaryText>
              Warto używać kalkulatora regularnie, szczególnie przed złożeniem wniosku o kredyt, gdy zmienia
              się sytuacja finansowa lub gdy chcesz sprawdzić możliwości refinansowania. Wprowadzaj realistyczne
              dane, sprawdzaj różne scenariusze i porównuj oferty banków, zwracając uwagę na RRSO, a nie tylko
              oprocentowanie. Wypróbuj nasz kalkulator kredytu hipotecznego już teraz. Przeczytaj też nasze
              przewodniki o{' '}
              <Link href="/blog/jak-obliczyc-zdolnosc-kredytowa" className="text-white underline hover:text-emerald-50">
                jak obliczyć zdolność kredytową
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
              Użyj kalkulatora kredytu hipotecznego
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

const StepsList = tw.ul`mx-auto max-w-4xl space-y-6`
const StepCard = tw.li`flex gap-6 rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm`
const StepHeader = tw.div`flex shrink-0 items-start gap-4`
const StepNumber = tw.span`flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white`
const StepIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const StepContent = tw.div`flex-1`
const StepTitle = tw.h3`mb-2 text-xl font-semibold text-gray-900`
const StepDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const StepDetails = tw.div`rounded-lg bg-gray-50 p-4`
const StepDetailsTitle = tw.h4`mb-2 text-sm font-semibold text-gray-900`
const StepDetailsList = tw.ul`grid gap-2 text-sm text-gray-600 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`

const TipsGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const TipCard = tw.li`flex h-full flex-col rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1 hover:shadow-lg`
const TipIcon = tw.span`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const TipTitle = tw.h3`mb-2 text-xl font-semibold text-gray-900`
const TipDescription = tw.p`text-sm leading-relaxed text-gray-600`

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

