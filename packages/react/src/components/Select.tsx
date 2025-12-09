import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { SPRING } from '@spinozaos/motion';
import { cn } from '../utils';

const selectTriggerVariants = cva(
  [
    // Base styles
    'w-full rounded-lg',
    'bg-void-light text-white',
    'border border-white/10',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'flex items-center justify-between gap-2',
    'cursor-pointer',
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
        ],
        glass: [
          'bg-white/5 backdrop-blur-md',
          'hover:bg-white/10',
        ],
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-4 text-base',
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
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
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

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends VariantProps<typeof selectTriggerVariants> {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
}

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <motion.svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    animate={{ rotate: isOpen ? 180 : 0 }}
    transition={SPRING.snappy}
    className="text-white/60"
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      placeholder = 'Select an option',
      label,
      helperText,
      disabled,
      variant,
      size,
      state,
      className,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(value || defaultValue || '');
    const [focusedIndex, setFocusedIndex] = React.useState(-1);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const listboxRef = React.useRef<HTMLDivElement>(null);
    const triggerRef = React.useRef<HTMLButtonElement>(null);

    const generatedId = React.useId();
    const labelId = label ? `${generatedId}-label` : undefined;
    const listboxId = `${generatedId}-listbox`;
    const helperId = helperText ? `${generatedId}-helper` : undefined;

    const selectedOption = options.find((opt) => opt.value === selectedValue);
    const enabledOptions = options.filter((opt) => !opt.disabled);

    const handleSelect = (optionValue: string) => {
      if (options.find((opt) => opt.value === optionValue)?.disabled) return;
      setSelectedValue(optionValue);
      onChange?.(optionValue);
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Reset focused index when opening
    React.useEffect(() => {
      if (isOpen) {
        const selectedIndex = options.findIndex((opt) => opt.value === selectedValue);
        setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
      }
    }, [isOpen, options, selectedValue]);

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (disabled) return;

      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (isOpen && focusedIndex >= 0) {
            const option = options[focusedIndex];
            if (option && !option.disabled) {
              handleSelect(option.value);
            }
          } else {
            setIsOpen(!isOpen);
          }
          break;
        case 'Escape':
          event.preventDefault();
          setIsOpen(false);
          triggerRef.current?.focus();
          break;
        case 'ArrowDown':
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setFocusedIndex((prev) => {
              let next = prev + 1;
              while (next < options.length && options[next]?.disabled) {
                next++;
              }
              return next < options.length ? next : prev;
            });
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setFocusedIndex((prev) => {
              let next = prev - 1;
              while (next >= 0 && options[next]?.disabled) {
                next--;
              }
              return next >= 0 ? next : prev;
            });
          }
          break;
        case 'Home':
          event.preventDefault();
          if (isOpen) {
            const firstEnabled = options.findIndex((opt) => !opt.disabled);
            if (firstEnabled >= 0) setFocusedIndex(firstEnabled);
          }
          break;
        case 'End':
          event.preventDefault();
          if (isOpen) {
            for (let i = options.length - 1; i >= 0; i--) {
              if (!options[i].disabled) {
                setFocusedIndex(i);
                break;
              }
            }
          }
          break;
      }
    };

    return (
      <div ref={ref} className={cn('w-full relative', className)}>
        {label && (
          <label id={labelId} className={labelVariants({ state })}>
            {label}
          </label>
        )}
        <div ref={containerRef} className="relative">
          <motion.button
            ref={triggerRef}
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-controls={listboxId}
            aria-labelledby={labelId}
            aria-describedby={helperId}
            aria-invalid={state === 'error' || undefined}
            className={selectTriggerVariants({ variant, size, state })}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            whileTap={{ scale: 0.99 }}
            transition={SPRING.tight}
          >
            <span className={cn(!selectedValue && 'text-white/40')}>
              {selectedOption?.label || placeholder}
            </span>
            <ChevronIcon isOpen={isOpen} />
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={listboxRef}
                id={listboxId}
                role="listbox"
                aria-labelledby={labelId}
                aria-activedescendant={focusedIndex >= 0 ? `${generatedId}-option-${focusedIndex}` : undefined}
                className={cn(
                  'absolute z-50 w-full mt-1',
                  'bg-void-light rounded-lg',
                  'border border-white/10',
                  'shadow-xl shadow-black/20',
                  'overflow-hidden',
                  'max-h-60 overflow-y-auto'
                )}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={SPRING.snappy}
              >
                {options.map((option, index) => (
                  <motion.button
                    key={option.value}
                    id={`${generatedId}-option-${index}`}
                    type="button"
                    role="option"
                    aria-selected={option.value === selectedValue}
                    aria-disabled={option.disabled}
                    className={cn(
                      'w-full px-4 py-2.5 text-sm text-left',
                      'transition-colors duration-150',
                      option.disabled
                        ? 'text-white/30 cursor-not-allowed'
                        : 'text-white hover:bg-white/5',
                      option.value === selectedValue && 'bg-gold/10 text-gold',
                      focusedIndex === index && !option.disabled && 'bg-white/10'
                    )}
                    onClick={() => handleSelect(option.value)}
                    disabled={option.disabled}
                    whileHover={!option.disabled ? { x: 4 } : undefined}
                    transition={SPRING.tight}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {helperText && (
          <span id={helperId} className={helperTextVariants({ state })}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select, selectTriggerVariants };
