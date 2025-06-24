'use client'

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail, Phone, Building2, Rocket } from "lucide-react"
import Link from "next/link"

interface ContactProps {
  isDarkMode: boolean
  contactRef: React.RefObject<HTMLDivElement>
}

export const Contact: React.FC<ContactProps> = ({ isDarkMode, contactRef }) => {
  const cardClasses = isDarkMode
    ? "bg-black/40 backdrop-blur-md border-yellow-500/30"
    : "bg-white/60 backdrop-blur-md border-yellow-400/40"
  const textPrimary = "text-foreground"
  const textSecondary = "text-muted-foreground"
  const textAccent = "text-amber-500 dark:text-amber-400"

  return (
    <section id="contact" ref={contactRef} className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
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
  )
}
