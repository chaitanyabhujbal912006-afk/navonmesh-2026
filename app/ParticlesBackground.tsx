"use client";

import Particles from "@tsparticles/react";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {
  const particlesInit = async (engine: any) => {
    await loadSlim(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: { value: "transparent" },
        },
        fullScreen: {
          enable: true,
          zIndex: 0,
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 46,
            density: {
              enable: true,
              area: 900,
            },
          },
          color: {
            value: ["#22d3ee", "#3b82f6", "#8b5cf6"],
          },
          links: {
            enable: true,
            color: "#38bdf8",
            distance: 145,
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.8,
            outModes: {
              default: "out",
            },
          },
          opacity: {
            value: { min: 0.15, max: 0.45 },
          },
          size: {
            value: { min: 1, max: 2.8 },
          },
        },
        detectRetina: true,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            resize: true,
          },
          modes: {
            grab: {
              distance: 165,
              links: { opacity: 0.32 },
            },
          },
        },
      }}
      className="pointer-events-none fixed inset-0"
    />
  );
}

