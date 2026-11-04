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
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" aria-label="0xPacman home" className="brand">
          <span className="brand-mark" aria-hidden="true">
            0x
          </span>
          <BinaryText text="Pacman" />
          <span className="text-primary">_</span>
        </Link>
        <nav aria-label="Portfolio sections" className="main-nav">
          {TABS.map((tab, i) => (
            <Link
              key={tab.id}
              href={tab.href}
              aria-current={active === tab.id ? "page" : undefined}
              aria-keyshortcuts={`Alt+Shift+${i + 1}`}
              title={`${tab.label} · Alt+Shift+${i + 1}`}
              className={`nav-link ${active === tab.id ? "nav-link-active" : ""}`}
            >
              <span className="nav-number" aria-hidden="true">
                {i + 1}
              </span>
              <BinaryText text={tab.label} />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
