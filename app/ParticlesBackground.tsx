"use client";

import React, { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  color: string;
};

export default function ParticlesBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const canvasRef = canvas as HTMLCanvasElement;
    const ctxRef = ctx as CanvasRenderingContext2D;

    let dpr = Math.max(1, window.devicePixelRatio || 1);
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let lastTime = performance.now();

    const config = {
      baseCount: 56,
      minRadius: 1.2,
      maxRadius: 3.4,
      maxSpeed: 0.22,
      linkDistance: 155,
      linkWidth: 1.15,
      bgAlpha: 0.0,
      palette: ["125,249,255", "147,197,253", "96,165,250", "129,140,248"],
    };

    function resize() {
      const rect = canvasRef.getBoundingClientRect();
      width = Math.max(300, Math.floor(rect.width));
      height = Math.max(150, Math.floor(rect.height));
      canvasRef.width = Math.floor(width * dpr);
      canvasRef.height = Math.floor(height * dpr);
      canvasRef.style.width = `${width}px`;
      canvasRef.style.height = `${height}px`;
      ctxRef.setTransform(dpr, 0, 0, dpr, 0, 0);

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
          alpha: 0.8 + Math.random() * 0.2,
          color: config.palette[Math.floor(Math.random() * config.palette.length)],
        });
      }
    }

    function step(now: number) {
      const dt = Math.min(40, now - lastTime) / 16.6667; // normalize to ~60fps
      lastTime = now;

      // subtle background clear for trailing glow
      ctxRef.clearRect(0, 0, width, height);

      // draw links
      ctxRef.save();
      ctxRef.globalCompositeOperation = "lighter";
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < config.linkDistance) {
            const t = 1 - dist / config.linkDistance;
            const alpha = Math.min(0.8, t * 0.48 * ((a.alpha + b.alpha) / 2));
            const linkAlpha = Math.min(1, alpha * 2.5);
            ctxRef.beginPath();
            ctxRef.lineWidth = config.linkWidth;
            ctxRef.strokeStyle = `rgba(96,165,250,${linkAlpha})`;
            ctxRef.shadowColor = `rgba(96,165,250,${linkAlpha})`;
            ctxRef.shadowBlur = 22 * t + 5;
            ctxRef.moveTo(a.x, a.y);
            ctxRef.lineTo(b.x, b.y);
            ctxRef.stroke();
          }
        }
      }
      ctxRef.restore();

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

        ctxRef.beginPath();
        const fillAlpha = Math.min(1, 1.02 * p.alpha + 0.24);
        ctxRef.fillStyle = `rgba(${p.color},${fillAlpha})`;
        ctxRef.shadowColor = `rgba(${p.color},${Math.min(1, fillAlpha)})`;
        ctxRef.shadowBlur = 30;
        ctxRef.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctxRef.fill();

        // bright core so dots stay visibly luminous on all dark sections
        ctxRef.beginPath();
        ctxRef.fillStyle = `rgba(255,255,255,${Math.min(0.9, fillAlpha * 0.8)})`;
        ctxRef.shadowColor = `rgba(255,255,255,${Math.min(0.95, fillAlpha)})`;
        ctxRef.shadowBlur = 10;
        ctxRef.arc(p.x, p.y, Math.max(0.55, p.r * 0.45), 0, Math.PI * 2);
        ctxRef.fill();
        // subtle outer halo stroke for extra glow
        ctxRef.beginPath();
        ctxRef.strokeStyle = `rgba(${p.color},${0.24 * fillAlpha})`;
        ctxRef.lineWidth = 1.7;
        ctxRef.shadowBlur = 18;
        ctxRef.arc(p.x, p.y, p.r + 1.2, 0, Math.PI * 2);
        ctxRef.stroke();
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
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        mixBlendMode: "screen",
      }}
    />
  );
}
