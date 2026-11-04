/** Summaries drawn from the existing portfolio; no client metrics are inferred. */
export const selectedWork = [
  {
    slug: "enterprise-cloud",
    number: "01",
    title: "Enterprise cloud platform",
    category: "Private cloud",
    status: "Completed engagement",
    summary:
      "Infrastructure modernization across VMware, Dell VxRail, and multi-cloud operations.",
    problem:
      "Modernize an enterprise cloud estate while keeping day-to-day operations dependable.",
    contribution:
      "Led infrastructure modernization and acted as a single point of contact for the platform.",
    outcome:
      "Designed and operated enterprise workloads across the VMware and VxRail estate.",
    stack: ["VMware", "VxRail", "vSphere", "NSX"],
    layers: ["Enterprise workloads", "vSphere · NSX", "Dell VxRail"],
    href: "/contact/",
    linkLabel: "Discuss similar infrastructure",
  },
  {
    slug: "openstack",
    number: "02",
    title: "OpenStack cloud platform",
    category: "Cloud engineering",
    status: "Student placement · 2022",
    summary:
      "A five-node private cloud built for Banque Centrale Populaire during a placement with 1337.",
    problem:
      "Provision and operate infrastructure services across a multi-node cloud.",
    contribution:
      "Built the five-node platform and automated its deployment with Ansible, delivering the playbooks alongside it.",
    outcome:
      "Delivered a working IaaS platform and repeatable deployment playbooks.",
    stack: ["OpenStack", "Python", "Ansible"],
    layers: [
      "Infrastructure services",
      "OpenStack APIs",
      "Five-node private cloud",
    ],
    href: "/blog/demystifying-openstack/",
    linkLabel: "Read the OpenStack article",
  },
  {
    slug: "serverinforeport",
    number: "03",
    title: "ServerInfoReport",
    category: "Operations tooling",
    status: "Open source",
    summary:
      "A shell-based view of CPU, memory, storage, and network configuration.",
    problem: "Bring routine server diagnostics into one readable report.",
    contribution:
      "Built a monitoring shell script with system analysis and colorized output.",
    outcome:
      "Published an open-source tool for reviewing server health and configuration.",
    stack: ["Bash", "Shell", "Monitoring"],
    layers: [
      "CPU · Memory · Storage",
      "Shell diagnostics",
      "Readable system report",
    ],
    href: "https://github.com/0xPacman/ServerInfoReport",
    linkLabel: "Explore the source",
  },
] as const;
