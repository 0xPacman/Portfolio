import type { Metadata } from 'next'
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'
import React from 'react'
import { getStructuredData, generateJSONLD } from '@/lib/schema'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://0xpacman.com'),
  title: 'Ahmed Jadani | Cloud Infrastructure Engineer',
  description:
    'Portfolio of Ahmed Jadani (0xPacman), Cloud Infrastructure Engineer at Atlas Cloud Services. VMware, OpenStack, private cloud architecture, and enterprise infrastructure automation.',
  keywords: [
    'Ahmed Jadani',
    '0xPacman',
    'Cloud Infrastructure Engineer',
    'VMware',
    'OpenStack',
    'Atlas Cloud Services',
    'Morocco',
    'Benguerir',
    'Portfolio',
    'DevOps',
    'System Administration',
  ],
  authors: [{ name: 'Ahmed Jadani', url: 'https://0xpacman.com' }],
  creator: 'Ahmed Jadani',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ahmed Jadani | Cloud Infrastructure Engineer',
    description:
      'Cloud Infrastructure Engineer at Atlas Cloud Services, private cloud architecture, VMware, OpenStack, and enterprise automation.',
    url: 'https://0xpacman.com',
    siteName: 'Ahmed Jadani Portfolio',
    images: [
      {
        url: '/media/PDP.jpg',
        width: 800,
        height: 600,
        alt: 'Ahmed Jadani - Cloud Infrastructure Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmed Jadani | Cloud Infrastructure Engineer',
    description:
      'Cloud Infrastructure Engineer at Atlas Cloud Services, private cloud architecture, VMware, OpenStack, and enterprise automation.',
    images: ['/media/PDP.jpg'],
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
    <html lang="en" className={`dark ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* No-FOUC theme: dark is the default; apply a saved light preference before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark');}else if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateJSONLD(structuredData)}
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2240%22 fill=%22%23FFD700%22/><path d=%22M50 50 L90 30 A40 40 0 0 1 90 70 Z%22 fill=%22%23000%22/><circle cx=%2265%22 cy=%2235%22 r=%224%22 fill=%22%23000%22/></svg>" />
        <meta name="theme-color" content="#0A0A0A" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased font-mono">
        {children}
      </body>
    </html>
  )
}
