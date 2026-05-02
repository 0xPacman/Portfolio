"use client"

import React from "react"
import { About } from "@/components/sections/About"
import { Skills } from "@/components/sections/Skills"
import { Projects } from "@/components/sections/Projects"
import { Contact } from "@/components/sections/Contact"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users, Code, Star, Mail, Github, Linkedin,
  Sun, Moon, Phone, MapPin, Building2, Menu, X, Terminal
} from "lucide-react"
import Link from "next/link"

export default function Portfolio() {
  const [activeSection, setActiveSection] = React.useState("about")
  const [isDarkMode, setIsDarkMode] = React.useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  const aboutRef = React.useRef<HTMLDivElement>(null)
  const skillsRef = React.useRef<HTMLDivElement>(null)
  const projectsRef = React.useRef<HTMLDivElement>(null)
  const contactRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  React.useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (isSidebarOpen && window.innerWidth < 1024) {
        const sb = document.getElementById("sidebar")
        const btn = document.getElementById("sidebar-toggle")
        if (sb && btn && !sb.contains(e.target as Node) && !btn.contains(e.target as Node)) {
          setIsSidebarOpen(false)
        }
      }
    }
    document.addEventListener("mousedown", handleOutside)
    return () => document.removeEventListener("mousedown", handleOutside)
  }, [isSidebarOpen])

  const menuItems = [
    { id: "about",    label: "About",    icon: Users },
    { id: "skills",   label: "Skills",   icon: Code  },
    { id: "projects", label: "Projects", icon: Star  },
    { id: "contact",  label: "Contact",  icon: Mail  },
  ]

  const socials = [
    { href: "https://github.com/0xPacman",        icon: Github,  label: "GitHub"    },
    { href: "https://linkedin.com/in/0xpacman",   icon: Linkedin,label: "LinkedIn"  },
    { href: "https://wa.me/212708429995",          icon: Phone,   label: "WhatsApp"  },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case "about":    return <About    isDarkMode={isDarkMode} aboutRef={aboutRef}       />
      case "skills":   return <Skills   isDarkMode={isDarkMode} skillsRef={skillsRef}     />
      case "projects": return <Projects isDarkMode={isDarkMode} projectsRef={projectsRef} />
      case "contact":  return <Contact  isDarkMode={isDarkMode} contactRef={contactRef}   />
      default:         return <About    isDarkMode={isDarkMode} aboutRef={aboutRef}       />
    }
  }

  /* ── theme tokens ── */
  const D = isDarkMode

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${D ? "bg-[#080808]" : "bg-[#fafaf7]"}`}
      itemScope itemType="https://schema.org/WebPage"
    >
      {/* SEO structured data */}
      <div itemProp="mainEntity" itemScope itemType="https://schema.org/Person" style={{ display: "none" }}>
        <meta itemProp="name" content="Ahmed Jadani" />
        <meta itemProp="alternateName" content="Pacman" />
        <meta itemProp="jobTitle" content="Cloud Infrastructure Engineer" />
        <meta itemProp="description" content="Cloud Infrastructure Engineer specializing in enterprise-grade infrastructure, VMware technologies, and scalable cloud solutions." />
        <meta itemProp="url" content="https://0xpacman.github.io/Portfolio" />
        <meta itemProp="image" content="https://0xpacman.github.io/Portfolio/media/PDP.jpg" />
        <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <meta itemProp="addressLocality" content="Benguerir" />
          <meta itemProp="addressCountry" content="Morocco" />
        </div>
        <div itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
          <meta itemProp="name" content="Atlas Cloud Services" />
        </div>
        <meta itemProp="sameAs" content="https://github.com/0xPacman" />
        <meta itemProp="sameAs" content="https://linkedin.com/in/0xpacman" />
      </div>

      {/* Dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: D
            ? "radial-gradient(circle, rgba(234,179,8,0.045) 1px, transparent 1px)"
            : "radial-gradient(circle, rgba(180,130,0,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-64 -right-64 w-[560px] h-[560px] rounded-full blur-[140px] animate-float-1 ${D ? "bg-yellow-500/5" : "bg-yellow-400/10"}`} />
        <div className={`absolute -bottom-64 -left-64 w-[560px] h-[560px] rounded-full blur-[140px] animate-float-2 ${D ? "bg-amber-600/4" : "bg-amber-500/8"}`} />
      </div>

      {/* Mobile hamburger */}
      <button
        id="sidebar-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed top-4 left-4 z-50 lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border backdrop-blur-xl transition-all
          ${D ? "bg-black/80 border-yellow-500/20 text-yellow-500/70 hover:text-yellow-400 hover:border-yellow-500/40"
              : "bg-white/80 border-yellow-500/30 text-yellow-600/70 hover:text-yellow-700 hover:border-yellow-500/60"}`}
      >
        {isSidebarOpen ? <X size={15} /> : <Menu size={15} />}
      </button>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Layout */}
      <div className="flex h-screen">

        {/* ═══════════════ SIDEBAR ═══════════════ */}
        <aside
          id="sidebar"
          className={`
            fixed lg:static inset-y-0 left-0 z-40
            w-[268px] flex-shrink-0 flex flex-col
            backdrop-blur-2xl border-r
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            ${D ? "bg-black/75 border-yellow-500/12" : "bg-white/80 border-yellow-500/20"}
          `}
        >
          {/* Top shimmer line */}
          <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${D ? "via-yellow-500/50" : "via-yellow-400/60"} to-transparent`} />

          {/* ── Profile ── */}
          <div className="p-5 pb-4">
            {/* Terminal prompt */}
            <div className={`font-mono text-[10px] flex items-center gap-1.5 mb-4 ${D ? "text-yellow-500/35" : "text-yellow-600/45"}`}>
              <Terminal size={9} />
              <span>root@0xpacman:~$</span>
              <span className={`inline-block w-[6px] h-[11px] ml-0.5 animate-blink ${D ? "bg-yellow-500/50" : "bg-yellow-600/50"}`} />
            </div>

            {/* Avatar + theme toggle */}
            <div className="flex items-start justify-between mb-4">
              <div className="relative">
                <div className={`absolute inset-0 blur-2xl scale-150 rounded-full ${D ? "bg-yellow-500/20" : "bg-yellow-400/30"}`} />
                <Avatar className={`w-[62px] h-[62px] relative ring-2 ring-offset-2 ${D ? "ring-yellow-500/35 ring-offset-black" : "ring-yellow-500/40 ring-offset-white"}`}>
                  <AvatarImage src="/media/PDP.jpg" alt="Ahmed Jadani" />
                  <AvatarFallback className="bg-yellow-500 text-black font-bold font-mono text-lg">AJ</AvatarFallback>
                </Avatar>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
              </div>

              <button
                onClick={() => setIsDarkMode(!D)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all
                  ${D ? "border-yellow-500/12 text-yellow-500/50 hover:text-yellow-400 hover:border-yellow-500/30 hover:bg-yellow-500/5"
                      : "border-yellow-500/20 text-yellow-600/60 hover:text-yellow-700 hover:border-yellow-500/40 hover:bg-yellow-50"}`}
              >
                {D ? <Sun size={13} /> : <Moon size={13} />}
              </button>
            </div>

            {/* Identity */}
            <div className="space-y-0.5 mb-3">
              <h1 className={`text-[17px] font-bold leading-snug ${D ? "text-white" : "text-gray-900"}`}>Ahmed Jadani</h1>
              <div className="font-mono text-[13px] font-semibold tracking-wide text-yellow-500">0xPacman</div>
              <p className={`text-[11px] ${D ? "text-gray-400" : "text-gray-500"}`}>Cloud Infrastructure Engineer</p>
            </div>

            {/* Meta */}
            <div className={`space-y-1.5 text-[11px] ${D ? "text-gray-600" : "text-gray-400"}`}>
              <div className="flex items-center gap-2">
                <Building2 size={10} className="flex-shrink-0" />
                <span>Atlas Cloud Services</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={10} className="flex-shrink-0" />
                <span>Benguerir, Morocco</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-1.5 mt-3.5">
              {socials.map(({ href, icon: Icon, label }) => (
                <Link key={href} href={href} target="_blank" rel="noopener noreferrer" title={label}>
                  <span className={`w-7 h-7 flex items-center justify-center rounded-md border transition-all
                    ${D ? "border-yellow-500/10 text-gray-600 hover:border-yellow-500/30 hover:text-yellow-400 hover:bg-yellow-500/5"
                        : "border-yellow-500/15 text-gray-400 hover:border-yellow-500/40 hover:text-yellow-700 hover:bg-yellow-50"}`}>
                    <Icon size={12} />
                  </span>
                </Link>
              ))}
            </div>

            {/* Stats row */}
            <div className={`grid grid-cols-2 gap-2 mt-4 pt-4 border-t ${D ? "border-yellow-500/8" : "border-yellow-500/15"}`}>
              {[{ v: "3+", l: "Years Exp" }, { v: "20+", l: "Technologies" }].map(({ v, l }) => (
                <div key={l} className={`rounded-lg p-2.5 text-center border ${D ? "bg-yellow-500/4 border-yellow-500/10" : "bg-yellow-50 border-yellow-500/20"}`}>
                  <div className="text-[15px] font-bold font-mono text-yellow-500">{v}</div>
                  <div className={`text-[9px] mt-0.5 ${D ? "text-gray-500" : "text-gray-400"}`}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Navigation ── */}
          <nav className="flex-1 px-4 pb-4 flex flex-col">
            <div className={`text-[9px] font-mono uppercase tracking-[0.15em] mb-2 px-2 ${D ? "text-gray-700" : "text-gray-400"}`}>
              Navigate
            </div>
            <div className="space-y-0.5">
              {menuItems.map(({ id, label, icon: Icon }, i) => {
                const active = activeSection === id
                return (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveSection(id)
                      if (window.innerWidth < 1024) setIsSidebarOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 relative group ${
                      active
                        ? D
                          ? "bg-yellow-500/10 text-yellow-400"
                          : "bg-yellow-500/12 text-yellow-700"
                        : D
                          ? "text-gray-500 hover:text-gray-200 hover:bg-white/[0.03]"
                          : "text-gray-400 hover:text-gray-700 hover:bg-yellow-50/60"
                    }`}
                  >
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-r-full transition-all duration-200 ${active ? "h-5 bg-yellow-500" : "h-0"}`} />
                    <span className={`font-mono text-[10px] w-5 flex-shrink-0 tabular-nums ${active ? "text-yellow-500/60" : D ? "text-gray-700" : "text-gray-300"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon size={13} className="flex-shrink-0" />
                    <span className="text-[13px] font-medium">{label}</span>
                  </button>
                )
              })}
            </div>

            {/* Available badge */}
            <div className={`mt-auto pt-4`}>
              <div className={`p-3 rounded-xl border ${D ? "border-yellow-500/10 bg-yellow-500/3" : "border-yellow-500/20 bg-yellow-50/70"}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                  </span>
                  <span className={`text-[11px] font-medium ${D ? "text-gray-300" : "text-gray-700"}`}>Available for consulting</span>
                </div>
                <p className={`text-[10px] leading-relaxed ${D ? "text-gray-600" : "text-gray-400"}`}>
                  Open to cloud & infra consulting, collaborations
                </p>
              </div>
            </div>
          </nav>

          {/* Bottom shimmer */}
          <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${D ? "via-yellow-500/25" : "via-yellow-400/35"} to-transparent`} />
        </aside>

        {/* ═══════════════ MAIN CONTENT ═══════════════ */}
        <main className="flex-1 overflow-auto">
          <div className="min-h-full p-3 sm:p-5 lg:p-6 pt-16 lg:pt-6">
            <div className={`min-h-full rounded-2xl border ${D ? "bg-black/25 border-yellow-500/6" : "bg-white/40 border-yellow-500/12"} backdrop-blur-xl`}>
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                  {renderContent()}
                </div>
              </div>
            </div>
          </div>
        </main>

      </div>
    </div>
  )
}
