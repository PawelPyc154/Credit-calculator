import 'styles/globals.css'

import { AnalyticsTracker } from 'components/common/AnalyticsTracker'
import { LazyCookieBanner } from 'components/common/LazyCookieBanner'
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Script from 'next/script'
import { Suspense } from 'react'

import { TRPCReactProvider } from 'trpc/react'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.kredytanaliza.pl'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Kalkulator kredytu hipotecznego | Kalkulator Kredytowy',
    template: '%s | Kalkulator Kredytowy',
  },
  description:
    'Oblicz ratę kredytu hipotecznego i porównaj aktualne oferty banków w Polsce. Analizuj koszty, porównuj scenariusze i znajdź najlepiej dopasowane finansowanie.',
  keywords: [
    'kalkulator kredytu hipotecznego',
    'rata kredytu',
    'porównanie kredytów',
    'ranking banków',
    'zdolność kredytowa',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: siteUrl,
    siteName: 'Kalkulator Kredytowy',
    title: 'Kalkulator kredytu hipotecznego | Kalkulator Kredytowy',
    description:
      'Porównaj oferty kredytów hipotecznych z polskich banków i sprawdź realny koszt finansowania.',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Kalkulator kredytu hipotecznego - porównaj oferty banków',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kalkulator kredytu hipotecznego | Kalkulator Kredytowy',
    description: 'Oblicz ratę kredytu hipotecznego i porównaj oferty banków w jednym miejscu.',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Kalkulator kredytu hipotecznego',
      },
    ],
    creator: '@kredytanaliza',
    site: '@kredytanaliza',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
}

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap', // Prevents invisible text during font load
  preload: true, // Preloads font for better performance
})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const isProduction = process.env.NODE_ENV === 'production'

  return (
    <html lang="pl" className={`${geist.variable}`}>
      <head>
        {/* Resource hints dla lepszej wydajności */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        {isProduction && process.env.NEXT_PUBLIC_GA_TRACKING_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <LazyCookieBanner />
      </body>
    </html>
  )
}
