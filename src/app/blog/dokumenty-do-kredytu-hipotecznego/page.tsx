import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowLongRight,
  HiOutlineCalculator,
  HiOutlineCheckCircle,
  HiOutlineClipboardDocumentCheck,
  HiOutlineDocumentText,
  HiOutlineSparkles,
  HiOutlineUser,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'
import { getPostRobotsMetadata } from 'utils/blog-posts'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {
  robots: getPostRobotsMetadata('dokumenty-do-kredytu-hipotecznego'),

  title: 'Dokumenty do kredytu hipotecznego - kompletna lista 2025',
  description:
    'Sprawdź, jakie dokumenty są potrzebne do kredytu hipotecznego: dokumenty tożsamości, dochód, nieruchomość i inne. Kompletna lista dokumentów 2025.',
  alternates: {
    canonical: `${siteUrl}/blog/dokumenty-do-kredytu-hipotecznego`,
  },
  keywords: [
    'dokumenty do kredytu hipotecznego',
    'jakie dokumenty są potrzebne do kredytu hipotecznego',
    'lista dokumentów kredyt hipoteczny',
    'dokumenty kredyt hipoteczny 2025',
    'zaświadczenie o dochodach kredyt hipoteczny',
    'dokumenty do wniosku kredytowego',
    'co jest potrzebne do kredytu hipotecznego',
  ],
  openGraph: {
    title: 'Dokumenty do kredytu hipotecznego - kompletna lista 2025',
    description:
      'Kompletna lista dokumentów potrzebnych do kredytu hipotecznego: dokumenty tożsamości, dochód, nieruchomość i inne.',
    url: `${siteUrl}/blog/dokumenty-do-kredytu-hipotecznego`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Dokumenty do kredytu hipotecznego',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dokumenty do kredytu hipotecznego - lista 2025',
    description: 'Sprawdź, jakie dokumenty są potrzebne do kredytu hipotecznego.',
    images: [`${siteUrl}/og-image.jpg`],
  },
}

const documentCategories = [
  {
    category: 'Dokumenty tożsamości',
    icon: HiOutlineUser,
    documents: [
      {
        name: 'Dowód osobisty',
        description: 'Aktualny dowód osobisty (ważny) lub paszport',
        required: true,
      },
      {
        name: 'Druga forma identyfikacji',
        description: 'Niektóre banki wymagają drugiej formy identyfikacji (np. prawo jazdy)',
        required: false,
      },
    ],
  },
  {
    category: 'Dokumenty potwierdzające dochód',
    icon: HiOutlineDocumentText,
    documents: [
      {
        name: 'Zaświadczenie o dochodach',
        description:
          'Zaświadczenie o dochodach z pracy za ostatnie 3-12 miesięcy (w zależności od banku)',
        required: true,
      },
      {
        name: 'Umowa o pracę',
        description: 'Kopia umowy o pracę lub aktualne zaświadczenie o zatrudnieniu',
        required: true,
      },
      {
        name: 'Wyciągi z konta',
        description:
          'Wyciągi z konta bankowego za ostatnie 3-6 miesięcy pokazujące regularne wpływy',
        required: true,
      },
      {
        name: 'PIT za ostatni rok',
        description: 'PIT za ostatni rok podatkowy (jeśli wymagane przez bank)',
        required: false,
      },
      {
        name: 'Zaświadczenie o dochodach z innych źródeł',
        description: 'Jeśli masz dodatkowe źródła dochodu (np. wynajem, działalność gospodarcza)',
        required: false,
      },
    ],
  },
  {
    category: 'Dokumenty dotyczące nieruchomości',
    icon: HiOutlineCheckCircle,
    documents: [
      {
        name: 'Akt notarialny lub umowa przedwstępna',
        description: 'Akt notarialny zakupu nieruchomości lub umowa przedwstępna',
        required: true,
      },
      {
        name: 'Wycena nieruchomości',
        description:
          'Wycena nieruchomości wykonana przez rzeczoznawcę (bank może zlecić własną wycenę)',
        required: true,
      },
      {
        name: 'Dokumenty własnościowe',
        description: 'Księga wieczysta, wypis z rejestru gruntów lub inne dokumenty własnościowe',
        required: true,
      },
      {
        name: 'Informacje o nieruchomości',
        description: 'Powierzchnia, stan techniczny, lokalizacja i inne informacje o nieruchomości',
        required: true,
      },
    ],
  },
  {
    category: 'Dokumenty dodatkowe',
    icon: HiOutlineClipboardDocumentCheck,
    documents: [
      {
        name: 'Historia kredytowa z BIK',
        description: 'Raport z BIK pokazujący historię kredytową (bank może pobrać samodzielnie)',
        required: false,
      },
      {
        name: 'Dokumenty dotyczące zobowiązań',
        description:
          'Informacje o innych zobowiązaniach finansowych (kredyty, pożyczki, karty kredytowe)',
        required: true,
      },
      {
        name: 'Dokumenty dotyczące wkładu własnego',
        description:
          'Dokumenty potwierdzające źródło wkładu własnego (wyciągi z konta, umowy sprzedaży)',
        required: true,
      },
      {
        name: 'Zaświadczenie o stanie cywilnym',
        description:
          'Akt małżeństwa lub inny dokument potwierdzający stan cywilny (jeśli wymagane)',
        required: false,
      },
    ],
  },
]

const tips = [
  {
    title: 'Przygotuj dokumenty z wyprzedzeniem',
    description:
      'Zbierz wszystkie wymagane dokumenty przed złożeniem wniosku. To przyspieszy proces i unikniesz opóźnień.',
    icon: HiOutlineCheckCircle,
  },
  {
    title: 'Sprawdź aktualność dokumentów',
    description:
      'Upewnij się, że wszystkie dokumenty są aktualne i ważne. Przeterminowane dokumenty mogą spowodować odrzucenie wniosku.',
    icon: HiOutlineDocumentText,
  },
  {
    title: 'Zrób kopie dokumentów',
    description:
      'Przygotuj kopie wszystkich dokumentów. Niektóre banki wymagają oryginałów, inne kopii - sprawdź wymagania banku.',
    icon: HiOutlineClipboardDocumentCheck,
  },
  {
    title: 'Sprawdź wymagania konkretnego banku',
    description:
      'Różne banki mogą wymagać różnych dokumentów. Sprawdź dokładną listę dokumentów w wybranym banku przed złożeniem wniosku.',
    icon: HiOutlineCalculator,
  },
]

const faqData = [
  {
    question: 'Jakie dokumenty są potrzebne do kredytu hipotecznego?',
    answer:
      'Do kredytu hipotecznego potrzebne są: dokumenty tożsamości (dowód osobisty), dokumenty potwierdzające dochód (zaświadczenie o dochodach, umowa o pracę, wyciągi z konta), dokumenty dotyczące nieruchomości (akt notarialny, wycena) i dokumenty dodatkowe (historia kredytowa, dokumenty dotyczące zobowiązań i wkładu własnego). Dokładna lista może różnić się w zależności od banku.',
  },
  {
    question: 'Ile miesięcy wyciągów z konta jest potrzebnych?',
    answer:
      'Większość banków wymaga wyciągów z konta za ostatnie 3-6 miesięcy. Niektóre banki mogą wymagać dłuższego okresu (np. 12 miesięcy), szczególnie jeśli dochód jest nieregularny lub pochodzi z różnych źródeł. Warto sprawdzić wymagania konkretnego banku.',
  },
  {
    question: 'Czy potrzebuję wyceny nieruchomości?',
    answer:
      'Tak, wycena nieruchomości jest zazwyczaj wymagana. Bank może zlecić własną wycenę lub zaakceptować wycenę wykonaną przez rzeczoznawcę. Koszt wyceny jest zwykle ponoszony przez kredytobiorcę i wynosi 300-1000 zł.',
  },
  {
    question: 'Czy mogę złożyć dokumenty online?',
    answer:
      'Wiele banków oferuje możliwość złożenia dokumentów online. Możesz przesłać skany dokumentów przez stronę banku lub aplikację mobilną. Niektóre banki wymagają jednak osobistej wizyty w oddziale do weryfikacji oryginałów dokumentów.',
  },
  {
    question: 'Jakie dokumenty są potrzebne dla współkredytobiorcy?',
    answer:
      'Współkredytobiorca musi złożyć te same dokumenty co główny kredytobiorca: dokumenty tożsamości, dokumenty potwierdzające dochód, dokumenty dotyczące zobowiązań i inne wymagane dokumenty. Warto przygotować komplet dokumentów dla każdego współkredytobiorcy.',
  },
  {
    question: 'Czy potrzebuję dokumentów dotyczących wkładu własnego?',
    answer:
      'Tak, bank wymaga dokumentów potwierdzających źródło wkładu własnego. To mogą być wyciągi z konta pokazujące oszczędności, umowy sprzedaży innych nieruchomości lub inne dokumenty potwierdzające legalne źródło środków.',
  },
  {
    question: 'Jak długo są ważne dokumenty?',
    answer:
      'Większość dokumentów jest ważna przez określony okres: zaświadczenia o dochodach zazwyczaj 30-90 dni, wyciągi z konta 30 dni, wycena nieruchomości 3-6 miesięcy. Warto sprawdzić wymagania banku dotyczące ważności dokumentów.',
  },
  {
    question: 'Co jeśli nie mam wszystkich dokumentów?',
    answer:
      'Jeśli nie masz wszystkich wymaganych dokumentów, skontaktuj się z bankiem i wyjaśnij sytuację. Niektóre dokumenty mogą być zastąpione innymi lub bank może zaakceptować alternatywne dokumenty. Warto przygotować się do rozmowy z bankiem i mieć gotowe wyjaśnienia.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Dokumenty do kredytu hipotecznego - kompletna lista 2025',
  description:
    'Kompletna lista dokumentów potrzebnych do kredytu hipotecznego: dokumenty tożsamości, dochód, nieruchomość i inne.',
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
  datePublished: '2026-02-04',
  dateModified: '2026-02-04',
  mainEntityOfPage: `${siteUrl}/blog/dokumenty-do-kredytu-hipotecznego`,
  articleSection: ['Dokumenty', 'Kredyt hipoteczny', 'Proces kredytowy'],
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
      name: 'Dokumenty do kredytu hipotecznego',
      item: `${siteUrl}/blog/dokumenty-do-kredytu-hipotecznego`,
    },
  ],
}

const relatedArticles = [
  {
    slug: 'jak-zlozyc-wniosek-o-kredyt-hipoteczny',
    title: 'Jak złożyć wniosek o kredyt hipoteczny?',
    description: 'Krok po kroku przewodnik po składaniu wniosku.',
  },
  {
    slug: 'jak-dlugo-trwa-proces-kredytowy',
    title: 'Jak długo trwa proces kredytowy?',
    description: 'Poznaj terminy i etapy procesu kredytowego.',
  },
  {
    slug: 'jak-obliczyc-zdolnosc-kredytowa',
    title: 'Jak obliczyć zdolność kredytową?',
    description:
      'Dowiedz się, jak banki obliczają zdolność kredytową i jak samodzielnie oszacować swoją zdolność.',
  },
  {
    slug: 'kredyt-hipoteczny-dla-przedsiebiorcy',
    title: 'Kredyt hipoteczny dla przedsiębiorcy',
    description: 'Wymagania i warunki kredytu dla przedsiębiorców.',
  },
]

export default function DocumentsPage() {
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
              <BreadcrumbCurrent>Dokumenty do kredytu hipotecznego</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>

        <HeroSection>
          <HeroEyebrow>Proces kredytowy</HeroEyebrow>
          <HeroTitle>Dokumenty do kredytu hipotecznego - kompletna lista 2025</HeroTitle>
          <HeroLead>
            Przygotowanie dokumentów to kluczowy etap procesu składania wniosku o kredyt hipoteczny.
            Kompletna lista dokumentów może wydawać się długa, ale odpowiednie przygotowanie
            przyspieszy proces i zwiększy szanse na pozytywną decyzję. W tym przewodniku znajdziesz
            kompletną listę dokumentów potrzebnych do kredytu hipotecznego, podzieloną na kategorie.
            Przed złożeniem wniosku sprawdź swoją zdolność kredytową w naszym kalkulatorze.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź zdolność kredytową przed wnioskiem
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
                <strong>Przygotuj dokumenty z wyprzedzeniem</strong> - zbierz wszystkie wymagane
                dokumenty przed złożeniem wniosku.
              </li>
              <li>
                <strong>Sprawdź aktualność dokumentów</strong> - upewnij się, że wszystkie dokumenty
                są aktualne i ważne.
              </li>
              <li>
                <strong>Różne banki mogą wymagać różnych dokumentów</strong> - sprawdź wymagania
                konkretnego banku.
              </li>
              <li>
                <strong>Zrób kopie dokumentów</strong> - przygotuj kopie wszystkich dokumentów przed
                wizytą w banku.
              </li>
            </IntroList>
          </IntroContent>
        </IntroCard>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineDocumentText size={18} />
              Lista dokumentów
            </SectionBadge>
            <SectionTitle>Kompletna lista dokumentów do kredytu hipotecznego</SectionTitle>
            <SectionSubtitle>
              Oto szczegółowa lista dokumentów potrzebnych do kredytu hipotecznego, podzielona na
              kategorie.
            </SectionSubtitle>
          </SectionHeader>
          <CategoriesGrid role="list">
            {documentCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <CategoryCard key={category.category} role="listitem">
                  <CategoryHeader>
                    <CategoryIcon aria-hidden="true">
                      <IconComponent size={24} />
                    </CategoryIcon>
                    <CategoryTitle>{category.category}</CategoryTitle>
                  </CategoryHeader>
                  <DocumentsList>
                    {category.documents.map((doc) => (
                      <DocumentItem key={doc.name}>
                        <DocumentName>
                          {doc.name}
                          {doc.required && <RequiredBadge>Wymagane</RequiredBadge>}
                        </DocumentName>
                        <DocumentDescription>{doc.description}</DocumentDescription>
                      </DocumentItem>
                    ))}
                  </DocumentsList>
                </CategoryCard>
              )
            })}
          </CategoriesGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineCheckCircle size={18} />
              Wskazówki
            </SectionBadge>
            <SectionTitle>Praktyczne wskazówki dotyczące dokumentów</SectionTitle>
            <SectionSubtitle>
              Oto praktyczne wskazówki, które pomogą Ci przygotować dokumenty do kredytu
              hipotecznego.
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
          <CtaBox>
            <CtaTitle>Sprawdź zdolność kredytową przed przygotowaniem dokumentów</CtaTitle>
            <CtaText>
              Przed przygotowaniem dokumentów sprawdź swoją zdolność kredytową w naszym
              kalkulatorze. To pomoże Ci ocenić, czy warto przygotowywać dokumenty i na jaką kwotę
              możesz liczyć.
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
            <SectionTitle>Najczęściej zadawane pytania o dokumenty</SectionTitle>
            <SectionSubtitle>
              Odpowiedzi na najpopularniejsze pytania dotyczące dokumentów potrzebnych do kredytu
              hipotecznego.
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
              Przygotowanie dokumentów to kluczowy etap procesu składania wniosku o kredyt
              hipoteczny. Kompletna lista dokumentów obejmuje: dokumenty tożsamości, dokumenty
              potwierdzające dochód, dokumenty dotyczące nieruchomości i dokumenty dodatkowe. Różne
              banki mogą wymagać różnych dokumentów, więc warto sprawdzić wymagania konkretnego
              banku przed złożeniem wniosku.
            </SummaryText>
            <SummaryText>
              Aby przyspieszyć proces, warto: przygotować dokumenty z wyprzedzeniem, sprawdzić
              aktualność dokumentów, zrobić kopie dokumentów i sprawdzić wymagania konkretnego
              banku. Przed przygotowaniem dokumentów sprawdź swoją zdolność kredytową w naszym
              kalkulatorze kredytu hipotecznego. Przeczytaj też nasze przewodniki o{' '}
              <Link
                href="/blog/jak-zlozyc-wniosek-o-kredyt-hipoteczny"
                className="text-white underline hover:text-emerald-50"
              >
                jak złożyć wniosek o kredyt hipoteczny
              </Link>
              ,{' '}
              <Link
                href="/blog/jak-dlugo-trwa-proces-kredytowy"
                className="text-white underline hover:text-emerald-50"
              >
                jak długo trwa proces kredytowy
              </Link>{' '}
              i{' '}
              <Link
                href="/blog/jak-obliczyc-zdolnosc-kredytowa"
                className="text-white underline hover:text-emerald-50"
              >
                jak obliczyć zdolność kredytową
              </Link>
              .
            </SummaryText>
            <SummaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź zdolność kredytową przed wnioskiem
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
const BreadcrumbLink = tw(
  Link,
)`text-emerald-700 hover:text-emerald-800 hover:underline transition-colors`
const BreadcrumbSeparator = tw.span`text-gray-400 mx-1`
const BreadcrumbCurrent = tw.span`text-gray-900 font-medium`

const PageWrapper = tw.main`min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-100`
const ContentContainer = tw.div`mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20`

const HeroSection = tw.section`mx-auto max-w-3xl text-center`
const HeroEyebrow = tw.span`mb-4 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700`
const HeroTitle = tw.h1`mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl`
const HeroLead = tw.p`mx-auto mb-8 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg`
const HeroActions = tw.div`flex flex-col items-center justify-center gap-3 sm:flex-row`

const PrimaryCta = tw(
  Link,
)`inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500`

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
const CtaButton = tw(
  Link,
)`inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500`

const CategoriesGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const CategoryCard = tw.li`flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1 hover:shadow-lg`
const CategoryHeader = tw.div`mb-4 flex items-center gap-4`
const CategoryIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const CategoryTitle = tw.h3`text-xl font-semibold text-gray-900`
const DocumentsList = tw.ul`space-y-4`
const DocumentItem = tw.li`flex flex-col gap-2`
const DocumentName = tw.h4`flex items-center gap-2 text-base font-semibold text-gray-900`
const RequiredBadge = tw.span`inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700`
const DocumentDescription = tw.p`text-sm leading-relaxed text-gray-600`

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
const SummaryCta = tw(
  Link,
)`mt-6 inline-flex items-center gap-2 self-center rounded-full bg-white px-6 py-3 font-semibold text-emerald-600 transition-colors hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`
