"use client";
import React from "react";
import Link from "next/link";
import { Terminal } from "lucide-react";
import { useRouter } from "next/navigation";
import { BinaryText } from "@/components/ui/binary-text";
import { PUBLIC_WINDOWS, windowShortcutHref } from "@/lib/window-shortcuts";
export const TABS = PUBLIC_WINDOWS;
export function tabIdForPath(pathname: string) {
  if (pathname === "/absurd" || pathname === "/absurd/") return "absurd";
  return (
    TABS.find(
      (tab) => tab.id !== "about" && pathname.startsWith(tab.href.slice(0, -1)),
    )?.id ?? "about"
  );
}
export function TabBar({ active, search }: { active: string; search: React.ReactNode }) {
  const router = useRouter();
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const href = windowShortcutHref(e);
      if (href) {
        e.preventDefault();
        router.push(href);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);
  return (
    <header className="tmux-header">
      <div className="tmux-session">
        <Link href="/" aria-label="0xPacman home" className="tmux-brand">
          <span className="tmux-brand-icon" aria-hidden="true"><Terminal size={17} strokeWidth={2.5} /></span>
          <BinaryText text="0xPacman" />
        </Link>
      </div>
      <nav aria-label="Portfolio sections" className="tmux-windows">
        {TABS.map((tab, i) => (
          <Link
            key={tab.id}
            href={tab.href}
            aria-current={active === tab.id ? "page" : undefined}
            aria-keyshortcuts={`Alt+${i + 1}`}
            title={`${tab.label} · Alt+${i + 1}`}
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
      {search}
    </header>
  );
}
