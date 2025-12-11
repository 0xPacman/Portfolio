import React from "react"
import { gsap } from "gsap"

export function useGsapSectionReveal(refs: React.RefObject<HTMLElement>[], options = {}) {
  React.useEffect(() => {
    refs.forEach((ref, i) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            delay: 0.2 + i * 0.15,
            ease: "power3.out",
            ...options,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        )
      }
    })
  }, [refs, options])
}
