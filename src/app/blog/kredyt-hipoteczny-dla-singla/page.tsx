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
  HiOutlineUser,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'
import { getPostRobotsMetadata } from 'utils/blog-posts'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {  robots: getPostRobotsMetadata('kredyt-hipoteczny-dla-singla'),

  title: 'Kredyt hipoteczny dla singla - poradnik 2026',
  description:
    'Dowiedz się, jak wziąć kredyt hipoteczny jako singiel: wymagania, zdolność kredytowa, wkład własny i wskazówki. Sprawdź swoją zdolność kredytową w kalkulatorze.',
  alternates: {
    canonical: `${siteUrl}/blog/kredyt-hipoteczny-dla-singla`,
  },
  keywords: [
    'kredyt hipoteczny dla singla',
    'kredyt hipoteczny samotna osoba',
    'kredyt dla singla',
    'zdolność kredytowa singiel',
    'wkład własny singiel',
    'kredyt hipoteczny jedna osoba',
    'jak wziąć kredyt jako singiel',
  ],
  openGraph: {
    title: 'Kredyt hipoteczny dla singla - poradnik 2026',
    description:
      'Kompletny przewodnik po kredycie hipotecznym dla singli: wymagania, zdolność kredytowa i praktyczne wskazówki.',
    url: `${siteUrl}/blog/kredyt-hipoteczny-dla-singla`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Kredyt hipoteczny dla singla',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kredyt hipoteczny dla singla - poradnik',
    description: 'Dowiedz się, jak wziąć kredyt hipoteczny jako singiel.',
    images: [`${siteUrl}/og-image.jpg`],
  },
}

const challenges = [
  {
    challenge: 'Niższa zdolność kredytowa',
    description:
      'Jako singiel masz zazwyczaj niższą zdolność kredytową niż para, ponieważ bank bierze pod uwagę tylko Twój dochód. To może ograniczyć kwotę kredytu.',
    solutions: [
      'Zwiększ dochód (np. dodatkowa praca, podwyżka)',
      'Zwiększ wkład własny',
      'Wybierz dłuższy okres kredytowania',
      'Sprawdź programy wsparcia dla singli',
    ],
    icon: HiOutlineCalculator,
  },
  {
    challenge: 'Wyższy wkład własny',
    description:
      'Niektóre banki mogą wymagać wyższego wkładu własnego od singli lub oferować mniej korzystne warunki. Warto porównać oferty różnych banków.',
    solutions: [
      'Oszczędzaj systematycznie na wkład własny',
      'Sprawdź programy wsparcia (np. mdM)',
      'Porównaj oferty różnych banków',
      'Negocjuj warunki z bankiem',
    ],
    icon: HiOutlineHome,
  },
  {
    challenge: 'Wyższe ryzyko dla banku',
    description:
      'Bank może postrzegać singli jako wyższe ryzyko, ponieważ w przypadku problemów finansowych nie ma drugiej osoby do wsparcia spłaty.',
    solutions: [
      'Zbuduj dobrą historię kredytową',
      'Miej poduszkę finansową',
      'Wybierz stabilne źródło dochodu',
      'Rozważ ubezpieczenie na życie',
    ],
    icon: HiOutlineCheckCircle,
  },
]

const tips = [
  {
    title: 'Zwiększ swoją zdolność kredytową',
    description:
      'Zwiększ swoją zdolność kredytową poprzez: zwiększenie dochodu, zmniejszenie zobowiązań, poprawę historii kredytowej i zwiększenie wkładu własnego.',
    icon: HiOutlineCalculator,
  },
  {
    title: 'Sprawdź programy wsparcia',
    description:
      'Sprawdź programy wsparcia dla singli: program mdM (jeśli spełniasz warunki wiekowe), lokalne programy mieszkaniowe i inne programy wsparcia.',
    icon: HiOutlineCheckCircle,
  },
  {
    title: 'Porównaj oferty banków',
    description:
      'Porównaj oferty różnych banków w kalkulatorze kredytu hipotecznego. Niektóre banki mogą oferować lepsze warunki dla singli niż inne.',
    icon: HiOutlineHome,
  },
  {
    title: 'Przygotuj się do procesu',
    description:
      'Przygotuj się do procesu kredytowego: sprawdź zdolność kredytową, przygotuj dokumenty, porównaj oferty i negocjuj warunki przed podpisaniem umowy.',
    icon: HiOutlineDocumentText,
  },
]

const faqData = [
  {
    question: 'Czy singiel może wziąć kredyt hipoteczny?',
    answer:
      'Tak, singiel może wziąć kredyt hipoteczny. Bank ocenia zdolność kredytową na podstawie dochodu kredytobiorcy, niezależnie od stanu cywilnego. Jako singiel masz zazwyczaj niższą zdolność kredytową niż para, ponieważ bank bierze pod uwagę tylko Twój dochód, ale to nie oznacza, że nie możesz wziąć kredytu.',
  },
  {
    question: 'Jak obliczyć zdolność kredytową jako singiel?',
    answer:
      'Zdolność kredytowa singla jest obliczana tak samo jak dla innych kredytobiorców: bank bierze pod uwagę dochód, zobowiązania, historię kredytową i inne czynniki. Jako singiel masz zazwyczaj niższą zdolność kredytową niż para, ponieważ bank bierze pod uwagę tylko Twój dochód. Użyj kalkulatora kredytu hipotecznego, aby oszacować swoją zdolność.',
  },
  {
    question: 'Ile wynosi wkład własny dla singla?',
    answer:
      'Wkład własny dla singla wynosi zazwyczaj tyle samo co dla innych kredytobiorców: minimum 10% w programie mdM lub standardowo 20%. Niektóre banki mogą wymagać wyższego wkładu własnego od singli, ale to zależy od banku i warunków kredytu. Warto porównać oferty różnych banków.',
  },
  {
    question: 'Czy singiel może skorzystać z programu mdM?',
    answer:
      'Tak, singiel może skorzystać z programu mdM, jeśli spełnia warunki programu: wiek do 45 lat, pierwsze mieszkanie i spełnienie warunków dochodowych. Program mdM pozwala na kredyt z wkładem własnym zaledwie 10%, co może być korzystne dla singli.',
  },
  {
    question: 'Jak zwiększyć zdolność kredytową jako singiel?',
    answer:
      'Aby zwiększyć zdolność kredytową jako singiel, możesz: zwiększyć dochód (np. dodatkowa praca, podwyżka), zmniejszyć zobowiązania, poprawić historię kredytową, zwiększyć wkład własny, wybrać dłuższy okres kredytowania i sprawdzić programy wsparcia. Użyj kalkulatora kredytu hipotecznego, aby zobaczyć, jak różne czynniki wpływają na zdolność kredytową.',
  },
  {
    question: 'Czy singiel ma gorsze warunki kredytu?',
    answer:
      'Nie zawsze. Warunki kredytu zależą głównie od zdolności kredytowej, historii kredytowej i innych czynników, a nie od stanu cywilnego. Jako singiel masz zazwyczaj niższą zdolność kredytową niż para, co może wpłynąć na warunki, ale nie oznacza to automatycznie gorszych warunków. Warto porównać oferty różnych banków.',
  },
  {
    question: 'Jakie dokumenty są potrzebne dla singla?',
    answer:
      'Dokumenty potrzebne dla singla są takie same jak dla innych kredytobiorców: dokumenty tożsamości, dokumenty potwierdzające dochód, dokumenty dotyczące nieruchomości i dokumenty dodatkowe. Niektóre banki mogą wymagać dodatkowych dokumentów, ale to zależy od banku i warunków kredytu.',
  },
  {
    question: 'Czy warto wziąć kredyt jako singiel?',
    answer:
      'To zależy od Twojej sytuacji finansowej i planów. Kredyt hipoteczny jako singiel może być dobrym rozwiązaniem, jeśli: masz stabilne źródło dochodu, możesz pozwolić sobie na ratę, masz wystarczający wkład własny i planujesz mieszkać w nieruchomości przez dłuższy czas. Warto sprawdzić swoją zdolność kredytową w kalkulatorze przed podjęciem decyzji.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Kredyt hipoteczny dla singla - poradnik 2026',
  description:
    'Kompletny przewodnik po kredycie hipotecznym dla singli: wymagania, zdolność kredytowa i praktyczne wskazówki.',
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
  datePublished: '2026-03-17',
  dateModified: '2026-03-17',
  mainEntityOfPage: `${siteUrl}/blog/kredyt-hipoteczny-dla-singla`,
  articleSection: ['Dla singli', 'Kredyt hipoteczny', 'Poradniki'],
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
      name: 'Kredyt hipoteczny dla singla',
      item: `${siteUrl}/blog/kredyt-hipoteczny-dla-singla`,
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
    slug: 'wklad-wlasny-kredyt-hipoteczny',
    title: 'Wkład własny na kredyt hipoteczny 2026',
    description: 'Dowiedz się, ile wynosi minimalny wkład własny i jak go obliczyć.',
  },
  {
    slug: 'kredyt-hipoteczny-dla-mlodych-programy-wsparcia',
    title: 'Kredyt hipoteczny dla młodych - programy wsparcia',
    description: 'Poznaj programy wsparcia dla młodych kredytobiorców.',
  },
  {
    slug: 'kredyt-hipoteczny-dla-przedsiebiorcy',
    title: 'Kredyt hipoteczny dla przedsiębiorcy',
    description: 'Wymagania i warunki kredytu dla przedsiębiorców.',
  }
]

export default function SinglePersonPage() {
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
              <BreadcrumbCurrent>Kredyt hipoteczny dla singla</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>

        <HeroSection>
          <HeroEyebrow>Dla singli</HeroEyebrow>
          <HeroTitle>Kredyt hipoteczny dla singla - poradnik 2026</HeroTitle>
          <HeroLead>
            Wzięcie kredytu hipotecznego jako singiel może wydawać się trudniejsze niż dla par, ale jest
            możliwe. Jako singiel masz zazwyczaj niższą zdolność kredytową niż para, ponieważ bank bierze
            pod uwagę tylko Twój dochód, ale to nie oznacza, że nie możesz wziąć kredytu. W tym przewodniku
            dowiesz się, jak wziąć kredyt hipoteczny jako singiel, jakie są wymagania i jak zwiększyć swoją
            zdolność kredytową. Sprawdź swoją zdolność kredytową w naszym kalkulatorze.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź zdolność kredytową jako singiel
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
                <strong>Singiel może wziąć kredyt hipoteczny</strong> - bank ocenia zdolność kredytową na
                podstawie dochodu, niezależnie od stanu cywilnego.
              </li>
              <li>
                <strong>Niższa zdolność kredytowa</strong> - jako singiel masz zazwyczaj niższą zdolność niż
                para, ponieważ bank bierze pod uwagę tylko Twój dochód.
              </li>
              <li>
                <strong>Możesz zwiększyć zdolność</strong> - poprzez zwiększenie dochodu, zmniejszenie
                zobowiązań i zwiększenie wkładu własnego.
              </li>
              <li>
                <strong>Sprawdź programy wsparcia</strong> - program mdM i inne programy mogą pomóc w
                uzyskaniu kredytu.
              </li>
            </IntroList>
          </IntroContent>
        </IntroCard>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineUser size={18} />
              Wyzwania
            </SectionBadge>
            <SectionTitle>Jakie są wyzwania dla singli przy kredycie hipotecznym?</SectionTitle>
            <SectionSubtitle>
              Oto główne wyzwania, z którymi mogą spotkać się single przy kredycie hipotecznym i jak je
              pokonać.
            </SectionSubtitle>
          </SectionHeader>
          <ChallengesGrid role="list">
            {challenges.map((challenge) => {
              const IconComponent = challenge.icon
              return (
                <ChallengeCard key={challenge.challenge} role="listitem">
                  <ChallengeHeader>
                    <ChallengeIcon aria-hidden="true">
                      <IconComponent size={24} />
                    </ChallengeIcon>
                    <ChallengeTitle>{challenge.challenge}</ChallengeTitle>
                  </ChallengeHeader>
                  <ChallengeDescription>{challenge.description}</ChallengeDescription>
                  <ChallengeSolutions>
                    <ChallengeSolutionsTitle>Rozwiązania:</ChallengeSolutionsTitle>
                    <ChallengeSolutionsList>
                      {challenge.solutions.map((solution) => (
                        <li key={solution}>{solution}</li>
                      ))}
                    </ChallengeSolutionsList>
                  </ChallengeSolutions>
                </ChallengeCard>
              )
            })}
          </ChallengesGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineCheckCircle size={18} />
              Wskazówki
            </SectionBadge>
            <SectionTitle>Praktyczne wskazówki dla singli</SectionTitle>
            <SectionSubtitle>
              Oto praktyczne wskazówki, które pomogą Ci zwiększyć szanse na uzyskanie kredytu hipotecznego jako
              singiel.
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
            <CtaTitle>Sprawdź swoją zdolność kredytową jako singiel</CtaTitle>
            <CtaText>
              Nasz kalkulator kredytu hipotecznego pozwala sprawdzić zdolność kredytową jako singiel.
              Wprowadź swoje parametry i zobacz, na jaką kwotę możesz liczyć i jakie warunki są dla Ciebie
              dostępne.
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
            <SectionTitle>Najczęściej zadawane pytania o kredyt dla singli</SectionTitle>
            <SectionSubtitle>
              Odpowiedzi na najpopularniejsze pytania dotyczące kredytu hipotecznego dla singli.
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
              Wzięcie kredytu hipotecznego jako singiel jest możliwe, choć może być trudniejsze niż dla par.
              Jako singiel masz zazwyczaj niższą zdolność kredytową niż para, ponieważ bank bierze pod uwagę
              tylko Twój dochód, ale to nie oznacza, że nie możesz wziąć kredytu. Główne wyzwania to:
              niższa zdolność kredytowa, wyższy wkład własny i wyższe ryzyko dla banku.
            </SummaryText>
            <SummaryText>
              Aby zwiększyć szanse na uzyskanie kredytu jako singiel, warto: zwiększyć swoją zdolność
              kredytową (zwiększenie dochodu, zmniejszenie zobowiązań), sprawdzić programy wsparcia (np. mdM),
              porównać oferty różnych banków i przygotować się do procesu kredytowego. Sprawdź swoją zdolność
              kredytową jako singiel w naszym kalkulatorze kredytu hipotecznego. Przeczytaj też nasze
              przewodniki o{' '}
              <Link href="/blog/jak-obliczyc-zdolnosc-kredytowa" className="text-white underline hover:text-emerald-50">
                jak obliczyć zdolność kredytową
              </Link>
              ,{' '}
              <Link href="/blog/wklad-wlasny-kredyt-hipoteczny" className="text-white underline hover:text-emerald-50">
                wkładzie własnym na kredyt hipoteczny
              </Link>
              {' '}i{' '}
              <Link
                href="/blog/kredyt-hipoteczny-dla-mlodych-programy-wsparcia"
                className="text-white underline hover:text-emerald-50"
              >
                kredycie hipotecznym dla młodych - programy wsparcia
              </Link>
              .
            </SummaryText>
            <SummaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź zdolność kredytową jako singiel
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

const ChallengesGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-3`
const ChallengeCard = tw.li`flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm`
const ChallengeHeader = tw.div`mb-4 flex items-center gap-4`
const ChallengeIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const ChallengeTitle = tw.h3`flex-1 text-xl font-semibold text-gray-900`
const ChallengeDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const ChallengeSolutions = tw.div`mt-auto rounded-lg bg-gray-50 p-4`
const ChallengeSolutionsTitle = tw.h4`mb-2 text-sm font-semibold text-gray-900`
const ChallengeSolutionsList = tw.ul`grid gap-2 text-sm text-gray-600 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`

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

