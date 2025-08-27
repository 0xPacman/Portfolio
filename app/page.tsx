"use client"

import React from "react"
import { About } from "@/components/sections/About"
import { Skills } from "@/components/sections/Skills"
import { Projects } from "@/components/sections/Projects"
import { Contact } from "@/components/sections/Contact"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Code, 
  Star, 
  Mail, 
  Github, 
  Linkedin, 
  Sun, 
  Moon,
  ExternalLink,
  MapPin,
  Building2,
  Zap,
  Menu,
  X
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
  const shape1 = React.useRef<HTMLDivElement>(null)
  const shape2 = React.useRef<HTMLDivElement>(null)
  const shape3 = React.useRef<HTMLDivElement>(null)

  // Effect to update document class when theme changes
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  // Close sidebar when clicking outside on mobile
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSidebarOpen && window.innerWidth < 1024) {
        const sidebar = document.getElementById('sidebar')
        const toggleButton = document.getElementById('sidebar-toggle')
        if (sidebar && toggleButton && 
            !sidebar.contains(event.target as Node) && 
            !toggleButton.contains(event.target as Node)) {
          setIsSidebarOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSidebarOpen])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const menuItems = [
    { id: "about", label: "About", icon: Users },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: Star },
    { id: "contact", label: "Contact", icon: Mail },
  ]

  const bgClasses = isDarkMode
    ? "bg-gradient-to-br from-black via-gray-900 to-yellow-900/20"
    : "bg-gradient-to-br from-white via-gray-50 to-yellow-50"

  const sidebarClasses = isDarkMode
    ? "bg-black/40 backdrop-blur-xl border-yellow-500/20"
    : "bg-white/60 backdrop-blur-xl border-yellow-400/30"

  const contentClasses = isDarkMode
    ? "bg-black/20 backdrop-blur-xl border-yellow-500/10"
    : "bg-white/40 backdrop-blur-xl border-yellow-400/20"

  const textPrimary = "text-foreground"
  const textSecondary = "text-muted-foreground"
  const textAccent = "text-yellow-500 dark:text-yellow-400"

  const renderContent = () => {
    switch (activeSection) {
      case "about":
        return <About isDarkMode={isDarkMode} aboutRef={aboutRef} />
      case "skills":
        return <Skills isDarkMode={isDarkMode} skillsRef={skillsRef} />
      case "projects":
        return <Projects isDarkMode={isDarkMode} projectsRef={projectsRef} />
      case "contact":
        return <Contact isDarkMode={isDarkMode} contactRef={contactRef} />
      default:
        return <About isDarkMode={isDarkMode} aboutRef={aboutRef} />
    }
  }

  return (
    <div 
      className={`min-h-screen ${bgClasses} relative overflow-hidden transition-all duration-500`}
      itemScope
      itemType="https://schema.org/WebPage"
    >
      {/* Structured data for the page */}
      <div itemProp="mainEntity" itemScope itemType="https://schema.org/Person" style={{ display: 'none' }}>
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
          <meta itemProp="url" content="https://atlascs.ma" />
        </div>
        <meta itemProp="sameAs" content="https://github.com/0xPacman" />
        <meta itemProp="sameAs" content="https://linkedin.com/in/0xpacman" />
      </div>
      {/* Mobile Sidebar Toggle Button */}
      <Button
        id="sidebar-toggle"
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 lg:hidden ${textSecondary} hover:text-yellow-500 transition-colors ${
          isDarkMode ? 'bg-black/40 backdrop-blur-xl' : 'bg-white/60 backdrop-blur-xl'
        } border border-yellow-500/20`}
      >
        {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          ref={shape1}
          className={`absolute -top-40 -right-40 w-96 h-96 ${isDarkMode ? "bg-yellow-500/10" : "bg-yellow-400/20"} rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float-1`}
        />
        <div
          ref={shape2}
          className={`absolute -bottom-40 -left-40 w-96 h-96 ${isDarkMode ? "bg-yellow-600/10" : "bg-yellow-500/20"} rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float-2`}
        />
        <div
          ref={shape3}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 ${isDarkMode ? "bg-yellow-400/5" : "bg-yellow-300/15"} rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float-3`}
        />
        
        {/* Geometric shapes */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-yellow-400/60 rotate-45 animate-bounce animation-delay-1000" />
        <div className="absolute bottom-40 right-40 w-6 h-6 border-2 border-yellow-400/60 rotate-45 animate-spin" />
        <div className="absolute top-60 left-20 w-3 h-3 bg-yellow-500/60 rounded-full animate-pulse" />
      </div>

      {/* Main Layout */}
      <div className="flex h-screen lg:static">
        {/* Sidebar */}
        <div 
          id="sidebar"
          className={`
            fixed lg:static inset-y-0 left-0 z-40
            w-80 ${sidebarClasses} border-r shadow-2xl flex flex-col
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          {/* Header/Profile Section */}
          <div className="p-8 border-b border-yellow-500/20">
            <div className="flex items-center justify-between mb-6">
              <Avatar className="w-16 h-16 ring-2 ring-yellow-500/50">
                <AvatarImage src="/media/PDP.jpg" alt="Ahmed Jadani" />
                <AvatarFallback className="bg-yellow-500 text-black font-bold text-xl">AJ</AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={`${textSecondary} hover:text-yellow-500 transition-colors`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
            
            <div className="space-y-2">
              <h1 className={`text-2xl font-bold ${textPrimary}`}>Ahmed Jadani</h1>
              <p className={`${textAccent} font-medium`}>Cloud Infrastructure Engineer</p>
              <div className={`flex items-center ${textSecondary} text-sm`}>
                <Building2 className="w-4 h-4 mr-2" />
                Atlas Cloud Services
              </div>
              <div className={`flex items-center ${textSecondary} text-sm`}>
                <MapPin className="w-4 h-4 mr-2" />
                Benguerir, Morocco
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <Link href="https://github.com/0xPacman" target="_blank">
                <Button variant="ghost" size="icon" className={`${textSecondary} hover:text-yellow-500`}>
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://linkedin.com/in/0xpacman" target="_blank">
                <Button variant="ghost" size="icon" className={`${textSecondary} hover:text-yellow-500`}>
                  <Linkedin className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://atlascs.ma" target="_blank">
                <Button variant="ghost" size="icon" className={`${textSecondary} hover:text-yellow-500`}>
                  <ExternalLink className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className={`text-center p-3 rounded-lg ${isDarkMode ? "bg-yellow-500/10" : "bg-yellow-400/20"}`}>
                <div className={`text-lg font-bold ${textAccent}`}>3+</div>
                <div className={`text-xs ${textSecondary}`}>Years Exp</div>
              </div>
              <div className={`text-center p-3 rounded-lg ${isDarkMode ? "bg-yellow-500/10" : "bg-yellow-400/20"}`}>
                <div className={`text-lg font-bold ${textAccent}`}>20+</div>
                <div className={`text-xs ${textSecondary}`}>Technologies</div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-6">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id)
                      // Close sidebar on mobile after selection
                      if (window.innerWidth < 1024) {
                        setIsSidebarOpen(false)
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                      isActive
                        ? `bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-lg shadow-yellow-500/30 transform scale-105`
                        : `${textSecondary} hover:bg-yellow-500/10 hover:text-yellow-500 hover:scale-105`
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-black" : "group-hover:text-yellow-500"}`} />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto">
                        <Zap className="w-4 h-4 text-black" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-yellow-500/20">
              <div className={`p-4 rounded-xl ${isDarkMode ? "bg-yellow-500/5" : "bg-yellow-400/10"} border border-yellow-500/20`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className={`text-sm font-medium ${textPrimary}`}>Available for consulting</span>
                </div>
                <p className={`text-xs ${textSecondary}`}>
                  Open to cloud & infrastructure consulting and exciting collaborations
                </p>
              </div>
            </div>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto lg:ml-0">
          <div className="h-full p-4 md:p-8 pt-16 lg:pt-8">
            <Card className={`h-full ${contentClasses} border shadow-2xl`}>
              <CardContent className="p-4 md:p-8 h-full overflow-auto">
                <div className="max-w-5xl mx-auto">
                  {renderContent()}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
