'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/** Re-mounts on navigation — fade/slide transition between sections. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
