'use client'

import React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface FooterProps {
  isDarkMode: boolean
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  const cardClasses = isDarkMode
    ? "bg-black/40 backdrop-blur-md border-yellow-500/30"
    : "bg-white/60 backdrop-blur-md border-yellow-400/40"
  const textPrimary = "text-foreground"
  const textSecondary = "text-muted-foreground"

  return (
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
  )
}
