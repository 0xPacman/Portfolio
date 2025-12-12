'use client'

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, MapPin, Zap, Star, Users, TrendingUp } from "lucide-react"
import Image from "next/image"

interface AboutProps {
  isDarkMode: boolean
  aboutRef: React.RefObject<HTMLDivElement>
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
    "Private & public cloud architecture",
    "Hybrid designs for regulated orgs",
    "Infrastructure as Code & automation",
    "Observability and SRE practices",
    "Network security & segmentation",
    "Resilience, DR, and continuity"
  ]

  return (
    <section
      ref={aboutRef}
      className="space-y-8"
      itemScope
      itemType="https://schema.org/Person"
    >
      <Card className={`${shell} backdrop-blur-xl shadow-2xl overflow-hidden`}>
        <div className={`absolute inset-0 pointer-events-none bg-gradient-to-br ${gradientStroke}`} />
        <CardContent className="relative p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-amber-500/15 border border-amber-400/30 text-amber-600 dark:text-amber-200">
                <Building2 size={14} />
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
                    Available for consulting, collaboration, and new opportunities
                  </div>
                </div>
              </div>
              <meta itemProp="url" content="https://0xpacman.github.io/Portfolio" />
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 blur-3xl bg-amber-500/30 rounded-full" />
                <div className="relative w-52 h-52 md:w-60 md:h-60 rounded-2xl border-4 border-amber-400/40 shadow-2xl overflow-hidden">
                  <Image
                    src="/media/PDP.jpg"
                    alt="Ahmed Jadani"
                    fill
                    sizes="(max-width: 768px) 208px, 240px"
                    className="object-cover"
                    itemProp="image"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ value, label, sub, icon: Icon }) => (
          <Card key={label} className={`${shell} backdrop-blur-xl shadow-lg transition hover:-translate-y-0.5 hover:shadow-amber-500/30`}>
            <CardContent className="p-5 space-y-1">
              <div className="flex items-center justify-between">
                <div className={`text-3xl font-bold ${textPrimary}`}>{value}</div>
                <div className="h-10 w-10 rounded-lg bg-amber-500/15 border border-amber-400/30 flex items-center justify-center">
                  <Icon className={textAccent} size={18} />
                </div>
              </div>
              <div className={`text-sm font-medium ${textPrimary}`}>{label}</div>
              <div className={`text-xs ${textSecondary}`}>{sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

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
