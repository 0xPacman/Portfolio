"use client";
import React from "react";
import { StatusBar } from "./StatusBar";
import { TabBar, TABS } from "./TabBar";
import { OrbHint } from "./OrbHint";
export function ShellFrame({
  active,
  children,
}: {
  active: string;
  children: React.ReactNode;
}) {
  const windowNumber = TABS.findIndex((tab) => tab.id === active) + 1;
  const isOrb = active === "absurd";
  return (
    <div className="tmux-shell">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <TabBar active={active} />
      <div className="tmux-pane">
        <div className="tmux-pane-title" aria-hidden="true">
          <span className="flex min-w-0 items-center gap-3">
            <span className="text-primary">
              {windowNumber}:{active}
            </span>
            <span className="truncate">~/portfolio/{active}</span>
          </span>
          <span className="shrink-0 text-primary/60">pane 01</span>
        </div>
        <main
          id="main-content"
          tabIndex={-1}
          className={`tmux-content${isOrb ? " flex flex-col [&>div]:flex [&>div]:flex-1 [&>div]:flex-col" : ""}`}
          data-shell-scroll
        >
          {children}
          {!isOrb && <footer className="page-container flex flex-wrap justify-between gap-3 border-t border-primary/15 py-6 text-xs text-muted-foreground">
            <span>
              <span className="text-primary">[end]</span> Ahmed Jadani /
              0xPacman
            </span>
            <span>Cloud infrastructure. Thoughtfully operated.</span>
          </footer>}
        </main>
      </div>
      <OrbHint />
      <StatusBar active={active} />
    </div>
  );
}
