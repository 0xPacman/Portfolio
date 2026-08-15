import { ImageResponse } from 'next/og'
import { getAllPosts, getPost } from '@/lib/blog'

export const alt = 'Article cover'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

let fontCache: { regular: ArrayBuffer; bold: ArrayBuffer } | null = null

// Bare AppleWebKit UA (no Chrome token) — Google Fonts serves static TTF to it
const FONT_UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'

async function fetchFont(weight: 400 | 700): Promise<ArrayBuffer> {
  // This UA makes Google Fonts serve static TTF files (Satori-compatible)
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@${weight}`,
    { headers: { 'User-Agent': FONT_UA } }
  ).then((r) => r.text())
  const url = css.match(/url\((https:[^)]+)\)/)?.[1]
  if (!url) throw new Error(`JetBrains Mono ${weight} url not found`)
  return fetch(url, { headers: { 'User-Agent': FONT_UA } }).then((r) => r.arrayBuffer())
}

async function loadFonts() {
  if (!fontCache) {
    const [regular, bold] = await Promise.all([fetchFont(400), fetchFont(700)])
    fontCache = { regular, bold }
  }
  return fontCache
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return new Response('Not found', { status: 404 })
  const { meta } = post
  const fonts = await loadFonts()

  const titleSize = meta.title.length > 70 ? 42 : meta.title.length > 45 ? 50 : 58

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#050505',
          fontFamily: 'JetBrains Mono',
          position: 'relative',
        }}
      >
        {/* frame */}
        <div
          style={{
            position: 'absolute',
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: '1px solid rgba(250, 173, 20, 0.3)',
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            padding: '64px 72px',
          }}
        >
          {/* prompt line */}
          <div style={{ display: 'flex', fontSize: 26, color: '#8F897F' }}>
            <span style={{ color: '#28BE7B' }}>root@0xpacman</span>
            <span>:~/blog$&nbsp;</span>
            <span style={{ color: '#E3DED2' }}>cat {slug}.md</span>
          </div>

          {/* title */}
          <div
            style={{
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              padding: '24px 0',
            }}
          >
            <div
              style={{
                fontSize: titleSize,
                fontWeight: 700,
                color: '#E3DED2',
                lineHeight: 1.2,
              }}
            >
              {meta.title}
            </div>
          </div>

          {/* bottom row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 23,
              color: '#8F897F',
            }}
          >
            <span style={{ color: '#FAAD14', flexShrink: 0, marginRight: 32 }}>
              0xpacman.com
            </span>
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
              {meta.date}
              {meta.tags.length > 0 ? `  ·  ${meta.tags.slice(0, 2).join(' · ')}` : ''}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'JetBrains Mono', data: fonts.regular, weight: 400, style: 'normal' },
        { name: 'JetBrains Mono', data: fonts.bold, weight: 700, style: 'normal' },
      ],
    }
  )
}
