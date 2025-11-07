import { Tooltip } from 'components/common/tooltip'
import tw from 'tw-tailwind'
import type { BankOffer } from 'types/bank'
import { formatCurrency, formatPercent } from 'utils/calculator'

export type BankDetailsProps = {
  result: {
    totalInterest: number
    commission: number
    insurance: number
    bank?: BankOffer
  }
}

export const BankDetails = ({ result }: BankDetailsProps) => {
  return (
    <DetailsSection>
      <DetailsSectionTitle>
        <TitleIcon>📊</TitleIcon>
        Szczegółowa kalkulacja i informacje
      </DetailsSectionTitle>

      {/* Główne koszty */}
      <CostCardsWrapper>
        <CostCard>
          <CostCardInner>
            <CostIcon className="bg-linear-to-br from-amber-400 to-orange-500">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </CostIcon>
            <CostContent>
              <CostLabel>Całkowite odsetki</CostLabel>
              <Tooltip
                content={
                  <span>
                    Całkowite odsetki to suma wszystkich odsetek, które zapłacisz w trakcie trwania
                    kredytu. <strong>Im niższe, tym lepiej.</strong>
                  </span>
                }
              >
                <CostValue>{formatCurrency(result.totalInterest)}</CostValue>
              </Tooltip>
            </CostContent>
          </CostCardInner>
        </CostCard>

        <CostCard>
          <CostCardInner>
            <CostIcon className="bg-linear-to-br from-blue-400 to-indigo-500">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </CostIcon>
            <CostContent>
              <CostLabel>Prowizja banku</CostLabel>
              <Tooltip
                content={
                  <span>
                    Prowizja banku to jednorazowa opłata pobierana przez bank za udzielenie kredytu.{' '}
                    <strong>Im niższa, tym lepiej.</strong>
                  </span>
                }
              >
                <CostValue>{formatCurrency(result.commission)}</CostValue>
              </Tooltip>
            </CostContent>
          </CostCardInner>
        </CostCard>

        <CostCard>
          <CostCardInner>
            <CostIcon className="bg-linear-to-br from-emerald-400 to-teal-500">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </CostIcon>
            <CostContent>
              <CostLabel>Ubezpieczenie</CostLabel>
              <Tooltip
                content={
                  <span>
                    Ubezpieczenie to dodatkowy koszt związany z zabezpieczeniem kredytu.{' '}
                    <strong>Im niższe, tym lepiej.</strong>
                  </span>
                }
              >
                <CostValue>{formatCurrency(result.insurance)}</CostValue>
              </Tooltip>
            </CostContent>
          </CostCardInner>
        </CostCard>
      </CostCardsWrapper>

      {/* Nowe sekcje z dodatkowymi informacjami */}
      {result.bank && (
        <>
          {/* Parametry oferty */}
          <SectionDivider />
          <DetailsSectionSubtitle>
            <SubtitleIcon>
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </SubtitleIcon>
            Parametry oferty
          </DetailsSectionSubtitle>
          <ParametersGrid>
            <ParameterCard>
              <ParameterLabel>WIBOR</ParameterLabel>
              <ParameterValue className="text-blue-600">
                {formatPercent(result.bank.wibor ?? 0)}
              </ParameterValue>
            </ParameterCard>
            <ParameterCard>
              <ParameterLabel>Marża banku</ParameterLabel>
              <ParameterValue className="text-indigo-600">
                {formatPercent(result.bank.margin ?? 0)}
              </ParameterValue>
            </ParameterCard>
            <ParameterCard>
              <ParameterLabel>Czas rozpatrzenia</ParameterLabel>
              <ParameterValue className="text-purple-600">
                {result.bank.processingTime ?? 'Brak danych'}
              </ParameterValue>
            </ParameterCard>
            <ParameterCard>
              <ParameterLabel>Wcześniejsza spłata</ParameterLabel>
              <ParameterValue
                className={
                  result.bank.earlyRepaymentFee === 0 ? 'text-green-600' : 'text-orange-600'
                }
              >
                {result.bank.earlyRepaymentFee === 0
                  ? '✓ Darmowa'
                  : `${result.bank.earlyRepaymentFee}% opłaty`}
              </ParameterValue>
            </ParameterCard>
            <ParameterCard>
              <ParameterLabel>Wymagane konto</ParameterLabel>
              <ParameterValue
                className={result.bank.accountRequired ? 'text-gray-600' : 'text-green-600'}
              >
                {result.bank.accountRequired ? 'Tak' : '✓ Nie'}
                {result.bank.accountRequired &&
                  !!result.bank.accountFee &&
                  result.bank.accountFee > 0 && (
                    <ParameterSubvalue> ({result.bank.accountFee} zł/msc)</ParameterSubvalue>
                  )}
              </ParameterValue>
            </ParameterCard>
            <ParameterCard>
              <ParameterLabel>Zakres kwotowy</ParameterLabel>
              <ParameterValue className="text-gray-600 text-xs!">
                {formatCurrency(result.bank.minLoanAmount)} -{' '}
                {formatCurrency(result.bank.maxLoanAmount)}
              </ParameterValue>
            </ParameterCard>
          </ParametersGrid>

          {/* Specjalne oferty */}
          {result.bank.specialOffers && result.bank.specialOffers.length > 0 && (
            <>
              <SectionDivider />
              <DetailsSectionSubtitle>
                <SubtitleIcon>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                </SubtitleIcon>
                Specjalne oferty
              </DetailsSectionSubtitle>
              <SpecialOffersGrid>
                {result.bank.specialOffers.map((offer: string) => (
                  <SpecialOfferCard key={offer}>
                    <SpecialOfferIcon>
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </SpecialOfferIcon>
                    <SpecialOfferText>{offer}</SpecialOfferText>
                  </SpecialOfferCard>
                ))}
              </SpecialOffersGrid>
            </>
          )}

          {/* Zalety i wady */}
          {((result.bank.advantages && result.bank.advantages.length > 0) ||
            (result.bank.disadvantages && result.bank.disadvantages.length > 0)) && (
            <>
              <SectionDivider />
              <ComparisonGrid>
                {result.bank.advantages && result.bank.advantages.length > 0 && (
                  <AdvantagesSection>
                    <ComparisonHeader className="border-green-200 bg-linear-to-r from-green-50 to-emerald-50">
                      <ComparisonIcon className="bg-green-100 text-green-600">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </ComparisonIcon>
                      <ComparisonTitle className="text-green-800">Zalety</ComparisonTitle>
                    </ComparisonHeader>
                    <ComparisonList>
                      {result.bank.advantages.map((advantage: string) => (
                        <ComparisonItem key={advantage}>
                          <ComparisonBullet className="bg-green-100 text-green-600">
                            +
                          </ComparisonBullet>
                          <ComparisonText className="text-green-900">{advantage}</ComparisonText>
                        </ComparisonItem>
                      ))}
                    </ComparisonList>
                  </AdvantagesSection>
                )}

                {result.bank.disadvantages && result.bank.disadvantages.length > 0 && (
                  <DisadvantagesSection>
                    <ComparisonHeader className="border-red-200 bg-linear-to-r from-red-50 to-orange-50">
                      <ComparisonIcon className="bg-red-100 text-red-600">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                      </ComparisonIcon>
                      <ComparisonTitle className="text-red-800">Wady</ComparisonTitle>
                    </ComparisonHeader>
                    <ComparisonList>
                      {result.bank.disadvantages.map((disadvantage: string) => (
                        <ComparisonItem key={disadvantage}>
                          <ComparisonBullet className="bg-red-100 text-red-600">−</ComparisonBullet>
                          <ComparisonText className="text-red-900">{disadvantage}</ComparisonText>
                        </ComparisonItem>
                      ))}
                    </ComparisonList>
                  </DisadvantagesSection>
                )}
              </ComparisonGrid>
            </>
          )}

          {/* Informacja o LTV */}
          {result.bank.ltv && (
            <>
              <SectionDivider />
              <LtvSection>
                <LtvHeader>
                  <LtvIconWrapper>
                    <svg
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </LtvIconWrapper>
                  <LtvTitle>Wpływ wkładu własnego na marżę (LTV)</LtvTitle>
                </LtvHeader>
                <LtvGrid>
                  <LtvCard className="border-green-200 bg-linear-to-br from-green-50 to-emerald-50">
                    <LtvPercentage className="text-green-600">20%</LtvPercentage>
                    <LtvLabel>wkładu własnego</LtvLabel>
                    <LtvDivider />
                    <LtvRatio>LTV 80%</LtvRatio>
                    <LtvValue className="text-green-700">
                      {result.bank.ltv.ratio80 === 0
                        ? '✓ Bez dodatkowej marży'
                        : result.bank.ltv.ratio80 !== undefined
                          ? `+${formatPercent(result.bank.ltv.ratio80)}`
                          : 'Brak danych'}
                    </LtvValue>
                  </LtvCard>

                  <LtvCard className="border-orange-200 bg-linear-to-br from-orange-50 to-amber-50">
                    <LtvPercentage className="text-orange-600">10%</LtvPercentage>
                    <LtvLabel>wkładu własnego</LtvLabel>
                    <LtvDivider />
                    <LtvRatio>LTV 90%</LtvRatio>
                    <LtvValue className="text-orange-700">
                      {result.bank.ltv.ratio90 === 0
                        ? 'Bez dodatkowej marży'
                        : result.bank.ltv.ratio90 !== undefined && result.bank.ltv.ratio90 > 0
                          ? `+${formatPercent(result.bank.ltv.ratio90)}`
                          : 'Oferta niedostępna'}
                    </LtvValue>
                  </LtvCard>

                  {result.bank.ltv.ratio95 !== undefined && (
                    <LtvCard className="border-red-200 bg-linear-to-br from-red-50 to-pink-50">
                      <LtvPercentage className="text-red-600">5%</LtvPercentage>
                      <LtvLabel>wkładu własnego</LtvLabel>
                      <LtvDivider />
                      <LtvRatio>LTV 95%</LtvRatio>
                      <LtvValue className="text-red-700">
                        {result.bank.ltv.ratio95 === 0
                          ? 'Bez dodatkowej marży'
                          : result.bank.ltv.ratio95 > 0
                            ? `+${formatPercent(result.bank.ltv.ratio95)}`
                            : 'Oferta niedostępna'}
                      </LtvValue>
                    </LtvCard>
                  )}
                </LtvGrid>
                <LtvExplanation>
                  <svg
                    className="h-4 w-4 shrink-0 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Im wyższy wkład własny, tym niższa marża i lepsze warunki kredytu</span>
                </LtvExplanation>
              </LtvSection>
            </>
          )}

          {/* Opis banku */}
          {result.bank.description && (
            <>
              <SectionDivider />
              <BankDescription>
                <DescriptionIconWrapper>
                  <svg
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </DescriptionIconWrapper>
                <DescriptionContent>
                  <DescriptionTitle>O banku</DescriptionTitle>
                  <DescriptionText>{result.bank.description}</DescriptionText>
                </DescriptionContent>
              </BankDescription>
            </>
          )}

          {/* Data aktualizacji */}
          {result.bank.updated && (
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
              <span>
                Dane zaktualizowane: {new Date(result.bank.updated).toLocaleDateString('pl-PL')}
              </span>
            </UpdateInfo>
          )}
        </>
      )}
    </DetailsSection>
  )
}

// Main section
const DetailsSection = tw.div`
  px-4 pb-6 md:px-8 md:pb-8 pt-6
  border-t border-gray-100
  bg-linear-to-b from-gray-50 to-white
`

const DetailsSectionTitle = tw.h3`
  font-bold text-gray-900 mb-8 text-center text-xl md:text-2xl
  flex items-center justify-center gap-3
`

const TitleIcon = tw.span`text-2xl md:text-3xl`

// Cost cards (główne koszty)
const CostCardsWrapper = tw.div`
  grid grid-cols-1 md:grid-cols-3 gap-4 mb-8
`

const CostCard = tw.div`
  bg-white rounded-2xl
  shadow-sm hover:shadow-lg
  transition-all duration-300 ease-out
  hover:-translate-y-1
  border border-gray-100
  overflow-hidden
  group
`

const CostCardInner = tw.div`
  p-5 flex items-center gap-4
`

const CostIcon = tw.div`
  w-12 h-12 rounded-xl
  flex items-center justify-center
  shadow-md
  transition-transform duration-300
  group-hover:scale-110 group-hover:rotate-3
`

const CostContent = tw.div`flex flex-col flex-1 min-w-0`

const CostLabel = tw.span`
  text-xs text-gray-600 font-semibold uppercase tracking-wider mb-1.5
`

const CostValue = tw.span`
  text-lg md:text-xl font-bold text-gray-900
  cursor-help
  transition-colors duration-200
  hover:text-blue-600
`

// Section dividers
const SectionDivider = tw.div`
  my-8 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent
`

// Subsection titles
const DetailsSectionSubtitle = tw.h4`
  mb-4 flex items-center gap-2
  text-base font-bold text-gray-800 md:text-lg
`

const SubtitleIcon = tw.span`
  flex h-8 w-8 items-center justify-center rounded-lg
  bg-linear-to-br from-blue-100 to-indigo-100 text-blue-600
`

// Parameters grid
const ParametersGrid = tw.div`
  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6
`

const ParameterCard = tw.div`
  bg-white p-4 rounded-xl border border-gray-200
  hover:border-blue-300 hover:shadow-md
  transition-all duration-300
  group
`

const ParameterLabel = tw.div`
  text-xs text-gray-500 font-medium mb-2 uppercase tracking-wide
  transition-colors duration-300
`

const ParameterValue = tw.span`
  inline-block
  text-sm md:text-base font-bold
  transition-all duration-300 ease-out
  group-hover:scale-105
`

const ParameterSubvalue = tw.span`
  ml-1.5 text-xs text-gray-500 font-normal
`

// Special offers
const SpecialOffersGrid = tw.div`
  mb-6 grid grid-cols-1 gap-3 md:grid-cols-2
`

const SpecialOfferCard = tw.div`
  group
  flex items-start gap-3 rounded-xl border-2 border-amber-200 p-4
  bg-linear-to-br from-amber-50 to-yellow-50
  transition-all duration-200 hover:border-amber-300 hover:shadow-md
`

const SpecialOfferIcon = tw.span`
  flex h-8 w-8 shrink-0 items-center justify-center rounded-lg
  bg-linear-to-br from-amber-400 to-yellow-500 text-white shadow-sm
  transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12
`

const SpecialOfferText = tw.span`
  text-sm text-gray-800 font-medium leading-relaxed
  flex-1
`

// Comparison (zalety i wady)
const ComparisonGrid = tw.div`
  grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6
`

const AdvantagesSection = tw.div`
  bg-white rounded-2xl overflow-hidden
  border-2 border-green-100
  shadow-sm hover:shadow-md transition-shadow duration-300
`

const DisadvantagesSection = tw.div`
  bg-white rounded-2xl overflow-hidden
  border-2 border-red-100
  shadow-sm hover:shadow-md transition-shadow duration-300
`

const ComparisonHeader = tw.div`
  px-5 py-4 border-b-2
  flex items-center gap-3
`

const ComparisonIcon = tw.div`
  w-10 h-10 rounded-xl
  flex items-center justify-center
`

const ComparisonTitle = tw.h5`
  font-bold text-base uppercase tracking-wide
`

const ComparisonList = tw.ul`
  p-5 space-y-3
`

const ComparisonItem = tw.li`
  flex items-start gap-3
  animate-in fade-in slide-in-from-left duration-300
`

const ComparisonBullet = tw.span`
  w-6 h-6 rounded-lg
  flex items-center justify-center
  font-bold text-sm shrink-0
`

const ComparisonText = tw.span`
  text-sm leading-relaxed flex-1
`

// LTV section
const LtvSection = tw.div`
  rounded-2xl border-2 border-blue-200 p-6 shadow-sm
  bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50
`

const LtvHeader = tw.div`
  mb-6 flex items-center gap-3
`

const LtvIconWrapper = tw.div`
  flex h-12 w-12 items-center justify-center rounded-xl shadow-md
  bg-linear-to-br from-blue-500 to-indigo-600
`

const LtvTitle = tw.h5`
  font-bold text-base md:text-lg text-gray-900
`

const LtvGrid = tw.div`
  grid grid-cols-1 md:grid-cols-3 gap-4 mb-4
`

const LtvCard = tw.div`
  bg-white rounded-xl p-5 border-2
  text-center
  hover:shadow-lg transition-all duration-300
  hover:-translate-y-1
`

const LtvPercentage = tw.div`
  text-3xl md:text-4xl font-bold mb-1
`

const LtvLabel = tw.div`
  text-xs text-gray-600 font-medium mb-3
`

const LtvDivider = tw.div`
  my-3 h-px bg-linear-to-r from-transparent via-gray-300 to-transparent
`

const LtvRatio = tw.div`
  text-sm font-semibold text-gray-700 mb-2
`

const LtvValue = tw.div`
  text-sm md:text-base font-bold
`

const LtvExplanation = tw.div`
  flex items-center justify-center gap-2 rounded-lg bg-white/50 p-3 text-center
  text-xs text-gray-700 backdrop-blur-sm md:text-sm
`

// Bank description
const BankDescription = tw.div`
  flex items-start gap-4 rounded-2xl border-2 border-blue-200 p-6 shadow-sm
  bg-linear-to-r from-blue-50 to-indigo-50
`

const DescriptionIconWrapper = tw.div`
  flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-md
  bg-linear-to-br from-blue-500 to-indigo-600
`

const DescriptionContent = tw.div`
  flex-1 min-w-0
`

const DescriptionTitle = tw.h5`
  font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide
`

const DescriptionText = tw.p`
  text-sm text-gray-700 leading-relaxed
`

// Update info
const UpdateInfo = tw.div`
  text-xs text-gray-500 text-center
  flex items-center justify-center gap-2
  mt-6 pt-6 border-t border-gray-200
  italic
`
