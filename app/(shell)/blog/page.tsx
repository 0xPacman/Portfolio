import type { Metadata } from 'next'
import { Blog } from '@/components/sections/Blog'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Technical writing by Ahmed Jadani — private cloud, OpenStack, VMware, automation with Ansible and Python, and reliability engineering.',
  alternates: { canonical: '/blog/' },
  openGraph: {
    title: 'Blog | Ahmed Jadani',
    description: 'Private cloud, OpenStack, automation, and reliability engineering.',
    url: 'https://0xpacman.com/blog/',
  },
}

export default function BlogPage() {
  return (
    <div className="page-container page-content">
      <Blog />
    </div>
  )
}
