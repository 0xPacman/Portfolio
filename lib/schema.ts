import { Person, Organization, CreativeWork, WebSite, BreadcrumbList } from 'schema-dts'

// Base URL for the website
const BASE_URL = 'https://0xpacman.github.io/Portfolio'

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
    url: 'https://atlascs.ma'
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Benguerir',
    addressCountry: 'Morocco'
  },
  sameAs: [
    'https://github.com/0xPacman',
    'https://linkedin.com/in/0xpacman',
    'https://atlascs.ma'
  ],
  knowsAbout: [
    'Cloud Infrastructure',
    'VMware',
    'OpenStack',
    'Network Security',
    'System Administration',
    'DevOps',
    'Web Development',
    'JavaScript',
    'TypeScript',
    'Next.js',
    'Docker',
    'Kubernetes'
  ],
  description: 'Cloud Infrastructure Engineer specializing in enterprise-grade infrastructure, VMware technologies, and scalable cloud solutions. Passionate about automation, security, and digital transformation.',
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
export const projectsSchema: any[] = [
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
    description: 'Modern, responsive portfolio built with Next.js 15, TypeScript, and Framer Motion. Features glassmorphism design, smooth animations, and dark/light theme support.',
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
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'About',
      item: `${BASE_URL}/#about`
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Skills',
      item: `${BASE_URL}/#skills`
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Projects',
      item: `${BASE_URL}/#projects`
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: 'Contact',
      item: `${BASE_URL}/#contact`
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
export const generateJSONLD = (schema: any) => {
  return {
    __html: JSON.stringify(schema, null, 2)
  }
}
