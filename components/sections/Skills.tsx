'use client'

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cloud, Server, Shield, Code, Monitor, Building2, HardDrive } from "lucide-react"
import { useGsapSkillsAnimation } from "@/components/gsap-skills-animation";

interface SkillsProps {
  isDarkMode: boolean
  skillsRef: React.RefObject<HTMLDivElement>
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

export const Skills = ({ isDarkMode, skillsRef }: SkillsProps) => {
  const skillRefs = React.useRef<React.RefObject<HTMLDivElement>[]>(skills.map(() => React.createRef()));
  useGsapSkillsAnimation(skillRefs.current);

  const cardClasses = isDarkMode
    ? "bg-black/40 backdrop-blur-md border-yellow-500/30"
    : "bg-white/60 backdrop-blur-md border-yellow-400/40"
  const textPrimary = "text-foreground"
  const textSecondary = "text-muted-foreground"
  const textAccent = "text-amber-500 dark:text-amber-400"

  return (
    <section id="skills" ref={skillsRef} className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
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
                <div key={index} className="group" ref={skillRefs.current[index]}>
                  <Card
                    className={`${isDarkMode ? "bg-black/20" : "bg-white/40"} backdrop-blur-sm ${isDarkMode ? "border-yellow-400/20" : "border-yellow-500/30"} shadow-xl transition-all duration-300 ${isDarkMode ? "hover:bg-black/30" : "hover:bg-white/50"}`}
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
                          className="skill-bar bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full"
                          data-level={skill.level}
                          style={{ width: `0%` }}
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
  )
}
