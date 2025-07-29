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
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className={`text-3xl font-bold ${textPrimary} mb-4`}>Technical Expertise</h2>
        <p className={`${textSecondary} max-w-2xl mx-auto`}>
          Mastery across private cloud infrastructure, public cloud platforms, and enterprise data center operations
        </p>
      </div>

      <div className="grid gap-4">
        {skills.map((skill, index) => {
          const Icon = skill.icon
          return (
            <div ref={skillRefs.current[index]} key={index}>
              <Card className={`${cardClasses} shadow-lg hover:shadow-xl transition-all duration-300 group`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`p-2 rounded-lg ${isDarkMode ? "bg-yellow-500/20" : "bg-yellow-400/30"}`}>
                        <Icon className={`${textAccent}`} size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className={`font-semibold ${textPrimary}`}>{skill.name}</h3>
                          <Badge variant="secondary" className={`${isDarkMode ? "bg-yellow-500/20 text-yellow-300" : "bg-yellow-400/30 text-yellow-700"} border-0 text-xs`}>
                            {skill.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`flex-1 h-2 rounded-full ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                            <div
                              className="skill-bar h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full transition-all duration-1000 ease-out"
                              data-level={skill.level}
                              style={{ width: "0%" }}
                            />
                          </div>
                          <span className={`text-sm font-medium ${textAccent} min-w-[3rem] text-right`}>
                            {skill.level}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}
