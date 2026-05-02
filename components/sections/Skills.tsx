'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Cloud, Server, Shield, Code, Monitor, Building2, HardDrive, Zap, ChevronDown } from 'lucide-react'

interface SkillsProps {
  isDarkMode: boolean
  skillsRef: React.RefObject<HTMLDivElement>
}

interface SkillItem { name: string; icon: React.ElementType; level: number; color: string; certified?: boolean; details: string }
interface SkillGroup { key: string; title: string; description: string; icon: React.ElementType; items: SkillItem[] }

const groups: SkillGroup[] = [
  { key: 'programming', title: 'Programming & Scripting', description: 'Core languages & low-level tooling (custom allocators, shells).', icon: Code, items: [
    { name: 'C', icon: Code, level: 94, color: 'from-sky-500 to-blue-500', certified: true, details: 'Custom memory allocators, system-level programming, UNIX internals. Built custom shells, parsers, and low-level networking tools.' },
    { name: 'C++', icon: Code, level: 72, color: 'from-indigo-500 to-purple-500', certified: true, details: 'OOP design patterns, STL containers, smart pointers. Developed desktop applications including AD Manager.' },
    { name: 'Python', icon: Code, level: 84, color: 'from-yellow-500 to-orange-500', certified: true, details: 'Scripting & automation, REST API integrations, infrastructure tooling. OpenStack SDK, VMware pyvmomi, Ansible module development.' },
    { name: 'TypeScript', icon: Code, level: 60, color: 'from-blue-400 to-sky-400', details: 'Next.js & React development, type-safe APIs, component architecture for web applications.' },
    { name: 'PowerShell', icon: Code, level: 80, color: 'from-blue-600 to-cyan-500', details: 'Windows Server automation, Active Directory bulk operations, Exchange management, and GPO scripting.' },
    { name: 'Bash', icon: Code, level: 93, color: 'from-emerald-500 to-teal-500', certified: true, details: 'Advanced shell scripting, cron automation, CI/CD pipelines, system monitoring scripts, and server provisioning.' },
  ]},
  { key: 'cloud', title: 'Cloud & Infrastructure', description: 'Public & private cloud platforms, virtualization & hyperconverged infrastructure.', icon: Cloud, items: [
    { name: 'Oracle Cloud', icon: Cloud, level: 90, color: 'from-red-500 to-orange-500', certified: true, details: 'OCI compute, networking & storage. Architected multi-tier deployments with VCN peering, load balancers, and autonomous DB.' },
    { name: 'Azure', icon: Cloud, level: 90, color: 'from-blue-500 to-cyan-500', details: 'Azure VMs, VNETs, App Services, AKS, and Azure AD. Hybrid identity and governance policies for enterprise tenants.' },
    { name: 'Google Cloud', icon: Cloud, level: 85, color: 'from-green-500 to-emerald-500', details: 'GCE, GKE, Cloud Run, IAM, and VPC networking. Experience with BigQuery and Cloud Functions for event-driven workloads.' },
    { name: 'OpenStack', icon: Cloud, level: 88, color: 'from-teal-500 to-cyan-500', details: 'Multi-node deployment & day-2 operations: Nova, Neutron, Cinder, Glance, Keystone. Automated provisioning with Heat templates.' },
    { name: 'Harvester', icon: Cloud, level: 50, color: 'from-lime-500 to-emerald-500', details: 'HCI platform built on Kubernetes. Basic VM lifecycle management and Rancher integration.' },
    { name: 'Proxmox', icon: Cloud, level: 50, color: 'from-stone-500 to-neutral-400', details: 'KVM/LXC virtualization, cluster setup, ZFS storage management, and backup scheduling.' },
    { name: 'Dell VxRail', icon: Server, level: 98, color: 'from-purple-500 to-violet-500', certified: true, details: 'Full lifecycle management — deployment, upgrades, expansion, and troubleshooting. Single point of contact for VxRail at Atlas Cloud Services.' },
    { name: 'VMware vSphere', icon: Server, level: 95, color: 'from-indigo-500 to-blue-500', certified: true, details: 'vCenter, ESXi, vSAN, DRS/HA/FT, vMotion. Designed and operated clusters serving 100+ enterprise workloads.' },
    { name: 'Nutanix HCI (AOS/AHV)', icon: Server, level: 89, color: 'from-pink-500 to-rose-500', certified: true, details: 'Prism Central/Element, AHV hypervisor, cluster expansion, data protection policies, and capacity planning.' },
  ]},
  { key: 'containers', title: 'Containers & Orchestration', description: 'Image lifecycle, runtime & cluster scheduling.', icon: Server, items: [
    { name: 'Docker', icon: Server, level: 95, color: 'from-blue-600 to-blue-400', details: 'Multi-stage builds, Docker Compose, private registries, networking, volume management, and production hardening.' },
    { name: 'Podman', icon: Server, level: 85, color: 'from-sky-500 to-cyan-500', details: 'Rootless containers, systemd integration, pod-level management, and OCI-compliant image builds.' },
    { name: 'Kubernetes', icon: Server, level: 84, color: 'from-yellow-500 to-orange-500', details: 'Deployments, Services, Ingress, RBAC, Helm charts. Managed clusters on-prem and on cloud (AKS/GKE).' },
  ]},
  { key: 'automation', title: 'Automation & Configuration', description: 'Infrastructure as Code, provisioning & policy automation.', icon: Code, items: [
    { name: 'Terraform', icon: Code, level: 70, color: 'from-fuchsia-500 to-purple-500', details: 'Multi-provider IaC — vSphere, OCI, Azure. State management, modules, and CI/CD-driven plan/apply workflows.' },
    { name: 'VMware Aria Automation', icon: Code, level: 60, color: 'from-indigo-500 to-violet-500', certified: true, details: 'Cloud templates, ABX actions, custom resources, and self-service catalog for VM provisioning.' },
    { name: 'Ansible', icon: Code, level: 88, color: 'from-red-600 to-red-400', details: 'Playbooks, roles, inventory management, Ansible Vault. Automated OS patching, config hardening, and application deployment.' },
  ]},
  { key: 'network', title: 'Network & Security', description: 'Virtual networking & perimeter / segmentation security.', icon: Shield, items: [
    { name: 'VMware NSX', icon: Shield, level: 70, color: 'from-orange-500 to-red-500', certified: true, details: 'Micro-segmentation, distributed firewall policies, T0/T1 gateways, and overlay networking for multi-tenant environments.' },
    { name: 'Cisco ASA', icon: Shield, level: 68, color: 'from-amber-500 to-orange-500', details: 'Firewall ACLs, site-to-site VPN, NAT rules, and high-availability failover configuration.' },
    { name: 'Fortinet Firewall', icon: Shield, level: 60, color: 'from-lime-500 to-green-500', details: 'FortiGate policy management, SSL inspection, SD-WAN basics, and FortiAnalyzer log integration.' },
    { name: 'Active Directory', icon: Shield, level: 92, color: 'from-indigo-500 to-indigo-300', details: 'Domain controllers, GPO design, OU structure, AD replication, trusts, LDAP/Kerberos, and bulk user management.' },
    { name: 'DNS Management', icon: Shield, level: 88, color: 'from-cyan-500 to-sky-500', details: 'Internal/external DNS architecture, zone delegation, conditional forwarding, DNSSEC, and split-brain DNS.' },
    { name: 'Penetration Testing', icon: Shield, level: 60, color: 'from-red-500 to-rose-600', details: 'Vulnerability discovery and exploitation across web apps, APIs, and network services. Active bug hunter on HackerOne — reported and disclosed real-world vulnerabilities. Skills built through hands-on CTF competitions and offensive security labs.' },
  ]},
  { key: 'protection', title: 'Data Protection', description: 'Backup, recovery & continuity tooling.', icon: HardDrive, items: [
    { name: 'Veeam Backup', icon: HardDrive, level: 90, color: 'from-emerald-500 to-teal-500', certified: true, details: 'Backup jobs, replication, SureBackup verification, restore operations, and Veeam ONE monitoring for VMware & Nutanix.' },
  ]},
  { key: 'observability', title: 'Monitoring & Observability', description: 'Telemetry, analytics & operational insights.', icon: Monitor, items: [
    { name: 'Zabbix', icon: Monitor, level: 72, color: 'from-violet-500 to-purple-500', details: 'Template creation, custom triggers, SNMP monitoring, dashboard design, and alerting integrations.' },
    { name: 'VMware Aria Operations™', icon: Monitor, level: 90, color: 'from-blue-500 to-indigo-500', certified: true, details: 'Capacity planning, workload optimization, custom dashboards, alerts, and compliance scorecards across vSphere environments.' },
    { name: 'VMware Aria Operations™ for Logs', icon: Monitor, level: 83, color: 'from-cyan-500 to-teal-500', certified: true, details: 'Centralized log aggregation, content packs, log queries, and alert-driven troubleshooting for infrastructure events.' },
    { name: 'VMware Aria Operations™ for Networks', icon: Monitor, level: 76, color: 'from-teal-500 to-cyan-500', certified: true, details: 'Network flow analysis, micro-segmentation planning, application dependency mapping, and path troubleshooting.' },
  ]},
  { key: 'governance', title: 'Management & Governance', description: 'Process frameworks enabling service maturity.', icon: Building2, items: [
    { name: 'ITIL', icon: Building2, level: 65, color: 'from-slate-500 to-gray-500', certified: true, details: 'Incident, change, and problem management processes. Service catalog design and SLA/OLA frameworks.' },
    { name: 'FinOps', icon: Building2, level: 55, color: 'from-amber-500 to-yellow-500', details: 'Cloud cost allocation, showback/chargeback models, rightsizing recommendations, and reserved instance planning.' },
  ]},
]

const groupVariant = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: .45 } }, exit: { opacity: 0, y: 12, transition: { duration: .2 } } }
const cardVariant = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 140, damping: 20 } } }

export const Skills = ({ isDarkMode, skillsRef }: SkillsProps) => {
  const [open, setOpen] = React.useState<Set<string>>(new Set(groups.map(g => g.key)))
  const toggle = (k: string) => setOpen((p: Set<string>) => { const n = new Set(p); if (n.has(k)) { n.delete(k) } else { n.add(k) } return n })
  const [expandedSkill, setExpandedSkill] = React.useState<string | null>(null)
  const toggleSkill = (name: string) => setExpandedSkill(prev => prev === name ? null : name)

  // Theming helpers
  const groupContainerBase = isDarkMode
    ? 'rounded-xl border border-yellow-500/15 bg-black/30'
    : 'rounded-xl border border-yellow-500/30 bg-white/70 backdrop-blur-sm'

  const headerIconWrap = isDarkMode
    ? 'p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500/80 shadow-sm'
    : 'p-2 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-400/80 shadow-sm'

  const progressTrack = isDarkMode
    ? 'h-1.5 rounded-full overflow-hidden bg-gray-700/50'
    : 'h-1.5 rounded-full overflow-hidden bg-yellow-200/50'

  const collapsibleHover = isDarkMode ? 'hover:bg-yellow-500/5' : 'hover:bg-amber-100/40'

  const rowHover = isDarkMode
    ? 'hover:bg-yellow-500/5'
    : 'hover:bg-amber-50/60'

  return (
    <div ref={skillsRef} className="space-y-5">
      <div className="flex items-center gap-3 mb-1">
        <div className="h-7 w-0.5 rounded-full bg-gradient-to-b from-amber-400 to-yellow-600" />
        <div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`font-mono text-[10px] mb-0.5 ${isDarkMode ? 'text-yellow-500/40' : 'text-yellow-600/50'}`}>~/skills</motion.div>
          <motion.h2 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills</motion.h2>
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {groups.map((group: SkillGroup) => {
            const GIcon = group.icon
            const opened = open.has(group.key)
            return (
              <motion.div key={group.key} variants={groupVariant} initial="hidden" animate="visible" exit="exit" layout className={`${groupContainerBase} overflow-hidden`}>
                <button onClick={() => toggle(group.key)} className={`w-full text-left px-4 py-2.5 flex items-center gap-3 ${collapsibleHover} transition`}>
                  <div className={headerIconWrap}>
                    <GIcon className="text-black" size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-medium text-yellow-400 tracking-tight">{group.title}</h3>
                      <Badge variant="outline" className="h-4 px-1.5 text-[9px] border-yellow-500/30 text-yellow-400 bg-yellow-500/5">{group.items.length}</Badge>
                    </div>
                  </div>
                  <motion.div animate={{ rotate: opened ? 180 : 0 }} className="ml-auto text-yellow-500">
                    <Zap size={12} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {opened && (
                    <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .25 }} className="px-3 pb-3">
                      {/* Compact list rows */}
                      <div className="divide-y divide-yellow-500/10">
                        {group.items.map((item: SkillItem) => {
                          const isExpanded = expandedSkill === item.name
                          return (
                          <div key={item.name}>
                            <button onClick={() => toggleSkill(item.name)} className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg ${rowHover} transition-colors cursor-pointer`}>
                            {/* Color dot */}
                            <div className={`h-2 w-2 rounded-full flex-shrink-0 bg-gradient-to-r ${item.color}`} />

                            {/* Name + certified badge */}
                            <span className="text-sm font-medium text-foreground flex-shrink-0 min-w-0 truncate">
                              {item.name}
                            </span>
                            {item.certified && (
                              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-yellow-500/15 text-yellow-600 dark:text-yellow-300 border border-yellow-500/25 flex-shrink-0">
                                Certified
                              </span>
                            )}

                            {/* Progress bar — fills remaining space */}
                            <div className="flex-1 flex items-center gap-2 min-w-0">
                              <div className={`flex-1 ${progressTrack}`}>
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: item.level + '%' }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.7, ease: 'easeOut', delay: .1 }}
                                  className={`h-full bg-gradient-to-r ${item.color}`}
                                />
                              </div>
                              <span className="text-[11px] tabular-nums text-muted-foreground w-8 text-right flex-shrink-0">{item.level}%</span>
                            </div>

                            {/* Expand chevron */}
                            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: .2 }} className="flex-shrink-0 text-muted-foreground">
                              <ChevronDown size={12} />
                            </motion.div>
                            </button>

                            {/* Expandable details */}
                            <AnimatePresence initial={false}>
                              {isExpanded && item.details && (
                                <motion.div
                                  key="details"
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: .2 }}
                                  className="overflow-hidden"
                                >
                                  <p className={`text-xs leading-relaxed px-7 pb-2 pt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {item.details}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )})}
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
