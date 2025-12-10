// GaugeCluster - SVG-based animated gauges for dashboard metrics
// Substance aesthetic with threshold-based coloring and glow effects

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn } from '../../utils';

// ============================================================================
// Types
// ============================================================================

export interface GaugeConfig {
  /** Unique identifier for the gauge */
  id: string;
  /** Display label */
  label: string;
  /** Current value (0-100 by default) */
  value: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Unit suffix (e.g., '%', 'ms', 'GB') */
  unit?: string;
  /** Threshold levels for color changes */
  thresholds?: {
    /** Value above which color turns yellow */
    warning?: number;
    /** Value above which color turns red */
    critical?: number;
  };
  /** Optional icon to display */
  icon?: React.ReactNode;
}

export interface GaugeClusterProps {
  /** Array of gauge configurations */
  gauges: GaugeConfig[];
  /** Layout arrangement */
  layout?: 'row' | 'grid';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Enable entry animation */
  animated?: boolean;
  /** Show labels below gauges */
  showLabels?: boolean;
  /** Additional class names */
  className?: string;
}

export interface GaugeProps extends GaugeConfig {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Enable entry animation */
  animated?: boolean;
  /** Show label below gauge */
  showLabel?: boolean;
  /** Additional class names */
  className?: string;
}

// ============================================================================
// Variants
// ============================================================================

export const gaugeVariants = cva(
  ['relative', 'flex flex-col items-center', 'select-none'],
  {
    variants: {
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const gaugeClusterVariants = cva(['flex', 'gap-4'], {
  variants: {
    layout: {
      row: 'flex-row flex-wrap justify-center',
      grid: 'flex-wrap justify-center',
    },
    size: {
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-6',
    },
  },
  defaultVariants: {
    layout: 'row',
    size: 'md',
  },
});

// ============================================================================
// Helper Functions
// ============================================================================

const SIZE_MAP = {
  sm: 80,
  md: 120,
  lg: 160,
} as const;

const STROKE_WIDTH_MAP = {
  sm: 6,
  md: 8,
  lg: 10,
} as const;

const VALUE_FONT_SIZE_MAP = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-4xl',
} as const;

const UNIT_FONT_SIZE_MAP = {
  sm: 'text-[8px]',
  md: 'text-xs',
  lg: 'text-sm',
} as const;

const LABEL_FONT_SIZE_MAP = {
  sm: 'text-[8px]',
  md: 'text-[10px]',
  lg: 'text-xs',
} as const;

/**
 * Get the color class based on value and thresholds
 */
function getGaugeColor(
  value: number,
  max: number,
  thresholds?: { warning?: number; critical?: number }
): { stroke: string; text: string; glow: string } {
  const percentage = (value / max) * 100;
  const warningThreshold = thresholds?.warning ?? 60;
  const criticalThreshold = thresholds?.critical ?? 80;

  if (percentage >= criticalThreshold) {
    return {
      stroke: '#ef4444', // red-500
      text: 'text-red-400',
      glow: 'drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]',
    };
  }
  if (percentage >= warningThreshold) {
    return {
      stroke: '#fbbf24', // spinoza-yellow
      text: 'text-spinoza-yellow',
      glow: 'drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]',
    };
  }
  return {
    stroke: '#22c55e', // green-500
    text: 'text-green-400',
    glow: 'drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]',
  };
}

/**
 * Calculate SVG arc path for a semi-circle
 */
function describeArc(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(' ');
}

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

// ============================================================================
// Gauge Component
// ============================================================================

export function Gauge({
  id,
  label,
  value,
  max = 100,
  unit = '',
  thresholds,
  icon,
  size = 'md',
  animated = true,
  showLabel = true,
  className,
}: GaugeProps) {
  const dimension = SIZE_MAP[size];
  const strokeWidth = STROKE_WIDTH_MAP[size];
  const radius = (dimension - strokeWidth) / 2;
  const center = dimension / 2;

  // Clamp value between 0 and max
  const clampedValue = Math.max(0, Math.min(max, value));
  const percentage = clampedValue / max;

  // Arc calculations (180-degree semi-circle, from left to right)
  const arcPath = describeArc(center, center, radius, 180, 360);
  const circumference = Math.PI * radius;
  const offset = circumference * (1 - percentage);

  const colors = getGaugeColor(clampedValue, max, thresholds);

  return (
    <div
      className={cn(
        gaugeVariants({ size }),
        className
      )}
      style={{ width: dimension }}
    >
      {/* SVG Gauge */}
      <svg
        width={dimension}
        height={dimension / 2 + strokeWidth}
        viewBox={`0 0 ${dimension} ${dimension / 2 + strokeWidth}`}
        className={cn('overflow-visible', colors.glow)}
      >
        {/* Background Arc */}
        <path
          d={arcPath}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Fill Arc */}
        {animated ? (
          <motion.path
            d={arcPath}
            fill="none"
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        ) : (
          <path
            d={arcPath}
            fill="none"
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        )}
      </svg>

      {/* Value Display - Positioned below arc center */}
      <div
        className="absolute flex flex-col items-center justify-end"
        style={{
          top: 0,
          left: 0,
          right: 0,
          height: dimension / 2 + strokeWidth,
          paddingBottom: strokeWidth / 2,
        }}
      >
        {icon && (
          <div className={cn('mb-1', colors.text)}>
            {icon}
          </div>
        )}
        <div className="flex items-baseline">
          {animated ? (
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={cn(
                'font-mono font-bold',
                VALUE_FONT_SIZE_MAP[size],
                colors.text
              )}
            >
              {Math.round(clampedValue)}
            </motion.span>
          ) : (
            <span
              className={cn(
                'font-mono font-bold',
                VALUE_FONT_SIZE_MAP[size],
                colors.text
              )}
            >
              {Math.round(clampedValue)}
            </span>
          )}
          {unit && (
            <span
              className={cn(
                'font-mono text-neutral-500 ml-0.5',
                UNIT_FONT_SIZE_MAP[size]
              )}
            >
              {unit}
            </span>
          )}
        </div>
      </div>

      {/* Label */}
      {showLabel && (
        <div
          className={cn(
            'font-mono text-neutral-400 uppercase tracking-wider mt-1 text-center',
            LABEL_FONT_SIZE_MAP[size]
          )}
        >
          {label}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// GaugeCluster Component
// ============================================================================

export function GaugeCluster({
  gauges,
  layout = 'row',
  size = 'md',
  animated = true,
  showLabels = true,
  className,
}: GaugeClusterProps) {
  const dimension = SIZE_MAP[size];

  return (
    <div
      className={cn(
        gaugeClusterVariants({ layout, size }),
        layout === 'grid' && 'max-w-fit',
        className
      )}
      style={
        layout === 'grid'
          ? { width: `${dimension * 2 + 32}px` }
          : undefined
      }
    >
      {gauges.map((gauge, index) => (
        <motion.div
          key={gauge.id}
          initial={animated ? { opacity: 0, scale: 0.9 } : undefined}
          animate={animated ? { opacity: 1, scale: 1 } : undefined}
          transition={
            animated
              ? {
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }
              : undefined
          }
        >
          <Gauge
            {...gauge}
            size={size}
            animated={animated}
            showLabel={showLabels}
          />
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================================
// Exports
// ============================================================================

export type { VariantProps };
