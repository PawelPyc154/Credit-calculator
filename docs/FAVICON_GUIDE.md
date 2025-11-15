# Przewodnik przygotowania favicony

## Wymagane pliki favicony

Dla pełnej kompatybilności z różnymi urządzeniami i przeglądarkami potrzebujesz następujących plików:

### W folderze `public/`:
- `favicon.ico` (16x16, 32x32, 48x48) - podstawowa favicona dla starszych przeglądarek
- `favicon-16x16.png` - 16x16px
- `favicon-32x32.png` - 32x32px
- `apple-touch-icon.png` - 180x180px (dla iOS)
- `android-chrome-192x192.png` - 192x192px (dla Android)
- `android-chrome-512x512.png` - 512x512px (dla Android)
- `site.webmanifest` - manifest dla PWA

### W folderze `src/app/` (Next.js App Router):
- `icon.png` lub `icon.ico` - Next.js automatycznie wykryje i użyje
- `apple-icon.png` - dla iOS (opcjonalnie)

## Rozmiary i formaty

### Podstawowe rozmiary:
- **16x16** - favicon w zakładce przeglądarki
- **32x32** - favicon w zakładce przeglądarki (większe)
- **48x48** - favicon w zakładce przeglądarki (duże)
- **180x180** - Apple Touch Icon (iOS)
- **192x192** - Android Chrome
- **512x512** - Android Chrome (wysoka rozdzielczość)

## Narzędzia do generowania favicony

### Online:
1. **Favicon.io** - https://favicon.io/
   - Generuje wszystkie rozmiary z jednego obrazu
   - Tworzy również `site.webmanifest`
   - Darmowe

2. **RealFaviconGenerator** - https://realfavicongenerator.net/
   - Bardzo szczegółowa konfiguracja
   - Wsparcie dla różnych platform
   - Darmowe

3. **Favicon Generator** - https://www.favicon-generator.org/
   - Proste w użyciu
   - Darmowe

### Lokalnie:
- **ImageMagick** - konwersja obrazów
- **GIMP/Photoshop** - edycja obrazów

## Proces przygotowania

### Krok 1: Przygotuj obraz źródłowy
- Rozmiar: minimum 512x512px (lepiej 1024x1024px)
- Format: PNG z przezroczystością
- Tło: przezroczyste lub jednolite
- Treść: logo/ikona, która będzie czytelna w małych rozmiarach

### Krok 2: Wygeneruj wszystkie rozmiary
Użyj jednego z narzędzi online, aby wygenerować wszystkie potrzebne rozmiary.

### Krok 3: Umieść pliki w projekcie

```
public/
  ├── favicon.ico
  ├── favicon-16x16.png
  ├── favicon-32x32.png
  ├── apple-touch-icon.png
  ├── android-chrome-192x192.png
  ├── android-chrome-512x512.png
  └── site.webmanifest

src/app/
  ├── icon.png (opcjonalnie, Next.js automatycznie użyje)
  └── apple-icon.png (opcjonalnie)
```

### Krok 4: Zaktualizuj konfigurację

Plik `src/app/layout.tsx` powinien zawierać:

```typescript
export const metadata: Metadata = {
  // ... inne metadane
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
}
```

### Krok 5: Utwórz site.webmanifest

Plik `public/site.webmanifest`:

```json
{
  "name": "Kalkulator Kredytowy",
  "short_name": "Kalkulator",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#059669",
  "background_color": "#ffffff",
  "display": "standalone"
}
```

## Wskazówki projektowe

1. **Prostota**: Favicona powinna być prosta i czytelna w małych rozmiarach
2. **Kontrast**: Użyj wysokiego kontrastu dla lepszej widoczności
3. **Kolory**: Użyj kolorów z brandingu strony (emerald/teal dla tego projektu)
4. **Testowanie**: Sprawdź faviconę w różnych przeglądarkach i urządzeniach
5. **Aktualizacja**: Po zmianie favicony, wyczyść cache przeglądarki (Ctrl+F5)

## Kolory projektu

Na podstawie kodu strony, główne kolory to:
- **Primary**: Emerald (#059669, #10b981)
- **Secondary**: Teal (#14b8a6)
- **Background**: Slate/White

Favicona powinna używać tych kolorów dla spójności wizualnej.

## Przykładowe tematy favicony

1. **Kalkulator** - ikona kalkulatora w kolorze emerald
2. **Dom** - ikona domu (symbol kredytu hipotecznego)
3. **Graf** - ikona wykresu/analizy finansowej
4. **Litera K** - stylizowana litera "K" (Kalkulator/Kredyt)

## Weryfikacja

Po dodaniu favicony sprawdź:
1. Czy favicona pojawia się w zakładce przeglądarki
2. Czy działa na urządzeniach mobilnych (iOS, Android)
3. Czy działa w różnych przeglądarkach (Chrome, Firefox, Safari, Edge)
4. Czy nie ma błędów w konsoli przeglądarki

