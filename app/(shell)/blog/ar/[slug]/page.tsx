import type { Metadata } from 'next'
import { ArticleView, articleMetadata, staticParams } from '@/components/blog/ArticlePage'

export const dynamicParams = false

export function generateStaticParams() {
  return staticParams('ar')
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  return articleMetadata(slug, 'ar')
}

export default async function BlogPostAr({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <ArticleView slug={slug} locale="ar" />
}
