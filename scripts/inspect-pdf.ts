import fs from 'node:fs/promises'
import path from 'node:path'

import pdfParse from 'pdf-parse'

async function inspect(file: string): Promise<void> {
  const resolved = path.resolve(file)
  const buffer = await fs.readFile(resolved)
  const result = await pdfParse(buffer)
  console.log('====', path.basename(file), '====')
  console.log(result.text.slice(0, 1000))
  const matches = result.text.match(/RRSO[\s\S]{0,600}/gi)
  if (matches) {
    console.log('--- Dopasowania RRSO ---')
    for (const match of matches) {
      console.log(match)
      console.log('-----------------------')
    }
  } else {
    console.log('Brak dopasowań RRSO w pierwszym 300-znakowym oknie.')
  }
}

async function main(): Promise<void> {
  const files = process.argv.slice(2)
  if (files.length === 0) {
    console.error('Podaj ścieżki do PDF-ów jako argumenty.')
    process.exit(1)
  }

  for (const file of files) {
    await inspect(file)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
