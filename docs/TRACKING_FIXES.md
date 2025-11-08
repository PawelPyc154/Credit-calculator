# Naprawy trackingu Google Analytics

## 🔍 Znalezione problemy

### 1. Niespójność ID Google Analytics
- **Problem**: W `layout.tsx` było hardcoded ID `G-ZZ0BQ4CWZE`, a w `analytics.ts` używano `GA_TRACKING_ID` z env
- **Naprawa**: Ujednolicono - teraz wszędzie używane jest `NEXT_PUBLIC_GA_TRACKING_ID` z env

### 2. Błędne zapytania do GA4 API
- **Problem**: Używane były `customEvent:purpose`, `customEvent:bank_name` itp., które nie istnieją w GA4
- **Naprawa**: 
  - Zmieniono na `eventParameter:purpose`, `eventParameter:bank_name` itp.
  - Dodano try-catch, żeby nie przerywać całego zapytania jeśli wymiar nie istnieje
  - Dodano fallback do podstawowych metryk

### 3. Brak error handling
- **Problem**: Błędy w zapytaniach przerywały całą analizę
- **Naprawa**: Dodano try-catch dla każdego zapytania do custom dimensions

## ✅ Co zostało naprawione

1. ✅ Ujednolicono ID Google Analytics - teraz używa env variable
2. ✅ Naprawiono zapytania do GA4 API - użyto poprawnych nazw wymiarów
3. ✅ Dodano lepsze error handling - zapytania nie przerywają całej analizy
4. ✅ Dodano fallback - jeśli wymiary nie istnieją, używane są podstawowe metryki

## 📋 Co sprawdzić dalej

### 1. Sprawdź zmienne środowiskowe
Upewnij się, że w `.env` (lub Vercel) masz:
```env
NEXT_PUBLIC_GA_TRACKING_ID=G-ZZ0BQ4CWZE
GA4_PROPERTY_ID=123456789
GOOGLE_APPLICATION_CREDENTIALS_JSON={...}
```

### 2. Sprawdź czy eventy są wysyłane w produkcji
- Otwórz konsolę przeglądarki w produkcji
- Sprawdź Network tab → filtruj "gtag" lub "collect"
- Wypełnij formularz i sprawdź czy eventy są wysyłane

### 3. Sprawdź w Google Analytics Real-Time
- Przejdź do Google Analytics → Reports → Real-time
- Wypełnij formularz na stronie
- Sprawdź czy eventy `calculate_loan` pojawiają się w czasie rzeczywistym

### 4. Sprawdź custom dimensions w GA4
Jeśli chcesz używać wymiarów jak `purpose`, `bank_name` itp., musisz je najpierw zdefiniować w GA4:
1. Przejdź do Admin → Custom Definitions → Custom Dimensions
2. Utwórz nowe wymiary dla:
   - `purpose` (Event parameter)
   - `interest_rate_type` (Event parameter)
   - `bank_name` (Event parameter)
   - `position` (Event parameter)

## 🧪 Testowanie

Po wdrożeniu zmian, przetestuj:

```bash
# Test pełnej analizy
npx tsx scripts/test-full-analysis.ts

# Sprawdź czy są błędy
yarn build
```

## 📊 Dlaczego było 0 obliczeń?

Prawdopodobne przyczyny:
1. **Eventy działają tylko w produkcji** - w development nie są wysyłane (to jest OK)
2. **Opóźnienie w raportowaniu GA** - dane mogą pojawić się z opóźnieniem 24-48h
3. **Użytkownicy nie wypełniają formularza** - może być problem z UX
4. **Brak danych w GA4** - jeśli projekt jest nowy, może nie być jeszcze danych

## 💡 Rekomendacje

1. **Poczekaj 2-4 tygodnie** - zbierz więcej danych przed wprowadzaniem dużych zmian
2. **Sprawdź Real-Time w GA** - to pokaże czy eventy są wysyłane w czasie rzeczywistym
3. **Monitoruj podstawowe metryki** - użytkownicy, sesje, page views
4. **Nie rób drastycznych zmian** - projekt jest online dopiero od paru dni





