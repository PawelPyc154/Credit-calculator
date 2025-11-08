/**
 * System do pobierania danych z banków
 *
 * Wspiera różne źródła danych:
 * - API banków (jeśli dostępne)
 * - Scraping stron banków
 * - Ręczna aktualizacja przez admina
 */

import type { BankOffer } from 'types/bank'

export type BankDataSource = 'api' | 'scraping' | 'manual'

export interface BankDataFetcher {
  bankId: string
  source: BankDataSource
  fetch(): Promise<Partial<BankOffer> | null>
}

/**
 * Konfiguracja źródeł danych dla każdego banku
 *
 * Typy źródeł:
 * - 'manual' - dane aktualizowane ręcznie (domyślnie, bezpieczne)
 * - 'scraping' - automatyczne pobieranie danych ze stron banków (wymaga testowania)
 * - 'api' - pobieranie z oficjalnego API banku (NIE DOSTĘPNE dla ofert kredytów)
 *
 * UWAGA:
 * - Banki NIE udostępniają publicznych API z ofertami kredytów hipotecznych
 * - API które istnieją (PSD2/PolishAPI) są do innych celów (płatności, rachunki)
 * - Przed zmianą na 'scraping', przetestuj czy dane są poprawnie pobierane!
 */
export const bankDataSources: Record<string, BankDataSource> = {
  // Domyślnie wszystkie banki mają 'manual' - bezpieczne ustawienie
  // Zmień na 'scraping' gdy przetestujesz i upewnisz się, że scraping działa poprawnie
  alior: 'manual', // Można zmienić na 'scraping' jeśli bank ma tabelę ofert
  millennium: 'manual',
  pekao: 'manual',
  'citi-handlowy': 'manual',
  'credit-agricole': 'manual',
  ing: 'manual',
  mbank: 'manual',
  'pko-bp': 'manual',
  santander: 'manual',
  velobank: 'manual',
  'velobank-professionals': 'manual',
  'velobank-refinancing': 'manual',
}

/**
 * URL-e stron z ofertami kredytów hipotecznych dla każdego banku
 * (do scrapingu)
 */
export const bankUrls: Record<string, string> = {
  alior: 'https://www.aliorbank.pl/kredyty/kredyt-hipoteczny',
  millennium: 'https://www.bankmillennium.pl/kredyty/kredyt-hipoteczny',
  pekao: 'https://www.pekao.com.pl/klienci-indywidualni/kredyty/kredyt-hipoteczny',
  'citi-handlowy': 'https://www.citibank.pl/pl/kredyty/kredyt-hipoteczny',
  'credit-agricole': 'https://www.credit-agricole.pl/kredyty/kredyt-hipoteczny',
  ing: 'https://www.ing.pl/kredyty/kredyt-hipoteczny',
  mbank: 'https://www.mbank.pl/kredyty/kredyt-hipoteczny',
  'pko-bp': 'https://www.pkobp.pl/kredyty/kredyt-hipoteczny',
  santander: 'https://www.santander.pl/kredyty/kredyt-hipoteczny',
  velobank: 'https://www.velobank.pl/kredyty/kredyt-hipoteczny',
}

/**
 * URL-e do tabel ofert (jeśli dostępne)
 * Niektóre banki publikują tabele z ofertami w formacie HTML, PDF lub Excel
 */
export const bankTableUrls: Record<string, string[]> = {
  alior: [
    'https://www.aliorbank.pl/kredyty/kredyt-hipoteczny/tabela-ofert',
    'https://www.aliorbank.pl/dokumenty/tabela-ofert-kredyt-hipoteczny.pdf',
  ],
  millennium: ['https://www.bankmillennium.pl/kredyty/kredyt-hipoteczny/tabela-ofert'],
  pekao: ['https://www.pekao.com.pl/klienci-indywidualni/kredyty/kredyt-hipoteczny/tabela-ofert'],
  'pko-bp': ['https://www.pkobp.pl/kredyty/kredyt-hipoteczny/tabela-ofert'],
  // Dodaj więcej URL-i gdy znajdziesz tabele ofert
}

/**
 * Pobiera aktualną wartość WIBOR
 * WIBOR jest publikowany przez GPW Benchmark i zmienia się codziennie
 *
 * Źródła:
 * - NBP (Narodowy Bank Polski) - stopy referencyjne
 * - GPW Benchmark - oficjalne WIBOR
 * - Alternatywnie: scraping ze strony GPW Benchmark
 */
export async function fetchWIBOR(
  period: '1M' | '3M' | '6M' | '12M' = '3M',
): Promise<number | null> {
  try {
    // Próba 1: Pobierz z NBP API (stopy referencyjne)
    // NBP publikuje stopy referencyjne, które są blisko WIBOR
    try {
      const nbpResponse = await fetch(
        'https://api.nbp.pl/api/exchangerates/rates/c/usd/last/?format=json',
        {
          headers: {
            Accept: 'application/json',
          },
        },
      )

      if (nbpResponse.ok) {
        // NBP nie ma bezpośrednio WIBOR, ale możemy użyć stopy referencyjnej
        // Dla WIBOR 3M typowa wartość to około 5.85% (stan na 2025)
        // W rzeczywistości WIBOR trzeba pobrać z GPW Benchmark
        // Parametr period może być użyty w przyszłości do wyboru okresu WIBOR
        void period // Mark as used for now
      }
    } catch (error) {
      console.warn('Nie udało się pobrać danych z NBP:', error)
    }

    // Próba 2: Scraping ze strony GPW Benchmark
    // GPW Benchmark publikuje WIBOR na: https://www.gpwbenchmark.pl/
    try {
      const gpwResponse = await fetch('https://www.gpwbenchmark.pl/', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      })

      if (gpwResponse.ok) {
        const html = await gpwResponse.text()

        // Szukamy WIBOR 3M w HTML (może wymagać dostosowania selektorów)
        // Przykładowy pattern: "WIBOR 3M: 5.85%"
        const wiborMatch = html.match(/WIBOR\s*3M[:\s]*(\d+\.?\d*)/i)
        const wiborValue = wiborMatch?.[1]
        if (wiborValue) {
          const wibor = parseFloat(wiborValue)
          if (!Number.isNaN(wibor) && wibor > 0 && wibor < 20) {
            return wibor
          }
        }
      }
    } catch (error) {
      console.warn('Nie udało się pobrać WIBOR ze strony GPW:', error)
    }

    // Fallback: Zwróć ostatnią znaną wartość lub null
    // W produkcji można przechowywać ostatnią wartość w bazie danych
    console.warn('Nie udało się pobrać aktualnego WIBOR, zwracam null')
    return null
  } catch (error) {
    console.error('Błąd podczas pobierania WIBOR:', error)
    return null
  }
}

/**
 * Pobiera dane z API banku (jeśli dostępne)
 *
 * UWAGA: Banki w Polsce udostępniają API zgodnie z PSD2/PolishAPI, ale są to API do:
 * - PIS (Payment Initiation Service) - inicjowanie płatności
 * - AIS (Account Information Service) - dostęp do informacji o rachunku klienta
 * - CAF (Confirmation of Availability of Funds) - potwierdzanie dostępności środków
 *
 * Te API NIE udostępniają ofert kredytów hipotecznych - są przeznaczone dla zarejestrowanych
 * podmiotów trzecich (TPP) i wymagają zgody klienta na dostęp do jego danych.
 *
 * Nie ma publicznych API do pobierania ofert kredytów hipotecznych od banków.
 *
 * Źródła:
 * - PolishAPI: https://polishapi.org/
 * - BIK Open API: https://openapi.bik.pl/ (dane statystyczne, nie oferty)
 * - GUS API: https://api.stat.gov.pl/ (dane statystyczne, nie oferty)
 */
export async function fetchFromBankAPI(bankId: string): Promise<Partial<BankOffer> | null> {
  // Niestety banki nie udostępniają publicznych API z ofertami kredytów hipotecznych
  // API które istnieją (PSD2/PolishAPI) są do innych celów (płatności, informacje o rachunku)
  console.log(`Pobieranie danych z API dla banku: ${bankId} - nie jest dostępne`)
  console.warn(
    `Banki nie udostępniają publicznych API z ofertami kredytów. Użyj 'scraping' lub 'manual'.`,
  )
  return null
}

/**
 * Parsuje tabelę HTML z ofertami kredytów
 * Szuka tabel z nagłówkami zawierającymi: oprocentowanie, prowizja, marża, itp.
 *
 * @param $ - Cheerio instance z załadowanym HTML
 * @returns Częściowe dane oferty bankowej znalezione w tabelach
 */
function parseOfferTable($: ReturnType<typeof import('cheerio').load>): Partial<BankOffer> {
  const updates: Partial<BankOffer> = {}

  // Szukaj tabel z ofertami
  const tables = $('table')
  if (tables.length === 0) {
    return updates
  }

  // Przejrzyj wszystkie tabele
  tables.each((_, table) => {
    const $table = $(table)
    const headers: string[] = []
    const rows: Record<string, string>[] = []

    // Znajdź nagłówki
    $table.find('thead tr th, thead tr td, tr:first-child th, tr:first-child td').each((_, el) => {
      const header = $(el).text().trim().toLowerCase()
      if (header) {
        headers.push(header)
      }
    })

    // Jeśli nie znaleziono nagłówków w thead, spróbuj w pierwszym wierszu
    if (headers.length === 0) {
      $table.find('tr:first-child th, tr:first-child td').each((_, el) => {
        const header = $(el).text().trim().toLowerCase()
        if (header) {
          headers.push(header)
        }
      })
    }

    // Znajdź wiersze z danymi
    $table.find('tbody tr, tr:not(:first-child)').each((_, row) => {
      const rowData: Record<string, string> = {}
      $(row)
        .find('td, th')
        .each((index, cell) => {
          const header = headers[index]
          if (header) {
            rowData[header] = $(cell).text().trim()
          }
        })
      if (Object.keys(rowData).length > 0) {
        rows.push(rowData)
      }
    })

    // Przetwórz dane z tabeli
    for (const row of rows) {
      // Szukaj oprocentowania
      for (const [key, value] of Object.entries(row)) {
        const lowerKey = key.toLowerCase()
        const lowerValue = value.toLowerCase()

        // Oprocentowanie
        if (
          (lowerKey.includes('oprocentowanie') ||
            lowerKey.includes('rate') ||
            lowerKey.includes('stopa') ||
            lowerKey.includes('rrso')) &&
          !updates.baseInterestRate
        ) {
          const rateMatch = value.match(/(\d+\.?\d*)\s*%/i)
          const rateValue = rateMatch?.[1]
          if (rateValue) {
            const rate = parseFloat(rateValue)
            if (!Number.isNaN(rate) && rate > 0 && rate < 20) {
              updates.baseInterestRate = rate
            }
          }
        }

        // Prowizja
        if (
          (lowerKey.includes('prowizja') || lowerKey.includes('commission')) &&
          !updates.commissionRate
        ) {
          const commissionMatch = value.match(/(\d+\.?\d*)\s*%/i)
          const commissionValue = commissionMatch?.[1]
          if (commissionValue) {
            const commission = parseFloat(commissionValue)
            if (!Number.isNaN(commission) && commission >= 0 && commission < 10) {
              updates.commissionRate = commission
            }
          }
        }

        // Marża
        if ((lowerKey.includes('marża') || lowerKey.includes('margin')) && !updates.margin) {
          const marginMatch = value.match(/(\d+\.?\d*)\s*%/i)
          const marginValue = marginMatch?.[1]
          if (marginValue) {
            const margin = parseFloat(marginValue)
            if (!Number.isNaN(margin) && margin >= 0 && margin < 10) {
              updates.margin = margin
            }
          }
        }

        // WIBOR
        if (lowerKey.includes('wibor') && !updates.wibor) {
          const wiborMatch = value.match(/(\d+\.?\d*)\s*%/i)
          const wiborValue = wiborMatch?.[1]
          if (wiborValue) {
            const wibor = parseFloat(wiborValue)
            if (!Number.isNaN(wibor) && wibor > 0 && wibor < 20) {
              updates.wibor = wibor
            }
          }
        }
      }
    }
  })

  return updates
}

/**
 * Pobiera dane przez scraping strony banku
 * UWAGA: Struktura stron banków często się zmienia, więc scraping może być niestabilny
 *
 * Strategia:
 * 1. Najpierw próbuje znaleźć tabele ofert (bardziej niezawodne)
 * 2. Jeśli nie znajdzie tabel, próbuje parsować elementy na stronie
 */
export async function fetchFromScraping(bankId: string): Promise<Partial<BankOffer> | null> {
  const { load } = await import('cheerio')
  const updates: Partial<BankOffer> = {}

  // Strategia 1: Próbuj znaleźć tabele ofert
  const tableUrls = bankTableUrls[bankId] || []
  for (const tableUrl of tableUrls) {
    try {
      const response = await fetch(tableUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
      })

      if (response.ok) {
        const html = await response.text()
        const $ = load(html)
        const tableData = parseOfferTable($)

        if (Object.keys(tableData).length > 0) {
          Object.assign(updates, tableData)
          console.log(`Znaleziono dane w tabeli dla banku ${bankId}:`, tableData)
          // Jeśli znaleźliśmy dane w tabeli, zwróć je
          if (Object.keys(updates).length > 0) {
            return updates
          }
        }
      }
    } catch (error) {
      console.warn(`Nie udało się pobrać tabeli dla banku ${bankId} z ${tableUrl}:`, error)
    }
  }

  // Strategia 2: Parsuj główną stronę z ofertami
  const url = bankUrls[bankId]
  if (!url) {
    console.warn(`Brak URL dla banku: ${bankId}`)
    return Object.keys(updates).length > 0 ? updates : null
  }

  try {
    // Pobierz stronę
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    })

    if (!response.ok) {
      console.warn(`Nie udało się pobrać strony dla banku ${bankId}: ${response.status}`)
      return Object.keys(updates).length > 0 ? updates : null
    }

    const html = await response.text()
    const $ = load(html)

    // Najpierw spróbuj znaleźć tabele na głównej stronie
    const tableData = parseOfferTable($)
    if (Object.keys(tableData).length > 0) {
      Object.assign(updates, tableData)
    }

    // Jeśli nie znaleźliśmy danych w tabelach, próbuj parsować elementy
    if (Object.keys(updates).length === 0) {
      // Próba znalezienia oprocentowania
      const interestRateSelectors = [
        '.interest-rate',
        '.oprocentowanie',
        '[data-interest-rate]',
        '.rate',
        '.percentage',
        '[data-rate]',
        '.oprocentowanie-kredytu',
      ]

      for (const selector of interestRateSelectors) {
        const rateText = $(selector).first().text()
        const rateMatch = rateText.match(/(\d+\.?\d*)\s*%/i)
        const rateValue = rateMatch?.[1]
        if (rateValue) {
          const rate = parseFloat(rateValue)
          if (!Number.isNaN(rate) && rate > 0 && rate < 20) {
            updates.baseInterestRate = rate
            break
          }
        }
      }

      // Próba znalezienia prowizji
      const commissionSelectors = ['.commission', '.prowizja', '[data-commission]']

      for (const selector of commissionSelectors) {
        const commissionText = $(selector).first().text()
        const commissionMatch = commissionText.match(/(\d+\.?\d*)\s*%/i)
        const commissionValue = commissionMatch?.[1]
        if (commissionValue) {
          const commission = parseFloat(commissionValue)
          if (!Number.isNaN(commission) && commission >= 0 && commission < 10) {
            updates.commissionRate = commission
            break
          }
        }
      }
    }

    // Jeśli znaleźliśmy jakieś dane, zwróć je
    if (Object.keys(updates).length > 0) {
      console.log(`Znaleziono dane dla banku ${bankId}:`, updates)
      return updates
    }

    console.warn(`Nie znaleziono danych dla banku ${bankId} na stronie ${url}`)
    return null
  } catch (error) {
    console.error(`Błąd podczas scrapingu banku ${bankId}:`, error)
    return Object.keys(updates).length > 0 ? updates : null
  }
}

/**
 * Główna funkcja do pobierania danych banku
 */
export async function fetchBankData(bankId: string): Promise<Partial<BankOffer> | null> {
  const source = bankDataSources[bankId] || 'manual'

  switch (source) {
    case 'api':
      return fetchFromBankAPI(bankId)
    case 'scraping':
      return fetchFromScraping(bankId)
    default:
      // Dla manual - zwracamy null, dane muszą być wprowadzone ręcznie
      return null
  }
}

/**
 * Aktualizuje tylko zmienne dane (np. WIBOR, oprocentowanie)
 * Zachowuje pozostałe dane bez zmian
 */
export async function updateVariableData(currentBank: BankOffer): Promise<Partial<BankOffer>> {
  const updates: Partial<BankOffer> = {}

  // Aktualizuj WIBOR jeśli jest używany
  if (currentBank.wibor !== undefined) {
    const newWIBOR = await fetchWIBOR()
    if (newWIBOR !== null && newWIBOR !== currentBank.wibor) {
      updates.wibor = newWIBOR
      // Przelicz baseInterestRate jeśli margin jest znany
      if (currentBank.margin !== undefined) {
        updates.baseInterestRate = newWIBOR + currentBank.margin
      }
    }
  }

  return updates
}

/**
 * Aktualizuje wszystkie banki z dostępnych źródeł danych
 * @returns Statystyki aktualizacji
 */
export async function updateAllBanks(
  updateCallback: (bankId: string, updates: Partial<BankOffer>) => Promise<void>,
): Promise<{
  total: number
  updated: number
  failed: number
  errors: Array<{ bankId: string; error: string }>
}> {
  const stats = {
    total: 0,
    updated: 0,
    failed: 0,
    errors: [] as Array<{ bankId: string; error: string }>,
  }

  // Najpierw aktualizuj WIBOR dla wszystkich banków
  const newWIBOR = await fetchWIBOR()

  if (newWIBOR !== null) {
    console.log(`Pobrano nowy WIBOR: ${newWIBOR}%`)
  }

  // Dla każdego banku spróbuj pobrać dane
  for (const [bankId, source] of Object.entries(bankDataSources)) {
    stats.total++

    try {
      let updates: Partial<BankOffer> = {}

      // Jeśli mamy nowy WIBOR, dodaj go do aktualizacji
      if (newWIBOR !== null) {
        updates.wibor = newWIBOR
      }

      // Pobierz dane w zależności od źródła
      if (source === 'scraping') {
        const scrapingData = await fetchFromScraping(bankId)
        if (scrapingData) {
          updates = { ...updates, ...scrapingData }
        }
      } else if (source === 'api') {
        const apiData = await fetchFromBankAPI(bankId)
        if (apiData) {
          updates = { ...updates, ...apiData }
        }
      }

      // Jeśli mamy jakieś aktualizacje, zapisz je
      if (Object.keys(updates).length > 0) {
        await updateCallback(bankId, updates)
        stats.updated++
        console.log(`✅ Zaktualizowano bank ${bankId}`)
      } else {
        console.log(`ℹ️  Brak aktualizacji dla banku ${bankId}`)
      }
    } catch (error) {
      stats.failed++
      const errorMessage = error instanceof Error ? error.message : String(error)
      stats.errors.push({ bankId, error: errorMessage })
      console.error(`❌ Błąd podczas aktualizacji banku ${bankId}:`, error)
    }
  }

  return stats
}
