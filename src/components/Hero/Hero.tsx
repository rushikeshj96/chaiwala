import { motion } from 'framer-motion';
import { VisitorCounter } from '../VisitorCounter/VisitorCounter';
import { QuoteCard } from '../QuoteCard/QuoteCard';
import { ChaiButton } from '../ChaiButton/ChaiButton';
import { useClock } from '../../hooks/useClock';
import { SITE_CONFIG } from '../../config/site';

export function Hero() {
  const clock = useClock();

  return (
    <section
      className="relative w-full overflow-hidden bg-transparent"
      style={{ height: '100dvh', minHeight: '580px' }}
      aria-label="Chai Wala main stage"
    >

      {/* ── Top navigation bar ── */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 pt-6 md:pt-7">

        {/* Clock — top left */}
        <div className="flex-1 flex justify-start">
          <div
            className="font-ui text-sm font-medium tabular-nums"
            style={{ color: 'rgba(245,230,208,0.55)', letterSpacing: '0.04em' }}
            aria-label={`Current time: ${clock}`}
          >
            {clock}
          </div>
        </div>

        {/* Visitor counter — top center */}
        <div className="flex-shrink-0">
          <VisitorCounter />
        </div>

        {/* Right spacer to balance top nav */}
        <div className="flex-1 flex justify-end">
          <div className="w-6" aria-hidden="true" />
        </div>
      </div>

      {/* ── Main title block — perfectly centered ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center w-full px-5 md:px-10 text-center">
        {/* Big Hindi heading */}
        <motion.h1
          className="font-devanagari font-black leading-none select-none max-w-full"
          style={{
            fontSize: 'clamp(2.5rem, 10vw, 12rem)',
            color: 'var(--chai-cream)',
            textShadow: `
              0 2px 0 rgba(0,0,0,0.4),
              0 8px 48px rgba(212,136,42,0.18),
              0 0 120px rgba(212,136,42,0.08)
            `,
            letterSpacing: '-0.02em',
            lineHeight: 0.9,
            wordWrap: 'break-word',
          }}
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {SITE_CONFIG.hindiName}
        </motion.h1>

        {/* English subtitle */}
        {/* <motion.p
          className="font-ui font-light mt-3 md:mt-4"
          style={{
            fontSize: 'clamp(0.6rem, 1.4vw, 0.85rem)',
            color: 'var(--chai-warm)',
            opacity: 0.75,
            letterSpacing: '0.28em',
          }}
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 0.75, letterSpacing: '0.28em' }}
          transition={{ duration: 1.4, delay: 0.35, ease: 'easeOut' }}
          aria-label="Chai Wala — a digital roadside tea stall"
        >
          {SITE_CONFIG.latinSubtitle} — A DIGITAL ROADSIDE TEA STALL
        </motion.p> */}
      </div>

      {/* ── Centre-bottom: quote ── */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-10 w-full max-w-lg px-8 text-center"
        style={{ bottom: 'clamp(140px, 40vh, 200px)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.1 }}
      >
        <QuoteCard />
      </motion.div>

      {/* ── Bottom-left: Chai Timer ── */}
      {/* <motion.div
        className="absolute left-1/2 -translate-x-1/2 md:-translate-x-0 md:left-10 z-20"
        style={{ bottom: 'clamp(190px, 25vh, 250px)' }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <ChaiTimer />
      </motion.div> */}

      {/* ── Bottom-right: Chai Button ── */}
      <motion.div
        className="absolute right-6 md:right-12 z-20 hidden md:block"
        style={{ bottom: 'clamp(24px, 6vh, 48px)' }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <ChaiButton />
      </motion.div>
    </section>
  );
}
