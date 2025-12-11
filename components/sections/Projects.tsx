'use client'

import React from "react"
import { motion } from "framer-motion"
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
  Star,
  Code,
  Zap,
  Monitor,
  Mail
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
    category: "Mental Wellness",
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
    category: "Web Service",
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
    title: "ColorGuesser",
    description: "Interactive color guessing game that challenges players to identify colors. Features scoring system, and sleek modern interface.",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Web Game",
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
    category: "Security Tool",
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
    title: "Atlas Cloud Services Infrastructure",
    description: "Lead modernization for Morocco's premier cloud platform as the single point of contact, orchestrating VMware, Dell VxRail, and multi-cloud operations for 100+ enterprises.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Enterprise Cloud",
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
    category: "System Tool",
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
    category: "Web Dashboard",
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
    category: "Cloud Platform",
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
    category: "Network Security",
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
    category: "Web Development",
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export function Projects({ isDarkMode, projectsRef }: ProjectsProps) {
  const [copiedEmail, setCopiedEmail] = React.useState<string | null>(null)

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

  return (
    <TooltipProvider>
      <section
      ref={projectsRef}
      className="py-20 px-4 relative overflow-hidden"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <meta itemProp="name" content="Ahmed Jadani's Projects" />
      <meta itemProp="description" content="Collection of projects showcasing expertise in cloud infrastructure, security tools, web development, and system administration" />
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className={`absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse ${isDarkMode ? 'opacity-30' : 'opacity-20'}`} />
        <div className={`absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse ${isDarkMode ? 'opacity-30' : 'opacity-20'}`} style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            Featured Projects
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            My Projects
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover my latest projects showcasing expertise in cloud infrastructure, security tools, 
            web development, and system administration.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => {
            const Icon = project.icon
            const visitHref = project.links.visit
            const visitIsExternal = Boolean(visitHref && /^https?:/i.test(visitHref))
            const contactEmail = project.links.contactEmail
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                className="group"
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
                <Card className={`h-full overflow-hidden border-0 shadow-lg ${
                  isDarkMode 
                    ? 'bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/60' 
                    : 'bg-white/70 backdrop-blur-sm hover:bg-white/90'
                } transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25`}>
                  
                  {/* Project Image with Gradient Overlay */}
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-80 z-10`} />
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <Badge 
                        variant="secondary" 
                        className="bg-white/90 text-black backdrop-blur-sm"
                      >
                        {project.status}
                      </Badge>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute bottom-4 left-4 z-20">
                      <Badge 
                        variant="outline" 
                        className="bg-white/10 border-white/20 text-white backdrop-blur-sm"
                      >
                        <Icon className="w-3 h-3 mr-1" />
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className={`text-sm mb-4 line-clamp-3 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 3).map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="text-xs px-2 py-1"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.tech.length > 3 && (
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Badge
                              variant="outline"
                              className="text-xs px-2 py-1 cursor-default"
                            >
                              +{project.tech.length - 3}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <div className="text-xs font-medium text-foreground mb-1">
                              Additional Tech
                            </div>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              {project.tech.slice(3).map((extraTech, extraIndex) => (
                                <li key={extraIndex}>{extraTech}</li>
                              ))}
                            </ul>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                    <div className="mb-6">
                      <div className="grid grid-cols-2 gap-2">
                        {project.features.slice(0, 4).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-xs">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.gradient} mr-2`} />
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {project.links.demo && (
                        <Button
                          asChild
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0"
                        >
                          <Link href={project.links.demo} target="_blank">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Demo
                          </Link>
                        </Button>
                      )}

                      {contactEmail && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0"
                            >
                              <Mail className="w-4 h-4 mr-2" />
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
                        <Button
                          asChild
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0"
                        >
                          <Link
                            href={visitHref}
                            target={visitIsExternal ? "_blank" : undefined}
                            rel={visitIsExternal ? "noopener noreferrer" : undefined}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            {project.links.visitLabel ?? "Visit"}
                          </Link>
                        </Button>
                      )}
                      
                      {project.links.github && (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className={`flex-1 border-yellow-500/50 text-yellow-600 hover:bg-yellow-500/10 hover:border-yellow-500 ${
                            isDarkMode 
                              ? 'hover:text-yellow-400' 
                              : 'hover:text-yellow-700'
                          }`}
                        >
                          <Link href={project.links.github} target="_blank">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* View More Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button
            variant="outline"
            size="lg"
            className={`group ${
              isDarkMode 
                ? 'border-gray-600 hover:bg-gray-700' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
            asChild
          >
            <Link href="https://github.com/0xPacman" target="_blank">
              <Github className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              View More on GitHub
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
      </section>
    </TooltipProvider>
  )
}
