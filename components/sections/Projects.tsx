"use client";
import React from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { GithubIcon as Github } from "@/components/ui/brand-icons";
import { projects } from "@/lib/projects";
import { selectedWork } from "@/lib/selected-work";
import { FeaturedWork } from "./FeaturedWork";
import { BinaryText } from "@/components/ui/binary-text";
const categories = ["All", "Enterprise", "Tools", "Web"] as const;
export function Projects() {
  const [category, setCategory] = React.useState<string>("All");
  const others = projects.filter(
    (project) =>
      !selectedWork.some((featured) => featured.slug === project.slug),
  );
  const filtered =
    category === "All"
      ? others
      : others.filter((project) => project.category === category);
  return (
    <div>
      <header className="page-intro">
        <p className="eyebrow">03 / Projects</p>
        <h1 className="page-title">
          From infrastructure
          <br />
          to useful software.
        </h1>
        <p className="page-description">
          Selected cloud engineering work, operations tooling, and the side
          projects that keep me curious.
        </p>
        <a href="#project-directory" className="text-link">
          <BinaryText text="Jump to the project directory" />{" "}
          <ChevronDown size={16} />
        </a>
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
        <div className="section-header">
          <div>
            <p className="eyebrow mb-3">~/projects / directory</p>
            <h2 id="directory-heading" className="section-title">
              More things I&apos;ve built.
            </h2>
          </div>
          <a
            href="https://github.com/0xPacman"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            <Github size={16} /> <BinaryText text="View GitHub" />{" "}
            <ArrowUpRight size={15} />
          </a>
        </div>
        <div
          className="mb-5 flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter more projects"
        >
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`min-h-11 border px-4 text-sm transition-colors ${category === item ? "border-primary bg-primary text-primary-foreground" : "border-primary/25 text-muted-foreground hover:text-primary"}`}
            >
              <BinaryText text={item} />
            </button>
          ))}
          <span role="status" className="px-2 text-xs text-muted-foreground">
            {filtered.length} projects
          </span>
        </div>
        <div className="divide-y divide-primary/15 border border-primary/20 bg-card">
          {filtered.map((project) => (
            <article key={project.slug} className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-sans text-xl font-semibold">
                  {project.title}
                </h3>
                <span className="text-xs text-muted-foreground">
                  {project.category} <span className="text-primary/50">/</span>{" "}
                  {project.status}
                </span>
              </div>
              <p className="mt-3 max-w-3xl font-sans text-base leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              {project.slug === "draw" && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Based on Excalidraw. Original whiteboard functionality belongs
                  to the upstream project.
                </p>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="border border-primary/15 px-2 py-1 text-xs text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <details className="group mt-3">
                <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 text-sm text-primary">
                  <BinaryText text="Details & links" />{" "}
                  <ChevronDown
                    size={15}
                    className="transition-transform group-open:rotate-180"
                  />
                </summary>
                <ul className="grid gap-2 py-2 font-sans text-sm text-muted-foreground sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li key={feature}>
                      <span className="mr-2 text-term-green">+</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-3">
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-secondary"
                    >
                      <BinaryText text="Visit project" />{" "}
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-secondary"
                    >
                      <BinaryText text="View source" /> <Github size={16} />
                    </a>
                  )}
                  {project.links.visit && (
                    <a
                      href={project.links.visit}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-secondary"
                    >
                      <BinaryText text={`Explore ${project.title}`} />{" "}
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                  {!project.links.demo &&
                    !project.links.github &&
                    !project.links.visit && (
                      <Link href="/contact/" className="text-link">
                        <BinaryText text="Discuss similar work" />{" "}
                        <ArrowUpRight size={16} />
                      </Link>
                    )}
                </div>
              </details>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
