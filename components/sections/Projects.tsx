'use client'

import React from "react"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ExternalLink, Github, Mail, ChevronRight, Lock } from "lucide-react"
import { SectionPrompt } from "@/components/shell/SectionPrompt"

interface ProjectLink {
  demo?: string | null
  visit?: string | null
  github?: string | null
  visitLabel?: string
  contactEmail?: string | null
}

interface Project {
  title: string
  slug: string
  description: string
  category: string
  tech: string[]
  links: ProjectLink
  features: string[]
  status: string
}

const projects: Project[] = [
  {
    title: "Brainful", slug: "brainful", category: "Web", status: "live",
    description: "A soothing single-page mental wellness dashboard with breathing guidance, mood reflection, zen doodling, and focus tools, all running entirely in the browser.",
    tech: ["React", "Tailwind", "Framer Motion", "Web Audio"],
    links: { demo: "https://brainful.0xpacman.com", github: null },
    features: ["4-7-8 breathing guide", "Mood journaling", "Zen doodling canvas", "Ambient radio"],
  },
  {
    title: "sudo ku", slug: "sudo-ku", category: "Web", status: "open-source",
    description: "Terminal-styled animated Sudoku in pure vanilla JS, zero build, zero dependencies. Phosphor amber on black with CRT scanlines, a unique-solution puzzle generator, and spring-eased motion throughout.",
    tech: ["Vanilla JS", "CSS Animation", "Canvas", "Zero Build"],
    links: { github: "https://github.com/0xPacman/Sudoku" },
    features: ["Unique-solution generator", "4 difficulties", "Pencil notes & hints", "CRT terminal design"],
  },
  {
    title: "Paste", slug: "paste", category: "Web", status: "live",
    description: "Simple and secure pastebin for sharing code snippets and text. Clean interface with syntax highlighting and expiration options for privacy.",
    tech: ["Web", "Pastebin", "Privacy"],
    links: { demo: "https://paste.0xpacman.com", github: "https://github.com/0xPacman/Paste" },
    features: ["Syntax highlighting", "Privacy focused", "Secure sharing"],
  },
  {
    title: "ColorGuesser", slug: "colorguesser", category: "Web", status: "live",
    description: "Interactive color guessing game that challenges players to identify colors. Multiplayer scoring and a sleek modern interface.",
    tech: ["JavaScript", "CSS3", "Game Logic"],
    links: { demo: "https://colorguesser.0xpacman.com", github: "https://github.com/0xPacman/ColorGuesser" },
    features: ["Multiplayer", "Score tracking", "Color theory"],
  },
  {
    title: "Draw", slug: "draw", category: "Web", status: "open-source",
    description: "Collaborative online whiteboard forked from Excalidraw, an open-source project for sharing ideas, sketching diagrams, and building together.",
    tech: ["Excalidraw", "Collaboration", "Whiteboard", "Open Source"],
    links: { demo: "https://draw.0xpacman.com/", github: "https://github.com/0xPacman/excalidraw" },
    features: ["Forked from Excalidraw", "Collaborative drawing", "Open source", "Visual brainstorming"],
  },
  {
    title: "PasswordGEN", slug: "passwordgen", category: "Tools", status: "live",
    description: "Password generator with both a web interface and CLI tool for maximum security and strong entropy.",
    tech: ["Bash", "Web", "CLI", "Crypto"],
    links: { demo: "https://password.0xpacman.com", github: "https://github.com/0xPacman/PasswordGEN" },
    features: ["Strong entropy", "Multi-platform", "Open source"],
  },
  {
    title: "AD Manager", slug: "ad-manager", category: "Enterprise", status: "commercial",
    description: "Professional Active Directory management desktop app built in C++ with a modern UI for Windows environments. User, group, and resource administration with automation.",
    tech: ["C++", "Windows", "Active Directory"],
    links: { visit: "https://ad.0xpacman.com", visitLabel: "Purchase, $39.99" },
    features: ["Bulk user/group ops", "AD automation", "Real-time monitoring", "Enterprise security"],
  },
  {
    title: "Atlas Cloud Infrastructure", slug: "atlas-infra", category: "Enterprise", status: "production",
    description: "Lead modernization for Morocco's premier cloud platform as single point of contact, orchestrating VMware, Dell VxRail, and multi-cloud operations for 100+ enterprises.",
    tech: ["VMware", "Dell VxRail", "NSX", "vSphere"],
    links: { contactEmail: "ahmed.jadani@0xpacman.com" },
    features: ["Modernization lead", "Single point of contact", "Multi-cloud strategy", "99.9% uptime"],
  },
  {
    title: "ServerInfoReport", slug: "serverinforeport", category: "Tools", status: "open-source",
    description: "Comprehensive server monitoring shell script, CPU, memory, storage analysis, and network configuration with cross-platform support and colorized output.",
    tech: ["Shell", "Bash", "Monitoring"],
    links: { github: "https://github.com/0xPacman/ServerInfoReport" },
    features: ["Real-time monitoring", "Cross-platform", "System analysis"],
  },
  {
    title: "GatewayPage", slug: "gatewaypage", category: "Web", status: "live",
    description: "Modern web dashboard as a personalized homepage, real-time weather, Hacker News feed, Reddit browser, and persistent notes with theme support.",
    tech: ["HTML5", "CSS3", "JavaScript", "APIs"],
    links: { demo: "https://0xpacman.github.io/GatewayPage/", github: "https://github.com/0xPacman/GatewayPage" },
    features: ["Real-time data", "Theme toggle", "API integration"],
  },
  {
    title: "OpenStack Cloud Platform", slug: "openstack", category: "Enterprise", status: "enterprise",
    description: "Deployed, configured, and automated an enterprise OpenStack cloud with multi-node architecture, IaaS with automated provisioning and monitoring.",
    tech: ["OpenStack", "Python", "Ansible"],
    links: {},
    features: ["Multi-node", "Automated provisioning", "IaaS services"],
  },
  {
    title: "Network Security Stack", slug: "netsec", category: "Enterprise", status: "enterprise",
    description: "Comprehensive network security with VMware NSX, micro-segmentation, distributed firewall policies, and automated threat response for enterprise environments.",
    tech: ["VMware NSX", "Zero Trust", "Micro-segmentation"],
    links: {},
    features: ["Zero trust", "Micro-segmentation", "Automated response"],
  },
  {
    title: "Portfolio", slug: "portfolio", category: "Web", status: "live",
    description: "This site, a terminal-aesthetic portfolio built with Next.js 15, TypeScript, and Framer Motion. Frontier terminal design with a tmux-style interface.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind"],
    links: { demo: "https://0xpacman.com", github: "https://github.com/0xPacman/Portfolio" },
    features: ["tmux interface", "Boot sequence", "Dark terminal", "Static export"],
  },
]

const categories = ["All", "Web", "Enterprise", "Tools"] as const
type Category = (typeof categories)[number]

const statusStyle: Record<string, string> = {
  live: "text-term-green",
  production: "text-primary",
  enterprise: "text-primary/80",
  commercial: "text-primary",
  "open-source": "text-term-green",
}

export function Projects() {
  const reduced = useReducedMotion()
  const [activeCategory, setActiveCategory] = React.useState<Category>("All")
  const [expanded, setExpanded] = React.useState<string | null>(null)
  const [copied, setCopied] = React.useState<string | null>(null)

  const copy = (email: string) => {
    navigator?.clipboard?.writeText(email).then(() => {
      setCopied(email)
      setTimeout(() => setCopied(null), 1600)
    }).catch(() => {})
  }

  const filtered = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory)

  return (
    <section className="space-y-5" itemScope itemType="https://schema.org/ItemList">
      <meta itemProp="name" content="Ahmed Jadani's Projects" />
      <SectionPrompt command="ls -la ~/projects">
        Apps, security tools, and enterprise infrastructure.
      </SectionPrompt>

      {/* category filter */}
      <div className="flex flex-wrap gap-2 font-mono text-[12px]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setExpanded(null) }}
            className={`px-2.5 py-1 border transition-colors ${
              activeCategory === cat
                ? "border-primary/50 bg-primary/10 text-primary"
                : "border-primary/15 text-muted-foreground hover:text-foreground hover:border-primary/30"
            }`}
          >
            {cat === "All" ? "--all" : cat.toLowerCase()}
          </button>
        ))}
        <span className="px-2 py-1 text-muted-foreground/60">
          {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {/* directory listing */}
      <div className="border border-primary/15 divide-y divide-primary/10 bg-card">
        {filtered.map((project) => {
          const isOpen = expanded === project.slug
          const hasLinks = project.links.demo || project.links.github || project.links.visit || project.links.contactEmail
          return (
            <div
              key={project.slug}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/SoftwareApplication"
              className={`transition-colors ${isOpen ? "bg-primary/[0.03]" : ""}`}
              style={{ borderLeft: isOpen ? "2px solid hsl(var(--primary))" : "2px solid transparent" }}
            >
              <meta itemProp="name" content={project.title} />
              <meta itemProp="description" content={project.description} />
              {project.links.demo && <meta itemProp="url" content={project.links.demo} />}
              {project.links.github && <meta itemProp="codeRepository" content={project.links.github} />}

              <button
                onClick={() => setExpanded(isOpen ? null : project.slug)}
                aria-expanded={isOpen}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-primary/[0.03] transition-colors font-mono"
              >
                <ChevronRight size={12} className={`text-primary/60 flex-shrink-0 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                <span className={`text-[11px] w-24 flex-shrink-0 ${statusStyle[project.status] ?? "text-muted-foreground"}`}>
                  [{project.status}]
                </span>
                <span className="text-[13px] text-foreground truncate flex-1">{project.title}</span>
                <span className="hidden sm:inline text-[11px] text-muted-foreground/70">{project.category.toLowerCase()}/</span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={reduced ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduced ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-1 pl-9 space-y-3">
                      <p className="text-[13px] font-sans leading-relaxed text-foreground/75 max-w-2xl">
                        {project.description}
                      </p>

                      <div className="font-mono text-[11px] text-muted-foreground">
                        <span className="text-primary/60"># stack: </span>
                        {project.tech.join(" · ")}
                      </div>

                      <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1">
                        {project.features.map((f) => (
                          <li key={f} className="text-[12px] font-mono text-muted-foreground flex items-center gap-2">
                            <span className="text-term-green">+</span> {f}
                          </li>
                        ))}
                      </ul>

                      {hasLinks && (
                        <div className="flex flex-wrap gap-2 pt-1 font-mono text-[12px]">
                          {project.links.demo && (
                            <Link href={project.links.demo} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-primary/40 text-primary hover:bg-primary/10 transition-colors">
                              <ExternalLink size={12} /> live
                            </Link>
                          )}
                          {project.links.visit && (
                            <Link href={project.links.visit} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-primary/40 text-primary hover:bg-primary/10 transition-colors">
                              <Lock size={12} /> {project.links.visitLabel ?? "visit"}
                            </Link>
                          )}
                          {project.links.github && (
                            <Link href={project.links.github} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-primary/20 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
                              <Github size={12} /> source
                            </Link>
                          )}
                          {project.links.contactEmail && (
                            <button onClick={() => copy(project.links.contactEmail!)}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-primary/20 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
                              <Mail size={12} /> {copied === project.links.contactEmail ? "copied ✓" : "email"}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      <Link
        href="https://github.com/0xPacman"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 text-[12px] font-mono py-2.5 border border-primary/15 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
      >
        <Github size={13} /> git clone --all @0xPacman <ExternalLink size={10} />
      </Link>
    </section>
  )
}
