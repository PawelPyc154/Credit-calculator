#!/usr/bin/env tsx
/**
 * Skrypt do generowania głównego obrazka OG dla strony głównej
 * Konwertuje og-image-source.svg na og-image.jpg
 */

import { readFileSync, writeFileSync, statSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function generateMainOGImage() {
  try {
    // Sprawdź czy sharp jest dostępny
    let sharp: any
    try {
      sharp = (await import('sharp')).default
    } catch (error) {
      console.error('❌ Biblioteka "sharp" nie jest zainstalowana.')
      console.log('\n📦 Instalacja:')
      console.log('   npm install sharp')
      console.log('   lub')
      console.log('   yarn add sharp')
      process.exit(1)
    }

    const svgPath = join(__dirname, '../public/og-image-source.svg')
    const jpgPath = join(__dirname, '../public/og-image.jpg')

    console.log('📸 Generowanie głównego obrazka OG...')
    console.log(`   SVG: ${svgPath}`)
    console.log(`   Output: ${jpgPath}`)

    // Wczytaj SVG
    const svgBuffer = readFileSync(svgPath)

    // Konwertuj SVG na JPG
    const imageBuffer = await sharp(svgBuffer)
      .resize(1200, 630, {
        fit: 'contain',
        background: { r: 5, g: 150, b: 105, alpha: 1 }, // emerald-600 jako tło
      })
      .jpeg({ quality: 95, mozjpeg: true })
      .toBuffer()

    // Zapisz jako JPG
    writeFileSync(jpgPath, imageBuffer)

    const stats = statSync(jpgPath)
    const fileSizeInKB = (stats.size / 1024).toFixed(2)

    console.log('✅ Obrazek został wygenerowany!')
    console.log(`   Plik: ${jpgPath}`)
    console.log(`   Rozmiar: ${fileSizeInKB} KB`)
    console.log('\n📱 Obrazek jest gotowy do użycia na Facebooku!')
  } catch (error) {
    console.error('❌ Błąd podczas generowania obrazka:', error)
    process.exit(1)
  }
}

generateMainOGImage()

