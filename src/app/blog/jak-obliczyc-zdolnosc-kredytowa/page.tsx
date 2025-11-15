import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowLongRight,
  HiOutlineCalculator,
  HiOutlineChartBar,
  HiOutlineClipboardDocumentCheck,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlineHome,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineUsers,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'
import { getPostRobotsMetadata } from 'utils/blog-posts'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {  robots: getPostRobotsMetadata('jak-obliczyc-zdolnosc-kredytowa'),

  title: 'Jak obliczyć zdolność kredytową? Kompletny przewodnik 2025',
  description:
    'Dowiedz się, jak banki obliczają zdolność kredytową, jakie czynniki mają wpływ i jak samodzielnie oszacować swoją zdolność przed wizytą w banku. Sprawdź w kalkulatorze.',
  alternates: {
    canonical: `${siteUrl}/blog/jak-obliczyc-zdolnosc-kredytowa`,
  },
  keywords: [
    'jak obliczyć zdolność kredytową',
    'zdolność kredytowa kalkulator',
    'ile mogę pożyczyć na kredyt hipoteczny',
    'obliczanie zdolności kredytowej',
    'zdolność kredytowa 2025',
    'jak bank oblicza zdolność kredytową',
    'zdolność kredytowa dla singla',
    'zdolność kredytowa przy dwóch dochodach',
  ],
  openGraph: {
    title: 'Jak obliczyć zdolność kredytową? Kompletny przewodnik 2025',
    description:
      'Poznaj wszystkie czynniki wpływające na zdolność kredytową i dowiedz się, jak samodzielnie oszacować, ile możesz pożyczyć na kredyt hipoteczny.',
    url: `${siteUrl}/blog/jak-obliczyc-zdolnosc-kredytowa`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Jak obliczyć zdolność kredytową - przewodnik',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jak obliczyć zdolność kredytową? Przewodnik 2025',
    description:
      'Dowiedz się, jak banki obliczają zdolność kredytową i jak samodzielnie oszacować swoją zdolność przed wizytą w banku.',
    images: [`${siteUrl}/og-image.jpg`],
  },
}

const factors = [
  {
    title: 'Dochód miesięczny netto',
    description:
      'To podstawowy czynnik decydujący o zdolności kredytowej. Banki biorą pod uwagę dochód netto (po odliczeniu podatków i składek). Im wyższy dochód, tym większa zdolność kredytowa.',
    details: [
      'Dochód z umowy o pracę (netto)',
      'Dochód z działalności gospodarczej (średnia z 12-24 miesięcy)',
      'Dochód z umów zlecenia/umów o dzieło (jeśli regularne)',
      'Dochody dodatkowe (najem, dywidendy) - często z obniżeniem',
      'Dochód współmałżonka/partnera (w przypadku kredytu wspólnego)',
    ],
    icon: HiOutlineCurrencyDollar,
    impact: 'wysoki',
  },
  {
    title: 'Obecne zobowiązania finansowe',
    description:
      'Wszystkie miesięczne raty kredytów, pożyczek, kart kredytowych i innych zobowiązań zmniejszają dostępną zdolność kredytową. Banki sprawdzają historię w BIK i innych biurach informacji kredytowej.',
    details: [
      'Raty kredytów gotówkowych i konsumpcyjnych',
      'Raty kredytów samochodowych',
      'Limity wykorzystane na kartach kredytowych',
      'Raty pożyczek pozabankowych',
      'Alimenty i inne zobowiązania alimentacyjne',
      'Czynsze i opłaty za mieszkanie (jeśli nie własne)',
    ],
    icon: HiOutlineDocumentText,
    impact: 'wysoki',
  },
  {
    title: 'Wiek kredytobiorcy',
    description:
      'Banki preferują kredytobiorców w wieku produkcyjnym. Minimalny wiek to zwykle 18-21 lat, maksymalny wiek na koniec spłaty kredytu to zazwyczaj 65-75 lat.',
    details: [
      'Młodsi kredytobiorcy mogą mieć niższą zdolność (mniej doświadczenia zawodowego)',
      'Osoby 30-50 lat mają zazwyczaj najlepsze warunki',
      'Po 60. roku życia zdolność może być ograniczona',
      'Wiek na koniec spłaty nie może przekraczać 65-75 lat',
    ],
    icon: HiOutlineUsers,
    impact: 'średni',
  },
  {
    title: 'Stabilność zatrudnienia',
    description:
      'Banki preferują osoby ze stabilnym zatrudnieniem. Długość pracy w jednym miejscu i forma zatrudnienia mają znaczenie przy ocenie zdolności kredytowej.',
    details: [
      'Umowa o pracę na czas nieokreślony - najlepsza sytuacja',
      'Umowa o pracę na czas określony - wymagany okres (np. min. 6-12 miesięcy)',
      'Działalność gospodarcza - wymagana historia (12-24 miesiące)',
      'Umowy zlecenie/dzieło - trudniejsze do udowodnienia stabilności',
      'Zmiana pracy - może wymagać okresu oczekiwania',
    ],
    icon: HiOutlineShieldCheck,
    impact: 'wysoki',
  },
  {
    title: 'Wkład własny',
    description:
      'Im wyższy wkład własny, tym lepsze warunki kredytu i większa zdolność kredytowa. Wkład własny zmniejsza ryzyko banku i pozwala na lepsze oprocentowanie.',
    details: [
      'Wkład własny 20% - standardowy wymóg',
      'Wkład własny 10% - możliwy w programie mdM dla młodych',
      'Wkład własny 0% - bardzo rzadko, tylko w specjalnych programach',
      'Wyższy wkład własny (30%+) - lepsze warunki i większa zdolność',
    ],
    icon: HiOutlineHome,
    impact: 'średni',
  },
  {
    title: 'Historia kredytowa',
    description:
      'Pozytywna historia spłat w BIK zwiększa zaufanie banku i może wpłynąć na lepsze warunki kredytu. Negatywna historia może całkowicie wykluczyć możliwość zaciągnięcia kredytu.',
    details: [
      'Pozytywna historia - regularne spłaty bez opóźnień',
      'Brak historii - neutralne, ale może wymagać dodatkowych dokumentów',
      'Negatywna historia - opóźnienia, zaległości, egzekucje',
      'Weryfikacja w BIK, BIG, KRD - wszystkie biura są sprawdzane',
    ],
    icon: HiOutlineClipboardDocumentCheck,
    impact: 'wysoki',
  },
]

const calculationSteps = [
  {
    step: 1,
    title: 'Oblicz swój dochód netto',
    description:
      'Zsumuj wszystkie dochody netto (po odliczeniu podatków i składek). Jeśli masz nieregularne dochody, oblicz średnią z ostatnich 12-24 miesięcy.',
    example: 'Dochód z pracy: 5000 zł netto + dochód z najmu: 2000 zł = 7000 zł netto miesięcznie',
  },
  {
    step: 2,
    title: 'Odejmij wszystkie zobowiązania',
    description:
      'Zsumuj wszystkie miesięczne raty kredytów, pożyczek, kart kredytowych i innych zobowiązań. Pamiętaj o limitach wykorzystanych na kartach kredytowych.',
    example: 'Rata kredytu samochodowego: 800 zł + limit karty: 2000 zł (10% = 200 zł) = 1000 zł zobowiązań',
  },
  {
    step: 3,
    title: 'Oblicz dostępny dochód',
    description:
      'Odejmij zobowiązania od dochodu netto. To jest kwota, którą możesz przeznaczyć na ratę kredytu hipotecznego.',
    example: 'Dochód netto: 7000 zł - zobowiązania: 1000 zł = 6000 zł dostępnego dochodu',
  },
  {
    step: 4,
    title: 'Zastosuj wskaźnik DTI',
    description:
      'Banki zazwyczaj wymagają, aby rata kredytu nie przekraczała 40-50% dostępnego dochodu. Niektóre banki są bardziej restrykcyjne (30-35%), inne mniej (do 60%).',
    example: 'Dostępny dochód: 6000 zł × 50% = maksymalna rata: 3000 zł',
  },
  {
    step: 5,
    title: 'Oblicz maksymalną kwotę kredytu',
    description:
      'Na podstawie maksymalnej raty, oprocentowania i okresu kredytowania oblicz maksymalną kwotę kredytu. Możesz użyć kalkulatora kredytu hipotecznego.',
    example: 'Rata: 3000 zł, oprocentowanie: 7%, okres: 25 lat → kwota kredytu: ~450 000 zł',
  },
]

const commonMistakes = [
  {
    title: 'Niedoszacowanie zobowiązań',
    description:
      'Wiele osób zapomina o limitach kart kredytowych, które banki traktują jako zobowiązanie nawet jeśli nie są wykorzystane w pełni. Banki często liczą 5-10% limitu jako miesięczne zobowiązanie.',
  },
  {
    title: 'Brak uwzględnienia kosztów utrzymania',
    description:
      'Banki sprawdzają nie tylko dochód i zobowiązania, ale także koszty utrzymania. Zbyt wysokie koszty życia mogą zmniejszyć zdolność kredytową.',
  },
  {
    title: 'Nierealistyczne założenia oprocentowania',
    description:
      'Przy obliczaniu zdolności kredytowej warto użyć wyższego oprocentowania niż aktualne, aby uwzględnić możliwe podwyżki stóp procentowych.',
  },
  {
    title: 'Ignorowanie dodatkowych kosztów',
    description:
      'Oprócz raty kredytu, banki biorą pod uwagę także ubezpieczenia, opłaty za konto, prowizje i inne koszty związane z kredytem.',
  },
]

const faqData = [
  {
    question: 'Jak bank oblicza zdolność kredytową?',
    answer:
      'Banki obliczają zdolność kredytową na podstawie dochodu netto, zobowiązań finansowych, wieku, stabilności zatrudnienia i historii kredytowej. Najczęściej stosują wskaźnik DTI (debt-to-income), który określa, że rata kredytu nie powinna przekraczać 40-50% dostępnego dochodu. Każdy bank ma swoje własne algorytmy i może różnie oceniać te same dane.',
  },
  {
    question: 'Ile mogę pożyczyć na kredyt hipoteczny?',
    answer:
      'Kwota kredytu zależy od wielu czynników: dochodu, zobowiązań, wieku, wkładu własnego i historii kredytowej. Zazwyczaj możesz pożyczyć kwotę, której rata nie przekroczy 40-50% Twojego dostępnego dochodu (dochód minus zobowiązania). Najlepiej sprawdzić to w kalkulatorze kredytu hipotecznego, który uwzględnia aktualne oferty banków.',
  },
  {
    question: 'Czy mogę zwiększyć swoją zdolność kredytową?',
    answer:
      'Tak, możesz zwiększyć zdolność kredytową poprzez: zwiększenie dochodu, spłatę istniejących zobowiązań, poprawę historii kredytowej, zwiększenie wkładu własnego, zmianę formy zatrudnienia na bardziej stabilną, lub oczekiwanie na poprawę sytuacji finansowej. Warto też rozważyć kredyt wspólny z małżonkiem/partnerem, co zwiększa łączny dochód.',
  },
  {
    question: 'Jak długo bank sprawdza historię kredytową?',
    answer:
      'Banki sprawdzają historię kredytową z ostatnich 5-7 lat w BIK (Biuro Informacji Kredytowej) i innych biurach informacji gospodarczej. Negatywne wpisy mogą być widoczne nawet przez 5 lat od spłaty zobowiązania. Pozytywna historia regularnych spłat buduje zaufanie banku.',
  },
  {
    question: 'Czy zmiana pracy wpływa na zdolność kredytową?',
    answer:
      'Tak, zmiana pracy może wpłynąć na zdolność kredytową. Banki preferują stabilne zatrudnienie - zwykle wymagają minimum 3-6 miesięcy pracy w nowym miejscu przed rozpatrzeniem wniosku. Jeśli zmieniasz pracę na lepiej płatną, warto poczekać kilka miesięcy, aby udowodnić stabilność nowego dochodu.',
  },
  {
    question: 'Jak obliczyć zdolność kredytową dla singla?',
    answer:
      'Dla osoby samotnej zdolność kredytowa zależy wyłącznie od jej dochodu i zobowiązań. Banki mogą być bardziej restrykcyjne, ponieważ nie ma drugiego dochodu jako zabezpieczenia. Warto zwiększyć wkład własny i spłacić istniejące zobowiązania, aby poprawić zdolność kredytową.',
  },
  {
    question: 'Czy mogę wziąć kredyt bez zdolności kredytowej?',
    answer:
      'Nie, zdolność kredytowa jest podstawowym wymogiem do otrzymania kredytu hipotecznego. Banki są zobowiązane prawnie do weryfikacji zdolności kredytowej przed udzieleniem kredytu. Jeśli nie masz zdolności, musisz najpierw ją poprawić - zwiększyć dochód, spłacić zobowiązania lub zwiększyć wkład własny.',
  },
  {
    question: 'Jak często banki aktualizują dane o zdolności kredytowej?',
    answer:
      'Zdolność kredytowa jest obliczana w momencie składania wniosku kredytowego. Banki sprawdzają aktualne dane z BIK, weryfikują dochód z zaświadczeń i dokumentów oraz oceniają bieżącą sytuację finansową. Jeśli Twoja sytuacja się zmieniła (np. zwiększył się dochód), możesz złożyć nowy wniosek.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Jak obliczyć zdolność kredytową? Kompletny przewodnik 2025',
  description:
    'Praktyczny przewodnik po obliczaniu zdolności kredytowej. Dowiedz się, jak banki oceniają zdolność, jakie czynniki mają wpływ i jak samodzielnie oszacować swoją zdolność przed wizytą w banku.',
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
  datePublished: '2025-11-05',
  dateModified: '2025-11-05',
  mainEntityOfPage: `${siteUrl}/blog/jak-obliczyc-zdolnosc-kredytowa`,
  articleSection: ['Zdolność kredytowa', 'Kredyt hipoteczny', 'Poradniki finansowe'],
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
      name: 'Jak obliczyć zdolność kredytową?',
      item: `${siteUrl}/blog/jak-obliczyc-zdolnosc-kredytowa`,
    },
  ],
}

const relatedArticles = [
  {
    slug: 'wklad-wlasny-kredyt-hipoteczny',
    title: 'Wkład własny na kredyt hipoteczny 2025',
    description: 'Dowiedz się, ile wynosi minimalny wkład własny i jak go obliczyć.',
  },
  {
    slug: 'ranking-bankow-kredytow-hipotecznych-2025',
    title: 'Ranking banków kredytów hipotecznych 2025',
    description: 'Porównaj oferty banków i znajdź najlepszy kredyt dla siebie.',
  },
  {
    slug: 'rrso-kredyt-hipoteczny',
    title: 'RRSO kredytu hipotecznego - co to jest?',
    description: 'Poznaj RRSO i dowiedz się, jak porównać pełne koszty kredytu.',
  },
  {
    slug: 'jak-wybrac-najlepszy-kredyt-hipoteczny',
    title: 'Jak wybrać najlepszy kredyt hipoteczny?',
    description: 'Kompleksowy przewodnik po wyborze najlepszego kredytu hipotecznego.',
  },
]

export default function CreditCapacityPage() {
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
              <BreadcrumbCurrent>Jak obliczyć zdolność kredytową?</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>

        <HeroSection>
          <HeroEyebrow>Podstawy kredytu</HeroEyebrow>
          <HeroTitle>Jak obliczyć zdolność kredytową? Kompletny przewodnik 2025</HeroTitle>
          <HeroLead>
            Zdolność kredytowa to kluczowy czynnik decydujący o tym, czy otrzymasz kredyt hipoteczny i na jaką kwotę.
            Banki oceniają ją na podstawie dochodu, zobowiązań, wieku i historii kredytowej. W tym przewodniku
            dowiesz się, jak banki obliczają zdolność kredytową, jakie czynniki mają największy wpływ i jak
            samodzielnie oszacować swoją zdolność przed wizytą w banku. Sprawdź swoją zdolność kredytową w naszym
            kalkulatorze kredytu hipotecznego.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź swoją zdolność w kalkulatorze
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
                <strong>Zdolność kredytowa zależy głównie od dochodu i zobowiązań</strong> – rata kredytu nie
                powinna przekraczać 40-50% dostępnego dochodu.
              </li>
              <li>
                <strong>Każdy bank ma własne algorytmy</strong> – ta sama osoba może mieć różną zdolność w
                różnych bankach.
              </li>
              <li>
                <strong>Możesz zwiększyć zdolność</strong> – spłacając zobowiązania, zwiększając dochód lub
                poprawiając historię kredytową.
              </li>
              <li>
                <strong>Sprawdź przed wizytą w banku</strong> – użyj kalkulatora, aby oszacować swoją zdolność i
                przygotować się do rozmowy.
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
            <SectionTitle>Co to jest zdolność kredytowa?</SectionTitle>
            <SectionSubtitle>
              Zdolność kredytowa to maksymalna kwota kredytu, którą możesz zaciągnąć, uwzględniając Twój dochód,
              zobowiązania i możliwość spłaty rat w terminie.
            </SectionSubtitle>
          </SectionHeader>
          <ArticleText>
            Zdolność kredytowa to kluczowy parametr, który banki oceniają przed udzieleniem kredytu hipotecznego.
            Określa ona maksymalną kwotę kredytu, jaką możesz otrzymać, biorąc pod uwagę Twoją sytuację
            finansową. Banki sprawdzają, czy będziesz w stanie regularnie spłacać raty przez cały okres
            kredytowania.
          </ArticleText>
          <ArticleText>
            Zdolność kredytowa nie jest wartością stałą – zmienia się wraz z Twoją sytuacją finansową. Możesz ją
            zwiększyć poprzez poprawę dochodu, spłatę zobowiązań lub poprawę historii kredytowej. Warto
            regularnie sprawdzać swoją zdolność, szczególnie przed planowanym zakupem nieruchomości.
          </ArticleText>
          <CtaBox>
            <CtaTitle>Sprawdź swoją zdolność kredytową</CtaTitle>
            <CtaText>
              Sprawdź w naszym kalkulatorze kredytu hipotecznego, aby oszacować swoją zdolność kredytową i zobaczyć,
              na jaką kwotę możesz liczyć.
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
              Czynniki wpływające
            </SectionBadge>
            <SectionTitle>Jakie czynniki wpływają na zdolność kredytową?</SectionTitle>
            <SectionSubtitle>
              Poznaj wszystkie elementy, które banki biorą pod uwagę przy ocenie Twojej zdolności kredytowej.
            </SectionSubtitle>
          </SectionHeader>
          <FactorsGrid role="list">
            {factors.map((factor) => {
              const IconComponent = factor.icon
              return (
                <FactorCard key={factor.title} role="listitem">
                  <FactorHeader>
                    <FactorIcon aria-hidden="true">
                      <IconComponent size={24} />
                    </FactorIcon>
                    <FactorTitle>{factor.title}</FactorTitle>
                    <FactorImpact impact={factor.impact}>
                      {factor.impact === 'wysoki' ? 'Wysoki wpływ' : 'Średni wpływ'}
                    </FactorImpact>
                  </FactorHeader>
                  <FactorDescription>{factor.description}</FactorDescription>
                  <FactorDetails>
                    {factor.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </FactorDetails>
                </FactorCard>
              )
            })}
          </FactorsGrid>
          <ArticleText>
            Więcej informacji o wpływie wkładu własnego na zdolność kredytową znajdziesz w naszym artykule:{' '}
            <Link href="/blog/wklad-wlasny-kredyt-hipoteczny" className="text-emerald-700 underline hover:text-emerald-800">
              Wkład własny na kredyt hipoteczny 2025
            </Link>
            . Dowiedz się też, jak porównać oferty banków w naszym{' '}
            <Link href="/blog/ranking-bankow-kredytow-hipotecznych-2025" className="text-emerald-700 underline hover:text-emerald-800">
              rankingu banków kredytów hipotecznych
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
            <SectionTitle>Jak obliczyć zdolność kredytową krok po kroku?</SectionTitle>
            <SectionSubtitle>
              Oto praktyczny przewodnik, który pomoże Ci samodzielnie oszacować swoją zdolność kredytową przed
              wizytą w banku.
            </SectionSubtitle>
          </SectionHeader>
          <StepsList role="list">
            {calculationSteps.map((step) => (
              <StepCard key={step.step} role="listitem">
                <StepNumber>{step.step}</StepNumber>
                <StepContent>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                  <StepExample>
                    <strong>Przykład:</strong> {step.example}
                  </StepExample>
                </StepContent>
              </StepCard>
            ))}
          </StepsList>
          <CtaBox>
            <CtaTitle>Użyj kalkulatora do dokładnych obliczeń</CtaTitle>
            <CtaText>
              Nasz kalkulator kredytu hipotecznego automatycznie obliczy Twoją zdolność kredytową na podstawie
              aktualnych ofert banków. Wystarczy podać dochód i zobowiązania.
            </CtaText>
            <CtaButton href="/kalkulator/kredyt-hipoteczny">
              Oblicz zdolność w kalkulatorze
              <HiOutlineArrowLongRight size={18} />
            </CtaButton>
          </CtaBox>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineExclamationTriangle size={18} />
              Najczęstsze błędy
            </SectionBadge>
            <SectionTitle>Najczęstsze błędy przy obliczaniu zdolności kredytowej</SectionTitle>
            <SectionSubtitle>
              Unikaj tych błędów, aby nie przeszacować swojej zdolności kredytowej i nie spotkać się z
              rozczarowaniem w banku.
            </SectionSubtitle>
          </SectionHeader>
          <MistakesGrid role="list">
            {commonMistakes.map((mistake) => (
              <MistakeCard key={mistake.title} role="listitem">
                <MistakeIcon aria-hidden="true">!</MistakeIcon>
                <MistakeTitle>{mistake.title}</MistakeTitle>
                <MistakeDescription>{mistake.description}</MistakeDescription>
              </MistakeCard>
            ))}
          </MistakesGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineClipboardDocumentCheck size={18} />
              Porady praktyczne
            </SectionBadge>
            <SectionTitle>Jak zwiększyć swoją zdolność kredytową?</SectionTitle>
            <SectionSubtitle>
              Jeśli Twoja zdolność kredytowa jest zbyt niska, oto praktyczne sposoby na jej poprawę.
            </SectionSubtitle>
          </SectionHeader>
          <TipsList role="list">
            <TipItem>
              <TipIcon aria-hidden="true">✓</TipIcon>
              <TipContent>
                <TipTitle>Spłać istniejące zobowiązania</TipTitle>
                <TipDescription>
                  Każde spłacone zobowiązanie zwiększa dostępny dochód i poprawia zdolność kredytową. Zacznij
                  od najdroższych kredytów i kart kredytowych.
                </TipDescription>
              </TipContent>
            </TipItem>
            <TipItem>
              <TipIcon aria-hidden="true">✓</TipIcon>
              <TipContent>
                <TipTitle>Zwiększ dochód</TipTitle>
                <TipDescription>
                  Jeśli możesz, zwiększ dochód poprzez zmianę pracy, dodatkowe źródła dochodu lub podwyżkę.
                  Pamiętaj, że banki sprawdzają stabilność dochodu.
                </TipDescription>
              </TipContent>
            </TipItem>
            <TipItem>
              <TipIcon aria-hidden="true">✓</TipIcon>
              <TipContent>
                <TipTitle>Zwiększ wkład własny</TipTitle>
                <TipDescription>
                  Wyższy wkład własny zmniejsza kwotę kredytu i poprawia warunki. Banki oferują lepsze
                  oprocentowanie przy wyższym wkładzie własnym. Przeczytaj nasz przewodnik o{' '}
                  <Link href="/blog/wklad-wlasny-kredyt-hipoteczny" className="text-emerald-700 underline hover:text-emerald-800">
                    wkładzie własnym na kredyt hipoteczny
                  </Link>
                  , aby dowiedzieć się więcej.
                </TipDescription>
              </TipContent>
            </TipItem>
            <TipItem>
              <TipIcon aria-hidden="true">✓</TipIcon>
              <TipContent>
                <TipTitle>Popraw historię kredytową</TipTitle>
                <TipDescription>
                  Regularne spłaty wszystkich zobowiązań budują pozytywną historię w BIK. Unikaj opóźnień i
                  zaległości.
                </TipDescription>
              </TipContent>
            </TipItem>
            <TipItem>
              <TipIcon aria-hidden="true">✓</TipIcon>
              <TipContent>
                <TipTitle>Rozważ kredyt wspólny</TipTitle>
                <TipDescription>
                  Kredyt wspólny z małżonkiem lub partnerem zwiększa łączny dochód i może znacząco poprawić
                  zdolność kredytową.
                </TipDescription>
              </TipContent>
            </TipItem>
            <TipItem>
              <TipIcon aria-hidden="true">✓</TipIcon>
              <TipContent>
                <TipTitle>Poczekaj na stabilizację</TipTitle>
                <TipDescription>
                  Jeśli zmieniłeś pracę lub masz niestabilny dochód, poczekaj kilka miesięcy, aby udowodnić
                  stabilność przed złożeniem wniosku.
                </TipDescription>
              </TipContent>
            </TipItem>
          </TipsList>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineDocumentText size={18} />
              FAQ
            </SectionBadge>
            <SectionTitle>Najczęściej zadawane pytania o zdolność kredytową</SectionTitle>
            <SectionSubtitle>
              Odpowiedzi na najpopularniejsze pytania dotyczące obliczania i zwiększania zdolności kredytowej.
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
              Zdolność kredytowa to kluczowy czynnik decydujący o możliwości otrzymania kredytu hipotecznego.
              Zależy głównie od dochodu, zobowiązań, wieku, stabilności zatrudnienia i historii kredytowej.
              Każdy bank ma własne algorytmy oceny, więc warto sprawdzić oferty w kilku bankach. Możesz
              zwiększyć swoją zdolność poprzez spłatę zobowiązań, zwiększenie dochodu lub poprawę historii
              kredytowej.
            </SummaryText>
            <SummaryText>
              Przed wizytą w banku warto samodzielnie oszacować swoją zdolność kredytową. Użyj naszego
              kalkulatora kredytu hipotecznego, aby sprawdzić, na jaką kwotę możesz liczyć i porównać oferty
              różnych banków. Przeczytaj też nasze przewodniki o{' '}
              <Link href="/blog/rrso-kredyt-hipoteczny" className="text-white underline hover:text-emerald-50">
                RRSO kredytu hipotecznego
              </Link>{' '}
              i{' '}
              <Link href="/blog/jak-wybrac-najlepszy-kredyt-hipoteczny" className="text-white underline hover:text-emerald-50">
                jak wybrać najlepszy kredyt hipoteczny
              </Link>
              .
            </SummaryText>
            <SummaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź swoją zdolność kredytową w kalkulatorze
              <HiOutlineArrowLongRight size={18} />
            </SummaryCta>
          </SummaryContent>
        </SummarySection>
      </ContentContainer>
      <FooterMain />
    </PageWrapper>
  )
}

const PageWrapper = tw.main`min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-100`
const ContentContainer = tw.div`mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20`

const BreadcrumbNav = tw.nav`mb-8`
const BreadcrumbList = tw.ol`flex items-center gap-2 text-sm text-gray-600`
const BreadcrumbItem = tw.li`flex items-center`
const BreadcrumbLink = tw(Link)`text-emerald-700 hover:text-emerald-800 hover:underline transition-colors`
const BreadcrumbSeparator = tw.span`text-gray-400 mx-1`
const BreadcrumbCurrent = tw.span`text-gray-900 font-medium`

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

const FactorsGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const FactorCard = tw.li`flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1 hover:shadow-lg`
const FactorHeader = tw.div`mb-4 flex items-start justify-between gap-4`
const FactorIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const FactorTitle = tw.h3`flex-1 text-xl font-semibold text-gray-900`
const FactorImpact = tw.span<{ impact: string }>`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
  ({ impact }) => (impact === 'wysoki' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700')
}`
const FactorDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const FactorDetails = tw.ul`mt-auto grid gap-2 text-sm text-gray-600 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`

const StepsList = tw.ul`mx-auto max-w-3xl space-y-6`
const StepCard = tw.li`flex gap-4 rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm`
const StepNumber = tw.span`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white`
const StepContent = tw.div`flex-1`
const StepTitle = tw.h3`mb-2 text-lg font-semibold text-gray-900`
const StepDescription = tw.p`mb-2 text-sm leading-relaxed text-gray-600`
const StepExample = tw.p`rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800`

const MistakesGrid = tw.ul`grid grid-cols-1 gap-5 sm:grid-cols-2`
const MistakeCard = tw.li`flex gap-4 rounded-2xl border border-amber-200 bg-amber-50/60 p-5 shadow-sm`
const MistakeIcon = tw.span`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white`
const MistakeTitle = tw.h3`mb-2 text-lg font-semibold text-gray-900`
const MistakeDescription = tw.p`text-sm leading-relaxed text-gray-600`

const TipsList = tw.ul`mx-auto max-w-3xl space-y-4`
const TipItem = tw.li`flex gap-4 rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm`
const TipIcon = tw.span`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white`
const TipContent = tw.div`flex-1`
const TipTitle = tw.h3`mb-2 text-lg font-semibold text-gray-900`
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

