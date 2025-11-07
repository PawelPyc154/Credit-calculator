'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useDebounce } from 'hooks/useDebounce'
import { useEffect } from 'react'
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
  ref?: React.RefObject<HTMLFormElement | null>
}

export const CalculatorForm = ({ onCalculate, hasResults, ref }: CalculatorFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
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
    if (isValid) {
      onCalculate(debouncedFormData)
    }
  }, [debouncedFormData, isValid, onCalculate])

  const loanAmount = watch('loanAmount')
  const loanPeriod = watch('loanPeriod')
  const downPayment = watch('downPayment')
  const monthlyIncome = watch('monthlyIncome')

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

        <Form ref={ref} onSubmit={handleSubmit(scrollToResults)}>
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
              tooltipContent={
                <TooltipContent>
                  <TooltipTitle>Kwota kredytu</TooltipTitle>
                  <TooltipText>
                    To suma pieniędzy, którą chcesz pożyczyć od banku na zakup nieruchomości.
                  </TooltipText>
                  <TooltipTip>
                    <TipIcon>💡</TipIcon>
                    <TipText>
                      <strong>Wskazówka:</strong> Im niższa kwota kredytu, tym niższa rata
                      miesięczna i łatwiej uzyskać zgodę banku. Zwiększ wkład własny, aby obniżyć
                      kwotę kredytu.
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
              tooltipContent={
                <TooltipContent>
                  <TooltipTitle>Okres kredytowania</TooltipTitle>
                  <TooltipText>
                    To czas, przez który będziesz spłacać kredyt. Typowo wynosi od 5 do 35 lat.
                  </TooltipText>
                  <TooltipTip>
                    <TipIcon>💡</TipIcon>
                    <TipText>
                      <strong>Wskazówka:</strong> Dłuższy okres = niższa rata miesięczna, ale wyższy
                      całkowity koszt kredytu przez większe odsetki. Krótszy okres = wyższa rata,
                      ale oszczędzasz na odsetkach.
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
              tooltipContent={
                <TooltipContent>
                  <TooltipTitle>Wkład własny</TooltipTitle>
                  <TooltipText>
                    To kwota, którą wpłacisz ze swoich oszczędności. Banki wymagają minimum 10-20%
                    wartości nieruchomości.
                  </TooltipText>
                  <TooltipTip>
                    <TipIcon>💡</TipIcon>
                    <TipText>
                      <strong>Wskazówka:</strong> Wyższy wkład własny (powyżej 20%) = lepsze warunki
                      kredytu, niższe oprocentowanie i brak konieczności ubezpieczenia niskiego
                      wkładu.
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
              tooltipContent={
                <TooltipContent>
                  <TooltipTitle>Dochód miesięczny</TooltipTitle>
                  <TooltipText>
                    To Twoje stałe, miesięczne zarobki netto (po potrąceniu podatków i ZUS).
                  </TooltipText>
                  <TooltipTip>
                    <TipIcon>💡</TipIcon>
                    <TipText>
                      <strong>Wskazówka:</strong> Bank sprawdza tzw. zdolność kredytową - czy Twój
                      dochód pozwala na bezpieczną spłatę raty. Zwykle rata nie może przekraczać
                      40-50% dochodu.
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
  -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-32
  pb-12 sm:pb-16 md:pb-20 lg:pb-24
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

const Form = tw.form`flex flex-col gap-8 sm:gap-10 md:gap-12`

const FormGrid = tw.div`grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2`

const FormGroupFullWidth = tw.div`md:col-span-2`

const SubmitButtonWrapper = tw.div`
  mt-6 sm:mt-8
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

const TooltipContent = tw.div`flex flex-col gap-3 max-w-xs text-sm`

const TooltipTitle = tw.div`
  border-b border-gray-200
  pb-2
  text-base font-bold text-gray-900
`

const TooltipText = tw.div`leading-relaxed text-gray-700`

const TooltipTip = tw.div`
  flex gap-2
  rounded-lg border border-blue-100 bg-blue-50 
  p-3
`

const TipIcon = tw.span`shrink-0 text-lg`

const TipText = tw.div`leading-relaxed text-gray-800`

const BackgroundDecor1 = tw.div`
  absolute -top-32 -right-32
  -z-10
  h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96
  animate-pulse
  animation-duration-[3s]
  rounded-full
  bg-linear-to-br from-blue-100/30 to-indigo-100/30
  blur-3xl
  pointer-events-none
`

const BackgroundDecor2 = tw.div`
  absolute -bottom-32 -left-32
  -z-10
  h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96
  animate-pulse
  animation-duration-[4s]
  rounded-full
  bg-linear-to-tr from-purple-100/30 to-pink-100/30
  blur-3xl
  pointer-events-none
`
