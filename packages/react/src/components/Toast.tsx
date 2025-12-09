import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence, type HTMLMotionProps } from 'framer-motion';
import { SPRING, EASE } from '@spinozaos/motion';
import { cn } from '../utils';

const toastVariants = cva(
  // Base styles
  [
    'relative flex items-start gap-3',
    'w-full max-w-md p-4 rounded-lg',
    'bg-void-light backdrop-blur-sm',
    'border border-white/10',
    'shadow-lg shadow-black/20',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-white/10',
        ],
        success: [
          'border-success/30',
          'bg-success/5',
        ],
        error: [
          'border-error/30',
          'bg-error/5',
        ],
        warning: [
          'border-warning/30',
          'bg-warning/5',
        ],
        info: [
          'border-info/30',
          'bg-info/5',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const iconVariants = cva(
  'w-5 h-5 flex-shrink-0 mt-0.5',
  {
    variants: {
      variant: {
        default: 'text-neutral-400',
        success: 'text-success',
        error: 'text-error',
        warning: 'text-warning',
        info: 'text-info',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ToastProps
  extends Omit<HTMLMotionProps<'div'>, 'title'>,
    VariantProps<typeof toastVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
  duration?: number;
}

// Default icons for each variant
const DefaultIcons: Record<string, React.ReactNode> = {
  success: (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
  default: (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
};

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({
    className,
    variant = 'default',
    title,
    description,
    icon,
    action,
    onClose,
    duration = 5000,
    ...props
  }, ref) => {
    React.useEffect(() => {
      if (duration && onClose) {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
      }
    }, [duration, onClose]);

    const displayIcon = icon ?? DefaultIcons[variant || 'default'];

    // Determine appropriate role based on variant
    const isUrgent = variant === 'error' || variant === 'warning';

    return (
      <motion.div
        className={cn(toastVariants({ variant, className }))}
        ref={ref}
        role={isUrgent ? 'alert' : 'status'}
        aria-live={isUrgent ? 'assertive' : 'polite'}
        aria-atomic="true"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ ...SPRING.soft, ease: EASE.enter }}
        {...props}
      >
        {displayIcon && (
          <div className={iconVariants({ variant })} aria-hidden="true">
            {displayIcon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          {title && (
            <p className="text-sm font-medium text-white">
              {title}
            </p>
          )}
          {description && (
            <p className="text-sm text-neutral-400 mt-0.5">
              {description}
            </p>
          )}
          {action && (
            <div className="mt-2">
              {action}
            </div>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Dismiss notification"
            className="flex-shrink-0 text-neutral-500 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </motion.div>
    );
  }
);

Toast.displayName = 'Toast';

// Toast Container for positioning
export interface ToastContainerProps {
  children: React.ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const positionClasses = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

const ToastContainer: React.FC<ToastContainerProps> = ({
  children,
  position = 'bottom-right',
}) => {
  return (
    <div className={cn('fixed z-50 flex flex-col gap-2', positionClasses[position])}>
      <AnimatePresence mode="popLayout">
        {children}
      </AnimatePresence>
    </div>
  );
};

export { Toast, ToastContainer, toastVariants };
