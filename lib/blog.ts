import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
}

export interface TocItem {
  id: string
  text: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
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

/** Add id anchors to rendered H2s so the TOC can target them. */
function addHeadingIds(html: string): string {
  return html.replace(/<h2>(.*?)<\/h2>/g, (_, inner: string) => {
    const text = decodeEntities(inner.replace(/<[^>]+>/g, ''))
    return `<h2 id="${slugify(text)}">${inner}</h2>`
  })
}

export function getAllPosts(): PostMeta[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), 'utf8')
      const { data } = matter(raw)
      return {
        slug: f.replace(/\.md$/, ''),
        title: data.title ?? '',
        description: data.description ?? '',
        date: data.date ?? '',
        tags: data.tags ?? [],
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPost(
  slug: string
): { meta: PostMeta; html: string; toc: TocItem[] } | null {
  const file = path.join(BLOG_DIR, `${slug}.md`)
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
    },
    html,
    toc: extractToc(content),
  }
}
