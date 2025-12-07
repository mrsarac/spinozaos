// StatCard - Statistics display card
// Extracted from Substance Leaderboard patterns

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const statCardVariants = cva(
  ['bg-void text-center transition-all duration-200'],
  {
    variants: {
      variant: {
        default: '',
        bordered: 'border border-white/10',
        elevated: 'border border-white/10 shadow-lg shadow-black/20',
        gradient: 'bg-gradient-to-br from-white/5 to-transparent border border-white/10',
      },
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const valueVariants = cva(['font-mono'], {
  variants: {
    size: {
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-3xl',
    },
    color: {
      default: 'text-white',
      yellow: 'text-spinoza-yellow',
      teal: 'text-teal-400',
      purple: 'text-purple-400',
      green: 'text-green-400',
      red: 'text-red-400',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'default',
  },
});

const labelVariants = cva(
  ['font-mono uppercase tracking-wider'],
  {
    variants: {
      size: {
        sm: 'text-[9px]',
        md: 'text-[10px]',
        lg: 'text-xs',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  /** Stat label */
  label: string;
  /** Stat value */
  value: string | number;
  /** Value color */
  valueColor?: VariantProps<typeof valueVariants>['color'];
  /** Icon component */
  icon?: LucideIcon;
  /** Trend direction */
  trend?: 'up' | 'down' | 'neutral';
  /** Trend value */
  trendValue?: string;
  /** Animate value on mount */
  animated?: boolean;
  /** Tooltip text */
  tooltip?: string;
  /** Loading state */
  loading?: boolean;
}

export function StatCard({
  label,
  value,
  valueColor,
  icon: Icon,
  trend,
  trendValue,
  variant,
  size,
  animated = false,
  tooltip,
  loading = false,
  className,
  ...props
}: StatCardProps) {
  const TrendIcon =
    trend === 'up' ? TrendingUp :
    trend === 'down' ? TrendingDown :
    trend === 'neutral' ? Minus : null;

  const trendColor =
    trend === 'up' ? 'text-green-400' :
    trend === 'down' ? 'text-red-400' :
    'text-neutral-400';

  const iconSize =
    size === 'sm' ? 12 :
    size === 'lg' ? 18 : 14;

  const content = (
    <>
      {Icon && (
        <Icon
          size={iconSize}
          className="text-neutral-500 mx-auto mb-1"
        />
      )}

      {loading ? (
        <div className="h-6 w-16 mx-auto bg-white/10 rounded animate-pulse" />
      ) : animated ? (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={valueVariants({ size, color: valueColor })}
        >
          {value}
        </motion.p>
      ) : (
        <p className={valueVariants({ size, color: valueColor })}>
          {value}
        </p>
      )}

      <div className="flex items-center justify-center gap-1">
        <p className={`${labelVariants({ size })} text-neutral-600`}>
          {label}
        </p>
        {tooltip && (
          <span className="text-neutral-600 cursor-help" title={tooltip}>
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </span>
        )}
      </div>

      {trend && TrendIcon && (
        <div className={`flex items-center justify-center gap-1 mt-1 ${trendColor}`}>
          <TrendIcon size={10} />
          {trendValue && (
            <span className="text-[10px] font-mono">{trendValue}</span>
          )}
        </div>
      )}
    </>
  );

  return (
    <div
      className={statCardVariants({ variant, size, className })}
      {...props}
    >
      {content}
    </div>
  );
}

// StatGrid - Grid layout for multiple stats
export interface StatGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns */
  columns?: 2 | 3 | 4 | 5 | 6;
  /** Gap between items */
  gap?: 'none' | 'sm' | 'md' | 'lg';
}

const gridCols = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
};

const gridGaps = {
  none: 'gap-px',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
};

export function StatGrid({
  columns = 4,
  gap = 'none',
  className,
  children,
  ...props
}: StatGridProps) {
  return (
    <div
      className={`grid ${gridCols[columns]} ${gridGaps[gap]} ${gap === 'none' ? 'bg-white/5' : ''} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
}

// Preset Stats
export interface QuickStatsProps {
  stats: Array<{
    label: string;
    value: string | number;
    icon?: LucideIcon;
    tooltip?: string;
  }>;
  variant?: VariantProps<typeof statCardVariants>['variant'];
  size?: VariantProps<typeof statCardVariants>['size'];
}

export function QuickStats({ stats, variant, size }: QuickStatsProps) {
  const columns = stats.length <= 3 ? 3 :
                  stats.length === 4 ? 4 :
                  stats.length === 5 ? 5 : 6;

  return (
    <StatGrid columns={columns as 2 | 3 | 4 | 5 | 6}>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
          tooltip={stat.tooltip}
          variant={variant}
          size={size}
        />
      ))}
    </StatGrid>
  );
}

export { statCardVariants, valueVariants, labelVariants };
