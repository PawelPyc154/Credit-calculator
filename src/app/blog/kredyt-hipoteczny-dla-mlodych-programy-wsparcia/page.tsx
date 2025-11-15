import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowLongRight,
  HiOutlineCalculator,
  HiOutlineCheckCircle,
  HiOutlineDocumentText,
  HiOutlineHome,
  HiOutlineSparkles,
  HiOutlineUsers,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'
import { getPostRobotsMetadata } from 'utils/blog-posts'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {  robots: getPostRobotsMetadata('kredyt-hipoteczny-dla-mlodych-programy-wsparcia'),

  title: 'Kredyt hipoteczny dla młodych - programy wsparcia 2026',
  description:
    'Poznaj programy wsparcia dla młodych przy zakupie mieszkania: mdM, Rodzina na Swoim i inne. Sprawdź warunki i możliwości kredytu hipotecznego dla młodych.',
  alternates: {
    canonical: `${siteUrl}/blog/kredyt-hipoteczny-dla-mlodych-programy-wsparcia`,
  },
  keywords: [
    'kredyt hipoteczny dla młodych',
    'mdm kredyt dla młodych',
    'kredyt hipoteczny do 45 lat',
    'program mdM',
    'kredyt hipoteczny dla młodych bez wkładu własnego',
    'warunki kredytu mdM',
    'kredyt dla młodych do 45 roku życia',
  ],
  openGraph: {
    title: 'Kredyt hipoteczny dla młodych - programy wsparcia 2026',
    description:
      'Kompletny przewodnik po programach wsparcia dla młodych: mdM, Rodzina na Swoim i inne. Sprawdź warunki i możliwości.',
    url: `${siteUrl}/blog/kredyt-hipoteczny-dla-mlodych-programy-wsparcia`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Kredyt hipoteczny dla młodych - programy wsparcia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kredyt hipoteczny dla młodych - programy wsparcia 2026',
    description: 'Poznaj programy wsparcia dla młodych przy zakupie mieszkania i sprawdź warunki kredytu.',
    images: [`${siteUrl}/og-image.jpg`],
  },
}

const programs = [
  {
    name: 'Program mdM (Mieszkanie dla Młodych)',
    description:
      'Rządowy program wsparcia dla młodych osób do 45. roku życia, które chcą kupić pierwsze mieszkanie. Program pozwala na kredyt hipoteczny z wkładem własnym zaledwie 10% (zamiast standardowych 20%).',
    requirements: [
      'Wiek do 45 lat',
      'Pierwsze mieszkanie',
      'Spełnienie warunków dochodowych',
      'Wkład własny minimum 10%',
      'Spełnienie warunków programu mdM',
    ],
    benefits: [
      'Niższy wkład własny (10% zamiast 20%)',
      'Dostęp do programu rządowego',
      'Możliwość łączenia z innymi programami',
      'Szybsze wejście na rynek nieruchomości',
    ],
    icon: HiOutlineHome,
  },
  {
    name: 'Program Rodzina na Swoim',
    description:
      'Program wsparcia dla rodzin z dziećmi, które chcą kupić mieszkanie. Program oferuje preferencyjne warunki kredytu i możliwość niższego wkładu własnego.',
    requirements: [
      'Rodzina z dziećmi',
      'Spełnienie warunków dochodowych',
      'Spełnienie warunków programu',
    ],
    benefits: [
      'Preferencyjne warunki kredytu',
      'Możliwość niższego wkładu własnego',
      'Wsparcie dla rodzin',
    ],
    icon: HiOutlineUsers,
  },
  {
    name: 'Lokalne programy mieszkaniowe',
    description:
      'Wiele gmin oferuje własne programy wsparcia mieszkaniowego dla młodych osób. Programy różnią się w zależności od gminy i mogą oferować różne formy wsparcia.',
    requirements: [
      'Mieszkanie w danej gminie',
      'Spełnienie warunków programu',
      'Wiek i inne warunki określone przez gminę',
    ],
    benefits: [
      'Dodatkowe wsparcie lokalne',
      'Możliwość łączenia z programami rządowymi',
      'Dostosowane do lokalnych potrzeb',
    ],
    icon: HiOutlineCheckCircle,
  },
]

const eligibilityCriteria = [
  {
    title: 'Wiek',
    description:
      'Większość programów wsparcia dla młodych wymaga wieku do 35-45 lat. Program mdM wymaga wieku do 45 lat.',
    details: ['Program mdM: do 45 lat', 'Niektóre programy: do 35 lat', 'Sprawdź warunki konkretnego programu'],
  },
  {
    title: 'Pierwsze mieszkanie',
    description:
      'Większość programów wymaga, aby było to pierwsze mieszkanie. Nie możesz posiadać innego mieszkania lub domu.',
    details: [
      'Brak własności mieszkania lub domu',
      'Możliwość posiadania udziału w nieruchomości (sprawdź warunki)',
      'Weryfikacja w rejestrze nieruchomości',
    ],
  },
  {
    title: 'Warunki dochodowe',
    description:
      'Programy wsparcia często mają limity dochodowe. Musisz spełniać określone warunki dochodowe, aby kwalifikować się do programu.',
    details: [
      'Limity dochodowe różnią się w zależności od programu',
      'Sprawdź aktualne limity w banku lub na stronie programu',
      'Dochód netto lub brutto (sprawdź definicję)',
    ],
  },
  {
    title: 'Wkład własny',
    description:
      'Nawet w programach wsparcia wymagany jest wkład własny, choć może być niższy niż standardowy. Program mdM wymaga minimum 10% wkładu własnego.',
    details: [
      'Program mdM: minimum 10% wkładu własnego',
      'Standardowy kredyt: minimum 20% wkładu własnego',
      'Wyższy wkład własny daje lepsze warunki',
    ],
  },
]

const faqData = [
  {
    question: 'Do ilu lat można wziąć kredyt hipoteczny dla młodych?',
    answer:
      'Większość programów wsparcia dla młodych wymaga wieku do 35-45 lat. Program mdM (Mieszkanie dla Młodych) wymaga wieku do 45 lat. Po przekroczeniu limitu wieku nie można już korzystać z programów wsparcia dla młodych.',
  },
  {
    question: 'Co to jest program mdM?',
    answer:
      'Program mdM (Mieszkanie dla Młodych) to rządowy program wsparcia dla młodych osób do 45. roku życia, które chcą kupić pierwsze mieszkanie. Program pozwala na kredyt hipoteczny z wkładem własnym zaledwie 10% (zamiast standardowych 20%). Program wymaga spełnienia określonych warunków: wieku, pierwszego mieszkania i warunków dochodowych.',
  },
  {
    question: 'Jakie są warunki programu mdM?',
    answer:
      'Warunki programu mdM obejmują: wiek do 45 lat, pierwsze mieszkanie, spełnienie warunków dochodowych i wkład własny minimum 10%. Program jest dostępny w wielu bankach i może być łączony z innymi programami wsparcia. Warto sprawdzić aktualne warunki programu w banku lub na stronie rządowej.',
  },
  {
    question: 'Czy mogę wziąć kredyt w programie mdM bez wkładu własnego?',
    answer:
      'Nie, program mdM wymaga minimum 10% wkładu własnego. To jest niższe niż standardowe 20%, ale wciąż wymagane. Kredyt hipoteczny bez wkładu własnego (100% wartości nieruchomości) jest praktycznie niemożliwy do uzyskania w Polsce.',
  },
  {
    question: 'Czy program mdM jest dostępny we wszystkich bankach?',
    answer:
      'Program mdM jest dostępny w wielu bankach, ale nie we wszystkich. Warto sprawdzić, które banki oferują kredyt w programie mdM i porównać ich warunki. Niektóre banki mogą oferować lepsze warunki niż inne.',
  },
  {
    question: 'Czy mogę łączyć program mdM z innymi programami wsparcia?',
    answer:
      'Tak, program mdM może być łączony z innymi programami wsparcia, takimi jak lokalne programy mieszkaniowe czy programy gminne. Warto sprawdzić możliwości łączenia programów w swoim banku lub gminie.',
  },
  {
    question: 'Jakie są korzyści kredytu dla młodych?',
    answer:
      'Kredyt hipoteczny dla młodych w programach wsparcia oferuje kilka korzyści: niższy wkład własny (10% w mdM zamiast 20%), preferencyjne warunki kredytu, możliwość szybszego wejścia na rynek nieruchomości i dostęp do programów rządowych. Programy wsparcia mogą również oferować dodatkowe korzyści, takie jak niższe oprocentowanie czy brak niektórych opłat.',
  },
  {
    question: 'Czy programy wsparcia dla młodych są dostępne tylko dla singli?',
    answer:
      'Nie, programy wsparcia dla młodych są dostępne zarówno dla singli, jak i dla par/małżeństw. Program mdM jest dostępny dla osób do 45 lat, niezależnie od stanu cywilnego. Niektóre programy mogą mieć dodatkowe warunki dotyczące sytuacji rodzinnej, więc warto sprawdzić warunki konkretnego programu.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Kredyt hipoteczny dla młodych - programy wsparcia 2026',
  description:
    'Kompletny przewodnik po programach wsparcia dla młodych: mdM, Rodzina na Swoim, lokalne programy i warunki kwalifikacji.',
  author: {
    '@type': 'Organization',
    name: 'Kalkulator Kredytowy',
    url: siteUrl,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Kalkulator Kredytowy',
    url: siteUrl,
  },
  datePublished: '2026-01-07',
  dateModified: '2026-01-07',
  mainEntityOfPage: `${siteUrl}/blog/kredyt-hipoteczny-dla-mlodych-programy-wsparcia`,
  articleSection: ['Programy wsparcia', 'Kredyt hipoteczny', 'Dla młodych'],
  keywords: metadata.keywords,
}

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

const breadcrumbStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Strona główna',
      item: siteUrl,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: `${siteUrl}/blog`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Kredyt hipoteczny dla młodych - programy wsparcia',
      item: `${siteUrl}/blog/kredyt-hipoteczny-dla-mlodych-programy-wsparcia`,
    },
  ],
}

const relatedArticles = [
  {
    slug: 'wklad-wlasny-kredyt-hipoteczny',
    title: 'Wkład własny na kredyt hipoteczny 2026',
    description: 'Dowiedz się, ile wynosi minimalny wkład własny i jak go obliczyć.',
  },
  {
    slug: 'kredyt-hipoteczny-bez-wkladu-wlasnego',
    title: 'Kredyt hipoteczny bez wkładu własnego',
    description: 'Dowiedz się, czy można wziąć kredyt bez wkładu własnego.',
  },
  {
    slug: 'jak-obliczyc-zdolnosc-kredytowa',
    title: 'Jak obliczyć zdolność kredytową?',
    description: 'Dowiedz się, jak banki obliczają zdolność kredytową i jak samodzielnie oszacować swoją zdolność.',
  },
  {
    slug: 'jak-zlozyc-wniosek-o-kredyt-hipoteczny',
    title: 'Jak złożyć wniosek o kredyt hipoteczny?',
    description: 'Krok po kroku przewodnik po składaniu wniosku.',
  }
]

export default function YoungPeopleProgramsPage() {
  const articleJsonLd = toJsonLd(articleStructuredData)
  const faqJsonLd = toJsonLd(faqStructuredData)
  const breadcrumbJsonLd = toJsonLd(breadcrumbStructuredData)

  return (
    <PageWrapper>
      <ContentContainer>
        <script type="application/ld+json" suppressHydrationWarning>
          {articleJsonLd}
        </script>
        <script type="application/ld+json" suppressHydrationWarning>
          {faqJsonLd}
        </script>
        <script type="application/ld+json" suppressHydrationWarning>
          {breadcrumbJsonLd}
        </script>


        <BreadcrumbNav aria-label="Breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Strona główna</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbCurrent>Kredyt hipoteczny dla młodych - programy wsparcia</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>

        <HeroSection>
          <HeroEyebrow>Programy wsparcia</HeroEyebrow>
          <HeroTitle>Kredyt hipoteczny dla młodych - programy wsparcia 2026</HeroTitle>
          <HeroLead>
            Młodzi ludzie mają dostęp do specjalnych programów wsparcia przy zakupie pierwszego mieszkania.
            Program mdM (Mieszkanie dla Młodych) pozwala na kredyt hipoteczny z wkładem własnym zaledwie 10%
            dla osób do 45. roku życia. W tym przewodniku dowiesz się, jakie programy wsparcia są dostępne,
            jakie warunki trzeba spełnić i jak z nich skorzystać. Oblicz ratę kredytu w programie mdM w
            naszym kalkulatorze kredytu hipotecznego.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Oblicz ratę kredytu w programie mdM
              <HiOutlineArrowLongRight size={18} />
            </PrimaryCta>
          </HeroActions>
        </HeroSection>

        <IntroCard>
          <IntroIcon aria-hidden="true">
            <HiOutlineSparkles size={28} />
          </IntroIcon>
          <IntroContent>
            <IntroTitle>Najważniejsze informacje</IntroTitle>
            <IntroList>
              <li>
                <strong>Program mdM pozwala na 10% wkład własny</strong> - dla osób do 45 lat, pierwsze
                mieszkanie.
              </li>
              <li>
                <strong>Dostępne są różne programy wsparcia</strong> - mdM, Rodzina na Swoim, lokalne programy
                gminne.
              </li>
              <li>
                <strong>Warunki różnią się w zależności od programu</strong> - wiek, dochód, pierwsze
                mieszkanie.
              </li>
              <li>
                <strong>Można łączyć programy</strong> - mdM może być łączony z innymi programami wsparcia.
              </li>
            </IntroList>
          </IntroContent>
        </IntroCard>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineHome size={18} />
              Programy
            </SectionBadge>
            <SectionTitle>Jakie programy wsparcia są dostępne dla młodych?</SectionTitle>
            <SectionSubtitle>
              Poznaj dostępne programy wsparcia dla młodych przy zakupie pierwszego mieszkania i ich
              warunki.
            </SectionSubtitle>
          </SectionHeader>
          <ProgramsGrid role="list">
            {programs.map((program) => {
              const IconComponent = program.icon
              return (
                <ProgramCard key={program.name} role="listitem">
                  <ProgramHeader>
                    <ProgramIcon aria-hidden="true">
                      <IconComponent size={24} />
                    </ProgramIcon>
                    <ProgramName>{program.name}</ProgramName>
                  </ProgramHeader>
                  <ProgramDescription>{program.description}</ProgramDescription>
                  <ProgramSection>
                    <ProgramSectionTitle>Wymagania:</ProgramSectionTitle>
                    <ProgramList>
                      {program.requirements.map((req) => (
                        <li key={req}>{req}</li>
                      ))}
                    </ProgramList>
                  </ProgramSection>
                  <ProgramSection>
                    <ProgramSectionTitle>Korzyści:</ProgramSectionTitle>
                    <ProgramBenefitsList>
                      {program.benefits.map((benefit) => (
                        <li key={benefit}>✓ {benefit}</li>
                      ))}
                    </ProgramBenefitsList>
                  </ProgramSection>
                </ProgramCard>
              )
            })}
          </ProgramsGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineCheckCircle size={18} />
              Warunki
            </SectionBadge>
            <SectionTitle>Jakie warunki trzeba spełnić?</SectionTitle>
            <SectionSubtitle>
              Większość programów wsparcia dla młodych wymaga spełnienia określonych warunków. Poznaj
              najważniejsze kryteria kwalifikacji.
            </SectionSubtitle>
          </SectionHeader>
          <CriteriaGrid role="list">
            {eligibilityCriteria.map((criterion) => (
              <CriterionCard key={criterion.title} role="listitem">
                <CriterionTitle>{criterion.title}</CriterionTitle>
                <CriterionDescription>{criterion.description}</CriterionDescription>
                <CriterionDetails>
                  {criterion.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </CriterionDetails>
              </CriterionCard>
            ))}
          </CriteriaGrid>
          <CtaBox>
            <CtaTitle>Sprawdź warunki w kalkulatorze</CtaTitle>
            <CtaText>
              Nasz kalkulator kredytu hipotecznego pozwala sprawdzić warunki przy różnych poziomach wkładu
              własnego, w tym 10% w programie mdM. Zobacz, jak różnią się koszty i warunki.
            </CtaText>
            <CtaButton href="/kalkulator/kredyt-hipoteczny">
              Sprawdź warunki w kalkulatorze
              <HiOutlineArrowLongRight size={18} />
            </CtaButton>
          </CtaBox>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineUsers size={18} />
              Program mdM
            </SectionBadge>
            <SectionTitle>Program mdM - najpopularniejszy program wsparcia</SectionTitle>
            <SectionSubtitle>
              Program mdM (Mieszkanie dla Młodych) to najpopularniejszy program wsparcia dla młodych przy
              zakupie pierwszego mieszkania.
            </SectionSubtitle>
          </SectionHeader>
          <ArticleText>
            Program mdM (Mieszkanie dla Młodych) to rządowy program wsparcia dla młodych osób do 45. roku
            życia, które chcą kupić pierwsze mieszkanie. Program pozwala na kredyt hipoteczny z wkładem
            własnym zaledwie 10% (zamiast standardowych 20%), co znacznie ułatwia wejście na rynek
            nieruchomości.
          </ArticleText>
          <ArticleText>
            Program mdM jest dostępny w wielu bankach i może być łączony z innymi programami wsparcia.
            Warunki programu obejmują: wiek do 45 lat, pierwsze mieszkanie, spełnienie warunków dochodowych i
            wkład własny minimum 10%. Program jest szczególnie popularny wśród młodych osób, które dopiero
            zaczynają swoją karierę zawodową i nie mają jeszcze wystarczających oszczędności na standardowy
            wkład własny.
          </ArticleText>
          <ArticleText>
            Program mdM oferuje kilka korzyści: niższy wkład własny, preferencyjne warunki kredytu,
            możliwość szybszego wejścia na rynek nieruchomości i dostęp do programów rządowych. Warto
            sprawdzić aktualne warunki programu w banku i porównać oferty różnych banków.
          </ArticleText>
          <CtaBox>
            <CtaTitle>Oblicz ratę kredytu w programie mdM</CtaTitle>
            <CtaText>
              Nasz kalkulator kredytu hipotecznego pozwala sprawdzić ratę kredytu przy różnych poziomach
              wkładu własnego, w tym 10% w programie mdM. Zobacz, ile wyniesie Twoja rata i porównaj oferty
              banków.
            </CtaText>
            <CtaButton href="/kalkulator/kredyt-hipoteczny">
              Oblicz ratę w kalkulatorze
              <HiOutlineArrowLongRight size={18} />
            </CtaButton>
          </CtaBox>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineDocumentText size={18} />
              FAQ
            </SectionBadge>
            <SectionTitle>Najczęściej zadawane pytania o kredyt dla młodych</SectionTitle>
            <SectionSubtitle>
              Odpowiedzi na najpopularniejsze pytania dotyczące kredytu hipotecznego dla młodych i programów
              wsparcia.
            </SectionSubtitle>
          </SectionHeader>
          <FaqList role="list">
            {faqData.map((item) => (
              <FaqItem key={item.question}>
                <FaqQuestion>{item.question}</FaqQuestion>
                <FaqAnswer>{item.answer}</FaqAnswer>
              </FaqItem>
            ))}
          </FaqList>
        </Section>
        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineDocumentText size={18} />
              Powiązane artykuły
            </SectionBadge>
            <SectionTitle>Powiązane artykuły</SectionTitle>
            <SectionSubtitle>
              Przeczytaj więcej artykułów, które pomogą Ci w procesie kredytowym.
            </SectionSubtitle>
          </SectionHeader>
          <RelatedGrid role="list">
            {relatedArticles.map((article) => (
              <RelatedCard key={article.slug} href={`/blog/${article.slug}`} role="listitem">
                <RelatedTitle>{article.title}</RelatedTitle>
                <RelatedDescription>{article.description}</RelatedDescription>
                <RelatedLink>
                  Czytaj więcej
                  <HiOutlineArrowLongRight size={16} />
                </RelatedLink>
              </RelatedCard>
            ))}
          </RelatedGrid>
        </Section>

        <SummarySection>
          <SummaryContent>
            <SummaryTitle>Podsumowanie</SummaryTitle>
            <SummaryText>
              Młodzi ludzie mają dostęp do specjalnych programów wsparcia przy zakupie pierwszego mieszkania.
              Program mdM (Mieszkanie dla Młodych) pozwala na kredyt hipoteczny z wkładem własnym zaledwie
              10% dla osób do 45. roku życia. Dostępne są również inne programy wsparcia, takie jak Rodzina
              na Swoim czy lokalne programy gminne.
            </SummaryText>
            <SummaryText>
              Warunki programów wsparcia różnią się w zależności od programu, ale zazwyczaj obejmują: wiek,
              pierwsze mieszkanie, warunki dochodowe i wkład własny. Warto sprawdzić aktualne warunki
              programów w banku i porównać oferty. Oblicz ratę kredytu w programie mdM w naszym kalkulatorze
              kredytu hipotecznego. Przeczytaj też nasze przewodniki o{' '}
              <Link href="/blog/wklad-wlasny-kredyt-hipoteczny" className="text-white underline hover:text-emerald-50">
                wkładzie własnym na kredyt hipoteczny
              </Link>
              ,{' '}
              <Link
                href="/blog/kredyt-hipoteczny-bez-wkladu-wlasnego"
                className="text-white underline hover:text-emerald-50"
              >
                kredycie hipotecznym bez wkładu własnego
              </Link>
              {' '}i{' '}
              <Link href="/blog/jak-obliczyc-zdolnosc-kredytowa" className="text-white underline hover:text-emerald-50">
                jak obliczyć zdolność kredytową
              </Link>
              .
            </SummaryText>
            <SummaryCta href="/kalkulator/kredyt-hipoteczny">
              Oblicz ratę kredytu w programie mdM
              <HiOutlineArrowLongRight size={18} />
            </SummaryCta>
          </SummaryContent>
        </SummarySection>
      </ContentContainer>
      <FooterMain />
    </PageWrapper>
  )
}


const BreadcrumbNav = tw.nav`mb-8`
const BreadcrumbList = tw.ol`flex items-center gap-2 text-sm text-gray-600`
const BreadcrumbItem = tw.li`flex items-center`
const BreadcrumbLink = tw(Link)`text-emerald-700 hover:text-emerald-800 hover:underline transition-colors`
const BreadcrumbSeparator = tw.span`text-gray-400 mx-1`
const BreadcrumbCurrent = tw.span`text-gray-900 font-medium`


const PageWrapper = tw.main`min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-100`
const ContentContainer = tw.div`mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20`

const HeroSection = tw.section`mx-auto max-w-3xl text-center`
const HeroEyebrow = tw.span`mb-4 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700`
const HeroTitle = tw.h1`mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl`
const HeroLead = tw.p`mx-auto mb-8 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg`
const HeroActions = tw.div`flex flex-col items-center justify-center gap-3 sm:flex-row`

const PrimaryCta = tw(Link)`inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500`

const IntroCard = tw.section`mt-12 flex flex-col gap-4 rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:flex-row sm:items-center sm:gap-6 sm:p-8`
const IntroIcon = tw.span`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white`
const IntroContent = tw.div`flex-1`
const IntroTitle = tw.h2`mb-3 text-xl font-bold text-gray-900`
const IntroList = tw.ul`grid gap-2 text-sm text-gray-600 sm:text-base [&_strong]:text-gray-900 [&_strong]:font-semibold`

const Section = tw.section`mt-16`
const SectionHeader = tw.div`mx-auto mb-10 max-w-3xl text-center`
const SectionBadge = tw.span`mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700`
const SectionTitle = tw.h2`text-3xl font-bold text-gray-900 sm:text-4xl`
const SectionSubtitle = tw.p`mt-3 text-sm leading-relaxed text-gray-600 sm:text-base`

const ArticleText = tw.p`mx-auto max-w-3xl text-base leading-relaxed text-gray-700 sm:text-lg [&+&]:mt-4`

const CtaBox = tw.div`mx-auto mt-8 max-w-3xl rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-sm`
const CtaTitle = tw.h3`mb-2 text-xl font-semibold text-gray-900`
const CtaText = tw.p`mb-4 text-sm leading-relaxed text-gray-600 sm:text-base`
const CtaButton = tw(Link)`inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500`

const ProgramsGrid = tw.ul`grid grid-cols-1 gap-6 lg:grid-cols-3`
const ProgramCard = tw.li`flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1 hover:shadow-lg`
const ProgramHeader = tw.div`mb-4 flex items-start gap-4`
const ProgramIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const ProgramName = tw.h3`flex-1 text-xl font-semibold text-gray-900`
const ProgramDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const ProgramSection = tw.div`mb-4`
const ProgramSectionTitle = tw.h4`mb-2 text-sm font-semibold text-gray-900`
const ProgramList = tw.ul`grid gap-2 text-sm text-gray-600 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`
const ProgramBenefitsList = tw.ul`grid gap-2 text-sm text-emerald-700 [&_li]:font-medium`

const CriteriaGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const CriterionCard = tw.li`flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm`
const CriterionTitle = tw.h3`mb-3 text-xl font-semibold text-gray-900`
const CriterionDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const CriterionDetails = tw.ul`mt-auto grid gap-2 text-sm text-gray-600 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`

const FaqList = tw.ul`mx-auto max-w-3xl divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-200 bg-white/80 shadow-sm`
const FaqItem = tw.li`px-5 py-6`
const FaqQuestion = tw.h3`mb-2 text-lg font-semibold text-gray-900`
const FaqAnswer = tw.p`text-sm leading-relaxed text-gray-600 sm:text-base`


const RelatedGrid = tw.ul`mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4`
const RelatedCard = tw(
  Link,
)`group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg`
const RelatedTitle = tw.h3`mb-2 text-lg font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors`
const RelatedDescription = tw.p`mb-4 flex-1 text-sm leading-relaxed text-gray-600`
const RelatedLink = tw.span`inline-flex items-center gap-1 text-sm font-medium text-emerald-700 group-hover:text-emerald-800 transition-colors`


const SummarySection = tw.section`mt-20 rounded-3xl border border-emerald-200 bg-linear-to-r from-emerald-600 to-teal-600 p-8 shadow-xl sm:p-10`
const SummaryContent = tw.div`mx-auto flex max-w-3xl flex-col text-white`
const SummaryTitle = tw.h2`mb-4 text-2xl font-bold sm:text-3xl`
const SummaryText = tw.p`mb-4 text-base leading-relaxed text-emerald-50 [&+&]:mt-2`
const SummaryCta = tw(Link)`mt-6 inline-flex items-center gap-2 self-center rounded-full bg-white px-6 py-3 font-semibold text-emerald-600 transition-colors hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`

