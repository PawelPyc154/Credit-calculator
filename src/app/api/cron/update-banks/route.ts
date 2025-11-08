import { NextResponse } from 'next/server'
import { db } from 'server/db'
import { updateAllBanks } from 'utils/bank-data-fetcher'
import type { BankOffer } from 'types/bank'

/**
 * API endpoint do automatycznej aktualizacji danych banków
 * 
 * Można wywołać:
 * - Ręcznie: GET /api/cron/update-banks
 * - Przez cron job (Vercel Cron, GitHub Actions, itp.)
 * - Przez node-cron w aplikacji
 * 
 * Zabezpieczenie: W produkcji dodaj autoryzację (np. secret token w headerze)
 */
export async function GET(request: Request) {
  try {
    // W produkcji dodaj autoryzację:
    // const authHeader = request.headers.get('authorization')
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    console.log('🔄 Rozpoczynam automatyczną aktualizację danych banków...')

    const stats = await updateAllBanks(async (bankId, updates) => {
      // Pobierz aktualny bank z bazy
      const currentBank = await db.bank.findUnique({
        where: { id: bankId },
      })

      if (!currentBank) {
        console.warn(`Bank ${bankId} nie istnieje w bazie`)
        return
      }

      // Konwertuj do BankOffer dla funkcji updateVariableData
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

      // Aktualizuj tylko zmienne dane (WIBOR, oprocentowanie)
      // Scraping dane są już w updates
      const variableUpdates = await import('utils/bank-data-fetcher').then((m) =>
        m.updateVariableData(bankOffer),
      )

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

    console.log('✅ Aktualizacja zakończona:', stats)

    return NextResponse.json({
      success: true,
      message: 'Aktualizacja danych banków zakończona',
      stats,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('❌ Błąd podczas aktualizacji danych banków:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

