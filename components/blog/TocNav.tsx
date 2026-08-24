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
  // Prevent scroll spy from clobbering the clicked item during smooth scroll
  const lockRef = React.useRef(false)
  const lockTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    const container = document.querySelector<HTMLElement>('[data-shell-scroll]')
    if (!container || items.length === 0) return

    const getHeadings = () =>
      items
        .map((i) => document.getElementById(i.id))
        .filter((el): el is HTMLElement => el !== null)

    // If URL already has a hash, honour it on mount
    const hash = window.location.hash.slice(1)
    if (hash && items.some((i) => i.id === hash)) {
      setActive(hash)
    }

    // Scroll-spy via IntersectionObserver scoped to the shell scroll container
    const headings = getHeadings()
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (lockRef.current) return
        // Pick the topmost heading that is intersecting in the upper zone
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => {
            const at = (a.target as HTMLElement).getBoundingClientRect().top
            const bt = (b.target as HTMLElement).getBoundingClientRect().top
            return at - bt
          })
        if (visible.length > 0) {
          setActive(visible[0].target.id)
          return
        }
        // Fallback when nothing in the narrow zone (e.g. scrolled past last heading):
        // mark the last heading whose top is above the container's top
        const containerTop = container.getBoundingClientRect().top
        let current = headings[0].id
        for (const h of headings) {
          const top = h.getBoundingClientRect().top - containerTop
          if (top <= 80) current = h.id
        }
        // Only update if we are clearly past the first heading
        if (container.scrollTop > 10) setActive(current)
      },
      {
        root: container,
        // Heading is "active" when it sits in the top ~30% of the scroll viewport
        rootMargin: '-8% 0px -72% 0px',
        threshold: 0,
      },
    )

    headings.forEach((h) => observer.observe(h))

    // Fallback scroll listener for the in-between states where observer doesn't fire
    let raf = 0
    const onScrollFallback = () => {
      if (lockRef.current) return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const containerTop = container.getBoundingClientRect().top
        let current = headings[0].id
        for (const h of headings) {
          const top = h.getBoundingClientRect().top - containerTop
          if (top <= 80) current = h.id
        }
        // Near top -> force first item
        if (container.scrollTop < 80) current = headings[0].id
        setActive((prev) => (prev === current ? prev : current))
      })
    }
    container.addEventListener('scroll', onScrollFallback, { passive: true })

    return () => {
      observer.disconnect()
      container.removeEventListener('scroll', onScrollFallback)
      cancelAnimationFrame(raf)
    }
  }, [items])

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const container = document.querySelector<HTMLElement>('[data-shell-scroll]')
    const el = document.getElementById(id)
    if (!el) return

    // Lock spy so it doesn't flicker mid animation
    lockRef.current = true
    if (lockTimerRef.current) clearTimeout(lockTimerRef.current)
    setActive(id)
    history.replaceState(null, '', `#${id}`)

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (container) {
      const containerRect = container.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      // Position heading 16px below the top of the scroll viewport
      const top = elRect.top - containerRect.top + container.scrollTop - 16
      container.scrollTo({ top, behavior: prefersReduced ? 'instant' as ScrollBehavior : 'smooth' })
      // Release lock after scroll settles; smooth scroll typically ~500ms
      lockTimerRef.current = setTimeout(() => {
        lockRef.current = false
      }, prefersReduced ? 50 : 700)
    } else {
      el.scrollIntoView({ behavior: prefersReduced ? 'instant' as ScrollBehavior : 'smooth', block: 'start' })
      lockTimerRef.current = setTimeout(() => {
        lockRef.current = false
      }, prefersReduced ? 50 : 700)
    }
  }

  React.useEffect(() => {
    return () => {
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current)
    }
  }, [])

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
              className="block py-1.5 -my-1.5"
            >
              <span
                className={`block h-px transition-all duration-200 ${
                  active === i.id
                    ? 'w-6 bg-primary'
                    : 'w-3 bg-muted-foreground/40 hover:bg-muted-foreground'
                }`}
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
