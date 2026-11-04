"use client";
import { useEffect, useRef, useState } from "react";
export function useCopy() {
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const copy = async (value: string, label: string) => {
    if (timer.current) clearTimeout(timer.current);
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setMessage(`${label} copied to clipboard.`);
      timer.current = setTimeout(() => {
        setCopied(null);
        setMessage("");
      }, 4000);
    } catch {
      setCopied(null);
      setMessage(
        `Could not copy ${label.toLowerCase()}. Please select and copy it directly.`,
      );
    }
  };
  return { copy, copied, message };
}
