import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { SPRING } from '@spinozaos/motion';
import { cn } from '../utils';

const inputVariants = cva(
  // Base styles
  [
    'w-full rounded-lg',
    'bg-void-light text-white',
    'border border-white/10',
    'placeholder:text-neutral-500',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-spinoza-yellow/50 focus:border-spinoza-yellow',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: [
          'hover:border-white/20',
        ],
        ghost: [
          'bg-transparent border-transparent',
          'hover:bg-white/5',
          'focus:bg-void-light',
        ],
        glass: [
          'bg-white/5 backdrop-blur-sm',
          'border-white/10',
          'hover:bg-white/8',
        ],
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-4 text-base',
      },
      state: {
        default: '',
        error: [
          'border-error focus:ring-error/50 focus:border-error',
        ],
        success: [
          'border-success focus:ring-success/50 focus:border-success',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
    },
  }
);

const labelVariants = cva(
  'block text-sm font-medium mb-1.5',
  {
    variants: {
      state: {
        default: 'text-neutral-300',
        error: 'text-error',
        success: 'text-success',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

const helperTextVariants = cva(
  'text-xs mt-1.5',
  {
    variants: {
      state: {
        default: 'text-neutral-500',
        error: 'text-error',
        success: 'text-success',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

export interface InputProps
  extends Omit<HTMLMotionProps<'input'>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  id?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    variant,
    size,
    state,
    label,
    helperText,
    leftIcon,
    rightIcon,
    id,
    ...props
  }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const isInvalid = state === 'error';

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className={labelVariants({ state })}>
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {leftIcon}
            </div>
          )}
          <motion.input
            id={inputId}
            className={cn(
              inputVariants({ variant, size, state, className }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10'
            )}
            ref={ref}
            aria-invalid={isInvalid || undefined}
            aria-describedby={helperId}
            whileFocus={{ scale: 1.01 }}
            transition={SPRING.tight}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {rightIcon}
            </div>
          )}
        </div>
        {helperText && (
          <p id={helperId} className={helperTextVariants({ state })}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };
