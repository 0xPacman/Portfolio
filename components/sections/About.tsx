'use client'

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Phone, MapPin, Building2, Activity } from "lucide-react"
import { SectionPrompt } from "@/components/shell/SectionPrompt"
import { useCountUp } from "@/hooks/use-count-up"

interface StatDef { value: string; label: string; sub: string }

const stats: StatDef[] = [
  { value: "3+", label: "years pro", sub: "+5y overall IT" },
  { value: "100+", label: "enterprise clients", sub: "across Morocco" },
  { value: "99.9%", label: "uptime SLA", sub: "architected & run" },
  { value: "20+", label: "certifications", sub: "cloud & virt" },
]

const socials = [
  { href: "https://github.com/0xPacman", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/0xpacman", icon: Linkedin, label: "LinkedIn" },
  { href: "https://wa.me/212708429995", icon: Phone, label: "WhatsApp" },
]

function StatCell({ value, label, sub }: StatDef) {
  const display = useCountUp(value)
  return (
    <div className="flex-1 min-w-[7rem] px-4 py-3">
      <div className="text-2xl font-bold font-mono tabular-nums text-primary">{display}</div>
      <div className="text-[12px] text-foreground mt-0.5">{label}</div>
      <div className="text-[10px] text-muted-foreground font-mono">{sub}</div>
    </div>
  )
}

export function About() {
  return (
    <section className="space-y-6" itemScope itemType="https://schema.org/Person">
      <SectionPrompt command="cat about.md" />

      {/* Identity */}
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex-shrink-0 border border-primary/25 overflow-hidden">
          <Image
            src="/media/PDP.jpg"
            alt="Ahmed Jadani"
            fill
            sizes="144px"
            className="object-cover"
            itemProp="image"
            priority
          />
          <span className="absolute bottom-0 left-0 right-0 bg-black/80 text-primary text-[10px] font-mono text-center py-0.5 border-t border-primary/25">
            0xPacman
          </span>
        </div>

        <div className="space-y-2 min-w-0">
          <h1 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight" itemProp="name">
            Ahmed Jadani
          </h1>
          <meta itemProp="alternateName" content="0xPacman" />
          <div className="font-mono text-sm text-primary" itemProp="jobTitle">
            Cloud Infrastructure Engineer
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-muted-foreground font-mono pt-1">
            <span className="flex items-center gap-1.5">
              <Building2 size={12} className="text-primary/70" /> Atlas Cloud Services
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-primary/70" /> Benguerir, Morocco
            </span>
          </div>
          <div className="flex gap-2 pt-2">
            {socials.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 flex items-center justify-center border border-primary/20 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                <Icon size={14} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* whoami prose */}
      <div className="space-y-3 font-sans text-[15px] leading-relaxed text-foreground/80 max-w-2xl" itemProp="description">
        <p>
          I design and operate resilient cloud stacks at{" "}
          <span className="text-primary font-medium" itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
            <span itemProp="name">Atlas Cloud Services</span>
          </span>
          , Morocco&apos;s leading data center, private cloud architecture, VMware &amp; VxRail, OpenStack, and
          enterprise automation serving 100+ nationwide workloads.
        </p>
        <p>
          I care about pragmatic automation and{" "}
          <span className="text-primary font-medium">reliability engineering</span>, turning manual, repetitive
          processes into repeatable systems, and building the observability and backup discipline that keeps
          infrastructure running at scale.
        </p>
      </div>

      {/* system monitor strip */}
      <div className="border border-primary/15 bg-black/40">
        <div className="flex items-center gap-2 px-4 py-1.5 border-b border-primary/10 text-[11px] font-mono text-muted-foreground">
          <Activity size={11} className="text-primary/60" aria-hidden="true" />
          <span>~/stats, system monitor</span>
        </div>
        <div className="flex flex-wrap divide-x divide-primary/10">
          {stats.map((s) => (
            <StatCell key={s.label} {...s} />
          ))}
        </div>
      </div>

      <div style={{ display: "none" }}>
        <meta itemProp="url" content="https://0xpacman.com" />
        <meta itemProp="sameAs" content="https://github.com/0xPacman" />
        <meta itemProp="sameAs" content="https://linkedin.com/in/0xpacman" />
        <meta itemProp="knowsAbout" content="Cloud Infrastructure" />
        <meta itemProp="knowsAbout" content="VMware" />
        <meta itemProp="knowsAbout" content="OpenStack" />
        <meta itemProp="knowsAbout" content="DevOps" />
      </div>
    </section>
  )
}
