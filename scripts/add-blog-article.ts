#!/usr/bin/env tsx
/**
 * Skrypt do automatycznego dodawania artykułów do bloga i sitemap
 * 
 * Użycie:
 *   tsx scripts/add-blog-article.ts <slug> <title> <description> <category> <readTime>
 * 
 * Przykład:
 *   tsx scripts/add-blog-article.ts "nowy-artykul" "Tytuł artykułu" "Opis artykułu" "Kategoria" "10 min"
 */

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const args = process.argv.slice(2)

if (args.length < 5) {
  console.error('Błąd: Za mało argumentów')
  console.log('Użycie: tsx scripts/add-blog-article.ts <slug> <title> <description> <category> <readTime>')
  console.log('Przykład: tsx scripts/add-blog-article.ts "nowy-artykul" "Tytuł" "Opis" "Kategoria" "10 min"')
  process.exit(1)
}

const [slug, title, description, category, readTime] = args

if (!slug || !title || !description || !category || !readTime) {
  console.error('Błąd: Wszystkie argumenty są wymagane')
  console.log('Użycie: tsx scripts/add-blog-article.ts <slug> <title> <description> <category> <readTime>')
  process.exit(1)
}

// Mapowanie kategorii do ikon
const categoryIcons: Record<string, string> = {
  'Podstawy kredytu': 'HiOutlineChartBar',
  'Ryzyka kredytowe': 'HiOutlineExclamationTriangle',
  'Porównanie banków': 'HiOutlineBanknotes',
  'Koszty i opłaty': 'HiOutlineCurrencyDollar',
  'Proces kredytowy': 'HiOutlineDocumentText',
  'Refinansowanie': 'HiOutlineArrowPath',
  'Specjalne sytuacje': 'HiOutlineUsers',
  'Poradniki': 'HiOutlineClipboardDocumentCheck',
  'Aktualności': 'HiOutlineSparkles',
  'Wybór kredytu': 'HiOutlineTrophy',
  'Negocjacje': 'HiOutlineHandRaised',
  'Dla singli': 'HiOutlineUser',
  'Dla przedsiębiorców': 'HiOutlineBriefcase',
  'Kalkulator': 'HiOutlineCalculator',
  'Stopy procentowe': 'HiOutlineChartBar',
  'Pułapki': 'HiOutlineExclamationTriangle',
  'Problemy ze spłatą': 'HiOutlineExclamationTriangle',
  'Budowa domu': 'HiOutlineWrenchScrewdriver',
  'Rozwód': 'HiOutlineUsers',
  'Śmierć kredytobiorcy': 'HiOutlineExclamationTriangle',
  'Zmiany w przepisach': 'HiOutlineDocumentText',
  'Zarządzanie kredytem': 'HiOutlineCurrencyDollar',
}

const defaultIcon = 'HiOutlineDocumentText'
const icon = categoryIcons[category] || defaultIcon

// 1. Dodaj do blog/page.tsx
const blogPagePath = join(process.cwd(), 'src/app/blog/page.tsx')
let blogPageContent = readFileSync(blogPagePath, 'utf-8')

// Sprawdź czy ikona jest już zaimportowana
if (!blogPageContent.includes(icon)) {
  // Znajdź import i dodaj ikonę
  const importMatch = blogPageContent.match(/import\s*\{([^}]+)\}\s*from\s*'react-icons\/hi2'/)
  if (importMatch && importMatch[1]) {
    const imports = importMatch[1]
    if (!imports.includes(icon)) {
      const newImports = imports.trim() + `,\n  ${icon}`
      blogPageContent = blogPageContent.replace(importMatch[0], `import {${newImports}} from 'react-icons/hi2'`)
    }
  }
}

// Znajdź tablicę blogPosts i dodaj nowy artykuł na początku
const blogPostsMatch = blogPageContent.match(/const blogPosts = \[([\s\S]*?)\]/)
if (blogPostsMatch) {
  const existingPosts = blogPostsMatch[1]
  const newPost = `  {
    slug: '${slug}',
    title: '${title}',
    description: '${description}',
    category: '${category}',
    icon: ${icon},
    readTime: '${readTime}',
  },`
  
  // Dodaj na początku tablicy
  const newBlogPosts = `const blogPosts = [${newPost}\n${existingPosts}]`
  blogPageContent = blogPageContent.replace(blogPostsMatch[0], newBlogPosts)
  
  writeFileSync(blogPagePath, blogPageContent, 'utf-8')
  console.log('✅ Dodano artykuł do blog/page.tsx')
} else {
  console.error('❌ Nie znaleziono tablicy blogPosts w blog/page.tsx')
  process.exit(1)
}

// 2. Dodaj do sitemap.ts
const sitemapPath = join(process.cwd(), 'src/app/sitemap.ts')
let sitemapContent = readFileSync(sitemapPath, 'utf-8')

// Znajdź ostatni wpis blogowy i dodaj nowy przed nim
const blogRoutePattern = /(\s+{\s+url: `\$\{baseUrl\}\/blog\/[^`]+`,\s+lastModified: new Date\(\),\s+changeFrequency: '[^']+' as const,\s+priority: [\d.]+,\s+},)/
const lastBlogRouteMatch = sitemapContent.match(new RegExp(`(${blogRoutePattern.source})+`, 'g'))

if (lastBlogRouteMatch) {
  const newRoute = `    {
      url: \`\${baseUrl}/blog/${slug}\`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },`
  
  // Dodaj przed ostatnim wpisem blogowym
  const routesMatch = sitemapContent.match(/(const routes = \[[\s\S]*?)(\s+\]\s+return routes)/)
  if (routesMatch && routesMatch[1] && routesMatch[2]) {
    const routesContent = routesMatch[1]
    const routesEnd = routesMatch[2]
    
    // Znajdź ostatni wpis blogowy i dodaj przed nim
    const blogRoutes = routesContent.match(/(\s+{\s+url: `\$\{baseUrl\}\/blog\/[^`]+`,[\s\S]*?},)/g)
    if (blogRoutes && blogRoutes.length > 0) {
      const lastBlogRoute = blogRoutes[blogRoutes.length - 1]
      if (lastBlogRoute) {
        const newRoutesContent = routesContent.replace(
          lastBlogRoute,
          `${newRoute}\n${lastBlogRoute}`
        )
        sitemapContent = sitemapContent.replace(routesMatch[0], newRoutesContent + routesEnd)
        
        writeFileSync(sitemapPath, sitemapContent, 'utf-8')
        console.log('✅ Dodano artykuł do sitemap.ts')
      } else {
        console.error('❌ Nie znaleziono ostatniego wpisu blogowego w sitemap.ts')
        process.exit(1)
      }
    } else {
      console.error('❌ Nie znaleziono wpisów blogowych w sitemap.ts')
      process.exit(1)
    }
  } else {
    console.error('❌ Nie znaleziono tablicy routes w sitemap.ts')
    process.exit(1)
  }
} else {
  console.error('❌ Nie znaleziono wpisów blogowych w sitemap.ts')
  process.exit(1)
}

console.log('\n✅ Artykuł został dodany do bloga i sitemap!')
console.log(`\n📝 Pamiętaj o utworzeniu pliku:`)
console.log(`   src/app/blog/${slug}/page.tsx`)
console.log(`\n🔍 Sprawdź czy wszystko działa:`)
console.log(`   yarn dev`)
console.log(`   Otwórz: http://localhost:3000/blog/${slug}`)

