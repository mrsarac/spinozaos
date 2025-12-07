// ConfidenceIndicator - Visual confidence/probability display
// Extracted from Substance PredictionModal patterns

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { SPRING } from '@spinozaos/motion';

const indicatorVariants = cva(
  ['inline-flex items-center gap-2', 'font-mono'],
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-xl',
        xl: 'text-4xl',
      },
      variant: {
        default: '',
        card: 'px-3 py-2 bg-black/30 border border-white/10',
        minimal: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

const getConfidenceLevel = (value: number) => {
  if (value >= 70) return 'high';
  if (value >= 40) return 'medium';
  return 'low';
};

const getConfidenceColor = (value: number) => {
  const level = getConfidenceLevel(value);
  switch (level) {
    case 'high':
      return 'text-green-400';
    case 'medium':
      return 'text-spinoza-yellow';
    case 'low':
      return 'text-red-400';
  }
};

const getConfidenceBg = (value: number) => {
  const level = getConfidenceLevel(value);
  switch (level) {
    case 'high':
      return 'bg-green-400';
    case 'medium':
      return 'bg-spinoza-yellow';
    case 'low':
      return 'bg-red-400';
  }
};

const getConfidenceIcon = (value: number) => {
  if (value >= 70) return TrendingUp;
  if (value >= 40) return Minus;
  return TrendingDown;
};

const getConfidenceLabel = (value: number) => {
  if (value >= 70) return 'High confidence';
  if (value >= 40) return 'Moderate';
  return 'Low confidence';
};

export interface ConfidenceIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof indicatorVariants> {
  /** Confidence value (0-100) */
  value: number;
  /** Show trend icon */
  showIcon?: boolean;
  /** Show label */
  showLabel?: boolean;
  /** Show percentage suffix */
  showPercent?: boolean;
  /** Animate on mount */
  animated?: boolean;
  /** Show bar visualization */
  showBar?: boolean;
}

export function ConfidenceIndicator({
  value,
  size,
  variant,
  showIcon = false,
  showLabel = false,
  showPercent = true,
  animated = true,
  showBar = false,
  className,
  ...props
}: ConfidenceIndicatorProps) {
  const clampedValue = Math.max(0, Math.min(100, value));
  const Icon = getConfidenceIcon(clampedValue);
  const colorClass = getConfidenceColor(clampedValue);
  const bgClass = getConfidenceBg(clampedValue);

  return (
    <div className={indicatorVariants({ size, variant, className })} {...props}>
      {showIcon && (
        <Icon
          size={size === 'sm' ? 14 : size === 'lg' ? 20 : size === 'xl' ? 28 : 16}
          className={colorClass}
        />
      )}

      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          {animated ? (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={SPRING.soft}
              className={colorClass}
            >
              {clampedValue}
            </motion.span>
          ) : (
            <span className={colorClass}>{clampedValue}</span>
          )}
          {showPercent && (
            <span className={`${colorClass} opacity-60 ${size === 'xl' ? 'text-lg' : 'text-xs'}`}>
              %
            </span>
          )}
        </div>

        {showLabel && (
          <span className="text-[10px] text-neutral-500 uppercase tracking-wide">
            {getConfidenceLabel(clampedValue)}
          </span>
        )}
      </div>

      {showBar && (
        <div className="flex-1 min-w-[60px] h-1.5 bg-white/10 rounded-full overflow-hidden">
          {animated ? (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${clampedValue}%` }}
              transition={SPRING.soft}
              className={`h-full ${bgClass} rounded-full`}
              style={{ opacity: 0.8 }}
            />
          ) : (
            <div
              className={`h-full ${bgClass} rounded-full`}
              style={{ width: `${clampedValue}%`, opacity: 0.8 }}
            />
          )}
        </div>
      )}
    </div>
  );
}

// Confidence Slider subcomponent
export interface ConfidenceSliderProps {
  /** Current value (0-100) */
  value: number;
  /** Change handler */
  onChange: (value: number) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Show value display */
  showValue?: boolean;
  /** Label */
  label?: string;
}

export function ConfidenceSlider({
  value,
  onChange,
  disabled = false,
  showValue = true,
  label,
}: ConfidenceSliderProps) {
  const colorClass = getConfidenceColor(value);
  const bgClass = getConfidenceBg(value);

  return (
    <div className="space-y-3">
      {label && (
        <label className="text-[10px] font-mono text-neutral-500 uppercase block">
          {label}
        </label>
      )}

      <div className="flex items-center gap-4">
        <TrendingDown size={16} className="text-red-400" />

        <div className="flex-1 relative">
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            disabled={disabled}
            className={`w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-4
                       [&::-webkit-slider-thumb]:h-4
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-spinoza-yellow
                       [&::-webkit-slider-thumb]:cursor-pointer
                       [&::-webkit-slider-thumb]:shadow-lg
                       [&::-webkit-slider-thumb]:shadow-spinoza-yellow/30
                       disabled:opacity-50 disabled:cursor-not-allowed`}
          />
          <div
            className={`absolute top-0 left-0 h-2 rounded-full pointer-events-none ${bgClass}`}
            style={{ width: `${value}%`, opacity: 0.3 }}
          />
        </div>

        <TrendingUp size={16} className="text-green-400" />
      </div>

      {showValue && (
        <div className="text-center">
          <span className={`text-4xl font-mono ${colorClass}`}>
            {value}%
          </span>
          <p className="text-xs text-neutral-500 mt-1">
            {getConfidenceLabel(value)}
          </p>
        </div>
      )}
    </div>
  );
}

export { indicatorVariants as confidenceIndicatorVariants };
