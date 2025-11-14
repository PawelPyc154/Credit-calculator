/**
 * Skrypt do synchronizacji danych banków z JSON do bazy danych
 * 
 * Użycie:
 *   yarn tsx scripts/sync-banks.ts
 */

import { db } from '../src/server/db'
import { banks as banksData } from '../src/data/banks'
import type { BankOffer } from '../src/types/bank'

async function syncBanks() {
  console.log('🔄 Rozpoczynam synchronizację danych banków...\n')

  const banks = banksData as BankOffer[]
  let successCount = 0
  let errorCount = 0

  for (const bankData of banks) {
    try {
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

      console.log(`✅ ${bank.name} - zsynchronizowano`)
      successCount++
    } catch (error) {
      console.error(`❌ ${bankData.name} - błąd:`, error)
      errorCount++
    }
  }

  console.log(`\n📊 Podsumowanie:`)
  console.log(`   ✅ Sukces: ${successCount}`)
  console.log(`   ❌ Błędy: ${errorCount}`)
  console.log(`   📦 Łącznie: ${banks.length}`)
}

syncBanks()
  .then(() => {
    console.log('\n✨ Synchronizacja zakończona!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Błąd podczas synchronizacji:', error)
    process.exit(1)
  })

