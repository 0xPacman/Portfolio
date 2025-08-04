'use client'

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cloud, Server, Shield, Code, Monitor, Building2, HardDrive, Zap } from "lucide-react"

interface SkillsProps {
  isDarkMode: boolean
  skillsRef: React.RefObject<HTMLDivElement>
}

const skills = [
  { name: "Oracle Cloud", icon: Cloud, level: 90, category: "Public Cloud", color: "from-red-500 to-orange-500" },
  { name: "Microsoft Azure", icon: Cloud, level: 90, category: "Public Cloud", color: "from-blue-500 to-cyan-500" },
  { name: "Google Cloud", icon: Cloud, level: 85, category: "Public Cloud", color: "from-green-500 to-emerald-500" },
  { name: "Dell VxRail", icon: Server, level: 98, category: "Infrastructure", color: "from-purple-500 to-violet-500" },
  { name: "VMware vSphere", icon: Server, level: 95, category: "Virtualization", color: "from-indigo-500 to-blue-500" },
  { name: "Nutanix", icon: Server, level: 87, category: "HCI", color: "from-pink-500 to-rose-500" },
  { name: "OpenStack", icon: Cloud, level: 88, category: "Private Cloud", color: "from-teal-500 to-cyan-500" },
  { name: "Kubernetes", icon: Server, level: 84, category: "Orchestration", color: "from-yellow-500 to-orange-500" },
  { name: "Docker & Podman", icon: Server, level: 95, category: "Containers", color: "from-blue-600 to-blue-400" },
  { name: "DevOps & Scripting", icon: Code, level: 90, category: "Automation", color: "from-green-600 to-green-400" },
  { name: "Ansible", icon: Code, level: 88, category: "Config Mgmt", color: "from-red-600 to-red-400" },
  { name: "VMware NSX", icon: Shield, level: 90, category: "Network Security", color: "from-orange-500 to-red-500" },
  { name: "Veeam Backup", icon: HardDrive, level: 90, category: "Data Protection", color: "from-emerald-500 to-teal-500" },
  { name: "Monitoring Stack", icon: Monitor, level: 92, category: "Observability", color: "from-violet-500 to-purple-500" },
  { name: "ITIL", icon: Building2, level: 85, category: "Management", color: "from-slate-500 to-gray-500" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  },
  hover: {
    scale: 1.05,
    y: -5,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
}

const progressVariants = {
  hidden: { width: 0 },
  visible: (level: number) => ({
    width: `${level}%`,
    transition: {
      duration: 1.5,
      ease: "easeOut",
      delay: 0.5
    }
  })
}

export const Skills = ({ isDarkMode, skillsRef }: SkillsProps) => {
  const textPrimary = "text-foreground"
  const textSecondary = "text-muted-foreground"

  return (
    <div className="space-y-8" ref={skillsRef}>
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={`text-4xl font-bold ${textPrimary} mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent`}>
          Technical Expertise
        </h2>
        <p className={`${textSecondary} max-w-3xl mx-auto text-lg`}>
          Mastery across cloud platforms, virtualization, and enterprise infrastructure with hands-on experience in Morocco's leading data center
        </p>
      </motion.div>

      {/* Skills Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skills.map((skill, index) => {
          const Icon = skill.icon
          return (
            <motion.div
              key={skill.name}
              variants={cardVariants}
              whileHover="hover"
              className="group"
            >
              <Card className={`h-full ${isDarkMode 
                ? "bg-black/40 border-yellow-500/20 hover:border-yellow-400/40" 
                : "bg-white/60 border-yellow-400/30 hover:border-yellow-500/50"
              } backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden relative`}>
                
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <CardContent className="p-6 relative z-10">
                  {/* Icon and Category */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${skill.color} shadow-lg`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`${isDarkMode 
                        ? "bg-yellow-500/20 text-yellow-300 border-yellow-400/30" 
                        : "bg-yellow-400/30 text-yellow-700 border-yellow-500/40"
                      } font-medium`}
                    >
                      {skill.category}
                    </Badge>
                  </div>

                  {/* Skill Name */}
                  <h3 className={`font-bold text-lg ${textPrimary} mb-4 group-hover:text-yellow-500 transition-colors`}>
                    {skill.name}
                  </h3>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-medium ${textSecondary}`}>Proficiency</span>
                      <span className={`text-sm font-bold text-yellow-500`}>{skill.level}%</span>
                    </div>
                    
                    <div className={`h-3 rounded-full overflow-hidden ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                      <motion.div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                        variants={progressVariants}
                        custom={skill.level}
                        initial="hidden"
                        animate="visible"
                      >
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Experience indicator */}
                  <div className="flex items-center mt-4 pt-4 border-t border-yellow-500/20">
                    <Zap className="text-yellow-500 mr-2" size={16} />
                    <span className={`text-xs ${textSecondary}`}>
                      {skill.level >= 95 ? "Expert Level" : skill.level >= 85 ? "Advanced" : "Proficient"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
