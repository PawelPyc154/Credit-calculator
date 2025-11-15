import { FooterMain } from 'components/calculator/FooterMain'
import type { Metadata } from 'next'
import Link from 'next/link'
import { HiOutlineArrowRight, HiOutlineDocumentText, HiOutlineExclamationTriangle } from 'react-icons/hi2'
import tw from 'tw-tailwind'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://kalkulatorkredytow.pl'

export const metadata: Metadata = {
  title: 'Blog | Poradniki i artykuły o kredytach hipotecznych',
  description:
    'Poznaj praktyczne poradniki o kredytach hipotecznych: ryzyka kredytowe, jak wybrać bank, wkład własny i inne ważne tematy.',
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  keywords: [
    'blog kredytowy',
    'poradniki kredytowe',
    'artykuły o kredytach',
    'kredyt hipoteczny poradnik',
    'edukacja kredytowa',
  ],
  openGraph: {
    title: 'Blog | Poradniki o kredytach hipotecznych',
    description: 'Praktyczne artykuły i poradniki o kredytach hipotecznych dla świadomych decyzji finansowych.',
    url: `${siteUrl}/blog`,
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Blog o kredytach hipotecznych',
      },
    ],
  },
}

const blogPosts = [
  {
    slug: 'zagrozenia-kredytowe',
    title: 'Zagrożenia kredytowe',
    description:
      'Poznaj najczęstsze zagrożenia związane z kredytami: rosnące raty, ukryte koszty, zmienne oprocentowanie i ryzyko utraty płynności. Dowiedz się, jak się zabezpieczyć.',
    category: 'Ryzyka kredytowe',
    icon: HiOutlineExclamationTriangle,
    readTime: '8 min',
  },
  // Tutaj można dodać więcej artykułów w przyszłości
]

export default function BlogPage() {
  return (
    <PageWrapper>
      <ContentContainer>
        <BackLink href="/">
          <BackIcon aria-hidden="true">←</BackIcon>
          Wróć do strony głównej
        </BackLink>

        <HeroSection>
          <HeroBadge>Edukacja finansowa</HeroBadge>
          <HeroTitle>Blog o kredytach hipotecznych</HeroTitle>
          <HeroSubtitle>
            Praktyczne poradniki i artykuły, które pomogą Ci podjąć świadomą decyzję kredytową
          </HeroSubtitle>
        </HeroSection>

        <PostsSection>
          <PostsGrid>
            {blogPosts.map((post) => {
              const IconComponent = post.icon
              return (
                <PostCard key={post.slug} href={`/blog/${post.slug}`}>
                  <PostIcon aria-hidden="true">
                    <IconComponent size={24} />
                  </PostIcon>
                  <PostCategory>{post.category}</PostCategory>
                  <PostTitle>{post.title}</PostTitle>
                  <PostDescription>{post.description}</PostDescription>
                  <PostFooter>
                    <ReadTime>{post.readTime} czytania</ReadTime>
                    <ReadMore>
                      Czytaj więcej
                      <HiOutlineArrowRight size={16} />
                    </ReadMore>
                  </PostFooter>
                </PostCard>
              )
            })}
          </PostsGrid>
        </PostsSection>

        {blogPosts.length === 0 && (
          <EmptyState>
            <EmptyIcon aria-hidden="true">
              <HiOutlineDocumentText size={48} />
            </EmptyIcon>
            <EmptyTitle>Wkrótce pojawią się nowe artykuły</EmptyTitle>
            <EmptyText>Pracujemy nad kolejnymi poradnikami o kredytach hipotecznych.</EmptyText>
          </EmptyState>
        )}
      </ContentContainer>
      <FooterMain />
    </PageWrapper>
  )
}

const PageWrapper = tw.main`min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-100`
const ContentContainer = tw.div`mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20`

const BackLink = tw(
  Link,
)`mb-8 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 no-underline hover:text-emerald-800`
const BackIcon = tw.span`inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700`

const HeroSection = tw.section`mx-auto max-w-3xl text-center mb-16`
const HeroBadge = tw.span`mb-4 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700`
const HeroTitle = tw.h1`mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl`
const HeroSubtitle = tw.p`mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg`

const PostsSection = tw.section`mt-12`
const PostsGrid = tw.div`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`
const PostCard = tw(
  Link,
)`group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg`
const PostIcon = tw.span`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 group-hover:bg-emerald-200 transition-colors`
const PostCategory = tw.span`mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-600`
const PostTitle = tw.h3`mb-3 text-xl font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors`
const PostDescription = tw.p`mb-4 flex-1 text-sm leading-relaxed text-gray-600`
const PostFooter = tw.div`flex items-center justify-between pt-4 border-t border-gray-100`
const ReadTime = tw.span`text-xs text-gray-500`
const ReadMore = tw.span`inline-flex items-center gap-1 text-sm font-medium text-emerald-700 group-hover:text-emerald-800 transition-colors`

const EmptyState = tw.div`mx-auto max-w-md text-center py-16`
const EmptyIcon = tw.span`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400`
const EmptyTitle = tw.h3`mb-2 text-xl font-semibold text-gray-900`
const EmptyText = tw.p`text-sm text-gray-600`

