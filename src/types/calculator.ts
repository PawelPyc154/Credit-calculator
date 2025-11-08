import { z } from 'zod'
import type { BankOffer } from './bank'

// Cel kredytu
export const loanPurposeSchema = z.enum(['purchase', 'refinancing', 'construction'])
export type LoanPurpose = z.infer<typeof loanPurposeSchema>

// Typ oprocentowania
export const interestRateTypeSchema = z.enum(['fixed', 'variable'])
export type InterestRateType = z.infer<typeof interestRateTypeSchema>

// Schema formularza kalkulatora
export const calculatorFormSchema = z.object({
  loanAmount: z
    .number()
    .min(50000, 'Minimalna kwota kredytu to 50 000 zł')
    .max(2500000, 'Maksymalna kwota kredytu to 2 500 000 zł'),
  loanPeriod: z
    .number()
    .min(5, 'Minimalny okres kredytowania to 5 lat')
    .max(35, 'Maksymalny okres kredytowania to 35 lat'),
  downPayment: z.number().min(0, 'Wkład własny nie może być ujemny'),
  monthlyIncome: z.number().min(3000, 'Minimalny dochód miesięczny to 3 000 zł'),
  purpose: loanPurposeSchema,
  interestRateType: interestRateTypeSchema,
})

export type CalculatorFormData = z.infer<typeof calculatorFormSchema>

// Wyniki kalkulacji dla danego banku
export interface CalculationResult {
  bankId: string
  bankName: string
  bankLogo?: string
  monthlyPayment: number
  totalCost: number
  interestRate: number
  totalInterest: number
  commission: number
  insurance: number
  rrso: number // Rzeczywista Roczna Stopa Oprocentowania
  score: number // Wynik oceny oferty (0-100)
  isRecommended: boolean // Czy to top 3 oferta
  bank?: BankOffer // Pełne informacje o banku z dodatkowymi parametrami
}
