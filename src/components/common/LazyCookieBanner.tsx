'use client'

import dynamic from 'next/dynamic'

// Lazy load CookieBanner - nie blokuje pierwszego renderu
export const LazyCookieBanner = dynamic(
  () => import('./CookieBanner').then((mod) => ({ default: mod.CookieBanner })),
  {
    ssr: false, // Nie renderuj na serwerze - tylko po załadowaniu klienta
  },
)

