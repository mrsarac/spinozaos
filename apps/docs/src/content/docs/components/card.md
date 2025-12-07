---
title: Card
description: Container component with glassmorphism support
---

## Card Component

A versatile container with multiple surface styles.

```tsx
import { Card } from '@spinozaos/react';

<Card>
  Content goes here
</Card>
```

## Variants

| Variant | Description |
|---------|-------------|
| `default` | Standard dark surface |
| `glass` | Glassmorphism effect |
| `elevated` | Lighter elevated surface |
| `interactive` | Hover effects enabled |

## Padding

| Padding | Value |
|---------|-------|
| `none` | No padding |
| `sm` | 16px |
| `md` | 24px |
| `lg` | 32px |

## Examples

```tsx
// Default card
<Card>
  <Text variant="h2">Card Title</Text>
  <Text variant="body">Card content</Text>
</Card>

// Glass effect
<Card variant="glass">
  Glassmorphism surface
</Card>

// Interactive (clickable)
<Card variant="interactive">
  Hover to see effect
</Card>

// With button
<Card>
  <Text variant="h2">Prediction</Text>
  <Text variant="body">AGI by 2027</Text>
  <Button variant="primary">Predict</Button>
</Card>
```

## Motion

Interactive cards include:
- **Hover**: Lift effect (y: -4)
- **Entrance**: Fade in + slide up
- **Transition**: Soft spring physics
