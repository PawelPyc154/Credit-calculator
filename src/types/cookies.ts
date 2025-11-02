export type CookieConsent = {
  necessary: boolean // Zawsze true, nie można wyłączyć
  analytics: boolean // Google Analytics
  marketing: boolean // Google AdSense
}

export type CookiePreferences = {
  consent: CookieConsent
  timestamp: number
  version: string // Wersja polityki prywatności
}

export const COOKIE_CONSENT_KEY = 'cookie-consent'
export const COOKIE_POLICY_VERSION = '1.0'

export const DEFAULT_COOKIE_CONSENT: CookieConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
}
