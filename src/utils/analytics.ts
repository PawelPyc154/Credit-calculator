export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

// Sprawdź czy jesteśmy w środowisku produkcyjnym
const isProduction = process.env.NODE_ENV === 'production'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageView = (url: string) => {
  if (isProduction && typeof window !== 'undefined') {
    window.gtag?.('config', GA_TRACKING_ID, {
      page_path: url,
    })
    window.fbq?.('track', 'PageView')
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events

const Actions = {
  test: 'test',
}
type ActionsType = keyof typeof Actions

const Category = {
  test: 'test',
}
type CategoryType = keyof typeof Category

export const eventGoogle = ({
  action,
  category,
  label,
  value,
}: {
  action: ActionsType
  category: CategoryType
  label: string
  value: string
}) => {
  if (isProduction && typeof window !== 'undefined') {
    window.gtag?.('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const eventFB = (eventType: 'trackCustom' | 'track', name: string, options = {}) => {
  if (isProduction && typeof window !== 'undefined') {
    window.fbq?.(eventType, name, options)
  }
}

export const logEvent = (action: string, category: string, label: string, value?: number) => {
  if (isProduction && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// ============================================
// Rozszerzone eventy dla kalkulatora kredytów
// ============================================

/**
 * Śledzi obliczenie kredytu w kalkulatorze
 */
export const trackCalculation = (params: {
  loanAmount: number
  loanPeriod: number
  downPayment: number
  monthlyIncome: number
  purpose: string
  interestRateType: string
  resultsCount: number
}) => {
  if (isProduction && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'calculate_loan', {
      event_category: 'calculator',
      event_label: 'Obliczenie kredytu',
      loan_amount: params.loanAmount,
      loan_period: params.loanPeriod,
      down_payment: params.downPayment,
      monthly_income: params.monthlyIncome,
      purpose: params.purpose,
      interest_rate_type: params.interestRateType,
      results_count: params.resultsCount,
      value: params.resultsCount,
    })
  }
}

/**
 * Śledzi zmianę parametru w formularzu
 */
export const trackParameterChange = (params: {
  field: string
  oldValue: number | string
  newValue: number | string
}) => {
  if (isProduction && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'parameter_change', {
      event_category: 'calculator',
      event_label: `Zmiana: ${params.field}`,
      parameter_name: params.field,
      old_value: String(params.oldValue),
      new_value: String(params.newValue),
    })
  }
}

/**
 * Śledzi kliknięcie w link partnerski (affiliate)
 */
export const trackAffiliateClick = (params: {
  bankName: string
  bankId: string
  campaignId?: string
  position: number
  loanAmount?: number
  monthlyPayment?: number
}) => {
  if (isProduction && typeof window !== 'undefined' && window.gtag) {
    // Event dla GA4
    window.gtag('event', 'affiliate_click', {
      event_category: 'conversion',
      event_label: `Kliknięcie: ${params.bankName}`,
      bank_name: params.bankName,
      bank_id: params.bankId,
      campaign_id: params.campaignId || '',
      position: params.position,
      loan_amount: params.loanAmount,
      monthly_payment: params.monthlyPayment,
      value: params.position === 1 ? 100 : params.position === 2 ? 50 : 25, // Wartość konwersji zależna od pozycji
    })

    // Conversion event dla lepszego śledzenia (GA4)
    window.gtag('event', 'conversion', {
      event_category: 'conversion',
      event_label: `Konwersja: ${params.bankName}`,
      bank_name: params.bankName,
      value: params.position === 1 ? 100 : params.position === 2 ? 50 : 25,
    })
  }
}

/**
 * Śledzi rozwinięcie szczegółów oferty banku
 */
export const trackBankDetailsExpand = (params: {
  bankName: string
  bankId: string
  position: number
}) => {
  if (isProduction && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_bank_details', {
      event_category: 'engagement',
      event_label: `Szczegóły: ${params.bankName}`,
      bank_name: params.bankName,
      bank_id: params.bankId,
      position: params.position,
    })
  }
}

/**
 * Śledzi scroll do sekcji wyników
 */
export const trackScrollToResults = () => {
  if (isProduction && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll_to_results', {
      event_category: 'engagement',
      event_label: 'Scroll do wyników',
    })
  }
}

/**
 * Śledzi użycie slidera vs input
 */
export const trackInputModeToggle = (mode: 'slider' | 'input') => {
  if (isProduction && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'toggle_input_mode', {
      event_category: 'ui',
      event_label: `Tryb: ${mode}`,
      input_mode: mode,
    })
  }
}

type NarrationEventAction =
  | 'start'
  | 'resume'
  | 'pause'
  | 'next'
  | 'prev'
  | 'auto_next'
  | 'section_jump'
  | 'cta'
  | 'close'
  | 'script_open'
  | 'script_close'

export const trackNarrationEvent = (params: {
  action: NarrationEventAction
  bankId: string
  bankName: string
  sectionId?: string
  source: 'sticky' | 'modal'
}) => {
  if (isProduction && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', `narration_${params.action}`, {
      event_category: 'narration',
      event_label: `${params.source}: ${params.bankName}`,
      bank_id: params.bankId,
      bank_name: params.bankName,
      section_id: params.sectionId ?? '',
      narration_source: params.source,
    })
  }
}

/**
 * Śledzi zmianę typu oprocentowania
 */
export const trackInterestRateTypeChange = (type: 'fixed' | 'variable') => {
  if (isProduction && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'interest_rate_type_change', {
      event_category: 'calculator',
      event_label: `Typ: ${type === 'fixed' ? 'Stałe' : 'Zmienne'}`,
      interest_rate_type: type,
    })
  }
}

/**
 * Śledzi zmianę celu kredytu
 */
export const trackPurposeChange = (purpose: string) => {
  if (isProduction && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purpose_change', {
      event_category: 'calculator',
      event_label: `Cel: ${purpose}`,
      purpose: purpose,
    })
  }
}

/**
 * Śledzi czas spędzony na stronie (engagement)
 */
export const trackTimeOnPage = (seconds: number) => {
  if (isProduction && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'time_on_page', {
      event_category: 'engagement',
      event_label: 'Czas na stronie',
      value: seconds,
    })
  }
}
