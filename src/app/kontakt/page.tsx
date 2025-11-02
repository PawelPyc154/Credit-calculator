import { Footer } from "components/calculator/Footer";
import type { Metadata } from "next";
import Link from "next/link";
import tw from "tw-tailwind";

export const metadata: Metadata = {
  title: "Kontakt - Kalkulator Kredytowy",
  description:
    "Skontaktuj się z nami w sprawie kalkulatora kredytowego. Pytania, sugestie, współpraca.",
};

export default function KontaktPage() {
  return (
    <PageContainer>
      <ContentWrapper>
        <BackLink href="/">
          <BackArrow>←</BackArrow>
          <BackText>Powrót do kalkulatora</BackText>
        </BackLink>

        <Header>
          <Title>Kontakt</Title>
          <Subtitle>Masz pytania? Skontaktuj się z nami</Subtitle>
        </Header>

        <ContactGrid>
          <InfoSection>
            <Card>
              <CardTitle>Dane kontaktowe</CardTitle>
              <CardContent>
                <ContactItem>
                  <ContactLabel>Email:</ContactLabel>
                  <ContactValue>
                    <EmailLink href="mailto:kontakt@kalkulatorkredytowy.pl">
                      kontakt@kalkulatorkredytowy.pl
                    </EmailLink>
                  </ContactValue>
                </ContactItem>

                <ContactItem>
                  <ContactLabel>Czas odpowiedzi:</ContactLabel>
                  <ContactValue>Do 48 godzin roboczych</ContactValue>
                </ContactItem>
              </CardContent>
            </Card>

            <Card>
              <CardTitle>W czym możemy pomóc?</CardTitle>
              <CardContent>
                <HelpList>
                  <HelpItem>
                    <IconWrapper>✓</IconWrapper>
                    <HelpText>Pytania dotyczące kalkulatora</HelpText>
                  </HelpItem>
                  <HelpItem>
                    <IconWrapper>✓</IconWrapper>
                    <HelpText>Zgłaszanie błędów i problemów</HelpText>
                  </HelpItem>
                  <HelpItem>
                    <IconWrapper>✓</IconWrapper>
                    <HelpText>Sugestie nowych funkcji</HelpText>
                  </HelpItem>
                  <HelpItem>
                    <IconWrapper>✓</IconWrapper>
                    <HelpText>Współpraca biznesowa</HelpText>
                  </HelpItem>
                  <HelpItem>
                    <IconWrapper>✓</IconWrapper>
                    <HelpText>Aktualizacja ofert bankowych</HelpText>
                  </HelpItem>
                </HelpList>
              </CardContent>
            </Card>

            <Card>
              <CardTitle>Ważne informacje</CardTitle>
              <CardContent>
                <InfoBox>
                  <InfoText>
                    <Strong>Nie jesteśmy bankiem</Strong> - nie udzielamy
                    kredytów ani nie oferujemy pośrednictwa kredytowego.
                  </InfoText>
                  <InfoText>
                    <Strong>Nie zbieramy danych</Strong> - kalkulator działa
                    lokalnie w Twojej przeglądarce. Nie przechowujemy
                    wprowadzanych przez Ciebie danych.
                  </InfoText>
                  <InfoText>
                    <Strong>Wyniki są orientacyjne</Strong> - rzeczywiste
                    warunki kredytu zależą od indywidualnej oceny przez bank.
                  </InfoText>
                </InfoBox>
              </CardContent>
            </Card>
          </InfoSection>

          <FormSection>
            <Card>
              <CardTitle>Formularz kontaktowy</CardTitle>
              <CardContent>
                <Paragraph>
                  Jeśli masz pytania, sugestie lub chciałbyś zgłosić błąd,
                  wyślij nam wiadomość na adres:
                </Paragraph>
                <EmailDisplay>kontakt@kalkulatorkredytowy.pl</EmailDisplay>
                <Paragraph>W wiadomości prosimy podać:</Paragraph>
                <CheckList>
                  <CheckItem>Temat zgłoszenia</CheckItem>
                  <CheckItem>Szczegółowy opis sprawy</CheckItem>
                  <CheckItem>
                    W przypadku błędów: kroki do ich odtworzenia
                  </CheckItem>
                  <CheckItem>
                    Opcjonalnie: zrzuty ekranu lub logi błędów
                  </CheckItem>
                </CheckList>
                <Paragraph>
                  Odpowiadamy na wszystkie zgłoszenia w ciągu 48 godzin
                  roboczych.
                </Paragraph>
              </CardContent>
            </Card>

            <Card>
              <CardTitle>Współpraca</CardTitle>
              <CardContent>
                <Paragraph>
                  Jesteś zainteresowany współpracą? Skontaktuj się z nami w
                  sprawie:
                </Paragraph>
                <CooperationList>
                  <CooperationItem>
                    📊 Partnerstwa z bankami i instytucjami finansowymi
                  </CooperationItem>
                  <CooperationItem>
                    💼 Umieszczenia reklam i content marketingu
                  </CooperationItem>
                  <CooperationItem>
                    🔗 Wymiany linków i współpracy SEO
                  </CooperationItem>
                  <CooperationItem>
                    🛠️ Rozwoju kalkulatora i nowych funkcji
                  </CooperationItem>
                </CooperationList>
                <Paragraph>
                  Chętnie omówimy warunki współpracy dostosowane do Twoich
                  potrzeb.
                </Paragraph>
              </CardContent>
            </Card>
          </FormSection>
        </ContactGrid>

        <FAQSection>
          <FAQTitle>Najczęściej zadawane pytania</FAQTitle>
          <FAQGrid>
            <FAQItem>
              <Question>Czy kalkulator jest darmowy?</Question>
              <Answer>
                Tak, kalkulator jest całkowicie darmowy i nie wymaga
                rejestracji.
              </Answer>
            </FAQItem>
            <FAQItem>
              <Question>Czy muszę podawać dane osobowe?</Question>
              <Answer>
                Nie, kalkulator działa bez podawania danych osobowych. Wszystkie
                obliczenia są wykonywane lokalnie w Twojej przeglądarce.
              </Answer>
            </FAQItem>
            <FAQItem>
              <Question>Czy mogę uzyskać kredyt przez kalkulator?</Question>
              <Answer>
                Nie, kalkulator służy tylko do porównania ofert. W celu
                uzyskania kredytu należy skontaktować się bezpośrednio z
                bankiem.
              </Answer>
            </FAQItem>
            <FAQItem>
              <Question>Jak często aktualizujecie dane bankowe?</Question>
              <Answer>
                Dane są aktualizowane regularnie, jednak zalecamy weryfikację
                warunków bezpośrednio w banku.
              </Answer>
            </FAQItem>
          </FAQGrid>
        </FAQSection>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
}

const PageContainer = tw.div`min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50`;
const ContentWrapper = tw.div`max-w-7xl mx-auto px-4 py-12`;
const BackLink = tw(
  Link
)`inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors`;
const BackArrow = tw.span`text-xl`;
const BackText = tw.span``;
const Header = tw.header`text-center mb-12`;
const Title = tw.h1`text-4xl md:text-5xl font-bold text-gray-900 mb-4`;
const Subtitle = tw.p`text-lg text-gray-600`;
const ContactGrid = tw.div`grid md:grid-cols-2 gap-8 mb-12`;
const InfoSection = tw.div`space-y-6`;
const FormSection = tw.div`space-y-6`;
const Card = tw.div`bg-white rounded-2xl shadow-sm border border-gray-200 p-6`;
const CardTitle = tw.h2`text-2xl font-bold text-gray-900 mb-4`;
const CardContent = tw.div``;
const ContactItem = tw.div`mb-4 last:mb-0`;
const ContactLabel = tw.div`text-sm font-medium text-gray-500 mb-1`;
const ContactValue = tw.div`text-gray-900`;
const EmailLink = tw.a`text-blue-600 hover:text-blue-700 underline`;
const HelpList = tw.ul`space-y-3`;
const HelpItem = tw.li`flex items-start gap-3`;
const IconWrapper = tw.span`shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold`;
const HelpText = tw.span`text-gray-700 pt-0.5`;
const InfoBox = tw.div`space-y-3`;
const InfoText = tw.p`text-sm text-gray-600 leading-relaxed`;
const Strong = tw.strong`font-semibold text-gray-900`;
const Paragraph = tw.p`text-gray-700 leading-relaxed mb-4`;
const EmailDisplay = tw.div`text-xl font-semibold text-blue-600 py-4 px-6 bg-blue-50 rounded-lg text-center mb-4`;
const CheckList = tw.ul`space-y-2 mb-4`;
const CheckItem = tw.li`text-gray-700 pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-blue-600 before:font-bold`;
const CooperationList = tw.ul`space-y-3 mb-4`;
const CooperationItem = tw.li`text-gray-700 pl-2`;
const FAQSection = tw.section`bg-white rounded-2xl shadow-sm border border-gray-200 p-8`;
const FAQTitle = tw.h2`text-3xl font-bold text-gray-900 mb-8 text-center`;
const FAQGrid = tw.div`grid md:grid-cols-2 gap-6`;
const FAQItem = tw.div``;
const Question = tw.h3`text-lg font-semibold text-gray-900 mb-2`;
const Answer = tw.p`text-gray-600 leading-relaxed`;
