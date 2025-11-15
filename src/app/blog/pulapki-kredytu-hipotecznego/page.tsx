import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowLongRight,
  HiOutlineCalculator,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlineSparkles,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'
import { getPostRobotsMetadata } from 'utils/blog-posts'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {  robots: getPostRobotsMetadata('pulapki-kredytu-hipotecznego'),

  title: 'Pułapki kredytu hipotecznego - na co uważać?',
  description:
    'Poznaj najczęstsze pułapki kredytu hipotecznego: ukryte koszty, niekorzystne warunki, zmienne oprocentowanie i inne. Dowiedz się, jak ich uniknąć i sprawdź oferty w kalkulatorze.',
  alternates: {
    canonical: `${siteUrl}/blog/pulapki-kredytu-hipotecznego`,
  },
  keywords: [
    'pułapki kredytu hipotecznego',
    'błędy przy kredycie hipotecznym',
    'na co uważać przy kredycie',
    'ukryte koszty kredytu',
    'niekorzystne warunki kredytu',
    'jak uniknąć pułapek kredytowych',
    'ostrożność przy kredycie hipotecznym',
  ],
  openGraph: {
    title: 'Pułapki kredytu hipotecznego - na co uważać?',
    description:
      'Kompletny przewodnik po pułapkach kredytu hipotecznego: najczęstsze błędy, ukryte koszty i jak ich uniknąć.',
    url: `${siteUrl}/blog/pulapki-kredytu-hipotecznego`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/images/blog/pulapki-kredytu-hipotecznego-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Pułapki kredytu hipotecznego',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pułapki kredytu hipotecznego',
    description: 'Poznaj najczęstsze pułapki kredytu hipotecznego i jak ich uniknąć.',
    images: [`${siteUrl}/images/blog/pulapki-kredytu-hipotecznego-og.jpg`],
  },
}

const traps = [
  {
    trap: 'Ukryte koszty i opłaty',
    description:
      'Wiele banków nie ujawnia wszystkich kosztów na początku. Prowizje, opłaty za konto, ubezpieczenia, opłaty za wcześniejszą spłatę i inne koszty mogą znacząco zwiększyć całkowity koszt kredytu.',
    howToAvoid: [
      'Sprawdź wszystkie opłaty w umowie',
      'Porównaj pełne koszty (RRSO), nie tylko oprocentowanie',
      'Sprawdź opłaty za wcześniejszą spłatę',
      'Negocjuj warunki przed podpisaniem',
    ],
    icon: HiOutlineCurrencyDollar,
  },
  {
    trap: 'Zmienne oprocentowanie bez zabezpieczenia',
    description:
      'Kredyt ze zmiennym oprocentowaniem może być tańszy na początku, ale wzrost stóp procentowych może znacząco zwiększyć ratę. Brak zabezpieczenia przed wzrostem stóp może prowadzić do problemów finansowych.',
    howToAvoid: [
      'Rozważ oprocentowanie stałe lub mieszane',
      'Sprawdź możliwość zmiany na stałe oprocentowanie',
      'Przygotuj się na możliwe wzrosty rat',
      'Miej poduszkę finansową',
    ],
    icon: HiOutlineExclamationTriangle,
  },
  {
    trap: 'Zbyt wysoka rata w stosunku do dochodu',
    description:
      'Zaciągnięcie kredytu z ratą zbyt wysoką w stosunku do dochodu może prowadzić do problemów z płynnością finansową. Bank może zaakceptować wyższą ratę, ale może być trudna do spłacenia.',
    howToAvoid: [
      'Sprawdź zdolność kredytową w kalkulatorze',
      'Nie przekraczaj 30-40% dochodu na ratę',
      'Uwzględnij inne wydatki i zobowiązania',
      'Miej poduszkę finansową',
    ],
    icon: HiOutlineCalculator,
  },
  {
    trap: 'Obowiązkowe produkty bankowe',
    description:
      'Niektóre banki wymagają otwarcia konta, wykupienia ubezpieczeń lub innych produktów bankowych jako warunku udzielenia kredytu. To może zwiększyć koszty kredytu.',
    howToAvoid: [
      'Sprawdź wymagania banku przed złożeniem wniosku',
      'Negocjuj warunki dotyczące produktów dodatkowych',
      'Porównaj oferty różnych banków',
      'Sprawdź, czy produkty są rzeczywiście obowiązkowe',
    ],
    icon: HiOutlineCheckCircle,
  },
  {
    trap: 'Nieczytelna umowa',
    description:
      'Umowa kredytowa może być skomplikowana i nieczytelna. Ważne warunki mogą być ukryte w małym druku lub trudnych do zrozumienia zapisach.',
    howToAvoid: [
      'Przeczytaj umowę dokładnie przed podpisaniem',
      'Poproś o wyjaśnienie niejasnych zapisów',
      'Skonsultuj się z prawnikiem, jeśli masz wątpliwości',
      'Nie podpisuj umowy pod presją',
    ],
    icon: HiOutlineDocumentText,
  },
  {
    trap: 'Brak możliwości wcześniejszej spłaty',
    description:
      'Niektóre banki ograniczają możliwość wcześniejszej spłaty kredytu lub pobierają wysokie opłaty za nadpłatę. To może uniemożliwić szybszą spłatę kredytu.',
    howToAvoid: [
      'Sprawdź warunki dotyczące wcześniejszej spłaty',
      'Negocjuj brak opłat za nadpłatę',
      'Sprawdź limity nadpłat',
      'Porównaj oferty różnych banków',
    ],
    icon: HiOutlineExclamationTriangle,
  },
]

const faqData = [
  {
    question: 'Jakie są najczęstsze pułapki kredytu hipotecznego?',
    answer:
      'Najczęstsze pułapki kredytu hipotecznego to: ukryte koszty i opłaty, zmienne oprocentowanie bez zabezpieczenia, zbyt wysoka rata w stosunku do dochodu, obowiązkowe produkty bankowe, nieczytelna umowa i brak możliwości wcześniejszej spłaty. Warto sprawdzić wszystkie warunki przed podpisaniem umowy i porównać oferty w kalkulatorze.',
  },
  {
    question: 'Jak uniknąć pułapek kredytu hipotecznego?',
    answer:
      'Aby uniknąć pułapek kredytu hipotecznego, warto: sprawdzić wszystkie opłaty w umowie, porównać pełne koszty (RRSO), rozważyć oprocentowanie stałe, sprawdzić zdolność kredytową w kalkulatorze, przeczytać umowę dokładnie przed podpisaniem i negocjować warunki. Użyj kalkulatora kredytu hipotecznego, aby porównać oferty i sprawdzić pełne koszty.',
  },
  {
    question: 'Czy warto sprawdzać wszystkie opłaty przed podpisaniem umowy?',
    answer:
      'Tak, warto sprawdzać wszystkie opłaty przed podpisaniem umowy. Ukryte koszty mogą znacząco zwiększyć całkowity koszt kredytu. Sprawdź prowizje, opłaty za konto, ubezpieczenia, opłaty za wcześniejszą spłatę i inne koszty. Porównaj pełne koszty (RRSO), nie tylko oprocentowanie.',
  },
  {
    question: 'Czy zmienne oprocentowanie to pułapka?',
    answer:
      'Zmienne oprocentowanie nie zawsze jest pułapką, ale może być ryzykowne. Wzrost stóp procentowych może znacząco zwiększyć ratę kredytu. Warto rozważyć oprocentowanie stałe lub mieszane, szczególnie jeśli obawiasz się wzrostu stóp. Sprawdź wpływ zmian stóp na ratę w kalkulatorze.',
  },
  {
    question: 'Jak sprawdzić, czy rata nie jest zbyt wysoka?',
    answer:
      'Aby sprawdzić, czy rata nie jest zbyt wysoka, sprawdź zdolność kredytową w kalkulatorze i upewnij się, że rata nie przekracza 30-40% dochodu. Uwzględnij inne wydatki i zobowiązania oraz miej poduszkę finansową. Kalkulator pomoże Ci oszacować odpowiednią wysokość raty.',
  },
  {
    question: 'Czy obowiązkowe produkty bankowe to pułapka?',
    answer:
      'Obowiązkowe produkty bankowe mogą być pułapką, jeśli zwiększają koszty kredytu. Sprawdź wymagania banku przed złożeniem wniosku, negocjuj warunki dotyczące produktów dodatkowych i porównaj oferty różnych banków. Sprawdź, czy produkty są rzeczywiście obowiązkowe.',
  },
  {
    question: 'Co zrobić, jeśli zauważę pułapkę w umowie?',
    answer:
      'Jeśli zauważysz pułapkę w umowie, nie podpisuj jej pod presją. Poproś o wyjaśnienie niejasnych zapisów, skonsultuj się z prawnikiem, jeśli masz wątpliwości, i negocjuj warunki. Jeśli bank nie chce negocjować, rozważ oferty innych banków.',
  },
  {
    question: 'Jak kalkulator pomaga uniknąć pułapek?',
    answer:
      'Kalkulator kredytu hipotecznego pomaga uniknąć pułapek poprzez: porównanie pełnych kosztów (RRSO) różnych ofert, sprawdzenie zdolności kredytowej, oszacowanie wysokości raty i całkowitego kosztu kredytu. Użyj kalkulatora przed podpisaniem umowy, aby porównać oferty i sprawdzić wszystkie koszty.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Pułapki kredytu hipotecznego - na co uważać?',
  description:
    'Kompletny przewodnik po pułapkach kredytu hipotecznego: najczęstsze błędy, ukryte koszty i jak ich uniknąć.',
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
  datePublished: '2026-04-14',
  dateModified: '2026-04-14',
  mainEntityOfPage: `${siteUrl}/blog/pulapki-kredytu-hipotecznego`,
  articleSection: ['Pułapki', 'Kredyt hipoteczny', 'Poradniki'],
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
      name: 'Pułapki kredytu hipotecznego',
      item: `${siteUrl}/blog/pulapki-kredytu-hipotecznego`,
    },
  ],
}

const relatedArticles = [
  {
    slug: 'ukryte-koszty-kredytu-hipotecznego',
    title: 'Ukryte koszty kredytu hipotecznego',
    description: 'Dowiedz się, jakie koszty mogą Cię zaskoczyć przy kredycie.',
  },
  {
    slug: 'oprocentowanie-kredytu-hipotecznego-stale-czy-zmienne',
    title: 'Oprocentowanie kredytu - stałe czy zmienne?',
    description: 'Poznaj różnice między oprocentowaniem stałym a zmiennym.',
  },
  {
    slug: 'jak-wybrac-najlepszy-kredyt-hipoteczny',
    title: 'Jak wybrać najlepszy kredyt hipoteczny?',
    description: 'Kompleksowy przewodnik po wyborze najlepszego kredytu.',
  },
  {
    slug: 'co-zrobic-gdy-nie-mozesz-splacac-kredytu',
    title: 'Co zrobić, gdy nie możesz spłacać kredytu?',
    description: 'Rozwiązania problemów ze spłatą kredytu.',
  }
]

export default function TrapsPage() {
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
              <BreadcrumbCurrent>Pułapki kredytu hipotecznego</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>

        <HeroSection>
          <HeroEyebrow>Pułapki</HeroEyebrow>
          <HeroTitle>Pułapki kredytu hipotecznego - na co uważać?</HeroTitle>
          <HeroLead>
            Kredyt hipoteczny to jedna z najważniejszych decyzji finansowych w życiu, ale może kryć wiele
            pułapek. Ukryte koszty, niekorzystne warunki, zmienne oprocentowanie i inne pułapki mogą
            znacząco zwiększyć koszty kredytu lub prowadzić do problemów finansowych. W tym przewodniku
            poznasz najczęstsze pułapki kredytu hipotecznego i dowiesz się, jak ich uniknąć. Przed podjęciem
            decyzji sprawdź oferty w naszym kalkulatorze.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Porównaj oferty w kalkulatorze
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
                <strong>Sprawdź wszystkie opłaty</strong> - ukryte koszty mogą znacząco zwiększyć koszt
                kredytu.
              </li>
              <li>
                <strong>Porównaj pełne koszty (RRSO)</strong> - nie tylko oprocentowanie, ale wszystkie
                koszty.
              </li>
              <li>
                <strong>Przeczytaj umowę dokładnie</strong> - ważne warunki mogą być ukryte w małym druku.
              </li>
              <li>
                <strong>Nie podpisuj pod presją</strong> - masz prawo do czasu na przemyślenie decyzji.
              </li>
            </IntroList>
          </IntroContent>
        </IntroCard>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineExclamationTriangle size={18} />
              Pułapki
            </SectionBadge>
            <SectionTitle>Najczęstsze pułapki kredytu hipotecznego</SectionTitle>
            <SectionSubtitle>
              Oto najczęstsze pułapki, z którymi możesz spotkać się przy kredycie hipotecznym i jak ich
              uniknąć.
            </SectionSubtitle>
          </SectionHeader>
          <TrapsGrid role="list">
            {traps.map((trap) => {
              const IconComponent = trap.icon
              return (
                <TrapCard key={trap.trap} role="listitem">
                  <TrapHeader>
                    <TrapIcon aria-hidden="true">
                      <IconComponent size={24} />
                    </TrapIcon>
                    <TrapTitle>{trap.trap}</TrapTitle>
                  </TrapHeader>
                  <TrapDescription>{trap.description}</TrapDescription>
                  <TrapAvoidance>
                    <TrapAvoidanceTitle>Jak uniknąć:</TrapAvoidanceTitle>
                    <TrapAvoidanceList>
                      {trap.howToAvoid.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </TrapAvoidanceList>
                  </TrapAvoidance>
                </TrapCard>
              )
            })}
          </TrapsGrid>
          <CtaBox>
            <CtaTitle>Porównaj oferty przed podpisaniem umowy</CtaTitle>
            <CtaText>
              Nasz kalkulator kredytu hipotecznego pozwala porównać pełne koszty (RRSO) różnych ofert i
              sprawdzić wszystkie opłaty. Przed podpisaniem umowy sprawdź oferty w kalkulatorze, aby uniknąć
              pułapek.
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
            <SectionTitle>Najczęściej zadawane pytania o pułapki kredytu</SectionTitle>
            <SectionSubtitle>
              Odpowiedzi na najpopularniejsze pytania dotyczące pułapek kredytu hipotecznego i jak ich uniknąć.
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
              Kredyt hipoteczny może kryć wiele pułapek: ukryte koszty i opłaty, zmienne oprocentowanie bez
              zabezpieczenia, zbyt wysoka rata w stosunku do dochodu, obowiązkowe produkty bankowe,
              nieczytelna umowa i brak możliwości wcześniejszej spłaty. Te pułapki mogą znacząco zwiększyć
              koszty kredytu lub prowadzić do problemów finansowych.
            </SummaryText>
            <SummaryText>
              Aby uniknąć pułapek kredytu hipotecznego, warto: sprawdzić wszystkie opłaty w umowie, porównać
              pełne koszty (RRSO) różnych ofert, rozważyć oprocentowanie stałe, sprawdzić zdolność kredytową
              w kalkulatorze, przeczytać umowę dokładnie przed podpisaniem i negocjować warunki. Nie
              podpisuj umowy pod presją i skonsultuj się z prawnikiem, jeśli masz wątpliwości. Użyj naszego
              kalkulatora kredytu hipotecznego, aby porównać oferty i sprawdzić wszystkie koszty przed
              podjęciem decyzji. Przeczytaj też nasze przewodniki o{' '}
              <Link href="/blog/ukryte-koszty-kredytu-hipotecznego" className="text-white underline hover:text-emerald-50">
                ukrytych kosztach kredytu
              </Link>
              ,{' '}
              <Link
                href="/blog/oprocentowanie-kredytu-hipotecznego-stale-czy-zmienne"
                className="text-white underline hover:text-emerald-50"
              >
                oprocentowaniu stałym i zmiennym
              </Link>
              {' '}i{' '}
              <Link href="/blog/jak-wybrac-najlepszy-kredyt-hipoteczny" className="text-white underline hover:text-emerald-50">
                jak wybrać najlepszy kredyt hipoteczny
              </Link>
              .
            </SummaryText>
            <SummaryCta href="/kalkulator/kredyt-hipoteczny">
              Porównaj oferty w kalkulatorze
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

const TrapsGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const TrapCard = tw.li`flex h-full flex-col rounded-2xl border border-red-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm`
const TrapHeader = tw.div`mb-4 flex items-center gap-4`
const TrapIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-700`
const TrapTitle = tw.h3`flex-1 text-xl font-semibold text-gray-900`
const TrapDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const TrapAvoidance = tw.div`mt-auto rounded-lg bg-emerald-50 p-4`
const TrapAvoidanceTitle = tw.h4`mb-2 text-sm font-semibold text-emerald-900`
const TrapAvoidanceList = tw.ul`grid gap-2 text-sm text-emerald-800 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`

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

