# Przewodnik: Dedykowane obrazy Open Graph dla artykułów blogowych

## Problem

Gdy udostępniasz link do artykułu na Facebooku, może się wyświetlać nieprawidłowy lub ogólny obrazek. To dlatego, że wszystkie artykuły używają tego samego obrazka OG (`/og-image.jpg`), który jest przeznaczony dla strony głównej.

## Rozwiązanie

Każdy artykuł powinien mieć swój **dedykowany obrazek Open Graph**, który:
- Jest bardziej atrakcyjny i informacyjny
- Zawiera tytuł artykułu lub kluczowe informacje
- Zwiększa CTR (click-through rate) na Facebooku
- Lepiej reprezentuje treść artykułu

## Struktura plików

```
public/
  images/
    blog/
      zagrozenia-kredytowe-og.jpg
      ukryte-koszty-kredytu-hipotecznego-og.jpg
      [nazwa-artykulu]-og.jpg
```

## Wymagania techniczne

- **Rozmiar**: 1200x630px (proporcje 1.91:1)
- **Format**: JPG (zalecany) lub PNG
- **Maksymalny rozmiar**: 8MB
- **Nazwa pliku**: `[slug-artykulu]-og.jpg`

## Jak stworzyć obrazek OG dla artykułu

### Opcja 1: Canva (ZALECANE - najłatwiejsze)

1. Wejdź na https://www.canva.com/
2. Utwórz projekt o rozmiarze **1200x630px**
3. Dodaj elementy:
   - **Tło**: Gradient emerald (#059669 → #10b981) lub jednolity kolor
   - **Ikona**: Powiązana z tematem artykułu (np. ostrzeżenie dla zagrożeń)
   - **Tytuł artykułu**: Duży, czytelny tekst (max 60-70 znaków)
   - **Podtytuł**: Krótkie hasło (opcjonalnie)
   - **Logo**: Logo strony w rogu (opcjonalnie)
4. Pobierz jako **JPG** (jakość 90-95%)
5. Zapisz jako `[slug-artykulu]-og.jpg` w folderze `public/images/blog/`

### Opcja 2: Figma

1. Utwórz projekt 1200x630px
2. Użyj szablonu z `public/og-image-source.svg` jako bazę
3. Zmień tekst na tytuł artykułu
4. Eksportuj jako JPG
5. Zapisz w `public/images/blog/`

### Opcja 3: Narzędzia online

- **OG Image Generator**: https://www.opengraph.xyz/
- **Social Share Preview**: https://socialsharepreview.com/
- **Buffer Image Maker**: https://buffer.com/tools/image-maker

## Przykład dla artykułu "Zagrożenia kredytowe"

**Tytuł obrazka**: "Zagrożenia kredytowe"
**Podtytuł**: "Na co uważać przy zaciąganiu kredytu"
**Ikona**: ⚠️ Ostrzeżenie lub ikona tarczy
**Kolory**: 
- Tło: Gradient emerald z czerwonymi akcentami
- Tekst: Biały (#FFFFFF)
- Akcenty: Czerwony (#DC2626) dla ostrzeżeń

## Konfiguracja w kodzie

Po stworzeniu obrazka, zaktualizuj metadata w pliku artykułu:

```typescript
// src/app/blog/[slug]/page.tsx
export const metadata: Metadata = {
  // ... inne pola
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
   - Wklej URL artykułu: `https://www.kredytanaliza.pl/blog/zagrozenia-kredytowe`
   - Kliknij **"Scrape Again"** (może być potrzebne kilka razy)
   - Sprawdź podgląd obrazka

2. **LinkedIn Post Inspector**:
   - https://www.linkedin.com/post-inspector/
   - Wklej URL i sprawdź podgląd

3. **Twitter Card Validator**:
   - https://cards-dev.twitter.com/validator
   - Cache aktualizuje się automatycznie

## Szablon Canva dla artykułów

### Elementy do użycia:

1. **Tło**:
   - Gradient emerald: #059669 → #10b981
   - Lub jednolity kolor z brandu

2. **Tytuł**:
   - Font: Bold, Sans-serif (np. Inter, Poppins)
   - Rozmiar: 48-60px
   - Kolor: Biały (#FFFFFF)
   - Max 2 linie tekstu

3. **Ikona**:
   - Powiązana z tematem artykułu
   - Rozmiar: 80-100px
   - Kolor: Biały lub kontrastowy

4. **Podtytuł** (opcjonalnie):
   - Font: Regular, Sans-serif
   - Rozmiar: 24-28px
   - Kolor: Biały z przezroczystością 90%

5. **Logo** (opcjonalnie):
   - W prawym dolnym rogu
   - Rozmiar: 60-80px

## Lista artykułów do aktualizacji

- [x] `zagrozenia-kredytowe` - ✅ Zaktualizowane w kodzie
- [ ] `ukryte-koszty-kredytu-hipotecznego` - Wymaga obrazka
- [ ] Inne artykuły - Wymagają obrazków

## Automatyzacja (opcjonalnie)

Możesz stworzyć skrypt, który automatycznie generuje obrazy OG na podstawie:
- Tytułu artykułu
- Opisu
- Szablonu

Przykład narzędzi:
- **Vercel OG Image**: https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation
- **Next.js Image Generation**: Wbudowane w Next.js 13+

## Wskazówki projektowe

1. **Czytelność**: Tekst powinien być czytelny nawet w małym rozmiarze (thumbnail)
2. **Prostota**: Unikaj zbyt wielu elementów - prosty design działa lepiej
3. **Branding**: Używaj kolorów z brandu strony (emerald/teal)
4. **Tekst**: Unikaj zbyt długich tekstów - krótkie i zwięzłe
5. **Kontrast**: Wysoki kontrast między tekstem a tłem
6. **Spójność**: Wszystkie obrazy powinny mieć podobny styl

## Przykładowe narzędzia do edycji

- **Canva** - łatwy w użyciu, darmowy plan, gotowe szablony
- **Figma** - profesjonalne narzędzie, darmowe, współpraca
- **Adobe Photoshop/Illustrator** - profesjonalne, płatne
- **GIMP** - darmowa alternatywa dla Photoshopa
- **Photopea** - darmowy edytor online (jak Photoshop)

## Weryfikacja

Po stworzeniu obrazka:

1. ✅ Sprawdź rozmiar pliku (powinien być < 8MB)
2. ✅ Sprawdź wymiary (1200x630px)
3. ✅ Przetestuj w Facebook Sharing Debugger
4. ✅ Przetestuj w LinkedIn Post Inspector
5. ✅ Sprawdź, czy obrazek wyświetla się poprawnie na różnych urządzeniach

## FAQ

**Q: Czy każdy artykuł MUSI mieć swój obrazek?**
A: Nie, ale zdecydowanie warto. Zwiększa to zaangażowanie i CTR.

**Q: Co jeśli nie mam czasu na stworzenie obrazka?**
A: Możesz użyć ogólnego `/og-image.jpg`, ale dedykowany obrazek działa lepiej.

**Q: Jak często aktualizować obrazki?**
A: Tylko gdy zmieniasz tytuł lub główną treść artykułu.

**Q: Czy mogę użyć tego samego obrazka dla kilku podobnych artykułów?**
A: Tak, ale lepiej mieć dedykowany obrazek dla każdego artykułu.

