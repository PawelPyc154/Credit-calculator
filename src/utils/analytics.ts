export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageView = (url: string) => {
  if (process.env.VERCEL_ENV === 'production') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
    window.fbq('track', 'PageView')
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
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const eventFB = (eventType: 'trackCustom' | 'track', name: string, options = {}) => {
  if (process.env.VERCEL_ENV === 'production') {
    window.fbq(eventType, name, options)
  }
}

export const logEvent = (action: string, category: string, label: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}
