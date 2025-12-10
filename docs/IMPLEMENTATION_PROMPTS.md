# SpinozaOS Implementation Prompts

> Self-contained prompts for the Software Team to implement Substance Style Guide updates.
> Each prompt is designed to be executed independently with full context.

---

## Table of Contents

1. [Token Rebrand Prompts](#1-token-rebrand-prompts)
   - [1.1 Color Token Updates](#11-color-token-updates)
   - [1.2 Typography Token Updates](#12-typography-token-updates)
   - [1.3 Animation Token Updates](#13-animation-token-updates)
   - [1.4 Effects Token Updates](#14-effects-token-updates)
2. [Core Component Rebrand Prompts](#2-core-component-rebrand-prompts)
   - [2.1 Button Component](#21-button-component)
   - [2.2 Card Component](#22-card-component)
   - [2.3 Input Component](#23-input-component)
   - [2.4 Badge Component](#24-badge-component)
   - [2.5 Tabs Component](#25-tabs-component)
   - [2.6 Modal Component](#26-modal-component)
3. [New Component Prompts](#3-new-component-prompts)
   - [3.1 DataGrid Component](#31-datagrid-component)
   - [3.2 Terminal Component](#32-terminal-component)
   - [3.3 LiveTicker Component](#33-liveticker-component)
   - [3.4 GaugeCluster Component](#34-gaugecluster-component)

---

## 1. Token Rebrand Prompts

### 1.1 Color Token Updates

**File:** `/packages/tokens/src/index.ts`

**Task:** Add new color tokens extracted from Substance Style Guide.

---

#### The Prompt

```
You are a Design System Engineer updating SpinozaOS tokens.

FILE TO MODIFY: /packages/tokens/src/index.ts

ADD the following new color tokens to the existing `colors` object:

1. Terminal-specific colors (new nested object):
```typescript
terminal: {
  bg: '#020617',
  input: '#fbbf24',
  output: '#94a3b8',
  error: '#ef4444',
  success: '#22c55e',
  info: '#3b82f6',
  cursor: '#fbbf24',
},
```

2. Data visualization colors (new nested object):
```typescript
dataViz: {
  primary: '#fbbf24',
  secondary: '#14b8a6',
  tertiary: '#8b5cf6',
  quaternary: '#6366f1',
  positive: '#22c55e',
  negative: '#ef4444',
  neutral: '#64748b',
},
```

3. Add to existing glitch object:
```typescript
glitch: {
  cyan: '#00FFF9',
  magenta: '#FF00C1',
  // ADD THESE:
  glowCyan: 'rgba(0, 255, 249, 0.3)',
  glowMagenta: 'rgba(255, 0, 193, 0.3)',
},
```

4. Add border color tokens to semantic object:
```typescript
border: {
  subtle: 'rgba(255, 255, 255, 0.05)',
  default: 'rgba(255, 255, 255, 0.10)',
  hover: 'rgba(251, 191, 36, 0.30)',
  focus: '#fbbf24',
  active: 'rgba(251, 191, 36, 0.50)',
},
```

RULES:
- Use `as const` for type safety
- Maintain existing structure
- Do NOT remove any existing tokens
- Export in the main tokens object
```

---

#### Implementation Notes

- Adds terminal-specific colors for Terminal component
- Adds data visualization palette for DataGrid and charts
- Extends glitch effects with glow variants
- Adds comprehensive border token system

---

### 1.2 Typography Token Updates

**File:** `/packages/tokens/src/index.ts`

**Task:** Add data-specific typography tokens for Bloomberg-style displays.

---

#### The Prompt

```
You are a Design System Engineer updating SpinozaOS typography tokens.

FILE TO MODIFY: /packages/tokens/src/index.ts

LOCATE the `typography` object and ADD the following:

1. Add data-specific font sizes to `fontSize`:
```typescript
fontSize: {
  // ... existing sizes ...

  // Data Display Sizes (for StatCard, DataGrid, Gauges)
  'data-xs': '0.875rem',   // 14px - small data labels
  'data-sm': '1.25rem',    // 20px - secondary values
  'data-md': '1.5rem',     // 24px - standard values
  'data-lg': '2.25rem',    // 36px - large values
  'data-xl': '3rem',       // 48px - hero numbers
  'data-2xl': '4rem',      // 64px - massive displays
},
```

2. Add new lineHeight values:
```typescript
lineHeight: {
  // ... existing values ...
  terminal: '1.6',         // Terminal output
  data: '1',               // Data displays (no extra height)
},
```

3. Add new letterSpacing values:
```typescript
letterSpacing: {
  // ... existing values ...
  data: '0.02em',          // Slight spacing for readability
  label: '0.05em',         // Uppercase labels
  mono: '0',               // Monospace default
},
```

4. Add textTransform tokens (new object):
```typescript
textTransform: {
  label: 'uppercase',
  data: 'none',
  heading: 'none',
} as const,
```

RULES:
- Preserve all existing typography values
- Add to existing objects, don't replace
- Use rem units for fontSize
- Export in main tokens object
```

---

#### Implementation Notes

- Data-specific sizes support Bloomberg-style large number displays
- Terminal line height optimized for log readability
- Label letter spacing follows Substance style (0.05em uppercase)

---

### 1.3 Animation Token Updates

**File:** `/packages/motion/src/index.ts`

**Task:** Add new animation presets for Substance components.

---

#### The Prompt

```
You are a Motion Designer updating SpinozaOS animation system.

FILE TO MODIFY: /packages/motion/src/index.ts

ADD the following new animation configurations:

1. Add to VARIANTS object - Glitch animations:
```typescript
glitch: {
  initial: { x: 0, skewX: 0 },
  animate: {
    x: [0, -2, 2, -2, 0],
    skewX: [0, 2, -2, 1, 0],
    transition: {
      duration: 0.3,
      times: [0, 0.2, 0.4, 0.6, 1],
      repeat: 0,
    },
  },
},
glitchLoop: {
  animate: {
    x: [0, -2, 2, -2, 2, 0],
    skewX: [0, 2, -2, 1, -1, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: 3,
    },
  },
},
```

2. Add ticker animation variant:
```typescript
tickerScroll: {
  animate: {
    x: [0, '-50%'],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 30,
        ease: 'linear',
      },
    },
  },
},
tickerScrollFast: {
  animate: {
    x: [0, '-50%'],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 15,
        ease: 'linear',
      },
    },
  },
},
```

3. Add gauge animation variant:
```typescript
gaugeFill: {
  initial: { pathLength: 0 },
  animate: (progress: number) => ({
    pathLength: progress,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
},
```

4. Add typewriter variant:
```typescript
typewriter: {
  initial: { width: 0 },
  animate: {
    width: '100%',
    transition: {
      duration: 2,
      ease: 'linear',
    },
  },
},
```

5. Add scanline effect:
```typescript
scanline: {
  animate: {
    y: ['-100%', '100%'],
    transition: {
      y: {
        repeat: Infinity,
        duration: 8,
        ease: 'linear',
      },
    },
  },
},
```

6. Add to MICRO object - new hover effects:
```typescript
// In MICRO.hover, add:
glowCyan: { boxShadow: '0 0 20px rgba(0, 255, 249, 0.3)' },
glowMagenta: { boxShadow: '0 0 20px rgba(255, 0, 193, 0.3)' },
borderGlow: { borderColor: 'rgba(251, 191, 36, 0.5)' },
```

7. Add TICKER_SPEEDS constant:
```typescript
export const TICKER_SPEEDS = {
  slow: 60,      // seconds for full scroll
  normal: 30,
  fast: 15,
} as const;
```

8. Add TYPEWRITER constant:
```typescript
export const TYPEWRITER = {
  charDelay: 50,      // ms between characters
  cursorBlink: 530,   // ms cursor blink interval
} as const;
```

RULES:
- All animations must respect prefersReducedMotion
- Use spring physics where appropriate
- Include TypeScript types
- Export all new constants
```

---

#### Implementation Notes

- Glitch animations support error states and sci-fi aesthetic
- Ticker speeds match Substance style guide specifications
- Gauge fill uses custom easing for smooth arc animation
- Typewriter matches terminal aesthetic

---

### 1.4 Effects Token Updates

**File:** `/packages/tokens/src/index.ts`

**Task:** Add new effect tokens for glassmorphism, glows, and special effects.

---

#### The Prompt

```
You are a Design System Engineer adding effect tokens to SpinozaOS.

FILE TO MODIFY: /packages/tokens/src/index.ts

ADD the following new effect configurations:

1. Update the `shadows` object with text glow additions:
```typescript
shadows: {
  // ... existing shadows ...

  textGlow: {
    yellow: '0 0 10px rgba(251, 191, 36, 0.5), 0 0 20px rgba(251, 191, 36, 0.3)',
    indigo: '0 0 10px rgba(99, 102, 241, 0.5), 0 0 20px rgba(99, 102, 241, 0.3)',
    cyan: '0 0 10px rgba(0, 255, 249, 0.5), 0 0 20px rgba(0, 255, 249, 0.3)',
    magenta: '0 0 10px rgba(255, 0, 193, 0.5), 0 0 20px rgba(255, 0, 193, 0.3)',
  },
},
```

2. Add new `effects` object for special visual treatments:
```typescript
export const effects = {
  // Scanline overlay (CRT effect)
  scanline: {
    background: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.15) 50%)',
    backgroundSize: '100% 4px',
    pointerEvents: 'none',
  },

  // Nano grid backgrounds
  nanoGrid: {
    standard: {
      backgroundImage: `
        linear-gradient(rgba(251, 191, 36, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(251, 191, 36, 0.03) 1px, transparent 1px)
      `,
      backgroundSize: '20px 20px',
    },
    dense: {
      backgroundImage: `
        linear-gradient(rgba(251, 191, 36, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(251, 191, 36, 0.05) 1px, transparent 1px)
      `,
      backgroundSize: '10px 10px',
    },
    indigo: {
      backgroundImage: `
        linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
      `,
      backgroundSize: '20px 20px',
    },
  },

  // Noise texture (for grain effect)
  noise: {
    opacity: 0.03,
    mixBlendMode: 'overlay',
  },

  // Vignette effect
  vignette: {
    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(2, 6, 23, 0.8) 100%)',
    pointerEvents: 'none',
  },
} as const;
```

3. Add component-specific tokens:
```typescript
export const componentTokens = {
  dataGrid: {
    headerBg: '#0f172a',
    rowBorder: 'rgba(255, 255, 255, 0.05)',
    rowHoverBg: 'rgba(255, 255, 255, 0.03)',
    cellPadding: '0.5rem 1rem',
    headerPadding: '0.75rem 1rem',
    fontSize: '12px',
    headerFontSize: '10px',
  },

  terminal: {
    bg: '#020617',
    border: 'rgba(255, 255, 255, 0.10)',
    borderRadius: '0.5rem',
    padding: '1rem',
    fontSize: '13px',
    lineHeight: '1.6',
    maxHeight: '400px',
  },

  ticker: {
    bg: '#0f172a',
    border: 'rgba(255, 255, 255, 0.05)',
    itemPadding: '0.75rem 1.5rem',
    fontSize: '12px',
    height: '44px',
  },

  gauge: {
    sizes: {
      sm: { width: 80, height: 40, strokeWidth: 6 },
      md: { width: 120, height: 60, strokeWidth: 8 },
      lg: { width: 160, height: 80, strokeWidth: 10 },
    },
    trackColor: '#1e293b',
    fillColor: '#fbbf24',
    labelFontSize: '10px',
    valueFontSize: '1.5rem',
  },

  commandPalette: {
    maxWidth: '560px',
    maxHeight: '400px',
    inputPadding: '1rem 1.5rem',
    itemPadding: '0.75rem',
    itemBorderRadius: '0.5rem',
    overlayBg: 'rgba(0, 0, 0, 0.70)',
    overlayBlur: '8px',
  },
} as const;
```

4. Export in main tokens object:
```typescript
export const tokens = {
  // ... existing exports ...
  effects,
  componentTokens,
} as const;
```

RULES:
- All opacity values must be subtle (0.03-0.10 range)
- Include pointerEvents: 'none' for overlay effects
- Use CSS custom property-compatible values
- Maintain TypeScript const assertions
```

---

#### Implementation Notes

- Scanline effect creates CRT monitor aesthetic
- Nano grid provides Bloomberg terminal background pattern
- Component tokens centralize all component-specific values
- Effects are designed to layer without interfering with interactions

---

## 2. Core Component Rebrand Prompts

### 2.1 Button Component

**File:** `/packages/react/src/components/Button.tsx`

**Task:** Add new variants and enhance motion for Substance style.

---

#### The Prompt

```
You are a React Component Engineer updating the SpinozaOS Button component.

FILE TO MODIFY: /packages/react/src/components/Button.tsx

CURRENT STATE:
The Button has variants: primary, secondary, ghost, oracle
The Button uses SPRING.tight and MICRO.hover.scale

REQUIRED CHANGES:

1. Add new variants to buttonVariants:
```typescript
variant: {
  // ... existing variants ...

  // New: Danger variant
  danger: [
    'bg-error text-white',
    'hover:bg-error/90 hover:shadow-glow-error',
  ],

  // New: Success variant
  success: [
    'bg-success text-void',
    'hover:bg-success/90 hover:shadow-glow-success',
  ],

  // New: Outline variant (gold border, transparent bg)
  outline: [
    'bg-transparent text-spinoza-yellow',
    'border border-spinoza-yellow/50',
    'hover:bg-spinoza-yellow/10 hover:border-spinoza-yellow',
  ],

  // New: Terminal variant (monospace, green text)
  terminal: [
    'bg-void text-success font-mono',
    'border border-success/30',
    'hover:border-success/50 hover:shadow-glow-success',
    'uppercase tracking-wider text-xs',
  ],
},
```

2. Add glow animation on hover for primary and oracle:
```typescript
// Update primary variant:
primary: [
  'bg-spinoza-yellow text-void',
  'hover:bg-spinoza-gold hover:shadow-glow-yellow',
],

// Update oracle variant:
oracle: [
  'bg-oracle-purple text-white',
  'hover:shadow-glow-oracle hover:scale-[1.02]',
],
```

3. Add icon-only sizes:
```typescript
size: {
  // ... existing sizes ...
  'icon-sm': 'h-8 w-8 p-0',
  'icon-lg': 'h-12 w-12 p-0',
},
```

4. Add loading state support in ButtonProps:
```typescript
export interface ButtonProps ... {
  // ... existing props ...
  loading?: boolean;
  loadingText?: string;
}
```

5. Update component to handle loading:
```typescript
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    loading = false,
    loadingText,
    children,
    disabled,
    ...props
  }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        whileHover={!isDisabled ? MICRO.hover.scale : undefined}
        whileTap={!isDisabled ? MICRO.tap.press : undefined}
        transition={SPRING.tight}
        {...props}
      >
        {loading ? (
          <>
            <Spinner size="sm" className="mr-2" />
            {loadingText || children}
          </>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);
```

6. Add import for Spinner at top:
```typescript
import { Spinner } from './Progress';
```

BEFORE (primary variant):
```typescript
primary: [
  'bg-spinoza-yellow text-void',
  'hover:bg-spinoza-gold',
],
```

AFTER (primary variant):
```typescript
primary: [
  'bg-spinoza-yellow text-void',
  'hover:bg-spinoza-gold hover:shadow-glow-yellow',
],
```

RULES:
- Maintain backward compatibility
- Use CVA for all variant styling
- All interactive states must have motion
- Export new variant types
```

---

#### Implementation Notes

- Glow effects on hover add Substance sci-fi aesthetic
- Terminal variant supports command-line UI patterns
- Loading state prevents layout shift with inline spinner
- Icon sizes support toolbar/action bar use cases

---

### 2.2 Card Component

**File:** `/packages/react/src/components/Card.tsx`

**Task:** Add nano-grid background variant and enhanced interactive states.

---

#### The Prompt

```
You are a React Component Engineer updating the SpinozaOS Card component.

FILE TO MODIFY: /packages/react/src/components/Card.tsx

CURRENT STATE:
Card has variants: default, glass, elevated, interactive
Card uses SPRING.soft and VARIANTS.fadeInUp

REQUIRED CHANGES:

1. Add new variants to cardVariants:
```typescript
variant: {
  // ... existing variants ...

  // New: Data card with nano-grid background
  data: [
    'bg-void-light',
    'border-white/5',
    // Nano grid background
    'bg-[linear-gradient(rgba(251,191,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.03)_1px,transparent_1px)]',
    'bg-[size:20px_20px]',
  ],

  // New: Terminal-style card
  terminal: [
    'bg-void font-mono',
    'border border-success/20',
    'rounded-lg',
  ],

  // New: Oracle premium card
  oracle: [
    'bg-void-light',
    'border border-oracle-purple/30',
    'hover:border-oracle-purple/50',
    'hover:shadow-glow-oracle',
  ],

  // New: Stat card (compact, no padding by default)
  stat: [
    'bg-void-light',
    'border-r border-white/5 last:border-r-0',
  ],
},
```

2. Add glow effect variant:
```typescript
glow: {
  none: '',
  yellow: 'hover:shadow-glow-yellow',
  oracle: 'hover:shadow-glow-oracle',
  success: 'hover:shadow-glow-success',
  teal: 'hover:shadow-glow-teal',
},
```

3. Update interactive variant with border glow:
```typescript
interactive: [
  'cursor-pointer',
  'hover:border-spinoza-yellow/30',
  'hover:bg-white/[0.02]',
  'transition-all duration-200',
],
```

4. Add CardHeader and CardFooter sub-components:
```typescript
// Add after Card component
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'px-6 pt-6 pb-0',
      'border-b border-white/5 mb-6 pb-4',
      className
    )}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'px-6 pb-6 pt-0',
      'border-t border-white/5 mt-6 pt-4',
      'flex items-center justify-end gap-3',
      className
    )}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';
```

5. Export the new sub-components:
```typescript
export { Card, CardHeader, CardFooter, cardVariants };
```

BEFORE (interactive variant):
```typescript
interactive: [
  'cursor-pointer',
  'hover:border-spinoza-yellow/30',
],
```

AFTER (interactive variant):
```typescript
interactive: [
  'cursor-pointer',
  'hover:border-spinoza-yellow/30',
  'hover:bg-white/[0.02]',
  'transition-all duration-200',
],
```

RULES:
- Nano-grid uses Tailwind arbitrary values
- Sub-components are composable (not required)
- Maintain existing API compatibility
- Export type definitions
```

---

#### Implementation Notes

- Data variant provides Bloomberg terminal aesthetic
- Terminal variant for log displays and command output
- Oracle variant for premium/special content
- CardHeader/CardFooter enable consistent card layouts

---

### 2.3 Input Component

**File:** `/packages/react/src/components/Input.tsx`

**Task:** Add terminal and data-entry variants with enhanced focus states.

---

#### The Prompt

```
You are a React Component Engineer updating the SpinozaOS Input component.

FILE TO MODIFY: /packages/react/src/components/Input.tsx

CURRENT STATE:
Input has variants: default, ghost, glass
Input has states: default, error, success

REQUIRED CHANGES:

1. Add new variants to inputVariants:
```typescript
variant: {
  // ... existing variants ...

  // New: Terminal-style input
  terminal: [
    'bg-void text-success font-mono',
    'border border-success/30 rounded-none',
    'placeholder:text-success/50',
    'focus:border-success focus:ring-success/30',
    'caret-success',
  ],

  // New: Data entry (monospace, right-aligned numbers)
  data: [
    'bg-void-light font-mono text-right',
    'border border-white/10',
    'placeholder:text-neutral-600',
    'focus:border-spinoza-yellow focus:ring-spinoza-yellow/30',
    'tabular-nums',
  ],

  // New: Search input
  search: [
    'bg-void-light pl-10',
    'border border-white/10 rounded-full',
    'placeholder:text-neutral-500',
    'focus:border-spinoza-yellow/50 focus:ring-spinoza-yellow/20',
  ],
},
```

2. Add focus glow animation - update base styles:
```typescript
const inputVariants = cva(
  [
    'w-full rounded-lg',
    'bg-void-light text-white',
    'border border-white/10',
    'placeholder:text-neutral-500',
    'transition-all duration-200',
    // Enhanced focus with glow
    'focus:outline-none focus:ring-2 focus:ring-spinoza-yellow/50 focus:border-spinoza-yellow',
    'focus:shadow-[0_0_20px_rgba(251,191,36,0.15)]',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  // ... rest of config
);
```

3. Add prefix/suffix support to InputProps:
```typescript
export interface InputProps ... {
  // ... existing props ...
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}
```

4. Update component render to handle prefix/suffix:
```typescript
<div className="relative">
  {prefix && (
    <div className="absolute left-0 top-0 bottom-0 flex items-center pl-3 text-neutral-500 pointer-events-none">
      {prefix}
    </div>
  )}
  {leftIcon && !prefix && (
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
      {leftIcon}
    </div>
  )}
  <motion.input
    // ... existing props
    className={cn(
      inputVariants({ variant, size, state, className }),
      (leftIcon || prefix) && 'pl-10',
      (rightIcon || suffix) && 'pr-10'
    )}
  />
  {suffix && (
    <div className="absolute right-0 top-0 bottom-0 flex items-center pr-3 text-neutral-500">
      {suffix}
    </div>
  )}
  {rightIcon && !suffix && (
    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
      {rightIcon}
    </div>
  )}
</div>
```

5. Add character counter option:
```typescript
export interface InputProps ... {
  // ... existing props ...
  maxLength?: number;
  showCount?: boolean;
}

// In render, after input:
{showCount && maxLength && (
  <span className="absolute right-3 bottom-1 text-xs text-neutral-500 font-mono">
    {(props.value?.toString().length || 0)}/{maxLength}
  </span>
)}
```

BEFORE (base styles):
```typescript
'focus:outline-none focus:ring-2 focus:ring-spinoza-yellow/50 focus:border-spinoza-yellow',
```

AFTER (base styles):
```typescript
'focus:outline-none focus:ring-2 focus:ring-spinoza-yellow/50 focus:border-spinoza-yellow',
'focus:shadow-[0_0_20px_rgba(251,191,36,0.15)]',
```

RULES:
- Terminal variant uses green color scheme
- Data variant is right-aligned for numbers
- Focus glow must be subtle (0.15 opacity)
- Maintain accessibility (aria attributes)
```

---

#### Implementation Notes

- Terminal variant matches command-line aesthetic
- Data variant optimized for numeric input with tabular-nums
- Search variant with rounded-full for search bars
- Focus glow adds Substance sci-fi aesthetic

---

### 2.4 Badge Component

**File:** `/packages/react/src/components/Badge.tsx`

**Task:** Add pulse animation and new status variants.

---

#### The Prompt

```
You are a React Component Engineer updating the SpinozaOS Badge component.

FILE TO MODIFY: /packages/react/src/components/Badge.tsx

TASK: Add new variants and pulse animation capability.

REQUIRED CHANGES:

1. Add new variants to badgeVariants:
```typescript
variant: {
  // ... existing variants ...

  // New: Live/active status with pulse
  live: [
    'bg-success/10 text-success border border-success/30',
    'relative overflow-visible',
  ],

  // New: Processing/loading status
  processing: [
    'bg-spinoza-yellow/10 text-spinoza-yellow border border-spinoza-yellow/30',
  ],

  // New: Error/alert status
  alert: [
    'bg-error/10 text-error border border-error/30',
  ],

  // New: Neutral/inactive
  inactive: [
    'bg-neutral-800 text-neutral-400 border border-neutral-700',
  ],

  // New: Oracle premium
  oracle: [
    'bg-oracle-purple/10 text-oracle-purple border border-oracle-purple/30',
  ],

  // New: Terminal style
  terminal: [
    'bg-void text-success font-mono border border-success/30',
    'uppercase tracking-wider',
  ],
},
```

2. Add pulse prop to BadgeProps:
```typescript
export interface BadgeProps ... {
  // ... existing props ...
  pulse?: boolean;
  dot?: boolean;
  dotColor?: 'success' | 'error' | 'warning' | 'info' | 'spinoza';
}
```

3. Add pulse animation dot component:
```typescript
const PulseDot = ({ color = 'success' }: { color?: string }) => {
  const colorClasses = {
    success: 'bg-success',
    error: 'bg-error',
    warning: 'bg-warning',
    info: 'bg-info',
    spinoza: 'bg-spinoza-yellow',
  };

  return (
    <span className="relative flex h-2 w-2 mr-1.5">
      <span
        className={cn(
          'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
          colorClasses[color as keyof typeof colorClasses] || colorClasses.success
        )}
      />
      <span
        className={cn(
          'relative inline-flex rounded-full h-2 w-2',
          colorClasses[color as keyof typeof colorClasses] || colorClasses.success
        )}
      />
    </span>
  );
};
```

4. Update Badge render to include dot:
```typescript
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, pulse, dot, dotColor, children, ...props }, ref) => {
    return (
      <motion.span
        className={cn(badgeVariants({ variant, size, className }))}
        ref={ref}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={SPRING.bouncy}
        {...props}
      >
        {(pulse || dot) && <PulseDot color={dotColor} />}
        {children}
      </motion.span>
    );
  }
);
```

5. Update live variant hover effect:
```typescript
// Add to motion.span props for live variant
whileHover={variant === 'live' ? { scale: 1.05 } : undefined}
```

BEFORE:
```typescript
// Basic badge without dot support
```

AFTER:
```typescript
// Badge with pulse dot for live status
<Badge variant="live" pulse dotColor="success">
  LIVE
</Badge>
```

RULES:
- Pulse animation uses Tailwind animate-ping
- Dot colors must match semantic color system
- Maintain badge as inline element
- Animation must respect reduced motion
```

---

#### Implementation Notes

- Live variant with pulse indicates real-time data
- Terminal variant matches command-line aesthetic
- Dot component is reusable across the system
- Bouncy spring animation on mount adds polish

---

### 2.5 Tabs Component

**File:** `/packages/react/src/components/Tabs.tsx`

**Task:** Add underline variant and enhanced active state animations.

---

#### The Prompt

```
You are a React Component Engineer updating the SpinozaOS Tabs component.

FILE TO MODIFY: /packages/react/src/components/Tabs.tsx

TASK: Add underline variant with animated indicator and enhanced styling.

REQUIRED CHANGES:

1. Add new variant to tabsListVariants:
```typescript
variant: {
  // ... existing variants ...

  // New: Underline style (like browser tabs)
  underline: [
    'border-b border-white/10',
    'gap-0',
  ],

  // New: Pill/segment style
  pills: [
    'bg-void-lighter rounded-lg p-1',
    'gap-1',
  ],

  // New: Terminal style
  terminal: [
    'border border-success/20 rounded-none',
    'gap-0 p-0',
  ],
},
```

2. Add corresponding trigger variants:
```typescript
variant: {
  // ... existing variants ...

  underline: [
    'relative px-4 py-2 text-neutral-400',
    'border-b-2 border-transparent -mb-px',
    'hover:text-white',
    'data-[state=active]:text-white data-[state=active]:border-spinoza-yellow',
  ],

  pills: [
    'px-4 py-1.5 rounded-md text-neutral-400',
    'hover:text-white hover:bg-white/5',
    'data-[state=active]:bg-spinoza-yellow data-[state=active]:text-void',
  ],

  terminal: [
    'px-4 py-2 font-mono text-xs uppercase tracking-wider',
    'border-r border-success/20 last:border-r-0',
    'text-success/60 hover:text-success hover:bg-success/5',
    'data-[state=active]:bg-success/10 data-[state=active]:text-success',
  ],
},
```

3. Add animated underline indicator (for underline variant):
```typescript
// Create AnimatedUnderline component
const AnimatedUnderline = ({ activeTab }: { activeTab: string }) => {
  const [indicatorStyle, setIndicatorStyle] = React.useState({});

  React.useEffect(() => {
    const activeElement = document.querySelector(
      `[data-state="active"][data-value="${activeTab}"]`
    );
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement as HTMLElement;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <motion.div
      className="absolute bottom-0 h-0.5 bg-spinoza-yellow"
      animate={indicatorStyle}
      transition={SPRING.tight}
    />
  );
};
```

4. Update TabsList to support animated indicator:
```typescript
export interface TabsListProps ... {
  // ... existing props ...
  animated?: boolean;
}

// In TabsList render (when variant is underline and animated):
{variant === 'underline' && animated && (
  <AnimatedUnderline activeTab={/* pass from context */} />
)}
```

5. Add icon support to TabsTrigger:
```typescript
export interface TabsTriggerProps ... {
  // ... existing props ...
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

// In render:
<motion.button ...>
  {icon && iconPosition === 'left' && (
    <span className="mr-2">{icon}</span>
  )}
  {children}
  {icon && iconPosition === 'right' && (
    <span className="ml-2">{icon}</span>
  )}
</motion.button>
```

BEFORE (default trigger):
```typescript
'data-[state=active]:bg-spinoza-yellow data-[state=active]:text-black',
```

AFTER (with transition):
```typescript
'data-[state=active]:bg-spinoza-yellow data-[state=active]:text-black',
'transition-all duration-200',
```

RULES:
- Underline indicator must use spring animation
- Terminal variant uses monospace font
- All variants must maintain keyboard navigation
- Export all new variant types
```

---

#### Implementation Notes

- Underline variant matches modern web app patterns
- Pills variant for segment controls
- Terminal variant for command-line interfaces
- Animated underline provides smooth UX feedback

---

### 2.6 Modal Component

**File:** `/packages/react/src/components/Modal.tsx`

**Task:** Add terminal and oracle variants with enhanced animations.

---

#### The Prompt

```
You are a React Component Engineer updating the SpinozaOS Modal component.

FILE TO MODIFY: /packages/react/src/components/Modal.tsx

TASK: Add new modal variants and enhance entrance/exit animations.

REQUIRED CHANGES:

1. Add new variants to modalContentVariants:
```typescript
variant: {
  // ... existing variants ...

  // New: Terminal style modal
  terminal: [
    'bg-void border border-success/30',
    'font-mono rounded-none',
    'shadow-[0_0_40px_rgba(34,197,94,0.1)]',
  ],

  // New: Oracle premium modal
  oracle: [
    'bg-void-light border border-oracle-purple/30',
    'shadow-[0_0_60px_rgba(139,92,246,0.15)]',
  ],

  // New: Alert/danger modal
  alert: [
    'bg-void-light border border-error/30',
    'shadow-[0_0_40px_rgba(239,68,68,0.1)]',
  ],

  // New: Full-screen modal
  fullscreen: [
    'w-screen h-screen max-w-none max-h-none',
    'rounded-none border-0',
    'bg-void',
  ],

  // New: Command palette style
  command: [
    'bg-void-light border border-white/10',
    'rounded-xl shadow-2xl',
    'max-w-xl w-full',
    'mt-[15vh]', // Positioned near top
  ],
},
```

2. Add enhanced animation variants:
```typescript
// Update animation variants
const modalAnimations = {
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  content: {
    default: {
      initial: { opacity: 0, scale: 0.95, y: 20 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95, y: 20 },
    },
    terminal: {
      initial: { opacity: 0, y: -20, scaleY: 0.9 },
      animate: { opacity: 1, y: 0, scaleY: 1 },
      exit: { opacity: 0, y: -20, scaleY: 0.9 },
    },
    oracle: {
      initial: { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
      animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
      exit: { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
    },
    command: {
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -50 },
    },
  },
};
```

3. Add close button variants:
```typescript
const closeButtonVariants = cva(
  [
    'absolute top-4 right-4',
    'p-2 rounded-lg transition-colors',
    'text-neutral-400 hover:text-white',
    'focus:outline-none focus:ring-2 focus:ring-spinoza-yellow/50',
  ],
  {
    variants: {
      variant: {
        default: 'hover:bg-white/5',
        terminal: 'hover:bg-success/10 text-success/60 hover:text-success',
        oracle: 'hover:bg-oracle-purple/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
```

4. Update Modal component to use animation variants:
```typescript
const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({
    open,
    onOpenChange,
    variant = 'default',
    children,
    className,
    ...props
  }, ref) => {
    const animation = modalAnimations.content[variant as keyof typeof modalAnimations.content]
      || modalAnimations.content.default;

    return (
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              {...modalAnimations.overlay}
              onClick={() => onOpenChange?.(false)}
            />
            <motion.div
              ref={ref}
              className={cn(
                'fixed inset-0 z-50 flex items-center justify-center p-4',
                variant === 'command' && 'items-start'
              )}
              {...props}
            >
              <motion.div
                className={cn(modalContentVariants({ variant, className }))}
                {...animation}
                transition={SPRING.soft}
              >
                {children}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }
);
```

5. Add ModalCloseButton component:
```typescript
export const ModalCloseButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string }
>(({ className, variant = 'default', ...props }, ref) => (
  <motion.button
    ref={ref}
    className={cn(closeButtonVariants({ variant: variant as any }), className)}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    transition={SPRING.tight}
    {...props}
  >
    <X size={20} />
  </motion.button>
));
ModalCloseButton.displayName = 'ModalCloseButton';
```

BEFORE (content animation):
```typescript
initial: { opacity: 0, scale: 0.95 },
animate: { opacity: 1, scale: 1 },
```

AFTER (with y offset):
```typescript
initial: { opacity: 0, scale: 0.95, y: 20 },
animate: { opacity: 1, scale: 1, y: 0 },
exit: { opacity: 0, scale: 0.95, y: 20 },
```

RULES:
- Each variant has unique animation
- Oracle uses blur effect on enter/exit
- Command variant positioned near top
- Maintain accessibility (focus trap, ESC to close)

IMPORTS TO ADD:
```typescript
import { X } from 'lucide-react';
```
```

---

#### Implementation Notes

- Terminal modal for CLI-style confirmations
- Oracle modal for premium feature announcements
- Command variant for command palette overlay
- Blur animation on Oracle adds premium feel

---

## 3. New Component Prompts

### 3.1 DataGrid Component

**File:** `/packages/react/src/components/DataGrid.tsx` (NEW FILE)

**Task:** Create a Bloomberg-style dense data table component.

---

#### The Prompt

```
You are a React Component Engineer creating a new DataGrid component for SpinozaOS.

CREATE NEW FILE: /packages/react/src/components/DataGrid.tsx

REQUIREMENTS:
- Bloomberg Terminal inspired data table
- Monospace font for data consistency
- Sticky header support
- Sortable columns
- Cell formatters (text, number, currency, percent, date)
- Row hover states
- Optional striped rows
- Pagination support
- Real-time data update animations

COMPLETE IMPLEMENTATION:

```typescript
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { SPRING } from '@spinozaos/motion';
import { cn } from '../utils';

// ============================================
// TYPES
// ============================================

export type CellFormat = 'text' | 'number' | 'currency' | 'percent' | 'date' | 'badge';
export type SortDirection = 'asc' | 'desc' | null;

export interface DataGridColumn<T = any> {
  key: string;
  header: string;
  width?: string;
  minWidth?: string;
  align?: 'left' | 'center' | 'right';
  format?: CellFormat;
  sortable?: boolean;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  className?: string;
}

export interface DataGridProps<T = any> extends VariantProps<typeof dataGridVariants> {
  columns: DataGridColumn<T>[];
  data: T[];
  keyField?: string;
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  totalRows?: number;
  stickyHeader?: boolean;
  striped?: boolean;
  compact?: boolean;
  highlightOnHover?: boolean;
  onRowClick?: (row: T, index: number) => void;
  onSort?: (key: string, direction: SortDirection) => void;
  sortKey?: string;
  sortDirection?: SortDirection;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

// ============================================
// VARIANTS
// ============================================

const dataGridVariants = cva(
  [
    'w-full overflow-auto',
    'bg-void-light',
    'border border-white/5 rounded-lg',
  ],
  {
    variants: {
      variant: {
        default: '',
        terminal: [
          'bg-void border-success/20',
          'font-mono',
        ],
        dense: [
          'text-xs',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const headerCellVariants = cva(
  [
    'px-4 py-3',
    'text-left text-xs font-medium uppercase tracking-wider',
    'text-neutral-500',
    'border-b border-white/10',
    'bg-void-light',
    'font-mono',
    'select-none',
  ],
  {
    variants: {
      sortable: {
        true: 'cursor-pointer hover:text-white hover:bg-white/5 transition-colors',
        false: '',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      sortable: false,
      align: 'left',
    },
  }
);

const cellVariants = cva(
  [
    'px-4 py-3',
    'text-sm text-white',
    'font-mono',
    'border-b border-white/5',
  ],
  {
    variants: {
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
      format: {
        text: '',
        number: 'tabular-nums',
        currency: 'tabular-nums',
        percent: 'tabular-nums',
        date: 'tabular-nums text-neutral-400',
        badge: '',
      },
    },
    defaultVariants: {
      align: 'left',
      format: 'text',
    },
  }
);

const rowVariants = cva(
  [
    'transition-colors',
  ],
  {
    variants: {
      striped: {
        true: 'even:bg-white/[0.02]',
        false: '',
      },
      hoverable: {
        true: 'hover:bg-white/[0.04] cursor-pointer',
        false: '',
      },
      clickable: {
        true: 'cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      striped: false,
      hoverable: true,
      clickable: false,
    },
  }
);

// ============================================
// FORMATTERS
// ============================================

const formatValue = (value: any, format: CellFormat): string => {
  if (value === null || value === undefined) return '-';

  switch (format) {
    case 'number':
      return typeof value === 'number'
        ? value.toLocaleString()
        : value;
    case 'currency':
      return typeof value === 'number'
        ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
        : value;
    case 'percent':
      return typeof value === 'number'
        ? `${(value * 100).toFixed(2)}%`
        : value;
    case 'date':
      return value instanceof Date
        ? value.toLocaleDateString()
        : typeof value === 'string'
        ? new Date(value).toLocaleDateString()
        : value;
    default:
      return String(value);
  }
};

// ============================================
// SUB-COMPONENTS
// ============================================

const SortIcon = ({ direction }: { direction: SortDirection }) => (
  <span className="ml-1 inline-flex flex-col">
    <ChevronUp
      size={12}
      className={cn(
        'transition-colors',
        direction === 'asc' ? 'text-spinoza-yellow' : 'text-neutral-600'
      )}
    />
    <ChevronDown
      size={12}
      className={cn(
        '-mt-1 transition-colors',
        direction === 'desc' ? 'text-spinoza-yellow' : 'text-neutral-600'
      )}
    />
  </span>
);

const LoadingRow = ({ colSpan }: { colSpan: number }) => (
  <tr>
    <td colSpan={colSpan} className="px-4 py-8">
      <div className="flex items-center justify-center gap-2 text-neutral-500">
        <motion.div
          className="w-4 h-4 border-2 border-spinoza-yellow/30 border-t-spinoza-yellow rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        Loading...
      </div>
    </td>
  </tr>
);

const EmptyRow = ({ colSpan, message }: { colSpan: number; message: string }) => (
  <tr>
    <td colSpan={colSpan} className="px-4 py-12 text-center text-neutral-500">
      {message}
    </td>
  </tr>
);

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => (
  <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
    <span className="text-xs text-neutral-500 font-mono">
      Page {currentPage} of {totalPages}
    </span>
    <div className="flex gap-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={cn(
          'p-1.5 rounded transition-colors',
          currentPage <= 1
            ? 'text-neutral-600 cursor-not-allowed'
            : 'text-neutral-400 hover:text-white hover:bg-white/5'
        )}
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={cn(
          'p-1.5 rounded transition-colors',
          currentPage >= totalPages
            ? 'text-neutral-600 cursor-not-allowed'
            : 'text-neutral-400 hover:text-white hover:bg-white/5'
        )}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  </div>
);

// ============================================
// MAIN COMPONENT
// ============================================

function DataGridComponent<T extends Record<string, any>>(
  {
    columns,
    data,
    keyField = 'id',
    pageSize = 10,
    currentPage = 1,
    onPageChange,
    totalRows,
    stickyHeader = false,
    striped = false,
    compact = false,
    highlightOnHover = true,
    onRowClick,
    onSort,
    sortKey,
    sortDirection,
    loading = false,
    emptyMessage = 'No data available',
    variant,
    className,
  }: DataGridProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const totalPages = totalRows
    ? Math.ceil(totalRows / pageSize)
    : Math.ceil(data.length / pageSize);

  const handleSort = (key: string) => {
    if (!onSort) return;
    const newDirection: SortDirection =
      sortKey === key
        ? sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc'
        : 'asc';
    onSort(key, newDirection);
  };

  const getRowKey = (row: T, index: number): string => {
    return row[keyField] !== undefined ? String(row[keyField]) : String(index);
  };

  return (
    <div
      ref={ref}
      className={cn(dataGridVariants({ variant, className }))}
    >
      <div className={cn('overflow-x-auto', stickyHeader && 'max-h-[600px] overflow-y-auto')}>
        <table className="w-full border-collapse">
          <thead className={cn(stickyHeader && 'sticky top-0 z-10')}>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    headerCellVariants({
                      sortable: column.sortable,
                      align: column.align
                    }),
                    column.className
                  )}
                  style={{
                    width: column.width,
                    minWidth: column.minWidth
                  }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <span className="flex items-center gap-1">
                    {column.header}
                    {column.sortable && (
                      <SortIcon
                        direction={sortKey === column.key ? sortDirection : null}
                      />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="wait">
              {loading ? (
                <LoadingRow colSpan={columns.length} />
              ) : data.length === 0 ? (
                <EmptyRow colSpan={columns.length} message={emptyMessage} />
              ) : (
                data.map((row, rowIndex) => (
                  <motion.tr
                    key={getRowKey(row, rowIndex)}
                    className={cn(
                      rowVariants({
                        striped,
                        hoverable: highlightOnHover,
                        clickable: !!onRowClick
                      })
                    )}
                    onClick={() => onRowClick?.(row, rowIndex)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{
                      ...SPRING.soft,
                      delay: rowIndex * 0.02
                    }}
                  >
                    {columns.map((column) => {
                      const value = row[column.key];
                      const formattedValue = column.render
                        ? column.render(value, row, rowIndex)
                        : formatValue(value, column.format || 'text');

                      return (
                        <td
                          key={column.key}
                          className={cn(
                            cellVariants({
                              align: column.align,
                              format: column.format
                            }),
                            compact && 'py-2',
                            // Color positive/negative numbers
                            column.format === 'number' || column.format === 'percent'
                              ? typeof value === 'number' && value > 0
                                ? 'text-success'
                                : typeof value === 'number' && value < 0
                                ? 'text-error'
                                : ''
                              : '',
                            column.className
                          )}
                        >
                          {formattedValue}
                        </td>
                      );
                    })}
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {onPageChange && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}

// ============================================
// EXPORTS
// ============================================

export const DataGrid = React.forwardRef(DataGridComponent) as <T extends Record<string, any>>(
  props: DataGridProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

export { dataGridVariants, headerCellVariants, cellVariants, rowVariants };
```

USAGE EXAMPLE:
```tsx
const columns = [
  { key: 'symbol', header: 'Symbol', sortable: true },
  { key: 'price', header: 'Price', format: 'currency', align: 'right', sortable: true },
  { key: 'change', header: 'Change', format: 'percent', align: 'right' },
  { key: 'volume', header: 'Volume', format: 'number', align: 'right' },
];

const data = [
  { id: 1, symbol: 'AAPL', price: 178.50, change: 0.0234, volume: 52341000 },
  { id: 2, symbol: 'GOOGL', price: 141.80, change: -0.0156, volume: 21567000 },
];

<DataGrid
  columns={columns}
  data={data}
  striped
  stickyHeader
  onSort={(key, direction) => console.log(key, direction)}
  onRowClick={(row) => console.log('Clicked:', row)}
/>
```

STYLING NOTES:
- Uses monospace font for data alignment
- Positive numbers are green, negative are red
- Sticky header stays visible during scroll
- Row animations stagger on initial load
- Terminal variant uses green color scheme
```

---

#### Implementation Notes

- Monospace font ensures tabular number alignment
- Color coding for positive/negative values is automatic
- Staggered row animations prevent visual overwhelm
- Generic typing allows any data structure
- Pagination is optional and controlled externally

---

### 3.2 Terminal Component

**File:** `/packages/react/src/components/Terminal.tsx` (NEW FILE)

**Task:** Create a command-line style terminal display component.

---

#### The Prompt

```
You are a React Component Engineer creating a new Terminal component for SpinozaOS.

CREATE NEW FILE: /packages/react/src/components/Terminal.tsx

REQUIREMENTS:
- Command-line interface aesthetic
- Multiple line types (input, output, error, success, info)
- Optional timestamps
- Auto-scroll to bottom
- Typewriter effect option
- Command history navigation
- Custom prompt support
- Blinking cursor animation

COMPLETE IMPLEMENTATION:

```typescript
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { SPRING, TYPEWRITER } from '@spinozaos/motion';
import { cn } from '../utils';

// ============================================
// TYPES
// ============================================

export type TerminalLineType = 'input' | 'output' | 'error' | 'success' | 'info' | 'warning' | 'system';

export interface TerminalLine {
  id: string;
  type: TerminalLineType;
  content: string;
  timestamp?: Date;
}

export interface TerminalProps extends VariantProps<typeof terminalVariants> {
  lines: TerminalLine[];
  prompt?: string;
  showTimestamps?: boolean;
  maxLines?: number;
  autoScroll?: boolean;
  typewriterEffect?: boolean;
  showCursor?: boolean;
  onCommand?: (command: string) => void;
  inputEnabled?: boolean;
  className?: string;
}

// ============================================
// VARIANTS
// ============================================

const terminalVariants = cva(
  [
    'relative overflow-hidden',
    'bg-void rounded-lg',
    'border border-white/10',
    'font-mono text-sm',
  ],
  {
    variants: {
      variant: {
        default: '',
        bordered: 'border-success/30',
        glass: [
          'bg-void/80 backdrop-blur-xl',
          'border-white/5',
        ],
      },
      size: {
        sm: 'max-h-[200px]',
        md: 'max-h-[400px]',
        lg: 'max-h-[600px]',
        full: 'h-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const lineVariants = cva(
  [
    'flex items-start gap-3',
    'px-4 py-1',
    'leading-relaxed',
  ],
  {
    variants: {
      type: {
        input: 'text-white',
        output: 'text-neutral-400',
        error: 'text-error',
        success: 'text-success',
        info: 'text-info',
        warning: 'text-warning',
        system: 'text-oracle-purple italic',
      },
    },
    defaultVariants: {
      type: 'output',
    },
  }
);

// ============================================
// SUB-COMPONENTS
// ============================================

const TerminalHeader = ({
  title = 'Terminal',
  onClose,
}: {
  title?: string;
  onClose?: () => void;
}) => (
  <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-void-light/50">
    <div className="flex items-center gap-2">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-error/80" />
        <div className="w-3 h-3 rounded-full bg-warning/80" />
        <div className="w-3 h-3 rounded-full bg-success/80" />
      </div>
      <span className="ml-2 text-xs text-neutral-500 uppercase tracking-wider">
        {title}
      </span>
    </div>
    {onClose && (
      <button
        onClick={onClose}
        className="text-neutral-500 hover:text-white transition-colors"
      >
        <span className="sr-only">Close</span>
        <span aria-hidden>x</span>
      </button>
    )}
  </div>
);

const Timestamp = ({ date }: { date: Date }) => (
  <span className="text-neutral-600 text-xs tabular-nums flex-shrink-0 w-20">
    {date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })}
  </span>
);

const Prompt = ({ text = '$' }: { text?: string }) => (
  <span className="text-spinoza-yellow flex-shrink-0">
    {text}
  </span>
);

const Cursor = () => (
  <motion.span
    className="inline-block w-2 h-4 bg-spinoza-yellow ml-0.5"
    animate={{ opacity: [1, 0] }}
    transition={{
      duration: 0.53,
      repeat: Infinity,
      repeatType: 'reverse'
    }}
  />
);

const TypewriterText = ({
  text,
  onComplete
}: {
  text: string;
  onComplete?: () => void;
}) => {
  const [displayedText, setDisplayedText] = React.useState('');
  const [isComplete, setIsComplete] = React.useState(false);

  React.useEffect(() => {
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 30);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
      onComplete?.();
    }
  }, [displayedText, text, onComplete]);

  return (
    <span>
      {displayedText}
      {!isComplete && <Cursor />}
    </span>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

const Terminal = React.forwardRef<HTMLDivElement, TerminalProps>(
  (
    {
      lines,
      prompt = '$',
      showTimestamps = false,
      maxLines,
      autoScroll = true,
      typewriterEffect = false,
      showCursor = true,
      onCommand,
      inputEnabled = false,
      variant,
      size,
      className,
    },
    ref
  ) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = React.useState('');
    const [history, setHistory] = React.useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = React.useState(-1);

    // Auto-scroll to bottom
    React.useEffect(() => {
      if (autoScroll && scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, [lines, autoScroll]);

    // Limit displayed lines
    const displayedLines = maxLines
      ? lines.slice(-maxLines)
      : lines;

    // Handle command submission
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (inputValue.trim() && onCommand) {
        onCommand(inputValue.trim());
        setHistory(prev => [...prev, inputValue.trim()]);
        setHistoryIndex(-1);
        setInputValue('');
      }
    };

    // Handle history navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex < history.length - 1) {
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          setInputValue(history[history.length - 1 - newIndex]);
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setInputValue(history[history.length - 1 - newIndex]);
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setInputValue('');
        }
      }
    };

    // Focus input when terminal is clicked
    const handleTerminalClick = () => {
      if (inputEnabled && inputRef.current) {
        inputRef.current.focus();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(terminalVariants({ variant, size, className }))}
        onClick={handleTerminalClick}
      >
        <TerminalHeader />

        <div
          ref={scrollRef}
          className="overflow-y-auto p-4 space-y-1"
          style={{ maxHeight: 'calc(100% - 40px)' }}
        >
          <AnimatePresence initial={false}>
            {displayedLines.map((line, index) => (
              <motion.div
                key={line.id}
                className={cn(lineVariants({ type: line.type }))}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={SPRING.soft}
              >
                {showTimestamps && line.timestamp && (
                  <Timestamp date={line.timestamp} />
                )}

                {line.type === 'input' && <Prompt text={prompt} />}

                <span className="flex-1 break-all whitespace-pre-wrap">
                  {typewriterEffect && index === displayedLines.length - 1 ? (
                    <TypewriterText text={line.content} />
                  ) : (
                    line.content
                  )}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Input line */}
          {inputEnabled && (
            <form onSubmit={handleSubmit} className="flex items-center gap-3 px-4 py-1">
              {showTimestamps && <div className="w-20" />}
              <Prompt text={prompt} />
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className={cn(
                  'flex-1 bg-transparent outline-none',
                  'text-white caret-spinoza-yellow'
                )}
                autoComplete="off"
                spellCheck={false}
              />
              {showCursor && inputValue === '' && <Cursor />}
            </form>
          )}
        </div>
      </div>
    );
  }
);

Terminal.displayName = 'Terminal';

// ============================================
// EXPORTS
// ============================================

export { Terminal, TerminalHeader, terminalVariants, lineVariants };
export type { TerminalLine, TerminalLineType };
```

USAGE EXAMPLE:
```tsx
const [lines, setLines] = React.useState<TerminalLine[]>([
  { id: '1', type: 'system', content: 'SpinozaOS Terminal v1.0.0' },
  { id: '2', type: 'system', content: 'Type "help" for available commands' },
  { id: '3', type: 'input', content: 'status', timestamp: new Date() },
  { id: '4', type: 'success', content: 'All systems operational', timestamp: new Date() },
]);

const handleCommand = (command: string) => {
  const newInput: TerminalLine = {
    id: Date.now().toString(),
    type: 'input',
    content: command,
    timestamp: new Date(),
  };

  const response: TerminalLine = {
    id: (Date.now() + 1).toString(),
    type: command === 'error' ? 'error' : 'output',
    content: `Executed: ${command}`,
    timestamp: new Date(),
  };

  setLines(prev => [...prev, newInput, response]);
};

<Terminal
  lines={lines}
  prompt="spinoza $"
  showTimestamps
  inputEnabled
  onCommand={handleCommand}
  autoScroll
/>
```

STYLING NOTES:
- Monospace font throughout
- Gold prompt and cursor
- Auto-scroll keeps latest content visible
- Command history with arrow keys
- Typewriter effect for dramatic reveals
```

---

#### Implementation Notes

- Header with macOS-style buttons adds desktop app feel
- Command history navigation mimics real terminal
- Typewriter effect for AI responses adds mystique
- Color-coded line types for quick scanning
- Auto-scroll ensures latest content is visible

---

### 3.3 LiveTicker Component

**File:** `/packages/react/src/components/LiveTicker.tsx` (NEW FILE)

**Task:** Create a horizontally scrolling ticker for real-time data.

---

#### The Prompt

```
You are a React Component Engineer creating a new LiveTicker component for SpinozaOS.

CREATE NEW FILE: /packages/react/src/components/LiveTicker.tsx

REQUIREMENTS:
- Horizontally scrolling content
- Infinite loop animation
- Pause on hover
- Multiple speed options
- Support for custom item rendering
- Trend indicators (up/down arrows)
- Separator between items

COMPLETE IMPLEMENTATION:

```typescript
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, useAnimationControls } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../utils';

// ============================================
// TYPES
// ============================================

export interface TickerItem {
  id: string;
  label: string;
  value: string | number;
  change?: number;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
}

export interface LiveTickerProps extends VariantProps<typeof tickerVariants> {
  items: TickerItem[];
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
  direction?: 'left' | 'right';
  separator?: React.ReactNode;
  className?: string;
}

// ============================================
// VARIANTS
// ============================================

const tickerVariants = cva(
  [
    'w-full overflow-hidden',
    'bg-void-light',
    'border-y border-white/5',
  ],
  {
    variants: {
      variant: {
        default: '',
        bordered: 'border border-white/10 rounded-lg',
        transparent: 'bg-transparent border-0',
        terminal: 'bg-void border-success/20',
      },
      size: {
        sm: 'py-2',
        md: 'py-3',
        lg: 'py-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const itemVariants = cva(
  [
    'flex items-center gap-3',
    'px-6',
    'whitespace-nowrap',
    'font-mono text-sm',
  ],
  {
    variants: {
      variant: {
        default: '',
        terminal: 'text-success',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// ============================================
// CONSTANTS
// ============================================

const SPEEDS = {
  slow: 60,
  normal: 30,
  fast: 15,
};

// ============================================
// SUB-COMPONENTS
// ============================================

const TrendIndicator = ({ change }: { change: number }) => {
  if (change > 0) {
    return (
      <span className="flex items-center text-success">
        <TrendingUp size={14} className="mr-0.5" />
        +{Math.abs(change).toFixed(2)}%
      </span>
    );
  }
  if (change < 0) {
    return (
      <span className="flex items-center text-error">
        <TrendingDown size={14} className="mr-0.5" />
        {change.toFixed(2)}%
      </span>
    );
  }
  return (
    <span className="flex items-center text-neutral-500">
      <Minus size={14} className="mr-0.5" />
      0.00%
    </span>
  );
};

const DefaultSeparator = () => (
  <span className="text-neutral-700 select-none">|</span>
);

// ============================================
// MAIN COMPONENT
// ============================================

const LiveTicker = React.forwardRef<HTMLDivElement, LiveTickerProps>(
  (
    {
      items,
      speed = 'normal',
      pauseOnHover = true,
      direction = 'left',
      separator = <DefaultSeparator />,
      variant,
      size,
      className,
    },
    ref
  ) => {
    const controls = useAnimationControls();
    const [isPaused, setIsPaused] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = React.useState(0);

    // Calculate content width for animation
    React.useEffect(() => {
      if (containerRef.current) {
        const firstSet = containerRef.current.querySelector('[data-ticker-set="0"]');
        if (firstSet) {
          setContentWidth(firstSet.scrollWidth);
        }
      }
    }, [items]);

    // Start animation
    React.useEffect(() => {
      if (contentWidth > 0) {
        const duration = SPEEDS[speed];
        controls.start({
          x: direction === 'left' ? -contentWidth : contentWidth,
          transition: {
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration,
              ease: 'linear',
            },
          },
        });
      }
    }, [contentWidth, speed, direction, controls]);

    // Handle pause/resume
    React.useEffect(() => {
      if (isPaused) {
        controls.stop();
      } else if (contentWidth > 0) {
        const duration = SPEEDS[speed];
        controls.start({
          x: direction === 'left' ? -contentWidth : contentWidth,
          transition: {
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration,
              ease: 'linear',
            },
          },
        });
      }
    }, [isPaused, contentWidth, speed, direction, controls]);

    const renderItem = (item: TickerItem, index: number) => (
      <React.Fragment key={`${item.id}-${index}`}>
        <div className={cn(itemVariants({ variant: variant as any }))}>
          {item.icon && (
            <span className="text-neutral-400">{item.icon}</span>
          )}
          <span className="text-neutral-500 uppercase tracking-wider text-xs">
            {item.label}
          </span>
          <span className="text-white font-medium">
            {item.prefix}
            {typeof item.value === 'number'
              ? item.value.toLocaleString()
              : item.value}
            {item.suffix}
          </span>
          {item.change !== undefined && (
            <TrendIndicator change={item.change} />
          )}
        </div>
        {index < items.length - 1 && separator}
      </React.Fragment>
    );

    return (
      <div
        ref={ref}
        className={cn(tickerVariants({ variant, size, className }))}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      >
        <div ref={containerRef} className="relative overflow-hidden">
          <motion.div
            className="flex items-center"
            animate={controls}
            initial={{ x: direction === 'left' ? 0 : -contentWidth }}
          >
            {/* First set */}
            <div data-ticker-set="0" className="flex items-center">
              {items.map((item, index) => renderItem(item, index))}
            </div>
            {/* Duplicate for seamless loop */}
            <div data-ticker-set="1" className="flex items-center">
              {items.map((item, index) => renderItem(item, index))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
);

LiveTicker.displayName = 'LiveTicker';

// ============================================
// EXPORTS
// ============================================

export { LiveTicker, tickerVariants, TrendIndicator };
```

USAGE EXAMPLE:
```tsx
const tickerItems: TickerItem[] = [
  { id: '1', label: 'BTC', value: 43521.50, change: 2.34, prefix: '$' },
  { id: '2', label: 'ETH', value: 2281.30, change: -1.12, prefix: '$' },
  { id: '3', label: 'SOL', value: 98.45, change: 5.67, prefix: '$' },
  { id: '4', label: 'Market Cap', value: '1.72T', suffix: ' USD' },
  { id: '5', label: 'Active Wallets', value: 45234567, change: 0.89 },
];

<LiveTicker
  items={tickerItems}
  speed="normal"
  pauseOnHover
/>

// Terminal variant
<LiveTicker
  items={tickerItems}
  variant="terminal"
  speed="fast"
  separator={<span className="text-success/30">|</span>}
/>
```

STYLING NOTES:
- Monospace font for numeric alignment
- Color-coded trend indicators
- Pause on hover to read values
- Seamless loop animation
- Customizable separator
```

---

#### Implementation Notes

- Duplicate content creates seamless infinite scroll
- Pause on hover allows reading rapidly moving data
- Trend indicators provide at-a-glance status
- Speed options for different use cases
- Terminal variant for command-line aesthetic

---

### 3.4 GaugeCluster Component

**File:** `/packages/react/src/components/GaugeCluster.tsx` (NEW FILE)

**Task:** Create a cluster of animated gauge components for dashboard displays.

---

#### The Prompt

```
You are a React Component Engineer creating a new GaugeCluster component for SpinozaOS.

CREATE NEW FILE: /packages/react/src/components/GaugeCluster.tsx

REQUIREMENTS:
- Semi-circular gauge with animated fill
- Threshold-based color changes
- Multiple sizes
- Cluster layout (grid of gauges)
- Labels and units
- SVG-based for crisp rendering
- Smooth animation on value changes

COMPLETE IMPLEMENTATION:

```typescript
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, useSpring, useTransform } from 'framer-motion';
import { cn } from '../utils';

// ============================================
// TYPES
// ============================================

export interface GaugeThreshold {
  value: number;
  color: string;
  label?: string;
}

export interface GaugeProps extends VariantProps<typeof gaugeContainerVariants> {
  value: number;
  min?: number;
  max?: number;
  label: string;
  unit?: string;
  thresholds?: GaugeThreshold[];
  showValue?: boolean;
  animated?: boolean;
  className?: string;
}

export interface GaugeClusterProps {
  gauges: GaugeProps[];
  layout?: 'horizontal' | 'grid';
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

// ============================================
// CONSTANTS
// ============================================

const SIZES = {
  sm: { width: 80, height: 50, strokeWidth: 6, fontSize: 14 },
  md: { width: 120, height: 75, strokeWidth: 8, fontSize: 18 },
  lg: { width: 160, height: 100, strokeWidth: 10, fontSize: 24 },
};

const DEFAULT_THRESHOLDS: GaugeThreshold[] = [
  { value: 30, color: '#ef4444', label: 'Low' },
  { value: 70, color: '#fbbf24', label: 'Medium' },
  { value: 100, color: '#22c55e', label: 'High' },
];

// ============================================
// VARIANTS
// ============================================

const gaugeContainerVariants = cva(
  [
    'flex flex-col items-center',
  ],
  {
    variants: {
      size: {
        sm: 'gap-1',
        md: 'gap-2',
        lg: 'gap-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const clusterVariants = cva(
  [
    'w-full',
  ],
  {
    variants: {
      layout: {
        horizontal: 'flex items-center justify-center',
        grid: 'grid',
      },
      gap: {
        sm: 'gap-4',
        md: 'gap-6',
        lg: 'gap-8',
      },
    },
    defaultVariants: {
      layout: 'horizontal',
      gap: 'md',
    },
  }
);

// ============================================
// HELPER FUNCTIONS
// ============================================

const getColorForValue = (
  value: number,
  thresholds: GaugeThreshold[]
): string => {
  const sortedThresholds = [...thresholds].sort((a, b) => a.value - b.value);
  for (const threshold of sortedThresholds) {
    if (value <= threshold.value) {
      return threshold.color;
    }
  }
  return sortedThresholds[sortedThresholds.length - 1]?.color || '#fbbf24';
};

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
  ].join(' ');
};

// ============================================
// GAUGE COMPONENT
// ============================================

const Gauge = React.forwardRef<HTMLDivElement, GaugeProps>(
  (
    {
      value,
      min = 0,
      max = 100,
      label,
      unit = '',
      thresholds = DEFAULT_THRESHOLDS,
      showValue = true,
      animated = true,
      size = 'md',
      className,
    },
    ref
  ) => {
    const dimensions = SIZES[size as keyof typeof SIZES] || SIZES.md;
    const { width, height, strokeWidth, fontSize } = dimensions;

    // Calculate SVG dimensions
    const padding = strokeWidth;
    const svgWidth = width;
    const svgHeight = height;
    const centerX = svgWidth / 2;
    const centerY = svgHeight - padding / 2;
    const radius = Math.min(width, height * 2) / 2 - strokeWidth;

    // Normalize value to percentage
    const normalizedValue = Math.max(min, Math.min(max, value));
    const percentage = ((normalizedValue - min) / (max - min)) * 100;

    // Get color based on thresholds
    const color = getColorForValue(percentage, thresholds);

    // Animation
    const springValue = useSpring(animated ? 0 : percentage, {
      stiffness: 100,
      damping: 30,
    });

    React.useEffect(() => {
      springValue.set(percentage);
    }, [percentage, springValue]);

    // Arc paths
    const bgArc = describeArc(centerX, centerY, radius, 0, 180);

    const animatedAngle = useTransform(springValue, [0, 100], [0, 180]);

    return (
      <div
        ref={ref}
        className={cn(gaugeContainerVariants({ size }), className)}
      >
        <svg
          width={svgWidth}
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="overflow-visible"
        >
          {/* Background arc */}
          <path
            d={bgArc}
            fill="none"
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Animated fill arc */}
          <motion.path
            d={bgArc}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${radius * Math.PI} ${radius * Math.PI}`}
            style={{
              strokeDashoffset: useTransform(
                animatedAngle,
                [0, 180],
                [radius * Math.PI, 0]
              ),
            }}
            initial={false}
          />

          {/* Value display */}
          {showValue && (
            <text
              x={centerX}
              y={centerY - 8}
              textAnchor="middle"
              className="fill-white"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize,
                fontWeight: 500,
              }}
            >
              <motion.tspan>
                {animated ? (
                  <motion.tspan>
                    {useTransform(springValue, (v) =>
                      Math.round((v / 100) * (max - min) + min)
                    )}
                  </motion.tspan>
                ) : (
                  Math.round(normalizedValue)
                )}
              </motion.tspan>
              {unit && (
                <tspan className="fill-neutral-500 text-xs">
                  {unit}
                </tspan>
              )}
            </text>
          )}
        </svg>

        {/* Label */}
        <span
          className={cn(
            'font-mono uppercase tracking-wider text-neutral-500',
            size === 'sm' && 'text-[8px]',
            size === 'md' && 'text-[10px]',
            size === 'lg' && 'text-xs',
          )}
        >
          {label}
        </span>
      </div>
    );
  }
);

Gauge.displayName = 'Gauge';

// ============================================
// GAUGE CLUSTER COMPONENT
// ============================================

const GaugeCluster = React.forwardRef<HTMLDivElement, GaugeClusterProps>(
  (
    {
      gauges,
      layout = 'horizontal',
      columns = 4,
      gap = 'md',
      className,
    },
    ref
  ) => {
    const gridStyle = layout === 'grid'
      ? { gridTemplateColumns: `repeat(${columns}, 1fr)` }
      : undefined;

    return (
      <div
        ref={ref}
        className={cn(clusterVariants({ layout, gap }), className)}
        style={gridStyle}
      >
        {gauges.map((gauge, index) => (
          <Gauge key={gauge.label || index} {...gauge} />
        ))}
      </div>
    );
  }
);

GaugeCluster.displayName = 'GaugeCluster';

// ============================================
// EXPORTS
// ============================================

export { Gauge, GaugeCluster, gaugeContainerVariants, clusterVariants };
```

USAGE EXAMPLE:
```tsx
// Single gauge
<Gauge
  value={75}
  label="CPU Usage"
  unit="%"
  size="lg"
/>

// Gauge with custom thresholds
<Gauge
  value={42}
  min={0}
  max={100}
  label="Memory"
  unit="%"
  thresholds={[
    { value: 50, color: '#22c55e' },
    { value: 80, color: '#fbbf24' },
    { value: 100, color: '#ef4444' },
  ]}
/>

// Gauge cluster
const systemMetrics = [
  { value: 75, label: 'CPU', unit: '%' },
  { value: 42, label: 'Memory', unit: '%' },
  { value: 89, label: 'Disk', unit: '%' },
  { value: 23, label: 'Network', unit: 'Mb/s', max: 100 },
];

<GaugeCluster
  gauges={systemMetrics}
  layout="horizontal"
  gap="lg"
/>

// Grid layout
<GaugeCluster
  gauges={systemMetrics}
  layout="grid"
  columns={2}
/>
```

STYLING NOTES:
- SVG-based for crisp rendering at any size
- Spring animation for smooth value transitions
- Threshold colors change automatically
- Monospace font for numeric values
- Uppercase labels match Substance style
```

---

#### Implementation Notes

- SVG arcs provide smooth curves and scaling
- Spring animation creates natural movement
- Threshold system allows automatic color coding
- Cluster component simplifies dashboard layouts
- Responsive grid and horizontal layouts supported

---

## Export Updates

After implementing all new components, update the package exports:

**File:** `/packages/react/src/index.ts`

Add these exports:

```typescript
// New Data Display Components
export {
  DataGrid,
  dataGridVariants,
  headerCellVariants,
  cellVariants,
  rowVariants,
  type DataGridProps,
  type DataGridColumn,
  type CellFormat,
  type SortDirection,
} from './components/DataGrid';

export {
  Terminal,
  TerminalHeader,
  terminalVariants,
  lineVariants,
  type TerminalProps,
  type TerminalLine,
  type TerminalLineType,
} from './components/Terminal';

export {
  LiveTicker,
  tickerVariants,
  TrendIndicator,
  type LiveTickerProps,
  type TickerItem,
} from './components/LiveTicker';

export {
  Gauge,
  GaugeCluster,
  gaugeContainerVariants,
  clusterVariants,
  type GaugeProps,
  type GaugeClusterProps,
  type GaugeThreshold,
} from './components/GaugeCluster';
```

---

## Tailwind Configuration Updates

**File:** `/packages/tailwind/src/preset.ts`

Add new utility classes:

```typescript
// Add to theme.extend
extend: {
  // ... existing extensions ...

  animation: {
    'ticker-scroll': 'ticker-scroll 30s linear infinite',
    'ticker-scroll-fast': 'ticker-scroll 15s linear infinite',
    'blink': 'blink 1s step-end infinite',
    'glitch': 'glitch 0.3s ease-in-out',
  },

  keyframes: {
    'ticker-scroll': {
      '0%': { transform: 'translateX(0)' },
      '100%': { transform: 'translateX(-50%)' },
    },
    'blink': {
      '50%': { opacity: '0' },
    },
    'glitch': {
      '0%, 100%': { transform: 'translate(0)' },
      '20%': { transform: 'translate(-2px, 2px)' },
      '40%': { transform: 'translate(-2px, -2px)' },
      '60%': { transform: 'translate(2px, 2px)' },
      '80%': { transform: 'translate(2px, -2px)' },
    },
  },
},

// Add to plugins
plugins: [
  // Nano grid utility
  function({ addUtilities }) {
    addUtilities({
      '.nano-grid': {
        backgroundImage: `
          linear-gradient(rgba(251, 191, 36, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(251, 191, 36, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
      },
      '.nano-grid-dense': {
        backgroundImage: `
          linear-gradient(rgba(251, 191, 36, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(251, 191, 36, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '10px 10px',
      },
    });
  },
],
```

---

*SpinozaOS Implementation Prompts*
*Version: 1.0.0*
*Last Updated: 2025-12-10*
