"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  MapPin,
  Building2,
  Globe,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import { GsapHeroAnimation } from "@/components/gsap-hero-animation";

interface HeroProps {
  isDarkMode: boolean;
  scrollToSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ isDarkMode, scrollToSection }) => {
  const { heroRef, textRef, imgRef, bgGlowRef, imgContainerRef, scrambleRef } = GsapHeroAnimation();

  const cardClasses = isDarkMode
    ? "bg-black/40 backdrop-blur-md border-yellow-500/30"
    : "bg-white/60 backdrop-blur-md border-yellow-400/40";
  const textPrimary = "text-foreground";
  const textSecondary = "text-muted-foreground";
  const textAccent = "text-amber-500 dark:text-amber-400";

  return (
    <section
      id="home"
      className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        <Card
          className={`${cardClasses} shadow-2xl hover:shadow-3xl transition-all duration-500`}
          ref={heroRef}
        >
          <CardContent className="p-12 text-center">
            <div className="mb-8" ref={imgContainerRef}>
              <div className="relative inline-block">
                <div ref={bgGlowRef} className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full blur-lg opacity-50 animate-pulse"></div>
                <img
                  ref={imgRef}
                  src="https://raw.githubusercontent.com/0xPacman/Portfolio/main/public/media/PDP.jpg"
                  alt="Ahmed Jadani - 0xPacman"
                  width={200}
                  height={200}
                  className={`relative mx-auto rounded-full border-4 ${
                    isDarkMode
                      ? "border-yellow-400/50"
                      : "border-yellow-500/50"
                  } shadow-2xl`}
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center animate-pulse">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="absolute -top-2 -left-2 bg-gradient-to-r from-yellow-400 to-yellow-600 w-12 h-8 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-xs">0x</span>
                </div>
              </div>
            </div>

            <h1
              ref={textRef}
              className={`text-5xl sm:text-7xl font-bold ${textPrimary} mb-4 bg-gradient-to-r ${
                isDarkMode
                  ? "from-white to-yellow-200"
                  : "from-gray-900 to-yellow-700"
              } bg-clip-text text-transparent`}
            >
              Ahmed Jadani
            </h1>

            <div className="flex items-center justify-center mb-6">
              <Badge
                className={`bg-gradient-to-r from-yellow-500 to-yellow-600 ${
                  isDarkMode ? "text-black" : "text-white"
                } border-0 text-lg px-6 py-2 shadow-lg`}
              >
                <Building2 className="mr-2" size={20} />
                <span ref={scrambleRef}>Cloud Infrastructure Engineer @ Atlas Cloud Services</span>
              </Badge>
            </div>

            <div className="flex items-center justify-center mb-6 space-x-4">
              <div className="flex items-center">
                <MapPin className={textAccent} size={16} />
                <span className={`${textSecondary} ml-1 text-sm`}>
                  Morocco
                </span>
              </div>
              <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
              <div className="flex items-center">
                <Globe className={textAccent} size={16} />
                <span className={`${textSecondary} ml-1 text-sm`}>
                  Public Cloud Provider
                </span>
              </div>
            </div>

            <p
              className={`text-xl ${textSecondary} mb-8 max-w-4xl mx-auto leading-relaxed`}
            >
              Leading cloud infrastructure at{" "}
              <span className={textAccent}>Atlas Cloud Services</span>, Morocco's
              premier data center. Specializing in private cloud architecture,
              public cloud solutions, and enterprise-grade infrastructure
              automation.
            </p>

            <div className="flex justify-center space-x-6 mb-8">
              <Link
                href="https://github.com/0xPacman"
                className={`${textSecondary} hover:${textAccent} transition-all duration-300 hover:scale-110 p-3 rounded-full ${
                  isDarkMode ? "bg-yellow-500/10" : "bg-yellow-400/20"
                } backdrop-blur-sm hover:shadow-lg`}
              >
                <Github size={24} />
              </Link>
              <Link
                href="https://linkedin.com/in/0xpacman"
                className={`${textSecondary} hover:${textAccent} transition-all duration-300 hover:scale-110 p-3 rounded-full ${
                  isDarkMode ? "bg-yellow-500/10" : "bg-yellow-400/20"
                } backdrop-blur-sm hover:shadow-lg`}
              >
                <Linkedin size={24} />
              </Link>
              <Link
                href="mailto:ahmed.jadani@atlascs.ma"
                className={`${textSecondary} hover:${textAccent} transition-all duration-300 hover:scale-110 p-3 rounded-full ${
                  isDarkMode ? "bg-yellow-500/10" : "bg-yellow-400/20"
                } backdrop-blur-sm hover:shadow-lg`}
              >
                <Mail size={24} />
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToSection("contact")}
                size="lg"
                className={`bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 ${
                  isDarkMode ? "text-black" : "text-white"
                } border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
              >
                <Rocket className="mr-2" size={20} />
                Let's Build Something Amazing
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className={`${
                  isDarkMode
                    ? "border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10"
                    : "border-yellow-500/50 text-yellow-600 hover:bg-yellow-400/10"
                } backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
              >
                <Link
                  href="https://0xpacman.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="mr-2" size={20} />
                  Visit Atlas Cloud Services
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <ChevronDown
            size={32}
            className={`mx-auto ${textSecondary} animate-bounce cursor-pointer hover:${textAccent} transition-colors`}
            onClick={() => scrollToSection("about")}
          />
        </div>
      </div>
    </section>
  );
};
