import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowLongRight,
  HiOutlineCalculator,
  HiOutlineCheckCircle,
  HiOutlineCreditCard,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'
import { getPostRobotsMetadata } from 'utils/blog-posts'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {
  robots: getPostRobotsMetadata('ukryte-koszty-kredytu-hipotecznego'),

  title: 'Ukryte koszty kredytu hipotecznego - na co uważać?',
  description:
    'Poznaj ukryte koszty kredytu hipotecznego: ubezpieczenia, opłaty za konto, prowizje i inne. Dowiedz się, jak uniknąć niespodzianek i obliczyć pełny koszt kredytu.',
  alternates: {
    canonical: `${siteUrl}/blog/ukryte-koszty-kredytu-hipotecznego`,
  },
  keywords: [
    'ukryte koszty kredytu hipotecznego',
    'koszty kredytu hipotecznego',
    'opłaty kredyt hipoteczny',
    'prowizja kredyt hipoteczny',
    'ile kosztuje kredyt hipoteczny łącznie',
    'dodatkowe koszty kredytu hipotecznego',
    'opłaty przygotowawcze kredyt hipoteczny',
  ],
  openGraph: {
    title: 'Ukryte koszty kredytu hipotecznego - na co uważać?',
    description:
      'Kompletny przewodnik po ukrytych kosztach kredytu hipotecznego: ubezpieczenia, opłaty, prowizje i jak je uniknąć.',
    url: `${siteUrl}/blog/ukryte-koszty-kredytu-hipotecznego`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Ukryte koszty kredytu hipotecznego',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ukryte koszty kredytu hipotecznego - przewodnik',
    description: 'Dowiedz się, jakie ukryte koszty mogą Cię zaskoczyć przy kredycie hipotecznym.',
    images: [`${siteUrl}/og-image.jpg`],
  },
}

const hiddenCosts = [
  {
    title: 'Ubezpieczenia obowiązkowe',
    description:
      'Banki często wymagają ubezpieczenia nieruchomości i na życie, które mogą kosztować nawet kilka tysięcy złotych rocznie. Te koszty nie zawsze są widoczne w podstawowej ofercie.',
    cost: '2000-8000 zł rocznie',
    impact: 'wysoki',
    icon: HiOutlineShieldCheck,
    tips: [
      'Sprawdź, czy ubezpieczenia są obowiązkowe',
      'Porównaj oferty ubezpieczeń z różnych towarzystw',
      'Negocjuj warunki ubezpieczeń z bankiem',
      'Sprawdź możliwość rezygnacji po pierwszym roku',
    ],
  },
  {
    title: 'Opłaty za prowadzenie konta',
    description:
      'Wiele banków wymaga otwarcia konta osobistego przy kredycie hipotecznym. Opłaty za konto mogą wynosić nawet 50-100 zł miesięcznie, co w skali roku daje 600-1200 zł.',
    cost: '600-1200 zł rocznie',
    impact: 'średni',
    icon: HiOutlineCreditCard,
    tips: [
      'Sprawdź, czy konto jest obowiązkowe',
      'Porównaj opłaty za konto w różnych bankach',
      'Negocjuj bezpłatne konto przy kredycie',
      'Sprawdź warunki zwolnienia z opłat',
    ],
  },
  {
    title: 'Prowizja za udzielenie',
    description:
      'Prowizja za udzielenie kredytu to jednorazowa opłata, która może wynosić nawet 2% kwoty kredytu. Przy kredycie 500 000 zł to 10 000 zł dodatkowego kosztu.',
    cost: '0-2% kwoty kredytu',
    impact: 'wysoki',
    icon: HiOutlineCurrencyDollar,
    tips: [
      'Sprawdź wysokość prowizji w ofercie',
      'Negocjuj obniżenie lub zniesienie prowizji',
      'Szukaj promocji z obniżoną prowizją',
      'Uwzględnij prowizję w całkowitym koszcie',
    ],
  },
  {
    title: 'Opłaty za wcześniejszą spłatę',
    description:
      'Niektóre banki pobierają opłaty za wcześniejszą spłatę lub nadpłatę kredytu. Te opłaty mogą wynosić nawet kilka procent kwoty spłaty.',
    cost: '0-3% kwoty spłaty',
    impact: 'średni',
    icon: HiOutlineExclamationTriangle,
    tips: [
      'Sprawdź warunki wcześniejszej spłaty',
      'Negocjuj brak opłat za nadpłatę',
      'Uwzględnij opłaty w planach spłaty',
      'Porównaj warunki różnych banków',
    ],
  },
  {
    title: 'Opłaty za aneksy i zmiany',
    description:
      'Opłaty za zmiany w umowie kredytowej (aneksy) mogą kosztować nawet kilkaset złotych za każdą zmianę. To może być kosztowne, jeśli planujesz zmiany w przyszłości.',
    cost: '200-1000 zł za zmianę',
    impact: 'niski',
    icon: HiOutlineDocumentText,
    tips: [
      'Sprawdź opłaty za aneksy w umowie',
      'Negocjuj brak opłat za pierwsze zmiany',
      'Planuj zmiany z wyprzedzeniem',
      'Unikaj niepotrzebnych zmian',
    ],
  },
  {
    title: 'Opłaty za wycenę nieruchomości',
    description:
      'Bank wymaga wyceny nieruchomości przed udzieleniem kredytu. Koszt wyceny może wynosić 300-1000 zł i jest zwykle ponoszony przez kredytobiorcę.',
    cost: '300-1000 zł',
    impact: 'niski',
    icon: HiOutlineCheckCircle,
    tips: [
      'Sprawdź, kto ponosi koszt wyceny',
      'Porównaj koszty wyceny w różnych bankach',
      'Negocjuj pokrycie kosztu przez bank',
      'Uwzględnij koszt w budżecie',
    ],
  },
]

const howToAvoid = [
  {
    title: 'Czytaj umowę dokładnie',
    description:
      'Przeczytaj umowę kredytową dokładnie przed podpisaniem. Zwróć uwagę na wszystkie opłaty, prowizje i warunki. Jeśli coś jest niejasne, poproś o wyjaśnienie.',
    icon: HiOutlineDocumentText,
  },
  {
    title: 'Porównuj pełne koszty',
    description:
      'Nie porównuj tylko oprocentowania - porównuj pełne koszty kredytu (RRSO), które uwzględniają wszystkie opłaty. Użyj kalkulatora kredytu hipotecznego do porównania.',
    icon: HiOutlineCalculator,
  },
  {
    title: 'Negocjuj warunki',
    description:
      'Wiele opłat jest negocjowalnych. Negocjuj prowizję, opłaty za konto, ubezpieczenia i inne koszty. Banki często są skłonne do obniżenia opłat, aby zdobyć klienta.',
    icon: HiOutlineCheckCircle,
  },
  {
    title: 'Sprawdź warunki po pierwszym roku',
    description:
      'Niektóre opłaty mogą być promocyjne tylko przez pierwszy rok. Sprawdź, jakie opłaty będą obowiązywać po zakończeniu promocji i czy możesz z nich zrezygnować.',
    icon: HiOutlineExclamationTriangle,
  },
]

const faqData = [
  {
    question: 'Jakie są ukryte koszty kredytu hipotecznego?',
    answer:
      'Ukryte koszty kredytu hipotecznego to koszty, które nie zawsze są widoczne w podstawowej ofercie: ubezpieczenia obowiązkowe, opłaty za prowadzenie konta, prowizja za udzielenie, opłaty za wcześniejszą spłatę, opłaty za aneksy i wycenę nieruchomości. Te koszty mogą znacząco zwiększyć całkowity koszt kredytu.',
  },
  {
    question: 'Ile kosztuje kredyt hipoteczny łącznie?',
    answer:
      'Całkowity koszt kredytu hipotecznego składa się z: rat kredytu (kapitał + odsetki), prowizji za udzielenie, ubezpieczeń, opłat za konto i innych opłat. Przy kredycie 500 000 zł na 25 lat, całkowity koszt może wynosić nawet 700 000-800 000 zł. Użyj kalkulatora kredytu hipotecznego, aby obliczyć pełny koszt dla swoich parametrów.',
  },
  {
    question: 'Czy mogę uniknąć ukrytych kosztów?',
    answer:
      'Niektóre ukryte koszty można uniknąć lub zminimalizować poprzez negocjacje z bankiem, porównanie ofert i dokładne czytanie umowy. Warto negocjować prowizję, opłaty za konto i ubezpieczenia. Niektóre opłaty są jednak obowiązkowe (np. wycena nieruchomości).',
  },
  {
    question: 'Czy ubezpieczenia są obowiązkowe?',
    answer:
      'Ubezpieczenie nieruchomości jest zazwyczaj obowiązkowe przy kredycie hipotecznym. Ubezpieczenie na życie może być obowiązkowe lub opcjonalne, w zależności od banku i warunków kredytu. Warto sprawdzić warunki w ofercie i negocjować możliwość rezygnacji z ubezpieczeń po pierwszym roku.',
  },
  {
    question: 'Czy mogę zrezygnować z ubezpieczeń po pierwszym roku?',
    answer:
      'To zależy od warunków umowy kredytowej. Niektóre banki pozwalają na rezygnację z ubezpieczeń po pierwszym roku, inne wymagają ubezpieczeń przez cały okres kredytowania. Warto sprawdzić warunki w umowie i negocjować możliwość rezygnacji przed podpisaniem.',
  },
  {
    question: 'Jak obliczyć pełny koszt kredytu?',
    answer:
      'Pełny koszt kredytu można obliczyć, sumując wszystkie koszty: raty kredytu (kapitał + odsetki), prowizję, ubezpieczenia, opłaty za konto i inne opłaty. Najlepiej użyć kalkulatora kredytu hipotecznego, który automatycznie obliczy pełny koszt dla Twoich parametrów i uwzględni wszystkie opłaty.',
  },
  {
    question: 'Czy prowizja jest zawsze pobierana?',
    answer:
      'Nie, prowizja nie zawsze jest pobierana. Niektóre banki oferują promocje z obniżoną lub zerową prowizją. Prowizja jest również często negocjowalna, szczególnie jeśli masz dobrą zdolność kredytową lub jesteś wartościowym klientem. Warto negocjować prowizję przed podpisaniem umowy.',
  },
  {
    question: 'Jakie opłaty mogą być dodane później?',
    answer:
      'Niektóre opłaty mogą być dodane później, jeśli zmienią się warunki umowy lub jeśli bank wprowadzi nowe opłaty. Warto sprawdzić w umowie, czy bank może jednostronnie wprowadzać nowe opłaty i jakie są warunki takich zmian. Niektóre opłaty mogą być również dodawane po zakończeniu promocji.',
  },
]

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Ukryte koszty kredytu hipotecznego - na co uważać?',
  description:
    'Kompletny przewodnik po ukrytych kosztach kredytu hipotecznego: ubezpieczenia, opłaty, prowizje i jak je uniknąć.',
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
  datePublished: '2025-12-17',
  dateModified: '2025-12-17',
  mainEntityOfPage: `${siteUrl}/blog/ukryte-koszty-kredytu-hipotecznego`,
  articleSection: ['Koszty kredytu', 'Kredyt hipoteczny', 'Poradniki finansowe'],
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
      name: 'Ukryte koszty kredytu hipotecznego',
      item: `${siteUrl}/blog/ukryte-koszty-kredytu-hipotecznego`,
    },
  ],
}

const relatedArticles = [
  {
    slug: 'rrso-kredyt-hipoteczny',
    title: 'RRSO kredytu hipotecznego - co to jest?',
    description: 'Poznaj RRSO i dowiedz się, jak porównać pełne koszty kredytu.',
  },
  {
    slug: 'prowizja-kredyt-hipoteczny',
    title: 'Prowizja za udzielenie kredytu hipotecznego',
    description: 'Dowiedz się, ile wynosi prowizja i jak ją zmniejszyć.',
  },
  {
    slug: 'ubezpieczenie-kredytu-hipotecznego',
    title: 'Ubezpieczenie kredytu hipotecznego',
    description: 'Poznaj rodzaje ubezpieczeń i ich wpływ na koszt kredytu.',
  },
  {
    slug: 'jak-wybrac-najlepszy-kredyt-hipoteczny',
    title: 'Jak wybrać najlepszy kredyt hipoteczny?',
    description: 'Kompleksowy przewodnik po wyborze najlepszego kredytu.',
  },
]

export default function HiddenCostsPage() {
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
              <BreadcrumbCurrent>Ukryte koszty kredytu hipotecznego</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbNav>

        <HeroSection>
          <HeroEyebrow>Koszty i opłaty</HeroEyebrow>
          <HeroTitle>Ukryte koszty kredytu hipotecznego - na co uważać?</HeroTitle>
          <HeroLead>
            Oprócz raty kredytu, kredyt hipoteczny wiąże się z wieloma dodatkowymi kosztami, które
            nie zawsze są widoczne w podstawowej ofercie. Ubezpieczenia, opłaty za konto, prowizje i
            inne koszty mogą znacząco zwiększyć całkowity koszt kredytu. W tym przewodniku dowiesz
            się, jakie są ukryte koszty kredytu hipotecznego, jak je uniknąć i jak obliczyć pełny
            koszt kredytu. Zobacz pełny koszt kredytu w naszym kalkulatorze - wszystkie opłaty
            wliczone.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Oblicz pełny koszt kredytu w kalkulatorze
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
                <strong>Ukryte koszty mogą wynieść nawet 20-30% kwoty kredytu</strong> -
                ubezpieczenia, prowizje, opłaty za konto i inne.
              </li>
              <li>
                <strong>Niektóre koszty są negocjowalne</strong> - prowizja, opłaty za konto i
                ubezpieczenia można negocjować z bankiem.
              </li>
              <li>
                <strong>Porównuj pełne koszty (RRSO)</strong> - nie tylko oprocentowanie, ale
                wszystkie koszty razem.
              </li>
              <li>
                <strong>Czytaj umowę dokładnie</strong> - wszystkie opłaty powinny być wymienione w
                umowie kredytowej.
              </li>
            </IntroList>
          </IntroContent>
        </IntroCard>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineExclamationTriangle size={18} />
              Ukryte koszty
            </SectionBadge>
            <SectionTitle>Jakie są ukryte koszty kredytu hipotecznego?</SectionTitle>
            <SectionSubtitle>
              Poznaj wszystkie ukryte koszty, które mogą Cię zaskoczyć przy kredycie hipotecznym i
              zwiększyć całkowity koszt finansowania.
            </SectionSubtitle>
          </SectionHeader>
          <CostsGrid role="list">
            {hiddenCosts.map((cost) => {
              const IconComponent = cost.icon
              return (
                <CostCard key={cost.title} role="listitem">
                  <CostHeader>
                    <CostIcon aria-hidden="true">
                      <IconComponent size={24} />
                    </CostIcon>
                    <CostTitle>{cost.title}</CostTitle>
                    <CostBadge impact={cost.impact}>
                      {cost.impact === 'wysoki'
                        ? 'Wysoki wpływ'
                        : cost.impact === 'średni'
                          ? 'Średni wpływ'
                          : 'Niski wpływ'}
                    </CostBadge>
                  </CostHeader>
                  <CostDescription>{cost.description}</CostDescription>
                  <CostAmount>
                    <strong>Szacowany koszt:</strong> {cost.cost}
                  </CostAmount>
                  <CostTips>
                    <CostTipsTitle>Jak uniknąć lub zminimalizować:</CostTipsTitle>
                    <CostTipsList>
                      {cost.tips.map((tip) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </CostTipsList>
                  </CostTips>
                </CostCard>
              )
            })}
          </CostsGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineCheckCircle size={18} />
              Zapobieganie
            </SectionBadge>
            <SectionTitle>Jak uniknąć ukrytych kosztów?</SectionTitle>
            <SectionSubtitle>
              Oto praktyczne wskazówki, które pomogą Ci uniknąć lub zminimalizować ukryte koszty
              kredytu hipotecznego.
            </SectionSubtitle>
          </SectionHeader>
          <AvoidGrid role="list">
            {howToAvoid.map((tip) => {
              const IconComponent = tip.icon
              return (
                <AvoidCard key={tip.title} role="listitem">
                  <AvoidIcon aria-hidden="true">
                    <IconComponent size={24} />
                  </AvoidIcon>
                  <AvoidTitle>{tip.title}</AvoidTitle>
                  <AvoidDescription>{tip.description}</AvoidDescription>
                </AvoidCard>
              )
            })}
          </AvoidGrid>
          <CtaBox>
            <CtaTitle>Oblicz pełny koszt kredytu w kalkulatorze</CtaTitle>
            <CtaText>
              Nasz kalkulator kredytu hipotecznego automatycznie uwzględnia wszystkie koszty:
              oprocentowanie, prowizję, ubezpieczenia i inne opłaty. Zobacz pełny koszt kredytu dla
              swoich parametrów i porównaj oferty banków.
            </CtaText>
            <CtaButton href="/kalkulator/kredyt-hipoteczny">
              Oblicz pełny koszt w kalkulatorze
              <HiOutlineArrowLongRight size={18} />
            </CtaButton>
          </CtaBox>
        </Section>

        <Section>
          <SectionHeader>
            <SectionBadge aria-hidden="true">
              <HiOutlineCalculator size={18} />
              Obliczanie
            </SectionBadge>
            <SectionTitle>Jak obliczyć pełny koszt kredytu?</SectionTitle>
            <SectionSubtitle>
              Pełny koszt kredytu hipotecznego składa się z wielu elementów. Oto jak go obliczyć.
            </SectionSubtitle>
          </SectionHeader>
          <ArticleText>
            Pełny koszt kredytu hipotecznego to suma wszystkich kosztów związanych z kredytem: rat
            kredytu (kapitał + odsetki), prowizji za udzielenie, ubezpieczeń, opłat za konto i
            innych opłat. Przy kredycie 500 000 zł na 25 lat przy oprocentowaniu 7%, całkowity koszt
            może wynosić nawet 700 000-800 000 zł.
          </ArticleText>
          <ArticleText>
            Najlepszym sposobem na obliczenie pełnego kosztu kredytu jest użycie kalkulatora kredytu
            hipotecznego, który automatycznie uwzględnia wszystkie koszty i oblicza RRSO
            (Rzeczywistą Roczna Stopę Oprocentowania). RRSO pokazuje rzeczywisty koszt kredytu w
            skali roku, uwzględniając wszystkie opłaty. Więcej o RRSO znajdziesz w naszym artykule:{' '}
            <Link
              href="/blog/rrso-kredyt-hipoteczny"
              className="text-emerald-700 underline hover:text-emerald-800"
            >
              RRSO kredytu hipotecznego - co to jest i jak je obliczyć?
            </Link>
            .
          </ArticleText>
          <CtaBox>
            <CtaTitle>Użyj kalkulatora do obliczenia pełnego kosztu</CtaTitle>
            <CtaText>
              Nasz kalkulator kredytu hipotecznego automatycznie oblicza pełny koszt kredytu,
              uwzględniając wszystkie opłaty: oprocentowanie, prowizję, ubezpieczenia i inne koszty.
              Zobacz, ile naprawdę kosztuje kredyt.
            </CtaText>
            <CtaButton href="/kalkulator/kredyt-hipoteczny">
              Oblicz pełny koszt w kalkulatorze
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
            <SectionTitle>Najczęściej zadawane pytania o ukryte koszty</SectionTitle>
            <SectionSubtitle>
              Odpowiedzi na najpopularniejsze pytania dotyczące ukrytych kosztów kredytu
              hipotecznego.
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
              Ukryte koszty kredytu hipotecznego mogą znacząco zwiększyć całkowity koszt
              finansowania. Najważniejsze ukryte koszty to: ubezpieczenia obowiązkowe, opłaty za
              prowadzenie konta, prowizja za udzielenie, opłaty za wcześniejszą spłatę i opłaty za
              aneksy. Te koszty mogą wynieść nawet 20-30% kwoty kredytu.
            </SummaryText>
            <SummaryText>
              Aby uniknąć ukrytych kosztów, warto: dokładnie czytać umowę, porównywać pełne koszty
              (RRSO), negocjować warunki z bankiem i sprawdzać warunki po pierwszym roku. Użyj
              naszego kalkulatora kredytu hipotecznego, aby obliczyć pełny koszt kredytu z
              wszystkimi opłatami wliczonymi. Przeczytaj też nasze przewodniki o{' '}
              <Link
                href="/blog/prowizja-kredyt-hipoteczny"
                className="text-white underline hover:text-emerald-50"
              >
                prowizji za udzielenie kredytu
              </Link>
              ,{' '}
              <Link
                href="/blog/ubezpieczenie-kredytu-hipotecznego"
                className="text-white underline hover:text-emerald-50"
              >
                ubezpieczeniu kredytu hipotecznego
              </Link>{' '}
              i{' '}
              <Link
                href="/blog/jak-wybrac-najlepszy-kredyt-hipoteczny"
                className="text-white underline hover:text-emerald-50"
              >
                jak wybrać najlepszy kredyt hipoteczny
              </Link>
              .
            </SummaryText>
            <SummaryCta href="/kalkulator/kredyt-hipoteczny">
              Oblicz pełny koszt kredytu w kalkulatorze
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
const BreadcrumbLink = tw(
  Link,
)`text-emerald-700 hover:text-emerald-800 hover:underline transition-colors`
const BreadcrumbSeparator = tw.span`text-gray-400 mx-1`
const BreadcrumbCurrent = tw.span`text-gray-900 font-medium`

const PageWrapper = tw.main`min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-100`
const ContentContainer = tw.div`mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20`

const HeroSection = tw.section`mx-auto max-w-3xl text-center`
const HeroEyebrow = tw.span`mb-4 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700`
const HeroTitle = tw.h1`mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl`
const HeroLead = tw.p`mx-auto mb-8 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg`
const HeroActions = tw.div`flex flex-col items-center justify-center gap-3 sm:flex-row`

const PrimaryCta = tw(
  Link,
)`inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500`

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
const CtaButton = tw(
  Link,
)`inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500`

const CostsGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const CostCard = tw.li`flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1 hover:shadow-lg`
const CostHeader = tw.div`mb-4 flex items-start justify-between gap-4`
const CostIcon = tw.span`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const CostTitle = tw.h3`flex-1 text-xl font-semibold text-gray-900`
const CostBadge = tw.span<{
  impact: string
}>`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${({ impact }) =>
  impact === 'wysoki'
    ? 'bg-red-100 text-red-700'
    : impact === 'średni'
      ? 'bg-amber-100 text-amber-700'
      : 'bg-gray-100 text-gray-700'}`
const CostDescription = tw.p`mb-4 text-sm leading-relaxed text-gray-600`
const CostAmount = tw.p`mb-4 rounded-lg bg-emerald-50 p-3 text-sm font-semibold text-emerald-800`
const CostTips = tw.div`mt-auto`
const CostTipsTitle = tw.h4`mb-2 text-sm font-semibold text-gray-900`
const CostTipsList = tw.ul`grid gap-2 text-sm text-gray-600 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-emerald-500 [&_li]:before:content-['•']`

const AvoidGrid = tw.ul`grid grid-cols-1 gap-6 sm:grid-cols-2`
const AvoidCard = tw.li`flex h-full flex-col rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1 hover:shadow-lg`
const AvoidIcon = tw.span`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700`
const AvoidTitle = tw.h3`mb-2 text-xl font-semibold text-gray-900`
const AvoidDescription = tw.p`text-sm leading-relaxed text-gray-600`

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
const SummaryCta = tw(
  Link,
)`mt-6 inline-flex items-center gap-2 self-center rounded-full bg-white px-6 py-3 font-semibold text-emerald-600 transition-colors hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`
