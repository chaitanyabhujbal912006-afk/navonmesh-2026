"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const registrationFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScl1YbcLNNJl_we0kAl8u0wXcx-mH3imTXoq9SlcJBlq74a7Q/viewform";

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
    { label: "Domains", href: "#events" },
    { label: "Prizes", href: "#prizes" },
    { label: "Team", href: "#about" },
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
            <Image src="/navon.png" alt="Navon Logo" width={168} height={66} className="h-9 sm:h-10 md:h-11 w-auto object-contain" />
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
            <a
              href={registrationFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-4 lg:px-7 rounded-xl border border-cyan-300/80 text-cyan-200 text-[0.68rem] lg:text-xs font-bold leading-none tracking-[0.14em] uppercase bg-cyan-400/5 hover:bg-cyan-400/10 hover:shadow-[0_0_24px_rgba(34,211,238,0.35)] transition duration-300 inline-flex items-center justify-center"
            >
             Register Now
            </a>
            <a
              href="/navonmesh-brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="NAVONMESH-2026-Brochure-Rulebook.pdf"
              className="h-10 px-4 lg:px-7 rounded-xl border border-cyan-200/35 text-slate-900 text-[0.68rem] lg:text-xs font-extrabold leading-none tracking-[0.11em] uppercase bg-gradient-to-r from-cyan-300 to-teal-300 hover:brightness-105 hover:shadow-[0_0_30px_rgba(45,212,191,0.45)] transition duration-300 inline-flex items-center justify-center"
            >
              Brochure & Rulebook
            </a>
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
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-14 left-0 right-0 bottom-0 z-40 md:hidden overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_4%,rgba(34,211,238,0.28),transparent_30%),radial-gradient(circle_at_92%_10%,rgba(59,130,246,0.24),transparent_35%),linear-gradient(180deg,rgba(1,5,16,0.96),rgba(1,8,20,0.98))]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.18] bg-[linear-gradient(rgba(125,211,252,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.2)_1px,transparent_1px)] bg-[size:64px_64px]" />
            <motion.div
              initial={{ y: -18, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -10, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative h-full overflow-y-auto px-4 pt-5 pb-8"
            >
              <div className="mx-auto max-w-2xl rounded-2xl border border-cyan-400/35 bg-[linear-gradient(180deg,rgba(3,12,27,0.92),rgba(1,8,20,0.92))] p-3 shadow-[0_0_45px_rgba(6,182,212,0.2)] backdrop-blur-xl">
                <div className="mb-2 px-2 pt-1 pb-2 text-[10px] uppercase tracking-[0.28em] text-cyan-300/80">
                  Navigate
                </div>
                <div className="space-y-2">
                  {navLinks.map((link, idx) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className="group flex items-center justify-between rounded-xl border border-cyan-500/30 bg-cyan-500/[0.07] px-3.5 py-3 text-slate-200 transition hover:border-cyan-300/70 hover:bg-cyan-400/15"
                    >
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-400/50 bg-cyan-500/15 text-[11px] font-black tracking-wide text-cyan-200">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[15px] font-semibold tracking-[0.05em]">{link.label}</span>
                      </div>
                      <svg className="h-4 w-4 text-cyan-300 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.a>
                  ))}
                </div>
                <div className="mt-4 grid gap-2.5">
                  <a
                    href={registrationFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex w-full items-center justify-center rounded-xl border border-cyan-300/85 bg-cyan-500/15 px-6 py-3.5 text-sm font-black uppercase tracking-[0.12em] text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.2)] transition hover:bg-cyan-500/25"
                  >
                    Register Now
                  </a>
                  <a
                    href="/navonmesh-brochure.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="NAVONMESH-2026-Brochure-Rulebook.pdf"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex w-full items-center justify-center rounded-xl border border-cyan-100/20 bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-300 px-6 py-3.5 text-sm font-black uppercase tracking-[0.1em] text-[#021126] shadow-[0_0_28px_rgba(45,212,191,0.3)] transition hover:brightness-110"
                  >
                    Brochure & Rulebook
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
