'use client'

import clsx from 'clsx'
import type { RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'
import tw from 'tw-tailwind'
import type { CalculationResult } from 'types/calculator'
import { BankCardHeader } from './molecules/BankCardHeader'
import { BankDetails } from './molecules/BankDetails'
import { RankingSectionHeader } from './molecules/RankingSectionHeader'
import { StickyParamsBar } from './molecules/StickyParamsBar'

export type BankRankingProps = {
  results: CalculationResult[]
  selectedParams: {
    loanAmount: number
    loanPeriod: number
    downPayment: number
  }
  formRef: RefObject<HTMLFormElement | null>
}

export const BankRanking = ({ results, selectedParams, formRef }: BankRankingProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isSticky, setIsSticky] = useState(false)
  const rankingSectionRef = useRef<HTMLDivElement>(null)
  const lastCheckRef = useRef<number>(0)
  const lastStickyStateRef = useRef<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now()
      // Throttle - sprawdzaj maksymalnie co 100ms
      if (now - lastCheckRef.current < 100) {
        return
      }
      lastCheckRef.current = now

      if (rankingSectionRef.current) {
        const sectionTop = rankingSectionRef.current.getBoundingClientRect().top
        const shouldBeSticky = sectionTop < 0

        // Aktualizuj state tylko gdy zmienia się stan
        if (shouldBeSticky !== lastStickyStateRef.current) {
          lastStickyStateRef.current = shouldBeSticky
          setIsSticky(shouldBeSticky)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    // Aktualizuj padding body tylko gdy zmienia się isSticky
    if (isSticky) {
      const paddingValue = window.innerWidth < 768 ? '120px' : '80px'
      document.body.style.paddingTop = paddingValue
    } else {
      document.body.style.paddingTop = '0'
    }

    return () => {
      document.body.style.paddingTop = '0'
    }
  }, [isSticky])

  if (results.length === 0) {
    return null
  }

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const scrollToForm = () => {
    if (formRef.current) {
      const offset = 100
      const elementPosition = formRef.current.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const handleAffiliateClick = (result: CalculationResult) => {
    // Track affiliate click for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'affiliate_click', {
        bank_name: result.bankName,
        bank_id: result.bankId,
        campaign_id: result.bank?.affiliate?.campaignId,
        position: results.indexOf(result) + 1,
      })
    }
  }

  return (
    <RankingWrapper ref={rankingSectionRef}>
      {isSticky && selectedParams.loanAmount > 0 && (
        <StickyParamsBar
          loanAmount={selectedParams.loanAmount}
          loanPeriod={selectedParams.loanPeriod}
          downPayment={selectedParams.downPayment}
          onEditClick={scrollToForm}
        />
      )}

      <RankingSection>
        <RankingSectionHeader resultsCount={results.length} />

        <ResultsList>
          {results.map((result, index) => {
            const isExpanded = expandedId === result.bankId
            const isTopThree = index < 3 && result.isRecommended
            const hasAffiliate = result.bank?.affiliate?.enabled && result.bank?.affiliate?.url

            return (
              <BankCard
                key={result.bankId}
                className={clsx(
                  isTopThree &&
                    index === 0 &&
                    'shadow-amber-100/50 shadow-xl ring-2 ring-amber-400/60',
                  isTopThree &&
                    index === 1 &&
                    'shadow-gray-100/50 shadow-lg ring-2 ring-gray-300/50',
                  isTopThree &&
                    index === 2 &&
                    'shadow-lg shadow-orange-100/50 ring-2 ring-orange-300/50',
                )}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <CardInner>
                  <BankCardHeader result={result} index={index} isTopThree={isTopThree} />
                </CardInner>

                {/* Przyciski akcji */}
                <ActionsWrapper className={clsx(!hasAffiliate && 'justify-center md:justify-end')}>
                  {hasAffiliate && (
                    <AffiliateCTAButton
                      href={result.bank?.affiliate?.url ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      onClick={() => handleAffiliateClick(result)}
                      className={clsx(isTopThree && index === 0 && 'animate-pulse-glow')}
                    >
                      <CTAIconWrapper>
                        <svg
                          className="w-full h-full"
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
                      </CTAIconWrapper>
                      <CTAContent>
                        <CTAText>Złóż wniosek online</CTAText>
                        <CTASubtext>Przejdź do formularza banku</CTASubtext>
                      </CTAContent>
                      <CTAArrow>→</CTAArrow>
                    </AffiliateCTAButton>
                  )}

                  <DetailsButton
                    onClick={() => toggleExpanded(result.bankId)}
                    aria-expanded={isExpanded}
                    aria-label={isExpanded ? 'Ukryj szczegóły oferty' : 'Zobacz szczegóły oferty'}
                  >
                    <ButtonText>{isExpanded ? 'Ukryj szczegóły' : 'Zobacz szczegóły'}</ButtonText>
                    <ButtonIcon className={clsx(isExpanded && 'rotate-180')}>
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </ButtonIcon>
                  </DetailsButton>
                </ActionsWrapper>

                {/* Rozwinięte szczegóły */}
                {isExpanded && (
                  <ExpandedDetails>
                    <BankDetails result={result} />

                    {/* Affiliate info w szczegółach */}
                    {hasAffiliate && result.bank?.affiliate?.notes && (
                      <AffiliateInfoBox>
                        <InfoIcon>ℹ️</InfoIcon>
                        <InfoText>
                          <InfoTitle>Informacja o programie partnerskim</InfoTitle>
                          <InfoDescription>
                            Ten link jest linkiem partnerskim. Otrzymujemy prowizję od banku, jeśli
                            zdecydujesz się złożyć wniosek. Dla Ciebie nie ma żadnych dodatkowych
                            kosztów - pomaga nam to utrzymać serwis i dostarczać bezpłatne
                            narzędzia.
                          </InfoDescription>
                        </InfoText>
                      </AffiliateInfoBox>
                    )}
                  </ExpandedDetails>
                )}
              </BankCard>
            )
          })}
        </ResultsList>
      </RankingSection>
    </RankingWrapper>
  )
}

const RankingWrapper = tw.div`animate-in fade-in slide-in-from-bottom-8 duration-700`

const RankingSection = tw.section`
  mx-auto w-full max-w-7xl
  px-4 sm:px-6 lg:px-8
  pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-16 lg:pb-16
`

const ResultsList = tw.div`flex flex-col gap-6 sm:gap-8 md:gap-10`

const BankCard = tw.div`
  group
  relative
  overflow-hidden
  rounded-2xl sm:rounded-3xl
  border border-gray-100
  bg-white 
  shadow-md 
  transition-all duration-500 ease-out
  hover:border-gray-200
  hover:shadow-2xl
  animate-in fade-in slide-in-from-bottom-4
  fill-mode-both
`

const CardInner = tw.div`
  flex flex-col items-start 
  md:flex-row
  p-5 sm:p-6 md:p-7 lg:p-8
`

const ActionsWrapper = tw.div`
  flex flex-col sm:flex-row gap-3 sm:gap-4
  border-t border-gray-100
  bg-linear-to-r from-gray-50/50 to-transparent
  px-4 py-4 sm:px-6 sm:py-5 md:px-7 md:py-6 lg:px-8 lg:py-6
  pt-4 sm:pt-5 md:pt-6 lg:pt-6
`

const AffiliateCTAButton = tw.a`
  group/cta
  relative
  flex flex-1 items-center justify-center sm:justify-start gap-2.5 sm:gap-3 md:gap-4
  rounded-xl md:rounded-2xl
  bg-linear-to-r from-emerald-600 to-green-600
  px-5 py-3.5 sm:px-6 sm:py-4 md:px-8 md:py-5
  text-sm sm:text-base md:text-lg font-bold text-white
  shadow-lg shadow-emerald-500/30
  ring-2 ring-transparent
  transition-all duration-300 ease-out
  hover:scale-[1.02] hover:ring-emerald-300/50
  hover:from-emerald-700 hover:to-green-700
  hover:shadow-xl hover:shadow-emerald-500/40
  active:scale-[0.98]
  focus:outline-none focus:ring-4 focus:ring-emerald-300/50
  min-h-[48px] sm:min-h-[52px] md:min-h-[56px]
`

const CTAIconWrapper = tw.span`
  flex items-center justify-center shrink-0
  w-5 h-5 sm:w-6 sm:h-6
  transition-transform duration-300
  group-hover/cta:scale-110 group-hover/cta:-translate-y-0.5
`

const CTAContent = tw.div`flex flex-col items-center sm:items-start flex-1 min-w-0 text-center sm:text-left`

const CTAText = tw.span`text-sm sm:text-base md:text-lg font-bold leading-tight`

const CTASubtext = tw.span`text-xs sm:text-sm font-normal text-emerald-50 opacity-90 leading-tight mt-0.5 hidden sm:block`

const CTAArrow = tw.span`
  text-xl sm:text-2xl font-bold shrink-0
  transition-transform duration-300
  group-hover/cta:translate-x-1
  hidden sm:block
`

const DetailsButton = tw.button`
  group/button
  flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3
  w-full sm:w-auto sm:min-w-[180px] md:min-w-[200px]
  rounded-xl md:rounded-2xl
  border-2 border-gray-200
  bg-white
  px-5 py-3 sm:px-6 sm:py-3.5 md:px-6 md:py-4
  text-sm sm:text-base font-semibold text-gray-700
  shadow-sm 
  transition-all duration-300 ease-out
  hover:scale-[1.02] hover:border-gray-300
  hover:bg-gray-50
  hover:shadow-md
  active:scale-[0.98]
  focus:outline-none focus:ring-4 focus:ring-gray-200/50
  min-h-[48px] sm:min-h-[52px] md:min-h-[56px]
`

const ButtonText = tw.span`text-sm sm:text-base`

const ButtonIcon = tw.span`
  flex items-center justify-center
  w-5 h-5 sm:w-5 sm:h-5
  transition-transform duration-300 ease-out
  group-hover/button:scale-110
`

const ExpandedDetails = tw.div`
  animate-in fade-in slide-in-from-top-2 duration-500
  border-t border-gray-100
`

const AffiliateInfoBox = tw.div`
  flex gap-3 sm:gap-4
  mx-5 sm:mx-6 md:mx-7 lg:mx-8
  mb-5 sm:mb-6 md:mb-7 lg:mb-8
  p-4 sm:p-5
  bg-blue-50/50
  border border-blue-100
  rounded-xl
`

const InfoIcon = tw.span`
  text-xl sm:text-2xl
  shrink-0
`

const InfoText = tw.div`
  flex flex-col gap-1.5
`

const InfoTitle = tw.h4`
  text-sm sm:text-base font-semibold text-blue-900
`

const InfoDescription = tw.p`
  text-xs sm:text-sm text-blue-700/80 leading-relaxed
`
