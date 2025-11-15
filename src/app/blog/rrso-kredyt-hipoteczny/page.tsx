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
  HiOutlineExclamationTriangle,
  HiOutlineSparkles,
  HiOutlineTrophy,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'
import { getPostRobotsMetadata } from 'utils/blog-posts'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {  robots: getPostRobotsMetadata('rrso-kredyt-hipoteczny'),

  title: 'RRSO kredytu hipotecznego - co to jest i jak je obliczyć?',
  description:
    'Dowiedz się, co to jest RRSO (Rzeczywista Roczna Stopa Oprocentowania), jak je obliczyć i dlaczego jest ważne przy porównywaniu ofert kredytów hipotecznych.',
  alternates: {
    canonical: `${siteUrl}/blog/rrso-kredyt-hipoteczny`,
  },
  keywords: [
    'rrso kredyt hipoteczny',
    'co to jest rrso',
    'jak obliczyć rrso',
    'rrso kalkulator',
    'rrso vs oprocentowanie',
    'jak porównać rrso kredytów',
    'rrso kredytu hipotecznego 2025',
  ],
  openGraph: {
    title: 'RRSO kredytu hipotecznego - co to jest i jak je obliczyć?',
    description:
      'Kompletny przewodnik po RRSO: definicja, sposób obliczania i znaczenie przy porównywaniu ofert kredytów hipotecznych.',
    url: `${siteUrl}/blog/rrso-kredyt-hipoteczny`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'RRSO kredytu hipotecznego - przewodnik',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RRSO kredytu hipotecznego - przewodnik',
    description: 'Dowiedz się, co to jest RRSO i dlaczego jest ważne przy wyborze kredytu hipotecznego.',
    images: [`${siteUrl}/og-image.jpg`],
  },
}

const rrsoComponents = [
  {
    title: 'Oprocentowanie nominalne',
    description:
      'Podstawowe oprocentowanie kredytu, które składa się z wskaźnika referencyjnego (np. WIBOR) i marży banku.',
    impact: 'Wysoki wpływ na RRSO',
    icon: HiOutlineChartBar,
  },
  {
    title: 'Prowizja za udzielenie',
    description:
      'Jednorazowa opłata pobierana przy udzieleniu kredytu, wyrażona jako procent kwoty kredytu.',
    impact: 'Średni wpływ na RRSO',
    icon: HiOutlineCurrencyDollar,
  },
  {
    title: 'Ubezpieczenia',
    description:
      'Koszty ubezpieczenia nieruchomości i na życie, które mogą być obowiązkowe lub opcjonalne.',
    impact: 'Średni wpływ na RRSO',
    icon: HiOutlineCheckCircle,
  },
  {
    title: 'Opłaty dodatkowe',
    description:
      'Opłaty za prowadzenie konta, karty kredytowe, aneksy i inne dodatkowe koszty związane z kredytem.',
    impact: 'Niski wpływ na RRSO',
    icon: HiOutlineDocumentText,
  },
]

const comparisonExample = {
  bankA: {
    name: 'Bank A',
    interestRate: 7.0,
    commission: 1.0,
    rrso: 7.8,
    description: 'Niższe oprocentowanie, ale wyższa prowizja',
  },
  bankB: {
    name: 'Bank B',
    interestRate: 7.5,
    commission: 0.5,
    rrso: 7.6,
    description: 'Wyższe oprocentowanie, ale niższa prowizja',
  },
}

const faqData = [
  {
    question: 'Co to jest RRSO?',
    answer:
      'RRSO (Rzeczywista Roczna Stopa Oprocentowania) to wskaźnik, który pokazuje rzeczywisty koszt kredytu w skali roku, uwzględniając wszystkie koszty: oprocentowanie, prowizję, ubezpieczenia i inne opłaty. RRSO pozwala na porównanie ofert różnych banków i wybór najtańszego kredytu.',
  },
  {
    question: 'Jak obliczyć RRSO kredytu hipotecznego?',
    answer:
      'RRSO oblicza się według skomplikowanego wzoru matematycznego, który uwzględnia wszystkie koszty kredytu rozłożone na okres kredytowania. Banki są zobowiązane do podawania RRSO w ofercie kredytu. Możesz też użyć kalkulatora kredytu hipotecznego, który automatycznie obliczy RRSO dla różnych ofert.',
  },
  {
    question: 'Czym różni się RRSO od oprocentowania?',
    answer:
      'Oprocentowanie to tylko jeden z elementów kosztu kredytu - pokazuje koszt odsetek. RRSO uwzględnia wszystkie koszty: oprocentowanie, prowizję, ubezpieczenia i inne opłaty. RRSO jest zawsze wyższe niż oprocentowanie nominalne i daje pełniejszy obraz rzeczywistego kosztu kredytu.',
  },
  {
    question: 'Czy niższe RRSO zawsze oznacza tańszy kredyt?',
    answer:
      'Tak, niższe RRSO oznacza niższy całkowity koszt kredytu. RRSO jest najlepszym wskaźnikiem do porównywania ofert, ponieważ uwzględnia wszystkie koszty. Bank z niższym RRSO będzie zazwyczaj oferował tańszy kredyt niż bank z wyższym RRSO przy podobnych parametrach.',
  },
  {
    question: 'Czy RRSO może się zmieniać w czasie?',
    answer:
      'RRSO dla kredytu zmiennoprocentowego może się zmieniać wraz ze zmianą stóp procentowych (WIBOR). RRSO dla kredytu stałoprocentowego pozostaje stałe przez cały okres kredytowania. Banki podają RRSO dla przykładu reprezentatywnego, który może różnić się od rzeczywistego RRSO w zależności od zmian stóp procentowych.',
  },
  {
    question: 'Jak porównać RRSO różnych banków?',
    answer:
      'Najlepszym sposobem na porównanie RRSO jest użycie kalkulatora kredytu hipotecznego, który automatycznie obliczy RRSO dla wszystkich dostępnych ofert dla Twoich konkretnych parametrów. Porównuj RRSO dla tej samej kwoty kredytu, okresu kredytowania i wkładu własnego.',
  },
  {
    question: 'Czy RRSO uwzględnia wszystkie koszty?',
    answer:
      'RRSO uwzględnia większość kosztów kredytu: oprocentowanie, prowizję, ubezpieczenia obowiązkowe i niektóre opłaty dodatkowe. Nie uwzględnia jednak wszystkich kosztów, takich jak opłaty za wcześniejszą spłatę (jeśli nie są gwarantowane) czy opłaty za aneksy. Warto sprawdzić pełną listę kosztów w ofercie banku.',
  },
  {
    question: 'Jaka jest różnica między RRSO a całkowitym kosztem kredytu?',
    answer:
      'RRSO to wskaźnik procentowy pokazujący koszt kredytu w skali roku. Całkowity koszt kredytu to suma wszystkich rat i opłat wyrażona w złotych. RRSO pozwala na porównanie ofert niezależnie od kwoty kredytu, podczas gdy całkowity koszt pokazuje konkretną kwotę do zapłacenia.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'RRSO kredytu hipotecznego - co to jest i jak je obliczyć?',
  description:
    'Kompletny przewodnik po RRSO: definicja, sposób obliczania, znaczenie przy porównywaniu ofert i praktyczne przykłady.',
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
  datePublished: '2025-11-26',
  dateModified: '2025-11-26',
  mainEntityOfPage: `${siteUrl}/blog/rrso-kredyt-hipoteczny`,
  articleSection: ['RRSO', 'Kredyt hipoteczny', 'Porównanie ofert'],
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
      name: 'RRSO kredytu hipotecznego - co to jest?',
      item: `${siteUrl}/blog/rrso-kredyt-hipoteczny`,
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
    slug: 'ukryte-koszty-kredytu-hipotecznego',
    title: 'Ukryte koszty kredytu hipotecznego',
    description: 'Dowiedz się, jakie koszty mogą Cię zaskoczyć przy kredycie.',
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

export default function RRSOArticlePage() {
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
              <BreadcrumbCurrent>RRSO kredytu hipotecznego - co to jest?</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>

        <HeroSection>
          <HeroEyebrow>Podstawy kredytu</HeroEyebrow>
          <HeroTitle>RRSO kredytu hipotecznego - co to jest i jak je obliczyć?</HeroTitle>
          <HeroLead>
            RRSO (Rzeczywista Roczna Stopa Oprocentowania) to najważniejszy wskaźnik przy porównywaniu ofert
            kredytów hipotecznych. Pokazuje rzeczywisty koszt kredytu w skali roku, uwzględniając wszystkie
            koszty: oprocentowanie, prowizję, ubezpieczenia i inne opłaty. W tym przewodniku dowiesz się, co
            to jest RRSO, jak je obliczyć, dlaczego jest ważne i jak używać go do porównywania ofert. Porównaj
            RRSO różnych ofert w naszym kalkulatorze kredytu hipotecznego.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Porównaj RRSO w kalkulatorze
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
                <strong>RRSO uwzględnia wszystkie koszty</strong> - oprocentowanie, prowizję, ubezpieczenia i
                inne opłaty.
              </li>
              <li>
                <strong>RRSO jest zawsze wyższe niż oprocentowanie</strong> - pokazuje rzeczywisty koszt
                kredytu.
              </li>
              <li>
                <strong>Niższe RRSO = tańszy kredyt</strong> - to najlepszy wskaźnik do porównywania ofert.
              </li>
              <li>
                <strong>Banki są zobowiązane do podawania RRSO</strong> - znajdziesz je w każdej ofercie
                kredytu.
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
            <SectionTitle>Co to jest RRSO?</SectionTitle>
            <SectionSubtitle>
              RRSO (Rzeczywista Roczna Stopa Oprocentowania) to wskaźnik pokazujący rzeczywisty koszt kredytu
              w skali roku.
            </SectionSubtitle>
          </SectionHeader>
          <ArticleText>
            RRSO (Rzeczywista Roczna Stopa Oprocentowania) to wskaźnik, który pokazuje rzeczywisty koszt
            kredytu w skali roku, uwzględniając wszystkie koszty: oprocentowanie nominalne, prowizję za
            udzielenie, ubezpieczenia obowiązkowe i inne opłaty związane z kredytem. RRSO jest wyrażane w
            procentach i pozwala na porównanie ofert różnych banków. Więcej o różnicach między oprocentowaniem
            stałym a zmiennym znajdziesz w naszym artykule:{' '}
            <Link href="/blog/oprocentowanie-kredytu-hipotecznego-stale-czy-zmienne" className="text-emerald-700 underline hover:text-emerald-800">
              Oprocentowanie kredytu hipotecznego - stałe czy zmienne?
            </Link>
            .
          </ArticleText>
          <ArticleText>
            Banki są zobowiązane prawnie do podawania RRSO w każdej ofercie kredytu. RRSO jest zawsze wyższe
            niż oprocentowanie nominalne, ponieważ uwzględnia dodatkowe koszty. Im niższe RRSO, tym tańszy
            kredyt. Przeczytaj też nasz przewodnik o{' '}
            <Link href="/blog/ukryte-koszty-kredytu-hipotecznego" className="text-emerald-700 underline hover:text-emerald-800">
              ukrytych kosztach kredytu hipotecznego
            </Link>
            , aby dowiedzieć się, jakie koszty mogą wpłynąć na RRSO.
          </ArticleText>
          <CtaBox>
            <CtaTitle>Sprawdź RRSO w kalkulatorze</CtaTitle>
            <CtaText>
              Nasz kalkulator kredytu hipotecznego automatycznie oblicza RRSO dla wszystkich dostępnych ofert
              banków. Porównaj RRSO różnych ofert i znajdź najtańszy kredyt dla siebie.
            </CtaText>
            <CtaButton href="/kalkulator/kredyt-hipoteczny">
              Porównaj RRSO w kalkulatorze
              <HiOutlineArrowLongRight size={18} />
            </CtaButton>
          </CtaBox>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineChartBar size={18} />
              Składniki RRSO
            </SectionBadge>
            <SectionTitle>Co składa się na RRSO?</SectionTitle>
            <SectionSubtitle>
              RRSO uwzględnia wszystkie koszty kredytu. Poznaj poszczególne składniki wpływające na wysokość
              RRSO.
            </SectionSubtitle>
          </SectionHeader>
          <ComponentsGrid role="list">
            {rrsoComponents.map((component) => {
              const IconComponent = component.icon
              return (
                <ComponentCard key={component.title} role="listitem">
                  <ComponentIcon aria-hidden="true">
                    <IconComponent size={24} />
                  </ComponentIcon>
                  <ComponentTitle>{component.title}</ComponentTitle>
                  <ComponentDescription>{component.description}</ComponentDescription>
                  <ComponentImpact impact={component.impact}>
                    {component.impact}
                  </ComponentImpact>
                </ComponentCard>
              )
            })}
          </ComponentsGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineCalculator size={18} />
              Porównanie
            </SectionBadge>
            <SectionTitle>RRSO vs oprocentowanie - przykład</SectionTitle>
            <SectionSubtitle>
              Zobacz, jak różne kombinacje oprocentowania i prowizji wpływają na RRSO i całkowity koszt
              kredytu.
            </SectionSubtitle>
          </SectionHeader>
          <ComparisonBox>
            <ComparisonTitle>Przykład porównania dwóch ofert</ComparisonTitle>
            <ComparisonGrid>
              <ComparisonCard>
                <ComparisonBankName>{comparisonExample.bankA.name}</ComparisonBankName>
                <ComparisonRow>
                  <ComparisonLabel>Oprocentowanie:</ComparisonLabel>
                  <ComparisonValue>{comparisonExample.bankA.interestRate}%</ComparisonValue>
                </ComparisonRow>
                <ComparisonRow>
                  <ComparisonLabel>Prowizja:</ComparisonLabel>
                  <ComparisonValue>{comparisonExample.bankA.commission}%</ComparisonValue>
                </ComparisonRow>
                <ComparisonRow>
                  <ComparisonLabel>RRSO:</ComparisonLabel>
                  <ComparisonValue highlight>{comparisonExample.bankA.rrso}%</ComparisonValue>
                </ComparisonRow>
                <ComparisonDescription>{comparisonExample.bankA.description}</ComparisonDescription>
              </ComparisonCard>
              <ComparisonCard>
                <ComparisonBankName>{comparisonExample.bankB.name}</ComparisonBankName>
                <ComparisonRow>
                  <ComparisonLabel>Oprocentowanie:</ComparisonLabel>
                  <ComparisonValue>{comparisonExample.bankB.interestRate}%</ComparisonValue>
                </ComparisonRow>
                <ComparisonRow>
                  <ComparisonLabel>Prowizja:</ComparisonLabel>
                  <ComparisonValue>{comparisonExample.bankB.commission}%</ComparisonValue>
                </ComparisonRow>
                <ComparisonRow>
                  <ComparisonLabel>RRSO:</ComparisonLabel>
                  <ComparisonValue highlight>{comparisonExample.bankB.rrso}%</ComparisonValue>
                </ComparisonRow>
                <ComparisonDescription>{comparisonExample.bankB.description}</ComparisonDescription>
              </ComparisonCard>
            </ComparisonGrid>
            <ComparisonConclusion>
              <strong>Wniosek:</strong> Mimo że Bank B ma wyższe oprocentowanie, ma niższe RRSO dzięki
              niższej prowizji. Bank B oferuje tańszy kredyt w rzeczywistości.
            </ComparisonConclusion>
          </ComparisonBox>
          <CtaBox>
            <CtaTitle>Porównaj RRSO dla swoich parametrów</CtaTitle>
            <CtaText>
              Sprawdź w naszym kalkulatorze kredytu hipotecznego, aby porównać RRSO wszystkich dostępnych ofert
              dla Twoich konkretnych parametrów kredytu. Zobaczysz, który bank oferuje najtańszy kredyt.
            </CtaText>
            <CtaButton href="/kalkulator/kredyt-hipoteczny">
              Sprawdź RRSO różnych ofert
              <HiOutlineArrowLongRight size={18} />
            </CtaButton>
          </CtaBox>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineTrophy size={18} />
              Znaczenie
            </SectionBadge>
            <SectionTitle>Dlaczego RRSO jest ważne?</SectionTitle>
            <SectionSubtitle>
              RRSO to najlepszy wskaźnik do porównywania ofert kredytów hipotecznych. Oto dlaczego warto na
              niego zwracać uwagę.
            </SectionSubtitle>
          </SectionHeader>
          <BenefitsList role="list">
            <BenefitItem>
              <BenefitIcon aria-hidden="true">✓</BenefitIcon>
              <BenefitContent>
                <BenefitTitle>Uwzględnia wszystkie koszty</BenefitTitle>
                <BenefitDescription>
                  RRSO pokazuje pełny obraz kosztu kredytu, nie tylko oprocentowanie. Dzięki temu możesz
                  porównać oferty różnych banków i wybrać najtańszą.
                </BenefitDescription>
              </BenefitContent>
            </BenefitItem>
            <BenefitItem>
              <BenefitIcon aria-hidden="true">✓</BenefitIcon>
              <BenefitContent>
                <BenefitTitle>Umożliwia obiektywne porównanie</BenefitTitle>
                <BenefitDescription>
                  RRSO pozwala na porównanie ofert niezależnie od struktury kosztów. Bank z niższym RRSO
                  będzie zawsze tańszy niż bank z wyższym RRSO przy podobnych parametrach.
                </BenefitDescription>
              </BenefitContent>
            </BenefitItem>
            <BenefitItem>
              <BenefitIcon aria-hidden="true">✓</BenefitIcon>
              <BenefitContent>
                <BenefitTitle>Chroni przed ukrytymi kosztami</BenefitTitle>
                <BenefitDescription>
                  RRSO uwzględnia wszystkie koszty kredytu, więc nie możesz być zaskoczony dodatkowymi
                  opłatami. To chroni Cię przed ukrytymi kosztami, które mogą zwiększyć całkowity koszt
                  kredytu.
                </BenefitDescription>
              </BenefitContent>
            </BenefitItem>
            <BenefitItem>
              <BenefitIcon aria-hidden="true">✓</BenefitIcon>
              <BenefitContent>
                <BenefitTitle>Wymagane prawnie</BenefitTitle>
                <BenefitDescription>
                  Banki są zobowiązane prawnie do podawania RRSO w każdej ofercie kredytu. To gwarantuje, że
                  zawsze możesz porównać oferty i wybrać najlepszą dla siebie.
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
            <SectionTitle>Najczęściej zadawane pytania o RRSO</SectionTitle>
            <SectionSubtitle>
              Odpowiedzi na najpopularniejsze pytania dotyczące RRSO kredytu hipotecznego.
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
              RRSO (Rzeczywista Roczna Stopa Oprocentowania) to najważniejszy wskaźnik przy porównywaniu
              ofert kredytów hipotecznych. Pokazuje rzeczywisty koszt kredytu w skali roku, uwzględniając
              wszystkie koszty: oprocentowanie, prowizję, ubezpieczenia i inne opłaty. RRSO jest zawsze wyższe
              niż oprocentowanie nominalne i pozwala na obiektywne porównanie ofert różnych banków.
            </SummaryText>
            <SummaryText>
              Niższe RRSO oznacza tańszy kredyt, więc warto porównać RRSO różnych ofert przed podjęciem
              decyzji. Sprawdź w naszym kalkulatorze kredytu hipotecznego, aby automatycznie porównać RRSO
              wszystkich dostępnych ofert dla Twoich konkretnych parametrów i znaleźć najtańszy kredyt.
              Przeczytaj też nasze przewodniki o{' '}
              <Link href="/blog/oprocentowanie-kredytu-hipotecznego-stale-czy-zmienne" className="text-white underline hover:text-emerald-50">
                oprocentowaniu stałym i zmiennym
              </Link>
              ,{' '}
              <Link href="/blog/ukryte-koszty-kredytu-hipotecznego" className="text-white underline hover:text-emerald-50">
                ukrytych kosztach kredytu
              </Link>
              {' '}i{' '}
              <Link href="/blog/ranking-bankow-kredytow-hipotecznych-2025" className="text-white underline hover:text-emerald-50">
                rankingu banków kredytów hipotecznych
              </Link>
              .
            </SummaryText>
            <SummaryCta href="/kalkulator/kredyt-hipoteczny">
              Porównaj RRSO różnych ofert w kalkulatorze
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

const ComponentsGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const ComponentCard = tw.li`flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1 hover:shadow-lg`
const ComponentIcon = tw.span`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const ComponentTitle = tw.h3`mb-2 text-xl font-semibold text-gray-900`
const ComponentDescription = tw.p`mb-4 flex-1 text-sm leading-relaxed text-gray-600`
const ComponentImpact = tw.span<{ impact: string }>`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
  ({ impact }) =>
    impact.includes('Wysoki')
      ? 'bg-red-100 text-red-700'
      : impact.includes('Średni')
        ? 'bg-amber-100 text-amber-700'
        : 'bg-gray-100 text-gray-700'
}`

const ComparisonBox = tw.div`mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm`
const ComparisonTitle = tw.h3`mb-6 text-center text-xl font-semibold text-gray-900`
const ComparisonGrid = tw.div`grid grid-cols-1 gap-6 sm:grid-cols-2`
const ComparisonCard = tw.div`rounded-xl border border-gray-200 bg-gray-50 p-5`
const ComparisonBankName = tw.h4`mb-4 text-lg font-bold text-gray-900`
const ComparisonRow = tw.div`mb-3 flex items-center justify-between`
const ComparisonLabel = tw.span`text-sm text-gray-600`
const ComparisonValue = tw.span<{ highlight?: boolean }>`font-semibold ${({ highlight }) => (highlight ? 'text-emerald-600 text-lg' : 'text-gray-900')}`
const ComparisonDescription = tw.p`mt-4 text-xs text-gray-500`
const ComparisonConclusion = tw.p`mt-6 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800`

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

