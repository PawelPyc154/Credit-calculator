'use client'

import { useCallback, useEffect, useState } from 'react'
import type { CookieConsent, CookiePreferences } from 'types/cookies'
import { COOKIE_CONSENT_KEY, COOKIE_POLICY_VERSION, DEFAULT_COOKIE_CONSENT } from 'types/cookies'

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  // Zastosowanie zgód (włączenie/wyłączenie skryptów)
  const applyConsent = useCallback((newConsent: CookieConsent) => {
    // Google Analytics
    if (newConsent.analytics) {
      enableGoogleAnalytics()
    } else {
      disableGoogleAnalytics()
    }

    // Google AdSense
    if (newConsent.marketing) {
      enableGoogleAdSense()
    } else {
      disableGoogleAdSense()
    }
  }, [])

  // Ładowanie zgód z localStorage
  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (stored) {
      try {
        const preferences: CookiePreferences = JSON.parse(stored)
        // Sprawdź czy wersja polityki się zgadza
        if (preferences.version === COOKIE_POLICY_VERSION) {
          setConsent(preferences.consent)
          applyConsent(preferences.consent)
        } else {
          // Stara wersja - pokaż banner ponownie
          setShowBanner(true)
        }
      } catch {
        setShowBanner(true)
      }
    } else {
      setShowBanner(true)
    }
  }, [applyConsent])

  // Zapisywanie zgód
  const saveConsent = useCallback(
    (newConsent: CookieConsent) => {
      const preferences: CookiePreferences = {
        consent: newConsent,
        timestamp: Date.now(),
        version: COOKIE_POLICY_VERSION,
      }

      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferences))
      setConsent(newConsent)
      setShowBanner(false)
      setShowSettings(false)
      applyConsent(newConsent)
    },
    [applyConsent],
  )

  // Akceptacja wszystkich zgód
  const acceptAll = useCallback(() => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    })
  }, [saveConsent])

  // Odrzucenie opcjonalnych zgód
  const rejectAll = useCallback(() => {
    saveConsent(DEFAULT_COOKIE_CONSENT)
  }, [saveConsent])

  // Akceptacja wybranych zgód
  const acceptSelected = useCallback(
    (selectedConsent: Partial<CookieConsent>) => {
      saveConsent({
        necessary: true, // Zawsze true
        analytics: selectedConsent.analytics ?? false,
        marketing: selectedConsent.marketing ?? false,
      })
    },
    [saveConsent],
  )

  const openSettings = useCallback(() => {
    setShowSettings(true)
  }, [])

  const closeSettings = useCallback(() => {
    setShowSettings(false)
  }, [])

  // Resetowanie zgód (do testowania lub zmiany preferencji)
  const resetConsent = useCallback(() => {
    localStorage.removeItem(COOKIE_CONSENT_KEY)
    setConsent(null)
    setShowBanner(true)
    setShowSettings(false)
    disableGoogleAnalytics()
    disableGoogleAdSense()
  }, [])

  return {
    consent,
    showBanner,
    showSettings,
    acceptAll,
    rejectAll,
    acceptSelected,
    resetConsent,
    openSettings,
    closeSettings,
  }
}

// Funkcje pomocnicze do włączania/wyłączania skryptów

function enableGoogleAnalytics() {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = window.gtag as (
      command: string,
      action: string,
      params: Record<string, string>,
    ) => void
    gtag('consent', 'update', {
      analytics_storage: 'granted',
    })
  }
}

function disableGoogleAnalytics() {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = window.gtag as (
      command: string,
      action: string,
      params: Record<string, string>,
    ) => void
    gtag('consent', 'update', {
      analytics_storage: 'denied',
    })
  }
}

function enableGoogleAdSense() {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = window.gtag as (
      command: string,
      action: string,
      params: Record<string, string>,
    ) => void
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    })
  }
}

function disableGoogleAdSense() {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = window.gtag as (
      command: string,
      action: string,
      params: Record<string, string>,
    ) => void
    gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })
  }
}
