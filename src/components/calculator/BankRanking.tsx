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
                      index === 0 && 'bg-linear-to-br from-amber-400 to-yellow-500',
                      index === 1 && 'bg-linear-to-br from-gray-300 to-gray-400',
                      index === 2 && 'bg-linear-to-br from-orange-400 to-amber-500',
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

const RankingWrapper = tw.div`animate-in fade-in slide-in-from-bottom-8 duration-700`

const RankingSection = tw.section`
  mx-auto w-full max-w-7xl
  px-4 sm:px-6 lg:px-8
  py-12 sm:py-16 md:py-20 lg:py-24
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

const TopBadge = tw.div`
  absolute top-0 right-0
  z-10
  flex items-center gap-2 sm:gap-2.5
  rounded-bl-2xl
  px-4 sm:px-5 py-2 sm:py-2.5 md:px-6 md:py-3
  shadow-lg
  animate-in slide-in-from-right-4
  duration-500
`

const BadgeIcon = tw.span`text-xl sm:text-2xl`

const BadgeText = tw.span`
  text-sm sm:text-base 
  font-bold text-white 
  drop-shadow-md
`

const CardInner = tw.div`
  flex flex-col items-start 
  gap-4 sm:gap-5 md:flex-row md:gap-6 lg:gap-8
  p-5 sm:p-6 md:p-7 lg:p-8
`

const DetailsButtonWrapper = tw.div`
  flex justify-center 
  border-t border-gray-100
  bg-linear-to-r from-gray-50/50 to-transparent
  px-5 py-4 sm:px-6 sm:py-5 md:justify-end md:px-7 md:py-6 lg:px-8
`

const DetailsButton = tw.button`
  group/button
  flex min-w-[180px] items-center justify-center gap-2 sm:min-w-[200px] sm:gap-3 md:min-w-[220px]
  rounded-xl border-2 border-transparent sm:rounded-2xl
  bg-linear-to-r from-blue-600 to-indigo-600
  px-6 py-3 sm:px-8 sm:py-3.5
  text-sm font-semibold text-white sm:text-base
  shadow-md 
  transition-all duration-300 ease-out
  hover:scale-105 hover:border-blue-300/50
  hover:from-blue-700 hover:to-indigo-700
  hover:shadow-xl
  active:scale-95
  focus:outline-none focus:ring-4 focus:ring-blue-300/50
`

const ButtonText = tw.span`text-sm sm:text-base`

const ButtonIcon = tw.span`
  flex items-center justify-center
  transition-transform duration-300 ease-out
  group-hover/button:scale-110
`

const ExpandedDetails = tw.div`animate-in fade-in slide-in-from-top-2 duration-500`
