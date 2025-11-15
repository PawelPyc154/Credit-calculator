import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowLeft,
  HiOutlineArrowLongRight,
  HiOutlineBanknotes,
  HiOutlineChartBar,
  HiOutlineClipboardDocumentCheck,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineUsers,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://kalkulatorkredytow.pl'

export const metadata: Metadata = {
  title: 'Zagrożenia kredytowe | Na co uważać przy zaciąganiu kredytu',
  description:
    'Poznaj najczęstsze zagrożenia związane z kredytami: rosnące raty, ukryte koszty, zmienne oprocentowanie i ryzyko utraty płynności. Dowiedz się, jak się zabezpieczyć.',
  alternates: {
    canonical: `${siteUrl}/blog/zagrozenia-kredytowe`,
  },
  keywords: [
    'zagrożenia kredytu',
    'ryzyka kredytowe',
    'kredyt hipoteczny ryzyko',
    'pułapki kredytowe',
    'bezpieczne zaciąganie kredytu',
  ],
  openGraph: {
    title: 'Zagrożenia kredytowe | Na co uważać przy zaciąganiu kredytu',
    description:
      'Dowiedz się, jakie ryzyka wiążą się z kredytem i jak je ograniczyć: zmienne stopy, ukryte koszty, ryzyko kursowe i utrata płynności.',
    url: `${siteUrl}/blog/zagrozenia-kredytowe`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Zagrożenia przy kredycie hipotecznym',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zagrożenia kredytowe – przewodnik',
    description:
      'Poznaj najważniejsze ryzyka przy zaciąganiu kredytu i dowiedz się, jak chronić domowy budżet.',
    images: [`${siteUrl}/og-image.jpg`],
  },
}

const riskAreas = [
  {
    title: 'Zmienna stopa procentowa',
    description:
      'Rata kredytu rośnie wraz ze wzrostem stóp procentowych. Nawet niewielka zmiana może znacząco podnieść miesięczny koszt zobowiązania.',
    bullets: [
      'Wzrost raty o 20-30% w ciągu roku przy silnych podwyżkach stóp',
      'Brak górnego limitu – rata rośnie tak długo, jak rosną stopy',
      'Wysokie oprocentowanie utrzymuje się nawet po zakończeniu okresu podwyżek',
    ],
    icon: HiOutlineChartBar,
  },
  {
    title: 'Ukryte koszty i ubezpieczenia',
    description:
      'Banki często wiążą promocyjne marże z dodatkowymi produktami lub ubezpieczeniami, które znacząco podnoszą realny koszt kredytu.',
    bullets: [
      'Ubezpieczenia na życie i nieruchomości wymagane przez bank',
      'Wysokie opłaty za prowadzenie konta lub karty kredytowej',
      'Czasowe promocje, które po kilku latach przestają obowiązywać',
    ],
    icon: HiOutlineCurrencyDollar,
  },
  {
    title: 'Ryzyko kursowe',
    description:
      'Kredyty w obcej walucie lub z marżami zależnymi od kursu waluty niosą ryzyko wzrostu zadłużenia w przypadku niekorzystnych zmian kursowych.',
    bullets: [
      'Rata i saldo rosną wraz z osłabieniem złotówki',
      'Trudniejsze refinansowanie na złotówki przy wysokim kursie',
      'Ryzyko podwyższonego wkładu własnego, gdy saldo przekracza wartość nieruchomości',
    ],
    icon: HiOutlineBanknotes,
  },
  {
    title: 'Utrata płynności finansowej',
    description:
      'Zmiany w sytuacji zawodowej lub niespodziewane wydatki mogą utrudnić spłatę rat i prowadzić do opóźnień lub konieczności restrukturyzacji.',
    bullets: [
      'Brak poduszki finansowej zwiększa ryzyko opóźnień',
      'Wysoki wskaźnik DTI ogranicza zdolność do dodatkowych zobowiązań',
      'Kary i dodatkowe odsetki za opóźnienia w spłacie',
    ],
    icon: HiOutlineUsers,
  },
  {
    title: 'Spadek wartości zabezpieczenia',
    description:
      'W przypadku spadku wartości nieruchomości bank może zażądać dodatkowego zabezpieczenia lub zwiększyć koszty ubezpieczenia.',
    bullets: [
      'LTV powyżej 80% zwiększa wymagane ubezpieczenia',
      'Trudność w sprzedaży nieruchomości bez dopłaty własnej',
      'Ryzyko dodatkowych opłat przy refinansowaniu',
    ],
    icon: HiOutlineShieldCheck,
  },
  {
    title: 'Niejasne zapisy w umowie',
    description:
      'Niektóre zapisy umowne mogą pozwalać bankowi na jednostronne wprowadzanie opłat lub zmian warunków kredytu.',
    bullets: [
      'Klauzule modyfikacyjne pozwalające na zmianę oprocentowania poza WIBOR/WIRON',
      'Opłaty serwisowe dodawane po kilku latach spłaty kredytu',
      'Niedookreślone warunki wypowiedzenia umowy',
    ],
    icon: HiOutlineDocumentText,
  },
]

const warningSignals = [
  'Sugestie podpisania umowy bez czasu na analizę dokumentów',
  'Brak przejrzystej informacji o całkowitym koszcie kredytu (RRSO)',
  'Warunki promocyjne dostępne tylko przy wielu dodatkowych produktach',
  'Brak symulacji raty dla scenariusza wzrostu stóp procentowych',
  'Nacisk na szybką decyzję bez możliwości konsultacji z doradcą',
]

const mitigationSteps = [
  {
    title: 'Przygotuj bufor bezpieczeństwa',
    description:
      'Zapewnij środki na pokrycie co najmniej 6 miesięcznych rat oraz podstawowych kosztów życia. Zabezpiecz się na wypadek wzrostu rat lub utraty pracy.',
  },
  {
    title: 'Analizuj scenariusze stresowe',
    description:
      'Sprawdź, jak zmieni się rata przy wzroście stóp o 2-3 punkty procentowe i oceń, czy domowy budżet to wytrzyma.',
  },
  {
    title: 'Porównuj pełne koszty',
    description:
      'Analizuj RRSO oraz sumę wszystkich kosztów dodatkowych zamiast sugerować się wyłącznie wysokością raty w pierwszych latach.',
  },
  {
    title: 'Negocjuj i pytaj',
    description:
      'Zadawaj pytania o możliwość rezygnacji z dodatkowych produktów, warunki przewalutowania lub wcześniejszej spłaty oraz opłaty za aneksy.',
  },
]

const questionsForBank = [
  'Jak zmieni się rata przy wzroście stóp procentowych o 1-3 punkty procentowe?',
  'Czy mogę zrezygnować z dodatkowych ubezpieczeń po pierwszym roku?',
  'Jakie są koszty wcześniejszej spłaty lub nadpłaty kredytu?',
  'Jakie warunki muszą być spełnione, aby skorzystać z obniżonej marży?',
  'Czy bank przewiduje możliwość czasowego zawieszenia spłaty rat?',
  'Jak wygląda proces renegocjacji warunków w przypadku problemów finansowych?',
]

const whenToWait = [
  {
    title: 'Brak stabilnego dochodu',
    detail:
      'Jeśli źródło dochodu jest niepewne lub planujesz zmianę pracy, odłóż decyzję do czasu stabilizacji sytuacji zawodowej.',
  },
  {
    title: 'Wysokie ceny nieruchomości',
    detail:
      'Przy dynamicznych wzrostach cen warto poczekać na uspokojenie rynku lub negocjować mocniej z deweloperem.',
  },
  {
    title: 'Brak wkładu własnego',
    detail:
      'Zaciąganie kredytu z minimalnym wkładem oznacza wyższe koszty ubezpieczeń oraz większe ryzyko w przypadku spadku wartości nieruchomości.',
  },
  {
    title: 'Brak rezerwy finansowej',
    detail:
      'Jeżeli nie masz funduszu awaryjnego, najpierw zbuduj oszczędności zabezpieczające budżet na gorsze scenariusze.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Najważniejsze zagrożenia kredytowe i jak ich uniknąć',
  description:
    'Praktyczny przewodnik po ryzykach związanych z zaciąganiem kredytu hipotecznego i sposobach ograniczenia zagrożeń.',
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
  datePublished: '2025-11-08',
  mainEntityOfPage: `${siteUrl}/blog/zagrozenia-kredytowe`,
  articleSection: [
    'Ryzyka kredytowe',
    'Analiza zdolności kredytowej',
    'Ochrona finansów domowych',
    'Pytania do banku',
  ],
  keywords: metadata.keywords,
}

export default function CreditRisksPage() {
  const articleJsonLd = toJsonLd(articleStructuredData)

  return (
    <PageWrapper>
      <ContentContainer>
        <script type="application/ld+json" suppressHydrationWarning>
          {articleJsonLd}
        </script>

        <BackLink href="/blog">
          <BackIcon aria-hidden="true">
            <HiOutlineArrowLeft size={18} />
          </BackIcon>
          Wróć do bloga
        </BackLink>

        <HeroSection>
          <HeroEyebrow>Świadome finansowanie</HeroEyebrow>
          <HeroTitle>Zanim podpiszesz umowę kredytową, poznaj największe zagrożenia</HeroTitle>
          <HeroLead>
            Kredyt to decyzja na lata. Zrozum, co może pójść nie tak, jakie koszty mogą Cię zaskoczyć i
            jak przygotować budżet, aby chronić siebie oraz bliskich.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Przelicz kredyt z marginesem bezpieczeństwa
              <HiOutlineArrowLongRight size={18} />
            </PrimaryCta>
          </HeroActions>
        </HeroSection>

        <IntroCard>
          <IntroIcon aria-hidden="true">
            <HiOutlineSparkles size={28} />
          </IntroIcon>
          <IntroContent>
            <IntroTitle>Najważniejsze wnioski</IntroTitle>
            <IntroList>
              <li>
                <strong>Przygotuj scenariusze stresowe</strong> – rata przy zmiennej stopie może wzrosnąć
                nawet o 30%.
              </li>
              <li>
                <strong>Analizuj RRSO, a nie tylko marżę</strong> – dodatkowe produkty potrafią podnieść
                koszt o kilkanaście tysięcy złotych.
              </li>
              <li>
                <strong>Zanim podpiszesz</strong>, poproś o projekt umowy i sprawdź kluczowe klauzule z
                doradcą lub prawnikiem.
              </li>
            </IntroList>
          </IntroContent>
        </IntroCard>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineExclamationTriangle size={18} />
              Krytyczne ryzyka
            </SectionBadge>
            <SectionTitle>Główne zagrożenia przy zaciąganiu kredytu</SectionTitle>
            <SectionSubtitle>
              Poznaj czynniki, które najczęściej prowadzą do problemów ze spłatą lub wzrostu kosztów
              zobowiązania.
            </SectionSubtitle>
          </SectionHeader>
          <RiskGrid role="list">
            {riskAreas.map(({ title, description, bullets, icon: IconComponent }) => (
              <RiskCard key={title} role="listitem">
                <RiskIcon aria-hidden="true">
                  <IconComponent size={24} />
                </RiskIcon>
                <RiskTitle>{title}</RiskTitle>
                <RiskDescription>{description}</RiskDescription>
                <RiskList>
                  {bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </RiskList>
              </RiskCard>
            ))}
          </RiskGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineClipboardDocumentCheck size={18} />
              Sygnały ostrzegawcze
            </SectionBadge>
            <SectionTitle>Kiedy zachować szczególną czujność</SectionTitle>
            <SectionSubtitle>
              Jeśli zauważysz poniższe sygnały w trakcie rozmów z bankiem lub pośrednikiem, zweryfikuj
              ofertę ponownie lub skorzystaj z niezależnej opinii.
            </SectionSubtitle>
          </SectionHeader>
          <WarningList role="list">
            {warningSignals.map((signal) => (
              <WarningItem key={signal}>
                <WarningBullet aria-hidden="true">!</WarningBullet>
                <span>{signal}</span>
              </WarningItem>
            ))}
          </WarningList>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineShieldCheck size={18} />
              Działania ochronne
            </SectionBadge>
            <SectionTitle>Jak ograniczyć ryzyko kredytowe</SectionTitle>
            <SectionSubtitle>
              Kilka praktycznych kroków, które warto wykonać przed i po podpisaniu umowy kredytowej.
            </SectionSubtitle>
          </SectionHeader>
          <MitigationGrid role="list">
            {mitigationSteps.map(({ title, description }) => (
              <MitigationCard key={title} role="listitem">
                <MitigationTitle>{title}</MitigationTitle>
                <MitigationDescription>{description}</MitigationDescription>
              </MitigationCard>
            ))}
          </MitigationGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineDocumentText size={18} />
              Lista pytań
            </SectionBadge>
            <SectionTitle>Pytania, które warto zadać bankowi</SectionTitle>
            <SectionSubtitle>
              Zanim złożysz podpis, upewnij się, że otrzymałeś jasne odpowiedzi na poniższe kwestie.
            </SectionSubtitle>
          </SectionHeader>
          <QuestionsList role="list">
            {questionsForBank.map((question) => (
              <QuestionItem key={question}>
                <QuestionBullet aria-hidden="true">?</QuestionBullet>
                <span>{question}</span>
              </QuestionItem>
            ))}
          </QuestionsList>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineUsers size={18} />
              Wstrzymaj decyzję
            </SectionBadge>
            <SectionTitle>Kiedy lepiej poczekać z kredytem</SectionTitle>
            <SectionSubtitle>
              Oto sytuacje, w których dodatkowy czas na przygotowanie może uchronić Cię przed
              niepotrzebnym ryzykiem.
            </SectionSubtitle>
          </SectionHeader>
          <WaitGrid role="list">
            {whenToWait.map(({ title, detail }) => (
              <WaitCard key={title} role="listitem">
                <WaitTitle>{title}</WaitTitle>
                <WaitDetail>{detail}</WaitDetail>
              </WaitCard>
            ))}
          </WaitGrid>
        </Section>

        <FinalCta>
          <FinalContent>
            <FinalTitle>Zadbaj o bezpieczną decyzję kredytową</FinalTitle>
            <FinalText>
              Skorzystaj z kalkulatora, aby sprawdzić różne scenariusze, a następnie przygotuj listę
              pytań do banku. Świadomość ryzyk to najlepsza ochrona Twojego budżetu.
            </FinalText>
            <FinalActions>
              <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
                Przelicz kredyt ponownie
                <HiOutlineArrowLongRight size={18} />
              </PrimaryCta>
            </FinalActions>
          </FinalContent>
        </FinalCta>
      </ContentContainer>
      <FooterMain />
    </PageWrapper>
  )
}

const PageWrapper = tw.main`min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-100`
const ContentContainer = tw.div`mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20`

const BackLink = tw(
  Link,
)`mb-8 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 no-underline hover:text-emerald-800`
const BackIcon = tw.span`inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700`

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

const RiskGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const RiskCard = tw.li`flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1 hover:shadow-lg`
const RiskIcon = tw.span`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const RiskTitle = tw.h3`mb-2 text-xl font-semibold text-gray-900`
const RiskDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const RiskList = tw.ul`mt-auto grid gap-2 text-sm text-gray-600 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`

const WarningList = tw.ul`mx-auto max-w-3xl space-y-4`
const WarningItem = tw.li`flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/60 p-4 text-sm text-amber-800 shadow-sm sm:text-base`
const WarningBullet = tw.span`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white`

const MitigationGrid = tw.ul`grid grid-cols-1 gap-5 sm:grid-cols-2`
const MitigationCard = tw.li`rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm backdrop-blur-sm`
const MitigationTitle = tw.h3`mb-2 text-lg font-semibold text-gray-900`
const MitigationDescription = tw.p`text-sm leading-relaxed text-gray-600`

const QuestionsList = tw.ul`mx-auto max-w-3xl divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-200 bg-white/80 shadow-sm`
const QuestionItem = tw.li`flex items-start gap-3 px-5 py-4 text-sm text-gray-700 sm:text-base`
const QuestionBullet = tw.span`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700`

const WaitGrid = tw.ul`grid grid-cols-1 gap-5 sm:grid-cols-2`
const WaitCard = tw.li`rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm`
const WaitTitle = tw.h3`mb-2 text-lg font-semibold text-gray-900`
const WaitDetail = tw.p`text-sm leading-relaxed text-gray-600`

const FinalCta = tw.section`mt-20 rounded-3xl border border-emerald-200 bg-linear-to-r from-emerald-600 to-teal-600 p-8 shadow-xl sm:p-10`
const FinalContent = tw.div`mx-auto flex max-w-3xl flex-col items-center text-center text-white`
const FinalTitle = tw.h2`text-2xl font-bold sm:text-3xl`
const FinalText = tw.p`mt-3 text-base leading-relaxed text-emerald-50`
const FinalActions = tw.div`mt-6 flex flex-col gap-3 sm:flex-row`

