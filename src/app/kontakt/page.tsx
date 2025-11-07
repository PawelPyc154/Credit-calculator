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
        <HeroSection
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
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
        </HeroSection>

        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {/* Bento Grid - Asymmetric Layout */}
          <BentoGrid>
            {/* Large Card - Help Topics */}
            <HelpCard variants={cardVariants} whileHover="hover">
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
            </HelpCard>

            {/* Medium Card - Contact Info */}
            <ContactCard variants={cardVariants} whileHover="hover">
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
            </ContactCard>

            {/* Small Card - Response Time */}
            <TimeCard variants={cardVariants} whileHover="hover">
              <TimeCardIcon aria-hidden="true">⏱️</TimeCardIcon>
              <TimeCardTitle>Szybka odpowiedź</TimeCardTitle>
              <TimeCardText>
                Odpowiadamy na wszystkie zgłoszenia w ciągu{' '}
                <TimeHighlight>48 godzin roboczych</TimeHighlight>
              </TimeCardText>
            </TimeCard>

            {/* Wide Card - Cooperation */}
            <CooperationCard variants={cardVariants} whileHover="hover">
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
                    <CooperationItem
                      key={item.text}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <CooperationIcon aria-hidden="true">{item.icon}</CooperationIcon>
                      <CooperationText>{item.text}</CooperationText>
                    </CooperationItem>
                  ))}
                </CooperationGrid>
              </CardContent>
            </CooperationCard>

            {/* Info Card - Important Information */}
            <InfoCard variants={cardVariants} whileHover="hover">
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
            </InfoCard>
          </BentoGrid>

          {/* FAQ Section */}
          <FAQSection variants={cardVariants} aria-labelledby="faq-heading">
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
                <FAQItem
                  key={faq.q}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <Question>{faq.q}</Question>
                  <Answer>{faq.a}</Answer>
                </FAQItem>
              ))}
            </FAQGrid>
          </FAQSection>
        </motion.div>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  )
}

// Styled Components
const PageContainer = tw.div`min-h-screen bg-linear-to-b from-blue-50 via-white to-indigo-50`
const ContentWrapper = tw.div`mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20`

const BackLink = tw(Link)`
  -ml-2 mb-8 inline-flex items-center gap-2 rounded-lg px-2 py-1 font-medium text-blue-600 
  transition-all duration-200 hover:gap-3 hover:text-blue-700 
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
  sm:mb-10 lg:mb-12
`
const BackArrow = tw.span`text-xl transition-transform duration-200 group-hover:-translate-x-1`
const BackText = tw.span`text-sm sm:text-base`

// Hero Section
const HeroSection = tw(motion.section)`
  mb-12 rounded-3xl border border-blue-100 bg-linear-to-br from-blue-600 via-indigo-600 to-purple-600 
  p-8 shadow-xl sm:mb-16 sm:p-12 lg:mb-20 lg:p-16
`
const HeroContent = tw.div`mx-auto max-w-3xl text-center`
const HeroTitle = tw.h1`mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl`
const HeroDescription = tw.p`mb-10 text-lg leading-relaxed text-blue-100 sm:text-xl`
const HeroEmailWrapper = tw(
  motion.div,
)`mx-auto inline-flex items-center gap-3 rounded-2xl border-2 border-white/30 bg-white/10 px-6 py-4 backdrop-blur-sm transition-all duration-200 hover:bg-white/20 sm:gap-4 sm:px-8 sm:py-5`
const HeroEmailIcon = tw.span`text-2xl sm:text-3xl`
const HeroEmail = tw.a`text-xl font-semibold text-white no-underline transition-colors hover:text-blue-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 sm:text-2xl`
const HeroResponseTime = tw.p`mt-8 text-base text-blue-100 sm:text-lg`
const ResponseHighlight = tw.span`font-semibold text-white`

// Bento Grid Layout
const BentoGrid = tw.div`grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3`

// Card Variants
const HelpCard = tw(motion.div)`
  rounded-3xl border border-gray-100 bg-white/80 p-8 shadow-lg backdrop-blur-sm 
  transition-all duration-300 hover:border-blue-200 hover:shadow-xl 
  sm:p-10 lg:col-span-2 lg:row-span-2
`
const ContactCard = tw(motion.div)`
  rounded-3xl border border-gray-100 bg-white/80 p-8 shadow-lg backdrop-blur-sm 
  transition-all duration-300 hover:border-blue-200 hover:shadow-xl sm:p-10
`
const TimeCard = tw(motion.div)`
  rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50 to-indigo-50 p-8 shadow-lg 
  backdrop-blur-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl sm:p-10
`
const CooperationCard = tw(motion.div)`
  rounded-3xl border border-gray-100 bg-white/80 p-8 shadow-lg backdrop-blur-sm 
  transition-all duration-300 hover:border-blue-200 hover:shadow-xl 
  sm:p-10 lg:col-span-2
`
const InfoCard = tw(motion.div)`
  rounded-3xl border border-amber-100 bg-linear-to-br from-amber-50 to-orange-50 p-8 shadow-lg 
  backdrop-blur-sm transition-all duration-300 hover:border-amber-200 hover:shadow-xl 
  sm:p-10 lg:col-span-3
`

const CardHeader = tw.div`mb-6 flex items-center gap-4`
const CardIcon = tw.span`text-3xl`
const CardTitle = tw.h2`text-2xl font-bold text-gray-900`
const CardContent = tw.div`flex flex-col gap-5`

const HelpList = tw.ul`flex flex-col gap-4`
const IconWrapper = tw.span`
  mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full 
  bg-linear-to-br from-green-400 to-emerald-500 text-sm font-bold text-white 
  shadow-sm transition-transform duration-200 group-hover:scale-110
`
const HelpText = tw.span`pt-0.5 text-base leading-relaxed text-gray-700`

const Paragraph = tw.p`text-base leading-relaxed text-gray-700`

const CheckList = tw.ul`flex flex-col gap-3`
const CheckItem = tw.li`
  relative pl-7 text-base text-gray-700 
  before:absolute before:left-0 before:text-lg before:font-bold before:text-blue-600 before:content-['✓']
`

// Time Card
const TimeCardIcon = tw.span`mb-4 block text-4xl`
const TimeCardTitle = tw.h3`mb-3 text-xl font-bold text-gray-900`
const TimeCardText = tw.p`text-base leading-relaxed text-gray-700`
const TimeHighlight = tw.span`font-semibold text-blue-600`

// Cooperation
const CooperationGrid = tw.div`grid grid-cols-1 gap-4 sm:grid-cols-2`
const CooperationItem = tw(motion.div)`
  flex items-center gap-3 rounded-xl bg-blue-50/50 p-4 
  transition-colors duration-200 hover:bg-blue-100/50
`
const CooperationIcon = tw.span`shrink-0 text-2xl`
const CooperationText = tw.span`text-base font-medium text-gray-700`

// Info
const InfoGrid = tw.div`grid grid-cols-1 gap-5 sm:grid-cols-3`
const InfoItem = tw.div`flex items-start gap-3`
const InfoBullet = tw.span`mt-1 shrink-0 text-xs text-blue-500`
const InfoText = tw.p`text-base leading-relaxed text-gray-600`
const Strong = tw.strong`font-semibold text-gray-900`

// FAQ Section
const FAQSection = tw(motion.section)`
  mt-12 rounded-3xl border border-gray-100 bg-white/80 p-8 shadow-lg backdrop-blur-sm 
  sm:mt-16 sm:p-10 lg:p-12
`
const FAQTitle = tw.h2`
  mb-10 text-center text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 
  bg-clip-text text-transparent
`
const FAQGrid = tw.div`grid grid-cols-1 gap-6 sm:grid-cols-2`
const FAQItem = tw(motion.div)`
  rounded-xl border border-transparent p-5 transition-all duration-200 
  hover:border-blue-200 hover:bg-blue-50/50
`
const Question = tw.h3`
  mb-3 flex items-start gap-2 text-lg font-semibold text-gray-900 
  before:font-bold before:text-blue-600 before:content-['Q:']
`
const Answer = tw.p`pl-7 text-base leading-relaxed text-gray-600`
