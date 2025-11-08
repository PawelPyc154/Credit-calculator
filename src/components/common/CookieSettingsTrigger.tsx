'use client'

import { forwardRef } from 'react'
import tw from 'tw-tailwind'

type CookieSettingsTriggerProps = React.ComponentPropsWithoutRef<'button'>

const TriggerButton = tw.button`
  inline-flex items-center gap-1 text-sm text-gray-500 transition-colors
  hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white
`

export const CookieSettingsTrigger = forwardRef<HTMLButtonElement, CookieSettingsTriggerProps>(
  ({ children = 'Preferencje cookies', ...props }, ref) => {
    return (
      <TriggerButton
        {...props}
        ref={ref}
        type="button"
        onClick={(event) => {
          props.onClick?.(event)
          if (!event.defaultPrevented && typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('cookie-consent-open-settings'))
          }
        }}
      >
        {children}
      </TriggerButton>
    )
  },
)

CookieSettingsTrigger.displayName = 'CookieSettingsTrigger'

