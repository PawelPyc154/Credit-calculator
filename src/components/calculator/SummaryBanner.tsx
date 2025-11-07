'use client'

import type { ReactNode } from 'react'
import tw from 'tw-tailwind'
import type { CalculationResult } from 'types/calculator'
import { formatCurrency } from 'utils/calculator'

export type SummaryBannerProps = {
  results: CalculationResult[]
  formData: {
    loanAmount: number
    loanPeriod: number
    downPayment: number
    monthlyIncome: number
  }
  formComponent: ReactNode
}

export const SummaryBanner = ({ results, formData, formComponent }: SummaryBannerProps) => {
  // Oblicz procent wkładu własnego
  const propertyValue = formData.loanAmount + formData.downPayment
  const downPaymentPercent =
    propertyValue > 0 ? Math.round((formData.downPayment / propertyValue) * 100) : 0

  return (
    <BannerContainer id="calculator">
      <BannerContent>
        <FormSection>{formComponent}</FormSection>

        <MetricsGrid>
          <MetricBox>
            <MetricLabel>Kwota kredytu</MetricLabel>
            <MetricValue>{formatCurrency(formData.loanAmount)}</MetricValue>
          </MetricBox>
          <MetricBox>
            <MetricLabel>Okres kredytowania</MetricLabel>
            <MetricValue>{formData.loanPeriod} lat</MetricValue>
          </MetricBox>
          <MetricBox>
            <MetricLabel>Wkład własny</MetricLabel>
            <MetricValue>
              {formatCurrency(formData.downPayment)} ({downPaymentPercent}%)
            </MetricValue>
          </MetricBox>
          <MetricBox>
            <MetricLabel>Dochód miesięczny</MetricLabel>
            <MetricValue>{formatCurrency(formData.monthlyIncome)}</MetricValue>
          </MetricBox>
        </MetricsGrid>
      </BannerContent>
    </BannerContainer>
  )
}

const BannerContainer = tw.div`
  w-full
  bg-gradient-to-r from-green-600 to-emerald-600
  text-white
  shadow-lg
`

const BannerContent = tw.div`
  mx-auto max-w-7xl
  px-4 sm:px-6 lg:px-8
  py-6 sm:py-8
  flex flex-col
  gap-6 lg:gap-8
`

const FormSection = tw.div`
  w-full
  
  /* Override form card styles for green background */
  [&>div]:bg-white/10 [&>div]:backdrop-blur-sm [&>div]:border-white/20 [&>div]:shadow-lg
  [&_input]:bg-white [&_input]:text-gray-900 [&_input]:border-white/30
  [&_input:focus]:border-white/50 [&_input:focus]:ring-white/20
  [&_span[class*="FieldTitle"]]:text-white [&_span[class*="FieldValue"]]:text-white
  [&_p[class*="FieldDescription"]]:text-white/80
  [&_span[class*="PurposeLabel"]]:text-white
  [&_label[class*="PurposeTile"]]:bg-white/20 [&_label[class*="PurposeTile"]]:border-white/30
  [&_label[class*="PurposeTile"]:has(input:checked)]:bg-white [&_label[class*="PurposeTile"]:has(input:checked)]:text-gray-900
  [&_button[class*="SubmitButton"]]:bg-white [&_button[class*="SubmitButton"]]:text-green-600
  [&_button[class*="SubmitButton"]:hover]:bg-white/90
  [&_p[class*="InlineInfo"]]:text-white/70
`

const MetricsGrid = tw.div`
  grid grid-cols-2 lg:grid-cols-4
  gap-3 sm:gap-4
  w-full
`

const MetricBox = tw.div`
  bg-white/10
  backdrop-blur-sm
  rounded-lg
  p-3 sm:p-4
  border border-white/20
`

const MetricLabel = tw.div`
  text-xs sm:text-sm
  text-green-50/90
  mb-1
`

const MetricValue = tw.div`
  text-lg sm:text-xl md:text-2xl
  font-bold
`

