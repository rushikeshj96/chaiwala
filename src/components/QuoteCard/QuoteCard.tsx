import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUOTES = [
  {
    hindi: 'एक कप चाय, थोड़ी सी बातें, और थोड़ा सा सुकून.',
    english: 'A cup of tea, a little talk, and a little peace.',
  },
  {
    hindi: 'चाय पीओ, दुनिया भूलो.',
    english: 'Drink chai, forget the world.',
  },
  {
    hindi: 'जहाँ चाय, वहाँ घर.',
    english: 'Where there is chai, there is home.',
  },
  {
    hindi: 'सब ठीक हो जाएगा — पहले चाय पी लो.',
    english: 'Everything will be fine — have some chai first.',
  },
  {
    hindi: 'ये नहीं, वो नहीं — बस एक कप चाय.',
    english: 'Not this, not that — just a cup of chai.',
  },
  {
    hindi: 'चाय है तो जिंदगी है.',
    english: 'If there is chai, there is life.',
  },
];

const INTERVAL_MS = 4000;

export function QuoteCard() {
  const [index, setIndex] = useState(0);
  const paused = useRef(false);

  // Auto-advance every INTERVAL_MS; skip tick when hovered / focused
  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) {
        setIndex((i) => (i + 1) % QUOTES.length);
      }
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const next = () => setIndex((i) => (i + 1) % QUOTES.length);

  return (
    <button
      onClick={next}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
      onFocus={() => { paused.current = true; }}
      onBlur={() => { paused.current = false; }}
      className="text-center max-w-lg mx-auto group select-none"
      aria-label={`Chai quote ${index + 1} of ${QUOTES.length} — click for next`}
      tabIndex={0}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="font-devanagari text-lg md:text-xl leading-relaxed"
            style={{ color: 'var(--chai-cream)', opacity: 0.9 }}
          >
            {QUOTES[index].hindi}
          </p>
          {/* <p
            className="font-ui text-xs mt-2 tracking-widest uppercase"
            style={{ color: 'var(--chai-warm)', opacity: 0.6 }}
          >
            {QUOTES[index].english}
          </p> */}
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      {/* <div className="flex justify-center gap-1.5 mt-4" aria-hidden="true">
        {QUOTES.map((_, i) => (
          <span
            key={i}
            className="w-1 h-1 rounded-full transition-all duration-300"
            style={{
              background: i === index ? 'var(--chai-warm)' : 'rgba(245,230,208,0.25)',
              transform: i === index ? 'scale(1.5)' : 'scale(1)',
            }}
          />
        ))}
      </div> */}
    </button>
  );
}
