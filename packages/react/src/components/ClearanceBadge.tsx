// ClearanceBadge - Security clearance level indicator
// Extracted from Substance design patterns

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Shield, Eye, Lock, AlertTriangle, Star } from 'lucide-react';

const badgeVariants = cva(
  [
    'inline-flex items-center gap-1.5',
    'px-2 py-1',
    'font-mono text-[10px] uppercase tracking-wider',
    'border transition-all duration-200',
  ],
  {
    variants: {
      level: {
        cosmic: [
          'bg-purple-500/10 border-purple-500/30 text-purple-400',
          'hover:bg-purple-500/20 hover:border-purple-500/50',
        ],
        topSecret: [
          'bg-red-500/10 border-red-500/30 text-red-400',
          'hover:bg-red-500/20 hover:border-red-500/50',
        ],
        secret: [
          'bg-amber-500/10 border-amber-500/30 text-amber-400',
          'hover:bg-amber-500/20 hover:border-amber-500/50',
        ],
        classified: [
          'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
          'hover:bg-yellow-500/20 hover:border-yellow-500/50',
        ],
        standard: [
          'bg-neutral-500/10 border-neutral-500/30 text-neutral-400',
          'hover:bg-neutral-500/20 hover:border-neutral-500/50',
        ],
      },
      size: {
        sm: 'px-1.5 py-0.5 text-[9px]',
        md: 'px-2 py-1 text-[10px]',
        lg: 'px-3 py-1.5 text-xs',
      },
      animated: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      level: 'standard',
      size: 'md',
      animated: false,
    },
  }
);

const iconMap = {
  cosmic: Star,
  topSecret: Shield,
  secret: Lock,
  classified: AlertTriangle,
  standard: Eye,
};

const labelMap = {
  cosmic: 'COSMIC',
  topSecret: 'TOP SECRET',
  secret: 'SECRET',
  classified: 'CLASSIFIED',
  standard: 'STANDARD',
};

export interface ClearanceBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Custom label (overrides default) */
  label?: string;
  /** Show icon */
  showIcon?: boolean;
  /** Pulse animation for urgent levels */
  pulse?: boolean;
}

export function ClearanceBadge({
  level = 'standard',
  size,
  animated,
  label,
  showIcon = true,
  pulse = false,
  className,
  ...props
}: ClearanceBadgeProps) {
  const Icon = level ? iconMap[level] : iconMap.standard;
  const displayLabel = label || (level ? labelMap[level] : labelMap.standard);

  const content = (
    <>
      {showIcon && <Icon size={size === 'sm' ? 10 : size === 'lg' ? 14 : 12} />}
      <span>{displayLabel}</span>
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
        </span>
      )}
    </>
  );

  // Use CSS animation for animated variant (avoids TypeScript conflicts with Framer Motion)
  const animatedClass = animated ? 'animate-[fadeInScale_0.3s_ease-out]' : '';

  return (
    <span
      className={`${badgeVariants({ level, size, animated, className })} ${animatedClass}`}
      {...props}
    >
      {content}
    </span>
  );
}

export { badgeVariants as clearanceBadgeVariants };
