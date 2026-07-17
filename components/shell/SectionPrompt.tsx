'use client'

import React from 'react'

interface SectionPromptProps {
  /** the command shown after the prompt, e.g. "cat about.md" */
  command: string
  /** optional privileged prompt (sudo) */
  root?: boolean
  children?: React.ReactNode
}

/** Shell-prompt style section header: root@0xpacman:~$ cat about.md */
export function SectionPrompt({ command, root = false, children }: SectionPromptProps) {
  return (
    <div className="mb-5">
      <div className="font-mono text-[13px] flex flex-wrap items-center gap-1.5">
        <span className={root ? 'text-destructive' : 'text-term-green'}>
          root@0xpacman
        </span>
        <span className="text-muted-foreground">:</span>
        <span className="text-primary/70">~</span>
        <span className="text-muted-foreground">{root ? '#' : '$'}</span>
        <span className="text-foreground">{command}</span>
      </div>
      {children && (
        <p className="mt-2 text-sm text-muted-foreground font-sans max-w-2xl leading-relaxed">
          {children}
        </p>
      )}
    </div>
  )
}
