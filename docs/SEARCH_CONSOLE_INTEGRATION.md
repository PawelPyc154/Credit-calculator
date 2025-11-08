# Integracja z danymi Search Console przez Google Analytics

## 🎯 Co to daje?

Po połączeniu Google Search Console z Google Analytics 4, możesz pobrać **pełne dane SEO** (w tym zapytania i pozycje) przez Google Analytics Data API!

## ✅ WYMAGANIE: Połącz Search Console z Analytics

**Zanim zaczniesz**, musisz połączyć Google Search Console z Google Analytics 4:

1. Zaloguj się do [Google Analytics 4](https://analytics.google.com/)
2. Przejdź do **Administracja** (⚙️ w lewym dolnym rogu)
3. W kolumnie **Usługa** znajdź **Połączenia usług**
4. Kliknij **Połączenia z Search Console**
5. Kliknij **Połącz** i wybierz:
   - Właściwość Search Console
   - Strumień danych GA4
6. Poczekaj na synchronizację (może zająć 24-48h)

Po połączeniu dane Search Console będą dostępne przez Analytics Data API!

## ✅ Co działa po połączeniu:

Używając tego samego Service Account co dla Google Analytics, możesz pobrać:

1. **Zapytania wyszukiwania** (searchQuery dimension) ✨
   - Konkretne frazy kluczowe
   - Liczba sesji dla każdego zapytania
   - Page views dla każdego zapytania

2. **Ruch organiczny z Google** (source = google/organic)
   - Liczba sesji
   - Liczba użytkowników
   - Page views
   - Top strony z organicznego ruchu

3. **Źródła ruchu** (wszystkie źródła)
   - Podział na źródła i medium
   - Porównanie organic vs paid vs direct

## 📊 Dostępne endpointy:

### `searchConsole.getOrganicTraffic`
Pobiera dane organiczne z Google:
```typescript
const { data } = api.searchConsole.getOrganicTraffic.useQuery({ days: 30 })
// Zwraca: sessions, users, pageViews, topPages
```

### `searchConsole.getTrafficSources`
Pobiera wszystkie źródła ruchu:
```typescript
const { data } = api.searchConsole.getTrafficSources.useQuery({ days: 30 })
// Zwraca: sources[] z podziałem na source/medium
```

## ⚠️ Ograniczenia:

**Co może być dostępne po połączeniu GSC z GA4:**
- ✅ Zapytania wyszukiwania (searchQuery dimension)
- ✅ Strony docelowe z wyników wyszukiwania
- ⚠️ Pozycje i CTR mogą być dostępne jako dodatkowe dimensions (zależy od konfiguracji)

**Co NIE jest dostępne przez Analytics API:**
- ❌ Problemy z indeksowaniem
- ❌ Pełne dane o pozycjach (jeśli nie są dostępne jako dimensions)
- ❌ Szczegółowe dane o coverage i sitemap

**Jeśli potrzebujesz pełnych danych Search Console:**
- Możesz dodatkowo włączyć Search Console API
- Dodaj Service Account do Search Console
- Zainstaluj `@googleapis/searchconsole`

## 🚀 Jak używać:

### W komponencie React:
```typescript
import { api } from '~/trpc/react'

function SEOStats() {
  const { data } = api.searchConsole.getOrganicTraffic.useQuery({ days: 30 })
  
  if (data?.error) {
    return <div>Błąd: {data.error}</div>
  }
  
  return (
    <div>
      <h2>Ruch organiczny z Google</h2>
      <p>Sesje: {data?.sessions}</p>
      <p>Użytkownicy: {data?.users}</p>
      <p>Page Views: {data?.pageViews}</p>
      
      <h3>Top strony:</h3>
      <ul>
        {data?.topPages.map(page => (
          <li key={page.path}>
            {page.path} - {page.sessions} sesji
          </li>
        ))}
      </ul>
    </div>
  )
}
```

### W Cursorze (AI):
Po prostu zapytaj:
```
"Sprawdź ile ruchu organicznego z Google mam w ostatnich 30 dniach"
"Które strony mają najwięcej ruchu organicznego?"
"Jaki jest podział źródeł ruchu?"
```

## 🔧 Konfiguracja:

**Nie wymaga dodatkowej konfiguracji!** 

Używa tego samego Service Account i credentials co Google Analytics:
- `GA4_PROPERTY_ID`
- `GOOGLE_APPLICATION_CREDENTIALS_JSON`

## 📈 Przykładowe użycie w analizie:

```typescript
// W analytics-analyzer.ts można dodać:
export async function analyzeSEO(days = 30) {
  const caller = await getAnalyticsCaller()
  const organic = await caller.searchConsole.getOrganicTraffic({ days })
  const sources = await caller.searchConsole.getTrafficSources({ days })
  
  // Analiza i insights...
}
```

## 💡 Następne kroki (opcjonalnie):

Jeśli potrzebujesz pełnych danych Search Console (zapytania, pozycje):

1. Włącz Search Console API w Google Cloud Console
2. Dodaj Service Account do Search Console (jako właściciel)
3. Zainstaluj `@googleapis/searchconsole`
4. Utwórz dodatkowe endpointy dla pełnych danych

---

**Gotowe!** Możesz teraz analizować dane SEO przez Google Analytics API! 🚀

