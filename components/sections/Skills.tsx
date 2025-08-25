'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Cloud, Server, Shield, Code, Monitor, Building2, HardDrive, Zap } from 'lucide-react'

interface SkillsProps {
  isDarkMode: boolean
  skillsRef: React.RefObject<HTMLDivElement>
}

interface SkillItem { name: string; icon: any; level: number; color: string; certified?: boolean }
interface SkillGroup { key: string; title: string; description: string; icon: any; items: SkillItem[] }

const groups: SkillGroup[] = [
  { key: 'programming', title: 'Programming & Scripting', description: 'Core languages & low-level tooling (custom allocators, shells).', icon: Code, items: [
    { name: 'C', icon: Code, level: 94, color: 'from-sky-500 to-blue-500', certified: true },
    { name: 'C++', icon: Code, level: 72, color: 'from-indigo-500 to-purple-500', certified: true },
    { name: 'Python', icon: Code, level: 84, color: 'from-yellow-500 to-orange-500', certified: true },
    { name: 'PowerShell', icon: Code, level: 80, color: 'from-blue-600 to-cyan-500' },
    { name: 'Bash', icon: Code, level: 93, color: 'from-emerald-500 to-teal-500', certified: true },
  ]},
  { key: 'cloud', title: 'Cloud & Infrastructure', description: 'Public & private cloud platforms, virtualization & hyperconverged infrastructure.', icon: Cloud, items: [
    { name: 'Oracle Cloud', icon: Cloud, level: 90, color: 'from-red-500 to-orange-500' },
    { name: 'Azure', icon: Cloud, level: 90, color: 'from-blue-500 to-cyan-500' },
    { name: 'Google Cloud', icon: Cloud, level: 85, color: 'from-green-500 to-emerald-500' },
    { name: 'OpenStack', icon: Cloud, level: 88, color: 'from-teal-500 to-cyan-500' },
    { name: 'Harvester', icon: Cloud, level: 50, color: 'from-lime-500 to-emerald-500' },
    { name: 'Proxmox', icon: Cloud, level: 50, color: 'from-stone-500 to-neutral-400' },
    { name: 'Dell VxRail', icon: Server, level: 98, color: 'from-purple-500 to-violet-500' },
    { name: 'VMware vSphere', icon: Server, level: 95, color: 'from-indigo-500 to-blue-500' },
    { name: 'Nutanix HCI (AOS/AHV)', icon: Server, level: 89, color: 'from-pink-500 to-rose-500', certified: true },
  ]},
  { key: 'containers', title: 'Containers & Orchestration', description: 'Image lifecycle, runtime & cluster scheduling.', icon: Server, items: [
    { name: 'Docker', icon: Server, level: 95, color: 'from-blue-600 to-blue-400' },
    { name: 'Podman', icon: Server, level: 85, color: 'from-sky-500 to-cyan-500' },
    { name: 'Kubernetes', icon: Server, level: 84, color: 'from-yellow-500 to-orange-500' },
  ]},
  { key: 'automation', title: 'Automation & Configuration', description: 'Infrastructure as Code, provisioning & policy automation.', icon: Code, items: [
    { name: 'Terraform', icon: Code, level: 70, color: 'from-fuchsia-500 to-purple-500' },
    { name: 'VMware Aria Automation', icon: Code, level: 60, color: 'from-indigo-500 to-violet-500' },
    { name: 'Ansible', icon: Code, level: 88, color: 'from-red-600 to-red-400' },
  ]},
  { key: 'network', title: 'Network & Security', description: 'Virtual networking & perimeter / segmentation security.', icon: Shield, items: [
    { name: 'VMware NSX', icon: Shield, level: 70, color: 'from-orange-500 to-red-500' },
    { name: 'Cisco ASA', icon: Shield, level: 68, color: 'from-amber-500 to-orange-500' },
    { name: 'Fortinet Firewall', icon: Shield, level: 60, color: 'from-lime-500 to-green-500' },
  { name: 'Active Directory', icon: Shield, level: 92, color: 'from-indigo-500 to-indigo-300' },
  { name: 'DNS Management', icon: Shield, level: 88, color: 'from-cyan-500 to-sky-500' },
  ]},
  { key: 'protection', title: 'Data Protection', description: 'Backup, recovery & continuity tooling.', icon: HardDrive, items: [
    { name: 'Veeam Backup', icon: HardDrive, level: 90, color: 'from-emerald-500 to-teal-500', certified: true },
  ]},
  { key: 'observability', title: 'Monitoring & Observability', description: 'Telemetry, analytics & operational insights.', icon: Monitor, items: [
    { name: 'Zabbix', icon: Monitor, level: 72, color: 'from-violet-500 to-purple-500' },
    { name: 'VMware Aria Operations™', icon: Monitor, level: 90, color: 'from-blue-500 to-indigo-500' },
    { name: 'VMware Aria Operations™ for Logs', icon: Monitor, level: 83, color: 'from-cyan-500 to-teal-500' },
    { name: 'VMware Aria Operations™ for Networks', icon: Monitor, level: 76, color: 'from-teal-500 to-cyan-500' },
  ]},
  { key: 'governance', title: 'Management & Governance', description: 'Process frameworks enabling service maturity.', icon: Building2, items: [
    { name: 'ITIL', icon: Building2, level: 65, color: 'from-slate-500 to-gray-500', certified: true },
    { name: 'FinOps', icon: Building2, level: 55, color: 'from-amber-500 to-yellow-500' },
  ]},
]

const groupVariant = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: .45 } }, exit: { opacity: 0, y: 12, transition: { duration: .2 } } }
const cardVariant = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 140, damping: 20 } } }

export const Skills = ({ isDarkMode, skillsRef }: SkillsProps) => {
  const [open, setOpen] = React.useState<Set<string>>(new Set(groups.map(g => g.key)))
  const toggle = (k: string) => setOpen((p: Set<string>) => { const n = new Set(p); n.has(k) ? n.delete(k) : n.add(k); return n })

  // Theming helpers to avoid dull gray in light mode
  const groupContainerBase = isDarkMode
    ? 'rounded-xl border border-yellow-500/15 bg-black/30'
    : 'rounded-xl border border-yellow-500/30 bg-white/70 backdrop-blur-sm'

  const headerIconWrap = isDarkMode
    ? 'p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500/80 shadow-sm'
    : 'p-2 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-400/80 shadow-sm'

  const cardBase = isDarkMode
    ? 'relative overflow-hidden border border-yellow-500/10 hover:border-yellow-500/30 transition bg-gradient-to-br from-gray-900/30 to-gray-800/20'
    : 'relative overflow-hidden border border-yellow-500/20 hover:border-yellow-500/40 transition bg-gradient-to-br from-white to-amber-50/60'

  const progressTrack = isDarkMode
    ? 'relative h-2 rounded-full overflow-hidden bg-gray-700/50 ring-1 ring-inset ring-yellow-500/10'
    : 'relative h-2 rounded-full overflow-hidden bg-yellow-200/50 ring-1 ring-inset ring-yellow-500/20'

  const collapsibleHover = isDarkMode ? 'hover:bg-yellow-500/5' : 'hover:bg-amber-100/40'

  return (
    <div ref={skillsRef} className="space-y-5">
      <div className="flex flex-col gap-1">
        <motion.h2 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Skills</motion.h2>
        <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-muted-foreground">Condensed categorized overview.</motion.p>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {groups.map((group: SkillGroup) => {
            const GIcon = group.icon
            const opened = open.has(group.key)
            return (
              <motion.div key={group.key} variants={groupVariant} initial="hidden" animate="visible" exit="exit" layout className={`${groupContainerBase} overflow-hidden`}>
                <button onClick={() => toggle(group.key)} className={`w-full text-left px-4 py-3 flex items-start gap-3 ${collapsibleHover} transition`}>
                  <div className={headerIconWrap}>
                    <GIcon className="text-black" size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-medium text-yellow-400 tracking-tight">{group.title}</h3>
                      <Badge variant="outline" className="h-5 px-1.5 text-[10px] border-yellow-500/30 text-yellow-400 bg-yellow-500/5">{group.items.length}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground max-w-3xl leading-snug line-clamp-1">{group.description}</p>
                  </div>
                  <motion.div animate={{ rotate: opened ? 180 : 0 }} className="ml-auto text-yellow-500 mt-0.5">
                    <Zap size={14} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {opened && (
        <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .3 }} className="px-4 pb-4">
                      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
                        {group.items.map((item: SkillItem) => {
                          const Ico = item.icon
                          return (
                            <motion.div key={item.name} variants={cardVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group/card relative">
          <Card className={cardBase}>
                                <div className={`absolute inset-0 opacity-0 group-hover/card:opacity-10 transition-opacity bg-gradient-to-br ${item.color}`} />
                                <CardContent className="p-4 relative z-10 space-y-3">
                                  <div className="flex items-center gap-2.5">
                                    <div className={`p-2 rounded-md bg-gradient-to-br ${item.color}`}>
                                      <Ico className="text-white" size={16} />
                                    </div>
                                    <h4 className="font-medium text-xs tracking-wide flex items-center gap-1">
                                      {item.name}
                                      {item.certified && (
                                        <span className="text-[9px] font-semibold px-1 py-0.5 rounded bg-yellow-500/20 text-yellow-600 dark:text-yellow-300 dark:bg-yellow-400/20 border border-yellow-500/30">
                                          Certified
                                        </span>
                                      )}
                                    </h4>
                                  </div>
                                  <div className="space-y-1.5">
                                    <div className="flex justify-between text-[10px] uppercase tracking-wide font-medium text-yellow-500/70">
                                      <span>Level</span><span>{item.level}%</span>
                                    </div>
            <div className={progressTrack}>
                                      <motion.div initial={{ width: 0 }} whileInView={{ width: item.level + '%' }} viewport={{ once: true }} transition={{ duration: 0.9, ease: 'easeOut', delay: .15 }} className={`h-full relative bg-gradient-to-r ${item.color}`}>
                                        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,.25)_50%,rgba(255,255,255,0)_100%)] animate-pulse" />
                                      </motion.div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-[10px] text-yellow-400/80">
                                    <Zap size={12} />
                                    <span>{item.level >= 95 ? 'Expert' : item.level >= 85 ? 'Advanced' : item.level >= 70 ? 'Proficient' : 'Developing'}</span>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
