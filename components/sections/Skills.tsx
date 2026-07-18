'use client'

import React from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Cloud, Server, Shield, Code, Monitor, Building2, HardDrive, ChevronRight } from 'lucide-react'
import { SectionPrompt } from '@/components/shell/SectionPrompt'

interface SkillItem { name: string; level: number; certified?: boolean; details: string }
interface SkillGroup { key: string; title: string; icon: React.ElementType; items: SkillItem[] }

const groups: SkillGroup[] = [
  { key: 'programming', title: 'Programming & Scripting', icon: Code, items: [
    { name: 'C', level: 94, certified: true, details: 'Custom memory allocators, system-level programming, UNIX internals. Built custom shells, parsers, and low-level networking tools.' },
    { name: 'C++', level: 72, certified: true, details: 'OOP design patterns, STL containers, smart pointers. Developed desktop applications including AD Manager.' },
    { name: 'Python', level: 84, certified: true, details: 'Scripting & automation, REST API integrations, infrastructure tooling. OpenStack SDK, VMware pyvmomi, Ansible modules, and security PoCs.' },
    { name: 'TypeScript', level: 60, details: 'Next.js & React development, type-safe APIs, component architecture for web applications.' },
    { name: 'PowerShell', level: 80, details: 'Windows Server automation, Active Directory bulk operations, Exchange management, and GPO scripting.' },
    { name: 'Bash', level: 93, certified: true, details: 'Advanced shell scripting, cron automation, CI/CD pipelines, system monitoring scripts, and server provisioning.' },
  ]},
  { key: 'cloud', title: 'Cloud & Infrastructure', icon: Cloud, items: [
    { name: 'Oracle Cloud', level: 90, certified: true, details: 'OCI compute, networking & storage. Architected multi-tier deployments with VCN peering, load balancers, and autonomous DB.' },
    { name: 'Azure', level: 90, details: 'Azure VMs, VNETs, App Services, AKS, and Azure AD. Hybrid identity and governance policies for enterprise tenants.' },
    { name: 'Google Cloud', level: 85, details: 'GCE, GKE, Cloud Run, IAM, and VPC networking. Experience with BigQuery and Cloud Functions for event-driven workloads.' },
    { name: 'OpenStack', level: 88, details: 'Multi-node deployment & day-2 operations: Nova, Neutron, Cinder, Glance, Keystone. Automated provisioning with Heat templates.' },
    { name: 'Dell VxRail', level: 98, certified: true, details: 'Full lifecycle management, deployment, upgrades, expansion, troubleshooting. Single point of contact for VxRail at Atlas Cloud Services.' },
    { name: 'VMware vSphere', level: 95, certified: true, details: 'vCenter, ESXi, vSAN, DRS/HA/FT, vMotion. Designed and operated clusters serving 100+ enterprise workloads.' },
    { name: 'Nutanix HCI (AOS/AHV)', level: 89, certified: true, details: 'Prism Central/Element, AHV hypervisor, cluster expansion, data protection policies, and capacity planning.' },
    { name: 'Proxmox', level: 50, details: 'KVM/LXC virtualization, cluster setup, ZFS storage management, and backup scheduling.' },
  ]},
  { key: 'containers', title: 'Containers & Orchestration', icon: Server, items: [
    { name: 'Docker', level: 95, details: 'Multi-stage builds, Docker Compose, private registries, networking, volume management, and production hardening.' },
    { name: 'Podman', level: 85, details: 'Rootless containers, systemd integration, pod-level management, and OCI-compliant image builds.' },
    { name: 'Kubernetes', level: 84, details: 'Deployments, Services, Ingress, RBAC, Helm charts. Managed clusters on-prem and on cloud (AKS/GKE).' },
  ]},
  { key: 'automation', title: 'Automation & Configuration', icon: Code, items: [
    { name: 'Terraform', level: 70, details: 'Multi-provider IaC, vSphere, OCI, Azure. State management, modules, and CI/CD-driven plan/apply workflows.' },
    { name: 'VMware Aria Automation', level: 60, certified: true, details: 'Cloud templates, ABX actions, custom resources, and self-service catalog for VM provisioning.' },
    { name: 'Ansible', level: 88, details: 'Playbooks, roles, inventory management, Ansible Vault. Automated OS patching, config hardening, and app deployment.' },
  ]},
  { key: 'network', title: 'Network & Security', icon: Shield, items: [
    { name: 'VMware NSX', level: 70, certified: true, details: 'Micro-segmentation, distributed firewall policies, T0/T1 gateways, and overlay networking for multi-tenant environments.' },
    { name: 'Cisco ASA', level: 68, details: 'Firewall ACLs, site-to-site VPN, NAT rules, and high-availability failover configuration.' },
    { name: 'Fortinet Firewall', level: 60, details: 'FortiGate policy management, SSL inspection, SD-WAN basics, and FortiAnalyzer log integration.' },
    { name: 'Active Directory', level: 92, details: 'Domain controllers, GPO design, OU structure, replication, trusts, LDAP/Kerberos, and bulk user management.' },
    { name: 'DNS Management', level: 88, details: 'Internal/external DNS architecture, zone delegation, conditional forwarding, DNSSEC, and split-brain DNS.' },
  ]},
  { key: 'offsec', title: 'Offensive Security', icon: Shield, items: [
    { name: 'Web App Pentesting', level: 75, details: 'OWASP Top 10, Burp Suite interception, SQLi, XSS, IDOR, SSRF, and auth bypass, practiced through hands-on labs.' },
    { name: 'Network Pentesting', level: 68, details: 'nmap service enumeration, Metasploit, credential attacks, pivoting, and lateral movement across segmented networks.' },
    { name: 'OSINT & Recon', level: 80, details: 'Passive & active recon with subfinder, httpx, nuclei, gau, katana, and amass. Custom Python automation for enumeration.' },
    { name: 'CTF', level: 65, details: 'Capture-the-flag challenges for fun, web exploitation, privilege escalation, Linux/Windows boxes, cryptography, and forensics.' },
    { name: 'Python for Security', level: 84, details: 'PoC scripting, recon automation, and tooling with requests, scapy, pwntools, and cryptography libs.' },
  ]},
  { key: 'protection', title: 'Data Protection', icon: HardDrive, items: [
    { name: 'Veeam Backup', level: 90, certified: true, details: 'Backup jobs, replication, SureBackup verification, restore operations, and Veeam ONE monitoring for VMware & Nutanix.' },
  ]},
  { key: 'observability', title: 'Monitoring & Observability', icon: Monitor, items: [
    { name: 'Zabbix', level: 72, details: 'Template creation, custom triggers, SNMP monitoring, dashboard design, and alerting integrations.' },
    { name: 'VMware Aria Operations™', level: 90, certified: true, details: 'Capacity planning, workload optimization, custom dashboards, alerts, and compliance scorecards across vSphere.' },
    { name: 'Aria Operations™ for Logs', level: 83, certified: true, details: 'Centralized log aggregation, content packs, log queries, and alert-driven troubleshooting for infrastructure events.' },
    { name: 'Aria Operations™ for Networks', level: 76, certified: true, details: 'Network flow analysis, micro-segmentation planning, application dependency mapping, and path troubleshooting.' },
  ]},
  { key: 'governance', title: 'Management & Governance', icon: Building2, items: [
    { name: 'ITIL', level: 65, certified: true, details: 'Incident, change, and problem management processes. Service catalog design and SLA/OLA frameworks.' },
    { name: 'FinOps', level: 55, details: 'Cloud cost allocation, showback/chargeback models, rightsizing recommendations, and reserved instance planning.' },
  ]},
]

const GAUGE_CELLS = 10

function Gauge({ level }: { level: number }) {
  const filled = Math.round((level / 100) * GAUGE_CELLS)
  return (
    <span className="font-mono text-[11px] tracking-tight" aria-hidden="true">
      <span className="text-primary">{'▰'.repeat(filled)}</span>
      <span className="text-primary/20">{'▰'.repeat(GAUGE_CELLS - filled)}</span>
    </span>
  )
}

export function Skills() {
  const reduced = useReducedMotion()
  const [open, setOpen] = React.useState<Set<string>>(new Set(['programming', 'cloud']))
  const [expanded, setExpanded] = React.useState<string | null>(null)

  const toggleGroup = (k: string) =>
    setOpen((p) => {
      const n = new Set(p)
      if (n.has(k)) n.delete(k)
      else n.add(k)
      return n
    })

  return (
    <section className="space-y-5">
      <SectionPrompt command="ls ~/skills --tree">
        Certified and battle-tested capabilities across cloud, security, and automation.
      </SectionPrompt>

      <div className="space-y-2">
        {groups.map((group) => {
          const GIcon = group.icon
          const opened = open.has(group.key)
          return (
            <div key={group.key} className="border border-primary/15 bg-card">
              <button
                onClick={() => toggleGroup(group.key)}
                aria-expanded={opened}
                className="w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-primary/[0.04] transition-colors"
              >
                <ChevronRight
                  size={13}
                  className={`text-primary flex-shrink-0 transition-transform ${opened ? 'rotate-90' : ''}`}
                />
                <GIcon size={14} className="text-primary/70 flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">{group.title}</span>
                <span className="ml-auto font-mono text-[11px] text-muted-foreground">{group.items.length}</span>
              </button>

              <AnimatePresence initial={false}>
                {opened && (
                  <motion.div
                    initial={reduced ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduced ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="divide-y divide-primary/10 border-t border-primary/10">
                      {group.items.map((item) => {
                        const isOpen = expanded === item.name
                        return (
                          <div key={item.name}>
                            <button
                              onClick={() => setExpanded((p) => (p === item.name ? null : item.name))}
                              aria-expanded={isOpen}
                              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-primary/[0.03] transition-colors text-left"
                            >
                              <span className="text-[13px] text-foreground flex-1 min-w-0 truncate">
                                {item.name}
                                {item.certified && (
                                  <span className="ml-2 font-mono text-[9px] text-term-green">[cert]</span>
                                )}
                              </span>
                              <Gauge level={item.level} />
                              <span className="font-mono text-[11px] tabular-nums text-muted-foreground w-9 text-right">
                                {item.level}%
                              </span>
                            </button>
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.p
                                  initial={reduced ? false : { height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                                  transition={{ duration: 0.18 }}
                                  className="overflow-hidden text-[12px] font-sans leading-relaxed text-muted-foreground px-4 pb-2.5 pt-0"
                                >
                                  {item.details}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
