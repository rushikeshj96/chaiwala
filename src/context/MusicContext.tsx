import { createContext, useContext } from 'react';
import { useSpotifyPlayer, type SpotifyPlayerState } from '../hooks/useSpotifyPlayer';

const MusicContext = createContext<SpotifyPlayerState | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const player = useSpotifyPlayer();
  return <MusicContext.Provider value={player}>{children}</MusicContext.Provider>;
}

export function useMusicContext(): SpotifyPlayerState {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusicContext must be used inside MusicProvider');
  return ctx;
}

