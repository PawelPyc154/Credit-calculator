# Szablon artykułu na bloga

## 📋 Checklist przed publikacją

- [ ] Artykuł ma minimum 1000 słów (optymalnie 1500-2500)
- [ ] Meta title i description są zoptymalizowane
- [ ] Fraza kluczowa w H1
- [ ] Minimum 2-3 CTA do kalkulatora
- [ ] 3-5 linków wewnętrznych
- [ ] 2-3 linki zewnętrzne do wiarygodnych źródeł
- [ ] Obrazy z alt text
- [ ] Schema.org Article markup
- [ ] FAQ schema (jeśli odpowiednie)
- [ ] Artykuł dodany do `/src/app/blog/page.tsx`
- [ ] Sitemap zaktualizowany

## 📝 Struktura pliku artykułu

```typescript
// src/app/blog/[slug]/page.tsx

import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import { HiOutlineArrowLongRight } from 'react-icons/hi2'
import tw from 'tw-tailwind'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {
  title: 'Tytuł artykułu | Kalkulator Kredytowy',
  description: 'Meta description 150-160 znaków z frazą kluczową i CTA',
  alternates: {
    canonical: `${siteUrl}/blog/[slug]`,
  },
  keywords: [
    'fraza kluczowa 1',
    'fraza kluczowa 2',
    'fraza kluczowa 3',
    // ... więcej fraz
  ],
  openGraph: {
    title: 'Tytuł artykułu | Kalkulator Kredytowy',
    description: 'Opis dla Open Graph',
    url: `${siteUrl}/blog/[slug]`,
    type: 'article',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Opis obrazu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tytuł artykułu',
    description: 'Opis dla Twitter',
    images: [`${siteUrl}/og-image.jpg`],
  },
}

// Schema.org Article
const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Tytuł artykułu',
  description: 'Opis artykułu',
  author: {
    '@type': 'Organization',
    name: 'Kalkulator Kredytowy',
    url: siteUrl,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Kalkulator Kredytowy',
    url: siteUrl,
  },
  datePublished: '2025-11-12', // Data publikacji
  dateModified: '2025-11-12', // Data modyfikacji
  mainEntityOfPage: `${siteUrl}/blog/[slug]`,
  articleSection: ['Kategoria 1', 'Kategoria 2'],
  keywords: metadata.keywords,
}

// FAQ Schema (jeśli artykuł zawiera FAQ)
const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Pytanie 1?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Odpowiedź na pytanie 1.',
      },
    },
    // ... więcej pytań
  ],
}

const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

export default function ArticlePage() {
  const articleJsonLd = toJsonLd(articleStructuredData)
  const faqJsonLd = toJsonLd(faqStructuredData)

  return (
    <PageWrapper>
      <ContentContainer>
        {/* Schema.org */}
        <script type="application/ld+json" suppressHydrationWarning>
          {articleJsonLd}
        </script>
        {faqStructuredData && (
          <script type="application/ld+json" suppressHydrationWarning>
            {faqJsonLd}
          </script>
        )}

        {/* Link powrotu do bloga */}
        <BackLink href="/blog">
          <BackIcon aria-hidden="true">←</BackIcon>
          Wróć do bloga
        </BackLink>

        {/* Hero Section */}
        <HeroSection>
          <HeroEyebrow>Kategoria</HeroEyebrow>
          <HeroTitle>Tytuł artykułu (H1 z frazą kluczową)</HeroTitle>
          <HeroLead>
            Wstęp artykułu (150-200 słów) - odpowiada na pytanie użytkownika i wprowadza temat.
            Wspomina o kalkulatorze jako narzędziu pomocnym w temacie.
          </HeroLead>
          <HeroActions>
            <PrimaryCta href="/kalkulator/kredyt-hipoteczny">
              Przejdź do kalkulatora
              <HiOutlineArrowLongRight size={18} />
            </PrimaryCta>
          </HeroActions>
        </HeroSection>

        {/* Spis treści (opcjonalnie dla długich artykułów) */}
        <TableOfContents>
          <TocTitle>Spis treści</TocTitle>
          <TocList>
            <li><a href="#sekcja-1">Sekcja 1</a></li>
            <li><a href="#sekcja-2">Sekcja 2</a></li>
            {/* ... */}
          </TocList>
        </TableOfContents>

        {/* Główna treść */}
        <ArticleContent>
          {/* Sekcja 1 */}
          <Section id="sekcja-1">
            <SectionTitle>Nagłówek H2 z frazą długiego ogona</SectionTitle>
            <SectionText>
              Treść sekcji. Minimum 200-300 słów na sekcję. Naturalne użycie fraz kluczowych.
            </SectionText>
            
            {/* CTA w środku artykułu */}
            <CtaBox>
              <CtaTitle>Sprawdź w kalkulatorze</CtaTitle>
              <CtaText>
                Oblicz [konkretną rzecz] już teraz - użyj naszego kalkulatora kredytu hipotecznego.
              </CtaText>
              <CtaButton href="/kalkulator/kredyt-hipoteczny">
                Przejdź do kalkulatora
                <HiOutlineArrowLongRight size={18} />
              </CtaButton>
            </CtaBox>

            {/* Lista punktowana */}
            <BulletList>
              <li>Punkt 1</li>
              <li>Punkt 2</li>
              {/* ... */}
            </BulletList>
          </Section>

          {/* Sekcja 2 */}
          <Section id="sekcja-2">
            <SectionTitle>Nagłówek H2</SectionTitle>
            <SectionText>Treść...</SectionText>
            
            {/* Tabela (jeśli odpowiednie) */}
            <ComparisonTable>
              {/* Tabela porównawcza */}
            </ComparisonTable>
          </Section>

          {/* FAQ Section */}
          <Section id="faq">
            <SectionTitle>Najczęściej zadawane pytania</SectionTitle>
            <FaqList>
              <FaqItem>
                <FaqQuestion>Pytanie 1?</FaqQuestion>
                <FaqAnswer>Odpowiedź na pytanie 1.</FaqAnswer>
              </FaqItem>
              {/* ... więcej pytań */}
            </FaqList>
          </Section>

          {/* Podsumowanie z CTA */}
          <SummarySection>
            <SummaryTitle>Podsumowanie</SummaryTitle>
            <SummaryText>
              Podsumowanie głównych punktów artykułu. Wzmianka o kalkulatorze jako narzędziu
              do dalszej analizy.
            </SummaryText>
            <SummaryCta href="/kalkulator/kredyt-hipoteczny">
              Sprawdź swoje parametry w kalkulatorze
              <HiOutlineArrowLongRight size={18} />
            </SummaryCta>
          </SummarySection>
        </ArticleContent>
      </ContentContainer>
      <FooterMain />
    </PageWrapper>
  )
}

// Styled components (użyj istniejących z zagrozenia-kredytowe/page.tsx jako wzoru)
const PageWrapper = tw.main`min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-100`
const ContentContainer = tw.div`mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20`
// ... więcej styled components
```

## 🎨 Komponenty do użycia

### Linki do kalkulatora

```typescript
// Przycisk CTA
<PrimaryCta href="/kalkulator/kredyt-hipoteczny">
  Tekst CTA
  <HiOutlineArrowLongRight size={18} />
</PrimaryCta>

// Link tekstowy w treści
<Link href="/kalkulator/kredyt-hipoteczny" className="text-emerald-600 hover:text-emerald-700">
  kalkulatorze kredytu hipotecznego
</Link>

// Box z CTA
<CtaBox>
  <CtaTitle>Tytuł</CtaTitle>
  <CtaText>Tekst zachęcający</CtaText>
  <CtaButton href="/kalkulator/kredyt-hipoteczny">
    Przejdź do kalkulatora
  </CtaButton>
</CtaBox>
```

### Linki wewnętrzne

```typescript
// Link do innego artykułu
<Link href="/blog/inny-artykul" className="text-emerald-600 hover:text-emerald-700">
  tekst linku
</Link>

// Link do strony głównej
<Link href="/" className="text-emerald-600 hover:text-emerald-700">
  kalkulatorze kredytowym
</Link>
```

## 📊 Przykładowe struktury treści

### Artykuł poradnikowy

1. Wstęp (150-200 słów)
2. Co to jest [temat]? (200-300 słów)
3. Jak [zrobić X]? (300-400 słów)
4. Krok po kroku (lista numerowana)
5. Najczęstsze błędy (200-300 słów)
6. FAQ (5-10 pytań)
7. Podsumowanie + CTA

### Artykuł porównawczy

1. Wstęp (150-200 słów)
2. Krótkie wprowadzenie do tematu (200-300 słów)
3. Porównanie opcji (tabela + opis)
4. Zalety i wady każdej opcji
5. Która opcja jest najlepsza? (200-300 słów)
6. FAQ
7. Podsumowanie + CTA

### Artykuł aktualnościowy

1. Wstęp z kontekstem (150-200 słów)
2. Co się zmienia? (300-400 słów)
3. Jak to wpływa na kredytobiorców? (300-400 słów)
4. Co to oznacza dla Ciebie? (200-300 słów)
5. Co dalej? (200-300 słów)
6. FAQ
7. Podsumowanie + CTA

## ✅ Checklist SEO

### Przed publikacją:

- [ ] **Meta title:** 50-60 znaków, zawiera główną frazę kluczową
- [ ] **Meta description:** 150-160 znaków, zawiera CTA
- [ ] **H1:** Zawiera główną frazę kluczową, tylko jeden H1 na stronę
- [ ] **H2-H4:** Zawierają frazy długiego ogona, logiczna hierarchia
- [ ] **Długość:** Minimum 1000 słów (optymalnie 1500-2500)
- [ ] **Frazy kluczowe:** Naturalne użycie, gęstość 1-2%
- [ ] **Linki wewnętrzne:** 3-5 linków do innych artykułów/kalkulatora
- [ ] **Linki zewnętrzne:** 2-3 do wiarygodnych źródeł
- [ ] **Obrazy:** Alt text z frazami kluczowymi, odpowiednie rozmiary
- [ ] **Schema.org:** Article schema + FAQ (jeśli odpowiednie)
- [ ] **CTA:** Minimum 2-3 linki do kalkulatora
- [ ] **Mobile-friendly:** Responsywny design
- [ ] **Czytelność:** Krótkie akapity, listy, nagłówki

### Po publikacji:

- [ ] Dodano do `/src/app/blog/page.tsx`
- [ ] Zaktualizowano `sitemap.ts`
- [ ] Sprawdzono działanie linków
- [ ] Zweryfikowano w Google Search Console
- [ ] Udostępniono w mediach społecznościowych

## 🔗 Przykładowe linki do użycia

### Linki do kalkulatora z parametrami (opcjonalnie):

```typescript
// Z kwotą kredytu
href="/kalkulator/kredyt-hipoteczny?amount=500000"

// Z okresem kredytowania
href="/kalkulator/kredyt-hipoteczny?period=25"

// Kombinacja parametrów
href="/kalkulator/kredyt-hipoteczny?amount=500000&period=25&downPayment=20"
```

### Linki wewnętrzne do innych artykułów:

- `/blog/zagrozenia-kredytowe` - o ryzykach
- `/blog/jak-obliczyc-zdolnosc-kredytowa` - o zdolności kredytowej
- `/blog/wklad-wlasny-kredyt-hipoteczny` - o wkładzie własnym
- `/blog/rrso-kredyt-hipoteczny` - o RRSO

## 📝 Przykładowe teksty CTA

1. "Sprawdź swoją zdolność kredytową w naszym kalkulatorze"
2. "Oblicz ratę kredytu już teraz - użyj naszego kalkulatora"
3. "Porównaj oferty banków w jednym miejscu - kalkulator kredytowy"
4. "Zobacz, jak zmiana parametrów wpływa na ratę - sprawdź w kalkulatorze"
5. "Przelicz kredyt samodzielnie - nasz kalkulator pomoże"
6. "Sprawdź aktualne oferty w kalkulatorze"
7. "Wypróbuj nasz kalkulator już teraz"
8. "Przejdź do kalkulatora i sprawdź swoje parametry"

---

**Uwaga:** Używaj różnych tekstów CTA w różnych miejscach artykułu, aby uniknąć powtórzeń.

