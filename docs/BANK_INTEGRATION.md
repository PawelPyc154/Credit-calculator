# Integracja z bankami - System pobierania danych

## 🎯 Cel

System do zarządzania danymi banków z możliwością automatycznej aktualizacji z różnych źródeł (API, scraping, ręczna aktualizacja).

## 📋 Struktura

### 1. Model danych w bazie (Prisma)

Model `Bank` przechowuje wszystkie dane o ofertach banków:
- Podstawowe parametry kredytu (oprocentowanie, prowizje, limity)
- Wymagania (wkład własny, okres kredytowania)
- Informacje dodatkowe (zalety, wady, specjalne oferty)
- Programy afiliacyjne

### 2. Router tRPC (`bankRouter`)

Dostępne endpointy:
- `bank.getAll` - Pobiera wszystkie banki
- `bank.getById(id)` - Pobiera bank po ID
- `bank.upsert(data)` - Aktualizuje lub tworzy bank
- `bank.syncFromJson` - Synchronizuje dane z JSON do bazy

### 3. System pobierania danych (`bank-data-fetcher.ts`)

Wspiera różne źródła danych:
- **API** - bezpośrednie API banków (jeśli dostępne)
- **Scraping** - pobieranie danych ze stron banków
- **Manual** - ręczna aktualizacja przez admina

## 🚀 Instalacja i konfiguracja

### Krok 1: Utwórz migrację bazy danych

```bash
yarn db:generate
yarn db:migrate
```

### Krok 2: Zsynchronizuj dane z JSON do bazy

```bash
yarn tsx scripts/sync-banks.ts
```

To skopiuje wszystkie dane z `src/data/banks.json` do bazy danych.

### Krok 3: Aplikacja automatycznie używa danych z bazy

Aplikacja używa danych z bazy przez tRPC, z fallbackiem do JSON jeśli baza nie działa.

## 📊 Użycie

### Pobieranie danych w komponencie

```typescript
import { api } from 'trpc/react'

function MyComponent() {
  const { data: banks } = api.bank.getAll.useQuery()
  
  // banks zawiera wszystkie banki z bazy danych
}
```

### Aktualizacja danych banku

```typescript
const utils = api.useUtils()
const updateBank = api.bank.upsert.useMutation({
  onSuccess: () => {
    utils.bank.invalidate() // Odśwież dane
  }
})

// Aktualizuj bank
updateBank.mutate({
  id: 'alior',
  baseInterestRate: 8.1,
  commissionRate: 0,
  // ... inne pola
})
```

### Synchronizacja z JSON

```typescript
const sync = api.bank.syncFromJson.useMutation()

sync.mutate() // Synchronizuje wszystkie banki z JSON
```

## 🔄 Automatyczna aktualizacja danych

### Aktualizacja WIBOR

WIBOR zmienia się codziennie. Możesz zaimplementować automatyczną aktualizację:

```typescript
import { fetchWIBOR, updateVariableData } from 'utils/bank-data-fetcher'

// Pobierz aktualny WIBOR
const wibor = await fetchWIBOR()

// Aktualizuj wszystkie banki
const banks = await db.bank.findMany()
for (const bank of banks) {
  const updates = await updateVariableData(bank)
  if (Object.keys(updates).length > 0) {
    await api.bank.upsert.mutate({ id: bank.id, ...updates })
  }
}
```

### Scraping stron banków

Aby zaimplementować scraping:

1. Zainstaluj bibliotekę do scrapingu:
```bash
yarn add cheerio puppeteer
```

2. Zaimplementuj funkcję `fetchFromScraping` w `bank-data-fetcher.ts`

3. Zmień źródło danych w konfiguracji:
```typescript
export const bankDataSources: Record<string, BankDataSource> = {
  alior: 'scraping', // Zamiast 'manual'
  // ...
}
```

## 📝 Ręczna aktualizacja

Dla większości banków dane muszą być aktualizowane ręcznie:

1. Sprawdź aktualne oferty na stronie banku
2. Użyj endpointu `bank.upsert` do aktualizacji:
```typescript
api.bank.upsert.mutate({
  id: 'alior',
  baseInterestRate: 8.05,
  margin: 2.2,
  commissionRate: 0,
  // ... zaktualizuj wszystkie zmienione pola
})
```

## 🔐 Bezpieczeństwo

- Endpointy `bank.upsert` i `bank.syncFromJson` powinny być chronione (np. przez middleware autoryzacji)
- W produkcji rozważ dodanie autoryzacji dla operacji zapisu

## 🔄 Automatyczna aktualizacja

System automatycznej aktualizacji został zaimplementowany! Zobacz [AUTOMATIC_UPDATES.md](./AUTOMATIC_UPDATES.md) dla szczegółów.

### Szybki start:

```bash
# Ręczna aktualizacja wszystkich banków
yarn banks:update

# Uruchom cron job (codziennie o 6:00)
yarn cron:start

# Aktualizuj tylko WIBOR przez tRPC
api.bank.updateWIBOR.mutate()

# Aktualizuj konkretny bank
api.bank.updateFromSource.mutate('alior')
```

## 📈 Przyszłe rozszerzenia

1. ✅ **Automatyczny scraping** - zaimplementowane
2. ✅ **API banków** - struktura gotowa
3. ✅ **Cron jobs** - zaimplementowane
4. ✅ **Aktualizacja WIBOR** - zaimplementowane
5. **Webhooki** - powiadomienia o zmianach w ofertach
6. **Historia zmian** - śledzenie zmian w ofertach w czasie
7. **Alerty** - powiadomienia o znaczących zmianach w ofertach

## 🐛 Rozwiązywanie problemów

### Baza danych nie działa

Aplikacja automatycznie używa danych z JSON jako fallback.

### Błąd podczas synchronizacji

Sprawdź:
- Czy baza danych jest uruchomiona
- Czy migracja została wykonana
- Czy dane w JSON są poprawne

### Dane nie aktualizują się

Sprawdź:
- Czy endpoint `bank.getAll` zwraca dane z bazy
- Czy cache tRPC nie jest zbyt długi (domyślnie 5 minut)
- Czy dane w bazie są aktualne

