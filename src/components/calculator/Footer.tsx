import tw from "tw-tailwind";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterSection>
      <FooterContent>
        <LinksContainer>
          <FooterLink href="#regulamin">Regulamin</FooterLink>
          <Separator>•</Separator>
          <FooterLink href="#polityka-prywatnosci">
            Polityka prywatności
          </FooterLink>
          <Separator>•</Separator>
          <FooterLink href="#kontakt">Kontakt</FooterLink>
        </LinksContainer>
        <Copyright>
          © {currentYear} Kalkulator Kredytowy. Wszystkie prawa zastrzeżone.
        </Copyright>
      </FooterContent>
    </FooterSection>
  );
};

const FooterSection = tw.footer`w-full bg-gray-800 text-white py-8 mt-12`;
const FooterContent = tw.div`max-w-6xl mx-auto px-4 text-center`;
const LinksContainer = tw.div`flex justify-center items-center gap-4 mb-4 flex-wrap`;
const FooterLink = tw.a`text-gray-300 hover:text-white transition text-sm`;
const Separator = tw.span`text-gray-600`;
const Copyright = tw.p`text-gray-400 text-sm`;
