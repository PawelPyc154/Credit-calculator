import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowLongRight,
  HiOutlineCalculator,
  HiOutlineCheckCircle,
  HiOutlineChartBar,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlineSparkles,
  HiOutlineTrophy,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'
import { getPostRobotsMetadata } from 'utils/blog-posts'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {  robots: getPostRobotsMetadata('jak-wybrac-najlepszy-kredyt-hipoteczny'),

  title: 'Jak wybrać najlepszy kredyt hipoteczny? Poradnik 2026',
  description:
    'Dowiedz się, jak wybrać najlepszy kredyt hipoteczny: na co zwrócić uwagę, jak porównać oferty i jakie kryteria są najważniejsze. Porównaj oferty w kalkulatorze.',
  alternates: {
    canonical: `${siteUrl}/blog/jak-wybrac-najlepszy-kredyt-hipoteczny`,
  },
  keywords: [
    'jak wybrać najlepszy kredyt hipoteczny',
    'wybór kredytu hipotecznego',
    'porównanie kredytów hipotecznych',
    'kryteria wyboru kredytu',
    'najlepszy kredyt hipoteczny 2026',
    'jak porównać oferty kredytowe',
    'wybór banku kredyt hipoteczny',
  ],
  openGraph: {
    title: 'Jak wybrać najlepszy kredyt hipoteczny? Poradnik 2026',
    description:
      'Kompletny przewodnik po wyborze najlepszego kredytu hipotecznego: kryteria, porównanie ofert i praktyczne wskazówki.',
    url: `${siteUrl}/blog/jak-wybrac-najlepszy-kredyt-hipoteczny`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/images/blog/jak-wybrac-najlepszy-kredyt-hipoteczny-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Jak wybrać najlepszy kredyt hipoteczny',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jak wybrać najlepszy kredyt hipoteczny?',
    description: 'Dowiedz się, jak wybrać najlepszy kredyt hipoteczny i porównać oferty.',
    images: [`${siteUrl}/images/blog/jak-wybrac-najlepszy-kredyt-hipoteczny-og.jpg`],
  },
}

const criteria = [
  {
    title: 'RRSO (Rzeczywista Roczna Stopa Oprocentowania)',
    description:
      'RRSO to najważniejsze kryterium wyboru kredytu, ponieważ pokazuje rzeczywisty koszt kredytu w skali roku, uwzględniając wszystkie opłaty. Niższe RRSO oznacza niższy całkowity koszt kredytu.',
    importance: 'Najważniejsze',
    icon: HiOutlineChartBar,
  },
  {
    title: 'Oprocentowanie',
    description:
      'Oprocentowanie wpływa bezpośrednio na wysokość raty. Porównaj oprocentowanie stałe i zmienne oraz sprawdź, jak zmiany stóp procentowych mogą wpłynąć na ratę.',
    importance: 'Bardzo ważne',
    icon: HiOutlineCurrencyDollar,
  },
  {
    title: 'Prowizja i opłaty',
    description:
      'Prowizja za udzielenie kredytu i inne opłaty mogą znacząco zwiększyć całkowity koszt kredytu. Sprawdź wszystkie opłaty i porównaj je między bankami.',
    importance: 'Bardzo ważne',
    icon: HiOutlineCurrencyDollar,
  },
  {
    title: 'Warunki kredytu',
    description:
      'Sprawdź warunki kredytu: minimalny i maksymalny okres kredytowania, możliwość wcześniejszej spłaty, opłaty za nadpłatę i inne warunki.',
    importance: 'Ważne',
    icon: HiOutlineDocumentText,
  },
  {
    title: 'Wymagania banku',
    description:
      'Sprawdź wymagania banku: minimalny wkład własny, wymagane dokumenty, warunki zdolności kredytowej i inne wymagania.',
    importance: 'Ważne',
    icon: HiOutlineCheckCircle,
  },
  {
    title: 'Dodatkowe korzyści',
    description:
      'Sprawdź dodatkowe korzyści: promocje, bonusy, możliwość łączenia z innymi produktami bankowymi i inne korzyści.',
    importance: 'Dodatkowe',
    icon: HiOutlineTrophy,
  },
]

const steps = [
  {
    step: 1,
    title: 'Określ swoje potrzeby',
    description:
      'Zacznij od określenia swoich potrzeb: kwota kredytu, okres kredytowania, preferencje dotyczące oprocentowania i inne wymagania.',
    icon: HiOutlineCheckCircle,
  },
  {
    step: 2,
    title: 'Sprawdź zdolność kredytową',
    description:
      'Sprawdź swoją zdolność kredytową w kalkulatorze, aby wiedzieć, na jaką kwotę możesz liczyć i jakie warunki są dla Ciebie dostępne.',
    icon: HiOutlineCalculator,
  },
  {
    step: 3,
    title: 'Porównaj oferty banków',
    description:
      'Porównaj oferty różnych banków w kalkulatorze kredytu hipotecznego. Zwróć uwagę na RRSO, oprocentowanie, prowizje i inne koszty.',
    icon: HiOutlineChartBar,
  },
  {
    step: 4,
    title: 'Sprawdź warunki szczegółowe',
    description:
      'Sprawdź szczegółowe warunki każdej oferty: możliwość wcześniejszej spłaty, opłaty za nadpłatę, wymagania dotyczące ubezpieczeń i inne warunki.',
    icon: HiOutlineDocumentText,
  },
  {
    step: 5,
    title: 'Negocjuj warunki',
    description:
      'Negocjuj warunki z wybranym bankiem przed podpisaniem umowy. Możesz negocjować prowizję, oprocentowanie i inne warunki.',
    icon: HiOutlineCheckCircle,
  },
  {
    step: 6,
    title: 'Wybierz najlepszą ofertę',
    description:
      'Na podstawie porównania ofert, warunków i negocjacji wybierz najlepszą ofertę dla siebie. Pamiętaj, że najniższe RRSO nie zawsze oznacza najlepszą ofertę.',
    icon: HiOutlineTrophy,
  },
]

const mistakes = [
  {
    mistake: 'Porównywanie tylko oprocentowania',
    description:
      'Porównywanie tylko oprocentowania może być mylące, ponieważ nie uwzględnia prowizji i innych opłat. Zawsze porównuj RRSO, które pokazuje pełny koszt kredytu.',
    solution: 'Porównuj RRSO, a nie tylko oprocentowanie',
  },
  {
    mistake: 'Ignorowanie opłat',
    description:
      'Ignorowanie opłat za wcześniejszą spłatę, nadpłatę i inne opłaty może prowadzić do niespodzianek w przyszłości. Sprawdź wszystkie opłaty przed podpisaniem umowy.',
    solution: 'Sprawdź wszystkie opłaty w umowie',
  },
  {
    mistake: 'Nie sprawdzanie warunków',
    description:
      'Nie sprawdzanie szczegółowych warunków kredytu może prowadzić do problemów w przyszłości. Sprawdź wszystkie warunki przed podpisaniem umowy.',
    solution: 'Przeczytaj umowę dokładnie przed podpisaniem',
  },
  {
    mistake: 'Brak negocjacji',
    description:
      'Brak negocjacji warunków kredytu może oznaczać wyższe koszty. Wiele banków jest skłonnych do obniżenia prowizji lub oprocentowania, aby zdobyć klienta.',
    solution: 'Negocjuj warunki przed podpisaniem umowy',
  },
]

const faqData = [
  {
    question: 'Jak wybrać najlepszy kredyt hipoteczny?',
    answer:
      'Aby wybrać najlepszy kredyt hipoteczny, warto: określić swoje potrzeby, sprawdzić zdolność kredytową, porównać oferty banków w kalkulatorze (szczególnie RRSO), sprawdzić szczegółowe warunki, negocjować warunki i wybrać najlepszą ofertę. Najważniejsze kryterium to RRSO, które pokazuje pełny koszt kredytu.',
  },
  {
    question: 'Na co zwrócić uwagę przy wyborze kredytu?',
    answer:
      'Przy wyborze kredytu warto zwrócić uwagę na: RRSO (najważniejsze kryterium), oprocentowanie, prowizję i opłaty, warunki kredytu (możliwość wcześniejszej spłaty, opłaty za nadpłatę), wymagania banku i dodatkowe korzyści. Użyj kalkulatora kredytu hipotecznego, aby porównać oferty.',
  },
  {
    question: 'Czy najniższe RRSO oznacza najlepszą ofertę?',
    answer:
      'Najniższe RRSO zazwyczaj oznacza najlepszą ofertę pod względem kosztów, ale warto również sprawdzić warunki kredytu, możliwość wcześniejszej spłaty, opłaty za nadpłatę i inne warunki. Niektóre oferty mogą mieć wyższe RRSO, ale lepsze warunki, co może być korzystniejsze w dłuższej perspektywie.',
  },
  {
    question: 'Jak porównać oferty kredytowe?',
    answer:
      'Aby porównać oferty kredytowe, użyj kalkulatora kredytu hipotecznego, który automatycznie porównuje oferty różnych banków. Zwróć uwagę na RRSO, oprocentowanie, prowizje, opłaty i warunki kredytu. Porównaj pełne koszty kredytu, a nie tylko oprocentowanie.',
  },
  {
    question: 'Czy warto negocjować warunki kredytu?',
    answer:
      'Tak, warto negocjować warunki kredytu przed podpisaniem umowy. Wiele banków jest skłonnych do obniżenia prowizji, oprocentowania lub innych opłat, aby zdobyć klienta. Negocjuj szczególnie, jeśli masz dobrą zdolność kredytową lub jesteś wartościowym klientem.',
  },
  {
    question: 'Jakie błędy unikać przy wyborze kredytu?',
    answer:
      'Najczęstsze błędy przy wyborze kredytu to: porównywanie tylko oprocentowania (zamiast RRSO), ignorowanie opłat, nie sprawdzanie warunków szczegółowych i brak negocjacji. Warto porównać pełne koszty kredytu (RRSO) i sprawdzić wszystkie warunki przed podpisaniem umowy.',
  },
  {
    question: 'Czy mogę zmienić bank po podpisaniu umowy?',
    answer:
      'Tak, możesz zmienić bank poprzez refinansowanie kredytu, ale wiąże się to z kosztami: opłatą za wcześniejszą spłatę, prowizją za nowy kredyt i innymi kosztami. Warto więc dokładnie wybrać bank przed podpisaniem umowy, aby uniknąć konieczności refinansowania.',
  },
  {
    question: 'Jak często powinienem sprawdzać oferty kredytowe?',
    answer:
      'Warto sprawdzać oferty kredytowe regularnie, szczególnie gdy: stopy procentowe się zmieniają, pojawiają się nowe promocje, poprawia się Twoja zdolność kredytowa lub zbliża się koniec okresu oprocentowania stałego. Użyj kalkulatora kredytu hipotecznego, aby regularnie porównywać oferty.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Jak wybrać najlepszy kredyt hipoteczny? Poradnik 2026',
  description:
    'Kompletny przewodnik po wyborze najlepszego kredytu hipotecznego: kryteria, porównanie ofert i praktyczne wskazówki.',
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
  datePublished: '2026-03-03',
  dateModified: '2026-03-03',
  mainEntityOfPage: `${siteUrl}/blog/jak-wybrac-najlepszy-kredyt-hipoteczny`,
  articleSection: ['Wybór kredytu', 'Kredyt hipoteczny', 'Poradniki'],
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
      name: 'Jak wybrać najlepszy kredyt hipoteczny?',
      item: `${siteUrl}/blog/jak-wybrac-najlepszy-kredyt-hipoteczny`,
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
    slug: 'ranking-bankow-kredytow-hipotecznych-2026',
    title: 'Ranking banków kredytów hipotecznych 2026',
    description: 'Porównaj oferty banków i znajdź najlepszy kredyt dla siebie.',
  },
  {
    slug: 'jak-negocjowac-warunki-kredytu-hipotecznego',
    title: 'Jak negocjować warunki kredytu hipotecznego?',
    description: 'Dowiedz się, jak negocjować warunki kredytu.',
  }
]

export default function HowToChoosePage() {
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
              <BreadcrumbCurrent>Jak wybrać najlepszy kredyt hipoteczny?</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>

        <HeroSection>
          <HeroEyebrow>Wybór kredytu</HeroEyebrow>
          <HeroTitle>Jak wybrać najlepszy kredyt hipoteczny? Poradnik 2026</HeroTitle>
          <HeroLead>
            Wybór najlepszego kredytu hipotecznego to jedna z najważniejszych decyzji finansowych w życiu.
            Na rynku jest wiele ofert, a wybór odpowiedniej może zaoszczędzić dziesiątki tysięcy złotych. W
            tym przewodniku dowiesz się, jak wybrać najlepszy kredyt hipoteczny, na co zwrócić uwagę i jak
            porównać oferty. Sprawdź w naszym kalkulatorze kredytu hipotecznego, aby porównać oferty banków i
            znaleźć najlepszą dla siebie.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Porównaj oferty banków w kalkulatorze
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
                <strong>RRSO to najważniejsze kryterium</strong> - pokazuje pełny koszt kredytu, uwzględniając
                wszystkie opłaty.
              </li>
              <li>
                <strong>Porównuj pełne koszty, nie tylko oprocentowanie</strong> - prowizje i opłaty mogą
                znacząco zwiększyć koszt.
              </li>
              <li>
                <strong>Sprawdź warunki szczegółowe</strong> - możliwość wcześniejszej spłaty, opłaty za
                nadpłatę i inne warunki.
              </li>
              <li>
                <strong>Negocjuj warunki</strong> - wiele banków jest skłonnych do obniżenia opłat, aby zdobyć
                klienta.
              </li>
            </IntroList>
          </IntroContent>
        </IntroCard>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineChartBar size={18} />
              Kryteria
            </SectionBadge>
            <SectionTitle>Na co zwrócić uwagę przy wyborze kredytu?</SectionTitle>
            <SectionSubtitle>
              Oto najważniejsze kryteria wyboru kredytu hipotecznego, uporządkowane według ważności.
            </SectionSubtitle>
          </SectionHeader>
          <CriteriaGrid role="list">
            {criteria.map((criterion) => {
              const IconComponent = criterion.icon
              return (
                <CriterionCard key={criterion.title} role="listitem">
                  <CriterionHeader>
                    <CriterionIcon aria-hidden="true">
                      <IconComponent size={24} />
                    </CriterionIcon>
                    <CriterionInfo>
                      <CriterionTitle>{criterion.title}</CriterionTitle>
                      <CriterionBadge>{criterion.importance}</CriterionBadge>
                    </CriterionInfo>
                  </CriterionHeader>
                  <CriterionDescription>{criterion.description}</CriterionDescription>
                </CriterionCard>
              )
            })}
          </CriteriaGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineCheckCircle size={18} />
              Proces wyboru
            </SectionBadge>
            <SectionTitle>Jak wybrać najlepszy kredyt - krok po kroku</SectionTitle>
            <SectionSubtitle>
              Oto szczegółowy proces wyboru najlepszego kredytu hipotecznego, od określenia potrzeb do
              wyboru oferty.
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
            <CtaTitle>Porównaj oferty w kalkulatorze</CtaTitle>
            <CtaText>
              Nasz kalkulator kredytu hipotecznego pozwala porównać oferty różnych banków i zobaczyć pełne
              koszty kredytu (RRSO). Wprowadź swoje parametry i zobacz, która oferta jest najlepsza dla
              Ciebie.
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
              <HiOutlineExclamationTriangle size={18} />
              Błędy
            </SectionBadge>
            <SectionTitle>Jakich błędów unikać przy wyborze kredytu?</SectionTitle>
            <SectionSubtitle>
              Oto najczęstsze błędy przy wyborze kredytu hipotecznego i jak ich uniknąć.
            </SectionSubtitle>
          </SectionHeader>
          <MistakesList role="list">
            {mistakes.map((mistake) => (
              <MistakeCard key={mistake.mistake} role="listitem">
                <MistakeHeader>
                  <MistakeTitle>{mistake.mistake}</MistakeTitle>
                  <MistakeBadge>Błąd</MistakeBadge>
                </MistakeHeader>
                <MistakeDescription>{mistake.description}</MistakeDescription>
                <MistakeSolution>
                  <strong>Rozwiązanie:</strong> {mistake.solution}
                </MistakeSolution>
              </MistakeCard>
            ))}
          </MistakesList>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineDocumentText size={18} />
              FAQ
            </SectionBadge>
            <SectionTitle>Najczęściej zadawane pytania o wybór kredytu</SectionTitle>
            <SectionSubtitle>
              Odpowiedzi na najpopularniejsze pytania dotyczące wyboru najlepszego kredytu hipotecznego.
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
              Wybór najlepszego kredytu hipotecznego wymaga dokładnego porównania ofert i uwzględnienia
              wszystkich kosztów. Najważniejsze kryterium to RRSO, które pokazuje pełny koszt kredytu,
              uwzględniając wszystkie opłaty. Warto również sprawdzić oprocentowanie, prowizje, opłaty,
              warunki kredytu i wymagania banku.
            </SummaryText>
            <SummaryText>
              Aby wybrać najlepszy kredyt, warto: określić swoje potrzeby, sprawdzić zdolność kredytową,
              porównać oferty w kalkulatorze, sprawdzić szczegółowe warunki, negocjować warunki i wybrać
              najlepszą ofertę. Unikaj błędów: porównywania tylko oprocentowania, ignorowania opłat, nie
              sprawdzania warunków i braku negocjacji. Sprawdź w naszym kalkulatorze kredytu hipotecznego, aby
              porównać oferty i znaleźć najlepszą dla siebie. Przeczytaj też nasze przewodniki o{' '}
              <Link href="/blog/jak-obliczyc-zdolnosc-kredytowa" className="text-white underline hover:text-emerald-50">
                jak obliczyć zdolność kredytową
              </Link>
              ,{' '}
              <Link href="/blog/rrso-kredyt-hipoteczny" className="text-white underline hover:text-emerald-50">
                RRSO kredytu hipotecznego
              </Link>
              ,{' '}
              <Link href="/blog/ranking-bankow-kredytow-hipotecznych-2026" className="text-white underline hover:text-emerald-50">
                rankingu banków kredytów hipotecznych
              </Link>
              {' '}i{' '}
              <Link href="/blog/jak-negocjowac-warunki-kredytu-hipotecznego" className="text-white underline hover:text-emerald-50">
                jak negocjować warunki kredytu
              </Link>
              .
            </SummaryText>
            <SummaryCta href="/kalkulator/kredyt-hipoteczny">
              Porównaj oferty banków w kalkulatorze
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

const CriteriaGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const CriterionCard = tw.li`flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1 hover:shadow-lg`
const CriterionHeader = tw.div`mb-4 flex items-start gap-4`
const CriterionIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const CriterionInfo = tw.div`flex-1`
const CriterionTitle = tw.h3`mb-2 text-xl font-semibold text-gray-900`
const CriterionBadge = tw.span`inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700`
const CriterionDescription = tw.p`text-sm leading-relaxed text-gray-600`

const StepsList = tw.ul`mx-auto max-w-4xl space-y-6`
const StepCard = tw.li`flex gap-6 rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm`
const StepHeader = tw.div`flex shrink-0 items-start gap-4`
const StepNumber = tw.span`flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white`
const StepIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const StepContent = tw.div`flex-1`
const StepTitle = tw.h3`mb-2 text-xl font-semibold text-gray-900`
const StepDescription = tw.p`text-sm leading-relaxed text-gray-600`

const MistakesList = tw.ul`mx-auto max-w-3xl space-y-4`
const MistakeCard = tw.li`rounded-2xl border border-red-200 bg-red-50/50 p-6 shadow-sm`
const MistakeHeader = tw.div`mb-3 flex items-start justify-between gap-4`
const MistakeTitle = tw.h3`flex-1 text-xl font-semibold text-gray-900`
const MistakeBadge = tw.span`inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700`
const MistakeDescription = tw.p`mb-3 text-sm leading-relaxed text-gray-600`
const MistakeSolution = tw.p`rounded-lg bg-white p-3 text-sm font-semibold text-emerald-800`

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

