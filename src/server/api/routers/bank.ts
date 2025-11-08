import { readFileSync } from 'fs'
import { join } from 'path'
import { createTRPCRouter, publicProcedure } from 'server/api/trpc'
import { z } from 'zod'
import { db } from 'server/db'
import type { BankOffer } from 'types/bank'

/**
 * Router do zarządzania danymi banków
 * Umożliwia pobieranie, aktualizację i synchronizację danych banków
 */

// Schema dla aktualizacji danych banku
const bankUpdateSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  logo: z.string().optional(),
  baseInterestRate: z.number().optional(),
  wibor: z.number().optional(),
  margin: z.number().optional(),
  commissionRate: z.number().optional(),
  insuranceRate: z.number().optional(),
  minLoanAmount: z.number().optional(),
  maxLoanAmount: z.number().optional(),
  minLoanPeriod: z.number().optional(),
  maxLoanPeriod: z.number().optional(),
  minDownPaymentPercent: z.number().optional(),
  supportedPurposes: z.array(z.enum(['purchase', 'refinancing', 'construction'])).optional(),
  supportedInterestRateTypes: z.array(z.enum(['fixed', 'variable'])).optional(),
  fixedInterestRate: z.number().optional(),
  description: z.string().optional(),
  earlyRepaymentFee: z.number().optional(),
  accountRequired: z.boolean().optional(),
  accountFee: z.number().optional(),
  propertyInsuranceRequired: z.boolean().optional(),
  lifeInsuranceRequired: z.boolean().optional(),
  processingTime: z.string().optional(),
  specialOffers: z.array(z.string()).optional(),
  advantages: z.array(z.string()).optional(),
  disadvantages: z.array(z.string()).optional(),
  ltv: z
    .object({
      ratio80: z.number().optional(),
      ratio90: z.number().optional(),
      ratio95: z.number().optional(),
    })
    .optional(),
  affiliate: z
    .object({
      enabled: z.boolean().optional(),
      url: z.string().optional(),
      campaignId: z.string().optional(),
      commission: z.number().optional(),
      cookiesTime: z.number().optional(),
      restrictions: z.array(z.string()).optional(),
      notes: z.string().optional(),
    })
    .optional(),
})

// Helper do konwersji z Prisma do BankOffer
function prismaToBankOffer(bank: {
  id: string
  name: string
  logo: string | null
  baseInterestRate: number
  wibor: number | null
  margin: number | null
  commissionRate: number
  insuranceRate: number
  minLoanAmount: number
  maxLoanAmount: number
  minLoanPeriod: number
  maxLoanPeriod: number
  minDownPaymentPercent: number
  supportedPurposes: string[]
  supportedInterestRateTypes: string[]
  fixedInterestRate: number | null
  description: string | null
  earlyRepaymentFee: number | null
  accountRequired: boolean | null
  accountFee: number | null
  propertyInsuranceRequired: boolean | null
  lifeInsuranceRequired: boolean | null
  processingTime: string | null
  specialOffers: string[]
  advantages: string[]
  disadvantages: string[]
  ltvRatio80: number | null
  ltvRatio90: number | null
  ltvRatio95: number | null
  updated: Date
  affiliateEnabled: boolean | null
  affiliateUrl: string | null
  affiliateCampaignId: string | null
  affiliateCommission: number | null
  affiliateCookiesTime: number | null
  affiliateRestrictions: string[]
  affiliateNotes: string | null
}): BankOffer {
  return {
    id: bank.id,
    name: bank.name,
    logo: bank.logo ?? undefined,
    baseInterestRate: bank.baseInterestRate,
    wibor: bank.wibor ?? undefined,
    margin: bank.margin ?? undefined,
    commissionRate: bank.commissionRate,
    insuranceRate: bank.insuranceRate,
    minLoanAmount: bank.minLoanAmount,
    maxLoanAmount: bank.maxLoanAmount,
    minLoanPeriod: bank.minLoanPeriod,
    maxLoanPeriod: bank.maxLoanPeriod,
    minDownPaymentPercent: bank.minDownPaymentPercent,
    supportedPurposes: bank.supportedPurposes as Array<'purchase' | 'refinancing' | 'construction'>,
    supportedInterestRateTypes: bank.supportedInterestRateTypes as Array<'fixed' | 'variable'>,
    fixedInterestRate: bank.fixedInterestRate ?? undefined,
    description: bank.description ?? undefined,
    earlyRepaymentFee: bank.earlyRepaymentFee ?? undefined,
    accountRequired: bank.accountRequired ?? undefined,
    accountFee: bank.accountFee ?? undefined,
    propertyInsuranceRequired: bank.propertyInsuranceRequired ?? undefined,
    lifeInsuranceRequired: bank.lifeInsuranceRequired ?? undefined,
    processingTime: bank.processingTime ?? undefined,
    specialOffers: bank.specialOffers,
    advantages: bank.advantages,
    disadvantages: bank.disadvantages,
    ltv: {
      ratio80: bank.ltvRatio80 ?? undefined,
      ratio90: bank.ltvRatio90 ?? undefined,
      ratio95: bank.ltvRatio95 ?? undefined,
    },
    updated: bank.updated.toISOString().split('T')[0],
    affiliate:
      bank.affiliateEnabled && bank.affiliateUrl
        ? {
            enabled: bank.affiliateEnabled,
            url: bank.affiliateUrl,
            campaignId: bank.affiliateCampaignId ?? undefined,
            commission: bank.affiliateCommission ?? undefined,
            cookiesTime: bank.affiliateCookiesTime ?? undefined,
            restrictions: bank.affiliateRestrictions,
            notes: bank.affiliateNotes ?? undefined,
          }
        : undefined,
  }
}

export const bankRouter = createTRPCRouter({
  /**
   * Pobiera wszystkie banki
   */
  getAll: publicProcedure.query(async () => {
    const banks = await db.bank.findMany({
      orderBy: { name: 'asc' },
    })

    return banks.map(prismaToBankOffer)
  }),

  /**
   * Pobiera bank po ID
   */
  getById: publicProcedure.input(z.string()).query(async ({ input }) => {
    const bank = await db.bank.findUnique({
      where: { id: input },
    })

    if (!bank) {
      return null
    }

    return prismaToBankOffer(bank)
  }),

  /**
   * Aktualizuje dane banku (upsert - tworzy jeśli nie istnieje)
   */
  upsert: publicProcedure.input(bankUpdateSchema).mutation(async ({ input }) => {
    const {
      id,
      ltv,
      affiliate,
      supportedPurposes,
      supportedInterestRateTypes,
      specialOffers,
      advantages,
      disadvantages,
      ...rest
    } = input

    const bank = await db.bank.upsert({
      where: { id },
      create: {
        id,
        name: rest.name ?? '',
        logo: rest.logo ?? null,
        baseInterestRate: rest.baseInterestRate ?? 0,
        wibor: rest.wibor ?? null,
        margin: rest.margin ?? null,
        commissionRate: rest.commissionRate ?? 0,
        insuranceRate: rest.insuranceRate ?? 0,
        minLoanAmount: rest.minLoanAmount ?? 0,
        maxLoanAmount: rest.maxLoanAmount ?? 0,
        minLoanPeriod: rest.minLoanPeriod ?? 0,
        maxLoanPeriod: rest.maxLoanPeriod ?? 0,
        minDownPaymentPercent: rest.minDownPaymentPercent ?? 0,
        supportedPurposes: supportedPurposes ?? [],
        supportedInterestRateTypes: supportedInterestRateTypes ?? [],
        fixedInterestRate: rest.fixedInterestRate ?? null,
        description: rest.description ?? null,
        earlyRepaymentFee: rest.earlyRepaymentFee ?? null,
        accountRequired: rest.accountRequired ?? null,
        accountFee: rest.accountFee ?? null,
        propertyInsuranceRequired: rest.propertyInsuranceRequired ?? null,
        lifeInsuranceRequired: rest.lifeInsuranceRequired ?? null,
        processingTime: rest.processingTime ?? null,
        specialOffers: specialOffers ?? [],
        advantages: advantages ?? [],
        disadvantages: disadvantages ?? [],
        ltvRatio80: ltv?.ratio80 ?? null,
        ltvRatio90: ltv?.ratio90 ?? null,
        ltvRatio95: ltv?.ratio95 ?? null,
        affiliateEnabled: affiliate?.enabled ?? null,
        affiliateUrl: affiliate?.url ?? null,
        affiliateCampaignId: affiliate?.campaignId ?? null,
        affiliateCommission: affiliate?.commission ?? null,
        affiliateCookiesTime: affiliate?.cookiesTime ?? null,
        affiliateRestrictions: affiliate?.restrictions ?? [],
        affiliateNotes: affiliate?.notes ?? null,
        updated: new Date(),
      },
      update: {
        ...(rest.name !== undefined && { name: rest.name }),
        ...(rest.logo !== undefined && { logo: rest.logo ?? null }),
        ...(rest.baseInterestRate !== undefined && { baseInterestRate: rest.baseInterestRate }),
        ...(rest.wibor !== undefined && { wibor: rest.wibor ?? null }),
        ...(rest.margin !== undefined && { margin: rest.margin ?? null }),
        ...(rest.commissionRate !== undefined && { commissionRate: rest.commissionRate }),
        ...(rest.insuranceRate !== undefined && { insuranceRate: rest.insuranceRate }),
        ...(rest.minLoanAmount !== undefined && { minLoanAmount: rest.minLoanAmount }),
        ...(rest.maxLoanAmount !== undefined && { maxLoanAmount: rest.maxLoanAmount }),
        ...(rest.minLoanPeriod !== undefined && { minLoanPeriod: rest.minLoanPeriod }),
        ...(rest.maxLoanPeriod !== undefined && { maxLoanPeriod: rest.maxLoanPeriod }),
        ...(rest.minDownPaymentPercent !== undefined && {
          minDownPaymentPercent: rest.minDownPaymentPercent,
        }),
        ...(supportedPurposes !== undefined && { supportedPurposes }),
        ...(supportedInterestRateTypes !== undefined && { supportedInterestRateTypes }),
        ...(rest.fixedInterestRate !== undefined && { fixedInterestRate: rest.fixedInterestRate ?? null }),
        ...(rest.description !== undefined && { description: rest.description ?? null }),
        ...(rest.earlyRepaymentFee !== undefined && { earlyRepaymentFee: rest.earlyRepaymentFee ?? null }),
        ...(rest.accountRequired !== undefined && { accountRequired: rest.accountRequired }),
        ...(rest.accountFee !== undefined && { accountFee: rest.accountFee ?? null }),
        ...(rest.propertyInsuranceRequired !== undefined && {
          propertyInsuranceRequired: rest.propertyInsuranceRequired,
        }),
        ...(rest.lifeInsuranceRequired !== undefined && { lifeInsuranceRequired: rest.lifeInsuranceRequired }),
        ...(rest.processingTime !== undefined && { processingTime: rest.processingTime ?? null }),
        ...(specialOffers !== undefined && { specialOffers }),
        ...(advantages !== undefined && { advantages }),
        ...(disadvantages !== undefined && { disadvantages }),
        ...(ltv !== undefined && {
          ltvRatio80: ltv.ratio80 ?? null,
          ltvRatio90: ltv.ratio90 ?? null,
          ltvRatio95: ltv.ratio95 ?? null,
        }),
        ...(affiliate !== undefined && {
          affiliateEnabled: affiliate.enabled ?? null,
          affiliateUrl: affiliate.url ?? null,
          affiliateCampaignId: affiliate.campaignId ?? null,
          affiliateCommission: affiliate.commission ?? null,
          affiliateCookiesTime: affiliate.cookiesTime ?? null,
          affiliateRestrictions: affiliate.restrictions ?? [],
          affiliateNotes: affiliate.notes ?? null,
        }),
        updated: new Date(),
      },
    })

    return prismaToBankOffer(bank)
  }),

  /**
   * Synchronizuje dane z JSON do bazy danych
   */
  syncFromJson: publicProcedure.mutation(async () => {
    // Odczytujemy dane z JSON
    const banksJsonPath = join(process.cwd(), 'src', 'data', 'banks.json')
    const banksData = JSON.parse(readFileSync(banksJsonPath, 'utf-8')) as BankOffer[]

    const results = []

    for (const bankData of banksData) {
      const bank = await db.bank.upsert({
        where: { id: bankData.id },
        create: {
          id: bankData.id,
          name: bankData.name,
          logo: bankData.logo ?? null,
          baseInterestRate: bankData.baseInterestRate,
          wibor: bankData.wibor ?? null,
          margin: bankData.margin ?? null,
          commissionRate: bankData.commissionRate,
          insuranceRate: bankData.insuranceRate,
          minLoanAmount: bankData.minLoanAmount,
          maxLoanAmount: bankData.maxLoanAmount,
          minLoanPeriod: bankData.minLoanPeriod,
          maxLoanPeriod: bankData.maxLoanPeriod,
          minDownPaymentPercent: bankData.minDownPaymentPercent,
          supportedPurposes: bankData.supportedPurposes,
          supportedInterestRateTypes: bankData.supportedInterestRateTypes ?? ['variable'],
          fixedInterestRate: bankData.fixedInterestRate ?? null,
          description: bankData.description ?? null,
          earlyRepaymentFee: bankData.earlyRepaymentFee ?? null,
          accountRequired: bankData.accountRequired ?? null,
          accountFee: bankData.accountFee ?? null,
          propertyInsuranceRequired: bankData.propertyInsuranceRequired ?? null,
          lifeInsuranceRequired: bankData.lifeInsuranceRequired ?? null,
          processingTime: bankData.processingTime ?? null,
          specialOffers: bankData.specialOffers ?? [],
          advantages: bankData.advantages ?? [],
          disadvantages: bankData.disadvantages ?? [],
          ltvRatio80: bankData.ltv?.ratio80 ?? null,
          ltvRatio90: bankData.ltv?.ratio90 ?? null,
          ltvRatio95: bankData.ltv?.ratio95 ?? null,
          affiliateEnabled: bankData.affiliate?.enabled ?? null,
          affiliateUrl: bankData.affiliate?.url ?? null,
          affiliateCampaignId: bankData.affiliate?.campaignId ?? null,
          affiliateCommission: bankData.affiliate?.commission ?? null,
          affiliateCookiesTime: bankData.affiliate?.cookiesTime ?? null,
          affiliateRestrictions: bankData.affiliate?.restrictions ?? [],
          affiliateNotes: bankData.affiliate?.notes ?? null,
          updated: bankData.updated ? new Date(bankData.updated) : new Date(),
        },
        update: {
          name: bankData.name,
          logo: bankData.logo ?? null,
          baseInterestRate: bankData.baseInterestRate,
          wibor: bankData.wibor ?? null,
          margin: bankData.margin ?? null,
          commissionRate: bankData.commissionRate,
          insuranceRate: bankData.insuranceRate,
          minLoanAmount: bankData.minLoanAmount,
          maxLoanAmount: bankData.maxLoanAmount,
          minLoanPeriod: bankData.minLoanPeriod,
          maxLoanPeriod: bankData.maxLoanPeriod,
          minDownPaymentPercent: bankData.minDownPaymentPercent,
          supportedPurposes: bankData.supportedPurposes,
          supportedInterestRateTypes: bankData.supportedInterestRateTypes ?? ['variable'],
          fixedInterestRate: bankData.fixedInterestRate ?? null,
          description: bankData.description ?? null,
          earlyRepaymentFee: bankData.earlyRepaymentFee ?? null,
          accountRequired: bankData.accountRequired ?? null,
          accountFee: bankData.accountFee ?? null,
          propertyInsuranceRequired: bankData.propertyInsuranceRequired ?? null,
          lifeInsuranceRequired: bankData.lifeInsuranceRequired ?? null,
          processingTime: bankData.processingTime ?? null,
          specialOffers: bankData.specialOffers ?? [],
          advantages: bankData.advantages ?? [],
          disadvantages: bankData.disadvantages ?? [],
          ltvRatio80: bankData.ltv?.ratio80 ?? null,
          ltvRatio90: bankData.ltv?.ratio90 ?? null,
          ltvRatio95: bankData.ltv?.ratio95 ?? null,
          affiliateEnabled: bankData.affiliate?.enabled ?? null,
          affiliateUrl: bankData.affiliate?.url ?? null,
          affiliateCampaignId: bankData.affiliate?.campaignId ?? null,
          affiliateCommission: bankData.affiliate?.commission ?? null,
          affiliateCookiesTime: bankData.affiliate?.cookiesTime ?? null,
          affiliateRestrictions: bankData.affiliate?.restrictions ?? [],
          affiliateNotes: bankData.affiliate?.notes ?? null,
          updated: bankData.updated ? new Date(bankData.updated) : new Date(),
        },
      })

      results.push(prismaToBankOffer(bank))
    }

    return {
      success: true,
      count: results.length,
      banks: results,
    }
  }),

  /**
   * Aktualizuje WIBOR dla wszystkich banków
   */
  updateWIBOR: publicProcedure.mutation(async () => {
    const { fetchWIBOR, updateVariableData } = await import('utils/bank-data-fetcher')
    const newWIBOR = await fetchWIBOR()

    if (newWIBOR === null) {
      return {
        success: false,
        message: 'Nie udało się pobrać aktualnego WIBOR',
        updated: 0,
      }
    }

    const banks = await db.bank.findMany()
    let updated = 0

    for (const bank of banks) {
      if (bank.wibor !== null && bank.wibor !== newWIBOR) {
        // Konwertuj do BankOffer
        const bankOffer: BankOffer = {
          id: bank.id,
          name: bank.name,
          logo: bank.logo ?? undefined,
          baseInterestRate: bank.baseInterestRate,
          wibor: bank.wibor,
          margin: bank.margin ?? undefined,
          commissionRate: bank.commissionRate,
          insuranceRate: bank.insuranceRate,
          minLoanAmount: bank.minLoanAmount,
          maxLoanAmount: bank.maxLoanAmount,
          minLoanPeriod: bank.minLoanPeriod,
          maxLoanPeriod: bank.maxLoanPeriod,
          minDownPaymentPercent: bank.minDownPaymentPercent,
          supportedPurposes: bank.supportedPurposes as Array<
            'purchase' | 'refinancing' | 'construction'
          >,
          supportedInterestRateTypes: bank.supportedInterestRateTypes as Array<
            'fixed' | 'variable'
          >,
          fixedInterestRate: bank.fixedInterestRate ?? undefined,
          description: bank.description ?? undefined,
          earlyRepaymentFee: bank.earlyRepaymentFee ?? undefined,
          accountRequired: bank.accountRequired ?? undefined,
          accountFee: bank.accountFee ?? undefined,
          propertyInsuranceRequired: bank.propertyInsuranceRequired ?? undefined,
          lifeInsuranceRequired: bank.lifeInsuranceRequired ?? undefined,
          processingTime: bank.processingTime ?? undefined,
          specialOffers: bank.specialOffers,
          advantages: bank.advantages,
          disadvantages: bank.disadvantages,
          ltv: {
            ratio80: bank.ltvRatio80 ?? undefined,
            ratio90: bank.ltvRatio90 ?? undefined,
            ratio95: bank.ltvRatio95 ?? undefined,
          },
          updated: bank.updated.toISOString().split('T')[0],
          affiliate:
            bank.affiliateEnabled && bank.affiliateUrl
              ? {
                  enabled: bank.affiliateEnabled,
                  url: bank.affiliateUrl,
                  campaignId: bank.affiliateCampaignId ?? undefined,
                  commission: bank.affiliateCommission ?? undefined,
                  cookiesTime: bank.affiliateCookiesTime ?? undefined,
                  restrictions: bank.affiliateRestrictions,
                  notes: bank.affiliateNotes ?? undefined,
                }
              : undefined,
        }

        const updates = await updateVariableData(bankOffer)

        if (Object.keys(updates).length > 0) {
          await db.bank.update({
            where: { id: bank.id },
            data: {
              ...(updates.wibor !== undefined && { wibor: updates.wibor }),
              ...(updates.baseInterestRate !== undefined && {
                baseInterestRate: updates.baseInterestRate,
              }),
              updated: new Date(),
            },
          })
          updated++
        }
      }
    }

    return {
      success: true,
      message: `Zaktualizowano WIBOR do ${newWIBOR}% dla ${updated} banków`,
      wibor: newWIBOR,
      updated,
    }
  }),

  /**
   * Aktualizuje dane banku z zewnętrznych źródeł (scraping/API)
   */
  updateFromSource: publicProcedure
    .input(z.string())
    .mutation(async ({ input: bankId }) => {
      const { fetchBankData } = await import('utils/bank-data-fetcher')
      const updates = await fetchBankData(bankId)

      if (!updates || Object.keys(updates).length === 0) {
        return {
          success: false,
          message: `Nie udało się pobrać danych dla banku ${bankId}`,
        }
      }

      const bank = await db.bank.update({
        where: { id: bankId },
        data: {
          ...(updates.baseInterestRate !== undefined && {
            baseInterestRate: updates.baseInterestRate,
          }),
          ...(updates.commissionRate !== undefined && {
            commissionRate: updates.commissionRate,
          }),
          ...(updates.insuranceRate !== undefined && {
            insuranceRate: updates.insuranceRate,
          }),
          ...(updates.wibor !== undefined && { wibor: updates.wibor }),
          ...(updates.margin !== undefined && { margin: updates.margin }),
          updated: new Date(),
        },
      })

      return {
        success: true,
        message: `Zaktualizowano dane dla banku ${bankId}`,
        bank: prismaToBankOffer(bank),
      }
    }),
})

