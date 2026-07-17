'use client'

import React from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BOOT_LINES = [
  '0xPACMAN BIOS v3.0, init',
  'cpu0: Ahmed Jadani [cloud/security] detected',
  'probing /dev/cloud ............ ok',
  'mounting /atlas (vsphere,vxrail,openstack) ... ok',
  'loading security modules: nuclei subfinder burp ... ok',
  'starting tmux session [main] ... ok',
  'login: pacman',
  'Welcome to 0xpacman.com',
]

const LINE_STAGGER = 0.16
const HOLD_AFTER = 400

export function BootSequence() {
  const reduced = useReducedMotion()
  const [phase, setPhase] = React.useState<'pending' | 'running' | 'done'>('pending')

  React.useEffect(() => {
    if (reduced || sessionStorage.getItem('bootDone')) {
      setPhase('done')
      return
    }
    setPhase('running')
    sessionStorage.setItem('bootDone', '1')
  }, [reduced])

  React.useEffect(() => {
    if (phase !== 'running') return
    const total = BOOT_LINES.length * LINE_STAGGER * 1000 + HOLD_AFTER
    const timer = setTimeout(() => setPhase('done'), total)
    const skip = () => setPhase('done')
    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
    }
  }, [phase])

  return (
    <AnimatePresence>
      {phase === 'running' && (
        <motion.div
          className="fixed inset-0 z-50 bg-background flex items-center justify-center cursor-pointer"
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          aria-hidden="true"
        >
          <div className="font-mono text-[13px] leading-relaxed w-full max-w-md px-6">
            {BOOT_LINES.map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * LINE_STAGGER, duration: 0.05 }}
                className={
                  i === BOOT_LINES.length - 1
                    ? 'text-primary'
                    : line.includes('ok')
                      ? 'text-muted-foreground'
                      : 'text-foreground/80'
                }
              >
                {line}
              </motion.div>
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: BOOT_LINES.length * LINE_STAGGER }}
              className="inline-block w-2 h-4 bg-primary animate-blink mt-1"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
