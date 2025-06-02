import type { Metadata } from 'next'
import './globals.css'
import '../styles/color-fixes.css'
import React from 'react'

export const metadata: Metadata = {
  title: 'Ahmed Jadani | Portfolio',
  description: 'Professional portfolio of Ahmed Jadani, a Cloud and Infrastructure Engineer',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning />
      <body suppressHydrationWarning className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
