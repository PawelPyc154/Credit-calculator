import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowLongRight,
  HiOutlineCalculator,
  HiOutlineChartBar,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentText,
  HiOutlineHome,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineUsers,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'
import { getPostRobotsMetadata } from 'utils/blog-posts'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {  robots: getPostRobotsMetadata('wklad-wlasny-kredyt-hipoteczny'),

  title: 'Wkład własny na kredyt hipoteczny 2025 - ile potrzebujesz?',
  description:
    'Dowiedz się, ile wynosi minimalny wkład własny na kredyt hipoteczny, jak go obliczyć i jakie korzyści daje wyższy wkład własny. Sprawdź w kalkulatorze.',
  alternates: {
    canonical: `${siteUrl}/blog/wklad-wlasny-kredyt-hipoteczny`,
  },
  keywords: [
    'wkład własny kredyt hipoteczny',
    'ile wkład własny na kredyt',
    'wkład własny 20 procent',
    'minimalny wkład własny',
    'wkład własny bez wkładu własnego',
    'wkład własny dla młodych',
    'jak oszczędzić na wkład własny',
  ],
  openGraph: {
    title: 'Wkład własny na kredyt hipoteczny 2025 - ile potrzebujesz?',
    description:
      'Kompletny przewodnik po wkładzie własnym: wymagania banków, korzyści wyższego wkładu i sposoby na jego zgromadzenie.',
    url: `${siteUrl}/blog/wklad-wlasny-kredyt-hipoteczny`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Wkład własny na kredyt hipoteczny - przewodnik',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wkład własny na kredyt hipoteczny 2025',
    description: 'Dowiedz się, ile wynosi minimalny wkład własny i jak go obliczyć przed zakupem nieruchomości.',
    images: [`${siteUrl}/og-image.jpg`],
  },
}

const downPaymentLevels = [
  {
    percent: 20,
    title: 'Wkład własny 20% - standardowy wymóg',
    description:
      'Większość banków wymaga minimum 20% wartości nieruchomości jako wkładu własnego. To standardowy próg, który daje dostęp do najlepszych warunków kredytu.',
    benefits: [
      'Dostęp do standardowych ofert wszystkich banków',
      'Niższe oprocentowanie niż przy niższym wkładzie',
      'Brak obowiązkowego ubezpieczenia niskiego wkładu',
      'Większa szansa na akceptację wniosku',
      'Niższe koszty całkowite kredytu',
    ],
    requirements: 'Standardowy wymóg większości banków',
  },
  {
    percent: 10,
    title: 'Wkład własny 10% - program mdM dla młodych',
    description:
      'W programie mdM (Mieszkanie dla Młodych) możesz otrzymać kredyt z wkładem własnym zaledwie 10%. Program jest dostępny dla osób do 45. roku życia.',
    benefits: [
      'Możliwość zakupu mieszkania z niższym wkładem',
      'Dostęp do programu rządowego mdM',
      'Możliwość łączenia z innymi programami wsparcia',
      'Szybsze wejście na rynek nieruchomości',
    ],
    requirements: 'Wiek do 45 lat, pierwsze mieszkanie, spełnienie warunków programu mdM',
  },
  {
    percent: 0,
    title: 'Kredyt bez wkładu własnego - bardzo rzadko',
    description:
      'Kredyt hipoteczny bez wkładu własnego jest praktycznie niemożliwy do uzyskania. Banki wymagają minimum 10% w programie mdM, a standardowo 20%.',
    benefits: [],
    requirements: 'Bardzo rzadko dostępne, tylko w wyjątkowych sytuacjach',
  },
  {
    percent: 30,
    title: 'Wkład własny 30%+ - najlepsze warunki',
    description:
      'Wyższy wkład własny (30% lub więcej) daje dostęp do najlepszych warunków kredytu: niższe oprocentowanie, brak dodatkowych ubezpieczeń i większą elastyczność.',
    benefits: [
      'Najniższe oprocentowanie dostępne',
      'Brak dodatkowych ubezpieczeń niskiego wkładu',
      'Większa elastyczność w negocjacjach',
      'Niższe całkowite koszty kredytu',
      'Szybsza akceptacja wniosku',
    ],
    requirements: 'Wymaga większych oszczędności, ale daje najlepsze warunki',
  },
]

const waysToSave = [
  {
    title: 'Oszczędzanie regularne',
    description:
      'Systematyczne odkładanie części dochodu to najpewniejszy sposób na zgromadzenie wkładu własnego. Ustal stałą kwotę miesięczną i trzymaj się planu.',
    tips: [
      'Otwórz osobne konto oszczędnościowe',
      'Ustaw automatyczne przelewy na dzień wypłaty',
      'Zwiększaj kwotę oszczędności wraz z podwyżkami',
      'Unikaj wycofywania środków z konta oszczędnościowego',
    ],
    icon: HiOutlineCurrencyDollar,
  },
  {
    title: 'Programy rządowe',
    description:
      'Rządowe programy wsparcia mogą pomóc w zgromadzeniu wkładu własnego lub jego częściowym pokryciu.',
    tips: [
      'Program mdM - możliwość niższego wkładu (10%)',
      'Program Rodzina na Swoim - wsparcie dla rodzin',
      'Lokalny program mieszkaniowy - sprawdź w gminie',
      'Programy dla młodych - różne inicjatywy regionalne',
    ],
    icon: HiOutlineHome,
  },
  {
    title: 'Pożyczka na wkład własny',
    description:
      'Niektóre banki oferują pożyczki na wkład własny, ale to rozwiązanie zwiększa ryzyko i koszty. Warto rozważyć tylko w wyjątkowych sytuacjach.',
    tips: [
      'Sprawdź warunki pożyczki dokładnie',
      'Uwzględnij dodatkowe koszty pożyczki',
      'Rozważ wpływ na zdolność kredytową',
      'Porównaj z oszczędzaniem - często lepsze rozwiązanie',
    ],
    icon: HiOutlineDocumentText,
  },
  {
    title: 'Sprzedaż majątku',
    description:
      'Sprzedaż nieużywanych przedmiotów, samochodu lub innej nieruchomości może pomóc w szybkim zgromadzeniu wkładu własnego.',
    tips: [
      'Sprzedaj nieużywane przedmioty',
      'Rozważ sprzedaż samochodu (jeśli nie jest konieczny)',
      'Sprzedaj udział w nieruchomości (jeśli masz)',
      'Użyj środków z lokaty lub inwestycji',
    ],
    icon: HiOutlineCheckCircle,
  },
]

const faqData = [
  {
    question: 'Ile wynosi minimalny wkład własny na kredyt hipoteczny?',
    answer:
      'Standardowy minimalny wkład własny to 20% wartości nieruchomości. W programie mdM dla młodych (do 45 lat) możliwe jest uzyskanie kredytu z wkładem własnym 10%. Większość banków nie oferuje kredytów bez wkładu własnego.',
  },
  {
    question: 'Jak obliczyć wkład własny?',
    answer:
      'Wkład własny obliczasz jako procent wartości nieruchomości. Jeśli mieszkanie kosztuje 500 000 zł, a wkład własny to 20%, potrzebujesz 100 000 zł. Wartość nieruchomości = kwota kredytu + wkład własny. Możesz użyć naszego kalkulatora kredytu hipotecznego, aby sprawdzić różne scenariusze.',
  },
  {
    question: 'Czy mogę wziąć kredyt bez wkładu własnego?',
    answer:
      'Praktycznie nie. Banki wymagają minimum 10% w programie mdM (dla młodych do 45 lat) lub standardowo 20%. Kredyt bez wkładu własnego jest bardzo rzadko dostępny i tylko w wyjątkowych sytuacjach. Warto oszczędzać na wkład własny, ponieważ wyższy wkład daje lepsze warunki kredytu.',
  },
  {
    question: 'Czy wyższy wkład własny daje lepsze warunki?',
    answer:
      'Tak, wyższy wkład własny (30%+) daje dostęp do najlepszych warunków: niższe oprocentowanie, brak dodatkowych ubezpieczeń niskiego wkładu, większą elastyczność w negocjacjach i niższe całkowite koszty kredytu. Banki traktują wyższy wkład jako zmniejszenie ryzyka.',
  },
  {
    question: 'Czy mogę użyć pożyczki jako wkładu własnego?',
    answer:
      'Niektóre banki oferują pożyczki na wkład własny, ale to rozwiązanie zwiększa ryzyko i koszty. Bank sprawdzi, czy pożyczka nie wpływa negatywnie na zdolność kredytową. Warto rozważyć to tylko w wyjątkowych sytuacjach i po dokładnym przeanalizowaniu kosztów.',
  },
  {
    question: 'Jak szybko mogę zgromadzić wkład własny?',
    answer:
      'Czas zgromadzenia wkładu własnego zależy od Twoich możliwości oszczędzania. Przy regularnym oszczędzaniu 20% dochodu i mieszkaniu za 500 000 zł (wkład 100 000 zł), przy dochodzie 8000 zł netto, potrzebujesz około 5-6 lat. Możesz przyspieszyć proces poprzez programy rządowe, sprzedaż majątku lub dodatkowe źródła dochodu.',
  },
  {
    question: 'Czy wkład własny musi być w gotówce?',
    answer:
      'Tak, wkład własny musi być dostępny w formie gotówkowej lub na koncie bankowym przed podpisaniem umowy kredytowej. Bank sprawdzi źródło środków i wymaga dokumentów potwierdzających legalność pochodzenia pieniędzy. Nie możesz użyć jako wkładu własnego innej nieruchomości (chyba że sprzedasz ją wcześniej).',
  },
  {
    question: 'Co się dzieje, jeśli nie mam wystarczającego wkładu własnego?',
    answer:
      'Jeśli nie masz wystarczającego wkładu własnego, bank nie udzieli kredytu. Musisz zgromadzić wymagany wkład (minimum 10% w mdM lub 20% standardowo) przed złożeniem wniosku. Możesz rozważyć tańsze mieszkanie, programy wsparcia, pożyczkę na wkład własny (ostrożnie) lub dalsze oszczędzanie.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Wkład własny na kredyt hipoteczny 2025 - ile potrzebujesz?',
  description:
    'Kompletny przewodnik po wkładzie własnym: wymagania banków, korzyści wyższego wkładu, sposoby na jego zgromadzenie i kalkulator do obliczeń.',
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
  datePublished: '2025-11-12',
  dateModified: '2025-11-12',
  mainEntityOfPage: `${siteUrl}/blog/wklad-wlasny-kredyt-hipoteczny`,
  articleSection: ['Wkład własny', 'Kredyt hipoteczny', 'Poradniki finansowe'],
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
      name: 'Wkład własny na kredyt hipoteczny 2025',
      item: `${siteUrl}/blog/wklad-wlasny-kredyt-hipoteczny`,
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
    slug: 'kredyt-hipoteczny-bez-wkladu-wlasnego',
    title: 'Kredyt hipoteczny bez wkładu własnego',
    description: 'Dowiedz się, czy można wziąć kredyt bez wkładu własnego.',
  },
  {
    slug: 'kredyt-hipoteczny-dla-mlodych-programy-wsparcia',
    title: 'Kredyt hipoteczny dla młodych - programy wsparcia',
    description: 'Poznaj programy wsparcia dla młodych kredytobiorców.',
  },
  {
    slug: 'ranking-bankow-kredytow-hipotecznych-2025',
    title: 'Ranking banków kredytów hipotecznych 2025',
    description: 'Porównaj oferty banków i znajdź najlepszy kredyt dla siebie.',
  },
]

export default function DownPaymentPage() {
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
              <BreadcrumbCurrent>Wkład własny na kredyt hipoteczny 2025</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>

        <HeroSection>
          <HeroEyebrow>Podstawy kredytu</HeroEyebrow>
          <HeroTitle>Wkład własny na kredyt hipoteczny 2025 - ile potrzebujesz?</HeroTitle>
          <HeroLead>
            Wkład własny to kluczowy element kredytu hipotecznego. Większość banków wymaga minimum 20% wartości
            nieruchomości, choć w programie mdM dla młodych możliwe jest uzyskanie kredytu z wkładem własnym
            zaledwie 10%. W tym przewodniku dowiesz się, ile wynosi minimalny wkład własny, jak go obliczyć,
            jakie korzyści daje wyższy wkład i jak go zgromadzić. Sprawdź, ile wyniesie Twoja rata przy
            różnych poziomach wkładu własnego w naszym kalkulatorze kredytu hipotecznego.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź ratę przy różnych wkładach własnych
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
                <strong>Standardowy wkład własny to 20%</strong> wartości nieruchomości - większość banków
                wymaga minimum tyle.
              </li>
              <li>
                <strong>W programie mdM możliwe jest 10%</strong> wkładu własnego dla osób do 45. roku życia.
              </li>
              <li>
                <strong>Wyższy wkład (30%+) daje lepsze warunki</strong> - niższe oprocentowanie i brak
                dodatkowych ubezpieczeń.
              </li>
              <li>
                <strong>Wkład własny musi być w gotówce</strong> - bank sprawdzi źródło środków przed
                udzieleniem kredytu.
              </li>
            </IntroList>
          </IntroContent>
        </IntroCard>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineDocumentText size={18} />
              Definicja
            </SectionBadge>
            <SectionTitle>Co to jest wkład własny?</SectionTitle>
            <SectionSubtitle>
              Wkład własny to część wartości nieruchomości, którą płacisz z własnych środków, bez kredytu.
            </SectionSubtitle>
          </SectionHeader>
          <ArticleText>
            Wkład własny to kwota, którą musisz zapłacić za nieruchomość z własnych środków, bez korzystania z
            kredytu. Jest to Twój udział w zakupie nieruchomości, który zmniejsza kwotę kredytu i ryzyko
            banku. Im wyższy wkład własny, tym niższa kwota kredytu i lepsze warunki finansowania.
          </ArticleText>
          <ArticleText>
            Wkład własny jest wyrażany jako procent wartości nieruchomości. Jeśli mieszkanie kosztuje 500 000
            zł, a wkład własny to 20%, potrzebujesz 100 000 zł własnych środków. Pozostałe 400 000 zł możesz
            sfinansować kredytem hipotecznym.
          </ArticleText>
          <CtaBox>
            <CtaTitle>Oblicz wkład własny w kalkulatorze</CtaTitle>
            <CtaText>
              Sprawdź w naszym kalkulatorze kredytu hipotecznego, aby sprawdzić, jak zmienia się rata przy różnych
              poziomach wkładu własnego i wybrać najlepsze rozwiązanie dla siebie.
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
              <HiOutlineChartBar size={18} />
              Poziomy wkładu
            </SectionBadge>
            <SectionTitle>Jakie są wymagania dotyczące wkładu własnego?</SectionTitle>
            <SectionSubtitle>
              Poznaj różne poziomy wkładu własnego i wymagania banków dla każdego z nich.
            </SectionSubtitle>
          </SectionHeader>
          <LevelsGrid role="list">
            {downPaymentLevels.map((level) => (
              <LevelCard key={level.percent} role="listitem">
                <LevelHeader>
                  <LevelPercent>{level.percent}%</LevelPercent>
                  <LevelTitle>{level.title}</LevelTitle>
                </LevelHeader>
                <LevelDescription>{level.description}</LevelDescription>
                {level.benefits.length > 0 && (
                  <>
                    <LevelBenefitsTitle>Korzyści:</LevelBenefitsTitle>
                    <LevelBenefitsList>
                      {level.benefits.map((benefit) => (
                        <li key={benefit}>{benefit}</li>
                      ))}
                    </LevelBenefitsList>
                  </>
                )}
                <LevelRequirements>
                  <strong>Wymagania:</strong> {level.requirements}
                </LevelRequirements>
              </LevelCard>
            ))}
          </LevelsGrid>
          <ArticleText>
            Więcej informacji o programie mdM dla młodych znajdziesz w naszym artykule:{' '}
            <Link href="/blog/kredyt-hipoteczny-dla-mlodych-programy-wsparcia" className="text-emerald-700 underline hover:text-emerald-800">
              Kredyt hipoteczny dla młodych - programy wsparcia
            </Link>
            . Jeśli zastanawiasz się nad kredytem bez wkładu własnego, przeczytaj nasz przewodnik:{' '}
            <Link href="/blog/kredyt-hipoteczny-bez-wkladu-wlasnego" className="text-emerald-700 underline hover:text-emerald-800">
              Kredyt hipoteczny bez wkładu własnego - czy to możliwe?
            </Link>
            .
          </ArticleText>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineCalculator size={18} />
              Obliczanie
            </SectionBadge>
            <SectionTitle>Jak obliczyć wkład własny?</SectionTitle>
            <SectionSubtitle>
              Oto prosty sposób na obliczenie wymaganego wkładu własnego dla wybranej nieruchomości.
            </SectionSubtitle>
          </SectionHeader>
          <CalculationSteps role="list">
            <StepCard role="listitem">
              <StepNumber>1</StepNumber>
              <StepContent>
                <StepTitle>Określ wartość nieruchomości</StepTitle>
                <StepDescription>
                  Wartość nieruchomości to cena zakupu lub wycena bankowa (ta niższa). To jest podstawa do
                  obliczenia wkładu własnego.
                </StepDescription>
                <StepExample>
                  <strong>Przykład:</strong> Mieszkanie kosztuje 500 000 zł
                </StepExample>
              </StepContent>
            </StepCard>
            <StepCard role="listitem">
              <StepNumber>2</StepNumber>
              <StepContent>
                <StepTitle>Wybierz poziom wkładu własnego</StepTitle>
                <StepDescription>
                  Standardowy wkład to 20%, ale możesz wybrać wyższy (30%+) dla lepszych warunków lub 10% w
                  programie mdM.
                </StepDescription>
                <StepExample>
                  <strong>Przykład:</strong> Wybierasz wkład własny 20%
                </StepExample>
              </StepContent>
            </StepCard>
            <StepCard role="listitem">
              <StepNumber>3</StepNumber>
              <StepContent>
                <StepTitle>Oblicz kwotę wkładu własnego</StepTitle>
                <StepDescription>
                  Pomnóż wartość nieruchomości przez procent wkładu własnego. To jest kwota, którą musisz mieć
                  w gotówce.
                </StepDescription>
                <StepExample>
                  <strong>Przykład:</strong> 500 000 zł × 20% = 100 000 zł wkładu własnego
                </StepExample>
              </StepContent>
            </StepCard>
            <StepCard role="listitem">
              <StepNumber>4</StepNumber>
              <StepContent>
                <StepTitle>Oblicz kwotę kredytu</StepTitle>
                <StepDescription>
                  Odejmij wkład własny od wartości nieruchomości. To jest kwota, którą możesz sfinansować
                  kredytem hipotecznym.
                </StepDescription>
                <StepExample>
                  <strong>Przykład:</strong> 500 000 zł - 100 000 zł = 400 000 zł kredytu
                </StepExample>
              </StepContent>
            </StepCard>
          </CalculationSteps>
          <CtaBox>
            <CtaTitle>Użyj kalkulatora do dokładnych obliczeń</CtaTitle>
            <CtaText>
              Nasz kalkulator kredytu hipotecznego automatycznie obliczy wkład własny, kwotę kredytu i ratę
              dla różnych scenariuszy. Wystarczy podać wartość nieruchomości i wybrany poziom wkładu. Sprawdź też,{' '}
              <Link href="/blog/jak-obliczyc-zdolnosc-kredytowa" className="text-emerald-700 underline hover:text-emerald-800">
                jak obliczyć zdolność kredytową
              </Link>
              , aby dowiedzieć się, na jaką kwotę możesz liczyć.
            </CtaText>
            <CtaButton href="/kalkulator/kredyt-hipoteczny">
              Oblicz w kalkulatorze
              <HiOutlineArrowLongRight size={18} />
            </CtaButton>
          </CtaBox>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineCurrencyDollar size={18} />
              Oszczędzanie
            </SectionBadge>
            <SectionTitle>Jak zgromadzić wkład własny?</SectionTitle>
            <SectionSubtitle>
              Praktyczne sposoby na zgromadzenie wymaganego wkładu własnego przed zakupem nieruchomości.
            </SectionSubtitle>
          </SectionHeader>
          <WaysGrid role="list">
            {waysToSave.map((way) => {
              const IconComponent = way.icon
              return (
                <WayCard key={way.title} role="listitem">
                  <WayIcon aria-hidden="true">
                    <IconComponent size={24} />
                  </WayIcon>
                  <WayTitle>{way.title}</WayTitle>
                  <WayDescription>{way.description}</WayDescription>
                  <WayTips>
                    <WayTipsTitle>Praktyczne wskazówki:</WayTipsTitle>
                    <WayTipsList>
                      {way.tips.map((tip) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </WayTipsList>
                  </WayTips>
                </WayCard>
              )
            })}
          </WaysGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineShieldCheck size={18} />
              Korzyści
            </SectionBadge>
            <SectionTitle>Dlaczego wyższy wkład własny jest lepszy?</SectionTitle>
            <SectionSubtitle>
              Wyższy wkład własny daje dostęp do lepszych warunków kredytu i niższych kosztów całkowitych.
            </SectionSubtitle>
          </SectionHeader>
          <BenefitsList role="list">
            <BenefitItem>
              <BenefitIcon aria-hidden="true">✓</BenefitIcon>
              <BenefitContent>
                <BenefitTitle>Niższe oprocentowanie</BenefitTitle>
                <BenefitDescription>
                  Banki oferują niższe oprocentowanie przy wyższym wkładzie własnym, ponieważ zmniejsza to
                  ryzyko kredytowe. Różnica może wynosić nawet 0,5-1 punkt procentowy.
                </BenefitDescription>
              </BenefitContent>
            </BenefitItem>
            <BenefitItem>
              <BenefitIcon aria-hidden="true">✓</BenefitIcon>
              <BenefitContent>
                <BenefitTitle>Brak dodatkowych ubezpieczeń</BenefitTitle>
                <BenefitDescription>
                  Przy wkładzie własnym poniżej 20% banki często wymagają dodatkowego ubezpieczenia niskiego
                  wkładu, które zwiększa koszty. Przy wkładzie 20%+ to ubezpieczenie nie jest wymagane.
                </BenefitDescription>
              </BenefitContent>
            </BenefitItem>
            <BenefitItem>
              <BenefitIcon aria-hidden="true">✓</BenefitIcon>
              <BenefitContent>
                <BenefitTitle>Niższa rata kredytu</BenefitTitle>
                <BenefitDescription>
                  Wyższy wkład własny oznacza niższą kwotę kredytu, a więc niższą miesięczną ratę. To
                  zmniejsza obciążenie budżetu domowego i zwiększa bezpieczeństwo finansowe.
                </BenefitDescription>
              </BenefitContent>
            </BenefitItem>
            <BenefitItem>
              <BenefitIcon aria-hidden="true">✓</BenefitIcon>
              <BenefitContent>
                <BenefitTitle>Większa szansa na akceptację</BenefitTitle>
                <BenefitDescription>
                  Banki chętniej akceptują wnioski kredytowe z wyższym wkładem własnym, ponieważ to zmniejsza
                  ryzyko i zwiększa szansę na spłatę kredytu.
                </BenefitDescription>
              </BenefitContent>
            </BenefitItem>
            <BenefitItem>
              <BenefitIcon aria-hidden="true">✓</BenefitIcon>
              <BenefitContent>
                <BenefitTitle>Niższe całkowite koszty</BenefitTitle>
                <BenefitDescription>
                  Wyższy wkład własny oznacza niższą kwotę kredytu, mniej odsetek do zapłacenia i niższe
                  całkowite koszty finansowania. To może zaoszczędzić dziesiątki tysięcy złotych w ciągu
                  całego okresu kredytowania.
                </BenefitDescription>
              </BenefitContent>
            </BenefitItem>
          </BenefitsList>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineDocumentText size={18} />
              FAQ
            </SectionBadge>
            <SectionTitle>Najczęściej zadawane pytania o wkład własny</SectionTitle>
            <SectionSubtitle>
              Odpowiedzi na najpopularniejsze pytania dotyczące wkładu własnego na kredyt hipoteczny.
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
              Wkład własny to kluczowy element kredytu hipotecznego. Standardowy wymóg to 20% wartości
              nieruchomości, choć w programie mdM dla młodych możliwe jest uzyskanie kredytu z wkładem
              własnym 10%. Wyższy wkład własny (30%+) daje dostęp do najlepszych warunków: niższe
              oprocentowanie, brak dodatkowych ubezpieczeń i niższe całkowite koszty kredytu.
            </SummaryText>
            <SummaryText>
              Wkład własny możesz zgromadzić poprzez regularne oszczędzanie, programy rządowe, sprzedaż majątku
              lub pożyczkę (ostrożnie). Pamiętaj, że wkład własny musi być dostępny w gotówce przed
              podpisaniem umowy kredytowej. Sprawdź, ile wyniesie Twoja rata przy różnych poziomach wkładu
              własnego w naszym kalkulatorze kredytu hipotecznego. Przeczytaj też nasze przewodniki o{' '}
              <Link href="/blog/ranking-bankow-kredytow-hipotecznych-2025" className="text-white underline hover:text-emerald-50">
                rankingu banków kredytów hipotecznych
              </Link>{' '}
              i{' '}
              <Link href="/blog/rrso-kredyt-hipoteczny" className="text-white underline hover:text-emerald-50">
                RRSO kredytu hipotecznego
              </Link>
              , aby wybrać najlepszą ofertę.
            </SummaryText>
            <SummaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź ratę przy różnych wkładach własnych w kalkulatorze
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

const LevelsGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const LevelCard = tw.li`flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1 hover:shadow-lg`
const LevelHeader = tw.div`mb-4 flex items-start gap-4`
const LevelPercent = tw.span`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-2xl font-bold text-white`
const LevelTitle = tw.h3`flex-1 text-xl font-semibold text-gray-900`
const LevelDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const LevelBenefitsTitle = tw.h4`mb-2 text-sm font-semibold text-gray-900`
const LevelBenefitsList = tw.ul`mb-4 grid gap-2 text-sm text-gray-600 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`
const LevelRequirements = tw.p`mt-auto rounded-lg bg-gray-50 p-3 text-xs text-gray-600`

const CalculationSteps = tw.ul`mx-auto max-w-3xl space-y-6`
const StepCard = tw.li`flex gap-4 rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm`
const StepNumber = tw.span`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white`
const StepContent = tw.div`flex-1`
const StepTitle = tw.h3`mb-2 text-lg font-semibold text-gray-900`
const StepDescription = tw.p`mb-2 text-sm leading-relaxed text-gray-600`
const StepExample = tw.p`rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800`

const WaysGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const WayCard = tw.li`flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1 hover:shadow-lg`
const WayIcon = tw.span`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const WayTitle = tw.h3`mb-2 text-xl font-semibold text-gray-900`
const WayDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const WayTips = tw.div`mt-auto`
const WayTipsTitle = tw.h4`mb-2 text-sm font-semibold text-gray-900`
const WayTipsList = tw.ul`grid gap-2 text-sm text-gray-600 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`

const BenefitsList = tw.ul`mx-auto max-w-3xl space-y-4`
const BenefitItem = tw.li`flex gap-4 rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm`
const BenefitIcon = tw.span`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white`
const BenefitContent = tw.div`flex-1`
const BenefitTitle = tw.h3`mb-2 text-lg font-semibold text-gray-900`
const BenefitDescription = tw.p`text-sm leading-relaxed text-gray-600`

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

