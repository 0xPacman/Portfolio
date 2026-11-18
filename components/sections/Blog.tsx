import { Rss } from 'lucide-react'
import { ArticleArchive } from '@/components/blog/ArticleArchive'
import { getAllPosts } from '@/lib/blog'
import styles from '@/components/blog/Journal.module.css'

export function Blog() {
  const translated = new Set(getAllPosts('ar').map((post) => post.slug))
  const posts = getAllPosts().map(({ title, description, slug, date, tags }) => ({
    title, description, slug, date, tags, hasDarija: translated.has(slug),
  }))

  return (
    <div>
      <div className={styles.archiveIntro}>
        <header className="page-intro">
          <h1 className="page-title">Field notes</h1>
          <p className="page-description">
            Infrastructure, automation, and the occasional rabbit hole. Lessons
            from building, operating, and figuring things out.
          </p>
        </header>
        <a href="/feed.xml" className={styles.feedLink} target="_blank" rel="noopener noreferrer">
          <Rss size={14} aria-hidden="true" /> Subscribe via RSS
        </a>
      </div>
      <ArticleArchive posts={posts} />
    </div>
  )
}
