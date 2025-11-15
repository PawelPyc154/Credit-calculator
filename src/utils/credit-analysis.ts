import type { CalculationResult, CalculatorFormData } from 'types/calculator'
import { calculateMonthlyPayment } from './calculator'

export type CreditAnalysisResult = {
  // Zdolność kredytowa
  affordability: {
    dtiRatio: number // Debt-to-Income ratio (rata / dochód)
    dtiPercentage: number // DTI w procentach
    isAffordable: boolean
    affordabilityLevel: 'excellent' | 'good' | 'moderate' | 'risky' | 'critical'
    remainingIncome: number // Pozostały dochód po spłacie raty
    remainingIncomePercentage: number
    recommendation: string
  }
  
  // Porównanie z innymi ofertami
  comparison: {
    rank: number
    totalOffers: number
    isTopOffer: boolean
    monthlyPaymentDifference: number // Różnica w racie vs średnia
    monthlyPaymentDifferencePercent: number
    totalCostDifference: number // Różnica w całkowitym koszcie vs średnia
    totalCostDifferencePercent: number
    rrsoDifference: number // Różnica w RRSO vs średnia
    recommendation: string
  }
  
  // Analiza ryzyk
  risks: {
    hasVariableRate: boolean
    interestRateRisk: 'low' | 'medium' | 'high'
    riskScenarios: Array<{
      scenario: string
      newRate: number
      newMonthlyPayment: number
      increase: number
      isAffordable: boolean
      warning: string
    }>
    recommendations: string[]
  }
  
  // Ogólna ocena
  overall: {
    score: number // 0-100
    matchLevel: 'excellent' | 'good' | 'moderate' | 'poor'
    summary: string
    keyStrengths: string[]
    keyConcerns: string[]
    finalRecommendation: string
  }
}

/**
 * Analizuje dopasowanie kredytu do kredytobiorcy
 */
export function analyzeCreditMatch(
  result: {
    bankId: string
    monthlyPayment: number
    totalCost: number
    interestRate: number
    rrso: number
  },
  formData: CalculatorFormData,
  allResults: Array<{
    bankId: string
    monthlyPayment: number
    totalCost: number
    rrso: number
  }>,
): CreditAnalysisResult {
  const monthlyIncome = formData.monthlyIncome
  const monthlyPayment = result.monthlyPayment
  
  // Analiza zdolności kredytowej
  const dtiRatio = monthlyPayment / monthlyIncome
  const dtiPercentage = dtiRatio * 100
  const remainingIncome = monthlyIncome - monthlyPayment
  const remainingIncomePercentage = (remainingIncome / monthlyIncome) * 100
  
  // Określ poziom zdolności kredytowej
  let affordabilityLevel: 'excellent' | 'good' | 'moderate' | 'risky' | 'critical'
  let affordabilityRecommendation: string
  
  if (dtiPercentage <= 20) {
    affordabilityLevel = 'excellent'
    affordabilityRecommendation = 'Rata stanowi bardzo małą część Twojego dochodu. Masz dużą elastyczność finansową i możesz spokojnie spłacać kredyt.'
  } else if (dtiPercentage <= 30) {
    affordabilityLevel = 'good'
    affordabilityRecommendation = 'Rata jest w bezpiecznym zakresie. Pozostaje Ci wystarczająco dużo środków na codzienne wydatki i oszczędności.'
  } else if (dtiPercentage <= 40) {
    affordabilityLevel = 'moderate'
    affordabilityRecommendation = 'Rata jest na granicy bezpieczeństwa. Upewnij się, że masz poduszkę finansową na nieprzewidziane wydatki.'
  } else if (dtiPercentage <= 50) {
    affordabilityLevel = 'risky'
    affordabilityRecommendation = 'Rata jest wysoka w stosunku do dochodu. Rozważ zwiększenie wkładu własnego lub wydłużenie okresu kredytowania.'
  } else {
    affordabilityLevel = 'critical'
    affordabilityRecommendation = 'Rata jest bardzo wysoka i może być trudna do utrzymania. Zdecydowanie rozważ zwiększenie wkładu własnego lub zmniejszenie kwoty kredytu.'
  }
  
  const isAffordable = dtiPercentage <= 40
  
  // Porównanie z innymi ofertami
  const avgMonthlyPayment = allResults.reduce((sum, r) => sum + r.monthlyPayment, 0) / allResults.length
  const avgTotalCost = allResults.reduce((sum, r) => sum + r.totalCost, 0) / allResults.length
  const avgRrso = allResults.reduce((sum, r) => sum + r.rrso, 0) / allResults.length
  
  const monthlyPaymentDifference = monthlyPayment - avgMonthlyPayment
  const monthlyPaymentDifferencePercent = (monthlyPaymentDifference / avgMonthlyPayment) * 100
  const totalCostDifference = result.totalCost - avgTotalCost
  const totalCostDifferencePercent = (totalCostDifference / avgTotalCost) * 100
  const rrsoDifference = result.rrso - avgRrso
  
  const rank = allResults
    .sort((a, b) => {
      // Sortuj po całkowitym koszcie, potem po RRSO
      if (Math.abs(a.totalCost - b.totalCost) > 1000) {
        return a.totalCost - b.totalCost
      }
      return a.rrso - b.rrso
    })
    .findIndex((r) => r.bankId === result.bankId) + 1
  
  const isTopOffer = rank <= 3
  
  let comparisonRecommendation: string
  if (isTopOffer) {
    comparisonRecommendation = `Ta oferta jest w top ${rank} najlepszych ofert. Ma ${monthlyPaymentDifferencePercent < 0 ? 'niższą' : 'wyższą'} ratę niż średnia, ale całkowity koszt jest ${totalCostDifferencePercent < 0 ? 'niższy' : 'wyższy'} od średniej.`
  } else {
    comparisonRecommendation = `Ta oferta jest na ${rank}. miejscu. Rozważ porównanie z najlepszymi ofertami, które mogą mieć niższy całkowity koszt.`
  }
  
  // Analiza ryzyk
  const hasVariableRate = formData.interestRateType === 'variable'
  const currentRate = result.interestRate
  
  const riskScenarios: Array<{
    scenario: string
    newRate: number
    newMonthlyPayment: number
    increase: number
    isAffordable: boolean
    warning: string
  }> = []
  
  if (hasVariableRate) {
    // Scenariusz 1: Wzrost stóp o 1 p.p.
    const scenario1Rate = currentRate + 1
    const scenario1Payment = calculateNewPayment(formData.loanAmount, scenario1Rate, formData.loanPeriod)
    const scenario1Increase = scenario1Payment - monthlyPayment
    const scenario1DTI = (scenario1Payment / monthlyIncome) * 100
    
    riskScenarios.push({
      scenario: 'Wzrost stóp o 1 punkt procentowy',
      newRate: scenario1Rate,
      newMonthlyPayment: scenario1Payment,
      increase: scenario1Increase,
      isAffordable: scenario1DTI <= 40,
      warning: scenario1DTI > 40 ? `Rata wzrośnie do ${scenario1Payment.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 })} i może być trudna do utrzymania.` : 'Rata wzrośnie, ale nadal będzie w bezpiecznym zakresie.',
    })
    
    // Scenariusz 2: Wzrost stóp o 2 p.p.
    const scenario2Rate = currentRate + 2
    const scenario2Payment = calculateNewPayment(formData.loanAmount, scenario2Rate, formData.loanPeriod)
    const scenario2Increase = scenario2Payment - monthlyPayment
    const scenario2DTI = (scenario2Payment / monthlyIncome) * 100
    
    riskScenarios.push({
      scenario: 'Wzrost stóp o 2 punkty procentowe',
      newRate: scenario2Rate,
      newMonthlyPayment: scenario2Payment,
      increase: scenario2Increase,
      isAffordable: scenario2DTI <= 40,
      warning: scenario2DTI > 40 ? `Rata wzrośnie do ${scenario2Payment.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 })} i będzie bardzo wysoka.` : 'Rata wzrośnie znacząco, ale powinna być jeszcze do zaakceptowania.',
    })
    
    // Scenariusz 3: Wzrost stóp o 3 p.p. (ekstremalny scenariusz)
    const scenario3Rate = currentRate + 3
    const scenario3Payment = calculateNewPayment(formData.loanAmount, scenario3Rate, formData.loanPeriod)
    const scenario3Increase = scenario3Payment - monthlyPayment
    const scenario3DTI = (scenario3Payment / monthlyIncome) * 100
    
    riskScenarios.push({
      scenario: 'Wzrost stóp o 3 punkty procentowe (ekstremalny)',
      newRate: scenario3Rate,
      newMonthlyPayment: scenario3Payment,
      increase: scenario3Increase,
      isAffordable: scenario3DTI <= 40,
      warning: scenario3DTI > 40 ? `Rata wzrośnie do ${scenario3Payment.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 })} - to może być krytyczne dla Twojego budżetu.` : 'Rata wzrośnie bardzo znacząco, ale nadal może być do zaakceptowania.',
    })
  }
  
  let interestRateRisk: 'low' | 'medium' | 'high' = 'low'
  const riskRecommendations: string[] = []
  
  if (hasVariableRate) {
    const worstCaseDTI = riskScenarios.length > 0 
      ? (riskScenarios[riskScenarios.length - 1].newMonthlyPayment / monthlyIncome) * 100
      : dtiPercentage
    
    if (worstCaseDTI > 50) {
      interestRateRisk = 'high'
      riskRecommendations.push('Rozważ kredyt ze stałym oprocentowaniem, aby zabezpieczyć się przed wzrostem stóp procentowych.')
      riskRecommendations.push('Zbuduj większą poduszkę finansową, aby móc spłacać wyższą ratę w przypadku wzrostu stóp.')
    } else if (worstCaseDTI > 40) {
      interestRateRisk = 'medium'
      riskRecommendations.push('Monitoruj zmiany stóp procentowych i przygotuj się na możliwy wzrost raty.')
      riskRecommendations.push('Rozważ zwiększenie oszczędności na wypadek wzrostu stóp.')
    } else {
      interestRateRisk = 'low'
      riskRecommendations.push('Masz wystarczającą elastyczność finansową, aby poradzić sobie z ewentualnym wzrostem stóp.')
    }
  } else {
    riskRecommendations.push('Kredyt ze stałym oprocentowaniem daje Ci pewność co do wysokości raty przez cały okres kredytowania.')
  }
  
  // Ogólna ocena
  let overallScore = 0
  
  // Zdolność kredytowa (40 punktów)
  if (affordabilityLevel === 'excellent') overallScore += 40
  else if (affordabilityLevel === 'good') overallScore += 35
  else if (affordabilityLevel === 'moderate') overallScore += 25
  else if (affordabilityLevel === 'risky') overallScore += 15
  else overallScore += 5
  
  // Pozycja w rankingu (30 punktów)
  if (rank === 1) overallScore += 30
  else if (rank <= 3) overallScore += 25
  else if (rank <= 5) overallScore += 20
  else if (rank <= 10) overallScore += 15
  else overallScore += 10
  
  // Ryzyko (30 punktów)
  if (interestRateRisk === 'low') overallScore += 30
  else if (interestRateRisk === 'medium') overallScore += 20
  else overallScore += 10
  
  let matchLevel: 'excellent' | 'good' | 'moderate' | 'poor'
  let summary: string
  const keyStrengths: string[] = []
  const keyConcerns: string[] = []
  
  if (overallScore >= 80) {
    matchLevel = 'excellent'
    summary = 'Ta oferta bardzo dobrze pasuje do Twojej sytuacji finansowej.'
    if (affordabilityLevel === 'excellent' || affordabilityLevel === 'good') {
      keyStrengths.push('Rata jest w bezpiecznym zakresie')
    }
    if (isTopOffer) {
      keyStrengths.push('To jedna z najlepszych ofert na rynku')
    }
    if (interestRateRisk === 'low') {
      keyStrengths.push('Niskie ryzyko związane ze zmianami stóp procentowych')
    }
  } else if (overallScore >= 60) {
    matchLevel = 'good'
    summary = 'Ta oferta dobrze pasuje do Twojej sytuacji finansowej, ale są pewne obszary do rozważenia.'
    if (affordabilityLevel === 'good' || affordabilityLevel === 'moderate') {
      keyStrengths.push('Rata jest w akceptowalnym zakresie')
    }
    if (isTopOffer) {
      keyStrengths.push('To dobra oferta w porównaniu z innymi')
    }
    if (affordabilityLevel === 'moderate') {
      keyConcerns.push('Rata jest na granicy bezpieczeństwa')
    }
    if (interestRateRisk === 'medium') {
      keyConcerns.push('Średnie ryzyko związane ze zmianami stóp procentowych')
    }
  } else if (overallScore >= 40) {
    matchLevel = 'moderate'
    summary = 'Ta oferta wymaga dokładnego rozważenia - są zarówno zalety, jak i wady.'
    if (affordabilityLevel === 'moderate' || affordabilityLevel === 'risky') {
      keyConcerns.push('Rata może być wysoka w stosunku do dochodu')
    }
    if (!isTopOffer) {
      keyConcerns.push('Istnieją lepsze oferty na rynku')
    }
    if (interestRateRisk === 'high') {
      keyConcerns.push('Wysokie ryzyko związane ze zmianami stóp procentowych')
    }
  } else {
    matchLevel = 'poor'
    summary = 'Ta oferta może nie być najlepszym wyborem dla Twojej sytuacji finansowej.'
    if (affordabilityLevel === 'risky' || affordabilityLevel === 'critical') {
      keyConcerns.push('Rata jest bardzo wysoka w stosunku do dochodu')
    }
    if (!isTopOffer) {
      keyConcerns.push('Istnieją znacznie lepsze oferty')
    }
    if (interestRateRisk === 'high') {
      keyConcerns.push('Bardzo wysokie ryzyko związane ze zmianami stóp procentowych')
    }
  }
  
  let finalRecommendation: string
  if (matchLevel === 'excellent') {
    finalRecommendation = 'Ta oferta jest bardzo dobrym wyborem. Możesz spokojnie rozważyć złożenie wniosku.'
  } else if (matchLevel === 'good') {
    finalRecommendation = 'Ta oferta jest dobrym wyborem, ale warto porównać ją z innymi ofertami przed podjęciem decyzji.'
  } else if (matchLevel === 'moderate') {
    finalRecommendation = 'Rozważ dokładnie tę ofertę i porównaj ją z innymi. Możesz chcieć zwiększyć wkład własny lub rozważyć inne opcje.'
  } else {
    finalRecommendation = 'Zdecydowanie rozważ inne oferty lub zwiększenie wkładu własnego przed podjęciem decyzji o tym kredycie.'
  }
  
  return {
    affordability: {
      dtiRatio,
      dtiPercentage,
      isAffordable,
      affordabilityLevel,
      remainingIncome,
      remainingIncomePercentage,
      recommendation: affordabilityRecommendation,
    },
    comparison: {
      rank,
      totalOffers: allResults.length,
      isTopOffer,
      monthlyPaymentDifference,
      monthlyPaymentDifferencePercent,
      totalCostDifference,
      totalCostDifferencePercent,
      rrsoDifference,
      recommendation: comparisonRecommendation,
    },
    risks: {
      hasVariableRate,
      interestRateRisk,
      riskScenarios,
      recommendations: riskRecommendations,
    },
    overall: {
      score: overallScore,
      matchLevel,
      summary,
      keyStrengths,
      keyConcerns,
      finalRecommendation,
    },
  }
}

/**
 * Oblicza nową ratę przy zmienionym oprocentowaniu
 */
function calculateNewPayment(loanAmount: number, interestRate: number, loanPeriod: number): number {
  return calculateMonthlyPayment(loanAmount, interestRate, loanPeriod)
}

