import type { ReactNode } from "react";

/** Keep route content visible in server HTML, including before hydration. */
export default function Template({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
