import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowLeft,
  HiOutlineArrowLongRight,
  HiOutlineBuildingOffice2,
  HiOutlineEnvelope,
  HiOutlineLightBulb,
  HiOutlineMegaphone,
  HiOutlinePaperAirplane,
  HiOutlineQuestionMarkCircle,
  HiOutlineSparkles,
  HiOutlineUsers,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://kalkulatorkredytow.pl'

export const metadata: Metadata = {
  title: 'Kontakt | Kalkulator Kredytowy',
  description:
    'Skontaktuj się z zespołem Kalkulatora Kredytowego. Odpowiemy na pytania, przyjmiemy sugestie funkcji oraz porozmawiamy o współpracy partnerkiej.',
  alternates: {
    canonical: `${siteUrl}/kontakt`,
  },
}

const contactChannels = [
  {
    title: 'Pomoc dla użytkowników',
    description:
      'Masz pytanie dotyczące działania kalkulatora, wyników symulacji lub potrzebujesz pomocy technicznej?',
    icon: HiOutlineQuestionMarkCircle,
    points: [
      'Wyjaśnienie wyników kalkulacji',
      'Instrukcje korzystania z funkcji',
      'Zgłoszenie błędów i sugestii',
    ],
    ctaLabel: 'Napisz do wsparcia',
    href: 'mailto:kontakt@kalkulatorkredytowy.pl?subject=Wsparcie%20u%C5%BCytkownika',
  },
  {
    title: 'Współpraca i partnerstwa',
    description:
      'Poszukujesz partnera do wspólnych działań marketingowych, afiliacji lub integracji danych bankowych?',
    icon: HiOutlineBuildingOffice2,
    points: [
      'Wspólne kampanie content marketingowe',
      'Integracje API i aktualizacja danych bankowych',
      'Dedykowane edycje kalkulatora dla partnerów',
    ],
    ctaLabel: 'Porozmawiajmy o współpracy',
    href: 'mailto:kontakt@kalkulatorkredytowy.pl?subject=Wsp%C3%B3%C5%82praca',
  },
  {
    title: 'Media i eksperci',
    description:
      'Tworzysz materiał o rynku kredytowym i potrzebujesz komentarza, danych lub demonstracji narzędzia?',
    icon: HiOutlineMegaphone,
    points: [
      'Komentarze eksperckie i dane rynkowe',
      'Materiały prasowe i case studies',
      'Wystąpienia na wydarzeniach branżowych',
    ],
    ctaLabel: 'Poproś o materiały',
    href: 'mailto:kontakt@kalkulatorkredytowy.pl?subject=Media%20i%20wypowiedzi',
  },
]

const responseHighlights = [
  {
    title: 'Czas odpowiedzi',
    detail: 'Odpowiadamy najczęściej w ciągu 1 dnia roboczego, maksymalnie 48 godzin.',
  },
  {
    title: 'Forma kontaktu',
    detail:
      'Preferujemy e-mail – daje nam możliwość przygotowania precyzyjnej odpowiedzi i materiałów.',
  },
  {
    title: 'Przejrzystość',
    detail:
      'Każde zgłoszenie otrzymuje numer referencyjny, aby łatwo wrócić do wcześniejszych rozmów.',
  },
]

const preparationSteps = [
  {
    title: 'Opisz kontekst i cel',
    detail: 'Napisz, czego dotyczy zgłoszenie i jaki efekt chcesz osiągnąć.',
  },
  {
    title: 'Dodaj dane i materiały',
    detail: 'Załącz zrzuty ekranu, wyniki kalkulatora lub link do oferty banku.',
  },
  {
    title: 'Zaproponuj termin rozmowy',
    detail: 'Jeżeli chcesz porozmawiać, zaproponuj okno czasowe lub formę kontaktu.',
  },
]

const faqEntries = [
  {
    question: 'Czy kalkulator jest darmowy?',
    answer: 'Tak – nie pobieramy opłat za korzystanie z kalkulatora ani nie wymagamy rejestracji.',
  },
  {
    question: 'Czy udzielacie kredytów lub pośredniczycie w formalnościach?',
    answer:
      'Nie. Naszym celem jest edukacja i porównanie ofert banków. Decyzję kredytową podejmujesz bezpośrednio z bankiem.',
  },
  {
    question: 'Czy mogę poprosić o dedykowaną wersję kalkulatora?',
    answer:
      'Tak. Tworzymy rozwiązania white-label oraz integracje pod konkretne potrzeby partnerów biznesowych.',
  },
  {
    question: 'Jak często aktualizujecie dane bankowe?',
    answer:
      'Automatycznie każdego dnia roboczego, a zmiany od razu trafiają do kalkulatora oraz rankingów.',
  },
]

export default function KontaktPage() {
  return (
    <PageWrapper>
      <ContentContainer>
        <BackLink href="/">
          <BackIcon aria-hidden="true">
            <HiOutlineArrowLeft size={18} />
          </BackIcon>
          Wróć do strony głównej
        </BackLink>

        <HeroSection>
          <HeroBadge>Porozmawiajmy</HeroBadge>
          <HeroTitle>Skontaktuj się z zespołem Kalkulatora Kredytowego</HeroTitle>
          <HeroLead>
            Chętnie odpowiemy na pytania dotyczące narzędzia, porozmawiamy o współpracy i pomożemy
            przygotować materiały do publikacji. Napisz, a wrócimy z konkretną odpowiedzią.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="mailto:kontakt@kalkulatorkredytowy.pl">
              kontakt@kalkulatorkredytowy.pl
              <HiOutlineArrowLongRight size={18} />
            </PrimaryCta>
            <SecondaryCta href="/blog/zagrozenia-kredytowe">
              Zobacz przewodnik o ryzykach kredytowych
            </SecondaryCta>
          </HeroActions>
          <ResponseStrip>
            {responseHighlights.map(({ title, detail }) => (
              <ResponseItem key={title}>
                <ResponseTitle>{title}</ResponseTitle>
                <ResponseDetail>{detail}</ResponseDetail>
              </ResponseItem>
            ))}
          </ResponseStrip>
        </HeroSection>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineEnvelope size={18} />
              Wybierz temat rozmowy
            </SectionBadge>
            <SectionTitle>Jak możemy Ci pomóc?</SectionTitle>
            <SectionSubtitle>
              Wybierz obszar, w którym potrzebujesz wsparcia. Każde zgłoszenie trafia do
              odpowiedniej osoby w zespole.
            </SectionSubtitle>
          </SectionHeader>
          <ChannelGrid role="list">
            {contactChannels.map(({ title, description, icon: Icon, points, ctaLabel, href }) => (
              <ChannelCard key={title} role="listitem">
                <ChannelIcon aria-hidden="true">
                  <Icon size={24} />
                </ChannelIcon>
                <ChannelTitle>{title}</ChannelTitle>
                <ChannelDescription>{description}</ChannelDescription>
                <ChannelList>
                  {points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ChannelList>
                <ChannelCta href={href}>{ctaLabel}</ChannelCta>
              </ChannelCard>
            ))}
          </ChannelGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlinePaperAirplane size={18} />
              Przygotowanie zgłoszenia
            </SectionBadge>
            <SectionTitle>Co ułatwi nam szybką odpowiedź</SectionTitle>
            <SectionSubtitle>
              Kilka wskazówek, dzięki którym szybciej wrócimy z konkretnymi propozycjami lub
              rozwiązaniem.
            </SectionSubtitle>
          </SectionHeader>
          <PreparationGrid role="list">
            {preparationSteps.map(({ title, detail }) => (
              <PreparationCard key={title} role="listitem">
                <PreparationMarker aria-hidden="true">
                  <HiOutlineLightBulb size={20} />
                </PreparationMarker>
                <PreparationTitle>{title}</PreparationTitle>
                <PreparationDetail>{detail}</PreparationDetail>
              </PreparationCard>
            ))}
          </PreparationGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineUsers size={18} />
              Jak współpracujemy
            </SectionBadge>
            <SectionTitle>Ścieżka kontaktu krok po kroku</SectionTitle>
            <SectionSubtitle>
              Oto jak wygląda standardowa współpraca – od pierwszej wiadomości po wdrożenie ustaleń.
            </SectionSubtitle>
          </SectionHeader>
          <Timeline>
            <TimelineItem>
              <TimelineStep>1</TimelineStep>
              <TimelineContent>
                <TimelineTitle>Wiadomość i doprecyzowanie potrzeb</TimelineTitle>
                <TimelineDetail>
                  Odpowiadamy na Twoją wiadomość, uzupełniamy informacje i proponujemy termin
                  rozmowy.
                </TimelineDetail>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineStep>2</TimelineStep>
              <TimelineContent>
                <TimelineTitle>Analiza i rekomendacje</TimelineTitle>
                <TimelineDetail>
                  Przygotowujemy propozycje rozwiązań, materiały lub wyceny – w zależności od
                  tematu.
                </TimelineDetail>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineStep>3</TimelineStep>
              <TimelineContent>
                <TimelineTitle>Wdrożenie i kolejne kroki</TimelineTitle>
                <TimelineDetail>
                  Po akceptacji realizujemy ustalenia, a Ty otrzymujesz plan dalszych działań i
                  podsumowanie.
                </TimelineDetail>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Section>

        <Section id="faq">
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineSparkles size={18} />
              Najczęstsze pytania
            </SectionBadge>
            <SectionTitle>Zanim napiszesz – sprawdź FAQ</SectionTitle>
            <SectionSubtitle>
              Zebraliśmy odpowiedzi na pytania, które pojawiają się najczęściej w wiadomościach od
              użytkowników.
            </SectionSubtitle>
          </SectionHeader>
          <FaqList role="list">
            {faqEntries.map(({ question, answer }) => (
              <FaqItem key={question}>
                <FaqQuestion>{question}</FaqQuestion>
                <FaqAnswer>{answer}</FaqAnswer>
              </FaqItem>
            ))}
          </FaqList>
        </Section>

        <FinalSection>
          <FinalContent>
            <FinalTitle>Gotowy, by rozpocząć rozmowę?</FinalTitle>
            <FinalText>
              Opisz swoją sprawę i załącz potrzebne materiały. Wrócimy z odpowiedzią najpóźniej w
              ciągu 48 godzin roboczych.
            </FinalText>
            <FinalActions>
              <PrimaryCta href="mailto:kontakt@kalkulatorkredytowy.pl">
                Wyślij wiadomość
                <HiOutlineArrowLongRight size={18} />
              </PrimaryCta>
              <SecondaryCta href="/kalkulator/kredyt-hipoteczny">
                Przelicz kredyt ponownie
              </SecondaryCta>
            </FinalActions>
          </FinalContent>
        </FinalSection>
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
const HeroBadge = tw.span`mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700`
const HeroTitle = tw.h1`mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl`
const HeroLead = tw.p`mx-auto mb-8 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg`
const HeroActions = tw.div`flex flex-col items-center justify-center gap-3 sm:flex-row`

const PrimaryCta = tw.a`inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500`
const SecondaryCta = tw(
  Link,
)`inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/95 px-5 py-3 font-semibold text-emerald-700 shadow-sm transition-colors hover:border-emerald-200 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`

const ResponseStrip = tw.div`mt-8 grid gap-4 rounded-3xl border border-emerald-100 bg-white/80 p-6 text-left shadow-sm sm:grid-cols-3 sm:gap-6`
const ResponseItem = tw.div`flex flex-col gap-2`
const ResponseTitle = tw.span`text-sm font-semibold text-emerald-700`
const ResponseDetail = tw.p`text-sm leading-relaxed text-gray-600`

const Section = tw.section`mt-16`
const SectionHeader = tw.div`mx-auto mb-10 max-w-3xl text-center`
const SectionBadge = tw.span`mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700`
const SectionTitle = tw.h2`text-3xl font-bold text-gray-900 sm:text-4xl`
const SectionSubtitle = tw.p`mt-3 text-sm leading-relaxed text-gray-600 sm:text-base`

const ChannelGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const ChannelCard = tw.li`flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1 hover:shadow-lg`
const ChannelIcon = tw.span`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const ChannelTitle = tw.h3`mb-2 text-xl font-semibold text-gray-900`
const ChannelDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const ChannelList = tw.ul`mb-6 grid gap-2 text-sm text-gray-600 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`
const ChannelCta = tw.a`mt-auto inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 no-underline hover:text-emerald-900`

const PreparationGrid = tw.ul`grid grid-cols-1 gap-5 sm:grid-cols-3`
const PreparationCard = tw.li`rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm`
const PreparationMarker = tw.span`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700`
const PreparationTitle = tw.h3`mb-1 text-lg font-semibold text-gray-900`
const PreparationDetail = tw.p`text-sm leading-relaxed text-gray-600`

const Timeline = tw.ol`mx-auto max-w-3xl space-y-6`
const TimelineItem = tw.li`flex items-start gap-4 rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-sm`
const TimelineStep = tw.span`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white`
const TimelineContent = tw.div`flex flex-col gap-2`
const TimelineTitle = tw.h3`text-lg font-semibold text-gray-900`
const TimelineDetail = tw.p`text-sm leading-relaxed text-gray-600`

const FaqList = tw.ul`grid grid-cols-1 gap-4 sm:grid-cols-2`
const FaqItem = tw.li`rounded-2xl border border-gray-200 bg-white/90 p-5 text-left shadow-sm`
const FaqQuestion = tw.h3`mb-2 text-lg font-semibold text-gray-900`
const FaqAnswer = tw.p`text-sm leading-relaxed text-gray-600`

const FinalSection = tw.section`mt-20 rounded-3xl border border-emerald-200 bg-linear-to-r from-emerald-600 to-teal-600 p-8 shadow-xl sm:p-10`
const FinalContent = tw.div`mx-auto flex max-w-3xl flex-col items-center text-center text-white`
const FinalTitle = tw.h2`text-2xl font-bold sm:text-3xl`
const FinalText = tw.p`mt-3 text-base leading-relaxed text-emerald-50`
const FinalActions = tw.div`mt-6 flex flex-col gap-3 sm:flex-row`
