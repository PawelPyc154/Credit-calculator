'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'
import tw from 'tw-tailwind'

export type BankLogoProps = {
  src: string
  alt: string
  bankName: string
  size?: 'sm' | 'md' | 'lg'
  priority?: boolean
  className?: string
}

const sizeConfigs = {
  sm: { wrapper: 'w-16 h-16', image: 64, text: 'text-lg' },
  md: { wrapper: 'w-24 h-24 md:w-28 md:h-28', image: 112, text: 'text-2xl' },
  lg: { wrapper: 'w-32 h-32', image: 128, text: 'text-3xl' },
}

const gradientColors = [
  'bg-gradient-to-br from-blue-500 to-blue-600',
  'bg-gradient-to-br from-green-500 to-green-600',
  'bg-gradient-to-br from-purple-500 to-purple-600',
  'bg-gradient-to-br from-orange-500 to-orange-600',
  'bg-gradient-to-br from-red-500 to-red-600',
  'bg-gradient-to-br from-indigo-500 to-indigo-600',
  'bg-gradient-to-br from-pink-500 to-pink-600',
  'bg-gradient-to-br from-teal-500 to-teal-600',
]

/**
 * Komponent wyświetlający logo banku z fallbackiem do inicjałów
 * Jeśli obraz się nie załaduje, wyświetli kolorowe koło z inicjałami banku
 */
export const BankLogo = ({
  src,
  alt,
  bankName,
  size = 'md',
  priority = false,
  className,
}: BankLogoProps) => {
  const [imageError, setImageError] = useState(false)
  const sizeConfig = sizeConfigs[size]

  // Funkcja do generowania inicjałów z nazwy banku
  const getInitials = (name: string): string => {
    const words = name.split(' ')
    if (words.length === 1) {
      return (words[0]?.substring(0, 2) || '').toUpperCase()
    }
    return words
      .slice(0, 2)
      .map((word) => word[0])
      .join('')
      .toUpperCase()
  }

  // Funkcja do wyboru koloru na podstawie nazwy banku (deterministyczna)
  const getColorForBank = (name: string) => {
    const hash = name.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc)
    }, 0)
    return gradientColors[Math.abs(hash) % gradientColors.length] ?? gradientColors[0]
  }

  const initials = getInitials(bankName)
  const colorClass = getColorForBank(bankName)

  return (
    <LogoWrapper className={clsx(sizeConfig.wrapper, className)}>
      {!imageError ? (
        <Image
          src={src}
          alt={alt}
          width={sizeConfig.image}
          height={sizeConfig.image}
          className="object-contain"
          priority={priority}
          onError={() => setImageError(true)}
        />
      ) : (
        <FallbackWrapper className={colorClass}>
          <Initials className={sizeConfig.text}>{initials}</Initials>
        </FallbackWrapper>
      )}
    </LogoWrapper>
  )
}

const LogoWrapper = tw.div`
  flex items-center justify-center
  bg-white rounded-lg
  p-2
  overflow-hidden
`

const FallbackWrapper = tw.div`
  w-full h-full
  flex items-center justify-center
  rounded-lg
  shadow-inner
`

const Initials = tw.span`
  font-bold text-white
  select-none
`
