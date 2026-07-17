'use client'

import React from "react"
import Link from "next/link"
import { Github, Linkedin, Mail, Phone, Building2, Copy, Check } from "lucide-react"
import { SectionPrompt } from "@/components/shell/SectionPrompt"

interface Channel {
  key: string
  label: string
  value: string
  href?: string
  copy?: string
  icon: React.ElementType
  itemProp?: string
  contactType?: string
}

const channels: Channel[] = [
  { key: "work", label: "work", value: "ahmed.jadani@0xpacman.com", href: "mailto:ahmed.jadani@0xpacman.com", copy: "ahmed.jadani@0xpacman.com", icon: Mail, itemProp: "email", contactType: "work" },
  { key: "personal", label: "personal", value: "ahmed4star@gmail.com", href: "mailto:ahmed4star@gmail.com", copy: "ahmed4star@gmail.com", icon: Mail, itemProp: "email", contactType: "personal" },
  { key: "phone", label: "phone", value: "+212 708 429 995", href: "tel:+212708429995", copy: "+212708429995", icon: Phone, itemProp: "telephone", contactType: "telephone" },
  { key: "github", label: "github", value: "github.com/0xPacman", href: "https://github.com/0xPacman", icon: Github },
  { key: "linkedin", label: "linkedin", value: "linkedin.com/in/0xpacman", href: "https://linkedin.com/in/0xpacman", icon: Linkedin },
  { key: "org", label: "org", value: "Atlas Cloud Services · Benguerir, Morocco", icon: Building2 },
]

export function Contact() {
  const [copied, setCopied] = React.useState<string | null>(null)
  const copy = (val: string) => {
    navigator?.clipboard?.writeText(val).then(() => {
      setCopied(val)
      setTimeout(() => setCopied(null), 1600)
    }).catch(() => {})
  }

  return (
    <section className="space-y-5" itemScope itemType="https://schema.org/ContactPage">
      <meta itemProp="name" content="Contact Ahmed Jadani" />
      <SectionPrompt command="ssh root@0xpacman.com">
        Open to cloud &amp; infrastructure consulting, security collaboration, or simply a hello.
      </SectionPrompt>

      {/* MOTD banner */}
      <div className="border border-primary/15 bg-black/40 p-4 font-mono text-[12px] space-y-1">
        <div className="text-term-green">Last login: today from 0xpacman.com</div>
        <div className="text-muted-foreground">
          <span className="text-primary">*</span> Available for consulting &amp; collaboration
        </div>
        <div className="text-muted-foreground">
          <span className="text-primary">*</span> Timezone: GMT+1 (Africa/Casablanca) · 09:00–18:00
        </div>
      </div>

      {/* Channels as key-value rows */}
      <div className="border border-primary/15 divide-y divide-primary/10 bg-black/30 font-mono">
        {channels.map((ch) => {
          const Icon = ch.icon
          const isExternal = ch.href?.startsWith("http")
          const contentProps = ch.itemProp
            ? { itemProp: "contactPoint", itemScope: true, itemType: "https://schema.org/ContactPoint" as const }
            : {}
          return (
            <div key={ch.key} className="flex items-center gap-3 px-4 py-2.5" {...contentProps}>
              {ch.contactType && <meta itemProp="contactType" content={ch.contactType} />}
              <Icon size={14} className="text-primary/70 flex-shrink-0" />
              <span className="text-[11px] text-muted-foreground w-16 flex-shrink-0">{ch.label}</span>
              {ch.href ? (
                <Link
                  href={ch.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="text-[13px] text-foreground hover:text-primary transition-colors truncate"
                  {...(ch.itemProp ? { itemProp: ch.itemProp } : {})}
                >
                  {ch.value}
                </Link>
              ) : (
                <span className="text-[13px] text-foreground truncate">{ch.value}</span>
              )}
              {ch.copy && (
                <button
                  onClick={() => copy(ch.copy!)}
                  aria-label={`Copy ${ch.label}`}
                  className="ml-auto flex-shrink-0 text-muted-foreground hover:text-primary transition-colors"
                >
                  {copied === ch.copy ? <Check size={13} className="text-term-green" /> : <Copy size={13} />}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
