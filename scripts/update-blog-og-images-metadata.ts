#!/usr/bin/env tsx
/**
 * Skrypt do aktualizacji metadata w plikach artykułów blogowych
 * Zmienia og-image.jpg na dedykowane obrazki OG dla każdego artykułu
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function updateArticleMetadata(filePath: string, slug: string): boolean {
  try {
    let content = readFileSync(filePath, 'utf-8')
    const ogImagePath = `/images/blog/${slug}-og.jpg`
    
    // Sprawdź czy obrazek istnieje
    const imagePath = join(__dirname, '../public/images/blog', `${slug}-og.jpg`)
    if (!existsSync(imagePath)) {
      console.log(`   ⚠️  Obrazek nie istnieje: ${slug}-og.jpg`)
      return false
    }

    let updated = false

    // Aktualizuj openGraph.images[0].url
    // Szukaj wzorca: url: `${siteUrl}/og-image.jpg`
    const ogImagePattern = /(images:\s*\[\s*\{[\s\S]*?url:\s*)`[^`]*og-image\.jpg[^`]*`/g
    if (ogImagePattern.test(content)) {
      content = content.replace(
        /(images:\s*\[\s*\{[\s\S]*?url:\s*)`[^`]*og-image\.jpg[^`]*`/g,
        `$1\`\${siteUrl}${ogImagePath}\``
      )
      updated = true
    }

    // Aktualizuj twitter.images[0]
    const twitterImageRegex = /(twitter:\s*\{[^}]*images:\s*\[`[^`]+`)/g
    const twitterImageMatch = content.match(twitterImageRegex)
    if (twitterImageMatch) {
      const oldTwitterUrl = twitterImageMatch[0].match(/`([^`]+)`/)?.[1]
      if (oldTwitterUrl && oldTwitterUrl.includes('og-image.jpg')) {
        content = content.replace(
          new RegExp(`images: \\[\\\`\\$\\{siteUrl\\}/og-image\\.jpg\\\`\\]`, 'g'),
          `images: [\`\${siteUrl}${ogImagePath}\`]`
        )
        updated = true
      }
    }

    if (updated) {
      writeFileSync(filePath, content, 'utf-8')
      return true
    }

    return false
  } catch (error) {
    console.error(`   ❌ Błąd przy aktualizacji ${filePath}:`, error)
    return false
  }
}

async function main() {
  console.log('🔄 Aktualizowanie metadata w plikach artykułów...\n')

  const blogDir = join(__dirname, '../src/app/blog')
  let updatedCount = 0
  let skippedCount = 0
  let errorCount = 0

  const entries = readdirSync(blogDir, { withFileTypes: true })
  
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    if (entry.name === 'page.tsx') continue
    
    const pagePath = join(blogDir, entry.name, 'page.tsx')
    if (!existsSync(pagePath)) continue

    const slug = entry.name
    console.log(`📝 Sprawdzam: ${slug}`)
    
    const updated = updateArticleMetadata(pagePath, slug)
    
    if (updated) {
      console.log(`   ✅ Zaktualizowano\n`)
      updatedCount++
    } else {
      // Sprawdź czy już używa dedykowanego obrazka
      const content = readFileSync(pagePath, 'utf-8')
      if (content.includes(`/images/blog/${slug}-og.jpg`)) {
        console.log(`   ⏭️  Już używa dedykowanego obrazka\n`)
        skippedCount++
      } else {
        console.log(`   ⚠️  Nie znaleziono do aktualizacji\n`)
        skippedCount++
      }
    }
  }

  console.log('='.repeat(50))
  console.log('📊 Podsumowanie:')
  console.log(`   ✅ Zaktualizowano: ${updatedCount}`)
  console.log(`   ⏭️  Pominięto: ${skippedCount}`)
  console.log(`   ❌ Błędy: ${errorCount}`)
  console.log('\n💡 Metadata zostało zaktualizowane!')
}

main().catch(console.error)

