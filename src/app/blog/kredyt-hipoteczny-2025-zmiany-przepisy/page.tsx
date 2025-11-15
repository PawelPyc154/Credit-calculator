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
  HiOutlineTrophy,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'
import { getPostRobotsMetadata } from 'utils/blog-posts'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {
  title: 'Kredyt hipoteczny 2026 - zmiany w przepisach i nowe regulacje',
  description: 'Poznaj najważniejsze zmiany w przepisach dotyczących kredytów hipotecznych w 2026: nowe regulacje, wymagania i wpływ na kredytobiorców. Sprawdź aktualne oferty w kalkulatorze.',
  robots: getPostRobotsMetadata('kredyt-hipoteczny-2025-zmiany-przepisy'),
  alternates: {
    canonical: `${siteUrl}/blog/kredyt-hipoteczny-2025-zmiany-przepisy`,
  },
  keywords: [
    'kredyt hipoteczny 2026',
    'zmiany w przepisach kredyt',
    'nowe regulacje kredyt hipoteczny',
    'kredyt hipoteczny przepisy 2026',
    'zmiany prawne kredyt',
    'nowe wymagania kredyt hipoteczny',
    'kredyt hipoteczny 2026 zmiany',
  ],
  openGraph: {
    title: 'Kredyt hipoteczny 2026 - zmiany w przepisach i nowe regulacje',
    description: 'Kompletny przewodnik po zmianach w przepisach dotyczących kredytów hipotecznych w 2026: nowe regulacje i wpływ na kredytobiorców.',
    url: `${siteUrl}/blog/kredyt-hipoteczny-2025-zmiany-przepisy`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/images/blog/kredyt-hipoteczny-2025-zmiany-przepisy-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Kredyt hipoteczny 2026 - zmiany w przepisach',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kredyt hipoteczny 2026 - zmiany w przepisach',
    description: 'Poznaj najważniejsze zmiany w przepisach dotyczących kredytów hipotecznych w 2026.',
    images: [`${siteUrl}/images/blog/kredyt-hipoteczny-2025-zmiany-przepisy-og.jpg`],
  },
}

const changes = [
  {
    change: 'Nowe wymagania dotyczące zdolności kredytowej',
    description: 'W 2026 wprowadzono nowe wymagania dotyczące oceny zdolności kredytowej. Banki muszą uwzględniać więcej czynników i stosować bardziej rygorystyczne kryteria oceny.',
    impact: 'Może wpłynąć na dostępność kredytu',
    details: [
      'Bardziej szczegółowa ocena dochodu',
      'Uwzględnienie wszystkich zobowiązań',
      'Wyższe wymagania dotyczące stabilności dochodu',
      'Sprawdzenie historii kredytowej',
    ],
    icon: HiOutlineCalculator,
  },
  {
    change: 'Zmiany w wymaganiach dotyczących wkładu własnego',
    description:
      'Wprowadzono zmiany w wymaganiach dotyczących wkładu własnego. Niektóre programy wsparcia zostały zaktualizowane, a wymagania mogą być bardziej elastyczne w określonych sytuacjach.',
    impact: 'Może wpłynąć na dostępność kredytu',
    details: [
      'Aktualizacja programów wsparcia',
      'Elastyczność w określonych sytuacjach',
      'Zmiany w wymaganiach dla różnych celów',
      'Nowe możliwości finansowania',
    ],
    icon: HiOutlineCheckCircle,
  },
  {
    change: 'Nowe regulacje dotyczące oprocentowania',
    description:
      'Wprowadzono nowe regulacje dotyczące oprocentowania kredytów hipotecznych. Banki muszą bardziej przejrzyście informować o zmianach stóp procentowych i ich wpływie na ratę.',
    impact: 'Lepsza transparentność',
    details: [
      'Bardziej przejrzyste informowanie o zmianach',
      'Wymóg informowania o wpływie zmian',
      'Lepsza ochrona konsumentów',
      'Szczegółowe informacje w umowie',
    ],
    icon: HiOutlineTrophy,
  },
  {
    change: 'Zmiany w przepisach dotyczących ubezpieczeń',
    description:
      'Wprowadzono zmiany w przepisach dotyczących ubezpieczeń przy kredycie hipotecznym. Banki muszą bardziej przejrzyście informować o wymaganych ubezpieczeniach i możliwości ich zmiany.',
    impact: 'Lepsza ochrona konsumentów',
    details: [
      'Bardziej przejrzyste informowanie o ubezpieczeniach',
      'Możliwość zmiany ubezpieczyciela',
      'Szczegółowe informacje o kosztach',
      'Lepsza ochrona konsumentów',
    ],
    icon: HiOutlineCheckCircle,
  },
]

const impacts = [
  {
    impact: 'Dla nowych kredytobiorców',
    description:
      'Nowe przepisy mogą wpłynąć na dostępność kredytu dla nowych kredytobiorców. Wymagania mogą być bardziej rygorystyczne, ale jednocześnie bardziej przejrzyste.',
    recommendations: [
      'Sprawdź zdolność kredytową w kalkulatorze',
      'Przygotuj kompletną dokumentację',
      'Sprawdź aktualne wymagania',
      'Porównaj oferty różnych banków',
    ],
    icon: HiOutlineCalculator,
  },
  {
    impact: 'Dla obecnych kredytobiorców',
    description:
      'Nowe przepisy mogą wpłynąć na obecnych kredytobiorców poprzez zmiany w informowaniu o oprocentowaniu i ubezpieczeniach. Warto sprawdzić, czy nowe przepisy dotyczą Twojego kredytu.',
    recommendations: [
      'Sprawdź aktualne warunki kredytu',
      'Sprawdź możliwość zmiany ubezpieczyciela',
      'Monitoruj zmiany stóp procentowych',
      'Rozważ refinansowanie, jeśli korzystne',
    ],
    icon: HiOutlineDocumentText,
  },
]

const faqData = [
  {
    question: 'Jakie są najważniejsze zmiany w przepisach dotyczących kredytów hipotecznych w 2026?',
    answer:
      'Najważniejsze zmiany w przepisach dotyczących kredytów hipotecznych w 2026 to: nowe wymagania dotyczące zdolności kredytowej, zmiany w wymaganiach dotyczących wkładu własnego, nowe regulacje dotyczące oprocentowania i zmiany w przepisach dotyczących ubezpieczeń. Wszystkie zmiany mają na celu lepszą ochronę konsumentów i większą przejrzystość.',
  },
  {
    question: 'Czy zmiany w przepisach wpływają na dostępność kredytu?',
    answer:
      'Tak, zmiany w przepisach mogą wpłynąć na dostępność kredytu. Nowe wymagania dotyczące zdolności kredytowej mogą być bardziej rygorystyczne, co może utrudnić uzyskanie kredytu dla niektórych osób. Warto sprawdzić swoją zdolność kredytową w kalkulatorze przed złożeniem wniosku.',
  },
  {
    question: 'Czy zmiany dotyczą obecnych kredytobiorców?',
    answer:
      'Niektóre zmiany dotyczą obecnych kredytobiorców, szczególnie w zakresie informowania o oprocentowaniu i ubezpieczeniach. Warto sprawdzić aktualne warunki kredytu i możliwość skorzystania z nowych przepisów. Większość zmian dotyczy jednak nowych kredytów.',
  },
  {
    question: 'Jak sprawdzić, czy nowe przepisy dotyczą mojego kredytu?',
    answer:
      'Aby sprawdzić, czy nowe przepisy dotyczą Twojego kredytu, skontaktuj się z bankiem i poproś o informacje o aktualnych warunkach kredytu. Sprawdź również umowę kredytową i dokumenty dotyczące ubezpieczeń. Warto również sprawdzić oferty w kalkulatorze, aby zobaczyć aktualne warunki.',
  },
  {
    question: 'Czy warto czekać na zmiany przed wzięciem kredytu?',
    answer:
      'Nie zawsze warto czekać na zmiany przed wzięciem kredytu. Wiele zmian już obowiązuje, a niektóre mogą być korzystne dla kredytobiorców. Warto jednak sprawdzić aktualne oferty w kalkulatorze i porównać warunki przed podjęciem decyzji.',
  },
  {
    question: 'Jak przygotować się do zmian w przepisach?',
    answer:
      'Aby przygotować się do zmian w przepisach, warto: sprawdzić swoją zdolność kredytową w kalkulatorze, przygotować kompletną dokumentację, sprawdzić aktualne wymagania i porównać oferty różnych banków. Warto również śledzić informacje o zmianach w przepisach.',
  },
  {
    question: 'Czy zmiany są korzystne dla kredytobiorców?',
    answer:
      'Większość zmian jest korzystna dla kredytobiorców, ponieważ mają na celu lepszą ochronę konsumentów i większą przejrzystość. Niektóre zmiany mogą jednak utrudnić uzyskanie kredytu, szczególnie jeśli wymagania dotyczące zdolności kredytowej są bardziej rygorystyczne.',
  },
  {
    question: 'Gdzie szukać informacji o zmianach w przepisach?',
    answer:
      'Informacje o zmianach w przepisach można znaleźć na stronach: Komisji Nadzoru Finansowego, Urzędu Ochrony Konkurencji i Konsumentów, banków i organizacji konsumenckich. Warto również sprawdzić aktualne oferty w kalkulatorze kredytu hipotecznego.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Kredyt hipoteczny 2026 - zmiany w przepisach i nowe regulacje',
  description: 'Kompletny przewodnik po zmianach w przepisach dotyczących kredytów hipotecznych w 2026: nowe regulacje i wpływ na kredytobiorców.',
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
  datePublished: '2026-05-19',
  dateModified: '2026-05-19',
  mainEntityOfPage: `${siteUrl}/blog/kredyt-hipoteczny-2026-zmiany-przepisy`,
  articleSection: ['Zmiany w przepisach', 'Kredyt hipoteczny', 'Poradniki'],
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
      name: 'Kredyt hipoteczny 2026 - zmiany w przepisach',
      item: `${siteUrl}/blog/kredyt-hipoteczny-2026-zmiany-przepisy`,
    },
  ],
}

const relatedArticles = [
  {
    slug: 'stopy-procentowe-kredyt-hipoteczny-2026',
    title: 'Stopy procentowe a kredyt hipoteczny 2026',
    description: 'Poznaj wpływ stóp procentowych na kredyt.',
  },
  {
    slug: 'jak-wybrac-najlepszy-kredyt-hipoteczny',
    title: 'Jak wybrać najlepszy kredyt hipoteczny?',
    description: 'Kompleksowy przewodnik po wyborze najlepszego kredytu.',
  },
  {
    slug: 'pulapki-kredytu-hipotecznego',
    title: 'Pułapki kredytu hipotecznego',
    description: 'Na co uważać przy kredycie hipotecznym.',
  },
  {
    slug: 'rrso-kredyt-hipoteczny',
    title: 'RRSO kredytu hipotecznego - co to jest?',
    description: 'Poznaj RRSO i dowiedz się, jak porównać pełne koszty kredytu.',
  }
]

export default function Regulations2025Page() {
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
              <BreadcrumbCurrent>Kredyt hipoteczny 2026 - zmiany w przepisach</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>

        <HeroSection>
          <HeroEyebrow>Zmiany w przepisach</HeroEyebrow>
          <HeroTitle>Kredyt hipoteczny 2026 - zmiany w przepisach i nowe regulacje</HeroTitle>
          <HeroLead>
            W 2026 wprowadzono ważne zmiany w przepisach dotyczących kredytów hipotecznych. Nowe regulacje mają
            na celu lepszą ochronę konsumentów, większą przejrzystość i poprawę jakości usług bankowych. W tym
            przewodniku poznasz najważniejsze zmiany w przepisach dotyczących kredytów hipotecznych w 2026 i
            dowiesz się, jak wpływają na kredytobiorców. Sprawdź aktualne oferty w naszym kalkulatorze.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź aktualne oferty w kalkulatorze
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
                <strong>Nowe wymagania dotyczące zdolności kredytowej</strong> - bardziej rygorystyczne
                kryteria oceny.
              </li>
              <li>
                <strong>Zmiany w wymaganiach dotyczących wkładu własnego</strong> - aktualizacja programów
                wsparcia.
              </li>
              <li>
                <strong>Nowe regulacje dotyczące oprocentowania</strong> - większa przejrzystość i ochrona
                konsumentów.
              </li>
              <li>
                <strong>Zmiany w przepisach dotyczących ubezpieczeń</strong> - lepsza ochrona i możliwość
                zmiany ubezpieczyciela.
              </li>
            </IntroList>
          </IntroContent>
        </IntroCard>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineDocumentText size={18} />
              Zmiany
            </SectionBadge>
            <SectionTitle>Najważniejsze zmiany w przepisach 2026</SectionTitle>
            <SectionSubtitle>
              Oto najważniejsze zmiany w przepisach dotyczących kredytów hipotecznych w 2026 i ich wpływ na
              kredytobiorców.
            </SectionSubtitle>
          </SectionHeader>
          <ChangesGrid role="list">
            {changes.map((change) => {
              const IconComponent = change.icon
              return (
                <ChangeCard key={change.change} role="listitem">
                  <ChangeHeader>
                    <ChangeIcon aria-hidden="true">
                      <IconComponent size={24} />
                    </ChangeIcon>
                    <ChangeInfo>
                      <ChangeTitle>{change.change}</ChangeTitle>
                      <ChangeBadge>{change.impact}</ChangeBadge>
                    </ChangeInfo>
                  </ChangeHeader>
                  <ChangeDescription>{change.description}</ChangeDescription>
                  <ChangeDetails>
                    <ChangeDetailsTitle>Szczegóły:</ChangeDetailsTitle>
                    <ChangeDetailsList>
                      {change.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ChangeDetailsList>
                  </ChangeDetails>
                </ChangeCard>
              )
            })}
          </ChangesGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineExclamationTriangle size={18} />
              Wpływ
            </SectionBadge>
            <SectionTitle>Jak zmiany wpływają na kredytobiorców?</SectionTitle>
            <SectionSubtitle>
              Oto jak zmiany w przepisach wpływają na nowych i obecnych kredytobiorców oraz rekomendacje.
            </SectionSubtitle>
          </SectionHeader>
          <ImpactsGrid role="list">
            {impacts.map((impact) => {
              const IconComponent = impact.icon
              return (
                <ImpactCard key={impact.impact} role="listitem">
                  <ImpactHeader>
                    <ImpactIcon aria-hidden="true">
                      <IconComponent size={24} />
                    </ImpactIcon>
                    <ImpactTitle>{impact.impact}</ImpactTitle>
                  </ImpactHeader>
                  <ImpactDescription>{impact.description}</ImpactDescription>
                  <ImpactRecommendations>
                    <ImpactRecommendationsTitle>Rekomendacje:</ImpactRecommendationsTitle>
                    <ImpactRecommendationsList>
                      {impact.recommendations.map((rec) => (
                        <li key={rec}>{rec}</li>
                      ))}
                    </ImpactRecommendationsList>
                  </ImpactRecommendations>
                </ImpactCard>
              )
            })}
          </ImpactsGrid>
          <CtaBox>
            <CtaTitle>Sprawdź aktualne oferty zgodne z nowymi przepisami</CtaTitle>
            <CtaText>
              Nasz kalkulator kredytu hipotecznego pokazuje aktualne oferty banków zgodne z nowymi przepisami.
              Sprawdź oferty i porównaj warunki przed podjęciem decyzji o kredycie.
            </CtaText>
            <CtaButton href="/kalkulator/kredyt-hipoteczny">
              Sprawdź oferty w kalkulatorze
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
            <SectionTitle>Najczęściej zadawane pytania o zmiany w przepisach</SectionTitle>
            <SectionSubtitle>
              Odpowiedzi na najpopularniejsze pytania dotyczące zmian w przepisach dotyczących kredytów
              hipotecznych w 2026.
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
              W 2026 wprowadzono ważne zmiany w przepisach dotyczących kredytów hipotecznych. Najważniejsze
              zmiany to: nowe wymagania dotyczące zdolności kredytowej, zmiany w wymaganiach dotyczących wkładu
              własnego, nowe regulacje dotyczące oprocentowania i zmiany w przepisach dotyczących ubezpieczeń.
              Wszystkie zmiany mają na celu lepszą ochronę konsumentów i większą przejrzystość.
            </SummaryText>
            <SummaryText>
              Zmiany w przepisach mogą wpłynąć na dostępność kredytu dla nowych kredytobiorców, szczególnie
              jeśli wymagania dotyczące zdolności kredytowej są bardziej rygorystyczne. Dla obecnych
              kredytobiorców zmiany mogą wpłynąć na informowanie o oprocentowaniu i ubezpieczeniach. Warto
              sprawdzić aktualne oferty w kalkulatorze kredytu hipotecznego i porównać warunki przed podjęciem
              decyzji. Przeczytaj też nasze przewodniki o{' '}
              <Link
                href="/blog/stopy-procentowe-kredyt-hipoteczny-2026"
                className="text-white underline hover:text-emerald-50"
              >
                stopach procentowych a kredyt hipoteczny
              </Link>
              ,{' '}
              <Link href="/blog/jak-wybrac-najlepszy-kredyt-hipoteczny" className="text-white underline hover:text-emerald-50">
                jak wybrać najlepszy kredyt hipoteczny
              </Link>
              {' '}i{' '}
              <Link href="/blog/pulapki-kredytu-hipotecznego" className="text-white underline hover:text-emerald-50">
                pułapkach kredytu hipotecznego
              </Link>
              .
            </SummaryText>
            <SummaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź aktualne oferty w kalkulatorze
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

const ChangesGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const ChangeCard = tw.li`flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm`
const ChangeHeader = tw.div`mb-4 flex items-start gap-4`
const ChangeIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const ChangeInfo = tw.div`flex-1`
const ChangeTitle = tw.h3`mb-2 text-xl font-semibold text-gray-900`
const ChangeBadge = tw.span`inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700`
const ChangeDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const ChangeDetails = tw.div`mt-auto rounded-lg bg-gray-50 p-4`
const ChangeDetailsTitle = tw.h4`mb-2 text-sm font-semibold text-gray-900`
const ChangeDetailsList = tw.ul`grid gap-2 text-sm text-gray-600 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`

const ImpactsGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const ImpactCard = tw.li`flex h-full flex-col rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-sm backdrop-blur-sm`
const ImpactHeader = tw.div`mb-4 flex items-center gap-4`
const ImpactIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const ImpactTitle = tw.h3`flex-1 text-xl font-semibold text-gray-900`
const ImpactDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const ImpactRecommendations = tw.div`mt-auto rounded-lg bg-emerald-50 p-4`
const ImpactRecommendationsTitle = tw.h4`mb-2 text-sm font-semibold text-emerald-900`
const ImpactRecommendationsList = tw.ul`grid gap-2 text-sm text-emerald-800 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`

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
const SummaryCta = tw(Link)`mt-6 inline-flex items-center gap-2 self-center rounded-full bg-white px-6 py-3 font-semibold text-emerald-600 transition-colors hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500`

