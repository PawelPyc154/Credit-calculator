import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowLongRight,
  HiOutlineCalculator,
  HiOutlineCheckCircle,
  HiOutlineClipboardDocumentCheck,
  HiOutlineDocumentText,
  HiOutlineSparkles,
  HiOutlineUser,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'
import { getPostRobotsMetadata } from 'utils/blog-posts'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {  robots: getPostRobotsMetadata('jak-zlozyc-wniosek-o-kredyt-hipoteczny'),

  title: 'Jak złożyć wniosek o kredyt hipoteczny? Krok po kroku',
  description:
    'Dowiedz się, jak złożyć wniosek o kredyt hipoteczny krok po kroku: dokumenty, proces, terminy i wskazówki. Sprawdź swoją zdolność kredytową przed wizytą w banku.',
  alternates: {
    canonical: `${siteUrl}/blog/jak-zlozyc-wniosek-o-kredyt-hipoteczny`,
  },
  keywords: [
    'jak złożyć wniosek o kredyt hipoteczny',
    'wniosek kredyt hipoteczny',
    'dokumenty do kredytu hipotecznego',
    'proces kredytowy kredyt hipoteczny',
    'jakie dokumenty są potrzebne do kredytu hipotecznego',
    'ile trwa proces kredytowy',
    'jak przygotować się do wniosku o kredyt',
  ],
  openGraph: {
    title: 'Jak złożyć wniosek o kredyt hipoteczny? Krok po kroku',
    description:
      'Kompletny przewodnik po składaniu wniosku o kredyt hipoteczny: dokumenty, proces, terminy i praktyczne wskazówki.',
    url: `${siteUrl}/blog/jak-zlozyc-wniosek-o-kredyt-hipoteczny`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Jak złożyć wniosek o kredyt hipoteczny',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jak złożyć wniosek o kredyt hipoteczny?',
    description: 'Dowiedz się, jak złożyć wniosek o kredyt hipoteczny krok po kroku.',
    images: [`${siteUrl}/og-image.jpg`],
  },
}

const steps = [
  {
    step: 1,
    title: 'Przygotowanie - sprawdź swoją zdolność kredytową',
    description:
      'Przed złożeniem wniosku sprawdź swoją zdolność kredytową i przygotuj niezbędne dokumenty. Użyj kalkulatora kredytu hipotecznego, aby oszacować swoją zdolność i zobaczyć, na jaką kwotę możesz liczyć.',
    details: [
      'Sprawdź swoją zdolność kredytową w kalkulatorze',
      'Przygotuj dokumenty potwierdzające dochód',
      'Sprawdź historię kredytową w BIK',
      'Przygotuj dokumenty dotyczące nieruchomości',
    ],
    icon: HiOutlineCalculator,
  },
  {
    step: 2,
    title: 'Wybór banku i oferty',
    description:
      'Porównaj oferty różnych banków i wybierz najlepszą dla siebie. Użyj kalkulatora kredytu hipotecznego, aby porównać oferty i znaleźć najtańszą.',
    details: [
      'Porównaj oferty w kalkulatorze',
      'Sprawdź warunki kredytu',
      'Negocjuj warunki z bankiem',
      'Wybierz najlepszą ofertę',
    ],
    icon: HiOutlineCheckCircle,
  },
  {
    step: 3,
    title: 'Złożenie wniosku',
    description:
      'Złóż wniosek kredytowy w wybranym banku. Możesz to zrobić online, telefonicznie lub osobiście w oddziale banku.',
    details: [
      'Wypełnij formularz wniosku',
      'Dołącz wymagane dokumenty',
      'Złóż wniosek w banku',
      'Otrzymaj potwierdzenie złożenia wniosku',
    ],
    icon: HiOutlineDocumentText,
  },
  {
    step: 4,
    title: 'Weryfikacja przez bank',
    description:
      'Bank zweryfikuje Twój wniosek, sprawdzi dokumenty i oceni zdolność kredytową. Proces może trwać od kilku dni do kilku tygodni.',
    details: [
      'Bank sprawdza dokumenty',
      'Weryfikacja zdolności kredytowej',
      'Sprawdzenie historii kredytowej',
      'Wycena nieruchomości',
    ],
    icon: HiOutlineUser,
  },
  {
    step: 5,
    title: 'Decyzja kredytowa',
    description:
      'Bank podejmie decyzję o przyznaniu lub odmowie kredytu. Jeśli decyzja jest pozytywna, otrzymasz warunki kredytu do akceptacji.',
    details: [
      'Otrzymanie decyzji kredytowej',
      'Przegląd warunków kredytu',
      'Akceptacja warunków',
      'Przygotowanie do podpisania umowy',
    ],
    icon: HiOutlineClipboardDocumentCheck,
  },
  {
    step: 6,
    title: 'Podpisanie umowy',
    description:
      'Po akceptacji warunków podpiszesz umowę kredytową. Przed podpisaniem dokładnie przeczytaj umowę i upewnij się, że rozumiesz wszystkie warunki.',
    details: [
      'Przegląd umowy kredytowej',
      'Weryfikacja wszystkich warunków',
      'Podpisanie umowy',
      'Rozpoczęcie spłaty kredytu',
    ],
    icon: HiOutlineCheckCircle,
  },
]

const requiredDocuments = [
  {
    category: 'Dokumenty tożsamości',
    items: ['Dowód osobisty lub paszport', 'Druga forma identyfikacji (jeśli wymagana)'],
  },
  {
    category: 'Dokumenty potwierdzające dochód',
    items: [
      'Zaświadczenie o dochodach z pracy (ostatnie 3-12 miesięcy)',
      'Umowa o pracę',
      'Ostatnie 3-6 miesięcy wyciągów z konta',
      'PIT za ostatni rok (jeśli wymagane)',
    ],
  },
  {
    category: 'Dokumenty dotyczące nieruchomości',
    items: [
      'Akt notarialny lub umowa przedwstępna',
      'Wycena nieruchomości (jeśli wymagana)',
      'Dokumenty własnościowe',
      'Informacje o nieruchomości',
    ],
  },
  {
    category: 'Dokumenty dodatkowe',
    items: [
      'Historia kredytowa z BIK',
      'Dokumenty dotyczące zobowiązań finansowych',
      'Dokumenty dotyczące wkładu własnego',
      'Inne dokumenty wymagane przez bank',
    ],
  },
]

const faqData = [
  {
    question: 'Jakie dokumenty są potrzebne do kredytu hipotecznego?',
    answer:
      'Do kredytu hipotecznego potrzebne są: dokumenty tożsamości, dokumenty potwierdzające dochód (zaświadczenie o dochodach, umowa o pracę, wyciągi z konta), dokumenty dotyczące nieruchomości (akt notarialny, wycena) i dokumenty dodatkowe (historia kredytowa, dokumenty dotyczące zobowiązań). Dokładna lista dokumentów może różnić się w zależności od banku.',
  },
  {
    question: 'Ile trwa proces kredytowy?',
    answer:
      'Proces kredytowy trwa zazwyczaj od 2 do 6 tygodni, w zależności od banku i złożoności sprawy. Proces obejmuje: złożenie wniosku, weryfikację dokumentów, ocenę zdolności kredytowej, wycenę nieruchomości i podjęcie decyzji kredytowej. Niektóre banki mogą rozpatrzyć wniosek szybciej, inne mogą potrzebować więcej czasu.',
  },
  {
    question: 'Czy mogę złożyć wniosek online?',
    answer:
      'Tak, wiele banków oferuje możliwość złożenia wniosku online. Możesz wypełnić formularz wniosku na stronie banku, przesłać dokumenty elektronicznie i śledzić status wniosku online. Niektóre banki wymagają jednak osobistej wizyty w oddziale do podpisania umowy.',
  },
  {
    question: 'Jak przygotować się do wniosku o kredyt?',
    answer:
      'Przygotowanie do wniosku o kredyt obejmuje: sprawdzenie zdolności kredytowej w kalkulatorze, przygotowanie dokumentów, sprawdzenie historii kredytowej w BIK, porównanie ofert banków i wybór najlepszej oferty. Warto też przygotować się do rozmowy z bankiem i mieć gotowe odpowiedzi na pytania dotyczące dochodu i zobowiązań.',
  },
  {
    question: 'Co się dzieje po złożeniu wniosku?',
    answer:
      'Po złożeniu wniosku bank rozpoczyna proces weryfikacji: sprawdza dokumenty, ocenia zdolność kredytową, weryfikuje historię kredytową i przeprowadza wycenę nieruchomości. Po zakończeniu weryfikacji bank podejmie decyzję o przyznaniu lub odmowie kredytu. Jeśli decyzja jest pozytywna, otrzymasz warunki kredytu do akceptacji.',
  },
  {
    question: 'Czy mogę złożyć wniosek w kilku bankach jednocześnie?',
    answer:
      'Tak, możesz złożyć wniosek w kilku bankach jednocześnie, aby porównać oferty i wybrać najlepszą. Pamiętaj jednak, że każde złożenie wniosku jest odnotowywane w BIK i może wpłynąć na historię kredytową. Warto najpierw porównać oferty w kalkulatorze, a następnie złożyć wniosek w wybranym banku.',
  },
  {
    question: 'Co jeśli wniosek zostanie odrzucony?',
    answer:
      'Jeśli wniosek zostanie odrzucony, bank powinien poinformować Cię o przyczynie odmowy. Możesz poprawić sytuację (np. zwiększyć dochód, spłacić zobowiązania, poprawić historię kredytową) i złożyć wniosek ponownie po pewnym czasie. Możesz też złożyć wniosek w innym banku, który może mieć inne wymagania.',
  },
  {
    question: 'Jak długo ważna jest decyzja kredytowa?',
    answer:
      'Decyzja kredytowa jest zazwyczaj ważna przez określony okres (np. 30-90 dni), w zależności od banku. Jeśli nie podpiszesz umowy w tym okresie, decyzja wygaśnie i będziesz musiał złożyć wniosek ponownie. Warto sprawdzić termin ważności decyzji w banku.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Jak złożyć wniosek o kredyt hipoteczny? Krok po kroku',
  description:
    'Kompletny przewodnik po składaniu wniosku o kredyt hipoteczny: dokumenty, proces, terminy i praktyczne wskazówki.',
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
  datePublished: '2026-01-21',
  dateModified: '2026-01-21',
  mainEntityOfPage: `${siteUrl}/blog/jak-zlozyc-wniosek-o-kredyt-hipoteczny`,
  articleSection: ['Proces kredytowy', 'Kredyt hipoteczny', 'Poradniki'],
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
      name: 'Jak złożyć wniosek o kredyt hipoteczny?',
      item: `${siteUrl}/blog/jak-zlozyc-wniosek-o-kredyt-hipoteczny`,
    },
  ],
}

const relatedArticles = [
  {
    slug: 'dokumenty-do-kredytu-hipotecznego',
    title: 'Dokumenty do kredytu hipotecznego',
    description: 'Kompletna lista dokumentów potrzebnych do kredytu.',
  },
  {
    slug: 'jak-dlugo-trwa-proces-kredytowy',
    title: 'Jak długo trwa proces kredytowy?',
    description: 'Poznaj terminy i etapy procesu kredytowego.',
  },
  {
    slug: 'jak-obliczyc-zdolnosc-kredytowa',
    title: 'Jak obliczyć zdolność kredytową?',
    description: 'Dowiedz się, jak banki obliczają zdolność kredytową i jak samodzielnie oszacować swoją zdolność.',
  },
  {
    slug: 'jak-wybrac-najlepszy-kredyt-hipoteczny',
    title: 'Jak wybrać najlepszy kredyt hipoteczny?',
    description: 'Kompleksowy przewodnik po wyborze najlepszego kredytu.',
  }
]

export default function ApplicationProcessPage() {
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
              <BreadcrumbCurrent>Jak złożyć wniosek o kredyt hipoteczny?</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>

        <HeroSection>
          <HeroEyebrow>Proces kredytowy</HeroEyebrow>
          <HeroTitle>Jak złożyć wniosek o kredyt hipoteczny? Krok po kroku</HeroTitle>
          <HeroLead>
            Złożenie wniosku o kredyt hipoteczny to pierwszy krok w procesie zakupu nieruchomości. Proces
            może wydawać się skomplikowany, ale z odpowiednim przygotowaniem jest prosty. W tym przewodniku
            dowiesz się, jak złożyć wniosek krok po kroku, jakie dokumenty są potrzebne, ile trwa proces i jak
            się przygotować. Przed złożeniem wniosku sprawdź swoją zdolność kredytową w naszym kalkulatorze.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź zdolność kredytową przed wnioskiem
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
                <strong>Proces trwa 2-6 tygodni</strong> - od złożenia wniosku do podpisania umowy.
              </li>
              <li>
                <strong>Przygotuj dokumenty z wyprzedzeniem</strong> - zaświadczenia o dochodach, wyciągi z
                konta, dokumenty dotyczące nieruchomości.
              </li>
              <li>
                <strong>Sprawdź zdolność kredytową przed wnioskiem</strong> - użyj kalkulatora, aby
                oszacować swoją zdolność.
              </li>
              <li>
                <strong>Możesz złożyć wniosek online</strong> - wiele banków oferuje możliwość złożenia
                wniosku przez internet.
              </li>
            </IntroList>
          </IntroContent>
        </IntroCard>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineClipboardDocumentCheck size={18} />
              Proces
            </SectionBadge>
            <SectionTitle>Proces składania wniosku krok po kroku</SectionTitle>
            <SectionSubtitle>
              Oto szczegółowy przewodnik po procesie składania wniosku o kredyt hipoteczny, od przygotowania
              do podpisania umowy.
            </SectionSubtitle>
          </SectionHeader>
          <StepsList role="list">
            {steps.map((step) => {
              const IconComponent = step.icon
              return (
                <StepCard key={step.step} role="listitem">
                  <StepHeader>
                    <StepNumber>{step.step}</StepNumber>
                    <StepIcon aria-hidden="true">
                      <IconComponent size={24} />
                    </StepIcon>
                  </StepHeader>
                  <StepContent>
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                    <StepDetails>
                      {step.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </StepDetails>
                  </StepContent>
                </StepCard>
              )
            })}
          </StepsList>
          <CtaBox>
            <CtaTitle>Sprawdź swoją zdolność przed złożeniem wniosku</CtaTitle>
            <CtaText>
              Przed złożeniem wniosku sprawdź swoją zdolność kredytową w naszym kalkulatorze. Zobaczysz, na
              jaką kwotę możesz liczyć i przygotujesz się do rozmowy z bankiem.
            </CtaText>
            <CtaButton href="/kalkulator/kredyt-hipoteczny">
              Sprawdź zdolność w kalkulatorze
              <HiOutlineArrowLongRight size={18} />
            </CtaButton>
          </CtaBox>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineDocumentText size={18} />
              Dokumenty
            </SectionBadge>
            <SectionTitle>Jakie dokumenty są potrzebne?</SectionTitle>
            <SectionSubtitle>
              Oto kompletna lista dokumentów potrzebnych do złożenia wniosku o kredyt hipoteczny.
            </SectionSubtitle>
          </SectionHeader>
          <DocumentsGrid role="list">
            {requiredDocuments.map((category) => (
              <DocumentCard key={category.category} role="listitem">
                <DocumentCategory>{category.category}</DocumentCategory>
                <DocumentList>
                  {category.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </DocumentList>
              </DocumentCard>
            ))}
          </DocumentsGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineCheckCircle size={18} />
              Wskazówki
            </SectionBadge>
            <SectionTitle>Praktyczne wskazówki przed złożeniem wniosku</SectionTitle>
            <SectionSubtitle>
              Oto praktyczne wskazówki, które pomogą Ci przygotować się do złożenia wniosku i zwiększyć
              szanse na pozytywną decyzję.
            </SectionSubtitle>
          </SectionHeader>
          <TipsList role="list">
            <TipItem>
              <TipIcon aria-hidden="true">✓</TipIcon>
              <TipContent>
                <TipTitle>Sprawdź zdolność kredytową przed wnioskiem</TipTitle>
                <TipDescription>
                  Użyj kalkulatora kredytu hipotecznego, aby oszacować swoją zdolność kredytową przed
                  złożeniem wniosku. To pomoże Ci przygotować się do rozmowy z bankiem i uniknąć rozczarowań.
                </TipDescription>
              </TipContent>
            </TipItem>
            <TipItem>
              <TipIcon aria-hidden="true">✓</TipIcon>
              <TipContent>
                <TipTitle>Przygotuj dokumenty z wyprzedzeniem</TipTitle>
                <TipDescription>
                  Przygotuj wszystkie wymagane dokumenty z wyprzedzeniem, aby uniknąć opóźnień w procesie.
                  Sprawdź, jakie dokumenty są wymagane w wybranym banku.
                </TipDescription>
              </TipContent>
            </TipItem>
            <TipItem>
              <TipIcon aria-hidden="true">✓</TipIcon>
              <TipContent>
                <TipTitle>Sprawdź historię kredytową</TipTitle>
                <TipDescription>
                  Sprawdź swoją historię kredytową w BIK przed złożeniem wniosku. Jeśli są jakieś
                  nieprawidłowości, możesz je poprawić przed złożeniem wniosku.
                </TipDescription>
              </TipContent>
            </TipItem>
            <TipItem>
              <TipIcon aria-hidden="true">✓</TipIcon>
              <TipContent>
                <TipTitle>Porównaj oferty przed wnioskiem</TipTitle>
                <TipDescription>
                  Porównaj oferty różnych banków w kalkulatorze przed złożeniem wniosku. Wybierz najlepszą
                  ofertę i złóż wniosek tylko w wybranym banku.
                </TipDescription>
              </TipContent>
            </TipItem>
            <TipItem>
              <TipIcon aria-hidden="true">✓</TipIcon>
              <TipContent>
                <TipTitle>Bądź przygotowany na pytania</TipTitle>
                <TipDescription>
                  Przygotuj się na pytania banku dotyczące dochodu, zobowiązań i planów finansowych. Miej
                  gotowe odpowiedzi i dokumenty potwierdzające informacje.
                </TipDescription>
              </TipContent>
            </TipItem>
            <TipItem>
              <TipIcon aria-hidden="true">✓</TipIcon>
              <TipContent>
                <TipTitle>Nie zmieniaj sytuacji finansowej</TipTitle>
                <TipDescription>
                  Po złożeniu wniosku nie zmieniaj swojej sytuacji finansowej (np. nie zmieniaj pracy, nie
                  zaciągaj nowych zobowiązań), dopóki nie otrzymasz decyzji kredytowej.
                </TipDescription>
              </TipContent>
            </TipItem>
          </TipsList>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineDocumentText size={18} />
              FAQ
            </SectionBadge>
            <SectionTitle>Najczęściej zadawane pytania o wniosek kredytowy</SectionTitle>
            <SectionSubtitle>
              Odpowiedzi na najpopularniejsze pytania dotyczące składania wniosku o kredyt hipoteczny.
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
              Złożenie wniosku o kredyt hipoteczny to proces składający się z kilku kroków: przygotowania,
              wyboru banku, złożenia wniosku, weryfikacji przez bank, decyzji kredytowej i podpisania umowy.
              Proces trwa zazwyczaj 2-6 tygodni i wymaga przygotowania dokumentów oraz sprawdzenia zdolności
              kredytowej.
            </SummaryText>
            <SummaryText>
              Przed złożeniem wniosku warto: sprawdzić swoją zdolność kredytową w kalkulatorze, przygotować
              dokumenty z wyprzedzeniem, sprawdzić historię kredytową i porównać oferty banków. To pomoże Ci
              przygotować się do procesu i zwiększyć szanse na pozytywną decyzję. Sprawdź swoją zdolność
              kredytową przed wizytą w banku w naszym kalkulatorze kredytu hipotecznego. Przeczytaj też nasze
              przewodniki o{' '}
              <Link href="/blog/jak-obliczyc-zdolnosc-kredytowa" className="text-white underline hover:text-emerald-50">
                jak obliczyć zdolność kredytową
              </Link>
              ,{' '}
              <Link href="/blog/dokumenty-do-kredytu-hipotecznego" className="text-white underline hover:text-emerald-50">
                dokumentach do kredytu hipotecznego
              </Link>
              {' '}i{' '}
              <Link href="/blog/jak-dlugo-trwa-proces-kredytowy" className="text-white underline hover:text-emerald-50">
                jak długo trwa proces kredytowy
              </Link>
              .
            </SummaryText>
            <SummaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź zdolność kredytową przed wnioskiem
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

const CtaBox = tw.div`mx-auto mt-8 max-w-3xl rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-sm`
const CtaTitle = tw.h3`mb-2 text-xl font-semibold text-gray-900`
const CtaText = tw.p`mb-4 text-sm leading-relaxed text-gray-600 sm:text-base`
const CtaButton = tw(Link)`inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500`

const StepsList = tw.ul`mx-auto max-w-4xl space-y-8`
const StepCard = tw.li`flex gap-6 rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm`
const StepHeader = tw.div`flex shrink-0 items-start gap-4`
const StepNumber = tw.span`flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white`
const StepIcon = tw.span`flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const StepContent = tw.div`flex-1`
const StepTitle = tw.h3`mb-2 text-xl font-semibold text-gray-900`
const StepDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const StepDetails = tw.ul`grid gap-2 text-sm text-gray-600 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`

const DocumentsGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const DocumentCard = tw.li`rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm`
const DocumentCategory = tw.h3`mb-4 text-xl font-semibold text-gray-900`
const DocumentList = tw.ul`grid gap-2 text-sm text-gray-600 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`

const TipsList = tw.ul`mx-auto max-w-3xl space-y-4`
const TipItem = tw.li`flex gap-4 rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm`
const TipIcon = tw.span`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white`
const TipContent = tw.div`flex-1`
const TipTitle = tw.h3`mb-2 text-lg font-semibold text-gray-900`
const TipDescription = tw.p`text-sm leading-relaxed text-gray-600`

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

