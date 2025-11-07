import { z } from 'zod'

// Schema dla programu afiliacyjnego
export const affiliateSchema = z.object({
  enabled: z.boolean(), // Czy bank ma aktywny program afiliacyjny
  url: z.string().optional(), // Link afiliacyjny
  campaignId: z.string().optional(), // ID kampanii
  commission: z.number().optional(), // Prowizja w %
  cookiesTime: z.number().optional(), // Czas ważności cookies w dniach
  restrictions: z.array(z.string()).optional(), // Ograniczenia i zasady (np. zakaz biddowania)
  notes: z.string().optional(), // Dodatkowe notatki
})

export type Affiliate = z.infer<typeof affiliateSchema>

// Schema dla oferty bankowej
export const bankOfferSchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string().optional(),
  baseInterestRate: z.number(), // Bazowe oprocentowanie (WIBOR + marża)
  wibor: z.number().optional(), // Aktualna wartość WIBOR (jeśli kredyt zmiennoprocentowy)
  margin: z.number().optional(), // Marża banku
  commissionRate: z.number(), // Prowizja w %
  insuranceRate: z.number(), // Ubezpieczenie w % rocznie
  minLoanAmount: z.number(),
  maxLoanAmount: z.number(),
  minLoanPeriod: z.number(),
  maxLoanPeriod: z.number(),
  minDownPaymentPercent: z.number(), // Minimalny wkład własny w %
  supportedPurposes: z.array(z.enum(['purchase', 'refinancing', 'construction'])),
  description: z.string().optional(),
  // Dodatkowe parametry
  earlyRepaymentFee: z.number().optional(), // Opłata za wcześniejszą spłatę w %
  accountRequired: z.boolean().optional(), // Czy wymagane jest otwarcie konta
  accountFee: z.number().optional(), // Opłata za konto miesięcznie (jeśli wymagane)
  propertyInsuranceRequired: z.boolean().optional(), // Czy wymagane ubezpieczenie nieruchomości
  lifeInsuranceRequired: z.boolean().optional(), // Czy wymagane ubezpieczenie na życie
  processingTime: z.string().optional(), // Szacowany czas rozpatrzenia wniosku
  specialOffers: z.array(z.string()).optional(), // Specjalne oferty/promocje
  advantages: z.array(z.string()).optional(), // Zalety oferty
  disadvantages: z.array(z.string()).optional(), // Wady oferty
  ltv: z
    .object({
      // Loan-to-Value - wpływ wkładu własnego na oprocentowanie
      ratio80: z.number().optional(), // Dodatkowa marża przy LTV 80%
      ratio90: z.number().optional(), // Dodatkowa marża przy LTV 90%
      ratio95: z.number().optional(), // Dodatkowa marża przy LTV 95%
    })
    .optional(),
  updated: z.string().optional(), // Data ostatniej aktualizacji danych
  affiliate: affiliateSchema.optional(), // Informacje o programie afiliacyjnym
})

export type BankOffer = z.infer<typeof bankOfferSchema>

// Helper do parsowania danych z JSON
export const parseBankOffers = (data: unknown): BankOffer[] => {
  return z.array(bankOfferSchema).parse(data)
}
