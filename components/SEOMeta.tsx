import Head from 'next/head'

interface SEOMetaProps {
  title?: string
  description?: string
  keywords?: string[]
  url?: string
  image?: string
  type?: string
}

export function SEOMeta({
  title = 'Ahmed Jadani | Cloud Infrastructure Engineer Portfolio',
  description = 'Portfolio of Ahmed Jadani, Cloud Infrastructure Engineer at Atlas Cloud Services. Specializing in VMware, OpenStack, cloud architecture, and web development.',
  keywords = [],
  url = 'https://0xpacman.github.io/Portfolio',
  image = 'https://0xpacman.github.io/Portfolio/media/PDP.jpg',
  type = 'website'
}: SEOMetaProps) {
  const defaultKeywords = [
    'Ahmed Jadani',
    'Pacman',
    'Cloud Infrastructure Engineer',
    'VMware',
    'OpenStack',
    'Atlas Cloud Services',
    'Morocco',
    'Benguerir',
    'Portfolio',
    'Web Development',
    'DevOps',
    'System Administration'
  ]

  const allKeywords = [...defaultKeywords, ...keywords].join(', ')

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content="Ahmed Jadani" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Ahmed Jadani Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#FFD700" />
      <meta name="msapplication-TileColor" content="#FFD700" />
      <meta name="application-name" content="Ahmed Jadani Portfolio" />
      
      {/* Preconnect to important domains */}
      <link rel="preconnect" href="https://github.com" />
      <link rel="preconnect" href="https://linkedin.com" />
      <link rel="preconnect" href="https://0xpacman.com" />
    </Head>
  )
}

// Specific meta configurations for different sections
export const sectionMeta = {
  about: {
    title: 'About Ahmed Jadani | Cloud Infrastructure Engineer',
    description: 'Learn about Ahmed Jadani, Cloud Infrastructure Engineer at Atlas Cloud Services specializing in VMware, OpenStack, and enterprise cloud solutions.',
    keywords: ['About Ahmed Jadani', 'Cloud Engineer Biography', 'Professional Background'],
    url: 'https://0xpacman.github.io/Portfolio/#about'
  },
  skills: {
    title: 'Technical Skills | Ahmed Jadani Portfolio',
    description: 'Technical expertise of Ahmed Jadani including cloud technologies, programming languages, DevOps tools, and infrastructure management.',
    keywords: ['Technical Skills', 'Cloud Technologies', 'Programming Languages', 'DevOps Tools'],
    url: 'https://0xpacman.github.io/Portfolio/#skills'
  },
  projects: {
    title: 'Projects Portfolio | Ahmed Jadani',
    description: 'Explore projects by Ahmed Jadani including cloud infrastructure, web applications, security tools, and open-source contributions.',
    keywords: ['Projects Portfolio', 'Cloud Projects', 'Web Applications', 'Open Source'],
    url: 'https://0xpacman.github.io/Portfolio/#projects'
  },
  contact: {
    title: 'Contact Ahmed Jadani | Cloud Infrastructure Engineer',
    description: 'Get in touch with Ahmed Jadani for cloud consulting, infrastructure projects, or professional collaboration opportunities.',
    keywords: ['Contact Ahmed Jadani', 'Cloud Consulting', 'Professional Services'],
    url: 'https://0xpacman.github.io/Portfolio/#contact'
  }
}
