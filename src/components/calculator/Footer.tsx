import Link from 'next/link'
import tw from 'tw-tailwind'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <FooterSection>
      <FooterContent>
        <BrandSection>
          <Logo>
            <LogoIcon>🏦</LogoIcon>
            <LogoText>
              <LogoTitle>Kalkulator Kredytowy</LogoTitle>
              <LogoSubtitle>Znajdź najlepszą ofertę kredytu</LogoSubtitle>
            </LogoText>
          </Logo>
          <Description>
            Porównuj oferty kredytowe z różnych banków i znajdź rozwiązanie idealnie dopasowane do
            Twoich potrzeb finansowych.
          </Description>
        </BrandSection>

        <LinksSection>
          <LinksColumn>
            <ColumnTitle>Informacje</ColumnTitle>
            <LinksList>
              <LinkItem>
                <FooterLink href="/regulamin">Regulamin</FooterLink>
              </LinkItem>
              <LinkItem>
                <FooterLink href="/polityka-prywatnosci">Polityka prywatności</FooterLink>
              </LinkItem>
              <LinkItem>
                <FooterLink href="/kontakt">Kontakt</FooterLink>
              </LinkItem>
            </LinksList>
          </LinksColumn>

          <LinksColumn>
            <ColumnTitle>Przydatne linki</ColumnTitle>
            <LinksList>
              <LinkItem>
                <FooterLink href="/#kalkulator">Kalkulator</FooterLink>
              </LinkItem>
              <LinkItem>
                <FooterLink href="/#ranking">Ranking banków</FooterLink>
              </LinkItem>
            </LinksList>
          </LinksColumn>
        </LinksSection>

        <Divider />

        <BottomSection>
          <Copyright>© {currentYear} Kalkulator Kredytowy. Wszystkie prawa zastrzeżone.</Copyright>
          <SocialLinks>
            <SocialText>Śledź nas:</SocialText>
            <SocialIconsContainer>
              <SocialLink href="#" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <title>Facebook</title>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <title>Twitter</title>
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </SocialLink>
              <SocialLink href="#" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <title>LinkedIn</title>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </SocialLink>
            </SocialIconsContainer>
          </SocialLinks>
        </BottomSection>
      </FooterContent>
    </FooterSection>
  )
}

const FooterSection = tw.footer`
  w-full 
  bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
  text-white 
  pt-16 pb-8 
  mt-16
  border-t border-slate-700
`

const FooterContent = tw.div`
  max-w-6xl mx-auto px-4
  flex flex-col gap-12
`

const BrandSection = tw.div`
  flex flex-col gap-4
  max-w-md
`

const Logo = tw.div`
  flex gap-4 items-center
`

const LogoIcon = tw.div`
  text-4xl md:text-5xl
  filter drop-shadow-lg
`

const LogoText = tw.div`flex flex-col`

const LogoTitle = tw.h2`
  text-xl md:text-2xl font-bold
  bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent
`

const LogoSubtitle = tw.p`
  text-sm text-gray-400
`

const Description = tw.p`
  text-sm md:text-base text-gray-400 leading-relaxed
`

const LinksSection = tw.div`
  grid grid-cols-2 md:grid-cols-2 gap-8 md:gap-12
`

const LinksColumn = tw.div`flex flex-col gap-4`

const ColumnTitle = tw.h3`
  text-base md:text-lg font-semibold text-white
  mb-2
`

const LinksList = tw.ul`flex flex-col gap-3`

const LinkItem = tw.li``

const FooterLink = tw(Link)`
  text-sm md:text-base text-gray-400 
  hover:text-white hover:translate-x-1
  transition-all duration-200
  inline-block
`

const Divider = tw.hr`
  border-slate-700
  my-4
`

const BottomSection = tw.div`
  flex flex-col md:flex-row 
  justify-between items-center 
  gap-6
`

const Copyright = tw.p`
  text-sm text-gray-400
  text-center md:text-left
`

const SocialLinks = tw.div`
  flex items-center gap-4
`

const SocialText = tw.span`
  text-sm text-gray-400
`

const SocialIconsContainer = tw.div`
  flex gap-3
`

const SocialLink = tw.a`
  w-9 h-9
  bg-slate-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600
  rounded-full
  flex items-center justify-center
  transition-all duration-300
  hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50
  group
  
  svg {
    w-4 h-4
    text-gray-400 group-hover:text-white
    transition-colors duration-300
  }
`
