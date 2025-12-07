---
title: Text
description: Typography component with semantic variants
---

## Text Component

A typography component with semantic variants.

```tsx
import { Text } from '@spinozaos/react';

<Text variant="h1">Heading</Text>
```

## Variants

| Variant | Font | Size | Element |
|---------|------|------|---------|
| `display` | Serif | 60px | h1 |
| `h1` | Serif | 36px | h1 |
| `h2` | Sans | 24px | h2 |
| `h3` | Sans | 20px | h3 |
| `body` | Sans | 16px | p |
| `label` | Mono | 10px | span |
| `data` | Mono | 48px | span |

## Examples

```tsx
// Display text (hero)
<Text variant="display">Superintelligence</Text>

// Headings
<Text variant="h1">AGI Prediction Market</Text>
<Text variant="h2">Current Milestones</Text>

// Body text
<Text variant="body">
  This platform tracks progress toward AGI.
</Text>

// Labels
<Text variant="label">PREDICTION CATEGORY</Text>

// Data display
<Text variant="data">94.7%</Text>

// Custom element
<Text variant="h2" as="h3">Custom element</Text>
```

## Styling

All text variants use appropriate colors:
- **Display/Headings**: White (#ffffff)
- **Body**: Neutral 400
- **Label**: Neutral 500
- **Data**: Spinoza Yellow (#fbbf24)
