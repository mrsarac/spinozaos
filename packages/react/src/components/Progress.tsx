import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { SPRING } from '@spinozaos/motion';
import { cn } from '../utils';

// Progress Bar
const progressTrackVariants = cva(
  [
    'w-full rounded-full overflow-hidden',
    'bg-white/10',
  ],
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const progressBarVariants = cva(
  [
    'h-full rounded-full',
  ],
  {
    variants: {
      variant: {
        default: 'bg-gold',
        oracle: 'bg-oracle',
        success: 'bg-status-success',
        error: 'bg-status-error',
        gradient: 'bg-gradient-to-r from-gold to-oracle',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ProgressProps
  extends VariantProps<typeof progressTrackVariants>,
    VariantProps<typeof progressBarVariants> {
  value?: number;
  max?: number;
  showValue?: boolean;
  label?: string;
  className?: string;
  animated?: boolean;
  indeterminate?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      showValue,
      label,
      size,
      variant,
      className,
      animated = true,
      indeterminate,
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div ref={ref} className={cn('w-full', className)}>
        {(label || showValue) && (
          <div className="flex justify-between items-center mb-2">
            {label && (
              <span className="text-sm text-white/80">{label}</span>
            )}
            {showValue && !indeterminate && (
              <span className="text-sm text-white/60">{Math.round(percentage)}%</span>
            )}
          </div>
        )}
        <div className={progressTrackVariants({ size })}>
          {indeterminate ? (
            <motion.div
              className={cn(progressBarVariants({ variant }), 'w-1/3')}
              animate={{
                x: ['-100%', '400%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ) : (
            <motion.div
              className={progressBarVariants({ variant })}
              initial={animated ? { width: 0 } : undefined}
              animate={{ width: `${percentage}%` }}
              transition={SPRING.soft}
            />
          )}
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';

// Spinner
const spinnerVariants = cva(
  [
    'animate-spin',
    'rounded-full',
    'border-2 border-transparent',
  ],
  {
    variants: {
      size: {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12',
      },
      variant: {
        default: 'border-t-gold border-r-gold/30',
        oracle: 'border-t-oracle border-r-oracle/30',
        white: 'border-t-white border-r-white/30',
        success: 'border-t-status-success border-r-status-success/30',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

export interface SpinnerProps
  extends VariantProps<typeof spinnerVariants> {
  label?: string;
  className?: string;
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size, variant, label, className }, ref) => {
    return (
      <div ref={ref} className={cn('inline-flex items-center gap-2', className)}>
        <div className={spinnerVariants({ size, variant })} />
        {label && (
          <span className="text-sm text-white/60">{label}</span>
        )}
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';

// Loading Dots
export interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'oracle' | 'white';
  className?: string;
}

const LoadingDots = React.forwardRef<HTMLDivElement, LoadingDotsProps>(
  ({ size = 'md', variant = 'default', className }, ref) => {
    const dotSize = {
      sm: 'w-1.5 h-1.5',
      md: 'w-2 h-2',
      lg: 'w-3 h-3',
    }[size];

    const dotColor = {
      default: 'bg-gold',
      oracle: 'bg-oracle',
      white: 'bg-white',
    }[variant];

    return (
      <div ref={ref} className={cn('flex items-center gap-1', className)}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={cn('rounded-full', dotSize, dotColor)}
            animate={{
              y: ['0%', '-50%', '0%'],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    );
  }
);

LoadingDots.displayName = 'LoadingDots';

// Skeleton
export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  className?: string;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ width, height, rounded = 'md', className }, ref) => {
    const roundedClass = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    }[rounded];

    return (
      <div
        ref={ref}
        className={cn(
          'bg-white/10 animate-pulse',
          roundedClass,
          className
        )}
        style={{ width, height }}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export {
  Progress,
  progressTrackVariants,
  progressBarVariants,
  Spinner,
  spinnerVariants,
  LoadingDots,
  Skeleton,
};
