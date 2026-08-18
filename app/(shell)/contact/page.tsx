import type { Metadata } from 'next'
import { Contact } from '@/components/sections/Contact'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Ahmed Jadani — cloud infrastructure engineer open to collaboration and consultation. GitHub, LinkedIn, WhatsApp, email.',
  alternates: { canonical: '/contact/' },
  openGraph: {
    title: 'Contact | Ahmed Jadani',
    description: 'Open to collaboration and consultation.',
    url: 'https://0xpacman.com/contact/',
  },
}

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <Contact />
    </div>
  )
}
