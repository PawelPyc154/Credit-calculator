import tw from 'tw-tailwind'
import type { ReactNode } from 'react'
import { HeroStats } from './atoms/HeroStats'

export type HeroProps = {
  actionSlot?: ReactNode
}

export const Hero = ({ actionSlot }: HeroProps) => {
  return (
    <HeroWrapper>
      <HeroSection>
        {actionSlot && <ActionSlot>{actionSlot}</ActionSlot>}
        {/* Dekoracyjne elementy tła */}
        <BackgroundOrb1 />
        <BackgroundOrb2 />
        <BackgroundOrb3 />
        <GridPattern />

        <HeroContent>
          {/* Główna ikona z animacją */}
          <IconWrapper>
            <IconPulse />
            <IconContainer>
              <Icon>🏠</Icon>
            </IconContainer>
          </IconWrapper>

          {/* Badge z informacją */}
          <TrustBadge>
            <BadgeIcon>✨</BadgeIcon>
            <BadgeText>Zaufało nam ponad 50 000 Polaków</BadgeText>
          </TrustBadge>

          {/* Główny tytuł */}
          <TitleWrapper>
            <Title>
              Znajdź <TitleAccent>najlepszy</TitleAccent>
              <br />
              kredyt hipoteczny
            </Title>
            <TitleUnderline />
          </TitleWrapper>

          {/* Podtytuł */}
          <Subtitle>
            Porównaj oferty z <SubtitleBold>15+ wiodących banków</SubtitleBold> w Polsce
            <br />i oszczędź nawet do <SubtitleHighlight>50 000 zł</SubtitleHighlight>
          </Subtitle>

          {/* Lista korzyści */}
          <BenefitsList>
            <BenefitItem>
              <BenefitIcon>✓</BenefitIcon>
              <BenefitText>Darmowa analiza</BenefitText>
            </BenefitItem>
            <BenefitItem>
              <BenefitIcon>✓</BenefitIcon>
              <BenefitText>Bez zobowiązań</BenefitText>
            </BenefitItem>
            <BenefitItem>
              <BenefitIcon>✓</BenefitIcon>
              <BenefitText>Wynik w 2 minuty</BenefitText>
            </BenefitItem>
          </BenefitsList>

          {/* CTA Button */}
          <CTAButton
            onClick={() => {
              document.getElementById('calculator')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
            }}
          >
            <ButtonContent>
              <ButtonText>Oblicz swoją ratę</ButtonText>
              <ButtonIcon>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>Strzałka w prawo</title>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </ButtonIcon>
            </ButtonContent>
            <ButtonShine />
          </CTAButton>

          {/* Statystyki */}
          <HeroStats />
        </HeroContent>

        {/* Falista dekoracja na dole */}
        <WaveDecoration>
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <title>Dekoracja falista</title>
            <path
              d="M0,64 C360,16 720,16 1080,64 C1440,112 1440,112 1440,112 L1440,0 L0,0 Z"
              fill="rgba(255,255,255,0.08)"
            />
            <path
              d="M0,80 C360,40 720,40 1080,80 C1440,120 1440,120 1440,120 L1440,120 L0,120 Z"
              fill="rgba(255,255,255,0.05)"
            />
            <path
              d="M0,96 C360,56 720,56 1080,96 C1440,136 1440,120 1440,120 L1440,120 L0,120 Z"
              fill="white"
            />
          </svg>
        </WaveDecoration>
      </HeroSection>
    </HeroWrapper>
  )
}

const HeroWrapper = tw.div`relative w-full overflow-hidden`

const HeroSection = tw.section`
  relative w-full 
  bg-linear-to-br from-blue-600 via-indigo-700 to-purple-800
  text-white 
  pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24 lg:pt-24 lg:pb-28
  px-4 sm:px-6 lg:px-8
  overflow-hidden
`

const ActionSlot = tw.div`
  absolute top-4 right-4
  sm:top-6 sm:right-6
  flex
  items-center
  justify-end
  z-20
`

const BackgroundOrb1 = tw.div`
  absolute -top-40 -right-40
  w-80 h-80 md:w-[600px] md:h-[600px]
  bg-linear-to-br from-blue-400/30 to-indigo-600/20
  rounded-full
  blur-3xl
  animate-pulse
  animation-duration-[4s]
  pointer-events-none
`

const BackgroundOrb2 = tw.div`
  absolute -bottom-40 -left-40
  w-96 h-96 md:w-[700px] md:h-[700px]
  bg-linear-to-tr from-purple-500/20 to-pink-500/10
  rounded-full
  blur-3xl
  animate-pulse
  animation-duration-[5s]
  pointer-events-none
`

const BackgroundOrb3 = tw.div`
  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
  w-[600px] h-[600px] md:w-[900px] md:h-[900px]
  bg-gradient-radial from-white/5 to-transparent
  rounded-full
  pointer-events-none
`

const GridPattern = tw.div`
  absolute inset-0
  bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
  bg-size-[50px_50px]
  mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]
  pointer-events-none
`

const HeroContent = tw.div`
  relative z-10 
  mx-auto max-w-4xl
  flex flex-col 
  items-center
  gap-4 sm:gap-5 md:gap-6 lg:gap-8
  animate-in fade-in slide-in-from-bottom-8
  duration-1000
`

const IconWrapper = tw.div`relative flex items-center justify-center mb-2 sm:mb-3`

const IconPulse = tw.div`
  absolute inset-0
  w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32
  bg-linear-to-br from-yellow-300/30 to-orange-400/20
  rounded-full
  blur-2xl
  animate-ping
  animation-duration-[2s]
`

const IconContainer = tw.div`
  relative
  w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28
  flex items-center justify-center
  bg-white/10
  backdrop-blur-sm
  rounded-3xl
  shadow-2xl
  border border-white/20
  transform hover:scale-110 hover:rotate-6
  transition-all duration-500
`

const Icon = tw.span`text-5xl sm:text-6xl md:text-7xl filter drop-shadow-2xl`

const TrustBadge = tw.div`
  inline-flex items-center gap-2 sm:gap-2.5
  bg-white/10 backdrop-blur-md
  border border-white/20
  rounded-full
  px-4 sm:px-5 py-2 sm:py-2.5
  shadow-lg
  animate-in fade-in slide-in-from-top-4
  duration-700
  delay-200
`

const BadgeIcon = tw.span`text-base sm:text-lg`
const BadgeText = tw.span`text-xs sm:text-sm font-semibold text-white/90`

const TitleWrapper = tw.div`
  relative
  flex flex-col items-center
  gap-3 sm:gap-4
  mb-1 sm:mb-2
  animate-in fade-in slide-in-from-bottom-6
  duration-700
  delay-300
`

const Title = tw.h1`
  text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
  font-extrabold 
  text-center
  leading-tight
  tracking-tight
  drop-shadow-2xl
`

const TitleAccent = tw.span`
  bg-linear-to-r from-yellow-300 via-orange-300 to-yellow-400
  bg-clip-text text-transparent
  animate-pulse
  animation-duration-[3s]
`

const TitleUnderline = tw.div`
  w-24 sm:w-28 md:w-32
  h-1 md:h-1.5
  bg-linear-to-r from-transparent via-yellow-300 to-transparent
  rounded-full
  shadow-lg shadow-yellow-300/50
`

const Subtitle = tw.p`
  text-base sm:text-lg md:text-xl lg:text-2xl
  text-center 
  text-blue-50/90
  max-w-2xl
  leading-relaxed
  px-4
  animate-in fade-in slide-in-from-bottom-4
  duration-700
  delay-500
`

const SubtitleBold = tw.span`font-bold text-white`
const SubtitleHighlight = tw.span`font-extrabold text-yellow-300 drop-shadow-lg`

const BenefitsList = tw.div`
  flex flex-wrap
  items-center justify-center
  gap-3 sm:gap-4 md:gap-5
  mt-2 sm:mt-3
  animate-in fade-in slide-in-from-bottom-4
  duration-700
  delay-700
`

const BenefitItem = tw.div`
  flex items-center gap-2 sm:gap-2.5
  bg-white/5 backdrop-blur-sm
  border border-white/10
  rounded-full
  px-4 sm:px-5 py-2 sm:py-2.5
  shadow-lg
  hover:bg-white/10 hover:scale-105
  transition-all duration-300
`

const BenefitIcon = tw.span`text-green-300 font-bold text-base sm:text-lg`
const BenefitText = tw.span`text-sm sm:text-base font-medium text-white/90`

const CTAButton = tw.button`
  relative
  bg-linear-to-r from-yellow-400 via-orange-400 to-yellow-500
  hover:from-yellow-300 hover:via-orange-300 hover:to-yellow-400
  text-gray-900
  font-bold
  text-base sm:text-lg
  px-8 sm:px-10 py-4 sm:py-5
  rounded-full
  shadow-2xl shadow-yellow-500/30
  hover:shadow-3xl hover:shadow-yellow-400/40
  transform hover:scale-105 active:scale-95
  transition-all duration-300
  overflow-hidden
  group
  focus:outline-none focus:ring-4 focus:ring-yellow-300/50
  animate-in fade-in zoom-in-95
  animation-delay-900
`

const ButtonContent = tw.div`relative z-10 flex items-center justify-center gap-3`
const ButtonText = tw.span`font-bold`
const ButtonIcon = tw.span`
  flex items-center justify-center
  transition-transform duration-300
  group-hover:translate-x-1
`

const ButtonShine = tw.span`
  absolute inset-0
  bg-linear-to-r from-transparent via-white/40 to-transparent
  transform -translate-x-full
  group-hover:translate-x-full
  transition-transform duration-1000
  pointer-events-none
`

const WaveDecoration = tw.div`
  absolute 
  bottom-0 left-0 right-0 
  w-full
  h-20 sm:h-[100px] md:h-[120px]
  z-0
  pointer-events-none
`
