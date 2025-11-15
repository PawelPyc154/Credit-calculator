# Rekomendacje ulepszeń artykułów na bloga

## 📊 Analiza obecnego stanu

### ✅ Co działa dobrze:
- ✅ Wszystkie artykuły mają structured data Article (Schema.org)
- ✅ Wszystkie artykuły mają FAQ schema (FAQPage)
- ✅ Każdy artykuł ma minimum 2-3 CTA do kalkulatora
- ✅ Spójna struktura (H1, H2, sekcje)
- ✅ SEO meta tags (title, description, keywords, canonical)
- ✅ Open Graph i Twitter Cards

### ⚠️ Obszary wymagające ulepszeń:

#### 1. **Linki wewnętrzne między artykułami** (PRIORYTET WYSOKI)
**Problem:** Artykuły nie mają linków do innych artykułów na blogu, co zmniejsza:
- SEO (link juice, internal linking)
- Czas spędzony na stronie
- Zaangażowanie użytkowników
- Indeksowanie przez Google

**Rekomendacja:** 
- Dodać 3-5 linków wewnętrznych do powiązanych artykułów w każdym artykule
- Umieścić linki w naturalnych miejscach w treści
- Używać anchor text z frazami kluczowymi

**Przykłady powiązań:**
- "Jak obliczyć zdolność kredytową?" → link do "Wkład własny", "RRSO", "Ranking banków"
- "Wkład własny" → link do "Zdolność kredytowa", "Kredyt bez wkładu", "Programy dla młodych"
- "RRSO" → link do "Oprocentowanie stałe/zmienne", "Ukryte koszty", "Ranking banków"

#### 2. **Aktualizacja dat publikacji w structured data**
**Problem:** Wszystkie artykuły mają daty z 2025-11-12, co nie jest zgodne z harmonogramem publikacji.

**Rekomendacja:**
- Zaktualizować `datePublished` i `dateModified` zgodnie z harmonogramem z `BLOG_STATUS.md`
- Używać rzeczywistych dat publikacji

#### 3. **Dodanie linków do powiązanych artykułów w sekcji końcowej**
**Problem:** Brak sekcji "Zobacz też" lub "Powiązane artykuły" na końcu artykułów.

**Rekomendacja:**
- Dodać sekcję z 3-4 powiązanymi artykułami przed podsumowaniem
- Używać atrakcyjnych kart z tytułami i krótkimi opisami

#### 4. **Optymalizacja anchor text w CTA**
**Problem:** CTA używają głównie ogólnych tekstów jak "Sprawdź w kalkulatorze".

**Rekomendacja:**
- Używać bardziej specyficznych anchor text z frazami kluczowymi
- Przykłady: "Oblicz swoją zdolność kredytową", "Porównaj oferty banków", "Sprawdź RRSO"

#### 5. **Dodanie breadcrumbs schema**
**Problem:** Brak breadcrumbs structured data, co może poprawić SEO.

**Rekomendacja:**
- Dodać BreadcrumbList schema do każdego artykułu
- Struktura: Strona główna > Blog > Kategoria > Artykuł

#### 6. **Sprawdzenie długości treści**
**Problem:** Niektóre artykuły mogą być zbyt krótkie (< 1500 słów).

**Rekomendacja:**
- Sprawdzić długość każdego artykułu
- Dodać więcej szczegółów, przykładów, case studies tam gdzie potrzeba

#### 7. **Dodanie obrazów z alt text**
**Problem:** Artykuły nie mają obrazów, co zmniejsza atrakcyjność i SEO.

**Rekomendacja:**
- Dodać obrazy ilustracyjne do każdego artykułu
- Używać opisowych alt text z frazami kluczowymi
- Optymalizować rozmiary obrazów

#### 8. **Sprawdzenie spójności terminologii**
**Problem:** Możliwe różnice w terminologii między artykułami.

**Rekomendacja:**
- Upewnić się, że wszystkie artykuły używają spójnej terminologii
- Używać tych samych definicji pojęć

## 🎯 Plan działania

### Faza 1: Linki wewnętrzne (PRIORYTET)
1. Stworzyć mapę powiązań między artykułami
2. Dodać linki wewnętrzne do wszystkich artykułów
3. Umieścić linki w naturalnych miejscach w treści

### Faza 2: Structured data
1. Zaktualizować daty publikacji
2. Dodać breadcrumbs schema
3. Sprawdzić poprawność wszystkich structured data

### Faza 3: Treść i SEO
1. Dodać sekcję "Powiązane artykuły"
2. Zoptymalizować anchor text w CTA
3. Sprawdzić i poprawić długość treści

### Faza 4: Obrazy i multimedia
1. Dodać obrazy ilustracyjne
2. Zoptymalizować alt text
3. Dodać infografiki gdzie odpowiednie

## 📝 Przykładowe mapowanie linków wewnętrznych

### Artykuł: "Jak obliczyć zdolność kredytową?"
**Linki do:**
- "Wkład własny na kredyt hipoteczny" (w sekcji o czynnikach wpływających)
- "RRSO kredytu hipotecznego" (w sekcji o porównywaniu ofert)
- "Ranking banków kredytów hipotecznych" (w sekcji o wyborze banku)
- "Jak wybrać najlepszy kredyt hipoteczny?" (w podsumowaniu)

### Artykuł: "Wkład własny na kredyt hipoteczny"
**Linki do:**
- "Jak obliczyć zdolność kredytową?" (w sekcji o obliczaniu)
- "Kredyt hipoteczny bez wkładu własnego" (w sekcji o alternatywach)
- "Kredyt hipoteczny dla młodych - programy wsparcia" (w sekcji o programach)
- "Ranking banków" (w sekcji o wymaganiach banków)

### Artykuł: "RRSO kredytu hipotecznego"
**Linki do:**
- "Oprocentowanie kredytu - stałe czy zmienne?" (w sekcji o oprocentowaniu)
- "Ukryte koszty kredytu hipotecznego" (w sekcji o kosztach)
- "Ranking banków" (w sekcji o porównywaniu)
- "Jak wybrać najlepszy kredyt hipoteczny?" (w podsumowaniu)

## 🔄 Ostatnia aktualizacja

2025-11-12 - Utworzono dokument z rekomendacjami ulepszeń

