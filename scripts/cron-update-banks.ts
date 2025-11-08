/**
 * Skrypt do uruchamiania automatycznej aktualizacji danych banków
 * 
 * Można uruchomić:
 * - Ręcznie: yarn tsx scripts/cron-update-banks.ts
 * - Przez node-cron: yarn cron:start
 * - Przez systemowy cron (Linux/Mac)
 * 
 * Przykład cron job (codziennie o 6:00):
 * 0 6 * * * cd /path/to/project && yarn tsx scripts/cron-update-banks.ts
 */

import cron from 'node-cron'
import { updateAllBanks } from '../src/utils/bank-data-fetcher'
import { db } from '../src/server/db'
import type { BankOffer } from '../src/types/bank'

async function runUpdate() {
  console.log(`\n🔄 [${new Date().toISOString()}] Rozpoczynam aktualizację danych banków...`)

  const stats = await updateAllBanks(async (bankId, updates) => {
    const currentBank = await db.bank.findUnique({
      where: { id: bankId },
    })

    if (!currentBank) {
      console.warn(`Bank ${bankId} nie istnieje w bazie`)
      return
    }

    // Konwertuj do BankOffer
    const bankOffer: BankOffer = {
      id: currentBank.id,
      name: currentBank.name,
      logo: currentBank.logo ?? undefined,
      baseInterestRate: currentBank.baseInterestRate,
      wibor: currentBank.wibor ?? undefined,
      margin: currentBank.margin ?? undefined,
      commissionRate: currentBank.commissionRate,
      insuranceRate: currentBank.insuranceRate,
      minLoanAmount: currentBank.minLoanAmount,
      maxLoanAmount: currentBank.maxLoanAmount,
      minLoanPeriod: currentBank.minLoanPeriod,
      maxLoanPeriod: currentBank.maxLoanPeriod,
      minDownPaymentPercent: currentBank.minDownPaymentPercent,
      supportedPurposes: currentBank.supportedPurposes as Array<
        'purchase' | 'refinancing' | 'construction'
      >,
      supportedInterestRateTypes: currentBank.supportedInterestRateTypes as Array<
        'fixed' | 'variable'
      >,
      fixedInterestRate: currentBank.fixedInterestRate ?? undefined,
      description: currentBank.description ?? undefined,
      earlyRepaymentFee: currentBank.earlyRepaymentFee ?? undefined,
      accountRequired: currentBank.accountRequired ?? undefined,
      accountFee: currentBank.accountFee ?? undefined,
      propertyInsuranceRequired: currentBank.propertyInsuranceRequired ?? undefined,
      lifeInsuranceRequired: currentBank.lifeInsuranceRequired ?? undefined,
      processingTime: currentBank.processingTime ?? undefined,
      specialOffers: currentBank.specialOffers,
      advantages: currentBank.advantages,
      disadvantages: currentBank.disadvantages,
      ltv: {
        ratio80: currentBank.ltvRatio80 ?? undefined,
        ratio90: currentBank.ltvRatio90 ?? undefined,
        ratio95: currentBank.ltvRatio95 ?? undefined,
      },
      updated: currentBank.updated.toISOString().split('T')[0],
      affiliate:
        currentBank.affiliateEnabled && currentBank.affiliateUrl
          ? {
              enabled: currentBank.affiliateEnabled,
              url: currentBank.affiliateUrl,
              campaignId: currentBank.affiliateCampaignId ?? undefined,
              commission: currentBank.affiliateCommission ?? undefined,
              cookiesTime: currentBank.affiliateCookiesTime ?? undefined,
              restrictions: currentBank.affiliateRestrictions,
              notes: currentBank.affiliateNotes ?? undefined,
            }
          : undefined,
    }

    // Aktualizuj zmienne dane
    const { updateVariableData } = await import('../src/utils/bank-data-fetcher')
    const variableUpdates = await updateVariableData(bankOffer)

    // Połącz wszystkie aktualizacje
    const allUpdates = { ...updates, ...variableUpdates }

    // Aktualizuj w bazie
    await db.bank.update({
      where: { id: bankId },
      data: {
        ...(allUpdates.baseInterestRate !== undefined && {
          baseInterestRate: allUpdates.baseInterestRate,
        }),
        ...(allUpdates.wibor !== undefined && { wibor: allUpdates.wibor }),
        ...(allUpdates.margin !== undefined && { margin: allUpdates.margin }),
        ...(allUpdates.commissionRate !== undefined && {
          commissionRate: allUpdates.commissionRate,
        }),
        ...(allUpdates.insuranceRate !== undefined && {
          insuranceRate: allUpdates.insuranceRate,
        }),
        updated: new Date(),
      },
    })
  })

  console.log(`✅ [${new Date().toISOString()}] Aktualizacja zakończona:`)
  console.log(`   📊 Łącznie: ${stats.total}`)
  console.log(`   ✅ Zaktualizowano: ${stats.updated}`)
  console.log(`   ❌ Błędy: ${stats.failed}`)
  if (stats.errors.length > 0) {
    console.log(`   ⚠️  Błędy szczegółowe:`)
    stats.errors.forEach(({ bankId, error }) => {
      console.log(`      - ${bankId}: ${error}`)
    })
  }
}

// Eksportuj funkcję do użycia w cron job
export { runUpdate }

// Jeśli uruchomiony bezpośrednio (nie przez cron), wykonaj raz
// Jeśli ENABLE_CRON=true, uruchom cron scheduler
if (process.env.ENABLE_CRON === 'true') {
  console.log('⏰ Uruchamiam cron job (codziennie o 6:00)...')
  cron.schedule('0 6 * * *', () => {
    runUpdate().catch(console.error)
  })
  // Uruchom też od razu przy starcie
  runUpdate().catch(console.error)
} else {
  // Uruchom raz i zakończ
  runUpdate()
    .then(() => {
      console.log('\n✨ Zakończono')
      process.exit(0)
    })
    .catch((error) => {
      console.error('\n💥 Błąd:', error)
      process.exit(1)
    })
}

