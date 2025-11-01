'use client'
import clsx from 'clsx'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import tw from 'tw-tailwind'

export type GoogleAdUnitProps = {
  children: React.ReactNode
}

declare global {
  interface Window {
    adsbygoogle?: any | any[]
  }
}

export const GoogleAdUnitClient: React.FC<GoogleAdUnitProps> = ({ children }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  // biome-ignore lint/correctness/useExhaustiveDependencies: none
  React.useEffect(() => {
    try {
      // biome-ignore lint/suspicious/noAssignInExpressions:none
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error(err)
    }
  }, [pathname, searchParams])
  return <>{children}</>
}

const sizes = {
  small: tw`h-24 max-h-24`,
  base: tw`h-80 max-h-80`,
  high: tw`h-[1000px] max-h-80`,
}

interface InsBarProps {
  size?: keyof typeof sizes
}
export const InsBar = ({ size = 'base' }: InsBarProps) => (
  <GoogleAdUnitClient>
    <ins
      className={clsx('adsbygoogle mx-auto block w-full max-w-5xl text-center', sizes[size])}
      data-ad-client="ca-pub-5433483853998472"
      data-ad-slot="1569651827"
    />
  </GoogleAdUnitClient>
)
