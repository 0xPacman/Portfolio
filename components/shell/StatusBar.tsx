'use client'

import React from 'react'

function formatUptime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function StatusBar() {
  const [now, setNow] = React.useState<string | null>(null)
  const [uptime, setUptime] = React.useState(0)

  React.useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Casablanca',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    const tick = () => setNow(fmt.format(new Date()))
    tick()
    const start = Date.now()
    const id = setInterval(() => {
      tick()
      setUptime(Math.floor((Date.now() - start) / 1000))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      role="status"
      aria-live="off"
      className="flex items-center justify-between gap-3 border-t border-primary/15 bg-black px-3 h-7 font-mono text-[11px] select-none flex-shrink-0"
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className="bg-primary text-primary-foreground px-1.5 font-bold">[main]</span>
        <span className="text-muted-foreground truncate">root@0xpacman.com</span>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0 text-muted-foreground">
        <span className="hidden sm:inline" title="Session uptime">
          up {formatUptime(uptime)}
        </span>
        <span className="hidden md:inline" aria-hidden="true">|</span>
        {now && (
          <span title="Local time, Benguerir, Morocco">
            MA {now}
          </span>
        )}
        <span aria-hidden="true" className="hidden md:inline">|</span>
        <span className="flex items-center gap-1.5 text-term-green">
          <span className="w-1.5 h-1.5 rounded-full bg-term-green animate-blink" aria-hidden="true" />
          available
        </span>
      </div>
    </div>
  )
}
