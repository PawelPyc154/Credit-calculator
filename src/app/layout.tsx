import 'styles/globals.css'

import { CookieBanner } from 'components/common/CookieBanner'
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Script from 'next/script'

import { TRPCReactProvider } from 'trpc/react'

export const metadata: Metadata = {
  title: 'Kalkulator Kredytowy | Porównaj oferty kredytów hipotecznych',
  description:
    'Porównaj oferty kredytów hipotecznych z różnych banków w Polsce. Znajdź najlepszy kredyt dostosowany do Twoich potrzeb. Oblicz ratę miesięczną i całkowity koszt kredytu.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
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
        {isProduction && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-ZZ0BQ4CWZE"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-ZZ0BQ4CWZE');
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <CookieBanner />
      </body>
    </html>
  )
}
