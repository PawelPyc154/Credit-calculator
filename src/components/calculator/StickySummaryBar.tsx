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
        <MetricsGrid>
          <MetricBox>
            <MetricLabel>Kwota kredytu</MetricLabel>
            <MetricValue>{formatCurrency(formData.loanAmount)}</MetricValue>
          </MetricBox>
          <MetricBox>
            <MetricLabel>Okres kredytowania</MetricLabel>
            <MetricValue>{formData.loanPeriod} lat</MetricValue>
          </MetricBox>
          <MetricBox>
            <MetricLabel>Wkład własny</MetricLabel>
            <MetricValue>
              {formatCurrency(formData.downPayment)} ({downPaymentPercent}%)
            </MetricValue>
          </MetricBox>
          <MetricBox>
            <MetricLabel>Dochód miesięczny</MetricLabel>
            <MetricValue>{formatCurrency(formData.monthlyIncome)}</MetricValue>
          </MetricBox>
        </MetricsGrid>
        <EditButton onClick={onEditClick}>
          <EditIcon>
            <svg
              width="20"
              height="20"
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
  bg-gradient-to-r from-green-600 to-emerald-600
  text-white
  shadow-lg
  z-40
  animate-in slide-in-from-top duration-300
`

const StickyContent = tw.div`
  mx-auto max-w-7xl
  px-4 sm:px-6 lg:px-8
  py-3 sm:py-4
  flex flex-col sm:flex-row
  items-start sm:items-center
  gap-4 sm:gap-6
`

const MetricsGrid = tw.div`
  grid grid-cols-2 lg:grid-cols-4
  gap-3 sm:gap-4
  flex-1
  w-full sm:w-auto
`

const MetricBox = tw.div`
  bg-white/10
  backdrop-blur-sm
  rounded-lg
  p-2 sm:p-3
  border border-white/20
`

const MetricLabel = tw.div`
  text-xs
  text-green-50/90
  mb-1
`

const MetricValue = tw.div`
  text-sm sm:text-base md:text-lg
  font-bold
`

const EditButton = tw.button`
  flex items-center justify-center gap-2
  bg-white
  hover:bg-white/90
  text-green-600
  rounded-lg
  px-4 py-2.5
  text-sm font-semibold
  transition-all duration-200
  hover:scale-105
  active:scale-95
  whitespace-nowrap
  shrink-0
  w-full sm:w-auto
`

const EditIcon = tw.span`
  flex items-center justify-center
  w-5 h-5
`

const EditButtonText = tw.span`text-sm font-semibold`
