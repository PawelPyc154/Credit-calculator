import { z } from 'zod'

// Schema dla oferty bankowej
export const bankOfferSchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string().optional(),
  baseInterestRate: z.number(), // Bazowe oprocentowanie
  commissionRate: z.number(), // Prowizja w %
  insuranceRate: z.number(), // Ubezpieczenie w %
  minLoanAmount: z.number(),
  maxLoanAmount: z.number(),
  minLoanPeriod: z.number(),
  maxLoanPeriod: z.number(),
  minDownPaymentPercent: z.number(), // Minimalny wkład własny w %
  supportedPurposes: z.array(z.enum(['purchase', 'refinancing', 'construction'])),
  description: z.string().optional(),
})

export type BankOffer = z.infer<typeof bankOfferSchema>

// Helper do parsowania danych z JSON
export const parseBankOffers = (data: unknown): BankOffer[] => {
  return z.array(bankOfferSchema).parse(data)
}
