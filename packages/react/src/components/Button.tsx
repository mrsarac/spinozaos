import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { SPRING, MICRO } from '@spinozaos/motion';
import { cn } from '../utils';

const buttonVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center',
    'font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spinoza-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-void',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-spinoza-yellow text-void',
          'hover:bg-spinoza-gold',
        ],
        secondary: [
          'bg-void-light text-white',
          'border border-white/10',
          'hover:bg-void-lighter hover:border-white/20',
        ],
        ghost: [
          'bg-transparent text-white',
          'hover:bg-white/5',
        ],
        oracle: [
          'bg-oracle-purple text-white',
          'hover:shadow-glow-oracle',
        ],
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileHover={MICRO.hover.scale}
        whileTap={MICRO.tap.press}
        transition={SPRING.tight}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
