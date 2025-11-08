-- CreateTable
CREATE TABLE "Bank" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "baseInterestRate" DOUBLE PRECISION NOT NULL,
    "wibor" DOUBLE PRECISION,
    "margin" DOUBLE PRECISION,
    "commissionRate" DOUBLE PRECISION NOT NULL,
    "insuranceRate" DOUBLE PRECISION NOT NULL,
    "minLoanAmount" INTEGER NOT NULL,
    "maxLoanAmount" INTEGER NOT NULL,
    "minLoanPeriod" INTEGER NOT NULL,
    "maxLoanPeriod" INTEGER NOT NULL,
    "minDownPaymentPercent" INTEGER NOT NULL,
    "supportedPurposes" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "supportedInterestRateTypes" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "fixedInterestRate" DOUBLE PRECISION,
    "description" TEXT,
    "earlyRepaymentFee" DOUBLE PRECISION,
    "accountRequired" BOOLEAN DEFAULT false,
    "accountFee" DOUBLE PRECISION DEFAULT 0,
    "propertyInsuranceRequired" BOOLEAN DEFAULT true,
    "lifeInsuranceRequired" BOOLEAN DEFAULT false,
    "processingTime" TEXT,
    "specialOffers" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "advantages" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "disadvantages" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "ltvRatio80" DOUBLE PRECISION DEFAULT 0,
    "ltvRatio90" DOUBLE PRECISION DEFAULT 0,
    "ltvRatio95" DOUBLE PRECISION DEFAULT 0,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "affiliateEnabled" BOOLEAN DEFAULT false,
    "affiliateUrl" TEXT,
    "affiliateCampaignId" TEXT,
    "affiliateCommission" DOUBLE PRECISION,
    "affiliateCookiesTime" INTEGER,
    "affiliateRestrictions" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "affiliateNotes" TEXT,

    CONSTRAINT "Bank_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Bank_id_idx" ON "Bank"("id");

-- CreateIndex
CREATE INDEX "Bank_updated_idx" ON "Bank"("updated");

