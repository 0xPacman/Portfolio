import { getAllPosts, getPost } from '@/lib/blog'

export const dynamic = 'force-static'

const BASE = 'https://0xpacman.com'

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function GET() {
  const items = getAllPosts()
    .map((m) => {
      const post = getPost(m.slug)
      const url = `${BASE}/blog/${m.slug}/`
      // feed readers need absolute asset URLs
      const html = post?.html.replace(/(src|href)="\//g, `$1="${BASE}/`) ?? ''
      const categories = m.tags
        .map((t) => `      <category>${escapeXml(t)}</category>`)
        .join('\n')

      return `    <item>
      <title>${escapeXml(m.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(m.date).toUTCString()}</pubDate>
      <description>${escapeXml(m.description)}</description>
${categories}
      <content:encoded><![CDATA[${html}]]></content:encoded>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ahmed Jadani | Blog</title>
    <link>${BASE}</link>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Infrastructure, automation, private cloud, and the occasional rabbit hole.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
