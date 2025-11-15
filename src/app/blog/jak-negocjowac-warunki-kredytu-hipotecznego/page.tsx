import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowLongRight,
  HiOutlineCalculator,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentText,
  HiOutlineHandRaised,
  HiOutlineSparkles,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'
import { getPostRobotsMetadata } from 'utils/blog-posts'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {  robots: getPostRobotsMetadata('jak-negocjowac-warunki-kredytu-hipotecznego'),

  title: 'Jak negocjować warunki kredytu hipotecznego? Poradnik',
  description:
    'Dowiedz się, jak negocjować warunki kredytu hipotecznego: prowizję, oprocentowanie i inne opłaty. Praktyczne wskazówki i techniki negocjacji.',
  alternates: {
    canonical: `${siteUrl}/blog/jak-negocjowac-warunki-kredytu-hipotecznego`,
  },
  keywords: [
    'jak negocjować warunki kredytu hipotecznego',
    'negocjacja kredytu hipotecznego',
    'jak obniżyć prowizję kredytu',
    'negocjacja oprocentowania kredytu',
    'jak wynegocjować lepsze warunki kredytu',
    'negocjacja z bankiem kredyt hipoteczny',
    'jak obniżyć koszty kredytu',
  ],
  openGraph: {
    title: 'Jak negocjować warunki kredytu hipotecznego? Poradnik',
    description:
      'Kompletny przewodnik po negocjowaniu warunków kredytu hipotecznego: techniki, wskazówki i praktyczne porady.',
    url: `${siteUrl}/blog/jak-negocjowac-warunki-kredytu-hipotecznego`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/images/blog/jak-negocjowac-warunki-kredytu-hipotecznego-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Jak negocjować warunki kredytu hipotecznego',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jak negocjować warunki kredytu hipotecznego?',
    description: 'Dowiedz się, jak negocjować warunki kredytu hipotecznego i obniżyć koszty.',
    images: [`${siteUrl}/images/blog/jak-negocjowac-warunki-kredytu-hipotecznego-og.jpg`],
  },
}

const negotiableItems = [
  {
    item: 'Prowizja za udzielenie',
    description:
      'Prowizja jest często negocjowalna, szczególnie jeśli masz dobrą zdolność kredytową lub jesteś wartościowym klientem. Możesz negocjować obniżenie lub zniesienie prowizji.',
    potentialSavings: 'Możliwe oszczędności: 0-2% kwoty kredytu',
    icon: HiOutlineCurrencyDollar,
  },
  {
    item: 'Oprocentowanie',
    description:
      'Oprocentowanie może być negocjowalne, szczególnie jeśli masz wysoką zdolność kredytową, duży wkład własny lub jesteś wartościowym klientem. Możesz negocjować niższe oprocentowanie.',
    potentialSavings: 'Możliwe oszczędności: 0,1-0,5 p.p.',
    icon: HiOutlineCalculator,
  },
  {
    item: 'Opłaty za konto',
    description:
      'Jeśli bank wymaga otwarcia konta, możesz negocjować bezpłatne konto lub obniżenie opłat za konto przy kredycie hipotecznym.',
    potentialSavings: 'Możliwe oszczędności: 600-1200 zł rocznie',
    icon: HiOutlineCurrencyDollar,
  },
  {
    item: 'Ubezpieczenia',
    description:
      'Możesz negocjować warunki ubezpieczeń: wysokość składki, zakres ubezpieczenia i możliwość rezygnacji po pierwszym roku.',
    potentialSavings: 'Możliwe oszczędności: 500-2000 zł rocznie',
    icon: HiOutlineCheckCircle,
  },
  {
    item: 'Opłaty za wcześniejszą spłatę',
    description:
      'Możesz negocjować brak opłat za wcześniejszą spłatę lub nadpłatę, szczególnie jeśli planujesz spłacić kredyt wcześniej.',
    potentialSavings: 'Możliwe oszczędności: 0-3% spłacanej kwoty',
    icon: HiOutlineCheckCircle,
  },
]

const techniques = [
  {
    technique: 'Przygotuj się do negocjacji',
    description:
      'Przed negocjacją przygotuj się: sprawdź oferty innych banków, oblicz swoją zdolność kredytową, przygotuj argumenty i wiedz, czego chcesz.',
    icon: HiOutlineDocumentText,
  },
  {
    technique: 'Użyj ofert innych banków',
    description:
      'Użyj ofert innych banków jako argumentu w negocjacjach. Jeśli inny bank oferuje lepsze warunki, użyj tego jako argumentu do obniżenia warunków.',
    icon: HiOutlineCalculator,
  },
  {
    technique: 'Bądź wartościowym klientem',
    description:
      'Jeśli jesteś wartościowym klientem (np. masz wysoką zdolność kredytową, otwierasz konto w banku), możesz negocjować lepsze warunki.',
    icon: HiOutlineCheckCircle,
  },
  {
    technique: 'Negocjuj przed podpisaniem',
    description:
      'Negocjuj warunki przed podpisaniem umowy, nie po. Po podpisaniu umowy negocjacja jest znacznie trudniejsza.',
    icon: HiOutlineHandRaised,
  },
  {
    technique: 'Bądź gotowy do odejścia',
    description:
      'Bądź gotowy do odejścia, jeśli bank nie chce negocjować. To pokazuje, że jesteś poważnym klientem i może skłonić bank do negocjacji.',
    icon: HiOutlineCheckCircle,
  },
  {
    technique: 'Negocjuj wszystko razem',
    description:
      'Negocjuj wszystkie warunki razem (prowizja, oprocentowanie, opłaty), a nie osobno. To daje większą siłę przetargową.',
    icon: HiOutlineCurrencyDollar,
  },
]

const faqData = [
  {
    question: 'Czy mogę negocjować warunki kredytu hipotecznego?',
    answer:
      'Tak, możesz negocjować warunki kredytu hipotecznego przed podpisaniem umowy. Wiele banków jest skłonnych do obniżenia prowizji, oprocentowania lub innych opłat, aby zdobyć klienta. Warto przygotować się do negocjacji i mieć gotowe argumenty.',
  },
  {
    question: 'Co mogę negocjować przy kredycie hipotecznym?',
    answer:
      'Możesz negocjować: prowizję za udzielenie kredytu, oprocentowanie, opłaty za konto, ubezpieczenia, opłaty za wcześniejszą spłatę i inne opłaty. Warto negocjować wszystkie warunki razem, a nie osobno.',
  },
  {
    question: 'Jak negocjować prowizję kredytu?',
    answer:
      'Aby negocjować prowizję, przygotuj się: sprawdź oferty innych banków, oblicz swoją zdolność kredytową i przygotuj argumenty. Użyj ofert innych banków jako argumentu do obniżenia prowizji. Bądź gotowy do odejścia, jeśli bank nie chce negocjować.',
  },
  {
    question: 'Czy mogę negocjować oprocentowanie?',
    answer:
      'Tak, możesz negocjować oprocentowanie, szczególnie jeśli masz wysoką zdolność kredytową, duży wkład własny lub jesteś wartościowym klientem. Możesz negocjować niższe oprocentowanie, używając ofert innych banków jako argumentu.',
  },
  {
    question: 'Kiedy najlepiej negocjować warunki?',
    answer:
      'Najlepiej negocjować warunki przed podpisaniem umowy, nie po. Po podpisaniu umowy negocjacja jest znacznie trudniejsza. Warto również negocjować w okresach wzmożonego zainteresowania kredytami, gdy banki są bardziej skłonne do negocjacji.',
  },
  {
    question: 'Jak przygotować się do negocjacji?',
    answer:
      'Aby przygotować się do negocjacji, warto: sprawdzić oferty innych banków w kalkulatorze, obliczyć swoją zdolność kredytową, przygotować argumenty i wiedzieć, czego chcesz. Użyj kalkulatora kredytu hipotecznego, aby porównać oferty i przygotować argumenty.',
  },
  {
    question: 'Co jeśli bank nie chce negocjować?',
    answer:
      'Jeśli bank nie chce negocjować, możesz: spróbować negocjować z innym doradcą w banku, rozważyć oferty innych banków lub być gotowym do odejścia. Pamiętaj, że masz prawo do negocjacji i możesz wybrać najlepszą ofertę dla siebie.',
  },
  {
    question: 'Czy negocjacja zawsze się opłaca?',
    answer:
      'Negocjacja może przynieść znaczne oszczędności, szczególnie jeśli masz dobrą zdolność kredytową lub jesteś wartościowym klientem. Warto jednak przygotować się do negocjacji i mieć gotowe argumenty. Nawet niewielkie obniżenie prowizji lub oprocentowania może przynieść oszczędności w długim okresie.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Jak negocjować warunki kredytu hipotecznego? Poradnik',
  description:
    'Kompletny przewodnik po negocjowaniu warunków kredytu hipotecznego: techniki, wskazówki i praktyczne porady.',
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
  datePublished: '2026-03-10',
  dateModified: '2026-03-10',
  mainEntityOfPage: `${siteUrl}/blog/jak-negocjowac-warunki-kredytu-hipotecznego`,
  articleSection: ['Negocjacje', 'Kredyt hipoteczny', 'Poradniki'],
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
      name: 'Jak negocjować warunki kredytu hipotecznego?',
      item: `${siteUrl}/blog/jak-negocjowac-warunki-kredytu-hipotecznego`,
    },
  ],
}

const relatedArticles = [
  {
    slug: 'prowizja-kredyt-hipoteczny',
    title: 'Prowizja za udzielenie kredytu hipotecznego',
    description: 'Dowiedz się, ile wynosi prowizja i jak ją zmniejszyć.',
  },
  {
    slug: 'ubezpieczenie-kredytu-hipotecznego',
    title: 'Ubezpieczenie kredytu hipotecznego',
    description: 'Poznaj rodzaje ubezpieczeń i ich wpływ na koszt kredytu.',
  },
  {
    slug: 'jak-wybrac-najlepszy-kredyt-hipoteczny',
    title: 'Jak wybrać najlepszy kredyt hipoteczny?',
    description: 'Kompleksowy przewodnik po wyborze najlepszego kredytu.',
  },
  {
    slug: 'ranking-bankow-kredytow-hipotecznych-2025',
    title: 'Ranking banków kredytów hipotecznych 2025',
    description: 'Porównaj oferty banków i znajdź najlepszy kredyt dla siebie.',
  }
]

export default function NegotiationPage() {
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
              <BreadcrumbCurrent>Jak negocjować warunki kredytu hipotecznego?</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>

        <HeroSection>
          <HeroEyebrow>Negocjacje</HeroEyebrow>
          <HeroTitle>Jak negocjować warunki kredytu hipotecznego? Poradnik</HeroTitle>
          <HeroLead>
            Negocjacja warunków kredytu hipotecznego może przynieść znaczne oszczędności. Wiele banków jest
            skłonnych do obniżenia prowizji, oprocentowania lub innych opłat, aby zdobyć klienta. W tym
            przewodniku dowiesz się, jak negocjować warunki kredytu, jakie elementy można negocjować i jakie
            techniki są najskuteczniejsze. Przed negocjacjami porównaj oferty banków w naszym kalkulatorze.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Porównaj oferty przed negocjacjami
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
                <strong>Wiele warunków jest negocjowalnych</strong> - prowizja, oprocentowanie, opłaty za
                konto i ubezpieczenia.
              </li>
              <li>
                <strong>Przygotuj się do negocjacji</strong> - sprawdź oferty innych banków i przygotuj
                argumenty.
              </li>
              <li>
                <strong>Negocjuj przed podpisaniem</strong> - po podpisaniu umowy negocjacja jest znacznie
                trudniejsza.
              </li>
              <li>
                <strong>Bądź gotowy do odejścia</strong> - to pokazuje, że jesteś poważnym klientem.
              </li>
            </IntroList>
          </IntroContent>
        </IntroCard>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineCurrencyDollar size={18} />
              Co negocjować
            </SectionBadge>
            <SectionTitle>Co można negocjować przy kredycie hipotecznym?</SectionTitle>
            <SectionSubtitle>
              Oto elementy kredytu hipotecznego, które można negocjować i potencjalne oszczędności.
            </SectionSubtitle>
          </SectionHeader>
          <NegotiableGrid role="list">
            {negotiableItems.map((item) => {
              const IconComponent = item.icon
              return (
                <NegotiableCard key={item.item} role="listitem">
                  <NegotiableHeader>
                    <NegotiableIcon aria-hidden="true">
                      <IconComponent size={24} />
                    </NegotiableIcon>
                    <NegotiableTitle>{item.item}</NegotiableTitle>
                  </NegotiableHeader>
                  <NegotiableDescription>{item.description}</NegotiableDescription>
                  <NegotiableSavings>{item.potentialSavings}</NegotiableSavings>
                </NegotiableCard>
              )
            })}
          </NegotiableGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineHandRaised size={18} />
              Techniki
            </SectionBadge>
            <SectionTitle>Techniki skutecznej negocjacji</SectionTitle>
            <SectionSubtitle>
              Oto praktyczne techniki negocjacji, które pomogą Ci uzyskać lepsze warunki kredytu.
            </SectionSubtitle>
          </SectionHeader>
          <TechniquesGrid role="list">
            {techniques.map((technique) => {
              const IconComponent = technique.icon
              return (
                <TechniqueCard key={technique.technique} role="listitem">
                  <TechniqueIcon aria-hidden="true">
                    <IconComponent size={24} />
                  </TechniqueIcon>
                  <TechniqueTitle>{technique.technique}</TechniqueTitle>
                  <TechniqueDescription>{technique.description}</TechniqueDescription>
                </TechniqueCard>
              )
            })}
          </TechniquesGrid>
          <CtaBox>
            <CtaTitle>Porównaj oferty przed negocjacjami</CtaTitle>
            <CtaText>
              Przed negocjacjami porównaj oferty różnych banków w naszym kalkulatorze kredytu hipotecznego.
              To pomoże Ci przygotować argumenty i wiedzieć, jakie warunki możesz wynegocjować.
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
              <HiOutlineDocumentText size={18} />
              FAQ
            </SectionBadge>
            <SectionTitle>Najczęściej zadawane pytania o negocjacje</SectionTitle>
            <SectionSubtitle>
              Odpowiedzi na najpopularniejsze pytania dotyczące negocjowania warunków kredytu hipotecznego.
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
              Negocjacja warunków kredytu hipotecznego może przynieść znaczne oszczędności. Możesz negocjować:
              prowizję za udzielenie kredytu, oprocentowanie, opłaty za konto, ubezpieczenia i opłaty za
              wcześniejszą spłatę. Wiele banków jest skłonnych do obniżenia warunków, aby zdobyć klienta,
              szczególnie jeśli masz dobrą zdolność kredytową lub jesteś wartościowym klientem.
            </SummaryText>
            <SummaryText>
              Aby skutecznie negocjować, warto: przygotować się do negocjacji (sprawdzić oferty innych
              banków, obliczyć zdolność kredytową), użyć ofert innych banków jako argumentu, być wartościowym
              klientem, negocjować przed podpisaniem umowy i być gotowym do odejścia. Przed negocjacjami
              porównaj oferty banków w naszym kalkulatorze kredytu hipotecznego, aby przygotować argumenty.
              Przeczytaj też nasze przewodniki o{' '}
              <Link href="/blog/jak-wybrac-najlepszy-kredyt-hipoteczny" className="text-white underline hover:text-emerald-50">
                jak wybrać najlepszy kredyt hipoteczny
              </Link>
              ,{' '}
              <Link href="/blog/ranking-bankow-kredytow-hipotecznych-2025" className="text-white underline hover:text-emerald-50">
                rankingu banków kredytów hipotecznych
              </Link>
              {' '}i{' '}
              <Link href="/blog/prowizja-kredyt-hipoteczny" className="text-white underline hover:text-emerald-50">
                prowizji za udzielenie kredytu
              </Link>
              .
            </SummaryText>
            <SummaryCta href="/kalkulator/kredyt-hipoteczny">
              Porównaj oferty przed negocjacjami
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

const NegotiableGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const NegotiableCard = tw.li`flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1 hover:shadow-lg`
const NegotiableHeader = tw.div`mb-4 flex items-center gap-4`
const NegotiableIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const NegotiableTitle = tw.h3`flex-1 text-xl font-semibold text-gray-900`
const NegotiableDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const NegotiableSavings = tw.p`mt-auto rounded-lg bg-emerald-50 p-3 text-sm font-semibold text-emerald-800`

const TechniquesGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const TechniqueCard = tw.li`flex h-full flex-col rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1 hover:shadow-lg`
const TechniqueIcon = tw.span`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const TechniqueTitle = tw.h3`mb-2 text-xl font-semibold text-gray-900`
const TechniqueDescription = tw.p`text-sm leading-relaxed text-gray-600`

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

