'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Tooltip } from 'components/common/tooltip'
import { useDebounce } from 'hooks/useDebounce'
import type { RefObject } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsInputCursor } from 'react-icons/bs'
import tw from 'tw-tailwind'
import { type CalculatorFormData, calculatorFormSchema } from 'types/calculator'
import {
  trackInputModeToggle,
  trackInterestRateTypeChange,
  trackParameterChange,
  trackPurposeChange,
  trackScrollToResults,
} from 'utils/analytics'
import { formatCurrency } from 'utils/calculator'

type CalculatorFormProps = {
  onCalculate: (data: CalculatorFormData) => void
  hasResults: boolean
  formRef?: RefObject<HTMLFormElement | null>
  defaultValues: CalculatorFormData
}

export const CalculatorForm = ({
  onCalculate,
  hasResults,
  formRef,
  defaultValues,
}: CalculatorFormProps) => {
  const [useSlider, setUseSlider] = useState(false)
  const previousValuesRef = useRef<CalculatorFormData>(defaultValues)

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
      previousValuesRef.current = debouncedValues
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
      const oldValue = previousValuesRef.current[field]
      setValue(field, value, { shouldDirty: true, shouldValidate: true })

      // Śledź zmianę parametru
      if (oldValue !== value) {
        trackParameterChange({
          field,
          oldValue,
          newValue: value,
        })
      }
    },
    [setValue],
  )

  const scrollToResults = () => {
    document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    trackScrollToResults()
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
          onClick={() => {
            const newMode = !useSlider
            setUseSlider(newMode)
            trackInputModeToggle(newMode ? 'slider' : 'input')
          }}
          aria-label={useSlider ? 'Przełącz na inputy' : 'Przełącz na slidery'}
          title={useSlider ? 'Przełącz na inputy' : 'Przełącz na slidery'}
        >
          {useSlider ? (
            <BsInputCursor size={20} />
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
                <FieldTitleWithTooltip>
                  <FieldTitle>Kwota kredytu</FieldTitle>
                  <Tooltip
                    content={
                      <TooltipContent>
                        <TooltipHeader>
                          <TooltipIconWrapper>
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
                              <title>Pieniądze</title>
                              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                          </TooltipIconWrapper>
                          <TooltipTitle>Kwota kredytu</TooltipTitle>
                        </TooltipHeader>
                        <TooltipText>
                          Im wyższa kwota, tym większa rata miesięczna i wyższe wymagania banku.
                          Zwiększ wkład własny powyżej 20%, aby obniżyć kwotę kredytu i uzyskać
                          lepsze oprocentowanie.
                        </TooltipText>
                      </TooltipContent>
                    }
                  >
                    <InfoIcon>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
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
                </FieldTitleWithTooltip>
                <FieldValue>{formatCurrency(loanAmount)}</FieldValue>
              </FieldHeader>
              {useSlider ? (
                <>
                  <FieldDescription>
                    Kwota finansowania, którą chcesz uzyskać od banku.
                  </FieldDescription>
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
                        <title>Zmniejsz kwotę kredytu</title>
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
                        <title>Zwiększ kwotę kredytu</title>
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
                  <FieldDescription>
                    Kwota finansowania, którą chcesz uzyskać od banku.
                  </FieldDescription>
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
                        <title>Zmniejsz okres spłaty</title>
                        <path d="M5 12h14" />
                      </svg>
                    </DecreaseButton>
                    <InputWrapper>
                      <NumberInput
                        type="number"
                        min={50000}
                        max={2000000}
                        step={10000}
                        inputMode="numeric"
                        {...register('loanAmount', { valueAsNumber: true })}
                        onBlur={(event) =>
                          updateValue('loanAmount', Number(event.currentTarget.value))
                        }
                      />
                      <InputSuffix>zł</InputSuffix>
                    </InputWrapper>
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
                        <title>Zwiększ kwotę kredytu</title>
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </IncreaseButton>
                  </InputContainer>
                  <InputLabels>
                    <InputLabel>50 tys. zł</InputLabel>
                    <InputLabel>2 mln zł</InputLabel>
                  </InputLabels>
                </>
              )}
              {errors.loanAmount && <ErrorMessage>{errors.loanAmount.message}</ErrorMessage>}
            </FieldBox>
          </Field>

          <Field>
            <FieldBox>
              <FieldHeader>
                <FieldTitleWithTooltip>
                  <FieldTitle>Okres spłaty</FieldTitle>
                  <Tooltip
                    content={
                      <TooltipContent>
                        <TooltipHeader>
                          <TooltipIconWrapper>
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
                              <title>Czas</title>
                              <circle cx="12" cy="12" r="10" />
                              <path d="M12 6v6l4 2" />
                            </svg>
                          </TooltipIconWrapper>
                          <TooltipTitle>Okres spłaty</TooltipTitle>
                        </TooltipHeader>
                        <TooltipText>
                          <strong>Dłuższy okres (np. 30 lat):</strong> Niższa rata, ale wyższy koszt
                          całkowity.
                        </TooltipText>
                        <TooltipText>
                          <strong>Krótszy okres (np. 15 lat):</strong> Wyższa rata, ale oszczędność
                          na odsetkach. Jeśli możesz sobie pozwolić, wybierz krótszy okres –
                          zaoszczędzisz tysiące złotych.
                        </TooltipText>
                      </TooltipContent>
                    }
                  >
                    <InfoIcon>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
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
                </FieldTitleWithTooltip>
                <FieldValue>{loanPeriod} lat</FieldValue>
              </FieldHeader>
              {useSlider ? (
                <>
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
                        <title>Zmniejsz okres spłaty</title>
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
                        <title>Zwiększ okres spłaty</title>
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
                  <FieldDescription>Najczęściej wybierany okres to 25–30 lat.</FieldDescription>
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
                        <title>Zmniejsz okres spłaty</title>
                        <path d="M5 12h14" />
                      </svg>
                    </DecreaseButton>
                    <InputWrapper>
                      <NumberInput
                        type="number"
                        min={5}
                        max={35}
                        step={1}
                        inputMode="numeric"
                        {...register('loanPeriod', { valueAsNumber: true })}
                        onBlur={(event) =>
                          updateValue('loanPeriod', Number(event.currentTarget.value))
                        }
                      />
                      <InputSuffix>lat</InputSuffix>
                    </InputWrapper>
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
                        <title>Zwiększ okres spłaty</title>
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </IncreaseButton>
                  </InputContainer>
                  <InputLabels>
                    <InputLabel>5 lat</InputLabel>
                    <InputLabel>35 lat</InputLabel>
                  </InputLabels>
                </>
              )}
              {errors.loanPeriod && <ErrorMessage>{errors.loanPeriod.message}</ErrorMessage>}
            </FieldBox>
          </Field>

          <Field>
            <FieldBox>
              <FieldHeader>
                <FieldTitleWithTooltip>
                  <FieldTitle>Wkład własny</FieldTitle>
                  <Tooltip
                    content={
                      <TooltipContent>
                        <TooltipHeader>
                          <TooltipIconWrapper>
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
                              <title>Oszczędności</title>
                              <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z" />
                              <path d="M2 9v1c0 1.1.9 2 2 2h1" />
                              <path d="M16 11h0" />
                            </svg>
                          </TooltipIconWrapper>
                          <TooltipTitle>Wkład własny</TooltipTitle>
                        </TooltipHeader>
                        <TooltipText>
                          Banki wymagają minimum 10-20% wartości nieruchomości. Wkład własny powyżej
                          20% daje:
                        </TooltipText>
                        <TooltipList>
                          <TooltipListItem>Niższe oprocentowanie kredytu</TooltipListItem>
                          <TooltipListItem>Brak ubezpieczenia niskiego wkładu</TooltipListItem>
                          <TooltipListItem>Łatwiejsza akceptacja kredytu</TooltipListItem>
                        </TooltipList>
                        <TooltipText>
                          <strong>Cel idealny:</strong> 20% lub więcej to klucz do najlepszych
                          warunków kredytu.
                        </TooltipText>
                      </TooltipContent>
                    }
                  >
                    <InfoIcon>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
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
                </FieldTitleWithTooltip>
                <FieldValue>{formatCurrency(downPayment)}</FieldValue>
              </FieldHeader>
              {useSlider ? (
                <>
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
                        <title>Zmniejsz wkład własny</title>
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
                        <title>Zwiększ wkład własny</title>
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
                  <FieldDescription>
                    Aktualnie {downPaymentPercent}% wartości nieruchomości. Powyżej 20% daje lepsze
                    warunki.
                  </FieldDescription>
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
                        <title>Zmniejsz wkład własny</title>
                        <path d="M5 12h14" />
                      </svg>
                    </DecreaseButton>
                    <InputWrapper>
                      <NumberInput
                        type="number"
                        min={0}
                        max={1000000}
                        step={10000}
                        inputMode="numeric"
                        {...register('downPayment', { valueAsNumber: true })}
                        onBlur={(event) =>
                          updateValue('downPayment', Number(event.currentTarget.value))
                        }
                      />
                      <InputSuffix>zł</InputSuffix>
                    </InputWrapper>
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
                        <title>Zwiększ wkład własny</title>
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </IncreaseButton>
                  </InputContainer>
                  <InputLabels>
                    <InputLabel>0 zł</InputLabel>
                    <InputLabel>1 mln zł</InputLabel>
                  </InputLabels>
                </>
              )}
              {errors.downPayment && <ErrorMessage>{errors.downPayment.message}</ErrorMessage>}
            </FieldBox>
          </Field>

          <Field>
            <FieldBox>
              <FieldHeader>
                <FieldTitleWithTooltip>
                  <FieldTitle>Dochód miesięczny netto</FieldTitle>
                  <Tooltip
                    content={
                      <TooltipContent>
                        <TooltipHeader>
                          <TooltipIconWrapper>
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
                              <title>Portfel</title>
                              <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                              <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                              <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                            </svg>
                          </TooltipIconWrapper>
                          <TooltipTitle>Dochód miesięczny netto</TooltipTitle>
                        </TooltipHeader>
                        <TooltipText>
                          To Twoje stałe, miesięczne zarobki po potrąceniu podatków i składek ZUS.
                        </TooltipText>
                        <TooltipWarning>
                          <strong>Zasada 40-50%:</strong> Rata kredytu nie może przekraczać 40-50%
                          Twojego miesięcznego dochodu netto.
                        </TooltipWarning>
                        <TooltipText>
                          <strong>Przykład:</strong> Przy dochodzie 8 000 zł, maksymalna bezpieczna
                          rata to około 3 200-4 000 zł miesięcznie.
                        </TooltipText>
                      </TooltipContent>
                    }
                  >
                    <InfoIcon>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
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
                </FieldTitleWithTooltip>
                <FieldValue>{formatCurrency(monthlyIncome)}</FieldValue>
              </FieldHeader>
              {useSlider ? (
                <>
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
                        <title>Zmniejsz dochód miesięczny</title>
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
                        <title>Zwiększ dochód miesięczny</title>
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
                  <FieldDescription>
                    Banki zakładają, że rata nie powinna przekraczać ok. 45% dochodu.
                  </FieldDescription>
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
                        <title>Zmniejsz dochód miesięczny</title>
                        <path d="M5 12h14" />
                      </svg>
                    </DecreaseButton>
                    <InputWrapper>
                      <NumberInput
                        type="number"
                        min={3000}
                        max={30000}
                        step={500}
                        inputMode="numeric"
                        {...register('monthlyIncome', { valueAsNumber: true })}
                        onBlur={(event) =>
                          updateValue('monthlyIncome', Number(event.currentTarget.value))
                        }
                      />
                      <InputSuffix>zł</InputSuffix>
                    </InputWrapper>
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
                        <title>Zwiększ dochód miesięczny</title>
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </IncreaseButton>
                  </InputContainer>
                  <InputLabels>
                    <InputLabel>3 tys. zł</InputLabel>
                    <InputLabel>30 tys. zł</InputLabel>
                  </InputLabels>
                </>
              )}
              {errors.monthlyIncome && <ErrorMessage>{errors.monthlyIncome.message}</ErrorMessage>}
            </FieldBox>
          </Field>
        </FieldList>

        <SelectionSection>
          <InterestRateSection>
            <InterestRateLabel>Typ oprocentowania</InterestRateLabel>
            <InterestRateList>
              {interestRateTypes.map((option) => (
                <InterestRateItem key={option.id}>
                  <InterestRateRadio
                    type="radio"
                    id={`interestRate-${option.id}`}
                    value={option.id}
                    {...register('interestRateType', {
                      onChange: () => {
                        const currentValue = watch('interestRateType')
                        if (currentValue) {
                          trackInterestRateTypeChange(currentValue as 'fixed' | 'variable')
                        }
                      },
                    })}
                  />
                  <InterestRateTile htmlFor={`interestRate-${option.id}`}>
                    {option.label}
                  </InterestRateTile>
                </InterestRateItem>
              ))}
            </InterestRateList>
            {errors.interestRateType && (
              <ErrorMessage>{errors.interestRateType.message}</ErrorMessage>
            )}
          </InterestRateSection>

          <PurposeSection>
            <PurposeLabel>Cel kredytu</PurposeLabel>
            <PurposeList>
              {purposes.map((option) => (
                <PurposeItem key={option.id}>
                  <PurposeRadio
                    type="radio"
                    id={`purpose-${option.id}`}
                    value={option.id}
                    {...register('purpose', {
                      onChange: () => {
                        const currentValue = watch('purpose')
                        if (currentValue) {
                          trackPurposeChange(currentValue)
                        }
                      },
                    })}
                  />
                  <PurposeTile htmlFor={`purpose-${option.id}`}>{option.label}</PurposeTile>
                </PurposeItem>
              ))}
            </PurposeList>
            {errors.purpose && <ErrorMessage>{errors.purpose.message}</ErrorMessage>}
          </PurposeSection>
        </SelectionSection>

        <SubmitBar>
          <SubmitButton type="submit" disabled={!isValid && !hasResults}>
            Zobacz oferty
          </SubmitButton>
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

const interestRateTypes = [
  { id: 'fixed', label: 'Stałe' },
  { id: 'variable', label: 'Zmienne' },
] as const

const Card = tw.div`
  relative
  w-full
  max-w-7xl
  mx-auto
  px-4 py-8
  sm:px-6 sm:py-10
  md:px-8 md:py-12
  flex flex-col gap-6
`

const Form = tw.form`flex flex-col gap-8`

const SliderToggleButton = tw.button`
  absolute
  top-4
  right-4
  sm:top-5
  sm:right-6
  md:top-6
  md:right-8
  -translate-y-1/2
  z-20
  w-7 h-7
  sm:w-8 sm:h-8
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
  flex flex-col gap-2
`

const FieldHeader = tw.div`flex items-center justify-between gap-3`

const FieldTitle = tw.span`text-xs font-bold text-green-50/90 uppercase tracking-wide`

const FieldTitleWithTooltip = tw.div`flex items-center gap-2`

const FieldValue = tw.span`text-sm sm:text-base md:text-lg font-bold text-white whitespace-nowrap leading-tight`

const InfoIcon = tw.span`
  cursor-help 
  text-green-100
  hover:text-white 
  transition-all duration-200
  hover:scale-110
  flex items-center justify-center
  w-5 h-5
  rounded-full
  hover:bg-white/20
  shrink-0
`

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

const FieldDescription = tw.p`text-xs text-green-50/80 m-0`

const InputWrapper = tw.div`relative flex-1`
const NumberInput = tw.input`
  w-full
  rounded-lg
  border border-white/20
  bg-white/10
  backdrop-blur-sm
  pl-4 pr-12 py-2.5
  text-base font-medium text-white
  placeholder:text-white/50
  focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20
  transition-colors
  [&::-webkit-inner-spin-button]:appearance-none
  [&::-webkit-outer-spin-button]:appearance-none
  [-moz-appearance:textfield]
`
const InputSuffix = tw.span`
  absolute
  right-4
  top-1/2
  -translate-y-1/2
  text-base font-medium text-white/70
  pointer-events-none
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

const SelectionSection = tw.section`
  flex flex-col md:flex-row
  gap-4 md:gap-6
`

const PurposeSection = tw.section`flex flex-col gap-2 flex-1`

const PurposeLabel = tw.span`text-xs font-bold text-green-50/90 uppercase tracking-wide`

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

const InterestRateSection = tw.section`flex flex-col gap-2 flex-1`

const InterestRateLabel = tw.span`text-xs font-bold text-green-50/90 uppercase tracking-wide`

const InterestRateList = tw.div`flex flex-wrap gap-2`

const InterestRateItem = tw.div`relative`

const InterestRateRadio = tw.input`
  peer absolute inset-0 opacity-0
`

const InterestRateTile = tw.label`
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
  w-full
  rounded-lg
  bg-white
  hover:bg-white/95
  text-green-600
  px-6 py-3
  text-base font-semibold
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-white/50
  disabled:opacity-50 disabled:cursor-not-allowed
`

const TooltipContent = tw.div`
  flex flex-col gap-2.5
  max-w-xs
  text-sm
  p-4
  bg-linear-to-br from-green-50 to-emerald-50
  border border-green-200/50
  rounded-xl
  shadow-lg
`

const TooltipHeader = tw.div`flex items-center gap-2`

const TooltipIconWrapper = tw.div`
  flex items-center justify-center
  w-6 h-6
  rounded-full
  bg-green-200/50
  text-green-700
  shrink-0
`

const TooltipTitle = tw.div`
  text-base font-bold text-green-900
`

const TooltipText = tw.div`
  leading-relaxed text-green-800/90
  text-sm
`

const TooltipList = tw.ul`
  flex flex-col gap-1.5
  ml-4
  list-disc
  text-green-800/90
  text-sm
`

const TooltipListItem = tw.li``

const TooltipWarning = tw.div`
  p-2.5
  bg-amber-50/80
  border border-amber-200/60
  rounded-lg
  text-amber-900
  text-sm
  font-medium
`
