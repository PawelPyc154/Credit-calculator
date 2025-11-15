import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export function generateStructuredDataLoanCalculator(_params: {
  loanAmount: number
  loanPeriod: number
  downPayment: number
  monthlyIncome: number
  purpose: string
  interestRateType: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Kalkulator kredytu hipotecznego',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'PLN',
    },
    description:
      'Oblicz ratę kredytu hipotecznego i porównaj aktualne oferty banków w Polsce. Analizuj koszty, porównuj scenariusze i znajdź najlepiej dopasowane finansowanie.',
    url: `${siteUrl}/kalkulator/kredyt-hipoteczny`,
    featureList: [
      'Kalkulacja raty miesięcznej',
      'Porównanie ofert banków',
      'Analiza kosztów całkowitych',
      'Obliczanie RRSO',
      'Symulacje scenariuszy',
    ],
  }
}

export function generateStructuredDataFinancialProduct(params: {
  bankName: string
  monthlyPayment: number
  totalCost: number
  rrso: number
  loanAmount: number
  loanPeriod: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: `Kredyt hipoteczny - ${params.bankName}`,
    provider: {
      '@type': 'BankOrCreditUnion',
      name: params.bankName,
    },
    feesAndCommissionsSpecification: {
      '@type': 'PriceSpecification',
      price: params.monthlyPayment,
      priceCurrency: 'PLN',
      valueAddedTaxIncluded: true,
    },
    annualPercentageRate: {
      '@type': 'QuantitativeValue',
      value: params.rrso,
      unitCode: 'P1',
    },
    loanTerm: {
      '@type': 'QuantitativeValue',
      value: params.loanPeriod,
      unitCode: 'ANN',
    },
    loanAmount: {
      '@type': 'MonetaryAmount',
      value: params.loanAmount,
      currency: 'PLN',
    },
  }
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  }
}

export function generateCalculatorMetadata(): Metadata {
  return {
    title: 'Kalkulator kredytu hipotecznego | Kalkulator Kredytowy',
    description:
      'Oblicz ratę kredytu hipotecznego i porównaj aktualne oferty banków w Polsce. Analizuj koszty, porównuj scenariusze i znajdź najlepiej dopasowane finansowanie.',
    keywords: [
      'kalkulator kredytu hipotecznego',
      'rata kredytu',
      'porównanie kredytów',
      'ranking banków',
      'zdolność kredytowa',
      'kredyt hipoteczny 2025',
      'oprocentowanie kredytu',
      'RRSO kredytu',
    ],
    openGraph: {
      type: 'website',
      locale: 'pl_PL',
      url: `${siteUrl}/kalkulator/kredyt-hipoteczny`,
      siteName: 'Kalkulator Kredytowy',
      title: 'Kalkulator kredytu hipotecznego | Kalkulator Kredytowy',
      description:
        'Oblicz ratę kredytu hipotecznego i porównaj aktualne oferty banków w Polsce. Analizuj koszty, porównuj scenariusze i znajdź najlepiej dopasowane finansowanie.',
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Kalkulator kredytu hipotecznego - porównaj oferty banków',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Kalkulator kredytu hipotecznego | Kalkulator Kredytowy',
      description:
        'Oblicz ratę kredytu hipotecznego i porównaj aktualne oferty banków w jednym miejscu.',
      images: [`${siteUrl}/og-image.jpg`],
      creator: '@kredytanaliza',
    },
    alternates: {
      canonical: '/kalkulator/kredyt-hipoteczny',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}
