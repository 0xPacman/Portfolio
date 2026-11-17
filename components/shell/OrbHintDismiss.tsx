"use client";

import { useCallback, useEffect, useRef } from "react";
import { X } from "lucide-react";

export function OrbHintDismiss({
  onDismiss,
  onDiscover,
  className,
}: {
  onDismiss: () => void;
  onDiscover: () => void;
  className?: string;
}) {
  const timer = useRef<number | null>(null);
  const contact = useRef<{ id: number; x: number; y: number } | null>(null);
  const pointerType = useRef("mouse");
  const suppressClick = useRef(false);

  const cancelHold = useCallback(() => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
    contact.current = null;
  }, []);

  useEffect(() => {
    window.addEventListener("blur", cancelHold);
    window.addEventListener("scroll", cancelHold, true);
    document.addEventListener("visibilitychange", cancelHold);
    return () => {
      cancelHold();
      window.removeEventListener("blur", cancelHold);
      window.removeEventListener("scroll", cancelHold, true);
      document.removeEventListener("visibilitychange", cancelHold);
    };
  }, [cancelHold]);

  return (
    <button
      type="button"
      aria-label="Dismiss this hint for this session"
      className={className}
      style={{ WebkitTouchCallout: "none", userSelect: "none", touchAction: "manipulation" }}
      onPointerDown={(event) => {
        cancelHold();
        if (!event.isPrimary) return;
        pointerType.current = event.pointerType;
        suppressClick.current = false;
        if (event.button !== 0 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || !["touch", "pen"].includes(event.pointerType)) return;
        contact.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
        timer.current = window.setTimeout(() => {
          timer.current = null;
          suppressClick.current = true;
          onDiscover();
        }, 900);
      }}
      onPointerMove={(event) => {
        const start = contact.current;
        if (start?.id === event.pointerId && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 12) {
          cancelHold();
        }
      }}
      onPointerUp={cancelHold}
      onPointerCancel={cancelHold}
      onPointerLeave={cancelHold}
      onClick={(event) => {
        if (suppressClick.current) {
          event.preventDefault();
          event.stopPropagation();
          suppressClick.current = false;
          return;
        }
        onDismiss();
      }}
      onKeyDown={() => {
        cancelHold();
        pointerType.current = "mouse";
        suppressClick.current = false;
      }}
      onContextMenu={(event) => {
        const type = (event.nativeEvent as PointerEvent).pointerType || pointerType.current;
        if (type === "touch" || type === "pen") event.preventDefault();
      }}
    >
      <X size={16} aria-hidden="true" />
    </button>
  );
}
