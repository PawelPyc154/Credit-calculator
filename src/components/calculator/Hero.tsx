import tw from "tw-tailwind";

export const Hero = () => {
  return (
    <HeroSection>
      <IconWrapper>
        <Icon>🧮</Icon>
      </IconWrapper>
      <Title>Kalkulator Kredytowy</Title>
      <Subtitle>
        Porównaj oferty kredytów hipotecznych z różnych banków i znajdź
        najlepszą dla Ciebie
      </Subtitle>
    </HeroSection>
  );
};

const HeroSection = tw.section`w-full bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12 px-4`;
const IconWrapper = tw.div`flex justify-center mb-4`;
const Icon = tw.span`text-6xl`;
const Title = tw.h1`text-4xl md:text-5xl font-bold text-center mb-4`;
const Subtitle = tw.p`text-lg md:text-xl text-center text-blue-100 max-w-3xl mx-auto`;
