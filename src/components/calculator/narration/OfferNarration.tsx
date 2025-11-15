'use client'

import clsx from 'clsx'
import type { ReactNode } from 'react'
import { Fragment, useCallback, useEffect, useMemo, useRef } from 'react'
import {
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlineCollection,
  HiOutlineCreditCard,
  HiOutlineCurrencyDollar,
  HiOutlineGift,
  HiOutlineShieldCheck,
  HiOutlineTrendingUp,
} from 'react-icons/hi'
import { IoStar } from 'react-icons/io5'
import { MdPause, MdPlayArrow, MdReplay } from 'react-icons/md'
import tw from 'tw-tailwind'
import { PaymentScheduleChart } from './PaymentScheduleChart'

export type NarrationOffer = {
  bankId: string
  bankName: string
  loanAmount: number
  loanPeriodYears: number
  loanTermMonths: number
  monthlyPayment: number
  interestRate: number
  apr: number
  commission: number
  totalCost: number
  totalInterest?: number
  insurance?: number
  benefits: string[]
  // Opcjonalne dane do analizy
  monthlyIncome?: number
  // Dane do harmonogramu spłat
  paymentSchedule?: Array<{
    month: number
    payment: number
    principal: number
    interest: number
    remaining: number
  }>
  // Wady i zalety
  advantages?: string[]
  disadvantages?: string[]
  analysis?: {
    affordability: {
      dtiPercentage: number
      affordabilityLevel: 'excellent' | 'good' | 'moderate' | 'risky' | 'critical'
      remainingIncome: number
      recommendation: string
    }
    comparison: {
      rank: number
      totalOffers: number
      isTopOffer: boolean
      recommendation: string
    }
    risks: {
      hasVariableRate: boolean
      interestRateRisk: 'low' | 'medium' | 'high'
      riskScenarios: Array<{
        scenario: string
        newRate: number
        newMonthlyPayment: number
        increase: number
        isAffordable: boolean
      }>
      recommendations: string[]
    }
    overall: {
      score: number
      matchLevel: 'excellent' | 'good' | 'moderate' | 'poor'
      summary: string
      finalRecommendation: string
    }
  }
}

export type NarrationCta = {
  label: string
  onActivate: () => void
}

type OfferNarrationProps = {
  offer: NarrationOffer
  cta?: NarrationCta
  variant?: 'default' | 'compact' | 'list'
  className?: string
  activeSectionId?: string | null
  onSectionSelect?: (sectionId: string, options?: NarrationWordSelectionOptions) => void
  activeWordEntry?: NarrationWordEntry | null
  isPlaying?: boolean
  onPlaybackToggle?: (shouldPlay: boolean) => void
  onWordSelect?: (globalIndex: number, options?: NarrationWordSelectionOptions) => void
}

export type NarrationSection = {
  id: string
  title: string
  script: string
  highlights: string[]
}

export type NarrationWordEntry = {
  sectionId: string
  sectionIndex: number
  wordIndex: number
  word: string
  displayWord: string
  globalIndex: number
}

export type NarrationWordSelectionOptions = {
  autoPlay?: boolean
}

type DetailCardProps = {
  label: string
  value?: string
  highlightKey: string
  isActive: boolean
  renderContent?: () => ReactNode
}

const formatCurrency = (value: number) =>
  value.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })

const formatCurrencyNoCents = (value: number) =>
  value.toLocaleString('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

const formatPercent = (value: number) =>
  `${value.toLocaleString('pl-PL', { maximumFractionDigits: 2 })}%`

const formatPercentForNarration = (value: number) =>
  `${value.toLocaleString('pl-PL', { maximumFractionDigits: 1 })}%`

const formatLoanTermYears = (years: number) => {
  const suffix =
    years === 1
      ? 'rok'
      : years % 10 >= 2 && years % 10 <= 4 && (years < 10 || years > 20)
        ? 'lata'
        : 'lat'
  return `${years} ${suffix}`
}

// Funkcja normalizująca tekst korzyści do porównywania
const normalizeBenefit = (benefit: string): string => {
  return benefit
    .toLowerCase()
    .replace(/[.,!?;:()"]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

// Funkcja sprawdzająca czy dwie korzyści są podobne (duplikaty)
const areBenefitsSimilar = (benefit1: string, benefit2: string): boolean => {
  const normalized1 = normalizeBenefit(benefit1)
  const normalized2 = normalizeBenefit(benefit2)

  // Jeśli są identyczne po normalizacji
  if (normalized1 === normalized2) return true

  // Wyciągnij kluczowe informacje (liczby, procenty, kluczowe słowa)
  const extractKeyInfo = (text: string): string => {
    // Znajdź liczby i procenty
    const numbers = text.match(/\d+%?/g) || []
    // Znajdź kluczowe słowa związane z korzyściami
    const keyWords = [
      'prowizji',
      'prowizja',
      'koszt',
      'opłata',
      'karencji',
      'karencja',
      'wkład',
      'marża',
      'rrso',
    ]
    const foundKeyWords = keyWords.filter((kw) => text.includes(kw))

    return [...numbers, ...foundKeyWords].join(' ')
  }

  const keyInfo1 = extractKeyInfo(normalized1)
  const keyInfo2 = extractKeyInfo(normalized2)

  // Jeśli kluczowe informacje są identyczne, to są duplikatami
  if (keyInfo1 && keyInfo2 && keyInfo1 === keyInfo2) {
    return true
  }

  // Sprawdź czy jedna zawiera drugą (dla przypadków jak "0% prowizji" vs "0% prowizji za udzielenie")
  // ale tylko jeśli różnica jest w dodatkowych słowach na końcu
  const words1 = normalized1.split(' ')
  const words2 = normalized2.split(' ')

  // Jeśli jedna jest znacznie krótsza (co najmniej 2 słowa różnicy)
  if (Math.abs(words1.length - words2.length) >= 2) {
    const shorter = words1.length < words2.length ? normalized1 : normalized2
    const longer = words1.length >= words2.length ? normalized1 : normalized2

    // Jeśli krótsza jest zawarta w dłuższej i zaczyna się tak samo
    if (longer.startsWith(shorter) || shorter.split(' ').every((w) => longer.includes(w))) {
      return true
    }
  }

  return false
}

// Funkcja filtrująca korzyści - pomija informacje o terminach ważności ofert i duplikaty
const filterRealBenefits = (benefits: string[]): string[] => {
  // Najpierw usuń informacje o terminach ważności i warunkach
  const filtered = benefits
    .map((benefit) => {
      // Usuń informacje w nawiasach typu "(przy spełnieniu warunków)", "(dla klientów...)" itp.
      return benefit
        .replace(/\s*\([^)]*(?:przy|warunk|spełnieni|dla klient|wymagani)[^)]*\)/gi, '')
        .trim()
    })
    .filter((benefit) => {
      // Wzorce wskazujące na informacje o terminach ważności, a nie korzyści
      const nonBenefitPatterns = [
        /obowiązuje\s+od/i,
        /od\s+\d{1,2}\s+(stycznia|lutego|marca|kwietnia|maja|czerwca|lipca|sierpnia|września|października|listopada|grudnia)\s+\d{4}/i,
        /do\s+odwołania/i,
        /od\s+\d{1,2}\.\d{1,2}\.\d{4}/i,
        /do\s+\d{1,2}\.\d{1,2}\.\d{4}/i,
        /oferta\s+specjalna.*obowiązuje/i,
        /obowiązuje.*od.*do/i,
      ]

      // Jeśli tekst pasuje do wzorca informacji o terminie, pomiń go
      return !nonBenefitPatterns.some((pattern) => pattern.test(benefit))
    })
    .filter((benefit) => benefit.length > 0) // Usuń puste po usunięciu nawiasów

  // Następnie usuń duplikaty i podobne korzyści
  const uniqueBenefits: string[] = []
  for (const benefit of filtered) {
    const isDuplicate = uniqueBenefits.some((existing) => areBenefitsSimilar(benefit, existing))
    if (!isDuplicate) {
      uniqueBenefits.push(benefit)
    }
  }

  return uniqueBenefits
}

const getHighlightKeyIcon = (highlightKey: string, size: 'sm' | 'md' | 'lg' = 'md'): ReactNode => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }
  const iconProps = { className: `${sizeClasses[size]} text-gray-600` }
  switch (highlightKey) {
    case 'loanAmount':
      return <HiOutlineCollection {...iconProps} />
    case 'loanPeriod':
      return <HiOutlineCalendar {...iconProps} />
    case 'monthlyPayment':
      return <HiOutlineCurrencyDollar {...iconProps} />
    case 'interestRate':
      return <HiOutlineChartBar {...iconProps} />
    case 'apr':
      return <HiOutlineTrendingUp {...iconProps} />
    case 'totalInterest':
      return <HiOutlineCurrencyDollar {...iconProps} />
    case 'commission':
      return <HiOutlineCreditCard {...iconProps} />
    case 'insurance':
      return <HiOutlineShieldCheck {...iconProps} />
    case 'totalCost':
      return <HiOutlineCollection {...iconProps} />
    case 'benefits':
      return <HiOutlineGift {...iconProps} />
    case 'affordability':
    case 'affordabilityLevel':
      return <HiOutlineShieldCheck {...iconProps} />
    case 'remainingIncome':
      return <HiOutlineCurrencyDollar {...iconProps} />
    case 'rank':
    case 'comparison':
      return <HiOutlineTrendingUp {...iconProps} />
    case 'score':
    case 'matchLevel':
    case 'overall':
      return <HiOutlineChartBar {...iconProps} />
    case 'risk':
    case 'riskScenarios':
      return <HiOutlineShieldCheck {...iconProps} />
    case 'schedule':
    case 'payment':
    case 'firstPayment':
    case 'firstPrincipal':
    case 'firstInterest':
    case 'midPayment':
    case 'lastPayment':
      return <HiOutlineCalendar {...iconProps} />
    case 'advantages':
      return <HiOutlineGift {...iconProps} />
    case 'disadvantages':
      return <HiOutlineShieldCheck {...iconProps} />
    default:
      return <HiOutlineChartBar {...iconProps} />
  }
}

const getPropertyComponentForSection = (sectionId: string) => {
  switch (sectionId) {
    case 'basics':
      return BasicPropertyCard
    case 'interest':
      return InterestPropertyCard
    case 'costs':
      return CostPropertyCard
    case 'benefits':
      return BenefitPropertyCard
    case 'affordability':
      return AffordabilityPropertyCard
    case 'comparison':
      return ComparisonPropertyCard
    case 'risks':
      return RisksPropertyCard
    case 'overall':
      return OverallPropertyCard
    case 'schedule':
      return SchedulePropertyCard
    case 'prosCons':
      return ProsConsPropertyCard
    case 'summary':
      return SummaryPropertyCard
    default:
      return ListVariantProperty
  }
}

const renderPropertyContent = (
  sectionId: string,
  item: { label: string; value: string; highlightKey: string },
) => {
  switch (sectionId) {
    case 'basics':
      return (
        <>
          <BasicPropertyIconWrapper>
            {getHighlightKeyIcon(item.highlightKey, 'lg')}
          </BasicPropertyIconWrapper>
          <BasicPropertyContent>
            <BasicPropertyLabel>{item.label}</BasicPropertyLabel>
            <BasicPropertyValue>{item.value}</BasicPropertyValue>
          </BasicPropertyContent>
        </>
      )
    case 'interest':
      return (
        <>
          <InterestPropertyIconWrapper>
            {getHighlightKeyIcon(item.highlightKey, 'md')}
          </InterestPropertyIconWrapper>
          <InterestPropertyContent>
            <InterestPropertyLabel>{item.label}</InterestPropertyLabel>
            <InterestPropertyValue>{item.value}</InterestPropertyValue>
          </InterestPropertyContent>
        </>
      )
    case 'costs':
      return (
        <>
          <CostPropertyIconWrapper>
            {getHighlightKeyIcon(item.highlightKey, 'lg')}
          </CostPropertyIconWrapper>
          <CostPropertyContent>
            <CostPropertyLabel>{item.label}</CostPropertyLabel>
            <CostPropertyValue>{item.value}</CostPropertyValue>
          </CostPropertyContent>
        </>
      )
    case 'benefits':
      return (
        <>
          <BenefitPropertyIcon>
            <IoStar className="h-4 w-4 fill-current text-gray-400" />
          </BenefitPropertyIcon>
          <BenefitPropertyValue>{item.value}</BenefitPropertyValue>
        </>
      )
    case 'affordability':
      return (
        <>
          <AffordabilityPropertyIconWrapper>
            {getHighlightKeyIcon(item.highlightKey, 'md')}
          </AffordabilityPropertyIconWrapper>
          <AffordabilityPropertyContent>
            <AffordabilityPropertyLabel>{item.label}</AffordabilityPropertyLabel>
            <AffordabilityPropertyValue>{item.value}</AffordabilityPropertyValue>
          </AffordabilityPropertyContent>
        </>
      )
    case 'comparison':
      return (
        <>
          <ComparisonPropertyIconWrapper>
            {getHighlightKeyIcon(item.highlightKey, 'md')}
          </ComparisonPropertyIconWrapper>
          <ComparisonPropertyContent>
            <ComparisonPropertyLabel>{item.label}</ComparisonPropertyLabel>
            <ComparisonPropertyValue>{item.value}</ComparisonPropertyValue>
          </ComparisonPropertyContent>
        </>
      )
    case 'risks':
      return (
        <>
          <RisksPropertyIconWrapper>
            {getHighlightKeyIcon(item.highlightKey, 'md')}
          </RisksPropertyIconWrapper>
          <RisksPropertyContent>
            <RisksPropertyLabel>{item.label}</RisksPropertyLabel>
            <RisksPropertyValue>{item.value}</RisksPropertyValue>
          </RisksPropertyContent>
        </>
      )
    case 'overall':
      return (
        <>
          <OverallPropertyIconWrapper>
            {getHighlightKeyIcon(item.highlightKey, 'md')}
          </OverallPropertyIconWrapper>
          <OverallPropertyContent>
            <OverallPropertyLabel>{item.label}</OverallPropertyLabel>
            <OverallPropertyValue>{item.value}</OverallPropertyValue>
          </OverallPropertyContent>
        </>
      )
    case 'schedule':
      return (
        <>
          <SchedulePropertyIconWrapper>
            {getHighlightKeyIcon(item.highlightKey, 'md')}
          </SchedulePropertyIconWrapper>
          <SchedulePropertyContent>
            <SchedulePropertyLabel>{item.label}</SchedulePropertyLabel>
            <SchedulePropertyValue>{item.value}</SchedulePropertyValue>
          </SchedulePropertyContent>
        </>
      )
    case 'prosCons':
      return (
        <>
          <ProsConsPropertyIcon>
            {item.highlightKey === 'advantages' ? (
              <svg
                className="h-4 w-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-label="Zaleta"
              >
                <title>Zaleta</title>
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="h-4 w-4 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-label="Wada"
              >
                <title>Wada</title>
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </ProsConsPropertyIcon>
          <ProsConsPropertyContent>
            <ProsConsPropertyLabel>{item.label}</ProsConsPropertyLabel>
            <ProsConsPropertyValue>{item.value}</ProsConsPropertyValue>
          </ProsConsPropertyContent>
        </>
      )
    case 'summary':
      return (
        <>
          <SummaryPropertyIconWrapper>
            {getHighlightKeyIcon(item.highlightKey, 'md')}
          </SummaryPropertyIconWrapper>
          <SummaryPropertyContent>
            <SummaryPropertyLabel>{item.label}</SummaryPropertyLabel>
            <SummaryPropertyValue>{item.value}</SummaryPropertyValue>
          </SummaryPropertyContent>
        </>
      )
    default:
      return (
        <>
          <ListVariantPropertyHeader>
            <ListVariantPropertyIcon>
              {getHighlightKeyIcon(item.highlightKey)}
            </ListVariantPropertyIcon>
            <ListVariantPropertyLabel>{item.label}</ListVariantPropertyLabel>
          </ListVariantPropertyHeader>
          <ListVariantPropertyValue>{item.value}</ListVariantPropertyValue>
        </>
      )
  }
}

export const createNarrationSections = (
  offer: NarrationOffer,
  includeBenefits: boolean,
  hasCta: boolean,
): NarrationSection[] => {
  const realBenefits = filterRealBenefits(offer.benefits)
  const hasBenefits = includeBenefits && realBenefits.length > 0
  const insurancePart = offer.insurance
    ? `, a ubezpieczenia wynoszą ${formatCurrencyNoCents(offer.insurance)}`
    : ''
  const interestPart = offer.totalInterest
    ? `, co oznacza około ${formatCurrencyNoCents(offer.totalInterest)} odsetek`
    : ''

  // Jeśli mamy analizę, zaczynamy od szybkiego podsumowania i porównania
  const sections: NarrationSection[] = []

  if (offer.analysis && offer.monthlyIncome) {
    const analysis = offer.analysis

    // Sekcja 0: Szybkie podsumowanie i porównanie (na początku!)
    let quickSummaryScript = `Oferta ${offer.bankName}. `

    if (analysis.comparison.isTopOffer) {
      quickSummaryScript += `To jedna z najlepszych ofert spośród ${analysis.comparison.totalOffers} dostępnych. `
    } else if (analysis.comparison.rank <= 3) {
      quickSummaryScript += `To ${analysis.comparison.rank}. najlepsza oferta spośród ${analysis.comparison.totalOffers} dostępnych. `
    } else {
      quickSummaryScript += `Ta oferta zajmuje ${analysis.comparison.rank}. miejsce na ${analysis.comparison.totalOffers} dostępnych ofert. `
    }

    const affordabilityLevelText = {
      excellent: 'doskonała',
      good: 'dobra',
      moderate: 'umiarkowana',
      risky: 'ryzykowna',
      critical: 'krytyczna',
    }[analysis.affordability.affordabilityLevel]

    quickSummaryScript += `Miesięczna rata wynosi ${formatCurrencyNoCents(offer.monthlyPayment)}, co oznacza ${affordabilityLevelText} zdolność kredytową. `

    const matchLevelText = {
      excellent: 'bardzo dobrze',
      good: 'dobrze',
      moderate: 'umiarkowanie',
      poor: 'słabo',
    }[analysis.overall.matchLevel]

    quickSummaryScript += `Oferta pasuje ${matchLevelText} do Twojej sytuacji finansowej.`

    sections.push({
      id: 'quickSummary',
      title: 'Szybkie podsumowanie',
      script: quickSummaryScript,
      highlights: ['monthlyPayment', 'rank', 'comparison', 'affordabilityLevel'],
    })
  }

  // Podstawowe parametry - uproszczone
  sections.push({
    id: 'basics',
    title: 'Podstawowe parametry',
    script: `Kwota kredytu: ${formatCurrencyNoCents(offer.loanAmount)} na ${formatLoanTermYears(
      offer.loanPeriodYears,
    )}. Miesięczna rata: ${formatCurrencyNoCents(offer.monthlyPayment)}.`,
    highlights: ['loanAmount', 'loanPeriod', 'monthlyPayment'],
  })

  // Oprocentowanie - uproszczone, skupiamy się na RRSO
  sections.push({
    id: 'interest',
    title: 'Oprocentowanie',
    script: `Rzeczywisty koszt kredytu, czyli RRSO, wynosi ${formatPercentForNarration(
      offer.apr,
    )}. To najważniejszy wskaźnik, który pokazuje ile naprawdę zapłacisz${interestPart}.`,
    highlights: ['apr', 'totalInterest'],
  })

  // Koszty - tylko najważniejsze
  sections.push({
    id: 'costs',
    title: 'Koszty',
    script: `Łączny koszt kredytu to ${formatCurrencyNoCents(offer.totalCost)}${insurancePart ? `, w tym ubezpieczenia ${formatCurrencyNoCents(offer.insurance)}` : ''}.`,
    highlights: ['totalCost', 'insurance'],
  })

  // Benefits tylko jeśli są istotne
  if (hasBenefits && realBenefits.length > 0) {
    sections.push({
      id: 'benefits',
      title: 'Dodatkowe korzyści',
      script: `Warto zwrócić uwagę na: ${realBenefits.slice(0, 3).join(', ')}.`,
      highlights: ['benefits'],
    })
  }

  // Dodaj sekcje analizy, jeśli dostępna
  if (offer.analysis && offer.monthlyIncome) {
    const analysis = offer.analysis

    // Sekcja 1: Zdolność kredytowa - tylko jeśli nie było w quickSummary
    if (!offer.analysis?.comparison?.isTopOffer || offer.analysis.comparison.rank > 1) {
      const affordabilityLevelText = {
        excellent: 'doskonała',
        good: 'dobra',
        moderate: 'umiarkowana',
        risky: 'ryzykowna',
        critical: 'krytyczna',
      }[analysis.affordability.affordabilityLevel]

      const affordabilityScript = `Rata stanowi ${formatPercentForNarration(
        analysis.affordability.dtiPercentage,
      )} Twojego dochodu, co oznacza ${affordabilityLevelText} zdolność kredytową. Po spłacie raty zostanie Ci około ${formatCurrencyNoCents(
        analysis.affordability.remainingIncome,
      )} miesięcznie. ${analysis.affordability.recommendation}`

      sections.push({
        id: 'affordability',
        title: 'Zdolność kredytowa',
        script: affordabilityScript,
        highlights: ['affordability', 'affordabilityLevel', 'remainingIncome'],
      })
    }

    // Sekcja 2: Analiza ryzyk - uproszczona
    let risksScript = ``
    if (analysis.risks.hasVariableRate) {
      const riskText = {
        low: 'niskie',
        medium: 'średnie',
        high: 'wysokie',
      }[analysis.risks.interestRateRisk]

      risksScript += `Kredyt ze zmiennym oprocentowaniem oznacza ${riskText} ryzyko zmian raty. `

      if (analysis.risks.riskScenarios.length > 0) {
        const worstCase = analysis.risks.riskScenarios[analysis.risks.riskScenarios.length - 1]
        if (worstCase && !worstCase.isAffordable) {
          risksScript += `W najgorszym scenariuszu rata może wzrosnąć do około ${formatCurrencyNoCents(
            worstCase.newMonthlyPayment,
          )}. `
        }
      }

      if (analysis.risks.recommendations.length > 0) {
        risksScript += analysis.risks.recommendations[0]
      }
    } else {
      risksScript += `Stałe oprocentowanie oznacza, że rata nie zmieni się przez cały okres kredytowania.`
    }

    sections.push({
      id: 'risks',
      title: 'Analiza ryzyk',
      script: risksScript,
      highlights: ['risk', 'riskScenarios'],
    })

    // Sekcja 3: Ocena dopasowania - tylko jeśli nie było w quickSummary lub jeśli jest szczegółowa
    if (!offer.analysis?.comparison?.isTopOffer || offer.analysis.comparison.rank > 1) {
      const matchLevelText = {
        excellent: 'bardzo dobrze',
        good: 'dobrze',
        moderate: 'umiarkowanie',
        poor: 'słabo',
      }[analysis.overall.matchLevel]

      const overallScript = `${analysis.overall.summary} ${analysis.overall.finalRecommendation}`

      sections.push({
        id: 'overall',
        title: 'Ocena dopasowania',
        script: overallScript,
        highlights: ['overall'],
      })
    }
  }

  // Sekcja harmonogramu spłat - uproszczona, tylko najważniejsze
  if (offer.paymentSchedule && offer.paymentSchedule.length > 0) {
    const schedule = offer.paymentSchedule
    const firstPayment = schedule[0]
    const lastPayment = schedule[schedule.length - 1]

    if (firstPayment && lastPayment) {
      const scheduleScript = `Harmonogram spłat. Rata przez cały okres wynosi około ${formatCurrencyNoCents(
        firstPayment.payment,
      )} miesięcznie. Z czasem udział odsetek maleje, a udział spłaty kapitału rośnie.`

      sections.push({
        id: 'schedule',
        title: 'Harmonogram spłat',
        script: scheduleScript,
        highlights: ['firstPayment'],
      })
    }
  }

  // Sekcja wad i zalet
  const hasAdvantages = offer.advantages && offer.advantages.length > 0
  const hasDisadvantages = offer.disadvantages && offer.disadvantages.length > 0

  if (hasAdvantages || hasDisadvantages) {
    let prosConsScript = `Wady i zalety oferty. `

    if (hasAdvantages && offer.advantages) {
      const filteredAdvantages = filterRealBenefits(offer.advantages)
      if (filteredAdvantages.length > 0) {
        if (filteredAdvantages.length === 1) {
          prosConsScript += `Zaletą tej oferty jest: ${filteredAdvantages[0]}. `
        } else {
          prosConsScript += `Zaletami tej oferty są: ${filteredAdvantages.join(', ')}. `
        }
      }
    }

    if (hasDisadvantages && offer.disadvantages) {
      const filteredDisadvantages = filterRealBenefits(offer.disadvantages)
      if (filteredDisadvantages.length > 0) {
        if (filteredDisadvantages.length === 1) {
          prosConsScript += `Wadą jest: ${filteredDisadvantages[0]}. `
        } else {
          prosConsScript += `Wadami są: ${filteredDisadvantages.join(', ')}. `
        }
      }
    }

    prosConsScript += `Przed podjęciem decyzji warto rozważyć wszystkie aspekty oferty.`

    sections.push({
      id: 'prosCons',
      title: 'Wady i zalety',
      script: prosConsScript,
      highlights: ['advantages', 'disadvantages'],
    })
  }

  // Podsumowanie tylko jeśli nie było quickSummary
  if (!offer.analysis || !offer.monthlyIncome) {
    sections.push({
      id: 'summary',
      title: 'Podsumowanie',
      script: `Miesięczna rata: ${formatCurrencyNoCents(offer.monthlyPayment)} przez ${formatLoanTermYears(
        offer.loanPeriodYears,
      )}. Łączny koszt: ${formatCurrencyNoCents(offer.totalCost)}. ${hasCta ? 'Jeśli chcesz przejść dalej, użyj przycisku poniżej.' : 'Możesz porównać tę ofertę z innymi i wybrać najlepszą dla siebie.'}`,
      highlights: ['monthlyPayment', 'totalCost'],
    })
  }

  return sections
}

export const createNarrationWordEntries = (sections: NarrationSection[]): NarrationWordEntry[] => {
  const entries: NarrationWordEntry[] = []

  sections.forEach((section, sectionIndex) => {
    const words = section.script
      .split(/\s+/)
      .map((word) => word.trim())
      .filter(Boolean)

    words.forEach((word, wordIndex) => {
      entries.push({
        sectionId: section.id,
        sectionIndex,
        wordIndex,
        word,
        displayWord: word.replace(/[.,!?;:]+$/g, ''),
        globalIndex: entries.length,
      })
    })
  })

  return entries
}

export type NarrationDisplayStep = {
  id: string
  title: string
  description: string
  items: Array<{
    label: string
    value: string
    highlightKey: string
  }>
}

export const createNarrationDisplaySteps = (offer: NarrationOffer): NarrationDisplayStep[] => {
  const sections = createNarrationSections(offer, true, false)
  return sections.map((section) => {
    switch (section.id) {
      case 'quickSummary':
        if (!offer.analysis) {
          return {
            id: section.id,
            title: section.title,
            description: section.script,
            items: [],
          }
        }
        {
          const analysis = offer.analysis
          const affordabilityLevelText = {
            excellent: 'Doskonała',
            good: 'Dobra',
            moderate: 'Umiarkowana',
            risky: 'Ryzykowna',
            critical: 'Krytyczna',
          }[analysis.affordability.affordabilityLevel]

          const matchLevelText = {
            excellent: 'Bardzo dobra',
            good: 'Dobra',
            moderate: 'Umiarkowana',
            poor: 'Słaba',
          }[analysis.overall.matchLevel]

          return {
            id: section.id,
            title: section.title,
            description: section.script,
            items: [
              {
                label: 'Pozycja w rankingu',
                value: `${analysis.comparison.rank}. / ${analysis.comparison.totalOffers}`,
                highlightKey: 'rank',
              },
              {
                label: 'Miesięczna rata',
                value: formatCurrency(offer.monthlyPayment),
                highlightKey: 'monthlyPayment',
              },
              {
                label: 'Zdolność kredytowa',
                value: affordabilityLevelText,
                highlightKey: 'affordabilityLevel',
              },
              {
                label: 'Dopasowanie',
                value: matchLevelText,
                highlightKey: 'comparison',
              },
            ],
          }
        }
      case 'basics':
        return {
          id: section.id,
          title: section.title,
          description: section.script,
          items: [
            {
              label: 'Kwota kredytu',
              value: formatCurrency(offer.loanAmount),
              highlightKey: 'loanAmount',
            },
            {
              label: 'Okres spłaty',
              value: `${formatLoanTermYears(offer.loanPeriodYears)} (${offer.loanTermMonths} mies.)`,
              highlightKey: 'loanPeriod',
            },
            {
              label: 'Miesięczna rata',
              value: formatCurrency(offer.monthlyPayment),
              highlightKey: 'monthlyPayment',
            },
          ],
        }
      case 'interest':
        return {
          id: section.id,
          title: section.title,
          description: section.script,
          items: [
            {
              label: 'Oprocentowanie nominalne',
              value: formatPercent(offer.interestRate),
              highlightKey: 'interestRate',
            },
            { label: 'RRSO', value: formatPercent(offer.apr), highlightKey: 'apr' },
            ...(typeof offer.totalInterest === 'number'
              ? [
                  {
                    label: 'Łączne odsetki',
                    value: formatCurrency(offer.totalInterest),
                    highlightKey: 'totalInterest',
                  },
                ]
              : []),
          ],
        }
      case 'costs':
        return {
          id: section.id,
          title: section.title,
          description: section.script,
          items: [
            {
              label: 'Prowizja banku',
              value: formatCurrency(offer.commission),
              highlightKey: 'commission',
            },
            ...(typeof offer.insurance === 'number'
              ? [
                  {
                    label: 'Ubezpieczenia',
                    value: formatCurrency(offer.insurance),
                    highlightKey: 'insurance',
                  },
                ]
              : []),
            {
              label: 'Całkowity koszt',
              value: formatCurrency(offer.totalCost),
              highlightKey: 'totalCost',
            },
          ],
        }
      case 'benefits': {
        const realBenefits = filterRealBenefits(offer.benefits)
        return {
          id: section.id,
          title: section.title,
          description: section.script,
          items:
            realBenefits.length > 0
              ? realBenefits.slice(0, 4).map((benefit) => ({
                  label: '',
                  value: benefit,
                  highlightKey: 'benefits',
                }))
              : [
                  {
                    label: '',
                    value: 'Brak deklarowanych benefitów',
                    highlightKey: 'benefits',
                  },
                ],
        }
      }
      case 'affordability':
        if (!offer.analysis || !offer.monthlyIncome) {
          return {
            id: section.id,
            title: section.title,
            description: section.script,
            items: [],
          }
        }
        {
          const analysis = offer.analysis
          const affordabilityLevelText = {
            excellent: 'Doskonała',
            good: 'Dobra',
            moderate: 'Umiarkowana',
            risky: 'Ryzykowna',
            critical: 'Krytyczna',
          }[analysis.affordability.affordabilityLevel]

          return {
            id: section.id,
            title: section.title,
            description: section.script,
            items: [
              {
                label: 'Rata / Dochód',
                value: `${formatPercent(analysis.affordability.dtiPercentage)}`,
                highlightKey: 'affordability',
              },
              {
                label: 'Poziom bezpieczeństwa',
                value: affordabilityLevelText,
                highlightKey: 'affordabilityLevel',
              },
              {
                label: 'Pozostały dochód',
                value: formatCurrency(analysis.affordability.remainingIncome),
                highlightKey: 'remainingIncome',
              },
            ],
          }
        }
      case 'comparison':
        if (!offer.analysis) {
          return {
            id: section.id,
            title: section.title,
            description: section.script,
            items: [],
          }
        }
        {
          const analysis = offer.analysis
          return {
            id: section.id,
            title: section.title,
            description: section.script,
            items: [
              {
                label: 'Pozycja w rankingu',
                value: `${analysis.comparison.rank}. / ${analysis.comparison.totalOffers}`,
                highlightKey: 'rank',
              },
              {
                label: 'Status',
                value: analysis.comparison.isTopOffer ? 'Top oferta' : 'Standardowa',
                highlightKey: 'comparison',
              },
            ],
          }
        }
      case 'risks':
        if (!offer.analysis) {
          return {
            id: section.id,
            title: section.title,
            description: section.script,
            items: [],
          }
        }
        {
          const analysis = offer.analysis
          return {
            id: section.id,
            title: section.title,
            description: section.script,
            items: [
              ...(analysis.risks.hasVariableRate
                ? [
                    {
                      label: 'Ryzyko stóp procentowych',
                      value:
                        analysis.risks.interestRateRisk === 'low'
                          ? 'Niskie'
                          : analysis.risks.interestRateRisk === 'medium'
                            ? 'Średnie'
                            : 'Wysokie',
                      highlightKey: 'risk',
                    },
                    ...(analysis.risks.riskScenarios.length > 0
                      ? analysis.risks.riskScenarios
                          .filter((s) => !s.isAffordable)
                          .slice(0, 1)
                          .map((scenario) => ({
                            label: 'Najgorszy scenariusz',
                            value: `+${formatPercent(scenario.newRate - offer.interestRate)} → ${formatCurrency(
                              scenario.newMonthlyPayment,
                            )}`,
                            highlightKey: 'riskScenarios',
                          }))
                      : []),
                  ]
                : [
                    {
                      label: 'Ryzyko stóp procentowych',
                      value: 'Brak (stałe oprocentowanie)',
                      highlightKey: 'risk',
                    },
                  ]),
            ],
          }
        }
      case 'overall':
        if (!offer.analysis) {
          return {
            id: section.id,
            title: section.title,
            description: section.script,
            items: [],
          }
        }
        {
          const analysis = offer.analysis
          const matchLevelText = {
            excellent: 'Bardzo dobra',
            good: 'Dobra',
            moderate: 'Umiarkowana',
            poor: 'Słaba',
          }[analysis.overall.matchLevel]

          return {
            id: section.id,
            title: section.title,
            description: section.script,
            items: [
              {
                label: 'Ocena dopasowania',
                value: `${analysis.overall.score}/100`,
                highlightKey: 'score',
              },
              {
                label: 'Poziom dopasowania',
                value: matchLevelText,
                highlightKey: 'matchLevel',
              },
            ],
          }
        }
      case 'schedule':
        if (!offer.paymentSchedule || offer.paymentSchedule.length === 0) {
          return {
            id: section.id,
            title: section.title,
            description: section.script,
            items: [],
          }
        }
        {
          const schedule = offer.paymentSchedule
          const firstPayment = schedule[0]
          const midPayment = schedule[Math.floor(schedule.length / 2)]
          const lastPayment = schedule[schedule.length - 1]

          if (!firstPayment) {
            return {
              id: section.id,
              title: section.title,
              description: section.script,
              items: [],
            }
          }

          return {
            id: section.id,
            title: section.title,
            description: section.script,
            items: [
              {
                label: 'Pierwsza rata',
                value: formatCurrency(firstPayment.payment),
                highlightKey: 'firstPayment',
              },
              {
                label: 'Kapitał w pierwszej racie',
                value: formatCurrency(firstPayment.principal),
                highlightKey: 'firstPrincipal',
              },
              {
                label: 'Odsetki w pierwszej racie',
                value: formatCurrency(firstPayment.interest),
                highlightKey: 'firstInterest',
              },
              ...(midPayment
                ? [
                    {
                      label: 'Średnia rata',
                      value: formatCurrency(midPayment.payment),
                      highlightKey: 'midPayment',
                    },
                  ]
                : []),
              ...(lastPayment
                ? [
                    {
                      label: 'Ostatnia rata',
                      value: formatCurrency(lastPayment.payment),
                      highlightKey: 'lastPayment',
                    },
                  ]
                : []),
            ],
          }
        }
      case 'prosCons': {
        const realAdvantages = offer.advantages ? filterRealBenefits(offer.advantages) : []
        const realDisadvantages = offer.disadvantages ? filterRealBenefits(offer.disadvantages) : []

        return {
          id: section.id,
          title: section.title,
          description: section.script,
          items: [
            ...(realAdvantages.length > 0
              ? realAdvantages.slice(0, 3).map((advantage) => ({
                  label: 'Zaleta',
                  value: advantage,
                  highlightKey: 'advantages',
                }))
              : []),
            ...(realDisadvantages.length > 0
              ? realDisadvantages.slice(0, 3).map((disadvantage) => ({
                  label: 'Wada',
                  value: disadvantage,
                  highlightKey: 'disadvantages',
                }))
              : []),
          ],
        }
      }
      case 'summary':
        return {
          id: section.id,
          title: section.title,
          description: section.script,
          items: [
            {
              label: 'Rata',
              value: formatCurrency(offer.monthlyPayment),
              highlightKey: 'monthlyPayment',
            },
            {
              label: 'Całkowity koszt',
              value: formatCurrency(offer.totalCost),
              highlightKey: 'totalCost',
            },
          ],
        }
      default:
        return {
          id: section.id,
          title: section.title,
          description: section.script,
          items: [],
        }
    }
  })
}

const detailCardsConfig = (offer: NarrationOffer) => {
  const realBenefits = filterRealBenefits(offer.benefits)
  const cards: Array<Omit<DetailCardProps, 'isActive'>> = [
    {
      label: 'Kwota kredytu',
      value: formatCurrency(offer.loanAmount),
      highlightKey: 'loanAmount',
    },
    {
      label: 'Okres spłaty',
      value: `${formatLoanTermYears(offer.loanPeriodYears)} (${offer.loanTermMonths} mies.)`,
      highlightKey: 'loanPeriod',
    },
    {
      label: 'Miesięczna rata',
      value: formatCurrency(offer.monthlyPayment),
      highlightKey: 'monthlyPayment',
    },
    {
      label: 'Oprocentowanie nominalne',
      value: formatPercent(offer.interestRate),
      highlightKey: 'interestRate',
    },
    {
      label: 'RRSO',
      value: formatPercent(offer.apr),
      highlightKey: 'apr',
    },
    {
      label: 'Prowizja banku',
      value: formatCurrency(offer.commission),
      highlightKey: 'commission',
    },
  ]

  if (typeof offer.insurance === 'number') {
    cards.push({
      label: 'Ubezpieczenia',
      value: formatCurrency(offer.insurance),
      highlightKey: 'insurance',
    })
  }

  if (typeof offer.totalInterest === 'number') {
    cards.push({
      label: 'Łączne odsetki',
      value: formatCurrency(offer.totalInterest),
      highlightKey: 'totalInterest',
    })
  }

  cards.push({
    label: 'Całkowity koszt',
    value: formatCurrency(offer.totalCost),
    highlightKey: 'totalCost',
  })

  cards.push({
    label: 'Korzyści dodatkowe',
    highlightKey: 'benefits',
    renderContent: () =>
      realBenefits.length > 0 ? (
        <BenefitsList>
          {realBenefits.slice(0, 6).map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
          {realBenefits.length > 6 && <MoreBenefitsInfo>… i więcej</MoreBenefitsInfo>}
        </BenefitsList>
      ) : (
        <EmptyBenefits>Brak deklarowanych benefitów</EmptyBenefits>
      ),
  })

  return cards
}

export function OfferNarration({
  offer,
  cta,
  variant = 'default',
  className,
  activeSectionId,
  onSectionSelect,
  activeWordEntry,
  isPlaying = false,
  onPlaybackToggle,
  onWordSelect,
}: OfferNarrationProps) {
  const sections = useMemo(() => createNarrationSections(offer, true, Boolean(cta)), [offer, cta])
  const detailCards = useMemo(() => detailCardsConfig(offer), [offer])
  const displaySteps = useMemo(() => createNarrationDisplaySteps(offer), [offer])
  const wordEntries = useMemo(() => createNarrationWordEntries(sections), [sections])

  const sectionWordEntriesMap = useMemo(() => {
    const map = new Map<string, NarrationWordEntry[]>()
    wordEntries.forEach((entry) => {
      const existing = map.get(entry.sectionId)
      if (existing) {
        existing.push(entry)
      } else {
        map.set(entry.sectionId, [entry])
      }
    })
    return map
  }, [wordEntries])

  const isCompact = variant === 'compact'
  const isListVariant = variant === 'list'

  const currentSectionId = activeSectionId ?? sections[0]?.id ?? null
  const currentSectionIndex = useMemo(() => {
    if (!currentSectionId) return 0
    const idx = sections.findIndex((section) => section.id === currentSectionId)
    return idx >= 0 ? idx : 0
  }, [currentSectionId, sections])

  const sectionElementsRef = useRef<Record<string, HTMLElement | null>>({})
  const scriptPanelRef = useRef<HTMLDivElement | null>(null)
  const prevIsPlayingRef = useRef(isPlaying)
  const prevSectionIdRef = useRef<string | null>(currentSectionId ?? null)
  const scrollTimeoutRef = useRef<number | null>(null)
  const isPlayingRef = useRef(isPlaying)

  const registerSectionElement = useCallback(
    (sectionId: string) => (node: HTMLElement | null) => {
      if (node) {
        sectionElementsRef.current[sectionId] = node
      } else {
        delete sectionElementsRef.current[sectionId]
      }
    },
    [],
  )

  const clearScheduledScroll = useCallback(() => {
    if (scrollTimeoutRef.current !== null) {
      window.clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    isPlayingRef.current = isPlaying
    if (!isPlaying) {
      clearScheduledScroll()
    }
  }, [clearScheduledScroll, isPlaying])

  const scrollToCurrentSection = useCallback(
    (sectionId: string | null) => {
      if (!sectionId) return
      if (typeof window === 'undefined') return

      const targetElement: HTMLElement | null = isListVariant
        ? (sectionElementsRef.current[sectionId] ?? null)
        : scriptPanelRef.current

      if (!targetElement) return

      window.requestAnimationFrame(() => {
        const rect = targetElement.getBoundingClientRect()
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight
        const headerOffset = isListVariant ? 140 : 96
        const topBoundary = headerOffset
        const bottomBoundary = viewportHeight - headerOffset

        const isWithinView =
          rect.top >= topBoundary &&
          rect.bottom <= bottomBoundary &&
          rect.top >= 0 &&
          rect.bottom <= viewportHeight

        if (isWithinView) return

        const targetY = rect.top + window.scrollY - headerOffset
        window.scrollTo({
          top: Math.max(targetY, 0),
          behavior: 'smooth',
        })
      })
    },
    [isListVariant],
  )

  const scheduleScrollToSection = useCallback(
    (sectionId: string | null, delay: number) => {
      if (!sectionId) return
      clearScheduledScroll()
      if (!isPlayingRef.current) return
      scrollTimeoutRef.current = window.setTimeout(() => {
        scrollToCurrentSection(sectionId)
        scrollTimeoutRef.current = null
      }, delay)
    },
    [clearScheduledScroll, scrollToCurrentSection],
  )

  useEffect(() => {
    const prevIsPlaying = prevIsPlayingRef.current
    const prevSectionId = prevSectionIdRef.current
    const startedPlaying = isPlaying && !prevIsPlaying
    const sectionChangedWhilePlaying =
      isPlaying && currentSectionId && prevSectionId !== currentSectionId

    if ((startedPlaying || sectionChangedWhilePlaying) && currentSectionId) {
      if (startedPlaying) {
        scrollToCurrentSection(currentSectionId)
      } else {
        scheduleScrollToSection(currentSectionId, 1200)
      }
    }

    prevIsPlayingRef.current = isPlaying
    prevSectionIdRef.current = currentSectionId ?? null
  }, [currentSectionId, isPlaying, scheduleScrollToSection, scrollToCurrentSection])

  const currentSection = sections[currentSectionIndex] ?? null
  const activeHighlights = useMemo(
    () => new Set(currentSection?.highlights ?? []),
    [currentSection],
  )

  // Mapowanie highlight keys do zakresów słów w transkrypcji (całe fragmenty zdań)
  const highlightKeyToWordRanges = useMemo(() => {
    const map = new Map<
      string,
      Array<{ sectionId: string; startIndex: number; endIndex: number }>
    >()

    sections.forEach((section) => {
      // Użyj tej samej metody liczenia słów co w createNarrationWordEntries
      const words = section.script
        .split(/\s+/)
        .map((word) => word.trim())
        .filter(Boolean)

      // Dla każdego highlight key znajdź odpowiadający mu fragment zdania
      section.highlights.forEach((highlightKey) => {
        let phraseToFind: string | null = null

        // Znajdź fragment zdania odpowiadający highlightKey
        switch (highlightKey) {
          case 'loanAmount':
            // W sekcji basics: "Kwota kredytu: [wartość]"
            if (section.id === 'basics') {
              phraseToFind = `Kwota kredytu: ${formatCurrencyNoCents(offer.loanAmount)}`
            } else {
              phraseToFind = `Kwota kredytu: ${formatCurrencyNoCents(offer.loanAmount)}`
            }
            break
          case 'loanPeriod':
            // W sekcji basics: "na [wartość]"
            if (section.id === 'basics') {
              phraseToFind = `na ${formatLoanTermYears(offer.loanPeriodYears)}`
            } else {
              phraseToFind = `spłacana przez ${formatLoanTermYears(offer.loanPeriodYears)}`
            }
            break
          case 'monthlyPayment':
            // W sekcji quickSummary: "Miesięczna rata wynosi [wartość]"
            // W sekcji basics: "Miesięczna rata: [wartość]"
            // W sekcji summary: "Miesięczna rata: [wartość]"
            if (section.id === 'quickSummary') {
              phraseToFind = `Miesięczna rata wynosi ${formatCurrencyNoCents(offer.monthlyPayment)}`
            } else if (section.id === 'basics') {
              phraseToFind = `Miesięczna rata: ${formatCurrencyNoCents(offer.monthlyPayment)}`
            } else if (section.id === 'summary') {
              phraseToFind = `Miesięczna rata: ${formatCurrencyNoCents(offer.monthlyPayment)}`
            }
            break
          case 'interestRate':
            // W sekcji interest: "Oprocentowanie nominalne wynosi [wartość]"
            phraseToFind = `Oprocentowanie nominalne wynosi ${formatPercentForNarration(offer.interestRate)}`
            break
          case 'apr':
            // W sekcji interest: "Rzeczywisty koszt kredytu, czyli RRSO, wynosi [wartość]"
            if (section.id === 'interest') {
              phraseToFind = `Rzeczywisty koszt kredytu, czyli RRSO, wynosi ${formatPercentForNarration(offer.apr)}`
            } else {
              phraseToFind = `RRSO wynosi ${formatPercentForNarration(offer.apr)}`
            }
            break
          case 'totalInterest':
            // "co oznacza około [wartość] odsetek"
            if (offer.totalInterest) {
              phraseToFind = `co oznacza około ${formatCurrencyNoCents(offer.totalInterest)} odsetek`
            }
            break
          case 'commission':
            // W sekcji costs: "Prowizja banku przy uruchomieniu kredytu wynosi [wartość]"
            phraseToFind = `Prowizja banku przy uruchomieniu kredytu wynosi ${formatCurrencyNoCents(offer.commission)}`
            break
          case 'insurance':
            // ", a ubezpieczenia wynoszą [wartość]"
            if (offer.insurance) {
              phraseToFind = `a ubezpieczenia wynoszą ${formatCurrencyNoCents(offer.insurance)}`
            }
            break
          case 'totalCost':
            // W sekcji costs: "Całkowity koszt kredytu wraz z wszystkimi opłatami to [wartość]"
            // W sekcji summary: "daje całkowity koszt [wartość]"
            if (section.id === 'costs') {
              phraseToFind = `Całkowity koszt kredytu wraz z wszystkimi opłatami to ${formatCurrencyNoCents(offer.totalCost)}`
            } else if (section.id === 'summary') {
              phraseToFind = `daje całkowity koszt ${formatCurrencyNoCents(offer.totalCost)}`
            }
            break
          case 'benefits':
            // "możesz liczyć na dodatkowe korzyści"
            phraseToFind = 'możesz liczyć na dodatkowe korzyści'
            break
          case 'affordability':
            // "Rata stanowi [wartość] Twojego dochodu"
            if (offer.analysis && offer.monthlyIncome) {
              phraseToFind = `Rata stanowi ${formatPercentForNarration(offer.analysis.affordability.dtiPercentage)} Twojego dochodu`
            }
            break
          case 'affordabilityLevel':
            // W quickSummary: "co oznacza [poziom] zdolność kredytową"
            // W affordability: "co oznacza [poziom] zdolność kredytową"
            if (offer.analysis) {
              const levelText = {
                excellent: 'doskonała',
                good: 'dobra',
                moderate: 'umiarkowana',
                risky: 'ryzykowna',
                critical: 'krytyczna',
              }[offer.analysis.affordability.affordabilityLevel]
              if (section.id === 'quickSummary') {
                phraseToFind = `co oznacza ${levelText} zdolność kredytową`
              } else {
                phraseToFind = `co oznacza ${levelText} zdolność kredytową`
              }
            }
            break
          case 'remainingIncome':
            // "Po spłacie raty pozostanie Ci około [wartość] miesięcznie"
            if (offer.analysis) {
              phraseToFind = `Po spłacie raty pozostanie Ci około ${formatCurrencyNoCents(offer.analysis.affordability.remainingIncome)} miesięcznie`
            }
            break
          case 'rank':
          case 'comparison':
            // W quickSummary: "To jedna z najlepszych ofert" lub "To X. najlepsza oferta" lub "Ta oferta zajmuje X. miejsce"
            // W comparison: "Ta oferta zajmuje X. miejsce"
            if (offer.analysis) {
              if (section.id === 'quickSummary') {
                if (offer.analysis.comparison.isTopOffer) {
                  phraseToFind = `To jedna z najlepszych ofert spośród ${offer.analysis.comparison.totalOffers} dostępnych`
                } else if (offer.analysis.comparison.rank <= 3) {
                  phraseToFind = `To ${offer.analysis.comparison.rank}. najlepsza oferta spośród ${offer.analysis.comparison.totalOffers} dostępnych`
                } else {
                  phraseToFind = `Ta oferta zajmuje ${offer.analysis.comparison.rank}. miejsce na ${offer.analysis.comparison.totalOffers} dostępnych ofert`
                }
              } else {
                if (offer.analysis.comparison.isTopOffer) {
                  phraseToFind = `Ta oferta znajduje się wśród ${offer.analysis.comparison.rank} najlepszych`
                } else {
                  phraseToFind = `Ta oferta zajmuje ${offer.analysis.comparison.rank}. miejsce`
                }
              }
            }
            break
          case 'risk':
          case 'riskScenarios':
            // "Kredyt ze zmiennym oprocentowaniem oznacza [poziom] ryzyko" lub "Kredyt ze stałym oprocentowaniem zapewnia stabilność"
            if (offer.analysis) {
              if (offer.analysis.risks.hasVariableRate) {
                const riskText = {
                  low: 'niskie',
                  medium: 'średnie',
                  high: 'wysokie',
                }[offer.analysis.risks.interestRateRisk]
                phraseToFind = `Kredyt ze zmiennym oprocentowaniem oznacza ${riskText} ryzyko`
              } else {
                phraseToFind = 'Kredyt ze stałym oprocentowaniem zapewnia stabilność raty'
              }
            }
            break
          case 'score':
          case 'overall':
            // "Ogólna ocena dopasowania: [score] na 100 punktów"
            if (offer.analysis) {
              phraseToFind = `Ogólna ocena dopasowania: ${offer.analysis.overall.score} na 100 punktów`
            }
            break
          case 'matchLevel':
            // "co oznacza że oferta pasuje [poziom] do Twojej sytuacji finansowej"
            if (offer.analysis) {
              const levelText = {
                excellent: 'bardzo dobrze',
                good: 'dobrze',
                moderate: 'umiarkowanie',
                poor: 'słabo',
              }[offer.analysis.overall.matchLevel]
              phraseToFind = `co oznacza że oferta pasuje ${levelText} do Twojej sytuacji finansowej`
            }
            break
          case 'firstPayment':
            // "W pierwszym roku rata wynosi [wartość] miesięcznie"
            if (offer.paymentSchedule && offer.paymentSchedule.length > 0) {
              const firstPayment = offer.paymentSchedule[0]
              if (firstPayment) {
                phraseToFind = `W pierwszym roku rata wynosi ${formatCurrencyNoCents(firstPayment.payment)} miesięcznie`
              }
            }
            break
          case 'firstPrincipal':
            // "z czego około [wartość] to spłata kapitału"
            if (offer.paymentSchedule && offer.paymentSchedule.length > 0) {
              const firstPayment = offer.paymentSchedule[0]
              if (firstPayment) {
                phraseToFind = `z czego około ${formatCurrencyNoCents(firstPayment.principal)} to spłata kapitału`
              }
            }
            break
          case 'firstInterest':
            // "a [wartość] to odsetki"
            if (offer.paymentSchedule && offer.paymentSchedule.length > 0) {
              const firstPayment = offer.paymentSchedule[0]
              if (firstPayment) {
                phraseToFind = `a ${formatCurrencyNoCents(firstPayment.interest)} to odsetki`
              }
            }
            break
          case 'midPayment':
            // "W połowie okresu kredytowania rata pozostaje taka sama"
            if (offer.paymentSchedule && offer.paymentSchedule.length > 0) {
              phraseToFind = 'W połowie okresu kredytowania rata pozostaje taka sama'
            }
            break
          case 'lastPayment':
            // "W ostatnim roku rata wynosi [wartość]"
            if (offer.paymentSchedule && offer.paymentSchedule.length > 0) {
              const lastYear = offer.paymentSchedule.slice(-12)
              const lastPayment = lastYear[lastYear.length - 1]
              if (lastPayment) {
                phraseToFind = `W ostatnim roku rata wynosi ${formatCurrencyNoCents(lastPayment.payment)}`
              }
            }
            break
          case 'advantages':
            // "Zalety tej oferty to:"
            if (offer.advantages && offer.advantages.length > 0) {
              phraseToFind = 'Zalety tej oferty to'
            }
            break
          case 'disadvantages':
            // "Wady to:"
            if (offer.disadvantages && offer.disadvantages.length > 0) {
              phraseToFind = 'Wady to'
            }
            break
        }

        if (!phraseToFind) return

        // Znajdź pozycję frazy w transkrypcji - użyj tej samej metody
        const phraseWords = phraseToFind
          .split(/\s+/)
          .map((word) => word.trim())
          .filter(Boolean)
          .map((word) => word.replace(/[.,!?;:]+$/g, '').toLowerCase())

        if (phraseWords.length === 0) return

        // Normalizuj słowa w transkrypcji (bez znaków interpunkcyjnych)
        const normalizedWords = words.map((word) => word.replace(/[.,!?;:]+$/g, '').toLowerCase())

        // Znajdź wystąpienie frazy w słowach - dokładne dopasowanie
        for (let i = 0; i <= normalizedWords.length - phraseWords.length; i++) {
          const match = phraseWords.every((pw, idx) => {
            const normalizedWord = normalizedWords[i + idx] ?? ''
            return normalizedWord === pw
          })

          if (match) {
            const ranges = map.get(highlightKey) ?? []
            ranges.push({
              sectionId: section.id,
              startIndex: i,
              endIndex: i + phraseWords.length - 1,
            })
            map.set(highlightKey, ranges)
            break // Znajdź tylko pierwsze wystąpienie w sekcji
          }
        }
      })
    })

    return map
  }, [sections, offer])

  // Funkcja sprawdzająca, czy aktualnie czytane słowo odpowiada danemu highlightKey
  const isHighlightKeyActive = useCallback(
    (highlightKey: string, itemValue?: string, sectionId?: string): boolean => {
      if (!activeWordEntry || !isPlaying) return false

      // Dla sekcji benefits sprawdzamy pozycję słowa w transkrypcji względem korzyści
      if (sectionId === 'benefits' && itemValue && activeWordEntry.sectionId === 'benefits') {
        const currentSection = sections.find((s) => s.id === 'benefits')
        if (!currentSection) return false

        const script = currentSection.script
        const scriptWords = script
          .split(/\s+/)
          .map((word) => word.trim())
          .filter(Boolean)

        // Znajdź pozycję korzyści w transkrypcji
        const benefitWords = itemValue
          .split(/\s+/)
          .map((word) => word.trim())
          .filter(Boolean)
          .map((word) => word.replace(/[.,!?;:]+$/g, '').toLowerCase())

        if (benefitWords.length === 0) return false

        // Znajdź gdzie zaczyna się ta korzyść w transkrypcji
        let benefitStartIndex = -1
        for (let i = 0; i <= scriptWords.length - benefitWords.length; i++) {
          const match = benefitWords.slice(0, 3).every((bw, idx) => {
            const sw = scriptWords[i + idx]?.replace(/[.,!?;:]+$/g, '').toLowerCase() ?? ''
            return sw === bw
          })
          if (match) {
            benefitStartIndex = i
            break
          }
        }

        if (benefitStartIndex === -1) return false

        // Sprawdź czy aktualnie czytane słowo jest w zakresie tej korzyści
        const currentWordIndex = activeWordEntry.wordIndex
        const benefitEndIndex = benefitStartIndex + benefitWords.length - 1

        return currentWordIndex >= benefitStartIndex && currentWordIndex <= benefitEndIndex
      }

      // Dla sekcji prosCons sprawdzamy pozycję słowa w transkrypcji względem zalet/wad
      if (sectionId === 'prosCons' && itemValue && activeWordEntry.sectionId === 'prosCons') {
        const currentSection = sections.find((s) => s.id === 'prosCons')
        if (!currentSection) return false

        const script = currentSection.script
        const scriptWords = script
          .split(/\s+/)
          .map((word) => word.trim())
          .filter(Boolean)

        // Znajdź pozycję zalety/wady w transkrypcji
        const prosConsWords = itemValue
          .split(/\s+/)
          .map((word) => word.trim())
          .filter(Boolean)
          .map((word) => word.replace(/[.,!?;:]+$/g, '').toLowerCase())

        if (prosConsWords.length === 0) return false

        // Znajdź gdzie zaczyna się ta zaleta/wada w transkrypcji
        let prosConsStartIndex = -1
        for (let i = 0; i <= scriptWords.length - prosConsWords.length; i++) {
          // Sprawdź dopasowanie pierwszych 3-4 słów dla lepszej dokładności
          const wordsToCheck = Math.min(4, prosConsWords.length)
          const match = prosConsWords.slice(0, wordsToCheck).every((pcw, idx) => {
            const sw = scriptWords[i + idx]?.replace(/[.,!?;:]+$/g, '').toLowerCase() ?? ''
            return sw === pcw
          })
          if (match) {
            prosConsStartIndex = i
            break
          }
        }

        if (prosConsStartIndex === -1) return false

        // Sprawdź czy aktualnie czytane słowo jest w zakresie tej zalety/wady
        const currentWordIndex = activeWordEntry.wordIndex
        const prosConsEndIndex = prosConsStartIndex + prosConsWords.length - 1

        return currentWordIndex >= prosConsStartIndex && currentWordIndex <= prosConsEndIndex
      }

      const ranges = highlightKeyToWordRanges.get(highlightKey) ?? []
      const matchingRange = ranges.find((range) => range.sectionId === activeWordEntry.sectionId)

      if (!matchingRange) return false

      // wordIndex w activeWordEntry odpowiada pozycji w tablicy słów po filtrowaniu
      const currentWordIndex = activeWordEntry.wordIndex

      return (
        currentWordIndex >= matchingRange.startIndex && currentWordIndex <= matchingRange.endIndex
      )
    },
    [activeWordEntry, isPlaying, highlightKeyToWordRanges, sections],
  )
  const createHighlightedNodes = useCallback(
    (sectionId: string, script: string) => {
      const entries = sectionWordEntriesMap.get(sectionId) ?? []
      const tokens = script.match(/\S+|\s+/g) ?? []
      let wordCounter = 0
      let whitespaceCounter = 0

      return tokens.map((token) => {
        if (/^\s+$/.test(token)) {
          const whitespaceKey = `${sectionId}-space-${whitespaceCounter}`
          whitespaceCounter += 1
          return <Fragment key={whitespaceKey}>{token}</Fragment>
        }

        const entry = entries[wordCounter]
        const isActive =
          entry &&
          activeWordEntry?.sectionId === entry.sectionId &&
          activeWordEntry.wordIndex === entry.wordIndex

        const key = entry
          ? `${entry.sectionId}-${entry.wordIndex}`
          : `${sectionId}-word-${wordCounter}`
        const node = (
          <ScriptWord
            key={key}
            data-word-index={entry?.wordIndex ?? wordCounter}
            data-section-id={entry?.sectionId ?? sectionId}
            data-active={isActive ? 'true' : 'false'}
            tabIndex={0}
            role="button"
            onClick={() => {
              if (entry) {
                onWordSelect?.(entry.globalIndex)
              }
            }}
            onKeyDown={(event) => {
              if (!entry) return
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onWordSelect?.(entry.globalIndex)
              }
            }}
          >
            {token}
          </ScriptWord>
        )

        wordCounter += 1
        return node
      })
    },
    [activeWordEntry, onWordSelect, sectionWordEntriesMap],
  )

  const listDescriptionNodes = useMemo(
    () => displaySteps.map((step) => createHighlightedNodes(step.id, step.description)),
    [createHighlightedNodes, displaySteps],
  )

  const highlightedScriptNodes = useMemo(() => {
    if (!currentSection) return null
    return createHighlightedNodes(currentSection.id, currentSection.script)
  }, [createHighlightedNodes, currentSection])

  const latestOnSectionSelectRef = useRef(onSectionSelect)

  useEffect(() => {
    latestOnSectionSelectRef.current = onSectionSelect
  }, [onSectionSelect])

  useEffect(() => {
    if (currentSection?.id) {
      latestOnSectionSelectRef.current?.(currentSection.id)
    }
  }, [currentSection?.id])

  const handleCta = useCallback(() => {
    cta?.onActivate()
  }, [cta])

  if (isListVariant) {
    return (
      <ListVariantList className={clsx(className)} data-offer-id={offer.bankId}>
        {displaySteps.map((step, index) => {
          const isActive = index === currentSectionIndex
          const sectionEntries = sectionWordEntriesMap.get(step.id) ?? []
          const lastEntry =
            sectionEntries.length > 0 ? sectionEntries[sectionEntries.length - 1] : null
          const lastGlobalIndex = lastEntry ? lastEntry.globalIndex : null
          const isCompleted =
            index < currentSectionIndex ||
            (lastGlobalIndex !== null &&
              activeWordEntry?.globalIndex !== undefined &&
              activeWordEntry.globalIndex >= lastGlobalIndex)
          const canPlaySection = sectionEntries.length > 0
          const isSectionPlaying = isPlaying && activeWordEntry?.sectionId === step.id && isActive
          const shouldShowReplay = isCompleted && !isSectionPlaying
          const playButtonLabel = isSectionPlaying
            ? 'Wstrzymaj narrację sekcji'
            : shouldShowReplay
              ? 'Odtwórz ponownie narrację sekcji'
              : 'Odtwórz narrację sekcji'
          const playButtonIcon = isSectionPlaying ? (
            <MdPause size={16} />
          ) : shouldShowReplay ? (
            <MdReplay size={18} />
          ) : (
            <MdPlayArrow size={16} />
          )
          return (
            <ListVariantItem key={step.id} ref={registerSectionElement(step.id)}>
              <ListVariantInteractive aria-pressed={isActive} role="presentation">
                <ListVariantCard
                  className={clsx({
                    'border-sky-200 bg-sky-50 shadow-md shadow-sky-200/50': isActive,
                    'border-emerald-200 bg-emerald-50 shadow-emerald-200/50 shadow-md': isCompleted,
                  })}
                >
                  <ListVariantHeader>
                    <ListVariantHeaderContent>
                      <ListVariantBadge
                        className={clsx({
                          'border-sky-300 bg-white text-sky-700': isActive,
                          'border-emerald-300 bg-emerald-500 text-white': isCompleted,
                        })}
                      >
                        {index + 1}
                      </ListVariantBadge>
                      <ListVariantTitleWrapper>
                        <ListVariantTitle
                          className={clsx({
                            'text-sky-900': isActive,
                            'text-emerald-900': isCompleted,
                          })}
                        >
                          {step.title}
                        </ListVariantTitle>
                        <ListVariantDescription
                          className={clsx({
                            'text-sky-700': isActive,
                            'text-emerald-700': isCompleted,
                            'text-slate-600': !isActive && !isCompleted,
                          })}
                        >
                          {listDescriptionNodes[index]}
                        </ListVariantDescription>
                      </ListVariantTitleWrapper>
                    </ListVariantHeaderContent>
                    <ListVariantPlayButton
                      type="button"
                      aria-label={`${playButtonLabel}: ${step.title}`}
                      disabled={!canPlaySection}
                      onClick={() => {
                        if (!canPlaySection || sectionEntries.length === 0) return
                        const firstEntry = sectionEntries[0]
                        if (!firstEntry) return
                        const isCurrentSection = activeWordEntry?.sectionId === step.id
                        const shouldRestart = !isCurrentSection || shouldShowReplay

                        if (shouldRestart) {
                          onSectionSelect?.(step.id, { autoPlay: true })
                          onWordSelect?.(firstEntry.globalIndex, { autoPlay: true })
                          return
                        }

                        if (!isActive) {
                          onSectionSelect?.(step.id)
                        }
                        onPlaybackToggle?.(!isPlaying)
                      }}
                      data-active={isActive ? 'true' : 'false'}
                      data-playing={isSectionPlaying ? 'true' : 'false'}
                      data-completed={isCompleted ? 'true' : 'false'}
                    >
                      <ListVariantPlayIcon aria-hidden="true">{playButtonIcon}</ListVariantPlayIcon>
                    </ListVariantPlayButton>
                  </ListVariantHeader>
                </ListVariantCard>
                {/* Wykres harmonogramu spłat dla sekcji schedule */}
                {step.id === 'schedule' &&
                  offer.paymentSchedule &&
                  offer.paymentSchedule.length > 0 && (
                    <ScheduleChartWrapper>
                      <PaymentScheduleChart
                        schedule={offer.paymentSchedule}
                        loanTermMonths={offer.loanTermMonths}
                      />
                    </ScheduleChartWrapper>
                  )}
                {/* Sekcja wad i zalet - specjalne renderowanie */}
                {step.id === 'prosCons' ? (
                  <ProsConsComparisonGrid>
                    {offer.advantages && offer.advantages.length > 0 && (
                      <ProsConsAdvantagesSection>
                        <ProsConsComparisonHeader className="border-green-200 bg-linear-to-r from-green-50 to-emerald-50">
                          <ProsConsComparisonIcon className="bg-green-100 text-green-600">
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
                          </ProsConsComparisonIcon>
                          <ProsConsComparisonTitle className="text-green-800">
                            ZALETY
                          </ProsConsComparisonTitle>
                        </ProsConsComparisonHeader>
                        <ProsConsComparisonList>
                          {filterRealBenefits(offer.advantages).map((advantage: string) => {
                            const isItemActive = isHighlightKeyActive(
                              'advantages',
                              advantage,
                              'prosCons',
                            )
                            return (
                              <ProsConsComparisonItem
                                key={advantage}
                                className={clsx({
                                  'scale-[1.02] transition-all duration-200': isItemActive,
                                })}
                              >
                                <ProsConsComparisonBullet
                                  className={clsx({
                                    'bg-green-100 text-green-600': !isItemActive,
                                    'scale-110 bg-green-200 text-green-700': isItemActive,
                                  })}
                                >
                                  +
                                </ProsConsComparisonBullet>
                                <ProsConsComparisonText
                                  className={clsx({
                                    'text-green-900': !isItemActive,
                                    'font-semibold text-green-950': isItemActive,
                                  })}
                                >
                                  {advantage}
                                </ProsConsComparisonText>
                              </ProsConsComparisonItem>
                            )
                          })}
                        </ProsConsComparisonList>
                      </ProsConsAdvantagesSection>
                    )}
                    {offer.disadvantages && offer.disadvantages.length > 0 && (
                      <ProsConsDisadvantagesSection>
                        <ProsConsComparisonHeader className="border-red-200 bg-linear-to-r from-red-50 to-orange-50">
                          <ProsConsComparisonIcon className="bg-red-100 text-red-600">
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
                          </ProsConsComparisonIcon>
                          <ProsConsComparisonTitle className="text-red-800">
                            WADY
                          </ProsConsComparisonTitle>
                        </ProsConsComparisonHeader>
                        <ProsConsComparisonList>
                          {filterRealBenefits(offer.disadvantages).map((disadvantage: string) => {
                            const isItemActive = isHighlightKeyActive(
                              'disadvantages',
                              disadvantage,
                              'prosCons',
                            )
                            return (
                              <ProsConsComparisonItem
                                key={disadvantage}
                                className={clsx({
                                  'scale-[1.02] transition-all duration-200': isItemActive,
                                })}
                              >
                                <ProsConsComparisonBullet
                                  className={clsx({
                                    'bg-red-100 text-red-600': !isItemActive,
                                    'scale-110 bg-red-200 text-red-700': isItemActive,
                                  })}
                                >
                                  −
                                </ProsConsComparisonBullet>
                                <ProsConsComparisonText
                                  className={clsx({
                                    'text-red-900': !isItemActive,
                                    'font-semibold text-red-950': isItemActive,
                                  })}
                                >
                                  {disadvantage}
                                </ProsConsComparisonText>
                              </ProsConsComparisonItem>
                            )
                          })}
                        </ProsConsComparisonList>
                      </ProsConsDisadvantagesSection>
                    )}
                  </ProsConsComparisonGrid>
                ) : (
                  step.items.length > 0 && (
                    <ListVariantProperties
                      className={clsx({
                        'grid-cols-1 md:grid-cols-3':
                          step.id !== 'benefits' &&
                          step.id !== 'summary' &&
                          step.id !== 'schedule' &&
                          step.id !== 'prosCons',
                        'grid-cols-1 md:grid-cols-2': step.id === 'summary',
                        'grid-cols-1 md:grid-cols-5': step.id === 'schedule',
                        'flex flex-col gap-2': step.id === 'benefits',
                      })}
                    >
                      {step.items.map((item) => {
                        const isItemActive = isHighlightKeyActive(
                          item.highlightKey,
                          item.value,
                          step.id,
                        )
                        const PropertyComponent = getPropertyComponentForSection(step.id)
                        return (
                          <PropertyComponent
                            key={`${step.id}-${item.label}`}
                            className={clsx({
                              'border-sky-200 bg-sky-50 text-sky-900 shadow-sky-100': isActive,
                              'border-emerald-200 bg-emerald-50 text-emerald-900 shadow-emerald-100':
                                isCompleted,
                              'z-10 scale-110 border-sky-400 bg-sky-100 shadow-sky-200/50 shadow-xl ring-2 ring-sky-300/50':
                                isItemActive,
                              'opacity-60': !isItemActive && isActive && isPlaying,
                            })}
                            onClick={() => {
                              if (!canPlaySection || sectionEntries.length === 0) return
                              const firstEntry = sectionEntries[0]
                              if (firstEntry) {
                                onSectionSelect?.(step.id)
                                onWordSelect?.(firstEntry.globalIndex)
                              }
                            }}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(event) => {
                              if (!canPlaySection || sectionEntries.length === 0) return
                              if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault()
                                const firstEntry = sectionEntries[0]
                                if (firstEntry) {
                                  onSectionSelect?.(step.id)
                                  onWordSelect?.(firstEntry.globalIndex)
                                }
                              }
                            }}
                          >
                            {renderPropertyContent(step.id, item)}
                          </PropertyComponent>
                        )
                      })}
                    </ListVariantProperties>
                  )
                )}
              </ListVariantInteractive>
            </ListVariantItem>
          )
        })}
      </ListVariantList>
    )
  }

  const lastIndex = Math.max(sections.length - 1, 0)
  const isFirst = currentSectionIndex === 0
  const isLast = currentSectionIndex >= lastIndex

  return (
    <NarrationWrapper
      className={clsx(className, isCompact && 'lg:grid-cols-1', isCompact && 'gap-6', 'relative')}
      data-offer-id={offer.bankId}
    >
      <NarrationAside
        className={clsx(
          isCompact
            ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10'
            : 'bg-slate-900 text-white shadow-slate-900/20 shadow-xl',
        )}
      >
        <AsideHeader>
          <DemoBadge>Podgląd narracji</DemoBadge>
          <AsideHeading>{offer.bankName}</AsideHeading>
          <AsideSubtitle>Kluczowe parametry kredytu</AsideSubtitle>
        </AsideHeader>

        <TimelineList>
          {sections.map((section, index) => {
            const isActive = index === currentSectionIndex
            const isCompleted = index < currentSectionIndex
            return (
              <TimelineItem key={section.id}>
                <TimelineButton
                  type="button"
                  disabled
                  className={clsx({
                    'translate-x-1 border-sky-300/60 bg-sky-400/20 shadow-lg shadow-sky-500/20':
                      isActive,
                    'border-emerald-300/60 bg-emerald-400/20': isCompleted && !isActive,
                  })}
                >
                  <TimelineItemContent>
                    <TimelineStepBadge
                      className={clsx({
                        'bg-white text-slate-900': isActive,
                        'bg-white/10 text-white': !isActive,
                      })}
                    >
                      {index + 1}
                    </TimelineStepBadge>
                    <TimelineTextWrapper>
                      <TimelineTitle>{section.title}</TimelineTitle>
                      {isActive && (
                        <TimelineExcerpt>{section.script.slice(0, 80)}…</TimelineExcerpt>
                      )}
                    </TimelineTextWrapper>
                  </TimelineItemContent>
                </TimelineButton>
              </TimelineItem>
            )
          })}
        </TimelineList>

        <Controls>
          <PrevButton type="button" disabled={isFirst}>
            Poprzedni
          </PrevButton>
          <PlayButton
            type="button"
            disabled={wordEntries.length === 0}
            data-playing={isPlaying ? 'true' : 'false'}
            onClick={() => {
              if (!wordEntries.length) return
              onPlaybackToggle?.(!isPlaying)
            }}
          >
            {isPlaying ? 'Pauza' : 'Odtwórz'}
          </PlayButton>
          <NextButton type="button" disabled={isLast || sections.length === 0}>
            Następny
          </NextButton>
        </Controls>

        <ScriptPanel ref={scriptPanelRef} aria-live="polite">
          {currentSection ? highlightedScriptNodes : 'Brak narracji do wyświetlenia.'}
        </ScriptPanel>

        {cta && (
          <CTAWrapper>
            <CTAButton type="button" onClick={handleCta}>
              {cta.label}
            </CTAButton>
          </CTAWrapper>
        )}
      </NarrationAside>

      <NarrationDetails className={clsx(isCompact && 'grid-cols-1 md:grid-cols-2')}>
        {detailCards.map((card) => (
          <DetailCard
            key={card.label}
            label={card.label}
            value={card.value}
            highlightKey={card.highlightKey}
            isActive={currentSection ? activeHighlights.has(card.highlightKey) : false}
            renderContent={card.renderContent}
          />
        ))}
      </NarrationDetails>
    </NarrationWrapper>
  )
}

function DetailCard({ label, value, highlightKey, isActive, renderContent }: DetailCardProps) {
  return (
    <DetailCardContainer
      data-highlight-key={highlightKey}
      className={clsx({
        'border-sky-400 shadow-lg shadow-sky-200/60 ring-2 ring-sky-200': isActive,
      })}
    >
      <DetailCardContent>
        <DetailLabel>{label}</DetailLabel>
        {value && <DetailValue>{value}</DetailValue>}
        {renderContent?.()}
      </DetailCardContent>
      {isActive && <HighlightOverlay />}
    </DetailCardContainer>
  )
}

const NarrationWrapper = tw.section`grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]`
const NarrationAside = tw.aside`rounded-3xl p-6 text-white`
const AsideHeader = tw.header`flex flex-col gap-2`
const DemoBadge = tw.span`inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80`
const AsideHeading = tw.h2`text-2xl font-semibold text-white sm:text-3xl`
const AsideSubtitle = tw.p`text-sm text-white/70`
const TimelineList = tw.ol`mt-6 flex flex-col gap-3`
const TimelineItem = tw.li`list-none`
const TimelineButton = tw.button`w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:cursor-default cursor-pointer`
const TimelineItemContent = tw.div`flex items-center gap-3`
const TimelineStepBadge = tw.span`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-sm font-semibold`
const TimelineTextWrapper = tw.div`flex flex-col`
const TimelineTitle = tw.span`text-sm font-semibold text-white`
const TimelineExcerpt = tw.span`text-xs text-white/70`
const Controls = tw.div`mt-6 grid grid-cols-3 gap-3`
const PrevButton = tw.button`rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer`
const PlayButton = tw.button`rounded-full bg-white px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:text-slate-400 cursor-pointer`
const NextButton = tw.button`rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer`
const ScriptPanel = tw.div`mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm leading-relaxed text-white/80 whitespace-pre-wrap`
const ScriptWord = tw.span`relative whitespace-normal wrap-break-word rounded-sm px-0 transition-colors duration-150 data-[active='true']:bg-emerald-500/35`
const CTAWrapper = tw.div`mt-6`
const CTAButton = tw.button`flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-emerald-400 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 cursor-pointer`
const NarrationDetails = tw.main`grid gap-4 sm:grid-cols-2 xl:grid-cols-3`
const DetailCardContainer = tw.article`relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200`
const DetailCardContent = tw.div`flex flex-col gap-3`
const DetailLabel = tw.span`text-sm font-medium text-slate-500`
const DetailValue = tw.strong`text-2xl font-semibold text-slate-900`
const HighlightOverlay = tw.span`pointer-events-none absolute inset-0 rounded-3xl border border-sky-400/60 bg-sky-100/20`
const BenefitsList = tw.ul`list-disc pl-4 text-sm text-slate-600 space-y-1`
const MoreBenefitsInfo = tw.span`text-xs text-slate-500`
const EmptyBenefits = tw.span`text-sm text-slate-500`

const ListVariantList = tw.ol`mt-4 flex flex-col gap-4`
const ListVariantItem = tw.li`list-none`
const ListVariantInteractive = tw.div`flex flex-col gap-2 rounded-2xl transition`
const ListVariantCard = tw.div`rounded-2xl border border-slate-100 bg-slate-50/80 p-5 shadow-sm transition`
const ListVariantHeader = tw.div`flex items-start justify-between gap-3`
const ListVariantHeaderContent = tw.div`flex items-start gap-3`
const ListVariantBadge = tw.span`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700`
const ListVariantTitleWrapper = tw.div`flex flex-col gap-1`
const ListVariantTitle = tw.span`text-base font-semibold text-slate-900`
const ListVariantDescription = tw.span`text-sm leading-relaxed text-slate-600 whitespace-pre-wrap`
const ListVariantProperties = tw.ul`mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 px-4`
const ListVariantProperty = tw.li`flex flex-col gap-2 rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`
const ListVariantPropertyHeader = tw.div`flex items-center gap-2`
const ListVariantPropertyIcon = tw.div`shrink-0 flex items-center justify-center`
const ListVariantPropertyLabel = tw.span`text-xs font-semibold text-gray-600 uppercase tracking-wide`
const ListVariantPropertyValue = tw.span`text-xl font-bold text-gray-900`

// Basic section (Podstawowe parametry) - styl jak KeyMetricCard
const BasicPropertyCard = tw.li`flex items-start gap-3 rounded-xl border-2 border-gray-200 bg-white p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5`
const BasicPropertyIconWrapper = tw.div`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 shrink-0 transition-colors duration-200`
const BasicPropertyContent = tw.div`flex flex-col gap-1 flex-1 min-w-0`
const BasicPropertyLabel = tw.span`text-xs font-semibold text-gray-600 uppercase tracking-wide`
const BasicPropertyValue = tw.span`text-2xl font-bold text-gray-900`

// Interest section (Oprocentowanie) - standardowy styl z ikonami w tle
const InterestPropertyCard = tw.li`flex items-start gap-3 rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`
const InterestPropertyIconWrapper = tw.div`w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 shrink-0`
const InterestPropertyContent = tw.div`flex flex-col gap-1 flex-1 min-w-0`
const InterestPropertyLabel = tw.span`text-xs font-semibold text-gray-600 uppercase tracking-wide`
const InterestPropertyValue = tw.span`text-xl font-bold text-gray-900`

// Costs section (Koszty i prowizje) - styl jak reszta sekcji
const CostPropertyCard = tw.li`flex items-start gap-3 rounded-xl border-2 border-gray-200 bg-white p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5`
const CostPropertyIconWrapper = tw.div`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 shrink-0 transition-colors duration-200`
const CostPropertyContent = tw.div`flex flex-col gap-1 flex-1 min-w-0`
const CostPropertyLabel = tw.span`text-xs font-semibold text-gray-600 uppercase tracking-wide`
const CostPropertyValue = tw.span`text-2xl font-bold text-gray-900`

// Benefits section (Dodatkowe informacje) - prostszy, bardziej kompaktowy z ikonami gwiazdek
const BenefitPropertyCard = tw.li`flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-all duration-200 hover:shadow-md`
const BenefitPropertyIcon = tw.div`shrink-0 flex items-center justify-center mt-0.5`
const BenefitPropertyValue = tw.span`text-sm text-gray-700 leading-relaxed flex-1`

// Affordability section (Zdolność kredytowa) - zielony styl
const AffordabilityPropertyCard = tw.li`flex items-start gap-3 rounded-xl border-2 border-green-200 bg-linear-to-br from-green-50 to-emerald-50 p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-green-300`
const AffordabilityPropertyIconWrapper = tw.div`w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 shrink-0 transition-colors duration-200`
const AffordabilityPropertyContent = tw.div`flex flex-col gap-1 flex-1 min-w-0`
const AffordabilityPropertyLabel = tw.span`text-xs font-semibold text-green-700 uppercase tracking-wide`
const AffordabilityPropertyValue = tw.span`text-xl font-bold text-green-900`

// Comparison section (Porównanie z innymi ofertami) - niebieski styl
const ComparisonPropertyCard = tw.li`flex items-start gap-3 rounded-xl border-2 border-blue-200 bg-linear-to-br from-blue-50 to-indigo-50 p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-blue-300`
const ComparisonPropertyIconWrapper = tw.div`w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 transition-colors duration-200`
const ComparisonPropertyContent = tw.div`flex flex-col gap-1 flex-1 min-w-0`
const ComparisonPropertyLabel = tw.span`text-xs font-semibold text-blue-700 uppercase tracking-wide`
const ComparisonPropertyValue = tw.span`text-xl font-bold text-blue-900`

// Risks section (Analiza ryzyk) - pomarańczowy/żółty styl
const RisksPropertyCard = tw.li`flex items-start gap-3 rounded-xl border-2 border-orange-200 bg-linear-to-br from-orange-50 to-amber-50 p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-orange-300`
const RisksPropertyIconWrapper = tw.div`w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0 transition-colors duration-200`
const RisksPropertyContent = tw.div`flex flex-col gap-1 flex-1 min-w-0`
const RisksPropertyLabel = tw.span`text-xs font-semibold text-orange-700 uppercase tracking-wide`
const RisksPropertyValue = tw.span`text-xl font-bold text-orange-900`

// Overall section (Ocena dopasowania oferty) - fioletowy/purpurowy styl
const OverallPropertyCard = tw.li`flex items-start gap-3 rounded-xl border-2 border-purple-200 bg-linear-to-br from-purple-50 to-indigo-50 p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-purple-300`
const OverallPropertyIconWrapper = tw.div`w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0 transition-colors duration-200`
const OverallPropertyContent = tw.div`flex flex-col gap-1 flex-1 min-w-0`
const OverallPropertyLabel = tw.span`text-xs font-semibold text-purple-700 uppercase tracking-wide`
const OverallPropertyValue = tw.span`text-xl font-bold text-purple-900`

// Schedule section (Harmonogram spłat) - szary/neutralny styl
const SchedulePropertyCard = tw.li`flex items-start gap-3 rounded-xl border-2 border-gray-200 bg-linear-to-br from-gray-50 to-slate-50 p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-gray-300`
const SchedulePropertyIconWrapper = tw.div`w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 shrink-0 transition-colors duration-200`
const SchedulePropertyContent = tw.div`flex flex-col gap-1 flex-1 min-w-0`
const SchedulePropertyLabel = tw.span`text-xs font-semibold text-gray-700 uppercase tracking-wide`
const SchedulePropertyValue = tw.span`text-xl font-bold text-gray-900`

// ProsCons section (Wady i zalety) - mieszany styl zielony/czerwony
const ProsConsPropertyCard = tw.li`flex items-start gap-3 rounded-xl border-2 border-gray-200 bg-white p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5`
const ProsConsPropertyIcon = tw.div`shrink-0 flex items-center justify-center mt-0.5`
const ProsConsPropertyContent = tw.div`flex flex-col gap-1 flex-1 min-w-0`
const ProsConsPropertyLabel = tw.span`text-xs font-semibold text-gray-600 uppercase tracking-wide`
const ProsConsPropertyValue = tw.span`text-sm text-gray-700 leading-relaxed`

// Schedule chart wrapper
const ScheduleChartWrapper = tw.div`mt-4 mb-4`

// ProsCons section (Wady i zalety) - styl jak w szczegółach
const ProsConsComparisonGrid = tw.div`grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4`
const ProsConsAdvantagesSection = tw.div`bg-white rounded border border-gray-200`
const ProsConsDisadvantagesSection = tw.div`bg-white rounded border border-gray-200`
const ProsConsComparisonHeader = tw.div`px-3 py-2 border-b border-gray-200 flex items-center gap-2 bg-gray-50`
const ProsConsComparisonIcon = tw.div`w-5 h-5 flex items-center justify-center rounded`
const ProsConsComparisonTitle = tw.h5`font-medium text-xs uppercase tracking-wide`
const ProsConsComparisonList = tw.ul`p-3 space-y-2`
const ProsConsComparisonItem = tw.li`flex items-start gap-2`
const ProsConsComparisonBullet = tw.span`w-5 h-5 flex items-center justify-center rounded text-xs font-bold shrink-0`
const ProsConsComparisonText = tw.span`text-sm text-gray-700 flex-1`

// Summary section (Podsumowanie) - styl jak reszta sekcji z ikonami
const SummaryPropertyCard = tw.li`flex items-start gap-3 rounded-xl border-2 border-gray-200 bg-white p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5`
const SummaryPropertyIconWrapper = tw.div`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 shrink-0 transition-colors duration-200`
const SummaryPropertyContent = tw.div`flex flex-col gap-1 flex-1 min-w-0`
const SummaryPropertyLabel = tw.span`text-xs font-semibold text-gray-600 uppercase tracking-wide`
const SummaryPropertyValue = tw.span`text-2xl font-bold text-gray-900`
const ListVariantPlayButton = tw.button`
  inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition
  relative -translate-y-1 translate-x-1
  cursor-pointer hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700
  focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white
  data-[playing='true']:border-sky-600 data-[playing='true']:bg-sky-600 data-[playing='true']:text-white data-[playing='true']:shadow-sky-600/50 data-[playing='true']:shadow-md
  data-[completed='true']:border-emerald-300 data-[completed='true']:text-emerald-700 data-[completed='true']:hover:border-emerald-400 data-[completed='true']:hover:text-emerald-800
  disabled:cursor-not-allowed disabled:opacity-60
`
const ListVariantPlayIcon = tw.span`flex h-4 w-4 items-center justify-center`
