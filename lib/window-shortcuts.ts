export const PUBLIC_WINDOWS = [
  { id: "about", label: "About", href: "/" },
  { id: "skills", label: "Skills", href: "/skills/" },
  { id: "projects", label: "Projects", href: "/projects/" },
  { id: "blog", label: "Blog", href: "/blog/" },
  { id: "contact", label: "Contact", href: "/contact/" },
];

export const TOGGLE_FINDER = "portfolio:toggle-finder";

// Called in the shell and its same-origin artwork frame, which receives its own key events.
export function handleFinderShortcut(event: KeyboardEvent) {
  if (event.key.toLowerCase() !== "k" || !(event.metaKey || event.ctrlKey)) return;
  if (event.altKey || event.shiftKey || event.repeat || event.isComposing || event.defaultPrevented) return;
  if (document.querySelector("dialog[open]")) return;
  event.preventDefault();
  window.dispatchEvent(new Event(TOGGLE_FINDER));
}

export function windowShortcutHref(event: KeyboardEvent): string | null {
  if (
    !event.altKey ||
    event.shiftKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.repeat ||
    event.defaultPrevented
  ) {
    return null;
  }

  // Avoid instanceof: the same handler also receives events from the orb iframe.
  const target = event.target as Element | null;
  if (
    typeof target?.closest === "function" &&
    target.closest(
      'input, textarea, select, [contenteditable]:not([contenteditable="false"]), dialog, [role="dialog"], [role="alertdialog"]',
    )
  ) {
    return null;
  }

  if (event.code === "Digit0" || event.code === "Numpad0") {
    return "/absurd/";
  }

  const match = /^Digit([1-5])$/.exec(event.code);
  return match ? PUBLIC_WINDOWS[Number(match[1]) - 1].href : null;
}
