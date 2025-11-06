import tw from 'tw-tailwind'

export type RankingSectionHeaderProps = {
  resultsCount: number
}

export const RankingSectionHeader = ({ resultsCount }: RankingSectionHeaderProps) => {
  return (
    <SectionHeader>
      <IconWrapper>
        <SectionIcon>🏆</SectionIcon>
      </IconWrapper>

      <TitleWrapper>
        <SectionTitle>Najlepsze oferty dopasowane do Twoich potrzeb</SectionTitle>
        <SectionSubtitle>
          Przeanalizowaliśmy <ResultsCount>{resultsCount} ofert</ResultsCount> i wybraliśmy
          najkorzystniejsze dla Ciebie
        </SectionSubtitle>
      </TitleWrapper>

      <PriorityInfoCard>
        <CardGradientBg />
        <CardContent>
          <PriorityTitleWrapper>
            <PriorityEmoji>🎯</PriorityEmoji>
            <PriorityTitle>Na co zwrócić uwagę w pierwszej kolejności</PriorityTitle>
          </PriorityTitleWrapper>

          <PriorityGrid>
            <PriorityCard>
              <PriorityBadge className="bg-gradient-to-br from-green-500 to-emerald-600">
                <BadgeNumber>1</BadgeNumber>
              </PriorityBadge>
              <PriorityContent>
                <PriorityLabel>Miesięczna rata</PriorityLabel>
                <PriorityDescription>
                  Sprawdź, czy rata mieści się komfortowo w Twoim miesięcznym budżecie
                </PriorityDescription>
              </PriorityContent>
            </PriorityCard>

            <PriorityCard>
              <PriorityBadge className="bg-gradient-to-br from-blue-500 to-indigo-600">
                <BadgeNumber>2</BadgeNumber>
              </PriorityBadge>
              <PriorityContent>
                <PriorityLabel>Całkowity koszt kredytu</PriorityLabel>
                <PriorityDescription>
                  Zobacz, ile rzeczywiście zapłacisz przez cały okres kredytowania
                </PriorityDescription>
              </PriorityContent>
            </PriorityCard>

            <PriorityCard>
              <PriorityBadge className="bg-gradient-to-br from-amber-500 to-orange-600">
                <BadgeNumber>3</BadgeNumber>
              </PriorityBadge>
              <PriorityContent>
                <PriorityLabel>Oprocentowanie</PriorityLabel>
                <PriorityDescription>
                  Im niższe oprocentowanie, tym mniej zapłacisz odsetek
                </PriorityDescription>
              </PriorityContent>
            </PriorityCard>
          </PriorityGrid>
        </CardContent>
      </PriorityInfoCard>
    </SectionHeader>
  )
}

const SectionHeader = tw.div`
  text-center mb-8 md:mb-12 lg:mb-16
  animate-in fade-in slide-in-from-bottom-4
  duration-700
`

const IconWrapper = tw.div`
  inline-flex items-center justify-center
  mb-4 md:mb-6
`

const SectionIcon = tw.span`
  text-5xl md:text-6xl lg:text-7xl
  animate-in zoom-in
  duration-500
  inline-block
  drop-shadow-lg
`

const TitleWrapper = tw.div`mb-8 md:mb-10`

const SectionTitle = tw.h2`
  text-3xl md:text-4xl lg:text-5xl 
  font-bold 
  bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900
  bg-clip-text text-transparent
  mb-3 md:mb-4
  leading-tight
  px-4
`

const SectionSubtitle = tw.p`
  text-gray-600 
  text-base md:text-lg lg:text-xl
  max-w-2xl mx-auto
  px-4
`

const ResultsCount = tw.span`
  font-bold 
  text-blue-600
  px-1
`

const PriorityInfoCard = tw.div`
  relative
  mt-8 md:mt-10 lg:mt-12
  rounded-2xl md:rounded-3xl
  overflow-hidden
  max-w-5xl 
  mx-auto
  shadow-xl
  border border-gray-200/50
`

const CardGradientBg = tw.div`
  absolute inset-0
  bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50
  opacity-60
`

const CardContent = tw.div`
  relative
  p-6 md:p-8 lg:p-10
  backdrop-blur-sm
`

const PriorityTitleWrapper = tw.div`
  flex items-center justify-center gap-3
  mb-6 md:mb-8
`

const PriorityEmoji = tw.span`
  text-3xl md:text-4xl
  animate-in zoom-in
  duration-500
  delay-300
`

const PriorityTitle = tw.h3`
  text-xl md:text-2xl lg:text-3xl
  font-bold 
  text-gray-900
`

const PriorityGrid = tw.div`
  grid grid-cols-1 md:grid-cols-3 
  gap-4 md:gap-5 lg:gap-6
`

const PriorityCard = tw.div`
  bg-white/80 
  backdrop-blur-md
  rounded-xl md:rounded-2xl
  p-5 md:p-6
  border border-gray-200/50
  shadow-sm
  hover:shadow-lg
  transition-all duration-300
  hover:scale-105
  hover:-translate-y-1
  group
`

const PriorityBadge = tw.div`
  w-12 h-12 md:w-14 md:h-14
  rounded-full
  flex items-center justify-center
  shadow-lg
  mb-4
  group-hover:scale-110
  transition-transform duration-300
`

const BadgeNumber = tw.span`
  text-white 
  font-bold 
  text-xl md:text-2xl
`

const PriorityContent = tw.div`
  text-left
`

const PriorityLabel = tw.h4`
  font-bold 
  text-gray-900
  text-base md:text-lg
  mb-2
`

const PriorityDescription = tw.p`
  text-gray-600
  text-sm md:text-base
  leading-relaxed
`
