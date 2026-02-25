"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "./components/Navbar";
import ParticlesBackground from "./ParticlesBackground";

// EVENTS DATA
const events = [
  {
    id: 1,
    name: "AI & ML Summit",
    category: "Artificial Intelligence",
    description: "Build intelligent solutions using cutting-edge AI algorithms. Compete for ₹50,000 prize pool.",
    icon: "🤖",
    color: "from-cyan-500/20 to-blue-600/20",
    borderColor: "border-cyan-400/50",
  },
  {
    id: 2,
    name: "Robotics Arena",
    category: "Robotics",
    description: "Design autonomous robots and compete in real-world challenges. Show your engineering prowess.",
    icon: "🦾",
    color: "from-purple-500/20 to-pink-600/20",
    borderColor: "border-purple-400/50",
  },
  { 
    id: 3,
    name: "Code Blitz",
    category: "Competitive Programming",
    description: "Solve algorithmic challenges under time pressure. Compete against the best minds.",
    icon: "💻",
    color: "from-green-500/20 to-emerald-600/20",
    borderColor: "border-green-400/50",
  },
  {
    id: 4,
    name: "Game Jam",
    category: "Game Development",
    description: "Create innovative games in 48 hours. Showcase your creativity and technical skills.",
    icon: "🎮",
    color: "from-orange-500/20 to-red-600/20",
    borderColor: "border-orange-400/50",
  },
  {
    id: 5,
    name: "WebWeave",
    category: "Web Development",
    description: "Build stunning web experiences. Full-stack development challenge with real-world scenarios.",
    icon: "🌐",
    color: "from-indigo-500/20 to-purple-600/20",
    borderColor: "border-indigo-400/50",
  },
  {
    id: 6,
    name: "StartUp Pitch",
    category: "Entrepreneurship",
    description: "Present your innovative ideas to industry leaders. Win funding and mentorship opportunities.",
    icon: "🚀",
    color: "from-yellow-500/20 to-orange-600/20",
    borderColor: "border-yellow-400/50",
  },
];

// TIMELINE DATA
const timeline = [
  { phase: "Registration Opens", date: "March 1, 2026", icon: "📝" },
  { phase: "Workshops & Training", date: "March 10-15, 2026", icon: "🎓" },
  { phase: "Events Begin", date: "March 20-22, 2026", icon: "🚀" },
  { phase: "Finals & Awards", date: "March 23, 2026", icon: "🏆" },
];

// FAQ DATA
const faqData = [
  {
    question: "Who can participate in NAVONMESH?",
    answer: "All students from any college/university worldwide are welcome. Some events may have specific prerequisites listed on the event page.",
  },
  {
    question: "Is there any registration fee?",
    answer: "Registration is completely FREE! However, some workshops may have nominal charges. All main events are free to participate.",
  },
  {
    question: "Can I participate in multiple events?",
    answer: "Absolutely! You can register for multiple events based on your schedule. Just ensure you manage your time effectively.",
  },
  {
    question: "Are teams allowed?",
    answer: "Yes! Most events allow teams of 2-4 members. Team details are specified for each event. Register as an individual and form teams during registration.",
  },
  {
    question: "When will results be announced?",
    answer: "Results will be announced within 24-48 hours after each event concludes. Winners will be notified via email.",
  },
];

export default function Home() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <ParticlesBackground />
      <Navbar />

      {/* ==================== HERO SECTION ==================== */}
      <section
        id="home"
        className="relative min-h-screen w-full overflow-hidden pt-20 md:pt-0 flex items-center justify-center"
      >
        {/* BACKGROUND IMAGE */}
        <Image
          src="/bg.png"
          alt="Background"
          fill
          priority
          className="object-cover"
        />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black"></div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20 text-center flex flex-col items-center justify-center min-h-screen">
          {/* UNIVERSITY BADGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 md:mb-8"
          >
            <Image
              src="/logo.png"
              alt="University Logo"
              width={160}
              height={70}
              className="opacity-95"
            />
          </motion.div>

          {/* TAGLINE */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xs md:text-sm text-gray-300 tracking-[3px] uppercase mb-4 md:mb-6 font-medium"
          >
            School of Engineering & Technology presents
          </motion.p>

          {/* MAIN TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-4xl md:text-6xl lg:text-8xl font-black leading-tight mb-2 md:mb-4 bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]"
          >
            NAVONMESH
          </motion.h1>

          {/* YEAR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center gap-3 md:gap-4 mb-4 md:mb-8"
          >
            <div className="h-1 w-6 md:w-12 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-cyan-300 tracking-[0.2em]">2026</h2>
            <div className="h-1 w-6 md:w-12 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
          </motion.div>

          {/* TAGLINE */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-base md:text-lg text-gray-300 font-light tracking-wider mb-8 md:mb-12"
          >
            Where Innovation Meets Excellence
          </motion.p>

          {/* CTA BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-8 md:px-10 py-3 md:py-4 text-sm md:text-base"
            >
              Register Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary px-8 md:px-10 py-3 md:py-4 text-sm md:text-base"
            >
              Explore Events
            </motion.button>
          </motion.div>

          {/* EVENT DATES */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xs md:text-sm text-gray-400 font-medium"
          >
            March 20-23, 2026
          </motion.div>
        </div>

        {/* SCROLL INDICATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-cyan-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section id="about" className="relative py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-black via-slate-950/30 to-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 font-display">
              <span className="neon-title">
                About the Fest
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
              NAVONMESH is India's premier university technology festival, uniting 6,000+ innovators and creators. 
              Compete across 6+ events, win ₹3+ lakhs in prizes, and make your mark on the tech world.
            </p>
          </motion.div>

          {/* FEATURE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: "🎯", title: "Innovation Hub", desc: "Showcase groundbreaking ideas" },
              { icon: "👥", title: "Global Community", desc: "Network with 6000+ innovators" },
              { icon: "🏆", title: "Premium Prizes", desc: "Win ₹3+ lakhs total prize pool" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group cyber-card p-6 md:p-8 rounded-2xl backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-300/70 transition duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition duration-300">{item.icon}</div>
                <h3 className="text-lg md:text-xl font-bold text-cyan-300 mb-2">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== EVENTS SECTION (PRIMARY FOCUS) ==================== */}
      <section id="events" className="relative py-16 md:py-24 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          {/* SECTION HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display">
              <span className="neon-title">
                Featured Events
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
              6 exciting competitions across AI, Robotics, Web Dev, Gaming, and more
            </p>
          </motion.div>

          {/* EVENTS GRID */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {events.map((event) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div
                  className={`cyber-card h-full rounded-2xl overflow-hidden border ${event.borderColor} backdrop-blur-lg transition duration-300 group-hover:border-opacity-100 group-hover:shadow-2xl group-hover:shadow-cyan-500/20 bg-gradient-to-br ${event.color}`}
                >
                  {/* CARD HEADER */}
                  <div className="p-6 md:p-8 h-full flex flex-col justify-between">
                    <div>
                      {/* ICON & CATEGORY */}
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-3xl md:text-4xl group-hover:scale-110 transition duration-300">{event.icon}</span>
                        <span className="px-3 py-1 text-xs font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 group-hover:bg-cyan-500/40 transition">
                          {event.category}
                        </span>
                      </div>

                      {/* TITLE */}
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition">
                        {event.name}
                      </h3>

                      {/* DESCRIPTION */}
                      <p className="text-sm md:text-base text-gray-400 group-hover:text-gray-300 line-clamp-2 md:line-clamp-3 transition">
                        {event.description}
                      </p>
                    </div>

                    {/* CTA BUTTON */}
                    <motion.button
                      whileHover={{ x: 4 }}
                      className="mt-6 inline-flex items-center gap-2 text-cyan-300 font-semibold text-sm hover:text-cyan-200 transition"
                    >
                      Learn More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* VIEW ALL BUTTON */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12 md:mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition duration-300 text-sm md:text-base"
            >
              Explore All Events
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ==================== TIMELINE SECTION ==================== */}
      <section id="timeline" className="relative py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-black via-slate-950/20 to-black">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-display text-center mb-12 md:mb-16 neon-title"
          >
            Event Timeline
          </motion.h2>

          <div className="space-y-6 md:space-y-8">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6"
              >
                {/* TIMELINE DOT */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center border-4 border-black hover:scale-110 transition duration-300">
                    <span className="text-lg md:text-2xl">{item.icon}</span>
                  </div>
                </div>

                {/* TIMELINE CONTENT */}
                <div className="cyber-card flex-grow p-4 md:p-6 rounded-2xl border border-cyan-500/30 hover:border-cyan-300/70 transition duration-300 backdrop-blur-sm">
                  <h3 className="text-lg md:text-2xl font-bold text-cyan-300 mb-1">{item.phase}</h3>
                  <p className="text-sm md:text-base text-gray-400">{item.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PRIZES SECTION ==================== */}
      <section id="prizes" className="relative py-16 md:py-24 px-4 md:px-8 bg-[#02060f]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,235,0.1),rgba(1,6,18,0.92)_50%)]" />
          <div className="absolute inset-y-0 left-1/2 w-[70%] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(16,185,210,0.08),transparent)] blur-2xl" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-cyan-300 drop-shadow-[0_0_16px_rgba(34,211,238,0.35)]">
              Total Prize Pool
            </h2>
            <p className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tight">
              ₹1,75,000+
            </p>
            <p className="mt-4 text-base md:text-xl text-slate-400">
              Real rewards for real ideas. Industry recognition awaits the champions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
            {[
              {
                icon: "🏆",
                label: "Grand Prize",
                title: "1st Prize",
                amount: "₹1,00,000",
                iconBg: "bg-amber-400",
                iconShadow: "shadow-[0_0_30px_rgba(251,191,36,0.4)]",
                border: "border-cyan-500/60",
              },
              {
                icon: "🥈",
                label: "Runner Up",
                title: "2nd Prize",
                amount: "₹50,000",
                iconBg: "bg-slate-300",
                iconShadow: "shadow-[0_0_28px_rgba(226,232,240,0.35)]",
                border: "border-cyan-700/40",
              },
              {
                icon: "🥉",
                label: "Second Runner Up",
                title: "3rd Prize",
                amount: "₹25,000",
                iconBg: "bg-amber-700",
                iconShadow: "shadow-[0_0_28px_rgba(217,119,6,0.35)]",
                border: "border-cyan-700/40",
              },
            ].map((prize, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className={`rounded-2xl border ${prize.border} bg-[linear-gradient(180deg,rgba(10,16,30,0.88),rgba(6,10,20,0.96))] p-8 text-center backdrop-blur-md transition duration-300 hover:shadow-[0_0_42px_rgba(6,182,212,0.2)]`}
              >
                <div
                  className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full text-4xl ${prize.iconBg} ${prize.iconShadow}`}
                >
                  {prize.icon}
                </div>
                <p className="text-lg text-slate-400">{prize.label}</p>
                <h3 className="text-4xl font-extrabold text-slate-100 mt-1">{prize.title}</h3>
                <p className="mt-4 text-5xl font-black text-cyan-300 drop-shadow-[0_0_18px_rgba(45,212,191,0.35)]">
                  {prize.amount}
                </p>
                <div className="mx-auto mt-5 h-1.5 w-20 rounded-full bg-cyan-300/90" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section id="faq" className="relative py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-black via-slate-950/20 to-black">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-display text-center mb-12 md:mb-16 neon-title"
          >
            FAQ
          </motion.h2>

          <div className="space-y-3 md:space-y-4">
            {faqData.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="cyber-card rounded-2xl border border-cyan-500/30 overflow-hidden hover:border-cyan-300/70 backdrop-blur-sm transition"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-4 md:p-6 text-left flex justify-between items-center hover:from-cyan-500/10 hover:to-blue-600/10 transition"
                >
                  <span className="text-base md:text-lg font-bold text-white pr-4">{item.question}</span>
                  <span
                    className={`text-cyan-400 flex-shrink-0 text-2xl transition transform duration-300 ${
                      expandedFaq === idx ? "rotate-180" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {expandedFaq === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 md:px-6 pb-4 md:pb-6 border-t border-cyan-500/30 text-sm md:text-base text-gray-400"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== REGISTRATION CTA ==================== */}
      <section className="relative py-16 md:py-24 px-4 md:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 font-display">
              <span className="neon-title">
                Ready to Innovate?
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto">
              Join 6000+ innovators. Secure your spot now and be part of India's premier tech fest.
            </p>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-10 md:px-16 py-4 md:py-6 text-lg md:text-xl"
            >
              Register Now
            </motion.button>

            <p className="text-xs md:text-sm text-gray-500 mt-6 md:mt-8">
              Questions? Contact us at <span className="text-cyan-400">navonmesh@university.edu</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== SPONSORS SECTION ==================== */}
      <section className="relative py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-black via-slate-950/20 to-black">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-display text-center mb-12 md:mb-16 neon-title"
          >
            Our Partners
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="cyber-card h-24 md:h-32 rounded-xl border border-cyan-500/30 flex items-center justify-center hover:border-cyan-300/70 hover:shadow-lg hover:shadow-cyan-500/20 transition duration-300 cursor-pointer backdrop-blur-sm"
              >
                <span className="text-gray-500 font-bold text-center px-2 text-sm md:text-base">Sponsor {item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer id="footer" className="relative border-t border-cyan-500/30 bg-black px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
            {/* ABOUT */}
            <div>
              <h3 className="text-base md:text-lg font-bold text-cyan-300 mb-3 md:mb-4">NAVONMESH</h3>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                India's premier university technology festival celebrating innovation and excellence.
              </p>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h4 className="text-sm md:text-base font-bold text-white mb-3 md:mb-4">Quick Links</h4>
              <ul className="space-y-2 text-xs md:text-sm text-gray-400">
                <li className="hover:text-cyan-400 cursor-pointer transition">Events</li>
                <li className="hover:text-cyan-400 cursor-pointer transition">Register</li>
                <li className="hover:text-cyan-400 cursor-pointer transition">Timeline</li>
                <li className="hover:text-cyan-400 cursor-pointer transition">Rules</li>
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h4 className="text-sm md:text-base font-bold text-white mb-3 md:mb-4">Contact</h4>
              <p className="text-xs md:text-sm text-gray-400 mb-2">
                Email: <span className="text-cyan-400">navonmesh@university.edu</span>
              </p>
              <p className="text-xs md:text-sm text-gray-400">Phone: +91 XXXX XXXX XX</p>
            </div>

            {/* SOCIAL */}
            <div>
              <h4 className="text-sm md:text-base font-bold text-white mb-3 md:mb-4">Follow</h4>
              <div className="flex gap-3">
                {["f", "𝕏", "📷", "in"].map((social, idx) => (
                  <div
                    key={idx}
                    className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center hover:bg-cyan-500/40 hover:border-cyan-400 transition cursor-pointer text-cyan-300 text-sm font-bold"
                  >
                    {social}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-cyan-500/20 pt-8 md:pt-8 text-center text-xs md:text-sm text-gray-500">
            <p>&copy; 2026 NAVONMESH. All rights reserved. Made with ❤️ by the organizing committee.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
