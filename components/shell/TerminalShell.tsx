'use client'

import React from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { StatusBar } from './StatusBar'
import { BootSequence } from './BootSequence'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'

interface WindowDef {
  id: string
  label: string
  path: string
  render: () => React.ReactNode
}

const WINDOWS: WindowDef[] = [
  { id: 'about', label: 'about', path: '~', render: () => <About /> },
  { id: 'skills', label: 'skills', path: '~/skills', render: () => <Skills /> },
  { id: 'projects', label: 'projects', path: '~/projects', render: () => <Projects /> },
  { id: 'contact', label: 'contact', path: '~/contact', render: () => <Contact /> },
]

function readHashTab(): string {
  if (typeof window === 'undefined') return WINDOWS[0].id
  const hash = window.location.hash.replace('#', '')
  return WINDOWS.some((w) => w.id === hash) ? hash : WINDOWS[0].id
}

export function TerminalShell() {
  const reduced = useReducedMotion()
  const [active, setActive] = React.useState(WINDOWS[0].id)
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([])

  React.useEffect(() => {
    setActive(readHashTab())
    const onHash = () => setActive(readHashTab())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const select = React.useCallback((id: string) => {
    setActive(id)
    if (typeof window !== 'undefined') history.replaceState(null, '', `#${id}`)
  }, [])

  // Numeric hotkeys 1–5 (skip when typing)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      const n = parseInt(e.key, 10)
      if (n >= 1 && n <= WINDOWS.length) select(WINDOWS[n - 1].id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [select])

  // Arrow-key roving within the tablist
  const onTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next = index
    if (e.key === 'ArrowRight') next = (index + 1) % WINDOWS.length
    else if (e.key === 'ArrowLeft') next = (index - 1 + WINDOWS.length) % WINDOWS.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = WINDOWS.length - 1
    else return
    e.preventDefault()
    select(WINDOWS[next].id)
    tabRefs.current[next]?.focus()
  }

  const activeIndex = WINDOWS.findIndex((w) => w.id === active)
  const activeWindow = WINDOWS[activeIndex] ?? WINDOWS[0]

  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden bg-background relative">
      <BootSequence />

      <div className="absolute inset-0 dotgrid" aria-hidden="true" />
      <div className="absolute inset-0 scanlines opacity-40" aria-hidden="true" />

      <div className="flex flex-col flex-1 min-h-0 relative z-10">
        {/* tmux window list */}
        <div
          role="tablist"
          aria-label="Portfolio sections"
          className="flex items-stretch border-b border-primary/15 bg-background overflow-x-auto flex-shrink-0 h-9"
        >
          <span className="hidden sm:flex items-center px-3 text-[11px] text-primary/50 border-r border-primary/10 flex-shrink-0 select-none">
            tmux
          </span>
          {WINDOWS.map((w, i) => {
            const selected = w.id === active
            return (
              <button
                key={w.id}
                ref={(el) => { tabRefs.current[i] = el }}
                role="tab"
                id={`tab-${w.id}`}
                aria-selected={selected}
                aria-controls={`panel-${w.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(w.id)}
                onKeyDown={(e) => onTabKeyDown(e, i)}
                className={`group flex items-center gap-1.5 px-3 sm:px-4 text-[12px] font-mono whitespace-nowrap border-r border-primary/10 transition-colors flex-shrink-0 ${
                  selected
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className={selected ? 'opacity-100' : 'opacity-60'}>{i}:</span>
                {w.label}
              </button>
            )
          })}
        </div>

        {/* Active pane */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeWindow.id}
                role="tabpanel"
                id={`panel-${activeWindow.id}`}
                aria-labelledby={`tab-${activeWindow.id}`}
                tabIndex={0}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                {activeWindow.render()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <StatusBar />
    </div>
  )
}
