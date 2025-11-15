/**
 * Wspólna lista wszystkich artykułów blogowych
 * Używana zarówno na stronie blog jak i na stronie głównej
 */

import {
  HiOutlineArrowPath,
  HiOutlineArrowRight,
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

export interface BlogPost {
  slug: string
  title: string
  description: string
  category: string
  icon: typeof HiOutlineDocumentText
  readTime: string
}

export const allBlogPosts: BlogPost[] = [
  {
    slug: 'kredyt-hipoteczny-2025-zmiany-przepisy',
    title: 'Kredyt hipoteczny 2026 - zmiany w przepisach i nowe regulacje',
    description:
      'Poznaj najważniejsze zmiany w przepisach dotyczących kredytów hipotecznych w 2026: nowe regulacje, wymagania i wpływ na kredytobiorców. Sprawdź aktualne oferty w kalkulatorze.',
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
    title: 'Kredyt hipoteczny na budowę domu - poradnik 2026',
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
    title: 'Stopy procentowe a kredyt hipoteczny 2026 - przewodnik',
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
    title: 'Kredyt hipoteczny dla przedsiębiorcy - wymagania i warunki 2026',
    description:
      'Dowiedz się, jak wziąć kredyt hipoteczny jako przedsiębiorca: wymagania, dokumenty, zdolność kredytowa i wskazówki. Sprawdź swoją zdolność w kalkulatorze.',
    category: 'Dla przedsiębiorców',
    icon: HiOutlineBriefcase,
    readTime: '13 min',
  },
  {
    slug: 'kredyt-hipoteczny-dla-singla',
    title: 'Kredyt hipoteczny dla singla - poradnik 2026',
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
    title: 'Jak wybrać najlepszy kredyt hipoteczny? Poradnik 2026',
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
    title: 'Jak długo trwa proces kredytowy? Terminy 2026',
    description:
      'Dowiedz się, ile trwa proces kredytowy: od złożenia wniosku do podpisania umowy. Sprawdź terminy i etapy procesu kredytowego w 2026.',
    category: 'Proces kredytowy',
    icon: HiOutlineClock,
    readTime: '11 min',
  },
  {
    slug: 'dokumenty-do-kredytu-hipotecznego',
    title: 'Dokumenty do kredytu hipotecznego - kompletna lista 2026',
    description:
      'Sprawdź, jakie dokumenty są potrzebne do kredytu hipotecznego: dokumenty tożsamości, dochód, nieruchomość i inne. Kompletna lista dokumentów 2026.',
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
    title: 'Kredyt hipoteczny dla młodych - programy wsparcia 2026',
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

