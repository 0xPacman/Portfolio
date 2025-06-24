import type { Metadata } from 'next'
import './globals.css'
import '../styles/color-fixes.css'
import React from 'react'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'Ahmed Jadani | Creative Portfolio',
  description: 'Creative portfolio of Ahmed Jadani, showcasing interactive web experiences.',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
