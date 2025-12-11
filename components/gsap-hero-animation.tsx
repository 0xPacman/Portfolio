import React from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { RoughEase, SlowMo } from "gsap/EasePack"
import { Draggable } from "gsap/Draggable"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { EaselPlugin } from "gsap/EaselPlugin"
import { Flip } from "gsap/Flip"
import { GSDevTools } from "gsap/GSDevTools"
import { InertiaPlugin } from "gsap/InertiaPlugin"
import { MotionPathHelper } from "gsap/MotionPathHelper"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"
import { Observer } from "gsap/Observer"
import { Physics2DPlugin } from "gsap/Physics2DPlugin"
import { PhysicsPropsPlugin } from "gsap/PhysicsPropsPlugin"
import { PixiPlugin } from "gsap/PixiPlugin"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { SplitText } from "gsap/SplitText"
import { TextPlugin } from "gsap/TextPlugin"
gsap.registerPlugin(
  useGSAP,
  Draggable,
  DrawSVGPlugin,
  EaselPlugin,
  Flip,
  GSDevTools,
  InertiaPlugin,
  MotionPathHelper,
  MotionPathPlugin,
  MorphSVGPlugin,
  Observer,
  Physics2DPlugin,
  PhysicsPropsPlugin,
  PixiPlugin,
  ScrambleTextPlugin,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText,
  TextPlugin,
  RoughEase,
  SlowMo
)

// Enhanced GSAP Hero Animation: 3D, SplitText, Parallax, and Color Flicker
export function GsapHeroAnimation() {
  const heroRef = React.useRef<HTMLDivElement>(null)
  const textRef = React.useRef<HTMLHeadingElement>(null)
  const imgRef = React.useRef<HTMLImageElement>(null)
  const bgGlowRef = React.useRef<HTMLDivElement>(null)
  const imgContainerRef = React.useRef<HTMLDivElement>(null)
  const scrambleRef = React.useRef<HTMLSpanElement>(null)


  React.useEffect(() => {
    if (heroRef.current && textRef.current && imgRef.current && bgGlowRef.current && imgContainerRef.current && scrambleRef.current) {
      // SplitText for headline
      const split = new SplitText(textRef.current, { type: "chars,words" })
      const chars = split.chars
      const scrambleEl = scrambleRef.current;
      const originalText = scrambleEl.textContent || "";
      scrambleEl.textContent = ''; // Clear it for the scramble effect

      // Timeline for hero entrance
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })
      tl.fromTo(
        heroRef.current,
        { opacity: 0, y: 120, rotateX: 30, scale: 0.98 },
        { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.2 }
      )
        .fromTo(
          bgGlowRef.current,
          { opacity: 0, scale: 0.7, filter: "blur(40px)" },
          { opacity: 1, scale: 1, filter: "blur(16px)", duration: 1.1 },
          "-=1"
        )
        .fromTo(
          imgRef.current,
          { opacity: 0, scale: 0.7, rotateY: -30, filter: "grayscale(1) blur(10px)" },
          { opacity: 1, scale: 1, rotateY: 0, filter: "grayscale(0) blur(0px)", duration: 1.2, ease: "elastic.out(1,0.7)" },
          "-=0.8"
        )
        .fromTo(
          chars,
          { opacity: 0, y: 80, rotateX: 90, color: "#fff700" },
          { opacity: 1, y: 0, rotateX: 0, color: "inherit", stagger: 0.04, duration: 0.7, ease: "back.out(2)" },
          "-=0.7"
        )
        // Scramble text animation
        .to(scrambleEl, {
            duration: 2,
            scrambleText: { text: originalText, chars: "0x_-" },
            ease: "none"
        }, "-=0.7")
        // Flicker color effect
        .to(
          chars,
          { color: "#fff700", repeat: 3, yoyo: true, duration: 0.08, stagger: 0.03 },
          "+=0.1"
        )

      // Parallax mouse effect
      const handleMouse = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window
        const x = (e.clientX / innerWidth - 0.5) * 40
        const y = (e.clientY / innerHeight - 0.5) * 40
        gsap.to(imgRef.current, { x, y, rotateY: x, rotateX: -y, duration: 0.7, ease: "power3.out" })
        gsap.to(bgGlowRef.current, { x: x * 0.5, y: y * 0.5, duration: 0.8, ease: "power2.out" })
      }
      window.addEventListener("mousemove", handleMouse)

      // Floating effect
      gsap.to(imgContainerRef.current, {
        y: "-=10",
        repeat: -1,
        yoyo: true,
        duration: 3.5,
        ease: "sine.inOut"
      });

      // Capture refs for cleanup
      const imgContainer = imgContainerRef.current;
      const scrambleEl = scrambleRef.current;

      return () => {
        window.removeEventListener("mousemove", handleMouse)
        split.revert();
        gsap.killTweensOf([imgContainer, scrambleEl]);
      }
    }
  }, [])

  return { heroRef, textRef, imgRef, bgGlowRef, imgContainerRef, scrambleRef }
}
