"use client";

import { BankRanking } from "components/calculator/BankRanking";
import { CalculatorForm } from "components/calculator/CalculatorForm";
import { Disclaimer } from "components/calculator/Disclaimer";
import { Footer } from "components/calculator/Footer";
import { Hero } from "components/calculator/Hero";
import { useCallback, useState } from "react";
import tw from "tw-tailwind";
import { parseBankOffers } from "types/bank";
import type { CalculationResult, CalculatorFormData } from "types/calculator";
import { calculateBankOffers } from "utils/calculator";
import banksData from "../data/banks.json";

export default function Home() {
  const [results, setResults] = useState<CalculationResult[]>([]);

  const handleCalculate = useCallback((formData: CalculatorFormData) => {
    try {
      const banks = parseBankOffers(banksData);
      const calculatedResults = calculateBankOffers(formData, banks);
      setResults(calculatedResults);
    } catch (error) {
      console.error("Błąd podczas kalkulacji:", error);
    }
  }, []);

  return (
    <MainContainer>
      <Hero />
      <ContentWrapper>
        <CalculatorForm
          onCalculate={handleCalculate}
          hasResults={results.length > 0}
        />
        <div id="results">
          <BankRanking results={results} />
        </div>
        {results.length > 0 && <Disclaimer />}
      </ContentWrapper>
      <Footer />
    </MainContainer>
  );
}

const MainContainer = tw.div`min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50`;
const ContentWrapper = tw.div`pb-12`;
