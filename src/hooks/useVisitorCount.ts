import { useState, useEffect } from 'react';
import { visitorService } from '../services/visitorService';

export function useVisitorCount() {
  const [count, setCount] = useState(visitorService.getCurrentCount());
  const [prevCount, setPrevCount] = useState(visitorService.getCurrentCount());
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const unsub = visitorService.subscribe((newCount) => {
      setPrevCount(count);
      setCount(newCount);
      setIsAnimating(true);
      const t = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(t);
    });
    return unsub;
  }, [count]);

  return { count, prevCount, isAnimating, isDemo: true };
}
