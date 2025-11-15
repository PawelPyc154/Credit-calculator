# Favicon - Instrukcje

## Co zostało przygotowane

✅ Konfiguracja w `src/app/layout.tsx` - gotowa do użycia
✅ Plik `site.webmanifest` - utworzony
✅ Dokumentacja w `docs/FAVICON_GUIDE.md`

## Co musisz zrobić

### 1. Przygotuj obraz źródłowy
- Minimum 512x512px (lepiej 1024x1024px)
- Format PNG z przezroczystością
- Prosty, czytelny design (logo/ikona)
- Kolory: Emerald (#059669) i Teal (#14b8a6) dla spójności z brandem

### 2. Wygeneruj pliki favicony

Użyj jednego z narzędzi:
- **Favicon.io** - https://favicon.io/ (zalecane)
- **RealFaviconGenerator** - https://realfavicongenerator.net/

### 3. Umieść pliki w folderze `public/`

Potrzebujesz następujących plików:
```
public/
  ├── favicon.ico (już istnieje, ale możesz zastąpić)
  ├── favicon-16x16.png
  ├── favicon-32x32.png
  ├── apple-touch-icon.png (180x180px)
  ├── android-chrome-192x192.png
  └── android-chrome-512x512.png
```

### 4. Sprawdź działanie

Po dodaniu plików:
1. Zrestartuj serwer deweloperski (`yarn dev`)
2. Sprawdź faviconę w zakładce przeglądarki
3. Wyczyść cache przeglądarki (Ctrl+F5) jeśli nie widzisz zmian

## Szybki start z Favicon.io

1. Wejdź na https://favicon.io/
2. Wybierz "Image Generator"
3. Prześlij swój obraz (512x512px lub większy)
4. Pobierz wygenerowany pakiet
5. Skopiuj wszystkie pliki PNG do folderu `public/`
6. Skopiuj `favicon.ico` do folderu `public/`

## Tematyka favicony

Sugerowane motywy:
- 🧮 Kalkulator (ikona kalkulatora)
- 🏠 Dom (symbol kredytu hipotecznego)
- 📊 Wykres (analiza finansowa)
- 💰 Symbol pieniędzy/kredytu
- K (stylizowana litera "K" dla Kalkulator/Kredyt)

Wybierz coś prostego, co będzie czytelne w małym rozmiarze!

