'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useDebounce } from 'hooks/useDebounce'
import type { RefObject } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import tw from 'tw-tailwind'
import { type CalculatorFormData, calculatorFormSchema } from 'types/calculator'
import { formatCurrency } from 'utils/calculator'

type CalculatorFormCursorProps = {
  onCalculate: (data: CalculatorFormData) => void
  hasResults: boolean
  formRef?: RefObject<HTMLFormElement | null>
  defaultValues: CalculatorFormData
}

export const CalculatorFormCursor = ({
  onCalculate,
  hasResults,
  formRef,
  defaultValues,
}: CalculatorFormCursorProps) => {
  const [useSlider, setUseSlider] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors, isValid },
  } = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorFormSchema),
    mode: 'onChange',
    defaultValues,
  })

  useEffect(() => {
    reset(defaultValues)
    void trigger()
  }, [defaultValues, reset, trigger])

  const values = watch()
  const debouncedValues = useDebounce(values, 250)

  useEffect(() => {
    if (isValid) {
      onCalculate(debouncedValues)
    }
  }, [debouncedValues, isValid, onCalculate])

  const loanAmount = values.loanAmount
  const loanPeriod = values.loanPeriod
  const downPayment = values.downPayment
  const monthlyIncome = values.monthlyIncome

  const downPaymentPercent = useMemo(() => {
    const propertyValue = loanAmount + downPayment
    if (propertyValue === 0) {
      return 0
    }
    return Math.round((downPayment / propertyValue) * 100)
  }, [downPayment, loanAmount])

  const updateValue = useCallback(
    (field: keyof CalculatorFormData, value: number) => {
      setValue(field, value, { shouldDirty: true, shouldValidate: true })
    },
    [setValue],
  )

  const scrollToResults = () => {
    document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleDecrease = useCallback(
    (field: keyof CalculatorFormData, step: number, min: number) => {
      const currentValue = values[field] as number
      if (currentValue > min) {
        const newValue = Math.max(min, currentValue - step)
        updateValue(field, newValue)
      }
    },
    [values, updateValue],
  )

  const handleIncrease = useCallback(
    (field: keyof CalculatorFormData, step: number, max: number) => {
      const currentValue = values[field] as number
      if (currentValue < max) {
        const newValue = Math.min(max, currentValue + step)
        updateValue(field, newValue)
      }
    },
    [values, updateValue],
  )

  return (
    <Card>
      <Form ref={formRef} onSubmit={handleSubmit(scrollToResults)}>
        <SliderToggleButton
          type="button"
          onClick={() => setUseSlider(!useSlider)}
          aria-label={useSlider ? 'Przełącz na inputy' : 'Przełącz na slidery'}
          title={useSlider ? 'Przełącz na inputy' : 'Przełącz na slidery'}
        >
          {useSlider ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>Przełącz na inputy</title>
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path d="M9 9h6M9 15h6M9 12h6" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>Przełącz na slidery</title>
              <line x1="3" y1="12" x2="21" y2="12" />
              <circle cx="12" cy="12" r="4" fill="currentColor" />
            </svg>
          )}
        </SliderToggleButton>

        <FieldList>
          <Field>
            <FieldBox>
              <FieldHeader>
                <FieldTitle>Kwota kredytu</FieldTitle>
              </FieldHeader>
              {useSlider ? (
                <>
                  <FieldValue>{formatCurrency(loanAmount)}</FieldValue>
                  <FieldDescription>Kwota finansowania, którą chcesz uzyskać od banku.</FieldDescription>
                  <SliderContainer>
                    <SliderButton
                      type="button"
                      onClick={() => handleDecrease('loanAmount', 10000, 50000)}
                      disabled={loanAmount <= 50000}
                      aria-label="Zmniejsz kwotę kredytu"
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
                    <SliderInput
                      type="range"
                      min={50000}
                      max={2000000}
                      step={10000}
                      {...register('loanAmount', { valueAsNumber: true })}
                      onChange={(e) => updateValue('loanAmount', Number(e.target.value))}
                    />
                    <SliderButton
                      type="button"
                      onClick={() => handleIncrease('loanAmount', 10000, 2000000)}
                      disabled={loanAmount >= 2000000}
                      aria-label="Zwiększ kwotę kredytu"
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
                  </SliderContainer>
                  <SliderLabels>
                    <SliderLabel>50 tys. zł</SliderLabel>
                    <SliderLabel>2 mln zł</SliderLabel>
                  </SliderLabels>
                </>
              ) : (
                <>
                  <InputContainer>
                    <DecreaseButton
                      type="button"
                      onClick={() => handleDecrease('loanAmount', 10000, 50000)}
                      disabled={loanAmount <= 50000}
                      aria-label="Zmniejsz kwotę kredytu"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                      </svg>
                    </DecreaseButton>
                    <FieldValue>{formatCurrency(loanAmount)}</FieldValue>
                    <IncreaseButton
                      type="button"
                      onClick={() => handleIncrease('loanAmount', 10000, 2000000)}
                      disabled={loanAmount >= 2000000}
                      aria-label="Zwiększ kwotę kredytu"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </IncreaseButton>
                  </InputContainer>
                  <FieldDescription>Kwota finansowania, którą chcesz uzyskać od banku.</FieldDescription>
                  <NumberInput
                    type="number"
                    min={50000}
                    max={2000000}
                    step={10000}
                    inputMode="numeric"
                    {...register('loanAmount', { valueAsNumber: true })}
                    onBlur={(event) => updateValue('loanAmount', Number(event.currentTarget.value))}
                  />
                  <InputLabels>
                    <InputLabel>Min: 50 tys. zł</InputLabel>
                    <InputLabel>Max: 2 mln zł</InputLabel>
                  </InputLabels>
                </>
              )}
              {errors.loanAmount && <ErrorMessage>{errors.loanAmount.message}</ErrorMessage>}
            </FieldBox>
          </Field>

          <Field>
            <FieldBox>
              <FieldHeader>
                <FieldTitle>Okres spłaty</FieldTitle>
              </FieldHeader>
              {useSlider ? (
                <>
                  <FieldValue>{loanPeriod} lat</FieldValue>
                  <FieldDescription>Najczęściej wybierany okres to 25–30 lat.</FieldDescription>
                  <SliderContainer>
                    <SliderButton
                      type="button"
                      onClick={() => handleDecrease('loanPeriod', 1, 5)}
                      disabled={loanPeriod <= 5}
                      aria-label="Zmniejsz okres spłaty"
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
                    <SliderInput
                      type="range"
                      min={5}
                      max={35}
                      step={1}
                      {...register('loanPeriod', { valueAsNumber: true })}
                      onChange={(e) => updateValue('loanPeriod', Number(e.target.value))}
                    />
                    <SliderButton
                      type="button"
                      onClick={() => handleIncrease('loanPeriod', 1, 35)}
                      disabled={loanPeriod >= 35}
                      aria-label="Zwiększ okres spłaty"
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
                  </SliderContainer>
                  <SliderLabels>
                    <SliderLabel>5 lat</SliderLabel>
                    <SliderLabel>35 lat</SliderLabel>
                  </SliderLabels>
                </>
              ) : (
                <>
                  <InputContainer>
                    <DecreaseButton
                      type="button"
                      onClick={() => handleDecrease('loanPeriod', 1, 5)}
                      disabled={loanPeriod <= 5}
                      aria-label="Zmniejsz okres spłaty"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                      </svg>
                    </DecreaseButton>
                    <FieldValue>{loanPeriod} lat</FieldValue>
                    <IncreaseButton
                      type="button"
                      onClick={() => handleIncrease('loanPeriod', 1, 35)}
                      disabled={loanPeriod >= 35}
                      aria-label="Zwiększ okres spłaty"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </IncreaseButton>
                  </InputContainer>
                  <FieldDescription>Najczęściej wybierany okres to 25–30 lat.</FieldDescription>
                  <NumberInput
                    type="number"
                    min={5}
                    max={35}
                    step={1}
                    inputMode="numeric"
                    {...register('loanPeriod', { valueAsNumber: true })}
                    onBlur={(event) => updateValue('loanPeriod', Number(event.currentTarget.value))}
                  />
                  <InputLabels>
                    <InputLabel>Min: 5 lat</InputLabel>
                    <InputLabel>Max: 35 lat</InputLabel>
                  </InputLabels>
                </>
              )}
              {errors.loanPeriod && <ErrorMessage>{errors.loanPeriod.message}</ErrorMessage>}
            </FieldBox>
          </Field>

          <Field>
            <FieldBox>
              <FieldHeader>
                <FieldTitle>Wkład własny</FieldTitle>
              </FieldHeader>
              {useSlider ? (
                <>
                  <FieldValue>{formatCurrency(downPayment)}</FieldValue>
                  <FieldDescription>
                    Aktualnie {downPaymentPercent}% wartości nieruchomości. Powyżej 20% daje lepsze
                    warunki.
                  </FieldDescription>
                  <SliderContainer>
                    <SliderButton
                      type="button"
                      onClick={() => handleDecrease('downPayment', 10000, 0)}
                      disabled={downPayment <= 0}
                      aria-label="Zmniejsz wkład własny"
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
                    <SliderInput
                      type="range"
                      min={0}
                      max={1000000}
                      step={10000}
                      {...register('downPayment', { valueAsNumber: true })}
                      onChange={(e) => updateValue('downPayment', Number(e.target.value))}
                    />
                    <SliderButton
                      type="button"
                      onClick={() => handleIncrease('downPayment', 10000, 1000000)}
                      disabled={downPayment >= 1000000}
                      aria-label="Zwiększ wkład własny"
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
                  </SliderContainer>
                  <SliderLabels>
                    <SliderLabel>0 zł</SliderLabel>
                    <SliderLabel>1 mln zł</SliderLabel>
                  </SliderLabels>
                </>
              ) : (
                <>
                  <InputContainer>
                    <DecreaseButton
                      type="button"
                      onClick={() => handleDecrease('downPayment', 10000, 0)}
                      disabled={downPayment <= 0}
                      aria-label="Zmniejsz wkład własny"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                      </svg>
                    </DecreaseButton>
                    <FieldValue>{formatCurrency(downPayment)}</FieldValue>
                    <IncreaseButton
                      type="button"
                      onClick={() => handleIncrease('downPayment', 10000, 1000000)}
                      disabled={downPayment >= 1000000}
                      aria-label="Zwiększ wkład własny"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </IncreaseButton>
                  </InputContainer>
                  <FieldDescription>
                    Aktualnie {downPaymentPercent}% wartości nieruchomości. Powyżej 20% daje lepsze
                    warunki.
                  </FieldDescription>
                  <NumberInput
                    type="number"
                    min={0}
                    max={1000000}
                    step={10000}
                    inputMode="numeric"
                    {...register('downPayment', { valueAsNumber: true })}
                    onBlur={(event) => updateValue('downPayment', Number(event.currentTarget.value))}
                  />
                  <InputLabels>
                    <InputLabel>Min: 0 zł</InputLabel>
                    <InputLabel>Max: 1 mln zł</InputLabel>
                  </InputLabels>
                </>
              )}
              {errors.downPayment && <ErrorMessage>{errors.downPayment.message}</ErrorMessage>}
            </FieldBox>
          </Field>

          <Field>
            <FieldBox>
              <FieldHeader>
                <FieldTitle>Dochód miesięczny netto</FieldTitle>
              </FieldHeader>
              {useSlider ? (
                <>
                  <FieldValue>{formatCurrency(monthlyIncome)}</FieldValue>
                  <FieldDescription>
                    Banki zakładają, że rata nie powinna przekraczać ok. 45% dochodu.
                  </FieldDescription>
                  <SliderContainer>
                    <SliderButton
                      type="button"
                      onClick={() => handleDecrease('monthlyIncome', 500, 3000)}
                      disabled={monthlyIncome <= 3000}
                      aria-label="Zmniejsz dochód miesięczny"
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
                    <SliderInput
                      type="range"
                      min={3000}
                      max={30000}
                      step={500}
                      {...register('monthlyIncome', { valueAsNumber: true })}
                      onChange={(e) => updateValue('monthlyIncome', Number(e.target.value))}
                    />
                    <SliderButton
                      type="button"
                      onClick={() => handleIncrease('monthlyIncome', 500, 30000)}
                      disabled={monthlyIncome >= 30000}
                      aria-label="Zwiększ dochód miesięczny"
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
                  </SliderContainer>
                  <SliderLabels>
                    <SliderLabel>3 tys. zł</SliderLabel>
                    <SliderLabel>30 tys. zł</SliderLabel>
                  </SliderLabels>
                </>
              ) : (
                <>
                  <InputContainer>
                    <DecreaseButton
                      type="button"
                      onClick={() => handleDecrease('monthlyIncome', 500, 3000)}
                      disabled={monthlyIncome <= 3000}
                      aria-label="Zmniejsz dochód miesięczny"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                      </svg>
                    </DecreaseButton>
                    <FieldValue>{formatCurrency(monthlyIncome)}</FieldValue>
                    <IncreaseButton
                      type="button"
                      onClick={() => handleIncrease('monthlyIncome', 500, 30000)}
                      disabled={monthlyIncome >= 30000}
                      aria-label="Zwiększ dochód miesięczny"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </IncreaseButton>
                  </InputContainer>
                  <FieldDescription>
                    Banki zakładają, że rata nie powinna przekraczać ok. 45% dochodu.
                  </FieldDescription>
                  <NumberInput
                    type="number"
                    min={3000}
                    max={30000}
                    step={500}
                    inputMode="numeric"
                    {...register('monthlyIncome', { valueAsNumber: true })}
                    onBlur={(event) => updateValue('monthlyIncome', Number(event.currentTarget.value))}
                  />
                  <InputLabels>
                    <InputLabel>Min: 3 tys. zł</InputLabel>
                    <InputLabel>Max: 30 tys. zł</InputLabel>
                  </InputLabels>
                </>
              )}
              {errors.monthlyIncome && <ErrorMessage>{errors.monthlyIncome.message}</ErrorMessage>}
            </FieldBox>
          </Field>
        </FieldList>

        <PurposeSection>
          <PurposeLabel>Cel kredytu</PurposeLabel>
          <PurposeList>
            {purposes.map((option) => (
              <PurposeItem key={option.id}>
                <PurposeRadio
                  type="radio"
                  id={`cursor-purpose-${option.id}`}
                  value={option.id}
                  {...register('purpose')}
                />
                <PurposeTile htmlFor={`cursor-purpose-${option.id}`}>{option.label}</PurposeTile>
              </PurposeItem>
            ))}
          </PurposeList>
          {errors.purpose && <ErrorMessage>{errors.purpose.message}</ErrorMessage>}
        </PurposeSection>

        <SubmitBar>
          <SubmitButton type="submit" disabled={!isValid && !hasResults}>
            Zobacz oferty
          </SubmitButton>
          <InlineInfo>Obliczenia aktualizują się automatycznie.</InlineInfo>
        </SubmitBar>
      </Form>
    </Card>
  )
}

const purposes = [
  { id: 'purchase', label: 'Zakup' },
  { id: 'refinancing', label: 'Refinansowanie' },
  { id: 'construction', label: 'Budowa' },
] as const

const Card = tw.div`
  w-full
  max-w-7xl
  mx-auto
  px-4 py-8
  sm:px-6 sm:py-10
  md:px-8 md:py-12
  flex flex-col gap-6
`

const Form = tw.form`relative flex flex-col gap-8`

const SliderToggleButton = tw.button`
  absolute
  top-0
  right-0
  z-20
  w-10 h-10
  sm:w-12 sm:h-12
  flex items-center justify-center
  bg-white/20
  backdrop-blur-sm
  border border-white/30
  rounded-full
  shadow-md
  hover:shadow-lg
  hover:bg-white/30
  active:scale-95
  transition-all duration-200
  text-white
  hover:text-green-50
  focus:outline-none
  focus:ring-2
  focus:ring-white/50
  focus:ring-offset-2
  focus:ring-offset-transparent
`

const FieldList = tw.div`grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6`

const Field = tw.div`flex flex-col gap-3`

const FieldBox = tw.div`
  bg-white/10
  backdrop-blur-sm
  rounded-lg
  p-3 sm:p-4
  border border-white/20
  flex flex-col gap-3
`

const FieldHeader = tw.div`flex items-start justify-between gap-3`

const FieldTitle = tw.span`text-xs text-green-50/90 uppercase tracking-wide`

const FieldValue = tw.span`text-sm sm:text-base md:text-lg font-bold text-white flex-1 text-center`

const InputContainer = tw.div`
  flex items-center gap-2
  w-full
`

const DecreaseButton = tw.button`
  flex items-center justify-center
  w-8 h-8
  rounded-lg
  bg-white/20
  hover:bg-white/30
  text-white
  transition-all duration-200
  hover:scale-110
  active:scale-95
  disabled:opacity-30
  disabled:cursor-not-allowed
  disabled:hover:scale-100
  shrink-0
`

const IncreaseButton = tw.button`
  flex items-center justify-center
  w-8 h-8
  rounded-lg
  bg-white/20
  hover:bg-white/30
  text-white
  transition-all duration-200
  hover:scale-110
  active:scale-95
  disabled:opacity-30
  disabled:cursor-not-allowed
  disabled:hover:scale-100
  shrink-0
`

const FieldDescription = tw.p`text-xs text-green-50/80`

const NumberInput = tw.input`
  w-full
  rounded-lg
  border border-white/20
  bg-white/10
  backdrop-blur-sm
  px-4 py-2.5
  text-base font-medium text-white
  placeholder:text-white/50
  focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20
  transition-colors
  [&::-webkit-inner-spin-button]:appearance-none
  [&::-webkit-outer-spin-button]:appearance-none
  [-moz-appearance:textfield]
`

const InputLabels = tw.div`flex justify-between text-xs text-green-50/70`
const InputLabel = tw.span`font-medium`

const SliderContainer = tw.div`flex items-center gap-2`
const SliderInput = tw.input`
  flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer
  [&::-webkit-slider-thumb]:appearance-none
  [&::-webkit-slider-thumb]:w-5
  [&::-webkit-slider-thumb]:h-5
  [&::-webkit-slider-thumb]:rounded-full
  [&::-webkit-slider-thumb]:bg-white
  [&::-webkit-slider-thumb]:cursor-pointer
  [&::-webkit-slider-thumb]:shadow-lg
  [&::-webkit-slider-thumb]:transition-all
  [&::-webkit-slider-thumb]:hover:bg-green-50
  [&::-webkit-slider-thumb]:hover:scale-110
  [&::-moz-range-thumb]:w-5
  [&::-moz-range-thumb]:h-5
  [&::-moz-range-thumb]:rounded-full
  [&::-moz-range-thumb]:bg-white
  [&::-moz-range-thumb]:border-0
  [&::-moz-range-thumb]:cursor-pointer
  [&::-moz-range-thumb]:shadow-lg
  [&::-moz-range-thumb]:transition-all
  [&::-moz-range-thumb]:hover:bg-green-50
  [&::-moz-range-thumb]:hover:scale-110
`

const SliderButton = tw.button`
  flex items-center justify-center
  w-8 h-8
  rounded-lg
  bg-white/20
  hover:bg-white/30
  text-white
  transition-all duration-200
  hover:scale-110
  active:scale-95
  disabled:opacity-30
  disabled:cursor-not-allowed
  disabled:hover:scale-100
  shrink-0
`

const SliderLabels = tw.div`flex justify-between text-xs text-green-50/70`
const SliderLabel = tw.span``

const ErrorMessage = tw.p`text-xs text-red-200`

const PurposeSection = tw.section`flex flex-col gap-2`

const PurposeLabel = tw.span`text-xs text-green-50/90 uppercase tracking-wide`

const PurposeList = tw.div`flex flex-wrap gap-2`

const PurposeItem = tw.div`relative`

const PurposeRadio = tw.input`
  peer absolute inset-0 opacity-0
`

const PurposeTile = tw.label`
  inline-flex items-center justify-center
  rounded-lg
  border-2 border-white/20
  bg-white/10
  backdrop-blur-sm
  px-4 py-2
  text-xs font-medium text-white
  cursor-pointer
  transition-colors
  peer-checked:border-white
  peer-checked:bg-white/20
  hover:border-white/40
  hover:bg-white/15
`

const SubmitBar = tw.div`flex flex-col md:flex-row md:items-center gap-3`

const SubmitButton = tw.button`
  inline-flex items-center justify-center
  rounded-lg
  bg-white
  hover:bg-white/90
  text-green-600
  px-6 py-2.5
  text-sm font-semibold
  transition-all duration-200
  hover:scale-105
  active:scale-95
  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50
  disabled:opacity-60 disabled:cursor-not-allowed
`

const InlineInfo = tw.p`text-xs text-green-50/80`
