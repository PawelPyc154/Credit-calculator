# Analiza SEO przez AI (Cursor)

## 🎯 Cel

Dostęp do danych Google Analytics i Search Console **tylko dla AI (Cursor)**, bez publicznych endpointów w aplikacji.

## 📋 Jak to działa?

1. **Helper functions** - AI ma dostęp do funkcji w `src/utils/search-console-analyzer.ts`
2. **Wewnętrzne endpointy tRPC** - Funkcje wywołują wewnętrzne endpointy `api.searchConsole.*`
3. **Automatyczna analiza** - AI generuje insights i rekomendacje SEO

## 💬 Przykłady pytań, które możesz zadać w Cursorze:

### Analiza ruchu organicznego
```
"Sprawdź ile ruchu organicznego z Google mam w ostatnich 30 dniach"
"Które strony mają najwięcej ruchu organicznego?"
"Jaki jest udział ruchu organicznego vs płatnego?"
```

### Analiza zapytań wyszukiwania
```
"Jakie zapytania wyszukiwania prowadzą użytkowników na moją stronę?"
"Które frazy kluczowe generują najwięcej ruchu?"
"Jaka jest top 10 zapytań wyszukiwania?"
```

### Analiza źródeł ruchu
```
"Jaki jest podział źródeł ruchu?"
"Które źródła generują najwięcej sesji?"
"Jak wygląda ruch organiczny vs direct vs paid?"
```

### Kompleksowa analiza SEO
```
"Przeanalizuj moje SEO i powiedz co poprawić"
"Sprawdź jak wygląda moja strategia SEO"
"Jakie są główne problemy z SEO?"
```

## 🔧 Dostępne funkcje dla AI:

### `analyzeOrganicTraffic(days)`
Analizuje ruch organiczny z Google:
- Liczba sesji, użytkowników, page views
- Top strony z organicznego ruchu
- Top zapytania (jeśli Search Console połączone)
- Insights i rekomendacje

### `analyzeTrafficSources(days)`
Analizuje źródła ruchu:
- Podział na organic, direct, paid, social
- Procentowy udział każdego źródła
- Top źródła ruchu
- Insights o strategii

### `analyzeSearchQueries(days)`
Analizuje zapytania wyszukiwania:
- Konkretne frazy kluczowe
- Liczba sesji dla każdego zapytania
- Top zapytania
- Insights o optymalizacji

### `fullSEOAnalysis(days)`
Kompleksowa analiza SEO:
- Wszystkie powyższe analizy
- Ogólne rekomendacje
- Priorytetyzacja działań

## 📊 Przykład użycia przez AI:

```
Ty: "Przeanalizuj moje SEO i powiedz co poprawić"

AI:
1. Wywoła fullSEOAnalysis(30)
2. Przeanalizuje ruch organiczny, źródła, zapytania
3. Wygeneruje insights i rekomendacje
4. Poda konkretne działania do wykonania
```

## 🚀 Jak zacząć:

1. **Skonfiguruj Google Analytics API** (zobacz `ANALYTICS_INTEGRATION_PL.md`)
2. **Połącz Search Console z Analytics** (zobacz `SEARCH_CONSOLE_INTEGRATION.md`)
3. **Zadaj pytanie w Cursorze** - po prostu zapytaj o dane SEO

## 💡 Tips:

- **Regularne analizy**: "Przeanalizuj SEO co tydzień"
- **Konkretne pytania**: "Które frazy kluczowe klikają najczęściej?"
- **Porównania**: "Jak zmienił się ruch organiczny vs zeszły miesiąc"
- **Optymalizacja**: "Co mogę poprawić w SEO na podstawie danych?"

## 🔒 Bezpieczeństwo:

- Wszystkie dane są pobierane przez wewnętrzne endpointy tRPC
- Nie ma publicznego dostępu do danych
- Tylko AI (Cursor) ma dostęp przez helper functions
- Credentials są przechowywane w zmiennych środowiskowych

## 📝 Notatki:

- Analiza działa tylko gdy Google Analytics API jest skonfigurowane
- Dane Search Console wymagają połączenia z Analytics
- Dane są pobierane w czasie rzeczywistym
- Mogę analizować dane z różnych okresów (7, 30, 90 dni)

---

**Gotowy?** Po prostu zapytaj w Cursorze: *"Przeanalizuj moje SEO"* 🚀


