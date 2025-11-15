#!/usr/bin/env tsx
/**
 * Skrypt do generowania obrazków OG dla wszystkich artykułów blogowych
 * Czyta metadata z plików page.tsx i generuje dedykowane obrazki OG
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface ArticleInfo {
  slug: string
  title: string
  description?: string
}

async function generateOGImage(article: ArticleInfo) {
  try {
    let sharp: any
    try {
      sharp = (await import('sharp')).default
    } catch (error) {
      console.error('❌ Biblioteka "sharp" nie jest zainstalowana.')
      process.exit(1)
    }

    const outputDir = join(__dirname, '../public/images/blog')
    const svgPath = join(outputDir, `${article.slug}-og.svg`)
    const jpgPath = join(outputDir, `${article.slug}-og.jpg`)

    // Generuj SVG
    const svg = generateSVG(article)
    writeFileSync(svgPath, svg)

    // Konwertuj SVG na JPG
    const svgBuffer = readFileSync(svgPath)
    const imageBuffer = await sharp(svgBuffer)
      .resize(1200, 630, {
        fit: 'contain',
        background: { r: 5, g: 150, b: 105, alpha: 1 }, // emerald-600
      })
      .jpeg({ quality: 95, mozjpeg: true })
      .toBuffer()

    writeFileSync(jpgPath, imageBuffer)
    const stats = statSync(jpgPath)
    const fileSizeInKB = (stats.size / 1024).toFixed(2)

    return { success: true, size: fileSizeInKB }
  } catch (error) {
    console.error(`❌ Błąd dla ${article.slug}:`, error)
    return { success: false, error: String(error) }
  }
}

function getIconForArticle(slug: string, title: string): string {
  const lowerSlug = slug.toLowerCase()
  const lowerTitle = title.toLowerCase()
  
  // Mapowanie ikon na podstawie słów kluczowych
  if (lowerSlug.includes('zagrozenia') || lowerSlug.includes('pulapki') || lowerSlug.includes('ostrzezenie')) {
    return getWarningIcon()
  }
  if (lowerSlug.includes('ukryte-koszty') || lowerSlug.includes('koszty') || lowerSlug.includes('prowizja')) {
    return getMoneyIcon()
  }
  if (lowerSlug.includes('ranking') || lowerSlug.includes('bankow')) {
    return getTrophyIcon()
  }
  if (lowerSlug.includes('zdolnosc-kredytowa') || lowerSlug.includes('obliczyc')) {
    return getCalculatorIcon()
  }
  if (lowerSlug.includes('ubezpieczenie')) {
    return getShieldIcon()
  }
  if (lowerSlug.includes('oprocentowanie') || lowerSlug.includes('stopy-procentowe')) {
    return getChartIcon()
  }
  if (lowerSlug.includes('refinansowanie') || lowerSlug.includes('wczesniejsza-splata')) {
    return getRefreshIcon()
  }
  if (lowerSlug.includes('dokumenty') || lowerSlug.includes('wniosek')) {
    return getDocumentIcon()
  }
  if (lowerSlug.includes('negocjowac') || lowerSlug.includes('wybrac')) {
    return getHandshakeIcon()
  }
  if (lowerSlug.includes('rozwod') || lowerSlug.includes('smierc') || lowerSlug.includes('nie-mozesz-splacac')) {
    return getHelpIcon()
  }
  if (lowerSlug.includes('mlodych') || lowerSlug.includes('singla') || lowerSlug.includes('przedsiebiorcy')) {
    return getUsersIcon()
  }
  if (lowerSlug.includes('budowe-domu') || lowerSlug.includes('wklad-wlasny')) {
    return getHomeIcon()
  }
  if (lowerSlug.includes('rrso')) {
    return getPercentIcon()
  }
  if (lowerSlug.includes('jak-') || lowerSlug.includes('poradnik')) {
    return getGuideIcon()
  }
  
  // Domyślnie kalkulator
  return getCalculatorIcon()
}

function getCalculatorIcon(): string {
  return `<g transform="translate(500, 180)" filter="url(#textShadow)">
    <rect x="0" y="0" width="200" height="140" rx="18" fill="white" opacity="0.95"/>
    <line x1="100" y1="0" x2="100" y2="140" stroke="#059669" stroke-width="4" stroke-linecap="round"/>
    <line x1="0" y1="70" x2="200" y2="70" stroke="#059669" stroke-width="4" stroke-linecap="round"/>
    <line x1="50" y1="0" x2="50" y2="140" stroke="#10b981" stroke-width="2" stroke-opacity="0.3" stroke-linecap="round"/>
    <line x1="150" y1="0" x2="150" y2="140" stroke="#10b981" stroke-width="2" stroke-opacity="0.3" stroke-linecap="round"/>
    <line x1="0" y1="35" x2="200" y2="35" stroke="#10b981" stroke-width="2" stroke-opacity="0.3" stroke-linecap="round"/>
    <line x1="0" y1="105" x2="200" y2="105" stroke="#10b981" stroke-width="2" stroke-opacity="0.3" stroke-linecap="round"/>
  </g>`
}

function getWarningIcon(): string {
  return `<g transform="translate(500, 180)" filter="url(#textShadow)">
    <circle cx="100" cy="70" r="70" fill="white" opacity="0.95"/>
    <circle cx="100" cy="70" r="50" fill="#dc2626"/>
    <text x="100" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="60" font-weight="bold" fill="white" text-anchor="middle">!</text>
  </g>`
}

function getMoneyIcon(): string {
  return `<g transform="translate(500, 180)" filter="url(#textShadow)">
    <circle cx="100" cy="70" r="70" fill="white" opacity="0.95"/>
    <circle cx="100" cy="70" r="50" fill="#f59e0b"/>
    <text x="100" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="50" font-weight="bold" fill="white" text-anchor="middle">$</text>
  </g>`
}

function getTrophyIcon(): string {
  return `<g transform="translate(500, 180)" filter="url(#textShadow)">
    <path d="M 100 20 L 120 40 L 120 60 L 100 70 L 80 60 L 80 40 Z" fill="white" opacity="0.95"/>
    <rect x="90" y="70" width="20" height="30" rx="5" fill="white" opacity="0.95"/>
    <rect x="85" y="100" width="30" height="10" rx="5" fill="white" opacity="0.95"/>
    <circle cx="100" cy="50" r="15" fill="#fbbf24"/>
  </g>`
}

function getShieldIcon(): string {
  return `<g transform="translate(500, 180)" filter="url(#textShadow)">
    <path d="M 100 20 Q 60 20 60 50 Q 60 80 100 120 Q 140 80 140 50 Q 140 20 100 20" fill="white" opacity="0.95" stroke="#059669" stroke-width="3"/>
    <path d="M 100 40 Q 75 40 75 55 Q 75 70 100 100 Q 125 70 125 55 Q 125 40 100 40" fill="#059669"/>
  </g>`
}

function getChartIcon(): string {
  return `<g transform="translate(500, 180)" filter="url(#textShadow)">
    <rect x="40" y="100" width="30" height="40" rx="5" fill="white" opacity="0.95"/>
    <rect x="80" y="70" width="30" height="70" rx="5" fill="white" opacity="0.95"/>
    <rect x="120" y="50" width="30" height="90" rx="5" fill="white" opacity="0.95"/>
    <rect x="160" y="80" width="30" height="60" rx="5" fill="white" opacity="0.95"/>
  </g>`
}

function getRefreshIcon(): string {
  return `<g transform="translate(500, 180)" filter="url(#textShadow)">
    <circle cx="100" cy="70" r="60" fill="none" stroke="white" stroke-width="6" opacity="0.95"/>
    <path d="M 100 30 Q 70 30 60 50" stroke="white" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.95"/>
    <path d="M 60 50 L 50 40 L 60 30" stroke="white" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.95"/>
    <path d="M 100 110 Q 130 110 140 90" stroke="white" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.95"/>
    <path d="M 140 90 L 150 100 L 140 110" stroke="white" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.95"/>
  </g>`
}

function getDocumentIcon(): string {
  return `<g transform="translate(500, 180)" filter="url(#textShadow)">
    <rect x="60" y="30" width="80" height="100" rx="5" fill="white" opacity="0.95"/>
    <line x1="80" y1="50" x2="140" y2="50" stroke="#059669" stroke-width="3" stroke-linecap="round"/>
    <line x1="80" y1="70" x2="140" y2="70" stroke="#059669" stroke-width="3" stroke-linecap="round"/>
    <line x1="80" y1="90" x2="120" y2="90" stroke="#059669" stroke-width="3" stroke-linecap="round"/>
    <path d="M 60 30 L 80 30 L 80 50 L 100 50" fill="white" opacity="0.95"/>
  </g>`
}

function getHandshakeIcon(): string {
  return `<g transform="translate(500, 180)" filter="url(#textShadow)">
    <path d="M 60 90 L 80 70 L 100 80 L 120 60 L 140 80" stroke="white" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.95"/>
    <circle cx="70" cy="85" r="8" fill="white" opacity="0.95"/>
    <circle cx="130" cy="75" r="8" fill="white" opacity="0.95"/>
  </g>`
}

function getHelpIcon(): string {
  return `<g transform="translate(500, 180)" filter="url(#textShadow)">
    <circle cx="100" cy="70" r="60" fill="white" opacity="0.95"/>
    <circle cx="100" cy="70" r="50" fill="#3b82f6"/>
    <text x="100" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="50" font-weight="bold" fill="white" text-anchor="middle">?</text>
  </g>`
}

function getUsersIcon(): string {
  return `<g transform="translate(500, 180)" filter="url(#textShadow)">
    <circle cx="80" cy="60" r="25" fill="white" opacity="0.95"/>
    <circle cx="120" cy="60" r="25" fill="white" opacity="0.95"/>
    <path d="M 50 90 Q 80 110 100 110 Q 120 110 150 90" stroke="white" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.95"/>
  </g>`
}

function getHomeIcon(): string {
  return `<g transform="translate(500, 180)" filter="url(#textShadow)">
    <path d="M 100 30 L 60 60 L 60 100 L 80 100 L 80 80 L 120 80 L 120 100 L 140 100 L 140 60 Z" fill="white" opacity="0.95"/>
    <rect x="90" y="100" width="20" height="30" fill="white" opacity="0.95"/>
  </g>`
}

function getPercentIcon(): string {
  return `<g transform="translate(500, 180)" filter="url(#textShadow)">
    <circle cx="80" cy="50" r="20" fill="white" opacity="0.95" stroke="#059669" stroke-width="3"/>
    <circle cx="120" cy="90" r="20" fill="white" opacity="0.95" stroke="#059669" stroke-width="3"/>
    <line x1="70" y1="60" x2="130" y2="80" stroke="#059669" stroke-width="5" stroke-linecap="round"/>
  </g>`
}

function getGuideIcon(): string {
  return `<g transform="translate(500, 180)" filter="url(#textShadow)">
    <rect x="60" y="30" width="80" height="100" rx="8" fill="white" opacity="0.95"/>
    <line x1="75" y1="50" x2="125" y2="50" stroke="#059669" stroke-width="3" stroke-linecap="round"/>
    <line x1="75" y1="70" x2="125" y2="70" stroke="#059669" stroke-width="3" stroke-linecap="round"/>
    <line x1="75" y1="90" x2="110" y2="90" stroke="#059669" stroke-width="3" stroke-linecap="round"/>
    <circle cx="100" cy="110" r="8" fill="#059669"/>
  </g>`
}

function wrapText(text: string, maxLength: number, maxLines: number = 2): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = ''
  
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    if (testLine.length <= maxLength) {
      currentLine = testLine
    } else {
      if (currentLine) {
        lines.push(currentLine)
        currentLine = word
      } else {
        // Słowo jest za długie - podziel je
        lines.push(word.substring(0, maxLength))
        currentLine = word.substring(maxLength)
      }
      if (lines.length >= maxLines) break
    }
  }
  
  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine)
  }
  
  return lines
}

function generateSVG(article: ArticleInfo): string {
  // Podziel tytuł na linie (max 2 linie, max 45 znaków na linię)
  const titleLines = wrapText(article.title, 45, 2)
  
  // Skróć podtytuł jeśli jest za długi
  const subtitle = article.description 
    ? (article.description.length > 70 ? article.description.substring(0, 67) + '...' : article.description)
    : 'Poznaj najważniejsze informacje o kredytach hipotecznych'

  // Wybierz ikonę na podstawie tematu
  const icon = getIconForArticle(article.slug, article.title)

  // Generuj SVG z wieloliniowym tytułem
  let titleSVG = ''
  const startY = titleLines.length === 1 ? 380 : 360
  const lineHeight = 60
  
  titleLines.forEach((line, index) => {
    const y = startY + (index * lineHeight)
    titleSVG += `<text x="600" y="${y}" font-family="system-ui, -apple-system, sans-serif" font-size="${titleLines.length === 1 ? '52' : '46'}" font-weight="bold" fill="white" text-anchor="middle" filter="url(#textShadow)">${escapeXml(line)}</text>\n  `
  })

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#059669;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#10b981;stop-opacity:1" />
    </linearGradient>
    <filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="5"/>
      <feOffset dx="0" dy="3" result="offsetblur"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.5"/>
      </feComponentTransfer>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <rect width="1200" height="630" fill="url(#bgGradient)"/>
  
  <circle cx="100" cy="100" r="80" fill="white" opacity="0.1"/>
  <circle cx="1100" cy="530" r="120" fill="white" opacity="0.1"/>
  
  <!-- Ikona -->
  ${icon}
  
  <!-- Tytuł (wieloliniowy) -->
  ${titleSVG}
  
  <!-- Podtytuł -->
  <text x="600" y="${startY + (titleLines.length * lineHeight) + 20}" font-family="system-ui, -apple-system, sans-serif" font-size="26" fill="white" text-anchor="middle" opacity="0.95" filter="url(#textShadow)">
    ${escapeXml(subtitle)}
  </text>
  
  <!-- URL -->
  <text x="600" y="540" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="white" text-anchor="middle" opacity="0.85">
    www.kredytanaliza.pl
  </text>
</svg>`
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function extractArticleInfo(filePath: string): ArticleInfo | null {
  try {
    const content = readFileSync(filePath, 'utf-8')
    
    // Wyciągnij slug z ścieżki
    const slugMatch = filePath.match(/blog\/([^\/]+)\/page\.tsx$/)
    if (!slugMatch) return null
    
    const slug = slugMatch[1]
    
    // Wyciągnij tytuł z metadata
    const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/)
    if (!titleMatch) return null
    
    let title = titleMatch[1]
    // Usuń suffix "| Kalkulator Kredytowy" jeśli istnieje
    title = title.replace(/\s*\|\s*Kalkulator Kredytowy\s*$/, '').trim()
    
    // Wyciągnij opis z openGraph jeśli istnieje
    const ogDescMatch = content.match(/openGraph:\s*\{[^}]*description:\s*['"]([^'"]+)['"]/)
    const description = ogDescMatch ? ogDescMatch[1] : undefined
    
    return { slug, title, description }
  } catch (error) {
    console.error(`Błąd przy czytaniu ${filePath}:`, error)
    return null
  }
}

async function main() {
  console.log('📸 Generowanie obrazków OG dla wszystkich artykułów blogowych...\n')

  const blogDir = join(__dirname, '../src/app/blog')
  const outputDir = join(__dirname, '../public/images/blog')
  
  // Upewnij się, że folder istnieje
  if (!existsSync(outputDir)) {
    const { mkdirSync } = await import('fs')
    mkdirSync(outputDir, { recursive: true })
  }

  const articles: ArticleInfo[] = []
  const errors: Array<{ slug: string; error: string }> = []

  // Znajdź wszystkie artykuły
  const entries = readdirSync(blogDir, { withFileTypes: true })
  
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    if (entry.name === 'page.tsx') continue // Pomiń główny folder blog
    
    const pagePath = join(blogDir, entry.name, 'page.tsx')
    if (!existsSync(pagePath)) continue
    
    const info = extractArticleInfo(pagePath)
    if (info) {
      articles.push(info)
    } else {
      errors.push({ slug: entry.name, error: 'Nie można wyciągnąć informacji' })
    }
  }

  console.log(`📚 Znaleziono ${articles.length} artykułów\n`)

  // Generuj obrazki
  let successCount = 0
  let skipCount = 0

  for (const article of articles) {
    const jpgPath = join(outputDir, `${article.slug}-og.jpg`)
    
    // Pomiń jeśli już istnieje (opcjonalnie - możesz usunąć tę linię, aby regenerować wszystkie)
    if (existsSync(jpgPath)) {
      console.log(`⏭️  Pomijam ${article.slug} (już istnieje)`)
      skipCount++
      continue
    }

    console.log(`🖼️  Generuję obrazek dla: ${article.title}`)
    const result = await generateOGImage(article)
    
    if (result.success) {
      console.log(`   ✅ ${article.slug}-og.jpg (${result.size} KB)\n`)
      successCount++
    } else {
      console.log(`   ❌ Błąd: ${result.error}\n`)
      errors.push({ slug: article.slug, error: result.error || 'Unknown error' })
    }
  }

  // Podsumowanie
  console.log('\n' + '='.repeat(50))
  console.log('📊 Podsumowanie:')
  console.log(`   ✅ Wygenerowano: ${successCount}`)
  console.log(`   ⏭️  Pominięto: ${skipCount}`)
  console.log(`   ❌ Błędy: ${errors.length}`)
  
  if (errors.length > 0) {
    console.log('\n❌ Artykuły z błędami:')
    errors.forEach(({ slug, error }) => {
      console.log(`   • ${slug}: ${error}`)
    })
  }

  console.log('\n💡 Następne kroki:')
  console.log('   1. Sprawdź wygenerowane obrazki w: public/images/blog/')
  console.log('   2. Zaktualizuj metadata w plikach artykułów (opcjonalnie)')
  console.log('   3. Odśwież cache Facebooka: https://developers.facebook.com/tools/debug/')
}

main().catch(console.error)

