'use client'

import Link from 'next/link'
import tw from 'tw-tailwind'

export const FooterMain = () => {
  const currentYear = new Date().getFullYear()

  return (
    <FooterSection>
      <FooterContent>
        <Brand>Kalkulator Kredytowy</Brand>
        <InfoLine>Orientacyjne wyliczenia na podstawie podanych parametrów.</InfoLine>
        <Links>
          <FooterLink href="/regulamin">Regulamin</FooterLink>
          <Separator>•</Separator>
          <FooterLink href="/polityka-prywatnosci">Polityka prywatności</FooterLink>
          <Separator>•</Separator>
          <FooterLink href="/zagrozenia-kredytowe">Zagrożenia kredytowe</FooterLink>
          <Separator>•</Separator>
          <FooterLink href="/kontakt">Kontakt</FooterLink>
        </Links>
        <Copyright>© {currentYear} Kalkulator Kredytowy</Copyright>
      </FooterContent>
    </FooterSection>
  )
}

const FooterSection = tw.footer`w-full border-t border-gray-200 bg-white`

const FooterContent = tw.div`
  mx-auto
  flex flex-col
  items-center
  gap-3
  px-4 sm:px-6
  py-8
  text-center
  text-sm text-gray-500
  max-w-4xl
`

const Brand = tw.span`text-base font-semibold text-gray-900`

const InfoLine = tw.p`text-sm text-gray-500`

const Links = tw.div`flex flex-wrap items-center justify-center gap-2 text-sm text-gray-500`

const FooterLink = tw(Link)`hover:text-gray-700 transition-colors`

const Separator = tw.span`text-gray-300`

const Copyright = tw.span`text-xs text-gray-400`
