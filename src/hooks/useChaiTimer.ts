import { useState, useRef, useCallback, useEffect } from 'react';
import { SITE_CONFIG } from '../config/site';

export type TimerState = 'idle' | 'running' | 'paused' | 'done';

export interface ChaiTimerState {
  remaining: number;      // seconds left
  total: number;          // total seconds for current preset
  timerState: TimerState;
  presetIndex: number;
  presets: typeof SITE_CONFIG.timerPresets;
  start: () => void;
  pause: () => void;
  reset: () => void;
  selectPreset: (index: number) => void;
  formattedTime: string;
  progress: number; // 0 → 1
}

export function useChaiTimer(): ChaiTimerState {
  const presets = SITE_CONFIG.timerPresets;
  const [presetIndex, setPresetIndex] = useState(1); // default: 3:30
  const [remaining, setRemaining] = useState(presets[1].seconds);
  const [total, setTotal] = useState(presets[1].seconds);
  const [timerState, setTimerState] = useState<TimerState>('idle');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    setTimerState('running');
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearTimer();
          setTimerState('done');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer]);

  const pause = useCallback(() => {
    clearTimer();
    setTimerState('paused');
  }, [clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    const secs = presets[presetIndex].seconds;
    setRemaining(secs);
    setTotal(secs);
    setTimerState('idle');
  }, [clearTimer, presets, presetIndex]);

  const selectPreset = useCallback((index: number) => {
    clearTimer();
    setPresetIndex(index);
    const secs = presets[index].seconds;
    setRemaining(secs);
    setTotal(secs);
    setTimerState('idle');
  }, [clearTimer, presets]);

  // Cleanup on unmount
  useEffect(() => () => clearTimer(), [clearTimer]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');
  const formattedTime = `${mm}:${ss}`;
  const progress = total > 0 ? 1 - remaining / total : 0;

  return {
    remaining,
    total,
    timerState,
    presetIndex,
    presets,
    start,
    pause,
    reset,
    selectPreset,
    formattedTime,
    progress,
  };
}
