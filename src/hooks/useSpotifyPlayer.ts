import { useState, useEffect, useCallback } from 'react';
import { spotifyService, type PlaybackState } from '../services/spotifyService';

export interface SpotifyPlayerState extends PlaybackState {
  isReady: boolean;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  seekToRatio: (ratio: number) => void;
  next: () => void;
  previous: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

export function useSpotifyPlayer(): SpotifyPlayerState {
  const [playbackState, setPlaybackState] = useState<PlaybackState>({
    isPaused: true,
    isBuffering: false,
    position: 0,
    duration: 0,
    track: null,
    volume: 100,
    isMuted: false
  });
  
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    spotifyService.loadApi();

    const unsubReady = spotifyService.onReady(() => {
      setIsReady(true);
      // Initialize with whatever state service has
      setPlaybackState(spotifyService.getCurrentState());
    });

    const unsubState = spotifyService.onStateChange((state) => {
      setPlaybackState(state);
    });

    return () => {
      unsubReady();
      unsubState();
    };
  }, []);

  const play = useCallback(() => {
    spotifyService.play();
  }, []);

  const pause = useCallback(() => {
    spotifyService.pause();
  }, []);

  const togglePlay = useCallback(() => {
    spotifyService.togglePlay();
  }, []);

  const seekToRatio = useCallback((ratio: number) => {
    // Spotify duration is in milliseconds, seek expects seconds
    const durationSecs = (playbackState.duration || 0) / 1000;
    const targetSecs = ratio * durationSecs;
    spotifyService.seekTo(targetSecs);
  }, [playbackState.duration]);

  const next = useCallback(() => {
    spotifyService.next();
  }, []);

  const previous = useCallback(() => {
    spotifyService.previous();
  }, []);

  const setVolume = useCallback((volume: number) => {
    spotifyService.setVolume(volume);
  }, []);

  const toggleMute = useCallback(() => {
    spotifyService.toggleMute();
  }, []);

  return {
    ...playbackState,
    isReady,
    play,
    pause,
    togglePlay,
    seekToRatio,
    next,
    previous,
    setVolume,
    toggleMute
  };
}
