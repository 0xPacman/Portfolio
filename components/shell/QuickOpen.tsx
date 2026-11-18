"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, FileText, PanelsTopLeft, Search } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { handleFinderShortcut, PUBLIC_WINDOWS, TOGGLE_FINDER } from "@/lib/window-shortcuts";

type Article = { title: string; href: string; locale: string; tags: string[] };

// The platform is constant for the lifetime of the page.
const subscribeToPlatform = () => () => {};

export function QuickOpen({ articles }: { articles: Article[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const shortcut = useSyncExternalStore(subscribeToPlatform,
    () => /Mac|iPad|iPhone/.test(navigator.platform) ? "⌘ K" : "Ctrl K",
    () => "Ctrl K",
  );

  useEffect(() => {
    const toggle = () => setOpen(current => !current);
    window.addEventListener(TOGGLE_FINDER, toggle);
    window.addEventListener("keydown", handleFinderShortcut);
    return () => {
      window.removeEventListener(TOGGLE_FINDER, toggle);
      window.removeEventListener("keydown", handleFinderShortcut);
    };
  }, []);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="tmux-search" aria-label="Search portfolio" aria-keyshortcuts="Control+k Meta+k">
        <Search size={15} aria-hidden="true" /><span>Find</span><kbd>{shortcut}</kbd>
      </DialogTrigger>
      <DialogContent className="quick-open w-[calc(100%-2rem)] gap-0 overflow-hidden rounded-none bg-popover p-0 font-mono sm:rounded-none">
        <DialogTitle className="sr-only">Search portfolio</DialogTitle>
        <DialogDescription className="sr-only">Find a window or article by name or topic.</DialogDescription>
        <Command label="Find a window or article" loop>
          <CommandInput placeholder="Find a window or article…" />
          <CommandList>
            <CommandEmpty>No matches. Try a section name or topic.</CommandEmpty>
            <CommandGroup heading="Windows">
              {PUBLIC_WINDOWS.map((tab, index) => (
                <CommandItem key={tab.id} value={tab.label} onSelect={() => go(tab.href)}>
                  <PanelsTopLeft aria-hidden="true" /><span>{tab.label}</span><small className="ml-auto">Alt {index + 1}</small>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Articles">
              {articles.map(article => (
                <CommandItem key={article.href} value={article.href + " " + article.title} keywords={article.tags} onSelect={() => go(article.href)}>
                  <FileText aria-hidden="true" /><span lang={article.locale} dir="auto">{article.title}</span>
                  <small className="ml-auto uppercase">{article.locale}</small><ArrowUpRight aria-hidden="true" />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
