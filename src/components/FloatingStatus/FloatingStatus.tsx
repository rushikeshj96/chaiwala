import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useVisitorCount } from '../../hooks/useVisitorCount';
import { useChaiTimerContext } from '../../context/ChaiTimerContext';

interface Props {
  currentSongTitle?: string;
  currentArtist?: string;
  isPlaying?: boolean;
}

export function FloatingStatus({ currentSongTitle, currentArtist, isPlaying }: Props) {
  const { count } = useVisitorCount();
  const { formattedTime, timerState } = useChaiTimerContext();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed right-4 sm:right-6 md:right-8 bottom-28 z-40 hidden md:block">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="glass-panel rounded-2xl p-4 w-48 mb-2"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Visitors */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base" aria-hidden="true">☕</span>
              <div>
                <p className="text-xs opacity-50 font-ui uppercase tracking-widest" style={{ color: 'var(--chai-cream)' }}>Chai Lovers</p>
                <p className="font-bold font-ui" style={{ color: 'var(--chai-warm)' }}>{count} Online</p>
              </div>
            </div>

            <div className="h-px mb-3" style={{ background: 'rgba(212,136,42,0.15)' }} />

            {/* Timer */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base" aria-hidden="true">⏱</span>
              <div>
                <p className="text-xs opacity-50 font-ui uppercase tracking-widest" style={{ color: 'var(--chai-cream)' }}>Chai Timer</p>
                <p
                  className="font-bold font-ui tabular-nums"
                  style={{ color: timerState === 'done' ? 'var(--chai-warm)' : 'var(--chai-cream)' }}
                >
                  {timerState === 'done' ? '☕ Ready!' : formattedTime}
                </p>
              </div>
            </div>

            {/* Now playing */}
            {currentSongTitle && (
              <>
                <div className="h-px mb-3" style={{ background: 'rgba(212,136,42,0.15)' }} />
                <div className="flex items-center gap-2">
                  <span className="text-base flex-shrink-0" aria-hidden="true">🎵</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      {/* <p className="text-xs opacity-50 font-ui uppercase tracking-widest" style={{ color: 'var(--chai-cream)' }}>
                        Now Playing
                      </p> */}
                      {isPlaying && (
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot flex-shrink-0" aria-hidden="true" />
                      )}
                    </div>
                    <p className="text-xs font-medium truncate font-devanagari" style={{ color: 'var(--chai-cream)' }}>
                      {currentSongTitle}
                    </p>
                    {currentArtist && (
                      <p className="text-[10px] truncate opacity-45 font-ui mt-0.5" style={{ color: 'var(--chai-cream)' }}>
                        {currentArtist}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="glass-panel rounded-full p-2 flex items-center justify-center w-full"
        style={{ color: 'var(--chai-warm)' }}
        aria-label={isOpen ? 'Collapse status panel' : 'Expand status panel'}
        aria-expanded={isOpen}
      >
        {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>
    </div>
  );
}
