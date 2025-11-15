import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowLongRight,
  HiOutlineCalculator,
  HiOutlineCheckCircle,
  HiOutlineDocumentText,
  HiOutlineHome,
  HiOutlineSparkles,
  HiOutlineWrenchScrewdriver,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'
import { getPostRobotsMetadata } from 'utils/blog-posts'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {  robots: getPostRobotsMetadata('kredyt-hipoteczny-na-budowe-domu'),

  title: 'Kredyt hipoteczny na budowę domu - poradnik 2026',
  description:
    'Dowiedz się, jak wziąć kredyt hipoteczny na budowę domu: wymagania, dokumenty, harmonogram wypłat i wskazówki. Sprawdź oferty w kalkulatorze.',
  alternates: {
    canonical: `${siteUrl}/blog/kredyt-hipoteczny-na-budowe-domu`,
  },
  keywords: [
    'kredyt hipoteczny na budowę domu',
    'kredyt na budowę',
    'kredyt budowlany',
    'kredyt hipoteczny budowa',
    'jak wziąć kredyt na budowę',
    'dokumenty kredyt budowa',
    'harmonogram wypłat kredytu budowa',
  ],
  openGraph: {
    title: 'Kredyt hipoteczny na budowę domu - poradnik 2026',
    description:
      'Kompletny przewodnik po kredycie hipotecznym na budowę domu: wymagania, dokumenty i harmonogram wypłat.',
    url: `${siteUrl}/blog/kredyt-hipoteczny-na-budowe-domu`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/images/blog/kredyt-hipoteczny-na-budowe-domu-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Kredyt hipoteczny na budowę domu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kredyt hipoteczny na budowę domu',
    description: 'Dowiedz się, jak wziąć kredyt hipoteczny na budowę domu.',
    images: [`${siteUrl}/images/blog/kredyt-hipoteczny-na-budowe-domu-og.jpg`],
  },
}

const requirements = [
  {
    requirement: 'Działka budowlana',
    description:
      'Musisz mieć działkę budowlaną z odpowiednimi pozwoleniami i warunkami zabudowy. Działka powinna być własnością lub mieć umowę dzierżawy z prawem wykupu.',
    details: [
      'Działka z pozwoleniem na budowę',
      'Warunki zabudowy',
      'Własność lub dzierżawa z prawem wykupu',
      'Dokumenty własności działki',
    ],
    icon: HiOutlineHome,
  },
  {
    requirement: 'Pozwolenie na budowę',
    description:
      'Musisz mieć pozwolenie na budowę lub decyzję o warunkach zabudowy. Bank sprawdza, czy budowa jest legalna i zgodna z przepisami.',
    details: [
      'Pozwolenie na budowę',
      'Projekt budowlany',
      'Warunki zabudowy',
      'Zgodność z przepisami',
    ],
    icon: HiOutlineDocumentText,
  },
  {
    requirement: 'Wkład własny',
    description:
      'Bank wymaga wkładu własnego, zazwyczaj minimum 20% wartości inwestycji. Część wkładu może być przeznaczona na zakup działki, a część na budowę.',
    details: [
      'Minimum 20% wartości inwestycji',
      'Możliwość częściowego wykorzystania na działkę',
      'Dokumenty potwierdzające wkład własny',
      'Program mdM: 10% (jeśli spełniasz warunki)',
    ],
    icon: HiOutlineCheckCircle,
  },
  {
    requirement: 'Harmonogram budowy',
    description:
      'Musisz przedstawić harmonogram budowy z etapami i kosztami. Bank wypłaca środki zgodnie z postępem prac budowlanych.',
    details: [
      'Szczegółowy harmonogram budowy',
      'Etapy budowy',
      'Koszty poszczególnych etapów',
      'Harmonogram wypłat',
    ],
    icon: HiOutlineWrenchScrewdriver,
  },
]

const stages = [
  {
    stage: 'Etap 1: Przygotowanie działki',
    description:
      'Pierwszy etap obejmuje przygotowanie działki: wykopy, fundamenty i przyłącza. Bank wypłaca środki po zakończeniu tego etapu.',
    payment: '10-15% wartości kredytu',
    icon: HiOutlineWrenchScrewdriver,
  },
  {
    stage: 'Etap 2: Stan surowy',
    description:
      'Drugi etap to stan surowy: ściany, dach i stropy. Bank wypłaca środki po zakończeniu tego etapu i weryfikacji postępu prac.',
    payment: '30-40% wartości kredytu',
    icon: HiOutlineHome,
  },
  {
    stage: 'Etap 3: Wykończenie',
    description:
      'Trzeci etap to wykończenie: instalacje, tynki, podłogi i wyposażenie. Bank wypłaca środki po zakończeniu tego etapu.',
    payment: '30-40% wartości kredytu',
    icon: HiOutlineCheckCircle,
  },
  {
    stage: 'Etap 4: Zakończenie budowy',
    description:
      'Ostatni etap to zakończenie budowy: odbiór budynku, pozwolenie na użytkowanie i wpis do księgi wieczystej. Bank wypłaca pozostałe środki.',
    payment: '10-20% wartości kredytu',
    icon: HiOutlineDocumentText,
  },
]

const tips = [
  {
    title: 'Przygotuj szczegółowy harmonogram',
    description:
      'Przygotuj szczegółowy harmonogram budowy z etapami i kosztami. To pomoże bankowi ocenić projekt i zaplanować wypłaty.',
    icon: HiOutlineDocumentText,
  },
  {
    title: 'Sprawdź zdolność kredytową',
    description:
      'Sprawdź swoją zdolność kredytową w kalkulatorze przed rozpoczęciem budowy. Upewnij się, że możesz pozwolić sobie na raty kredytu.',
    icon: HiOutlineCalculator,
  },
  {
    title: 'Zabezpiecz dodatkowe środki',
    description:
      'Budowa może kosztować więcej niż planowano. Zabezpiecz dodatkowe środki na nieprzewidziane wydatki i opóźnienia.',
    icon: HiOutlineCheckCircle,
  },
  {
    title: 'Wybierz doświadczonego wykonawcę',
    description:
      'Wybierz doświadczonego wykonawcę z dobrą opinią. Bank może wymagać potwierdzenia doświadczenia wykonawcy.',
    icon: HiOutlineHome,
  },
]

const faqData = [
  {
    question: 'Jak wziąć kredyt hipoteczny na budowę domu?',
    answer:
      'Aby wziąć kredyt hipoteczny na budowę domu, musisz mieć: działkę budowlaną z pozwoleniem, pozwolenie na budowę, wkład własny (minimum 20%), harmonogram budowy i zdolność kredytową. Bank wypłaca środki zgodnie z postępem prac budowlanych. Sprawdź oferty w kalkulatorze przed rozpoczęciem budowy.',
  },
  {
    question: 'Ile wynosi wkład własny na budowę domu?',
    answer:
      'Wkład własny na budowę domu wynosi zazwyczaj minimum 20% wartości inwestycji (działka + budowa). Część wkładu może być przeznaczona na zakup działki, a część na budowę. W programie mdM wkład własny wynosi 10%, jeśli spełniasz warunki programu.',
  },
  {
    question: 'Jak działa harmonogram wypłat przy budowie?',
    answer:
      'Harmonogram wypłat przy budowie działa etapowo: bank wypłaca środki po zakończeniu każdego etapu budowy (przygotowanie działki, stan surowy, wykończenie, zakończenie budowy). Bank weryfikuje postęp prac przed wypłatą środków. Każdy etap ma przypisaną część wartości kredytu.',
  },
  {
    question: 'Czy mogę wziąć kredyt na budowę bez działki?',
    answer:
      'Nie, bank wymaga działki budowlanej jako zabezpieczenia kredytu. Działka powinna być własnością lub mieć umowę dzierżawy z prawem wykupu. Możesz jednak wziąć kredyt na zakup działki i budowę razem.',
  },
  {
    question: 'Jakie dokumenty są potrzebne do kredytu na budowę?',
    answer:
      'Do kredytu na budowę potrzebne są: dokumenty własności działki, pozwolenie na budowę, projekt budowlany, harmonogram budowy, kosztorys budowy, umowa z wykonawcą (jeśli masz), dokumenty potwierdzające wkład własny i dokumenty dotyczące zdolności kredytowej.',
  },
  {
    question: 'Czy mogę samodzielnie budować dom z kredytem?',
    answer:
      'Tak, możesz samodzielnie budować dom z kredytem, ale bank może wymagać potwierdzenia doświadczenia lub nadzoru budowlanego. Samodzielna budowa może być trudniejsza do weryfikacji przez bank, więc warto przygotować szczegółową dokumentację postępu prac.',
  },
  {
    question: 'Co jeśli budowa kosztuje więcej niż planowano?',
    answer:
      'Jeśli budowa kosztuje więcej niż planowano, możesz: wykorzystać dodatkowe środki własne, złożyć wniosek o zwiększenie kredytu (jeśli masz zdolność kredytową) lub rozłożyć niektóre etapy na później. Warto zabezpieczyć dodatkowe środki na nieprzewidziane wydatki.',
  },
  {
    question: 'Jak długo trwa proces kredytowy na budowę?',
    answer:
      'Proces kredytowy na budowę może trwać dłużej niż standardowy kredyt hipoteczny, ponieważ bank musi zweryfikować więcej dokumentów: działkę, pozwolenie na budowę, projekt i harmonogram. Proces może trwać 2-4 miesiące, w zależności od banku i złożoności projektu.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Kredyt hipoteczny na budowę domu - poradnik 2026',
  description:
    'Kompletny przewodnik po kredycie hipotecznym na budowę domu: wymagania, dokumenty i harmonogram wypłat.',
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
  datePublished: '2026-04-28',
  dateModified: '2026-04-28',
  mainEntityOfPage: `${siteUrl}/blog/kredyt-hipoteczny-na-budowe-domu`,
  articleSection: ['Budowa domu', 'Kredyt hipoteczny', 'Poradniki'],
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
      name: 'Kredyt hipoteczny na budowę domu',
      item: `${siteUrl}/blog/kredyt-hipoteczny-na-budowe-domu`,
    },
  ],
}

const relatedArticles = [
  {
    slug: 'wklad-wlasny-kredyt-hipoteczny',
    title: 'Wkład własny na kredyt hipoteczny 2026',
    description: 'Dowiedz się, ile wynosi minimalny wkład własny i jak go obliczyć.',
  },
  {
    slug: 'dokumenty-do-kredytu-hipotecznego',
    title: 'Dokumenty do kredytu hipotecznego',
    description: 'Kompletna lista dokumentów potrzebnych do kredytu.',
  },
  {
    slug: 'jak-dlugo-trwa-proces-kredytowy',
    title: 'Jak długo trwa proces kredytowy?',
    description: 'Poznaj terminy i etapy procesu kredytowego.',
  },
  {
    slug: 'jak-obliczyc-zdolnosc-kredytowa',
    title: 'Jak obliczyć zdolność kredytową?',
    description: 'Dowiedz się, jak banki obliczają zdolność kredytową i jak samodzielnie oszacować swoją zdolność.',
  }
]

export default function ConstructionLoanPage() {
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
              <BreadcrumbCurrent>Kredyt hipoteczny na budowę domu</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>

        <HeroSection>
          <HeroEyebrow>Budowa domu</HeroEyebrow>
          <HeroTitle>Kredyt hipoteczny na budowę domu - poradnik 2026</HeroTitle>
          <HeroLead>
            Kredyt hipoteczny na budowę domu to specjalny rodzaj kredytu, który różni się od standardowego
            kredytu hipotecznego. Bank wypłaca środki etapowo, zgodnie z postępem prac budowlanych, a nie
            jednorazowo. W tym przewodniku dowiesz się, jak wziąć kredyt hipoteczny na budowę domu, jakie są
            wymagania, dokumenty i harmonogram wypłat. Sprawdź oferty w naszym kalkulatorze przed rozpoczęciem
            budowy.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź oferty w kalkulatorze
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
                <strong>Potrzebna działka budowlana</strong> - musisz mieć działkę z pozwoleniem na budowę.
              </li>
              <li>
                <strong>Wkład własny minimum 20%</strong> - część może być przeznaczona na działkę, część na
                budowę.
              </li>
              <li>
                <strong>Harmonogram wypłat etapowy</strong> - bank wypłaca środki zgodnie z postępem prac.
              </li>
              <li>
                <strong>Szczegółowa dokumentacja</strong> - potrzebne są pozwolenia, projekt i harmonogram
                budowy.
              </li>
            </IntroList>
          </IntroContent>
        </IntroCard>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineHome size={18} />
              Wymagania
            </SectionBadge>
            <SectionTitle>Jakie są wymagania do kredytu na budowę?</SectionTitle>
            <SectionSubtitle>Do kredytu na budowę potrzebujesz: działki z pozwoleniem, projektu budowlanego, wkładu własnego minimum 20% i zdolności kredytowej. Bank weryfikuje każdy etap budowy.</SectionSubtitle>
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
              <HiOutlineWrenchScrewdriver size={18} />
              Harmonogram
            </SectionBadge>
            <SectionTitle>Jak działa harmonogram wypłat przy budowie?</SectionTitle>
            <SectionSubtitle>Bank wypłaca środki etapowo: po przygotowaniu działki, stanie surowym, wykończeniu i zakończeniu budowy. Każdy etap wymaga weryfikacji przez rzeczoznawcę.</SectionSubtitle>
          </SectionHeader>
          <StagesGrid role="list">
            {stages.map((stage) => {
              const IconComponent = stage.icon
              return (
                <StageCard key={stage.stage} role="listitem">
                  <StageHeader>
                    <StageIcon aria-hidden="true">
                      <IconComponent size={24} />
                    </StageIcon>
                    <StageInfo>
                      <StageTitle>{stage.stage}</StageTitle>
                      <StagePayment>{stage.payment}</StagePayment>
                    </StageInfo>
                  </StageHeader>
                  <StageDescription>{stage.description}</StageDescription>
                </StageCard>
              )
            })}
          </StagesGrid>
          <CtaBox>
            <CtaTitle>Sprawdź zdolność kredytową przed budową</CtaTitle>
            <CtaText>
              Przed rozpoczęciem budowy sprawdź swoją zdolność kredytową w naszym kalkulatorze kredytu
              hipotecznego. Upewnij się, że możesz pozwolić sobie na raty kredytu podczas budowy.
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
              <HiOutlineCheckCircle size={18} />
              Wskazówki
            </SectionBadge>
            <SectionTitle>Praktyczne wskazówki</SectionTitle>
            <SectionSubtitle>
              Oto praktyczne wskazówki, które pomogą Ci przygotować się do kredytu na budowę domu.
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
            <SectionTitle>Najczęściej zadawane pytania o kredyt na budowę</SectionTitle>
            <SectionSubtitle>
              Odpowiedzi na najpopularniejsze pytania dotyczące kredytu hipotecznego na budowę domu.
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
              Kredyt hipoteczny na budowę domu to specjalny rodzaj kredytu, który różni się od standardowego
              kredytu hipotecznego. Bank wypłaca środki etapowo, zgodnie z postępem prac budowlanych, a nie
              jednorazowo. Aby wziąć kredyt na budowę, musisz mieć: działkę budowlaną z pozwoleniem,
              pozwolenie na budowę, wkład własny (minimum 20%), harmonogram budowy i zdolność kredytową.
            </SummaryText>
            <SummaryText>
              Harmonogram wypłat działa etapowo: bank wypłaca środki po zakończeniu każdego etapu budowy
              (przygotowanie działki, stan surowy, wykończenie, zakończenie budowy). Warto przygotować
              szczegółowy harmonogram budowy, sprawdzić zdolność kredytową w kalkulatorze, zabezpieczyć
              dodatkowe środki na nieprzewidziane wydatki i wybrać doświadczonego wykonawcę. Sprawdź oferty w
              naszym kalkulatorze kredytu hipotecznego przed rozpoczęciem budowy. Przeczytaj też nasze
              przewodniki o{' '}
              <Link href="/blog/wklad-wlasny-kredyt-hipoteczny" className="text-white underline hover:text-emerald-50">
                wkładzie własnym na kredyt hipoteczny
              </Link>
              ,{' '}
              <Link href="/blog/dokumenty-do-kredytu-hipotecznego" className="text-white underline hover:text-emerald-50">
                dokumentach do kredytu hipotecznego
              </Link>
              {' '}i{' '}
              <Link href="/blog/jak-dlugo-trwa-proces-kredytowy" className="text-white underline hover:text-emerald-50">
                jak długo trwa proces kredytowy
              </Link>
              .
            </SummaryText>
            <SummaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź oferty w kalkulatorze
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

const StagesGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const StageCard = tw.li`flex h-full flex-col rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-sm backdrop-blur-sm`
const StageHeader = tw.div`mb-4 flex items-start gap-4`
const StageIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const StageInfo = tw.div`flex-1`
const StageTitle = tw.h3`mb-2 text-xl font-semibold text-gray-900`
const StagePayment = tw.span`inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700`
const StageDescription = tw.p`text-sm leading-relaxed text-gray-600`

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

