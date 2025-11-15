'use client'

import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Tooltip as ChartTooltip,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
} from 'chart.js'
import clsx from 'clsx'
import {
  createNarrationSections,
  createNarrationWordEntries,
  type NarrationOffer,
  type NarrationWordEntry,
  type NarrationWordSelectionOptions,
  OfferNarration,
} from 'components/calculator/narration/OfferNarration'
import { OfferNarrationStickyBar } from 'components/calculator/narration/OfferNarrationStickyBar'
import { Tooltip } from 'components/common/tooltip'
import { useNarrationSpeech } from 'hooks/useNarrationSpeech'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Chart } from 'react-chartjs-2'
import {
  HiOutlineCurrencyDollar,
  HiOutlineChartBar,
  HiOutlineCalculator,
  HiOutlineCash,
  HiOutlineTag,
  HiOutlineClock,
  HiOutlineDocument,
  HiOutlineShieldCheck,
} from 'react-icons/hi'
import tw from 'tw-tailwind'
import type { BankOffer } from 'types/bank'
import type { CalculatorFormData } from 'types/calculator'
import { formatCurrencyNoCents, formatPercent } from 'utils/calculator'

// Rejestrujemy komponenty Chart.js
ChartJS.register(
  BarController,
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  Filler,
)

export type BankDetailsProps = {
  result: {
    totalInterest: number
    commission: number
    insurance: number
    monthlyPayment: number
    totalCost: number
    interestRate: number
    rrso: number
    loanAmount?: number
    loanPeriod?: number
    bank?: BankOffer
  }
  formData?: CalculatorFormData
}

type BankNarrationState = {
  offer: NarrationOffer
  activeSectionId: string | null
  initialSectionId?: string | null
  requestedSectionId?: string | null
  isActive: boolean
  targetSelector?: string
  onSelectSection: (sectionId: string, options?: NarrationWordSelectionOptions) => void
  onSectionChange?: (sectionId: string, options?: NarrationWordSelectionOptions) => void
  activeWordIndex: number
  activeWordEntry: NarrationWordEntry | null
  onWordIndexChange: (index: number, options?: NarrationWordSelectionOptions) => void
  wordEntries: NarrationWordEntry[]
  isPlaying: boolean
  onPlaybackToggle: (shouldPlay: boolean) => void
  onWordSelect: (globalIndex: number, options?: NarrationWordSelectionOptions) => void
}

const PLAYBACK_INTERVAL_MS = 200

export const BankDetails = ({ result, formData }: BankDetailsProps) => {
  const loanAmount = result.loanAmount ?? formData?.loanAmount ?? 0
  const loanPeriod = result.loanPeriod ?? formData?.loanPeriod ?? 0
  const totalPayments = loanPeriod * 12
  const bank = result.bank
  const bankId = bank?.id ?? null
  const bankName = bank?.name ?? bankId ?? 'Niezidentyfikowany bank'

  const [activeTab, setActiveTab] = useState<'details' | 'narration'>('details')
  const [activeWordIndex, setActiveWordIndex] = useState(0)
  const [isNarrationPlaying, setIsNarrationPlaying] = useState(false)
  const [pendingAutoPlay, setPendingAutoPlay] = useState(false)
  const detailsRef = useRef<HTMLDivElement>(null)

  const hasNarrationData = loanAmount > 0 && loanPeriod > 0 && result.monthlyPayment > 0

  const narrationOffer: NarrationOffer | null = useMemo(() => {
    if (!hasNarrationData) return null

    const benefits: string[] = []

    if (bank?.specialOffers?.length) {
      benefits.push(...bank.specialOffers.filter((value): value is string => Boolean(value)))
    }

    if (bank?.advantages?.length) {
      benefits.push(...bank.advantages.filter((value): value is string => Boolean(value)))
    }

    return {
      bankId: bankId ?? 'unknown-bank',
      bankName,
      loanAmount,
      loanPeriodYears: loanPeriod,
      loanTermMonths: totalPayments,
      monthlyPayment: result.monthlyPayment,
      interestRate: result.interestRate,
      apr: result.rrso,
      commission: result.commission,
      totalCost: result.totalCost,
      totalInterest: result.totalInterest,
      insurance: result.insurance,
      benefits,
    }
  }, [
    bank,
    bankId,
    bankName,
    hasNarrationData,
    loanAmount,
    loanPeriod,
    result.commission,
    result.insurance,
    result.interestRate,
    result.monthlyPayment,
    result.rrso,
    result.totalCost,
    result.totalInterest,
    totalPayments,
  ])

  const narrationSections = useMemo(() => {
    if (!narrationOffer) return []
    return createNarrationSections(narrationOffer, true, false)
  }, [narrationOffer])

  const narrationWordEntries = useMemo(
    () => createNarrationWordEntries(narrationSections),
    [narrationSections],
  )

  const activeWordEntry = narrationWordEntries[activeWordIndex] ?? null
  const activeSectionId = activeWordEntry?.sectionId ?? narrationSections[0]?.id ?? null

  const handleSpeechPlaybackStarted = useCallback(() => {
    setIsNarrationPlaying(true)
  }, [])

  const handleSpeechPlaybackFinished = useCallback(() => {
    setIsNarrationPlaying(false)
  }, [])

  const {
    isSupported: isSpeechSupported,
    playFrom: playNarrationFrom,
    stop: stopNarrationSpeech,
  } = useNarrationSpeech({
    wordEntries: narrationWordEntries,
    voicePreference: 'Zosia',
    locale: 'pl-PL',
    onWordBoundary: setActiveWordIndex,
    onPlaybackFinished: handleSpeechPlaybackFinished,
    onPlaybackStarted: handleSpeechPlaybackStarted,
  })

  const stopNarrationPlayback = useCallback(() => {
    if (isSpeechSupported) {
      stopNarrationSpeech()
    }
    setIsNarrationPlaying(false)
    setPendingAutoPlay(false)
  }, [isSpeechSupported, stopNarrationSpeech])

  const targetSelector = useMemo(() => {
    return bankId ? `#offer-details-${bankId}` : undefined
  }, [bankId])

  const clampWordIndex = useCallback(
    (value: number) => {
      const maxIndex = Math.max(narrationWordEntries.length - 1, 0)
      return narrationWordEntries.length ? Math.min(Math.max(value, 0), maxIndex) : 0
    },
    [narrationWordEntries],
  )

  const handleNarrationSectionChange = useCallback(
    (sectionId: string, options?: NarrationWordSelectionOptions) => {
      const targetIndex = narrationWordEntries.findIndex((entry) => entry.sectionId === sectionId)
      if (targetIndex < 0) return

      const currentSectionId = narrationWordEntries[activeWordIndex]?.sectionId ?? null
      const isDifferentSection = currentSectionId !== sectionId
      if (isDifferentSection || options?.autoPlay) {
        stopNarrationPlayback()
      }

      if (isDifferentSection) {
        setActiveWordIndex(targetIndex)
      } else if (options?.autoPlay) {
        setActiveWordIndex(targetIndex)
      }

      if (options?.autoPlay) {
        setPendingAutoPlay(true)
      }
    },
    [activeWordIndex, narrationWordEntries, stopNarrationPlayback],
  )

  const handleWordIndexChange = useCallback(
    (index: number, options?: NarrationWordSelectionOptions) => {
      stopNarrationPlayback()
      const nextIndex = clampWordIndex(index)

      setActiveWordIndex(nextIndex)
      if (options?.autoPlay) {
        setPendingAutoPlay(true)
      }
    },
    [clampWordIndex, stopNarrationPlayback],
  )

  const handleWordSelect = useCallback(
    (index: number, options?: NarrationWordSelectionOptions) => {
      const nextIndex = clampWordIndex(index)
      if (options?.autoPlay) {
        stopNarrationPlayback()
      }
      setActiveWordIndex(nextIndex)
      if (options?.autoPlay) {
        setPendingAutoPlay(true)
      }
    },
    [clampWordIndex, stopNarrationPlayback],
  )

  const handlePlaybackToggle = useCallback(
    (shouldPlay: boolean) => {
      if (!shouldPlay) {
        stopNarrationPlayback()
        return
      }

      if (!narrationWordEntries.length) {
        stopNarrationPlayback()
        return
      }

      if (isSpeechSupported) {
        const started = playNarrationFrom(activeWordIndex)
        if (!started) {
          stopNarrationPlayback()
        }
        return
      }

      setIsNarrationPlaying(true)
    },
    [
      activeWordIndex,
      isSpeechSupported,
      narrationWordEntries,
      playNarrationFrom,
      stopNarrationPlayback,
    ],
  )

  useEffect(() => {
    if (!pendingAutoPlay) return
    setPendingAutoPlay(false)
    handlePlaybackToggle(true)
  }, [handlePlaybackToggle, pendingAutoPlay])

  useEffect(() => {
    if (!narrationWordEntries.length) {
      if (activeWordIndex !== 0) {
        setActiveWordIndex(0)
      }
      return
    }

    const maxIndex = narrationWordEntries.length - 1
    if (activeWordIndex > maxIndex) {
      setActiveWordIndex(maxIndex)
    }
  }, [activeWordIndex, narrationWordEntries])

  const narration: BankNarrationState | null = useMemo(() => {
    if (!narrationOffer) return null

    return {
      offer: narrationOffer,
      activeSectionId,
      initialSectionId: narrationSections[0]?.id ?? null,
      requestedSectionId: activeSectionId ?? undefined,
      isActive: activeTab === 'narration',
      targetSelector,
      onSelectSection: handleNarrationSectionChange,
      onSectionChange: handleNarrationSectionChange,
      activeWordIndex,
      activeWordEntry,
      onWordIndexChange: handleWordIndexChange,
      wordEntries: narrationWordEntries,
      isPlaying: isNarrationPlaying,
      onPlaybackToggle: handlePlaybackToggle,
      onWordSelect: handleWordSelect,
    }
  }, [
    activeTab,
    activeWordEntry,
    activeWordIndex,
    handleNarrationSectionChange,
    handleWordIndexChange,
    handleWordSelect,
    activeSectionId,
    handlePlaybackToggle,
    isNarrationPlaying,
    narrationOffer,
    narrationWordEntries,
    narrationSections,
    targetSelector,
  ])

  useEffect(() => {
    const container = detailsRef.current
    if (!container) return

    const highlightableElements = Array.from(
      container.querySelectorAll<HTMLElement>('[data-narration-key]'),
    )

    if (!narrationSections.length || activeTab !== 'narration') {
      highlightableElements.forEach((element) => element.classList.remove('narration-highlight'))
      return
    }

    const activeHighlights =
      narrationSections.find((section) => section.id === activeSectionId)?.highlights ?? []

    highlightableElements.forEach((element) => {
      const key = element.getAttribute('data-narration-key')
      if (key && activeHighlights.includes(key)) {
        element.classList.add('narration-highlight')
      } else {
        element.classList.remove('narration-highlight')
      }
    })

    return () => {
      highlightableElements.forEach((element) => element.classList.remove('narration-highlight'))
    }
  }, [activeSectionId, activeTab, narrationSections])

  useEffect(() => {
    if (activeTab !== 'narration') {
      stopNarrationPlayback()
    }
  }, [activeTab, stopNarrationPlayback])

  useEffect(() => {
    if (!narrationOffer) {
      stopNarrationPlayback()
      return
    }

    stopNarrationPlayback()
  }, [narrationOffer, stopNarrationPlayback])

  // Oblicz wszystkie raty dla wykresu
  const calculateAllPayments = () => {
    if (!loanAmount || !loanPeriod || !result.monthlyPayment) return null

    const monthlyRate = (bank?.baseInterestRate ?? 0) / 100 / 12
    let remainingBalance = loanAmount
    const allPayments: Array<{
      month: number
      payment: number
      principal: number
      interest: number
      remaining: number
    }> = []

    // Zaokrąglij miesięczną ratę do 2 miejsc po przecinku
    const roundedMonthlyPayment = Math.round(result.monthlyPayment * 100) / 100

    for (let month = 1; month <= totalPayments; month++) {
      const interest = Math.round(remainingBalance * monthlyRate * 100) / 100
      let principal = roundedMonthlyPayment - interest

      // Ostatnia rata - dostosuj kwotę do pozostałego salda
      if (month === totalPayments) {
        principal = Math.round(remainingBalance * 100) / 100
      } else {
        principal = Math.round(principal * 100) / 100
      }

      remainingBalance = Math.max(0, Math.round((remainingBalance - principal) * 100) / 100)

      // Ostatnia rata - użyj rzeczywistej kwoty raty
      const actualPayment =
        month === totalPayments
          ? Math.round((principal + interest) * 100) / 100
          : roundedMonthlyPayment

      allPayments.push({
        month,
        payment: Math.round(actualPayment * 100) / 100,
        principal: Math.round(principal * 100) / 100,
        interest: Math.round(interest * 100) / 100,
        remaining: remainingBalance,
      })
    }

    return allPayments
  }

  // Generuj harmonogram spłat z tym samym przeskokiem co wykres
  const getPaymentSchedule = () => {
    const allPayments = calculateAllPayments()
    if (!allPayments) return null

    // Użyj tego samego kroku co wykres
    const step = totalPayments > 60 ? 6 : totalPayments > 24 ? 3 : 1
    const schedule: typeof allPayments = []

    // Dodaj raty z przeskokiem
    for (let i = 0; i < allPayments.length; i += step) {
      const payment = allPayments[i]
      if (payment) {
        schedule.push(payment)
      }
    }

    // Dodaj ostatnią ratę jeśli nie została dodana
    if (allPayments.length > 0) {
      const lastPayment = allPayments[allPayments.length - 1]
      if (lastPayment && schedule[schedule.length - 1]?.month !== lastPayment.month) {
        schedule.push(lastPayment)
      }
    }

    return { schedule, all: allPayments }
  }

  // Przygotuj dane do wykresu
  const getChartData = () => {
    const allPayments = calculateAllPayments()
    if (!allPayments) return null

    // Dla wykresu liniowego - pokazujemy co 6 miesiąc (lub częściej dla krótszych kredytów)
    const step = totalPayments > 60 ? 6 : totalPayments > 24 ? 3 : 1
    const labels: string[] = []
    const remainingData: number[] = []
    const principalData: number[] = []
    const interestData: number[] = []

    for (let i = 0; i < allPayments.length; i += step) {
      const payment = allPayments[i]
      if (payment) {
        labels.push(`Miesiąc ${payment.month}`)
        remainingData.push(payment.remaining)
        principalData.push(payment.principal)
        interestData.push(payment.interest)
      }
    }

    // Dodaj ostatnią ratę jeśli nie została dodana
    if (allPayments.length > 0) {
      const lastPayment = allPayments[allPayments.length - 1]
      if (lastPayment && labels[labels.length - 1] !== `Miesiąc ${lastPayment.month}`) {
        labels.push(`Miesiąc ${lastPayment.month}`)
        remainingData.push(lastPayment.remaining)
        principalData.push(lastPayment.principal)
        interestData.push(lastPayment.interest)
      }
    }

    return {
      labels,
      remainingData,
      principalData,
      interestData,
    }
  }

  // Generuj rekomendację "Dla kogo ta oferta?"
  const getTargetAudience = () => {
    if (!bank) return null

    const features: string[] = []
    const warnings: string[] = []

    // Analiza oferty
    if (result.commission === 0) {
      features.push('osoby szukające oferty bez prowizji')
    }
    if (bank.accountRequired === false) {
      features.push('osoby, które nie chcą otwierać konta w banku')
    }
    if (bank.earlyRepaymentFee === 0) {
      features.push('osoby planujące wcześniejszą spłatę kredytu')
    }
    if (bank.processingTime?.includes('3-7')) {
      features.push('osoby potrzebujące szybkiej decyzji')
    }
    if (bank.maxLoanAmount >= 2500000) {
      features.push('osoby szukające kredytu na wysoką kwotę')
    }
    if (bank.supportedPurposes.includes('construction')) {
      features.push('osoby budujące dom')
    }

    if (bank.accountRequired && bank.accountFee && bank.accountFee > 0) {
      warnings.push('wymaga otwarcia konta z opłatą miesięczną')
    }
    if (bank.minDownPaymentPercent > 10) {
      warnings.push(`wymaga wyższego wkładu własnego (${bank.minDownPaymentPercent}%)`)
    }
    if (bank.earlyRepaymentFee && bank.earlyRepaymentFee > 0) {
      warnings.push('pobiera opłatę za wcześniejszą spłatę')
    }

    return { features, warnings }
  }

  const targetAudience = getTargetAudience()
  const paymentSchedule = getPaymentSchedule()
  const chartData = getChartData()
  const allPaymentsForChart = calculateAllPayments()

  // Stan dla modalu z tabelą harmonogramu
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Stan dla rozmiaru ekranu
  const [isMobile, setIsMobile] = useState(false)

  // Funkcja do formatowania kwot w krótszej formie na mobile
  const formatCurrencyShort = (amount: number): string => {
    if (isMobile) {
      if (amount >= 1000000) {
        return `${(amount / 1000000).toFixed(1)}M zł`
      }
      if (amount >= 1000) {
        return `${(amount / 1000).toFixed(0)}k zł`
      }
      return `${Math.round(amount)} zł`
    }
    return formatCurrencyNoCents(amount)
  }

  // Konfiguracja wykresu
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        align: 'center' as const,
        labels: {
          font: {
            size: isMobile ? 11 : 13,
            weight: 'bold' as const,
            family: 'system-ui, -apple-system, sans-serif',
          },
          padding: isMobile ? 12 : 18,
          boxWidth: isMobile ? 18 : 22,
          boxHeight: isMobile ? 14 : 16,
          usePointStyle: true,
          pointStyle: 'circle',
          color: '#1f2937',
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        padding: isMobile ? 8 : 12,
        titleFont: {
          size: isMobile ? 11 : 13,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: isMobile ? 10 : 12,
        },
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.y
            if (value === null || value === undefined) return ''
            return `${context.dataset.label}: ${formatCurrencyNoCents(value)}`
          },
        },
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        beginAtZero: true,
        title: {
          display: !isMobile,
          text: 'Pozostała kwota do spłaty',
          font: {
            size: isMobile ? 10 : 12,
            weight: 'bold' as const,
          },
          color: '#3b82f6',
          padding: isMobile ? 5 : 10,
        },
        ticks: {
          callback: (value: any) => {
            return formatCurrencyNoCents(value as number)
          },
          font: {
            size: isMobile ? 9 : 11,
          },
          maxTicksLimit: isMobile ? 5 : 8,
        },
        grid: {
          color: 'rgba(99, 102, 241, 0.15)',
          lineWidth: 1,
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        beginAtZero: true,
        title: {
          display: !isMobile,
          text: 'Kapitał i odsetki',
          font: {
            size: isMobile ? 10 : 12,
            weight: 'bold' as const,
          },
          color: '#10b981',
          padding: isMobile ? 5 : 10,
        },
        ticks: {
          callback: (value: any) => {
            return formatCurrencyNoCents(value as number)
          },
          font: {
            size: isMobile ? 9 : 11,
          },
          maxTicksLimit: isMobile ? 5 : 8,
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        ticks: {
          maxRotation: isMobile ? 60 : 45,
          minRotation: isMobile ? 60 : 45,
          font: {
            size: isMobile ? 8 : 10,
          },
          maxTicksLimit: isMobile ? 6 : 12,
        },
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  }

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Blokuj scroll strony gdy modal jest otwarty, ale pozwól scrollować w modalu
  useEffect(() => {
    if (isModalOpen) {
      // Funkcja blokująca scroll na body
      const preventScroll = (e: WheelEvent) => {
        // Sprawdź czy event pochodzi z modalu
        const target = e.target as HTMLElement
        const modalContent = target.closest('[data-modal-content]')

        if (modalContent) {
          // Sprawdź czy modal jest na początku/końcu scrolla
          const modalBody = modalContent.querySelector('[data-modal-body]') as HTMLElement
          if (modalBody) {
            const isAtTop = modalBody.scrollTop === 0
            const isAtBottom =
              modalBody.scrollTop + modalBody.clientHeight >= modalBody.scrollHeight - 1
            const isScrollingUp = e.deltaY < 0
            const isScrollingDown = e.deltaY > 0

            // Jeśli jesteśmy na górze modalu i scrollujemy w górę, zablokuj
            if (isAtTop && isScrollingUp) {
              e.preventDefault()
              e.stopPropagation()
              return
            }

            // Jeśli jesteśmy na końcu modalu i scrollujemy w dół, zablokuj
            if (isAtBottom && isScrollingDown) {
              e.preventDefault()
              e.stopPropagation()
              return
            }
          }
          // Pozwól scrollować w modalu
          return
        }

        // Jeśli event nie pochodzi z modalu, zablokuj scroll
        e.preventDefault()
        e.stopPropagation()
      }

      // Funkcja blokująca touch scroll
      const preventTouchScroll = (e: TouchEvent) => {
        const target = e.target as HTMLElement
        const modalContent = target.closest('[data-modal-content]')

        if (!modalContent) {
          e.preventDefault()
          e.stopPropagation()
        }
      }

      // Dodaj event listenery na window zamiast body
      window.addEventListener('wheel', preventScroll, { passive: false, capture: true })
      window.addEventListener('touchmove', preventTouchScroll, { passive: false, capture: true })

      // Cleanup
      return () => {
        window.removeEventListener('wheel', preventScroll, {
          capture: true,
        } as EventListenerOptions)
        window.removeEventListener('touchmove', preventTouchScroll, {
          capture: true,
        } as EventListenerOptions)
      }
    }
  }, [isModalOpen])

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleNarrationSectionSelect = (
    sectionId: string,
    options?: NarrationWordSelectionOptions,
  ) => {
    if (!narration) return
    setActiveTab('narration')
    narration.onSelectSection(sectionId, options)
    if (narration.onSectionChange && narration.onSectionChange !== narration.onSelectSection) {
      narration.onSectionChange(sectionId, options)
    }
  }

  const detailsData = [
    { label: 'Miesięczna rata', value: formatCurrencyNoCents(result.monthlyPayment), highlight: true, key: 'monthlyPayment' },
    { label: 'Kwota kredytu', value: formatCurrencyNoCents(result.loanAmount ?? formData?.loanAmount ?? 0), key: 'loanAmount' },
    { label: 'Oprocentowanie nominalne', value: formatPercent(result.interestRate), key: 'interestRate' },
    { label: 'RRSO', value: formatPercent(result.rrso), key: 'apr' },
    { label: 'Całkowity koszt kredytu', value: formatCurrencyNoCents(result.totalCost), key: 'totalCost' },
    { label: 'Suma odsetek w okresie kredytowania', value: formatCurrencyNoCents(result.totalInterest), key: 'totalInterest' },
    { label: 'Prowizja za udzielenie kredytu', value: formatCurrencyNoCents(result.commission), key: 'commission' },
    { label: 'Ubezpieczenie kredytu', value: formatCurrencyNoCents(result.insurance), key: 'insurance' },
    { label: 'Liczba rat', value: totalPayments.toString(), key: 'raty' },
    { label: 'Okres kredytowania', value: `${loanPeriod} lat`, key: 'loanPeriod' },
  ]

  const tabsHeader = (
    <TabsWrapper>
      <ViewToggle>
        <ViewToggleButton
          type="button"
          onClick={() => setActiveTab('details')}
          className={clsx(activeTab === 'details' && 'active')}
          aria-label="Szczegóły"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <title>Ikona szczegółów</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="hidden sm:inline">Szczegóły</span>
        </ViewToggleButton>
        <ViewToggleButton
          type="button"
          onClick={() => narration && setActiveTab('narration')}
          className={clsx(activeTab === 'narration' && 'active')}
          disabled={!narration}
          aria-label="Analiza"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <title>Ikona analizy</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span className="hidden sm:inline">Analiza</span>
        </ViewToggleButton>
      </ViewToggle>
    </TabsWrapper>
  )

  if (activeTab === 'narration' && narration) {
    return (
      <DetailsSection ref={detailsRef} className="relative pb-4 md:pb-6">
        {tabsHeader}
        <OfferNarration
          offer={narration.offer}
          className="mt-4"
          variant="list"
          activeSectionId={narration.activeSectionId}
          onSectionSelect={handleNarrationSectionSelect}
          activeWordEntry={narration.activeWordEntry}
          isPlaying={narration.isPlaying}
          onPlaybackToggle={narration.onPlaybackToggle}
          onWordSelect={narration.onWordSelect}
        />
        {narration.isActive && (
          <NarrationStickyContainer>
            <NarrationStickyInner>
              <OfferNarrationStickyBar
                offer={narration.offer}
                targetSelector={narration.targetSelector}
                initialSectionId={narration.initialSectionId}
                requestedSectionId={narration.requestedSectionId}
                onSectionChange={narration.onSectionChange ?? narration.onSelectSection}
                activeWordIndex={narration.activeWordIndex}
                onWordIndexChange={narration.onWordIndexChange}
                isPlaying={narration.isPlaying}
                onPlaybackToggle={narration.onPlaybackToggle}
                onWordSelect={narration.onWordSelect}
                className="w-full"
              />
            </NarrationStickyInner>
          </NarrationStickyContainer>
        )}
      </DetailsSection>
    )
  }

  // Najważniejsze metryki - do wyświetlenia w dużych kartach
  const keyMetrics = [
    {
      label: 'Miesięczna rata',
      value: formatCurrencyNoCents(result.monthlyPayment),
      icon: HiOutlineCurrencyDollar,
      key: 'monthlyPayment',
      highlight: true,
      tooltip: (
        <div className="space-y-2">
          <p className="font-semibold">Kwota do zapłaty co miesiąc</p>
          <p className="text-sm">
            To jest kwota, którą będziesz płacić bankowi każdego miesiąca przez cały okres kredytowania.
          </p>
          <p className="text-sm">
            <strong>Ważne:</strong> Upewnij się, że rata nie przekracza 30-40% Twojego miesięcznego dochodu,
            aby zachować płynność finansową.
          </p>
          <p className="text-sm text-gray-600">
            Rata może się zmieniać przy kredytach ze zmiennym oprocentowaniem, jeśli zmienią się stopy
            procentowe.
          </p>
        </div>
      ),
    },
    {
      label: 'Całkowity koszt',
      value: formatCurrencyNoCents(result.totalCost),
      icon: HiOutlineCalculator,
      key: 'totalCost',
      highlight: true,
      tooltip: (
        <div className="space-y-2">
          <p className="font-semibold">Łączny koszt kredytu</p>
          <p className="text-sm">
            To jest suma wszystkich kosztów związanych z kredytem: kwota kredytu + odsetki + prowizja +
            ubezpieczenia.
          </p>
          <p className="text-sm">
            <strong>Różnica między kwotą kredytu a całkowitym kosztem:</strong>{' '}
            {formatCurrencyNoCents(result.totalCost - (result.loanAmount ?? formData?.loanAmount ?? 0))}
          </p>
          <p className="text-sm text-gray-600">
            To są dodatkowe koszty, które zapłacisz oprócz pożyczonej kwoty. Im niższy całkowity koszt,
            tym lepsza oferta.
          </p>
        </div>
      ),
    },
    {
      label: 'RRSO',
      value: formatPercent(result.rrso),
      icon: HiOutlineChartBar,
      key: 'apr',
      highlight: true,
      tooltip: (
        <div className="space-y-2">
          <p className="font-semibold">Rzeczywista Roczna Stopa Oprocentowania</p>
          <p className="text-sm">
            RRSO to wskaźnik, który pokazuje prawdziwy koszt kredytu. Uwzględnia oprocentowanie, prowizję
            i wszystkie opłaty.
          </p>
          <p className="text-sm">
            <strong>Dlaczego RRSO jest ważne?</strong> Pozwala porównać oferty różnych banków na
            porównywalnych zasadach. Im niższe RRSO, tym tańszy kredyt.
          </p>
          <p className="text-sm text-gray-600">
            RRSO jest wyższe niż oprocentowanie nominalne, bo uwzględnia wszystkie koszty dodatkowe.
            To najlepszy wskaźnik do porównywania ofert.
          </p>
        </div>
      ),
    },
  ]

  // Pozostałe dane - do wyświetlenia w mniejszych boksach
  // Uporządkowane logicznie: podstawowe parametry -> okres -> koszty
  const detailOrder = ['loanAmount', 'interestRate', 'loanPeriod', 'raty', 'totalInterest', 'commission', 'insurance']
  
  // Tooltips dla szczegółów
  const getDetailTooltip = (key: string, value: string, label: string) => {
    switch (key) {
      case 'loanAmount':
        return (
          <div className="space-y-2">
            <p className="font-semibold">Kwota kredytu</p>
            <p className="text-sm">
              To jest kwota, którą pożyczasz od banku. Razem z wkładem własnym stanowi wartość nieruchomości,
              którą chcesz kupić.
            </p>
            <p className="text-sm">
              <strong>Warto wiedzieć:</strong> Im wyższy wkład własny, tym niższa kwota kredytu i niższe
              koszty odsetek.
            </p>
          </div>
        )
      case 'interestRate':
        return (
          <div className="space-y-2">
            <p className="font-semibold">Oprocentowanie nominalne</p>
            <p className="text-sm">
              To jest podstawowa stopa procentowa kredytu, która składa się z marży banku i stawki referencyjnej
              (np. WIBOR).
            </p>
            <p className="text-sm">
              <strong>Różnica między oprocentowaniem nominalnym a RRSO:</strong> Oprocentowanie nominalne nie
              uwzględnia prowizji i innych opłat, dlatego RRSO jest wyższe i lepiej odzwierciedla rzeczywisty
              koszt kredytu.
            </p>
            <p className="text-sm text-gray-600">
              Przy kredytach ze zmiennym oprocentowaniem stawka może się zmieniać w zależności od zmian stóp
              procentowych.
            </p>
          </div>
        )
      case 'loanPeriod':
        return (
          <div className="space-y-2">
            <p className="font-semibold">Okres kredytowania</p>
            <p className="text-sm">
              To jest czas, w którym będziesz spłacać kredyt. Standardowo kredyty hipoteczne są udzielane na
              25-30 lat.
            </p>
            <p className="text-sm">
              <strong>Wpływ na ratę:</strong> Im dłuższy okres, tym niższa miesięczna rata, ale wyższy
              całkowity koszt kredytu (więcej odsetek).
            </p>
            <p className="text-sm text-gray-600">
              Możesz skrócić okres kredytowania, co zwiększy ratę, ale zmniejszy całkowity koszt.
            </p>
          </div>
        )
      case 'raty':
        return (
          <div className="space-y-2">
            <p className="font-semibold">Liczba rat</p>
            <p className="text-sm">
              To jest łączna liczba miesięcznych rat, które będziesz płacić przez cały okres kredytowania.
            </p>
            <p className="text-sm">
              <strong>Przykład:</strong> Przy okresie kredytowania 25 lat będziesz płacić 300 rat (25 × 12).
            </p>
            <p className="text-sm text-gray-600">
              Każda rata składa się z części kapitałowej (spłata pożyczonej kwoty) i części odsetkowej
              (koszt kredytu).
            </p>
          </div>
        )
      case 'totalInterest':
        return (
          <div className="space-y-2">
            <p className="font-semibold">Suma odsetek</p>
            <p className="text-sm">
              To jest łączna kwota odsetek, którą zapłacisz przez cały okres kredytowania. To są koszty
              związane z pożyczeniem pieniędzy.
            </p>
            <p className="text-sm">
              <strong>Jak zmniejszyć odsetki:</strong> Wybierz krótszy okres kredytowania, wyższy wkład
              własny lub kredyt z niższym oprocentowaniem.
            </p>
            <p className="text-sm text-gray-600">
              Odsetki stanowią znaczną część całkowitego kosztu kredytu, dlatego warto porównać oferty
              pod kątem oprocentowania.
            </p>
          </div>
        )
      case 'commission':
        return (
          <div className="space-y-2">
            <p className="font-semibold">Prowizja za udzielenie kredytu</p>
            <p className="text-sm">
              To jest jednorazowa opłata, którą bank pobiera przy udzieleniu kredytu. Może być wyrażona jako
              procent kwoty kredytu lub stała kwota.
            </p>
            <p className="text-sm">
              <strong>Dobra wiadomość:</strong> Wiele banków oferuje 0% prowizji, szczególnie przy spełnieniu
              określonych warunków (np. konto w banku, ubezpieczenie).
            </p>
            <p className="text-sm text-gray-600">
              Prowizja jest uwzględniana w RRSO, więc nawet jeśli wynosi 0%, warto sprawdzić inne koszty
              ukryte w RRSO.
            </p>
          </div>
        )
      case 'insurance':
        return (
          <div className="space-y-2">
            <p className="font-semibold">Ubezpieczenie kredytu</p>
            <p className="text-sm">
              To są koszty ubezpieczenia, które bank może wymagać. Najczęściej jest to ubezpieczenie na życie
              lub ubezpieczenie pomostowe.
            </p>
            <p className="text-sm">
              <strong>Warto wiedzieć:</strong> Niektóre banki wymagają ubezpieczenia, inne oferują je jako
              opcję. Koszty mogą się różnić w zależności od wieku i stanu zdrowia.
            </p>
            <p className="text-sm text-gray-600">
              Ubezpieczenie chroni Cię i Twoją rodzinę przed koniecznością spłaty kredytu w przypadku
              nieprzewidzianych zdarzeń losowych.
            </p>
          </div>
        )
      default:
        return null
    }
  }
  
  const otherDetails = detailsData
    .filter((item) => !keyMetrics.some((km) => km.key === item.key))
    .sort((a, b) => {
      const indexA = detailOrder.indexOf(a.key)
      const indexB = detailOrder.indexOf(b.key)
      // Jeśli klucz nie jest w liście kolejności, umieść na końcu
      if (indexA === -1) return 1
      if (indexB === -1) return -1
      return indexA - indexB
    })
    .map((item) => {
      // Przypisz ikony do różnych typów danych
      let icon = HiOutlineDocument
      if (item.key === 'loanAmount') icon = HiOutlineCash
      else if (item.key === 'interestRate') icon = HiOutlineTag
      else if (item.key === 'totalInterest') icon = HiOutlineCurrencyDollar
      else if (item.key === 'commission' || item.key === 'insurance') icon = HiOutlineShieldCheck
      else if (item.key === 'raty' || item.key === 'loanPeriod') icon = HiOutlineClock

      const tooltip = getDetailTooltip(item.key, item.value, item.label)

      return { ...item, icon, tooltip }
    })

  return (
    <DetailsSection ref={detailsRef}>
      {tabsHeader}

      {/* Najważniejsze informacje - duże karty */}
      <KeyMetricsSection>
        <KeyMetricsTitle>Najważniejsze informacje</KeyMetricsTitle>
        <KeyMetricsGrid>
          {keyMetrics.map((metric) => {
            const IconComponent = metric.icon
            return (
              <KeyMetricCard key={metric.key} className={clsx(metric.highlight && 'highlight')}>
                <KeyMetricIcon className={clsx(metric.highlight && 'highlight-icon')}>
                  <IconComponent size={24} />
                </KeyMetricIcon>
              <KeyMetricContent>
                <KeyMetricLabelRow>
                  <KeyMetricLabel data-narration-key={metric.key}>{metric.label}</KeyMetricLabel>
                  <Tooltip content={metric.tooltip}>
                    <KeyMetricInfoIcon
                      type="button"
                      aria-label="Informacja"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <title>Informacja</title>
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                      </svg>
                    </KeyMetricInfoIcon>
                  </Tooltip>
                </KeyMetricLabelRow>
                <KeyMetricValue
                  data-narration-key={metric.key}
                  className={clsx(metric.highlight && 'highlight')}
                >
                  {metric.value}
                </KeyMetricValue>
              </KeyMetricContent>
            </KeyMetricCard>
            )
          })}
        </KeyMetricsGrid>
      </KeyMetricsSection>

      {/* Szczegóły - pozostałe informacje w mniejszych boksach */}
      <DetailsSectionTitle>Szczegóły oferty</DetailsSectionTitle>
      <DetailsGrid>
        {otherDetails.map((item, index) => {
          const IconComponent = item.icon
          const isLast = index === otherDetails.length - 1
          return (
            <DetailCard key={item.key} className={isLast ? 'sm:col-span-2' : ''}>
              <DetailIcon>
                <IconComponent size={20} />
              </DetailIcon>
              <DetailContent>
                <DetailLabelRow>
                  <DetailLabel data-narration-key={item.key}>{item.label}</DetailLabel>
                  {item.tooltip && (
                    <Tooltip content={item.tooltip}>
                      <DetailInfoIcon
                        type="button"
                        aria-label="Informacja"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg
                          className="h-3.5 w-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <title>Informacja</title>
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4" />
                          <path d="M12 8h.01" />
                        </svg>
                      </DetailInfoIcon>
                    </Tooltip>
                  )}
                </DetailLabelRow>
                <DetailValue data-narration-key={item.key}>{item.value}</DetailValue>
              </DetailContent>
            </DetailCard>
          )
        })}
      </DetailsGrid>

      {/* Harmonogram spłat - wykres */}
      {chartData && paymentSchedule && paymentSchedule.schedule.length > 0 && (
        <>
          <PaymentChartSectionHeader>
            <DetailsSectionTitle className="mb-0 mt-0">Harmonogram spłat</DetailsSectionTitle>
            <ModalButton onClick={openModal}>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              Pokaż tabelę
            </ModalButton>
          </PaymentChartSectionHeader>
          <PaymentChartCard>
            <PaymentChartContainer>
            <Chart
              type="bar"
              data={{
                labels: chartData.labels,
                datasets: [
                  // Linia - pozostała kwota do spłaty
                  {
                    type: 'line' as const,
                    label: 'Pozostała kwota do spłaty',
                    data: chartData.remainingData,
                    borderColor: '#3b82f6', // Blue-500
                    backgroundColor: 'rgba(59, 130, 246, 0.12)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 8,
                    pointBackgroundColor: '#3b82f6',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2.5,
                    borderWidth: 3,
                    yAxisID: 'y',
                  },
                  // Słupki - kapitał
                  {
                    type: 'bar' as const,
                    label: 'Kapitał',
                    data: chartData.labels.map((label) => {
                      // Znajdź odpowiednią ratę dla tego miesiąca
                      const monthMatch = label.match(/Miesiąc (\d+)/)
                      if (!monthMatch || !monthMatch[1] || !allPaymentsForChart) return 0
                      const month = parseInt(monthMatch[1], 10)
                      const payment = allPaymentsForChart.find((p) => p.month === month)
                      return payment ? payment.principal : 0
                    }),
                    backgroundColor: 'rgba(16, 185, 129, 0.7)', // Emerald
                    borderColor: '#10b981',
                    borderWidth: 1.5,
                    yAxisID: 'y1',
                  },
                  // Słupki - odsetki
                  {
                    type: 'bar' as const,
                    label: 'Odsetki',
                    data: chartData.labels.map((label) => {
                      // Znajdź odpowiednią ratę dla tego miesiąca
                      const monthMatch = label.match(/Miesiąc (\d+)/)
                      if (!monthMatch || !monthMatch[1] || !allPaymentsForChart) return 0
                      const month = parseInt(monthMatch[1], 10)
                      const payment = allPaymentsForChart.find((p) => p.month === month)
                      return payment ? payment.interest : 0
                    }),
                    backgroundColor: 'rgba(245, 101, 101, 0.7)', // Red/Coral
                    borderColor: '#f56565',
                    borderWidth: 1.5,
                    yAxisID: 'y1',
                  },
                ],
              }}
              options={chartOptions}
            />
            </PaymentChartContainer>
          </PaymentChartCard>
        </>
      )}

      {/* Parametry oferty - zawsze widoczne */}

      {/* Modal z tabelą harmonogramu */}
      {isModalOpen && paymentSchedule && (
        <ModalOverlay onClick={closeModal} style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
          <ModalContent onClick={(e) => e.stopPropagation()} data-modal-content>
            <ModalHeader>
              <ModalTitle>Tabela harmonogramu spłat</ModalTitle>
              <ModalCloseButton onClick={closeModal}>
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody data-modal-body>
              {paymentSchedule.schedule.length > 0 && (
                <PaymentScheduleTableWrapper>
                  <PaymentScheduleTable>
                    <PaymentScheduleTableHead>
                      <PaymentScheduleTableRow>
                        <PaymentScheduleTableHeader>Rata</PaymentScheduleTableHeader>
                        <PaymentScheduleTableHeader>Kwota raty</PaymentScheduleTableHeader>
                        <PaymentScheduleTableHeader>Kapitał</PaymentScheduleTableHeader>
                        <PaymentScheduleTableHeader>Odsetki</PaymentScheduleTableHeader>
                        <PaymentScheduleTableHeader>Pozostało do spłaty</PaymentScheduleTableHeader>
                      </PaymentScheduleTableRow>
                    </PaymentScheduleTableHead>
                    <PaymentScheduleTableBody>
                      {paymentSchedule.schedule.map((payment) => (
                        <PaymentScheduleTableRow key={payment.month}>
                          <PaymentScheduleTableCell>{payment.month}</PaymentScheduleTableCell>
                          <PaymentScheduleTableCell className="font-semibold">
                            {formatCurrencyNoCents(payment.payment)}
                          </PaymentScheduleTableCell>
                          <PaymentScheduleTableCell>
                            {formatCurrencyNoCents(payment.principal)}
                          </PaymentScheduleTableCell>
                          <PaymentScheduleTableCell className="text-orange-600">
                            {formatCurrencyNoCents(payment.interest)}
                          </PaymentScheduleTableCell>
                          <PaymentScheduleTableCell className="text-gray-600">
                            {formatCurrencyNoCents(payment.remaining)}
                          </PaymentScheduleTableCell>
                        </PaymentScheduleTableRow>
                      ))}
                    </PaymentScheduleTableBody>
                  </PaymentScheduleTable>
                </PaymentScheduleTableWrapper>
              )}
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Parametry oferty - zawsze widoczne */}
      {!bank && (
        <MissingDetailsAlert>
          <MissingDetailsIcon>ℹ️</MissingDetailsIcon>
          <MissingDetailsText>
            Rozszerzone dane banku są chwilowo niedostępne. Podstawowe wartości obliczeń pozostają
            poprawne.
          </MissingDetailsText>
        </MissingDetailsAlert>
      )}

      {bank && (
        <ParametersSection>
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
            PARAMETRY OFERTY
          </DetailsSectionSubtitle>
          <ParametersGrid>
            {formData?.interestRateType === 'variable' && bank.wibor !== undefined && bank.wibor !== null && (
              <ParameterCard>
                <ParameterLabel>
                  WIBOR
                  <Tooltip
                    content={
                      <span>
                        WIBOR to referencyjna stopa procentowa, na podstawie której banki ustalają
                        oprocentowanie kredytów.{' '}
                        <strong>Jest to zmienna część oprocentowania.</strong>
                      </span>
                    }
                  >
                    <ParameterTooltipIcon
                      type="button"
                      aria-label="Informacja"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg
                        className="h-4.5 w-4.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <title>Informacja</title>
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                      </svg>
                    </ParameterTooltipIcon>
                  </Tooltip>
                </ParameterLabel>
                <ParameterValue className="text-blue-600">
                  {formatPercent(bank.wibor)}
                </ParameterValue>
              </ParameterCard>
            )}
            {formData?.interestRateType && (
              <ParameterCard>
                <ParameterLabel>
                  Typ oprocentowania
                  <Tooltip
                    content={
                      <span>
                        {formData.interestRateType === 'fixed'
                          ? 'Kredyt ze stałym oprocentowaniem - oprocentowanie nie zmienia się przez cały okres kredytowania.'
                          : 'Kredyt ze zmiennym oprocentowaniem - oprocentowanie może się zmieniać w zależności od zmian stóp procentowych.'}
                      </span>
                    }
                  >
                    <ParameterTooltipIcon
                      type="button"
                      aria-label="Informacja"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg
                        className="h-4.5 w-4.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <title>Informacja</title>
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                      </svg>
                    </ParameterTooltipIcon>
                  </Tooltip>
                </ParameterLabel>
                <ParameterValue className="text-green-600">
                  {formData.interestRateType === 'fixed' ? 'Stałe' : 'Zmienne'}
                </ParameterValue>
              </ParameterCard>
            )}
            {formData?.interestRateType === 'variable' && bank.margin !== undefined && bank.margin !== null && (
              <ParameterCard>
                <ParameterLabel>
                  Marża banku
                  <Tooltip
                    content={
                      <span>
                        Marża to stała część oprocentowania, którą bank dolicza do WIBOR.{' '}
                        <strong>Im niższa marża, tym lepsza oferta.</strong>
                      </span>
                    }
                  >
                    <ParameterTooltipIcon
                      type="button"
                      aria-label="Informacja"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg
                        className="h-4.5 w-4.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <title>Informacja</title>
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                      </svg>
                    </ParameterTooltipIcon>
                  </Tooltip>
                </ParameterLabel>
                <ParameterValue className="text-indigo-600">
                  {formatPercent(bank.margin)}
                </ParameterValue>
              </ParameterCard>
            )}
            <ParameterCard>
              <ParameterLabel>
                Wcześniejsza spłata
                <Tooltip
                  content={
                    <span>
                      Opłata za wcześniejszą spłatę kredytu.{' '}
                      <strong>Darmowa spłata to duża zaleta</strong> - możesz spłacić kredyt
                      szybciej bez dodatkowych kosztów.
                    </span>
                  }
                >
                  <ParameterTooltipIcon
                    type="button"
                    aria-label="Informacja"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <title>Informacja</title>
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                  </ParameterTooltipIcon>
                </Tooltip>
              </ParameterLabel>
              <ParameterValue
                className={bank.earlyRepaymentFee === 0 ? 'text-green-600' : 'text-orange-600'}
              >
                {bank.earlyRepaymentFee === 0 ? '✓ Darmowa' : `${bank.earlyRepaymentFee}% opłaty`}
              </ParameterValue>
            </ParameterCard>
            <ParameterCard>
              <ParameterLabel>
                Wymagane konto
                <Tooltip
                  content={
                    <span>
                      Czy bank wymaga otwarcia konta osobistego przy kredycie.{' '}
                      <strong>Brak wymogu to zaleta</strong> - nie musisz zmieniać banku.
                    </span>
                  }
                >
                  <ParameterTooltipIcon
                    type="button"
                    aria-label="Informacja"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <title>Informacja</title>
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                  </ParameterTooltipIcon>
                </Tooltip>
              </ParameterLabel>
              <ParameterValue className={bank.accountRequired ? 'text-gray-600' : 'text-green-600'}>
                {bank.accountRequired ? 'Tak' : '✓ Nie'}
                {bank.accountRequired && !!bank.accountFee && bank.accountFee > 0 && (
                  <ParameterSubvalue> ({bank.accountFee} zł/msc)</ParameterSubvalue>
                )}
              </ParameterValue>
            </ParameterCard>
            <ParameterCard>
              <ParameterLabel>
                Zakres kwotowy
                <Tooltip
                  content={
                    <span>
                      Minimalna i maksymalna kwota kredytu oferowana przez bank.{' '}
                      <strong>Sprawdź, czy Twoja kwota mieści się w tym zakresie.</strong>
                    </span>
                  }
                >
                  <ParameterTooltipIcon
                    type="button"
                    aria-label="Informacja"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <title>Informacja</title>
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                  </ParameterTooltipIcon>
                </Tooltip>
              </ParameterLabel>
              <ParameterValue className="text-gray-600! text-xs">
                {formatCurrencyNoCents(bank.minLoanAmount)} -{' '}
                {formatCurrencyNoCents(bank.maxLoanAmount)}
              </ParameterValue>
            </ParameterCard>
            <ParameterCard className="sm:col-span-2">
              <ParameterLabel>
                Czas rozpatrzenia
                <Tooltip
                  content={
                    <span>
                      Szacowany czas, w jakim bank rozpatrzy Twój wniosek kredytowy.{' '}
                      <strong>Im krótszy, tym szybciej otrzymasz decyzję.</strong>
                    </span>
                  }
                >
                  <ParameterTooltipIcon
                    type="button"
                    aria-label="Informacja"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <title>Informacja</title>
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                  </ParameterTooltipIcon>
                </Tooltip>
              </ParameterLabel>
              <ParameterValue className="text-purple-600">
                {bank.processingTime ?? 'Brak danych'}
              </ParameterValue>
            </ParameterCard>
          </ParametersGrid>
        </ParametersSection>
      )}

      {/* Dodatkowe szczegóły - zawsze widoczne */}
      {bank && (
        <DetailsSectionWrapper>
          {/* Specjalne oferty */}
          {bank.specialOffers && bank.specialOffers.length > 0 && (
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
                SPECJALNE OFERTY
              </DetailsSectionSubtitle>
              <SpecialOffersGrid>
                {bank.specialOffers.map((offer: string) => (
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
          {((bank.advantages && bank.advantages.length > 0) ||
            (bank.disadvantages && bank.disadvantages.length > 0)) && (
            <>
              <SectionDivider />
              <ComparisonGrid>
                {bank.advantages && bank.advantages.length > 0 && (
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
                      <ComparisonTitle className="text-green-800">ZALETY</ComparisonTitle>
                    </ComparisonHeader>
                    <ComparisonList>
                      {bank.advantages.map((advantage: string) => (
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

                {bank.disadvantages && bank.disadvantages.length > 0 && (
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
                      <ComparisonTitle className="text-red-800">WADY</ComparisonTitle>
                    </ComparisonHeader>
                    <ComparisonList>
                      {bank.disadvantages.map((disadvantage: string) => (
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
          {bank.ltv && (
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
                  <LtvTitleWrapper>
                    <LtvTitle>Wpływ wkładu własnego na marżę (LTV)</LtvTitle>
                    <Tooltip
                      content={
                        <span>
                          LTV (Loan-to-Value) to stosunek kwoty kredytu do wartości nieruchomości.{' '}
                          <strong>
                            Im wyższy wkład własny (więcej własnych pieniędzy), tym lepsze warunki
                            kredytu.
                          </strong>{' '}
                          Banki oferują niższe marże przy wyższym wkładzie własnym.
                        </span>
                      }
                    >
                      <ParameterTooltipIcon
                        type="button"
                        aria-label="Informacja"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg
                          className="h-4.5 w-4.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <title>Informacja</title>
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4" />
                          <path d="M12 8h.01" />
                        </svg>
                      </ParameterTooltipIcon>
                    </Tooltip>
                  </LtvTitleWrapper>
                </LtvHeader>
                <LtvGrid>
                  <LtvCard className="border-green-200 bg-linear-to-br from-green-50 to-emerald-50">
                    <LtvPercentage className="text-green-600">20%</LtvPercentage>
                    <LtvLabel>wkładu własnego</LtvLabel>
                    <LtvDivider />
                    <LtvRatio>LTV 80%</LtvRatio>
                    <LtvValue className="text-green-700">
                      {bank.ltv?.ratio80 === 0
                        ? '✓ Bez dodatkowej marży'
                        : bank.ltv?.ratio80 !== undefined
                          ? `+${formatPercent(bank.ltv.ratio80)}`
                          : 'Brak danych'}
                    </LtvValue>
                  </LtvCard>

                  <LtvCard className="border-orange-200 bg-linear-to-br from-orange-50 to-amber-50">
                    <LtvPercentage className="text-orange-600">10%</LtvPercentage>
                    <LtvLabel>wkładu własnego</LtvLabel>
                    <LtvDivider />
                    <LtvRatio>LTV 90%</LtvRatio>
                    <LtvValue className="text-orange-700">
                      {bank.ltv?.ratio90 === 0
                        ? 'Bez dodatkowej marży'
                        : bank.ltv?.ratio90 !== undefined && (bank.ltv?.ratio90 ?? 0) > 0
                          ? `+${formatPercent(bank.ltv?.ratio90 ?? 0)}`
                          : 'Oferta niedostępna'}
                    </LtvValue>
                  </LtvCard>

                  {bank.ltv?.ratio95 !== undefined && (
                    <LtvCard className="border-red-200 bg-linear-to-br from-red-50 to-pink-50">
                      <LtvPercentage className="text-red-600">5%</LtvPercentage>
                      <LtvLabel>wkładu własnego</LtvLabel>
                      <LtvDivider />
                      <LtvRatio>LTV 95%</LtvRatio>
                      <LtvValue className="text-red-700">
                        {bank.ltv?.ratio95 === 0
                          ? 'Bez dodatkowej marży'
                          : (bank.ltv?.ratio95 ?? 0) > 0
                            ? `+${formatPercent(bank.ltv?.ratio95 ?? 0)}`
                            : 'Oferta niedostępna'}
                      </LtvValue>
                    </LtvCard>
                  )}
                </LtvGrid>
                <LtvExplanation>
                  <svg
                    className="h-4 w-4 shrink-0 text-blue-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <title>Informacja</title>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                  <span>Im wyższy wkład własny, tym niższa marża i lepsze warunki kredytu</span>
                </LtvExplanation>
              </LtvSection>
            </>
          )}

          {/* Opis banku */}
          {bank.description && (
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
                  <DescriptionText>{bank.description}</DescriptionText>
                </DescriptionContent>
              </BankDescription>
            </>
          )}
        </DetailsSectionWrapper>
      )}
    </DetailsSection>
  )
}

// Main section
const DetailsSection = tw.div`
  px-4 pb-4 md:px-8 md:pb-6 pt-4 md:pt-4
  border-t border-gray-200/60
  bg-white
`

// Key metrics section - najważniejsze informacje
const KeyMetricsSection = tw.div`
  mb-6
`

const KeyMetricsTitle = tw.h3`
  text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4 mt-6
`

const KeyMetricsGrid = tw.div`
  grid grid-cols-1 md:grid-cols-3 gap-4
`

const KeyMetricCard = tw.div`
  bg-white rounded-xl border-2 border-gray-200 p-4
  transition-all duration-200
  hover:shadow-lg hover:-translate-y-0.5
  [&.highlight]:border-emerald-300 [&.highlight]:bg-gradient-to-br [&.highlight]:from-emerald-50 [&.highlight]:to-green-50
  [&.highlight]:shadow-md
  flex items-start gap-3
`

const KeyMetricIcon = tw.div`
  w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600
  transition-colors duration-200 shrink-0
  [&.highlight-icon]:bg-emerald-100 [&.highlight-icon]:text-emerald-600
`

const KeyMetricContent = tw.div`
  flex flex-col gap-1 flex-1 min-w-0
`

const KeyMetricLabelRow = tw.div`
  flex items-center gap-1.5
`

const KeyMetricLabel = tw.div`
  text-xs font-semibold text-gray-600 uppercase tracking-wide
`

const KeyMetricInfoIcon = tw.button`
  inline-flex items-center justify-center
  w-5 h-5
  rounded-full
  text-gray-400
  hover:text-gray-600
  hover:bg-gray-100
  transition-all duration-200
  cursor-help
  focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1
  shrink-0
`

const KeyMetricValue = tw.div`
  text-2xl font-bold text-gray-900
  [&.highlight]:text-emerald-700
`

const DetailsSectionTitle = tw.h3`
  text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4 mt-6
`

const PaymentChartSectionHeader = tw.div`
  flex items-center justify-between mb-4 mt-6
`

const DetailsGrid = tw.div`
  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3
`

const DetailCard = tw.div`
  bg-white rounded-lg border border-gray-200 p-3
  flex items-start gap-2.5
  transition-all duration-200
  hover:shadow-md hover:-translate-y-0.5 hover:border-gray-300
`

const DetailIcon = tw.div`
  w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600
  shrink-0
  transition-colors duration-200
`

const DetailContent = tw.div`
  flex flex-col gap-0.5 flex-1 min-w-0
`

const DetailLabelRow = tw.div`
  flex items-center gap-1
`

const DetailLabel = tw.div`
  text-xs text-gray-600 font-medium
`

const DetailInfoIcon = tw.button`
  inline-flex items-center justify-center
  w-4 h-4
  rounded-full
  text-gray-400
  hover:text-gray-600
  hover:bg-gray-100
  transition-all duration-200
  cursor-help
  focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-1
  shrink-0
`

const DetailValue = tw.div`
  text-base font-bold text-gray-900
`

const SimpleInfoTable = tw.div`
  w-full border border-gray-200 rounded-lg bg-white
  divide-y divide-gray-200
`

const MissingDetailsAlert = tw.div`
  mt-4 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3
  text-sm text-amber-800
`

const MissingDetailsIcon = tw.span`
  text-base leading-none
`

const MissingDetailsText = tw.span`
  flex-1 leading-snug
`

const SimpleInfoRow = tw.div`
  grid grid-cols-[auto_1fr] items-center
  py-3 px-4 sm:px-6
  gap-x-3
  transition-colors duration-150
  hover:bg-gray-50
`

const SimpleInfoLabel = tw.div`
  text-sm text-gray-600 font-medium
`

const SimpleInfoValue = tw.div`
  text-sm text-gray-900 font-semibold
  text-right
`

const TabsWrapper = tw.div`mb-4 flex justify-end`

const ViewToggle = tw.div`
  flex items-center gap-2
  bg-gray-100
  rounded-lg
  p-1
  shrink-0
`

const ViewToggleButton = tw.button`
  flex items-center gap-2
  px-3 py-2
  rounded-md
  text-sm font-medium
  text-gray-600
  transition-all duration-200
  hover:text-gray-900 hover:bg-white
  focus:outline-none focus:ring-2 focus:ring-gray-300
  [&.active]:bg-white [&.active]:text-gray-900 [&.active]:shadow-sm
  disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-100 disabled:hover:text-gray-600
`
const NarrationStickyContainer = tw.div`
  pointer-events-none sticky bottom-0 inset-x-0 z-30 mt-4 flex justify-center -mx-4 sm:bottom-4 sm:mx-0
`
const NarrationStickyInner = tw.div`pointer-events-auto w-full max-w-none sm:max-w-6xl`
// Main costs section - uproszczone
const MainCostsSection = tw.div`
  mb-6
`

const MainCostsGrid = tw.div`
  grid grid-cols-1 sm:grid-cols-3 gap-4
`

const MainCostCard = tw.div`
  bg-white rounded-xl border border-gray-200 p-5
  transition-all duration-200
  hover:shadow-md hover:border-gray-300
  [&.highlight]:border-2 [&.highlight]:border-blue-300 [&.highlight]:bg-blue-50/50
`

const MainCostLabel = tw.div`
  text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2
`

const MainCostValue = tw.div`
  text-2xl md:text-3xl font-black text-gray-900
`

// Accordion components
const AccordionSection = tw.div`
  mb-4 border border-gray-200 rounded bg-white
  overflow-hidden
`

const AccordionHeader = tw.button`
  w-full flex items-center justify-between p-3
  text-left
  hover:bg-gray-50
  focus:outline-none
  cursor-pointer
`

const AccordionTitle = tw.h4`
  font-medium text-sm text-gray-900
`

const AccordionIcon = tw.span`
  shrink-0 text-gray-400 transition-transform duration-200
  [&.expanded]:rotate-180
`

const AccordionContent = tw.div`
  border-t border-gray-200 p-3
`

// Cost cards (główne koszty)
const CostCardsWrapper = tw.div`
  grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10
`

const CostCard = tw.div`
  bg-white/80 backdrop-blur-md
  rounded-3xl
  shadow-[0_4px_20px_rgba(0,0,0,0.08)] 
  hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
  transition-all duration-500 ease-out
  hover:-translate-y-2
  border border-white/50
  overflow-hidden
  group
  relative
  before:absolute before:inset-0 before:bg-linear-to-br before:from-white/50 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
`

const CostCardInner = tw.div`
  p-5 md:p-6 flex items-center gap-4 md:gap-5
`

const CostIcon = tw.div`
  w-14 h-14 md:w-16 md:h-16 rounded-2xl
  flex items-center justify-center
  shadow-[0_4px_12px_rgba(0,0,0,0.15)]
  transition-all duration-500 ease-out
  group-hover:scale-110 group-hover:rotate-6
  group-hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)]
  shrink-0
  relative
  overflow-hidden
  before:absolute before:inset-0 before:bg-linear-to-br before:from-white/30 before:to-transparent
`

const CostContent = tw.div`flex flex-col flex-1 min-w-0`

const CostLabel = tw.span`
  text-xs md:text-sm text-gray-500 font-extrabold uppercase tracking-widest mb-2.5
`

const CostValue = tw.span`
  text-2xl md:text-3xl font-black
  cursor-help
  transition-all duration-300
  hover:scale-105
  inline-block
  bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent
  group-hover:from-blue-600 group-hover:to-indigo-600
`

// Section dividers
const SectionDivider = tw.div`
  my-4 h-px bg-gray-200
`

// Subsection titles
const DetailsSectionSubtitle = tw.h4`
  mb-3 mt-6 flex items-center gap-2
  text-xs font-semibold text-gray-700 uppercase tracking-wide
`

const SubtitleIcon = tw.span`
  flex h-5 w-5 items-center justify-center
  text-gray-500
  shrink-0
`

// Parameters section
const ParametersSection = tw.div`
  mb-6
`

// Parameters grid
const ParametersGrid = tw.div`
  grid grid-cols-1 sm:grid-cols-2 gap-3
`

// Details section wrapper
const DetailsSectionWrapper = tw.div`
  space-y-4
`

const ParameterCard = tw.div`
  bg-white p-3 rounded border border-gray-200
`

const ParameterLabel = tw.div`
  text-xs text-gray-600 font-medium mb-1
  flex items-center gap-1
`

const ParameterTooltipIcon = tw.button`
  inline-flex items-center justify-center
  w-4.5 h-4.5 ml-1
  text-gray-400 hover:text-gray-600
  cursor-help
  transition-colors
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded
`

const ParameterValue = tw.span`
  text-sm font-semibold text-gray-900
`

const ParameterSubvalue = tw.span`
  ml-1.5 text-xs text-gray-500 font-normal
`

const ParameterDescription = tw.p`
  text-xs text-gray-600 mt-2 leading-relaxed
`

// Special offers
const SpecialOffersGrid = tw.div`
  grid grid-cols-1 gap-2
`

const SpecialOfferCard = tw.div`
  flex items-start gap-2 rounded border border-gray-200 p-3 bg-white
`

const SpecialOfferIcon = tw.span`
  flex h-4 w-4 shrink-0 items-center justify-center text-gray-500
`

const SpecialOfferText = tw.span`
  text-xs text-gray-700
  flex-1
`

// Comparison (zalety i wady)
const ComparisonGrid = tw.div`
  grid grid-cols-1 lg:grid-cols-2 gap-4
`

const AdvantagesSection = tw.div`
  bg-white rounded border border-gray-200
`

const DisadvantagesSection = tw.div`
  bg-white rounded border border-gray-200
`

const ComparisonHeader = tw.div`
  px-3 py-2 border-b border-gray-200
  flex items-center gap-2
  bg-gray-50
`

const ComparisonIcon = tw.div`
  w-5 h-5
  flex items-center justify-center
`

const ComparisonTitle = tw.h5`
  font-medium text-xs uppercase tracking-wide
`

const ComparisonList = tw.ul`
  p-3 space-y-2
`

const ComparisonItem = tw.li`
  flex items-start gap-2
`

const ComparisonBullet = tw.span`
  w-4 h-4 rounded
  flex items-center justify-center
  text-xs shrink-0
`

const ComparisonText = tw.span`
  text-xs leading-relaxed flex-1
`

// LTV section
const LtvSection = tw.div`
  rounded border border-gray-200 p-3 bg-white
`

const LtvHeader = tw.div`
  mb-3 flex items-center gap-2
`

const LtvIconWrapper = tw.div`
  flex h-5 w-5 items-center justify-center text-gray-500
`

const LtvTitleWrapper = tw.div`
  flex items-center gap-1
`

const LtvTitle = tw.h5`
  font-medium text-xs uppercase tracking-wide text-gray-900
`

const LtvGrid = tw.div`
  grid grid-cols-1 md:grid-cols-3 gap-3 mb-3
`

const LtvCard = tw.div`
  bg-white rounded border border-gray-200 p-3
  text-center
`

const LtvPercentage = tw.div`
  text-lg font-semibold mb-1
`

const LtvLabel = tw.div`
  text-xs text-gray-600 mb-2
`

const LtvDivider = tw.div`
  my-2 h-px bg-gray-200
`

const LtvRatio = tw.div`
  text-xs font-medium text-gray-700 mb-1
`

const LtvValue = tw.div`
  text-xs font-semibold
`

const LtvExplanation = tw.div`
  flex items-center justify-center gap-2 p-2 text-center
  text-xs text-gray-600 bg-gray-50 rounded
`

// Bank description
const BankDescription = tw.div`
  flex items-start gap-3 rounded border border-gray-200 p-3 bg-white
`

const DescriptionIconWrapper = tw.div`
  flex h-5 w-5 shrink-0 items-center justify-center text-gray-500
`

const DescriptionContent = tw.div`
  flex-1 min-w-0
`

const DescriptionTitle = tw.h5`
  font-medium text-gray-900 mb-1 text-xs uppercase tracking-wide
`

const DescriptionText = tw.p`
  text-xs text-gray-700 leading-relaxed
`

// Target audience section
const TargetAudienceSection = tw.div`
  rounded-3xl border border-blue-200/60 p-6 md:p-8 
  shadow-[0_8px_30px_rgba(59,130,246,0.12)]
  bg-linear-to-br from-blue-50/80 via-indigo-50/60 to-purple-50/80
  backdrop-blur-md
  mb-8 md:mb-10
  relative
  overflow-hidden
  before:absolute before:inset-0 before:bg-linear-to-br before:from-white/40 before:via-transparent before:to-transparent
  after:absolute after:top-0 after:right-0 after:w-32 after:h-32 after:bg-linear-to-br after:from-blue-200/20 after:to-transparent after:rounded-full after:blur-3xl
`

const TargetAudienceHeader = tw.div`
  flex items-center gap-4 mb-5 md:mb-6
`

const TargetAudienceIcon = tw.span`
  text-3xl md:text-4xl
  filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.1)]
  transition-transform duration-300
  hover:scale-110 hover:rotate-12
`

const TargetAudienceTitle = tw.h4`
  font-black text-lg md:text-xl lg:text-2xl text-gray-900
  tracking-tight
`

const TargetAudienceContent = tw.div`
  flex flex-col gap-4 md:gap-5
`

const TargetAudienceList = tw.div`
  flex flex-col gap-2.5 md:gap-3
`

const TargetAudienceListTitle = tw.h5`
  font-black text-xs md:text-sm uppercase tracking-widest text-gray-800 mb-4
`

const TargetAudienceItem = tw.div`
  flex items-start gap-3.5 md:gap-4 text-sm md:text-base leading-relaxed
  p-2 rounded-lg
  transition-all duration-300
  hover:bg-white/50
  hover:translate-x-1
`

const TargetAudienceBullet = tw.span`
  w-7 h-7 md:w-8 md:h-8 rounded-xl
  flex items-center justify-center
  font-black text-base shrink-0
  shadow-[0_2px_8px_rgba(0,0,0,0.1)]
  transition-all duration-300
  hover:scale-110 hover:rotate-6
`

const TargetAudienceText = tw.span`
  flex-1 leading-relaxed font-medium
`

// Cost Summary Section
const CostSummarySection = tw.div`
  rounded-3xl border-2 border-blue-200/60 p-6 md:p-8
  shadow-[0_8px_30px_rgba(59,130,246,0.12)]
  bg-linear-to-br from-blue-50/80 via-indigo-50/60 to-purple-50/80
  backdrop-blur-md
  mb-8 md:mb-10
  relative
  overflow-hidden
  before:absolute before:inset-0 before:bg-linear-to-br before:from-white/40 before:via-transparent before:to-transparent
  after:absolute after:top-0 after:right-0 after:w-32 after:h-32 after:bg-linear-to-br after:from-blue-200/20 after:to-transparent after:rounded-full after:blur-3xl
`

const CostSummaryHeader = tw.div`
  flex items-center gap-4 mb-6
`

const CostSummaryIcon = tw.div`
  flex h-12 w-12 items-center justify-center rounded-xl shadow-md
  bg-linear-to-br from-blue-500 to-indigo-600 text-white
`

const CostSummaryTitle = tw.h4`
  font-black text-lg md:text-xl lg:text-2xl text-gray-900
  tracking-tight
`

const CostSummaryGrid = tw.div`
  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-6
`

const CostSummaryCard = tw.div`
  bg-white/80 backdrop-blur-sm p-5 md:p-6 rounded-2xl
  border border-gray-200/60
  hover:border-blue-400/60
  hover:shadow-[0_8px_25px_rgba(59,130,246,0.15)]
  hover:bg-white/90
  transition-all duration-400 ease-out
`

const CostSummaryCardLabel = tw.div`
  text-xs md:text-sm text-gray-500 font-extrabold mb-2 uppercase tracking-widest
`

const CostSummaryCardValue = tw.div`
  text-xl md:text-2xl font-black
  bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent
`

// Cost Breakdown Section
const CostBreakdownSection = tw.div`
  mt-6 pt-6 border-t border-gray-200/60
`

const CostBreakdownTitle = tw.h5`
  font-black text-sm md:text-base uppercase tracking-widest text-gray-800 mb-4
`

const CostBreakdownBars = tw.div`
  space-y-4
`

const CostBreakdownBar = tw.div`
  space-y-2
`

const CostBreakdownBarLabel = tw.div`
  text-xs md:text-sm text-gray-600 font-semibold
  flex items-center justify-between
`

const CostBreakdownBarContainer = tw.div`
  relative h-8 bg-gray-100 rounded-lg overflow-hidden
  flex items-center
`

const CostBreakdownBarFill = tw.div`
  absolute left-0 top-0 h-full rounded-lg
  transition-all duration-500 ease-out
  shadow-sm
`

const CostBreakdownBarValue = tw.span`
  absolute right-3 text-xs md:text-sm font-bold text-gray-700
  z-10
`

// Payment Schedule Section
const PaymentScheduleSection = tw.div`
  space-y-4
`

const PaymentScheduleHeader = tw.div`
  flex items-center gap-2 mb-3
`

const PaymentScheduleIcon = tw.div`
  flex h-5 w-5 items-center justify-center text-gray-500
`

const PaymentScheduleTitle = tw.h4`
  font-medium text-sm text-gray-900
  flex-1
`

const PaymentScheduleTableWrapper = tw.div`
  overflow-x-auto
  border border-gray-200 rounded
`

const PaymentScheduleTable = tw.table`
  w-full
  border-collapse
`

const PaymentScheduleTableHead = tw.thead`
  bg-gray-50
`

const PaymentScheduleTableBody = tw.tbody`
  divide-y divide-gray-200
`

const PaymentScheduleTableRow = tw.tr`
  hover:bg-gray-50
`

const PaymentScheduleTableHeader = tw.th`
  px-4 py-3 text-left text-sm font-medium text-gray-700
  border-b border-gray-200
  sm:px-6
`

const PaymentScheduleTableCell = tw.td`
  px-4 py-3 text-sm text-gray-900
  border-b border-gray-100
  sm:px-6
`

// Payment Charts
const PaymentChartsWrapper = tw.div`
  mt-8 space-y-6
`

const PaymentChartCard = tw.div`
  bg-white rounded-lg border border-gray-200 p-4
  transition-all duration-200
  hover:shadow-md hover:-translate-y-0.5 hover:border-gray-300
`

const ModalButton = tw.button`
  flex items-center gap-2 px-3 py-1.5 text-xs font-medium
  text-gray-700 bg-gray-100 rounded border border-gray-300
  hover:bg-gray-200 transition-colors
  cursor-pointer
`

const PaymentChartContainer = tw.div`
  relative h-64 md:h-80 w-full
`

// Modal components
const ModalOverlay = tw.div`
  fixed inset-0 z-50 flex items-center justify-center
  p-4
`

const ModalContent = tw.div`
  bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh]
  flex flex-col
`

const ModalHeader = tw.div`
  flex items-center justify-between p-4 border-b border-gray-200
`

const ModalTitle = tw.h3`
  font-semibold text-sm text-gray-900
`

const ModalCloseButton = tw.button`
  p-1 text-gray-400 hover:text-gray-600 transition-colors
  cursor-pointer
`

const ModalBody = tw.div`
  overflow-y-auto p-4
`
