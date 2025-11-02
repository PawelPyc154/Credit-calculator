import { Footer } from "components/calculator/Footer";
import type { Metadata } from "next";
import Link from "next/link";
import tw from "tw-tailwind";

export const metadata: Metadata = {
  title: "Polityka Prywatności - Kalkulator Kredytowy",
  description:
    "Polityka prywatności kalkulatora kredytowego. Informacje o przetwarzaniu danych osobowych zgodnie z RODO.",
};

export default function PolitykaPrywatnosciPage() {
  return (
    <PageContainer>
      <ContentWrapper>
        <BackLink href="/">
          <BackArrow>←</BackArrow>
          <BackText>Powrót do kalkulatora</BackText>
        </BackLink>

        <Header>
          <Title>Polityka Prywatności</Title>
          <Subtitle>
            Informacje o przetwarzaniu danych osobowych zgodnie z RODO
          </Subtitle>
        </Header>

        <Content>
          <Section>
            <SectionTitle>1. Administrator danych osobowych</SectionTitle>
            <Paragraph>
              Administratorem danych osobowych jest właściciel serwisu
              kalkulatora kredytowego.
            </Paragraph>
            <Paragraph>
              W sprawach dotyczących przetwarzania danych osobowych można
              kontaktować się poprzez formularz kontaktowy lub adres e-mail
              podany na stronie kontaktowej.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>2. Zakres przetwarzanych danych</SectionTitle>
            <Paragraph>
              Kalkulator kredytowy działa w oparciu o dane wprowadzane lokalnie
              przez użytkownika. Podstawowe funkcje kalkulatora nie wymagają
              podawania danych osobowych.
            </Paragraph>
            <Paragraph>Serwis może przetwarzać następujące dane:</Paragraph>
            <List>
              <ListItem>
                Dane techniczne: adres IP, typ przeglądarki, system operacyjny,
                czas wizyty
              </ListItem>
              <ListItem>
                Dane z plików cookies: preferencje użytkownika, statystyki
                odwiedzin
              </ListItem>
              <ListItem>
                Dane analityczne: interakcje z kalkulatorem, czas spędzony na
                stronie
              </ListItem>
            </List>
            <Paragraph>
              Dane wprowadzane do kalkulatora (kwoty kredytu, dochody, okres
              kredytowania) są przetwarzane wyłącznie lokalnie w przeglądarce
              użytkownika i nie są przesyłane na serwer.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>3. Cele i podstawy przetwarzania</SectionTitle>
            <Paragraph>Dane są przetwarzane w następujących celach:</Paragraph>
            <List>
              <ListItem>
                Zapewnienie prawidłowego działania kalkulatora (podstawa: art. 6
                ust. 1 lit. f RODO - prawnie uzasadniony interes administratora)
              </ListItem>
              <ListItem>
                Analiza statystyk i optymalizacja serwisu (podstawa: art. 6 ust.
                1 lit. f RODO)
              </ListItem>
              <ListItem>
                Wyświetlanie spersonalizowanych reklam (podstawa: art. 6 ust. 1
                lit. a RODO - zgoda)
              </ListItem>
              <ListItem>
                Zapewnienie bezpieczeństwa serwisu (podstawa: art. 6 ust. 1 lit.
                f RODO)
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>4. Pliki cookies</SectionTitle>
            <Paragraph>
              Serwis wykorzystuje pliki cookies (ciasteczka) do prawidłowego
              funkcjonowania strony oraz analizy ruchu.
            </Paragraph>
            <Paragraph>Rodzaje wykorzystywanych cookies:</Paragraph>
            <List>
              <ListItem>
                Cookies niezbędne - umożliwiają podstawowe funkcje serwisu
              </ListItem>
              <ListItem>
                Cookies analityczne - pomagają zrozumieć, jak użytkownicy
                korzystają ze strony (Google Analytics)
              </ListItem>
              <ListItem>
                Cookies reklamowe - służą do wyświetlania spersonalizowanych
                reklam (Google AdSense)
              </ListItem>
            </List>
            <Paragraph>
              Użytkownik może zarządzać cookies w ustawieniach swojej
              przeglądarki. Wyłączenie cookies może wpłynąć na funkcjonalność
              serwisu.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>5. Udostępnianie danych</SectionTitle>
            <Paragraph>Dane mogą być udostępniane:</Paragraph>
            <List>
              <ListItem>
                Google Analytics - w celu analizy statystyk odwiedzin
              </ListItem>
              <ListItem>Google AdSense - w celu wyświetlania reklam</ListItem>
              <ListItem>
                Dostawcom usług hostingowych - w zakresie niezbędnym do
                utrzymania serwisu
              </ListItem>
            </List>
            <Paragraph>
              Dane nie są sprzedawane ani udostępniane osobom trzecim do celów
              marketingowych bez zgody użytkownika.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>6. Okres przechowywania danych</SectionTitle>
            <Paragraph>
              Dane techniczne i analityczne są przechowywane przez okres:
            </Paragraph>
            <List>
              <ListItem>Dane z cookies: maksymalnie 24 miesiące</ListItem>
              <ListItem>
                Dane analityczne: 26 miesięcy (domyślne ustawienie Google
                Analytics)
              </ListItem>
              <ListItem>
                Logi serwera: maksymalnie 90 dni (w celach bezpieczeństwa)
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>7. Prawa użytkownika</SectionTitle>
            <Paragraph>Zgodnie z RODO, użytkownik ma prawo do:</Paragraph>
            <List>
              <ListItem>
                Dostępu do swoich danych osobowych (art. 15 RODO)
              </ListItem>
              <ListItem>Sprostowania danych (art. 16 RODO)</ListItem>
              <ListItem>
                Usunięcia danych - "prawo do bycia zapomnianym" (art. 17 RODO)
              </ListItem>
              <ListItem>
                Ograniczenia przetwarzania danych (art. 18 RODO)
              </ListItem>
              <ListItem>Przenoszenia danych (art. 20 RODO)</ListItem>
              <ListItem>
                Wniesienia sprzeciwu wobec przetwarzania (art. 21 RODO)
              </ListItem>
              <ListItem>
                Cofnięcia zgody w dowolnym momencie (art. 7 ust. 3 RODO)
              </ListItem>
              <ListItem>
                Wniesienia skargi do organu nadzorczego (Prezes UODO)
              </ListItem>
            </List>
            <Paragraph>
              W celu realizacji swoich praw, prosimy o kontakt poprzez formularz
              kontaktowy.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>8. Bezpieczeństwo danych</SectionTitle>
            <Paragraph>
              Administrator stosuje odpowiednie środki techniczne i
              organizacyjne zapewniające bezpieczeństwo danych osobowych:
            </Paragraph>
            <List>
              <ListItem>Szyfrowanie połączenia SSL/TLS (HTTPS)</ListItem>
              <ListItem>Regularne aktualizacje oprogramowania</ListItem>
              <ListItem>
                Monitoring i ochrona przed nieautoryzowanym dostępem
              </ListItem>
              <ListItem>
                Minimalizacja zbieranych danych (privacy by design)
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>9. Linki zewnętrzne</SectionTitle>
            <Paragraph>
              Serwis może zawierać linki do stron zewnętrznych (np. stron
              bankowych). Administrator nie ponosi odpowiedzialności za politykę
              prywatności tych stron.
            </Paragraph>
            <Paragraph>
              Zachęcamy do zapoznania się z polityką prywatności każdej
              odwiedzanej strony internetowej.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>10. Zmiany w polityce prywatności</SectionTitle>
            <Paragraph>
              Administrator zastrzega sobie prawo do wprowadzania zmian w
              polityce prywatności.
            </Paragraph>
            <Paragraph>
              O istotnych zmianach użytkownicy zostaną poinformowani poprzez
              komunikat na stronie głównej.
            </Paragraph>
            <Paragraph>
              Aktualna wersja polityki prywatności jest zawsze dostępna pod tym
              adresem.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>11. Kontakt</SectionTitle>
            <Paragraph>
              W sprawach dotyczących przetwarzania danych osobowych lub
              realizacji praw wynikających z RODO, prosimy o kontakt poprzez
              stronę kontaktową.
            </Paragraph>
          </Section>

          <LastUpdated>Ostatnia aktualizacja: 2 listopada 2025</LastUpdated>
        </Content>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
}

const PageContainer = tw.div`min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50`;
const ContentWrapper = tw.div`max-w-4xl mx-auto px-4 py-12`;
const BackLink = tw(
  Link
)`inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors`;
const BackArrow = tw.span`text-xl`;
const BackText = tw.span``;
const Header = tw.header`text-center mb-12`;
const Title = tw.h1`text-4xl md:text-5xl font-bold text-gray-900 mb-4`;
const Subtitle = tw.p`text-lg text-gray-600`;
const Content = tw.div`bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12`;
const Section = tw.section`mb-8 last:mb-0`;
const SectionTitle = tw.h2`text-2xl font-bold text-gray-900 mb-4`;
const Paragraph = tw.p`text-gray-700 leading-relaxed mb-3`;
const List = tw.ul`list-disc list-inside space-y-2 ml-4 mb-3`;
const ListItem = tw.li`text-gray-700`;
const LastUpdated = tw.p`text-sm text-gray-500 text-center mt-8 pt-8 border-t border-gray-200`;
