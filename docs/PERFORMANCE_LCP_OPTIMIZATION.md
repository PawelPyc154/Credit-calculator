# Optymalizacja LCP (Largest Contentful Paint)

## 📊 Obecny problem

Zgodnie z PageSpeed Insights:
- **LCP: 5.0s** ❌ (cel: < 2.5s)
- **Performance Score: 73** (spadł z 78)

**LCP element:** HeroTitle ("Oblicz ratę kredytu hipotecznego i porównaj oferty w jednym miejscu")

## 🔍 Analiza problemu

LCP (Largest Contentful Paint) mierzy czas, w którym największy element treści jest widoczny w viewport. W tym przypadku jest to HeroTitle na stronie głównej.

**Główne przyczyny wolnego LCP:**
1. Font Geist może ładować się wolno
2. HeroTitle renderuje się po załadowaniu fontu
3. Brak optymalizacji dla krytycznego tekstu
4. CSS dla HeroSection może opóźniać renderowanie

## ✅ Wdrożone optymalizacje

### 1. Preload fontu Geist
**Plik:** `src/app/layout.tsx`

**Rozwiązanie:**
Dodano preload dla fontu Geist, który jest używany w HeroTitle:

```html
<link
  rel="preload"
  href="/_next/static/media/geist-sans.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
```

**Efekt:**
- Font zaczyna ładować się wcześniej
- HeroTitle renderuje się szybciej
- Lepszy LCP score

### 2. Optymalizacja konfiguracji fontu
**Plik:** `src/app/layout.tsx`

**Rozwiązanie:**
Dodano dodatkowe opcje dla fontu Geist:

```typescript
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
  preload: true,
  adjustFontFallback: true, // Automatycznie dostosowuje fallback font
  fallback: ['system-ui', 'arial'], // Fallback fonts dla szybszego renderowania
})
```

**Efekt:**
- `adjustFontFallback: true` - automatycznie dostosowuje fallback font dla lepszego CLS
- `fallback: ['system-ui', 'arial']` - używa systemowych fontów jako fallback
- Tekst jest widoczny natychmiast, nawet przed załadowaniem fontu

### 3. Identyfikacja LCP elementu
**Plik:** `src/app/page.tsx`

**Rozwiązanie:**
Dodano komentarze identyfikujące LCP element:

```tsx
{/* HeroTitle jest LCP elementem - renderowany jako pierwszy */}
<HeroTitle>Oblicz ratę kredytu hipotecznego i porównaj oferty w jednym miejscu</HeroTitle>
```

**Efekt:**
- Łatwiejsza identyfikacja LCP elementu w przyszłości
- Możliwość dalszej optymalizacji tego konkretnego elementu

## 🎯 Oczekiwane rezultaty

Po wdrożeniu tych optymalizacji:

- **LCP:** 5.0s → **2.5-3.5s** ⬇️ -1.5 do -2.5s
- **FCP:** 2.9s → **1.8-2.2s** ⬇️ -0.7 do -1.1s
- **Performance Score:** 73 → **80-85** ⬆️ +7-12 punktów

## 📋 Dodatkowe optymalizacje do rozważenia

### 1. Critical CSS inline dla HeroSection
**Jeśli potrzebne dalsze optymalizacje:**

Możesz dodać critical CSS inline dla HeroSection w `<head>`:

```tsx
<style dangerouslySetInnerHTML={{
  __html: `
    .hero-section {
      background: linear-gradient(to right, #059669, #0d9488);
      color: white;
      padding: 2rem 1rem;
    }
    .hero-title {
      font-size: 1.875rem;
      font-weight: 600;
      line-height: 1.2;
    }
  `
}} />
```

**Uwaga:** Next.js już optymalizuje CSS, więc to może nie być potrzebne.

### 2. Server-side rendering optymalizacje
**Rozważ:**
- Czy HeroTitle może być renderowany na serwerze? (już jest SSR)
- Czy można użyć static generation dla strony głównej? (Next.js automatycznie używa SSG)

### 3. Optymalizacja HeroSection CSS
**Sprawdź:**
- Czy gradient background może być zoptymalizowany?
- Czy można użyć CSS variables dla szybszego renderowania?

### 4. Font subsetting
**Jeśli font jest nadal duży:**
- Sprawdź czy używasz tylko potrzebnych znaków (subsets: ['latin'])
- Rozważ użycie tylko podstawowych wag fontu (400, 600)

### 5. Preconnect do Google Fonts (jeśli używane)
**Jeśli używasz Google Fonts:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
```

**Uwaga:** Geist jest ładowany lokalnie przez Next.js, więc to nie jest potrzebne.

## 🔍 Jak sprawdzić postęp

### 1. Przed deployem (lokalnie)
```bash
# Zbuduj aplikację
npm run build

# Uruchom produkcję lokalnie
npm run start

# Sprawdź w Chrome DevTools
# F12 → Performance → Record → Reload → Stop
# Sprawdź LCP timing w Performance panel
```

### 2. Po deployu
1. Poczekaj 24-48h na aktualizację danych
2. Sprawdź PageSpeed Insights: https://pagespeed.web.dev/
3. Porównaj wyniki przed i po:
   - LCP timing
   - FCP timing
   - Performance Score

### 3. Monitoring w czasie rzeczywistym
- Chrome DevTools → Performance → Sprawdź LCP marker
- Google Search Console → Core Web Vitals → Sprawdź LCP

### 4. Web Vitals API
Możesz użyć Web Vitals API do monitorowania LCP w czasie rzeczywistym:

```typescript
import { onLCP } from 'web-vitals'

onLCP((metric) => {
  console.log('LCP:', metric.value)
})
```

## 📝 Notatki

- **LCP element:** HeroTitle jest największym elementem treści na stronie głównej
- **Font loading:** Preload fontu i fallback fonts zapewniają szybkie renderowanie tekstu
- **CSS:** Next.js automatycznie optymalizuje CSS, więc dodatkowe optymalizacje mogą nie być potrzebne
- **Server-side rendering:** HeroTitle jest renderowany na serwerze, co jest optymalne

## 🚀 Następne kroki

1. ✅ Wdroż zmiany na produkcję
2. ⏳ Poczekaj 24-48h
3. 📊 Sprawdź wyniki w PageSpeed Insights
4. 🔄 Porównaj LCP timing przed i po
5. 📈 Monitoruj Core Web Vitals w Google Search Console

---

**Ostatnia aktualizacja:** 2025-01-XX
**Status:** ✅ Wdrożone

