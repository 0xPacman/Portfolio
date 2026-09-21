'use client'

import React from "react"
import Link from "next/link"
import { FileText, ArrowUpRight, Rss } from "lucide-react"
import { SectionPrompt } from "@/components/shell/SectionPrompt"

interface Post {
  title: string
  description: string
  tag: string
  slug?: string
}

const posts: Post[] = [
  {
    title: "The Challenge I Let Slip: Google foo.bar and the Case for Relentless Curiosity",
    description: "A one-time invitation from Google appeared in my search results in 2019. I froze, let it expire, and learned a lesson about curiosity that outlasted any algorithm",
    tag: "career",
    slug: "the-challenge-i-let-slip",
  },
  {
    title: "Active Directory at Scale: Hardening the Tier-0 Core (and Why I Built My Own Management Tool)",
    description: "The backbone of enterprise identity, hardening, scaling, and modernizing AD operations, plus the native tool I built to fix its daily frictions",
    tag: "active-directory",
    slug: "active-directory-at-scale",
  },
  {
    title: "Demystifying OpenStack: Architecture, Economics, and the Post-VMware Reality",
    description: "A practitioner's guide to deploying, scaling, and evaluating OpenStack, written from real deployments, not vendor decks",
    tag: "openstack",
    slug: "demystifying-openstack",
  },
  {
    title: "Automating the Boring Stuff: Turning Manual Runbooks into Repeatable Systems",
    description: "How I turn runbooks from documents humans read into state machines software executes, with Ansible, Python, and guardrailed AI agents",
    tag: "automation",
    slug: "automating-the-boring-stuff",
  },
  {
    title: "From Break-Fix to SRE",
    description: "How observability and error budgets changed how I think about reliability",
    tag: "reliability",
  },
]

function PostRow({ post }: { post: Post }) {
  const inner = (
    <div className="flex items-start gap-3 p-4">
      <FileText size={14} className="text-primary/50 mt-0.5 flex-shrink-0" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <div className="font-mono text-sm text-foreground font-medium flex items-center gap-1.5">
          {post.title}
          {post.slug && <ArrowUpRight size={13} className="text-primary flex-shrink-0" aria-hidden="true" />}
        </div>
        <div className="text-[12px] text-muted-foreground mt-1 leading-relaxed">{post.description}</div>
      </div>
      <span className="text-[10px] font-mono text-primary/50 border border-primary/15 px-1.5 py-0.5 flex-shrink-0">
        {post.slug ? post.tag : `${post.tag} · soon`}
      </span>
    </div>
  )

  const className = "block border border-primary/10 bg-card/30 hover:border-primary/40 hover:bg-card/50 transition-colors"

  return post.slug ? (
    <Link href={`/blog/${post.slug}/`} className={className}>
      {inner}
    </Link>
  ) : (
    <div className={`${className} opacity-70 cursor-default`}>{inner}</div>
  )
}

export function Blog() {
  return (
    <section className="space-y-6">
      <SectionPrompt command="ls ~/blog/">
        Writing about infrastructure, automation, and the occasional rabbit hole. Posts cover private cloud architecture, VMware, OpenStack, DevOps, and reliability engineering.
      </SectionPrompt>

      <div className="space-y-2">
        {posts.map((post) => (
          <PostRow key={post.title} post={post} />
        ))}
      </div>

      <div className="flex justify-end">
        <a
          href="/feed.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors"
        >
          <Rss size={11} aria-hidden="true" />
          subscribe via rss
        </a>
      </div>
    </section>
  )
}
