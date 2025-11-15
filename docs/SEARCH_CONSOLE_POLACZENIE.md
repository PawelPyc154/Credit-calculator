# 🔗 Jak połączyć Google Search Console z Google Analytics 4

## 📋 Wymagania wstępne

Przed rozpoczęciem upewnij się, że:
- ✅ Masz konto Google Analytics 4 (GA4)
- ✅ Masz konto Google Search Console
- ✅ Ta sama domena jest dodana w obu usługach
- ✅ Masz uprawnienia administratora w obu usługach

## 🚀 Instrukcja krok po kroku

### Krok 1: Zaloguj się do Google Analytics 4

1. Przejdź do [Google Analytics](https://analytics.google.com/)
2. Zaloguj się kontem Google
3. Upewnij się, że masz wybraną **właściwą właściwość** (Property) - "Kalkulator Kredytów"

### Krok 2: Przejdź do sekcji Administracja

1. W **lewym dolnym rogu** znajdź ikonę **koła zębatego (⚙️)** 
2. Kliknij na ikonę - to jest sekcja **"Administracja"** (lub "Admin")

### Krok 3: Znajdź "Połączenia usług"

1. W sekcji **Administracja** zobaczysz **trzy kolumny**:
   - **Konto** (Account) - lewa kolumna
   - **Usługa** (Property) - środkowa kolumna ← **TUTAJ JESTEŚ**
   - **Widok** (View) - prawa kolumna (tylko dla Universal Analytics)

2. W **środkowej kolumnie "Usługa"** przewiń w dół i znajdź sekcję **"Połączenia usług"** (lub "Product Links")
   - Może być też jako "Integracje" lub "Integrations"
   - Ikona: zwykle łańcuch lub połączone kółka

3. Kliknij na **"Połączenia usług"** aby rozwinąć menu

### Krok 4: Otwórz "Połączenia z Search Console"

1. W rozwiniętym menu **"Połączenia usług"** znajdź opcję **"Połączenia z Search Console"**
   - Może być też jako "Search Console Links" lub "Link Search Console"
   - Ikona: zwykle logo Google Search Console lub ikona wyszukiwania

2. Kliknij na **"Połączenia z Search Console"**

### Krok 5: Połącz Search Console z Analytics

1. Zobaczysz stronę **"Połączenia z Search Console"** z:
   - Listą istniejących połączeń (jeśli są)
   - Przyciskiem **"Połącz"** (lub "Link") u góry strony

2. Kliknij przycisk **"Połącz"** (lub "Link")

3. W otwartym oknie dialogowym zobaczysz:
   - **Właściwość Search Console** - dropdown z listą dostępnych właściwości
   - **Strumień danych** - dropdown z listą strumieni danych GA4

4. **Wybierz właściwość Search Console:**
   - Kliknij na dropdown **"Właściwość Search Console"**
   - Wybierz właściwość, która odpowiada Twojej domenie
   - Jeśli nie widzisz właściwości, upewnij się, że dodałeś ją w Search Console

5. **Wybierz strumień danych:**
   - Kliknij na dropdown **"Strumień danych"**
   - Wybierz strumień danych GA4 dla Twojej strony
   - Zwykle będzie tylko jeden strumień, jeśli masz jedną stronę

6. Kliknij przycisk **"Połącz"** (lub "Link") na dole okna dialogowego

### Krok 6: Potwierdzenie połączenia

1. Po kliknięciu **"Połącz"** zobaczysz:
   - Komunikat potwierdzający połączenie
   - Status połączenia: **"Połączone"** (lub "Linked")
   - Informację o synchronizacji danych

2. **Status połączenia:**
   - ✅ **"Połączone"** - połączenie jest aktywne
   - ⏳ **"Synchronizacja w toku"** - dane są synchronizowane (może zająć 24-48h)
   - ⚠️ **"Błąd"** - sprawdź konfigurację

### Krok 7: Czekaj na synchronizację

1. **Synchronizacja danych może zająć 24-48 godzin**
2. Po synchronizacji będziesz mógł zobaczyć:
   - Zapytania wyszukiwania w Google Analytics
   - Ruch organiczny z Google
   - Pozycje w wynikach wyszukiwania (jeśli dostępne)

## ✅ Weryfikacja połączenia

### Sprawdź czy połączenie działa:

1. W Google Analytics przejdź do **Raporty** → **Acquisition** → **Search Console**
2. Jeśli widzisz dane, połączenie działa poprawnie

### Sprawdź przez API:

Uruchom skrypt testowy:
```bash
npx tsx scripts/test-search-console.ts
```

Jeśli widzisz:
- ✅ `Search Console połączone: ✅ TAK`
- ✅ Dane o zapytaniach wyszukiwania
- ✅ Ruch organiczny > 0

To znaczy, że połączenie działa!

## 🔧 Rozwiązywanie problemów

### Problem: Nie widzę opcji "Połączenia z Search Console"

**Rozwiązanie:**
- Upewnij się, że używasz **Google Analytics 4** (nie Universal Analytics)
- Sprawdź czy masz uprawnienia administratora
- Odśwież stronę (Ctrl+F5 / Cmd+Shift+R)

### Problem: Nie widzę właściwości Search Console na liście

**Rozwiązanie:**
1. Przejdź do [Google Search Console](https://search.google.com/search-console)
2. Upewnij się, że dodałeś właściwość (domenę) w Search Console
3. Zweryfikuj własność domeny (jeśli wymagane)
4. Poczekaj kilka minut i spróbuj ponownie

### Problem: Połączenie nie działa po 48 godzinach

**Rozwiązanie:**
1. Sprawdź czy właściwość Search Console jest zweryfikowana
2. Sprawdź czy strumień danych GA4 jest aktywny
3. Rozłącz i połącz ponownie
4. Skontaktuj się z pomocą Google Analytics

### Problem: Nie widzę danych w API

**Rozwiązanie:**
1. Upewnij się, że minęło 24-48h od połączenia
2. Sprawdź czy Search Console ma dane (przejdź do Search Console i sprawdź raporty)
3. Uruchom test: `npx tsx scripts/test-search-console.ts`
4. Sprawdź czy `searchQuery` dimension jest dostępny w Analytics API

## 📊 Co zyskujesz po połączeniu

Po pomyślnym połączeniu będziesz mógł:

1. **Zobaczyć zapytania wyszukiwania** w Google Analytics
2. **Analizować ruch organiczny** z Google
3. **Śledzić pozycje** w wynikach wyszukiwania (jeśli dostępne)
4. **Pobierać dane przez API** - wszystkie dane będą dostępne przez Analytics Data API

## 🎯 Następne kroki

Po połączeniu:

1. ✅ Poczekaj 24-48h na synchronizację
2. ✅ Uruchom test: `npx tsx scripts/test-search-console.ts`
3. ✅ Sprawdź dane w Google Analytics
4. ✅ Użyj skryptu porównawczego: `npx tsx scripts/compare-analytics.ts`

---

**Gotowe!** Po połączeniu będziesz mógł analizować pełne dane SEO! 🚀

