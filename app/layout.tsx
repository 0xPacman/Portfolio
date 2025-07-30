import type { Metadata } from 'next'
import './globals.css'
import '../styles/color-fixes.css'
import React from 'react'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'Ahmed Jadani | Pacman',
  description: 'Portfolio of Ahmed Jadani, showcasing interactive web experiences.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2240%22 fill=%22%23FFD700%22/><path d=%22M50 50 L90 30 A40 40 0 0 1 90 70 Z%22 fill=%22%23000%22/><circle cx=%2265%22 cy=%2235%22 r=%224%22 fill=%22%23000%22/></svg>" />
      </head>
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
