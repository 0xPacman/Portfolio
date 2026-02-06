'use client'

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, MapPin, Zap, Star, Users, TrendingUp, ChevronRight, Cloud, Shield, Code, Activity, Network, ServerCrash } from "lucide-react"
import Image from "next/image"

interface AboutProps {
  isDarkMode: boolean
  aboutRef: React.RefObject<HTMLDivElement>
}

/* ── Animated counter hook ── */
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          const start = performance.now()
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)  // ease-out cubic
            const current = numeric * eased
            setDisplay(
              (Number.isInteger(numeric) ? Math.floor(current) : current.toFixed(1)) + suffix
            )
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { ref, display }
}

export const About: React.FC<AboutProps> = ({ isDarkMode, aboutRef }: AboutProps) => {
  const textPrimary = "text-foreground"
  const textSecondary = "text-muted-foreground"
  const textAccent = "text-amber-500 dark:text-amber-400"

  const shell = isDarkMode
    ? "bg-black/50 border border-yellow-500/25 shadow-yellow-500/10"
    : "bg-white/70 border border-yellow-500/35 shadow-yellow-500/20"

  const gradientStroke = isDarkMode
    ? "from-yellow-500/20 via-amber-400/10 to-orange-300/10"
    : "from-yellow-400/30 via-amber-300/20 to-orange-200/30"

  const stats = [
    { value: "3+", label: "Years Professional", sub: "+5 years overall IT", icon: Star },
    { value: "100+", label: "Enterprise Clients", sub: "Across Morocco", icon: Users },
    { value: "99.9%", label: "Uptime SLA", sub: "Architected & operated", icon: TrendingUp },
    { value: "20+", label: "Certifications", sub: "Cloud & virtualization", icon: Star },
  ]

  const focus = [
    { label: "Private & public cloud architecture", icon: Cloud },
    { label: "Hybrid designs for regulated orgs", icon: Shield },
    { label: "Infrastructure as Code & automation", icon: Code },
    { label: "Observability and SRE practices", icon: Activity },
    { label: "Network security & segmentation", icon: Network },
    { label: "Resilience, DR, and continuity", icon: ServerCrash },
  ]

  return (
    <section
      ref={aboutRef}
      className="space-y-6"
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* ── Section title ── */}
      <div className="flex items-center gap-3 mb-2">
        <div className="h-8 w-1 rounded-full bg-gradient-to-b from-amber-400 to-yellow-600" />
        <h2 className={`text-2xl font-bold tracking-tight ${textPrimary}`}>About Me</h2>
      </div>

      {/* ── Hero card ── */}
      <Card className={`${shell} backdrop-blur-xl shadow-2xl overflow-hidden group`}>
        <div className={`absolute inset-0 pointer-events-none bg-gradient-to-br ${gradientStroke} opacity-60 group-hover:opacity-100 transition-opacity duration-700`} />
        <CardContent className="relative p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold bg-amber-500/15 border border-amber-400/30 text-amber-600 dark:text-amber-200">
                <div className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </div>
                Cloud Infrastructure Engineer @ Atlas Cloud Services
              </div>
              <h2 className={`text-3xl lg:text-4xl font-bold leading-tight ${textPrimary}`} itemProp="name">
                Ahmed Jadani
              </h2>
              <meta itemProp="alternateName" content="Pacman" />
              <p className={`text-lg lg:text-xl leading-relaxed ${textSecondary}`} itemProp="description">
                Passionate about building scalable, secure cloud foundations and leading digital transformation through pragmatic automation and resilient architectures.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className={`flex items-center gap-3 ${textSecondary}`} itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <div className="h-9 w-9 rounded-lg flex items-center justify-center bg-amber-500/15 border border-amber-400/30">
                    <MapPin className={textAccent} size={16} />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Based in</div>
                    <span itemProp="addressLocality">Benguerir</span>, <span itemProp="addressCountry">Morocco</span>
                  </div>
                </div>
                <div className={`flex items-center gap-3 ${textSecondary}`}>
                  <div className="h-9 w-9 rounded-lg flex items-center justify-center bg-amber-500/15 border border-amber-400/30">
                    <Zap className={textAccent} size={16} />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Availability</div>
                    Consulting, collaboration & opportunities
                  </div>
                </div>
              </div>
              <meta itemProp="url" content="https://0xpacman.github.io/Portfolio" />
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group/img">
                <div className="absolute inset-0 blur-3xl bg-amber-500/30 rounded-full transition-transform duration-700 group-hover/img:scale-110" />
                <div className="relative w-52 h-52 md:w-60 md:h-60 rounded-2xl border-4 border-amber-400/40 shadow-2xl overflow-hidden transition-transform duration-500 group-hover/img:scale-[1.03] group-hover/img:shadow-amber-500/40">
                  <Image
                    src="/media/PDP.jpg"
                    alt="Ahmed Jadani"
                    fill
                    sizes="(max-width: 768px) 208px, 240px"
                    className="object-cover"
                    itemProp="image"
                  />
                </div>
                {/* Floating tag */}
                <div className="absolute -bottom-3 -right-3 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 px-3 py-1.5 text-xs font-bold text-black shadow-lg">
                  0xPacman
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Journey card ── */}
      <Card className={`${shell} backdrop-blur-xl shadow-xl`}> 
        <CardContent className="p-7 lg:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-500/15 border border-amber-400/30 flex items-center justify-center">
              <Building2 className={textAccent} size={18} />
            </div>
            <div>
              <h3 className={`text-xl font-semibold ${textPrimary}`}>Atlas Cloud Services Journey</h3>
              <p className={`text-sm ${textSecondary}`}>Architecting enterprise-grade platforms for Morocco&apos;s leading data center and public cloud provider.</p>
            </div>
          </div>
          <p className={`${textSecondary} leading-relaxed`}>
            As a Cloud Infrastructure Engineer at <span className={textAccent} itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
              <span itemProp="name">Atlas Cloud Services</span>
              <meta itemProp="url" content="https://0xpacman.com" />
            </span>, I design and operate resilient cloud stacks serving nationwide enterprise workloads.
          </p>
          <p className={`${textSecondary} leading-relaxed`}>
            My focus spans private cloud architecture, public cloud solutions, and hybrid designs that balance governance, performance, and cost efficiency.
          </p>
        </CardContent>
      </Card>

      {/* ── Stats with animated counters ── */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ value, label, sub, icon: Icon }) => {
          const counter = useCountUp(value)
          return (
            <Card key={label} className={`${shell} backdrop-blur-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-amber-500/30 hover:border-amber-400/50`}>
              <CardContent className="p-5 space-y-1" ref={counter.ref}>
                <div className="flex items-center justify-between">
                  <div className={`text-3xl font-bold tabular-nums ${textPrimary}`}>{counter.display}</div>
                  <div className="h-10 w-10 rounded-lg bg-amber-500/15 border border-amber-400/30 flex items-center justify-center">
                    <Icon className={textAccent} size={18} />
                  </div>
                </div>
                <div className={`text-sm font-medium ${textPrimary}`}>{label}</div>
                <div className={`text-xs ${textSecondary}`}>{sub}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* ── Focus Areas grid (was unused before) ── */}
      <Card className={`${shell} backdrop-blur-xl shadow-xl`}>
        <CardContent className="p-7 lg:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-10 w-10 rounded-lg bg-amber-500/15 border border-amber-400/30 flex items-center justify-center">
              <Zap className={textAccent} size={18} />
            </div>
            <div>
              <h3 className={`text-xl font-semibold ${textPrimary}`}>Focus Areas</h3>
              <p className={`text-sm ${textSecondary}`}>Core competencies and areas of expertise.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {focus.map(({ label, icon: FocusIcon }) => (
              <div
                key={label}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  isDarkMode
                    ? "bg-yellow-500/5 hover:bg-yellow-500/10 border border-yellow-500/10 hover:border-yellow-500/25"
                    : "bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/20 hover:border-yellow-400/40"
                }`}
              >
                <FocusIcon className={`${textAccent} flex-shrink-0`} size={16} />
                <span className={`text-sm font-medium ${textPrimary}`}>{label}</span>
                <ChevronRight className={`${textSecondary} ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity`} size={14} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div style={{ display: 'none' }}>
        <meta itemProp="sameAs" content="https://github.com/0xPacman" />
        <meta itemProp="sameAs" content="https://linkedin.com/in/0xpacman" />
        <meta itemProp="knowsAbout" content="Cloud Infrastructure" />
        <meta itemProp="knowsAbout" content="VMware" />
        <meta itemProp="knowsAbout" content="OpenStack" />
        <meta itemProp="knowsAbout" content="Network Security" />
        <meta itemProp="knowsAbout" content="System Administration" />
        <meta itemProp="knowsAbout" content="DevOps" />
        <meta itemProp="knowsAbout" content="Web Development" />
      </div>
    </section>
  )
}
