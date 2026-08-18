import type { Metadata } from 'next'
import { Projects } from '@/components/sections/Projects'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Projects by Ahmed Jadani (0xPacman) — infrastructure tooling, web apps, security utilities, and open-source experiments.',
  alternates: { canonical: '/projects/' },
  openGraph: {
    title: 'Projects | Ahmed Jadani',
    description: 'Infrastructure tooling, web apps, security utilities, and open-source experiments.',
    url: 'https://0xpacman.com/projects/',
  },
}

export default function ProjectsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <Projects />
    </div>
  )
}
