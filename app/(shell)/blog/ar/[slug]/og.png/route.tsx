import { ImageResponse } from 'next/og'
import { getAllPosts, getPost } from '@/lib/blog'

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts('ar').map((p) => ({ slug: p.slug }))
}

let fontCache: { arabicRegular: ArrayBuffer; arabicBold: ArrayBuffer } | null = null

// Bare AppleWebKit UA (no Chrome token) — Google Fonts serves static TTF to it
const FONT_UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'

async function fetchFontCss(url: string): Promise<ArrayBuffer> {
  const css = await fetch(url, { headers: { 'User-Agent': FONT_UA } }).then((r) => r.text())
  const file = css.match(/url\((https:[^)]+)\)/)?.[1]
  if (!file) throw new Error(`font url not found for ${url}`)
  return fetch(file, { headers: { 'User-Agent': FONT_UA } }).then((r) => r.arrayBuffer())
}

async function loadFonts() {
  if (!fontCache) {
    const [arabicRegular, arabicBold] = await Promise.all([
      fetchFontCss('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400'),
      fetchFontCss('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@700'),
    ])
    fontCache = { arabicRegular, arabicBold }
  }
  return fontCache
}

const SIZE = { width: 1200, height: 630 }

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = getPost(slug, 'ar')
  if (!post) return new Response('Not found', { status: 404 })
  const { meta } = post
  const fonts = await loadFonts()

  // Strip tatweel (U+0640) — satori's Arabic shaping draws it as stretched gaps
  const title = meta.title.replace(/\u0640/g, '')
  const titleSize = title.length > 70 ? 42 : title.length > 45 ? 50 : 58

  // satori mis-measures U+0020 between RTL words (join with NBSP) and its bidi
  // reorders mixed Arabic/Latin lines unreliably (a line may only contain Latin
  // words BEFORE any Arabic word)
  const hasArabic = (s: string) => /[\u0600-\u06FF]/.test(s)
  const isLatinish = (s: string) => /^[A-Za-z0-9]/.test(s)

  const words: string[] = title.split(' ')

  const wrapTitle = (ws: string[], max = 36): string[] => {
    const lines: string[] = []
    let cur = ''
    for (const w of ws) {
      const mustBreak =
        cur !== '' &&
        ((cur + ' ' + w).length > max || (hasArabic(cur) && isLatinish(w)))
      if (mustBreak) {
        lines.push(cur)
        cur = w
      } else {
        cur = cur ? cur + ' ' + w : w
      }
    }
    if (cur) lines.push(cur)
    return lines
  }
  const titleLines = wrapTitle(words).map((ln) => ln.split(' '))
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#050505',
          fontFamily: 'IBM Plex Sans Arabic',
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
          <div style={{ display: 'flex', fontSize: 26, color: '#8F897F', fontFamily: 'IBM Plex Sans Arabic' }}>
            <span style={{ color: '#28BE7B' }}>root@0xpacman</span>
            <span>:~/blog$&nbsp;</span>
            <span style={{ color: '#E3DED2' }}>cat ar/{slug}.md</span>
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
                display: 'flex',
                flexDirection: 'column',
                fontSize: titleSize,
                fontWeight: 700,
                color: '#E3DED2',
                lineHeight: 1.35,
              }}
            >
              {/* Pure-Arabic lines: single text node with NBSP (even spacing).
                  Any line containing Latin letters: word spans in flex (reversed = visual RTL) to bypass satori bidi. */}
              {titleLines.map((lineWords, i) =>
                lineWords.every((w) => !/[A-Za-z0-9]/.test(w)) ? (
                  <div key={i}>
                    {lineWords.join('\u00A0')}
                  </div>
                ) : (
                  <div
                    key={i}
                    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}
                  >
                    {[...lineWords].reverse().map((w, j) => (
                      <span key={j} style={{ paddingRight: '0.3em' }}>
                        {w}
                      </span>
                    ))}
                  </div>
                ),
              )}
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
              fontFamily: 'IBM Plex Sans Arabic',
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
      ...SIZE,
      fonts: [
        { name: 'IBM Plex Sans Arabic', data: fonts.arabicRegular, weight: 400, style: 'normal' },
        { name: 'IBM Plex Sans Arabic', data: fonts.arabicBold, weight: 700, style: 'normal' },
      ],
    }
  )
}
