'use client'

import { BankRanking } from 'components/calculator/BankRanking'
import { CalculatorForm } from 'components/calculator/CalculatorForm'
import { BankResultsCursor } from 'components/calculator/cursor/BankResultsCursor'
import { CalculatorFormCursor } from 'components/calculator/cursor/CalculatorFormCursor'
import { DisclaimerCursor } from 'components/calculator/cursor/DisclaimerCursor'
import { FooterCursor } from 'components/calculator/cursor/FooterCursor'
import { Disclaimer } from 'components/calculator/Disclaimer'
import { ExperimentSwitch, type ExperimentVariant } from 'components/calculator/ExperimentSwitch'
import { Footer } from 'components/calculator/Footer'
import { Hero } from 'components/calculator/Hero'
import { NavigationTabs, type TabType } from 'components/calculator/NavigationTabs'
import { StickySummaryBar } from 'components/calculator/StickySummaryBar'
import { useCallback, useMemo, useRef, useState } from 'react'
import tw from 'tw-tailwind'
import type { BankOffer } from 'types/bank'
import { parseBankOffers } from 'types/bank'
import type { CalculationResult, CalculatorFormData } from 'types/calculator'
import { calculateBankOffers } from 'utils/calculator'
import banksData from '../data/banks.json'

const defaultFormData: CalculatorFormData = {
  loanAmount: 500000,
  loanPeriod: 25,
  downPayment: 100000,
  monthlyIncome: 8000,
  purpose: 'purchase',
}

export default function Home() {
  const banks = useMemo(() => {
    try {
      return parseBankOffers(banksData)
    } catch (error) {
      console.error('Błąd podczas ładowania ofert banków:', error)
      return [] as BankOffer[]
    }
  }, [])

  const [variant, setVariant] = useState<ExperimentVariant>('copilot')
  const [activeTab, setActiveTab] = useState<TabType>('hipoteczny')

  const [copilotResults, setCopilotResults] = useState<CalculationResult[]>([])
  const [cursorResults, setCursorResults] = useState<CalculationResult[]>([])

  const [copilotParams, setCopilotParams] = useState({
    loanAmount: defaultFormData.loanAmount,
    loanPeriod: defaultFormData.loanPeriod,
    downPayment: defaultFormData.downPayment,
  })

  const [cursorFormData, setCursorFormData] = useState<CalculatorFormData>(defaultFormData)

  const copilotFormRef = useRef<HTMLFormElement>(null)
  const cursorFormRef = useRef<HTMLFormElement>(null)

  const handleCalculateCopilot = useCallback(
    (formData: CalculatorFormData) => {
      try {
        const calculatedResults = calculateBankOffers(formData, banks)
        setCopilotResults(calculatedResults)
        setCopilotParams({
          loanAmount: formData.loanAmount,
          loanPeriod: formData.loanPeriod,
          downPayment: formData.downPayment,
        })
      } catch (error) {
        console.error('Błąd podczas kalkulacji (Copilot):', error)
      }
    },
    [banks],
  )

  const handleCalculateCursor = useCallback(
    (formData: CalculatorFormData) => {
      try {
        const calculatedResults = calculateBankOffers(formData, banks)
        setCursorResults(calculatedResults)
        setCursorFormData(formData)
      } catch (error) {
        console.error('Błąd podczas kalkulacji (Cursor):', error)
      }
    },
    [banks],
  )

  const activeResults = variant === 'copilot' ? copilotResults : cursorResults
  const activeParams =
    variant === 'copilot'
      ? copilotParams
      : {
          loanAmount: cursorFormData.loanAmount,
          loanPeriod: cursorFormData.loanPeriod,
          downPayment: cursorFormData.downPayment,
        }
  const hasActiveResults = activeResults.length > 0

  const experimentSwitch = <ExperimentSwitch variant={variant} onChange={setVariant} />

  return (
    <MainContainer>
      {variant === 'copilot' ? (
        <>
          <Hero actionSlot={experimentSwitch} />
          <ContentWrapper>
            <CalculatorSection id="calculator">
              <CalculatorForm
                formRef={copilotFormRef}
                onCalculate={handleCalculateCopilot}
                hasResults={copilotResults.length > 0}
              />
            </CalculatorSection>
            <ResultsSection id="results">
              <BankRanking
                results={copilotResults}
                selectedParams={copilotParams}
                formRef={copilotFormRef}
              />
            </ResultsSection>
            {copilotResults.length > 0 && (
              <DisclaimerSection>
                <Disclaimer />
              </DisclaimerSection>
            )}
          </ContentWrapper>
          <Footer />
        </>
      ) : (
        <>
          <NavigationTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            variant={variant}
            onVariantChange={setVariant}
          />

          <CalculatorSection id="calculator">
            <CalculatorFormCursor
              formRef={cursorFormRef}
              onCalculate={handleCalculateCursor}
              hasResults={cursorResults.length > 0}
              defaultValues={cursorFormData}
            />
          </CalculatorSection>

          <StickySummaryBar
            formData={{
              loanAmount: cursorFormData.loanAmount,
              loanPeriod: cursorFormData.loanPeriod,
              downPayment: cursorFormData.downPayment,
              monthlyIncome: cursorFormData.monthlyIncome,
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
              <BankResultsCursor
                results={cursorResults}
                formData={cursorFormData}
                formRef={cursorFormRef}
              />
            </ResultsSection>
            {cursorResults.length > 0 && (
              <DisclaimerSection>
                <DisclaimerCursor />
              </DisclaimerSection>
            )}
          </ContentWrapper>
          <FooterCursor />
        </>
      )}
    </MainContainer>
  )
}

const MainContainer = tw.div`min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50`
const ContentWrapper = tw.div`flex flex-col`
const CalculatorSection = tw.section`w-full bg-linear-to-r from-green-600 to-emerald-600`
const ResultsSection = tw.section`w-full`
const DisclaimerSection = tw.section`w-full px-4 sm:px-6 lg:px-8 pt-2 pb-2 sm:pt-3 sm:pb-3 md:pt-4 md:pb-4`
