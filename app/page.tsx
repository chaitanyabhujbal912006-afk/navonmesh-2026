"use client";

import Image from "next/image";
import { AnimatePresence, motion, useViewportScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ParticlesBackground from "./ParticlesBackground";

type UiIcon =
  | "ai"
  | "poster"
  | "warbot"
  | "circuit"
  | "startup"
  | "gaming"
  | "calendar"
  | "flag"
  | "award"
  | "target"
  | "users"
  | "gold"
  | "silver"
  | "bronze"
  | "facebook"
  | "x"
  | "instagram"
  | "linkedin"
  | "close";

function renderIcon(icon: UiIcon, className: string) {
  switch (icon) {
    case "ai":
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6m-3 0v4m-7 5h14M7 12v5a3 3 0 003 3h4a3 3 0 003-3v-5M5 10a2 2 0 100-4 2 2 0 000 4zm14 0a2 2 0 100-4 2 2 0 000 4z" /></svg>;
    case "poster":
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M6 4h12a2 2 0 012 2v10a2 2 0 01-2 2H8l-4 2V6a2 2 0 012-2z" /><path strokeLinecap="round" d="M8 9h8M8 13h6" /></svg>;
    case "warbot":
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10l2 4-2 7H7l-2-7 2-4zM9 8l1-3h4l1 3M9.5 13h.01M14.5 13h.01" /></svg>;
    case "circuit":
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h4v4H6zM14 14h4v4h-4zM8 10v4h6M12 8h6M6 18h6" /></svg>;
    case "startup":
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2.8 5.7L21 11l-4.5 4.4L17.6 21 12 18l-5.6 3 1.1-5.6L3 11l6.2-2.3L12 3z" /></svg>;
    case "gaming":
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M6 8h12a4 4 0 014 4v3a3 3 0 01-3 3h-2l-2-3H9l-2 3H5a3 3 0 01-3-3v-3a4 4 0 014-4z" /><path strokeLinecap="round" d="M8 12h4M10 10v4m6-1h2" /></svg>;
    case "calendar":
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M7 3v3m10-3v3M4 9h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" /></svg>;
    case "flag":
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v18M5 5h11l-2 4 2 4H5" /></svg>;
    case "award":
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path strokeLinecap="round" strokeLinejoin="round" d="M10 12l-2 9 4-2 4 2-2-9" /></svg>;
    case "target":
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /></svg>;
    case "users":
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11a3 3 0 100-6 3 3 0 000 6zM8 12a3 3 0 100-6 3 3 0 000 6zm8 2c2.8 0 5 1.3 5 3v1h-8m-5 0H3v-1c0-1.7 2.2-3 5-3s5 1.3 5 3v1z" /></svg>;
    case "gold":
    case "silver":
    case "bronze":
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.5L7 21l5-2 5 2-1.5-8.5" /></svg>;
    case "facebook":
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 8.5V6.8c0-.7.5-1.3 1.3-1.3h1.7V3h-2.5A3.5 3.5 0 0010.5 6.5v2H8v2.8h2.5V21h3V11.3h2.7L16.6 8.5h-3.1z"/></svg>;
    case "x":
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 3h2.8l-6.1 7 7.2 11h-5.7l-4.5-6.9L6.5 21H3.7l6.5-7.4L3.3 3H9l4 6.2L18.9 3z"/></svg>;
    case "instagram":
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
    case "linkedin":
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 8.5H3.8V20h2.7V8.5zM5.1 7.3a1.6 1.6 0 100-3.2 1.6 1.6 0 000 3.2zM20.2 13.2c0-3-1.6-4.8-4.3-4.8-1.9 0-2.8 1-3.2 1.8V8.5H10V20h2.7v-6.2c0-1.6.3-3.1 2.3-3.1s2 1.8 2 3.2V20h2.7v-6.8z"/></svg>;
    case "close":
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /></svg>;
    default:
      return null;
  }
}


// parallax background used in hero
function ParallaxBackground() {
  const { scrollY } = useViewportScroll();
  // adjust movement range as needed
  const y = useTransform(scrollY, [0, 800], [0, -200]);

  return (
    <motion.div
      style={{ y }}
      className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center bg-fixed"
    />
  );
}

// EVENTS DATA
const events = [
  {
    id: 1,
    name: "Prompt Engineering  ",
    category: "Artificial Intelligence",
    description: "Build intelligent solutions using cutting-edge AI algorithms. Compete for ₹50,000 prize pool.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
    prize: "₹50,000",
    fee: "₹200 per team",
    teamSize: "1-3 members",
    mode: "Offline",
    schedule: "March 24, 2026 · 10:00 AM - 1:00 PM",
    venue: "AI Lab, SET Campus",
    eligibility: "UG/PG students from any branch",
    deadline: "March 20, 2026",
    requirements: "Laptop, student ID, and internet access",
    details:
      "Design high-impact prompts, evaluate outputs, and build a working AI workflow. Judging focuses on creativity, reliability, and practical implementation.",
    highlights: ["Live challenge rounds", "Real-world problem statements", "Expert jury feedback"],
    icon: "ai" as UiIcon,
    color: "from-cyan-500/20 to-blue-600/20",
    borderColor: "border-cyan-400/50",
  },
  {
    id: 2,
    name: "Poster Competition",
    category: "Robotics",
    description: "Design autonomous robots and compete in real-world challenges. Show your engineering prowess.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1400&q=80",
    prize: "₹30,000",
    fee: "₹100 per participant",
    teamSize: "1-2 members",
    mode: "Offline",
    schedule: "March 24, 2026 · 2:00 PM - 5:00 PM",
    venue: "Main Exhibition Hall",
    eligibility: "Open to all registered participants",
    deadline: "March 21, 2026",
    requirements: "Printed poster, abstract sheet, and college ID",
    details:
      "Showcase technical concepts through impactful visual storytelling. Posters are evaluated on clarity, innovation, research depth, and presentation quality.",
    highlights: ["Print + presentation round", "Design and technical scoring", "Rapid Q&A with judges"],
    icon: "poster" as UiIcon,
    color: "from-purple-500/20 to-pink-600/20",
    borderColor: "border-purple-400/50",
  },
  { 
    id: 3,
    name: " WAR-BOTS (Robo Race)",
    category: "Competitive Programming",
    description: "Solve algorithmic challenges under time pressure. Compete against the best minds.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80",
    prize: "₹60,000",
    fee: "₹500 per team",
    teamSize: "1-2 members",
    mode: "Offline",
    schedule: "March 25, 2026 · 9:00 AM - 4:00 PM",
    venue: "Robotics Arena, Ground Floor",
    eligibility: "UG/PG students with hardware build",
    deadline: "March 18, 2026",
    requirements: "Custom bot, safety checklist, and ID cards",
    details:
      "Bring your custom robot and dominate intense head-to-head race tracks. Performance, build quality, and control precision define rankings.",
    highlights: ["Knockout format", "Live arena battles", "Engineering + speed scoring"],
    icon: "warbot" as UiIcon,
    color: "from-green-500/20 to-emerald-600/20",
    borderColor: "border-green-400/50",
  },
  {
    id: 4,
    name: "Circuit Design",
    category: "Game Development",
    description: "Create innovative games in 48 hours. Showcase your creativity and technical skills.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    prize: "₹40,000",
    fee: "₹150 per participant",
    teamSize: "1-3 members",
    mode: "Offline",
    schedule: "March 24, 2026 · 11:00 AM - 2:00 PM",
    venue: "Electronics Lab Complex",
    eligibility: "Open to E&TC/EE/EX and allied branches",
    deadline: "March 20, 2026",
    requirements: "Basic components kit and calculator",
    details:
      "Build and optimize analog/digital circuits under real constraints. Entries are judged for efficiency, reliability, and implementation quality.",
    highlights: ["Hardware testing round", "Debug sprint", "Design documentation scoring"],
    icon: "circuit" as UiIcon,
    color: "from-orange-500/20 to-red-600/20",
    borderColor: "border-orange-400/50",
  },
  {
    id: 5,
    name: "Startup:PoC and Idea Competition",
    category: "Entrepreneurship",
    description: "Build stunning web experiences. Full-stack development challenge with real-world scenarios.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
    prize: "₹75,000",
    fee: "₹300 per team",
    teamSize: "2-4 members",
    mode: "Hybrid",
    schedule: "March 25, 2026 · 10:30 AM - 3:30 PM",
    venue: "Innovation Center + Online Pitch",
    eligibility: "Student founders and startup teams",
    deadline: "March 19, 2026",
    requirements: "Pitch deck, PoC demo, and market plan",
    details:
      "Pitch your startup concept with business model, prototype, and market strategy. Judges evaluate feasibility, innovation, and execution roadmap.",
    highlights: ["Investor-style pitch", "Prototype demo", "Mentor feedback loop"],
    icon: "startup" as UiIcon,
    color: "from-indigo-500/20 to-purple-600/20",
    borderColor: "border-indigo-400/50",
  },
  {
    id: 6,
    name: "Valorant Tournament",
    category:   "Gaming",
    description: "Present your innovative ideas to industry leaders. Win funding and mentorship opportunities.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=80",
    prize: "₹45,000",
    fee: "₹750 per team",
    teamSize: "5 players + 1 substitute",
    mode: "LAN",
    schedule: "March 24-25, 2026 · 12:00 PM onwards",
    venue: "Gaming Zone, Main Auditorium",
    eligibility: "College teams only",
    deadline: "March 17, 2026",
    requirements: "Team roster, IDs, and game account details",
    details:
      "Compete in intense team-based tactical matches with seeded brackets. Performance is ranked by match wins, round difference, and finals result.",
    highlights: ["Seeded elimination bracket", "Live shoutcasting", "MVP recognition"],
    icon: "gaming" as UiIcon,
    color: "from-yellow-500/20 to-orange-600/20",
    borderColor: "border-yellow-400/50",
  },
];

// TIMELINE DATA
const timeline = [
  { phase: "Registration Opens", date: "March 1, 2026", icon: "calendar" as UiIcon },
  { phase: "Events Dates", date: "March 24-25, 2026", icon: "flag" as UiIcon },
  { phase: "Finals & Awards", date: "March 25, 2026", icon: "award" as UiIcon },
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
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[number] | null>(null);
  const [showMoreEventDetails, setShowMoreEventDetails] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [introPhase, setIntroPhase] = useState<"boot" | "sync" | "flash">("boot");
  const registrationFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScl1YbcLNNJl_we0kAl8u0wXcx-mH3imTXoq9SlcJBlq74a7Q/viewform";

  const openEventDetails = (event: (typeof events)[number]) => {
    setSelectedEvent(event);
    setShowMoreEventDetails(true);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setShowIntro(false);
      return;
    }

    const syncTimer = window.setTimeout(() => setIntroPhase("sync"), 520);
    const flashTimer = window.setTimeout(() => setIntroPhase("flash"), 1850);
    const finishTimer = window.setTimeout(() => setShowIntro(false), 2480);

    return () => {
      window.clearTimeout(syncTimer);
      window.clearTimeout(flashTimer);
      window.clearTimeout(finishTimer);
    };
  }, []);

  useEffect(() => {
    if (!showIntro) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [showIntro]);

  useEffect(() => {
    if (!selectedEvent) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedEvent]);

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
    <main className="relative isolate min-h-screen bg-[#020914] text-white overflow-hidden">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(2px)" }}
            transition={{ duration: 0.42, ease: "easeOut" }}
            className="fixed inset-0 z-[3000] flex items-center justify-center overflow-hidden bg-black"
          >
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(56,189,248,0.2),transparent_46%),linear-gradient(180deg,#00050f_0%,#000208_100%)]"
            />
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.16 }}
              transition={{ duration: 0.5 }}
              className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(148,220,252,0.08)_0px,rgba(148,220,252,0.08)_1px,transparent_1px,transparent_5px)]"
            />
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0.18, rotate: 0 }}
              animate={{ opacity: [0.16, 0.28, 0.16], rotate: 360 }}
              transition={{ duration: 8, ease: "linear", repeat: Infinity }}
              className="pointer-events-none absolute h-[56vmin] w-[56vmin] rounded-full border border-cyan-300/30"
            />
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0.12, rotate: 0 }}
              animate={{ opacity: [0.1, 0.22, 0.1], rotate: -360 }}
              transition={{ duration: 6, ease: "linear", repeat: Infinity }}
              className="pointer-events-none absolute h-[40vmin] w-[40vmin] rounded-full border border-cyan-200/25"
            />
            <motion.div
              aria-hidden="true"
              initial={{ x: "-35%", opacity: 0 }}
              animate={{ x: introPhase === "sync" ? ["-35%", "120%"] : "-35%", opacity: introPhase === "sync" ? [0, 0.22, 0] : 0 }}
              transition={{ duration: 0.95, ease: "easeInOut" }}
              className="pointer-events-none absolute top-0 bottom-0 w-28 -skew-x-12 bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent blur-md"
            />
            <motion.div
              aria-hidden="true"
              animate={{ opacity: introPhase === "flash" ? [0, 0.42, 0] : 0 }}
              transition={{ duration: 0.34 }}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(103,232,249,0.55),rgba(34,211,238,0.15)_40%,transparent_72%)] mix-blend-screen"
            />

            <div className="relative z-10 px-6 text-center">
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: introPhase === "boot" ? 0.85 : 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="mb-4 text-[10px] md:text-xs font-semibold uppercase tracking-[0.38em] text-cyan-200/80"
              >
                Initializing Experience
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, scale: 0.9, letterSpacing: "0.14em" }}
                animate={{
                  opacity: introPhase === "boot" ? 0 : 1,
                  scale: introPhase === "sync" ? [0.9, 1.05, 1] : 1,
                  letterSpacing: introPhase === "sync" ? ["0.14em", "0.08em"] : "0.08em",
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase text-cyan-100 drop-shadow-[0_0_24px_rgba(34,211,238,0.55)]"
              >
                NAVONMESH
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: introPhase === "sync" ? 0.9 : 0 }}
                transition={{ duration: 0.25 }}
                className="mt-4 text-[10px] md:text-xs uppercase tracking-[0.32em] text-cyan-200/75"
              >
                Loading Interface
              </motion.p>
              <div className="mx-auto mt-6 flex items-center justify-center gap-2">
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    animate={{ opacity: introPhase === "sync" ? [0.25, 1, 0.25] : 0.25, scale: introPhase === "sync" ? [0.9, 1.2, 0.9] : 1 }}
                    transition={{ duration: 0.7, repeat: Infinity, delay: dot * 0.12 }}
                    className="h-1.5 w-1.5 rounded-full bg-cyan-300/80"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_82%_22%,rgba(96,165,250,0.15),transparent_36%),linear-gradient(180deg,#02060f_0%,#030b16_45%,#020711_100%)]" />
        <div className="absolute inset-0 opacity-[0.14] bg-[linear-gradient(rgba(125,211,252,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.2)_1px,transparent_1px)] bg-[size:88px_88px] [mask-image:radial-gradient(circle_at_center,black_42%,transparent_100%)]" />
        <div className="absolute -inset-12 animate-bgDrift bg-[radial-gradient(circle_at_28%_38%,rgba(45,212,191,0.18),transparent_30%),radial-gradient(circle_at_72%_64%,rgba(56,189,248,0.14),transparent_28%)]" />
      </div>
      <ParticlesBackground />
      <Navbar />

      {/* ==================== HERO SECTION ==================== */}
      <section
        id="home"
        className="relative min-h-[100svh] w-full overflow-hidden pt-16 md:pt-0 flex items-center justify-center"
      >
        {/* moving background layer (parallax) */}
        <ParallaxBackground />

        {/* decorative noise/texture layer */}
        <div className="pointer-events-none absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
        {/* GRADIENT OVERLAY (tweak colors if needed) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#01040c]/35 via-[#020a16]/50 to-[#020a14]/45" />
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.25 }}
          className="pointer-events-none absolute -left-20 top-20 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl"
        />
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.35 }}
          className="pointer-events-none absolute -right-14 bottom-16 h-56 w-56 rounded-full bg-blue-400/20 blur-3xl"
        />

        {/* CONTENT */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20 text-center flex flex-col items-center justify-center min-h-[calc(100svh-4rem)] md:min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-4 md:mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/70 bg-cyan-400/10 px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.18em] text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            National Level Tech Fest 2026
          </motion.div>

          {/* UNIVERSITY BADGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 md:mb-8"
          >
            <Image
              src="/logo.png"
              alt="University Logo"
              width={360}
              height={148}
              className="opacity-95 w-[195px] md:w-[380px] h-auto"
            />
          </motion.div>

          {/* TAGLINE */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-base md:text-lg text-cyan-100 tracking-[2px] md:tracking-[3px] uppercase mb-4 md:mb-6 font-semibold drop-shadow-[0_0_10px_rgba(103,232,249,0.45)] px-2"
          >
            School of Engineering & Technology 
           
          </motion.p>

          {/* MAIN TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-4xl md:text-6xl lg:text-8xl font-black leading-tight mb-2 md:mb-4 bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]"
          >
            {"NAVONMESH".split("").map((letter, idx) => (
              <motion.span
                key={`${letter}-${idx}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.24 + idx * 0.04 }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
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

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mb-7 md:mb-10 grid grid-cols-3 gap-2 md:gap-3 w-full max-w-sm md:max-w-xl"
          >
            {[
              { label: "Prize Pool", value: "₹1.75L+" },
              { label: "Events", value: "6+" },
              { label: "Participants", value: "6000+" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg md:rounded-xl border border-cyan-500/35 bg-cyan-500/[0.08] px-2 py-2 md:px-3 md:py-2.5 backdrop-blur-sm"
              >
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.16em] text-cyan-200/85">{stat.label}</p>
                <p className="mt-0.5 text-sm md:text-base font-black text-white">{stat.value}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mx-auto flex w-full max-w-md sm:max-w-none flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-8 md:mb-12"
          >
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="#events"
              className="group relative overflow-hidden glass-sm w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 rounded-xl border border-cyan-300/70 text-cyan-100 text-sm md:text-base font-bold tracking-[0.08em] uppercase hover:bg-cyan-500/15 hover:shadow-[0_0_24px_rgba(34,211,238,0.28)] transition duration-300 text-center"
            >
              <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-cyan-200/35 to-transparent transition-transform duration-700 group-hover:translate-x-[320%]" />
              <span className="relative z-10">Explore Events</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.96 }}
              href="#timeline"
              className="group relative overflow-hidden w-full sm:w-auto px-7 md:px-9 py-3 md:py-4 rounded-xl border border-cyan-500/45 bg-[#041223]/75 text-cyan-200 text-sm md:text-base font-bold tracking-[0.08em] uppercase hover:border-cyan-300/75 hover:bg-cyan-500/10 transition duration-300 text-center"
            >
              <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent transition-transform duration-700 group-hover:translate-x-[320%]" />
              <span className="relative z-10">View Timeline</span>
            </motion.a>
          </motion.div>

          {/* EVENT DATES */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xs md:text-sm text-gray-300 font-medium"
          >
            March 24-25, 2026
          </motion.div>
        </div>

        {/* SCROLL INDICATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-cyan-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section id="about" className="relative py-14 md:py-20 px-4 md:px-8 bg-gradient-to-b from-[#020a14]/45 via-cyan-950/12 to-transparent">
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
              { icon: "target" as UiIcon, title: "Innovation Hub", desc: "Showcase groundbreaking ideas" },
              { icon: "users" as UiIcon, title: "Global Community", desc: "Network with 6000+ innovators" },
              { icon: "award" as UiIcon, title: "Premium Prizes", desc: "Win ₹3+ lakhs total prize pool" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group cyber-card p-6 md:p-8 rounded-2xl backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-300/70 transition duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div className="mb-4 text-cyan-300 group-hover:scale-110 transition duration-300">
                  {renderIcon(item.icon, "h-10 w-10 md:h-12 md:w-12")}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-cyan-300 mb-2">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== EVENTS SECTION (PRIMARY FOCUS) ==================== */}
      <section id="events" className="relative py-14 md:py-20 px-4 md:px-8 bg-gradient-to-b from-transparent via-slate-950/35 to-transparent">
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
                className="group cursor-pointer h-full"
                onClick={() => openEventDetails(event)}
              >
                <div
                  className={`cyber-card h-full rounded-2xl overflow-hidden border ${event.borderColor} backdrop-blur-lg transition duration-300 group-hover:border-opacity-100 group-hover:shadow-2xl group-hover:shadow-cyan-500/20 bg-gradient-to-br ${event.color} flex flex-col`}
                >
                  {/* IMAGE */}
                  <div className="relative h-28 sm:h-32 md:h-40 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/navon.png";
                      }}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <div className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-cyan-400/30 blur-2xl group-hover:bg-cyan-300/45 transition duration-500" />
                  </div>

                  {/* CARD CONTENT */}
                  <div className="p-4 md:p-6 flex flex-1 flex-col">
                    <div>
                      {/* ICON & CATEGORY */}
                      <div className="flex items-start justify-between mb-3 md:mb-4">
                        <span className="text-cyan-300 group-hover:scale-110 transition duration-300">
                          {renderIcon(event.icon, "h-6 w-6 md:h-10 md:w-10")}
                        </span>
                        <span className="max-w-[66%] px-2.5 py-1 text-[9px] md:text-xs font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 group-hover:bg-cyan-500/40 transition leading-tight text-right">
                          {event.category}
                        </span>
                      </div>

                      {/* TITLE */}
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-cyan-300 transition">
                        {event.name}
                      </h3>

                      {/* DESCRIPTION */}
                      <p className="text-xs md:text-sm text-gray-400 group-hover:text-gray-300 line-clamp-2 transition">
                        {event.description}
                      </p>
                    </div>

                    {/* CTA BUTTON */}
                    <motion.button
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => openEventDetails(event)}
                      className="mt-3 md:mt-4 inline-flex items-center gap-1.5 md:gap-2 rounded-lg border border-cyan-400/60 bg-cyan-500/10 px-3 py-1.5 md:py-2 text-cyan-200 font-semibold text-[11px] md:text-xs hover:bg-cyan-500/20 transition"
                    >
                      <span>View Details</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>

        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-x-0 top-16 bottom-0 z-[999] bg-black/75 backdrop-blur-sm p-3 md:p-6 lg:p-8 flex items-start justify-center overflow-y-auto"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="relative z-[1000] my-0 w-full max-w-3xl max-h-[calc(100svh-6rem)] rounded-2xl border border-cyan-400/40 bg-[#020812] shadow-[0_0_50px_rgba(34,211,238,0.2)] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-28 sm:h-32 md:h-40 flex-shrink-0">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/navon.png";
                  }}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020812] via-[#020812]/40 to-transparent" />
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 h-9 w-9 rounded-full border border-cyan-200/80 bg-[#020812]/90 text-cyan-100 shadow-[0_0_16px_rgba(34,211,238,0.35)] hover:bg-cyan-500/25 transition"
                  aria-label="Close event details"
                >
                  {renderIcon("close", "h-4 w-4 mx-auto")}
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs md:text-sm text-cyan-300/90 uppercase tracking-[0.2em]">{selectedEvent.category}</p>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-white">{selectedEvent.name}</h3>
                </div>
              </div>

              <div className="overflow-y-auto p-3.5 md:p-4 space-y-3">
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">{selectedEvent.details}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                  <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-300/80">Prize Pool</p>
                    <p className="text-base font-semibold text-white">{selectedEvent.prize}</p>
                  </div>
                  <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-300/80">Fees</p>
                    <p className="text-base font-semibold text-white">{selectedEvent.fee}</p>
                  </div>
                  <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-300/80">Team Size</p>
                    <p className="text-base font-semibold text-white">{selectedEvent.teamSize}</p>
                  </div>
                  <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-300/80">Mode</p>
                    <p className="text-base font-semibold text-white">{selectedEvent.mode}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs md:text-sm text-cyan-200"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setShowMoreEventDetails((prev) => !prev)}
                  className="inline-flex items-center rounded-lg border border-cyan-400/50 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-500/20 transition"
                >
                  {showMoreEventDetails ? "Hide Full Details" : "More Details"}
                </button>

                {showMoreEventDetails && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="rounded-xl border border-cyan-500/30 bg-[#041121]/70 p-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-300/80">Schedule</p>
                      <p className="text-sm md:text-base text-slate-200 mt-1">{selectedEvent.schedule}</p>
                    </div>
                    <div className="rounded-xl border border-cyan-500/30 bg-[#041121]/70 p-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-300/80">Venue</p>
                      <p className="text-sm md:text-base text-slate-200 mt-1">{selectedEvent.venue}</p>
                    </div>
                    <div className="rounded-xl border border-cyan-500/30 bg-[#041121]/70 p-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-300/80">Eligibility</p>
                      <p className="text-sm md:text-base text-slate-200 mt-1">{selectedEvent.eligibility}</p>
                    </div>
                    <div className="rounded-xl border border-cyan-500/30 bg-[#041121]/70 p-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-300/80">Registration Deadline</p>
                      <p className="text-sm md:text-base text-slate-200 mt-1">{selectedEvent.deadline}</p>
                    </div>
                    <div className="rounded-xl border border-cyan-500/30 bg-[#041121]/70 p-3 md:col-span-2">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-300/80">Requirements</p>
                      <p className="text-sm md:text-base text-slate-200 mt-1">{selectedEvent.requirements}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* ==================== TIMELINE SECTION ==================== */}
      <section id="timeline" className="relative py-14 md:py-20 px-4 md:px-8 bg-gradient-to-b from-transparent via-slate-950/25 to-transparent">
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
                className="flex flex-col items-center md:flex-row md:items-center gap-4 md:gap-6"
              >
                {/* TIMELINE DOT */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center border-4 border-black hover:scale-110 transition duration-300">
                    <span className="text-[#041018]">
                      {renderIcon(item.icon, "h-6 w-6 md:h-8 md:w-8")}
                    </span>
                  </div>
                </div>

                {/* TIMELINE CONTENT */}
                <div className="cyber-card w-full max-w-sm md:max-w-none md:flex-grow p-4 md:p-6 rounded-2xl border border-cyan-500/30 hover:border-cyan-300/70 transition duration-300 backdrop-blur-sm text-center md:text-left">
                  <h3 className="text-lg md:text-2xl font-bold text-cyan-300 mb-1">{item.phase}</h3>
                  <p className="text-sm md:text-base text-gray-400">{item.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PRIZES SECTION ==================== */}
      <section id="prizes" className="relative py-14 md:py-20 px-4 md:px-8 bg-transparent">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[92%] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,235,0.14),rgba(0,255,235,0.03)_45%,transparent_72%)] blur-2xl" />
        <div className="pointer-events-none absolute top-1/3 left-1/2 h-72 w-[74%] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.12),rgba(56,189,248,0.03)_52%,transparent_75%)] blur-3xl" />

        <div className="relative max-w-[1180px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-cyan-300 drop-shadow-[0_0_16px_rgba(34,211,238,0.35)]">
              Total Prize Pool
            </h2>
            <p className="mt-3 text-5xl md:text-6xl font-black text-white tracking-tight">
              ₹1,75,000+
            </p>
            <p className="mt-3 text-base md:text-lg text-slate-400">
              Real rewards for real ideas. Industry recognition awaits the champions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {[
              {
                icon: "gold" as UiIcon,
                label: "Grand Prize",
                title: "1st Prize",
                amount: "₹1,00,000",
                iconBg: "bg-amber-400",
                iconShadow: "shadow-[0_0_30px_rgba(251,191,36,0.4)]",
                border: "border-cyan-500/60",
              },
              {
                icon: "silver" as UiIcon,
                label: "Runner Up",
                title: "2nd Prize",
                amount: "₹50,000",
                iconBg: "bg-slate-300",
                iconShadow: "shadow-[0_0_28px_rgba(226,232,240,0.35)]",
                border: "border-cyan-700/40",
              },
              {
                icon: "bronze" as UiIcon,
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
                className={`rounded-2xl border ${prize.border} bg-[linear-gradient(180deg,rgba(10,16,30,0.88),rgba(6,10,20,0.96))] p-6 md:p-7 md:min-h-[350px] text-center backdrop-blur-md transition duration-300 hover:shadow-[0_0_42px_rgba(6,182,212,0.2)]`}
              >
                <div
                  className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full text-3xl ${prize.iconBg} ${prize.iconShadow}`}
                >
                  <span className="text-[#07101f]">
                    {renderIcon(prize.icon, "h-9 w-9")}
                  </span>
                </div>
                <p className="text-base text-slate-400">{prize.label}</p>
                <h3 className="text-3xl font-extrabold text-slate-100 mt-1">{prize.title}</h3>
                <p className="mt-3 text-5xl md:text-[3.35rem] font-black text-cyan-300 drop-shadow-[0_0_18px_rgba(45,212,191,0.35)]">
                  {prize.amount}
                </p>
                <div className="mx-auto mt-4 h-1.5 w-16 rounded-full bg-cyan-300/90" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section id="faq" className="relative py-14 md:py-20 px-4 md:px-8 bg-gradient-to-b from-transparent via-slate-950/30 to-transparent">
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
      <section className="relative py-14 md:py-20 px-4 md:px-8 bg-gradient-to-b from-transparent via-[#04101b]/35 to-transparent">
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

            <motion.a
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              href={registrationFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-10 md:px-16 py-4 md:py-6 text-lg md:text-xl"
            >
              Register Now
            </motion.a>

            <p className="text-xs md:text-sm text-gray-500 mt-6 md:mt-8">
              Questions? Contact us at <span className="text-cyan-400">navonmesh@university.edu</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== SPONSORS SECTION ==================== */}
      <section className="relative py-14 md:py-20 px-4 md:px-8 bg-gradient-to-b from-transparent via-slate-950/30 to-transparent">
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
      <footer id="footer" className="relative border-t border-cyan-500/30 bg-[#020a14]/80 px-4 md:px-8 py-12 md:py-16 backdrop-blur-[2px]">
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
                {(["facebook", "x", "instagram", "linkedin"] as UiIcon[]).map((social, idx) => (
                  <div
                    key={idx}
                    className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center hover:bg-cyan-500/40 hover:border-cyan-400 transition cursor-pointer text-cyan-300 text-sm font-bold"
                  >
                    {renderIcon(social, "h-4 w-4")}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-cyan-500/20 pt-8 md:pt-8 text-center text-xs md:text-sm text-gray-500">
            <p>&copy; 2026 NAVONMESH. All rights reserved. Built by the organizing committee.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
