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
  useSlider?: boolean
  onDecrease?: () => void
  onIncrease?: () => void
  isDecreaseDisabled?: boolean
  isIncreaseDisabled?: boolean
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
  useSlider = true,
  onDecrease,
  onIncrease,
  isDecreaseDisabled = false,
  isIncreaseDisabled = false,
}: FormFieldProps) => {
  return (
    <FormGroup>
      <LabelRow>
        <LabelWithTooltip>
          <Label htmlFor={id}>{label}</Label>
          <Tooltip content={tooltipContent}>
            <InfoIcon>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <title>Informacja</title>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </InfoIcon>
          </Tooltip>
        </LabelWithTooltip>
        <ValueDisplay>{value}</ValueDisplay>
      </LabelRow>
      {useSlider ? (
        <>
          <SliderContainer>
            {onDecrease && (
              <SliderButton
                type="button"
                onClick={onDecrease}
                disabled={isDecreaseDisabled}
                aria-label="Zmniejsz wartość"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                </svg>
              </SliderButton>
            )}
            <SliderInput
              id={id}
              type="range"
              min={min}
              max={max}
              step={step}
              {...register}
              className={clsx(error && 'border-red-500')}
            />
            {onIncrease && (
              <SliderButton
                type="button"
                onClick={onIncrease}
                disabled={isIncreaseDisabled}
                aria-label="Zwiększ wartość"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </SliderButton>
            )}
          </SliderContainer>
          <SliderLabels>
            <SliderLabel>{minLabel}</SliderLabel>
            <SliderLabel>{maxLabel}</SliderLabel>
          </SliderLabels>
        </>
      ) : (
        <>
          <TextInput
            id={id}
            type="number"
            min={min}
            max={max}
            step={step}
            {...register}
            className={clsx(error && 'border-red-500')}
          />
          <InputLabels>
            <InputLabel>Min: {minLabel}</InputLabel>
            <InputLabel>Max: {maxLabel}</InputLabel>
          </InputLabels>
        </>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormGroup>
  )
}

const FormGroup = tw.div`flex flex-col gap-3`
const LabelRow = tw.div`flex justify-between items-center`
const Label = tw.label`text-sm font-bold text-gray-700 uppercase tracking-wide`
const ValueDisplay = tw.span`text-lg font-bold text-blue-600`

const SliderContainer = tw.div`flex items-center gap-2`
const SliderInput = tw.input`
  flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
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

const SliderButton = tw.button`
  flex items-center justify-center
  w-8 h-8
  rounded-lg
  bg-blue-50
  hover:bg-blue-100
  text-blue-600
  transition-all duration-200
  hover:scale-110
  active:scale-95
  disabled:opacity-30
  disabled:cursor-not-allowed
  disabled:hover:scale-100
  shrink-0
`

const SliderLabels = tw.div`flex justify-between text-xs text-gray-500`
const SliderLabel = tw.span``
const InputLabels = tw.div`flex justify-between text-xs text-gray-500`
const InputLabel = tw.span`font-medium`
const TextInput = tw.input`
  w-full
  h-11
  px-4
  rounded-lg
  border border-gray-300
  bg-white
  text-gray-900
  text-base
  focus:outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:border-blue-500
  transition-all
  [&::-webkit-inner-spin-button]:appearance-none
  [&::-webkit-outer-spin-button]:appearance-none
  [-moz-appearance:textfield]
`
const ErrorMessage = tw.p`text-sm text-red-600`

const LabelWithTooltip = tw.div`flex items-center gap-2`
const InfoIcon = tw.span`
  cursor-help 
  text-blue-600 
  hover:text-blue-700 
  transition-all duration-200
  hover:scale-110
  flex items-center justify-center
  w-5 h-5
  rounded-full
  hover:bg-blue-50
`
