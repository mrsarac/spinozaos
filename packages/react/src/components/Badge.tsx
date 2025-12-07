import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { SPRING, MICRO } from '@spinozaos/motion';
import { cn } from '../utils';

const badgeVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center',
    'font-mono text-xs font-medium uppercase tracking-wider',
    'rounded-full',
    'transition-colors',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-void-lighter text-neutral-300',
          'border border-white/10',
        ],
        primary: [
          'bg-spinoza-yellow/10 text-spinoza-yellow',
          'border border-spinoza-yellow/20',
        ],
        success: [
          'bg-success/10 text-success',
          'border border-success/20',
        ],
        error: [
          'bg-error/10 text-error',
          'border border-error/20',
        ],
        warning: [
          'bg-warning/10 text-warning',
          'border border-warning/20',
        ],
        info: [
          'bg-info/10 text-info',
          'border border-info/20',
        ],
        oracle: [
          'bg-oracle-purple/10 text-oracle-purple',
          'border border-oracle-purple/20',
        ],
        solid: [
          'bg-spinoza-yellow text-void',
        ],
      },
      size: {
        sm: 'h-5 px-2 text-[10px]',
        md: 'h-6 px-2.5 text-xs',
        lg: 'h-7 px-3 text-xs',
      },
      animated: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      animated: false,
    },
  }
);

export interface BadgeProps
  extends Omit<HTMLMotionProps<'span'>, 'children'>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  dot?: boolean;
  pulse?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, animated, children, dot, pulse, ...props }, ref) => {
    return (
      <motion.span
        className={cn(badgeVariants({ variant, size, animated, className }))}
        ref={ref}
        initial={animated ? { scale: 0.8, opacity: 0 } : undefined}
        animate={animated ? { scale: 1, opacity: 1 } : undefined}
        whileHover={animated ? MICRO.hover.scale : undefined}
        transition={SPRING.bouncy}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'w-1.5 h-1.5 rounded-full mr-1.5',
              variant === 'success' && 'bg-success',
              variant === 'error' && 'bg-error',
              variant === 'warning' && 'bg-warning',
              variant === 'info' && 'bg-info',
              variant === 'primary' && 'bg-spinoza-yellow',
              variant === 'oracle' && 'bg-oracle-purple',
              variant === 'default' && 'bg-neutral-400',
              variant === 'solid' && 'bg-void',
              pulse && 'animate-pulse'
            )}
          />
        )}
        {children}
      </motion.span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
