import React from "react";

export function useGsapSkillsAnimation(skillRefs: React.RefObject<HTMLDivElement>[]) {
  const [gsap, setGsap] = React.useState<typeof import('gsap').gsap | null>(null);
  const [ScrollTrigger, setScrollTrigger] = React.useState<typeof import('gsap/ScrollTrigger').ScrollTrigger | null>(null);

  React.useEffect(() => {
    let mounted = true;

    // Dynamic import GSAP only on client side
    const loadGSAP = async () => {
      try {
        const gsapModule = await import('gsap');
        const scrollTriggerModule = await import('gsap/ScrollTrigger');
        
        if (!mounted) return;
        
        const gsapInstance = gsapModule.gsap;
        const ScrollTriggerInstance = scrollTriggerModule.ScrollTrigger;
        
        gsapInstance.registerPlugin(ScrollTriggerInstance);
        
        setGsap(gsapInstance);
        setScrollTrigger(ScrollTriggerInstance);
      } catch (error) {
        console.warn('Failed to load GSAP:', error);
      }
    };

    loadGSAP();

    return () => {
      mounted = false;
    };
  }, []);

  React.useEffect(() => {
    if (!gsap || !ScrollTrigger || skillRefs.length === 0) return;

    const animations: (gsap.core.Tween | (() => void))[] = [];

    skillRefs.forEach((skillRef, index) => {
      if (!skillRef.current) return;

      const skillBar = skillRef.current.querySelector(".skill-bar") as HTMLDivElement;
      if (!skillBar) return;
      
      const skillLevel = skillBar.getAttribute("data-level");
      if (!skillLevel) return;

      // Set initial state
      gsap.set(skillBar, { width: "0%" });

      // Create animation
      const animation = gsap.to(skillBar, {
        width: `${skillLevel}%`,
        duration: 1.5,
        ease: "power3.out",
        delay: index * 0.1,
        scrollTrigger: {
          trigger: skillRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none none",
        }
      });

      animations.push(animation);

      // Hover effect
      const card = skillRef.current;
      let hoverAnimation: gsap.core.Tween | undefined;

      const handleMouseEnter = () => {
        hoverAnimation = gsap.to(card, { 
          scale: 1.02, 
          duration: 0.3, 
          ease: "power2.out" 
        });
      };

      const handleMouseLeave = () => {
        if (hoverAnimation) {
          hoverAnimation.reverse();
        }
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      // Store cleanup function
      animations.push(() => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
        if (hoverAnimation) {
          hoverAnimation.kill();
        }
      });
    });

    // Cleanup function
    return () => {
      animations.forEach((item) => {
        if (typeof item === 'function') {
          item(); // Execute cleanup function
        } else if (item && item.kill) {
          item.kill(); // Kill GSAP animation
        }
      });
      
      if (ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    };
  }, [gsap, ScrollTrigger, skillRefs]);
}
