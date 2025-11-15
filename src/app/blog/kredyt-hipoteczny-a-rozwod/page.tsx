import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowLongRight,
  HiOutlineCalculator,
  HiOutlineCheckCircle,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlineSparkles,
  HiOutlineUsers,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'
import { getPostRobotsMetadata } from 'utils/blog-posts'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {  robots: getPostRobotsMetadata('kredyt-hipoteczny-a-rozwod'),

  title: 'Kredyt hipoteczny a rozwód - co się dzieje z kredytem?',
  description:
    'Dowiedz się, co się dzieje z kredytem hipotecznym przy rozwodzie: podział kredytu, przejęcie kredytu, sprzedaż nieruchomości i inne rozwiązania. Sprawdź opcje w kalkulatorze.',
  alternates: {
    canonical: `${siteUrl}/blog/kredyt-hipoteczny-a-rozwod`,
  },
  keywords: [
    'kredyt hipoteczny rozwód',
    'rozwód a kredyt hipoteczny',
    'podział kredytu przy rozwodzie',
    'przejęcie kredytu po rozwodzie',
    'sprzedaż nieruchomości rozwód',
    'co z kredytem przy rozwodzie',
    'rozwód kredyt hipoteczny',
  ],
  openGraph: {
    title: 'Kredyt hipoteczny a rozwód - co się dzieje z kredytem?',
    description:
      'Kompletny przewodnik po rozwiązaniach kredytu hipotecznego przy rozwodzie: podział kredytu, przejęcie i sprzedaż nieruchomości.',
    url: `${siteUrl}/blog/kredyt-hipoteczny-a-rozwod`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Kredyt hipoteczny a rozwód',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kredyt hipoteczny a rozwód',
    description: 'Dowiedz się, co się dzieje z kredytem hipotecznym przy rozwodzie.',
    images: [`${siteUrl}/og-image.jpg`],
  },
}

const solutions = [
  {
    solution: 'Sprzedaż nieruchomości',
    description:
      'Najczęstsze rozwiązanie to sprzedaż nieruchomości i spłata kredytu z uzyskanych środków. Pozostałe środki są dzielone między małżonków zgodnie z umową lub wyrokiem sądu.',
    pros: [
      'Szybkie rozwiązanie problemu',
      'Spłata całego kredytu',
      'Podział pozostałych środków',
      'Brak dalszych zobowiązań',
    ],
    cons: [
      'Utrata nieruchomości',
      'Koszty sprzedaży',
      'Możliwe straty finansowe',
      'Trudności w znalezieniu kupującego',
    ],
    icon: HiOutlineUsers,
  },
  {
    solution: 'Przejęcie kredytu przez jednego małżonka',
    description:
      'Jeden z małżonków może przejąć kredyt i nieruchomość, jeśli ma zdolność kredytową. Bank musi wyrazić zgodę na przejęcie kredytu przez jedną osobę.',
    pros: [
      'Zachowanie nieruchomości',
      'Jeden małżonek przejmuje kredyt',
      'Brak konieczności sprzedaży',
      'Możliwość wykupu udziału drugiego małżonka',
    ],
    cons: [
      'Wymagana zdolność kredytowa',
      'Zgoda banku',
      'Wykup udziału drugiego małżonka',
      'Wyższe raty dla jednej osoby',
    ],
    icon: HiOutlineCheckCircle,
  },
  {
    solution: 'Wspólna spłata kredytu',
    description:
      'Małżonkowie mogą kontynuować wspólną spłatę kredytu po rozwodzie, jeśli oboje mają zdolność kredytową i są w stanie współpracować. To wymaga dobrej komunikacji.',
    pros: [
      'Zachowanie nieruchomości',
      'Wspólna odpowiedzialność',
      'Niższe raty dla każdego',
      'Możliwość późniejszej sprzedaży',
    ],
    cons: [
      'Wymagana współpraca',
      'Ryzyko konfliktów',
      'Wspólna odpowiedzialność',
      'Trudności w zarządzaniu',
    ],
    icon: HiOutlineUsers,
  },
]

const steps = [
  {
    step: 1,
    title: 'Skontaktuj się z bankiem',
    description:
      'Skontaktuj się z bankiem jak najszybciej po podjęciu decyzji o rozwodzie. Poinformuj bank o sytuacji i poproś o informacje o możliwych rozwiązaniach.',
    icon: HiOutlineDocumentText,
  },
  {
    step: 2,
    title: 'Sprawdź zdolność kredytową',
    description:
      'Sprawdź zdolność kredytową każdego z małżonków w kalkulatorze. To pomoże określić, czy któryś z małżonków może przejąć kredyt samodzielnie.',
    icon: HiOutlineCalculator,
  },
  {
    step: 3,
    title: 'Rozważ wszystkie opcje',
    description:
      'Rozważ wszystkie opcje: sprzedaż nieruchomości, przejęcie kredytu przez jednego małżonka lub wspólną spłatę. Każde rozwiązanie ma swoje zalety i wady.',
    icon: HiOutlineCheckCircle,
  },
  {
    step: 4,
    title: 'Uzgodnij rozwiązanie',
    description:
      'Uzgodnij rozwiązanie z byłym małżonkiem lub w postępowaniu sądowym. Ważne jest, aby rozwiązanie było zgodne z umową kredytową i prawem.',
    icon: HiOutlineDocumentText,
  },
]

const faqData = [
  {
    question: 'Co się dzieje z kredytem hipotecznym przy rozwodzie?',
    answer:
      'Przy rozwodzie kredyt hipoteczny może być rozwiązany na kilka sposobów: sprzedaż nieruchomości i spłata kredytu, przejęcie kredytu przez jednego małżonka (jeśli ma zdolność kredytową) lub wspólna spłata kredytu po rozwodzie. Ważne jest, aby skontaktować się z bankiem jak najszybciej i uzgodnić rozwiązanie.',
  },
  {
    question: 'Czy mogę przejąć kredyt samodzielnie po rozwodzie?',
    answer:
      'Tak, możesz przejąć kredyt samodzielnie po rozwodzie, jeśli masz zdolność kredytową i bank wyrazi zgodę. Bank sprawdzi Twoją zdolność kredytową i może wymagać dodatkowego zabezpieczenia. Sprawdź swoją zdolność kredytową w kalkulatorze przed podjęciem decyzji.',
  },
  {
    question: 'Czy muszę sprzedać nieruchomość przy rozwodzie?',
    answer:
      'Nie, nie musisz sprzedawać nieruchomości przy rozwodzie. Możesz przejąć kredyt samodzielnie (jeśli masz zdolność kredytową) lub kontynuować wspólną spłatę z byłym małżonkiem. Sprzedaż nieruchomości to jedna z opcji, ale nie jedyna.',
  },
  {
    question: 'Jak podzielić kredyt przy rozwodzie?',
    answer:
      'Kredyt hipoteczny nie może być podzielony między małżonków - zawsze jest wspólnym zobowiązaniem. Możesz jednak: sprzedać nieruchomość i spłacić kredyt, przejąć kredyt samodzielnie lub kontynuować wspólną spłatę. Podział nieruchomości i kredytu jest uzgadniany w umowie lub wyroku sądu.',
  },
  {
    question: 'Czy bank musi wyrazić zgodę na przejęcie kredytu?',
    answer:
      'Tak, bank musi wyrazić zgodę na przejęcie kredytu przez jednego małżonka. Bank sprawdzi zdolność kredytową osoby przejmującej kredyt i może wymagać dodatkowego zabezpieczenia. Proces może trwać kilka tygodni.',
  },
  {
    question: 'Co jeśli nie mogę spłacać kredytu po rozwodzie?',
    answer:
      'Jeśli nie możesz spłacać kredytu po rozwodzie, możesz: sprzedać nieruchomość i spłacić kredyt, poprosić byłego małżonka o przejęcie kredytu, rozważyć restrukturyzację kredytu lub skontaktować się z bankiem w sprawie możliwych rozwiązań. Ważne jest szybkie działanie.',
  },
  {
    question: 'Jak sprawdzić zdolność kredytową po rozwodzie?',
    answer:
      'Aby sprawdzić zdolność kredytową po rozwodzie, użyj kalkulatora kredytu hipotecznego. Wprowadź swoje parametry (dochód, zobowiązania) i sprawdź, czy możesz przejąć kredyt samodzielnie. To pomoże Ci podjąć decyzję o najlepszym rozwiązaniu.',
  },
  {
    question: 'Czy mogę kontynuować wspólną spłatę kredytu po rozwodzie?',
    answer:
      'Tak, możesz kontynuować wspólną spłatę kredytu po rozwodzie, jeśli oboje małżonkowie mają zdolność kredytową i są w stanie współpracować. To wymaga dobrej komunikacji i może być trudne w praktyce, ale jest możliwe.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Kredyt hipoteczny a rozwód - co się dzieje z kredytem?',
  description:
    'Kompletny przewodnik po rozwiązaniach kredytu hipotecznego przy rozwodzie: podział kredytu, przejęcie i sprzedaż nieruchomości.',
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
  datePublished: '2026-05-05',
  dateModified: '2026-05-05',
  mainEntityOfPage: `${siteUrl}/blog/kredyt-hipoteczny-a-rozwod`,
  articleSection: ['Rozwód', 'Kredyt hipoteczny', 'Poradniki'],
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
      name: 'Kredyt hipoteczny a rozwód',
      item: `${siteUrl}/blog/kredyt-hipoteczny-a-rozwod`,
    },
  ],
}

const relatedArticles = [
  {
    slug: 'kredyt-hipoteczny-a-smierc-kredytobiorcy',
    title: 'Kredyt hipoteczny a śmierć kredytobiorcy',
    description: 'Rozwiązanie kredytu po śmierci kredytobiorcy.',
  },
  {
    slug: 'co-zrobic-gdy-nie-mozesz-splacac-kredytu',
    title: 'Co zrobić, gdy nie możesz spłacać kredytu?',
    description: 'Rozwiązania problemów ze spłatą kredytu.',
  },
  {
    slug: 'jak-negocjowac-warunki-kredytu-hipotecznego',
    title: 'Jak negocjować warunki kredytu hipotecznego?',
    description: 'Dowiedz się, jak negocjować warunki kredytu.',
  },
  {
    slug: 'refinansowanie-kredytu-hipotecznego',
    title: 'Refinansowanie kredytu hipotecznego',
    description: 'Dowiedz się, czy refinansowanie się opłaca.',
  }
]

export default function DivorcePage() {
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
              <BreadcrumbCurrent>Kredyt hipoteczny a rozwód</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>

        <HeroSection>
          <HeroEyebrow>Rozwód</HeroEyebrow>
          <HeroTitle>Kredyt hipoteczny a rozwód - co się dzieje z kredytem?</HeroTitle>
          <HeroLead>
            Rozwód to trudna sytuacja, która może skomplikować spłatę kredytu hipotecznego. Kredyt hipoteczny
            jest wspólnym zobowiązaniem małżonków, więc rozwód wymaga rozwiązania kwestii kredytu i
            nieruchomości. W tym przewodniku dowiesz się, co się dzieje z kredytem hipotecznym przy rozwodzie,
            jakie masz opcje i jak je rozwiązać. Sprawdź swoją zdolność kredytową w kalkulatorze przed
            podjęciem decyzji.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź zdolność kredytową w kalkulatorze
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
                <strong>Kredyt jest wspólnym zobowiązaniem</strong> - oboje małżonkowie są odpowiedzialni za
                spłatę.
              </li>
              <li>
                <strong>Masz kilka opcji</strong> - sprzedaż nieruchomości, przejęcie kredytu lub wspólna
                spłata.
              </li>
              <li>
                <strong>Skontaktuj się z bankiem</strong> - jak najszybciej po podjęciu decyzji o rozwodzie.
              </li>
              <li>
                <strong>Sprawdź zdolność kredytową</strong> - przed podjęciem decyzji o przejęciu kredytu.
              </li>
            </IntroList>
          </IntroContent>
        </IntroCard>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineUsers size={18} />
              Rozwiązania
            </SectionBadge>
            <SectionTitle>Jakie są rozwiązania kredytu przy rozwodzie?</SectionTitle>
            <SectionSubtitle>
              Oto główne rozwiązania kredytu hipotecznego przy rozwodzie i ich zalety oraz wady.
            </SectionSubtitle>
          </SectionHeader>
          <SolutionsGrid role="list">
            {solutions.map((sol) => {
              const IconComponent = sol.icon
              return (
                <SolutionCard key={sol.solution} role="listitem">
                  <SolutionHeader>
                    <SolutionIcon aria-hidden="true">
                      <IconComponent size={24} />
                    </SolutionIcon>
                    <SolutionTitle>{sol.solution}</SolutionTitle>
                  </SolutionHeader>
                  <SolutionDescription>{sol.description}</SolutionDescription>
                  <SolutionPros>
                    <SolutionProsTitle>Zalety:</SolutionProsTitle>
                    <SolutionProsList>
                      {sol.pros.map((pro) => (
                        <li key={pro}>{pro}</li>
                      ))}
                    </SolutionProsList>
                  </SolutionPros>
                  <SolutionCons>
                    <SolutionConsTitle>Wady:</SolutionConsTitle>
                    <SolutionConsList>
                      {sol.cons.map((con) => (
                        <li key={con}>{con}</li>
                      ))}
                    </SolutionConsList>
                  </SolutionCons>
                </SolutionCard>
              )
            })}
          </SolutionsGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineCheckCircle size={18} />
              Proces
            </SectionBadge>
            <SectionTitle>Jak rozwiązać kredyt przy rozwodzie - krok po kroku</SectionTitle>
            <SectionSubtitle>
              Oto proces rozwiązania kredytu hipotecznego przy rozwodzie, od kontaktu z bankiem do uzgodnienia
              rozwiązania.
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
                  </StepContent>
                </StepCard>
              )
            })}
          </StepsList>
          <CtaBox>
            <CtaTitle>Sprawdź zdolność kredytową przed podjęciem decyzji</CtaTitle>
            <CtaText>
              Przed podjęciem decyzji o przejęciu kredytu sprawdź swoją zdolność kredytową w naszym
              kalkulatorze kredytu hipotecznego. To pomoże Ci określić, czy możesz przejąć kredyt
              samodzielnie.
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
            <SectionTitle>Najczęściej zadawane pytania o kredyt przy rozwodzie</SectionTitle>
            <SectionSubtitle>
              Odpowiedzi na najpopularniejsze pytania dotyczące kredytu hipotecznego przy rozwodzie.
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
              Rozwód to trudna sytuacja, która może skomplikować spłatę kredytu hipotecznego. Kredyt hipoteczny
              jest wspólnym zobowiązaniem małżonków, więc rozwód wymaga rozwiązania kwestii kredytu i
              nieruchomości. Masz kilka opcji: sprzedaż nieruchomości i spłata kredytu, przejęcie kredytu przez
              jednego małżonka (jeśli ma zdolność kredytową) lub wspólna spłata kredytu po rozwodzie.
            </SummaryText>
            <SummaryText>
              Aby rozwiązać kredyt przy rozwodzie, warto: skontaktować się z bankiem jak najszybciej, sprawdzić
              zdolność kredytową każdego z małżonków w kalkulatorze, rozważyć wszystkie opcje i uzgodnić
              rozwiązanie z byłym małżonkiem lub w postępowaniu sądowym. Ważne jest, aby rozwiązanie było
              zgodne z umową kredytową i prawem. Sprawdź swoją zdolność kredytową w naszym kalkulatorze przed
              podjęciem decyzji. Przeczytaj też nasze przewodniki o{' '}
              <Link
                href="/blog/kredyt-hipoteczny-a-smierc-kredytobiorcy"
                className="text-white underline hover:text-emerald-50"
              >
                kredycie hipotecznym a śmierci kredytobiorcy
              </Link>
              ,{' '}
              <Link href="/blog/co-zrobic-gdy-nie-mozesz-splacac-kredytu" className="text-white underline hover:text-emerald-50">
                co zrobić, gdy nie możesz spłacać kredytu
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
              Sprawdź zdolność kredytową w kalkulatorze
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

const SolutionsGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-3`
const SolutionCard = tw.li`flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm`
const SolutionHeader = tw.div`mb-4 flex items-center gap-4`
const SolutionIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const SolutionTitle = tw.h3`flex-1 text-xl font-semibold text-gray-900`
const SolutionDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const SolutionPros = tw.div`mb-4 rounded-lg bg-emerald-50 p-4`
const SolutionProsTitle = tw.h4`mb-2 text-sm font-semibold text-emerald-900`
const SolutionProsList = tw.ul`grid gap-2 text-sm text-emerald-800 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`
const SolutionCons = tw.div`mt-auto rounded-lg bg-red-50 p-4`
const SolutionConsTitle = tw.h4`mb-2 text-sm font-semibold text-red-900`
const SolutionConsList = tw.ul`grid gap-2 text-sm text-red-800 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-red-500 [&_li]:before:content-['•']`

const StepsList = tw.ul`mx-auto max-w-4xl space-y-6`
const StepCard = tw.li`flex gap-6 rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm`
const StepHeader = tw.div`flex shrink-0 items-start gap-4`
const StepNumber = tw.span`flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white`
const StepIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const StepContent = tw.div`flex-1`
const StepTitle = tw.h3`mb-2 text-xl font-semibold text-gray-900`
const StepDescription = tw.p`text-sm leading-relaxed text-gray-600`

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

