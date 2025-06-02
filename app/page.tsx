"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Cloud,
  Server,
  Shield,
  Code,
  Monitor,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Phone,
  Star,
  Zap,
  Users,
  Sun,
  Moon,
  Building2,
  Globe,
  HardDrive,
  Rocket,
  TrendingUp,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isDarkMode, setIsDarkMode] = useState(true)
  
  // Effect to update document class when theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const skills = [
    { name: "Oracle", icon: Cloud, level: 90, category: "Public Cloud" },
    { name: "Azure", icon: Cloud, level: 90, category: "Public Cloud" },
    { name: "Google Cloud", icon: Cloud, level: 85, category: "Public Cloud" },
    { name: "Dell VxRail", icon: Server, level: 98, category: "Infrastructure" },
    { name: "VMware", icon: Server, level: 95, category: "Virtualization" },
    { name: "Nutanix", icon: Server, level: 87, category: "Virtualization" },
    { name: "OpenStack", icon: Cloud, level: 88, category: "Private Cloud" },
    { name: "Kubernetes", icon: Server, level: 84, category: "Orchestration" },
    { name: "Docker", icon: Server, level: 95, category: "Containers" },
    { name: "Scripting", icon: Code, level: 90, category: "Code" },
    { name: "Ansible", icon: Code, level: 88, category: "Automation" },
    { name: "Data Center", icon: Building2, level: 86, category: "Infrastructure" },
    { name: "NSX", icon: Shield, level: 90, category: "Network and Security" },
    { name: "Veeam B&R", icon: HardDrive, level: 90, category: "Storage" },
    { name: "Monitoring Tools", icon: Monitor, level: 92, category: "Observability" },
  ]

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

  const themeClasses = isDarkMode
    ? "bg-gradient-to-br from-black via-gray-900 to-yellow-900"
    : "bg-gradient-to-br from-white via-yellow-50 to-yellow-100"

  const cardClasses = isDarkMode
    ? "bg-black/40 backdrop-blur-md border-yellow-500/30"
    : "bg-white/60 backdrop-blur-md border-yellow-400/40"

  // Use text-foreground for primary text to respect the theme
  const textPrimary = "text-foreground"
  // Use text-muted-foreground for secondary text to respect the theme
  const textSecondary = "text-muted-foreground" 
  // Use text-accent for accent text that works in both themes
  const textAccent = "text-amber-500 dark:text-amber-400"

  return (
    <div className={`min-h-screen ${themeClasses} relative overflow-hidden transition-all duration-500`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-40 -right-40 w-80 h-80 ${isDarkMode ? "bg-yellow-500/20" : "bg-yellow-400/30"} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse`}
        ></div>
        <div
          className={`absolute -bottom-40 -left-40 w-80 h-80 ${isDarkMode ? "bg-yellow-600/20" : "bg-yellow-500/30"} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000`}
        ></div>
        <div
          className={`absolute top-40 left-40 w-80 h-80 ${isDarkMode ? "bg-yellow-400/20" : "bg-yellow-300/30"} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000`}
        ></div>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-yellow-400 rotate-45 animate-bounce animation-delay-1000"></div>
        <div className="absolute bottom-40 right-40 w-6 h-6 border-2 border-yellow-400 rotate-45 animate-spin"></div>
        <div className="absolute top-60 left-20 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Card className={`${cardClasses} shadow-2xl`}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                    <span className="text-black font-bold text-lg">0x</span>
                  </div>
                  <div>
                    <div className={`text-xl font-bold ${textPrimary}`}>Ahmed Jadani</div>
                    <div className={`text-xs ${textAccent}`}>@0xPacman</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Theme Toggle */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                    className={`${isDarkMode ? "hover:bg-yellow-500/20" : "hover:bg-yellow-400/20"} transition-colors`}
                  >
                    {isDarkMode ? (
                      <Sun className="text-yellow-400" size={20} />
                    ) : (
                      <Moon className="text-yellow-600" size={20} />
                    )}
                  </Button>

                  {/* Desktop Navigation */}
                  <div className="hidden md:flex space-x-6">
                    {["home", "about", "skills", "projects", "contact"].map((section) => (
                      <button
                        key={section}
                        onClick={() => scrollToSection(section)}
                        className={`capitalize transition-all duration-300 px-4 py-2 rounded-lg ${
                          activeSection === section
                            ? `${textPrimary} ${isDarkMode ? "bg-yellow-500/20" : "bg-yellow-400/20"} backdrop-blur-sm`
                            : `${textSecondary} ${isDarkMode ? "hover:text-white hover:bg-yellow-500/10" : "hover:text-gray-900 hover:bg-yellow-400/10"}`
                        }`}
                      >
                        {section}
                      </button>
                    ))}
                  </div>

                  {/* Mobile Navigation Button */}
                  <button
                    className={`md:hidden ${textPrimary} p-2 rounded-lg ${isDarkMode ? "bg-yellow-500/20" : "bg-yellow-400/20"} backdrop-blur-sm`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </div>

              {/* Mobile Navigation Menu */}
              {isMenuOpen && (
                <div
                  className={`md:hidden mt-4 pt-4 border-t ${isDarkMode ? "border-yellow-500/30" : "border-yellow-400/40"}`}
                >
                  {["home", "about", "skills", "projects", "contact"].map((section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className={`block w-full text-left py-3 capitalize ${textSecondary} ${isDarkMode ? "hover:text-white hover:bg-yellow-500/10" : "hover:text-gray-900 hover:bg-yellow-400/10"} rounded-lg px-4 transition-all`}
                    >
                      {section}
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Card className={`${cardClasses} shadow-2xl hover:shadow-3xl transition-all duration-500`}>
            <CardContent className="p-12 text-center">
              <div className="mb-8">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full blur-lg opacity-50 animate-pulse"></div>
                  <Image
                    src="/media/PDP.jpg"
                    alt="Ahmed Jadani - 0xPacman"
                    width={200}
                    height={200}
                    className={`relative mx-auto rounded-full border-4 ${isDarkMode ? "border-yellow-400/50" : "border-yellow-500/50"} shadow-2xl`}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center animate-pulse">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute -top-2 -left-2 bg-gradient-to-r from-yellow-400 to-yellow-600 w-12 h-8 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-xs">0x</span>
                  </div>
                </div>
              </div>

              <h1
                className={`text-5xl sm:text-7xl font-bold ${textPrimary} mb-4 bg-gradient-to-r ${isDarkMode ? "from-white to-yellow-200" : "from-gray-900 to-yellow-700"} bg-clip-text text-transparent`}
              >
                Ahmed Jadani
              </h1>

              <div className="flex items-center justify-center mb-6">
                <Badge
                  className={`bg-gradient-to-r from-yellow-500 to-yellow-600 ${isDarkMode ? "text-black" : "text-white"} border-0 text-lg px-6 py-2 shadow-lg`}
                >
                  <Building2 className="mr-2" size={20} />
                  Cloud Infrastructure Engineer @ Atlas Cloud Services
                </Badge>
              </div>

              <div className="flex items-center justify-center mb-6 space-x-4">
                <div className="flex items-center">
                  <MapPin className={textAccent} size={16} />
                  <span className={`${textSecondary} ml-1 text-sm`}>Morocco</span>
                </div>
                <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                <div className="flex items-center">
                  <Globe className={textAccent} size={16} />
                  <span className={`${textSecondary} ml-1 text-sm`}>Public Cloud Provider</span>
                </div>
              </div>

              <p className={`text-xl ${textSecondary} mb-8 max-w-4xl mx-auto leading-relaxed`}>
                Leading cloud infrastructure at <span className={textAccent}>Atlas Cloud Services</span>, Morocco's
                premier data center. Specializing in private cloud architecture, public cloud solutions, and
                enterprise-grade infrastructure automation.
              </p>

              <div className="flex justify-center space-x-6 mb-8">
                <Link
                  href="https://github.com/0xPacman"
                  className={`${textSecondary} hover:${textAccent} transition-all duration-300 hover:scale-110 p-3 rounded-full ${isDarkMode ? "bg-yellow-500/10" : "bg-yellow-400/20"} backdrop-blur-sm hover:shadow-lg`}
                >
                  <Github size={24} />
                </Link>
                <Link
                  href="https://linkedin.com/in/0xpacman"
                  className={`${textSecondary} hover:${textAccent} transition-all duration-300 hover:scale-110 p-3 rounded-full ${isDarkMode ? "bg-yellow-500/10" : "bg-yellow-400/20"} backdrop-blur-sm hover:shadow-lg`}
                >
                  <Linkedin size={24} />
                </Link>
                <Link
                  href="mailto:ahmed.jadani@atlascs.ma"
                  className={`${textSecondary} hover:${textAccent} transition-all duration-300 hover:scale-110 p-3 rounded-full ${isDarkMode ? "bg-yellow-500/10" : "bg-yellow-400/20"} backdrop-blur-sm hover:shadow-lg`}
                >
                  <Mail size={24} />
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => scrollToSection("contact")}
                  size="lg"
                  className={`bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 ${isDarkMode ? "text-black" : "text-white"} border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
                >
                  <Rocket className="mr-2" size={20} />
                  Let's Build Something Amazing
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className={`${isDarkMode ? "border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10" : "border-yellow-500/50 text-yellow-600 hover:bg-yellow-400/10"} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
                >
                  <Link href="https://atlascs.ma" target="_blank" rel="noopener noreferrer">
                    <Globe className="mr-2" size={20} />
                    Visit Atlas Cloud Services
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <ChevronDown
              size={32}
              className={`mx-auto ${textSecondary} animate-bounce cursor-pointer hover:${textAccent} transition-colors`}
              onClick={() => scrollToSection("about")}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-bold ${textPrimary} mb-6`}>About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto mb-6"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className={`${cardClasses} shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105`}>
              <CardContent className="p-8">
                <h3 className={`text-2xl font-semibold ${textPrimary} mb-6 flex items-center`}>
                  <Building2 className={`mr-3 ${textAccent}`} size={28} />
                  Atlas Cloud Services Journey
                </h3>
                <p className={`${textSecondary} mb-6 leading-relaxed`}>
                  As a Cloud Infrastructure Engineer at <span className={textAccent}>Atlas Cloud Services</span>,
                  Morocco's leading data center and public cloud provider, I architect and manage enterprise-grade
                  infrastructure serving clients across Morocco.
                </p>
                <p className={`${textSecondary} mb-6 leading-relaxed`}>
                  My expertise spans private cloud architecture, public cloud solutions, and hybrid infrastructure
                  design. I specialize in building scalable, secure, and cost-effective cloud platforms that enable
                  digital transformation for enterprises.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`flex items-center ${textSecondary}`}>
                    <MapPin size={20} className={`${textAccent} mr-3`} />
                    <span>Benguerir, Morocco</span>
                  </div>
                  <div className={`flex items-center ${textSecondary}`}>
                    <Zap size={20} className={`${textAccent} mr-3`} />
                    <span>Available for consulting</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-6">
              <Card
                className={`${isDarkMode ? "bg-gradient-to-br from-yellow-500/20 to-yellow-600/10" : "bg-gradient-to-br from-yellow-400/30 to-yellow-500/20"} backdrop-blur-md ${isDarkMode ? "border-yellow-400/30" : "border-yellow-500/40"} shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105`}
              >
                <CardContent className="p-6 text-center">
                  <div className={`text-4xl font-bold ${textPrimary} mb-2`}>3+</div>
                  <div className={`${textSecondary} text-sm`}>Years Experience</div>
                  <Star className={`mx-auto mt-2 ${textAccent}`} size={20} />
                </CardContent>
              </Card>

              <Card
                className={`${isDarkMode ? "bg-gradient-to-br from-yellow-600/20 to-yellow-500/10" : "bg-gradient-to-br from-yellow-500/30 to-yellow-400/20"} backdrop-blur-md ${isDarkMode ? "border-yellow-400/30" : "border-yellow-500/40"} shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105`}
              >
                <CardContent className="p-6 text-center">
                  <div className={`text-4xl font-bold ${textPrimary} mb-2`}>100+</div>
                  <div className={`${textSecondary} text-sm`}>Enterprise Clients</div>
                  <Users className={`mx-auto mt-2 ${textAccent}`} size={20} />
                </CardContent>
              </Card>

              <Card
                className={`${isDarkMode ? "bg-gradient-to-br from-yellow-400/20 to-yellow-500/10" : "bg-gradient-to-br from-yellow-300/30 to-yellow-400/20"} backdrop-blur-md ${isDarkMode ? "border-yellow-400/30" : "border-yellow-500/40"} shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105`}
              >
                <CardContent className="p-6 text-center">
                  <div className={`text-4xl font-bold ${textPrimary} mb-2`}>99.9%</div>
                  <div className={`${textSecondary} text-sm`}>Uptime SLA</div>
                  <TrendingUp className={`mx-auto mt-2 ${textAccent}`} size={20} />
                </CardContent>
              </Card>

              <Card
                className={`${isDarkMode ? "bg-gradient-to-br from-yellow-500/20 to-yellow-400/10" : "bg-gradient-to-br from-yellow-400/30 to-yellow-300/20"} backdrop-blur-md ${isDarkMode ? "border-yellow-400/30" : "border-yellow-500/40"} shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105`}
              >
                <CardContent className="p-6 text-center">
                  <div className={`text-4xl font-bold ${textPrimary} mb-2`}>1PB+</div>
                  <div className={`${textSecondary} text-sm`}>Data Managed</div>
                  <HardDrive className={`mx-auto mt-2 ${textAccent}`} size={20} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-bold ${textPrimary} mb-6`}>Technical Expertise</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto mb-6"></div>
            <p className={`${textSecondary} max-w-2xl mx-auto text-lg`}>
              Mastery across private cloud infrastructure, public cloud platforms, and enterprise data center operations
            </p>
          </div>

          <Card className={`${cardClasses} shadow-2xl`}>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                  <div key={index} className="group">
                    <Card
                      className={`${isDarkMode ? "bg-black/20" : "bg-white/40"} backdrop-blur-sm ${isDarkMode ? "border-yellow-400/20" : "border-yellow-500/30"} shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${isDarkMode ? "hover:bg-black/30" : "hover:bg-white/50"}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <skill.icon
                              size={24}
                              className={`${textAccent} mr-3 group-hover:scale-110 transition-transform`}
                            />
                            <div>
                              <h3 className={`font-semibold ${textPrimary} text-sm`}>{skill.name}</h3>
                              <Badge
                                variant="secondary"
                                className={`text-xs mt-1 ${isDarkMode ? "bg-yellow-500/20 text-yellow-300" : "bg-yellow-400/30 text-yellow-700"} border-0`}
                              >
                                {skill.category}
                              </Badge>
                            </div>
                          </div>
                          <div className={`${textAccent} font-bold text-sm`}>{skill.level}%</div>
                        </div>
                        <div className={`w-full ${isDarkMode ? "bg-gray-800/50" : "bg-gray-200/50"} rounded-full h-2`}>
                          <div
                            className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
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
              <Card
                key={index}
                className={`group hover:shadow-3xl transition-all duration-300 hover:scale-105 ${
                  project.featured
                    ? `${isDarkMode ? "bg-gradient-to-br from-black/50 to-yellow-900/20" : "bg-gradient-to-br from-white/70 to-yellow-100/50"} backdrop-blur-md ${isDarkMode ? "border-yellow-400/40" : "border-yellow-500/50"}`
                    : cardClasses
                } shadow-2xl`}
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
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black border-0">
                      <Star size={14} className="mr-1" />
                      Featured
                    </Badge>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge
                      className={`${isDarkMode ? "bg-black/50 text-yellow-400" : "bg-white/70 text-yellow-600"} border-0`}
                    >
                      GitHub Project
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className={`text-xl ${textPrimary} group-hover:${textAccent} transition-colors`}>
                    {project.title}
                  </CardTitle>
                  <CardDescription className={textSecondary}>{project.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  {/* Project Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className={`text-lg font-bold ${textAccent}`}>{value}</div>
                        <div className={`text-xs ${textSecondary} capitalize`}>{key}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="outline"
                        className={`${isDarkMode ? "border-yellow-400/40 text-yellow-300 bg-yellow-500/10" : "border-yellow-500/50 text-yellow-700 bg-yellow-400/20"} hover:${isDarkMode ? "bg-yellow-500/20" : "bg-yellow-400/30"} transition-colors`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className={`${isDarkMode ? "border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10" : "border-yellow-500/50 text-yellow-600 hover:bg-yellow-400/10"} backdrop-blur-sm flex-1`}
                    >
                      <Link href={project.link}>
                        <ExternalLink size={16} className="mr-2" />
                        Case Study
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className={`${isDarkMode ? "border-yellow-400/30 text-yellow-300 hover:bg-yellow-400/10" : "border-yellow-500/40 text-yellow-600 hover:bg-yellow-400/10"} backdrop-blur-sm flex-1`}
                    >
                      <Link href={project.github}>
                        <Github size={16} className="mr-2" />
                        Architecture
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-bold ${textPrimary} mb-6`}>Let's Connect</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto mb-6"></div>
            <p className={`${textSecondary} max-w-2xl mx-auto text-lg`}>
              Ready to discuss cloud infrastructure, data center solutions, or collaboration opportunities? Let's build
              something amazing together.
            </p>
          </div>

          <div className="grid lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
            <Card className={`${cardClasses} shadow-2xl hover:shadow-3xl transition-all duration-300`}>
              <CardContent className="p-8">
                <h3 className={`text-2xl font-semibold ${textPrimary} mb-6 flex items-center`}>
                  <Rocket className={`mr-3 ${textAccent}`} size={28} />
                  Let's Build the Future
                </h3>
                <p className={`${textSecondary} mb-8 leading-relaxed`}>
                  Whether you're looking for cloud infrastructure consulting, data center solutions, or want to discuss
                  the latest in cloud technology, I'm always excited to connect with fellow innovators and industry
                  leaders.
                </p>

                <div className="space-y-6">
                  <div
                    className={`flex items-center p-4 rounded-lg ${isDarkMode ? "bg-yellow-500/10" : "bg-yellow-400/20"} backdrop-blur-sm`}
                  >
                    <Mail size={20} className={`${textAccent} mr-4`} />
                    <div>
                      <div className={`${textPrimary} font-medium`}>ahmed.jadani@atlascs.ma</div>
                      <div className={`${textSecondary} text-sm`}>Professional inquiries</div>
                    </div>
                  </div>
                  <div
                    className={`flex items-center p-4 rounded-lg ${isDarkMode ? "bg-yellow-500/10" : "bg-yellow-400/20"} backdrop-blur-sm`}
                  >
                    <Phone size={20} className={`${textAccent} mr-4`} />
                    <div>
                      <div className={`${textPrimary} font-medium`}>+212 708 429 995</div>
                      <div className={`${textSecondary} text-sm`}>Available 9 AM - 6 PM GMT+1</div>
                    </div>
                  </div>
                  <div
                    className={`flex items-center p-4 rounded-lg ${isDarkMode ? "bg-yellow-500/10" : "bg-yellow-400/20"} backdrop-blur-sm`}
                  >
                    <Building2 size={20} className={`${textAccent} mr-4`} />
                    <div>
                      <div className={`${textPrimary} font-medium`}>Atlas Cloud Services</div>
                      <div className={`${textSecondary} text-sm`}>Benguerir, Morocco</div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 mt-8 justify-center">
                  <Link
                    href="https://github.com/0xPacman"
                    className={`${textSecondary} hover:${textAccent} transition-all duration-300 hover:scale-110 p-3 rounded-full ${isDarkMode ? "bg-yellow-500/10" : "bg-yellow-400/20"} backdrop-blur-sm`}
                  >
                    <Github size={24} />
                  </Link>
                  <Link
                    href="https://linkedin.com/in/0xpacman"
                    className={`${textSecondary} hover:${textAccent} transition-all duration-300 hover:scale-110 p-3 rounded-full ${isDarkMode ? "bg-yellow-500/10" : "bg-yellow-400/20"} backdrop-blur-sm`}
                  >
                    <Linkedin size={24} />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Card className={`${cardClasses} shadow-2xl`}>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-black font-bold text-sm">0x</span>
                </div>
                <span className={`${textPrimary} font-semibold`}>Ahmed Jadani (@0xPacman)</span>
              </div>
              <p className={textSecondary}>© {new Date().getFullYear()} Ahmed Jadani. All rights reserved.</p>
              
            </CardContent>
          </Card>
        </div>
      </footer>
    </div>
  )
}
