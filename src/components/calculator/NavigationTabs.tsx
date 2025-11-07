'use client'

import tw from 'tw-tailwind'

export type TabType = 'hipoteczny' | 'gotowkowy' | 'refinansowanie'

export type NavigationTabsProps = {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export const NavigationTabs = ({ activeTab, onTabChange }: NavigationTabsProps) => {
  return (
    <NavContainer>
      <NavContent>
        <NavLogo>
          <LogoIcon>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>Kalkulator</title>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18M3 9h18" />
            </svg>
          </LogoIcon>
          <LogoText>Kalkulator kredytu hipotecznego</LogoText>
        </NavLogo>
      </NavContent>
    </NavContainer>
  )
}

const NavContainer = tw.nav`
  w-full
  bg-white
  border-b border-gray-200
  shadow-sm
  sticky top-0
  z-50
  relative
`

const NavContent = tw.div`
  mx-auto max-w-7xl
  px-4 sm:px-6 lg:px-8
  py-4
  flex items-center justify-between
`

const NavLogo = tw.div`
  flex items-center gap-2
`

const LogoIcon = tw.span`
  flex items-center justify-center
  w-6 h-6
  text-green-600
`

const LogoText = tw.span`
  text-lg font-bold
  text-gray-900
`

