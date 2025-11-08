# Integracja z Google Analytics API

Ten dokument opisuje jak skonfigurować integrację z Google Analytics Data API, aby pobierać dane analityczne bezpośrednio w aplikacji i w Cursorze.

> 🇵🇱 **Masz polską wersję językową Google Cloud Console?**  
> Zobacz [instrukcję po polsku](./ANALYTICS_INTEGRATION_PL.md) z polskimi nazwami menu i opcji.

## 🎯 Co to daje?

- **Dostęp do danych w Cursorze** - Mogę analizować wyniki i sugerować optymalizacje
- **Dashboard w aplikacji** - Możesz wyświetlać kluczowe metryki w panelu admina
- **Automatyczne raporty** - Pobieranie danych bez logowania do Google Analytics

## 📋 Wymagania

1. Konto Google Cloud Platform
2. Google Analytics 4 (GA4) Property
3. Service Account z odpowiednimi uprawnieniami

## 🔧 Konfiguracja krok po kroku

### 1. Utwórz projekt w Google Cloud Console

#### Krok 1.1: Zaloguj się do Google Cloud Console
1. Przejdź do [Google Cloud Console](https://console.cloud.google.com/)
2. Zaloguj się kontem Google (to samo, które używasz do Google Analytics)
3. Jeśli to pierwsza wizyta, zaakceptuj warunki korzystania

#### Krok 1.2: Utwórz nowy projekt (lub wybierz istniejący)
1. W prawym górnym rogu znajdź **selektor projektów** (dropdown z nazwą aktualnego projektu)
   - Może być napisane "Select a project" lub nazwa istniejącego projektu
   - Ikona: zwykle folder lub strzałka w dół

2. Kliknij na selektor projektów

3. W otwartym oknie:
   - **Jeśli masz już projekt:** Wybierz go z listy i kliknij **"OPEN"** (OTWÓRZ)
   - **Jeśli chcesz utworzyć nowy:** Kliknij **"NEW PROJECT"** (NOWY PROJEKT) w prawym górnym rogu okna

4. **Jeśli tworzysz nowy projekt:**
   - **Project name:** Wpisz np. "Kalkulator Kredytów Analytics" lub "Credit Calculator"
   - **Organization:** Zostaw domyślne (jeśli masz organizację) lub zostaw puste
   - **Location:** Zostaw domyślne
   - Kliknij **"CREATE"** (UTWÓRZ)
   - Poczekaj 10-30 sekund na utworzenie projektu

5. **Po utworzeniu/wybraniu projektu:**
   - Projekt zostanie automatycznie wybrany
   - Nazwa projektu pojawi się w prawym górnym rogu

#### Krok 1.3: Zapisz Project ID
1. Kliknij ponownie na **selektor projektów** (prawy górny róg)
2. W oknie zobaczysz:
   - **Project name** (nazwa projektu) - np. "Kalkulator Kredytów Analytics"
   - **Project ID** (ID projektu) - np. "kalkulator-kredytow-123456"
   - **Project number** (numer projektu) - np. "123456789012"

3. **Skopiuj i zapisz Project ID** - będzie potrzebne później
   - Project ID wygląda jak: `kalkulator-kredytow-123456`
   - Możesz kliknąć na ikonę kopiowania obok Project ID

✅ **Gotowe!** Masz wybrany projekt i znasz jego Project ID.

### 2. Włącz Google Analytics Data API

#### Krok 2.1: Przejdź do APIs & Services
1. W Google Cloud Console (https://console.cloud.google.com/) upewnij się, że masz wybrany **właściwy projekt** (ten sam, który utworzyłeś w kroku 1)
2. W lewym menu nawigacyjnym znajdź sekcję **"APIs & Services"** (może być też jako "Interfejsy API i usługi")
3. Kliknij na **"APIs & Services"** aby rozwinąć menu
4. Z rozwiniętego menu wybierz **"Library"** (lub "Biblioteka" po polsku)

   **Alternatywna ścieżka:**
   - Możesz też kliknąć bezpośrednio w pasku wyszukiwania u góry strony i wpisać "API Library"
   - Lub przejść bezpośrednio pod adres: `https://console.cloud.google.com/apis/library`

#### Krok 2.2: Wyszukaj Google Analytics Data API
1. W sekcji **"APIs & Services" → "Library"** zobaczysz:
   - Pasek wyszukiwania u góry strony
   - Kategorie API po lewej stronie
   - Listę popularnych API

2. W **pasku wyszukiwania** wpisz: `Google Analytics Data API`
   - Możesz też wpisać krócej: `Analytics Data API`
   - Lub po polsku: `Interfejs API danych Google Analytics`

3. Z listy wyników wybierz:
   - **"Google Analytics Data API"** (oficjalna nazwa)
   - Opis: "Programmatically access Google Analytics 4 reporting data"
   - Ikona: zwykle niebieskie logo Google Analytics

#### Krok 2.3: Włącz API
1. Kliknij na **"Google Analytics Data API"** z listy wyników
2. Zobaczysz stronę szczegółów API z:
   - Opisem API
   - Informacjami o użyciu
   - Przyciskiem **"ENABLE"** (lub "WŁĄCZ" po polsku) - duży niebieski przycisk u góry strony

3. Kliknij przycisk **"ENABLE"** (WŁĄCZ)

4. Poczekaj chwilę - Google Cloud Console włączy API (zwykle 10-30 sekund)

5. Po włączeniu zobaczysz:
   - Zielony komunikat potwierdzający
   - Przycisk zmieni się na **"MANAGE"** (ZARZĄDZAJ)
   - Strona szczegółów API z metrykami użycia

✅ **Gotowe!** Google Analytics Data API jest teraz włączone dla Twojego projektu.

### 3. Utwórz Service Account

#### Krok 3.1: Przejdź do Service Accounts
1. W Google Cloud Console upewnij się, że masz wybrany **właściwy projekt**
2. W lewym menu nawigacyjnym znajdź sekcję **"IAM & Admin"** (lub "IAM i administracja")
3. Kliknij na **"IAM & Admin"** aby rozwinąć menu
4. Z rozwiniętego menu wybierz **"Service Accounts"** (lub "Konta usług")

   **Alternatywna ścieżka:**
   - Bezpośredni link: `https://console.cloud.google.com/iam-admin/serviceaccounts`
   - Lub wyszukaj "Service Accounts" w pasku wyszukiwania u góry

#### Krok 3.2: Utwórz nowe Service Account
1. Na stronie **"Service Accounts"** zobaczysz:
   - Listę istniejących kont usług (jeśli są)
   - Duży niebieski przycisk **"+ CREATE SERVICE ACCOUNT"** (lub "UTWÓRZ KONTO USŁUGI") u góry

2. Kliknij przycisk **"+ CREATE SERVICE ACCOUNT"**

#### Krok 3.3: Wypełnij szczegóły Service Account
1. **Krok 1: Service account details**
   - **Service account name:** Wpisz np. `analytics-reader` lub `kalkulator-analytics`
   - **Service account ID:** Zostanie wygenerowane automatycznie na podstawie nazwy (możesz zmienić)
   - **Description (opcjonalne):** Wpisz np. "Service account do odczytu danych Google Analytics"
   - Kliknij **"CREATE AND CONTINUE"** (lub "UTWÓRZ I KONTYNUUJ")

2. **Krok 2: Grant this service account access to project (opcjonalne)**
   - **Role:** Kliknij na pole "Select a role" (lub "Wybierz rolę")
   - W wyszukiwarce ról wpisz: `Viewer` (lub `Wyświetlający` po polsku)
   - **Wybierz: "Viewer"** (lub "Wyświetlający" po polsku)
   
   **Którą rolę wybrać?**
   - ✅ **"Viewer" / "Wyświetlający"** - **WYBIERZ TĘ ROLĘ**
     - Opis (EN): "View most Google Cloud resources"
     - Opis (PL): "Wyświetlanie większości zasobów Google Cloud"
     - Tylko odczyt danych (czytanie)
     - Wystarczy do pobierania danych z Google Analytics
     - Najbezpieczniejsza opcja - konto nie może nic zmienić
     - **To jest wszystko czego potrzebujesz!**
   
   - ❌ **"Browser" / "Przeglądający"** - NIE wybieraj
     - Opis (PL): "Umożliwia przeglądanie zasobów GCP"
     - To jest stara rola, która nie jest już używana
     - Może powodować problemy
     - **NIE wybieraj tej roli!**
   
   - ❌ **Inne role** (Editor, Admin, etc.) - NIE wybieraj
     - Nie są potrzebne - konto tylko czyta dane
     - Zwiększają ryzyko bezpieczeństwa
   
   **Dlaczego "Viewer" / "Wyświetlający"?**
   - Twoje konto usługi tylko **czyta** dane z Google Analytics
   - Nie potrzebuje uprawnień do zmiany czegokolwiek
   - "Viewer" / "Wyświetlający" = tylko odczyt = bezpieczne i wystarczające
   - To jest nowoczesna rola, która zastąpiła starą "Browser" / "Przeglądający"
   
   **Jak rozpoznać właściwą rolę?**
   - ✅ **"Viewer" / "Wyświetlający"** - opis: "Wyświetlanie większości zasobów Google Cloud"
   - ❌ **"Browser" / "Przeglądający"** - opis: "Umożliwia przeglądanie zasobów GCP"
   
   - Kliknij **"CONTINUE"** (lub "KONTYNUUJ")

3. **Krok 3: Grant users access to this service account (opcjonalne)**
   - Możesz pominąć ten krok (zostaw puste)
   - Lub dodaj swój email, jeśli chcesz zarządzać kontem
   - Kliknij **"DONE"** (lub "GOTOWE")

✅ **Gotowe!** Service Account został utworzony. Zobaczysz go na liście kont usług.

### 4. Pobierz klucz JSON

#### Krok 4.1: Otwórz Service Account
1. Na stronie **"Service Accounts"** znajdź utworzone konto (np. `analytics-reader`)
2. Kliknij na **nazwę konta** lub **email konta** (wygląda jak: `analytics-reader@project-id.iam.gserviceaccount.com`)

#### Krok 4.2: Przejdź do zakładki Keys
1. Zobaczysz stronę szczegółów Service Account z kilkoma zakładkami:
   - **DETAILS** (Szczegóły)
   - **PERMISSIONS** (Uprawnienia)
   - **KEYS** (Klucze) ← **Tutaj kliknij**
   - **IAM** (opcjonalnie)

2. Kliknij na zakładkę **"KEYS"** (lub "KLAUCZE")

#### Krok 4.3: Utwórz nowy klucz JSON
1. W zakładce **"KEYS"** zobaczysz:
   - Listę istniejących kluczy (jeśli są)
   - Przycisk **"+ ADD KEY"** (lub "+ DODAJ KLAUCZ") u góry

2. Kliknij **"+ ADD KEY"**

3. Z menu rozwijanego wybierz **"Create new key"** (lub "Utwórz nowy klucz")

4. W otwartym oknie dialogowym:
   - **Key type:** Wybierz **"JSON"** (powinno być domyślnie zaznaczone)
   - **Key type:** NIE wybieraj "P12" - potrzebujesz JSON

5. Kliknij **"CREATE"** (lub "UTWÓRZ")

6. **Plik JSON zostanie automatycznie pobrany** do folderu Downloads (Pobrane)
   - Nazwa pliku: `project-id-xxxxx.json` lub podobna
   - **WAŻNE:** Zapisz ten plik w bezpiecznym miejscu - nie będziesz mógł go pobrać ponownie!

7. Po pobraniu zobaczysz komunikat potwierdzający

✅ **Gotowe!** Masz plik JSON z credentials Service Account.

### 5. Dodaj Service Account do Google Analytics

#### Krok 5.1: Otwórz plik JSON z credentials
1. Znajdź pobrany plik JSON (z kroku 4) - zwykle w folderze Downloads (Pobrane)
2. Otwórz plik JSON w edytorze tekstu (Notatnik, VS Code, lub dowolny edytor)
3. Znajdź pole **`"client_email"`** w pliku JSON
4. Skopiuj wartość z `client_email` - wygląda jak:
   ```
   "client_email": "analytics-reader@project-id.iam.gserviceaccount.com"
   ```
5. **Skopiuj cały email** (bez cudzysłowów) - będzie potrzebny w następnym kroku

#### Krok 5.2: Przejdź do Property Access Management
1. Przejdź do [Google Analytics](https://analytics.google.com/)
2. Upewnij się, że masz wybraną **właściwą właściwość** (Property) - "Kalkulator Kredytów"
3. W **lewym menu nawigacyjnym** kliknij na ikonę **koła zębatego (⚙️)** - sekcja **"Admin"**
4. W sekcji **Admin** znajdź **środkową kolumnę "Właściwość"** (Property)
5. W środkowej kolumnie znajdź sekcję **"Ustawienia usługi"** (Property settings)
6. Kliknij na **"Ustawienia usługi"** aby rozwinąć menu
7. W rozwiniętym menu znajdź opcję **"Zarządzanie dostępem do usługi"** (lub "Property Access Management")
   - To jest druga opcja na liście (zaraz po "Szczegóły usługi")
   - Może być też jako "Manage users and access" lub "Zarządzanie użytkownikami"

#### Krok 5.3: Dodaj Service Account jako użytkownika
1. Na stronie **"Zarządzanie dostępem do usługi"** zobaczysz:
   - Listę istniejących użytkowników (jeśli są)
   - Przycisk **"+"** (plus) lub **"Add users"** (Dodaj użytkowników) u góry

2. Kliknij przycisk **"+"** lub **"Add users"** (Dodaj użytkowników)

3. W otwartym oknie dialogowym:
   - **Email addresses:** Wklej **email Service Account** (ten, który skopiowałeś z pliku JSON)
     - Przykład: `analytics-reader@project-id.iam.gserviceaccount.com`
   - **Notify new users:** Możesz odznaczyć (Service Account nie potrzebuje emaili)

4. **Nadaj uprawnienia:**
   - Kliknij na pole **"Select a role"** (Wybierz rolę) lub **"Wybierz rolę"**
   - Z listy ról wybierz **"Viewer"** (lub "Widok")
     - **Viewer** = tylko odczyt danych, zalecane dla bezpieczeństwa
     - NIE wybieraj "Editor" lub "Administrator" - to nie jest potrzebne

5. Kliknij przycisk **"Add"** (Dodaj) lub **"Dodaj"**

6. Po dodaniu zobaczysz:
   - Service Account na liście użytkowników
   - Email Service Account z rolą "Viewer"
   - Zielony komunikat potwierdzający (jeśli się pojawi)

✅ **Gotowe!** Service Account ma teraz dostęp do danych Google Analytics.

### 6. Znajdź Property ID

#### Krok 6.1: Przejdź do Admin w Google Analytics
1. Przejdź do [Google Analytics](https://analytics.google.com/)
2. Upewnij się, że masz wybraną **właściwą właściwość** (Property) - w Twoim przypadku "Kalkulator Kredytów"
3. W **lewym menu nawigacyjnym** znajdź ikonę **koła zębatego (⚙️)** na dole - to jest sekcja **"Admin"** (lub "Administracja")
4. Kliknij na ikonę **koła zębatego**

#### Krok 6.2: Przejdź do Ustawień Właściwości
1. W sekcji **Admin** zobaczysz trzy kolumny:
   - **Konto** (Account) - lewa kolumna
   - **Właściwość** (Property) - środkowa kolumna ← **Tutaj jesteś**
   - **Widok** (View) - prawa kolumna (tylko Universal Analytics)

2. W **środkowej kolumnie "Właściwość"** znajdź sekcję **"Ustawienia usługi"** (lub "Property settings")
   - Może być też jako "Ustawienia właściwości"

3. Kliknij na **"Ustawienia usługi"** aby rozwinąć menu
   - Zobaczysz strzałkę w dół (▼) która zmieni się w strzałkę w górę (▲) po rozwinięciu

#### Krok 6.3: Otwórz Szczegóły usługi
1. W rozwiniętym menu **"Ustawienia usługi"** znajdź sekcję **"Usługa"** (lub "Property")
2. Kliknij na **"Usługa"** aby rozwinąć podmenu
3. Z listy opcji wybierz **"Szczegóły usługi"** (lub "Property details")
   - To jest pierwsza opcja na liście
   - Może być też jako "Szczegóły właściwości"

#### Krok 6.4: Skopiuj Property ID
1. Po kliknięciu **"Szczegóły usługi"** zobaczysz stronę z informacjami o właściwości
2. Na górze strony znajdziesz sekcję z podstawowymi informacjami:
   - **Nazwa właściwości** (Property name) - np. "Kalkulator Kredytów"
   - **Property ID** - to jest to, czego szukasz! ← **TUTAJ**
   - **Numer konta** (Account number)
   - **Strefa czasowa** (Time zone)

3. **Property ID** wygląda jak ciąg cyfr, np.:
   - `123456789`
   - `987654321`
   - Format: 9 cyfr (czasami może być więcej)

4. **Skopiuj Property ID**:
   - Możesz kliknąć na Property ID i skopiować (Ctrl+C / Cmd+C)
   - Lub zaznaczyć i skopiować ręcznie
   - **Zapisz go** - będzie potrzebny w kroku 7

✅ **Gotowe!** Masz Property ID. Przykład: `123456789`

### 7. Konfiguracja w aplikacji

#### Opcja A: Bezpośrednio w zmiennych środowiskowych (Vercel)

1. W Vercel przejdź do **Settings** → **Environment Variables**
2. Dodaj następujące zmienne:

```env
# Google Analytics Property ID (GA4)
GA4_PROPERTY_ID=123456789

# Service Account Credentials (cały JSON jako string)
GOOGLE_APPLICATION_CREDENTIALS_JSON={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}
```

#### Opcja B: Plik .env.local (lokalnie)

Utwórz plik `.env.local`:

```env
GA4_PROPERTY_ID=123456789
GOOGLE_APPLICATION_CREDENTIALS_JSON={"type":"service_account",...}
```

⚠️ **WAŻNE**: Nigdy nie commituj pliku `.env.local` do repozytorium!

## 📦 Instalacja zależności

```bash
yarn add @google-analytics/data
```

## 🔌 Implementacja w routerze

Router `analytics.ts` już ma strukturę. Teraz musisz zaimplementować połączenie z API:

```typescript
import { BetaAnalyticsDataClient } from '@google-analytics/data'

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || '{}'),
})

// Przykład użycia w query:
const [response] = await analyticsDataClient.runReport({
  property: `properties/${process.env.GA4_PROPERTY_ID}`,
  dateRanges: [
    {
      startDate: `${days}daysAgo`,
      endDate: 'today',
    },
  ],
  dimensions: [{ name: 'eventName' }],
  metrics: [{ name: 'eventCount' }],
})
```

## 🧪 Testowanie

Po skonfigurowaniu możesz przetestować endpointy:

```typescript
// W komponencie React
const { data } = api.analytics.getOverview.useQuery({ days: 30 })

// W Cursorze - mogę użyć tego do analizy
```

## 📊 Dostępne endpointy

- `analytics.getOverview` - Podstawowe metryki (użytkownicy, sesje, page views)
- `analytics.getCalculatorEvents` - Eventy z kalkulatora
- `analytics.getConversions` - Statystyki konwersji (kliknięcia affiliate)
- `analytics.getEngagement` - Engagement metrics (czas na stronie, bounce rate)

## 🔒 Bezpieczeństwo

- Service Account ma tylko uprawnienia **Viewer** (tylko odczyt)
- Credentials są przechowywane w zmiennych środowiskowych
- Endpointy są publiczne - rozważ dodanie autoryzacji dla produkcji

## 🚀 Następne kroki

1. Zainstaluj `@google-analytics/data`
2. Zaimplementuj połączenie z API w `analytics.ts`
3. Dodaj walidację zmiennych środowiskowych w `env.ts`
4. (Opcjonalnie) Stwórz dashboard admina do wyświetlania danych

## 📚 Dokumentacja

- [Google Analytics Data API](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [Service Accounts](https://cloud.google.com/iam/docs/service-accounts)
- [GA4 Dimensions & Metrics](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema)

