import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { SPRING } from '@spinozaos/motion';
import { cn } from '../utils';

const checkboxVariants = cva(
  [
    'relative inline-flex items-center justify-center',
    'rounded border-2',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-void',
    'cursor-pointer',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      size: {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
      },
      variant: {
        default: [
          'border-white/30',
          'data-[state=checked]:bg-gold data-[state=checked]:border-gold',
        ],
        oracle: [
          'border-white/30',
          'data-[state=checked]:bg-oracle data-[state=checked]:border-oracle',
        ],
        success: [
          'border-white/30',
          'data-[state=checked]:bg-status-success data-[state=checked]:border-status-success',
        ],
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

const labelVariants = cva(
  'text-white cursor-pointer select-none',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  description?: string;
}

const CheckIcon = ({ size }: { size: 'sm' | 'md' | 'lg' | null | undefined }) => {
  const strokeWidth = size === 'sm' ? 3 : size === 'lg' ? 2 : 2.5;
  const iconSize = size === 'sm' ? 10 : size === 'lg' ? 16 : 12;

  return (
    <motion.svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 12 12"
      fill="none"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={SPRING.snappy}
    >
      <motion.path
        d="M2 6L5 9L10 3"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ ...SPRING.snappy, delay: 0.1 }}
      />
    </motion.svg>
  );
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      size,
      variant,
      label,
      description,
      checked,
      defaultChecked,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = React.useState(checked ?? defaultChecked ?? false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current!);

    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked);
      }
    }, [checked]);

    const handleClick = () => {
      if (disabled) return;
      const newChecked = !isChecked;
      setIsChecked(newChecked);

      // Trigger onChange with synthetic event
      if (inputRef.current) {
        const event = new Event('change', { bubbles: true });
        Object.defineProperty(event, 'target', {
          value: { ...inputRef.current, checked: newChecked },
          writable: false,
        });
        onChange?.(event as unknown as React.ChangeEvent<HTMLInputElement>);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleClick();
      }
    };

    return (
      <div className={cn('flex items-start gap-3', className)}>
        <input
          type="checkbox"
          ref={inputRef}
          checked={isChecked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <motion.button
          type="button"
          role="checkbox"
          aria-checked={isChecked}
          data-state={isChecked ? 'checked' : 'unchecked'}
          className={checkboxVariants({ size, variant })}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          whileTap={{ scale: 0.9 }}
          transition={SPRING.tight}
        >
          <AnimatePresence>
            {isChecked && (
              <span className="text-void">
                <CheckIcon size={size} />
              </span>
            )}
          </AnimatePresence>
        </motion.button>
        {(label || description) && (
          <div className="flex flex-col gap-0.5" onClick={handleClick}>
            {label && (
              <span className={labelVariants({ size })}>
                {label}
              </span>
            )}
            {description && (
              <span className="text-xs text-white/50">
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox, checkboxVariants };
