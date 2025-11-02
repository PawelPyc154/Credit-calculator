import tw from "tw-tailwind";

export const Hero = () => {
  return (
    <HeroSection>
      <HeroContent>
        <IconWrapper>
          <Icon>💰</Icon>
          <IconGlow />
        </IconWrapper>
        <Title>
          Znajdź najlepszy kredyt
          <TitleAccent> hipoteczny</TitleAccent>
        </Title>
        <Subtitle>
          Porównaj oferty z wiodących banków w Polsce i oszczędź tysiące złotych
          <br />
          <SubtitleHighlight>
            ✓ Darmowo ✓ Bez zobowiązań ✓ W 2 minuty
          </SubtitleHighlight>
        </Subtitle>
        <StatsGrid>
          <StatItem>
            <StatNumber>15+</StatNumber>
            <StatLabel>Banków</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>1000+</StatNumber>
            <StatLabel>Zadowolonych klientów</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>100%</StatNumber>
            <StatLabel>Bezpłatnie</StatLabel>
          </StatItem>
        </StatsGrid>
      </HeroContent>
      <WaveDecoration>
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full"
        >
          <title>Wave Decoration</title>
          <path
            d="M0,64 C360,16 720,16 1080,64 C1440,112 1440,112 1440,112 L1440,0 L0,0 Z"
            fill="rgba(255,255,255,0.1)"
          />
          <path
            d="M0,96 C360,48 720,48 1080,96 C1440,144 1440,120 1440,120 L1440,120 L0,120 Z"
            fill="white"
          />
        </svg>
      </WaveDecoration>
    </HeroSection>
  );
};

const HeroSection = tw.section`
  relative w-full 
  bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800
  text-white py-20 md:py-28 px-4
  overflow-hidden
  before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]
  after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_50%)]
`;

const HeroContent = tw.div`relative z-10 max-w-4xl mx-auto`;

const IconWrapper = tw.div`relative flex justify-center mb-6`;
const Icon = tw.span`text-7xl md:text-8xl animate-bounce`;
const IconGlow = tw.div`
  absolute inset-0 blur-3xl bg-white opacity-20 rounded-full
  animate-pulse
`;

const Title = tw.h1`
  text-4xl md:text-6xl lg:text-7xl font-extrabold text-center mb-4
  leading-tight
  drop-shadow-lg
`;
const TitleAccent = tw.span`
  bg-linear-to-r from-yellow-300 to-orange-400 
  bg-clip-text text-transparent
`;

const Subtitle = tw.p`
  text-lg md:text-xl text-center text-blue-50 max-w-3xl mx-auto mb-8
  leading-relaxed
`;

const SubtitleHighlight = tw.span`
  inline-block mt-3 text-yellow-300 font-semibold text-base
`;

const StatsGrid = tw.div`
  grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mt-10
`;

const StatItem = tw.div`
  text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl
  border border-white/20
  hover:bg-white/20 transition-all duration-300
  hover:scale-105 hover:shadow-xl
`;

const StatNumber = tw.div`
  text-2xl md:text-4xl font-bold text-white mb-1
`;

const StatLabel = tw.div`
  text-xs md:text-sm text-blue-100
`;

const WaveDecoration = tw.div`
  absolute bottom-0 left-0 right-0 z-0
`;
