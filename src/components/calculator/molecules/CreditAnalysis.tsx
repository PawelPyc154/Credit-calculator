'use client'

import clsx from 'clsx'
import { useMemo } from 'react'
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineXCircle,
  HiOutlineInformationCircle,
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
  HiOutlineShieldCheck,
  HiOutlineShieldExclamation,
} from 'react-icons/hi'
import tw from 'tw-tailwind'
import type { CalculationResult, CalculatorFormData } from 'types/calculator'
import { analyzeCreditMatch, type CreditAnalysisResult } from 'utils/credit-analysis'
import { formatCurrencyNoCents, formatPercent } from 'utils/calculator'

type CreditAnalysisProps = {
  result: {
    bankId: string
    bankName: string
    monthlyPayment: number
    totalCost: number
    interestRate: number
    totalInterest: number
    commission: number
    insurance: number
    rrso: number
    bank?: CalculationResult['bank']
  }
  formData: CalculatorFormData
  allResults: Array<{
    bankId: string
    monthlyPayment: number
    totalCost: number
    rrso: number
  }>
}

export const CreditAnalysis = ({ result, formData, allResults }: CreditAnalysisProps) => {
  const analysis = useMemo(
    () => analyzeCreditMatch(result, formData, allResults),
    [result, formData, allResults],
  )

  return (
    <AnalysisContainer>
      {/* Ogólna ocena */}
      <OverallSection>
        <OverallHeader>
          <OverallTitle>Ocena dopasowania oferty</OverallTitle>
          <OverallScore score={analysis.overall.score}>
            {analysis.overall.score}/100
          </OverallScore>
        </OverallHeader>
        <OverallMatchLevel level={analysis.overall.matchLevel}>
          <MatchLevelIcon>
            {analysis.overall.matchLevel === 'excellent' && (
              <HiOutlineCheckCircle className="w-6 h-6 text-green-600" />
            )}
            {analysis.overall.matchLevel === 'good' && (
              <HiOutlineCheckCircle className="w-6 h-6 text-blue-600" />
            )}
            {analysis.overall.matchLevel === 'moderate' && (
              <HiOutlineExclamationCircle className="w-6 h-6 text-orange-600" />
            )}
            {analysis.overall.matchLevel === 'poor' && (
              <HiOutlineXCircle className="w-6 h-6 text-red-600" />
            )}
          </MatchLevelIcon>
          <MatchLevelText>{analysis.overall.summary}</MatchLevelText>
        </OverallMatchLevel>
        
        {analysis.overall.keyStrengths.length > 0 && (
          <StrengthsList>
            {analysis.overall.keyStrengths.map((strength, index) => (
              <StrengthItem key={index}>
                <StrengthIcon>
                  <HiOutlineCheckCircle className="w-5 h-5" />
                </StrengthIcon>
                <StrengthText>{strength}</StrengthText>
              </StrengthItem>
            ))}
          </StrengthsList>
        )}
        
        {analysis.overall.keyConcerns.length > 0 && (
          <ConcernsList>
            {analysis.overall.keyConcerns.map((concern, index) => (
              <ConcernItem key={index}>
                <ConcernIcon>
                  <HiOutlineExclamationCircle className="w-5 h-5" />
                </ConcernIcon>
                <ConcernText>{concern}</ConcernText>
              </ConcernItem>
            ))}
          </ConcernsList>
        )}
        
        <FinalRecommendation>
          <RecommendationIcon>
            <HiOutlineInformationCircle className="w-5 h-5" />
          </RecommendationIcon>
          <RecommendationText>{analysis.overall.finalRecommendation}</RecommendationText>
        </FinalRecommendation>
      </OverallSection>

      {/* Zdolność kredytowa */}
      <AffordabilitySection>
        <SectionHeader>
          <SectionTitle>Zdolność kredytowa</SectionTitle>
          <AffordabilityBadge level={analysis.affordability.affordabilityLevel}>
            {analysis.affordability.affordabilityLevel === 'excellent' && 'Doskonała'}
            {analysis.affordability.affordabilityLevel === 'good' && 'Dobra'}
            {analysis.affordability.affordabilityLevel === 'moderate' && 'Umiarkowana'}
            {analysis.affordability.affordabilityLevel === 'risky' && 'Ryzykowna'}
            {analysis.affordability.affordabilityLevel === 'critical' && 'Krytyczna'}
          </AffordabilityBadge>
        </SectionHeader>
        
        <AffordabilityGrid>
          <AffordabilityCard>
            <AffordabilityLabel>Rata / Dochód</AffordabilityLabel>
            <AffordabilityValue level={analysis.affordability.affordabilityLevel}>
              {formatPercent(analysis.affordability.dtiPercentage)}
            </AffordabilityValue>
            <AffordabilitySubtext>
              {formatCurrencyNoCents(result.monthlyPayment)} / {formatCurrencyNoCents(formData.monthlyIncome)}
            </AffordabilitySubtext>
          </AffordabilityCard>
          
          <AffordabilityCard>
            <AffordabilityLabel>Pozostały dochód</AffordabilityLabel>
            <AffordabilityValue level={analysis.affordability.affordabilityLevel}>
              {formatCurrencyNoCents(analysis.affordability.remainingIncome)}
            </AffordabilityValue>
            <AffordabilitySubtext>
              {formatPercent(analysis.affordability.remainingIncomePercentage)} dochodu
            </AffordabilitySubtext>
          </AffordabilityCard>
        </AffordabilityGrid>
        
        <AffordabilityRecommendation>
          {analysis.affordability.recommendation}
        </AffordabilityRecommendation>
      </AffordabilitySection>

      {/* Porównanie z innymi ofertami */}
      <ComparisonSection>
        <SectionHeader>
          <SectionTitle>Porównanie z innymi ofertami</SectionTitle>
          <RankBadge isTop={analysis.comparison.isTopOffer}>
            {analysis.comparison.rank}. miejsce
          </RankBadge>
        </SectionHeader>
        
        <ComparisonGrid>
          <ComparisonCard>
            <ComparisonLabel>Pozycja w rankingu</ComparisonLabel>
            <ComparisonValue>
              {analysis.comparison.rank} / {analysis.comparison.totalOffers}
            </ComparisonValue>
            {analysis.comparison.isTopOffer && (
              <ComparisonBadge>
                <HiOutlineCheckCircle className="w-4 h-4" />
                Top oferta
              </ComparisonBadge>
            )}
          </ComparisonCard>
          
          <ComparisonCard>
            <ComparisonLabel>Rata vs średnia</ComparisonLabel>
            <ComparisonValue trend={analysis.comparison.monthlyPaymentDifference}>
              {analysis.comparison.monthlyPaymentDifference >= 0 ? (
                <HiOutlineTrendingUp className="w-5 h-5 text-orange-500" />
              ) : (
                <HiOutlineTrendingDown className="w-5 h-5 text-green-500" />
              )}
              {formatPercent(Math.abs(analysis.comparison.monthlyPaymentDifferencePercent))}
            </ComparisonValue>
            <ComparisonSubtext>
              {analysis.comparison.monthlyPaymentDifference >= 0 ? 'wyższa' : 'niższa'} od średniej
            </ComparisonSubtext>
          </ComparisonCard>
          
          <ComparisonCard>
            <ComparisonLabel>Całkowity koszt vs średnia</ComparisonLabel>
            <ComparisonValue trend={analysis.comparison.totalCostDifference}>
              {analysis.comparison.totalCostDifference >= 0 ? (
                <HiOutlineTrendingUp className="w-5 h-5 text-orange-500" />
              ) : (
                <HiOutlineTrendingDown className="w-5 h-5 text-green-500" />
              )}
              {formatPercent(Math.abs(analysis.comparison.totalCostDifferencePercent))}
            </ComparisonValue>
            <ComparisonSubtext>
              {analysis.comparison.totalCostDifference >= 0 ? 'wyższy' : 'niższy'} od średniej
            </ComparisonSubtext>
          </ComparisonCard>
        </ComparisonGrid>
        
        <ComparisonRecommendation>
          {analysis.comparison.recommendation}
        </ComparisonRecommendation>
      </ComparisonSection>

      {/* Analiza ryzyk */}
      {analysis.risks.hasVariableRate && (
        <RisksSection>
          <SectionHeader>
            <SectionTitle>Analiza ryzyk</SectionTitle>
            <RiskBadge level={analysis.risks.interestRateRisk}>
              {analysis.risks.interestRateRisk === 'low' && 'Niskie ryzyko'}
              {analysis.risks.interestRateRisk === 'medium' && 'Średnie ryzyko'}
              {analysis.risks.interestRateRisk === 'high' && 'Wysokie ryzyko'}
            </RiskBadge>
          </SectionHeader>
          
          <RiskWarning>
            <RiskWarningIcon>
              <HiOutlineShieldExclamation className="w-5 h-5" />
            </RiskWarningIcon>
            <RiskWarningText>
              Kredyt ze zmiennym oprocentowaniem oznacza, że rata może się zmieniać w zależności od zmian stóp procentowych.
            </RiskWarningText>
          </RiskWarning>
          
          {analysis.risks.riskScenarios.length > 0 && (
            <RiskScenarios>
              <RiskScenariosTitle>Scenariusze wzrostu stóp procentowych</RiskScenariosTitle>
              {analysis.risks.riskScenarios.map((scenario, index) => (
                <RiskScenarioCard key={index} isAffordable={scenario.isAffordable}>
                  <RiskScenarioHeader>
                    <RiskScenarioTitle>{scenario.scenario}</RiskScenarioTitle>
                    {scenario.isAffordable ? (
                      <HiOutlineShieldCheck className="w-5 h-5 text-green-500" />
                    ) : (
                      <HiOutlineExclamationCircle className="w-5 h-5 text-red-500" />
                    )}
                  </RiskScenarioHeader>
                  <RiskScenarioDetails>
                    <RiskScenarioDetail>
                      <RiskScenarioLabel>Nowe oprocentowanie:</RiskScenarioLabel>
                      <RiskScenarioValue>{formatPercent(scenario.newRate)}</RiskScenarioValue>
                    </RiskScenarioDetail>
                    <RiskScenarioDetail>
                      <RiskScenarioLabel>Nowa rata:</RiskScenarioLabel>
                      <RiskScenarioValue>
                        {formatCurrencyNoCents(scenario.newMonthlyPayment)}
                      </RiskScenarioValue>
                    </RiskScenarioDetail>
                    <RiskScenarioDetail>
                      <RiskScenarioLabel>Wzrost raty:</RiskScenarioLabel>
                      <RiskScenarioValue className="text-orange-600">
                        +{formatCurrencyNoCents(scenario.increase)}
                      </RiskScenarioValue>
                    </RiskScenarioDetail>
                  </RiskScenarioDetails>
                  <RiskScenarioWarning isAffordable={scenario.isAffordable}>
                    {scenario.warning}
                  </RiskScenarioWarning>
                </RiskScenarioCard>
              ))}
            </RiskScenarios>
          )}
          
          {analysis.risks.recommendations.length > 0 && (
            <RiskRecommendations>
              <RiskRecommendationsTitle>Rekomendacje</RiskRecommendationsTitle>
              {analysis.risks.recommendations.map((rec, index) => (
                <RiskRecommendationItem key={index}>
                  <HiOutlineInformationCircle className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>{rec}</span>
                </RiskRecommendationItem>
              ))}
            </RiskRecommendations>
          )}
        </RisksSection>
      )}
      
      {!analysis.risks.hasVariableRate && (
        <RisksSection>
          <SectionHeader>
            <SectionTitle>Analiza ryzyk</SectionTitle>
            <RiskBadge level="low">
              Niskie ryzyko
            </RiskBadge>
          </SectionHeader>
          <RiskWarning>
            <RiskWarningIcon>
              <HiOutlineShieldCheck className="w-5 h-5 text-green-500" />
            </RiskWarningIcon>
            <RiskWarningText>
              Kredyt ze stałym oprocentowaniem zapewnia stabilność raty przez cały okres kredytowania. Nie musisz się martwić o zmiany stóp procentowych.
            </RiskWarningText>
          </RiskWarning>
        </RisksSection>
      )}
    </AnalysisContainer>
  )
}

// Styled components
const AnalysisContainer = tw.div`
  space-y-6
`

const OverallSection = tw.div`
  bg-gradient-to-br from-blue-50 to-indigo-50
  rounded-xl border border-blue-200 p-6
`

const OverallHeader = tw.div`
  flex items-center justify-between mb-4
`

const OverallTitle = tw.h3`
  text-lg font-bold text-gray-900
`

const OverallScore = tw.div<{ score: number }>`
  text-2xl font-black
  ${(p) => {
    if (p.score >= 80) return 'text-green-600'
    if (p.score >= 60) return 'text-blue-600'
    if (p.score >= 40) return 'text-orange-600'
    return 'text-red-600'
  }}
`

const OverallMatchLevel = tw.div<{ level: string }>`
  flex items-start gap-3 p-4 rounded-lg mb-4
  ${(p) => {
    if (p.level === 'excellent') return 'bg-green-50 border border-green-200'
    if (p.level === 'good') return 'bg-blue-50 border border-blue-200'
    if (p.level === 'moderate') return 'bg-orange-50 border border-orange-200'
    return 'bg-red-50 border border-red-200'
  }}
`

const MatchLevelIcon = tw.div`
  shrink-0
`

const MatchLevelText = tw.p`
  text-sm text-gray-700 flex-1
`

const StrengthsList = tw.div`
  space-y-2 mb-4
`

const StrengthItem = tw.div`
  flex items-start gap-2
`

const StrengthIcon = tw.div`
  text-green-500 shrink-0 mt-0.5
`

const StrengthText = tw.span`
  text-sm text-gray-700
`

const ConcernsList = tw.div`
  space-y-2 mb-4
`

const ConcernItem = tw.div`
  flex items-start gap-2
`

const ConcernIcon = tw.div`
  text-orange-500 shrink-0 mt-0.5
`

const ConcernText = tw.span`
  text-sm text-gray-700
`

const FinalRecommendation = tw.div`
  flex items-start gap-2 p-3 bg-blue-100 rounded-lg border border-blue-200
`

const RecommendationIcon = tw.div`
  text-blue-600 shrink-0 mt-0.5
`

const RecommendationText = tw.p`
  text-sm font-medium text-blue-900
`

const AffordabilitySection = tw.div`
  bg-white rounded-xl border border-gray-200 p-6
`

const SectionHeader = tw.div`
  flex items-center justify-between mb-4
`

const SectionTitle = tw.h3`
  text-lg font-bold text-gray-900
`

const AffordabilityBadge = tw.span<{ level: string }>`
  px-3 py-1 rounded-full text-xs font-semibold
  ${(p) => {
    if (p.level === 'excellent') return 'bg-green-100 text-green-700'
    if (p.level === 'good') return 'bg-blue-100 text-blue-700'
    if (p.level === 'moderate') return 'bg-orange-100 text-orange-700'
    if (p.level === 'risky') return 'bg-red-100 text-red-700'
    return 'bg-red-200 text-red-800'
  }}
`

const AffordabilityGrid = tw.div`
  grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4
`

const AffordabilityCard = tw.div`
  bg-gray-50 rounded-lg p-4 border border-gray-200
`

const AffordabilityLabel = tw.div`
  text-xs text-gray-600 mb-2
`

const AffordabilityValue = tw.div<{ level: string }>`
  text-2xl font-bold mb-1
  ${(p) => {
    if (p.level === 'excellent') return 'text-green-600'
    if (p.level === 'good') return 'text-blue-600'
    if (p.level === 'moderate') return 'text-orange-600'
    if (p.level === 'risky') return 'text-red-600'
    return 'text-red-700'
  }}
`

const AffordabilitySubtext = tw.div`
  text-xs text-gray-500
`

const AffordabilityRecommendation = tw.p`
  text-sm text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-100
`

const ComparisonSection = tw.div`
  bg-white rounded-xl border border-gray-200 p-6
`

const RankBadge = tw.span<{ isTop: boolean }>`
  px-3 py-1 rounded-full text-xs font-semibold
  ${(p) => (p.isTop ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700')}
`

const ComparisonGrid = tw.div`
  grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4
`

const ComparisonCard = tw.div`
  bg-gray-50 rounded-lg p-4 border border-gray-200
`

const ComparisonLabel = tw.div`
  text-xs text-gray-600 mb-2
`

const ComparisonValue = tw.div<{ trend?: number }>`
  flex items-center gap-2 text-xl font-bold
  ${(p) => {
    if (p.trend === undefined) return 'text-gray-900'
    return p.trend >= 0 ? 'text-orange-600' : 'text-green-600'
  }}
`

const ComparisonSubtext = tw.div`
  text-xs text-gray-500 mt-1
`

const ComparisonBadge = tw.div`
  inline-flex items-center gap-1 mt-2 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold
`

const ComparisonRecommendation = tw.p`
  text-sm text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-100
`

const RisksSection = tw.div`
  bg-white rounded-xl border border-gray-200 p-6
`

const RiskBadge = tw.span<{ level: string }>`
  px-3 py-1 rounded-full text-xs font-semibold
  ${(p) => {
    if (p.level === 'low') return 'bg-green-100 text-green-700'
    if (p.level === 'medium') return 'bg-orange-100 text-orange-700'
    return 'bg-red-100 text-red-700'
  }}
`

const RiskWarning = tw.div`
  flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200 mb-4
`

const RiskWarningIcon = tw.div`
  text-yellow-600 shrink-0 mt-0.5
`

const RiskWarningText = tw.p`
  text-sm text-gray-700 flex-1
`

const RiskScenarios = tw.div`
  space-y-4 mb-4
`

const RiskScenariosTitle = tw.h4`
  text-sm font-semibold text-gray-900 mb-3
`

const RiskScenarioCard = tw.div<{ isAffordable: boolean }>`
  p-4 rounded-lg border
  ${(p) =>
    p.isAffordable
      ? 'bg-green-50 border-green-200'
      : 'bg-red-50 border-red-200'}
`

const RiskScenarioHeader = tw.div`
  flex items-center justify-between mb-3
`

const RiskScenarioTitle = tw.h4`
  text-sm font-semibold text-gray-900
`

const RiskScenarioDetails = tw.div`
  space-y-2 mb-3
`

const RiskScenarioDetail = tw.div`
  flex items-center justify-between
`

const RiskScenarioLabel = tw.span`
  text-xs text-gray-600
`

const RiskScenarioValue = tw.span`
  text-sm font-semibold text-gray-900
`

const RiskScenarioWarning = tw.p<{ isAffordable: boolean }>`
  text-xs mt-2
  ${(p) => (p.isAffordable ? 'text-green-700' : 'text-red-700')}
`

const RiskRecommendations = tw.div`
  space-y-2
`

const RiskRecommendationsTitle = tw.h4`
  text-sm font-semibold text-gray-900 mb-2
`

const RiskRecommendationItem = tw.div`
  flex items-start gap-2 text-sm text-gray-700
`

