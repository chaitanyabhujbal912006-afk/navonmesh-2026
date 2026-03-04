"use client";

import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion, useMotionTemplate, useMotionValue, useSpring, useViewportScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ParticlesBackground from "./ParticlesBackground";
import AIBootSequence from "./components/AIBootSequence";

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
  | "youtube"
  | "phone"
  | "location"
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
    case "youtube":
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2a2.9 2.9 0 00-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.9 2.9 0 00-2 2A30 30 0 002 12a30 30 0 00.4 4.8 2.9 2.9 0 002 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 002-2A30 30 0 0022 12a30 30 0 00-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z"/></svg>;
    case "phone":
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path strokeLinecap="round" strokeLinejoin="round" d="M4.8 3.8a1.5 1.5 0 011.6-.4l3.2 1a1.5 1.5 0 011 .9l.7 2.4a1.5 1.5 0 01-.4 1.5l-1.4 1.4a13.8 13.8 0 005.6 5.6l1.4-1.4a1.5 1.5 0 011.5-.4l2.4.7a1.5 1.5 0 01.9 1l1 3.2a1.5 1.5 0 01-.4 1.6l-1.6 1.6a3 3 0 01-2.8.8A20 20 0 014.4 8.2a3 3 0 01.8-2.8l1.6-1.6z" /></svg>;
    case "location":
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21s6-5.6 6-11a6 6 0 10-12 0c0 5.4 6 11 6 11z" /><circle cx="12" cy="10" r="2.2" fill="currentColor" stroke="none" /></svg>;
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
  const y = useTransform(scrollY, [0, 1000], [0, -140]);

  return (
    <motion.div
      style={{ y }}
      className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center will-change-transform"
    />
  );
}

// EVENTS DATA
const events = [
  {
    id: 1,
    name: "Prompt Engineering",
    category: "Artificial Intelligence",
    description: "Master the art of AI communication. Craft precise prompts to solve complex challenges.",
    image: "/events/prompt.jpeg",
    prize: "1st: ₹10,000 · 2nd: ₹5,000 · 3rd: ₹3,000",
    fee: "₹100 per participant",
    teamSize: "Individual",
    mode: "Offline",
    schedule: "24 & 25 March, 2026 ",
    venue: "DESPU campus ",
    eligibility: "UG students from any branch",
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
    category: "Design & Research",
    description: "Visualize complex ideas and research. Compete in creative storytelling and technical presentation.",
    image: "/events/poster1.png",
    prize: "1st: ₹10,000 · 2nd: ₹5,000 · 3rd: ₹3,000",
    fee: "₹300 per team",
    teamSize: "4 members",
    mode: "Offline",
    schedule: "24 & 25 March, 2026 ",
    venue: "DESPU campus ",
    eligibility: "Open to All students",
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
    name: "WAR-BOTS (Robo Race)",
    category: "Robotics",
    description: "Race custom-built robots on intense tracks. Dominate the arena with speed and precision.",
    image: "/events/warbot.png",
    prize: "1st: ₹10,000 · 2nd: ₹5,000 · 3rd: ₹3,000",
    fee: "₹300 per team",
    teamSize: "3 members per team",
    mode: "Offline",
    schedule: "24 & 25 March, 2026 ",
    venue: "DESPU campus ",
    eligibility: "Undergraduate students  ",
    deadline: "March 18, 2026",
    requirements: "Robot must be self-built, within 30×30×30 cm size and 5 kg weight limits, powered onboard only, with wired or wireless control allowed.",
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
    category: "Electronics",
    description: "Build and optimize analog/digital circuits under real constraints. Showcase your hardware engineering skills.",
    image: "/events/circuit.jpeg",
    prize: "1st: ₹10,000 · 2nd: ₹5,000 · 3rd: ₹3,000",
    fee: "₹200 per team",
    teamSize: "3 members per team",
    mode: "Offline",
    schedule: "March 25, 2026 ",
    venue: "DESPU campus ",
    eligibility: "Undergraduate students  (Diploma / Engineering / Technology / Applied Sciences).",
    deadline: "March 20, 2026",
    requirements: "All necessary components and required equipment will be provided by the Organisers.",
    details:
      "Build and optimize analog/digital circuits under real constraints. Entries are judged for efficiency, reliability, and implementation quality.",
    highlights: ["Round 1 — Qualifying", "Round 2 — Final Decider"],
    icon: "circuit" as UiIcon,
    color: "from-orange-500/20 to-red-600/20",
    borderColor: "border-orange-400/50",
  },
  { 
    id: 5,
    name: "Valorant Tournament",
    category: "Gaming",
    description: "Compete in a high-stakes 5v5 tactical shooter tournament. Showcase your strategy and aim.",
    image: "/events/valorant1.jpeg",
    prize: "1st: ₹5,000 · 2nd: ₹3,000 · 3rd: ₹2,000",
    fee: "₹400 per team",
    teamSize: "5 players per team",
    mode: "Offline",
    schedule: "24 & 25 March, 2026",
    venue: "DESPU campus   ",
    eligibility: "UG students from any branch",
    deadline: "March 17, 2026",
    requirements: "Players must bring their own peripherals: Mouse, Mousepad, Keyboard, Headphones (PCs will be provided with the game pre-installed).",
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
    answer: "NAVONMESH is open to all undergraduate students from any college or university. Specific eligibility criteria are listed under each event details.",
  },
  {
    question: "Is there any registration fee?",
    answer: "Yes, there are nominal registration fees for events ranging from ₹100 to ₹400. You can pay via the registration link provided.",
  },
  {
    question: "Can I participate in multiple events?",
    answer: "Absolutely! You can register for multiple events as long as their schedules do not clash. Please check the timeline before registering.",
  },
  {
    question: "Are teams allowed?",
    answer: "Yes! Events like Valorant, Robo Race, and Poster Presentation are team-based (3-5 members), while Prompt Engineering is for individuals.",
  },
  {
    question: "When will results be announced?",
    answer: "Results are typically announced during the valedictory ceremony on March 25, 2026. Winners will also be notified via email/phone.",
  },
];

export default function Home() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[number] | null>(null);
  const [showMoreEventDetails, setShowMoreEventDetails] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [titleMorphReady, setTitleMorphReady] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [reduceHeavyEffects, setReduceHeavyEffects] = useState(true);
  const [particleQuality, setParticleQuality] = useState<"low" | "high">("high");
  const [showParticles, setShowParticles] = useState(true);
  const pointerX = useMotionValue(-320);
  const pointerY = useMotionValue(-320);
  const smoothPointerX = useSpring(pointerX, { stiffness: 120, damping: 24, mass: 0.35 });
  const smoothPointerY = useSpring(pointerY, { stiffness: 120, damping: 24, mass: 0.35 });
  const pointerGlow = useMotionTemplate`radial-gradient(440px circle at ${smoothPointerX}px ${smoothPointerY}px, rgba(56,189,248,0.17), transparent 62%)`;
  const pointerCore = useMotionTemplate`radial-gradient(190px circle at ${smoothPointerX}px ${smoothPointerY}px, rgba(45,212,191,0.18), transparent 68%)`;
  const registrationFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScl1YbcLNNJl_we0kAl8u0wXcx-mH3imTXoq9SlcJBlq74a7Q/viewform";

  const openEventDetails = (event: (typeof events)[number]) => {
    setSelectedEvent(event);
    setShowMoreEventDetails(true);
  };

  useEffect(() => {
    const evaluateDevice = () => {
      const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
      const saveData = Boolean(connection?.saveData);
      const slowNetwork = /(^|[^a-z])(2g|3g)([^a-z]|$)/i.test(connection?.effectiveType ?? "");
      const smallViewport = window.matchMedia("(max-width: 768px)").matches;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsMobileViewport(smallViewport);
      setReduceHeavyEffects(saveData || slowNetwork || smallViewport || prefersReducedMotion);
      setParticleQuality(saveData || slowNetwork || smallViewport ? "low" : "high");
      setShowParticles(!prefersReducedMotion);
    };

    evaluateDevice();
    window.addEventListener("resize", evaluateDevice);
    return () => window.removeEventListener("resize", evaluateDevice);
  }, []);

  useEffect(() => {
    if (!showIntro) {
      setTitleMorphReady(true);
    }
  }, [showIntro]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const saveData = Boolean(connection?.saveData);
    const slowNetwork = /(^|[^a-z])(2g|3g)([^a-z]|$)/i.test(connection?.effectiveType ?? "");
    const smallViewport = window.matchMedia("(max-width: 768px)").matches;
    const introSeen = window.sessionStorage.getItem("navonmesh_intro_seen") === "1";
    const shouldSkipIntro = prefersReducedMotion || saveData || slowNetwork || smallViewport || introSeen;

    if (shouldSkipIntro) {
      setShowIntro(false);
      return;
    }

    setShowIntro(true);
    const finishTimer = window.setTimeout(() => {
      window.sessionStorage.setItem("navonmesh_intro_seen", "1");
    }, 6000);

    return () => {
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

  useEffect(() => {
    if (reduceHeavyEffects) {
      pointerX.set(-320);
      pointerY.set(-320);
      return;
    }

    let frameId: number | null = null;
    let pendingX = -320;
    let pendingY = -320;
    const flushPointer = () => {
      pointerX.set(pendingX);
      pointerY.set(pendingY);
      frameId = null;
    };
    const queuePointerUpdate = (x: number, y: number) => {
      pendingX = x;
      pendingY = y;
      if (frameId === null) {
        frameId = window.requestAnimationFrame(flushPointer);
      }
    };

    const handleMove = (event: MouseEvent) => {
      queuePointerUpdate(event.clientX, event.clientY);
    };
    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      queuePointerUpdate(touch.clientX, touch.clientY);
    };
    const handleLeave = () => {
      queuePointerUpdate(-320, -320);
    };
    const handleTouchEnd = () => {
      queuePointerUpdate(window.innerWidth * 0.5, window.innerHeight * 0.78);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [pointerX, pointerY, reduceHeavyEffects]);

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
    <main className="relative isolate min-h-screen overflow-hidden bg-[#020914] pb-24 text-white md:pb-0">
      <LayoutGroup id="navonmesh-title-morph">
        <AnimatePresence>
          {showIntro && (
            <AIBootSequence
              onMorphStart={() => setTitleMorphReady(true)}
              onComplete={() => setShowIntro(false)}
              eventTitle="NAVONMESH"
              titleLayoutId="navonmesh-word"
            />
          )}
        </AnimatePresence>

      <div className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_82%_22%,rgba(96,165,250,0.15),transparent_36%),linear-gradient(180deg,#02060f_0%,#030b16_45%,#020711_100%)]" />
        <div className="absolute inset-0 opacity-[0.14] bg-[linear-gradient(rgba(125,211,252,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.2)_1px,transparent_1px)] bg-[size:88px_88px] [mask-image:radial-gradient(circle_at_center,black_42%,transparent_100%)]" />
        <div className="absolute -inset-12 animate-bgDrift bg-[radial-gradient(circle_at_28%_38%,rgba(45,212,191,0.18),transparent_30%),radial-gradient(circle_at_72%_64%,rgba(56,189,248,0.14),transparent_28%)]" />
      </div>
      {!reduceHeavyEffects && <div className="scifi-ambient" aria-hidden="true" />}
      {!reduceHeavyEffects && (
        <div className="pointer-events-none fixed inset-0 z-0">
          <motion.div className="absolute inset-0 mix-blend-screen" style={{ background: pointerGlow }} />
          <motion.div className="absolute inset-0 mix-blend-screen" style={{ background: pointerCore }} />
        </div>
      )}
      {showParticles && <ParticlesBackground quality={particleQuality} />}
      <Navbar />
      <motion.div
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-3 bottom-3 z-[90] md:hidden"
      >
        <div className="relative overflow-hidden rounded-2xl border border-cyan-300/40 bg-[#041224]/80 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(34,211,238,0.15)] backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(34,211,238,0.2),transparent_45%),radial-gradient(circle_at_85%_100%,rgba(59,130,246,0.2),transparent_40%)]" />
          <div className="relative grid grid-cols-4 gap-1.5">
            {[
              { label: "Events", href: "#events", icon: "target" as UiIcon },
              { label: "Timeline", href: "#timeline", icon: "calendar" as UiIcon },
              { label: "Prizes", href: "#prizes", icon: "award" as UiIcon },
              { label: "Contact", href: "#footer", icon: "phone" as UiIcon },
            ].map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                whileTap={{ scale: 0.93 }}
                className="group flex flex-col items-center justify-center rounded-xl border border-transparent hover:border-cyan-500/30 hover:bg-cyan-500/10 px-1 py-2 text-center transition active:bg-cyan-400/10"
              >
                <span className="text-cyan-200 transition group-active:text-white">
                  {renderIcon(item.icon, "h-4 w-4")}
                </span>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-100/90">
                  {item.label}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ==================== HERO SECTION ==================== */}
      <section
        id="home"
        className="relative min-h-[100svh] w-full overflow-hidden pt-16 md:pt-0 flex items-center justify-center"
      >
        {/* moving background layer (parallax) */}
        {reduceHeavyEffects ? (
          <div className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center" />
        ) : (
          <ParallaxBackground />
        )}

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
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="pointer-events-none absolute inset-x-3 top-24 bottom-20 rounded-[28px] border border-cyan-300/25 bg-[radial-gradient(circle_at_14%_10%,rgba(34,211,238,0.2),transparent_42%),radial-gradient(circle_at_86%_80%,rgba(59,130,246,0.2),transparent_38%),linear-gradient(180deg,rgba(4,17,36,0.56),rgba(2,10,22,0.48))] shadow-[0_0_45px_rgba(34,211,238,0.18)] md:hidden"
        />
        <motion.div
          aria-hidden="true"
          animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.98, 1.03, 0.98] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[68vw] w-[68vw] -translate-x-1/2 -translate-y-[45%] rounded-full border border-cyan-300/30 blur-[0.5px] md:hidden"
        />

          {/* CONTENT */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20 text-center flex flex-col items-center justify-center min-h-[calc(100svh-4rem)] md:min-h-screen">
          <div className="pointer-events-none absolute inset-x-8 top-40 h-28 rounded-full bg-cyan-400/12 blur-3xl md:hidden" />
          <div className="pointer-events-none absolute right-8 top-[42%] h-2.5 w-2.5 rounded-full bg-cyan-200/80 shadow-[0_0_15px_rgba(34,211,238,0.8)] md:hidden" />
          <div className="pointer-events-none absolute left-8 top-[58%] h-2 w-2 rounded-full bg-blue-200/80 shadow-[0_0_14px_rgba(59,130,246,0.75)] md:hidden" />
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
            className="mb-2 md:mb-8 relative z-10"
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
            className="text-base md:text-lg text-cyan-100 tracking-[2px] md:tracking-[3px] uppercase mb-2 md:mb-6 font-semibold drop-shadow-[0_0_10px_rgba(103,232,249,0.45)] px-2"
          >
            School of Engineering & Technology 
           
          </motion.p>

          {/* MAIN TITLE */}
          {titleMorphReady ? (
            <motion.h1
              layoutId="navonmesh-word"
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ layout: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.45 } }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] md:leading-tight mb-3 md:mb-4 bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]"
            >
              NAVONMESH
            </motion.h1>
          ) : (
            <h1
              aria-hidden="true"
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] md:leading-tight mb-3 md:mb-4 opacity-0"
            >
              NAVONMESH
            </h1>
          )}

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
            Where Idea Complete
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mb-7 md:mb-10 grid grid-cols-3 gap-2 md:gap-3 w-full max-w-sm md:max-w-xl"
          >
            {[
              { label: "Prize Pool", value: "₹82K+" },
              { label: "Events", value: "5+" },
              { label: "Participants", value: "6000+" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg md:rounded-xl border border-cyan-500/35 bg-cyan-500/[0.08] px-2 py-2 md:px-3 md:py-2.5 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_18px_rgba(6,182,212,0.16)]"
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
              className="group relative overflow-hidden glass-sm w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 rounded-xl border border-cyan-300/70 text-cyan-100 text-sm md:text-base font-bold tracking-[0.08em] uppercase hover:bg-cyan-500/15 hover:shadow-[0_0_24px_rgba(34,211,238,0.28)] transition duration-300 text-center active:scale-[0.98] active:brightness-110"
            >
              <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-cyan-200/35 to-transparent transition-transform duration-700 group-hover:translate-x-[320%]" />
              <span className="pointer-events-none absolute inset-0 opacity-0 md:opacity-0 group-active:opacity-100 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.24),transparent_70%)] transition" />
              <span className="relative z-10">Explore Events</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.96 }}
              href="#timeline"
              className="group relative overflow-hidden w-full sm:w-auto px-7 md:px-9 py-3 md:py-4 rounded-xl border border-cyan-500/45 bg-[#041223]/75 text-cyan-200 text-sm md:text-base font-bold tracking-[0.08em] uppercase hover:border-cyan-300/75 hover:bg-cyan-500/10 transition duration-300 text-center active:scale-[0.985] active:border-cyan-200/80"
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

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-5 md:hidden"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/55 bg-cyan-400/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100 shadow-[0_0_22px_rgba(34,211,238,0.25)]">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-200" />
              Tap Dock To Explore Fast
            </div>
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
              NAVONMESH is a university technology festival that brings together students to explore innovation, creativity, and practical problem-solving through technical events and competitions. Organized by the School of Engineering & Technology, it provides a platform for learning, collaboration, and showcasing student talent across multiple domains. The fest aims to encourage hands-on experience, teamwork, and a strong technical community.
            </p>
          </motion.div>

          {/* FEATURE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: "target" as UiIcon, title: "Innovation Hub", desc: "Showcase groundbreaking ideas" },
              { icon: "users" as UiIcon, title: "Global Community", desc: "Network with 2000+ innovators" },
              { icon: "award" as UiIcon, title: "Premium Prizes", desc: "Win ₹82,000+ total prize pool" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{
                  y: -10,
                  scale: 1.012,
                  transition: { type: "spring", stiffness: 220, damping: 22, mass: 0.7 },
                }}
                viewport={{ once: true }}
                className="group cyber-card p-6 md:p-8 rounded-2xl backdrop-blur-sm border border-cyan-500/30 transform-gpu transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:border-cyan-200/80 md:hover:shadow-[0_22px_58px_rgba(6,182,212,0.24)]"
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-700 ease-out md:group-hover:opacity-100 bg-[radial-gradient(circle_at_12%_18%,rgba(34,211,238,0.18),transparent_45%),linear-gradient(180deg,rgba(8,18,34,0.08),rgba(8,18,34,0.02))]" />
                <div className="mb-4 text-cyan-300 transform-gpu transition-all duration-500 ease-out md:group-hover:-translate-y-0.5 md:group-hover:text-cyan-200">
                  {renderIcon(item.icon, "h-10 w-10 md:h-12 md:w-12")}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-cyan-300 mb-2 transition-colors duration-500 ease-out md:group-hover:text-cyan-100">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-400 transition-colors duration-500 ease-out md:group-hover:text-slate-200">{item.desc}</p>
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
              5 exciting competitions across AI, Robotics, Electronics, Gaming, and more
            </p>
          </motion.div>

          {/* EVENTS GRID */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6"
          >
            {events.map((event) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                className={`group cursor-pointer h-full lg:col-span-2 ${
                  event.name === "Circuit Design"
                    ? "lg:col-start-2"
                    : event.name === "Valorant Tournament"
                      ? "lg:col-start-4"
                      : ""
                }`}
                onClick={() => openEventDetails(event)}
              >
                <div
                  className={`cyber-card h-full rounded-2xl overflow-hidden border ${event.borderColor} backdrop-blur-lg transition duration-300 group-hover:border-opacity-100 group-hover:shadow-2xl group-hover:shadow-cyan-500/20 bg-gradient-to-br ${event.color} flex flex-col active:scale-[0.98] md:active:scale-100`}
                >
                  {/* IMAGE */}
                  <div className="relative h-28 sm:h-32 md:h-40 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.name}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
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
      </section>


      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md p-0 md:p-6 lg:p-8 flex items-center justify-center overflow-y-auto"
          onClick={() => setSelectedEvent(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-[1000] w-full h-full md:h-auto md:max-w-3xl md:max-h-[90vh] rounded-none md:rounded-2xl border-x-0 md:border border-cyan-400/30 bg-[#020812] shadow-[0_0_50px_rgba(34,211,238,0.15)] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 md:h-56 flex-shrink-0">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020812] via-[#020812]/20 to-transparent" />
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 h-10 w-10 rounded-full border border-cyan-200/30 bg-black/50 text-cyan-100 backdrop-blur-md flex items-center justify-center hover:bg-cyan-500/20 transition active:scale-90 z-50"
                aria-label="Close event details"
              >
                {renderIcon("close", "h-5 w-5")}
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#020812] to-transparent">
                <motion.div
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.1 }}
                >
                    <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">{selectedEvent.category}</p>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white leading-tight">{selectedEvent.name}</h3>
                </motion.div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light">{selectedEvent.details}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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

      {/* ==================== TIMELINE SECTION ==================== */}
      <section
        id="timeline"
        className={`relative py-14 md:py-20 px-4 md:px-8 bg-gradient-to-b from-transparent via-slate-950/25 to-transparent ${selectedEvent ? "z-0" : "z-[1]"}`}
      >
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
              ₹82,000
            </p>
            <p className="mt-3 text-base md:text-lg text-slate-400">
              Real rewards for real ideas. 1st, 2nd, and 3rd prizes apply to all events except Valorant.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {[
              {
                icon: "gold" as UiIcon,
                label: "Grand Prize",
                title: "1st Prize",
                amount: "₹10,000",
                iconBg: "bg-amber-400",
                iconShadow: "shadow-[0_0_30px_rgba(251,191,36,0.4)]",
                border: "border-cyan-500/60",
              },
              {
                icon: "silver" as UiIcon,
                label: "Runner Up",
                title: "2nd Prize",
                amount: "₹5,000",
                iconBg: "bg-slate-300",
                iconShadow: "shadow-[0_0_28px_rgba(226,232,240,0.35)]",
                border: "border-cyan-700/40",
              },
              {
                icon: "bronze" as UiIcon,
                label: "Second Runner Up",
                title: "3rd Prize",
                amount: "₹3,000",
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
            {faqData.map((item, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ${
                    isOpen
                      ? "border-cyan-400 bg-cyan-900/10 shadow-[0_0_35px_rgba(34,211,238,0.15)]"
                      : "border-cyan-500/20 bg-[#030c17]/40 hover:border-cyan-400/50 hover:bg-cyan-900/5"
                  }`}
                >
                  {/* Active Indicator Line */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-cyan-400 transition-all duration-500 ${
                      isOpen ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="relative flex w-full items-center justify-between p-5 md:p-7 text-left z-10"
                  >
                    <span
                      className={`text-lg md:text-xl font-bold tracking-wide transition-colors duration-300 ${
                        isOpen ? "text-cyan-100 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" : "text-slate-300 group-hover:text-white"
                      }`}
                    >
                      {item.question}
                    </span>

                    {/* Animated Icon */}
                    <div
                      className={`relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                        isOpen
                          ? "border-cyan-400 bg-cyan-400/20 rotate-180 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                          : "border-cyan-500/30 bg-transparent group-hover:border-cyan-400/60 group-hover:bg-cyan-500/10"
                      }`}
                    >
                      <svg
                        className={`w-5 h-5 transition-colors duration-300 ${isOpen ? "text-cyan-200" : "text-cyan-500"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-5 pb-6 md:px-8 md:pb-8 pt-0 relative z-10">
                          <div className="h-px w-full bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 mb-5" />
                          <p className="text-base md:text-lg text-cyan-100/80 leading-relaxed font-light">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Background Glow for Active State */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-transparent pointer-events-none transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`} />
                </motion.div>
              );
            })}
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
              Join 6000+ innovators. Secure your spot now and be part of India&apos;s premier tech fest.
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
      <footer
        id="footer"
        className="relative overflow-hidden border-t border-cyan-500/25 px-4 py-12 md:px-8 md:py-14"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.14),transparent_38%),radial-gradient(circle_at_85%_12%,rgba(59,130,246,0.14),transparent_42%),linear-gradient(180deg,#020913_0%,#01070f_48%,#020a14_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.18] bg-[linear-gradient(rgba(125,211,252,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.16)_1px,transparent_1px)] bg-[size:84px_84px]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.14] bg-[repeating-linear-gradient(180deg,rgba(148,220,252,0.08)_0px,rgba(148,220,252,0.08)_1px,transparent_1px,transparent_4px)]" />

        <div className="mx-auto max-w-6xl">
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-10">
            <div>
              <h3 className="font-display text-3xl font-black uppercase tracking-[0.04em] text-cyan-300">
                NAVONMESH
              </h3>
              <p className="mt-4 max-w-xs text-base leading-relaxed text-slate-400">
                India&apos;s premier university technology festival celebrating innovation and excellence.
              </p>
            </div>

            <div>
              <h4 className="text-3xl font-bold text-white">Quick Links</h4>
              <ul className="mt-4 space-y-2 text-base text-slate-400">
                <li><a href="#events" className="transition hover:text-cyan-300">Events</a></li>
                <li><a href={registrationFormUrl} target="_blank" rel="noopener noreferrer" className="transition hover:text-cyan-300">Register</a></li>
                <li><a href="#timeline" className="transition hover:text-cyan-300">Timeline</a></li>
                <li><a href="#footer" className="transition hover:text-cyan-300">Rules</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-3xl font-bold text-white">Contact</h4>
              <p className="mt-4 text-base leading-relaxed text-slate-400">
                Email: <span className="text-cyan-300">navonmesh@university.edu</span>
              </p>
              <p className="mt-2 text-base text-slate-400">
                Phone: <span className="text-cyan-300">020 47200000</span>
              </p>
              <p className="mt-2 text-base leading-relaxed text-slate-400">
                Address: Mukunddas Lohia Academic Complex, Behind BMCC, 182, Agaharkar Road, Shivajinagar, Pune 411 004
              </p>
            </div>

            <div>
              <h4 className="text-3xl font-bold text-white">Follow</h4>
              <div className="mt-4 flex gap-3">
                {[
                  { icon: "facebook", href: "https://www.facebook.com/DESPuneUniversity/" },
                  { icon: "x", href: "https://x.com/des_pune?lang=en" },
                  { icon: "instagram", href: "https://www.instagram.com/soet.despu/" },
                  { icon: "linkedin", href: "https://in.linkedin.com/school/des-pune-university/" },
                ].map((social) => (
                  <a
                    key={social.icon}
                    href={social.href}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/55 bg-cyan-500/10 text-cyan-300 transition hover:bg-cyan-400/20 hover:text-cyan-100 hover:shadow-[0_0_22px_rgba(34,211,238,0.25)]"
                    aria-label={social.icon}
                  >
                    {renderIcon(social.icon as UiIcon, "h-5 w-5")}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mt-10 border-t border-cyan-500/25 pt-7 text-center text-lg text-slate-500">
            <p>&copy; 2026 NAVONMESH. All rights reserved. Built by the organizing committee.</p>
          </div>
        </div>
      </footer>
      </LayoutGroup>
    </main>
  );
}
