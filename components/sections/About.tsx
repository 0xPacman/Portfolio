'use client'

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, MapPin, Zap, Star, Users, TrendingUp, HardDrive } from "lucide-react"

interface AboutProps {
  isDarkMode: boolean
  aboutRef: React.RefObject<HTMLDivElement>
}

export const About: React.FC<AboutProps> = ({ isDarkMode, aboutRef }) => {
  const cardClasses = isDarkMode
    ? "bg-black/40 backdrop-blur-md border-yellow-500/30"
    : "bg-white/60 backdrop-blur-md border-yellow-400/40"
  const textPrimary = "text-foreground"
  const textSecondary = "text-muted-foreground"
  const textAccent = "text-amber-500 dark:text-amber-400"

  return (
    <section id="about" ref={aboutRef} className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
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
  )
}
