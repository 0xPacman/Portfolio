"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ChevronDown, FolderOpen } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { projects } from "@/lib/projects";
import { selectedWork } from "@/lib/selected-work";
import { FeaturedWork } from "./FeaturedWork";
import styles from "./Directories.module.css";

const categories = ["All", "Enterprise", "Tools", "Web"] as const;
const directory = projects.filter(
  (project) => !selectedWork.some((featured) => featured.slug === project.slug),
);

export function Projects() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const filtered = directory.filter(
    (project) => category === "All" || project.category === category,
  );

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <h1 className="page-title">Engineering projects</h1>
        <div>
          <p className="page-description">
            Selected cloud engineering work, operations tooling, and the side
            projects that keep me curious.
          </p>
          <a href="#project-directory" className="text-link">
            Browse project directory <ArrowDown size={15} aria-hidden />
          </a>
        </div>
      </header>
      <section aria-labelledby="selected-heading">
        <h2 id="selected-heading" className="section-title mb-6">
          Selected work
        </h2>
        <FeaturedWork detailed />
      </section>
      <section
        id="project-directory"
        className="section-space scroll-mt-6"
        aria-labelledby="directory-heading"
      >
        <div className={styles.sectionHead}>
          <h2 id="directory-heading" className="section-title">
            Project directory
          </h2>
          <a
            href="https://github.com/0xPacman"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            <GithubIcon size={16} aria-hidden /> GitHub profile{" "}
            <ArrowUpRight size={15} aria-hidden />
          </a>
        </div>
        <div className={styles.toolBar}>
          <div
            role="group"
            aria-label="Filter project directory by category"
            className={styles.filters}
          >
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={styles.filter}
              >
                {item}
              </button>
            ))}
          </div>
          <span role="status" className={styles.meta}>
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          </span>
        </div>
        <div className={styles.list}>
          {filtered.map((project) => (
            <article
              id={project.slug}
              key={project.slug}
              className={styles.project}
            >
              <div className={styles.projectType}>
                <FolderOpen size={18} aria-hidden /> {project.category}
              </div>
              <div className="min-w-0">
                <div className={styles.projectTitle}>
                  <h3>{project.title}</h3>
                  <span className={styles.meta}>{project.status}</span>
                </div>
                <p className={styles.body}>{project.description}</p>
                {project.slug === "draw" && (
                  <p className={styles.note}>
                    Based on Excalidraw. Original whiteboard functionality
                    belongs to the upstream project.
                  </p>
                )}
                <ul className={styles.tags} aria-label="Technologies">
                  {project.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
                <div className={styles.projectActions}>
                  {project.links.demo && (
                    <a
                      className="text-link"
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${project.title}`}
                    >
                      Visit project <ArrowUpRight size={15} aria-hidden />
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      className="text-link"
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View source for ${project.title}`}
                    >
                      Source <GithubIcon size={15} aria-hidden />
                    </a>
                  )}
                  {project.links.visit && (
                    <a
                      className="text-link"
                      href={project.links.visit}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Explore {project.title}{" "}
                      <ArrowUpRight size={15} aria-hidden />
                    </a>
                  )}
                  {!project.links.demo &&
                    !project.links.github &&
                    !project.links.visit && (
                      <Link href="/contact/" className="text-link">
                        Discuss similar work{" "}
                        <ArrowUpRight size={15} aria-hidden />
                      </Link>
                    )}
                </div>
                <details className={styles.features}>
                  <summary>
                    Features <ChevronDown size={14} aria-hidden />
                  </summary>
                  <ul>
                    {project.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </details>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
