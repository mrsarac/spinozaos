import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { SPRING, MICRO, VARIANTS } from '@spinozaos/motion';
import { cn } from '../utils';

const cardVariants = cva(
  [
    'relative overflow-hidden',
    'bg-void-light border border-white/5',
    'transition-colors',
  ],
  {
    variants: {
      variant: {
        default: '',
        glass: [
          'bg-white/3 backdrop-blur-xl',
          'border-white/5',
        ],
        elevated: [
          'bg-void-lighter',
          'border-white/10',
        ],
        interactive: [
          'cursor-pointer',
          'hover:border-spinoza-yellow/30',
        ],
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

export interface CardProps
  extends Omit<HTMLMotionProps<'div'>, 'children'>,
    VariantProps<typeof cardVariants> {
  children: React.ReactNode;
  animate?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, animate = true, children, ...props }, ref) => {
    const isInteractive = variant === 'interactive';

    return (
      <motion.div
        className={cn(cardVariants({ variant, padding, className }))}
        ref={ref}
        initial={animate ? VARIANTS.fadeInUp.initial : undefined}
        animate={animate ? VARIANTS.fadeInUp.animate : undefined}
        whileHover={isInteractive ? MICRO.hover.lift : undefined}
        transition={SPRING.soft}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export { Card, cardVariants };
