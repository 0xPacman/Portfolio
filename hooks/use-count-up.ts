'use client'

import React from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Counts up to a target like "99.9%", "100+", "20+".
 * State initializes to the FINAL value so SSG / no-JS renders real numbers
 * (fixes the "0" that shipped before). Animation runs once on mount.
 */
export function useCountUp(target: string, duration = 1400) {
  const reduced = useReducedMotion()
  const [display, setDisplay] = React.useState(target)

  React.useEffect(() => {
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ''))
    const suffix = target.replace(/[0-9.]/g, '')
    if (reduced || isNaN(numeric)) {
      setDisplay(target)
      return
    }
    const isInt = Number.isInteger(numeric)
    let raf = 0
    const start = performance.now()
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      const cur = numeric * eased
      setDisplay((isInt ? Math.floor(cur) : cur.toFixed(1)) + suffix)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, reduced])

  return display
}
