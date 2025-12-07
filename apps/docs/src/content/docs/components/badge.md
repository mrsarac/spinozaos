---
title: Badge
description: Status indicator badges with semantic colors
---

## Badge Component

A versatile badge component for status indicators, labels, and tags.

```tsx
import { Badge } from '@spinozaos/react';

<Badge variant="success">ACTIVE</Badge>
```

## Variants

| Variant | Description |
|---------|-------------|
| `default` | Neutral gray badge |
| `primary` | Gold/yellow accent |
| `success` | Green success state |
| `error` | Red error state |
| `warning` | Orange warning state |
| `info` | Blue information |
| `oracle` | Purple premium tier |
| `solid` | Solid gold background |

## Sizes

| Size | Height |
|------|--------|
| `sm` | 20px |
| `md` | 24px |
| `lg` | 28px |

## Props

| Prop | Type | Description |
|------|------|-------------|
| `dot` | `boolean` | Show status dot |
| `pulse` | `boolean` | Animate the dot |
| `animated` | `boolean` | Entrance animation |

## Examples

```tsx
// Basic badges
<Badge variant="default">DEFAULT</Badge>
<Badge variant="primary">ACTIVE</Badge>
<Badge variant="success">COMPLETE</Badge>
<Badge variant="error">FAILED</Badge>
<Badge variant="warning">PENDING</Badge>
<Badge variant="info">INFO</Badge>
<Badge variant="oracle">ORACLE</Badge>
<Badge variant="solid">NEW</Badge>

// With status dot
<Badge variant="success" dot>ONLINE</Badge>

// With pulsing dot (live indicator)
<Badge variant="success" dot pulse>LIVE</Badge>

// Animated entrance
<Badge variant="primary" animated>ANIMATED</Badge>

// Different sizes
<Badge size="sm">SMALL</Badge>
<Badge size="md">MEDIUM</Badge>
<Badge size="lg">LARGE</Badge>
```

## Use Cases

```tsx
// Status indicator
<div className="flex items-center gap-2">
  <Badge variant="success" dot pulse>ACTIVE</Badge>
  <span>Server is running</span>
</div>

// Category label
<Badge variant="oracle">PREMIUM</Badge>

// Count indicator
<Badge variant="solid">5</Badge>
```

## Motion

The badge supports optional entrance animation:
- **Initial**: Scale down, fade in
- **Hover**: Slight scale increase (when `animated`)
- **Transition**: Bouncy spring physics
