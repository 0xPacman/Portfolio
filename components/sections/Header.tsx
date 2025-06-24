"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useGsapHeaderAnimation } from "@/components/gsap-header-animation";

interface HeaderProps {
  activeSection: string;
  isDarkMode: boolean;
  toggleTheme: () => void;
  scrollToSection: (sectionId: string) => void;
}

export const Header = ({
  activeSection,
  isDarkMode,
  toggleTheme,
  scrollToSection,
}: HeaderProps) => {
  const headerRef = useGsapHeaderAnimation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const cardClasses = isDarkMode
    ? "bg-black/40 backdrop-blur-md border-yellow-500/30"
    : "bg-white/60 backdrop-blur-md border-yellow-400/40";

  const textPrimary = "text-foreground";
  const textSecondary = "text-muted-foreground";

  return (
    <nav className="fixed top-0 w-full z-50" ref={headerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Card className={`${cardClasses} shadow-2xl`}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-lg">0x</span>
                </div>
                <div>
                  <div className={`text-xl font-bold ${textPrimary}`}>
                    Ahmed Jadani
                  </div>
                  <div
                    className={`text-xs text-amber-500 dark:text-amber-400`}
                  >
                    @0xPacman
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className={`${
                    isDarkMode
                      ? "hover:bg-yellow-500/20"
                      : "hover:bg-yellow-400/20"
                  } transition-colors`}
                >
                  {isDarkMode ? (
                    <Sun className="text-yellow-400" size={20} />
                  ) : (
                    <Moon className="text-yellow-600" size={20} />
                  )}
                </Button>

                <div className="hidden md:flex space-x-6">
                  {["home", "about", "skills", "projects", "contact"].map(
                    (section) => (
                      <button
                        key={section}
                        onClick={() => scrollToSection(section)}
                        className={`capitalize transition-all duration-300 px-4 py-2 rounded-lg ${
                          activeSection === section
                            ? `${textPrimary} ${
                                isDarkMode
                                  ? "bg-yellow-500/20"
                                  : "bg-yellow-400/20"
                              } backdrop-blur-sm`
                            : `${textSecondary} ${
                                isDarkMode
                                  ? "hover:text-white hover:bg-yellow-500/10"
                                  : "hover:text-gray-900 hover:bg-yellow-400/10"
                              }`
                        }`}
                      >
                        {section}
                      </button>
                    )
                  )}
                </div>

                <button
                  className={`md:hidden ${textPrimary} p-2 rounded-lg ${
                    isDarkMode ? "bg-yellow-500/20" : "bg-yellow-400/20"
                  }`}
                  onClick={() => setIsMenuOpen(true)}
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full ${
          isDarkMode ? "bg-black/90" : "bg-white/90"
        } backdrop-blur-lg z-50 transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-6">
          <button onClick={() => setIsMenuOpen(false)} className={`${textPrimary}`}>
            <X size={30} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {["home", "about", "skills", "projects", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => {
                scrollToSection(section);
                setIsMenuOpen(false);
              }}
              className={`capitalize text-3xl font-bold transition-all duration-300 ${
                activeSection === section
                  ? `${textPrimary}`
                  : `${textSecondary}`
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
