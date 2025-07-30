'use client'

import React from 'react'

export function useClientOnly() {
  const [isClient, setIsClient] = React.useState(false)
  
  React.useEffect(() => {
    setIsClient(true)
  }, [])
  
  return isClient
}
