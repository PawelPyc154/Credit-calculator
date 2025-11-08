'use client'

import { Footer } from 'components/calculator/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  HiChatBubbleLeftRight,
  HiClock,
  HiHandRaised,
  HiInformationCircle,
  HiCheck,
} from 'react-icons/hi2'
import {
  MdEmail,
  MdMailOutline,
  MdBarChart,
  MdBusiness,
  MdLink,
  MdBuild,
} from 'react-icons/md'
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
              <HeroEmailIcon aria-hidden="true">
                <MdMailOutline />
              </HeroEmailIcon>
              <HeroEmail
                href="mailto:kontakt@kalkulatorkredytowy.pl"
                aria-label="Wyślij email do kontakt@kalkulatorkredytowy.pl"
              >
                kontakt@kalkulatorkredytowy.pl
              </HeroEmail>
            </HeroEmailWrapper>
            <HeroResponseTime>
              <ResponseIcon aria-hidden="true">
                <MdEmail />
              </ResponseIcon>
              Odpowiadamy w ciągu <ResponseHighlight>48 godzin roboczych</ResponseHighlight>
            </HeroResponseTime>
          </HeroContent>
        </HeroSection>

        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {/* Bento Grid - Asymmetric Layout */}
          <BentoGrid>
            {/* Large Card - Help Topics */}
            <HelpCard variants={cardVariants} whileHover="hover">
              <CardHeader>
                <CardIcon aria-hidden="true">
                  <HiChatBubbleLeftRight />
                </CardIcon>
                <CardTitle>W czym możemy pomóc?</CardTitle>
              </CardHeader>
              <CardContent>
                <HelpDescription>
                  Jesteśmy tutaj, aby odpowiedzieć na Twoje pytania i pomóc w każdym aspekcie związanym z kalkulatorem kredytowym. Skontaktuj się z nami w sprawie:
                </HelpDescription>
                <HelpList role="list">
                  {[
                    'Pytania dotyczące kalkulatora i jego funkcji',
                    'Zgłaszanie błędów i problemów technicznych',
                    'Sugestie nowych funkcji i ulepszeń',
                    'Współpraca biznesowa i partnerstwa',
                    'Aktualizacja ofert bankowych i danych',
                    'Pytania dotyczące kredytów hipotecznych',
                    'Pomoc w interpretacji wyników kalkulacji',
                    'Problemy z wyświetlaniem lub działaniem strony',
                  ].map((text, index) => (
                    <motion.li
                      key={text}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="group flex items-start gap-3"
                    >
                      <IconWrapper aria-hidden="true">
                        <HiCheck />
                      </IconWrapper>
                      <HelpText>{text}</HelpText>
                    </motion.li>
                  ))}
                </HelpList>
              </CardContent>
            </HelpCard>

            {/* Medium Card - Contact Info */}
            <ContactCard variants={cardVariants} whileHover="hover">
              <CardHeader>
                <CardIcon aria-hidden="true">
                  <MdEmail />
                </CardIcon>
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
              <TimeCardIcon aria-hidden="true">
                <HiClock />
              </TimeCardIcon>
              <TimeCardTitle>Szybka odpowiedź</TimeCardTitle>
              <TimeCardText>
                Odpowiadamy na wszystkie zgłoszenia w ciągu{' '}
                <TimeHighlight>48 godzin roboczych</TimeHighlight>
              </TimeCardText>
            </TimeCard>

            {/* Wide Card - Cooperation */}
            <CooperationCard variants={cardVariants} whileHover="hover">
              <CardHeader>
                <CardIcon aria-hidden="true">
                  <HiHandRaised />
                </CardIcon>
                <CardTitle>Współpraca</CardTitle>
              </CardHeader>
              <CardContent>
                <Paragraph>
                  Jesteś zainteresowany współpracą? Skontaktuj się z nami w sprawie:
                </Paragraph>
                <CooperationGrid>
                  {[
                    { icon: MdBarChart, text: 'Partnerstwa z bankami' },
                    { icon: MdBusiness, text: 'Content marketing' },
                    { icon: MdLink, text: 'Współpraca SEO' },
                    { icon: MdBuild, text: 'Rozwój kalkulatora' },
                  ].map((item, index) => {
                    const IconComponent = item.icon
                    return (
                      <CooperationItem
                        key={item.text}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <CooperationIcon aria-hidden="true">
                          <IconComponent />
                        </CooperationIcon>
                        <CooperationText>{item.text}</CooperationText>
                      </CooperationItem>
                    )
                  })}
                </CooperationGrid>
              </CardContent>
            </CooperationCard>

            {/* Info Card - Important Information */}
            <InfoCard variants={cardVariants} whileHover="hover">
              <CardHeader>
                <CardIcon aria-hidden="true">
                  <HiInformationCircle />
                </CardIcon>
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
const PageContainer = tw.div`min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50`
const ContentWrapper = tw.div`mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16`

const BackLink = tw(Link)`
  group -ml-2 mb-6 inline-flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-green-600 
  transition-all duration-200 hover:gap-3 hover:bg-green-50 hover:text-green-700 
  focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
  sm:mb-8 lg:mb-10
`
const BackArrow = tw.span`text-xl transition-transform duration-200 group-hover:-translate-x-1`
const BackText = tw.span`text-sm sm:text-base`

// Hero Section
const HeroSection = tw(motion.section)`
  mb-10 rounded-3xl border border-green-100 bg-linear-to-r from-green-600 to-emerald-600 
  p-8 shadow-xl sm:mb-12 sm:p-10 lg:mb-16 lg:p-14
`
const HeroContent = tw.div`mx-auto max-w-3xl text-center`
const HeroTitle = tw.h1`mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl lg:mb-6`
const HeroDescription = tw.p`mb-8 text-base leading-relaxed text-green-50 sm:text-lg lg:mb-10`
const HeroEmailWrapper = tw(
  motion.div,
)`mx-auto inline-flex items-center gap-3 rounded-2xl border-2 border-white/30 bg-white/10 px-6 py-4 backdrop-blur-sm transition-all duration-200 hover:border-white/50 hover:bg-white/20 sm:gap-4 sm:px-8 sm:py-5`
const HeroEmailIcon = tw.span`flex items-center justify-center text-2xl sm:text-3xl`
const HeroEmail = tw.a`text-lg font-semibold text-white no-underline transition-colors hover:text-green-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600 sm:text-xl`
const HeroResponseTime = tw.p`mt-6 flex items-center justify-center gap-2 text-sm text-green-50 sm:text-base lg:mt-8`
const ResponseIcon = tw.span`flex items-center justify-center text-lg`
const ResponseHighlight = tw.span`font-semibold text-white`

// Bento Grid Layout
const BentoGrid = tw.div`grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8`

// Card Variants
const HelpCard = tw(motion.div)`
  rounded-2xl border border-gray-200 bg-white p-6 shadow-md 
  transition-all duration-300 hover:border-green-300 hover:shadow-lg 
  sm:p-8 lg:col-span-2 lg:row-span-2
`
const ContactCard = tw(motion.div)`
  rounded-2xl border border-gray-200 bg-white p-6 shadow-md 
  transition-all duration-300 hover:border-green-300 hover:shadow-lg sm:p-8
`
const TimeCard = tw(motion.div)`
  rounded-2xl border border-green-200 bg-linear-to-br from-green-50 to-emerald-50 p-6 shadow-md 
  transition-all duration-300 hover:border-green-300 hover:shadow-lg sm:p-8
`
const CooperationCard = tw(motion.div)`
  rounded-2xl border border-gray-200 bg-white p-6 shadow-md 
  transition-all duration-300 hover:border-green-300 hover:shadow-lg 
  sm:p-8 lg:col-span-2
`
const InfoCard = tw(motion.div)`
  rounded-2xl border border-amber-200 bg-linear-to-br from-amber-50 to-yellow-50 p-6 shadow-md 
  transition-all duration-300 hover:border-amber-300 hover:shadow-lg 
  sm:p-8 lg:col-span-3
`

const CardHeader = tw.div`mb-5 flex items-center gap-3 sm:mb-6 sm:gap-4`
const CardIcon = tw.span`flex items-center justify-center text-2xl sm:text-3xl text-green-600`
const CardTitle = tw.h2`text-xl font-bold text-gray-900 sm:text-2xl`
const CardContent = tw.div`flex flex-col gap-4 sm:gap-5`

const HelpDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600 sm:text-base sm:mb-5`
const HelpList = tw.ul`flex flex-col gap-3 sm:gap-4`
const IconWrapper = tw.span`
  mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full 
  bg-linear-to-br from-green-500 to-emerald-600 text-white 
  shadow-sm transition-transform duration-200 group-hover:scale-110
`
const HelpText = tw.span`pt-0.5 text-sm leading-relaxed text-gray-700 sm:text-base`

const Paragraph = tw.p`text-sm leading-relaxed text-gray-700 sm:text-base`

const CheckList = tw.ul`flex flex-col gap-2.5 sm:gap-3`
const CheckItem = tw.li`
  relative pl-6 text-sm text-gray-700 sm:pl-7 sm:text-base
  before:absolute before:left-0 before:text-base before:font-bold before:text-green-600 before:content-['✓'] sm:before:text-lg
`

// Time Card
const TimeCardIcon = tw.span`mb-3 flex items-center justify-center text-3xl text-green-600 sm:mb-4 sm:text-4xl`
const TimeCardTitle = tw.h3`mb-2 text-lg font-bold text-gray-900 sm:mb-3 sm:text-xl`
const TimeCardText = tw.p`text-sm leading-relaxed text-gray-700 sm:text-base`
const TimeHighlight = tw.span`font-semibold text-green-600`

// Cooperation
const CooperationGrid = tw.div`grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4`
const CooperationItem = tw(motion.div)`
  flex items-center gap-3 rounded-xl bg-green-50/70 p-3.5 
  transition-colors duration-200 hover:bg-green-100/70 sm:p-4
`
const CooperationIcon = tw.span`shrink-0 flex items-center justify-center text-xl text-green-600 sm:text-2xl`
const CooperationText = tw.span`text-sm font-medium text-gray-700 sm:text-base`

// Info
const InfoGrid = tw.div`grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5`
const InfoItem = tw.div`flex items-start gap-2.5 sm:gap-3`
const InfoBullet = tw.span`mt-1 shrink-0 text-xs text-green-600`
const InfoText = tw.p`text-sm leading-relaxed text-gray-600 sm:text-base`
const Strong = tw.strong`font-semibold text-gray-900`

// FAQ Section
const FAQSection = tw(motion.section)`
  mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-md 
  sm:mt-12 sm:p-8 lg:p-10
`
const FAQTitle = tw.h2`
  mb-8 text-center text-2xl font-bold bg-linear-to-r from-green-600 to-emerald-600 
  bg-clip-text text-transparent sm:mb-10 sm:text-3xl
`
const FAQGrid = tw.div`grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6`
const FAQItem = tw(motion.div)`
  rounded-xl border border-transparent p-4 transition-all duration-200 
  hover:border-green-200 hover:bg-green-50/50 sm:p-5
`
const Question = tw.h3`
  mb-2 flex items-start gap-2 text-base font-semibold text-gray-900 
  before:font-bold before:text-green-600 before:content-['Q:'] sm:mb-3 sm:text-lg
`
const Answer = tw.p`pl-6 text-sm leading-relaxed text-gray-600 sm:pl-7 sm:text-base`
