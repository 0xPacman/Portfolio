import { ArrowUpRight, ChevronDown } from "lucide-react";
import styles from "./Directories.module.css";

// Names, issue/expiry dates and public links read from LinkedIn on 2026-11-02.
const credentials = [
  {
    title: "Oracle Cloud Infrastructure 2025 Certified DevOps Professional",
    issuer: "Oracle",
    date: "Issued Oct 2025",
    href: "https://brm-certview.oracle.com/ords/certview/ecertificate?ssn=OC7519350&trackId=OCI25DOPOCP&key=5af017b949fdc6018f46ab3e7e710704bfc3e6f8",
    historical: false,
  },
  {
    title: "ITIL® Foundation Certificate in IT Service Management",
    issuer: "PeopleCert",
    date: "Issued Feb 2025 · Expires Feb 2028",
    href: "https://www.peoplecert.org/public-profile?ed=XCHu3ZqUTNLBxqj3Nfn1xA3uET%2fiNaRD",
    historical: false,
  },
  {
    title: "42 Cursus — Advanced Developer, Level 17",
    issuer: "42",
    date: "Issued May 2026",
    href: "https://www.credly.com/badges/775edd0a-cbf3-4699-bea0-493cba13d801/public_url",
    historical: false,
  },
  {
    title: "REST API (Intermediate)",
    issuer: "HackerRank",
    date: "Issued Sep 2026",
    href: "https://www.hackerrank.com/certificates/ac1ee7d8bc53",
    historical: false,
  },
  {
    title: "Nutanix Certified Professional — Multicloud Infrastructure 6.5",
    issuer: "Nutanix",
    date: "Earned Oct 2024 · Expired Oct 2026",
    href: "https://www.credly.com/badges/372d838a-681d-4d71-b4e3-07bed73da4ea/linked_in_profile",
    historical: true,
  },
  {
    title: "Nutanix Certified Associate 6.5",
    issuer: "Nutanix",
    date: "Earned Sep 2024 · Expired Sep 2026",
    href: "https://www.credly.com/badges/354007c0-b8a4-40bb-ba45-3f2ce5b38ac2/linked_in_profile",
    historical: true,
  },
];
function CredentialList({ entries }: { entries: typeof credentials }) {
  return (
    <ul className={styles.credentials}>
      {entries.map((cert) => (
        <li key={cert.href}>
          <a
            href={cert.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View credential: ${cert.title}`}
          >
            <span className={styles.issuer}>{cert.issuer}</span>
            <span className={styles.certName}>
              <strong>{cert.title}</strong>
              <small>{cert.date}</small>
            </span>
            <ArrowUpRight size={18} aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Certifications() {
  const historical = credentials.filter((cert) => cert.historical);
  return (
    <section
      id="credentials"
      className="section-space scroll-mt-6"
      aria-labelledby="credentials-heading"
    >
      <div className={styles.sectionHead}>
        <h2 id="credentials-heading" className="section-title">
          Certifications
        </h2>
        <a
          href="https://www.linkedin.com/in/0xpacman/details/certifications/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          Full list on LinkedIn <ArrowUpRight size={15} aria-hidden />
        </a>
      </div>
      <div className={styles.list}>
        <CredentialList
          entries={credentials.filter((cert) => !cert.historical)}
        />
        <details className={styles.archive}>
          <summary>
            Previously earned ({historical.length}){" "}
            <ChevronDown size={16} aria-hidden />
          </summary>
          <CredentialList entries={historical} />
        </details>
      </div>
    </section>
  );
}
