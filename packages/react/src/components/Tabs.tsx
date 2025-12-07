// Tabs - Tab navigation component
// Extracted from Substance Leaderboard patterns

import React, { useState, createContext, useContext, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// Context
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
};

// Variants
const tabsListVariants = cva(['flex'], {
  variants: {
    variant: {
      default: 'gap-2',
      pills: 'gap-1 p-1 bg-white/5 rounded-lg',
      underline: 'gap-0 border-b border-white/10',
      segment: 'gap-0 p-1 bg-neutral-900 rounded-lg',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

const tabTriggerVariants = cva(
  [
    'relative font-mono uppercase tracking-wide',
    'transition-all duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-spinoza-yellow/50',
  ],
  {
    variants: {
      variant: {
        default: [
          'px-4 py-2',
          'data-[state=active]:bg-spinoza-yellow data-[state=active]:text-black',
          'data-[state=inactive]:bg-white/5 data-[state=inactive]:text-neutral-400',
          'data-[state=inactive]:hover:bg-white/10',
        ],
        pills: [
          'px-3 py-1.5 rounded-md',
          'data-[state=active]:bg-white/10 data-[state=active]:text-white',
          'data-[state=inactive]:text-neutral-400',
          'data-[state=inactive]:hover:text-neutral-300',
        ],
        underline: [
          'px-4 py-3 border-b-2 -mb-px',
          'data-[state=active]:border-spinoza-yellow data-[state=active]:text-white',
          'data-[state=inactive]:border-transparent data-[state=inactive]:text-neutral-400',
          'data-[state=inactive]:hover:text-neutral-300 data-[state=inactive]:hover:border-white/20',
        ],
        segment: [
          'flex-1 px-4 py-2 rounded-md text-center',
          'data-[state=active]:bg-white/10 data-[state=active]:text-white',
          'data-[state=inactive]:text-neutral-400',
          'data-[state=inactive]:hover:text-neutral-300',
        ],
      },
      size: {
        sm: 'text-[10px] px-3 py-1.5',
        md: 'text-xs',
        lg: 'text-sm px-5 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// Types
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Default active tab */
  defaultValue?: string;
  /** Controlled active tab */
  value?: string;
  /** Callback when tab changes */
  onValueChange?: (value: string) => void;
}

export interface TabsListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsListVariants> {}

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tabTriggerVariants> {
  /** Tab value */
  value: string;
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tab value */
  value: string;
  /** Animate content change */
  animated?: boolean;
}

// Components
export function Tabs({
  defaultValue = '',
  value,
  onValueChange,
  className,
  children,
  ...props
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeTab = value !== undefined ? value : internalValue;

  const setActiveTab = useCallback(
    (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [value, onValueChange]
  );

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// Store variant in context for triggers
interface TabsListContextValue {
  variant: VariantProps<typeof tabTriggerVariants>['variant'];
  size: VariantProps<typeof tabTriggerVariants>['size'];
}

const TabsListContext = createContext<TabsListContextValue>({
  variant: 'default',
  size: 'md',
});

export function TabsList({
  variant,
  size,
  className,
  children,
  ...props
}: TabsListProps) {
  return (
    <TabsListContext.Provider value={{ variant, size }}>
      <div
        role="tablist"
        className={tabsListVariants({ variant, size, className })}
        {...props}
      >
        {children}
      </div>
    </TabsListContext.Provider>
  );
}

export function TabsTrigger({
  value,
  variant: variantProp,
  size: sizeProp,
  className,
  children,
  ...props
}: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useTabsContext();
  const { variant: listVariant, size: listSize } = useContext(TabsListContext);

  const variant = variantProp || listVariant;
  const size = sizeProp || listSize;
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? 'active' : 'inactive'}
      onClick={() => setActiveTab(value)}
      className={tabTriggerVariants({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  animated = false,
  className,
  children,
  ...props
}: TabsContentProps) {
  const { activeTab } = useTabsContext();
  const isActive = activeTab === value;

  if (!isActive) return null;

  // Use CSS animations to avoid Framer Motion TypeScript conflicts
  const animatedClass = animated ? 'animate-[fadeInUp_0.2s_ease-out]' : '';

  return (
    <div
      role="tabpanel"
      className={`${animatedClass} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
}

// Preset: Period Tabs (from Leaderboard)
export interface PeriodTabsProps {
  value: 'all' | 'month' | 'week';
  onChange: (value: 'all' | 'month' | 'week') => void;
  labels?: {
    all?: string;
    month?: string;
    week?: string;
  };
}

export function PeriodTabs({
  value,
  onChange,
  labels = {},
}: PeriodTabsProps) {
  const defaultLabels = {
    all: 'All Time',
    month: 'This Month',
    week: 'This Week',
  };

  const mergedLabels = { ...defaultLabels, ...labels };

  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as typeof value)}>
      <TabsList variant="default" size="sm">
        <TabsTrigger value="all">{mergedLabels.all}</TabsTrigger>
        <TabsTrigger value="month">{mergedLabels.month}</TabsTrigger>
        <TabsTrigger value="week">{mergedLabels.week}</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export { tabsListVariants, tabTriggerVariants };
