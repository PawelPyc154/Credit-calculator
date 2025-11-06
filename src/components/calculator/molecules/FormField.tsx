import clsx from 'clsx'
import { Tooltip } from 'components/common/tooltip'
import type { UseFormRegisterReturn } from 'react-hook-form'
import tw from 'tw-tailwind'

export type FormFieldProps = {
  id: string
  label: string
  value: string | number
  min: string
  max: string
  step: string
  register: UseFormRegisterReturn
  error?: string
  tooltipContent: React.ReactNode
  minLabel: string
  maxLabel: string
}

export const FormField = ({
  id,
  label,
  value,
  min,
  max,
  step,
  register,
  error,
  tooltipContent,
  minLabel,
  maxLabel,
}: FormFieldProps) => {
  return (
    <FormGroup>
      <LabelRow>
        <LabelWithTooltip>
          <Label htmlFor={id}>{label}</Label>
          <Tooltip content={tooltipContent}>
            <InfoIcon>ℹ️</InfoIcon>
          </Tooltip>
        </LabelWithTooltip>
        <ValueDisplay>{value}</ValueDisplay>
      </LabelRow>
      <SliderInput
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        {...register}
        className={clsx(error && 'border-red-500')}
      />
      <SliderLabels>
        <SliderLabel>{minLabel}</SliderLabel>
        <SliderLabel>{maxLabel}</SliderLabel>
      </SliderLabels>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormGroup>
  )
}

const FormGroup = tw.div`flex flex-col gap-3`
const LabelRow = tw.div`flex justify-between items-center`
const Label = tw.label`text-sm font-semibold text-gray-700 uppercase tracking-wide`
const ValueDisplay = tw.span`text-lg font-bold text-blue-600`

const SliderInput = tw.input`
  w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
  [&::-webkit-slider-thumb]:appearance-none
  [&::-webkit-slider-thumb]:w-5
  [&::-webkit-slider-thumb]:h-5
  [&::-webkit-slider-thumb]:rounded-full
  [&::-webkit-slider-thumb]:bg-blue-600
  [&::-webkit-slider-thumb]:cursor-pointer
  [&::-webkit-slider-thumb]:shadow-lg
  [&::-webkit-slider-thumb]:transition-all
  [&::-webkit-slider-thumb]:hover:bg-blue-700
  [&::-webkit-slider-thumb]:hover:scale-110
  [&::-moz-range-thumb]:w-5
  [&::-moz-range-thumb]:h-5
  [&::-moz-range-thumb]:rounded-full
  [&::-moz-range-thumb]:bg-blue-600
  [&::-moz-range-thumb]:border-0
  [&::-moz-range-thumb]:cursor-pointer
  [&::-moz-range-thumb]:shadow-lg
  [&::-moz-range-thumb]:transition-all
  [&::-moz-range-thumb]:hover:bg-blue-700
  [&::-moz-range-thumb]:hover:scale-110
`

const SliderLabels = tw.div`flex justify-between text-xs text-gray-500`
const SliderLabel = tw.span``
const ErrorMessage = tw.p`text-sm text-red-600`

const LabelWithTooltip = tw.div`flex items-center gap-2`
const InfoIcon = tw.span`cursor-help text-blue-500 hover:text-blue-700 transition-colors`
