"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BinaryText } from "@/components/ui/binary-text";
export const TABS = [
  { id: "about", label: "About", href: "/" },
  { id: "skills", label: "Skills", href: "/skills/" },
  { id: "projects", label: "Projects", href: "/projects/" },
  { id: "blog", label: "Blog", href: "/blog/" },
  { id: "contact", label: "Contact", href: "/contact/" },
];
export function tabIdForPath(pathname: string) {
  return (
    TABS.find(
      (tab) => tab.id !== "about" && pathname.startsWith(tab.href.slice(0, -1)),
    )?.id ?? "about"
  );
}
export function TabBar({ active }: { active: string }) {
  const router = useRouter();
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        !e.altKey ||
        !e.shiftKey ||
        e.ctrlKey ||
        e.metaKey ||
        e.repeat ||
        e.defaultPrevented
      )
        return;
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="dialog"]',
        )
      )
        return;
      const index = Number(e.code.replace("Digit", "")) - 1;
      if (index >= 0 && index < TABS.length && e.code.startsWith("Digit")) {
        e.preventDefault();
        router.push(TABS[index].href);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);
  return (
    <header className="tmux-header">
      <div className="tmux-session">
        <Link href="/" aria-label="0xPacman home" className="tmux-brand">
          <span aria-hidden="true">[</span>
          <BinaryText text="0xPacman" />
          <span aria-hidden="true">]</span>
        </Link>
        <span className="text-[10px] text-muted-foreground md:hidden">
          tmux / portfolio
        </span>
      </div>
      <nav aria-label="Portfolio sections" className="tmux-windows">
        {TABS.map((tab, i) => (
          <Link
            key={tab.id}
            href={tab.href}
            aria-current={active === tab.id ? "page" : undefined}
            aria-keyshortcuts={`Alt+Shift+${i + 1}`}
            title={`${tab.label} · Alt+Shift+${i + 1}`}
            className={`tmux-window ${active === tab.id ? "tmux-window-active" : ""}`}
          >
            <span className="tmux-window-number" aria-hidden="true">
              {i + 1}:
            </span>
            <BinaryText text={tab.label.toLowerCase()} />
            <span className="tmux-window-marker" aria-hidden="true">
              {active === tab.id ? "*" : ""}
            </span>
          </Link>
        ))}
      </nav>
      <span
        className="ml-auto hidden items-center gap-3 px-5 text-[11px] text-muted-foreground lg:flex"
        aria-hidden="true"
      >
        <span className="text-primary">tmux</span>
        <span>session: portfolio</span>
      </span>
    </header>
  );
}
