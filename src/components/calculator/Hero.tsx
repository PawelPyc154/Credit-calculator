'use client'

import type { ReactNode } from 'react'
import tw from 'tw-tailwind'

export type HeroProps = {
  actionSlot?: ReactNode
}

export const Hero = ({ actionSlot }: HeroProps) => {
  return (
    <HeroWrapper>
      <HeroOuter>
        {actionSlot && <ActionSlot>{actionSlot}</ActionSlot>}
        <HeroContent>
          <Title>Kalkulator kredytowy</Title>
          <Subtitle>
            Wpisz podstawowe dane, aby otrzymać proste porównanie rat i kosztów kredytu
            hipotecznego.
          </Subtitle>
          <CtaButton
            onClick={() => {
              document
                .getElementById('calculator')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          >
            Przejdź do formularza
          </CtaButton>
        </HeroContent>
      </HeroOuter>
    </HeroWrapper>
  )
}

const HeroWrapper = tw.section`w-full bg-white border-b border-gray-200`

const HeroOuter = tw.div`
  relative
  mx-auto
  w-full
  max-w-5xl
  px-4 sm:px-6
  py-12 sm:py-16 md:py-20 lg:py-24
`

const ActionSlot = tw.div`absolute top-4 right-4 sm:top-6 sm:right-6`

const HeroContent = tw.div`flex flex-col gap-4 max-w-2xl`

const Title = tw.h1`text-3xl sm:text-4xl font-semibold text-gray-900`

const Subtitle = tw.p`text-sm sm:text-base text-gray-600 leading-relaxed`

const CtaButton = tw.button`
  inline-flex items-center justify-center
  w-fit
  rounded-full
  border border-gray-300
  bg-white
  px-5 py-2.5
  text-sm font-semibold text-gray-900
  transition-colors
  hover:border-gray-400
  focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300
`
