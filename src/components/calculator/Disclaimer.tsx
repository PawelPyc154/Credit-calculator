import tw from "tw-tailwind";

export const Disclaimer = () => {
  return (
    <DisclaimerSection>
      <DisclaimerBox>
        <Icon>⚠️</Icon>
        <Content>
          <Title>Ważne informacje</Title>
          <Text>
            Przedstawione dane mają charakter <strong>poglądowy</strong> i służą
            wyłącznie do wstępnego porównania ofert. Ostateczna oferta kredytu,
            w tym oprocentowanie, prowizje i inne warunki, zależy od
            indywidualnej oceny bankowej i może się różnić od prezentowanych
            wyników.
          </Text>
          <Text>
            Zalecamy bezpośredni kontakt z bankiem w celu uzyskania szczegółowej
            oferty dostosowanej do Twojej sytuacji.
          </Text>
        </Content>
      </DisclaimerBox>
    </DisclaimerSection>
  );
};

const DisclaimerSection = tw.section`w-full max-w-6xl mx-auto px-4 py-8`;
const DisclaimerBox = tw.div`bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 flex gap-4 items-start`;
const Icon = tw.span`text-3xl flex-shrink-0`;
const Content = tw.div`flex-1`;
const Title = tw.h3`text-lg font-bold text-gray-800 mb-2`;
const Text = tw.p`text-sm text-gray-700 mb-2 last:mb-0`;
