// GlitchText - Cyberpunk glitch effect for text
// Ported from Substance UI patterns

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils';

const glitchVariants = cva(
  [
    'relative inline-block',
    'font-serif font-semibold',
  ],
  {
    variants: {
      size: {
        sm: 'text-lg',
        md: 'text-2xl',
        lg: 'text-4xl',
        xl: 'text-6xl',
      },
      variant: {
        yellow: 'text-spinoza-yellow',
        white: 'text-white',
        indigo: 'text-spinoza-indigo',
      },
      glow: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { variant: 'yellow', glow: true, className: 'text-glow' },
      { variant: 'indigo', glow: true, className: 'text-glow-indigo' },
    ],
    defaultVariants: {
      size: 'md',
      variant: 'yellow',
      glow: false,
    },
  }
);

export interface GlitchTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof glitchVariants> {
  /** Text content */
  children: string;
  /** Enable glitch effect on hover */
  glitchOnHover?: boolean;
  /** Always show glitch effect */
  alwaysGlitch?: boolean;
  /** Enable RGB split effect */
  rgbSplit?: boolean;
}

export function GlitchText({
  children,
  size,
  variant,
  glow,
  glitchOnHover = true,
  alwaysGlitch = false,
  rgbSplit = true,
  className,
  ...props
}: GlitchTextProps) {
  const [isHovering, setIsHovering] = React.useState(false);
  const shouldGlitch = alwaysGlitch || (glitchOnHover && isHovering);

  // Respect reduced motion preference
  const prefersReducedMotion = React.useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  if (prefersReducedMotion) {
    return (
      <span className={cn(glitchVariants({ size, variant, glow, className }))} {...props}>
        {children}
      </span>
    );
  }

  return (
    <span
      className={cn(
        glitchVariants({ size, variant, glow, className }),
        'glitch-wrapper cursor-default select-none'
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      {/* Base text */}
      <span className="relative z-10">{children}</span>

      {/* RGB Split layers */}
      <AnimatePresence>
        {shouldGlitch && rgbSplit && (
          <>
            {/* Cyan layer */}
            <motion.span
              initial={{ opacity: 0, x: 0 }}
              animate={{
                opacity: 0.8,
                x: [-2, 2, -1, 1, 0],
              }}
              exit={{ opacity: 0, x: 0 }}
              transition={{
                duration: 0.15,
                repeat: Infinity,
                repeatType: 'mirror',
              }}
              className="absolute inset-0 text-glitch-cyan mix-blend-screen"
              style={{ clipPath: 'inset(0 0 50% 0)' }}
              aria-hidden="true"
            >
              {children}
            </motion.span>

            {/* Magenta layer */}
            <motion.span
              initial={{ opacity: 0, x: 0 }}
              animate={{
                opacity: 0.8,
                x: [2, -2, 1, -1, 0],
              }}
              exit={{ opacity: 0, x: 0 }}
              transition={{
                duration: 0.15,
                repeat: Infinity,
                repeatType: 'mirror',
                delay: 0.05,
              }}
              className="absolute inset-0 text-glitch-magenta mix-blend-screen"
              style={{ clipPath: 'inset(50% 0 0 0)' }}
              aria-hidden="true"
            >
              {children}
            </motion.span>
          </>
        )}
      </AnimatePresence>

      {/* Glitch line */}
      <AnimatePresence>
        {shouldGlitch && (
          <motion.span
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: [0, 1, 0.5, 1, 0],
              opacity: [0, 1, 0.5, 1, 0],
            }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
            className="absolute left-0 right-0 h-px bg-spinoza-yellow"
            style={{ top: '50%' }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </span>
  );
}

export { glitchVariants };
