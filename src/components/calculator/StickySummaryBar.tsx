'use client'

import { useEffect, useRef, useState } from 'react'
import tw from 'tw-tailwind'
import { formatCurrency } from 'utils/calculator'

export type StickySummaryBarProps = {
  formData: {
    loanAmount: number
    loanPeriod: number
    downPayment: number
    monthlyIncome: number
  }
  onEditClick: () => void
}

export const StickySummaryBar = ({ formData, onEditClick }: StickySummaryBarProps) => {
  const [isSticky, setIsSticky] = useState(false)
  const [navHeight, setNavHeight] = useState(64)
  const lastCheckRef = useRef<number>(0)

  useEffect(() => {
    // Zmierz wysokość nawigacji
    const nav = document.querySelector('nav')
    if (nav) {
      setNavHeight(nav.offsetHeight)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now()
      if (now - lastCheckRef.current < 100) {
        return
      }
      lastCheckRef.current = now

      // Sprawdź pozycję sekcji z wynikami
      const resultsSection = document.getElementById('results')
      const calculatorSection = document.getElementById('calculator')

      if (!resultsSection || !calculatorSection) {
        setIsSticky(false)
        return
      }

      const resultsTop = resultsSection.getBoundingClientRect().top
      const resultsBottom = resultsSection.getBoundingClientRect().bottom
      const calculatorBottom = calculatorSection.getBoundingClientRect().bottom
      const scrollY = window.scrollY || window.pageYOffset

      // Pasek powinien być widoczny gdy:
      // 1. Formularz (calculator) już zniknął (calculatorBottom < navHeight)
      // 2. Użytkownik scrolluje w dół (scrollY > 100px - nie na samej górze)
      // 3. Sekcja results jest widoczna lub była widoczna (resultsBottom > 0 lub resultsTop < window.innerHeight)
      // Pasek pozostaje widoczny przez cały czas gdy scrollujemy przez wyniki

      const formularzZniknal = calculatorBottom < navHeight
      const scrollujeWDol = scrollY > 100
      const wSekcjiWynikow = resultsBottom > 0 || resultsTop < window.innerHeight

      const shouldShow = formularzZniknal && scrollujeWDol && wSekcjiWynikow

      setIsSticky(shouldShow)
    }

    handleScroll() // Sprawdź na początku
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [navHeight])

  // Oblicz procent wkładu własnego
  const propertyValue = formData.loanAmount + formData.downPayment
  const downPaymentPercent =
    propertyValue > 0 ? Math.round((formData.downPayment / propertyValue) * 100) : 0

  if (!isSticky) {
    return null
  }

  return (
    <StickyBar style={{ top: `0px`, position: 'fixed' }}>
      <StickyContent>
        <MetricsRow>
          <MetricChip>
            <MetricLabel>Kwota:</MetricLabel>
            <MetricValue>{formatCurrency(formData.loanAmount)}</MetricValue>
          </MetricChip>
          <MetricChip>
            <MetricLabel>Okres:</MetricLabel>
            <MetricValue>{formData.loanPeriod} lat</MetricValue>
          </MetricChip>
          <MetricChip>
            <MetricLabel>Wkład:</MetricLabel>
            <MetricValue>
              {formatCurrency(formData.downPayment)}
              <PercentText> ({downPaymentPercent}%)</PercentText>
            </MetricValue>
          </MetricChip>
          <MetricChip>
            <MetricLabel>Dochód:</MetricLabel>
            <MetricValue>{formatCurrency(formData.monthlyIncome)}</MetricValue>
          </MetricChip>
        </MetricsRow>
        <EditButton onClick={onEditClick}>
          <EditIcon>
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>Edytuj</title>
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </EditIcon>
          <EditButtonText>Zmień parametry</EditButtonText>
        </EditButton>
      </StickyContent>
    </StickyBar>
  )
}

const StickyBar = tw.div`
  fixed left-0 right-0
  bg-linear-to-r from-green-600 to-emerald-600
  text-white
  shadow-lg
  z-40
  animate-in slide-in-from-top duration-300
`

const StickyContent = tw.div`
  mx-auto max-w-7xl
  px-2 sm:px-4 lg:px-6
  py-2 sm:py-3
  flex items-center justify-between
  gap-2 sm:gap-3
  overflow-hidden
`

const MetricsRow = tw.div`
  flex items-center
  gap-1 sm:gap-2
  flex-1
  text-xs sm:text-sm
  min-w-0
  overflow-hidden
`

const MetricChip = tw.div`
  flex flex-col
  gap-0.5
  bg-white/10
  backdrop-blur-sm
  rounded-md sm:rounded-lg
  px-1.5 py-1 sm:px-2.5 sm:py-1.5
  border border-white/20
  shrink-0
`

const MetricLabel = tw.span`
  text-[9px] sm:text-xs
  text-green-50/90
  font-medium
  leading-tight
`

const MetricValue = tw.span`
  text-xs sm:text-sm md:text-base
  font-bold
  text-white
  leading-tight
`

const PercentText = tw.span`
  hidden sm:inline
`

const EditButton = tw.button`
  flex items-center justify-center
  gap-0 xl:gap-2
  bg-white
  hover:bg-white/90
  text-green-600
  rounded-md sm:rounded-lg
  w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12
  xl:w-auto xl:h-auto xl:px-4 xl:py-2
  text-xs sm:text-sm font-semibold
  transition-all duration-200
  hover:scale-105
  active:scale-95
  shrink-0
`

const EditIcon = tw.span`
  flex items-center justify-center
`

const EditButtonText = tw.span`hidden xl:inline text-sm font-semibold`
