'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchIntensity?: 'low' | 'medium' | 'high';
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
}

export function GlitchText({
  text,
  className = '',
  glitchIntensity = 'medium',
  as: Component = 'h1',
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  // Random glitch trigger
  useEffect(() => {
    const intensityMap = {
      low: { interval: 8000, duration: 150 },
      medium: { interval: 5000, duration: 200 },
      high: { interval: 3000, duration: 300 },
    };

    const { interval, duration } = intensityMap[glitchIntensity];

    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), duration);
    }, interval);

    // Initial glitch
    setTimeout(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), duration);
    }, 1000);

    return () => clearInterval(glitchInterval);
  }, [glitchIntensity]);

  return (
    <Component
      className={`relative inline-block ${className}`}
      data-text={text}
    >
      {/* Base text */}
      <span className="relative z-10">{text}</span>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          {/* Cyan layer */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              x: [0, -3, 2, -1, 0],
              clipPath: [
                'inset(0 0 90% 0)',
                'inset(20% 0 60% 0)',
                'inset(40% 0 30% 0)',
                'inset(70% 0 10% 0)',
                'inset(0 0 90% 0)',
              ],
            }}
            transition={{ duration: 0.2, ease: 'linear' }}
            className="absolute inset-0 text-[#00FFF9] z-20 pointer-events-none"
            style={{ textShadow: '2px 0 #00FFF9' }}
            aria-hidden
          >
            {text}
          </motion.span>

          {/* Magenta layer */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              x: [0, 3, -2, 1, 0],
              clipPath: [
                'inset(80% 0 0 0)',
                'inset(50% 0 20% 0)',
                'inset(20% 0 50% 0)',
                'inset(5% 0 80% 0)',
                'inset(80% 0 0 0)',
              ],
            }}
            transition={{ duration: 0.2, ease: 'linear', delay: 0.05 }}
            className="absolute inset-0 text-[#FF00C1] z-20 pointer-events-none"
            style={{ textShadow: '-2px 0 #FF00C1' }}
            aria-hidden
          >
            {text}
          </motion.span>
        </>
      )}

      <style jsx>{`
        @keyframes glitch-skew {
          0%, 100% { transform: skew(0deg); }
          20% { transform: skew(-0.5deg); }
          40% { transform: skew(0.5deg); }
          60% { transform: skew(-0.3deg); }
          80% { transform: skew(0.3deg); }
        }
      `}</style>
    </Component>
  );
}
