import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useGsapSkillsAnimation(skillRefs: React.RefObject<HTMLDivElement>[]) {
  useGSAP(() => {
    skillRefs.forEach((skillRef) => {
      if (!skillRef.current) return;

      const skillBar = skillRef.current.querySelector(".skill-bar") as HTMLDivElement;
      const skillLevel = skillBar.dataset.level;

      if (skillBar && skillLevel) {
        gsap.fromTo(skillBar, 
          { width: "0%" }, 
          {
            width: `${skillLevel}%`,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: skillRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            }
          }
        );
      }

      // Hover effect
      const card = skillRef.current;
      const tl = gsap.timeline({ paused: true });
      tl.to(card, { scale: 1.05, duration: 0.3, ease: "power2.out" })
        .to(card, { boxShadow: "0px 10px 30px rgba(255, 215, 0, 0.3)", duration: 0.3 }, "-=0.3");

      card.addEventListener("mouseenter", () => tl.play());
      card.addEventListener("mouseleave", () => tl.reverse());

      return () => {
        card.removeEventListener("mouseenter", () => tl.play());
        card.removeEventListener("mouseleave", () => tl.reverse());
      }
    });
  }, { dependencies: [skillRefs] });
}
