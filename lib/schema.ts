import { Person, Organization, WebSite, BreadcrumbList } from 'schema-dts'

// Base URL for the website
const BASE_URL = 'https://0xpacman.com'

// Person Schema for Ahmed Jadani
export const personSchema: Person = {
  '@type': 'Person',
  '@id': `${BASE_URL}/#person`,
  name: 'Ahmed Jadani',
  alternateName: 'Pacman',
  url: BASE_URL,
  image: `${BASE_URL}/media/PDP.jpg`,
  jobTitle: 'Cloud Infrastructure Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Atlas Cloud Services',
    url: 'https://0xpacman.com'
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Benguerir',
    addressCountry: 'Morocco'
  },
  sameAs: [
    'https://github.com/0xPacman',
    'https://linkedin.com/in/0xpacman',
    'https://0xpacman.com'
  ],
  knowsAbout: [
    'Cloud Infrastructure',
    'VMware',
    'OpenStack',
    'Network Security',
    'System Administration',
    'DevOps',
    'Web Development',
    'Python',
    'TypeScript',
    'Docker',
    'Kubernetes'
  ],
  description: 'Cloud Infrastructure Engineer at Atlas Cloud Services specializing in enterprise-grade infrastructure, VMware technologies, OpenStack, and pragmatic automation.',
  alumniOf: {
    '@type': 'Organization',
    name: 'Various Educational Institutions'
  }
}

// Organization Schema for Atlas Cloud Services
export const organizationSchema: Organization = {
  '@type': 'Organization',
  '@id': 'https://atlascs.ma/#organization',
  name: 'Atlas Cloud Services',
  url: 'https://atlascs.ma',
  description: "Morocco's leading data center and public cloud provider",
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'Morocco'
  },
  employee: {
    '@type': 'Person',
    '@id': `${BASE_URL}/#person`
  }
}

// Website Schema
export const websiteSchema: WebSite = {
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: 'Ahmed Jadani | Portfolio',
  description: 'Portfolio of Ahmed Jadani, Cloud Infrastructure Engineer showcasing projects in cloud computing, web development, and system administration.',
  author: {
    '@type': 'Person',
    '@id': `${BASE_URL}/#person`
  },
  inLanguage: 'en-US',
  copyrightHolder: {
    '@type': 'Person',
    '@id': `${BASE_URL}/#person`
  },
  creator: {
    '@type': 'Person',
    '@id': `${BASE_URL}/#person`
  }
}

// Creative Works Schema for projects
export const projectsSchema: object[] = [
  {
    '@type': 'SoftwareApplication',
    name: 'sudo ku',
    description: 'Terminal-styled animated Sudoku in pure vanilla JS with a unique-solution puzzle generator, phosphor-amber CRT design, and fluid motion. Zero build, zero dependencies.',
    url: 'https://sudoku.0xpacman.com',
    codeRepository: 'https://github.com/0xPacman/Sudoku',
    author: {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`
    },
    applicationCategory: 'Game',
    operatingSystem: 'Web Browser',
    keywords: ['Sudoku', 'Game', 'Vanilla JS', 'Terminal', 'Animation']
  },
  {
    '@type': 'SoftwareApplication',
    name: 'Paste',
    description: 'Simple and secure pastebin service for sharing code snippets and text. Clean interface with syntax highlighting and expiration options for enhanced privacy.',
    url: 'https://paste.0xpacman.com',
    codeRepository: 'https://github.com/0xPacman/Paste',
    author: {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`
    },
    applicationCategory: 'Web Service',
    operatingSystem: 'Web Browser',
    keywords: ['Pastebin', 'Code Sharing', 'Privacy', 'Security']
  },
  {
    '@type': 'SoftwareApplication',
    name: 'Draw',
    description: 'Collaborative online whiteboard forked from Excalidraw, developed as an open-source project for sharing ideas, sketching diagrams, and building together.',
    url: 'https://draw.0xpacman.com/',
    codeRepository: 'https://github.com/0xPacman/excalidraw',
    author: {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`
    },
    applicationCategory: 'Whiteboard',
    operatingSystem: 'Web Browser',
    keywords: ['Excalidraw', 'Collaboration', 'Whiteboard', 'Open Source']
  },
  {
    '@type': 'SoftwareApplication',
    name: 'ColorGuesser',
    description: 'Interactive color guessing game that challenges players to identify colors. Features scoring system, and sleek modern interface.',
    url: 'https://colorguesser.0xpacman.com',
    codeRepository: 'https://github.com/0xPacman/ColorGuesser',
    author: {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`
    },
    applicationCategory: 'Game',
    operatingSystem: 'Web Browser',
    keywords: ['Game', 'Color Theory', 'Interactive', 'Education']
  },
  {
    '@type': 'SoftwareApplication',
    name: 'PasswordGEN',
    description: 'Secure password generator with both web interface and CLI tool for maximum security.',
    url: 'https://password.0xpacman.com',
    codeRepository: 'https://github.com/0xPacman/PasswordGEN',
    author: {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`
    },
    applicationCategory: 'Security Tool',
    operatingSystem: ['Web Browser', 'Linux', 'macOS', 'Windows'],
    keywords: ['Password Generator', 'Security', 'Cryptography', 'CLI']
  },
  {
    '@type': 'SoftwareApplication',
    name: 'ServerInfoReport',
    description: 'Comprehensive server monitoring shell script providing detailed system information including CPU usage, memory stats, storage analysis, and network configuration.',
    codeRepository: 'https://github.com/0xPacman/ServerInfoReport',
    author: {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`
    },
    applicationCategory: 'System Administration',
    operatingSystem: ['Linux', 'Unix', 'macOS'],
    keywords: ['System Monitoring', 'Shell Script', 'DevOps', 'Server Management']
  },
  {
    '@type': 'SoftwareApplication',
    name: 'GatewayPage',
    description: 'Modern web dashboard serving as personalized homepage with real-time weather, Hacker News feed, Reddit browser, and persistent note-taking.',
    url: 'https://0xpacman.github.io/GatewayPage/',
    codeRepository: 'https://github.com/0xPacman/GatewayPage',
    author: {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`
    },
    applicationCategory: 'Dashboard',
    operatingSystem: 'Web Browser',
    keywords: ['Dashboard', 'Real-time Data', 'API Integration', 'Personal Homepage']
  },
  {
    '@type': 'WebSite',
    name: 'Portfolio Website',
    description: 'Terminal-aesthetic portfolio built with Next.js 15, TypeScript, and Framer Motion. Frontier terminal design with a tmux-style interface.',
    url: BASE_URL,
    codeRepository: 'https://github.com/0xPacman/Portfolio',
    author: {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`
    },
    keywords: ['Portfolio', 'Next.js', 'TypeScript', 'React', 'Web Development']
  }
]

// Breadcrumb Schema
export const breadcrumbSchema: BreadcrumbList = {
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: BASE_URL
    }
  ]
}

// Combined JSON-LD schema
export const getStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema,
      organizationSchema,
      websiteSchema,
      breadcrumbSchema,
      ...projectsSchema
    ]
  }
}

// Helper function to generate JSON-LD script tag
export const generateJSONLD = (schema: object) => {
  return {
    __html: JSON.stringify(schema, null, 2)
  }
}
