"use client"

import React from "react"
import { useGsapSectionReveal } from "@/components/gsap-section-reveal"
import { useGsapFloatingShapes } from "@/components/gsap-floating-shapes"
import { Header } from "@/components/sections/Header"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Skills } from "@/components/sections/Skills"
import { Projects } from "@/components/sections/Projects"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("home")
  const [isDarkMode, setIsDarkMode] = React.useState(true)

  const aboutRef = React.useRef<HTMLDivElement>(null)
  const skillsRef = React.useRef<HTMLDivElement>(null)
  const projectsRef = React.useRef<HTMLDivElement>(null)
  const contactRef = React.useRef<HTMLDivElement>(null)
  const shape1 = React.useRef<HTMLDivElement>(null)
  const shape2 = React.useRef<HTMLDivElement>(null)
  const shape3 = React.useRef<HTMLDivElement>(null)

  useGsapSectionReveal([aboutRef, skillsRef, projectsRef, contactRef])
  useGsapFloatingShapes([shape1, shape2, shape3])

  // Effect to update document class when theme changes
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  React.useEffect(() => {
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

  const themeClasses = isDarkMode
    ? "bg-gradient-to-br from-black via-gray-900 to-yellow-900"
    : "bg-gradient-to-br from-white via-yellow-50 to-yellow-100"

  return (
    <div className={`min-h-screen ${themeClasses} relative overflow-hidden transition-all duration-500`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={shape1}
          className={`absolute -top-40 -right-40 w-80 h-80 ${isDarkMode ? "bg-yellow-500/20" : "bg-yellow-400/30"} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse`}
        ></div>
        <div
          ref={shape2}
          className={`absolute -bottom-40 -left-40 w-80 h-80 ${isDarkMode ? "bg-yellow-600/20" : "bg-yellow-500/30"} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000`}
        ></div>
        <div
          ref={shape3}
          className={`absolute top-40 left-40 w-80 h-80 ${isDarkMode ? "bg-yellow-400/20" : "bg-yellow-300/30"} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000`}
        ></div>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-yellow-400 rotate-45 animate-bounce animation-delay-1000"></div>
        <div className="absolute bottom-40 right-40 w-6 h-6 border-2 border-yellow-400 rotate-45 animate-spin"></div>
        <div className="absolute top-60 left-20 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
      </div>

      {/* Header */}
      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        scrollToSection={scrollToSection}
      />

      {/* Hero Section */}
      <Hero isDarkMode={isDarkMode} scrollToSection={scrollToSection} />

      {/* About Section */}
      <About isDarkMode={isDarkMode} aboutRef={aboutRef} />

      {/* Skills Section */}
      <Skills isDarkMode={isDarkMode} skillsRef={skillsRef} />

      {/* Projects Section */}
      <Projects isDarkMode={isDarkMode} projectsRef={projectsRef} />

      {/* Contact Section */}
      <Contact isDarkMode={isDarkMode} contactRef={contactRef} />

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}
