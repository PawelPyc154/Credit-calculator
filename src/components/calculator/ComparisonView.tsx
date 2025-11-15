'use client'

import clsx from 'clsx'
import { BankLogo } from 'components/common/BankLogo'
import { useEffect } from 'react'
import tw from 'tw-tailwind'
import type { CalculationResult } from 'types/calculator'
import { trackAffiliateClick } from 'utils/analytics'
import { formatCurrencyNoCents, formatPercent } from 'utils/calculator'

type ComparisonViewProps = {
  offers: CalculationResult[]
  formData?: {
    loanAmount: number
  }
  onClose?: () => void
}

export const ComparisonView = ({ offers, formData, onClose }: ComparisonViewProps) => {
  // Blokuj scroll strony gdy modal jest otwarty i obsługa ESC
  useEffect(() => {
    if (onClose) {
      document.body.style.overflow = 'hidden'

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }

      window.addEventListener('keydown', handleEscape)

      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleEscape)
      }
    }
  }, [onClose])
  if (offers.length === 0) {
    return (
      <EmptyComparisonState>
        <EmptyComparisonTitle>Brak ofert do porównania</EmptyComparisonTitle>
        <EmptyComparisonText>
          Zaznacz oferty w widoku listy, aby je porównać w tabeli.
        </EmptyComparisonText>
      </EmptyComparisonState>
    )
  }

  const handleAffiliateClick = (offer: CalculationResult, position: number) => {
    trackAffiliateClick({
      bankName: offer.bankName,
      bankId: offer.bankId,
      campaignId: offer.bank?.affiliate?.campaignId,
      position,
      loanAmount: formData?.loanAmount ?? 0,
      monthlyPayment: offer.monthlyPayment,
    })
  }

  const comparisonFields = [
    {
      label: 'Logo',
      key: 'logo',
      render: (offer: CalculationResult, _index: number) => (
        <BankLogo
          src={offer.bankLogo ?? '/images/banks/placeholder.png'}
          alt={offer.bankName}
          bankName={offer.bankName}
          size="sm"
          className="h-12 w-12 sm:h-16 sm:w-16"
        />
      ),
    },
    {
      label: 'Bank',
      key: 'bank',
      render: (offer: CalculationResult, _index: number) => (
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate font-semibold text-gray-900 text-xs leading-tight">
            {offer.bankName}
          </span>
          {offer.bank?.productName && (
            <span className="hidden truncate text-gray-500 text-xs leading-tight sm:block">
              {offer.bank.productName}
            </span>
          )}
        </div>
      ),
    },
    {
      label: 'Miesięczna rata',
      key: 'monthlyPayment',
      render: (offer: CalculationResult, _index: number) => (
        <span className="font-bold text-gray-900 text-sm sm:text-base">
          {formatCurrencyNoCents(offer.monthlyPayment)}
        </span>
      ),
      highlight: true,
    },
    {
      label: 'Całkowity koszt',
      key: 'totalCost',
      render: (offer: CalculationResult, _index: number) => (
        <span className="font-semibold text-gray-900">
          {formatCurrencyNoCents(offer.totalCost)}
        </span>
      ),
      highlight: true,
    },
    {
      label: 'RRSO',
      key: 'rrso',
      render: (offer: CalculationResult, _index: number) => (
        <span className="font-medium text-gray-900">{formatPercent(offer.rrso)}</span>
      ),
    },
    {
      label: 'Oprocentowanie',
      key: 'interestRate',
      render: (offer: CalculationResult, _index: number) => (
        <span className="font-medium text-gray-900">{formatPercent(offer.interestRate)}</span>
      ),
    },
    {
      label: 'Całkowite odsetki',
      key: 'totalInterest',
      render: (offer: CalculationResult, _index: number) => (
        <span className="text-gray-700">{formatCurrencyNoCents(offer.totalInterest)}</span>
      ),
    },
    {
      label: 'Prowizja banku',
      key: 'commission',
      render: (offer: CalculationResult, _index: number) => (
        <span className="text-gray-700">{formatCurrencyNoCents(offer.commission)}</span>
      ),
    },
    {
      label: 'Ubezpieczenia',
      key: 'insurance',
      render: (offer: CalculationResult, _index: number) => (
        <span className="text-gray-700">{formatCurrencyNoCents(offer.insurance)}</span>
      ),
    },
    {
      label: 'Marża banku',
      key: 'margin',
      render: (offer: CalculationResult, _index: number) => (
        <span className="text-gray-700">
          {offer.bank?.margin !== undefined && offer.bank?.margin !== null
            ? formatPercent(offer.bank.margin)
            : '-'}
        </span>
      ),
    },
    {
      label: 'Min. wkład własny',
      key: 'minDownPayment',
      render: (offer: CalculationResult, _index: number) => (
        <span className="text-gray-700">
          {offer.bank?.minDownPaymentPercent !== undefined
            ? `${offer.bank.minDownPaymentPercent}%`
            : '-'}
        </span>
      ),
    },
    {
      label: 'Opłata za wcześniejszą spłatę',
      key: 'earlyRepaymentFee',
      render: (offer: CalculationResult, _index: number) => (
        <span className="text-gray-700">
          {offer.bank?.earlyRepaymentFee !== undefined && offer.bank?.earlyRepaymentFee !== null
            ? offer.bank.earlyRepaymentFee > 0
              ? formatPercent(offer.bank.earlyRepaymentFee)
              : 'Brak'
            : '-'}
        </span>
      ),
    },
    {
      label: 'Wymagane konto',
      key: 'accountRequired',
      render: (offer: CalculationResult, _index: number) => (
        <div className="flex flex-col gap-0.5">
          <span className="text-gray-700 text-xs leading-tight">
            {offer.bank?.accountRequired
              ? 'Tak'
              : offer.bank?.accountRequired === false
                ? 'Nie'
                : '-'}
          </span>
          {offer.bank?.accountRequired &&
            offer.bank?.accountFee !== undefined &&
            offer.bank?.accountFee !== null &&
            offer.bank.accountFee > 0 && (
              <span className="text-gray-500 text-xs leading-tight">
                {formatCurrencyNoCents(offer.bank.accountFee)}/mies.
              </span>
            )}
        </div>
      ),
    },
    {
      label: 'Czas rozpatrzenia',
      key: 'processingTime',
      render: (offer: CalculationResult, _index: number) => (
        <span className="text-gray-700">{offer.bank?.processingTime || '-'}</span>
      ),
    },
    {
      label: 'Parametry oferty',
      key: 'parameters',
      render: (offer: CalculationResult, _index: number) => {
        const bank = offer.bank
        if (!bank) return <span className="text-gray-500">-</span>
        const params: string[] = []
        if (bank.minLoanAmount && bank.maxLoanAmount) {
          params.push(
            `Kwota: ${formatCurrencyNoCents(bank.minLoanAmount)} - ${formatCurrencyNoCents(bank.maxLoanAmount)}`,
          )
        }
        if (bank.minLoanPeriod && bank.maxLoanPeriod) {
          params.push(`Okres: ${bank.minLoanPeriod}-${bank.maxLoanPeriod} lat`)
        }
        if (bank.supportedPurposes && bank.supportedPurposes.length > 0) {
          const purposes = bank.supportedPurposes
            .map((p) => {
              if (p === 'purchase') return 'zakup'
              if (p === 'refinancing') return 'refinansowanie'
              if (p === 'construction') return 'budowa'
              return p
            })
            .join(', ')
          params.push(`Cele: ${purposes}`)
        }
        if (bank.wibor !== undefined && bank.wibor !== null) {
          params.push(`WIBOR: ${formatPercent(bank.wibor)}`)
        }
        return (
          <div className="flex flex-col gap-0.5 text-gray-700 text-xs">
            {params.length > 0 ? (
              params.map((param) => (
                <span key={param} className="whitespace-nowrap leading-tight">
                  {param}
                </span>
              ))
            ) : (
              <span>-</span>
            )}
          </div>
        )
      },
    },
    {
      label: 'Specjalne oferty',
      key: 'specialOffers',
      render: (offer: CalculationResult, _index: number) => {
        const offers = offer.bank?.specialOffers
        if (!offers || offers.length === 0) {
          return <span className="text-gray-500">-</span>
        }
        return (
          <div className="flex flex-col gap-0.5 text-gray-700 text-xs">
            {offers.map((offerText) => (
              <span key={offerText} className="flex items-start gap-1 leading-tight">
                <span className="shrink-0 text-emerald-600">•</span>
                <span>{offerText}</span>
              </span>
            ))}
          </div>
        )
      },
    },
    {
      label: 'Zalety',
      key: 'advantages',
      render: (offer: CalculationResult, _index: number) => {
        const advantages = offer.bank?.advantages
        if (!advantages || advantages.length === 0) {
          return <span className="text-gray-500">-</span>
        }
        return (
          <div className="flex flex-col gap-0.5 text-gray-700 text-xs">
            {advantages.map((advantage) => (
              <span key={advantage} className="flex items-start gap-1 leading-tight">
                <span className="shrink-0 text-emerald-600">•</span>
                <span>{advantage}</span>
              </span>
            ))}
          </div>
        )
      },
    },
    {
      label: 'Wady',
      key: 'disadvantages',
      render: (offer: CalculationResult, _index: number) => {
        const disadvantages = offer.bank?.disadvantages
        if (!disadvantages || disadvantages.length === 0) {
          return <span className="text-gray-500">-</span>
        }
        return (
          <div className="flex flex-col gap-0.5 text-gray-700 text-xs">
            {disadvantages.map((disadvantage) => (
              <span key={disadvantage} className="flex items-start gap-1 leading-tight">
                <span className="shrink-0 text-red-600">•</span>
                <span>{disadvantage}</span>
              </span>
            ))}
          </div>
        )
      },
    },
    {
      label: 'Wpływ wkładu własnego (LTV)',
      key: 'ltv',
      render: (offer: CalculationResult, _index: number) => {
        const ltv = offer.bank?.ltv
        if (!ltv || (!ltv.ratio80 && !ltv.ratio90 && !ltv.ratio95)) {
          return <span className="text-gray-500">-</span>
        }
        const ltvParams: string[] = []
        if (ltv.ratio80 !== undefined && ltv.ratio80 !== null) {
          ltvParams.push(`80%: ${ltv.ratio80 >= 0 ? '+' : ''}${formatPercent(ltv.ratio80)}`)
        }
        if (ltv.ratio90 !== undefined && ltv.ratio90 !== null) {
          ltvParams.push(`90%: ${ltv.ratio90 >= 0 ? '+' : ''}${formatPercent(ltv.ratio90)}`)
        }
        if (ltv.ratio95 !== undefined && ltv.ratio95 !== null) {
          ltvParams.push(`95%: ${ltv.ratio95 >= 0 ? '+' : ''}${formatPercent(ltv.ratio95)}`)
        }
        return (
          <div className="flex flex-col gap-0.5 text-gray-700 text-xs">
            {ltvParams.map((param) => (
              <span key={param} className="whitespace-nowrap leading-tight">
                {param}
              </span>
            ))}
          </div>
        )
      },
    },
    {
      label: 'Wniosek',
      key: 'affiliate',
      render: (offer: CalculationResult, _index: number) => {
        const hasAffiliate = offer.bank?.affiliate?.enabled && offer.bank?.affiliate?.url
        if (!hasAffiliate) {
          return <span className="text-gray-400 text-xs">-</span>
        }
        return (
          <AffiliateLinkButton
            href={offer.bank?.affiliate?.url ?? '#'}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() => handleAffiliateClick(offer, _index + 1)}
          >
            <svg
              className="h-4 w-4 shrink-0"
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
            <span className="hidden md:inline">Aplikuj</span>
          </AffiliateLinkButton>
        )
      },
    },
  ]

  const content = (
    <ComparisonContainer>
      <ComparisonHeader>
        <ComparisonTitle>Porównanie ofert ({offers.length})</ComparisonTitle>
        {onClose && (
          <CloseButton onClick={onClose} aria-label="Zamknij">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </CloseButton>
        )}
      </ComparisonHeader>
      <ComparisonTableWrapper>
        <ComparisonTable>
          <TableHead>
            <TableRow>
              {comparisonFields.map((field) => (
                <TableHeader
                  key={field.key}
                  className={clsx(
                    field.highlight && 'highlight',
                    field.key === 'logo' && 'sticky-header',
                    field.key === 'affiliate' &&
                      'md:sticky md:right-0 md:z-10 md:bg-gray-50 md:shadow-[-2px_0_4px_rgba(0,0,0,0.05)]',
                  )}
                >
                  {field.label}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {offers.map((offer, offerIndex) => (
              <TableRow key={offer.bankId}>
                {comparisonFields.map((field) => (
                  <TableCell
                    key={field.key}
                    className={clsx(
                      field.highlight && 'highlight-cell',
                      field.key === 'logo' && 'sticky-cell',
                      field.key === 'affiliate' &&
                        'md:sticky md:right-0 md:z-5 md:bg-white md:shadow-[-2px_0_4px_rgba(0,0,0,0.05)]',
                    )}
                  >
                    {field.render(offer, offerIndex)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </ComparisonTable>
      </ComparisonTableWrapper>
    </ComparisonContainer>
  )

  if (onClose) {
    return (
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>{content}</ModalContent>
      </ModalOverlay>
    )
  }

  return content
}

const ModalOverlay = tw.div`
  fixed inset-0 z-50
  bg-black/50
  flex items-center justify-center
  overflow-hidden
`

const ModalContent = tw.div`
  w-full h-full
  bg-white
  flex flex-col
  overflow-hidden
`

const ComparisonContainer = tw.div`
  w-full h-full
  bg-white
  flex flex-col
  overflow-hidden
`

const ComparisonHeader = tw.div`
  flex items-center justify-between
  px-4 py-2 sm:px-6 sm:py-2.5
  border-b border-gray-200
  bg-white
  shrink-0
`

const ComparisonTitle = tw.h2`
  text-lg sm:text-xl font-bold text-gray-900
`

const CloseButton = tw.button`
  flex items-center justify-center
  w-10 h-10
  rounded-lg
  text-gray-400
  hover:text-gray-600 hover:bg-gray-100
  transition-colors
  focus:outline-none focus:ring-2 focus:ring-gray-300
`

const ComparisonTableWrapper = tw.div`
  overflow-x-auto overflow-y-auto
  w-full
  flex-1
`

const ComparisonTable = tw.table`
  w-full
  border-collapse
  min-w-[1000px]
`

const TableHead = tw.thead`
  bg-gray-50 sticky top-0 z-10
`

const TableHeader = tw.th`
  border-b border-gray-200 px-2 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 whitespace-nowrap sm:px-3
  [&.highlight]:bg-emerald-50
  [&.sticky-header]:sticky [&.sticky-header]:left-0 [&.sticky-header]:z-10 [&.sticky-header]:bg-gray-50 [&.sticky-header]:shadow-[2px_0_4px_rgba(0,0,0,0.05)]
`

const TableBody = tw.tbody`
  divide-y divide-gray-200
`

const TableRow = tw.tr`
  hover:bg-gray-50 transition-colors
`

const TableCell = tw.td`
  px-2 py-2 sm:px-3 sm:py-2
  text-xs sm:text-sm text-gray-700
  whitespace-nowrap
  [&.highlight-cell]:font-semibold
  [&.sticky-cell]:sticky left-0 bg-white [&.sticky-cell]:z-5 [&.sticky-cell]:shadow-[2px_0_4px_rgba(0,0,0,0.05)]
`

const AffiliateLinkButton = tw.a`
  flex items-center gap-1 sm:gap-1.5
  px-2 py-1 sm:px-3 sm:py-1.5
  rounded-lg
  bg-emerald-600
  text-xs sm:text-sm font-semibold text-white
  hover:bg-emerald-700
  transition-colors
  focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-1
  whitespace-nowrap
  shrink-0
`

const EmptyComparisonState = tw.div`
  w-full
  bg-white
  border border-gray-200
  rounded-lg
  shadow-sm
  p-8
  text-center
`

const EmptyComparisonTitle = tw.h3`
  text-lg font-semibold text-gray-900
  mb-2
`

const EmptyComparisonText = tw.p`
  text-sm text-gray-600
`
