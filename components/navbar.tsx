"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useTheme } from "@/hooks/use-theme";

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about", id: "about" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Stack", href: "#stack", id: "stack" },
  { label: "Writing", href: "#writing", id: "writing" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const AuthorDetail = {
  name: "Pratik Sharma",
  position: "Software Engineer",
};

export function Navbar() {
  const [activeItem, setActiveItem] = useState("About");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resolvedTheme, toggleTheme, mounted } = useTheme();

  // Position and width for the venom stretchy indicator
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const isClickingRef = useRef(false);

  // Measure and align the stretchy indicator to the active link
  const updateIndicator = useCallback(() => {
    const currentItemEl = itemRefs.current[activeItem];
    const navContainerEl = navRef.current;
    if (currentItemEl && navContainerEl) {
      const navRect = navContainerEl.getBoundingClientRect();
      const itemRect = currentItemEl.getBoundingClientRect();

      setIndicatorStyle({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
        opacity: 1,
      });
    }
  }, [activeItem]);

  // Recalculate on activeItem change and window resize
  useEffect(() => {
    updateIndicator();

    const handleResize = () => {
      updateIndicator();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateIndicator]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Scroll spy: automatically shift highlight to the active section
  useEffect(() => {
    const handleScroll = () => {
      if (isClickingRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if user is at the bottom of the page -> activate Contact
      if (windowHeight + scrollY >= documentHeight - 60) {
        setActiveItem("Contact");
        return;
      }

      // Check if user is near top -> activate About
      if (scrollY < 120) {
        setActiveItem("About");
        return;
      }

      // Find the current active section
      const offsetMargin = 140; // Offset for sticky navbar
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const sectionEl = document.getElementById(item.id);
        if (sectionEl) {
          const sectionTop = sectionEl.offsetTop;
          if (scrollY + offsetMargin >= sectionTop) {
            setActiveItem(item.label);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault();
    setActiveItem(item.label);
    setMobileMenuOpen(false);
    isClickingRef.current = true;

    const targetEl = document.getElementById(item.id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }

    setTimeout(() => {
      isClickingRef.current = false;
    }, 800);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-secondary/50 bg-neutral/95 backdrop-blur-md dark:border-secondary dark:bg-primary/95 transition-colors">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 font-mono">
          {/* Brand / Name */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-primary dark:text-neutral hover:opacity-80 transition-opacity"
            >
              <span className="inline-block h-2 w-2 bg-primary dark:bg-neutral shrink-0" />
              <span className="hidden sm:inline">
                {AuthorDetail.name} // {AuthorDetail.position}
              </span>
              <span className="sm:hidden font-semibold">
                {AuthorDetail.name}
              </span>
            </Link>
          </div>

          {/* Center Nav Links with Venom Stretchy Highlight (Desktop) */}
          <nav
            ref={navRef}
            className="relative hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm py-1"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem === item.label;
              return (
                <a
                  key={item.label}
                  ref={(el) => {
                    itemRefs.current[item.label] = el;
                  }}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item)}
                  className={`relative py-1 transition-colors duration-300 ${
                    isActive
                      ? "font-medium text-primary dark:text-neutral"
                      : "text-secondary dark:text-tertiary hover:text-primary dark:hover:text-neutral"
                  }`}
                >
                  <span>{item.label}</span>
                </a>
              );
            })}

            {/* Venom Stretchy Elastic Underline Indicator */}
            <span
              className="absolute bottom-[-4px] left-0 h-[2.5px] bg-primary dark:bg-neutral rounded-full pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.22,1.5,0.36,1)]"
              style={{
                transform: `translateX(${indicatorStyle.left}px)`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
              }}
            >
              <span className="absolute inset-0 bg-primary/40 dark:bg-neutral/40 blur-[2px] rounded-full scale-y-125" />
            </span>
          </nav>

          {/* Right CTA & Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle light/dark theme"
              className="inline-flex h-8 items-center gap-1.5 border border-secondary/40 dark:border-secondary bg-transparent px-2 sm:px-2.5 text-xs text-primary dark:text-neutral hover:border-tertiary hover:bg-secondary/10 dark:hover:bg-secondary/40 transition-colors cursor-pointer"
            >
              {!mounted ? (
                <span className="inline-block h-3.5 w-12 sm:w-14 animate-pulse bg-tertiary/20" />
              ) : resolvedTheme === "dark" ? (
                <>
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                  <span className="tracking-wider text-[11px] sm:text-xs">
                    [LIGHT]
                  </span>
                </>
              ) : (
                <>
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                  </svg>
                  <span className="tracking-wider text-[11px] sm:text-xs">
                    [DARK]
                  </span>
                </>
              )}
            </button>

            {/* Desktop Hire Me Button */}
            <a
              href="#contact"
              onClick={(e) =>
                handleLinkClick(e, {
                  label: "Contact",
                  href: "#contact",
                  id: "contact",
                })
              }
              className="hidden sm:inline-flex h-8 items-center justify-center border border-secondary/40 dark:border-secondary bg-transparent px-3 text-xs sm:text-sm text-primary dark:text-neutral hover:bg-primary hover:text-neutral dark:hover:bg-neutral dark:hover:text-primary hover:border-transparent transition-all cursor-pointer"
            >
              Hire Me
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden inline-flex h-8 items-center justify-center border border-secondary/40 dark:border-secondary px-2 text-xs text-primary dark:text-neutral hover:bg-secondary/10 dark:hover:bg-secondary/40 transition-colors"
            >
              {mobileMenuOpen ? "[CLOSE]" : "[MENU]"}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-secondary/30 dark:border-secondary bg-neutral dark:bg-primary md:hidden font-mono px-4 py-3 shadow-lg">
            <nav className="flex flex-col gap-2.5">
              {NAV_ITEMS.map((item) => {
                const isActive = activeItem === item.label;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item)}
                    className={`flex items-center justify-between py-1.5 text-sm transition-colors ${
                      isActive
                        ? "font-medium text-primary dark:text-neutral"
                        : "text-tertiary hover:text-primary dark:hover:text-neutral"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="text-xs text-primary dark:text-neutral font-mono">
                        ● ACTIVE
                      </span>
                    )}
                  </a>
                );
              })}

              {/* Mobile Hire Me CTA */}
              <div className="pt-2 border-t border-secondary/20 dark:border-secondary/40 mt-1">
                <a
                  href="#contact"
                  onClick={(e) =>
                    handleLinkClick(e, {
                      label: "Contact",
                      href: "#contact",
                      id: "contact",
                    })
                  }
                  className="w-full flex items-center justify-center py-2 bg-primary text-neutral dark:bg-neutral dark:text-primary text-xs font-semibold tracking-wider hover:opacity-90 transition-opacity"
                >
                  Hire Me →
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Backdrop for Mobile Menu */}
      {mobileMenuOpen && (
        <div
          aria-hidden="true"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
        />
      )}
    </>
  );
}
