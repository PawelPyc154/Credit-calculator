import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowRight,
  HiOutlineArrowPath,
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalculator,
  HiOutlineChartBar,
  HiOutlineClipboardDocumentCheck,
  HiOutlineClock,
  HiOutlineCreditCard,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlineHandRaised,
  HiOutlineHome,
  HiOutlineShieldCheck,
  HiOutlineTrophy,
  HiOutlineUser,
  HiOutlineUsers,
  HiOutlineWrenchScrewdriver,
} from 'react-icons/hi2'
import tw from 'tw-tailwind'
import { filterPublishedPosts, sortPostsByDate } from 'utils/blog-posts'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {
  title: 'Blog | Poradniki i artykuły o kredytach hipotecznych',
  description:
    'Poznaj praktyczne poradniki o kredytach hipotecznych: ryzyka kredytowe, jak wybrać bank, wkład własny i inne ważne tematy.',
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  keywords: [
    'blog kredytowy',
    'poradniki kredytowe',
    'artykuły o kredytach',
    'kredyt hipoteczny poradnik',
    'edukacja kredytowa',
  ],
  openGraph: {
    title: 'Blog | Poradniki o kredytach hipotecznych',
    description: 'Praktyczne artykuły i poradniki o kredytach hipotecznych dla świadomych decyzji finansowych.',
    url: `${siteUrl}/blog`,
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Blog o kredytach hipotecznych',
      },
    ],
  },
}

const blogPosts = [
  {
    slug: 'kredyt-hipoteczny-2025-zmiany-przepisy',
    title: 'Kredyt hipoteczny 2025 - zmiany w przepisach i nowe regulacje',
    description:
      'Poznaj najważniejsze zmiany w przepisach dotyczących kredytów hipotecznych w 2025: nowe regulacje, wymagania i wpływ na kredytobiorców. Sprawdź aktualne oferty w kalkulatorze.',
    category: 'Zmiany w przepisach',
    icon: HiOutlineDocumentText,
    readTime: '13 min',
  },
  {
    slug: 'kredyt-hipoteczny-a-smierc-kredytobiorcy',
    title: 'Kredyt hipoteczny a śmierć kredytobiorcy - co się dzieje z kredytem?',
    description:
      'Dowiedz się, co się dzieje z kredytem hipotecznym po śmierci kredytobiorcy: ubezpieczenie, przejęcie kredytu przez spadkobierców i inne rozwiązania. Sprawdź opcje w kalkulatorze.',
    category: 'Śmierć kredytobiorcy',
    icon: HiOutlineExclamationTriangle,
    readTime: '12 min',
  },
  {
    slug: 'kredyt-hipoteczny-a-rozwod',
    title: 'Kredyt hipoteczny a rozwód - co się dzieje z kredytem?',
    description:
      'Dowiedz się, co się dzieje z kredytem hipotecznym przy rozwodzie: podział kredytu, przejęcie kredytu, sprzedaż nieruchomości i inne rozwiązania. Sprawdź opcje w kalkulatorze.',
    category: 'Rozwód',
    icon: HiOutlineUsers,
    readTime: '12 min',
  },
  {
    slug: 'kredyt-hipoteczny-na-budowe-domu',
    title: 'Kredyt hipoteczny na budowę domu - poradnik 2025',
    description:
      'Dowiedz się, jak wziąć kredyt hipoteczny na budowę domu: wymagania, dokumenty, harmonogram wypłat i wskazówki. Sprawdź oferty w kalkulatorze.',
    category: 'Budowa domu',
    icon: HiOutlineWrenchScrewdriver,
    readTime: '13 min',
  },
  {
    slug: 'co-zrobic-gdy-nie-mozesz-splacac-kredytu',
    title: 'Co zrobić, gdy nie możesz spłacać kredytu hipotecznego?',
    description:
      'Dowiedz się, co zrobić, gdy nie możesz spłacać kredytu hipotecznego: odroczenie rat, restrukturyzacja, pomoc prawna i inne rozwiązania. Sprawdź swoje opcje w kalkulatorze.',
    category: 'Problemy ze spłatą',
    icon: HiOutlineExclamationTriangle,
    readTime: '13 min',
  },
  {
    slug: 'pulapki-kredytu-hipotecznego',
    title: 'Pułapki kredytu hipotecznego - na co uważać?',
    description:
      'Poznaj najczęstsze pułapki kredytu hipotecznego: ukryte koszty, niekorzystne warunki, zmienne oprocentowanie i inne. Dowiedz się, jak ich uniknąć i sprawdź oferty w kalkulatorze.',
    category: 'Pułapki',
    icon: HiOutlineExclamationTriangle,
    readTime: '12 min',
  },
  {
    slug: 'stopy-procentowe-kredyt-hipoteczny-2025',
    title: 'Stopy procentowe a kredyt hipoteczny 2025 - przewodnik',
    description:
      'Dowiedz się, jak stopy procentowe wpływają na kredyt hipoteczny: WIBOR, stopy NBP, zmiany stóp i ich wpływ na ratę. Sprawdź aktualne stopy w kalkulatorze.',
    category: 'Stopy procentowe',
    icon: HiOutlineChartBar,
    readTime: '13 min',
  },
  {
    slug: 'jak-korzystac-z-kalkulatora-kredytu-hipotecznego',
    title: 'Kalkulator kredytu hipotecznego - jak z niego korzystać? Poradnik',
    description:
      'Dowiedz się, jak korzystać z kalkulatora kredytu hipotecznego: wprowadzanie danych, interpretacja wyników i porównywanie ofert banków. Kompletny przewodnik.',
    category: 'Kalkulator',
    icon: HiOutlineCalculator,
    readTime: '11 min',
  },
  {
    slug: 'kredyt-hipoteczny-dla-przedsiebiorcy',
    title: 'Kredyt hipoteczny dla przedsiębiorcy - wymagania i warunki 2025',
    description:
      'Dowiedz się, jak wziąć kredyt hipoteczny jako przedsiębiorca: wymagania, dokumenty, zdolność kredytowa i wskazówki. Sprawdź swoją zdolność w kalkulatorze.',
    category: 'Dla przedsiębiorców',
    icon: HiOutlineBriefcase,
    readTime: '13 min',
  },
  {
    slug: 'kredyt-hipoteczny-dla-singla',
    title: 'Kredyt hipoteczny dla singla - poradnik 2025',
    description:
      'Dowiedz się, jak wziąć kredyt hipoteczny jako singiel: wymagania, zdolność kredytowa, wkład własny i wskazówki. Sprawdź swoją zdolność kredytową w kalkulatorze.',
    category: 'Dla singli',
    icon: HiOutlineUser,
    readTime: '12 min',
  },
  {
    slug: 'jak-negocjowac-warunki-kredytu-hipotecznego',
    title: 'Jak negocjować warunki kredytu hipotecznego? Poradnik',
    description:
      'Dowiedz się, jak negocjować warunki kredytu hipotecznego: prowizję, oprocentowanie i inne opłaty. Praktyczne wskazówki i techniki negocjacji.',
    category: 'Negocjacje',
    icon: HiOutlineHandRaised,
    readTime: '12 min',
  },
  {
    slug: 'jak-wybrac-najlepszy-kredyt-hipoteczny',
    title: 'Jak wybrać najlepszy kredyt hipoteczny? Poradnik 2025',
    description:
      'Dowiedz się, jak wybrać najlepszy kredyt hipoteczny: na co zwrócić uwagę, jak porównać oferty i jakie kryteria są najważniejsze. Porównaj oferty w kalkulatorze.',
    category: 'Wybór kredytu',
    icon: HiOutlineTrophy,
    readTime: '13 min',
  },
  {
    slug: 'wczesniejsza-splata-kredytu-hipotecznego',
    title: 'Wcześniejsza spłata kredytu hipotecznego - opłaty i korzyści',
    description:
      'Dowiedz się, czy warto spłacić kredyt hipoteczny wcześniej, jakie są opłaty za wcześniejszą spłatę i jakie korzyści. Oblicz oszczędności w kalkulatorze.',
    category: 'Zarządzanie kredytem',
    icon: HiOutlineCurrencyDollar,
    readTime: '11 min',
  },
  {
    slug: 'refinansowanie-kredytu-hipotecznego',
    title: 'Refinansowanie kredytu hipotecznego - czy warto?',
    description:
      'Dowiedz się, czy warto refinansować kredyt hipoteczny, jakie są korzyści i koszty refinansowania. Porównaj oferty refinansowania w kalkulatorze.',
    category: 'Zarządzanie kredytem',
    icon: HiOutlineArrowPath,
    readTime: '12 min',
  },
  {
    slug: 'jak-dlugo-trwa-proces-kredytowy',
    title: 'Jak długo trwa proces kredytowy? Terminy 2025',
    description:
      'Dowiedz się, ile trwa proces kredytowy: od złożenia wniosku do podpisania umowy. Sprawdź terminy i etapy procesu kredytowego w 2025.',
    category: 'Proces kredytowy',
    icon: HiOutlineClock,
    readTime: '11 min',
  },
  {
    slug: 'dokumenty-do-kredytu-hipotecznego',
    title: 'Dokumenty do kredytu hipotecznego - kompletna lista 2025',
    description:
      'Sprawdź, jakie dokumenty są potrzebne do kredytu hipotecznego: dokumenty tożsamości, dochód, nieruchomość i inne. Kompletna lista dokumentów 2025.',
    category: 'Proces kredytowy',
    icon: HiOutlineDocumentText,
    readTime: '12 min',
  },
  {
    slug: 'prowizja-kredyt-hipoteczny',
    title: 'Prowizja za udzielenie kredytu hipotecznego - ile wynosi?',
    description:
      'Dowiedz się, ile wynosi prowizja za udzielenie kredytu hipotecznego, czy jest obowiązkowa i jak ją uniknąć. Porównaj prowizje różnych banków w kalkulatorze.',
    category: 'Koszty i opłaty',
    icon: HiOutlineCurrencyDollar,
    readTime: '10 min',
  },
  {
    slug: 'jak-zlozyc-wniosek-o-kredyt-hipoteczny',
    title: 'Jak złożyć wniosek o kredyt hipoteczny? Krok po kroku',
    description:
      'Dowiedz się, jak złożyć wniosek o kredyt hipoteczny krok po kroku: dokumenty, proces, terminy i wskazówki. Sprawdź swoją zdolność kredytową przed wizytą w banku.',
    category: 'Proces kredytowy',
    icon: HiOutlineClipboardDocumentCheck,
    readTime: '12 min',
  },
  {
    slug: 'ubezpieczenie-kredytu-hipotecznego',
    title: 'Ubezpieczenie kredytu hipotecznego - czy jest obowiązkowe?',
    description:
      'Dowiedz się, jakie ubezpieczenia są wymagane przy kredycie hipotecznym, ile kosztują i czy można z nich zrezygnować. Sprawdź koszty w kalkulatorze.',
    category: 'Koszty i opłaty',
    icon: HiOutlineShieldCheck,
    readTime: '11 min',
  },
  {
    slug: 'ukryte-koszty-kredytu-hipotecznego',
    title: 'Ukryte koszty kredytu hipotecznego - na co uważać?',
    description:
      'Poznaj ukryte koszty kredytu hipotecznego: ubezpieczenia, opłaty za konto, prowizje i inne. Dowiedz się, jak uniknąć niespodzianek i obliczyć pełny koszt kredytu.',
    category: 'Koszty i opłaty',
    icon: HiOutlineCreditCard,
    readTime: '13 min',
  },
  {
    slug: 'kredyt-hipoteczny-dla-mlodych-programy-wsparcia',
    title: 'Kredyt hipoteczny dla młodych - programy wsparcia 2025',
    description:
      'Poznaj programy wsparcia dla młodych przy zakupie mieszkania: mdM, Rodzina na Swoim i inne. Sprawdź warunki i możliwości kredytu hipotecznego dla młodych.',
    category: 'Programy wsparcia',
    icon: HiOutlineUsers,
    readTime: '13 min',
  },
  {
    slug: 'kredyt-hipoteczny-bez-wkladu-wlasnego',
    title: 'Kredyt hipoteczny bez wkładu własnego - czy to możliwe?',
    description:
      'Dowiedz się, czy można wziąć kredyt hipoteczny bez wkładu własnego, jakie są warunki i alternatywy. Sprawdź program mdM i inne możliwości.',
    category: 'Porównanie banków',
    icon: HiOutlineHome,
    readTime: '11 min',
  },
  {
    slug: 'oprocentowanie-kredytu-hipotecznego-stale-czy-zmienne',
    title: 'Oprocentowanie kredytu hipotecznego - stałe czy zmienne?',
    description:
      'Dowiedz się, jakie są różnice między oprocentowaniem stałym a zmiennym, które wybrać i jak zmiany stóp procentowych wpływają na ratę kredytu.',
    category: 'Podstawy kredytu',
    icon: HiOutlineArrowPath,
    readTime: '14 min',
  },
  {
    slug: 'rrso-kredyt-hipoteczny',
    title: 'RRSO kredytu hipotecznego - co to jest i jak je obliczyć?',
    description:
      'Dowiedz się, co to jest RRSO (Rzeczywista Roczna Stopa Oprocentowania), jak je obliczyć i dlaczego jest ważne przy porównywaniu ofert.',
    category: 'Podstawy kredytu',
    icon: HiOutlineChartBar,
    readTime: '12 min',
  },
  {
    slug: 'ranking-bankow-kredytow-hipotecznych-2025',
    title: 'Ranking banków kredytów hipotecznych 2025 - najlepsze oferty',
    description:
      'Porównaj oferty kredytów hipotecznych z polskich banków. Sprawdź ranking banków według oprocentowania, kosztów i warunków.',
    category: 'Porównanie banków',
    icon: HiOutlineTrophy,
    readTime: '15 min',
  },
  {
    slug: 'wklad-wlasny-kredyt-hipoteczny',
    title: 'Wkład własny na kredyt hipoteczny 2025 - ile potrzebujesz?',
    description:
      'Dowiedz się, ile wynosi minimalny wkład własny na kredyt hipoteczny, jak go obliczyć i jakie korzyści daje wyższy wkład własny.',
    category: 'Podstawy kredytu',
    icon: HiOutlineHome,
    readTime: '12 min',
  },
  {
    slug: 'jak-obliczyc-zdolnosc-kredytowa',
    title: 'Jak obliczyć zdolność kredytową? Kompletny przewodnik 2025',
    description:
      'Dowiedz się, jak banki obliczają zdolność kredytową, jakie czynniki mają wpływ i jak samodzielnie oszacować swoją zdolność przed wizytą w banku.',
    category: 'Podstawy kredytu',
    icon: HiOutlineChartBar,
    readTime: '10 min',
  },
  {
    slug: 'zagrozenia-kredytowe',
    title: 'Zagrożenia kredytowe',
    description:
      'Poznaj najczęstsze zagrożenia związane z kredytami: rosnące raty, ukryte koszty, zmienne oprocentowanie i ryzyko utraty płynności. Dowiedz się, jak się zabezpieczyć.',
    category: 'Ryzyka kredytowe',
    icon: HiOutlineExclamationTriangle,
    readTime: '8 min',
  },
]

export default function BlogPage() {
  // Filtruj tylko opublikowane artykuły i sortuj według daty (najnowsze pierwsze)
  const publishedPosts = sortPostsByDate(filterPublishedPosts(blogPosts))

  return (
    <PageWrapper>
      <ContentContainer>
        <BackLink href="/">
          <BackIcon aria-hidden="true">←</BackIcon>
          Wróć do strony głównej
        </BackLink>

        <HeroSection>
          <HeroBadge>Edukacja finansowa</HeroBadge>
          <HeroTitle>Blog o kredytach hipotecznych</HeroTitle>
          <HeroSubtitle>
            Praktyczne poradniki i artykuły, które pomogą Ci podjąć świadomą decyzję kredytową
          </HeroSubtitle>
        </HeroSection>

        <PostsSection>
          <PostsGrid>
            {publishedPosts.map((post) => {
              const IconComponent = post.icon
              return (
                <PostCard key={post.slug} href={`/blog/${post.slug}`}>
                  <PostIcon aria-hidden="true">
                    <IconComponent size={24} />
                  </PostIcon>
                  <PostCategory>{post.category}</PostCategory>
                  <PostTitle>{post.title}</PostTitle>
                  <PostDescription>{post.description}</PostDescription>
                  <PostFooter>
                    <ReadTime>{post.readTime} czytania</ReadTime>
                    <ReadMore>
                      Czytaj więcej
                      <HiOutlineArrowRight size={16} />
                    </ReadMore>
                  </PostFooter>
                </PostCard>
              )
            })}
          </PostsGrid>
        </PostsSection>

        {blogPosts.length === 0 && (
          <EmptyState>
            <EmptyIcon aria-hidden="true">
              <HiOutlineDocumentText size={48} />
            </EmptyIcon>
            <EmptyTitle>Wkrótce pojawią się nowe artykuły</EmptyTitle>
            <EmptyText>Pracujemy nad kolejnymi poradnikami o kredytach hipotecznych.</EmptyText>
          </EmptyState>
        )}
      </ContentContainer>
      <FooterMain />
    </PageWrapper>
  )
}

const PageWrapper = tw.main`min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-100`
const ContentContainer = tw.div`mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20`

const BackLink = tw(
  Link,
)`mb-8 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 no-underline hover:text-emerald-800`
const BackIcon = tw.span`inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700`

const HeroSection = tw.section`mx-auto max-w-3xl text-center mb-16`
const HeroBadge = tw.span`mb-4 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700`
const HeroTitle = tw.h1`mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl`
const HeroSubtitle = tw.p`mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg`

const PostsSection = tw.section`mt-12`
const PostsGrid = tw.div`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`
const PostCard = tw(
  Link,
)`group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg`
const PostIcon = tw.span`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 group-hover:bg-emerald-200 transition-colors`
const PostCategory = tw.span`mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-600`
const PostTitle = tw.h3`mb-3 text-xl font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors`
const PostDescription = tw.p`mb-4 flex-1 text-sm leading-relaxed text-gray-600`
const PostFooter = tw.div`flex items-center justify-between pt-4 border-t border-gray-100`
const ReadTime = tw.span`text-xs text-gray-500`
const ReadMore = tw.span`inline-flex items-center gap-1 text-sm font-medium text-emerald-700 group-hover:text-emerald-800 transition-colors`

const EmptyState = tw.div`mx-auto max-w-md text-center py-16`
const EmptyIcon = tw.span`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400`
const EmptyTitle = tw.h3`mb-2 text-xl font-semibold text-gray-900`
const EmptyText = tw.p`text-sm text-gray-600`

