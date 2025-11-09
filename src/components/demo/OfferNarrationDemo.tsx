'use client'

import { type NarrationOffer, OfferNarration } from 'components/calculator/narration/OfferNarration'
import tw from 'tw-tailwind'

const demoOffer: NarrationOffer = {
  bankId: 'demo-001',
  bankName: 'Bank Demo',
  loanAmount: 120_000,
  loanPeriodYears: 7,
  loanTermMonths: 84,
  monthlyPayment: 1897.32,
  interestRate: 7.2,
  apr: 8.1,
  commission: 1200,
  totalCost: 159_371.88,
  totalInterest: 19_371.88,
  insurance: 2400,
  benefits: [
    'Pierwszy rok karty kredytowej gratis',
    'Możliwość wakacji kredytowych raz w roku',
    'Pakiet darmowych przelewów w koncie osobistym',
  ],
}

export function OfferNarrationDemo() {
  return (
    <DemoWrapper>
      <OfferNarration offer={demoOffer} />
    </DemoWrapper>
  )
}

const DemoWrapper = tw.div`rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-xl shadow-slate-200/60`
