import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowLeft,
  HiOutlineArrowLongRight,
  HiOutlineLockClosed,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {
  title: 'Polityka prywatności | Kalkulator Kredytowy',
  description:
    'Dowiedz się, jakie dane gromadzi Kalkulator Kredytowy, jak je chronimy i jakie prawa przysługują użytkownikom zgodnie z RODO.',
  alternates: {
    canonical: `${siteUrl}/polityka-prywatnosci`,
  },
}

type PolicySection = {
  title: string
  paragraphs?: string[]
  bulletIntro?: string
  bullets?: string[]
}

const policySections: PolicySection[] = [
  {
    title: '1. Administrator danych osobowych',
    paragraphs: [
      'Administratorem danych osobowych jest właściciel serwisu Kalkulator Kredytowy.',
      'W sprawach dotyczących przetwarzania danych osobowych można kontaktować się poprzez stronę kontaktową lub podany adres e-mail.',
    ],
  },
  {
    title: '2. Zakres przetwarzanych danych',
    paragraphs: [
      'Kalkulator kredytowy działa w oparciu o dane wprowadzane lokalnie przez użytkownika. Podstawowe funkcje kalkulatora nie wymagają podawania danych osobowych.',
      'Serwis może przetwarzać następujące dane techniczne i statystyczne:',
      'Dane wprowadzane do kalkulatora (kwoty kredytu, dochody, okres kredytowania) są przetwarzane wyłącznie lokalnie w przeglądarce użytkownika i nie są przesyłane na serwer.',
    ],
    bullets: [
      'Adres IP, typ przeglądarki, system operacyjny i czas wizyty',
      'Dane z plików cookies, np. preferencje użytkownika oraz statystyki odwiedzin',
      'Dane analityczne, takie jak interakcje z kalkulatorem i czas spędzony na stronie',
    ],
  },
  {
    title: '3. Cele i podstawy przetwarzania',
    paragraphs: ['Dane są przetwarzane w następujących celach i w oparciu o podane podstawy prawne:'],
    bullets: [
      'Zapewnienie prawidłowego działania kalkulatora (art. 6 ust. 1 lit. f RODO – prawnie uzasadniony interes administratora)',
      'Analiza statystyk i optymalizacja serwisu (art. 6 ust. 1 lit. f RODO)',
      'Wyświetlanie spersonalizowanych reklam po uzyskaniu zgody (art. 6 ust. 1 lit. a RODO)',
      'Zapewnienie bezpieczeństwa serwisu (art. 6 ust. 1 lit. f RODO)',
    ],
  },
  {
    title: '4. Pliki cookies',
    paragraphs: [
      'Serwis wykorzystuje pliki cookies (ciasteczka) do prawidłowego funkcjonowania strony oraz analizy ruchu.',
      'Wykorzystujemy następujące rodzaje cookies:',
    ],
    bullets: [
      'Cookies niezbędne – umożliwiają podstawowe funkcje serwisu',
      'Cookies analityczne – pomagają zrozumieć, jak użytkownicy korzystają ze strony (np. Google Analytics)',
      'Cookies reklamowe – służą do wyświetlania spersonalizowanych reklam (np. Google AdSense)',
      'Użytkownik może zarządzać cookies w ustawieniach swojej przeglądarki. Wyłączenie cookies może wpłynąć na funkcjonalność serwisu.',
    ],
  },
  {
    title: '5. Udostępnianie danych',
    paragraphs: ['Dane mogą być udostępniane następującym podmiotom:'],
    bullets: [
      'Google Analytics – w celu analizy statystyk odwiedzin',
      'Google AdSense – w celu wyświetlania reklam',
      'Dostawcom usług hostingowych – w zakresie niezbędnym do utrzymania serwisu',
      'Dane nie są sprzedawane ani udostępniane osobom trzecim do celów marketingowych bez zgody użytkownika.',
    ],
  },
  {
    title: '6. Okres przechowywania danych',
    paragraphs: ['Dane techniczne i analityczne przechowujemy przez następujące okresy:'],
    bullets: [
      'Cookies – maksymalnie 24 miesiące',
      'Dane analityczne – 26 miesięcy (domyślne ustawienie Google Analytics)',
      'Logi serwera – maksymalnie 90 dni (w celach bezpieczeństwa)',
    ],
  },
  {
    title: '7. Prawa użytkownika',
    paragraphs: [
      'Zgodnie z RODO, użytkownik ma prawo do:',
      'W celu realizacji swoich praw prosimy o kontakt poprzez formularz na stronie kontaktowej.',
    ],
    bullets: [
      'Dostępu do swoich danych osobowych (art. 15 RODO)',
      'Sprostowania danych (art. 16 RODO)',
      'Usunięcia danych – „prawo do bycia zapomnianym” (art. 17 RODO)',
      'Ograniczenia przetwarzania danych (art. 18 RODO)',
      'Przenoszenia danych (art. 20 RODO)',
      'Wniesienia sprzeciwu wobec przetwarzania (art. 21 RODO)',
      'Cofnięcia zgody w dowolnym momencie (art. 7 ust. 3 RODO)',
      'Wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych',
    ],
  },
  {
    title: '8. Bezpieczeństwo danych',
    paragraphs: ['Wdrożyliśmy środki techniczne i organizacyjne zapewniające bezpieczeństwo danych osobowych:'],
    bullets: [
      'Szyfrowane połączenie SSL/TLS (HTTPS)',
      'Regularne aktualizacje oprogramowania i komponentów serwisu',
      'Monitoring i ochrona przed nieautoryzowanym dostępem',
      'Minimalizacja zbieranych danych (privacy by design)',
    ],
  },
  {
    title: '9. Linki zewnętrzne',
    paragraphs: [
      'Serwis może zawierać linki do stron zewnętrznych (np. banków). Administrator nie ponosi odpowiedzialności za politykę prywatności tych stron.',
      'Zachęcamy do zapoznania się z polityką prywatności każdej odwiedzanej strony internetowej.',
    ],
  },
  {
    title: '10. Zmiany w polityce prywatności',
    paragraphs: [
      'Administrator zastrzega sobie prawo do wprowadzania zmian w polityce prywatności.',
      'O istotnych zmianach użytkownicy zostaną poinformowani poprzez komunikat na stronie głównej.',
      'Aktualna wersja polityki prywatności jest zawsze dostępna pod tym adresem.',
    ],
  },
  {
    title: '11. Kontakt',
    paragraphs: [
      'W sprawach dotyczących przetwarzania danych osobowych lub realizacji praw wynikających z RODO prosimy o kontakt poprzez stronę kontaktową.',
    ],
  },
]

const policyLastUpdated = '8 listopada 2025'

export default function PolitykaPrywatnosciPage() {
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
            Ochrona danych
          </HeroBadge>
          <HeroTitle>Polityka prywatności Kalkulatora Kredytowego</HeroTitle>
          <HeroLead>
            Szanujemy Twoje bezpieczeństwo oraz prawo do prywatności. Na tej stronie opisujemy, jakie dane
            gromadzimy, w jakim celu oraz jakie prawa przysługują Ci zgodnie z RODO.
          </HeroLead>
          <HeroHint>
            Wprowadzane do kalkulatora dane finansowe pozostają w Twojej przeglądarce. Sprawdź szczegóły i
            dowiedz się, jak możesz zarządzać swoimi ustawieniami.
          </HeroHint>
        </HeroSection>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineLockClosed size={18} />
              Przetwarzanie danych
            </SectionBadge>
            <SectionTitle>Jak dbamy o bezpieczeństwo informacji</SectionTitle>
            <SectionSubtitle>
              Poniższe sekcje wyjaśniają, jakie dane przetwarzamy, komu je powierzamy oraz jak możesz
              sprawdzić i zaktualizować swoje ustawienia prywatności.
            </SectionSubtitle>
          </SectionHeader>
          <PolicyGrid role="list">
            {policySections.map(({ title, paragraphs, bulletIntro, bullets }) => {
              const isCookiesSection = title.includes('Pliki cookies')

              if (isCookiesSection) {
                const cookiesParagraphs = paragraphs ?? []
                const [cookiesIntro, ...cookiesRest] = cookiesParagraphs
                const cookiesBullets = bullets ?? []
                const cookiesItems = cookiesBullets.slice(0, -1)
                const cookiesFootnote = cookiesBullets.at(-1)

                return (
                  <CookiesCard key={title} role="listitem">
                    <CookiesHeader>
                      <CookiesIcon aria-hidden="true">
                        <HiOutlineSparkles size={18} />
                      </CookiesIcon>
                      <CookiesTitle>{title}</CookiesTitle>
                    </CookiesHeader>
                    {cookiesIntro ? <CookiesIntro>{cookiesIntro}</CookiesIntro> : null}
                    {cookiesRest.map((paragraph) => (
                      <Paragraph key={paragraph}>{paragraph}</Paragraph>
                    ))}
                    {bulletIntro ? <Paragraph>{bulletIntro}</Paragraph> : null}
                    {cookiesItems.length ? (
                      <CookiesBulletList>
                        {cookiesItems.map((item) => {
                          const [label, description] = item.split(' – ')
                          return (
                            <li key={item}>
                              <CookiesBulletLabel>{label}</CookiesBulletLabel>
                              {description ? (
                                <CookiesBulletDescription>{description}</CookiesBulletDescription>
                              ) : null}
                            </li>
                          )
                        })}
                      </CookiesBulletList>
                    ) : null}
                    {cookiesFootnote ? <CookiesNote>{cookiesFootnote}</CookiesNote> : null}
                  </CookiesCard>
                )
              }

              return (
                <PolicyCard key={title} role="listitem">
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
                </PolicyCard>
              )
            })}
          </PolicyGrid>
          <LastUpdated>Ostatnia aktualizacja: {policyLastUpdated}</LastUpdated>
        </Section>

        <FinalSection>
          <FinalContent>
            <FinalTitle>Chcesz zmienić swoje ustawienia prywatności?</FinalTitle>
            <FinalText>
              Skontaktuj się z nami, jeśli potrzebujesz dostępu do danych, chcesz je poprawić lub
              wycofać zgodę. Pomożemy w realizacji każdego z Twoich praw wynikających z RODO.
            </FinalText>
            <FinalActions>
              <PrimaryCta href="/kontakt">
                Napisz do nas
                <HiOutlineArrowLongRight size={18} />
              </PrimaryCta>
              <SecondaryCta href="/regulamin">Zobacz regulamin</SecondaryCta>
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

const PolicyGrid = tw.ul`grid grid-cols-1 gap-5`
const PolicyCardBase = tw.li`rounded-2xl border border-gray-200 bg-white/90 p-6 text-left shadow-sm backdrop-blur-sm`
const PolicyCard = PolicyCardBase
const CookiesCard = tw(
  PolicyCardBase,
)`border-amber-200 bg-linear-to-br from-amber-50/80 via-white to-amber-100/80 shadow-md`
const CardTitle = tw.h3`mb-3 text-xl font-semibold text-gray-900`
const Paragraph = tw.p`mb-3 text-sm leading-relaxed text-gray-600 last:mb-0`
const BulletList = tw.ul`mb-3 grid gap-2 text-sm text-gray-600 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`
const LastUpdated = tw.p`mt-8 text-sm text-gray-500`

const CookiesHeader = tw.div`mb-4 flex items-center gap-3`
const CookiesIcon = tw.span`inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600 shadow-sm`
const CookiesTitle = tw(CardTitle)`mb-0 text-2xl font-semibold text-amber-900`
const CookiesIntro = tw.p`mb-4 rounded-xl bg-white/80 px-4 py-3 text-sm leading-relaxed text-amber-800 shadow-inner`
const CookiesBulletList = tw.ul`mb-4 space-y-3 [&_li]:rounded-2xl [&_li]:border [&_li]:border-amber-200 [&_li]:bg-white/80 [&_li]:px-4 [&_li]:py-3 [&_li]:shadow-inner`
const CookiesBulletLabel = tw.span`block text-sm font-semibold text-amber-800`
const CookiesBulletDescription = tw.span`mt-0.5 block text-sm leading-relaxed text-amber-700`
const CookiesNote = tw.p`mt-4 rounded-xl border border-amber-200 bg-white/70 px-4 py-3 text-sm leading-relaxed text-amber-700`

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
