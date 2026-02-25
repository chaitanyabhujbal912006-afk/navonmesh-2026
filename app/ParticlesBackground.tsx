"use client";

import React, { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
};

export default function ParticlesBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.max(1, window.devicePixelRatio || 1);
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let lastTime = performance.now();

    const config = {
      baseCount: 48,
      minRadius: 0.9,
      maxRadius: 2.4,
      maxSpeed: 0.22,
      linkDistance: 140,
      linkWidth: 0.9,
      bgAlpha: 0.0,
    };

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(300, Math.floor(rect.width));
      height = Math.max(150, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const areaFactor = (width * height) / (1366 * 768);
      const count = Math.max(24, Math.round(config.baseCount * areaFactor));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * config.maxSpeed,
          vy: (Math.random() - 0.5) * config.maxSpeed,
          r: config.minRadius + Math.random() * (config.maxRadius - config.minRadius),
          alpha: 0.2 + Math.random() * 0.8,
        });
      }
    }

    function step(now: number) {
      const dt = Math.min(40, now - lastTime) / 16.6667; // normalize to ~60fps
      lastTime = now;

      // subtle background clear for trailing glow
      ctx.clearRect(0, 0, width, height);

      // draw links
      ctx.save();
      ctx.globalCompositeOperation = "brighter";
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < config.linkDistance) {
            const t = 1 - dist / config.linkDistance;
            const alpha = Math.min(0.45, t * 0.28 * ((a.alpha + b.alpha) / 2));
            const linkAlpha = Math.min(0.95, alpha * 2.2);
            ctx.beginPath();
            ctx.lineWidth = config.linkWidth;
            ctx.strokeStyle = `rgba(34,211,238,${linkAlpha})`;
            ctx.shadowColor = `rgba(34,211,238,${linkAlpha})`;
            ctx.shadowBlur = 12 * t + 2;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // gentle velocity modulation for organic motion
        p.vx += Math.sin((now / 5000) + i) * 0.0006 * dt;
        p.vy += Math.cos((now / 6000) + i) * 0.0005 * dt;

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // wrap
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        const fillAlpha = Math.min(1, 0.9 * p.alpha + 0.12);
        ctx.fillStyle = `rgba(34,211,238,${fillAlpha})`;
        ctx.shadowColor = `rgba(34,211,238,${Math.min(0.6, fillAlpha)})`;
        ctx.shadowBlur = 16;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        // subtle outer halo stroke for extra glow
        ctx.beginPath();
        ctx.strokeStyle = `rgba(34,211,238,${0.08 * fillAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 10;
        ctx.arc(p.x, p.y, p.r + 1.2, 0, Math.PI * 2);
        ctx.stroke();
      }

      raf = requestAnimationFrame(step);
    }

    const onResize = () => {
      dpr = Math.max(1, window.devicePixelRatio || 1);
      resize();
    };

    resize();
    raf = requestAnimationFrame(step);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        mixBlendMode: "screen",
      }}
    />
  );
}

