"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { OrbHintDismiss } from "./OrbHintDismiss";
import {
  ORB_HINT_STORAGE_KEY,
  advanceOrbHintSession,
  isOrbHintDue,
  markOrbHintSession,
  readOrbHintSession,
  type OrbHintSession,
} from "@/lib/orb-hint-session";
import styles from "./OrbHint.module.css";

// A tab-local fallback also prevents repeat hints when storage is unavailable.
let memorySession: OrbHintSession | undefined;
const QUIET_TIME_MS = 10_000;
const CHECKPOINT_MS = 5_000;

export function OrbHint() {
  const pathname = usePathname();
  const router = useRouter();
  const isOrb = pathname === "/absurd" || pathname === "/absurd/";
  const [visible, setVisible] = useState(false);
  const session = useRef<OrbHintSession>(readOrbHintSession(null));
  const preview = useRef(false);

  const save = useCallback((next: OrbHintSession) => {
    session.current = next;
    memorySession = next;
    try {
      sessionStorage.setItem(ORB_HINT_STORAGE_KEY, JSON.stringify(next));
    } catch { /* Private browsing still gets one hint per mounted session. */ }
  }, []);

  useEffect(() => {
    // Local visual review only. Production always uses the full 30-minute wait.
    preview.current = process.env.NODE_ENV === "development" &&
      new URLSearchParams(window.location.search).get("orbHint") === "preview";
    if (preview.current) {
      setVisible(!isOrb);
      return;
    }

    try {
      const stored = sessionStorage.getItem(ORB_HINT_STORAGE_KEY);
      session.current = stored ? readOrbHintSession(stored) : memorySession ?? readOrbHintSession(null);
    } catch {
      session.current = memorySession ?? readOrbHintSession(null);
    }

    if (isOrb) {
      save(markOrbHintSession(session.current, "discovered"));
      setVisible(false);
      return;
    }
    if (session.current.status !== "waiting") return;

    let previous = performance.now();
    let foreground = document.visibilityState === "visible" && document.hasFocus();
    let lastInteraction = previous;
    const checkpoint = (allowReveal = true) => {
      const now = performance.now();
      // A suspended browser or sleeping device must not add hours on wake-up.
      const elapsed = Math.min(Math.max(0, now - previous), CHECKPOINT_MS * 2);
      previous = now;
      save(advanceOrbHintSession(session.current, elapsed, foreground));
      const focused = document.activeElement;
      const busy = focused?.closest(
        'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="dialog"], dialog',
      ) || document.querySelector('dialog[open], [role="dialog"][aria-modal="true"]');
      const selecting = window.getSelection()?.isCollapsed === false;
      if (!allowReveal || !foreground || document.visibilityState !== "visible" || !document.hasFocus() || !isOrbHintDue(session.current) || busy || selecting || now - lastInteraction < QUIET_TIME_MS) return;
      save(markOrbHintSession(session.current, "shown"));
      window.clearInterval(interval);
      setVisible(true);
    };
    const syncForeground = () => {
      checkpoint(false);
      foreground = document.visibilityState === "visible" && document.hasFocus();
      lastInteraction = performance.now();
    };
    const onActivity = () => { lastInteraction = performance.now(); };
    const onPageHide = () => { checkpoint(false); foreground = false; };
    const activityEvents = ["pointerdown", "keydown", "scroll", "wheel", "touchmove"] as const;
    const interval = window.setInterval(checkpoint, CHECKPOINT_MS);
    document.addEventListener("visibilitychange", syncForeground);
    window.addEventListener("focus", syncForeground);
    window.addEventListener("blur", syncForeground);
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("pageshow", syncForeground);
    activityEvents.forEach((event) => document.addEventListener(event, onActivity, { capture: true, passive: true }));
    return () => {
      window.clearInterval(interval);
      // Persist time only: leaving the route must never trigger a new hint.
      const elapsed = Math.min(Math.max(0, performance.now() - previous), CHECKPOINT_MS * 2);
      save(advanceOrbHintSession(session.current, elapsed, foreground));
      document.removeEventListener("visibilitychange", syncForeground);
      window.removeEventListener("focus", syncForeground);
      window.removeEventListener("blur", syncForeground);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("pageshow", syncForeground);
      activityEvents.forEach((event) => document.removeEventListener(event, onActivity, true));
    };
  }, [isOrb, save]);

  const close = () => {
    if (!preview.current) save(markOrbHintSession(session.current, "dismissed"));
    setVisible(false);
  };

  const discover = () => {
    if (!preview.current) save(markOrbHintSession(session.current, "discovered"));
    setVisible(false);
    router.push("/absurd/");
  };

  return (
    <>
      <span className="sr-only" role="status" aria-live="polite">
        {visible && !isOrb ? "A quiet note from 0xPacman has appeared below the page." : ""}
      </span>
      {visible && !isOrb && (
        <aside className={styles.hint} aria-label="A note from 0xPacman">
          <span className={styles.orbit} aria-hidden="true" />
          <div className={styles.copy}>
            <p className={styles.eyebrow}>a note from 0xPacman</p>
            <p className={styles.message}>The answer isn&apos;t on the surface.</p>
            <p className={styles.riddle}>
              <span className={styles.keyboardRiddle}>Before the first, take the alternate path.</span>
              <span className={styles.touchRiddle}>An exit can be an entrance, if you linger.</span>
            </p>
          </div>
          <OrbHintDismiss className={styles.dismiss} onDismiss={close} onDiscover={discover} />
        </aside>
      )}
    </>
  );
}
