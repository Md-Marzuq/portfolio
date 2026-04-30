import React from "react";
import {SiGithub, SiLinkedin } from "react-icons/si";

export const Footer: React.FC = () => {
  return (
    <footer className="text-sm text-[var(--muted)] border-t border-[var(--border)] py-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 sm:px-6">
        {/* Left: message */}
        <div>
          Designed &amp; coded with ☕ + ❤️ by{" "}
          <span className="font-medium text-[var(--text)]">MD MARZUQ</span>
        </div>

        {/* Right: social icons */}
        <div className="flex items-center gap-4">
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            aria-label=""
            className="hover:text-[var(--text)] transition-colors"
          >
           
            <SiGithub size={20} />
          </a>
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-[var(--text)] transition-colors"
          >
            <SiLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};
