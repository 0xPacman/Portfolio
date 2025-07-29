'use client'

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useGsapProjectsAnimation } from "@/components/gsap-projects-animation";

interface ProjectsProps {
  isDarkMode: boolean
  projectsRef: React.RefObject<HTMLDivElement>
}

const projects = [
  {
    title: "ServerInfoReport - System Monitoring Tool",
    description:
      "Comprehensive server monitoring shell script that provides detailed system information including CPU usage, memory stats, storage analysis, service status checks, and network configuration. Features cross-platform support for Linux and macOS with colorized output.",
    technologies: ["Shell", "Bash", "System Administration", "Monitoring", "DevOps"],
    link: "https://github.com/0xPacman/ServerInfoReport",
    github: "https://github.com/0xPacman/ServerInfoReport",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: true,
    metrics: { platform: "Multi", monitoring: "Real-time", setup: "1-line" },
  },
  {
    title: "GatewayPage - Personal Dashboard",
    description:
      "Modern web dashboard serving as a personalized homepage with real-time features including live time/date display, weather integration, Hacker News feed, Reddit browser, and persistent note-taking. Features dark/light theme toggle and responsive design.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Local Storage", "REST APIs"],
    link: "https://0xpacman.github.io/GatewayPage/",
    github: "https://github.com/0xPacman/GatewayPage",
    image: "https://images.unsplash.com/photo-1621109246687-10ae613f2d8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: true,
    metrics: { features: "6+", theme: "Dual", live: "Real-time" },
  },
  {
    title: "PasswordGEN - Secure Password Generator",
    description:
      "GigaChad Password Generator - A robust password generator available both as web application and command-line tool. Features cryptographically secure password generation with customizable length, character sets, and entropy options. Now accessible online for instant use.",
    technologies: ["Web", "Shell", "JavaScript", "Cryptography", "Security", "CLI"],
    link: "https://0xpacman.github.io/PasswordGEN/",
    github: "https://github.com/0xPacman/PasswordGEN",
    image: "https://plus.unsplash.com/premium_photo-1681487746049-c39357159f69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: false,
    metrics: { security: "High", entropy: "Max", platform: "Dual" },
  },
  {
    title: "GITscript - Git Automation Tool",
    description:
      "Shell script automation tool for streamlined Git workflows. Simplifies common Git operations and reduces repetitive tasks with smart commit messaging and branch management.",
    technologies: ["Shell", "Git", "Bash Scripting", "Automation", "Version Control"],
    link: "https://github.com/0xPacman/GITscript",
    github: "https://github.com/0xPacman/GITscript",
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: false,
    metrics: { workflow: "Fast", automation: "100%", git: "Pro" },
  },
]

export const Projects = ({ isDarkMode, projectsRef }: ProjectsProps) => {
  const projectRefs = React.useRef<React.RefObject<HTMLDivElement>[]>(projects.map(() => React.createRef()));
  useGsapProjectsAnimation(projectRefs.current);

  const cardClasses = isDarkMode
    ? "bg-black/40 backdrop-blur-md border-yellow-500/30"
    : "bg-white/60 backdrop-blur-md border-yellow-400/40"
  const textPrimary = "text-foreground"
  const textSecondary = "text-muted-foreground"
  const textAccent = "text-amber-500 dark:text-amber-400"

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className={`text-3xl font-bold ${textPrimary} mb-4`}>Featured Projects</h2>
        <p className={`${textSecondary} max-w-2xl mx-auto`}>
          Showcasing real projects demonstrating systems programming, automation tools, and security solutions
        </p>
      </div>

      <div className="grid gap-6">
        {projects.map((project, index) => (
          <div ref={projectRefs.current[index]} key={index}>
            <Card
              className={`group hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] ${
                project.featured
                  ? `${isDarkMode ? "bg-gradient-to-r from-black/60 to-yellow-900/30" : "bg-gradient-to-r from-white/80 to-yellow-100/60"} backdrop-blur-md ${isDarkMode ? "border-yellow-400/50" : "border-yellow-500/60"}`
                  : cardClasses
              } shadow-xl`}
            >
              <div className="p-6">
                <div className="flex gap-6">
                  {/* Project Image */}
                  <div className="relative flex-shrink-0 w-32 h-32 overflow-hidden rounded-xl">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {project.featured && (
                      <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black border-0 text-xs">
                        <Star className="mr-1" size={12} />
                        Featured
                      </Badge>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className={`text-xl font-semibold ${textPrimary} line-clamp-1`}>{project.title}</h3>
                      <div className="flex gap-2 ml-4">
                        <Link href={project.link} target="_blank">
                          <Button variant="outline" size="sm" className={`${isDarkMode ? "border-yellow-400/50 hover:bg-yellow-400/10" : "border-yellow-500/50 hover:bg-yellow-500/10"} ${textPrimary}`}>
                            <ExternalLink size={14} className="mr-1" />
                            Demo
                          </Button>
                        </Link>
                        <Link href={project.github} target="_blank">
                          <Button variant="ghost" size="sm" className={`${textSecondary} hover:text-yellow-500`}>
                            <Github size={16} />
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <p className={`${textSecondary} text-sm mb-4 line-clamp-2`}>{project.description}</p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.map((tech, i) => (
                        <Badge key={i} variant="secondary" className={`${isDarkMode ? "bg-yellow-500/20 text-yellow-300" : "bg-yellow-400/30 text-yellow-700"} border-0 text-xs`}>
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Metrics */}
                    <div className={`grid grid-cols-3 gap-3 text-center p-3 rounded-lg ${isDarkMode ? "bg-black/20" : "bg-white/40"}`}>
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key}>
                          <p className={`font-bold text-sm ${textAccent}`}>{value}</p>
                          <p className={`text-xs ${textSecondary} capitalize`}>{key}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
