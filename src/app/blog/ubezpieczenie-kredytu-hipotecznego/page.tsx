import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowLongRight,
  HiOutlineCalculator,
  HiOutlineCheckCircle,
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

export const metadata: Metadata = {  robots: getPostRobotsMetadata('ubezpieczenie-kredytu-hipotecznego'),

  title: 'Ubezpieczenie kredytu hipotecznego - czy jest obowiązkowe?',
  description:
    'Dowiedz się, jakie ubezpieczenia są wymagane przy kredycie hipotecznym, ile kosztują i czy można z nich zrezygnować. Sprawdź koszty w kalkulatorze.',
  alternates: {
    canonical: `${siteUrl}/blog/ubezpieczenie-kredytu-hipotecznego`,
  },
  keywords: [
    'ubezpieczenie kredytu hipotecznego',
    'ubezpieczenie na życie kredyt hipoteczny',
    'czy ubezpieczenie kredytu jest obowiązkowe',
    'koszt ubezpieczenia kredytu',
    'ubezpieczenie nieruchomości kredyt hipoteczny',
    'czy można zrezygnować z ubezpieczenia kredytu',
    'ubezpieczenie kredytu hipotecznego koszt',
  ],
  openGraph: {
    title: 'Ubezpieczenie kredytu hipotecznego - czy jest obowiązkowe?',
    description:
      'Kompletny przewodnik po ubezpieczeniach kredytu hipotecznego: typy, koszty, obowiązkowość i możliwość rezygnacji.',
    url: `${siteUrl}/blog/ubezpieczenie-kredytu-hipotecznego`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Ubezpieczenie kredytu hipotecznego',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ubezpieczenie kredytu hipotecznego - przewodnik',
    description: 'Dowiedz się, jakie ubezpieczenia są wymagane przy kredycie hipotecznym i ile kosztują.',
    images: [`${siteUrl}/og-image.jpg`],
  },
}

const insuranceTypes = [
  {
    type: 'Ubezpieczenie nieruchomości',
    description:
      'Ubezpieczenie nieruchomości chroni przed szkodami w nieruchomości, która jest zabezpieczeniem kredytu. To ubezpieczenie jest zazwyczaj obowiązkowe przy kredycie hipotecznym.',
    mandatory: true,
    cost: '0,1-0,3% wartości nieruchomości rocznie',
    details: [
      'Chroni przed pożarem, zalaniem, kradzieżą',
      'Zazwyczaj obowiązkowe przy kredycie hipotecznym',
      'Koszt zależy od wartości nieruchomości',
      'Można wybrać towarzystwo ubezpieczeniowe',
    ],
    icon: HiOutlineHome,
  },
  {
    type: 'Ubezpieczenie na życie',
    description:
      'Ubezpieczenie na życie chroni przed sytuacją, gdy kredytobiorca umrze lub straci zdolność do pracy. To ubezpieczenie może być obowiązkowe lub opcjonalne, w zależności od banku.',
    mandatory: false,
    cost: '0,2-0,5% kwoty kredytu rocznie',
    details: [
      'Chroni przed śmiercią lub utratą zdolności do pracy',
      'Może być obowiązkowe lub opcjonalne',
      'Koszt zależy od wieku i stanu zdrowia',
      'Można negocjować warunki z bankiem',
    ],
    icon: HiOutlineUsers,
  },
  {
    type: 'Ubezpieczenie niskiego wkładu',
    description:
      'Ubezpieczenie niskiego wkładu jest wymagane, gdy wkład własny jest niższy niż 20%. To ubezpieczenie chroni bank przed ryzykiem spadku wartości nieruchomości.',
    mandatory: 'Częściowo',
    cost: '0,3-0,8% kwoty kredytu rocznie',
    details: [
      'Wymagane przy wkładzie własnym poniżej 20%',
      'Chroni bank przed spadkiem wartości nieruchomości',
      'Koszt zależy od wysokości wkładu własnego',
      'Można uniknąć, zwiększając wkład własny do 20%',
    ],
    icon: HiOutlineShieldCheck,
  },
]

const howToReduce = [
  {
    title: 'Zwiększ wkład własny do 20%',
    description:
      'Zwiększenie wkładu własnego do 20% pozwala uniknąć ubezpieczenia niskiego wkładu, które może kosztować nawet kilka tysięcy złotych rocznie.',
    icon: HiOutlineHome,
  },
  {
    title: 'Porównaj oferty ubezpieczeń',
    description:
      'Możesz wybrać towarzystwo ubezpieczeniowe samodzielnie. Porównaj oferty różnych towarzystw i wybierz najtańszą, która spełnia wymagania banku.',
    icon: HiOutlineCalculator,
  },
  {
    title: 'Negocjuj warunki ubezpieczeń',
    description:
      'Warunki ubezpieczeń są często negocjowalne. Negocjuj wysokość składki, zakres ubezpieczenia i możliwość rezygnacji po pierwszym roku.',
    icon: HiOutlineCheckCircle,
  },
  {
    title: 'Sprawdź możliwość rezygnacji',
    description:
      'Niektóre banki pozwalają na rezygnację z ubezpieczeń po pierwszym roku. Sprawdź warunki w umowie i negocjuj możliwość rezygnacji.',
    icon: HiOutlineExclamationTriangle,
  },
]

const faqData = [
  {
    question: 'Czy ubezpieczenie kredytu hipotecznego jest obowiązkowe?',
    answer:
      'Ubezpieczenie nieruchomości jest zazwyczaj obowiązkowe przy kredycie hipotecznym. Ubezpieczenie na życie może być obowiązkowe lub opcjonalne, w zależności od banku i warunków kredytu. Ubezpieczenie niskiego wkładu jest wymagane, gdy wkład własny jest niższy niż 20%.',
  },
  {
    question: 'Ile kosztuje ubezpieczenie kredytu hipotecznego?',
    answer:
      'Koszt ubezpieczenia kredytu hipotecznego zależy od typu ubezpieczenia i wartości nieruchomości. Ubezpieczenie nieruchomości kosztuje zazwyczaj 0,1-0,3% wartości nieruchomości rocznie, ubezpieczenie na życie 0,2-0,5% kwoty kredytu rocznie, a ubezpieczenie niskiego wkładu 0,3-0,8% kwoty kredytu rocznie. Użyj kalkulatora kredytu hipotecznego, aby sprawdzić dokładne koszty.',
  },
  {
    question: 'Czy mogę zrezygnować z ubezpieczenia kredytu?',
    answer:
      'To zależy od warunków umowy kredytowej. Niektóre banki pozwalają na rezygnację z ubezpieczeń po pierwszym roku, inne wymagają ubezpieczeń przez cały okres kredytowania. Ubezpieczenie nieruchomości jest zazwyczaj obowiązkowe, ale możesz wybrać towarzystwo ubezpieczeniowe. Warto sprawdzić warunki w umowie i negocjować możliwość rezygnacji przed podpisaniem.',
  },
  {
    question: 'Czy muszę ubezpieczać się w banku?',
    answer:
      'Nie, nie musisz ubezpieczać się w banku. Możesz wybrać towarzystwo ubezpieczeniowe samodzielnie, o ile spełnia ono wymagania banku. Warto porównać oferty różnych towarzystw i wybrać najtańszą, która spełnia wymagania.',
  },
  {
    question: 'Jakie ubezpieczenia są wymagane przy kredycie hipotecznym?',
    answer:
      'Przy kredycie hipotecznym zazwyczaj wymagane jest ubezpieczenie nieruchomości, które chroni przed szkodami w nieruchomości będącej zabezpieczeniem kredytu. Ubezpieczenie na życie może być obowiązkowe lub opcjonalne, w zależności od banku. Ubezpieczenie niskiego wkładu jest wymagane, gdy wkład własny jest niższy niż 20%.',
  },
  {
    question: 'Czy ubezpieczenie niskiego wkładu jest zawsze wymagane?',
    answer:
      'Nie, ubezpieczenie niskiego wkładu jest wymagane tylko wtedy, gdy wkład własny jest niższy niż 20%. Jeśli zwiększysz wkład własny do 20% lub więcej, możesz uniknąć tego ubezpieczenia, co może zaoszczędzić nawet kilka tysięcy złotych rocznie.',
  },
  {
    question: 'Jak ubezpieczenia wpływają na całkowity koszt kredytu?',
    answer:
      'Ubezpieczenia mogą znacząco zwiększyć całkowity koszt kredytu. Przy kredycie 500 000 zł, ubezpieczenia mogą kosztować nawet 5000-10000 zł rocznie, co w skali całego okresu kredytowania (25 lat) daje 125 000-250 000 zł dodatkowego kosztu. Warto sprawdzić koszty ubezpieczeń w kalkulatorze kredytu hipotecznego.',
  },
  {
    question: 'Czy mogę zmienić ubezpieczenie w trakcie trwania kredytu?',
    answer:
      'Tak, możesz zmienić ubezpieczenie w trakcie trwania kredytu, o ile nowe ubezpieczenie spełnia wymagania banku. Warto sprawdzić warunki w umowie i skontaktować się z bankiem przed zmianą ubezpieczenia. Zmiana ubezpieczenia może wymagać aneksu do umowy.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Ubezpieczenie kredytu hipotecznego - czy jest obowiązkowe?',
  description:
    'Kompletny przewodnik po ubezpieczeniach kredytu hipotecznego: typy, koszty, obowiązkowość i możliwość rezygnacji.',
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
  datePublished: '2026-01-14',
  dateModified: '2026-01-14',
  mainEntityOfPage: `${siteUrl}/blog/ubezpieczenie-kredytu-hipotecznego`,
  articleSection: ['Ubezpieczenia', 'Kredyt hipoteczny', 'Koszty'],
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
      name: 'Ubezpieczenie kredytu hipotecznego',
      item: `${siteUrl}/blog/ubezpieczenie-kredytu-hipotecznego`,
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
    slug: 'prowizja-kredyt-hipoteczny',
    title: 'Prowizja za udzielenie kredytu hipotecznego',
    description: 'Dowiedz się, ile wynosi prowizja i jak ją zmniejszyć.',
  },
  {
    slug: 'rrso-kredyt-hipoteczny',
    title: 'RRSO kredytu hipotecznego - co to jest?',
    description: 'Poznaj RRSO i dowiedz się, jak porównać pełne koszty kredytu.',
  },
  {
    slug: 'wklad-wlasny-kredyt-hipoteczny',
    title: 'Wkład własny na kredyt hipoteczny 2025',
    description: 'Dowiedz się, ile wynosi minimalny wkład własny i jak go obliczyć.',
  }
]

export default function InsurancePage() {
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
              <BreadcrumbCurrent>Ubezpieczenie kredytu hipotecznego</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>

        <HeroSection>
          <HeroEyebrow>Koszty i opłaty</HeroEyebrow>
          <HeroTitle>Ubezpieczenie kredytu hipotecznego - czy jest obowiązkowe?</HeroTitle>
          <HeroLead>
            Ubezpieczenia to jeden z największych ukrytych kosztów kredytu hipotecznego. Ubezpieczenie
            nieruchomości jest zazwyczaj obowiązkowe, ubezpieczenie na życie może być obowiązkowe lub
            opcjonalne, a ubezpieczenie niskiego wkładu jest wymagane przy wkładzie własnym poniżej 20%. W
            tym przewodniku dowiesz się, jakie ubezpieczenia są wymagane, ile kosztują i czy można z nich
            zrezygnować. Sprawdź, jak ubezpieczenia wpływają na całkowity koszt kredytu w naszym kalkulatorze.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź koszty ubezpieczeń w kalkulatorze
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
                <strong>Ubezpieczenie nieruchomości jest zazwyczaj obowiązkowe</strong> - chroni przed
                szkodami w nieruchomości będącej zabezpieczeniem kredytu.
              </li>
              <li>
                <strong>Ubezpieczenie na życie może być obowiązkowe lub opcjonalne</strong> - zależy od banku
                i warunków kredytu.
              </li>
              <li>
                <strong>Ubezpieczenie niskiego wkładu jest wymagane przy wkładzie poniżej 20%</strong> - można
                uniknąć, zwiększając wkład własny.
              </li>
              <li>
                <strong>Możesz wybrać towarzystwo ubezpieczeniowe</strong> - nie musisz ubezpieczać się w
                banku.
              </li>
            </IntroList>
          </IntroContent>
        </IntroCard>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineShieldCheck size={18} />
              Typy ubezpieczeń
            </SectionBadge>
            <SectionTitle>Jakie ubezpieczenia są wymagane przy kredycie hipotecznym?</SectionTitle>
            <SectionSubtitle>
              Poznaj różne typy ubezpieczeń związanych z kredytem hipotecznym i ich obowiązkowość.
            </SectionSubtitle>
          </SectionHeader>
          <InsuranceGrid role="list">
            {insuranceTypes.map((insurance) => {
              const IconComponent = insurance.icon
              return (
                <InsuranceCard key={insurance.type} role="listitem">
                  <InsuranceHeader>
                    <InsuranceIcon aria-hidden="true">
                      <IconComponent size={24} />
                    </InsuranceIcon>
                    <InsuranceTitle>{insurance.type}</InsuranceTitle>
                    <InsuranceBadge mandatory={insurance.mandatory}>
                      {insurance.mandatory === true
                        ? 'Obowiązkowe'
                        : insurance.mandatory === false
                          ? 'Opcjonalne'
                          : 'Częściowo'}
                    </InsuranceBadge>
                  </InsuranceHeader>
                  <InsuranceDescription>{insurance.description}</InsuranceDescription>
                  <InsuranceCost>
                    <strong>Szacowany koszt:</strong> {insurance.cost}
                  </InsuranceCost>
                  <InsuranceDetails>
                    {insurance.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </InsuranceDetails>
                </InsuranceCard>
              )
            })}
          </InsuranceGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineCheckCircle size={18} />
              Redukcja kosztów
            </SectionBadge>
            <SectionTitle>Jak zmniejszyć koszty ubezpieczeń?</SectionTitle>
            <SectionSubtitle>
              Oto praktyczne sposoby na zmniejszenie kosztów ubezpieczeń kredytu hipotecznego.
            </SectionSubtitle>
          </SectionHeader>
          <ReduceGrid role="list">
            {howToReduce.map((tip) => {
              const IconComponent = tip.icon
              return (
                <ReduceCard key={tip.title} role="listitem">
                  <ReduceIcon aria-hidden="true">
                    <IconComponent size={24} />
                  </ReduceIcon>
                  <ReduceTitle>{tip.title}</ReduceTitle>
                  <ReduceDescription>{tip.description}</ReduceDescription>
                </ReduceCard>
              )
            })}
          </ReduceGrid>
          <CtaBox>
            <CtaTitle>Sprawdź koszty ubezpieczeń w kalkulatorze</CtaTitle>
            <CtaText>
              Nasz kalkulator kredytu hipotecznego automatycznie uwzględnia koszty ubezpieczeń w całkowitym
              koszcie kredytu. Zobacz, jak ubezpieczenia wpływają na ratę i całkowity koszt kredytu.
            </CtaText>
            <CtaButton href="/kalkulator/kredyt-hipoteczny">
              Sprawdź koszty w kalkulatorze
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
            <SectionTitle>Najczęściej zadawane pytania o ubezpieczenia</SectionTitle>
            <SectionSubtitle>
              Odpowiedzi na najpopularniejsze pytania dotyczące ubezpieczeń kredytu hipotecznego.
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
              Ubezpieczenia to jeden z największych ukrytych kosztów kredytu hipotecznego. Ubezpieczenie
              nieruchomości jest zazwyczaj obowiązkowe, ubezpieczenie na życie może być obowiązkowe lub
              opcjonalne, a ubezpieczenie niskiego wkładu jest wymagane przy wkładzie własnym poniżej 20%.
              Koszty ubezpieczeń mogą wynieść nawet kilka tysięcy złotych rocznie i znacząco zwiększyć
              całkowity koszt kredytu.
            </SummaryText>
            <SummaryText>
              Aby zmniejszyć koszty ubezpieczeń, warto: zwiększyć wkład własny do 20%, porównać oferty
              ubezpieczeń, negocjować warunki z bankiem i sprawdzić możliwość rezygnacji po pierwszym roku.
              Sprawdź, jak ubezpieczenia wpływają na całkowity koszt kredytu w naszym kalkulatorze kredytu
              hipotecznego. Przeczytaj też nasze przewodniki o{' '}
              <Link href="/blog/wklad-wlasny-kredyt-hipoteczny" className="text-white underline hover:text-emerald-50">
                wkładzie własnym na kredyt hipoteczny
              </Link>
              ,{' '}
              <Link
                href="/blog/ukryte-koszty-kredytu-hipotecznego"
                className="text-white underline hover:text-emerald-50"
              >
                ukrytych kosztach kredytu
              </Link>
              {' '}i{' '}
              <Link href="/blog/rrso-kredyt-hipoteczny" className="text-white underline hover:text-emerald-50">
                RRSO kredytu hipotecznego
              </Link>
              .
            </SummaryText>
            <SummaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź koszty ubezpieczeń w kalkulatorze
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

const InsuranceGrid = tw.ul`grid grid-cols-1 gap-6 lg:grid-cols-3`
const InsuranceCard = tw.li`flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1 hover:shadow-lg`
const InsuranceHeader = tw.div`mb-4 flex items-start justify-between gap-4`
const InsuranceIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const InsuranceTitle = tw.h3`flex-1 text-xl font-semibold text-gray-900`
const InsuranceBadge = tw.span<{ mandatory: boolean | string }>`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
  ({ mandatory }) =>
    mandatory === true
      ? 'bg-red-100 text-red-700'
      : mandatory === false
        ? 'bg-green-100 text-green-700'
        : 'bg-amber-100 text-amber-700'
}`
const InsuranceDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const InsuranceCost = tw.p`mb-4 rounded-lg bg-emerald-50 p-3 text-sm font-semibold text-emerald-800`
const InsuranceDetails = tw.ul`mt-auto grid gap-2 text-sm text-gray-600 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`

const ReduceGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const ReduceCard = tw.li`flex h-full flex-col rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1 hover:shadow-lg`
const ReduceIcon = tw.span`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const ReduceTitle = tw.h3`mb-2 text-xl font-semibold text-gray-900`
const ReduceDescription = tw.p`text-sm leading-relaxed text-gray-600`

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

