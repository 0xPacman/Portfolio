'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export interface TabDef {
  id: string
  label: string
  href: string
}

export const TABS: TabDef[] = [
  { id: 'about', label: 'about', href: '/' },
  { id: 'skills', label: 'skills', href: '/skills/' },
  { id: 'projects', label: 'projects', href: '/projects/' },
  { id: 'blog', label: 'blog', href: '/blog/' },
  { id: 'contact', label: 'contact', href: '/contact/' },
]

export function tabIdForPath(pathname: string): string {
  if (pathname.startsWith('/skills')) return 'skills'
  if (pathname.startsWith('/projects')) return 'projects'
  if (pathname.startsWith('/blog')) return 'blog'
  if (pathname.startsWith('/contact')) return 'contact'
  return 'about'
}

export function TabBar({ active }: { active: string }) {
  const router = useRouter()

  // Numeric hotkeys 1–5 (skip when typing)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      const n = parseInt(e.key, 10)
      if (n >= 1 && n <= TABS.length) router.push(TABS[n - 1].href)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [router])

  return (
    <div
      role="tablist"
      aria-label="Portfolio sections"
      className="flex items-stretch border-b border-primary/15 bg-background overflow-x-auto flex-shrink-0 h-9"
    >
      <span className="hidden sm:flex items-center px-3 text-[11px] text-primary/50 border-r border-primary/10 flex-shrink-0 select-none">
        tmux
      </span>
      {TABS.map((w, i) => {
        const selected = w.id === active
        return (
          <Link
            key={w.id}
            href={w.href}
            role="tab"
            id={`tab-${w.id}`}
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            className={`group flex items-center gap-1.5 px-3 sm:px-4 text-[12px] font-mono whitespace-nowrap border-r border-primary/10 transition-colors flex-shrink-0 ${
              selected
                ? 'bg-primary text-primary-foreground font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className={selected ? 'opacity-100' : 'opacity-60'}>{i}:</span>
            {w.label}
          </Link>
        )
      })}
    </div>
  )
}
