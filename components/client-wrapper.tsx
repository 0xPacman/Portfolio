'use client'

import React from 'react'

// Create a client-side only wrapper for GSAP components
const ClientOnlyWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return <>{children}</>
}

export default ClientOnlyWrapper
