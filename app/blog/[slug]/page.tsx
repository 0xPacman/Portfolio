import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import { getAllPosts, getPost } from '@/lib/blog'
import { generateJSONLD } from '@/lib/schema'
import { TocNav } from '@/components/blog/TocNav'

const BASE = 'https://0xpacman.com'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  const { meta } = post
  const ogImage = {
    url: `/blog/${slug}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: meta.title,
  }
  return {
    title: `${meta.title} | Ahmed Jadani`,
    description: meta.description,
    keywords: [...meta.tags, 'Ahmed Jadani', '0xPacman', 'Cloud Infrastructure'],
    authors: [{ name: 'Ahmed Jadani', url: BASE }],
    creator: 'Ahmed Jadani',
    publisher: 'Ahmed Jadani',
    alternates: { canonical: `/blog/${slug}/` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE}/blog/${slug}/`,
      siteName: 'Ahmed Jadani',
      type: 'article',
      publishedTime: meta.date,
      modifiedTime: meta.date,
      authors: [BASE],
      tags: meta.tags,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [ogImage.url],
    },
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()
  const { meta, html, toc } = post

  const words = html.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length
  const readingTime = Math.max(1, Math.round(words / 200))

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${BASE}/blog/${slug}/#article`,
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.date,
    inLanguage: 'en-US',
    wordCount: words,
    timeRequired: `PT${readingTime}M`,
    keywords: meta.tags.join(', '),
    articleSection: meta.tags[0] ?? 'Infrastructure',
    image: `${BASE}/media/PDP.jpg`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE}/blog/${slug}/`,
    },
    author: {
      '@type': 'Person',
      '@id': `${BASE}/#person`,
      name: 'Ahmed Jadani',
      alternateName: '0xPacman',
      url: BASE,
    },
    publisher: {
      '@type': 'Person',
      '@id': `${BASE}/#person`,
      name: 'Ahmed Jadani',
      url: BASE,
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/#blog` },
      { '@type': 'ListItem', position: 3, name: meta.title, item: `${BASE}/blog/${slug}/` },
    ],
  }

  return (
    <div className="min-h-screen bg-background relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJSONLD([articleSchema, breadcrumbSchema])}
      />
      <div className="absolute inset-0 dotgrid" aria-hidden="true" />
      <div className="absolute inset-0 scanlines opacity-40" aria-hidden="true" />

      <TocNav items={toc} />

      <article
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-8 lg:py-12"
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        {/* back nav */}
        <Link
          href="/#blog"
          className="inline-flex items-center gap-1.5 text-[12px] font-mono text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft size={12} aria-hidden="true" />
          cd ~/blog
        </Link>

        {/* prompt header */}
        <div className="mt-6 font-mono text-[13px] flex flex-wrap items-center gap-1.5">
          <span className="text-term-green">root@0xpacman</span>
          <span className="text-muted-foreground">:</span>
          <span className="text-primary/70">~/blog</span>
          <span className="text-muted-foreground">$</span>
          <span className="text-foreground">cat {slug}.md</span>
        </div>

        {/* meta header */}
        <header className="mt-6 pb-6 border-b border-primary/15">
          <h1
            className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-foreground"
            itemProp="headline"
          >
            {meta.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[12px] font-mono text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} className="text-primary/70" aria-hidden="true" />
              <time dateTime={meta.date} itemProp="datePublished">{meta.date}</time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-primary/70" aria-hidden="true" />
              {readingTime} min read
            </span>
            {meta.tags.length > 0 && (
              <span className="flex items-center gap-1.5">
                <Tag size={12} className="text-primary/70" aria-hidden="true" />
                {meta.tags.map((t) => (
                  <span key={t} className="border border-primary/20 text-primary/80 px-1.5 py-0.5 text-[10px]">
                    {t}
                  </span>
                ))}
              </span>
            )}
          </div>
          <meta itemProp="author" content="Ahmed Jadani" />
          <meta itemProp="description" content={meta.description} />
        </header>

        {/* rendered markdown */}
        <div
          className="blog-content mt-8"
          itemProp="articleBody"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* author note */}
        <div className="mt-12 border border-primary/15 bg-card/30 px-4 py-3 font-mono text-[12px] leading-relaxed">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-term-green">root@0xpacman</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-primary/70">~/blog</span>
            <span className="text-muted-foreground">$</span>
            <span className="text-foreground">cat note.txt</span>
          </div>
          <p className="mt-2 text-muted-foreground">
            This article reflects personal experience and opinion. AI assisted with grammar the
            way a linter assists with code. The thinking is mine; so are any mistakes.
          </p>
        </div>

        {/* footer nav */}
        <div className="mt-12 pt-6 border-t border-primary/15">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-1.5 text-[12px] font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={12} aria-hidden="true" />
            back to ~/blog
          </Link>
        </div>
      </article>
    </div>
  )
}
