/**
 * Skrypt do generowania favicon.ico z favicon.svg
 * 
 * Użycie:
 *   yarn tsx scripts/generate-favicon-ico.ts
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import sharp from 'sharp'
import toIco from 'to-ico'

const publicDir = resolve(process.cwd(), 'public')
const svgPath = resolve(publicDir, 'favicon.svg')
const icoPath = resolve(publicDir, 'favicon.ico')

async function generateFaviconIco() {
  console.log('🎨 Generowanie favicon.ico z favicon.svg...\n')

  try {
    // Wczytaj SVG
    const svgBuffer = readFileSync(svgPath)
    console.log(`✅ Wczytano: ${svgPath}`)

    // Rozmiary dla ICO (standardowe rozmiary favicon)
    const sizes = [16, 32, 48]

    // Konwertuj SVG na PNG w różnych rozmiarach
    const pngBuffers = await Promise.all(
      sizes.map(async (size) => {
        const pngBuffer = await sharp(svgBuffer)
          .resize(size, size, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          })
          .png()
          .toBuffer()

        console.log(`✅ Wygenerowano PNG ${size}x${size}px`)
        return pngBuffer
      }),
    )

    // Stwórz ICO z wszystkich rozmiarów
    const icoBuffer = await toIco(pngBuffers, {
      sizes: sizes,
    })

    // Zapisz favicon.ico
    writeFileSync(icoPath, icoBuffer)
    console.log(`\n✅ Zapisano: ${icoPath}`)
    console.log(`\n🎉 Favicon.ico został wygenerowany pomyślnie!`)
    console.log(`   Rozmiary: ${sizes.join(', ')}px`)
  } catch (error) {
    console.error('❌ Błąd podczas generowania favicon.ico:')
    if (error instanceof Error) {
      console.error(error.message)
      console.error(error.stack)
    } else {
      console.error(error)
    }
    process.exit(1)
  }
}

generateFaviconIco()

