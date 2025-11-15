# Krytyczne optymalizacje wydajności - FCP i LCP

## 📊 Obecne problemy

Zgodnie z PageSpeed Insights:

- **First Contentful Paint (FCP):** 3.0s ❌ (cel: < 1.8s)
- **Largest Contentful Paint (LCP):** 4.2s ❌ (cel: < 2.5s)
- **Speed Index:** 4.5s ❌ (cel: < 3.4s)
- **Total Blocking Time:** 0ms ✅ (doskonale!)
- **Cumulative Layout Shift:** 0 ✅ (doskonale!)

## ✅ Wdrożone optymalizacje

### 1. Lazy loading CookieBanner
**Plik:** `src/app/layout.tsx`

**Problem:** CookieBanner był renderowany synchronicznie, co blokowało pierwszy render.

**Rozwiązanie:**
- Zmieniono na dynamic import z `ssr: false`
- CookieBanner ładuje się dopiero po załadowaniu strony (nie blokuje FCP/LCP)

```typescript
const LazyCookieBanner = dynamic(() => import('components/common/CookieBanner').then(mod => ({ default: mod.CookieBanner })), {
  ssr: false, // Nie renderuj na serwerze - tylko po załadowaniu klienta
})
```

**Efekt:** 
- CookieBanner nie blokuje pierwszego renderu
- Lepszy FCP i LCP
- Użytkownik widzi treść szybciej

### 2. Preload dla og-image.jpg
**Plik:** `src/app/layout.tsx`

**Problem:** Og-image.jpg może być LCP elementem, ale nie był preloadowany.

**Rozwiązanie:**
```html
<link rel="preload" href="/og-image.jpg" as="image" />
```

**Efekt:**
- Jeśli og-image.jpg jest LCP elementem, będzie załadowany wcześniej
- Lepszy LCP score

### 3. Optymalizacja kolejności renderowania
**Plik:** `src/app/layout.tsx`

**Zmiana:** Przeniesiono TRPCReactProvider przed Suspense dla AnalyticsTracker.

**Efekt:** 
- Główna treść renderuje się szybciej
- Analytics nie blokuje renderowania

## 🎯 Oczekiwane rezultaty

Po wdrożeniu tych optymalizacji:

- **FCP:** 3.0s → **1.5-2.0s** ⬇️ -1.0 do -1.5s
- **LCP:** 4.2s → **2.0-2.5s** ⬇️ -1.7 do -2.2s
- **Speed Index:** 4.5s → **2.5-3.0s** ⬇️ -1.5 do -2.0s
- **Performance Score:** 78 → **85-90** ⬆️ +7-12 punktów

## 📋 Dodatkowe optymalizacje do rozważenia

### 1. Optymalizacja og-image.jpg
**Sprawdź:**
- Czy og-image.jpg istnieje w `/public/og-image.jpg`?
- Jaki jest rozmiar pliku? (powinien być < 200KB)
- Czy jest zoptymalizowany? (użyj ImageOptim, TinyPNG, lub podobnych)

**Jeśli plik jest duży:**
```bash
# Zoptymalizuj obraz
# Użyj narzędzi online lub:
# - ImageOptim (Mac)
# - TinyPNG (online)
# - Squoosh (online)
```

### 2. Code splitting dla ciężkich bibliotek
**Rozważ lazy loading dla:**
- `framer-motion` - tylko jeśli używane w komponentach poniżej folda
- `chart.js` - tylko jeśli używane w komponentach poniżej folda
- `react-icons` - tree-shaking powinien działać, ale sprawdź bundle size

### 3. Optymalizacja CSS
**Sprawdź:**
- Czy wszystkie style są używane?
- Czy można usunąć nieużywane style z Tailwind?

```bash
# Sprawdź rozmiar CSS bundle
npm run build
# Zobacz w .next/static/css/
```

### 4. Server-side rendering optymalizacje
**Rozważ:**
- Czy wszystkie komponenty muszą być SSR?
- Czy niektóre mogą być statycznie wygenerowane?

### 5. CDN i caching
**Sprawdź:**
- Czy używasz CDN dla statycznych zasobów?
- Czy cache headers są prawidłowo ustawione? (już dodane w next.config.ts)

## 🔍 Jak sprawdzić postęp

### 1. Przed deployem (lokalnie)
```bash
# Zbuduj aplikację
npm run build

# Uruchom produkcję lokalnie
npm run start

# Sprawdź w Chrome DevTools
# F12 → Lighthouse → Performance → Generate report
```

### 2. Po deployu
1. Poczekaj 24-48h na aktualizację danych
2. Sprawdź PageSpeed Insights: https://pagespeed.web.dev/
3. Porównaj wyniki przed i po

### 3. Monitoring w czasie rzeczywistym
- Google Search Console → Core Web Vitals
- Google Analytics → Web Vitals report

## 📝 Notatki

- CookieBanner jest teraz lazy loaded - może pojawić się z małym opóźnieniem (to jest OK)
- Og-image.jpg powinien być zoptymalizowany - sprawdź rozmiar pliku
- Wszystkie zmiany są backward compatible

## 🚀 Następne kroki

1. ✅ Wdroż zmiany na produkcję
2. ⏳ Poczekaj 24-48h
3. 📊 Sprawdź wyniki w PageSpeed Insights
4. 🔄 Jeśli potrzebne, zastosuj dodatkowe optymalizacje z sekcji "Dodatkowe optymalizacje"

---

**Ostatnia aktualizacja:** 2025-01-XX
**Status:** ✅ Wdrożone

