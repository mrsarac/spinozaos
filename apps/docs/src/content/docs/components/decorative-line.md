---
title: DecorativeLine
description: Gradient line decorations for cards and sections
---

## Overview

DecorativeLine provides gradient and solid line decorations extracted from Substance AGI card patterns. Includes preset components for common use cases.

```tsx
import { DecorativeLine, CardTopLine, GradientDivider } from '@spinozaos/react';

<DecorativeLine variant="gradient" />
```

## Variants

| Variant | Description |
|---------|-------------|
| `gradient` | Gold → Teal → Purple gradient |
| `gradientReverse` | Purple → Teal → Gold gradient |
| `gold` | Solid gold/yellow |
| `oracle` | Solid purple |
| `teal` | Solid teal |
| `success` | Solid green |
| `error` | Solid red |
| `subtle` | Subtle white (20% opacity) |
| `pulse` | Gradient with pulse effect |

## Sizes

| Size | Height |
|------|--------|
| `xs` | 1px |
| `sm` | 2px (default) |
| `md` | 4px |
| `lg` | 6px |
| `xl` | 8px |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `'gradient'` | Line style |
| `size` | `string` | `'sm'` | Line thickness |
| `position` | `string` | `'top'` | Position context |
| `width` | `string \| number` | `'100%'` | Line width |
| `height` | `string \| number` | - | Line height (vertical) |
| `animated` | `boolean` | `false` | Animate on mount |
| `animateFrom` | `string` | `'left'` | Animation origin |
| `glow` | `boolean` | `false` | Add glow effect |

## Examples

### Basic Lines

```tsx
// Default gradient
<DecorativeLine />

// Reverse gradient
<DecorativeLine variant="gradientReverse" />

// Single color
<DecorativeLine variant="gold" />
<DecorativeLine variant="oracle" />
<DecorativeLine variant="teal" />
```

### Different Sizes

```tsx
<DecorativeLine size="xs" />
<DecorativeLine size="sm" />
<DecorativeLine size="md" />
<DecorativeLine size="lg" />
<DecorativeLine size="xl" />
```

### With Animation

```tsx
// Animate from left (default)
<DecorativeLine animated />

// Animate from center
<DecorativeLine animated animateFrom="center" />

// Animate from right
<DecorativeLine animated animateFrom="right" />
```

### With Glow Effect

```tsx
<DecorativeLine variant="gradient" size="md" glow />
<DecorativeLine variant="gold" glow />
<DecorativeLine variant="oracle" glow />
```

### Vertical Lines

```tsx
<div className="flex gap-4 h-32">
  <DecorativeLine position="left" height="100%" />
  <DecorativeLine position="left" variant="gold" height="100%" glow />
</div>
```

## Preset Components

### CardTopLine

Animated gradient line for card headers:

```tsx
<div className="bg-void border border-white/10 overflow-hidden">
  <CardTopLine />
  <div className="p-6">
    Card content
  </div>
</div>
```

### GradientDivider

Simple gradient divider:

```tsx
<GradientDivider />
```

### SectionDivider

Subtle section divider:

```tsx
<p>Section 1 content</p>
<SectionDivider />
<p>Section 2 content</p>
```

## Card Context Example

```tsx
<div className="w-80 bg-void border border-white/10 overflow-hidden">
  <CardTopLine />
  <div className="p-6 space-y-4">
    <h3 className="text-white font-medium">AGI Milestone</h3>
    <p className="text-sm text-neutral-400">
      Artificial General Intelligence capable of self-improvement.
    </p>
    <SectionDivider />
    <div className="flex justify-between text-xs text-neutral-500">
      <span>Probability: 45%</span>
      <span>2027-2030</span>
    </div>
  </div>
</div>
```

## Use Cases

- Card header decorations
- Section dividers
- Visual hierarchy elements
- Accent lines for premium content
- Progress/status indicators
