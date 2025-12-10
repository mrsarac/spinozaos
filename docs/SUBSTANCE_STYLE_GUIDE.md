# Substance Style Guide

## SpinozaOS Design DNA

> **"More Geometrico"** - Design for the Age of Superintelligence
>
> The Substance style is a unique fusion of Bloomberg Terminal data density,
> sci-fi interface aesthetics, and Spinozan philosophical gravitas.

---

## Table of Contents

1. [Visual DNA](#visual-dna)
2. [Color System](#color-system)
3. [Typography Patterns](#typography-patterns)
4. [Motion System](#motion-system)
5. [Layout Patterns](#layout-patterns)
6. [Component Styling Patterns](#component-styling-patterns)
7. [Effects & Treatments](#effects--treatments)
8. [New Component Specifications](#new-component-specifications)
9. [Token Recommendations](#token-recommendations)

---

## Visual DNA

### Core Identity

```
Substance Style = (Bloomberg Terminal x Sci-Fi UI x Intelligence Agency)
                = Data-Dense + Mysterious + Authoritative
```

### Design Pillars

| Pillar | Description | Implementation |
|--------|-------------|----------------|
| **Void-First** | Deep black backgrounds, no light mode | `#020617` as foundation |
| **Prophetic Gold** | Single primary accent for mystical focus | `#fbbf24` for all CTAs and highlights |
| **Data-Dense** | Bloomberg-inspired information density | Monospace text, compact grids |
| **Motion-Rich** | Every interaction has spring-based feedback | 60fps minimum, spring physics |
| **Glassmorphism** | Layered, semi-transparent surfaces | Subtle blur, ultra-low opacity backgrounds |

### Visual Hierarchy

```
Layer 0: Void (#020617) - Base background
Layer 1: Void Light (#0f172a) - Cards, elevated surfaces
Layer 2: Void Lighter (#1e293b) - Interactive elements, hover states
Layer 3: Glass (rgba(255,255,255,0.03-0.06)) - Overlay elements
Layer 4: Gold Accent (#fbbf24) - Active states, CTAs, focus
```

---

## Color System

### Primary Palette

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `void` | `#020617` | `2, 6, 23` | Primary background |
| `void-light` | `#0f172a` | `15, 23, 42` | Cards, panels |
| `void-lighter` | `#1e293b` | `30, 41, 59` | Hover states |
| `spinoza-yellow` | `#fbbf24` | `251, 191, 36` | Primary accent |
| `spinoza-gold` | `#d97706` | `217, 119, 6` | Secondary accent |

### Accent Colors

```css
/* Prophetic Gold - Primary Accent */
--spinoza-yellow: #fbbf24;
--spinoza-gold: #d97706;
--spinoza-amber: #f59e0b;
--spinoza-dim: #b45309;

/* Oracle Purple - Premium/Special Features */
--oracle-purple: #8b5cf6;
--oracle-glow: rgba(139, 92, 246, 0.3);

/* Indigo - Future/Tech Accent */
--spinoza-indigo: #6366f1;
--spinoza-indigo-dim: #4f46e5;

/* Teal - Data/Information */
--teal: #14b8a6;
```

### Semantic Colors

```css
/* Success */
--success: #22c55e;
--success-dim: #166534;

/* Error */
--error: #ef4444;
--error-dim: #991b1b;

/* Warning */
--warning: #f59e0b;

/* Info */
--info: #3b82f6;
```

### Clearance Level Colors (Substance-Specific)

| Level | Color | Hex | Usage |
|-------|-------|-----|-------|
| Cosmic | Purple | `#a855f7` | Highest security |
| Top Secret | Red | `#ef4444` | Very high security |
| Secret | Orange | `#f59e0b` | High security |
| Classified | Yellow | `#eab308` | Medium security |
| Standard | Gray | `#64748b` | Default level |

### Confidence Level Colors

```css
/* High Confidence (>= 70%) */
--confidence-high: #22c55e;

/* Medium Confidence (40-69%) */
--confidence-medium: #fbbf24;

/* Low Confidence (< 40%) */
--confidence-low: #ef4444;

/* Unknown */
--confidence-neutral: #64748b;
```

### Glitch Effect Colors

```css
--glitch-cyan: #00FFF9;
--glitch-magenta: #FF00C1;
```

### Text Colors

```css
/* Primary Text */
--text-primary: #ffffff;

/* Secondary Text (Descriptions) */
--text-secondary: #94a3b8; /* neutral-400 */

/* Tertiary Text (Labels) */
--text-tertiary: #64748b; /* neutral-500 */

/* Muted Text (Disabled, Hints) */
--text-muted: #475569; /* neutral-600 */

/* Accent Text */
--text-accent: #fbbf24; /* spinoza-yellow */
```

### Border Colors

```css
/* Subtle */
--border-subtle: rgba(255, 255, 255, 0.05);

/* Default */
--border-default: rgba(255, 255, 255, 0.10);

/* Hover */
--border-hover: rgba(251, 191, 36, 0.30);

/* Focus */
--border-focus: #fbbf24;
```

---

## Typography Patterns

### Font Stack

```css
/* Display & Headlines - Intelligence Agency Aesthetic */
--font-serif: 'Cinzel', 'Playfair Display', Georgia, serif;

/* UI & Body - Clean, Readable */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Data & Code - Technical Precision */
--font-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
```

### Type Scale

| Style | Font | Size | Weight | Letter Spacing | Line Height | Usage |
|-------|------|------|--------|----------------|-------------|-------|
| Display | Serif | 60px | 600 | -0.02em | 1 | Hero headlines |
| Heading 1 | Serif | 36px | 600 | -0.015em | 1.25 | Section titles |
| Heading 2 | Sans | 24px | 600 | 0 | 1.375 | Card titles |
| Body | Sans | 16px | 400 | 0 | 1.5 | Paragraphs |
| Small | Sans | 14px | 400 | 0 | 1.5 | Secondary text |
| Label | Mono | 10px | 500 | 0.05em | 1 | Categories, tags |
| Data | Mono | 48px | 400 | 0 | 1 | Large numbers |
| Data Small | Mono | 20px | 400 | 0 | 1 | Small numbers |

### Typography CSS Classes

```css
.text-display {
  font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
  font-size: 3.75rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.02em;
  color: #ffffff;
}

.text-heading-1 {
  font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
  font-size: 2.25rem;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.015em;
  color: #ffffff;
}

.text-heading-2 {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.375;
  color: #ffffff;
}

.text-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.625rem; /* 10px */
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
}

.text-data {
  font-family: 'JetBrains Mono', monospace;
  font-size: 3rem;
  font-weight: 400;
  line-height: 1;
  color: #fbbf24;
}
```

### Typography Patterns by Context

#### Stat Display
```css
/* Value */
font-family: 'JetBrains Mono';
font-size: 1.25rem; /* md: text-xl */
color: white or accent based on valueColor;

/* Label */
font-family: 'JetBrains Mono';
font-size: 10px;
text-transform: uppercase;
letter-spacing: 0.05em;
color: #475569;
```

#### Badge/Tag
```css
font-family: 'JetBrains Mono';
font-size: 10px;
text-transform: uppercase;
letter-spacing: 0.05em;
```

#### Tab Trigger
```css
font-family: 'JetBrains Mono';
text-transform: uppercase;
letter-spacing: 0.05em;
font-size: 12px; /* md */
```

---

## Motion System

### Spring Configurations

```typescript
const SPRING = {
  // Buttons, toggles - Quick, responsive
  tight: { type: "spring", stiffness: 500, damping: 30 },

  // Cards, panels - Smooth, natural
  soft: { type: "spring", stiffness: 300, damping: 30 },

  // Badges, achievements - Playful
  bouncy: { type: "spring", stiffness: 400, damping: 20 },

  // Page transitions - Deliberate
  slow: { type: "spring", stiffness: 200, damping: 30 },

  // Mobile optimized - Touch-friendly
  mobile: { type: "spring", stiffness: 400, damping: 35 },

  // Quick UI feedback - Snappy
  snappy: { type: "spring", stiffness: 600, damping: 35 },
};
```

### Easing Curves

```typescript
const EASE = {
  // Page load, modal open
  enter: [0.22, 1, 0.36, 1],

  // Page exit, modal close
  exit: [0.4, 0, 0.2, 1],

  // General smooth transition
  smooth: [0.4, 0, 0.2, 1],

  // Playful bounce
  bounce: [0.68, -0.55, 0.27, 1.55],

  // iOS-like natural curve
  ios: [0.25, 0.1, 0.25, 1],
};
```

### Duration Scale

| Token | Duration | Use Case |
|-------|----------|----------|
| `instant` | 100ms | Hover states |
| `fast` | 200ms | Button feedback |
| `normal` | 300ms | Menu open, general transitions |
| `slow` | 500ms | Page transitions |
| `glacial` | 1000ms | Hero animations |

### Micro-Interactions

```typescript
const MICRO = {
  hover: {
    lift: { y: -4, scale: 1.01 },
    glow: { boxShadow: '0 0 20px rgba(251, 191, 36, 0.3)' },
    glowIntense: { boxShadow: '0 0 40px rgba(251, 191, 36, 0.5)' },
    scale: { scale: 1.02 },
  },
  tap: {
    press: { scale: 0.98 },
    click: { scale: 0.95 },
  },
  touch: {
    press: { scale: 0.96 },
    highlight: { backgroundColor: 'rgba(251, 191, 36, 0.1)' },
  },
  pulse: {
    scale: [1, 1.05, 1],
    transition: { repeat: Infinity, duration: 2 },
  },
  oracleGlow: {
    boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
  },
};
```

### Animation Variants

```typescript
const VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  },
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  slideInUp: {
    initial: { opacity: 0, y: '100%' },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: '100%' },
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
};
```

### Glitch Animation Keyframes

```css
@keyframes glitch {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
}

@keyframes glitch-skew {
  0%, 100% { transform: skew(0deg); }
  20% { transform: skew(2deg); }
  40% { transform: skew(-2deg); }
  60% { transform: skew(1deg); }
  80% { transform: skew(-1deg); }
}

@keyframes scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}
```

---

## Layout Patterns

### Spacing System

```typescript
const spacing = {
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  8: '2rem',        // 32px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
};
```

### Grid Density Patterns

#### Stats Grid (4-column)
```jsx
<div className="grid grid-cols-4 gap-px bg-white/5">
  {/* StatCard components */}
</div>
```

#### Data Grid (Dense)
```jsx
<div className="grid grid-cols-6 gap-2">
  {/* Data items */}
</div>
```

#### Card Grid (Standard)
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Card components */}
</div>
```

### Touch Targets

```typescript
const touchTargets = {
  min: '44px',      // WCAG minimum
  optimal: '48px',  // Recommended for thumbs
  large: '56px',    // Primary CTAs
  clickMin: '32px', // Desktop only
  clickOptimal: '40px',
};
```

### Breakpoints

```typescript
const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};
```

### Z-Index Scale

```typescript
const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  toast: 80,
};
```

---

## Component Styling Patterns

### Card Pattern

```css
/* Base Card */
.card {
  position: relative;
  overflow: hidden;
  background: #0f172a; /* void-light */
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: colors;
}

/* Glass Card */
.card-glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Elevated Card */
.card-elevated {
  background: #1e293b; /* void-lighter */
  border: 1px solid rgba(255, 255, 255, 0.10);
}

/* Interactive Card */
.card-interactive {
  cursor: pointer;
}
.card-interactive:hover {
  border-color: rgba(251, 191, 36, 0.30);
}
```

### Button Pattern

```css
/* Primary Button */
.btn-primary {
  background: #fbbf24;
  color: #020617;
  font-weight: 500;
}
.btn-primary:hover {
  background: #d97706;
}

/* Secondary Button */
.btn-secondary {
  background: #0f172a;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.10);
}
.btn-secondary:hover {
  background: #1e293b;
  border-color: rgba(255, 255, 255, 0.20);
}

/* Ghost Button */
.btn-ghost {
  background: transparent;
  color: white;
}
.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.05);
}

/* Oracle Button */
.btn-oracle {
  background: #8b5cf6;
  color: white;
}
.btn-oracle:hover {
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
}
```

### Input Pattern

```css
/* Base Input */
.input {
  width: 100%;
  border-radius: 0.5rem;
  background: #0f172a;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.10);
  transition: all 200ms;
}

.input::placeholder {
  color: #64748b;
}

.input:hover {
  border-color: rgba(255, 255, 255, 0.20);
}

.input:focus {
  outline: none;
  ring: 2px solid rgba(251, 191, 36, 0.50);
  border-color: #fbbf24;
}

/* Glass Input */
.input-glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
}
```

### Badge Pattern

```css
/* Base Badge */
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 9999px;
  transition: colors;
}

/* Primary Badge */
.badge-primary {
  background: rgba(251, 191, 36, 0.10);
  color: #fbbf24;
  border: 1px solid rgba(251, 191, 36, 0.20);
}

/* Clearance Badge */
.badge-clearance {
  padding: 0.25rem 0.5rem;
  font-size: 10px;
  border: 1px solid;
}

.badge-cosmic {
  background: rgba(168, 85, 247, 0.10);
  border-color: rgba(168, 85, 247, 0.30);
  color: #a855f7;
}
```

### Tab Pattern

```css
/* Tab List */
.tab-list {
  display: flex;
  gap: 0.5rem;
}

/* Tab Trigger */
.tab-trigger {
  position: relative;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.5rem 1rem;
  transition: all 200ms;
}

/* Active Tab */
.tab-trigger[data-state="active"] {
  background: #fbbf24;
  color: black;
}

/* Inactive Tab */
.tab-trigger[data-state="inactive"] {
  background: rgba(255, 255, 255, 0.05);
  color: #94a3b8;
}

.tab-trigger[data-state="inactive"]:hover {
  background: rgba(255, 255, 255, 0.10);
}
```

### Modal Pattern

```css
/* Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.60);
  backdrop-filter: blur(4px);
}

/* Content */
.modal-content {
  position: relative;
  width: 100%;
  max-width: 28rem;
  background: #0f172a;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.10);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.40);
  overflow: hidden;
}

/* Header */
.modal-header {
  padding: 1.5rem;
  padding-bottom: 0;
}

/* Body */
.modal-body {
  padding: 1.5rem;
}

/* Footer */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 1rem;
  margin-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.10);
}
```

---

## Effects & Treatments

### Glassmorphism

```css
/* Standard Glass */
.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Elevated Glass */
.glass-elevated {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Interactive Glass */
.glass-interactive {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(251, 191, 36, 0.20);
}
```

### Glow Effects

```css
/* Box Shadow Glows */
.glow-yellow {
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
}

.glow-yellow-intense {
  box-shadow: 0 0 40px rgba(251, 191, 36, 0.5);
}

.glow-oracle {
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
}

.glow-success {
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
}

.glow-indigo {
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
}

.glow-cyan {
  box-shadow: 0 0 20px rgba(0, 255, 249, 0.3);
}
```

### Text Glow Effects

```css
.text-glow {
  text-shadow: 0 0 10px rgba(251, 191, 36, 0.5),
               0 0 20px rgba(251, 191, 36, 0.3);
}

.text-glow-indigo {
  text-shadow: 0 0 10px rgba(99, 102, 241, 0.5),
               0 0 20px rgba(99, 102, 241, 0.3);
}

.text-glow-cyan {
  text-shadow: 0 0 10px rgba(0, 255, 249, 0.5),
               0 0 20px rgba(0, 255, 249, 0.3);
}
```

### Nano Grid Background

```css
/* Standard Nano Grid */
.nano-grid {
  background-image:
    linear-gradient(rgba(251, 191, 36, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(251, 191, 36, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Dense Nano Grid */
.nano-grid-dense {
  background-image:
    linear-gradient(rgba(251, 191, 36, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(251, 191, 36, 0.05) 1px, transparent 1px);
  background-size: 10px 10px;
}
```

### Gradient Lines

```css
/* Decorative Line Gradient */
.gradient-line {
  background: linear-gradient(90deg, #fbbf24 0%, #14b8a6 50%, #8b5cf6 100%);
}

/* Reverse Gradient */
.gradient-line-reverse {
  background: linear-gradient(90deg, #8b5cf6 0%, #14b8a6 50%, #fbbf24 100%);
}
```

### Pulse Animation

```css
/* Pulse Dot (for status indicators) */
.pulse-dot {
  position: relative;
}

.pulse-dot::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  background: currentColor;
  opacity: 0.75;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}
```

### Scrollbar Styling

```css
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #020617;
}

::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #fbbf24;
}
```

---

## New Component Specifications

### DataGrid

A dense, Bloomberg-inspired data table for displaying large datasets.

```typescript
interface DataGridProps {
  columns: Array<{
    key: string;
    header: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
    format?: 'text' | 'number' | 'currency' | 'percent' | 'date';
    sortable?: boolean;
  }>;
  data: Array<Record<string, any>>;
  pageSize?: number;
  stickyHeader?: boolean;
  striped?: boolean;
  compact?: boolean;
  highlightOnHover?: boolean;
  onRowClick?: (row: any, index: number) => void;
}
```

**Styling:**
```css
.data-grid {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  border-collapse: collapse;
}

.data-grid-header {
  background: #0f172a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.10);
  position: sticky;
  top: 0;
  z-index: 10;
}

.data-grid-header th {
  padding: 0.75rem 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 10px;
  color: #64748b;
  text-align: left;
  white-space: nowrap;
}

.data-grid-row {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 150ms;
}

.data-grid-row:hover {
  background: rgba(255, 255, 255, 0.03);
}

.data-grid-cell {
  padding: 0.5rem 1rem;
  color: white;
}

.data-grid-cell-number {
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.data-grid-cell-positive {
  color: #22c55e;
}

.data-grid-cell-negative {
  color: #ef4444;
}
```

### Terminal

A command-line style interface for displaying logs or typed output.

```typescript
interface TerminalProps {
  lines: Array<{
    type: 'input' | 'output' | 'error' | 'success' | 'info';
    content: string;
    timestamp?: Date;
  }>;
  prompt?: string;
  showTimestamps?: boolean;
  maxLines?: number;
  autoScroll?: boolean;
  typewriterEffect?: boolean;
}
```

**Styling:**
```css
.terminal {
  background: #020617;
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 0.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  padding: 1rem;
  overflow-y: auto;
  max-height: 400px;
}

.terminal-line {
  display: flex;
  gap: 0.5rem;
  padding: 0.25rem 0;
}

.terminal-timestamp {
  color: #475569;
  font-size: 11px;
  min-width: 80px;
}

.terminal-prompt {
  color: #fbbf24;
}

.terminal-input {
  color: #ffffff;
}

.terminal-output {
  color: #94a3b8;
}

.terminal-error {
  color: #ef4444;
}

.terminal-success {
  color: #22c55e;
}

.terminal-info {
  color: #3b82f6;
}

.terminal-cursor {
  display: inline-block;
  width: 8px;
  height: 16px;
  background: #fbbf24;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}
```

### LiveTicker

A horizontally scrolling ticker for real-time data updates.

```typescript
interface LiveTickerProps {
  items: Array<{
    label: string;
    value: string | number;
    change?: number;
    icon?: LucideIcon;
  }>;
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
  direction?: 'left' | 'right';
}
```

**Styling:**
```css
.ticker {
  overflow: hidden;
  background: #0f172a;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.ticker-track {
  display: flex;
  animation: ticker-scroll 30s linear infinite;
}

.ticker-track:hover {
  animation-play-state: paused;
}

.ticker-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  white-space: nowrap;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.ticker-label {
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.ticker-value {
  color: white;
  font-weight: 500;
}

.ticker-change-positive {
  color: #22c55e;
}

.ticker-change-negative {
  color: #ef4444;
}

@keyframes ticker-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

### GaugeCluster

A group of gauges for displaying multiple metrics in a dashboard-like layout.

```typescript
interface GaugeProps {
  value: number;
  min?: number;
  max?: number;
  label: string;
  unit?: string;
  thresholds?: Array<{
    value: number;
    color: string;
  }>;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  animated?: boolean;
}

interface GaugeClusterProps {
  gauges: GaugeProps[];
  layout?: 'horizontal' | 'grid';
  columns?: 2 | 3 | 4;
}
```

**Styling:**
```css
.gauge {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gauge-circle {
  position: relative;
  width: 120px;
  height: 60px;
  overflow: hidden;
}

.gauge-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 8px solid #1e293b;
  border-top-color: transparent;
  border-right-color: transparent;
  transform: rotate(-225deg);
}

.gauge-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 8px solid #fbbf24;
  border-top-color: transparent;
  border-right-color: transparent;
  transform: rotate(-225deg);
  transform-origin: center;
  transition: transform 500ms ease-out;
}

.gauge-value {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.5rem;
  font-weight: 500;
  color: white;
}

.gauge-label {
  margin-top: 0.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
}

.gauge-cluster {
  display: grid;
  gap: 1.5rem;
}

.gauge-cluster-horizontal {
  grid-auto-flow: column;
  justify-content: center;
}
```

### CommandPalette

A keyboard-driven command palette for quick actions.

```typescript
interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
  shortcut?: string[];
  action: () => void;
  category?: string;
}

interface CommandPaletteProps {
  commands: CommandItem[];
  isOpen: boolean;
  onClose: () => void;
  placeholder?: string;
  recentCommands?: string[];
}
```

**Styling:**
```css
.command-palette-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.70);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 15vh;
}

.command-palette {
  width: 100%;
  max-width: 560px;
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.60);
}

.command-palette-input {
  width: 100%;
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.10);
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: white;
  outline: none;
}

.command-palette-input::placeholder {
  color: #64748b;
}

.command-list {
  max-height: 400px;
  overflow-y: auto;
  padding: 0.5rem;
}

.command-category {
  padding: 0.5rem 0.75rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
}

.command-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 150ms;
}

.command-item:hover,
.command-item-selected {
  background: rgba(255, 255, 255, 0.05);
}

.command-item-icon {
  color: #64748b;
}

.command-item-label {
  flex: 1;
  color: white;
}

.command-item-shortcut {
  display: flex;
  gap: 0.25rem;
}

.command-item-shortcut kbd {
  padding: 0.125rem 0.375rem;
  background: rgba(255, 255, 255, 0.10);
  border-radius: 0.25rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #94a3b8;
}
```

---

## Token Recommendations

### Recommended Token Updates

Based on the Substance style analysis, the following token additions/modifications are recommended:

#### New Color Tokens

```typescript
colors: {
  // ... existing colors ...

  // Add terminal-specific colors
  terminal: {
    bg: '#020617',
    input: '#fbbf24',
    output: '#94a3b8',
    error: '#ef4444',
    success: '#22c55e',
    info: '#3b82f6',
    cursor: '#fbbf24',
  },

  // Add data visualization colors
  dataViz: {
    primary: '#fbbf24',
    secondary: '#14b8a6',
    tertiary: '#8b5cf6',
    quaternary: '#6366f1',
    positive: '#22c55e',
    negative: '#ef4444',
    neutral: '#64748b',
  },
}
```

#### New Typography Tokens

```typescript
typography: {
  // ... existing typography ...

  fontSize: {
    // Add data-specific sizes
    'data-xs': '0.875rem',   // 14px
    'data-sm': '1.25rem',    // 20px
    'data-md': '1.5rem',     // 24px
    'data-lg': '2.25rem',    // 36px
    'data-xl': '3rem',       // 48px
    'data-2xl': '4rem',      // 64px
  },

  // Add terminal line height
  lineHeight: {
    terminal: '1.6',
  },
}
```

#### New Effect Tokens

```typescript
effects: {
  // Scanline overlay
  scanline: {
    background: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.15) 50%)',
    backgroundSize: '100% 4px',
  },

  // CRT curve effect
  crtCurve: {
    borderRadius: '50% / 3%',
  },

  // Noise texture
  noise: {
    backgroundImage: 'url("data:image/svg+xml,...")',
    opacity: 0.03,
  },
}
```

#### New Animation Tokens

```typescript
animations: {
  // Ticker scroll
  tickerScroll: {
    slow: '60s',
    normal: '30s',
    fast: '15s',
  },

  // Typewriter
  typewriter: {
    speed: '50ms',
    cursor: '530ms',
  },

  // Gauge fill
  gaugeFill: {
    duration: '500ms',
    easing: 'ease-out',
  },
}
```

### Component Token Additions

```typescript
components: {
  // ... existing components ...

  dataGrid: {
    headerBg: '#0f172a',
    rowBorder: 'rgba(255, 255, 255, 0.05)',
    rowHoverBg: 'rgba(255, 255, 255, 0.03)',
    cellPadding: '0.5rem 1rem',
    fontSize: '12px',
  },

  terminal: {
    bg: '#020617',
    border: 'rgba(255, 255, 255, 0.10)',
    borderRadius: '0.5rem',
    padding: '1rem',
    fontSize: '13px',
    lineHeight: '1.6',
  },

  ticker: {
    bg: '#0f172a',
    border: 'rgba(255, 255, 255, 0.05)',
    itemPadding: '0.75rem 1.5rem',
    fontSize: '12px',
  },

  gauge: {
    sizes: {
      sm: { width: 80, height: 40, border: 6 },
      md: { width: 120, height: 60, border: 8 },
      lg: { width: 160, height: 80, border: 10 },
    },
    trackColor: '#1e293b',
    fillColor: '#fbbf24',
  },

  commandPalette: {
    maxWidth: '560px',
    maxHeight: '400px',
    inputPadding: '1rem 1.5rem',
    itemPadding: '0.75rem',
    itemBorderRadius: '0.5rem',
  },
}
```

---

## Usage Guidelines

### Do

- Always use void backgrounds (#020617, #0f172a, #1e293b)
- Use Prophetic Gold (#fbbf24) as the primary accent
- Use monospace fonts (JetBrains Mono) for data and labels
- Apply spring animations to all interactive elements
- Maintain WCAG 2.1 AA contrast ratios
- Use subtle borders (rgba(255, 255, 255, 0.05-0.10))
- Apply glassmorphism sparingly for elevated surfaces

### Do Not

- Never implement a light mode
- Never use hardcoded color values (use tokens)
- Never use CSS transitions without spring physics for interactive elements
- Never use rounded corners larger than 0.75rem (except full rounds)
- Never use shadows without the void color family
- Never mix font families inappropriately (serif for headlines, mono for data, sans for body)

---

*SpinozaOS Substance Style Guide*
*Version: 1.0.0*
*Last Updated: 2025-12-10*
