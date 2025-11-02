"use client";

import { BankRanking } from "components/calculator/BankRanking";
import { CalculatorForm } from "components/calculator/CalculatorForm";
import { Disclaimer } from "components/calculator/Disclaimer";
import { Footer } from "components/calculator/Footer";
import { Hero } from "components/calculator/Hero";
import { useState } from "react";
import tw from "tw-tailwind";
import { parseBankOffers } from "types/bank";
import type { CalculationResult, CalculatorFormData } from "types/calculator";
import { calculateBankOffers } from "utils/calculator";
import banksData from "../data/banks.json";

export default function Home() {
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = (formData: CalculatorFormData) => {
    setIsLoading(true);

    // Symulacja opóźnienia dla lepszego UX
    setTimeout(() => {
      try {
        const banks = parseBankOffers(banksData);
        const calculatedResults = calculateBankOffers(formData, banks);
        setResults(calculatedResults);

        // Płynne przewinięcie do wyników
        setTimeout(() => {
          document.getElementById("results")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      } catch (error) {
        console.error("Błąd podczas kalkulacji:", error);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <MainContainer>
      <Hero />
      <ContentWrapper>
        <CalculatorForm onSubmit={handleCalculate} isLoading={isLoading} />
        <div id="results">
          <BankRanking results={results} />
        </div>
        {results.length > 0 && <Disclaimer />}
      </ContentWrapper>
      <Footer />
    </MainContainer>
  );
}

const MainContainer = tw.div`min-h-screen bg-gray-50`;
const ContentWrapper = tw.div`pb-12`;
