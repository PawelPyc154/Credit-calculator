#!/usr/bin/env tsx
/**
 * Skrypt do generowania obrazka OG dla artykułu o zagrożeniach kredytowych
 * Konwertuje SVG na PNG używając sharp
 */

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function generateOGImage() {
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
      console.log('\n💡 Alternatywnie, użyj pliku HTML:')
      console.log('   Otwórz scripts/generate-zagrozenia-og-image.html w przeglądarce')
      process.exit(1)
    }

    const svgPath = join(__dirname, '../public/images/blog/zagrozenia-kredytowe-og.svg')
    const pngPath = join(__dirname, '../public/images/blog/zagrozenia-kredytowe-og.jpg')

    console.log('📸 Generowanie obrazka OG...')
    console.log(`   SVG: ${svgPath}`)
    console.log(`   Output: ${pngPath}`)

    // Wczytaj SVG
    const svgBuffer = readFileSync(svgPath)

    // Konwertuj SVG na PNG/JPG
    const imageBuffer = await sharp(svgBuffer)
      .resize(1200, 630, {
        fit: 'contain',
        background: { r: 5, g: 150, b: 105, alpha: 1 }, // emerald-600 jako tło
      })
      .jpeg({ quality: 95, mozjpeg: true })
      .toBuffer()

    // Zapisz jako JPG
    writeFileSync(pngPath, imageBuffer)

    console.log('✅ Obrazek został wygenerowany!')
    console.log(`   Plik: ${pngPath}`)
    console.log('\n📱 Następne kroki:')
    console.log('   1. Sprawdź obrazek w: public/images/blog/zagrozenia-kredytowe-og.jpg')
    console.log('   2. Odśwież cache Facebooka: https://developers.facebook.com/tools/debug/')
    console.log('   3. Wklej URL: https://www.kredytanaliza.pl/blog/zagrozenia-kredytowe')
  } catch (error) {
    console.error('❌ Błąd podczas generowania obrazka:', error)
    process.exit(1)
  }
}

generateOGImage()

