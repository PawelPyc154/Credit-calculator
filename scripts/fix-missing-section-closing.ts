#!/usr/bin/env tsx
/**
 * Naprawia brakujące zamknięcia sekcji </Section> przed sekcją "Powiązane artykuły"
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { glob } from 'glob'

async function fixFile(filePath: string) {
  try {
    let content = readFileSync(filePath, 'utf-8')
    const originalContent = content

    // Napraw brakujące zamknięcie sekcji - różne wzorce
    // Wzorzec 1: </FaqList> bezpośrednio przed <Section>
    content = content.replace(/<\/FaqList>\n\s*<Section>/g, '</FaqList>\n        </Section>\n        <Section>')
    
    // Wzorzec 2: </FaqList> z dodatkowymi białymi znakami
    content = content.replace(/<\/FaqList>\s*\n\s*<Section>/g, '</FaqList>\n        </Section>\n        <Section>')

    if (content !== originalContent) {
      writeFileSync(filePath, content, 'utf-8')
      console.log(`✅ Naprawiono: ${filePath}`)
      return true
    }
    return false
  } catch (error) {
    console.error(`❌ Błąd przy ${filePath}:`, error)
    return false
  }
}

async function main() {
  console.log('🔧 Naprawianie brakujących zamknięć sekcji...</n>')

  const blogFiles = await glob('src/app/blog/*/page.tsx')
  const filesToFix = blogFiles.filter((file) => {
    const slug = file.match(/blog\/([^/]+)\/page\.tsx/)?.[1]
    return slug && slug !== 'zagrozenia-kredytowe' && slug !== 'page'
  })

  let fixed = 0
  let skipped = 0

  for (const file of filesToFix) {
    const filePath = join(process.cwd(), file)
    const wasFixed = await fixFile(filePath)
    if (wasFixed) {
      fixed++
    } else {
      skipped++
    }
  }

  console.log(`\n📊 Podsumowanie:`)
  console.log(`✅ Naprawiono: ${fixed}`)
  console.log(`⏭️  Pominięto (brak zmian): ${skipped}`)
  console.log(`📝 Łącznie: ${filesToFix.length}`)
}

main().catch(console.error)

