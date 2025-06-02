// This file forces TypeScript to ignore module resolution errors
declare module 'react' {
  export * from 'react'
}

declare module '@emailjs/browser' {
  export function send(
    serviceID: string,
    templateID: string,
    templateParams: Record<string, unknown>,
    publicKey: string
  ): Promise<{ status: number; text: string }>
  
  const emailjs: {
    send: typeof send
  }
  
  export default emailjs
}

declare module 'lucide-react' {
  import { FC, SVGProps } from 'react'
  export const Github: FC<SVGProps<SVGSVGElement>>
  export const Linkedin: FC<SVGProps<SVGSVGElement>>
  export const Mail: FC<SVGProps<SVGSVGElement>>
  export const ExternalLink: FC<SVGProps<SVGSVGElement>>
  export const Cloud: FC<SVGProps<SVGSVGElement>>
  export const Server: FC<SVGProps<SVGSVGElement>>
  export const Shield: FC<SVGProps<SVGSVGElement>>
  export const Code: FC<SVGProps<SVGSVGElement>>
  export const Monitor: FC<SVGProps<SVGSVGElement>>
  export const Menu: FC<SVGProps<SVGSVGElement>>
  export const X: FC<SVGProps<SVGSVGElement>>
  export const ChevronDown: FC<SVGProps<SVGSVGElement>>
  export const MapPin: FC<SVGProps<SVGSVGElement>>
  export const Phone: FC<SVGProps<SVGSVGElement>>
  export const Download: FC<SVGProps<SVGSVGElement>>
  export const Star: FC<SVGProps<SVGSVGElement>>
  export const Zap: FC<SVGProps<SVGSVGElement>>
  export const Users: FC<SVGProps<SVGSVGElement>>
  export const Sun: FC<SVGProps<SVGSVGElement>>
  export const Moon: FC<SVGProps<SVGSVGElement>>
  export const Building2: FC<SVGProps<SVGSVGElement>>
  export const Globe: FC<SVGProps<SVGSVGElement>>
  export const HardDrive: FC<SVGProps<SVGSVGElement>>
  export const Rocket: FC<SVGProps<SVGSVGElement>>
  export const TrendingUp: FC<SVGProps<SVGSVGElement>>
  export const ArrowRight: FC<SVGProps<SVGSVGElement>>
}

declare module 'next/image' {
  import { ComponentType } from 'react'
  
  interface ImageProps {
    src: string
    alt: string
    width?: number
    height?: number
    fill?: boolean
    sizes?: string
    quality?: number
    priority?: boolean
    placeholder?: 'blur' | 'empty'
    blurDataURL?: string
    loading?: 'lazy' | 'eager'
    className?: string
    style?: React.CSSProperties
    onLoad?: () => void
    onError?: () => void
  }
  
  const Image: ComponentType<ImageProps>
  export default Image
}

declare module 'next/link' {
  import { ComponentType, ReactNode } from 'react'
  
  interface LinkProps {
    href: string
    as?: string
    replace?: boolean
    scroll?: boolean
    shallow?: boolean
    passHref?: boolean
    prefetch?: boolean | null
    locale?: string | false
    className?: string
    target?: string
    rel?: string
    children: ReactNode
  }
  
  const Link: ComponentType<LinkProps>
  export default Link
}
