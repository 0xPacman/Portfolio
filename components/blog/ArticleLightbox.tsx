'use client'

import React from 'react'
import { createPortal } from 'react-dom'
import { Minus, Plus, RotateCcw, X } from 'lucide-react'

const MIN_SCALE = 1
const MAX_SCALE = 8

interface Transform {
  scale: number
  x: number
  y: number
}

const clampScale = (s: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s))

/** Zoom a transform toward a point (coords relative to viewport center). */
function zoomAt(prev: Transform, nextScale: number, cx: number, cy: number): Transform {
  const scale = clampScale(nextScale)
  const f = scale / prev.scale
  return { scale, x: cx - f * (cx - prev.x), y: cy - f * (cy - prev.y) }
}

/** Fullscreen lightbox for article images: click to open, wheel/double-click to zoom, drag to pan. */
export function ArticleLightbox({ rtl }: { rtl: boolean }) {
  const [src, setSrc] = React.useState<string | null>(null)
  const [alt, setAlt] = React.useState('')
  const [t, setT] = React.useState<Transform>({ scale: 1, x: 0, y: 0 })
  const [dragging, setDragging] = React.useState(false)
  const overlayRef = React.useRef<HTMLDialogElement>(null)
  const opener = React.useRef<HTMLImageElement | null>(null)
  const dragRef = React.useRef<{ px: number; py: number; ox: number; oy: number } | null>(null)

  // Wire up click-to-open on every article image
  React.useEffect(() => {
    const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('.blog-content img'))
    const open = (e: Event) => {
      e.preventDefault()
      const img = e.currentTarget as HTMLImageElement
      opener.current = img
      setT({ scale: 1, x: 0, y: 0 })
      setDragging(false)
      dragRef.current = null
      setAlt(img.alt)
      setSrc(img.currentSrc || img.src)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') open(e)
    }
    imgs.forEach((img) => {
      img.setAttribute('role', 'button')
      img.setAttribute('aria-haspopup', 'dialog')
      img.tabIndex = 0
      img.addEventListener('click', open)
      img.addEventListener('keydown', onKey)
    })
    return () => imgs.forEach((img) => {
      img.removeAttribute('role')
      img.removeAttribute('aria-haspopup')
      img.removeAttribute('tabindex')
      img.removeEventListener('click', open)
      img.removeEventListener('keydown', onKey)
    })
  }, [])

  const close = React.useCallback(() => setSrc(null), [])

  // Reset transform on open, lock background scroll, bind keyboard + non-passive wheel
  React.useEffect(() => {
    const dialog = overlayRef.current
    if (!src || !dialog) return
    dialog.showModal()

    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (e.key === '+' || e.key === '=') setT((p) => zoomAt(p, p.scale * 1.25, 0, 0))
      if (e.key === '-' || e.key === '_') setT((p) => zoomAt(p, p.scale / 1.25, 0, 0))
      if (e.key === '0') setT({ scale: 1, x: 0, y: 0 })
    }
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const rect = overlayRef.current?.getBoundingClientRect()
      if (!rect) return
      const cx = e.clientX - rect.left - rect.width / 2
      const cy = e.clientY - rect.top - rect.height / 2
      setT((p) => zoomAt(p, p.scale * (e.deltaY < 0 ? 1.15 : 1 / 1.15), cx, cy))
    }

    dialog.addEventListener('keydown', onKey)
    dialog.addEventListener('wheel', onWheel, { passive: false })

    // Lock the shell scroll container while open
    const container = document.querySelector<HTMLElement>('[data-shell-scroll]')
    const prevOverflow = container?.style.overflow
    if (container) container.style.overflow = 'hidden'

    return () => {
      dialog.removeEventListener('keydown', onKey)
      dialog.removeEventListener('wheel', onWheel)
      dialog.close()
      if (container) container.style.overflow = prevOverflow ?? ''
      opener.current?.focus({ preventScroll: true })
    }
  }, [src, close])

  if (!src || typeof document === 'undefined') return null

  const onPointerDown = (e: React.PointerEvent) => {
    if (t.scale <= 1) return
    e.preventDefault()
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    dragRef.current = { px: e.clientX, py: e.clientY, ox: t.x, oy: t.y }
    setDragging(true)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current
    if (!d) return
    setT((p) => ({ ...p, x: d.ox + (e.clientX - d.px), y: d.oy + (e.clientY - d.py) }))
  }
  const endDrag = () => {
    dragRef.current = null
    setDragging(false)
  }
  const onDoubleClick = (e: React.MouseEvent) => {
    const rect = overlayRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = e.clientX - rect.left - rect.width / 2
    const cy = e.clientY - rect.top - rect.height / 2
    setT((p) => (p.scale > 1.01 ? { scale: 1, x: 0, y: 0 } : zoomAt(p, 2.5, cx, cy)))
  }

  const filename = src.split('/').pop() ?? src

  return createPortal(
    <dialog
      ref={overlayRef}
      aria-modal="true"
      aria-label={alt || (rtl ? 'عارض الصور' : 'Image viewer')}
      onCancel={(e) => { e.preventDefault(); close() }}
      className="fixed inset-0 m-0 h-[100dvh] max-h-none w-screen max-w-none border-0 bg-background/95 p-0 text-foreground backdrop-blur-sm select-none"
    >
      {/* header bar */}
      <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between gap-2 px-2 sm:px-4 border-b border-primary/15 bg-background font-mono text-[12px]">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-primary hidden sm:inline">$ view</span>
          <span className="truncate">{filename}</span>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            aria-label={rtl ? 'صغّر الصورة' : 'Zoom out'}
            disabled={t.scale === MIN_SCALE}
            onClick={() => setT((p) => zoomAt(p, p.scale / 1.25, 0, 0))}
            className="grid size-11 place-items-center text-muted-foreground hover:text-foreground hover:bg-primary/10 disabled:opacity-50"
          >
            <Minus size={14} aria-hidden="true" />
          </button>
          <span className="w-12 text-center text-primary tabular-nums">{Math.round(t.scale * 100)}%</span>
          <button
            aria-label={rtl ? 'كبّر الصورة' : 'Zoom in'}
            disabled={t.scale === MAX_SCALE}
            onClick={() => setT((p) => zoomAt(p, p.scale * 1.25, 0, 0))}
            className="grid size-11 place-items-center text-muted-foreground hover:text-foreground hover:bg-primary/10 disabled:opacity-50"
          >
            <Plus size={14} aria-hidden="true" />
          </button>
          <button
            aria-label={rtl ? 'رجّع الحجم الأصلي' : 'Reset zoom'}
            onClick={() => setT({ scale: 1, x: 0, y: 0 })}
            className="grid size-11 place-items-center text-muted-foreground hover:text-foreground hover:bg-primary/10"
          >
            <RotateCcw size={14} aria-hidden="true" />
          </button>
          <button
            aria-label={rtl ? 'سدّ الصورة' : 'Close'}
            autoFocus
            onClick={close}
            className="grid size-11 place-items-center text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <X size={14} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* image */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden"
        onClick={(event) => { if (event.target === event.currentTarget) close() }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          onDoubleClick={onDoubleClick}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="max-w-[92vw] max-h-[88vh] w-auto h-auto object-contain border border-primary/20 bg-card shadow-2xl"
          style={{
            transform: `translate(${t.x}px, ${t.y}px) scale(${t.scale})`,
            touchAction: t.scale > 1 ? 'none' : 'manipulation',
            cursor: t.scale > 1 ? (dragging ? 'grabbing' : 'grab') : 'zoom-in',
          }}
        />
      </div>

      {/* footer hint */}
      <div className="absolute bottom-0 inset-x-0 z-10 px-4 py-2 border-t border-primary/15 bg-background/80 text-center font-mono text-[11px] text-muted-foreground">
        {rtl ? 'كبّر الصورة وجرّها باش تحرّكها' : 'Zoom in, then drag to pan.'}
      </div>
    </dialog>,
    document.body,
  )
}
