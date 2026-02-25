"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "Prizes", href: "#prizes" },
    { label: "Team", href: "#about" },
    { label: "Domains", href: "#events" },
    { label: "Timeline", href: "#timeline" },
    { label: "Why Participate", href: "#about" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#footer" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#010611]/85 backdrop-blur-xl border-b border-cyan-400/25 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
            : "bg-[#010611]/45 backdrop-blur-lg border-b border-cyan-500/10"
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between gap-2 sm:gap-3">
          {/* LOGO */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 md:gap-3 min-w-0"
          >
            <Image src="/logo.png" alt="Navonmesh Logo" width={132} height={44} className="h-7 sm:h-8 md:h-9 w-auto object-contain" />
          </motion.div>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[0.88rem] text-slate-300/95 hover:text-cyan-300 transition duration-300 font-semibold tracking-[0.04em]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* DESKTOP CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            <button className="px-4 lg:px-7 py-2 rounded-xl border border-cyan-300/80 text-cyan-200 text-[0.68rem] lg:text-xs font-bold tracking-[0.14em] uppercase bg-cyan-400/5 hover:bg-cyan-400/10 hover:shadow-[0_0_24px_rgba(34,211,238,0.35)] transition duration-300">
              Submission Templates
            </button>
            <button className="px-4 lg:px-7 py-2 rounded-xl border border-cyan-200/35 text-slate-900 text-[0.68rem] lg:text-xs font-extrabold tracking-[0.11em] uppercase bg-gradient-to-r from-cyan-300 to-teal-300 hover:brightness-105 hover:shadow-[0_0_30px_rgba(45,212,191,0.45)] transition duration-300">
              Brochure & Rulebook
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            className="md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-300 hover:bg-cyan-500/20 transition flex-shrink-0"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed top-14 left-0 right-0 bottom-0 z-40 md:hidden bg-[#010611]/95 backdrop-blur-xl border-b border-cyan-500/20 overflow-y-auto"
        >
          <div className="max-w-7xl mx-auto px-4 py-5 pb-8 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm text-slate-300 hover:text-cyan-300 transition font-semibold py-2.5 tracking-wide border-b border-cyan-500/10"
              >
                {link.label}
              </a>
            ))}
            <button className="w-full mt-3 px-6 py-3 rounded-xl border border-cyan-300/80 text-cyan-100 font-bold tracking-wider uppercase bg-cyan-500/10 hover:bg-cyan-500/20 transition duration-300">
              Submission Templates
            </button>
            <button className="w-full px-6 py-3 rounded-xl text-slate-900 font-extrabold tracking-wide uppercase bg-gradient-to-r from-cyan-300 to-teal-300 hover:brightness-105 transition duration-300">
              Brochure & Rulebook
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
