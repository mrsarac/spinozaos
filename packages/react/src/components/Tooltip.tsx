import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { SPRING } from '@spinozaos/motion';
import { cn } from '../utils';

const tooltipVariants = cva(
  [
    'absolute z-50',
    'px-3 py-1.5 rounded-md',
    'text-xs font-medium',
    'bg-void-lighter text-white',
    'border border-white/10',
    'shadow-lg shadow-black/20',
    'whitespace-nowrap',
  ],
  {
    variants: {
      variant: {
        default: '',
        dark: 'bg-black text-white',
        light: 'bg-white text-void',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  children: React.ReactElement;
  content: React.ReactNode;
  position?: TooltipPosition;
  delay?: number;
  offset?: number;
}

const positionStyles: Record<TooltipPosition, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const arrowStyles: Record<TooltipPosition, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-void-lighter border-x-transparent border-b-transparent',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-void-lighter border-x-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-void-lighter border-y-transparent border-r-transparent',
  right: 'right-full top-1/2 -translate-y-1/2 border-r-void-lighter border-y-transparent border-l-transparent',
};

const initialAnimation: Record<TooltipPosition, { opacity: number; x?: number; y?: number }> = {
  top: { opacity: 0, y: 4 },
  bottom: { opacity: 0, y: -4 },
  left: { opacity: 0, x: 4 },
  right: { opacity: 0, x: -4 },
};

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  variant,
  delay = 200,
  offset = 8,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      setShowTooltip(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
    // Keep tooltip in DOM briefly for exit animation
    setTimeout(() => setShowTooltip(false), 150);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className={cn(tooltipVariants({ variant }), positionStyles[position])}
            initial={initialAnimation[position]}
            animate={{ opacity: isVisible ? 1 : 0, x: 0, y: 0 }}
            exit={initialAnimation[position]}
            transition={SPRING.tight}
            role="tooltip"
          >
            {content}
            {/* Arrow */}
            <span
              className={cn(
                'absolute w-0 h-0 border-4',
                arrowStyles[position]
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

Tooltip.displayName = 'Tooltip';

export { Tooltip, tooltipVariants };
