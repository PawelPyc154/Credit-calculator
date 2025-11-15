# Instrukcje generowania favicony

## Opcja 1: Użyj przygotowanego generatora HTML (ZALECANE)

1. Otwórz plik `scripts/generate-favicon.html` w przeglądarce
2. Zobaczysz podgląd wszystkich rozmiarów favicony
3. Kliknij przyciski, aby pobrać poszczególne pliki:
   - `favicon-16x16.png`
   - `favicon-32x32.png`
   - `apple-touch-icon.png` (180x180)
   - `android-chrome-192x192.png`
   - `android-chrome-512x512.png`
   - `favicon.ico`
4. Skopiuj wszystkie pobrane pliki do folderu `public/`

## Opcja 2: Użyj narzędzi online

### Favicon.io
1. Wejdź na https://favicon.io/
2. Wybierz "Image Generator"
3. Prześlij plik `public/favicon-source.svg` lub `public/favicon.svg`
4. Pobierz wygenerowany pakiet
5. Skopiuj pliki do `public/`

### RealFaviconGenerator
1. Wejdź na https://realfavicongenerator.net/
2. Prześlij plik `public/favicon-source.svg`
3. Skonfiguruj opcje (kolory, tło)
4. Pobierz wygenerowany pakiet
5. Skopiuj pliki do `public/`

## Opcja 3: Ręczne przygotowanie z SVG

Jeśli masz ImageMagick zainstalowany:

```bash
# Konwertuj SVG na różne rozmiary PNG
convert favicon-source.svg -resize 16x16 favicon-16x16.png
convert favicon-source.svg -resize 32x32 favicon-32x32.png
convert favicon-source.svg -resize 180x180 apple-touch-icon.png
convert favicon-source.svg -resize 192x192 android-chrome-192x192.png
convert favicon-source.svg -resize 512x512 android-chrome-512x512.png

# Utwórz favicon.ico (zawiera wiele rozmiarów)
convert favicon-16x16.png favicon-32x32.png favicon.ico
```

## Weryfikacja

Po dodaniu plików:

1. Zrestartuj serwer deweloperski: `yarn dev`
2. Otwórz stronę w przeglądarce
3. Sprawdź faviconę w zakładce przeglądarki
4. Wyczyść cache przeglądarki (Ctrl+F5) jeśli nie widzisz zmian
5. Sprawdź na urządzeniu mobilnym (iOS/Android)

## Opis ikony

Favicona przedstawia:
- **Tło**: Gradient emerald (#059669 → #10b981)
- **Kalkulator**: Biały prostokąt z zaokrąglonymi rogami
- **Siatka**: Dwie linie (pionowa i pozioma) tworzące siatkę klawiszy kalkulatora
- **Kolory**: Emerald (#059669) - zgodne z brandem strony

## Pliki źródłowe

- `public/favicon.svg` - podstawowa wersja SVG (24x24 viewBox)
- `public/favicon-source.svg` - pełna wersja źródłowa (512x512) do generowania PNG
- `scripts/generate-favicon.html` - generator HTML do generowania wszystkich rozmiarów

