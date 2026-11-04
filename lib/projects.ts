export interface ProjectLink {
  demo?: string | null;
  visit?: string | null;
  github?: string | null;
  visitLabel?: string;
  contactEmail?: string | null;
}

export interface Project {
  title: string;
  slug: string;
  description: string;
  category: string;
  tech: string[];
  links: ProjectLink;
  features: string[];
  status: string;
}

export const projects: Project[] = [
  {
    title: "Brainful",
    slug: "brainful",
    category: "Web",
    status: "live",
    description:
      "A soothing single-page mental wellness dashboard with breathing guidance, mood reflection, zen doodling, and focus tools, all running entirely in the browser.",
    tech: ["React", "Tailwind", "Framer Motion", "Web Audio"],
    links: { demo: "https://brainful.0xpacman.com", github: null },
    features: [
      "4-7-8 breathing guide",
      "Mood journaling",
      "Zen doodling canvas",
      "Ambient radio",
    ],
  },
  {
    title: "sudo ku",
    slug: "sudo-ku",
    category: "Web",
    status: "live",
    description:
      "Terminal-styled animated Sudoku in pure vanilla JS, zero build, zero dependencies. Phosphor amber on black with CRT scanlines, a unique-solution puzzle generator, and spring-eased motion throughout.",
    tech: ["Vanilla JS", "CSS Animation", "Canvas", "Zero Build"],
    links: {
      demo: "https://sudoku.0xpacman.com",
      github: "https://github.com/0xPacman/Sudoku",
    },
    features: [
      "Unique-solution generator",
      "4 difficulties",
      "Pencil notes & hints",
      "CRT terminal design",
    ],
  },
  {
    title: "Paste",
    slug: "paste",
    category: "Web",
    status: "live",
    description:
      "Simple and secure pastebin for sharing code snippets and text. Clean interface with syntax highlighting and expiration options for privacy.",
    tech: ["Web", "Pastebin", "Privacy"],
    links: {
      demo: "https://paste.0xpacman.com",
      github: "https://github.com/0xPacman/Paste",
    },
    features: ["Syntax highlighting", "Privacy focused", "Secure sharing"],
  },
  {
    title: "ColorGuesser",
    slug: "colorguesser",
    category: "Web",
    status: "live",
    description:
      "Interactive color guessing game that challenges players to identify colors. Multiplayer scoring and a sleek modern interface.",
    tech: ["JavaScript", "CSS3", "Game Logic"],
    links: {
      demo: "https://colorguesser.0xpacman.com",
      github: "https://github.com/0xPacman/ColorGuesser",
    },
    features: ["Multiplayer", "Score tracking", "Color theory"],
  },
  {
    title: "Draw",
    slug: "draw",
    category: "Web",
    status: "open-source",
    description:
      "Collaborative online whiteboard forked from Excalidraw, an open-source project for sharing ideas, sketching diagrams, and building together.",
    tech: ["Excalidraw", "Collaboration", "Whiteboard", "Open Source"],
    links: {
      demo: "https://draw.0xpacman.com/",
      github: "https://github.com/0xPacman/excalidraw",
    },
    features: [
      "Forked from Excalidraw",
      "Collaborative drawing",
      "Open source",
      "Visual brainstorming",
    ],
  },
  {
    title: "PasswordGEN",
    slug: "passwordgen",
    category: "Tools",
    status: "live",
    description:
      "Password generator with both a web interface and CLI tool for maximum security and strong entropy.",
    tech: ["Bash", "Web", "CLI", "Crypto"],
    links: {
      demo: "https://password.0xpacman.com",
      github: "https://github.com/0xPacman/PasswordGEN",
    },
    features: ["Strong entropy", "Multi-platform", "Open source"],
  },
  {
    title: "AD Manager",
    slug: "ad-manager",
    category: "Enterprise",
    status: "commercial",
    description:
      "Professional Active Directory management desktop app built in C++ with a modern UI for Windows environments. User, group, and resource administration with automation.",
    tech: ["C++", "Windows", "Active Directory"],
    links: { visit: "https://ad.0xpacman.com", visitLabel: "Purchase, $29.99" },
    features: [
      "Bulk user/group ops",
      "AD automation",
      "Real-time monitoring",
      "Enterprise security",
    ],
  },
  {
    title: "Enterprise Cloud Platform",
    slug: "enterprise-cloud",
    category: "Enterprise",
    status: "archived",
    description:
      "Led infrastructure modernization for a national-scale cloud platform, orchestrating VMware, Dell VxRail, and multi-cloud operations for enterprise workloads. Engagement closed.",
    tech: ["VMware", "Dell VxRail", "NSX", "vSphere"],
    links: {},
    features: [
      "Modernization lead",
      "Single point of contact",
      "Multi-cloud strategy",
      "Cloud operations",
    ],
  },
  {
    title: "ServerInfoReport",
    slug: "serverinforeport",
    category: "Tools",
    status: "open-source",
    description:
      "Comprehensive server monitoring shell script, CPU, memory, storage analysis, and network configuration with cross-platform support and colorized output.",
    tech: ["Shell", "Bash", "Monitoring"],
    links: { github: "https://github.com/0xPacman/ServerInfoReport" },
    features: ["Real-time monitoring", "Cross-platform", "System analysis"],
  },
  {
    title: "GatewayPage",
    slug: "gatewaypage",
    category: "Web",
    status: "live",
    description:
      "Modern web dashboard as a personalized homepage, real-time weather, Hacker News feed, Reddit browser, and persistent notes with theme support.",
    tech: ["HTML5", "CSS3", "JavaScript", "APIs"],
    links: {
      demo: "https://0xpacman.github.io/GatewayPage/",
      github: "https://github.com/0xPacman/GatewayPage",
    },
    features: ["Real-time data", "Theme toggle", "API integration"],
  },
  {
    title: "OpenStack Cloud Platform",
    slug: "openstack",
    category: "Enterprise",
    status: "enterprise",
    description:
      "Deployed, configured, and automated an enterprise OpenStack cloud with multi-node architecture, IaaS with automated provisioning and monitoring.",
    tech: ["OpenStack", "Python", "Ansible"],
    links: {},
    features: ["Multi-node", "Automated provisioning", "IaaS services"],
  },
  {
    title: "Network Security Stack",
    slug: "netsec",
    category: "Enterprise",
    status: "enterprise",
    description:
      "Comprehensive network security with VMware NSX, micro-segmentation, distributed firewall policies, and automated threat response for enterprise environments.",
    tech: ["VMware NSX", "Zero Trust", "Micro-segmentation"],
    links: {},
    features: ["Zero trust", "Micro-segmentation", "Automated response"],
  },
  {
    title: "Portfolio",
    slug: "portfolio",
    category: "Web",
    status: "live",
    description:
      "This site, a terminal-inspired portfolio with accessible navigation, project case studies, and responsive layouts.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind"],
    links: {
      demo: "https://0xpacman.com",
      github: "https://github.com/0xPacman/Portfolio",
    },
    features: [
      "tmux interface",
      "Accessible navigation",
      "Dark terminal",
      "Static export",
    ],
  },
];
