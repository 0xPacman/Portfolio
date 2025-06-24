import React from "react"
import { gsap } from "gsap"

export function useGsapFloatingShapes(refs: React.RefObject<HTMLDivElement>[]) {
  React.useEffect(() => {
    refs.forEach((ref, i) => {
      if (ref.current) {
        gsap.to(ref.current, {
          y: `+=${30 + i * 10}`,
          x: `+=${20 - i * 5}`,
          repeat: -1,
          yoyo: true,
          duration: 2.5 + i,
          ease: "sine.inOut",
        })
      }
    })
  }, [refs])
}
