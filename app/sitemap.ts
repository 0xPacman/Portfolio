import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { MetadataRoute } from 'next'

export const dynamic = 'force-static'
export const revalidate = false

export default function sitemap(): MetadataRoute.Sitemap {
  const blogDir = path.join(process.cwd(), 'content', 'blog')
  const posts = fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(blogDir, f), 'utf8')
      const { data } = matter(raw)
      return {
        url: `https://0xpacman.com/blog/${f.replace(/\.md$/, '')}/`,
        lastModified: new Date(data.date ?? Date.now()),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }
    })

  const sections = ['skills', 'projects', 'blog', 'contact'].map((s) => ({
    url: `https://0xpacman.com/${s}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [
    {
      url: 'https://0xpacman.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...sections,
    ...posts,
  ]
}
