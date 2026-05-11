'use client'

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ExternalLink,
  Github,
  Cloud,
  Shield,
  Server,
  Brain,
  Globe,
  Code,
  Zap,
  Monitor,
  Mail,
  Layers,
  ChevronDown,
  Lock
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"

interface ProjectsProps {
  isDarkMode: boolean
  projectsRef: React.RefObject<HTMLDivElement>
}

interface ProjectLink {
  demo?: string | null
  visit?: string | null
  github?: string | null
  visitLabel?: string
  contactEmail?: string | null
  contactLabel?: string
}

type IconType = typeof Cloud

interface Project {
  title: string
  description: string
  image: string
  category: string
  tech: string[]
  links: ProjectLink
  features: string[]
  icon: IconType
  gradient: string
  status: string
}

const projects: Project[] = [
  {
    title: "Brainful",
    description: "A soothing, single-page mental wellness dashboard with breathing guidance, mood reflection, zen doodling, and focused productivity tools—all running entirely in the browser.",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Web",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Lucide Icons", "LocalStorage"],
    links: {
      demo: "https://brainful.0xpacman.com",
      github: null
    },
    features: [
      "Animated 4-7-8 breathing guide",
      "Emoji-powered mood journaling",
      "Zen doodling canvas workspace",
      "Ambient radio with Web Audio"
    ],
    icon: Brain,
    gradient: "from-sky-500 to-teal-500",
    status: "Live"
  },
  {
    title: "Paste",
    description: "Simple and secure pastebin service for sharing code snippets and text. Clean interface with syntax highlighting and expiration options for enhanced privacy.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Web",
    tech: ["Web", "Pastebin", "Privacy", "Code Sharing"],
    links: {
      demo: "https://paste.0xpacman.com",
      github: "https://github.com/0xPacman/Paste"
    },
    features: ["Syntax Highlighting", "Privacy Focused", "Clean UI", "Secure Sharing"],
    icon: Code,
    gradient: "from-teal-500 to-cyan-500",
    status: "Live"
  },
  {
    title: "Draw",
    description: "Collaborative online whiteboard forked from Excalidraw, developed as an open-source project for sharing ideas, sketching diagrams, and building together.",
    image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Web",
    tech: ["Excalidraw", "Collaboration", "Whiteboard", "Open Source"],
    links: {
      demo: "https://draw.0xpacman.com/",
      github: "https://github.com/0xPacman/excalidraw"
    },
    features: ["Forked from Excalidraw", "Collaborative Drawing", "Open Source Development", "Visual Brainstorming"],
    icon: Code,
    gradient: "from-cyan-500 to-blue-500",
    status: "Open Source"
  },
  {
    title: "ColorGuesser",
    description: "Interactive color guessing game that challenges players to identify colors. Features scoring system, and sleek modern interface.",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Web",
    tech: ["JavaScript", "CSS3", "Game Logic", "Interactive UI"],
    links: {
      demo: "https://colorguesser.0xpacman.com",
      github: "https://github.com/0xPacman/ColorGuesser"
    },
    features: ["Multiple players", "Score Tracking", "Color Theory", "Responsive Design"],
    icon: Zap,
    gradient: "from-pink-500 to-rose-500",
    status: "Live"
  },
  {
    title: "PasswordGEN",
    description: "Simple password generator. Features both web interface and CLI tool for maximum security.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Tools",
    tech: ["Bash", "Web", "CLI", "Cryptography"],
    links: {
      demo: "https://password.0xpacman.com",
      github: "https://github.com/0xPacman/PasswordGEN"
    },
    features: ["Strong Entropy", "Multi-platform", "Open Source", "Security Focused"],
    icon: Shield,
    gradient: "from-green-500 to-emerald-500",
    status: "Live"
  },
  {
    title: "AD Manager",
    description: "Professional Active Directory management desktop application built in C++ with a modern, intuitive UI for Windows environments. Simplify user, group, and resource administration with powerful automation tools.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
    category: "Enterprise",
    tech: ["C++", "Windows", "Active Directory", "Enterprise"],
    links: {
      visit: "https://ad.0xpacman.com",
      visitLabel: "Purchase - $39.99"
    },
    features: [
      "Advanced user/group management",
      "AD automation & bulk operations",
      "Real-time monitoring",
      "Enterprise-grade security"
    ],
    icon: Server,
    gradient: "from-indigo-500 to-blue-500",
    status: "Commercial"
  },
  {
    title: "Atlas Cloud Services Infrastructure",
    description: "Lead modernization for Morocco's premier cloud platform as the single point of contact, orchestrating VMware, Dell VxRail, and multi-cloud operations for 100+ enterprises.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Enterprise",
    tech: ["VMware", "Dell VxRail", "NSX", "vSphere"],
    links: {
      visit: null,
      github: null,
      contactEmail: "ahmed.jadani@atlascs.ma",
      contactLabel: "Email Me"
    },
    features: ["Modernization Lead", "Single Point of Contact", "Multi-cloud Strategy", "99.9% Uptime"],
    icon: Cloud,
    gradient: "from-blue-500 to-cyan-500",
    status: "Production"
  },
  {
    title: "ServerInfoReport",
    description: "Comprehensive server monitoring shell script providing detailed system information including CPU usage, memory stats, storage analysis, and network configuration with cross-platform support.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Tools",
    tech: ["Shell", "Bash", "Monitoring", "DevOps"],
    links: {
      demo: null,
      github: "https://github.com/0xPacman/ServerInfoReport"
    },
    features: ["Real-time Monitoring", "Cross-platform", "Colorized Output", "System Analysis"],
    icon: Monitor,
    gradient: "from-purple-500 to-violet-500",
    status: "Open Source"
  },
  {
    title: "GatewayPage",
    description: "Modern web dashboard serving as personalized homepage with real-time weather, Hacker News feed, Reddit browser, and persistent note-taking with dark/light theme support.",
    image: "https://images.unsplash.com/photo-1621109246687-10ae613f2d8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Web",
    tech: ["HTML5", "CSS3", "JavaScript", "APIs"],
    links: {
      demo: "https://0xpacman.github.io/GatewayPage/",
      github: "https://github.com/0xPacman/GatewayPage"
    },
    features: ["Real-time Data", "Theme Toggle", "API Integration", "Local Storage"],
    icon: Globe,
    gradient: "from-indigo-500 to-purple-500",
    status: "Live"
  },
  {
    title: "OpenStack Cloud Platform",
    description: "Deployed, configured, and automated enterprise OpenStack cloud platform with multi-node architecture, providing IaaS services with automated provisioning and monitoring.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Enterprise",
    tech: ["OpenStack", "Python", "Ansible", "Automation"],
    links: {
      demo: null,
      github: null
    },
    features: ["Multi-node", "Automated Provisioning", "IaaS Services", "Monitoring"],
    icon: Server,
    gradient: "from-orange-500 to-red-500",
    status: "Enterprise"
  },
  {
    title: "Network Security Stack",
    description: "Implemented comprehensive network security using VMware NSX, including micro-segmentation, DFW policies, and automated threat response for enterprise environments.",
    image: "https://plus.unsplash.com/premium_photo-1683836722479-411e30b8b6e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Enterprise",
    tech: ["VMware NSX", "Security", "Micro-segmentation", "Automation"],
    links: {
      demo: null,
      github: null
    },
    features: ["Zero Trust", "Micro-segmentation", "Automated Response", "Compliance"],
    icon: Shield,
    gradient: "from-red-500 to-pink-500",
    status: "Enterprise"
  },
  {
    title: "Portfolio Website",
    description: "Modern, responsive portfolio built with Next.js 15, TypeScript, and Framer Motion. Features glassmorphism design, smooth animations, and dark/light theme support.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Web",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind"],
    links: {
      demo: "https://0xpacman.github.io/Portfolio",
      github: "https://github.com/0xPacman/Portfolio"
    },
    features: ["Responsive", "Dark Mode", "Animations", "Modern UI"],
    icon: Code,
    gradient: "from-yellow-500 to-orange-500",
    status: "Live"
  }
]

const categories = ["All", "Web", "Enterprise", "Tools"] as const
type Category = (typeof categories)[number]

const statusColors: Record<string, string> = {
  Live: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  Production: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
  Enterprise: 'bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/30',
  Commercial: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
  'Open Source': 'bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30',
}

export function Projects({ isDarkMode, projectsRef }: ProjectsProps) {
  const [copiedEmail, setCopiedEmail] = React.useState<string | null>(null)
  const [activeCategory, setActiveCategory] = React.useState<Category>("All")
  const [expandedProject, setExpandedProject] = React.useState<number | null>(null)

  const handleCopyEmail = React.useCallback((email: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(email)
        .then(() => {
          setCopiedEmail(email)
          setTimeout(() => setCopiedEmail(null), 1600)
        })
        .catch(() => {})
    }
  }, [])

  const filtered = activeCategory === "All" ? projects : projects.filter(p => p.category === activeCategory)

  const cardBg = isDarkMode
    ? 'border-yellow-500/10 bg-black/30 hover:border-yellow-500/25'
    : 'border-yellow-500/20 bg-white/70 backdrop-blur-sm hover:border-yellow-500/40'

  const pillBase = isDarkMode
    ? 'border-yellow-500/15 bg-transparent text-muted-foreground hover:bg-yellow-500/10 hover:text-yellow-400'
    : 'border-yellow-500/20 bg-transparent text-muted-foreground hover:bg-amber-50 hover:text-amber-700'

  const pillActive = isDarkMode
    ? 'border-yellow-500/40 bg-yellow-500/10 text-yellow-400'
    : 'border-yellow-500/50 bg-amber-50 text-amber-700'

  return (
    <TooltipProvider>
      <div
        ref={projectsRef}
        className="space-y-5"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        <meta itemProp="name" content="Ahmed Jadani's Projects" />
        <meta itemProp="description" content="Collection of projects showcasing expertise in cloud infrastructure, security tools, web development, and system administration" />

        {/* Header */}
        <div className="flex items-center gap-3 mb-1">
          <div className="h-7 w-0.5 rounded-full bg-gradient-to-b from-amber-400 to-yellow-600" />
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`font-mono text-[10px] mb-0.5 ${isDarkMode ? 'text-yellow-500/40' : 'text-yellow-600/50'}`}>~/projects</motion.div>
            <motion.h2 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Projects
            </motion.h2>
          </div>
        </div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-muted-foreground -mt-3">
          {filtered.length} project{filtered.length !== 1 ? 's' : ''} — apps, tools & enterprise infrastructure.
        </motion.p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setExpandedProject(null) }}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-200 ${activeCategory === cat ? pillActive : pillBase}`}
            >
              {cat === 'All' && <Layers className="inline w-3 h-3 mr-1 -mt-px" />}
              {cat}
            </button>
          ))}
        </div>

        {/* Projects List */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => {
              const Icon = project.icon
              const visitHref = project.links.visit
              const visitIsExternal = Boolean(visitHref && /^https?:/i.test(visitHref))
              const contactEmail = project.links.contactEmail
              const isExpanded = expandedProject === index
              const hasLinks = project.links.demo || project.links.github || visitHref || contactEmail

              return (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: .3, delay: index * .04 }}
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/SoftwareApplication"
                >
                  <meta itemProp="name" content={project.title} />
                  <meta itemProp="description" content={project.description} />
                  <meta itemProp="applicationCategory" content={project.category} />
                  <meta itemProp="operatingSystem" content="Web Browser" />
                  {project.links.demo && <meta itemProp="url" content={project.links.demo} />}
                  {project.links.github && <meta itemProp="codeRepository" content={project.links.github} />}
                  <div itemProp="author" itemScope itemType="https://schema.org/Person" style={{ display: 'none' }}>
                    <meta itemProp="name" content="Ahmed Jadani" />
                    <meta itemProp="url" content="https://0xpacman.github.io/Portfolio" />
                  </div>

                  <div className={`rounded-xl border overflow-hidden transition-all duration-300 ${cardBg}`}>
                    {/* Clickable header row */}
                    <button
                      onClick={() => setExpandedProject(isExpanded ? null : index)}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${isDarkMode ? 'hover:bg-yellow-500/5' : 'hover:bg-amber-50/50'}`}
                    >
                      {/* Project icon */}
                      <div className={`flex-shrink-0 p-2 rounded-lg bg-gradient-to-br ${project.gradient} shadow-sm`}>
                        <Icon className="text-white" size={16} />
                      </div>

                      {/* Title + category */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-medium text-foreground truncate">{project.title}</h3>
                          <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border ${statusColors[project.status] ?? 'bg-gray-500/15 text-gray-500 border-gray-500/30'}`}>
                            {project.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate mt-0.5">{project.category}</p>
                      </div>

                      {/* Tech count + chevron */}
                      <Badge variant="outline" className="h-5 px-1.5 text-[9px] border-yellow-500/25 text-yellow-500 bg-yellow-500/5 flex-shrink-0">
                        {project.tech.length} tech
                      </Badge>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: .2 }}
                        className="flex-shrink-0 text-muted-foreground"
                      >
                        <ChevronDown size={14} />
                      </motion.div>
                    </button>

                    {/* Expanded detail */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          key="detail"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: .25 }}
                          className="overflow-hidden"
                        >
                          <div className={`px-4 pb-4 pt-1 border-t ${isDarkMode ? 'border-yellow-500/10' : 'border-yellow-500/15'}`}>
                            {/* Image + description row */}
                            <div className="flex gap-3 mt-3">
                              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 z-10`} />
                                <Image
                                  src={project.image}
                                  alt={project.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <p className={`text-xs leading-relaxed flex-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {project.description}
                              </p>
                            </div>

                            {/* Tech stack */}
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {project.tech.map((t, i) => (
                                <span
                                  key={i}
                                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-gray-700/60 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                                >
                                  {t}
                                </span>
                              ))}
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-3">
                              {project.features.map((f, i) => (
                                <div key={i} className="flex items-center gap-1.5 text-[11px]">
                                  <div className={`w-1 h-1 rounded-full flex-shrink-0 bg-gradient-to-r ${project.gradient}`} />
                                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{f}</span>
                                </div>
                              ))}
                            </div>

                            {/* Action buttons */}
                            {hasLinks && (
                              <div className="flex flex-wrap gap-2 mt-4">
                                {project.links.demo && (
                                  <Button asChild size="sm" className="h-7 text-xs bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0">
                                    <Link href={project.links.demo} target="_blank">
                                      <ExternalLink className="w-3 h-3 mr-1.5" />
                                      Live Demo
                                    </Link>
                                  </Button>
                                )}

                                {contactEmail && (
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button size="sm" className="h-7 text-xs bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0">
                                        <Mail className="w-3 h-3 mr-1.5" />
                                        {project.links.contactLabel ?? 'Email Me'}
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-sm">
                                      <DialogHeader>
                                        <DialogTitle>Email Ahmed Jadani</DialogTitle>
                                        <DialogDescription>
                                          Reach out directly for Atlas Cloud Services engagements or enterprise cloud consulting.
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="flex items-start gap-3 rounded-md border border-border/60 bg-muted/30 p-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-amber-500 to-yellow-500 text-black">
                                          <Mail className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1">
                                          <p className="text-sm font-medium text-foreground">{contactEmail}</p>
                                          <p className="text-xs text-muted-foreground mt-1">
                                            This is the dedicated professional channel for Atlas Cloud Services inquiries.
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex flex-wrap gap-3 pt-2">
                                        <Button asChild size="sm" className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:from-amber-500/90 hover:to-yellow-500/90">
                                          <a href={`mailto:${contactEmail}`}>Compose Email</a>
                                        </Button>
                                        <Button
                                          type="button"
                                          size="sm"
                                          variant="outline"
                                          onClick={() => handleCopyEmail(contactEmail)}
                                          className="border-amber-500/50 text-amber-600 hover:bg-amber-500/10"
                                        >
                                          {copiedEmail === contactEmail ? 'Copied!' : 'Copy Email'}
                                        </Button>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                )}

                                {visitHref && (
                                  <Button asChild size="sm" variant="outline" className={`h-7 text-xs ${isDarkMode ? 'border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10' : 'border-yellow-500/40 text-amber-700 hover:bg-amber-50'}`}>
                                    <Link
                                      href={visitHref}
                                      target={visitIsExternal ? "_blank" : undefined}
                                      rel={visitIsExternal ? "noopener noreferrer" : undefined}
                                    >
                                      {project.status === 'Commercial' ? <Lock className="w-3 h-3 mr-1.5" /> : <ExternalLink className="w-3 h-3 mr-1.5" />}
                                      {project.links.visitLabel ?? "Visit"}
                                    </Link>
                                  </Button>
                                )}

                                {project.links.github && (
                                  <Button asChild size="sm" variant="outline" className={`h-7 text-xs ${isDarkMode ? 'border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10' : 'border-yellow-500/40 text-amber-700 hover:bg-amber-50'}`}>
                                    <Link href={project.links.github} target="_blank">
                                      <Github className="w-3 h-3 mr-1.5" />
                                      Source
                                    </Link>
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .3 }}
          className="pt-2"
        >
          <Link
            href="https://github.com/0xPacman"
            target="_blank"
            className={`flex items-center justify-center gap-2 text-xs font-medium py-2.5 rounded-lg border transition-all ${isDarkMode ? 'border-yellow-500/15 text-muted-foreground hover:border-yellow-500/30 hover:text-yellow-400 hover:bg-yellow-500/5' : 'border-yellow-500/20 text-muted-foreground hover:border-yellow-500/40 hover:text-amber-700 hover:bg-amber-50'}`}
          >
            <Github size={14} />
            View more on GitHub
            <ExternalLink size={10} />
          </Link>
        </motion.div>
      </div>
    </TooltipProvider>
  )
}
