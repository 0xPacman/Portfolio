'use client'

import React from "react"
import { FileText, Clock, Rss } from "lucide-react"
import { SectionPrompt } from "@/components/shell/SectionPrompt"

const plannedPosts = [
  {
    title: "Private Cloud at Scale",
    description: "Lessons from architecting VMware and OpenStack platforms for enterprise workloads",
    tag: "infrastructure",
  },
  {
    title: "Automating the Boring Stuff",
    description: "Turning manual ops runbooks into repeatable systems with Terraform and Ansible",
    tag: "automation",
  },
  {
    title: "From Break-Fix to SRE",
    description: "How observability and error budgets changed how I think about reliability",
    tag: "reliability",
  },
]

export function Blog() {
  return (
    <section className="space-y-6">
      <SectionPrompt command="ls ~/blog/">
        Writing about infrastructure, automation, and the occasional rabbit hole. Posts will cover private cloud architecture, VMware, OpenStack, DevOps, and reliability engineering.
      </SectionPrompt>

      {/* Coming soon banner */}
      <div className="border border-primary/25 bg-card/50">
        <div className="flex items-center gap-2 px-4 py-1.5 border-b border-primary/10 text-[11px] font-mono text-muted-foreground">
          <Rss size={11} className="text-primary/60" aria-hidden="true" />
          <span>~/blog/feed.xml</span>
        </div>
        <div className="p-6 text-center space-y-3">
          <div className="text-2xl font-bold font-mono text-primary">$ publishing soon</div>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            The blog is under construction. Posts are being drafted, reviewed, and queued for release.
            Subscribe via RSS or check back later.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-primary/20 text-primary text-[12px] font-mono">
            <Clock size={12} aria-hidden="true" />
            ETA: coming soon
          </div>
        </div>
      </div>

      {/* Planned posts preview */}
      <div className="space-y-3">
        <div className="text-[12px] font-mono text-muted-foreground uppercase tracking-wider">
          {"// upcoming posts"}
        </div>
        <div className="space-y-2">
          {plannedPosts.map((post) => (
            <div
              key={post.title}
              className="border border-primary/10 bg-card/30 hover:border-primary/25 transition-colors"
            >
              <div className="flex items-start gap-3 p-4">
                <FileText size={14} className="text-primary/50 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-sm text-foreground font-medium">{post.title}</div>
                  <div className="text-[12px] text-muted-foreground mt-1 leading-relaxed">{post.description}</div>
                </div>
                <span className="text-[10px] font-mono text-primary/50 border border-primary/15 px-1.5 py-0.5 flex-shrink-0">
                  {post.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
