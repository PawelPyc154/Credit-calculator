'use client'

import { useEffect, useMemo, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

import { useCookieConsent } from 'hooks/useCookieConsent'
import { pageView } from 'utils/analytics'

export function AnalyticsTracker() {
  const { consent } = useCookieConsent()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const prevPathRef = useRef<string | null>(null)

  const location = useMemo(() => {
    if (!pathname) {
      return null
    }

    const search = searchParams?.toString()
    return search ? `${pathname}?${search}` : pathname
  }, [pathname, searchParams])

  useEffect(() => {
    if (!consent?.analytics || !location) {
      return
    }

    if (prevPathRef.current === location) {
      return
    }

    pageView(location)
    prevPathRef.current = location
  }, [consent?.analytics, location])

  return null
}


