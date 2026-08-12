import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume1, Volume2, VolumeX } from 'lucide-react';
import { useMusicContext } from '../../context/MusicContext';

function formatTime(secs: number): string {
  if (!secs || !isFinite(secs)) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function SongCover({ url, title, size = 44 }: { url?: string; title: string; size?: number }) {
  if (!url) {
    return <TrackArtwork title={title} size={size} />;
  }

  return (
    <img
      src={url}
      alt={title}
      width={size}
      height={size}
      className="rounded-xl object-cover flex-shrink-0"
      style={{
        width: size,
        height: size,
        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
      }}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
}

/** Generative colour avatar from track title */
function TrackArtwork({ title, size = 40 }: { title: string; size?: number }) {
  const palettes = [
    ['#5c3a1e', '#d4882a'],
    ['#2d5016', '#8fbb4a'],
    ['#1e3a5c', '#4a8bbb'],
    ['#5c1e3a', '#bb4a8f'],
    ['#3a1e5c', '#8b4abb'],
    ['#5c1e1e', '#bb4a4a'],
    ['#1e4a3a', '#4abb8b'],
    ['#4a3a1e', '#bb8f4a'],
  ];
  const char = title ? title[0].toUpperCase() : 'S';
  const [bg, fg] = palettes[char.charCodeAt(0) % palettes.length] || palettes[0];

  return (
    <div
      className="rounded-xl flex items-center justify-center font-devanagari font-bold flex-shrink-0 select-none"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${bg}, ${fg})`,
        color: 'rgba(255,255,255,0.92)',
        fontSize: size * 0.38,
        boxShadow: `0 4px 16px rgba(0,0,0,0.4)`,
      }}
      aria-hidden="true"
    >
      {char}
    </div>
  );
}

/** Now Playing banner above the player pill */
export function NowPlayingBanner({
  trackName,
  artistName,
  albumArtUrl,
  isPlaying,
}: {
  trackName: string;
  artistName: string;
  albumArtUrl?: string;
  isPlaying: boolean;
}) {
  return (
    <motion.div
      className="mb-3 flex items-center gap-3 rounded-2xl px-4 py-3"
      style={{
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(24px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.4 }}
      role="status"
      aria-live="polite"
      aria-label={`Now playing: ${trackName} by ${artistName}`}
    >
      <SongCover url={albumArtUrl} title={trackName} size={48} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {isPlaying && (
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot flex-shrink-0" aria-hidden="true" />
          )}
          <p className="text-[10px] font-ui uppercase tracking-widest opacity-70" style={{ color: 'var(--chai-cream)' }}>
            Now Playing
          </p>
        </div>
        <p className="text-sm font-semibold truncate font-devanagari leading-tight mt-0.5" style={{ color: 'var(--chai-cream)' }}>
          {trackName}
        </p>
        <p className="text-xs truncate opacity-70 font-ui mt-0.5" style={{ color: 'var(--chai-cream)' }}>
          {artistName}
        </p>
      </div>
    </motion.div>
  );
}

export function MusicPlayer() {
  const player = useMusicContext();
  const seekBarRef = useRef<HTMLDivElement>(null);
  const volumeBarRef = useRef<HTMLDivElement>(null);

  const currentTimeSecs = player.position / 1000;
  const durationSecs = player.duration / 1000;
  const progressRatio = durationSecs > 0 ? currentTimeSecs / durationSecs : 0;

  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!seekBarRef.current) return;
    const rect = seekBarRef.current.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    player.seekToRatio(Math.max(0, Math.min(1, ratio)));
  };

  const handleVolumeSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeBarRef.current) return;
    const rect = volumeBarRef.current.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    player.setVolume(Math.max(0, Math.min(100, Math.round(ratio * 100))));
  };

  const trackName = player.track?.name || 'Song Name';
  const artistName = player.track?.artists?.map(a => a.name).join(', ') || 'Singer Name';
  const albumArt = player.track?.album?.images?.[0]?.url;

  const VolumeIcon = player.isMuted || player.volume === 0 ? VolumeX : (player.volume < 50 ? Volume1 : Volume2);

  return (
    <div
      className="fixed bottom-4 sm:bottom-6 left-1/2 z-50 w-full max-w-[644px] -translate-x-1/2 px-4 sm:px-6 md:px-8 box-border"
      role="region"
      aria-label="Music player"
    >
      <div className="relative">
        {/* <AnimatePresence>
          <NowPlayingBanner
            key="banner"
            trackName={trackName}
            artistName={artistName}
            albumArtUrl={albumArt}
            isPlaying={!player.isPaused && player.isReady}
          />
        </AnimatePresence> */}

        {/* ── Main floating pill ── */}
        <motion.div
          className="flex items-center rounded-full overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(32px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(32px) saturate(1.8)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: `
              0 12px 40px rgba(0,0,0,0.3),
              inset 0 1px 0 rgba(255,255,255,0.1)
            `,
            minWidth: '100%',
            maxWidth: '100%',
          }}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 24, stiffness: 200, delay: 0.5 }}
        >
          {/* Album art */}
          <div className="pl-3 pr-1 flex-shrink-0">
            <SongCover url={albumArt} title={trackName} size={44} />
          </div>

          {/* Track info + seek */}
          <div className="flex-1 min-w-0 px-3 py-2">
            {!player.isReady ? (
              <p
                className="text-sm font-medium animate-pulse font-devanagari"
                style={{ color: 'var(--chai-warm)' }}
              >
                Brewing the music...
              </p>
            ) : (
              <>
                <p
                  className="text-sm font-semibold truncate font-devanagari leading-tight"
                  style={{ color: 'var(--chai-cream)', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
                >
                  {trackName}
                </p>
                <p
                  className="text-xs truncate opacity-80 font-ui mt-0.5"
                  style={{ color: 'rgba(255,255,255,0.8)' }}
                >
                  {artistName}
                </p>
              </>
            )}

            {/* Seek bar */}
            <div
              ref={seekBarRef}
              className="relative h-1 mt-2 rounded-full group"
              style={{ background: 'rgba(255,255,255,0.15)' }}
              onClick={handleSeekClick}
              role="slider"
              aria-label="Seek"
              aria-valuenow={Math.round(progressRatio * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progressRatio * 100}%`,
                  background: 'white',
                  boxShadow: '0 0 8px rgba(255,255,255,0.6)',
                }}
              />
              {/* Thumb dot */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  left: `calc(${progressRatio * 100}% - 5px)`,
                  background: 'white',
                  boxShadow: '0 0 6px rgba(255,255,255,0.8)',
                }}
              />
            </div>

            {/* Times */}
            <div className="flex justify-between mt-1">
              <span className="text-[10px] font-ui tabular-nums opacity-60" style={{ color: 'white' }}>
                {formatTime(currentTimeSecs)}
              </span>
              <span className="text-[10px] font-ui tabular-nums opacity-60" style={{ color: 'white' }}>
                {formatTime(durationSecs)}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5 px-2 flex-shrink-0">
            {/* Prev */}
            <button
              onClick={player.previous}
              disabled={!player.isReady}
              className="min-w-10 min-h-10 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-white/10 opacity-70 disabled:opacity-30"
              style={{ color: 'white' }}
              aria-label="Previous track"
            >
              <SkipBack size={15} />
            </button>

            {/* Play/Pause — white background */}
            <button
              onClick={player.togglePlay}
              disabled={!player.isReady}
              className="min-w-11 min-h-11 w-11 h-11 flex items-center justify-center rounded-full disabled:opacity-50 mx-0.5"
              style={{
                background: 'white',
                color: 'black',
                boxShadow: '0 4px 16px rgba(255,255,255,0.45)',
              }}
              aria-label={!player.isPaused ? 'Pause' : 'Play'}
            >
              {!player.isPaused
                ? <Pause size={16} fill="currentColor" />
                : <Play size={16} fill="currentColor" className="ml-0.5" />
              }
            </button>

            {/* Next */}
            <button
              onClick={player.next}
              disabled={!player.isReady}
              className="min-w-10 min-h-10 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-white/10 opacity-70 disabled:opacity-30"
              style={{ color: 'white' }}
              aria-label="Next track"
            >
              <SkipForward size={15} />
            </button>
          </div>

          {/* Volume Control (hidden on very small screens, visible on sm and up) */}
          <div className="hidden sm:flex items-center gap-1.5 pr-2 flex-shrink-0">
            <button
              onClick={player.toggleMute}
              disabled={!player.isReady}
              className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-white/10 opacity-70 disabled:opacity-30"
              style={{ color: 'white' }}
              aria-label={player.isMuted ? "Mute" : "Unmute"}
            >
              <VolumeIcon size={14} />
            </button>

            <div
              ref={volumeBarRef}
              className="relative w-16 h-1 rounded-full group"
              style={{ background: 'rgba(255,255,255,0.15)' }}
              onClick={handleVolumeSeekClick}
              role="slider"
              aria-label="Volume"
              aria-valuenow={player.isMuted ? 0 : player.volume}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="absolute left-0 top-0 h-full rounded-full transition-all duration-200"
                style={{
                  width: `${player.isMuted ? 0 : player.volume}%`,
                  background: 'white',
                }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  left: `calc(${player.isMuted ? 0 : player.volume}% - 4px)`,
                  background: 'white',
                  boxShadow: '0 0 4px rgba(255,255,255,0.8)',
                }}
              />
            </div>
          </div>

          {/* Right padding */}
          <div className="w-1.5 sm:w-2" />
        </motion.div>
      </div>
    </div>
  );
}
