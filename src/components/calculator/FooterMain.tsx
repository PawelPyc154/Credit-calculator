'use client'

import { CookieSettingsTrigger } from 'components/common/CookieSettingsTrigger'
import Link from 'next/link'
import tw from 'tw-tailwind'

export const FooterMain = () => {
  const currentYear = new Date().getFullYear()

  return (
    <FooterSection>
      <FooterContainer>
        <FooterTop>
          <BrandSection>
            <Brand>Kalkulator Kredytowy</Brand>
            <BrandDescription>
              Porównaj oferty kredytów hipotecznych i znajdź najlepszą dla siebie
            </BrandDescription>
          </BrandSection>

          <LinksSection>
            <LinksGroup>
              <LinksTitle>Nawigacja</LinksTitle>
              <LinksList>
                <LinkItem>
                  <FooterLink href="/kalkulator/kredyt-hipoteczny">Kalkulator</FooterLink>
                </LinkItem>
                <LinkItem>
                  <FooterLink href="/blog">Blog</FooterLink>
                </LinkItem>
                <LinkItem>
                  <FooterLink href="/kontakt">Kontakt</FooterLink>
                </LinkItem>
              </LinksList>
            </LinksGroup>

            <LinksGroup>
              <LinksTitle>Informacje</LinksTitle>
              <LinksList>
                <LinkItem>
                  <FooterLink href="/regulamin">Regulamin</FooterLink>
                </LinkItem>
                <LinkItem>
                  <FooterLink href="/polityka-prywatnosci">Polityka prywatności</FooterLink>
                </LinkItem>
                <LinkItem>
                  <CookieSettingsTrigger className="text-sm text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                    Preferencje cookies
                  </CookieSettingsTrigger>
                </LinkItem>
              </LinksList>
            </LinksGroup>
          </LinksSection>
        </FooterTop>

        <FooterBottom>
          <InfoLine>Orientacyjne wyliczenia na podstawie podanych parametrów.</InfoLine>
          <Copyright>© {currentYear} Kalkulator Kredytowy. Wszelkie prawa zastrzeżone.</Copyright>
        </FooterBottom>
      </FooterContainer>
    </FooterSection>
  )
}

const FooterSection = tw.footer`
  w-full
  border-t border-gray-200
  bg-gradient-to-b from-white to-gray-50
`

const FooterContainer = tw.div`
  mx-auto
  max-w-7xl
  px-4 sm:px-6 lg:px-8
  pt-6 lg:pt-8
  pb-2 lg:pb-3
`

const FooterTop = tw.div`
  grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12
  mb-6 lg:mb-8
`

const BrandSection = tw.div`
  flex flex-col gap-3
`

const Brand = tw.h3`
  text-xl font-bold text-gray-900
  tracking-tight
`

const BrandDescription = tw.p`
  text-sm text-gray-600
  max-w-md
  leading-relaxed
`

const LinksSection = tw.div`
  grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8
`

const LinksGroup = tw.div`
  flex flex-col gap-3
`

const LinksTitle = tw.h4`
  text-sm font-semibold text-gray-900
  uppercase tracking-wide
`

const LinksList = tw.ul`
  flex flex-col gap-2.5
  list-none
  m-0
  p-0
`

const LinkItem = tw.li`
  m-0
  p-0
`

const FooterLink = tw(Link)`
  text-sm text-gray-600
  hover:text-emerald-600
  transition-colors duration-200
  inline-block
`

const FooterBottom = tw.div`
  border-t border-gray-200
  pt-3
  flex flex-col gap-1.5
  items-center
  text-center
`

const InfoLine = tw.p`
  text-xs text-gray-500
  max-w-2xl
`

const Copyright = tw.p`
  text-xs text-gray-400
`
