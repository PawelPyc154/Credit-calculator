"use client";

import clsx from "clsx";
import { useState } from "react";
import tw from "tw-tailwind";
import type { CalculationResult } from "types/calculator";
import { formatCurrency, formatPercent } from "utils/calculator";

export type BankRankingProps = {
  results: CalculationResult[];
};

export const BankRanking = ({ results }: BankRankingProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (results.length === 0) {
    return null;
  }

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <RankingSection>
      <SectionTitle>⭐ Najlepsze oferty dla Ciebie</SectionTitle>
      <ResultsGrid>
        {results.map((result, index) => (
          <BankCard
            key={result.bankId}
            className={clsx(result.isRecommended && "ring-2 ring-blue-500")}
          >
            {result.isRecommended && (
              <RecommendedBadge>
                {index === 0
                  ? "🥇 Najlepsza oferta"
                  : index === 1
                  ? "🥈 Druga najlepsza"
                  : "🥉 Trzecia najlepsza"}
              </RecommendedBadge>
            )}

            <BankHeader>
              <BankLogo>{result.bankLogo}</BankLogo>
              <BankName>{result.bankName}</BankName>
            </BankHeader>

            <MainInfo>
              <MonthlyPayment>
                {formatCurrency(result.monthlyPayment)}
              </MonthlyPayment>
              <MonthlyLabel>miesięcznie</MonthlyLabel>
            </MainInfo>

            <InfoGrid>
              <InfoItem>
                <InfoLabel>Oprocentowanie</InfoLabel>
                <InfoValue>{formatPercent(result.interestRate)}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Całkowity koszt</InfoLabel>
                <InfoValue>{formatCurrency(result.totalCost)}</InfoValue>
              </InfoItem>
            </InfoGrid>

            <DetailsButton onClick={() => toggleExpanded(result.bankId)}>
              {expandedId === result.bankId
                ? "Ukryj szczegóły ▲"
                : "Zobacz szczegóły ▼"}
            </DetailsButton>

            {expandedId === result.bankId && (
              <DetailsSection>
                <DetailRow>
                  <DetailLabel>Całkowite odsetki</DetailLabel>
                  <DetailValue>
                    {formatCurrency(result.totalInterest)}
                  </DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Prowizja</DetailLabel>
                  <DetailValue>{formatCurrency(result.commission)}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Ubezpieczenie</DetailLabel>
                  <DetailValue>{formatCurrency(result.insurance)}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Ocena oferty</DetailLabel>
                  <ScoreBar>
                    <ScoreFill style={{ width: `${result.score}%` }} />
                    <ScoreText>{result.score}/100</ScoreText>
                  </ScoreBar>
                </DetailRow>
              </DetailsSection>
            )}
          </BankCard>
        ))}
      </ResultsGrid>
    </RankingSection>
  );
};

const RankingSection = tw.section`w-full max-w-6xl mx-auto px-4 py-12`;
const SectionTitle = tw.h2`text-3xl font-bold text-gray-800 mb-8 text-center`;
const ResultsGrid = tw.div`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`;
const BankCard = tw.div`bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 relative`;
const RecommendedBadge = tw.div`absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap`;
const BankHeader = tw.div`flex items-center gap-3 mb-4`;
const BankLogo = tw.span`text-3xl`;
const BankName = tw.h3`text-xl font-bold text-gray-800`;
const MainInfo = tw.div`text-center mb-4 py-4 bg-blue-50 rounded-lg`;
const MonthlyPayment = tw.p`text-3xl font-bold text-blue-600`;
const MonthlyLabel = tw.p`text-sm text-gray-600`;
const InfoGrid = tw.div`grid grid-cols-2 gap-4 mb-4`;
const InfoItem = tw.div`text-center`;
const InfoLabel = tw.p`text-xs text-gray-600 mb-1`;
const InfoValue = tw.p`text-sm font-semibold text-gray-800`;
const DetailsButton = tw.button`w-full text-blue-600 hover:text-blue-700 font-semibold py-2 text-sm transition`;
const DetailsSection = tw.div`mt-4 pt-4 border-t border-gray-200 space-y-3`;
const DetailRow = tw.div`flex justify-between items-center`;
const DetailLabel = tw.span`text-sm text-gray-600`;
const DetailValue = tw.span`text-sm font-semibold text-gray-800`;
const ScoreBar = tw.div`relative w-32 h-6 bg-gray-200 rounded-full overflow-hidden`;
const ScoreFill = tw.div`absolute inset-y-0 left-0 bg-linear-to-r from-green-400 to-green-600 transition-all duration-500`;
const ScoreText = tw.span`absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-800 z-10`;
