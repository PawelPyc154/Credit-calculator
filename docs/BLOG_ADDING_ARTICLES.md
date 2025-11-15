# Jak dodać nowy artykuł na bloga - przewodnik krok po kroku

## 🚀 Szybki start

1. Utwórz folder i plik: `/src/app/blog/[slug]/page.tsx`
2. Dodaj artykuł do listy w `/src/app/blog/page.tsx`
3. Zaktualizuj `sitemap.ts`
4. Opublikuj!

## 📝 Szczegółowy proces

### Krok 1: Przygotowanie treści

1. Wybierz temat z harmonogramu (`BLOG_EDITORIAL_CALENDAR.md`)
2. Napisz artykuł (min. 1000 słów, optymalnie 1500-2500)
3. Przygotuj meta title i description
4. Wybierz frazy kluczowe

### Krok 2: Utworzenie strony artykułu

1. Utwórz folder: `/src/app/blog/[slug]/`
   - `[slug]` to URL-friendly wersja tytułu (np. `jak-obliczyc-zdolnosc-kredytowa`)

2. Utwórz plik `page.tsx` w tym folderze

3. Użyj szablonu z `BLOG_ARTICLE_TEMPLATE.md` jako podstawy

4. Wypełnij:
   - Metadata (title, description, keywords)
   - Schema.org Article markup
   - Treść artykułu
   - CTA do kalkulatora (minimum 2-3)

### Krok 3: Dodanie do listy artykułów

Edytuj `/src/app/blog/page.tsx`:

```typescript
const blogPosts = [
  {
    slug: 'zagrozenia-kredytowe',
    title: 'Zagrożenia kredytowe',
    description: '...',
    category: 'Ryzyka kredytowe',
    icon: HiOutlineExclamationTriangle,
    readTime: '8 min',
  },
  // DODAJ NOWY ARTYKUŁ TUTAJ
  {
    slug: 'nowy-artykul-slug',
    title: 'Tytuł nowego artykułu',
    description: 'Krótki opis artykułu (150-160 znaków)',
    category: 'Kategoria',
    icon: HiOutlineDocumentText, // Wybierz odpowiednią ikonę
    readTime: 'X min', // Szacowany czas czytania
  },
]
```

**Uwaga:** Artykuły są sortowane według kolejności w tablicy. Najnowsze powinny być na początku.

### Krok 4: Aktualizacja sitemap

Edytuj `/src/app/sitemap.ts`:

```typescript
const routes = [
  // ... istniejące strony
  {
    url: `${baseUrl}/blog/zagrozenia-kredytowe`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  // DODAJ NOWY ARTYKUŁ
  {
    url: `${baseUrl}/blog/nowy-artykul-slug`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
]
```

### Krok 5: Weryfikacja

Przed publikacją sprawdź:

- [ ] Artykuł otwiera się poprawnie (`/blog/[slug]`)
- [ ] Linki działają (szczególnie do kalkulatora)
- [ ] Artykuł pojawia się na `/blog`
- [ ] Meta title i description są poprawne
- [ ] Obrazy mają alt text
- [ ] Mobile-friendly (responsywny)
- [ ] Schema.org jest poprawny (sprawdź w Google Rich Results Test)

### Krok 6: Publikacja

1. Commit zmian:
   ```bash
   git add src/app/blog/[slug]/
   git add src/app/blog/page.tsx
   git add src/app/sitemap.ts
   git commit -m "Dodano artykuł: [Tytuł]"
   ```

2. Push do repozytorium:
   ```bash
   git push
   ```

3. Po wdrożeniu:
   - Sprawdź działanie na produkcji
   - Zweryfikuj w Google Search Console
   - Udostępnij w mediach społecznościowych

## 📋 Checklist przed publikacją

### Treść
- [ ] Minimum 1000 słów (optymalnie 1500-2500)
- [ ] Wartościowa treść odpowiadająca na pytanie użytkownika
- [ ] Poprawne pisownia i gramatyka
- [ ] Weryfikacja faktów i danych

### SEO
- [ ] Meta title (50-60 znaków) z frazą kluczową
- [ ] Meta description (150-160 znaków) z CTA
- [ ] H1 z główną frazą kluczową
- [ ] H2-H4 z frazami długiego ogona
- [ ] Naturalne użycie fraz kluczowych (gęstość 1-2%)
- [ ] Schema.org Article markup
- [ ] FAQ schema (jeśli artykuł zawiera FAQ)

### Linki
- [ ] Minimum 2-3 CTA do kalkulatora
- [ ] 3-5 linków wewnętrznych do innych artykułów
- [ ] 2-3 linki zewnętrzne do wiarygodnych źródeł
- [ ] Wszystkie linki działają

### Obrazy
- [ ] Obrazy mają alt text z frazami kluczowymi
- [ ] Obrazy są zoptymalizowane (rozmiar, format)
- [ ] Ogólny obraz OG (og-image.jpg) jest odpowiedni

### Techniczne
- [ ] Artykuł dodany do `/src/app/blog/page.tsx`
- [ ] Sitemap zaktualizowany
- [ ] Responsywny design
- [ ] Szybkie ładowanie

## 🎨 Wybór ikony dla artykułu

Dostępne ikony z `react-icons/hi2`:

- `HiOutlineDocumentText` - ogólne artykuły
- `HiOutlineExclamationTriangle` - ostrzeżenia, ryzyka
- `HiOutlineChartBar` - analizy, porównania
- `HiOutlineCurrencyDollar` - koszty, finanse
- `HiOutlineBanknotes` - banki, oferty
- `HiOutlineShieldCheck` - bezpieczeństwo, ubezpieczenia
- `HiOutlineClipboardDocumentCheck` - poradniki, checklisty
- `HiOutlineUsers` - dla grup docelowych
- `HiOutlineSparkles` - specjalne oferty, promocje
- `HiOutlineArrowLongRight` - procesy, kroki

## 📊 Przykład: Dodanie artykułu "Jak obliczyć zdolność kredytową?"

### 1. Utworzenie struktury plików

```bash
mkdir -p src/app/blog/jak-obliczyc-zdolnosc-kredytowa
touch src/app/blog/jak-obliczyc-zdolnosc-kredytowa/page.tsx
```

### 2. Plik `page.tsx` (użyj szablonu z `BLOG_ARTICLE_TEMPLATE.md`)

### 3. Dodanie do `blog/page.tsx`:

```typescript
import { HiOutlineChartBar } from 'react-icons/hi2'

const blogPosts = [
  {
    slug: 'jak-obliczyc-zdolnosc-kredytowa',
    title: 'Jak obliczyć zdolność kredytową? Kompletny przewodnik 2025',
    description:
      'Dowiedz się, jak banki obliczają zdolność kredytową, jakie czynniki mają wpływ i jak samodzielnie oszacować swoją zdolność przed wizytą w banku.',
    category: 'Podstawy kredytu',
    icon: HiOutlineChartBar,
    readTime: '10 min',
  },
  {
    slug: 'zagrozenia-kredytowe',
    // ... istniejący artykuł
  },
]
```

### 4. Aktualizacja `sitemap.ts`:

```typescript
{
  url: `${baseUrl}/blog/jak-obliczyc-zdolnosc-kredytowa`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.8,
},
```

## 🔍 Weryfikacja po publikacji

### Google Search Console

1. Zgłoś nową stronę do indeksacji
2. Sprawdź, czy strona jest zaindeksowana (po kilku dniach)
3. Monitoruj pozycje dla fraz kluczowych

### Testy

- **Rich Results Test:** https://search.google.com/test/rich-results
- **Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly
- **PageSpeed Insights:** https://pagespeed.web.dev/

### Analiza

Po tygodniu sprawdź:
- Liczbę sesji z Google
- Pozycje w wynikach wyszukiwania
- Kliknięcia do kalkulatora z artykułu
- Czas spędzony na stronie

## 💡 Wskazówki

1. **Regularność:** Publikuj zgodnie z harmonogramem (1 artykuł/tydzień)
2. **Jakość > Ilość:** Lepiej mniej, ale wartościowych artykułów
3. **Aktualizacja:** Regularnie aktualizuj artykuły z danymi (np. rankingi)
4. **Linkowanie:** Buduj silną strukturę linków wewnętrznych
5. **Monitoring:** Śledź wyniki i optymalizuj na podstawie danych

## 🆘 Rozwiązywanie problemów

### Artykuł nie pojawia się na `/blog`

- Sprawdź, czy dodałeś go do tablicy `blogPosts` w `blog/page.tsx`
- Sprawdź składnię TypeScript
- Upewnij się, że slug jest poprawny

### Linki nie działają

- Sprawdź ścieżki (używaj `/blog/[slug]` nie `/blog/[slug]/page.tsx`)
- Sprawdź, czy linki są względne czy bezwzględne
- Zweryfikuj w konsoli przeglądarki (F12)

### Schema.org nie działa

- Sprawdź składnię JSON-LD w Google Rich Results Test
- Upewnij się, że używasz `suppressHydrationWarning` w script tagu
- Sprawdź, czy dane są poprawnie sformatowane

---

**Pytania?** Sprawdź `BLOG_EDITORIAL_CALENDAR.md` dla harmonogramu i `BLOG_ARTICLE_TEMPLATE.md` dla szablonu.

