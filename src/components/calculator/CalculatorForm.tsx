'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useDebounce } from 'hooks/useDebounce'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import tw from 'tw-tailwind'
import { type CalculatorFormData, calculatorFormSchema } from 'types/calculator'
import { formatCurrency } from 'utils/calculator'
import { CalculatorFormHeader } from './atoms/CalculatorFormHeader'
import { FormField } from './molecules/FormField'
import { PurposeSelector } from './molecules/PurposeSelector'

export type CalculatorFormProps = {
  onCalculate: (data: CalculatorFormData) => void
  hasResults: boolean
  formRef?: React.RefObject<HTMLFormElement | null>
}

export const CalculatorForm = ({ onCalculate, hasResults, formRef }: CalculatorFormProps) => {
  const [useSlider, setUseSlider] = useState(true)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorFormSchema),
    mode: 'onChange',
    defaultValues: {
      loanAmount: 500000,
      loanPeriod: 25,
      downPayment: 100000,
      monthlyIncome: 8000,
      purpose: 'purchase',
    },
  })

  const formData = watch()
  const debouncedFormData = useDebounce(formData, 300)

  useEffect(() => {
    void trigger()
  }, [trigger])

  useEffect(() => {
    if (isValid) {
      onCalculate(debouncedFormData)
    }
  }, [debouncedFormData, isValid, onCalculate])

  const loanAmount = watch('loanAmount')
  const loanPeriod = watch('loanPeriod')
  const downPayment = watch('downPayment')
  const monthlyIncome = watch('monthlyIncome')

  const handleDecrease = (field: keyof CalculatorFormData, step: number, min: number) => {
    const currentValue = watch(field) as number
    if (currentValue > min) {
      const newValue = Math.max(min, currentValue - step)
      setValue(field, newValue, { shouldDirty: true, shouldValidate: true })
    }
  }

  const handleIncrease = (field: keyof CalculatorFormData, step: number, max: number) => {
    const currentValue = watch(field) as number
    if (currentValue < max) {
      const newValue = Math.min(max, currentValue + step)
      setValue(field, newValue, { shouldDirty: true, shouldValidate: true })
    }
  }

  const scrollToResults = () => {
    document.getElementById('results')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <FormWrapper>
      <FormCard>
        <CalculatorFormHeader />

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

          <FormGrid>
            {/* Kwota kredytu */}
            <FormField
              id="loanAmount"
              label="Kwota kredytu"
              value={formatCurrency(loanAmount)}
              min="50000"
              max="2000000"
              step="10000"
              register={register('loanAmount', { valueAsNumber: true })}
              error={errors.loanAmount?.message}
              useSlider={useSlider}
              onDecrease={() => handleDecrease('loanAmount', 10000, 50000)}
              onIncrease={() => handleIncrease('loanAmount', 10000, 2000000)}
              isDecreaseDisabled={loanAmount <= 50000}
              isIncreaseDisabled={loanAmount >= 2000000}
              tooltipContent={
                <TooltipContent>
                  <TooltipHeader>
                    <TooltipIconWrapper variant="blue">
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
                        <title>Pieniądze</title>
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </TooltipIconWrapper>
                    <TooltipTitle>Kwota kredytu</TooltipTitle>
                  </TooltipHeader>
                  <TooltipText>
                    To suma pieniędzy, którą chcesz pożyczyć od banku na zakup nieruchomości. Im
                    wyższa kwota, tym większa rata i wyższe wymagania banku.
                  </TooltipText>
                  <TooltipTip variant="blue">
                    <TipIcon>💰</TipIcon>
                    <TipText>
                      <strong>Wskazówka:</strong> Zwiększ wkład własny powyżej 20%, aby obniżyć
                      kwotę kredytu i uzyskać lepsze oprocentowanie.
                    </TipText>
                  </TooltipTip>
                </TooltipContent>
              }
              minLabel="50 tys. zł"
              maxLabel="2 mln zł"
            />

            {/* Okres kredytowania */}
            <FormField
              id="loanPeriod"
              label="Okres kredytowania"
              value={`${loanPeriod} lat`}
              min="5"
              max="35"
              step="1"
              register={register('loanPeriod', { valueAsNumber: true })}
              error={errors.loanPeriod?.message}
              useSlider={useSlider}
              onDecrease={() => handleDecrease('loanPeriod', 1, 5)}
              onIncrease={() => handleIncrease('loanPeriod', 1, 35)}
              isDecreaseDisabled={loanPeriod <= 5}
              isIncreaseDisabled={loanPeriod >= 35}
              tooltipContent={
                <TooltipContent>
                  <TooltipHeader>
                    <TooltipIconWrapper variant="purple">
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
                        <title>Czas</title>
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    </TooltipIconWrapper>
                    <TooltipTitle>Okres kredytowania</TooltipTitle>
                  </TooltipHeader>
                  <TooltipText>
                    To czas, przez który będziesz spłacać kredyt. Typowo od 5 do 35 lat.
                  </TooltipText>
                  <TooltipComparison>
                    <ComparisonRow>
                      <ComparisonLabel variant="green">Dłuższy okres (np. 30 lat)</ComparisonLabel>
                      <ComparisonValue>Niższa rata, wyższy koszt całkowity</ComparisonValue>
                    </ComparisonRow>
                    <ComparisonRow>
                      <ComparisonLabel variant="orange">Krótszy okres (np. 15 lat)</ComparisonLabel>
                      <ComparisonValue>Wyższa rata, oszczędność na odsetkach</ComparisonValue>
                    </ComparisonRow>
                  </TooltipComparison>
                  <TooltipTip variant="purple">
                    <TipIcon>⏱️</TipIcon>
                    <TipText>
                      <strong>Wybierz mądrze:</strong> Jeśli możesz sobie pozwolić na wyższą ratę,
                      wybierz krótszy okres – zaoszczędzisz tysiące złotych na odsetkach.
                    </TipText>
                  </TooltipTip>
                </TooltipContent>
              }
              minLabel="5 lat"
              maxLabel="35 lat"
            />

            {/* Wkład własny */}
            <FormField
              id="downPayment"
              label="Wkład własny"
              value={formatCurrency(downPayment)}
              min="0"
              max="1000000"
              step="10000"
              register={register('downPayment', { valueAsNumber: true })}
              error={errors.downPayment?.message}
              useSlider={useSlider}
              onDecrease={() => handleDecrease('downPayment', 10000, 0)}
              onIncrease={() => handleIncrease('downPayment', 10000, 1000000)}
              isDecreaseDisabled={downPayment <= 0}
              isIncreaseDisabled={downPayment >= 1000000}
              tooltipContent={
                <TooltipContent>
                  <TooltipHeader>
                    <TooltipIconWrapper variant="green">
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
                        <title>Oszczędności</title>
                        <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z" />
                        <path d="M2 9v1c0 1.1.9 2 2 2h1" />
                        <path d="M16 11h0" />
                      </svg>
                    </TooltipIconWrapper>
                    <TooltipTitle>Wkład własny</TooltipTitle>
                  </TooltipHeader>
                  <TooltipText>
                    To kwota, którą wpłacisz ze swoich oszczędności przy zakupie nieruchomości.
                    Banki wymagają minimum 10-20% wartości nieruchomości.
                  </TooltipText>
                  <TooltipBenefits>
                    <BenefitTitle>Korzyści z wyższego wkładu własnego (powyżej 20%):</BenefitTitle>
                    <BenefitsList>
                      <BenefitItem>
                        <BenefitIcon>✓</BenefitIcon>
                        Niższe oprocentowanie kredytu
                      </BenefitItem>
                      <BenefitItem>
                        <BenefitIcon>✓</BenefitIcon>
                        Brak ubezpieczenia niskiego wkładu
                      </BenefitItem>
                      <BenefitItem>
                        <BenefitIcon>✓</BenefitIcon>
                        Łatwiejsza akceptacja kredytu
                      </BenefitItem>
                    </BenefitsList>
                  </TooltipBenefits>
                  <TooltipTip variant="green">
                    <TipIcon>🎯</TipIcon>
                    <TipText>
                      <strong>Cel idealny:</strong> Wkład własny 20% lub więcej to klucz do
                      najlepszych warunków kredytu i największych oszczędności.
                    </TipText>
                  </TooltipTip>
                </TooltipContent>
              }
              minLabel="0 zł"
              maxLabel="1 mln zł"
            />

            {/* Dochód miesięczny */}
            <FormField
              id="monthlyIncome"
              label="Dochód miesięczny (netto)"
              value={formatCurrency(monthlyIncome)}
              min="3000"
              max="30000"
              step="500"
              register={register('monthlyIncome', { valueAsNumber: true })}
              error={errors.monthlyIncome?.message}
              useSlider={useSlider}
              onDecrease={() => handleDecrease('monthlyIncome', 500, 3000)}
              onIncrease={() => handleIncrease('monthlyIncome', 500, 30000)}
              isDecreaseDisabled={monthlyIncome <= 3000}
              isIncreaseDisabled={monthlyIncome >= 30000}
              tooltipContent={
                <TooltipContent>
                  <TooltipHeader>
                    <TooltipIconWrapper variant="amber">
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
                        <title>Portfel</title>
                        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                      </svg>
                    </TooltipIconWrapper>
                    <TooltipTitle>Dochód miesięczny netto</TooltipTitle>
                  </TooltipHeader>
                  <TooltipText>
                    To Twoje stałe, miesięczne zarobki po potrąceniu podatków i składek ZUS. Bank
                    analizuje tę kwotę, aby ocenić Twoją zdolność kredytową.
                  </TooltipText>
                  <TooltipWarning>
                    <WarningIcon>
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
                        <title>Informacja</title>
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                      </svg>
                    </WarningIcon>
                    <WarningText>
                      <strong>Zasada 40-50%:</strong> Rata kredytu nie może przekraczać 40-50%
                      Twojego miesięcznego dochodu netto.
                    </WarningText>
                  </TooltipWarning>
                  <TooltipTip variant="amber">
                    <TipIcon>📊</TipIcon>
                    <TipText>
                      <strong>Przykład:</strong> Przy dochodzie 8 000 zł, maksymalna bezpieczna rata
                      to około 3 200-4 000 zł miesięcznie.
                    </TipText>
                  </TooltipTip>
                </TooltipContent>
              }
              minLabel="3 tys. zł"
              maxLabel="30 tys. zł"
            />

            {/* Cel kredytu */}
            <FormGroupFullWidth>
              <PurposeSelector register={register('purpose')} error={errors.purpose?.message} />
            </FormGroupFullWidth>
          </FormGrid>

          {hasResults && (
            <SubmitButtonWrapper>
              <SubmitButton type="submit">
                <ButtonContent>
                  <ButtonIcon>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <title>Strzałki w dół</title>
                      <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                    </svg>
                  </ButtonIcon>
                  <ButtonTextWrapper>
                    <ButtonMainText>Zobacz porównanie ofert</ButtonMainText>
                    <ButtonSubText>Najlepsze banki dla Ciebie</ButtonSubText>
                  </ButtonTextWrapper>
                </ButtonContent>
                <ButtonGlow />
              </SubmitButton>
            </SubmitButtonWrapper>
          )}
        </Form>
      </FormCard>

      {/* Dekoracyjne elementy tła */}
      <BackgroundDecor1 />
      <BackgroundDecor2 />
    </FormWrapper>
  )
}

const FormWrapper = tw.div`
  relative
  w-full
  px-4 sm:px-6 lg:px-8
  -mt-8 sm:-mt-10 md:-mt-12 lg:-mt-16
  pb-8 sm:pb-10 md:pb-12 lg:pb-16
  overflow-hidden
`

const FormCard = tw.div`
  relative
  mx-auto w-full max-w-5xl
  bg-white 
  rounded-2xl sm:rounded-3xl
  shadow-2xl hover:shadow-3xl
  p-6 sm:p-8 md:p-10 lg:p-12
  border border-gray-100
  backdrop-blur-sm
  transition-shadow duration-700
  animate-in fade-in slide-in-from-bottom-8
  z-10
`

const Form = tw.form`relative flex flex-col gap-8 sm:gap-10 md:gap-12`

const SliderToggleButton = tw.button`
  absolute
  top-0
  right-0
  z-20
  w-10 h-10
  sm:w-12 sm:h-12
  flex items-center justify-center
  bg-white
  border border-gray-300
  rounded-full
  shadow-md
  hover:shadow-lg
  hover:bg-gray-50
  active:scale-95
  transition-all duration-200
  text-gray-700
  hover:text-blue-600
  focus:outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:ring-offset-2
`

const FormGrid = tw.div`grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2`

const FormGroupFullWidth = tw.div`md:col-span-2`

const SubmitButtonWrapper = tw.div`
  animate-in fade-in slide-in-from-bottom-4
  duration-500
  delay-300
`

const SubmitButton = tw.button`
  relative
  w-full 
  bg-linear-to-r from-blue-600 via-indigo-600 to-blue-700
  hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800
  text-white 
  font-bold 
  py-5 sm:py-6
  px-8 sm:px-10
  rounded-xl sm:rounded-2xl
  transition-all duration-300 ease-out
  shadow-lg hover:shadow-2xl
  transform hover:scale-[1.02] active:scale-[0.98]
  overflow-hidden
  group
  focus:outline-none focus:ring-4 focus:ring-blue-300/50
  disabled:opacity-50 disabled:cursor-not-allowed
`

const ButtonContent = tw.div`
  relative z-10
  flex items-center justify-center 
  gap-3 sm:gap-4
`

const ButtonIcon = tw.span`
  flex items-center justify-center
  transition-transform duration-300 ease-out
  group-hover:translate-y-1
  group-hover:scale-110
`

const ButtonTextWrapper = tw.div`flex flex-col items-start gap-1`

const ButtonMainText = tw.span`text-base sm:text-lg font-bold`

const ButtonSubText = tw.span`text-xs sm:text-sm font-normal opacity-90`

const ButtonGlow = tw.span`
  absolute inset-0
  bg-linear-to-r from-blue-400/0 via-white/20 to-blue-400/0
  transform -translate-x-full
  group-hover:translate-x-full
  transition-transform duration-1000
  pointer-events-none
`

const TooltipContent = tw.div`flex flex-col gap-3 max-w-xs text-sm p-4`

const TooltipHeader = tw.div`flex items-center gap-2`

const TooltipIconWrapper = tw.div<{ variant: string }>`
  flex items-center justify-center
  w-6 h-6
  rounded-full
  bg-${(props) => props.variant}-100
  text-${(props) => props.variant}-600
`

const TooltipTitle = tw.div`
  text-base font-bold text-gray-900
`

const TooltipText = tw.div`leading-relaxed text-gray-700`

const TooltipTip = tw.div<{ variant: string }>`
  flex gap-2
  rounded-lg border border-${(props) => props.variant}-200 bg-${(props) => props.variant}-50 
  p-3
`

const TipIcon = tw.span`shrink-0 text-lg`

const TipText = tw.div`leading-relaxed text-gray-900 text-sm`

const TooltipComparison = tw.div`flex flex-col gap-2`

const ComparisonRow = tw.div`flex flex-col gap-1`

const ComparisonLabel = tw.div<{ variant: string }>`
  text-${(props) => props.variant}-700
  font-semibold
  text-sm
`

const ComparisonValue = tw.div`text-gray-600 text-sm`

const TooltipBenefits = tw.div`flex flex-col gap-2`

const BenefitTitle = tw.div`font-semibold text-gray-900 text-sm`

const BenefitsList = tw.ul`flex flex-col gap-1.5 ml-1`

const BenefitItem = tw.li`flex items-start gap-2 text-gray-700 text-sm`

const BenefitIcon = tw.span`text-green-600 font-bold shrink-0`

const TooltipWarning = tw.div`flex gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg`

const WarningIcon = tw.span`text-amber-600 shrink-0 flex items-center justify-center`

const WarningText = tw.div`text-gray-900 leading-relaxed text-sm`

const BackgroundDecor1 = tw.div`
  absolute -top-16 -right-16 sm:-top-32 sm:-right-32
  -z-10
  h-48 w-48 sm:h-64 sm:w-64 md:h-96 md:w-96
  animate-pulse
  animation-duration-[3s]
  rounded-full
  bg-linear-to-br from-blue-100/30 to-indigo-100/30
  blur-3xl
  pointer-events-none
`

const BackgroundDecor2 = tw.div`
  absolute -bottom-16 -left-16 sm:-bottom-32 sm:-left-32
  -z-10
  h-48 w-48 sm:h-64 sm:w-64 md:h-96 md:w-96
  animate-pulse
  animation-duration-[4s]
  rounded-full
  bg-linear-to-tr from-purple-100/30 to-pink-100/30
  blur-3xl
  pointer-events-none
`

