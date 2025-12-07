// DecorativeLine - Gradient line decorations
// Extracted from Substance card patterns

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const lineVariants = cva(
  ['block'],
  {
    variants: {
      variant: {
        // Gold → Teal → Purple
        gradient: 'bg-gradient-to-r from-spinoza-yellow via-teal-500 to-purple-500',
        // Purple → Teal → Gold
        gradientReverse: 'bg-gradient-to-r from-purple-500 via-teal-500 to-spinoza-yellow',
        // Single colors
        gold: 'bg-spinoza-yellow',
        oracle: 'bg-purple-500',
        teal: 'bg-teal-500',
        // Semantic
        success: 'bg-green-500',
        error: 'bg-red-500',
        // Subtle
        subtle: 'bg-white/20',
        // Pulsing
        pulse: 'bg-gradient-to-r from-spinoza-yellow via-teal-500 to-purple-500',
      },
      size: {
        xs: 'h-px',
        sm: 'h-0.5',
        md: 'h-1',
        lg: 'h-1.5',
        xl: 'h-2',
      },
      position: {
        top: '',
        bottom: '',
        left: 'h-auto w-px',
        right: 'h-auto w-px',
      },
    },
    compoundVariants: [
      // Vertical line sizes
      { position: 'left', size: 'xs', className: 'w-px' },
      { position: 'left', size: 'sm', className: 'w-0.5' },
      { position: 'left', size: 'md', className: 'w-1' },
      { position: 'left', size: 'lg', className: 'w-1.5' },
      { position: 'left', size: 'xl', className: 'w-2' },
      { position: 'right', size: 'xs', className: 'w-px' },
      { position: 'right', size: 'sm', className: 'w-0.5' },
      { position: 'right', size: 'md', className: 'w-1' },
      { position: 'right', size: 'lg', className: 'w-1.5' },
      { position: 'right', size: 'xl', className: 'w-2' },
    ],
    defaultVariants: {
      variant: 'gradient',
      size: 'sm',
      position: 'top',
    },
  }
);

export interface DecorativeLineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof lineVariants> {
  /** Width (for horizontal lines) */
  width?: string | number;
  /** Height (for vertical lines) */
  height?: string | number;
  /** Animate on mount */
  animated?: boolean;
  /** Animation direction */
  animateFrom?: 'left' | 'right' | 'center';
  /** Glow effect */
  glow?: boolean;
}

export function DecorativeLine({
  variant,
  size,
  position,
  width = '100%',
  height,
  animated = false,
  animateFrom = 'left',
  glow = false,
  className,
  style,
  ...props
}: DecorativeLineProps) {
  const isVertical = position === 'left' || position === 'right';

  const glowStyles: React.CSSProperties = glow
    ? {
        boxShadow:
          variant === 'gradient' || variant === 'gradientReverse'
            ? '0 0 20px rgba(20, 184, 166, 0.5)'
            : variant === 'gold'
            ? '0 0 20px rgba(251, 191, 36, 0.5)'
            : variant === 'oracle'
            ? '0 0 20px rgba(168, 85, 247, 0.5)'
            : variant === 'teal'
            ? '0 0 20px rgba(20, 184, 166, 0.5)'
            : undefined,
      }
    : {};

  // CSS animation classes based on animateFrom direction
  const getAnimationClass = () => {
    if (!animated) return '';
    if (isVertical) return 'animate-[growVertical_0.5s_ease-out]';
    switch (animateFrom) {
      case 'center':
        return 'animate-[growFromCenter_0.5s_ease-out]';
      case 'right':
        return 'animate-[growFromRight_0.5s_ease-out]';
      default:
        return 'animate-[growFromLeft_0.5s_ease-out]';
    }
  };

  const dimensionStyles: React.CSSProperties = {
    width: isVertical ? undefined : width,
    height: isVertical ? height : undefined,
    transformOrigin:
      animateFrom === 'center' ? 'center' : animateFrom === 'right' ? 'right' : 'left',
    ...style,
    ...glowStyles,
  };

  return (
    <div
      className={`${lineVariants({ variant, size, position, className })} ${getAnimationClass()}`}
      style={dimensionStyles}
      {...props}
    />
  );
}

// Preset components for common use cases
export function GradientDivider(props: Omit<DecorativeLineProps, 'variant'>) {
  return <DecorativeLine variant="gradient" {...props} />;
}

export function CardTopLine(props: Omit<DecorativeLineProps, 'variant' | 'size' | 'position'>) {
  return <DecorativeLine variant="gradient" size="sm" position="top" animated {...props} />;
}

export function SectionDivider(props: Omit<DecorativeLineProps, 'variant' | 'size'>) {
  return <DecorativeLine variant="subtle" size="xs" {...props} />;
}

export { lineVariants as decorativeLineVariants };
