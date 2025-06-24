import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useGsapHeaderAnimation() {
  const headerRef = React.useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!headerRef.current) return;

    const showAnim = gsap.from(headerRef.current, {
        yPercent: -150,
        paused: true,
        duration: 0.4,
        ease: "power2.inOut"
      }).progress(1);

      ScrollTrigger.create({
        start: "top top-=-80px", // Start after scrolling down 80px
        end: "max",
        onUpdate: (self) => {
          if (self.direction === -1) { // Scrolling up
            showAnim.play();
          } else { // Scrolling down
            showAnim.reverse();
          }
        }
      });
  }, { scope: headerRef });

  return headerRef;
}
