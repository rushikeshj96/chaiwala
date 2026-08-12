import { motion } from 'framer-motion';

import { SPOTIFY_PLAYLIST_URL } from '../../config/spotify';
import ytMusicIcon from '../../assets/yt-music.png';

export function ChaiSpotifyButton() {
  return (
    <motion.a
      href={SPOTIFY_PLAYLIST_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 flex items-center justify-center rounded-2xl glass-panel group"
      style={{
        top: 'calc(16px + env(safe-area-inset-top))',
        right: 'calc(16px + env(safe-area-inset-right))',
        width: '48px',
        height: '48px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        border: '1px solid rgba(212,136,42,0.25)',
        textDecoration: 'none',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, type: 'spring' }}
      whileHover={{ scale: 1.08, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Open Chai Wala playlist on YouTube Music"
      title="Open Playlist on YouTube Music"
    >
      <span
        className="transition-transform duration-300 group-hover:drop-shadow-[0_0_12px_rgba(212,136,42,0.8)] flex items-center justify-center text-[var(--chai-warm)]"
        aria-hidden="true"
        style={{ transform: 'translateY(1px)' }}
      >
        <img src={ytMusicIcon} alt="YouTube Music" width={26} height={26} className="object-contain" />
      </span>

      {/* Tooltip on desktop */}
      <div className="absolute right-[calc(100%+12px)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
        <div
          className="whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-ui font-medium"
          style={{
            background: 'rgba(18, 8, 3, 0.9)',
            color: 'var(--chai-cream)',
            border: '1px solid rgba(212,136,42,0.2)',
          }}
        >
          Open Playlist on YT Music
        </div>
      </div>
    </motion.a>
  );
}
