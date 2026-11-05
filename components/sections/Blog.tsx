import Link from "next/link";
import { ArrowUpRight, Languages, Rss } from "lucide-react";
import { BinaryText } from "@/components/ui/binary-text";
interface Post {
  title: string;
  description: string;
  tag: string;
  slug?: string;
  langAr?: boolean;
}

const posts: Post[] = [
  {
    title:
      "VMware vSphere Express: What You Get, What You Lose, and What It Actually Costs",
    description:
      "Broadcom's smaller vSphere bundle, the 128-core limit, the $9,600 pricing reference, and the operational details worth checking before a renewal.",
    tag: "vmware",
    slug: "vmware-vsphere-express",
  },
  {
    title:
      "The Challenge I Let Slip: Google foo.bar and the Case for Relentless Curiosity",
    description:
      "A one-time invitation from Google appeared in my search results in 2019. I froze, let it expire, and learned a lesson about curiosity that outlasted any algorithm",
    tag: "career",
    slug: "the-challenge-i-let-slip",
    langAr: true,
  },
  {
    title:
      "Active Directory at Scale: Hardening the Tier-0 Core (and Why I Built My Own Management Tool)",
    description:
      "The backbone of enterprise identity, hardening, scaling, and modernizing AD operations, plus the native tool I built to fix its daily frictions",
    tag: "active-directory",
    slug: "active-directory-at-scale",
    langAr: true,
  },
  {
    title:
      "Demystifying OpenStack: Architecture, Economics, and the Post-VMware Reality",
    description:
      "A practitioner's guide to deploying, scaling, and evaluating OpenStack, written from real deployments, not vendor decks",
    tag: "openstack",
    slug: "demystifying-openstack",
    langAr: true,
  },
  {
    title:
      "Automating the Boring Stuff: Turning Manual Runbooks into Repeatable Systems",
    description:
      "How I turn runbooks from documents humans read into state machines software executes, with Ansible, Python, and guardrailed AI agents",
    tag: "automation",
    slug: "automating-the-boring-stuff",
    langAr: true,
  },
  {
    title: "From Break-Fix to SRE",
    description:
      "How observability and error budgets changed how I think about reliability",
    tag: "reliability",
  },
];

export function Blog() {
  return (
    <div>
      <header className="page-intro">
        <p className="eyebrow">04 / Field notes</p>
        <h1 className="page-title">
          Notes from
          <br />
          behind the terminal.
        </h1>
        <p className="page-description">
          Infrastructure, automation, and the occasional rabbit hole. Lessons
          from building, operating, and figuring things out.
        </p>
      </header>
      <div className="divide-y divide-primary/20 border-y border-primary/20">
        {posts
          .filter((post) => post.slug)
          .map((post, index) => (
            <article
              key={post.title}
              className="grid gap-4 py-7 sm:grid-cols-[40px_1fr] sm:gap-5"
            >
              <span className="text-xs text-primary/70">0{index + 1}</span>
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-4">
                  <span className="text-xs text-primary">{post.tag}</span>
                  {post.langAr && (
                    <Link
                      href={`/blog/ar/${post.slug}/`}
                      lang="ar"
                      className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                      aria-label={`Read in Darija: ${post.title}`}
                    >
                      <Languages size={15} /> دارجة <ArrowUpRight size={13} />
                    </Link>
                  )}
                </div>
                <h2 className="max-w-3xl font-sans text-2xl font-semibold leading-snug tracking-tight">
                  <Link
                    href={`/blog/${post.slug}/`}
                    className="hover:text-primary"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 max-w-3xl font-sans text-base leading-relaxed text-muted-foreground">
                  {post.description}
                </p>
                <Link
                  href={`/blog/${post.slug}/`}
                  className="text-link mt-3"
                  aria-label={`Read article: ${post.title}`}
                >
                  <BinaryText text="Read article" /> <ArrowUpRight size={16} />
                </Link>
              </div>
            </article>
          ))}
      </div>
      <div className="py-8">
        <a
          href="/feed.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          <Rss size={16} /> <BinaryText text="Subscribe via RSS" />
        </a>
      </div>
    </div>
  );
}
