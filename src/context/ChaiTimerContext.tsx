import { createContext, useContext } from 'react';
import { useChaiTimer, type ChaiTimerState } from '../hooks/useChaiTimer';

const ChaiTimerContext = createContext<ChaiTimerState | null>(null);

export function ChaiTimerProvider({ children }: { children: React.ReactNode }) {
  const timer = useChaiTimer();
  return <ChaiTimerContext.Provider value={timer}>{children}</ChaiTimerContext.Provider>;
}

export function useChaiTimerContext(): ChaiTimerState {
  const ctx = useContext(ChaiTimerContext);
  if (!ctx) throw new Error('useChaiTimerContext must be inside ChaiTimerProvider');
  return ctx;
}
