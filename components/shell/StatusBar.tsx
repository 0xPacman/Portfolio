"use client";
import React from "react";
import { Sun, Moon } from "lucide-react";
import { useCasablancaTime } from "@/hooks/use-casablanca-time";
import { BinaryText } from "@/components/ui/binary-text";
export function StatusBar({ active }: { active: string }) {
  const now = useCasablancaTime();
  const [isDark, setIsDark] = React.useState(true);
  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next ? "#0A0A0A" : "#F6F1E7");
    setIsDark(next);
  };
  return (
    <div className="tmux-status">
      <div className="flex min-w-0 items-center gap-3">
        <span className="tmux-status-session">[main]</span>
        <span className="hidden sm:inline">root@0xpacman</span>
        <span className="truncate text-primary">{active}</span>
      </div>
      <div className="flex shrink-0 items-center gap-3 sm:gap-5">
        <span className="hidden text-[10px] text-muted-foreground lg:inline">
          switch window <kbd className="text-foreground">Alt + 1–5</kbd>
        </span>
        <span
          className="text-[11px]"
          aria-label={`Casablanca local time ${now ?? ""}`}
        >
          MA {now ?? "—:—"}
        </span>
        <button
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          className="flex min-h-11 min-w-11 items-center justify-center gap-2 hover:text-primary"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
          <span className="hidden sm:inline">
            <BinaryText text={isDark ? "light" : "dark"} />
          </span>
        </button>
      </div>
    </div>
  );
}
