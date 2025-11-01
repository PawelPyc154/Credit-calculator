"use client";

import { useMemo } from "react";
import tw from "tw-tailwind";
import { Heading } from "./heading";

const ads = {
  credit: [
    {
      id: 1,
      name: "Bank Pekao - Kredyt mieszkaniowy",
      img: "/img/ads/back-pekao.svg",
      url: "https://tmlead.pl/redirect/869307_2160",
      description:
        "Kredyt hipoteczny w Banku Pekao: nawet 0% prowizji, od 1,79% marży, do 90% wartości nieruchomości, stała lub zmienna stopa procentowa",
    },
    {
      id: 2,
      name: "Bank Citi Handlowy - kredyt hipoteczny",
      img: "/img/ads/citi-handlowy.svg",
      url: "https://tmlead.pl/redirect/869307_2204",
      description:
        "Twój nowy dom jest bliżej niż myślisz! Kredyt hipoteczny na atrakcyjnych warunkach. RRSO 8,02%",
    },
    {
      id: 3,
      name: "VeloBank - Kredyt hipoteczny VeloDom z refinansowaniem",
      img: "/img/ads/veloBank.svg",
      url: "https://tmlead.pl/redirect/869307_2204",
      description:
        "Kredyt hipoteczny VeloDom: 0% prowizji z kontem z pakietem i ubezpieczeniem VeloBezpieczny, 0% prowizji za wcześniejszą spłatę lub nadpłatę kredytu, RRSO 7,43%",
    },
    {
      id: 4,
      name: "VeloBank - Kredyt hipoteczny dla Profesjonalistów z oprocentowaniem stałym",
      img: "/img/ads/veloBank.svg",
      url: "https://tmlead.pl/redirect/869307_3043",
      description:
        "Znajdź swoje miejsce na Ziemi! Wykonujesz wybrane zawody? W VeloBanku weźmiesz kredyt hipoteczny – w uproszczonym trybie i na specjalnych warunkach. RRSO 7,43%",
    },
    {
      id: 5,
      name: "VeloBank - Kredyt hipoteczny ze stałym oprocentowaniem",
      img: "/img/ads/veloBank.svg",
      url: "https://tmlead.pl/redirect/869307_3042",
      description:
        "Twój dom, Twoja wygoda i miejsce na ziemi. Umów wideorozmowę z ekspertem hipotecznym i złóż 100% zdalnie wniosek o kredyt hipoteczny. 0% prowizji z kontem z pakietem i ubezpieczeniem VeloBezpieczny. 0% prowizji za wcześniejszą spłatę lub nadpłatę kredytu, RRSO 7,43%",
    },
  ],
} as const;

interface AdProps {
  type?: keyof typeof ads;
}

export const Ad = ({ type = "credit" }: AdProps) => {
  const ad = useMemo(
    () => ads[type][Math.floor(Math.random() * ads[type].length)],
    [type]
  );

  if (!ad) {
    return null;
  }
  return (
    <a
      href={ad.url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="@container"
    >
      <Container>
        <div>
          <div className="text-gray-400 text-xs">Reklama</div>
          <div>
            <Title size="2xl" tag="h5">
              {ad.name}
            </Title>
            <Description>{ad.description}</Description>
          </div>
        </div>
        <Image src={ad.img} alt="" width={140} height={60} className="" />
      </Container>
    </a>
  );
};

const Container = tw.a`flex flex-col @sm:flex-row gap-2 w-full p-4 bg-white`;
const Image = tw.img`shrink-0 mx-auto sm:mr-0`;
const Title = tw(Heading)`text-sm font-bold`;
const Description = tw.p`text-xs text-gray-600`;
