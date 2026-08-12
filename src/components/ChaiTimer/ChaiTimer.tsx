import { motion, AnimatePresence } from 'framer-motion';
import { useChaiTimerContext } from '../../context/ChaiTimerContext';

export function ChaiTimer() {
  const {
    formattedTime,
    timerState,
    presets,
    presetIndex,
    progress,
    start,
    pause,
    reset,
    selectPreset,
  } = useChaiTimerContext();

  const isDone = timerState === 'done';
  const isRunning = timerState === 'running';
  const isPaused = timerState === 'paused';

  return (
    <div className="glass-panel rounded-2xl p-4 w-52 select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-ui tracking-widest uppercase" style={{ color: 'var(--chai-warm)', opacity: 0.8 }}>
          ☕ Chai Timer
        </span>
        <button
          onClick={reset}
          className="text-xs opacity-40 hover:opacity-70 transition-opacity font-ui"
          style={{ color: 'var(--chai-cream)' }}
          aria-label="Reset chai timer"
        >
          reset
        </button>
      </div>

      {/* Time Display */}
      <AnimatePresence mode="wait">
        {isDone ? (
          <motion.div
            key="done"
            className="text-center py-1"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ animation: 'timer-done-bounce 0.6s ease' }}
          >
            <p className="font-devanagari text-base leading-tight" style={{ color: 'var(--chai-warm)' }}>
              चाय तैयार है!
            </p>
            <p className="text-2xl mt-0.5">☕</p>
          </motion.div>
        ) : (
          <motion.div
            key="timer"
            className="text-center py-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p
              className="font-ui font-bold text-4xl tabular-nums tracking-tight"
              style={{ color: isDone ? 'var(--chai-warm)' : 'var(--chai-cream)' }}
            >
              {formattedTime}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Ring */}
      {!isDone && (
        <div className="relative mx-auto w-full h-1 mt-2 mb-3 rounded-full overflow-hidden" style={{ background: 'rgba(245,230,208,0.1)' }}>
          <div
            className="absolute left-0 top-0 h-full rounded-full transition-all duration-1000"
            style={{
              width: `${progress * 100}%`,
              background: `linear-gradient(90deg, var(--chai-brown), var(--chai-warm))`,
            }}
          />
        </div>
      )}

      {/* Preset Buttons */}
      <div className="grid grid-cols-2 gap-1 mb-3">
        {presets.map((p, i) => (
          <button
            key={i}
            onClick={() => selectPreset(i)}
            className="text-xs px-2 py-1 rounded-lg transition-all duration-200 font-devanagari"
            style={{
              background: i === presetIndex ? 'rgba(212,136,42,0.25)' : 'rgba(245,230,208,0.07)',
              color: i === presetIndex ? 'var(--chai-warm)' : 'rgba(245,230,208,0.5)',
              border: `1px solid ${i === presetIndex ? 'rgba(212,136,42,0.4)' : 'transparent'}`,
            }}
            aria-label={`Set timer to ${p.labelEn}`}
            aria-pressed={i === presetIndex}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        {isDone ? (
          <button
            onClick={reset}
            className="flex-1 py-2 rounded-xl text-sm font-ui chai-btn"
            style={{ background: 'rgba(212,136,42,0.2)', color: 'var(--chai-warm)', border: '1px solid rgba(212,136,42,0.3)' }}
          >
            फिर से ☕
          </button>
        ) : (
          <>
            <button
              onClick={isRunning ? pause : start}
              className="flex-1 py-2 rounded-xl text-sm font-ui chai-btn"
              style={{ background: 'var(--chai-warm)', color: 'var(--chai-dark)' }}
              aria-label={isRunning ? 'Pause chai timer' : 'Start chai timer'}
            >
              {isRunning ? '⏸ रोको' : isPaused ? '▶ जारी' : '▶ शुरू'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
