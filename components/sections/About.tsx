'use client'

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, MapPin, Zap, Star, Users, TrendingUp } from "lucide-react"
import Image from "next/image"

interface AboutProps {
  isDarkMode: boolean
  aboutRef: React.RefObject<HTMLDivElement>
}

function useCountUp(target: string, duration = 1600) {
  const [display, setDisplay] = React.useState("0")
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ""))
    const suffix = target.replace(/[0-9.]/g, "")
    if (isNaN(numeric)) { setDisplay(target); return }
    let started = false
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true
        const start = performance.now()
        const step = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          const cur = numeric * eased
          setDisplay((Number.isInteger(numeric) ? Math.floor(cur) : cur.toFixed(1)) + suffix)
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])
  return { ref, display }
}

interface StatDef { value: string; label: string; sub: string; icon: React.ElementType }

function StatCard({ value, label, sub, icon: Icon, isDarkMode }: StatDef & { isDarkMode: boolean }) {
  const counter = useCountUp(value)
  const D = isDarkMode
  return (
    <Card className={`backdrop-blur-xl shadow-lg transition-all duration-300 hover:-translate-y-1 border ${
      D ? "bg-black/40 border-yellow-500/12 hover:border-yellow-500/25 hover:shadow-yellow-500/10"
        : "bg-white/70 border-yellow-500/20 hover:border-yellow-500/40 hover:shadow-yellow-500/15"
    }`}>
      <CardContent className="p-5" ref={counter.ref}>
        <div className="flex items-start justify-between mb-3">
          <div className={`text-3xl font-bold tabular-nums font-mono ${D ? "text-white" : "text-gray-900"}`}>
            {counter.display}
          </div>
          <div className={`h-9 w-9 rounded-lg flex items-center justify-center border ${
            D ? "bg-amber-500/10 border-amber-400/15" : "bg-amber-500/10 border-amber-400/25"
          }`}>
            <Icon className="text-amber-500" size={16} />
          </div>
        </div>
        <div className={`text-sm font-semibold ${D ? "text-gray-200" : "text-gray-700"}`}>{label}</div>
        <div className={`text-[11px] mt-0.5 ${D ? "text-gray-600" : "text-gray-400"}`}>{sub}</div>
      </CardContent>
    </Card>
  )
}

const stats: StatDef[] = [
  { value: "3+",    label: "Years Professional", sub: "+5 years overall IT",         icon: Star      },
  { value: "100+",  label: "Enterprise Clients",  sub: "Across Morocco",              icon: Users     },
  { value: "99.9%", label: "Uptime SLA",           sub: "Architected & operated",     icon: TrendingUp},
  { value: "20+",   label: "Certifications",       sub: "Cloud & virtualization",     icon: Star      },
]

export const About: React.FC<AboutProps> = ({ isDarkMode, aboutRef }) => {
  const D = isDarkMode

  const shell = D
    ? "bg-black/40 border-yellow-500/12"
    : "bg-white/70 border-yellow-500/20"

  return (
    <section ref={aboutRef} className="space-y-5" itemScope itemType="https://schema.org/Person">

      {/* Section header */}
      <div className="flex items-center gap-3 mb-1">
        <div className="h-7 w-0.5 rounded-full bg-gradient-to-b from-amber-400 to-yellow-600" />
        <div>
          <div className={`font-mono text-[10px] mb-0.5 ${D ? "text-yellow-500/40" : "text-yellow-600/50"}`}>~/about</div>
          <h2 className={`text-xl font-bold tracking-tight ${D ? "text-white" : "text-gray-900"}`}>About Me</h2>
        </div>
      </div>

      {/* Hero card */}
      <Card className={`border ${shell} backdrop-blur-xl shadow-xl overflow-hidden`}>
        <CardContent className="p-6 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              {/* Status badge */}
              <div className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold border ${
                D ? "bg-amber-500/10 border-amber-400/20 text-amber-300"
                  : "bg-amber-500/10 border-amber-400/30 text-amber-700"
              }`}>
                Cloud Infrastructure Engineer @ Atlas Cloud Services
              </div>

              {/* Name */}
              <div>
                <h2 className={`text-3xl lg:text-4xl font-bold leading-tight ${D ? "text-white" : "text-gray-900"}`} itemProp="name">
                  Ahmed Jadani
                </h2>
                <meta itemProp="alternateName" content="Pacman" />
                <div className="font-mono text-base font-semibold text-yellow-500 mt-0.5">0xPacman</div>
              </div>

              <p className={`text-[15px] leading-relaxed ${D ? "text-gray-400" : "text-gray-500"}`} itemProp="description">
                Passionate about building scalable, secure cloud foundations and leading digital transformation through pragmatic automation and resilient architectures.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: MapPin, label: "Based in", value: "Benguerir, Morocco" },
                  { icon: Zap,    label: "Availability", value: "Consulting & collaboration" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className={`flex items-center gap-3 text-[12px] ${D ? "text-gray-400" : "text-gray-500"}`}>
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${
                      D ? "bg-amber-500/10 border-amber-400/15" : "bg-amber-500/10 border-amber-400/25"
                    }`}>
                      <Icon className="text-amber-500" size={13} />
                    </div>
                    <div>
                      <div className={`font-semibold text-[11px] ${D ? "text-gray-300" : "text-gray-600"}`}>{label}</div>
                      <div>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <meta itemProp="url" content="https://0xpacman.github.io/Portfolio" />
            </div>

            {/* Photo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative">
                <div className={`absolute inset-0 blur-3xl rounded-full scale-110 ${D ? "bg-amber-500/20" : "bg-amber-400/30"}`} />
                <div className={`relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 shadow-2xl transition-transform duration-500 hover:scale-[1.02] ${
                  D ? "border-amber-400/30 shadow-amber-500/10" : "border-amber-400/40 shadow-amber-500/15"
                }`}>
                  <Image
                    src="/media/PDP.jpg"
                    alt="Ahmed Jadani"
                    fill
                    sizes="(max-width: 768px) 192px, 224px"
                    className="object-cover"
                    itemProp="image"
                  />
                </div>
                <div className="absolute -bottom-2.5 -right-2.5 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 px-2.5 py-1 text-[11px] font-bold text-black shadow-lg">
                  0xPacman
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Journey card */}
      <Card className={`border ${shell} backdrop-blur-xl shadow-lg`}>
        <CardContent className="p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className={`h-9 w-9 rounded-lg flex items-center justify-center border ${
              D ? "bg-amber-500/10 border-amber-400/15" : "bg-amber-500/10 border-amber-400/25"
            }`}>
              <Building2 className="text-amber-500" size={16} />
            </div>
            <div>
              <h3 className={`text-base font-semibold ${D ? "text-white" : "text-gray-900"}`}>Atlas Cloud Services Journey</h3>
              <p className={`text-[11px] ${D ? "text-gray-500" : "text-gray-400"}`}>Morocco's leading data center & public cloud provider</p>
            </div>
          </div>
          <p className={`text-[13px] leading-relaxed ${D ? "text-gray-400" : "text-gray-500"}`}>
            As a Cloud Infrastructure Engineer at{" "}
            <span className="text-amber-500 font-medium" itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
              <span itemProp="name">Atlas Cloud Services</span>
            </span>, I design and operate resilient cloud stacks serving nationwide enterprise workloads.
          </p>
          <p className={`text-[13px] leading-relaxed ${D ? "text-gray-400" : "text-gray-500"}`}>
            My focus spans private cloud architecture, public cloud solutions, and hybrid designs that balance governance, performance, and cost efficiency.
          </p>
        </CardContent>
      </Card>

      {/* Stats grid */}
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(s => (
          <StatCard key={s.label} {...s} isDarkMode={isDarkMode} />
        ))}
      </div>

      <div style={{ display: "none" }}>
        <meta itemProp="sameAs" content="https://github.com/0xPacman" />
        <meta itemProp="sameAs" content="https://linkedin.com/in/0xpacman" />
        <meta itemProp="knowsAbout" content="Cloud Infrastructure" />
        <meta itemProp="knowsAbout" content="VMware" />
        <meta itemProp="knowsAbout" content="Network Security" />
        <meta itemProp="knowsAbout" content="Penetration Testing" />
      </div>
    </section>
  )
}
