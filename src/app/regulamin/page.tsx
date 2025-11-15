import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowLeft,
  HiOutlineArrowLongRight,
  HiOutlineDocumentText,
  HiOutlineShieldCheck,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {
  title: 'Regulamin | Kalkulator Kredytowy',
  description:
    'Poznaj zasady korzystania z Kalkulatora Kredytowego. Regulamin określa zakres usług, odpowiedzialność oraz prawa użytkowników serwisu.',
  alternates: {
    canonical: `${siteUrl}/regulamin`,
  },
}

type LegalSection = {
  title: string
  paragraphs?: string[]
  bulletIntro?: string
  bullets?: string[]
}

const sections: LegalSection[] = [
  {
    title: '§1. Postanowienia ogólne',
    paragraphs: [
      '1. Niniejszy regulamin określa zasady korzystania z kalkulatora kredytowego dostępnego na stronie internetowej Kalkulator Kredytowy.',
      '2. Kalkulator kredytowy służy wyłącznie celom informacyjnym i ma charakter orientacyjny.',
      '3. Korzystanie z kalkulatora jest bezpłatne i nie wymaga rejestracji ani podawania danych kontaktowych.',
    ],
  },
  {
    title: '§2. Zakres usług',
    bulletIntro: '1. Kalkulator kredytowy umożliwia użytkownikom:',
    bullets: [
      'Wyliczenie orientacyjnej wysokości raty kredytu hipotecznego',
      'Porównanie ofert kredytowych różnych banków',
      'Oszacowanie całkowitego kosztu kredytu, w tym kosztów dodatkowych',
      'Analizę wpływu wkładu własnego i okresu kredytowania na ratę',
    ],
    paragraphs: [
      '2. Wyniki kalkulacji mają charakter szacunkowy i nie stanowią oferty w rozumieniu Kodeksu cywilnego.',
      '3. Rzeczywiste warunki kredytu mogą się różnić od wyników kalkulacji i zależą od indywidualnej oceny zdolności kredytowej przez bank.',
    ],
  },
  {
    title: '§3. Odpowiedzialność',
    bulletIntro: '1. Administrator serwisu nie ponosi odpowiedzialności za:',
    bullets: [
      'Decyzje finansowe podjęte na podstawie wyników kalkulacji',
      'Różnice między wynikami kalkulacji a rzeczywistymi warunkami oferowanymi przez banki',
      'Aktualizację danych ofert bankowych w czasie rzeczywistym',
      'Szkody powstałe w wyniku korzystania z kalkulatora lub niemożności korzystania z serwisu',
    ],
    paragraphs: [
      '2. Dane prezentowane w kalkulatorze są regularnie aktualizowane, jednak mogą różnić się od aktualnych ofert banków.',
      '3. Użytkownik powinien zawsze zweryfikować warunki kredytu bezpośrednio w banku przed podjęciem decyzji finansowej.',
    ],
  },
  {
    title: '§4. Dane osobowe',
    paragraphs: [
      '1. Kalkulator nie wymaga podawania danych osobowych do wykonania podstawowych obliczeń.',
      '2. Dane wprowadzane do kalkulatora (kwoty, okresy, parametry finansowe) nie są przechowywane na serwerze i pozostają wyłącznie w przeglądarce użytkownika.',
      '3. Szczegółowe informacje o przetwarzaniu danych znajdują się w Polityce prywatności.',
    ],
  },
  {
    title: '§5. Własność intelektualna',
    paragraphs: [
      '1. Wszystkie treści zamieszczone na stronie, w tym kod kalkulatora, grafiki i teksty, są chronione prawem autorskim.',
      '2. Kopiowanie, modyfikowanie lub rozpowszechnianie zawartości serwisu bez zgody administratora jest zabronione.',
    ],
  },
  {
    title: '§6. Zmiany regulaminu',
    paragraphs: [
      '1. Administrator zastrzega sobie prawo do wprowadzania zmian w regulaminie.',
      '2. O zmianach użytkownicy zostaną poinformowani poprzez zamieszczenie nowej wersji regulaminu na stronie.',
      '3. Dalsze korzystanie z kalkulatora po wprowadzeniu zmian oznacza akceptację nowego regulaminu.',
    ],
  },
  {
    title: '§7. Postanowienia końcowe',
    paragraphs: [
      '1. W sprawach nieuregulowanych w niniejszym regulaminie mają zastosowanie przepisy prawa polskiego.',
      '2. Wszelkie spory wynikłe z korzystania z kalkulatora będą rozstrzygane przez właściwe sądy polskie.',
      '3. Regulamin wchodzi w życie z dniem publikacji na stronie.',
    ],
  },
]

const lastUpdated = '8 listopada 2025'

export default function RegulaminPage() {
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
          <HeroBadge>
            <HiOutlineShieldCheck size={16} />
            Zasady korzystania
          </HeroBadge>
          <HeroTitle>Regulamin Kalkulatora Kredytowego</HeroTitle>
          <HeroLead>
            Poznaj warunki korzystania z naszego narzędzia, dowiedz się, jakie są obowiązki
            użytkownika i jakie prawa chronią Twoje dane podczas przygotowywania symulacji kredytu.
          </HeroLead>
          <HeroHint>
            Regulamin obowiązuje wszystkich użytkowników. W przypadku pytań skontaktuj się z nami na
            stronie kontaktowej.
          </HeroHint>
        </HeroSection>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineDocumentText size={18} />
              Dokumenty prawne
            </SectionBadge>
            <SectionTitle>Najważniejsze postanowienia regulaminu</SectionTitle>
            <SectionSubtitle>
              Poniżej znajdziesz szczegółowe informacje dotyczące zakresu usług, odpowiedzialności,
              ochrony danych oraz praw użytkownika serwisu Kalkulator Kredytowy.
            </SectionSubtitle>
          </SectionHeader>
          <LegalGrid role="list">
            {sections.map(({ title, paragraphs, bulletIntro, bullets }) => (
              <LegalCard key={title} role="listitem">
                <CardTitle>{title}</CardTitle>
                {paragraphs?.map((paragraph) => (
                  <Paragraph key={paragraph}>{paragraph}</Paragraph>
                ))}
                {bulletIntro ? <Paragraph>{bulletIntro}</Paragraph> : null}
                {bullets ? (
                  <BulletList>
                    {bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </BulletList>
                ) : null}
              </LegalCard>
            ))}
          </LegalGrid>
          <LastUpdated>Ostatnia aktualizacja: {lastUpdated}</LastUpdated>
        </Section>

        <FinalSection>
          <FinalContent>
            <FinalTitle>Masz pytania do regulaminu?</FinalTitle>
            <FinalText>
              Napisz do nas, jeśli potrzebujesz dodatkowych wyjaśnień lub chcesz zgłosić pomysł na
              rozwój kalkulatora. Chętnie odpowiemy w ciągu 48 godzin roboczych.
            </FinalText>
            <FinalActions>
              <PrimaryCta href="/kontakt">
                Skontaktuj się z nami
                <HiOutlineArrowLongRight size={18} />
              </PrimaryCta>
              <SecondaryCta href="/polityka-prywatnosci">Polityka prywatności</SecondaryCta>
            </FinalActions>
          </FinalContent>
        </FinalSection>
      </ContentContainer>
      <FooterMain />
    </PageWrapper>
  )
}

const PageWrapper = tw.main`min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-100`
const ContentContainer = tw.div`mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20`

const BackLink = tw(
  Link,
)`mb-8 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 no-underline hover:text-emerald-800`
const BackIcon = tw.span`inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700`

const HeroSection = tw.section`mx-auto max-w-3xl text-center`
const HeroBadge = tw.span`mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700`
const HeroTitle = tw.h1`mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl`
const HeroLead = tw.p`mx-auto mb-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg`
const HeroHint = tw.p`mx-auto max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base`

const Section = tw.section`mt-16`
const SectionHeader = tw.div`mx-auto mb-10 max-w-3xl text-center`
const SectionBadge = tw.span`mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700`
const SectionTitle = tw.h2`text-3xl font-bold text-gray-900 sm:text-4xl`
const SectionSubtitle = tw.p`mt-3 text-sm leading-relaxed text-gray-600 sm:text-base`

const LegalGrid = tw.ul`grid grid-cols-1 gap-5`
const LegalCard = tw.li`rounded-2xl border border-gray-200 bg-white/90 p-6 text-left shadow-sm backdrop-blur-sm`
const CardTitle = tw.h3`mb-3 text-xl font-semibold text-gray-900`
const Paragraph = tw.p`mb-3 text-sm leading-relaxed text-gray-600 last:mb-0`
const BulletList = tw.ul`mb-3 grid gap-2 text-sm text-gray-600 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`
const LastUpdated = tw.p`mt-8 text-sm text-gray-500`

const FinalSection = tw.section`mt-20 rounded-3xl border border-emerald-200 bg-linear-to-r from-emerald-600 to-teal-600 p-8 shadow-xl sm:p-10`
const FinalContent = tw.div`mx-auto flex max-w-3xl flex-col items-center text-center text-white`
const FinalTitle = tw.h2`text-2xl font-bold sm:text-3xl`
const FinalText = tw.p`mt-3 text-base leading-relaxed text-emerald-50`
const FinalActions = tw.div`mt-6 flex flex-col gap-3 sm:flex-row`
const PrimaryCta = tw(
  Link,
)`inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`
const SecondaryCta = tw(
  Link,
)`inline-flex items-center gap-2 rounded-full border border-white/70 px-5 py-3 font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`
