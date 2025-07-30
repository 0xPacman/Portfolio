'use client'

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, MapPin, Zap, Star, Users, TrendingUp, HardDrive } from "lucide-react"
import Image from "next/image"

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
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className={`text-3xl font-bold ${textPrimary} mb-4`}>About Me</h2>
      </div>

      <div className="space-y-6">
        {/* Profile section with image */}
        <div className="flex flex-col lg:flex-row gap-8 items-center mb-8">
          <div className="relative flex-shrink-0">
            <div className="relative">
              <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-yellow-500/30 shadow-2xl shadow-yellow-500/30">
                <Image
                  src="/media/PDP.jpg"
                  alt="Ahmed Jadani"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Yellow glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-yellow-500/20 to-yellow-600/10 pointer-events-none"></div>
            </div>
          </div>
          
          <div className="flex-1 text-center lg:text-left">
            <h3 className={`text-2xl font-bold ${textPrimary} mb-3`}>Ahmed Jadani</h3>
            <p className={`${textAccent} text-lg font-semibold mb-4`}>Cloud Infrastructure Engineer</p>
            <p className={`${textSecondary} leading-relaxed`}>
              Passionate about building scalable, secure cloud solutions and driving digital transformation 
              through innovative infrastructure design and automation.
            </p>
          </div>
        </div>

        <Card className={`${cardClasses} shadow-xl hover:shadow-2xl transition-all duration-300`}>
          <CardContent className="p-6">
            <h3 className={`text-xl font-semibold ${textPrimary} mb-4 flex items-center`}>
              <Building2 className={`mr-3 ${textAccent}`} size={24} />
              Atlas Cloud Services Journey
            </h3>
            <p className={`${textSecondary} mb-4 leading-relaxed`}>
              As a Cloud Infrastructure Engineer at <span className={textAccent}>Atlas Cloud Services</span>,
              Morocco's leading data center and public cloud provider, I architect and manage enterprise-grade
              infrastructure serving clients across Morocco.
            </p>
            <p className={`${textSecondary} leading-relaxed`}>
              My expertise spans private cloud architecture, public cloud solutions, and hybrid infrastructure
              design. I specialize in building scalable, secure, and cost-effective cloud platforms that enable
              digital transformation for enterprises.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
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

        <div className="grid grid-cols-2 gap-4">
          <Card
            className={`${isDarkMode ? "bg-gradient-to-br from-yellow-500/20 to-yellow-600/10" : "bg-gradient-to-br from-yellow-400/30 to-yellow-500/20"} backdrop-blur-md ${isDarkMode ? "border-yellow-400/30" : "border-yellow-500/40"} shadow-xl hover:shadow-2xl transition-all duration-300`}
          >
            <CardContent className="p-4 text-center">
              <div className={`text-3xl font-bold ${textPrimary} mb-2`}>3+</div>
              <div className={`${textSecondary} text-sm`}>Years Experience</div>
              <div className={`${textSecondary} text-xs mt-1 opacity-75`}>(+5 years in total IT experience)</div>
              <Star className={`mx-auto mt-2 ${textAccent}`} size={20} />
            </CardContent>
          </Card>

          <Card
            className={`${isDarkMode ? "bg-gradient-to-br from-yellow-600/20 to-yellow-500/10" : "bg-gradient-to-br from-yellow-500/30 to-yellow-400/20"} backdrop-blur-md ${isDarkMode ? "border-yellow-400/30" : "border-yellow-500/40"} shadow-xl hover:shadow-2xl transition-all duration-300`}
          >
            <CardContent className="p-4 text-center">
              <div className={`text-3xl font-bold ${textPrimary} mb-2`}>100+</div>
              <div className={`${textSecondary} text-sm`}>Enterprise Clients</div>
              <Users className={`mx-auto mt-2 ${textAccent}`} size={20} />
            </CardContent>
          </Card>

          <Card
            className={`${isDarkMode ? "bg-gradient-to-br from-yellow-400/20 to-yellow-500/10" : "bg-gradient-to-br from-yellow-300/30 to-yellow-400/20"} backdrop-blur-md ${isDarkMode ? "border-yellow-400/30" : "border-yellow-500/40"} shadow-xl hover:shadow-2xl transition-all duration-300`}
          >
            <CardContent className="p-4 text-center">
              <div className={`text-3xl font-bold ${textPrimary} mb-2`}>99.9%</div>
              <div className={`${textSecondary} text-sm`}>Uptime SLA</div>
              <TrendingUp className={`mx-auto mt-2 ${textAccent}`} size={20} />
            </CardContent>
          </Card>

          <Card
            className={`${isDarkMode ? "bg-gradient-to-br from-yellow-500/20 to-yellow-400/10" : "bg-gradient-to-br from-yellow-400/30 to-yellow-300/20"} backdrop-blur-md ${isDarkMode ? "border-yellow-400/30" : "border-yellow-500/40"} shadow-xl hover:shadow-2xl transition-all duration-300`}
          >
            <CardContent className="p-4 text-center">
              <div className={`text-3xl font-bold ${textPrimary} mb-2`}>1PB+</div>
              <div className={`${textSecondary} text-sm`}>Data Managed</div>
              <HardDrive className={`mx-auto mt-2 ${textAccent}`} size={20} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
