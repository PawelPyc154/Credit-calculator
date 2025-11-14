'use client'

import clsx from 'clsx'
import { BankLogo } from 'components/common/BankLogo'
import { useState } from 'react'
import tw from 'tw-tailwind'
import type { CalculationResult, CalculatorFormData } from 'types/calculator'
import { trackAffiliateClick, trackBankDetailsExpand } from 'utils/analytics'
import { formatCurrencyNoCents, formatPercent } from 'utils/calculator'
import { BankDetails } from './molecules/BankDetails'

type BankResultsProps = {
  results: CalculationResult[]
  formData: CalculatorFormData
}

export const BankResults = ({ results, formData }: BankResultsProps) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
        const result = results.find((r) => r.bankId === id)
        if (result) {
          trackBankDetailsExpand({
            bankName: result.bankName,
            bankId: result.bankId,
            position: results.indexOf(result) + 1,
          })
        }
      }
      return newSet
    })
  }

  const handleAffiliateClick = (result: CalculationResult) => {
    trackAffiliateClick({
      bankName: result.bankName,
      bankId: result.bankId,
      campaignId: result.bank?.affiliate?.campaignId,
      position: results.indexOf(result) + 1,
      loanAmount: formData.loanAmount,
      monthlyPayment: result.monthlyPayment,
    })
  }

  const updateDates = results
    .map((result) => result.bank?.updated)
    .filter((date): date is string => Boolean(date))
    .map((date) => new Date(date).getTime())
    .filter((time) => !Number.isNaN(time))

  const latestUpdateDate =
    updateDates.length > 0 ? new Date(Math.max(...updateDates)).toLocaleDateString('pl-PL') : null

  const hasResults = results.length > 0

  if (!hasResults) {
    return (
      <EmptyState>
        <EmptyTitle>Brak wyników</EmptyTitle>
        <EmptySubtitle>
          Uzupełnij parametry, aby zobaczyć minimalistyczne porównanie banków.
        </EmptySubtitle>
      </EmptyState>
    )
  }

  return (
    <ResultsContainer>
      <ResultsHeader>
        <ResultsTitle>Porównanie ofert ({results.length})</ResultsTitle>
      </ResultsHeader>
      <OfferList>
        {results.map((offer, index) => {
          const isExpanded = expandedIds.has(offer.bankId)
          const hasAffiliate = offer.bank?.affiliate?.enabled && offer.bank?.affiliate?.url
          const isTopThree = index < 3 && offer.isRecommended
          const expandedSectionId = `offer-details-${offer.bankId}`
          const targetSelector = `#${expandedSectionId}`

          return (
            <OfferCard
              key={offer.bankId}
              className={clsx(
                isTopThree && index === 0 && 'is-best',
                isTopThree && index === 1 && 'is-second',
                isTopThree && index === 2 && 'is-third',
              )}
            >
              {isTopThree ? (
                <TopBadge
                  className={clsx(
                    index === 0 && 'badge-best',
                    index === 1 && 'badge-second',
                    index === 2 && 'badge-third',
                  )}
                >
                  {index === 0 && 'Najlepsza oferta'}
                  {index === 1 && 'Druga najlepsza'}
                  {index === 2 && 'Trzecia najlepsza'}
                </TopBadge>
              ) : (
                <TopBadge className="badge-default">#{index + 1}</TopBadge>
              )}
              <OfferRow>
                <OfferContentWrapper>
                  <OfferHeader>
                    <OfferLead>
                      <LogoWrapper>
                        <BankLogo
                          src={offer.bankLogo ?? '/images/banks/placeholder.png'}
                          alt={offer.bankName}
                          bankName={offer.bankName}
                          size="md"
                        />
                      </LogoWrapper>
                      <OfferNameWrapper>
                        <OfferName>{offer.bankName}</OfferName>
                        {offer.bank?.productName ? (
                          <ProductName>{offer.bank.productName}</ProductName>
                        ) : null}
                      </OfferNameWrapper>
                    </OfferLead>
                  </OfferHeader>

                  <OfferMetrics>
                    <MetricItem className="text-left sm:text-left lg:text-left">
                      <MetricLabel>
                        RRSO
                        {formData.interestRateType && (
                          <InterestRateTypeBadge>
                            {formData.interestRateType === 'fixed' ? 'Stałe' : 'Zmienne'}
                          </InterestRateTypeBadge>
                        )}
                      </MetricLabel>
                      <MetricValue>{formatPercent(offer.rrso)}</MetricValue>
                    </MetricItem>
                    <MetricItem className="text-left sm:text-center lg:text-left">
                      <MetricLabel>Całkowity koszt</MetricLabel>
                      <MetricValue>{formatCurrencyNoCents(offer.totalCost)}</MetricValue>
                    </MetricItem>
                    <MetricItemHighlight
                      className={clsx(
                        'text-left sm:text-right lg:text-left',
                        isTopThree && index === 0 && 'highlight-best',
                        isTopThree && index === 1 && 'highlight-second',
                        isTopThree && index === 2 && 'highlight-third',
                      )}
                    >
                      <MetricLabelHighlight
                        className={clsx(
                          isTopThree && index === 0 && 'label-best',
                          isTopThree && index === 1 && 'label-second',
                          isTopThree && index === 2 && 'label-third',
                        )}
                      >
                        Miesięczna rata
                      </MetricLabelHighlight>
                      <MetricValueHighlight>
                        {formatCurrencyNoCents(offer.monthlyPayment)}
                      </MetricValueHighlight>
                    </MetricItemHighlight>
                  </OfferMetrics>
                </OfferContentWrapper>

                {/* Przyciski akcji */}
                <OfferActions className={clsx(!hasAffiliate && 'justify-center md:justify-end')}>
                  {hasAffiliate && (
                    <AffiliateButton
                      href={offer.bank?.affiliate?.url ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      onClick={() => handleAffiliateClick(offer)}
                      className={clsx(isTopThree && index === 0 && 'animate-pulse-glow')}
                    >
                      <AffiliateIconWrapper>
                        <svg
                          className="h-full w-full"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <title>Ikona wniosku</title>
                          <path d="M10 2v6m0 0L8 6m2 2l2-2" />
                          <path d="M2 12.4V17a1 1 0 001 1h14a1 1 0 001-1v-4.6" />
                          <path d="M18 9l-8 8-8-8" />
                        </svg>
                      </AffiliateIconWrapper>
                      <AffiliateContent>
                        <AffiliateText>Złóż wniosek online</AffiliateText>
                      </AffiliateContent>
                    </AffiliateButton>
                  )}
                  <DetailsButton
                    onClick={() => toggleExpanded(offer.bankId)}
                    aria-expanded={isExpanded}
                    aria-label={isExpanded ? 'Ukryj szczegóły oferty' : 'Zobacz szczegóły oferty'}
                  >
                    <DetailsButtonText>
                      {isExpanded ? 'Ukryj szczegóły' : 'Zobacz szczegóły'}
                    </DetailsButtonText>
                  </DetailsButton>
                </OfferActions>
              </OfferRow>

              {/* Rozwinięte szczegóły */}
              {isExpanded && (
                <ExpandedSection id={expandedSectionId}>
                  <BankDetails
                    result={{
                      ...offer,
                      loanAmount: formData.loanAmount,
                      loanPeriod: formData.loanPeriod,
                    }}
                    formData={formData}
                  />
                </ExpandedSection>
              )}
            </OfferCard>
          )
        })}
      </OfferList>
      {latestUpdateDate && (
        <UpdateInfo>
          <svg
            className="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Dane zaktualizowane: {latestUpdateDate}</span>
        </UpdateInfo>
      )}
    </ResultsContainer>
  )
}

const ResultsContainer = tw.section`
  mx-auto
  w-full
  max-w-7xl
  px-4 sm:px-6 lg:px-8
  pt-6 pb-6 sm:pt-8 sm:pb-8 md:pt-10 md:pb-10
  flex flex-col gap-4
`

const ResultsHeader = tw.div`
  mb-2
  flex flex-col gap-1
`

const ResultsTitle = tw.h2`
  text-xl sm:text-2xl font-bold text-gray-900
`

const ResultsSubtitle = tw.p`
  text-sm text-gray-600
`

const EmptyState = tw.div`
  mx-auto
  w-full
  max-w-3xl
  bg-white
  border border-dashed border-blue-200
  rounded-xl
  px-6 py-8
  text-center
  flex flex-col gap-2
`

const EmptyTitle = tw.h3`text-base font-semibold text-gray-900`

const EmptySubtitle = tw.p`text-sm text-gray-500`

const OfferList = tw.div`flex flex-col gap-6`

const OfferCard = tw.div`
  relative
  border border-gray-200 rounded-lg bg-white
  transition-all duration-200
  hover:shadow-md hover:border-gray-300
  [&.is-best]:border-2 [&.is-best]:border-amber-300 [&.is-best]:shadow-md [&.is-best]:hover:shadow-lg
  [&.is-second]:border-2 [&.is-second]:border-blue-300 [&.is-second]:shadow-sm [&.is-second]:hover:shadow-md
  [&.is-third]:border-2 [&.is-third]:border-rose-300 [&.is-third]:shadow-sm [&.is-third]:hover:shadow-md
`

const TopBadge = tw.div`
  absolute
  top-0
  right-3
  -translate-y-1/2
  px-3 py-1.5
  rounded-lg
  text-xs font-bold
  z-10
  shadow-md
  [&.badge-best]:bg-linear-to-r [&.badge-best]:from-amber-500 [&.badge-best]:to-yellow-500 [&.badge-best]:text-white
  [&.badge-second]:bg-linear-to-r [&.badge-second]:from-blue-500 [&.badge-second]:to-indigo-500 [&.badge-second]:text-white
  [&.badge-third]:bg-linear-to-r [&.badge-third]:from-rose-500 [&.badge-third]:to-pink-500 [&.badge-third]:text-white
  [&.badge-default]:bg-gray-600 [&.badge-default]:text-white
`

const OfferRow = tw.div`
  flex flex-col lg:flex-row
  gap-4
  p-5
  items-start lg:items-end
`

const OfferContentWrapper = tw.div`
  flex-1
  flex flex-col gap-4
  min-w-0
  w-full
`

const OfferHeader = tw.div`
  flex items-center gap-4
`

const OfferLead = tw.div`flex items-center gap-3 min-w-0 flex-1`

const LogoWrapper = tw.div`
  flex items-center justify-center
  shrink-0
  w-16 h-16
  [&>div]:p-0
  [&>div]:w-full
  [&>div]:h-full
  [&>div]:flex
  [&>div]:items-center
  [&>div]:justify-center
  [&>div]:bg-transparent
  [&>div]:border-0
  [&>div>img]:object-contain
  [&>div>img]:w-full
  [&>div>img]:h-full
  [&>div>img]:p-0
`

const OfferNameWrapper = tw.div`flex flex-col gap-1`

const OfferName = tw.span`font-semibold text-lg text-gray-900 truncate`

const ProductName = tw.span`text-sm font-medium text-gray-600 truncate`

const OfferRankNumber = tw.span`
  text-sm font-medium text-gray-400
  shrink-0
`

const OfferMetrics = tw.div`
  flex flex-col sm:flex-row gap-4
  w-full
  items-stretch
`

const MetricItem = tw.div`
  flex flex-col gap-1
  flex-1
`

const MetricItemHighlight = tw.div`
  flex flex-col gap-2
  flex-1
`

const MetricValue = tw.span`
  text-lg font-bold text-gray-900
`

const MetricValueHighlight = tw.span`
  text-lg font-extrabold text-emerald-600
`

const MetricLabel = tw.span`
  text-xs text-gray-500 font-medium
`

const MetricLabelHighlight = tw.span`
  text-sm font-semibold text-gray-500
`

const OfferQuickInfo = tw.div`
  flex flex-wrap gap-2
  text-xs text-gray-600
`

const QuickInfoItem = tw.span`
  inline-flex items-center gap-1
`

const OfferActions = tw.div`
  flex flex-col gap-2
  shrink-0
  w-full lg:w-auto
`

const AffiliateButton = tw.a`
  group/cta
  relative
  flex items-center justify-center sm:justify-start gap-2 sm:gap-2.5
  w-full lg:w-[200px]
  rounded-lg
  bg-linear-to-r from-emerald-600 to-green-600
  px-4 py-2
  text-sm font-semibold text-white
  shadow-md shadow-emerald-500/20
  ring-1 ring-transparent
  transition-all duration-200 ease-out
  hover:scale-[1.01] hover:ring-emerald-300/30
  hover:from-emerald-700 hover:to-green-700
  hover:shadow-lg hover:shadow-emerald-500/30
  active:scale-[0.99]
  focus:outline-none focus:ring-2 focus:ring-emerald-300/50
`

const AffiliateIconWrapper = tw.span`
  flex items-center justify-center shrink-0
  w-5 h-5
  transition-transform duration-200
  group-hover/cta:scale-105
`

const AffiliateContent = tw.div`flex flex-col items-center sm:items-start flex-1 min-w-0 text-center sm:text-left`

const AffiliateText = tw.span`text-sm font-semibold leading-tight`

const AffiliateSubtext = tw.span`text-xs font-normal text-emerald-50 opacity-90 leading-tight mt-0.5 hidden sm:block`

const DetailsButton = tw.button`
  group/button
  flex items-center justify-center gap-2
  w-full lg:w-[200px]
  rounded-lg
  border border-gray-300
  bg-white
  px-4 py-2
  text-sm font-semibold text-gray-700
  shadow-sm 
  transition-all duration-200 ease-out
  hover:scale-[1.01] hover:border-gray-400
  hover:bg-gray-50
  hover:shadow-md
  active:scale-[0.99]
  focus:outline-none focus:ring-2 focus:ring-gray-300/50
  cursor-pointer
`

const DetailsButtonText = tw.span`text-sm`

const DetailsIcon = tw.span`
  flex items-center justify-center
  w-4 h-4
  transition-transform duration-200 ease-out
  group-hover/button:scale-105
`

const ExpandedSection = tw.div`
  border-t border-gray-200 bg-gray-50
  animate-in fade-in duration-200
  flex flex-col gap-4
  md:gap-6
`

const UpdateInfo = tw.div`
  text-xs text-gray-500 text-center
  flex items-center justify-center gap-2
  mt-4 pt-4 border-t border-gray-200
  italic
`

const InterestRateTypeBadge = tw.span`
  ml-2
  inline-flex
  items-center
  rounded
  border
  border-blue-200
  bg-blue-100
  px-1.5
  py-0.5
  text-xs
  font-medium
  text-blue-700
`
