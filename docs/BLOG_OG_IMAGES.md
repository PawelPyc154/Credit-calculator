# Przewodnik: Dedykowane obrazy Open Graph dla artykułów blogowych

## Problem

Gdy udostępniasz link do artykułu na Facebooku, może się wyświetlać nieprawidłowy lub ogólny obrazek. To dlatego, że wszystkie artykuły używają tego samego obrazka OG (`/og-image.jpg`), który jest przeznaczony dla strony głównej.

## Rozwiązanie

Każdy artykuł ma swój **dedykowany obrazek Open Graph**, który:
- Jest bardziej atrakcyjny i informacyjny
- Zawiera tytuł artykułu (wieloliniowy, nie ucięty)
- Ma dedykowaną ikonę związaną z tematem
- Zwiększa CTR (click-through rate) na Facebooku
- Lepiej reprezentuje treść artykułu

## Struktura plików

```
public/
  images/
    blog/
      zagrozenia-kredytowe-og.jpg
      ukryte-koszty-kredytu-hipotecznego-og.jpg
      ranking-bankow-kredytow-hipotecznych-2025-og.jpg
      [nazwa-artykulu]-og.jpg
```

## Wymagania techniczne

- **Rozmiar**: 1200x630px (proporcje 1.91:1)
- **Format**: JPG (zalecany) lub PNG
- **Maksymalny rozmiar**: 8MB
- **Nazwa pliku**: `[slug-artykulu]-og.jpg`

## Automatyczne generowanie

### Generuj wszystkie obrazki

```bash
npm run og:all
```

lub

```bash
yarn og:all
```

Skrypt automatycznie:
1. Czyta wszystkie artykuły z `src/app/blog/`
2. Wyciąga tytuł i opis z metadata
3. Wybiera odpowiednią ikonę na podstawie tematu
4. Generuje SVG z wieloliniowym tytułem (nie uciętym)
5. Konwertuje SVG na JPG (1200x630px)

### Aktualizuj metadata w plikach

```bash
npm run og:update
```

Skrypt automatycznie aktualizuje metadata w plikach artykułów, aby używały dedykowanych obrazków.

## Mapowanie ikon

Skrypt automatycznie przypisuje ikony na podstawie słów kluczowych w slugu/tytule:

| Kategoria | Słowa kluczowe | Ikona |
|-----------|---------------|-------|
| **Ostrzeżenia** | zagrozenia, pulapki, ostrzezenie | ⚠️ Czerwone koło z wykrzyknikiem |
| **Koszty** | ukryte-koszty, koszty, prowizja | 💰 Żółte koło z $ |
| **Rankingi** | ranking, bankow | 🏆 Puchar |
| **Kalkulatory** | zdolnosc-kredytowa, obliczyc | 🧮 Kalkulator |
| **Ubezpieczenia** | ubezpieczenie | 🛡️ Tarcza |
| **Oprocentowanie** | oprocentowanie, stopy-procentowe | 📊 Wykres słupkowy |
| **Refinansowanie** | refinansowanie, wczesniejsza-splata | 🔄 Strzałki odświeżania |
| **Dokumenty** | dokumenty, wniosek | 📄 Dokument |
| **Negocjacje** | negocjowac, wybrac | 🤝 Uścisk dłoni |
| **Pomoc** | rozwod, smierc, nie-mozesz-splacac | ❓ Niebieskie koło z ? |
| **Grupy** | mlodych, singla, przedsiebiorcy | 👥 Ludzie |
| **Nieruchomości** | budowe-domu, wklad-wlasny | 🏠 Dom |
| **RRSO** | rrso | % Procent |
| **Poradniki** | jak-, poradnik | 📖 Książka |
| **Domyślnie** | - | 🧮 Kalkulator |

## Formatowanie tytułów

- **Wieloliniowe**: Tytuły są automatycznie dzielone na maksymalnie 2 linie
- **Maksymalna długość**: 45 znaków na linię
- **Rozmiar czcionki**: 
  - 52px dla jednej linii
  - 46px dla dwóch linii
- **Nie ucięte**: Pełny tytuł jest zawsze widoczny

## Konfiguracja w kodzie

Po wygenerowaniu obrazków, metadata jest automatycznie aktualizowane w plikach artykułów:

```typescript
// src/app/blog/[slug]/page.tsx
export const metadata: Metadata = {
  // ...
  openGraph: {
    // ...
    images: [
      {
        url: `${siteUrl}/images/blog/[slug-artykulu]-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Tytuł artykułu',
      },
    ],
  },
  twitter: {
    // ...
    images: [`${siteUrl}/images/blog/[slug-artykulu]-og.jpg`],
  },
}
```

## Aktualizacja cache Facebooka

Po dodaniu/zmianie obrazka:

1. **Facebook Sharing Debugger**:
   - Wejdź na: https://developers.facebook.com/tools/debug/
   - Wklej URL artykułu: `https://www.kredytanaliza.pl/blog/[slug-artykulu]`
   - Kliknij **"Scrape Again"** (może być potrzebne kilka razy)
   - Sprawdź podgląd obrazka

2. **LinkedIn Post Inspector**:
   - https://www.linkedin.com/post-inspector/
   - Wklej URL i sprawdź podgląd

3. **Twitter Card Validator**:
   - https://cards-dev.twitter.com/validator
   - Cache aktualizuje się automatycznie

## Regenerowanie obrazków

Jeśli zmienisz tytuł artykułu lub chcesz zaktualizować ikonę:

```bash
# Usuń stary obrazek (opcjonalnie)
rm public/images/blog/[slug]-og.jpg

# Wygeneruj ponownie wszystkie obrazki
npm run og:all

# Zaktualizuj metadata
npm run og:update
```

## Lista artykułów z obrazkami

Wszystkie 28 artykułów ma dedykowane obrazki OG:

- ✅ zagrozenia-kredytowe (⚠️ Ostrzeżenie)
- ✅ ukryte-koszty-kredytu-hipotecznego (💰 Pieniądze)
- ✅ ranking-bankow-kredytow-hipotecznych-2025 (🏆 Puchar)
- ✅ jak-obliczyc-zdolnosc-kredytowa (🧮 Kalkulator)
- ✅ ubezpieczenie-kredytu-hipotecznego (🛡️ Tarcza)
- ✅ oprocentowanie-kredytu-hipotecznego-stale-czy-zmienne (📊 Wykres)
- ✅ refinansowanie-kredytu-hipotecznego (🔄 Odświeżanie)
- ✅ dokumenty-do-kredytu-hipotecznego (📄 Dokument)
- ✅ jak-negocjowac-warunki-kredytu-hipotecznego (🤝 Uścisk dłoni)
- ✅ co-zrobic-gdy-nie-mozesz-splacac-kredytu (❓ Pomoc)
- ✅ kredyt-hipoteczny-dla-mlodych-programy-wsparcia (👥 Ludzie)
- ✅ kredyt-hipoteczny-na-budowe-domu (🏠 Dom)
- ✅ rrso-kredyt-hipoteczny (% Procent)
- ✅ jak-dlugo-trwa-proces-kredytowy (📖 Poradnik)
- ... i 14 więcej

## Dostępne skrypty

```bash
# Generuj główny obrazek OG
npm run og:main

# Generuj obrazek dla artykułu o zagrożeniach
npm run og:zagrozenia

# Generuj obrazki dla WSZYSTKICH artykułów
npm run og:all

# Aktualizuj metadata w plikach artykułów
npm run og:update
```

## Weryfikacja

Po stworzeniu obrazka:

1. ✅ Sprawdź rozmiar pliku (powinien być < 8MB)
2. ✅ Sprawdź wymiary (1200x630px)
3. ✅ Przetestuj w Facebook Sharing Debugger
4. ✅ Przetestuj w LinkedIn Post Inspector
5. ✅ Sprawdź, czy tytuł nie jest ucięty
6. ✅ Sprawdź, czy ikona pasuje do tematu

## FAQ

**Q: Czy każdy artykuł MUSI mieć swój obrazek?**
A: Nie, ale zdecydowanie warto. Zwiększa to zaangażowanie i CTR.

**Q: Co jeśli nie mam czasu na stworzenie obrazka?**
A: Możesz użyć ogólnego `/og-image.jpg`, ale dedykowany obrazek działa lepiej.

**Q: Jak często aktualizować obrazki?**
A: Tylko gdy zmieniasz tytuł lub główną treść artykułu.

**Q: Czy mogę użyć tego samego obrazka dla kilku podobnych artykułów?**
A: Tak, ale lepiej mieć dedykowany obrazek dla każdego artykułu.

**Q: Jak zmienić ikonę dla konkretnego artykułu?**
A: Edytuj funkcję `getIconForArticle()` w `scripts/generate-all-blog-og-images.ts` i dodaj nowe warunki.

**Q: Tytuł jest nadal ucięty - co robić?**
A: Skrypt automatycznie dzieli tytuły na 2 linie. Jeśli nadal jest ucięty, zmniejsz limit znaków w funkcji `wrapText()`.
