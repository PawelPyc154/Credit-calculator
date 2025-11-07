'use client'

import { BankLogo } from 'components/common/BankLogo'
import type { RefObject } from 'react'
import { useRef } from 'react'
import tw from 'tw-tailwind'
import type { CalculationResult, CalculatorFormData } from 'types/calculator'
import { formatCurrency, formatPercent } from 'utils/calculator'

type BankResultsCursorProps = {
  results: CalculationResult[]
  formData: CalculatorFormData
  formRef: RefObject<HTMLFormElement | null>
}

export const BankResultsCursor = ({ results, formData, formRef }: BankResultsCursorProps) => {
  const offerListRef = useRef<HTMLDivElement>(null)

  if (results.length === 0) {
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
      <OfferList ref={offerListRef}>
        {results.map((offer, index) => (
          <OfferRow key={offer.bankId} className={index === 0 ? 'is-active' : ''}>
            <OfferLead>
              <BankLogo
                src={offer.bankLogo ?? '/images/banks/placeholder.png'}
                alt={offer.bankName}
                bankName={offer.bankName}
                size="sm"
              />
              <OfferName>{offer.bankName}</OfferName>
            </OfferLead>
            <OfferData>
              <OfferValue>{formatCurrency(offer.monthlyPayment)}</OfferValue>
              <OfferLabel>rata</OfferLabel>
            </OfferData>
            <OfferData>
              <OfferValue>{formatPercent(offer.interestRate)}</OfferValue>
              <OfferLabel>oprocent.</OfferLabel>
            </OfferData>
            <OfferData>
              <OfferValue>{formatCurrency(offer.totalCost)}</OfferValue>
              <OfferLabel>koszt</OfferLabel>
            </OfferData>
            <OfferTags>
              {offer.insurance > 0 && <OfferTag>Ubezp. {formatCurrency(offer.insurance)}</OfferTag>}
              {offer.commission > 0 && (
                <OfferTag>Prowizja {formatCurrency(offer.commission)}</OfferTag>
              )}
            </OfferTags>
          </OfferRow>
        ))}
      </OfferList>
    </ResultsContainer>
  )
}

const ResultsContainer = tw.section`
  mx-auto
  w-full
  max-w-5xl
  px-4 sm:px-6
  pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-16 lg:pb-16
  flex flex-col gap-6
`

const EmptyState = tw.div`
  mx-auto
  w-full
  max-w-3xl
  bg-white
  border border-dashed border-blue-200
  rounded-3xl
  px-6 py-12
  text-center
  flex flex-col gap-3
`

const EmptyTitle = tw.h3`text-lg font-semibold text-gray-900`

const EmptySubtitle = tw.p`text-sm text-gray-500`

const OfferList = tw.div`flex flex-col divide-y divide-gray-200 border border-gray-200 rounded-xl bg-white`

const OfferRow = tw.div`
  grid grid-cols-1 gap-4
  sm:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))_minmax(0,1.6fr)]
  px-4 py-4
  items-start sm:items-center
  text-sm
  transition-colors
  [&.is-active]:bg-gray-50
`

const OfferLead = tw.div`flex items-center gap-3`

const OfferName = tw.span`font-semibold text-gray-900`

const OfferData = tw.div`flex flex-col gap-1`

const OfferValue = tw.span`font-semibold text-gray-900`

const OfferLabel = tw.span`text-xs uppercase tracking-wide text-gray-500`

const OfferTags = tw.div`flex flex-wrap gap-2 sm:justify-end`

const OfferTag = tw.span`
  inline-flex items-center
  rounded-full
  border border-gray-300
  px-3 py-1
  text-xs text-gray-600
`
