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
  onParamsChange: (params: { loanAmount: number; loanPeriod: number; downPayment: number }) => void
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
                {/* Medal dla top 3 */}
                {isTopThree && (
                  <TopBadge
                    className={clsx(
                      index === 0 && 'bg-gradient-to-br from-amber-400 to-yellow-500',
                      index === 1 && 'bg-gradient-to-br from-gray-300 to-gray-400',
                      index === 2 && 'bg-gradient-to-br from-orange-400 to-amber-500',
                    )}
                  >
                    <BadgeIcon>
                      {index === 0 && '🥇'}
                      {index === 1 && '🥈'}
                      {index === 2 && '🥉'}
                    </BadgeIcon>
                    <BadgeText>
                      {index === 0 && 'Najlepsza oferta'}
                      {index === 1 && '2. miejsce'}
                      {index === 2 && '3. miejsce'}
                    </BadgeText>
                  </TopBadge>
                )}

                <CardInner>
                  <BankCardHeader result={result} index={index} isTopThree={isTopThree} />
                </CardInner>

                {/* Przycisk szczegółów */}
                <DetailsButtonWrapper>
                  <DetailsButton
                    onClick={() => toggleExpanded(result.bankId)}
                    aria-expanded={isExpanded}
                    aria-label={isExpanded ? 'Ukryj szczegóły oferty' : 'Zobacz szczegóły oferty'}
                  >
                    <ButtonText>{isExpanded ? 'Ukryj szczegóły' : 'Zobacz szczegóły'}</ButtonText>
                    <ButtonIcon className={clsx(isExpanded && 'rotate-180')}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </ButtonIcon>
                  </DetailsButton>
                </DetailsButtonWrapper>

                {/* Rozwinięte szczegóły */}
                {isExpanded && (
                  <ExpandedDetails>
                    <BankDetails result={result} />
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

const RankingWrapper = tw.div`
  animate-in fade-in slide-in-from-bottom-8
  duration-700
`

const RankingSection = tw.section`
  w-full max-w-7xl mx-auto 
  px-4 sm:px-6 lg:px-8
  py-12 md:py-16 lg:py-20
`

const ResultsList = tw.div`
  flex flex-col 
  gap-6 md:gap-8
`

const BankCard = tw.div`
  relative
  group
  bg-white rounded-2xl md:rounded-3xl 
  shadow-md hover:shadow-2xl 
  transition-all duration-500 ease-out
  border border-gray-100
  overflow-hidden
  hover:border-gray-200
  animate-in fade-in slide-in-from-bottom-4
  fill-mode-both
`

const TopBadge = tw.div`
  absolute top-0 right-0
  flex items-center gap-2
  px-4 py-2 md:px-6 md:py-3
  rounded-bl-2xl
  shadow-lg
  z-10
  animate-in slide-in-from-right-4
  duration-500
`

const BadgeIcon = tw.span`
  text-xl md:text-2xl
`

const BadgeText = tw.span`
  text-white font-bold text-sm md:text-base
  drop-shadow-md
`

const CardInner = tw.div`
  p-4 md:p-6 lg:p-8
  flex flex-col md:flex-row 
  gap-4 md:gap-6 lg:gap-8
  items-start
`

const DetailsButtonWrapper = tw.div`
  px-4 py-4 md:px-6 md:py-5 lg:px-8 lg:py-6
  border-t border-gray-100
  bg-gradient-to-r from-gray-50/50 to-transparent
  flex justify-center md:justify-end
`

const DetailsButton = tw.button`
  flex items-center justify-center gap-2 md:gap-3
  bg-gradient-to-r from-blue-600 to-indigo-600
  hover:from-blue-700 hover:to-indigo-700
  text-white
  font-semibold
  px-6 md:px-8 py-3 md:py-3.5
  rounded-xl md:rounded-2xl
  transition-all duration-300 ease-out
  shadow-md hover:shadow-xl
  hover:scale-105
  active:scale-95
  border-2 border-transparent
  hover:border-blue-300/50
  min-w-[180px] md:min-w-[220px]
  focus:outline-none focus:ring-4 focus:ring-blue-300/50
  group/button
`

const ButtonText = tw.span`
  text-sm md:text-base
`

const ButtonIcon = tw.span`
  transition-transform duration-300 ease-out
  flex items-center justify-center
  group-hover/button:scale-110
`

const ExpandedDetails = tw.div`
  animate-in fade-in slide-in-from-top-2
  duration-500
`
