import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

const textareaVariants = cva(
  [
    // Base styles
    'w-full rounded-lg',
    'bg-void-light text-white placeholder:text-white/40',
    'border border-white/10',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'resize-none',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-void-light',
          'hover:border-white/20',
        ],
        ghost: [
          'bg-transparent border-transparent',
          'hover:bg-white/5',
          'focus:bg-white/5',
        ],
        glass: [
          'bg-white/5 backdrop-blur-md',
          'hover:bg-white/10',
        ],
      },
      size: {
        sm: 'min-h-[80px] px-3 py-2 text-sm',
        md: 'min-h-[100px] px-4 py-3 text-sm',
        lg: 'min-h-[140px] px-4 py-3 text-base',
      },
      state: {
        default: '',
        error: [
          'border-status-error/50',
          'focus:ring-status-error/50 focus:border-status-error/50',
        ],
        success: [
          'border-status-success/50',
          'focus:ring-status-success/50 focus:border-status-success/50',
        ],
      },
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
      resize: 'none',
    },
  }
);

const labelVariants = cva(
  'block text-sm font-medium mb-1.5',
  {
    variants: {
      state: {
        default: 'text-white/80',
        error: 'text-status-error',
        success: 'text-status-success',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

const helperTextVariants = cva(
  'text-xs mt-1.5',
  {
    variants: {
      state: {
        default: 'text-white/50',
        error: 'text-status-error',
        success: 'text-status-success',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

type TextareaBaseProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'size'
>;

export interface TextareaProps
  extends TextareaBaseProps,
    VariantProps<typeof textareaVariants> {
  label?: string;
  helperText?: string;
  showCount?: boolean;
  maxLength?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      size,
      state,
      resize,
      label,
      helperText,
      showCount,
      maxLength,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = React.useState(
      String(value || defaultValue || '').length
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    React.useEffect(() => {
      if (value !== undefined) {
        setCharCount(String(value).length);
      }
    }, [value]);

    return (
      <div className="w-full">
        {label && (
          <label className={labelVariants({ state })}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(textareaVariants({ variant, size, state, resize, className }))}
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          onChange={handleChange}
          {...props}
        />
        <div className="flex justify-between items-center">
          {helperText && (
            <span className={helperTextVariants({ state })}>
              {helperText}
            </span>
          )}
          {showCount && (
            <span className={cn(
              'text-xs ml-auto',
              maxLength && charCount >= maxLength
                ? 'text-status-error'
                : 'text-white/40'
            )}>
              {charCount}{maxLength ? `/${maxLength}` : ''}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };
