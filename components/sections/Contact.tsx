'use client'

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail, Phone, Building2, Rocket } from "lucide-react"
import Link from "next/link"

interface ContactProps {
  isDarkMode: boolean
  contactRef: React.RefObject<HTMLDivElement>
}

export const Contact: React.FC<ContactProps> = ({ isDarkMode, contactRef }: ContactProps) => {
  const cardClasses = isDarkMode
    ? "bg-black/40 backdrop-blur-md border-yellow-500/30"
    : "bg-white/60 backdrop-blur-md border-yellow-400/40"
  const textPrimary = "text-foreground"
  const textSecondary = "text-muted-foreground"
  const textAccent = "text-amber-500 dark:text-amber-400"

  const [copied, setCopied] = React.useState<string | null>(null)
  const copy = (val: string) => {
    navigator?.clipboard?.writeText(val).then(() => {
      setCopied(val)
      setTimeout(() => setCopied(null), 1800)
    }).catch(() => {})
  }

  return (
    <div 
      ref={contactRef}
      className="space-y-8 max-w-5xl mx-auto"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      <meta itemProp="name" content="Contact Ahmed Jadani" />
      <meta itemProp="description" content="Get in touch with Ahmed Jadani for cloud consulting, infrastructure projects, or professional collaboration opportunities" />
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-amber-500/10 via-transparent to-yellow-400/10 blur-2xl" />
        <div className="text-center mb-12 px-2">
          <h2 className={`text-3xl font-bold ${textPrimary} mb-4 bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent`}>Let&apos;s Connect</h2>
          <p className={`${textSecondary} max-w-2xl mx-auto text-sm`}>Open to cloud & infrastructure discussions, low‑key opportunities, collaboration, or simply a personal hello — professional or personal, your message is welcome.</p>
        </div>
        <div className="flex justify-center">
          <Card className={`${cardClasses} shadow-xl hover:shadow-2xl transition-all duration-300 w-full max-w-4xl`}>
            <CardContent className="p-6 lg:p-8 space-y-8">
              <div>
                <h3 className={`text-xl font-semibold ${textPrimary} mb-2 flex items-center gap-2`}>
                  <Rocket className={` ${textAccent}`} size={22} />
                  Build Something Impactful
                </h3>
                <p className={`${textSecondary} text-sm leading-relaxed max-w-2xl`}>Focused on resilient architectures, efficient virtualization and pragmatic automation. Feel free to reach out for guidance, collaboration, discreet opportunity conversations, or informal networking.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Professional Email */}
                <div className={`group flex items-start gap-4 p-4 rounded-lg relative overflow-hidden ${isDarkMode ? 'bg-yellow-500/10' : 'bg-yellow-400/20'} transition-all duration-300`}
                  itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
                  <meta itemProp="contactType" content="work" />
                  <div className="p-2 rounded-md bg-gradient-to-br from-amber-500 to-yellow-500 text-black">
                    <Mail size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`${textPrimary} font-medium text-sm truncate`} itemProp="email">ahmed.jadani@atlascs.ma</span>
                      <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30">Professional</span>
                      {copied === 'ahmed.jadani@atlascs.ma' && <span className="flex items-center gap-1 text-[10px] text-green-500">✓ Copied</span>}
                    </div>
                    <div className={`${textSecondary} text-[11px]`}>Primary work correspondence</div>
                  </div>
                  <button aria-label="Copy work email" onClick={() => copy('ahmed.jadani@atlascs.ma')} className="ml-auto p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition text-amber-500">
                    {copied === 'ahmed.jadani@atlascs.ma' ? <span className="text-green-500 text-xs font-semibold">✓</span> : <Mail size={14}/>}
                  </button>
                </div>
                {/* Personal Email */}
                <div className={`group flex items-start gap-4 p-4 rounded-lg relative overflow-hidden ${isDarkMode ? 'bg-yellow-500/10' : 'bg-yellow-400/20'} transition-all duration-300`}
                  itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
                  <meta itemProp="contactType" content="personal" />
                  <div className="p-2 rounded-md bg-gradient-to-br from-amber-500 to-yellow-500 text-black">
                    <Mail size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`${textPrimary} font-medium text-sm truncate`} itemProp="email">ahmed4star@gmail.com</span>
                      <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30">Personal</span>
                      {copied === 'ahmed4star@gmail.com' && <span className="flex items-center gap-1 text-[10px] text-green-500">✓ Copied</span>}
                    </div>
                    <div className={`${textSecondary} text-[11px]`}>Direct personal contact</div>
                  </div>
                  <button aria-label="Copy personal email" onClick={() => copy('ahmed4star@gmail.com')} className="ml-auto p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition text-amber-500">
                    {copied === 'ahmed4star@gmail.com' ? <span className="text-green-500 text-xs font-semibold">✓</span> : <Mail size={14}/>}
                  </button>
                </div>
                {/* Phone */}
                <div className={`group flex items-start gap-4 p-4 rounded-lg ${isDarkMode ? 'bg-yellow-500/10' : 'bg-yellow-400/20'} transition-all duration-300`}
                  itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
                  <meta itemProp="contactType" content="telephone" />
                  <div className="p-2 rounded-md bg-gradient-to-br from-amber-500 to-yellow-500 text-black">
                    <Phone size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`${textPrimary} font-medium text-sm`} itemProp="telephone">+212 708 429 995</span>
                      {copied === '+212 708 429 995' && <span className="flex items-center gap-1 text-[10px] text-green-500">✓ Copied</span>}
                    </div>
                    <div className={`${textSecondary} text-[11px]`}>GMT+1 • 09:00 – 18:00</div>
                  </div>
                  <button aria-label="Copy phone" onClick={() => copy('+212 708 429 995')} className="ml-auto p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition text-amber-500">
                    {copied === '+212 708 429 995' ? <span className="text-green-500 text-xs font-semibold">✓</span> : <Phone size={14}/>}
                  </button>
                </div>
                {/* Company */}
                <div className={`group flex items-start gap-4 p-4 rounded-lg ${isDarkMode ? 'bg-yellow-500/10' : 'bg-yellow-400/20'} transition-all duration-300`}
                  itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <div className="p-2 rounded-md bg-gradient-to-br from-amber-500 to-yellow-500 text-black">
                    <Building2 size={18} />
                  </div>
                  <div className="flex-1">
                    <div className={`${textPrimary} font-medium text-sm`} itemProp="name">Atlas Cloud Services</div>
                    <div className={`${textSecondary} text-[11px]`}>
                      <span itemProp="addressLocality">Benguerir</span>, <span itemProp="addressCountry">Morocco</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="https://github.com/0xPacman" className="group inline-flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium border border-amber-500/30 hover:border-amber-500/60 transition bg-amber-500/10 hover:bg-amber-500/20">
                  <Github size={14} className="text-amber-500" /> GitHub
                </Link>
                <Link href="https://linkedin.com/in/0xpacman" className="group inline-flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium border border-amber-500/30 hover:border-amber-500/60 transition bg-amber-500/10 hover:bg-amber-500/20">
                  <Linkedin size={14} className="text-amber-500" /> LinkedIn
                </Link>
                
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
