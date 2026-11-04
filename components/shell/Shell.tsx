"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { ShellFrame } from "./ShellFrame";
import { tabIdForPath, TABS } from "./TabBar";

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Legacy hash links: /#blog -> /blog/
  React.useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && TABS.some((t) => t.id === hash)) {
      router.replace(TABS.find((t) => t.id === hash)!.href);
    }
  }, [router]);

  // Reset content scroll on navigation
  React.useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) {
      document.getElementById(hash)?.scrollIntoView({ block: "start" });
    } else {
      document.querySelector("[data-shell-scroll]")?.scrollTo({ top: 0 });
    }
  }, [pathname]);

  return (
    <>
      <ShellFrame active={tabIdForPath(pathname)}>{children}</ShellFrame>
    </>
  );
}
