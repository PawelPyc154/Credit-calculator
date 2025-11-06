'use client'

import { BankRanking } from 'components/calculator/BankRanking'
import { CalculatorForm } from 'components/calculator/CalculatorForm'
import { Disclaimer } from 'components/calculator/Disclaimer'
import { Footer } from 'components/calculator/Footer'
import { Hero } from 'components/calculator/Hero'
import { useCallback, useRef, useState } from 'react'
import tw from 'tw-tailwind'
import { parseBankOffers } from 'types/bank'
import type { CalculationResult, CalculatorFormData } from 'types/calculator'
import { calculateBankOffers } from 'utils/calculator'
import banksData from '../data/banks.json'

export default function Home() {
  const [results, setResults] = useState<CalculationResult[]>([])
  const [selectedParams, setSelectedParams] = useState<{
    loanAmount: number
    loanPeriod: number
    downPayment: number
  }>({
    loanAmount: 0,
    loanPeriod: 0,
    downPayment: 0,
  })

  const formRef = useRef<HTMLFormElement>(null)

  const handleCalculate = useCallback((formData: CalculatorFormData) => {
    try {
      const banks = parseBankOffers(banksData)
      const calculatedResults = calculateBankOffers(formData, banks)
      setResults(calculatedResults)

      // Zapisz parametry formularza
      setSelectedParams({
        loanAmount: formData.loanAmount,
        loanPeriod: formData.loanPeriod,
        downPayment: formData.downPayment,
      })
    } catch (error) {
      console.error('Błąd podczas kalkulacji:', error)
    }
  }, [])

  const handleParamsChange = useCallback(
    (params: { loanAmount: number; loanPeriod: number; downPayment: number }) => {
      setSelectedParams(params)

      // Przelicz wyniki z nowymi parametrami
      try {
        const banks = parseBankOffers(banksData)
        const formData: CalculatorFormData = {
          loanAmount: params.loanAmount,
          loanPeriod: params.loanPeriod,
          downPayment: params.downPayment,
          monthlyIncome: 0, // Możesz dodać te wartości do selectedParams jeśli są potrzebne
          purpose: 'purchase' as const,
        }
        const calculatedResults = calculateBankOffers(formData, banks)
        setResults(calculatedResults)
      } catch (error) {
        console.error('Błąd podczas przeliczania:', error)
      }
    },
    [],
  )

  return (
    <MainContainer>
      <Hero />
      <ContentWrapper>
        <div id="calculator">
          <CalculatorForm
            ref={formRef}
            onCalculate={handleCalculate}
            hasResults={results.length > 0}
          />
        </div>
        <div id="results">
          <BankRanking
            results={results}
            selectedParams={selectedParams}
            onParamsChange={handleParamsChange}
            formRef={formRef}
          />
        </div>
        {results.length > 0 && <Disclaimer />}
      </ContentWrapper>
      <Footer />
    </MainContainer>
  )
}

const MainContainer = tw.div`min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50`
const ContentWrapper = tw.div`pb-12`
