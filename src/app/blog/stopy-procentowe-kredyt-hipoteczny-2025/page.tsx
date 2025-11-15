import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowLongRight,
  HiOutlineArrowPath,
  HiOutlineCalculator,
  HiOutlineChartBar,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlineSparkles,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'
import { getPostRobotsMetadata } from 'utils/blog-posts'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {  robots: getPostRobotsMetadata('stopy-procentowe-kredyt-hipoteczny-2025'),

  title: 'Stopy procentowe a kredyt hipoteczny 2025 - przewodnik',
  description:
    'Dowiedz się, jak stopy procentowe wpływają na kredyt hipoteczny: WIBOR, stopy NBP, zmiany stóp i ich wpływ na ratę. Sprawdź aktualne stopy w kalkulatorze.',
  alternates: {
    canonical: `${siteUrl}/blog/stopy-procentowe-kredyt-hipoteczny-2025`,
  },
  keywords: [
    'stopy procentowe kredyt hipoteczny',
    'wibor kredyt hipoteczny',
    'stopy nbp kredyt',
    'jak stopy procentowe wpływają na kredyt',
    'zmiany stóp procentowych',
    'oprocentowanie kredytu a stopy',
    'stopy procentowe 2025',
  ],
  openGraph: {
    title: 'Stopy procentowe a kredyt hipoteczny 2025 - przewodnik',
    description:
      'Kompletny przewodnik po stopach procentowych i ich wpływie na kredyt hipoteczny: WIBOR, stopy NBP i praktyczne wskazówki.',
    url: `${siteUrl}/blog/stopy-procentowe-kredyt-hipoteczny-2025`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Stopy procentowe a kredyt hipoteczny',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stopy procentowe a kredyt hipoteczny 2025',
    description: 'Dowiedz się, jak stopy procentowe wpływają na kredyt hipoteczny.',
    images: [`${siteUrl}/og-image.jpg`],
  },
}

const rates = [
  {
    rate: 'WIBOR (Warsaw Interbank Offered Rate)',
    description:
      'WIBOR to stopa procentowa, po której banki pożyczają sobie pieniądze na rynku międzybankowym. Jest podstawą oprocentowania kredytów hipotecznych ze zmiennym oprocentowaniem.',
    impact: 'Wysoki wpływ na ratę kredytu',
    icon: HiOutlineChartBar,
  },
  {
    rate: 'Stopy procentowe NBP',
    description:
      'Stopy procentowe NBP (stopa referencyjna, lombardowa, depozytowa) wpływają na WIBOR i pośrednio na oprocentowanie kredytów hipotecznych. Decyzje Rady Polityki Pieniężnej mają kluczowe znaczenie.',
    impact: 'Wysoki wpływ na WIBOR i ratę',
    icon: HiOutlineCurrencyDollar,
  },
  {
    rate: 'Marża banku',
    description:
      'Marża banku to stała część oprocentowania, która nie zmienia się przez cały okres kredytowania. Jest negocjowana z bankiem i dodawana do WIBOR.',
    impact: 'Stały wpływ na ratę',
    icon: HiOutlineCheckCircle,
  },
]

const impacts = [
  {
    scenario: 'Wzrost stóp procentowych',
    description:
      'Gdy stopy procentowe rosną, wzrasta również WIBOR, co prowadzi do wzrostu raty kredytu ze zmiennym oprocentowaniem. To może zwiększyć koszty kredytu.',
    consequences: [
      'Wzrost raty kredytu ze zmiennym oprocentowaniem',
      'Wyższy całkowity koszt kredytu',
      'Możliwe problemy z płynnością finansową',
      'Wzrost kosztów refinansowania',
    ],
    icon: HiOutlineExclamationTriangle,
  },
  {
    scenario: 'Spadek stóp procentowych',
    description:
      'Gdy stopy procentowe spadają, spada również WIBOR, co prowadzi do spadku raty kredytu ze zmiennym oprocentowaniem. To może zmniejszyć koszty kredytu.',
    consequences: [
      'Spadek raty kredytu ze zmiennym oprocentowaniem',
      'Niższy całkowity koszt kredytu',
      'Możliwość refinansowania na lepszych warunkach',
      'Lepsza płynność finansowa',
    ],
    icon: HiOutlineCheckCircle,
  },
  {
    scenario: 'Stabilne stopy procentowe',
    description:
      'Gdy stopy procentowe są stabilne, raty kredytu ze zmiennym oprocentowaniem pozostają na podobnym poziomie. To zapewnia przewidywalność kosztów.',
    consequences: [
      'Stabilne raty kredytu',
      'Przewidywalność kosztów',
      'Łatwiejsze planowanie budżetu',
      'Mniejsze ryzyko zmian',
    ],
    icon: HiOutlineChartBar,
  },
]

const tips = [
  {
    title: 'Śledź zmiany stóp procentowych',
    description:
      'Regularnie śledź zmiany stóp procentowych NBP i WIBOR, aby wiedzieć, jak mogą wpłynąć na ratę kredytu. Użyj kalkulatora, aby sprawdzić wpływ zmian stóp na ratę.',
    icon: HiOutlineChartBar,
  },
  {
    title: 'Rozważ oprocentowanie stałe',
    description:
      'Jeśli obawiasz się wzrostu stóp procentowych, rozważ oprocentowanie stałe, które zapewnia stabilność raty niezależnie od zmian stóp.',
    icon: HiOutlineCheckCircle,
  },
  {
    title: 'Przygotuj się na zmiany',
    description:
      'Przygotuj się na możliwe zmiany stóp procentowych: miej poduszkę finansową, rozważ nadpłaty i monitoruj sytuację rynkową.',
    icon: HiOutlineExclamationTriangle,
  },
  {
    title: 'Sprawdzaj aktualne stopy',
    description:
      'Sprawdzaj aktualne stopy procentowe w kalkulatorze kredytu hipotecznego, aby wiedzieć, jakie oprocentowanie jest obecnie dostępne.',
    icon: HiOutlineCalculator,
  },
]

const faqData = [
  {
    question: 'Jak stopy procentowe wpływają na kredyt hipoteczny?',
    answer:
      'Stopy procentowe wpływają na kredyt hipoteczny poprzez wpływ na WIBOR, który jest podstawą oprocentowania kredytów ze zmiennym oprocentowaniem. Wzrost stóp procentowych prowadzi do wzrostu WIBOR i raty kredytu, a spadek stóp do spadku raty. Stopy NBP wpływają na WIBOR, a marża banku jest stała przez cały okres kredytowania.',
  },
  {
    question: 'Co to jest WIBOR?',
    answer:
      'WIBOR (Warsaw Interbank Offered Rate) to stopa procentowa, po której banki pożyczają sobie pieniądze na rynku międzybankowym. Jest podstawą oprocentowania kredytów hipotecznych ze zmiennym oprocentowaniem. WIBOR zmienia się w zależności od stóp procentowych NBP i sytuacji na rynku.',
  },
  {
    question: 'Jak zmiany stóp procentowych wpływają na ratę?',
    answer:
      'Zmiany stóp procentowych wpływają na ratę kredytu ze zmiennym oprocentowaniem poprzez wpływ na WIBOR. Wzrost stóp prowadzi do wzrostu WIBOR i raty, a spadek stóp do spadku raty. Wpływ zależy od wysokości kredytu i pozostałego okresu kredytowania. Użyj kalkulatora, aby sprawdzić wpływ zmian stóp na ratę.',
  },
  {
    question: 'Czy oprocentowanie stałe chroni przed zmianami stóp?',
    answer:
      'Tak, oprocentowanie stałe chroni przed zmianami stóp procentowych, zapewniając stabilność raty przez cały okres oprocentowania stałego. Po zakończeniu okresu stałego oprocentowania kredyt przechodzi na oprocentowanie zmienne, które zależy od stóp procentowych.',
  },
  {
    question: 'Jak często zmieniają się stopy procentowe?',
    answer:
      'Stopy procentowe NBP są ustalane przez Radę Polityki Pieniężnej na posiedzeniach, które odbywają się regularnie (zazwyczaj co miesiąc). WIBOR zmienia się codziennie w zależności od stóp NBP i sytuacji na rynku. Zmiany stóp mogą wpłynąć na ratę kredytu ze zmiennym oprocentowaniem.',
  },
  {
    question: 'Czy warto czekać na spadek stóp przed wzięciem kredytu?',
    answer:
      'To zależy od sytuacji. Jeśli potrzebujesz kredytu teraz, nie warto czekać na spadek stóp, ponieważ nie wiadomo, kiedy nastąpią zmiany. Warto jednak śledzić zmiany stóp i rozważyć oprocentowanie stałe, jeśli obawiasz się wzrostu stóp. Użyj kalkulatora, aby porównać różne scenariusze.',
  },
  {
    question: 'Jak sprawdzić aktualne stopy procentowe?',
    answer:
      'Aktualne stopy procentowe NBP można sprawdzić na stronie NBP, a WIBOR na stronach banków lub w kalkulatorze kredytu hipotecznego. Nasz kalkulator pokazuje aktualne stopy i pozwala sprawdzić wpływ zmian stóp na ratę kredytu.',
  },
  {
    question: 'Co zrobić, gdy stopy procentowe rosną?',
    answer:
      'Gdy stopy procentowe rosną, warto: rozważyć nadpłaty kredytu, aby zmniejszyć kapitał i ratę, sprawdzić możliwość refinansowania na lepsze warunki, przygotować się na wyższe raty i mieć poduszkę finansową. Użyj kalkulatora, aby sprawdzić wpływ wzrostu stóp na ratę.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Stopy procentowe a kredyt hipoteczny 2025 - przewodnik',
  description:
    'Kompletny przewodnik po stopach procentowych i ich wpływie na kredyt hipoteczny: WIBOR, stopy NBP i praktyczne wskazówki.',
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
  datePublished: '2026-04-07',
  dateModified: '2026-04-07',
  mainEntityOfPage: `${siteUrl}/blog/stopy-procentowe-kredyt-hipoteczny-2025`,
  articleSection: ['Stopy procentowe', 'Kredyt hipoteczny', 'Poradniki'],
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
      name: 'Stopy procentowe a kredyt hipoteczny 2025',
      item: `${siteUrl}/blog/stopy-procentowe-kredyt-hipoteczny-2025`,
    },
  ],
}

const relatedArticles = [
  {
    slug: 'oprocentowanie-kredytu-hipotecznego-stale-czy-zmienne',
    title: 'Oprocentowanie kredytu - stałe czy zmienne?',
    description: 'Poznaj różnice między oprocentowaniem stałym a zmiennym.',
  },
  {
    slug: 'rrso-kredyt-hipoteczny',
    title: 'RRSO kredytu hipotecznego - co to jest?',
    description: 'Poznaj RRSO i dowiedz się, jak porównać pełne koszty kredytu.',
  },
  {
    slug: 'pulapki-kredytu-hipotecznego',
    title: 'Pułapki kredytu hipotecznego',
    description: 'Na co uważać przy kredycie hipotecznym.',
  },
  {
    slug: 'kredyt-hipoteczny-2025-zmiany-przepisy',
    title: 'Kredyt hipoteczny 2025 - zmiany w przepisach',
    description: 'Najnowsze zmiany w przepisach dotyczących kredytów.',
  }
]

export default function InterestRatesPage() {
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
              <BreadcrumbCurrent>Stopy procentowe a kredyt hipoteczny 2025</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>

        <HeroSection>
          <HeroEyebrow>Stopy procentowe</HeroEyebrow>
          <HeroTitle>Stopy procentowe a kredyt hipoteczny 2025 - przewodnik</HeroTitle>
          <HeroLead>
            Stopy procentowe mają kluczowy wpływ na kredyt hipoteczny, szczególnie na kredyty ze zmiennym
            oprocentowaniem. WIBOR, stopy NBP i marża banku decydują o wysokości raty i całkowitym koszcie
            kredytu. W tym przewodniku dowiesz się, jak stopy procentowe wpływają na kredyt hipoteczny, jak
            śledzić ich zmiany i jak przygotować się na możliwe zmiany. Sprawdź aktualne stopy w naszym
            kalkulatorze.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź aktualne stopy w kalkulatorze
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
                <strong>Stopy procentowe wpływają na ratę</strong> - wzrost stóp prowadzi do wzrostu raty
                kredytu ze zmiennym oprocentowaniem.
              </li>
              <li>
                <strong>WIBOR to podstawa oprocentowania</strong> - jest podstawą oprocentowania kredytów ze
                zmiennym oprocentowaniem.
              </li>
              <li>
                <strong>Stopy NBP wpływają na WIBOR</strong> - decyzje Rady Polityki Pieniężnej mają kluczowe
                znaczenie.
              </li>
              <li>
                <strong>Oprocentowanie stałe chroni przed zmianami</strong> - zapewnia stabilność raty przez
                cały okres stałego oprocentowania.
              </li>
            </IntroList>
          </IntroContent>
        </IntroCard>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineChartBar size={18} />
              Stopy procentowe
            </SectionBadge>
            <SectionTitle>Jakie stopy procentowe wpływają na kredyt hipoteczny?</SectionTitle>
            <SectionSubtitle>
              Oto główne stopy procentowe, które wpływają na kredyt hipoteczny i ich znaczenie.
            </SectionSubtitle>
          </SectionHeader>
          <RatesGrid role="list">
            {rates.map((rate) => {
              const IconComponent = rate.icon
              return (
                <RateCard key={rate.rate} role="listitem">
                  <RateHeader>
                    <RateIcon aria-hidden="true">
                      <IconComponent size={24} />
                    </RateIcon>
                    <RateInfo>
                      <RateTitle>{rate.rate}</RateTitle>
                      <RateBadge>{rate.impact}</RateBadge>
                    </RateInfo>
                  </RateHeader>
                  <RateDescription>{rate.description}</RateDescription>
                </RateCard>
              )
            })}
          </RatesGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineArrowPath size={18} />
              Wpływ zmian
            </SectionBadge>
            <SectionTitle>Jak zmiany stóp procentowych wpływają na kredyt?</SectionTitle>
            <SectionSubtitle>
              Oto scenariusze zmian stóp procentowych i ich wpływ na kredyt hipoteczny.
            </SectionSubtitle>
          </SectionHeader>
          <ImpactsGrid role="list">
            {impacts.map((impact) => {
              const IconComponent = impact.icon
              return (
                <ImpactCard key={impact.scenario} role="listitem">
                  <ImpactHeader>
                    <ImpactIcon aria-hidden="true">
                      <IconComponent size={24} />
                    </ImpactIcon>
                    <ImpactTitle>{impact.scenario}</ImpactTitle>
                  </ImpactHeader>
                  <ImpactDescription>{impact.description}</ImpactDescription>
                  <ImpactConsequences>
                    <ImpactConsequencesTitle>Konsekwencje:</ImpactConsequencesTitle>
                    <ImpactConsequencesList>
                      {impact.consequences.map((consequence) => (
                        <li key={consequence}>{consequence}</li>
                      ))}
                    </ImpactConsequencesList>
                  </ImpactConsequences>
                </ImpactCard>
              )
            })}
          </ImpactsGrid>
          <CtaBox>
            <CtaTitle>Sprawdź wpływ zmian stóp na ratę</CtaTitle>
            <CtaText>
              Nasz kalkulator kredytu hipotecznego pozwala sprawdzić wpływ zmian stóp procentowych na ratę
              kredytu. Wprowadź swoje parametry i zobacz, jak zmiany stóp mogą wpłynąć na koszty kredytu.
            </CtaText>
            <CtaButton href="/kalkulator/kredyt-hipoteczny">
              Sprawdź w kalkulatorze
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
              Oto praktyczne wskazówki, które pomogą Ci przygotować się na zmiany stóp procentowych.
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
            <SectionTitle>Najczęściej zadawane pytania o stopy procentowe</SectionTitle>
            <SectionSubtitle>
              Odpowiedzi na najpopularniejsze pytania dotyczące stóp procentowych i ich wpływu na kredyt
              hipoteczny.
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
              Stopy procentowe mają kluczowy wpływ na kredyt hipoteczny, szczególnie na kredyty ze zmiennym
              oprocentowaniem. WIBOR, stopy NBP i marża banku decydują o wysokości raty i całkowitym koszcie
              kredytu. Wzrost stóp procentowych prowadzi do wzrostu WIBOR i raty kredytu, a spadek stóp do
              spadku raty. Oprocentowanie stałe chroni przed zmianami stóp, zapewniając stabilność raty przez
              cały okres stałego oprocentowania.
            </SummaryText>
            <SummaryText>
              Aby przygotować się na zmiany stóp procentowych, warto: regularnie śledzić zmiany stóp NBP i
              WIBOR, rozważyć oprocentowanie stałe, jeśli obawiasz się wzrostu stóp, przygotować się na możliwe
              zmiany (mieć poduszkę finansową, rozważyć nadpłaty) i sprawdzać aktualne stopy w kalkulatorze.
              Sprawdź w naszym kalkulatorze kredytu hipotecznego, aby sprawdzić wpływ zmian stóp na ratę kredytu.
              Przeczytaj też nasze przewodniki o{' '}
              <Link
                href="/blog/oprocentowanie-kredytu-hipotecznego-stale-czy-zmienne"
                className="text-white underline hover:text-emerald-50"
              >
                oprocentowaniu stałym i zmiennym
              </Link>
              ,{' '}
              <Link href="/blog/rrso-kredyt-hipoteczny" className="text-white underline hover:text-emerald-50">
                RRSO kredytu hipotecznego
              </Link>
              {' '}i{' '}
              <Link href="/blog/pulapki-kredytu-hipotecznego" className="text-white underline hover:text-emerald-50">
                pułapkach kredytu hipotecznego
              </Link>
              .
            </SummaryText>
            <SummaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź aktualne stopy w kalkulatorze
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

const RatesGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-3`
const RateCard = tw.li`flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm`
const RateHeader = tw.div`mb-4 flex items-start gap-4`
const RateIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const RateInfo = tw.div`flex-1`
const RateTitle = tw.h3`mb-2 text-xl font-semibold text-gray-900`
const RateBadge = tw.span`inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700`
const RateDescription = tw.p`text-sm leading-relaxed text-gray-600`

const ImpactsGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-3`
const ImpactCard = tw.li`flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm`
const ImpactHeader = tw.div`mb-4 flex items-center gap-4`
const ImpactIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const ImpactTitle = tw.h3`flex-1 text-xl font-semibold text-gray-900`
const ImpactDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const ImpactConsequences = tw.div`mt-auto rounded-lg bg-gray-50 p-4`
const ImpactConsequencesTitle = tw.h4`mb-2 text-sm font-semibold text-gray-900`
const ImpactConsequencesList = tw.ul`grid gap-2 text-sm text-gray-600 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`

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

