'use client'

import React from 'react'
import type { TocItem } from '@/lib/blog'

interface TocNavProps {
  items: TocItem[]
}

/** Fixed side TOC: dash strip that expands into a contents panel on hover. */
export function TocNav({ items }: TocNavProps) {
  const [active, setActive] = React.useState(items[0]?.id ?? '')
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    // Content scrolls inside the shell container, not the window
    const container = document.querySelector<HTMLElement>('[data-shell-scroll]')
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null)
    if (!container || headings.length === 0) return

    let raf = 0
    const update = () => {
      const containerTop = container.getBoundingClientRect().top
      const pos = container.scrollTop + 140
      let current = headings[0].id
      for (const h of headings) {
        const top = h.getBoundingClientRect().top - containerTop + container.scrollTop
        if (top <= pos) current = h.id
      }
      setActive(current)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    container.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      container.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [items])

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    history.replaceState(null, '', `#${id}`)
    setActive(id)
  }

  if (items.length === 0) return null

  return (
    <nav
      aria-label="Table of contents"
      className="fixed right-4 xl:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* expandable panel */}
      <div
        className={`absolute right-7 top-1/2 -translate-y-1/2 w-72 max-h-[70vh] overflow-y-auto border border-primary/20 bg-card/95 backdrop-blur-sm transition-all duration-200 ${
          open ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        <div className="px-4 py-2 border-b border-primary/10 text-[11px] font-mono text-muted-foreground uppercase tracking-wider select-none">
          contents
        </div>
        <ul className="py-2">
          {items.map((i) => (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                onClick={(e) => go(e, i.id)}
                aria-current={active === i.id ? 'location' : undefined}
                className={`block px-4 py-1.5 text-[12px] font-mono truncate transition-colors ${
                  active === i.id
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {i.text}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* dash strip */}
      <ul className="flex flex-col items-end gap-2.5">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              onClick={(e) => go(e, i.id)}
              aria-label={i.text}
              className="block py-0.5"
            >
              <span
                className={`block h-px transition-all duration-200 ${
                  active === i.id
                    ? 'w-6 bg-primary'
                    : 'w-3 bg-muted-foreground/40 group-hover:bg-muted-foreground hover:bg-muted-foreground'
                }`}
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
