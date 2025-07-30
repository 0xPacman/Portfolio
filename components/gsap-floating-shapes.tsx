import React from "react"

export function useGsapFloatingShapes(refs: React.RefObject<HTMLDivElement>[]) {
  React.useEffect(() => {
    let gsap: any = null;
    let animations: any[] = [];

    const loadAndAnimate = async () => {
      try {
        const gsapModule = await import('gsap');
        gsap = gsapModule.gsap;

        refs.forEach((ref, i) => {
          if (ref.current) {
            const animation = gsap.to(ref.current, {
              y: `+=${30 + i * 10}`,
              x: `+=${20 - i * 5}`,
              repeat: -1,
              yoyo: true,
              duration: 2.5 + i,
              ease: "sine.inOut",
            });
            animations.push(animation);
          }
        });
      } catch (error) {
        console.warn('Failed to load GSAP for floating shapes:', error);
      }
    };

    loadAndAnimate();

    // Cleanup function
    return () => {
      animations.forEach(animation => {
        if (animation && animation.kill) {
          animation.kill();
        }
      });
      
      if (gsap) {
        refs.forEach((ref) => {
          if (ref.current) {
            gsap.killTweensOf(ref.current);
          }
        });
      }
    };
  }, [refs])
}
