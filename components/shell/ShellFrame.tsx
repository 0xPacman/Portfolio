'use client'

import React from 'react'
import { StatusBar } from './StatusBar'
import { TabBar } from './TabBar'

interface ShellFrameProps {
  active: string
  children: React.ReactNode
}

/** Shared terminal chrome: dotgrid + scanlines, tmux tab bar, status bar. */
export function ShellFrame({ active, children }: ShellFrameProps) {
  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden bg-background relative">
      <div className="absolute inset-0 dotgrid" aria-hidden="true" />
      <div className="absolute inset-0 scanlines opacity-40" aria-hidden="true" />

      <div className="flex flex-col flex-1 min-h-0 relative z-10">
        <TabBar active={active} />
        <div className="flex-1 min-h-0 overflow-y-auto" data-shell-scroll>
          {children}
        </div>
      </div>

      <StatusBar />
    </div>
  )
}
