# Przewodnik Open Graph Image dla Facebooka

## Co to jest Open Graph Image?

Open Graph Image to obraz, który pojawia się automatycznie, gdy ktoś udostępnia link do Twojej strony na Facebooku, LinkedIn, Twitterze lub innych platformach społecznościowych.

## Wymagania techniczne

### Facebook/LinkedIn:
- **Rozmiar**: 1200x630px (zalecany)
- **Format**: JPG lub PNG
- **Maksymalny rozmiar pliku**: 8MB
- **Proporcje**: 1.91:1

### Twitter:
- **Rozmiar**: 1200x675px (dla `summary_large_image`)
- **Format**: JPG lub PNG
- **Maksymalny rozmiar pliku**: 5MB

## Jak wygenerować obraz

### Opcja 1: Użyj przygotowanego generatora HTML (ZALECANE)

1. Otwórz plik `scripts/generate-og-image.html` w przeglądarce
2. Zobaczysz podgląd obrazu Open Graph
3. Kliknij przycisk "Pobierz jako JPG" lub "Pobierz jako PNG"
4. Zapisz plik jako `og-image.jpg` w folderze `public/`

### Opcja 2: Użyj narzędzi online

#### Canva
1. Wejdź na https://www.canva.com/
2. Utwórz projekt o rozmiarze 1200x630px
3. Dodaj:
   - Tło: Gradient emerald (#059669 → #10b981)
   - Ikona kalkulatora (biała)
   - Tekst: "Kalkulator Kredytowy"
   - Podtytuł: "Oblicz ratę i porównaj oferty banków"
4. Pobierz jako JPG
5. Zapisz jako `og-image.jpg` w folderze `public/`

#### Figma/Adobe Illustrator
1. Utwórz projekt 1200x630px
2. Użyj pliku `public/og-image-source.svg` jako referencji
3. Eksportuj jako JPG (jakość 90-95%)
4. Zapisz jako `og-image.jpg` w folderze `public/`

### Opcja 3: Konwersja SVG na JPG

Jeśli masz ImageMagick:

```bash
# Konwertuj SVG na JPG
convert og-image-source.svg -resize 1200x630 -quality 95 og-image.jpg
```

## Zawartość obrazu

Obraz powinien zawierać:

1. **Tło**: Gradient emerald (zielony) - zgodny z brandem
2. **Ikona kalkulatora**: Biały prostokąt z siatką (jak w topbarze)
3. **Tytuł**: "Kalkulator Kredytowy" - duży, czytelny tekst
4. **Podtytuł**: "Oblicz ratę i porównaj oferty banków" - mniejszy tekst

## Kolory

- **Tło**: Gradient od #059669 do #10b981 (emerald)
- **Tekst**: Biały (#FFFFFF)
- **Kalkulator**: Biały z liniami emerald (#059669)

## Weryfikacja

Po dodaniu obrazu:

1. **Facebook Sharing Debugger**:
   - Wejdź na: https://developers.facebook.com/tools/debug/
   - Wklej URL swojej strony
   - Kliknij "Scrape Again"
   - Sprawdź, czy obraz się wyświetla poprawnie

2. **LinkedIn Post Inspector**:
   - Wejdź na: https://www.linkedin.com/post-inspector/
   - Wklej URL swojej strony
   - Sprawdź podgląd

3. **Twitter Card Validator**:
   - Wejdź na: https://cards-dev.twitter.com/validator
   - Wklej URL swojej strony
   - Sprawdź podgląd

## Aktualizacja cache

Po dodaniu/zmianie obrazu:

1. **Facebook**: Użyj Sharing Debugger i kliknij "Scrape Again"
2. **LinkedIn**: Użyj Post Inspector
3. **Twitter**: Cache aktualizuje się automatycznie po kilku godzinach

## Pliki źródłowe

- `public/og-image-source.svg` - SVG źródłowy (można edytować)
- `scripts/generate-og-image.html` - Generator HTML do tworzenia JPG/PNG
- `public/og-image.jpg` - Finalny obraz JPG (wygenerowany z SVG)

## ⚠️ WAŻNE: SVG nie działa na Facebooku!

**Facebook nie obsługuje SVG dla obrazków Open Graph.** Musisz używać JPG lub PNG.

### Automatyczne generowanie JPG z SVG

Użyj skryptu Node.js do automatycznego generowania:

```bash
npm run og:main
```

lub

```bash
yarn og:main
```

Skrypt automatycznie konwertuje `og-image-source.svg` na `og-image.jpg` (1200x630px, JPG, jakość 95%).

### Ręczne generowanie

Jeśli wolisz ręcznie:
1. Otwórz `scripts/generate-og-image.html` w przeglądarce
2. Kliknij "Pobierz jako JPG"
3. Zapisz jako `og-image.jpg` w folderze `public/`

## Konfiguracja w kodzie

Obraz jest już skonfigurowany w:
- `src/app/layout.tsx` - główna konfiguracja Open Graph
- `src/app/page.tsx` - strona główna
- Wszystkie strony blogowe - automatycznie używają tego samego obrazu

## Wskazówki projektowe

1. **Czytelność**: Tekst powinien być czytelny nawet w małym rozmiarze
2. **Prostota**: Unikaj zbyt wielu elementów - prosty design działa lepiej
3. **Branding**: Używaj kolorów z brandu strony (emerald/teal)
4. **Tekst**: Unikaj zbyt długich tekstów - krótkie i zwięzłe
5. **Kontrast**: Wysoki kontrast między tekstem a tłem

## Przykładowe narzędzia do edycji

- **Canva** - łatwy w użyciu, darmowy plan
- **Figma** - profesjonalne narzędzie, darmowe
- **Adobe Photoshop/Illustrator** - profesjonalne, płatne
- **GIMP** - darmowa alternatywa dla Photoshopa

