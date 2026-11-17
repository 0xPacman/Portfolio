"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { windowShortcutHref } from "@/lib/window-shortcuts";
import styles from "./OrbScene.module.css";

export function OrbScene() {
  const router = useRouter();
  const frameRef = useRef<HTMLIFrameElement>(null);

  // A canvas click focuses the frame. Keep the shell's shortcuts available there.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const themeRoot = document.documentElement;
    const syncTheme = () => {
      const frameRoot = frame.contentDocument?.documentElement;
      const theme = themeRoot.classList.contains("dark") ? "dark" : "light";
      if (frameRoot && frameRoot.dataset.theme !== theme) {
        frameRoot.dataset.theme = theme;
      }
    };
    const themeObserver = new MutationObserver(syncTheme);
    themeObserver.observe(themeRoot, { attributes: true, attributeFilter: ["class"] });
    let detach: (() => void) | undefined;
    const connectFrame = () => {
      detach?.();
      syncTheme();
      const frameWindow = frame.contentWindow;
      if (!frameWindow) return;
      const onKey = (event: KeyboardEvent) => {
        const href = windowShortcutHref(event);
        if (!href) return;
        event.preventDefault();
        router.push(href);
      };
      frameWindow.addEventListener("keydown", onKey);
      detach = () => frameWindow.removeEventListener("keydown", onKey);
    };
    frame.addEventListener("load", connectFrame);
    connectFrame();
    return () => {
      themeObserver.disconnect();
      frame.removeEventListener("load", connectFrame);
      detach?.();
    };
  }, [router]);

  return (
    <section className={styles.scene} aria-label="An encounter with the absurd">
      <div className={styles.artwork}>
        <iframe
          ref={frameRef}
          className={styles.frame}
          src="/orb-assets/index.html"
          title="Interactive particle orb. Scroll, hover, or click to explore."
        />
      </div>
      <figure className={styles.quotation}>
        <blockquote>
          <p>
            <span className={styles.opening}>“I said that the world is absurd,</span>{" "}
            but I was too hasty. This world in itself is not reasonable, that is
            all that can be said. But what is absurd is the confrontation of this
            irrational and the <em>wild longing for clarity</em> whose call echoes
            in the human heart.”
          </p>
        </blockquote>
        <figcaption>Albert Camus</figcaption>
      </figure>
    </section>
  );
}
