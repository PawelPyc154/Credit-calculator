import tw from 'tw-tailwind'

export const Disclaimer = () => {
  return (
    <DisclaimerSection>
      <RememberBox>
        <RememberIcon>💡</RememberIcon>
        <RememberContent>
          <RememberTitle>Pamiętaj!</RememberTitle>
          <RememberText>
            Powyższe wyliczenia są orientacyjne. Ostateczne warunki kredytu ustalisz z doradcą w
            banku. Zwróć uwagę na dodatkowe opłaty, wymagania dotyczące ubezpieczeń oraz możliwość
            wcześniejszej spłaty.
          </RememberText>
        </RememberContent>
      </RememberBox>

      <DisclaimerBox>
        <WarningIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
        </WarningIcon>
        <DisclaimerContent>
          <DisclaimerTitle>Ważne informacje</DisclaimerTitle>
          <DisclaimerText>
            Przedstawione dane mają charakter <Strong>poglądowy</Strong> i służą wyłącznie do
            wstępnego porównania ofert. Ostateczna oferta kredytu, w tym oprocentowanie, prowizje i
            inne warunki, zależy od indywidualnej oceny bankowej i może się różnić od prezentowanych
            wyników.
          </DisclaimerText>
          <DisclaimerText>
            Zalecamy bezpośredni kontakt z bankiem w celu uzyskania szczegółowej oferty dostosowanej
            do Twojej sytuacji.
          </DisclaimerText>
        </DisclaimerContent>
      </DisclaimerBox>
    </DisclaimerSection>
  )
}

const DisclaimerSection = tw.section`w-full max-w-6xl mx-auto px-4 py-12 flex flex-col gap-6`

const RememberBox = tw.div`
  bg-gradient-to-br from-blue-50 to-indigo-50 
  border border-blue-200
  rounded-2xl p-6 md:p-8
  flex flex-col md:flex-row gap-4 md:gap-6 items-start
  shadow-sm hover:shadow-md transition-all duration-300
  backdrop-blur-sm
`

const RememberIcon = tw.span`
  text-4xl md:text-5xl flex-shrink-0
  animate-pulse
`

const RememberContent = tw.div`flex-1 w-full`

const RememberTitle = tw.h3`
  text-xl md:text-2xl font-bold 
  bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent
  mb-4
`

const RememberText = tw.p`
  text-sm md:text-base text-gray-700 
  leading-relaxed
`

const DisclaimerBox = tw.div`
  bg-gradient-to-br from-amber-50 to-yellow-50
  border border-amber-300
  rounded-2xl p-6 md:p-8
  flex flex-col md:flex-row gap-4 md:gap-6 items-start
  shadow-sm hover:shadow-md transition-all duration-300
  backdrop-blur-sm
`

const WarningIcon = tw.div`
  w-10 h-10 md:w-12 md:h-12 flex-shrink-0
  text-amber-600
  bg-amber-100 rounded-full
  flex items-center justify-center
  shadow-sm
`

const DisclaimerContent = tw.div`flex-1 w-full`

const DisclaimerTitle = tw.h3`
  text-xl md:text-2xl font-bold text-gray-900 mb-4
`

const DisclaimerText = tw.p`
  text-sm md:text-base text-gray-700 
  leading-relaxed mb-3 last:mb-0
`

const Strong = tw.strong`font-semibold text-gray-900`
