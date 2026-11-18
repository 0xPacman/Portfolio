"use client";
import {
  ArrowUpRight,
  Mail,
  Copy,
  Check,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
} from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { useCasablancaTime } from "@/hooks/use-casablanca-time";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import styles from "./Directories.module.css";
const email = "ahmed.jadani@0xpacman.com";
const channels = [
  {
    label: "LinkedIn",
    icon: LinkedinIcon,
    value: "linkedin.com/in/0xpacman",
    href: "https://linkedin.com/in/0xpacman",
  },
  {
    label: "GitHub",
    icon: GithubIcon,
    value: "github.com/0xPacman",
    href: "https://github.com/0xPacman",
  },
  {
    label: "Phone",
    icon: Phone,
    value: "+212 708 429 995",
    href: "tel:+212708429995",
    copy: "+212708429995",
  },
  {
    label: "WhatsApp",
    icon: MessageCircle,
    value: "Start a conversation",
    href: "https://wa.me/212708429995",
  },
  {
    label: "Personal email",
    icon: Mail,
    value: "ahmed4star@gmail.com",
    href: "mailto:ahmed4star@gmail.com",
    copy: "ahmed4star@gmail.com",
  },
];
export function Contact() {
  const { copy, copied, message } = useCopy();
  const now = useCasablancaTime();

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <h1 className="page-title">Get in touch</h1>
        <p className="page-description">
          Cloud infrastructure consulting, automation, security collaboration,
          or simply a hello. Email is the best place to start.
        </p>
      </header>
      <div className={styles.contactGrid}>
        <section className={styles.contactCard} aria-labelledby="email-heading">
          <div className={styles.paneBar}>
            <Mail size={15} aria-hidden />
            <h2 id="email-heading">Work email</h2>
          </div>
          <div className={styles.cardInterior}>
            <span className={styles.availability}>
              <span aria-hidden />
              Open to collaboration
            </span>
            <p className={styles.emailAddress}>
              ahmed.jadani@
              <wbr />
              0xpacman.com
            </p>
            <p className={styles.body}>
              Tell me what you&apos;re working on, the challenge, and any
              timeline you have in mind.
            </p>
            <div className={styles.contactActions}>
              <a href={`mailto:${email}`} className="action-primary">
                Email Ahmed <ArrowUpRight size={17} aria-hidden />
              </a>
              <button
                type="button"
                onClick={() => copy(email, "Work email")}
                className="action-secondary"
              >
                {copied === email ? (
                  <Check size={15} aria-hidden />
                ) : (
                  <Copy size={15} aria-hidden />
                )}
                {copied === email ? "Copied" : "Copy email"}
              </button>
            </div>
          </div>
        </section>
        <aside
          className={styles.clockCard}
          aria-label="Casablanca time and availability"
        >
          <div className={styles.paneBar}>
            <Clock size={15} aria-hidden />
            Local time
          </div>
          <div className={styles.clockInterior}>
            <p className={styles.clockLocation}>
              <MapPin size={15} aria-hidden />
              Casablanca, Morocco
            </p>
            <p
              aria-label={now ? `${now} local time` : "Loading local time"}
              className={styles.clock}
            >
              {now || "––:––"}
            </p>
            <p className={styles.meta}>Africa/Casablanca</p>
            <div className={styles.workingHours}>
              <span>Working hours</span>
              <strong>09:00–18:00</strong>
            </div>
          </div>
        </aside>
      </div>
      <section className="section-space" aria-labelledby="channels-heading">
        <div className={styles.sectionHead}>
          <h2 id="channels-heading" className="section-title">
            Other ways to connect
          </h2>
        </div>
        <ul className={styles.channelList}>
          {channels.map(
            ({ label, icon: Icon, value, href, copy: copyValue }) => (
              <li className={styles.channel} key={label}>
                <a
                  href={href}
                  target={href.startsWith("https:") ? "_blank" : undefined}
                  rel={
                    href.startsWith("https:")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  <span className={styles.channelIcon}>
                    <Icon size={17} />
                  </span>
                  <span className={styles.channelText}>
                    <strong>{label}</strong>
                    <span>{value}</span>
                  </span>
                  <ArrowUpRight size={16} aria-hidden />
                </a>
                {copyValue && (
                  <button
                    className={styles.channelCopy}
                    type="button"
                    aria-label={`Copy ${label.toLowerCase()}`}
                    title={`Copy ${label.toLowerCase()}`}
                    onClick={() => copy(copyValue, label)}
                  >
                    {copied === copyValue ? (
                      <Check size={16} aria-hidden />
                    ) : (
                      <Copy size={16} aria-hidden />
                    )}
                  </button>
                )}
              </li>
            ),
          )}
        </ul>
      </section>
      <p
        className={styles.copyMessage}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {message}
      </p>
    </div>
  );
}
