import tw from 'tw-tailwind'

export const Disclaimer = () => {
  return (
    <DisclaimerWrapper>
      <DisclaimerContainer>
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
              <title>Ostrzeżenie</title>
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
              wstępnego porównania ofert. Ostateczna oferta kredytu, w tym oprocentowanie, prowizje
              i inne warunki, zależy od indywidualnej oceny bankowej i może się różnić od
              prezentowanych wyników.
            </DisclaimerText>
            <DisclaimerText>
              Zalecamy bezpośredni kontakt z bankiem w celu uzyskania szczegółowej oferty
              dostosowanej do Twojej sytuacji.
            </DisclaimerText>
          </DisclaimerContent>
        </DisclaimerBox>
      </DisclaimerContainer>
    </DisclaimerWrapper>
  )
}

const DisclaimerWrapper = tw.section`w-full`

const DisclaimerContainer = tw.div`
  mx-auto w-full max-w-6xl
  flex flex-col gap-6 sm:gap-8
`

const RememberBox = tw.div`
  flex flex-col items-start gap-4 sm:gap-5 md:flex-row md:gap-6
  rounded-2xl sm:rounded-3xl
  border border-blue-200
  bg-linear-to-br from-blue-50 to-indigo-50 
  p-6 sm:p-7 md:p-8
  shadow-sm 
  backdrop-blur-sm
  transition-all duration-300
  hover:shadow-md
`

const RememberIcon = tw.span`shrink-0 animate-pulse text-4xl sm:text-5xl`

const RememberContent = tw.div`w-full flex-1`

const RememberTitle = tw.h3`
  mb-3 sm:mb-4
  text-xl font-bold sm:text-2xl
  bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent
`

const RememberText = tw.p`text-sm leading-relaxed text-gray-700 sm:text-base`

const DisclaimerBox = tw.div`
  flex flex-col items-start gap-4 sm:gap-5 md:flex-row md:gap-6
  rounded-2xl sm:rounded-3xl
  border border-amber-300
  bg-linear-to-br from-amber-50 to-yellow-50
  p-6 sm:p-7 md:p-8
  shadow-sm 
  backdrop-blur-sm
  transition-all duration-300
  hover:shadow-md
`

const WarningIcon = tw.div`
  flex h-10 w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12
  rounded-full
  bg-amber-100
  text-amber-600
  shadow-sm
`

const DisclaimerContent = tw.div`w-full flex-1`

const DisclaimerTitle = tw.h3`mb-3 text-xl font-bold text-gray-900 sm:mb-4 sm:text-2xl`

const DisclaimerText = tw.p`
  mb-3 text-sm leading-relaxed text-gray-700 last:mb-0 sm:text-base
`

const Strong = tw.strong`font-semibold text-gray-900`
