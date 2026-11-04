"use client";
import { ArrowUpRight, Mail, Copy, Check, MapPin, Clock } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { useCasablancaTime } from "@/hooks/use-casablanca-time";
import { BinaryText } from "@/components/ui/binary-text";
const email = "ahmed.jadani@0xpacman.com";
const channels = [
  {
    label: "LinkedIn",
    value: "linkedin.com/in/0xpacman",
    href: "https://linkedin.com/in/0xpacman",
  },
  {
    label: "GitHub",
    value: "github.com/0xPacman",
    href: "https://github.com/0xPacman",
  },
  {
    label: "Phone",
    value: "+212 708 429 995",
    href: "tel:+212708429995",
    copy: "+212708429995",
  },
  {
    label: "WhatsApp",
    value: "Start a conversation",
    href: "https://wa.me/212708429995",
  },
  {
    label: "Personal email",
    value: "ahmed4star@gmail.com",
    href: "mailto:ahmed4star@gmail.com",
    copy: "ahmed4star@gmail.com",
  },
];
export function Contact() {
  const { copy, copied, message } = useCopy();
  const now = useCasablancaTime();
  return (
    <div>
      <header className="page-intro">
        <p className="eyebrow">05 / Contact</p>
        <h1 className="page-title">
          Let&apos;s solve
          <br />
          <span className="text-primary">an interesting problem.</span>
        </h1>
        <p className="page-description">
          Cloud infrastructure consulting, automation, security collaboration,
          or simply a hello. Email is the best place to start.
        </p>
      </header>
      <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
        <section
          className="min-w-0 border border-primary/30 bg-card p-6 sm:p-8"
          aria-labelledby="email-heading"
        >
          <p className="eyebrow mb-5 flex items-center gap-2">
            <Mail size={16} /> Direct contact
          </p>
          <h2 id="email-heading" className="font-sans text-2xl font-semibold">
            Tell me what you have in mind.
          </h2>
          <p className="mt-3 max-w-lg font-sans text-base leading-relaxed text-muted-foreground">
            A little context helps: what you&apos;re working on, the challenge,
            and any timeline you have in mind.
          </p>
          <a
            href={`mailto:${email}`}
            className="mt-6 block break-words font-mono text-base text-primary underline-offset-4 hover:underline sm:text-xl"
          >
            ahmed.jadani@
            <wbr />
            0xpacman.com
          </a>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={`mailto:${email}`} className="action-primary">
              <BinaryText text="Email Ahmed" /> <ArrowUpRight size={17} />
            </a>
            <button
              onClick={() => copy(email, "Work email")}
              className="action-secondary"
            >
              {copied === email ? <Check size={16} /> : <Copy size={16} />}
              <BinaryText text={copied === email ? "Copied" : "Copy email"} />
            </button>
          </div>
        </section>
        <aside className="border border-primary/20 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-sm text-term-green">
            <span className="h-2 w-2 bg-term-green" /> Open to collaboration
          </div>
          <div className="mt-7 space-y-5">
            <div className="flex gap-3">
              <MapPin size={17} className="mt-1 shrink-0 text-primary" />
              <div>
                <p className="text-sm">Casablanca, Morocco</p>
                <p className="mt-1 font-sans text-sm text-muted-foreground">
                  Working across cloud environments.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock size={17} className="mt-1 shrink-0 text-primary" />
              <div>
                <p className="text-sm">
                  {now ? `${now} local time` : "Casablanca local time"}
                </p>
                <p className="mt-1 font-sans text-sm text-muted-foreground">
                  Africa/Casablanca
                </p>
                <p className="mt-1 font-sans text-sm text-muted-foreground">
                  Typical hours: 09:00–18:00 local
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="min-h-10 py-3 text-sm text-primary"
      >
        {message}
      </p>
      <section className="pb-12 pt-4" aria-labelledby="channels-heading">
        <h2
          id="channels-heading"
          className="mb-6 font-sans text-2xl font-semibold"
        >
          Other ways to connect
        </h2>
        <div className="divide-y divide-primary/15 border border-primary/20 bg-card">
          {channels.map((channel) => (
            <div
              key={channel.label}
              className="flex items-center gap-3 px-5 py-4 sm:px-6"
            >
              <div className="min-w-0 flex-1 sm:grid sm:grid-cols-[150px_1fr] sm:items-center sm:gap-5">
                <p className="mb-1 text-xs text-muted-foreground sm:mb-0">
                  {channel.label}
                </p>
                <a
                  href={channel.href}
                  target={
                    channel.href.startsWith("https:") ? "_blank" : undefined
                  }
                  rel={
                    channel.href.startsWith("https:")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="inline-flex min-h-11 items-center gap-2 break-all text-sm hover:text-primary"
                >
                  {channel.label === "WhatsApp" ? (
                    <BinaryText text={channel.value} />
                  ) : (
                    channel.value
                  )}
                  <ArrowUpRight size={14} className="shrink-0 text-primary" />
                </a>
              </div>
              {channel.copy && (
                <button
                  onClick={() => copy(channel.copy!, channel.label)}
                  aria-label={`Copy ${channel.label.toLowerCase()}`}
                  className="flex min-h-11 min-w-11 shrink-0 items-center justify-center text-primary"
                >
                  {copied === channel.copy ? (
                    <Check size={18} />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
