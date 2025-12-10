// LiveTicker - Horizontal scrolling real-time data ticker
// Bloomberg/Substance style infinite scroll ticker with trend indicators

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../utils';

// ============================================================================
// Types
// ============================================================================

export interface TickerItem {
  /** Unique identifier for the item */
  id: string;
  /** Display label (e.g., "BTC/USD", "AAPL") */
  label: string;
  /** Current value */
  value: string | number;
  /** Percentage change */
  change?: number;
  /** Trend direction */
  trend?: 'up' | 'down' | 'neutral';
  /** Value prefix (e.g., "$") */
  prefix?: string;
  /** Value suffix (e.g., "%") */
  suffix?: string;
}

export interface LiveTickerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of ticker items to display */
  items: TickerItem[];
  /** Animation speed - slow (60s), normal (30s), fast (15s) */
  speed?: 'slow' | 'normal' | 'fast';
  /** Pause animation on hover */
  pauseOnHover?: boolean;
  /** Show trend indicators */
  showTrend?: boolean;
  /** Custom separator between items */
  separator?: React.ReactNode;
}

// ============================================================================
// Variants
// ============================================================================

const liveTickerVariants = cva(
  [
    'relative w-full overflow-hidden',
    'bg-void/80 backdrop-blur-md',
    'border-y border-white/5',
  ],
  {
    variants: {
      size: {
        sm: 'h-8',
        md: 'h-10',
        lg: 'h-12',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const tickerItemVariants = cva(
  [
    'inline-flex items-center gap-2',
    'whitespace-nowrap',
  ],
  {
    variants: {
      trend: {
        up: '',
        down: '',
        neutral: '',
      },
    },
    defaultVariants: {
      trend: 'neutral',
    },
  }
);

// Speed mappings (duration in seconds)
const SPEED_DURATION: Record<NonNullable<LiveTickerProps['speed']>, number> = {
  slow: 60,
  normal: 30,
  fast: 15,
};

// Trend color mappings
const TREND_COLORS = {
  up: 'text-green-400',
  down: 'text-red-400',
  neutral: 'text-neutral-400',
} as const;

// Trend icon mappings
const TREND_ICONS = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
} as const;

// ============================================================================
// Component
// ============================================================================

export const LiveTicker = React.forwardRef<HTMLDivElement, LiveTickerProps>(
  (
    {
      items,
      speed = 'normal',
      pauseOnHover = true,
      showTrend = true,
      separator,
      className,
      ...props
    },
    ref
  ) => {
    const duration = SPEED_DURATION[speed];

    // Default separator
    const defaultSeparator = (
      <span className="text-neutral-700 mx-4" aria-hidden="true">
        &bull;
      </span>
    );

    const itemSeparator = separator ?? defaultSeparator;

    // Render a single ticker item
    const renderTickerItem = (item: TickerItem, index: number) => {
      const trend = item.trend ?? 'neutral';
      const TrendIcon = TREND_ICONS[trend];
      const trendColorClass = TREND_COLORS[trend];

      // Format change value
      const formattedChange = item.change !== undefined
        ? `${item.change >= 0 ? '+' : ''}${item.change.toFixed(2)}%`
        : null;

      return (
        <span
          key={`${item.id}-${index}`}
          className={cn(tickerItemVariants({ trend }))}
        >
          {/* Label */}
          <span className="text-neutral-500 text-xs font-mono uppercase tracking-wider">
            {item.label}
          </span>

          {/* Value */}
          <span className="text-white font-mono font-medium text-sm">
            {item.prefix}
            {typeof item.value === 'number'
              ? item.value.toLocaleString('en-US')
              : item.value}
            {item.suffix}
          </span>

          {/* Trend indicator and change */}
          {showTrend && (formattedChange || item.trend) && (
            <span className={cn('flex items-center gap-1', trendColorClass)}>
              <TrendIcon size={12} aria-hidden="true" />
              {formattedChange && (
                <span className="text-xs font-mono">
                  {formattedChange}
                </span>
              )}
            </span>
          )}
        </span>
      );
    };

    // Render items with separators
    const renderItems = () => {
      return items.map((item, index) => (
        <React.Fragment key={`fragment-${item.id}-${index}`}>
          {renderTickerItem(item, index)}
          {itemSeparator}
        </React.Fragment>
      ));
    };

    // CSS animation keyframes (injected via style tag)
    const animationStyles = `
      @keyframes ticker-scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
    `;

    return (
      <div
        ref={ref}
        className={cn(liveTickerVariants(), className)}
        role="marquee"
        aria-label="Live data ticker"
        {...props}
      >
        {/* Inject animation keyframes */}
        <style>{animationStyles}</style>

        {/* Ticker track - duplicated for seamless loop */}
        <div
          className={cn(
            'flex items-center h-full',
            'whitespace-nowrap',
            pauseOnHover && 'hover:[animation-play-state:paused]'
          )}
          style={{
            animation: `ticker-scroll ${duration}s linear infinite`,
          }}
        >
          {/* First set of items */}
          <div className="flex items-center px-4">
            {renderItems()}
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="flex items-center px-4" aria-hidden="true">
            {renderItems()}
          </div>
        </div>

        {/* Gradient fade edges for polish */}
        <div
          className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-void/80 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-void/80 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />
      </div>
    );
  }
);

LiveTicker.displayName = 'LiveTicker';

// ============================================================================
// Exports
// ============================================================================

export { liveTickerVariants, tickerItemVariants };
