import 'styles/globals.css'

import { AnalyticsTracker } from 'components/common/AnalyticsTracker'
import { CookieBanner } from 'components/common/CookieBanner'
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
        alt: 'Kalkulator kredytu hipotecznego',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kalkulator kredytu hipotecznego | Kalkulator Kredytowy',
    description: 'Oblicz ratę kredytu hipotecznego i porównaj oferty banków w jednym miejscu.',
    images: [`${siteUrl}/og-image.jpg`],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
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

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const isProduction = process.env.NODE_ENV === 'production'

  return (
    <html lang="pl" className={`${geist.variable}`}>
      <head>
        {isProduction && process.env.NEXT_PUBLIC_GA_TRACKING_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
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
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <CookieBanner />
      </body>
    </html>
  )
}
