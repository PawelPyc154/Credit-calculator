# Integracja z Google Analytics API - Instrukcja po polsku

Ten dokument opisuje jak skonfigurować integrację z Google Analytics Data API w **polskiej wersji językowej** Google Cloud Console i Google Analytics.

## 🎯 Co to daje?

- **Dostęp do danych w Cursorze** - AI może analizować wyniki i sugerować optymalizacje
- **Dashboard w aplikacji** - Możesz wyświetlać kluczowe metryki w panelu admina
- **Automatyczne raporty** - Pobieranie danych bez logowania do Google Analytics

## 📋 Wymagania

1. Konto Google Cloud Platform
2. Google Analytics 4 (GA4) Property
3. Service Account z odpowiednimi uprawnieniami

## 🔧 Konfiguracja krok po kroku (POLSKA WERSJA)

### 1. Utwórz projekt w Google Cloud Console

#### Krok 1.1: Zaloguj się do Google Cloud Console
1. Przejdź do [Google Cloud Console](https://console.cloud.google.com/)
2. Zaloguj się kontem Google (to samo, które używasz do Google Analytics)
3. Jeśli to pierwsza wizyta, zaakceptuj warunki korzystania

#### Krok 1.2: Utwórz nowy projekt (lub wybierz istniejący)
1. W **prawym górnym rogu** znajdź **selektor projektów** (dropdown z nazwą aktualnego projektu)
   - Może być napisane "Wybierz projekt" lub nazwa istniejącego projektu
   - Ikona: zwykle folder lub strzałka w dół

2. Kliknij na selektor projektów

3. W otwartym oknie:
   - **Jeśli masz już projekt:** Wybierz go z listy i kliknij **"OTWÓRZ"**
   - **Jeśli chcesz utworzyć nowy:** Kliknij **"NOWY PROJEKT"** w prawym górnym rogu okna

4. **Jeśli tworzysz nowy projekt:**
   - **Nazwa projektu:** Wpisz np. "Kalkulator Kredytów Analytics" lub "Credit Calculator"
   - **Organizacja:** Zostaw domyślne (jeśli masz organizację) lub zostaw puste
   - **Lokalizacja:** Zostaw domyślne
   - Kliknij **"UTWÓRZ"**
   - Poczekaj 10-30 sekund na utworzenie projektu

5. **Po utworzeniu/wybraniu projektu:**
   - Projekt zostanie automatycznie wybrany
   - Nazwa projektu pojawi się w prawym górnym rogu

#### Krok 1.3: Zapisz ID projektu
1. Kliknij ponownie na **selektor projektów** (prawy górny róg)
2. W oknie zobaczysz:
   - **Nazwa projektu** - np. "Kalkulator Kredytów Analytics"
   - **ID projektu** - np. "kalkulator-kredytow-123456"
   - **Numer projektu** - np. "123456789012"

3. **Skopiuj i zapisz ID projektu** - będzie potrzebne później
   - ID projektu wygląda jak: `kalkulator-kredytow-123456`
   - Możesz kliknąć na ikonę kopiowania obok ID projektu

✅ **Gotowe!** Masz wybrany projekt i znasz jego ID projektu.

### 2. Włącz Google Analytics Data API

#### Krok 2.1: Przejdź do Biblioteki interfejsów API
1. W Google Cloud Console (https://console.cloud.google.com/) upewnij się, że masz wybrany **właściwy projekt**
2. W **lewym menu nawigacyjnym** znajdź sekcję **"Interfejsy API i usługi"** (lub "APIs & Services")
3. Kliknij na **"Interfejsy API i usługi"** aby rozwinąć menu
4. Z rozwiniętego menu wybierz **"Biblioteka"** (lub "Library")

   **Alternatywna ścieżka:**
   - Możesz też kliknąć bezpośrednio w **pasku wyszukiwania** u góry strony i wpisać "Biblioteka interfejsów API"
   - Lub przejść bezpośrednio pod adres: `https://console.cloud.google.com/apis/library`

#### Krok 2.2: Wyszukaj Google Analytics Data API
1. W sekcji **"Interfejsy API i usługi" → "Biblioteka"** zobaczysz:
   - **Pasek wyszukiwania** u góry strony
   - **Kategorie interfejsów API** po lewej stronie
   - **Listę popularnych interfejsów API**

2. W **pasku wyszukiwania** wpisz: `Google Analytics Data API`
   - Możesz też wpisać krócej: `Analytics Data API`
   - Lub po polsku: `Interfejs API danych Google Analytics`

3. Z listy wyników wybierz:
   - **"Google Analytics Data API"** (oficjalna nazwa)
   - Opis: "Programmaticzny dostęp do danych raportowych Google Analytics 4"
   - Ikona: zwykle niebieskie logo Google Analytics

#### Krok 2.3: Włącz interfejs API
1. Kliknij na **"Google Analytics Data API"** z listy wyników
2. Zobaczysz stronę szczegółów interfejsu API z:
   - Opisem interfejsu API
   - Informacjami o użyciu
   - Przyciskiem **"WŁĄCZ"** (lub "ENABLE") - duży niebieski przycisk u góry strony

3. Kliknij przycisk **"WŁĄCZ"**

4. Poczekaj chwilę - Google Cloud Console włączy interfejs API (zwykle 10-30 sekund)

5. Po włączeniu zobaczysz:
   - Zielony komunikat potwierdzający
   - Przycisk zmieni się na **"ZARZĄDZAJ"** (lub "MANAGE")
   - Strona szczegółów interfejsu API z metrykami użycia

✅ **Gotowe!** Google Analytics Data API jest teraz włączone dla Twojego projektu.

### 3. Utwórz konto usługi

#### Krok 3.1: Przejdź do Kont usług
1. W Google Cloud Console upewnij się, że masz wybrany **właściwy projekt**
2. W **lewym menu nawigacyjnym** znajdź sekcję **"IAM i administracja"** (lub "IAM & Admin")
3. Kliknij na **"IAM i administracja"** aby rozwinąć menu
4. Z rozwiniętego menu wybierz **"Konta usług"** (lub "Service Accounts")

   **Alternatywna ścieżka:**
   - Bezpośredni link: `https://console.cloud.google.com/iam-admin/serviceaccounts`
   - Lub wyszukaj "Konta usług" w pasku wyszukiwania u góry

#### Krok 3.2: Utwórz nowe konto usługi
1. Na stronie **"Konta usług"** zobaczysz:
   - Listę istniejących kont usług (jeśli są)
   - Duży niebieski przycisk **"+ UTWÓRZ KONTO USŁUGI"** (lub "+ CREATE SERVICE ACCOUNT") u góry

2. Kliknij przycisk **"+ UTWÓRZ KONTO USŁUGI"**

#### Krok 3.3: Wypełnij szczegóły konta usługi
1. **Krok 1: Szczegóły konta usługi**
   - **Nazwa konta usługi:** Wpisz np. `analytics-reader` lub `kalkulator-analytics`
   - **Identyfikator konta usługi:** Zostanie wygenerowane automatycznie na podstawie nazwy (możesz zmienić)
   - **Opis (opcjonalne):** Wpisz np. "Konto usługi do odczytu danych Google Analytics"
   - Kliknij **"UTWÓRZ I KONTYNUUJ"** (lub "CREATE AND CONTINUE")

2. **Krok 2: Nadaj temu kontu usługi dostęp do projektu (opcjonalne)**
   - **Rola:** Kliknij na pole "Wybierz rolę"
   - W wyszukiwarce ról wpisz: `Wyświetlający`
   - **Wybierz: "Wyświetlający"** (lub "Viewer" po angielsku)
   
   **Którą rolę wybrać?**
   - ✅ **"Wyświetlający" (Viewer)** - **WYBIERZ TĘ ROLĘ**
     - Opis: "Wyświetlanie większości zasobów Google Cloud"
     - Tylko odczyt danych (czytanie)
     - Wystarczy do pobierania danych z Google Analytics
     - Najbezpieczniejsza opcja - konto nie może nic zmienić
     - **To jest wszystko czego potrzebujesz!**
   
   - ❌ **"Przeglądający" (Browser)** - NIE wybieraj
     - Opis: "Umożliwia przeglądanie zasobów GCP"
     - To jest stara rola, która nie jest już używana
     - Może powodować problemy
     - **NIE wybieraj tej roli!**
   
   - ❌ **Inne role** (Edytor, Administrator, etc.) - NIE wybieraj
     - Nie są potrzebne - konto tylko czyta dane
     - Zwiększają ryzyko bezpieczeństwa
   
   **Dlaczego "Wyświetlający"?**
   - Twoje konto usługi tylko **czyta** dane z Google Analytics
   - Nie potrzebuje uprawnień do zmiany czegokolwiek
   - "Wyświetlający" = tylko odczyt = bezpieczne i wystarczające
   - To jest nowoczesna rola, która zastąpiła starą "Przeglądający"
   
   **Jak rozpoznać właściwą rolę?**
   - ✅ **"Wyświetlający"** - ma opis: "Wyświetlanie większości zasobów Google Cloud"
   - ❌ **"Przeglądający"** - ma opis: "Umożliwia przeglądanie zasobów GCP"
   
   - Kliknij **"KONTYNUUJ"** (lub "CONTINUE")

3. **Krok 3: Nadaj użytkownikom dostęp do tego konta usługi (opcjonalne)**
   - Możesz pominąć ten krok (zostaw puste)
   - Lub dodaj swój email, jeśli chcesz zarządzać kontem
   - Kliknij **"GOTOWE"** (lub "DONE")

✅ **Gotowe!** Konto usługi zostało utworzone. Zobaczysz je na liście kont usług.

### 4. Pobierz klucz JSON

#### Krok 4.1: Otwórz konto usługi
1. Na stronie **"Konta usług"** znajdź utworzone konto (np. `analytics-reader`)
2. Kliknij na **nazwę konta** lub **email konta** (wygląda jak: `analytics-reader@project-id.iam.gserviceaccount.com`)

#### Krok 4.2: Przejdź do zakładki Klucze
1. Zobaczysz stronę szczegółów konta usługi z kilkoma zakładkami:
   - **SZCZEGÓŁY** (Details)
   - **UPRAWNIENIA** (Permissions)
   - **KLAUCZE** (Keys) ← **Tutaj kliknij**
   - **IAM** (opcjonalnie)

2. Kliknij na zakładkę **"KLAUCZE"** (lub "KEYS")

#### Krok 4.3: Utwórz nowy klucz JSON
1. W zakładce **"KLAUCZE"** zobaczysz:
   - Listę istniejących kluczy (jeśli są)
   - Przycisk **"+ DODAJ KLAUCZ"** (lub "+ ADD KEY") u góry

2. Kliknij **"+ DODAJ KLAUCZ"**

3. Z menu rozwijanego wybierz **"Utwórz nowy klucz"** (lub "Create new key")

4. W otwartym oknie dialogowym:
   - **Typ klucza:** Wybierz **"JSON"** (powinno być domyślnie zaznaczone)
   - **Typ klucza:** NIE wybieraj "P12" - potrzebujesz JSON

5. Kliknij **"UTWÓRZ"** (lub "CREATE")

6. **Plik JSON zostanie automatycznie pobrany** do folderu Downloads (Pobrane)
   - Nazwa pliku: `project-id-xxxxx.json` lub podobna
   - **WAŻNE:** Zapisz ten plik w bezpiecznym miejscu - nie będziesz mógł go pobrać ponownie!

7. Po pobraniu zobaczysz komunikat potwierdzający

✅ **Gotowe!** Masz plik JSON z credentials konta usługi.

### 5. Dodaj konto usługi do Google Analytics

#### Krok 5.1: Otwórz plik JSON z credentials
1. Znajdź pobrany plik JSON (z kroku 4) - zwykle w folderze Downloads (Pobrane)
2. Otwórz plik JSON w edytorze tekstu (Notatnik, VS Code, lub dowolny edytor)
3. Znajdź pole **`"client_email"`** w pliku JSON
4. Skopiuj wartość z `client_email` - wygląda jak:
   ```
   "client_email": "analytics-reader@project-id.iam.gserviceaccount.com"
   ```
5. **Skopiuj cały email** (bez cudzysłowów) - będzie potrzebny w następnym kroku

#### Krok 5.2: Przejdź do Zarządzania dostępem do właściwości
1. Przejdź do [Google Analytics](https://analytics.google.com/)
2. Upewnij się, że masz wybraną **właściwą właściwość** (Property) - "Kalkulator Kredytów"
3. W **lewym menu nawigacyjnym** kliknij na ikonę **koła zębatego (⚙️)** - sekcja **"Administracja"** (lub "Admin")
4. W sekcji **Administracja** znajdź **środkową kolumnę "Właściwość"** (Property)
5. W środkowej kolumnie znajdź sekcję **"Ustawienia usługi"** (Property settings)
6. Kliknij na **"Ustawienia usługi"** aby rozwinąć menu
7. W rozwiniętym menu znajdź opcję **"Zarządzanie dostępem do usługi"** (lub "Property Access Management")
   - To jest druga opcja na liście (zaraz po "Szczegóły usługi")
   - Może być też jako "Zarządzanie użytkownikami i dostępem"

#### Krok 5.3: Dodaj konto usługi jako użytkownika
1. Na stronie **"Zarządzanie dostępem do usługi"** zobaczysz:
   - Listę istniejących użytkowników (jeśli są)
   - Przycisk **"+"** (plus) lub **"Dodaj użytkowników"** u góry

2. Kliknij przycisk **"+"** lub **"Dodaj użytkowników"**

3. W otwartym oknie dialogowym:
   - **Adresy e-mail:** Wklej **email konta usługi** (ten, który skopiowałeś z pliku JSON)
     - Przykład: `analytics-reader@project-id.iam.gserviceaccount.com`
   - **Powiadom nowych użytkowników:** Możesz odznaczyć (konto usługi nie potrzebuje emaili)

4. **Nadaj uprawnienia:**
   - Kliknij na pole **"Wybierz rolę"** (lub "Select a role")
   - Z listy ról wybierz **"Widok"** (lub "Viewer")
     - **Widok** = tylko odczyt danych, zalecane dla bezpieczeństwa
     - NIE wybieraj "Edytor" lub "Administrator" - to nie jest potrzebne

5. Kliknij przycisk **"Dodaj"** (lub "Add")

6. Po dodaniu zobaczysz:
   - Konto usługi na liście użytkowników
   - Email konta usługi z rolą "Widok"
   - Zielony komunikat potwierdzający (jeśli się pojawi)

✅ **Gotowe!** Konto usługi ma teraz dostęp do danych Google Analytics.

### 6. Znajdź ID właściwości

#### Krok 6.1: Przejdź do Administracji w Google Analytics
1. Przejdź do [Google Analytics](https://analytics.google.com/)
2. Upewnij się, że masz wybraną **właściwą właściwość** (Property) - w Twoim przypadku "Kalkulator Kredytów"
3. W **lewym menu nawigacyjnym** znajdź ikonę **koła zębatego (⚙️)** na dole - to jest sekcja **"Administracja"** (lub "Admin")
4. Kliknij na ikonę **koła zębatego**

#### Krok 6.2: Przejdź do Ustawień Właściwości

**Gdzie jesteś teraz?**
- Jesteś w Google Analytics
- Kliknąłeś na ikonę koła zębatego (⚙️) - sekcja "Administracja"
- Widzisz teraz stronę z trzema kolumnami

**Co widzisz na ekranie?**

1. **Trzy kolumny u góry strony:**
   ```
   [Konto]        [Właściwość]        [Widok]
   (Account)      (Property)          (View)
   ```
   - **Lewa kolumna** = "Konto" (Account)
   - **Środkowa kolumna** = "Właściwość" (Property) ← **TUTAJ SZUKAJ**
   - **Prawa kolumna** = "Widok" (View) - możesz zignorować

2. **W środkowej kolumnie "Właściwość"** zobaczysz listę opcji, np.:
   - "Ustawienia usługi" (lub "Property settings") ← **TO JEST TO!**
   - "Zarządzanie dostępem do usługi"
   - "Historia zmian usługi"
   - itd.

3. **Znajdź opcję "Ustawienia usługi"**:
   - To jest pierwsza lub jedna z pierwszych opcji w środkowej kolumnie
   - Może być też jako "Ustawienia właściwości" lub "Property settings"
   - Obok może być strzałka w dół (▼) lub w górę (▲)

4. **Kliknij na "Ustawienia usługi"**:
   - Jeśli obok jest strzałka w dół (▼) - kliknij, aby rozwinąć menu
   - Jeśli obok jest strzałka w górę (▲) - menu jest już rozwinięte, przejdź do kroku 6.3

**Jak to wygląda?**
```
┌─────────────────────────────────────┐
│  Konto  │  Właściwość  │  Widok    │
├─────────┼──────────────┼───────────┤
│         │ Ustawienia   │           │
│         │ usługi    ▼  │           │  ← Kliknij tutaj
│         │ Zarządzanie  │           │
│         │ dostępem     │           │
└─────────┴──────────────┴───────────┘
```

**Jeśli nie widzisz "Ustawienia usługi":**
- Sprawdź czy jesteś w środkowej kolumnie (nie w lewej ani prawej)
- Sprawdź czy masz wybraną właściwą właściwość (Property) - "Kalkulator Kredytów"
- Przewiń w dół, jeśli lista jest długa

#### Krok 6.3: Otwórz Szczegóły usługi

**Gdzie jesteś teraz?**
- Kliknąłeś na "Ustawienia usługi" w środkowej kolumnie
- Menu się rozwinęło i widzisz listę podopcji

**Co widzisz teraz?**

1. **Po kliknięciu "Ustawienia usługi"** zobaczysz rozwinięte menu z opcjami, np.:
   ```
   Ustawienia usługi ▲
   ├─ Usługa ▼          ← Kliknij tutaj
   ├─ Zarządzanie dostępem
   ├─ Historia zmian
   └─ ...
   ```

2. **Znajdź opcję "Usługa"** (lub "Property"):
   - To jest pierwsza opcja w rozwiniętym menu "Ustawienia usługi"
   - Obok może być strzałka w dół (▼) - oznacza, że ma podmenu

3. **Kliknij na "Usługa"** aby rozwinąć podmenu:
   - Po kliknięciu zobaczysz kolejną listę opcji

4. **W rozwiniętym podmenu "Usługa"** znajdziesz:
   - **"Szczegóły usługi"** ← **TO JEST TO!** (pierwsza opcja)
   - "Zarządzanie dostępem do usługi"
   - "Historia zmian usługi"
   - itd.

5. **Kliknij na "Szczegóły usługi"**:
   - To jest pierwsza opcja w podmenu "Usługa"
   - Może być też jako "Szczegóły właściwości" lub "Property details"

**Jak to wygląda?**
```
Ustawienia usługi ▲
└─ Usługa ▼
   ├─ Szczegóły usługi    ← Kliknij tutaj!
   ├─ Zarządzanie dostępem
   └─ Historia zmian
```

**Jeśli nie widzisz "Szczegóły usługi":**
- Upewnij się, że kliknąłeś najpierw na "Ustawienia usługi"
- Potem kliknij na "Usługa" aby rozwinąć podmenu
- "Szczegóły usługi" powinno być pierwszą opcją w podmenu

#### Krok 6.4: Skopiuj ID właściwości
1. Po kliknięciu **"Szczegóły usługi"** zobaczysz stronę z informacjami o właściwości
2. Na górze strony znajdziesz sekcję z podstawowymi informacjami:
   - **Nazwa właściwości** (Property name) - np. "Kalkulator Kredytów"
   - **ID właściwości** - to jest to, czego szukasz! ← **TUTAJ**
   - **Numer konta** (Account number)
   - **Strefa czasowa** (Time zone)

3. **ID właściwości** wygląda jak ciąg cyfr, np.:
   - `123456789`
   - `987654321`
   - Format: 9 cyfr (czasami może być więcej)

4. **Skopiuj ID właściwości**:
   - Możesz kliknąć na ID właściwości i skopiować (Ctrl+C / Cmd+C)
   - Lub zaznaczyć i skopiować ręcznie
   - **Zapisz go** - będzie potrzebny w kroku 7

✅ **Gotowe!** Masz ID właściwości. Przykład: `123456789`

### 7. Konfiguracja w aplikacji

#### Opcja A: Bezpośrednio w zmiennych środowiskowych (Vercel)

##### Krok 1: Przejdź do ustawień projektu w Vercel

1. Zaloguj się do [Vercel](https://vercel.com/)
2. Wybierz swój projekt (credit_calculator)
3. Przejdź do **Settings** (Ustawienia)
4. W lewym menu kliknij **Environment Variables** (Zmienne środowiskowe)

##### Krok 2: Dodaj GA4_PROPERTY_ID

1. Kliknij **"Add New"** (Dodaj nową) lub **"Add"** (Dodaj)
2. W polu **"Name"** (Nazwa) wpisz:
   ```
   GA4_PROPERTY_ID
   ```
3. W polu **"Value"** (Wartość) wpisz:
   ```
   123456789
   ```
   (Zastąp `123456789` swoim rzeczywistym Property ID z Google Analytics)

4. Wybierz środowiska:
   - ✅ **Production** (Produkcja)
   - ✅ **Preview** (Podgląd) - opcjonalnie
   - ✅ **Development** (Rozwój) - opcjonalnie

5. Kliknij **"Save"** (Zapisz)

##### Krok 3: Dodaj GOOGLE_APPLICATION_CREDENTIALS_JSON

1. Kliknij ponownie **"Add New"** (Dodaj nową)
2. W polu **"Name"** (Nazwa) wpisz:
   ```
   GOOGLE_APPLICATION_CREDENTIALS_JSON
   ```

3. W polu **"Value"** (Wartość) wklej **cały JSON**:

   **Jak uzyskać poprawny JSON:**
   
   **Opcja A: Użyj skryptu (ZALECANE)**
   ```bash
   npx tsx scripts/prepare-json-env.ts ~/Downloads/credit-calculator-477611-c5d52c4f7442.json
   ```
   Skopiuj linię zaczynającą się od `GOOGLE_APPLICATION_CREDENTIALS_JSON='...'`
   Usuń `GOOGLE_APPLICATION_CREDENTIALS_JSON='` z początku i `'` z końca
   Wklej tylko zawartość JSON do Vercel
   
   **Opcja B: Ręcznie**
   - Otwórz plik JSON z Google Cloud Console
   - Skopiuj całą zawartość (Ctrl+A, Ctrl+C)
   - Wklej do pola Value w Vercel
   - **WAŻNE:** JSON musi być w jednej linii (bez przełamań)

4. Wybierz środowiska:
   - ✅ **Production** (Produkcja)
   - ✅ **Preview** (Podgląd) - opcjonalnie
   - ✅ **Development** (Rozwój) - opcjonalnie

5. Kliknij **"Save"** (Zapisz)

##### Krok 4: Redeploy projektu

1. **Redeploy projektu** w Vercel:
   - Przejdź do **Deployments**
   - Kliknij **"..."** (trzy kropki) przy ostatnim deployment
   - Wybierz **"Redeploy"**
   - Lub zrób nowy commit i push

2. **Przetestuj** po redeploy:
   - Endpointy analytics powinny działać
   - Sprawdź logi w Vercel jeśli są błędy

#### Opcja B: Plik .env.local (lokalnie)

Utwórz plik `.env.local` w głównym katalogu projektu:

```env
GA4_PROPERTY_ID=123456789
GOOGLE_APPLICATION_CREDENTIALS_JSON={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}
```

⚠️ **WAŻNE**: Nigdy nie commituj pliku `.env.local` do repozytorium!

## 📦 Instalacja zależności

Zależność `@google-analytics/data` jest już zainstalowana w projekcie.

## 🧪 Testowanie konfiguracji

Po skonfigurowaniu zmiennych środowiskowych możesz przetestować czy wszystko działa:

```bash
npx tsx scripts/test-analytics.ts
```

**Jeśli masz problem z formatem JSON**, użyj skryptu pomocniczego:

```bash
npx tsx scripts/prepare-json-env.ts <ścieżka-do-pliku-json>
```

Przykład:
```bash
npx tsx scripts/prepare-json-env.ts ~/Downloads/project-123456.json
```

Skrypt wygeneruje poprawnie sformatowaną linię do .env.

#### Rozwiązywanie problemów z formatem JSON

**Jeśli nadal masz problemy z formatem JSON**, wykonaj następujące kroki:

1. **Otwórz plik JSON z Google Cloud Console**
   - Znajdź pobrany plik JSON (z kroku 4 konfiguracji)
   - Otwórz go w edytorze tekstu (VS Code, Notatnik, etc.)

2. **Skopiuj całą zawartość**
   - Zaznacz **całą zawartość** pliku (Ctrl+A / Cmd+A)
   - Skopiuj (Ctrl+C / Cmd+C)

3. **Przygotuj JSON do .env**

   **Opcja A: Użyj skryptu (ZALECANE)**
   ```bash
   npx tsx scripts/prepare-json-env.ts ~/Downloads/twoj-plik.json
   ```
   Skopiuj wygenerowaną linię do .env

   **Opcja B: Ręcznie z pojedynczymi cudzysłowami**
   ```env
   GOOGLE_APPLICATION_CREDENTIALS_JSON='{"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}'
   ```

   **Opcja C: Minifikuj JSON (usuń wszystkie przełamy linii)**
   - Skopiuj JSON z pliku
   - Użyj narzędzia online do minifikacji: https://jsonformatter.org/json-minify
   - Wklej zminifikowany JSON do .env (bez cudzysłowów)

4. **Sprawdź format w .env**

   Plik `.env` powinien wyglądać tak:
   ```env
   GA4_PROPERTY_ID=123456789
   GOOGLE_APPLICATION_CREDENTIALS_JSON='{"type":"service_account",...}'
   ```

   **WAŻNE:**
   - JSON musi być w **jednej linii** (bez przełamań)
   - Jeśli używasz pojedynczych cudzysłowów `'...'`, JSON wewnątrz może mieć podwójne cudzysłowy
   - Jeśli używasz podwójnych cudzysłowów `"..."`, musisz escape'ować wewnętrzne cudzysłowy: `\"`

5. **Przetestuj format**
   ```bash
   npx tsx scripts/test-analytics.ts
   ```

## 🧪 Testowanie

Po skonfigurowaniu możesz przetestować endpointy:

```typescript
// W komponencie React
const { data } = api.analytics.getOverview.useQuery({ days: 30 })

// W Cursorze - AI może użyć tego do analizy
```

## 📊 Dostępne endpointy

- `analytics.getOverview` - Podstawowe metryki (użytkownicy, sesje, page views)
- `analytics.getCalculatorEvents` - Eventy z kalkulatora
- `analytics.getConversions` - Statystyki konwersji (kliknięcia affiliate)
- `analytics.getEngagement` - Engagement metrics (czas na stronie, bounce rate)

## 🔒 Bezpieczeństwo

- Konto usługi ma tylko uprawnienia **Widok** (tylko odczyt)
- Credentials są przechowywane w zmiennych środowiskowych
- Endpointy są publiczne - rozważ dodanie autoryzacji dla produkcji

## 🚀 Następne kroki

1. ✅ Zainstalowano `@google-analytics/data`
2. ✅ Zaimplementowano połączenie z API w `analytics.ts`
3. ✅ Dodano walidację zmiennych środowiskowych w `env.ts`
4. (Opcjonalnie) Stwórz dashboard admina do wyświetlania danych

## 📚 Dokumentacja

- [Google Analytics Data API](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [Konta usług](https://cloud.google.com/iam/docs/service-accounts)
- [GA4 Dimensions & Metrics](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema)

## ❓ Problemy?

Jeśli masz problemy z konfiguracją:
1. Sprawdź czy wszystkie kroki zostały wykonane poprawnie
2. Upewnij się, że konto usługi ma uprawnienia "Widok" w Google Analytics
3. Sprawdź czy zmienne środowiskowe są poprawnie ustawione
4. Sprawdź logi w konsoli przeglądarki i terminalu

