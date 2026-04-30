// Header.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  animate,
  useMotionTemplate,
} from "framer-motion";
import { PiSunDuotone, PiMoonDuotone, PiX, PiList } from "react-icons/pi";
import { useTheme } from "../../context/ThemeContext";

type NavLink = { href: string; label: string };

export const Header: React.FC<{ links?: NavLink[] }> = ({
  links = [],
}) => {
  const { dark, toggle } = useTheme();
  const headerRef = useRef<HTMLElement | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [active, setActive] = useState<string>(links[0]?.href ?? "#about");
  useEffect(() => {
    const sections = links
      .map((l) =>
        l.href.startsWith("#") ? document.querySelector(l.href) : null,
      )
      .filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [links]);

  const springScrollTo = (y: number) => {
    const controls = animate(window.scrollY, y, {
      type: "spring",
      stiffness: 200,
      damping: 30,
      onUpdate: (latest) => window.scrollTo(0, latest),
    });
    return () => controls.stop();
  };

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // normal navigation for external links
    if (!href.startsWith("#")) return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    const headerEl = headerRef.current ?? document.querySelector("header");
    const headerH = headerEl?.offsetHeight ?? 0;
    const y = target.getBoundingClientRect().top + window.scrollY - headerH;
    springScrollTo(y);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const { scrollY } = useScroll();
  const blurPx = useTransform(scrollY, [0, 100], [0, 16]);
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const overlayOpacity = useTransform(scrollY, [0, 100], [0, 0.14]);
  const backdrop = useMotionTemplate`blur(${blurPx}px)`;

  // NOTE: previously read PORTFOLIO_INFO.personal and BASE_URL here; removed unused bindings to satisfy TS checks.

  return (
    <motion.header
      ref={headerRef}
      className="fixed top-0 left-0 z-50 w-full overflow-visible"
      style={{
        backdropFilter: backdrop,
        WebkitBackdropFilter: backdrop,
      }}
    >
      {/* Background layer */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-[var(--surface)]"
        style={{
          opacity: bgOpacity,
        }}
      />
      {/* Border layer */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px pointer-events-none bg-[var(--border)]"
        style={{
          opacity: borderOpacity,
        }}
      />
      {/* Dark overlay for depth */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: `rgba(0,0,0,1)`,
          opacity: overlayOpacity,
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            className="sm:hidden p-2 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--border)]/30 transition cursor-pointer"
          >
            {isMobileMenuOpen ? <PiX size={22} /> : <PiList size={22} />}
          </button>
          <span className="text-sm font-semibold tracking-wide text-[var(--text)]">
            Portfolio
          </span>
        </div>

        <nav aria-label="Primary" className="relative flex items-center gap-3">
          <div className="hidden sm:flex gap-4">
            {links.map((l) => {
              const isActive = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => onNavClick(e, l.href)}
                  className="relative px-1 py-0.5 text-sm text-[var(--text)]"
                >
                  {l.label}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full bg-[var(--brand)]"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 40,
                        }}
                      />
                    )}
                  </AnimatePresence>
                </a>
              );
            })}
          </div>

          <button
            onClick={toggle}
            aria-label="Toggle color theme"
            className="p-2 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--border)]/30 transition cursor-pointer"
          >
            {dark ? <PiSunDuotone size={22} /> : <PiMoonDuotone size={22} />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="sm:hidden absolute inset-x-0 top-full bg-[var(--surface)] border-t border-[var(--border)] shadow-xl"
          >
            <div className="max-w-6xl mx-auto px-4 py-4 space-y-2">
              {links.map((l) => {
                const isActive = active === l.href;
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => onNavClick(e, l.href)}
                    className={`block rounded-xl px-3 py-3 text-sm transition-colors ${
                      isActive
                        ? "text-[var(--brand)] bg-[var(--brand)]/10"
                        : "text-[var(--text)] hover:bg-[var(--border)]/30"
                    }`}
                  >
                    {l.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
