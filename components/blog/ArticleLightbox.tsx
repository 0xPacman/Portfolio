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
export function ArticleLightbox() {
  const [src, setSrc] = React.useState<string | null>(null)
  const [alt, setAlt] = React.useState('')
  const [t, setT] = React.useState<Transform>({ scale: 1, x: 0, y: 0 })
  const [dragging, setDragging] = React.useState(false)
  const overlayRef = React.useRef<HTMLDivElement>(null)
  const dragRef = React.useRef<{ px: number; py: number; ox: number; oy: number } | null>(null)

  // Wire up click-to-open on every article image
  React.useEffect(() => {
    const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('.blog-content img'))
    const open = (e: Event) => {
      e.preventDefault()
      const img = e.currentTarget as HTMLImageElement
      setAlt(img.alt)
      setSrc(img.currentSrc || img.src)
    }
    imgs.forEach((img) => img.addEventListener('click', open))
    return () => imgs.forEach((img) => img.removeEventListener('click', open))
  }, [])

  const close = React.useCallback(() => setSrc(null), [])

  // Reset transform on open, lock background scroll, bind keyboard + non-passive wheel
  React.useEffect(() => {
    if (!src) return
    setT({ scale: 1, x: 0, y: 0 })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
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

    window.addEventListener('keydown', onKey)
    overlayRef.current?.addEventListener('wheel', onWheel, { passive: false })

    // Lock the shell scroll container while open
    const container = document.querySelector<HTMLElement>('[data-shell-scroll]')
    const prevOverflow = container?.style.overflow
    if (container) container.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKey)
      overlayRef.current?.removeEventListener('wheel', onWheel)
      if (container) container.style.overflow = prevOverflow ?? ''
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
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={alt || 'Image viewer'}
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
      onDoubleClick={onDoubleClick}
    >
      {/* header bar */}
      <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between gap-4 px-4 py-2 border-b border-primary/15 bg-background/80 font-mono text-[12px]">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-term-green flex-shrink-0">root@0xpacman</span>
          <span className="text-muted-foreground">:</span>
          <span className="text-primary/70">~</span>
          <span className="text-muted-foreground">$</span>
          <span className="text-foreground truncate">view {filename}</span>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            aria-label="Zoom out"
            onClick={() => setT((p) => zoomAt(p, p.scale / 1.25, 0, 0))}
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
          >
            <Minus size={14} aria-hidden="true" />
          </button>
          <span className="w-12 text-center text-primary tabular-nums">{Math.round(t.scale * 100)}%</span>
          <button
            aria-label="Zoom in"
            onClick={() => setT((p) => zoomAt(p, p.scale * 1.25, 0, 0))}
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
          >
            <Plus size={14} aria-hidden="true" />
          </button>
          <button
            aria-label="Reset zoom"
            onClick={() => setT({ scale: 1, x: 0, y: 0 })}
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
          >
            <RotateCcw size={14} aria-hidden="true" />
          </button>
          <button
            aria-label="Close"
            autoFocus
            onClick={close}
            className="p-1.5 ml-1 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <X size={14} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* image */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="max-w-[92vw] max-h-[88vh] w-auto h-auto object-contain border border-primary/20 bg-card shadow-2xl"
          style={{
            transform: `translate(${t.x}px, ${t.y}px) scale(${t.scale})`,
            transition: dragRef.current ? 'none' : 'transform 0.15s ease-out',
            cursor: t.scale > 1 ? (dragging ? 'grabbing' : 'grab') : 'zoom-in',
          }}
        />
      </div>

      {/* footer hint */}
      <div className="absolute bottom-0 inset-x-0 z-10 px-4 py-2 border-t border-primary/15 bg-background/80 text-center font-mono text-[11px] text-muted-foreground">
        scroll to zoom · double-click to toggle 250% · drag to pan · esc to close
      </div>
    </div>,
    document.body,
  )
}
