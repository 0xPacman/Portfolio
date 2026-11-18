import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { FeaturedWork } from "./FeaturedWork";
import styles from "./home.module.css";

export function About() {
  return (
    <div className={styles.home}>
      <section className={styles.hero} aria-labelledby="intro-heading">
        <div className={styles.identity}>
          <p className={styles.command}>
            <Terminal size={15} aria-hidden="true" /> whoami
          </p>
          <h1 id="intro-heading" className={styles.name}>
            Ahmed <span>Jadani</span>
          </h1>
          <p className={styles.role}>Cloud Infrastructure Engineer</p>
        </div>
        <figure className={styles.portrait}>
          <div className={styles.frame}>
            <Image
              src="/media/PDP.png"
              alt="Portrait of Ahmed Jadani"
              fill
              priority
              sizes="(max-width: 599px) 30vw, (max-width: 1023px) 35vw, 360px"
              className={styles.photo}
            />
            <span className={styles.registration} aria-hidden="true" />
          </div>
          <figcaption className={styles.caption}>
            <span>@0xPacman</span>
            <span className={styles.location}>
              <MapPin size={12} aria-hidden="true" />
              <span>Casablanca<span className={styles.country}>, Morocco</span></span>
            </span>
          </figcaption>
        </figure>
        <p className={styles.intro}>
          I build private clouds with VMware and OpenStack, automate deployments,
          and keep production systems running.
        </p>
        <div className={styles.actions}>
          <Link href="/projects/" className="action-primary">
            View projects <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/contact/" className="action-secondary">
            Contact me <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className={styles.socials}>
          <a href="https://github.com/0xPacman" target="_blank" rel="noopener noreferrer">
            <GithubIcon size={14} /> GitHub <ArrowUpRight size={12} aria-hidden="true" />
          </a>
          <a href="https://linkedin.com/in/0xpacman" target="_blank" rel="noopener noreferrer">
            <LinkedinIcon size={14} /> LinkedIn <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="work-heading">
        <div className={styles.sectionHeader}>
          <h2 id="work-heading">Selected work</h2>
          <Link href="/projects/" className={styles.textLink}>
            All projects <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <FeaturedWork />
      </section>

      <section className={styles.experience} aria-labelledby="about-heading">
        <div className={styles.experienceHeading}>
          <h2 id="about-heading">How I work</h2>
          <Link href="/skills/" className={styles.textLink}>
            Skills &amp; experience <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <div className={styles.prose}>
          <p>
            Most of my experience is on enterprise platforms, where downtime is
            expensive. I turn manual processes into repeatable deployments and build
            the monitoring and backups those systems need.
          </p>
          <p>
            Away from the data center, I explore security tooling and ship small web
            projects for the fun of it.
          </p>
        </div>
      </section>
    </div>
  );
}
