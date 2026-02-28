"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

interface AIBootSequenceProps {
  onComplete: () => void;
  eventTitle?: string;
}

type IntroPhase = "boot" | "glitch" | "hud" | "logo" | "impact" | "dissolve";

type EnergyParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
};

export default function AIBootSequence({
  onComplete,
  eventTitle = "NAVONMESH 2026",
}: AIBootSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef<IntroPhase>("boot");
  const introCompletedRef = useRef(false);
  const [phase, setPhase] = useState<IntroPhase>("boot");
  const [showIntro, setShowIntro] = useState(true);

  const completeIntro = useCallback(() => {
    if (introCompletedRef.current) return;
    introCompletedRef.current = true;
    setShowIntro(false);
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: EnergyParticle[] = [];
    let rafId = 0;
    let last = performance.now();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const spawnParticle = (cx: number, cy: number, variance: number, speedMin: number, speedMax: number) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * variance;
      const speed = speedMin + Math.random() * (speedMax - speedMin);
      particles.push({
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 0.35 + Math.random() * 1.1,
        size: 0.7 + Math.random() * 2.4,
        hue: Math.random() > 0.42 ? 190 : 212,
      });
    };

    const drawFrame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.033);
      last = now;
      const current = phaseRef.current;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const spawnCount =
        current === "boot"
          ? 1
          : current === "glitch"
            ? 4
            : current === "hud"
              ? 6
              : current === "logo"
                ? 8
                : current === "impact"
                  ? 12
                  : 2;

      const speedMax = current === "impact" ? 360 : current === "logo" ? 220 : 170;
      for (let i = 0; i < spawnCount; i += 1) {
        spawnParticle(centerX, centerY, current === "impact" ? 30 : 80, 40, speedMax);
      }

      ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const scanAlpha =
        current === "glitch" || current === "hud" || current === "logo"
          ? 0.06
          : current === "impact"
            ? 0.1
            : 0.02;
      ctx.fillStyle = `rgba(130, 220, 255, ${scanAlpha})`;
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 1);
      }

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.992;
        p.vy *= 0.992;
        p.life -= dt / p.maxLife;

        const alpha = Math.max(0, p.life);
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${alpha * 0.8})`;
        ctx.arc(p.x, p.y, p.size * (0.72 + alpha), 0, Math.PI * 2);
        ctx.fill();

        if (alpha > 0.3) {
          ctx.strokeStyle = `hsla(${p.hue}, 100%, 72%, ${alpha * 0.24})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      rafId = window.requestAnimationFrame(drawFrame);
    };

    resize();
    rafId = window.requestAnimationFrame(drawFrame);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase("glitch"), 380));
    timers.push(window.setTimeout(() => setPhase("hud"), 980));
    timers.push(window.setTimeout(() => setPhase("logo"), 2180));
    timers.push(window.setTimeout(() => setPhase("impact"), 3340));
    timers.push(window.setTimeout(() => setPhase("dissolve"), 4020));
    timers.push(window.setTimeout(() => setShowIntro(false), 4580));
    timers.push(window.setTimeout(completeIntro, 5320));

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [completeIntro]);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(1.6px)" }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[3000] overflow-hidden bg-black"
        >
          <button
            type="button"
            onClick={completeIntro}
            className="absolute right-4 top-4 z-20 rounded-full border border-cyan-300/55 bg-black/45 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-500/15 md:right-6 md:top-6"
          >
            Skip Intro
          </button>

          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full mix-blend-screen" />

          <motion.div
            aria-hidden="true"
            animate={{
              scale: phase === "impact" ? 1.06 : 1,
              opacity: phase === "impact" ? 0.92 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(15,36,86,0.46),transparent_48%),radial-gradient(circle_at_52%_63%,rgba(34,211,238,0.13),transparent_38%),linear-gradient(180deg,#000000_0%,#000207_42%,#000103_100%)]"
          />

          <motion.div
            aria-hidden="true"
            animate={{
              opacity: phase === "glitch" || phase === "hud" ? [0, 0.34, 0.12, 0] : 0,
            }}
            transition={{ duration: 0.22, repeat: phase === "logo" || phase === "impact" ? 0 : Infinity, repeatDelay: 0.16 }}
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(56,189,248,0.5)_32%,transparent_64%)]"
          />

          <motion.div
            aria-hidden="true"
            animate={{
              opacity: phase === "glitch" || phase === "hud" || phase === "logo" ? [0, 0.18, 0] : 0,
              x: phase === "impact" ? 0 : ["-120%", "130%"],
            }}
            transition={{ duration: 0.9, ease: "easeInOut", repeat: phase === "dissolve" ? 0 : Infinity, repeatDelay: 0.42 }}
            className="pointer-events-none absolute top-0 bottom-0 w-24 -skew-x-12 bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent blur-md"
          />

          <motion.div
            aria-hidden="true"
            animate={{
              opacity: phase === "impact" ? [0, 0.72, 0] : [0, 0.24, 0],
              scale: phase === "impact" ? [0.92, 1.26] : [1, 1.03],
            }}
            transition={{ duration: phase === "impact" ? 0.48 : 1.25, repeat: phase === "impact" ? 0 : Infinity }}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(125,245,255,0.72),rgba(59,130,246,0.14)_40%,transparent_74%)] mix-blend-screen"
          />

          <motion.div
            aria-hidden="true"
            animate={{
              opacity: phase === "boot" ? 0 : 1,
              scale: phase === "logo" || phase === "impact" ? 1 : 0.86,
            }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[68vmin] w-[68vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/35 shadow-[0_0_130px_rgba(34,211,238,0.22)]"
          />
          <motion.div
            aria-hidden="true"
            animate={{
              rotate: 360,
              opacity: phase === "hud" || phase === "logo" || phase === "impact" ? [0.1, 0.3, 0.1] : 0,
            }}
            transition={{ rotate: { duration: 9, ease: "linear", repeat: Infinity }, opacity: { duration: 1.2, repeat: Infinity } }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[52vmin] w-[52vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/30"
          />
          <motion.div
            aria-hidden="true"
            animate={{
              rotate: -360,
              opacity: phase === "hud" || phase === "logo" || phase === "impact" ? [0.08, 0.22, 0.08] : 0,
            }}
            transition={{ rotate: { duration: 6.5, ease: "linear", repeat: Infinity }, opacity: { duration: 0.9, repeat: Infinity } }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[38vmin] w-[38vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200/25"
          />

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 34 }).map((_, idx) => (
              <motion.span
                key={`fragment-${idx}`}
                initial={{
                  x: idx % 2 === 0 ? -260 - idx * 6 : 260 + idx * 6,
                  y: (idx % 17) * 22 - 190,
                  opacity: 0,
                  scale: 0.6,
                }}
                animate={{
                  x: phase === "logo" || phase === "impact" ? 0 : idx % 2 === 0 ? -115 : 115,
                  y: phase === "logo" || phase === "impact" ? 0 : (idx % 17) * 10 - 85,
                  opacity:
                    phase === "hud"
                      ? [0, 0.78, 0.2]
                      : phase === "logo" || phase === "impact"
                        ? [0.18, 1, 0.35]
                        : 0,
                  scale: phase === "logo" || phase === "impact" ? [0.82, 1.08, 0.82] : [0.65, 0.9, 0.7],
                }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.013,
                  repeat: phase === "boot" || phase === "dissolve" ? 0 : Infinity,
                  repeatType: "mirror",
                }}
                className="absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/80 blur-[0.8px]"
              />
            ))}
          </div>

          <div className="pointer-events-none absolute left-6 top-8 hidden border border-cyan-300/40 bg-[#030f1e]/55 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-200/80 md:block">
            <p>boot seq // active</p>
            <motion.div
              animate={{ scaleX: phase === "boot" ? [0, 1] : 1 }}
              transition={{ duration: 0.7 }}
              className="mt-2 h-[2px] origin-left bg-gradient-to-r from-cyan-200/90 to-transparent"
            />
          </div>

          <div className="pointer-events-none absolute right-6 top-8 hidden border border-blue-300/35 bg-[#030f1e]/50 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-blue-200/75 md:block">
            <p>hud matrix // link</p>
            <motion.div
              animate={{ scaleX: phase === "hud" || phase === "logo" ? [0, 1] : 0 }}
              transition={{ duration: 0.85 }}
              className="mt-2 h-[2px] origin-right bg-gradient-to-l from-blue-200/90 to-transparent"
            />
          </div>

          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[92vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 px-4 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "boot" ? 0.92 : 0 }}
              transition={{ duration: 0.24 }}
              className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-cyan-100/90 md:text-xs"
            >
              SYSTEM BOOT // DARK VOID
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "glitch" || phase === "hud" ? 0.84 : 0 }}
              transition={{ duration: 0.3 }}
              className="mb-5 text-[9px] uppercase tracking-[0.3em] text-cyan-200/75 md:text-[11px]"
            >
              scanning neural lattice
            </motion.p>

            <div className="relative">
              <motion.h1
                initial={{ opacity: 0, scale: 0.86 }}
                animate={{
                  opacity: phase === "logo" || phase === "impact" || phase === "dissolve" ? 1 : 0.16,
                  scale:
                    phase === "impact"
                      ? [1.02, 1.09, 1]
                      : phase === "logo"
                        ? [0.92, 1.04, 1]
                        : 0.86,
                  letterSpacing: phase === "logo" || phase === "impact" || phase === "dissolve" ? ["0.24em", "0.08em"] : "0.24em",
                }}
                transition={{ duration: phase === "impact" ? 0.5 : 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-4xl font-black uppercase text-cyan-100 drop-shadow-[0_0_42px_rgba(34,211,238,0.8)] sm:text-6xl md:text-7xl"
              >
                {eventTitle}
              </motion.h1>
              <motion.h1
                aria-hidden="true"
                animate={{
                  opacity: phase === "hud" || phase === "logo" ? [0, 0.5, 0] : 0,
                  x: phase === "hud" || phase === "logo" ? [-3, 2, -2, 0] : 0,
                }}
                transition={{ duration: 0.15, repeat: phase === "impact" || phase === "dissolve" ? 0 : Infinity, repeatDelay: 0.22 }}
                className="absolute inset-0 font-display text-4xl font-black uppercase text-blue-300/70 mix-blend-screen blur-[0.45px] sm:text-6xl md:text-7xl"
              >
                {eventTitle}
              </motion.h1>
            </div>

            <motion.div
              animate={{ opacity: phase === "glitch" || phase === "hud" ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="mx-auto mt-6 w-full max-w-sm"
            >
              <div className="h-[2px] w-full overflow-hidden rounded-full bg-cyan-500/20">
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 0.95, repeat: Infinity, ease: "easeInOut" }}
                  className="h-full w-1/2 bg-gradient-to-r from-transparent via-cyan-200 to-transparent"
                />
              </div>
              <p className="mt-2 text-[9px] uppercase tracking-[0.23em] text-cyan-200/70">calibrating interface matrix</p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "logo" || phase === "impact" || phase === "dissolve" ? 0.95 : 0 }}
              transition={{ duration: 0.34 }}
              className="mt-5 text-[9px] uppercase tracking-[0.3em] text-cyan-200/80 md:text-[11px]"
            >
              futuristic tech conference aesthetic
            </motion.p>
          </div>

          <motion.div
            aria-hidden="true"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{
              scale: phase === "impact" ? [0.2, 1.45] : 0.2,
              opacity: phase === "impact" ? [0, 0.55, 0] : 0,
            }}
            transition={{ duration: 0.52, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[20vmin] w-[20vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/70"
          />

          <motion.div
            aria-hidden="true"
            animate={{ opacity: phase === "impact" ? [0, 0.9, 0] : 0 }}
            transition={{ duration: 0.42 }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[2px] w-[70vmin] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-100/90 to-transparent blur-[1.1px]"
          />

          <motion.div
            aria-hidden="true"
            animate={{ opacity: phase === "dissolve" ? [0, 1] : 0 }}
            transition={{ duration: 0.68, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(34,211,238,0.08),transparent_50%),linear-gradient(180deg,rgba(0,0,0,0.75),rgba(0,0,0,0.98))]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
