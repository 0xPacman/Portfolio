'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ChevronDown, Languages, Search, X } from 'lucide-react'
import styles from './Journal.module.css'

interface ArchivePost {
  title: string
  description: string
  slug: string
  date: string
  tags: string[]
  hasDarija: boolean
}

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  month: 'short', day: '2-digit', year: 'numeric', timeZone: 'UTC',
})

export function ArticleArchive({ posts }: { posts: ArchivePost[] }) {
  const [query, setQuery] = useState('')
  const [topic, setTopic] = useState('')
  const input = useRef<HTMLInputElement>(null)
  const topics = Array.from(new Set(posts.flatMap((post) => post.tags))).sort()
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const results = posts.filter((post) => {
    const text = [post.title, post.description, ...post.tags, post.hasDarija ? 'darija دارجة' : ''].join(' ').toLowerCase()
    return (!topic || post.tags.includes(topic)) && terms.every((term) => text.includes(term))
  })

  return (
    <section aria-label="Article archive">
      <div className={styles.toolbar} role="search" aria-label="Filter articles">
        <div className={styles.search}>
          <Search size={16} aria-hidden="true" />
          <input ref={input} type="search" aria-label="Search articles" placeholder="Search field notes…"
            value={query} onChange={(event) => setQuery(event.target.value)} />
          {query && (
            <button type="button" aria-label="Clear search" onClick={() => { setQuery(''); input.current?.focus() }}>
              <X size={15} aria-hidden="true" />
            </button>
          )}
        </div>
        <div className={styles.topic}>
          <select aria-label="Filter by topic" value={topic} onChange={(event) => setTopic(event.target.value)}>
            <option value="">All topics</option>
            {topics.map((tag) => <option value={tag} key={tag}>{tag}</option>)}
          </select>
          <ChevronDown size={14} aria-hidden="true" />
        </div>
      </div>
      <div className={styles.listHeading}>
        <h2>Archive</h2>
        <span role="status">{results.length} {results.length === 1 ? 'article' : 'articles'}</span>
      </div>
      <ol className={styles.archiveList}>
        {results.map((post) => (
          <li key={post.slug}>
            <article className={styles.entry}>
              <time dateTime={post.date} className={styles.entryDate}>{dateFormat.format(new Date(post.date))}</time>
              <div className={styles.entryContent}>
                <span className={styles.entryTopic}>{post.tags[0]}</span>
                <h3>
                  <Link href={`/blog/${post.slug}/`} className={styles.entryLink}>
                    {post.title}
                    <ArrowUpRight size={21} aria-hidden="true" />
                  </Link>
                </h3>
                <p>{post.description}</p>
                {post.hasDarija && (
                  <Link href={`/blog/ar/${post.slug}/`} lang="ar-MA" hrefLang="ar-MA"
                    aria-label={`Read in Darija: ${post.title}`} className={styles.translationLink}>
                    <Languages size={14} aria-hidden="true" /> الدارجة
                  </Link>
                )}
              </div>
            </article>
          </li>
        ))}
      </ol>
      {results.length === 0 && (
        <div className={styles.noResults}>
          <p>No articles match these filters.</p>
          <button type="button" onClick={() => { setTopic(''); setQuery(''); input.current?.focus() }}>Clear filters</button>
        </div>
      )}
    </section>
  )
}
