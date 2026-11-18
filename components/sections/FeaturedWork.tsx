import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Layers3, Network, SquareTerminal } from "lucide-react";
import { selectedWork } from "@/lib/selected-work";
import styles from "./home.module.css";

const projectIcons = {
  "enterprise-cloud": Layers3,
  openstack: Network,
  serverinforeport: SquareTerminal,
};

export function FeaturedWork({ detailed = false }: { detailed?: boolean }) {
  if (!detailed) {
    return (
      <ul className={styles.projectList}>
        {selectedWork.map((project) => {
          const Icon = projectIcons[project.slug];
          return (
            <li key={project.slug}>
              <Link href={`/projects/#${project.slug}`} className={styles.projectLink}>
                <span className={styles.iconBox} aria-hidden="true"><Icon size={23} strokeWidth={1.45} /></span>
                <div className={styles.projectName}>
                  <span className={styles.category}>{project.category}</span>
                  <h3>{project.title}</h3>
                </div>
                <p className={styles.summary}>{project.summary}</p>
                <ArrowRight className={styles.rowArrow} size={18} aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="space-y-5">
      {selectedWork.map((project) => {
        const external = project.href.startsWith("https:");
        return (
          <article key={project.slug} id={project.slug} className="work-card grid scroll-mt-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="flex flex-col p-5 lg:col-start-2 lg:row-start-1 lg:p-8">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-muted-foreground">{project.category}</span>
                <span className="text-term-green">{project.status}</span>
              </div>
              <h3 className="font-sans text-xl font-semibold tracking-tight sm:text-2xl">{project.title}</h3>
              <p className="mt-3 font-sans text-base leading-relaxed text-muted-foreground">{project.summary}</p>
              <dl className="my-6 space-y-4">
                {([
                  ["The problem", project.problem],
                  ["My contribution", project.contribution],
                  ["The outcome", project.outcome],
                ] as const).map(([label, value]) => (
                  <div key={label} className="grid gap-1 sm:grid-cols-[130px_1fr] sm:gap-4">
                    <dt className="text-xs text-primary">{label}</dt>
                    <dd className="font-sans text-base leading-relaxed text-foreground/85">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mb-5 mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="border border-primary/15 px-2 py-1 text-xs text-muted-foreground">{tech}</span>
                ))}
              </div>
              <Link
                href={project.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="mt-auto inline-flex min-h-11 items-center justify-between gap-2 border-t border-primary/15 pt-3 text-sm text-primary hover:text-foreground"
              >
                {project.linkLabel} <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <figure className="flex flex-col justify-center border-t border-primary/15 p-5 lg:col-start-1 lg:row-start-1 lg:border-r lg:border-t-0 lg:p-8">
              <figcaption className="mb-4 text-xs text-muted-foreground">Conceptual architecture</figcaption>
              <ol className="architecture">
                {project.layers.map((layer, i) => (
                  <li key={layer}>
                    <div className={`architecture-node ${i === 1 ? "architecture-node-active" : ""}`}>{layer}</div>
                    {i < project.layers.length - 1 && (
                      <ArrowDown className="mx-auto my-2 text-primary/50" size={14} aria-hidden="true" />
                    )}
                  </li>
                ))}
              </ol>
            </figure>
          </article>
        );
      })}
    </div>
  );
}
