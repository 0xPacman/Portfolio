import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useGsapProjectsAnimation(projectRefs: React.RefObject<HTMLDivElement>[]) {
  useGSAP(() => {
    projectRefs.forEach((projectRef) => {
      if (!projectRef.current) return;

      gsap.fromTo(projectRef.current, 
        { opacity: 0, y: 100, scale: 0.9 }, 
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        }
      );
    });
  }, { dependencies: [projectRefs] });
}
