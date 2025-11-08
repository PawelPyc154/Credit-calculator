# Automatyczna analiza danych przez AI

Ten dokument opisuje jak używać AI (Cursor) do automatycznej analizy danych z Google Analytics.

## 🎯 Cel

Zamiast ręcznie analizować dane w Google Analytics, możesz poprosić mnie (AI) o:
- Analizę danych
- Wyciągnięcie wniosków
- Sugestie optymalizacji
- Rekomendacje działań

## 📋 Jak to działa?

1. **Helper functions** - Mam dostęp do funkcji w `src/utils/analytics-analyzer.ts`
2. **tRPC endpoints** - Wywołuję endpointy `api.analytics.*`
3. **Automatyczna analiza** - Generuję insights i rekomendacje

## 💬 Przykłady pytań, które możesz zadać:

### Podstawowa analiza
```
"Przeanalizuj dane z analytics z ostatnich 30 dni"
"Sprawdź jak wygląda konwersja"
"Jakie są główne problemy w danych?"
```

### Konkretne pytania
```
"Które banki mają najwięcej kliknięć?"
"Jaka jest konwersja z obliczeń na kliknięcia?"
"Jaki jest bounce rate i co można poprawić?"
```

### Optymalizacja
```
"Co mogę poprawić na podstawie danych?"
"Które elementy UI są najczęściej używane?"
"Jakie są najczęściej wybierane parametry kredytu?"
```

### Porównania
```
"Porównaj dane z ostatnich 7 vs 30 dni"
"Jak zmieniła się konwersja w czasie?"
```

## 🔧 Co mogę zrobić automatycznie:

### 1. Analiza podstawowych metryk
- Użytkownicy (nowi vs powracający)
- Sesje i page views
- Eventy (obliczenia, kliknięcia)
- Konwersje

### 2. Analiza konwersji
- Które banki generują najwięcej kliknięć
- Rozkład kliknięć po pozycjach
- Wartość konwersji

### 3. Analiza eventów kalkulatora
- Liczba obliczeń
- Zmiany parametrów
- Najczęstsze wybory użytkowników

### 4. Analiza engagement
- Czas na stronie
- Bounce rate
- Pages per session

### 5. Generowanie rekomendacji
- Priorytetyzacja problemów
- Konkretne sugestie optymalizacji
- Oportunities biznesowe

## 📊 Przykład użycia:

```
Ty: "Przeanalizuj dane z analytics i powiedz co poprawić"

Ja:
1. Wywołam fullAnalysis() z ostatnich 30 dni
2. Przeanalizuję wszystkie metryki
3. Wygeneruję insights i rekomendacje
4. Podam konkretne działania do wykonania
```

## 🚀 Jak zacząć:

1. **Skonfiguruj Google Analytics API** (zobacz `ANALYTICS_INTEGRATION.md`)
2. **Zadaj pytanie** - po prostu zapytaj mnie o dane
3. **Działaj** - wykonaj rekomendacje

## 💡 Tips:

- **Regularne analizy**: "Przeanalizuj dane co tydzień"
- **Konkretne pytania**: Zamiast "sprawdź dane", zapytaj "które banki klikają najczęściej"
- **Porównania**: "Jak zmieniła się konwersja vs zeszły miesiąc"
- **Optymalizacja**: "Co mogę poprawić na podstawie danych"

## 🔒 Bezpieczeństwo:

- Wszystkie dane są pobierane przez tRPC (bezpieczne API)
- Nie ma dostępu do surowych danych Google Analytics
- Tylko metryki i agregacje

## 📝 Notatki:

- Analiza działa tylko gdy Google Analytics API jest skonfigurowane
- Dane są pobierane w czasie rzeczywistym
- Mogę analizować dane z różnych okresów (7, 30, 90 dni)

---

**Gotowy?** Po prostu zapytaj: *"Przeanalizuj dane z analytics"* 🚀

