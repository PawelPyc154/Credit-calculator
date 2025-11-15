'use client'

import { BankResults } from 'components/calculator/BankResults'
import { CalculatorForm } from 'components/calculator/CalculatorForm'
import { Disclaimer } from 'components/calculator/Disclaimer'
import { FooterMain } from 'components/calculator/FooterMain'
import { NavigationTabs } from 'components/calculator/NavigationTabs'
import { StickySummaryBar } from 'components/calculator/StickySummaryBar'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import tw from 'tw-tailwind'
import type { BankOffer } from 'types/bank'
import type { CalculationResult, CalculatorFormData } from 'types/calculator'
import { trackCalculation, trackTimeOnPage } from 'utils/analytics'
import { calculateBankOffers } from 'utils/calculator'
import { banks } from '../../../data/banks'

const defaultFormData: CalculatorFormData = {
  loanAmount: 500000,
  loanPeriod: 25,
  downPayment: 100000,
  monthlyIncome: 8000,
  purpose: 'purchase',
  interestRateType: 'variable',
}

export default function HipotecznyCalculatorPage() {
  // Dane banków są teraz pobierane bezpośrednio z pliku banks.ts
  const banksData: BankOffer[] = banks

  const [results, setResults] = useState<CalculationResult[]>([])
  const [formData, setFormData] = useState<CalculatorFormData>(defaultFormData)
  const formRef = useRef<HTMLFormElement>(null)

  const averageMonthlyPayment = useMemo(() => {
    if (results.length === 0) {
      return null
    }

    const total = results.reduce((sum, result) => sum + result.monthlyPayment, 0)
    return Math.round(total / results.length)
  }, [results])

  const handleCalculate = useCallback(
    (formData: CalculatorFormData) => {
      try {
        const calculatedResults = calculateBankOffers(formData, banksData)
        setResults(calculatedResults)
        setFormData(formData)

        trackCalculation({
          loanAmount: formData.loanAmount,
          loanPeriod: formData.loanPeriod,
          downPayment: formData.downPayment,
          monthlyIncome: formData.monthlyIncome,
          purpose: formData.purpose,
          interestRateType: formData.interestRateType || 'variable',
          resultsCount: calculatedResults.length,
        })
      } catch (error) {
        console.error('Błąd podczas kalkulacji:', error)
      }
    },
    [banksData],
  )

  useEffect(() => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      const seconds = Math.floor((Date.now() - startTime) / 1000)
      if (seconds > 0 && seconds % 30 === 0) {
        trackTimeOnPage(seconds)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <MainContainer>
      <NavigationTabs activeTab="hipoteczny" />

      <CalculatorSection id="calculator">
        <CalculatorForm
          formRef={formRef}
          onCalculate={handleCalculate}
          hasResults={results.length > 0}
          defaultValues={formData}
          initialValues={defaultFormData}
          averageMonthlyPayment={averageMonthlyPayment}
        />
      </CalculatorSection>

      <StickySummaryBar
        formData={{
          loanAmount: formData.loanAmount,
          loanPeriod: formData.loanPeriod,
          downPayment: formData.downPayment,
          monthlyIncome: formData.monthlyIncome,
        }}
        onEditClick={() => {
          document.getElementById('calculator')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }}
      />

      <ContentWrapper>
        <ResultsSection id="results">
          <BankResults results={results} formData={formData} />
        </ResultsSection>
        {results.length > 0 && (
          <DisclaimerSection>
            <Disclaimer />
          </DisclaimerSection>
        )}
      </ContentWrapper>
      <FooterMain />
    </MainContainer>
  )
}

const MainContainer = tw.div`min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50`
const ContentWrapper = tw.div`flex flex-col`
const CalculatorSection = tw.section`w-full bg-linear-to-r from-green-600 to-emerald-600`
const ResultsSection = tw.section`w-full`
const DisclaimerSection = tw.section`w-full px-4 sm:px-6 lg:px-8 pt-2 pb-3 sm:pt-3 sm:pb-4`
