"use client";
import React from "react";
import { StatusBar } from "./StatusBar";
import { TabBar, TABS } from "./TabBar";
import { OrbHint } from "./OrbHint";
import { ArrowUp, PanelTop } from "lucide-react";
export function ShellFrame({
  active,
  pathname,
  search,
  children,
}: {
  active: string;
  pathname: string;
  search: React.ReactNode;
  children: React.ReactNode;
}) {
  const windowNumber = TABS.findIndex((tab) => tab.id === active) + 1;
  const isOrb = active === "absurd";
  const panePath = pathname.replace(/^\/|\/$/g, "") || "about";
  return (
    <div className="tmux-shell">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <TabBar active={active} search={search} />
      <div className="tmux-pane">
        <div className="tmux-pane-title" aria-hidden="true">
          <span className="flex min-w-0 items-center gap-2">
            <PanelTop size={13} className="shrink-0 text-primary" />
            <span className="truncate">~/portfolio/<span className="text-foreground">{panePath}</span></span>
          </span>
          <span className="shrink-0">tmux <span className="mx-1 opacity-50">/</span> {windowNumber}:0</span>
        </div>
        <main
          id="main-content"
          tabIndex={-1}
          className={`tmux-content${isOrb ? " flex flex-col [&>div]:flex [&>div]:flex-1 [&>div]:flex-col" : ""}`}
          data-shell-scroll
        >
          {children}
          {!isOrb && <footer className="page-container tmux-footer">
            <span>Ahmed Jadani <span aria-hidden="true">/</span> 0xPacman</span>
            <button onClick={() => {
              const pane = document.getElementById("main-content");
              pane?.focus({ preventScroll: true });
              pane?.scrollTo({ top: 0 });
            }}>Back to top <ArrowUp size={13} aria-hidden="true" /></button>
          </footer>}
        </main>
      </div>
      <OrbHint />
      <StatusBar active={active} />
    </div>
  );
}
