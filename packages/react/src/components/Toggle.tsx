import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { SPRING } from '@spinozaos/motion';
import { cn } from '../utils';

const toggleTrackVariants = cva(
  [
    'relative inline-flex items-center',
    'rounded-full',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-void',
    'cursor-pointer',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      size: {
        sm: 'w-8 h-5',
        md: 'w-10 h-6',
        lg: 'w-12 h-7',
      },
      variant: {
        default: [
          'bg-white/10',
          'data-[state=checked]:bg-gold',
        ],
        oracle: [
          'bg-white/10',
          'data-[state=checked]:bg-oracle',
        ],
        success: [
          'bg-white/10',
          'data-[state=checked]:bg-status-success',
        ],
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

const toggleThumbVariants = cva(
  [
    'absolute rounded-full bg-white shadow-md',
    'transition-transform duration-200',
  ],
  {
    variants: {
      size: {
        sm: 'w-3.5 h-3.5',
        md: 'w-4.5 h-4.5',
        lg: 'w-5.5 h-5.5',
      },
    },
    defaultVariants: {
      size: 'md',
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

export interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof toggleTrackVariants> {
  label?: string;
  description?: string;
  labelPosition?: 'left' | 'right';
}

const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      className,
      size,
      variant,
      label,
      description,
      labelPosition = 'right',
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

    // Calculate thumb position based on size
    const getThumbPosition = () => {
      const positions = {
        sm: { off: 2, on: 16 },
        md: { off: 3, on: 21 },
        lg: { off: 3, on: 26 },
      };
      const sizeKey = size || 'md';
      return isChecked ? positions[sizeKey].on : positions[sizeKey].off;
    };

    // Get thumb size based on toggle size
    const getThumbSize = () => {
      const sizes = {
        sm: 14,
        md: 18,
        lg: 22,
      };
      return sizes[size || 'md'];
    };

    const LabelContent = (label || description) && (
      <div
        className={cn(
          'flex flex-col gap-0.5',
          labelPosition === 'left' ? 'mr-3' : 'ml-3'
        )}
        onClick={handleClick}
      >
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
    );

    const thumbSize = getThumbSize();

    return (
      <div className={cn('flex items-center', className)}>
        <input
          type="checkbox"
          ref={inputRef}
          checked={isChecked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        {labelPosition === 'left' && LabelContent}
        <motion.button
          type="button"
          role="switch"
          aria-checked={isChecked}
          data-state={isChecked ? 'checked' : 'unchecked'}
          className={toggleTrackVariants({ size, variant })}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          whileTap={{ scale: 0.95 }}
          transition={SPRING.tight}
        >
          <motion.span
            className="absolute rounded-full bg-white shadow-md"
            style={{
              width: thumbSize,
              height: thumbSize,
            }}
            animate={{ x: getThumbPosition() }}
            transition={SPRING.snappy}
          />
        </motion.button>
        {labelPosition === 'right' && LabelContent}
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

export { Toggle, toggleTrackVariants };
