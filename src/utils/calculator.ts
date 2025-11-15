import type { BankOffer } from 'types/bank'
import type { CalculationResult, CalculatorFormData } from 'types/calculator'

/**
 * Oblicza miesięczną ratę kredytu metodą annuitetową
 */
export function calculateMonthlyPayment(
  amount: number,
  annualInterestRate: number,
  years: number,
): number {
  const monthlyRate = annualInterestRate / 100 / 12
  const numberOfPayments = years * 12

  if (monthlyRate === 0) {
    return amount / numberOfPayments
  }

  const monthlyPayment =
    (amount * monthlyRate * (1 + monthlyRate) ** numberOfPayments) /
    ((1 + monthlyRate) ** numberOfPayments - 1)

  return monthlyPayment
}

/**
 * Oblicza całkowity koszt kredytu (suma wszystkich rat)
 */
export function calculateTotalCost(
  monthlyPayment: number,
  years: number,
  commission: number,
  insurance: number,
): number {
  const numberOfPayments = years * 12
  return monthlyPayment * numberOfPayments + commission + insurance
}

/**
 * Oblicza prowizję bankową
 */
export function calculateCommission(loanAmount: number, commissionRate: number): number {
  return loanAmount * (commissionRate / 100)
}

/**
 * Oblicza koszt ubezpieczenia
 */
export function calculateInsurance(
  loanAmount: number,
  insuranceRate: number,
  years: number,
): number {
  return loanAmount * (insuranceRate / 100) * years
}

/**
 * Oblicza całkowite odsetki
 */
export function calculateTotalInterest(
  monthlyPayment: number,
  years: number,
  loanAmount: number,
): number {
  const numberOfPayments = years * 12
  return monthlyPayment * numberOfPayments - loanAmount
}

/**
 * Oblicza RRSO (Rzeczywistą Roczna Stopę Oprocentowania)
 * Uproszczony wzór przybliżony uwzględniający wszystkie koszty kredytu
 */
export function calculateRRSO(loanAmount: number, totalCost: number, years: number): number {
  if (loanAmount === 0 || years === 0) return 0

  // Uproszczony wzór: RRSO ≈ (całkowity koszt / kwota kredytu) ^ (1/lata) - 1
  const totalCostRatio = totalCost / loanAmount
  const annualRate = totalCostRatio ** (1 / years) - 1

  return annualRate * 100
}

/**
 * Oblicza wynik (score) oferty bankowej
 * Im niższy koszt całkowity i niższe oprocentowanie, tym wyższy score
 */
function calculateScore(
  totalCost: number,
  interestRate: number,
  allResults: { totalCost: number; interestRate: number }[],
): number {
  // Znajdź min i max wartości
  const costs = allResults.map((r) => r.totalCost)
  const rates = allResults.map((r) => r.interestRate)

  const minCost = Math.min(...costs)
  const maxCost = Math.max(...costs)
  const minRate = Math.min(...rates)
  const maxRate = Math.max(...rates)

  // Normalizuj wartości (0-100, gdzie 100 = najlepsze)
  const costScore = maxCost === minCost ? 100 : ((maxCost - totalCost) / (maxCost - minCost)) * 50
  const rateScore = maxRate === minRate ? 50 : ((maxRate - interestRate) / (maxRate - minRate)) * 50

  return Math.round(costScore + rateScore)
}

/**
 * Oblicza LTV (Loan-to-Value) - stosunek kwoty kredytu do wartości nieruchomości
 */
function calculateLTV(loanAmount: number, downPayment: number): number {
  const propertyValue = loanAmount + downPayment
  if (propertyValue === 0) return 0
  return (loanAmount / propertyValue) * 100
}

/**
 * Oblicza korektę oprocentowania na podstawie LTV
 * Zwraca dodatkową marżę w punktach procentowych, którą należy dodać do oprocentowania
 * 
 * Logika progów:
 * - LTV >= 95% → użyj ratio95 (jeśli dostępne)
 * - LTV >= 90% (ale < 95%) → użyj ratio90 (jeśli dostępne)
 * - LTV >= 80% (ale < 90%) → użyj ratio80 (jeśli dostępne)
 * - LTV < 80% → brak korekty
 */
function getLTVAdjustment(ltv: number, bank: BankOffer): number {
  if (!bank.ltv) return 0

  // Sprawdź próg LTV i zwróć odpowiednią korektę
  // Korekty są w punktach procentowych (np. 0.30 = +0.30 p.p.)
  // Sprawdzamy od najwyższego progu w dół
  if (ltv >= 95 && bank.ltv.ratio95 !== undefined) {
    return bank.ltv.ratio95
  }
  if (ltv >= 90 && bank.ltv.ratio90 !== undefined) {
    return bank.ltv.ratio90
  }
  if (ltv >= 80 && bank.ltv.ratio80 !== undefined) {
    return bank.ltv.ratio80
  }

  return 0
}

/**
 * Sprawdza czy bank spełnia wymagania kredytowe
 */
function isBankEligible(bank: BankOffer, formData: CalculatorFormData): boolean {
  const { loanAmount, loanPeriod, downPayment, purpose, interestRateType } = formData
  const propertyValue = loanAmount + downPayment
  const downPaymentPercent = (downPayment / propertyValue) * 100

  // Sprawdź czy bank obsługuje wybrany typ oprocentowania
  const supportsInterestRateType =
    !bank.supportedInterestRateTypes ||
    bank.supportedInterestRateTypes.length === 0 ||
    bank.supportedInterestRateTypes.includes(interestRateType)

  return (
    loanAmount >= bank.minLoanAmount &&
    loanAmount <= bank.maxLoanAmount &&
    loanPeriod >= bank.minLoanPeriod &&
    loanPeriod <= bank.maxLoanPeriod &&
    downPaymentPercent >= bank.minDownPaymentPercent &&
    bank.supportedPurposes.includes(purpose) &&
    supportsInterestRateType
  )
}

/**
 * Główna funkcja kalkulująca oferty dla wszystkich banków
 */
export function calculateBankOffers(
  formData: CalculatorFormData,
  banks: BankOffer[],
): CalculationResult[] {
  const { loanAmount, loanPeriod, downPayment } = formData

  // Oblicz LTV dla wszystkich banków (używamy tego samego LTV dla wszystkich)
  const ltv = calculateLTV(loanAmount, downPayment)

  // Filtruj banki, które spełniają wymagania
  const eligibleBanks = banks.filter((bank) => isBankEligible(bank, formData))

  // Oblicz wyniki dla każdego banku
  const results: CalculationResult[] = eligibleBanks.map((bank) => {
    // Wybierz odpowiednie oprocentowanie w zależności od typu
    let interestRate =
      formData.interestRateType === 'fixed' && bank.fixedInterestRate
        ? bank.fixedInterestRate
        : bank.baseInterestRate

    // Jeśli baseInterestRate jest null/undefined, spróbuj obliczyć z wibor + margin
    if (interestRate === null || interestRate === undefined) {
      if (bank.wibor !== undefined && bank.margin !== undefined) {
        interestRate = bank.wibor + bank.margin
      } else {
        // Fallback: użyj fixedInterestRate jeśli dostępne, w przeciwnym razie 0
        interestRate = bank.fixedInterestRate ?? 0
      }
    }

    // Uwzględnij korektę LTV (dodaj dodatkową marżę w zależności od poziomu wkładu własnego)
    const ltvAdjustment = getLTVAdjustment(ltv, bank)
    interestRate = interestRate + ltvAdjustment

    const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanPeriod)

    const commission = calculateCommission(loanAmount, bank.commissionRate)
    const insurance = calculateInsurance(loanAmount, bank.insuranceRate, loanPeriod)

    const totalInterest = calculateTotalInterest(monthlyPayment, loanPeriod, loanAmount)

    const totalCost = calculateTotalCost(monthlyPayment, loanPeriod, commission, insurance)

    // Użyj RRSO z produktu jeśli jest dostępne, w przeciwnym razie oblicz
    let rrso: number
    if (formData.interestRateType === 'fixed' && bank.rrsoFixed !== undefined) {
      rrso = bank.rrsoFixed
    } else if (formData.interestRateType === 'variable' && bank.rrsoVariable !== undefined) {
      rrso = bank.rrsoVariable
    } else if (bank.rrso !== undefined) {
      rrso = bank.rrso
    } else {
      rrso = calculateRRSO(loanAmount, totalCost, loanPeriod)
    }

    return {
      bankId: bank.id,
      bankName: bank.name,
      bankLogo: bank.logo,
      monthlyPayment,
      totalCost,
      interestRate,
      totalInterest,
      commission,
      insurance,
      rrso,
      score: 0, // Będzie obliczone później
      isRecommended: false, // Będzie oznaczone później
      bank, // Dodajemy pełny obiekt banku z wszystkimi informacjami
    }
  })

  // Oblicz score dla każdej oferty
  const resultsWithScores = results.map((result) => ({
    ...result,
    score: calculateScore(result.totalCost, result.interestRate, results),
  }))

  // Sortuj po całkowitym koszcie (najlepsze pierwsze)
  resultsWithScores.sort((a, b) => a.totalCost - b.totalCost)

  // Oznacz top 3 jako rekomendowane
  resultsWithScores.forEach((result, index) => {
    result.isRecommended = index < 3
  })

  return resultsWithScores
}

/**
 * Formatuje liczbę do formatu waluty PLN
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Formatuje liczbę do formatu waluty PLN bez groszy (tylko pełne złote)
 * Używane dla kwot kredytu, wkładu własnego i dochodu
 */
export function formatCurrencyNoCents(amount: number): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount))
}

/**
 * Formatuje liczbę jako procent
 */
export function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`
}
