# Strategia utrzymania aktualności dat w artykułach blogowych

## Problem

Artykuły z konkretnym rokiem w tytule (np. "2025") mogą wyglądać na przestarzałe w kolejnym roku, nawet jeśli treść jest nadal aktualna.

## Strategie rozwiązania

### Opcja 1: Użycie bardziej ogólnych sformułowań (ZALECANE)

**Zalety:**
- Nie wymaga aktualizacji co rok
- Artykuły pozostają aktualne przez wiele lat
- Lepsze dla SEO (treść evergreen)

**Przykłady:**
- ❌ "Jak obliczyć zdolność kredytową? Przewodnik 2025"
- ✅ "Jak obliczyć zdolność kredytową? Kompletny przewodnik"
- ✅ "Jak obliczyć zdolność kredytową? Aktualny przewodnik"

- ❌ "Ranking banków kredytów hipotecznych 2025"
- ✅ "Ranking banków kredytów hipotecznych - najlepsze oferty"
- ✅ "Aktualny ranking banków kredytów hipotecznych"

### Opcja 2: Automatyczna aktualizacja roku

**Zalety:**
- Zachowuje konkretny rok w tytule (dobre dla SEO)
- Automatyczna aktualizacja

**Wady:**
- Wymaga skryptu do aktualizacji
- Może wprowadzać w błąd (treść z 2025 z rokiem 2026)

### Opcja 3: Użycie roku tylko w artykułach czasowych

**Zalety:**
- Rok tylko tam, gdzie jest potrzebny (np. zmiany w przepisach)
- Większość artykułów bez roku

**Przykłady:**
- ✅ "Kredyt hipoteczny 2025 - zmiany w przepisach" (czasowe)
- ✅ "Jak obliczyć zdolność kredytową?" (evergreen, bez roku)

## Rekomendacja

**Użyj kombinacji Opcji 1 i 3:**

1. **Artykuły evergreen** (podstawy, poradniki) → bez roku w tytule
   - "Jak obliczyć zdolność kredytową?"
   - "Wkład własny na kredyt hipoteczny"
   - "RRSO kredytu hipotecznego - co to jest?"

2. **Artykuły czasowe** (rankingi, zmiany przepisów) → z rokiem
   - "Ranking banków kredytów hipotecznych 2025"
   - "Kredyt hipoteczny 2025 - zmiany w przepisach"

3. **Aktualizacja rok do roku:**
   - Rankingi → aktualizuj rok + treść (nowe dane)
   - Zmiany przepisów → aktualizuj rok + treść (nowe przepisy)
   - Poradniki → pozostaw bez roku (treść evergreen)

## Skrypty pomocnicze

### Sprawdzanie artykułów wymagających aktualizacji

```bash
yarn tsx scripts/check-date-consistency.ts
```

### Automatyczna aktualizacja roku (jeśli potrzebna)

```bash
yarn tsx scripts/update-years-to-2026.ts
```

## Harmonogram aktualizacji

### Co rok (styczeń):
1. Sprawdź rankingi → zaktualizuj rok + dane
2. Sprawdź artykuły o przepisach → zaktualizuj rok + treść
3. Poradniki evergreen → pozostaw bez zmian

### Co kwartał:
1. Sprawdź czy rankingi wymagają aktualizacji danych
2. Sprawdź czy przepisy się zmieniły

## Przykłady aktualizacji

### Ranking banków (wymaga aktualizacji)
- 2025: "Ranking banków kredytów hipotecznych 2025"
- 2026: "Ranking banków kredytów hipotecznych 2026" + zaktualizuj dane

### Poradnik (nie wymaga aktualizacji)
- 2025: "Jak obliczyć zdolność kredytową?"
- 2026: "Jak obliczyć zdolność kredytową?" (bez zmian)

### Zmiany przepisów (wymaga aktualizacji)
- 2025: "Kredyt hipoteczny 2025 - zmiany w przepisach"
- 2026: "Kredyt hipoteczny 2026 - zmiany w przepisach" + zaktualizuj treść

