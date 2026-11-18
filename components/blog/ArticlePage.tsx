import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, Clock, Languages } from 'lucide-react'
import { getAllPosts, getPost, getTranslation, type Locale } from '@/lib/blog'
import { generateJSONLD } from '@/lib/schema'
import { TocNav } from '@/components/blog/TocNav'
import { ArticleLightbox } from '@/components/blog/ArticleLightbox'
import styles from './Journal.module.css'

const BASE = 'https://0xpacman.com'

export const dynamicParams = false

export function staticParams(locale: Locale) {
  return getAllPosts(locale).map((p) => ({ slug: p.slug }))
}

interface ArticlePageProps {
  slug: string
  locale: Locale
}

function hrefFor(slug: string, locale: Locale): string {
  return locale === 'ar' ? `/blog/ar/${slug}/` : `/blog/${slug}/`
}

/** Shared server view for EN and localized article pages. */
export function ArticleView({ slug, locale }: ArticlePageProps) {
  const post = getPost(slug, locale)
  if (!post) notFound()
  const { meta, html, toc } = post
  const translation = getTranslation(slug, locale)
  const rtl = locale === 'ar'
  const archive = getAllPosts(locale)
  const nextPost = archive.length > 1 ? archive[(archive.findIndex((entry) => entry.slug === slug) + 1) % archive.length] : undefined
  const dateLabel = new Intl.DateTimeFormat(rtl ? 'ar-MA' : 'en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(meta.date))

  const words = html.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length
  const readingTime = Math.max(1, Math.round(words / 200))

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${BASE}${hrefFor(slug, locale)}#article`,
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.date,
    inLanguage: rtl ? 'ar' : 'en-US',
    wordCount: words,
    timeRequired: `PT${readingTime}M`,
    keywords: meta.tags.join(', '),
    articleSection: meta.tags[0] ?? 'Infrastructure',
    image: `${BASE}${hrefFor(slug, locale)}og.png`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE}${hrefFor(slug, locale)}`,
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
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog/` },
      { '@type': 'ListItem', position: 3, name: meta.title, item: `${BASE}${hrefFor(slug, locale)}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJSONLD([articleSchema, breadcrumbSchema])}
      />

      <ArticleLightbox key={`${locale}/${slug}`} rtl={rtl} />

      <article
        className={`page-container page-content ${styles.reader}`}
        dir={rtl ? 'rtl' : 'ltr'}
        lang={rtl ? 'ar-MA' : 'en'}
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        <div className={styles.readerNav}>
          <Link href="/blog/" className={styles.backLink}>
            <ArrowLeft size={15} aria-hidden="true" /> {rtl ? 'جميع المقالات' : 'All field notes'}
          </Link>
          {translation && (
            <Link href={hrefFor(translation.slug, translation.locale)} className={styles.translationLink}
              lang={rtl ? 'en' : 'ar-MA'} hrefLang={rtl ? 'en' : 'ar-MA'}>
              <Languages size={15} aria-hidden="true" /> {rtl ? 'Read in English' : 'اقرا بالدارجة'}
            </Link>
          )}
        </div>
        <header className={styles.articleHeader}>
          <div className={styles.tags} dir="ltr">
            {meta.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <h1 itemProp="headline">{meta.title}</h1>
          <div className={styles.byline}>
            <span itemProp="author">{rtl ? 'أحمد جداني' : 'Ahmed Jadani'}</span>
            <time dateTime={meta.date} itemProp="datePublished">{dateLabel}</time>
            <span><Clock size={13} aria-hidden="true" /> {readingTime} {rtl ? 'دقايق للقراءة' : 'min read'}</span>
          </div>
          <meta itemProp="description" content={meta.description} />
        </header>
        <div className={styles.readingLayout}>
          <TocNav items={toc} rtl={rtl} />
          <div className={styles.readingColumn}>
            <div className={`blog-content ${styles.prose}`} dir={rtl ? 'rtl' : 'ltr'}
              itemProp="articleBody" dangerouslySetInnerHTML={{ __html: html }} />
            <aside className={styles.authorNote}>
              <h2>{rtl ? 'ملاحظة الكاتب' : 'Author’s note'}</h2>
              <p dir="auto">
                {meta.authorNote ?? (rtl
                  ? 'هاد المقال كيعكس التجربة والرأي ديالي. الذكاء الاصطناعي عاوني نصحح اللغة بحال كيفاش اللينتر كيعاون فمراجعة الكود. الأفكار ديالي، وحتى الأخطاء ديالي.'
                  : 'This article reflects personal experience and opinion. AI assisted with grammar the way a linter assists with code. The thinking is mine; so are any mistakes.')}
              </p>
            </aside>
            <div className={styles.articleFooter}>
              {nextPost && (
                <Link className={styles.nextArticle} href={hrefFor(nextPost.slug, locale)}>
                  <span>{rtl ? 'المقال الموالي' : 'Read next'} <ArrowUpRight size={14} aria-hidden="true" /></span>
                  <strong>{nextPost.title}</strong>
                </Link>
              )}
              <Link href="/blog/" className={styles.backLink}>
                <ArrowLeft size={15} aria-hidden="true" /> {rtl ? 'جميع المقالات' : 'All field notes'}
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

export function articleMetadata(slug: string, locale: Locale): Metadata {
  const post = getPost(slug, locale)
  if (!post) return {}
  const { meta } = post
  const translation = getTranslation(slug, locale)
  const rtl = locale === 'ar'
  const ogImage = {
    url: `${hrefFor(slug, locale)}og.png`,
    width: 1200,
    height: 630,
    alt: meta.title,
  }
  return {
    title: meta.title,
    description: meta.description,
    keywords: [...meta.tags, 'Ahmed Jadani', '0xPacman', 'Cloud Infrastructure'],
    authors: [{ name: 'Ahmed Jadani', url: BASE }],
    creator: 'Ahmed Jadani',
    publisher: 'Ahmed Jadani',
    alternates: {
      canonical: hrefFor(slug, locale),
      languages: {
        [locale]: hrefFor(slug, locale),
        ...(translation ? { [translation.locale]: hrefFor(translation.slug, translation.locale) } : {}),
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE}${hrefFor(slug, locale)}`,
      siteName: 'Ahmed Jadani',
      type: 'article',
      publishedTime: meta.date,
      modifiedTime: meta.date,
      authors: [BASE],
      tags: meta.tags,
      locale: rtl ? 'ar_MA' : 'en_US',
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
