import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowLongRight,
  HiOutlineCalculator,
  HiOutlineCheckCircle,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlineHandRaised,
  HiOutlineSparkles,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'
import { getPostRobotsMetadata } from 'utils/blog-posts'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://kalkulatorkredytow.pl'

export const metadata: Metadata = {  robots: getPostRobotsMetadata('co-zrobic-gdy-nie-mozesz-splacac-kredytu'),

  title: 'Co zrobić, gdy nie możesz spłacać kredytu hipotecznego?',
  description:
    'Dowiedz się, co zrobić, gdy nie możesz spłacać kredytu hipotecznego: odroczenie rat, restrukturyzacja, pomoc prawna i inne rozwiązania. Sprawdź swoje opcje w kalkulatorze.',
  alternates: {
    canonical: `${siteUrl}/blog/co-zrobic-gdy-nie-mozesz-splacac-kredytu`,
  },
  keywords: [
    'nie mogę spłacać kredytu',
    'problemy ze spłatą kredytu',
    'odroczenie raty kredytu',
    'restrukturyzacja kredytu',
    'pomoc przy kredycie hipotecznym',
    'co zrobić gdy nie stać na ratę',
    'niewypłacalność kredyt',
  ],
  openGraph: {
    title: 'Co zrobić, gdy nie możesz spłacać kredytu hipotecznego?',
    description:
      'Kompletny przewodnik po rozwiązaniach problemów ze spłatą kredytu hipotecznego: odroczenie rat, restrukturyzacja i pomoc prawna.',
    url: `${siteUrl}/blog/co-zrobic-gdy-nie-mozesz-splacac-kredytu`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/images/blog/co-zrobic-gdy-nie-mozesz-splacac-kredytu-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Co zrobić, gdy nie możesz spłacać kredytu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Co zrobić, gdy nie możesz spłacać kredytu?',
    description: 'Dowiedz się, co zrobić, gdy nie możesz spłacać kredytu hipotecznego.',
    images: [`${siteUrl}/images/blog/co-zrobic-gdy-nie-mozesz-splacac-kredytu-og.jpg`],
  },
}

const solutions = [
  {
    solution: 'Kontakt z bankiem',
    description:
      'Pierwszym krokiem powinien być kontakt z bankiem. Poinformuj bank o problemach ze spłatą i poproś o pomoc. Wiele banków jest skłonnych do negocjacji i oferuje rozwiązania.',
    steps: [
      'Skontaktuj się z bankiem jak najszybciej',
      'Wyjaśnij sytuację finansową',
      'Poproś o możliwe rozwiązania',
      'Przedstaw dokumenty potwierdzające trudną sytuację',
    ],
    icon: HiOutlineHandRaised,
  },
  {
    solution: 'Odroczenie rat',
    description:
      'Bank może zgodzić się na odroczenie rat na określony okres (np. 3-6 miesięcy). W tym czasie nie musisz spłacać rat, ale odsetki nadal się naliczają.',
    steps: [
      'Złóż wniosek o odroczenie rat',
      'Przedstaw dokumenty potwierdzające trudną sytuację',
      'Negocjuj warunki odroczenia',
      'Sprawdź, czy odsetki będą naliczane',
    ],
    icon: HiOutlineCheckCircle,
  },
  {
    solution: 'Restrukturyzacja kredytu',
    description:
      'Restrukturyzacja kredytu to zmiana warunków spłaty: wydłużenie okresu kredytowania, zmniejszenie raty lub zmiana harmonogramu spłat. To może pomóc w poprawie płynności finansowej.',
    steps: [
      'Złóż wniosek o restrukturyzację',
      'Przedstaw propozycję zmian warunków',
      'Negocjuj z bankiem',
      'Sprawdź koszty restrukturyzacji',
    ],
    icon: HiOutlineDocumentText,
  },
  {
    solution: 'Refinansowanie',
    description:
      'Refinansowanie kredytu w innym banku może pozwolić na uzyskanie lepszych warunków: niższe oprocentowanie, dłuższy okres kredytowania lub niższa rata.',
    steps: [
      'Sprawdź oferty innych banków',
      'Porównaj warunki refinansowania',
      'Sprawdź koszty refinansowania',
      'Złóż wniosek o refinansowanie',
    ],
    icon: HiOutlineCalculator,
  },
]

const consequences = [
  {
    consequence: 'Kary i odsetki',
    description:
      'Niespłacanie rat na czas prowadzi do naliczania kar i odsetek za opóźnienie, co zwiększa całkowity koszt kredytu.',
    impact: 'Wysoki',
    icon: HiOutlineExclamationTriangle,
  },
  {
    consequence: 'Pogorszenie historii kredytowej',
    description:
      'Opóźnienia w spłacie są odnotowywane w BIK i mogą pogorszyć historię kredytową, co utrudni uzyskanie kredytów w przyszłości.',
    impact: 'Wysoki',
    icon: HiOutlineExclamationTriangle,
  },
  {
    consequence: 'Postępowanie windykacyjne',
    description:
      'Długotrwałe niespłacanie kredytu może prowadzić do postępowania windykacyjnego, a w skrajnych przypadkach do egzekucji komorniczej.',
    impact: 'Bardzo wysoki',
    icon: HiOutlineExclamationTriangle,
  },
  {
    consequence: 'Utrata nieruchomości',
    description:
      'W skrajnych przypadkach bank może wystąpić o przejęcie nieruchomości, jeśli kredyt nie jest spłacany przez dłuższy czas.',
    impact: 'Bardzo wysoki',
    icon: HiOutlineExclamationTriangle,
  },
]

const faqData = [
  {
    question: 'Co zrobić, gdy nie mogę spłacać kredytu hipotecznego?',
    answer:
      'Gdy nie możesz spłacać kredytu hipotecznego, najważniejsze to: skontaktować się z bankiem jak najszybciej, wyjaśnić sytuację finansową, poprosić o możliwe rozwiązania (odroczenie rat, restrukturyzacja) i rozważyć refinansowanie. Nie ignoruj problemu - im szybciej zareagujesz, tym więcej opcji masz.',
  },
  {
    question: 'Czy bank może odroczyć raty kredytu?',
    answer:
      'Tak, bank może odroczyć raty kredytu na określony okres (np. 3-6 miesięcy), jeśli przedstawisz dokumenty potwierdzające trudną sytuację finansową. W tym czasie nie musisz spłacać rat, ale odsetki nadal się naliczają. Skontaktuj się z bankiem i złóż wniosek o odroczenie.',
  },
  {
    question: 'Co to jest restrukturyzacja kredytu?',
    answer:
      'Restrukturyzacja kredytu to zmiana warunków spłaty: wydłużenie okresu kredytowania, zmniejszenie raty lub zmiana harmonogramu spłat. To może pomóc w poprawie płynności finansowej. Złóż wniosek o restrukturyzację i negocjuj warunki z bankiem.',
  },
  {
    question: 'Jakie są konsekwencje niespłacania kredytu?',
    answer:
      'Konsekwencje niespłacania kredytu to: naliczanie kar i odsetek za opóźnienie, pogorszenie historii kredytowej w BIK, postępowanie windykacyjne, a w skrajnych przypadkach egzekucja komornicza lub utrata nieruchomości. Dlatego ważne jest szybkie działanie i kontakt z bankiem.',
  },
  {
    question: 'Czy mogę refinansować kredyt, gdy mam problemy ze spłatą?',
    answer:
      'Refinansowanie kredytu może być trudne, gdy masz problemy ze spłatą, ponieważ banki sprawdzają historię kredytową. Jeśli jednak poprawisz sytuację finansową lub znajdziesz bank, który jest skłonny do refinansowania, może to być rozwiązanie. Sprawdź oferty w kalkulatorze.',
  },
  {
    question: 'Gdzie szukać pomocy przy problemach ze spłatą kredytu?',
    answer:
      'Przy problemach ze spłatą kredytu możesz szukać pomocy u: banku (kontakt z działem obsługi klienta), doradcy finansowego, prawnika specjalizującego się w prawie bankowym, organizacji pomagających dłużnikom lub urzędzie konsumenckim. Nie bój się prosić o pomoc.',
  },
  {
    question: 'Czy bank może przejąć nieruchomość?',
    answer:
      'Tak, bank może wystąpić o przejęcie nieruchomości, jeśli kredyt nie jest spłacany przez dłuższy czas i wszystkie inne rozwiązania zostały wyczerpane. To jest ostateczność, ale możliwa. Dlatego ważne jest szybkie działanie i kontakt z bankiem przy pierwszych problemach.',
  },
  {
    question: 'Jak uniknąć problemów ze spłatą kredytu?',
    answer:
      'Aby uniknąć problemów ze spłatą kredytu, warto: sprawdzić zdolność kredytową przed wzięciem kredytu, mieć poduszkę finansową, monitorować sytuację finansową, reagować szybko na pierwsze problemy i rozważyć ubezpieczenie na życie. Użyj kalkulatora, aby sprawdzić, czy rata nie jest zbyt wysoka.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Co zrobić, gdy nie możesz spłacać kredytu hipotecznego?',
  description:
    'Kompletny przewodnik po rozwiązaniach problemów ze spłatą kredytu hipotecznego: odroczenie rat, restrukturyzacja i pomoc prawna.',
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
  datePublished: '2026-04-21',
  dateModified: '2026-04-21',
  mainEntityOfPage: `${siteUrl}/blog/co-zrobic-gdy-nie-mozesz-splacac-kredytu`,
  articleSection: ['Problemy ze spłatą', 'Kredyt hipoteczny', 'Poradniki'],
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
      name: 'Co zrobić, gdy nie możesz spłacać kredytu?',
      item: `${siteUrl}/blog/co-zrobic-gdy-nie-mozesz-splacac-kredytu`,
    },
  ],
}

const relatedArticles = [
  {
    slug: 'pulapki-kredytu-hipotecznego',
    title: 'Pułapki kredytu hipotecznego',
    description: 'Na co uważać przy kredycie hipotecznym.',
  },
  {
    slug: 'refinansowanie-kredytu-hipotecznego',
    title: 'Refinansowanie kredytu hipotecznego',
    description: 'Dowiedz się, czy refinansowanie się opłaca.',
  },
  {
    slug: 'wczesniejsza-splata-kredytu-hipotecznego',
    title: 'Wcześniejsza spłata kredytu hipotecznego',
    description: 'Poznaj korzyści i koszty wcześniejszej spłaty.',
  },
  {
    slug: 'jak-negocjowac-warunki-kredytu-hipotecznego',
    title: 'Jak negocjować warunki kredytu hipotecznego?',
    description: 'Dowiedz się, jak negocjować warunki kredytu.',
  }
]

export default function CannotPayPage() {
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
              <BreadcrumbCurrent>Co zrobić, gdy nie możesz spłacać kredytu?</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>

        <HeroSection>
          <HeroEyebrow>Problemy ze spłatą</HeroEyebrow>
          <HeroTitle>Co zrobić, gdy nie możesz spłacać kredytu hipotecznego?</HeroTitle>
          <HeroLead>
            Problemy ze spłatą kredytu hipotecznego mogą przytrafić się każdemu. Utrata pracy, choroba,
            nieoczekiwane wydatki lub inne trudności finansowe mogą sprawić, że spłata rat staje się
            niemożliwa. Ważne jest, aby szybko zareagować i skontaktować się z bankiem. W tym przewodniku
            dowiesz się, co zrobić, gdy nie możesz spłacać kredytu, jakie masz opcje i jak uniknąć
            konsekwencji. Sprawdź swoje opcje w kalkulatorze przed podjęciem decyzji.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź opcje w kalkulatorze
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
                <strong>Skontaktuj się z bankiem jak najszybciej</strong> - im szybciej zareagujesz, tym
                więcej opcji masz.
              </li>
              <li>
                <strong>Nie ignoruj problemu</strong> - niespłacanie kredytu prowadzi do konsekwencji
                finansowych i prawnych.
              </li>
              <li>
                <strong>Masz kilka opcji</strong> - odroczenie rat, restrukturyzacja, refinansowanie.
              </li>
              <li>
                <strong>Szukaj pomocy</strong> - doradca finansowy, prawnik lub organizacje pomagające
                dłużnikom.
              </li>
            </IntroList>
          </IntroContent>
        </IntroCard>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineCheckCircle size={18} />
              Rozwiązania
            </SectionBadge>
            <SectionTitle>Jakie masz opcje, gdy nie możesz spłacać kredytu?</SectionTitle>
            <SectionSubtitle>
              Oto główne rozwiązania problemów ze spłatą kredytu hipotecznego i jak z nich skorzystać.
            </SectionSubtitle>
          </SectionHeader>
          <SolutionsGrid role="list">
            {solutions.map((sol) => {
              const IconComponent = sol.icon
              return (
                <SolutionCard key={sol.solution} role="listitem">
                  <SolutionHeader>
                    <SolutionIcon aria-hidden="true">
                      <IconComponent size={24} />
                    </SolutionIcon>
                    <SolutionTitle>{sol.solution}</SolutionTitle>
                  </SolutionHeader>
                  <SolutionDescription>{sol.description}</SolutionDescription>
                  <SolutionSteps>
                    <SolutionStepsTitle>Kroki:</SolutionStepsTitle>
                    <SolutionStepsList>
                      {sol.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </SolutionStepsList>
                  </SolutionSteps>
                </SolutionCard>
              )
            })}
          </SolutionsGrid>
          <CtaBox>
            <CtaTitle>Sprawdź opcje refinansowania w kalkulatorze</CtaTitle>
            <CtaText>
              Jeśli rozważasz refinansowanie kredytu, sprawdź oferty różnych banków w naszym kalkulatorze
              kredytu hipotecznego. Porównaj warunki i sprawdź, czy refinansowanie może pomóc w poprawie
              sytuacji finansowej.
            </CtaText>
            <CtaButton href="/kalkulator/kredyt-hipoteczny">
              Sprawdź oferty refinansowania
              <HiOutlineArrowLongRight size={18} />
            </CtaButton>
          </CtaBox>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineExclamationTriangle size={18} />
              Konsekwencje
            </SectionBadge>
            <SectionTitle>Jakie są konsekwencje niespłacania kredytu?</SectionTitle>
            <SectionSubtitle>
              Oto konsekwencje, z którymi możesz się spotkać, jeśli nie spłacasz kredytu hipotecznego.
            </SectionSubtitle>
          </SectionHeader>
          <ConsequencesGrid role="list">
            {consequences.map((consequence) => {
              const IconComponent = consequence.icon
              return (
                <ConsequenceCard key={consequence.consequence} role="listitem">
                  <ConsequenceHeader>
                    <ConsequenceIcon aria-hidden="true">
                      <IconComponent size={24} />
                    </ConsequenceIcon>
                    <ConsequenceInfo>
                      <ConsequenceTitle>{consequence.consequence}</ConsequenceTitle>
                      <ConsequenceBadge>{consequence.impact}</ConsequenceBadge>
                    </ConsequenceInfo>
                  </ConsequenceHeader>
                  <ConsequenceDescription>{consequence.description}</ConsequenceDescription>
                </ConsequenceCard>
              )
            })}
          </ConsequencesGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineDocumentText size={18} />
              FAQ
            </SectionBadge>
            <SectionTitle>Najczęściej zadawane pytania o problemy ze spłatą</SectionTitle>
            <SectionSubtitle>
              Odpowiedzi na najpopularniejsze pytania dotyczące problemów ze spłatą kredytu hipotecznego.
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
              Problemy ze spłatą kredytu hipotecznego mogą przytrafić się każdemu. Najważniejsze to szybko
              zareagować i skontaktować się z bankiem. Masz kilka opcji: kontakt z bankiem, odroczenie rat,
              restrukturyzacja kredytu lub refinansowanie. Każde rozwiązanie ma swoje zalety i wady, więc
              warto rozważyć wszystkie opcje.
            </SummaryText>
            <SummaryText>
              Niespłacanie kredytu prowadzi do konsekwencji: naliczanie kar i odsetek, pogorszenie historii
              kredytowej, postępowanie windykacyjne, a w skrajnych przypadkach utrata nieruchomości. Dlatego
              ważne jest szybkie działanie i kontakt z bankiem przy pierwszych problemach. Szukaj pomocy u
              doradcy finansowego, prawnika lub organizacji pomagających dłużnikom. Sprawdź opcje
              refinansowania w naszym kalkulatorze kredytu hipotecznego. Przeczytaj też nasze przewodniki o{' '}
              <Link href="/blog/refinansowanie-kredytu-hipotecznego" className="text-white underline hover:text-emerald-50">
                refinansowaniu kredytu hipotecznego
              </Link>
              ,{' '}
              <Link href="/blog/pulapki-kredytu-hipotecznego" className="text-white underline hover:text-emerald-50">
                pułapkach kredytu hipotecznego
              </Link>
              {' '}i{' '}
              <Link href="/blog/jak-obliczyc-zdolnosc-kredytowa" className="text-white underline hover:text-emerald-50">
                jak obliczyć zdolność kredytową
              </Link>
              .
            </SummaryText>
            <SummaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź opcje w kalkulatorze
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

const SolutionsGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const SolutionCard = tw.li`flex h-full flex-col rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-sm backdrop-blur-sm`
const SolutionHeader = tw.div`mb-4 flex items-center gap-4`
const SolutionIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const SolutionTitle = tw.h3`flex-1 text-xl font-semibold text-gray-900`
const SolutionDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const SolutionSteps = tw.div`mt-auto rounded-lg bg-gray-50 p-4`
const SolutionStepsTitle = tw.h4`mb-2 text-sm font-semibold text-gray-900`
const SolutionStepsList = tw.ul`grid gap-2 text-sm text-gray-600 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`

const ConsequencesGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const ConsequenceCard = tw.li`flex h-full flex-col rounded-2xl border border-red-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm`
const ConsequenceHeader = tw.div`mb-4 flex items-start gap-4`
const ConsequenceIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-700`
const ConsequenceInfo = tw.div`flex-1`
const ConsequenceTitle = tw.h3`mb-2 text-xl font-semibold text-gray-900`
const ConsequenceBadge = tw.span`inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700`
const ConsequenceDescription = tw.p`text-sm leading-relaxed text-gray-600`

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

