'use client'

import clsx from 'clsx'
import { BankLogo } from 'components/common/BankLogo'
import type { RefObject } from 'react'
import { useEffect, useState } from 'react'
import tw from 'tw-tailwind'
import type { CalculationResult } from 'types/calculator'
import { formatCurrency, formatPercent } from 'utils/calculator'
import { Tooltip } from '../common/tooltip'

export type BankRankingProps = {
  results: CalculationResult[]
  selectedParams: {
    loanAmount: number
    loanPeriod: number
    downPayment: number
  }
  onParamsChange: (params: { loanAmount: number; loanPeriod: number; downPayment: number }) => void
  formRef: RefObject<HTMLFormElement | null>
}

export const BankRanking = ({
  results,
  selectedParams,
  onParamsChange,
  formRef,
}: BankRankingProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const threshold = 400
      const newIsSticky = scrollPosition > threshold
      setIsSticky(newIsSticky)

      // Dodaj klasę do body gdy sticky bar jest aktywny
      if (newIsSticky) {
        document.body.style.paddingTop = '80px' // wysokość sticky bara na desktop
        if (window.innerWidth < 768) {
          document.body.style.paddingTop = '120px' // wyższa wartość na mobile
        }
      } else {
        document.body.style.paddingTop = '0'
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      document.body.style.paddingTop = '0'
    }
  }, [])

  if (results.length === 0) {
    return null
  }

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const scrollToForm = () => {
    if (formRef.current) {
      const offset = 100 // dodatkowy offset żeby formularz nie był zakryty
      const elementPosition = formRef.current.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div>
      {isSticky && selectedParams.loanAmount > 0 && (
        <StickyBar>
          <StickyContent>
            <StickyParams>
              <ParamChip>
                <ParamLabel>Kredyt:</ParamLabel>
                <ParamValue>{formatCurrency(selectedParams.loanAmount)}</ParamValue>
              </ParamChip>
              <ParamDivider>•</ParamDivider>
              <ParamChip>
                <ParamLabel>Okres:</ParamLabel>
                <ParamValue>{selectedParams.loanPeriod} lat</ParamValue>
              </ParamChip>
              <ParamDivider>•</ParamDivider>
              <ParamChip>
                <ParamLabel>Wkład:</ParamLabel>
                <ParamValue>{formatCurrency(selectedParams.downPayment)}</ParamValue>
              </ParamChip>
            </StickyParams>
            <EditButton onClick={scrollToForm}>
              <EditIcon>✏️</EditIcon>
              <EditButtonText>Zmień</EditButtonText>
            </EditButton>
          </StickyContent>
        </StickyBar>
      )}

      <RankingSection>
        <SectionHeader>
          <SectionIcon>🏆</SectionIcon>
          <SectionTitle>Najlepsze oferty dopasowane do Twoich potrzeb</SectionTitle>
          <SectionSubtitle>
            Porównaliśmy {results.length} ofert i wybraliśmy najlepsze dla Ciebie
          </SectionSubtitle>
          <PriorityInfo>
            <PriorityTitle>🎯 Na co zwrócić uwagę w pierwszej kolejności:</PriorityTitle>
            <PriorityList>
              <PriorityItem>
                <PriorityNumber>1.</PriorityNumber>
                <PriorityText>
                  <strong>Miesięczna rata</strong> - czy zmieści się w Twoim budżecie
                </PriorityText>
              </PriorityItem>
              <PriorityItem>
                <PriorityNumber>2.</PriorityNumber>
                <PriorityText>
                  <strong>Całkowity koszt</strong> - ile naprawdę zapłacisz za kredyt
                </PriorityText>
              </PriorityItem>
              <PriorityItem>
                <PriorityNumber>3.</PriorityNumber>
                <PriorityText>
                  <strong>Oprocentowanie</strong> - jak duże będą odsetki
                </PriorityText>
              </PriorityItem>
            </PriorityList>
          </PriorityInfo>
        </SectionHeader>

        <ResultsList>
          {results.map((result, index) => {
            const isExpanded = expandedId === result.bankId
            const rankColors = {
              0: 'from-yellow-400 to-orange-500',
              1: 'from-gray-300 to-gray-400',
              2: 'from-orange-400 to-orange-600',
            }
            const rankIcons = { 0: '🥇', 1: '🥈', 2: '🥉' }
            const isTopThree = index < 3 && result.isRecommended

            return (
              <BankCard
                key={result.bankId}
                className={clsx(
                  isTopThree && index === 0 && 'shadow-2xl ring-4 ring-yellow-400',
                  isTopThree && index === 1 && 'ring-2 ring-gray-300',
                  isTopThree && index === 2 && 'ring-2 ring-orange-400',
                )}
              >
                <CardInner>
                  {/* Lewa sekcja - Ranking i Logo */}
                  <LeftSection>
                    {isTopThree ? (
                      <RankBadge
                        className={clsx(
                          `bg-linear-to-r ${rankColors[index as keyof typeof rankColors]}`,
                        )}
                      >
                        <RankIcon>{rankIcons[index as keyof typeof rankIcons]}</RankIcon>
                        <RankNumber>#{index + 1}</RankNumber>
                      </RankBadge>
                    ) : (
                      <RankBadgeSimple>
                        <RankNumber>#{index + 1}</RankNumber>
                      </RankBadgeSimple>
                    )}
                    <BankLogo
                      src={result.bankLogo ?? '/images/banks/placeholder.png'}
                      alt={`${result.bankName} logo`}
                      bankName={result.bankName}
                      size="md"
                      priority={index < 3}
                    />
                  </LeftSection>

                  {/* Środkowa sekcja - Informacje */}
                  <MiddleSection>
                    <BankInfo>
                      <BankName>{result.bankName}</BankName>
                      <ScoreBadge>
                        <ScoreIcon>⭐</ScoreIcon>
                        {result.score}/100
                      </ScoreBadge>
                    </BankInfo>

                    <InfoRow>
                      <InfoItem>
                        <InfoIcon>💰</InfoIcon>
                        <InfoContent>
                          <InfoLabel>Miesięczna rata</InfoLabel>
                          <Tooltip
                            content={
                              <span>
                                Rata miesięczna to kwota, którą będziesz płacić co miesiąc. Ważne,
                                aby była dostosowana do Twojego budżetu.{' '}
                                <strong>Czym mniej, tym lepiej.</strong>
                              </span>
                            }
                          >
                            <InfoValue className="text-2xl text-blue-600">
                              {formatCurrency(result.monthlyPayment)}
                            </InfoValue>
                          </Tooltip>
                        </InfoContent>
                      </InfoItem>

                      <Divider />

                      <InfoItem>
                        <InfoIcon>📊</InfoIcon>
                        <InfoContent>
                          <InfoLabel>Oprocentowanie</InfoLabel>
                          <Tooltip
                            content={
                              <span>
                                Oprocentowanie wpływa na wysokość odsetek.{' '}
                                <strong>Niższe oprocentowanie oznacza niższe koszty.</strong>
                              </span>
                            }
                          >
                            <InfoValue>{formatPercent(result.interestRate)}</InfoValue>
                          </Tooltip>
                        </InfoContent>
                      </InfoItem>

                      <Divider />

                      <InfoItem>
                        <InfoIcon>💵</InfoIcon>
                        <InfoContent>
                          <InfoLabel>Całkowity koszt</InfoLabel>
                          <Tooltip
                            content={
                              <span>
                                Całkowity koszt kredytu obejmuje wszystkie odsetki i opłaty.{' '}
                                <strong>Im niższy, tym lepiej.</strong>
                              </span>
                            }
                          >
                            <InfoValue>{formatCurrency(result.totalCost)}</InfoValue>
                          </Tooltip>
                        </InfoContent>
                      </InfoItem>
                    </InfoRow>
                  </MiddleSection>

                  {/* Prawa sekcja - Akcje */}
                  <RightSection>
                    {isTopThree && (
                      <RecommendedLabel>
                        {index === 0 && 'Najlepsza oferta'}
                        {index === 1 && 'Druga najlepsza'}
                        {index === 2 && 'Trzecia najlepsza'}
                      </RecommendedLabel>
                    )}
                    <DetailsButton onClick={() => toggleExpanded(result.bankId)}>
                      {isExpanded ? (
                        <>
                          Ukryj szczegóły
                          <ButtonIcon>▲</ButtonIcon>
                        </>
                      ) : (
                        <>
                          Zobacz szczegóły
                          <ButtonIcon>▼</ButtonIcon>
                        </>
                      )}
                    </DetailsButton>
                  </RightSection>
                </CardInner>

                {/* Rozwinięte szczegóły */}
                {isExpanded && (
                  <DetailsSection>
                    <DetailsSectionTitle>Szczegółowa kalkulacja</DetailsSectionTitle>
                    <DetailsGrid>
                      <DetailCard>
                        <DetailIcon>💰</DetailIcon>
                        <DetailContent>
                          <DetailLabel>Całkowite odsetki</DetailLabel>
                          <Tooltip
                            content={
                              <span>
                                Całkowite odsetki to suma wszystkich odsetek, które zapłacisz w
                                trakcie trwania kredytu. <strong>Im niższe, tym lepiej.</strong>
                              </span>
                            }
                          >
                            <DetailValue>{formatCurrency(result.totalInterest)}</DetailValue>
                          </Tooltip>
                        </DetailContent>
                      </DetailCard>

                      <DetailCard>
                        <DetailIcon>📝</DetailIcon>
                        <DetailContent>
                          <DetailLabel>Prowizja banku</DetailLabel>
                          <Tooltip
                            content={
                              <span>
                                Prowizja banku to jednorazowa opłata pobierana przez bank za
                                udzielenie kredytu. <strong>Im niższa, tym lepiej.</strong>
                              </span>
                            }
                          >
                            <DetailValue>{formatCurrency(result.commission)}</DetailValue>
                          </Tooltip>
                        </DetailContent>
                      </DetailCard>

                      <DetailCard>
                        <DetailIcon>🛡️</DetailIcon>
                        <DetailContent>
                          <DetailLabel>Ubezpieczenie</DetailLabel>
                          <Tooltip
                            content={
                              <span>
                                Ubezpieczenie to dodatkowy koszt związany z zabezpieczeniem kredytu.{' '}
                                <strong>Im niższe, tym lepiej.</strong>
                              </span>
                            }
                          >
                            <DetailValue>{formatCurrency(result.insurance)}</DetailValue>
                          </Tooltip>
                        </DetailContent>
                      </DetailCard>
                    </DetailsGrid>
                  </DetailsSection>
                )}
              </BankCard>
            )
          })}
        </ResultsList>
      </RankingSection>
    </div>
  )
}

const RankingSection = tw.section`w-full max-w-6xl mx-auto px-4 py-16`

const SectionHeader = tw.div`text-center mb-12`
const SectionIcon = tw.span`text-5xl mb-4 inline-block animate-bounce`
const SectionTitle = tw.h2`text-3xl md:text-4xl font-bold text-gray-900 mb-3`
const SectionSubtitle = tw.p`text-gray-600 text-lg`

const ResultsList = tw.div`flex flex-col gap-6`

const BankCard = tw.div`
  bg-white rounded-2xl shadow-lg hover:shadow-xl 
  transition-all duration-300 relative
  border border-gray-100
  overflow-hidden
`

const CardInner = tw.div`
  p-6 md:p-8
  flex flex-col md:flex-row gap-6 md:gap-8
`

const LeftSection = tw.div`
  flex md:flex-col items-center gap-4
  md:min-w-[120px]
`

const RankBadge = tw.div`
  flex items-center gap-2
  text-white px-4 py-2 rounded-full text-sm font-bold
  shadow-lg
  md:flex-col md:w-20 md:h-20 md:justify-center
`

const RankBadgeSimple = tw.div`
  flex items-center justify-center
  bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-bold
  md:w-20 md:h-20
`

const RankIcon = tw.span`text-2xl`
const RankNumber = tw.span`text-sm font-bold`

const BankLogoWrapper = tw.div`
  w-24 h-24 md:w-28 md:h-28 
  flex items-center justify-center
  bg-white rounded-lg
  p-2
`

const MiddleSection = tw.div`flex-1 flex flex-col gap-4`

const BankInfo = tw.div`flex items-center justify-between gap-4 flex-wrap`
const BankName = tw.h3`text-2xl font-bold text-gray-900`
const ScoreBadge = tw.div`
  inline-flex items-center gap-1 
  bg-green-100 text-green-700 px-3 py-1 rounded-full 
  text-sm font-semibold
`
const ScoreIcon = tw.span`text-xs`

const InfoRow = tw.div`
  flex flex-col md:flex-row gap-4 md:gap-6
  md:items-center
`

const InfoItem = tw.div`flex items-center gap-3 flex-1`
const InfoIcon = tw.span`text-3xl`
const InfoContent = tw.div`flex flex-col`
const InfoLabel = tw.span`text-xs text-gray-600 uppercase tracking-wide font-semibold`
const InfoValue = tw.span`text-lg font-bold text-gray-900 mt-1`

const Divider = tw.div`hidden md:block w-px h-12 bg-gray-200`

const RightSection = tw.div`
  flex flex-col items-end justify-between gap-4
  md:min-w-[180px]
`

const RecommendedLabel = tw.div`
  text-sm font-bold text-blue-600
  bg-blue-50 px-4 py-2 rounded-lg
  text-center
`

const DetailsButton = tw.button`
  text-blue-600 hover:text-blue-700 
  font-semibold py-3 px-6 text-sm 
  transition-all duration-200
  flex items-center justify-center gap-2
  hover:bg-blue-50 rounded-lg
  border-2 border-blue-200 hover:border-blue-400
  w-full
`
const ButtonIcon = tw.span`text-xs`

const DetailsSection = tw.div`
  px-6 pb-6 md:px-8 md:pb-8 pt-6
  border-t border-gray-200
  bg-gray-50
  animate-in fade-in slide-in-from-top-2 duration-300
`

const DetailsSectionTitle = tw.h4`font-bold text-gray-900 mb-6 text-center text-lg`

const DetailsGrid = tw.div`grid grid-cols-1 md:grid-cols-3 gap-4 mb-6`

const DetailCard = tw.div`
  bg-white p-4 rounded-xl
  flex items-center gap-3
  hover:shadow-md transition-shadow
`

const DetailIcon = tw.span`text-2xl`
const DetailContent = tw.div`flex flex-col`
const DetailLabel = tw.span`text-xs text-gray-600 font-semibold uppercase tracking-wide`
const DetailValue = tw.span`text-sm font-bold text-gray-900 mt-1`

const StickyBar = tw.div`fixed top-0 left-0 right-0 bg-white shadow-lg border-b border-gray-200 z-50 animate-in slide-in-from-top duration-300`
const StickyContent = tw.div`max-w-6xl mx-auto px-3 py-2 md:px-4 md:py-3 flex items-center justify-between gap-2 md:gap-4 flex-wrap md:flex-nowrap`
const StickyParams = tw.div`flex items-center gap-2 md:gap-3 flex-wrap text-xs md:text-sm`
const ParamChip = tw.div`flex items-center gap-1 md:gap-2 bg-blue-50 px-2 py-1 md:px-3 md:py-1.5 rounded-lg whitespace-nowrap`
const ParamLabel = tw.span`text-xs md:text-xs text-gray-600 font-medium hidden md:inline`
const ParamValue = tw.span`text-xs md:text-sm font-bold text-blue-600`
const ParamDivider = tw.span`text-gray-400 hidden md:inline`
const EditButton = tw.button`flex items-center gap-1 md:gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition-colors whitespace-nowrap shrink-0`
const EditIcon = tw.span`text-sm md:text-base`
const EditButtonText = tw.span`hidden sm:inline`

const PriorityInfo = tw.div`mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6 max-w-3xl mx-auto`
const PriorityTitle = tw.h3`text-lg font-bold text-gray-900 mb-4 text-center`
const PriorityList = tw.ol`space-y-3`
const PriorityItem = tw.li`flex items-start gap-3`
const PriorityNumber = tw.span`shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold`
const PriorityText = tw.span`text-gray-700`
