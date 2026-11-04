import type { CSSProperties } from "react";

/** A CSS-only decode effect, triggered by the enclosing link, button or summary. */
export function BinaryText({ text }: { text: string }) {
  let position = 0;
  // Keep long labels as quick as the navigation: the whole wave ends within 500ms.
  const stagger = Math.min(22, 260 / Math.max(text.length - 1, 1));

  return (
    <span className="binary-text">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(/(\s+)/).map((word, wordIndex) => {
          if (/^\s+$/.test(word)) {
            position += word.length;
            return word;
          }
          return (
            <span className="binary-word" key={wordIndex}>
              {Array.from(word).map((character, characterIndex) => {
                const index = position++;
                return (
                  <span
                    className="binary-char"
                    key={characterIndex}
                    style={
                      {
                        "--binary-delay": `${index * stagger}ms`,
                        "--binary-a": index % 2 ? '"1"' : '"0"',
                        "--binary-b": index % 2 ? '"0"' : '"1"',
                      } as CSSProperties
                    }
                  >
                    <span className="binary-letter">{character}</span>
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    </span>
  );
}
