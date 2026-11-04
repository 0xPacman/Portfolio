import Link from "next/link";
import {
  Cloud,
  Server,
  Shield,
  Code,
  Monitor,
  Building2,
  HardDrive,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import React from "react";
import { Certifications } from "./Certifications";
import { BinaryText } from "@/components/ui/binary-text";
interface SkillItem {
  name: string;
  details: string;
}
interface SkillGroup {
  key: string;
  title: string;
  icon: React.ElementType;
  items: SkillItem[];
}

const groups: SkillGroup[] = [
  {
    key: "programming",
    title: "Programming & Scripting",
    icon: Code,
    items: [
      {
        name: "C",
        details:
          "Custom memory allocators, system-level programming, UNIX internals. Built custom shells, parsers, and low-level networking tools.",
      },
      {
        name: "C++",
        details:
          "OOP design patterns, STL containers, smart pointers. Developed desktop applications including AD Manager.",
      },
      {
        name: "Python",
        details:
          "Scripting & automation, REST API integrations, infrastructure tooling. OpenStack SDK, VMware pyvmomi, Ansible modules, and security PoCs.",
      },
      {
        name: "TypeScript",
        details:
          "Next.js & React development, type-safe APIs, component architecture for web applications.",
      },
      {
        name: "PowerShell",
        details:
          "Windows Server automation, Active Directory bulk operations, Exchange management, and GPO scripting.",
      },
      {
        name: "Bash",
        details:
          "Advanced shell scripting, cron automation, CI/CD pipelines, system monitoring scripts, and server provisioning.",
      },
    ],
  },
  {
    key: "cloud",
    title: "Cloud & Infrastructure",
    icon: Cloud,
    items: [
      {
        name: "Oracle Cloud",
        details:
          "OCI compute, networking & storage. Architected multi-tier deployments with VCN peering, load balancers, and autonomous DB.",
      },
      {
        name: "Azure",
        details:
          "Azure VMs, VNETs, App Services, AKS, and Azure AD. Hybrid identity and governance policies for enterprise tenants.",
      },
      {
        name: "Google Cloud",
        details:
          "GCE, GKE, Cloud Run, IAM, and VPC networking. Experience with BigQuery and Cloud Functions for event-driven workloads.",
      },
      {
        name: "OpenStack",
        details:
          "Multi-node deployment & day-2 operations: Nova, Neutron, Cinder, Glance, Keystone. Automated provisioning with Heat templates.",
      },
      {
        name: "Dell VxRail",
        details:
          "Full lifecycle management, deployment, upgrades, expansion, troubleshooting. Single point of contact for VxRail across a national-scale cloud estate.",
      },
      {
        name: "VMware vSphere",
        details:
          "vCenter, ESXi, vSAN, DRS/HA/FT, vMotion. Designed and operated clusters serving 100+ enterprise workloads.",
      },
      {
        name: "Nutanix HCI (AOS/AHV)",
        details:
          "Prism Central/Element, AHV hypervisor, cluster expansion, data protection policies, and capacity planning.",
      },
      {
        name: "Proxmox",
        details:
          "KVM/LXC virtualization, cluster setup, ZFS storage management, and backup scheduling.",
      },
    ],
  },
  {
    key: "containers",
    title: "Containers & Orchestration",
    icon: Server,
    items: [
      {
        name: "Docker",
        details:
          "Multi-stage builds, Docker Compose, private registries, networking, volume management, and production hardening.",
      },
      {
        name: "Podman",
        details:
          "Rootless containers, systemd integration, pod-level management, and OCI-compliant image builds.",
      },
      {
        name: "Kubernetes",
        details:
          "Deployments, Services, Ingress, RBAC, Helm charts. Managed clusters on-prem and on cloud (AKS/GKE).",
      },
    ],
  },
  {
    key: "automation",
    title: "Automation & Configuration",
    icon: Code,
    items: [
      {
        name: "Terraform",
        details:
          "Multi-provider IaC, vSphere, OCI, Azure. State management, modules, and CI/CD-driven plan/apply workflows.",
      },
      {
        name: "VMware Aria Automation",
        details:
          "Cloud templates, ABX actions, custom resources, and self-service catalog for VM provisioning.",
      },
      {
        name: "Ansible",
        details:
          "Playbooks, roles, inventory management, Ansible Vault. Automated OS patching, config hardening, and app deployment.",
      },
    ],
  },
  {
    key: "network",
    title: "Network & Security",
    icon: Shield,
    items: [
      {
        name: "VMware NSX",
        details:
          "Micro-segmentation, distributed firewall policies, T0/T1 gateways, and overlay networking for multi-tenant environments.",
      },
      {
        name: "Cisco ASA",
        details:
          "Firewall ACLs, site-to-site VPN, NAT rules, and high-availability failover configuration.",
      },
      {
        name: "Fortinet Firewall",
        details:
          "FortiGate policy management, SSL inspection, SD-WAN basics, and FortiAnalyzer log integration.",
      },
      {
        name: "Active Directory",
        details:
          "Domain controllers, GPO design, OU structure, replication, trusts, LDAP/Kerberos, and bulk user management.",
      },
      {
        name: "DNS Management",
        details:
          "Internal/external DNS architecture, zone delegation, conditional forwarding, DNSSEC, and split-brain DNS.",
      },
    ],
  },
  {
    key: "offsec",
    title: "Offensive Security",
    icon: Shield,
    items: [
      {
        name: "Web App Pentesting",
        details:
          "OWASP Top 10, Burp Suite interception, SQLi, XSS, IDOR, SSRF, and auth bypass, practiced through hands-on labs.",
      },
      {
        name: "Network Pentesting",
        details:
          "nmap service enumeration, Metasploit, credential attacks, pivoting, and lateral movement across segmented networks.",
      },
      {
        name: "OSINT & Recon",
        details:
          "Passive & active recon with subfinder, httpx, nuclei, gau, katana, and amass. Custom Python automation for enumeration.",
      },
      {
        name: "CTF",
        details:
          "Capture-the-flag challenges for fun, web exploitation, privilege escalation, Linux/Windows boxes, cryptography, and forensics.",
      },
      {
        name: "Python for Security",
        details:
          "PoC scripting, recon automation, and tooling with requests, scapy, pwntools, and cryptography libs.",
      },
    ],
  },
  {
    key: "protection",
    title: "Data Protection",
    icon: HardDrive,
    items: [
      {
        name: "Veeam Backup",
        details:
          "Backup jobs, replication, SureBackup verification, restore operations, and Veeam ONE monitoring for VMware & Nutanix.",
      },
    ],
  },
  {
    key: "observability",
    title: "Monitoring & Observability",
    icon: Monitor,
    items: [
      {
        name: "Zabbix",
        details:
          "Template creation, custom triggers, SNMP monitoring, dashboard design, and alerting integrations.",
      },
      {
        name: "VMware Aria Operations™",
        details:
          "Capacity planning, workload optimization, custom dashboards, alerts, and compliance scorecards across vSphere.",
      },
      {
        name: "Aria Operations™ for Logs",
        details:
          "Centralized log aggregation, content packs, log queries, and alert-driven troubleshooting for infrastructure events.",
      },
      {
        name: "Aria Operations™ for Networks",
        details:
          "Network flow analysis, micro-segmentation planning, application dependency mapping, and path troubleshooting.",
      },
    ],
  },
  {
    key: "governance",
    title: "Management & Governance",
    icon: Building2,
    items: [
      {
        name: "ITIL",
        details:
          "Incident, change, and problem management processes. Service catalog design and SLA/OLA frameworks.",
      },
      {
        name: "FinOps",
        details:
          "Cloud cost allocation, showback/chargeback models, rightsizing recommendations, and reserved instance planning.",
      },
    ],
  },
];

const order = [
  "cloud",
  "automation",
  "observability",
  "protection",
  "containers",
  "network",
  "programming",
  "offsec",
  "governance",
];
const evidence: Record<string, { href: string; label: string }> = {
  cloud: {
    href: "/projects/#enterprise-cloud",
    label: "See cloud engineering work",
  },
  automation: {
    href: "/blog/automating-the-boring-stuff/",
    label: "Read my automation approach",
  },
  observability: {
    href: "/projects/#serverinforeport",
    label: "Explore ServerInfoReport",
  },
  programming: {
    href: "https://github.com/0xPacman",
    label: "Browse source code",
  },
  network: {
    href: "/blog/active-directory-at-scale/",
    label: "Read about Active Directory at scale",
  },
};
export function Skills() {
  return (
    <div>
      <header className="page-intro">
        <p className="eyebrow">02 / Skills &amp; experience</p>
        <h1 className="page-title">
          What I work with.
          <br />
          What I do with it.
        </h1>
        <p className="page-description">
          Practical experience across private clouds, automation, and
          operations. Explore the work behind the tools.
        </p>
        <a href="#credentials" className="text-link">
          <BinaryText text="View certifications" /> <ArrowUpRight size={16} />
        </a>
      </header>
      <div className="space-y-3">
        {[...groups]
          .sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key))
          .map((group) => {
            const Icon = group.icon;
            const proof = evidence[group.key];
            return (
              <details
                key={group.key}
                open={group.key === "cloud" || group.key === "automation"}
                className="group border border-primary/20 bg-card"
              >
                <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-4 py-4 sm:px-6">
                  <Icon size={19} className="shrink-0 text-primary" />
                  <h2 className="font-sans text-lg font-semibold">
                    <BinaryText text={group.title} />
                  </h2>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {group.items.length}
                  </span>
                  <ChevronDown
                    size={17}
                    className="shrink-0 text-primary transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="divide-y divide-primary/10 border-t border-primary/15">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="grid gap-2 px-5 py-5 sm:grid-cols-[190px_1fr] sm:gap-5 sm:px-6"
                    >
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="font-sans text-base leading-relaxed text-muted-foreground">
                        {item.details}
                      </p>
                    </div>
                  ))}
                </div>
                {proof && (
                  <div className="border-t border-primary/15 px-5 py-2">
                    <Link
                      href={proof.href}
                      target={
                        proof.href.startsWith("https:") ? "_blank" : undefined
                      }
                      rel={
                        proof.href.startsWith("https:")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-link"
                    >
                      <BinaryText text={proof.label} />{" "}
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                )}
              </details>
            );
          })}
      </div>
      <Certifications />
    </div>
  );
}
