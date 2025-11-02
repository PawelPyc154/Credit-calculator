import { Footer } from "components/calculator/Footer";
import type { Metadata } from "next";
import Link from "next/link";
import tw from "tw-tailwind";

export const metadata: Metadata = {
  title: "Regulamin - Kalkulator Kredytowy",
  description:
    "Regulamin korzystania z kalkulatora kredytowego. Warunki użytkowania serwisu.",
};

export default function RegulaminPage() {
  return (
    <PageContainer>
      <ContentWrapper>
        <BackLink href="/">
          <BackArrow>←</BackArrow>
          <BackText>Powrót do kalkulatora</BackText>
        </BackLink>

        <Header>
          <Title>Regulamin</Title>
          <Subtitle>Warunki korzystania z kalkulatora kredytowego</Subtitle>
        </Header>

        <Content>
          <Section>
            <SectionTitle>§1. Postanowienia ogólne</SectionTitle>
            <Paragraph>
              1. Niniejszy regulamin określa zasady korzystania z kalkulatora
              kredytowego dostępnego na stronie internetowej.
            </Paragraph>
            <Paragraph>
              2. Kalkulator kredytowy służy wyłącznie celom informacyjnym i ma
              charakter orientacyjny.
            </Paragraph>
            <Paragraph>
              3. Korzystanie z kalkulatora jest bezpłatne i nie wymaga
              rejestracji.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>§2. Zakres usług</SectionTitle>
            <Paragraph>
              1. Kalkulator kredytowy umożliwia użytkownikom:
            </Paragraph>
            <List>
              <ListItem>
                Wyliczenie orientacyjnej wysokości raty kredytu hipotecznego
              </ListItem>
              <ListItem>Porównanie ofert kredytowych różnych banków</ListItem>
              <ListItem>Oszacowanie całkowitego kosztu kredytu</ListItem>
              <ListItem>
                Analizę wpływu wkładu własnego na warunki kredytu
              </ListItem>
            </List>
            <Paragraph>
              2. Wyniki kalkulacji mają charakter szacunkowy i nie stanowią
              oferty w rozumieniu Kodeksu cywilnego.
            </Paragraph>
            <Paragraph>
              3. Rzeczywiste warunki kredytu mogą się różnić od wyników
              kalkulacji i zależą od indywidualnej oceny zdolności kredytowej
              przez bank.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>§3. Odpowiedzialność</SectionTitle>
            <Paragraph>
              1. Administrator serwisu nie ponosi odpowiedzialności za:
            </Paragraph>
            <List>
              <ListItem>
                Decyzje finansowe podjęte na podstawie wyników kalkulacji
              </ListItem>
              <ListItem>
                Różnice między wynikami kalkulacji a rzeczywistymi warunkami
                oferowanymi przez banki
              </ListItem>
              <ListItem>
                Aktualizację danych ofert bankowych w czasie rzeczywistym
              </ListItem>
              <ListItem>
                Szkody powstałe w wyniku korzystania z kalkulatora
              </ListItem>
            </List>
            <Paragraph>
              2. Dane prezentowane w kalkulatorze są regularnie aktualizowane,
              jednak mogą różnić się od aktualnych ofert banków.
            </Paragraph>
            <Paragraph>
              3. Użytkownik powinien zawsze zweryfikować warunki kredytu
              bezpośrednio w banku przed podjęciem decyzji finansowej.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>§4. Dane osobowe</SectionTitle>
            <Paragraph>
              1. Kalkulator nie wymaga podawania danych osobowych do wykonania
              podstawowych obliczeń.
            </Paragraph>
            <Paragraph>
              2. Dane wprowadzane do kalkulatora (kwoty, okresy) nie są
              przechowywane na serwerze i pozostają tylko w przeglądarce
              użytkownika.
            </Paragraph>
            <Paragraph>
              3. Szczegółowe informacje o przetwarzaniu danych znajdują się w
              Polityce prywatności.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>§5. Własność intelektualna</SectionTitle>
            <Paragraph>
              1. Wszystkie treści zamieszczone na stronie, w tym kod
              kalkulatora, grafiki i teksty, są chronione prawem autorskim.
            </Paragraph>
            <Paragraph>
              2. Kopiowanie, modyfikowanie lub rozpowszechnianie zawartości
              serwisu bez zgody administratora jest zabronione.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>§6. Zmiany regulaminu</SectionTitle>
            <Paragraph>
              1. Administrator zastrzega sobie prawo do wprowadzania zmian w
              regulaminie.
            </Paragraph>
            <Paragraph>
              2. O zmianach użytkownicy zostaną poinformowani poprzez
              zamieszczenie nowej wersji regulaminu na stronie.
            </Paragraph>
            <Paragraph>
              3. Dalsze korzystanie z kalkulatora po wprowadzeniu zmian oznacza
              akceptację nowego regulaminu.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>§7. Postanowienia końcowe</SectionTitle>
            <Paragraph>
              1. W sprawach nieuregulowanych w niniejszym regulaminie mają
              zastosowanie przepisy prawa polskiego.
            </Paragraph>
            <Paragraph>
              2. Wszelkie spory wynikłe z korzystania z kalkulatora będą
              rozstrzygane przez właściwe sądy polskie.
            </Paragraph>
            <Paragraph>
              3. Regulamin wchodzi w życie z dniem publikacji na stronie.
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
