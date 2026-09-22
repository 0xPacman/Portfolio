import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'

export type Locale = 'en' | 'ar'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

function dirFor(locale: Locale): string {
  return locale === 'ar' ? path.join(BLOG_DIR, 'ar') : BLOG_DIR
}

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  locale: Locale
}

export interface TocItem {
  id: string
  text: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-')
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h: string) => String.fromCharCode(parseInt(h, 16)))
}

/** Extract H2 sections from markdown (skipping fenced code blocks). */
function extractToc(content: string): TocItem[] {
  const withoutCode = content.replace(/```[\s\S]*?```/g, '')
  return withoutCode
    .split('\n')
    .filter((l) => l.startsWith('## '))
    .map((l) => {
      const text = l.replace(/^##\s+/, '').replace(/[*_`]/g, '').trim()
      return { id: slugify(text), text }
    })
}

/** Add id anchors to rendered H2s so the TOC can target them. */
function addHeadingIds(html: string): string {
  return html.replace(/<h2>(.*?)<\/h2>/g, (_, inner: string) => {
    const text = decodeEntities(inner.replace(/<[^>]+>/g, ''))
    return `<h2 id="${slugify(text)}">${inner}</h2>`
  })
}

function readMeta(file: string, locale: Locale): PostMeta {
  const raw = fs.readFileSync(file, 'utf8')
  const { data } = matter(raw)
  return {
    slug: path.basename(file).replace(/\.md$/, ''),
    title: data.title ?? '',
    description: data.description ?? '',
    date: data.date ?? '',
    tags: data.tags ?? [],
    locale,
  }
}

export function getAllPosts(locale: Locale = 'en'): PostMeta[] {
  const dir = dirFor(locale)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => readMeta(path.join(dir, f), locale))
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPost(
  slug: string,
  locale: Locale = 'en'
): { meta: PostMeta; html: string; toc: TocItem[] } | null {
  const file = path.join(dirFor(locale), `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(raw)
  const html = addHeadingIds(marked.parse(content) as string)
  return {
    meta: {
      slug,
      title: data.title ?? '',
      description: data.description ?? '',
      date: data.date ?? '',
      tags: data.tags ?? [],
      locale,
    },
    html,
    toc: extractToc(content),
  }
}

/** If a translation of this post exists in the other locale, return its slug. */
export function getTranslation(
  slug: string,
  locale: Locale
): { slug: string; locale: Locale } | null {
  const other: Locale = locale === 'en' ? 'ar' : 'en'
  const file = path.join(dirFor(other), `${slug}.md`)
  return fs.existsSync(file) ? { slug, locale: other } : null
}
