import type { Metadata } from 'next'
import { Skills } from '@/components/sections/Skills'

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Technical skills of Ahmed Jadani — VMware, OpenStack, private cloud architecture, Ansible and Python automation, Linux, and enterprise infrastructure.',
  alternates: { canonical: '/skills/' },
  openGraph: {
    title: 'Skills | Ahmed Jadani',
    description: 'VMware, OpenStack, private cloud, automation, Linux, and enterprise infrastructure.',
    url: 'https://0xpacman.com/skills/',
  },
}

export default function SkillsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <Skills />
    </div>
  )
}
