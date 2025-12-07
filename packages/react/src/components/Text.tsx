import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

const textVariants = cva('', {
  variants: {
    variant: {
      display: 'font-serif text-6xl font-semibold tracking-tighter text-white',
      h1: 'font-serif text-4xl font-semibold tracking-tight text-white',
      h2: 'font-sans text-2xl font-semibold text-white',
      h3: 'font-sans text-xl font-semibold text-white',
      body: 'font-sans text-base text-neutral-400',
      label: 'font-mono text-xs uppercase tracking-wider text-neutral-500',
      data: 'font-mono text-5xl font-normal text-spinoza-yellow',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  children: React.ReactNode;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, variant, as, children, ...props }, ref) => {
    // Map variant to default element
    const defaultElement = {
      display: 'h1',
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      body: 'p',
      label: 'span',
      data: 'span',
    } as const;

    const Component = as || defaultElement[variant || 'body'] || 'span';

    return React.createElement(
      Component,
      {
        className: cn(textVariants({ variant, className })),
        ref,
        ...props,
      },
      children
    );
  }
);

Text.displayName = 'Text';

export { Text, textVariants };
