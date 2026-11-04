import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { FeaturedWork } from "./FeaturedWork";
import { BinaryText } from "@/components/ui/binary-text";

export function About() {
  return (
    <div>
      <section className="hero-grid" aria-labelledby="intro-heading">
        <div className="py-4 lg:py-10">
          <p className="mb-4 text-sm text-muted-foreground">
            Ahmed Jadani <span className="text-primary/60">/</span> Cloud
            Infrastructure Engineer
          </p>
          <h1 id="intro-heading" className="hero-heading">
            Reliable infrastructure.
            <br />
            <span className="text-primary">Repeatable operations.</span>
          </h1>
          <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-muted-foreground">
            I build and run the systems other people&apos;s work depends on.
            Private clouds, VMware, OpenStack, and the automation that keeps it
            all coherent.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects/" className="action-primary">
              <BinaryText text="View selected work" />{" "}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/contact/" className="action-secondary">
              <BinaryText text="Discuss a project" />{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} aria-hidden="true" /> Casablanca, Morocco
            </span>
            <a
              href="https://github.com/0xPacman"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 hover:text-primary"
            >
              <GithubIcon size={15} /> <BinaryText text="GitHub" />{" "}
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
            <a
              href="https://linkedin.com/in/0xpacman"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 hover:text-primary"
            >
              <LinkedinIcon size={15} /> <BinaryText text="LinkedIn" />{" "}
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </div>
        </div>
        <aside className="identity-panel">
          <div className="flex items-center justify-between border-b border-primary/20 px-4 py-3 text-xs text-muted-foreground">
            <span>~/about/profile</span>
            <span className="text-primary">01</span>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden sm:aspect-square lg:aspect-[4/5]">
            <Image
              src="/media/PDP.png"
              alt="Ahmed Jadani"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
              className="object-cover object-[65%_center]"
            />
          </div>
          <div className="border-t border-primary/20 px-5 py-4">
            <p className="font-sans text-xl font-semibold">
              Ahmed Jadani<span className="text-primary">.</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Engineer. Builder. <span className="text-primary">0xPacman.</span>
            </p>
          </div>
        </aside>
      </section>
      <div className="expertise-strip" aria-label="Core areas of expertise">
        {[
          "Private cloud architecture",
          "Infrastructure automation",
          "Reliability & observability",
        ].map((item, i) => (
          <div key={item} className="flex items-center gap-3 px-5 py-4 text-sm">
            <span className="text-primary/70">0{i + 1}</span>
            {item}
          </div>
        ))}
      </div>
      <section className="section-space" aria-labelledby="work-heading">
        <div className="section-header">
          <div>
            <p className="eyebrow mb-3">01 / Selected work</p>
            <h2 id="work-heading" className="section-title">
              Built to do the work.
            </h2>
          </div>
          <Link href="/projects/" className="text-link">
            <BinaryText text="All projects" />{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <FeaturedWork />
      </section>
      <section
        className="section-space grid gap-8 border-t border-primary/15 lg:grid-cols-[0.7fr_1.3fr]"
        aria-labelledby="about-heading"
      >
        <div>
          <p className="eyebrow mb-3">02 / Behind the terminal</p>
          <h2 id="about-heading" className="section-title">
            Built on experience.
            <br />
            Driven by curiosity.
          </h2>
          <Link href="/skills/" className="text-link mt-5">
            <BinaryText text="Explore my experience" />{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="space-y-5 font-sans text-lg leading-relaxed text-muted-foreground">
          <p>
            Most of my experience is on enterprise platforms, where downtime is
            expensive and a fix has to be right the first time. That shaped how
            I work.
          </p>
          <p>
            I care about reliability engineering and pragmatic automation:
            turning manual processes into repeatable systems, and building the
            observability and backup discipline that keeps infrastructure
            standing.
          </p>
          <p>
            Away from the data center, I write code for the fun of it, explore
            security tooling, and ship small web projects. Always open to an
            interesting problem.
          </p>
        </div>
      </section>
      <section className="contact-banner" aria-labelledby="cta-heading">
        <div>
          <p className="eyebrow mb-3">Let&apos;s work together</p>
          <h2 id="cta-heading" className="section-title">
            Have an infrastructure challenge?
          </h2>
          <p className="mt-3 font-sans text-muted-foreground">
            Tell me what you&apos;re building, operating, or trying to improve.
          </p>
        </div>
        <Link href="/contact/" className="action-primary shrink-0">
          <BinaryText text="Start a conversation" />{" "}
          <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
