"use client";
import { Sun, Moon } from "lucide-react";
import { useCasablancaTime } from "@/hooks/use-casablanca-time";
import { BinaryText } from "@/components/ui/binary-text";
export function StatusBar({ active }: { active: string }) {
  const now = useCasablancaTime();
  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next ? "#181816" : "#F2EEE8");
  };
  return (
    <div className="tmux-status">
      <div className="flex min-w-0 items-center gap-3">
        <span className="tmux-status-session"><span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />[main]</span>
        <span className="truncate">{active}</span>
      </div>
      <div className="flex shrink-0 items-center gap-3 sm:gap-5">
        <span className="hidden text-[10px] text-muted-foreground lg:inline">
          windows <kbd className="text-foreground">Alt 1–5</kbd>
        </span>
        <span
          className="text-[11px]"
          aria-label={`Casablanca local time ${now ?? ""}`}
        >
          <span className="hidden sm:inline">Casablanca </span><span className="sm:hidden">MA </span>{now ?? "—:—"}
        </span>
        <button
          onClick={toggleTheme}
          className="flex min-h-11 min-w-11 items-center justify-center gap-2 hover:text-primary"
        >
          <span className="sr-only dark:hidden">Switch to dark theme</span>
          <span className="sr-only hidden dark:block">Switch to light theme</span>
          <Moon size={16} aria-hidden="true" className="dark:hidden" />
          <Sun size={16} aria-hidden="true" className="hidden dark:inline" />
          <span aria-hidden="true" className="hidden sm:inline dark:sm:hidden"><BinaryText text="dark" /></span>
          <span aria-hidden="true" className="hidden dark:sm:inline"><BinaryText text="light" /></span>
        </button>
      </div>
    </div>
  );
}
