import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { selectedWork } from "@/lib/selected-work";
import { BinaryText } from "@/components/ui/binary-text";

export function FeaturedWork({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className={detailed ? "space-y-5" : "grid gap-4 lg:grid-cols-3"}>
      {selectedWork.map((project) => (
        <article
          key={project.slug}
          id={project.slug}
          className={`work-card scroll-mt-8 ${detailed ? "grid lg:grid-cols-[0.8fr_1.2fr]" : "flex flex-col"}`}
        >
          <div
            className={`border-b border-primary/15 p-5 ${detailed ? "lg:border-b-0 lg:border-r lg:p-8" : ""}`}
          >
            <div className="mb-5 flex items-center justify-between gap-3 text-xs">
              <span className="text-primary">/{project.number}</span>
              <span className="text-muted-foreground">{project.category}</span>
            </div>
            <div
              className="architecture"
              aria-label={`${project.title}: conceptual overview`}
            >
              {project.layers.map((layer, i) => (
                <div key={layer}>
                  <div
                    className={`architecture-node ${i === 1 ? "architecture-node-active" : ""}`}
                  >
                    {layer}
                  </div>
                  {i < project.layers.length - 1 && (
                    <ArrowDown
                      className="mx-auto my-2 text-primary/50"
                      size={14}
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              Conceptual overview
            </p>
          </div>
          <div
            className={`flex flex-1 flex-col p-5 ${detailed ? "lg:p-8" : ""}`}
          >
            <span className="mb-3 text-xs text-term-green">
              {project.status}
            </span>
            <h3 className="font-sans text-xl font-semibold tracking-tight sm:text-2xl">
              {project.title}
            </h3>
            <p className="mt-3 font-sans text-base leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
            {detailed && (
              <dl className="my-6 space-y-4">
                {(
                  [
                    ["The problem", project.problem],
                    ["My contribution", project.contribution],
                    ["The outcome", project.outcome],
                  ] as const
                ).map(([label, value]) => (
                  <div
                    key={label}
                    className="grid gap-1 sm:grid-cols-[130px_1fr] sm:gap-4"
                  >
                    <dt className="text-xs text-primary">{label}</dt>
                    <dd className="font-sans text-base leading-relaxed text-foreground/85">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
            <div className="mb-5 mt-5 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="border border-primary/15 px-2 py-1 text-xs text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
            <Link
              href={detailed ? project.href : `/projects/#${project.slug}`}
              target={
                detailed && project.href.startsWith("https:")
                  ? "_blank"
                  : undefined
              }
              rel={
                detailed && project.href.startsWith("https:")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="mt-auto inline-flex min-h-11 items-center justify-between gap-2 border-t border-primary/15 pt-3 text-sm text-primary hover:text-foreground"
              aria-label={
                detailed ? undefined : `View project: ${project.title}`
              }
            >
              <BinaryText
                text={detailed ? project.linkLabel : "View project"}
              />{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
