import { ArrowUpRight, Award } from "lucide-react";
import { BinaryText } from "@/components/ui/binary-text";

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
export function Certifications() {
  return (
    <section
      id="credentials"
      className="section-space scroll-mt-6"
      aria-labelledby="credentials-heading"
    >
      <div className="section-header">
        <div>
          <p className="eyebrow mb-3">Learning, backed by credentials</p>
          <h2 id="credentials-heading" className="section-title">
            Selected certifications.
          </h2>
        </div>
        <a
          href="https://www.linkedin.com/in/0xpacman/details/certifications/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          <BinaryText text="Full list on LinkedIn" /> <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {credentials.map((cert) => (
          <article
            key={cert.title}
            className="flex flex-col border border-primary/20 bg-card p-5 sm:p-6"
          >
            <div className="mb-4 flex items-center gap-2 text-xs text-primary">
              <Award size={17} />
              <span>{cert.issuer}</span>
              {cert.historical && (
                <span className="ml-auto border border-primary/20 px-2 py-1 text-muted-foreground">
                  Previously earned
                </span>
              )}
            </div>
            <h3 className="font-sans text-lg font-semibold">{cert.title}</h3>
            <p className="mb-5 mt-3 text-xs leading-relaxed text-muted-foreground">
              {cert.date}
            </p>
            <a
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link mt-auto"
              aria-label={`View credential: ${cert.title}`}
            >
              <BinaryText text="View credential" /> <ArrowUpRight size={15} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
