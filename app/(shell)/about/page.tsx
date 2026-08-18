'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

/** /about is the homepage — redirect for consistency. */
export default function AboutRedirect() {
  const router = useRouter()
  React.useEffect(() => {
    router.replace('/')
  }, [router])
  return null
}
