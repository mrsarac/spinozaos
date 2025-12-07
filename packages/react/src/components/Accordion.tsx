// Accordion - Expandable content sections
// Extracted from Substance FAQ patterns

import React, { useState, useCallback, createContext, useContext } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Context for Accordion state
interface AccordionContextValue {
  openItems: Set<string>;
  toggleItem: (id: string) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
};

// Variants
const accordionVariants = cva(['space-y-2'], {
  variants: {
    variant: {
      default: '',
      bordered: '',
      separated: 'space-y-3',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const itemVariants = cva(
  ['overflow-hidden transition-colors duration-200'],
  {
    variants: {
      variant: {
        default: 'border border-white/10 bg-neutral-900/30',
        bordered: 'border border-white/10 bg-transparent',
        separated: 'border border-white/10 bg-neutral-900/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const triggerVariants = cva(
  [
    'w-full flex items-center justify-between',
    'text-left transition-colors',
  ],
  {
    variants: {
      size: {
        sm: 'p-3 text-sm',
        md: 'p-4',
        lg: 'p-5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// Types
export interface AccordionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
  /** Allow single or multiple items open */
  type?: 'single' | 'multiple';
  /** Default open items (by value) */
  defaultValue?: string[];
  /** Controlled open items */
  value?: string[];
  /** Callback when items change */
  onValueChange?: (value: string[]) => void;
}

export interface AccordionItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof itemVariants> {
  /** Unique value for this item */
  value: string;
  /** Disable this item */
  disabled?: boolean;
}

export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof triggerVariants> {
  /** Icon to show (default: ChevronDown) */
  icon?: React.ReactNode;
  /** Hide the icon */
  hideIcon?: boolean;
}

export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Force mount (stay in DOM when closed) */
  forceMount?: boolean;
}

// Main Accordion Component
export function Accordion({
  type = 'single',
  defaultValue = [],
  value,
  onValueChange,
  variant,
  className,
  children,
  ...props
}: AccordionProps) {
  const [internalOpen, setInternalOpen] = useState<Set<string>>(
    new Set(defaultValue)
  );

  const openItems = value !== undefined ? new Set(value) : internalOpen;

  const toggleItem = useCallback(
    (id: string) => {
      const newOpen = new Set(openItems);

      if (newOpen.has(id)) {
        newOpen.delete(id);
      } else {
        if (type === 'single') {
          newOpen.clear();
        }
        newOpen.add(id);
      }

      if (value === undefined) {
        setInternalOpen(newOpen);
      }
      onValueChange?.(Array.from(newOpen));
    },
    [openItems, type, value, onValueChange]
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div className={accordionVariants({ variant, className })} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// Accordion Item
interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
  disabled: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('AccordionItem components must be used within an AccordionItem');
  }
  return context;
};

export function AccordionItem({
  value,
  disabled = false,
  variant,
  className,
  children,
  ...props
}: AccordionItemProps) {
  const { openItems } = useAccordionContext();
  const isOpen = openItems.has(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen, disabled }}>
      <div
        className={itemVariants({ variant, className })}
        data-state={isOpen ? 'open' : 'closed'}
        data-disabled={disabled || undefined}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

// Accordion Trigger
export function AccordionTrigger({
  size,
  icon,
  hideIcon = false,
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  const { toggleItem } = useAccordionContext();
  const { value, isOpen, disabled } = useAccordionItemContext();

  return (
    <button
      type="button"
      onClick={() => !disabled && toggleItem(value)}
      disabled={disabled}
      aria-expanded={isOpen}
      className={`${triggerVariants({ size, className })} ${
        disabled
          ? 'cursor-not-allowed opacity-50'
          : 'hover:bg-white/5 cursor-pointer'
      }`}
      {...props}
    >
      <span className="flex-1 text-white font-medium">{children}</span>
      {!hideIcon && (
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-neutral-500"
        >
          {icon || <ChevronDown size={20} />}
        </motion.span>
      )}
    </button>
  );
}

// Accordion Content
export function AccordionContent({
  forceMount = false,
  className,
  children,
  ...props
}: AccordionContentProps) {
  const { isOpen } = useAccordionItemContext();

  if (!forceMount && !isOpen) {
    return null;
  }

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <div
            className={`px-4 pb-4 text-neutral-400 text-sm leading-relaxed ${className || ''}`}
            {...props}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Preset: FAQ Accordion
export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export interface FAQAccordionProps extends Omit<AccordionProps, 'children'> {
  items: FAQItem[];
  /** Show question icon */
  showIcon?: boolean;
}

export function FAQAccordion({
  items,
  showIcon = false,
  ...props
}: FAQAccordionProps) {
  return (
    <Accordion type="single" {...props}>
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>
            {showIcon && (
              <span className="mr-3 text-spinoza-yellow/50">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
              </span>
            )}
            {item.question}
          </AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export {
  accordionVariants,
  itemVariants as accordionItemVariants,
  triggerVariants as accordionTriggerVariants,
};
