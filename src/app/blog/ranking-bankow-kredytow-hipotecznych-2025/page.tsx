import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowLongRight,
  HiOutlineBanknotes,
  HiOutlineCalculator,
  HiOutlineChartBar,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineTrophy,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'
import { getPostRobotsMetadata } from 'utils/blog-posts'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {  robots: getPostRobotsMetadata('ranking-bankow-kredytow-hipotecznych-2025'),

  title: 'Ranking banków kredytów hipotecznych 2025 - najlepsze oferty',
  description:
    'Porównaj oferty kredytów hipotecznych z polskich banków. Sprawdź ranking banków według oprocentowania, kosztów i warunków. Znajdź najlepszą ofertę dla siebie.',
  alternates: {
    canonical: `${siteUrl}/blog/ranking-bankow-kredytow-hipotecznych-2025`,
  },
  keywords: [
    'ranking banków kredyt hipoteczny',
    'najlepszy bank na kredyt hipoteczny',
    'porównanie kredytów hipotecznych',
    'najtańszy kredyt hipoteczny',
    'który bank ma najlepszy kredyt hipoteczny 2025',
    'ranking kredytów hipotecznych listopad 2025',
    'najlepsza oferta kredytu hipotecznego',
  ],
  openGraph: {
    title: 'Ranking banków kredytów hipotecznych 2025 - najlepsze oferty',
    description:
      'Kompleksowe porównanie ofert kredytów hipotecznych z polskich banków. Sprawdź ranking według oprocentowania, kosztów i warunków.',
    url: `${siteUrl}/blog/ranking-bankow-kredytow-hipotecznych-2025`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Ranking banków kredytów hipotecznych 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ranking banków kredytów hipotecznych 2025',
    description: 'Porównaj oferty kredytów hipotecznych i znajdź najlepszą ofertę dla siebie.',
    images: [`${siteUrl}/og-image.jpg`],
  },
}

const rankingCriteria = [
  {
    title: 'Oprocentowanie',
    description:
      'Najważniejszy czynnik wpływający na całkowity koszt kredytu. Niższe oprocentowanie oznacza niższe raty i mniej odsetek do zapłacenia.',
    weight: 'wysoka',
    icon: HiOutlineChartBar,
    details: [
      'Oprocentowanie zmienne (WIBOR + marża)',
      'Oprocentowanie stałe (jeśli dostępne)',
      'Marża banku (im niższa, tym lepiej)',
      'Korekty oprocentowania przy różnych LTV',
    ],
  },
  {
    title: 'Prowizja za udzielenie',
    description:
      'Jednorazowa opłata pobierana przy udzieleniu kredytu. Niektóre banki oferują promocje z obniżoną lub zerową prowizją.',
    weight: 'średnia',
    icon: HiOutlineCurrencyDollar,
    details: [
      'Standardowa prowizja: 0-2% kwoty kredytu',
      'Promocje z obniżoną prowizją',
      'Możliwość negocjacji prowizji',
      'Wpływ prowizji na całkowity koszt',
    ],
  },
  {
    title: 'Ubezpieczenia',
    description:
      'Koszty ubezpieczenia nieruchomości i na życie mogą znacząco wpłynąć na całkowity koszt kredytu. Niektóre banki wymagają ubezpieczeń, inne nie.',
    weight: 'średnia',
    icon: HiOutlineShieldCheck,
    details: [
      'Ubezpieczenie nieruchomości (często obowiązkowe)',
      'Ubezpieczenie na życie (opcjonalne lub wymagane)',
      'Koszty ubezpieczeń w skali roku',
      'Możliwość rezygnacji z ubezpieczeń',
    ],
  },
  {
    title: 'Warunki kredytowe',
    description:
      'Minimalne i maksymalne kwoty kredytu, okres kredytowania, wymagany wkład własny i inne warunki wpływają na dostępność oferty.',
    weight: 'średnia',
    icon: HiOutlineDocumentText,
    details: [
      'Zakres kwot kredytu (min-max)',
      'Okres kredytowania (min-max)',
      'Wymagany wkład własny',
      'Obsługiwane cele kredytu',
    ],
  },
  {
    title: 'Dodatkowe koszty',
    description:
      'Opłaty za prowadzenie konta, karty kredytowe, wcześniejszą spłatę i inne dodatkowe koszty mogą zwiększyć całkowity koszt kredytu.',
    weight: 'niska',
    icon: HiOutlineExclamationTriangle,
    details: [
      'Opłaty za prowadzenie konta',
      'Opłaty za wcześniejszą spłatę',
      'Opłaty za aneksy i zmiany',
      'Inne ukryte koszty',
    ],
  },
  {
    title: 'RRSO (Rzeczywista Roczna Stopa Oprocentowania)',
    description:
      'RRSO uwzględnia wszystkie koszty kredytu i pozwala na rzeczywiste porównanie ofert różnych banków. Im niższe RRSO, tym lepsza oferta.',
    weight: 'wysoka',
    icon: HiOutlineTrophy,
    details: [
      'RRSO uwzględnia wszystkie koszty',
      'Pozwala na rzeczywiste porównanie ofert',
      'Standardowy przykład reprezentatywny',
      'Różnice w RRSO między bankami',
    ],
  },
]

const comparisonTips = [
  {
    title: 'Porównuj pełne koszty, nie tylko oprocentowanie',
    description:
      'Oprocentowanie to tylko jeden z elementów kosztu kredytu. Prowizja, ubezpieczenia i inne opłaty mogą znacząco wpłynąć na całkowity koszt. Zawsze porównuj RRSO, które uwzględnia wszystkie koszty.',
    icon: HiOutlineCalculator,
  },
  {
    title: 'Sprawdź warunki dla Twojej sytuacji',
    description:
      'Każdy bank ma inne wymagania dotyczące kwoty kredytu, okresu kredytowania i wkładu własnego. Sprawdź, które banki oferują warunki odpowiednie dla Twojej sytuacji.',
    icon: HiOutlineDocumentText,
  },
  {
    title: 'Uwzględnij dodatkowe produkty',
    description:
      'Niektóre banki oferują lepsze warunki przy otwarciu konta lub wykupieniu dodatkowych produktów. Sprawdź, czy te produkty są dla Ciebie korzystne i czy nie zwiększają niepotrzebnie kosztów.',
    icon: HiOutlineBanknotes,
  },
  {
    title: 'Negocjuj warunki',
    description:
      'Warunki kredytu są często negocjowalne, szczególnie jeśli masz dobrą zdolność kredytową lub jesteś wartościowym klientem. Nie bój się negocjować marży, prowizji i innych warunków.',
    icon: HiOutlineCheckCircle,
  },
]

const faqData = [
  {
    question: 'Który bank ma najlepszy kredyt hipoteczny w 2025?',
    answer:
      'Nie ma jednego "najlepszego" banku - najlepsza oferta zależy od Twojej sytuacji: kwoty kredytu, okresu kredytowania, wkładu własnego i innych czynników. Ranking banków zmienia się w zależności od parametrów kredytu. Najlepiej użyć kalkulatora kredytu hipotecznego, który porówna wszystkie oferty dla Twoich konkretnych parametrów.',
  },
  {
    question: 'Jak porównać oferty kredytów hipotecznych?',
    answer:
      'Najlepszym sposobem na porównanie ofert jest użycie kalkulatora kredytu hipotecznego, który automatycznie porówna wszystkie dostępne oferty dla Twoich parametrów. Porównuj RRSO (Rzeczywistą Roczna Stopę Oprocentowania), która uwzględnia wszystkie koszty kredytu, nie tylko oprocentowanie.',
  },
  {
    question: 'Czy ranking banków zmienia się w czasie?',
    answer:
      'Tak, ranking banków zmienia się w zależności od aktualnych ofert, promocji i zmian w oprocentowaniu. Banki regularnie aktualizują swoje oferty, więc warto regularnie sprawdzać aktualne rankingi i porównywać oferty przed podjęciem decyzji.',
  },
  {
    question: 'Czy najtańszy kredyt to zawsze najlepszy?',
    answer:
      'Nie zawsze. Najtańszy kredyt może mieć gorsze warunki, wymagać dodatkowych produktów lub mieć ukryte koszty. Ważne jest, aby porównać pełne koszty (RRSO), warunki kredytu, elastyczność spłaty i jakość obsługi klienta przed podjęciem decyzji.',
  },
  {
    question: 'Jak często banki aktualizują oferty kredytów hipotecznych?',
    answer:
      'Banki aktualizują oferty kredytów hipotecznych regularnie, zwykle co kilka miesięcy lub przy zmianach stóp procentowych. Promocje i specjalne oferty mogą zmieniać się częściej. Warto sprawdzać aktualne oferty przed złożeniem wniosku kredytowego.',
  },
  {
    question: 'Czy mogę negocjować warunki kredytu z bankiem?',
    answer:
      'Tak, warunki kredytu są często negocjowalne, szczególnie jeśli masz dobrą zdolność kredytową, wysoką zdolność kredytową lub jesteś wartościowym klientem. Możesz negocjować marżę, prowizję, warunki ubezpieczeń i inne elementy oferty. Warto przygotować się do negocjacji i mieć alternatywne oferty z innych banków.',
  },
  {
    question: 'Jakie czynniki wpływają na ranking banków?',
    answer:
      'Ranking banków zależy od wielu czynników: oprocentowania, prowizji, kosztów ubezpieczeń, warunków kredytowych, dodatkowych kosztów i RRSO. Ważne są także elastyczność spłaty, jakość obsługi klienta i dostępność oferty dla różnych sytuacji finansowych.',
  },
  {
    question: 'Czy warto korzystać z pośrednika kredytowego?',
    answer:
      'Pośrednik kredytowy może pomóc w porównaniu ofert z wielu banków i negocjacji warunków, ale często pobiera prowizję. Jeśli masz czas i chcesz samodzielnie porównać oferty, możesz użyć kalkulatora kredytu hipotecznego, który pokaże wszystkie dostępne oferty dla Twoich parametrów.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Ranking banków kredytów hipotecznych 2025 - najlepsze oferty',
  description:
    'Kompleksowe porównanie ofert kredytów hipotecznych z polskich banków. Sprawdź ranking według oprocentowania, kosztów i warunków.',
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
  datePublished: '2025-11-19',
  dateModified: '2025-11-19',
  mainEntityOfPage: `${siteUrl}/blog/ranking-bankow-kredytow-hipotecznych-2025`,
  articleSection: ['Ranking banków', 'Porównanie ofert', 'Kredyt hipoteczny'],
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
      name: 'Ranking banków kredytów hipotecznych 2025',
      item: `${siteUrl}/blog/ranking-bankow-kredytow-hipotecznych-2025`,
    },
  ],
}

const relatedArticles = [
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
  {
    slug: 'jak-obliczyc-zdolnosc-kredytowa',
    title: 'Jak obliczyć zdolność kredytową?',
    description: 'Dowiedz się, jak banki obliczają zdolność kredytową i jak samodzielnie oszacować swoją zdolność.',
  },
  {
    slug: 'oprocentowanie-kredytu-hipotecznego-stale-czy-zmienne',
    title: 'Oprocentowanie kredytu - stałe czy zmienne?',
    description: 'Poznaj różnice między oprocentowaniem stałym a zmiennym.',
  },
]

export default function BankRankingPage() {
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
              <BreadcrumbCurrent>Ranking banków kredytów hipotecznych 2025</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>

        <HeroSection>
          <HeroEyebrow>Porównanie banków</HeroEyebrow>
          <HeroTitle>Ranking banków kredytów hipotecznych 2025 - najlepsze oferty</HeroTitle>
          <HeroLead>
            Wybór odpowiedniego banku to kluczowa decyzja przy zaciąganiu kredytu hipotecznego. Ranking banków
            zmienia się w zależności od parametrów kredytu, ofert promocyjnych i aktualnych warunków
            rynkowych. W tym przewodniku dowiesz się, jak porównać oferty banków, jakie czynniki są
            najważniejsze przy wyborze i jak znaleźć najlepszą ofertę dla siebie. Porównaj wszystkie oferty
            w jednym miejscu - użyj naszego kalkulatora kredytu hipotecznego.
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
                <strong>Nie ma jednego "najlepszego" banku</strong> - najlepsza oferta zależy od Twoich
                parametrów kredytu i sytuacji finansowej.
              </li>
              <li>
                <strong>Porównuj RRSO, nie tylko oprocentowanie</strong> - RRSO uwzględnia wszystkie koszty
                kredytu i pozwala na rzeczywiste porównanie ofert.
              </li>
              <li>
                <strong>Ranking zmienia się w czasie</strong> - banki regularnie aktualizują oferty, więc
                warto sprawdzać aktualne rankingi przed decyzją.
              </li>
              <li>
                <strong>Użyj kalkulatora do porównania</strong> - nasz kalkulator automatycznie porówna wszystkie
                oferty dla Twoich konkretnych parametrów.
              </li>
            </IntroList>
          </IntroContent>
        </IntroCard>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineChartBar size={18} />
              Kryteria oceny
            </SectionBadge>
            <SectionTitle>Jak oceniamy banki w rankingu?</SectionTitle>
            <SectionSubtitle>
              Ranking banków opiera się na wielu czynnikach wpływających na całkowity koszt i warunki kredytu.
              Poznaj kryteria, które bierzemy pod uwagę.
            </SectionSubtitle>
          </SectionHeader>
          <CriteriaGrid role="list">
            {rankingCriteria.map((criterion) => {
              const IconComponent = criterion.icon
              return (
                <CriterionCard key={criterion.title} role="listitem">
                  <CriterionHeader>
                    <CriterionIcon aria-hidden="true">
                      <IconComponent size={24} />
                    </CriterionIcon>
                    <CriterionTitle>{criterion.title}</CriterionTitle>
                    <CriterionWeight weight={criterion.weight}>
                      {criterion.weight === 'wysoka' ? 'Wysoka waga' : criterion.weight === 'średnia' ? 'Średnia waga' : 'Niska waga'}
                    </CriterionWeight>
                  </CriterionHeader>
                  <CriterionDescription>{criterion.description}</CriterionDescription>
                  <CriterionDetails>
                    {criterion.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </CriterionDetails>
                </CriterionCard>
              )
            })}
          </CriteriaGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineCalculator size={18} />
              Porównanie
            </SectionBadge>
            <SectionTitle>Jak porównać oferty banków?</SectionTitle>
            <SectionSubtitle>
              Oto praktyczne wskazówki, które pomogą Ci skutecznie porównać oferty różnych banków i wybrać
              najlepszą dla siebie.
            </SectionSubtitle>
          </SectionHeader>
          <TipsGrid role="list">
            {comparisonTips.map((tip) => {
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
          <CtaBox>
            <CtaTitle>Użyj kalkulatora do automatycznego porównania</CtaTitle>
            <CtaText>
              Nasz kalkulator kredytu hipotecznego automatycznie porówna wszystkie dostępne oferty banków
              dla Twoich konkretnych parametrów. Zobaczysz ranking banków według całkowitego kosztu kredytu,
              RRSO i innych czynników.
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
              <HiOutlineTrophy size={18} />
              Ranking
            </SectionBadge>
            <SectionTitle>Ranking banków - co jest ważne?</SectionTitle>
            <SectionSubtitle>
              Ranking banków zmienia się w zależności od parametrów kredytu. Oto najważniejsze czynniki, które
              wpływają na pozycję banku w rankingu.
            </SectionSubtitle>
          </SectionHeader>
          <ArticleText>
            Ranking banków kredytów hipotecznych nie jest stały - zmienia się w zależności od wielu czynników.
            Bank, który jest najlepszy dla jednej osoby, może nie być najlepszy dla innej. Ważne jest, aby
            porównać oferty dla swoich konkretnych parametrów kredytu.
          </ArticleText>
          <ArticleText>
            Najważniejszym czynnikiem wpływającym na ranking jest RRSO (Rzeczywista Roczna Stopa
            Oprocentowania), która uwzględnia wszystkie koszty kredytu: oprocentowanie, prowizję,
            ubezpieczenia i inne opłaty. Bank z najniższym RRSO dla Twoich parametrów będzie zazwyczaj
            najlepszym wyborem. Więcej o RRSO znajdziesz w naszym artykule:{' '}
            <Link href="/blog/rrso-kredyt-hipoteczny" className="text-emerald-700 underline hover:text-emerald-800">
              RRSO kredytu hipotecznego - co to jest i jak je obliczyć?
            </Link>
            .
          </ArticleText>
          <ArticleText>
            Oprócz RRSO, warto zwrócić uwagę na elastyczność spłaty, warunki wcześniejszej spłaty, jakość
            obsługi klienta i dostępność oferty dla różnych sytuacji finansowych. Niektóre banki oferują
            lepsze warunki przy wyższym wkładzie własnym lub dla określonych grup klientów.
          </ArticleText>
          <CtaBox>
            <CtaTitle>Sprawdź aktualny ranking dla swoich parametrów</CtaTitle>
            <CtaText>
              Ranking banków zależy od Twoich parametrów kredytu. Sprawdź w naszym kalkulatorze, aby zobaczyć
              aktualny ranking banków dla Twojej kwoty kredytu, okresu kredytowania i wkładu własnego.
            </CtaText>
            <CtaButton href="/kalkulator/kredyt-hipoteczny">
              Zobacz ranking w kalkulatorze
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
            <SectionTitle>Najczęściej zadawane pytania o ranking banków</SectionTitle>
            <SectionSubtitle>
              Odpowiedzi na najpopularniejsze pytania dotyczące rankingu banków i porównywania ofert kredytów
              hipotecznych.
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
              Ranking banków kredytów hipotecznych zmienia się w zależności od parametrów kredytu i aktualnych
              ofert. Nie ma jednego "najlepszego" banku - najlepsza oferta zależy od Twojej sytuacji
              finansowej i potrzeb. Najważniejsze jest porównanie pełnych kosztów kredytu (RRSO), które
              uwzględnia wszystkie koszty: oprocentowanie, prowizję, ubezpieczenia i inne opłaty.
            </SummaryText>
            <SummaryText>
              Przed podjęciem decyzji warto porównać oferty z wielu banków, sprawdzić warunki kredytu,
              elastyczność spłaty i jakość obsługi klienta. Sprawdź w naszym kalkulatorze kredytu hipotecznego,
              aby automatycznie porównać wszystkie dostępne oferty dla Twoich konkretnych parametrów i
              znaleźć najlepszą ofertę dla siebie. Przeczytaj też nasze przewodniki o{' '}
              <Link href="/blog/jak-wybrac-najlepszy-kredyt-hipoteczny" className="text-white underline hover:text-emerald-50">
                jak wybrać najlepszy kredyt hipoteczny
              </Link>
              ,{' '}
              <Link href="/blog/jak-obliczyc-zdolnosc-kredytowa" className="text-white underline hover:text-emerald-50">
                jak obliczyć zdolność kredytową
              </Link>
              {' '}i{' '}
              <Link href="/blog/wklad-wlasny-kredyt-hipoteczny" className="text-white underline hover:text-emerald-50">
                wkładzie własnym na kredyt hipoteczny
              </Link>
              .
            </SummaryText>
            <SummaryCta href="/kalkulator/kredyt-hipoteczny">
              Porównaj wszystkie oferty w kalkulatorze
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

const CriteriaGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const CriterionCard = tw.li`flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1 hover:shadow-lg`
const CriterionHeader = tw.div`mb-4 flex items-start justify-between gap-4`
const CriterionIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const CriterionTitle = tw.h3`flex-1 text-xl font-semibold text-gray-900`
const CriterionWeight = tw.span<{ weight: string }>`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
  ({ weight }) =>
    weight === 'wysoka'
      ? 'bg-red-100 text-red-700'
      : weight === 'średnia'
        ? 'bg-amber-100 text-amber-700'
        : 'bg-gray-100 text-gray-700'
}`
const CriterionDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const CriterionDetails = tw.ul`mt-auto grid gap-2 text-sm text-gray-600 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`

const TipsGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const TipCard = tw.li`flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1 hover:shadow-lg`
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

