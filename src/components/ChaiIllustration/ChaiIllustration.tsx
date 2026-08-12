import { motion } from 'framer-motion';
import bgImage from '../../assets/chaiwala.png';

/* Animated steam wisps rising from the kettle area */
const WISPS = [
  { x: '48%', delay: 0, dur: 3.2, driftX: 8 },
  { x: '50%', delay: 0.8, dur: 3.8, driftX: -10 },
  { x: '52%', delay: 1.6, dur: 2.9, driftX: 14 },
  { x: '46%', delay: 2.4, dur: 4.1, driftX: -6 },
];

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: `${10 + Math.random() * 80}%`,
  dur: 5 + Math.random() * 4,
  delay: Math.random() * 6,
  drift: (Math.random() - 0.5) * 40,
}));

export function ChaiIllustration() {
  return (
    <div className="fixed inset-0 overflow-hidden z-0" aria-hidden="true">
      {/* Base background image */}
      <img
        src={bgImage}
        alt="Indian chai stall illustration"
        className="absolute inset-0 w-full h-full object-cover object-top"
      // style={{ filter: 'brightness(0.55) saturate(1.1)' }}
      />

      {/* Warm atmospheric overlay — top to bottom gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(20, 10, 4, 0.85) 0%,
              rgba(20, 10, 4, 0.45) 35%,
              rgba(20, 10, 4, 0.2) 60%,
              rgba(20, 10, 4, 0.75) 100%
            )
          `,
        }}
      />

      {/* Warm glow from bottom (lantern / stall lights) */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[45%]"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(212, 136, 42, 0.22) 0%, transparent 70%)',
        }}
      />

      {/* Side vignettes */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(10, 5, 2, 0.7) 100%)',
        }}
      />

      {/* Animated steam wisps */}
      {WISPS.map((w, i) => (
        <div
          key={i}
          className="absolute bottom-[35%] w-2 h-6 rounded-full steam-waft"
          style={{
            left: w.x,
            '--delay': `${w.delay}s`,
            '--dur': `${w.dur}s`,
            '--drift': `${w.driftX}px`,
            background: 'radial-gradient(ellipse, rgba(255,248,240,0.5) 0%, transparent 70%)',
          } as React.CSSProperties}
        />
      ))}

      {/* Ambient floating dust particles */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-[20%] w-1 h-1 rounded-full particle"
          style={{
            left: p.x,
            '--pdur': `${p.dur}s`,
            '--pdelay': `${p.delay}s`,
            '--drift': `${p.drift}px`,
            background: 'rgba(212, 136, 42, 0.35)',
          } as React.CSSProperties}
        />
      ))}

      {/* Hanging bulb glow (top-center area) */}
      <motion.div
        className="absolute top-[18%] left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bulb-flicker"
        style={{
          background: 'radial-gradient(circle, rgba(212, 136, 42, 0.6) 0%, rgba(212, 136, 42, 0.1) 50%, transparent 70%)',
          filter: 'blur(4px)',
        }}
      />
    </div>
  );
}
