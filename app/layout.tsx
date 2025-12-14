import type { Metadata } from 'next'
import './globals.css'
import '../styles/color-fixes.css'
import React from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { getStructuredData, generateJSONLD } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Ahmed Jadani | Cloud Infrastructure Engineer Portfolio',
  description: 'Portfolio of Ahmed Jadani, Cloud Infrastructure Engineer at Atlas Cloud Services. Specializing in VMware, OpenStack, cloud architecture, and web development.',
  keywords: [
    'Ahmed Jadani',
    'Pacman',
    'Cloud Infrastructure Engineer',
    'VMware',
    'OpenStack',
    'Atlas Cloud Services',
    'Morocco',
    'Benguerir',
    'Portfolio',
    'Web Development',
    'DevOps',
    'System Administration'
  ],
  authors: [{ name: 'Ahmed Jadani', url: 'https://0xpacman.github.io/Portfolio' }],
  creator: 'Ahmed Jadani',
  openGraph: {
    title: 'Ahmed Jadani | Cloud Infrastructure Engineer',
    description: 'Cloud Infrastructure Engineer specializing in enterprise-grade infrastructure, VMware technologies, and scalable cloud solutions.',
    url: 'https://0xpacman.github.io/Portfolio',
    siteName: 'Ahmed Jadani Portfolio',
    images: [
      {
        url: 'https://0xpacman.github.io/Portfolio/media/PDP.jpg',
        width: 800,
        height: 600,
        alt: 'Ahmed Jadani - Cloud Infrastructure Engineer',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmed Jadani | Cloud Infrastructure Engineer',
    description: 'Cloud Infrastructure Engineer specializing in enterprise-grade infrastructure and scalable cloud solutions.',
    images: ['https://0xpacman.github.io/Portfolio/media/PDP.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = getStructuredData()
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateJSONLD(structuredData)}
        />
        
        {/* Favicon */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2240%22 fill=%22%23FFD700%22/><path d=%22M50 50 L90 30 A40 40 0 0 1 90 70 Z%22 fill=%22%23000%22/><circle cx=%2265%22 cy=%2235%22 r=%224%22 fill=%22%23000%22/></svg>" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://0xpacman.github.io/Portfolio" />
        
        {/* Additional meta tags for better SEO */}
        <meta name="google-site-verification" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FFD700" />
        <meta name="monetag" content="c40c9decc17ac43dc0a786ad0e66eded" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://github.com" />
        <link rel="preconnect" href="https://linkedin.com" />
        <link rel="preconnect" href="https://0xpacman.com" />
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
