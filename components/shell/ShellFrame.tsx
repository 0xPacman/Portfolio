"use client";
import React from "react";
import { StatusBar } from "./StatusBar";
import { TabBar } from "./TabBar";
export function ShellFrame({
  active,
  children,
}: {
  active: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-background">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <TabBar active={active} />
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-0 flex-1 overflow-y-auto outline-none"
        data-shell-scroll
      >
        {children}
        <footer className="page-container flex flex-wrap justify-between gap-3 border-t border-primary/15 py-6 text-xs text-muted-foreground">
          <span>
            Ahmed Jadani <span className="text-primary/60">/</span> 0xPacman
          </span>
          <span>Cloud infrastructure. Thoughtfully operated.</span>
        </footer>
      </main>
      <StatusBar />
    </div>
  );
}
