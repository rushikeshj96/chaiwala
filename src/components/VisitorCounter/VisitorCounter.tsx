import { useVisitorCount } from '../../hooks/useVisitorCount';

export function VisitorCounter() {
  const { count, isAnimating } = useVisitorCount();

  return (
    <div
      className="flex items-center gap-2 font-ui"
      aria-live="polite"
      aria-label={`${count} chai lovers online`}
    >
      {/* Pulsing green dot */}
      <span
        className="inline-block w-2 h-2 rounded-full bg-green-400 pulse-dot flex-shrink-0"
        aria-hidden="true"
      />

      <span
        className="text-sm font-medium tracking-wide flex items-center gap-1.5"
        style={{ color: 'var(--chai-cream)' }}
      >
        <span
          className="font-bold tabular-nums transition-all duration-300"
          style={{
            animation: isAnimating ? 'count-flash 0.6s ease' : 'none',
            color: 'var(--chai-warm)',
          }}
        >
          {count}
        </span>
        <span className="opacity-80 hidden xs:inline sm:inline">Chai Lovers Online</span>
        {/* {isDemo && (
          <span className="text-xs opacity-40 tracking-widest hidden sm:inline">(demo)</span>
        )} */}
      </span>
    </div>
  );
}
