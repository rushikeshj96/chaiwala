/**
 * Visitor Service — Demo Mode
 * Simulates realistic visitor count fluctuations.
 * Replace this with Supabase Realtime when backend is ready:
 *   supabase.channel('presence').subscribe(...)
 */

type Subscriber = (count: number) => void;

const BASE_COUNT = 37;
const MIN_COUNT = 18;
const MAX_COUNT = 89;

class VisitorService {
  private count: number;
  private subscribers: Set<Subscriber> = new Set();
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    // Start at a random-ish base count
    this.count = BASE_COUNT + Math.floor(Math.random() * 12);
  }

  private fluctuate() {
    // Randomly add or subtract 1-2 every 8-15 seconds
    const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
    this.count = Math.max(MIN_COUNT, Math.min(MAX_COUNT, this.count + delta));
    this.notify();
  }

  private notify() {
    this.subscribers.forEach((fn) => fn(this.count));
  }

  subscribe(fn: Subscriber): () => void {
    this.subscribers.add(fn);
    // Immediately emit current count
    fn(this.count);

    // Start fluctuations if not already running
    if (!this.intervalId) {
      this.intervalId = setInterval(
        () => this.fluctuate(),
        8000 + Math.random() * 7000, // 8-15 seconds
      );
    }

    return () => {
      this.subscribers.delete(fn);
      if (this.subscribers.size === 0 && this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    };
  }

  getCurrentCount() {
    return this.count;
  }
}

// Singleton
export const visitorService = new VisitorService();
