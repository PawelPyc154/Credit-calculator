/**
 * Draft dataset for bank offers.
 *
 * The runtime of the application nadal korzysta z `banks.json`.
 * Ten plik jest roboczym szkicem w TypeScripcie, w którym można:
 *  - dodawać komentarze do poszczególnych pól,
 *  - dokumentować źródła,
 *  - weryfikować dane przed przeniesieniem ich z powrotem do `banks.json`.
 *
 * Wszystkie pola zostały wyczyszczone – należy je uzupełniać dopiero po
 * potwierdzeniu wartości w oficjalnych dokumentach lub innych zaufanych źródłach.
 */

type SupportedPurpose = 'purchase' | 'refinancing' | 'construction'
type InterestRateType = 'fixed' | 'variable'

type Nullable<T> = T | null

export interface BankFieldSource {
  field: string
  source: string
  note?: Nullable<string>
}

export interface DraftCreditProduct {
  // --- Identyfikacja produktu ---

  /** Unikalny identyfikator produktu hipotecznego w obrębie banku. */
  creditId: string
  /** Marketingowa nazwa kredytu lub pożyczki hipotecznej. */
  creditName: string
  /** Identyfikator banku, do którego należy ten produkt. */
  bankId: string

  /** Link do oficjalnej strony produktu/wniosku. */
  offerUrl?: Nullable<string>

  // --- Parametry cenowe i stopy procentowe ---

  /**
   * Bazowe oprocentowanie (zmienne) prezentowane użytkownikowi w wynikach.
   * Najczęściej suma wskaźnika referencyjnego i marży banku.
   */
  baseInterestRate?: Nullable<number>
  /**
   * Oprocentowanie stałe (np. dla pierwszych 5 lat).
   * Używane w widokach, gdzie porównujemy warianty stałe vs zmienne.
   */
  fixedInterestRate?: Nullable<number>
  /** Aktualna wartość wskaźnika WIBOR wykorzystana przy kalkulacji. */
  wibor?: Nullable<number>
  /**
   * Marża banku dla oprocentowania zmiennego po okresie stałym (w punktach procentowych).
   */
  margin?: Nullable<number>
  /** Prowizja za udzielenie kredytu (wartość procentowa). */
  commissionRate?: Nullable<number>
  /**
   * Szacunkowy koszt ubezpieczenia wyrażony procentowo (np. polisa na życie lub nieruchomość).
   */
  insuranceRate?: Nullable<number>
  /**
   * Rzeczywista Roczna Stopa Oprocentowania dla przykładu reprezentatywnego (jeśli dostępna).
   */
  rrso?: Nullable<number>

  // --- Zakres i parametry kredytu ---

  /** Minimalna kwota kredytu, jaką bank jest skłonny rozpatrywać. */
  minLoanAmount?: Nullable<number>
  /** Maksymalna kwota kredytu możliwa do uzyskania. */
  maxLoanAmount?: Nullable<number>
  /** Minimalny okres kredytowania w latach. */
  minLoanPeriod?: Nullable<number>
  /** Maksymalny okres kredytowania w latach. */
  maxLoanPeriod?: Nullable<number>
  /** Minimalny wymagany wkład własny podany w procentach. */
  minDownPaymentPercent?: Nullable<number>

  // --- Zastosowanie produktu ---

  /**
   * Cele finansowania wspierane przez ofertę (zakup, refinansowanie, budowa).
   */
  supportedPurposes?: Nullable<SupportedPurpose[]>
  /** Obsługiwane rodzaje oprocentowania (stałe, zmienne). */
  supportedInterestRateTypes?: Nullable<InterestRateType[]>

  // --- Wymogi towarzyszące i koszty dodatkowe ---

  /** Wysokość opłaty za wcześniejszą spłatę lub nadpłatę (w procentach). */
  earlyRepaymentFee?: Nullable<number>
  /** Czy bank wymaga posiadania rachunku osobistego. */
  accountRequired?: Nullable<boolean>
  /** Miesięczna opłata za wymagany rachunek (jeśli dotyczy). */
  accountFee?: Nullable<number>
  /** Czy konieczne jest ubezpieczenie nieruchomości. */
  propertyInsuranceRequired?: Nullable<boolean>
  /** Czy bank wymaga ubezpieczenia na życie. */
  lifeInsuranceRequired?: Nullable<boolean>

  // --- Informacje prezentowane w UI ---

  /** Krótki opis oferty wyświetlany w kartach banków. */
  description?: Nullable<string>
  /** Szacowany czas rozpatrzenia wniosku (opis tekstowy). */
  processingTime?: Nullable<string>
  /** Wyróżnione promocje lub benefity dla tej oferty. */
  specialOffers?: Nullable<string[]>
  /** Lista zalet oferty do wyświetlenia w szczegółach. */
  advantages?: Nullable<string[]>
  /** Lista potencjalnych wad lub ograniczeń oferty. */
  disadvantages?: Nullable<string[]>

  // --- Korekty LTV ---

  /**
   * Zmiany marży/oprocentowania uzależnione od poziomu LTV.
   * Wartości wyrażone jako różnica w punktach procentowych.
   */
  ltvAdjustments?: Nullable<{
    /** Korekta dla wkładu na poziomie 20% (LTV 80%). */
    ratio80?: Nullable<number>
    /** Korekta dla wkładu 10% (LTV 90%). */
    ratio90?: Nullable<number>
    /** Korekta dla wkładu 5% (LTV 95%). */
    ratio95?: Nullable<number>
  }>

  // --- Przykłady reprezentatywne ---

  /** Dane przykładu reprezentatywnego dla wariantu ze stałą stopą (jeśli dostępny). */
  representativeExampleFixed?: Nullable<RepresentativeExample>
  /** Dane przykładu reprezentatywnego dla wariantu ze zmienną stopą (jeśli dostępny). */
  representativeExampleVariable?: Nullable<RepresentativeExample>

  // --- Uwagi i dokumentacja ---

  /** Data ostatniej aktualizacji danych w formacie YYYY-MM-DD. */
  updated?: Nullable<string>
  /** Dodatkowe uwagi lub zadania związane z weryfikacją produktu. */
  notes?: Nullable<string[]>
  /**
   * Dokumentacja źródeł – każdy wpis opisuje, z jakiego dokumentu/źródła pochodzi konkretne pole.
   */
  fieldSources?: Nullable<BankFieldSource[]>
}

export interface RepresentativeExample {
  /** Rzeczywista Roczna Stopa Oprocentowania dla przykładu. */
  rrso?: Nullable<number>
  /** Oprocentowanie nominalne (jeśli podano). */
  interestRate?: Nullable<number>
  /** Wskaźnik referencyjny (np. WIBOR 6M) wraz z datą. */
  referenceRate?: Nullable<string>
  /** Okres kredytowania w latach. */
  loanPeriodYears?: Nullable<number>
  /** Kwota kredytu w zł. */
  loanAmount: number
  /** Wkład własny w procentach. */
  downPaymentPercent?: Nullable<number>
  /** Całkowity koszt kredytu. */
  totalCost?: Nullable<number>
  /** Koszty wyszczególnione (np. odsetki, ubezpieczenia). */
  costBreakdown?: Nullable<string[]>
  /** Wysokość pierwszych rat / harmonogram (jeśli podano). */
  paymentScheduleNote?: Nullable<string>
  /** Data wykonania kalkulacji. */
  calculationDate?: Nullable<string>
  /** Dodatkowe uwagi lub informacje. */
  notes?: Nullable<string[]>
}

export interface DraftBank {
  // --- Identyfikacja banku ---

  /** Unikalny identyfikator banku wykorzystywany w aplikacji. */
  id: string
  /** Oficjalna nazwa instytucji finansowej. */
  name: string
  /** Ścieżka do logo banku w katalogu publicznym. */
  logo?: Nullable<string>

  // --- Meta i dokumentacja banku ---

  /**
   * Uwagi globalne dotyczące banku (np. status współpracy, planowane działania, kontakt).
   */
  notes?: Nullable<string[]>
  /**
   * Źródła odnoszące się do całego banku (np. strona partnera, oficjalna prezentacja).
   */
  fieldSources?: Nullable<BankFieldSource[]>
}

/**
 * Lista wszystkich banków obecnych dotąd w `banks.json`.
 * Każdy wpis ma puste pola – należy je wypełniać ręcznie, stopniowo,
 * dodając komentarze i źródła w `notes` lub `fieldSources`.
 */
export const draftBanks: DraftBank[] = [
  {
    id: 'alior',
    name: 'Alior Bank',
    logo: '/images/banks/alior.png',
    notes: [
      'Oferta "Własne M tam gdzie Ty II" obowiązuje od 13 sierpnia 2025 r. do odwołania.',
      'Dane zaktualizowane na podstawie dokumentów UOKH oraz strony internetowej banku.',
    ],
    fieldSources: [
      {
        field: 'general',
        source:
          'https://www.aliorbank.pl/klienci-indywidualni/kredyty-hipoteczne/wlasne-m-w-wielkim-miescie.html',
        note: 'Strona produktu "Własne M tam gdzie Ty"',
      },
      {
        field: 'representativeExample',
        source: 'docs/alior/UOKH-artykul10.pdf',
        note: 'Informacja o ofercie wraz z przykładem reprezentatywnym (UOKH art. 10)',
      },
    ],
  },
  {
    id: 'millennium',
    name: 'Bank Millennium',
    logo: '/images/banks/millennium.png',
    notes: [
      'Od 1 marca 2023 roku bank zawiesił oferowanie kredytów hipotecznych ze zmiennym oprocentowaniem w całym okresie kredytowania.',
      'W ofercie pozostają kredyty hipoteczne z oprocentowaniem okresowo stałym przez 5 pierwszych lat.',
      'Dane zaktualizowane na podstawie dokumentu UOKH oraz strony internetowej banku.',
    ],
    fieldSources: [
      {
        field: 'general',
        source:
          'https://www.bankmillennium.pl/klienci-indywidualni/kredyty-hipoteczne/kredyt-hipoteczny#o-kredycie',
        note: 'Strona produktu kredytu hipotecznego',
      },
      {
        field: 'representativeExample',
        source:
          'docs/millennium/Ogolne_informacje_dotyczace_umowy_o_kredyt_hipoteczny-1760679436508.pdf',
        note: 'Ogólne informacje dotyczące umowy o kredyt hipoteczny (UOKH)',
      },
    ],
  },
  {
    id: 'pekao',
    name: 'Bank Pekao SA',
    logo: '/images/banks/pekao.svg',
    notes: [
      'Dane zaktualizowane na podstawie dokumentu UOKH oraz strony internetowej banku.',
      'Bank oferuje dwa warianty: zmienna stopa w całym okresie lub okresowo stała przez 5 lat + zmienna.',
    ],
    fieldSources: [
      {
        field: 'general',
        source:
          'https://www.pekao.com.pl/klient-indywidualny/wlasne-mieszkanie-lub-dom/kredyt-hipoteczny.html#',
        note: 'Strona produktu kredytu hipotecznego',
      },
      {
        field: 'representativeExample',
        source: 'docs/pekao/Informacje-ogolne-mieszkaniowy-kredyt-hipoteczny.pdf',
        note: 'Informacje ogólne dotyczące umowy mieszkaniowego kredytu hipotecznego (UOKH)',
      },
    ],
  },
  {
    id: 'citi-handlowy',
    name: 'Citi Handlowy',
    logo: '/images/banks/citi-handlowy.svg',
    notes: [
      'Dane zaktualizowane na podstawie dokumentów TOIP oraz dodatkowych informacji o produkcie hipotecznym.',
      'Bank oferuje kredyt mieszkaniowy i pożyczkę hipoteczną z oprocentowaniem zmiennym lub okresowo stałym.',
      'Wskaźnik referencyjny: WIBOR 3M.',
    ],
    fieldSources: [
      {
        field: 'general',
        source: 'docs/citi-handlowy/toip-kredyt-mieszkaniowy-pozyczka-hipoteczna.pdf',
        note: 'TOIP - Tabela Opłat i Prowizji',
      },
      {
        field: 'representativeExample',
        source: 'docs/citi-handlowy/dodatkowe-informacje-produkcie-hipotecznym.pdf',
        note: 'Dodatkowe informacje o produkcie hipotecznym z przykładami reprezentatywnymi',
      },
    ],
  },
  {
    id: 'credit-agricole',
    name: 'Credit Agricole',
    logo: '/images/banks/credit-agricole.png',
    notes: [
      'Dane zaktualizowane na podstawie dokumentu UOKH oraz strony internetowej banku.',
      'Bank oferuje oprocentowanie zmienne lub okresowo stałe przez 7 lat.',
      'Dostępna również oferta "Kredyt hipoteczny Prime" z niższą marżą (1,8%) dla klientów z Kontem dla Ciebie Prime.',
    ],
    fieldSources: [
      {
        field: 'general',
        source: 'https://www.credit-agricole.pl/klienci-indywidualni/kredyty-hipoteczne',
        note: 'Strona produktu kredytu hipotecznego',
      },
      {
        field: 'representativeExample',
        source: 'docs/credit-agricole/informacje-ogolne-dot-kredytu-hipotecznego_34243.pdf',
        note: 'Informacje ogólne dotyczące umowy o kredyt hipoteczny (UOKH)',
      },
      {
        field: 'interestRateTypes',
        source:
          'docs/credit-agricole/informacja-o-rodzajach-oprocentowania-w-kredytach-i-pozyczkach-hipotecznych_21512.pdf',
        note: 'Informacja o rodzajach oprocentowania',
      },
    ],
  },
  {
    id: 'ing',
    name: 'ING Bank Śląski',
    logo: '/images/banks/ing.png',
    notes: [
      'Dane zaktualizowane na podstawie dokumentu UOKH oraz strony internetowej banku.',
      'Bank oferuje oprocentowanie zmienne lub okresowo stałe przez 5 lat.',
      'Dostępna oferta specjalna "Łatwy start" z 0% prowizji.',
    ],
    fieldSources: [
      {
        field: 'general',
        source: 'https://www.ing.pl/lp/kredyt-hipoteczny-zdalnie',
        note: 'Strona produktu kredytu hipotecznego',
      },
      {
        field: 'representativeExample',
        source:
          'docs/ing/Informacje_ogolne_o_kredycie_hipotecznym_i_pozyczce_hipotecznej_w_ING_Banku_Slaskim (1).pdf',
        note: 'Informacje ogólne o kredycie hipotecznym i pożyczce hipotecznej (UOKH)',
      },
    ],
  },
  {
    id: 'mbank',
    name: 'mBank',
    logo: '/images/banks/mbank.svg',
    notes: [
      'Dane zaktualizowane na podstawie dokumentów mBanku oraz strony internetowej banku.',
      'Bank oferuje kredyt hipoteczny na nieruchomość energooszczędną z preferencyjnymi warunkami.',
      'Promocje "Od dziś u siebie - edycja 2" oraz "Na stałe u siebie - edycja 2" obowiązują od 23.10.2025 r. do 21.01.2026 r.',
    ],
    fieldSources: [
      {
        field: 'general',
        source:
          'https://www.mbank.pl/indywidualny/kredyty/kredyty-hipoteczne/na-nieruchomosc-energooszczedna/',
        note: 'Strona produktu kredytu hipotecznego na nieruchomość energooszczędną',
      },
      {
        field: 'margin',
        source:
          'docs/mbank/informacja_o_wysokosci_marz_dla_zmiennego_oprocentowania,_nieruchomosc_energooszczedna_od_23.10.2025_do_12.11.2025.pdf',
        note: 'Informacja o wysokości marż dla zmiennego oprocentowania',
      },
      {
        field: 'fixedInterestRate',
        source:
          'docs/mbank/informacja_o_wysokosci_stalego_oprocentowania,_nieruchomosc_energooszczedna_od_23.10.2025_do_12.11.2025.pdf',
        note: 'Informacja o wysokości stałego oprocentowania przez 5 lat',
      },
    ],
  },
  {
    id: 'pko-bp',
    name: 'PKO Bank Polski',
    logo: '/images/banks/pko-bp.svg',
    notes: [
      'TODO: Przepisać wartości po zakończeniu weryfikacji dokumentów z `docs/pko-bp/`.',
      'Zachowaj odnośniki do konkretnych PDF-ów w `fieldSources`.',
    ],
    fieldSources: null,
  },
  {
    id: 'santander',
    name: 'Santander Bank Polska',
    logo: '/images/banks/santander.svg',
    notes: [
      'Dane zaktualizowane na podstawie dokumentu o ryzykach i kosztach kredytu hipotecznego oraz strony internetowej banku.',
      'Bank oferuje kredyt hipoteczny z oprocentowaniem okresowo stałym przez 5 lat lub zmiennym.',
      'Wskaźnik referencyjny: WIBOR 3M lub WIBOR 6M.',
    ],
    fieldSources: [
      {
        field: 'general',
        source: 'https://www.santander.pl/klient-indywidualny/kredyty/kredyt-mieszkaniowy',
        note: 'Strona produktu kredytu mieszkaniowego',
      },
      {
        field: 'risksAndCosts',
        source:
          'docs/santander/Informacja dla kredytobiorców o ryzykach i kosztach kredytu hipotecznego.pdf',
        note: 'Informacja dla kredytobiorców o ryzykach i kosztach kredytu hipotecznego',
      },
    ],
  },
  {
    id: 'velobank',
    name: 'VeloBank',
    logo: '/images/banks/velobank.svg',
    notes: [
      'Dane zaktualizowane na podstawie strony internetowej banku oraz dokumentów.',
      'Bank oferuje kredyt hipoteczny VeloDom z oprocentowaniem okresowo stałym przez 5 lat lub zmiennym.',
      'Wskaźnik referencyjny: WIBOR1M.',
    ],
    fieldSources: [
      {
        field: 'general',
        source: 'https://polecam.velobank.pl/lp/main/hipo_kredyt_hipoteczny_velodom_form/',
        note: 'Strona produktu kredytu hipotecznego VeloDom',
      },
      {
        field: 'fees',
        source:
          'docs/velobank/tabela-oplat-i-prowizji-dla-kredytow-hipotecznych-dla-kredytow-uruchomionych-od-29032023.pdf',
        note: 'Tabela Opłat i Prowizji VeloBank SA dla kredytów hipotecznych',
      },
    ],
  },
]

/**
 * Lista produktów hipotecznych powiązana relacyjnie z bankami poprzez `bankId`.
 * Uzupełniając dane dodawaj źródła do `fieldSources`, aby zachować ścieżkę audytu.
 */
export const draftCreditProducts: DraftCreditProduct[] = [
  {
    creditId: 'alior-hipoteczny',
    bankId: 'alior',
    creditName: 'Własne M tam gdzie Ty',
    offerUrl:
      'https://www.aliorbank.pl/klienci-indywidualni/kredyty-hipoteczne/wlasne-m-w-wielkim-miescie.html',
    baseInterestRate: 6.36,
    fixedInterestRate: 5.994,
    wibor: 4.37,
    margin: 1.99,
    commissionRate: 0,
    insuranceRate: 0.059,
    rrso: 6.65,
    minLoanAmount: 100000,
    maxLoanAmount: 3000000,
    minLoanPeriod: 0.33,
    maxLoanPeriod: 35,
    minDownPaymentPercent: 0,
    supportedPurposes: ['purchase', 'refinancing', 'construction'],
    supportedInterestRateTypes: ['fixed', 'variable'],
    earlyRepaymentFee: 0,
    accountRequired: false,
    accountFee: 0,
    propertyInsuranceRequired: true,
    lifeInsuranceRequired: false,
    description:
      'Kredyt hipoteczny z okresowo stałą stopą oprocentowania 5,994% przez pierwsze 5 lat, następnie oprocentowanie zmienne 6,36% (WIBOR 3M + marża 1,99%). Prowizja 0% w ofercie promocyjnej. Możliwość kredytu bez wkładu własnego.',
    processingTime:
      'Proces zależy od kompletności dokumentów i oceny nieruchomości. Bank ocenia zdolność kredytową i nieruchomość indywidualnie.',
    specialOffers: [
      'Oferta specjalna "Własne M tam gdzie Ty II" obowiązuje od 13 sierpnia 2025 r. do odwołania',
      '0% prowizji za udzielenie kredytu',
      '0 zł koszt prowadzenia rachunku i karty płatniczej (przy spełnieniu warunków)',
    ],
    advantages: [
      'Stała stopa oprocentowania przez pierwsze 5 lat (5,994%)',
      '0% prowizji w ofercie promocyjnej',
      'Możliwość przedłużenia okresu stałej stopy',
      'Brak opłat za rachunek i kartę przy spełnieniu warunków',
      'Wsparcie dla różnych celów: zakup, budowa, refinansowanie, konsolidacja',
    ],
    disadvantages: [
      'Wymagane ubezpieczenie nieruchomości',
      'Ubezpieczenie na życie oferowane przez bank (dobrowolne, ale może być warunkiem preferencyjnej marży)',
      'Zmienne oprocentowanie po okresie stałym niesie ryzyko wzrostu raty',
    ],
    ltvAdjustments: {
      ratio80: 0,
      ratio90: 0.3,
      ratio95: 0.3,
    },
    representativeExampleFixed: {
      rrso: 6.65,
      interestRate: 5.994,
      referenceRate: 'Okresowo stała stopa 5,994% przez 60 miesięcy',
      loanPeriodYears: 26.5,
      loanAmount: 469000,
      downPaymentPercent: 20.86,
      totalCost: 528315.94,
      costBreakdown: [
        'Odsetki: 500 198,07 zł',
        'Prowizja: 0 zł (0%)',
        'Ubezpieczenie nieruchomości: 13 740,25 zł (za cały okres)',
        'Ubezpieczenie na życie: 13 758,62 zł (jednorazowa składka za pierwsze 5 lat)',
        'Koszt ustanowienia hipoteki: 200 zł',
        'Opłata z tytułu inspekcji nieruchomości: 250 zł',
        'Wpis roszczenia o ustanowienie hipoteki: 150 zł',
        'Podatek od czynności cywilnoprawnych (PCC): 19 zł',
        'Koszt prowadzenia rachunku i karty: 0 zł',
      ],
      paymentScheduleNote:
        '318 miesięcznych rat annuitetowych: pierwsze 60 rat po 3 032,21 zł, od 61. miesiąca po 3 104,79 zł.',
      calculationDate: '2025-11-13',
      notes: [
        'LTV: 79,14%',
        'Oferta specjalna obowiązuje od 13 sierpnia 2025 r. do odwołania',
        'Po upływie 5 lat oprocentowanie zmienne: WIBOR 3M + marża 1,99%',
      ],
    },
    representativeExampleVariable: {
      rrso: 6.93,
      interestRate: 6.71,
      referenceRate: 'WIBOR 3M 4,72% + marża 1,99% (po okresie stałym)',
      loanPeriodYears: 26.5,
      loanAmount: 469000,
      downPaymentPercent: 20.86,
      totalCost: 559177.27,
      costBreakdown: [
        'Odsetki: 531 659,20 zł',
        'Prowizja: 0 zł',
        'Ubezpieczenie na życie: 13 758,62 zł (jednorazowa składka za pierwsze 5 lat)',
        'Ubezpieczenie nieruchomości: 13 740,25 zł (za cały okres)',
        'Koszt ustanowienia hipoteki: 200 zł',
        'Opłata z tytułu inspekcji nieruchomości: 250 zł',
        'Wpis roszczenia o ustanowienie hipoteki: 150 zł',
        'Podatek od czynności cywilnoprawnych (PCC): 19 zł',
      ],
      paymentScheduleNote:
        '318 miesięcznych rat annuitetowych: pierwsze 60 rat po 3 032,21 zł, od 61. miesiąca po 3 226,71 zł.',
      calculationDate: '2025-11-13',
      notes: [
        'LTV: 79,14%',
        'Przykład z dokumentu UOKH art. 10 - wariant z oprocentowaniem zmiennym po okresie stałym',
        'WIBOR 3M 4,72% + marża 1,99% = 6,71% (wartość z dokumentu)',
      ],
    },
    updated: '2025-11-13',
    notes: [
      'Dane z przykładu reprezentatywnego na stronie internetowej (RRSO 6,65%) oraz z dokumentu UOKH art. 10 (RRSO 6,93%).',
      'Oprocentowanie zmienne po okresie stałym zależy od aktualnej wartości WIBOR 3M w momencie przejścia na oprocentowanie zmienne.',
      'Ubezpieczenie na życie i ubezpieczenie nieruchomości oferowane przez bank są dobrowolne, ale mogą być warunkiem preferencyjnych warunków.',
      'Bank jest agentem ubezpieczeniowym wpisanym do rejestru KNF.',
      'Ostateczne warunki kredytowania zależą od zdolności kredytowej klienta, kwoty kredytu, okresu kredytowania i wymaganych zabezpieczeń.',
      'Koszt ubezpieczeń oszacowany na podstawie przykładu reprezentatywnego: (13 740,25 + 13 758,62) / 469 000 ≈ 5,9%.',
      'Maksymalny okres kredytowania: 35 lat. Nie ma minimalnego okresu kredytowania.',
      'Możliwość kredytu bez wkładu własnego lub z wkładem własnym do 200 000 zł (w ramach programu "Mieszkanie bez wkładu własnego").',
      'Gwarancja może pokryć od 0 do 20% brakującego wkładu kosztów. Maksymalna kwota gwarancji wynosi 100 000 zł.',
      'Nie pobieramy opłaty za wcześniejszą spłatę/nadpłatę kredytu.',
      'Możliwość karencji indywidualnej w spłacie kapitału w okresie do 35 lat.',
      'Dostosowania marży w zależności od LTV: marża 1,99% jeśli nie ma Ubezpieczenia NWW, marża 2,29% jeśli jest Ubezpieczenie NWW (stosowane gdy nie ma wkładu własnego, LTV 100%). Różnica: +0,30 p.p. dla kredytów bez wkładu własnego.',
    ],
    fieldSources: [
      {
        field: 'creditName',
        source:
          'https://www.aliorbank.pl/klienci-indywidualni/kredyty-hipoteczne/wlasne-m-w-wielkim-miescie.html',
        note: 'Nazwa produktu: "Własne M tam gdzie Ty"',
      },
      {
        field: 'fixedInterestRate',
        source:
          'https://www.aliorbank.pl/klienci-indywidualni/kredyty-hipoteczne/wlasne-m-w-wielkim-miescie.html',
        note: 'Okresowo stała stopa 5,994% przez pierwsze 60 miesięcy',
      },
      {
        field: 'baseInterestRate',
        source:
          'https://www.aliorbank.pl/klienci-indywidualni/kredyty-hipoteczne/wlasne-m-w-wielkim-miescie.html',
        note: 'Oprocentowanie zmienne 6,36% po okresie stałym (z przykładu reprezentatywnego)',
      },
      {
        field: 'wibor',
        source:
          'https://www.aliorbank.pl/klienci-indywidualni/kredyty-hipoteczne/wlasne-m-w-wielkim-miescie.html',
        note: 'WIBOR 3M 4,37% z przykładu reprezentatywnego (stan na 13.11.2025)',
      },
      {
        field: 'margin',
        source:
          'https://www.aliorbank.pl/klienci-indywidualni/kredyty-hipoteczne/wlasne-m-w-wielkim-miescie.html',
        note: 'Marża 1,99%',
      },
      {
        field: 'commissionRate',
        source:
          'https://www.aliorbank.pl/klienci-indywidualni/kredyty-hipoteczne/wlasne-m-w-wielkim-miescie.html',
        note: '0% prowizji w ofercie promocyjnej',
      },
      {
        field: 'rrso',
        source:
          'https://www.aliorbank.pl/klienci-indywidualni/kredyty-hipoteczne/wlasne-m-w-wielkim-miescie.html',
        note: 'RRSO 6,65% z przykładu reprezentatywnego',
      },
      {
        field: 'supportedPurposes',
        source: 'docs/alior/UOKH-artykul10.pdf',
        note: 'Cel mieszkaniowy, refinansowanie, konsolidacja, cel konsumpcyjny, cel komercyjny',
      },
      {
        field: 'supportedInterestRateTypes',
        source:
          'https://www.aliorbank.pl/klienci-indywidualni/kredyty-hipoteczne/wlasne-m-w-wielkim-miescie.html',
        note: 'Oprocentowanie z okresowo stałą stopą przez 5 lat, następnie zmienne',
      },
      {
        field: 'accountRequired',
        source:
          'https://www.aliorbank.pl/klienci-indywidualni/kredyty-hipoteczne/wlasne-m-w-wielkim-miescie.html',
        note: 'Koszt prowadzenia rachunku i karty: 0 zł przy spełnieniu warunków',
      },
      {
        field: 'accountFee',
        source:
          'https://www.aliorbank.pl/klienci-indywidualni/kredyty-hipoteczne/wlasne-m-w-wielkim-miescie.html',
        note: '0 zł przy spełnieniu warunków określonych w Taryfie Opłat i Prowizji',
      },
      {
        field: 'propertyInsuranceRequired',
        source:
          'https://www.aliorbank.pl/klienci-indywidualni/kredyty-hipoteczne/wlasne-m-w-wielkim-miescie.html',
        note: 'Ubezpieczenie nieruchomości wymagane',
      },
      {
        field: 'lifeInsuranceRequired',
        source: 'docs/alior/regulamin-oferty-specjalnej-wlasne-M-tam-gdzie-ty-od-13082025.pdf',
        note: 'Ubezpieczenie na życie nie jest obowiązkowe, ale jest warunkiem preferencyjnej marży. Bank może podwyższyć marżę o 1 p.p., jeśli nie złożysz deklaracji przystąpienia do ubezpieczenia na życie lub nie opłacisz składki za pierwszy pięcioletni okres ubezpieczenia',
      },
      {
        field: 'insuranceRate',
        source:
          'https://www.aliorbank.pl/klienci-indywidualni/kredyty-hipoteczne/wlasne-m-w-wielkim-miescie.html',
        note: 'Przeliczenie: (13 740,25 + 13 758,62) / 469 000 ≈ 5,9%',
      },
      {
        field: 'representativeExampleFixed',
        source:
          'https://www.aliorbank.pl/klienci-indywidualni/kredyty-hipoteczne/wlasne-m-w-wielkim-miescie.html',
        note: 'Przykład reprezentatywny z oferty "Własne M tam gdzie Ty II"',
      },
      {
        field: 'representativeExampleVariable',
        source: 'docs/alior/UOKH-artykul10.pdf',
        note: 'Przykład reprezentatywny z dokumentu UOKH art. 10 (RRSO 6,93%)',
      },
      {
        field: 'specialOffers',
        source:
          'https://www.aliorbank.pl/klienci-indywidualni/kredyty-hipoteczne/wlasne-m-w-wielkim-miescie.html',
        note: 'Oferta specjalna obowiązuje od 13 sierpnia 2025 r. do odwołania',
      },
      {
        field: 'maxLoanPeriod',
        source: 'docs/alior/UOKH-artykul10.pdf',
        note: 'Maksymalny okres kredytowania wynosi 35 lat',
      },
      {
        field: 'minLoanAmount',
        source: 'https://symulator.aliorbank.pl/',
        note: 'Kalkulator kredytu hipotecznego - minimalna kwota 100 000 zł',
      },
      {
        field: 'maxLoanAmount',
        source: 'https://symulator.aliorbank.pl/',
        note: 'Kalkulator kredytu hipotecznego - maksymalna kwota 3 000 000 zł',
      },
      {
        field: 'minLoanPeriod',
        source: 'https://symulator.aliorbank.pl/',
        note: 'Kalkulator kredytu hipotecznego - minimalny okres 4 raty (0,33 lat)',
      },
      {
        field: 'minDownPaymentPercent',
        source: 'docs/alior/UOKH-artykul10.pdf',
        note: 'Możliwość kredytu bez wkładu własnego lub z wkładem własnym do 200 000 zł',
      },
      {
        field: 'earlyRepaymentFee',
        source: 'docs/alior/UOKH-artykul10.pdf',
        note: 'Nie pobieramy opłaty za wcześniejszą spłatę/nadpłatę kredytu',
      },
      {
        field: 'processingTime',
        source: 'docs/alior/UOKH-artykul10.pdf',
        note: 'Proces zależy od indywidualnej oceny zdolności kredytowej i nieruchomości',
      },
      {
        field: 'ltvAdjustments',
        source: 'docs/alior/regulamin-oferty-specjalnej-wlasne-M-tam-gdzie-ty-od-13082025.pdf',
        note: 'Marża 1,99% jeśli nie ma Ubezpieczenia NWW, marża 2,29% jeśli jest Ubezpieczenie NWW (stosowane gdy nie ma wkładu własnego). Różnica: +0,30 p.p. dla kredytów bez wkładu własnego (LTV 100%)',
      },
    ],
  },
  {
    creditId: 'millennium-hipoteczny',
    bankId: 'millennium',
    creditName: 'Kredyt hipoteczny',
    offerUrl:
      'https://www.bankmillennium.pl/klienci-indywidualni/kredyty-hipoteczne/kredyt-hipoteczny#o-kredycie',
    baseInterestRate: 8.49,
    fixedInterestRate: 7.28,
    wibor: 5.79,
    margin: 2.7,
    commissionRate: 0,
    insuranceRate: 0.116,
    rrso: 8.88,
    minLoanAmount: 20000,
    maxLoanAmount: 4000000,
    minLoanPeriod: 6,
    maxLoanPeriod: 35,
    minDownPaymentPercent: 20,
    supportedPurposes: ['purchase', 'refinancing', 'construction'],
    supportedInterestRateTypes: ['fixed'],
    earlyRepaymentFee: 0,
    accountRequired: false,
    accountFee: 0,
    propertyInsuranceRequired: false,
    lifeInsuranceRequired: true,
    description:
      'Kredyt hipoteczny z oprocentowaniem okresowo stałym 7,28% przez pierwsze 5 lat, następnie oprocentowanie zmienne 8,49% (WIBOR 6M + marża 2,70%). 0% prowizji za udzielenie kredytu i wcześniejszą spłatę. Możliwość obniżenia oprocentowania o 0,6 p.p. przy spełnieniu dodatkowych warunków.',
    processingTime:
      'Status wniosku można śledzić w Millenecie i aplikacji mobilnej, nawet bez konta w banku.',
    specialOffers: [
      '0% prowizji za udzielenie kredytu i wcześniejszą spłatę',
      'Oprocentowanie niższe nawet o 0,6 p.p. w porównaniu z cennikiem, jeśli spełnisz dodatkowe warunki',
      'Wakacje kredytowe raz w roku',
      'EKO kredyt hipoteczny dla nieruchomości energooszczędnych',
    ],
    advantages: [
      'Rata kredytu stała przez 5 lat',
      'Po 5 latach możliwość wyboru oprocentowania stałego na kolejne 5 lat',
      '0% prowizji za udzielenie kredytu i wcześniejszą spłatę',
      'Możliwość obniżenia oprocentowania o 0,6 p.p. przy spełnieniu warunków',
      'Wakacje kredytowe raz w roku',
      'Status wniosku dostępny w aplikacji mobilnej, nawet bez konta',
      'Wsparcie specjalistów kredytowych na każdym etapie',
    ],
    disadvantages: [
      'Od 1 marca 2023 roku bank zawiesił oferowanie kredytów ze zmiennym oprocentowaniem w całym okresie',
      'W ofercie tylko kredyty z oprocentowaniem okresowo stałym przez 5 lat',
      'Po okresie stałym oprocentowanie zmienne niesie ryzyko wzrostu raty',
      'Utrzymanie obniżki oprocentowania wymaga spełnienia dodatkowych warunków (np. ubezpieczenie "Życie pod ochroną")',
    ],
    ltvAdjustments: null,
    representativeExampleFixed: {
      rrso: 8.88,
      interestRate: 7.28,
      referenceRate: 'Okresowo stała stopa 7,28% przez 60 miesięcy',
      loanPeriodYears: 27,
      loanAmount: 542347,
      downPaymentPercent: 37.5,
      totalCost: 870093.97,
      costBreakdown: [
        'Prowizja za udzielenie kredytu: 0 zł',
        'Odsetki: 807 183,43 zł',
        'Ubezpieczenie nieruchomości od ognia i innych zdarzeń losowych: 21 190 zł (dostępne za pośrednictwem banku)',
        'Ubezpieczenie na życie "Życie pod ochroną": 41 501,54 zł (dostępne za pośrednictwem banku)',
        'Podatek od czynności cywilnoprawnych (PCC): 19 zł',
        'Opłata sądowa za ustanowienie hipoteki: 200 zł',
        'Koszt prowadzenia konta: 0 zł',
        'Opłata za obsługę karty debetowej lub płatności zbliżeniowych BLIK: 0 zł',
      ],
      paymentScheduleNote:
        '326 miesięcznych rat równych po 3 822,35 zł. Oprocentowanie stałe przez pierwsze 60 miesięcy, następnie zmienne. Całkowita kwota do zapłaty: 1 412 440,97 zł.',
      calculationDate: '2024-12-09',
      notes: [
        'Przykład reprezentatywny dla kredytu hipotecznego na cel mieszkaniowy',
        'Wartość nieruchomości: 868 171 zł, LTV: 62,5%',
        'WIBOR 6M według stanu na 29.11.2024 r. wynosi 5,79%',
        'Marża 2,70% przy założeniu, że przez 55 miesięcy masz konto Millennium 360° z wpływem wynagrodzenia i wykonujesz transakcje kartą min. 500 zł/miesięcznie oraz przez 36 miesięcy pozostajesz stroną umowy ubezpieczenia na życie "Życie pod ochroną"',
        'Możliwość obniżenia RRSO do 7,77% przy spełnieniu warunków do utrzymania obniżonego oprocentowania',
        'Obliczenia wykonane 09.12.2024 r.',
      ],
    },
    representativeExampleVariable: null,
    updated: '2024-12-09',
    notes: [
      'Od 1 marca 2023 roku bank zawiesił oferowanie kredytów hipotecznych ze zmiennym oprocentowaniem w całym okresie kredytowania.',
      'W ofercie pozostają tylko kredyty z oprocentowaniem okresowo stałym przez 5 pierwszych lat.',
      'Po zakończeniu okresu stałej stopy, oprocentowanie przechodzi na zmienne (WIBOR 6M + marża).',
      'Możliwość obniżenia oprocentowania o 0,6 p.p. w porównaniu z cennikiem przy spełnieniu dodatkowych warunków (np. ubezpieczenie "Życie pod ochroną" za pośrednictwem banku).',
      'Ubezpieczenie "Życie pod ochroną" nie jest konieczne do otrzymania kredytu, ale ma wpływ na warunki cenowe.',
      'Bank działa jako agent ubezpieczeniowy Towarzystwa Ubezpieczeń na Życie Europa S.A.',
      'Można przedstawić ubezpieczenie nieruchomości lub ubezpieczenie na życie spoza oferty banku (z listy KNF).',
      'WIBOR 6M jako wskaźnik referencyjny dla oprocentowania zmiennego.',
      'Minimalna kwota kredytu: 20 000 zł. Maksymalna kwota zależy od zdolności kredytowej oraz wartości nieruchomości.',
      'Okres kredytowania: od 6 do 35 lat (dla kredytu hipotecznego).',
      'Maksymalne LTV: 80%, czyli minimalny wkład własny to 20% wartości nieruchomości.',
      'W szacowanym dniu ostatecznej spłaty kredytu kredytobiorca nie może mieć ukończonych 75 lat.',
      'Koszt prowadzenia konta: 0 zł. Opłata za obsługę karty debetowej lub płatności kartą: 0 zł.',
      'Konto osobiste w banku może być wymagane w niektórych przypadkach (np. dla obniżki oprocentowania).',
    ],
    fieldSources: [
      {
        field: 'creditName',
        source:
          'https://www.bankmillennium.pl/klienci-indywidualni/kredyty-hipoteczne/kredyt-hipoteczny#o-kredycie',
        note: 'Nazwa produktu: "Kredyt hipoteczny"',
      },
      {
        field: 'fixedInterestRate',
        source:
          'docs/millennium/Ogolne_informacje_dotyczace_umowy_o_kredyt_hipoteczny-1760679436508.pdf',
        note: 'Okresowo stała stopa 7,28% przez pierwsze 60 miesięcy',
      },
      {
        field: 'baseInterestRate',
        source:
          'docs/millennium/Ogolne_informacje_dotyczace_umowy_o_kredyt_hipoteczny-1760679436508.pdf',
        note: 'Oprocentowanie zmienne 8,49% po okresie stałym (z przykładu reprezentatywnego)',
      },
      {
        field: 'wibor',
        source:
          'docs/millennium/Ogolne_informacje_dotyczace_umowy_o_kredyt_hipoteczny-1760679436508.pdf',
        note: 'WIBOR 6M 5,79% z przykładu reprezentatywnego (stan na 29.11.2024)',
      },
      {
        field: 'margin',
        source:
          'docs/millennium/Ogolne_informacje_dotyczace_umowy_o_kredyt_hipoteczny-1760679436508.pdf',
        note: 'Marża 2,70%',
      },
      {
        field: 'commissionRate',
        source:
          'https://www.bankmillennium.pl/klienci-indywidualni/kredyty-hipoteczne/kredyt-hipoteczny#o-kredycie',
        note: '0% prowizji za udzielenie kredytu i wcześniejszą spłatę',
      },
      {
        field: 'earlyRepaymentFee',
        source:
          'https://www.bankmillennium.pl/klienci-indywidualni/kredyty-hipoteczne/kredyt-hipoteczny#o-kredycie',
        note: '0% prowizji za wcześniejszą spłatę',
      },
      {
        field: 'rrso',
        source:
          'https://www.bankmillennium.pl/klienci-indywidualni/kredyty-hipoteczne/kredyt-hipoteczny#o-kredycie',
        note: 'RRSO 8,88% z przykładu reprezentatywnego',
      },
      {
        field: 'supportedPurposes',
        source:
          'https://www.bankmillennium.pl/klienci-indywidualni/kredyty-hipoteczne/kredyt-hipoteczny#o-kredycie',
        note: 'Zakup mieszkania/domu, budowa/rozbudowa, remont/modernizacja, refinansowanie',
      },
      {
        field: 'supportedInterestRateTypes',
        source:
          'https://www.bankmillennium.pl/klienci-indywidualni/kredyty-hipoteczne/kredyt-hipoteczny#o-kredycie',
        note: 'Od 1 marca 2023 tylko oprocentowanie okresowo stałe przez 5 lat',
      },
      {
        field: 'specialOffers',
        source:
          'https://www.bankmillennium.pl/klienci-indywidualni/kredyty-hipoteczne/kredyt-hipoteczny#o-kredycie',
        note: '0% prowizji, obniżka oprocentowania o 0,6 p.p., wakacje kredytowe, EKO kredyt',
      },
      {
        field: 'representativeExampleFixed',
        source:
          'docs/millennium/Ogolne_informacje_dotyczace_umowy_o_kredyt_hipoteczny-1760679436508.pdf',
        note: 'Przykład reprezentatywny z dokumentu UOKH (RRSO 8,88%)',
      },
      {
        field: 'processingTime',
        source:
          'https://www.bankmillennium.pl/klienci-indywidualni/kredyty-hipoteczne/kredyt-hipoteczny#o-kredycie',
        note: 'Status wniosku dostępny w Millenecie i aplikacji mobilnej',
      },
      {
        field: 'minLoanAmount',
        source:
          'docs/millennium/Ogolne_informacje_dotyczace_umowy_o_kredyt_hipoteczny-1760679436508.pdf',
        note: 'Minimalna kwota kredytu hipotecznego: od 20 000 zł',
      },
      {
        field: 'maxLoanAmount',
        source:
          'https://www.bankmillennium.pl/klienci-indywidualni/kredyty-hipoteczne/kredyt-hipoteczny#info0goto',
        note: 'Kalkulator kredytu hipotecznego - maksymalna kwota 4 000 000 zł',
      },
      {
        field: 'minLoanPeriod',
        source:
          'docs/millennium/Ogolne_informacje_dotyczace_umowy_o_kredyt_hipoteczny-1760679436508.pdf',
        note: 'Minimalny okres kredytowania: 6 lat',
      },
      {
        field: 'maxLoanPeriod',
        source:
          'docs/millennium/Ogolne_informacje_dotyczace_umowy_o_kredyt_hipoteczny-1760679436508.pdf',
        note: 'Maksymalny okres kredytowania: 35 lat',
      },
      {
        field: 'minDownPaymentPercent',
        source:
          'docs/millennium/Ogolne_informacje_dotyczace_umowy_o_kredyt_hipoteczny-1760679436508.pdf',
        note: 'Maksymalne LTV wynosi 80%, czyli minimalny wkład własny to 20%',
      },
      {
        field: 'accountFee',
        source:
          'docs/millennium/Ogolne_informacje_dotyczace_umowy_o_kredyt_hipoteczny-1760679436508.pdf',
        note: 'Koszt prowadzenia konta wynosi 0 zł',
      },
      {
        field: 'accountRequired',
        source:
          'docs/millennium/Ogolne_informacje_dotyczace_umowy_o_kredyt_hipoteczny-1760679436508.pdf',
        note: 'Sprzedaż łączona nie jest warunkiem uzyskania kredytu, ale ma wpływ na warunki cenowe. Konto osobiste jest warunkiem obniżki oprocentowania o 0,2-0,4 p.p.',
      },
      {
        field: 'lifeInsuranceRequired',
        source:
          'docs/millennium/Regulamin_kredytow_hipotecznych_obowiazuje_dla_umow_zawartych_od_28_czerwca_2025-1751019620225.pdf',
        note: 'Ubezpieczenie na życie wraz ze wskazaniem banku jako uposażonego na pierwszym miejscu jest zabezpieczeniem spłaty kredytu. Suma ubezpieczenia musi być co najmniej równa kwocie udzielonego kredytu (punkt 78-81 Regulaminu)',
      },
      {
        field: 'propertyInsuranceRequired',
        source:
          'docs/millennium/Ogolne_informacje_dotyczace_umowy_o_kredyt_hipoteczny-1760679436508.pdf',
        note: 'Możesz wybrać ubezpieczenie od ognia i innych zdarzeń losowych nieruchomości spośród ofert różnych ubezpieczycieli. Ważne, aby zakres ubezpieczenia spełniał minimalne wymagania banku',
      },
      {
        field: 'insuranceRate',
        source:
          'docs/millennium/Ogolne_informacje_dotyczace_umowy_o_kredyt_hipoteczny-1760679436508.pdf',
        note: 'Przeliczenie na podstawie przykładów reprezentatywnych: ubezpieczenie nieruchomości + ubezpieczenie na życie w stosunku do kwoty kredytu (szacunkowo 11,6%)',
      },
    ],
  },
  {
    creditId: 'pekao-hipoteczny',
    bankId: 'pekao',
    creditName: 'Mieszkaniowy kredyt hipoteczny',
    offerUrl:
      'https://www.pekao.com.pl/klient-indywidualny/wlasne-mieszkanie-lub-dom/kredyt-hipoteczny.html#',
    baseInterestRate: 7.24,
    fixedInterestRate: 6.29,
    wibor: 5.35,
    margin: 1.89,
    commissionRate: 1.25,
    insuranceRate: 0.019,
    rrso: 7.41,
    minLoanAmount: 10000,
    maxLoanAmount: 500000,
    minLoanPeriod: 5,
    maxLoanPeriod: 30,
    minDownPaymentPercent: 10,
    supportedPurposes: ['purchase', 'refinancing', 'construction'],
    supportedInterestRateTypes: ['fixed', 'variable'],
    earlyRepaymentFee: 0,
    accountRequired: true,
    accountFee: null,
    propertyInsuranceRequired: true,
    lifeInsuranceRequired: false,

    description:
      'Mieszkaniowy kredyt hipoteczny z możliwością wyboru: zmienna stopa oprocentowania w całym okresie (7,24%) lub okresowo stała stopa 6,29% przez pierwsze 5 lat, następnie zmienna 7,24% (WIBOR 1M + marża 1,89%).',
    processingTime: null,
    specialOffers: null,
    advantages: [
      'Możliwość wyboru między zmienną stopą w całym okresie a okresowo stałą przez 5 lat',
      'Możliwość przedłużenia okresu stałej stopy oprocentowania',
      'WIBOR 1M jako wskaźnik referencyjny',
      'Relatywnie niska marża 1,89%',
    ],
    disadvantages: [
      'Wymagane ubezpieczenie przedmiotu hipoteki (budynek/lokal) od ognia i innych zdarzeń losowych',
      'Ubezpieczenie CPI (Credit Protection Insurance) może być wymagane',
      'Zmienne oprocentowanie niesie ryzyko wzrostu raty wraz ze wzrostem WIBOR 1M',
      'Oprocentowanie przeterminowanego kapitału może wzrosnąć',
    ],
    ltvAdjustments: {
      ratio80: 0,
      ratio90: null,
      ratio95: null,
    },
    representativeExampleFixed: {
      rrso: 7.41,
      interestRate: 6.29,
      referenceRate: 'Okresowo stała stopa 6,29% przez 60 miesięcy',
      loanPeriodYears: 23.17,
      loanAmount: 392280.83,
      downPaymentPercent: 30.56,
      totalCost: 421155.64,
      costBreakdown: [
        'Odsetki: 403 382,21 zł',
        'Ubezpieczenie kredytobiorców kredytów mieszkaniowych CPI: 7 710,67 zł (za pierwsze 4 lata)',
        'Ubezpieczenie przedmiotu hipoteki (budynek/lokal) od ognia i innych zdarzeń losowych',
        'Rata równa: 2 736,32 zł',
        'Liczba rat: 278',
      ],
      paymentScheduleNote:
        '278 miesięcznych rat równych po 2 736,32 zł. Oprocentowanie stałe przez pierwsze 60 miesięcy (6,29%), następnie zmienne (7,24%).',
      calculationDate: '2025-07-10',
      notes: [
        'Przykład reprezentatywny dla kredytu z okresowo stałą stopą przez 5 lat',
        'WIBOR 1M według stanu na 10.07.2025 r. wynosi 5,35% (7,24% - 1,89%)',
        'Całkowita kwota do zapłaty: 813 436,47 zł',
        'Wkład własny: 30,56% całkowitego kosztu kredytowanej inwestycji',
      ],
    },
    representativeExampleVariable: {
      rrso: 7.9,
      interestRate: 7.24,
      referenceRate: 'WIBOR 1M + marża 1,89% (oprocentowanie z dnia 10.07.2025)',
      loanPeriodYears: 22.92,
      loanAmount: 410344.27,
      downPaymentPercent: 35.88,
      totalCost: null,
      costBreakdown: [
        'Zmienna stopa oprocentowania: 7,24% w całym okresie kredytowania',
        'WIBOR 1M + marża 1,89%',
        'Liczba rat: 275',
      ],
      paymentScheduleNote:
        '275 miesięcznych rat równych (okres kredytowania: 22 lata i 11 miesięcy)',
      calculationDate: '2025-07-10',
      notes: [
        'Przykład reprezentatywny dla kredytu ze zmienną stopą w całym okresie',
        'Wkład własny: 35,88% całkowitego kosztu kredytowanej inwestycji',
      ],
    },
    updated: '2025-07-10',
    notes: [
      'Bank oferuje dwa warianty oprocentowania: zmienna stopa w całym okresie lub okresowo stała przez 5 lat + zmienna.',
      'Wskaźnik referencyjny: WIBOR 1M (Stawka Referencyjna WIBOR wyznaczona dla terminu fixingowego 1 miesiąc).',
      'Marża banku: 1,89% (może być niższa w przypadku spełnienia dodatkowych warunków). Z rankomat.pl: 6,09% (wartość może się różnić).',
      'Wartość WIBOR 1M przyjmowana z ostatniego dnia roboczego poprzedzającego okres obrachunkowy.',
      'Możliwość przedłużenia okresu stałej stopy oprocentowania (określone w aneksie do umowy).',
      'W okresie obowiązywania zmiennej stopy oprocentowanie nie może przekroczyć odsetek maksymalnych.',
      'Ubezpieczenie przedmiotu hipoteki (budynek/lokal) od ognia i innych zdarzeń losowych jest wymagane.',
      'Ubezpieczenie CPI (Credit Protection Insurance) może być wymagane lub oferowane jako opcjonalne.',
      'Koszt ubezpieczeń oszacowany na podstawie przykładu reprezentatywnego: 7 710,67 zł / 392 280,83 zł ≈ 1,9% (za pierwsze 4 lata CPI).',
      'Maksymalny okres kredytowania: 30 lat (360 miesięcy).',
      'Minimalny okres kredytowania: 5 lat (60 miesięcy) dla kredytu z okresowo stałą stopą. Jeśli korzystasz z ubezpieczenia CPI, okres nie może być krótszy niż 4 lata (48 miesięcy). Z rankomat.pl: od 1 miesiąca (wartość może się różnić).',
      'Maksymalne LTV: 90% wartości nieruchomości (minimalny wkład własny: 10%). Standardowo LTV do 80%, powyżej 80% wymagane dodatkowe ubezpieczenie ryzyka wysokiego LTV.',
      'Wysokość marży jest zróżnicowana w zależności od wysokości wskaźnika LTV (dla wskaźnika LTV nieprzekraczającego 80% i dla wysokiego wskaźnika LTV – powyżej 80%).',
      'Wkład własny to różnica między ceną zakupu nieruchomości a wysokością kredytu. Środki finansowe na wkład własny nie mogą pochodzić z kredytu lub pożyczki.',
      'Wymagane zawarcie umowy o rachunek oszczędnościowo-rozliczeniowy. Warunkiem promocyjnej oferty specjalnej marży po upływie okresowo stałej stopy procentowej jest m.in. posiadanie lub zawarcie umowy o rachunek typu ROR (np. Konto Przekorzystne, Konto Świat Premium) z regularnymi miesięcznymi wpływami z tytułu dochodów w wysokości co najmniej dwukrotności pierwszej raty kapitałowo-odsetkowej.',
      'Ubezpieczenie na życie jest obowiązkowe gdy LTV przekracza 80% (wysoki wskaźnik LTV). W innych przypadkach może być dobrowolne.',
      'Możliwość wcześniejszej spłaty kredytu (ze skróceniem okresu lub z zachowaniem dotychczasowego harmonogramu).',
      'Informacje dodatkowe z rankomat.pl: kwota kredytu od 10 000 zł do 500 000 zł, prowizja 1,25% za udzielenie kredytu, okres kredytowania od 1 miesiąca do 360 miesięcy, minimalny wiek kredytobiorcy 18 lat, maksymalny wiek w chwili spłaty ostatniej raty 70 lat.',
    ],
    fieldSources: [
      {
        field: 'creditName',
        source: 'docs/pekao/Informacje-ogolne-mieszkaniowy-kredyt-hipoteczny.pdf',
        note: 'Nazwa produktu: "Mieszkaniowy kredyt hipoteczny"',
      },
      {
        field: 'fixedInterestRate',
        source: 'docs/pekao/Informacje-ogolne-mieszkaniowy-kredyt-hipoteczny.pdf',
        note: 'Okresowo stała stopa 6,29% przez pierwsze 60 miesięcy',
      },
      {
        field: 'baseInterestRate',
        source: 'docs/pekao/Informacje-ogolne-mieszkaniowy-kredyt-hipoteczny.pdf',
        note: 'Oprocentowanie zmienne 7,24% (z dnia 10.07.2025). Z rankomat.pl: 6,09% (wartość może się różnić)',
      },
      {
        field: 'wibor',
        source: 'docs/pekao/Informacje-ogolne-mieszkaniowy-kredyt-hipoteczny.pdf',
        note: 'WIBOR 1M obliczony: 7,24% - 1,89% = 5,35% (z dnia 10.07.2025). Z rankomat.pl: 0% (wartość może się różnić)',
      },
      {
        field: 'margin',
        source: 'docs/pekao/Informacje-ogolne-mieszkaniowy-kredyt-hipoteczny.pdf',
        note: 'Marża 1,89% (może być niższa w przypadku spełnienia dodatkowych warunków). Z rankomat.pl: 6,09% (wartość może się różnić)',
      },
      {
        field: 'commissionRate',
        source: 'https://www.rankomat.pl/kredyty-hipoteczne/pekao',
        note: 'Prowizja za udzielenie kredytu 1,25% (z rankomat.pl). W dokumencie banku brak informacji o prowizji.',
      },
      {
        field: 'rrso',
        source: 'docs/pekao/Informacje-ogolne-mieszkaniowy-kredyt-hipoteczny.pdf',
        note: 'RRSO 7,41% dla wariantu ze stałą stopą, 7,90% dla wariantu zmiennego. Z rankomat.pl: 7,25% (wartość może się różnić)',
      },
      {
        field: 'minLoanAmount',
        source: 'https://www.rankomat.pl/kredyty-hipoteczne/pekao',
        note: 'Kwota kredytu od 10 000 zł (z rankomat.pl)',
      },
      {
        field: 'maxLoanAmount',
        source: 'https://www.rankomat.pl/kredyty-hipoteczne/pekao',
        note: 'Kwota kredytu do 500 000 zł (z rankomat.pl)',
      },
      {
        field: 'supportedPurposes',
        source:
          'https://www.pekao.com.pl/klient-indywidualny/wlasne-mieszkanie-lub-dom/kredyt-hipoteczny.html#',
        note: 'Zakup, budowa, remont, refinansowanie',
      },
      {
        field: 'supportedInterestRateTypes',
        source: 'docs/pekao/Informacje-ogolne-mieszkaniowy-kredyt-hipoteczny.pdf',
        note: 'Dwa warianty: zmienna w całym okresie lub okresowo stała przez 5 lat + zmienna',
      },
      {
        field: 'propertyInsuranceRequired',
        source: 'docs/pekao/Informacje-ogolne-mieszkaniowy-kredyt-hipoteczny.pdf',
        note: 'Wymagane ubezpieczenie przedmiotu hipoteki (budynek/lokal) od ognia i innych zdarzeń losowych',
      },
      {
        field: 'insuranceRate',
        source: 'docs/pekao/Informacje-ogolne-mieszkaniowy-kredyt-hipoteczny.pdf',
        note: 'Przeliczenie: 7 710,67 zł (CPI za 4 lata) / 392 280,83 zł ≈ 1,9%',
      },
      {
        field: 'representativeExampleFixed',
        source: 'docs/pekao/Informacje-ogolne-mieszkaniowy-kredyt-hipoteczny.pdf',
        note: 'Przykład reprezentatywny z dokumentu UOKH (RRSO 7,41%)',
      },
      {
        field: 'representativeExampleVariable',
        source: 'docs/pekao/Informacje-ogolne-mieszkaniowy-kredyt-hipoteczny.pdf',
        note: 'Przykład reprezentatywny z dokumentu UOKH (RRSO 7,90%)',
      },
      {
        field: 'maxLoanPeriod',
        source: 'docs/pekao/Informacje-ogolne-mieszkaniowy-kredyt-hipoteczny.pdf',
        note: 'Maksymalny okres kredytowania: 30 lat',
      },
      {
        field: 'minDownPaymentPercent',
        source: 'docs/pekao/Informacje-ogolne-mieszkaniowy-kredyt-hipoteczny.pdf',
        note: 'Maksymalne LTV: 90% wartości nieruchomości (minimalny wkład własny: 10%). Standardowo LTV do 80%, powyżej 80% wymagane dodatkowe ubezpieczenie ryzyka wysokiego LTV.',
      },
      {
        field: 'minLoanPeriod',
        source: 'docs/pekao/Informacje-ogolne-mieszkaniowy-kredyt-hipoteczny.pdf',
        note: 'Minimalny okres kredytowania: 5 lat (60 miesięcy) dla kredytu z okresowo stałą stopą. Jeśli korzystasz z ubezpieczenia CPI, okres nie może być krótszy niż 4 lata (48 miesięcy). Z rankomat.pl: od 1 miesiąca (wartość może się różnić)',
      },
      {
        field: 'earlyRepaymentFee',
        source: 'docs/pekao/Informacje-ogolne-mieszkaniowy-kredyt-hipoteczny.pdf',
        note: 'Możliwość wcześniejszej spłaty kredytu (ze skróceniem okresu lub z zachowaniem dotychczasowego harmonogramu). Brak informacji o opłacie za wcześniejszą spłatę w dokumencie.',
      },
      {
        field: 'accountRequired',
        source: 'https://www.rankomat.pl/kredyty-hipoteczne/pekao',
        note: 'Wymagany rachunek osobisty. Warunkiem promocyjnej oferty specjalnej marży po upływie okresowo stałej stopy procentowej jest m.in. posiadanie lub zawarcie umowy o rachunek typu ROR (np. Konto Przekorzystne, Konto Świat Premium) z regularnymi miesięcznymi wpływami z tytułu dochodów w wysokości co najmniej dwukrotności pierwszej raty kapitałowo-odsetkowej',
      },
      {
        field: 'lifeInsuranceRequired',
        source: 'docs/pekao/Informacje-ogolne-mieszkaniowy-kredyt-hipoteczny.pdf',
        note: 'Ubezpieczenie na życie jest obowiązkowe gdy LTV przekracza 80% (wysoki wskaźnik LTV). W innych przypadkach może być dobrowolne.',
      },
      {
        field: 'ltvAdjustments',
        source: 'docs/pekao/Informacje-ogolne-mieszkaniowy-kredyt-hipoteczny.pdf',
        note: 'Wysokość marży jest zróżnicowana w zależności od wysokości wskaźnika LTV (dla wskaźnika LTV nieprzekraczającego 80% i dla wysokiego wskaźnika LTV – powyżej 80%)',
      },
    ],
  },
  {
    creditId: 'citi-hipoteczny',
    bankId: 'citi-handlowy',
    creditName: 'Kredyt mieszkaniowy',
    offerUrl: 'https://www.citibank.pl/kredyty/kredyt-hipoteczny/',
    baseInterestRate: 6.63,
    fixedInterestRate: 6.28,
    wibor: 4.74,
    margin: 1.89,
    commissionRate: 0,
    insuranceRate: 0.0011, // Szacunkowo: 619 zł / 545 000 zł ≈ 0,11% (z przykładu reprezentatywnego)
    rrso: 6.84,
    minLoanAmount: 50000,
    maxLoanAmount: 3000000,
    minLoanPeriod: 5,
    maxLoanPeriod: 30,
    minDownPaymentPercent: 20,
    supportedPurposes: ['purchase', 'refinancing', 'construction'],
    supportedInterestRateTypes: ['fixed', 'variable'],
    earlyRepaymentFee: 0,
    accountRequired: false,
    accountFee: 0,
    propertyInsuranceRequired: true,
    lifeInsuranceRequired: false,
    description:
      'Kredyt mieszkaniowy z możliwością wyboru: oprocentowanie zmienne 6,63% (WIBOR 3M 4,74% + marża 1,89%) lub okresowo stałe 6,28% przez 5 lat. Kwota kredytu nawet do 3 000 000 zł (do 80% wartości nieruchomości). 0% prowizji za udzielenie kredytu w ofercie promocyjnej. Brak opłaty za wcześniejszą spłatę kredytu.',
    processingTime: null,
    specialOffers: ['0% prowizji za udzielenie kredytu (w ofercie promocyjnej)'],
    advantages: [
      'Niska marża 1,89%',
      'Możliwość wyboru między zmienną a okresowo stałą stopą oprocentowania',
      'Okresowo stała stopa 6,28% przez 5 lat',
      '0% prowizji za udzielenie kredytu w ofercie promocyjnej',
      'Opłata za rachunek oszczędnościowo-rozliczeniowy: 0 zł',
      'WIBOR 3M jako wskaźnik referencyjny',
      'Szeroki zakres celów kredytowania',
    ],
    disadvantages: [
      'Prowizja za udzielenie kredytu może wynosić do 4,0% (w zależności od oferty)',
      'Zmienne oprocentowanie niesie ryzyko wzrostu raty wraz ze wzrostem WIBOR 3M',
      'Po okresie 5 lat stałej stopy może nastąpić wzrost raty przy przejściu na zmienne oprocentowanie',
    ],
    ltvAdjustments: null,
    representativeExampleFixed: {
      rrso: 6.46,
      interestRate: 6.28,
      referenceRate: 'Okresowo stała stopa 6,28% przez 5 lat',
      loanPeriodYears: 25,
      loanAmount: 545000,
      downPaymentPercent: 20, // Obliczone: jeśli wartość nieruchomości to 681 250 zł, to wkład własny = 136 250 zł (20%)
      totalCost: 537212,
      costBreakdown: [
        'Odsetki: 536 593 zł',
        'Prowizja: 0 zł (0%)',
        'Podatek od czynności cywilnoprawnych (PCC): 19 zł',
        'Koszt wpisu hipoteki do Księgi Wieczystej: 200 zł',
        'Opłata za usługę wyceny nieruchomości: 400 zł (dla mieszkania)',
        'Opłata za rachunek oszczędnościowo-rozliczeniowy (ROR): 0 zł',
      ],
      paymentScheduleNote: 'Oprocentowanie stałe przez pierwsze 5 lat, następnie zmienne.',
      calculationDate: null,
      notes: [
        'Przykład reprezentatywny dla kredytu mieszkaniowego z oprocentowaniem okresowo stałym',
        'Całkowita kwota do zapłaty: 1 082 212 zł',
      ],
    },
    representativeExampleVariable: {
      rrso: 6.84,
      interestRate: 6.63,
      referenceRate: 'WIBOR 3M 4,74% + marża 1,89%',
      loanPeriodYears: 25,
      loanAmount: 654000,
      downPaymentPercent: null,
      totalCost: 687357,
      costBreakdown: [
        'Odsetki: 686 738 zł',
        'Prowizja: 0 zł (0%)',
        'Podatek od czynności cywilnoprawnych (PCC): 19 zł',
        'Koszt wpisu hipoteki do Księgi Wieczystej: 200 zł',
        'Opłata za usługę wyceny nieruchomości: 400 zł (dla mieszkania)',
        'Opłata za rachunek oszczędnościowo-rozliczeniowy (ROR): 0 zł',
      ],
      paymentScheduleNote: 'Oprocentowanie zmienne w całym okresie kredytowania.',
      calculationDate: null,
      notes: [
        'Przykład reprezentatywny dla kredytu mieszkaniowego z oprocentowaniem zmiennym',
        'Całkowita kwota do zapłaty: 1 341 357 zł',
      ],
    },
    updated: null,
    notes: [
      'Bank oferuje kredyt mieszkaniowy i pożyczkę hipoteczną z oprocentowaniem zmiennym lub okresowo stałym przez 5 lat.',
      'Wskaźnik referencyjny: WIBOR 3M (Stawka Referencyjna WIBOR wyznaczona dla terminu fixingowego 3 miesiące).',
      'Marża banku: 1,89% (dla kredytu mieszkaniowego).',
      'Oprocentowanie zmienne: 6,63% (WIBOR 3M 4,74% + marża 1,89%).',
      'Oprocentowanie okresowo stałe: 6,28% przez 5 lat.',
      'Prowizja za udzielenie kredytu: do 4,0% (w ofercie promocyjnej 0%).',
      'Opłata za rachunek oszczędnościowo-rozliczeniowy (ROR): 0 zł (przy spełnieniu warunków).',
      'Opłata za inspekcję nieruchomości: 250 PLN.',
      'Opłata za wycenę nieruchomości: 400 PLN (lokal mieszkalny), 600 PLN (budynek mieszkalny).',
      'Okres kredytowania: od 60 do 360 miesięcy (5-30 lat) dla kredytu mieszkaniowego.',
      'Wymagane ubezpieczenie nieruchomości (zawarcie we własnym zakresie z ubezpieczycielem umowy ubezpieczenia nieruchomości, spełniającej minimalne warunki dotyczące zakresu ochrony ubezpieczeniowej wymaganej przez Bank).',
      'Brak opłaty za wcześniejszą spłatę kredytu.',
      'Kwota kredytu nawet do 3 000 000 zł (do 80% wartości nieruchomości).',
      'Opłata za rachunek oszczędnościowo-rozliczeniowy (ROR): 0 zł przy utrzymaniu warunku wpływów miesięcznych min. 8 000 zł.',
      'Do uzyskania kredytu niezbędne jest zawarcie umowy ubezpieczenia nieruchomości (zawarcie we własnym zakresie z ubezpieczycielem).',
      'W przykładach reprezentatywnych brak informacji o kosztach ubezpieczenia w costBreakdown, co sugeruje, że koszty ubezpieczenia mogą być niskie lub wliczone w inne opłaty.',
      'Cele kredytowania: zakup nieruchomości (pierwotny/wtórny), refinansowanie, remont/wykończenie, przekształcenie praw spółdzielczych, nabycie w drodze przetargu/licytacji.',
    ],
    fieldSources: [
      {
        field: 'creditName',
        source: 'docs/citi-handlowy/dodatkowe-informacje-produkcie-hipotecznym.pdf',
        note: 'Nazwa produktu: "Kredyt Mieszkaniowy"',
      },
      {
        field: 'offerUrl',
        source: 'https://www.citibank.pl/kredyty/kredyt-hipoteczny/',
        note: 'Strona internetowa z ofertą kredytu hipotecznego',
      },
      {
        field: 'minLoanAmount',
        source: 'https://www.citibank.pl/kredyty/kredyt-hipoteczny/',
        note: 'Minimalna kwota kredytu: 50 000 zł (z kalkulatora na stronie)',
      },
      {
        field: 'maxLoanAmount',
        source: 'https://www.citibank.pl/kredyty/kredyt-hipoteczny/',
        note: 'Kwota kredytu nawet do 3 000 000 zł',
      },
      {
        field: 'minDownPaymentPercent',
        source: 'https://www.citibank.pl/kredyty/kredyt-hipoteczny/',
        note: 'Do 80% wartości nieruchomości (minimalny wkład własny: 20%)',
      },
      {
        field: 'earlyRepaymentFee',
        source: 'https://www.citibank.pl/kredyty/kredyt-hipoteczny/',
        note: 'Brak opłaty za wcześniejszą spłatę kredytu',
      },
      {
        field: 'baseInterestRate',
        source: 'docs/citi-handlowy/dodatkowe-informacje-produkcie-hipotecznym.pdf',
        note: 'Oprocentowanie zmienne 6,63% (WIBOR 3M 4,74% + marża 1,89%)',
      },
      {
        field: 'fixedInterestRate',
        source: 'docs/citi-handlowy/dodatkowe-informacje-produkcie-hipotecznym.pdf',
        note: 'Oprocentowanie okresowo stałe 6,28% przez 5 lat',
      },
      {
        field: 'wibor',
        source: 'docs/citi-handlowy/dodatkowe-informacje-produkcie-hipotecznym.pdf',
        note: 'WIBOR 3M 4,74%',
      },
      {
        field: 'margin',
        source: 'docs/citi-handlowy/dodatkowe-informacje-produkcie-hipotecznym.pdf',
        note: 'Marża 1,89%',
      },
      {
        field: 'commissionRate',
        source: 'docs/citi-handlowy/dodatkowe-informacje-produkcie-hipotecznym.pdf',
        note: '0% prowizji w przykładach reprezentatywnych (w ofercie promocyjnej)',
      },
      {
        field: 'rrso',
        source: 'docs/citi-handlowy/dodatkowe-informacje-produkcie-hipotecznym.pdf',
        note: 'RRSO 6,84% (zmienne), 6,46% (stałe)',
      },
      {
        field: 'supportedPurposes',
        source: 'docs/citi-handlowy/dodatkowe-informacje-produkcie-hipotecznym.pdf',
        note: 'Zakup, refinansowanie, remont/wykończenie, przekształcenie praw spółdzielczych, nabycie w drodze przetargu',
      },
      {
        field: 'supportedInterestRateTypes',
        source: 'docs/citi-handlowy/dodatkowe-informacje-produkcie-hipotecznym.pdf',
        note: 'Dwa warianty: zmienne w całym okresie lub okresowo stałe przez 5 lat',
      },
      {
        field: 'accountFee',
        source: 'docs/citi-handlowy/dodatkowe-informacje-produkcie-hipotecznym.pdf',
        note: 'Opłata za rachunek oszczędnościowo-rozliczeniowy (ROR): 0 zł',
      },
      {
        field: 'minLoanPeriod',
        source: 'docs/citi-handlowy/dodatkowe-informacje-produkcie-hipotecznym.pdf',
        note: 'Okres kredytowania od 60 do 360 miesięcy (5-30 lat) dla kredytu mieszkaniowego',
      },
      {
        field: 'maxLoanPeriod',
        source: 'docs/citi-handlowy/dodatkowe-informacje-produkcie-hipotecznym.pdf',
        note: 'Okres kredytowania od 60 do 360 miesięcy (5-30 lat) dla kredytu mieszkaniowego',
      },
      {
        field: 'accountRequired',
        source: 'docs/citi-handlowy/dodatkowe-informacje-produkcie-hipotecznym.pdf',
        note: 'Opłata za rachunek oszczędnościowo-rozliczeniowy (ROR): 0 zł przy utrzymaniu warunku wpływów miesięcznych min. 8 000 zł. Konto nie jest wymagane do uzyskania kredytu, ale może być warunkiem darmowego prowadzenia konta.',
      },
      {
        field: 'propertyInsuranceRequired',
        source: 'docs/citi-handlowy/dodatkowe-informacje-produkcie-hipotecznym.pdf',
        note: 'Wymagane zawarcie we własnym zakresie z ubezpieczycielem umowy ubezpieczenia nieruchomości, spełniającej minimalne warunki dotyczące zakresu ochrony ubezpieczeniowej wymaganej przez Bank. "Do uzyskania kredytu niezbędne jest zawarcie umowy ubezpieczenia nieruchomości"',
      },
      {
        field: 'lifeInsuranceRequired',
        source: 'docs/citi-handlowy/dodatkowe-informacje-produkcie-hipotecznym.pdf',
        note: 'W przykładach reprezentatywnych i dokumentach brak informacji o wymaganym ubezpieczeniu na życie. Ubezpieczenie na życie nie jest wymagane.',
      },
      {
        field: 'insuranceRate',
        source: 'docs/citi-handlowy/dodatkowe-informacje-produkcie-hipotecznym.pdf',
        note: 'W przykładach reprezentatywnych brak informacji o kosztach ubezpieczenia w costBreakdown. Koszty ubezpieczenia mogą być niskie lub wliczone w inne opłaty. Brak danych do obliczenia insuranceRate.',
      },
      {
        field: 'processingTime',
        source: 'docs/citi-handlowy/dodatkowe-informacje-produkcie-hipotecznym.pdf',
        note: 'Brak informacji o czasie przetwarzania wniosku w dostępnych dokumentach.',
      },
      {
        field: 'ltvAdjustments',
        source: 'docs/citi-handlowy/dodatkowe-informacje-produkcie-hipotecznym.pdf',
        note: 'Brak informacji o dostosowaniach marży w zależności od LTV w dostępnych dokumentach. Maksymalne LTV: 80% wartości nieruchomości.',
      },
      {
        field: 'representativeExampleFixed',
        source: 'docs/citi-handlowy/dodatkowe-informacje-produkcie-hipotecznym.pdf',
        note: 'Przykład reprezentatywny z dokumentu (RRSO 6,46%)',
      },
      {
        field: 'representativeExampleVariable',
        source: 'docs/citi-handlowy/dodatkowe-informacje-produkcie-hipotecznym.pdf',
        note: 'Przykład reprezentatywny z dokumentu (RRSO 6,84%)',
      },
      {
        field: 'fees',
        source: 'docs/citi-handlowy/toip-kredyt-mieszkaniowy-pozyczka-hipoteczna.pdf',
        note: 'Tabela Opłat i Prowizji - prowizja do 4,0%, opłata za wycenę 400-600 PLN',
      },
    ],
  },
  {
    creditId: 'credit-agricole-hipoteczny',
    bankId: 'credit-agricole',
    creditName: 'Kredyt hipoteczny "Prosto do domu"',
    offerUrl: 'https://www.credit-agricole.pl/klienci-indywidualni/kredyty-hipoteczne',
    baseInterestRate: 6.33,
    fixedInterestRate: 6.27,
    wibor: 4.43,
    margin: 1.9,
    commissionRate: 0,
    insuranceRate: 0.08,
    rrso: 7.15,
    minLoanAmount: 40000,
    maxLoanAmount: 3500000,
    minLoanPeriod: 7,
    maxLoanPeriod: 35,
    minDownPaymentPercent: 10,
    supportedPurposes: ['purchase', 'refinancing', 'construction'],
    supportedInterestRateTypes: ['fixed', 'variable'],
    earlyRepaymentFee: 0,
    accountRequired: false,
    accountFee: 0,
    propertyInsuranceRequired: true,
    lifeInsuranceRequired: true,
    description:
      'Kredyt hipoteczny z możliwością wyboru: zmienna stopa oprocentowania (6,33%) lub okresowo stała stopa 6,27% przez pierwsze 7 lat, następnie zmienna (WIBOR 3M + marża 1,9%). 0 zł prowizji za udzielenie kredytu i wcześniejszą spłatę. Możliwość karencji do 36 miesięcy.',
    processingTime:
      'Wniosek o kredyt bez wychodzenia z domu - formularz w Panelu klienta. Pomoc w wycenie nieruchomości.',
    specialOffers: [
      '0 zł prowizji za udzielenie kredytu i wcześniejszą spłatę',
      'Kredyt hipoteczny Prime: marża 1,8%, od 20% wkładu własnego, RRSO 6,90% (dla klientów z Kontem dla Ciebie Prime)',
      'Możliwość karencji do 36 miesięcy przy wypłacie kredytu',
      'Okres kredytowania do 35 lat',
    ],
    advantages: [
      'Kredyt już od 10% wkładu własnego',
      'Marża 1,9% (1,8% w ofercie Prime)',
      'Stałe oprocentowanie przez pierwszych 7 lat',
      '0 zł prowizji za udzielenie kredytu i wcześniejszą spłatę',
      'Okres kredytowania do 35 lat',
      'Możliwość karencji do 36 miesięcy',
      'Wniosek o kredyt bez wychodzenia z domu',
      'Pomoc w wycenie nieruchomości',
      'Po 7 latach możliwość wyboru dalszego stałego lub zmiennego oprocentowania',
    ],
    disadvantages: [
      'Wymagane ubezpieczenie nieruchomości',
      'Ubezpieczenie na życie oferowane przez bank (może być warunkiem preferencyjnych warunków)',
      'Zmienne oprocentowanie niesie ryzyko wzrostu raty wraz ze wzrostem WIBOR 3M',
      'Po okresie 7 lat stałej stopy może nastąpić skokowy wzrost raty przy przejściu na zmienne oprocentowanie',
    ],
    ltvAdjustments: {
      ratio80: 0,
      ratio90: 0.2,
      ratio95: null,
    },
    representativeExampleFixed: {
      rrso: 7.15,
      interestRate: 6.27,
      referenceRate: 'Okresowo stała stopa 6,27% przez 7 lat, następnie zmienna',
      loanPeriodYears: 21,
      loanAmount: 314000,
      downPaymentPercent: null,
      totalCost: 279938.8,
      costBreakdown: [
        'Odsetki: 255 396,80 zł',
        'Prowizja: 0 zł',
        'Ubezpieczenie na życie: 14 324,20 zł (za cały okres kredytowania)',
        'Ubezpieczenie nieruchomości: 9 608,80 zł (za cały okres kredytowania)',
        'Koszt sporządzenia operatu szacunkowego: 590,00 zł',
        'Podatek od czynności cywilnoprawnych za ustanowienie hipoteki: 19,00 zł',
        'Opłata za otwarcie/prowadzenie konta: 0 zł',
      ],
      paymentScheduleNote:
        '252 miesięcznych rat równych. Oprocentowanie stałe 6,27% będzie obowiązywać w okresie 7 lat po zawarciu umowy, a następnie obowiązywać będzie oprocentowanie zmienne.',
      calculationDate: '2025-11',
      notes: [
        'Przykład reprezentatywny dla kredytu mieszkaniowego w ofercie "Prosto do domu" z oprocentowaniem stałym w okresie 7 lat',
        'Okres spłaty: 252 miesięcznych rat (21 lat)',
        'Całkowita kwota do zapłaty: 593 938,80 zł',
      ],
    },
    representativeExampleVariable: {
      rrso: 7.15,
      interestRate: 6.33,
      referenceRate: 'WIBOR 3M + marża 1,9%',
      loanPeriodYears: 21.92,
      loanAmount: 369000,
      downPaymentPercent: 33.33, // Obliczone: jeśli wartość nieruchomości to 553 500 zł, to wkład własny = 184 500 zł (33,33%)
      totalCost: 344464.2,
      costBreakdown: [
        'Odsetki: 314 160 zł',
        'Prowizja: 0 zł',
        'Ubezpieczenie na życie: 17 697,10 zł (za cały okres kredytowania)',
        'Ubezpieczenie nieruchomości: 11 998,10 zł (za cały okres kredytowania)',
        'Koszt sporządzenia operatu szacunkowego: 590,00 zł',
        'Podatek od czynności cywilnoprawnych za ustanowienie hipoteki: 19,00 zł',
        'Opłata za otwarcie/prowadzenie konta: 0 zł',
      ],
      paymentScheduleNote:
        '263 miesięcznych rat równych. Oprocentowanie zmienne 6,33% w całym okresie kredytowania',
      calculationDate: '2025-11',
      notes: [
        'Przykład reprezentatywny dla kredytu mieszkaniowego w ofercie "Prosto do domu" z oprocentowaniem zmiennym',
        'Okres spłaty: 263 miesięcznych rat (21,92 lat)',
        'Całkowita kwota do zapłaty: 713 464,20 zł',
      ],
    },
    updated: '2025-11',
    notes: [
      'Bank oferuje dwa warianty oprocentowania: zmienna stopa w całym okresie lub okresowo stała przez 7 lat + zmienna.',
      'Wskaźnik referencyjny: WIBOR 3M (przyjmowany z 25-go dnia miesiąca kalendarzowego, a jeśli nie jest publikowany, to z ostatniego dnia roboczego przed 25-tym).',
      'Marża banku: 1,9% (1,8% w ofercie Prime dla klientów z Kontem dla Ciebie Prime).',
      'Oprocentowanie stałe przez 7 lat: suma 7-letniej stałej stopy bazowej (z dnia wydania decyzji kredytowej) i marży.',
      'Po okresie 7 lat klient może zdecydować o kontynuacji spłaty z okresowo stałą stopą lub wyborze oprocentowania zmiennego.',
      'Na dwa miesiące przed zakończeniem okresu stałej stopy bank poinformuje klienta o możliwości wyboru na dalszy okres spłaty.',
      'Ubezpieczenie nieruchomości jest wymagane. Ubezpieczenie na życie jest wymagane (wymagamy także ubezpieczenia na życie).',
      'Marże zależą od LTV i pakietu: Pakiet "STANDARD" - do 80% LTV marża 2,6%, 80,01-90% marża 2,8%; Pakiet "Z USŁUGAMI DODATKOWYMI" - do 80% LTV marża 1,90%, 80,01-90% marża 2,5%; Oferta "Hipoteka Prime" - do 80% LTV marża 1,8%.',
      'Dla pakietu "Z USŁUGAMI DODATKOWYMI" wymagane: konto dla osób fizycznych z regularnym miesięcznym wpływem wynagrodzenia minimum 2 500 zł, ubezpieczenie na życie Credit Agricole przez okres 5 lat, ubezpieczenie nieruchomości w Credit Agricole przez okres 5 lat.',
      'Koszt ubezpieczeń oszacowany na podstawie przykładu reprezentatywnego: (17 697,10 + 11 998,10) / 369 000 ≈ 8% (dla wariantu zmiennego).',
      'Możliwość karencji do 36 miesięcy przy wypłacie kredytu.',
      'Oferta "Kredyt hipoteczny Prime" dostępna dla klientów z Kontem dla Ciebie Prime: marża 1,8%, od 20% wkładu własnego, RRSO 6,90%.',
      'Maksymalny okres kredytowania: 35 lat dla kredytów na zakup mieszkania i domu, remont oraz refinansowe; 25 lat dla kredytów na zakup działki.',
      'Prowizja za udzielenie kredytu mieszkaniowego: 0% - 3,0% (w ofercie promocyjnej 0%). Przedterminowa częściowa lub całkowita spłata kredytu: 0%.',
      'Wysokość marż dla kredytu mieszkaniowego w PLN: od 1,80% (ustalana indywidualnie z Klientem).',
      'Wysokość stopy bazowej dla kredytów z okresowo stałą stopą procentową w okresie 7 lat (od 1.11.2025 r. do 30.11.2025 r.): 4,3%.',
      'Wartość wskaźnika referencyjnego WIBOR 3M z dnia 24.10.2025 r.: 4,47%.',
      'WIBOR 3M przyjmowany z 25-go dnia miesiąca kalendarzowego (lub z ostatniego dnia roboczego przed 25-tym, jeśli nie jest publikowany).',
      'Informacje dodatkowe z rankomat.pl: kwota kredytu od 40 000 zł do 3 500 000 zł, okres kredytowania od 12 miesięcy do 420 miesięcy (35 lat), minimalny wiek kredytobiorcy 18 lat, maksymalny wiek w chwili spłaty ostatniej raty 70 lat. Wymagany rachunek osobisty z regularnym miesięcznym wpływem wynagrodzenia min. 2 500 zł (dla pakietu "Z USŁUGAMI DODATKOWYMI").',
      'Wysokość wskaźnika referencyjnego jest stała w okresie każdych kolejnych trzech miesięcy okresu kredytowania.',
      'Czas spłaty kredytu z oprocentowaniem stałym nie może być krótszy niż 7 lat (okres obowiązywania stałej stopy procentowej).',
      'Wysokość oprocentowania stałego (na okres 7 lat) wyliczana jako suma stałej stopy bazowej i marży. Wysokość stopy bazowej wyznaczana na dzień wydania decyzji kredytowej i nie zmienia się w ciągu 7 lat od dnia wypłaty kredytu.',
      'Podczas obowiązywania stałej stopy oprocentowania nie można zmienić oprocentowania kredytu na zmienne.',
      'Jeśli suma wskaźnika referencyjnego WIBOR 3M i marży wyniesie zero lub przyjmie wartość ujemną, oprocentowanie kredytu będzie miało wartość zero.',
      'Ryzyko związane ze stałą stopą procentową: jeśli w okresie obowiązywania oprocentowania stałego będzie istotna zmiana wskaźnika referencyjnego WIBOR 3M, nie wpłynie to na wysokość raty i całkowity koszt kredytu. Ewentualną zmianę wartości wskaźnika odczuje się dopiero po 7 latach.',
    ],
    fieldSources: [
      {
        field: 'creditName',
        source: 'docs/credit-agricole/informacje-ogolne-dot-kredytu-hipotecznego_34243.pdf',
        note: 'Nazwa produktu: "Kredyt hipoteczny Prosto do domu"',
      },
      {
        field: 'fixedInterestRate',
        source: 'docs/credit-agricole/informacje-ogolne-dot-kredytu-hipotecznego_34243.pdf',
        note: 'Okresowo stała stopa 6,27% przez pierwsze 7 lat',
      },
      {
        field: 'baseInterestRate',
        source: 'docs/credit-agricole/informacje-ogolne-dot-kredytu-hipotecznego_34243.pdf',
        note: 'Oprocentowanie zmienne 6,33% (z przykładu reprezentatywnego)',
      },
      {
        field: 'margin',
        source: 'https://www.credit-agricole.pl/klienci-indywidualni/kredyty-hipoteczne',
        note: 'Marża 1,9% (1,8% w ofercie Prime). Wysokość marż dla kredytu mieszkaniowego w PLN: od 1,80% (ustalana indywidualnie z Klientem).',
      },
      {
        field: 'wibor',
        source: 'docs/credit-agricole/informacje-ogolne-dot-kredytu-hipotecznego_34243.pdf',
        note: 'WIBOR 3M obliczony: 6,33% - 1,9% = 4,43% (z przykładu reprezentatywnego)',
      },
      {
        field: 'commissionRate',
        source: 'https://www.credit-agricole.pl/klienci-indywidualni/kredyty-hipoteczne',
        note: 'Udzielenie/podwyższenie kwoty kredytu mieszkaniowego: 0% - 3% (w ofercie promocyjnej 0%)',
      },
      {
        field: 'earlyRepaymentFee',
        source: 'https://www.credit-agricole.pl/klienci-indywidualni/kredyty-hipoteczne',
        note: 'Przedterminowa częściowa lub całkowita spłata kredytu: 0%',
      },
      {
        field: 'rrso',
        source: 'https://www.credit-agricole.pl/klienci-indywidualni/kredyty-hipoteczne',
        note: 'RRSO 7,15% dla obu wariantów (zmienny i stały)',
      },
      {
        field: 'minDownPaymentPercent',
        source: 'https://www.credit-agricole.pl/klienci-indywidualni/kredyty-hipoteczne',
        note: 'Kredyt już od 10% wkładu własnego',
      },
      {
        field: 'accountRequired',
        source: 'docs/credit-agricole/marze-i-prowizje-w-kredytach-hipotecznych-10062025_32900.pdf',
        note: 'Konto nie jest wymagane do uzyskania kredytu, ale dla pakietu "Z USŁUGAMI DODATKOWYMI" wymagane jest konto dla osób fizycznych z regularnym miesięcznym wpływem wynagrodzenia minimum 2 500 zł',
      },
      {
        field: 'lifeInsuranceRequired',
        source: 'docs/credit-agricole/informacje-ogolne-dot-kredytu-hipotecznego_34243.pdf',
        note: 'Wymagamy także ubezpieczenia na życie. W przykładach reprezentatywnych ubezpieczenie na życie jest uwzględnione w kosztach.',
      },
      {
        field: 'ltvAdjustments',
        source: 'docs/credit-agricole/marze-i-prowizje-w-kredytach-hipotecznych-10062025_32900.pdf',
        note: 'Marże zależą od LTV i pakietu: Pakiet "STANDARD" - do 80% LTV marża 2,6%, 80,01-90% marża 2,8% (+0,2 p.p.); Pakiet "Z USŁUGAMI DODATKOWYMI" - do 80% LTV marża 1,90%, 80,01-90% marża 2,5% (+0,6 p.p.); Oferta "Hipoteka Prime" - do 80% LTV marża 1,8%',
      },
      {
        field: 'minLoanAmount',
        source: 'https://www.rankomat.pl/kredyty-hipoteczne/credit-agricole',
        note: 'Kwota kredytu od 40 000 zł (z rankomat.pl). W dokumentach banku brak informacji o minimalnej kwocie.',
      },
      {
        field: 'maxLoanAmount',
        source: 'https://www.rankomat.pl/kredyty-hipoteczne/credit-agricole',
        note: 'Kwota kredytu do 3 500 000 zł (z rankomat.pl). W dokumentach banku brak informacji o maksymalnej kwocie.',
      },
      {
        field: 'minLoanPeriod',
        source: 'https://www.credit-agricole.pl/klienci-indywidualni/kredyty-hipoteczne',
        note: 'Czas spłaty kredytu z oprocentowaniem stałym nie może być krótszy niż 7 lat (okres obowiązywania stałej stopy procentowej). Z rankomat.pl: od 12 miesięcy (wartość może się różnić)',
      },
      {
        field: 'maxLoanPeriod',
        source: 'docs/credit-agricole/informacje-ogolne-dot-kredytu-hipotecznego_34243.pdf',
        note: 'Maksymalny okres: 35 lat dla kredytów na zakup mieszkania i domu, remont oraz refinansowe; 25 lat dla kredytów na zakup działki',
      },
      {
        field: 'supportedPurposes',
        source: 'docs/credit-agricole/informacje-ogolne-dot-kredytu-hipotecznego_34243.pdf',
        note: 'Zakup nieruchomości, budowa/rozbudowa, remont/wykończenie, refinansowanie',
      },
      {
        field: 'supportedInterestRateTypes',
        source:
          'docs/credit-agricole/informacja-o-rodzajach-oprocentowania-w-kredytach-i-pozyczkach-hipotecznych_21512.pdf',
        note: 'Dwa warianty: zmienna w całym okresie lub okresowo stała przez 7 lat + zmienna',
      },
      {
        field: 'propertyInsuranceRequired',
        source: 'docs/credit-agricole/informacje-ogolne-dot-kredytu-hipotecznego_34243.pdf',
        note: 'Wymagane ubezpieczenie nieruchomości',
      },
      {
        field: 'insuranceRate',
        source: 'docs/credit-agricole/informacje-ogolne-dot-kredytu-hipotecznego_34243.pdf',
        note: 'Przeliczenie: (17 697,10 + 11 998,10) / 369 000 ≈ 8%',
      },
      {
        field: 'accountFee',
        source: 'docs/credit-agricole/informacje-ogolne-dot-kredytu-hipotecznego_34243.pdf',
        note: 'Opłata za otwarcie/prowadzenie konta: 0 zł',
      },
      {
        field: 'representativeExampleFixed',
        source: 'docs/credit-agricole/informacje-ogolne-dot-kredytu-hipotecznego_34243.pdf',
        note: 'Przykład reprezentatywny z dokumentu UOKH (RRSO 7,15%)',
      },
      {
        field: 'representativeExampleVariable',
        source: 'docs/credit-agricole/informacje-ogolne-dot-kredytu-hipotecznego_34243.pdf',
        note: 'Przykład reprezentatywny z dokumentu UOKH (RRSO 7,15%)',
      },
      {
        field: 'specialOffers',
        source: 'https://www.credit-agricole.pl/klienci-indywidualni/kredyty-hipoteczne',
        note: 'Oferta Prime, karencja do 36 miesięcy, okres do 35 lat',
      },
    ],
  },
  {
    creditId: 'ing-hipoteczny',
    bankId: 'ing',
    creditName: 'Kredyt hipoteczny',
    offerUrl: 'https://www.ing.pl/lp/kredyt-hipoteczny-zdalnie',
    baseInterestRate: 7.62,
    fixedInterestRate: 7.33,
    wibor: 5.82,
    margin: 1.8,
    commissionRate: 0,
    insuranceRate: 0.041,
    rrso: 7.9,
    minLoanAmount: 70000,
    maxLoanAmount: 4000000,
    minLoanPeriod: 1,
    maxLoanPeriod: 35,
    minDownPaymentPercent: 20,
    supportedPurposes: ['purchase', 'refinancing', 'construction'],
    supportedInterestRateTypes: ['fixed', 'variable'],
    earlyRepaymentFee: 0,
    accountRequired: false,
    accountFee: 0,
    propertyInsuranceRequired: true,
    lifeInsuranceRequired: false,
    description:
      'Kredyt hipoteczny z możliwością wyboru: zmienna stopa oprocentowania (7,62%) lub okresowo stała stopa 7,33% przez pierwsze 5 lat, następnie zmienna (WIBOR 1M + marża 1,80%). Oferta specjalna "Łatwy start" z 0% prowizji.',
    processingTime: 'Wniosek o kredyt można złożyć zdalnie przez internet.',
    specialOffers: [
      'Oferta specjalna "Łatwy start": 0% prowizji za udzielenie kredytu',
      'Standardowa prowizja: 1,9% udzielonej kwoty kredytu (można wybrać wariant bez prowizji)',
      'Konto Direct i bankowość internetowa Moje ING: 0 zł za cały okres kredytowania',
    ],
    advantages: [
      'Stałe oprocentowanie przez pierwszych 5 lat (7,33%)',
      '0% prowizji w ofercie specjalnej "Łatwy start"',
      'Możliwość wyboru wariantu cenowego bez prowizji',
      'Konto Direct i bankowość internetowa bezpłatne',
      'Wniosek o kredyt można złożyć zdalnie',
      'Możliwość przedłużenia okresu stałej stopy oprocentowania',
      'Wsparcie dla różnych celów: zakup, budowa, remont, refinansowanie',
    ],
    disadvantages: [
      'Wymagane ubezpieczenie nieruchomości od zdarzeń losowych',
      'Ubezpieczenie spłaty kredytu może być wymagane (za pierwsze 3 lata)',
      'Standardowa prowizja 1,9% (jeśli nie wybrano wariantu bez prowizji)',
      'Zmienne oprocentowanie niesie ryzyko wzrostu raty wraz ze wzrostem WIBOR 1M',
      'Po okresie 5 lat stałej stopy może nastąpić wzrost raty przy przejściu na zmienne oprocentowanie',
    ],
    ltvAdjustments: null,
    representativeExampleFixed: {
      rrso: 7.9,
      interestRate: 7.33,
      referenceRate: 'Okresowo stała stopa 7,33% przez 5 lat, następnie zmienna',
      loanPeriodYears: 25,
      loanAmount: 360000,
      downPaymentPercent: 33.33,
      totalCost: 441601.23,
      costBreakdown: [
        'Odsetki: 426 177,97 zł',
        'Prowizja banku: 0,00 zł (oferta specjalna "Łatwy start")',
        'Ubezpieczenie nieruchomości: 10 402,56 zł (za cały okres kredytowania)',
        'Ubezpieczenie spłaty kredytu: 4 441,70 zł (za pierwsze 3 lata)',
        'Opłata za usługę wyceny nieruchomości: 560,00 zł (mieszkanie)',
        'Podatek od czynności cywilnoprawnych (PCC): 19,00 zł',
        'Rachunek bankowy Konto Direct: 0 zł',
        'Bankowość internetowa Moje ING: 0 zł',
      ],
      paymentScheduleNote:
        '299 miesięcznych rat kapitałowo-odsetkowych po 2 624,04 zł. Oprocentowanie stałe przez pierwsze 5 lat, następnie zmienne.',
      calculationDate: '2025-01-13',
      notes: [
        'Przykład reprezentatywny dla kredytu budowlano-hipotecznego w ofercie specjalnej "Łatwy start"',
        'Całkowita kwota do zapłaty: 801 601,23 zł',
        'Wymagane minimalne zabezpieczenie: 540 000 zł (wartość nieruchomości), LTV: 66,67%',
        'Stałe oprocentowanie niesie ze sobą ryzyko, iż wysokość raty może być okresowo wyższa niż gdyby była obliczana na podstawie aktualnego wskaźnika.',
      ],
    },
    representativeExampleVariable: {
      rrso: 8.21,
      interestRate: 7.62,
      referenceRate: 'WIBOR 1M 5,82% + marża 1,80% (z dnia 13.01.2025)',
      loanPeriodYears: 25,
      loanAmount: 360000,
      downPaymentPercent: 33.33,
      totalCost: 462035.76,
      costBreakdown: [
        'Odsetki: 446 608,67 zł',
        'Prowizja banku: 0,00 zł (oferta specjalna "Łatwy start")',
        'Ubezpieczenie nieruchomości: 10 402,56 zł (za cały okres kredytowania)',
        'Ubezpieczenie spłaty kredytu: 4 445,53 zł (za pierwsze 3 lata)',
        'Opłata za usługę wyceny nieruchomości: 560,00 zł (mieszkanie)',
        'Podatek od czynności cywilnoprawnych (PCC): 19,00 zł',
        'Rachunek bankowy Konto Direct: 0 zł',
        'Bankowość internetowa Moje ING: 0 zł',
      ],
      paymentScheduleNote:
        '299 miesięcznych rat kapitałowo-odsetkowych po 2 691,66 zł. Oprocentowanie zmienne w całym okresie.',
      calculationDate: '2025-01-13',
      notes: [
        'Przykład reprezentatywny dla kredytu budowlano-hipotecznego w ofercie specjalnej "Łatwy start"',
        'Całkowita kwota do zapłaty: 822 035,76 zł',
        'Wymagane minimalne zabezpieczenie: 540 000 zł (wartość nieruchomości), LTV: 66,67%',
      ],
    },
    updated: '2025-01-31',
    notes: [
      'Bank oferuje dwa warianty oprocentowania: zmienna stopa w całym okresie lub okresowo stała przez 5 lat + zmienna.',
      'Wskaźnik referencyjny: WIBOR 1M (może być również WIRON 1M Stopa Składana, WIBOR 3M, WIBOR 6M, WIBOR 1Y - w zależności od umowy).',
      'Marża banku: 1,80%.',
      'Oprocentowanie stałe przez 5 lat: 7,33% (z dnia wydania decyzji kredytowej).',
      'Standardowa prowizja: 1,9% udzielonej kwoty kredytu, ale można wybrać wariant cenowy bez prowizji (oferta specjalna "Łatwy start").',
      'Ubezpieczenie nieruchomości od zdarzeń losowych jest wymagane (wariant podstawowy: 0,0096% kwoty kredytu miesięcznie, wariant rozszerzony: 0,0228% kwoty kredytu miesięcznie).',
      'Ubezpieczenie spłaty kredytu może być wymagane (za pierwsze 3 lata). Ubezpieczenie na życie nie jest obowiązkowe, ale może być elementem oferty specjalnej.',
      'Koszt ubezpieczeń oszacowany na podstawie przykładu reprezentatywnego: (10 402,56 + 4 441,70) / 360 000 ≈ 4,1% (dla wariantu ze stałą stopą).',
      'Opłata za wycenę nieruchomości: 560 zł (mieszkanie), 560 zł (działka), 870 zł (dom jednorodzinny), 1500 zł (nieruchomość nietypowa).',
      'Konto Direct i bankowość internetowa Moje ING: 0 zł za cały okres kredytowania.',
      'Możliwość złożenia wniosku o kredyt zdalnie przez internet.',
      'Maksymalny okres kredytowania: 35 lat (dla kredytu hipotecznego). Standardowe okresy kredytowania wynoszą z reguły do 25 lat.',
      'Maksymalne LTV: 80% wartości zabezpieczeń (minimalny wkład własny: 20%).',
      'Stosunek kwoty kredytu (z prowizjami i odsetkami) do wartości wszystkich zabezpieczeń nie może być wyższy niż 80%.',
      '0% prowizji za wcześniejszą spłatę/nadpłatę kredytu (w ofercie specjalnej "Łatwy start").',
    ],
    fieldSources: [
      {
        field: 'creditName',
        source: 'https://www.ing.pl/lp/kredyt-hipoteczny-zdalnie',
        note: 'Nazwa produktu: "Kredyt hipoteczny"',
      },
      {
        field: 'fixedInterestRate',
        source:
          'docs/ing/Informacje_ogolne_o_kredycie_hipotecznym_i_pozyczce_hipotecznej_w_ING_Banku_Slaskim (1).pdf',
        note: 'Okresowo stała stopa 7,33% przez pierwsze 5 lat',
      },
      {
        field: 'baseInterestRate',
        source:
          'docs/ing/Informacje_ogolne_o_kredycie_hipotecznym_i_pozyczce_hipotecznej_w_ING_Banku_Slaskim (1).pdf',
        note: 'Oprocentowanie zmienne 7,62% (z przykładu reprezentatywnego)',
      },
      {
        field: 'wibor',
        source:
          'docs/ing/Informacje_ogolne_o_kredycie_hipotecznym_i_pozyczce_hipotecznej_w_ING_Banku_Slaskim (1).pdf',
        note: 'WIBOR 1M 5,82% z przykładu reprezentatywnego (stan na 13.01.2025)',
      },
      {
        field: 'margin',
        source:
          'docs/ing/Informacje_ogolne_o_kredycie_hipotecznym_i_pozyczce_hipotecznej_w_ING_Banku_Slaskim (1).pdf',
        note: 'Marża 1,80%',
      },
      {
        field: 'commissionRate',
        source:
          'docs/ing/Informacje_ogolne_o_kredycie_hipotecznym_i_pozyczce_hipotecznej_w_ING_Banku_Slaskim (1).pdf',
        note: '0% prowizji w ofercie specjalnej "Łatwy start", standardowo 1,9%',
      },
      {
        field: 'rrso',
        source:
          'docs/ing/Informacje_ogolne_o_kredycie_hipotecznym_i_pozyczce_hipotecznej_w_ING_Banku_Slaskim (1).pdf',
        note: 'RRSO 7,90% dla wariantu ze stałą stopą, 8,21% dla wariantu zmiennego',
      },
      {
        field: 'supportedPurposes',
        source:
          'docs/ing/Informacje_ogolne_o_kredycie_hipotecznym_i_pozyczce_hipotecznej_w_ING_Banku_Slaskim (1).pdf',
        note: 'Zakup domu/mieszkania, zakup działki i budowa, remont/modernizacja, pożyczka hipoteczna na dowolny cel',
      },
      {
        field: 'supportedInterestRateTypes',
        source:
          'docs/ing/Informacje_ogolne_o_kredycie_hipotecznym_i_pozyczce_hipotecznej_w_ING_Banku_Slaskim (1).pdf',
        note: 'Dwa warianty: zmienna w całym okresie lub okresowo stała przez 5 lat + zmienna',
      },
      {
        field: 'minLoanAmount',
        source: 'https://www.ing.pl/lp/kredyt-hipoteczny-zdalnie',
        note: 'Kwota kredytu od 70 000 zł (z kalkulatora na stronie)',
      },
      {
        field: 'maxLoanAmount',
        source: 'https://www.ing.pl/lp/kredyt-hipoteczny-zdalnie',
        note: 'Kwota kredytu do 4 000 000 zł (z kalkulatora na stronie)',
      },
      {
        field: 'minLoanPeriod',
        source: 'https://www.ing.pl/lp/kredyt-hipoteczny-zdalnie',
        note: 'Minimalny okres kredytowania: 1 rok (z kalkulatora na stronie)',
      },
      {
        field: 'accountRequired',
        source:
          'docs/ing/Informacje_ogolne_o_kredycie_hipotecznym_i_pozyczce_hipotecznej_w_ING_Banku_Slaskim (1).pdf',
        note: 'Konto Direct nie jest wymagane do uzyskania kredytu. Rachunek bankowy Konto Direct: 0 zł za cały okres kredytowania.',
      },
      {
        field: 'propertyInsuranceRequired',
        source:
          'docs/ing/Informacje_ogolne_o_kredycie_hipotecznym_i_pozyczce_hipotecznej_w_ING_Banku_Slaskim (1).pdf',
        note: 'Wymagane ubezpieczenie nieruchomości od zdarzeń losowych',
      },
      {
        field: 'lifeInsuranceRequired',
        source:
          'docs/ing/Informacje_ogolne_o_kredycie_hipotecznym_i_pozyczce_hipotecznej_w_ING_Banku_Slaskim (1).pdf',
        note: 'Ubezpieczenie spłaty kredytu (ubezpieczenie kredytobiorcy na życie) może być wymagane (za pierwsze 3 lata) w ofercie specjalnej. Ubezpieczenie na życie nie jest obowiązkowe, ale może być elementem oferty specjalnej.',
      },
      {
        field: 'insuranceRate',
        source:
          'docs/ing/Informacje_ogolne_o_kredycie_hipotecznym_i_pozyczce_hipotecznej_w_ING_Banku_Slaskim (1).pdf',
        note: 'Przeliczenie: (10 402,56 + 4 441,70) / 360 000 ≈ 4,1%',
      },
      {
        field: 'accountFee',
        source:
          'docs/ing/Informacje_ogolne_o_kredycie_hipotecznym_i_pozyczce_hipotecznej_w_ING_Banku_Slaskim (1).pdf',
        note: 'Konto Direct i bankowość internetowa: 0 zł za cały okres kredytowania',
      },
      {
        field: 'maxLoanPeriod',
        source:
          'docs/ing/Informacje_ogolne_o_kredycie_hipotecznym_i_pozyczce_hipotecznej_w_ING_Banku_Slaskim (1).pdf',
        note: 'Maksymalny okres kredytowania: 35 lat (dla kredytu hipotecznego). Standardowe okresy wynoszą z reguły do 25 lat.',
      },
      {
        field: 'minDownPaymentPercent',
        source:
          'docs/ing/Informacje_ogolne_o_kredycie_hipotecznym_i_pozyczce_hipotecznej_w_ING_Banku_Slaskim (1).pdf',
        note: 'Maksymalne LTV: 80% wartości zabezpieczeń (minimalny wkład własny: 20%)',
      },
      {
        field: 'earlyRepaymentFee',
        source:
          'docs/ing/Informacje_ogolne_o_kredycie_hipotecznym_i_pozyczce_hipotecznej_w_ING_Banku_Slaskim (1).pdf',
        note: '0% prowizji za wcześniejszą spłatę/nadpłatę kredytu (w ofercie specjalnej "Łatwy start")',
      },
      {
        field: 'representativeExampleFixed',
        source:
          'docs/ing/Informacje_ogolne_o_kredycie_hipotecznym_i_pozyczce_hipotecznej_w_ING_Banku_Slaskim (1).pdf',
        note: 'Przykład reprezentatywny z dokumentu UOKH (RRSO 7,90%)',
      },
      {
        field: 'representativeExampleVariable',
        source:
          'docs/ing/Informacje_ogolne_o_kredycie_hipotecznym_i_pozyczce_hipotecznej_w_ING_Banku_Slaskim (1).pdf',
        note: 'Przykład reprezentatywny z dokumentu UOKH (RRSO 8,21%)',
      },
      {
        field: 'specialOffers',
        source:
          'docs/ing/Informacje_ogolne_o_kredycie_hipotecznym_i_pozyczce_hipotecznej_w_ING_Banku_Slaskim (1).pdf',
        note: 'Oferta specjalna "Łatwy start" z 0% prowizji',
      },
      {
        field: 'processingTime',
        source: 'https://www.ing.pl/lp/kredyt-hipoteczny-zdalnie',
        note: 'Wniosek o kredyt można złożyć zdalnie przez internet',
      },
    ],
  },
  {
    creditId: 'mbank-hipoteczny',
    bankId: 'mbank',
    creditName: 'Kredyt hipoteczny na nieruchomość energooszczędną',
    offerUrl:
      'https://www.mbank.pl/indywidualny/kredyty/kredyty-hipoteczne/na-nieruchomosc-energooszczedna/',
    baseInterestRate: null, // Oprocentowanie zmienne = WIBOR + marża (1,65% dla LTV <=80%, 2,10% dla LTV >=80%). Z rankomat.pl: 6,99% (wartość może się różnić)
    fixedInterestRate: 5.93,
    wibor: null, // Wskaźnik referencyjny: WIBOR 1M, WIBOR 3M, WIBOR 6M lub EURIBOR (w zależności od umowy). Z rankomat.pl: 0% (wartość może się różnić)
    margin: 1.65, // Z rankomat.pl: 6,99% (wartość może się różnić, w dokumentach banku: 1,65% dla LTV <=80%, 2,10% dla LTV >=80%)
    commissionRate: 0,
    insuranceRate: 0.02, // Z rankomat.pl: 0,05% (wartość może się różnić)
    rrso: 6.83,
    minLoanAmount: 100000, // Z rankomat.pl
    maxLoanAmount: 4000000, // Z rankomat.pl
    minLoanPeriod: 5, // 60 miesięcy = 5 lat (z rankomat.pl)
    maxLoanPeriod: 35, // 420 miesięcy = 35 lat (z rankomat.pl)
    minDownPaymentPercent: 10, // Maksymalny LTV: 90% (z rankomat.pl)
    supportedPurposes: ['purchase', 'refinancing', 'construction'],
    supportedInterestRateTypes: ['fixed', 'variable'],
    earlyRepaymentFee: 0,
    accountRequired: true,
    accountFee: null,
    propertyInsuranceRequired: true,
    lifeInsuranceRequired: true,
    description:
      'Kredyt hipoteczny na nieruchomość energooszczędną z preferencyjnymi warunkami. Marża niższa o 0,20 p.p. od stawek promocyjnych dla nieruchomości energooszczędnej. Oprocentowanie stałe przez 5 lat od 5,93% (segment Intensive, LTV <=80%) lub zmienne. 0% prowizji za udzielenie kredytu i częściową wcześniejszą spłatę.',
    processingTime: 'Wniosek można złożyć w serwisie transakcyjnym.',
    specialOffers: [
      '0% prowizji za udzielenie kredytu i częściową wcześniejszą spłatę',
      'Marża niższa o 0,20 p.p. od stawek promocyjnych dla nieruchomości energooszczędnej',
      'Dodatkowa obniżka marży lub oprocentowania o 0,10 p.p. dla aktywnych klientów (produkt w mBanku od minimum 6 miesięcy)',
      'Promocje "Od dziś u siebie - edycja 2" oraz "Na stałe u siebie - edycja 2" obowiązują od 23.10.2025 r. do 21.01.2026 r.',
    ],
    advantages: [
      'Kredyt już od 10% wkładu własnego',
      'Marża promocyjna od 1,65% (segment Intensive, LTV <=80%)',
      'Oprocentowanie stałe przez 5 lat od 5,93% (segment Intensive, LTV <=80%)',
      '0% prowizji za udzielenie kredytu i częściową wcześniejszą spłatę',
      'Dodatkowa obniżka 0,10 p.p. dla aktywnych klientów',
      'Finansowanie domów, mieszkań w bloku lub budynku jednorodzinnym z niskim zużyciem energii',
      'Wsparcie dla różnych celów: zakup, budowa, remont, refinansowanie',
    ],
    disadvantages: [
      'Wymagane ubezpieczenie nieruchomości od ognia i innych zdarzeń losowych',
      'Wymagane ubezpieczenie na życie, zdrowie i od utraty pracy przez co najmniej 5 lat (warunek promocji)',
      'Wymagany rachunek do spłaty kredytu w mBanku z wymaganą kwotą zasilenia',
      'Warunki promocji wymagają spełnienia wszystkich warunków przez co najmniej 5 lat',
      'Nieruchomość musi spełniać normy energooszczędności (wymagane Świadectwo Charakterystyki Energetycznej)',
      'Zmienne oprocentowanie niesie ryzyko wzrostu raty wraz ze wzrostem wskaźnika referencyjnego',
    ],
    ltvAdjustments: {
      ratio80: 0,
      ratio90: 0.45,
      ratio95: 0.45,
    },
    representativeExampleFixed: {
      rrso: 6.43,
      interestRate: 5.93,
      referenceRate: 'Okresowo stała stopa przez 5 lat',
      loanPeriodYears: 17.67,
      loanAmount: 883784.95,
      downPaymentPercent: null,
      totalCost: 582404.95,
      costBreakdown: [
        'Odsetki: 575 084,95 zł',
        'Prowizja jednorazowa za udzielenie kredytu: 0,00%',
        'Ubezpieczenie na życie – za pierwsze 5 lat: brak',
        'Opłata za ocenę nieruchomości: 300 zł',
        'Ubezpieczenie nieruchomości od ognia i innych zdarzeń losowych: 7 200,00 zł (za cały okres)',
        'Podatek od czynności cywilno-prawnych (PCC): 19 zł',
      ],
      paymentScheduleNote:
        'Płatna w 212 ratach. Oprocentowanie stałe przez 5 lat, następnie zmienne.',
      calculationDate: '2025-11-13',
      notes: [
        'Przykład reprezentatywny dla kredytu hipotecznego w propozycji standardowej z oprocentowaniem okresowo stałym przez 5 lat',
        'Całkowita kwota do zapłaty: 1 466 084,95 zł',
        'Wysokość składki za ubezpieczenie nieruchomości średnio wynosi: 400 zł rocznie',
      ],
    },
    representativeExampleVariable: null,
    updated: '2025-11-13',
    notes: [
      'Bank oferuje kredyt hipoteczny na nieruchomość energooszczędną z preferencyjnymi warunkami.',
      'Marża promocyjna zależy od segmentu (Intensive lub Active) i LTV:',
      '  - Segment Intensive, LTV <=80%: marża 1,65%, oprocentowanie stałe 5,93%',
      '  - Segment Intensive, LTV >=80%: marża 2,10%, oprocentowanie stałe 6,18%',
      '  - Segment Active, LTV <=80%: marża 1,75%, oprocentowanie stałe 6,03%',
      '  - Segment Active, LTV >=80%: marża 2,20%, oprocentowanie stałe 6,28%',
      'Marża niższa o 0,20 p.p. od stawek promocyjnych dla nieruchomości energooszczędnej.',
      'Dodatkowa obniżka marży lub oprocentowania o 0,10 p.p. dla aktywnych klientów (produkt w mBanku od minimum 6 miesięcy).',
      'Warunki promocji wymagają: ubezpieczenia na życie przez co najmniej 5 lat, rachunku do spłaty w mBanku z wymaganą kwotą zasilenia, spełnienia warunków segmentu przez 5 lat.',
      'Nieruchomość energooszczędna musi spełniać normy wskaźnika EP (np. dom: 70 kWh/m²·rok dla budynków przed 2022, 63 kWh/m²·rok dla budynków po 2021).',
      'Wymagane Świadectwo Charakterystyki Energetycznej potwierdzające energooszczędność nieruchomości.',
      'Koszt ubezpieczeń oszacowany na podstawie przykładu reprezentatywnego: 7 200 zł / 883 784,95 zł ≈ 0,8% (za cały okres).',
      'Promocje "Od dziś u siebie - edycja 2" oraz "Na stałe u siebie - edycja 2" obowiązują od 23.10.2025 r. do 21.01.2026 r.',
      'Maksymalny okres kredytowania: 35 lat (standardowy limit dla kredytów hipotecznych w mBanku).',
      'Wskaźnik referencyjny dla oprocentowania zmiennego: WIBOR 1M, WIBOR 3M, WIBOR 6M lub EURIBOR (w zależności od umowy).',
      'Oprocentowanie zmienne: suma wskaźnika referencyjnego (np. WIBOR) i marży banku.',
      'Częściowa wcześniejsza spłata dla kredytu z oprocentowaniem zmiennym: 0% prowizji.',
      'Informacje dodatkowe z rankomat.pl: kwota kredytu od 100 000 zł do 4 000 000 zł, okres kredytowania od 60 miesięcy (5 lat) do 420 miesięcy (35 lat), wysokość marży kredytowej 6,99%, oprocentowanie 6,99%, ubezpieczenie na życie 0,05%, maksymalny poziom LTV 90%, wymagany rachunek osobisty z wpływem wynagrodzenia oraz ubezpieczenie na życie, minimalny wiek kredytobiorcy 18 lat, maksymalny wiek w chwili spłaty ostatniej raty 67 lat. Nazwa produktu: "Chcę tu zamieszkać na stałe - edycja 4".',
      'Opłata za rachunek do spłaty kredytu w mBanku zależy od wybranego pakietu konta. Wymagana kwota zasilenia rachunku jest warunkiem promocji.',
    ],
    fieldSources: [
      {
        field: 'creditName',
        source:
          'https://www.mbank.pl/indywidualny/kredyty/kredyty-hipoteczne/na-nieruchomosc-energooszczedna/',
        note: 'Nazwa produktu: "Kredyt hipoteczny na nieruchomość energooszczędną"',
      },
      {
        field: 'fixedInterestRate',
        source:
          'docs/mbank/informacja_o_wysokosci_stalego_oprocentowania,_nieruchomosc_energooszczedna_od_23.10.2025_do_12.11.2025.pdf',
        note: 'Oprocentowanie stałe przez 5 lat od 5,93% (segment Intensive, LTV <=80%)',
      },
      {
        field: 'margin',
        source:
          'docs/mbank/informacja_o_wysokosci_marz_dla_zmiennego_oprocentowania,_nieruchomosc_energooszczedna_od_23.10.2025_do_12.11.2025.pdf',
        note: 'Marża promocyjna od 1,65% (segment Intensive, LTV <=80%)',
      },
      {
        field: 'commissionRate',
        source:
          'https://www.mbank.pl/indywidualny/kredyty/kredyty-hipoteczne/na-nieruchomosc-energooszczedna/',
        note: '0% prowizji za udzielenie kredytu i częściową wcześniejszą spłatę',
      },
      {
        field: 'earlyRepaymentFee',
        source:
          'https://www.mbank.pl/indywidualny/kredyty/kredyty-hipoteczne/na-nieruchomosc-energooszczedna/',
        note: '0% prowizji za częściową wcześniejszą spłatę',
      },
      {
        field: 'rrso',
        source:
          'https://www.mbank.pl/indywidualny/kredyty/kredyty-hipoteczne/na-nieruchomosc-energooszczedna/',
        note: 'RRSO 6,83% dla kredytu na nieruchomość energooszczędną',
      },
      {
        field: 'minDownPaymentPercent',
        source:
          'https://www.mbank.pl/indywidualny/kredyty/kredyty-hipoteczne/na-nieruchomosc-energooszczedna/',
        note: 'Wkład własny minimum 10%',
      },
      {
        field: 'supportedPurposes',
        source:
          'https://www.mbank.pl/indywidualny/kredyty/kredyty-hipoteczne/na-nieruchomosc-energooszczedna/',
        note: 'Finansowanie domów, mieszkań w bloku lub budynku jednorodzinnym z niskim zużyciem energii',
      },
      {
        field: 'supportedInterestRateTypes',
        source: 'docs/mbank/ogolna-informacja-o-stalym-oprocentowaniu-nowy-kredyt-hipoteczny.pdf',
        note: 'Dwa warianty: zmienna w całym okresie lub okresowo stała przez 5 lat + zmienna',
      },
      {
        field: 'baseInterestRate',
        source:
          'docs/mbank/informacja_o_wysokosci_marz_dla_zmiennego_oprocentowania,_nieruchomosc_energooszczedna_od_23.10.2025_do_12.11.2025.pdf',
        note: 'Oprocentowanie zmienne = WIBOR + marża (1,65% dla LTV <=80%, 2,10% dla LTV >=80%). Konkretna wartość zależy od wskaźnika referencyjnego. Z rankomat.pl: 6,99% (wartość może się różnić)',
      },
      {
        field: 'wibor',
        source:
          'https://www.mbank.pl/indywidualny/kredyty/kredyty-hipoteczne/na-nieruchomosc-energooszczedna/',
        note: 'Wskaźnik referencyjny: WIBOR 1M, WIBOR 3M, WIBOR 6M lub EURIBOR (w zależności od umowy). Konkretna wartość nie jest podana w dokumentach. Z rankomat.pl: 0% (wartość może się różnić)',
      },
      {
        field: 'margin',
        source:
          'docs/mbank/informacja_o_wysokosci_marz_dla_zmiennego_oprocentowania,_nieruchomosc_energooszczedna_od_23.10.2025_do_12.11.2025.pdf',
        note: 'Marża promocyjna od 1,65% (segment Intensive, LTV <=80%). Z rankomat.pl: 6,99% (wartość może się różnić)',
      },
      {
        field: 'minLoanAmount',
        source: 'https://www.rankomat.pl/kredyty-hipoteczne/mbank',
        note: 'Kwota kredytu od 100 000 zł (z rankomat.pl). W dokumentach banku brak informacji o minimalnej kwocie.',
      },
      {
        field: 'maxLoanAmount',
        source: 'https://www.rankomat.pl/kredyty-hipoteczne/mbank',
        note: 'Kwota kredytu do 4 000 000 zł (z rankomat.pl). W dokumentach banku brak informacji o maksymalnej kwocie.',
      },
      {
        field: 'minLoanPeriod',
        source: 'https://www.rankomat.pl/kredyty-hipoteczne/mbank',
        note: 'Okres kredytowania od 60 miesięcy (5 lat) (z rankomat.pl). W dokumentach banku brak informacji o minimalnym okresie.',
      },
      {
        field: 'maxLoanPeriod',
        source: 'https://www.rankomat.pl/kredyty-hipoteczne/mbank',
        note: 'Okres kredytowania do 420 miesięcy (35 lat) (z rankomat.pl). W dokumentach banku: 35 lat',
      },
      {
        field: 'minDownPaymentPercent',
        source: 'https://www.rankomat.pl/kredyty-hipoteczne/mbank',
        note: 'Maksymalny poziom LTV: 90% (z rankomat.pl). W dokumentach banku: 10% wkład własny (LTV do 90%)',
      },
      {
        field: 'insuranceRate',
        source: 'https://www.rankomat.pl/kredyty-hipoteczne/mbank',
        note: 'Ubezpieczenie na życie 0,05% (z rankomat.pl). W dokumentach banku: 0,02% (oszacowane na podstawie przykładu reprezentatywnego)',
      },
      {
        field: 'accountFee',
        source:
          'https://www.mbank.pl/indywidualny/kredyty/kredyty-hipoteczne/na-nieruchomosc-energooszczedna/',
        note: 'Opłata za rachunek do spłaty kredytu w mBanku zależy od wybranego pakietu konta. Wymagana kwota zasilenia rachunku jest warunkiem promocji.',
      },
      {
        field: 'propertyInsuranceRequired',
        source:
          'https://www.mbank.pl/indywidualny/kredyty/kredyty-hipoteczne/na-nieruchomosc-energooszczedna/',
        note: 'Wymagane ubezpieczenie nieruchomości od ognia i innych zdarzeń losowych',
      },
      {
        field: 'lifeInsuranceRequired',
        source:
          'https://www.mbank.pl/indywidualny/kredyty/kredyty-hipoteczne/na-nieruchomosc-energooszczedna/',
        note: 'Wymagane ubezpieczenie na życie, zdrowie i od utraty pracy przez co najmniej 5 lat (warunek promocji)',
      },
      {
        field: 'accountRequired',
        source:
          'https://www.mbank.pl/indywidualny/kredyty/kredyty-hipoteczne/na-nieruchomosc-energooszczedna/',
        note: 'Wymagany rachunek do spłaty kredytu w mBanku z wymaganą kwotą zasilenia',
      },
      {
        field: 'maxLoanPeriod',
        source: 'docs/mbank/taryfa-osobyfiz-25-04-2025.pdf',
        note: 'Maksymalny okres kredytowania: 35 lat (standardowy limit dla kredytów hipotecznych w mBanku)',
      },
      {
        field: 'insuranceRate',
        source:
          'https://www.mbank.pl/indywidualny/kredyty/kredyty-hipoteczne/na-nieruchomosc-energooszczedna/',
        note: 'Przeliczenie: 7 200 zł (za cały okres) / 883 784,95 zł ≈ 0,8%',
      },
      {
        field: 'ltvAdjustments',
        source:
          'docs/mbank/informacja_o_wysokosci_marz_dla_zmiennego_oprocentowania,_nieruchomosc_energooszczedna_od_23.10.2025_do_12.11.2025.pdf',
        note: 'Marża promocyjna: LTV <=80% = 1,65% (Intensive) lub 1,75% (Active), LTV >=80% = 2,10% (Intensive) lub 2,20% (Active). Różnica: +0,45 p.p. dla LTV >=80%',
      },
      {
        field: 'representativeExampleFixed',
        source:
          'https://www.mbank.pl/indywidualny/kredyty/kredyty-hipoteczne/na-nieruchomosc-energooszczedna/',
        note: 'Przykład reprezentatywny z dokumentu (RRSO 6,43%)',
      },
      {
        field: 'specialOffers',
        source:
          'https://www.mbank.pl/indywidualny/kredyty/kredyty-hipoteczne/na-nieruchomosc-energooszczedna/',
        note: 'Promocje "Od dziś u siebie - edycja 2" oraz "Na stałe u siebie - edycja 2"',
      },
    ],
  },
  {
    creditId: 'pko-wlasny-kat',
    bankId: 'pko-bp',
    creditName: 'Własny Kąt Hipoteczny',
    offerUrl: 'https://www.pkobp.pl/klienci-indywidualni/kredyty-hipoteczne/wlasny-kat-hipoteczny/',
    baseInterestRate: 6.56,
    fixedInterestRate: 6.36,
    wibor: 4.53,
    margin: 2.03,
    commissionRate: 0,
    rrso: 7.25,
    insuranceRate: 0.086,
    minLoanAmount: 100000,
    maxLoanAmount: 1500000,
    minLoanPeriod: 1,
    maxLoanPeriod: 35,
    minDownPaymentPercent: 10,
    supportedPurposes: ['purchase', 'construction'],
    supportedInterestRateTypes: ['fixed', 'variable'],
    earlyRepaymentFee: 0,
    accountRequired: false,
    accountFee: null,
    propertyInsuranceRequired: true,
    lifeInsuranceRequired: false, // Ubezpieczenie na życie jest w przykładzie reprezentatywnym (24 970,75 zł), ale nie jest wymagane (może być warunkiem 0% prowizji)
    description:
      'Oferta ze stałą stopą 6,36% przez pierwsze 5 lat oraz oprocentowaniem zmiennym 6,56% (WIBOR 6M 4,53% + marża 2,03%).',
    processingTime: 'Proces zależy od kompletności dokumentów; zwykle kilka tygodni do decyzji.',
    specialOffers: ['0% prowizji w przykładzie reprezentatywnym obowiązującym od 10.10.2025 r.'],
    advantages: [
      'Stała stopa na 5 lat z obniżką o 0,2 p.p. (np. przy nowych domach)',
      'Minimalny wkład własny od 10%',
      'Możliwość wyboru rat równych lub malejących',
      'Wsparcie dla zakupu i budowy nieruchomości',
    ],
    disadvantages: [
      'Wymagane ubezpieczenie nieruchomości od ognia i innych zdarzeń losowych',
      'Wymagane konto osobiste z regularnymi wpływami dla preferencyjnych warunków',
      'Zmienne oprocentowanie niesie ryzyko wzrostu raty wraz ze wzrostem WIBOR 6M',
      'Po okresie 5 lat stałej stopy może nastąpić wzrost raty przy przejściu na zmienne oprocentowanie',
    ],
    ltvAdjustments: {
      ratio80: null,
      ratio90: 0.25,
      ratio95: null,
    },
    representativeExampleFixed: {
      rrso: 7.25,
      interestRate: 6.36,
      referenceRate: '5-letnia stała stopa bazowa 4,53% (10.10.2025)',
      loanPeriodYears: 25,
      loanAmount: 375000,
      downPaymentPercent: 38.6,
      totalCost: 417374.27,
      costBreakdown: [
        'Prowizja: 0%',
        'Odsetki: 384 484,52 zł',
        'Ubezpieczenie nieruchomości: 7 500,00 zł',
        'Ubezpieczenie na życie: 24 970,75 zł',
        'Ocena nieruchomości: 400 zł',
        'PCC: 19 zł',
        'Konto za Zero: 0 zł (przy wpływach 3 000 zł/mies.)',
      ],
      paymentScheduleNote:
        '300 miesięcznych rat równych: pierwsze 60 rat po 2 550,00 zł, od 61. miesiąca po 2 700,00 zł. Oprocentowanie stałe przez pierwsze 5 lat, następnie zmienne.',
      calculationDate: '2025-10-10',
      notes: [
        'Przykład reprezentatywny dla kredytu z okresowo stałą stopą przez 5 lat',
        'Całkowita kwota do zapłaty: 792 374,27 zł',
        'WIBOR 6M według stanu na 10.10.2025 r. wynosi 4,53%',
        'Wartość nieruchomości: 610 000 zł, LTV: 61,48%',
      ],
    },
    representativeExampleVariable: {
      rrso: 7.35,
      interestRate: 6.49,
      referenceRate: 'WIBOR 6M 4,46% (09.10.2025)',
      loanPeriodYears: 25,
      loanAmount: 375000,
      downPaymentPercent: 38.6,
      totalCost: 422454.2,
      costBreakdown: [
        'Prowizja: 0%',
        'Odsetki: 389 510,42 zł',
        'Ubezpieczenie nieruchomości: 7 500,00 zł',
        'Ubezpieczenie na życie: 25 024,78 zł',
        'Ocena nieruchomości: 400 zł',
        'PCC: 19 zł',
        'Konto za Zero: 0 zł (przy wpływach 3 000 zł/mies.)',
      ],
      paymentScheduleNote:
        '300 rat annuitetowych; pierwsze 299 rat po 2 531,35 zł, ostatnia rata 2 014,65 zł.',
      calculationDate: '2025-10-10',
      notes: ['Przykład reprezentatywny dla oprocentowania zmiennego.'],
    },
    updated: '2025-11-12',
    notes: [
      'Informacje na stronie PKO są orientacyjne i nie stanowią oferty – warunki zależą m.in. od kwoty kredytu, zabezpieczenia i posiadanych produktów.',
      'Kredyt z oprocentowaniem zmiennym niesie ryzyko wzrostu raty wraz ze wzrostem WIBOR; bank opisuje również scenariusz mieszany (stała stopa przez 5 lat).',
      'Formularz PKO prezentuje drugi przykład reprezentatywny dla oprocentowania zmiennego (RRSO 7,35%, WIBOR 6M 4,46%, marża 2,03%).',
      'Utrzymanie preferencyjnych warunków (np. 0% prowizji) wymaga konta ROR z regularnymi wpływami oraz polisy na życie; rezygnacja powoduje podwyższenie marży.',
      'Orientacyjny koszt ubezpieczeń oszacowany na podstawie przykładu reprezentatywnego (7 500 zł + 24 970,75 zł ≈ 8,6% kwoty kredytu).',
    ],
    fieldSources: [
      {
        field: 'baseInterestRate',
        source:
          'docs/pko-bp/Informacje_ogolne_dotyczace_umowy_o_kredyt_hipoteczny_pozyczke_hipoteczna_-_PKO_Banku_Polskiego.pdf',
        note: 'Przykład reprezentatywny – do potwierdzenia.',
      },
      {
        field: 'commissionRate',
        source:
          'docs/pko-bp/Informacje_ogolne_dotyczace_umowy_o_kredyt_hipoteczny_pozyczke_hipoteczna_-_PKO_Banku_Polskiego.pdf',
        note: 'Wartość 0% dla oferty promocyjnej; wymaga potwierdzenia warunków.',
      },
      {
        field: 'fixedInterestRate',
        source:
          'docs/pko-bp/Informacje_ogolne_dotyczace_umowy_o_kredyt_hipoteczny_pozyczke_hipoteczna_-_PKO_Banku_Polskiego.pdf',
        note: 'Stała stopa 6,36% z przykładu reprezentatywnego.',
      },
      {
        field: 'wibor',
        source:
          'docs/pko-bp/Informacje_ogolne_dotyczace_umowy_o_kredyt_hipoteczny_pozyczke_hipoteczna_-_PKO_Banku_Polskiego.pdf',
        note: 'Wartość z przykładu reprezentatywnego (stan na 10.10.2025).',
      },
      {
        field: 'margin',
        source:
          'docs/pko-bp/Informacje_ogolne_dotyczace_umowy_o_kredyt_hipoteczny_pozyczke_hipoteczna_-_PKO_Banku_Polskiego.pdf',
        note: 'Marża po okresie stałej stopy – wymaga potwierdzenia dla innych wariantów.',
      },
      {
        field: 'specialOffers',
        source:
          'docs/pko-bp/Informacje_ogolne_dotyczace_umowy_o_kredyt_hipoteczny_pozyczke_hipoteczna_-_PKO_Banku_Polskiego.pdf',
        note: 'Promocyjne 0% prowizji z przykładu reprezentatywnego (stan na 10.10.2025).',
      },
      {
        field: 'rrso',
        source:
          'docs/pko-bp/Informacje_ogolne_dotyczace_umowy_o_kredyt_hipoteczny_pozyczke_hipoteczna_-_PKO_Banku_Polskiego.pdf',
        note: 'RRSO 7,25% z przykładu reprezentatywnego.',
      },
      {
        field: 'minLoanAmount',
        source: 'https://www.pkobp.pl/klient-indywidualny/kredyty-pozyczki/kredyt-hipoteczny',
        note: 'Formularz kalkulatora – minimalna kwota 60 000 zł.',
      },
      {
        field: 'maxLoanAmount',
        source: 'https://www.pkobp.pl/klient-indywidualny/kredyty-pozyczki/kredyt-hipoteczny',
        note: 'Formularz kalkulatora – maksymalna kwota 4 000 000 zł.',
      },
      {
        field: 'minLoanPeriod',
        source: 'https://www.pkobp.pl/klient-indywidualny/kredyty-pozyczki/kredyt-hipoteczny',
        note: 'Formularz kalkulatora – minimalny okres 5 lat.',
      },
      {
        field: 'maxLoanPeriod',
        source: 'https://www.pkobp.pl/klient-indywidualny/kredyty-pozyczki/kredyt-hipoteczny',
        note: 'Formularz kalkulatora – maksymalny okres 35 lat.',
      },
      {
        field: 'notes',
        source: 'https://www.pkobp.pl/klient-indywidualny/kredyty-pozyczki/kredyt-hipoteczny',
        note: 'Komunikaty o charakterze informacyjnym oferty i ryzykach na stronie produktu.',
      },
      {
        field: 'processingTime',
        source: 'https://www.pkobp.pl/klient-indywidualny/kredyty-pozyczki/kredyt-hipoteczny',
        note: 'Informacja o procesie (zgłoszenie, decyzja, podpis) – czas zależy od kompletności dokumentów.',
      },
      {
        field: 'insuranceRate',
        source:
          'docs/pko-bp/Informacje_ogólne_dotyczące_umowy_o_kredyt_hipoteczny_pożyczkę_hipoteczną_-_PKO_Banku_Polskiego.pdf',
        note: 'Przeliczenie na podstawie kosztów ubezpieczeń z przykładu reprezentatywnego (ok. 32 470 zł / 375 000 zł ≈ 8,6%).',
      },
      {
        field: 'accountRequired',
        source:
          'docs/pko-bp/Informacje_ogólne_dotyczące_umowy_o_kredyt_hipoteczny_pożyczkę_hipoteczną_-_PKO_Banku_Polskiego.pdf',
        note: 'Bank nie wymaga konta do zawarcia umowy, ale promocyjna marża wymaga utrzymania ROR z systematycznymi wpływami.',
      },
      {
        field: 'minDownPaymentPercent',
        source: 'https://www.pkobp.pl/klient-indywidualny/kredyty-pozyczki/kredyt-hipoteczny',
        note: 'Sekcja korzyści – minimalny wkład własny 10%.',
      },
      {
        field: 'supportedPurposes',
        source: 'https://www.pkobp.pl/klient-indywidualny/kredyty-pozyczki/kredyt-hipoteczny',
        note: 'Lista celów finansowania (zakup, budowa, wykończenie).',
      },
      {
        field: 'supportedInterestRateTypes',
        source: 'https://www.pkobp.pl/klient-indywidualny/kredyty-pozyczki/kredyt-hipoteczny',
        note: 'Opis oprocentowania stałego (5 lat) i zmiennego.',
      },
      {
        field: 'earlyRepaymentFee',
        source: 'https://www.pkobp.pl/klient-indywidualny/kredyty-pozyczki/kredyt-hipoteczny',
        note: 'Tabela opłat – wcześniejsza spłata 0 zł.',
      },
      {
        field: 'propertyInsuranceRequired',
        source: 'https://www.pkobp.pl/klient-indywidualny/kredyty-pozyczki/kredyt-hipoteczny',
        note: 'Sekcja o zabezpieczeniach – wymagane ubezpieczenie nieruchomości.',
      },
      {
        field: 'ltvAdjustments.ratio90',
        source: 'https://www.pkobp.pl/klient-indywidualny/kredyty-pozyczki/kredyt-hipoteczny',
        note: 'Komunikat w formularzu: wkład własny <20% => marża +0,25 p.p.',
      },
    ],
  },
  {
    creditId: 'santander-hipoteczny',
    bankId: 'santander',
    creditName: 'Kredyt mieszkaniowy',
    offerUrl: 'https://www.santander.pl/klient-indywidualny/kredyty/kredyt-mieszkaniowy',
    baseInterestRate: 8.23,
    fixedInterestRate: 6.52,
    wibor: 5.23,
    margin: 3.0,
    commissionRate: 0, // 0% z ubezpieczeniem na życie "Spokojna Hipoteka", max. 3% bez ubezpieczenia
    insuranceRate: 0.0025, // Szacunkowo: ubezpieczenie nieruchomości 0,1% od minimalnej kwoty gwarancji (maksymalnie 1 tys. zł) / 400 000 zł ≈ 0,25%
    rrso: 7.57, // Z strony banku
    minLoanAmount: 100000, // Z kalkulatora na stronie banku
    maxLoanAmount: 2700000, // Z kalkulatora na stronie banku
    minLoanPeriod: 5, // Z kalkulatora na stronie banku
    maxLoanPeriod: 30, // Z kalkulatora na stronie banku
    minDownPaymentPercent: 10, // Z strony banku: wkład własny od min. 10%
    supportedPurposes: ['purchase', 'refinancing', 'construction'],
    supportedInterestRateTypes: ['fixed', 'variable'],
    earlyRepaymentFee: null,
    accountRequired: false, // Konto osobiste nie jest wymagane, ale daje obniżkę marży/oprocentowania o 0.2 p.p.
    accountFee: null,
    propertyInsuranceRequired: true, // Wymagane ubezpieczenie nieruchomości (0,1% od minimalnej kwoty gwarancji, maksymalnie 1 tys. zł)
    lifeInsuranceRequired: false, // Ubezpieczenie na życie "Spokojna Hipoteka" nie jest wymagane, ale daje 0% prowizji
    description:
      'Kredyt mieszkaniowy z możliwością wyboru: oprocentowanie okresowo stałe 6,52% przez 5 lat lub oprocentowanie zmienne 8,23% (WIBOR 3M 5,23% + marża 3,00%). Po 5 latach możliwość wyboru nowego oprocentowania stałego lub przejście na zmienne.',
    processingTime: 'Proces zależy od kompletności dokumentów i oceny zdolności kredytowej.',
    specialOffers: [
      'Brak prowizji za udzielenie kredytu z ubezpieczeniem na życie "Spokojna Hipoteka" (warunek: utrzymywanie przez min. 5 lat)',
      'Obniżka marży/oprocentowania o 0.2 p.p. z kontem osobistym (warunek: stałe wynagrodzenie min. 2 tys. zł przez min. 5 lat)',
      'Obniżka marży/oprocentowania o 0.1 p.p. z kartą kredytową (warunek: transakcje min. 500 zł miesięcznie przez min. 5 lat)',
      'Obniżka marży/oprocentowania o 0.1 p.p. z ubezpieczeniem nieruchomości Locum Comfort (warunek: utrzymywanie przez min. 5 lat)',
    ],
    advantages: [
      'Oprocentowanie okresowo stałe przez 5 lat (6,52%) - gwarancja niezmiennej raty',
      'Po 5 latach możliwość wyboru nowego oprocentowania stałego lub przejście na zmienne',
      'Możliwość wyboru między ratami równymi a malejącymi',
      'Wskaźnik referencyjny: WIBOR 3M lub WIBOR 6M',
      'Wsparcie dla różnych celów: zakup, budowa, remont, refinansowanie',
    ],
    disadvantages: [
      'Wysoka marża 3,00%',
      'Oprocentowanie zmienne 8,23% jest relatywnie wysokie',
      'Po 5-letnim okresie stałej stopy rata kredytu może znacząco wzrosnąć',
      'W okresie stałego oprocentowania nie można zmienić na zmienne',
      'Zmienne oprocentowanie niesie ryzyko wzrostu raty wraz ze wzrostem WIBOR 3M/6M',
      'Jeśli stopy procentowe spadną w okresie stałego oprocentowania, nie skorzystasz z niższego oprocentowania',
    ],
    ltvAdjustments: null,
    representativeExampleFixed: {
      rrso: 7.57, // Z informacji na stronie banku (RRSO 7,57%)
      interestRate: 6.52,
      referenceRate: 'Okresowo stała stopa 6,52% przez 5 lat',
      loanPeriodYears: 25,
      loanAmount: 400000,
      downPaymentPercent: 33.33, // Obliczone: jeśli wartość nieruchomości to 600 000 zł, to wkład własny = 200 000 zł (33,33%)
      totalCost: null,
      costBreakdown: [
        'Oprocentowanie okresowo stałe: 6,52% w skali roku',
        'Rata równa: 2 706 zł (pierwsza rata)',
        'Rata malejąca: 3 507 zł (pierwsza rata)',
      ],
      paymentScheduleNote:
        'Oprocentowanie stałe przez pierwsze 5 lat, następnie możliwość wyboru nowego stałego lub przejście na zmienne. Raty równe lub malejące.',
      calculationDate: '2025-06-17',
      notes: [
        'Przykład poglądowy dla kredytu 400 000 zł na 25 lat',
        'Po 5 latach możliwość wyboru nowego oprocentowania stałego lub przejście na zmienne',
        'Najpóźniej na dwa miesiące przed zakończeniem okresu stałego oprocentowania bank przedstawi możliwości',
      ],
    },
    representativeExampleVariable: {
      rrso: 7.57, // Z informacji na stronie banku (RRSO 7,57%)
      interestRate: 8.23,
      referenceRate: 'WIBOR 3M 5,23% + marża 3,00% (z dnia 17.06.2025)',
      loanPeriodYears: 25,
      loanAmount: 400000,
      downPaymentPercent: 33.33, // Obliczone: jeśli wartość nieruchomości to 600 000 zł, to wkład własny = 200 000 zł (33,33%)
      totalCost: null, // Nie podane w przykładzie poglądowym
      costBreakdown: [
        'Oprocentowanie zmienne: 8,23% w skali roku',
        'WIBOR 3M: 5,23% (z dnia 17.06.2025)',
        'Marża: 3,00%',
        'Rata równa: 3 149 zł (pierwsza rata)',
        'Rata malejąca: 4 077 zł (pierwsza rata)',
      ],
      paymentScheduleNote:
        'Oprocentowanie zmienne może zmieniać się co 3 lub 6 miesięcy w zależności od wskaźnika WIBOR 3M lub WIBOR 6M. Raty równe lub malejące.',
      calculationDate: '2025-06-17',
      notes: [
        'Przykład poglądowy dla kredytu 400 000 zł na 25 lat',
        'Całkowita kwota do spłaty przy ratach równych: 966 209 zł',
        'Całkowita kwota do spłaty przy ratach malejących: 834 005 zł',
        'Oprocentowanie zmienne może zmieniać się co 3 lub 6 miesięcy',
      ],
    },
    updated: '2025-06-17',
    notes: [
      'Bank oferuje dwa warianty oprocentowania: okresowo stałe przez 5 lat lub zmienne w całym okresie.',
      'Wskaźnik referencyjny: WIBOR 3M lub WIBOR 6M (w zależności od zapisów w umowie).',
      'Marża banku: 3,00%.',
      'Oprocentowanie okresowo stałe: 6,52% w skali roku przez 5 lat.',
      'Oprocentowanie zmienne: 8,23% (WIBOR 3M 5,23% + marża 3,00% - stan na 17.06.2025).',
      'W okresie stałego oprocentowania nie można zmienić oprocentowania kredytu na zmienne.',
      'Najpóźniej na dwa miesiące przed zakończeniem okresu stałego oprocentowania bank przedstawi możliwości: podpisanie aneksu z nowym oprocentowaniem stałym lub przejście na zmienne.',
      'Po 5-letnim okresie obowiązywania stałej stopy rata kredytu może znacząco wzrosnąć, jeśli wzrosną stopy procentowe.',
      'Możliwość wyboru między ratami równymi a malejącymi.',
      'Przykłady poglądowe pokazują wpływ zmian oprocentowania na wysokość raty i całkowite koszty kredytu.',
      'Decyzja kredytowa i warunki kredytu uzależnione są od indywidualnej oceny zdolności kredytowej, pozytywnej oceny nieruchomości oraz oceny ryzyka kredytowego.',
      'Prowizja za udzielenie kredytu: 0% z ubezpieczeniem na życie "Spokojna Hipoteka", max. 3% bez ubezpieczenia.',
      'Wkład własny: im wyższy, tym niższa kwota kredytu i niższe koszty. Gdy wkład własny jest poniżej 20%, ponosisz wyższe koszty kredytu (np. wyższa marża). Minimalny wkład własny: 10%.',
      'Okres kredytowania: do 30 lat. W przykładach poglądowych prezentowane są okresy 20, 25, 30 lat. Dłuższy okres kredytowania powoduje wyższe całkowite koszty kredytu.',
      'RRSO: 7,57% (z informacji na stronie banku).',
      'Ubezpieczenie nieruchomości: wymagane, koszt 0,1% od minimalnej kwoty gwarancji (maksymalnie 1 tys. zł).',
      'Ubezpieczenie na życie "Spokojna Hipoteka": nie jest wymagane, ale daje 0% prowizji za udzielenie kredytu (warunek: utrzymywanie przez min. 5 lat).',
      'Możliwość wyboru między ratami równymi a malejącymi.',
      'Oprocentowanie zmienne może zmieniać się co 3 lub 6 miesięcy w zależności od wskaźnika WIBOR 3M lub WIBOR 6M.',
      'Kwota kredytu: od 100 000 PLN do 2 700 000 PLN (z kalkulatora na stronie banku).',
      'Wartość nieruchomości: od 112 000 PLN do 3 000 000 PLN (z kalkulatora na stronie banku).',
      'Okres spłaty: od 5 lat do 30 lat (z kalkulatora na stronie banku).',
      'Dodatkowe korzyści z produktów bankowych:',
      '  - Konto osobiste: obniżka marży/oprocentowania o 0.2 p.p. (warunek: stałe wynagrodzenie min. 2 tys. zł przez min. 5 lat)',
      '  - Karta kredytowa: obniżka marży/oprocentowania o 0.1 p.p. (warunek: transakcje min. 500 zł miesięcznie przez min. 5 lat)',
      '  - Ubezpieczenie nieruchomości Locum Comfort: obniżka marży/oprocentowania o 0.1 p.p. (warunek: utrzymywanie przez min. 5 lat)',
    ],
    fieldSources: [
      {
        field: 'creditName',
        source: 'https://www.santander.pl/klient-indywidualny/kredyty/kredyt-mieszkaniowy',
        note: 'Nazwa produktu: "Kredyt mieszkaniowy"',
      },
      {
        field: 'fixedInterestRate',
        source:
          'docs/santander/Informacja dla kredytobiorców o ryzykach i kosztach kredytu hipotecznego.pdf',
        note: 'Oprocentowanie okresowo stałe 6,52% w skali roku przez 5 lat',
      },
      {
        field: 'baseInterestRate',
        source:
          'docs/santander/Informacja dla kredytobiorców o ryzykach i kosztach kredytu hipotecznego.pdf',
        note: 'Oprocentowanie zmienne 8,23% (WIBOR 3M 5,23% + marża 3,00%)',
      },
      {
        field: 'wibor',
        source:
          'docs/santander/Informacja dla kredytobiorców o ryzykach i kosztach kredytu hipotecznego.pdf',
        note: 'WIBOR 3M 5,23% z dnia 17.06.2025',
      },
      {
        field: 'margin',
        source:
          'docs/santander/Informacja dla kredytobiorców o ryzykach i kosztach kredytu hipotecznego.pdf',
        note: 'Marża 3,00%',
      },
      {
        field: 'supportedPurposes',
        source: 'https://www.santander.pl/klient-indywidualny/kredyty/kredyt-mieszkaniowy',
        note: 'Zakup, budowa, remont, refinansowanie',
      },
      {
        field: 'rrso',
        source: 'https://www.santander.pl/klient-indywidualny/kredyty/kredyt-mieszkaniowy',
        note: 'RRSO 7,57% (z informacji na stronie banku)',
      },
      {
        field: 'maxLoanPeriod',
        source: 'https://www.santander.pl/klient-indywidualny/kredyty/kredyt-mieszkaniowy',
        note: 'Okres kredytowania do 30 lat (z informacji na stronie banku)',
      },
      {
        field: 'minDownPaymentPercent',
        source: 'https://www.santander.pl/klient-indywidualny/kredyty/kredyt-mieszkaniowy',
        note: 'Wkład własny od min. 10% (z informacji na stronie banku)',
      },
      {
        field: 'commissionRate',
        source: 'https://www.santander.pl/klient-indywidualny/kredyty/kredyt-mieszkaniowy',
        note: '0% z ubezpieczeniem na życie "Spokojna Hipoteka", max. 3% bez ubezpieczenia',
      },
      {
        field: 'propertyInsuranceRequired',
        source:
          'docs/santander/Informacja dla kredytobiorców o ryzykach i kosztach kredytu hipotecznego.pdf',
        note: 'Wymagane ubezpieczenie nieruchomości: 0,1% od minimalnej kwoty gwarancji (maksymalnie 1 tys. zł)',
      },
      {
        field: 'insuranceRate',
        source:
          'docs/santander/Informacja dla kredytobiorców o ryzykach i kosztach kredytu hipotecznego.pdf',
        note: 'Szacunkowo: ubezpieczenie nieruchomości 0,1% od minimalnej kwoty gwarancji (maksymalnie 1 tys. zł) / 400 000 zł ≈ 0,25%',
      },
      {
        field: 'earlyRepaymentFee',
        source:
          'docs/santander/Informacja dla kredytobiorców o ryzykach i kosztach kredytu hipotecznego.pdf',
        note: 'Brak informacji o opłacie za wcześniejszą spłatę w dostępnych dokumentach. Wymagana weryfikacja w umowie kredytowej.',
      },
      {
        field: 'accountFee',
        source: 'https://www.santander.pl/klient-indywidualny/kredyty/kredyt-mieszkaniowy',
        note: 'Opłata za konto osobiste zależy od wybranego pakietu konta. Konto nie jest wymagane, ale daje obniżkę marży/oprocentowania o 0.2 p.p.',
      },
      {
        field: 'processingTime',
        source: 'https://www.santander.pl/klient-indywidualny/kredyty/kredyt-mieszkaniowy',
        note: 'Proces zależy od kompletności dokumentów i oceny zdolności kredytowej.',
      },
      {
        field: 'representativeExampleFixed.rrso',
        source: 'https://www.santander.pl/klient-indywidualny/kredyty/kredyt-mieszkaniowy',
        note: 'RRSO 7,57% (z informacji na stronie banku)',
      },
      {
        field: 'representativeExampleVariable.rrso',
        source: 'https://www.santander.pl/klient-indywidualny/kredyty/kredyt-mieszkaniowy',
        note: 'RRSO 7,57% (z informacji na stronie banku)',
      },
      {
        field: 'minLoanAmount',
        source: 'https://www.santander.pl/klient-indywidualny/kredyty/kredyt-mieszkaniowy',
        note: 'Minimalna kwota kredytu: 100 000 PLN (z kalkulatora na stronie banku)',
      },
      {
        field: 'maxLoanAmount',
        source: 'https://www.santander.pl/klient-indywidualny/kredyty/kredyt-mieszkaniowy',
        note: 'Maksymalna kwota kredytu: 2 700 000 PLN (z kalkulatora na stronie banku)',
      },
      {
        field: 'minLoanPeriod',
        source: 'https://www.santander.pl/klient-indywidualny/kredyty/kredyt-mieszkaniowy',
        note: 'Minimalny okres spłaty: 5 lat (z kalkulatora na stronie banku)',
      },
      {
        field: 'accountRequired',
        source: 'https://www.santander.pl/klient-indywidualny/kredyty/kredyt-mieszkaniowy',
        note: 'Konto osobiste nie jest wymagane, ale daje obniżkę marży/oprocentowania o 0.2 p.p. (warunek: stałe wynagrodzenie min. 2 tys. zł przez min. 5 lat)',
      },
      {
        field: 'lifeInsuranceRequired',
        source: 'https://www.santander.pl/klient-indywidualny/kredyty/kredyt-mieszkaniowy',
        note: 'Ubezpieczenie na życie "Spokojna Hipoteka" nie jest wymagane, ale daje 0% prowizji za udzielenie kredytu',
      },
      {
        field: 'supportedInterestRateTypes',
        source:
          'docs/santander/Informacja dla kredytobiorców o ryzykach i kosztach kredytu hipotecznego.pdf',
        note: 'Dwa warianty: okresowo stałe przez 5 lat lub zmienne w całym okresie',
      },
      {
        field: 'representativeExampleFixed',
        source:
          'docs/santander/Informacja dla kredytobiorców o ryzykach i kosztach kredytu hipotecznego.pdf',
        note: 'Przykład poglądowy z dokumentu (oprocentowanie stałe 6,52%)',
      },
      {
        field: 'representativeExampleVariable',
        source:
          'docs/santander/Informacja dla kredytobiorców o ryzykach i kosztach kredytu hipotecznego.pdf',
        note: 'Przykład poglądowy z dokumentu (oprocentowanie zmienne 8,23%)',
      },
      {
        field: 'commissionRate',
        source:
          'docs/santander/Informacja dla kredytobiorców o ryzykach i kosztach kredytu hipotecznego.pdf',
        note: 'Prowizja za udzielenie kredytu: 0 zł (w przykładzie poglądowym)',
      },
      {
        field: 'minDownPaymentPercent',
        source:
          'docs/santander/Informacja dla kredytobiorców o ryzykach i kosztach kredytu hipotecznego.pdf',
        note: 'Gdy wkład własny jest poniżej 20%, ponosisz wyższe koszty kredytu (np. wyższa marża)',
      },
    ],
  },
  {
    creditId: 'velobank-standard',
    bankId: 'velobank',
    creditName: 'Kredyt hipoteczny VeloDom',
    offerUrl: 'https://polecam.velobank.pl/lp/main/hipo_kredyt_hipoteczny_velodom_form/',
    baseInterestRate: 7.23, // Oprocentowanie zmienne po 5 latach (WIRON 1M Stopa Składana + marża)
    fixedInterestRate: 6.34, // Oprocentowanie okresowo stałe przez pierwsze 5 lat (6,30-6,34% w różnych źródłach)
    wibor: null, // Wskaźnik referencyjny: WIRON 1M Stopa Składana (nie WIBOR), wartość zmienna
    margin: null, // Marża nie jest podana w dostępnych źródłach
    commissionRate: 0,
    insuranceRate: 0.059,
    rrso: 7.11,
    minLoanAmount: 100000, // Z informacji na stronie banku
    maxLoanAmount: 3000000, // Z informacji na stronie banku
    minLoanPeriod: 5, // Okres kredytowania od 5 do 35 lat (z informacji na stronie banku)
    maxLoanPeriod: 35, // Maksymalnie 35 lat, rekomendowany do 25 lat
    minDownPaymentPercent: 10,
    supportedPurposes: ['purchase', 'refinancing', 'construction'],
    supportedInterestRateTypes: ['fixed', 'variable'],
    earlyRepaymentFee: 0,
    accountRequired: true,
    accountFee: 0,
    propertyInsuranceRequired: true,
    lifeInsuranceRequired: false, // Ubezpieczenie VeloBezpieczny nie jest wymagane, ale daje 0% prowizji i może obniżyć oprocentowanie/marzę
    description:
      'Kredyt hipoteczny VeloDom z możliwością wyboru: oprocentowanie okresowo stałe przez 5 lat (gwarancja niezmiennej raty) lub oprocentowanie zmienne oparte na wskaźniku referencyjnym WIRON 1M Stopa Składana. 0% prowizji z kontem z pakietem i ubezpieczeniem VeloBezpieczny. Możliwość uzyskania kredytu do 90% wartości nieruchomości (od 100 000 zł do 3 000 000 zł).',
    processingTime:
      'Wniosek o kredyt można złożyć zdalnie w aplikacji VeloBank. Ekspert wspiera na każdym kroku.',
    specialOffers: [
      '0% prowizji z kontem z pakietem i ubezpieczeniem VeloBezpieczny',
      '0% prowizji za wcześniejszą spłatę lub nadpłatę kredytu',
      'Możliwość przeznaczenia 15% kwoty kredytu na dowolny cel',
      'Uproszczone wymagania dla osób pracujących na B2B',
      'Refinansowanie kredytu hipotecznego bez dodatkowych kosztów (wycena, opłaty sądowe)',
    ],
    advantages: [
      'Kredyt do 90% wartości nieruchomości (wkład własny minimum 10%)',
      'Długi okres kredytowania - do 35 lat (rekomendowany 25 lat)',
      '0% prowizji za udzielenie kredytu (z kontem z pakietem i ubezpieczeniem)',
      '0% prowizji za wcześniejszą spłatę lub nadpłatę',
      'Możliwość przeznaczenia 15% kwoty na dowolny cel',
      'Oprocentowanie okresowo stałe przez 5 lat - gwarancja niezmiennej raty',
      'Wniosek o kredyt można złożyć zdalnie w aplikacji',
      'Wsparcie eksperta na każdym etapie',
      'Uproszczone wymagania dla osób pracujących na B2B',
      'Refinansowanie bez dodatkowych kosztów (wycena, opłaty sądowe)',
    ],
    disadvantages: [
      'Wymagane konto z pakietem i ubezpieczenie VeloBezpieczny dla 0% prowizji',
      'Wymagany wpływ minimum 3000 zł/miesięcznie na rachunek płatniczy',
      'Ubezpieczenie VeloBezpieczny oferowane przez bank (może być warunkiem preferencyjnych warunków)',
      'Zmienne oprocentowanie niesie ryzyko wzrostu raty wraz ze wzrostem WIRON 1M Stopa Składana',
      'Po okresie 5 lat stałej stopy może nastąpić wzrost raty przy przejściu na zmienne oprocentowanie',
      'Koszt operatu szacunkowego nieruchomości nie jest uwzględniony w RRSO (usługa zlecana przez klienta)',
    ],
    ltvAdjustments: null,
    representativeExampleFixed: {
      rrso: 7.11,
      interestRate: 6.34, // Oprocentowanie stałe przez pierwsze 5 lat
      referenceRate:
        'Okresowo stała stopa 6,34% przez 5 lat, następnie zmienna 7,23% (WIRON 1M Stopa Składana)',
      loanPeriodYears: 25,
      loanAmount: 538000,
      downPaymentPercent: 10, // Obliczone: LTV 90% = wkład własny 10%
      totalCost: 591486.7,
      costBreakdown: [
        'Odsetki: 559 853,34 zł',
        'Prowizja: 0 zł',
        'Podatek od czynności cywilnoprawnych (PCC): 19 zł',
        'Ubezpieczenie VeloBezpieczny: 31 614,36 zł (za cały okres kredytowania)',
        'Konto z pakietem: 0 zł (rachunek płatniczy z wpływem min. 3000 zł/miesięcznie)',
        'Bankowość internetowa: 0 zł',
        'Operat szacunkowy nieruchomości: koszt nieznany bankowi (usługa zlecana przez klienta)',
        'Ubezpieczenie nieruchomości: koszt nieznany bankowi (możliwość przedstawienia ubezpieczenia spoza oferty banku)',
      ],
      paymentScheduleNote:
        '300 rat równych: pierwsze 5 lat po 3 565,67 zł, od 6 roku po 3 682,97 zł. Oprocentowanie stałe przez pierwsze 5 lat, następnie zmienne.',
      calculationDate: '2025-09-11',
      notes: [
        'Przykład reprezentatywny dla kredytu hipotecznego VeloDom z oprocentowaniem okresowo stałym przez 5 lat',
        'Całkowita kwota do zapłaty: 1 129 486,70 zł',
        'WIRON 1M Stopa Składana według stanu na dzień 5.09.2025 r.',
        'W RRSO nie uwzględniono kosztu operatu szacunkowego nieruchomości (koszt nieznany bankowi)',
        'Nie uwzględniono kosztu ubezpieczenia nieruchomości (koszt nieznany bankowi, możliwość przedstawienia ubezpieczenia spoza oferty banku)',
        'Jeśli kredyt będzie wypłacony w transzach, dodatkowo poniesiesz koszty inspekcji nieruchomości (280 zł za jedną inspekcję)',
      ],
    },
    representativeExampleVariable: null,
    updated: '2025-09-11',
    notes: [
      'Bank oferuje dwa warianty oprocentowania: okresowo stałe przez 5 lat lub zmienne w całym okresie.',
      'Wskaźnik referencyjny: WIRON 1M Stopa Składana (Warsaw Interest Rate Overnight 1 Month).',
      'Oprocentowanie stałe przez pierwsze 5 lat: 6,34% (z informacji na stronie banku).',
      'Oprocentowanie zmienne po 5 latach: 7,23% (WIRON 1M Stopa Składana + marża, z informacji na stronie banku).',
      'Kwota kredytu: od 100 000 zł do 3 000 000 zł (z informacji na stronie banku).',
      'Okres kredytowania: od 5 lat do 35 lat, rekomendowany do 25 lat (z informacji na stronie banku).',
      '0% prowizji za udzielenie kredytu wymaga: konta z pakietem (rachunek płatniczy z wpływem min. 3000 zł/miesięcznie, dostęp do bankowości internetowej, zgoda na e-korespondencję) oraz ubezpieczenia VeloBezpieczny.',
      'Ubezpieczenie VeloBezpieczny obejmuje: zgon ubezpieczonego, trwałą i całkowitą niezdolność do pracy, poważne zachorowanie, utratę pracy oraz pobyt w szpitalu.',
      'Ubezpieczenie VeloBezpieczny świadczy Towarzystwo Ubezpieczeń na Życie Cardif Polska S.A. VeloBank pełni rolę agenta ubezpieczeniowego.',
      'Możliwość przedstawienia ubezpieczenia nieruchomości spoza oferty banku (z listy publikowanej przez KNF).',
      'Koszt ubezpieczeń oszacowany na podstawie przykładu reprezentatywnego: 31 614,36 zł / 538 000 zł ≈ 5,9% (za cały okres kredytowania).',
      'Refinansowanie kredytu hipotecznego: możliwość przeniesienia kredytu z innego banku bez dodatkowych kosztów (wycena, opłaty sądowe).',
      'Uproszczone wymagania dla osób pracujących na B2B: aktualny kontrakt za ostatnie 6 miesięcy, potwierdzenie wpływów za ostatnie 6 miesięcy, pełna historia rachunku firmowego za ostatni miesiąc.',
      'Jeśli kredyt będzie wypłacony w transzach, dodatkowo poniesiesz koszty inspekcji nieruchomości (280 zł za jedną inspekcję, liczba inspekcji uzależniona od liczby transz).',
      'Wymagane ubezpieczenie nieruchomości stanowiącej zabezpieczenie kredytu hipotecznego.',
      'Opłata za ubezpieczenie portfelowe nieruchomości: 0,0165% miesięcznie od sumy ubezpieczenia nieruchomości.',
      'Opłata za inspekcję nieruchomości: 280 zł (jeśli kredyt będzie wypłacony w transzach).',
    ],
    fieldSources: [
      {
        field: 'creditName',
        source: 'https://polecam.velobank.pl/lp/main/hipo_kredyt_hipoteczny_velodom_form/',
        note: 'Nazwa produktu: "Kredyt hipoteczny VeloDom"',
      },
      {
        field: 'commissionRate',
        source: 'https://polecam.velobank.pl/lp/main/hipo_kredyt_hipoteczny_velodom_form/',
        note: '0% prowizji z kontem z pakietem i ubezpieczeniem VeloBezpieczny',
      },
      {
        field: 'earlyRepaymentFee',
        source: 'https://polecam.velobank.pl/lp/main/hipo_kredyt_hipoteczny_velodom_form/',
        note: '0% prowizji za wcześniejszą spłatę lub nadpłatę kredytu',
      },
      {
        field: 'rrso',
        source: 'https://polecam.velobank.pl/lp/main/hipo_kredyt_hipoteczny_velodom_form/',
        note: 'RRSO 7,11% z przykładu reprezentatywnego',
      },
      {
        field: 'minDownPaymentPercent',
        source: 'https://polecam.velobank.pl/lp/main/hipo_kredyt_hipoteczny_velodom_form/',
        note: 'Możliwość uzyskania kredytu do 90% wartości nieruchomości (wkład własny minimum 10%)',
      },
      {
        field: 'maxLoanPeriod',
        source: 'https://polecam.velobank.pl/lp/main/hipo_kredyt_hipoteczny_velodom_form/',
        note: 'Okres kredytowania do 35 lat (rekomendowany 25 lat)',
      },
      {
        field: 'supportedPurposes',
        source: 'https://polecam.velobank.pl/lp/main/hipo_kredyt_hipoteczny_velodom_form/',
        note: 'Zakup, budowa, rozbudowa, remont nieruchomości, refinansowanie',
      },
      {
        field: 'supportedInterestRateTypes',
        source: 'https://polecam.velobank.pl/lp/main/hipo_kredyt_hipoteczny_velodom_form/',
        note: 'Dwa warianty: okresowo stałe przez 5 lat lub zmienne w całym okresie',
      },
      {
        field: 'accountRequired',
        source: 'https://polecam.velobank.pl/lp/main/hipo_kredyt_hipoteczny_velodom_form/',
        note: 'Wymagane konto z pakietem (rachunek płatniczy z wpływem min. 3000 zł/miesięcznie) dla 0% prowizji',
      },
      {
        field: 'accountFee',
        source: 'https://polecam.velobank.pl/lp/main/hipo_kredyt_hipoteczny_velodom_form/',
        note: 'Opłata za prowadzenie konta: 0 zł (z kontem z pakietem)',
      },
      {
        field: 'insuranceRate',
        source: 'https://polecam.velobank.pl/lp/main/hipo_kredyt_hipoteczny_velodom_form/',
        note: 'Przeliczenie: 31 614,36 zł (VeloBezpieczny za cały okres) / 538 000 zł ≈ 5,9%',
      },
      {
        field: 'propertyInsuranceRequired',
        source:
          'docs/velobank/karta-produktu-portfelowe-ubezpieczenie-nieruchomosci-stanowiacych-zabezpieczenie-kredytow-hipotecznych.pdf',
        note: 'Wymagane ubezpieczenie nieruchomości stanowiącej zabezpieczenie kredytu hipotecznego',
      },
      {
        field: 'wibor',
        source: 'https://www.velobank.pl/kredyty/kredyt-hipoteczny.html',
        note: 'Wskaźnik referencyjny: WIRON 1M Stopa Składana (nie WIBOR)',
      },
      {
        field: 'baseInterestRate',
        source: 'https://www.velobank.pl/kredyty/kredyt-hipoteczny.html',
        note: 'Oprocentowanie zmienne po 5 latach: 7,23% (WIRON 1M Stopa Składana + marża, z informacji na stronie banku)',
      },
      {
        field: 'fixedInterestRate',
        source: 'https://www.velobank.pl/kredyty/kredyt-hipoteczny.html',
        note: 'Oprocentowanie stałe przez pierwsze 5 lat: 6,34% (z informacji na stronie banku)',
      },
      {
        field: 'minLoanPeriod',
        source: 'https://www.velobank.pl/kredyty/kredyt-hipoteczny.html',
        note: 'Minimalny okres kredytowania: 5 lat (z informacji na stronie banku)',
      },
      {
        field: 'minLoanAmount',
        source: 'https://www.velobank.pl/kredyty/kredyt-hipoteczny.html',
        note: 'Minimalna kwota kredytu: 100 000 zł (z informacji na stronie banku)',
      },
      {
        field: 'maxLoanAmount',
        source: 'https://www.velobank.pl/kredyty/kredyt-hipoteczny.html',
        note: 'Maksymalna kwota kredytu: 3 000 000 zł (z informacji na stronie banku)',
      },
      {
        field: 'maxLoanPeriod',
        source: 'https://www.velobank.pl/kredyty/kredyt-hipoteczny.html',
        note: 'Maksymalny okres kredytowania: 35 lat, rekomendowany do 25 lat (z informacji na stronie banku)',
      },
      {
        field: 'lifeInsuranceRequired',
        source: 'https://www.velobank.pl/kredyty/kredyt-hipoteczny.html',
        note: 'Ubezpieczenie VeloBezpieczny nie jest wymagane, ale daje 0% prowizji i może obniżyć oprocentowanie/marzę',
      },
      {
        field: 'representativeExampleFixed',
        source: 'https://polecam.velobank.pl/lp/main/hipo_kredyt_hipoteczny_velodom_form/',
        note: 'Przykład reprezentatywny z dokumentu (RRSO 7,11%)',
      },
      {
        field: 'specialOffers',
        source: 'https://polecam.velobank.pl/lp/main/hipo_kredyt_hipoteczny_velodom_form/',
        note: '0% prowizji, możliwość przeznaczenia 15% kwoty na dowolny cel, refinansowanie bez dodatkowych kosztów',
      },
      {
        field: 'processingTime',
        source: 'https://polecam.velobank.pl/lp/main/hipo_kredyt_hipoteczny_velodom_form/',
        note: 'Wniosek o kredyt można złożyć zdalnie w aplikacji VeloBank',
      },
      {
        field: 'fees',
        source:
          'docs/velobank/tabela-oplat-i-prowizji-dla-kredytow-hipotecznych-dla-kredytow-uruchomionych-od-29032023.pdf',
        note: 'Tabela Opłat i Prowizji VeloBank SA dla kredytów hipotecznych',
      },
    ],
  },
]
