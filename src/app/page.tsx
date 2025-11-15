import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowRight,
  HiOutlineChartBar,
  HiOutlineCheck,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineCollection,
  HiOutlineCurrencyDollar,
  HiOutlineOfficeBuilding,
  HiOutlineRefresh,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
} from 'react-icons/hi'
import { HiOutlineExclamationTriangle } from 'react-icons/hi2'
import tw from 'tw-tailwind'
import { filterPublishedPosts, sortPostsByDate } from 'utils/blog-posts'
import { allBlogPosts } from 'utils/blog-posts-data'

const features = [
  {
    title: 'Aktualne dane banków',
    description:
      'Oferty weryfikujemy automatycznie, abyś widział aktualne marże, prowizje i koszty dodatkowe.',
    icon: HiOutlineRefresh,
    bullets: [
      'Codzienna synchronizacja z największymi bankami w Polsce',
      'Alerty przy zmianach marży lub prowizji w ofercie',
      'Historia aktualizacji dla pełnej transparentności',
    ],
  },
  {
    title: 'Porównanie i kalkulacja',
    description:
      'Połącz precyzyjne wyliczenie rat z rankingiem banków dobranych do Twojej sytuacji finansowej.',
    icon: HiOutlineChartBar,
    bullets: [
      'Ranking według raty, kosztu całkowitego i wskaźnika RRSO',
      'Uwzględnienie kosztów dodatkowych i wymaganych ubezpieczeń',
      'Możliwość zapisania symulacji do późniejszego porównania',
    ],
  },
  {
    title: 'Scenariusze na przyszłość',
    description:
      'Próbuj różnych parametrów, aby sprawdzić wpływ wkładu własnego, okresu spłaty czy oprocentowania.',
    icon: HiOutlineSparkles,
    bullets: [
      'Symulacje dla różnych wkładów własnych i okresów kredytowania',
      'Analiza wpływu zmian stóp procentowych na ratę',
      "Szybkie porównanie scenariuszy 'co jeśli' dla decyzji finansowych",
    ],
  },
]

const steps = [
  {
    title: 'Podaj podstawowe dane',
    description:
      'Kwota kredytu, wkład własny oraz dochody wystarczą, aby przygotować indywidualne wyliczenia.',
    subpoints: [
      'Możesz wprowadzić szczegóły ręcznie lub skorzystać z wygodnych suwaków.',
      'Widzisz na bieżąco, jak zmiana wkładu własnego wpływa na wysokość raty.',
    ],
  },
  {
    title: 'Zobacz porównanie banków',
    description:
      'Ranking uwzględnia raty, koszt całkowity oraz dodatkowe warunki, które mogą mieć wpływ na decyzję.',
    subpoints: [
      'Filtruj oferty według marży, prowizji lub wymaganych ubezpieczeń.',
      'Sprawdź, które banki najlepiej pasują do Twojego profilu finansowego.',
    ],
  },
  {
    title: 'Skontaktuj się lub zapisz wynik',
    description:
      'Łatwo odświeżysz wyliczenia lub udostępnisz je doradcy — wkrótce dodamy kolejne kalkulatory.',
    subpoints: [
      'Eksportuj symulację do PDF lub zapisz ją w koncie użytkownika.',
      'Wkrótce: bezpośrednia rozmowa z doradcą na podstawie Twojego scenariusza.',
    ],
  },
]

const heroHighlights = [
  { icon: HiOutlineCollection, label: 'Ponad 30 parametrów branych pod uwagę' },
  { icon: HiOutlineRefresh, label: 'Codzienna synchronizacja danych banków' },
  { icon: HiOutlineChartBar, label: 'Porównanie ofert w oparciu o Twoje dane' },
]

const stats = [
  {
    value: '15+',
    label: 'banków w bazie',
    description: 'Regularnie aktualizowane oferty największych instytucji finansowych w Polsce.',
    icon: HiOutlineOfficeBuilding,
  },
  {
    value: '< 60 s',
    label: 'czas symulacji',
    description: 'Tyle zajmuje przygotowanie pierwszego zestawienia dopasowanego do Twoich danych.',
    icon: HiOutlineClock,
  },
  {
    value: '0 zł',
    label: 'koszt korzystania',
    description: 'Kalkulator jest darmowy – płacisz dopiero bankowi po podpisaniu umowy.',
    icon: HiOutlineCurrencyDollar,
  },
  {
    value: '98%',
    label: 'dokładność wyliczeń',
    description:
      'Porównanie wyników z realnymi ofertami potwierdza wysoką zgodność naszych symulacji.',
    icon: HiOutlineShieldCheck,
  },
]

const faqs = [
  {
    question: 'Skąd pochodzą dane o ofertach banków?',
    answer:
      'Korzystamy z automatycznych integracji z bankami oraz cyklicznej weryfikacji ręcznej. Dodatkowo, system oznacza ostatnią aktualizację każdej oferty.',
  },
  {
    question: 'Czy kalkulator uwzględnia prowizje i ubezpieczenia?',
    answer:
      'Tak. W zestawieniu uwzględniamy koszty dodatkowe, które banki wymagają przy podpisaniu umowy, w tym ubezpieczenia na życie, pomostowe i opłatę przygotowawczą.',
  },
  {
    question: 'Czy mogę zapisać lub udostępnić wyliczenie doradcy?',
    answer:
      'Wyliczenia możesz wyeksportować w formie przejrzystego podsumowania. Pracujemy także nad możliwością udostępnienia scenariusza poprzez zabezpieczony link.',
  },
]

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

// Pobierz ostatnie 3 opublikowane artykuły dla strony głównej
const getLatestBlogPosts = () => {
  const published = sortPostsByDate(filterPublishedPosts(allBlogPosts))
  return published.slice(0, 3)
}

export const metadata: Metadata = {
  title: 'Kalkulator kredytu hipotecznego | Porównaj raty i oferty banków',
  description:
    'Policz ratę kredytu hipotecznego, porównaj aktualne oferty banków i sprawdź całkowite koszty finansowania – szybko i bez pozostawiania danych.',
  alternates: {
    canonical: siteUrl,
  },
  keywords: [
    'kalkulator kredytu hipotecznego',
    'porównanie kredytów',
    'rata kredytu',
    'oferty banków',
    'koszt kredytu',
  ],
  openGraph: {
    title: 'Kalkulator kredytu hipotecznego | Porównaj raty i oferty banków',
    description:
      'Oblicz raty, koszty dodatkowe i porównaj oferty banków w jednym miejscu. Aktualne dane i przejrzyste symulacje kredytu hipotecznego.',
    url: siteUrl,
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Kalkulator kredytu hipotecznego',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kalkulator kredytu hipotecznego',
    description:
      'Sprawdź, ile naprawdę zapłacisz za kredyt hipoteczny i porównaj oferty banków w kilka minut.',
    images: [`${siteUrl}/og-image.jpg`],
  },
}

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
}

const howToStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Jak obliczyć ratę kredytu hipotecznego online',
  description:
    'Dowiedz się, jak w trzech krokach przygotować symulację kredytu hipotecznego i porównać oferty banków.',
  totalTime: 'PT5M',
  supply: 'Aktualne dane banków i podstawowe informacje finansowe użytkownika',
  tool: 'Kalkulator kredytu hipotecznego online',
  step: steps.map(({ title, description, subpoints }, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: title,
    text: description,
    itemListElement: subpoints.map((point) => ({
      '@type': 'HowToDirection',
      text: point,
    })),
  })),
  image: `${siteUrl}/og-image.jpg`,
  url: siteUrl,
}

export default function LandingPage() {
  const faqJsonLd = toJsonLd(faqStructuredData)
  const howToJsonLd = toJsonLd(howToStructuredData)
  const blogPosts = getLatestBlogPosts()

  return (
    <MainWrapper>
      {/* Structured data: FAQ */}
      <script type="application/ld+json" suppressHydrationWarning>
        {faqJsonLd}
      </script>
      {/* Structured data: HowTo */}
      <script type="application/ld+json" suppressHydrationWarning>
        {howToJsonLd}
      </script>
      <HeroSection>
        <HeroGlow />
        <HeroPattern aria-hidden />
        <HeroContent>
          <HeroBadge>Nowość • Kredyt hipoteczny bez zgadywania</HeroBadge>
          <HeroTitle>Oblicz ratę kredytu hipotecznego i porównaj oferty w jednym miejscu</HeroTitle>
          <HeroSubtitle>
            Intuicyjny kalkulator, który łączy dokładne wyliczenia z rankingiem banków. Poznaj, jak
            zmienią się raty przy różnych parametrach finansowania.
          </HeroSubtitle>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Przejdź do kalkulatora hipotecznego
              <HiOutlineArrowRight size={18} />
            </PrimaryCta>
          </HeroActions>
          <HeroMeta>
            {heroHighlights.map(({ icon: Icon, label }) => (
              <MetaItem key={label}>
                <MetaIcon>
                  <Icon size={18} />
                </MetaIcon>
                <span>{label}</span>
              </MetaItem>
            ))}
          </HeroMeta>
        </HeroContent>
      </HeroSection>

      <StatsSection>
        <StatsHeader>
          <StatsBadge>Zaufane dane</StatsBadge>
          <StatsTitle>Dlaczego możemy dokładnie policzyć Twój kredyt</StatsTitle>
          <StatsSubtitle>
            Liczymy na podstawie realnych ofert banków i naszych autorskich aktualizacji.
          </StatsSubtitle>
        </StatsHeader>
        <StatsStrip>
          {stats.map(({ value, label, description, icon: StatIconComponent }) => (
            <StatItem key={value}>
              <StatIcon>
                <IconGlow />
                <IconBeam>
                  <StatIconGlyph>
                    <StatIconComponent size={22} />
                  </StatIconGlyph>
                </IconBeam>
              </StatIcon>
              <StatCopy>
                <StatValue>{value}</StatValue>
                <StatLabel>{label}</StatLabel>
                <StatDescription>{description}</StatDescription>
              </StatCopy>
            </StatItem>
          ))}
        </StatsStrip>
      </StatsSection>

      <Section>
        <SectionHeader>
          <SectionTitle>Dlaczego warto zacząć od naszego kalkulatora?</SectionTitle>
          <SectionSubtitle>
            Nie trać czasu na ręczne porównywanie arkuszy – zobacz realistyczne scenariusze w kilka
            minut.
          </SectionSubtitle>
        </SectionHeader>
        <FeatureGrid>
          {features.map(({ title, description, icon: FeatureIcon, bullets }) => (
            <FeatureCard key={title}>
              <FeatureIconWrap>
                <IconGlow />
                <FeatureIconGlyph>
                  <FeatureIcon size={22} />
                </FeatureIconGlyph>
              </FeatureIconWrap>
              <FeatureTitle>{title}</FeatureTitle>
              <FeatureDescription>{description}</FeatureDescription>
              <FeatureList>
                {bullets.map((bullet) => (
                  <FeatureListItem key={bullet}>
                    <FeatureBullet />
                    <span>{bullet}</span>
                  </FeatureListItem>
                ))}
              </FeatureList>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Jak to działa?</SectionTitle>
          <SectionSubtitle>
            Trzy proste kroki, by mieć jasny obraz kredytu hipotecznego – bez zostawiania danych
            kontaktowych.
          </SectionSubtitle>
        </SectionHeader>
        <StepList>
          {steps.map(({ title, description, subpoints }, index) => (
            <StepItem key={title}>
              <StepBadge>{index + 1}</StepBadge>
              <StepContent>
                <StepTitle>{title}</StepTitle>
                <StepDescription>{description}</StepDescription>
                <StepSublist>
                  {subpoints.map((point) => (
                    <StepSubitem key={point}>
                      <StepBulletIcon>
                        <HiOutlineCheck size={14} />
                      </StepBulletIcon>
                      <span>{point}</span>
                    </StepSubitem>
                  ))}
                </StepSublist>
              </StepContent>
            </StepItem>
          ))}
        </StepList>
      </Section>

      <Section id="faq">
        <SectionHeader>
          <SectionBadge>
            <HiOutlineSparkles size={18} />
            Najczęstsze pytania
          </SectionBadge>
          <SectionTitle>Zanim rozpoczniesz – poznaj odpowiedzi na FAQ</SectionTitle>
          <SectionSubtitle>
            Zebraliśmy najczęściej pojawiające się pytania, abyś mógł bez obaw przejść do
            kalkulatora.
          </SectionSubtitle>
        </SectionHeader>
        <FaqList>
          {faqs.map((faq) => (
            <FaqItem key={faq.question}>
              <FaqQuestion>{faq.question}</FaqQuestion>
              <FaqAnswer>{faq.answer}</FaqAnswer>
            </FaqItem>
          ))}
        </FaqList>
      </Section>

      {blogPosts.length > 0 && (
        <Section id="blog">
          <SectionHeader>
            <SectionBadge>
              <HiOutlineCollection size={18} />
              Blog
            </SectionBadge>
            <SectionTitle>Najnowsze artykuły o kredytach hipotecznych</SectionTitle>
            <SectionSubtitle>
              Poznaj praktyczne poradniki i dowiedz się więcej o kredytach hipotecznych przed
              podjęciem decyzji.
            </SectionSubtitle>
          </SectionHeader>
          <BlogPostsGrid>
            {blogPosts.slice(0, 3).map((post) => {
              const IconComponent = post.icon
              return (
                <BlogPostCard key={post.slug} href={`/blog/${post.slug}`}>
                  <BlogPostIcon aria-hidden="true">
                    <IconComponent size={24} />
                  </BlogPostIcon>
                  <BlogPostCategory>{post.category}</BlogPostCategory>
                  <BlogPostTitle>{post.title}</BlogPostTitle>
                  <BlogPostDescription>{post.description}</BlogPostDescription>
                  <BlogPostFooter>
                    <BlogReadTime>{post.readTime} czytania</BlogReadTime>
                    <BlogReadMore>
                      Czytaj więcej
                      <HiOutlineArrowRight size={16} />
                    </BlogReadMore>
                  </BlogPostFooter>
                </BlogPostCard>
              )
            })}
          </BlogPostsGrid>
          <BlogActions>
            <BlogLink href="/blog">
              Zobacz wszystkie artykuły
              <HiOutlineArrowRight size={18} />
            </BlogLink>
          </BlogActions>
        </Section>
      )}

      <FinalSection>
        <FinalContent>
          <FinalEyebrow>Bezpieczna decyzja kredytowa</FinalEyebrow>
          <FinalTitle>Przelicz kredyt i porównaj banki w kilka minut</FinalTitle>
          <FinalText>
            Uruchom kalkulator, zobacz pełny koszt finansowania i sprawdź, które oferty najlepiej
            pasują do Twojego budżetu.
          </FinalText>
          <FinalHighlights>
            <HighlightCard>
              <HighlightIcon aria-hidden="true">
                <HiOutlineCheckCircle size={22} />
              </HighlightIcon>
              <HighlightCopy>
                <HighlightTitle>Symulacje rat na żywych danych</HighlightTitle>
                <HighlightDescription>
                  Widzisz wpływ aktualnych stóp i marż bankowych na wysokość raty.
                </HighlightDescription>
              </HighlightCopy>
            </HighlightCard>
            <HighlightCard>
              <HighlightIcon aria-hidden="true">
                <HiOutlineCheckCircle size={22} />
              </HighlightIcon>
              <HighlightCopy>
                <HighlightTitle>Pełny obraz kosztów</HighlightTitle>
                <HighlightDescription>
                  Uwzględniamy opłaty dodatkowe, ubezpieczenia i prowizje, aby nic Cię nie
                  zaskoczyło.
                </HighlightDescription>
              </HighlightCopy>
            </HighlightCard>
          </FinalHighlights>
          <FinalActions>
            <FinalPrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Uruchom kalkulator
              <HiOutlineArrowRight size={18} />
            </FinalPrimaryCta>
            <FinalSecondaryCta href="/blog/zagrozenia-kredytowe">
              Poznaj ryzyka kredytowe
            </FinalSecondaryCta>
          </FinalActions>
        </FinalContent>
      </FinalSection>

      <FooterMain />
    </MainWrapper>
  )
}

const MainWrapper = tw.div`min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100`

const HeroSection = tw.section`
  border-b border-slate-200
  bg-linear-to-r from-emerald-600 to-teal-600
  text-white
  px-4 sm:px-6 md:px-10
  relative overflow-hidden
`

const HeroGlow = tw.div`
  pointer-events-none absolute inset-0 opacity-60
  blur-3xl
  bg-radial at-top-left from-white/60 via-transparent to-transparent
`

const HeroPattern = tw.div`
  pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_50%)]
`

const HeroContent = tw.div`
  mx-auto
  flex
  max-w-5xl
  flex-col
  gap-6
  py-16 sm:py-20 lg:py-24
`

const HeroBadge = tw.span`inline-flex w-fit items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wide uppercase`
// HeroTitle jest LCP elementem - optymalizacja dla szybkiego renderowania
const HeroTitle = tw.h1`text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight`
const HeroSubtitle = tw.p`max-w-3xl text-base sm:text-lg text-white/90`

const HeroActions = tw.div`flex flex-col gap-3 sm:flex-row sm:items-center`
const BaseCta = tw(
  Link,
)`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 sm:w-auto`
const PrimaryCta = tw(
  BaseCta,
)`bg-white text-emerald-700 shadow-sm shadow-emerald-900/10 hover:-translate-y-0.5 hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:px-8 sm:py-3.5 sm:text-base`

const HeroMeta = tw.ul`mt-6 flex flex-col items-start gap-3 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 text-white/80`
const MetaItem = tw.li`flex items-center gap-3`
const MetaIcon = tw.span`
  flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white
  shadow-sm shadow-black/10 backdrop-blur-sm
`

const StatsSection = tw.section`px-4 sm:px-6 md:px-10 py-6 sm:py-8 bg-linear-to-b from-slate-100 via-white to-slate-100`
const StatsHeader = tw.div`mx-auto max-w-4xl text-center`
const StatsBadge = tw.span`inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700`
const StatsTitle = tw.h2`mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl`
const StatsSubtitle = tw.p`mt-2 text-sm text-slate-600 sm:text-base`
const StatsStrip = tw.div`
  mx-auto grid max-w-5xl gap-6 rounded-3xl border border-slate-200/70 bg-white/90 p-5 shadow-xl shadow-slate-400/20 backdrop-blur
  sm:grid-cols-2 lg:grid-cols-4
`
const StatItem = tw.div`
  relative overflow-hidden rounded-2xl border border-transparent bg-white p-5 text-left
  transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-emerald-100/60
`
const StatIcon = tw.div`relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50/70 text-emerald-600`
const IconGlow = tw.div`absolute inset-0 rounded-xl bg-emerald-100/60 blur-2xl`
const IconBeam = tw.div`relative flex h-11 w-11 items-center justify-center rounded-lg border border-emerald-200/70 bg-white shadow-sm shadow-emerald-800/10`
const StatIconGlyph = tw.span`relative z-10 flex items-center text-emerald-600`
const StatCopy = tw.div`relative z-10 flex flex-col gap-2`
const StatValue = tw.p`text-4xl font-semibold text-slate-900`
const StatLabel = tw.p`text-xs font-semibold uppercase tracking-wide text-emerald-600`
const StatDescription = tw.p`text-sm leading-relaxed text-slate-600`

const Section = tw.section`px-4 sm:px-6 md:px-10 py-8 sm:py-10 bg-transparent`
const SectionHeader = tw.div`mx-auto max-w-3xl text-center space-y-3`
const SectionBadge = tw.div`mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700`
const SectionTitle = tw.h2`text-2xl sm:text-3xl font-semibold text-slate-900`
const SectionSubtitle = tw.p`text-base text-slate-600`

const FeatureGrid = tw.div`
  mt-6
  grid
  gap-5
  sm:grid-cols-2
  lg:mt-8
  lg:grid-cols-3
`
const FeatureCard = tw.div`relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md`
const FeatureIconWrap = tw.div`relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50/80 text-emerald-600`
const FeatureIconGlyph = tw.span`relative z-10 flex items-center text-emerald-600`
const FeatureTitle = tw.h3`text-lg font-semibold text-slate-900`
const FeatureDescription = tw.p`mt-3 text-sm leading-relaxed text-slate-600`
const FeatureList = tw.ul`mt-4 space-y-2 text-sm text-slate-600`
const FeatureListItem = tw.li`flex items-start gap-2`
const FeatureBullet = tw.span`mt-1 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500`

const StepList = tw.ol`mx-auto mt-6 max-w-3xl space-y-5`
const StepItem = tw.li`flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md sm:flex-row`
const StepBadge = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-base font-semibold text-white shadow-sm shadow-emerald-900/15`
const StepContent = tw.div`flex flex-col gap-3`
const StepTitle = tw.h3`text-lg font-semibold text-slate-900`
const StepDescription = tw.p`text-sm leading-relaxed text-slate-600`
const StepSublist = tw.ul`space-y-2 text-sm text-slate-600`
const StepSubitem = tw.li`flex items-start gap-2`
const StepBulletIcon = tw.span`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600`

const FaqList = tw.div`mx-auto mt-6 max-w-4xl space-y-3`
const FaqItem = tw.div`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/30 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md`
const FaqQuestion = tw.h3`text-base font-semibold text-slate-900`
const FaqAnswer = tw.p`mt-2 text-sm leading-relaxed text-slate-600`

const FinalSection = tw.section`px-4 sm:px-6 md:px-10 pb-12 sm:pb-16 pt-10 sm:pt-16 bg-transparent`
const FinalContent = tw.div`mx-auto max-w-4xl rounded-3xl border border-emerald-200 bg-linear-to-r from-emerald-600 to-teal-600 p-8 text-center text-white shadow-xl shadow-emerald-900/30 sm:p-10`
const FinalEyebrow = tw.span`inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90`
const FinalTitle = tw.h3`mt-4 text-2xl font-semibold sm:text-3xl`
const FinalText = tw.p`mt-4 text-base leading-relaxed text-emerald-50 sm:text-lg`
const FinalHighlights = tw.ul`mt-8 grid gap-4 sm:grid-cols-2`
const HighlightCard = tw.li`flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-5 text-left shadow-sm shadow-emerald-900/20 backdrop-blur-sm`
const HighlightIcon = tw.span`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white`
const HighlightCopy = tw.div`flex flex-col gap-1`
const HighlightTitle = tw.span`text-sm font-semibold text-white`
const HighlightDescription = tw.p`text-sm leading-relaxed text-emerald-50/90`
const FinalActions = tw.div`mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center`
const FinalPrimaryCta = tw(
  BaseCta,
)`bg-white text-emerald-700 hover:bg-emerald-50 focus-visible:ring-2 focus-visible:ring-white/60 sm:px-6 sm:py-3`
const FinalSecondaryCta = tw(
  BaseCta,
)`border border-white/70 bg-transparent text-white hover:border-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/40 sm:px-6 sm:py-3`

const BlogPostsGrid = tw.div`
  mt-8
  grid
  gap-6
  sm:grid-cols-2
  lg:grid-cols-3
`
const BlogPostCard = tw(
  Link,
)`group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md`
const BlogPostIcon = tw.span`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50/80 text-emerald-600 group-hover:bg-emerald-100 transition-colors`
const BlogPostCategory = tw.span`mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-600`
const BlogPostTitle = tw.h3`mb-3 text-xl font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors`
const BlogPostDescription = tw.p`mb-4 flex-1 text-sm leading-relaxed text-slate-600`
const BlogPostFooter = tw.div`flex items-center justify-between pt-4 border-t border-slate-100`
const BlogReadTime = tw.span`text-xs text-slate-500`
const BlogReadMore = tw.span`inline-flex items-center gap-1 text-sm font-medium text-emerald-700 group-hover:text-emerald-800 transition-colors`
const BlogActions = tw.div`mt-8 flex justify-center`
const BlogLink = tw(
  Link,
)`inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-6 py-3 text-sm font-semibold text-emerald-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-100 hover:border-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/40`
