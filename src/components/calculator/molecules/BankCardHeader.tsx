import clsx from 'clsx'
import { BankLogo } from 'components/common/BankLogo'
import { IoStar, IoStarOutline } from 'react-icons/io5'
import tw from 'tw-tailwind'
import type { CalculationResult } from 'types/calculator'
import { formatCurrencyNoCents } from 'utils/calculator'
import { BankMetrics } from './BankMetrics'

export type BankCardHeaderProps = {
  result: CalculationResult
  index: number
  isTopThree: boolean
}

// Funkcja do generowania gwiazdek na podstawie score
const generateStars = (score: number) => {
  // Score 0-100 mapujemy na 0-5 gwiazdek
  const fullStars = Math.round((score / 100) * 5)
  const emptyStars = 5 - fullStars

  const stars = []

  // Dodaj pełne gwiazdki
  for (let i = 0; i < fullStars; i++) {
    stars.push(<IoStar key={`star-${score}-full-${i}`} className="text-amber-400" size={20} />)
  }

  // Dodaj puste gwiazdki
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <IoStarOutline key={`star-${score}-empty-${i}`} className="text-amber-400" size={20} />,
    )
  }

  return <>{stars}</>
}

export const BankCardHeader = ({ result, index, isTopThree }: BankCardHeaderProps) => {
  return (
    <>
      {/* Sekcja rankingu i logo */}
      <RankLogoSection>
        {isTopThree ? (
          <MedalBadge
            className={clsx(
              index === 0 && 'bg-linear-to-br from-amber-400 to-yellow-500',
              index === 1 && 'bg-linear-to-br from-gray-300 to-gray-400',
              index === 2 && 'bg-linear-to-br from-orange-400 to-amber-500',
            )}
          >
            <MedalIcon>
              {index === 0 && '🥇'}
              {index === 1 && '🥈'}
              {index === 2 && '🥉'}
            </MedalIcon>
          </MedalBadge>
        ) : (
          <RankNumber>#{index + 1}</RankNumber>
        )}

        <LogoContainer>
          <BankLogo
            src={result.bankLogo ?? '/images/banks/placeholder.png'}
            alt={`${result.bankName} logo`}
            bankName={result.bankName}
            size="md"
            priority={index < 3}
          />
        </LogoContainer>
      </RankLogoSection>

      {/* Główna sekcja z informacjami */}
      <MainContent>
        {/* Header z nazwą i score */}
        <ContentHeader>
          <BankNameWrapper>
            <BankName>{result.bankName}</BankName>
            {isTopThree && (
              <TopBadge
                className={clsx(
                  index === 0 && 'border-amber-200 bg-amber-50 text-amber-700',
                  index === 1 && 'border-gray-200 bg-gray-50 text-gray-700',
                  index === 2 && 'border-orange-200 bg-orange-50 text-orange-700',
                )}
              >
                {index === 0 && '⭐ Najlepsza oferta'}
                {index === 1 && '🥈 Druga najlepsza'}
                {index === 2 && '🥉 Trzecia najlepsza'}
              </TopBadge>
            )}
          </BankNameWrapper>
          <ScoreContainer>
            <ScoreBadge>
              <ScoreStars>{generateStars(result.score)}</ScoreStars>
              <ScoreValue>{result.score}/100</ScoreValue>
            </ScoreBadge>
          </ScoreContainer>
        </ContentHeader>

        {/* Kluczowe metryki */}
        <BankMetrics
          monthlyPayment={result.monthlyPayment}
          interestRate={result.interestRate}
          totalCost={result.totalCost}
        />

        {/* Quick facts */}
        <QuickFacts>
          <QuickFactItem>
            <QuickFactIcon>🏦</QuickFactIcon>
            <QuickFactText>
              Prowizja: <strong>{formatCurrencyNoCents(result.commission)}</strong>
            </QuickFactText>
          </QuickFactItem>
          <QuickFactDivider>•</QuickFactDivider>
          <QuickFactItem>
            <QuickFactIcon>🛡️</QuickFactIcon>
            <QuickFactText>
              Ubezpieczenie: <strong>{formatCurrencyNoCents(result.insurance)}</strong>
            </QuickFactText>
          </QuickFactItem>
          {result.bank?.processingTime && (
            <>
              <QuickFactDivider>•</QuickFactDivider>
              <QuickFactItem>
                <QuickFactIcon>⏱️</QuickFactIcon>
                <QuickFactText>
                  Czas: <strong>{result.bank.processingTime}</strong>
                </QuickFactText>
              </QuickFactItem>
            </>
          )}
        </QuickFacts>
      </MainContent>
    </>
  )
}

const RankLogoSection = tw.div`
  flex md:flex-col items-center gap-3 md:gap-4
  shrink-0
`

const MedalBadge = tw.div`
  w-12 h-12 md:w-14 md:h-14
  rounded-full
  flex items-center justify-center
  shadow-lg
  ring-4 ring-white
  transform group-hover:scale-110 transition-transform duration-300
`

const MedalIcon = tw.span`text-2xl md:text-3xl`

const RankNumber = tw.div`
  w-12 h-12 md:w-14 md:h-14
  rounded-full
  bg-linear-to-br from-gray-50 to-gray-100
  border-2 border-gray-200
  flex items-center justify-center
  text-lg md:text-xl font-bold text-gray-600
  shadow-sm
`

const LogoContainer = tw.div`
  w-20 h-20 md:w-24 md:h-24
  flex items-center justify-center
  bg-white rounded-xl md:rounded-2xl
  border border-gray-100
  p-2
  shadow-sm
  transition-all duration-300
  group-hover:shadow-md
`

const MainContent = tw.div`
  flex-1 flex flex-col gap-4 md:gap-5
  min-w-0
`

const ContentHeader = tw.div`
  flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3
`

const BankNameWrapper = tw.div`flex flex-col gap-2`

const BankName = tw.h3`
  text-xl md:text-2xl font-bold text-gray-900
  leading-tight
`

const TopBadge = tw.div`
  inline-flex items-center gap-1.5
  px-3 py-1.5
  rounded-full
  text-xs md:text-sm font-semibold
  border
  w-fit
`

const ScoreContainer = tw.div`flex items-center gap-2`

const ScoreBadge = tw.div`
  inline-flex items-center gap-2.5
  bg-linear-to-r from-green-50 to-emerald-50
  border border-green-200
  px-3 md:px-4 py-2
  rounded-xl
`

const ScoreStars = tw.span`flex items-center gap-0.5`

const ScoreValue = tw.span`
  text-sm md:text-base font-bold text-green-700
`

const QuickFacts = tw.div`
  flex flex-wrap items-center gap-2 md:gap-3
  px-3 py-2
  bg-gray-50/50
  rounded-lg
  border border-gray-100
`

const QuickFactItem = tw.div`
  flex items-center gap-1.5
`

const QuickFactIcon = tw.span`text-sm`

const QuickFactText = tw.span`
  text-xs md:text-sm text-gray-600
`

const QuickFactDivider = tw.span`
  text-gray-300 hidden sm:inline
`
