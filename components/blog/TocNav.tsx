'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, List } from 'lucide-react'
import type { TocItem } from '@/lib/blog'
import styles from './Journal.module.css'

export function TocNav({ items, rtl }: { items: TocItem[]; rtl: boolean }) {
  const [active, setActive] = useState(items[0]?.id)
  const mobile = useRef<HTMLDetailsElement>(null)
  const title = rtl ? 'فهاد المقال' : 'On this page'

  useEffect(() => {
    const shell = document.querySelector<HTMLElement>('[data-shell-scroll]')
    const headings = items.map(({ id }) => document.getElementById(id)).filter((el) => el !== null)
    if (!shell || !headings.length) return

    let frame = 0
    const findSection = () => {
      frame = 0
      const top = shell.getBoundingClientRect().top + (mobile.current?.getBoundingClientRect().height || 0) + 36
      let section = headings[0]
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top > top) break
        section = heading
      }
      setActive(section.id)
    }
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(findSection)
    }
    scheduleUpdate()
    shell.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    return () => {
      cancelAnimationFrame(frame)
      shell.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [items])

  if (!items.length) return null

  const links = (
    <ol className={styles.contentsLinks}>
      {items.map(({ id, text }) => (
        <li key={id}>
          <a href={`#${id}`} aria-current={id === active ? 'location' : undefined}
            onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return
              if (mobile.current?.open) mobile.current.open = false
              setActive(id)
            }}>
            {text}
          </a>
        </li>
      ))}
    </ol>
  )

  return (
    <nav className={styles.contents} aria-label={title}>
      <div className={styles.desktopContents}>
        <h2><List size={14} aria-hidden="true" /> {title}</h2>
        {links}
      </div>
      <details className={styles.mobileContents} ref={mobile}>
        <summary><List size={15} aria-hidden="true" /> {title} <ChevronDown size={15} aria-hidden="true" /></summary>
        {links}
      </details>
    </nav>
  )
}
