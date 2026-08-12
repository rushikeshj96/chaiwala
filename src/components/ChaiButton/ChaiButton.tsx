import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CHAI_PHRASES = [
  'ek cutting do! ☕',
  'ek aur cup! 🫖',
  'special masala chai! ✨',
  'bhaiya, jaldi! ⏰',
  'kadak chai! 💪',
  'chai pe charcha! 🗣️',
];

export function ChaiButton() {
  const [phrase, setPhrase] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  const handleClick = () => {
    const next = CHAI_PHRASES[Math.floor(Math.random() * CHAI_PHRASES.length)];
    setPhrase(next);
    setKey((k) => k + 1);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleClick}
        className="glass-panel rounded-full px-4 py-2 flex items-center gap-2 chai-btn font-body text-sm"
        style={{ color: 'var(--chai-cream)', borderColor: 'rgba(212,136,42,0.3)' }}
        whileTap={{ scale: 0.93 }}
        aria-label="Order chai — interactive button"
      >
        <span className="text-base" aria-hidden="true">☕</span>
        <span className="font-devanagari text-xs" style={{ color: 'var(--chai-warm)' }}>
          एक कटिंग दो
        </span>
      </motion.button>

      <AnimatePresence>
        {phrase && (
          <motion.div
            key={key}
            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 glass-panel rounded-lg px-3 py-1.5 text-xs whitespace-nowrap font-ui"
            style={{ color: 'var(--chai-warm)' }}
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={(def) => {
              if ((def as { opacity?: number }).opacity === 0) setPhrase(null);
            }}
          >
            {phrase}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
