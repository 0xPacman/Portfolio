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
      "GigaChad Password Generator - A robust command-line tool for generating cryptographically secure passwords with customizable length, character sets, and entropy options.",
    technologies: ["Shell", "Cryptography", "Security", "CLI", "Random Generation"],
    link: "https://github.com/0xPacman/PasswordGEN",
    github: "https://github.com/0xPacman/PasswordGEN",
    image: "https://plus.unsplash.com/premium_photo-1681487746049-c39357159f69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: false,
    metrics: { security: "High", entropy: "Max", cli: "Fast" },
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
    <section id="projects" ref={projectsRef} className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl sm:text-5xl font-bold ${textPrimary} mb-6`}>Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto mb-6"></div>
          <p className={`${textSecondary} max-w-2xl mx-auto text-lg`}>
            Showcasing real projects from my GitHub portfolio demonstrating systems programming, automation tools, and security solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div ref={projectRefs.current[index]} key={index}>
            <Card
              className={`group hover:shadow-3xl transition-all duration-300 hover:scale-105 ${
                project.featured
                  ? `${isDarkMode ? "bg-gradient-to-br from-black/50 to-yellow-900/20" : "bg-gradient-to-br from-white/70 to-yellow-100/50"} backdrop-blur-md ${isDarkMode ? "border-yellow-400/40" : "border-yellow-500/50"}`
                  : cardClasses
              } shadow-2xl h-full flex flex-col`}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {project.featured && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black border-0 shadow-lg">
                    <Star className="mr-2" size={16} />
                    Featured
                  </Badge>
                )}
              </div>
              <CardHeader className="flex-grow">
                <CardTitle className={`${textPrimary} text-xl`}>{project.title}</CardTitle>
                <CardDescription className={`${textSecondary} mt-2 text-sm`}>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <Badge key={i} variant="secondary" className={`${isDarkMode ? "bg-yellow-500/20 text-yellow-300" : "bg-yellow-400/30 text-yellow-700"} border-0`}>
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className={`grid grid-cols-3 gap-4 text-center p-4 rounded-lg ${isDarkMode ? "bg-black/20" : "bg-white/40"}`}>
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key}>
                      <p className={`font-bold text-lg ${textAccent}`}>{value}</p>
                      <p className={`text-xs ${textSecondary} capitalize`}>{key}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <div className="p-6 pt-0 flex justify-between items-center">
                <Link href={project.link} target="_blank">
                  <Button variant="outline" className={`${isDarkMode ? "border-yellow-400/50 hover:bg-yellow-400/10" : "border-yellow-500/50 hover:bg-yellow-500/10"} ${textPrimary}`}>
                    <ExternalLink size={16} className="mr-2" />
                    Live Demo
                  </Button>
                </Link>
                <Link href={project.github} target="_blank">
                  <Button variant="ghost" className={`${textSecondary} hover:text-white`}>
                    <Github size={20} />
                  </Button>
                </Link>
              </div>
            </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
