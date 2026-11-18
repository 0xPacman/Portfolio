import React from 'react'
import { Shell } from '@/components/shell/Shell'
import { QuickOpen } from '@/components/shell/QuickOpen'
import { getAllPosts } from '@/lib/blog'

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  const articles = [...getAllPosts('en'), ...getAllPosts('ar')].map(({ title, slug, locale, tags }) => ({
    title, locale, tags, href: `/blog/${locale === 'ar' ? 'ar/' : ''}${slug}/`,
  }))
  return <Shell search={<QuickOpen articles={articles} />}>{children}</Shell>
}
