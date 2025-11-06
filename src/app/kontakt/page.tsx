'use client'

import { Footer } from 'components/calculator/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import tw from 'tw-tailwind'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
  hover: {
    y: -4,
    transition: {
      duration: 0.2,
      ease: 'easeOut' as const,
    },
  },
}

export default function KontaktPage() {
  return (
    <PageContainer>
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <BackLink href="/" aria-label="Powrót do strony głównej">
            <BackArrow aria-hidden="true">←</BackArrow>
            <BackText>Powrót do kalkulatora</BackText>
          </BackLink>
        </motion.div>

        {/* Hero Section - Full Width */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 rounded-3xl border border-blue-100 bg-linear-to-br from-blue-600 via-indigo-600 to-purple-600 p-8 shadow-xl sm:mb-14 sm:p-12 lg:mb-16 lg:p-16"
        >
          <HeroContent>
            <HeroTitle>Skontaktuj się z nami</HeroTitle>
            <HeroDescription>
              Masz pytania dotyczące kalkulatora? Chcesz zgłosić błąd lub zaproponować nową funkcję?
              Jesteśmy tutaj, aby pomóc!
            </HeroDescription>
            <HeroEmailWrapper whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <HeroEmailIcon aria-hidden="true">✉️</HeroEmailIcon>
              <HeroEmail
                href="mailto:kontakt@kalkulatorkredytowy.pl"
                aria-label="Wyślij email do kontakt@kalkulatorkredytowy.pl"
              >
                kontakt@kalkulatorkredytowy.pl
              </HeroEmail>
            </HeroEmailWrapper>
            <HeroResponseTime>
              📬 Odpowiadamy w ciągu <ResponseHighlight>48 godzin roboczych</ResponseHighlight>
            </HeroResponseTime>
          </HeroContent>
        </motion.section>

        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {/* Bento Grid - Asymmetric Layout */}
          <BentoGrid>
            {/* Large Card - Help Topics */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-blue-200 hover:shadow-xl sm:rounded-3xl sm:p-8 lg:col-span-2 lg:row-span-2"
            >
              <CardHeader>
                <CardIcon aria-hidden="true">💬</CardIcon>
                <CardTitle>W czym możemy pomóc?</CardTitle>
              </CardHeader>
              <CardContent>
                <HelpList role="list">
                  {[
                    'Pytania dotyczące kalkulatora',
                    'Zgłaszanie błędów i problemów',
                    'Sugestie nowych funkcji',
                    'Współpraca biznesowa',
                    'Aktualizacja ofert bankowych',
                  ].map((text, index) => (
                    <motion.li
                      key={text}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="group flex items-start gap-3"
                    >
                      <IconWrapper aria-hidden="true">✓</IconWrapper>
                      <HelpText>{text}</HelpText>
                    </motion.li>
                  ))}
                </HelpList>
              </CardContent>
            </motion.div>

            {/* Medium Card - Contact Info */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-blue-200 hover:shadow-xl sm:rounded-3xl sm:p-8"
            >
              <CardHeader>
                <CardIcon aria-hidden="true">📧</CardIcon>
                <CardTitle>Jak się skontaktować</CardTitle>
              </CardHeader>
              <CardContent>
                <Paragraph>W wiadomości prosimy podać:</Paragraph>
                <CheckList role="list">
                  {[
                    'Temat zgłoszenia',
                    'Szczegółowy opis sprawy',
                    'Kroki do odtworzenia (w przypadku błędów)',
                    'Zrzuty ekranu (opcjonalnie)',
                  ].map((item) => (
                    <CheckItem key={item}>{item}</CheckItem>
                  ))}
                </CheckList>
              </CardContent>
            </motion.div>

            {/* Small Card - Response Time */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="rounded-2xl border border-blue-100 bg-linear-to-br from-blue-50 to-indigo-50 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl sm:rounded-3xl sm:p-8"
            >
              <TimeCardIcon aria-hidden="true">⏱️</TimeCardIcon>
              <TimeCardTitle>Szybka odpowiedź</TimeCardTitle>
              <TimeCardText>
                Odpowiadamy na wszystkie zgłoszenia w ciągu{' '}
                <TimeHighlight>48 godzin roboczych</TimeHighlight>
              </TimeCardText>
            </motion.div>

            {/* Wide Card - Cooperation */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-blue-200 hover:shadow-xl sm:rounded-3xl sm:p-8 lg:col-span-2"
            >
              <CardHeader>
                <CardIcon aria-hidden="true">🤝</CardIcon>
                <CardTitle>Współpraca</CardTitle>
              </CardHeader>
              <CardContent>
                <Paragraph>
                  Jesteś zainteresowany współpracą? Skontaktuj się z nami w sprawie:
                </Paragraph>
                <CooperationGrid>
                  {[
                    { icon: '📊', text: 'Partnerstwa z bankami' },
                    { icon: '💼', text: 'Content marketing' },
                    { icon: '🔗', text: 'Współpraca SEO' },
                    { icon: '🛠️', text: 'Rozwój kalkulatora' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.text}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-center gap-3 rounded-xl bg-blue-50/50 p-4 transition-colors duration-200 hover:bg-blue-100/50"
                    >
                      <CooperationIcon aria-hidden="true">{item.icon}</CooperationIcon>
                      <CooperationText>{item.text}</CooperationText>
                    </motion.div>
                  ))}
                </CooperationGrid>
              </CardContent>
            </motion.div>

            {/* Info Card - Important Information */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="rounded-2xl border border-amber-100 bg-linear-to-br from-amber-50 to-orange-50 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-amber-200 hover:shadow-xl sm:rounded-3xl sm:p-8 lg:col-span-3"
            >
              <CardHeader>
                <CardIcon aria-hidden="true">ℹ️</CardIcon>
                <CardTitle>Ważne informacje</CardTitle>
              </CardHeader>
              <CardContent>
                <InfoGrid>
                  {[
                    {
                      title: 'Nie jesteśmy bankiem',
                      text: 'nie udzielamy kredytów ani nie oferujemy pośrednictwa kredytowego.',
                    },
                    {
                      title: 'Nie zbieramy danych',
                      text: 'kalkulator działa lokalnie w Twojej przeglądarce.',
                    },
                    {
                      title: 'Wyniki są orientacyjne',
                      text: 'rzeczywiste warunki zależą od oceny banku.',
                    },
                  ].map((info) => (
                    <InfoItem key={info.title}>
                      <InfoBullet aria-hidden="true">●</InfoBullet>
                      <InfoText>
                        <Strong>{info.title}</Strong> - {info.text}
                      </InfoText>
                    </InfoItem>
                  ))}
                </InfoGrid>
              </CardContent>
            </motion.div>
          </BentoGrid>

          {/* FAQ Section */}
          <motion.section
            variants={cardVariants}
            aria-labelledby="faq-heading"
            className="mt-8 rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-lg backdrop-blur-sm sm:mt-12 sm:rounded-3xl sm:p-8 lg:p-10"
          >
            <FAQTitle id="faq-heading">Najczęściej zadawane pytania</FAQTitle>
            <FAQGrid>
              {[
                {
                  q: 'Czy kalkulator jest darmowy?',
                  a: 'Tak, kalkulator jest całkowicie darmowy i nie wymaga rejestracji.',
                },
                {
                  q: 'Czy muszę podawać dane osobowe?',
                  a: 'Nie, kalkulator działa bez podawania danych osobowych. Wszystkie obliczenia są wykonywane lokalnie w Twojej przeglądarce.',
                },
                {
                  q: 'Czy mogę uzyskać kredyt przez kalkulator?',
                  a: 'Nie, kalkulator służy tylko do porównania ofert. W celu uzyskania kredytu należy skontaktować się bezpośrednio z bankiem.',
                },
                {
                  q: 'Jak często aktualizujecie dane bankowe?',
                  a: 'Dane są aktualizowane regularnie, jednak zalecamy weryfikację warunków bezpośrednio w banku.',
                },
              ].map((faq, index) => (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="rounded-xl border border-transparent p-4 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/50 sm:p-5"
                >
                  <Question>{faq.q}</Question>
                  <Answer>{faq.a}</Answer>
                </motion.div>
              ))}
            </FAQGrid>
          </motion.section>
        </motion.div>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  )
}

// Styled Components
const PageContainer = tw.div`min-h-screen bg-linear-to-b from-blue-50 via-white to-indigo-50`
const ContentWrapper = tw.div`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16`

const BackLink = tw(Link)`
  inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 
  font-medium mb-6 sm:mb-8 transition-all duration-200 
  hover:gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 
  focus:ring-offset-2 rounded-lg px-2 py-1 -ml-2
`
const BackArrow = tw.span`text-xl transition-transform duration-200 group-hover:-translate-x-1`
const BackText = tw.span`text-sm sm:text-base`

const Title = tw.h1`
  text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold 
  bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 
  bg-clip-text text-transparent mb-3 sm:mb-4
`
const Subtitle = tw.p`text-base sm:text-lg md:text-xl text-gray-600`

const ContactGrid = tw.div`grid lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12`
const InfoSection = tw.div`flex flex-col gap-6`
const FormSection = tw.div`flex flex-col gap-6`

const CardHeader = tw.div`flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6`
const CardIcon = tw.span`text-2xl sm:text-3xl`
const CardTitle = tw.h2`text-xl sm:text-2xl font-bold text-gray-900`
const CardContent = tw.div`space-y-4`

const ContactItem = tw.div`pb-4 border-b border-gray-100 last:border-0 last:pb-0`
const ContactLabel = tw.div`text-xs sm:text-sm font-medium text-gray-500 mb-1.5`
const ContactValue = tw.div`text-base sm:text-lg text-gray-900`
const EmailLink = tw.a`
  text-blue-600 hover:text-blue-700 underline decoration-2 
  underline-offset-2 transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded
`
const TimeHighlight = tw.span`font-semibold text-blue-600`

const HelpList = tw.ul`flex flex-col gap-3`
const IconWrapper = tw.span`
  shrink-0 w-6 h-6 bg-linear-to-br from-green-400 to-emerald-500 
  text-white rounded-full flex items-center justify-center text-sm font-bold 
  shadow-sm group-hover:scale-110 transition-transform duration-200
`
const HelpText = tw.span`text-sm sm:text-base text-gray-700 pt-0.5 leading-relaxed`

const InfoBox = tw.div`flex flex-col gap-4`
const InfoItem = tw.div`flex items-start gap-3`
const InfoBullet = tw.span`text-blue-500 text-xs mt-1 shrink-0`
const InfoText = tw.p`text-sm sm:text-base text-gray-600 leading-relaxed`
const Strong = tw.strong`font-semibold text-gray-900`

const Paragraph = tw.p`text-sm sm:text-base text-gray-700 leading-relaxed`

const CheckList = tw.ul`flex flex-col gap-2.5 my-4`
const CheckItem = tw.li`
  text-sm sm:text-base text-gray-700 pl-6 relative 
  before:content-['✓'] before:absolute before:left-0 
  before:text-blue-600 before:font-bold before:text-lg
`

const CooperationList = tw.ul`flex flex-col gap-3 sm:gap-4 my-5`
const CooperationIcon = tw.span`text-xl sm:text-2xl shrink-0`

const HighlightParagraph = tw.p`
  text-sm sm:text-base text-gray-700 leading-relaxed 
  mt-4 p-4 bg-linear-to-r from-amber-50 to-orange-50 
  rounded-xl border-l-4 border-amber-400
`

const FAQTitle = tw.h2`
  text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 
  text-center bg-linear-to-r from-blue-600 to-purple-600 
  bg-clip-text text-transparent
`
const FAQGrid = tw.div`grid sm:grid-cols-2 gap-6`
const Question = tw.h3`text-base sm:text-lg font-semibold text-gray-900 mb-2 flex items-start gap-2 before:content-['Q:'] before:text-blue-600 before:font-bold`
const Answer = tw.p`text-sm sm:text-base text-gray-600 leading-relaxed pl-6`

// Hero Section
const HeroContent = tw.div`max-w-3xl`
const HeroTitle = tw.h1`mb-4 font-bold text-4xl text-white sm:text-5xl lg:text-6xl`
const HeroDescription = tw.p`mb-8 text-blue-100 text-lg leading-relaxed sm:text-xl`
const HeroEmailWrapper = tw(
  motion.div,
)`inline-flex items-center gap-3 rounded-2xl border-2 border-white/30 bg-white/10 px-6 py-4 backdrop-blur-sm transition-all duration-200 hover:bg-white/20 sm:gap-4 sm:px-8 sm:py-5`
const HeroEmailIcon = tw.span`text-2xl sm:text-3xl`
const HeroEmail = tw.a`font-semibold text-white text-xl no-underline transition-colors hover:text-blue-100 sm:text-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600`
const HeroResponseTime = tw.p`mt-6 text-blue-100 text-base sm:text-lg`
const ResponseHighlight = tw.span`font-semibold text-white`

// Bento Grid Layout
const BentoGrid = tw.div`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8`

// Time Card
const TimeCardIcon = tw.span`mb-3 block text-4xl`
const TimeCardTitle = tw.h3`mb-2 font-bold text-gray-900 text-xl`
const TimeCardText = tw.p`text-gray-700 text-base leading-relaxed`

// Cooperation Grid
const CooperationGrid = tw.div`mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2`
const CooperationText = tw.span`font-medium text-gray-700 text-sm sm:text-base`

// Info Grid
const InfoGrid = tw.div`grid grid-cols-1 gap-4 sm:grid-cols-3`
