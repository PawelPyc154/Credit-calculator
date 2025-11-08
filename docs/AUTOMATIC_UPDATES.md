# Automatyczna aktualizacja danych banków

## 🎯 Przegląd

System automatycznej aktualizacji danych banków umożliwia:
- **Automatyczne pobieranie WIBOR** - codzienna aktualizacja stóp procentowych
- **Scraping stron banków** - automatyczne pobieranie ofert ze stron banków
- **API banków** - integracja z oficjalnymi API (jeśli dostępne)
- **Cron jobs** - zaplanowane aktualizacje

## 📋 Funkcjonalności

### 1. Pobieranie WIBOR

WIBOR (Warsaw Interbank Offered Rate) jest automatycznie pobierany z:
- GPW Benchmark (scraping)
- NBP API (stopy referencyjne)

```typescript
import { fetchWIBOR } from 'utils/bank-data-fetcher'

const wibor = await fetchWIBOR('3M') // 1M, 3M, 6M, 12M
```

### 2. Scraping stron banków

Automatyczne pobieranie danych ze stron banków używając cheerio:

```typescript
import { fetchFromScraping } from 'utils/bank-data-fetcher'

const updates = await fetchFromScraping('alior')
// Zwraca: { baseInterestRate?, commissionRate?, ... }
```

**UWAGA:** Scraping może być niestabilny, ponieważ banki często zmieniają strukturę swoich stron.

### 3. API banków

**⚠️ UWAGA: Banki NIE udostępniają publicznych API z ofertami kredytów hipotecznych**

Banki w Polsce udostępniają API zgodnie z PSD2/PolishAPI, ale są to API do:
- **PIS** (Payment Initiation Service) - inicjowanie płatności
- **AIS** (Account Information Service) - dostęp do informacji o rachunku klienta
- **CAF** (Confirmation of Availability of Funds) - potwierdzanie dostępności środków

Te API **NIE zawierają ofert kredytów hipotecznych** - są przeznaczone dla zarejestrowanych podmiotów trzecich (TPP) i wymagają zgody klienta na dostęp do jego danych.

**Dostępne API:**
- PolishAPI: https://polishapi.org/ (płatności, rachunki)
- BIK Open API: https://openapi.bik.pl/ (dane statystyczne, nie oferty)
- GUS API: https://api.stat.gov.pl/ (dane statystyczne, nie oferty)

**Wniosek:** Użyj `'scraping'` lub `'manual'` zamiast `'api'` dla ofert kredytów.

## 🚀 Użycie

### Ręczna aktualizacja

#### Przez tRPC:

```typescript
// Aktualizuj WIBOR dla wszystkich banków
const result = await api.bank.updateWIBOR.mutate()

// Aktualizuj dane konkretnego banku
const result = await api.bank.updateFromSource.mutate('alior')
```

#### Przez skrypt:

```bash
# Aktualizuj wszystkie banki
yarn banks:update
```

### Automatyczna aktualizacja (Cron Job)

#### Opcja 1: API Endpoint (Vercel Cron, GitHub Actions, itp.)

```bash
# Wywołaj endpoint
curl https://your-domain.com/api/cron/update-banks
```

**Konfiguracja Vercel Cron:**

Dodaj do `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/update-banks",
      "schedule": "0 6 * * *"
    }
  ]
}
```

#### Opcja 2: Node.js Cron (lokalnie lub na serwerze)

```bash
# Uruchom cron job (codziennie o 6:00)
yarn cron:start
```

#### Opcja 3: Systemowy Cron (Linux/Mac)

Dodaj do crontab (`crontab -e`):

```bash
# Codziennie o 6:00
0 6 * * * cd /path/to/project && yarn banks:update
```

#### Opcja 4: GitHub Actions

Utwórz `.github/workflows/update-banks.yml`:

```yaml
name: Update Banks Data

on:
  schedule:
    - cron: '0 6 * * *' # Codziennie o 6:00 UTC
  workflow_dispatch: # Ręczne uruchomienie

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: yarn install
      - run: yarn banks:update
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

## 🔧 Konfiguracja

### Zmiana źródeł danych

W `src/utils/bank-data-fetcher.ts`:

```typescript
export const bankDataSources: Record<string, BankDataSource> = {
  alior: 'scraping', // Zmień z 'manual' na 'scraping'
  mbank: 'api',      // Lub 'api' jeśli bank ma API
  // ...
}
```

### Dostosowanie scrapingu

Każdy bank ma inną strukturę HTML. Dostosuj selektory w `fetchFromScraping`:

```typescript
// Dodaj specyficzne selektory dla banku
const bankSpecificSelectors = {
  alior: ['.alior-rate', '.interest-value'],
  mbank: ['.mbank-rate', '[data-rate]'],
  // ...
}
```

## 📊 Monitoring

### Logi

Wszystkie aktualizacje są logowane:

```
🔄 Rozpoczynam aktualizację danych banków...
Pobrano nowy WIBOR: 5.85%
✅ Zaktualizowano bank alior
✅ Zaktualizowano bank mbank
📊 Łącznie: 12
✅ Zaktualizowano: 8
❌ Błędy: 0
```

### Statystyki

Endpoint `/api/cron/update-banks` zwraca statystyki:

```json
{
  "success": true,
  "stats": {
    "total": 12,
    "updated": 8,
    "failed": 0,
    "errors": []
  }
}
```

## 🔐 Bezpieczeństwo

### Zabezpieczenie API endpointu

W produkcji dodaj autoryzację w `src/app/api/cron/update-banks/route.ts`:

```typescript
const authHeader = request.headers.get('authorization')
const cronSecret = process.env.CRON_SECRET

if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

Następnie w Vercel Cron lub GitHub Actions dodaj header:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" \
  https://your-domain.com/api/cron/update-banks
```

## ⚠️ Ograniczenia i uwagi

1. **Scraping jest niestabilny** - banki mogą zmieniać strukturę stron
2. **Rate limiting** - nie nadużywaj scrapingu, dodaj opóźnienia między requestami
3. **WIBOR może być niedostępny** - funkcja zwraca `null` jeśli nie uda się pobrać
4. **Wymaga testowania** - każdy bank wymaga dostosowania selektorów

## 🐛 Rozwiązywanie problemów

### WIBOR nie jest pobierany

- Sprawdź czy strona GPW Benchmark jest dostępna
- Sprawdź logi błędów
- Możesz ręcznie ustawić WIBOR przez tRPC

### Scraping nie działa

- Sprawdź czy URL banku jest poprawny
- Sprawdź czy selektory CSS są aktualne
- Sprawdź logi błędów
- Możesz przełączyć bank na 'manual' w konfiguracji

### Cron job nie działa

- Sprawdź czy baza danych jest dostępna
- Sprawdź logi aplikacji
- Sprawdź czy zmienne środowiskowe są ustawione
- Przetestuj ręcznie: `yarn banks:update`

## 📈 Przyszłe rozszerzenia

1. **Historia zmian** - śledzenie zmian w ofertach w czasie
2. **Alerty** - powiadomienia o znaczących zmianach
3. **Webhooki** - powiadomienia zewnętrznych systemów
4. **Cache** - przechowywanie ostatnich wartości WIBOR
5. **Retry logic** - automatyczne ponawianie przy błędach
6. **Rate limiting** - kontrola częstotliwości requestów

