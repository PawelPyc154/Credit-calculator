import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowLongRight,
  HiOutlineCalculator,
  HiOutlineCheckCircle,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineUsers,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'
import { getPostRobotsMetadata } from 'utils/blog-posts'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {  robots: getPostRobotsMetadata('kredyt-hipoteczny-a-smierc-kredytobiorcy'),

  title: 'Kredyt hipoteczny a śmierć kredytobiorcy - co się dzieje z kredytem?',
  description:
    'Dowiedz się, co się dzieje z kredytem hipotecznym po śmierci kredytobiorcy: ubezpieczenie, przejęcie kredytu przez spadkobierców i inne rozwiązania. Sprawdź opcje w kalkulatorze.',
  alternates: {
    canonical: `${siteUrl}/blog/kredyt-hipoteczny-a-smierc-kredytobiorcy`,
  },
  keywords: [
    'kredyt hipoteczny śmierć kredytobiorcy',
    'co z kredytem po śmierci',
    'ubezpieczenie kredytu śmierć',
    'przejęcie kredytu po śmierci',
    'spadkobiercy kredyt hipoteczny',
    'kredyt hipoteczny śmierć',
    'co się dzieje z kredytem po śmierci',
  ],
  openGraph: {
    title: 'Kredyt hipoteczny a śmierć kredytobiorcy - co się dzieje z kredytem?',
    description:
      'Kompletny przewodnik po rozwiązaniach kredytu hipotecznego po śmierci kredytobiorcy: ubezpieczenie i przejęcie przez spadkobierców.',
    url: `${siteUrl}/blog/kredyt-hipoteczny-a-smierc-kredytobiorcy`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Kredyt hipoteczny a śmierć kredytobiorcy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kredyt hipoteczny a śmierć kredytobiorcy',
    description: 'Dowiedz się, co się dzieje z kredytem hipotecznym po śmierci kredytobiorcy.',
    images: [`${siteUrl}/og-image.jpg`],
  },
}

const solutions = [
  {
    solution: 'Ubezpieczenie na życie',
    description:
      'Jeśli kredytobiorca miał ubezpieczenie na życie związane z kredytem, ubezpieczyciel wypłaca środki na spłatę kredytu. To najprostsze rozwiązanie, które chroni rodzinę przed koniecznością spłaty kredytu.',
    benefits: [
      'Automatyczna spłata kredytu',
      'Ochrona rodziny',
      'Brak konieczności spłaty przez spadkobierców',
      'Szybkie rozwiązanie',
    ],
    requirements: [
      'Ubezpieczenie na życie przy kredycie',
      'Śmierć w okresie ubezpieczenia',
      'Zgłoszenie śmierci ubezpieczycielowi',
      'Dokumenty potwierdzające śmierć',
    ],
    icon: HiOutlineShieldCheck,
  },
  {
    solution: 'Przejęcie kredytu przez spadkobierców',
    description:
      'Spadkobiercy mogą przejąć kredyt i nieruchomość, jeśli mają zdolność kredytową i bank wyrazi zgodę. Kredyt staje się częścią spadku i jest dzielony między spadkobierców.',
    benefits: [
      'Zachowanie nieruchomości',
      'Możliwość kontynuacji spłaty',
      'Dziedziczenie nieruchomości',
      'Wspólna odpowiedzialność',
    ],
    requirements: [
      'Zdolność kredytowa spadkobierców',
      'Zgoda banku',
      'Postępowanie spadkowe',
      'Podział spadku',
    ],
    icon: HiOutlineUsers,
  },
  {
    solution: 'Sprzedaż nieruchomości',
    description:
      'Spadkobiercy mogą sprzedać nieruchomość i spłacić kredyt z uzyskanych środków. Pozostałe środki są dzielone między spadkobierców zgodnie z testamentem lub prawem.',
    benefits: [
      'Szybka spłata kredytu',
      'Podział pozostałych środków',
      'Brak dalszych zobowiązań',
      'Rozwiązanie problemu',
    ],
    requirements: [
      'Zgoda wszystkich spadkobierców',
      'Znalezienie kupującego',
      'Sprzedaż nieruchomości',
      'Spłata kredytu',
    ],
    icon: HiOutlineCheckCircle,
  },
]

const steps = [
  {
    step: 1,
    title: 'Skontaktuj się z bankiem',
    description:
      'Skontaktuj się z bankiem jak najszybciej po śmierci kredytobiorcy. Poinformuj bank o sytuacji i poproś o informacje o możliwych rozwiązaniach i ubezpieczeniu.',
    icon: HiOutlineDocumentText,
  },
  {
    step: 2,
    title: 'Sprawdź ubezpieczenie',
    description:
      'Sprawdź, czy kredytobiorca miał ubezpieczenie na życie przy kredycie. Jeśli tak, skontaktuj się z ubezpieczycielem i zgłoś śmierć, aby rozpocząć proces wypłaty.',
    icon: HiOutlineShieldCheck,
  },
  {
    step: 3,
    title: 'Rozpocznij postępowanie spadkowe',
    description:
      'Rozpocznij postępowanie spadkowe, aby określić spadkobierców i podział spadku. To jest konieczne, jeśli spadkobiercy chcą przejąć kredyt lub nieruchomość.',
    icon: HiOutlineDocumentText,
  },
  {
    step: 4,
    title: 'Rozważ wszystkie opcje',
    description:
      'Rozważ wszystkie opcje: ubezpieczenie, przejęcie kredytu przez spadkobierców lub sprzedaż nieruchomości. Każde rozwiązanie ma swoje zalety i wady.',
    icon: HiOutlineCheckCircle,
  },
]

const faqData = [
  {
    question: 'Co się dzieje z kredytem hipotecznym po śmierci kredytobiorcy?',
    answer:
      'Po śmierci kredytobiorcy kredyt hipoteczny może być rozwiązany na kilka sposobów: ubezpieczenie na życie wypłaca środki na spłatę kredytu, spadkobiercy przejmują kredyt (jeśli mają zdolność kredytową) lub sprzedają nieruchomość i spłacają kredyt. Ważne jest, aby skontaktować się z bankiem jak najszybciej.',
  },
  {
    question: 'Czy ubezpieczenie na życie spłaca kredyt po śmierci?',
    answer:
      'Tak, jeśli kredytobiorca miał ubezpieczenie na życie związane z kredytem, ubezpieczyciel wypłaca środki na spłatę kredytu po śmierci. To chroni rodzinę przed koniecznością spłaty kredytu. Ważne jest, aby zgłosić śmierć ubezpieczycielowi jak najszybciej.',
  },
  {
    question: 'Czy spadkobiercy muszą spłacać kredyt?',
    answer:
      'Spadkobiercy nie muszą spłacać kredytu, jeśli mają ubezpieczenie na życie lub sprzedadzą nieruchomość. Mogą jednak przejąć kredyt i nieruchomość, jeśli mają zdolność kredytową i bank wyrazi zgodę. Kredyt staje się częścią spadku.',
  },
  {
    question: 'Czy mogę przejąć kredyt po śmierci rodzica?',
    answer:
      'Tak, możesz przejąć kredyt po śmierci rodzica, jeśli masz zdolność kredytową i bank wyrazi zgodę. Kredyt staje się częścią spadku i jest dzielony między spadkobierców. Sprawdź swoją zdolność kredytową w kalkulatorze przed podjęciem decyzji.',
  },
  {
    question: 'Co jeśli nie ma ubezpieczenia na życie?',
    answer:
      'Jeśli nie ma ubezpieczenia na życie, spadkobiercy muszą zdecydować: przejąć kredyt (jeśli mają zdolność kredytową) lub sprzedać nieruchomość i spłacić kredyt. Bank może wymagać spłaty kredytu w określonym terminie.',
  },
  {
    question: 'Jak sprawdzić, czy jest ubezpieczenie na życie?',
    answer:
      'Aby sprawdzić, czy jest ubezpieczenie na życie, skontaktuj się z bankiem, który udzielił kredytu. Bank powinien mieć informacje o ubezpieczeniu. Sprawdź również dokumenty kredytowe i umowę ubezpieczenia, jeśli są dostępne.',
  },
  {
    question: 'Czy bank może przejąć nieruchomość po śmierci?',
    answer:
      'Bank może przejąć nieruchomość po śmierci kredytobiorcy, jeśli kredyt nie jest spłacany i nie ma ubezpieczenia ani spadkobierców chętnych do przejęcia kredytu. To jest ostateczność, ale możliwa. Ważne jest szybkie działanie i kontakt z bankiem.',
  },
  {
    question: 'Jak sprawdzić zdolność kredytową spadkobierców?',
    answer:
      'Aby sprawdzić zdolność kredytową spadkobierców, użyj kalkulatora kredytu hipotecznego. Wprowadź parametry każdego spadkobiorcy (dochód, zobowiązania) i sprawdź, czy mogą przejąć kredyt. To pomoże podjąć decyzję o najlepszym rozwiązaniu.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Kredyt hipoteczny a śmierć kredytobiorcy - co się dzieje z kredytem?',
  description:
    'Kompletny przewodnik po rozwiązaniach kredytu hipotecznego po śmierci kredytobiorcy: ubezpieczenie i przejęcie przez spadkobierców.',
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
  datePublished: '2026-05-12',
  dateModified: '2026-05-12',
  mainEntityOfPage: `${siteUrl}/blog/kredyt-hipoteczny-a-smierc-kredytobiorcy`,
  articleSection: ['Śmierć kredytobiorcy', 'Kredyt hipoteczny', 'Poradniki'],
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
      name: 'Kredyt hipoteczny a śmierć kredytobiorcy',
      item: `${siteUrl}/blog/kredyt-hipoteczny-a-smierc-kredytobiorcy`,
    },
  ],
}

const relatedArticles = [
  {
    slug: 'ubezpieczenie-kredytu-hipotecznego',
    title: 'Ubezpieczenie kredytu hipotecznego',
    description: 'Poznaj rodzaje ubezpieczeń i ich wpływ na koszt kredytu.',
  },
  {
    slug: 'kredyt-hipoteczny-a-rozwod',
    title: 'Kredyt hipoteczny a rozwód',
    description: 'Co się dzieje z kredytem przy rozwodzie.',
  },
  {
    slug: 'co-zrobic-gdy-nie-mozesz-splacac-kredytu',
    title: 'Co zrobić, gdy nie możesz spłacać kredytu?',
    description: 'Rozwiązania problemów ze spłatą kredytu.',
  },
  {
    slug: 'jak-obliczyc-zdolnosc-kredytowa',
    title: 'Jak obliczyć zdolność kredytową?',
    description: 'Dowiedz się, jak banki obliczają zdolność kredytową i jak samodzielnie oszacować swoją zdolność.',
  }
]

export default function DeathPage() {
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
              <BreadcrumbCurrent>Kredyt hipoteczny a śmierć kredytobiorcy</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>

        <HeroSection>
          <HeroEyebrow>Śmierć kredytobiorcy</HeroEyebrow>
          <HeroTitle>Kredyt hipoteczny a śmierć kredytobiorcy - co się dzieje z kredytem?</HeroTitle>
          <HeroLead>
            Śmierć kredytobiorcy to trudna sytuacja, która wymaga rozwiązania kwestii kredytu hipotecznego.
            Kredyt hipoteczny nie znika automatycznie po śmierci kredytobiorcy - musi być spłacony lub
            przejęty przez spadkobierców. W tym przewodniku dowiesz się, co się dzieje z kredytem hipotecznym
            po śmierci kredytobiorcy, jakie masz opcje i jak je rozwiązać. Sprawdź opcje w kalkulatorze przed
            podjęciem decyzji.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź opcje w kalkulatorze
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
                <strong>Ubezpieczenie na życie chroni rodzinę</strong> - automatyczna spłata kredytu po
                śmierci.
              </li>
              <li>
                <strong>Spadkobiercy mogą przejąć kredyt</strong> - jeśli mają zdolność kredytową i bank
                wyrazi zgodę.
              </li>
              <li>
                <strong>Skontaktuj się z bankiem</strong> - jak najszybciej po śmierci kredytobiorcy.
              </li>
              <li>
                <strong>Sprawdź ubezpieczenie</strong> - czy kredytobiorca miał ubezpieczenie na życie przy
                kredycie.
              </li>
            </IntroList>
          </IntroContent>
        </IntroCard>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineShieldCheck size={18} />
              Rozwiązania
            </SectionBadge>
            <SectionTitle>Jakie są rozwiązania kredytu po śmierci kredytobiorcy?</SectionTitle>
            <SectionSubtitle>
              Oto główne rozwiązania kredytu hipotecznego po śmierci kredytobiorcy i ich wymagania.
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
                  <SolutionBenefits>
                    <SolutionBenefitsTitle>Korzyści:</SolutionBenefitsTitle>
                    <SolutionBenefitsList>
                      {sol.benefits.map((benefit) => (
                        <li key={benefit}>{benefit}</li>
                      ))}
                    </SolutionBenefitsList>
                  </SolutionBenefits>
                  <SolutionRequirements>
                    <SolutionRequirementsTitle>Wymagania:</SolutionRequirementsTitle>
                    <SolutionRequirementsList>
                      {sol.requirements.map((req) => (
                        <li key={req}>{req}</li>
                      ))}
                    </SolutionRequirementsList>
                  </SolutionRequirements>
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
            <SectionTitle>Jak rozwiązać kredyt po śmierci - krok po kroku</SectionTitle>
            <SectionSubtitle>
              Oto proces rozwiązania kredytu hipotecznego po śmierci kredytobiorcy, od kontaktu z bankiem do
              uzgodnienia rozwiązania.
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
            <CtaTitle>Sprawdź zdolność kredytową przed przejęciem kredytu</CtaTitle>
            <CtaText>
              Jeśli rozważasz przejęcie kredytu po śmierci kredytobiorcy, sprawdź swoją zdolność kredytową w
              naszym kalkulatorze kredytu hipotecznego. To pomoże Ci określić, czy możesz przejąć kredyt.
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
            <SectionTitle>Najczęściej zadawane pytania o kredyt po śmierci</SectionTitle>
            <SectionSubtitle>
              Odpowiedzi na najpopularniejsze pytania dotyczące kredytu hipotecznego po śmierci kredytobiorcy.
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
              Śmierć kredytobiorcy to trudna sytuacja, która wymaga rozwiązania kwestii kredytu hipotecznego.
              Kredyt hipoteczny nie znika automatycznie po śmierci kredytobiorcy - musi być spłacony lub
              przejęty przez spadkobierców. Masz kilka opcji: ubezpieczenie na życie wypłaca środki na spłatę
              kredytu, spadkobiercy przejmują kredyt (jeśli mają zdolność kredytową) lub sprzedają nieruchomość
              i spłacają kredyt.
            </SummaryText>
            <SummaryText>
              Aby rozwiązać kredyt po śmierci kredytobiorcy, warto: skontaktować się z bankiem jak najszybciej,
              sprawdzić ubezpieczenie na życie, rozpocząć postępowanie spadkowe i rozważyć wszystkie opcje.
              Ubezpieczenie na życie chroni rodzinę przed koniecznością spłaty kredytu, więc warto je mieć
              przy kredycie hipotecznym. Sprawdź opcje w naszym kalkulatorze kredytu hipotecznego przed
              podjęciem decyzji. Przeczytaj też nasze przewodniki o{' '}
              <Link href="/blog/ubezpieczenie-kredytu-hipotecznego" className="text-white underline hover:text-emerald-50">
                ubezpieczeniu kredytu hipotecznego
              </Link>
              ,{' '}
              <Link href="/blog/kredyt-hipoteczny-a-rozwod" className="text-white underline hover:text-emerald-50">
                kredycie hipotecznym a rozwodzie
              </Link>
              {' '}i{' '}
              <Link href="/blog/co-zrobic-gdy-nie-mozesz-splacac-kredytu" className="text-white underline hover:text-emerald-50">
                co zrobić, gdy nie możesz spłacać kredytu
              </Link>
              .
            </SummaryText>
            <SummaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź opcje w kalkulatorze
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
const SolutionBenefits = tw.div`mb-4 rounded-lg bg-emerald-50 p-4`
const SolutionBenefitsTitle = tw.h4`mb-2 text-sm font-semibold text-emerald-900`
const SolutionBenefitsList = tw.ul`grid gap-2 text-sm text-emerald-800 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`
const SolutionRequirements = tw.div`mt-auto rounded-lg bg-gray-50 p-4`
const SolutionRequirementsTitle = tw.h4`mb-2 text-sm font-semibold text-gray-900`
const SolutionRequirementsList = tw.ul`grid gap-2 text-sm text-gray-600 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`

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

