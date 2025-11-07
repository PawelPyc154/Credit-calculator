'use client'

import clsx from 'clsx'
import tw from 'tw-tailwind'

const variantLabels = {
  copilot: 'Wersja A',
  cursor: 'Wersja B',
} as const

export type ExperimentVariant = keyof typeof variantLabels

export type ExperimentSwitchProps = {
  variant: ExperimentVariant
  onChange: (variant: ExperimentVariant) => void
  className?: string
}

export const ExperimentSwitch = ({ variant, onChange, className }: ExperimentSwitchProps) => {
  return (
    <SwitchWrapper
      className={clsx(className)}
      role="radiogroup"
      aria-label="Przełącz wariant kalkulatora"
    >
      {(Object.keys(variantLabels) as ExperimentVariant[]).map((key) => (
        <SwitchButton
          key={key}
          type="button"
          role="radio"
          aria-checked={variant === key}
          className={clsx(variant === key && 'is-active', key === 'cursor' && 'cursor-active')}
          onClick={() => onChange(key)}
        >
          <ButtonLabel>{variantLabels[key]}</ButtonLabel>
        </SwitchButton>
      ))}
    </SwitchWrapper>
  )
}

const SwitchWrapper = tw.div`
  inline-flex
  items-center
  gap-1
  rounded-full
  bg-white/80
  border border-white/40
  shadow-lg shadow-blue-900/10
  p-1
  backdrop-blur-sm
`

const SwitchButton = tw.button`
  relative
  px-3 py-1.5
  rounded-full
  text-xs sm:text-sm font-semibold
  text-gray-700
  transition-all duration-200
  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
  hover:text-blue-700
  hover:bg-white
  [&.is-active]:bg-linear-to-r [&.is-active]:from-blue-600 [&.is-active]:to-indigo-600
  [&.is-active]:text-white
  [&.is-active]:shadow-md
  [&.is-active.cursor-active]:!bg-linear-to-r [&.is-active.cursor-active]:!from-green-600 [&.is-active.cursor-active]:!to-emerald-600
  [&.is-active.cursor-active]:focus-visible:ring-green-400
`

const ButtonLabel = tw.span`whitespace-nowrap`
