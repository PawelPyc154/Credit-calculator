import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowLongRight,
  HiOutlineBriefcase,
  HiOutlineCalculator,
  HiOutlineCheckCircle,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlineSparkles,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'
import { getPostRobotsMetadata } from 'utils/blog-posts'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {  robots: getPostRobotsMetadata('kredyt-hipoteczny-dla-przedsiebiorcy'),

  title: 'Kredyt hipoteczny dla przedsiębiorcy - wymagania i warunki 2025',
  description:
    'Dowiedz się, jak wziąć kredyt hipoteczny jako przedsiębiorca: wymagania, dokumenty, zdolność kredytowa i wskazówki. Sprawdź swoją zdolność w kalkulatorze.',
  alternates: {
    canonical: `${siteUrl}/blog/kredyt-hipoteczny-dla-przedsiebiorcy`,
  },
  keywords: [
    'kredyt hipoteczny dla przedsiębiorcy',
    'kredyt dla firm',
    'kredyt hipoteczny działalność gospodarcza',
    'zdolność kredytowa przedsiębiorcy',
    'dokumenty kredyt przedsiębiorca',
    'kredyt hipoteczny JDG',
    'jak wziąć kredyt jako przedsiębiorca',
  ],
  openGraph: {
    title: 'Kredyt hipoteczny dla przedsiębiorcy - wymagania i warunki 2025',
    description:
      'Kompletny przewodnik po kredycie hipotecznym dla przedsiębiorców: wymagania, dokumenty i praktyczne wskazówki.',
    url: `${siteUrl}/blog/kredyt-hipoteczny-dla-przedsiebiorcy`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Kredyt hipoteczny dla przedsiębiorcy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kredyt hipoteczny dla przedsiębiorcy',
    description: 'Dowiedz się, jak wziąć kredyt hipoteczny jako przedsiębiorca.',
    images: [`${siteUrl}/og-image.jpg`],
  },
}

const requirements = [
  {
    requirement: 'Stabilna działalność',
    description:
      'Bank wymaga stabilnej działalności gospodarczej, zazwyczaj minimum 12-24 miesiące prowadzenia działalności. Im dłuższa działalność, tym lepsze warunki.',
    details: [
      'Minimum 12-24 miesiące działalności',
      'Stabilne przychody',
      'Pozytywna historia działalności',
      'Brak problemów finansowych',
    ],
    icon: HiOutlineBriefcase,
  },
  {
    requirement: 'Dokumentacja finansowa',
    description:
      'Przedsiębiorca musi przedstawić szczegółową dokumentację finansową: PIT, deklaracje podatkowe, wyciągi z konta firmowego i inne dokumenty potwierdzające dochód.',
    details: [
      'PIT za ostatnie 2-3 lata',
      'Deklaracje podatkowe',
      'Wyciągi z konta firmowego',
      'Dokumenty dotyczące działalności',
    ],
    icon: HiOutlineDocumentText,
  },
  {
    requirement: 'Zdolność kredytowa',
    description:
      'Zdolność kredytowa przedsiębiorcy jest obliczana na podstawie dochodu z działalności, który może być niestabilny. Bank może wymagać wyższego dochodu niż dla pracownika.',
    details: [
      'Dochód z działalności',
      'Stabilność przychodów',
      'Zobowiązania finansowe',
      'Historia kredytowa',
    ],
    icon: HiOutlineCalculator,
  },
  {
    requirement: 'Wkład własny',
    description:
      'Niektóre banki mogą wymagać wyższego wkładu własnego od przedsiębiorców lub oferować mniej korzystne warunki. Warto porównać oferty różnych banków.',
    details: [
      'Standardowy wkład: 20%',
      'Możliwe wyższe wymagania',
      'Program mdM: 10% (jeśli spełniasz warunki)',
      'Porównaj oferty banków',
    ],
    icon: HiOutlineCheckCircle,
  },
]

const challenges = [
  {
    challenge: 'Niestabilny dochód',
    description:
      'Dochód z działalności gospodarczej może być niestabilny, co może wpłynąć na zdolność kredytową. Bank może wymagać wyższego dochodu niż dla pracownika.',
    solutions: [
      'Utrzymuj stabilne przychody',
      'Prowadź regularną dokumentację',
      'Miej poduszkę finansową',
      'Rozważ ubezpieczenie na życie',
    ],
    icon: HiOutlineExclamationTriangle,
  },
  {
    challenge: 'Bardziej rygorystyczne wymagania',
    description:
      'Banki mogą mieć bardziej rygorystyczne wymagania dla przedsiębiorców: wyższy dochód, dłuższa działalność, więcej dokumentów.',
    solutions: [
      'Przygotuj kompletną dokumentację',
      'Utrzymuj stabilną działalność',
      'Porównaj oferty różnych banków',
      'Negocjuj warunki z bankiem',
    ],
    icon: HiOutlineDocumentText,
  },
  {
    challenge: 'Wyższe koszty',
    description:
      'Niektóre banki mogą oferować wyższe oprocentowanie lub prowizję dla przedsiębiorców. Warto porównać oferty i negocjować warunki.',
    solutions: [
      'Porównaj oferty banków',
      'Negocjuj warunki',
      'Sprawdź programy wsparcia',
      'Rozważ refinansowanie w przyszłości',
    ],
    icon: HiOutlineCalculator,
  },
]

const faqData = [
  {
    question: 'Czy przedsiębiorca może wziąć kredyt hipoteczny?',
    answer:
      'Tak, przedsiębiorca może wziąć kredyt hipoteczny. Bank ocenia zdolność kredytową na podstawie dochodu z działalności gospodarczej, ale może mieć bardziej rygorystyczne wymagania niż dla pracowników. Wymagana jest zazwyczaj stabilna działalność (minimum 12-24 miesiące) i szczegółowa dokumentacja finansowa.',
  },
  {
    question: 'Jakie dokumenty są potrzebne dla przedsiębiorcy?',
    answer:
      'Przedsiębiorca musi przedstawić: PIT za ostatnie 2-3 lata, deklaracje podatkowe, wyciągi z konta firmowego, dokumenty dotyczące działalności (np. wpis do CEIDG), dokumenty tożsamości i inne dokumenty wymagane przez bank. Dokumentacja może być bardziej szczegółowa niż dla pracowników.',
  },
  {
    question: 'Jak obliczyć zdolność kredytową jako przedsiębiorca?',
    answer:
      'Zdolność kredytowa przedsiębiorcy jest obliczana na podstawie dochodu z działalności gospodarczej, który może być niestabilny. Bank może wymagać wyższego dochodu niż dla pracownika i może uwzględniać stabilność przychodów. Użyj kalkulatora kredytu hipotecznego, aby oszacować swoją zdolność.',
  },
  {
    question: 'Ile czasu musi działać firma, aby wziąć kredyt?',
    answer:
      'Bank zazwyczaj wymaga minimum 12-24 miesiące prowadzenia działalności gospodarczej, aby wziąć kredyt hipoteczny. Im dłuższa działalność i bardziej stabilne przychody, tym lepsze warunki kredytu. Niektóre banki mogą wymagać dłuższego okresu działalności.',
  },
  {
    question: 'Czy przedsiębiorca ma gorsze warunki kredytu?',
    answer:
      'Nie zawsze. Warunki kredytu zależą głównie od zdolności kredytowej, historii kredytowej i stabilności działalności. Niektóre banki mogą oferować wyższe oprocentowanie lub prowizję dla przedsiębiorców, ale inne mogą oferować podobne warunki. Warto porównać oferty różnych banków.',
  },
  {
    question: 'Jak zwiększyć zdolność kredytową jako przedsiębiorca?',
    answer:
      'Aby zwiększyć zdolność kredytową jako przedsiębiorca, możesz: zwiększyć dochód z działalności, utrzymać stabilne przychody, prowadzić regularną dokumentację finansową, zmniejszyć zobowiązania, poprawić historię kredytową i zwiększyć wkład własny. Użyj kalkulatora kredytu hipotecznego, aby zobaczyć, jak różne czynniki wpływają na zdolność kredytową.',
  },
  {
    question: 'Czy przedsiębiorca może skorzystać z programu mdM?',
    answer:
      'Tak, przedsiębiorca może skorzystać z programu mdM, jeśli spełnia warunki programu: wiek do 45 lat, pierwsze mieszkanie i spełnienie warunków dochodowych. Program mdM pozwala na kredyt z wkładem własnym zaledwie 10%, co może być korzystne dla przedsiębiorców.',
  },
  {
    question: 'Jakie są największe wyzwania dla przedsiębiorców?',
    answer:
      'Największe wyzwania dla przedsiębiorców przy kredycie hipotecznym to: niestabilny dochód, bardziej rygorystyczne wymagania banków, wyższe koszty i konieczność przedstawienia szczegółowej dokumentacji finansowej. Warto przygotować się do procesu i porównać oferty różnych banków.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Kredyt hipoteczny dla przedsiębiorcy - wymagania i warunki 2025',
  description:
    'Kompletny przewodnik po kredycie hipotecznym dla przedsiębiorców: wymagania, dokumenty i praktyczne wskazówki.',
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
  datePublished: '2026-03-24',
  dateModified: '2026-03-24',
  mainEntityOfPage: `${siteUrl}/blog/kredyt-hipoteczny-dla-przedsiebiorcy`,
  articleSection: ['Dla przedsiębiorców', 'Kredyt hipoteczny', 'Poradniki'],
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
      name: 'Kredyt hipoteczny dla przedsiębiorcy',
      item: `${siteUrl}/blog/kredyt-hipoteczny-dla-przedsiebiorcy`,
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
    slug: 'dokumenty-do-kredytu-hipotecznego',
    title: 'Dokumenty do kredytu hipotecznego',
    description: 'Kompletna lista dokumentów potrzebnych do kredytu.',
  },
  {
    slug: 'jak-wybrac-najlepszy-kredyt-hipoteczny',
    title: 'Jak wybrać najlepszy kredyt hipoteczny?',
    description: 'Kompleksowy przewodnik po wyborze najlepszego kredytu.',
  },
  {
    slug: 'kredyt-hipoteczny-dla-singla',
    title: 'Kredyt hipoteczny dla singla',
    description: 'Poznaj specyfikę kredytu hipotecznego dla singli.',
  }
]

export default function EntrepreneurPage() {
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
              <BreadcrumbCurrent>Kredyt hipoteczny dla przedsiębiorcy</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>

        <HeroSection>
          <HeroEyebrow>Dla przedsiębiorców</HeroEyebrow>
          <HeroTitle>Kredyt hipoteczny dla przedsiębiorcy - wymagania i warunki 2025</HeroTitle>
          <HeroLead>
            Wzięcie kredytu hipotecznego jako przedsiębiorca może być bardziej skomplikowane niż dla
            pracowników, ale jest możliwe. Banki mogą mieć bardziej rygorystyczne wymagania i wymagać
            szczegółowej dokumentacji finansowej. W tym przewodniku dowiesz się, jak wziąć kredyt hipoteczny
            jako przedsiębiorca, jakie są wymagania i jak zwiększyć swoją zdolność kredytową. Sprawdź swoją
            zdolność kredytową w naszym kalkulatorze.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź zdolność kredytową jako przedsiębiorca
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
                <strong>Przedsiębiorca może wziąć kredyt hipoteczny</strong> - wymagana jest stabilna
                działalność (minimum 12-24 miesiące).
              </li>
              <li>
                <strong>Bardziej rygorystyczne wymagania</strong> - banki mogą wymagać wyższego dochodu i
                więcej dokumentów.
              </li>
              <li>
                <strong>Szczegółowa dokumentacja</strong> - potrzebne są PIT, deklaracje podatkowe i wyciągi
                z konta firmowego.
              </li>
              <li>
                <strong>Porównaj oferty banków</strong> - różne banki mogą mieć różne wymagania i warunki.
              </li>
            </IntroList>
          </IntroContent>
        </IntroCard>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineBriefcase size={18} />
              Wymagania
            </SectionBadge>
            <SectionTitle>Jakie są wymagania dla przedsiębiorców?</SectionTitle>
            <SectionSubtitle>Przedsiębiorcy muszą udokumentować stabilną działalność (12-24 miesiące), przedstawić szczegółową dokumentację finansową i wykazać zdolność kredytową na podstawie dochodów z działalności.</SectionSubtitle>
          </SectionHeader>
          <RequirementsGrid role="list">
            {requirements.map((req) => {
              const IconComponent = req.icon
              return (
                <RequirementCard key={req.requirement} role="listitem">
                  <RequirementHeader>
                    <RequirementIcon aria-hidden="true">
                      <IconComponent size={24} />
                    </RequirementIcon>
                    <RequirementTitle>{req.requirement}</RequirementTitle>
                  </RequirementHeader>
                  <RequirementDescription>{req.description}</RequirementDescription>
                  <RequirementDetails>
                    <RequirementDetailsTitle>Szczegóły:</RequirementDetailsTitle>
                    <RequirementDetailsList>
                      {req.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </RequirementDetailsList>
                  </RequirementDetails>
                </RequirementCard>
              )
            })}
          </RequirementsGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineExclamationTriangle size={18} />
              Wyzwania
            </SectionBadge>
            <SectionTitle>Jakie są wyzwania dla przedsiębiorców?</SectionTitle>
            <SectionSubtitle>
              Oto główne wyzwania, z którymi mogą spotkać się przedsiębiorcy przy kredycie hipotecznym i jak
              je pokonać.
            </SectionSubtitle>
          </SectionHeader>
          <ChallengesGrid role="list">
            {challenges.map((challenge) => {
              const IconComponent = challenge.icon
              return (
                <ChallengeCard key={challenge.challenge} role="listitem">
                  <ChallengeHeader>
                    <ChallengeIcon aria-hidden="true">
                      <IconComponent size={24} />
                    </ChallengeIcon>
                    <ChallengeTitle>{challenge.challenge}</ChallengeTitle>
                  </ChallengeHeader>
                  <ChallengeDescription>{challenge.description}</ChallengeDescription>
                  <ChallengeSolutions>
                    <ChallengeSolutionsTitle>Rozwiązania:</ChallengeSolutionsTitle>
                    <ChallengeSolutionsList>
                      {challenge.solutions.map((solution) => (
                        <li key={solution}>{solution}</li>
                      ))}
                    </ChallengeSolutionsList>
                  </ChallengeSolutions>
                </ChallengeCard>
              )
            })}
          </ChallengesGrid>
          <CtaBox>
            <CtaTitle>Sprawdź zdolność kredytową jako przedsiębiorca</CtaTitle>
            <CtaText>
              Nasz kalkulator kredytu hipotecznego pozwala sprawdzić zdolność kredytową jako przedsiębiorca.
              Wprowadź swoje parametry i zobacz, na jaką kwotę możesz liczyć i jakie warunki są dla Ciebie
              dostępne.
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
            <SectionTitle>Najczęściej zadawane pytania o kredyt dla przedsiębiorców</SectionTitle>
            <SectionSubtitle>
              Odpowiedzi na najpopularniejsze pytania dotyczące kredytu hipotecznego dla przedsiębiorców.
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
              Wzięcie kredytu hipotecznego jako przedsiębiorca jest możliwe, choć może być bardziej
              skomplikowane niż dla pracowników. Banki wymagają stabilnej działalności (minimum 12-24
              miesiące), szczegółowej dokumentacji finansowej i mogą mieć bardziej rygorystyczne wymagania.
              Główne wyzwania to: niestabilny dochód, bardziej rygorystyczne wymagania i wyższe koszty.
            </SummaryText>
            <SummaryText>
              Aby zwiększyć szanse na uzyskanie kredytu jako przedsiębiorca, warto: utrzymać stabilną
              działalność, prowadzić regularną dokumentację finansową, zwiększyć dochód z działalności,
              porównać oferty różnych banków i przygotować się do procesu kredytowego. Sprawdź swoją zdolność
              kredytową jako przedsiębiorca w naszym kalkulatorze kredytu hipotecznego. Przeczytaj też nasze
              przewodniki o{' '}
              <Link href="/blog/jak-obliczyc-zdolnosc-kredytowa" className="text-white underline hover:text-emerald-50">
                jak obliczyć zdolność kredytową
              </Link>
              ,{' '}
              <Link href="/blog/dokumenty-do-kredytu-hipotecznego" className="text-white underline hover:text-emerald-50">
                dokumentach do kredytu hipotecznego
              </Link>
              {' '}i{' '}
              <Link href="/blog/jak-wybrac-najlepszy-kredyt-hipoteczny" className="text-white underline hover:text-emerald-50">
                jak wybrać najlepszy kredyt hipoteczny
              </Link>
              .
            </SummaryText>
            <SummaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź zdolność kredytową jako przedsiębiorca
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

const RequirementsGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const RequirementCard = tw.li`flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm`
const RequirementHeader = tw.div`mb-4 flex items-center gap-4`
const RequirementIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const RequirementTitle = tw.h3`flex-1 text-xl font-semibold text-gray-900`
const RequirementDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const RequirementDetails = tw.div`mt-auto rounded-lg bg-gray-50 p-4`
const RequirementDetailsTitle = tw.h4`mb-2 text-sm font-semibold text-gray-900`
const RequirementDetailsList = tw.ul`grid gap-2 text-sm text-gray-600 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`

const ChallengesGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-3`
const ChallengeCard = tw.li`flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm`
const ChallengeHeader = tw.div`mb-4 flex items-center gap-4`
const ChallengeIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const ChallengeTitle = tw.h3`flex-1 text-xl font-semibold text-gray-900`
const ChallengeDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const ChallengeSolutions = tw.div`mt-auto rounded-lg bg-gray-50 p-4`
const ChallengeSolutionsTitle = tw.h4`mb-2 text-sm font-semibold text-gray-900`
const ChallengeSolutionsList = tw.ul`grid gap-2 text-sm text-gray-600 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`

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

