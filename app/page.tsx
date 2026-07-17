import { TerminalShell } from "@/components/shell/TerminalShell"

export default function Portfolio() {
  return (
    <div itemScope itemType="https://schema.org/WebPage">
      {/* SEO structured microdata */}
      <div itemProp="mainEntity" itemScope itemType="https://schema.org/Person" style={{ display: "none" }}>
        <meta itemProp="name" content="Ahmed Jadani" />
        <meta itemProp="alternateName" content="0xPacman" />
        <meta itemProp="jobTitle" content="Cloud Infrastructure Engineer" />
        <meta itemProp="description" content="Cloud Infrastructure Engineer at Atlas Cloud Services specializing in private cloud architecture, VMware, OpenStack, and enterprise automation." />
        <meta itemProp="url" content="https://0xpacman.com" />
        <meta itemProp="image" content="https://0xpacman.com/media/PDP.jpg" />
        <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <meta itemProp="addressLocality" content="Benguerir" />
          <meta itemProp="addressCountry" content="Morocco" />
        </div>
        <div itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
          <meta itemProp="name" content="Atlas Cloud Services" />
        </div>
        <meta itemProp="sameAs" content="https://github.com/0xPacman" />
        <meta itemProp="sameAs" content="https://linkedin.com/in/0xpacman" />
      </div>

      <TerminalShell />
    </div>
  )
}
