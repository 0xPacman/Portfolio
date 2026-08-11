import { TerminalShell } from "@/components/shell/TerminalShell"

export default function Portfolio() {
  return (
    <div itemScope itemType="https://schema.org/WebPage">
      {/* SEO structured microdata */}
      <div itemProp="mainEntity" itemScope itemType="https://schema.org/Person" style={{ display: "none" }}>
        <meta itemProp="name" content="Ahmed Jadani" />
        <meta itemProp="alternateName" content="0xPacman" />
        <meta itemProp="jobTitle" content="Cloud Infrastructure Engineer" />
        <meta itemProp="description" content="Cloud Infrastructure Engineer specializing in private cloud architecture, VMware, OpenStack, and enterprise automation. Open to collaboration and consultation." />
        <meta itemProp="url" content="https://0xpacman.com" />
        <meta itemProp="image" content="https://0xpacman.com/media/PDP.jpg" />
        <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <meta itemProp="addressLocality" content="Casablanca" />
          <meta itemProp="addressCountry" content="Morocco" />
        </div>
        <meta itemProp="email" content="ahmed.jadani@0xpacman.com" />
        <meta itemProp="sameAs" content="https://github.com/0xPacman" />
        <meta itemProp="sameAs" content="https://linkedin.com/in/0xpacman" />
      </div>

      <TerminalShell />
    </div>
  )
}
