import fs from 'node:fs/promises'
import path from 'node:path'

import axios from 'axios'
import { load } from 'cheerio'

const PAGE_URL = 'https://www.pkobp.pl/klient-indywidualny/kredyty-pozyczki/kredyt-hipoteczny'
const BANK_ID = 'pko-bp'

type BankEntry = {
  id: string
  baseInterestRate: number
  wibor?: number
  margin?: number
  commissionRate: number
  fixedInterestRate?: number
  updated?: string
}

const normalizeText = (text: string): string => {
  return text
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const parsePercentage = (input: string, label: string): number | undefined => {
  const rawValue = input.replace(',', '.')
  const value = Number.parseFloat(rawValue)
  if (Number.isNaN(value)) {
    console.warn(`⚠️ Nie udało się sparsować wartości dla ${label}:`, input)
    return undefined
  }
  return value
}

const extractPercentage = (text: string, pattern: RegExp, label: string): number | undefined => {
  const match = text.match(pattern)
  if (!match || !match[1]) {
    console.warn(`⚠️ Nie znaleziono wartości dla ${label}`)
    return undefined
  }
  return parsePercentage(match[1], label)
}

const parseDate = (input: string): string | undefined => {
  const match = input.match(/(\d{2})\.(\d{2})\.(\d{4})/)
  if (!match) {
    return undefined
  }
  const [, day, month, year] = match
  return `${year}-${month}-${day}`
}

async function fetchRepresentativeExample(): Promise<{
  sampleText: string
  fetchedAt: string
}> {
  const response = await axios.get<string>(PAGE_URL, {
    headers: {
      'User-Agent': 'credit-calculator-updater/1.0 (+https://leadkredyt.pl)',
      Accept: 'text/html,application/xhtml+xml',
    },
    timeout: 15000,
  })

  const $ = load(response.data)
  const text = normalizeText($('body').text())

  const startMarker = 'Przykład reprezentatywny dla PKO Banku Polskiego'
  const endMarker = 'Przykład reprezentatywny dla PKO Banku Hipotecznego'

  const startIndex = text.indexOf(startMarker)
  if (startIndex === -1) {
    throw new Error('Nie znaleziono sekcji z przykładem reprezentatywnym PKO BP')
  }

  const endIndex = text.indexOf(endMarker, startIndex + startMarker.length)
  const sampleText = text.slice(startIndex, endIndex === -1 ? undefined : endIndex)

  return {
    sampleText,
    fetchedAt: new Date().toISOString(),
  }
}

async function loadBanksFile(): Promise<BankEntry[]> {
  const banksPath = path.join(process.cwd(), 'src/data/banks.json')
  const content = await fs.readFile(banksPath, 'utf8')
  return JSON.parse(content) as BankEntry[]
}

async function saveBanksFile(data: unknown): Promise<void> {
  const banksPath = path.join(process.cwd(), 'src/data/banks.json')
  const serialized = `${JSON.stringify(data, null, 2)}\n`
  await fs.writeFile(banksPath, serialized, 'utf8')
}

async function main(): Promise<void> {
  console.log('🔍 Pobieranie danych z PKO BP...')
  const { sampleText, fetchedAt } = await fetchRepresentativeExample()

  const rrso = extractPercentage(sampleText, /RRSO[^0-9]*([\d.,]+)%/i, 'RRSO')
  const fixedRate = extractPercentage(
    sampleText,
    /oprocentowanie stałe[^0-9]*([\d.,]+)%/i,
    'oprocentowanie stałe',
  )
  const variableRate = extractPercentage(
    sampleText,
    /oprocentowanie zmienne[^0-9]*([\d.,]+)%/i,
    'oprocentowanie zmienne',
  )
  const wibor = extractPercentage(sampleText, /WIBOR\s*6M[^0-9]*([\d.,]+)%/i, 'WIBOR 6M')
  const margin = extractPercentage(sampleText, /marża\s+([\d.,]+)%/i, 'marża')
  const commission = extractPercentage(sampleText, /prowizja\s+([\d.,]+)%/i, 'prowizja')
  const calculationDateMatch = sampleText.match(
    /Kalkulacja została dokonana na\s+(\d{2}\.\d{2}\.\d{4})/i,
  )
  const calculationDateValue = calculationDateMatch?.[1]
  const calculationDate = calculationDateValue ? parseDate(calculationDateValue) : undefined

  console.log('ℹ️ Odnalezione wartości:', {
    rrso,
    fixedRate,
    variableRate,
    wibor,
    margin,
    commission,
    calculationDate,
  })

  const banks = await loadBanksFile()
  const bankIndex = banks.findIndex((bank) => bank.id === BANK_ID)

  if (bankIndex === -1) {
    throw new Error(`Nie znaleziono banku o id "${BANK_ID}" w banks.json`)
  }

  const currentBank = banks[bankIndex]
  if (!currentBank) {
    throw new Error(`Nie znaleziono banku o id "${BANK_ID}" w banks.json`)
  }
  const updatedBank: BankEntry & {
    meta?: Record<string, unknown>
  } = {
    ...currentBank,
    ...(variableRate ? { baseInterestRate: variableRate } : {}),
    ...(fixedRate ? { fixedInterestRate: fixedRate } : {}),
    ...(wibor ? { wibor } : {}),
    ...(margin ? { margin } : {}),
    ...(commission !== undefined ? { commissionRate: commission } : {}),
    updated: new Date().toISOString().slice(0, 10),
  }

  if (rrso !== undefined || calculationDate) {
    updatedBank.meta = {
      ...(currentBank as { meta?: Record<string, unknown> }).meta,
      ...(rrso !== undefined ? { representativeRRSO: rrso } : {}),
      ...(calculationDate ? { representativeExampleDate: calculationDate } : {}),
      source: PAGE_URL,
      fetchedAt,
    }
  }

  banks[bankIndex] = updatedBank
  await saveBanksFile(banks)
  console.log('✅ Zaktualizowano wpis PKO BP w src/data/banks.json')
}

main().catch((error) => {
  console.error('❌ Błąd podczas aktualizacji danych PKO BP:')
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
