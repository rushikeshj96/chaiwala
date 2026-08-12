import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const STORAGE_KEY = 'chaiwala_user_liked';
const BASE_COUNT = 0;

export function LikeButton() {
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState(BASE_COUNT);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if user has liked before
    const liked = localStorage.getItem(STORAGE_KEY) === 'true';
    if (liked) {
      setHasLiked(true);
      setLikes(BASE_COUNT + 1); // Add the user's like
    }
  }, []);

  const handleLike = () => {
    if (hasLiked) return;
    
    // Optimistic UI update
    setHasLiked(true);
    setLikes((prev) => prev + 1);
    setIsAnimating(true);
    localStorage.setItem(STORAGE_KEY, 'true');
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      <span className="font-ui text-xs tracking-widest uppercase opacity-70" style={{ color: 'var(--chai-cream)' }}>
        Chai Lovers Click Here
      </span>
      
      <button
        onClick={handleLike}
        disabled={hasLiked}
        className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 disabled:opacity-80 disabled:cursor-default group"
        style={{ 
          background: 'var(--chai-warm)',
          border: '1px solid rgba(245, 230, 208, 0.2)', // chai-cream with low opacity
          boxShadow: hasLiked ? 'none' : '0 4px 12px rgba(212,136,42,0.3)'
        }}
        aria-label="Like Chai Wala"
      >
        <div className="relative flex items-center justify-center">
          <Heart 
            size={18} 
            className="transition-colors duration-300 fill-transparent group-hover:fill-[var(--chai-cream)]"
            style={{ 
              color: 'var(--chai-cream)',
              ...(hasLiked && { fill: 'var(--chai-cream)' })
            }}
          />
          <AnimatePresence>
            {isAnimating && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 2.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Heart size={18} className="fill-[var(--chai-cream)] text-[var(--chai-cream)]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <span 
          className="font-ui text-sm tabular-nums font-semibold transition-colors duration-300"
          style={{ color: 'var(--chai-cream)' }}
        >
          {likes.toLocaleString()}
        </span>
      </button>
    </div>
  );
}
