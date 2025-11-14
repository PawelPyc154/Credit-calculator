import fs from 'node:fs/promises'
import path from 'node:path'

import pdfParse from 'pdf-parse'

type BankEntry = {
  id: string
  baseInterestRate: number
  fixedInterestRate?: number
  wibor?: number
  margin?: number
  commissionRate: number
  insuranceRate: number
  updated?: string
  meta?: Record<string, unknown>
}

const BANK_ID = 'pko-bp'
const DOCS_DIR = path.join(process.cwd(), 'docs/pko-bp')
const BANKS_PATH = path.join(process.cwd(), 'src/data/banks.json')

const normalizeComparable = (input: string): string =>
  input.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

const findDoc = async (matcher: (file: string) => boolean): Promise<string> => {
  const files = await fs.readdir(DOCS_DIR)
  const found = files.find((file) => matcher(normalizeComparable(file)))
  if (!found) {
    throw new Error('Nie znaleziono pliku spełniającego kryteria w docs/pko-bp')
  }
  return path.join(DOCS_DIR, found)
}

const readJson = async <T>(filePath: string): Promise<T> => {
  const content = await fs.readFile(filePath, 'utf8')
  return JSON.parse(content) as T
}

const writeJson = async (filePath: string, data: unknown): Promise<void> => {
  const serialized = `${JSON.stringify(data, null, 2)}\n`
  await fs.writeFile(filePath, serialized, 'utf8')
}

const normalizeWhitespace = (input: string): string =>
  input.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim()

const extractNumber = (text: string, label: string): number | undefined => {
  const normalized = text.replace(',', '.')
  const value = Number.parseFloat(normalized)
  if (Number.isNaN(value)) {
    console.warn(`⚠️ Nie udało się sparsować wartości dla ${label}:`, text)
    return undefined
  }
  return value
}

const matchPercentage = (text: string, pattern: RegExp, label: string): number | undefined => {
  const match = text.match(pattern)
  if (!match) {
    console.warn(`⚠️ Nie znaleziono wartości dla ${label}`)
    return undefined
  }
  return extractNumber(match[1], label)
}

const parseDate = (input: string): string | undefined => {
  const match = input.match(/(\d{2})\.(\d{2})\.(\d{4})/)
  if (!match) {
    return undefined
  }
  const [, day, month, year] = match
  return `${year}-${month}-${day}`
}

const loadRepresentativeExample = async (): Promise<{
  data: {
    rrso?: number
    fixedRate?: number
    variableRate?: number
    wibor?: number
    margin?: number
    fixedMargin?: number
    commission?: number
    calculationDate?: string
  }
  source: string
  snippet: string
}> => {
  const filePath = await findDoc((file) =>
    file.startsWith('informacje_ogolne_dotyczace_umowy_o_kredyt_hipoteczny'),
  )
  const buffer = await fs.readFile(filePath)
  const parsed = await pdfParse(buffer)
  const text = normalizeWhitespace(parsed.text)

  const snippetStart = text
    .toLowerCase()
    .indexOf('rrso) dla wypłaconego jednorazowo kredytu własny kąt hipoteczny')

  if (snippetStart === -1) {
    throw new Error('Nie znaleziono sekcji z przykładem reprezentatywnym dla Własny Kąt')
  }

  const snippet = text.slice(snippetStart, snippetStart + 1200)

  const marginMatches = [...snippet.matchAll(/marża\s*([\d.,]+)%/gi)]

  const data = {
    rrso: matchPercentage(snippet, /wynosi\s+([\d.,]+)%/i, 'RRSO'),
    fixedRate: matchPercentage(snippet, /oprocentowanie stałe:\s*([\d.,]+)%/i, 'oprocentowanie stałe'),
    variableRate: matchPercentage(
      snippet,
      /oprocentowanie zmienne\s*([\d.,]+)%/i,
      'oprocentowanie zmienne',
    ),
    wibor: matchPercentage(snippet, /WIBOR\s*6M\s*([\d.,]+)%/i, 'WIBOR 6M'),
    fixedMargin:
      marginMatches.length > 0 ? extractNumber(marginMatches[0][1], 'marża stała') : undefined,
    margin:
      marginMatches.length > 1
        ? extractNumber(marginMatches[marginMatches.length - 1][1], 'marża zmienna')
        : undefined,
    commission: matchPercentage(snippet, /prowizja\s*([\d.,]+)%/i, 'prowizja'),
    calculationDate: parseDate(
      text.match(/Kalkulacja została dokonana na\s+(\d{2}\.\d{2}\.\d{4})/i)?.[1] ?? '',
    ),
  }

  return { data, source: path.relative(process.cwd(), filePath), snippet }
}

const loadInterestRateDocument = async (): Promise<{
  data: {
    effectiveDate?: string
  }
  source: string
}> => {
  const filePath = await findDoc((file) =>
    file.toLowerCase().startsWith('oprocentowanie_kredytu'),
  )
  const buffer = await fs.readFile(filePath)
  const result = await pdfParse(buffer)
  const text = normalizeWhitespace(result.text)

  const dateMatch =
    text.match(/obowiązuje od\s+(\d{2}\.\d{2}\.\d{4})/i)?.[1] ??
    text.match(/stan na\s+(\d{2}\.\d{2}\.\d{4})/i)?.[1]

  return {
    data: {
      effectiveDate: dateMatch ? parseDate(dateMatch) : undefined,
    },
    source: path.relative(process.cwd(), filePath),
  }
}

async function main(): Promise<void> {
  console.log('🔍 Analiza dokumentów PKO BP w docs/pko-bp/')

  const [representative, interestDoc] = await Promise.all([
    loadRepresentativeExample(),
    loadInterestRateDocument(),
  ])

  console.log('📝 Podgląd tekstu z przykładu reprezentatywnego (pierwsze 500 znaków):')
  console.log('Źródło:', representative.source)
  console.log(representative.snippet.slice(0, 500))

  console.log('ℹ️ Wyciągnięte dane z dokumentów:', representative.data, interestDoc.data)

  const banks = await readJson<BankEntry[]>(BANKS_PATH)
  const bankIndex = banks.findIndex((bank) => bank.id === BANK_ID)
  if (bankIndex === -1) {
    throw new Error(`Nie znaleziono banku o id "${BANK_ID}" w banks.json`)
  }

  const current = banks[bankIndex]

  const currentMeta = current.meta ?? {}

  const updatedMeta: Record<string, unknown> = {
    ...currentMeta,
    ...(representative.data.rrso !== undefined
      ? { representativeRRSO: representative.data.rrso }
      : {}),
    ...(representative.data.fixedMargin !== undefined
      ? { representativeFixedMargin: representative.data.fixedMargin }
      : {}),
    ...(representative.data.calculationDate
      ? { representativeExampleDate: representative.data.calculationDate }
      : {}),
    ...(interestDoc.data.effectiveDate
      ? { interestDocumentEffectiveDate: interestDoc.data.effectiveDate }
      : {}),
    sources: [
      representative.source,
      interestDoc.source,
    ],
    representativeSnippet: representative.snippet,
  }

  const updated: BankEntry = {
    ...current,
    ...(representative.data.variableRate ? { baseInterestRate: representative.data.variableRate } : {}),
    ...(representative.data.fixedRate ? { fixedInterestRate: representative.data.fixedRate } : {}),
    ...(representative.data.wibor ? { wibor: representative.data.wibor } : {}),
    ...(representative.data.margin ? { margin: representative.data.margin } : {}),
    ...(representative.data.commission !== undefined
      ? { commissionRate: representative.data.commission }
      : {}),
    updated: new Date().toISOString().slice(0, 10),
    meta: updatedMeta,
  }

  banks[bankIndex] = updated
  await writeJson(BANKS_PATH, banks)

  console.log('✅ Zaktualizowano wpis PKO BP w src/data/banks.json')
}

main().catch((error) => {
  console.error('❌ Błąd podczas aktualizacji danych PKO BP:', error)
  process.exit(1)
})

